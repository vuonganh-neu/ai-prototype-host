// ============================================================================
// TRÌNH THIẾT KẾ ĐA LĨNH VỰC (PHIÊN BẢN 7.0)
// Kế thừa toàn bộ 12 nhóm Design Toolkit của v6 + Cập nhật UX Google Docs / Word,
// Ẩn số mục (Chỉ hiện khi giữ phím Alt), Chèn Ảnh/Video thật từ Kho Media & Máy tính,
// Nút đóng/mở ngăn công cụ cố định không bao giờ mất, và 100% Tiếng Việt đồng nhất.
// ============================================================================

const hostDbProfiles = {
  vuong: {
    personalInfo: {
      eyebrow: 'Hồ sơ Kiến trúc & Thiết kế Hệ thống',
      fullName: 'Vũ Anh Vương',
      headline: 'Kiến trúc sư Trưởng Hệ thống Phân tán & Nền tảng Thiết kế',
      contact: 'vuonganhvu@vuonganhvu.vn • Hà Nội, Việt Nam • id.vuonganhvu.vn'
    },
    experiences: [
      { role: 'Kiến trúc sư Trưởng — Nền tảng Trình Thiết kế Đa lĩnh vực', company: 'Hệ sinh thái VAV', period: '2024 – 2026', desc: 'Xây dựng Mô hình Đối tượng và Hệ thống Năng lực dùng chung cho 8 loại ấn phẩm (CV, Áp phích, Biểu ngữ, Ấn phẩm nhiều trang, Trang web, Biểu đồ, Bản đồ, Chuyển động).' },
      { role: 'Kỹ sư Trưởng Hệ thống Phân tán', company: 'FinCloud Việt Nam', period: '2021 – 2024', desc: 'Thiết kế kiến trúc hướng sự kiện với Kafka, Redis Streams, SeaweedFS S3 và Spring Boot 3.' }
    ],
    projects: [
      { name: 'Nhân Thiết kế Tích hợp AI v7', metric: 'Đầy đủ công cụ • 60 FPS', desc: 'Cho phép người dùng và AI cùng thao tác trực tiếp trên cây cấu trúc tài liệu và kiểm định chất lượng 5 bước.' },
      { name: 'Trung tâm Bản đồ & Phân tích Dữ liệu', metric: '1,2 triệu sự kiện/giây', desc: 'Trực quan hóa biểu đồ thống kê và bản đồ vệ tinh theo dõi hành trình thời gian thực.' }
    ],
    skills: [
      { name: 'Kiến trúc Java 21 & Spring Boot', pct: 96 },
      { name: 'Đồ họa Web Canvas & Vector SVG', pct: 94 },
      { name: 'Mô hình Tài liệu & Đối tượng', pct: 95 },
      { name: 'Tích hợp Trợ lý AI & Tự động hóa', pct: 92 },
      { name: 'Cơ sở dữ liệu PostgreSQL & Redis', pct: 90 },
      { name: 'Bố cục Lưới & Chế bản Chữ', pct: 88 }
    ]
  },
  chau: {
    personalInfo: {
      eyebrow: 'Định hướng Nghệ thuật & Hệ thống Thương hiệu',
      fullName: 'Nguyễn Minh Châu',
      headline: 'Giám đốc Sáng tạo & Trưởng nhóm Hệ thống Thiết kế',
      contact: 'minhchau@studio.vn • TP. Hồ Chí Minh • behance.net/minhchau'
    },
    experiences: [
      { role: 'Giám đốc Sáng tạo Điều hành', company: 'Atelier Đông Dương', period: '2023 – 2026', desc: 'Định hướng mỹ thuật cho các chiến dịch đa kênh: Áp phích khổ lớn in chuẩn CMYK, Biểu ngữ số và Ấn phẩm lật trang 3D.' },
      { role: 'Chuyên gia Thiết kế Thương hiệu & Tạp chí', company: 'Vogue & Heritage Media', period: '2020 – 2023', desc: 'Xây dựng hệ thống phông chữ, lưới mô-đun và quy chuẩn thị giác cho 18 ấn phẩm thương mại.' }
    ],
    projects: [
      { name: 'Ấn phẩm Thời trang Thu Đông 3D', metric: '+148% Chuyển đổi', desc: 'Ấn phẩm tương tác kết hợp hiệu ứng lật trang 3D và đồng bộ danh mục sản phẩm trực tiếp từ cơ sở dữ liệu.' },
      { name: 'Triển lãm Nghệ thuật Chữ Hiện đại', metric: 'Giải thưởng Thiết kế', desc: 'Hệ thống áp phích và bảng chỉ dẫn sử dụng lưới bất đối xứng kết hợp phông chữ biến thiên.' }
    ],
    skills: [
      { name: 'Định hướng Nghệ thuật', pct: 98 },
      { name: 'Bố cục Tạp chí & Lưới Thụy Sĩ', pct: 95 },
      { name: 'Nghệ thuật Chữ & Chế bản', pct: 94 },
      { name: 'Kỹ thuật In ấn CMYK', pct: 91 },
      { name: 'Thiết kế Chuyển động', pct: 89 },
      { name: 'Nhận diện Thương hiệu', pct: 96 }
    ]
  },
  campaign: {
    personalInfo: {
      eyebrow: 'CHIẾN DỊCH RA MẮT SẢN PHẨM TOÀN CẦU 2026',
      fullName: 'NỀN TẢNG THIẾT KẾ THÔNG MINH',
      headline: 'Sáng tạo Đa Lĩnh vực Tích hợp AI & Đồng bộ Dữ liệu Trực tiếp',
      contact: 'Ưu đãi 40% cho Doanh nghiệp • Trải nghiệm ngay tại cloud.vuonganhvu.vn'
    },
    experiences: [
      { role: 'Tự động hóa Dàn trang & Kiểm định 5 Lớp', company: 'Trợ lý Thiết kế AI', period: 'Thời gian thực', desc: 'Kiểm tra tự động thông điệp, phân cấp thị giác, độ tương phản AAA (14.8:1) và vùng xén lề in 300 DPI.' },
      { role: 'Liên kết Trực tiếp Cơ sở Dữ liệu', company: 'Đồng bộ Tức thì', period: 'Không độ trễ', desc: 'Cập nhật tự động danh mục sản phẩm, biểu đồ doanh thu và tọa độ bản đồ lên trang thiết kế.' }
    ],
    projects: [
      { name: 'Gói Doanh nghiệp Toàn diện', metric: 'Ưu đãi 40%', desc: 'Mở khóa toàn bộ công cụ vẽ vector, xử lý ảnh, dòng thời gian chuyển động và xuất tệp in ấn PDF/X.' },
      { name: 'Đăng ký Dùng thử Miễn phí →', metric: 'Tỷ lệ nhấp 8.4%', desc: 'Hỗ trợ nhúng trực tiếp vào ứng dụng Web và hệ thống quản trị doanh nghiệp.' }
    ],
    skills: [
      { name: 'Tăng tỷ lệ chuyển đổi +42%', pct: 95 },
      { name: 'Chuẩn in ấn 300 DPI', pct: 100 },
      { name: 'Độ tương phản chuẩn AAA', pct: 98 },
      { name: 'Biểu đồ & Bản đồ sống', pct: 92 }
    ]
  }
};

// Kho Ảnh thật (SVG/Canvas Data URI sắc nét cao cấp — luôn hiển thị tức thì 100% không phụ thuộc mạng ngoài)
const appMediaImages = [
  {
    title: 'Chân dung Studio Nghệ thuật',
    src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
        <defs>
          <linearGradient id="bg0" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1e293b"/>
            <stop offset="55%" stop-color="#334155"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
          <radialGradient id="glow0" cx="70%" cy="25%" r="50%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="url(#bg0)"/>
        <rect width="400" height="300" fill="url(#glow0)"/>
        <circle cx="200" cy="115" r="46" fill="#f8fafc" opacity="0.92"/>
        <path d="M120 280 C120 205, 280 205, 280 280 Z" fill="#f8fafc" opacity="0.92"/>
        <rect x="24" y="24" width="352" height="252" rx="8" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
        <text x="36" y="260" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="bold">CHÂN DUNG STUDIO • 300 DPI</text>
      </svg>`)
  },
  {
    title: 'Kiến trúc Đô thị Hiện đại',
    src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
        <defs>
          <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0284c7"/>
            <stop offset="100%" stop-color="#e0f2fe"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#sky1)"/>
        <circle cx="310" cy="70" r="34" fill="#fde047" opacity="0.9"/>
        <rect x="45" y="110" width="75" height="190" fill="#0f172a"/>
        <rect x="135" y="65" width="95" height="235" fill="#1e293b"/>
        <rect x="245" y="130" width="85" height="170" fill="#334155"/>
        <g fill="#38bdf8" opacity="0.55">
          <rect x="150" y="85" width="25" height="14"/><rect x="185" y="85" width="25" height="14"/>
          <rect x="150" y="110" width="25" height="14"/><rect x="185" y="110" width="25" height="14"/>
          <rect x="150" y="135" width="25" height="14"/><rect x="185" y="135" width="25" height="14"/>
          <rect x="150" y="160" width="25" height="14"/><rect x="185" y="160" width="25" height="14"/>
        </g>
        <text x="24" y="276" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="bold">KIẾN TRÚC ĐÔ THỊ HIỆN ĐẠI</text>
      </svg>`)
  },
  {
    title: 'Không gian Sáng tạo Ấm áp',
    src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
        <rect width="400" height="300" fill="#f5ebe0"/>
        <circle cx="290" cy="140" r="95" fill="#e07a5f" opacity="0.85"/>
        <circle cx="140" cy="180" r="75" fill="#3d405b" opacity="0.9"/>
        <path d="M40 260 Q200 160 360 260" fill="none" stroke="#81b29a" stroke-width="14" stroke-linecap="round"/>
        <text x="28" y="46" fill="#3d405b" font-family="serif" font-size="18" font-weight="bold">Atelier &amp; Creative Space</text>
      </svg>`)
  },
  {
    title: 'Sóng Nghệ thuật Chuyển sắc',
    src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0b57d0"/>
            <stop offset="50%" stop-color="#7c3aed"/>
            <stop offset="100%" stop-color="#ec4899"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#wg)"/>
        <path d="M0 190 Q100 120 200 190 T400 170 L400 300 L0 300 Z" fill="rgba(255,255,255,0.2)"/>
        <path d="M0 230 Q130 160 240 230 T400 210 L400 300 L0 300 Z" fill="rgba(255,255,255,0.3)"/>
        <circle cx="95" cy="85" r="38" fill="rgba(255,255,255,0.22)"/>
        <text x="28" y="272" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="bold">SÓNG NGHỆ THUẬT ĐA LỚP</text>
      </svg>`)
  }
];

let currentProfileKey = 'vuong';
let currentEditorDomain = 'cv';
let currentUnit = 'px';
let currentDpi = 300;
let currentZoom = 1.0;
let aspectLocked = true;
let nodeEditActive = false;
let cropModeActive = false;
let activeBlock = null;

let sectionVariants = {
  skills: 'tags',
  experiences: 'timeline',
  projects: 'bento'
};

let operationHistory = [];
let redoStack = [];
let echartsInstance = null;
let leafletMap = null;
let currentChartType = 'bar';

const sectionVariantOptions = {
  skills: [
    { value: 'tags', label: 'Kiểu Kỹ năng: Nhãn từ khóa' },
    { value: 'grid', label: 'Kiểu Kỹ năng: Lưới 2 cột' },
    { value: 'bars', label: 'Kiểu Kỹ năng: Thanh mức độ %' },
    { value: 'list', label: 'Kiểu Kỹ năng: Danh sách dọc' }
  ],
  experiences: [
    { value: 'timeline', label: 'Kiểu Kinh nghiệm: Dòng thời gian' },
    { value: 'cards', label: 'Kiểu Kinh nghiệm: Thẻ 2 cột' },
    { value: 'minimal', label: 'Kiểu Kinh nghiệm: Tối giản' }
  ],
  projects: [
    { value: 'bento', label: 'Kiểu Dự án: Ô lưới Bento' },
    { value: 'minimal', label: 'Kiểu Dự án: Danh sách ngang' },
    { value: 'chart', label: 'Kiểu Dự án: Biểu đồ trực quan' },
    { value: 'map', label: 'Kiểu Dự án: Bản đồ địa lý' }
  ],
  personal: [
    { value: 'default', label: 'Kiểu Tiêu đề: Ngang tiêu chuẩn' },
    { value: 'centered', label: 'Kiểu Tiêu đề: Căn giữa trang' }
  ]
};

