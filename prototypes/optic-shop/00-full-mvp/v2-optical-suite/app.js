(() => {
  const STORAGE_KEY = 'optic_shop_p00a_mvp_v2';

  // ==================== SVG ICONS (LUCIDE STYLE) ====================
  const ICONS = {
    dashboard: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    pos: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
    orders: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    lab: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    customers: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    exam: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    products: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    inventory: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"/><path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"/><path d="M3 10h18"/></svg>',
    appointments: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    warranty: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    crm: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    grid: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    list: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>'
  };

  const STAGE_META = {
    CONFIRMED:   { label: '1. Chờ chuẩn bị', badge: 'badge-neutral' },
    PREP:        { label: '2. Chuẩn bị phôi', badge: 'badge-info' },
    CUT_MOUNT:   { label: '3. Cắt mài & Lắp', badge: 'badge-warn' },
    QC:          { label: '4. Kiểm tra QC', badge: 'badge-teal' },
    READY:       { label: '5. Sẵn sàng giao', badge: 'badge-ok' },
    HANDED_OVER: { label: 'Đã bàn giao', badge: 'badge-ok' }
  };
  const STAGE_ORDER = ['CONFIRMED', 'PREP', 'CUT_MOUNT', 'QC', 'READY', 'HANDED_OVER'];

  const CATEGORY_LABEL = {
    FRAME: 'Gọng kính',
    SUNGLASSES: 'Kính mát',
    LENS_BLANK: 'Phôi tròng',
    ACCESSORY: 'Phụ kiện',
    CONSUMABLE: 'Vật tư tiêu hao',
    SERVICE: 'Dịch vụ'
  };

  // ==================== STATE & UI FILTERS ====================
  let state = loadState();
  let ui = {
    posSearch: '', posCat: 'ALL', posBrand: 'ALL', posViewMode: 'grid', posPage: 1,
    posCustomerId: 'CUS-001', posCart: [], posDiscountPct: 0, posExamId: '', posCash: 0, posTransfer: 0, posTransferOk: false,
    orderSearch: '', orderStatus: 'ALL', orderPage: 1,
    prodSearch: '', prodCat: 'ALL', prodStock: 'ALL', prodPage: 1,
    custSearch: '', custTier: 'ALL', custPage: 1,
    examCustId: 'CUS-001', examSearch: '', examUploadUrl: '',
    labSearch: '', labTech: 'ALL',
    wrtSearch: '', wrtStatus: 'ALL',
    aptSearch: '', aptType: 'ALL',
    pubSearch: '', pubCat: 'ALL', pubFace: 'ALL', pubPage: 1,
    tryonFace: 'oval', tryonProductId: 'PRD-01', tryonScale: 100, tryonTop: 42, tryonCameraStream: null,
    aiOpen: false,
    aiMessages: [
      { from: 'bot', text: 'Xin chào! Tôi là Trợ lý AI Quang học Minh Quang. Bạn có thể hỏi về dáng kính hợp khuôn mặt, chỉ số SPH/CYL/AXIS/PD, hoặc nhờ tôi tìm mẫu kính theo ngân sách.' }
    ]
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return window.OPTIC_V2_SEED();
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateHeaderBadges();
  }

  function resetState() {
    stopTryonCamera();
    state = window.OPTIC_V2_SEED();
    ui.posCart = [];
    saveState();
    renderAll();
    toast('Đã khôi phục toàn bộ dữ liệu mẫu ban đầu.');
  }

  // ==================== HELPERS ====================
  const fmtVnd = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(n || 0)) + 'đ';
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
  const nowStr = () => {
    const d = new Date();
    const p = (x) => String(x).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  };
  const todayStr = () => nowStr().slice(0, 10);
  const getCustomer = (id) => state.customers.find((c) => c.id === id);
  const getProduct = (id) => state.products.find((p) => p.id === id);

  function paginate(arr, page, perPage) {
    const totalPages = Math.max(1, Math.ceil(arr.length / perPage));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * perPage;
    return { items: arr.slice(start, start + perPage), page: safePage, totalPages, total: arr.length, start: start + 1, end: Math.min(arr.length, start + perPage) };
  }

  function renderPaginationBar(pg, attrName) {
    if (pg.total === 0) return '';
    return `
      <div class="pagination-bar">
        <span>Hiển thị <strong>${pg.start}–${pg.end}</strong> trên tổng <strong>${pg.total}</strong> bản ghi</span>
        <div class="page-btns">
          <button class="page-btn" ${pg.page <= 1 ? 'disabled' : ''} data-${attrName}="${pg.page - 1}">‹</button>
          ${Array.from({ length: pg.totalPages }, (_, i) => i + 1).map((p) => `
            <button class="page-btn ${p === pg.page ? 'active' : ''}" data-${attrName}="${p}">${p}</button>
          `).join('')}
          <button class="page-btn" ${pg.page >= pg.totalPages ? 'disabled' : ''} data-${attrName}="${pg.page + 1}">›</button>
        </div>
      </div>
    `;
  }

  function toast(msg) {
    const c = document.getElementById('toastContainer');
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    c.appendChild(el);
    setTimeout(() => el.remove(), 3400);
  }

  function pushZalo(customerName, phone, event, message, customerObj) {
    const linked = customerObj ? (customerObj.zaloLinked && customerObj.zaloConsent) : true;
    state.zaloOutbox.unshift({
      id: 'ZLO-' + String(state.zaloOutbox.length + 1).padStart(3, '0'),
      time: nowStr(), customerName, phone, event,
      status: linked ? 'DELIVERED' : 'FAILED_NO_LINK',
      message: linked ? message : `${message} (Khách chưa liên kết Zalo OA)`
    });
  }

  function logInventory(productId, type, qty, ref, note) {
    const p = getProduct(productId);
    if (p && p.trackStock) p.stock = Math.max(0, (p.stock || 0) + qty);
    state.inventoryTransactions.unshift({
      id: 'INV-' + String(state.inventoryTransactions.length + 1).padStart(3, '0'),
      date: nowStr(), productId, type, qty, ref, note
    });
  }

  // ==================== VECTOR GLASSES & MYOPIA CHART RENDERERS ====================
  function renderGlassesSVG(shape, color = '#1F2937', angle = 'front', width = 128) {
    const strokeW = shape === 'rimless' ? 1.5 : (shape === 'round' ? 2.4 : 3.2);
    const fillLens = shape === 'aviator' ? 'rgba(30,41,59,0.28)' : 'rgba(15,118,110,0.06)';

    if (shape === 'lens') {
      return `<svg width="${width}" height="68" viewBox="0 0 140 70"><circle cx="70" cy="35" r="28" fill="rgba(15,118,110,0.1)" stroke="${color}" stroke-width="2"/><path d="M52 24 Q70 15 88 26" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/><text x="70" y="39" text-anchor="middle" font-size="10" font-family="JetBrains Mono" fill="${color}">OPTIC LENS</text></svg>`;
    }
    if (shape === 'acc') {
      return `<svg width="${width}" height="68" viewBox="0 0 140 70"><rect x="26" y="18" width="88" height="34" rx="10" fill="rgba(100,116,139,0.12)" stroke="${color}" stroke-width="2"/><line x1="26" y1="35" x2="114" y2="35" stroke="${color}" stroke-width="1.2" stroke-dasharray="4 3"/></svg>`;
    }
    if (angle === 'side') {
      return `<svg width="${width}" height="68" viewBox="0 0 180 70"><path d="M22 30 L132 30 Q152 30 158 48" fill="none" stroke="${color}" stroke-width="${strokeW + 0.5}" stroke-linecap="round"/><rect x="18" y="20" width="12" height="26" rx="4" fill="${fillLens}" stroke="${color}" stroke-width="2.2"/><circle cx="38" cy="30" r="2.2" fill="${color}"/><text x="90" y="60" text-anchor="middle" font-size="10" font-family="JetBrains Mono" fill="#64748B">Góc ngang càng kính (145mm)</text></svg>`;
    }
    if (angle === '45deg') {
      return `<svg width="${width}" height="68" viewBox="0 0 180 70"><path d="M24 26 L56 16" stroke="${color}" stroke-width="2.4"/><path d="M138 26 L165 18" stroke="${color}" stroke-width="2.4"/><ellipse cx="62" cy="36" rx="22" ry="16" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><ellipse cx="116" cy="36" rx="24" ry="17" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><path d="M84 34 Q90 29 92 34" fill="none" stroke="${color}" stroke-width="2.5"/></svg>`;
    }
    if (angle === 'dims') {
      return `<svg width="${width}" height="74" viewBox="0 0 180 78"><rect x="24" y="18" width="52" height="32" rx="10" fill="${fillLens}" stroke="${color}" stroke-width="2.4"/><rect x="104" y="18" width="52" height="32" rx="10" fill="${fillLens}" stroke="${color}" stroke-width="2.4"/><path d="M76 30 Q90 24 104 30" fill="none" stroke="${color}" stroke-width="2.4"/><line x1="24" y1="60" x2="76" y2="60" stroke="#0F766E" stroke-width="1.3"/><text x="50" y="72" text-anchor="middle" font-size="9.5" font-family="JetBrains Mono" fill="#0F766E">Mắt 50mm</text><line x1="78" y1="60" x2="102" y2="60" stroke="#D97706" stroke-width="1.3"/><text x="90" y="72" text-anchor="middle" font-size="9.5" font-family="JetBrains Mono" fill="#D97706">Cầu 19</text></svg>`;
    }

    // Front view by shape
    if (shape === 'round') {
      return `<svg width="${width}" height="64" viewBox="0 0 180 68"><circle cx="56" cy="35" r="22" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><circle cx="124" cy="35" r="22" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><path d="M78 33 Q90 26 102 33" fill="none" stroke="${color}" stroke-width="2.2"/><line x1="24" y1="32" x2="34" y2="32" stroke="${color}" stroke-width="2.5"/><line x1="146" y1="32" x2="156" y2="32" stroke="${color}" stroke-width="2.5"/></svg>`;
    }
    if (shape === 'cateye') {
      return `<svg width="${width}" height="64" viewBox="0 0 180 68"><path d="M28 22 L76 28 Q78 52 54 52 Q32 52 28 22 Z" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><path d="M152 22 L104 28 Q102 52 126 52 Q148 52 152 22 Z" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><path d="M76 30 Q90 25 104 30" fill="none" stroke="${color}" stroke-width="2.5"/></svg>`;
    }
    if (shape === 'aviator') {
      return `<svg width="${width}" height="64" viewBox="0 0 180 68"><path d="M30 22 H78 Q80 54 54 54 Q30 50 30 22 Z" fill="${fillLens}" stroke="${color}" stroke-width="2.2"/><path d="M102 22 H150 Q150 50 126 54 Q100 54 102 22 Z" fill="${fillLens}" stroke="${color}" stroke-width="2.2"/><line x1="76" y1="22" x2="104" y2="22" stroke="${color}" stroke-width="2"/><path d="M78 30 Q90 26 102 30" fill="none" stroke="${color}" stroke-width="2"/></svg>`;
    }
    return `<svg width="${width}" height="64" viewBox="0 0 180 68"><rect x="30" y="17" width="48" height="35" rx="8" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><rect x="102" y="17" width="48" height="35" rx="8" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><path d="M78 30 Q90 25 102 30" fill="none" stroke="${color}" stroke-width="2.6"/><line x1="20" y1="26" x2="30" y2="26" stroke="${color}" stroke-width="2.6"/><line x1="150" y1="26" x2="160" y2="26" stroke="${color}" stroke-width="2.6"/></svg>`;
  }

  function renderMyopiaChartSVG(exams) {
    const sorted = [...exams].sort((a, b) => a.date.localeCompare(b.date));
    if (sorted.length === 0) return '<div class="muted-xs" style="padding:18px;text-align:center">Chưa có dữ liệu đo mắt để vẽ biểu đồ.</div>';
    const W = 460, H = 175, padL = 42, padR = 20, padT = 18, padB = 30;
    const vals = sorted.flatMap((e) => [Math.abs(parseFloat(e.prescription.od.sph) || 0), Math.abs(parseFloat(e.prescription.os.sph) || 0)]);
    const maxV = Math.max(4, Math.ceil(Math.max(...vals) + 0.5));
    const xAt = (i) => sorted.length === 1 ? W / 2 : padL + (i / (sorted.length - 1)) * (W - padL - padR);
    const yAt = (v) => padT + ((maxV - v) / maxV) * (H - padT - padB);

    const odPts = sorted.map((e, i) => `${xAt(i)},${yAt(Math.abs(parseFloat(e.prescription.od.sph) || 0))}`).join(' ');
    const osPts = sorted.map((e, i) => `${xAt(i)},${yAt(Math.abs(parseFloat(e.prescription.os.sph) || 0))}`).join(' ');

    return `
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block">
        ${[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const v = (maxV * t).toFixed(1);
          const y = yAt(maxV * t);
          return `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#E5EBEB" stroke-dasharray="3 3"/><text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="10" font-family="JetBrains Mono" fill="#768784">-${v}D</text>`;
        }).join('')}
        ${sorted.length > 1 ? `<polyline fill="none" stroke="#0F766E" stroke-width="2.5" points="${odPts}"/>` : ''}
        ${sorted.length > 1 ? `<polyline fill="none" stroke="#2563EB" stroke-width="2.5" stroke-dasharray="5 3" points="${osPts}"/>` : ''}
        ${sorted.map((e, i) => {
          const x = xAt(i);
          const odV = Math.abs(parseFloat(e.prescription.od.sph) || 0);
          const osV = Math.abs(parseFloat(e.prescription.os.sph) || 0);
          return `
            <circle cx="${x}" cy="${yAt(odV)}" r="4.2" fill="#0F766E" stroke="#FFF" stroke-width="1.5"/>
            <circle cx="${x}" cy="${yAt(osV)}" r="4.2" fill="#2563EB" stroke="#FFF" stroke-width="1.5"/>
            <text x="${x}" y="${H - 8}" text-anchor="middle" font-size="10" font-family="JetBrains Mono" fill="#4B5B58">${e.date.slice(0, 7)}</text>
          `;
        }).join('')}
      </svg>
      <div style="display:flex;gap:14px;font-size:11.5px;margin-top:4px;color:var(--text-secondary)">
        <span><span style="display:inline-block;width:10px;height:3px;background:#0F766E;vertical-align:middle;margin-right:5px"></span>Mắt Phải (OD)</span>
        <span><span style="display:inline-block;width:10px;height:3px;background:#2563EB;vertical-align:middle;margin-right:5px"></span>Mắt Trái (OS)</span>
      </div>
    `;
  }

  // ==================== DRAWER & MODAL ====================
  function openDrawer(eyebrow, title, html) {
    document.getElementById('drawerEyebrow').textContent = eyebrow;
    document.getElementById('drawerTitle').textContent = title;
    document.getElementById('drawerBody').innerHTML = html;
    document.getElementById('drawerBackdrop').classList.remove('hidden');
    document.getElementById('sideDrawer').classList.remove('hidden');
  }
  function closeDrawer() {
    document.getElementById('drawerBackdrop').classList.add('hidden');
    document.getElementById('sideDrawer').classList.add('hidden');
  }
  function openModal(title, html) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('modalBackdrop').classList.remove('hidden');
  }
  function closeModal() {
    document.getElementById('modalBackdrop').classList.add('hidden');
  }

  // ==================== SIDEBAR & ROLE-BASED NAVIGATION ====================
  function renderSidebar() {
    const lowStock = state.products.filter((p) => p.trackStock && p.stock <= p.minStock).length;
    const activeLab = state.productionJobs.filter((j) => j.stage !== 'HANDED_OVER').length;
    const pendingApt = state.appointments.filter((a) => a.status === 'PENDING').length;

    const groups = [
      {
        label: '', items: [
          { id: 'dashboard', name: 'Tổng quan', icon: ICONS.dashboard, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'OPTOMETRIST', 'LAB_TECHNICIAN'] }
        ]
      },
      {
        label: 'BÁN HÀNG', items: [
          { id: 'pos', name: 'POS bán hàng', icon: ICONS.pos, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'OPTOMETRIST'] },
          { id: 'orders', name: 'Đơn hàng', icon: ICONS.orders, badge: state.orders.length, roles: ['OWNER_ADMIN', 'SALES_CASHIER'] }
        ]
      },
      {
        label: 'VẬN HÀNH KÍNH', items: [
          { id: 'exam', name: 'Đo mắt & Toa kính', icon: ICONS.exam, roles: ['OWNER_ADMIN', 'OPTOMETRIST', 'SALES_CASHIER'] },
          { id: 'lab', name: 'Sản xuất Lab & QC', icon: ICONS.lab, badge: activeLab, roles: ['OWNER_ADMIN', 'LAB_TECHNICIAN', 'OPTOMETRIST'] },
          { id: 'customers', name: 'Khách hàng', icon: ICONS.customers, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'OPTOMETRIST'] }
        ]
      },
      {
        label: 'HÀNG HOÁ', items: [
          { id: 'products', name: 'Sản phẩm & Kho', icon: ICONS.products, badge: lowStock, warn: lowStock > 0, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'LAB_TECHNICIAN'] }
        ]
      },
      {
        label: 'CHĂM SÓC KHÁCH HÀNG', items: [
          { id: 'appointments', name: 'Lịch hẹn & Yêu cầu', icon: ICONS.appointments, badge: pendingApt, warn: pendingApt > 0, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'OPTOMETRIST'] },
          { id: 'warranty', name: 'Bảo hành & Dịch vụ', icon: ICONS.warranty, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'LAB_TECHNICIAN'] },
          { id: 'crm', name: 'CSKH Tự động & Zalo', icon: ICONS.crm, roles: ['OWNER_ADMIN', 'SALES_CASHIER'] }
        ]
      }
    ];

    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = groups.map((g) => {
      const visible = g.items.filter((i) => i.roles.includes(state.role));
      if (!visible.length) return '';
      return `
        ${g.label ? `<div class="sidebar-group-label">${g.label}</div>` : ''}
        ${visible.map((i) => `
          <button class="nav-item ${state.activeStoreView === i.id ? 'active' : ''}" data-view="${i.id}">
            ${i.icon}
            <span>${i.name}</span>
            ${i.badge ? `<span class="nav-badge ${i.warn ? 'warn' : ''}">${i.badge}</span>` : ''}
          </button>
        `).join('')}
      `;
    }).join('');

    nav.querySelectorAll('.nav-item').forEach((b) => b.onclick = () => {
      state.activeStoreView = b.dataset.view;
      state.activeCustomerDetailId = null;
      closeMobileSidebar();
      saveState();
      renderAll();
    });
  }

  function updateHeaderBadges() {
    document.getElementById('zaloCountBadge').textContent = state.zaloOutbox.length;
    const avatarMap = { OWNER_ADMIN: 'Q', SALES_CASHIER: 'T', OPTOMETRIST: 'K', LAB_TECHNICIAN: 'L' };
    document.getElementById('roleAvatar').textContent = avatarMap[state.role] || 'Q';
  }

  function renderAll() {
    updateHeaderBadges();
    const isStore = state.activeSurface === 'store';
    document.getElementById('storeSurface').classList.toggle('hidden', !isStore);
    document.getElementById('publicSurface').classList.toggle('hidden', isStore);
    document.querySelectorAll('.proto-switch-btn').forEach((b) => b.classList.toggle('active', b.dataset.surface === state.activeSurface));
    document.getElementById('roleSelect').value = state.role;

    if (isStore) {
      stopTryonCamera();
      renderSidebar();
      renderStoreView();
    } else {
      document.querySelectorAll('.pub-nav-pill').forEach((b) => b.classList.toggle('active', b.dataset.pubview === state.activePublicView));
      renderPortalCustomerSelect();
      renderPublicView();
      renderAiChatMessages();
    }
  }

  // ==================== STORE VIEWS ====================
  function renderStoreView() {
    const main = document.getElementById('storeMain');
    const crumbs = {
      dashboard: 'Tổng quan cửa hàng',
      pos: 'POS bán hàng',
      orders: 'Quản lý Đơn hàng',
      exam: 'Đo mắt & Toa kính (KTV Khúc xạ)',
      lab: 'Sản xuất Lab & Kiểm tra QC',
      customers: state.activeCustomerDetailId ? 'Hồ sơ khách hàng' : 'Danh sách Khách hàng',
      products: 'Sản phẩm & Kho hàng',
      appointments: 'Lịch hẹn & Yêu cầu Online',
      warranty: 'Bảo hành & Dịch vụ',
      crm: 'Chăm sóc khách hàng Tự động & Zalo OA'
    };
    document.getElementById('headerCrumb').textContent = crumbs[state.activeStoreView] || 'Tổng quan';

    switch (state.activeStoreView) {
      case 'dashboard': renderDashboardView(main); break;
      case 'pos': renderPosView(main); break;
      case 'orders': renderOrdersView(main); break;
      case 'exam': renderExamWorkbenchView(main); break;
      case 'lab': renderLabView(main); break;
      case 'customers':
        if (state.activeCustomerDetailId) renderCustomerDetailView(main, state.activeCustomerDetailId);
        else renderCustomersListView(main);
        break;
      case 'products': renderProductsInventoryView(main); break;
      case 'appointments': renderAppointmentsView(main); break;
      case 'warranty': renderWarrantyView(main); break;
      case 'crm': renderCrmAutomationView(main); break;
    }
  }

  // -------------------- 1. EXECUTIVE / ROLE DASHBOARD --------------------
  function renderDashboardView(container) {
    const rev = state.orders.reduce((s, o) => s + o.total, 0);
    const paid = state.orders.reduce((s, o) => s + o.payments.reduce((ps, p) => ps + p.amount, 0), 0);
    const activeJobs = state.productionJobs.filter((j) => j.stage !== 'HANDED_OVER');
    const lowStock = state.products.filter((p) => p.trackStock && p.stock <= p.minStock);
    const pendingInq = state.appointments.filter((a) => a.status === 'PENDING');

    container.innerHTML = `
      <div class="page-head">
        <div>
          <h1 class="page-title">Tổng quan vận hành hôm nay</h1>
          <p class="page-sub">Cửa hàng Kính Mắt Minh Quang · 148 Xã Đàn · Đang xem với vai trò <strong>${esc(state.role)}</strong></p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn" id="dashGoExam">Mở phòng đo mắt</button>
          <button class="btn btn-primary" id="dashGoPos">+ Bán hàng POS</button>
        </div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Tổng doanh thu đơn</div>
          <div class="kpi-val mono">${fmtVnd(rev)}</div>
          <div class="kpi-sub">Thực thu: <strong class="mono">${fmtVnd(paid)}</strong> · Nợ cọc ${fmtVnd(Math.max(0, rev - paid))}</div>
        </div>
        <div class="kpi-card blue">
          <div class="kpi-label">Phiếu gia công Lab đang chạy</div>
          <div class="kpi-val mono">${activeJobs.length} phiếu</div>
          <div class="kpi-sub">${activeJobs.filter((j) => j.stage === 'READY').length} bộ sẵn sàng bàn giao</div>
        </div>
        <div class="kpi-card slate">
          <div class="kpi-label">Khách hàng &amp; Hồ sơ đo mắt</div>
          <div class="kpi-val mono">${state.customers.length} khách</div>
          <div class="kpi-sub">${state.examinations.length} lượt đo lưu trong Sổ Kính</div>
        </div>
        <div class="kpi-card amber">
          <div class="kpi-label">Cần chú ý ngay</div>
          <div class="kpi-val mono">${lowStock.length + pendingInq.length} mục</div>
          <div class="kpi-sub">${lowStock.length} mã sắp hết / hết · ${pendingInq.length} yêu cầu Online mới</div>
        </div>
      </div>

      <div class="split-2">
        <div class="card">
          <div class="card-head">
            <h2 class="card-title">Hàng đợi Lab &amp; Bàn giao hôm nay</h2>
            <button class="btn btn-xs" id="dashAllLab">Xem bảng Kanban →</button>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead><tr><th>Mã phiếu</th><th>Khách hàng</th><th>Gọng / Tròng</th><th>Trạng thái</th></tr></thead>
              <tbody>
                ${activeJobs.map((j) => {
                  const c = getCustomer(j.customerId);
                  return `<tr class="clickable" data-dashjob="${j.id}">
                    <td class="mono" style="font-weight:600">${j.id}</td>
                    <td><strong>${esc(c ? c.name : '')}</strong></td>
                    <td><div style="font-size:12.5px">${esc(j.frameName)}</div><div class="muted-xs">${esc(j.lensConfigSummary)}</div></td>
                    <td><span class="badge ${STAGE_META[j.stage].badge}">${STAGE_META[j.stage].label}</span></td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="card-head">
            <h2 class="card-title">Cảnh báo tồn kho &amp; Yêu cầu mới</h2>
            <button class="btn btn-xs" id="dashAllProd">Quản lý kho →</button>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
            ${pendingInq.map((a) => `
              <div style="padding:10px;border:1px solid #BFDBFE;background:#EFF6FF;border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:8px">
                <div>
                  <span class="badge badge-info">Yêu cầu Online</span>
                  <div style="font-weight:600;margin-top:3px">${esc(a.customerName)} (${esc(a.phone)})</div>
                  <div class="muted-xs">${esc(a.productRef)}</div>
                </div>
                <button class="btn btn-xs btn-primary" data-dashapt="1">Xử lý</button>
              </div>
            `).join('')}
            ${lowStock.slice(0, 4).map((p) => `
              <div style="padding:9px 10px;border:1px solid var(--border-subtle);border-radius:8px;display:flex;justify-content:space-between;align-items:center">
                <div>
                  <strong style="font-size:13px">${esc(p.name)}</strong>
                  <div class="muted-xs mono">${p.sku} · Ngưỡng tối thiểu: ${p.minStock}</div>
                </div>
                <span class="badge ${p.stock === 0 ? 'badge-err' : 'badge-warn'}">Tồn: ${p.stock}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    document.getElementById('dashGoPos').onclick = () => { state.activeStoreView = 'pos'; saveState(); renderAll(); };
    document.getElementById('dashGoExam').onclick = () => { state.activeStoreView = 'exam'; saveState(); renderAll(); };
    document.getElementById('dashAllLab').onclick = () => { state.activeStoreView = 'lab'; saveState(); renderAll(); };
    document.getElementById('dashAllProd').onclick = () => { state.activeStoreView = 'products'; saveState(); renderAll(); };
    container.querySelectorAll('[data-dashjob]').forEach((tr) => tr.onclick = () => openLabJobDrawer(tr.dataset.dashjob));
    container.querySelectorAll('[data-dashapt]').forEach((b) => b.onclick = () => { state.activeStoreView = 'appointments'; saveState(); renderAll(); });
  }

  // -------------------- 2. POS (CARD GRID <-> COMPACT LIST / BARCODE + PAGINATION) --------------------
  function renderPosView(container) {
    const customer = getCustomer(ui.posCustomerId) || state.customers[0];
    const custExams = state.examinations.filter((e) => e.customerId === customer.id);
    if (!ui.posExamId && custExams[0]) ui.posExamId = custExams[0].id;

    const brands = [...new Set(state.products.filter((p) => p.category !== 'CONSUMABLE').map((p) => p.brand))];
    const filtered = state.products.filter((p) => {
      if (p.category === 'CONSUMABLE') return false;
      if (ui.posCat !== 'ALL' && p.category !== ui.posCat) return false;
      if (ui.posBrand !== 'ALL' && p.brand !== ui.posBrand) return false;
      if (ui.posSearch) {
        const q = ui.posSearch.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      }
      return true;
    });

    const perPage = ui.posViewMode === 'grid' ? 8 : 12;
    const pg = paginate(filtered, ui.posPage, perPage);
    ui.posPage = pg.page;

    const subtotal = ui.posCart.reduce((s, i) => s + i.price * i.qty, 0);
    const maxDisc = state.role === 'SALES_CASHIER' ? 10 : 50;
    const effDisc = Math.min(ui.posDiscountPct, maxDisc);
    const discAmt = Math.round(subtotal * effDisc / 100);
    const total = Math.max(0, subtotal - discAmt);
    const hasCustom = ui.posCart.some((i) => i.category === 'LENS_BLANK' || i.category === 'FRAME');
    const paidNow = (Number(ui.posCash) || 0) + (ui.posTransferOk ? (Number(ui.posTransfer) || 0) : 0);
    const remaining = Math.max(0, total - paidNow);

    container.innerHTML = `
      <div class="page-head">
        <div>
          <h1 class="page-title">POS Bán hàng tại quầy</h1>
          <p class="page-sub">Hỗ trợ chuyển <strong>Lưới có ảnh</strong> (tư vấn khách) ↔ <strong>Bảng nén / Quét mã vạch</strong> (khi cửa hàng có hàng trăm – nghìn mã SKU)</p>
        </div>
        <div class="view-toggle">
          <button class="${ui.posViewMode === 'grid' ? 'active' : ''}" data-posmode="grid">${ICONS.grid} Lưới tư vấn</button>
          <button class="${ui.posViewMode === 'list' ? 'active' : ''}" data-posmode="list">${ICONS.list} Bảng nén / Barcode</button>
        </div>
      </div>

      <div class="pos-grid">
        <div>
          <div class="crud-toolbar">
            <div class="search-box">
              ${ICONS.search}
              <input id="posSearch" class="input" placeholder="Quét barcode / nhập SKU rồi Enter, hoặc tìm tên..." value="${esc(ui.posSearch)}" />
            </div>
            <select id="posBrandSel" class="select" style="width:auto;min-width:130px">
              <option value="ALL">Mọi thương hiệu</option>
              ${brands.map((b) => `<option value="${esc(b)}" ${ui.posBrand === b ? 'selected' : ''}>${esc(b)}</option>`).join('')}
            </select>
            <div class="pill-group">
              ${['ALL','FRAME','LENS_BLANK','SUNGLASSES','ACCESSORY','SERVICE'].map((c) => `
                <button class="pill ${ui.posCat === c ? 'active' : ''}" data-poscat="${c}">${c === 'ALL' ? 'Tất cả' : CATEGORY_LABEL[c]}</button>
              `).join('')}
            </div>
          </div>

          <div class="card">
            ${ui.posViewMode === 'grid' ? `
              <div class="card-body">
                <div class="product-cards-grid">
                  ${pg.items.map((p) => `
                    <div class="prod-card" data-addcart="${p.id}">
                      <div class="prod-thumb">
                        ${renderGlassesSVG(p.shape, p.colorHex, 'front', 110)}
                        <span class="badge ${!p.trackStock ? 'badge-neutral' : p.stock === 0 ? 'badge-warn' : p.stock <= p.minStock ? 'badge-err' : 'badge-ok'}" style="position:absolute;top:6px;right:6px">
                          ${!p.trackStock ? 'Dịch vụ' : p.stock === 0 ? 'Đặt trước' : `Tồn ${p.stock}`}
                        </span>
                      </div>
                      <div class="muted-xs mono">${esc(p.sku)} · ${esc(p.brand)}</div>
                      <div style="font-weight:600;font-size:12.5px;line-height:1.35">${esc(p.name)}</div>
                      <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;padding-top:4px">
                        <strong class="mono" style="color:var(--accent-primary)">${fmtVnd(p.price)}</strong>
                        <span class="btn btn-xs">+ Chọn</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : `
              <div class="table-wrap">
                <table class="data-table">
                  <thead><tr><th>SKU</th><th>Tên sản phẩm &amp; Thông số</th><th>Hãng</th><th class="num">Tồn</th><th class="num">Đơn giá</th><th></th></tr></thead>
                  <tbody>
                    ${pg.items.map((p) => `
                      <tr class="clickable" data-addcart="${p.id}">
                        <td class="mono" style="font-weight:600">${esc(p.sku)}</td>
                        <td><strong>${esc(p.name)}</strong><div class="muted-xs">${esc(p.specs)}</div></td>
                        <td class="muted">${esc(p.brand)}</td>
                        <td class="num mono">${!p.trackStock ? '—' : p.stock === 0 ? '<span class="badge badge-warn">0 (Đặt)</span>' : p.stock}</td>
                        <td class="num mono" style="font-weight:700;color:var(--accent-primary)">${fmtVnd(p.price)}</td>
                        <td><button class="btn btn-xs btn-primary">+ Thêm</button></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
            ${renderPaginationBar(pg, 'pospage')}
          </div>
        </div>

        <!-- Cart Panel -->
        <div class="card" style="position:sticky;top:110px">
          <div class="card-head">
            <h2 class="card-title">Đơn hàng đang lập</h2>
            <span class="badge badge-teal">${hasCustom ? 'Kính gia công Lab' : 'Bán lẻ'}</span>
          </div>
          <div class="card-body">
            <div class="field" style="margin-bottom:10px">
              <label>Khách hàng</label>
              <div style="display:flex;gap:6px">
                <select id="posCustSel" class="select">
                  ${state.customers.map((c) => `<option value="${c.id}" ${c.id === customer.id ? 'selected' : ''}>${esc(c.name)} — ${esc(c.phone)}</option>`).join('')}
                </select>
                <button class="btn btn-sm" id="posViewCustBtn">Hồ sơ</button>
              </div>
            </div>

            ${hasCustom ? `
              <div style="background:var(--accent-subtle);border:1px solid var(--accent-border);border-radius:8px;padding:9px 10px;margin-bottom:10px">
                <div style="font-size:12px;font-weight:700;color:var(--accent-primary);margin-bottom:4px">Gắn Toa kính cho Phiếu Lab:</div>
                ${custExams.length ? `
                  <select id="posExamSel" class="select">
                    ${custExams.map((e) => `<option value="${e.id}" ${e.id === ui.posExamId ? 'selected' : ''}>${e.date} · OD ${e.prescription.od.sph}/${e.prescription.od.cyl} | OS ${e.prescription.os.sph} (PD ${e.prescription.pd})</option>`).join('')}
                  </select>
                ` : '<div class="muted-xs">Khách chưa có toa kính — hãy đo mắt trước.</div>'}
              </div>
            ` : ''}

            <div style="max-height:200px;overflow-y:auto;margin-bottom:10px">
              ${ui.posCart.length === 0
                ? '<div class="muted-xs" style="text-align:center;padding:20px;border:1px dashed var(--border-strong);border-radius:8px">Chưa có sản phẩm trong đơn. Bấm chọn hoặc quét mã SKU.</div>'
                : ui.posCart.map((i) => `
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border-subtle)">
                    <div style="min-width:0">
                      <div style="font-weight:600;font-size:12.5px">${esc(i.name)}</div>
                      <div class="muted-xs mono">${fmtVnd(i.price)} ${i.outOfStock ? '· <strong style="color:var(--warn-text)">Đặt trước</strong>' : ''}</div>
                    </div>
                    <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
                      <button class="btn btn-xs" data-qdec="${i.productId}">−</button>
                      <span class="mono">${i.qty}</span>
                      <button class="btn btn-xs" data-qinc="${i.productId}">+</button>
                    </div>
                  </div>
                `).join('')
              }
            </div>

            <div class="form-grid-2" style="margin-bottom:8px">
              <div class="field"><label>Chiết khấu % (Trần ${maxDisc}%)</label><input id="posDiscInp" type="number" min="0" max="${maxDisc}" class="input mono" value="${effDisc}" /></div>
              <div class="field"><label>Tổng phải thu</label><input class="input mono" style="font-weight:700;color:var(--accent-primary)" value="${fmtVnd(total)}" disabled /></div>
            </div>

            <div style="background:var(--bg-subtle);border:1px solid var(--border-subtle);border-radius:8px;padding:10px;margin-bottom:10px">
              <div class="form-grid-2">
                <div class="field"><label>Tiền mặt</label><input id="posCashInp" type="number" step="50000" class="input mono" value="${ui.posCash}" /></div>
                <div class="field"><label>Chuyển khoản</label><input id="posTrfInp" type="number" step="50000" class="input mono" value="${ui.posTransfer}" /></div>
              </div>
              <label style="display:flex;gap:6px;align-items:center;margin-top:7px;font-size:12px">
                <input id="posTrfOk" type="checkbox" ${ui.posTransferOk ? 'checked' : ''} /> Xác nhận tiền CK đã vào tài khoản
              </label>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:7px">
                <span>Thực thu: <strong class="mono">${fmtVnd(paidNow)}</strong></span>
                <span>Còn nợ: <strong class="mono" style="color:${remaining > 0 ? 'var(--warn-text)' : 'var(--ok-text)'}">${fmtVnd(remaining)}</strong></span>
              </div>
            </div>

            <div style="display:flex;gap:8px">
              <button class="btn" id="posHalfBtn" style="flex:1">Cọc 50%</button>
              <button class="btn btn-primary" id="posSubmitBtn" style="flex:1.6" ${ui.posCart.length === 0 ? 'disabled' : ''}>Chốt đơn &amp; In phiếu</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Events
    container.querySelectorAll('[data-posmode]').forEach((b) => b.onclick = () => { ui.posViewMode = b.dataset.posmode; ui.posPage = 1; renderPosView(container); });
    const searchEl = document.getElementById('posSearch');
    searchEl.oninput = (e) => { ui.posSearch = e.target.value; ui.posPage = 1; renderPosView(container); };
    searchEl.onkeydown = (e) => {
      if (e.key === 'Enter' && ui.posSearch.trim()) {
        const exact = state.products.find((p) => p.sku.toLowerCase() === ui.posSearch.trim().toLowerCase());
        if (exact) { addToCart(exact); ui.posSearch = ''; renderPosView(container); toast(`Đã quét mã ${exact.sku} vào đơn!`); }
      }
    };
    document.getElementById('posBrandSel').onchange = (e) => { ui.posBrand = e.target.value; ui.posPage = 1; renderPosView(container); };
    container.querySelectorAll('[data-poscat]').forEach((b) => b.onclick = () => { ui.posCat = b.dataset.poscat; ui.posPage = 1; renderPosView(container); });
    container.querySelectorAll('[data-pospage]').forEach((b) => b.onclick = () => { ui.posPage = Number(b.dataset.pospage); renderPosView(container); });
    container.querySelectorAll('[data-addcart]').forEach((el) => el.onclick = () => { addToCart(getProduct(el.dataset.addcart)); renderPosView(container); });
    container.querySelectorAll('[data-qinc]').forEach((b) => b.onclick = () => { const x = ui.posCart.find((i) => i.productId === b.dataset.qinc); if (x) x.qty++; renderPosView(container); });
    container.querySelectorAll('[data-qdec]').forEach((b) => b.onclick = () => {
      const idx = ui.posCart.findIndex((i) => i.productId === b.dataset.qdec);
      if (idx >= 0) { ui.posCart[idx].qty--; if (ui.posCart[idx].qty <= 0) ui.posCart.splice(idx, 1); }
      renderPosView(container);
    });
    document.getElementById('posCustSel').onchange = (e) => { ui.posCustomerId = e.target.value; ui.posExamId = ''; renderPosView(container); };
    const exSel = document.getElementById('posExamSel');
    if (exSel) exSel.onchange = (e) => { ui.posExamId = e.target.value; };
    document.getElementById('posViewCustBtn').onclick = () => { state.activeStoreView = 'customers'; state.activeCustomerDetailId = customer.id; saveState(); renderAll(); };
    document.getElementById('posDiscInp').onchange = (e) => { ui.posDiscountPct = Math.max(0, Math.min(maxDisc, Number(e.target.value) || 0)); renderPosView(container); };
    document.getElementById('posCashInp').oninput = (e) => { ui.posCash = Number(e.target.value) || 0; renderPosView(container); };
    document.getElementById('posTrfInp').oninput = (e) => { ui.posTransfer = Number(e.target.value) || 0; renderPosView(container); };
    document.getElementById('posTrfOk').onchange = (e) => { ui.posTransferOk = e.target.checked; renderPosView(container); };
    document.getElementById('posHalfBtn').onclick = () => { ui.posCash = Math.round(total * 0.5 / 10000) * 10000; ui.posTransfer = 0; renderPosView(container); };
    document.getElementById('posSubmitBtn').onclick = () => submitPosOrder(customer, custExams, subtotal, discAmt, total, hasCustom, paidNow, remaining);
  }

  function addToCart(p) {
    if (!p) return;
    const ex = ui.posCart.find((i) => i.productId === p.id);
    if (ex) ex.qty += 1;
    else ui.posCart.push({ productId: p.id, name: p.name, price: p.price, category: p.category, qty: 1, outOfStock: p.trackStock && p.stock === 0 });
  }

  function submitPosOrder(customer, custExams, subtotal, discAmt, total, hasCustom, paidNow, remaining) {
    if (ui.posTransfer > 0 && !ui.posTransferOk) { toast('Cần tích xác nhận tiền chuyển khoản đã vào tài khoản!'); return; }
    const orderId = 'ORD-2611-' + String(state.orders.length + 1).padStart(3, '0');
    const payments = [];
    if (ui.posCash > 0) payments.push({ id: 'PAY-' + Date.now() + 'C', date: nowStr(), method: 'CASH', type: remaining > 0 ? 'DEPOSIT' : 'FULL', amount: ui.posCash, confirmedBy: state.role, verified: true });
    if (ui.posTransfer > 0 && ui.posTransferOk) payments.push({ id: 'PAY-' + Date.now() + 'T', date: nowStr(), method: 'BANK_TRANSFER', type: remaining > 0 ? 'DEPOSIT' : 'FULL', amount: ui.posTransfer, confirmedBy: state.role, verified: true });

    const anyBackorder = ui.posCart.some((i) => i.outOfStock);
    const order = {
      id: orderId, date: nowStr(), customerId: customer.id,
      status: anyBackorder ? 'WAITING_FOR_STOCK' : (remaining === 0 ? 'COMPLETED' : 'CONFIRMED'),
      subtotal, discount: discAmt, total,
      items: ui.posCart.map((i) => ({ productId: i.productId, name: i.name, qty: i.qty, price: i.price, isCustomEyewear: hasCustom })),
      payments
    };
    state.orders.unshift(order);
    customer.totalSpent += paidNow;

    ui.posCart.forEach((i) => {
      const p = getProduct(i.productId);
      if (p && p.trackStock && p.stock > 0) logInventory(i.productId, i.category === 'LENS_BLANK' ? 'LAB_CONSUME' : 'SALE_OUT', -i.qty, orderId, `Xuất cho đơn ${orderId}`);
    });

    let job = null;
    if (hasCustom) {
      const exam = state.examinations.find((e) => e.id === ui.posExamId) || custExams[0];
      const frame = ui.posCart.find((i) => i.category === 'FRAME');
      const lens = ui.posCart.find((i) => i.category === 'LENS_BLANK');
      const jobId = 'JOB-2611-' + String(state.productionJobs.length + 1).padStart(3, '0');
      const eywId = 'EYW-2611-' + String(state.eyewearUnits.length + 1).padStart(2, '0');
      job = {
        id: jobId, orderId, customerId: customer.id, eyewearId: eywId,
        frameName: frame ? frame.name : 'Gọng khách mang tới',
        lensProductId: lens ? lens.productId : 'PRD-13',
        lensConfigSummary: lens ? lens.name : (exam ? exam.lensConfig.lensName : 'Cấu hình chuẩn'),
        rxSummary: exam ? `OD ${exam.prescription.od.sph}/${exam.prescription.od.cyl}×${exam.prescription.od.axis} · OS ${exam.prescription.os.sph}/${exam.prescription.os.cyl}×${exam.prescription.os.axis} · PD ${exam.prescription.pd}` : 'Chờ nhập số độ',
        stage: 'CONFIRMED', technician: 'Chưa phân công', dueDate: 'Ngày mai 17:00', reworkCount: 0,
        qcChecklist: { pdMatch: false, powerMatch: false, noScratch: false, frameAligned: false },
        notes: anyBackorder ? 'CHỜ HÀNG VỀ (WAITING_FOR_STOCK)' : 'Tạo tự động từ POS.'
      };
      state.productionJobs.unshift(job);
      state.eyewearUnits.unshift({ id: eywId, customerId: customer.id, orderId, jobId, rxId: exam ? exam.prescription.id : '—', frameName: job.frameName, lensName: job.lensConfigSummary, purchaseDate: todayStr(), warrantyUntil: '2027-11-19', status: 'IN_LAB' });
    }

    pushZalo(customer.name, customer.phone, 'ORDER_CREATED', `Xác nhận đơn ${orderId} (${fmtVnd(total)}), đã thu ${fmtVnd(paidNow)}.`, customer);
    ui.posCart = []; ui.posCash = 0; ui.posTransfer = 0; ui.posTransferOk = false;
    saveState();
    renderAll();
    toast(`Đã tạo đơn ${orderId}${job ? ` & sinh phiếu Lab ${job.id}` : ''}!`);
    openPrintReceiptModal(order, job, customer);
  }

  function openPrintReceiptModal(order, job, customer) {
    const paid = order.payments.reduce((s, p) => s + p.amount, 0);
    openModal(`Biên nhận & Phiếu Gia công ${order.id}`, `
      <div style="font-size:13px">
        <div style="text-align:center;border-bottom:1px dashed var(--border-strong);padding-bottom:10px;margin-bottom:12px">
          <div style="font-weight:700;font-size:16px">KÍNH MẮT MINH QUANG — OPTICAL STUDIO</div>
          <div class="muted-xs">148 Xã Đàn, Đống Đa, Hà Nội · Hotline 024 3888 9999</div>
        </div>
        <div class="form-grid-2" style="margin-bottom:10px">
          <div><strong>Khách:</strong> ${esc(customer.name)} · <span class="mono">${esc(customer.phone)}</span></div>
          <div style="text-align:right"><strong>Đơn:</strong> <span class="mono">${order.id}</span> · ${order.date}</div>
        </div>
        <table class="data-table" style="border:1px solid var(--border-subtle);margin-bottom:10px">
          <thead><tr><th>Hạng mục</th><th class="num">SL</th><th class="num">Thành tiền</th></tr></thead>
          <tbody>${order.items.map((i) => `<tr><td>${esc(i.name)}</td><td class="num mono">${i.qty}</td><td class="num mono">${fmtVnd(i.price * i.qty)}</td></tr>`).join('')}</tbody>
        </table>
        <div style="text-align:right;font-size:13px">
          <div>Tổng cộng: <strong class="mono">${fmtVnd(order.total)}</strong> · Đã thu: <strong class="mono">${fmtVnd(paid)}</strong> · Còn lại: <strong class="mono">${fmtVnd(Math.max(0, order.total - paid))}</strong></div>
        </div>
        ${job ? `<div style="margin-top:12px;padding:10px;background:var(--accent-subtle);border:1px solid var(--accent-border);border-radius:8px"><strong class="mono">PHIẾU LAB: ${job.id}</strong><div>${esc(job.frameName)} + ${esc(job.lensConfigSummary)}</div><div class="mono muted-xs">${esc(job.rxSummary)}</div></div>` : ''}
        <div class="no-print" style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px">
          <button class="btn" onclick="window.print()">In phiếu</button>
          <button class="btn btn-primary" onclick="document.getElementById('closeModalBtn').click()">Đóng</button>
        </div>
      </div>
    `);
  }

  // -------------------- 3. ORDERS (FULL SEARCH + FILTER + PAGINATION + PAY REST) --------------------
  function renderOrdersView(container) {
    const filtered = state.orders.filter((o) => {
      const c = getCustomer(o.customerId);
      if (ui.orderStatus !== 'ALL' && o.status !== ui.orderStatus) return false;
      if (ui.orderSearch) {
        const q = ui.orderSearch.toLowerCase();
        return o.id.toLowerCase().includes(q) || (c && (c.name.toLowerCase().includes(q) || c.phone.includes(q)));
      }
      return true;
    });
    const pg = paginate(filtered, ui.orderPage, 8);
    ui.orderPage = pg.page;

    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Quản lý Đơn hàng &amp; Công nợ cọc</h1><p class="page-sub">Tìm kiếm theo mã đơn / tên khách / SĐT, thu nốt phần còn lại hoặc in lại biên nhận</p></div>
        <button class="btn btn-primary" id="ordNewBtn">+ Tạo đơn POS</button>
      </div>
      <div class="crud-toolbar">
        <div class="search-box">${ICONS.search}<input id="ordSearch" class="input" placeholder="Tìm mã đơn, tên khách, SĐT..." value="${esc(ui.orderSearch)}" /></div>
        <div class="pill-group">
          ${['ALL','CONFIRMED','COMPLETED','WAITING_FOR_STOCK'].map((s) => `<button class="pill ${ui.orderStatus === s ? 'active' : ''}" data-ordst="${s}">${s === 'ALL' ? 'Tất cả' : s}</button>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Mã đơn</th><th>Ngày lập</th><th>Khách hàng</th><th class="num">Tổng tiền</th><th class="num">Đã thu</th><th class="num">Còn nợ</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              ${pg.items.map((o) => {
                const c = getCustomer(o.customerId);
                const paid = o.payments.reduce((s, p) => s + p.amount, 0);
                const due = Math.max(0, o.total - paid);
                return `<tr>
                  <td class="mono" style="font-weight:700">${o.id}</td>
                  <td class="mono muted-xs">${o.date}</td>
                  <td><strong>${esc(c ? c.name : '')}</strong><div class="muted-xs mono">${esc(c ? c.phone : '')}</div></td>
                  <td class="num mono">${fmtVnd(o.total)}</td>
                  <td class="num mono" style="color:var(--ok-text)">${fmtVnd(paid)}</td>
                  <td class="num mono" style="color:${due > 0 ? 'var(--warn-text)' : 'var(--text-muted)'}">${fmtVnd(due)}</td>
                  <td><span class="badge ${o.status === 'COMPLETED' ? 'badge-ok' : o.status === 'WAITING_FOR_STOCK' ? 'badge-warn' : 'badge-info'}">${o.status}</span></td>
                  <td style="white-space:nowrap">
                    ${due > 0 ? `<button class="btn btn-xs btn-primary" data-payord="${o.id}">Thu nốt</button>` : ''}
                    <button class="btn btn-xs" data-printord="${o.id}">In</button>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        ${renderPaginationBar(pg, 'ordpage')}
      </div>
    `;
    document.getElementById('ordNewBtn').onclick = () => { state.activeStoreView = 'pos'; saveState(); renderAll(); };
    document.getElementById('ordSearch').oninput = (e) => { ui.orderSearch = e.target.value; ui.orderPage = 1; renderOrdersView(container); };
    container.querySelectorAll('[data-ordst]').forEach((b) => b.onclick = () => { ui.orderStatus = b.dataset.ordst; ui.orderPage = 1; renderOrdersView(container); });
    container.querySelectorAll('[data-ordpage]').forEach((b) => b.onclick = () => { ui.orderPage = Number(b.dataset.ordpage); renderOrdersView(container); });
    container.querySelectorAll('[data-payord]').forEach((b) => b.onclick = () => {
      const o = state.orders.find((x) => x.id === b.dataset.payord);
      const due = Math.max(0, o.total - o.payments.reduce((s, p) => s + p.amount, 0));
      o.payments.push({ id: 'PAY-' + Date.now(), date: nowStr(), method: 'CASH', type: 'FINAL', amount: due, confirmedBy: state.role, verified: true });
      o.status = 'COMPLETED';
      const c = getCustomer(o.customerId); if (c) c.totalSpent += due;
      saveState(); renderAll(); toast(`Đã thu đủ ${fmtVnd(due)} cho đơn ${o.id}`);
    });
    container.querySelectorAll('[data-printord]').forEach((b) => b.onclick = () => {
      const o = state.orders.find((x) => x.id === b.dataset.printord);
      const j = state.productionJobs.find((x) => x.orderId === o.id);
      openPrintReceiptModal(o, j, getCustomer(o.customerId));
    });
  }

  // -------------------- 4. OPTOMETRIST ROLE-BASED SPLIT-VIEW WORKBENCH --------------------
  function renderExamWorkbenchView(container) {
    const cust = getCustomer(ui.examCustId) || state.customers[0];
    const custExams = state.examinations.filter((e) => e.customerId === cust.id).sort((a, b) => b.date.localeCompare(a.date));
    const latest = custExams[0];
    const prev = custExams[1];
    const deltaOd = (latest && prev) ? (parseFloat(latest.prescription.od.sph) - parseFloat(prev.prescription.od.sph)).toFixed(2) : null;
    const lensProducts = state.products.filter((p) => p.category === 'LENS_BLANK');

    container.innerHTML = `
      <div class="page-head">
        <div>
          <h1 class="page-title">Phòng Đo mắt &amp; Toa kính (Role UX: KTV Khúc xạ)</h1>
          <p class="page-sub">Bố cục Split-View chuyên biệt: Xem ngay <strong>lịch sử đo cũ + biểu đồ tiến triển độ cận</strong> bên trái để đối chiếu trực tiếp khi thực hành đo mới bên phải</p>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="muted-xs">Khách đang đo:</span>
          <select id="examCustSel" class="select" style="width:auto;min-width:230px">
            ${state.customers.map((c) => `<option value="${c.id}" ${c.id === cust.id ? 'selected' : ''}>${esc(c.name)} — ${esc(c.phone)}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="split-2">
        <!-- LEFT COLUMN: PREVIOUS EYE HISTORY + PROGRESSION CHART -->
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="card">
            <div class="card-head">
              <h2 class="card-title">Biểu đồ tiến triển độ cận (${esc(cust.name)})</h2>
              ${deltaOd !== null ? `<span class="badge ${parseFloat(deltaOd) < 0 ? 'badge-warn' : 'badge-ok'}">Biến thiên OD gần nhất: ${deltaOd > 0 ? '+' : ''}${deltaOd}D</span>` : '<span class="badge badge-neutral">Lần đo đầu</span>'}
            </div>
            <div class="card-body">
              ${renderMyopiaChartSVG(custExams)}
            </div>
          </div>

          <div class="card">
            <div class="card-head">
              <h2 class="card-title">Lịch sử các lần đo trước (${custExams.length} lượt)</h2>
              <button class="btn btn-xs" id="examOpenCust360">Xem hồ sơ 360° →</button>
            </div>
            <div class="card-body" style="display:flex;flex-direction:column;gap:10px;max-height:380px;overflow-y:auto">
              ${custExams.length === 0 ? '<div class="muted-xs">Khách chưa có lịch sử đo mắt trước đây.</div>' : custExams.map((e, idx) => `
                <div style="padding:10px 12px;border:1px solid ${idx === 0 ? 'var(--accent-border)' : 'var(--border-subtle)'};background:${idx === 0 ? 'var(--accent-subtle)' : '#FFF'};border-radius:8px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                    <strong class="mono">${e.date} · ${e.id}</strong>
                    <div style="display:flex;gap:6px">
                      <span class="badge ${e.source === 'IN_STORE' ? 'badge-teal' : 'badge-info'}">${e.source === 'IN_STORE' ? 'Tại cửa hàng' : e.externalClinic}</span>
                      <button class="btn btn-xs btn-primary" data-ex2pos="${e.id}">Đẩy POS</button>
                    </div>
                  </div>
                  <table class="rx-table">
                    <thead><tr><th>Mắt</th><th>SPH</th><th>CYL</th><th>AXIS</th><th>PD</th></tr></thead>
                    <tbody>
                      <tr><td><strong>OD</strong></td><td>${e.prescription.od.sph}</td><td>${e.prescription.od.cyl}</td><td>${e.prescription.od.axis}°</td><td rowspan="2">${e.prescription.pd}mm</td></tr>
                      <tr><td><strong>OS</strong></td><td>${e.prescription.os.sph}</td><td>${e.prescription.os.cyl}</td><td>${e.prescription.os.axis}°</td></tr>
                    </tbody>
                  </table>
                  <div class="muted-xs" style="margin-top:6px"><strong>Tròng:</strong> ${esc(e.lensConfig.lensName)} · ${esc(e.note)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: NEW EXAM FORM -->
        <div class="card">
          <div class="card-head">
            <h2 class="card-title">Nhập kết quả đo mắt mới / Toa ngoài</h2>
            <span class="badge badge-teal">Tự động điền sẵn từ lần đo gần nhất</span>
          </div>
          <div class="card-body">
            <form id="optomForm" style="display:flex;flex-direction:column;gap:12px">
              <div class="form-grid-2">
                <div class="field">
                  <label>Nguồn đo (EyeExamination)</label>
                  <select name="source" id="optomSourceSel" class="select">
                    <option value="IN_STORE">Đo trực tiếp tại phòng khúc xạ</option>
                    <option value="EXTERNAL_RX">Tiếp nhận toa kính từ bệnh viện ngoài</option>
                  </select>
                </div>
                <div class="field">
                  <label>KTV thực hiện</label>
                  <input name="optometrist" class="input" value="KTV Hoàng Nam" />
                </div>
              </div>

              <div id="optomExtBox" class="hidden" style="background:var(--info-bg);padding:10px;border-radius:8px">
                <div class="form-grid-2">
                  <div class="field"><label>Cơ sở / Bệnh viện</label><input name="externalClinic" class="input" placeholder="VD: BV Mắt Trung Ương" /></div>
                  <div class="field"><label>Ảnh chụp toa kính ngoài</label><input type="file" id="optomFileInp" accept="image/*" class="input" /></div>
                </div>
                <div id="optomFilePrev" style="margin-top:8px"></div>
              </div>

              <div>
                <label style="font-size:12px;font-weight:700;color:var(--accent-primary);display:block;margin-bottom:5px">BẢNG THÔNG SỐ ĐƠN KÍNH (PRESCRIPTION)</label>
                <table class="rx-table">
                  <thead><tr><th>Mắt</th><th>SPH</th><th>CYL</th><th>AXIS</th><th>ADD</th><th>Prism</th></tr></thead>
                  <tbody>
                    <tr>
                      <td><strong>OD</strong></td>
                      <td><input name="od_sph" class="rx-input" value="${latest ? latest.prescription.od.sph : '-1.50'}" /></td>
                      <td><input name="od_cyl" class="rx-input" value="${latest ? latest.prescription.od.cyl : '-0.25'}" /></td>
                      <td><input name="od_axis" class="rx-input" value="${latest ? latest.prescription.od.axis : '180'}" /></td>
                      <td><input name="od_add" class="rx-input" placeholder="—" /></td>
                      <td><input name="od_prism" class="rx-input" placeholder="—" /></td>
                    </tr>
                    <tr>
                      <td><strong>OS</strong></td>
                      <td><input name="os_sph" class="rx-input" value="${latest ? latest.prescription.os.sph : '-1.50'}" /></td>
                      <td><input name="os_cyl" class="rx-input" value="${latest ? latest.prescription.os.cyl : '-0.25'}" /></td>
                      <td><input name="os_axis" class="rx-input" value="${latest ? latest.prescription.os.axis : '175'}" /></td>
                      <td><input name="os_add" class="rx-input" placeholder="—" /></td>
                      <td><input name="os_prism" class="rx-input" placeholder="—" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="form-grid-2">
                <div class="field"><label>PD (mm)</label><input name="pd" class="input mono" value="${latest ? latest.prescription.pd : '62'}" /></div>
                <div class="field"><label>Chiều cao tâm lắp (Fitting Height)</label><input name="fittingHeight" class="input mono" value="18mm" /></div>
              </div>

              <div class="form-grid-2">
                <div class="field">
                  <label>Cấu hình phôi tròng khuyến nghị</label>
                  <select name="lensProductId" class="select">
                    ${lensProducts.map((p) => `<option value="${p.id}">${esc(p.name)} (${fmtVnd(p.price)})</option>`).join('')}
                  </select>
                </div>
                <div class="field"><label>Lớp phủ / Tính năng</label><input name="coating" class="input" value="Lọc ánh sáng xanh + Hạn chế trầy" /></div>
              </div>

              <div class="field"><label>Nhận xét &amp; Tư vấn của KTV Khúc xạ</label><textarea name="note" rows="2" class="textarea" placeholder="Ghi nhận thị lực sau chỉnh, khuyến nghị thích nghi hoặc lịch tái khám..."></textarea></div>

              <div style="display:flex;gap:8px;justify-content:flex-end">
                <button type="submit" class="btn btn-primary">Lưu vào Sổ Kính &amp; Cập nhật biểu đồ</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    document.getElementById('examCustSel').onchange = (e) => { ui.examCustId = e.target.value; renderExamWorkbenchView(container); };
    document.getElementById('examOpenCust360').onclick = () => { state.activeStoreView = 'customers'; state.activeCustomerDetailId = cust.id; saveState(); renderAll(); };
    document.getElementById('optomSourceSel').onchange = (e) => document.getElementById('optomExtBox').classList.toggle('hidden', e.target.value !== 'EXTERNAL_RX');
    document.getElementById('optomFileInp').onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      ui.examUploadUrl = URL.createObjectURL(f);
      document.getElementById('optomFilePrev').innerHTML = `<img src="${ui.examUploadUrl}" alt="Toa kính" style="max-height:110px;border-radius:6px;border:1px solid var(--border-strong)" />`;
    };
    container.querySelectorAll('[data-ex2pos]').forEach((b) => b.onclick = () => {
      const ex = state.examinations.find((x) => x.id === b.dataset.ex2pos);
      if (!ex) return;
      ui.posCustomerId = ex.customerId; ui.posExamId = ex.id;
      const lp = getProduct(ex.lensConfig.productId);
      if (lp) addToCart(lp);
      state.activeStoreView = 'pos'; saveState(); renderAll();
      toast(`Đã chuyển đơn kính ${ex.prescription.id} & phôi tròng sang quầy POS!`);
    });
    document.getElementById('optomForm').onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const lp = getProduct(fd.get('lensProductId'));
      const num = String(state.examinations.length + 20).padStart(3, '0');
      state.examinations.unshift({
        id: `EXM-2026-${num}`, customerId: cust.id, date: todayStr(), source: fd.get('source'),
        optometrist: fd.get('optometrist'), externalClinic: fd.get('externalClinic') || '', externalImageUrl: ui.examUploadUrl,
        note: fd.get('note') || 'Đo khúc xạ tiêu chuẩn.',
        prescription: {
          id: `RX-2026-${num}`,
          od: { sph: fd.get('od_sph'), cyl: fd.get('od_cyl'), axis: fd.get('od_axis'), add: fd.get('od_add'), prism: fd.get('od_prism') },
          os: { sph: fd.get('os_sph'), cyl: fd.get('os_cyl'), axis: fd.get('os_axis'), add: fd.get('os_add'), prism: fd.get('os_prism') },
          pd: fd.get('pd'), fittingHeight: fd.get('fittingHeight')
        },
        lensConfig: { id: `LC-${num}`, productId: lp.id, lensName: lp.name, index: lp.sku.includes('167') ? '1.67' : '1.60', coating: fd.get('coating') }
      });
      saveState(); renderAll();
      toast(`Đã lưu lần đo EXM-2026-${num} và cập nhật biểu đồ thị lực!`);
    };
  }

  // -------------------- 5. LAB KANBAN & QC (WITH SEARCH & TECH FILTER) --------------------
  function renderLabView(container) {
    const activeCols = ['CONFIRMED', 'PREP', 'CUT_MOUNT', 'QC', 'READY'];
    const techs = [...new Set(state.productionJobs.map((j) => j.technician))];
    const filtered = state.productionJobs.filter((j) => {
      const c = getCustomer(j.customerId);
      if (ui.labTech !== 'ALL' && j.technician !== ui.labTech) return false;
      if (ui.labSearch) {
        const q = ui.labSearch.toLowerCase();
        return j.id.toLowerCase().includes(q) || j.orderId.toLowerCase().includes(q) || (c && c.name.toLowerCase().includes(q));
      }
      return true;
    });

    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Sản xuất Nội bộ &amp; Kiểm tra QC (Lab Kanban)</h1><p class="page-sub">Bấm vào từng phiếu để chuyển công đoạn, tích checklist QC 4 bước hoặc báo hỏng phôi (Rework)</p></div>
      </div>
      <div class="crud-toolbar">
        <div class="search-box">${ICONS.search}<input id="labSearch" class="input" placeholder="Tìm mã phiếu JOB, mã đơn ORD, tên khách..." value="${esc(ui.labSearch)}" /></div>
        <select id="labTechSel" class="select" style="width:auto;min-width:170px">
          <option value="ALL">Tất cả KTV Lab</option>
          ${techs.map((t) => `<option value="${esc(t)}" ${ui.labTech === t ? 'selected' : ''}>${esc(t)}</option>`).join('')}
        </select>
      </div>
      <div class="kanban-board">
        ${activeCols.map((st) => {
          const jobs = filtered.filter((j) => j.stage === st);
          return `
            <div class="kanban-col">
              <div class="kanban-col-head"><span>${STAGE_META[st].label}</span><span class="badge ${STAGE_META[st].badge}">${jobs.length}</span></div>
              ${jobs.length === 0 ? '<div class="muted-xs" style="text-align:center;padding:20px 4px">Trống</div>' : jobs.map((j) => {
                const c = getCustomer(j.customerId);
                return `<div class="kanban-card" data-openjob="${j.id}">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                    <strong class="mono" style="font-size:12px">${j.id}</strong>
                    ${j.reworkCount > 0 ? `<span class="badge badge-err">Rework ×${j.reworkCount}</span>` : `<span class="muted-xs mono">${j.orderId}</span>`}
                  </div>
                  <div style="font-weight:600">${esc(c ? c.name : '')}</div>
                  <div class="muted-xs">${esc(j.frameName)}</div>
                  <div class="mono" style="font-size:11px;background:var(--bg-subtle);padding:5px 6px;border-radius:5px;margin:6px 0">${esc(j.rxSummary)}</div>
                  <div style="display:flex;justify-content:space-between;font-size:11.5px"><span class="muted">${esc(j.technician)}</span><span class="mono" style="color:var(--accent-primary)">${esc(j.dueDate)}</span></div>
                </div>`;
              }).join('')}
            </div>
          `;
        }).join('')}
      </div>
    `;
    document.getElementById('labSearch').oninput = (e) => { ui.labSearch = e.target.value; renderLabView(container); };
    document.getElementById('labTechSel').onchange = (e) => { ui.labTech = e.target.value; renderLabView(container); };
    container.querySelectorAll('[data-openjob]').forEach((el) => el.onclick = () => openLabJobDrawer(el.dataset.openjob));
  }

  function openLabJobDrawer(jobId) {
    const job = state.productionJobs.find((j) => j.id === jobId);
    if (!job) return;
    const customer = getCustomer(job.customerId);
    const idx = STAGE_ORDER.indexOf(job.stage);
    const nextStage = STAGE_ORDER[idx + 1];

    openDrawer(`PHIẾU GIA CÔNG · ${job.orderId}`, `${job.id} — ${customer ? customer.name : ''}`, `
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="stepper">
          ${['CONFIRMED','PREP','CUT_MOUNT','QC','READY'].map((s, sIdx) => `<div class="step-pill ${sIdx < idx ? 'done' : sIdx === idx ? 'current' : ''}">${STAGE_META[s].label.replace(/^\d+\.\s*/, '')}</div>`).join('')}
        </div>
        <div class="card" style="padding:12px">
          <div class="kv-list">
            <div class="kv-k">Khách hàng</div><div class="kv-v">${esc(customer.name)} (${esc(customer.phone)})</div>
            <div class="kv-k">Gọng kính</div><div class="kv-v">${esc(job.frameName)}</div>
            <div class="kv-k">Phôi tròng</div><div class="kv-v">${esc(job.lensConfigSummary)}</div>
            <div class="kv-k">Thông số cắt</div><div class="kv-v mono">${esc(job.rxSummary)}</div>
            <div class="kv-k">Ghi chú</div><div class="kv-v muted">${esc(job.notes)}</div>
          </div>
        </div>
        <div class="card" style="padding:12px">
          <div style="font-weight:700;margin-bottom:8px">Checklist Kiểm tra Chất lượng (QC)</div>
          <div style="display:flex;flex-direction:column;gap:7px">
            <label style="display:flex;gap:8px"><input type="checkbox" data-qc="pdMatch" ${job.qcChecklist.pdMatch ? 'checked' : ''} /> Đúng tâm PD &amp; chiều cao lắp</label>
            <label style="display:flex;gap:8px"><input type="checkbox" data-qc="powerMatch" ${job.qcChecklist.powerMatch ? 'checked' : ''} /> Đúng số độ trên máy Lensometer</label>
            <label style="display:flex;gap:8px"><input type="checkbox" data-qc="noScratch" ${job.qcChecklist.noScratch ? 'checked' : ''} /> Không trầy xước lớp váng phủ</label>
            <label style="display:flex;gap:8px"><input type="checkbox" data-qc="frameAligned" ${job.qcChecklist.frameAligned ? 'checked' : ''} /> Cân chỉnh gọng &amp; siết ốc đều</label>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <button class="btn btn-danger" id="jobReworkBtn">Báo hỏng phôi / Mài lại</button>
          ${nextStage ? `<button class="btn btn-primary" id="jobNextBtn">Chuyển → ${STAGE_META[nextStage].label}</button>` : '<span class="badge badge-ok">Đã bàn giao</span>'}
        </div>
      </div>
    `);
    document.querySelectorAll('[data-qc]').forEach((cb) => cb.onchange = () => { job.qcChecklist[cb.dataset.qc] = cb.checked; saveState(); });
    document.getElementById('jobReworkBtn').onclick = () => {
      job.reworkCount++; job.stage = 'PREP';
      job.qcChecklist = { pdMatch: false, powerMatch: false, noScratch: false, frameAligned: false };
      logInventory(job.lensProductId, 'LAB_SPOILAGE', -1, job.id, `Mài hỏng phôi phiếu ${job.id} (Rework #${job.reworkCount})`);
      saveState(); openLabJobDrawer(job.id); renderAll(); toast('Đã ghi nhận Rework & tự trừ 1 phôi hỏng trong Kho!');
    };
    const nextBtn = document.getElementById('jobNextBtn');
    if (nextBtn) nextBtn.onclick = () => {
      if (nextStage === 'READY' && !Object.values(job.qcChecklist).every(Boolean)) { toast('Cần hoàn tất 4/4 tiêu chí QC trước khi chuyển Sẵn sàng giao!'); return; }
      if (nextStage === 'READY') pushZalo(customer.name, customer.phone, 'LAB_JOB_READY', `Bộ kính ${job.frameName} của bạn đã đạt QC 4/4 và sẵn sàng bàn giao tại 148 Xã Đàn!`, customer);
      job.stage = nextStage;
      const eyw = state.eyewearUnits.find((e) => e.id === job.eyewearId);
      if (eyw) eyw.status = nextStage === 'HANDED_OVER' ? 'HANDED_OVER' : (nextStage === 'READY' ? 'READY' : 'IN_LAB');
      saveState(); openLabJobDrawer(job.id); renderAll(); toast(`Đã chuyển ${job.id} sang ${STAGE_META[nextStage].label}`);
    };
  }

  // -------------------- 6. CUSTOMERS LIST (CRUD + SEARCH + PAGINATION) & DETAIL 360 (REFERENCE LAYOUT) --------------------
  function renderCustomersListView(container) {
    const filtered = state.customers.filter((c) => {
      if (ui.custTier !== 'ALL' && !c.tier.includes(ui.custTier)) return false;
      if (ui.custSearch) {
        const q = ui.custSearch.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.phone.includes(q) || (c.email || '').toLowerCase().includes(q);
      }
      return true;
    });
    const pg = paginate(filtered, ui.custPage, 8);
    ui.custPage = pg.page;

    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Danh sách Khách hàng</h1><p class="page-sub">Đầy đủ CRUD + Tìm kiếm theo Tên/SĐT · Bấm vào dòng để mở Hồ sơ khách hàng 360° &amp; Dòng thời gian</p></div>
        <button class="btn btn-primary" id="addCustBtn">+ Thêm khách hàng</button>
      </div>
      <div class="crud-toolbar">
        <div class="search-box">${ICONS.search}<input id="custSearch" class="input" placeholder="Tìm tên khách hàng, số điện thoại, email..." value="${esc(ui.custSearch)}" /></div>
        <div class="pill-group">
          ${['ALL','Gold','Silver','Khách mới'].map((t) => `<button class="pill ${ui.custTier === t ? 'active' : ''}" data-ctier="${t}">${t === 'ALL' ? 'Tất cả' : t}</button>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Khách hàng</th><th>Số điện thoại</th><th>Hạng / Nhóm</th><th>Zalo OA</th><th class="num">Tổng chi tiêu</th><th>Thao tác</th></tr></thead>
            <tbody>
              ${pg.items.map((c) => `
                <tr class="clickable" data-opencust="${c.id}">
                  <td><strong>${esc(c.name)}</strong><div class="muted-xs">${esc(c.email || '—')}</div></td>
                  <td class="mono">${esc(c.phone)}</td>
                  <td><span class="badge badge-teal">${esc(c.tier)}</span>${c.familyGroup ? `<div class="muted-xs">${esc(c.familyGroup)}</div>` : ''}</td>
                  <td>${c.zaloLinked ? '<span class="badge badge-ok">Đã liên kết</span>' : '<span class="badge badge-warn">Chưa liên kết</span>'}</td>
                  <td class="num mono" style="font-weight:700">${fmtVnd(c.totalSpent)}</td>
                  <td style="white-space:nowrap" onclick="event.stopPropagation()">
                    <button class="btn btn-xs" data-editcust="${c.id}">Sửa</button>
                    <button class="btn btn-xs btn-danger" data-delcust="${c.id}">Xóa</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        ${renderPaginationBar(pg, 'custpage')}
      </div>
    `;
    document.getElementById('addCustBtn').onclick = () => openCustomerCrudDrawer(null);
    document.getElementById('custSearch').oninput = (e) => { ui.custSearch = e.target.value; ui.custPage = 1; renderCustomersListView(container); };
    container.querySelectorAll('[data-ctier]').forEach((b) => b.onclick = () => { ui.custTier = b.dataset.ctier; ui.custPage = 1; renderCustomersListView(container); });
    container.querySelectorAll('[data-custpage]').forEach((b) => b.onclick = () => { ui.custPage = Number(b.dataset.custpage); renderCustomersListView(container); });
    container.querySelectorAll('[data-opencust]').forEach((tr) => tr.onclick = () => { state.activeCustomerDetailId = tr.dataset.opencust; saveState(); renderAll(); });
    container.querySelectorAll('[data-editcust]').forEach((b) => b.onclick = () => openCustomerCrudDrawer(b.dataset.editcust));
    container.querySelectorAll('[data-delcust]').forEach((b) => b.onclick = () => {
      state.customers = state.customers.filter((x) => x.id !== b.dataset.delcust);
      saveState(); renderAll(); toast('Đã xóa hồ sơ khách hàng.');
    });
  }

  function renderCustomerDetailView(container, custId) {
    const c = getCustomer(custId);
    if (!c) { state.activeCustomerDetailId = null; renderCustomersListView(container); return; }
    const orders = state.orders.filter((o) => o.customerId === c.id);
    const exams = state.examinations.filter((e) => e.customerId === c.id).sort((a, b) => b.date.localeCompare(a.date));
    const eyws = state.eyewearUnits.filter((e) => e.customerId === c.id);
    const wrts = state.warranties.filter((w) => w.customerId === c.id);
    const jobs = state.productionJobs.filter((j) => j.customerId === c.id);

    const latestOrder = orders[0];
    const latestExam = exams[0];
    const latestEyw = eyws[0];
    const openWrt = wrts.find((w) => w.status === 'OPEN') || wrts[0];

    // Build Unified Timeline matching approved reference layout
    const timeline = [
      ...wrts.map((w) => ({ date: w.date, tag: 'Bảo hành', badge: 'badge-warn', title: `${w.id} — ${w.issueType}`, sub: w.note })),
      ...jobs.map((j) => ({ date: j.dueDate.slice(0, 10), tag: 'Sản xuất', badge: 'badge-teal', title: `Production ${j.id} (${STAGE_META[j.stage].label})`, sub: j.frameName })),
      ...orders.map((o) => ({ date: o.date, tag: 'Đơn hàng', badge: 'badge-info', title: `Order ${o.id} — ${fmtVnd(o.total)}`, sub: o.items.map((i) => i.name).join(', ') })),
      ...exams.map((e) => ({ date: e.date, tag: 'Đo mắt / toa kính', badge: 'badge-neutral', title: `${e.source === 'IN_STORE' ? 'Đo tại cửa hàng' : 'Toa bên ngoài'} (${e.prescription.id})`, sub: `OD ${e.prescription.od.sph}/${e.prescription.od.cyl} · OS ${e.prescription.os.sph}/${e.prescription.os.cyl} · PD ${e.prescription.pd}` }))
    ].sort((a, b) => b.date.localeCompare(a.date));

    container.innerHTML = `
      <div class="page-head">
        <div>
          <button class="btn btn-xs" id="backToCustList" style="margin-bottom:6px">‹ Quay lại danh sách</button>
          <h1 class="page-title">${esc(c.name)}</h1>
          <p class="page-sub mono">${esc(c.phone)} · ${esc(c.tier)}</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn" id="cdAddRx">Thêm toa kính</button>
          <button class="btn" id="cdAddApt">Đặt lịch hẹn</button>
          <button class="btn btn-primary" id="cdNewOrder">Tạo đơn</button>
          <button class="btn" id="cdEditCust">Chỉnh sửa</button>
        </div>
      </div>

      <!-- 4 Left-Accent KPI Cards matching reference -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Đơn gần nhất</div>
          <div class="kpi-val mono">${latestOrder ? latestOrder.id : '—'}</div>
          <div class="kpi-sub">${latestOrder ? `${latestOrder.date.slice(0, 10)} · <span class="badge badge-ok">${latestOrder.status}</span>` : 'Chưa có đơn hàng'}</div>
        </div>
        <div class="kpi-card blue">
          <div class="kpi-label">Lần đo gần nhất</div>
          <div class="kpi-val mono">${latestExam ? latestExam.date : '—'}</div>
          <div class="kpi-sub">${latestExam ? (latestExam.source === 'IN_STORE' ? 'Đo tại cửa hàng' : 'Toa bên ngoài') : 'Chưa có lịch sử đo'}</div>
        </div>
        <div class="kpi-card slate">
          <div class="kpi-label">Kính hiện tại / gần nhất</div>
          <div class="kpi-val" style="font-size:14.5px">${latestEyw ? esc(latestEyw.frameName) : '—'}</div>
          <div class="kpi-sub">${latestEyw ? `${esc(latestEyw.lensName)} (${latestEyw.status})` : 'Chưa có bộ kính'}</div>
        </div>
        <div class="kpi-card amber">
          <div class="kpi-label">Bảo hành / dịch vụ đang mở</div>
          <div class="kpi-val mono">${openWrt ? openWrt.id : '0'}</div>
          <div class="kpi-sub">${openWrt ? esc(openWrt.note) : 'Không có yêu cầu mở'}</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:minmax(0,1.55fr) minmax(280px,0.85fr);gap:16px;align-items:start">
        <div style="display:flex;flex-direction:column;gap:16px">
          <div class="card">
            <div class="card-head"><h2 class="card-title">Dòng thời gian (Customer Timeline)</h2><span class="muted-xs">${timeline.length} sự kiện</span></div>
            <div class="card-body">
              <div class="ref-timeline">
                ${timeline.map((t) => `
                  <div class="ref-tl-item">
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                      <span class="badge ${t.badge}">${t.tag}</span>
                      <strong>${esc(t.title)}</strong>
                    </div>
                    <div class="muted-xs" style="margin-top:2px">${esc(t.sub)}</div>
                    <div class="muted-xs mono" style="margin-top:2px">${esc(t.date)}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-head"><h2 class="card-title">Biểu đồ tiến triển độ cận (Eye Book)</h2></div>
            <div class="card-body">${renderMyopiaChartSVG(exams)}</div>
          </div>
        </div>

        <div class="card">
          <div class="card-head"><h2 class="card-title">Thông tin</h2></div>
          <div class="card-body">
            <div class="kv-list">
              <div class="kv-k">Điện thoại</div><div class="kv-v mono">${esc(c.phone)}</div>
              <div class="kv-k">Email</div><div class="kv-v">${esc(c.email || '—')}</div>
              <div class="kv-k">Ngày sinh</div><div class="kv-v mono">${esc(c.dob || '—')}</div>
              <div class="kv-k">Giới tính</div><div class="kv-v">${esc(c.gender || '—')}</div>
              <div class="kv-k">Địa chỉ</div><div class="kv-v">${esc(c.address || '—')}</div>
              <div class="kv-k">Nhóm gia đình</div><div class="kv-v">${esc(c.familyGroup || '—')}</div>
              <div class="kv-k">Zalo OA</div><div class="kv-v">${c.zaloLinked ? '<span class="badge badge-ok">Đã liên kết</span>' : '<span class="badge badge-warn">Chưa liên kết</span>'}</div>
              <div class="kv-k">Ghi chú</div><div class="kv-v muted">${esc(c.notes || '—')}</div>
              <div class="kv-k">Tạo lúc</div><div class="kv-v mono">${esc(c.createdAt || '—')}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('backToCustList').onclick = () => { state.activeCustomerDetailId = null; saveState(); renderAll(); };
    document.getElementById('cdAddRx').onclick = () => { ui.examCustId = c.id; state.activeStoreView = 'exam'; saveState(); renderAll(); };
    document.getElementById('cdAddApt').onclick = () => { state.activeStoreView = 'appointments'; saveState(); renderAll(); };
    document.getElementById('cdNewOrder').onclick = () => { ui.posCustomerId = c.id; state.activeStoreView = 'pos'; saveState(); renderAll(); };
    document.getElementById('cdEditCust').onclick = () => openCustomerCrudDrawer(c.id);
  }

  function openCustomerCrudDrawer(custId) {
    const c = custId ? getCustomer(custId) : null;
    openDrawer('KHÁCH HÀNG', c ? `Chỉnh sửa: ${c.name}` : 'Thêm khách hàng mới', `
      <form id="custCrudForm" style="display:flex;flex-direction:column;gap:11px">
        <div class="form-grid-2">
          <div class="field"><label>Họ và tên *</label><input name="name" class="input" value="${esc(c ? c.name : '')}" required /></div>
          <div class="field"><label>Số điện thoại *</label><input name="phone" class="input mono" value="${esc(c ? c.phone : '')}" required /></div>
        </div>
        <div class="form-grid-2">
          <div class="field"><label>Email</label><input name="email" class="input" value="${esc(c ? c.email : '')}" /></div>
          <div class="field"><label>Ngày sinh</label><input name="dob" type="date" class="input mono" value="${esc(c ? c.dob : '')}" /></div>
        </div>
        <div class="form-grid-2">
          <div class="field"><label>Giới tính</label><select name="gender" class="select"><option ${c && c.gender === 'Nữ' ? 'selected' : ''}>Nữ</option><option ${c && c.gender === 'Nam' ? 'selected' : ''}>Nam</option></select></div>
          <div class="field"><label>Hạng thành viên</label><select name="tier" class="select"><option ${c && c.tier.includes('mới') ? 'selected' : ''}>Khách mới</option><option ${c && c.tier.includes('Silver') ? 'selected' : ''}>Khách quen (Silver)</option><option ${c && c.tier.includes('Gold') ? 'selected' : ''}>Khách thân thiết (Gold)</option></select></div>
        </div>
        <div class="field"><label>Địa chỉ</label><input name="address" class="input" value="${esc(c ? c.address : '')}" /></div>
        <div class="field"><label>Ghi chú phục vụ</label><textarea name="notes" rows="2" class="textarea">${esc(c ? c.notes : '')}</textarea></div>
        <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="zaloLinked" ${c && c.zaloLinked ? 'checked' : ''} /> Đã liên kết nhận thông báo Zalo OA</label>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:6px">
          <button type="button" class="btn" onclick="document.getElementById('closeDrawerBtn').click()">Hủy</button>
          <button type="submit" class="btn btn-primary">${c ? 'Lưu thay đổi' : 'Tạo khách hàng'}</button>
        </div>
      </form>
    `);
    document.getElementById('custCrudForm').onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = {
        name: fd.get('name'), phone: fd.get('phone'), email: fd.get('email'), dob: fd.get('dob'),
        gender: fd.get('gender'), tier: fd.get('tier'), address: fd.get('address'), notes: fd.get('notes'),
        zaloLinked: fd.get('zaloLinked') === 'on', zaloConsent: fd.get('zaloLinked') === 'on'
      };
      if (c) Object.assign(c, data);
      else state.customers.unshift({ id: 'CUS-' + String(state.customers.length + 1).padStart(3, '0'), ...data, familyGroup: '', totalSpent: 0, createdAt: todayStr() });
      saveState(); closeDrawer(); renderAll(); toast(c ? 'Đã cập nhật thông tin khách hàng!' : 'Đã thêm khách hàng mới!');
    };
  }

  // -------------------- 7. PRODUCTS & INVENTORY LEDGER (FULL CRUD + SEARCH + PAGINATION) --------------------
  function renderProductsInventoryView(container) {
    const filtered = state.products.filter((p) => {
      if (ui.prodCat !== 'ALL' && p.category !== ui.prodCat) return false;
      if (ui.prodStock === 'LOW' && !(p.trackStock && p.stock <= p.minStock)) return false;
      if (ui.prodStock === 'OUT' && !(p.trackStock && p.stock === 0)) return false;
      if (ui.prodSearch) {
        const q = ui.prodSearch.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      }
      return true;
    });
    const pg = paginate(filtered, ui.prodPage, 10);
    ui.prodPage = pg.page;

    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Sản phẩm &amp; Kho hàng theo giao dịch</h1><p class="page-sub">Đầy đủ CRUD sản phẩm + Search/Filter/Pagination + Sổ giao dịch kho bất biến (InventoryTransaction)</p></div>
        <div style="display:flex;gap:8px">
          <button class="btn" id="openInvTxBtn">+ Nhập kho / Kiểm kê</button>
          <button class="btn btn-primary" id="addProdBtn">+ Thêm sản phẩm</button>
        </div>
      </div>

      <div class="crud-toolbar">
        <div class="search-box">${ICONS.search}<input id="prodSearch" class="input" placeholder="Tìm tên sản phẩm, mã SKU, thương hiệu..." value="${esc(ui.prodSearch)}" /></div>
        <select id="prodStockSel" class="select" style="width:auto">
          <option value="ALL" ${ui.prodStock === 'ALL' ? 'selected' : ''}>Mọi tồn kho</option>
          <option value="LOW" ${ui.prodStock === 'LOW' ? 'selected' : ''}>Sắp hết / Hết hàng</option>
          <option value="OUT" ${ui.prodStock === 'OUT' ? 'selected' : ''}>Hết hàng (0)</option>
        </select>
        <div class="pill-group">
          ${['ALL','FRAME','LENS_BLANK','SUNGLASSES','ACCESSORY','CONSUMABLE','SERVICE'].map((c) => `<button class="pill ${ui.prodCat === c ? 'active' : ''}" data-pcat="${c}">${c === 'ALL' ? 'Tất cả' : CATEGORY_LABEL[c]}</button>`).join('')}
        </div>
      </div>

      <div class="card" style="margin-bottom:18px">
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>SKU</th><th>Sản phẩm</th><th>Nhóm</th><th class="num">Giá bán</th>${state.role === 'OWNER_ADMIN' ? '<th class="num">Giá vốn</th>' : ''}<th class="num">Tồn</th><th>Thao tác</th></tr></thead>
            <tbody>
              ${pg.items.map((p) => `
                <tr>
                  <td class="mono" style="font-weight:600">${esc(p.sku)}</td>
                  <td><strong>${esc(p.name)}</strong><div class="muted-xs">${esc(p.brand)} · ${esc(p.specs)}</div></td>
                  <td><span class="badge badge-neutral">${CATEGORY_LABEL[p.category]}</span></td>
                  <td class="num mono">${fmtVnd(p.price)}</td>
                  ${state.role === 'OWNER_ADMIN' ? `<td class="num mono muted">${fmtVnd(p.cost)}</td>` : ''}
                  <td class="num mono">${!p.trackStock ? '—' : `<span class="badge ${p.stock === 0 ? 'badge-err' : p.stock <= p.minStock ? 'badge-warn' : 'badge-ok'}">${p.stock}</span>`}</td>
                  <td style="white-space:nowrap">
                    <button class="btn btn-xs" data-editprod="${p.id}">Sửa</button>
                    <button class="btn btn-xs btn-danger" data-delprod="${p.id}">Xóa</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        ${renderPaginationBar(pg, 'prodpage')}
      </div>

      <div class="card">
        <div class="card-head"><h2 class="card-title">Sổ Nhật ký Giao dịch Kho gần nhất (${state.inventoryTransactions.length})</h2></div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Mã</th><th>Thời gian</th><th>Loại</th><th>Sản phẩm</th><th class="num">SL</th><th>Chứng từ</th><th>Diễn giải</th></tr></thead>
            <tbody>
              ${state.inventoryTransactions.slice(0, 8).map((t) => {
                const p = getProduct(t.productId);
                return `<tr>
                  <td class="mono">${t.id}</td><td class="mono muted-xs">${t.date}</td>
                  <td><span class="badge ${t.type === 'INBOUND' ? 'badge-ok' : t.type === 'LAB_SPOILAGE' ? 'badge-err' : 'badge-info'}">${t.type}</span></td>
                  <td>${esc(p ? p.name : t.productId)}</td>
                  <td class="num mono" style="font-weight:700;color:${t.qty >= 0 ? 'var(--ok-text)' : 'var(--err-text)'}">${t.qty > 0 ? '+' + t.qty : t.qty}</td>
                  <td class="mono">${esc(t.ref)}</td><td class="muted">${esc(t.note)}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById('prodSearch').oninput = (e) => { ui.prodSearch = e.target.value; ui.prodPage = 1; renderProductsInventoryView(container); };
    document.getElementById('prodStockSel').onchange = (e) => { ui.prodStock = e.target.value; ui.prodPage = 1; renderProductsInventoryView(container); };
    container.querySelectorAll('[data-pcat]').forEach((b) => b.onclick = () => { ui.prodCat = b.dataset.pcat; ui.prodPage = 1; renderProductsInventoryView(container); });
    container.querySelectorAll('[data-prodpage]').forEach((b) => b.onclick = () => { ui.prodPage = Number(b.dataset.prodpage); renderProductsInventoryView(container); });
    document.getElementById('addProdBtn').onclick = () => openProductCrudDrawer(null);
    container.querySelectorAll('[data-editprod]').forEach((b) => b.onclick = () => openProductCrudDrawer(b.dataset.editprod));
    container.querySelectorAll('[data-delprod]').forEach((b) => b.onclick = () => {
      state.products = state.products.filter((x) => x.id !== b.dataset.delprod);
      saveState(); renderAll(); toast('Đã xóa sản phẩm khỏi danh mục.');
    });
    document.getElementById('openInvTxBtn').onclick = () => {
      openDrawer('KHO HÀNG', 'Nhập kho / Điều chỉnh kiểm kê', `
        <form id="invTxForm" style="display:flex;flex-direction:column;gap:11px">
          <div class="field"><label>Sản phẩm</label><select name="productId" class="select">${state.products.filter((p) => p.trackStock).map((p) => `<option value="${p.id}">[${p.sku}] ${esc(p.name)} (Tồn ${p.stock})</option>`).join('')}</select></div>
          <div class="form-grid-2">
            <div class="field"><label>Loại giao dịch</label><select name="type" class="select"><option value="INBOUND">INBOUND — Nhập NCC</option><option value="ADJUSTMENT">ADJUSTMENT — Kiểm kê</option><option value="LAB_CONSUME">LAB_CONSUME — Xuất lô Lab</option></select></div>
            <div class="field"><label>Số lượng (+ / −)</label><input name="qty" type="number" class="input mono" value="5" required /></div>
          </div>
          <div class="field"><label>Chứng từ</label><input name="ref" class="input mono" value="PO-2611-NEW" /></div>
          <div class="field"><label>Diễn giải</label><input name="note" class="input" value="Nhập bổ sung tồn kho" /></div>
          <div style="display:flex;justify-content:flex-end;gap:8px"><button type="submit" class="btn btn-primary">Ghi sổ giao dịch</button></div>
        </form>
      `);
      document.getElementById('invTxForm').onsubmit = (e) => {
        e.preventDefault(); const fd = new FormData(e.target);
        logInventory(fd.get('productId'), fd.get('type'), Number(fd.get('qty')), fd.get('ref'), fd.get('note'));
        saveState(); closeDrawer(); renderAll(); toast('Đã ghi sổ giao dịch kho!');
      };
    };
  }

  function openProductCrudDrawer(prodId) {
    const p = prodId ? getProduct(prodId) : null;
    openDrawer('SẢN PHẨM', p ? `Sửa: ${p.sku}` : 'Thêm sản phẩm mới', `
      <form id="prodCrudForm" style="display:flex;flex-direction:column;gap:11px">
        <div class="form-grid-2">
          <div class="field"><label>Mã SKU *</label><input name="sku" class="input mono" value="${esc(p ? p.sku : 'GK-NEW-001')}" required /></div>
          <div class="field"><label>Thương hiệu *</label><input name="brand" class="input" value="${esc(p ? p.brand : 'Matsuda Craft')}" required /></div>
        </div>
        <div class="field"><label>Tên sản phẩm *</label><input name="name" class="input" value="${esc(p ? p.name : '')}" required /></div>
        <div class="form-grid-3">
          <div class="field"><label>Nhóm</label><select name="category" class="select">${Object.entries(CATEGORY_LABEL).map(([k, v]) => `<option value="${k}" ${p && p.category === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
          <div class="field"><label>Giá bán (VNĐ)</label><input name="price" type="number" class="input mono" value="${p ? p.price : 850000}" /></div>
          <div class="field"><label>Giá vốn (VNĐ)</label><input name="cost" type="number" class="input mono" value="${p ? p.cost : 400000}" /></div>
        </div>
        <div class="form-grid-2">
          <div class="field"><label>Dáng kính (cho Try-On)</label><select name="shape" class="select"><option value="round" ${p && p.shape === 'round' ? 'selected' : ''}>Tròn (Round)</option><option value="square" ${p && p.shape === 'square' ? 'selected' : ''}>Vuông (Square)</option><option value="cateye" ${p && p.shape === 'cateye' ? 'selected' : ''}>Mắt mèo (Cat-eye)</option><option value="aviator" ${p && p.shape === 'aviator' ? 'selected' : ''}>Phi công (Aviator)</option><option value="rimless" ${p && p.shape === 'rimless' ? 'selected' : ''}>Không viền</option></select></div>
          <div class="field"><label>Kích thước (Mắt-Cầu-Càng)</label><input name="dims" class="input mono" value="${esc(p ? p.dims : '50-19-145')}" /></div>
        </div>
        <div class="field"><label>Mô tả kỹ thuật</label><input name="specs" class="input" value="${esc(p ? p.specs : '')}" /></div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:6px">
          <button type="button" class="btn" onclick="document.getElementById('closeDrawerBtn').click()">Hủy</button>
          <button type="submit" class="btn btn-primary">${p ? 'Cập nhật' : 'Thêm sản phẩm'}</button>
        </div>
      </form>
    `);
    document.getElementById('prodCrudForm').onsubmit = (e) => {
      e.preventDefault(); const fd = new FormData(e.target);
      const data = { sku: fd.get('sku'), brand: fd.get('brand'), name: fd.get('name'), category: fd.get('category'), price: Number(fd.get('price')), cost: Number(fd.get('cost')), shape: fd.get('shape'), dims: fd.get('dims'), specs: fd.get('specs') };
      if (p) Object.assign(p, data);
      else state.products.unshift({ id: 'PRD-' + String(state.products.length + 1).padStart(2, '0'), ...data, stock: 5, minStock: 2, trackStock: data.category !== 'SERVICE', colorHex: '#1F2937', faces: ['Mặt trái xoan', 'Mặt tròn'] });
      saveState(); closeDrawer(); renderAll(); toast(p ? 'Đã cập nhật sản phẩm!' : 'Đã thêm sản phẩm mới!');
    };
  }

  // -------------------- 8. APPOINTMENTS & WARRANTY & CRM AUTOMATION --------------------
  function renderAppointmentsView(container) {
    const filtered = state.appointments.filter((a) => {
      if (ui.aptType !== 'ALL' && a.type !== ui.aptType) return false;
      if (ui.aptSearch) {
        const q = ui.aptSearch.toLowerCase();
        return a.customerName.toLowerCase().includes(q) || a.phone.includes(q) || a.productRef.toLowerCase().includes(q);
      }
      return true;
    });

    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Lịch hẹn &amp; Yêu cầu mua hàng Online</h1><p class="page-sub">Đồng bộ tức thì từ Website công khai · Tìm kiếm, lọc, xác nhận và gửi Zalo tự động</p></div>
      </div>
      <div class="crud-toolbar">
        <div class="search-box">${ICONS.search}<input id="aptSearch" class="input" placeholder="Tìm khách hàng, SĐT, nội dung..." value="${esc(ui.aptSearch)}" /></div>
        <div class="pill-group">
          ${['ALL','APPOINTMENT','ORDER_INQUIRY'].map((t) => `<button class="pill ${ui.aptType === t ? 'active' : ''}" data-aptt="${t}">${t === 'ALL' ? 'Tất cả' : t === 'APPOINTMENT' ? 'Lịch đo mắt' : 'Yêu cầu mua hàng'}</button>`).join('')}
        </div>
      </div>
      <div class="card"><div class="table-wrap"><table class="data-table">
        <thead><tr><th>Mã</th><th>Loại</th><th>Khách hàng</th><th>Thời gian hẹn</th><th>Nội dung / Mẫu quan tâm</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
        <tbody>
          ${filtered.map((a) => `<tr>
            <td class="mono">${a.id}</td>
            <td><span class="badge ${a.type === 'APPOINTMENT' ? 'badge-info' : 'badge-teal'}">${a.type === 'APPOINTMENT' ? 'Đặt lịch' : 'Yêu cầu mua'}</span></td>
            <td><strong>${esc(a.customerName)}</strong><div class="muted-xs mono">${esc(a.phone)}</div></td>
            <td class="mono">${esc(a.scheduledAt)}</td>
            <td>${esc(a.productRef)}</td>
            <td><span class="badge ${a.status === 'CONFIRMED' ? 'badge-ok' : 'badge-warn'}">${a.status}</span></td>
            <td style="white-space:nowrap">
              ${a.status === 'PENDING' ? `<button class="btn btn-xs btn-primary" data-okapt="${a.id}">Xác nhận</button>` : ''}
              <button class="btn btn-xs btn-danger" data-delapt="${a.id}">Xóa</button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table></div></div>
    `;
    document.getElementById('aptSearch').oninput = (e) => { ui.aptSearch = e.target.value; renderAppointmentsView(container); };
    container.querySelectorAll('[data-aptt]').forEach((b) => b.onclick = () => { ui.aptType = b.dataset.aptt; renderAppointmentsView(container); });
    container.querySelectorAll('[data-okapt]').forEach((b) => b.onclick = () => {
      const a = state.appointments.find((x) => x.id === b.dataset.okapt);
      a.status = 'CONFIRMED';
      pushZalo(a.customerName, a.phone, 'APPOINTMENT_CONFIRMED', `Xác nhận ${a.productRef} lúc ${a.scheduledAt} tại 148 Xã Đàn.`);
      saveState(); renderAll(); toast('Đã xác nhận & đẩy Zalo OA!');
    });
    container.querySelectorAll('[data-delapt]').forEach((b) => b.onclick = () => {
      state.appointments = state.appointments.filter((x) => x.id !== b.dataset.delapt);
      saveState(); renderAll(); toast('Đã xóa lịch hẹn.');
    });
  }

  function renderWarrantyView(container) {
    const filtered = state.warranties.filter((w) => {
      const c = getCustomer(w.customerId);
      if (ui.wrtStatus !== 'ALL' && w.status !== ui.wrtStatus) return false;
      if (ui.wrtSearch) {
        const q = ui.wrtSearch.toLowerCase();
        return w.id.toLowerCase().includes(q) || w.issueType.toLowerCase().includes(q) || (c && c.name.toLowerCase().includes(q));
      }
      return true;
    });

    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Bảo hành &amp; Dịch vụ Sau bán</h1><p class="page-sub">Gắn trực tiếp vào vòng đời từng bộ kính (CustomerEyewear)</p></div>
        <button class="btn btn-primary" id="addWrtBtn">+ Tiếp nhận Bảo hành</button>
      </div>
      <div class="crud-toolbar">
        <div class="search-box">${ICONS.search}<input id="wrtSearch" class="input" placeholder="Tìm mã phiếu, tên khách, nội dung..." value="${esc(ui.wrtSearch)}" /></div>
        <div class="pill-group">
          ${['ALL','OPEN','COMPLETED'].map((s) => `<button class="pill ${ui.wrtStatus === s ? 'active' : ''}" data-wrtst="${s}">${s === 'ALL' ? 'Tất cả' : s}</button>`).join('')}
        </div>
      </div>
      <div class="card"><div class="table-wrap"><table class="data-table">
        <thead><tr><th>Mã</th><th>Ngày</th><th>Khách hàng</th><th>Mã kính</th><th>Nội dung xử lý</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
        <tbody>
          ${filtered.map((w) => {
            const c = getCustomer(w.customerId);
            return `<tr>
              <td class="mono">${w.id}</td><td class="mono">${w.date}</td>
              <td><strong>${esc(c ? c.name : '')}</strong></td><td class="mono">${w.eyewearId}</td>
              <td><strong>${esc(w.issueType)}</strong><div class="muted-xs">${esc(w.note)}</div></td>
              <td><span class="badge ${w.status === 'COMPLETED' ? 'badge-ok' : 'badge-warn'}">${w.status}</span></td>
              <td>${w.status === 'OPEN' ? `<button class="btn btn-xs btn-primary" data-donewrt="${w.id}">Hoàn tất</button>` : '—'}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table></div></div>
    `;
    document.getElementById('wrtSearch').oninput = (e) => { ui.wrtSearch = e.target.value; renderWarrantyView(container); };
    container.querySelectorAll('[data-wrtst]').forEach((b) => b.onclick = () => { ui.wrtStatus = b.dataset.wrtst; renderWarrantyView(container); });
    container.querySelectorAll('[data-donewrt]').forEach((b) => b.onclick = () => {
      const w = state.warranties.find((x) => x.id === b.dataset.donewrt);
      if (w) w.status = 'COMPLETED';
      saveState(); renderAll(); toast('Đã hoàn tất phiếu bảo hành!');
    });
    document.getElementById('addWrtBtn').onclick = () => {
      openDrawer('BẢO HÀNH & DỊCH VỤ', 'Tiếp nhận phiếu bảo hành mới', `
        <form id="newWrtForm" style="display:flex;flex-direction:column;gap:11px">
          <div class="field"><label>Bộ kính của khách</label><select name="eyewearId" class="select">${state.eyewearUnits.map((e) => { const c = getCustomer(e.customerId); return `<option value="${e.id}">[${e.id}] ${esc(c ? c.name : '')} — ${esc(e.frameName)}</option>`; }).join('')}</select></div>
          <div class="field"><label>Hạng mục xử lý</label><select name="issueType" class="select"><option>Chỉnh gọng &amp; Thay đệm mũi</option><option>Bảo hành thích nghi số độ (15–30 ngày)</option><option>Bảo hành lớp váng phủ tròng</option><option>Thay bản lề / Hàn gọng</option></select></div>
          <div class="field"><label>Ghi chú</label><textarea name="note" rows="2" class="textarea" required placeholder="Mô tả yêu cầu của khách..."></textarea></div>
          <div style="display:flex;justify-content:flex-end"><button type="submit" class="btn btn-primary">Lưu phiếu</button></div>
        </form>
      `);
      document.getElementById('newWrtForm').onsubmit = (e) => {
        e.preventDefault(); const fd = new FormData(e.target);
        const eyw = state.eyewearUnits.find((x) => x.id === fd.get('eyewearId'));
        state.warranties.unshift({ id: 'WRT-' + String(state.warranties.length + 1).padStart(3, '0'), date: todayStr(), customerId: eyw.customerId, eyewearId: eyw.id, issueType: fd.get('issueType'), coverage: 'Trong hạn bảo hành', status: 'OPEN', fee: 0, note: fd.get('note') });
        saveState(); closeDrawer(); renderAll(); toast('Đã tiếp nhận phiếu bảo hành!');
      };
    };
  }

  function renderCrmAutomationView(container) {
    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Chăm sóc khách hàng Tự động &amp; Zalo OA Outbox</h1><p class="page-sub">Cấu hình kịch bản gửi tin tự động theo lịch (7 ngày sau mua, 6 tháng tái khám, trước lịch hẹn 2h) &amp; theo dõi Outbox</p></div>
      </div>

      <div class="card" style="margin-bottom:18px">
        <div class="card-head"><h2 class="card-title">Kịch bản gửi tin tự động theo lịch (CRM Automation Rules)</h2></div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
          ${state.automationRules.map((r) => `
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px;border:1px solid var(--border-subtle);border-radius:9px;flex-wrap:wrap">
              <div style="flex:1;min-width:240px">
                <div style="display:flex;align-items:center;gap:8px">
                  <strong>${esc(r.name)}</strong>
                  <span class="badge badge-info">${esc(r.trigger)}</span>
                  <span class="badge ${r.enabled ? 'badge-ok' : 'badge-neutral'}">${r.enabled ? 'Đang bật' : 'Tạm tắt'}</span>
                </div>
                <div class="muted-xs" style="margin-top:4px">"${esc(r.template)}"</div>
              </div>
              <div style="display:flex;gap:8px;align-items:center">
                <button class="btn btn-xs" data-toggleauto="${r.id}">${r.enabled ? 'Tạm tắt' : 'Bật lại'}</button>
                <button class="btn btn-xs btn-primary" data-runauto="${r.id}">Chạy thử gửi ngay</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h2 class="card-title">Nhật ký gửi Zalo OA (Transactional Outbox Log)</h2></div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Mã</th><th>Thời gian</th><th>Sự kiện</th><th>Khách nhận</th><th>Nội dung</th><th>Trạng thái</th><th></th></tr></thead>
            <tbody>
              ${state.zaloOutbox.map((z) => `<tr>
                <td class="mono">${z.id}</td><td class="mono muted-xs">${z.time}</td>
                <td class="mono" style="font-size:11.5px">${z.event}</td>
                <td><strong>${esc(z.customerName)}</strong><div class="muted-xs mono">${esc(z.phone)}</div></td>
                <td>${esc(z.message)}</td>
                <td><span class="badge ${z.status === 'DELIVERED' ? 'badge-ok' : 'badge-err'}">${z.status}</span></td>
                <td>${z.status !== 'DELIVERED' ? `<button class="btn btn-xs" data-retryz="${z.id}">Retry</button>` : ''}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    container.querySelectorAll('[data-toggleauto]').forEach((b) => b.onclick = () => {
      const r = state.automationRules.find((x) => x.id === b.dataset.toggleauto);
      if (r) r.enabled = !r.enabled;
      saveState(); renderAll();
    });
    container.querySelectorAll('[data-runauto]').forEach((b) => b.onclick = () => {
      const r = state.automationRules.find((x) => x.id === b.dataset.runauto);
      const c = state.customers[0];
      pushZalo(c.name, c.phone, `AUTO_${r.id}`, r.template.replace('{{name}}', c.name).replace('{{time}}', '17:30').replace('{{frame}}', 'Gọng Titanium Nhật'), c);
      saveState(); renderAll(); toast(`Đã chạy thử kịch bản "${r.name}" và đẩy vào Zalo Outbox!`);
    });
    container.querySelectorAll('[data-retryz]').forEach((b) => b.onclick = () => {
      const z = state.zaloOutbox.find((x) => x.id === b.dataset.retryz);
      if (z) { z.status = 'DELIVERED'; z.message += ' [Retry OK]'; saveState(); renderAll(); toast(`Gửi lại thành công ${z.id}`); }
    });
  }

  // ==================== SURFACE 2: PUBLIC WEBSITE, MULTI-ANGLE VIEWER, VIRTUAL TRY-ON, EYE BOOK & AI ====================
  function renderPortalCustomerSelect() {
    document.getElementById('portalCustomerSelect').innerHTML = state.customers.map((c) => `<option value="${c.id}" ${c.id === state.portalCustomerId ? 'selected' : ''}>${esc(c.name)} (${esc(c.phone)})</option>`).join('');
  }

  function renderPublicView() {
    const main = document.getElementById('publicMain');
    if (state.activePublicView !== 'tryon') stopTryonCamera();
    if (state.activePublicView === 'storefront') renderPublicStorefront(main);
    else if (state.activePublicView === 'tryon') renderPublicTryOn(main);
    else if (state.activePublicView === 'booking') renderPublicBooking(main);
    else renderPublicEyeBook(main);
  }

  function renderPublicStorefront(container) {
    const list = state.products.filter((p) => {
      if (!['FRAME', 'SUNGLASSES', 'LENS_BLANK'].includes(p.category)) return false;
      if (ui.pubCat !== 'ALL' && p.category !== ui.pubCat) return false;
      if (ui.pubFace !== 'ALL' && !(p.faces || []).includes(ui.pubFace)) return false;
      if (ui.pubSearch) {
        const q = ui.pubSearch.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q);
      }
      return true;
    });
    const pg = paginate(list, ui.pubPage, 6);
    ui.pubPage = pg.page;

    container.innerHTML = `
      <div class="pub-container">
        <section class="pub-hero">
          <div>
            <span class="badge badge-teal">Cửa hàng Quang học Độc lập &amp; Phòng Lab nội bộ</span>
            <h1 class="pub-h1">Đo mắt chuẩn khúc xạ, thử kính trực tuyến và lưu trọn Sổ Kính cá nhân.</h1>
            <p class="muted" style="max-width:58ch;margin:0 0 18px">Khám phá bộ sưu tập gọng kính, xem chi tiết đa góc cạnh, thử kính trực tiếp lên khuôn mặt hoặc hỏi Trợ lý AI Quang học trước khi ghé 148 Xã Đàn.</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <button class="btn btn-primary" id="heroTryOnBtn">Thử kính Online (AI Try-On)</button>
              <button class="btn" id="heroBookBtn">Đặt lịch đo mắt</button>
            </div>
          </div>
          <div class="card" style="padding:16px">
            <div class="kv-list">
              <div class="kv-k">Địa chỉ</div><div class="kv-v">148 Xã Đàn, Đống Đa, HN</div>
              <div class="kv-k">Giờ mở cửa</div><div class="kv-v">08:30 – 20:30 hàng ngày</div>
              <div class="kv-k">Gia công</div><div class="kv-v">Mài lắp &amp; QC 4 bước tại chỗ</div>
              <div class="kv-k">Thanh toán</div><div class="kv-v">Tại cửa hàng (Tiền mặt / CK)</div>
            </div>
          </div>
        </section>

        <div class="crud-toolbar" style="margin-top:20px">
          <div class="search-box">${ICONS.search}<input id="pubSearch" class="input" placeholder="Tìm mẫu kính, thương hiệu, tính năng..." value="${esc(ui.pubSearch)}" /></div>
          <select id="pubFaceSel" class="select" style="width:auto">
            <option value="ALL">Mọi dáng khuôn mặt</option>
            ${['Mặt tròn','Mặt trái xoan','Mặt vuông','Mặt dài'].map((f) => `<option value="${f}" ${ui.pubFace === f ? 'selected' : ''}>Hợp ${f}</option>`).join('')}
          </select>
          <div class="pill-group">
            ${['ALL','FRAME','SUNGLASSES','LENS_BLANK'].map((c) => `<button class="pill ${ui.pubCat === c ? 'active' : ''}" data-pubc="${c}">${c === 'ALL' ? 'Tất cả' : CATEGORY_LABEL[c]}</button>`).join('')}
          </div>
        </div>

        <div class="pub-grid">
          ${pg.items.map((p) => `
            <article class="pub-card">
              <div class="pub-visual">
                ${renderGlassesSVG(p.shape, p.colorHex, 'front', 140)}
                <span class="badge ${p.stock === 0 ? 'badge-warn' : 'badge-ok'}" style="position:absolute;top:8px;right:8px">${p.stock === 0 ? 'Đặt trước' : 'Sẵn hàng'}</span>
              </div>
              <div class="muted-xs mono">${esc(p.brand)} · Size ${esc(p.dims)}</div>
              <div style="font-weight:700;font-size:14px;line-height:1.35">${esc(p.name)}</div>
              <div class="muted-xs">${esc(p.specs)}</div>
              ${p.faces.length ? `<div style="display:flex;gap:4px;flex-wrap:wrap">${p.faces.map((f) => `<span class="badge badge-neutral" style="font-size:10.5px">${f}</span>`).join('')}</div>` : ''}
              <div style="margin-top:auto;padding-top:10px;border-top:1px solid var(--paper-border);display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap">
                <strong class="mono" style="font-size:15px;color:var(--accent-primary)">${fmtVnd(p.price)}</strong>
                <div style="display:flex;gap:5px">
                  <button class="btn btn-xs" data-viewangles="${p.id}">Góc cạnh</button>
                  ${p.category !== 'LENS_BLANK' ? `<button class="btn btn-xs" data-tryprod="${p.id}">Thử mặt</button>` : ''}
                  <button class="btn btn-xs btn-primary" data-inqprod="${p.id}">Đặt giữ</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
        <div class="card">${renderPaginationBar(pg, 'pubpage')}</div>
      </div>
    `;

    document.getElementById('heroTryOnBtn').onclick = () => { state.activePublicView = 'tryon'; saveState(); renderAll(); };
    document.getElementById('heroBookBtn').onclick = () => { state.activePublicView = 'booking'; saveState(); renderAll(); };
    document.getElementById('pubSearch').oninput = (e) => { ui.pubSearch = e.target.value; ui.pubPage = 1; renderPublicStorefront(container); };
    document.getElementById('pubFaceSel').onchange = (e) => { ui.pubFace = e.target.value; ui.pubPage = 1; renderPublicStorefront(container); };
    container.querySelectorAll('[data-pubc]').forEach((b) => b.onclick = () => { ui.pubCat = b.dataset.pubc; ui.pubPage = 1; renderPublicStorefront(container); });
    container.querySelectorAll('[data-pubpage]').forEach((b) => b.onclick = () => { ui.pubPage = Number(b.dataset.pubpage); renderPublicStorefront(container); });
    container.querySelectorAll('[data-tryprod]').forEach((b) => b.onclick = () => { ui.tryonProductId = b.dataset.tryprod; state.activePublicView = 'tryon'; saveState(); renderAll(); });
    container.querySelectorAll('[data-viewangles]').forEach((b) => b.onclick = () => openMultiAngleModal(b.dataset.viewangles));
    container.querySelectorAll('[data-inqprod]').forEach((b) => b.onclick = () => openPublicInquiryModal(b.dataset.inqprod));
  }

  function openMultiAngleModal(prodId) {
    const p = getProduct(prodId);
    if (!p) return;
    let angle = 'front';
    const draw = () => {
      openModal(`Chi tiết đa góc cạnh — ${p.name}`, `
        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="height:180px;background:#F4F6F6;border-radius:10px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border-subtle)">
            ${renderGlassesSVG(p.shape, p.colorHex, angle, 240)}
          </div>
          <div class="pill-group" style="justify-content:center">
            ${[['front','Chính diện'],['45deg','Góc nghiêng 45°'],['side','Càng kính ngang'],['dims','Bản vẽ kích thước']].map(([k, l]) => `
              <button class="pill ${angle === k ? 'active' : ''}" data-ang="${k}">${l}</button>
            `).join('')}
          </div>
          <div class="kv-list">
            <div class="kv-k">Mã SKU</div><div class="kv-v mono">${esc(p.sku)}</div>
            <div class="kv-k">Kích thước</div><div class="kv-v mono">${esc(p.dims)} (Mắt – Cầu mũi – Càng)</div>
            <div class="kv-k">Thông số</div><div class="kv-v">${esc(p.specs)}</div>
            <div class="kv-k">Giá bán</div><div class="kv-v mono" style="color:var(--accent-primary);font-weight:700">${fmtVnd(p.price)}</div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:8px">
            ${p.category !== 'LENS_BLANK' ? `<button class="btn" id="angTryBtn">Thử lên khuôn mặt →</button>` : ''}
            <button class="btn btn-primary" id="angInqBtn">Gửi yêu cầu giữ mẫu</button>
          </div>
        </div>
      `);
      document.querySelectorAll('[data-ang]').forEach((b) => b.onclick = () => { angle = b.dataset.ang; draw(); });
      const tb = document.getElementById('angTryBtn');
      if (tb) tb.onclick = () => { closeModal(); ui.tryonProductId = p.id; state.activePublicView = 'tryon'; saveState(); renderAll(); };
      document.getElementById('angInqBtn').onclick = () => { closeModal(); openPublicInquiryModal(p.id); };
    };
    draw();
  }

  function openPublicInquiryModal(prodId) {
    const p = getProduct(prodId);
    const c = getCustomer(state.portalCustomerId);
    openModal('Đặt giữ mẫu / Yêu cầu mua hàng', `
      <form id="pubInqForm" style="display:flex;flex-direction:column;gap:11px">
        <div style="padding:10px;background:var(--bg-subtle);border-radius:8px"><strong>${esc(p.name)}</strong> — <span class="mono">${fmtVnd(p.price)}</span></div>
        <div class="form-grid-2">
          <div class="field"><label>Họ tên</label><input name="name" class="input" value="${esc(c ? c.name : '')}" required /></div>
          <div class="field"><label>Số điện thoại</label><input name="phone" class="input mono" value="${esc(c ? c.phone : '')}" required /></div>
        </div>
        <div class="field"><label>Thời gian dự kiến ghé cửa hàng</label><input name="when" class="input" value="2026-11-20 17:30" /></div>
        <div style="display:flex;justify-content:flex-end;gap:8px"><button type="submit" class="btn btn-primary">Gửi yêu cầu</button></div>
      </form>
    `);
    document.getElementById('pubInqForm').onsubmit = (e) => {
      e.preventDefault(); const fd = new FormData(e.target);
      state.appointments.unshift({ id: 'APT-' + String(state.appointments.length + 1).padStart(3, '0'), createdAt: nowStr(), customerName: fd.get('name'), phone: fd.get('phone'), type: 'ORDER_INQUIRY', scheduledAt: fd.get('when'), productRef: p.name, status: 'PENDING', source: 'WEBSITE' });
      saveState(); closeModal(); toast('Đã gửi yêu cầu! Chuyển sang Cửa hàng → Lịch hẹn để thấy bản ghi mới.');
    };
  }

  // -------------------- VIRTUAL TRY-ON STUDIO --------------------
  function stopTryonCamera() {
    if (ui.tryonCameraStream) {
      ui.tryonCameraStream.getTracks().forEach((t) => t.stop());
      ui.tryonCameraStream = null;
    }
  }

  function renderPublicTryOn(container) {
    const frames = state.products.filter((p) => p.category === 'FRAME' || p.category === 'SUNGLASSES');
    const selected = getProduct(ui.tryonProductId) || frames[0];
    const faceMap = {
      oval: { name: 'Mặt trái xoan', path: 'M150,35 C205,35 232,85 230,145 C228,205 192,245 150,245 C108,245 72,205 70,145 C68,85 95,35 150,35 Z' },
      round: { name: 'Mặt tròn', path: 'M150,42 C212,42 242,92 240,148 C238,204 202,240 150,240 C98,240 62,204 60,148 C58,92 88,42 150,42 Z' },
      square: { name: 'Mặt vuông', path: 'M150,38 C210,38 236,74 236,140 L232,204 C228,232 194,244 150,244 C106,244 72,232 68,204 L64,140 C64,74 90,38 150,38 Z' }
    };
    const isMatch = (selected.faces || []).includes(faceMap[ui.tryonFace].name);

    container.innerHTML = `
      <div class="pub-container">
        <div style="padding:22px 0 10px">
          <span class="badge badge-teal">Trải nghiệm tương tác · Virtual Try-On Studio</span>
          <h1 class="pub-h1" style="font-size:30px;margin:6px 0">Thử gọng kính trực tiếp lên khuôn mặt</h1>
          <p class="muted" style="margin:0">Chọn mẫu khuôn mặt mô phỏng hoặc bật Camera thật, sau đó thay đổi dáng gọng và căn chỉnh độ rộng ngay lập tức.</p>
        </div>

        <div class="tryon-layout">
          <div>
            <div class="tryon-stage" id="tryonStage">
              <video id="tryonVideo" class="tryon-video hidden" autoplay playsinline muted></video>
              <svg id="tryonFaceSvg" viewBox="0 0 300 280" style="width:74%;height:auto">
                <path d="${faceMap[ui.tryonFace].path}" fill="#F3D9C6" stroke="#D6B29B" stroke-width="2"/>
                <circle cx="115" cy="126" r="5" fill="#2C2420"/>
                <circle cx="185" cy="126" r="5" fill="#2C2420"/>
                <path d="M100,110 Q115,103 130,110" fill="none" stroke="#5C4438" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M170,110 Q185,103 200,110" fill="none" stroke="#5C4438" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M150,126 L146,162 L156,164" fill="none" stroke="#C99E85" stroke-width="2" stroke-linecap="round"/>
                <path d="M128,194 Q150,206 172,194" fill="none" stroke="#B46A5E" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
              <div class="tryon-glasses-overlay" id="tryonOverlay" style="top:${ui.tryonTop}%;transform:translate(-50%,-50%) scale(${ui.tryonScale / 100})">
                ${renderGlassesSVG(selected.shape, selected.colorHex, 'front', 190)}
              </div>
            </div>

            <div class="card" style="padding:12px;margin-top:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px">
                <div class="pill-group">
                  ${Object.entries(faceMap).map(([k, v]) => `<button class="pill ${ui.tryonFace === k ? 'active' : ''}" data-tface="${k}">${v.name}</button>`).join('')}
                </div>
                <button class="btn btn-sm btn-primary" id="toggleCamBtn">Bật Camera thật</button>
              </div>
              <div class="form-grid-2">
                <div class="field"><label>Kích thước gọng (${ui.tryonScale}%)</label><input type="range" id="tryonScaleRng" min="70" max="135" value="${ui.tryonScale}" style="width:100%" /></div>
                <div class="field"><label>Vị trí sống mũi (${ui.tryonTop}%)</label><input type="range" id="tryonTopRng" min="25" max="60" value="${ui.tryonTop}" style="width:100%" /></div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-head">
              <h2 class="card-title">Đang thử: ${esc(selected.name)}</h2>
              <span class="badge ${isMatch ? 'badge-ok' : 'badge-info'}">${isMatch ? 'AI: Rất hợp ' + faceMap[ui.tryonFace].name : 'AI: Phù hợp tương đối'}</span>
            </div>
            <div class="card-body">
              <div class="muted-xs" style="margin-bottom:10px">Size <span class="mono">${selected.dims}</span> · ${esc(selected.specs)} · <strong class="mono" style="color:var(--accent-primary)">${fmtVnd(selected.price)}</strong></div>
              <div style="display:flex;flex-direction:column;gap:8px;max-height:310px;overflow-y:auto;margin-bottom:12px">
                ${frames.map((f) => `
                  <div class="clickable" data-picktry="${f.id}" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;border:1px solid ${f.id === selected.id ? 'var(--accent-primary)' : 'var(--border-subtle)'};background:${f.id === selected.id ? 'var(--accent-subtle)' : '#FFF'};border-radius:8px;cursor:pointer">
                    <div style="display:flex;align-items:center;gap:10px">
                      ${renderGlassesSVG(f.shape, f.colorHex, 'front', 58)}
                      <div><div style="font-weight:600;font-size:12.5px">${esc(f.name)}</div><div class="muted-xs mono">${fmtVnd(f.price)} · ${esc(f.dims)}</div></div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <button class="btn btn-primary" style="width:100%" id="tryonBookSelectedBtn">Đặt giữ mẫu này đến thử thật tại cửa hàng</button>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-tface]').forEach((b) => b.onclick = () => { stopTryonCamera(); ui.tryonFace = b.dataset.tface; renderPublicTryOn(container); });
    container.querySelectorAll('[data-picktry]').forEach((el) => el.onclick = () => { ui.tryonProductId = el.dataset.picktry; renderPublicTryOn(container); });
    document.getElementById('tryonScaleRng').oninput = (e) => { ui.tryonScale = Number(e.target.value); document.getElementById('tryonOverlay').style.transform = `translate(-50%,-50%) scale(${ui.tryonScale / 100})`; };
    document.getElementById('tryonTopRng').oninput = (e) => { ui.tryonTop = Number(e.target.value); document.getElementById('tryonOverlay').style.top = ui.tryonTop + '%'; };
    document.getElementById('tryonBookSelectedBtn').onclick = () => openPublicInquiryModal(selected.id);
    document.getElementById('toggleCamBtn').onclick = async () => {
      const vid = document.getElementById('tryonVideo');
      const svg = document.getElementById('tryonFaceSvg');
      if (ui.tryonCameraStream) { stopTryonCamera(); vid.classList.add('hidden'); svg.classList.remove('hidden'); document.getElementById('toggleCamBtn').textContent = 'Bật Camera thật'; return; }
      try {
        ui.tryonCameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        vid.srcObject = ui.tryonCameraStream;
        vid.classList.remove('hidden'); svg.classList.add('hidden');
        document.getElementById('toggleCamBtn').textContent = 'Tắt Camera';
      } catch (_) {
        toast('Trình duyệt không cấp quyền Camera — bạn vẫn có thể thử mượt với 3 mẫu khuôn mặt!');
      }
    };
  }

  function renderPublicBooking(container) {
    const c = getCustomer(state.portalCustomerId);
    container.innerHTML = `
      <div class="pub-container" style="max-width:680px;padding-top:24px">
        <span class="badge badge-teal">148 Xã Đàn · Miễn phí đo khúc xạ</span>
        <h1 class="pub-h1" style="font-size:30px">Đặt lịch đo mắt &amp; tư vấn chọn kính</h1>
        <form id="pubBookForm" class="card" style="padding:20px;display:flex;flex-direction:column;gap:12px">
          <div class="form-grid-2">
            <div class="field"><label>Họ tên</label><input name="name" class="input" value="${esc(c ? c.name : '')}" required /></div>
            <div class="field"><label>Số điện thoại</label><input name="phone" class="input mono" value="${esc(c ? c.phone : '')}" required /></div>
          </div>
          <div class="form-grid-2">
            <div class="field"><label>Thời gian hẹn</label><input name="when" class="input mono" value="2026-11-20 10:30" required /></div>
            <div class="field"><label>Dịch vụ</label><select name="service" class="select"><option>Đo khúc xạ &amp; Cắt kính mới</option><option>Tái khám mắt định kỳ 6 tháng</option><option>Mang toa bệnh viện tới cắt tròng</option><option>Bảo hành / Chỉnh gọng miễn phí</option></select></div>
          </div>
          <button type="submit" class="btn btn-primary" style="align-self:flex-start">Xác nhận đặt lịch</button>
        </form>
      </div>
    `;
    document.getElementById('pubBookForm').onsubmit = (e) => {
      e.preventDefault(); const fd = new FormData(e.target);
      state.appointments.unshift({ id: 'APT-' + String(state.appointments.length + 1).padStart(3, '0'), createdAt: nowStr(), customerName: fd.get('name'), phone: fd.get('phone'), type: 'APPOINTMENT', scheduledAt: fd.get('when'), productRef: fd.get('service'), status: 'PENDING', source: 'WEBSITE' });
      saveState(); toast('Đặt lịch thành công! Lịch hẹn đã xuất hiện ngay trong phần Quản lý Cửa hàng.');
    };
  }

  function renderPublicEyeBook(container) {
    const c = getCustomer(state.portalCustomerId) || state.customers[0];
    const eyws = state.eyewearUnits.filter((e) => e.customerId === c.id);
    const exams = state.examinations.filter((e) => e.customerId === c.id).sort((a, b) => b.date.localeCompare(a.date));

    container.innerHTML = `
      <div class="pub-container" style="padding-top:22px">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:10px;margin-bottom:18px">
          <div>
            <span class="badge badge-teal">Customer Portal · Sổ Kính Cá Nhân</span>
            <h1 class="pub-h1" style="font-size:30px;margin:4px 0">Xin chào, ${esc(c.name)}</h1>
            <div class="muted-xs">${esc(c.tier)} · SĐT <span class="mono">${esc(c.phone)}</span></div>
          </div>
          <span class="badge ${c.zaloLinked ? 'badge-ok' : 'badge-warn'}">${c.zaloLinked ? '✓ Đang nhận tin qua Zalo OA' : 'Chưa liên kết Zalo OA'}</span>
        </div>

        <div class="split-2">
          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="card">
              <div class="card-head"><h2 class="card-title">Biểu đồ tiến triển độ cận của bạn</h2></div>
              <div class="card-body">${renderMyopiaChartSVG(exams)}</div>
            </div>
            <div class="card">
              <div class="card-head"><h2 class="card-title">Bộ kính của tôi &amp; Tiến độ gia công</h2></div>
              <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
                ${eyws.map((e) => {
                  const job = state.productionJobs.find((j) => j.id === e.jobId);
                  const idx = job ? STAGE_ORDER.indexOf(job.stage) : 5;
                  return `<div style="border:1px solid var(--border-subtle);border-radius:9px;padding:12px">
                    <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap">
                      <strong>${esc(e.frameName)}</strong>
                      <span class="badge ${e.status === 'HANDED_OVER' ? 'badge-ok' : e.status === 'READY' ? 'badge-teal' : 'badge-warn'}">${job ? STAGE_META[job.stage].label : 'Đã bàn giao'}</span>
                    </div>
                    <div class="muted-xs" style="margin-top:3px">Tròng: ${esc(e.lensName)} · Bảo hành đến <span class="mono">${e.warrantyUntil}</span></div>
                    ${job && job.stage !== 'HANDED_OVER' ? `<div class="stepper">${['CONFIRMED','PREP','CUT_MOUNT','QC','READY'].map((s, sIdx) => `<div class="step-pill ${sIdx < idx ? 'done' : sIdx === idx ? 'current' : ''}">${STAGE_META[s].label.replace(/^\d+\.\s*/, '')}</div>`).join('')}</div>` : ''}
                  </div>`;
                }).join('')}
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-head"><h2 class="card-title">Lịch sử Đo mắt &amp; Toa kính (${exams.length})</h2></div>
            <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
              ${exams.map((ex) => `
                <div style="border:1px solid var(--border-subtle);border-radius:9px;padding:12px">
                  <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <strong class="mono">${ex.date}</strong>
                    <span class="badge badge-neutral">${ex.source === 'IN_STORE' ? 'Đo tại Minh Quang' : ex.externalClinic}</span>
                  </div>
                  <div class="table-wrap">
                    <table class="rx-table">
                      <thead><tr><th>Mắt</th><th>SPH</th><th>CYL</th><th>AXIS</th><th>PD</th></tr></thead>
                      <tbody>
                        <tr><td><strong>OD</strong></td><td>${ex.prescription.od.sph}</td><td>${ex.prescription.od.cyl}</td><td>${ex.prescription.od.axis}°</td><td rowspan="2">${ex.prescription.pd}mm</td></tr>
                        <tr><td><strong>OS</strong></td><td>${ex.prescription.os.sph}</td><td>${ex.prescription.os.cyl}</td><td>${ex.prescription.os.axis}°</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="muted-xs" style="margin-top:6px"><strong>Tròng:</strong> ${esc(ex.lensConfig.lensName)} · ${esc(ex.note)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==================== AI OPTICAL ASSISTANT (SIMULATED SMART REPLY) ====================
  function renderAiChatMessages() {
    const box = document.getElementById('aiChatMessages');
    if (!box) return;
    box.innerHTML = ui.aiMessages.map((m) => `
      <div class="ai-msg ${m.from}">
        <div>${m.html || esc(m.text)}</div>
      </div>
    `).join('');
    box.scrollTop = box.scrollHeight;
    box.querySelectorAll('[data-aitry]').forEach((b) => b.onclick = () => {
      ui.tryonProductId = b.dataset.aitry;
      state.activePublicView = 'tryon';
      ui.aiOpen = false;
      document.getElementById('aiChatPanel').classList.add('hidden');
      saveState(); renderAll();
    });
  }

  function handleAiPrompt(text) {
    ui.aiMessages.push({ from: 'user', text });
    const q = text.toLowerCase();
    let html = '';
    if (q.includes('sph') || q.includes('cyl') || q.includes('pd') || q.includes('chỉ số')) {
      html = `<strong>Giải thích nhanh thông số toa kính:</strong><br/>• <strong>SPH (Độ cầu):</strong> Dấu <code>−</code> là cận thị, dấu <code>+</code> là viễn thị.<br/>• <strong>CYL &amp; AXIS:</strong> Độ loạn thị và trục loạn (0°–180°).<br/>• <strong>PD:</strong> Khoảng cách đồng tử hai mắt (mm) — rất quan trọng để mài đúng tâm quang học, tránh choáng mắt.`;
    } else if (q.includes('1.60') || q.includes('1.67') || q.includes('chiết suất')) {
      html = `<strong>Tư vấn chọn chiết suất tròng:</strong><br/>• Độ cận <strong>0 đến −3.50D</strong>: Chiết suất <strong>1.60</strong> (như Essilor Crizal Rock 1.60) là tối ưu nhất về độ mỏng &amp; chi phí.<br/>• Độ cận <strong>−3.50D đến −6.00D</strong>: Nên chọn <strong>1.67 siêu mỏng</strong> để gọng nhẹ và thẩm mỹ hơn.`;
    } else {
      const matches = state.products.filter((p) => {
        if (p.category !== 'FRAME' && p.category !== 'SUNGLASSES') return false;
        if (q.includes('1 triệu') || q.includes('1tr')) return p.price <= 1000000;
        if (q.includes('tròn')) return (p.faces || []).includes('Mặt tròn');
        return true;
      }).slice(0, 2);
      html = `Dựa trên nhu cầu của bạn, tôi gợi ý <strong>${matches.length} mẫu gọng phù hợp đang có tại Minh Quang</strong>:<div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">${matches.map((p) => `
        <div style="padding:7px 9px;border:1px solid var(--border-subtle);border-radius:7px;background:#F8FAFA">
          <div style="font-weight:700;font-size:12px">${esc(p.name)}</div>
          <div class="muted-xs mono">${fmtVnd(p.price)} · ${esc(p.specs)}</div>
          <button class="btn btn-xs btn-primary" style="margin-top:5px" data-aitry="${p.id}">Thử kính này lên mặt →</button>
        </div>
      `).join('')}</div>`;
    }
    ui.aiMessages.push({ from: 'bot', html });
    renderAiChatMessages();
  }

  // ==================== GLOBAL QUICK SEARCH (CMD+K) ====================
  function openCmdK() {
    document.getElementById('cmdkBackdrop').classList.remove('hidden');
    const inp = document.getElementById('cmdkInput');
    inp.value = '';
    renderCmdKResults('');
    setTimeout(() => inp.focus(), 30);
  }
  function closeCmdK() { document.getElementById('cmdkBackdrop').classList.add('hidden'); }

  function renderCmdKResults(query) {
    const q = query.trim().toLowerCase();
    const res = [];
    state.customers.filter((c) => !q || c.name.toLowerCase().includes(q) || c.phone.includes(q)).slice(0, 4).forEach((c) => {
      res.push({ type: 'Khách hàng', title: `${c.name} (${c.phone})`, sub: c.tier, act: () => { state.activeSurface = 'store'; state.activeStoreView = 'customers'; state.activeCustomerDetailId = c.id; saveState(); renderAll(); } });
    });
    state.orders.filter((o) => !q || o.id.toLowerCase().includes(q)).slice(0, 3).forEach((o) => {
      res.push({ type: 'Đơn hàng', title: `${o.id} — ${fmtVnd(o.total)}`, sub: o.status, act: () => { state.activeSurface = 'store'; state.activeStoreView = 'orders'; ui.orderSearch = o.id; saveState(); renderAll(); } });
    });
    state.productionJobs.filter((j) => !q || j.id.toLowerCase().includes(q)).slice(0, 3).forEach((j) => {
      res.push({ type: 'Phiếu Lab', title: `${j.id} — ${j.frameName}`, sub: STAGE_META[j.stage].label, act: () => { state.activeSurface = 'store'; state.activeStoreView = 'lab'; saveState(); renderAll(); openLabJobDrawer(j.id); } });
    });
    state.products.filter((p) => q && (p.sku.toLowerCase().includes(q) || p.name.toLowerCase().includes(q))).slice(0, 4).forEach((p) => {
      res.push({ type: 'Sản phẩm', title: `[${p.sku}] ${p.name}`, sub: fmtVnd(p.price), act: () => { state.activeSurface = 'store'; state.activeStoreView = 'products'; ui.prodSearch = p.sku; saveState(); renderAll(); } });
    });

    const box = document.getElementById('cmdkResults');
    box.innerHTML = res.length === 0 ? '<div class="muted-xs" style="padding:18px;text-align:center">Không tìm thấy kết quả phù hợp.</div>' : res.map((r, i) => `
      <div class="cmdk-item" data-cmdi="${i}">
        <div><strong style="font-size:13px">${esc(r.title)}</strong><div class="muted-xs">${esc(r.sub)}</div></div>
        <span class="badge badge-neutral">${r.type}</span>
      </div>
    `).join('');
    box.querySelectorAll('[data-cmdi]').forEach((el) => el.onclick = () => { closeCmdK(); res[Number(el.dataset.cmdi)].act(); });
  }

  // ==================== GLOBAL EVENTS ====================
  function openMobileSidebar() {
    document.getElementById('storeSidebar').classList.add('open');
    document.getElementById('sidebarBackdrop').classList.remove('hidden');
  }
  function closeMobileSidebar() {
    document.getElementById('storeSidebar').classList.remove('open');
    document.getElementById('sidebarBackdrop').classList.add('hidden');
  }

  document.querySelectorAll('.proto-switch-btn').forEach((b) => b.onclick = () => { state.activeSurface = b.dataset.surface; saveState(); renderAll(); });
  document.querySelectorAll('.pub-nav-pill').forEach((b) => b.onclick = () => { state.activePublicView = b.dataset.pubview; saveState(); renderAll(); });
  document.getElementById('roleSelect').onchange = (e) => {
    state.role = e.target.value;
    state.activeCustomerDetailId = null;
    // Role-based landing workspace
    const roleHome = { OWNER_ADMIN: 'dashboard', SALES_CASHIER: 'pos', OPTOMETRIST: 'exam', LAB_TECHNICIAN: 'lab' };
    state.activeStoreView = roleHome[state.role] || 'dashboard';
    saveState(); renderAll();
    toast(`Đã chuyển giao diện chuyên biệt cho vai trò: ${e.target.options[e.target.selectedIndex].text}`);
  };
  document.getElementById('portalCustomerSelect').onchange = (e) => { state.portalCustomerId = e.target.value; saveState(); renderAll(); };
  document.getElementById('headerNewOrderBtn').onclick = () => { state.activeStoreView = 'pos'; saveState(); renderAll(); };
  document.getElementById('openZaloBtn').onclick = () => { state.activeStoreView = 'crm'; saveState(); renderAll(); };
  document.getElementById('resetDemoBtn').onclick = resetState;
  document.getElementById('mobileMenuBtn').onclick = openMobileSidebar;
  document.getElementById('sidebarBackdrop').onclick = closeMobileSidebar;
  document.getElementById('globalSearchTrigger').onclick = openCmdK;
  document.getElementById('closeCmdkBtn').onclick = closeCmdK;
  document.getElementById('cmdkBackdrop').onclick = (e) => { if (e.target.id === 'cmdkBackdrop') closeCmdK(); };
  document.getElementById('cmdkInput').oninput = (e) => renderCmdKResults(e.target.value);
  document.getElementById('closeDrawerBtn').onclick = closeDrawer;
  document.getElementById('drawerBackdrop').onclick = closeDrawer;
  document.getElementById('closeModalBtn').onclick = closeModal;
  document.getElementById('modalBackdrop').onclick = (e) => { if (e.target.id === 'modalBackdrop') closeModal(); };

  // AI Chat Widget
  document.getElementById('aiFabBtn').onclick = () => {
    ui.aiOpen = !ui.aiOpen;
    document.getElementById('aiChatPanel').classList.toggle('hidden', !ui.aiOpen);
    if (ui.aiOpen) renderAiChatMessages();
  };
  document.getElementById('closeAiChatBtn').onclick = () => { ui.aiOpen = false; document.getElementById('aiChatPanel').classList.add('hidden'); };
  document.querySelectorAll('[data-aichip]').forEach((b) => b.onclick = () => handleAiPrompt(b.dataset.aichip));
  document.getElementById('aiChatForm').onsubmit = (e) => {
    e.preventDefault();
    const inp = document.getElementById('aiChatInput');
    if (!inp.value.trim()) return;
    handleAiPrompt(inp.value.trim());
    inp.value = '';
  };

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCmdK(); }
    if (e.key === 'Escape') { closeCmdK(); closeDrawer(); closeModal(); closeMobileSidebar(); }
  });

  renderAll();
})();
