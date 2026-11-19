(() => {
  const STORAGE_KEY = 'optic_shop_p00a_mvp_v3';

  const ICONS = {
    dashboard: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    pos: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
    budget: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    orders: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    lab: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    customers: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    exam: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    catalog: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
    inventory: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    appointments: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    warranty: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    crm: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    cms: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    settings: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
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
    FRAME: 'Gọng kính', SUNGLASSES: 'Kính mát', LENS_BLANK: 'Phôi tròng',
    ACCESSORY: 'Phụ kiện', CONSUMABLE: 'Vật tư tiêu hao', SERVICE: 'Dịch vụ'
  };

  let state = loadState();
  let ui = {
    // POS with Scroll Pagination + Price Range + Sort
    posSearch: '', posCat: 'ALL', posPriceRange: 'ALL', posSort: 'name_asc', posViewMode: 'grid', posLimit: 9,
    posCustomerId: 'CUS-001', posCart: [], posDiscountPct: 0, posExamId: '', posCash: 0, posTransfer: 0, posTransferOk: false,
    // Management Filters
    orderSearch: '', orderStatus: 'ALL', orderPage: 1,
    invSearch: '', invCat: 'ALL', invStock: 'ALL', invPage: 1,
    catSearch: '', catType: 'ALL', catWebOnly: 'ALL', catPage: 1,
    custSearch: '', custTier: 'ALL', custPage: 1,
    examCustId: 'CUS-001', examUploadUrl: '',
    labSearch: '', labTech: 'ALL',
    wrtSearch: '', wrtStatus: 'ALL',
    aptSearch: '', aptType: 'ALL',
    settingsTab: 'store',
    cmsEditSlug: 'about',
    // Public Website with Scroll Pagination + Price Range + Sort
    pubSearch: '', pubCat: 'ALL', pubFace: 'ALL', pubPriceRange: 'ALL', pubSort: 'price_asc', pubLimit: 6,
    tryonFace: 'oval', tryonProductId: 'PRD-01', tryonScale: 100, tryonTop: 42, tryonCameraStream: null,
    // AI Budget Planner (Shared between Public & Store)
    budgetMin: 1200000, budgetMax: 3200000, budgetFace: 'Mặt tròn', budgetMyopia: '-2.50', budgetCustId: 'CUS-001',
    budgetCriteria: ['blue_cut', 'titanium'],
    // AI Chat
    aiOpen: false,
    aiMessages: [{ from: 'bot', text: 'Xin chào! Tôi là Trợ lý AI Quang học Minh Quang. Bạn có thể hỏi về dáng kính, chỉ số độ mắt, hoặc mở mục "Lập kế hoạch ngân sách AI" để tôi phối sẵn Combo Gọng + Tròng tối ưu.' }]
  };

  function loadState() {
    try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) return JSON.parse(raw); } catch (_) {}
    return window.OPTIC_V3_SEED();
  }
  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    syncStoreBranding();
    updateHeaderBadges();
  }
  function resetState() {
    stopTryonCamera();
    state = window.OPTIC_V3_SEED();
    ui.posCart = [];
    saveState();
    renderAll();
    toast('Đã khôi phục toàn bộ dữ liệu mẫu ban đầu.');
  }

  const fmtVnd = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(n || 0)) + 'đ';
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
  const nowStr = () => { const d = new Date(), p = (x) => String(x).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };
  const todayStr = () => nowStr().slice(0, 10);
  const getCustomer = (id) => state.customers.find((c) => c.id === id);
  const getProduct = (id) => state.products.find((p) => p.id === id);
  const getRbac = () => state.rbacMatrix[state.role] || state.rbacMatrix.OWNER_ADMIN;

  function matchPriceRange(price, range) {
    if (range === 'ALL') return true;
    if (range === 'UNDER_500') return price < 500000;
    if (range === '500_1000') return price >= 500000 && price <= 1000000;
    if (range === '1000_2000') return price > 1000000 && price <= 2000000;
    if (range === 'OVER_2000') return price > 2000000;
    return true;
  }

  function sortProducts(arr, sortKey) {
    const copy = [...arr];
    if (sortKey === 'name_asc') copy.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    else if (sortKey === 'name_desc') copy.sort((a, b) => b.name.localeCompare(a.name, 'vi'));
    else if (sortKey === 'price_asc') copy.sort((a, b) => a.price - b.price);
    else if (sortKey === 'price_desc') copy.sort((a, b) => b.price - a.price);
    else if (sortKey === 'stock_desc') copy.sort((a, b) => (b.stock ?? -1) - (a.stock ?? -1));
    return copy;
  }

  function paginate(arr, page, perPage) {
    const totalPages = Math.max(1, Math.ceil(arr.length / perPage));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * perPage;
    return { items: arr.slice(start, start + perPage), page: safePage, totalPages, total: arr.length, start: start + 1, end: Math.min(arr.length, start + perPage) };
  }

  function renderPaginationBar(pg, attrName) {
    if (pg.total === 0) return '';
    return `<div class="pagination-bar"><span>Hiển thị <strong>${pg.start}–${pg.end}</strong> / <strong>${pg.total}</strong> bản ghi</span><div class="page-btns">
      <button class="page-btn" ${pg.page <= 1 ? 'disabled' : ''} data-${attrName}="${pg.page - 1}">‹</button>
      ${Array.from({ length: pg.totalPages }, (_, i) => i + 1).map((p) => `<button class="page-btn ${p === pg.page ? 'active' : ''}" data-${attrName}="${p}">${p}</button>`).join('')}
      <button class="page-btn" ${pg.page >= pg.totalPages ? 'disabled' : ''} data-${attrName}="${pg.page + 1}">›</button>
    </div></div>`;
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

  // ==================== VISUAL RENDERERS (GLASSES SVG + MYOPIA CHART) ====================
  function renderGlassesSVG(shape, color = '#1F2937', angle = 'front', width = 128) {
    const strokeW = shape === 'rimless' ? 1.5 : (shape === 'round' ? 2.4 : 3.2);
    const fillLens = shape === 'aviator' ? 'rgba(30,41,59,0.28)' : 'rgba(15,118,110,0.06)';
    if (shape === 'lens') return `<svg width="${width}" height="68" viewBox="0 0 140 70"><circle cx="70" cy="35" r="28" fill="rgba(15,118,110,0.1)" stroke="${color}" stroke-width="2"/><path d="M52 24 Q70 15 88 26" fill="none" stroke="#FFF" stroke-width="2.5" stroke-linecap="round"/><text x="70" y="39" text-anchor="middle" font-size="10" font-family="JetBrains Mono" fill="${color}">OPTIC LENS</text></svg>`;
    if (shape === 'acc') return `<svg width="${width}" height="68" viewBox="0 0 140 70"><rect x="26" y="18" width="88" height="34" rx="10" fill="rgba(100,116,139,0.12)" stroke="${color}" stroke-width="2"/><line x1="26" y1="35" x2="114" y2="35" stroke="${color}" stroke-width="1.2" stroke-dasharray="4 3"/></svg>`;
    if (angle === 'side') return `<svg width="${width}" height="68" viewBox="0 0 180 70"><path d="M22 30 L132 30 Q152 30 158 48" fill="none" stroke="${color}" stroke-width="${strokeW + 0.5}" stroke-linecap="round"/><rect x="18" y="20" width="12" height="26" rx="4" fill="${fillLens}" stroke="${color}" stroke-width="2.2"/><text x="90" y="60" text-anchor="middle" font-size="10" font-family="JetBrains Mono" fill="#64748B">Góc ngang càng kính</text></svg>`;
    if (angle === '45deg') return `<svg width="${width}" height="68" viewBox="0 0 180 70"><path d="M24 26 L56 16" stroke="${color}" stroke-width="2.4"/><path d="M138 26 L165 18" stroke="${color}" stroke-width="2.4"/><ellipse cx="62" cy="36" rx="22" ry="16" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><ellipse cx="116" cy="36" rx="24" ry="17" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><path d="M84 34 Q90 29 92 34" fill="none" stroke="${color}" stroke-width="2.5"/></svg>`;
    if (angle === 'dims') return `<svg width="${width}" height="74" viewBox="0 0 180 78"><rect x="24" y="18" width="52" height="32" rx="10" fill="${fillLens}" stroke="${color}" stroke-width="2.4"/><rect x="104" y="18" width="52" height="32" rx="10" fill="${fillLens}" stroke="${color}" stroke-width="2.4"/><path d="M76 30 Q90 24 104 30" fill="none" stroke="${color}" stroke-width="2.4"/><line x1="24" y1="60" x2="76" y2="60" stroke="#0F766E" stroke-width="1.3"/><text x="50" y="72" text-anchor="middle" font-size="9.5" font-family="JetBrains Mono" fill="#0F766E">Mắt 50mm</text><line x1="78" y1="60" x2="102" y2="60" stroke="#D97706" stroke-width="1.3"/><text x="90" y="72" text-anchor="middle" font-size="9.5" font-family="JetBrains Mono" fill="#D97706">Cầu 19</text></svg>`;
    if (shape === 'round') return `<svg width="${width}" height="64" viewBox="0 0 180 68"><circle cx="56" cy="35" r="22" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><circle cx="124" cy="35" r="22" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><path d="M78 33 Q90 26 102 33" fill="none" stroke="${color}" stroke-width="2.2"/><line x1="24" y1="32" x2="34" y2="32" stroke="${color}" stroke-width="2.5"/><line x1="146" y1="32" x2="156" y2="32" stroke="${color}" stroke-width="2.5"/></svg>`;
    if (shape === 'cateye') return `<svg width="${width}" height="64" viewBox="0 0 180 68"><path d="M28 22 L76 28 Q78 52 54 52 Q32 52 28 22 Z" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><path d="M152 22 L104 28 Q102 52 126 52 Q148 52 152 22 Z" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><path d="M76 30 Q90 25 104 30" fill="none" stroke="${color}" stroke-width="2.5"/></svg>`;
    if (shape === 'aviator') return `<svg width="${width}" height="64" viewBox="0 0 180 68"><path d="M30 22 H78 Q80 54 54 54 Q30 50 30 22 Z" fill="${fillLens}" stroke="${color}" stroke-width="2.2"/><path d="M102 22 H150 Q150 50 126 54 Q100 54 102 22 Z" fill="${fillLens}" stroke="${color}" stroke-width="2.2"/><line x1="76" y1="22" x2="104" y2="22" stroke="${color}" stroke-width="2"/><path d="M78 30 Q90 26 102 30" fill="none" stroke="${color}" stroke-width="2"/></svg>`;
    return `<svg width="${width}" height="64" viewBox="0 0 180 68"><rect x="30" y="17" width="48" height="35" rx="8" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><rect x="102" y="17" width="48" height="35" rx="8" fill="${fillLens}" stroke="${color}" stroke-width="${strokeW}"/><path d="M78 30 Q90 25 102 30" fill="none" stroke="${color}" stroke-width="2.6"/><line x1="20" y1="26" x2="30" y2="26" stroke="${color}" stroke-width="2.6"/><line x1="150" y1="26" x2="160" y2="26" stroke="${color}" stroke-width="2.6"/></svg>`;
  }

  function renderProductVisual(p, width = 120) {
    if (p.customPhotoUrl) return `<img src="${p.customPhotoUrl}" alt="${esc(p.name)}" />`;
    return renderGlassesSVG(p.shape, p.colorHex, 'front', width);
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
    return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block">
      ${[0, 0.25, 0.5, 0.75, 1].map((t) => { const v = (maxV * t).toFixed(1), y = yAt(maxV * t); return `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#E5EBEB" stroke-dasharray="3 3"/><text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="10" font-family="JetBrains Mono" fill="#768784">-${v}D</text>`; }).join('')}
      ${sorted.length > 1 ? `<polyline fill="none" stroke="#0F766E" stroke-width="2.5" points="${odPts}"/><polyline fill="none" stroke="#2563EB" stroke-width="2.5" stroke-dasharray="5 3" points="${osPts}"/>` : ''}
      ${sorted.map((e, i) => { const x = xAt(i), odV = Math.abs(parseFloat(e.prescription.od.sph) || 0), osV = Math.abs(parseFloat(e.prescription.os.sph) || 0); return `<circle cx="${x}" cy="${yAt(odV)}" r="4.2" fill="#0F766E" stroke="#FFF" stroke-width="1.5"/><circle cx="${x}" cy="${yAt(osV)}" r="4.2" fill="#2563EB" stroke="#FFF" stroke-width="1.5"/><text x="${x}" y="${H - 8}" text-anchor="middle" font-size="10" font-family="JetBrains Mono" fill="#4B5B58">${e.date.slice(0, 7)}</text>`; }).join('')}
    </svg><div style="display:flex;gap:14px;font-size:11.5px;margin-top:4px;color:var(--text-secondary)"><span><span style="display:inline-block;width:10px;height:3px;background:#0F766E;vertical-align:middle;margin-right:5px"></span>Mắt Phải (OD)</span><span><span style="display:inline-block;width:10px;height:3px;background:#2563EB;vertical-align:middle;margin-right:5px"></span>Mắt Trái (OS)</span></div>`;
  }

  // ==================== AI BUDGET PLANNER ENGINE (SHARED: CUSTOMER + POS STAFF) ====================
  const BUDGET_CRITERIA = [
    { id: 'blue_cut', label: 'Lọc ánh sáng xanh (Màn hình)' },
    { id: 'photochromic', label: 'Tròng đổi màu đi nắng' },
    { id: 'ultra_thin', label: 'Tròng siêu mỏng (1.67 / 1.74)' },
    { id: 'titanium', label: 'Gọng Titanium siêu nhẹ' },
    { id: 'acetate', label: 'Gọng Acetate thời trang' },
    { id: 'myopia_control', label: 'Kiểm soát cận thị học sinh' }
  ];

  function computeBudgetCombos(minB, maxB, face, myopiaStr, criteria) {
    const frames = state.products.filter((p) => p.category === 'FRAME');
    const lenses = state.products.filter((p) => p.category === 'LENS_BLANK');
    const myopiaAbs = Math.abs(parseFloat(myopiaStr) || 0);
    const combos = [];

    frames.forEach((f) => {
      lenses.forEach((l) => {
        const total = f.price + l.price;
        if (total < minB || total > maxB) return;
        let score = 50;
        const reasons = [];
        if ((f.faces || []).includes(face)) { score += 18; reasons.push(`Dáng gọng hợp ${face}`); }
        if (criteria.includes('titanium') && (f.tags || []).includes('titanium')) { score += 20; reasons.push('Gọng Titanium siêu nhẹ'); }
        if (criteria.includes('acetate') && (f.tags || []).includes('acetate')) { score += 18; reasons.push('Gọng Acetate thời trang'); }
        if (criteria.includes('blue_cut') && (l.tags || []).includes('blue_cut')) { score += 16; reasons.push('Lọc ánh sáng xanh'); }
        if (criteria.includes('photochromic') && (l.tags || []).includes('photochromic')) { score += 26; reasons.push('Tròng đổi màu ra nắng'); }
        if (criteria.includes('ultra_thin') && (l.tags || []).includes('ultra_thin')) { score += 24; reasons.push('Chiết suất siêu mỏng'); }
        if (criteria.includes('myopia_control') && (l.tags || []).includes('myopia_control')) { score += 30; reasons.push('Kiểm soát tăng độ cận'); }
        if (myopiaAbs >= 3.5 && (l.tags || []).includes('ultra_thin')) { score += 15; reasons.push(`Tối ưu cho độ cận -${myopiaAbs.toFixed(2)}D`); }
        if (f.stock > 0 && l.stock > 0) score += 8;
        combos.push({ frame: f, lens: l, total, score, reasons: reasons.length ? reasons : ['Cân bằng chất lượng & chi phí trong ngân sách'] });
      });
    });

    if (combos.length === 0) return [];
    combos.sort((a, b) => b.score - a.score || a.total - b.total);

    const best = combos[0];
    const cheapest = [...combos].sort((a, b) => a.total - b.total).find((c) => c.frame.id !== best.frame.id || c.lens.id !== best.lens.id) || combos[0];
    const premium = [...combos].sort((a, b) => b.total - a.total).find((c) => (c.frame.id !== best.frame.id || c.lens.id !== best.lens.id) && (c.frame.id !== cheapest.frame.id || c.lens.id !== cheapest.lens.id)) || combos[Math.min(1, combos.length - 1)];

    const out = [];
    if (cheapest && cheapest !== best) out.push({ tier: 'Phương án Tiết kiệm', badge: 'badge-info', recommended: false, ...cheapest });
    out.push({ tier: 'AI Khuyên dùng (Phù hợp nhất)', badge: 'badge-teal', recommended: true, ...best });
    if (premium && premium !== best && premium !== cheapest) out.push({ tier: 'Phương án Cao cấp trong ngân sách', badge: 'badge-warn', recommended: false, ...premium });
    return out;
  }

  function renderBudgetPlannerModule(container, mode) {
    // mode: 'public' | 'store'
    const combos = computeBudgetCombos(ui.budgetMin, ui.budgetMax, ui.budgetFace, ui.budgetMyopia, ui.budgetCriteria);
    const isStore = mode === 'store';

    container.innerHTML = `
      <div class="${isStore ? '' : 'pub-container'}" style="${isStore ? '' : 'padding-top:22px'}">
        <div class="page-head">
          <div>
            <span class="badge badge-teal">AI Optical Advisor · Lập kế hoạch Ngân sách</span>
            <h1 class="${isStore ? 'page-title' : 'pub-h1'}" style="${isStore ? 'margin-top:6px' : 'font-size:30px;margin:6px 0'}">
              ${isStore ? 'Tư vấn Ngân sách & Đề xuất Combo Gọng + Tròng (POS)' : 'Lập kế hoạch ngân sách & Tìm bộ kính phù hợp cùng AI'}
            </h1>
            <p class="page-sub">Chọn khoảng ngân sách, độ cận và ưu tiên tính năng — AI tự phối cặp <strong>Gọng + Tròng thực tế trong kho</strong> kèm lý do đề xuất.</p>
          </div>
          ${isStore ? `
            <div style="display:flex;align-items:center;gap:8px">
              <span class="muted-xs">Tư vấn cho khách:</span>
              <select id="bgCustSel" class="select" style="width:auto;min-width:210px">
                ${state.customers.map((c) => `<option value="${c.id}" ${c.id === ui.budgetCustId ? 'selected' : ''}>${esc(c.name)} (${esc(c.phone)})</option>`).join('')}
              </select>
            </div>
          ` : ''}
        </div>

        <div class="card">
          <div class="card-body" style="display:flex;flex-direction:column;gap:14px">
            <div class="form-grid-3">
              <div class="field">
                <label>Ngân sách tối thiểu (VNĐ)</label>
                <input id="bgMinInp" type="number" step="100000" min="500000" class="input mono" value="${ui.budgetMin}" />
              </div>
              <div class="field">
                <label>Ngân sách tối đa (VNĐ)</label>
                <input id="bgMaxInp" type="number" step="100000" min="800000" class="input mono" value="${ui.budgetMax}" />
              </div>
              <div class="form-grid-2">
                <div class="field">
                  <label>Dáng khuôn mặt</label>
                  <select id="bgFaceSel" class="select">
                    ${['Mặt tròn','Mặt trái xoan','Mặt vuông','Mặt dài'].map((f) => `<option value="${f}" ${ui.budgetFace === f ? 'selected' : ''}>${f}</option>`).join('')}
                  </select>
                </div>
                <div class="field">
                  <label>Độ cận hiện tại (SPH)</label>
                  <input id="bgMyoInp" class="input mono" value="${esc(ui.budgetMyopia)}" placeholder="-2.50" />
                </div>
              </div>
            </div>

            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:6px">Tiêu chí ưu tiên (chọn nhiều):</label>
              <div class="criteria-grid">
                ${BUDGET_CRITERIA.map((cr) => `
                  <button type="button" class="criteria-chip ${ui.budgetCriteria.includes(cr.id) ? 'selected' : ''}" data-bgcrit="${cr.id}">
                    ${ui.budgetCriteria.includes(cr.id) ? '✓ ' : '+ '}${cr.label}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        ${combos.length === 0 ? `
          <div class="card" style="margin-top:16px;padding:28px;text-align:center">
            <div style="font-weight:700;margin-bottom:6px">Chưa tìm thấy cặp Gọng + Tròng nào trong khoảng ${fmtVnd(ui.budgetMin)} – ${fmtVnd(ui.budgetMax)}</div>
            <div class="muted-xs">Hãy nới rộng ngân sách tối đa (ví dụ lên 3.500.000đ) để AI phối được các dòng tròng đổi màu hoặc siêu mỏng.</div>
          </div>
        ` : `
          <div class="budget-grid">
            ${combos.map((cb, idx) => `
              <div class="combo-card ${cb.recommended ? 'recommended' : ''}">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:6px">
                  <span class="badge ${cb.badge}">${cb.tier}</span>
                  <span class="mono muted-xs">Điểm khớp: ${cb.score}</span>
                </div>

                <div class="prod-thumb" style="height:96px">
                  ${renderProductVisual(cb.frame, 130)}
                </div>

                <div style="border-bottom:1px solid var(--border-subtle);padding-bottom:8px">
                  <div class="muted-xs">1. Gọng kính (${esc(cb.frame.brand)})</div>
                  <div style="font-weight:700;font-size:13.5px">${esc(cb.frame.name)}</div>
                  <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:2px">
                    <span class="muted">${esc(cb.frame.specs)}</span>
                    <strong class="mono">${fmtVnd(cb.frame.price)}</strong>
                  </div>
                </div>

                <div style="border-bottom:1px solid var(--border-subtle);padding-bottom:8px">
                  <div class="muted-xs">2. Tròng kính (${esc(cb.lens.brand)})</div>
                  <div style="font-weight:700;font-size:13.5px">${esc(cb.lens.name)}</div>
                  <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:2px">
                    <span class="muted">${esc(cb.lens.specs)}</span>
                    <strong class="mono">${fmtVnd(cb.lens.price)}</strong>
                  </div>
                </div>

                <div style="display:flex;flex-wrap:wrap;gap:4px">
                  ${cb.reasons.map((r) => `<span class="badge badge-ok" style="font-size:11px">✓ ${esc(r)}</span>`).join('')}
                </div>

                <div style="margin-top:auto;padding-top:10px;border-top:1px dashed var(--border-strong)">
                  <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">
                    <span style="font-weight:600">Tổng dự kiến bộ kính</span>
                    <strong class="mono" style="font-size:18px;color:var(--accent-primary)">${fmtVnd(cb.total)}</strong>
                  </div>
                  ${isStore ? `
                    <div style="display:flex;gap:6px">
                      <button class="btn btn-primary btn-sm" style="flex:1" data-bgpos="${idx}">Đưa vào giỏ POS</button>
                      <button class="btn btn-sm" data-bgzalo="${idx}">Gửi Zalo khách</button>
                    </div>
                  ` : `
                    <div style="display:flex;gap:6px">
                      <button class="btn btn-sm" style="flex:1" data-bgtry="${cb.frame.id}">Thử kính Online</button>
                      <button class="btn btn-primary btn-sm" style="flex:1" data-bgbook="${idx}">Đặt giữ Combo</button>
                    </div>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    // Bind Budget Planner events
    document.getElementById('bgMinInp').onchange = (e) => { ui.budgetMin = Number(e.target.value) || 0; renderBudgetPlannerModule(container, mode); };
    document.getElementById('bgMaxInp').onchange = (e) => { ui.budgetMax = Number(e.target.value) || 5000000; renderBudgetPlannerModule(container, mode); };
    document.getElementById('bgFaceSel').onchange = (e) => { ui.budgetFace = e.target.value; renderBudgetPlannerModule(container, mode); };
    document.getElementById('bgMyoInp').onchange = (e) => { ui.budgetMyopia = e.target.value; renderBudgetPlannerModule(container, mode); };
    const custSel = document.getElementById('bgCustSel');
    if (custSel) custSel.onchange = (e) => {
      ui.budgetCustId = e.target.value;
      const ex = state.examinations.find((x) => x.customerId === ui.budgetCustId);
      if (ex) ui.budgetMyopia = ex.prescription.od.sph;
      renderBudgetPlannerModule(container, mode);
    };
    container.querySelectorAll('[data-bgcrit]').forEach((b) => b.onclick = () => {
      const id = b.dataset.bgcrit;
      if (ui.budgetCriteria.includes(id)) ui.budgetCriteria = ui.budgetCriteria.filter((x) => x !== id);
      else ui.budgetCriteria.push(id);
      renderBudgetPlannerModule(container, mode);
    });
    container.querySelectorAll('[data-bgpos]').forEach((b) => b.onclick = () => {
      const cb = combos[Number(b.dataset.bgpos)];
      ui.posCustomerId = ui.budgetCustId;
      addToCart(cb.frame); addToCart(cb.lens);
      state.activeStoreView = 'pos'; saveState(); renderAll();
      toast(`Đã đưa cả Combo "${cb.frame.name} + ${cb.lens.name}" vào giỏ POS!`);
    });
    container.querySelectorAll('[data-bgzalo]').forEach((b) => b.onclick = () => {
      const cb = combos[Number(b.dataset.bgzalo)];
      const c = getCustomer(ui.budgetCustId);
      pushZalo(c.name, c.phone, 'AI_COMBO_PROPOSAL', `Đề xuất bộ kính (${fmtVnd(cb.total)}): ${cb.frame.name} + ${cb.lens.name}.`, c);
      saveState(); toast(`Đã gửi đề xuất Combo qua Zalo OA cho ${c.name}!`);
    });
    container.querySelectorAll('[data-bgtry]').forEach((b) => b.onclick = () => {
      ui.tryonProductId = b.dataset.bgtry;
      state.activePublicView = 'tryon'; saveState(); renderAll();
    });
    container.querySelectorAll('[data-bgbook]').forEach((b) => b.onclick = () => {
      const cb = combos[Number(b.dataset.bgbook)];
      const c = getCustomer(state.portalCustomerId);
      state.appointments.unshift({
        id: 'APT-' + String(state.appointments.length + 1).padStart(3, '0'),
        createdAt: nowStr(), customerName: c.name, phone: c.phone, type: 'ORDER_INQUIRY',
        scheduledAt: '2026-11-20 17:00',
        productRef: `[Combo AI ${fmtVnd(cb.total)}] ${cb.frame.name} + ${cb.lens.name}`,
        status: 'PENDING', source: 'WEBSITE'
      });
      saveState(); toast('Đã gửi yêu cầu giữ Combo AI! Chuyển sang Cửa hàng → Lịch hẹn để xác nhận.');
    });
  }

  // ==================== DRAWER & MODAL ====================
  function openDrawer(eyebrow, title, html) {
    document.getElementById('drawerEyebrow').textContent = eyebrow;
    document.getElementById('drawerTitle').textContent = title;
    document.getElementById('drawerBody').innerHTML = html;
    document.getElementById('drawerBackdrop').classList.remove('hidden');
    document.getElementById('sideDrawer').classList.remove('hidden');
  }
  function closeDrawer() { document.getElementById('drawerBackdrop').classList.add('hidden'); document.getElementById('sideDrawer').classList.add('hidden'); }
  function openModal(title, html) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('modalBackdrop').classList.remove('hidden');
  }
  function closeModal() { document.getElementById('modalBackdrop').classList.add('hidden'); }

  // ==================== BRANDING & SIDEBAR ====================
  function syncStoreBranding() {
    const s = state.storeSettings;
    document.getElementById('sidebarStoreName').textContent = s.shortName;
    document.getElementById('storeFooterLeft').textContent = `© 2026 ${s.name} · ${s.address} · Hotline: ${s.phone}`;
    document.getElementById('pubStoreName').textContent = s.shortName;
    document.getElementById('pubStoreSub').textContent = s.tagline;
    const defaultLogoSvg = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6.5" cy="13" r="4"/><circle cx="17.5" cy="13" r="4"/><path d="M10.5 13h3"/></svg>';
    const logoHtml = s.logoUrl ? `<img src="${s.logoUrl}" alt="Logo" />` : defaultLogoSvg;
    document.getElementById('sidebarLogoWrap').innerHTML = logoHtml;
    document.getElementById('pubLogoWrap').innerHTML = logoHtml;
  }

  function renderSidebar() {
    const lowStock = state.products.filter((p) => p.trackStock && p.stock <= p.minStock).length;
    const activeLab = state.productionJobs.filter((j) => j.stage !== 'HANDED_OVER').length;
    const pendingApt = state.appointments.filter((a) => a.status === 'PENDING').length;

    const groups = [
      { label: '', items: [{ id: 'dashboard', name: 'Tổng quan', icon: ICONS.dashboard, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'OPTOMETRIST', 'LAB_TECHNICIAN'] }] },
      { label: 'BÁN HÀNG', items: [
        { id: 'pos', name: 'POS bán hàng', icon: ICONS.pos, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'OPTOMETRIST'] },
        { id: 'budget', name: 'Tư vấn Ngân sách AI', icon: ICONS.budget, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'OPTOMETRIST'] },
        { id: 'orders', name: 'Đơn hàng', icon: ICONS.orders, badge: state.orders.length, roles: ['OWNER_ADMIN', 'SALES_CASHIER'] }
      ]},
      { label: 'VẬN HÀNH KÍNH', items: [
        { id: 'exam', name: 'Đo mắt & Toa kính', icon: ICONS.exam, roles: ['OWNER_ADMIN', 'OPTOMETRIST', 'SALES_CASHIER'] },
        { id: 'lab', name: 'Sản xuất Lab & QC', icon: ICONS.lab, badge: activeLab, roles: ['OWNER_ADMIN', 'LAB_TECHNICIAN', 'OPTOMETRIST'] },
        { id: 'customers', name: 'Khách hàng', icon: ICONS.customers, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'OPTOMETRIST'] }
      ]},
      { label: 'HÀNG HOÁ', items: [
        { id: 'catalog', name: 'Sản phẩm (Web & Ảnh)', icon: ICONS.catalog, roles: ['OWNER_ADMIN', 'SALES_CASHIER'] },
        { id: 'inventory', name: 'Kho hàng & Giao dịch', icon: ICONS.inventory, badge: lowStock, warn: lowStock > 0, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'LAB_TECHNICIAN'] }
      ]},
      { label: 'CHĂM SÓC KHÁCH HÀNG', items: [
        { id: 'appointments', name: 'Lịch hẹn & Yêu cầu', icon: ICONS.appointments, badge: pendingApt, warn: pendingApt > 0, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'OPTOMETRIST'] },
        { id: 'warranty', name: 'Bảo hành & Dịch vụ', icon: ICONS.warranty, roles: ['OWNER_ADMIN', 'SALES_CASHIER', 'LAB_TECHNICIAN'] },
        { id: 'crm', name: 'CSKH Tự động & Zalo', icon: ICONS.crm, roles: ['OWNER_ADMIN', 'SALES_CASHIER'] }
      ]},
      { label: 'HỆ THỐNG', items: [
        { id: 'cms', name: 'Quản trị Website', icon: ICONS.cms, roles: ['OWNER_ADMIN'] },
        { id: 'settings', name: 'Cài đặt hệ thống', icon: ICONS.settings, roles: ['OWNER_ADMIN'] }
      ]}
    ];

    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = groups.map((g) => {
      const visible = g.items.filter((i) => i.roles.includes(state.role));
      if (!visible.length) return '';
      return `${g.label ? `<div class="sidebar-group-label">${g.label}</div>` : ''}${visible.map((i) => `
        <button class="nav-item ${state.activeStoreView === i.id ? 'active' : ''}" data-view="${i.id}" title="${i.name}">
          ${i.icon}<span class="nav-label">${i.name}</span>
          ${i.badge ? `<span class="nav-badge ${i.warn ? 'warn' : ''}">${i.badge}</span>` : ''}
        </button>
      `).join('')}`;
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
    syncStoreBranding();
    updateHeaderBadges();
    const isStore = state.activeSurface === 'store';
    document.getElementById('storeSurface').classList.toggle('hidden', !isStore);
    document.getElementById('publicSurface').classList.toggle('hidden', isStore);
    document.getElementById('storeSurface').classList.toggle('sidebar-collapsed', !!state.sidebarCollapsed);
    document.querySelectorAll('.proto-switch-btn').forEach((b) => b.classList.toggle('active', b.dataset.surface === state.activeSurface));
    document.getElementById('roleSelect').value = state.role;

    if (isStore) {
      stopTryonCamera();
      renderSidebar();
      renderStoreView();
    } else {
      document.querySelectorAll('.pub-nav-pill').forEach((b) => b.classList.toggle('active', b.dataset.pubview === state.activePublicView));
      renderPortalCustomerSelect();
      renderPublicFooter();
      renderPublicView();
      renderAiChatMessages();
    }
  }

  // ==================== STORE VIEWS ====================
  function renderStoreView() {
    const main = document.getElementById('storeMain');
    const crumbs = {
      dashboard: 'Tổng quan cửa hàng', pos: 'POS bán hàng', budget: 'Tư vấn Ngân sách AI', orders: 'Quản lý Đơn hàng',
      exam: 'Đo mắt & Toa kính', lab: 'Sản xuất Lab & QC',
      customers: state.activeCustomerDetailId ? 'Hồ sơ khách hàng 360°' : 'Khách hàng',
      catalog: 'Sản phẩm (Hiển thị Website & Media)', inventory: 'Kho hàng & Sổ giao dịch',
      appointments: 'Lịch hẹn & Yêu cầu Online', warranty: 'Bảo hành & Dịch vụ', crm: 'CSKH Tự động & Zalo OA',
      cms: 'Quản trị Website (Trang tĩnh)', settings: 'Cài đặt hệ thống (User, Phân quyền, Cửa hàng)'
    };
    document.getElementById('headerCrumb').textContent = crumbs[state.activeStoreView] || 'Tổng quan';

    switch (state.activeStoreView) {
      case 'dashboard': renderDashboardView(main); break;
      case 'pos': renderPosView(main); break;
      case 'budget': renderBudgetPlannerModule(main, 'store'); break;
      case 'orders': renderOrdersView(main); break;
      case 'exam': renderExamWorkbenchView(main); break;
      case 'lab': renderLabView(main); break;
      case 'customers': state.activeCustomerDetailId ? renderCustomerDetailView(main, state.activeCustomerDetailId) : renderCustomersListView(main); break;
      case 'catalog': renderCatalogMediaView(main); break;
      case 'inventory': renderInventoryStockView(main); break;
      case 'appointments': renderAppointmentsView(main); break;
      case 'warranty': renderWarrantyView(main); break;
      case 'crm': renderCrmAutomationView(main); break;
      case 'cms': renderWebsiteCmsView(main); break;
      case 'settings': renderSystemSettingsView(main); break;
    }
  }

  // -------------------- 1. DASHBOARD --------------------
  function renderDashboardView(container) {
    const rev = state.orders.reduce((s, o) => s + o.total, 0);
    const paid = state.orders.reduce((s, o) => s + o.payments.reduce((ps, p) => ps + p.amount, 0), 0);
    const activeJobs = state.productionJobs.filter((j) => j.stage !== 'HANDED_OVER');
    const lowStock = state.products.filter((p) => p.trackStock && p.stock <= p.minStock);
    const pendingInq = state.appointments.filter((a) => a.status === 'PENDING');

    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Tổng quan vận hành hôm nay</h1><p class="page-sub">${esc(state.storeSettings.name)} · ${esc(state.storeSettings.address)}</p></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn" id="dashGoBudget">Tư vấn Ngân sách AI</button>
          <button class="btn btn-primary" id="dashGoPos">+ Bán hàng POS</button>
        </div>
      </div>
      <div class="kpi-grid">
        <div class="kpi-card"><div class="kpi-label">Tổng doanh thu đơn</div><div class="kpi-val mono">${fmtVnd(rev)}</div><div class="kpi-sub">Thực thu: <strong class="mono">${fmtVnd(paid)}</strong> · Nợ ${fmtVnd(Math.max(0, rev - paid))}</div></div>
        <div class="kpi-card blue"><div class="kpi-label">Phiếu gia công Lab</div><div class="kpi-val mono">${activeJobs.length} phiếu</div><div class="kpi-sub">${activeJobs.filter((j) => j.stage === 'READY').length} bộ sẵn sàng giao</div></div>
        <div class="kpi-card slate"><div class="kpi-label">Khách hàng &amp; Đo mắt</div><div class="kpi-val mono">${state.customers.length} khách</div><div class="kpi-sub">${state.examinations.length} lượt đo trong Sổ Kính</div></div>
        <div class="kpi-card amber"><div class="kpi-label">Cần chú ý ngay</div><div class="kpi-val mono">${lowStock.length + pendingInq.length} mục</div><div class="kpi-sub">${lowStock.length} mã tồn thấp · ${pendingInq.length} yêu cầu Online</div></div>
      </div>
      <div class="split-2">
        <div class="card">
          <div class="card-head"><h2 class="card-title">Hàng đợi Lab &amp; Bàn giao</h2><button class="btn btn-xs" id="dashAllLab">Bảng Kanban →</button></div>
          <div class="table-wrap"><table class="data-table">
            <thead><tr><th>Mã phiếu</th><th>Khách hàng</th><th>Gọng / Tròng</th><th>Trạng thái</th></tr></thead>
            <tbody>${activeJobs.map((j) => { const c = getCustomer(j.customerId); return `<tr class="clickable" data-djob="${j.id}"><td class="mono" style="font-weight:600">${j.id}</td><td><strong>${esc(c ? c.name : '')}</strong></td><td><div style="font-size:12.5px">${esc(j.frameName)}</div><div class="muted-xs">${esc(j.lensConfigSummary)}</div></td><td><span class="badge ${STAGE_META[j.stage].badge}">${STAGE_META[j.stage].label}</span></td></tr>`; }).join('')}</tbody>
          </table></div>
        </div>
        <div class="card">
          <div class="card-head"><h2 class="card-title">Cảnh báo Kho &amp; Yêu cầu mới</h2><button class="btn btn-xs" id="dashAllInv">Mở Kho hàng →</button></div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:9px">
            ${pendingInq.map((a) => `<div style="padding:10px;border:1px solid #BFDBFE;background:#EFF6FF;border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:8px"><div><span class="badge badge-info">Yêu cầu Online</span><div style="font-weight:600;margin-top:3px">${esc(a.customerName)} (${esc(a.phone)})</div><div class="muted-xs">${esc(a.productRef)}</div></div><button class="btn btn-xs btn-primary" id="dashGoApt">Xử lý</button></div>`).join('')}
            ${lowStock.slice(0, 4).map((p) => `<div style="padding:9px 10px;border:1px solid var(--border-subtle);border-radius:8px;display:flex;justify-content:space-between;align-items:center"><div><strong style="font-size:13px">${esc(p.name)}</strong><div class="muted-xs mono">${p.sku} · Ngưỡng ${p.minStock}</div></div><span class="badge ${p.stock === 0 ? 'badge-err' : 'badge-warn'}">Tồn: ${p.stock}</span></div>`).join('')}
          </div>
        </div>
      </div>
    `;
    document.getElementById('dashGoPos').onclick = () => { state.activeStoreView = 'pos'; saveState(); renderAll(); };
    document.getElementById('dashGoBudget').onclick = () => { state.activeStoreView = 'budget'; saveState(); renderAll(); };
    document.getElementById('dashAllLab').onclick = () => { state.activeStoreView = 'lab'; saveState(); renderAll(); };
    document.getElementById('dashAllInv').onclick = () => { state.activeStoreView = 'inventory'; saveState(); renderAll(); };
    const aptB = document.getElementById('dashGoApt'); if (aptB) aptB.onclick = () => { state.activeStoreView = 'appointments'; saveState(); renderAll(); };
    container.querySelectorAll('[data-djob]').forEach((tr) => tr.onclick = () => openLabJobDrawer(tr.dataset.djob));
  }

  // -------------------- 2. POS WITH SCROLL PAGINATION + PRICE RANGE + SORT --------------------
  function renderPosView(container) {
    const customer = getCustomer(ui.posCustomerId) || state.customers[0];
    const custExams = state.examinations.filter((e) => e.customerId === customer.id);
    if (!ui.posExamId && custExams[0]) ui.posExamId = custExams[0].id;

    let filtered = state.products.filter((p) => {
      if (p.category === 'CONSUMABLE') return false;
      if (ui.posCat !== 'ALL' && p.category !== ui.posCat) return false;
      if (!matchPriceRange(p.price, ui.posPriceRange)) return false;
      if (ui.posSearch) {
        const q = ui.posSearch.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      }
      return true;
    });
    filtered = sortProducts(filtered, ui.posSort);
    const visibleItems = filtered.slice(0, ui.posLimit);
    const hasMore = visibleItems.length < filtered.length;

    const subtotal = ui.posCart.reduce((s, i) => s + i.price * i.qty, 0);
    const maxDisc = getRbac().maxDiscount;
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
          <p class="page-sub">Phân trang dạng <strong>cuộn mượt (Scroll Load-more)</strong> + Lọc khoảng giá &amp; Sắp xếp + Chế độ Lưới tư vấn / Bảng nén Barcode</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-sm" id="posOpenBudgetBtn">Tư vấn Ngân sách AI</button>
          <div class="view-toggle">
            <button class="${ui.posViewMode === 'grid' ? 'active' : ''}" data-posmode="grid">${ICONS.grid} Lưới ảnh</button>
            <button class="${ui.posViewMode === 'list' ? 'active' : ''}" data-posmode="list">${ICONS.list} Bảng nén</button>
          </div>
        </div>
      </div>

      <div class="pos-grid">
        <div>
          <div class="crud-toolbar">
            <div class="search-box">${ICONS.search}<input id="posSearch" class="input" placeholder="Quét barcode / nhập SKU + Enter, hoặc tên..." value="${esc(ui.posSearch)}" /></div>
            <select id="posPriceSel" class="select" style="width:auto">
              <option value="ALL" ${ui.posPriceRange === 'ALL' ? 'selected' : ''}>Mọi khoảng giá</option>
              <option value="UNDER_500" ${ui.posPriceRange === 'UNDER_500' ? 'selected' : ''}>Dưới 500k</option>
              <option value="500_1000" ${ui.posPriceRange === '500_1000' ? 'selected' : ''}>500k – 1 triệu</option>
              <option value="1000_2000" ${ui.posPriceRange === '1000_2000' ? 'selected' : ''}>1 – 2 triệu</option>
              <option value="OVER_2000" ${ui.posPriceRange === 'OVER_2000' ? 'selected' : ''}>Trên 2 triệu</option>
            </select>
            <select id="posSortSel" class="select" style="width:auto">
              <option value="name_asc" ${ui.posSort === 'name_asc' ? 'selected' : ''}>Sắp xếp: Tên A → Z</option>
              <option value="name_desc" ${ui.posSort === 'name_desc' ? 'selected' : ''}>Sắp xếp: Tên Z → A</option>
              <option value="price_asc" ${ui.posSort === 'price_asc' ? 'selected' : ''}>Giá: Thấp → Cao</option>
              <option value="price_desc" ${ui.posSort === 'price_desc' ? 'selected' : ''}>Giá: Cao → Thấp</option>
              <option value="stock_desc" ${ui.posSort === 'stock_desc' ? 'selected' : ''}>Tồn kho nhiều nhất</option>
            </select>
            <div class="pill-group">
              ${['ALL','FRAME','LENS_BLANK','SUNGLASSES','ACCESSORY','SERVICE'].map((c) => `<button class="pill ${ui.posCat === c ? 'active' : ''}" data-poscat="${c}">${c === 'ALL' ? 'Tất cả' : CATEGORY_LABEL[c]}</button>`).join('')}
            </div>
          </div>

          <div class="card">
            <div class="pos-scroll-area" id="posScrollArea">
              ${ui.posViewMode === 'grid' ? `
                <div class="product-cards-grid">
                  ${visibleItems.map((p) => `
                    <div class="prod-card" data-addcart="${p.id}">
                      <div class="prod-thumb">
                        ${renderProductVisual(p, 110)}
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
              ` : `
                <div class="table-wrap"><table class="data-table">
                  <thead><tr><th>SKU</th><th>Tên sản phẩm</th><th>Hãng</th><th class="num">Tồn</th><th class="num">Giá bán</th><th></th></tr></thead>
                  <tbody>${visibleItems.map((p) => `
                    <tr class="clickable" data-addcart="${p.id}">
                      <td class="mono" style="font-weight:600">${esc(p.sku)}</td>
                      <td><strong>${esc(p.name)}</strong><div class="muted-xs">${esc(p.specs)}</div></td>
                      <td class="muted">${esc(p.brand)}</td>
                      <td class="num mono">${!p.trackStock ? '—' : p.stock}</td>
                      <td class="num mono" style="font-weight:700;color:var(--accent-primary)">${fmtVnd(p.price)}</td>
                      <td><button class="btn btn-xs btn-primary">+ Thêm</button></td>
                    </tr>
                  `).join('')}</tbody>
                </table></div>
              `}
            </div>
            <div class="scroll-load-footer">
              <span>Đang hiển thị <strong>${visibleItems.length} / ${filtered.length}</strong> sản phẩm (cuộn xuống để tự tải thêm)</span>
              ${hasMore ? `<button class="btn btn-xs btn-primary" id="posLoadMoreBtn">Tải thêm sản phẩm ↓</button>` : '<span class="badge badge-ok">Đã tải hết danh sách</span>'}
            </div>
          </div>
        </div>

        <!-- Cart Panel -->
        <div class="card" style="position:sticky;top:110px">
          <div class="card-head"><h2 class="card-title">Đơn hàng hiện tại</h2><span class="badge badge-teal">${hasCustom ? 'Kính gia công Lab' : 'Bán lẻ'}</span></div>
          <div class="card-body">
            <div class="field" style="margin-bottom:10px">
              <label>Khách hàng</label>
              <div style="display:flex;gap:6px">
                <select id="posCustSel" class="select">${state.customers.map((c) => `<option value="${c.id}" ${c.id === customer.id ? 'selected' : ''}>${esc(c.name)} — ${esc(c.phone)}</option>`).join('')}</select>
                <button class="btn btn-sm" id="posViewCustBtn">Hồ sơ</button>
              </div>
            </div>
            ${hasCustom ? `<div style="background:var(--accent-subtle);border:1px solid var(--accent-border);border-radius:8px;padding:9px;margin-bottom:10px"><div style="font-size:12px;font-weight:700;color:var(--accent-primary);margin-bottom:4px">Gắn Toa kính cho Phiếu Lab:</div>${custExams.length ? `<select id="posExamSel" class="select">${custExams.map((e) => `<option value="${e.id}" ${e.id === ui.posExamId ? 'selected' : ''}>${e.date} · OD ${e.prescription.od.sph}/${e.prescription.od.cyl} | OS ${e.prescription.os.sph} (PD ${e.prescription.pd})</option>`).join('')}</select>` : '<div class="muted-xs">Khách chưa có toa kính.</div>'}</div>` : ''}
            <div style="max-height:190px;overflow-y:auto;margin-bottom:10px">
              ${ui.posCart.length === 0 ? '<div class="muted-xs" style="text-align:center;padding:18px;border:1px dashed var(--border-strong);border-radius:8px">Chọn sản phẩm bên trái hoặc dùng Tư vấn Ngân sách AI.</div>' : ui.posCart.map((i) => `
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--border-subtle)">
                  <div style="min-width:0"><div style="font-weight:600;font-size:12.5px">${esc(i.name)}</div><div class="muted-xs mono">${fmtVnd(i.price)}</div></div>
                  <div style="display:flex;align-items:center;gap:5px;flex-shrink:0"><button class="btn btn-xs" data-qdec="${i.productId}">−</button><span class="mono">${i.qty}</span><button class="btn btn-xs" data-qinc="${i.productId}">+</button></div>
                </div>
              `).join('')}
            </div>
            <div class="form-grid-2" style="margin-bottom:8px">
              <div class="field"><label>Chiết khấu % (Trần RBAC: ${maxDisc}%)</label><input id="posDiscInp" type="number" min="0" max="${maxDisc}" class="input mono" value="${effDisc}" /></div>
              <div class="field"><label>Tổng thanh toán</label><input class="input mono" style="font-weight:700;color:var(--accent-primary)" value="${fmtVnd(total)}" disabled /></div>
            </div>
            <div style="background:var(--bg-subtle);border:1px solid var(--border-subtle);border-radius:8px;padding:10px;margin-bottom:10px">
              <div class="form-grid-2">
                <div class="field"><label>Tiền mặt</label><input id="posCashInp" type="number" step="50000" class="input mono" value="${ui.posCash}" /></div>
                <div class="field"><label>Chuyển khoản</label><input id="posTrfInp" type="number" step="50000" class="input mono" value="${ui.posTransfer}" /></div>
              </div>
              <label style="display:flex;gap:6px;align-items:center;margin-top:7px;font-size:12px"><input id="posTrfOk" type="checkbox" ${ui.posTransferOk ? 'checked' : ''} /> Xác nhận tiền CK đã vào tài khoản</label>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:6px"><span>Thực thu: <strong class="mono">${fmtVnd(paidNow)}</strong></span><span>Còn nợ: <strong class="mono" style="color:${remaining > 0 ? 'var(--warn-text)' : 'var(--ok-text)'}">${fmtVnd(remaining)}</strong></span></div>
            </div>
            <div style="display:flex;gap:8px"><button class="btn" id="posHalfBtn" style="flex:1">Cọc 50%</button><button class="btn btn-primary" id="posSubmitBtn" style="flex:1.6" ${ui.posCart.length === 0 ? 'disabled' : ''}>Chốt đơn &amp; In phiếu</button></div>
          </div>
        </div>
      </div>
    `;

    // Auto-load on scroll near bottom
    const scrollArea = document.getElementById('posScrollArea');
    scrollArea.onscroll = () => {
      if (hasMore && scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 40) {
        ui.posLimit += 9;
        renderPosView(container);
      }
    };
    const moreBtn = document.getElementById('posLoadMoreBtn');
    if (moreBtn) moreBtn.onclick = () => { ui.posLimit += 9; renderPosView(container); };

    document.getElementById('posOpenBudgetBtn').onclick = () => { ui.budgetCustId = customer.id; state.activeStoreView = 'budget'; saveState(); renderAll(); };
    container.querySelectorAll('[data-posmode]').forEach((b) => b.onclick = () => { ui.posViewMode = b.dataset.posmode; renderPosView(container); });
    const searchEl = document.getElementById('posSearch');
    searchEl.oninput = (e) => { ui.posSearch = e.target.value; ui.posLimit = 9; renderPosView(container); };
    searchEl.onkeydown = (e) => { if (e.key === 'Enter' && ui.posSearch.trim()) { const exact = state.products.find((p) => p.sku.toLowerCase() === ui.posSearch.trim().toLowerCase()); if (exact) { addToCart(exact); ui.posSearch = ''; renderPosView(container); toast(`Đã quét mã ${exact.sku}!`); } } };
    document.getElementById('posPriceSel').onchange = (e) => { ui.posPriceRange = e.target.value; ui.posLimit = 9; renderPosView(container); };
    document.getElementById('posSortSel').onchange = (e) => { ui.posSort = e.target.value; renderPosView(container); };
    container.querySelectorAll('[data-poscat]').forEach((b) => b.onclick = () => { ui.posCat = b.dataset.poscat; ui.posLimit = 9; renderPosView(container); });
    container.querySelectorAll('[data-addcart]').forEach((el) => el.onclick = () => { addToCart(getProduct(el.dataset.addcart)); renderPosView(container); });
    container.querySelectorAll('[data-qinc]').forEach((b) => b.onclick = () => { const x = ui.posCart.find((i) => i.productId === b.dataset.qinc); if (x) x.qty++; renderPosView(container); });
    container.querySelectorAll('[data-qdec]').forEach((b) => b.onclick = () => { const idx = ui.posCart.findIndex((i) => i.productId === b.dataset.qdec); if (idx >= 0) { ui.posCart[idx].qty--; if (ui.posCart[idx].qty <= 0) ui.posCart.splice(idx, 1); } renderPosView(container); });
    document.getElementById('posCustSel').onchange = (e) => { ui.posCustomerId = e.target.value; ui.posExamId = ''; renderPosView(container); };
    const exSel = document.getElementById('posExamSel'); if (exSel) exSel.onchange = (e) => { ui.posExamId = e.target.value; };
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
    const order = { id: orderId, date: nowStr(), customerId: customer.id, status: anyBackorder ? 'WAITING_FOR_STOCK' : (remaining === 0 ? 'COMPLETED' : 'CONFIRMED'), subtotal, discount: discAmt, total, items: ui.posCart.map((i) => ({ productId: i.productId, name: i.name, qty: i.qty, price: i.price, isCustomEyewear: hasCustom })), payments };
    state.orders.unshift(order);
    customer.totalSpent += paidNow;
    ui.posCart.forEach((i) => { const p = getProduct(i.productId); if (p && p.trackStock && p.stock > 0) logInventory(i.productId, i.category === 'LENS_BLANK' ? 'LAB_CONSUME' : 'SALE_OUT', -i.qty, orderId, `Xuất cho đơn ${orderId}`); });
    let job = null;
    if (hasCustom) {
      const exam = state.examinations.find((e) => e.id === ui.posExamId) || custExams[0];
      const frame = ui.posCart.find((i) => i.category === 'FRAME');
      const lens = ui.posCart.find((i) => i.category === 'LENS_BLANK');
      const jobId = 'JOB-2611-' + String(state.productionJobs.length + 1).padStart(3, '0');
      const eywId = 'EYW-2611-' + String(state.eyewearUnits.length + 1).padStart(2, '0');
      job = { id: jobId, orderId, customerId: customer.id, eyewearId: eywId, frameName: frame ? frame.name : 'Gọng khách mang tới', lensProductId: lens ? lens.productId : 'PRD-13', lensConfigSummary: lens ? lens.name : 'Cấu hình chuẩn', rxSummary: exam ? `OD ${exam.prescription.od.sph}/${exam.prescription.od.cyl}×${exam.prescription.od.axis} · OS ${exam.prescription.os.sph}/${exam.prescription.os.cyl}×${exam.prescription.os.axis} · PD ${exam.prescription.pd}` : 'Chờ nhập số độ', stage: 'CONFIRMED', technician: 'Chưa phân công', dueDate: 'Ngày mai 17:00', reworkCount: 0, qcChecklist: { pdMatch: false, powerMatch: false, noScratch: false, frameAligned: false }, notes: anyBackorder ? 'CHỜ HÀNG VỀ' : 'Tạo từ POS.' };
      state.productionJobs.unshift(job);
      state.eyewearUnits.unshift({ id: eywId, customerId: customer.id, orderId, jobId, rxId: exam ? exam.prescription.id : '—', frameName: job.frameName, lensName: job.lensConfigSummary, purchaseDate: todayStr(), warrantyUntil: '2027-11-19', status: 'IN_LAB' });
    }
    pushZalo(customer.name, customer.phone, 'ORDER_CREATED', `Xác nhận đơn ${orderId} (${fmtVnd(total)}), đã thu ${fmtVnd(paidNow)}.`, customer);
    ui.posCart = []; ui.posCash = 0; ui.posTransfer = 0; ui.posTransferOk = false;
    saveState(); renderAll(); toast(`Đã chốt đơn ${orderId}!`);
    openPrintReceiptModal(order, job, customer);
  }

  function openPrintReceiptModal(order, job, customer) {
    const paid = order.payments.reduce((s, p) => s + p.amount, 0);
    openModal(`Biên nhận ${order.id}`, `
      <div style="font-size:13px">
        <div style="text-align:center;border-bottom:1px dashed var(--border-strong);padding-bottom:10px;margin-bottom:12px">
          <div style="font-weight:700;font-size:16px">${esc(state.storeSettings.name.toUpperCase())}</div>
          <div class="muted-xs">${esc(state.storeSettings.address)} · Hotline ${esc(state.storeSettings.phone)}</div>
        </div>
        <div class="form-grid-2" style="margin-bottom:10px"><div><strong>Khách:</strong> ${esc(customer.name)} · ${esc(customer.phone)}</div><div style="text-align:right"><strong>Đơn:</strong> ${order.id} · ${order.date}</div></div>
        <table class="data-table" style="border:1px solid var(--border-subtle);margin-bottom:10px">
          <thead><tr><th>Hạng mục</th><th class="num">SL</th><th class="num">Thành tiền</th></tr></thead>
          <tbody>${order.items.map((i) => `<tr><td>${esc(i.name)}</td><td class="num mono">${i.qty}</td><td class="num mono">${fmtVnd(i.price * i.qty)}</td></tr>`).join('')}</tbody>
        </table>
        <div style="text-align:right">Tổng: <strong class="mono">${fmtVnd(order.total)}</strong> · Đã thu: <strong class="mono">${fmtVnd(paid)}</strong> · Còn lại: <strong class="mono">${fmtVnd(Math.max(0, order.total - paid))}</strong></div>
        ${job ? `<div style="margin-top:12px;padding:10px;background:var(--accent-subtle);border:1px solid var(--accent-border);border-radius:8px"><strong class="mono">PHIẾU LAB: ${job.id}</strong><div>${esc(job.frameName)} + ${esc(job.lensConfigSummary)}</div><div class="mono muted-xs">${esc(job.rxSummary)}</div></div>` : ''}
        <div class="no-print" style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px"><button class="btn" onclick="window.print()">In phiếu</button><button class="btn btn-primary" onclick="document.getElementById('closeModalBtn').click()">Đóng</button></div>
      </div>
    `);
  }

  // -------------------- 3. SPLIT HÀNG HOÁ: (A) SẢN PHẨM (WEB & MEDIA) + (B) KHO HÀNG (INVENTORY) --------------------
  function renderCatalogMediaView(container) {
    const filtered = state.products.filter((p) => {
      if (!['FRAME', 'SUNGLASSES', 'LENS_BLANK'].includes(p.category)) return false;
      if (ui.catType !== 'ALL' && p.category !== ui.catType) return false;
      if (ui.catWebOnly === 'WEB_ON' && !p.publishedOnWeb) return false;
      if (ui.catWebOnly === 'WEB_OFF' && p.publishedOnWeb) return false;
      if (ui.catSearch) {
        const q = ui.catSearch.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      }
      return true;
    });
    const pg = paginate(filtered, ui.catPage, 8);
    ui.catPage = pg.page;

    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Sản phẩm — Thông tin Chi tiết, Ảnh góc cạnh &amp; Video Website</h1><p class="page-sub">Tách riêng khỏi Kho hàng: tập trung biên tập hình ảnh đa góc cạnh, video 360°, mô tả bán hàng và trạng thái hiển thị lên Website</p></div>
        <button class="btn btn-primary" id="catAddBtn">+ Tạo hồ sơ sản phẩm Web</button>
      </div>
      <div class="crud-toolbar">
        <div class="search-box">${ICONS.search}<input id="catSearch" class="input" placeholder="Tìm tên sản phẩm, SKU, thương hiệu..." value="${esc(ui.catSearch)}" /></div>
        <select id="catWebSel" class="select" style="width:auto">
          <option value="ALL" ${ui.catWebOnly === 'ALL' ? 'selected' : ''}>Tất cả trạng thái Web</option>
          <option value="WEB_ON" ${ui.catWebOnly === 'WEB_ON' ? 'selected' : ''}>Đang hiển thị Website</option>
          <option value="WEB_OFF" ${ui.catWebOnly === 'WEB_OFF' ? 'selected' : ''}>Đang ẩn khỏi Website</option>
        </select>
        <div class="pill-group">
          ${['ALL','FRAME','SUNGLASSES','LENS_BLANK'].map((c) => `<button class="pill ${ui.catType === c ? 'active' : ''}" data-catt="${c}">${c === 'ALL' ? 'Tất cả' : CATEGORY_LABEL[c]}</button>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="table-wrap"><table class="data-table">
          <thead><tr><th>Hình ảnh</th><th>Sản phẩm &amp; Mô tả Web</th><th>Media (Ảnh / Video)</th><th>Hợp khuôn mặt</th><th class="num">Giá niêm yết</th><th>Hiển thị Web</th><th>Thao tác</th></tr></thead>
          <tbody>
            ${pg.items.map((p) => `<tr>
              <td style="width:82px"><div class="prod-thumb" style="height:46px;width:70px">${renderProductVisual(p, 62)}</div></td>
              <td><strong>${esc(p.name)}</strong><div class="muted-xs mono">${p.sku} · ${esc(p.brand)} · Size ${esc(p.dims)}</div><div class="muted-xs">${esc((p.description || p.specs).slice(0, 72))}...</div></td>
              <td>
                <span class="badge badge-info">4 góc cạnh</span>
                ${p.videoUrl ? '<span class="badge badge-teal">Có Video 360°</span>' : '<span class="badge badge-neutral">Chưa có Video</span>'}
              </td>
              <td>${(p.faces || []).map((f) => `<span class="badge badge-neutral" style="margin:1px">${f}</span>`).join('') || '—'}</td>
              <td class="num mono" style="font-weight:700">${fmtVnd(p.price)}</td>
              <td><button class="btn btn-xs ${p.publishedOnWeb ? 'btn-primary' : ''}" data-togweb="${p.id}">${p.publishedOnWeb ? 'Đang bật' : 'Đang ẩn'}</button></td>
              <td style="white-space:nowrap"><button class="btn btn-xs" data-editmedia="${p.id}">Sửa Media &amp; Mô tả</button></td>
            </tr>`).join('')}
          </tbody>
        </table></div>
        ${renderPaginationBar(pg, 'catpage')}
      </div>
    `;

    document.getElementById('catSearch').oninput = (e) => { ui.catSearch = e.target.value; ui.catPage = 1; renderCatalogMediaView(container); };
    document.getElementById('catWebSel').onchange = (e) => { ui.catWebOnly = e.target.value; ui.catPage = 1; renderCatalogMediaView(container); };
    container.querySelectorAll('[data-catt]').forEach((b) => b.onclick = () => { ui.catType = b.dataset.catt; ui.catPage = 1; renderCatalogMediaView(container); });
    container.querySelectorAll('[data-catpage]').forEach((b) => b.onclick = () => { ui.catPage = Number(b.dataset.catpage); renderCatalogMediaView(container); });
    container.querySelectorAll('[data-togweb]').forEach((b) => b.onclick = () => { const p = getProduct(b.dataset.togweb); if (p) { p.publishedOnWeb = !p.publishedOnWeb; saveState(); renderAll(); toast(p.publishedOnWeb ? 'Đã bật hiển thị lên Website!' : 'Đã ẩn sản phẩm khỏi Website.'); } });
    document.getElementById('catAddBtn').onclick = () => openProductMediaDrawer(null);
    container.querySelectorAll('[data-editmedia]').forEach((b) => b.onclick = () => openProductMediaDrawer(b.dataset.editmedia));
  }

  function openProductMediaDrawer(prodId) {
    const p = prodId ? getProduct(prodId) : null;
    let tempPhoto = p ? p.customPhotoUrl : '';
    openDrawer('SẢN PHẨM & MEDIA WEBSITE', p ? `Biên tập hiển thị: ${p.sku}` : 'Tạo sản phẩm mới cho Website', `
      <form id="mediaForm" style="display:flex;flex-direction:column;gap:12px">
        <div class="form-grid-2">
          <div class="field"><label>Mã SKU *</label><input name="sku" class="input mono" value="${esc(p ? p.sku : 'GK-WEB-001')}" required /></div>
          <div class="field"><label>Thương hiệu *</label><input name="brand" class="input" value="${esc(p ? p.brand : 'Matsuda Craft')}" required /></div>
        </div>
        <div class="field"><label>Tên hiển thị Website *</label><input name="name" class="input" value="${esc(p ? p.name : '')}" required /></div>
        <div class="form-grid-3">
          <div class="field"><label>Nhóm</label><select name="category" class="select">${['FRAME','SUNGLASSES','LENS_BLANK'].map((k) => `<option value="${k}" ${p && p.category === k ? 'selected' : ''}>${CATEGORY_LABEL[k]}</option>`).join('')}</select></div>
          <div class="field"><label>Giá niêm yết</label><input name="price" type="number" class="input mono" value="${p ? p.price : 950000}" /></div>
          <div class="field"><label>Kích thước</label><input name="dims" class="input mono" value="${esc(p ? p.dims : '50-19-145')}" /></div>
        </div>
        <div class="field">
          <label>Tải ảnh sản phẩm thực tế (hoặc dùng bản vẽ đa góc cạnh mặc định)</label>
          <input type="file" id="prodPhotoInp" accept="image/*" class="input" />
          <div id="prodPhotoPrev" style="margin-top:8px">${tempPhoto ? `<img src="${tempPhoto}" style="max-height:110px;border-radius:8px;border:1px solid var(--border-strong)" />` : '<span class="muted-xs">Đang dùng minh họa Vector đa góc cạnh (Chính diện, 45°, Càng kính, Kích thước)</span>'}</div>
        </div>
        <div class="field"><label>Đường dẫn Video 360° / Review sản phẩm</label><input name="videoUrl" class="input mono" value="${esc(p ? p.videoUrl : '')}" placeholder="https://..." /></div>
        <div class="field"><label>Mô tả chi tiết hiển thị cho khách hàng</label><textarea name="description" rows="3" class="textarea">${esc(p ? p.description : '')}</textarea></div>
        <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="publishedOnWeb" ${!p || p.publishedOnWeb ? 'checked' : ''} /> Hiển thị công khai trên Website bán hàng</label>
        <div style="display:flex;justify-content:flex-end;gap:8px">
          <button type="button" class="btn" onclick="document.getElementById('closeDrawerBtn').click()">Hủy</button>
          <button type="submit" class="btn btn-primary">Lưu thông tin sản phẩm</button>
        </div>
      </form>
    `);
    document.getElementById('prodPhotoInp').onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      tempPhoto = URL.createObjectURL(f);
      document.getElementById('prodPhotoPrev').innerHTML = `<img src="${tempPhoto}" style="max-height:110px;border-radius:8px;border:1px solid var(--border-strong)" />`;
    };
    document.getElementById('mediaForm').onsubmit = (e) => {
      e.preventDefault(); const fd = new FormData(e.target);
      const data = { sku: fd.get('sku'), brand: fd.get('brand'), name: fd.get('name'), category: fd.get('category'), price: Number(fd.get('price')), dims: fd.get('dims'), videoUrl: fd.get('videoUrl'), description: fd.get('description'), customPhotoUrl: tempPhoto, publishedOnWeb: fd.get('publishedOnWeb') === 'on' };
      if (p) Object.assign(p, data);
      else state.products.unshift({ id: 'PRD-' + String(state.products.length + 1).padStart(2, '0'), ...data, cost: Math.round(data.price * 0.5), stock: 5, minStock: 2, trackStock: true, shape: 'square', colorHex: '#1F2937', faces: ['Mặt tròn', 'Mặt trái xoan'], tags: ['acetate'], specs: data.description.slice(0, 40) });
      saveState(); closeDrawer(); renderAll(); toast('Đã lưu thông tin & Media hiển thị Website!');
    };
  }

  function renderInventoryStockView(container) {
    const filtered = state.products.filter((p) => {
      if (ui.invCat !== 'ALL' && p.category !== ui.invCat) return false;
      if (ui.invStock === 'LOW' && !(p.trackStock && p.stock <= p.minStock)) return false;
      if (ui.invStock === 'OUT' && !(p.trackStock && p.stock === 0)) return false;
      if (ui.invSearch) {
        const q = ui.invSearch.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      }
      return true;
    });
    const pg = paginate(filtered, ui.invPage, 10);
    ui.invPage = pg.page;
    const canViewCost = getRbac().viewCost;

    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Kho hàng &amp; Sổ giao dịch bất biến (Inventory)</h1><p class="page-sub">Quản lý tồn kho, giá vốn, ngưỡng cảnh báo, nhập hàng NCC, xuất phôi Lab &amp; kiểm kê</p></div>
        <button class="btn btn-primary" id="openInvTxBtn">+ Nhập kho / Kiểm kê</button>
      </div>
      <div class="crud-toolbar">
        <div class="search-box">${ICONS.search}<input id="invSearch" class="input" placeholder="Tìm mã SKU, tên hàng, vật tư..." value="${esc(ui.invSearch)}" /></div>
        <select id="invStockSel" class="select" style="width:auto">
          <option value="ALL" ${ui.invStock === 'ALL' ? 'selected' : ''}>Mọi tồn kho</option>
          <option value="LOW" ${ui.invStock === 'LOW' ? 'selected' : ''}>Sắp hết / Hết hàng</option>
          <option value="OUT" ${ui.invStock === 'OUT' ? 'selected' : ''}>Hết hàng (0)</option>
        </select>
        <div class="pill-group">${['ALL','FRAME','LENS_BLANK','SUNGLASSES','ACCESSORY','CONSUMABLE','SERVICE'].map((c) => `<button class="pill ${ui.invCat === c ? 'active' : ''}" data-invcat="${c}">${c === 'ALL' ? 'Tất cả' : CATEGORY_LABEL[c]}</button>`).join('')}</div>
      </div>
      <div class="card" style="margin-bottom:18px">
        <div class="table-wrap"><table class="data-table">
          <thead><tr><th>SKU</th><th>Tên hàng hoá / Vật tư</th><th>Nhóm</th>${canViewCost ? '<th class="num">Giá vốn</th>' : ''}<th class="num">Giá bán</th><th class="num">Tồn kho</th><th>Cảnh báo</th></tr></thead>
          <tbody>${pg.items.map((p) => `<tr>
            <td class="mono" style="font-weight:600">${esc(p.sku)}</td>
            <td><strong>${esc(p.name)}</strong><div class="muted-xs">${esc(p.brand)}</div></td>
            <td><span class="badge badge-neutral">${CATEGORY_LABEL[p.category]}</span></td>
            ${canViewCost ? `<td class="num mono muted">${fmtVnd(p.cost)}</td>` : ''}
            <td class="num mono">${fmtVnd(p.price)}</td>
            <td class="num mono" style="font-weight:700">${!p.trackStock ? '—' : p.stock}</td>
            <td>${!p.trackStock ? '<span class="badge badge-neutral">Không quản lý tồn</span>' : p.stock === 0 ? '<span class="badge badge-err">Hết hàng</span>' : p.stock <= p.minStock ? '<span class="badge badge-warn">Sắp hết</span>' : '<span class="badge badge-ok">Đủ hàng</span>'}</td>
          </tr>`).join('')}</tbody>
        </table></div>
        ${renderPaginationBar(pg, 'invpage')}
      </div>
      <div class="card">
        <div class="card-head"><h2 class="card-title">Sổ Nhật ký Giao dịch Kho (${state.inventoryTransactions.length})</h2></div>
        <div class="table-wrap"><table class="data-table">
          <thead><tr><th>Mã</th><th>Thời gian</th><th>Loại</th><th>Hàng hoá</th><th class="num">SL</th><th>Chứng từ</th><th>Diễn giải</th></tr></thead>
          <tbody>${state.inventoryTransactions.slice(0, 8).map((t) => { const p = getProduct(t.productId); return `<tr><td class="mono">${t.id}</td><td class="mono muted-xs">${t.date}</td><td><span class="badge ${t.type === 'INBOUND' ? 'badge-ok' : t.type === 'LAB_SPOILAGE' ? 'badge-err' : 'badge-info'}">${t.type}</span></td><td>${esc(p ? p.name : t.productId)}</td><td class="num mono" style="font-weight:700;color:${t.qty >= 0 ? 'var(--ok-text)' : 'var(--err-text)'}">${t.qty > 0 ? '+' + t.qty : t.qty}</td><td class="mono">${esc(t.ref)}</td><td class="muted">${esc(t.note)}</td></tr>`; }).join('')}</tbody>
        </table></div>
      </div>
    `;
    document.getElementById('invSearch').oninput = (e) => { ui.invSearch = e.target.value; ui.invPage = 1; renderInventoryStockView(container); };
    document.getElementById('invStockSel').onchange = (e) => { ui.invStock = e.target.value; ui.invPage = 1; renderInventoryStockView(container); };
    container.querySelectorAll('[data-invcat]').forEach((b) => b.onclick = () => { ui.invCat = b.dataset.invcat; ui.invPage = 1; renderInventoryStockView(container); });
    container.querySelectorAll('[data-invpage]').forEach((b) => b.onclick = () => { ui.invPage = Number(b.dataset.invpage); renderInventoryStockView(container); });
    document.getElementById('openInvTxBtn').onclick = () => {
      openDrawer('KHO HÀNG', 'Nhập kho / Điều chỉnh tồn kho', `
        <form id="invTxForm" style="display:flex;flex-direction:column;gap:11px">
          <div class="field"><label>Hàng hoá / Phôi tròng / Vật tư</label><select name="productId" class="select">${state.products.filter((p) => p.trackStock).map((p) => `<option value="${p.id}">[${p.sku}] ${esc(p.name)} (Tồn ${p.stock})</option>`).join('')}</select></div>
          <div class="form-grid-2">
            <div class="field"><label>Loại giao dịch</label><select name="type" class="select"><option value="INBOUND">INBOUND — Nhập NCC</option><option value="ADJUSTMENT">ADJUSTMENT — Kiểm kê</option><option value="LAB_CONSUME">LAB_CONSUME — Xuất lô Lab</option></select></div>
            <div class="field"><label>Số lượng (+ / −)</label><input name="qty" type="number" class="input mono" value="5" required /></div>
          </div>
          <div class="field"><label>Số chứng từ / PO</label><input name="ref" class="input mono" value="PO-2611-NEW" /></div>
          <div class="field"><label>Diễn giải</label><input name="note" class="input" value="Nhập bổ sung tồn kho" /></div>
          <div style="display:flex;justify-content:flex-end"><button type="submit" class="btn btn-primary">Ghi sổ kho</button></div>
        </form>
      `);
      document.getElementById('invTxForm').onsubmit = (e) => {
        e.preventDefault(); const fd = new FormData(e.target);
        logInventory(fd.get('productId'), fd.get('type'), Number(fd.get('qty')), fd.get('ref'), fd.get('note'));
        saveState(); closeDrawer(); renderAll(); toast('Đã cập nhật tồn kho & ghi sổ giao dịch!');
      };
    };
  }

  // -------------------- 4. WEBSITE CMS (STATIC PAGES EDITOR) --------------------
  function renderWebsiteCmsView(container) {
    const activePage = state.cmsPages.find((p) => p.slug === ui.cmsEditSlug) || state.cmsPages[0];
    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Quản trị Website — Biên tập Trang tĩnh</h1><p class="page-sub">Chỉnh sửa trực tiếp nội dung Giới thiệu, Chính sách mua hàng, Bảo hành &amp; Bảo mật — đồng bộ tức thì sang bề mặt Website</p></div>
        <button class="btn" id="cmsPreviewWebBtn">Xem trực tiếp trên Website →</button>
      </div>
      <div class="split-2" style="grid-template-columns:280px minmax(0,1fr)">
        <div class="card">
          <div class="card-head"><h2 class="card-title">Danh sách trang tĩnh</h2></div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:6px">
            ${state.cmsPages.map((p) => `
              <button class="btn" style="justify-content:space-between;text-align:left;${p.slug === activePage.slug ? 'border-color:var(--accent-primary);background:var(--accent-subtle);color:var(--accent-primary)' : ''}" data-cmsslug="${p.slug}">
                <span>${esc(p.title)}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-head"><h2 class="card-title">Đang sửa: ${esc(activePage.title)}</h2><span class="muted-xs mono">Cập nhật: ${activePage.updatedAt}</span></div>
          <div class="card-body">
            <form id="cmsForm" style="display:flex;flex-direction:column;gap:12px">
              <div class="field"><label>Tiêu đề trang</label><input name="title" class="input" value="${esc(activePage.title)}" required /></div>
              <div class="field"><label>Nội dung hiển thị trên Website</label><textarea name="content" rows="10" class="textarea" required>${esc(activePage.content)}</textarea></div>
              <div style="display:flex;justify-content:flex-end;gap:8px"><button type="submit" class="btn btn-primary">Lưu &amp; Xuất bản lên Website</button></div>
            </form>
          </div>
        </div>
      </div>
    `;
    container.querySelectorAll('[data-cmsslug]').forEach((b) => b.onclick = () => { ui.cmsEditSlug = b.dataset.cmsslug; renderWebsiteCmsView(container); });
    document.getElementById('cmsPreviewWebBtn').onclick = () => { state.activeSurface = 'public'; state.activePublicView = 'about'; state.activeCmsSlug = activePage.slug; saveState(); renderAll(); };
    document.getElementById('cmsForm').onsubmit = (e) => {
      e.preventDefault(); const fd = new FormData(e.target);
      activePage.title = fd.get('title'); activePage.content = fd.get('content'); activePage.updatedAt = todayStr();
      saveState(); renderWebsiteCmsView(container); toast(`Đã xuất bản trang "${activePage.title}" lên Website!`);
    };
  }

  // -------------------- 5. SYSTEM SETTINGS (STORE INFO/LOGO, USERS CRUD, RBAC MATRIX) --------------------
  function renderSystemSettingsView(container) {
    const s = state.storeSettings;
    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Cài đặt Hệ thống</h1><p class="page-sub">Cấu hình thông tin cửa hàng &amp; Logo, quản lý tài khoản nhân viên và ma trận phân quyền RBAC</p></div>
      </div>
      <div class="pill-group" style="margin-bottom:16px">
        <button class="pill ${ui.settingsTab === 'store' ? 'active' : ''}" data-stab="store">Thông tin Cửa hàng &amp; Logo</button>
        <button class="pill ${ui.settingsTab === 'users' ? 'active' : ''}" data-stab="users">Quản lý Người dùng (${state.staffUsers.length})</button>
        <button class="pill ${ui.settingsTab === 'rbac' ? 'active' : ''}" data-stab="rbac">Ma trận Phân quyền (RBAC)</button>
      </div>

      ${ui.settingsTab === 'store' ? `
        <div class="card" style="max-width:760px">
          <div class="card-head"><h2 class="card-title">Thông tin thương hiệu &amp; Phiếu in</h2></div>
          <div class="card-body">
            <form id="storeInfoForm" style="display:flex;flex-direction:column;gap:12px">
              <div class="form-grid-2">
                <div class="field"><label>Tên cửa hàng đầy đủ</label><input name="name" class="input" value="${esc(s.name)}" required /></div>
                <div class="field"><label>Tên rút gọn (Sidebar &amp; Header)</label><input name="shortName" class="input" value="${esc(s.shortName)}" required /></div>
              </div>
              <div class="form-grid-2">
                <div class="field"><label>Hotline</label><input name="phone" class="input mono" value="${esc(s.phone)}" /></div>
                <div class="field"><label>Email liên hệ</label><input name="email" class="input" value="${esc(s.email)}" /></div>
              </div>
              <div class="form-grid-2">
                <div class="field"><label>Địa chỉ cửa hàng</label><input name="address" class="input" value="${esc(s.address)}" /></div>
                <div class="field"><label>Giờ mở cửa</label><input name="hours" class="input" value="${esc(s.hours)}" /></div>
              </div>
              <div class="field"><label>Thông tin tài khoản ngân hàng (QR chuyển khoản tại quầy)</label><input name="bankInfo" class="input mono" value="${esc(s.bankInfo)}" /></div>
              <div class="field">
                <label>Tải lên Logo cửa hàng (PNG/JPG — cập nhật ngay trên Sidebar &amp; Website)</label>
                <input type="file" id="storeLogoInp" accept="image/*" class="input" />
              </div>
              <div style="display:flex;justify-content:flex-end"><button type="submit" class="btn btn-primary">Lưu cấu hình cửa hàng</button></div>
            </form>
          </div>
        </div>
      ` : ui.settingsTab === 'users' ? `
        <div class="card">
          <div class="card-head"><h2 class="card-title">Tài khoản nhân viên cửa hàng</h2><button class="btn btn-sm btn-primary" id="addStaffBtn">+ Thêm nhân viên</button></div>
          <div class="table-wrap"><table class="data-table">
            <thead><tr><th>Mã</th><th>Họ và tên</th><th>Tên đăng nhập</th><th>Vai trò</th><th>Số điện thoại</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>${state.staffUsers.map((u) => `<tr>
              <td class="mono">${u.id}</td><td><strong>${esc(u.name)}</strong></td><td class="mono">${esc(u.username)}</td>
              <td><span class="badge badge-teal">${esc(state.rbacMatrix[u.role]?.label || u.role)}</span></td>
              <td class="mono">${esc(u.phone)}</td>
              <td><span class="badge ${u.active ? 'badge-ok' : 'badge-neutral'}">${u.active ? 'Hoạt động' : 'Đã khóa'}</span></td>
              <td><button class="btn btn-xs" data-togusr="${u.id}">${u.active ? 'Khóa' : 'Mở khóa'}</button></td>
            </tr>`).join('')}</tbody>
          </table></div>
        </div>
      ` : `
        <div class="card">
          <div class="card-head"><h2 class="card-title">Ma trận Phân quyền theo Vai trò (Thay đổi có hiệu lực ngay)</h2></div>
          <div class="table-wrap"><table class="data-table">
            <thead><tr><th>Vai trò</th><th style="text-align:center">Xem giá vốn</th><th style="text-align:center">Trần CK (%)</th><th style="text-align:center">Duyệt hoàn tiền</th><th style="text-align:center">Sửa kho</th><th style="text-align:center">Quản trị Web</th><th style="text-align:center">Quản lý User</th></tr></thead>
            <tbody>${Object.entries(state.rbacMatrix).map(([roleKey, r]) => `<tr>
              <td><strong>${esc(r.label)}</strong><div class="muted-xs mono">${roleKey}</div></td>
              <td style="text-align:center"><input type="checkbox" data-rbac="${roleKey}:viewCost" ${r.viewCost ? 'checked' : ''} /></td>
              <td style="text-align:center"><input type="number" class="rx-input" style="width:62px" data-rbacnum="${roleKey}:maxDiscount" value="${r.maxDiscount}" /></td>
              <td style="text-align:center"><input type="checkbox" data-rbac="${roleKey}:approveRefund" ${r.approveRefund ? 'checked' : ''} /></td>
              <td style="text-align:center"><input type="checkbox" data-rbac="${roleKey}:editStock" ${r.editStock ? 'checked' : ''} /></td>
              <td style="text-align:center"><input type="checkbox" data-rbac="${roleKey}:manageCms" ${r.manageCms ? 'checked' : ''} /></td>
              <td style="text-align:center"><input type="checkbox" data-rbac="${roleKey}:manageUsers" ${r.manageUsers ? 'checked' : ''} /></td>
            </tr>`).join('')}</tbody>
          </table></div>
        </div>
      `}
    `;

    container.querySelectorAll('[data-stab]').forEach((b) => b.onclick = () => { ui.settingsTab = b.dataset.stab; renderSystemSettingsView(container); });
    const sForm = document.getElementById('storeInfoForm');
    if (sForm) {
      document.getElementById('storeLogoInp').onchange = (e) => {
        const f = e.target.files[0]; if (!f) return;
        state.storeSettings.logoUrl = URL.createObjectURL(f);
        syncStoreBranding(); toast('Đã cập nhật Logo mới!');
      };
      sForm.onsubmit = (e) => {
        e.preventDefault(); const fd = new FormData(e.target);
        Object.assign(state.storeSettings, { name: fd.get('name'), shortName: fd.get('shortName'), phone: fd.get('phone'), email: fd.get('email'), address: fd.get('address'), hours: fd.get('hours'), bankInfo: fd.get('bankInfo') });
        saveState(); renderAll(); toast('Đã lưu cấu hình cửa hàng!');
      };
    }
    const addStaffBtn = document.getElementById('addStaffBtn');
    if (addStaffBtn) addStaffBtn.onclick = () => {
      openDrawer('NGƯỜI DÙNG', 'Thêm tài khoản nhân viên', `
        <form id="newStaffForm" style="display:flex;flex-direction:column;gap:11px">
          <div class="field"><label>Họ và tên *</label><input name="name" class="input" required /></div>
          <div class="form-grid-2">
            <div class="field"><label>Username *</label><input name="username" class="input mono" required /></div>
            <div class="field"><label>Số điện thoại</label><input name="phone" class="input mono" /></div>
          </div>
          <div class="field"><label>Vai trò</label><select name="role" class="select">${Object.entries(state.rbacMatrix).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}</select></div>
          <div style="display:flex;justify-content:flex-end"><button type="submit" class="btn btn-primary">Tạo tài khoản</button></div>
        </form>
      `);
      document.getElementById('newStaffForm').onsubmit = (e) => {
        e.preventDefault(); const fd = new FormData(e.target);
        state.staffUsers.push({ id: 'USR-' + String(state.staffUsers.length + 1).padStart(2, '0'), name: fd.get('name'), username: fd.get('username'), phone: fd.get('phone'), role: fd.get('role'), active: true });
        saveState(); closeDrawer(); renderAll(); toast('Đã thêm nhân viên mới!');
      };
    };
    container.querySelectorAll('[data-togusr]').forEach((b) => b.onclick = () => { const u = state.staffUsers.find((x) => x.id === b.dataset.togusr); if (u) { u.active = !u.active; saveState(); renderSystemSettingsView(container); } });
    container.querySelectorAll('[data-rbac]').forEach((cb) => cb.onchange = () => { const [rk, perm] = cb.dataset.rbac.split(':'); state.rbacMatrix[rk][perm] = cb.checked; saveState(); toast('Đã cập nhật quyền RBAC!'); });
    container.querySelectorAll('[data-rbacnum]').forEach((inp) => inp.onchange = () => { const [rk, perm] = inp.dataset.rbacnum.split(':'); state.rbacMatrix[rk][perm] = Number(inp.value) || 0; saveState(); toast('Đã cập nhật trần chiết khấu RBAC!'); });
  }

  // -------------------- 6. REMAINING STORE VIEWS (ORDERS, EXAM, LAB, CUSTOMERS, APPOINTMENTS, WARRANTY, CRM) --------------------
  function renderOrdersView(container) {
    const filtered = state.orders.filter((o) => {
      const c = getCustomer(o.customerId);
      if (ui.orderStatus !== 'ALL' && o.status !== ui.orderStatus) return false;
      if (ui.orderSearch) { const q = ui.orderSearch.toLowerCase(); return o.id.toLowerCase().includes(q) || (c && (c.name.toLowerCase().includes(q) || c.phone.includes(q))); }
      return true;
    });
    const pg = paginate(filtered, ui.orderPage, 8); ui.orderPage = pg.page;
    container.innerHTML = `
      <div class="page-head"><div><h1 class="page-title">Quản lý Đơn hàng &amp; Công nợ cọc</h1><p class="page-sub">Tìm kiếm, thu nốt công nợ hoặc in lại phiếu</p></div><button class="btn btn-primary" id="ordNewBtn">+ Tạo đơn POS</button></div>
      <div class="crud-toolbar"><div class="search-box">${ICONS.search}<input id="ordSearch" class="input" placeholder="Tìm mã đơn, tên khách, SĐT..." value="${esc(ui.orderSearch)}" /></div><div class="pill-group">${['ALL','CONFIRMED','COMPLETED','WAITING_FOR_STOCK'].map((s) => `<button class="pill ${ui.orderStatus === s ? 'active' : ''}" data-ordst="${s}">${s === 'ALL' ? 'Tất cả' : s}</button>`).join('')}</div></div>
      <div class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Mã đơn</th><th>Ngày</th><th>Khách hàng</th><th class="num">Tổng</th><th class="num">Đã thu</th><th class="num">Còn nợ</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>
        ${pg.items.map((o) => { const c = getCustomer(o.customerId), paid = o.payments.reduce((s, p) => s + p.amount, 0), due = Math.max(0, o.total - paid); return `<tr><td class="mono" style="font-weight:700">${o.id}</td><td class="mono muted-xs">${o.date}</td><td><strong>${esc(c ? c.name : '')}</strong><div class="muted-xs mono">${esc(c ? c.phone : '')}</div></td><td class="num mono">${fmtVnd(o.total)}</td><td class="num mono" style="color:var(--ok-text)">${fmtVnd(paid)}</td><td class="num mono" style="color:${due > 0 ? 'var(--warn-text)' : 'var(--text-muted)'}">${fmtVnd(due)}</td><td><span class="badge ${o.status === 'COMPLETED' ? 'badge-ok' : 'badge-info'}">${o.status}</span></td><td style="white-space:nowrap">${due > 0 ? `<button class="btn btn-xs btn-primary" data-payord="${o.id}">Thu nốt</button> ` : ''}<button class="btn btn-xs" data-printord="${o.id}">In</button></td></tr>`; }).join('')}
      </tbody></table></div>${renderPaginationBar(pg, 'ordpage')}</div>
    `;
    document.getElementById('ordNewBtn').onclick = () => { state.activeStoreView = 'pos'; saveState(); renderAll(); };
    document.getElementById('ordSearch').oninput = (e) => { ui.orderSearch = e.target.value; ui.orderPage = 1; renderOrdersView(container); };
    container.querySelectorAll('[data-ordst]').forEach((b) => b.onclick = () => { ui.orderStatus = b.dataset.ordst; renderOrdersView(container); });
    container.querySelectorAll('[data-ordpage]').forEach((b) => b.onclick = () => { ui.orderPage = Number(b.dataset.ordpage); renderOrdersView(container); });
    container.querySelectorAll('[data-payord]').forEach((b) => b.onclick = () => { const o = state.orders.find((x) => x.id === b.dataset.payord); const due = Math.max(0, o.total - o.payments.reduce((s, p) => s + p.amount, 0)); o.payments.push({ id: 'PAY-' + Date.now(), date: nowStr(), method: 'CASH', type: 'FINAL', amount: due, confirmedBy: state.role, verified: true }); o.status = 'COMPLETED'; const c = getCustomer(o.customerId); if (c) c.totalSpent += due; saveState(); renderAll(); toast(`Đã thu đủ ${fmtVnd(due)}!`); });
    container.querySelectorAll('[data-printord]').forEach((b) => b.onclick = () => { const o = state.orders.find((x) => x.id === b.dataset.printord); openPrintReceiptModal(o, state.productionJobs.find((x) => x.orderId === o.id), getCustomer(o.customerId)); });
  }

  function renderExamWorkbenchView(container) {
    const cust = getCustomer(ui.examCustId) || state.customers[0];
    const custExams = state.examinations.filter((e) => e.customerId === cust.id).sort((a, b) => b.date.localeCompare(a.date));
    const latest = custExams[0], prev = custExams[1];
    const deltaOd = (latest && prev) ? (parseFloat(latest.prescription.od.sph) - parseFloat(prev.prescription.od.sph)).toFixed(2) : null;
    const lensProducts = state.products.filter((p) => p.category === 'LENS_BLANK');

    container.innerHTML = `
      <div class="page-head">
        <div><h1 class="page-title">Phòng Đo mắt &amp; Toa kính (KTV Khúc xạ)</h1><p class="page-sub">Split-View: Đối chiếu biểu đồ độ cận &amp; lịch sử đo cũ bên trái khi thực hành đo mới bên phải</p></div>
        <div style="display:flex;gap:8px;align-items:center"><span class="muted-xs">Khách đang đo:</span><select id="examCustSel" class="select" style="width:auto;min-width:220px">${state.customers.map((c) => `<option value="${c.id}" ${c.id === cust.id ? 'selected' : ''}>${esc(c.name)} — ${esc(c.phone)}</option>`).join('')}</select></div>
      </div>
      <div class="split-2">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="card"><div class="card-head"><h2 class="card-title">Biểu đồ tiến triển độ cận (${esc(cust.name)})</h2>${deltaOd !== null ? `<span class="badge ${parseFloat(deltaOd) < 0 ? 'badge-warn' : 'badge-ok'}">Δ OD: ${deltaOd > 0 ? '+' : ''}${deltaOd}D</span>` : '<span class="badge badge-neutral">Lần đo đầu</span>'}</div><div class="card-body">${renderMyopiaChartSVG(custExams)}</div></div>
          <div class="card"><div class="card-head"><h2 class="card-title">Lịch sử các lần đo trước (${custExams.length})</h2><button class="btn btn-xs" id="examOpenCust360">Hồ sơ 360° →</button></div><div class="card-body" style="display:flex;flex-direction:column;gap:10px;max-height:360px;overflow-y:auto">
            ${custExams.map((e, idx) => `<div style="padding:10px;border:1px solid ${idx === 0 ? 'var(--accent-border)' : 'var(--border-subtle)'};background:${idx === 0 ? 'var(--accent-subtle)' : '#FFF'};border-radius:8px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><strong class="mono">${e.date} · ${e.id}</strong><button class="btn btn-xs btn-primary" data-ex2pos="${e.id}">Đẩy POS</button></div><table class="rx-table"><thead><tr><th>Mắt</th><th>SPH</th><th>CYL</th><th>AXIS</th><th>PD</th></tr></thead><tbody><tr><td><strong>OD</strong></td><td>${e.prescription.od.sph}</td><td>${e.prescription.od.cyl}</td><td>${e.prescription.od.axis}°</td><td rowspan="2">${e.prescription.pd}mm</td></tr><tr><td><strong>OS</strong></td><td>${e.prescription.os.sph}</td><td>${e.prescription.os.cyl}</td><td>${e.prescription.os.axis}°</td></tr></tbody></table><div class="muted-xs" style="margin-top:5px">${esc(e.lensConfig.lensName)} · ${esc(e.note)}</div></div>`).join('')}
          </div></div>
        </div>
        <div class="card"><div class="card-head"><h2 class="card-title">Nhập kết quả đo mắt mới / Toa ngoài</h2></div><div class="card-body">
          <form id="optomForm" style="display:flex;flex-direction:column;gap:12px">
            <div class="form-grid-2"><div class="field"><label>Nguồn đo</label><select name="source" id="optomSourceSel" class="select"><option value="IN_STORE">Đo tại cửa hàng</option><option value="EXTERNAL_RX">Tiếp nhận toa ngoài</option></select></div><div class="field"><label>KTV thực hiện</label><input name="optometrist" class="input" value="KTV Hoàng Nam" /></div></div>
            <div id="optomExtBox" class="hidden" style="background:var(--info-bg);padding:10px;border-radius:8px"><div class="form-grid-2"><div class="field"><label>Bệnh viện / Cơ sở</label><input name="externalClinic" class="input" placeholder="BV Mắt TW" /></div><div class="field"><label>Ảnh toa kính</label><input type="file" id="optomFileInp" accept="image/*" class="input" /></div></div></div>
            <table class="rx-table"><thead><tr><th>Mắt</th><th>SPH</th><th>CYL</th><th>AXIS</th><th>ADD</th><th>Prism</th></tr></thead><tbody>
              <tr><td><strong>OD</strong></td><td><input name="od_sph" class="rx-input" value="${latest ? latest.prescription.od.sph : '-1.50'}" /></td><td><input name="od_cyl" class="rx-input" value="${latest ? latest.prescription.od.cyl : '-0.25'}" /></td><td><input name="od_axis" class="rx-input" value="${latest ? latest.prescription.od.axis : '180'}" /></td><td><input name="od_add" class="rx-input" placeholder="—" /></td><td><input name="od_prism" class="rx-input" placeholder="—" /></td></tr>
              <tr><td><strong>OS</strong></td><td><input name="os_sph" class="rx-input" value="${latest ? latest.prescription.os.sph : '-1.50'}" /></td><td><input name="os_cyl" class="rx-input" value="${latest ? latest.prescription.os.cyl : '-0.25'}" /></td><td><input name="os_axis" class="rx-input" value="${latest ? latest.prescription.os.axis : '175'}" /></td><td><input name="os_add" class="rx-input" placeholder="—" /></td><td><input name="os_prism" class="rx-input" placeholder="—" /></td></tr>
            </tbody></table>
            <div class="form-grid-2"><div class="field"><label>PD (mm)</label><input name="pd" class="input mono" value="${latest ? latest.prescription.pd : '62'}" /></div><div class="field"><label>Phôi tròng khuyến nghị</label><select name="lensProductId" class="select">${lensProducts.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></div></div>
            <div class="field"><label>Nhận xét KTV</label><textarea name="note" rows="2" class="textarea" placeholder="Thị lực sau chỉnh 10/10..."></textarea></div>
            <div style="display:flex;justify-content:flex-end"><button type="submit" class="btn btn-primary">Lưu vào Sổ Kính</button></div>
          </form>
        </div></div>
      </div>
    `;
    document.getElementById('examCustSel').onchange = (e) => { ui.examCustId = e.target.value; renderExamWorkbenchView(container); };
    document.getElementById('examOpenCust360').onclick = () => { state.activeStoreView = 'customers'; state.activeCustomerDetailId = cust.id; saveState(); renderAll(); };
    document.getElementById('optomSourceSel').onchange = (e) => document.getElementById('optomExtBox').classList.toggle('hidden', e.target.value !== 'EXTERNAL_RX');
    container.querySelectorAll('[data-ex2pos]').forEach((b) => b.onclick = () => { const ex = state.examinations.find((x) => x.id === b.dataset.ex2pos); ui.posCustomerId = ex.customerId; ui.posExamId = ex.id; addToCart(getProduct(ex.lensConfig.productId)); state.activeStoreView = 'pos'; saveState(); renderAll(); toast('Đã đẩy toa kính sang POS!'); });
    document.getElementById('optomForm').onsubmit = (e) => {
      e.preventDefault(); const fd = new FormData(e.target), lp = getProduct(fd.get('lensProductId')), num = String(state.examinations.length + 20).padStart(3, '0');
      state.examinations.unshift({ id: `EXM-2026-${num}`, customerId: cust.id, date: todayStr(), source: fd.get('source'), optometrist: fd.get('optometrist'), externalClinic: fd.get('externalClinic') || '', externalImageUrl: '', note: fd.get('note') || 'Đo tiêu chuẩn.', prescription: { id: `RX-2026-${num}`, od: { sph: fd.get('od_sph'), cyl: fd.get('od_cyl'), axis: fd.get('od_axis'), add: fd.get('od_add'), prism: fd.get('od_prism') }, os: { sph: fd.get('os_sph'), cyl: fd.get('os_cyl'), axis: fd.get('os_axis'), add: fd.get('os_add'), prism: fd.get('os_prism') }, pd: fd.get('pd'), fittingHeight: '18mm' }, lensConfig: { id: `LC-${num}`, productId: lp.id, lensName: lp.name, index: '1.60', coating: 'Lọc ánh sáng xanh' } });
      saveState(); renderAll(); toast(`Đã lưu lần đo EXM-2026-${num}!`);
    };
  }

  function renderLabView(container) {
    const activeCols = ['CONFIRMED', 'PREP', 'CUT_MOUNT', 'QC', 'READY'];
    const filtered = state.productionJobs.filter((j) => {
      const c = getCustomer(j.customerId);
      if (ui.labSearch) { const q = ui.labSearch.toLowerCase(); return j.id.toLowerCase().includes(q) || j.orderId.toLowerCase().includes(q) || (c && c.name.toLowerCase().includes(q)); }
      return true;
    });
    container.innerHTML = `
      <div class="page-head"><div><h1 class="page-title">Sản xuất Nội bộ &amp; Kiểm tra QC (Lab Kanban)</h1><p class="page-sub">Bấm vào phiếu để chuyển công đoạn, tích QC 4 bước hoặc báo mài hỏng (Rework)</p></div></div>
      <div class="crud-toolbar"><div class="search-box">${ICONS.search}<input id="labSearch" class="input" placeholder="Tìm mã JOB, mã đơn ORD, tên khách..." value="${esc(ui.labSearch)}" /></div></div>
      <div class="kanban-board">${activeCols.map((st) => {
        const jobs = filtered.filter((j) => j.stage === st);
        return `<div class="kanban-col"><div class="kanban-col-head"><span>${STAGE_META[st].label}</span><span class="badge ${STAGE_META[st].badge}">${jobs.length}</span></div>${jobs.length === 0 ? '<div class="muted-xs" style="text-align:center;padding:20px">Trống</div>' : jobs.map((j) => { const c = getCustomer(j.customerId); return `<div class="kanban-card" data-openjob="${j.id}"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><strong class="mono" style="font-size:12px">${j.id}</strong>${j.reworkCount > 0 ? `<span class="badge badge-err">Rework ×${j.reworkCount}</span>` : `<span class="muted-xs mono">${j.orderId}</span>`}</div><div style="font-weight:600">${esc(c ? c.name : '')}</div><div class="muted-xs">${esc(j.frameName)}</div><div class="mono" style="font-size:11px;background:var(--bg-subtle);padding:5px;border-radius:5px;margin:6px 0">${esc(j.rxSummary)}</div><div style="display:flex;justify-content:space-between;font-size:11.5px"><span class="muted">${esc(j.technician)}</span><span class="mono" style="color:var(--accent-primary)">${esc(j.dueDate)}</span></div></div>`; }).join('')}</div>`;
      }).join('')}</div>
    `;
    document.getElementById('labSearch').oninput = (e) => { ui.labSearch = e.target.value; renderLabView(container); };
    container.querySelectorAll('[data-openjob]').forEach((el) => el.onclick = () => openLabJobDrawer(el.dataset.openjob));
  }

  function openLabJobDrawer(jobId) {
    const job = state.productionJobs.find((j) => j.id === jobId); if (!job) return;
    const customer = getCustomer(job.customerId), idx = STAGE_ORDER.indexOf(job.stage), nextStage = STAGE_ORDER[idx + 1];
    openDrawer(`PHIẾU LAB · ${job.orderId}`, `${job.id} — ${customer.name}`, `
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="stepper">${['CONFIRMED','PREP','CUT_MOUNT','QC','READY'].map((s, sIdx) => `<div class="step-pill ${sIdx < idx ? 'done' : sIdx === idx ? 'current' : ''}">${STAGE_META[s].label.replace(/^\d+\.\s*/, '')}</div>`).join('')}</div>
        <div class="card" style="padding:12px"><div class="kv-list"><div class="kv-k">Khách hàng</div><div class="kv-v">${esc(customer.name)} (${esc(customer.phone)})</div><div class="kv-k">Gọng kính</div><div class="kv-v">${esc(job.frameName)}</div><div class="kv-k">Tròng kính</div><div class="kv-v">${esc(job.lensConfigSummary)}</div><div class="kv-k">Thông số</div><div class="kv-v mono">${esc(job.rxSummary)}</div></div></div>
        <div class="card" style="padding:12px"><div style="font-weight:700;margin-bottom:8px">Checklist QC 4 bước</div><div style="display:flex;flex-direction:column;gap:7px">
          <label style="display:flex;gap:8px"><input type="checkbox" data-qc="pdMatch" ${job.qcChecklist.pdMatch ? 'checked' : ''} /> Đúng tâm PD &amp; chiều cao lắp</label>
          <label style="display:flex;gap:8px"><input type="checkbox" data-qc="powerMatch" ${job.qcChecklist.powerMatch ? 'checked' : ''} /> Đúng số độ trên máy Lensometer</label>
          <label style="display:flex;gap:8px"><input type="checkbox" data-qc="noScratch" ${job.qcChecklist.noScratch ? 'checked' : ''} /> Không trầy xước lớp váng phủ</label>
          <label style="display:flex;gap:8px"><input type="checkbox" data-qc="frameAligned" ${job.qcChecklist.frameAligned ? 'checked' : ''} /> Cân chỉnh gọng &amp; siết ốc đều</label>
        </div></div>
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <button class="btn btn-danger" id="jobReworkBtn">Báo hỏng phôi (Rework)</button>
          ${nextStage ? `<button class="btn btn-primary" id="jobNextBtn">Chuyển → ${STAGE_META[nextStage].label}</button>` : '<span class="badge badge-ok">Đã bàn giao</span>'}
        </div>
      </div>
    `);
    document.querySelectorAll('[data-qc]').forEach((cb) => cb.onchange = () => { job.qcChecklist[cb.dataset.qc] = cb.checked; saveState(); });
    document.getElementById('jobReworkBtn').onclick = () => { job.reworkCount++; job.stage = 'PREP'; job.qcChecklist = { pdMatch: false, powerMatch: false, noScratch: false, frameAligned: false }; logInventory(job.lensProductId, 'LAB_SPOILAGE', -1, job.id, `Mài hỏng phôi ${job.id}`); saveState(); openLabJobDrawer(job.id); renderAll(); toast('Đã ghi nhận Rework & trừ phôi hỏng!'); };
    const nb = document.getElementById('jobNextBtn');
    if (nb) nb.onclick = () => {
      if (nextStage === 'READY' && !Object.values(job.qcChecklist).every(Boolean)) { toast('Cần tích đủ 4/4 tiêu chí QC!'); return; }
      if (nextStage === 'READY') pushZalo(customer.name, customer.phone, 'LAB_JOB_READY', `Bộ kính ${job.frameName} đã hoàn tất QC và sẵn sàng bàn giao!`, customer);
      job.stage = nextStage; const eyw = state.eyewearUnits.find((e) => e.id === job.eyewearId); if (eyw) eyw.status = nextStage === 'HANDED_OVER' ? 'HANDED_OVER' : (nextStage === 'READY' ? 'READY' : 'IN_LAB');
      saveState(); openLabJobDrawer(job.id); renderAll(); toast(`Đã chuyển sang ${STAGE_META[nextStage].label}`);
    };
  }

  function renderCustomersListView(container) {
    const filtered = state.customers.filter((c) => {
      if (ui.custTier !== 'ALL' && !c.tier.includes(ui.custTier)) return false;
      if (ui.custSearch) { const q = ui.custSearch.toLowerCase(); return c.name.toLowerCase().includes(q) || c.phone.includes(q); }
      return true;
    });
    const pg = paginate(filtered, ui.custPage, 8); ui.custPage = pg.page;
    container.innerHTML = `
      <div class="page-head"><div><h1 class="page-title">Danh sách Khách hàng</h1><p class="page-sub">Bấm vào khách hàng để mở Hồ sơ 360° &amp; Dòng thời gian</p></div><button class="btn btn-primary" id="addCustBtn">+ Thêm khách hàng</button></div>
      <div class="crud-toolbar"><div class="search-box">${ICONS.search}<input id="custSearch" class="input" placeholder="Tìm tên khách hàng, số điện thoại..." value="${esc(ui.custSearch)}" /></div><div class="pill-group">${['ALL','Gold','Silver','Khách mới'].map((t) => `<button class="pill ${ui.custTier === t ? 'active' : ''}" data-ctier="${t}">${t === 'ALL' ? 'Tất cả' : t}</button>`).join('')}</div></div>
      <div class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Khách hàng</th><th>SĐT</th><th>Hạng</th><th>Zalo OA</th><th class="num">Tổng chi tiêu</th><th>Thao tác</th></tr></thead><tbody>
        ${pg.items.map((c) => `<tr class="clickable" data-opencust="${c.id}"><td><strong>${esc(c.name)}</strong><div class="muted-xs">${esc(c.email || '—')}</div></td><td class="mono">${esc(c.phone)}</td><td><span class="badge badge-teal">${esc(c.tier)}</span></td><td>${c.zaloLinked ? '<span class="badge badge-ok">Đã liên kết</span>' : '<span class="badge badge-warn">Chưa liên kết</span>'}</td><td class="num mono" style="font-weight:700">${fmtVnd(c.totalSpent)}</td><td style="white-space:nowrap" onclick="event.stopPropagation()"><button class="btn btn-xs" data-editcust="${c.id}">Sửa</button> <button class="btn btn-xs btn-danger" data-delcust="${c.id}">Xóa</button></td></tr>`).join('')}
      </tbody></table></div>${renderPaginationBar(pg, 'custpage')}</div>
    `;
    document.getElementById('addCustBtn').onclick = () => openCustomerCrudDrawer(null);
    document.getElementById('custSearch').oninput = (e) => { ui.custSearch = e.target.value; renderCustomersListView(container); };
    container.querySelectorAll('[data-ctier]').forEach((b) => b.onclick = () => { ui.custTier = b.dataset.ctier; renderCustomersListView(container); });
    container.querySelectorAll('[data-custpage]').forEach((b) => b.onclick = () => { ui.custPage = Number(b.dataset.custpage); renderCustomersListView(container); });
    container.querySelectorAll('[data-opencust]').forEach((tr) => tr.onclick = () => { state.activeCustomerDetailId = tr.dataset.opencust; saveState(); renderAll(); });
    container.querySelectorAll('[data-editcust]').forEach((b) => b.onclick = () => openCustomerCrudDrawer(b.dataset.editcust));
    container.querySelectorAll('[data-delcust]').forEach((b) => b.onclick = () => { state.customers = state.customers.filter((x) => x.id !== b.dataset.delcust); saveState(); renderAll(); toast('Đã xóa khách hàng.'); });
  }

  function renderCustomerDetailView(container, custId) {
    const c = getCustomer(custId); if (!c) { state.activeCustomerDetailId = null; renderCustomersListView(container); return; }
    const orders = state.orders.filter((o) => o.customerId === c.id), exams = state.examinations.filter((e) => e.customerId === c.id).sort((a, b) => b.date.localeCompare(a.date)), eyws = state.eyewearUnits.filter((e) => e.customerId === c.id), wrts = state.warranties.filter((w) => w.customerId === c.id), jobs = state.productionJobs.filter((j) => j.customerId === c.id);
    const timeline = [...wrts.map((w) => ({ date: w.date, tag: 'Bảo hành', badge: 'badge-warn', title: `${w.id} — ${w.issueType}`, sub: w.note })), ...jobs.map((j) => ({ date: j.dueDate.slice(0, 10), tag: 'Sản xuất', badge: 'badge-teal', title: `Production ${j.id}`, sub: j.frameName })), ...orders.map((o) => ({ date: o.date, tag: 'Đơn hàng', badge: 'badge-info', title: `Order ${o.id} — ${fmtVnd(o.total)}`, sub: o.items.map((i) => i.name).join(', ') })), ...exams.map((e) => ({ date: e.date, tag: 'Đo mắt', badge: 'badge-neutral', title: e.prescription.id, sub: `OD ${e.prescription.od.sph} · OS ${e.prescription.os.sph} · PD ${e.prescription.pd}` }))].sort((a, b) => b.date.localeCompare(a.date));
    container.innerHTML = `
      <div class="page-head"><div><button class="btn btn-xs" id="backCust" style="margin-bottom:6px">‹ Quay lại</button><h1 class="page-title">${esc(c.name)}</h1><p class="page-sub mono">${esc(c.phone)} · ${esc(c.tier)}</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="cdRx">Thêm toa kính</button><button class="btn" id="cdBudget">Tư vấn Ngân sách AI</button><button class="btn btn-primary" id="cdOrd">Tạo đơn</button><button class="btn" id="cdEdit">Chỉnh sửa</button></div></div>
      <div class="kpi-grid">
        <div class="kpi-card"><div class="kpi-label">Đơn gần nhất</div><div class="kpi-val mono">${orders[0] ? orders[0].id : '—'}</div><div class="kpi-sub">${orders[0] ? orders[0].status : 'Chưa có'}</div></div>
        <div class="kpi-card blue"><div class="kpi-label">Lần đo gần nhất</div><div class="kpi-val mono">${exams[0] ? exams[0].date : '—'}</div><div class="kpi-sub">${exams[0] ? (exams[0].source === 'IN_STORE' ? 'Tại cửa hàng' : 'Toa ngoài') : 'Chưa đo'}</div></div>
        <div class="kpi-card slate"><div class="kpi-label">Kính hiện tại</div><div class="kpi-val" style="font-size:14px">${eyws[0] ? esc(eyws[0].frameName) : '—'}</div><div class="kpi-sub">${eyws[0] ? eyws[0].status : ''}</div></div>
        <div class="kpi-card amber"><div class="kpi-label">Bảo hành đang mở</div><div class="kpi-val mono">${wrts.filter((w) => w.status === 'OPEN').length}</div><div class="kpi-sub">${wrts[0] ? esc(wrts[0].issueType) : 'Không có'}</div></div>
      </div>
      <div style="display:grid;grid-template-columns:minmax(0,1.55fr) minmax(280px,0.85fr);gap:16px;align-items:start">
        <div style="display:flex;flex-direction:column;gap:16px">
          <div class="card"><div class="card-head"><h2 class="card-title">Dòng thời gian</h2></div><div class="card-body"><div class="ref-timeline">${timeline.map((t) => `<div class="ref-tl-item"><div style="display:flex;gap:8px;align-items:center"><span class="badge ${t.badge}">${t.tag}</span><strong>${esc(t.title)}</strong></div><div class="muted-xs">${esc(t.sub)}</div><div class="muted-xs mono">${esc(t.date)}</div></div>`).join('')}</div></div></div>
          <div class="card"><div class="card-head"><h2 class="card-title">Biểu đồ tiến triển độ cận</h2></div><div class="card-body">${renderMyopiaChartSVG(exams)}</div></div>
        </div>
        <div class="card"><div class="card-head"><h2 class="card-title">Thông tin</h2></div><div class="card-body"><div class="kv-list"><div class="kv-k">Điện thoại</div><div class="kv-v mono">${esc(c.phone)}</div><div class="kv-k">Email</div><div class="kv-v">${esc(c.email || '—')}</div><div class="kv-k">Ngày sinh</div><div class="kv-v mono">${esc(c.dob || '—')}</div><div class="kv-k">Địa chỉ</div><div class="kv-v">${esc(c.address || '—')}</div><div class="kv-k">Ghi chú</div><div class="kv-v muted">${esc(c.notes || '—')}</div></div></div></div>
      </div>
    `;
    document.getElementById('backCust').onclick = () => { state.activeCustomerDetailId = null; saveState(); renderAll(); };
    document.getElementById('cdRx').onclick = () => { ui.examCustId = c.id; state.activeStoreView = 'exam'; saveState(); renderAll(); };
    document.getElementById('cdBudget').onclick = () => { ui.budgetCustId = c.id; state.activeStoreView = 'budget'; saveState(); renderAll(); };
    document.getElementById('cdOrd').onclick = () => { ui.posCustomerId = c.id; state.activeStoreView = 'pos'; saveState(); renderAll(); };
    document.getElementById('cdEdit').onclick = () => openCustomerCrudDrawer(c.id);
  }

  function openCustomerCrudDrawer(custId) {
    const c = custId ? getCustomer(custId) : null;
    openDrawer('KHÁCH HÀNG', c ? `Sửa: ${c.name}` : 'Thêm khách hàng', `
      <form id="custCrudForm" style="display:flex;flex-direction:column;gap:11px">
        <div class="form-grid-2"><div class="field"><label>Họ tên *</label><input name="name" class="input" value="${esc(c ? c.name : '')}" required /></div><div class="field"><label>SĐT *</label><input name="phone" class="input mono" value="${esc(c ? c.phone : '')}" required /></div></div>
        <div class="form-grid-2"><div class="field"><label>Email</label><input name="email" class="input" value="${esc(c ? c.email : '')}" /></div><div class="field"><label>Địa chỉ</label><input name="address" class="input" value="${esc(c ? c.address : '')}" /></div></div>
        <div class="field"><label>Ghi chú</label><textarea name="notes" rows="2" class="textarea">${esc(c ? c.notes : '')}</textarea></div>
        <div style="display:flex;justify-content:flex-end"><button type="submit" class="btn btn-primary">Lưu</button></div>
      </form>
    `);
    document.getElementById('custCrudForm').onsubmit = (e) => {
      e.preventDefault(); const fd = new FormData(e.target);
      const d = { name: fd.get('name'), phone: fd.get('phone'), email: fd.get('email'), address: fd.get('address'), notes: fd.get('notes') };
      if (c) Object.assign(c, d); else state.customers.unshift({ id: 'CUS-' + String(state.customers.length + 1).padStart(3, '0'), ...d, dob: '', gender: 'Khác', tier: 'Khách mới', zaloLinked: false, zaloConsent: false, familyGroup: '', totalSpent: 0, createdAt: todayStr() });
      saveState(); closeDrawer(); renderAll(); toast('Đã lưu hồ sơ khách hàng!');
    };
  }

  function renderAppointmentsView(container) {
    const filtered = state.appointments.filter((a) => (ui.aptType === 'ALL' || a.type === ui.aptType) && (!ui.aptSearch || a.customerName.toLowerCase().includes(ui.aptSearch.toLowerCase()) || a.phone.includes(ui.aptSearch)));
    container.innerHTML = `
      <div class="page-head"><div><h1 class="page-title">Lịch hẹn &amp; Yêu cầu từ Website</h1><p class="page-sub">Đồng bộ tức thì từ Website &amp; AI Budget Planner</p></div></div>
      <div class="crud-toolbar"><div class="search-box">${ICONS.search}<input id="aptSearch" class="input" placeholder="Tìm khách hàng, SĐT..." value="${esc(ui.aptSearch)}" /></div><div class="pill-group">${['ALL','APPOINTMENT','ORDER_INQUIRY'].map((t) => `<button class="pill ${ui.aptType === t ? 'active' : ''}" data-aptt="${t}">${t === 'ALL' ? 'Tất cả' : t === 'APPOINTMENT' ? 'Lịch đo mắt' : 'Yêu cầu mua'}</button>`).join('')}</div></div>
      <div class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Mã</th><th>Loại</th><th>Khách</th><th>Hẹn</th><th>Nội dung</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>
        ${filtered.map((a) => `<tr><td class="mono">${a.id}</td><td><span class="badge ${a.type === 'APPOINTMENT' ? 'badge-info' : 'badge-teal'}">${a.type === 'APPOINTMENT' ? 'Đặt lịch' : 'Yêu cầu'}</span></td><td><strong>${esc(a.customerName)}</strong><div class="muted-xs mono">${esc(a.phone)}</div></td><td class="mono">${esc(a.scheduledAt)}</td><td>${esc(a.productRef)}</td><td><span class="badge ${a.status === 'CONFIRMED' ? 'badge-ok' : 'badge-warn'}">${a.status}</span></td><td>${a.status === 'PENDING' ? `<button class="btn btn-xs btn-primary" data-okapt="${a.id}">Xác nhận</button>` : '—'}</td></tr>`).join('')}
      </tbody></table></div></div>
    `;
    document.getElementById('aptSearch').oninput = (e) => { ui.aptSearch = e.target.value; renderAppointmentsView(container); };
    container.querySelectorAll('[data-aptt]').forEach((b) => b.onclick = () => { ui.aptType = b.dataset.aptt; renderAppointmentsView(container); });
    container.querySelectorAll('[data-okapt]').forEach((b) => b.onclick = () => { const a = state.appointments.find((x) => x.id === b.dataset.okapt); a.status = 'CONFIRMED'; pushZalo(a.customerName, a.phone, 'APPOINTMENT_CONFIRMED', `Xác nhận ${a.productRef} lúc ${a.scheduledAt}.`); saveState(); renderAll(); toast('Đã xác nhận & gửi Zalo!'); });
  }

  function renderWarrantyView(container) {
    const filtered = state.warranties.filter((w) => (ui.wrtStatus === 'ALL' || w.status === ui.wrtStatus) && (!ui.wrtSearch || w.issueType.toLowerCase().includes(ui.wrtSearch.toLowerCase())));
    container.innerHTML = `
      <div class="page-head"><div><h1 class="page-title">Bảo hành &amp; Dịch vụ Sau bán</h1></div><button class="btn btn-primary" id="addWrtBtn">+ Tiếp nhận Bảo hành</button></div>
      <div class="crud-toolbar"><div class="search-box">${ICONS.search}<input id="wrtSearch" class="input" placeholder="Tìm nội dung bảo hành..." value="${esc(ui.wrtSearch)}" /></div><div class="pill-group">${['ALL','OPEN','COMPLETED'].map((s) => `<button class="pill ${ui.wrtStatus === s ? 'active' : ''}" data-wrtst="${s}">${s === 'ALL' ? 'Tất cả' : s}</button>`).join('')}</div></div>
      <div class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Mã</th><th>Ngày</th><th>Khách</th><th>Bộ kính</th><th>Nội dung</th><th>Trạng thái</th><th></th></tr></thead><tbody>
        ${filtered.map((w) => { const c = getCustomer(w.customerId); return `<tr><td class="mono">${w.id}</td><td class="mono">${w.date}</td><td><strong>${esc(c ? c.name : '')}</strong></td><td class="mono">${w.eyewearId}</td><td><strong>${esc(w.issueType)}</strong><div class="muted-xs">${esc(w.note)}</div></td><td><span class="badge ${w.status === 'COMPLETED' ? 'badge-ok' : 'badge-warn'}">${w.status}</span></td><td>${w.status === 'OPEN' ? `<button class="btn btn-xs btn-primary" data-dwrt="${w.id}">Hoàn tất</button>` : ''}</td></tr>`; }).join('')}
      </tbody></table></div></div>
    `;
    document.getElementById('wrtSearch').oninput = (e) => { ui.wrtSearch = e.target.value; renderWarrantyView(container); };
    container.querySelectorAll('[data-wrtst]').forEach((b) => b.onclick = () => { ui.wrtStatus = b.dataset.wrtst; renderWarrantyView(container); });
    container.querySelectorAll('[data-dwrt]').forEach((b) => b.onclick = () => { const w = state.warranties.find((x) => x.id === b.dataset.dwrt); if (w) w.status = 'COMPLETED'; saveState(); renderAll(); toast('Đã hoàn tất!'); });
    document.getElementById('addWrtBtn').onclick = () => {
      openDrawer('BẢO HÀNH', 'Tiếp nhận phiếu bảo hành', `<form id="nwForm" style="display:flex;flex-direction:column;gap:11px"><div class="field"><label>Bộ kính</label><select name="eyewearId" class="select">${state.eyewearUnits.map((e) => `<option value="${e.id}">[${e.id}] ${esc(getCustomer(e.customerId)?.name)} — ${esc(e.frameName)}</option>`).join('')}</select></div><div class="field"><label>Loại xử lý</label><input name="issueType" class="input" value="Chỉnh gọng & Thay đệm mũi" /></div><div class="field"><label>Ghi chú</label><textarea name="note" rows="2" class="textarea" required></textarea></div><div style="display:flex;justify-content:flex-end"><button type="submit" class="btn btn-primary">Lưu phiếu</button></div></form>`);
      document.getElementById('nwForm').onsubmit = (e) => { e.preventDefault(); const fd = new FormData(e.target), eyw = state.eyewearUnits.find((x) => x.id === fd.get('eyewearId')); state.warranties.unshift({ id: 'WRT-' + String(state.warranties.length + 1).padStart(3, '0'), date: todayStr(), customerId: eyw.customerId, eyewearId: eyw.id, issueType: fd.get('issueType'), coverage: 'Trong hạn BH', status: 'OPEN', fee: 0, note: fd.get('note') }); saveState(); closeDrawer(); renderAll(); toast('Đã tạo phiếu bảo hành!'); };
    };
  }

  function renderCrmAutomationView(container) {
    container.innerHTML = `
      <div class="page-head"><div><h1 class="page-title">CSKH Tự động &amp; Zalo OA Outbox</h1></div></div>
      <div class="card" style="margin-bottom:16px"><div class="card-head"><h2 class="card-title">Kịch bản gửi tin tự động theo lịch</h2></div><div class="card-body" style="display:flex;flex-direction:column;gap:10px">
        ${state.automationRules.map((r) => `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:11px;border:1px solid var(--border-subtle);border-radius:9px;flex-wrap:wrap"><div style="flex:1"><strong>${esc(r.name)}</strong> <span class="badge badge-info">${esc(r.trigger)}</span> <span class="badge ${r.enabled ? 'badge-ok' : 'badge-neutral'}">${r.enabled ? 'Bật' : 'Tắt'}</span><div class="muted-xs" style="margin-top:3px">"${esc(r.template)}"</div></div><div style="display:flex;gap:6px"><button class="btn btn-xs" data-tauto="${r.id}">${r.enabled ? 'Tắt' : 'Bật'}</button><button class="btn btn-xs btn-primary" data-rauto="${r.id}">Chạy thử</button></div></div>`).join('')}
      </div></div>
      <div class="card"><div class="card-head"><h2 class="card-title">Zalo OA Outbox Log (${state.zaloOutbox.length})</h2></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Mã</th><th>Thời gian</th><th>Sự kiện</th><th>Khách</th><th>Nội dung</th><th>Trạng thái</th><th></th></tr></thead><tbody>
        ${state.zaloOutbox.map((z) => `<tr><td class="mono">${z.id}</td><td class="mono muted-xs">${z.time}</td><td class="mono" style="font-size:11.5px">${z.event}</td><td><strong>${esc(z.customerName)}</strong></td><td>${esc(z.message)}</td><td><span class="badge ${z.status === 'DELIVERED' ? 'badge-ok' : 'badge-err'}">${z.status}</span></td><td>${z.status !== 'DELIVERED' ? `<button class="btn btn-xs" data-rz="${z.id}">Retry</button>` : ''}</td></tr>`).join('')}
      </tbody></table></div></div>
    `;
    container.querySelectorAll('[data-tauto]').forEach((b) => b.onclick = () => { const r = state.automationRules.find((x) => x.id === b.dataset.tauto); r.enabled = !r.enabled; saveState(); renderAll(); });
    container.querySelectorAll('[data-rauto]').forEach((b) => b.onclick = () => { const r = state.automationRules.find((x) => x.id === b.dataset.rauto), c = state.customers[0]; pushZalo(c.name, c.phone, `AUTO_${r.id}`, r.template.replace('{{name}}', c.name).replace('{{time}}', '17:30').replace('{{frame}}', 'Gọng Titanium'), c); saveState(); renderAll(); toast('Đã gửi thử kịch bản tự động!'); });
    container.querySelectorAll('[data-rz]').forEach((b) => b.onclick = () => { const z = state.zaloOutbox.find((x) => x.id === b.dataset.rz); z.status = 'DELIVERED'; z.message += ' [Retry OK]'; saveState(); renderAll(); toast('Gửi lại thành công!'); });
  }

  // ==================== SURFACE 2: PUBLIC WEBSITE (SCROLL PAGINATION, BUDGET PLANNER, TRY-ON, CMS & FOOTER) ====================
  function renderPortalCustomerSelect() {
    document.getElementById('portalCustomerSelect').innerHTML = state.customers.map((c) => `<option value="${c.id}" ${c.id === state.portalCustomerId ? 'selected' : ''}>${esc(c.name)} (${esc(c.phone)})</option>`).join('');
  }

  function renderPublicFooter() {
    const s = state.storeSettings;
    document.getElementById('pubFooter').innerHTML = `
      <div class="pub-container">
        <div class="pub-footer-grid">
          <div>
            <div style="font-family:var(--font-display);font-size:22px;color:#FFF;margin-bottom:6px">${esc(s.name)}</div>
            <div style="font-size:13px;opacity:0.85">${esc(s.address)}<br/>Hotline: ${esc(s.phone)} · ${esc(s.hours)}</div>
          </div>
          <div>
            <div style="font-weight:700;color:#FFF;margin-bottom:8px">Thông tin &amp; Chính sách</div>
            ${state.cmsPages.map((p) => `<button class="pub-footer-link" data-footcms="${p.slug}">${esc(p.title)}</button>`).join('')}
          </div>
          <div>
            <div style="font-weight:700;color:#FFF;margin-bottom:8px">Trải nghiệm Khách hàng</div>
            <button class="pub-footer-link" data-footview="budget">Lập kế hoạch ngân sách AI</button>
            <button class="pub-footer-link" data-footview="tryon">Thử kính Online (AI Try-On)</button>
            <button class="pub-footer-link" data-footview="eyebook">Sổ Kính &amp; Biểu đồ độ cận</button>
          </div>
        </div>
        <div style="padding-top:14px;font-size:12px;opacity:0.7;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <span>© 2026 ${esc(s.name)} — All rights reserved.</span>
          <span>Thanh toán tại cửa hàng: ${esc(s.bankInfo)}</span>
        </div>
      </div>
    `;
    document.querySelectorAll('[data-footcms]').forEach((b) => b.onclick = () => { state.activePublicView = 'about'; state.activeCmsSlug = b.dataset.footcms; saveState(); renderAll(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    document.querySelectorAll('[data-footview]').forEach((b) => b.onclick = () => { state.activePublicView = b.dataset.footview; saveState(); renderAll(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  function renderPublicView() {
    const main = document.getElementById('publicMain');
    if (state.activePublicView !== 'tryon') stopTryonCamera();
    if (state.activePublicView === 'storefront') renderPublicStorefront(main);
    else if (state.activePublicView === 'budget') renderBudgetPlannerModule(main, 'public');
    else if (state.activePublicView === 'tryon') renderPublicTryOn(main);
    else if (state.activePublicView === 'booking') renderPublicBooking(main);
    else if (state.activePublicView === 'eyebook') renderPublicEyeBook(main);
    else renderPublicStaticPages(main);
  }

  function renderPublicStorefront(container) {
    let list = state.products.filter((p) => {
      if (!p.publishedOnWeb) return false;
      if (ui.pubCat !== 'ALL' && p.category !== ui.pubCat) return false;
      if (ui.pubFace !== 'ALL' && !(p.faces || []).includes(ui.pubFace)) return false;
      if (!matchPriceRange(p.price, ui.pubPriceRange)) return false;
      if (ui.pubSearch) { const q = ui.pubSearch.toLowerCase(); return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q); }
      return true;
    });
    list = sortProducts(list, ui.pubSort);
    const visible = list.slice(0, ui.pubLimit);
    const hasMore = visible.length < list.length;

    container.innerHTML = `
      <div class="pub-container">
        <section class="pub-hero">
          <div>
            <span class="badge badge-teal">Cửa hàng Quang học Độc lập &amp; Phòng Lab nội bộ</span>
            <h1 class="pub-h1">Đo mắt chuẩn khúc xạ, lập ngân sách cùng AI và thử kính trực tuyến.</h1>
            <p class="muted" style="max-width:58ch;margin:0 0 18px">Khám phá bộ sưu tập gọng kính, lập kế hoạch combo Gọng + Tròng vừa túi tiền bằng AI, thử trực tiếp lên khuôn mặt trước khi ghé ${esc(state.storeSettings.address)}.</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <button class="btn btn-primary" id="heroBudgetBtn">Lập kế hoạch ngân sách AI</button>
              <button class="btn" id="heroTryOnBtn">Thử kính Online</button>
            </div>
          </div>
          <div class="card" style="padding:16px">
            <div class="kv-list">
              <div class="kv-k">Địa chỉ</div><div class="kv-v">${esc(state.storeSettings.address)}</div>
              <div class="kv-k">Giờ mở cửa</div><div class="kv-v">${esc(state.storeSettings.hours)}</div>
              <div class="kv-k">Hotline</div><div class="kv-v mono">${esc(state.storeSettings.phone)}</div>
              <div class="kv-k">Thanh toán</div><div class="kv-v">Tại cửa hàng (Tiền mặt / CK)</div>
            </div>
          </div>
        </section>

        <div class="crud-toolbar" style="margin-top:20px">
          <div class="search-box">${ICONS.search}<input id="pubSearch" class="input" placeholder="Tìm mẫu kính, thương hiệu..." value="${esc(ui.pubSearch)}" /></div>
          <select id="pubPriceSel" class="select" style="width:auto">
            <option value="ALL" ${ui.pubPriceRange === 'ALL' ? 'selected' : ''}>Mọi khoảng giá</option>
            <option value="UNDER_500" ${ui.pubPriceRange === 'UNDER_500' ? 'selected' : ''}>Dưới 500k</option>
            <option value="500_1000" ${ui.pubPriceRange === '500_1000' ? 'selected' : ''}>500k – 1 triệu</option>
            <option value="1000_2000" ${ui.pubPriceRange === '1000_2000' ? 'selected' : ''}>1 – 2 triệu</option>
            <option value="OVER_2000" ${ui.pubPriceRange === 'OVER_2000' ? 'selected' : ''}>Trên 2 triệu</option>
          </select>
          <select id="pubSortSel" class="select" style="width:auto">
            <option value="price_asc" ${ui.pubSort === 'price_asc' ? 'selected' : ''}>Giá: Thấp → Cao</option>
            <option value="price_desc" ${ui.pubSort === 'price_desc' ? 'selected' : ''}>Giá: Cao → Thấp</option>
            <option value="name_asc" ${ui.pubSort === 'name_asc' ? 'selected' : ''}>Tên: A → Z</option>
            <option value="name_desc" ${ui.pubSort === 'name_desc' ? 'selected' : ''}>Tên: Z → A</option>
          </select>
          <select id="pubFaceSel" class="select" style="width:auto">
            <option value="ALL">Mọi dáng mặt</option>
            ${['Mặt tròn','Mặt trái xoan','Mặt vuông','Mặt dài'].map((f) => `<option value="${f}" ${ui.pubFace === f ? 'selected' : ''}>Hợp ${f}</option>`).join('')}
          </select>
          <div class="pill-group">${['ALL','FRAME','SUNGLASSES','LENS_BLANK'].map((c) => `<button class="pill ${ui.pubCat === c ? 'active' : ''}" data-pubc="${c}">${c === 'ALL' ? 'Tất cả' : CATEGORY_LABEL[c]}</button>`).join('')}</div>
        </div>

        <div class="pub-grid">
          ${visible.map((p) => `
            <article class="pub-card">
              <div class="pub-visual">
                ${renderProductVisual(p, 140)}
                <span class="badge ${p.stock === 0 ? 'badge-warn' : 'badge-ok'}" style="position:absolute;top:8px;right:8px">${p.stock === 0 ? 'Đặt trước' : 'Sẵn hàng'}</span>
                ${p.videoUrl ? '<span class="badge badge-info" style="position:absolute;bottom:8px;left:8px">▶ Video 360°</span>' : ''}
              </div>
              <div class="muted-xs mono">${esc(p.brand)} · Size ${esc(p.dims)}</div>
              <div style="font-weight:700;font-size:14px;line-height:1.35">${esc(p.name)}</div>
              <div class="muted-xs">${esc(p.description || p.specs)}</div>
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

        <div class="card">
          <div class="scroll-load-footer">
            <span>Đang xem <strong>${visible.length} / ${list.length}</strong> sản phẩm</span>
            ${hasMore ? `<button class="btn btn-sm btn-primary" id="pubLoadMoreBtn">Xem thêm sản phẩm (${list.length - visible.length} mẫu còn lại) ↓</button>` : '<span class="badge badge-ok">Đã hiển thị tất cả sản phẩm</span>'}
          </div>
        </div>
      </div>
    `;

    document.getElementById('heroBudgetBtn').onclick = () => { state.activePublicView = 'budget'; saveState(); renderAll(); };
    document.getElementById('heroTryOnBtn').onclick = () => { state.activePublicView = 'tryon'; saveState(); renderAll(); };
    document.getElementById('pubSearch').oninput = (e) => { ui.pubSearch = e.target.value; ui.pubLimit = 6; renderPublicStorefront(container); };
    document.getElementById('pubPriceSel').onchange = (e) => { ui.pubPriceRange = e.target.value; ui.pubLimit = 6; renderPublicStorefront(container); };
    document.getElementById('pubSortSel').onchange = (e) => { ui.pubSort = e.target.value; renderPublicStorefront(container); };
    document.getElementById('pubFaceSel').onchange = (e) => { ui.pubFace = e.target.value; ui.pubLimit = 6; renderPublicStorefront(container); };
    container.querySelectorAll('[data-pubc]').forEach((b) => b.onclick = () => { ui.pubCat = b.dataset.pubc; ui.pubLimit = 6; renderPublicStorefront(container); });
    const lm = document.getElementById('pubLoadMoreBtn'); if (lm) lm.onclick = () => { ui.pubLimit += 6; renderPublicStorefront(container); };
    container.querySelectorAll('[data-tryprod]').forEach((b) => b.onclick = () => { ui.tryonProductId = b.dataset.tryprod; state.activePublicView = 'tryon'; saveState(); renderAll(); });
    container.querySelectorAll('[data-viewangles]').forEach((b) => b.onclick = () => openMultiAngleModal(b.dataset.viewangles));
    container.querySelectorAll('[data-inqprod]').forEach((b) => b.onclick = () => openPublicInquiryModal(b.dataset.inqprod));
  }

  function renderPublicStaticPages(container) {
    const page = state.cmsPages.find((p) => p.slug === state.activeCmsSlug) || state.cmsPages[0];
    container.innerHTML = `
      <div class="pub-container" style="padding-top:24px">
        <div class="pill-group" style="margin-bottom:18px">
          ${state.cmsPages.map((p) => `<button class="pill ${p.slug === page.slug ? 'active' : ''}" data-pcms="${p.slug}">${esc(p.title)}</button>`).join('')}
        </div>
        <article class="card" style="padding:28px;max-width:820px">
          <div class="muted-xs mono">Cập nhật lần cuối: ${page.updatedAt} · Quản lý trực tiếp từ Admin → Quản trị Website</div>
          <h1 class="pub-h1" style="font-size:32px;margin:8px 0 16px">${esc(page.title)}</h1>
          <div style="white-space:pre-line;font-size:14.5px;line-height:1.75;color:#292524">${esc(page.content)}</div>
        </article>
      </div>
    `;
    container.querySelectorAll('[data-pcms]').forEach((b) => b.onclick = () => { state.activeCmsSlug = b.dataset.pcms; saveState(); renderPublicStaticPages(container); });
  }

  function openMultiAngleModal(prodId) {
    const p = getProduct(prodId); if (!p) return;
    let angle = 'front';
    const draw = () => {
      openModal(`Chi tiết đa góc cạnh — ${p.name}`, `
        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="height:185px;background:#F4F6F6;border-radius:10px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border-subtle);overflow:hidden">
            ${angle === 'front' && p.customPhotoUrl ? `<img src="${p.customPhotoUrl}" style="max-height:100%" />` : renderGlassesSVG(p.shape, p.colorHex, angle, 240)}
          </div>
          <div class="pill-group" style="justify-content:center">
            ${[['front','Chính diện'],['45deg','Góc nghiêng 45°'],['side','Càng kính ngang'],['dims','Bản vẽ kích thước']].map(([k, l]) => `<button class="pill ${angle === k ? 'active' : ''}" data-ang="${k}">${l}</button>`).join('')}
          </div>
          ${p.videoUrl ? `<div class="badge badge-info" style="align-self:center">▶ Video 360° sản phẩm: ${esc(p.videoUrl)}</div>` : ''}
          <div class="kv-list"><div class="kv-k">SKU</div><div class="kv-v mono">${esc(p.sku)}</div><div class="kv-k">Kích thước</div><div class="kv-v mono">${esc(p.dims)}</div><div class="kv-k">Mô tả</div><div class="kv-v">${esc(p.description || p.specs)}</div><div class="kv-k">Giá bán</div><div class="kv-v mono" style="color:var(--accent-primary);font-weight:700">${fmtVnd(p.price)}</div></div>
          <div style="display:flex;justify-content:flex-end;gap:8px">${p.category !== 'LENS_BLANK' ? '<button class="btn" id="angTryBtn">Thử lên mặt →</button>' : ''}<button class="btn btn-primary" id="angInqBtn">Đặt giữ mẫu</button></div>
        </div>
      `);
      document.querySelectorAll('[data-ang]').forEach((b) => b.onclick = () => { angle = b.dataset.ang; draw(); });
      const tb = document.getElementById('angTryBtn'); if (tb) tb.onclick = () => { closeModal(); ui.tryonProductId = p.id; state.activePublicView = 'tryon'; saveState(); renderAll(); };
      document.getElementById('angInqBtn').onclick = () => { closeModal(); openPublicInquiryModal(p.id); };
    };
    draw();
  }

  function openPublicInquiryModal(prodId) {
    const p = getProduct(prodId), c = getCustomer(state.portalCustomerId);
    openModal('Đặt giữ mẫu tại cửa hàng', `<form id="pubInqForm" style="display:flex;flex-direction:column;gap:11px"><div style="padding:10px;background:var(--bg-subtle);border-radius:8px"><strong>${esc(p.name)}</strong> — <span class="mono">${fmtVnd(p.price)}</span></div><div class="form-grid-2"><div class="field"><label>Họ tên</label><input name="name" class="input" value="${esc(c ? c.name : '')}" required /></div><div class="field"><label>SĐT</label><input name="phone" class="input mono" value="${esc(c ? c.phone : '')}" required /></div></div><div class="field"><label>Thời gian dự kiến ghé</label><input name="when" class="input" value="2026-11-20 17:30" /></div><div style="display:flex;justify-content:flex-end"><button type="submit" class="btn btn-primary">Gửi yêu cầu</button></div></form>`);
    document.getElementById('pubInqForm').onsubmit = (e) => { e.preventDefault(); const fd = new FormData(e.target); state.appointments.unshift({ id: 'APT-' + String(state.appointments.length + 1).padStart(3, '0'), createdAt: nowStr(), customerName: fd.get('name'), phone: fd.get('phone'), type: 'ORDER_INQUIRY', scheduledAt: fd.get('when'), productRef: p.name, status: 'PENDING', source: 'WEBSITE' }); saveState(); closeModal(); toast('Đã gửi yêu cầu tới cửa hàng!'); };
  }

  function stopTryonCamera() { if (ui.tryonCameraStream) { ui.tryonCameraStream.getTracks().forEach((t) => t.stop()); ui.tryonCameraStream = null; } }

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
        <div style="padding:20px 0 8px"><span class="badge badge-teal">Virtual Try-On Studio</span><h1 class="pub-h1" style="font-size:30px;margin:6px 0">Thử gọng kính trực tiếp lên khuôn mặt</h1></div>
        <div class="tryon-layout">
          <div>
            <div class="tryon-stage"><video id="tryonVideo" class="tryon-video hidden" autoplay playsinline muted></video><svg id="tryonFaceSvg" viewBox="0 0 300 280" style="width:74%;height:auto"><path d="${faceMap[ui.tryonFace].path}" fill="#F3D9C6" stroke="#D6B29B" stroke-width="2"/><circle cx="115" cy="126" r="5" fill="#2C2420"/><circle cx="185" cy="126" r="5" fill="#2C2420"/><path d="M100,110 Q115,103 130,110" fill="none" stroke="#5C4438" stroke-width="2.5"/><path d="M170,110 Q185,103 200,110" fill="none" stroke="#5C4438" stroke-width="2.5"/><path d="M150,126 L146,162 L156,164" fill="none" stroke="#C99E85" stroke-width="2"/><path d="M128,194 Q150,206 172,194" fill="none" stroke="#B46A5E" stroke-width="2.5"/></svg><div class="tryon-glasses-overlay" id="tryonOverlay" style="top:${ui.tryonTop}%;transform:translate(-50%,-50%) scale(${ui.tryonScale / 100})">${renderGlassesSVG(selected.shape, selected.colorHex, 'front', 190)}</div></div>
            <div class="card" style="padding:12px;margin-top:12px"><div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:10px"><div class="pill-group">${Object.entries(faceMap).map(([k, v]) => `<button class="pill ${ui.tryonFace === k ? 'active' : ''}" data-tface="${k}">${v.name}</button>`).join('')}</div><button class="btn btn-sm btn-primary" id="toggleCamBtn">Bật Camera thật</button></div><div class="form-grid-2"><div class="field"><label>Kích thước (${ui.tryonScale}%)</label><input type="range" id="tryonScaleRng" min="70" max="135" value="${ui.tryonScale}" style="width:100%" /></div><div class="field"><label>Sống mũi (${ui.tryonTop}%)</label><input type="range" id="tryonTopRng" min="25" max="60" value="${ui.tryonTop}" style="width:100%" /></div></div></div>
          </div>
          <div class="card"><div class="card-head"><h2 class="card-title">${esc(selected.name)}</h2><span class="badge ${isMatch ? 'badge-ok' : 'badge-info'}">${isMatch ? 'Rất hợp ' + faceMap[ui.tryonFace].name : 'Phù hợp'}</span></div><div class="card-body"><div style="display:flex;flex-direction:column;gap:8px;max-height:310px;overflow-y:auto;margin-bottom:12px">${frames.map((f) => `<div data-picktry="${f.id}" style="display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid ${f.id === selected.id ? 'var(--accent-primary)' : 'var(--border-subtle)'};background:${f.id === selected.id ? 'var(--accent-subtle)' : '#FFF'};border-radius:8px;cursor:pointer">${renderGlassesSVG(f.shape, f.colorHex, 'front', 58)}<div><div style="font-weight:600;font-size:12.5px">${esc(f.name)}</div><div class="muted-xs mono">${fmtVnd(f.price)} · ${esc(f.dims)}</div></div></div>`).join('')}</div><button class="btn btn-primary" style="width:100%" id="tryonBookBtn">Đặt giữ mẫu này tại cửa hàng</button></div></div>
        </div>
      </div>
    `;
    container.querySelectorAll('[data-tface]').forEach((b) => b.onclick = () => { stopTryonCamera(); ui.tryonFace = b.dataset.tface; renderPublicTryOn(container); });
    container.querySelectorAll('[data-picktry]').forEach((el) => el.onclick = () => { ui.tryonProductId = el.dataset.picktry; renderPublicTryOn(container); });
    document.getElementById('tryonScaleRng').oninput = (e) => { ui.tryonScale = Number(e.target.value); document.getElementById('tryonOverlay').style.transform = `translate(-50%,-50%) scale(${ui.tryonScale / 100})`; };
    document.getElementById('tryonTopRng').oninput = (e) => { ui.tryonTop = Number(e.target.value); document.getElementById('tryonOverlay').style.top = ui.tryonTop + '%'; };
    document.getElementById('tryonBookBtn').onclick = () => openPublicInquiryModal(selected.id);
    document.getElementById('toggleCamBtn').onclick = async () => {
      const vid = document.getElementById('tryonVideo'), svg = document.getElementById('tryonFaceSvg');
      if (ui.tryonCameraStream) { stopTryonCamera(); vid.classList.add('hidden'); svg.classList.remove('hidden'); document.getElementById('toggleCamBtn').textContent = 'Bật Camera thật'; return; }
      try { ui.tryonCameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } }); vid.srcObject = ui.tryonCameraStream; vid.classList.remove('hidden'); svg.classList.add('hidden'); document.getElementById('toggleCamBtn').textContent = 'Tắt Camera'; } catch (_) { toast('Không thể truy cập Camera — bạn vẫn có thể thử với 3 khuôn mặt mẫu!'); }
    };
  }

  function renderPublicBooking(container) {
    const c = getCustomer(state.portalCustomerId);
    container.innerHTML = `<div class="pub-container" style="max-width:680px;padding-top:24px"><span class="badge badge-teal">${esc(state.storeSettings.address)}</span><h1 class="pub-h1" style="font-size:30px">Đặt lịch đo mắt &amp; tư vấn chọn kính</h1><form id="pubBookForm" class="card" style="padding:20px;display:flex;flex-direction:column;gap:12px"><div class="form-grid-2"><div class="field"><label>Họ tên</label><input name="name" class="input" value="${esc(c ? c.name : '')}" required /></div><div class="field"><label>Số điện thoại</label><input name="phone" class="input mono" value="${esc(c ? c.phone : '')}" required /></div></div><div class="form-grid-2"><div class="field"><label>Thời gian hẹn</label><input name="when" class="input mono" value="2026-11-20 10:30" required /></div><div class="field"><label>Dịch vụ</label><select name="service" class="select"><option>Đo khúc xạ &amp; Cắt kính mới</option><option>Tái khám mắt định kỳ 6 tháng</option><option>Mang toa bệnh viện tới cắt tròng</option></select></div></div><button type="submit" class="btn btn-primary" style="align-self:flex-start">Xác nhận đặt lịch</button></form></div>`;
    document.getElementById('pubBookForm').onsubmit = (e) => { e.preventDefault(); const fd = new FormData(e.target); state.appointments.unshift({ id: 'APT-' + String(state.appointments.length + 1).padStart(3, '0'), createdAt: nowStr(), customerName: fd.get('name'), phone: fd.get('phone'), type: 'APPOINTMENT', scheduledAt: fd.get('when'), productRef: fd.get('service'), status: 'PENDING', source: 'WEBSITE' }); saveState(); toast('Đặt lịch thành công!'); };
  }

  function renderPublicEyeBook(container) {
    const c = getCustomer(state.portalCustomerId) || state.customers[0];
    const eyws = state.eyewearUnits.filter((e) => e.customerId === c.id), exams = state.examinations.filter((e) => e.customerId === c.id).sort((a, b) => b.date.localeCompare(a.date));
    container.innerHTML = `
      <div class="pub-container" style="padding-top:22px">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:10px;margin-bottom:16px"><div><span class="badge badge-teal">Sổ Kính Cá Nhân (Eye Book)</span><h1 class="pub-h1" style="font-size:30px;margin:4px 0">Xin chào, ${esc(c.name)}</h1></div><span class="badge ${c.zaloLinked ? 'badge-ok' : 'badge-warn'}">${c.zaloLinked ? '✓ Đã liên kết Zalo OA' : 'Chưa liên kết Zalo OA'}</span></div>
        <div class="split-2">
          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="card"><div class="card-head"><h2 class="card-title">Biểu đồ tiến triển độ cận</h2></div><div class="card-body">${renderMyopiaChartSVG(exams)}</div></div>
            <div class="card"><div class="card-head"><h2 class="card-title">Bộ kính của tôi &amp; Tiến độ gia công</h2></div><div class="card-body" style="display:flex;flex-direction:column;gap:10px">${eyws.map((e) => { const job = state.productionJobs.find((j) => j.id === e.jobId), idx = job ? STAGE_ORDER.indexOf(job.stage) : 5; return `<div style="border:1px solid var(--border-subtle);border-radius:9px;padding:12px"><div style="display:flex;justify-content:space-between"><strong>${esc(e.frameName)}</strong><span class="badge badge-teal">${job ? STAGE_META[job.stage].label : 'Đã bàn giao'}</span></div><div class="muted-xs">Tròng: ${esc(e.lensName)} · BH đến ${e.warrantyUntil}</div>${job && job.stage !== 'HANDED_OVER' ? `<div class="stepper">${['CONFIRMED','PREP','CUT_MOUNT','QC','READY'].map((s, sIdx) => `<div class="step-pill ${sIdx < idx ? 'done' : sIdx === idx ? 'current' : ''}">${STAGE_META[s].label.replace(/^\d+\.\s*/, '')}</div>`).join('')}</div>` : ''}</div>`; }).join('')}</div></div>
          </div>
          <div class="card"><div class="card-head"><h2 class="card-title">Lịch sử Đo mắt (${exams.length})</h2></div><div class="card-body" style="display:flex;flex-direction:column;gap:12px">${exams.map((ex) => `<div style="border:1px solid var(--border-subtle);border-radius:9px;padding:12px"><div style="display:flex;justify-content:space-between;margin-bottom:6px"><strong class="mono">${ex.date}</strong><span class="badge badge-neutral">${ex.source === 'IN_STORE' ? 'Minh Quang' : ex.externalClinic}</span></div><div class="table-wrap"><table class="rx-table"><thead><tr><th>Mắt</th><th>SPH</th><th>CYL</th><th>AXIS</th><th>PD</th></tr></thead><tbody><tr><td><strong>OD</strong></td><td>${ex.prescription.od.sph}</td><td>${ex.prescription.od.cyl}</td><td>${ex.prescription.od.axis}°</td><td rowspan="2">${ex.prescription.pd}mm</td></tr><tr><td><strong>OS</strong></td><td>${ex.prescription.os.sph}</td><td>${ex.prescription.os.cyl}</td><td>${ex.prescription.os.axis}°</td></tr></tbody></table></div><div class="muted-xs" style="margin-top:6px">${esc(ex.note)}</div></div>`).join('')}</div></div>
        </div>
      </div>
    `;
  }

  // ==================== AI CHAT & CMD+K ====================
  function renderAiChatMessages() {
    const box = document.getElementById('aiChatMessages'); if (!box) return;
    box.innerHTML = ui.aiMessages.map((m) => `<div class="ai-msg ${m.from}"><div>${m.html || esc(m.text)}</div></div>`).join('');
    box.scrollTop = box.scrollHeight;
    box.querySelectorAll('[data-aigo]').forEach((b) => b.onclick = () => { state.activePublicView = b.dataset.aigo; ui.aiOpen = false; document.getElementById('aiChatPanel').classList.add('hidden'); saveState(); renderAll(); });
  }

  function handleAiPrompt(text) {
    ui.aiMessages.push({ from: 'user', text });
    const q = text.toLowerCase();
    let html = '';
    if (q.includes('sph') || q.includes('cyl') || q.includes('pd') || q.includes('độ')) {
      html = `<strong>Giải thích nhanh thông số:</strong><br/>• <strong>SPH:</strong> Độ cận (−) hoặc viễn (+).<br/>• <strong>CYL &amp; AXIS:</strong> Độ loạn và trục loạn (0°–180°).<br/>• <strong>PD:</strong> Khoảng cách đồng tử hai mắt (mm).`;
    } else if (q.includes('1.60') || q.includes('1.67')) {
      html = `• Độ cận <strong>0 đến −3.50D</strong>: Chiết suất <strong>1.60</strong> tối ưu độ mỏng &amp; giá.<br/>• Độ cận <strong>trên −3.50D</strong>: Nên chọn <strong>1.67 siêu mỏng</strong>.`;
    } else {
      const cbs = computeBudgetCombos(800000, 2200000, 'Mặt tròn', '-2.25', ['blue_cut']);
      const top = cbs[0];
      html = top ? `Tôi gợi ý nhanh bộ <strong>${esc(top.frame.name)} + ${esc(top.lens.name)}</strong> tổng <strong>${fmtVnd(top.total)}</strong>.<div style="margin-top:8px"><button class="btn btn-xs btn-primary" data-aigo="budget">Mở Lập kế hoạch Ngân sách AI →</button></div>` : 'Hãy mở mục Lập kế hoạch ngân sách AI để chọn tiêu chí chi tiết hơn!';
    }
    ui.aiMessages.push({ from: 'bot', html });
    renderAiChatMessages();
  }

  function openCmdK() { document.getElementById('cmdkBackdrop').classList.remove('hidden'); const inp = document.getElementById('cmdkInput'); inp.value = ''; renderCmdKResults(''); setTimeout(() => inp.focus(), 30); }
  function closeCmdK() { document.getElementById('cmdkBackdrop').classList.add('hidden'); }
  function renderCmdKResults(query) {
    const q = query.trim().toLowerCase(), res = [];
    state.customers.filter((c) => !q || c.name.toLowerCase().includes(q) || c.phone.includes(q)).slice(0, 4).forEach((c) => res.push({ type: 'Khách hàng', title: `${c.name} (${c.phone})`, sub: c.tier, act: () => { state.activeSurface = 'store'; state.activeStoreView = 'customers'; state.activeCustomerDetailId = c.id; saveState(); renderAll(); } }));
    state.orders.filter((o) => !q || o.id.toLowerCase().includes(q)).slice(0, 3).forEach((o) => res.push({ type: 'Đơn hàng', title: `${o.id} — ${fmtVnd(o.total)}`, sub: o.status, act: () => { state.activeSurface = 'store'; state.activeStoreView = 'orders'; ui.orderSearch = o.id; saveState(); renderAll(); } }));
    state.products.filter((p) => q && (p.sku.toLowerCase().includes(q) || p.name.toLowerCase().includes(q))).slice(0, 4).forEach((p) => res.push({ type: 'Kho / SP', title: `[${p.sku}] ${p.name}`, sub: fmtVnd(p.price), act: () => { state.activeSurface = 'store'; state.activeStoreView = 'inventory'; ui.invSearch = p.sku; saveState(); renderAll(); } }));
    const box = document.getElementById('cmdkResults');
    box.innerHTML = res.length === 0 ? '<div class="muted-xs" style="padding:18px;text-align:center">Không tìm thấy kết quả.</div>' : res.map((r, i) => `<div class="cmdk-item" data-cmdi="${i}"><div><strong style="font-size:13px">${esc(r.title)}</strong><div class="muted-xs">${esc(r.sub)}</div></div><span class="badge badge-neutral">${r.type}</span></div>`).join('');
    box.querySelectorAll('[data-cmdi]').forEach((el) => el.onclick = () => { closeCmdK(); res[Number(el.dataset.cmdi)].act(); });
  }

  // ==================== GLOBAL EVENTS ====================
  function openMobileSidebar() { document.getElementById('storeSidebar').classList.add('open'); document.getElementById('sidebarBackdrop').classList.remove('hidden'); }
  function closeMobileSidebar() { document.getElementById('storeSidebar').classList.remove('open'); document.getElementById('sidebarBackdrop').classList.add('hidden'); }

  document.getElementById('sidebarCollapseBtn').onclick = () => { state.sidebarCollapsed = !state.sidebarCollapsed; saveState(); renderAll(); };
  document.querySelectorAll('.proto-switch-btn').forEach((b) => b.onclick = () => { state.activeSurface = b.dataset.surface; saveState(); renderAll(); });
  document.querySelectorAll('.pub-nav-pill').forEach((b) => b.onclick = () => { state.activePublicView = b.dataset.pubview; saveState(); renderAll(); });
  document.getElementById('roleSelect').onchange = (e) => {
    state.role = e.target.value; state.activeCustomerDetailId = null;
    const roleHome = { OWNER_ADMIN: 'dashboard', SALES_CASHIER: 'pos', OPTOMETRIST: 'exam', LAB_TECHNICIAN: 'lab' };
    state.activeStoreView = roleHome[state.role] || 'dashboard';
    saveState(); renderAll(); toast(`Đã chuyển sang vai trò: ${e.target.options[e.target.selectedIndex].text}`);
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
  document.getElementById('aiFabBtn').onclick = () => { ui.aiOpen = !ui.aiOpen; document.getElementById('aiChatPanel').classList.toggle('hidden', !ui.aiOpen); if (ui.aiOpen) renderAiChatMessages(); };
  document.getElementById('closeAiChatBtn').onclick = () => { ui.aiOpen = false; document.getElementById('aiChatPanel').classList.add('hidden'); };
  document.querySelectorAll('[data-aichip]').forEach((b) => b.onclick = () => handleAiPrompt(b.dataset.aichip));
  document.getElementById('aiChatForm').onsubmit = (e) => { e.preventDefault(); const inp = document.getElementById('aiChatInput'); if (!inp.value.trim()) return; handleAiPrompt(inp.value.trim()); inp.value = ''; };
  document.addEventListener('keydown', (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCmdK(); } if (e.key === 'Escape') { closeCmdK(); closeDrawer(); closeModal(); closeMobileSidebar(); } });

  renderAll();
})();