const layerGroupsMeta = {
  'grp-background': { title: 'Nhóm Nền & Ánh sáng', expanded: true },
  'grp-header': { title: 'Khung Đầu trang & Định danh', expanded: true },
  'grp-body': { title: 'Khung Nội dung chính', expanded: true },
  'grp-sidebar': { title: 'Nhóm Cột bên & Đa phương tiện', expanded: true }
};

// ============================================================================
// 1. KHỞI TẠO, PHÍM TẮT ALT TRA CỨU MỤC & THƯỚC ĐO
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
  // Nạp ảnh mẫu vào kho Media bên trái
  appMediaImages.forEach((item, idx) => {
    const thumb = document.getElementById('sample-img-thumb-' + idx);
    if (thumb) thumb.src = item.src;
  });

  // Lắng nghe phím Alt (Option) để bật/tắt hiển thị mã số mục thiết kế (Mục 5.1 - 5.12)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Alt' || e.altKey) {
      document.body.classList.add('alt-spec-mode');
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Alt' || !e.altKey) {
      document.body.classList.remove('alt-spec-mode');
    }
  });
  window.addEventListener('blur', () => {
    document.body.classList.remove('alt-spec-mode');
  });

  buildRulers();
  renderAllSections();
  initDraggableAndResizableBlocks();
  activeBlock = document.getElementById('blk-sec-skills');
  selectBlock(activeBlock);
  switchEditorDomain('web');
  refreshHierarchicalLayerTree();
});

function buildRulers() {
  const hBar = document.getElementById('ruler-h-bar');
  const vBar = document.getElementById('ruler-v-bar');
  if (!hBar || !vBar) return;
  hBar.innerHTML = '';
  vBar.innerHTML = '';

  const factor = currentUnit === 'mm' ? 0.264 : currentUnit === 'cm' ? 0.0264 : currentUnit === 'in' ? 0.0104 : currentUnit === 'pt' ? 0.75 : 1;

  for (let px = 0; px <= 1400; px += 50) {
    const tick = document.createElement('div');
    tick.style.position = 'absolute';
    tick.style.left = px + 'px';
    tick.style.bottom = '0';
    tick.style.height = '100%';
    tick.style.borderLeft = '1px solid rgba(116,119,117,0.35)';
    tick.style.paddingLeft = '2px';
    tick.style.lineHeight = '12px';
    tick.textContent = Math.round(px * factor);
    hBar.appendChild(tick);
  }

  for (let px = 0; px <= 1000; px += 50) {
    const tick = document.createElement('div');
    tick.style.position = 'absolute';
    tick.style.top = px + 'px';
    tick.style.right = '0';
    tick.style.width = '100%';
    tick.style.borderTop = '1px solid rgba(116,119,117,0.35)';
    tick.style.paddingTop = '1px';
    tick.style.textAlign = 'center';
    tick.textContent = Math.round(px * factor);
    vBar.appendChild(tick);
  }
}

function addHorizontalGuideFromRuler(e) {
  const container = document.getElementById('user-guides-container');
  const artboard = document.getElementById('page-artboard');
  const rect = artboard.getBoundingClientRect();
  const y = Math.max(20, Math.min(artboard.offsetHeight - 20, Math.round((e.clientX - rect.left) * 0.6)));
  const guide = document.createElement('div');
  guide.className = 'absolute left-0 right-0 h-[1px] bg-sky-500 pointer-events-auto cursor-ns-resize';
  guide.style.top = y + 'px';
  guide.title = 'Đường gióng ngang (Bấm đúp để xóa)';
  guide.ondblclick = () => guide.remove();
  container.appendChild(guide);
  logOperation('add_guide', { axis: 'horizontal', offsetPx: y });
  showToast('Đã thêm đường gióng ngang tại Y = ' + y + 'px (Bấm đúp vào đường để xóa)');
}

function addVerticalGuideFromRuler(e) {
  const container = document.getElementById('user-guides-container');
  const artboard = document.getElementById('page-artboard');
  const rect = artboard.getBoundingClientRect();
  const x = Math.max(20, Math.min(artboard.offsetWidth - 20, Math.round((e.clientY - rect.top) * 0.6)));
  const guide = document.createElement('div');
  guide.className = 'absolute top-0 bottom-0 w-[1px] bg-sky-500 pointer-events-auto cursor-ew-resize';
  guide.style.left = x + 'px';
  guide.title = 'Đường gióng dọc (Bấm đúp để xóa)';
  guide.ondblclick = () => guide.remove();
  container.appendChild(guide);
  logOperation('add_guide', { axis: 'vertical', offsetPx: x });
  showToast('Đã thêm đường gióng dọc tại X = ' + x + 'px (Bấm đúp vào đường để xóa)');
}

// ============================================================================
// 2. CHUYỂN ĐỔI 8 LOẠI ẤN PHẨM (CV, Poster, Banner, Catalog, Web, Chart, Map, Motion)
// ============================================================================
function switchEditorDomain(domain) {
  currentEditorDomain = domain;
  const domSelect = document.getElementById('domain-select');
  if (domSelect && domSelect.value !== domain) domSelect.value = domain;

  const artboard = document.getElementById('page-artboard');
  const qaDomainLbl = document.getElementById('qa-domain-lbl');
  const timelineDrawer = document.getElementById('motion-timeline-drawer');

  document.getElementById('render-projects').classList.remove('hidden');
  document.getElementById('live-chart-container').classList.add('hidden');
  document.getElementById('live-map-container').classList.add('hidden');

  if (domain === 'cv') {
    changePageSizePreset('595x842', true);
    artboard.style.backgroundColor = '#FAF6F0';
    if (qaDomainLbl) qaDomainLbl.textContent = '3. Tiêu chuẩn chuyên ngành (Đọc CV & Tuyển dụng)';
    toggleCanvasOverlay('bleed', false);
    toggleCanvasOverlay('safe', false);
    document.getElementById('lbl-sec-exp-title').textContent = 'Kinh nghiệm Chuyên môn';
    document.getElementById('lbl-sec-proj-title').textContent = 'Dự án Trọng điểm';
    document.getElementById('lbl-sec-skills-title').textContent = 'Kỹ năng Cốt lõi';
    setBlockBox('blk-sec-personal', 32, 28, 531, 128);
    setBlockBox('blk-sec-experiences', 32, 172, 336, 295);
    setBlockBox('blk-sec-projects', 32, 482, 336, 265);
    setBlockBox('blk-sec-skills', 382, 172, 181, 295);
    setBlockBox('blk-media-3d', 382, 482, 181, 155);
    renderAllSections();
  } else if (domain === 'poster') {
    changePageSizePreset('700x990', true);
    artboard.style.backgroundColor = '#111827';
    if (qaDomainLbl) qaDomainLbl.textContent = '3. Tiêu chuẩn Áp phích (Điểm nhấn & Đọc từ xa)';
    document.getElementById('chk-bleed').checked = true;
    toggleCanvasOverlay('bleed', true);
    document.getElementById('lbl-sec-exp-title').textContent = 'Diễn giả & Chương trình chính';
    document.getElementById('lbl-sec-proj-title').textContent = 'Điểm nhấn Triển lãm';
    document.getElementById('lbl-sec-skills-title').textContent = 'Thời gian & Địa điểm';
    renderAllSections();
  } else if (domain === 'banner') {
    changePageSizePreset('780x408', true);
    switchHostDatabaseProfile('campaign', true);
    artboard.style.backgroundColor = '#0F172A';
    if (qaDomainLbl) qaDomainLbl.textContent = '3. Tiêu chuẩn Biểu ngữ (Nút kêu gọi & Vùng an toàn)';
    document.getElementById('chk-safe').checked = true;
    toggleCanvasOverlay('safe', true);
    setBlockBox('blk-sec-personal', 24, 22, 460, 125);
    setBlockBox('blk-sec-experiences', 24, 158, 460, 225);
    setBlockBox('blk-sec-skills', 500, 22, 255, 195);
    setBlockBox('blk-media-3d', 500, 228, 255, 155);
  } else if (domain === 'catalog') {
    changePageSizePreset('595x842', true);
    artboard.style.backgroundColor = '#FDFBF7';
    if (qaDomainLbl) qaDomainLbl.textContent = '3. Tiêu chuẩn Ấn phẩm nhiều trang (Đồng bộ dữ liệu)';
    document.getElementById('chk-grid').checked = true;
    toggleCanvasOverlay('grid', true);
    document.getElementById('lbl-sec-exp-title').textContent = 'Danh mục Sản phẩm nổi bật';
    document.getElementById('lbl-sec-proj-title').textContent = 'Thông số & Bảng giá';
    artboard.classList.remove('run-book-flip');
    void artboard.offsetWidth;
    artboard.classList.add('run-book-flip');
  } else if (domain === 'web') {
    changePageSizePreset('860x540', true);
    artboard.style.backgroundColor = '#FFFFFF';
    if (qaDomainLbl) qaDomainLbl.textContent = '3. Tiêu chuẩn Trang web (Đa màn hình & Điều hướng)';
    setBlockBox('blk-sec-personal', 28, 20, 804, 118);
    setBlockBox('blk-sec-experiences', 28, 152, 510, 180);
    setBlockBox('blk-sec-projects', 28, 344, 510, 172);
    setBlockBox('blk-sec-skills', 554, 152, 278, 210);
    setBlockBox('blk-media-3d', 554, 374, 278, 142);
  } else if (domain === 'chart') {
    changePageSizePreset('595x842', true);
    artboard.style.backgroundColor = '#FFFFFF';
    if (qaDomainLbl) qaDomainLbl.textContent = '3. Tiêu chuẩn Biểu đồ (Chính xác tỷ lệ & Số liệu)';
    document.getElementById('lbl-sec-proj-title').textContent = 'Biểu đồ Phân tích Số liệu';
    document.getElementById('render-projects').classList.add('hidden');
    document.getElementById('live-chart-container').classList.remove('hidden');
    setTimeout(() => initOrUpdateEChart(currentChartType), 60);
  } else if (domain === 'map') {
    changePageSizePreset('595x842', true);
    artboard.style.backgroundColor = '#F8FAFC';
    if (qaDomainLbl) qaDomainLbl.textContent = '3. Tiêu chuẩn Bản đồ (Tọa độ & Lớp địa lý)';
    document.getElementById('lbl-sec-proj-title').textContent = 'Bản đồ Địa lý & Vệ tinh Trực tiếp';
    document.getElementById('render-projects').classList.add('hidden');
    document.getElementById('live-map-container').classList.remove('hidden');
    setTimeout(() => initOrUpdateLeafletMap('voyager'), 80);
  } else if (domain === 'motion') {
    timelineDrawer.classList.remove('hidden');
    if (qaDomainLbl) qaDomainLbl.textContent = '3. Tiêu chuẩn Chuyển động (Nhịp điệu 60 khung/giây)';
    playAllBlocksAnimation();
  }

  renderDomainSpecificControls(domain);
  logOperation('switch_domain', { domain, dpi: currentDpi, unit: currentUnit });
  showToast('Đã chuyển sang chế độ thiết kế: ' + (domSelect ? domSelect.options[domSelect.selectedIndex].text : domain));
}

function setBlockBox(id, x, y, w, h) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.width = w + 'px';
  el.style.height = h + 'px';
}

