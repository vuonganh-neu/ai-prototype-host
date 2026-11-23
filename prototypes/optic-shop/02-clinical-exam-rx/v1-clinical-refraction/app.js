(() => {
  const VA_OPTIONS = ['—', '10/10', '9/10', '8/10', '7/10', '6/10', '5/10', '4/10', '3/10', '2/10', '1/10', 'ĐNT 3m'];
  const PRISM_BASES = ['', 'BI', 'BO', 'BU', 'BD'];
  const USAGE_PURPOSES = [
    { id: 'DISTANCE', label: 'Nhìn xa (Đơn tròng)' },
    { id: 'READING', label: 'Đọc sách / Nhìn gần' },
    { id: 'PROGRESSIVE', label: 'Đa tròng (Progressive)' },
    { id: 'BIFOCAL', label: 'Hai tròng (Bifocal)' },
    { id: 'OFFICE', label: 'Kính văn phòng (Chống mỏi)' }
  ];

  const LENS_CATALOG = [
    { id: 'L1', name: 'Chemi U2 1.56 (Chống trầy, UV400)', index: '1.56', maxPower: 2.5, coating: 'Tráng cứng + AR + UV400' },
    { id: 'L2', name: 'Essilor Crizal Rock 1.60 Blue-Cut', index: '1.60', maxPower: 4.0, coating: 'Lọc ánh sáng xanh + Siêu chống trầy' },
    { id: 'L3', name: 'Essilor Crizal Rock 1.67 Siêu mỏng', index: '1.67', maxPower: 7.0, coating: 'Siêu mỏng 35% + Blue-Cut + Trượt nước' },
    { id: 'L4', name: 'Zeiss ClearView 1.74 Siêu mỏng tối đa', index: '1.74', maxPower: 15.0, coating: 'Siêu mỏng 45% + DuraVision Platinum' },
    { id: 'L5', name: 'Essilor Varilux Comfort Max 1.60 (Đa tròng)', index: '1.60', maxPower: 6.0, coating: 'Đa tròng vùng nhìn rộng + Chống lóa' }
  ];

  const state = {
    selectedCustomerId: 'CUS-01',
    showAutoRefract: true,
    pdMode: 'MONO', // MONO (OD+OS) | BINO (Total)
    customers: [
      { id: 'CUS-01', name: 'Nguyễn Minh Anh', phone: '0912 345 678', age: 27, tag: 'Cận + Loạn' },
      { id: 'CUS-02', name: 'Trần Quốc Hùng', phone: '0988 210 456', age: 54, tag: 'Viễn + Lão thị' },
      { id: 'CUS-03', name: 'Lê Thảo Vy', phone: '0904 778 912', age: 31, tag: 'Cận cao + Lăng kính' }
    ],
    examinations: [
      {
        id: 'EX-2611-01', customerId: 'CUS-01', date: '2026-05-12', sourceType: 'IN_STORE',
        optometrist: 'KTV Hoàng Nam', purpose: 'DISTANCE',
        od: { sph: -2.50, cyl: -0.50, axis: 175, add: null, prism: '', base: '', ucva: '2/10', bcva: '10/10' },
        os: { sph: -2.00, cyl: -0.25, axis: 10, add: null, prism: '', base: '', ucva: '3/10', bcva: '10/10' },
        pdOd: 31.0, pdOs: 31.0, pdTotal: 62.0, fittingHeight: 18,
        note: 'Tăng 0.25D mắt phải so với năm 2025. Hẹn tái khám sau 6 tháng.'
      },
      {
        id: 'EX-2505-02', customerId: 'CUS-01', date: '2025-05-08', sourceType: 'IN_STORE',
        optometrist: 'KTV Hoàng Nam', purpose: 'DISTANCE',
        od: { sph: -2.25, cyl: -0.50, axis: 175, add: null, prism: '', base: '', ucva: '3/10', bcva: '10/10' },
        os: { sph: -2.00, cyl: -0.25, axis: 10, add: null, prism: '', base: '', ucva: '3/10', bcva: '10/10' },
        pdOd: 31.0, pdOs: 31.0, pdTotal: 62.0, fittingHeight: 18,
        note: 'Độ ổn định tốt.'
      },
      {
        id: 'EX-2603-03', customerId: 'CUS-02', date: '2026-03-20', sourceType: 'IN_STORE',
        optometrist: 'KTV Minh Tâm', purpose: 'PROGRESSIVE',
        od: { sph: 1.50, cyl: 0.00, axis: null, add: 1.75, prism: '', base: '', ucva: '6/10', bcva: '10/10' },
        os: { sph: 1.75, cyl: -0.50, axis: 90, add: 1.75, prism: '', base: '', ucva: '5/10', bcva: '10/10' },
        pdOd: 31.5, pdOs: 32.0, pdTotal: 63.5, fittingHeight: 20,
        note: 'Khách đeo đa tròng lần đầu, đã hướng dẫn tư thế đọc sách.'
      },
      {
        id: 'EX-2608-04', customerId: 'CUS-03', date: '2026-08-14', sourceType: 'EXTERNAL_RX',
        optometrist: 'BS. Nguyễn Lan (BV Mắt TW)', purpose: 'DISTANCE',
        od: { sph: -4.25, cyl: -1.25, axis: 180, add: null, prism: '1.50', base: 'BI', ucva: '1/10', bcva: '9/10' },
        os: { sph: -4.00, cyl: -1.00, axis: 175, add: null, prism: '1.50', base: 'BI', ucva: '1/10', bcva: '9/10' },
        pdOd: 30.5, pdOs: 30.5, pdTotal: 61.0, fittingHeight: 19,
        note: 'Toa kê lăng kính đáy trong (BI) hỗ trợ quy tụ.'
      }
    ],
    draft: null
  };

  function makeDraftForCustomer(cid) {
    if (cid === 'CUS-02') {
      return {
        sourceType: 'IN_STORE', optometrist: 'KTV Minh Tâm', externalClinic: '',
        purpose: 'PROGRESSIVE',
        auto: { odSph: 1.75, odCyl: 0.00, odAxis: null, osSph: 2.00, osCyl: -0.50, osAxis: 90 },
        od: { sph: 1.75, cyl: 0.00, axis: null, add: 2.00, prism: '', base: '', ucva: '5/10', bcva: '10/10' },
        os: { sph: 2.00, cyl: -0.50, axis: 90, add: 2.00, prism: '', base: '', ucva: '5/10', bcva: '10/10' },
        pdOd: 31.5, pdOs: 32.0, pdTotal: 63.5, pdNear: 60.5, fittingHeight: 20,
        lensId: 'L5', coatingNote: 'Đa tròng vùng nhìn rộng + Chống lóa AR',
        clinicalNote: 'Tăng độ cộng lão thị ADD +0.25D, khách đọc chữ nhỏ thoải mái ở 40cm.'
      };
    }
    if (cid === 'CUS-03') {
      return {
        sourceType: 'EXTERNAL_RX', optometrist: 'KTV Hoàng Nam', externalClinic: 'Bệnh viện Mắt Trung Ương',
        purpose: 'DISTANCE',
        auto: { odSph: -4.75, odCyl: -1.25, odAxis: 180, osSph: -4.50, osCyl: -1.00, osAxis: 175 },
        od: { sph: -4.50, cyl: -1.25, axis: 180, add: null, prism: '1.50', base: 'BI', ucva: '1/10', bcva: '10/10' },
        os: { sph: -4.25, cyl: -1.00, axis: 175, add: null, prism: '1.50', base: 'BI', ucva: '1/10', bcva: '10/10' },
        pdOd: 30.5, pdOs: 30.5, pdTotal: 61.0, pdNear: 58.0, fittingHeight: 19,
        lensId: 'L3', coatingNote: 'Siêu mỏng 1.67 + Blue-Cut + Mài lăng kính chuẩn Lab',
        clinicalNote: 'Tiếp nhận toa bệnh viện kèm lăng kính 1.50Δ BI hai mắt.'
      };
    }
    return {
      sourceType: 'IN_STORE', optometrist: 'KTV Hoàng Nam', externalClinic: '',
      purpose: 'DISTANCE',
      auto: { odSph: -3.00, odCyl: -0.50, odAxis: 175, osSph: -2.50, osCyl: -0.25, osAxis: 12 },
      od: { sph: -2.75, cyl: -0.50, axis: 175, add: null, prism: '', base: '', ucva: '2/10', bcva: '10/10' },
      os: { sph: -2.25, cyl: -0.25, axis: 10, add: null, prism: '', base: '', ucva: '2/10', bcva: '10/10' },
      pdOd: 31.0, pdOs: 31.0, pdTotal: 62.0, pdNear: 59.0, fittingHeight: 18,
      lensId: 'L2', coatingNote: 'Lọc ánh sáng xanh + Siêu chống trầy',
      clinicalNote: 'Tăng 0.25D hai mắt, nhìn xa rõ nét 10/10, không chóng mặt khi thử kính.'
    };
  }

  state.draft = makeDraftForCustomer('CUS-01');

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const roundQuarter = (n) => Math.round(n * 4) / 4;
  function fmtDiopter(val) {
    if (val === null || val === undefined || val === '') return '—';
    const n = Number(val);
    if (Number.isNaN(n)) return '—';
    if (n === 0) return '0.00';
    return (n > 0 ? '+' : '') + n.toFixed(2);
  }
  function classifySph(val) {
    if (val === null || val === undefined) return { label: 'Chưa đo', cls: 'badge-neutral' };
    if (val < 0) return { label: 'Cận thị', cls: 'badge-myopia' };
    if (val > 0) return { label: 'Viễn thị', cls: 'badge-hyper' };
    return { label: 'Chính thị (0.00)', cls: 'badge-ok' };
  }

  function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.add('hidden'), 2600);
  }

  function validateDraft(d) {
    const errors = [];
    ['od', 'os'].forEach((eye) => {
      const label = eye === 'od' ? 'Mắt phải (OD)' : 'Mắt trái (OS)';
      const e = d[eye];
      if (e.sph !== null && (e.sph < -25 || e.sph > 20 || Math.abs(e.sph * 4 - Math.round(e.sph * 4)) > 1e-6)) {
        errors.push(`${label}: SPH phải nằm trong [-25.00, +20.00] theo bước 0.25D.`);
      }
      if (e.cyl !== null && e.cyl !== 0) {
        if (e.axis === null || e.axis < 1 || e.axis > 180) {
          errors.push(`${label}: Đã nhập độ loạn CYL (${fmtDiopter(e.cyl)}) nên bắt buộc nhập Trục AXIS từ 1° đến 180°.`);
        }
      }
      if (e.add !== null && (e.add < 0.5 || e.add > 4.0)) {
        errors.push(`${label}: Độ cộng ADD phải nằm trong [+0.50, +4.00].`);
      }
      if (e.prism && !e.base) {
        errors.push(`${label}: Đã nhập lăng kính PRISM (${e.prism}Δ) nên cần chọn hướng đáy (BI/BO/BU/BD).`);
      }
    });
    return errors;
  }

  function suggestIndex(d) {
    const maxSph = Math.max(Math.abs(d.od.sph || 0), Math.abs(d.os.sph || 0));
    if (d.purpose === 'PROGRESSIVE') return { idx: '1.60 / 1.67 Đa tròng', msg: `Khách dùng Đa tròng (ADD ${fmtDiopter(d.od.add || d.os.add || 1.5)}) — cần đo chính xác PD từng mắt và Chiều cao tâm kính (Fitting ≥ 18mm).` };
    if (maxSph >= 6.0) return { idx: '1.74 Siêu mỏng tối đa', msg: `Độ cầu cao (${maxSph.toFixed(2)}D) — khuyến nghị chiết suất 1.74 để giảm độ dày viền tròng.` };
    if (maxSph >= 3.5) return { idx: '1.67 Siêu mỏng', msg: `Độ cầu trung bình-cao (${maxSph.toFixed(2)}D) — khuyến nghị chiết suất 1.67 (mỏng hơn 35%).` };
    if (maxSph >= 2.0) return { idx: '1.60 Mỏng nhẹ', msg: `Độ cầu ${maxSph.toFixed(2)}D — chiết suất 1.60 tối ưu thẩm mỹ & chi phí.` };
    return { idx: '1.56 / 1.60 Tiêu chuẩn', msg: `Độ cầu nhẹ (${maxSph.toFixed(2)}D) — phù hợp phôi 1.56 hoặc 1.60 chống trầy / Blue-Cut.` };
  }

  function renderTopSelectors() {
    const sel = document.getElementById('customerSelect');
    sel.innerHTML = state.customers.map((c) => `<option value="${c.id}" ${c.id === state.selectedCustomerId ? 'selected' : ''}>${esc(c.name)} · ${c.age}t (${esc(c.tag)})</option>`).join('');
    document.querySelectorAll('#quickCasePills .pill').forEach((b) => {
      b.classList.toggle('active', b.dataset.case === state.selectedCustomerId);
    });
  }

  function renderStepper(eye, field, value, min, max) {
    const isSph = field === 'sph';
    const cls = isSph && value !== null ? (value < 0 ? 'is-myopia' : value > 0 ? 'is-hyper' : '') : '';
    const display = value === null || value === undefined ? '' : fmtDiopter(value);
    return `
      <div class="stepper-box ${cls}">
        <button type="button" class="stepper-btn" data-step="${eye}:${field}:-0.25" title="Giảm 0.25D">−</button>
        <input class="stepper-inp" data-rxinp="${eye}:${field}" value="${display}" placeholder="0.00" />
        <button type="button" class="stepper-btn" data-step="${eye}:${field}:0.25" title="Tăng 0.25D">+</button>
      </div>
    `;
  }

  function renderForm() {
    const d = state.draft;
    const errors = validateDraft(d);
    const sug = suggestIndex(d);
    const odCls = classifySph(d.od.sph);
    const osCls = classifySph(d.os.sph);

    const panel = document.getElementById('examFormPanel');
    panel.innerHTML = `
      <div class="panel-head">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <h2 class="panel-title">Lập phiếu đo mắt &amp; Toa kính chuẩn Nhãn khoa</h2>
          <span class="badge ${odCls.cls}">OD: ${odCls.label}</span>
          <span class="badge ${osCls.cls}">OS: ${osCls.label}</span>
        </div>
        <span class="badge badge-teal">${d.sourceType === 'IN_STORE' ? 'Đo tại cửa hàng' : 'Toa bệnh viện ngoài'}</span>
      </div>

      <div class="panel-body">
        <div class="form-grid-3">
          <div class="field">
            <label>Nguồn kết quả đo</label>
            <select id="inpSource" class="select">
              <option value="IN_STORE" ${d.sourceType === 'IN_STORE' ? 'selected' : ''}>Đo trực tiếp tại cửa hàng</option>
              <option value="EXTERNAL_RX" ${d.sourceType === 'EXTERNAL_RX' ? 'selected' : ''}>Tiếp nhận toa bệnh viện / ngoài</option>
            </select>
          </div>
          <div class="field">
            <label>Mục đích sử dụng kính</label>
            <select id="inpPurpose" class="select">
              ${USAGE_PURPOSES.map((u) => `<option value="${u.id}" ${d.purpose === u.id ? 'selected' : ''}>${u.label}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label>KTV Khúc xạ / Người tiếp nhận</label>
            <input id="inpOptom" class="input" value="${esc(d.optometrist)}" />
          </div>
        </div>

        ${d.sourceType === 'EXTERNAL_RX' ? `
          <div class="form-grid-2">
            <div class="field">
              <label>Bệnh viện / Phòng khám cấp toa</label>
              <input id="inpClinic" class="input" value="${esc(d.externalClinic)}" placeholder="VD: Bệnh viện Mắt Trung Ương" />
            </div>
            <div class="field">
              <label>Ảnh chụp toa gốc (lưu đối chiếu Lab)</label>
              <label class="btn btn-sm" style="width:fit-content;cursor:pointer">
                <span>Tải ảnh toa gốc (.jpg/.png)</span>
                <input type="file" accept="image/*" style="display:none" id="uploadRxImg" />
              </label>
            </div>
          </div>
        ` : ''}

        <!-- Autorefractometer (Objective) -->
        <div class="auto-box">
          <div class="auto-head">
            <label style="display:flex;align-items:center;gap:8px;font-weight:600;font-size:12.5px;cursor:pointer">
              <input type="checkbox" id="toggleAutoRef" ${state.showAutoRefract ? 'checked' : ''} style="accent-color:var(--accent-primary)" />
              <span>Ghi nhận kết quả máy đo khúc xạ tự động (Autorefractometer · Khách quan)</span>
            </label>
            ${state.showAutoRefract ? `<button type="button" class="btn btn-xs" id="copyAutoToFinalBtn">Chép sang Toa kê cuối ↓</button>` : ''}
          </div>
          ${state.showAutoRefract ? `
            <div class="form-grid-2" style="margin-top:10px">
              <div class="muted-xs mono" style="background:#fff;padding:7px 10px;border-radius:6px;border:1px solid var(--border-subtle)">
                <strong>OD (Máy):</strong> SPH ${fmtDiopter(d.auto.odSph)} · CYL ${fmtDiopter(d.auto.odCyl)} · AXIS ${d.auto.odAxis ?? '—'}°
              </div>
              <div class="muted-xs mono" style="background:#fff;padding:7px 10px;border-radius:6px;border:1px solid var(--border-subtle)">
                <strong>OS (Máy):</strong> SPH ${fmtDiopter(d.auto.osSph)} · CYL ${fmtDiopter(d.auto.osCyl)} · AXIS ${d.auto.osAxis ?? '—'}°
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Final Prescription Table -->
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:6px">
            <strong style="font-size:13px">Toa kính kê cuối cùng (Final Prescription · bước nhảy 0.25 D)</strong>
            <span class="muted-xs">Xanh dương = Cận (−) · Hổ phách = Viễn (+) · Trục 1°–180° chỉ mở khi có CYL</span>
          </div>
          <div class="rx-table-wrap">
            <table class="rx-table">
              <thead>
                <tr>
                  <th style="text-align:left;padding-left:10px">Mắt</th>
                  <th>SPH (Cầu)</th>
                  <th>CYL (Loạn)</th>
                  <th>AXIS (1°–180°)</th>
                  <th>ADD (+Lão)</th>
                  <th>PRISM / BASE</th>
                  <th>VA K.Kính</th>
                  <th>VA C.Kính</th>
                </tr>
              </thead>
              <tbody>
                ${['od', 'os'].map((eye) => {
                  const e = d[eye];
                  const hasCyl = e.cyl !== null && e.cyl !== 0;
                  const axisErr = hasCyl && (e.axis === null || e.axis < 1 || e.axis > 180);
                  return `<tr>
                    <td class="eye-cell"><strong>${eye === 'od' ? 'OD (Phải)' : 'OS (Trái)'}</strong></td>
                    <td>${renderStepper(eye, 'sph', e.sph, -25, 20)}</td>
                    <td>${renderStepper(eye, 'cyl', e.cyl, -10, 10)}</td>
                    <td>
                      <input type="number" min="1" max="180" step="1"
                        class="rx-mini-inp ${axisErr ? 'is-err' : ''}"
                        data-rxinp="${eye}:axis"
                        value="${e.axis ?? ''}"
                        placeholder="${hasCyl ? '1–180' : '—'}"
                        ${hasCyl ? '' : 'disabled'} />
                    </td>
                    <td>${renderStepper(eye, 'add', e.add, 0.5, 4)}</td>
                    <td>
                      <div class="prism-pair">
                        <input class="rx-mini-inp" style="width:48px" data-rxinp="${eye}:prism" value="${esc(e.prism || '')}" placeholder="0.0" />
                        <select class="rx-mini-sel" data-rxinp="${eye}:base">
                          ${PRISM_BASES.map((b) => `<option value="${b}" ${e.base === b ? 'selected' : ''}>${b || '—'}</option>`).join('')}
                        </select>
                      </div>
                    </td>
                    <td>
                      <select class="rx-mini-sel" data-rxinp="${eye}:ucva">
                        ${VA_OPTIONS.map((v) => `<option value="${v}" ${e.ucva === v ? 'selected' : ''}>${v}</option>`).join('')}
                      </select>
                    </td>
                    <td>
                      <select class="rx-mini-sel" data-rxinp="${eye}:bcva">
                        ${VA_OPTIONS.map((v) => `<option value="${v}" ${e.bcva === v ? 'selected' : ''}>${v}</option>`).join('')}
                      </select>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        ${errors.length > 0 ? `<div class="validation-alert">${errors.map((err) => `<div>• ${esc(err)}</div>`).join('')}</div>` : ''}

        <!-- PD & Fitting Height -->
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px">
            <strong style="font-size:12.5px">Khoảng cách đồng tử (PD) &amp; Chiều cao tâm kính</strong>
            <div class="pill-group">
              <button type="button" class="pill ${state.pdMode === 'MONO' ? 'active' : ''}" data-pdmode="MONO">PD từng mắt (OD / OS)</button>
              <button type="button" class="pill ${state.pdMode === 'BINO' ? 'active' : ''}" data-pdmode="BINO">PD tổng 2 mắt</button>
            </div>
          </div>
          <div class="form-grid-4">
            ${state.pdMode === 'MONO' ? `
              <div class="field">
                <label>PD Mắt phải OD (mm)</label>
                <input id="inpPdOd" type="number" step="0.5" min="20" max="42" class="input mono" value="${d.pdOd}" />
              </div>
              <div class="field">
                <label>PD Mắt trái OS (mm)</label>
                <input id="inpPdOs" type="number" step="0.5" min="20" max="42" class="input mono" value="${d.pdOs}" />
              </div>
            ` : `
              <div class="field" style="grid-column: span 2">
                <label>PD tổng nhìn xa (mm)</label>
                <input id="inpPdTotal" type="number" step="0.5" min="45" max="80" class="input mono" value="${d.pdTotal}" />
              </div>
            `}
            <div class="field">
              <label>PD nhìn gần (mm)</label>
              <input id="inpPdNear" type="number" step="0.5" min="42" max="76" class="input mono" value="${d.pdNear}" />
            </div>
            <div class="field">
              <label>Fitting Height (mm)</label>
              <input id="inpFitting" type="number" step="0.5" min="12" max="32" class="input mono" value="${d.fittingHeight}" />
            </div>
          </div>
          ${state.pdMode === 'MONO' ? `<div class="muted-xs mono" style="margin-top:5px">PD tổng tự tính: <strong>${(Number(d.pdOd || 0) + Number(d.pdOs || 0)).toFixed(1)} mm</strong></div>` : ''}
        </div>

        <!-- Smart Lens Suggestion -->
        <div class="smart-suggest-box">
          <span><strong>Gợi ý phôi tròng (${sug.idx}):</strong> ${sug.msg}</span>
        </div>

        <div class="form-grid-2">
          <div class="field">
            <label>Cấu hình phôi tròng đề xuất cho Lab</label>
            <select id="inpLens" class="select">
              ${LENS_CATALOG.map((l) => `<option value="${l.id}" ${d.lensId === l.id ? 'selected' : ''}>${esc(l.name)}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label>Tóm tắt váng phủ / Yêu cầu gia công</label>
            <input id="inpCoating" class="input" value="${esc(d.coatingNote)}" />
          </div>
        </div>

        <div class="field">
          <label>Ghi chú lâm sàng &amp; Hướng dẫn thích nghi</label>
          <textarea id="inpNote" class="textarea" rows="2">${esc(d.clinicalNote)}</textarea>
        </div>

        <div style="display:flex;justify-content:flex-end;gap:8px">
          <button type="button" class="btn btn-primary" id="saveExamBtn" ${errors.length > 0 ? 'disabled' : ''}>
            Lưu phiếu đo mắt &amp; Chuyển sang POS / Lab
          </button>
        </div>
      </div>
    `;
    bindFormEvents();
  }

  function bindFormEvents() {
    const d = state.draft;
    document.getElementById('inpSource').onchange = (e) => { d.sourceType = e.target.value; renderForm(); };
    document.getElementById('inpPurpose').onchange = (e) => {
      d.purpose = e.target.value;
      if ((d.purpose === 'PROGRESSIVE' || d.purpose === 'BIFOCAL') && d.od.add === null) {
        d.od.add = 1.50; d.os.add = 1.50;
      }
      renderForm();
    };
    document.getElementById('inpOptom').oninput = (e) => { d.optometrist = e.target.value; };
    const clinic = document.getElementById('inpClinic');
    if (clinic) clinic.oninput = (e) => { d.externalClinic = e.target.value; };

    document.getElementById('toggleAutoRef').onchange = (e) => { state.showAutoRefract = e.target.checked; renderForm(); };
    const copyBtn = document.getElementById('copyAutoToFinalBtn');
    if (copyBtn) {
      copyBtn.onclick = () => {
        d.od.sph = d.auto.odSph; d.od.cyl = d.auto.odCyl; d.od.axis = d.auto.odAxis;
        d.os.sph = d.auto.osSph; d.os.cyl = d.auto.osCyl; d.os.axis = d.auto.osAxis;
        renderForm();
        showToast('Đã chép kết quả đo máy sang Toa kê cuối để KTV tinh chỉnh.');
      };
    }

    document.querySelectorAll('[data-step]').forEach((btn) => {
      btn.onclick = () => {
        const [eye, field, deltaStr] = btn.dataset.step.split(':');
        const delta = Number(deltaStr);
        let cur = d[eye][field];
        if (cur === null || cur === undefined) cur = field === 'add' ? 0.75 : 0;
        else cur = roundQuarter(cur + delta);
        if (field === 'sph') cur = Math.max(-25, Math.min(20, cur));
        if (field === 'cyl') cur = Math.max(-10, Math.min(10, cur));
        if (field === 'add') cur = cur < 0.5 ? null : Math.min(4, cur);
        d[eye][field] = cur;
        if (field === 'cyl' && (cur === 0 || cur === null)) d[eye].axis = null;
        renderForm();
      };
    });

    document.querySelectorAll('[data-rxinp]').forEach((el) => {
      el.onchange = (e) => {
        const [eye, field] = el.dataset.rxinp.split(':');
        const raw = e.target.value.trim();
        if (['prism', 'base', 'ucva', 'bcva'].includes(field)) {
          d[eye][field] = raw;
        } else if (field === 'axis') {
          d[eye].axis = raw === '' ? null : Number(raw);
        } else {
          d[eye][field] = raw === '' ? null : roundQuarter(Number(raw));
          if (field === 'cyl' && (d[eye].cyl === 0 || d[eye].cyl === null)) d[eye].axis = null;
        }
        renderForm();
      };
    });

    document.querySelectorAll('[data-pdmode]').forEach((b) => {
      b.onclick = () => { state.pdMode = b.dataset.pdmode; renderForm(); };
    });
    const pdOd = document.getElementById('inpPdOd');
    if (pdOd) pdOd.oninput = (e) => { d.pdOd = Number(e.target.value) || 0; d.pdTotal = d.pdOd + d.pdOs; renderForm(); };
    const pdOs = document.getElementById('inpPdOs');
    if (pdOs) pdOs.oninput = (e) => { d.pdOs = Number(e.target.value) || 0; d.pdTotal = d.pdOd + d.pdOs; renderForm(); };
    const pdTot = document.getElementById('inpPdTotal');
    if (pdTot) pdTot.oninput = (e) => { d.pdTotal = Number(e.target.value) || 0; d.pdOd = d.pdTotal / 2; d.pdOs = d.pdTotal / 2; };
    document.getElementById('inpPdNear').oninput = (e) => { d.pdNear = Number(e.target.value) || 0; };
    document.getElementById('inpFitting').oninput = (e) => { d.fittingHeight = Number(e.target.value) || 0; };
    document.getElementById('inpLens').onchange = (e) => {
      d.lensId = e.target.value;
      const lens = LENS_CATALOG.find((l) => l.id === d.lensId);
      if (lens) d.coatingNote = lens.coating;
      renderForm();
    };
    document.getElementById('inpCoating').oninput = (e) => { d.coatingNote = e.target.value; };
    document.getElementById('inpNote').oninput = (e) => { d.clinicalNote = e.target.value; };

    document.getElementById('saveExamBtn').onclick = () => {
      const errs = validateDraft(d);
      if (errs.length > 0) return;
      state.examinations.unshift({
        id: 'EX-2611-' + String(state.examinations.length + 1).padStart(2, '0'),
        customerId: state.selectedCustomerId,
        date: '2026-11-23',
        sourceType: d.sourceType,
        optometrist: d.sourceType === 'EXTERNAL_RX' ? (d.externalClinic || d.optometrist) : d.optometrist,
        purpose: d.purpose,
        od: { ...d.od },
        os: { ...d.os },
        pdOd: d.pdOd, pdOs: d.pdOs, pdTotal: d.pdTotal, fittingHeight: d.fittingHeight,
        note: d.clinicalNote
      });
      renderRightCol();
      showToast('Đã lưu phiếu đo mắt & Toa kính mới vào hồ sơ khách hàng!');
    };
  }

  function renderEvolutionChart(exams) {
    const sorted = [...exams].sort((a, b) => a.date.localeCompare(b.date));
    const W = 460, H = 190, padL = 44, padR = 20, padT = 20, padB = 30;
    const allSph = sorted.flatMap((e) => [e.od.sph ?? 0, e.os.sph ?? 0]);
    const minVal = Math.min(-1, ...allSph) - 0.75;
    const maxVal = Math.max(1, ...allSph) + 0.75;
    const yOf = (v) => padT + ((maxVal - v) / (maxVal - minVal)) * (H - padT - padB);
    const xOf = (i) => sorted.length === 1 ? (padL + W - padR) / 2 : padL + (i / (sorted.length - 1)) * (W - padL - padR);
    const zeroY = yOf(0);

    const odPts = sorted.map((e, i) => `${xOf(i)},${yOf(e.od.sph ?? 0)}`).join(' ');
    const osPts = sorted.map((e, i) => `${xOf(i)},${yOf(e.os.sph ?? 0)}`).join(' ');

    return `
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block">
        <rect x="${padL}" y="${padT}" width="${W - padL - padR}" height="${Math.max(0, zeroY - padT)}" fill="#FFFBEB" opacity="0.65"/>
        <rect x="${padL}" y="${zeroY}" width="${W - padL - padR}" height="${Math.max(0, H - padB - zeroY)}" fill="#EFF6FF" opacity="0.65"/>
        <line x1="${padL}" y1="${zeroY}" x2="${W - padR}" y2="${zeroY}" stroke="#9CA3AF" stroke-dasharray="4 3" stroke-width="1.2"/>
        <text x="${padL - 6}" y="${zeroY + 4}" text-anchor="end" font-size="10" font-family="monospace" fill="#6B7280">0.00</text>
        <text x="${W - padR - 4}" y="${padT + 12}" text-anchor="end" font-size="10" fill="#B45309" font-weight="600">Viễn (+)</text>
        <text x="${W - padR - 4}" y="${H - padB - 5}" text-anchor="end" font-size="10" fill="#1D4ED8" font-weight="600">Cận (−)</text>

        ${sorted.length > 1 ? `<polyline fill="none" stroke="#0F766E" stroke-width="2.2" points="${odPts}"/>` : ''}
        ${sorted.length > 1 ? `<polyline fill="none" stroke="#EA580C" stroke-width="2.2" stroke-dasharray="5 3" points="${osPts}"/>` : ''}

        ${sorted.map((e, i) => `
          <circle cx="${xOf(i)}" cy="${yOf(e.od.sph ?? 0)}" r="4.5" fill="#0F766E"/>
          <circle cx="${xOf(i)}" cy="${yOf(e.os.sph ?? 0)}" r="4.5" fill="#EA580C"/>
          <text x="${xOf(i)}" y="${H - 10}" text-anchor="middle" font-size="10" font-family="monospace" fill="#4B5563">${e.date.slice(0, 7)}</text>
        `).join('')}
      </svg>
      <div style="display:flex;gap:14px;justify-content:center;font-size:11.5px;margin-top:4px">
        <span><strong style="color:#0F766E">● OD (Mắt phải)</strong></span>
        <span><strong style="color:#EA580C">● OS (Mắt trái)</strong></span>
        <span class="muted-xs">Đơn vị: Diopter (SPH)</span>
      </div>
    `;
  }

  function renderRightCol() {
    const exams = state.examinations.filter((e) => e.customerId === state.selectedCustomerId);
    const cust = state.customers.find((c) => c.id === state.selectedCustomerId);

    document.getElementById('chartPanel').innerHTML = `
      <div class="panel-head">
        <h2 class="panel-title">Diễn tiến độ cầu (Cận / Viễn) — ${esc(cust.name)}</h2>
        <span class="badge badge-neutral">${exams.length} lần đo</span>
      </div>
      <div class="panel-body">
        ${exams.length > 0 ? renderEvolutionChart(exams) : '<div class="muted-xs">Chưa có lịch sử đo mắt.</div>'}
      </div>
    `;

    document.getElementById('historyPanel').innerHTML = `
      <div class="panel-head">
        <h2 class="panel-title">Lịch sử Toa kính trước đó</h2>
      </div>
      <div class="panel-body">
        ${exams.map((ex) => `
          <div class="hist-card">
            <div class="hist-head">
              <strong class="mono">${ex.date}</strong>
              <span class="badge badge-neutral">${esc(ex.optometrist)}</span>
              <span class="badge badge-teal">${USAGE_PURPOSES.find((u) => u.id === ex.purpose)?.label.split(' (')[0] || ex.purpose}</span>
            </div>
            <table class="hist-mini-table mono">
              <thead><tr><th>Mắt</th><th>SPH</th><th>CYL</th><th>AXIS</th><th>ADD</th><th>PRISM</th><th>BCVA</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>OD</strong></td>
                  <td>${fmtDiopter(ex.od.sph)}</td>
                  <td>${fmtDiopter(ex.od.cyl)}</td>
                  <td>${ex.od.axis ? ex.od.axis + '°' : '—'}</td>
                  <td>${fmtDiopter(ex.od.add)}</td>
                  <td>${ex.od.prism ? ex.od.prism + 'Δ ' + ex.od.base : '—'}</td>
                  <td>${ex.od.bcva || '—'}</td>
                </tr>
                <tr>
                  <td><strong>OS</strong></td>
                  <td>${fmtDiopter(ex.os.sph)}</td>
                  <td>${fmtDiopter(ex.os.cyl)}</td>
                  <td>${ex.os.axis ? ex.os.axis + '°' : '—'}</td>
                  <td>${fmtDiopter(ex.os.add)}</td>
                  <td>${ex.os.prism ? ex.os.prism + 'Δ ' + ex.os.base : '—'}</td>
                  <td>${ex.os.bcva || '—'}</td>
                </tr>
              </tbody>
            </table>
            <div class="muted-xs" style="margin-top:6px">PD: <strong class="mono">${ex.pdOd}/${ex.pdOs} (${ex.pdTotal}mm)</strong> · Fit: <strong class="mono">${ex.fittingHeight}mm</strong> — ${esc(ex.note)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function switchCustomer(cid) {
    state.selectedCustomerId = cid;
    state.draft = makeDraftForCustomer(cid);
    renderTopSelectors();
    renderForm();
    renderRightCol();
  }

  document.getElementById('customerSelect').onchange = (e) => switchCustomer(e.target.value);
  document.querySelectorAll('#quickCasePills .pill').forEach((b) => {
    b.onclick = () => switchCustomer(b.dataset.case);
  });

  renderTopSelectors();
  renderForm();
  renderRightCol();
})();
