/*
 * Guide — engine "guide demo" dạng SIDECAR: chạy bên ngoài, nhúng mockup trong <iframe> cùng origin và điều khiển nó
 * qua DOM. KHÔNG sửa bất kỳ file nào của version mockup (giữ tính bất biến), vẫn chạy được sau `proto promote`.
 *
 *  - Chế độ ĐẦY ĐỦ  : ▶ tự chạy · ⏭ từng bước · teleport tới bước N · nhạc/click/thuyết minh · chọn giọng · tốc độ.
 *  - Chế độ ĐƠN GIẢN: dành cho người dùng cuối — nút Lùi/Tiếp lớn, chữ to, chậm, không menu kỹ thuật.
 *  - Phần tử được trỏ bằng TÊN LOGIC trong targets.json (→ selector CSS); không có trong bảng thì thử data-testid="<tên>".
 *    Đây là selector NỘI BỘ của guide, không phải hợp đồng E2E của code thật.
 *  - URL: ?mode=simple|full &scenario=<id> &step=<n> &autoplay=1 &speed=0.6 &voice=0|1 &music=0 &sfx=0 &voiceName=HoaiMy
 *
 * Mọi đường dẫn tương đối → chạy được dưới GitHub Pages. fetch JSON không chạy với file:// → mở qua http.
 */