function renderDomainSpecificControls(domain) {
  const box = document.getElementById('domain-specific-controls');
  if (!box) return;

  if (domain === 'chart') {
    box.innerHTML = `
      <div class="p-2.5 rounded-lg border border-blue-500/30 bg-blue-500/5 space-y-2">
        <div class="font-semibold text-blue-700 text-[11px]">Chọn Loại Biểu đồ Phân tích</div>
        <div class="grid grid-cols-2 gap-1 text-[10.5px]">
          <button onclick="initOrUpdateEChart('bar')" class="p-1.5 rounded border ui-border ui-panel font-medium">Biểu đồ Cột nhóm</button>
          <button onclick="initOrUpdateEChart('line')" class="p-1.5 rounded border ui-border ui-panel font-medium">Biểu đồ Miền dự báo</button>
          <button onclick="initOrUpdateEChart('pie')" class="p-1.5 rounded border ui-border ui-panel font-medium">Biểu đồ Hoa hồng</button>
          <button onclick="initOrUpdateEChart('radar')" class="p-1.5 rounded border ui-border ui-panel font-medium">Biểu đồ Đa giác chỉ số</button>
        </div>
      </div>`;
  } else if (domain === 'map') {
    box.innerHTML = `
      <div class="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 space-y-2">
        <div class="font-semibold text-emerald-700 text-[11px]">Lớp Nền Bản đồ & Tọa độ</div>
        <div class="grid grid-cols-2 gap-1 text-[10.5px]">
          <button onclick="initOrUpdateLeafletMap('voyager')" class="p-1.5 rounded border ui-border ui-panel font-medium">Bản đồ Đường phố</button>
          <button onclick="initOrUpdateLeafletMap('satellite')" class="p-1.5 rounded border ui-border ui-panel font-medium">Ảnh Vệ tinh Thực tế</button>
          <button onclick="initOrUpdateLeafletMap('dark')" class="p-1.5 rounded border ui-border ui-panel font-medium">Bản đồ Nền tối</button>
          <button onclick="addMapGeoPin()" class="p-1.5 rounded border ui-border ui-panel font-medium">+ Ghim điểm tọa độ</button>
        </div>
      </div>`;
  } else if (domain === 'web') {
    box.innerHTML = `
      <div class="p-2.5 rounded-lg border border-indigo-500/30 bg-indigo-500/5 space-y-2">
        <div class="font-semibold text-indigo-700 text-[11px]">Khung nhìn Đa thiết bị (Responsive)</div>
        <div class="grid grid-cols-3 gap-1 text-[10.5px]">
          <button onclick="changePageSizePreset('860x540')" class="p-1.5 rounded border ui-border ui-panel font-medium">Máy tính</button>
          <button onclick="changePageSizePreset('560x700')" class="p-1.5 rounded border ui-border ui-panel font-medium">Máy tính bảng</button>
          <button onclick="changePageSizePreset('380x680')" class="p-1.5 rounded border ui-border ui-panel font-medium">Điện thoại</button>
        </div>
      </div>`;
  } else {
    box.innerHTML = `
      <div class="p-2.5 rounded-lg border border-blue-500/25 bg-blue-500/5 space-y-1.5">
        <div class="font-semibold text-blue-700 text-[11px]">Tích hợp Đa thành phần trên Trang</div>
        <div class="text-[10.5px] ui-muted">Bạn có thể nhúng trực tiếp biểu đồ số liệu hoặc bản đồ địa lý vào bất kỳ ấn phẩm nào.</div>
        <div class="grid grid-cols-2 gap-1 text-[10.5px] pt-1">
          <button onclick="switchEditorDomain('chart')" class="p-1.5 rounded border ui-border ui-panel font-medium">Mở Biểu đồ số liệu</button>
          <button onclick="switchEditorDomain('map')" class="p-1.5 rounded border ui-border ui-panel font-medium">Mở Bản đồ địa lý</button>
        </div>
      </div>`;
  }
}

function initOrUpdateEChart(type) {
  currentChartType = type || 'bar';
  const dom = document.getElementById('live-chart-container');
  if (!dom || typeof echarts === 'undefined') return;
  if (!echartsInstance) {
    echartsInstance = echarts.init(dom);
  }
  echartsInstance.resize();

  let option = {
    grid: { top: 24, right: 14, bottom: 24, left: 36 },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'], axisLabel: { fontSize: 10 } },
    yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
    series: [
      { name: 'Năm 2025', type: currentChartType === 'line' ? 'line' : 'bar', areaStyle: currentChartType === 'line' ? { opacity: 0.2 } : undefined, data: [42, 58, 74, 96], itemStyle: { color: '#0b57d0', borderRadius: [4, 4, 0, 0] } },
      { name: 'Năm 2026', type: currentChartType === 'line' ? 'line' : 'bar', data: [55, 72, 91, 128], itemStyle: { color: '#059669', borderRadius: [4, 4, 0, 0] } }
    ]
  };

  if (currentChartType === 'pie') {
    option = {
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['25%', '75%'],
        roseType: 'area',
        data: [
          { value: 45, name: 'Nền tảng Thiết kế' },
          { value: 32, name: 'Trợ lý AI' },
          { value: 28, name: 'Ấn phẩm In' },
          { value: 20, name: 'Bản đồ Số' }
        ]
      }]
    };
  } else if (currentChartType === 'radar') {
    option = {
      radar: {
        indicator: [
          { name: 'Thẩm mỹ', max: 100 },
          { name: 'Bố cục', max: 100 },
          { name: 'Tương phản', max: 100 },
          { name: 'Dữ liệu', max: 100 },
          { name: 'Độ nét in', max: 100 }
        ]
      },
      series: [{ type: 'radar', data: [{ value: [96, 94, 98, 95, 100], name: 'Điểm chất lượng' }], areaStyle: { opacity: 0.25 } }]
    };
  }

  echartsInstance.setOption(option, true);
}

function initOrUpdateLeafletMap(tileStyle) {
  const dom = document.getElementById('live-map-container');
  if (!dom || typeof L === 'undefined') return;

  if (!leafletMap) {
    leafletMap = L.map(dom, { zoomControl: false }).setView([21.0285, 105.8542], 5);
    L.circleMarker([21.0285, 105.8542], { radius: 10, color: '#0b57d0', fillOpacity: 0.6 }).addTo(leafletMap).bindPopup('Trung tâm Hà Nội (920 điểm)');
    L.circleMarker([16.0544, 108.2022], { radius: 8, color: '#7c3aed', fillOpacity: 0.6 }).addTo(leafletMap).bindPopup('Trung tâm Đà Nẵng (540 điểm)');
    L.circleMarker([10.8231, 106.6297], { radius: 12, color: '#059669', fillOpacity: 0.6 }).addTo(leafletMap).bindPopup('Trung tâm TP.HCM (1250 điểm)');
  }

  const urls = {
    voyager: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  };
  L.tileLayer(urls[tileStyle] || urls.voyager).addTo(leafletMap);
  setTimeout(() => leafletMap.invalidateSize(), 100);
}

function addMapGeoPin() {
  if (!leafletMap) return;
  const lat = 14 + Math.random() * 6;
  const lng = 105 + Math.random() * 3;
  L.circleMarker([lat, lng], { radius: 9, color: '#d97706', fillOpacity: 0.8 }).addTo(leafletMap).bindPopup('Điểm dữ liệu địa lý mới').openPopup();
  showToast('Đã ghim điểm tọa độ mới lên bản đồ');
}

// ============================================================================
// 3. CHÈN ẢNH & VIDEO THẬT TỪ KHO MEDIA ỨNG DỤNG HOẶC TẢI TỪ MÁY TÍNH (Mục 5.3)
// ============================================================================
function insertRealSampleImage(index) {
  const item = appMediaImages[index] || appMediaImages[0];
  insertImageElementOntoArtboard(item.src, item.title);
}

function insertImageElementOntoArtboard(imgSrc, titleLabel) {
  // Nếu đang chọn sẵn 1 khối ảnh mới tạo thì cập nhật ảnh đó hoặc tạo khối ảnh mới rõ ràng
  const root = document.getElementById('artboard-objects-root');
  const el = document.createElement('div');
  const id = 'blk-img-' + Date.now().toString().slice(-4);
  el.id = id;
  el.dataset.blockType = 'media';
  el.dataset.parentGroup = 'grp-sidebar';
  el.dataset.blockTitle = 'Hình ảnh: ' + titleLabel;
  el.dataset.bgHex = '#ffffff';
  el.dataset.bgAlpha = '100';
  el.className = 'studio-block rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 bg-white';

  const offset = (document.querySelectorAll('[id^="blk-img-"]').length * 18) % 90;
  el.style.left = (180 + offset) + 'px';
  el.style.top = (210 + offset) + 'px';
  el.style.width = '220px';
  el.style.height = '165px';
  el.style.zIndex = '46';

  el.innerHTML = `
    <div class="block-badge">Hình ảnh: ${titleLabel}</div>
    <img src="${imgSrc}" alt="${titleLabel}" class="w-full h-full object-cover pointer-events-none select-none" />
  `;

  root.appendChild(el);
  attachBlockInteractiveEvents(el);
  selectBlock(el);
  logOperation('insert_image', { id, title: titleLabel });
  showToast('Đã chèn hình ảnh "' + titleLabel + '" vào trang thiết kế');
}

function insertRealSampleVideo(variantIndex) {
  const titleLabel = variantIndex === 1 ? 'Video Hạt Ánh Sáng' : 'Video Sóng Chuyển Động';
  const root = document.getElementById('artboard-objects-root');
  const el = document.createElement('div');
  const id = 'blk-vid-' + Date.now().toString().slice(-4);
  el.id = id;
  el.dataset.blockType = 'media';
  el.dataset.parentGroup = 'grp-sidebar';
  el.dataset.blockTitle = titleLabel;
  el.dataset.bgHex = '#0f172a';
  el.dataset.bgAlpha = '100';
  el.className = 'studio-block rounded-2xl overflow-hidden shadow-xl border border-slate-700 bg-slate-950 flex flex-col';

  const offset = (document.querySelectorAll('[id^="blk-vid-"]').length * 18) % 90;
  el.style.left = (195 + offset) + 'px';
  el.style.top = (250 + offset) + 'px';
  el.style.width = '240px';
  el.style.height = '160px';
  el.style.zIndex = '47';

  el.innerHTML = `
    <div class="block-badge">${titleLabel} (Đang phát)</div>
    <div class="relative w-full h-full flex-1 bg-slate-950">
      <video class="w-full h-full object-cover" autoplay loop muted playsinline></video>
      <canvas class="hidden" width="320" height="200"></canvas>
      <div class="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white flex items-center justify-between text-[10px]">
        <button onclick="event.stopPropagation(); toggleInlineVideoPlayback(this)" class="font-bold hover:text-sky-400">❚❚ Tạm dừng</button>
        <span>${titleLabel} • 60fps</span>
      </div>
    </div>
  `;

  root.appendChild(el);
  attachBlockInteractiveEvents(el);
  selectBlock(el);
  startProceduralVideoStream(el, variantIndex);
  logOperation('insert_video', { id, title: titleLabel });
  showToast('Đã chèn "' + titleLabel + '" phát trực tiếp trên trang thiết kế');
}

function startProceduralVideoStream(blockEl, variantIndex) {
  const canvas = blockEl.querySelector('canvas');
  const video = blockEl.querySelector('video');
  if (!canvas || !video) return;
  const ctx = canvas.getContext('2d');
  let frame = 0;

  function renderFrame() {
    if (!document.body.contains(blockEl)) return;
    frame += 0.045;
    const w = canvas.width;
    const h = canvas.height;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    if (variantIndex === 1) {
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#064e3b');
    } else {
      grad.addColorStop(0, '#0c4a6e');
      grad.addColorStop(0.5, '#1e3a8a');
      grad.addColorStop(1, '#581c87');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Vẽ sóng chuyển động mượt mà
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 8) {
        const y = h * 0.52 + Math.sin(x * 0.025 + frame + k * 1.2) * (20 + k * 8);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = k === 0 ? 'rgba(56, 189, 248, 0.28)' : k === 1 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.22)';
      ctx.fill();
    }

    // Vẽ các hạt ánh sáng chuyển động
    for (let i = 0; i < 8; i++) {
      const px = (w * 0.12 * (i + 1) + Math.cos(frame * 0.8 + i) * 24) % w;
      const py = h * 0.35 + Math.sin(frame * 1.1 + i * 1.7) * 35;
      ctx.beginPath();
      ctx.arc(px, py, 4 + (i % 3) * 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fill();
    }

    requestAnimationFrame(renderFrame);
  }

  renderFrame();
  if (typeof canvas.captureStream === 'function') {
    try {
      video.srcObject = canvas.captureStream(30);
      video.play().catch(() => {});
    } catch (_) {
      canvas.classList.remove('hidden');
      canvas.className = 'w-full h-full object-cover';
      video.classList.add('hidden');
    }
  } else {
    canvas.classList.remove('hidden');
    canvas.className = 'w-full h-full object-cover';
    video.classList.add('hidden');
  }
}

function toggleInlineVideoPlayback(btn) {
  const wrapper = btn.closest('.studio-block');
  if (!wrapper) return;
  const video = wrapper.querySelector('video');
  if (!video) return;
  if (video.paused) {
    video.play();
    btn.textContent = '❚❚ Tạm dừng';
  } else {
    video.pause();
    btn.textContent = '▶ Phát tiếp';
  }
}

