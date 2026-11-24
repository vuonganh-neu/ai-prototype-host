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
          signerId: 'STF-01',
          validityMonths: 12,
          referralFlag: false,
          referralReason: '',
          status: 'SIGNED',
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
          signerId: 'STF-02',
          validityMonths: 12,
          referralFlag: false,
          referralReason: '',
          status: 'SIGNED',
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
          signerId: 'STF-03',
          validityMonths: 12,
          referralFlag: true,
          referralReason: 'BCVA mắt phải 6/10 (< 7/10) và chênh khúc xạ 2 mắt ≥ 2.00 D — khuyến nghị tái khám BS Mắt theo hẹn.',
          status: 'SIGNED',
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
  function computeClinicalAlerts() {
    const alerts = [];
    const odSe = calcSE(toMinusCyl(form.od, form.cylConvention));
    const osSe = calcSE(toMinusCyl(form.os, form.cylConvention));
    const diffSe = Math.abs(odSe - osSe);
    if (diffSe >= 2.0) {
      alerts.push({ level: 'warn', text: `Lệch khúc xạ hai mắt (Anisometropia): |SE OD − SE OS| = ${diffSe.toFixed(2)} D (≥ 2.00 D) — cân nhắc chiết suất cân bằng độ dày & theo dõi thích nghi.` });
    }
    const scale = VA_SCALES[form.vaScale];
    if (scale.lowSet.has(form.od.bcva) || scale.lowSet.has(form.os.bcva)) {
      alerts.push({ level: 'err', text: `Thị lực chỉnh kính tối ưu (BCVA) dưới ngưỡng 7/10 (OD: ${form.od.bcva}, OS: ${form.os.bcva}) — bật cờ khuyến nghị chuyển tuyến Bác sĩ Mắt.` });
    }
    const frame = SAMPLE_FRAMES.find((f) => f.id === form.fitting.frameId);
    if (frame && (form.purpose === 'PROGRESSIVE' || form.purpose === 'OFFICE')) {
      if (frame.bMm < 30) {
        alerts.push({ level: 'err', text: `Cảnh báo gọng hẹp: Chiều cao tròng B = ${frame.bMm} mm (< 30 mm tối thiểu cho đa tròng/văn phòng). Cần đổi gọng cao hơn.` });
      } else if (Number(form.fitting.segHeight) > frame.bMm - 10) {
        alerts.push({ level: 'warn', text: `Chiều cao tâm đọc (${form.fitting.segHeight} mm) quá sát mép trên của gọng (B = ${frame.bMm} mm).` });
      }
    }
    return { alerts, odSe, osSe, diffSe };
  }

  // ==================== RENDER LEFT FORM ====================
  function renderStepper(eyeKey, field, val, ariaLabel, isAdd = false) {
    const formatted = isAdd ? (Number(val) > 0 ? '+' + roundQuarter(val).toFixed(2) : '0.00') : fmtD(val);
    return `
      <div class="stepper">
        <button type="button" data-step="${eyeKey}:${field}:-1" aria-label="Giảm ${ariaLabel} 0.25 D">−</button>
        <input type="text" value="${formatted}" data-num="${eyeKey}:${field}" aria-label="${ariaLabel}" />
        <button type="button" data-step="${eyeKey}:${field}:1" aria-label="Tăng ${ariaLabel} 0.25 D">+</button>
      </div>
    `;
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
    const showNear = Number(form.od.add) > 0 || Number(form.os.add) > 0 || ['PROGRESSIVE', 'OFFICE', 'READING'].includes(form.purpose);
    const showInter = form.purpose === 'PROGRESSIVE' || form.purpose === 'OFFICE';
    const binoPd = (Number(form.pdOd) + Number(form.pdOs)).toFixed(1);

    const panel = document.getElementById('examFormPanel');
    panel.innerHTML = `
      <div class="block-head" style="margin-bottom:12px">
        <div>
          <h2 style="margin:0;font-size:16px">${esc(c.name)} <span class="muted-xs">(${c.age} tuổi · ${esc(c.phone)})</span></h2>
          <div class="muted-xs">${esc(c.note)}</div>
        </div>
        ${form.revisionOf ? `<span class="badge badge-warn">Phiên bản sửa đổi từ ${esc(form.revisionOf)}</span>` : `<span class="badge badge-teal">Phiếu đo mới</span>`}
      </div>

      ${formError ? `<div class="callout callout-err" role="alert" style="margin-top:0;margin-bottom:12px"><strong>Không thể lưu phiếu:</strong> ${esc(formError)}</div>` : ''}

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

      <!-- 2. Distance Vision (DV) Table -->
      <div class="block-card">
        <div class="block-head">
          <h3 class="block-title">2. Khối Nhìn xa (DV — Distance Vision) &amp; Thị lực (VA)</h3>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <label for="vaScaleSel" style="font-size:12px;font-weight:600;color:#4B5B58">Thang VA:</label>
            <select id="vaScaleSel" class="select" style="width:auto;padding:4px 8px">
              ${Object.entries(VA_SCALES).map(([k, v]) => `<option value="${k}" ${form.vaScale === k ? 'selected' : ''}>${esc(v.label)}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="rx-table-wrap">
          <table class="rx-table">
            <thead>
              <tr>
                <th>Mắt</th>
                <th>SPH (Cầu)</th>
                <th>CYL (Trụ)</th>
                <th>AXIS (1°–180°)</th>
                <th>ADD (Đọc)</th>
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
                const cylZero = roundQuarter(eye.cyl) === 0;
                return `
                  <tr>
                    <td><span class="eye-tag ${isOd ? 'eye-od' : 'eye-os'}">${isOd ? 'OD Phải' : 'OS Trái'}</span></td>
                    <td>${renderStepper(k, 'sph', eye.sph, `SPH ${eyeLabel}`)}</td>
                    <td>${renderStepper(k, 'cyl', eye.cyl, `CYL ${eyeLabel}`)}</td>
                    <td><input type="number" min="1" max="180" class="input mono" style="width:66px" data-axis="${k}" aria-label="Trục AXIS ${eyeLabel}" value="${cylZero ? '' : (eye.axis || '')}" ${cylZero ? 'disabled placeholder="—"' : ''} /></td>
                    <td>${renderStepper(k, 'add', eye.add, `ADD ${eyeLabel}`, true)}</td>
                    <td><input type="number" step="0.25" min="0" max="15" class="input mono" style="width:62px" data-prism="${k}" aria-label="Lăng kính PRISM ${eyeLabel}" value="${eye.prism || 0}" /></td>
                    <td>
                      <select class="select" style="width:64px;padding:5px" data-base="${k}" aria-label="Hướng đáy BASE ${eyeLabel}" ${Number(eye.prism) > 0 ? '' : 'disabled'}>
                        ${['BI', 'BO', 'BU', 'BD'].map((b) => `<option value="${b}" ${eye.base === b ? 'selected' : ''}>${b}</option>`).join('')}
                      </select>
                    </td>
                    <td>
                      <select class="select" style="width:94px;padding:5px" data-va="${k}:ucva" aria-label="Thị lực không kính UCVA ${eyeLabel}">
                        ${scale.options.map((opt) => `<option value="${opt}" ${eye.ucva === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                      </select>
                    </td>
                    <td>
                      <select class="select" style="width:94px;padding:5px" data-va="${k}:bcva" aria-label="Thị lực có kính BCVA ${eyeLabel}">
                        ${scale.options.map((opt) => `<option value="${opt}" ${eye.bcva === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                      </select>
                    </td>
                    <td>
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

        <!-- Parallel Transposition Display (B-01) -->
        <div class="callout callout-teal">
          <div style="font-weight:700;margin-bottom:3px">${esc(altLabel)} (Hiển thị song song chống cắt nhầm độ):</div>
          <div class="mono" style="font-size:12.5px">
            OD: ${fmtD(odAlt.sph)} / ${fmtD(odAlt.cyl)} × ${odAlt.axis || '—'}° &nbsp;&nbsp;|&nbsp;&nbsp; OS: ${fmtD(osAlt.sph)} / ${fmtD(osAlt.cyl)} × ${osAlt.axis || '—'}°
          </div>
        </div>

        <!-- SE & Clinical Classification Strip (B-04) + Binocular VA (B-06) -->
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

      <!-- 3. Near Vision (NV) & Intermediate Block (B-02) -->
      ${showNear ? `
        <div class="block-card">
          <div class="block-head">
            <h3 class="block-title">3. Khối Nhìn gần (NV · Tự tính = SPH + ADD)${showInter ? ' &amp; Trung gian (Văn phòng)' : ''}</h3>
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
                    <td><strong>Trung gian (60–80 cm)</strong></td>
                    <td class="mono">${fmtD(roundQuarter(form.od.sph + roundQuarter(form.od.add * 0.5)))} / ${fmtD(form.od.cyl)} × ${form.od.axis || '—'}°</td>
                    <td class="mono">${fmtD(roundQuarter(form.os.sph + roundQuarter(form.os.add * 0.5)))} / ${fmtD(form.os.cyl)} × ${form.os.axis || '—'}°</td>
                    <td class="mono">${(Number(form.pdNear) + 1.5).toFixed(1)} mm</td>
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
        </div>
      ` : ''}

      <!-- 4. PD & Multifocal Fitting Cross-Check (B-07) -->
      <div class="block-card">
        <div class="block-head">
          <h3 class="block-title">4. Khoảng cách đồng tử (PD) &amp; Thông số lắp ráp Đa tròng</h3>
          <span class="badge badge-neutral mono">PD tổng: ${binoPd} mm</span>
        </div>
        <div class="grid-3">
          <div class="field"><label for="pdOd">PD mắt phải (mm)</label><input id="pdOd" type="number" step="0.5" min="24" max="40" class="input mono" value="${form.pdOd}" /></div>
          <div class="field"><label for="pdOs">PD mắt trái (mm)</label><input id="pdOs" type="number" step="0.5" min="24" max="40" class="input mono" value="${form.pdOs}" /></div>
          <div class="field"><label for="pdNear">PD nhìn gần (mm)</label><input id="pdNear" type="number" step="0.5" min="48" max="76" class="input mono" value="${form.pdNear}" /></div>
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

      <!-- 5. Signer, Validity, Referral & Legal Boundary (B-03, B-08) -->
      <div class="block-card">
        <div class="block-head">
          <h3 class="block-title">5. Người ký có chứng chỉ, Hiệu lực toa &amp; Khuyến nghị chuyển tuyến</h3>
          <span class="badge ${STATUS_META[form.status].cls}">${STATUS_META[form.status].label}</span>
        </div>
        <div class="grid-3">
          <div class="field">
            <label for="signerSel">Người ký (Nhân sự có CCHN) *</label>
            <select id="signerSel" class="select">
              ${CERTIFIED_SIGNERS.map((s) => `<option value="${s.id}" ${form.signerId === s.id ? 'selected' : ''}>${esc(s.name)} · ${esc(s.license)}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label for="validitySel">Hiệu lực toa</label>
            <select id="validitySel" class="select">
              <option value="6" ${Number(form.validityMonths) === 6 ? 'selected' : ''}>6 tháng (Trẻ em / theo dõi sát)</option>
              <option value="12" ${Number(form.validityMonths) === 12 ? 'selected' : ''}>12 tháng (Tiêu chuẩn)</option>
              <option value="24" ${Number(form.validityMonths) === 24 ? 'selected' : ''}>24 tháng (Người lớn ổn định)</option>
            </select>
          </div>
          <div class="field">
            <label for="statusSel">Trạng thái vòng đời</label>
            <select id="statusSel" class="select">
              <option value="DRAFT" ${form.status === 'DRAFT' ? 'selected' : ''}>Nháp (Chưa ký)</option>
              <option value="SIGNED" ${form.status === 'SIGNED' ? 'selected' : ''}>Đã ký (Sẵn sàng cắt kính)</option>
              <option value="LOCKED_FOR_LAB" ${form.status === 'LOCKED_FOR_LAB' ? 'selected' : ''}>Đã gửi Lab cắt kính (Khóa bất biến)</option>
            </select>
          </div>
        </div>

        ${form.revisionOf ? `
          <div class="field" style="margin-top:10px">
            <label for="revReasonInput">Lý do tạo phiên bản sửa đổi từ ${esc(form.revisionOf)} *</label>
            <input id="revReasonInput" class="input" value="${esc(form.revisionReason)}" placeholder="VD: Khách chưa thích nghi độ loạn, giảm 0.25 D theo phản hồi..." />
          </div>
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

        ${alerts.map((a) => `<div class="callout ${a.level === 'err' ? 'callout-err' : 'callout-warn'}">${esc(a.text)}</div>`).join('')}
      </div>

      <div class="sticky-action-bar">
        <button type="button" class="btn btn-secondary" id="openPrintBtn">Xem &amp; In phiếu (Có Disclaimer)</button>
        <div style="display:flex;gap:8px">
          <button type="button" class="btn btn-secondary" id="resetFormBtn">Đặt lại</button>
          <button type="button" class="btn btn-primary" id="saveExamBtn">Lưu phiếu đo &amp; Ký toa</button>
        </div>
      </div>
    `;

    bindFormEvents();
  }

  function bindFormEvents() {
    document.getElementById('rxSource').onchange = (e) => { form.source = e.target.value; renderExamForm(); };
    document.getElementById('cylConvention').onchange = (e) => { form.cylConvention = e.target.value; renderExamForm(); };
    document.getElementById('rxPurpose').onchange = (e) => { form.purpose = e.target.value; renderExamForm(); };
    document.getElementById('vaScaleSel').onchange = (e) => {
      form.vaScale = e.target.value;
      const opts = VA_SCALES[form.vaScale].options;
      form.od.ucva = opts[4]; form.od.bcva = opts[1]; form.od.ph = opts[1];
      form.os.ucva = opts[4]; form.os.bcva = opts[1]; form.os.ph = opts[1];
      form.binocularVa = opts[1];
      renderExamForm();
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

    // Steppers (±0.25 D, with B-12 ADD first-step fix!)
    document.querySelectorAll('[data-step]').forEach((btn) => {
      btn.onclick = () => {
        const [eyeKey, field, dirStr] = btn.dataset.step.split(':');
        const dir = Number(dirStr);
        let cur = roundQuarter(form[eyeKey][field]);
        if (field === 'add') {
          if (dir > 0) cur = cur <= 0 ? 0.75 : Math.min(4.0, roundQuarter(cur + 0.25));
          else cur = cur <= 0.75 ? 0 : roundQuarter(cur - 0.25);
        } else {
          cur = roundQuarter(cur + dir * 0.25);
          if (field === 'cyl' && cur !== 0 && !form[eyeKey].axis) form[eyeKey].axis = 180;
          if (field === 'cyl' && cur === 0) form[eyeKey].axis = '';
        }
        form[eyeKey][field] = cur;
        renderExamForm();
      };
    });

    document.querySelectorAll('[data-num]').forEach((inp) => {
      inp.onchange = () => {
        const [eyeKey, field] = inp.dataset.num.split(':');
        const parsed = parseFloat(inp.value.replace('−', '-'));
        const val = Number.isNaN(parsed) ? 0 : roundQuarter(parsed);
        form[eyeKey][field] = field === 'add' ? Math.max(0, val) : val;
        if (field === 'cyl' && val === 0) form[eyeKey].axis = '';
        if (field === 'cyl' && val !== 0 && !form[eyeKey].axis) form[eyeKey].axis = 180;
        renderExamForm();
      };
    });

    document.querySelectorAll('[data-axis]').forEach((inp) => {
      inp.onchange = () => {
        form[inp.dataset.axis].axis = normalizeAxis(inp.value);
        renderExamForm();
      };
    });
    document.querySelectorAll('[data-prism]').forEach((inp) => {
      inp.onchange = () => {
        form[inp.dataset.prism].prism = Math.max(0, roundQuarter(inp.value));
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
        renderExamForm();
      };
    });

    const prismJust = document.getElementById('prismJustInput');
    if (prismJust) prismJust.oninput = (e) => { form.prismJustification = e.target.value; };

    document.getElementById('pdOd').onchange = (e) => { form.pdOd = Number(e.target.value) || 31; renderExamForm(); };
    document.getElementById('pdOs').onchange = (e) => { form.pdOs = Number(e.target.value) || 31; renderExamForm(); };
    document.getElementById('pdNear').onchange = (e) => { form.pdNear = Number(e.target.value) || 60; renderExamForm(); };
    document.getElementById('frameCrossSel').onchange = (e) => { form.fitting.frameId = e.target.value; renderExamForm(); };
    document.getElementById('fitBvd').onchange = (e) => { form.fitting.bvd = Number(e.target.value) || 12; };
    document.getElementById('fitPanto').onchange = (e) => { form.fitting.panto = Number(e.target.value) || 9; };
    document.getElementById('fitWrap').onchange = (e) => { form.fitting.wrap = Number(e.target.value) || 5; };
    document.getElementById('fitSegH').onchange = (e) => { form.fitting.segHeight = Number(e.target.value) || 19; renderExamForm(); };
    document.getElementById('fitOcH').onchange = (e) => { form.fitting.ocHeight = Number(e.target.value) || 20; };

    document.getElementById('signerSel').onchange = (e) => { form.signerId = e.target.value; };
    document.getElementById('validitySel').onchange = (e) => { form.validityMonths = Number(e.target.value); };
    document.getElementById('statusSel').onchange = (e) => { form.status = e.target.value; renderExamForm(); };
    document.getElementById('referralCb').onchange = (e) => { form.referralFlag = e.target.checked; renderExamForm(); };

    const refReason = document.getElementById('referralReasonInput');
    if (refReason) refReason.oninput = (e) => { form.referralReason = e.target.value; };
    const revReason = document.getElementById('revReasonInput');
    if (revReason) revReason.oninput = (e) => { form.revisionReason = e.target.value; };

    document.getElementById('openPrintBtn').onclick = openPrintModal;
    document.getElementById('resetFormBtn').onclick = () => {
      form = deepClone(getCustomer().defaultForm);
      formError = '';
      renderExamForm();
      showToast('Đã khôi phục dữ liệu phiếu đo.');
    };

    document.getElementById('saveExamBtn').onclick = saveExam;
  }

  function saveExam() {
    const hasPrism = Number(form.od.prism) > 0 || Number(form.os.prism) > 0;
    if (hasPrism && !String(form.prismJustification || '').trim()) {
      formError = 'Vui lòng nhập "Số đo biện minh kê Lăng kính" trước khi lưu toa có PRISM > 0.';
      renderExamForm();
      return;
    }
    if (form.revisionOf && !String(form.revisionReason || '').trim()) {
      formError = 'Vui lòng ghi rõ lý do tạo phiên bản sửa đổi cho toa đã khóa.';
      renderExamForm();
      return;
    }
    formError = '';

    const c = getCustomer();
    const signer = CERTIFIED_SIGNERS.find((s) => s.id === form.signerId) || CERTIFIED_SIGNERS[0];
    const today = new Date().toISOString().slice(0, 10);

    let nextVer = 1;
    if (form.revisionOf) {
      const old = c.history.find((h) => h.id === form.revisionOf);
      if (old) {
        old.status = 'SUPERSEDED';
        nextVer = (old.version || 1) + 1;
      }
    }

    c.history.unshift({
      id: 'RX-2026-' + String(Math.floor(300 + Math.random() * 600)),
      version: nextVer,
      date: today,
      expiresAt: addMonths(today, form.validityMonths),
      status: form.status,
      source: form.source,
      cylConvention: form.cylConvention,
      purpose: form.purpose,
      signer: `${signer.name} (${signer.license})`,
      od: deepClone(form.od),
      os: deepClone(form.os),
      pdOd: form.pdOd,
      pdOs: form.pdOs,
      vaScale: form.vaScale,
      binocularVa: form.binocularVa,
      referralFlag: form.referralFlag,
      revisionReason: form.revisionReason
    });

    form.revisionOf = null;
    form.revisionReason = '';
    renderAll();
    showToast('Đã lưu phiếu đo khúc xạ và cập nhật biểu đồ diễn tiến SE.');
  }

  // ==================== RIGHT: SE EVOLUTION CHART (B-04 / PRJ-002) ====================
  function renderChartPanel() {
    const c = getCustomer();
    const sorted = [...c.history].filter((h) => h.status !== 'SUPERSEDED').sort((a, b) => a.date.localeCompare(b.date));
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

  // ==================== RIGHT: IMMUTABLE RX HISTORY (B-08) ====================
  function renderHistoryPanel() {
    const c = getCustomer();
    const panel = document.getElementById('historyPanel');
    panel.innerHTML = `
      <div class="block-head">
        <div>
          <h3 class="block-title">Lịch sử Toa kính bất biến (${c.history.length} bản)</h3>
          <div class="muted-xs">Toa đã cắt kính bị khóa — sửa đổi phải tạo phiên bản mới kèm lý do.</div>
        </div>
      </div>
      ${c.history.map((h) => {
        const odSe = calcSE(toMinusCyl(h.od, h.cylConvention));
        const osSe = calcSE(toMinusCyl(h.os, h.cylConvention));
        const st = STATUS_META[h.status] || STATUS_META.SIGNED;
        return `
          <div class="hist-card ${h.status === 'SUPERSEDED' ? 'superseded' : ''}">
            <div class="hist-head">
              <div>
                <strong class="mono">${esc(h.id)}</strong> <span class="muted-xs">v${h.version || 1} · ${esc(h.date)}</span>
              </div>
              <span class="badge ${st.cls}">${esc(st.label)}</span>
            </div>
            <div class="hist-rx-line"><strong>OD:</strong> ${fmtD(h.od.sph)} / ${fmtD(h.od.cyl)} × ${h.od.axis || '—'}° ${h.od.add ? '· ADD +' + h.od.add.toFixed(2) : ''} (SE ${fmtD(odSe)})</div>
            <div class="hist-rx-line"><strong>OS:</strong> ${fmtD(h.os.sph)} / ${fmtD(h.os.cyl)} × ${h.os.axis || '—'}° ${h.os.add ? '· ADD +' + h.os.add.toFixed(2) : ''} (SE ${fmtD(osSe)})</div>
            <div class="muted-xs" style="margin-top:6px">Người ký: ${esc(h.signer)} · Hạn toa: <span class="mono">${esc(h.expiresAt)}</span></div>
            ${h.revisionReason ? `<div class="muted-xs" style="color:#B45309;margin-top:3px">Lý do sửa đổi: ${esc(h.revisionReason)}</div>` : ''}
            ${h.status !== 'SUPERSEDED' ? `
              <div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">
                <button type="button" class="btn btn-secondary btn-sm" data-revise="${esc(h.id)}">Tạo phiên bản sửa đổi</button>
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}
    `;

    panel.querySelectorAll('[data-revise]').forEach((btn) => {
      btn.onclick = () => {
        const target = c.history.find((h) => h.id === btn.dataset.revise);
        if (!target) return;
        form.od.sph = target.od.sph; form.od.cyl = target.od.cyl; form.od.axis = target.od.axis; form.od.add = target.od.add || 0;
        form.os.sph = target.os.sph; form.os.cyl = target.os.cyl; form.os.axis = target.os.axis; form.os.add = target.os.add || 0;
        form.cylConvention = target.cylConvention || 'MINUS';
        form.revisionOf = target.id;
        form.revisionReason = '';
        form.status = 'SIGNED';
        renderExamForm();
        showToast(`Đã nạp ${target.id} vào biểu mẫu để tạo phiên bản sửa đổi (toa gốc giữ nguyên bất biến).`);
      };
    });
  }

  // ==================== PRINT MODAL (B-03 DISCLAIMER) ====================
  function openPrintModal() {
    const c = getCustomer();
    const signer = CERTIFIED_SIGNERS.find((s) => s.id === form.signerId) || CERTIFIED_SIGNERS[0];
    const today = new Date().toISOString().slice(0, 10);
    const expires = addMonths(today, form.validityMonths);
    const odLab = toMinusCyl(form.od, form.cylConvention);
    const osLab = toMinusCyl(form.os, form.cylConvention);

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
              <td><strong>Nhìn xa — OD</strong></td>
              <td class="mono">${fmtD(odLab.sph)}</td>
              <td class="mono">${fmtD(odLab.cyl)}</td>
              <td class="mono">${odLab.axis || '—'}°</td>
              <td class="mono">${form.od.add ? '+' + form.od.add.toFixed(2) : '—'}</td>
              <td class="mono">${form.od.prism ? form.od.prism + 'Δ ' + form.od.base : '—'}</td>
              <td class="mono">${esc(form.od.bcva)}</td>
            </tr>
            <tr>
              <td><strong>Nhìn xa — OS</strong></td>
              <td class="mono">${fmtD(osLab.sph)}</td>
              <td class="mono">${fmtD(osLab.cyl)}</td>
              <td class="mono">${osLab.axis || '—'}°</td>
              <td class="mono">${form.os.add ? '+' + form.os.add.toFixed(2) : '—'}</td>
              <td class="mono">${form.os.prism ? form.os.prism + 'Δ ' + form.os.base : '—'}</td>
              <td class="mono">${esc(form.os.bcva)}</td>
            </tr>
            ${(form.od.add > 0 || form.os.add > 0) ? `
              <tr>
                <td><strong>Nhìn gần — OD / OS</strong></td>
                <td class="mono" colspan="6">OD: ${fmtD(roundQuarter(odLab.sph + form.od.add))} / ${fmtD(odLab.cyl)} × ${odLab.axis || '—'}° &nbsp;|&nbsp; OS: ${fmtD(roundQuarter(osLab.sph + form.os.add))} / ${fmtD(osLab.cyl)} × ${osLab.axis || '—'}°</td>
              </tr>
            ` : ''}
          </tbody>
        </table>

        ${form.referralFlag ? `
          <div class="callout callout-err" style="margin-bottom:10px">
            <strong>KHUYẾN NGHỊ CHUYỂN TUYẾN BÁC SĨ NHÃN KHOA:</strong> ${esc(form.referralReason || 'Đề nghị thăm khám chuyên khoa mắt để đánh giá bệnh lý.')}
          </div>
        ` : ''}

        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:16px;gap:12px;flex-wrap:wrap">
          <div class="muted-xs">Thị lực hai mắt (OU): <strong class="mono">${esc(form.binocularVa)}</strong></div>
          <div style="text-align:center">
            <div style="font-size:12.5px;font-weight:700">Người thực hiện &amp; Ký tên</div>
            <div style="margin-top:26px;font-weight:700">${esc(signer.name)}</div>
            <div class="muted-xs mono">${esc(signer.license)}</div>
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
      closeMobileSidebar();
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