(function (global) {
  'use strict';

  const S = global.MKScenario;
  const sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  const Guide = { ready: false };
  let cfg = null, targets = {}, intents = {}, scenarios = [], frame = null;
  const R = { sc: null, steps: [], i: 0, playing: false, busy: false, speed: 1, fail: -1, mode: 'full' };
  let ui = null, cursor = null, hlEl = null;

  /* ---------------- iframe app ---------------- */
  const doc = function () { try { return frame.contentDocument; } catch (e) { return null; } };
  const win = function () { try { return frame.contentWindow; } catch (e) { return null; } };
  function sel(name) {
    const d = doc(); if (!d) return null;
    const css = targets[name] || '[data-testid="' + name + '"]';
    try { return d.querySelector(css); } catch (e) { return null; }
  }
  function isVisible(el) { return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length)); }

  const HL_CSS = '.guide-hl{outline:3px solid #f59e0b !important;outline-offset:3px;}';
  function injectStyle() {
    const d = doc(); if (!d || d.getElementById('guide-hl-style')) return;
    const st = d.createElement('style'); st.id = 'guide-hl-style'; st.textContent = HL_CSS;
    (d.head || d.documentElement).appendChild(st);
  }
  function loadApp() {
    return new Promise(function (resolve, reject) {
      let done = false;
      const fin = function (err) { if (done) return; done = true; clearTimeout(to); err ? reject(err) : resolve(); };
      const to = setTimeout(function () { fin(new Error('Không mở được mockup: ' + cfg.app + ' (mở qua http, không phải file://)')); }, 8000);
      frame.onload = function () {
        if (!doc()) return fin(new Error('Không truy cập được nội dung mockup (khác origin / file://)'));
        injectStyle(); fin();
      };
      frame.src = cfg.app + (cfg.app.indexOf('?') < 0 ? '?' : '&') + 'guide=' + Date.now();
    });
  }

  /* ---------------- con trỏ giả / làm nổi bật ---------------- */
  function ensureCursor() {
    if (cursor) return;
    cursor = document.createElement('div');
    cursor.className = 'gd-cursor';
    cursor.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 2l7 19 2.6-7.4L20 11z" fill="#fff" stroke="#111" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    ui.stage.appendChild(cursor);
  }
  function clearOverlays() {
    if (hlEl) { try { hlEl.classList.remove('guide-hl'); } catch (e) { /* trang đã đổi */ } hlEl = null; }
    if (cursor) cursor.style.transform = 'translate(-100px,-100px)';
  }
  function caption(text, n, total, context) {
    if (!ui) return;
    ui.capMeta.textContent = text ? 'Bước ' + n + '/' + total + (context ? ' · ' + context : '') : '';
    ui.capText.textContent = text || '';
  }
  async function pointAt(el, instant) {
    if (instant) return;
    ensureCursor();
    el.scrollIntoView({ block: 'center', behavior: 'auto' });
    if (hlEl) { try { hlEl.classList.remove('guide-hl'); } catch (e) { /* ignore */ } }
    hlEl = el; el.classList.add('guide-hl');
    const r = el.getBoundingClientRect(), f = frame.getBoundingClientRect(), s = ui.stage.getBoundingClientRect();
    cursor.style.transform = 'translate(' + (f.left - s.left + r.left + r.width / 2) + 'px,' + (f.top - s.top + r.top + r.height / 2) + 'px)';
    await sleep(800 / R.speed);
  }
  function clickFx() {
    if (!cursor) return;
    cursor.classList.remove('gd-click'); void cursor.offsetWidth; cursor.classList.add('gd-click');
    Sfx.click();
  }

  /* ---------------- âm thanh: nhạc nền · tiếng click · thuyết minh (TTS) ----------------
   * Ba công tắc độc lập trên panel, trình duyệt nhớ lựa chọn; tắt qua URL bằng music=0 / sfx=0 / voice=0.
   * Chỉ kêu khi ▶ Chạy hoặc ⏭ Bước. Teleport và E2E im lặng.
   * Tất cả tự tổng hợp (Web Audio + giọng đọc có sẵn của máy): không file, không mạng, không bản quyền.
   */
  const PREF = (function () {
    const q = new URLSearchParams(location.search);
    function get(k) {
      if (q.get(k) === '0') return false;
      try { return localStorage.getItem('guide:pref:' + k) !== '0'; } catch (e) { return true; }
    }
    return {
      music: get('music'), sfx: get('sfx'), voice: get('voice'),
      set: function (k, v) { this[k] = v; try { localStorage.setItem('guide:pref:' + k, v ? '1' : '0'); } catch (e) { /* ignore */ } },
    };
  })();

  // AudioContext dùng chung. Trình duyệt chặn âm thanh khi chưa có thao tác người dùng (vd mở link ?autoplay=1) → bật lại ở cú bấm đầu.
  let actx = null;
  function audio() {
    if (actx) return actx;
    const AC = global.AudioContext || global.webkitAudioContext;
    if (!AC) return null;
    actx = new AC();
    document.addEventListener('pointerdown', function () { if (actx.state === 'suspended') actx.resume(); }, true);
    return actx;
  }

  // Nhạc nền: pad hợp âm C–G–Am–F, bass, arpeggio nhẹ. duck(true) hạ nhỏ khi đang thuyết minh.
  const Music = (function () {
    const BPM = 84, BEAT = 60 / BPM, VOL = 0.07, DUCK = 0.015;
    const CHORDS = [[261.63, 329.63, 392.0], [196.0, 246.94, 293.66], [220.0, 261.63, 329.63], [174.61, 220.0, 261.63]];
    const ARP = [0, 1, 2, 1, 2, 0, 1, 2];
    let ctx = null, master = null, timer = null, nextT = 0, beat8 = 0, ducked = false;
    function ensure() {
      if (master) return true;
      ctx = audio(); if (!ctx) return false;
      master = ctx.createGain(); master.gain.value = 0;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2200;
      master.connect(lp); lp.connect(ctx.destination);
      return true;
    }
    function note(freq, t, dur, type, gain, attack) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(gain, t + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
    }
    function schedule() {
      while (nextT < ctx.currentTime + 0.25) {
        const ch = CHORDS[Math.floor(beat8 / 8) % CHORDS.length], step = beat8 % 8, half = BEAT / 2;
        if (step === 0) ch.forEach(function (f) { note(f, nextT, BEAT * 4, 'triangle', 0.16, 0.6); });  // pad
        if (step % 4 === 0) note(ch[0] / 2, nextT, BEAT * 1.8, 'sine', 0.32, 0.02);                    // bass
        note(ch[ARP[step]] * 2, nextT, half * 1.6, 'sine', step % 2 ? 0.07 : 0.11, 0.01);              // arpeggio
        nextT += half; beat8++;
      }
    }
    function fade(to, sec) {
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(to, t + sec);
    }
    return {
      start: function () {
        if (!PREF.music || !ensure()) return;
        if (ctx.state === 'suspended') ctx.resume();
        if (!timer) { nextT = ctx.currentTime + 0.05; beat8 = 0; timer = setInterval(schedule, 90); schedule(); }
        fade(ducked ? DUCK : VOL, 1.2);
      },
      stop: function () {
        if (!timer) return;
        fade(0, 0.9);
        const t = timer; timer = null;
        setTimeout(function () { clearInterval(t); }, 1000);
      },
      duck: function (on) { ducked = !!on; if (timer) fade(ducked ? DUCK : VOL, 0.25); },
    };
  })();

  // Tiếng thao tác: click chuột (2 nhịp nhấn–nhả) và gõ phím, từ một mẩu nhiễu trắng lọc dải.
  const Sfx = (function () {
    let noise = null;
    function burst(t, freq, gain, dur) {
      const ctx = actx;
      if (!noise) {
        noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.05), ctx.sampleRate);
        const d = noise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      }
      const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = noise; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 1.2;
      g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(f); f.connect(g); g.connect(ctx.destination); s.start(t); s.stop(t + dur + 0.01);
    }
    function ready() { if (!PREF.sfx || !audio()) return false; if (actx.state === 'suspended') actx.resume(); return true; }
    return {
      click: function () { if (!ready()) return; const t = actx.currentTime; burst(t, 3200, 0.5, 0.025); burst(t + 0.07, 2400, 0.25, 0.02); },
      key: function () { if (!ready()) return; burst(actx.currentTime, 1800 + Math.random() * 600, 0.12, 0.018); },
    };
  })();

  // Thuyết minh: đọc câu "say" (hoặc "speak" nếu kịch bản muốn đọc khác chữ hiển thị) bằng giọng tiếng Việt của máy.
  // Không cố khớp từng chữ với màn hình: bắt đầu đọc cùng lúc với thao tác, đọc xong mới sang bước sau.
  //  - Chọn giọng: ô chọn trên panel (nhớ theo trình duyệt) hoặc ?voiceName=<một phần tên giọng>.
  //    Mặc định ưu tiên giọng tự nhiên (Edge: HoaiMy/NamMinh "Online (Natural)", macOS: bản Enhanced/Premium).
  //  - Phát âm: voice.json cạnh kịch bản, { "pronounce": { "POS": "pốt", ... } } — chỉ đổi lời đọc, chú thích giữ nguyên.
  const Voice = (function () {
    const synth = global.speechSynthesis;
    const NATURAL = /natural|neural|online|premium|enhanced/i;
    let voices = [], voice = null, rules = [], listeners = [];
    let wanted = new URLSearchParams(location.search).get('voiceName') || '';
    if (!wanted) { try { wanted = localStorage.getItem('guide:pref:voiceName') || ''; } catch (e) { /* ignore */ } }
    function load() {
      if (!synth) return;
      voices = synth.getVoices().filter(function (v) { return /^vi/i.test(v.lang); })
        .sort(function (a, b) { return (NATURAL.test(b.name) ? 1 : 0) - (NATURAL.test(a.name) ? 1 : 0); });
      const w = wanted.toLowerCase();
      voice = (w && voices.filter(function (v) { return v.name.toLowerCase().indexOf(w) >= 0; })[0]) || voices[0] || null;
      listeners.forEach(function (fn) { fn(); });
    }
    if (synth && synth.addEventListener) synth.addEventListener('voiceschanged', load);
    load();
    // Chuẩn hoá lời đọc: "1.450.000đ" → "1.450.000 đồng", rồi thay theo từ điển (khớp nguyên từ, không phân biệt hoa thường).
    function prepare(text) {
      let s = text.replace(/(\d)\s*đ(?![\p{L}\p{N}])/gu, '$1 đồng');
      rules.forEach(function (r) { s = s.replace(r[0], '$1' + r[1]); });
      return s;
    }
    function say(text, rate) {
      return new Promise(function (resolve) {
        const u = new SpeechSynthesisUtterance(prepare(text));
        u.voice = voice; u.lang = voice.lang; u.rate = rate;
        let done = false, to = null;
        const fin = function () { if (done) return; done = true; clearTimeout(to); Music.duck(false); resolve(); };
        to = setTimeout(fin, 2000 + text.length * 110 / u.rate); // lưới an toàn khi trình duyệt không báo onend
        u.onend = fin; u.onerror = fin;
        Music.duck(true); synth.speak(u);
      });
    }
    const api = {
      ready: function () { if (!voice) load(); return PREF.voice && !!voice; },
      missing: function () { if (!voice) load(); return PREF.voice && !voice; },
      list: function () { return voices; },
      current: function () { return voice; },
      onVoices: function (fn) { listeners.push(fn); },
      choose: function (name) {
        wanted = name; try { localStorage.setItem('guide:pref:voiceName', name); } catch (e) { /* ignore */ }
        load();
      },
      setDict: function (map) {
        const esc = function (k) { return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
        rules = Object.keys(map || {}).sort(function (a, b) { return b.length - a.length; }).map(function (k) {
          return [new RegExp('(^|[^\\p{L}\\p{N}])' + esc(k) + '(?=$|[^\\p{L}\\p{N}])', 'giu'), map[k]];
        });
      },
      prepare: prepare,
      speak: function (text) {
        if (!text || !api.ready()) return Promise.resolve();
        return say(text, Math.min(1.4, Math.max(0.9, R.speed)));
      },
      sample: function () {
        if (!synth || !voice) return;
        synth.cancel(); say('Xin chào, tôi sẽ thuyết minh từng bước của bản mockup này.', 1);
      },
      stop: function () { if (synth) synth.cancel(); },
    };
    return api;
  })();
  // Tên giọng gọn cho ô chọn: "Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)" → "HoaiMy Online (Natural)"
  const voiceLabel = function (v) { return v.name.replace(/^Microsoft\s+/, '').replace(/\s+-\s+.*$/, ''); };

  /* ---------------- thực thi 1 bước ---------------- */
  function need(name) {
    const el = sel(name);
    if (!el) throw new Error('Không thấy phần tử "' + name + '" (kiểm targets.json hoặc data-testid) — mockup có thể đã đổi, xem "proto guide check"');
    return el;
  }
  function setValue(el, v) {
    const w = el.ownerDocument.defaultView;
    const proto = el.tagName === 'SELECT' ? w.HTMLSelectElement.prototype
      : el.tagName === 'TEXTAREA' ? w.HTMLTextAreaElement.prototype : w.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
    el.dispatchEvent(new w.Event('input', { bubbles: true }));
    el.dispatchEvent(new w.Event('change', { bubbles: true }));
  }
  async function until(cond, label, ms) {
    const end = Date.now() + (ms || 2000);
    while (Date.now() < end) { if (cond()) return; await sleep(40); }
    throw new Error('Không đạt điều kiện: ' + label);
  }

  async function exec(step, instant) {
    const wait = function (ms) { return instant ? Promise.resolve() : sleep(ms / R.speed); };
    switch (step.do) {
      case 'reset': await Guide.reset(); break;
      case 'say': await wait(300); break; // chỉ thuyết minh, không thao tác
      case 'click': {
        const el = need(step.target);
        await pointAt(el, instant); if (!instant) clickFx();
        el.click(); await wait(500); break;
      }
      case 'type': {
        const el = need(step.target);
        await pointAt(el, instant); el.focus();
        if (instant) setValue(el, step.value);
        else {
          setValue(el, '');
          for (let k = 1; k <= step.value.length; k++) { setValue(el, step.value.slice(0, k)); Sfx.key(); await sleep(55 / R.speed); }
        }
        await wait(400); break;
      }
      case 'select': {
        const el = need(step.target);
        await pointAt(el, instant); if (!instant) clickFx(); setValue(el, step.value); await wait(450); break;
      }
      case 'expectVisible': await until(function () { return isVisible(sel(step.target)); }, step.target + ' hiển thị'); break;
      case 'expectHidden': await until(function () { return !isVisible(sel(step.target)); }, step.target + ' ẩn'); break;
      case 'expectText':
        await until(function () { const e = sel(step.target); return e && e.textContent.indexOf(step.contains) >= 0; },
          step.target + ' chứa "' + step.contains + '"');
        break;
      case 'wait': await wait(step.ms); break;
      default: throw new Error('Hành động không hỗ trợ: ' + step.do);
    }
  }

  /* ---------------- điều khiển runner ---------------- */
  function loadScenario(id) {
    const sc = scenarios.filter(function (s) { return s.id === id; })[0] || scenarios[0];
    R.sc = sc;
    R.steps = sc ? S.expand(sc.steps, intents) : [];
    R.i = 0; R.fail = -1; R.playing = false;
    render();
  }

  function setStatus(msg, kind) {
    if (!ui) return;
    ui.status.textContent = msg || '';
    ui.status.className = 'gd-status' + (kind ? ' gd-' + kind : '');
  }

  // Lời cần nói ở bước này. Trong một cụm intent có câu nghiệp vụ (intentSay) thì chỉ nói câu đó một lần ở bước
  // đầu cụm; câu chung chung của từng bước con chỉ hiện chú thích, không đọc.
  function narration(i) {
    const s = R.steps[i], prev = R.steps[i - 1];
    if (s.intentSay || s.intentSpeak) {
      const same = prev && prev.intent === s.intent && prev.intentSay === s.intentSay && prev.intentSpeak === s.intentSpeak;
      return same ? '' : (s.intentSpeak || s.intentSay);
    }
    return s.speak || s.say || '';
  }
  const readMs = function (text) { return 700 + text.length * 55; };
  const hasText = function (s) { return !!(s && (s.say || s.intentSay)); };
  const captionOf = function (s) { return s.say || s.intentSay || ''; };

  async function runOne(instant) {
    const step = R.steps[R.i];
    let talk = null, text = '';
    if (!instant) {
      text = narration(R.i);
      const shown = captionOf(step);
      if (shown) caption(shown, R.i + 1, R.steps.length, step.say && step.intentSay !== step.say ? step.intentSay : '');
      talk = Voice.speak(text);
    }
    try { await exec(step, instant); }
    catch (e) {
      Voice.stop();
      R.fail = R.i; R.playing = false;
      setStatus('Bước ' + (R.i + 1) + ' không chạy được: ' + e.message, 'err');
      render(); throw e;
    }
    if (talk) await talk;
    if (!instant && !Voice.ready() && (text || step.say)) await sleep(readMs(text || step.say) / R.speed);
    R.i++;
  }

  async function play() {
    if (R.busy) return;
    if (R.i >= R.steps.length) await teleport(0);
    R.playing = true; R.busy = true; R.fail = -1; render();
    if (Voice.missing()) setStatus('Máy chưa có giọng đọc tiếng Việt → chỉ hiện chú thích.', '');
    if (R.mode === 'full') Music.start();
    try {
      while (R.playing && R.i < R.steps.length) { await runOne(false); render(); await sleep(400 / R.speed); }
      if (R.i >= R.steps.length) setStatus('Hoàn tất ✓', 'ok');
    } catch (e) { /* đã báo */ }
    Music.stop(); Voice.stop();
    R.playing = false; R.busy = false; render();
  }
  function pause() { R.playing = false; Voice.stop(); }

  // ⏭ (chế độ đầy đủ): đúng một bước.
  async function stepOnce() {
    if (R.busy || R.i >= R.steps.length) return;
    R.busy = true; R.fail = -1;
    try { await runOne(false); } catch (e) { /* đã báo */ }
    R.busy = false; render();
  }
  // Tiếp (chế độ đơn giản): chạy tới hết bước có lời kế tiếp — các bước kỹ thuật (expect…) đi kèm chạy luôn.
  async function next() {
    if (R.busy) return;
    if (R.i >= R.steps.length) { setStatus('Đã xong bài này. Chọn bài khác hoặc bấm "Làm lại từ đầu".', 'ok'); return; }
    R.busy = true; R.fail = -1;
    try {
      do { await runOne(false); } while (R.i < R.steps.length && !hasText(R.steps[R.i]));
      if (R.i >= R.steps.length) setStatus('Đã xong bài này ✓', 'ok'); else setStatus('', '');
    } catch (e) { /* đã báo */ }
    R.busy = false; render();
  }
  // Lùi (chế độ đơn giản): quay lại trạng thái trước bước có lời gần nhất, hiện lại lời của bước trước đó.
  async function back() {
    let last = -1;
    for (let k = Math.min(R.i, R.steps.length) - 1; k >= 0; k--) if (hasText(R.steps[k])) { last = k; break; }
    if (last < 0) return;
    let prev = -1;
    for (let k = last - 1; k >= 0; k--) if (hasText(R.steps[k])) { prev = k; break; }
    await teleport(last);
    if (prev >= 0) caption(captionOf(R.steps[prev]), prev + 1, R.steps.length, '');
    else introCaption();
  }
  function introCaption() { caption(R.sc ? R.sc.title + ' — bấm "Tiếp" để bắt đầu.' : '', 0, R.steps.length, ''); ui.capMeta.textContent = ''; }

  // Nhảy tới trạng thái "ngay trước bước n" bằng cách chạy nhanh n bước đầu (nguồn sự thật vẫn là kịch bản).
  async function teleport(n) {
    R.playing = false; Voice.stop();
    while (R.busy) await sleep(30);
    R.busy = true; R.fail = -1;
    try {
      await Guide.reset(); R.i = 0;
      for (; R.i < Math.min(n, R.steps.length);) await runOne(true);
      setStatus(n && R.mode === 'full' ? 'Đã nhảy tới bước ' + (R.i + 1) + '. Bấm ⏭ để đi tiếp.' : '', '');
    } catch (e) { /* đã báo */ }
    R.busy = false; render();
  }
  async function teleportFresh(id) { loadScenario(id); await teleport(0); introCaption(); }

  /* ---------------- giao diện ---------------- */
  function pref(k, d) { try { const v = localStorage.getItem('guide:pref:' + k); return v == null ? d : v; } catch (e) { return d; } }
  function setPref(k, v) { try { localStorage.setItem('guide:pref:' + k, v); } catch (e) { /* ignore */ } }

  function applyMode(m) {
    R.mode = m === 'full' ? 'full' : 'simple';
    ui.root.classList.toggle('gd-simple', R.mode === 'simple');
    ui.root.classList.toggle('gd-full', R.mode === 'full');
    ui.modeBtn.textContent = R.mode === 'simple' ? '⚙ Chế độ kỹ thuật' : '☺ Chế độ đơn giản';
    setPref('mode', R.mode);
    render();
  }

  function buildUI() {
    const p = document.getElementById('gd-panel');
    p.innerHTML =
      '<div class="gd-row gd-pick"><select data-k="sc" aria-label="Chọn bài hướng dẫn"></select></div>' +
      '<div class="gd-simple-only">' +
        '<div class="gd-prog" data-k="prog" aria-live="polite"></div>' +
        '<div class="gd-nav"><button data-k="back">◀ Lùi</button><button data-k="next" class="gd-primary">Tiếp ▶</button></div>' +
        '<div class="gd-aux"><button data-k="speak" aria-pressed="false">🔊 Đọc to</button>' +
        '<button data-k="auto">▶ Tự chạy</button><button data-k="restart">↺ Làm lại từ đầu</button></div>' +
      '</div>' +
      '<div class="gd-full-only">' +
        '<div class="gd-row"><button data-k="play" class="gd-primary">▶ Chạy</button><button data-k="step">⏭ Bước</button>' +
        '<button data-k="reset">↺ Reset</button>' +
        '<select data-k="speed" style="flex:0 0 64px" aria-label="Tốc độ"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option><option value="4">4×</option></select></div>' +
        '<div class="gd-row gd-sound"><button data-snd="music" title="Nhạc nền khi tự chạy">♪ Nhạc</button>' +
        '<button data-snd="sfx" title="Tiếng click chuột và gõ phím">Tiếng click</button>' +
        '<button data-snd="voice" title="Đọc to chú thích từng bước (giọng tiếng Việt của máy)">Thuyết minh</button></div>' +
        '<div class="gd-row"><select data-k="voice" title="Giọng thuyết minh — chọn để nghe thử"></select></div>' +
        '<ol class="gd-steps" data-k="steps"></ol>' +
        '<div class="gd-hint">Bấm một bước để nhảy thẳng tới đó (teleport).</div>' +
      '</div>' +
      '<div class="gd-status" data-k="status" role="status"></div>';
    const q = function (k) { return p.querySelector('[data-k=' + k + ']'); };
    ui = {
      root: document.getElementById('gd-app'), stage: document.getElementById('gd-stage'),
      capMeta: document.getElementById('gd-cap-meta'), capText: document.getElementById('gd-cap-text'),
      modeBtn: document.getElementById('gd-mode'),
      sc: q('sc'), status: q('status'), steps: q('steps'), play: q('play'), prog: q('prog'),
      back: q('back'), next: q('next'), speak: q('speak'), auto: q('auto'),
    };
    scenarios.forEach(function (s) {
      ui.sc.appendChild(new Option(R.mode === 'simple' ? s.title : '[' + (s.kind || 'happy') + '] ' + s.title, s.id));
    });
    ui.sc.onchange = function () { teleportFresh(ui.sc.value); };
    ui.modeBtn.onclick = function () { applyMode(R.mode === 'simple' ? 'full' : 'simple'); };

    // chế độ đơn giản
    ui.next.onclick = next; ui.back.onclick = back;
    q('restart').onclick = function () { teleportFresh(R.sc.id); };
    ui.auto.onclick = function () { if (R.playing) pause(); else play(); };
    ui.speak.onclick = function () {
      PREF.set('voice', !PREF.voice); render();
      if (!PREF.voice) Voice.stop();
      else if (Voice.missing()) setStatus('Máy này chưa có giọng đọc tiếng Việt.', 'err');
    };

    // chế độ đầy đủ
    ui.play.onclick = function () { if (R.playing) pause(); else play(); };
    q('step').onclick = stepOnce;
    q('reset').onclick = function () { teleport(0); };
    ui.voice = q('voice');
    const fillVoices = function () {
      const list = Voice.list(), cur = Voice.current();
      ui.voice.innerHTML = '';
      if (!list.length) { ui.voice.appendChild(new Option('Máy chưa có giọng tiếng Việt', '')); ui.voice.disabled = true; return; }
      ui.voice.disabled = false;
      list.forEach(function (v) { const o = new Option('Giọng: ' + voiceLabel(v), v.name); o.selected = !!cur && v.name === cur.name; ui.voice.appendChild(o); });
    };
    fillVoices(); Voice.onVoices(fillVoices);
    ui.voice.onchange = function () { Voice.choose(ui.voice.value); Voice.sample(); };
    p.querySelectorAll('[data-snd]').forEach(function (b) {
      const k = b.dataset.snd;
      b.classList.toggle('gd-off', !PREF[k]);
      b.onclick = function () {
        PREF.set(k, !PREF[k]); b.classList.toggle('gd-off', !PREF[k]);
        if (k === 'music') { if (PREF.music && R.playing) Music.start(); else Music.stop(); }
        if (k === 'voice' && !PREF.voice) Voice.stop();
      };
    });
    q('speed').onchange = function (e) { R.speed = parseFloat(e.target.value) || 1; };
  }

  function render() {
    if (!ui) return;
    ui.play.textContent = R.playing ? '⏸ Dừng' : '▶ Chạy';
    ui.auto.textContent = R.playing ? '⏸ Dừng' : '▶ Tự chạy';
    ui.speak.setAttribute('aria-pressed', PREF.voice ? 'true' : 'false');
    ui.speak.classList.toggle('gd-off', !PREF.voice);
    ui.back.disabled = R.busy || !R.steps.slice(0, R.i).some(hasText);
    ui.next.disabled = R.busy || R.playing;
    const total = R.steps.filter(hasText).length, done = R.steps.slice(0, R.i).filter(hasText).length;
    ui.prog.textContent = total ? (done >= total ? 'Đã xong ' + total + ' bước' : 'Đã làm ' + done + ' / ' + total + ' bước') : '';
    ui.steps.innerHTML = '';
    R.steps.forEach(function (s, idx) {
      const li = document.createElement('li');
      li.className = idx < R.i ? 'done' : idx === R.i ? 'cur' : '';
      if (idx === R.fail) li.className = 'fail';
      li.innerHTML = '<span class="n">' + (idx + 1) + '</span>';
      li.appendChild(document.createTextNode(S.describe(s)));
      li.onclick = function () { teleport(idx); };
      ui.steps.appendChild(li);
    });
    const cur = ui.steps.querySelector('.cur, .fail');
    if (cur && cur.scrollIntoView && R.mode === 'full') cur.scrollIntoView({ block: 'nearest' });
  }

  /* ---------------- API công khai ---------------- */
  // Đưa mockup về trạng thái ban đầu: xoá các khoá localStorage đã khai ở guide.json (resetStorage) rồi tải lại iframe.
  // Không bao giờ xoá toàn bộ localStorage — origin được chia sẻ với mọi mockup khác trên cùng Pages.
  Guide.reset = async function () {
    try {
      Object.keys(localStorage).filter(function (k) {
        return (cfg.resetStorage || []).some(function (p) { return k.indexOf(p) === 0; });
      }).forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) { /* ignore */ }
    clearOverlays();
    await loadApp();
  };

  async function fetchJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(url + ' → HTTP ' + r.status);
    return r.json();
  }

  Guide.start = async function () {
    frame = document.getElementById('gd-frame');
    const q = new URLSearchParams(location.search);
    const fail = function (msg) {
      const c = document.getElementById('gd-cap-text'); if (c) c.textContent = msg; console.error('[Guide]', msg);
    };
    try {
      cfg = Object.assign({ app: '../index.html', targets: 'targets.json', intents: 'intents.json',
        scenarios: 'scenarios/index.json', voice: 'voice.json', resetStorage: [], defaultMode: 'simple' }, await fetchJSON('guide.json'));
      targets = await fetchJSON(cfg.targets).catch(function () { return {}; });
      intents = await fetchJSON(cfg.intents).catch(function () { return {}; });
      const vj = await fetchJSON(cfg.voice).catch(function () { return null; });
      if (vj && vj.pronounce) Voice.setDict(vj.pronounce);
      const list = await fetchJSON(cfg.scenarios);
      scenarios = await Promise.all(list.map(function (f) { return fetchJSON('scenarios/' + f); }));
    } catch (e) { return fail('Không nạp được guide: ' + e.message + ' — mở qua http (không phải file://).'); }
    scenarios.forEach(function (sc) {
      const errs = S.validate(sc, intents);
      if (errs.length) console.error('[Guide] Kịch bản "' + sc.id + '" sai: ' + errs.join('; '));
    });
    if (!scenarios.length) return fail('Guide chưa có kịch bản nào (scenarios/index.json trống).');

    const mode = q.get('mode') || pref('mode', cfg.defaultMode);
    R.mode = mode === 'full' ? 'full' : 'simple';
    // Chế độ đơn giản: chậm hơn và KHÔNG tự đọc/phát tiếng nếu người xem chưa tự bật.
    R.speed = parseFloat(q.get('speed')) || (R.mode === 'simple' ? 0.7 : 1);
    if (R.mode === 'simple' && q.get('voice') !== '1' && pref('voice', null) == null) PREF.voice = false;

    const st = cfg.stamp || {};
    document.getElementById('gd-title').textContent = cfg.title || 'Hướng dẫn thao tác';
    document.getElementById('gd-stamp').textContent = st.version
      ? 'Dựng trên ' + st.version + (st.rev ? ' · rev' + st.rev : '') + (st.date ? ' · ' + st.date : '') : '';
    buildUI(); applyMode(R.mode);
    try { await loadApp(); } catch (e) { return fail(e.message); }
    loadScenario(q.get('scenario')); ui.sc.value = R.sc.id;
    if (q.get('scenario') && q.get('step')) await teleport(parseInt(q.get('step'), 10) || 0);
    else introCaption();
    if (q.get('autoplay') === '1') play();
    Guide.ready = true;
  };

  Guide.scenarios = function () { return scenarios; };
  global.Guide = Guide;
})(window);