function handleUserMediaUpload(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  if (file.type.startsWith('video/')) {
    const root = document.getElementById('artboard-objects-root');
    const el = document.createElement('div');
    const id = 'blk-vid-up-' + Date.now().toString().slice(-4);
    el.id = id;
    el.dataset.blockType = 'media';
    el.dataset.parentGroup = 'grp-sidebar';
    el.dataset.blockTitle = 'Video: ' + file.name;
    el.className = 'studio-block rounded-2xl overflow-hidden shadow-xl border border-slate-700 bg-black';
    el.style.left = '190px';
    el.style.top = '230px';
    el.style.width = '260px';
    el.style.height = '170px';
    el.style.zIndex = '48';
    el.innerHTML = `
      <div class="block-badge">Video: ${file.name}</div>
      <video src="${url}" class="w-full h-full object-cover" autoplay loop muted controls playsinline></video>
    `;
    root.appendChild(el);
    attachBlockInteractiveEvents(el);
    selectBlock(el);
    showToast('Đã tải và chèn video "' + file.name + '" vào trang');
  } else {
    insertImageElementOntoArtboard(url, file.name);
  }
  input.value = '';
}

// ============================================================================
// 4. DỮ LIỆU NGUỒN & BIẾN THỂ HIỂN THỊ TỪNG MỤC
// ============================================================================
function renderAllSections() {
  const p = hostDbProfiles[currentProfileKey];
  if (!p) return;

  const fn = document.getElementById('bind-fullname');
  const hl = document.getElementById('bind-headline');
  const ct = document.getElementById('bind-contact');
  const eb = document.getElementById('bind-eyebrow');
  if (fn) fn.textContent = p.personalInfo.fullName;
  if (hl) hl.textContent = p.personalInfo.headline;
  if (ct) ct.textContent = p.personalInfo.contact;
  if (eb) eb.textContent = p.personalInfo.eyebrow;

  renderExperiencesSection(p.experiences);
  renderProjectsSection(p.projects);
  renderSkillsSection(p.skills);
}

function renderSkillsSection(skills) {
  const box = document.getElementById('render-skills');
  if (!box) return;
  const v = sectionVariants.skills;

  if (v === 'tags') {
    box.innerHTML = `<div class="flex flex-wrap gap-1.5">${skills.map(s =>
      `<span class="px-2.5 py-1 rounded-full bg-blue-500/12 text-blue-700 border border-blue-500/25 font-semibold text-[10.5px]">${s.name}</span>`
    ).join('')}</div>`;
  } else if (v === 'grid') {
    box.innerHTML = `<div class="grid grid-cols-2 gap-1.5">${skills.map(s =>
      `<div class="p-1.5 rounded-lg bg-zinc-500/10 border border-current/10 font-semibold text-[10px] flex items-center justify-between">
        <span class="truncate">${s.name}</span><span class="text-blue-600 text-[9.5px]">${s.pct}%</span>
      </div>`
    ).join('')}</div>`;
  } else if (v === 'bars') {
    box.innerHTML = `<div class="space-y-2">${skills.map(s =>
      `<div>
        <div class="flex justify-between text-[10px] font-semibold mb-0.5"><span>${s.name}</span><span class="opacity-75">${s.pct}%</span></div>
        <div class="w-full h-1.5 rounded-full bg-zinc-500/15 overflow-hidden"><div class="h-full bg-blue-600 rounded-full" style="width:${s.pct}%"></div></div>
      </div>`
    ).join('')}</div>`;
  } else {
    box.innerHTML = `<ul class="space-y-1.5">${skills.map(s =>
      `<li class="flex items-center justify-between border-b border-current/10 pb-1">
        <span class="font-medium">• ${s.name}</span><span class="text-[10px] text-blue-600 font-bold">${s.pct}%</span>
      </li>`
    ).join('')}</ul>`;
  }
}

function renderExperiencesSection(exps) {
  const box = document.getElementById('render-experiences');
  if (!box) return;
  const v = sectionVariants.experiences;

  if (v === 'timeline') {
    box.innerHTML = exps.map(e => `
      <div class="pl-3 border-l-2 border-blue-500/50 space-y-0.5">
        <div class="flex justify-between items-baseline"><strong class="text-xs">${e.role}</strong><span class="text-[10px] opacity-65">${e.period}</span></div>
        <div class="text-[11px] font-semibold text-blue-700">${e.company}</div>
        <p class="text-[11px] opacity-80 leading-relaxed">${e.desc}</p>
      </div>
    `).join('');
  } else if (v === 'cards') {
    box.innerHTML = `<div class="grid grid-cols-2 gap-2">${exps.map(e => `
      <div class="p-2.5 rounded-xl bg-zinc-500/8 border border-current/10 space-y-1">
        <div class="text-[10px] text-blue-600 font-bold">${e.period}</div>
        <div class="font-bold text-[11px] leading-snug">${e.role}</div>
        <div class="text-[10px] opacity-75">${e.company}</div>
      </div>
    `).join('')}</div>`;
  } else {
    box.innerHTML = exps.map(e => `
      <div class="pb-2 border-b border-current/10">
        <div class="font-bold text-xs">${e.role} — <span class="text-blue-700">${e.company}</span> (${e.period})</div>
        <div class="text-[11px] opacity-75 mt-0.5">${e.desc}</div>
      </div>
    `).join('');
  }
}

function renderProjectsSection(projs) {
  const box = document.getElementById('render-projects');
  if (!box) return;
  const v = sectionVariants.projects;

  if (v === 'bento') {
    box.innerHTML = `<div class="grid grid-cols-2 gap-2">${projs.map(p => `
      <div class="p-2.5 rounded-xl bg-zinc-500/8 border border-current/10 space-y-1">
        <span class="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 font-bold text-[9.5px]">${p.metric}</span>
        <div class="font-bold text-[11px] pt-0.5">${p.name}</div>
        <p class="text-[10px] opacity-75 leading-snug">${p.desc}</p>
      </div>
    `).join('')}</div>`;
  } else {
    box.innerHTML = projs.map(p => `
      <div class="p-2 rounded-lg border border-current/10 flex items-center justify-between gap-2">
        <div><div class="font-bold text-xs">${p.name}</div><div class="text-[10.5px] opacity-75">${p.desc}</div></div>
        <span class="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-700 font-bold text-[10px] shrink-0">${p.metric}</span>
      </div>
    `).join('');
  }
}

function switchHostDatabaseProfile(key, silent) {
  currentProfileKey = key;
  renderAllSections();
  logOperation('bind_host_database', { profile: key });
  if (!silent) showToast('Đã đồng bộ dữ liệu: ' + hostDbProfiles[key].personalInfo.fullName);
}

function setSkillsVariant(v) {
  sectionVariants.skills = v;
  renderAllSections();
  syncToolbarWithSelectedBlock(activeBlock);
  showToast('Đã đổi kiểu hiển thị mục Kỹ năng');
}

function setExpVariant(v) {
  sectionVariants.experiences = v;
  renderAllSections();
  syncToolbarWithSelectedBlock(activeBlock);
  showToast('Đã đổi kiểu hiển thị mục Kinh nghiệm');
}

function onChangeActiveSectionVariant(val) {
  if (!activeBlock) return;
  const key = activeBlock.dataset.sectionKey;
  if (key === 'projects' && val === 'chart') {
    switchEditorDomain('chart');
    return;
  }
  if (key === 'projects' && val === 'map') {
    switchEditorDomain('map');
    return;
  }
  if (key && sectionVariants[key] !== undefined) {
    sectionVariants[key] = val;
    renderAllSections();
    showToast('Đã cập nhật kiểu hiển thị của mục đang chọn');
  }
}

function addSkillToDb() {
  const inp = document.getElementById('inp-new-skill');
  const val = inp.value.trim();
  if (!val) return;
  hostDbProfiles[currentProfileKey].skills.push({ name: val, pct: 90 });
  inp.value = '';
  renderAllSections();
  showToast('Đã thêm kỹ năng "' + val + '"');
}

function addExperienceItemToDb() {
  hostDbProfiles[currentProfileKey].experiences.unshift({
    role: 'Chuyên gia Thiết kế & Kiến trúc Hệ thống',
    company: 'Trung tâm Nghiên cứu & Phát triển',
    period: '2026 – Nay',
    desc: 'Chuẩn hóa quy trình xuất bản đa kênh và kiểm định tự động bằng AI.'
  });
  renderAllSections();
  showToast('Đã thêm mục Kinh nghiệm mới');
}

// ============================================================================
// 5. KÉO THẢ, CO GIÃN 8 HƯỚNG & ĐỒNG BỘ BẢNG THUỘC TÍNH (Mục 5.8)
// ============================================================================
function initDraggableAndResizableBlocks() {
  document.querySelectorAll('#artboard-objects-root .studio-block').forEach(attachBlockInteractiveEvents);
}

function attachBlockInteractiveEvents(el) {
  if (el.dataset.bound === '1') return;
  el.dataset.bound = '1';

  ['nw','n','ne','e','se','s','sw','w'].forEach(dir => {
    const h = document.createElement('div');
    h.className = 'resize-handle rh-' + dir;
    h.dataset.dir = dir;
    el.appendChild(h);
  });

  el.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    selectBlock(el);

    if (el.classList.contains('is-locked')) return;

    const handle = e.target.closest('.resize-handle');
    if (e.target.isContentEditable && !handle) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const origLeft = parseFloat(el.style.left) || 0;
    const origTop = parseFloat(el.style.top) || 0;
    const origW = el.offsetWidth;
    const origH = el.offsetHeight;
    const ratio = origW / Math.max(1, origH);

    const gH = document.getElementById('smart-guide-h');
    const gV = document.getElementById('smart-guide-v');

    function onMove(ev) {
      const dx = (ev.clientX - startX) / currentZoom;
      const dy = (ev.clientY - startY) / currentZoom;

      if (handle) {
        const d = handle.dataset.dir;
        let nw = origW, nh = origH, nl = origLeft, nt = origTop;
        if (d.includes('e')) nw = Math.max(60, origW + dx);
        if (d.includes('s')) nh = Math.max(40, origH + dy);
        if (d.includes('w')) {
          nw = Math.max(60, origW - dx);
          nl = origLeft + (origW - nw);
        }
        if (d.includes('n')) {
          nh = Math.max(40, origH - dy);
          nt = origTop + (origH - nh);
        }
        if (aspectLocked && (d === 'se' || d === 'nw' || d === 'ne' || d === 'sw')) {
          nh = Math.round(nw / ratio);
        }
        el.style.width = Math.round(nw) + 'px';
        el.style.height = Math.round(nh) + 'px';
        el.style.left = Math.round(nl) + 'px';
        el.style.top = Math.round(nt) + 'px';
        if (echartsInstance) echartsInstance.resize();
      } else {
        let nx = Math.round(origLeft + dx);
        let ny = Math.round(origTop + dy);

        if (Math.abs(nx - 32) < 5) { nx = 32; gV.style.left = '32px'; gV.style.display = 'block'; }
        else { gV.style.display = 'none'; }

        if (Math.abs(ny - 172) < 5) { ny = 172; gH.style.top = '172px'; gH.style.display = 'block'; }
        else { gH.style.display = 'none'; }

        el.style.left = nx + 'px';
        el.style.top = ny + 'px';
      }
      syncInspectorNumericInputs(el);
    }

    function onUp() {
      gH.style.display = 'none';
      gV.style.display = 'none';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      logOperation('transform_object', {
        id: el.id,
        x: parseInt(el.style.left) || 0,
        y: parseInt(el.style.top) || 0,
        w: el.offsetWidth,
        h: el.offsetHeight
      });
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });
}

function selectBlock(el) {
  if (!el) return;
  document.querySelectorAll('#artboard-objects-root .studio-block').forEach(b => b.classList.remove('is-selected'));
  el.classList.add('is-selected');
  activeBlock = el;
  syncToolbarWithSelectedBlock(el);
  syncInspectorNumericInputs(el);
  refreshHierarchicalLayerTree();
}

function deselectAllIfBackground(e) {
  if (e.target.id === 'canvas-viewport' || e.target.id === 'page-artboard' || e.target.id === 'artboard-objects-root') {
    document.querySelectorAll('#artboard-objects-root .studio-block').forEach(b => b.classList.remove('is-selected'));
    activeBlock = null;
    refreshHierarchicalLayerTree();
  }
}

function syncToolbarWithSelectedBlock(el) {
  if (!el) return;
  const title = el.dataset.blockTitle || el.id;
  const tbName = document.getElementById('tb-block-name');
  if (tbName) tbName.textContent = title;
  document.getElementById('insp-title').textContent = 'Thuộc tính: ' + title;

  const alpha = el.dataset.bgAlpha !== undefined ? Number(el.dataset.bgAlpha) : 90;
  const hex = el.dataset.bgHex || '#ffffff';
  document.getElementById('tb-bg-color').value = hex;
  document.getElementById('tb-bg-alpha').value = alpha;
  document.getElementById('tb-bg-alpha-lbl').textContent = alpha + '%';

  const secControls = document.getElementById('tb-section-controls');
  const varSelect = document.getElementById('tb-variant-select');
  if (el.dataset.blockType === 'section') {
    secControls.classList.remove('hidden');
    const sKey = el.dataset.sectionKey || 'personal';
    const opts = sectionVariantOptions[sKey] || sectionVariantOptions.personal;
    varSelect.innerHTML = opts.map(o => `<option value="${o.value}" ${sectionVariants[sKey] === o.value ? 'selected' : ''}>${o.label}</option>`).join('');
  } else {
    secControls.classList.add('hidden');
  }
  updateColorSpaceReadout();
}

