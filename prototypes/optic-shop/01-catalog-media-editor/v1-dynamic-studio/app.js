(() => {
  const CATEGORY_META = {
    FRAME: { label: 'Gọng kính', badge: 'badge-teal', hint: 'Hiển thị thông số hình học gọng (mắt – cầu mũi – càng), chất liệu, dáng gọng và dáng mặt phù hợp.' },
    SUNGLASSES: { label: 'Kính mát', badge: 'badge-info', hint: 'Hiển thị thông số gọng + tính năng tròng mát (phân cực Polarized, chống UV400, màu tròng).' },
    LENS_BLANK: { label: 'Tròng kính (Phôi tròng)', badge: 'badge-warn', hint: 'Ẩn dáng gọng & kích thước 50-19-145. Hiển thị thiết kế tròng, chiết suất, chất liệu, váng phủ và dải độ hỗ trợ.' },
    ACCESSORY: { label: 'Phụ kiện', badge: 'badge-neutral', hint: 'Ẩn thông số gọng và chiết suất tròng. Hiển thị đơn vị tính & quy cách đóng gói.' },
    CONSUMABLE: { label: 'Vật tư tiêu hao', badge: 'badge-neutral', hint: 'Ẩn thông số gọng và chiết suất tròng. Dùng cho nước lau kính, khăn microfiber, ốc/ve mũi.' },
    SERVICE: { label: 'Dịch vụ', badge: 'badge-neutral', hint: 'Dịch vụ không theo dõi tồn kho (cắt lắp tròng, cân chỉnh gọng, siêu âm vệ sinh).' }
  };

  const FRAME_SHAPES = [
    { id: 'round', label: 'Tròn (Round)' },
    { id: 'square', label: 'Vuông (Square)' },
    { id: 'rectangle', label: 'Chữ nhật (Rectangle)' },
    { id: 'cateye', label: 'Mắt mèo (Cat-Eye)' },
    { id: 'aviator', label: 'Phi công (Aviator)' },
    { id: 'rimless', label: 'Không viền (Rimless)' },
    { id: 'semi_rimless', label: 'Nửa viền (Semi-Rimless)' },
    { id: 'geometric', label: 'Đa giác (Geometric)' }
  ];

  const FRAME_MATERIALS = ['Beta-Titanium', 'Titanium nguyên chất', 'Acetate cao cấp', 'Nhựa dẻo TR90', 'Ultem siêu nhẹ', 'Thép không gỉ', 'Hợp kim', 'Kết hợp Kim loại & Acetate'];
  const FACE_SHAPES = ['Mặt tròn', 'Mặt trái xoan', 'Mặt vuông', 'Mặt dài', 'Mặt trái tim'];
  const TARGET_GENDERS = ['Unisex', 'Nam', 'Nữ', 'Trẻ em'];

  const LENS_DESIGNS = [
    { id: 'SINGLE_VISION', label: 'Đơn tròng (Single Vision)' },
    { id: 'PROGRESSIVE', label: 'Đa tròng (Progressive)' },
    { id: 'BIFOCAL', label: 'Hai tròng (Bifocal)' },
    { id: 'MYOPIA_CONTROL', label: 'Kiểm soát cận thị trẻ em' },
    { id: 'ANTI_FATIGUE', label: 'Chống mỏi điều tiết (Văn phòng)' }
  ];
  const LENS_INDICES = ['1.50 (Tiêu chuẩn)', '1.56 (Mỏng nhẹ)', '1.59 (Polycarbonate chống vỡ)', '1.60 (Mỏng 20%)', '1.67 (Siêu mỏng 35%)', '1.74 (Siêu mỏng tối đa 45%)'];
  const LENS_MATERIALS = ['CR-39 (Nhựa quang học)', 'High-Index Resin', 'Polycarbonate', 'Trivex', 'Thủy tinh quang học'];
  const LENS_COATINGS = [
    { id: 'hard_coat', label: 'Tráng cứng chống trầy (Hard Coat)' },
    { id: 'ar_hmc', label: 'Chống phản quang / chống lóa (AR / HMC)' },
    { id: 'blue_cut', label: 'Lọc ánh sáng xanh (Blue-Cut)' },
    { id: 'photochromic', label: 'Đổi màu ra nắng (Photochromic)' },
    { id: 'uv400', label: 'Chống tia cực tím UV400' },
    { id: 'hydrophobic', label: 'Siêu trượt nước & chống bám vân tay' },
    { id: 'polarized', label: 'Phân cực chống chói (Polarized)' }
  ];

  const ANGLE_SLOTS = [
    { key: 'FRONT', label: 'Ảnh chính diện', badge: 'Ảnh đại diện' },
    { key: 'ANGLE_45', label: 'Góc nghiêng 45°', badge: 'Khuyến nghị' },
    { key: 'SIDE', label: 'Càng kính ngang', badge: 'Tùy chọn' },
    { key: 'DIMENSIONS', label: 'Bản vẽ / Thông số kích thước', badge: 'Tùy chọn' }
  ];

  function makeSvgDataUrl(title, sub, color) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">
      <rect width="480" height="300" fill="#F8FAFA"/>
      <g transform="translate(80,82)" fill="none" stroke="${color}" stroke-width="6">
        <rect x="20" y="20" width="118" height="84" rx="34"/>
        <rect x="182" y="20" width="118" height="84" rx="34"/>
        <path d="M138 56 Q160 44 182 56"/>
        <path d="M20 50 L4 44M300 50 L316 44"/>
      </g>
      <text x="240" y="232" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="700" fill="#0F3D38">${title}</text>
      <text x="240" y="256" text-anchor="middle" font-family="monospace" font-size="13" fill="#6B7280">${sub}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function makeLensSvgDataUrl(indexLabel, brand) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">
      <defs><radialGradient id="g" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="#CCFBF1"/><stop offset="100%" stop-color="#0F766E" stop-opacity="0.22"/></radialGradient></defs>
      <rect width="480" height="300" fill="#F8FAFA"/>
      <circle cx="240" cy="126" r="78" fill="url(#g)" stroke="#0F766E" stroke-width="4"/>
      <path d="M195 92 Q225 70 260 80" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
      <text x="240" y="132" text-anchor="middle" font-family="monospace" font-size="22" font-weight="700" fill="#0F3D38">${indexLabel}</text>
      <text x="240" y="242" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="#0F3D38">${brand}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  const state = {
    search: '',
    catFilter: 'ALL',
    webFilter: 'ALL',
    activeTab: 'specs',
    editingId: null,
    draft: null,
    products: [
      {
        id: 'PRD-01',
        sku: 'GK-TIT-018',
        name: 'Gọng Titanium Nhật Bản dáng tròn mảnh',
        brand: 'Matsuda Craft',
        category: 'FRAME',
        salePrice: 1450000,
        costPrice: 780000,
        stockQty: 12,
        minStockQty: 3,
        publishedOnWeb: true,
        video360Url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        specs: {
          frameShape: 'round',
          frameMaterial: 'Beta-Titanium',
          lensWidthMm: 49,
          bridgeMm: 20,
          templeMm: 145,
          lensHeightMm: 44,
          colorName: 'Xám titan mờ',
          colorHex: '#334155',
          gender: 'Unisex',
          faceShapes: ['Mặt vuông', 'Mặt trái xoan']
        },
        media: {
          FRONT: makeSvgDataUrl('Chính diện · GK-TIT-018', 'Size 49-20-145 · Beta-Titanium', '#334155'),
          ANGLE_45: makeSvgDataUrl('Góc nghiêng 45° · GK-TIT-018', 'Đệm mũi silicone êm nhẹ', '#0F766E'),
          SIDE: '',
          DIMENSIONS: makeSvgDataUrl('Thông số 49-20-145 mm', 'Cao tròng B = 44 mm', '#1E293B')
        },
        gallery: [],
        webDescriptionHtml: `<h2>Gọng Beta-Titanium Nhật Bản siêu nhẹ 12g</h2>
<p>Chế tác từ hợp kim <strong>Beta-Titanium</strong> đàn hồi cao, chống ăn mòn mồ hôi và không gây hằn sống mũi khi đeo làm việc 8–10 giờ mỗi ngày.</p>
<h3>Điểm nổi bật cho người cận trung bình đến cao</h3>
<ul>
  <li>Trọng lượng khung chỉ <strong>12 gram</strong>, giảm áp lực lên vành tai.</li>
  <li>Bản lề không ốc vít chắc chắn, dễ cân chỉnh tại cửa hàng.</li>
  <li>Phù hợp lắp tròng chiết suất <strong>1.60 – 1.74</strong> cho độ cận từ −1.00D đến −8.00D.</li>
</ul>
<table>
  <thead><tr><th>Thông số</th><th>Giá trị chuẩn</th></tr></thead>
  <tbody>
    <tr><td>Kích thước (Mắt – Cầu – Càng)</td><td>49 – 20 – 145 mm</td></tr>
    <tr><td>Chiều cao tròng (B-size)</td><td>44 mm (phù hợp cả đa tròng)</td></tr>
    <tr><td>Bảo hành chính hãng</td><td>12 tháng tại Kính Mắt Minh Quang</td></tr>
  </tbody>
</table>`
      },
      {
        id: 'PRD-02',
        sku: 'TR-ESS-167-BC',
        name: 'Tròng Essilor Crizal Rock 1.67 Lọc Ánh Sáng Xanh',
        brand: 'Essilor (Pháp)',
        category: 'LENS_BLANK',
        salePrice: 2350000,
        costPrice: 1250000,
        stockQty: 18,
        minStockQty: 5,
        publishedOnWeb: true,
        video360Url: '',
        specs: {
          lensDesign: 'SINGLE_VISION',
          refractiveIndex: '1.67 (Siêu mỏng 35%)',
          lensMaterial: 'High-Index Resin',
          coatings: ['hard_coat', 'ar_hmc', 'blue_cut', 'uv400', 'hydrophobic'],
          sphMin: '-10.00',
          sphMax: '+6.00',
          cylMax: '-2.00'
        },
        media: {
          FRONT: makeLensSvgDataUrl('1.67 AS', 'Essilor Crizal Rock · Blue-Cut'),
          ANGLE_45: '',
          SIDE: '',
          DIMENSIONS: ''
        },
        gallery: [],
        webDescriptionHtml: `<h2>Tròng siêu mỏng 1.67 chống trầy xước vượt trội</h2>
<p>Phù hợp cho khách có độ cận từ <strong>−3.50D đến −8.00D</strong> muốn mắt kính mỏng nhẹ, thẩm mỹ và bảo vệ mắt trước màn hình máy tính.</p>
<div class="rte-callout"><strong>Khuyến nghị KTV Khúc xạ:</strong> Nên phối cùng gọng kích thước mắt ≤ 52mm để tối ưu độ mỏng viền tròng.</div>`
      },
      {
        id: 'PRD-03',
        sku: 'KM-POL-009',
        name: 'Kính mát Polarized Phi công chống chói lái xe',
        brand: 'RayCraft Studio',
        category: 'SUNGLASSES',
        salePrice: 1180000,
        costPrice: 540000,
        stockQty: 9,
        minStockQty: 2,
        publishedOnWeb: true,
        video360Url: '',
        specs: {
          frameShape: 'aviator',
          frameMaterial: 'Thép không gỉ',
          lensWidthMm: 56,
          bridgeMm: 16,
          templeMm: 142,
          lensHeightMm: 46,
          colorName: 'Vàng đồng / Tròng xanh rêu',
          colorHex: '#92400E',
          gender: 'Nam',
          faceShapes: ['Mặt trái xoan', 'Mặt vuông', 'Mặt dài'],
          polarized: true,
          uv400: true,
          sunTint: 'Xanh rêu G15 (Độ đậm 85%)'
        },
        media: {
          FRONT: makeSvgDataUrl('Kính mát Polarized · KM-POL-009', '56-16-142 · UV400 + Phân cực', '#92400E'),
          ANGLE_45: '',
          SIDE: '',
          DIMENSIONS: ''
        },
        gallery: [],
        webDescriptionHtml: `<h2>Kính mát phân cực giảm lóa mặt đường</h2><p>Trang bị lớp lọc Polarized triệt tiêu ánh sáng phản xạ ngang khi lái xe ban ngày hoặc đi biển.</p>`
      },
      {
        id: 'PRD-04',
        sku: 'VT-NLK-060',
        name: 'Dung dịch rửa kính chống đọng sương 60ml',
        brand: 'Minh Quang Care',
        category: 'CONSUMABLE',
        salePrice: 65000,
        costPrice: 22000,
        stockQty: 84,
        minStockQty: 20,
        publishedOnWeb: false,
        video360Url: '',
        specs: {
          unit: 'Chai',
          packSpec: 'Chai xịt 60ml, không cồn, an toàn cho lớp váng phủ AR/Blue-Cut'
        },
        media: { FRONT: '', ANGLE_45: '', SIDE: '', DIMENSIONS: '' },
        gallery: [],
        webDescriptionHtml: `<p>Dung dịch vệ sinh tròng kính chuyên dụng không chứa cồn, an toàn tuyệt đối cho mọi lớp váng phủ chống lóa.</p>`
      }
    ]
  };

  const fmtVnd = (n) => new Intl.NumberFormat('vi-VN').format(Number(n) || 0) + ' đ';
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

  function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.add('hidden'), 2600);
  }

  function summarizeSpecs(p) {
    const s = p.specs || {};
    if (p.category === 'FRAME') {
      const shape = FRAME_SHAPES.find((f) => f.id === s.frameShape)?.label.split(' ')[0] || 'Gọng';
      return [
        shape,
        s.frameMaterial || 'Kim loại',
        `${s.lensWidthMm || 50}-${s.bridgeMm || 19}-${s.templeMm || 145}mm`,
        ...(s.faceShapes || []).slice(0, 1)
      ];
    }
    if (p.category === 'SUNGLASSES') {
      return [
        s.polarized ? 'Phân cực Polarized' : 'Tròng mát',
        s.uv400 ? 'UV400' : '',
        `${s.lensWidthMm || 54}-${s.bridgeMm || 17}-${s.templeMm || 145}mm`,
        s.sunTint || ''
      ].filter(Boolean);
    }
    if (p.category === 'LENS_BLANK') {
      const design = LENS_DESIGNS.find((d) => d.id === s.lensDesign)?.label.split(' (')[0] || 'Đơn tròng';
      const idx = (s.refractiveIndex || '1.60').split(' ')[0];
      const coats = (s.coatings || []).map((id) => LENS_COATINGS.find((c) => c.id === id)?.label.split(' (')[0]).filter(Boolean);
      return [design, `Chiết suất ${idx}`, ...coats.slice(0, 2)];
    }
    return [s.unit ? `ĐVT: ${s.unit}` : 'Vật tư / Phụ kiện', s.packSpec || 'Không dùng thông số gọng'].filter(Boolean);
  }

  function countMedia(p) {
    const angles = Object.values(p.media || {}).filter(Boolean).length;
    const gal = (p.gallery || []).length;
    return angles + gal;
  }

  function renderFilters() {
    const wrap = document.getElementById('catFilterPills');
    const counts = { ALL: state.products.length };
    Object.keys(CATEGORY_META).forEach((k) => {
      counts[k] = state.products.filter((p) => p.category === k).length;
    });
    const keys = ['ALL', ...Object.keys(CATEGORY_META)];
    wrap.innerHTML = keys.map((k) => {
      const label = k === 'ALL' ? 'Tất cả' : CATEGORY_META[k].label;
      return `<button type="button" class="pill ${state.catFilter === k ? 'active' : ''}" data-cat="${k}">${label} (${counts[k]})</button>`;
    }).join('');
    wrap.querySelectorAll('[data-cat]').forEach((b) => {
      b.onclick = () => { state.catFilter = b.dataset.cat; renderAll(); };
    });
  }

  function renderTable() {
    const q = state.search.trim().toLowerCase();
    const list = state.products.filter((p) => {
      if (state.catFilter !== 'ALL' && p.category !== state.catFilter) return false;
      if (state.webFilter === 'WEB' && !p.publishedOnWeb) return false;
      if (state.webFilter === 'HIDDEN' && p.publishedOnWeb) return false;
      if (q) {
        const hay = [p.sku, p.name, p.brand, ...summarizeSpecs(p)].join(' ').toLowerCase();
        return hay.includes(q);
      }
      return true;
    });

    const tbody = document.getElementById('productTableBody');
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--text-muted)">Không có sản phẩm phù hợp bộ lọc hiện tại.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((p) => {
      const cm = CATEGORY_META[p.category];
      const imgCount = countMedia(p);
      const chips = summarizeSpecs(p);
      return `<tr>
        <td>
          <div class="prod-cell">
            <div class="prod-thumb">
              ${p.media.FRONT ? `<img src="${p.media.FRONT}" alt="${esc(p.name)}" />` : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.8"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`}
            </div>
            <div>
              <div class="prod-name">${esc(p.name)}</div>
              <div class="prod-sku mono">${esc(p.sku)} · ${esc(p.brand)}</div>
            </div>
          </div>
        </td>
        <td><span class="badge ${cm.badge}">${cm.label}</span></td>
        <td>
          <div class="spec-chip-row">${chips.map((c) => `<span class="spec-chip">${esc(c)}</span>`).join('')}</div>
        </td>
        <td>
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
            <span class="badge ${imgCount > 0 ? 'badge-ok' : 'badge-neutral'}">${imgCount} ảnh</span>
            ${p.video360Url ? `<span class="badge badge-info">Video 360°</span>` : ''}
          </div>
        </td>
        <td class="num mono" style="font-weight:600">${fmtVnd(p.salePrice)}</td>
        <td class="num mono">${p.category === 'SERVICE' ? '—' : p.stockQty}</td>
        <td>
          <span class="badge ${p.publishedOnWeb ? 'badge-ok' : 'badge-neutral'}">${p.publishedOnWeb ? 'Đang đăng Web' : 'Chỉ tại quầy'}</span>
        </td>
        <td class="num">
          <button type="button" class="btn btn-secondary btn-xs" data-edit="${p.id}">Chỉnh sửa</button>
        </td>
      </tr>`;
    }).join('');

    tbody.querySelectorAll('[data-edit]').forEach((b) => {
      b.onclick = () => openEditor(b.dataset.edit);
    });
  }

  function defaultSpecsForCategory(cat) {
    if (cat === 'FRAME') {
      return { frameShape: 'round', frameMaterial: 'Beta-Titanium', lensWidthMm: 50, bridgeMm: 19, templeMm: 145, lensHeightMm: 42, colorName: 'Đen nhám', colorHex: '#1F2937', gender: 'Unisex', faceShapes: ['Mặt trái xoan'] };
    }
    if (cat === 'SUNGLASSES') {
      return { frameShape: 'aviator', frameMaterial: 'Thép không gỉ', lensWidthMm: 56, bridgeMm: 16, templeMm: 142, lensHeightMm: 46, colorName: 'Đen / Tròng khói', colorHex: '#111827', gender: 'Unisex', faceShapes: ['Mặt trái xoan'], polarized: true, uv400: true, sunTint: 'Khói đậm 85%' };
    }
    if (cat === 'LENS_BLANK') {
      return { lensDesign: 'SINGLE_VISION', refractiveIndex: '1.60 (Mỏng 20%)', lensMaterial: 'High-Index Resin', coatings: ['hard_coat', 'ar_hmc', 'blue_cut'], sphMin: '-8.00', sphMax: '+4.00', cylMax: '-2.00' };
    }
    return { unit: cat === 'SERVICE' ? 'Lần' : 'Cái', packSpec: '' };
  }

  function openEditor(productId) {
    if (productId) {
      const orig = state.products.find((p) => p.id === productId);
      state.editingId = orig.id;
      state.draft = JSON.parse(JSON.stringify(orig));
    } else {
      state.editingId = null;
      state.draft = {
        id: 'PRD-' + String(state.products.length + 1).padStart(2, '0'),
        sku: '',
        name: '',
        brand: '',
        category: 'FRAME',
        salePrice: 950000,
        costPrice: 450000,
        stockQty: 0,
        minStockQty: 3,
        publishedOnWeb: true,
        video360Url: '',
        specs: defaultSpecsForCategory('FRAME'),
        media: { FRONT: '', ANGLE_45: '', SIDE: '', DIMENSIONS: '' },
        gallery: [],
        webDescriptionHtml: '<h2>Mô tả chi tiết sản phẩm</h2><p>Nhập nội dung giới thiệu sản phẩm cho khách hàng trên Website...</p>'
      };
    }
    state.activeTab = 'specs';
    document.getElementById('drawerBackdrop').classList.remove('hidden');
    document.getElementById('editorDrawer').classList.remove('hidden');
    renderDrawer();
  }

  function closeEditor() {
    document.getElementById('drawerBackdrop').classList.add('hidden');
    document.getElementById('editorDrawer').classList.add('hidden');
  }

  function syncDrawerHeader() {
    const d = state.draft;
    document.getElementById('drawerEyebrow').textContent = state.editingId ? `CHỈNH SỬA · ${d.sku || 'MỚI'}` : 'THÊM SẢN PHẨM MỚI';
    document.getElementById('drawerTitle').textContent = d.name || 'Sản phẩm chưa đặt tên';
    document.getElementById('publishToggle').checked = !!d.publishedOnWeb;
    document.getElementById('mediaCountBadge').textContent = String(countMedia(d));
    document.querySelectorAll('.drawer-tabs .tab-btn').forEach((b) => b.classList.toggle('active', b.dataset.tab === state.activeTab));
  }

  function renderDynamicSpecsHtml(d) {
    const cm = CATEGORY_META[d.category];
    const s = d.specs;

    if (d.category === 'FRAME' || d.category === 'SUNGLASSES') {
      return `
        <div class="dynamic-banner">
          <span><strong>Thông số động (${cm.label}):</strong> ${cm.hint}</span>
          <span class="mono" style="font-weight:700">Size: ${s.lensWidthMm || 0}-${s.bridgeMm || 0}-${s.templeMm || 0} mm</span>
        </div>

        <div class="form-grid-3">
          <div class="field">
            <label>Dáng gọng (chỉ dáng gọng thực)</label>
            <select id="specFrameShape" class="select">
              ${FRAME_SHAPES.map((f) => `<option value="${f.id}" ${s.frameShape === f.id ? 'selected' : ''}>${f.label}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label>Chất liệu gọng</label>
            <select id="specFrameMat" class="select">
              ${FRAME_MATERIALS.map((m) => `<option value="${m}" ${s.frameMaterial === m ? 'selected' : ''}>${m}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label>Đối tượng sử dụng</label>
            <select id="specGender" class="select">
              ${TARGET_GENDERS.map((g) => `<option value="${g}" ${s.gender === g ? 'selected' : ''}>${g}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="form-grid-4" style="margin-top:12px">
          <div class="field">
            <label>Rộng mắt kính (mm)</label>
            <input id="specLensW" type="number" min="38" max="66" class="input mono" value="${s.lensWidthMm || 50}" />
            <span class="field-hint">Chuẩn: 40–62 mm</span>
          </div>
          <div class="field">
            <label>Cầu mũi (mm)</label>
            <input id="specBridge" type="number" min="12" max="26" class="input mono" value="${s.bridgeMm || 19}" />
            <span class="field-hint">Chuẩn: 14–24 mm</span>
          </div>
          <div class="field">
            <label>Chiều dài càng (mm)</label>
            <input id="specTemple" type="number" min="115" max="160" class="input mono" value="${s.templeMm || 145}" />
            <span class="field-hint">Chuẩn: 120–155 mm</span>
          </div>
          <div class="field">
            <label>Cao tròng B-size (mm)</label>
            <input id="specLensH" type="number" min="24" max="60" class="input mono" value="${s.lensHeightMm || 42}" />
            <span class="field-hint">Quan trọng cho đa tròng</span>
          </div>
        </div>

        <div class="form-grid-2" style="margin-top:12px">
          <div class="field">
            <label>Tên màu sắc hiển thị</label>
            <input id="specColorName" class="input" value="${esc(s.colorName || '')}" placeholder="VD: Xám titan mờ, Đồi mồi..." />
          </div>
          <div class="field">
            <label>Mã màu đại diện</label>
            <div style="display:flex;gap:8px;align-items:center">
              <input id="specColorHex" type="color" value="${s.colorHex || '#1F2937'}" style="width:42px;height:36px;border:1px solid var(--border-strong);border-radius:6px;padding:2px;background:#fff" />
              <span class="mono muted-xs">${esc(s.colorHex || '#1F2937')}</span>
            </div>
          </div>
        </div>

        <div class="field" style="margin-top:12px">
          <label>Phù hợp dáng khuôn mặt (dùng lọc trên Website &amp; Try-On)</label>
          <div class="chip-grid">
            ${FACE_SHAPES.map((f) => `<button type="button" class="check-chip ${(s.faceShapes || []).includes(f) ? 'selected' : ''}" data-face="${f}">${(s.faceShapes || []).includes(f) ? '✓ ' : '+ '}${f}</button>`).join('')}
          </div>
        </div>

        ${d.category === 'SUNGLASSES' ? `
          <div style="margin-top:14px;padding-top:14px;border-top:1px dashed var(--border-strong)">
            <div class="form-grid-2">
              <div class="field">
                <label>Màu tròng mát &amp; độ đậm</label>
                <input id="specSunTint" class="input" value="${esc(s.sunTint || '')}" placeholder="VD: Xanh rêu G15 (85%)" />
              </div>
              <div class="field">
                <label>Tính năng bảo vệ mắt</label>
                <div class="chip-grid">
                  <button type="button" class="check-chip ${s.polarized ? 'selected' : ''}" id="togglePolarized">${s.polarized ? '✓ ' : '+ '}Phân cực (Polarized)</button>
                  <button type="button" class="check-chip ${s.uv400 ? 'selected' : ''}" id="toggleUv400">${s.uv400 ? '✓ ' : '+ '}Chống tia UV400</button>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      `;
    }

    if (d.category === 'LENS_BLANK') {
      return `
        <div class="dynamic-banner">
          <span><strong>Thông số động (Tròng kính):</strong> ${cm.hint}</span>
        </div>

        <div class="form-grid-3">
          <div class="field">
            <label>Thiết kế tròng (Lens Design)</label>
            <select id="specLensDesign" class="select">
              ${LENS_DESIGNS.map((l) => `<option value="${l.id}" ${s.lensDesign === l.id ? 'selected' : ''}>${l.label}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label>Chiết suất (Refractive Index)</label>
            <select id="specLensIndex" class="select">
              ${LENS_INDICES.map((i) => `<option value="${i}" ${s.refractiveIndex === i ? 'selected' : ''}>${i}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label>Chất liệu phôi tròng</label>
            <select id="specLensMat" class="select">
              ${LENS_MATERIALS.map((m) => `<option value="${m}" ${s.lensMaterial === m ? 'selected' : ''}>${m}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="field" style="margin-top:12px">
          <label>Lớp váng phủ &amp; Tính năng chuyên biệt (chọn nhiều — đồng bộ bộ lọc Website &amp; Budget Planner)</label>
          <div class="chip-grid">
            ${LENS_COATINGS.map((c) => `<button type="button" class="check-chip ${(s.coatings || []).includes(c.id) ? 'selected' : ''}" data-coat="${c.id}">${(s.coatings || []).includes(c.id) ? '✓ ' : '+ '}${c.label}</button>`).join('')}
          </div>
        </div>

        <div class="form-grid-3" style="margin-top:12px">
          <div class="field">
            <label>Dải độ cầu SPH thấp nhất</label>
            <input id="specSphMin" class="input mono" value="${esc(s.sphMin || '-8.00')}" placeholder="-10.00" />
          </div>
          <div class="field">
            <label>Dải độ cầu SPH cao nhất</label>
            <input id="specSphMax" class="input mono" value="${esc(s.sphMax || '+4.00')}" placeholder="+6.00" />
          </div>
          <div class="field">
            <label>Độ loạn CYL hỗ trợ tối đa</label>
            <input id="specCylMax" class="input mono" value="${esc(s.cylMax || '-2.00')}" placeholder="-2.00" />
          </div>
        </div>
      `;
    }

    return `
      <div class="dynamic-banner">
        <span><strong>Thông số động (${cm.label}):</strong> ${cm.hint}</span>
      </div>
      <div class="form-grid-2">
        <div class="field">
          <label>Đơn vị tính</label>
          <select id="specUnit" class="select">
            ${['Cái', 'Chai', 'Hộp', 'Bộ', 'Gói', 'Lần'].map((u) => `<option value="${u}" ${s.unit === u ? 'selected' : ''}>${u}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label>Quy cách / Dung tích / Ghi chú kỹ thuật</label>
          <input id="specPack" class="input" value="${esc(s.packSpec || '')}" placeholder="VD: Chai 60ml, không cồn, an toàn cho váng phủ AR" />
        </div>
      </div>
    `;
  }

  function toVideoEmbedHtml(url) {
    if (!url) return `<div class="muted-xs" style="text-align:center;padding:20px">Chưa có video. Dán link YouTube / MP4 hoặc tải file .mp4 lên để xem trước cách phát trên Website.</div>`;
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    if (yt) {
      return `<iframe src="https://www.youtube.com/embed/${yt[1]}" title="Video sản phẩm" allowfullscreen></iframe>`;
    }
    return `<video controls src="${esc(url)}">Trình duyệt không hỗ trợ phát video trực tiếp.</video>`;
  }

  function renderDrawer() {
    syncDrawerHeader();
    const d = state.draft;
    const body = document.getElementById('drawerBody');

    if (state.activeTab === 'specs') {
      body.innerHTML = `
        <div class="section-block">
          <div class="section-head">
            <h3 class="section-title">Thông tin định danh &amp; Giá bán</h3>
            <span class="section-note">Đổi Danh mục sẽ tự động đổi khối thông số chuyên ngành bên dưới</span>
          </div>
          <div class="form-grid-3">
            <div class="field">
              <label>Danh mục sản phẩm *</label>
              <select id="inpCategory" class="select">
                ${Object.entries(CATEGORY_META).map(([k, v]) => `<option value="${k}" ${d.category === k ? 'selected' : ''}>${v.label}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label>Mã SKU *</label>
              <input id="inpSku" class="input mono" value="${esc(d.sku)}" placeholder="VD: GK-TIT-019" />
            </div>
            <div class="field">
              <label>Thương hiệu</label>
              <input id="inpBrand" class="input" value="${esc(d.brand)}" placeholder="VD: Essilor, Matsuda..." />
            </div>
          </div>
          <div class="field" style="margin-top:12px">
            <label>Tên sản phẩm hiển thị *</label>
            <input id="inpName" class="input" value="${esc(d.name)}" placeholder="VD: Gọng Titanium Nhật Bản dáng tròn mảnh" />
          </div>
          <div class="form-grid-3" style="margin-top:12px">
            <div class="field">
              <label>Giá bán (VNĐ)</label>
              <input id="inpSalePrice" type="number" step="10000" class="input mono" value="${d.salePrice}" />
            </div>
            <div class="field">
              <label>Giá vốn (VNĐ)</label>
              <input id="inpCostPrice" type="number" step="10000" class="input mono" value="${d.costPrice}" />
            </div>
            <div class="field">
              <label>Định mức tồn tối thiểu</label>
              <input id="inpMinStock" type="number" class="input mono" value="${d.minStockQty}" ${d.category === 'SERVICE' ? 'disabled' : ''} />
            </div>
          </div>
        </div>

        <div class="section-block">
          <div class="section-head">
            <h3 class="section-title">Thông số chuyên ngành (${CATEGORY_META[d.category].label})</h3>
            <span class="badge ${CATEGORY_META[d.category].badge}">Form thích ứng tự động</span>
          </div>
          ${renderDynamicSpecsHtml(d)}
        </div>
      `;
      bindSpecsEvents();
      return;
    }

    if (state.activeTab === 'media') {
      body.innerHTML = `
        <div class="section-block">
          <div class="section-head">
            <div>
              <h3 class="section-title">Ảnh sản phẩm theo từng góc chụp</h3>
              <span class="section-note">Tải ảnh thật từ máy tính hoặc dán URL cho từng góc; hiển thị trực tiếp trong bộ sưu tập trên Website.</span>
            </div>
          </div>
          <div class="angle-grid">
            ${ANGLE_SLOTS.map((slot) => {
              const url = d.media[slot.key] || '';
              return `
                <div class="media-slot">
                  <div class="media-slot-head">
                    <span class="media-slot-title">${slot.label}</span>
                    <span class="badge ${url ? 'badge-ok' : 'badge-neutral'}">${url ? 'Đã có ảnh' : slot.badge}</span>
                  </div>
                  <div class="media-preview-box ${url ? 'has-img' : ''}">
                    ${url
                      ? `<img src="${url}" alt="${slot.label}" />`
                      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.6"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg><span class="muted-xs">Chưa có ảnh cho góc này</span>`}
                  </div>
                  <div class="media-slot-actions">
                    <label class="btn btn-primary btn-xs" style="cursor:pointer">
                      <span>${url ? 'Thay ảnh từ máy' : 'Tải ảnh từ máy'}</span>
                      <input type="file" accept="image/*" data-upload-angle="${slot.key}" style="display:none" />
                    </label>
                    <button type="button" class="btn btn-secondary btn-xs" data-sample-angle="${slot.key}">Dùng ảnh mẫu</button>
                    ${url ? `<button type="button" class="btn btn-danger-ghost btn-xs" data-clear-angle="${slot.key}">Xóa</button>` : ''}
                  </div>
                  <div class="url-inline">
                    <input class="input mono" data-url-angle="${slot.key}" value="${url.startsWith('data:') ? '' : esc(url)}" placeholder="Hoặc dán URL ảnh trực tiếp (https://...)" />
                    <button type="button" class="btn btn-secondary btn-xs" data-apply-url="${slot.key}">Áp dụng</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="section-block">
          <div class="section-head">
            <div>
              <h3 class="section-title">Video 360° / Video quay thực tế sản phẩm</h3>
              <span class="section-note">Khi có link YouTube hoặc tệp MP4, trang chi tiết Website sẽ tự thêm tab "Video 360°" ngay cạnh các góc ảnh.</span>
            </div>
          </div>
          <div class="form-grid-2">
            <div class="field">
              <label>Link Video (YouTube hoặc đường dẫn .mp4)</label>
              <input id="inpVideoUrl" class="input mono" value="${esc(d.video360Url || '')}" placeholder="https://www.youtube.com/watch?v=... hoặc https://.../360.mp4" />
            </div>
            <div class="field">
              <label>Hoặc tải tệp Video từ máy (.mp4 / .webm)</label>
              <div style="display:flex;gap:8px;align-items:center">
                <label class="btn btn-secondary btn-sm" style="cursor:pointer">
                  <span>Chọn file Video</span>
                  <input type="file" accept="video/mp4,video/webm" id="uploadVideoFile" style="display:none" />
                </label>
                ${d.video360Url ? `<button type="button" class="btn btn-danger-ghost btn-sm" id="clearVideoBtn">Gỡ video</button>` : ''}
              </div>
            </div>
          </div>
          <div class="video-preview-frame" id="videoPreviewFrame">${toVideoEmbedHtml(d.video360Url)}</div>
        </div>
      `;
      bindMediaEvents();
      return;
    }

    // Tab 3: Rich Text Editor
    body.innerHTML = `
      <div class="section-block">
        <div class="section-head">
          <div>
            <h3 class="section-title">Trình biên tập Mô tả chi tiết Website (Rich Text Editor)</h3>
            <span class="section-note">Hỗ trợ tiêu đề, danh sách, bảng thông số, chèn ảnh minh họa và khung khuyến nghị — xuất bản trực tiếp lên trang chi tiết sản phẩm.</span>
          </div>
        </div>

        <div class="rte-shell">
          <div class="rte-toolbar">
            <button type="button" class="rte-btn" data-cmd="formatBlock" data-val="H2">Tiêu đề H2</button>
            <button type="button" class="rte-btn" data-cmd="formatBlock" data-val="H3">Tiêu đề H3</button>
            <span class="rte-sep"></span>
            <button type="button" class="rte-btn" data-cmd="bold"><strong>B</strong></button>
            <button type="button" class="rte-btn" data-cmd="italic"><em>I</em></button>
            <button type="button" class="rte-btn" data-cmd="insertUnorderedList">• Danh sách</button>
            <button type="button" class="rte-btn" data-cmd="insertOrderedList">1. Đánh số</button>
            <span class="rte-sep"></span>
            <button type="button" class="rte-btn" id="rteInsertTable">+ Chèn Bảng thông số</button>
            <button type="button" class="rte-btn" id="rteInsertCallout">+ Hộp khuyến nghị KTV</button>
            <button type="button" class="rte-btn" id="rteInsertImg">+ Chèn Ảnh</button>
          </div>
          <div id="rteEditor" class="rte-editor" contenteditable="true">${d.webDescriptionHtml || ''}</div>
        </div>
      </div>
    `;
    bindRteEvents();
  }

  function bindSpecsEvents() {
    const d = state.draft;
    document.getElementById('inpCategory').onchange = (e) => {
      d.category = e.target.value;
      d.specs = defaultSpecsForCategory(d.category);
      renderDrawer();
      showToast(`Đã chuyển form sang danh mục: ${CATEGORY_META[d.category].label}`);
    };
    document.getElementById('inpSku').oninput = (e) => { d.sku = e.target.value; syncDrawerHeader(); };
    document.getElementById('inpBrand').oninput = (e) => { d.brand = e.target.value; };
    document.getElementById('inpName').oninput = (e) => { d.name = e.target.value; syncDrawerHeader(); };
    document.getElementById('inpSalePrice').oninput = (e) => { d.salePrice = Number(e.target.value) || 0; };
    document.getElementById('inpCostPrice').oninput = (e) => { d.costPrice = Number(e.target.value) || 0; };
    document.getElementById('inpMinStock').oninput = (e) => { d.minStockQty = Number(e.target.value) || 0; };

    const s = d.specs;
    if (d.category === 'FRAME' || d.category === 'SUNGLASSES') {
      document.getElementById('specFrameShape').onchange = (e) => { s.frameShape = e.target.value; };
      document.getElementById('specFrameMat').onchange = (e) => { s.frameMaterial = e.target.value; };
      document.getElementById('specGender').onchange = (e) => { s.gender = e.target.value; };
      document.getElementById('specLensW').oninput = (e) => { s.lensWidthMm = Number(e.target.value); renderDrawer(); };
      document.getElementById('specBridge').oninput = (e) => { s.bridgeMm = Number(e.target.value); renderDrawer(); };
      document.getElementById('specTemple').oninput = (e) => { s.templeMm = Number(e.target.value); renderDrawer(); };
      document.getElementById('specLensH').oninput = (e) => { s.lensHeightMm = Number(e.target.value); };
      document.getElementById('specColorName').oninput = (e) => { s.colorName = e.target.value; };
      document.getElementById('specColorHex').oninput = (e) => { s.colorHex = e.target.value; renderDrawer(); };
      document.querySelectorAll('[data-face]').forEach((b) => {
        b.onclick = () => {
          const val = b.dataset.face;
          s.faceShapes = s.faceShapes || [];
          s.faceShapes = s.faceShapes.includes(val) ? s.faceShapes.filter((x) => x !== val) : [...s.faceShapes, val];
          renderDrawer();
        };
      });
      if (d.category === 'SUNGLASSES') {
        document.getElementById('specSunTint').oninput = (e) => { s.sunTint = e.target.value; };
        document.getElementById('togglePolarized').onclick = () => { s.polarized = !s.polarized; renderDrawer(); };
        document.getElementById('toggleUv400').onclick = () => { s.uv400 = !s.uv400; renderDrawer(); };
      }
    } else if (d.category === 'LENS_BLANK') {
      document.getElementById('specLensDesign').onchange = (e) => { s.lensDesign = e.target.value; };
      document.getElementById('specLensIndex').onchange = (e) => { s.refractiveIndex = e.target.value; };
      document.getElementById('specLensMat').onchange = (e) => { s.lensMaterial = e.target.value; };
      document.getElementById('specSphMin').oninput = (e) => { s.sphMin = e.target.value; };
      document.getElementById('specSphMax').oninput = (e) => { s.sphMax = e.target.value; };
      document.getElementById('specCylMax').oninput = (e) => { s.cylMax = e.target.value; };
      document.querySelectorAll('[data-coat]').forEach((b) => {
        b.onclick = () => {
          const id = b.dataset.coat;
          s.coatings = s.coatings || [];
          s.coatings = s.coatings.includes(id) ? s.coatings.filter((x) => x !== id) : [...s.coatings, id];
          renderDrawer();
        };
      });
    } else {
      document.getElementById('specUnit').onchange = (e) => { s.unit = e.target.value; };
      document.getElementById('specPack').oninput = (e) => { s.packSpec = e.target.value; };
    }
  }

  function bindMediaEvents() {
    const d = state.draft;
    document.querySelectorAll('[data-upload-angle]').forEach((inp) => {
      inp.onchange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          d.media[inp.dataset.uploadAngle] = reader.result;
          renderDrawer();
          showToast(`Đã tải ảnh lên cho góc ${inp.dataset.uploadAngle}`);
        };
        reader.readAsDataURL(file);
      };
    });

    document.querySelectorAll('[data-sample-angle]').forEach((btn) => {
      btn.onclick = () => {
        const key = btn.dataset.sampleAngle;
        const slot = ANGLE_SLOTS.find((x) => x.key === key);
        d.media[key] = d.category === 'LENS_BLANK'
          ? makeLensSvgDataUrl((d.specs.refractiveIndex || '1.60').split(' ')[0], `${slot.label} · ${d.brand || 'Optical'}`)
          : makeSvgDataUrl(`${slot.label} · ${d.sku || 'NEW'}`, d.brand || 'Minh Quang', d.specs.colorHex || '#0F766E');
        renderDrawer();
      };
    });

    document.querySelectorAll('[data-clear-angle]').forEach((btn) => {
      btn.onclick = () => {
        d.media[btn.dataset.clearAngle] = '';
        renderDrawer();
      };
    });

    document.querySelectorAll('[data-apply-url]').forEach((btn) => {
      btn.onclick = () => {
        const key = btn.dataset.applyUrl;
        const val = document.querySelector(`[data-url-angle="${key}"]`).value.trim();
        if (!val) return;
        d.media[key] = val;
        renderDrawer();
        showToast('Đã cập nhật URL ảnh');
      };
    });

    const vInp = document.getElementById('inpVideoUrl');
    vInp.onchange = (e) => {
      d.video360Url = e.target.value.trim();
      document.getElementById('videoPreviewFrame').innerHTML = toVideoEmbedHtml(d.video360Url);
    };

    const vFile = document.getElementById('uploadVideoFile');
    vFile.onchange = (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      d.video360Url = URL.createObjectURL(f);
      renderDrawer();
      showToast(`Đã nạp video: ${f.name}`);
    };

    const clearV = document.getElementById('clearVideoBtn');
    if (clearV) {
      clearV.onclick = () => { d.video360Url = ''; renderDrawer(); };
    }
  }

  function bindRteEvents() {
    const editor = document.getElementById('rteEditor');
    editor.oninput = () => { state.draft.webDescriptionHtml = editor.innerHTML; };

    document.querySelectorAll('.rte-btn[data-cmd]').forEach((b) => {
      b.onclick = () => {
        editor.focus();
        document.execCommand(b.dataset.cmd, false, b.dataset.val || null);
        state.draft.webDescriptionHtml = editor.innerHTML;
      };
    });

    document.getElementById('rteInsertTable').onclick = () => {
      editor.focus();
      const rows = buildSpecRows(state.draft).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('');
      document.execCommand('insertHTML', false, `<table><thead><tr><th>Thông số kỹ thuật</th><th>Chi tiết</th></tr></thead><tbody>${rows}</tbody></table><p></p>`);
      state.draft.webDescriptionHtml = editor.innerHTML;
    };

    document.getElementById('rteInsertCallout').onclick = () => {
      editor.focus();
      document.execCommand('insertHTML', false, `<div class="rte-callout"><strong>Khuyến nghị từ KTV Khúc xạ:</strong> Phù hợp đeo làm việc văn phòng và lái xe ban đêm.</div><p></p>`);
      state.draft.webDescriptionHtml = editor.innerHTML;
    };

    document.getElementById('rteInsertImg').onclick = () => {
      editor.focus();
      const sample = state.draft.media.FRONT || makeSvgDataUrl('Ảnh minh họa trong bài viết', state.draft.sku || 'OPTIC', '#0F766E');
      document.execCommand('insertHTML', false, `<img src="${sample}" alt="Ảnh minh họa sản phẩm" /><p></p>`);
      state.draft.webDescriptionHtml = editor.innerHTML;
    };
  }

  function buildSpecRows(p) {
    const s = p.specs || {};
    if (p.category === 'FRAME' || p.category === 'SUNGLASSES') {
      const rows = [
        ['Thương hiệu', p.brand || '—'],
        ['Dáng gọng', FRAME_SHAPES.find((f) => f.id === s.frameShape)?.label || '—'],
        ['Chất liệu', s.frameMaterial || '—'],
        ['Kích thước chuẩn', `${s.lensWidthMm || 50} – ${s.bridgeMm || 19} – ${s.templeMm || 145} mm`],
        ['Chiều cao tròng (B-size)', `${s.lensHeightMm || 42} mm`],
        ['Màu sắc', s.colorName || '—'],
        ['Phù hợp dáng mặt', (s.faceShapes || []).join(', ') || '—']
      ];
      if (p.category === 'SUNGLASSES') {
        rows.push(['Chống chói / UV', `${s.polarized ? 'Phân cực Polarized' : 'Thường'} · ${s.uv400 ? 'UV400' : ''}`]);
        if (s.sunTint) rows.push(['Màu tròng mát', s.sunTint]);
      }
      return rows;
    }
    if (p.category === 'LENS_BLANK') {
      const coats = (s.coatings || []).map((id) => LENS_COATINGS.find((c) => c.id === id)?.label).filter(Boolean);
      return [
        ['Thương hiệu', p.brand || '—'],
        ['Thiết kế tròng', LENS_DESIGNS.find((l) => l.id === s.lensDesign)?.label || '—'],
        ['Chiết suất', s.refractiveIndex || '—'],
        ['Chất liệu tròng', s.lensMaterial || '—'],
        ['Váng phủ & Tính năng', coats.join(' · ') || '—'],
        ['Dải độ hỗ trợ', `SPH ${s.sphMin || '-8.00'} đến ${s.sphMax || '+4.00'} · CYL tới ${s.cylMax || '-2.00'}`]
      ];
    }
    return [
      ['Thương hiệu', p.brand || '—'],
      ['Đơn vị tính', s.unit || 'Cái'],
      ['Quy cách', s.packSpec || '—']
    ];
  }

  function openWebPreview() {
    const p = state.draft;
    const items = [];
    ANGLE_SLOTS.forEach((slot) => {
      if (p.media[slot.key]) items.push({ key: slot.key, type: 'img', label: slot.label, src: p.media[slot.key] });
    });
    if (p.video360Url) items.push({ key: 'VIDEO', type: 'video', label: '▶ Video 360°', src: p.video360Url });
    if (items.length === 0) items.push({ key: 'EMPTY', type: 'empty', label: 'Chưa có ảnh' });

    let activeKey = items[0].key;
    const renderPreview = () => {
      const cur = items.find((i) => i.key === activeKey) || items[0];
      const stageHtml = cur.type === 'img'
        ? `<img src="${cur.src}" alt="${esc(p.name)}" />`
        : cur.type === 'video'
          ? toVideoEmbedHtml(cur.src)
          : `<span class="muted-xs">Chưa có ảnh — vào Tab 2 để tải ảnh lên</span>`;

      const rows = buildSpecRows(p);
      document.getElementById('previewBody').innerHTML = `
        <div class="web-pdp-grid">
          <div>
            <div class="web-stage">${stageHtml}</div>
            <div class="web-thumbs">
              ${items.map((i) => `<button type="button" class="web-thumb-btn ${i.key === cur.key ? 'active' : ''}" data-pitem="${i.key}">${esc(i.label)}</button>`).join('')}
            </div>
          </div>
          <div>
            <span class="badge ${CATEGORY_META[p.category].badge}">${CATEGORY_META[p.category].label}</span>
            <h1 class="web-title">${esc(p.name || 'Chưa đặt tên sản phẩm')}</h1>
            <div class="muted-xs mono">SKU: ${esc(p.sku || '—')} · ${esc(p.brand || 'Minh Quang')}</div>
            <div class="web-price">${fmtVnd(p.salePrice)}</div>
            <table class="web-spec-table">
              <tbody>${rows.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody>
            </table>
          </div>
        </div>
        <div class="web-desc-box">
          <div class="muted-xs" style="font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">Mô tả chi tiết sản phẩm</div>
          <div class="rte-editor" style="padding:0;min-height:0">${p.webDescriptionHtml || '<p class="muted-xs">Chưa có mô tả.</p>'}</div>
        </div>
      `;
      document.querySelectorAll('[data-pitem]').forEach((b) => {
        b.onclick = () => { activeKey = b.dataset.pitem; renderPreview(); };
      });
    };

    document.getElementById('previewBackdrop').classList.remove('hidden');
    document.getElementById('previewModal').classList.remove('hidden');
    renderPreview();
  }

  function closeWebPreview() {
    document.getElementById('previewBackdrop').classList.add('hidden');
    document.getElementById('previewModal').classList.add('hidden');
  }

  function saveDraft() {
    const d = state.draft;
    if (!d.sku.trim() || !d.name.trim()) {
      showToast('Vui lòng nhập đầy đủ Mã SKU và Tên sản phẩm.');
      return;
    }
    d.publishedOnWeb = document.getElementById('publishToggle').checked;
    if (state.editingId) {
      const idx = state.products.findIndex((x) => x.id === state.editingId);
      if (idx >= 0) state.products[idx] = d;
    } else {
      state.products.unshift(d);
    }
    closeEditor();
    renderAll();
    showToast(`Đã lưu sản phẩm ${d.sku} (${CATEGORY_META[d.category].label})`);
  }

  function renderAll() {
    renderFilters();
    renderTable();
  }

  // Global bindings
  document.getElementById('searchInput').oninput = (e) => { state.search = e.target.value; renderTable(); };
  document.getElementById('webFilterSelect').onchange = (e) => { state.webFilter = e.target.value; renderTable(); };
  document.getElementById('addProductBtn').onclick = () => openEditor(null);
  document.getElementById('quickDemoLensBtn').onclick = () => openEditor('PRD-02');
  document.getElementById('closeDrawerBtn').onclick = closeEditor;
  document.getElementById('cancelDrawerBtn').onclick = closeEditor;
  document.getElementById('drawerBackdrop').onclick = closeEditor;
  document.getElementById('saveProductBtn').onclick = saveDraft;
  document.getElementById('openWebPreviewBtn').onclick = openWebPreview;
  document.getElementById('closePreviewBtn').onclick = closeWebPreview;
  document.getElementById('previewBackdrop').onclick = closeWebPreview;
  document.querySelectorAll('.drawer-tabs .tab-btn').forEach((b) => {
    b.onclick = () => { state.activeTab = b.dataset.tab; renderDrawer(); };
  });

  renderAll();
  // Auto-open first product so reviewer sees the dynamic studio immediately, or let user click
  openEditor('PRD-01');
})();
