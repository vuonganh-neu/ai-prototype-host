/*
 * MK — engine cho mockup tĩnh (HTML/CSS/JS thuần, không build, chạy được trên GitHub Pages).
 *
 *  - MK.store      : localStorage có namespace  mk:<project>:<version>:  (tách biệt hoàn toàn với source dự án)
 *  - MK.onReset(fn): app đăng ký cách tự đưa về trạng thái ban đầu
 *  - Runner        : chạy kịch bản trên chính DOM của mockup
 *       ▶ Play      : tự chạy có con trỏ giả + chú thích  → demo / guide
 *       ⏭ Step      : chạy từng bước
 *       ⤓ Teleport  : bấm một bước trong danh sách → nhảy thẳng tới trạng thái đó (chạy nhanh các bước trước, không animation)
 *  - URL params    : ?scenario=<id>&step=<n>&autoplay=1&speed=2&mk=0 (ẩn panel) · âm thanh: &music=0 &sfx=0 &voice=0 &voiceName=HoaiMy
 *
 * Mọi đường dẫn là tương đối → chạy được dưới https://<user>.github.io/<repo>/...
 * Lưu ý: fetch JSON không chạy với file:// → mở qua http (xem README).
 */
(function (global) {
  'use strict';

  const S = global.MKScenario;
  const sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  const sel = function (id) { return document.querySelector('[data-testid="' + id + '"]'); };
  const isVisible = function (el) { return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length)); };

  const MK = { ready: false, store: null };
  let cfg = null, intents = {}, scenarios = [], resetHook = function () {};
  const R = { sc: null, steps: [], i: 0, playing: false, busy: false, speed: 1, fail: -1 };
  let ui = null; // tham chiếu các phần tử panel

  /* ---------------- store ---------------- */
  function makeStore(prefix) {
    return {
      prefix: prefix,
      get: function (k, d) {
        try { const v = localStorage.getItem(prefix + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; }
      },
      set: function (k, v) { try { localStorage.setItem(prefix + k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
      clear: function () {
        try {
          Object.keys(localStorage).filter(function (k) { return k.indexOf(prefix) === 0; })
            .forEach(function (k) { localStorage.removeItem(k); });
        } catch (e) { /* ignore */ }
      },
    };
  }

  /* ---------------- overlays: cursor / highlight / caption ---------------- */
  let cursor, cap, hlEl;
  function ensureOverlays() {
    if (cursor) return;
    cursor = document.createElement('div');
    cursor.className = 'mk-cursor'; cursor.setAttribute('data-mk-ui', '');
    cursor.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 2l7 19 2.6-7.4L20 11z" fill="#fff" stroke="#111" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    cap = document.createElement('div');
    cap.className = 'mk-cap'; cap.setAttribute('data-mk-ui', ''); cap.hidden = true;
    document.body.appendChild(cursor); document.body.appendChild(cap);
  }
  function clearOverlays() {
    if (hlEl) { hlEl.classList.remove('mk-hl'); hlEl = null; }
    if (cap) cap.hidden = true;
    if (cursor) cursor.style.transform = 'translate(-100px,-100px)';
  }
  function caption(text, n, total, context) {
    ensureOverlays();
    if (!text) { cap.hidden = true; return; }
    cap.innerHTML = '';
    const small = document.createElement('small');
    small.textContent = 'Bước ' + n + '/' + total + (context ? ' · ' + context : '');
    cap.appendChild(small);
    cap.appendChild(document.createTextNode(text));
    cap.hidden = false;
  }
  async function pointAt(el, instant) {
    if (instant) return;
    ensureOverlays();
    el.scrollIntoView({ block: 'center', behavior: 'auto' });
    if (hlEl) hlEl.classList.remove('mk-hl');
    hlEl = el; el.classList.add('mk-hl');
    const r = el.getBoundingClientRect();
    cursor.style.transform = 'translate(' + (r.left + r.width / 2) + 'px,' + (r.top + r.height / 2) + 'px)';
    await sleep(800 / R.speed);
  }
  function clickFx() {
    if (!cursor) return;
    cursor.classList.remove('mk-click'); void cursor.offsetWidth; cursor.classList.add('mk-click');
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
      try { return localStorage.getItem('mk:pref:' + k) !== '0'; } catch (e) { return true; }
    }
    return {
      music: get('music'), sfx: get('sfx'), voice: get('voice'),
      set: function (k, v) { this[k] = v; try { localStorage.setItem('mk:pref:' + k, v ? '1' : '0'); } catch (e) { /* ignore */ } },
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
    if (!wanted) { try { wanted = localStorage.getItem('mk:pref:voiceName') || ''; } catch (e) { /* ignore */ } }
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
        wanted = name; try { localStorage.setItem('mk:pref:voiceName', name); } catch (e) { /* ignore */ }
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
  function need(id) {
    const el = sel(id);
    if (!el) throw new Error('Không thấy phần tử data-testid="' + id + '"');
    return el;
  }
  function setValue(el, v) {
    const proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype
      : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }
  async function until(cond, label, ms) {
    const end = Date.now() + (ms || 2000);
    while (Date.now() < end) { if (cond()) return; await sleep(40); }
    throw new Error('Không đạt điều kiện: ' + label);
  }

  async function exec(step, instant) {
    const wait = function (ms) { return instant ? Promise.resolve() : sleep(ms / R.speed); };
    switch (step.do) {
      case 'reset': MK.reset(); break;
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
    ui.status.className = 'mk-status' + (kind ? ' mk-' + kind : '');
  }

  // Lời cần nói ở bước này. Trong một cụm intent có câu nghiệp vụ (intentSay) thì chỉ nói câu đó một lần ở bước
  // đầu cụm; câu chung chung của từng bước con ("Lọc theo nhóm hàng") chỉ hiện chú thích, không đọc.
  function narration(i) {
    const s = R.steps[i], prev = R.steps[i - 1];
    if (s.intentSay || s.intentSpeak) {
      const same = prev && prev.intent === s.intent && prev.intentSay === s.intentSay && prev.intentSpeak === s.intentSpeak;
      return same ? '' : (s.intentSpeak || s.intentSay);
    }
    return s.speak || s.say || '';
  }
  // Thời gian để mắt kịp đọc chú thích khi không có thuyết minh (ms ở tốc độ 1×).
  const readMs = function (text) { return 700 + text.length * 55; };

  async function runOne(instant) {
    const step = R.steps[R.i];
    let talk = null, text = '';
    if (!instant) {
      text = narration(R.i);
      // bước kỹ thuật không có lời (expect…) giữ nguyên chú thích trước, không hiện mã testid cho người xem
      const shown = step.say || step.intentSay;
      if (shown) caption(shown, R.i + 1, R.steps.length, step.say && step.intentSay !== step.say ? step.intentSay : '');
      talk = Voice.speak(text);
    }
    try { await exec(step, instant); }
    catch (e) {
      Voice.stop();
      R.fail = R.i; R.playing = false;
      setStatus('Bước ' + (R.i + 1) + ' lỗi: ' + e.message, 'err');
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
    if (Voice.missing()) setStatus('Máy chưa có giọng đọc tiếng Việt → bỏ qua thuyết minh, chỉ hiện chú thích.', '');
    Music.start();
    try {
      while (R.playing && R.i < R.steps.length) { await runOne(false); render(); await sleep(400 / R.speed); }
      if (R.i >= R.steps.length) { setStatus('Hoàn tất ✓ (' + R.steps.length + ' bước)', 'ok'); if (cap) cap.hidden = true; }
    } catch (e) { /* đã báo */ }
    Music.stop(); Voice.stop();
    R.playing = false; R.busy = false; render();
  }
  function pause() { R.playing = false; Voice.stop(); }
  async function stepOnce() {
    if (R.busy || R.i >= R.steps.length) return;
    R.busy = true; R.fail = -1;
    try { await runOne(false); } catch (e) { /* đã báo */ }
    R.busy = false; render();
  }
  // Nhảy tới trạng thái "ngay trước bước n" bằng cách chạy nhanh n bước đầu (nguồn sự thật vẫn là kịch bản).
  async function teleport(n) {
    R.playing = false; Voice.stop();
    while (R.busy) await sleep(30);
    R.busy = true; R.fail = -1;
    MK.reset(); R.i = 0;
    try {
      for (; R.i < Math.min(n, R.steps.length);) await runOne(true);
      setStatus(n ? 'Đã nhảy tới bước ' + (R.i + 1) + '. Bấm ⏭ để đi tiếp.' : '', '');
    } catch (e) { /* đã báo */ }
    R.busy = false; render();
  }

  /* ---------------- panel ---------------- */
  function buildPanel() {
    const p = document.createElement('div');
    p.className = 'mk-panel'; p.setAttribute('data-mk-ui', '');
    p.innerHTML =
      '<header><b>MOCKUP · ' + cfg.project + ' · ' + cfg.version + '</b><em>thu/gọn</em></header>' +
      '<div class="mk-body">' +
      '<div class="mk-row"><select data-k="sc"></select></div>' +
      '<div class="mk-row"><button data-k="play" class="mk-primary">▶ Chạy</button><button data-k="step">⏭ Bước</button>' +
      '<button data-k="reset">↺ Reset</button>' +

      '<select data-k="speed" style="flex:0 0 64px"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option><option value="4">4×</option></select></div>' +
      '<div class="mk-row mk-sound"><button data-snd="music" title="Nhạc nền khi tự chạy">♪ Nhạc</button>' +
      '<button data-snd="sfx" title="Tiếng click chuột và gõ phím">Tiếng click</button>' +
      '<button data-snd="voice" title="Đọc to chú thích từng bước (giọng tiếng Việt của máy)">Thuyết minh</button></div>' +
      '<div class="mk-row"><select data-k="voice" title="Giọng thuyết minh — chọn để nghe thử"></select></div>' +
      '<div class="mk-status" data-k="status"></div>' +
      '<ol class="mk-steps" data-k="steps"></ol>' +
      '<div class="mk-hint">Bấm một bước để nhảy thẳng tới đó (teleport). Dữ liệu chỉ nằm trong localStorage của trình duyệt này.</div>' +
      '</div>';
    document.body.appendChild(p);
    ui = {
      root: p, sc: p.querySelector('[data-k=sc]'), status: p.querySelector('[data-k=status]'),
      steps: p.querySelector('[data-k=steps]'), play: p.querySelector('[data-k=play]'),
    };
    p.querySelector('header').onclick = function () { p.classList.toggle('mk-min'); };
    scenarios.forEach(function (s) {
      const o = document.createElement('option');
      o.value = s.id; o.textContent = '[' + (s.kind || 'happy') + '] ' + s.title; ui.sc.appendChild(o);
    });
    ui.sc.onchange = function () { teleportFresh(ui.sc.value); };
    ui.play.onclick = function () { if (R.playing) pause(); else play(); };
    p.querySelector('[data-k=step]').onclick = stepOnce;
    p.querySelector('[data-k=reset]').onclick = function () { teleport(0); };
    ui.voice = p.querySelector('[data-k=voice]');
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
      b.classList.toggle('mk-off', !PREF[k]);
      b.onclick = function () {
        PREF.set(k, !PREF[k]); b.classList.toggle('mk-off', !PREF[k]);
        if (k === 'music') { if (PREF.music && R.playing) Music.start(); else Music.stop(); }
        if (k === 'voice' && !PREF.voice) Voice.stop();
      };
    });
    p.querySelector('[data-k=speed]').onchange = function (e) { R.speed = parseFloat(e.target.value) || 1; };
  }
  async function teleportFresh(id) { loadScenario(id); await teleport(0); }

  function render() {
    if (!ui) return;
    ui.play.textContent = R.playing ? '⏸ Dừng' : '▶ Chạy';
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
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest' });
  }

  /* ---------------- API công khai ---------------- */
  MK.onReset = function (fn) { resetHook = fn; };
  MK.reset = function () { MK.store.clear(); clearOverlays(); resetHook(); };

  async function fetchJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(url + ' → HTTP ' + r.status);
    return r.json();
  }

  // Bước 1: gọi trước khi app khởi tạo (để MK.store sẵn sàng).
  MK.init = async function (opts) {
    cfg = Object.assign({ intents: 'intents.json', scenarios: 'scenarios/index.json', voice: 'voice.json' }, opts);
    MK.store = makeStore('mk:' + cfg.project + ':' + cfg.version + ':');
    try {
      intents = await fetchJSON(cfg.intents).catch(function () { return {}; });
      const vj = await fetchJSON(cfg.voice).catch(function () { return null; }); // tuỳ chọn: từ điển phát âm
      if (vj && vj.pronounce) Voice.setDict(vj.pronounce);
      const list = await fetchJSON(cfg.scenarios);
      scenarios = await Promise.all(list.map(function (f) { return fetchJSON('scenarios/' + f); }));
    } catch (e) {
      console.warn('[MK] Không nạp được kịch bản:', e.message, '— hãy mở qua http (không phải file://)');
      scenarios = [];
    }
    scenarios.forEach(function (sc) {
      const errs = S.validate(sc, intents);
      if (errs.length) console.error('[MK] Kịch bản "' + sc.id + '" sai: ' + errs.join('; '));
    });
  };

  // Bước 2: gọi sau khi app đã dựng xong DOM + đăng ký onReset.
  MK.start = async function () {
    const q = new URLSearchParams(location.search);
    R.speed = parseFloat(q.get('speed')) || 1;
    if (q.get('mk') !== '0' && scenarios.length) buildPanel();
    if (scenarios.length) {
      loadScenario(q.get('scenario'));
      if (ui) ui.sc.value = R.sc.id;
      if (q.get('scenario')) {
        await teleport(parseInt(q.get('step') || '0', 10) || 0);
        if (q.get('autoplay') === '1') play();
      }
    }
    MK.ready = true;
  };

  MK.scenarios = function () { return scenarios; };
  MK.sound = { prefs: PREF, music: Music, sfx: Sfx, voice: Voice };
  global.MK = MK;
})(window);