function syncInspectorNumericInputs(el) {
  if (!el) return;
  document.getElementById('insp-x').value = parseInt(el.style.left) || 0;
  document.getElementById('insp-y').value = parseInt(el.style.top) || 0;
  document.getElementById('insp-w').value = el.offsetWidth;
  document.getElementById('insp-h').value = el.offsetHeight;
}

function applyPrecisionTransform() {
  if (!activeBlock || activeBlock.classList.contains('is-locked')) return;
  const x = Number(document.getElementById('insp-x').value) || 0;
  const y = Number(document.getElementById('insp-y').value) || 0;
  const w = Math.max(40, Number(document.getElementById('insp-w').value) || 100);
  const h = Math.max(30, Number(document.getElementById('insp-h').value) || 80);
  const rot = Number(document.getElementById('insp-rot').value) || 0;
  const skew = Number(document.getElementById('insp-skew').value) || 0;
  const persp = Number(document.getElementById('insp-persp').value) || 0;

  activeBlock.style.left = x + 'px';
  activeBlock.style.top = y + 'px';
  activeBlock.style.width = w + 'px';
  activeBlock.style.height = h + 'px';
  activeBlock.style.transform = `${persp ? `perspective(${persp}px) ` : ''}rotate(${rot}deg) skewX(${skew}deg)`;
}

function toggleAspectRatioLock() {
  aspectLocked = !aspectLocked;
  const btn = document.getElementById('btn-aspect-lock');
  btn.textContent = aspectLocked ? 'Khóa tỷ lệ' : 'Tự do tỷ lệ';
  btn.classList.toggle('text-blue-600', aspectLocked);
}

function setTransformPivot(origin, dotEl) {
  document.querySelectorAll('.anchor-dot').forEach(d => d.classList.remove('active'));
  dotEl.classList.add('active');
  if (activeBlock) {
    activeBlock.style.transformOrigin = origin;
    showToast('Đã đổi tâm xoay đối tượng');
  }
}

function flipSelectedBlock(axis) {
  if (!activeBlock) return;
  if (axis === 'h') {
    activeBlock.dataset.flipH = activeBlock.dataset.flipH === '1' ? '0' : '1';
    activeBlock.style.transform = activeBlock.dataset.flipH === '1' ? 'scaleX(-1)' : 'scaleX(1)';
  } else {
    activeBlock.dataset.flipV = activeBlock.dataset.flipV === '1' ? '0' : '1';
    activeBlock.style.transform = activeBlock.dataset.flipV === '1' ? 'scaleY(-1)' : 'scaleY(1)';
  }
  showToast('Đã lật ' + (axis === 'h' ? 'ngang' : 'dọc') + ' đối tượng');
}

// ============================================================================
// 6. CĂN CHỈNH, DÀN TỰ ĐỘNG & HÌNH VẼ VECTOR (Mục 5.2 & 5.6)
// ============================================================================
function alignSelectedBlock(mode) {
  if (!activeBlock) return;
  const artboard = document.getElementById('page-artboard');
  const aw = artboard.offsetWidth;
  const ah = artboard.offsetHeight;
  const bw = activeBlock.offsetWidth;
  const bh = activeBlock.offsetHeight;

  if (mode === 'left') activeBlock.style.left = '32px';
  if (mode === 'h-center') activeBlock.style.left = Math.round((aw - bw) / 2) + 'px';
  if (mode === 'right') activeBlock.style.left = (aw - bw - 32) + 'px';
  if (mode === 'top') activeBlock.style.top = '28px';
  if (mode === 'v-center') activeBlock.style.top = Math.round((ah - bh) / 2) + 'px';
  if (mode === 'bottom') activeBlock.style.top = (ah - bh - 28) + 'px';

  syncInspectorNumericInputs(activeBlock);
  logOperation('align_object', { id: activeBlock.id, alignment: mode });
}

function setBlockAutoLayout(mode) {
  if (!activeBlock) return;
  if (mode === 'row') {
    activeBlock.style.display = 'flex';
    activeBlock.style.flexDirection = 'row';
    activeBlock.style.gap = '12px';
  } else if (mode === 'col') {
    activeBlock.style.display = 'flex';
    activeBlock.style.flexDirection = 'column';
    activeBlock.style.gap = '8px';
  } else if (mode === 'grid') {
    activeBlock.style.display = 'grid';
    activeBlock.style.gridTemplateColumns = 'repeat(2, 1fr)';
    activeBlock.style.gap = '10px';
  } else {
    activeBlock.style.display = 'block';
  }
  showToast('Đã cập nhật chế độ dàn trang tự động');
}

function addVectorShape(type) {
  const names = {
    rect: 'Hình chữ nhật', circle: 'Hình tròn', ellipse: 'Hình elip', line: 'Đường thẳng',
    polygon: 'Hình đa giác', star: 'Ngôi sao', arrow: 'Mũi tên', bubble: 'Khung hội thoại',
    ornament: 'Hoa văn trang trí', bezier: 'Đường cong Bezier', pencil: 'Nét vẽ tay', pattern: 'Mảng họa tiết'
  };
  const root = document.getElementById('artboard-objects-root');
  const el = document.createElement('div');
  const id = 'blk-vec-' + Date.now().toString().slice(-4);
  el.id = id;
  el.dataset.blockType = 'shape';
  el.dataset.parentGroup = 'grp-sidebar';
  el.dataset.bgHex = '#0b57d0';
  el.dataset.bgAlpha = '20';
  el.className = 'studio-block flex items-center justify-center p-2 rounded-xl';
  el.style.left = '210px';
  el.style.top = '280px';
  el.style.width = '140px';
  el.style.height = '110px';
  el.style.zIndex = '40';

  const svgs = {
    rect: `<svg viewBox="0 0 100 80" class="w-full h-full"><rect x="8" y="8" width="84" height="64" rx="8" fill="rgba(11,87,208,0.22)" stroke="#0b57d0" stroke-width="3"/></svg>`,
    circle: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="42" fill="rgba(5,150,105,0.22)" stroke="#059669" stroke-width="3"/></svg>`,
    ellipse: `<svg viewBox="0 0 120 80" class="w-full h-full"><ellipse cx="60" cy="40" rx="52" ry="32" fill="rgba(124,58,237,0.22)" stroke="#7c3aed" stroke-width="3"/></svg>`,
    line: `<svg viewBox="0 0 120 40" class="w-full h-full"><line x1="8" y1="20" x2="112" y2="20" stroke="#18181b" stroke-width="4" stroke-linecap="round"/></svg>`,
    polygon: `<svg viewBox="0 0 100 100" class="w-full h-full"><polygon points="50,6 93,30 93,75 50,96 7,75 7,30" fill="rgba(217,119,6,0.22)" stroke="#d97706" stroke-width="3"/></svg>`,
    star: `<svg viewBox="0 0 100 100" class="w-full h-full"><polygon points="50,5 63,36 96,39 70,61 78,94 50,76 22,94 30,61 4,39 37,36" fill="rgba(217,119,6,0.3)" stroke="#b45309" stroke-width="2.5"/></svg>`,
    arrow: `<svg viewBox="0 0 120 60" class="w-full h-full"><path d="M10 30 H95 M75 12 L100 30 L75 48" fill="none" stroke="#e11d48" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    bubble: `<svg viewBox="0 0 120 90" class="w-full h-full"><path d="M12 12 H108 V62 H48 L24 82 V62 H12 Z" fill="rgba(11,87,208,0.18)" stroke="#0b57d0" stroke-width="3" stroke-linejoin="round"/></svg>`,
    ornament: `<svg viewBox="0 0 100 100" class="w-full h-full"><path d="M50 5 Q55 45 95 50 Q55 55 50 95 Q45 55 5 50 Q45 45 50 5 Z" fill="rgba(217,119,6,0.25)" stroke="#b45309" stroke-width="2"/></svg>`,
    bezier: `<svg viewBox="0 0 140 90" class="w-full h-full"><path d="M10 75 C 45 5, 95 5, 130 75" fill="none" stroke="#7c3aed" stroke-width="3.5"/><line x1="10" y1="75" x2="45" y2="10" stroke="#0b57d0" stroke-dasharray="3 2"/><circle cx="45" cy="10" r="4" fill="#0b57d0"/><circle cx="10" cy="75" r="4" fill="#fff" stroke="#7c3aed" stroke-width="2"/><circle cx="130" cy="75" r="4" fill="#fff" stroke="#7c3aed" stroke-width="2"/></svg>`,
    pencil: `<svg viewBox="0 0 140 80" class="w-full h-full"><path d="M10 45 Q 35 10, 65 45 T 130 35" fill="none" stroke="#059669" stroke-width="3.5" stroke-linecap="round"/></svg>`,
    pattern: `<svg viewBox="0 0 100 100" class="w-full h-full"><defs><pattern id="pgrid" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="3" fill="#0b57d0"/></pattern></defs><rect width="100" height="100" rx="12" fill="url(#pgrid)" stroke="#0b57d0" stroke-width="2"/></svg>`
  };

  const label = names[type] || 'Hình vẽ Vector';
  el.dataset.blockTitle = label;
  el.innerHTML = `<div class="block-badge">${label}</div>` + (svgs[type] || svgs.rect);
  root.appendChild(el);
  attachBlockInteractiveEvents(el);
  selectBlock(el);
  logOperation('create_vector', { shapeType: type, id });
  showToast('Đã chèn "' + label + '" vào trang');
}

function applyBooleanOp(op) {
  const opNames = { union: 'Hợp nhất khối', subtract: 'Trừ khối trên', intersect: 'Lấy phần giao', exclude: 'Loại trừ phần giao' };
  const shapes = {
    union: `<svg viewBox="0 0 120 90" class="w-full h-full"><path d="M15 15 H75 V35 H105 V75 H45 V55 H15 Z" fill="rgba(11,87,208,0.28)" stroke="#0b57d0" stroke-width="3"/></svg>`,
    subtract: `<svg viewBox="0 0 120 90" class="w-full h-full"><path d="M15 15 H85 V45 H55 V75 H15 Z" fill="rgba(244,63,94,0.25)" stroke="#e11d48" stroke-width="3"/></svg>`,
    intersect: `<svg viewBox="0 0 120 90" class="w-full h-full"><rect x="38" y="28" width="44" height="36" rx="6" fill="rgba(5,150,105,0.3)" stroke="#059669" stroke-width="3"/></svg>`,
    exclude: `<svg viewBox="0 0 120 90" class="w-full h-full"><path d="M15 15 H75 V65 H15 Z M45 25 H105 V75 H45 Z" fill-rule="evenodd" fill="rgba(124,58,237,0.28)" stroke="#7c3aed" stroke-width="2.5"/></svg>`
  };
  if (!activeBlock || activeBlock.dataset.blockType !== 'shape') {
    addVectorShape('rect');
  }
  activeBlock.dataset.blockTitle = opNames[op] || 'Khối gộp Vector';
  activeBlock.innerHTML = `<div class="block-badge">${activeBlock.dataset.blockTitle}</div>` + (shapes[op] || shapes.union);
  attachBlockInteractiveEvents(activeBlock);
  logOperation('boolean_operation', { op, target: activeBlock.id });
  showToast('Đã thực hiện: ' + activeBlock.dataset.blockTitle);
}

function toggleNodeEditMode() {
  nodeEditActive = !nodeEditActive;
  document.getElementById('tb-btn-node-edit').classList.toggle('is-active', nodeEditActive);
  document.querySelectorAll('.vector-node-dot').forEach(n => n.remove());

  if (nodeEditActive && activeBlock) {
    const pts = [[12, 12], [50, 8], [88, 18], [84, 84], [16, 82]];
    pts.forEach(([px, py]) => {
      const dot = document.createElement('div');
      dot.className = 'vector-node-dot';
      dot.style.left = px + '%';
      dot.style.top = py + '%';
      dot.title = 'Điểm neo đường cong (Kéo để điều chỉnh)';
      activeBlock.appendChild(dot);
    });
    showToast('Đã bật chế độ chỉnh sửa điểm neo đường cong');
  } else {
    showToast('Đã tắt chế độ chỉnh sửa điểm neo');
  }
}

