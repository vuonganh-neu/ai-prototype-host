// Seed Data v3 — Kính Mắt Minh Quang (Full Store Settings, Staff/RBAC, Website CMS, Rich Catalog & AI Budget Tags)

window.OPTIC_V3_SEED = function createOpticV3Seed() {
  return {
    role: 'OWNER_ADMIN',
    sidebarCollapsed: false,
    activeSurface: 'store',
    activeStoreView: 'dashboard',
    activeCustomerDetailId: null,
    activePublicView: 'storefront',
    activeCmsSlug: 'about',
    portalCustomerId: 'CUS-001',

    storeSettings: {
      name: 'Kính Mắt Minh Quang',
      shortName: 'Minh Quang',
      tagline: 'OPTICAL STUDIO · 148 XÃ ĐÀN',
      phone: '024 3888 9999',
      email: 'hotro@minhquangoptical.vn',
      address: '148 Xã Đàn, Đống Đa, Hà Nội',
      hours: '08:30 – 20:30 (Tất cả các ngày)',
      bankInfo: 'Vietcombank · 0011004567890 · CTK: VUONG ANH VU',
      logoUrl: ''
    },

    staffUsers: [
      { id: 'USR-01', name: 'Vương Anh Vũ', username: 'owner', role: 'OWNER_ADMIN', phone: '0912000001', active: true },
      { id: 'USR-02', name: 'Nguyễn Thị Lan', username: 'lan.pos', role: 'SALES_CASHIER', phone: '0912000002', active: true },
      { id: 'USR-03', name: 'Hoàng Văn Nam', username: 'nam.optom', role: 'OPTOMETRIST', phone: '0912000003', active: true },
      { id: 'USR-04', name: 'Trần Tuấn Anh', username: 'tuananh.lab', role: 'LAB_TECHNICIAN', phone: '0912000004', active: true }
    ],

    rbacMatrix: {
      OWNER_ADMIN:    { label: 'Chủ cửa hàng', viewCost: true,  maxDiscount: 50, approveRefund: true,  editStock: true,  manageCms: true,  manageUsers: true },
      SALES_CASHIER:  { label: 'Thu ngân / POS', viewCost: false, maxDiscount: 10, approveRefund: false, editStock: false, manageCms: false, manageUsers: false },
      OPTOMETRIST:    { label: 'KTV Khúc xạ',   viewCost: false, maxDiscount: 5,  approveRefund: false, editStock: false, manageCms: false, manageUsers: false },
      LAB_TECHNICIAN: { label: 'KTV Gia công',  viewCost: false, maxDiscount: 0,  approveRefund: false, editStock: true,  manageCms: false, manageUsers: false }
    },

    cmsPages: [
      {
        slug: 'about',
        title: 'Giới thiệu Kính Mắt Minh Quang',
        updatedAt: '2026-11-19',
        content: 'Kính Mắt Minh Quang là cửa hàng quang học độc lập tại 148 Xã Đàn, Hà Nội, kết hợp phòng đo khúc xạ tiêu chuẩn và xưởng mài lắp nội bộ (In-house Optical Lab).\n\nChúng tôi lưu trữ trọn vẹn lịch sử đo mắt và vòng đời từng bộ kính của khách hàng trong Sổ Kính cá nhân (Eye Book), giúp bạn theo dõi tiến triển thị lực qua từng năm và luôn nhận được dịch vụ chăm sóc, cân chỉnh kính miễn phí trọn đời.'
      },
      {
        slug: 'shipping_return',
        title: 'Chính sách Mua hàng, Đặt cọc & Đổi trả',
        updatedAt: '2026-11-19',
        content: '1. Thanh toán tại cửa hàng: Giai đoạn hiện tại chúng tôi ưu tiên khách hàng thử kính, đo mắt và thanh toán trực tiếp tại cửa hàng (Tiền mặt hoặc Chuyển khoản có xác nhận thực nhận).\n2. Đặt cọc gia công: Đơn kính cận cần cắt mài phôi tròng áp dụng mức cọc từ 30% – 50% giá trị bộ kính.\n3. Đổi trả sản phẩm: Kính mát và gọng kính nguyên tem chưa lắp tròng được hỗ trợ đổi mẫu trong vòng 7 ngày. Tròng kính đã cắt theo số độ cá nhân áp dụng chính sách Bảo hành Thích nghi số độ 30 ngày.'
      },
      {
        slug: 'warranty_policy',
        title: 'Chính sách Bảo hành & Chăm sóc trọn đời',
        updatedAt: '2026-11-19',
        content: '• Gọng kính: Bảo hành lỗi kỹ thuật (mối hàn, lò xo, bản lề) từ 6–12 tháng. Miễn phí vệ sinh sóng siêu âm, thay đệm mũi và cân chỉnh gọng trọn đời.\n• Tròng kính: Bảo hành bong tróc lớp váng phủ (coating) theo tiêu chuẩn chính hãng Essilor, Zeiss, Hoya, Chemi từ 6–12 tháng.\n• Thích nghi thị lực: Hỗ trợ đo kiểm tra lại và điều chỉnh tròng miễn phí trong 15–30 ngày nếu khách đo tại cửa hàng đeo chưa êm mắt.'
      },
      {
        slug: 'privacy',
        title: 'Chính sách Bảo mật & Dữ liệu đo mắt',
        updatedAt: '2026-11-19',
        content: 'Dữ liệu đo khúc xạ, đơn kính (SPH, CYL, AXIS, PD) và lịch sử mua hàng của quý khách được bảo mật tuyệt đối và chỉ hiển thị cho nhân viên chuyên môn tại cửa hàng cùng chính quý khách trên Cổng Sổ Kính.\n\nThông báo qua Zalo OA chỉ được gửi khi có sự đồng ý (opt-in) của quý khách. Quý khách có thể yêu cầu ngừng nhận tin hoặc ẩn thông tin cá nhân bất kỳ lúc nào.'
      }
    ],

    products: [
      { id: 'PRD-01', sku: 'GK-TIT-018', name: 'Gọng Titanium Nhật Bản dáng tròn mảnh', brand: 'Matsuda Craft', category: 'FRAME', price: 1450000, cost: 780000, stock: 7, minStock: 3, trackStock: true, publishedOnWeb: true, shape: 'round', colorHex: '#1F2937', dims: '49-20-145', faces: ['Mặt vuông', 'Mặt trái xoan'], tags: ['titanium', 'lightweight', 'round'], videoUrl: 'https://example.com/video/gk-tit-018-360', customPhotoUrl: '', specs: 'Titanium 12g · Đen mờ · Chống gỉ', description: 'Chế tác từ hợp kim Beta-Titanium siêu nhẹ chỉ 12g, không gây hằn sống mũi khi đeo cả ngày làm việc.' },
      { id: 'PRD-02', sku: 'GK-ACE-204', name: 'Gọng Acetate đồi mồi dáng vuông cổ điển', brand: 'Moscot Style', category: 'FRAME', price: 980000, cost: 490000, stock: 11, minStock: 4, trackStock: true, publishedOnWeb: true, shape: 'square', colorHex: '#78350F', dims: '51-19-145', faces: ['Mặt tròn', 'Mặt trái xoan'], tags: ['acetate', 'square'], videoUrl: 'https://example.com/video/gk-ace-204-360', customPhotoUrl: '', specs: 'Acetate Ý · Đồi mồi · Bản lề 5 chấu', description: 'Chất liệu Cellulose Acetate nhập khẩu đánh bóng thủ công, giữ form bền bỉ và tôn nét thanh lịch cho khuôn mặt tròn.' },
      { id: 'PRD-03', sku: 'GK-TR9-055', name: 'Gọng TR90 siêu nhẹ cho học sinh', brand: 'FlexiKids', category: 'FRAME', price: 420000, cost: 190000, stock: 2, minStock: 5, trackStock: true, publishedOnWeb: true, shape: 'square', colorHex: '#1E3A8A', dims: '47-17-138', faces: ['Mặt tròn', 'Mặt dài'], tags: ['tr90', 'lightweight', 'square'], videoUrl: '', customPhotoUrl: '', specs: 'Nhựa dẻo TR90 · Xanh navy · Siêu bền', description: 'Nhựa dẻo đàn hồi TR90 chịu uốn tốt, an toàn cho học sinh và người hay vận động.' },
      { id: 'PRD-04', sku: 'GK-TIT-092', name: 'Gọng Titanium không viền doanh nhân', brand: 'Silhouette Lab', category: 'FRAME', price: 2150000, cost: 1200000, stock: 4, minStock: 2, trackStock: true, publishedOnWeb: true, shape: 'rimless', colorHex: '#64748B', dims: '53-18-145', faces: ['Mặt trái xoan', 'Mặt dài'], tags: ['titanium', 'lightweight', 'rimless'], videoUrl: 'https://example.com/video/gk-tit-092-360', customPhotoUrl: '', specs: 'Khoan ốc không viền · 8.5g siêu nhẹ', description: 'Thiết kế không viền tinh giản tối đa, trọng lượng chỉ 8.5g mang lại cảm giác đeo như không đeo.' },
      { id: 'PRD-05', sku: 'GK-MET-114', name: 'Gọng kim loại mảnh dáng đa giác vàng hồng', brand: 'Seoul Optic', category: 'FRAME', price: 690000, cost: 310000, stock: 9, minStock: 3, trackStock: true, publishedOnWeb: true, shape: 'round', colorHex: '#B45309', dims: '50-19-142', faces: ['Mặt tròn', 'Mặt vuông'], tags: ['metal', 'round'], videoUrl: '', customPhotoUrl: '', specs: 'Hợp kim mảnh · Vàng hồng · Đệm mũi silicon', description: 'Đường viền mảnh tinh tế màu vàng hồng trẻ trung, phù hợp công sở và sinh viên.' },
      { id: 'PRD-06', sku: 'GK-ACE-310', name: 'Gọng Acetate trong suốt dáng vuông trẻ trung', brand: 'Gentle Craft', category: 'FRAME', price: 890000, cost: 420000, stock: 6, minStock: 3, trackStock: true, publishedOnWeb: true, shape: 'square', colorHex: '#94A3B8', dims: '50-21-145', faces: ['Mặt tròn', 'Mặt trái xoan'], tags: ['acetate', 'square'], videoUrl: '', customPhotoUrl: '', specs: 'Acetate Crystal · Trong suốt khói', description: 'Tông trong suốt khói thời thượng, dễ phối mọi trang phục hàng ngày.' },
      { id: 'PRD-07', sku: 'GK-CAT-402', name: 'Gọng mắt mèo mảnh thanh lịch nữ', brand: 'Solis Studio', category: 'FRAME', price: 780000, cost: 360000, stock: 5, minStock: 2, trackStock: true, publishedOnWeb: true, shape: 'cateye', colorHex: '#7F1D1D', dims: '51-18-140', faces: ['Mặt tròn', 'Mặt vuông'], tags: ['acetate', 'cateye'], videoUrl: '', customPhotoUrl: '', specs: 'Acetate đỏ rượu vang · Tôn góc mặt', description: 'Dáng mắt mèo thanh thoát giúp nâng đường nét gương mặt.' },
      { id: 'PRD-08', sku: 'GK-TR9-128', name: 'Gọng thể thao ôm mặt chống trượt', brand: 'ActiveVision', category: 'FRAME', price: 650000, cost: 290000, stock: 8, minStock: 3, trackStock: true, publishedOnWeb: true, shape: 'square', colorHex: '#0F172A', dims: '54-17-142', faces: ['Mặt dài', 'Mặt vuông'], tags: ['tr90', 'lightweight', 'square'], videoUrl: '', customPhotoUrl: '', specs: 'Càng cao su chống trượt · Chơi thể thao', description: 'Đuôi càng bọc cao su chống trượt mồ hôi khi chạy bộ, đạp xe.' },
      { id: 'PRD-09', sku: 'KM-POL-881', name: 'Kính mát Polarized chống chói lái xe', brand: 'RayShield', category: 'SUNGLASSES', price: 1290000, cost: 640000, stock: 5, minStock: 2, trackStock: true, publishedOnWeb: true, shape: 'aviator', colorHex: '#18181B', dims: '58-14-145', faces: ['Mặt vuông', 'Mặt trái xoan'], tags: ['polarized'], videoUrl: '', customPhotoUrl: '', specs: 'UV400 · Polarized · Dáng Phi công', description: 'Tròng phân cực Polarized triệt tiêu ánh sáng phản xạ mặt đường khi lái xe nắng gắt.' },
      { id: 'PRD-10', sku: 'KM-URB-312', name: 'Kính mát thời trang dáng Cat-eye đen bóng', brand: 'Solis Studio', category: 'SUNGLASSES', price: 850000, cost: 410000, stock: 0, minStock: 2, trackStock: true, publishedOnWeb: true, shape: 'cateye', colorHex: '#111827', dims: '52-18-142', faces: ['Mặt tròn', 'Mặt trái xoan'], tags: ['cateye'], videoUrl: '', customPhotoUrl: '', specs: 'UV400 · Tạm hết — nhận đặt trước', description: 'Dáng kính mát thời trang chống tia UV400 tuyệt đối.' },
      { id: 'PRD-11', sku: 'KM-WAY-501', name: 'Kính mát dáng vuông cổ điển chống lóa', brand: 'Moscot Style', category: 'SUNGLASSES', price: 1150000, cost: 560000, stock: 6, minStock: 2, trackStock: true, publishedOnWeb: true, shape: 'square', colorHex: '#1F2937', dims: '52-20-145', faces: ['Mặt tròn', 'Mặt dài'], tags: ['square'], videoUrl: '', customPhotoUrl: '', specs: 'Tròng xanh rêu G15 · Chống tia UV400', description: 'Màu tròng G15 dịu mắt, giữ màu sắc tự nhiên ngoài trời.' },
      { id: 'PRD-12', sku: 'KM-CLIP-07', name: 'Gọng cận kèm Clip-on kính mát nam châm', brand: 'Seoul Optic', category: 'SUNGLASSES', price: 920000, cost: 440000, stock: 10, minStock: 3, trackStock: true, publishedOnWeb: true, shape: 'square', colorHex: '#334155', dims: '51-19-144', faces: ['Mặt tròn', 'Mặt trái xoan'], tags: ['tr90', 'photochromic'], videoUrl: '', customPhotoUrl: '', specs: '2 trong 1 · Hút nam châm Polarized', description: 'Giải pháp 2 trong 1 tiện lợi cho người cận thị hay di chuyển ngoài trời.' },
      { id: 'PRD-13', sku: 'TR-ESS-160B', name: 'Phôi tròng Essilor Crizal Rock 1.60 (Lọc ánh sáng xanh)', brand: 'Essilor', category: 'LENS_BLANK', price: 1650000, cost: 920000, stock: 14, minStock: 6, trackStock: true, publishedOnWeb: true, shape: 'lens', colorHex: '#0F766E', dims: 'Ø 70mm', faces: [], tags: ['blue_cut', 'index_160'], videoUrl: '', customPhotoUrl: '', specs: 'Chiết suất 1.60 · Hạn chế trầy · Blue UV', description: 'Lớp váng phủ Crizal Rock chống trầy xước vượt trội và lọc ánh sáng xanh tím có hại.' },
      { id: 'PRD-14', sku: 'TR-ESS-167R', name: 'Phôi tròng Essilor Crizal Rock 1.67 siêu mỏng', brand: 'Essilor', category: 'LENS_BLANK', price: 2450000, cost: 1420000, stock: 6, minStock: 4, trackStock: true, publishedOnWeb: true, shape: 'lens', colorHex: '#0F766E', dims: 'Ø 70mm', faces: [], tags: ['blue_cut', 'ultra_thin', 'index_167'], videoUrl: '', customPhotoUrl: '', specs: 'Chiết suất 1.67 · Phù hợp cận -3.50D trở lên', description: 'Siêu mỏng, giảm hiệu ứng thu nhỏ mắt cho người cận trung bình đến nặng.' },
      { id: 'PRD-15', sku: 'TR-CHE-160U', name: 'Phôi tròng Chemi U6 1.60 lọc ánh sáng xanh', brand: 'Chemi Korea', category: 'LENS_BLANK', price: 780000, cost: 360000, stock: 18, minStock: 6, trackStock: true, publishedOnWeb: true, shape: 'lens', colorHex: '#0284C7', dims: 'Ø 70mm', faces: [], tags: ['blue_cut', 'index_160'], videoUrl: '', customPhotoUrl: '', specs: 'Chiết suất 1.60 · Phổ thông bền đẹp', description: 'Lựa chọn tối ưu ngân sách từ Hàn Quốc với lớp phủ U6 ngăn ánh sáng xanh.' },
      { id: 'PRD-16', sku: 'TR-CHE-167P', name: 'Phôi tròng Chemi U6 1.67 siêu mỏng', brand: 'Chemi Korea', category: 'LENS_BLANK', price: 1150000, cost: 580000, stock: 4, minStock: 6, trackStock: true, publishedOnWeb: true, shape: 'lens', colorHex: '#0284C7', dims: 'Ø 70mm', faces: [], tags: ['blue_cut', 'ultra_thin', 'index_167'], videoUrl: '', customPhotoUrl: '', specs: 'Chiết suất 1.67 · Mỏng hơn 30% so với 1.56', description: 'Giải pháp tròng siêu mỏng tiết kiệm chi phí cho độ cận từ -3.00D.' },
      { id: 'PRD-17', sku: 'TR-ZES-160T', name: 'Phôi tròng đổi màu Zeiss PhotoFusion X 1.60', brand: 'Zeiss', category: 'LENS_BLANK', price: 2950000, cost: 1750000, stock: 2, minStock: 2, trackStock: true, publishedOnWeb: true, shape: 'lens', colorHex: '#475569', dims: 'Ø 70mm', faces: [], tags: ['photochromic', 'blue_cut', 'index_160'], videoUrl: '', customPhotoUrl: '', specs: 'Đổi màu xám khói · Nhanh chóng ra nắng', description: 'Công nghệ đổi màu thế hệ mới từ Đức, chuyển đậm ngoài trời nắng và trong suốt trong nhà.' },
      { id: 'PRD-18', sku: 'TR-HOY-174S', name: 'Phôi tròng Hoya Stellify 1.74 cực mỏng (Cận nặng)', brand: 'Hoya Japan', category: 'LENS_BLANK', price: 3400000, cost: 2050000, stock: 2, minStock: 2, trackStock: true, publishedOnWeb: true, shape: 'lens', colorHex: '#0F766E', dims: 'Ø 65mm', faces: [], tags: ['ultra_thin', 'blue_cut', 'index_174'], videoUrl: '', customPhotoUrl: '', specs: 'Chiết suất 1.74 · Phù hợp cận -6.00D trở lên', description: 'Chiết suất cao nhất 1.74 từ Nhật Bản giúp kính cận nặng trở nên mỏng nhẹ tinh tế.' },
      { id: 'PRD-19', sku: 'TR-KSC-159', name: 'Phôi tròng kiểm soát cận thị học sinh Stellest', brand: 'Essilor', category: 'LENS_BLANK', price: 4200000, cost: 2700000, stock: 3, minStock: 2, trackStock: true, publishedOnWeb: true, shape: 'lens', colorHex: '#0D9488', dims: 'Ø 70mm', faces: [], tags: ['myopia_control', 'blue_cut'], videoUrl: '', customPhotoUrl: '', specs: 'Công nghệ H.A.L.T · Giảm tốc độ tăng độ', description: 'Giải pháp lâm sàng giúp làm chậm tiến triển cận thị ở trẻ em và học sinh.' },
      { id: 'PRD-20', sku: 'PK-BOX-001', name: 'Hộp kính da cứng cao cấp + Khăn microfiber', brand: 'Minh Quang', category: 'ACCESSORY', price: 120000, cost: 45000, stock: 34, minStock: 10, trackStock: true, publishedOnWeb: false, shape: 'acc', colorHex: '#78716C', dims: '165×65mm', faces: [], tags: [], videoUrl: '', customPhotoUrl: '', specs: 'Tặng kèm đơn kính > 1tr hoặc bán lẻ', description: '' },
      { id: 'PRD-21', sku: 'PK-CLN-002', name: 'Dung dịch xịt rửa kính chống bám hơi nước 60ml', brand: 'Minh Quang', category: 'ACCESSORY', price: 65000, cost: 22000, stock: 28, minStock: 8, trackStock: true, publishedOnWeb: false, shape: 'acc', colorHex: '#0284C7', dims: '60ml', faces: [], tags: [], videoUrl: '', customPhotoUrl: '', specs: 'An toàn cho mọi lớp váng phủ', description: '' },
      { id: 'PRD-22', sku: 'VT-LO-OCVIT', name: 'Lô vật tư tiêu hao bàn kỹ thuật (Ốc, đệm mũi, miếng dán mài)', brand: 'Lab Supply', category: 'CONSUMABLE', price: 0, cost: 320000, stock: 6, minStock: 2, trackStock: true, publishedOnWeb: false, shape: 'acc', colorHex: '#64748B', dims: '1 Lô', faces: [], tags: [], videoUrl: '', customPhotoUrl: '', specs: 'Quản lý xuất lô định kỳ cho bàn Lab', description: '' },
      { id: 'PRD-23', sku: 'DV-CATLAP', name: 'Dịch vụ mài lắp tròng vào gọng khách mang tới', brand: 'Minh Quang Lab', category: 'SERVICE', price: 150000, cost: 0, stock: null, minStock: 0, trackStock: false, publishedOnWeb: false, shape: 'acc', colorHex: '#0F766E', dims: '—', faces: [], tags: [], videoUrl: '', customPhotoUrl: '', specs: 'Không quản lý tồn kho', description: '' },
      { id: 'PRD-24', sku: 'DV-DOMAT', name: 'Đo khúc xạ chuyên sâu & tư vấn thị lực', brand: 'Minh Quang', category: 'SERVICE', price: 0, cost: 0, stock: null, minStock: 0, trackStock: false, publishedOnWeb: false, shape: 'acc', colorHex: '#0F766E', dims: '—', faces: [], tags: [], videoUrl: '', customPhotoUrl: '', specs: 'Miễn phí tại cửa hàng', description: '' }
    ],

    customers: [
      { id: 'CUS-001', name: 'Nguyễn Minh Anh', phone: '0912345678', email: 'minhanh.ng@example.com', dob: '1994-06-14', gender: 'Nữ', address: '82 Hoàng Cầu, Đống Đa, Hà Nội', zaloLinked: true, zaloConsent: true, tier: 'Khách thân thiết (Gold)', familyGroup: 'Gia đình Minh Anh (2 thành viên)', notes: 'Nhạy cảm ánh sáng màn hình, thích gọng Titanium nhẹ không hằn sống mũi.', totalSpent: 4850000, createdAt: '2023-04-12' },
      { id: 'CUS-002', name: 'Trần Quốc Bảo', phone: '0987654321', email: 'quocbao.tr@example.com', dob: '1988-11-02', gender: 'Nam', address: '15 Láng Hạ, Ba Đình, Hà Nội', zaloLinked: true, zaloConsent: true, tier: 'Khách quen (Silver)', familyGroup: '', notes: 'Hay lái xe đường dài buổi tối, độ loạn cao trục ngang.', totalSpent: 3120000, createdAt: '2024-02-18' },
      { id: 'CUS-003', name: 'Bùi Thị Lan', phone: '0901000008', email: 'lan.bui@example.com', dob: '1997-08-25', gender: 'Nữ', address: '130 Cách Mạng Tháng 8, Đống Đa', zaloLinked: false, zaloConsent: false, tier: 'Khách mới', familyGroup: '', notes: 'Mang toa kính từ Bệnh viện Mắt TW tới cắt kính.', totalSpent: 2070000, createdAt: '2026-11-05' },
      { id: 'CUS-004', name: 'Phạm Đức Huy', phone: '0936778899', email: 'phuhuynh.huy@example.com', dob: '2012-09-10', gender: 'Nam', address: '82 Hoàng Cầu, Đống Đa, Hà Nội', zaloLinked: true, zaloConsent: true, tier: 'Khách thân thiết (Gold)', familyGroup: 'Gia đình Minh Anh (2 thành viên)', notes: 'Học sinh cấp 2, cần nhắc tái khám 6 tháng/lần.', totalSpent: 2150000, createdAt: '2023-09-01' },
      { id: 'CUS-005', name: 'Đặng Hoàng Minh', phone: '0945667788', email: 'hoangminh.d@example.com', dob: '1982-01-19', gender: 'Nam', address: '45 Nguyễn Chí Thanh, Hà Nội', zaloLinked: true, zaloConsent: true, tier: 'Khách quen (Silver)', familyGroup: '', notes: 'Bắt đầu có dấu hiệu lão thị nhẹ.', totalSpent: 3900000, createdAt: '2025-01-15' }
    ],

    examinations: [
      { id: 'EXM-2026-014', customerId: 'CUS-001', date: '2026-11-18', source: 'IN_STORE', optometrist: 'KTV Hoàng Nam', externalClinic: '', externalImageUrl: '', note: 'Tăng nhẹ 0.25D mắt phải so với 2025. Thị lực sau chỉnh 10/10.', prescription: { id: 'RX-2026-014', od: { sph: '-2.75', cyl: '-0.50', axis: '175', add: '', prism: '' }, os: { sph: '-2.25', cyl: '-0.25', axis: '10', add: '', prism: '' }, pd: '62', fittingHeight: '18mm' }, lensConfig: { id: 'LC-014', productId: 'PRD-13', lensName: 'Essilor Crizal Rock 1.60', index: '1.60', coating: 'Lọc ánh sáng xanh + Hạn chế trầy' } },
      { id: 'EXM-2025-088', customerId: 'CUS-001', date: '2025-05-10', source: 'IN_STORE', optometrist: 'KTV Hoàng Nam', externalClinic: '', externalImageUrl: '', note: 'Đo định kỳ 2025 — độ ổn định so với năm 2024.', prescription: { id: 'RX-2025-088', od: { sph: '-2.50', cyl: '-0.50', axis: '175', add: '', prism: '' }, os: { sph: '-2.25', cyl: '-0.25', axis: '10', add: '', prism: '' }, pd: '62', fittingHeight: '18mm' }, lensConfig: { id: 'LC-088', productId: 'PRD-13', lensName: 'Essilor Crizal Rock 1.60', index: '1.60', coating: 'Lọc ánh sáng xanh' } },
      { id: 'EXM-2024-042', customerId: 'CUS-001', date: '2024-04-20', source: 'IN_STORE', optometrist: 'KTV Hoàng Nam', externalClinic: '', externalImageUrl: '', note: 'Tăng 0.50D mắt phải và 0.25D mắt trái.', prescription: { id: 'RX-2024-042', od: { sph: '-2.25', cyl: '-0.25', axis: '175', add: '', prism: '' }, os: { sph: '-2.00', cyl: '-0.25', axis: '10', add: '', prism: '' }, pd: '62', fittingHeight: '18mm' }, lensConfig: { id: 'LC-042', productId: 'PRD-15', lensName: 'Chemi U6 1.60', index: '1.60', coating: 'Chống phản quang' } },
      { id: 'EXM-2023-011', customerId: 'CUS-001', date: '2023-04-12', source: 'IN_STORE', optometrist: 'KTV Minh Tâm', externalClinic: '', externalImageUrl: '', note: 'Lần đo đầu tiên tại Minh Quang.', prescription: { id: 'RX-2023-011', od: { sph: '-1.75', cyl: '-0.25', axis: '180', add: '', prism: '' }, os: { sph: '-1.75', cyl: '0.00', axis: '0', add: '', prism: '' }, pd: '61.5', fittingHeight: '18mm' }, lensConfig: { id: 'LC-011', productId: 'PRD-15', lensName: 'Chemi U6 1.60', index: '1.60', coating: 'Tiêu chuẩn' } },
      { id: 'EXM-2026-012', customerId: 'CUS-002', date: '2026-11-17', source: 'IN_STORE', optometrist: 'KTV Hoàng Nam', externalClinic: '', externalImageUrl: '', note: 'Khách cần tròng siêu mỏng 1.67 chống chói lái xe.', prescription: { id: 'RX-2026-012', od: { sph: '-4.25', cyl: '-1.25', axis: '180', add: '', prism: '' }, os: { sph: '-4.00', cyl: '-1.00', axis: '175', add: '', prism: '' }, pd: '65', fittingHeight: '19mm' }, lensConfig: { id: 'LC-012', productId: 'PRD-16', lensName: 'Chemi U6 1.67 siêu mỏng', index: '1.67', coating: 'Chống chói lái xe' } },
      { id: 'EXM-2025-021', customerId: 'CUS-002', date: '2025-02-14', source: 'IN_STORE', optometrist: 'KTV Hoàng Nam', externalClinic: '', externalImageUrl: '', note: 'Đo kiểm tra định kỳ năm 2025.', prescription: { id: 'RX-2025-021', od: { sph: '-4.00', cyl: '-1.00', axis: '180', add: '', prism: '' }, os: { sph: '-3.75', cyl: '-1.00', axis: '175', add: '', prism: '' }, pd: '65', fittingHeight: '19mm' }, lensConfig: { id: 'LC-021', productId: 'PRD-16', lensName: 'Chemi U6 1.67 siêu mỏng', index: '1.67', coating: 'Chống phản quang' } },
      { id: 'EXM-2026-011', customerId: 'CUS-003', date: '2026-11-05', source: 'EXTERNAL_RX', optometrist: 'Tiếp nhận: Thu ngân Lan', externalClinic: 'Bệnh viện Mắt Trung Ương', externalImageUrl: '', note: 'Toa bên ngoài BV Mắt TW, đã đo bổ sung PD 60mm.', prescription: { id: 'RX-2026-011', od: { sph: '-1.75', cyl: '0.00', axis: '0', add: '', prism: '' }, os: { sph: '-1.50', cyl: '-0.25', axis: '90', add: '', prism: '' }, pd: '60', fittingHeight: '17mm' }, lensConfig: { id: 'LC-011B', productId: 'PRD-13', lensName: 'Essilor Crizal Rock 1.60', index: '1.60', coating: 'Lọc ánh sáng xanh' } }
    ],

    orders: [
      { id: 'ORD-2611-001', date: '2026-11-18 10:15', customerId: 'CUS-001', status: 'CONFIRMED', subtotal: 3100000, discount: 150000, total: 2950000, items: [{ productId: 'PRD-01', name: 'Gọng Titanium Nhật Bản dáng tròn mảnh', qty: 1, price: 1450000, isCustomEyewear: true }, { productId: 'PRD-13', name: 'Phôi tròng Essilor Crizal Rock 1.60', qty: 1, price: 1650000, isCustomEyewear: true }], payments: [{ id: 'PAY-001', date: '2026-11-18 10:18', method: 'BANK_TRANSFER', type: 'DEPOSIT', amount: 1500000, confirmedBy: 'Thu ngân Lan', verified: true }] },
      { id: 'ORD-2611-002', date: '2026-11-17 15:40', customerId: 'CUS-002', status: 'CONFIRMED', subtotal: 2130000, discount: 0, total: 2130000, items: [{ productId: 'PRD-02', name: 'Gọng Acetate đồi mồi dáng vuông cổ điển', qty: 1, price: 980000, isCustomEyewear: true }, { productId: 'PRD-16', name: 'Phôi tròng Chemi U6 1.67 siêu mỏng', qty: 1, price: 1150000, isCustomEyewear: true }], payments: [{ id: 'PAY-002', date: '2026-11-17 15:42', method: 'CASH', type: 'DEPOSIT', amount: 1000000, confirmedBy: 'Chủ cửa hàng', verified: true }] },
      { id: 'ORD-2611-003', date: '2026-11-16 11:05', customerId: 'CUS-003', status: 'COMPLETED', subtotal: 2300000, discount: 0, total: 2300000, items: [{ productId: 'PRD-08', name: 'Gọng thể thao ôm mặt chống trượt', qty: 1, price: 650000, isCustomEyewear: true }, { productId: 'PRD-13', name: 'Phôi tròng Essilor Crizal Rock 1.60', qty: 1, price: 1650000, isCustomEyewear: true }], payments: [{ id: 'PAY-003', date: '2026-11-16 11:08', method: 'CASH', type: 'DEPOSIT', amount: 1000000, confirmedBy: 'Thu ngân Lan', verified: true }, { id: 'PAY-004', date: '2026-11-17 17:20', method: 'BANK_TRANSFER', type: 'FINAL', amount: 1300000, confirmedBy: 'Thu ngân Lan', verified: true }] }
    ],

    productionJobs: [
      { id: 'JOB-2611-001', orderId: 'ORD-2611-001', customerId: 'CUS-001', eyewearId: 'EYW-2611-01', frameName: 'Gọng Titanium Nhật Bản dáng tròn mảnh', lensProductId: 'PRD-13', lensConfigSummary: 'Essilor Crizal Rock 1.60 · Lọc ánh sáng xanh', rxSummary: 'OD -2.75/-0.50×175 · OS -2.25/-0.25×10 · PD 62', stage: 'CUT_MOUNT', technician: 'KTV Tuấn Anh', dueDate: '2026-11-19 17:00', reworkCount: 0, qcChecklist: { pdMatch: true, powerMatch: true, noScratch: false, frameAligned: false }, notes: 'Ưu tiên mài rãnh mảnh cho gọng Titanium.' },
      { id: 'JOB-2611-002', orderId: 'ORD-2611-002', customerId: 'CUS-002', eyewearId: 'EYW-2611-02', frameName: 'Gọng Acetate đồi mồi dáng vuông cổ điển', lensProductId: 'PRD-16', lensConfigSummary: 'Chemi U6 1.67 siêu mỏng · Chống chói lái xe', rxSummary: 'OD -4.25/-1.25×180 · OS -4.00/-1.00×175 · PD 65', stage: 'QC', technician: 'KTV Tuấn Anh', dueDate: '2026-11-19 14:00', reworkCount: 1, qcChecklist: { pdMatch: true, powerMatch: true, noScratch: true, frameAligned: false }, notes: 'Đã mài lại 1 phôi mắt phải do lệch trục 2°.' },
      { id: 'JOB-2611-003', orderId: 'ORD-2611-003', customerId: 'CUS-003', eyewearId: 'EYW-2611-03', frameName: 'Gọng thể thao ôm mặt chống trượt', lensProductId: 'PRD-13', lensConfigSummary: 'Essilor Crizal Rock 1.60 · Toa BV Mắt TW', rxSummary: 'OD -1.75 · OS -1.50/-0.25×90 · PD 60', stage: 'READY', technician: 'KTV Hoàng Nam', dueDate: '2026-11-19 16:00', reworkCount: 0, qcChecklist: { pdMatch: true, powerMatch: true, noScratch: true, frameAligned: true }, notes: 'Đạt QC 4/4 — sẵn sàng bàn giao.' }
    ],

    eyewearUnits: [
      { id: 'EYW-2611-01', customerId: 'CUS-001', orderId: 'ORD-2611-001', jobId: 'JOB-2611-001', rxId: 'RX-2026-014', frameName: 'Gọng Titanium Nhật Bản dáng tròn mảnh', lensName: 'Essilor Crizal Rock 1.60', purchaseDate: '2026-11-18', warrantyUntil: '2027-11-18', status: 'IN_LAB' },
      { id: 'EYW-2025-09', customerId: 'CUS-001', orderId: 'ORD-2505-041', jobId: 'JOB-2505-041', rxId: 'RX-2025-088', frameName: 'Gọng Acetate nâu trà dáng tròn', lensName: 'Essilor Crizal Rock 1.60', purchaseDate: '2025-05-10', warrantyUntil: '2026-05-10', status: 'HANDED_OVER' },
      { id: 'EYW-2611-02', customerId: 'CUS-002', orderId: 'ORD-2611-002', jobId: 'JOB-2611-002', rxId: 'RX-2026-012', frameName: 'Gọng Acetate đồi mồi dáng vuông cổ điển', lensName: 'Chemi U6 1.67 siêu mỏng', purchaseDate: '2026-11-17', warrantyUntil: '2027-11-17', status: 'IN_LAB' },
      { id: 'EYW-2611-03', customerId: 'CUS-003', orderId: 'ORD-2611-003', jobId: 'JOB-2611-003', rxId: 'RX-2026-011', frameName: 'Gọng thể thao ôm mặt chống trượt', lensName: 'Essilor Crizal Rock 1.60', purchaseDate: '2026-11-16', warrantyUntil: '2027-11-16', status: 'READY' }
    ],

    inventoryTransactions: [
      { id: 'INV-001', date: '2026-11-15 09:00', productId: 'PRD-13', type: 'INBOUND', qty: +20, ref: 'PO-ESS-1115', note: 'Nhập lô phôi Essilor 1.60 từ NPP Miền Bắc' },
      { id: 'INV-002', date: '2026-11-16 11:10', productId: 'PRD-08', type: 'SALE_OUT', qty: -1, ref: 'ORD-2611-003', note: 'Xuất bán gọng thể thao cho đơn ORD-2611-003' },
      { id: 'INV-003', date: '2026-11-17 16:00', productId: 'PRD-16', type: 'LAB_CONSUME', qty: -1, ref: 'JOB-2611-002', note: 'Xuất phôi Chemi 1.67 cho phiếu JOB-2611-002' },
      { id: 'INV-004', date: '2026-11-18 08:45', productId: 'PRD-16', type: 'LAB_SPOILAGE', qty: -1, ref: 'JOB-2611-002', note: 'Mài hỏng 1 mắt phải — Rework #1' },
      { id: 'INV-005', date: '2026-11-18 10:20', productId: 'PRD-01', type: 'SALE_OUT', qty: -1, ref: 'ORD-2611-001', note: 'Xuất gọng Titanium cho đơn ORD-2611-001' }
    ],

    warranties: [
      { id: 'WRT-001', date: '2026-11-19', customerId: 'CUS-003', eyewearId: 'EYW-2611-03', issueType: 'Chỉnh gọng ôm thái dương', coverage: 'Miễn phí trọn đời', status: 'OPEN', fee: 0, note: 'Kính hơi chật ở thái dương, khách xin chỉnh lại.' },
      { id: 'WRT-002', date: '2026-11-14', customerId: 'CUS-001', eyewearId: 'EYW-2025-09', issueType: 'Thay đệm mũi & vệ sinh siêu âm', coverage: 'Miễn phí trọn đời', status: 'COMPLETED', fee: 0, note: 'Đã vệ sinh sóng siêu âm và thay cặp đệm mũi silicon.' }
    ],

    appointments: [
      { id: 'APT-001', createdAt: '2026-11-19 08:30', customerName: 'Nguyễn Minh Anh', phone: '0912345678', type: 'APPOINTMENT', scheduledAt: '2026-11-19 17:30', productRef: 'Nhận kính mới + Kiểm tra độ êm', status: 'CONFIRMED', source: 'WEBSITE' },
      { id: 'APT-002', createdAt: '2026-11-19 09:50', customerName: 'Đỗ Hoàng Long', phone: '0978223344', type: 'ORDER_INQUIRY', scheduledAt: '2026-11-20 10:00', productRef: 'Phôi tròng đổi màu Zeiss PhotoFusion X 1.60', status: 'PENDING', source: 'WEBSITE' }
    ],

    automationRules: [
      { id: 'AUTO-01', name: 'Hỏi thăm thích nghi kính mới', trigger: 'Sau bàn giao kính 7 ngày', channel: 'Zalo OA', enabled: true, template: 'Chào {{name}}, sau 7 ngày đeo kính mới bạn thấy có êm mắt không? Cần cân chỉnh gọng miễn phí hãy ghé 148 Xã Đàn nhé!' },
      { id: 'AUTO-02', name: 'Nhắc tái khám định kỳ 6 tháng', trigger: 'Sau lần đo mắt gần nhất 180 ngày', channel: 'Zalo OA', enabled: true, template: 'Chào {{name}}, đã 6 tháng từ lần đo mắt gần nhất. Đặt lịch kiểm tra thị lực miễn phí cùng KTV Minh Quang nhé!' },
      { id: 'AUTO-03', name: 'Nhắc lịch hẹn tự động', trigger: 'Trước giờ hẹn 2 tiếng', channel: 'Zalo OA', enabled: true, template: 'Nhắc lịch hẹn của bạn tại Minh Quang Optical lúc {{time}} hôm nay.' },
      { id: 'AUTO-04', name: 'Thông báo hoàn tất gia công Lab', trigger: 'Ngay khi QC đạt 4/4 (READY)', channel: 'Zalo OA', enabled: true, template: 'Bộ kính {{frame}} của bạn đã hoàn tất QC và sẵn sàng bàn giao!' }
    ],

    zaloOutbox: [
      { id: 'ZLO-001', time: '2026-11-18 10:19', customerName: 'Nguyễn Minh Anh', phone: '0912345678', event: 'ORDER_DEPOSIT_CONFIRMED', status: 'DELIVERED', message: 'Minh Quang Optical xác nhận cọc 1.500.000đ cho đơn ORD-2611-001.' },
      { id: 'ZLO-002', time: '2026-11-18 16:05', customerName: 'Bùi Thị Lan', phone: '0901000008', event: 'LAB_JOB_READY', status: 'FAILED_NO_LINK', message: 'Kính mã JOB-2611-003 đã hoàn tất QC và sẵn sàng bàn giao. (Lỗi: Khách chưa liên kết Zalo OA)' }
    ]
  };
};
