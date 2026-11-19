(() => {
  const STORAGE_KEY = 'optic_shop_p00a_mvp_v1';

  const STAGE_META = {
    CONFIRMED:   { label: '1. Chờ chuẩn bị', badge: 'badge-neutral' },
    PREP:        { label: '2. Chuẩn bị phôi/gọng', badge: 'badge-info' },
    CUT_MOUNT:   { label: '3. Cắt mài & Lắp', badge: 'badge-warn' },
    QC:          { label: '4. Kiểm tra QC', badge: 'badge-teal' },
    READY:       { label: '5. Sẵn sàng bàn giao', badge: 'badge-ok' },
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

  // ==================== STATE MANAGEMENT ====================
  let state = loadState();
  let posState = {
    search: '',
    category: 'ALL',
    customerId: 'CUS-001',
    cart: [],
    discountPct: 0,
    attachExamId: '',
    cashAmount: 0,
    transferAmount: 0,
    transferConfirmed: false
  };
  let invFilter = 'ALL';
  let pubFilter = 'ALL';
  let uploadedRxPreview = '';

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return window.OPTIC_SEED();
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateBadges();
  }

  function resetState() {
    state = window.OPTIC_SEED();
    posState.cart = [];
    posState.discountPct = 0;
    posState.attachExamId = '';
    saveState();
    renderAll();
    toast('Đã khôi phục toàn bộ dữ liệu mẫu ban đầu.');
  }

  // ==================== HELPERS ====================
  const fmtVnd = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(n || 0)) + 'đ';
  const nowStr = () => {
    const d = new Date();
    const pad = (x) => String(x).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  const todayStr = () => nowStr().slice(0, 10);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
  const getCustomer = (id) => state.customers.find((c) => c.id === id);
  const getProduct = (id) => state.products.find((p) => p.id === id);

  function pushZalo(customerName, phone, event, message, customerObj) {
    const linked = customerObj ? (customerObj.zaloLinked && customerObj.zaloConsent) : true;
    state.zaloOutbox.unshift({
      id: 'ZLO-' + String(state.zaloOutbox.length + 1).padStart(3, '0'),
      time: nowStr(),
      customerName,
      phone,
      event,
      status: linked ? 'DELIVERED' : 'FAILED_NO_LINK',
      message: linked ? message : `${message} (Chưa liên kết Zalo OA — cần gửi SMS/gọi điện)`
    });
  }

  function logInventory(productId, type, qty, ref, note) {
    const p = getProduct(productId);
    if (p && p.trackStock) {
      p.stock = Math.max(0, (p.stock || 0) + qty);
    }
    state.inventoryTransactions.unshift({
      id: 'INV-' + String(state.inventoryTransactions.length + 1).padStart(3, '0'),
      date: nowStr(),
      productId,
      type,
      qty,
      ref,
      note
    });
  }

  function toast(msg) {
    const wrap = document.getElementById('toastContainer');
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 3400);
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

  // ==================== BADGES & SHELL ====================
  function updateBadges() {
    const lowStock = state.products.filter((p) => p.trackStock && p.stock <= p.minStock).length;
    const activeLab = state.productionJobs.filter((j) => j.stage !== 'HANDED_OVER').length;
    const pendingInq = state.appointments.filter((a) => a.status === 'PENDING').length;

    document.getElementById('navLowStockCount').textContent = lowStock || '';
    document.getElementById('navActiveLabCount').textContent = activeLab || '';
    document.getElementById('navPendingInquiryCount').textContent = pendingInq || '';
    document.getElementById('zaloCountBadge').textContent = state.zaloOutbox.length;
  }

  function renderAll() {
    updateBadges();
    // Surface toggle
    const isStore = state.activeSurface === 'store';
    document.getElementById('storeSurface').classList.toggle('hidden', !isStore);
    document.getElementById('publicSurface').classList.toggle('hidden', isStore);
    document.getElementById('roleControlWrap').classList.toggle('hidden', !isStore);

    document.querySelectorAll('.surface-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.surface === state.activeSurface);
    });
    document.getElementById('roleSelect').value = state.role;

    if (isStore) {
      document.querySelectorAll('.nav-item').forEach((b) => {
        b.classList.toggle('active', b.dataset.view === state.activeStoreView);
      });
      renderStoreView();
    } else {
      document.querySelectorAll('.pub-tab').forEach((b) => {
        b.classList.toggle('active', b.dataset.pubview === state.activePublicView);
      });
      renderPortalCustomerSelect();
      renderPublicView();
    }
  }

  // ==================== STORE VIEWS ====================
  function renderStoreView() {
    const main = document.getElementById('storeMain');
    switch (state.activeStoreView) {
      case 'pos': renderPosView(main); break;
      case 'exam': renderExamView(main); break;
      case 'lab': renderLabView(main); break;
      case 'inventory': renderInventoryView(main); break;
      case 'customers': renderCustomersView(main); break;
      case 'warranty': renderWarrantyView(main); break;
      case 'appointments': renderAppointmentsView(main); break;
      case 'reports': renderReportsView(main); break;
    }
  }

  // -------------------- 1. POS VIEW --------------------
  function renderPosView(container) {
    const customer = getCustomer(posState.customerId) || state.customers[0];
    const custExams = state.examinations.filter((e) => e.customerId === customer.id);
    if (!posState.attachExamId && custExams[0]) posState.attachExamId = custExams[0].id;

    const filteredProducts = state.products.filter((p) => {
      if (p.category === 'CONSUMABLE') return false;
      if (posState.category !== 'ALL' && p.category !== posState.category) return false;
      if (posState.search) {
        const q = posState.search.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      }
      return true;
    });

    const subtotal = posState.cart.reduce((s, i) => s + i.price * i.qty, 0);
    const maxDiscount = state.role === 'SALES_CASHIER' ? 10 : 50;
    const effectivePct = Math.min(posState.discountPct, maxDiscount);
    const discountAmt = Math.round(subtotal * effectivePct / 100);
    const total = Math.max(0, subtotal - discountAmt);
    const hasCustomEyewear = posState.cart.some((i) => i.category === 'LENS_BLANK' || i.category === 'FRAME');
    const minDeposit = hasCustomEyewear ? Math.round(total * 0.4) : total;
    const paidNow = (Number(posState.cashAmount) || 0) + (posState.transferConfirmed ? (Number(posState.transferAmount) || 0) : 0);
    const remaining = Math.max(0, total - paidNow);

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Bán hàng tại quầy (POS Desktop)</h1>
          <p class="page-sub">Tìm nhanh khách &amp; SKU · Hỗ trợ tách cọc, thanh toán tiền mặt + chuyển khoản, tự động sinh Phiếu gia công Lab</p>
        </div>
        <div class="page-actions">
          <button class="btn" id="posViewOrdersBtn">Đơn hàng gần đây (${state.orders.length})</button>
          <button class="btn btn-primary" id="posGoExamBtn">+ Đo mắt / Nhập đơn kính</button>
        </div>
      </div>

      <div class="pos-grid">
        <div>
          <div class="toolbar">
            <input id="posSearchInput" class="input" style="max-width:290px" placeholder="Tìm tên kính, SKU hoặc quét mã vạch..." value="${esc(posState.search)}" />
            <div class="pill-tabs">
              ${['ALL','FRAME','LENS_BLANK','SUNGLASSES','ACCESSORY','SERVICE'].map((c) => `
                <button class="pill-tab ${posState.category === c ? 'active' : ''}" data-poscat="${c}">
                  ${c === 'ALL' ? 'Tất cả' : CATEGORY_LABEL[c]}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="product-grid">
            ${filteredProducts.map((p) => {
              const outOfStock = p.trackStock && p.stock === 0;
              const low = p.trackStock && p.stock > 0 && p.stock <= p.minStock;
              return `
                <div class="product-tile" data-addprod="${p.id}">
                  <div class="product-tile-sku">
                    <span>${esc(p.sku)}</span>
                    ${!p.trackStock
                      ? '<span class="badge badge-neutral">Dịch vụ</span>'
                      : outOfStock
                        ? '<span class="badge badge-warn">Đặt trước (0)</span>'
                        : low
                          ? `<span class="badge badge-err">Tồn ${p.stock}</span>`
                          : `<span class="badge badge-ok">Tồn ${p.stock}</span>`
                    }
                  </div>
                  <div class="product-tile-name">${esc(p.name)}</div>
                  <div class="muted-xs">${esc(p.specs)}</div>
                  <div class="product-tile-price">
                    <span class="price-val">${fmtVnd(p.price)}</span>
                    <span class="muted-xs">+ Thêm</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="panel pos-cart-panel">
          <div class="panel-header">
            <h2 class="panel-title">Đơn hàng hiện tại</h2>
            <span class="badge badge-teal">${hasCustomEyewear ? 'Có kính gia công Lab' : 'Bán lẻ trực tiếp'}</span>
          </div>
          <div class="panel-body">
            <div class="field" style="margin-bottom:10px">
              <label>Khách hàng (tìm theo SĐT / Tên)</label>
              <div style="display:flex;gap:6px">
                <select id="posCustomerSelect" class="select">
                  ${state.customers.map((c) => `<option value="${c.id}" ${c.id === customer.id ? 'selected' : ''}>${esc(c.name)} — ${esc(c.phone)} (${esc(c.tier)})</option>`).join('')}
                </select>
                <button class="btn btn-sm" id="posOpenCust360" title="Xem nhanh hồ sơ 360°">Hồ sơ</button>
              </div>
              <div class="muted-xs" style="margin-top:4px">
                ${customer.zaloLinked ? '<span style="color:var(--ok-text)">● Đã liên kết Zalo OA</span>' : '<span style="color:var(--warn-text)">○ Chưa liên kết Zalo OA</span>'}
                · ${esc(customer.notes)}
              </div>
            </div>

            ${hasCustomEyewear ? `
              <div class="rx-attach-box">
                <div style="font-weight:700;color:var(--accent-primary);margin-bottom:4px">Gắn Đơn kính &amp; Cấu hình tròng cho Phiếu gia công:</div>
                ${custExams.length ? `
                  <select id="posExamSelect" class="select">
                    ${custExams.map((e) => `<option value="${e.id}" ${e.id === posState.attachExamId ? 'selected' : ''}>${e.date} · OD ${e.prescription.od.sph}/${e.prescription.od.cyl} | OS ${e.prescription.os.sph}/${e.prescription.os.cyl} (PD ${e.prescription.pd})</option>`).join('')}
                  </select>
                ` : `<div class="muted-xs">Khách chưa có đơn kính. Hãy bấm "+ Đo mắt / Nhập đơn kính" trước.</div>`}
              </div>
            ` : ''}

            <div style="max-height:210px;overflow-y:auto;margin:8px 0">
              ${posState.cart.length === 0
                ? '<div class="muted-xs" style="padding:18px 0;text-align:center;border:1px dashed var(--border-strong);border-radius:6px">Bấm chọn gọng, tròng hoặc kính mát bên trái để thêm vào đơn</div>'
                : posState.cart.map((item) => `
                  <div class="cart-item">
                    <div>
                      <div style="font-weight:600;font-size:13px">${esc(item.name)}</div>
                      <div class="muted-xs mono">${fmtVnd(item.price)} ${item.outOfStock ? '· <strong style="color:var(--warn-text)">Đặt trước (Chờ hàng)</strong>' : ''}</div>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px">
                      <div class="cart-qty">
                        <button data-qtydec="${item.productId}">−</button>
                        <span>${item.qty}</span>
                        <button data-qtyinc="${item.productId}">+</button>
                      </div>
                      <div class="mono" style="font-weight:600;min-width:78px;text-align:right">${fmtVnd(item.price * item.qty)}</div>
                    </div>
                  </div>
                `).join('')
              }
            </div>

            <div style="border-top:1px solid var(--border-subtle);padding-top:10px;margin-top:6px">
              <div class="form-grid-2" style="margin-bottom:8px">
                <div class="field">
                  <label>Chiết khấu (%) <span class="muted-xs">(Trần role: ${maxDiscount}%)</span></label>
                  <input id="posDiscountInput" type="number" min="0" max="${maxDiscount}" class="input mono" value="${effectivePct}" />
                </div>
                <div class="field">
                  <label>Cọc tối thiểu đề xuất</label>
                  <input class="input mono" value="${fmtVnd(minDeposit)}" disabled />
                </div>
              </div>

              <div class="pos-summary-row"><span>Tạm tính</span><span class="mono">${fmtVnd(subtotal)}</span></div>
              <div class="pos-summary-row"><span>Chiết khấu (${effectivePct}%)</span><span class="mono">−${fmtVnd(discountAmt)}</span></div>
              <div class="pos-summary-row total"><span>Tổng phải thanh toán</span><span class="mono" style="color:var(--accent-primary)">${fmtVnd(total)}</span></div>
            </div>

            <div style="background:var(--bg-subtle);border:1px solid var(--border-subtle);border-radius:6px;padding:10px;margin-top:10px">
              <div style="font-weight:700;font-size:12px;margin-bottom:6px">Thanh toán độc lập (Tiền mặt + Chuyển khoản tại cửa hàng)</div>
              <div class="form-grid-2">
                <div class="field">
                  <label>Tiền mặt (VNĐ)</label>
                  <input id="posCashInput" type="number" step="50000" min="0" class="input mono" value="${posState.cashAmount}" />
                </div>
                <div class="field">
                  <label>Chuyển khoản (VNĐ)</label>
                  <input id="posTransferInput" type="number" step="50000" min="0" class="input mono" value="${posState.transferAmount}" />
                </div>
              </div>
              <label style="display:flex;align-items:center;gap:6px;margin-top:8px;font-size:12px;cursor:pointer">
                <input id="posTransferConfirm" type="checkbox" ${posState.transferConfirmed ? 'checked' : ''} />
                <span>Nhân viên xác nhận <strong>tiền chuyển khoản đã thực vào tài khoản</strong> (không chỉ xem ảnh chụp)</span>
              </label>
              <div class="pos-summary-row" style="margin-top:8px;font-size:12.5px">
                <span>Thực thu lần này: <strong class="mono">${fmtVnd(paidNow)}</strong></span>
                <span>Còn phải thu: <strong class="mono" style="color:${remaining > 0 ? 'var(--warn-text)' : 'var(--ok-text)'}">${fmtVnd(remaining)}</strong></span>
              </div>
            </div>

            <div style="display:flex;gap:8px;margin-top:12px">
              <button class="btn" id="posFillDepositBtn" style="flex:1">Điền cọc 50%</button>
              <button class="btn btn-primary" id="posCheckoutBtn" style="flex:1.6" ${posState.cart.length === 0 ? 'disabled' : ''}>
                Chốt đơn &amp; In phiếu
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind POS Events
    document.getElementById('posSearchInput').oninput = (e) => { posState.search = e.target.value; renderPosView(container); };
    container.querySelectorAll('[data-poscat]').forEach((b) => b.onclick = () => { posState.category = b.dataset.poscat; renderPosView(container); });
    container.querySelectorAll('[data-addprod]').forEach((el) => el.onclick = () => {
      const p = getProduct(el.dataset.addprod);
      const existing = posState.cart.find((i) => i.productId === p.id);
      if (existing) existing.qty += 1;
      else posState.cart.push({ productId: p.id, name: p.name, price: p.price, category: p.category, qty: 1, outOfStock: p.trackStock && p.stock === 0 });
      renderPosView(container);
    });
    container.querySelectorAll('[data-qtyinc]').forEach((b) => b.onclick = () => {
      const item = posState.cart.find((i) => i.productId === b.dataset.qtyinc);
      if (item) item.qty += 1;
      renderPosView(container);
    });
    container.querySelectorAll('[data-qtydec]').forEach((b) => b.onclick = () => {
      const idx = posState.cart.findIndex((i) => i.productId === b.dataset.qtydec);
      if (idx >= 0) {
        posState.cart[idx].qty -= 1;
        if (posState.cart[idx].qty <= 0) posState.cart.splice(idx, 1);
      }
      renderPosView(container);
    });
    document.getElementById('posCustomerSelect').onchange = (e) => {
      posState.customerId = e.target.value;
      posState.attachExamId = '';
      renderPosView(container);
    };
    const examSel = document.getElementById('posExamSelect');
    if (examSel) examSel.onchange = (e) => { posState.attachExamId = e.target.value; };
    document.getElementById('posDiscountInput').onchange = (e) => {
      posState.discountPct = Math.max(0, Math.min(maxDiscount, Number(e.target.value) || 0));
      renderPosView(container);
    };
    document.getElementById('posCashInput').oninput = (e) => { posState.cashAmount = Number(e.target.value) || 0; renderPosView(container); };
    document.getElementById('posTransferInput').oninput = (e) => { posState.transferAmount = Number(e.target.value) || 0; renderPosView(container); };
    document.getElementById('posTransferConfirm').onchange = (e) => { posState.transferConfirmed = e.target.checked; renderPosView(container); };
    document.getElementById('posFillDepositBtn').onclick = () => {
      posState.cashAmount = Math.round(total * 0.5 / 10000) * 10000;
      posState.transferAmount = 0;
      renderPosView(container);
    };
    document.getElementById('posOpenCust360').onclick = () => openCustomer360Drawer(customer.id);
    document.getElementById('posGoExamBtn').onclick = () => { state.activeStoreView = 'exam'; saveState(); renderAll(); };
    document.getElementById('posViewOrdersBtn').onclick = () => openRecentOrdersDrawer();

    document.getElementById('posCheckoutBtn').onclick = () => {
      if (posState.cart.length === 0) return;
      if (posState.transferAmount > 0 && !posState.transferConfirmed) {
        toast('Cần tích xác nhận tiền chuyển khoản đã thực vào tài khoản!');
        return;
      }
      const orderId = 'ORD-2611-' + String(state.orders.length + 1).padStart(3, '0');
      const payments = [];
      if (posState.cashAmount > 0) {
        payments.push({ id: 'PAY-' + Date.now() + 'C', date: nowStr(), method: 'CASH', type: remaining > 0 ? 'DEPOSIT' : 'FULL', amount: posState.cashAmount, confirmedBy: state.role, verified: true });
      }
      if (posState.transferAmount > 0 && posState.transferConfirmed) {
        payments.push({ id: 'PAY-' + Date.now() + 'T', date: nowStr(), method: 'BANK_TRANSFER', type: remaining > 0 ? 'DEPOSIT' : 'FULL', amount: posState.transferAmount, confirmedBy: state.role, verified: true });
      }
      const anyBackorder = posState.cart.some((i) => i.outOfStock);
      const newOrder = {
        id: orderId,
        date: nowStr(),
        customerId: customer.id,
        status: anyBackorder ? 'WAITING_FOR_STOCK' : 'CONFIRMED',
        subtotal,
        discount: discountAmt,
        total,
        items: posState.cart.map((i) => ({ productId: i.productId, name: i.name, qty: i.qty, price: i.price, isCustomEyewear: hasCustomEyewear })),
        payments
      };
      state.orders.unshift(newOrder);
      customer.totalSpent += paidNow;

      // Ghi sổ kho giao dịch
      posState.cart.forEach((i) => {
        const p = getProduct(i.productId);
        if (p && p.trackStock && p.stock > 0) {
          logInventory(i.productId, i.category === 'LENS_BLANK' ? 'LAB_CONSUME' : 'SALE_OUT', -i.qty, orderId, `Xuất cho đơn hàng ${orderId}`);
        }
      });

      // Tự động sinh Phiếu gia công Lab + Bộ kính nếu có tròng/gọng cận
      let createdJob = null;
      if (hasCustomEyewear) {
        const exam = state.examinations.find((e) => e.id === posState.attachExamId) || custExams[0];
        const frameItem = posState.cart.find((i) => i.category === 'FRAME');
        const lensItem = posState.cart.find((i) => i.category === 'LENS_BLANK');
        const jobId = 'JOB-2611-' + String(state.productionJobs.length + 1).padStart(3, '0');
        const eywId = 'EYW-2611-' + String(state.eyewearUnits.length + 1).padStart(2, '0');
        createdJob = {
          id: jobId,
          orderId,
          customerId: customer.id,
          eyewearId: eywId,
          frameName: frameItem ? frameItem.name : 'Gọng khách mang tới',
          lensProductId: lensItem ? lensItem.productId : 'PRD-06',
          lensConfigSummary: lensItem ? lensItem.name : (exam ? exam.lensConfig.lensName : 'Cấu hình tiêu chuẩn'),
          rxSummary: exam ? `OD ${exam.prescription.od.sph}/${exam.prescription.od.cyl}×${exam.prescription.od.axis} · OS ${exam.prescription.os.sph}/${exam.prescription.os.cyl}×${exam.prescription.os.axis} · PD ${exam.prescription.pd}` : 'Đang chờ nhập số độ',
          stage: 'CONFIRMED',
          technician: 'Chưa phân công',
          dueDate: 'Ngày mai 17:00',
          reworkCount: 0,
          qcChecklist: { pdMatch: false, powerMatch: false, noScratch: false, frameAligned: false },
          notes: anyBackorder ? 'CHỜ PHÔI/GỌNG NHẬP VỀ (WAITING_FOR_STOCK)' : 'Tạo tự động từ quầy POS.'
        };
        state.productionJobs.unshift(createdJob);
        state.eyewearUnits.unshift({
          id: eywId,
          customerId: customer.id,
          orderId,
          jobId,
          rxId: exam ? exam.prescription.id : '—',
          frameName: createdJob.frameName,
          lensName: createdJob.lensConfigSummary,
          purchaseDate: todayStr(),
          warrantyUntil: '2027-11-19',
          status: 'IN_LAB'
        });
      }

      pushZalo(
        customer.name,
        customer.phone,
        'ORDER_CREATED',
        `Minh Quang Optical xác nhận đơn ${orderId} (${fmtVnd(total)}), đã thu ${fmtVnd(paidNow)}.${createdJob ? ` Phiếu gia công ${createdJob.id} đã được chuyển tới phòng Lab.` : ''}`,
        customer
      );

      posState.cart = [];
      posState.cashAmount = 0;
      posState.transferAmount = 0;
      posState.transferConfirmed = false;
      saveState();
      renderAll();
      toast(`Đã chốt đơn ${orderId}${createdJob ? ` & sinh phiếu Lab ${createdJob.id}` : ''}!`);
      openPrintReceiptModal(newOrder, createdJob, customer);
    };
  }

  function openPrintReceiptModal(order, job, customer) {
    const paid = order.payments.reduce((s, p) => s + p.amount, 0);
    openModal(`In Phiếu bán hàng ${order.id}`, `
      <div style="font-size:13px;line-height:1.55">
        <div style="text-align:center;border-bottom:1px dashed #A1A1AA;padding-bottom:10px;margin-bottom:12px">
          <div style="font-weight:700;font-size:16px">KÍNH MẮT MINH QUANG — OPTICAL STUDIO</div>
          <div class="muted-xs">148 Xã Đàn, Đống Đa, Hà Nội · Hotline: 024 3888 9999</div>
          <div class="mono" style="margin-top:4px;font-weight:700">PHIẾU BÁN HÀNG &amp; BIÊN NHẬN GIA CÔNG · ${order.id}</div>
        </div>
        <div class="form-grid-2" style="margin-bottom:10px">
          <div><strong>Khách hàng:</strong> ${esc(customer.name)}<br/><strong>SĐT:</strong> <span class="mono">${esc(customer.phone)}</span></div>
          <div style="text-align:right"><strong>Ngày:</strong> <span class="mono">${order.date}</span><br/><strong>Trạng thái:</strong> ${order.status}</div>
        </div>
        <table class="data-table" style="border:1px solid var(--border-subtle);margin-bottom:10px">
          <thead><tr><th>Hạng mục</th><th class="num">SL</th><th class="num">Thành tiền</th></tr></thead>
          <tbody>
            ${order.items.map((i) => `<tr><td>${esc(i.name)}</td><td class="num mono">${i.qty}</td><td class="num mono">${fmtVnd(i.price * i.qty)}</td></tr>`).join('')}
          </tbody>
        </table>
        <div style="max-width:280px;margin-left:auto">
          <div class="pos-summary-row"><span>Tổng cộng:</span><strong class="mono">${fmtVnd(order.total)}</strong></div>
          <div class="pos-summary-row"><span>Đã thanh toán:</span><strong class="mono">${fmtVnd(paid)}</strong></div>
          <div class="pos-summary-row"><span>Còn phải thu khi nhận:</span><strong class="mono">${fmtVnd(Math.max(0, order.total - paid))}</strong></div>
        </div>
        ${job ? `
          <div style="margin-top:14px;padding:10px;border:1px solid var(--accent-border);background:var(--accent-subtle);border-radius:6px">
            <div class="mono" style="font-weight:700;color:var(--accent-primary)">PHIẾU GIA CÔNG LAB: ${job.id}</div>
            <div><strong>Gọng:</strong> ${esc(job.frameName)} · <strong>Tròng:</strong> ${esc(job.lensConfigSummary)}</div>
            <div class="mono" style="font-size:12px;margin-top:3px">Thông số: ${esc(job.rxSummary)}</div>
          </div>
        ` : ''}
        <div class="no-print" style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px">
          <button class="btn" onclick="window.print()">In phiếu (Print)</button>
          <button class="btn btn-primary" id="closePrintModalBtn">Hoàn tất</button>
        </div>
      </div>
    `);
    document.getElementById('closePrintModalBtn').onclick = closeModal;
  }

  function openRecentOrdersDrawer() {
    openDrawer('BÁN HÀNG POS', `Danh sách đơn hàng (${state.orders.length})`, `
      <div style="display:flex;flex-direction:column;gap:10px">
        ${state.orders.map((o) => {
          const c = getCustomer(o.customerId);
          const paid = o.payments.reduce((s, p) => s + p.amount, 0);
          const due = Math.max(0, o.total - paid);
          return `
            <div class="panel" style="padding:12px">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <strong class="mono">${o.id}</strong>
                <span class="badge ${due === 0 ? 'badge-ok' : 'badge-warn'}">${due === 0 ? 'Đã thu đủ' : `Còn nợ ${fmtVnd(due)}`}</span>
              </div>
              <div class="muted-xs" style="margin:4px 0">${esc(c ? c.name : '')} · ${o.date} · Tổng <strong class="mono">${fmtVnd(o.total)}</strong></div>
              <div class="muted-xs">${o.items.map((i) => `${i.qty}× ${esc(i.name)}`).join(' · ')}</div>
              ${due > 0 ? `<button class="btn btn-sm btn-primary" style="margin-top:8px" data-payrest="${o.id}">Thu nốt ${fmtVnd(due)}</button>` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `);
    document.querySelectorAll('[data-payrest]').forEach((b) => b.onclick = () => {
      const o = state.orders.find((x) => x.id === b.dataset.payrest);
      const paid = o.payments.reduce((s, p) => s + p.amount, 0);
      const due = Math.max(0, o.total - paid);
      o.payments.push({ id: 'PAY-' + Date.now(), date: nowStr(), method: 'CASH', type: 'FINAL', amount: due, confirmedBy: state.role, verified: true });
      o.status = 'COMPLETED';
      const c = getCustomer(o.customerId);
      if (c) c.totalSpent += due;
      saveState();
      openRecentOrdersDrawer();
      toast(`Đã xác nhận thu đủ phần còn lại (${fmtVnd(due)}) cho ${o.id}`);
    });
  }

  // -------------------- 2. EYE EXAM & PRESCRIPTION --------------------
  function renderExamView(container) {
    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Đo mắt, Đơn kính &amp; Cấu hình tròng</h1>
          <p class="page-sub">Tách biệt rõ 3 thực thể: EyeExamination (Đo tại cửa hàng / Đơn ngoài) → Prescription (SPH/CYL/AXIS/PD) → LensConfiguration</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" id="newExamBtn">+ Tạo lần đo / Tiếp nhận đơn ngoài</button>
        </div>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã lần đo</th>
              <th>Ngày</th>
              <th>Khách hàng</th>
              <th>Nguồn đo</th>
              <th>Mắt Phải (OD)</th>
              <th>Mắt Trái (OS)</th>
              <th>PD</th>
              <th>Cấu hình tròng đề xuất</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            ${state.examinations.map((e) => {
              const c = getCustomer(e.customerId);
              return `
                <tr>
                  <td class="mono" style="font-weight:600">${e.id}</td>
                  <td class="mono">${e.date}</td>
                  <td><strong>${esc(c ? c.name : '')}</strong><div class="muted-xs">${esc(c ? c.phone : '')}</div></td>
                  <td>
                    <span class="badge ${e.source === 'IN_STORE' ? 'badge-teal' : 'badge-info'}">
                      ${e.source === 'IN_STORE' ? 'Đo tại cửa hàng' : 'Đơn bên ngoài'}
                    </span>
                    <div class="muted-xs">${esc(e.source === 'IN_STORE' ? e.optometrist : e.externalClinic)}</div>
                  </td>
                  <td class="mono">${e.prescription.od.sph} / ${e.prescription.od.cyl} × ${e.prescription.od.axis}°</td>
                  <td class="mono">${e.prescription.os.sph} / ${e.prescription.os.cyl} × ${e.prescription.os.axis}°</td>
                  <td class="mono">${e.prescription.pd}mm</td>
                  <td><strong>${esc(e.lensConfig.lensName)}</strong><div class="muted-xs">${esc(e.lensConfig.coating)}</div></td>
                  <td>
                    <button class="btn btn-sm btn-primary" data-sendpos="${e.id}">Đẩy sang POS</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('newExamBtn').onclick = openNewExamDrawer;
    container.querySelectorAll('[data-sendpos]').forEach((b) => b.onclick = () => {
      const ex = state.examinations.find((x) => x.id === b.dataset.sendpos);
      if (!ex) return;
      posState.customerId = ex.customerId;
      posState.attachExamId = ex.id;
      const lensP = getProduct(ex.lensConfig.productId);
      if (lensP && !posState.cart.find((i) => i.productId === lensP.id)) {
        posState.cart.push({ productId: lensP.id, name: lensP.name, price: lensP.price, category: lensP.category, qty: 1, outOfStock: lensP.stock === 0 });
      }
      state.activeStoreView = 'pos';
      saveState();
      renderAll();
      toast(`Đã nạp đơn kính ${ex.prescription.id} & phôi tròng sang quầy POS.`);
    });
  }

  function openNewExamDrawer() {
    uploadedRxPreview = '';
    const lensProducts = state.products.filter((p) => p.category === 'LENS_BLANK');
    openDrawer('NGHIỆP VỤ QUANG HỌC', 'Ghi nhận Lần đo mắt & Đơn kính mới', `
      <form id="examForm" style="display:flex;flex-direction:column;gap:12px">
        <div class="form-grid-2">
          <div class="field">
            <label>Khách hàng</label>
            <select name="customerId" class="select">
              ${state.customers.map((c) => `<option value="${c.id}">${esc(c.name)} (${esc(c.phone)})</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label>Nguồn dữ liệu đo mắt (EyeExamination)</label>
            <select name="source" id="examSourceSel" class="select">
              <option value="IN_STORE">Đo trực tiếp tại cửa hàng</option>
              <option value="EXTERNAL_RX">Tiếp nhận đơn kính từ bệnh viện / cơ sở ngoài</option>
            </select>
          </div>
        </div>

        <div id="externalRxBox" class="hidden" style="background:var(--info-bg);padding:10px;border-radius:6px">
          <div class="field" style="margin-bottom:8px">
            <label>Tên bệnh viện / cơ sở đo bên ngoài</label>
            <input name="externalClinic" class="input" placeholder="VD: Bệnh viện Mắt TW, Phòng khám..." />
          </div>
          <div class="field">
            <label>Tải ảnh chụp đơn kính ngoài (Xem trước trực tiếp)</label>
            <input type="file" id="rxImageUpload" accept="image/*" class="input" />
            <div id="rxImgPreview" style="margin-top:8px"></div>
          </div>
        </div>

        <div>
          <label style="font-size:12px;font-weight:700;color:var(--accent-primary)">THÔNG SỐ ĐƠN KÍNH (PRESCRIPTION)</label>
          <table class="rx-grid-table">
            <thead><tr><th>Mắt</th><th>SPH (Cầu)</th><th>CYL (Loạn)</th><th>AXIS (Trục)</th><th>ADD</th><th>Prism</th></tr></thead>
            <tbody>
              <tr>
                <td><strong>OD (Phải)</strong></td>
                <td><input name="od_sph" class="rx-input" value="-2.00" /></td>
                <td><input name="od_cyl" class="rx-input" value="-0.50" /></td>
                <td><input name="od_axis" class="rx-input" value="180" /></td>
                <td><input name="od_add" class="rx-input" placeholder="—" /></td>
                <td><input name="od_prism" class="rx-input" placeholder="—" /></td>
              </tr>
              <tr>
                <td><strong>OS (Trái)</strong></td>
                <td><input name="os_sph" class="rx-input" value="-1.75" /></td>
                <td><input name="os_cyl" class="rx-input" value="-0.25" /></td>
                <td><input name="os_axis" class="rx-input" value="175" /></td>
                <td><input name="os_add" class="rx-input" placeholder="—" /></td>
                <td><input name="os_prism" class="rx-input" placeholder="—" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="form-grid-2">
          <div class="field"><label>PD (Khoảng cách đồng tử, mm)</label><input name="pd" class="input mono" value="62" /></div>
          <div class="field"><label>Chiều cao tâm mắt (Fitting Height)</label><input name="fittingHeight" class="input mono" value="18mm" /></div>
        </div>

        <div style="border-top:1px solid var(--border-subtle);padding-top:10px">
          <label style="font-size:12px;font-weight:700;color:var(--accent-primary)">CẤU HÌNH TRÒNG ĐỀ XUẤT (LENS CONFIGURATION)</label>
          <div class="form-grid-2" style="margin-top:6px">
            <div class="field">
              <label>Phôi tròng chọn lắp</label>
              <select name="lensProductId" class="select">
                ${lensProducts.map((p) => `<option value="${p.id}">${esc(p.name)} (${fmtVnd(p.price)})</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label>Tính năng / Lớp phủ</label>
              <input name="coating" class="input" value="Chống ánh sáng xanh + Hạn chế trầy" />
            </div>
          </div>
        </div>

        <div class="field">
          <label>Ghi chú chuyên môn khúc xạ</label>
          <textarea name="note" rows="2" class="textarea" placeholder="VD: Thị lực sau chỉnh 10/10, khuyến nghị tái khám sau 6 tháng..."></textarea>
        </div>

        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:6px">
          <button type="button" class="btn" id="cancelExamBtn">Hủy</button>
          <button type="submit" class="btn btn-primary">Lưu vào Sổ Kính khách hàng</button>
        </div>
      </form>
    `);

    document.getElementById('cancelExamBtn').onclick = closeDrawer;
    document.getElementById('examSourceSel').onchange = (e) => {
      document.getElementById('externalRxBox').classList.toggle('hidden', e.target.value !== 'EXTERNAL_RX');
    };
    document.getElementById('rxImageUpload').onchange = (e) => {
      const f = e.target.files[0];
      if (!f) return;
      uploadedRxPreview = URL.createObjectURL(f);
      document.getElementById('rxImgPreview').innerHTML = `<img src="${uploadedRxPreview}" alt="Ảnh đơn kính" style="max-height:140px;border-radius:6px;border:1px solid var(--border-strong)" />`;
    };
    document.getElementById('examForm').onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const lensP = getProduct(fd.get('lensProductId'));
      const num = String(state.examinations.length + 15).padStart(3, '0');
      state.examinations.unshift({
        id: `EXM-2026-${num}`,
        customerId: fd.get('customerId'),
        date: todayStr(),
        source: fd.get('source'),
        optometrist: state.role === 'OPTOMETRIST' ? 'KTV Hoàng Nam' : 'Nhân viên cửa hàng',
        externalClinic: fd.get('externalClinic') || '',
        externalImageUrl: uploadedRxPreview,
        note: fd.get('note') || 'Đo mắt tiêu chuẩn.',
        prescription: {
          id: `RX-2026-${num}`,
          od: { sph: fd.get('od_sph'), cyl: fd.get('od_cyl'), axis: fd.get('od_axis'), add: fd.get('od_add'), prism: fd.get('od_prism') },
          os: { sph: fd.get('os_sph'), cyl: fd.get('os_cyl'), axis: fd.get('os_axis'), add: fd.get('os_add'), prism: fd.get('os_prism') },
          pd: fd.get('pd'),
          fittingHeight: fd.get('fittingHeight')
        },
        lensConfig: {
          id: `LC-${num}`,
          productId: lensP.id,
          lensName: lensP.name,
          index: lensP.sku.includes('167') ? '1.67' : '1.60',
          coating: fd.get('coating'),
          tint: 'Trong suốt'
        }
      });
      saveState();
      closeDrawer();
      renderAll();
      toast(`Đã lưu lần đo EXM-2026-${num} vào hồ sơ & Sổ Kính của khách.`);
    };
  }

  // -------------------- 3. LAB PRODUCTION & QC KANBAN --------------------
  function renderLabView(container) {
    const activeCols = ['CONFIRMED', 'PREP', 'CUT_MOUNT', 'QC', 'READY'];
    const handedOverCount = state.productionJobs.filter((j) => j.stage === 'HANDED_OVER').length;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Bảng Gia công Nội bộ &amp; Kiểm tra Chất lượng (Lab Kanban)</h1>
          <p class="page-sub">Mỗi bộ kính cận có Phiếu gia công (ProductionJob) độc lập · Bấm vào thẻ để cập nhật công đoạn, tích QC hoặc báo mài lại</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-ok">Đã bàn giao: ${handedOverCount} bộ</span>
        </div>
      </div>

      <div class="kanban-board">
        ${activeCols.map((stage) => {
          const jobs = state.productionJobs.filter((j) => j.stage === stage);
          return `
            <div class="kanban-col">
              <div class="kanban-col-head">
                <span class="kanban-col-title">${STAGE_META[stage].label}</span>
                <span class="badge ${STAGE_META[stage].badge}">${jobs.length}</span>
              </div>
              ${jobs.length === 0 ? '<div class="muted-xs" style="text-align:center;padding:20px 6px">Không có phiếu</div>' : jobs.map((j) => {
                const c = getCustomer(j.customerId);
                return `
                  <div class="kanban-card" data-openjob="${j.id}">
                    <div class="kanban-card-top">
                      <strong class="mono" style="font-size:12px">${j.id}</strong>
                      ${j.reworkCount > 0 ? `<span class="badge badge-err">Rework ×${j.reworkCount}</span>` : `<span class="muted-xs mono">${j.orderId}</span>`}
                    </div>
                    <div style="font-weight:600;font-size:13px">${esc(c ? c.name : '')}</div>
                    <div class="muted-xs">${esc(j.frameName)}</div>
                    <div class="kanban-card-rx">${esc(j.rxSummary)}</div>
                    <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px">
                      <span class="muted">${esc(j.technician)}</span>
                      <span class="mono" style="color:var(--accent-primary)">Hẹn: ${esc(j.dueDate)}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelectorAll('[data-openjob]').forEach((card) => {
      card.onclick = () => openLabJobDrawer(card.dataset.openjob);
    });
  }

  function openLabJobDrawer(jobId) {
    const job = state.productionJobs.find((j) => j.id === jobId);
    if (!job) return;
    const customer = getCustomer(job.customerId);
    const stageIdx = STAGE_ORDER.indexOf(job.stage);
    const nextStage = STAGE_ORDER[stageIdx + 1];

    openDrawer(`PHIẾU GIA CÔNG · ${job.orderId}`, `${job.id} — ${customer ? customer.name : ''}`, `
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="stepper">
          ${['CONFIRMED','PREP','CUT_MOUNT','QC','READY'].map((s, idx) => `
            <div class="step-item ${idx < stageIdx ? 'done' : idx === stageIdx ? 'current' : ''}">
              ${STAGE_META[s].label.replace(/^\d+\.\s*/, '')}
            </div>
          `).join('')}
        </div>

        <div class="panel" style="padding:12px">
          <div class="form-grid-2">
            <div><span class="muted-xs">Khách hàng</span><div style="font-weight:600">${esc(customer.name)} (${esc(customer.phone)})</div></div>
            <div><span class="muted-xs">Kỹ thuật viên phụ trách</span><div style="font-weight:600">${esc(job.technician)}</div></div>
            <div><span class="muted-xs">Gọng kính</span><div>${esc(job.frameName)}</div></div>
            <div><span class="muted-xs">Cấu hình tròng</span><div>${esc(job.lensConfigSummary)}</div></div>
          </div>
          <div class="kanban-card-rx" style="margin-top:10px;font-size:12px"><strong>Thông số cắt mài:</strong> ${esc(job.rxSummary)}</div>
          <div class="muted-xs" style="margin-top:6px">Ghi chú: ${esc(job.notes)}</div>
        </div>

        <div class="panel" style="padding:12px">
          <div style="font-weight:700;font-size:13px;margin-bottom:8px">Bảng kiểm tra chất lượng (QC Checklist)</div>
          <div style="display:flex;flex-direction:column;gap:6px;font-size:13px">
            <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-qc="pdMatch" ${job.qcChecklist.pdMatch ? 'checked' : ''} /> Đúng tâm đồng tử (PD) &amp; chiều cao lắp</label>
            <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-qc="powerMatch" ${job.qcChecklist.powerMatch ? 'checked' : ''} /> Đúng số độ SPH / CYL / AXIS trên máy Lensometer</label>
            <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-qc="noScratch" ${job.qcChecklist.noScratch ? 'checked' : ''} /> Bề mặt tròng sạch, không trầy xước lớp váng phủ</label>
            <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-qc="frameAligned" ${job.qcChecklist.frameAligned ? 'checked' : ''} /> Cân chỉnh gọng &amp; siết ốc đều, đặt phẳng trên bàn</label>
          </div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;padding-top:8px;border-top:1px solid var(--border-subtle)">
          <button class="btn btn-danger" id="reworkJobBtn">Báo hỏng phôi / Gia công lại (Rework)</button>
          ${nextStage ? `<button class="btn btn-primary" id="advanceStageBtn">Chuyển sang: ${STAGE_META[nextStage].label} →</button>` : '<span class="badge badge-ok">Đã hoàn tất bàn giao</span>'}
        </div>
      </div>
    `);

    document.querySelectorAll('[data-qc]').forEach((cb) => cb.onchange = () => {
      job.qcChecklist[cb.dataset.qc] = cb.checked;
      saveState();
    });

    document.getElementById('reworkJobBtn').onclick = () => {
      job.reworkCount += 1;
      job.stage = 'PREP';
      job.qcChecklist = { pdMatch: false, powerMatch: false, noScratch: false, frameAligned: false };
      job.notes = `Rework #${job.reworkCount} lúc ${nowStr()}: Ghi nhận hỏng phôi, quay lại bước chuẩn bị phôi mới.`;
      logInventory(job.lensProductId, 'LAB_SPOILAGE', -1, job.id, `Mài hỏng phôi trên phiếu ${job.id} (Rework #${job.reworkCount})`);
      saveState();
      openLabJobDrawer(job.id);
      renderAll();
      toast(`Đã ghi nhận Rework #${job.reworkCount} & tự động trừ 1 phôi hỏng trong Sổ Kho!`);
    };

    const advBtn = document.getElementById('advanceStageBtn');
    if (advBtn) {
      advBtn.onclick = () => {
        if (nextStage === 'READY') {
          const allOk = Object.values(job.qcChecklist).every(Boolean);
          if (!allOk) {
            toast('Vui lòng hoàn tất đủ 4/4 tiêu chí QC trước khi chuyển sang Sẵn sàng bàn giao!');
            return;
          }
          pushZalo(customer.name, customer.phone, 'LAB_JOB_READY', `Kính của bạn (${job.frameName}) đã hoàn tất QC và sẵn sàng bàn giao tại 148 Xã Đàn!`, customer);
        }
        job.stage = nextStage;
        const eyw = state.eyewearUnits.find((e) => e.id === job.eyewearId);
        if (eyw) {
          eyw.status = nextStage === 'HANDED_OVER' ? 'HANDED_OVER' : (nextStage === 'READY' ? 'READY' : 'IN_LAB');
        }
        saveState();
        openLabJobDrawer(job.id);
        renderAll();
        toast(`Đã chuyển ${job.id} sang "${STAGE_META[nextStage].label}"${nextStage === 'READY' ? ' & gửi Zalo OA báo khách!' : ''}`);
      };
    }
  }

  // -------------------- 4. INVENTORY LEDGER --------------------
  function renderInventoryView(container) {
    const prods = state.products.filter((p) => invFilter === 'ALL' || p.category === invFilter);
    const lowCount = state.products.filter((p) => p.trackStock && p.stock <= p.minStock).length;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Kho hàng &amp; Sổ giao dịch bất biến (Inventory Ledger)</h1>
          <p class="page-sub">Quản lý 4 nhóm tồn kho (Hàng bán lẻ, Phôi tròng, Phụ kiện, Vật tư tiêu hao) · Mọi thay đổi đều sinh bản ghi InventoryTransaction</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" id="openInboundBtn">+ Nhập kho / Điều chỉnh tồn</button>
        </div>
      </div>

      <div class="toolbar">
        <div class="pill-tabs">
          ${['ALL','FRAME','LENS_BLANK','SUNGLASSES','ACCESSORY','CONSUMABLE','SERVICE'].map((c) => `
            <button class="pill-tab ${invFilter === c ? 'active' : ''}" data-invcat="${c}">
              ${c === 'ALL' ? `Tất cả (${state.products.length})` : CATEGORY_LABEL[c]}
            </button>
          `).join('')}
        </div>
        <span class="badge badge-warn" style="margin-left:auto">Cảnh báo tồn thấp / Hết hàng: ${lowCount}</span>
      </div>

      <div class="table-wrap" style="margin-bottom:18px">
        <table class="data-table">
          <thead>
            <tr>
              <th>SKU</th><th>Tên sản phẩm / Vật tư</th><th>Nhóm</th>
              <th class="num">Giá bán</th>
              ${state.role === 'OWNER_ADMIN' ? '<th class="num">Giá vốn</th>' : ''}
              <th class="num">Tồn hiện tại</th><th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            ${prods.map((p) => `
              <tr>
                <td class="mono">${esc(p.sku)}</td>
                <td><strong>${esc(p.name)}</strong><div class="muted-xs">${esc(p.specs)}</div></td>
                <td><span class="badge badge-neutral">${CATEGORY_LABEL[p.category]}</span></td>
                <td class="num mono">${fmtVnd(p.price)}</td>
                ${state.role === 'OWNER_ADMIN' ? `<td class="num mono muted">${fmtVnd(p.cost)}</td>` : ''}
                <td class="num mono" style="font-weight:700">${p.trackStock ? p.stock : '—'}</td>
                <td>
                  ${!p.trackStock ? '<span class="badge badge-neutral">Không quản lý tồn</span>'
                    : p.stock === 0 ? '<span class="badge badge-err">Hết hàng (Cho phép đặt trước)</span>'
                    : p.stock <= p.minStock ? '<span class="badge badge-warn">Sắp hết</span>'
                    : '<span class="badge badge-ok">Đủ hàng</span>'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="panel">
        <div class="panel-header"><h2 class="panel-title">Sổ Nhật ký Giao dịch Kho (Immutable InventoryTransaction)</h2></div>
        <div class="table-wrap" style="border:none;border-radius:0">
          <table class="data-table">
            <thead><tr><th>Mã GD</th><th>Thời gian</th><th>Loại giao dịch</th><th>Sản phẩm</th><th class="num">Biến động</th><th>Chứng từ</th><th>Diễn giải</th></tr></thead>
            <tbody>
              ${state.inventoryTransactions.map((t) => {
                const p = getProduct(t.productId);
                const badgeCls = t.type === 'INBOUND' ? 'badge-ok' : t.type === 'LAB_SPOILAGE' ? 'badge-err' : 'badge-info';
                return `
                  <tr>
                    <td class="mono">${t.id}</td>
                    <td class="mono">${t.date}</td>
                    <td><span class="badge ${badgeCls}">${t.type}</span></td>
                    <td>${esc(p ? p.name : t.productId)}</td>
                    <td class="num mono" style="font-weight:700;color:${t.qty >= 0 ? 'var(--ok-text)' : 'var(--err-text)'}">${t.qty > 0 ? '+' + t.qty : t.qty}</td>
                    <td class="mono">${esc(t.ref)}</td>
                    <td class="muted">${esc(t.note)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-invcat]').forEach((b) => b.onclick = () => { invFilter = b.dataset.invcat; renderInventoryView(container); });
    document.getElementById('openInboundBtn').onclick = () => {
      openDrawer('KHO HÀNG', 'Ghi nhận Nhập kho / Điều chỉnh tồn', `
        <form id="invForm" style="display:flex;flex-direction:column;gap:12px">
          <div class="field">
            <label>Sản phẩm / Phôi tròng / Vật tư</label>
            <select name="productId" class="select">
              ${state.products.filter((p) => p.trackStock).map((p) => `<option value="${p.id}">[${p.sku}] ${esc(p.name)} (Tồn: ${p.stock})</option>`).join('')}
            </select>
          </div>
          <div class="form-grid-2">
            <div class="field">
              <label>Loại giao dịch</label>
              <select name="type" class="select">
                <option value="INBOUND">INBOUND — Nhập hàng NCC</option>
                <option value="ADJUSTMENT">ADJUSTMENT — Điều chỉnh kiểm kê</option>
                <option value="LAB_CONSUME">LAB_CONSUME — Xuất lô vật tư Lab</option>
              </select>
            </div>
            <div class="field">
              <label>Số lượng (+ nhập / − xuất)</label>
              <input name="qty" type="number" class="input mono" value="5" required />
            </div>
          </div>
          <div class="field"><label>Số chứng từ / PO</label><input name="ref" class="input mono" value="PO-2611-NEW" /></div>
          <div class="field"><label>Ghi chú nguồn gốc</label><input name="note" class="input" value="Nhập bổ sung tồn kho cửa hàng" /></div>
          <div style="display:flex;justify-content:flex-end;gap:8px">
            <button type="button" class="btn" onclick="document.getElementById('closeDrawerBtn').click()">Hủy</button>
            <button type="submit" class="btn btn-primary">Ghi sổ giao dịch</button>
          </div>
        </form>
      `);
      document.getElementById('invForm').onsubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        logInventory(fd.get('productId'), fd.get('type'), Number(fd.get('qty')), fd.get('ref'), fd.get('note'));
        saveState();
        closeDrawer();
        renderAll();
        toast('Đã ghi nhận giao dịch kho & cập nhật tồn kho!');
      };
    };
  }

  // -------------------- 5. CUSTOMERS & CRM 360 --------------------
  function renderCustomersView(container) {
    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Khách hàng, Vòng đời Bộ kính &amp; CRM 360°</h1>
          <p class="page-sub">Bấm vào từng khách hàng để xem Hồ sơ tập trung: Bộ kính đã mua, Lịch sử đo mắt, Customer Timeline &amp; Care Tasks</p>
        </div>
      </div>

      <div class="table-wrap" style="margin-bottom:18px">
        <table class="data-table">
          <thead>
            <tr><th>Khách hàng</th><th>Số điện thoại</th><th>Hạng / Gia đình</th><th>Liên kết Zalo OA</th><th class="num">Tổng chi tiêu</th><th>Ghi chú phục vụ</th></tr>
          </thead>
          <tbody>
            ${state.customers.map((c) => `
              <tr class="clickable" data-opencust="${c.id}">
                <td><strong>${esc(c.name)}</strong><div class="muted-xs mono">${c.id} · NS ${c.dob}</div></td>
                <td class="mono">${esc(c.phone)}</td>
                <td><span class="badge badge-teal">${esc(c.tier)}</span>${c.familyGroup ? `<div class="muted-xs">${esc(c.familyGroup)}</div>` : ''}</td>
                <td>${c.zaloLinked ? '<span class="badge badge-ok">Đã liên kết</span>' : '<span class="badge badge-warn">Chưa liên kết</span>'}</td>
                <td class="num mono" style="font-weight:700">${fmtVnd(c.totalSpent)}</td>
                <td class="muted">${esc(c.notes)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="panel">
        <div class="panel-header"><h2 class="panel-title">Nhắc lịch chăm sóc sau mua (CRM Care Tasks)</h2></div>
        <div class="panel-body" style="display:flex;flex-direction:column;gap:8px">
          ${state.careTasks.map((t) => {
            const c = getCustomer(t.customerId);
            return `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border:1px solid var(--border-subtle);border-radius:6px">
                <label style="display:flex;align-items:center;gap:10px;cursor:pointer">
                  <input type="checkbox" data-caretask="${t.id}" ${t.done ? 'checked' : ''} />
                  <span style="${t.done ? 'text-decoration:line-through;color:var(--text-muted)' : ''}">
                    <strong>${esc(c ? c.name : '')}</strong> — ${esc(t.title)}
                  </span>
                </label>
                <div style="display:flex;gap:8px;align-items:center">
                  <span class="badge badge-info">${esc(t.channel)}</span>
                  <span class="mono muted-xs">Hạn: ${t.dueDate}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('[data-opencust]').forEach((tr) => tr.onclick = () => openCustomer360Drawer(tr.dataset.opencust));
    container.querySelectorAll('[data-caretask]').forEach((cb) => cb.onchange = () => {
      const task = state.careTasks.find((x) => x.id === cb.dataset.caretask);
      if (task) {
        task.done = cb.checked;
        if (task.done) {
          const c = getCustomer(task.customerId);
          pushZalo(c.name, c.phone, 'CRM_CARE_REMINDER', `Minh Quang Optical gửi lời nhắc chăm sóc: ${task.title}`, c);
          toast('Đã hoàn tất Care Task & đẩy tin nhắn chăm sóc qua Zalo OA Sandbox!');
        }
        saveState();
        renderAll();
      }
    });
  }

  function openCustomer360Drawer(customerId) {
    const c = getCustomer(customerId);
    if (!c) return;
    const eyws = state.eyewearUnits.filter((e) => e.customerId === c.id);
    const exams = state.examinations.filter((e) => e.customerId === c.id);
    const wrts = state.warranties.filter((w) => w.customerId === c.id);

    openDrawer('HỒ SƠ KHÁCH HÀNG 360°', `${c.name} — ${c.phone}`, `
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="panel" style="padding:12px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <span class="badge badge-teal">${esc(c.tier)}</span>
            <span class="badge ${c.zaloLinked ? 'badge-ok' : 'badge-warn'}">${c.zaloLinked ? 'Đã liên kết Zalo OA' : 'Chưa liên kết Zalo OA'}</span>
          </div>
          <div class="muted-xs">${c.familyGroup ? `Nhóm gia đình: <strong>${esc(c.familyGroup)}</strong> · ` : ''}Tổng chi tiêu: <strong class="mono">${fmtVnd(c.totalSpent)}</strong></div>
          <div style="margin-top:6px;font-size:13px">${esc(c.notes)}</div>
        </div>

        <div>
          <h3 style="font-size:13.5px;margin:0 0 8px">Các bộ kính đã mua (Vòng đời CustomerEyewear)</h3>
          ${eyws.map((e) => `
            <div class="panel" style="padding:10px;margin-bottom:8px">
              <div style="display:flex;justify-content:space-between">
                <strong class="mono">${e.id}</strong>
                <span class="badge ${e.status === 'HANDED_OVER' ? 'badge-ok' : e.status === 'READY' ? 'badge-teal' : 'badge-warn'}">${e.status}</span>
              </div>
              <div style="font-weight:600;margin-top:3px">${esc(e.frameName)}</div>
              <div class="muted-xs">Tròng: ${esc(e.lensName)} · Đơn kính: <span class="mono">${e.rxId}</span> · Phiếu Lab: <span class="mono">${e.jobId}</span></div>
              <div class="muted-xs">Ngày mua: ${e.purchaseDate} · Bảo hành đến: ${e.warrantyUntil}</div>
            </div>
          `).join('')}
        </div>

        <div>
          <h3 style="font-size:13.5px;margin:0 0 8px">Lịch sử đo mắt &amp; Đơn kính (Eye Book)</h3>
          <div class="timeline">
            ${exams.map((ex) => `
              <div class="timeline-item">
                <div class="mono" style="font-weight:700;font-size:12px">${ex.date} · ${ex.id} (${ex.source === 'IN_STORE' ? 'Tại cửa hàng' : ex.externalClinic})</div>
                <div class="mono" style="font-size:12px">OD: ${ex.prescription.od.sph}/${ex.prescription.od.cyl}×${ex.prescription.od.axis}° | OS: ${ex.prescription.os.sph}/${ex.prescription.os.cyl}×${ex.prescription.os.axis}° · PD ${ex.prescription.pd}</div>
                <div class="muted-xs">${esc(ex.note)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h3 style="font-size:13.5px;margin:0 0 6px">Lịch sử Bảo hành &amp; Sửa chữa (${wrts.length})</h3>
          ${wrts.length === 0 ? '<div class="muted-xs">Chưa có phiếu bảo hành.</div>' : wrts.map((w) => `
            <div class="muted-xs" style="padding:6px 0;border-bottom:1px solid var(--border-subtle)">
              <strong class="mono">${w.date}</strong> · ${esc(w.issueType)} (${esc(w.coverage)}) — ${esc(w.note)}
            </div>
          `).join('')}
        </div>
      </div>
    `);
  }

  // -------------------- 6. WARRANTY & REPAIR --------------------
  function renderWarrantyView(container) {
    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Bảo hành &amp; Sửa chữa Sau bán</h1>
          <p class="page-sub">Mọi phiếu bảo hành/sửa chữa gắn trực tiếp vào từng Bộ kính (CustomerEyewear) để theo dõi trọn vòng đời</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" id="newWarrantyBtn">+ Tiếp nhận Bảo hành / Sửa chữa</button>
        </div>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Mã phiếu</th><th>Ngày</th><th>Khách hàng</th><th>Bộ kính (Eyewear ID)</th><th>Nội dung xử lý</th><th>Chế độ</th><th class="num">Phí</th><th>Trạng thái</th></tr></thead>
          <tbody>
            ${state.warranties.map((w) => {
              const c = getCustomer(w.customerId);
              return `
                <tr>
                  <td class="mono">${w.id}</td>
                  <td class="mono">${w.date}</td>
                  <td><strong>${esc(c ? c.name : '')}</strong></td>
                  <td class="mono">${w.eyewearId}</td>
                  <td><strong>${esc(w.issueType)}</strong><div class="muted-xs">${esc(w.note)}</div></td>
                  <td><span class="badge badge-teal">${esc(w.coverage)}</span></td>
                  <td class="num mono">${fmtVnd(w.fee)}</td>
                  <td><span class="badge ${w.status === 'COMPLETED' ? 'badge-ok' : 'badge-warn'}">${w.status}</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('newWarrantyBtn').onclick = () => {
      openDrawer('DỊCH VỤ SAU BÁN', 'Tiếp nhận Bảo hành / Sửa chữa', `
        <form id="wrtForm" style="display:flex;flex-direction:column;gap:12px">
          <div class="field">
            <label>Chọn Bộ kính của khách</label>
            <select name="eyewearId" class="select">
              ${state.eyewearUnits.map((e) => {
                const c = getCustomer(e.customerId);
                return `<option value="${e.id}">[${e.id}] ${esc(c ? c.name : '')} — ${esc(e.frameName)}</option>`;
              }).join('')}
            </select>
          </div>
          <div class="field">
            <label>Loại xử lý</label>
            <select name="issueType" class="select">
              <option>Chỉnh gọng &amp; Thay đệm mũi</option>
              <option>Bảo hành thích nghi số độ (15–30 ngày)</option>
              <option>Bảo hành lớp váng phủ tròng (Coating)</option>
              <option>Thay bản lề / Hàn gọng</option>
            </select>
          </div>
          <div class="field"><label>Ghi chú kỹ thuật</label><textarea name="note" class="textarea" rows="2" placeholder="Mô tả tình trạng kính khi tiếp nhận..."></textarea></div>
          <div style="display:flex;justify-content:flex-end;gap:8px">
            <button type="button" class="btn" onclick="document.getElementById('closeDrawerBtn').click()">Hủy</button>
            <button type="submit" class="btn btn-primary">Tạo phiếu bảo hành</button>
          </div>
        </form>
      `);
      document.getElementById('wrtForm').onsubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const eyw = state.eyewearUnits.find((x) => x.id === fd.get('eyewearId'));
        state.warranties.unshift({
          id: 'WRT-' + String(state.warranties.length + 1).padStart(3, '0'),
          date: todayStr(),
          customerId: eyw.customerId,
          eyewearId: eyw.id,
          issueType: fd.get('issueType'),
          coverage: 'Trong hạn bảo hành',
          status: 'COMPLETED',
          fee: 0,
          note: fd.get('note') || 'Đã tiếp nhận và xử lý tại cửa hàng.'
        });
        saveState();
        closeDrawer();
        renderAll();
        toast('Đã lưu phiếu bảo hành vào vòng đời bộ kính!');
      };
    };
  }

  // -------------------- 7. APPOINTMENTS & ONLINE INQUIRIES --------------------
  function renderAppointmentsView(container) {
    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Lịch hẹn &amp; Yêu cầu đặt hàng từ Website</h1>
          <p class="page-sub">Đồng bộ tức thì với Public Website · Thử gửi yêu cầu ở tab "Website &amp; Sổ Kính" để thấy bản ghi xuất hiện ngay tại đây</p>
        </div>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Mã</th><th>Loại</th><th>Khách hàng</th><th>Lịch hẹn / Thời gian</th><th>Nội dung / Sản phẩm quan tâm</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody>
            ${state.appointments.map((a) => `
              <tr>
                <td class="mono">${a.id}</td>
                <td><span class="badge ${a.type === 'APPOINTMENT' ? 'badge-info' : 'badge-teal'}">${a.type === 'APPOINTMENT' ? 'Đặt lịch đo mắt' : 'Yêu cầu mua hàng'}</span></td>
                <td><strong>${esc(a.customerName)}</strong><div class="muted-xs mono">${esc(a.phone)}</div></td>
                <td class="mono">${esc(a.scheduledAt)}</td>
                <td>${esc(a.productRef)}</td>
                <td><span class="badge ${a.status === 'CONFIRMED' ? 'badge-ok' : 'badge-warn'}">${a.status}</span></td>
                <td>
                  ${a.status === 'PENDING' ? `<button class="btn btn-sm btn-primary" data-confirmapt="${a.id}">Xác nhận &amp; Báo Zalo</button>` : '<span class="muted-xs">Đã xác nhận</span>'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.querySelectorAll('[data-confirmapt]').forEach((b) => b.onclick = () => {
      const apt = state.appointments.find((x) => x.id === b.dataset.confirmapt);
      if (!apt) return;
      apt.status = 'CONFIRMED';
      pushZalo(apt.customerName, apt.phone, 'APPOINTMENT_CONFIRMED', `Minh Quang Optical đã xác nhận ${apt.type === 'APPOINTMENT' ? 'lịch hẹn' : 'yêu cầu đặt hàng'} (${apt.productRef}) vào ${apt.scheduledAt}.`);
      saveState();
      renderAll();
      toast(`Đã xác nhận ${apt.id} và đẩy tin nhắn Zalo OA!`);
    });
  }

  // -------------------- 8. REPORTS & ZALO OUTBOX --------------------
  function renderReportsView(container) {
    const totalRev = state.orders.reduce((s, o) => s + o.total, 0);
    const totalPaid = state.orders.reduce((s, o) => s + o.payments.reduce((ps, p) => ps + p.amount, 0), 0);
    const receivable = Math.max(0, totalRev - totalPaid);
    const reworkJobs = state.productionJobs.filter((j) => j.reworkCount > 0).length;
    const fpy = state.productionJobs.length ? Math.round(((state.productionJobs.length - reworkJobs) / state.productionJobs.length) * 100) : 100;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Báo cáo Vận hành &amp; Zalo OA Transactional Outbox</h1>
          <p class="page-sub">Số liệu tính trực tiếp từ giao dịch thực tế trong phiên Demo · Lỗi gửi Zalo hoàn toàn tách biệt, không làm hỏng đơn bán hàng</p>
        </div>
      </div>

      <div class="kpi-strip">
        <div class="kpi-box"><div class="kpi-label">Tổng doanh thu đơn hàng</div><div class="kpi-value">${fmtVnd(totalRev)}</div><div class="kpi-meta">${state.orders.length} đơn hàng</div></div>
        <div class="kpi-box"><div class="kpi-label">Thực thu tại cửa hàng</div><div class="kpi-value" style="color:var(--ok-text)">${fmtVnd(totalPaid)}</div><div class="kpi-meta">Tiền mặt + CK đã xác nhận</div></div>
        <div class="kpi-box"><div class="kpi-label">Còn phải thu (Công nợ cọc)</div><div class="kpi-value" style="color:var(--warn-text)">${fmtVnd(receivable)}</div><div class="kpi-meta">Thu nốt khi bàn giao kính</div></div>
        <div class="kpi-box"><div class="kpi-label">Tỷ lệ đạt QC lần đầu (FPY)</div><div class="kpi-value">${fpy}%</div><div class="kpi-meta">${reworkJobs} phiếu phát sinh Rework</div></div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Zalo OA Outbox Delivery Log (Mô phỏng Worker bất đồng bộ)</h2>
          <span class="badge badge-info">${state.zaloOutbox.length} sự kiện</span>
        </div>
        <div class="table-wrap" style="border:none;border-radius:0">
          <table class="data-table">
            <thead><tr><th>Mã</th><th>Thời gian</th><th>Sự kiện nghiệp vụ</th><th>Khách nhận</th><th>Nội dung tin nhắn</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              ${state.zaloOutbox.map((z) => `
                <tr>
                  <td class="mono">${z.id}</td>
                  <td class="mono">${z.time}</td>
                  <td class="mono" style="font-size:11.5px">${z.event}</td>
                  <td><strong>${esc(z.customerName)}</strong><div class="muted-xs mono">${esc(z.phone)}</div></td>
                  <td>${esc(z.message)}</td>
                  <td><span class="badge ${z.status === 'DELIVERED' ? 'badge-ok' : 'badge-err'}">${z.status}</span></td>
                  <td>${z.status !== 'DELIVERED' ? `<button class="btn btn-sm" data-retryzalo="${z.id}">Retry</button>` : '—'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-retryzalo]').forEach((b) => b.onclick = () => {
      const z = state.zaloOutbox.find((x) => x.id === b.dataset.retryzalo);
      if (z) {
        z.status = 'DELIVERED';
        z.message = z.message.replace(/\s*\(Chưa liên kết.*|\s*\(Lỗi:.*\)/, '') + ' [Retry thành công]';
        saveState();
        renderAll();
        toast(`Đã gửi lại thành công bản ghi Outbox ${z.id}`);
      }
    });
  }

  // ==================== SURFACE 2: PUBLIC WEBSITE & CUSTOMER PORTAL ====================
  function renderPortalCustomerSelect() {
    const sel = document.getElementById('portalCustomerSelect');
    sel.innerHTML = state.customers.map((c) => `<option value="${c.id}" ${c.id === state.portalCustomerId ? 'selected' : ''}>${esc(c.name)} (${esc(c.phone)})</option>`).join('');
  }

  function renderPublicView() {
    const main = document.getElementById('publicMain');
    if (state.activePublicView === 'storefront') renderPublicStorefront(main);
    else if (state.activePublicView === 'booking') renderPublicBooking(main);
    else renderPublicEyeBook(main);
  }

  function renderPublicStorefront(container) {
    const showcaseItems = state.products.filter((p) => ['FRAME', 'SUNGLASSES', 'LENS_BLANK'].includes(p.category) && (pubFilter === 'ALL' || p.category === pubFilter));
    container.innerHTML = `
      <div class="public-container">
        <section class="editorial-hero">
          <div>
            <div class="editorial-kicker">Cửa hàng Quang học Độc lập &amp; Phòng Lab nội bộ</div>
            <h1 class="editorial-h1">Đo mắt chuẩn khúc xạ, mài lắp trực tiếp và đồng hành cùng từng bộ kính.</h1>
            <p class="editorial-lead">
              Kính Mắt Minh Quang lưu trọn lịch sử thị lực của bạn qua nhiều năm trong Sổ Kính cá nhân.
              Chọn gọng yêu thích trên website, đặt lịch đến thử và đo mắt trực tiếp tại 148 Xã Đàn.
            </p>
            <div style="display:flex;gap:10px;margin-top:20px">
              <button class="btn btn-dark" id="heroBookBtn">Đặt lịch đo mắt tại cửa hàng</button>
              <button class="btn" id="heroEyeBookBtn">Mở Sổ Kính của tôi →</button>
            </div>
          </div>
          <div class="editorial-facts">
            <div><strong>Giờ mở cửa</strong><div class="muted">08:30 – 20:30 tất cả các ngày</div></div>
            <div><strong>Gia công nội bộ</strong><div class="muted">Mài lắp &amp; kiểm tra QC 4 bước tại chỗ</div></div>
            <div><strong>Thanh toán tại cửa hàng</strong><div class="muted">Tiền mặt hoặc chuyển khoản sau khi thử kính</div></div>
          </div>
        </section>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:24px;flex-wrap:wrap;gap:10px">
          <h2 style="font-family:var(--font-display);font-size:24px;font-weight:400;margin:0">Bộ sưu tập Gọng, Kính mát &amp; Tròng kính</h2>
          <div class="pill-tabs">
            ${['ALL','FRAME','SUNGLASSES','LENS_BLANK'].map((c) => `
              <button class="pill-tab ${pubFilter === c ? 'active' : ''}" data-pubcat="${c}">
                ${c === 'ALL' ? 'Tất cả' : CATEGORY_LABEL[c]}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="showcase-grid">
          ${showcaseItems.map((p) => `
            <article class="showcase-card">
              <div class="showcase-visual">
                <span>${esc(p.brand)}</span>
                <span class="badge ${p.stock === 0 ? 'badge-warn' : 'badge-ok'}" style="position:absolute;top:8px;right:8px">
                  ${p.stock === 0 ? 'Đặt trước tại cửa hàng' : 'Sẵn hàng thử trực tiếp'}
                </span>
              </div>
              <div class="muted-xs mono">${esc(p.sku)} · ${CATEGORY_LABEL[p.category]}</div>
              <div style="font-weight:700;font-size:14.5px;line-height:1.35">${esc(p.name)}</div>
              <div class="muted-xs">${esc(p.specs)}</div>
              <div style="margin-top:auto;padding-top:10px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--paper-border)">
                <strong class="mono" style="font-size:15px">${fmtVnd(p.price)}</strong>
                <button class="btn btn-sm btn-primary" data-inquire="${p.id}">Gửi yêu cầu mua</button>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('heroBookBtn').onclick = () => { state.activePublicView = 'booking'; saveState(); renderAll(); };
    document.getElementById('heroEyeBookBtn').onclick = () => { state.activePublicView = 'eyebook'; saveState(); renderAll(); };
    container.querySelectorAll('[data-pubcat]').forEach((b) => b.onclick = () => { pubFilter = b.dataset.pubcat; renderPublicStorefront(container); });
    container.querySelectorAll('[data-inquire]').forEach((b) => b.onclick = () => {
      const p = getProduct(b.dataset.inquire);
      const curCust = getCustomer(state.portalCustomerId);
      openModal('Gửi yêu cầu mua hàng / Giữ mẫu tại cửa hàng', `
        <form id="pubInqForm" style="display:flex;flex-direction:column;gap:12px">
          <div style="padding:10px;background:var(--bg-subtle);border-radius:6px">
            <strong>${esc(p.name)}</strong> — <span class="mono">${fmtVnd(p.price)}</span>
            ${p.stock === 0 ? '<div class="muted-xs" style="color:var(--warn-text)">Mẫu này tạm hết tại quầy — cửa hàng sẽ xác nhận đặt bổ sung và báo lại qua Zalo.</div>' : ''}
          </div>
          <div class="form-grid-2">
            <div class="field"><label>Họ tên của bạn</label><input name="name" class="input" value="${esc(curCust ? curCust.name : '')}" required /></div>
            <div class="field"><label>Số điện thoại</label><input name="phone" class="input mono" value="${esc(curCust ? curCust.phone : '')}" required /></div>
          </div>
          <div class="field"><label>Thời gian dự kiến ghé cửa hàng</label><input name="when" class="input" value="Ngày mai · 17:30" /></div>
          <div class="muted-xs">Lưu ý: Giai đoạn đầu chưa thu tiền online — bạn đến cửa hàng thử kính, đo mắt và thanh toán trực tiếp.</div>
          <div style="display:flex;justify-content:flex-end;gap:8px">
            <button type="button" class="btn" onclick="document.getElementById('closeModalBtn').click()">Hủy</button>
            <button type="submit" class="btn btn-primary">Gửi yêu cầu tới cửa hàng</button>
          </div>
        </form>
      `);
      document.getElementById('pubInqForm').onsubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        state.appointments.unshift({
          id: 'APT-' + String(state.appointments.length + 1).padStart(3, '0'),
          createdAt: nowStr(),
          customerName: fd.get('name'),
          phone: fd.get('phone'),
          type: 'ORDER_INQUIRY',
          scheduledAt: fd.get('when'),
          productRef: `${p.name} (${p.stock === 0 ? 'Đặt trước' : 'Giữ mẫu'})`,
          status: 'PENDING',
          source: 'WEBSITE'
        });
        saveState();
        closeModal();
        toast('Đã gửi yêu cầu! Chuyển sang tab "Cửa hàng & Lab → Lịch hẹn" để thấy yêu cầu vừa xuất hiện.');
      };
    });
  }

  function renderPublicBooking(container) {
    const curCust = getCustomer(state.portalCustomerId);
    container.innerHTML = `
      <div class="public-container" style="padding:32px 20px 56px;max-width:720px">
        <div class="editorial-kicker">Đặt lịch hẹn tại 148 Xã Đàn</div>
        <h1 class="editorial-h1" style="font-size:32px">Đặt lịch đo mắt &amp; tư vấn chọn kính</h1>
        <p class="editorial-lead" style="margin-bottom:24px">Đặt trước khung giờ để kỹ thuật viên khúc xạ chuẩn bị sẵn hồ sơ thị lực của bạn.</p>

        <form id="bookingForm" class="paper-panel" style="display:flex;flex-direction:column;gap:14px">
          <div class="form-grid-2">
            <div class="field"><label>Họ và tên</label><input name="name" class="input" value="${esc(curCust ? curCust.name : '')}" required /></div>
            <div class="field"><label>Số điện thoại</label><input name="phone" class="input mono" value="${esc(curCust ? curCust.phone : '')}" required /></div>
          </div>
          <div class="form-grid-2">
            <div class="field"><label>Ngày &amp; giờ dự kiến</label><input name="when" class="input mono" value="2026-11-20 10:30" required /></div>
            <div class="field">
              <label>Dịch vụ cần phục vụ</label>
              <select name="service" class="select">
                <option>Đo khúc xạ &amp; Cắt kính mới</option>
                <option>Kiểm tra mắt định kỳ 6 tháng</option>
                <option>Mang đơn kính bệnh viện tới lắp tròng</option>
                <option>Bảo hành / Chỉnh gọng &amp; Vệ sinh kính</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-dark" style="align-self:flex-start;padding:10px 20px">Xác nhận đặt lịch hẹn</button>
        </form>
      </div>
    `;
    document.getElementById('bookingForm').onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      state.appointments.unshift({
        id: 'APT-' + String(state.appointments.length + 1).padStart(3, '0'),
        createdAt: nowStr(),
        customerName: fd.get('name'),
        phone: fd.get('phone'),
        type: 'APPOINTMENT',
        scheduledAt: fd.get('when'),
        productRef: fd.get('service'),
        status: 'PENDING',
        source: 'WEBSITE'
      });
      saveState();
      toast('Đặt lịch thành công! Lịch hẹn đã xuất hiện ngay trong màn hình Cửa hàng & Lab.');
    };
  }

  function renderPublicEyeBook(container) {
    const c = getCustomer(state.portalCustomerId) || state.customers[0];
    const eyws = state.eyewearUnits.filter((e) => e.customerId === c.id);
    const exams = state.examinations.filter((e) => e.customerId === c.id);
    const wrts = state.warranties.filter((w) => w.customerId === c.id);

    container.innerHTML = `
      <div class="public-container">
        <div style="padding:28px 0 18px;border-bottom:1px solid var(--paper-border);display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px">
          <div>
            <div class="editorial-kicker">Customer Portal · Sổ Kính cá nhân</div>
            <h1 class="editorial-h1" style="font-size:32px;margin-bottom:4px">Xin chào, ${esc(c.name)}</h1>
            <div class="muted">${esc(c.tier)} · SĐT <span class="mono">${esc(c.phone)}</span> ${c.familyGroup ? `· ${esc(c.familyGroup)}` : ''}</div>
          </div>
          <span class="badge ${c.zaloLinked ? 'badge-ok' : 'badge-warn'}">${c.zaloLinked ? '✓ Đã liên kết nhận tin Zalo OA' : 'Chưa liên kết Zalo OA'}</span>
        </div>

        <div class="eyebook-grid">
          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="paper-panel">
              <h2 style="font-family:var(--font-display);font-size:21px;font-weight:400;margin:0 0 14px">Bộ kính của tôi (My Glasses &amp; Tiến độ gia công)</h2>
              ${eyws.map((e) => {
                const job = state.productionJobs.find((j) => j.id === e.jobId);
                const idx = job ? STAGE_ORDER.indexOf(job.stage) : 5;
                return `
                  <div style="border:1px solid var(--paper-border);border-radius:6px;padding:14px;margin-bottom:12px">
                    <div style="display:flex;justify-content:space-between;align-items:center">
                      <strong style="font-size:15px">${esc(e.frameName)}</strong>
                      <span class="badge ${e.status === 'HANDED_OVER' ? 'badge-ok' : e.status === 'READY' ? 'badge-teal' : 'badge-warn'}">
                        ${job ? STAGE_META[job.stage].label : 'Đã bàn giao'}
                      </span>
                    </div>
                    <div class="muted-xs" style="margin-top:3px">Tròng: ${esc(e.lensName)} · Mã kính <span class="mono">${e.id}</span> · Bảo hành đến <span class="mono">${e.warrantyUntil}</span></div>
                    ${job && job.stage !== 'HANDED_OVER' ? `
                      <div class="stepper" style="margin-top:10px">
                        ${['CONFIRMED','PREP','CUT_MOUNT','QC','READY'].map((s, sIdx) => `
                          <div class="step-item ${sIdx < idx ? 'done' : sIdx === idx ? 'current' : ''}">
                            ${STAGE_META[s].label.replace(/^\d+\.\s*/, '')}
                          </div>
                        `).join('')}
                      </div>
                      <div class="muted-xs">Trạng thái này tự động cập nhật ngay khi Kỹ thuật viên Lab chuyển công đoạn ở bề mặt Cửa hàng!</div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>

            <div class="paper-panel">
              <h2 style="font-family:var(--font-display);font-size:21px;font-weight:400;margin:0 0 12px">Lịch sử Bảo hành &amp; Chăm sóc</h2>
              ${wrts.length === 0 ? '<div class="muted-xs">Chưa có lịch sử bảo hành. Bạn được miễn phí chỉnh gọng, thay đệm mũi và vệ sinh kính trọn đời tại cửa hàng.</div>' : wrts.map((w) => `
                <div style="padding:8px 0;border-bottom:1px solid var(--paper-border)">
                  <div><strong>${esc(w.issueType)}</strong> · <span class="mono muted-xs">${w.date}</span></div>
                  <div class="muted-xs">${esc(w.note)}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="paper-panel">
            <h2 style="font-family:var(--font-display);font-size:21px;font-weight:400;margin:0 0 12px">Sổ đo mắt &amp; Đơn kính (Eye Book)</h2>
            <p class="muted-xs" style="margin-top:0">Lưu trữ theo trình tự thời gian giúp theo dõi tiến triển độ cận/loạn qua từng năm.</p>
            ${exams.map((ex) => `
              <div style="border:1px solid var(--paper-border);border-radius:6px;padding:12px;margin-bottom:12px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                  <strong class="mono">${ex.date}</strong>
                  <span class="badge badge-neutral">${ex.source === 'IN_STORE' ? 'Đo tại Minh Quang' : ex.externalClinic}</span>
                </div>
                <table class="rx-grid-table">
                  <thead><tr><th>Mắt</th><th>SPH</th><th>CYL</th><th>AXIS</th><th>PD</th></tr></thead>
                  <tbody>
                    <tr><td><strong>OD</strong></td><td>${ex.prescription.od.sph}</td><td>${ex.prescription.od.cyl}</td><td>${ex.prescription.od.axis}°</td><td rowspan="2">${ex.prescription.pd}mm</td></tr>
                    <tr><td><strong>OS</strong></td><td>${ex.prescription.os.sph}</td><td>${ex.prescription.os.cyl}</td><td>${ex.prescription.os.axis}°</td></tr>
                  </tbody>
                </table>
                <div class="muted-xs" style="margin-top:6px">Tròng lắp: <strong>${esc(ex.lensConfig.lensName)}</strong> · ${esc(ex.note)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ==================== GLOBAL EVENTS ====================
  document.querySelectorAll('.surface-btn').forEach((b) => b.onclick = () => {
    state.activeSurface = b.dataset.surface;
    saveState();
    renderAll();
  });

  document.querySelectorAll('.nav-item').forEach((b) => b.onclick = () => {
    state.activeStoreView = b.dataset.view;
    saveState();
    renderAll();
  });

  document.querySelectorAll('.pub-tab').forEach((b) => b.onclick = () => {
    state.activePublicView = b.dataset.pubview;
    saveState();
    renderAll();
  });

  document.getElementById('roleSelect').onchange = (e) => {
    state.role = e.target.value;
    saveState();
    renderAll();
    toast(`Đã chuyển sang vai trò: ${e.target.options[e.target.selectedIndex].text}`);
  };

  document.getElementById('portalCustomerSelect').onchange = (e) => {
    state.portalCustomerId = e.target.value;
    saveState();
    renderAll();
  };

  document.getElementById('openZaloBtn').onclick = () => {
    openDrawer('ZALO OA SANDBOX', `Outbox Delivery Log (${state.zaloOutbox.length})`, `
      <div style="display:flex;flex-direction:column;gap:10px">
        ${state.zaloOutbox.map((z) => `
          <div class="panel" style="padding:11px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <strong class="mono" style="font-size:12px">${z.event}</strong>
              <span class="badge ${z.status === 'DELIVERED' ? 'badge-ok' : 'badge-err'}">${z.status}</span>
            </div>
            <div class="muted-xs" style="margin:3px 0">${esc(z.customerName)} (${esc(z.phone)}) · ${z.time}</div>
            <div style="font-size:13px">${esc(z.message)}</div>
          </div>
        `).join('')}
      </div>
    `);
  };

  document.getElementById('resetDemoBtn').onclick = resetState;
  document.getElementById('closeDrawerBtn').onclick = closeDrawer;
  document.getElementById('drawerBackdrop').onclick = closeDrawer;
  document.getElementById('closeModalBtn').onclick = closeModal;
  document.getElementById('modalBackdrop').onclick = (e) => { if (e.target.id === 'modalBackdrop') closeModal(); };

  // Keyboard shortcut F1 -> POS, Esc -> close drawer/modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeDrawer(); closeModal(); }
    if (e.key === 'F1') { e.preventDefault(); state.activeSurface = 'store'; state.activeStoreView = 'pos'; saveState(); renderAll(); }
  });

  // Initial Render
  renderAll();
})();