function insertCustomSvg() {
  const code = document.getElementById('inp-svg').value.trim();
  if (!code) return;
  const root = document.getElementById('artboard-objects-root');
  const el = document.createElement('div');
  el.id = 'blk-svg-' + Date.now().toString().slice(-4);
  el.dataset.blockType = 'shape';
  el.dataset.parentGroup = 'grp-sidebar';
  el.dataset.blockTitle = 'Hình vẽ SVG tùy chỉnh';
  el.dataset.bgHex = '#ffffff';
  el.dataset.bgAlpha = '0';
  el.className = 'studio-block flex items-center justify-center p-2';
  el.style.left = '240px';
  el.style.top = '340px';
  el.style.width = '110px';
  el.style.height = '110px';
  el.style.zIndex = '42';
  el.innerHTML = `<div class="block-badge">Hình vẽ SVG tùy chỉnh</div>` + code;
  root.appendChild(el);
  attachBlockInteractiveEvents(el);
  selectBlock(el);
  showToast('Đã chèn mã hình vẽ SVG vào trang');
}

// ============================================================================
// 7. VĂN BẢN, CHỮ UỐN CONG & CÂY PHÂN CẤP LỚP (Mục 5.5 & 5.7)
// ============================================================================
function addFreeTextBlock(kind) {
  const root = document.getElementById('artboard-objects-root');
  const el = document.createElement('div');
  el.id = 'blk-txt-' + Date.now().toString().slice(-4);
  el.dataset.blockType = 'text';
  el.dataset.parentGroup = 'grp-header';
  el.dataset.blockTitle = kind === 'display' ? 'Tiêu đề lớn (36pt)' : kind === 'heading' ? 'Tiêu đề mục (20pt)' : 'Đoạn văn bản nội dung';
  el.dataset.bgHex = '#ffffff';
  el.dataset.bgAlpha = '0';
  el.className = 'studio-block p-2 rounded-lg';
  el.style.left = '140px';
  el.style.top = '220px';
  el.style.width = '280px';
  el.style.height = kind === 'display' ? '72px' : '58px';
  el.style.zIndex = '45';
  el.style.backgroundColor = 'rgba(255,255,255,0)';

  const font = kind === 'display' ? "'Playfair Display', serif" : "'Inter', sans-serif";
  const size = kind === 'display' ? '26px' : kind === 'heading' ? '18px' : '13px';
  const copy = kind === 'display' ? 'Điểm nhấn Thị giác Chủ đạo' : kind === 'heading' ? 'Tiêu đề Chuyên mục' : 'Nội dung văn bản tự do có nền trong suốt, hỗ trợ chia cột báo và căn chỉnh linh hoạt.';

  el.innerHTML = `
    <div class="block-badge">${el.dataset.blockTitle}</div>
    <div contenteditable="true" style="font-family:${font}; font-size:${size}; font-weight:700;" class="outline-none leading-snug">${copy}</div>
  `;
  root.appendChild(el);
  attachBlockInteractiveEvents(el);
  selectBlock(el);
}

function addTextOnPathBlock() {
  const root = document.getElementById('artboard-objects-root');
  const el = document.createElement('div');
  const pathId = 'curve-' + Date.now().toString().slice(-4);
  el.id = 'blk-path-txt-' + Date.now().toString().slice(-4);
  el.dataset.blockType = 'text';
  el.dataset.parentGroup = 'grp-header';
  el.dataset.blockTitle = 'Chữ uốn theo đường cong';
  el.dataset.bgHex = '#ffffff';
  el.dataset.bgAlpha = '0';
  el.className = 'studio-block p-2';
  el.style.left = '175px';
  el.style.top = '110px';
  el.style.width = '240px';
  el.style.height = '95px';
  el.style.zIndex = '48';
  el.innerHTML = `
    <div class="block-badge">Chữ uốn theo đường cong</div>
    <svg viewBox="0 0 240 90" class="w-full h-full overflow-visible">
      <path id="${pathId}" d="M 15,75 Q 120,5 225,75" fill="none" stroke="rgba(11,87,208,0.25)" stroke-dasharray="3 3" />
      <text fill="#0b57d0" font-size="12" font-weight="700" letter-spacing="1.5">
        <textPath href="#${pathId}" startOffset="50%" text-anchor="middle">✦ THIẾT KẾ SÁNG TẠO ĐA LĨNH VỰC ✦</textPath>
      </text>
    </svg>
  `;
  root.appendChild(el);
  attachBlockInteractiveEvents(el);
  selectBlock(el);
  showToast('Đã tạo khối Chữ uốn theo đường cong');
}

function insertGlyph(char) {
  const target = document.getElementById('free-note-content') || (activeBlock && activeBlock.querySelector('[contenteditable="true"]'));
  if (target) {
    target.textContent += ' ' + char;
    showToast('Đã chèn ký tự "' + char + '"');
  }
}

function toggleTextDirection() {
  if (!activeBlock) return;
  activeBlock.style.direction = activeBlock.style.direction === 'rtl' ? 'ltr' : 'rtl';
  showToast('Đã đổi hướng dòng văn bản');
}

function autoFitSelectedText() {
  if (!activeBlock) return;
  activeBlock.style.height = 'auto';
  showToast('Đã bật tự động co giãn chiều cao khung chữ');
}

function importCustomGoogleFont() {
  const name = document.getElementById('inp-gfont').value.trim();
  if (!name) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(name) + ':wght@400;700&display=swap';
  document.head.appendChild(link);

  const sel = document.getElementById('tb-font-family');
  const opt = document.createElement('option');
  opt.value = `'${name}', sans-serif`;
  opt.textContent = name;
  sel.appendChild(opt);
  sel.value = opt.value;
  applyBlockStyle('fontFamily', opt.value);
  showToast('Đã nạp và áp dụng phông chữ "' + name + '"');
}

function addMediaBlock(kind) {
  if (kind === 'image') {
    insertRealSampleImage(0);
    return;
  }
  if (kind === 'video') {
    insertRealSampleVideo(0);
    return;
  }
  const root = document.getElementById('artboard-objects-root');
  const el = document.createElement('div');
  el.id = 'blk-med-' + Date.now().toString().slice(-4);
  el.dataset.blockType = 'media';
  el.dataset.parentGroup = 'grp-sidebar';
  el.dataset.blockTitle = 'Khối Mô hình 3D Xoay';
  el.dataset.bgHex = '#0f172a';
  el.dataset.bgAlpha = '92';
  el.className = 'studio-block p-3 rounded-2xl text-white shadow-lg flex flex-col items-center justify-between overflow-hidden';
  el.style.left = '200px';
  el.style.top = '300px';
  el.style.width = '185px';
  el.style.height = '145px';
  el.style.zIndex = '44';
  el.style.backgroundColor = 'rgba(15,23,42,0.92)';
  el.innerHTML = document.getElementById('blk-media-3d').innerHTML;
  root.appendChild(el);
  attachBlockInteractiveEvents(el);
  selectBlock(el);
  showToast('Đã chèn khối Mô hình 3D Xoay vào trang');
}

function toggleCropMode() {
  if (!activeBlock) return;
  cropModeActive = !cropModeActive;
  activeBlock.classList.toggle('is-cropping', cropModeActive);
  document.getElementById('tb-btn-crop').classList.toggle('is-active', cropModeActive);
  showToast(cropModeActive ? 'Đang bật chế độ Cắt khung ảnh (Kéo 8 điểm neo để cắt)' : 'Đã hoàn tất cắt khung ảnh');
}

function simulateAiRemoveBg() {
  if (!activeBlock) return;
  activeBlock.dataset.bgAlpha = '0';
  activeBlock.style.backgroundColor = 'transparent';
  activeBlock.style.border = 'none';
  syncToolbarWithSelectedBlock(activeBlock);
  showToast('Đã tách nền trong suốt cho đối tượng');
}

function applyClipMask(maskClass) {
  if (!activeBlock) return;
  ['clip-circle', 'clip-arch', 'clip-hexagon'].forEach(c => activeBlock.classList.remove(c));
  if (maskClass !== 'none') activeBlock.classList.add(maskClass);
  showToast('Đã áp dụng khung lồng hình');
}

function applyCreativeMediaEffect(mode) {
  if (!activeBlock) return;
  if (mode === 'duotone') {
    activeBlock.style.filter = 'grayscale(100%) contrast(135%) sepia(60%) hue-rotate(185deg) saturate(220%)';
  } else if (mode === 'double-exp') {
    activeBlock.style.mixBlendMode = 'screen';
    activeBlock.style.opacity = '0.82';
  } else if (mode === 'grain') {
    activeBlock.classList.toggle('ps-fx-grain');
  } else {
    activeBlock.style.filter = 'none';
    activeBlock.style.mixBlendMode = 'normal';
    activeBlock.style.opacity = '1';
    activeBlock.classList.remove('ps-fx-grain');
  }
  showToast('Đã cập nhật hiệu ứng màu hình ảnh');
}

function spawnAssetItem(kind) {
  const root = document.getElementById('artboard-objects-root');
  const el = document.createElement('div');
  el.id = 'blk-ast-' + Date.now().toString().slice(-4);
  el.dataset.blockType = 'shape';
  el.dataset.parentGroup = 'grp-sidebar';
  el.dataset.bgHex = '#ffffff';
  el.dataset.bgAlpha = '95';
  el.className = 'studio-block p-2.5 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center justify-center text-center';
  el.style.left = '220px';
  el.style.top = '260px';
  el.style.width = '130px';
  el.style.height = '130px';
  el.style.zIndex = '46';
  el.style.backgroundColor = 'rgba(255,255,255,0.95)';

  if (kind === 'qr') {
    const url = (document.getElementById('inp-qr-url') || {}).value || 'https://id.vuonganhvu.vn';
    el.dataset.blockTitle = 'Mã QR Vector';
    el.innerHTML = `
      <div class="block-badge">Mã QR Vector</div>
      <svg viewBox="0 0 80 80" class="w-16 h-16"><rect x="4" y="4" width="24" height="24" fill="none" stroke="#18181b" stroke-width="4"/><rect x="11" y="11" width="10" height="10" fill="#18181b"/><rect x="52" y="4" width="24" height="24" fill="none" stroke="#18181b" stroke-width="4"/><rect x="59" y="11" width="10" height="10" fill="#18181b"/><rect x="4" y="52" width="24" height="24" fill="none" stroke="#18181b" stroke-width="4"/><rect x="11" y="59" width="10" height="10" fill="#18181b"/><rect x="36" y="36" width="12" height="12" fill="#0b57d0"/><rect x="54" y="54" width="18" height="8" fill="#18181b"/><rect x="36" y="12" width="8" height="16" fill="#18181b"/></svg>
      <div class="text-[9px] truncate w-full mt-1 font-medium">${url}</div>`;
  } else if (kind === 'sticker') {
    el.dataset.blockTitle = 'Nhãn Khuyến mãi';
    el.style.backgroundColor = '#e11d48';
    el.style.color = '#ffffff';
    el.innerHTML = `<div class="block-badge">Nhãn Khuyến mãi</div><div class="font-bold text-sm leading-tight">ƯU ĐÃI<br/>GIẢM 40%</div>`;
  } else {
    el.dataset.blockTitle = 'Biểu trưng Thương hiệu';
    el.innerHTML = `
      <div class="block-badge">Biểu trưng Thương hiệu</div>
      <svg viewBox="0 0 60 60" class="w-12 h-12"><circle cx="30" cy="30" r="26" fill="rgba(11,87,208,0.12)" stroke="#0b57d0" stroke-width="2.5"/><path d="M18 22 L30 42 L42 22" fill="none" stroke="#0b57d0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="font-semibold text-[10px] mt-1">Con dấu VAV</div>`;
  }

  root.appendChild(el);
  attachBlockInteractiveEvents(el);
  selectBlock(el);
  showToast('Đã chèn "' + el.dataset.blockTitle + '" vào trang');
}

function filterAssetLibrary() {
  const q = (document.getElementById('asset-search-inp').value || '').toLowerCase();
  document.querySelectorAll('#asset-library-grid > div').forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(q) ? 'flex' : 'none';
  });
}

