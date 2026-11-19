// Seed Data cho Kính Mắt Minh Quang — Interactive Prototype (P00A)
// Toàn bộ dữ liệu phản ánh đúng các bất biến miền trong product_brief.md

window.OPTIC_SEED = function createOpticSeed() {
  return {
    role: 'OWNER_ADMIN',
    activeSurface: 'store',
    activeStoreView: 'pos',
    activePublicView: 'storefront',
    portalCustomerId: 'CUS-001',

    // 4 nhóm hàng + Dịch vụ (không quản lý tồn) theo product_brief.md §7.3
    products: [
      { id: 'PRD-01', sku: 'GK-TITAN-018', name: 'Gọng Titanium Nhật Bản dáng tròn mảnh', brand: 'Matsuda Craft', category: 'FRAME', price: 1450000, cost: 780000, stock: 7, minStock: 3, trackStock: true, specs: 'Titanium 12g · Size 49-20-145 · Đen mờ' },
      { id: 'PRD-02', sku: 'GK-ACET-204', name: 'Gọng Acetate đồi mồi dáng vuông cổ điển', brand: 'Moscot Style', category: 'FRAME', price: 980000, cost: 490000, stock: 11, minStock: 4, trackStock: true, specs: 'Acetate Ý · Size 51-19-145 · Đồi mồi' },
      { id: 'PRD-03', sku: 'GK-TR90-055', name: 'Gọng TR90 siêu nhẹ cho học sinh', brand: 'FlexiKids', category: 'FRAME', price: 420000, cost: 190000, stock: 2, minStock: 5, trackStock: true, specs: 'Nhựa dẻo TR90 · Size 47-17-138 · Xanh navy' },
      { id: 'PRD-04', sku: 'KM-POL-881', name: 'Kính mát Polarized chống chói lái xe', brand: 'RayShield', category: 'SUNGLASSES', price: 1290000, cost: 640000, stock: 5, minStock: 2, trackStock: true, specs: 'UV400 · Polarized · Gọng hợp kim' },
      { id: 'PRD-05', sku: 'KM-URB-312', name: 'Kính mát thời trang dáng Cat-eye', brand: 'Solis Studio', category: 'SUNGLASSES', price: 850000, cost: 410000, stock: 0, minStock: 2, trackStock: true, specs: 'UV400 · Đen bóng (Tạm hết — nhận đặt trước)' },
      { id: 'PRD-06', sku: 'TR-ESS-160B', name: 'Phôi tròng Essilor Crizal Rock 1.60 (Chống ánh sáng xanh)', brand: 'Essilor', category: 'LENS_BLANK', price: 1650000, cost: 920000, stock: 14, minStock: 6, trackStock: true, specs: 'Chiết suất 1.60 · Hạn chế trầy · Lọc ánh sáng xanh' },
      { id: 'PRD-07', sku: 'TR-CHE-167P', name: 'Phôi tròng Chemi U6 1.67 siêu mỏng', brand: 'Chemi Korea', category: 'LENS_BLANK', price: 1150000, cost: 580000, stock: 4, minStock: 6, trackStock: true, specs: 'Chiết suất 1.67 · Phù hợp độ cao > -4.00D' },
      { id: 'PRD-08', sku: 'TR-ZES-160T', name: 'Phôi tròng đổi màu Zeiss PhotoFusion X 1.60', brand: 'Zeiss', category: 'LENS_BLANK', price: 2950000, cost: 1750000, stock: 0, minStock: 2, trackStock: true, specs: 'Đổi màu xám khói · Đặt phôi hãng 2–3 ngày' },
      { id: 'PRD-09', sku: 'PK-BOX-001', name: 'Hộp kính da cứng cao cấp + Khăn microfiber', brand: 'Minh Quang', category: 'ACCESSORY', price: 120000, cost: 45000, stock: 34, minStock: 10, trackStock: true, specs: 'Tặng kèm đơn kính > 1tr hoặc bán lẻ' },
      { id: 'PRD-10', sku: 'VT-LO-OCVIT', name: 'Lô vật tư tiêu hao bàn kỹ thuật (Ốc, đệm mũi, miếng dán mài)', brand: 'Lab Supply', category: 'CONSUMABLE', price: 0, cost: 320000, stock: 6, minStock: 2, trackStock: true, specs: 'Quản lý xuất lô định kỳ cho bàn Lab' },
      { id: 'PRD-11', sku: 'DV-CATLAP', name: 'Dịch vụ mài lắp tròng vào gọng khách mang tới', brand: 'Minh Quang Lab', category: 'SERVICE', price: 150000, cost: 0, stock: null, minStock: 0, trackStock: false, specs: 'Không quản lý tồn kho' },
      { id: 'PRD-12', sku: 'DV-DOMAT', name: 'Đo khúc xạ chuyên sâu & tư vấn thị lực', brand: 'Minh Quang', category: 'SERVICE', price: 0, cost: 0, stock: null, minStock: 0, trackStock: false, specs: 'Miễn phí tại cửa hàng' }
    ],

    customers: [
      {
        id: 'CUS-001',
        name: 'Nguyễn Minh Anh',
        phone: '0912345678',
        dob: '1994-06-14',
        zaloLinked: true,
        zaloConsent: true,
        tier: 'Khách thân thiết (Gold)',
        familyGroup: 'Gia đình Minh Anh (2 thành viên)',
        notes: 'Nhạy cảm ánh sáng màn hình, thích gọng Titanium nhẹ không hằn sống mũi.',
        totalSpent: 4850000
      },
      {
        id: 'CUS-002',
        name: 'Trần Quốc Bảo',
        phone: '0987654321',
        dob: '1988-11-02',
        zaloLinked: true,
        zaloConsent: true,
        tier: 'Khách quen (Silver)',
        familyGroup: '',
        notes: 'Hay lái xe đường dài buổi tối, độ loạn cao trục ngang.',
        totalSpent: 3120000
      },
      {
        id: 'CUS-003',
        name: 'Lê Thu Hà',
        phone: '0904112233',
        dob: '2001-03-22',
        zaloLinked: false,
        zaloConsent: false,
        tier: 'Khách mới',
        familyGroup: '',
        notes: 'Mang đơn đo từ Bệnh viện Mắt TW tới cắt kính.',
        totalSpent: 1570000
      },
      {
        id: 'CUS-004',
        name: 'Phạm Đức Huy',
        phone: '0936778899',
        dob: '2012-09-10',
        zaloLinked: true,
        zaloConsent: true,
        tier: 'Khách thân thiết (Gold)',
        familyGroup: 'Gia đình Minh Anh (2 thành viên)',
        notes: 'Học sinh cấp 2, cần nhắc tái khám 6 tháng/lần kiểm soát tiến triển cận.',
        totalSpent: 2150000
      }
    ],

    // Tách biệt rõ 3 thực thể: EyeExamination -> Prescription -> LensConfiguration
    examinations: [
      {
        id: 'EXM-2026-014',
        customerId: 'CUS-001',
        date: '2026-11-18',
        source: 'IN_STORE',
        optometrist: 'KTV Hoàng Nam',
        externalClinic: '',
        externalImageUrl: '',
        note: 'Tăng nhẹ 0.25D mắt phải so với năm 2025 do làm việc máy tính nhiều.',
        prescription: {
          id: 'RX-2026-014',
          od: { sph: '-2.75', cyl: '-0.50', axis: '175', add: '', prism: '' },
          os: { sph: '-2.25', cyl: '-0.25', axis: '10', add: '', prism: '' },
          pd: '62',
          fittingHeight: '18mm'
        },
        lensConfig: {
          id: 'LC-014',
          productId: 'PRD-06',
          lensName: 'Essilor Crizal Rock 1.60',
          index: '1.60',
          coating: 'Chống ánh sáng xanh + Hạn chế trầy',
          tint: 'Trong suốt'
        }
      },
      {
        id: 'EXM-2025-088',
        customerId: 'CUS-001',
        date: '2025-05-10',
        source: 'IN_STORE',
        optometrist: 'KTV Hoàng Nam',
        externalClinic: '',
        externalImageUrl: '',
        note: 'Đo định kỳ 2025 — thị lực chỉnh kính 10/10 hai mắt.',
        prescription: {
          id: 'RX-2025-088',
          od: { sph: '-2.50', cyl: '-0.50', axis: '175', add: '', prism: '' },
          os: { sph: '-2.25', cyl: '-0.25', axis: '10', add: '', prism: '' },
          pd: '62',
          fittingHeight: '18mm'
        },
        lensConfig: {
          id: 'LC-088',
          productId: 'PRD-06',
          lensName: 'Essilor Crizal Rock 1.60',
          index: '1.60',
          coating: 'Chống ánh sáng xanh',
          tint: 'Trong suốt'
        }
      },
      {
        id: 'EXM-2026-012',
        customerId: 'CUS-002',
        date: '2026-11-17',
        source: 'IN_STORE',
        optometrist: 'KTV Hoàng Nam',
        externalClinic: '',
        externalImageUrl: '',
        note: 'Khách cần tròng siêu mỏng 1.67 chống chói đèn pha ban đêm.',
        prescription: {
          id: 'RX-2026-012',
          od: { sph: '-4.25', cyl: '-1.25', axis: '180', add: '', prism: '' },
          os: { sph: '-4.00', cyl: '-1.00', axis: '175', add: '', prism: '' },
          pd: '65',
          fittingHeight: '19mm'
        },
        lensConfig: {
          id: 'LC-012',
          productId: 'PRD-07',
          lensName: 'Chemi U6 1.67 siêu mỏng',
          index: '1.67',
          coating: 'Chống chói lái xe (Drive)',
          tint: 'Trong suốt'
        }
      },
      {
        id: 'EXM-2026-011',
        customerId: 'CUS-003',
        date: '2026-11-16',
        source: 'EXTERNAL_RX',
        optometrist: 'Tiếp nhận: Thu ngân Lan',
        externalClinic: 'Bệnh viện Mắt Trung Ương',
        externalImageUrl: '',
        note: 'Khách mang phiếu đo bệnh viện, đã đối chiếu lại PD tại quầy.',
        prescription: {
          id: 'RX-2026-011',
          od: { sph: '-1.75', cyl: '0.00', axis: '0', add: '', prism: '' },
          os: { sph: '-1.50', cyl: '-0.25', axis: '90', add: '', prism: '' },
          pd: '60',
          fittingHeight: '17mm'
        },
        lensConfig: {
          id: 'LC-011',
          productId: 'PRD-06',
          lensName: 'Essilor Crizal Rock 1.60',
          index: '1.60',
          coating: 'Chống ánh sáng xanh',
          tint: 'Trong suốt'
        }
      }
    ],

    // Đơn hàng & Thanh toán độc lập (§7.1 & §7.4)
    orders: [
      {
        id: 'ORD-2611-001',
        date: '2026-11-18 10:15',
        customerId: 'CUS-001',
        status: 'CONFIRMED',
        subtotal: 3100000,
        discount: 150000,
        total: 2950000,
        items: [
          { productId: 'PRD-01', name: 'Gọng Titanium Nhật Bản dáng tròn mảnh', qty: 1, price: 1450000, isCustomEyewear: true },
          { productId: 'PRD-06', name: 'Phôi tròng Essilor Crizal Rock 1.60', qty: 1, price: 1650000, isCustomEyewear: true }
        ],
        payments: [
          { id: 'PAY-001', date: '2026-11-18 10:18', method: 'BANK_TRANSFER', type: 'DEPOSIT', amount: 1500000, confirmedBy: 'Thu ngân Lan', verified: true }
        ]
      },
      {
        id: 'ORD-2611-002',
        date: '2026-11-17 15:40',
        customerId: 'CUS-002',
        status: 'CONFIRMED',
        subtotal: 2130000,
        discount: 0,
        total: 2130000,
        items: [
          { productId: 'PRD-02', name: 'Gọng Acetate đồi mồi dáng vuông cổ điển', qty: 1, price: 980000, isCustomEyewear: true },
          { productId: 'PRD-07', name: 'Phôi tròng Chemi U6 1.67 siêu mỏng', qty: 1, price: 1150000, isCustomEyewear: true }
        ],
        payments: [
          { id: 'PAY-002', date: '2026-11-17 15:42', method: 'CASH', type: 'DEPOSIT', amount: 1000000, confirmedBy: 'Chủ cửa hàng', verified: true }
        ]
      },
      {
        id: 'ORD-2611-003',
        date: '2026-11-16 11:05',
        customerId: 'CUS-003',
        status: 'COMPLETED',
        subtotal: 2070000,
        discount: 0,
        total: 2070000,
        items: [
          { productId: 'PRD-03', name: 'Gọng TR90 siêu nhẹ cho học sinh', qty: 1, price: 420000, isCustomEyewear: true },
          { productId: 'PRD-06', name: 'Phôi tròng Essilor Crizal Rock 1.60', qty: 1, price: 1650000, isCustomEyewear: true }
        ],
        payments: [
          { id: 'PAY-003', date: '2026-11-16 11:08', method: 'CASH', type: 'DEPOSIT', amount: 1000000, confirmedBy: 'Thu ngân Lan', verified: true },
          { id: 'PAY-004', date: '2026-11-17 17:20', method: 'BANK_TRANSFER', type: 'FINAL', amount: 1070000, confirmedBy: 'Thu ngân Lan', verified: true }
        ]
      }
    ],

    // Phiếu gia công tách biệt khỏi Đơn hàng (§7.1)
    // Stages: CONFIRMED | PREP | CUT_MOUNT | QC | READY | HANDED_OVER
    productionJobs: [
      {
        id: 'JOB-2611-001',
        orderId: 'ORD-2611-001',
        customerId: 'CUS-001',
        eyewearId: 'EYW-2611-01',
        frameName: 'Gọng Titanium Nhật Bản dáng tròn mảnh',
        lensProductId: 'PRD-06',
        lensConfigSummary: 'Essilor Crizal Rock 1.60 · Lọc ánh sáng xanh',
        rxSummary: 'OD -2.75/-0.50×175 · OS -2.25/-0.25×10 · PD 62',
        stage: 'CUT_MOUNT',
        technician: 'KTV Tuấn Anh',
        dueDate: '2026-11-19 17:00',
        reworkCount: 0,
        qcChecklist: {
          pdMatch: true,
          powerMatch: true,
          noScratch: false,
          frameAligned: false
        },
        notes: 'Ưu tiên mài rãnh mảnh cho gọng Titanium.'
      },
      {
        id: 'JOB-2611-002',
        orderId: 'ORD-2611-002',
        customerId: 'CUS-002',
        eyewearId: 'EYW-2611-02',
        frameName: 'Gọng Acetate đồi mồi dáng vuông cổ điển',
        lensProductId: 'PRD-07',
        lensConfigSummary: 'Chemi U6 1.67 siêu mỏng · Chống chói lái xe',
        rxSummary: 'OD -4.25/-1.25×180 · OS -4.00/-1.00×175 · PD 65',
        stage: 'QC',
        technician: 'KTV Tuấn Anh',
        dueDate: '2026-11-19 14:00',
        reworkCount: 1,
        qcChecklist: {
          pdMatch: true,
          powerMatch: true,
          noScratch: true,
          frameAligned: false
        },
        notes: 'Đã mài lại 1 phôi mắt phải do lệch trục 2° ở lần cắt đầu.'
      },
      {
        id: 'JOB-2611-003',
        orderId: 'ORD-2611-003',
        customerId: 'CUS-003',
        eyewearId: 'EYW-2611-03',
        frameName: 'Gọng TR90 siêu nhẹ cho học sinh',
        lensProductId: 'PRD-06',
        lensConfigSummary: 'Essilor Crizal Rock 1.60 · Đơn BV Mắt TW',
        rxSummary: 'OD -1.75 · OS -1.50/-0.25×90 · PD 60',
        stage: 'READY',
        technician: 'KTV Hoàng Nam',
        dueDate: '2026-11-18 16:00',
        reworkCount: 0,
        qcChecklist: {
          pdMatch: true,
          powerMatch: true,
          noScratch: true,
          frameAligned: true
        },
        notes: 'Đạt QC 4/4 — đã thông báo khách đến nhận.'
      }
    ],

    // Vòng đời từng bộ kính (§7.2)
    eyewearUnits: [
      {
        id: 'EYW-2611-01',
        customerId: 'CUS-001',
        orderId: 'ORD-2611-001',
        jobId: 'JOB-2611-001',
        rxId: 'RX-2026-014',
        frameName: 'Gọng Titanium Nhật Bản dáng tròn mảnh',
        lensName: 'Essilor Crizal Rock 1.60',
        purchaseDate: '2026-11-18',
        warrantyUntil: '2027-11-18',
        status: 'IN_LAB'
      },
      {
        id: 'EYW-2025-09',
        customerId: 'CUS-001',
        orderId: 'ORD-2505-041',
        jobId: 'JOB-2505-041',
        rxId: 'RX-2025-088',
        frameName: 'Gọng Acetate nâu trà dáng tròn',
        lensName: 'Essilor Crizal Rock 1.60',
        purchaseDate: '2025-05-10',
        warrantyUntil: '2026-05-10',
        status: 'HANDED_OVER'
      },
      {
        id: 'EYW-2611-02',
        customerId: 'CUS-002',
        orderId: 'ORD-2611-002',
        jobId: 'JOB-2611-002',
        rxId: 'RX-2026-012',
        frameName: 'Gọng Acetate đồi mồi dáng vuông cổ điển',
        lensName: 'Chemi U6 1.67 siêu mỏng',
        purchaseDate: '2026-11-17',
        warrantyUntil: '2027-11-17',
        status: 'IN_LAB'
      },
      {
        id: 'EYW-2611-03',
        customerId: 'CUS-003',
        orderId: 'ORD-2611-003',
        jobId: 'JOB-2611-003',
        rxId: 'RX-2026-011',
        frameName: 'Gọng TR90 siêu nhẹ cho học sinh',
        lensName: 'Essilor Crizal Rock 1.60',
        purchaseDate: '2026-11-16',
        warrantyUntil: '2027-11-16',
        status: 'READY'
      }
    ],

    // Sổ giao dịch kho bất biến (§7.3)
    inventoryTransactions: [
      { id: 'INV-001', date: '2026-11-15 09:00', productId: 'PRD-06', type: 'INBOUND', qty: +20, ref: 'PO-ESS-1115', note: 'Nhập lô phôi Essilor 1.60 từ NPP Miền Bắc' },
      { id: 'INV-002', date: '2026-11-16 11:10', productId: 'PRD-03', type: 'SALE_OUT', qty: -1, ref: 'ORD-2611-003', note: 'Xuất bán gọng TR90 cho đơn ORD-2611-003' },
      { id: 'INV-003', date: '2026-11-17 16:00', productId: 'PRD-07', type: 'LAB_CONSUME', qty: -1, ref: 'JOB-2611-002', note: 'Xuất phôi Chemi 1.67 cho phiếu gia công JOB-2611-002' },
      { id: 'INV-004', date: '2026-11-18 08:45', productId: 'PRD-07', type: 'LAB_SPOILAGE', qty: -1, ref: 'JOB-2611-002', note: 'Mài hỏng 1 mắt phải do lệch trục — ghi nhận Rework #1' },
      { id: 'INV-005', date: '2026-11-18 10:20', productId: 'PRD-01', type: 'SALE_OUT', qty: -1, ref: 'ORD-2611-001', note: 'Xuất gọng Titanium cho đơn ORD-2611-001' }
    ],

    // Bảo hành & Sửa chữa
    warranties: [
      { id: 'WRT-001', date: '2026-11-14', customerId: 'CUS-001', eyewearId: 'EYW-2025-09', issueType: 'Chỉnh gọng & Thay đệm mũi', coverage: 'Miễn phí trọn đời', status: 'COMPLETED', fee: 0, note: 'Đã vệ sinh sóng siêu âm và thay cặp đệm mũi silicon mới.' }
    ],

    // Lịch hẹn & Yêu cầu mua hàng từ Website
    appointments: [
      { id: 'APT-001', createdAt: '2026-11-19 08:30', customerName: 'Nguyễn Minh Anh', phone: '0912345678', type: 'APPOINTMENT', scheduledAt: '2026-11-19 17:30', productRef: 'Nhận kính mới + Kiểm tra độ êm', status: 'CONFIRMED', source: 'WEBSITE' },
      { id: 'APT-002', createdAt: '2026-11-19 09:50', customerName: 'Đỗ Hoàng Long', phone: '0978223344', type: 'ORDER_INQUIRY', scheduledAt: '2026-11-20 10:00', productRef: 'Phôi tròng đổi màu Zeiss PhotoFusion X 1.60 (Đặt trước)', status: 'PENDING', source: 'WEBSITE' }
    ],

    // CRM Care Tasks
    careTasks: [
      { id: 'CTK-001', customerId: 'CUS-004', dueDate: '2026-11-25', title: 'Nhắc tái khám định kỳ 6 tháng (kiểm soát độ cận học sinh)', channel: 'Zalo OA', done: false },
      { id: 'CTK-002', customerId: 'CUS-001', dueDate: '2026-11-26', title: 'Chăm sóc sau mua 7 ngày — hỏi cảm giác thích nghi kính mới', channel: 'Zalo OA', done: false }
    ],

    // Zalo OA Outbox Delivery Log (§7.5)
    zaloOutbox: [
      { id: 'ZLO-001', time: '2026-11-18 10:19', customerName: 'Nguyễn Minh Anh', phone: '0912345678', event: 'ORDER_DEPOSIT_CONFIRMED', status: 'DELIVERED', message: 'Minh Quang Optical xác nhận cọc 1.500.000đ cho đơn ORD-2611-001. Kính của bạn đang được đưa vào gia công.' },
      { id: 'ZLO-002', time: '2026-11-18 16:05', customerName: 'Lê Thu Hà', phone: '0904112233', event: 'LAB_JOB_READY', status: 'FAILED_NO_LINK', message: 'Kính mã JOB-2611-003 đã hoàn tất QC và sẵn sàng bàn giao tại 148 Xã Đàn. (Lỗi: Khách chưa liên kết Zalo OA)' },
      { id: 'ZLO-003', time: '2026-11-19 08:32', customerName: 'Nguyễn Minh Anh', phone: '0912345678', event: 'APPOINTMENT_CONFIRMED', status: 'DELIVERED', message: 'Xác nhận lịch hẹn 17:30 ngày 19/11/2026 tại Minh Quang Optical.' }
    ]
  };
};
