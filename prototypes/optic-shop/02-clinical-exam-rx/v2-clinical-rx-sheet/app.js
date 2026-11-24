(() => {
  'use strict';

  const CERTIFIED_SIGNERS = [
    { id: 'STF-01', name: 'KTV Nguyễn Thu Hà', license: 'CCHN 004821/BYT-KX' },
    { id: 'STF-02', name: 'CN Khúc xạ Trần Đức Minh', license: 'CCHN 005192/BYT-KX' },
    { id: 'STF-03', name: 'BS CK1 Lê Hải Yến (Cố vấn)', license: 'CCHN 001934/BYT-NH' }
  ];

  const SAMPLE_FRAMES = [
    { id: 'FRM-01', label: 'Sabae Titanium tròn (49-20-145 · Cao B = 44 mm · ED 52)', bMm: 44, edMm: 52, rimType: 'FULL_RIM' },
    { id: 'FRM-02', label: 'Silhouette Minimal X (52-18-145 · Cao B = 36 mm · Không viền)', bMm: 36, edMm: 54, rimType: 'RIMLESS' },
    { id: 'FRM-03', label: 'Gọng nửa viền mảnh (53-17-140 · Cao B = 28 mm · Hẹp)', bMm: 28, edMm: 55, rimType: 'SEMI_RIMLESS' }
  ];

  const VA_SCALES = {
    DECIMAL_VN: {
      label: 'Thập phân VN (10/10)',
      options: ['12/10', '10/10', '9/10', '8/10', '7/10', '6/10', '5/10', '4/10', '3/10', '2/10', '1/10', 'ĐNT 3m', 'ĐNT 1m', 'ĐNT 0.5m', 'BBT', 'ST(+)', 'ST(−)', 'Không đo được'],
      lowSet: new Set(['6/10', '5/10', '4/10', '3/10', '2/10', '1/10', 'ĐNT 3m', 'ĐNT 1m', 'ĐNT 0.5m', 'BBT', 'ST(+)', 'ST(−)'])
    },
    SNELLEN: {
      label: 'Snellen (20/20)',
      options: ['20/15', '20/20', '20/25', '20/30', '20/40', '20/50', '20/70', '20/100', '20/200', 'CF 3m', 'CF 1m', 'HM', 'LP(+)', 'NLP', 'Không đo được'],
      lowSet: new Set(['20/30', '20/40', '20/50', '20/70', '20/100', '20/200', 'CF 3m', 'CF 1m', 'HM', 'LP(+)', 'NLP'])
    },
    LOGMAR: {
      label: 'logMAR (0.0)',
      options: ['-0.1', '0.0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.7', '1.0', 'ĐNT 3m', 'ĐNT 1m', 'BBT', 'ST(+)', 'ST(−)', 'Không đo được'],
      lowSet: new Set(['0.2', '0.3', '0.4', '0.5', '0.7', '1.0', 'ĐNT 3m', 'ĐNT 1m', 'BBT', 'ST(+)', 'ST(−)'])
    }
  };

  Object.values(VA_SCALES).forEach((s) => s.lowSet.add('Không đo được'));

  // Người ký = tài khoản đang đăng nhập có chứng chỉ khúc xạ (B-06)
  const CURRENT_USER = CERTIFIED_SIGNERS[0];

  // Khoảng hợp lệ (B-01). SPH lấy theo gói nghiệp vụ v1; các giới hạn còn lại là NGƯỠNG TẠM, chờ KTV chốt.
  const LIMITS = {
    sph: [-25, 20], cyl: [-10, 10], add: [0, 4], prism: [0, 15],
    pdOd: [24, 40], pdOs: [24, 40], pdNear: [48, 76]
  };
  const SOFT_LIMITS = { sphAbs: 10, cylAbs: 6, addMin: 0.75, addMax: 3.5 };

  // B-04: quy đổi thị lực giữa 3 thang (gần đúng, theo thị lực thập phân; mức đếm ngón/sáng tối theo nhóm tương đương)
  const VA_SCALE_IDX = { DECIMAL_VN: 0, SNELLEN: 1, LOGMAR: 2 };
  const VA_SPECIAL_GROUPS = [
    ['ĐNT 3m', 'CF 3m', 'ĐNT 3m'],
    ['ĐNT 1m', 'CF 1m', 'ĐNT 1m'],
    ['ĐNT 0.5m', 'CF 1m', 'ĐNT 1m'],
    ['BBT', 'HM', 'BBT'],
    ['ST(+)', 'LP(+)', 'ST(+)'],
    ['ST(−)', 'NLP', 'ST(−)'],
    ['Không đo được', 'Không đo được', 'Không đo được']
  ];
  function vaToDecimal(scaleKey, v) {
    const t = String(v);
    if (scaleKey === 'DECIMAL_VN') { const m = t.match(/^(\d+)\/10$/); return m ? Number(m[1]) / 10 : null; }
    if (scaleKey === 'SNELLEN') { const m = t.match(/^20\/(\d+)$/); return m ? 20 / Number(m[1]) : null; }
    const n = Number(t);
    return t !== '' && Number.isFinite(n) ? Math.pow(10, -n) : null;
  }
  function convertVa(v, from, to) {
    if (from === to) return v;
    const d = vaToDecimal(from, v);
    if (d !== null) {
      let best = null;
      let bestDist = Infinity;
      VA_SCALES[to].options.forEach((opt) => {
        const od = vaToDecimal(to, opt);
        if (od === null) return;
        const dist = Math.abs(Math.log10(od / d));
        if (dist < bestDist) { best = opt; bestDist = dist; }
      });
      return best;
    }
    const g = VA_SPECIAL_GROUPS.find((row) => row[VA_SCALE_IDX[from]] === v);
    return g ? g[VA_SCALE_IDX[to]] : 'Không đo được';
  }

  const PURPOSES = {
    DISTANCE: 'Kính nhìn xa / Đeo thường xuyên',
    PROGRESSIVE: 'Kính đa tròng (Progressive)',
    OFFICE: 'Kính văn phòng (Degressive — Trung gian + Gần)',
    READING: 'Kính đọc sách / Nhìn gần riêng',
    SUNGLASSES_RX: 'Kính râm có độ'
  };

  const STATUS_META = {
    DRAFT: { label: 'Nháp', cls: 'badge-neutral' },
    SIGNED: { label: 'Đã ký', cls: 'badge-teal' },
    LOCKED_FOR_LAB: { label: 'Đã dùng cắt kính (Khóa)', cls: 'badge-ok' },
    SUPERSEDED: { label: 'Đã thay thế', cls: 'badge-warn' }
  };

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const roundQuarter = (v) => Math.round((Number(v) || 0) * 4) / 4;
  const fmtD = (v) => {
    const n = roundQuarter(v);
    if (n === 0) return '0.00';
    return (n > 0 ? '+' : '−') + Math.abs(n).toFixed(2);
  };
  const deepClone = (x) => JSON.parse(JSON.stringify(x));

  function normalizeAxis(a) {
    let n = Math.round(Number(a) || 0);
    if (n <= 0) return 180;
    while (n > 180) n -= 180;
    while (n < 1) n += 180;
    return n;
  }

  function transposeEye(eye) {
    const cyl = roundQuarter(eye.cyl);
    if (cyl === 0) return { sph: roundQuarter(eye.sph), cyl: 0, axis: '' };
    const newSph = roundQuarter(Number(eye.sph) + cyl);
    const newCyl = roundQuarter(-cyl);
    const ax = normalizeAxis(eye.axis || 180);
    const newAxis = ax <= 90 ? ax + 90 : ax - 90;
    return { sph: newSph, cyl: newCyl, axis: newAxis };
  }

  function toMinusCyl(eye, convention) {
    const cyl = roundQuarter(eye.cyl);
    if (convention === 'PLUS' && cyl > 0) return transposeEye(eye);
    if (convention === 'MINUS' && cyl > 0) return transposeEye(eye);
    return { sph: roundQuarter(eye.sph), cyl, axis: cyl ? normalizeAxis(eye.axis || 180) : '' };
  }

  function calcSE(eye) {
    return roundQuarter((Number(eye.sph) || 0) + (Number(eye.cyl) || 0) / 2);
  }

  function classifyEye(eye, convention) {
    const m = toMinusCyl(eye, convention);
    const se = calcSE(m);
    const absSe = Math.abs(se);
    const absCyl = Math.abs(m.cyl);
    const labels = [];

    if (absSe < 0.25 && absCyl < 0.5) {
      labels.push({ text: 'Chính thị', cls: 'badge-ok' });
    } else if (se < 0) {
      if (absSe < 3) labels.push({ text: 'Cận nhẹ', cls: 'badge-info' });
      else if (absSe < 6) labels.push({ text: 'Cận trung bình', cls: 'badge-warn' });
      else labels.push({ text: 'Cận nặng', cls: 'badge-err' });
    } else if (se > 0) {
      if (absSe < 2) labels.push({ text: 'Viễn nhẹ', cls: 'badge-info' });
      else if (absSe < 5) labels.push({ text: 'Viễn trung bình', cls: 'badge-warn' });
      else labels.push({ text: 'Viễn nặng', cls: 'badge-err' });
    }

    if (absCyl >= 0.5) {
      const ax = normalizeAxis(m.axis || 180);
      let astType = 'Loạn chéo';
      if (ax <= 20 || ax >= 160) astType = 'Loạn thuận (WTR)';
      else if (ax >= 70 && ax <= 110) astType = 'Loạn nghịch (ATR)';
      labels.push({ text: `${astType} ${absCyl.toFixed(2)} D`, cls: 'badge-neutral' });
    }
    return { se, labels };
  }

  function addMonths(dateStr, months) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setMonth(d.getMonth() + Number(months || 12));
    return d.toISOString().slice(0, 10);
  }

  function createSeedCustomers() {
    return [
      {
        id: 'CUS-01',
        name: 'Nguyễn Minh Anh',
        age: 27,
        phone: '0912 456 789',
        note: 'Nhân viên thiết kế, làm việc màn hình > 9h/ngày',
        defaultForm: {
          source: 'IN_STORE',
          hospitalName: '',
          cylConvention: 'MINUS',
          purpose: 'DISTANCE',
          vaScale: 'DECIMAL_VN',
          binocularVa: '10/10',
          useAutoref: true,
          autoref: { od: { sph: -3.25, cyl: -1.00, axis: 178 }, os: { sph: -2.75, cyl: -0.75, axis: 5 } },
          od: { sph: -3.00, cyl: -1.00, axis: 180, add: 0, prism: 0, base: 'BI', ucva: '2/10', bcva: '10/10', ph: '10/10' },
          os: { sph: -2.50, cyl: -0.75, axis: 5, add: 0, prism: 0, base: 'BI', ucva: '3/10', bcva: '10/10', ph: '10/10' },
          pdOd: 31.5, pdOs: 31.0, pdNear: 60.0,
          prismJustification: '',
          fitting: { frameId: 'FRM-01', bvd: 12, panto: 9, wrap: 5, segHeight: 20, ocHeight: 21 },
          validityMonths: 12,
          referralFlag: false,
          referralReason: '',
          status: 'DRAFT',
          revisionOf: null,
          revisionReason: ''
        },
        history: [
          {
            id: 'RX-2026-081', version: 1, date: '2026-05-12', expiresAt: '2027-05-12', status: 'LOCKED_FOR_LAB',
            source: 'IN_STORE', cylConvention: 'MINUS', purpose: 'DISTANCE', signer: 'KTV Nguyễn Thu Hà (CCHN 004821/BYT-KX)',
            od: { sph: -2.75, cyl: -0.75, axis: 180, add: 0, prism: 0, base: '' },
            os: { sph: -2.25, cyl: -0.50, axis: 5, add: 0, prism: 0, base: '' },
            pdOd: 31.5, pdOs: 31.0, vaScale: 'DECIMAL_VN', binocularVa: '10/10', referralFlag: false
          },
          {
            id: 'RX-2025-044', version: 1, date: '2025-04-18', expiresAt: '2026-04-18', status: 'LOCKED_FOR_LAB',
            source: 'IN_STORE', cylConvention: 'MINUS', purpose: 'DISTANCE', signer: 'KTV Nguyễn Thu Hà (CCHN 004821/BYT-KX)',
            od: { sph: -2.25, cyl: -0.50, axis: 175, add: 0, prism: 0, base: '' },
            os: { sph: -2.00, cyl: -0.50, axis: 10, add: 0, prism: 0, base: '' },
            pdOd: 31.5, pdOs: 31.0, vaScale: 'DECIMAL_VN', binocularVa: '10/10', referralFlag: false
          },
          {
            id: 'RX-2024-019', version: 1, date: '2024-03-10', expiresAt: '2025-03-10', status: 'LOCKED_FOR_LAB',
            source: 'IN_STORE', cylConvention: 'MINUS', purpose: 'DISTANCE', signer: 'CN Khúc xạ Trần Đức Minh (CCHN 005192/BYT-KX)',
            od: { sph: -1.75, cyl: -0.50, axis: 175, add: 0, prism: 0, base: '' },
            os: { sph: -1.50, cyl: -0.25, axis: 10, add: 0, prism: 0, base: '' },
            pdOd: 31.5, pdOs: 31.0, vaScale: 'DECIMAL_VN', binocularVa: '10/10', referralFlag: false
          }
        ]
      },
      {
        id: 'CUS-02',
        name: 'Phạm Quang Huy',
        age: 54,
        phone: '0983 221 904',
        note: 'Viễn thị kèm lão thị, cần kính đa tròng lái xe + đọc tài liệu',
        defaultForm: {
          source: 'IN_STORE',
          hospitalName: '',
          cylConvention: 'MINUS',
          purpose: 'PROGRESSIVE',
          vaScale: 'DECIMAL_VN',
          binocularVa: '10/10',
          useAutoref: true,
          autoref: { od: { sph: 1.50, cyl: -0.50, axis: 90 }, os: { sph: 1.25, cyl: -0.50, axis: 85 } },
          od: { sph: 1.25, cyl: -0.50, axis: 90, add: 1.75, prism: 0, base: 'BI', ucva: '6/10', bcva: '10/10', ph: '10/10' },
          os: { sph: 1.00, cyl: -0.50, axis: 85, add: 1.75, prism: 0, base: 'BI', ucva: '7/10', bcva: '10/10', ph: '10/10' },
          pdOd: 33.0, pdOs: 32.5, pdNear: 62.5,
          prismJustification: '',
          fitting: { frameId: 'FRM-03', bvd: 12, panto: 10, wrap: 5, segHeight: 20, ocHeight: 21 },
          validityMonths: 12,
          referralFlag: false,
          referralReason: '',
          status: 'DRAFT',
          revisionOf: null,
          revisionReason: ''
        },
        history: [
          {
            id: 'RX-2025-112', version: 1, date: '2025-09-20', expiresAt: '2026-09-20', status: 'LOCKED_FOR_LAB',
            source: 'IN_STORE', cylConvention: 'MINUS', purpose: 'PROGRESSIVE', signer: 'CN Khúc xạ Trần Đức Minh (CCHN 005192/BYT-KX)',
            od: { sph: 1.00, cyl: -0.50, axis: 90, add: 1.50, prism: 0, base: '' },
            os: { sph: 0.75, cyl: -0.50, axis: 85, add: 1.50, prism: 0, base: '' },
            pdOd: 33.0, pdOs: 32.5, vaScale: 'DECIMAL_VN', binocularVa: '10/10', referralFlag: false
          }
        ]
      },
      {
        id: 'CUS-03',
        name: 'Trần Thị Bích Ngọc',
        age: 38,
        phone: '0904 778 312',
        note: 'Mang toa Bệnh viện Mắt TW (ghi trụ dương +CYL) có lăng kính & lệch độ 2 mắt',
        defaultForm: {
          source: 'EXTERNAL_RX',
          hospitalName: 'Bệnh viện Mắt Trung ương',
          cylConvention: 'PLUS',
          purpose: 'DISTANCE',
          vaScale: 'DECIMAL_VN',
          binocularVa: '8/10',
          useAutoref: false,
          autoref: { od: { sph: 0, cyl: 0, axis: '' }, os: { sph: 0, cyl: 0, axis: '' } },
          od: { sph: -5.50, cyl: 1.50, axis: 85, add: 0, prism: 1.5, base: 'BI', ucva: '1/10', bcva: '6/10', ph: '8/10' },
          os: { sph: -2.25, cyl: 0.75, axis: 95, add: 0, prism: 0, base: 'BI', ucva: '3/10', bcva: '10/10', ph: '10/10' },
          pdOd: 31.0, pdOs: 31.0, pdNear: 59.0,
          prismJustification: 'Cover test: Lác ẩn ngoài nhìn gần 6Δ, khách than mỏi mắt & song thị nhẹ khi đọc > 20 phút (theo toa BV Mắt TW).',
          fitting: { frameId: 'FRM-01', bvd: 12, panto: 9, wrap: 5, segHeight: 19, ocHeight: 20 },
          validityMonths: 12,
          referralFlag: true,
          referralReason: 'BCVA mắt phải 6/10 (< 7/10) và chênh khúc xạ 2 mắt ≥ 2.00 D — khuyến nghị tái khám BS Mắt theo hẹn.',
          status: 'DRAFT',
          revisionOf: null,
          revisionReason: ''
        },
        history: [
          {
            id: 'RX-2025-204', version: 1, date: '2025-07-02', expiresAt: '2026-07-02', status: 'LOCKED_FOR_LAB',
            source: 'EXTERNAL_RX', cylConvention: 'MINUS', purpose: 'DISTANCE', signer: 'BS CK1 Lê Hải Yến (CCHN 001934/BYT-NH)',
            od: { sph: -3.75, cyl: -1.50, axis: 175, add: 0, prism: 1.0, base: 'BI' },
            os: { sph: -1.50, cyl: -0.75, axis: 5, add: 0, prism: 0, base: '' },
            pdOd: 31.0, pdOs: 31.0, vaScale: 'DECIMAL_VN', binocularVa: '8/10', referralFlag: true
          }
        ]
      }
    ];
  }

  let customers = createSeedCustomers();
  let activeCustomerId = 'CUS-01';
  let form = deepClone(customers[0].defaultForm);
  let formError = '';
  let fieldErrors = {};
  let rxSeq = 613;
  let toastTimer = null;

  function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('hidden'), 3400);
  }

  function getCustomer() {
    return customers.find((c) => c.id === activeCustomerId) || customers[0];
  }

  function selectCustomer(id) {
    activeCustomerId = id;
    form = deepClone(getCustomer().defaultForm);
    formError = '';
    fieldErrors = {};
    renderAll();
  }

  function renderCustomerSelector() {
    const sel = document.getElementById('customerSelect');
    sel.innerHTML = customers.map((c) => `<option value="${c.id}" ${c.id === activeCustomerId ? 'selected' : ''}>${esc(c.name)} (${c.age}t · ${esc(c.phone)})</option>`).join('');
    document.querySelectorAll('#quickCasePills .pill').forEach((b) => {
      b.classList.toggle('active', b.dataset.case === activeCustomerId);
    });
  }

  // ==================== CLINICAL CHECKS ====================
  function eyeMismatch(eye, conv) {
    const c = roundQuarter(eye.cyl);
    return (conv === 'MINUS' && c > 0) || (conv === 'PLUS' && c < 0);
  }

  function computeClinicalAlerts() {
    const alerts = [];
    const conv = form.cylConvention;
    const odSe = calcSE(toMinusCyl(form.od, conv));
    const osSe = calcSE(toMinusCyl(form.os, conv));
    const diffSe = Math.abs(odSe - osSe);

    // B-03: dấu trụ mâu thuẫn quy ước đã chọn → chặn ký
    const badEyes = ['od', 'os'].filter((k) => eyeMismatch(form[k], conv)).map((k) => k.toUpperCase());
    if (badEyes.length) {
      alerts.push({
        level: 'err', block: true, action: 'convention',
        text: `Dấu trụ (CYL) của ${badEyes.join(' & ')} mâu thuẫn quy ước đã chọn (${conv === 'MINUS' ? 'Trụ âm −CYL' : 'Trụ dương +CYL'}). Phải thống nhất trước khi ký, nếu không Lab có thể cắt sai độ loạn.`
      });
    }

    if (diffSe >= 2.0) {
      alerts.push({ level: 'warn', text: `Lệch khúc xạ hai mắt (Anisometropia): |SE OD − SE OS| = ${diffSe.toFixed(2)} D (≥ 2.00 D) — cân nhắc chiết suất cân bằng độ dày & theo dõi thích nghi.` });
    }

    // B-04 / B-05: BCVA thấp hoặc "Không đo được" → đề xuất cờ chuyển tuyến + bắt nhập lý do trước khi ký
    const scale = VA_SCALES[form.vaScale];
    if (scale.lowSet.has(form.od.bcva) || scale.lowSet.has(form.os.bcva)) {
      const noReason = !String(form.referralReason || '').trim();
      const missing = !form.referralFlag || noReason;
      alerts.push({
        level: 'err', block: missing,
        text: `BCVA dưới ngưỡng 7/10 hoặc không đo được (OD: ${form.od.bcva}, OS: ${form.os.bcva}) — ${!form.referralFlag ? 'cần bật cờ khuyến nghị chuyển tuyến Bác sĩ Mắt và nhập lý do trước khi ký.' : (noReason ? 'đã bật cờ chuyển tuyến, cần nhập lý do trước khi ký.' : 'đã bật cờ khuyến nghị chuyển tuyến kèm lý do.')}`
      });
    }

    // B-01: giá trị bất thường (trong khoảng hợp lệ nhưng cần xác nhận)
    ['od', 'os'].forEach((k) => {
      const e = form[k];
      const odd = [];
      if (Math.abs(Number(e.sph)) > SOFT_LIMITS.sphAbs) odd.push(`SPH ${fmtD(e.sph)}`);
      if (Math.abs(Number(e.cyl)) > SOFT_LIMITS.cylAbs) odd.push(`CYL ${fmtD(e.cyl)}`);
      if (Number(e.add) > 0 && (Number(e.add) < SOFT_LIMITS.addMin || Number(e.add) > SOFT_LIMITS.addMax)) odd.push(`ADD +${Number(e.add).toFixed(2)}`);
      if (odd.length) {
        alerts.push({ level: 'warn', ack: true, text: `${k.toUpperCase()}: giá trị bất thường (${odd.join(', ')}) — kiểm tra lại số đo trước khi ký.` });
      }
    });

    const frame = SAMPLE_FRAMES.find((f) => f.id === form.fitting.frameId);
    if (frame && (form.purpose === 'PROGRESSIVE' || form.purpose === 'OFFICE')) {
      if (frame.bMm < 30) {
        alerts.push({ level: 'err', ack: true, text: `Cảnh báo gọng hẹp: Chiều cao tròng B = ${frame.bMm} mm (< 30 mm tối thiểu cho đa tròng/văn phòng). Cần đổi gọng cao hơn hoặc xác nhận có chủ đích.` });
      } else if (Number(form.fitting.segHeight) > frame.bMm - 10) {
        alerts.push({ level: 'warn', text: `Chiều cao tâm đọc (${form.fitting.segHeight} mm) quá sát mép trên của gọng (B = ${frame.bMm} mm).` });
      }
    }

    // B-08: PD gần phải nhỏ hơn PD xa; PD trung gian (nếu nhập tay) nằm giữa
    const pdTotal = Number(form.pdOd) + Number(form.pdOs);
    if (Number(form.pdNear) >= pdTotal) {
      alerts.push({ level: 'err', ack: true, text: `PD nhìn gần (${Number(form.pdNear).toFixed(1)} mm) phải nhỏ hơn PD xa tổng (${pdTotal.toFixed(1)} mm) — kiểm tra lại số đo PD.` });
    }
    if (form.purpose === 'OFFICE' && form.pdInter !== '' && form.pdInter != null) {
      const pi = Number(form.pdInter);
      if (!(pi > Number(form.pdNear) && pi < pdTotal)) {
        alerts.push({ level: 'warn', ack: true, text: `PD trung gian (${pi.toFixed(1)} mm) phải nằm giữa PD gần (${Number(form.pdNear).toFixed(1)} mm) và PD xa tổng (${pdTotal.toFixed(1)} mm).` });
      }
    }
    return { alerts, odSe, osSe, diffSe };
  }

  // ==================== RANGE / INPUT VALIDATION (B-01, B-02) ====================
  function fieldLabel(eyeKey, field) {
    return `${field.toUpperCase()} ${eyeKey === 'od' ? 'OD' : 'OS'}`;
  }
  function rejectRange(key, label, value, lim) {
    if (value < lim[0] || value > lim[1]) {
      fieldErrors[key] = `${label}: ${value} nằm ngoài khoảng hợp lệ [${lim[0]} … ${lim[1]}] — giá trị bị từ chối, giữ nguyên số cũ.`;
      return true;
    }
    return false;
  }

  // ==================== RENDER LEFT FORM ====================
  function renderStepper(eyeKey, field, val, ariaLabel, isAdd = false, disabled = false) {
    const formatted = isAdd ? (Number(val) > 0 ? '+' + roundQuarter(val).toFixed(2) : '0.00') : fmtD(val);
    const dis = disabled ? 'disabled' : '';
    return `
      <div class="stepper">
        <button type="button" data-step="${eyeKey}:${field}:-1" aria-label="Giảm ${ariaLabel} 0.25 D" ${dis}>−</button>
        <input type="text" value="${formatted}" data-num="${eyeKey}:${field}" aria-label="${ariaLabel}" ${dis} />
        <button type="button" data-step="${eyeKey}:${field}:1" aria-label="Tăng ${ariaLabel} 0.25 D" ${dis}>+</button>
      </div>
    `;
  }

  function isLocked() {
    return Boolean(form.currentRxId) && form.status !== 'DRAFT';
  }

  function renderExamForm() {
    const c = getCustomer();
    const scale = VA_SCALES[form.vaScale];
    const odClass = classifyEye(form.od, form.cylConvention);
    const osClass = classifyEye(form.os, form.cylConvention);
    const { alerts, odSe, osSe } = computeClinicalAlerts();
    const odAlt = transposeEye(form.od);
    const osAlt = transposeEye(form.os);
    const altLabel = form.cylConvention === 'MINUS' ? 'Quy đổi tương đương sang Trụ dương (+CYL)' : 'Quy đổi sang Trụ âm (−CYL · Chuẩn Lab cắt kính)';
    const hasPrism = Number(form.od.prism) > 0 || Number(form.os.prism) > 0;
    const isReading = form.purpose === 'READING';
    const showInter = form.purpose === 'OFFICE';
    const showNear = !isReading && (Number(form.od.add) > 0 || Number(form.os.add) > 0 || form.purpose === 'PROGRESSIVE' || form.purpose === 'OFFICE');
    const binoPd = (Number(form.pdOd) + Number(form.pdOs)).toFixed(1);
    const locked = isLocked();
    const st = STATUS_META[form.status] || STATUS_META.DRAFT;
    const errList = Object.values(fieldErrors);

    const panel = document.getElementById('examFormPanel');
    panel.innerHTML = `
      <div class="block-head" style="margin-bottom:12px">
        <div>
          <h2 style="margin:0;font-size:16px">${esc(c.name)} <span class="muted-xs">(${c.age} tuổi · ${esc(c.phone)})</span></h2>
          <div class="muted-xs">${esc(c.note)}</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end">
          ${form.revisionOf ? `<span class="badge badge-warn">Sửa đổi từ ${esc(form.revisionOf)}</span>` : ''}
          <span class="badge ${st.cls}" id="rxStateBadge">${esc(form.currentRxId || 'Phiếu đo mới')} · ${esc(st.label)}</span>
        </div>
      </div>

      ${formError ? `<div class="callout callout-err" role="alert" style="margin-top:0;margin-bottom:12px"><strong>Không thể ký toa:</strong> ${esc(formError)}</div>` : ''}
      ${locked ? `<div class="callout callout-info" style="margin-top:0;margin-bottom:12px">Phiếu <strong class="mono">${esc(form.currentRxId)}</strong> đã ký — các ô nhập bị khoá. Muốn chỉnh sửa, dùng "Tạo phiên bản sửa đổi" trong Lịch sử toa (bắt buộc ghi lý do).</div>` : ''}
      ${form.legacyNote ? `<div class="callout callout-warn" style="margin-top:0;margin-bottom:12px">Toa gốc cũ chỉ lưu độ khúc xạ, PD xa, thị lực hai mắt và cờ chuyển tuyến. Các trường còn lại (biện minh lăng kính, PD gần, thông số lắp ráp, thị lực từng mắt…) đang lấy giá trị mặc định từ hồ sơ khách — cần KTV kiểm tra lại trước khi ký.</div>` : ''}

      <fieldset class="form-fieldset" ${locked ? 'disabled' : ''}>
      <!-- 1. Source, Convention & Purpose -->
      <div class="block-card">
        <div class="block-head">
          <h3 class="block-title">1. Nguồn toa, Quy ước dấu trụ &amp; Mục đích sử dụng</h3>
          <button type="button" class="btn btn-secondary btn-sm" id="transposeBtn">Chuyển dạng trụ (${form.cylConvention === 'MINUS' ? '−CYL → +CYL' : '+CYL → −CYL'})</button>
        </div>

        <div class="grid-3">
          <div class="field">
            <label for="rxSource">Nguồn toa</label>
            <select id="rxSource" class="select">
              <option value="IN_STORE" ${form.source === 'IN_STORE' ? 'selected' : ''}>Đo tại cửa hàng (IN_STORE)</option>
              <option value="EXTERNAL_RX" ${form.source === 'EXTERNAL_RX' ? 'selected' : ''}>Toa Bệnh viện / Ngoài (EXTERNAL_RX)</option>
            </select>
          </div>
          <div class="field">
            <label for="cylConvention">Quy ước dấu trụ (CYL)</label>
            <select id="cylConvention" class="select">
              <option value="MINUS" ${form.cylConvention === 'MINUS' ? 'selected' : ''}>Trụ âm (−CYL · Chuẩn Lab/Máy VN)</option>
              <option value="PLUS" ${form.cylConvention === 'PLUS' ? 'selected' : ''}>Trụ dương (+CYL · Toa BV/Quốc tế)</option>
            </select>
          </div>
          <div class="field">
            <label for="rxPurpose">Mục đích dùng kính</label>
            <select id="rxPurpose" class="select">
              ${Object.entries(PURPOSES).map(([k, v]) => `<option value="${k}" ${form.purpose === k ? 'selected' : ''}>${esc(v)}</option>`).join('')}
            </select>
          </div>
        </div>

        ${form.source === 'EXTERNAL_RX' ? `
          <div class="grid-2" style="margin-top:10px">
            <div class="field">
              <label for="hospitalName">Tên bệnh viện / phòng khám cấp toa</label>
              <input id="hospitalName" class="input" value="${esc(form.hospitalName)}" placeholder="VD: Bệnh viện Mắt TW, BV Mắt TP.HCM..." />
            </div>
            <div class="field">
              <label for="externalPhoto">Ảnh chụp toa gốc (tùy chọn)</label>
              <input id="externalPhoto" type="file" accept="image/*" class="input" />
            </div>
          </div>
        ` : `
          <div style="margin-top:10px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
            <label class="check-label" for="useAutorefCb">
              <input type="checkbox" id="useAutorefCb" ${form.useAutoref ? 'checked' : ''} />
              <span>Ghi nhận kết quả máy đo khúc xạ tự động (Autoref)</span>
            </label>
            ${form.useAutoref ? `<button type="button" class="btn btn-secondary btn-sm" id="copyAutorefBtn">Chép Autoref sang toa chủ quan</button>` : ''}
          </div>
          ${form.useAutoref ? `
            <div class="grid-2" style="margin-top:8px">
              <div class="callout callout-info" style="margin:0"><strong>Autoref OD (Phải):</strong> <span class="mono">${fmtD(form.autoref.od.sph)} / ${fmtD(form.autoref.od.cyl)} × ${form.autoref.od.axis || '—'}°</span></div>
              <div class="callout callout-info" style="margin:0"><strong>Autoref OS (Trái):</strong> <span class="mono">${fmtD(form.autoref.os.sph)} / ${fmtD(form.autoref.os.cyl)} × ${form.autoref.os.axis || '—'}°</span></div>
            </div>
          ` : ''}
        `}
      </div>

      <!-- 2. Distance (or Near-only) Table, split into 2 tables so nothing is hidden (C-01) -->
      <div class="block-card">
        <div class="block-head">
          <h3 class="block-title">2. Khối ${isReading ? 'Độ nhìn gần (kính đọc riêng)' : 'Nhìn xa (DV — Distance Vision)'} &amp; Thị lực (VA)</h3>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <label for="vaScaleSel" style="font-size:12px;font-weight:600;color:#4B5B58">Thang VA:</label>
            <select id="vaScaleSel" class="select" style="width:auto;padding:4px 8px">
              ${Object.entries(VA_SCALES).map(([k, v]) => `<option value="${k}" ${form.vaScale === k ? 'selected' : ''}>${esc(v.label)}</option>`).join('')}
            </select>
          </div>
        </div>

        ${isReading ? `<div class="callout callout-info" style="margin-top:0;margin-bottom:8px">Kính đọc riêng: SPH / CYL / AXIS bên dưới là <strong>độ nhìn gần</strong> áp dụng trực tiếp cho khoảng đọc — hệ thống không cộng thêm ADD (cột ADD bị khoá).</div>` : ''}
        ${errList.length ? `<div class="callout callout-err" role="alert" style="margin-top:0;margin-bottom:8px">${errList.map((m) => `<div>${esc(m)}</div>`).join('')}</div>` : ''}

        <div class="rx-table-wrap">
          <table class="rx-table stack" style="min-width:0">
            <caption class="sr-only">Độ khúc xạ: cầu, trụ, trục, ADD</caption>
            <thead>
              <tr>
                <th>Mắt</th>
                <th>SPH (Cầu)</th>
                <th>CYL (Trụ)</th>
                <th>AXIS (1°–180°)</th>
                <th>ADD (Đọc)</th>
              </tr>
            </thead>
            <tbody>
              ${['od', 'os'].map((k) => {
                const eye = form[k];
                const isOd = k === 'od';
                const eyeLabel = isOd ? 'mắt phải (OD)' : 'mắt trái (OS)';
                const cylZero = roundQuarter(eye.cyl) === 0;
                return `
                  <tr>
                    <td class="cell-eye"><span class="eye-tag ${isOd ? 'eye-od' : 'eye-os'}">${isOd ? 'OD Phải' : 'OS Trái'}</span></td>
                    <td data-label="SPH (Cầu)">${renderStepper(k, 'sph', eye.sph, `SPH ${eyeLabel}`)}</td>
                    <td data-label="CYL (Trụ)">${renderStepper(k, 'cyl', eye.cyl, `CYL ${eyeLabel}`)}</td>
                    <td data-label="AXIS (1°–180°)"><input type="number" min="1" max="180" step="1" class="input mono" style="width:66px" data-axis="${k}" aria-label="Trục AXIS ${eyeLabel}" value="${cylZero ? '' : (eye.axis || '')}" ${cylZero ? 'disabled placeholder="—"' : ''} /></td>
                    <td data-label="ADD (Đọc)">${renderStepper(k, 'add', eye.add, `ADD ${eyeLabel}`, true, isReading)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="rx-subhead">Lăng kính &amp; Thị lực từng mắt</div>
        <div class="rx-table-wrap">
          <table class="rx-table stack" style="min-width:0">
            <caption class="sr-only">Lăng kính và thị lực từng mắt</caption>
            <thead>
              <tr>
                <th>Mắt</th>
                <th>PRISM (Δ)</th>
                <th>BASE</th>
                <th>UCVA</th>
                <th>BCVA</th>
                <th>Kính lỗ (PH)</th>
              </tr>
            </thead>
            <tbody>
              ${['od', 'os'].map((k) => {
                const eye = form[k];
                const isOd = k === 'od';
                const eyeLabel = isOd ? 'mắt phải (OD)' : 'mắt trái (OS)';
                return `
                  <tr>
                    <td class="cell-eye"><span class="eye-tag ${isOd ? 'eye-od' : 'eye-os'}">${isOd ? 'OD Phải' : 'OS Trái'}</span></td>
                    <td data-label="PRISM (Δ)"><input type="number" step="0.25" min="0" max="15" class="input mono" style="width:62px" data-prism="${k}" aria-label="Lăng kính PRISM ${eyeLabel}" value="${eye.prism || 0}" /></td>
                    <td data-label="BASE">
                      <select class="select" style="width:64px;padding:5px" data-base="${k}" aria-label="Hướng đáy BASE ${eyeLabel}" ${Number(eye.prism) > 0 ? '' : 'disabled'}>
                        ${['BI', 'BO', 'BU', 'BD'].map((b) => `<option value="${b}" ${eye.base === b ? 'selected' : ''}>${b}</option>`).join('')}
                      </select>
                    </td>
                    <td data-label="UCVA">
                      <select class="select" style="width:94px;padding:5px" data-va="${k}:ucva" aria-label="Thị lực không kính UCVA ${eyeLabel}">
                        ${scale.options.map((opt) => `<option value="${opt}" ${eye.ucva === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                      </select>
                    </td>
                    <td data-label="BCVA">
                      <select class="select" style="width:94px;padding:5px" data-va="${k}:bcva" aria-label="Thị lực có kính BCVA ${eyeLabel}">
                        ${scale.options.map((opt) => `<option value="${opt}" ${eye.bcva === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                      </select>
                    </td>
                    <td data-label="Kính lỗ (PH)">
                      <select class="select" style="width:94px;padding:5px" data-va="${k}:ph" aria-label="Thị lực kính lỗ Pinhole ${eyeLabel}">
                        ${scale.options.map((opt) => `<option value="${opt}" ${eye.ph === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                      </select>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Parallel Transposition Display -->
        <div class="callout callout-teal">
          <div style="font-weight:700;margin-bottom:3px">${esc(altLabel)} (Hiển thị song song chống cắt nhầm độ):</div>
          <div class="mono" style="font-size:12.5px">
            OD: ${fmtD(odAlt.sph)} / ${fmtD(odAlt.cyl)} × ${odAlt.axis || '—'}° &nbsp;&nbsp;|&nbsp;&nbsp; OS: ${fmtD(osAlt.sph)} / ${fmtD(osAlt.cyl)} × ${osAlt.axis || '—'}°
          </div>
        </div>

        <!-- SE & Clinical Classification Strip + Binocular VA -->
        <div class="grid-3" style="margin-top:10px">
          <div class="field">
            <label>Phân loại OD · <span class="mono">SE = ${fmtD(odSe)} D</span></label>
            <div style="display:flex;gap:4px;flex-wrap:wrap">${odClass.labels.map((l) => `<span class="badge ${l.cls}">${esc(l.text)}</span>`).join('')}</div>
          </div>
          <div class="field">
            <label>Phân loại OS · <span class="mono">SE = ${fmtD(osSe)} D</span></label>
            <div style="display:flex;gap:4px;flex-wrap:wrap">${osClass.labels.map((l) => `<span class="badge ${l.cls}">${esc(l.text)}</span>`).join('')}</div>
          </div>
          <div class="field">
            <label for="binoVaSel">Thị lực hai mắt (OU · Binocular)</label>
            <select id="binoVaSel" class="select">
              ${scale.options.map((opt) => `<option value="${opt}" ${form.binocularVa === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
          </div>
        </div>

        ${hasPrism ? `
          <div class="field" style="margin-top:10px">
            <label for="prismJustInput">Số đo biện minh kê Lăng kính (Bắt buộc khi PRISM &gt; 0 — Cover test / Phoria / Song thị) *</label>
            <input id="prismJustInput" class="input" value="${esc(form.prismJustification)}" placeholder="Nhập số đo lác ẩn, cover test hoặc trích dẫn toa bác sĩ..." />
          </div>
        ` : ''}
      </div>

      <!-- 3. Near Vision (NV) & Intermediate Block -->
      ${showNear ? `
        <div class="block-card">
          <div class="block-head">
            <h3 class="block-title">3. Khối Nhìn gần (NV · Tự tính = SPH + ADD)${showInter ? ' &amp; Trung gian (Văn phòng · tham khảo)' : ''}</h3>
            <span class="badge badge-info">Chỉ đọc · Tự đồng bộ từ DV</span>
          </div>
          <div class="rx-table-wrap">
            <table class="rx-table" style="min-width:520px">
              <thead>
                <tr>
                  <th>Vùng nhìn</th>
                  <th>OD (Mắt phải)</th>
                  <th>OS (Mắt trái)</th>
                  <th>PD áp dụng</th>
                </tr>
              </thead>
              <tbody>
                ${showInter ? `
                  <tr>
                    <td><strong>Trung gian (60–80 cm)</strong> <span class="badge badge-neutral">Tham khảo</span></td>
                    <td class="mono">${fmtD(roundQuarter(form.od.sph + roundQuarter(form.od.add * 0.5)))} / ${fmtD(form.od.cyl)} × ${form.od.axis || '—'}°</td>
                    <td class="mono">${fmtD(roundQuarter(form.os.sph + roundQuarter(form.os.add * 0.5)))} / ${fmtD(form.os.cyl)} × ${form.os.axis || '—'}°</td>
                    <td><input id="pdInter" type="number" step="0.5" min="48" max="76" class="input mono" style="width:90px" aria-label="PD trung gian (mm), nhập tay, tùy chọn" placeholder="nhập tay" value="${form.pdInter ?? ''}" /></td>
                  </tr>
                ` : ''}
                <tr>
                  <td><strong>Nhìn gần (NV · 40 cm)</strong></td>
                  <td class="mono">${fmtD(roundQuarter(form.od.sph + form.od.add))} / ${fmtD(form.od.cyl)} × ${form.od.axis || '—'}°</td>
                  <td class="mono">${fmtD(roundQuarter(form.os.sph + form.os.add))} / ${fmtD(form.os.cyl)} × ${form.os.axis || '—'}°</td>
                  <td class="mono">${Number(form.pdNear).toFixed(1)} mm</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${showInter ? '<div class="muted-xs" style="margin-top:6px">Độ trung gian (SPH + ½ ADD) chỉ để tham khảo, không phải độ mài. PD trung gian do KTV nhập tay, phải nằm giữa PD gần và PD xa.</div>' : ''}
        </div>
      ` : ''}

      <!-- 4. PD & Multifocal Fitting Cross-Check -->
      <div class="block-card">
        <div class="block-head">
          <h3 class="block-title">4. Khoảng cách đồng tử (PD) &amp; Thông số lắp ráp Đa tròng</h3>
          <span class="badge badge-neutral mono">PD tổng: ${binoPd} mm</span>
        </div>
        <div class="grid-3">
          <div class="field"><label for="pdOd">PD mắt phải (mm)</label><input id="pdOd" type="number" step="0.5" min="24" max="40" class="input mono" value="${form.pdOd}" /></div>
          <div class="field"><label for="pdOs">PD mắt trái (mm)</label><input id="pdOs" type="number" step="0.5" min="24" max="40" class="input mono" value="${form.pdOs}" /></div>
          <div class="field"><label for="pdNear">PD nhìn gần (mm) · phải &lt; PD tổng</label><input id="pdNear" type="number" step="0.5" min="48" max="76" class="input mono" value="${form.pdNear}" /></div>
        </div>

        <div class="grid-2" style="margin-top:10px">
          <div class="field">
            <label for="frameCrossSel">Gọng khách chọn (Kiểm tra chéo chiều cao B)</label>
            <select id="frameCrossSel" class="select">
              ${SAMPLE_FRAMES.map((f) => `<option value="${f.id}" ${form.fitting.frameId === f.id ? 'selected' : ''}>${esc(f.label)}</option>`).join('')}
            </select>
          </div>
          <div class="grid-3">
            <div class="field"><label for="fitBvd">BVD (mm)</label><input id="fitBvd" type="number" step="0.5" class="input mono" value="${form.fitting.bvd}" /></div>
            <div class="field"><label for="fitPanto">Panto (°)</label><input id="fitPanto" type="number" step="1" class="input mono" value="${form.fitting.panto}" /></div>
            <div class="field"><label for="fitWrap">Wrap (°)</label><input id="fitWrap" type="number" step="1" class="input mono" value="${form.fitting.wrap}" /></div>
          </div>
        </div>
        <div class="grid-2" style="margin-top:8px">
          <div class="field"><label for="fitSegH">Segment / Fitting height (mm)</label><input id="fitSegH" type="number" step="0.5" class="input mono" value="${form.fitting.segHeight}" /></div>
          <div class="field"><label for="fitOcH">Optical Center — OC height (mm)</label><input id="fitOcH" type="number" step="0.5" class="input mono" value="${form.fitting.ocHeight}" /></div>
        </div>
      </div>

      <!-- 5. Signer (logged-in account), Validity, Referral & Legal Boundary -->
      <div class="block-card">
        <div class="block-head">
          <h3 class="block-title">5. Người ký có chứng chỉ, Hiệu lực toa &amp; Khuyến nghị chuyển tuyến</h3>
          <span class="badge ${st.cls}">${esc(st.label)}</span>
        </div>
        <div class="field">
          <label for="signerView">Người ký (tài khoản đang đăng nhập, có CCHN)</label>
          <input id="signerView" class="input" readonly value="${esc(form.status === 'DRAFT' ? 'Chưa ký — sẽ ký bởi ' : '')}${esc(CURRENT_USER.name)} · ${esc(CURRENT_USER.license)}" />
        </div>
        <div class="grid-2" style="margin-top:10px">
          <div class="field">
            <label for="validitySel">Hiệu lực toa</label>
            <select id="validitySel" class="select">
              <option value="6" ${Number(form.validityMonths) === 6 ? 'selected' : ''}>6 tháng (Trẻ em / theo dõi sát)</option>
              <option value="12" ${Number(form.validityMonths) === 12 ? 'selected' : ''}>12 tháng (Tiêu chuẩn)</option>
              <option value="24" ${Number(form.validityMonths) === 24 ? 'selected' : ''}>24 tháng (Người lớn ổn định)</option>
            </select>
          </div>
          <div class="field">
            <label for="statusView">Trạng thái vòng đời</label>
            <output id="statusView" class="status-view"><span class="badge ${st.cls}">${esc(st.label)}</span></output>
          </div>
        </div>
        <div class="muted-xs" style="margin-top:6px">Trạng thái do hệ thống chuyển: Nháp → “Ký toa” → Đã ký → “Gửi Lab” → Khóa.</div>

        ${form.revisionOf ? `
          <div class="callout callout-warn" style="margin-top:10px"><strong>Phiên bản sửa đổi từ ${esc(form.revisionOf)}.</strong> Lý do: ${esc(form.revisionReason)}</div>
        ` : ''}

        <div style="margin-top:10px">
          <label class="check-label" for="referralCb">
            <input type="checkbox" id="referralCb" ${form.referralFlag ? 'checked' : ''} />
            <span>Bật cờ khuyến nghị chuyển tuyến Bác sĩ Nhãn khoa</span>
          </label>
          ${form.referralFlag ? `
            <div class="field" style="margin-top:6px">
              <label for="referralReasonInput">Lý do khuyến nghị chuyển tuyến</label>
              <input id="referralReasonInput" class="input" value="${esc(form.referralReason)}" placeholder="VD: BCVA < 7/10 sau chỉnh tối ưu, đau nhức mắt, nhìn đôi..." />
            </div>
          ` : ''}
        </div>

        ${alerts.map((a) => `
          <div class="callout ${a.level === 'err' ? 'callout-err' : 'callout-warn'}">
            ${esc(a.text)}
            ${a.action === 'convention' ? `
              <div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap">
                <button type="button" class="btn btn-secondary btn-sm" data-fixconv="values">Quy đổi giá trị theo quy ước đã chọn</button>
                <button type="button" class="btn btn-secondary btn-sm" data-fixconv="convention">Đặt quy ước theo dấu đang nhập</button>
              </div>` : ''}
          </div>
        `).join('')}
      </div>
      </fieldset>

      <div class="sticky-action-bar">
        <div class="more-wrap">
          <button type="button" class="btn btn-secondary" id="moreBtn" aria-haspopup="menu" aria-expanded="false" aria-controls="moreMenu" aria-label="Thêm thao tác: xem in phiếu, đặt lại">⋯</button>
          <div class="more-menu hidden" id="moreMenu" role="menu">
            <button type="button" role="menuitem" class="more-item" id="openPrintBtn">Xem &amp; In phiếu (Có Disclaimer)</button>
            <button type="button" role="menuitem" class="more-item" id="resetFormBtn">Đặt lại phiếu</button>
          </div>
        </div>
        <div class="bar-main">
          <button type="button" class="btn btn-secondary" id="saveDraftBtn" ${locked ? 'disabled' : ''}>Lưu nháp</button>
          <button type="button" class="btn btn-primary" id="signBtn" ${locked ? 'disabled' : ''}>Ký toa…</button>
        </div>
      </div>
    `;

    bindFormEvents();
  }

  // Nhập liệu sai khoảng/định dạng bị từ chối tại chỗ (B-01, B-02): không tự sửa giá trị.
  function syncReferralSuggestion() {
    const scale = VA_SCALES[form.vaScale];
    if (scale.lowSet.has(form.od.bcva) || scale.lowSet.has(form.os.bcva)) {
      if (!form.referralFlag) form.referralFlag = true;
    }
  }

  function bindFormEvents() {
    document.getElementById('rxSource').onchange = (e) => { form.source = e.target.value; renderExamForm(); };
    document.getElementById('cylConvention').onchange = (e) => { form.cylConvention = e.target.value; renderExamForm(); };
    document.getElementById('rxPurpose').onchange = (e) => {
      form.purpose = e.target.value;
      if (form.purpose === 'READING') { form.od.add = 0; form.os.add = 0; }
      renderExamForm();
    };
    // B-04: đổi thang VA quy đổi số đo đã nhập, không ghi đè
    document.getElementById('vaScaleSel').onchange = (e) => {
      const from = form.vaScale;
      const to = e.target.value;
      ['od', 'os'].forEach((k) => ['ucva', 'bcva', 'ph'].forEach((f) => { form[k][f] = convertVa(form[k][f], from, to); }));
      form.binocularVa = convertVa(form.binocularVa, from, to);
      form.vaScale = to;
      syncReferralSuggestion();
      renderExamForm();
      showToast(`Đã quy đổi thị lực sang thang ${VA_SCALES[to].label} (gần đúng) — kiểm tra lại các giá trị.`);
    };
    document.getElementById('binoVaSel').onchange = (e) => { form.binocularVa = e.target.value; };

    document.getElementById('transposeBtn').onclick = () => {
      const nextOd = transposeEye(form.od);
      const nextOs = transposeEye(form.os);
      form.od.sph = nextOd.sph; form.od.cyl = nextOd.cyl; form.od.axis = nextOd.axis;
      form.os.sph = nextOs.sph; form.os.cyl = nextOs.cyl; form.os.axis = nextOs.axis;
      form.cylConvention = form.cylConvention === 'MINUS' ? 'PLUS' : 'MINUS';
      renderExamForm();
      showToast(`Đã chuyển dạng trụ sang ${form.cylConvention === 'MINUS' ? 'Trụ âm (−CYL)' : 'Trụ dương (+CYL)'}.`);
    };

    document.querySelectorAll('[data-fixconv]').forEach((btn) => {
      btn.onclick = () => {
        if (btn.dataset.fixconv === 'values') {
          ['od', 'os'].forEach((k) => {
            if (eyeMismatch(form[k], form.cylConvention)) {
              const t = transposeEye(form[k]);
              form[k].sph = t.sph; form[k].cyl = t.cyl; form[k].axis = t.axis;
            }
          });
          showToast('Đã quy đổi giá trị cho khớp quy ước đã chọn.');
        } else {
          const cyls = ['od', 'os'].map((k) => roundQuarter(form[k].cyl)).filter((v) => v !== 0);
          if (cyls.every((v) => v > 0)) form.cylConvention = 'PLUS';
          else if (cyls.every((v) => v < 0)) form.cylConvention = 'MINUS';
          else { showToast('Hai mắt đang mang dấu trụ khác nhau — dùng "Quy đổi giá trị theo quy ước đã chọn".'); return; }
          showToast('Đã đặt quy ước dấu trụ theo giá trị đang nhập.');
        }
        renderExamForm();
      };
    });

    const hospEl = document.getElementById('hospitalName');
    if (hospEl) hospEl.oninput = (e) => { form.hospitalName = e.target.value; };

    const arCb = document.getElementById('useAutorefCb');
    if (arCb) arCb.onchange = (e) => { form.useAutoref = e.target.checked; renderExamForm(); };

    const copyArBtn = document.getElementById('copyAutorefBtn');
    if (copyArBtn) {
      copyArBtn.onclick = () => {
        ['od', 'os'].forEach((k) => {
          form[k].sph = form.autoref[k].sph;
          form[k].cyl = form.autoref[k].cyl;
          form[k].axis = form.autoref[k].axis;
        });
        form.cylConvention = 'MINUS';
        renderExamForm();
        showToast('Đã chép kết quả Autoref sang toa chủ quan.');
      };
    }

    // Steppers (±0.25 D, ADD bước đầu 0.75) — chặn ngoài khoảng hợp lệ (B-01)
    document.querySelectorAll('[data-step]').forEach((btn) => {
      btn.onclick = () => {
        const [eyeKey, field, dirStr] = btn.dataset.step.split(':');
        fieldErrors = {};
        const dir = Number(dirStr);
        let cur = roundQuarter(form[eyeKey][field]);
        if (field === 'add') {
          if (dir > 0) cur = cur <= 0 ? 0.75 : roundQuarter(cur + 0.25);
          else cur = cur <= 0.75 ? 0 : roundQuarter(cur - 0.25);
        } else {
          cur = roundQuarter(cur + dir * 0.25);
        }
        if (rejectRange(`${eyeKey}:${field}`, fieldLabel(eyeKey, field), cur, LIMITS[field])) { renderExamForm(); return; }
        if (field === 'cyl' && cur !== 0 && !form[eyeKey].axis) form[eyeKey].axis = 180;
        if (field === 'cyl' && cur === 0) form[eyeKey].axis = '';
        form[eyeKey][field] = cur;
        renderExamForm();
      };
    });

    document.querySelectorAll('[data-num]').forEach((inp) => {
      inp.onchange = () => {
        const [eyeKey, field] = inp.dataset.num.split(':');
        const raw = inp.value.replace('−', '-').replace(',', '.').trim();
        const parsed = Number(raw);
        if (raw === '' || Number.isNaN(parsed)) {
          fieldErrors[`${eyeKey}:${field}`] = `${fieldLabel(eyeKey, field)}: "${inp.value}" không phải số — giá trị bị từ chối, giữ nguyên số cũ.`;
          renderExamForm();
          return;
        }
        const val = roundQuarter(parsed);
        if (rejectRange(`${eyeKey}:${field}`, fieldLabel(eyeKey, field), val, LIMITS[field])) { renderExamForm(); return; }
        form[eyeKey][field] = val;
        if (field === 'cyl' && val === 0) form[eyeKey].axis = '';
        if (field === 'cyl' && val !== 0 && !form[eyeKey].axis) form[eyeKey].axis = 180;
        renderExamForm();
      };
    });

    // B-02: AXIS chỉ nhận số nguyên 1–180, báo lỗi tại chỗ, không tự gói vòng
    document.querySelectorAll('[data-axis]').forEach((inp) => {
      inp.onchange = () => {
        const k = inp.dataset.axis;
        const raw = inp.value.trim();
        const n = Number(raw);
        if (raw === '' || !Number.isInteger(n) || n < 1 || n > 180) {
          fieldErrors[`${k}:axis`] = `AXIS ${k === 'od' ? 'OD' : 'OS'}: "${raw}" không hợp lệ — chỉ nhận số nguyên từ 1 đến 180°, giá trị bị từ chối, giữ nguyên số cũ.`;
        } else {
          form[k].axis = n;
        }
        renderExamForm();
      };
    });
    document.querySelectorAll('[data-prism]').forEach((inp) => {
      inp.onchange = () => {
        const k = inp.dataset.prism;
        const parsed = Number(inp.value);
        if (inp.value.trim() === '' || Number.isNaN(parsed)) {
          fieldErrors[`${k}:prism`] = `PRISM ${k === 'od' ? 'OD' : 'OS'}: "${inp.value}" không phải số — giá trị bị từ chối.`;
        } else if (!rejectRange(`${k}:prism`, `PRISM ${k === 'od' ? 'OD' : 'OS'}`, roundQuarter(parsed), LIMITS.prism)) {
          form[k].prism = roundQuarter(parsed);
        }
        renderExamForm();
      };
    });
    document.querySelectorAll('[data-base]').forEach((sel) => {
      sel.onchange = () => { form[sel.dataset.base].base = sel.value; };
    });
    document.querySelectorAll('[data-va]').forEach((sel) => {
      sel.onchange = () => {
        const [eyeKey, field] = sel.dataset.va.split(':');
        form[eyeKey][field] = sel.value;
        if (field === 'bcva') syncReferralSuggestion();
        renderExamForm();
      };
    });

    const prismJust = document.getElementById('prismJustInput');
    if (prismJust) prismJust.oninput = (e) => { form.prismJustification = e.target.value; };

    const pdHandler = (key, label, lim) => (e) => {
      const parsed = Number(e.target.value);
      if (e.target.value.trim() === '' || Number.isNaN(parsed)) {
        fieldErrors[key] = `${label}: "${e.target.value}" không phải số — giá trị bị từ chối.`;
      } else if (!rejectRange(key, label, parsed, lim)) {
        form[key] = parsed;
      }
      renderExamForm();
    };
    document.getElementById('pdOd').onchange = pdHandler('pdOd', 'PD mắt phải', LIMITS.pdOd);
    document.getElementById('pdOs').onchange = pdHandler('pdOs', 'PD mắt trái', LIMITS.pdOs);
    document.getElementById('pdNear').onchange = pdHandler('pdNear', 'PD nhìn gần', LIMITS.pdNear);
    const pdInter = document.getElementById('pdInter');
    if (pdInter) {
      pdInter.onchange = (e) => {
        const v = e.target.value.trim();
        if (v === '') form.pdInter = '';
        else if (Number.isNaN(Number(v))) fieldErrors.pdInter = `PD trung gian: "${v}" không phải số — giá trị bị từ chối.`;
        else if (!rejectRange('pdInter', 'PD trung gian', Number(v), LIMITS.pdNear)) form.pdInter = Number(v);
        renderExamForm();
      };
    }
    document.getElementById('frameCrossSel').onchange = (e) => { form.fitting.frameId = e.target.value; renderExamForm(); };
    document.getElementById('fitBvd').onchange = (e) => { form.fitting.bvd = Number(e.target.value) || 12; };
    document.getElementById('fitPanto').onchange = (e) => { form.fitting.panto = Number(e.target.value) || 9; };
    document.getElementById('fitWrap').onchange = (e) => { form.fitting.wrap = Number(e.target.value) || 5; };
    document.getElementById('fitSegH').onchange = (e) => { form.fitting.segHeight = Number(e.target.value) || 19; renderExamForm(); };
    document.getElementById('fitOcH').onchange = (e) => { form.fitting.ocHeight = Number(e.target.value) || 20; };

    document.getElementById('validitySel').onchange = (e) => { form.validityMonths = Number(e.target.value); };
    document.getElementById('referralCb').onchange = (e) => { form.referralFlag = e.target.checked; renderExamForm(); };

    const refReason = document.getElementById('referralReasonInput');
    if (refReason) refReason.oninput = (e) => { form.referralReason = e.target.value; };

    // C-05: thanh hành động gọn 1 hàng — Lưu nháp / Ký toa là chính, còn lại vào menu ⋯
    const moreBtn = document.getElementById('moreBtn');
    const moreMenu = document.getElementById('moreMenu');
    moreBtn.onclick = (e) => {
      e.stopPropagation();
      const open = moreMenu.classList.toggle('hidden') === false;
      moreBtn.setAttribute('aria-expanded', String(open));
    };
    document.getElementById('openPrintBtn').onclick = () => { moreMenu.classList.add('hidden'); openPrintModal(); };
    document.getElementById('resetFormBtn').onclick = () => {
      form = deepClone(getCustomer().defaultForm);
      formError = '';
      fieldErrors = {};
      renderExamForm();
      showToast('Đã khôi phục dữ liệu phiếu đo.');
    };

    document.getElementById('saveDraftBtn').onclick = () => saveRx('DRAFT');
    document.getElementById('signBtn').onclick = startSign;
  }

  // ==================== SIGN FLOW (C-03, B-05, B-06) ====================
  function blockingIssue() {
    const hasPrism = Number(form.od.prism) > 0 || Number(form.os.prism) > 0;
    if (hasPrism && !String(form.prismJustification || '').trim()) {
      return 'Vui lòng nhập "Số đo biện minh kê Lăng kính" trước khi ký toa có PRISM > 0.';
    }
    const { alerts } = computeClinicalAlerts();
    const b = alerts.find((a) => a.block);
    return b ? b.text : '';
  }

  function eyeLine(k, convention) {
    const lab = toMinusCyl(form[k], convention);
    const add = Number(form[k].add) > 0 && form.purpose !== 'READING' ? ` · ADD +${Number(form[k].add).toFixed(2)}` : '';
    const prism = Number(form[k].prism) > 0 ? ` · ${form[k].prism}Δ ${form[k].base}` : '';
    return `<strong>${k.toUpperCase()}:</strong> <span class="mono">${fmtD(lab.sph)} / ${fmtD(lab.cyl)} × ${lab.axis || '—'}°${add}${prism}</span>`;
  }

  function startSign() {
    const issue = blockingIssue();
    if (issue) {
      formError = issue;
      renderExamForm();
      document.getElementById('examFormPanel').scrollIntoView({ block: 'start' });
      return;
    }
    formError = '';
    const c = getCustomer();
    const { alerts } = computeClinicalAlerts();
    const today = new Date().toISOString().slice(0, 10);
    openConfirm({
      title: 'Xác nhận ký toa kính',
      confirmLabel: 'Ký toa',
      bodyHtml: `
        <dl class="confirm-dl">
          <dt>Khách hàng</dt><dd>${esc(c.name)} (${c.age} tuổi)</dd>
          <dt>Độ ký (quy về −CYL cho Lab)</dt><dd>${eyeLine('od', form.cylConvention)}<br>${eyeLine('os', form.cylConvention)}</dd>
          <dt>Người ký</dt><dd>${esc(CURRENT_USER.name)} · <span class="mono">${esc(CURRENT_USER.license)}</span></dd>
          <dt>Hiệu lực</dt><dd>${Number(form.validityMonths)} tháng — đến <span class="mono">${esc(addMonths(today, form.validityMonths))}</span></dd>
          ${form.revisionOf ? `<dt>Thay thế</dt><dd>${esc(form.revisionOf)} sẽ chuyển sang “Đã thay thế”</dd>` : ''}
        </dl>
        <div class="callout callout-warn" style="margin-top:8px">Sau khi ký, toa bị khoá chỉnh sửa trực tiếp và sẵn sàng cho Lab. Mọi thay đổi sau đó phải tạo phiên bản sửa đổi kèm lý do.</div>`,
      acks: alerts.filter((a) => a.ack).map((a) => a.text),
      onConfirm: () => saveRx('SIGNED')
    });
  }

  function nextRxId() {
    rxSeq += 1;
    return 'RX-2026-' + rxSeq;
  }

  // C-04 / B-07: lưu đủ mọi trường (data = bản chụp biểu mẫu); chỉ thay thế toa gốc khi bản mới đã ký
  function saveRx(status) {
    const c = getCustomer();
    const signed = status === 'SIGNED';
    const today = new Date().toISOString().slice(0, 10);

    let nextVer = 1;
    const old = form.revisionOf ? c.history.find((h) => h.id === form.revisionOf) : null;
    if (old) nextVer = (old.version || 1) + 1;

    form.status = status;
    const id = form.currentRxId || nextRxId();
    const record = {
      id,
      version: nextVer,
      date: today,
      expiresAt: addMonths(today, form.validityMonths),
      status,
      source: form.source,
      cylConvention: form.cylConvention,
      purpose: form.purpose,
      signer: signed ? `${CURRENT_USER.name} (${CURRENT_USER.license})` : 'Chưa ký',
      od: deepClone(form.od),
      os: deepClone(form.os),
      pdOd: form.pdOd,
      pdOs: form.pdOs,
      vaScale: form.vaScale,
      binocularVa: form.binocularVa,
      referralFlag: form.referralFlag,
      revisionOf: form.revisionOf,
      revisionReason: form.revisionReason,
      data: null
    };
    form.currentRxId = id;
    record.data = deepClone(form);

    const idx = c.history.findIndex((h) => h.id === id);
    if (idx >= 0) c.history[idx] = record; else c.history.unshift(record);
    if (signed && old) old.status = 'SUPERSEDED';

    formError = '';
    fieldErrors = {};
    renderAll();
    showToast(signed
      ? `Đã ký toa ${id} bởi ${CURRENT_USER.name}. Toa sẵn sàng cho Lab, các ô đã khoá.`
      : `Đã lưu nháp ${id} (chưa ký, chưa có hiệu lực).`);
  }

  // ==================== RIGHT: SE EVOLUTION CHART (B-04 / PRJ-002) ====================
  function renderChartPanel() {
    const c = getCustomer();
    const sorted = [...c.history].filter((h) => h.status !== 'SUPERSEDED' && !(h.status === 'DRAFT' && h.revisionOf)).sort((a, b) => a.date.localeCompare(b.date));
    const panel = document.getElementById('chartPanel');

    if (!sorted.length) {
      panel.innerHTML = '<h3 class="block-title">Biểu đồ diễn tiến Độ cầu tương đương (SE)</h3><div class="muted-xs" style="padding:18px 0">Chưa có lịch sử đo mắt.</div>';
      return;
    }

    const W = 440, H = 185, padL = 46, padR = 20, padT = 18, padB = 32;
    const pts = sorted.map((h) => ({
      date: h.date.slice(0, 7),
      odSe: calcSE(toMinusCyl(h.od, h.cylConvention)),
      osSe: calcSE(toMinusCyl(h.os, h.cylConvention))
    }));
    const allVals = pts.flatMap((p) => [p.odSe, p.osSe]);
    const minV = Math.min(-4, Math.floor(Math.min(...allVals) - 0.5));
    const maxV = Math.max(2, Math.ceil(Math.max(...allVals) + 0.5));
    const span = Math.max(1, maxV - minV);
    const xAt = (i) => pts.length === 1 ? W / 2 : padL + (i / (pts.length - 1)) * (W - padL - padR);
    const yAt = (v) => padT + ((maxV - v) / span) * (H - padT - padB);

    const odLine = pts.map((p, i) => `${xAt(i)},${yAt(p.odSe)}`).join(' ');
    const osLine = pts.map((p, i) => `${xAt(i)},${yAt(p.osSe)}`).join(' ');
    const yZero = yAt(0);

    panel.innerHTML = `
      <div class="block-head" style="margin-bottom:6px">
        <div>
          <h3 class="block-title">Biểu đồ diễn tiến Độ cầu tương đương (SE = SPH + CYL/2)</h3>
          <div class="muted-xs">Phản ánh chính xác tiến triển cả độ cầu lẫn độ loạn theo thời gian</div>
        </div>
        <div style="display:flex;gap:10px;font-size:12px;font-weight:600">
          <span style="color:#0369A1">● OD (Phải)</span>
          <span style="color:#0F766E">● OS (Trái)</span>
        </div>
      </div>
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block" role="img" aria-label="Biểu đồ diễn tiến SE của khách hàng">
        <line x1="${padL}" y1="${yZero}" x2="${W - padR}" y2="${yZero}" stroke="#CBD6D5" stroke-dasharray="4 3" />
        <text x="${padL - 6}" y="${yZero + 4}" text-anchor="end" font-size="11" fill="#5F706D" font-family="JetBrains Mono">0.00</text>
        <text x="${padL - 6}" y="${padT + 4}" text-anchor="end" font-size="11" fill="#5F706D" font-family="JetBrains Mono">${fmtD(maxV)}</text>
        <text x="${padL - 6}" y="${H - padB}" text-anchor="end" font-size="11" fill="#5F706D" font-family="JetBrains Mono">${fmtD(minV)}</text>
        ${pts.length > 1 ? `<polyline fill="none" stroke="#0369A1" stroke-width="2.4" points="${odLine}" />` : ''}
        ${pts.length > 1 ? `<polyline fill="none" stroke="#0F766E" stroke-width="2.4" points="${osLine}" />` : ''}
        ${pts.map((p, i) => `
          <circle cx="${xAt(i)}" cy="${yAt(p.odSe)}" r="4.2" fill="#0369A1" />
          <circle cx="${xAt(i)}" cy="${yAt(p.osSe)}" r="4.2" fill="#0F766E" />
          <text x="${xAt(i)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="#4B5B58" font-family="JetBrains Mono">${p.date}</text>
        `).join('')}
      </svg>
    `;
  }

  function renderHistoryPanel() {
    const c = getCustomer();
    const panel = document.getElementById('historyPanel');
    const activeCount = c.history.filter((h) => h.status !== 'SUPERSEDED').length;
    panel.innerHTML = `
      <div class="block-head">
        <div>
          <h3 class="block-title" aria-live="polite">Lịch sử Toa kính bất biến (${c.history.length} bản · ${activeCount} còn hiệu lực)</h3>
          <div class="muted-xs">Toa đã ký bị khóa — sửa đổi phải tạo phiên bản mới kèm lý do. Toa chỉ chuyển “Đã thay thế” khi bản mới được ký.</div>
        </div>
      </div>
      ${c.history.map((h) => {
        const odSe = calcSE(toMinusCyl(h.od, h.cylConvention));
        const osSe = calcSE(toMinusCyl(h.os, h.cylConvention));
        const st = STATUS_META[h.status] || STATUS_META.SIGNED;
        const isOpen = h.id === form.currentRxId;
        return `
          <div class="hist-card ${h.status === 'SUPERSEDED' ? 'superseded' : ''}">
            <div class="hist-head">
              <div>
                <strong class="mono">${esc(h.id)}</strong> <span class="muted-xs">v${h.version || 1} · ${esc(h.date)}</span>
              </div>
              <span class="badge ${st.cls}">${esc(st.label)}</span>
            </div>
            <div class="hist-rx-line"><strong>OD:</strong> ${fmtD(h.od.sph)} / ${fmtD(h.od.cyl)} × ${h.od.axis || '—'}° ${h.od.add ? '· ADD +' + Number(h.od.add).toFixed(2) : ''} (SE ${fmtD(odSe)})</div>
            <div class="hist-rx-line"><strong>OS:</strong> ${fmtD(h.os.sph)} / ${fmtD(h.os.cyl)} × ${h.os.axis || '—'}° ${h.os.add ? '· ADD +' + Number(h.os.add).toFixed(2) : ''} (SE ${fmtD(osSe)})</div>
            <div class="muted-xs" style="margin-top:6px">Người ký: ${esc(h.signer)} · Hạn toa: <span class="mono">${esc(h.expiresAt)}</span></div>
            ${h.revisionOf ? `<div class="muted-xs" style="margin-top:3px">Sửa đổi từ ${esc(h.revisionOf)}</div>` : ''}
            ${h.revisionReason ? `<div class="muted-xs" style="color:#B45309;margin-top:3px">Lý do sửa đổi: ${esc(h.revisionReason)}</div>` : ''}
            ${h.status !== 'SUPERSEDED' ? `
              <div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">
                ${h.status === 'DRAFT'
                  ? (isOpen ? '<span class="muted-xs">Đang mở trong biểu mẫu</span>' : `<button type="button" class="btn btn-secondary btn-sm" data-open-draft="${esc(h.id)}">Mở nháp</button>`)
                  : `<button type="button" class="btn btn-secondary btn-sm" data-revise="${esc(h.id)}">Tạo phiên bản sửa đổi</button>`}
                ${h.status === 'SIGNED' ? `<button type="button" class="btn btn-secondary btn-sm" data-send-lab="${esc(h.id)}">Gửi Lab (Khóa)</button>` : ''}
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}
    `;

    // C-04: bắt buộc nhập lý do sửa đổi trước khi nạp toa vào biểu mẫu
    panel.querySelectorAll('[data-revise]').forEach((btn) => {
      btn.onclick = () => {
        const target = c.history.find((h) => h.id === btn.dataset.revise);
        if (!target) return;
        openConfirm({
          title: `Tạo phiên bản sửa đổi từ ${target.id}`,
          confirmLabel: 'Tạo phiên bản sửa đổi',
          bodyHtml: `<p style="margin:0 0 8px">Toa gốc <strong class="mono">${esc(target.id)}</strong> được giữ nguyên bất biến. Bản sao đầy đủ sẽ mở ở trạng thái Nháp; toa gốc chỉ chuyển “Đã thay thế” khi bản mới được ký.</p>`,
          reasonLabel: `Lý do sửa đổi từ ${target.id} *`,
          reasonPlaceholder: 'VD: Khách chưa thích nghi độ loạn, giảm 0.25 D theo phản hồi...',
          onConfirm: (reason) => loadRevision(target, reason)
        });
      };
    });

    panel.querySelectorAll('[data-open-draft]').forEach((btn) => {
      btn.onclick = () => {
        const target = c.history.find((h) => h.id === btn.dataset.openDraft);
        if (!target || !target.data) return;
        form = deepClone(target.data);
        form.currentRxId = target.id;
        formError = '';
        fieldErrors = {};
        renderExamForm();
        renderHistoryPanel();
        showToast(`Đã mở nháp ${target.id}.`);
      };
    });

    // B-06: trạng thái chỉ đổi qua hành động có tên
    panel.querySelectorAll('[data-send-lab]').forEach((btn) => {
      btn.onclick = () => {
        const target = c.history.find((h) => h.id === btn.dataset.sendLab);
        if (!target) return;
        openConfirm({
          title: `Gửi ${target.id} sang Lab cắt kính`,
          confirmLabel: 'Gửi Lab & Khóa',
          bodyHtml: `<p style="margin:0">Toa <strong class="mono">${esc(target.id)}</strong> sẽ chuyển sang “Đã dùng cắt kính (Khóa)”. Sau đó không thể sửa trực tiếp, chỉ tạo phiên bản sửa đổi kèm lý do.</p>`,
          onConfirm: () => {
            target.status = 'LOCKED_FOR_LAB';
            if (target.data) target.data.status = 'LOCKED_FOR_LAB';
            if (form.currentRxId === target.id) form.status = 'LOCKED_FOR_LAB';
            renderAll();
            showToast(`Đã gửi ${target.id} sang Lab — toa đã khóa.`);
          }
        });
      };
    });
  }

  // B-07: nhân bản toàn bộ toa gốc
  function formFromRx(h) {
    if (h.data) return deepClone(h.data);
    const cus = getCustomer();
    const base = deepClone(cus.defaultForm);
    base.source = h.source || base.source;
    base.cylConvention = h.cylConvention || 'MINUS';
    base.purpose = h.purpose || base.purpose;
    base.pdOd = h.pdOd;
    base.pdOs = h.pdOs;
    base.referralFlag = Boolean(h.referralFlag);
    base.referralReason = h.referralFlag ? base.referralReason : '';
    const fromScale = base.vaScale;
    const toScale = h.vaScale || fromScale;
    ['od', 'os'].forEach((k) => {
      base[k] = Object.assign({}, base[k], h[k]);
      if (!base[k].base) base[k].base = 'BI';
      ['ucva', 'bcva', 'ph'].forEach((f) => { base[k][f] = convertVa(base[k][f], fromScale, toScale); });
    });
    base.vaScale = toScale;
    base.binocularVa = h.binocularVa || convertVa(base.binocularVa, fromScale, toScale);
    base.legacyNote = true;
    if ((Number(base.od.prism) > 0 || Number(base.os.prism) > 0) && h.source !== 'EXTERNAL_RX') base.prismJustification = '';
    return base;
  }

  function loadRevision(target, reason) {
    form = formFromRx(target);
    form.revisionOf = target.id;
    form.revisionReason = reason;
    form.status = 'DRAFT';
    form.currentRxId = null;
    formError = '';
    fieldErrors = {};
    renderAll();
    showToast(`Đã nhân bản ${target.id} thành bản sửa đổi (Nháp). Toa gốc vẫn bất biến.`);
    document.getElementById('examFormPanel').scrollIntoView({ block: 'start' });
  }

  // ==================== CONFIRM DIALOG (C-03, C-04) ====================
  let confirmState = null;

  function openConfirm({ title, bodyHtml, acks = [], reasonLabel = '', reasonPlaceholder = '', confirmLabel = 'Xác nhận', onConfirm }) {
    confirmState = { onConfirm, needAck: acks.length > 0, needReason: Boolean(reasonLabel), opener: document.activeElement };
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmBody').innerHTML = `
      ${bodyHtml || ''}
      ${acks.length ? `
        <div class="callout callout-warn" style="margin-top:8px">
          <ul style="margin:0 0 6px;padding-left:18px">${acks.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
          <label class="check-label" for="confirmAck"><input type="checkbox" id="confirmAck" /><span>Tôi đã kiểm tra các cảnh báo trên và xác nhận ký có chủ đích.</span></label>
        </div>` : ''}
      ${reasonLabel ? `
        <div class="field" style="margin-top:8px">
          <label for="confirmReason">${esc(reasonLabel)}</label>
          <textarea id="confirmReason" class="textarea" rows="3" placeholder="${esc(reasonPlaceholder)}"></textarea>
        </div>` : ''}
    `;
    const okBtn = document.getElementById('confirmOkBtn');
    okBtn.textContent = confirmLabel;
    const refresh = () => {
      const ackOk = !confirmState.needAck || document.getElementById('confirmAck').checked;
      const reasonOk = !confirmState.needReason || document.getElementById('confirmReason').value.trim() !== '';
      okBtn.disabled = !(ackOk && reasonOk);
    };
    const ack = document.getElementById('confirmAck');
    const reason = document.getElementById('confirmReason');
    if (ack) ack.onchange = refresh;
    if (reason) reason.oninput = refresh;
    refresh();
    document.getElementById('confirmBackdrop').classList.remove('hidden');
    document.getElementById('confirmModal').classList.remove('hidden');
    (reason || ack || okBtn).focus();
  }

  function closeConfirm() {
    document.getElementById('confirmBackdrop').classList.add('hidden');
    document.getElementById('confirmModal').classList.add('hidden');
    const opener = confirmState && confirmState.opener;
    confirmState = null;
    if (opener && document.body.contains(opener)) opener.focus();
  }

  // ==================== PRINT MODAL (DISCLAIMER + SIGNER + DV/NV) ====================
  function openPrintModal() {
    const c = getCustomer();
    const signed = form.status !== 'DRAFT';
    const today = new Date().toISOString().slice(0, 10);
    const expires = addMonths(today, form.validityMonths);
    const odLab = toMinusCyl(form.od, form.cylConvention);
    const osLab = toMinusCyl(form.os, form.cylConvention);
    const isReading = form.purpose === 'READING';
    const zoneLabel = isReading ? 'Nhìn gần (kính đọc)' : 'Nhìn xa';
    const origConv = form.cylConvention === 'PLUS' ? 'Trụ dương (+CYL)' : 'Trụ âm (−CYL)';
    const showNearRow = !isReading && (form.od.add > 0 || form.os.add > 0);

    document.getElementById('printBody').innerHTML = `
      <div class="rx-print-sheet">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #CBD6D5;padding-bottom:10px;margin-bottom:12px;gap:12px;flex-wrap:wrap">
          <div>
            <div style="font-weight:700;font-size:16px;color:#0F3D38">KÍNH MẮT MINH QUANG</div>
            <div class="muted-xs">148 Xã Đàn, Đống Đa, Hà Nội · Hotline: 024 3855 8899</div>
          </div>
          <div style="text-align:right">
            <div style="font-weight:700;font-size:14px">PHIẾU KẾT QUẢ ĐO KHÚC XẠ &amp; TOA KÍNH</div>
            <div class="muted-xs mono">Ngày đo: ${today} · Hiệu lực đến: ${expires}</div>
            ${signed ? '' : '<div class="badge badge-warn" style="margin-top:4px">BẢN NHÁP — CHƯA KÝ</div>'}
          </div>
        </div>

        <div class="grid-2" style="margin-bottom:12px;font-size:13px">
          <div><strong>Khách hàng:</strong> ${esc(c.name)} (${c.age} tuổi)</div>
          <div><strong>Điện thoại:</strong> ${esc(c.phone)}</div>
          <div><strong>Mục đích kính:</strong> ${esc(PURPOSES[form.purpose])}</div>
          <div><strong>PD xa / gần:</strong> <span class="mono">${form.pdOd} / ${form.pdOs} mm · Gần ${form.pdNear} mm</span></div>
        </div>

        <table class="rx-table" style="min-width:0;margin-bottom:10px">
          <thead>
            <tr><th>Khối &amp; Mắt</th><th>SPH</th><th>CYL (−CYL Lab)</th><th>AXIS</th><th>ADD</th><th>PRISM</th><th>BCVA (${esc(VA_SCALES[form.vaScale].label)})</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${zoneLabel} — OD</strong></td>
              <td class="mono">${fmtD(odLab.sph)}</td>
              <td class="mono">${fmtD(odLab.cyl)}</td>
              <td class="mono">${odLab.axis || '—'}°</td>
              <td class="mono">${!isReading && form.od.add ? '+' + Number(form.od.add).toFixed(2) : '—'}</td>
              <td class="mono">${form.od.prism ? form.od.prism + 'Δ ' + form.od.base : '—'}</td>
              <td class="mono">${esc(form.od.bcva)}</td>
            </tr>
            <tr>
              <td><strong>${zoneLabel} — OS</strong></td>
              <td class="mono">${fmtD(osLab.sph)}</td>
              <td class="mono">${fmtD(osLab.cyl)}</td>
              <td class="mono">${osLab.axis || '—'}°</td>
              <td class="mono">${!isReading && form.os.add ? '+' + Number(form.os.add).toFixed(2) : '—'}</td>
              <td class="mono">${form.os.prism ? form.os.prism + 'Δ ' + form.os.base : '—'}</td>
              <td class="mono">${esc(form.os.bcva)}</td>
            </tr>
            ${showNearRow ? `
              <tr>
                <td><strong>Nhìn gần — OD / OS</strong></td>
                <td class="mono" colspan="6">OD: ${fmtD(roundQuarter(odLab.sph + form.od.add))} / ${fmtD(odLab.cyl)} × ${odLab.axis || '—'}° &nbsp;|&nbsp; OS: ${fmtD(roundQuarter(osLab.sph + form.os.add))} / ${fmtD(osLab.cyl)} × ${osLab.axis || '—'}°</td>
              </tr>
            ` : ''}
          </tbody>
        </table>

        <div class="muted-xs" style="margin-bottom:10px">
          <strong>Quy ước dấu trụ:</strong> toa gốc ghi theo ${origConv}; bản in quy về <strong>Trụ âm (−CYL)</strong> để cắt kính${form.cylConvention === 'PLUS' ? ' — <strong>đã quy đổi từ toa gốc +CYL</strong>' : ' — không cần quy đổi'}.
          ${form.cylConvention === 'PLUS' ? `<div class="mono" style="margin-top:3px">Toa gốc (+CYL): OD ${fmtD(form.od.sph)} / ${fmtD(form.od.cyl)} × ${form.od.axis || '—'}° &nbsp;|&nbsp; OS ${fmtD(form.os.sph)} / ${fmtD(form.os.cyl)} × ${form.os.axis || '—'}°</div>` : ''}
        </div>

        ${form.referralFlag ? `
          <div class="callout callout-err" style="margin-bottom:10px">
            <strong>KHUYẾN NGHỊ CHUYỂN TUYẾN BÁC SĨ NHÃN KHOA:</strong> ${esc(form.referralReason || 'Đề nghị thăm khám chuyên khoa mắt để đánh giá bệnh lý.')}
          </div>
        ` : ''}

        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:16px;gap:12px;flex-wrap:wrap">
          <div class="muted-xs">Thị lực hai mắt (OU): <strong class="mono">${esc(form.binocularVa)}</strong></div>
          <div style="text-align:center">
            <div style="font-size:12.5px;font-weight:700">Người thực hiện &amp; Ký tên</div>
            ${signed ? `
              <div style="margin-top:26px;font-weight:700">${esc(CURRENT_USER.name)}</div>
              <div class="muted-xs mono">${esc(CURRENT_USER.license)}</div>
            ` : '<div style="margin-top:26px;font-weight:700">(Chưa ký)</div>'}
          </div>
        </div>

        <div class="disclaimer-box">
          <strong>Lưu ý phạm vi chuyên môn (NĐ 96/2023/NĐ-CP):</strong> Đây là phiếu kết quả đo kiểm tra tật khúc xạ phục vụ lắp kính tại cơ sở kính thuốc, <strong>không phải hồ sơ bệnh án hay chẩn đoán bệnh lý nhãn khoa</strong>. Nếu có dấu hiệu đau nhức mắt, giảm thị lực đột ngột hoặc nhìn đôi, vui lòng thăm khám tại cơ sở y tế chuyên khoa Mắt.
        </div>
      </div>
    `;
    document.getElementById('printBackdrop').classList.remove('hidden');
    document.getElementById('printModal').classList.remove('hidden');
  }

  function closePrintModal() {
    document.getElementById('printBackdrop').classList.add('hidden');
    document.getElementById('printModal').classList.add('hidden');
  }

  // ==================== CMD+K & SHELL CONTROLS ====================
  function openCmdk() {
    document.getElementById('cmdkBackdrop').classList.remove('hidden');
    document.getElementById('cmdkModal').classList.remove('hidden');
    const inp = document.getElementById('cmdkInput');
    inp.value = '';
    renderCmdk('');
    setTimeout(() => inp.focus(), 20);
  }
  function closeCmdk() {
    document.getElementById('cmdkBackdrop').classList.add('hidden');
    document.getElementById('cmdkModal').classList.add('hidden');
  }
  function renderCmdk(q) {
    const query = q.trim().toLowerCase();
    const hits = customers.filter((c) => !query || `${c.name} ${c.phone} ${c.id}`.toLowerCase().includes(query));
    const wrap = document.getElementById('cmdkResults');
    wrap.innerHTML = hits.length
      ? hits.map((c) => `<button type="button" class="cmdk-item" data-cmdk-cus="${c.id}"><span><strong>${esc(c.name)}</strong> (${c.age}t)</span><span class="muted-xs mono">${esc(c.phone)}</span></button>`).join('')
      : '<div class="muted-xs" style="padding:14px;text-align:center">Không tìm thấy khách hàng khớp.</div>';
    wrap.querySelectorAll('[data-cmdk-cus]').forEach((b) => {
      b.onclick = () => { closeCmdk(); selectCustomer(b.dataset.cmdkCus); };
    });
  }

  function closeMobileSidebar() {
    document.getElementById('storeSidebar').classList.remove('mobile-open');
    document.getElementById('sidebarBackdrop').classList.add('hidden');
  }

  document.getElementById('sidebarCollapseBtn').onclick = () => {
    document.getElementById('appLayout').classList.toggle('sidebar-collapsed');
  };
  document.getElementById('mobileMenuBtn').onclick = () => {
    document.getElementById('storeSidebar').classList.add('mobile-open');
    document.getElementById('sidebarBackdrop').classList.remove('hidden');
  };
  document.getElementById('sidebarBackdrop').onclick = closeMobileSidebar;

  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.onclick = () => {
      closeMobileSidebar();
      if (btn.dataset.nav !== 'exam') {
        showToast(`Mục "${btn.title}" thuộc phạm vi màn hình khác của hệ thống.`);
      }
    };
  });

  document.getElementById('customerSelect').onchange = (e) => selectCustomer(e.target.value);
  document.querySelectorAll('#quickCasePills .pill').forEach((b) => {
    b.onclick = () => selectCustomer(b.dataset.case);
  });

  document.getElementById('globalSearchTrigger').onclick = openCmdk;
  document.getElementById('closeCmdkBtn').onclick = closeCmdk;
  document.getElementById('cmdkBackdrop').onclick = closeCmdk;
  document.getElementById('cmdkInput').oninput = (e) => renderCmdk(e.target.value);

  document.getElementById('closePrintBtn').onclick = closePrintModal;
  document.getElementById('printBackdrop').onclick = closePrintModal;
  document.getElementById('doPrintBtn').onclick = () => window.print();

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCmdk();
    } else if (e.key === 'Escape') {
      closeCmdk();
      closePrintModal();
      if (confirmState) closeConfirm();
      closeMobileSidebar();
    }
  });

  document.getElementById('confirmCancelBtn').onclick = closeConfirm;
  document.getElementById('confirmBackdrop').onclick = closeConfirm;
  document.getElementById('confirmOkBtn').onclick = () => {
    if (!confirmState) return;
    const reasonEl = document.getElementById('confirmReason');
    const fn = confirmState.onConfirm;
    const reason = reasonEl ? reasonEl.value.trim() : '';
    closeConfirm();
    if (fn) fn(reason);
  };

  // Lỗi nhập liệu (khoảng/định dạng) tự xoá khi người dùng thao tác tiếp
  const formPanelEl = document.getElementById('examFormPanel');
  formPanelEl.addEventListener('change', () => { fieldErrors = {}; }, true);
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('moreMenu');
    if (menu && !menu.classList.contains('hidden') && !e.target.closest('.more-wrap')) {
      menu.classList.add('hidden');
      const b = document.getElementById('moreBtn');
      if (b) b.setAttribute('aria-expanded', 'false');
    }
  });

  function renderAll() {
    renderCustomerSelector();
    renderExamForm();
    renderChartPanel();
    renderHistoryPanel();
  }

  renderAll();
})();