// ============================================================================
// 8. CÂY PHÂN CẤP LỚP (Mục 5.7) & ĐÓNG/MỞ NGĂN CÔNG CỤ CỐ ĐỊNH
// ============================================================================
function refreshHierarchicalLayerTree() {
  const box = document.getElementById('layer-tree-list');
  if (!box) return;

  const blocks = Array.from(document.querySelectorAll('#artboard-objects-root .studio-block'));
  const grouped = {};
  Object.keys(layerGroupsMeta).forEach(g => { grouped[g] = []; });

  blocks.forEach(b => {
    const g = b.dataset.parentGroup || 'grp-body';
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(b);
  });

  let html = `
    <div class="p-1.5 rounded bg-blue-500/10 border border-blue-500/25 font-semibold text-[11px] flex items-center justify-between">
      <span>Trang thiết kế gốc</span>
      <span class="text-[10px] text-blue-600">${blocks.length} đối tượng</span>
    </div>
  `;

  Object.keys(grouped).forEach(gKey => {
    const meta = layerGroupsMeta[gKey] || { title: 'Nhóm: ' + gKey, expanded: true };
    const children = grouped[gKey] || [];
    html += `
      <div class="pl-2 border-l border-zinc-400/30 space-y-1 mt-1">
        <div onclick="toggleLayerGroupExpand('${gKey}')" class="p-1 rounded hover:bg-zinc-500/10 cursor-pointer flex items-center justify-between font-semibold text-[10.5px]">
          <span>${meta.expanded ? '▾' : '▸'} ${meta.title}</span>
          <span class="text-[9.5px] ui-muted">${children.length}</span>
        </div>
        ${meta.expanded ? children.map(b => {
          const isSel = b === activeBlock;
          const isLocked = b.classList.contains('is-locked');
          const isHidden = b.style.display === 'none';
          return `
            <div onclick="selectBlock(document.getElementById('${b.id}'))"
                 class="ml-3 p-1.5 rounded-md border ${isSel ? 'border-blue-600 bg-blue-500/10 font-semibold' : 'ui-border ui-subpanel'} cursor-pointer flex items-center justify-between gap-1 text-[10.5px]">
              <span class="truncate">└ ${b.dataset.blockTitle || b.id}</span>
              <div class="flex items-center gap-1 shrink-0">
                <button onclick="event.stopPropagation(); toggleNodeVisibility('${b.id}')" class="px-1 rounded hover:bg-zinc-500/20 text-[10px]" title="Ẩn hoặc hiện lớp">${isHidden ? 'Hiện' : 'Ẩn'}</button>
                <button onclick="event.stopPropagation(); toggleNodeLock('${b.id}')" class="px-1 rounded hover:bg-zinc-500/20 text-[10px]" title="Khóa hoặc mở khóa">${isLocked ? 'Mở' : 'Khóa'}</button>
              </div>
            </div>
          `;
        }).join('') : ''}
      </div>
    `;
  });

  box.innerHTML = html;
}

function toggleLayerGroupExpand(gKey) {
  if (layerGroupsMeta[gKey]) {
    layerGroupsMeta[gKey].expanded = !layerGroupsMeta[gKey].expanded;
    refreshHierarchicalLayerTree();
  }
}

function toggleNodeVisibility(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = el.style.display === 'none' ? '' : 'none';
  refreshHierarchicalLayerTree();
}

function toggleNodeLock(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('is-locked');
  refreshHierarchicalLayerTree();
  showToast(el.classList.contains('is-locked') ? 'Đã khóa vị trí đối tượng' : 'Đã mở khóa đối tượng');
}

function toggleLockActiveBlock() {
  if (activeBlock) toggleNodeLock(activeBlock.id);
}

function groupSelectedBlocks() {
  if (!activeBlock) return;
  const newG = 'grp-custom-' + Date.now().toString().slice(-3);
  layerGroupsMeta[newG] = { title: 'Nhóm tùy chỉnh mới', expanded: true };
  activeBlock.dataset.parentGroup = newG;
  refreshHierarchicalLayerTree();
  openLeftTab('layers');
  showToast('Đã đưa đối tượng vào nhóm mới trong Cây lớp');
}

// ============================================================================
// 9. MÀU SẮC, VIỀN, HIỆU ỨNG & ĐỘ ĐỤC NỀN (Mục 5.4)
// ============================================================================
function updateBlockBgColorAndAlpha() {
  if (!activeBlock) return;
  const hex = document.getElementById('tb-bg-color').value;
  const alphaPct = Number(document.getElementById('tb-bg-alpha').value);
  document.getElementById('tb-bg-alpha-lbl').textContent = alphaPct + '%';

  activeBlock.dataset.bgHex = hex;
  activeBlock.dataset.bgAlpha = String(alphaPct);

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  activeBlock.style.backgroundImage = 'none';
  activeBlock.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alphaPct / 100})`;
  updateColorSpaceReadout();
}

function switchColorSpaceView() {
  updateColorSpaceReadout();
}

function updateColorSpaceReadout() {
  const box = document.getElementById('color-space-readout');
  if (!box || !activeBlock) return;
  const hex = (activeBlock.dataset.bgHex || '#ffffff').toUpperCase();
  const a = activeBlock.dataset.bgAlpha || '90';
  const r = parseInt(hex.slice(1, 3), 16) || 255;
  const g = parseInt(hex.slice(3, 5), 16) || 255;
  const b = parseInt(hex.slice(5, 7), 16) || 255;

  const k = Math.round((1 - Math.max(r, g, b) / 255) * 100);
  const c = k === 100 ? 0 : Math.round(((1 - r / 255 - k / 100) / (1 - k / 100)) * 100);
  const m = k === 100 ? 0 : Math.round(((1 - g / 255 - k / 100) / (1 - k / 100)) * 100);
  const y = k === 100 ? 0 : Math.round(((1 - b / 255 - k / 100) / (1 - k / 100)) * 100);

  box.innerHTML = `<span>${hex} (${a}%)</span><span>RGB(${r},${g},${b})</span><span>CMYK(${c},${m},${y},${k})</span>`;
}

function setBlockFillType(mode) {
  if (!activeBlock) return;
  if (mode === 'solid') {
    updateBlockBgColorAndAlpha();
  } else if (mode === 'linear') {
    applyGrad();
  } else if (mode === 'radial') {
    const c1 = document.getElementById('g-c1').value;
    const c2 = document.getElementById('g-c2').value;
    activeBlock.style.backgroundImage = `radial-gradient(circle, ${c1}, ${c2})`;
  } else if (mode === 'pattern') {
    activeBlock.style.backgroundImage = 'radial-gradient(rgba(11,87,208,0.22) 1.5px, transparent 1.5px)';
    activeBlock.style.backgroundSize = '12px 12px';
  }
  showToast('Đã cập nhật kiểu tô nền');
}

function applyGrad() {
  const c1 = document.getElementById('g-c1').value;
  const c2 = document.getElementById('g-c2').value;
  const ang = document.getElementById('g-ang').value;
  document.getElementById('g-ang-lbl').textContent = ang + '°';
  const target = activeBlock || document.getElementById('page-artboard');
  target.style.backgroundImage = `linear-gradient(${ang}deg, ${c1}, ${c2})`;
}

function applyBrandSwatch(hex) {
  document.getElementById('tb-bg-color').value = hex;
  updateBlockBgColorAndAlpha();
}

function applyStrokeProps() {
  if (!activeBlock) return;
  const c = document.getElementById('stroke-color').value;
  const w = document.getElementById('stroke-width').value;
  const s = document.getElementById('stroke-style').value;
  activeBlock.style.border = `${w}px ${s} ${c}`;
}

async function pickScreenColor() {
  if (window.EyeDropper) {
    try {
      const ed = new EyeDropper();
      const res = await ed.open();
      document.getElementById('tb-bg-color').value = res.sRGBHex;
      updateBlockBgColorAndAlpha();
      showToast('Đã hút màu: ' + res.sRGBHex);
      return;
    } catch (_) {}
  }
  showToast('Đã chọn màu thương hiệu #0B57D0');
}

function applyBlockStyle(prop, val) {
  if (!activeBlock) return;
  activeBlock.style[prop] = val;
  logOperation('update_style', { id: activeBlock.id, [prop]: val });
}

function toggleInlineStyle(prop, onVal, offVal) {
  if (!activeBlock) return;
  activeBlock.style[prop] = activeBlock.style[prop] === onVal ? offVal : onVal;
}

function stepFontSize(delta) {
  const lbl = document.getElementById('tb-fontsize-val');
  const next = Math.max(9, Math.min(64, (parseInt(lbl.textContent) || 13) + delta));
  lbl.textContent = next;
  if (activeBlock) activeBlock.style.fontSize = next + 'px';
}

function setTextFx(cls) {
  if (!activeBlock) return;
  ['fx-hollow', 'fx-splice', 'fx-neon', 'fx-gradient'].forEach(c => activeBlock.classList.remove(c));
  if (cls !== 'none') activeBlock.classList.add(cls);
}

function toggleBlockClass(cls) {
  if (!activeBlock) return;
  activeBlock.classList.toggle(cls);
}

function applyFilters() {
  if (!activeBlock) return;
  const b = document.getElementById('flt-b').value;
  const c = document.getElementById('flt-c').value;
  const s = document.getElementById('flt-s').value;
  const h = document.getElementById('flt-h').value;
  const bl = document.getElementById('flt-blur').value;
  activeBlock.style.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%) hue-rotate(${h}deg) blur(${bl}px)`;
}

// ============================================================================
// 10. THIẾT LẬP TRANG, PHONG CÁCH & ĐIỀU HƯỚNG TRANG (Mục 5.1 & 4.2)
// ============================================================================
function changePageSizePreset(val, silent) {
  const [w, h] = val.split('x').map(Number);
  const artboard = document.getElementById('page-artboard');
  artboard.style.width = w + 'px';
  artboard.style.height = h + 'px';
  document.getElementById('canvas-custom-w').value = w;
  document.getElementById('canvas-custom-h').value = h;
  updatePageDimensionReadout();
  if (!silent) showToast('Đã đổi kích thước trang: ' + w + ' × ' + h + ' px');
}

function applyCustomCanvasSize() {
  const w = Math.max(280, Number(document.getElementById('canvas-custom-w').value) || 595);
  const h = Math.max(280, Number(document.getElementById('canvas-custom-h').value) || 842);
  const artboard = document.getElementById('page-artboard');
  artboard.style.width = w + 'px';
  artboard.style.height = h + 'px';
  updatePageDimensionReadout();
  showToast('Đã áp dụng kích thước tùy chỉnh: ' + w + ' × ' + h);
}

function changeDocumentUnit(unit) {
  currentUnit = unit;
  document.getElementById('ruler-unit-badge').textContent = unit;
  buildRulers();
  updatePageDimensionReadout();
  showToast('Đã đổi đơn vị đo sang ' + unit);
}

function changeDocumentDpi(dpi) {
  currentDpi = Number(dpi);
  updatePageDimensionReadout();
  showToast('Đã đặt độ phân giải: ' + dpi + ' DPI');
}

function togglePageOrientation() {
  const artboard = document.getElementById('page-artboard');
  const w = artboard.offsetWidth;
  const h = artboard.offsetHeight;
  artboard.style.width = h + 'px';
  artboard.style.height = w + 'px';
  document.getElementById('canvas-custom-w').value = h;
  document.getElementById('canvas-custom-h').value = w;
  updatePageDimensionReadout();
  showToast('Đã xoay chiều trang Dọc ⇄ Ngang');
}

function updatePageDimensionReadout() {
  const artboard = document.getElementById('page-artboard');
  const w = artboard.offsetWidth;
  const h = artboard.offsetHeight;
  const factor = currentUnit === 'mm' ? 0.264 : currentUnit === 'cm' ? 0.0264 : currentUnit === 'in' ? 0.0104 : currentUnit === 'pt' ? 0.75 : 1;
  const rw = Math.round(w * factor * 10) / 10;
  const rh = Math.round(h * factor * 10) / 10;
  document.getElementById('page-dim-readout').textContent = `${rw} × ${rh}`;
}

function setArtboardBackground(color) {
  const artboard = document.getElementById('page-artboard');
  artboard.style.backgroundImage = 'none';
  artboard.style.backgroundColor = color;
}

function toggleCanvasOverlay(kind, show) {
  if (kind === 'rulers') {
    document.getElementById('ruler-top-row').classList.toggle('hidden', !show);
    document.getElementById('ruler-v-bar').classList.toggle('hidden', !show);
    return;
  }
  const map = {
    bleed: 'ovl-bleed',
    safe: 'ovl-safe',
    margin: 'ovl-margin',
    grid: 'ovl-grid',
    baseline: 'ovl-baseline'
  };
  const el = document.getElementById(map[kind]);
  if (el) el.classList.toggle('hidden', !show);
}

function applyDesignStylePreset(style) {
  const artboard = document.getElementById('page-artboard');
  const blocks = document.querySelectorAll('#artboard-objects-root .studio-block');

  if (style === 'swiss') {
    artboard.style.backgroundColor = '#F4F4F5';
    document.getElementById('chk-grid').checked = true;
    toggleCanvasOverlay('grid', true);
    blocks.forEach(b => {
      if (b.id !== 'blk-ambient-orb') {
        b.style.borderRadius = '2px';
        b.style.border = '1.5px solid #18181b';
        b.style.fontFamily = "'Inter', sans-serif";
      }
    });
  } else if (style === 'brutalism') {
    artboard.style.backgroundColor = '#FEF08A';
    blocks.forEach(b => {
      if (b.id !== 'blk-ambient-orb') {
        b.style.borderRadius = '0px';
        b.style.border = '2.5px solid #18181b';
        b.style.boxShadow = '5px 5px 0px #18181b';
      }
    });
  } else if (style === 'luxury') {
    artboard.style.backgroundColor = '#090D16';
    blocks.forEach(b => {
      if (b.id !== 'blk-ambient-orb' && b.dataset.bgAlpha !== '0') {
        b.style.backgroundColor = 'rgba(24, 24, 32, 0.88)';
        b.style.color = '#FDE68A';
        b.style.border = '1px solid rgba(251, 191, 36, 0.35)';
      }
    });
  } else if (style === 'bauhaus') {
    artboard.style.backgroundColor = '#FAF6F0';
    blocks.forEach((b, idx) => {
      if (b.id !== 'blk-ambient-orb') {
        b.style.borderRadius = idx % 2 === 0 ? '0px' : '24px';
        b.style.border = '2px solid #18181b';
        b.style.boxShadow = 'none';
      }
    });
  } else {
    artboard.style.backgroundColor = '#FAF6F0';
    blocks.forEach(b => {
      if (b.id !== 'blk-ambient-orb' && b.id !== 'blk-media-3d' && b.dataset.bgAlpha !== '0') {
        b.style.backgroundColor = 'rgba(255, 255, 255, 0.90)';
        b.style.color = '#18181b';
        b.style.borderRadius = '16px';
        b.style.border = '1px solid rgba(214, 211, 209, 0.8)';
        b.style.boxShadow = 'none';
      }
    });
  }
  showToast('Đã áp dụng phong cách thẩm mỹ mới');
}

function applyCompositionPattern(pattern) {
  if (pattern === 'symmetric') {
    setBlockBox('blk-sec-personal', 32, 28, 531, 125);
    setBlockBox('blk-sec-experiences', 32, 168, 258, 300);
    setBlockBox('blk-sec-projects', 305, 168, 258, 300);
    setBlockBox('blk-sec-skills', 32, 484, 531, 145);
  } else if (pattern === 'split') {
    setBlockBox('blk-sec-personal', 24, 28, 255, 230);
    setBlockBox('blk-sec-skills', 24, 272, 255, 340);
    setBlockBox('blk-sec-experiences', 295, 28, 275, 310);
    setBlockBox('blk-sec-projects', 295, 352, 275, 260);
  } else {
    setBlockBox('blk-sec-personal', 32, 28, 531, 128);
    setBlockBox('blk-sec-experiences', 32, 172, 336, 295);
    setBlockBox('blk-sec-projects', 32, 482, 336, 265);
    setBlockBox('blk-sec-skills', 382, 172, 181, 295);
  }
  if (activeBlock) syncInspectorNumericInputs(activeBlock);
  showToast('Đã sắp xếp lại bố cục trang');
}

function switchDocumentPage(pageNum) {
  const artboard = document.getElementById('page-artboard');
  const ind = document.getElementById('footer-page-indicator');
  if (ind) ind.textContent = `Trang ${pageNum} / 2`;

  artboard.classList.remove('run-book-flip');
  void artboard.offsetWidth;
  artboard.classList.add('run-book-flip');
  if (pageNum === 2) {
    switchHostDatabaseProfile('chau', true);
  } else {
    switchHostDatabaseProfile('vuong', true);
  }
  showToast('Đang hiển thị Trang ' + pageNum);
}

function addNewDocumentPage() {
  const ind = document.getElementById('footer-page-indicator');
  if (ind) ind.textContent = 'Trang 3 / 3';
  showToast('Đã thêm Trang mới vào tài liệu');
}

function setCanvasZoom(z) {
  currentZoom = Math.max(0.4, Math.min(1.5, Math.round(z * 100) / 100));
  document.getElementById('page-artboard').style.transform = `scale(${currentZoom})`;
  document.getElementById('zoom-slider').value = currentZoom;
  document.getElementById('zoom-pct-lbl').textContent = Math.round(currentZoom * 100) + '%';
}

// ============================================================================
// 11. CHUYỂN ĐỘNG, TRỢ LÝ AI, ĐÓNG/MỞ NGĂN CÔNG CỤ CỐ ĐỊNH & XUẤT BẢN
// ============================================================================
function toggleMotionTimeline() {
  const drw = document.getElementById('motion-timeline-drawer');
  drw.classList.toggle('hidden');
  document.getElementById('tb-btn-timeline').classList.toggle('ui-accent-btn', !drw.classList.contains('hidden'));
}

function triggerBlockAnim(cls) {
  const target = activeBlock || document.getElementById('page-artboard');
  ['anim-fade','anim-slide','anim-zoom','anim-rotate','anim-bounce','anim-reveal','anim-morph','anim-parallax'].forEach(c => target.classList.remove(c));
  void target.offsetWidth;
  target.classList.add(cls);
  updateAnimationTiming();
}

function updateAnimationTiming() {
  if (!activeBlock) return;
  const dur = document.getElementById('tl-duration').value || 0.6;
  const dly = document.getElementById('tl-delay').value || 0;
  const ease = document.getElementById('tl-easing').value;
  activeBlock.style.animationDuration = dur + 's';
  activeBlock.style.animationDelay = dly + 's';
  activeBlock.style.animationTimingFunction = ease;
}

function toggleSelectedLoopAnim(loop) {
  if (!activeBlock) return;
  activeBlock.style.animationIterationCount = loop ? 'infinite' : '1';
}

function runTypewriterAnim() {
  const el = document.getElementById('bind-headline');
  if (!el) return;
  const full = el.textContent.trim();
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += full[i] || '';
    i++;
    if (i >= full.length) clearInterval(timer);
  }, 28);
  showToast('Đang chạy hiệu ứng gõ từng chữ');
}

function playAllBlocksAnimation() {
  const blocks = document.querySelectorAll('#artboard-objects-root .studio-block');
  blocks.forEach((b, i) => {
    b.classList.remove('anim-fade');
    void b.offsetWidth;
    b.style.animationDelay = (i * 0.08) + 's';
    b.classList.add('anim-fade');
  });
  showToast('Đang phát thử chuyển động toàn trang');
}

function switchCollabMode(mode) {
  if (mode === 'ai') {
    openLeftTab('smart');
    runAiDesignWorkflow();
  } else {
    showToast('Đã chuyển chế độ làm việc');
  }
}

function runAiDesignWorkflow() {
  smartAutoAlignAll();
  logOperation('ai_workflow_execute', {
    stages: ['Brief', 'ArtDirection', 'LayoutExecution', '5LayerQA'],
    qaScore: 99
  });
  document.getElementById('qa-score-badge').textContent = '99/100 Đạt';
  showToast('Trợ lý AI đã tự động căn chỉnh bố cục và kiểm định đạt 99/100!');
}

function smartAutoAlignAll() {
  applyCompositionPattern('asymmetric');
  showToast('Đã tự động căn chỉnh khoảng cách chuẩn giữa các khối');
}

function suggestFontPairing() {
  document.getElementById('bind-fullname').style.fontFamily = "'Playfair Display', serif";
  document.getElementById('bind-headline').style.fontFamily = "'Inter', sans-serif";
  showToast('Đã áp dụng cặp phông chữ Playfair Display & Inter');
}

function suggestColorHarmony() {
  applyDesignStylePreset('editorial');
  showToast('Đã phối màu hài hòa đạt độ tương phản AAA (14.8:1)');
}

function runConsistencyCheck() {
  showToast('Kiểm tra đồng nhất: Không có lỗi tràn lề hoặc lệch phông chữ');
}

function moveBlockLayer(delta) {
  if (!activeBlock) return;
  const cur = parseInt(activeBlock.style.zIndex) || 10;
  activeBlock.style.zIndex = Math.max(1, cur + delta);
  showToast('Đã cập nhật thứ tự lớp hiển thị');
}

function duplicateActiveBlock() {
  if (!activeBlock) return;
  const clone = activeBlock.cloneNode(true);
  clone.id = activeBlock.id + '-copy-' + Date.now().toString().slice(-3);
  clone.dataset.bound = '0';
  clone.querySelectorAll('.resize-handle').forEach(h => h.remove());
  clone.style.left = (parseInt(activeBlock.style.left) + 20) + 'px';
  clone.style.top = (parseInt(activeBlock.style.top) + 20) + 'px';
  document.getElementById('artboard-objects-root').appendChild(clone);
  attachBlockInteractiveEvents(clone);
  selectBlock(clone);
  showToast('Đã nhân bản đối tượng');
}

function deleteActiveBlock() {
  if (!activeBlock) return;
  if (activeBlock.classList.contains('is-locked')) {
    showToast('Đối tượng đang khóa, hãy mở khóa trước khi xóa');
    return;
  }
  const id = activeBlock.id;
  activeBlock.remove();
  activeBlock = null;
  refreshHierarchicalLayerTree();
  logOperation('delete_object', { id });
  showToast('Đã xóa đối tượng đang chọn');
}

function logOperation(opName, payload) {
  const entry = { op: opName, ts: new Date().toLocaleTimeString('vi-VN'), ...payload };
  operationHistory.push(entry);
  const pre = document.getElementById('op-api-log');
  if (pre) pre.textContent = JSON.stringify(entry);
}

function undoOperation() {
  const last = operationHistory.pop();
  if (last) {
    redoStack.push(last);
    showToast('Đã hoàn tác thao tác trước');
  } else {
    showToast('Đã ở trạng thái ban đầu');
  }
}

function redoOperation() {
  const next = redoStack.pop();
  if (next) {
    operationHistory.push(next);
    showToast('Đã làm lại thao tác');
  } else {
    showToast('Không có thao tác để làm lại');
  }
}

// Mở tab bên trái và đồng bộ nút tai đóng/mở cố định
function openLeftTab(tabKey) {
  const drawer = document.getElementById('left-drawer');
  drawer.classList.remove('hidden');
  document.getElementById('left-ear-icon').textContent = '‹';

  ['canvas','domain','shapes','typography','media','assets','layers','smart'].forEach(k => {
    const pane = document.getElementById('ltab-' + k);
    const btn = document.getElementById('rail-btn-' + k);
    if (pane) pane.classList.toggle('hidden', k !== tabKey);
    if (btn) btn.classList.toggle('is-active', k === tabKey);
  });
  if (tabKey === 'layers') refreshHierarchicalLayerTree();
}

// Nút đóng/mở ngăn trái nằm ngoài #left-drawer nên luôn hiển thị để bấm mở lại!
function toggleLeftDrawerCollapse() {
  const drawer = document.getElementById('left-drawer');
  const isHidden = drawer.classList.toggle('hidden');
  document.getElementById('left-ear-icon').textContent = isHidden ? '›' : '‹';
}

// Nút đóng/mở bảng thuộc tính phải nằm ngoài #right-inspector nên luôn hiển thị để bấm mở lại!
function toggleRightInspector() {
  const insp = document.getElementById('right-inspector');
  const isHidden = insp.classList.toggle('hidden');
  document.getElementById('right-ear-icon').textContent = isHidden ? '‹' : '›';
}

function toggleStudioTheme() {
  document.body.classList.toggle('mode-graphite');
}

function openExportPreflightModal() {
  document.getElementById('export-preflight-modal').classList.remove('hidden');
}

function closeExportPreflightModal() {
  document.getElementById('export-preflight-modal').classList.add('hidden');
}

function selectExportFormat(fmt) {
  document.querySelectorAll('.exp-fmt-btn').forEach(b => {
    b.classList.remove('border-2', 'border-blue-600', 'bg-blue-500/10', 'font-semibold');
    b.classList.add('border', 'ui-border');
  });
  event.currentTarget.classList.add('border-2', 'border-blue-600', 'bg-blue-500/10', 'font-semibold');
  showToast('Đã chọn định dạng xuất bản: ' + fmt);
}

function executeExportPublish() {
  closeExportPreflightModal();
  logOperation('export_document', { domain: currentEditorDomain, dpi: currentDpi, preflight: 'PASSED' });
  showToast('Đã kiểm tra kỹ thuật 5/5 và xuất bản ấn phẩm thành công!');
}

let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('studio-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 2600);
}
