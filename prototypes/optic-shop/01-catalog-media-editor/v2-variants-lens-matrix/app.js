(() => {
  'use strict';

  const CATEGORIES = {
    FRAME: 'Gọng kính',
    SUNGLASSES: 'Kính mát',
    LENS_BLANK: 'Tròng kính',
    CONTACT_LENS: 'Kính áp tròng',
    READING_GLASSES: 'Kính đọc sẵn độ',
    ACCESSORY: 'Phụ kiện',
    CONSUMABLE: 'Vật tư tiêu hao',
    SERVICE: 'Dịch vụ'
  };

  const FRAME_SHAPES = {
    round: 'Dáng tròn',
    square: 'Dáng vuông',
    rectangle: 'Chữ nhật',
    cateye: 'Mắt mèo',
    aviator: 'Phi công (Aviator)',
    geometric: 'Đa giác'
  };

  const RIM_TYPES = {
    FULL_RIM: 'Có viền (Full-rim)',
    SEMI_RIMLESS: 'Nửa viền / Cước (Semi-rimless)',
    RIMLESS: 'Không viền / Khoan ốc (Rimless)'
  };

  const COATINGS = [
    { id: 'hard_coat', label: 'Chống trầy (Hard Coat)' },
    { id: 'ar_hmc', label: 'Chống chói HMC / AR' },
    { id: 'blue_cut', label: 'Cắt ánh sáng xanh bước sóng ngắn (400–420nm)' },
    { id: 'photochromic', label: 'Đổi màu ra nắng' },
    { id: 'uv400', label: 'Chống tia UV400' },
    { id: 'hydrophobic', label: 'Trượt nước / Chống bám vân tay' },
    { id: 'polarized', label: 'Phân cực chống lóa (Polarized)' }
  ];

  const LAB_SURCHARGES = [
    { id: 'prism', label: 'Ghép lăng kính (Prism)', fee: 250000 },
    { id: 'rimless_drill', label: 'Khoan lắp gọng không viền', fee: 150000 },
    { id: 'tint', label: 'Nhuộm màu thời trang / Râm cận', fee: 200000 },
    { id: 'edge_polish', label: 'Vát cạnh đánh bóng thẩm mỹ', fee: 100000 }
  ];

  const ANGLES = [
    { key: 'front', label: '1. Ảnh chính diện' },
    { key: 'angle45', label: '2. Ảnh góc nghiêng 45°' },
    { key: 'side', label: '3. Ảnh càng kính ngang' },
    { key: 'dims', label: '4. Bản vẽ thông số kích thước' }
  ];

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const fmtVnd = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(Number(n) || 0)) + 'đ';
  const fmtNum = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(Number(n) || 0));
  const parseNumInput = (raw) => {
    const cleaned = String(raw ?? '').replace(/[.\s,]/g, '');
    if (cleaned === '' || cleaned === '-') return Number.NaN;
    return Number(cleaned);
  };
  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  function isValidHttpsUrl(raw) {
    const str = String(raw || '').trim();
    if (!str || /[\s"'<>]/.test(str)) return false;
    try {
      const u = new URL(str);
      return u.protocol === 'https:';
    } catch {
      return false;
    }
  }

  function sanitizeImageUrl(raw) {
    const str = String(raw || '').trim();
    if (!str) return '';
    if (/^data:image\/(?:png|jpeg|jpg|webp|gif|svg\+xml);/i.test(str) && !/["'<>]/.test(str)) {
      return str;
    }
    if (isValidHttpsUrl(str)) {
      try {
        return new URL(str).href;
      } catch {
        return '';
      }
    }
    return '';
  }

  function fmtDiopter(v) {
    const n = Number(v);
    if (!Number.isFinite(n)) return '—';
    const fixed = Math.abs(n).toFixed(2);
    if (n > 0) return `+${fixed}`;
    if (n < 0) return `−${fixed}`;
    return '0.00';
  }

  function isQuarterStep(v) {
    return Number.isFinite(v) && Math.abs(Math.round(v * 4) - v * 4) < 1e-6;
  }

  function sortPowerTiers(tiers) {
    tiers.sort((a, b) => {
      const sa = Number(a.sphFrom);
      const sb = Number(b.sphFrom);
      if (sa !== sb) return sa - sb;
      const ca = Number(a.cylFrom);
      const cb = Number(b.cylFrom);
      return ca - cb;
    });
  }

  function analyzePowerTiers(tiers) {
    const list = tiers || [];
    const rowErrors = list.map(() => []);
    const rowWarnings = list.map(() => []);
    const validIdx = [];

    list.forEach((t, idx) => {
      const sf = Number(t.sphFrom);
      const st = Number(t.sphTo);
      const cf = Number(t.cylFrom);
      const ct = Number(t.cylTo);
      let ok = true;
      if (!Number.isFinite(sf) || !Number.isFinite(st)) {
        rowErrors[idx].push('Dải SPH phải là số hợp lệ.');
        ok = false;
      } else {
        if (!isQuarterStep(sf) || !isQuarterStep(st)) {
          rowErrors[idx].push('SPH phải theo bước 0.25 D.');
          ok = false;
        }
        if (sf < -20 || st > 20 || sf > 20 || st < -20) {
          rowErrors[idx].push('SPH phải nằm trong khoảng −20.00 đến +20.00 D.');
          ok = false;
        }
        if (sf > st) {
          rowErrors[idx].push('SPH bị đảo chiều (Từ phải ≤ Đến).');
          ok = false;
        }
      }
      if (!Number.isFinite(cf) || !Number.isFinite(ct)) {
        rowErrors[idx].push('Dải CYL phải là số hợp lệ.');
        ok = false;
      } else {
        if (!isQuarterStep(cf) || !isQuarterStep(ct)) {
          rowErrors[idx].push('CYL phải theo bước 0.25 D.');
          ok = false;
        }
        if (cf < -8 || ct > 0 || cf > 0 || ct < -8) {
          rowErrors[idx].push('CYL phải nằm trong khoảng −8.00 đến 0.00 D.');
          ok = false;
        }
        if (cf > ct) {
          rowErrors[idx].push('CYL bị đảo chiều (Từ phải ≤ Đến).');
          ok = false;
        }
      }
      if (!(Number(t.price) > 0)) {
        rowErrors[idx].push('Giá bán/đôi phải > 0.');
      }
      if (!Number.isFinite(Number(t.stockPairs)) || Number(t.stockPairs) < 0) {
        rowErrors[idx].push('Tồn kho không được âm.');
      }
      if (ok) validIdx.push(idx);
    });

    // Check 2D rectangle overlap (inclusive with 0.25D grid)
    for (let i = 0; i < validIdx.length; i++) {
      for (let j = i + 1; j < validIdx.length; j++) {
        const ia = validIdx[i];
        const ib = validIdx[j];
        const a = list[ia];
        const b = list[ib];
        const sphOverlap = Math.max(Number(a.sphFrom), Number(b.sphFrom)) <= Math.min(Number(a.sphTo), Number(b.sphTo)) + 1e-6;
        const cylOverlap = Math.max(Number(a.cylFrom), Number(b.cylFrom)) <= Math.min(Number(a.cylTo), Number(b.cylTo)) + 1e-6;
        if (sphOverlap && cylOverlap) {
          rowErrors[ia].push(`Chồng lấn dải độ với dòng ${ib + 1}.`);
          rowErrors[ib].push(`Chồng lấn dải độ với dòng ${ia + 1}.`);
        }
      }
    }

    // Check SPH gaps within same CYL band
    const byCyl = new Map();
    validIdx.forEach((idx) => {
      const t = list[idx];
      const key = `${Number(t.cylFrom).toFixed(2)}|${Number(t.cylTo).toFixed(2)}`;
      if (!byCyl.has(key)) byCyl.set(key, []);
      byCyl.get(key).push(idx);
    });
    byCyl.forEach((indices) => {
      indices.sort((a, b) => Number(list[a].sphFrom) - Number(list[b].sphFrom));
      for (let k = 1; k < indices.length; k++) {
        const prevIdx = indices[k - 1];
        const currIdx = indices[k];
        const prevTo = Number(list[prevIdx].sphTo);
        const currFrom = Number(list[currIdx].sphFrom);
        if (currFrom - prevTo > 0.25 + 1e-6) {
          rowWarnings[currIdx].push(`Hở dải SPH từ ${fmtDiopter(prevTo + 0.25)} đến ${fmtDiopter(currFrom - 0.25)} D so với dòng ${prevIdx + 1}.`);
        }
      }
    });

    const hasErrors = rowErrors.some((arr) => arr.length > 0);
    return { rowErrors, rowWarnings, hasErrors };
  }

  function makeSampleSvgDataUrl(shape, color, angle, label) {
    const strokeW = angle === 'dims' ? 2.2 : 2.8;
    let inner = '';
    if (shape === 'lens') {
      inner = `<circle cx="140" cy="70" r="46" fill="rgba(15,118,110,0.12)" stroke="${color}" stroke-width="2.5"/><path d="M108 50 Q140 34 172 52" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/><text x="140" y="76" text-anchor="middle" font-size="13" font-family="monospace" fill="${color}">OPTIC LENS</text>`;
    } else if (shape === 'contact') {
      inner = `<ellipse cx="140" cy="72" rx="48" ry="28" fill="rgba(3,105,161,0.12)" stroke="#0369A1" stroke-width="2.2"/><ellipse cx="140" cy="72" rx="22" ry="13" fill="rgba(15,118,110,0.16)" stroke="#0F766E" stroke-width="1.6"/><text x="140" y="120" text-anchor="middle" font-size="12" font-family="monospace" fill="#475569">BC 8.5 · DIA 14.3</text>`;
    } else if (angle === 'side') {
      inner = `<path d="M40 62 L212 62 Q238 62 246 96" fill="none" stroke="${color}" stroke-width="${strokeW + 0.6}" stroke-linecap="round"/><rect x="34" y="44" width="18" height="40" rx="5" fill="rgba(15,118,110,0.08)" stroke="${color}" stroke-width="2.4"/>`;
    } else if (angle === 'angle45') {
      inner = `<path d="M42 52 L92 34" stroke="${color}" stroke-width="2.6"/><path d="M210 52 L250 38" stroke="${color}" stroke-width="2.6"/><ellipse cx="104" cy="70" rx="36" ry="26" fill="rgba(15,118,110,0.08)" stroke="${color}" stroke-width="${strokeW}"/><ellipse cx="182" cy="70" rx="38" ry="28" fill="rgba(15,118,110,0.08)" stroke="${color}" stroke-width="${strokeW}"/><path d="M140 66 Q146 60 150 66" fill="none" stroke="${color}" stroke-width="2.6"/>`;
    } else if (angle === 'dims') {
      inner = `<rect x="44" y="32" width="76" height="46" rx="14" fill="rgba(15,118,110,0.06)" stroke="${color}" stroke-width="2.4"/><rect x="160" y="32" width="76" height="46" rx="14" fill="rgba(15,118,110,0.06)" stroke="${color}" stroke-width="2.4"/><path d="M120 52 Q140 42 160 52" fill="none" stroke="${color}" stroke-width="2.4"/><line x1="44" y1="96" x2="120" y2="96" stroke="#0F766E" stroke-width="1.6"/><text x="82" y="114" text-anchor="middle" font-size="12" font-family="monospace" fill="#0F766E">A (Mắt)</text><line x1="122" y1="96" x2="158" y2="96" stroke="#B45309" stroke-width="1.6"/><text x="140" y="114" text-anchor="middle" font-size="12" font-family="monospace" fill="#B45309">DBL</text>`;
    } else if (shape === 'round') {
      inner = `<circle cx="96" cy="70" r="34" fill="rgba(15,118,110,0.07)" stroke="${color}" stroke-width="${strokeW}"/><circle cx="184" cy="70" r="34" fill="rgba(15,118,110,0.07)" stroke="${color}" stroke-width="${strokeW}"/><path d="M130 66 Q140 58 150 66" fill="none" stroke="${color}" stroke-width="2.4"/><line x1="44" y1="64" x2="62" y2="64" stroke="${color}" stroke-width="2.8"/><line x1="218" y1="64" x2="236" y2="64" stroke="${color}" stroke-width="2.8"/>`;
    } else {
      inner = `<rect x="52" y="42" width="74" height="52" rx="12" fill="rgba(15,118,110,0.07)" stroke="${color}" stroke-width="${strokeW}"/><rect x="154" y="42" width="74" height="52" rx="12" fill="rgba(15,118,110,0.07)" stroke="${color}" stroke-width="${strokeW}"/><path d="M126 64 Q140 56 154 64" fill="none" stroke="${color}" stroke-width="2.6"/><line x1="36" y1="56" x2="52" y2="56" stroke="${color}" stroke-width="2.6"/><line x1="228" y1="56" x2="244" y2="56" stroke="${color}" stroke-width="2.6"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="140" viewBox="0 0 280 140"><rect width="280" height="140" fill="#F7F9F9"/>${inner}<text x="140" y="132" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#5F706D">${label}</text></svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  function defaultSpecsForCategory(cat) {
    if (cat === 'FRAME' || cat === 'SUNGLASSES') {
      return {
        shape: 'round',
        rimType: 'FULL_RIM',
        material: 'Titanium nguyên chất',
        aMm: 49,
        dblMm: 20,
        templeMm: 145,
        bMm: 43,
        edMm: 52,
        weightG: 14,
        maxSphLimit: 8.0,
        nosePad: 'Đệm mũi rời (Asian Fit)',
        uvNote: cat === 'SUNGLASSES' ? 'UV400 · Phân cực cấp lọc 3' : ''
      };
    }
    if (cat === 'LENS_BLANK') {
      return {
        lensDesign: 'Đơn tròng phi cầu (Aspheric)',
        refractiveIndex: '1.60',
        material: 'MR-8 High-Index',
        stockMode: 'POWER_MATRIX',
        leadTimeDays: 3,
        coatings: ['hard_coat', 'ar_hmc', 'uv400'],
        surcharges: ['rimless_drill', 'edge_polish'],
        powerTiers: [
          { id: 'T1', sphFrom: -8.0, sphTo: -6.25, cylFrom: -4.0, cylTo: -2.25, stockPairs: 4, price: 1250000 },
          { id: 'T2', sphFrom: -8.0, sphTo: -6.25, cylFrom: -2.0, cylTo: 0.0, stockPairs: 6, price: 1150000 },
          { id: 'T3', sphFrom: -6.0, sphTo: -4.25, cylFrom: -2.0, cylTo: 0.0, stockPairs: 14, price: 890000 },
          { id: 'T4', sphFrom: -4.0, sphTo: 0.0, cylFrom: -2.0, cylTo: 0.0, stockPairs: 24, price: 650000 },
          { id: 'T5', sphFrom: 0.25, sphTo: 2.0, cylFrom: -2.0, cylTo: 0.0, stockPairs: 10, price: 650000 }
        ]
      };
    }
    if (cat === 'CONTACT_LENS') {
      return {
        clType: 'Cầu (Spherical)',
        bcMm: 8.5,
        diaMm: 14.3,
        powerRange: '−0.50 → −9.00 D (bước 0.25/0.50)',
        waterContentPct: 38,
        dkT: 121,
        wearSchedule: '1 ngày (Daily)',
        lotTrackingNote: 'Quản lý chi tiết theo lô & hạn dùng dự kiến bật ở P01D-3'
      };
    }
    if (cat === 'READING_GLASSES') {
      return {
        readPower: '+1.50 D',
        standardPdMm: 62,
        shape: 'rectangle',
        rimType: 'FULL_RIM',
        weightG: 19
      };
    }
    return {
      unitSpec: 'Chai 60ml / Bộ tiêu chuẩn',
      origin: 'Việt Nam / Hàn Quốc',
      usageNote: 'Bảo quản nơi khô mát, tránh ánh nắng trực tiếp.'
    };
  }

  function createSeedProducts() {
    return [
      {
        id: 'PRD-01',
        sku: 'FRM-TI-8801',
        name: 'Gọng Titanium Nhật Bản dáng tròn mảnh',
        brand: 'Sabae Craft',
        category: 'FRAME',
        salePrice: 1650000,
        stockQty: 14,
        showOnWeb: true,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        specs: {
          shape: 'round',
          rimType: 'FULL_RIM',
          material: 'Beta-Titanium Nhật Bản',
          aMm: 49,
          dblMm: 20,
          templeMm: 145,
          bMm: 44,
          edMm: 52,
          weightG: 13.5,
          maxSphLimit: 8.0,
          nosePad: 'Đệm mũi silicone cao (Asian Fit)'
        },
        variants: [
          {
            id: 'VAR-101',
            colorName: 'Xám Titan mờ',
            colorHex: '#475569',
            sizeLabel: '49-20-145',
            sku: 'FRM-TI-8801-GRY',
            stockQty: 8,
            price: 1650000,
            media: {
              front: makeSampleSvgDataUrl('round', '#475569', 'front', 'Xám Titan · Chính diện'),
              angle45: makeSampleSvgDataUrl('round', '#475569', 'angle45', 'Xám Titan · Góc 45°'),
              side: makeSampleSvgDataUrl('round', '#475569', 'side', 'Xám Titan · Càng ngang'),
              dims: makeSampleSvgDataUrl('round', '#475569', 'dims', '49-20-145 · B44 · ED52')
            }
          },
          {
            id: 'VAR-102',
            colorName: 'Vàng Hồng Champagne',
            colorHex: '#B4836B',
            sizeLabel: '49-20-145',
            sku: 'FRM-TI-8801-RGD',
            stockQty: 4,
            price: 1720000,
            media: {
              front: makeSampleSvgDataUrl('round', '#B4836B', 'front', 'Vàng Hồng · Chính diện'),
              angle45: makeSampleSvgDataUrl('round', '#B4836B', 'angle45', 'Vàng Hồng · Góc 45°'),
              side: makeSampleSvgDataUrl('round', '#B4836B', 'side', 'Vàng Hồng · Càng ngang'),
              dims: makeSampleSvgDataUrl('round', '#B4836B', 'dims', '49-20-145 · B44 · ED52')
            }
          },
          {
            id: 'VAR-103',
            colorName: 'Đen Nhám',
            colorHex: '#1E293B',
            sizeLabel: '51-20-145',
            sku: 'FRM-TI-8801-BLK',
            stockQty: 2,
            price: 1650000,
            media: {
              front: makeSampleSvgDataUrl('round', '#1E293B', 'front', 'Đen Nhám · Chính diện'),
              angle45: '',
              side: '',
              dims: ''
            }
          }
        ],
        media: { front: '', angle45: '', side: '', dims: '' },
        docBlocks: [
          { type: 'heading', text: 'Thiết kế siêu nhẹ cho người đeo kính cả ngày' },
          { type: 'paragraph', text: 'Khung Beta-Titanium đàn hồi cao, trọng lượng chỉ 13.5g kết hợp đệm mũi cao phù hợp sống mũi người Việt.' },
          { type: 'spec_table' },
          { type: 'optometrist_box', text: 'Khuyên dùng cho khách có độ cận đến −8.00 D và khoảng PD 61–69 mm. Bản viền tròn giúp che cạnh tròng tốt khi kết hợp chiết suất 1.67.', approved: true, approvedBy: 'KTV. Nguyễn Minh Tâm (CCHN-KX-0412)' }
        ]
      },
      {
        id: 'PRD-02',
        sku: 'LNS-ESS-160-ROCK',
        name: 'Tròng Essilor Crizal Rock 1.60 Aspheric',
        brand: 'Essilor',
        category: 'LENS_BLANK',
        salePrice: 650000,
        stockQty: 42,
        showOnWeb: true,
        videoUrl: '',
        specs: defaultSpecsForCategory('LENS_BLANK'),
        variants: [],
        media: {
          front: makeSampleSvgDataUrl('lens', '#0F766E', 'front', 'Phôi tròng 1.60 Crizal'),
          angle45: '',
          side: '',
          dims: ''
        },
        docBlocks: [
          { type: 'heading', text: 'Chống trầy gấp 3 lần và chống chói tối ưu' },
          { type: 'paragraph', text: 'Giá bán và tình trạng tồn kho thay đổi theo dải độ SPH/CYL. Tròng độ cao hoặc ghép lăng kính đặt hãng 3–5 ngày.' },
          { type: 'spec_table' },
          { type: 'optometrist_box', text: 'Phù hợp độ cận −2.00 D đến −6.00 D. Với gọng khoan không viền, vui lòng bật phụ phí khoan ốc chống nứt.', approved: false, approvedBy: '' }
        ]
      },
      {
        id: 'PRD-03',
        sku: 'FRM-SIL-RIM-09',
        name: 'Gọng khoan ốc không viền Silhouette Minimal X',
        brand: 'Silhouette',
        category: 'FRAME',
        salePrice: 3450000,
        stockQty: 5,
        showOnWeb: true,
        videoUrl: '',
        specs: {
          shape: 'rectangle',
          rimType: 'RIMLESS',
          material: 'SPX+ & Titanium',
          aMm: 52,
          dblMm: 18,
          templeMm: 145,
          bMm: 36,
          edMm: 54,
          weightG: 7.8,
          maxSphLimit: 4.0,
          nosePad: 'Đệm mũi rời siêu mềm'
        },
        variants: [
          {
            id: 'VAR-301',
            colorName: 'Bạc Ánh Kim',
            colorHex: '#94A3B8',
            sizeLabel: '52-18-145',
            sku: 'FRM-SIL-RIM-09-SLV',
            stockQty: 3,
            price: 3450000,
            media: {
              front: makeSampleSvgDataUrl('rectangle', '#94A3B8', 'front', 'Bạc · Khoan không viền'),
              angle45: makeSampleSvgDataUrl('rectangle', '#94A3B8', 'angle45', 'Bạc · Góc 45°'),
              side: '',
              dims: ''
            }
          },
          {
            id: 'VAR-302',
            colorName: 'Vàng Gold Mờ',
            colorHex: '#CA8A04',
            sizeLabel: '52-18-145',
            sku: 'FRM-SIL-RIM-09-GLD',
            stockQty: 2,
            price: 3550000,
            media: {
              front: makeSampleSvgDataUrl('rectangle', '#CA8A04', 'front', 'Vàng Gold · Không viền'),
              angle45: '',
              side: '',
              dims: ''
            }
          }
        ],
        media: { front: '', angle45: '', side: '', dims: '' },
        docBlocks: [
          { type: 'heading', text: 'Gọng khoan ốc tối giản không bản lề' },
          { type: 'paragraph', text: 'Lưu ý giới hạn độ lắp gọng không viền: khuyến nghị tối đa −4.00 D và bắt buộc dùng tròng dai (Polycarbonate / Trivex / 1.60 MR-8).' },
          { type: 'spec_table' }
        ]
      },
      {
        id: 'PRD-04',
        sku: 'CL-ACV-1DAY-30',
        name: 'Kính áp tròng Acuvue Oasys 1-Day (Hộp 30 chiếc)',
        brand: 'Johnson & Johnson',
        category: 'CONTACT_LENS',
        salePrice: 780000,
        stockQty: 18,
        showOnWeb: true,
        videoUrl: '',
        specs: defaultSpecsForCategory('CONTACT_LENS'),
        variants: [],
        media: {
          front: makeSampleSvgDataUrl('contact', '#0369A1', 'front', 'Acuvue Oasys 1-Day'),
          angle45: '',
          side: '',
          dims: ''
        },
        docBlocks: [
          { type: 'heading', text: 'Cấp ẩm HydraLuxe cho mắt nhạy cảm' },
          { type: 'paragraph', text: 'Kính áp tròng dùng 1 lần, hệ số thấm oxy Dk/t 121 giúp đeo thoải mái suốt ngày làm việc.' },
          { type: 'spec_table' }
        ]
      },
      {
        id: 'PRD-05',
        sku: 'RD-MQ-150-COMP',
        name: 'Kính đọc sách sẵn độ Minh Quang Compact +1.50 D',
        brand: 'Minh Quang',
        category: 'READING_GLASSES',
        salePrice: 320000,
        stockQty: 12,
        showOnWeb: false,
        videoUrl: '',
        specs: defaultSpecsForCategory('READING_GLASSES'),
        variants: [],
        media: {
          front: makeSampleSvgDataUrl('rectangle', '#1E293B', 'front', 'Kính đọc sẵn độ +1.50 D'),
          angle45: '',
          side: '',
          dims: ''
        },
        docBlocks: [
          { type: 'paragraph', text: 'Kính đọc sách tiện lợi cho người lão thị hai mắt cân độ, khoảng cách đồng tử chuẩn 62 mm.' },
          { type: 'spec_table' }
        ]
      },
      {
        id: 'PRD-06',
        sku: 'CON-SPRAY-60ML',
        name: 'Dung dịch xịt rửa tròng chống mờ sương 60ml',
        brand: 'Zeiss Care',
        category: 'CONSUMABLE',
        salePrice: 120000,
        stockQty: 45,
        showOnWeb: true,
        videoUrl: '',
        specs: defaultSpecsForCategory('CONSUMABLE'),
        variants: [],
        media: { front: '', angle45: '', side: '', dims: '' },
        docBlocks: [
          { type: 'paragraph', text: 'An toàn cho mọi lớp váng phủ AR/HMC, không chứa cồn gây bong lớp phủ.' }
        ]
      }
    ];
  }

  let products = createSeedProducts();
  let filterCat = 'ALL';
  let filterWeb = 'ALL';
  let searchQuery = '';

  // Drawer editing state
  let editingDraft = null;
  let isNewProduct = false;
  let activeTab = 'specs';
  let activeMediaVariantId = null;
  let isDirty = false;
  let fieldErrors = {};
  let docUndoStack = [];
  let docRedoStack = [];
  let mobilePreviewDesc = false;

  // Preview modal state
  let previewVariantIdx = 0;
  let previewMediaKey = 'front';

  // Toast timer + undo callback
  let toastTimer = null;

  function showToast(message, undoAction = null) {
    const el = document.getElementById('toast');
    el.innerHTML = `<span>${esc(message)}</span>${undoAction ? '<button type="button" class="toast-undo-btn" id="toastUndoBtn">Hoàn tác</button>' : ''}`;
    el.classList.remove('hidden');
    if (undoAction) {
      document.getElementById('toastUndoBtn').onclick = () => {
        undoAction();
        el.classList.add('hidden');
      };
    }
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('hidden'), undoAction ? 6000 : 3200);
  }

  function hasVariants(cat) {
    return cat === 'FRAME' || cat === 'SUNGLASSES';
  }

  function calcRecommendedPd(specs) {
    const a = Number(specs.aMm) || 0;
    const dbl = Number(specs.dblMm) || 0;
    if (!a || !dbl) return null;
    const fpd = a + dbl;
    return { fpd, minPd: Math.max(52, fpd - 8), maxPd: fpd };
  }

  function getTotalStock(p) {
    if (p.category === 'LENS_BLANK') {
      if (p.specs.stockMode === 'RX_ORDER') return null;
      return (p.specs.powerTiers || []).reduce((sum, t) => sum + (Number(t.stockPairs) || 0), 0);
    }
    if (hasVariants(p.category) && p.variants && p.variants.length) {
      return p.variants.reduce((sum, v) => sum + (Number(v.stockQty) || 0), 0);
    }
    return Number(p.stockQty) || 0;
  }

  function getDisplayPrice(p) {
    if (p.category === 'LENS_BLANK' && p.specs.powerTiers && p.specs.powerTiers.length) {
      const prices = p.specs.powerTiers.map((t) => Number(t.price) || 0).filter((x) => x > 0);
      if (prices.length) {
        const minP = Math.min(...prices);
        const maxP = Math.max(...prices);
        return minP === maxP ? fmtVnd(minP) : `Từ ${fmtVnd(minP)}`;
      }
    }
    if (hasVariants(p.category) && p.variants && p.variants.length) {
      const prices = p.variants.map((v) => Number(v.price) || 0).filter((x) => x > 0);
      if (prices.length) {
        const minP = Math.min(...prices);
        const maxP = Math.max(...prices);
        return minP === maxP ? fmtVnd(minP) : `${fmtVnd(minP)} – ${fmtVnd(maxP)}`;
      }
    }
    return fmtVnd(p.salePrice);
  }

  function getPrimaryThumb(p) {
    if (hasVariants(p.category) && p.variants && p.variants.length) {
      const firstWithImg = p.variants.find((v) => v.media && v.media.front);
      if (firstWithImg) return firstWithImg.media.front;
    }
    return p.media && p.media.front ? p.media.front : '';
  }

  function countMediaSlots(p) {
    let count = 0;
    if (hasVariants(p.category) && p.variants && p.variants.length) {
      p.variants.forEach((v) => {
        ANGLES.forEach((a) => { if (v.media && v.media[a.key]) count++; });
      });
    } else {
      ANGLES.forEach((a) => { if (p.media && p.media[a.key]) count++; });
    }
    if (p.videoUrl) count++;
    return count;
  }

  function toVideoEmbedHtml(url) {
    const raw = String(url || '').trim();
    if (!raw) return '<div class="muted-xs">Chưa có link video 360°</div>';
    if (!isValidHttpsUrl(raw)) {
      return '<div class="field-error">Chỉ chấp nhận đường dẫn video hợp lệ bắt đầu bằng https://</div>';
    }
    const ytMatch = raw.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    if (ytMatch) {
      return `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(ytMatch[1])}" title="Video 360 độ sản phẩm" allowfullscreen></iframe>`;
    }
    return `<div style="padding:18px;text-align:center"><div style="font-weight:700;margin-bottom:6px">Video 360° ngoài (HTTPS)</div><div class="mono muted-xs">${esc(new URL(raw).href)}</div></div>`;
  }

  // ==================== SAFE SANITIZER & REUSABLE BLOCK RENDERER (B-09) ====================
  function sanitizeTextInline(raw) {
    // Strips any HTML tags/scripts, keeps plain safe text + converts **bold** and *italic* and ^sup^ safely
    const stripped = String(raw || '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();
    return esc(stripped)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\^([0-9°D+-]+)\^/g, '<sup>$1</sup>');
  }

  function renderSpecsSummaryHtml(p) {
    const rows = [];
    const s = p.specs || {};
    if (p.category === 'FRAME' || p.category === 'SUNGLASSES') {
      rows.push(['Dáng gọng', FRAME_SHAPES[s.shape] || s.shape]);
      rows.push(['Kiểu viền', RIM_TYPES[s.rimType] || s.rimType]);
      rows.push(['Kích thước (A-DBL-Càng)', `${s.aMm}-${s.dblMm}-${s.templeMm} mm · Cao B: ${s.bMm} mm · ED: ${s.edMm} mm`]);
      rows.push(['Trọng lượng', `${s.weightG} g`]);
      const pd = calcRecommendedPd(s);
      if (pd) rows.push(['Khoảng PD phù hợp', `${pd.minPd}–${pd.maxPd} mm`]);
      if (s.rimType === 'RIMLESS') rows.push(['Giới hạn độ lắp', `Tối đa ±${s.maxSphLimit} D (chống nứt lỗ khoan)`]);
    } else if (p.category === 'LENS_BLANK') {
      rows.push(['Thiết kế & Chiết suất', `${s.lensDesign} · Chiết suất ${s.refractiveIndex}`]);
      rows.push(['Chế độ cung ứng', s.stockMode === 'RX_ORDER' ? `Đặt hãng (${s.leadTimeDays} ngày)` : 'Sẵn kho theo ma trận độ']);
      rows.push(['Váng phủ', (s.coatings || []).map((c) => COATINGS.find((x) => x.id === c)?.label || c).join(', ') || 'Tiêu chuẩn']);
    } else if (p.category === 'CONTACT_LENS') {
      rows.push(['Thông số quang học', `BC ${s.bcMm} mm · DIA ${s.diaMm} mm · ${s.clType}`]);
      rows.push(['Dải độ & Chu kỳ', `${s.powerRange} · ${s.wearSchedule}`]);
      rows.push(['Độ ẩm & Thấm oxy', `${s.waterContentPct}% · Dk/t ${s.dkT}`]);
    } else if (p.category === 'READING_GLASSES') {
      rows.push(['Độ đọc sẵn', `${s.readPower} · PD chuẩn ${s.standardPdMm} mm`]);
      rows.push(['Dáng & Kiểu viền', `${FRAME_SHAPES[s.shape] || ''} · ${RIM_TYPES[s.rimType] || ''}`]);
    } else {
      rows.push(['Quy cách', s.unitSpec || 'Tiêu chuẩn']);
      rows.push(['Xuất xứ', s.origin || '—']);
    }
    return `<div class="reusable-box"><strong>Bảng thông số kỹ thuật (Khối tự đồng bộ)</strong><table style="width:100%;margin-top:6px;border-collapse:collapse;font-size:12.5px">${rows.map(([k, v]) => `<tr><td style="padding:3px 6px 3px 0;color:#4B5B58;width:42%">${esc(k)}</td><td style="padding:3px 0;font-weight:600">${esc(v)}</td></tr>`).join('')}</table></div>`;
  }

  function renderSafeDocBlocksHtml(p, isEditorPreview = false) {
    const blocks = p.docBlocks || [];
    if (!blocks.length) return '<p class="muted-xs">Chưa có nội dung mô tả Website.</p>';
    return `<div class="safe-html-render">${blocks.map((b) => {
      if (b.type === 'heading') return `<h3>${sanitizeTextInline(b.text)}</h3>`;
      if (b.type === 'paragraph') return `<p>${sanitizeTextInline(b.text)}</p>`;
      if (b.type === 'bullets') {
        const items = String(b.text || '').split('\n').map((x) => x.trim()).filter(Boolean);
        return `<ul>${items.map((it) => `<li>${sanitizeTextInline(it)}</li>`).join('')}</ul>`;
      }
      if (b.type === 'spec_table') return renderSpecsSummaryHtml(p);
      if (b.type === 'optometrist_box') {
        const approver = String(b.approvedBy || '').trim();
        if (b.approved && approver) {
          return `<div class="reusable-box" style="background:#E0F2FE;border-color:#BAE6FD;color:#0369A1"><strong>Khuyến nghị chuyên môn</strong> <span class="muted-xs" style="color:#0369A1">(Đã duyệt bởi: ${esc(approver)})</span><div style="margin-top:4px">${sanitizeTextInline(b.text)}</div></div>`;
        }
        return isEditorPreview
          ? `<div class="reusable-box" style="background:#FEF3C7;border-color:#FDE68A;color:#B45309"><strong>Khối khuyến nghị chuyên môn (Chưa duyệt — ẩn trên Website):</strong> Cần người có chứng chỉ khúc xạ nhập tên và xác nhận duyệt trước khi hiển thị công khai.</div>`
          : '';
      }
      return '';
    }).join('')}</div>`;
  }

  // ==================== MAIN LIST RENDERING ====================
  function renderFilterPills() {
    const counts = { ALL: products.length };
    Object.keys(CATEGORIES).forEach((k) => { counts[k] = products.filter((p) => p.category === k).length; });
    const wrap = document.getElementById('catFilterPills');
    wrap.innerHTML = [
      { key: 'ALL', label: `Tất cả (${counts.ALL})` },
      ...Object.entries(CATEGORIES).map(([k, label]) => ({ key: k, label: `${label} (${counts[k]})` }))
    ].map((item) => `
      <button type="button" class="pill ${filterCat === item.key ? 'active' : ''}" data-cat="${item.key}">${esc(item.label)}</button>
    `).join('');
    wrap.querySelectorAll('.pill').forEach((btn) => {
      btn.onclick = () => {
        filterCat = btn.dataset.cat;
        renderFilterPills();
        renderTable();
      };
    });
  }

  function renderSpecBadges(p) {
    const s = p.specs || {};
    const chips = [];
    if (p.category === 'FRAME' || p.category === 'SUNGLASSES') {
      chips.push(FRAME_SHAPES[s.shape] || s.shape);
      chips.push(s.rimType === 'RIMLESS' ? 'Không viền (≤±' + s.maxSphLimit + 'D)' : (RIM_TYPES[s.rimType] || ''));
      chips.push(`${s.aMm}-${s.dblMm}-${s.templeMm} · ED ${s.edMm}`);
      chips.push(`${s.weightG}g`);
    } else if (p.category === 'LENS_BLANK') {
      chips.push(`Chiết suất ${s.refractiveIndex}`);
      chips.push(`${(s.powerTiers || []).length} dải độ`);
      chips.push(s.stockMode === 'RX_ORDER' ? `Đặt hãng ${s.leadTimeDays}d` : 'Ma trận SPH×CYL');
      if (s.coatings && s.coatings.length) chips.push(`${s.coatings.length} váng phủ`);
    } else if (p.category === 'CONTACT_LENS') {
      chips.push(`BC ${s.bcMm} · DIA ${s.diaMm}`);
      chips.push(s.wearSchedule);
      chips.push(`Dk/t ${s.dkT}`);
    } else if (p.category === 'READING_GLASSES') {
      chips.push(`Độ ${s.readPower}`);
      chips.push(`PD ${s.standardPdMm} mm`);
    } else {
      chips.push(s.unitSpec || 'Tiêu chuẩn');
    }
    return `<div class="spec-chip-list">${chips.map((c) => `<span class="spec-chip">${esc(c)}</span>`).join('')}</div>`;
  }

  function renderTable() {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((p) => {
      if (filterCat !== 'ALL' && p.category !== filterCat) return false;
      if (filterWeb === 'WEB' && !p.showOnWeb) return false;
      if (filterWeb === 'HIDDEN' && p.showOnWeb) return false;
      if (!q) return true;
      const hay = [
        p.name, p.sku, p.brand, CATEGORIES[p.category],
        ...(p.variants || []).map((v) => `${v.colorName} ${v.sku}`)
      ].join(' ').toLowerCase();
      return hay.includes(q);
    });

    const tbody = document.getElementById('productTableBody');
    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:34px;color:#5F706D">Không tìm thấy sản phẩm nào khớp bộ lọc hiện tại. Hãy thử xóa từ khóa hoặc chọn danh mục "Tất cả".</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((p) => {
      const thumb = sanitizeImageUrl(getPrimaryThumb(p));
      const totalStock = getTotalStock(p);
      const mediaCount = countMediaSlots(p);
      const varSwatches = (p.variants || []).length
        ? `<div class="swatch-row">${p.variants.map((v) => `<span class="swatch-dot" style="background:${esc(v.colorHex)}" title="${esc(v.colorName)} (${v.stockQty})"></span>`).join('')}<span class="muted-xs">${p.variants.length} biến thể</span></div>`
        : '';
      const stockCell = totalStock === null
        ? `<span class="badge badge-info">Đặt hãng (${p.specs.leadTimeDays}d)</span>`
        : `<span class="mono" style="font-weight:600">${totalStock}</span><div class="muted-xs">${p.category === 'LENS_BLANK' ? 'đôi theo độ' : 'sẵn kho'}</div>`;

      return `<tr>
        <td>
          <div class="prod-cell">
            <div class="prod-thumb">${thumb ? `<img src="${esc(thumb)}" alt="${esc(p.name)}" />` : `<span class="muted-xs">Ảnh</span>`}</div>
            <div>
              <div class="prod-name">${esc(p.name)}</div>
              <div class="prod-meta"><span class="mono">${esc(p.sku)}</span><span>·</span><span>${esc(p.brand)}</span></div>
              ${varSwatches}
            </div>
          </div>
        </td>
        <td><span class="badge badge-neutral">${esc(CATEGORIES[p.category])}</span></td>
        <td>${renderSpecBadges(p)}</td>
        <td>
          <span class="mono" style="font-weight:600">${mediaCount}</span> <span class="muted-xs">mục</span>
          ${p.videoUrl ? '<div><span class="badge badge-teal">Video 360°</span></div>' : ''}
        </td>
        <td class="num"><span class="mono" style="font-weight:600">${esc(getDisplayPrice(p))}</span></td>
        <td class="num">${stockCell}</td>
        <td>${p.showOnWeb ? '<span class="badge badge-ok">Đang đăng Web</span>' : '<span class="badge badge-neutral">Chỉ tại quầy</span>'}</td>
        <td class="num">
          <button type="button" class="btn btn-secondary btn-sm" data-edit="${esc(p.id)}">Chỉnh sửa</button>
        </td>
      </tr>`;
    }).join('');

    tbody.querySelectorAll('[data-edit]').forEach((btn) => {
      btn.onclick = () => openDrawer(btn.dataset.edit);
    });
  }

  // ==================== DRAWER OPEN / CLOSE / DIRTY / VALIDATION ====================
  function markDirty() {
    isDirty = true;
    document.getElementById('unsavedBadge').classList.remove('hidden');
  }

  function clearErrors() {
    fieldErrors = {};
    const banner = document.getElementById('formErrorBanner');
    banner.classList.add('hidden');
    banner.innerHTML = '';
  }

  function validateDraft(draft) {
    const errors = {};
    const checkRange = (key, val, min, max, label, unit = '') => {
      const n = Number(val);
      if (val === '' || val === null || val === undefined || !Number.isFinite(n) || n < min || n > max) {
        errors[key] = `${label} phải nằm trong khoảng ${min}–${max}${unit ? ' ' + unit : ''}.`;
      }
    };

    if (!String(draft.name || '').trim()) errors.name = 'Vui lòng nhập tên sản phẩm.';

    // Collect all SKUs from OTHER products (both main SKU and variant SKUs) for global uniqueness (B-03)
    const otherSkus = new Map();
    products.forEach((p) => {
      if (p.id === draft.id) return;
      if (p.sku) otherSkus.set(p.sku.trim().toLowerCase(), p.name);
      (p.variants || []).forEach((v) => {
        if (v.sku) otherSkus.set(v.sku.trim().toLowerCase(), `${p.name} (biến thể ${v.colorName})`);
      });
    });

    const skuTrim = String(draft.sku || '').trim();
    if (!skuTrim) {
      errors.sku = 'Vui lòng nhập mã SKU chính.';
    } else if (otherSkus.has(skuTrim.toLowerCase())) {
      errors.sku = `Mã SKU "${skuTrim}" đã trùng với "${otherSkus.get(skuTrim.toLowerCase())}".`;
    }

    if (draft.category !== 'LENS_BLANK' && !hasVariants(draft.category)) {
      if (!Number.isFinite(Number(draft.salePrice)) || Number(draft.salePrice) < 0) {
        errors.salePrice = 'Giá bán không được là số âm.';
      }
      if (!Number.isFinite(Number(draft.stockQty)) || Number(draft.stockQty) < 0) {
        errors.stockQty = 'Tồn kho không được là số âm.';
      }
    }

    const s = draft.specs || {};
    if (draft.category === 'FRAME' || draft.category === 'SUNGLASSES') {
      checkRange('specA', s.aMm, 35, 68, 'A (Rộng mắt)', 'mm');
      checkRange('specDbl', s.dblMm, 12, 26, 'DBL (Cầu mũi)', 'mm');
      checkRange('specTemple', s.templeMm, 120, 160, 'Càng kính', 'mm');
      checkRange('specB', s.bMm, 24, 60, 'B (Cao tròng)', 'mm');
      checkRange('specEd', s.edMm, 40, 72, 'ED (Đ.kính hiệu dụng)', 'mm');
      if (!errors.specA && !errors.specEd && Number(s.edMm) < Number(s.aMm)) {
        errors.specEd = `ED (${s.edMm} mm) phải lớn hơn hoặc bằng A (${s.aMm} mm).`;
      }
      checkRange('specWeight', s.weightG, 4, 80, 'Trọng lượng', 'g');
      checkRange('specMaxSph', s.maxSphLimit, 1, 15, 'Giới hạn độ tối đa', '±D');
    } else if (draft.category === 'LENS_BLANK') {
      checkRange('lensLeadTime', s.leadTimeDays, 1, 30, 'Thời gian đặt hãng', 'ngày');
    } else if (draft.category === 'CONTACT_LENS') {
      checkRange('clBc', s.bcMm, 8.0, 9.2, 'Độ cong nền BC', 'mm');
      checkRange('clDia', s.diaMm, 13.5, 15.0, 'Đường kính DIA', 'mm');
      checkRange('clWater', s.waterContentPct, 20, 80, 'Độ ẩm', '%');
      checkRange('clDkt', s.dkT, 10, 200, 'Hệ số thấm oxy Dk/t');
    } else if (draft.category === 'READING_GLASSES') {
      checkRange('rdPd', s.standardPdMm, 56, 70, 'Khoảng cách đồng tử PD', 'mm');
      checkRange('rdWeight', s.weightG, 4, 80, 'Trọng lượng', 'g');
    }

    if (hasVariants(draft.category)) {
      if (!draft.variants || !draft.variants.length) {
        errors.variants = 'Gọng kính / Kính mát cần ít nhất 1 biến thể màu/size.';
      } else {
        const seenVarSkus = new Set();
        const varErrs = [];
        draft.variants.forEach((v, idx) => {
          const vSku = String(v.sku || '').trim();
          const vKey = vSku.toLowerCase();
          if (!String(v.colorName || '').trim() || !vSku || !Number.isFinite(Number(v.price)) || Number(v.price) < 0 || !Number.isFinite(Number(v.stockQty)) || Number(v.stockQty) < 0) {
            varErrs.push(`Dòng ${idx + 1}: tên màu, SKU bắt buộc và giá/tồn kho không được âm.`);
          } else if (skuTrim && vKey === skuTrim.toLowerCase()) {
            varErrs.push(`Dòng ${idx + 1}: SKU "${vSku}" trùng với SKU chính của sản phẩm.`);
          } else if (seenVarSkus.has(vKey)) {
            varErrs.push(`Dòng ${idx + 1}: SKU biến thể "${vSku}" bị trùng trong bảng.`);
          } else if (otherSkus.has(vKey)) {
            varErrs.push(`Dòng ${idx + 1}: SKU "${vSku}" đã trùng với "${otherSkus.get(vKey)}".`);
          }
          if (vSku) seenVarSkus.add(vKey);
        });
        if (varErrs.length) errors.variants = varErrs.join(' ');
      }
    }

    if (draft.category === 'LENS_BLANK') {
      const tiers = draft.specs.powerTiers || [];
      if (!tiers.length) {
        errors.powerTiers = 'Tròng kính cần ít nhất 1 dải độ (SPH × CYL).';
      } else {
        const analysis = analyzePowerTiers(tiers);
        if (analysis.hasErrors) {
          const firstRow = analysis.rowErrors.findIndex((r) => r.length > 0);
          errors.powerTiers = `Bảng dải độ có lỗi (dòng ${firstRow + 1}: ${analysis.rowErrors[firstRow][0]}). Vui lòng kiểm tra các dòng được đánh dấu đỏ.`;
        }
      }
    }
    return errors;
  }

  function openDrawer(productId = null) {
    clearErrors();
    isDirty = false;
    document.getElementById('unsavedBadge').classList.add('hidden');
    docUndoStack = [];
    docRedoStack = [];

    if (productId) {
      const found = products.find((p) => p.id === productId);
      editingDraft = deepClone(found);
      isNewProduct = false;
      document.getElementById('drawerEyebrow').textContent = `CHỈNH SỬA SẢN PHẨM · ${editingDraft.sku}`;
      document.getElementById('drawerTitle').textContent = editingDraft.name;
    } else {
      isNewProduct = true;
      editingDraft = {
        id: 'PRD-' + String(products.length + 1).padStart(2, '0'),
        sku: '',
        name: '',
        brand: '',
        category: 'FRAME',
        salePrice: 1200000,
        stockQty: 5,
        showOnWeb: true,
        videoUrl: '',
        specs: defaultSpecsForCategory('FRAME'),
        variants: [
          {
            id: 'VAR-' + Date.now(),
            colorName: 'Đen Bóng',
            colorHex: '#1E293B',
            sizeLabel: '49-20-145',
            sku: 'FRM-NEW-BLK',
            stockQty: 5,
            price: 1200000,
            media: { front: '', angle45: '', side: '', dims: '' }
          }
        ],
        media: { front: '', angle45: '', side: '', dims: '' },
        docBlocks: [
          { type: 'paragraph', text: 'Mô tả ngắn gọn về sản phẩm và đối tượng phù hợp.' },
          { type: 'spec_table' }
        ]
      };
      document.getElementById('drawerEyebrow').textContent = 'TẠO SẢN PHẨM MỚI';
      document.getElementById('drawerTitle').textContent = 'Sản phẩm mới';
    }

    activeTab = 'specs';
    activeMediaVariantId = (editingDraft.variants && editingDraft.variants[0]) ? editingDraft.variants[0].id : null;
    document.getElementById('publishToggle').checked = !!editingDraft.showOnWeb;
    document.getElementById('drawerBackdrop').classList.remove('hidden');
    const drawer = document.getElementById('editorDrawer');
    drawer.classList.remove('hidden');
    drawer.setAttribute('aria-hidden', 'false');
    syncTabButtons();
    renderDrawerBody();
  }

  let confirmHandlers = null;

  function openConfirmDialog({ title, message, confirmLabel = 'Xác nhận', cancelLabel = 'Tiếp tục sửa', danger = false, onConfirm, onCancel }) {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    const okBtn = document.getElementById('confirmOkBtn');
    const cancelBtn = document.getElementById('confirmCancelBtn');
    okBtn.textContent = confirmLabel;
    cancelBtn.textContent = cancelLabel;
    okBtn.className = danger ? 'btn btn-danger' : 'btn btn-primary';
    confirmHandlers = { onConfirm, onCancel };
    document.getElementById('confirmBackdrop').classList.remove('hidden');
    document.getElementById('confirmModal').classList.remove('hidden');
    cancelBtn.focus();
  }

  function closeConfirmDialog(confirmed = false) {
    const handlers = confirmHandlers;
    confirmHandlers = null;
    document.getElementById('confirmBackdrop').classList.add('hidden');
    document.getElementById('confirmModal').classList.add('hidden');
    if (handlers) {
      if (confirmed && handlers.onConfirm) handlers.onConfirm();
      if (!confirmed && handlers.onCancel) handlers.onCancel();
    }
  }

  function requestCloseDrawer() {
    if (!editingDraft) return;
    if (!isDirty) {
      closeDrawer();
      return;
    }
    openConfirmDialog({
      title: 'Bỏ thay đổi?',
      message: 'Bạn có thay đổi chưa lưu. Nếu đóng ngay bây giờ, mọi chỉnh sửa vừa nhập sẽ bị mất.',
      confirmLabel: 'Bỏ thay đổi',
      cancelLabel: 'Tiếp tục sửa',
      danger: true,
      onConfirm: () => closeDrawer()
    });
  }

  function closeDrawer() {
    document.getElementById('drawerBackdrop').classList.add('hidden');
    const drawer = document.getElementById('editorDrawer');
    drawer.classList.add('hidden');
    drawer.setAttribute('aria-hidden', 'true');
    editingDraft = null;
    isDirty = false;
  }

  function syncTabButtons() {
    document.querySelectorAll('.tab-btn').forEach((b) => {
      const active = b.dataset.tab === activeTab;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    if (editingDraft) {
      document.getElementById('mediaCountBadge').textContent = String(countMediaSlots(editingDraft));
    }
  }

  // ==================== TAB 1: SPECS, VARIANTS & LENS MATRIX ====================
  function renderTabSpecs() {
    const d = editingDraft;
    const s = d.specs;
    const errHtml = (k) => fieldErrors[k] ? `<div class="field-error">${esc(fieldErrors[k])}</div>` : '';

    let dynamicHtml = '';
    if (d.category === 'FRAME' || d.category === 'SUNGLASSES') {
      const pd = calcRecommendedPd(s);
      dynamicHtml = `
        <div class="section-block">
          <div class="section-head">
            <h3 class="section-title">Thông số kỹ thuật Gọng kính (Tách trường số chuẩn Lab)</h3>
            ${pd ? `<span class="badge badge-teal">Khoảng PD phù hợp: ${pd.minPd}–${pd.maxPd} mm (FPD ${pd.fpd} mm)</span>` : ''}
          </div>
          <div class="grid-3">
            <div class="field">
              <label for="specShape">Dáng gọng (Shape)</label>
              <select id="specShape" class="select">${Object.entries(FRAME_SHAPES).map(([k, v]) => `<option value="${k}" ${s.shape === k ? 'selected' : ''}>${esc(v)}</option>`).join('')}</select>
            </div>
            <div class="field">
              <label for="specRimType">Kiểu viền (Rim Type — tách độc lập)</label>
              <select id="specRimType" class="select">${Object.entries(RIM_TYPES).map(([k, v]) => `<option value="${k}" ${s.rimType === k ? 'selected' : ''}>${esc(v)}</option>`).join('')}</select>
            </div>
            <div class="field">
              <label for="specMaterial">Chất liệu gọng</label>
              <input id="specMaterial" class="input" value="${esc(s.material || '')}" />
            </div>
          </div>

          <div class="grid-4" style="margin-top:12px">
            <div class="field"><label for="specA">A — Rộng mắt (mm)</label><input id="specA" type="number" step="0.5" min="35" max="68" class="input mono num-input" aria-invalid="${fieldErrors.specA ? 'true' : 'false'}" value="${s.aMm}" />${errHtml('specA')}</div>
            <div class="field"><label for="specDbl">DBL — Cầu mũi (mm)</label><input id="specDbl" type="number" step="0.5" min="12" max="26" class="input mono num-input" aria-invalid="${fieldErrors.specDbl ? 'true' : 'false'}" value="${s.dblMm}" />${errHtml('specDbl')}</div>
            <div class="field"><label for="specTemple">Càng kính (mm)</label><input id="specTemple" type="number" step="1" min="120" max="160" class="input mono num-input" aria-invalid="${fieldErrors.specTemple ? 'true' : 'false'}" value="${s.templeMm}" />${errHtml('specTemple')}</div>
            <div class="field"><label for="specB">B — Cao tròng (mm)</label><input id="specB" type="number" step="0.5" min="24" max="60" class="input mono num-input" aria-invalid="${fieldErrors.specB ? 'true' : 'false'}" value="${s.bMm}" />${errHtml('specB')}</div>
            <div class="field"><label for="specEd">ED — Đ.kính hiệu dụng (mm)</label><input id="specEd" type="number" step="0.5" min="40" max="72" class="input mono num-input" aria-invalid="${fieldErrors.specEd ? 'true' : 'false'}" value="${s.edMm}" />${errHtml('specEd')}</div>
            <div class="field"><label for="specWeight">Trọng lượng (g)</label><input id="specWeight" type="number" step="0.5" min="4" max="80" class="input mono num-input" aria-invalid="${fieldErrors.specWeight ? 'true' : 'false'}" value="${s.weightG}" />${errHtml('specWeight')}</div>
            <div class="field"><label for="specMaxSph">Giới hạn độ tối đa (±D)</label><input id="specMaxSph" type="number" step="0.5" min="1" max="15" class="input mono num-input" aria-invalid="${fieldErrors.specMaxSph ? 'true' : 'false'}" value="${s.maxSphLimit}" />${errHtml('specMaxSph')}</div>
            <div class="field"><label for="specNosePad">Đệm mũi</label><input id="specNosePad" class="input" value="${esc(s.nosePad || '')}" /></div>
          </div>

          ${s.rimType === 'RIMLESS' ? `
            <div class="callout callout-warn">
              <div><strong>Ràng buộc gọng Không viền (Rimless):</strong> Không khuyến nghị lắp độ vượt quá <strong class="mono">±${s.maxSphLimit} D</strong>; bắt buộc chọn phôi tròng dai (Polycarbonate / Trivex / 1.60 MR-8) để tránh nứt lỗ khoan ốc.</div>
            </div>
          ` : ''}
        </div>

        <div class="section-block">
          <div class="section-head">
            <div>
              <h3 class="section-title">Biến thể Màu sắc &amp; Kích thước (Mỗi biến thể có tồn kho &amp; ảnh riêng)</h3>
              <div class="muted-xs">Hiển thị thành bộ chọn màu trên Website thay vì tạo nhiều sản phẩm trùng tên.</div>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" id="addVariantBtn">+ Thêm biến thể</button>
          </div>
          ${errHtml('variants')}
          <div class="scroll-hint">Vuốt ngang bảng để xem thêm cột giá bán, tồn kho và thao tác →</div>
          <div class="sub-table-wrap">
            <table class="sub-table">
              <thead>
                <tr>
                  <th>Màu sắc</th>
                  <th>Mã màu</th>
                  <th>Size (A-DBL-Càng)</th>
                  <th>SKU biến thể</th>
                  <th class="num">Giá bán (đ)</th>
                  <th class="num">Tồn kho</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${(d.variants || []).map((v, idx) => `
                  <tr>
                    <td><input type="text" class="input" aria-label="Tên màu biến thể ${idx + 1}" data-var-idx="${idx}" data-var-field="colorName" value="${esc(v.colorName)}" /></td>
                    <td><input type="color" aria-label="Chọn màu hex biến thể ${idx + 1}" data-var-idx="${idx}" data-var-field="colorHex" value="${esc(v.colorHex)}" style="width:40px;height:30px;padding:2px;border:1px solid #CBD6D5;border-radius:6px;background:#FFF" /></td>
                    <td><input type="text" class="input mono" aria-label="Kích thước biến thể ${idx + 1}" data-var-idx="${idx}" data-var-field="sizeLabel" value="${esc(v.sizeLabel)}" /></td>
                    <td><input type="text" class="input mono" aria-label="SKU biến thể ${idx + 1}" data-var-idx="${idx}" data-var-field="sku" value="${esc(v.sku)}" /></td>
                    <td class="num"><input type="text" inputmode="numeric" class="input mono num-input" aria-label="Giá biến thể ${idx + 1}" data-var-idx="${idx}" data-var-field="price" data-fmt-price="1" value="${esc(fmtNum(v.price))}" /></td>
                    <td class="num"><input type="number" class="input mono num-input" aria-label="Tồn kho biến thể ${idx + 1}" data-var-idx="${idx}" data-var-field="stockQty" value="${v.stockQty}" style="width:74px" /></td>
                    <td><button type="button" class="btn btn-danger-ghost btn-sm" data-del-var="${idx}" aria-label="Xóa biến thể ${idx + 1}">Xóa</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (d.category === 'LENS_BLANK') {
      dynamicHtml = `
        <div class="section-block">
          <div class="section-head"><h3 class="section-title">Thông số Tròng kính &amp; Váng phủ</h3></div>
          <div class="grid-3">
            <div class="field">
              <label for="lensDesign">Thiết kế tròng</label>
              <select id="lensDesign" class="select">
                ${['Đơn tròng cầu (Spherical)', 'Đơn tròng phi cầu (Aspheric)', 'Đa tròng (Progressive)', 'Tròng văn phòng (Degressive)', 'Kiểm soát cận thị'].map((opt) => `<option value="${opt}" ${s.lensDesign === opt ? 'selected' : ''}>${opt}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label for="lensIndex">Chiết suất</label>
              <select id="lensIndex" class="select">
                ${['1.50', '1.56', '1.59 (Polycarbonate)', '1.60', '1.67', '1.74'].map((opt) => `<option value="${opt}" ${s.refractiveIndex === opt ? 'selected' : ''}>${opt}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label for="lensMaterial">Chất liệu phôi</label>
              <input id="lensMaterial" class="input" value="${esc(s.material || '')}" />
            </div>
          </div>

          <div class="field" style="margin-top:12px">
            <label>Váng phủ &amp; Tính năng quang học</label>
            <div class="chip-grid">
              ${COATINGS.map((c) => {
                const checked = (s.coatings || []).includes(c.id);
                return `<label class="chip-toggle ${checked ? 'active' : ''}"><input type="checkbox" data-coating="${c.id}" ${checked ? 'checked' : ''} /><span>${esc(c.label)}</span></label>`;
              }).join('')}
            </div>
          </div>
        </div>

        <div class="section-block">
          <div class="section-head">
            <div>
              <h3 class="section-title">Tồn kho &amp; Bảng giá theo Dải độ (SPH × CYL)</h3>
              <div class="muted-xs">Nhập khoảng số từ–đến theo bước 0.25 D (Từ ≤ Đến). Hệ thống tự kiểm chồng lấn và cảnh báo hở dải ngay tại dòng.</div>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button type="button" class="btn btn-secondary btn-sm" id="sortTiersBtn">Sắp theo SPH</button>
              <button type="button" class="btn btn-secondary btn-sm" id="addTierBtn">+ Thêm dải độ</button>
            </div>
          </div>

          <div class="grid-2" style="margin-bottom:12px">
            <div class="field">
              <label for="lensStockMode">Chế độ cung ứng phôi</label>
              <select id="lensStockMode" class="select">
                <option value="POWER_MATRIX" ${s.stockMode === 'POWER_MATRIX' ? 'selected' : ''}>Giữ tồn kho theo ma trận độ (SPH × CYL)</option>
                <option value="RX_ORDER" ${s.stockMode === 'RX_ORDER' ? 'selected' : ''}>Không giữ tồn — Đặt hãng theo đơn (Rx Order)</option>
              </select>
            </div>
            <div class="field">
              <label for="lensLeadTime">Thời gian đặt hãng (ngày làm việc)</label>
              <input id="lensLeadTime" type="number" min="1" max="30" class="input mono num-input" aria-invalid="${fieldErrors.lensLeadTime ? 'true' : 'false'}" value="${s.leadTimeDays || 3}" />
              ${errHtml('lensLeadTime')}
            </div>
          </div>

          ${errHtml('powerTiers')}
          ${(() => {
            const tiers = s.powerTiers || [];
            const analysis = analyzePowerTiers(tiers);
            return `
          <div class="scroll-hint">Vuốt ngang bảng để xem thêm cột CYL, giá bán và tồn kho →</div>
          <div class="sub-table-wrap">
            <table class="sub-table">
              <thead>
                <tr>
                  <th>SPH Từ → Đến (D)</th>
                  <th>CYL Từ → Đến (D)</th>
                  <th class="num">Giá bán / đôi (đ)</th>
                  <th class="num">${s.stockMode === 'RX_ORDER' ? 'Trạng thái' : 'Tồn kho (đôi)'}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${tiers.map((t, idx) => {
                  const errs = analysis.rowErrors[idx] || [];
                  const warns = analysis.rowWarnings[idx] || [];
                  const rowCls = errs.length ? 'tier-row-err' : (warns.length ? 'tier-row-warn' : '');
                  return `
                  <tr class="${rowCls}">
                    <td>
                      <div class="tier-range-pair">
                        <input type="number" step="0.25" min="-20" max="20" class="input mono num-input" aria-label="SPH từ dòng ${idx + 1}" data-tier-idx="${idx}" data-tier-field="sphFrom" value="${t.sphFrom}" />
                        <span class="tier-range-sep">→</span>
                        <input type="number" step="0.25" min="-20" max="20" class="input mono num-input" aria-label="SPH đến dòng ${idx + 1}" data-tier-idx="${idx}" data-tier-field="sphTo" value="${t.sphTo}" />
                      </div>
                      ${errs.map((m) => `<div class="tier-msg tier-msg-err">${esc(m)}</div>`).join('')}
                      ${warns.map((m) => `<div class="tier-msg tier-msg-warn">${esc(m)}</div>`).join('')}
                    </td>
                    <td>
                      <div class="tier-range-pair">
                        <input type="number" step="0.25" min="-8" max="0" class="input mono num-input" aria-label="CYL từ dòng ${idx + 1}" data-tier-idx="${idx}" data-tier-field="cylFrom" value="${t.cylFrom}" />
                        <span class="tier-range-sep">→</span>
                        <input type="number" step="0.25" min="-8" max="0" class="input mono num-input" aria-label="CYL đến dòng ${idx + 1}" data-tier-idx="${idx}" data-tier-field="cylTo" value="${t.cylTo}" />
                      </div>
                    </td>
                    <td class="num"><input type="text" inputmode="numeric" class="input mono num-input" aria-label="Giá bán dải độ dòng ${idx + 1}" data-tier-idx="${idx}" data-tier-field="price" data-fmt-price="1" value="${esc(fmtNum(t.price))}" /></td>
                    <td class="num">${s.stockMode === 'RX_ORDER'
                      ? '<span class="badge badge-info">Đặt hãng</span>'
                      : `<input type="number" class="input mono num-input" aria-label="Tồn kho đôi dòng ${idx + 1}" data-tier-idx="${idx}" data-tier-field="stockPairs" value="${t.stockPairs}" style="width:82px" />`}</td>
                    <td><button type="button" class="btn btn-danger-ghost btn-sm" data-del-tier="${idx}" aria-label="Xóa dải độ dòng ${idx + 1}">Xóa</button></td>
                  </tr>
                `;
                }).join('')}
              </tbody>
            </table>
          </div>`;
          })()}

          <div class="field" style="margin-top:12px">
            <label>Phụ phí gia công Lab áp dụng</label>
            <div class="chip-grid">
              ${LAB_SURCHARGES.map((sc) => {
                const checked = (s.surcharges || []).includes(sc.id);
                return `<label class="chip-toggle ${checked ? 'active' : ''}"><input type="checkbox" data-surcharge="${sc.id}" ${checked ? 'checked' : ''} /><span>${esc(sc.label)} (+${fmtVnd(sc.fee)})</span></label>`;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    } else if (d.category === 'CONTACT_LENS') {
      dynamicHtml = `
        <div class="section-block">
          <div class="section-head"><h3 class="section-title">Thông số Kính áp tròng (Contact Lens)</h3></div>
          <div class="grid-3">
            <div class="field">
              <label for="clType">Loại kính áp tròng</label>
              <select id="clType" class="select">
                ${['Cầu (Spherical)', 'Loạn thị (Toric)', 'Đa tròng (Multifocal)', 'Tròng màu thẩm mỹ'].map((opt) => `<option value="${opt}" ${s.clType === opt ? 'selected' : ''}>${opt}</option>`).join('')}
              </select>
            </div>
            <div class="field"><label for="clBc">Độ cong nền BC (mm)</label><input id="clBc" type="number" step="0.1" min="8.0" max="9.2" class="input mono num-input" aria-invalid="${fieldErrors.clBc ? 'true' : 'false'}" value="${s.bcMm}" />${errHtml('clBc')}</div>
            <div class="field"><label for="clDia">Đường kính DIA (mm)</label><input id="clDia" type="number" step="0.1" min="13.5" max="15.0" class="input mono num-input" aria-invalid="${fieldErrors.clDia ? 'true' : 'false'}" value="${s.diaMm}" />${errHtml('clDia')}</div>
            <div class="field"><label for="clPower">Dải độ (Power)</label><input id="clPower" class="input mono" value="${esc(s.powerRange || '')}" /></div>
            <div class="field"><label for="clWater">Độ ẩm (%)</label><input id="clWater" type="number" min="20" max="80" class="input mono num-input" aria-invalid="${fieldErrors.clWater ? 'true' : 'false'}" value="${s.waterContentPct}" />${errHtml('clWater')}</div>
            <div class="field"><label for="clDkt">Hệ số thấm oxy (Dk/t)</label><input id="clDkt" type="number" min="10" max="200" class="input mono num-input" aria-invalid="${fieldErrors.clDkt ? 'true' : 'false'}" value="${s.dkT}" />${errHtml('clDkt')}</div>
          </div>
          <div class="grid-2" style="margin-top:12px">
            <div class="field">
              <label for="clSchedule">Chu kỳ thay</label>
              <select id="clSchedule" class="select">
                ${['1 ngày (Daily)', '2 tuần (Bi-weekly)', '1 tháng (Monthly)', '3 tháng / 6 tháng'].map((opt) => `<option value="${opt}" ${s.wearSchedule === opt ? 'selected' : ''}>${opt}</option>`).join('')}
              </select>
            </div>
            <div class="field"><label for="clLotNote">Ghi chú lô &amp; hạn dùng</label><input id="clLotNote" class="input" value="${esc(s.lotTrackingNote || '')}" /></div>
          </div>
        </div>
      `;
    } else if (d.category === 'READING_GLASSES') {
      dynamicHtml = `
        <div class="section-block">
          <div class="section-head"><h3 class="section-title">Thông số Kính đọc sách sẵn độ</h3></div>
          <div class="grid-3">
            <div class="field">
              <label for="rdPower">Độ đọc sẵn</label>
              <select id="rdPower" class="select">
                ${['+1.00 D', '+1.25 D', '+1.50 D', '+1.75 D', '+2.00 D', '+2.25 D', '+2.50 D', '+2.75 D', '+3.00 D', '+3.50 D'].map((opt) => `<option value="${opt}" ${s.readPower === opt ? 'selected' : ''}>${opt}</option>`).join('')}
              </select>
            </div>
            <div class="field"><label for="rdPd">Khoảng cách đồng tử chuẩn PD (mm)</label><input id="rdPd" type="number" min="56" max="70" class="input mono num-input" aria-invalid="${fieldErrors.rdPd ? 'true' : 'false'}" value="${s.standardPdMm}" />${errHtml('rdPd')}</div>
            <div class="field"><label for="rdWeight">Trọng lượng (g)</label><input id="rdWeight" type="number" class="input mono num-input" aria-invalid="${fieldErrors.rdWeight ? 'true' : 'false'}" value="${s.weightG}" />${errHtml('rdWeight')}</div>
          </div>
        </div>
      `;
    } else {
      dynamicHtml = `
        <div class="section-block">
          <div class="section-head"><h3 class="section-title">Thông số Vật tư / Phụ kiện / Dịch vụ</h3></div>
          <div class="grid-2">
            <div class="field"><label for="genSpec">Quy cách đóng gói / đơn vị</label><input id="genSpec" class="input" value="${esc(s.unitSpec || '')}" /></div>
            <div class="field"><label for="genOrigin">Xuất xứ / Thương hiệu</label><input id="genOrigin" class="input" value="${esc(s.origin || '')}" /></div>
          </div>
        </div>
      `;
    }

    return `
      <div class="section-block">
        <div class="section-head"><h3 class="section-title">Thông tin cơ bản</h3></div>
        <div class="grid-2">
          <div class="field">
            <label for="prodName">Tên sản phẩm <span class="req">*</span></label>
            <input id="prodName" class="input" aria-invalid="${fieldErrors.name ? 'true' : 'false'}" value="${esc(d.name)}" placeholder="Ví dụ: Gọng Titanium Nhật Bản dáng tròn" />
            ${errHtml('name')}
          </div>
          <div class="field">
            <label for="prodSku">Mã SKU chính <span class="req">*</span></label>
            <input id="prodSku" class="input mono" aria-invalid="${fieldErrors.sku ? 'true' : 'false'}" value="${esc(d.sku)}" placeholder="Ví dụ: FRM-TI-8801" />
            ${errHtml('sku')}
          </div>
          <div class="field">
            <label for="prodCat">Danh mục sản phẩm</label>
            <select id="prodCat" class="select">
              ${Object.entries(CATEGORIES).map(([k, v]) => `<option value="${k}" ${d.category === k ? 'selected' : ''}>${esc(v)}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label for="prodBrand">Thương hiệu</label>
            <input id="prodBrand" class="input" value="${esc(d.brand)}" placeholder="Essilor, Sabae Craft, Silhouette..." />
          </div>
          ${(!hasVariants(d.category) && d.category !== 'LENS_BLANK') ? `
            <div class="field">
              <label for="prodPrice">Giá bán (VNĐ) <span class="req">*</span></label>
              <input id="prodPrice" type="text" inputmode="numeric" class="input mono num-input" data-fmt-price="1" aria-invalid="${fieldErrors.salePrice ? 'true' : 'false'}" value="${esc(fmtNum(d.salePrice))}" />
              ${errHtml('salePrice')}
            </div>
            <div class="field">
              <label for="prodStock">Tồn kho hiện tại</label>
              <input id="prodStock" type="number" min="0" class="input mono num-input" aria-invalid="${fieldErrors.stockQty ? 'true' : 'false'}" value="${d.stockQty}" />
              ${errHtml('stockQty')}
            </div>
          ` : ''}
        </div>
      </div>
      ${dynamicHtml}
    `;
  }

  // ==================== TAB 2: VARIANT MEDIA & VIDEO 360° ====================
  function getActiveMediaHolder() {
    if (hasVariants(editingDraft.category) && editingDraft.variants && editingDraft.variants.length) {
      let v = editingDraft.variants.find((x) => x.id === activeMediaVariantId);
      if (!v) {
        v = editingDraft.variants[0];
        activeMediaVariantId = v.id;
      }
      return { holder: v.media, label: `${v.colorName} (${v.sizeLabel})`, hex: v.colorHex };
    }
    return { holder: editingDraft.media, label: editingDraft.name || 'Sản phẩm', hex: '#0F766E' };
  }

  function renderTabMedia() {
    const d = editingDraft;
    const active = getActiveMediaHolder();
    const variantBar = hasVariants(d.category) && d.variants.length ? `
      <div class="variant-media-bar">
        <span style="font-size:12.5px;font-weight:700;color:#4B5B58">Đang quản lý ảnh cho biến thể:</span>
        ${d.variants.map((v) => `
          <button type="button" class="variant-pill ${v.id === activeMediaVariantId ? 'active' : ''}" data-media-var="${esc(v.id)}">
            <span class="swatch-dot" style="background:${esc(v.colorHex)}"></span>
            <span>${esc(v.colorName)}</span>
          </button>
        `).join('')}
      </div>
    ` : '';

    return `
      ${variantBar}
      <div class="media-grid">
        ${ANGLES.map((a) => {
          const rawUrl = active.holder[a.key] || '';
          const safeUrl = sanitizeImageUrl(rawUrl);
          return `
            <div class="media-slot">
              <div class="media-slot-head">
                <span class="media-slot-title">${esc(a.label)}</span>
                <span class="badge ${safeUrl ? 'badge-ok' : 'badge-neutral'}">${safeUrl ? 'Đã có ảnh' : 'Trống'}</span>
              </div>
              <div class="media-preview-box">
                ${safeUrl ? `<img src="${esc(safeUrl)}" alt="${esc(a.label)} — ${esc(active.label)}" />` : `<span class="muted-xs">Chưa có ảnh cho góc này</span>`}
              </div>
              <div class="media-actions">
                <label class="btn btn-secondary btn-sm" style="cursor:pointer">
                  <span>Tải / Thay ảnh</span>
                  <input type="file" accept="image/*" data-upload-angle="${a.key}" aria-label="Tải ảnh lên cho ${esc(a.label)}" style="display:none" />
                </label>
                <button type="button" class="btn btn-secondary btn-sm" data-sample-angle="${a.key}">Dùng ảnh mẫu</button>
                ${safeUrl ? `<button type="button" class="btn btn-danger-ghost btn-sm" data-clear-angle="${a.key}">Xóa</button>` : ''}
              </div>
              <div class="url-row">
                <input type="url" class="input" id="urlInput_${a.key}" aria-label="Dán đường dẫn ảnh cho ${esc(a.label)}" placeholder="Dán URL ảnh https://..." value="${safeUrl.startsWith('https://') ? esc(safeUrl) : ''}" />
                <button type="button" class="btn btn-secondary btn-sm" data-apply-url="${a.key}">Áp dụng</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="section-block" style="margin-top:14px">
        <div class="section-head"><h3 class="section-title">Video quay 360° sản phẩm (Hiển thị tab Video 360° trên Website)</h3></div>
        <div class="url-row">
          <input type="url" id="videoUrlInput" class="input" aria-label="Đường dẫn Video 360 độ" placeholder="Dán link YouTube hoặc MP4 (https://...)" value="${esc(d.videoUrl || '')}" />
          <button type="button" class="btn btn-secondary btn-sm" id="applyVideoBtn">Cập nhật Video</button>
        </div>
        <div style="margin-top:10px;height:190px;border:1px solid #E5EBEB;border-radius:8px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#F7F9F9">
          ${toVideoEmbedHtml(d.videoUrl)}
        </div>
      </div>
    `;
  }

  // ==================== TAB 3: SAFE SCHEMA EDITOR (B-09) ====================
  function pushDocHistory() {
    docUndoStack.push(deepClone(editingDraft.docBlocks));
    if (docUndoStack.length > 25) docUndoStack.shift();
    docRedoStack = [];
  }

  function renderTabWebDesc() {
    const blocks = editingDraft.docBlocks || [];
    const blockLabels = {
      heading: 'Tiêu đề mục (H3)',
      paragraph: 'Đoạn văn bản (cho phép **đậm**, *nghiêng*, ^chỉ số^)',
      bullets: 'Danh sách gạch đầu dòng (mỗi dòng 1 ý)',
      spec_table: 'Khối tái sử dụng: Bảng thông số kỹ thuật (Tự đồng bộ)',
      optometrist_box: 'Khối tái sử dụng: Hộp khuyến nghị KTV Khúc xạ'
    };

    return `
      <div class="callout callout-teal" style="margin-top:0;margin-bottom:12px">
        <div><strong>Trình soạn thảo theo Schema giới hạn (An toàn XSS):</strong> Lưu cấu trúc JSON + lọc thẻ nguy hiểm khi hiển thị. Chỉ cho phép <code>h3, p, ul, strong, em, sup</code> và 2 khối tái sử dụng.</div>
        <span class="badge badge-ok">Đã bật Sanitizer</span>
      </div>

      <div class="editor-shell">
        <div class="editor-toolbar">
          <button type="button" class="editor-tool-btn" id="docUndoBtn" ${docUndoStack.length ? '' : 'disabled'}>Hoàn tác</button>
          <button type="button" class="editor-tool-btn" id="docRedoBtn" ${docRedoStack.length ? '' : 'disabled'}>Làm lại</button>
          <button type="button" class="editor-tool-btn" data-add-block="heading">+ Tiêu đề H3</button>
          <button type="button" class="editor-tool-btn" data-add-block="paragraph">+ Đoạn văn</button>
          <button type="button" class="editor-tool-btn" data-add-block="bullets">+ Danh sách</button>
          <button type="button" class="editor-tool-btn" data-add-block="spec_table">+ Bảng thông số</button>
          <button type="button" class="editor-tool-btn" data-add-block="optometrist_box">+ Hộp KTV</button>
          <button type="button" class="editor-tool-btn" id="cleanPasteDemoBtn">Dán sạch từ Word</button>
        </div>

        <div class="editor-blocks">
          ${blocks.map((b, idx) => `
            <div class="editor-block-card">
              <div class="editor-block-head">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                  <span style="font-size:12px;font-weight:700;color:#4B5B58">${esc(blockLabels[b.type] || b.type)}</span>
                  ${b.type === 'optometrist_box'
                    ? (b.approved && String(b.approvedBy || '').trim()
                      ? `<span class="badge badge-ok">Đã duyệt</span>`
                      : `<span class="badge badge-warn">Chưa duyệt — ẩn trên Website</span>`)
                    : ''}
                </div>
                <div style="display:flex;gap:6px">
                  <button type="button" class="btn btn-secondary btn-sm" data-move-up="${idx}" ${idx === 0 ? 'disabled' : ''}>↑</button>
                  <button type="button" class="btn btn-danger-ghost btn-sm" data-del-block="${idx}">Xóa khối</button>
                </div>
              </div>
              ${b.type === 'spec_table'
                ? '<div class="muted-xs">Tự động lấy thông số mới nhất từ Tab 1 khi hiển thị lên Website.</div>'
                : `<textarea class="textarea" aria-label="${esc(blockLabels[b.type])}" data-block-idx="${idx}" rows="${b.type === 'heading' ? 1 : 3}">${esc(b.text || '')}</textarea>`}
              ${b.type === 'optometrist_box' ? `
                <div class="approval-row">
                  <label class="toggle-inline">
                    <input type="checkbox" data-opt-approve="${idx}" ${b.approved ? 'checked' : ''} />
                    <span>Đã được KTV có chứng chỉ duyệt</span>
                  </label>
                  <input type="text" class="input" data-opt-approver="${idx}" aria-label="Tên và số chứng chỉ người duyệt khối ${idx + 1}" placeholder="Tên KTV & số CCHN (vd: KTV. Nguyễn Minh Tâm · CCHN-...)" value="${esc(b.approvedBy || '')}" />
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <div class="section-head" style="margin-top:16px">
        <h3 class="section-title">Xem trước nội dung đã Sanitize</h3>
        <button type="button" class="btn btn-secondary btn-sm" id="toggleMobileDescBtn">${mobilePreviewDesc ? 'Chuyển sang Desktop' : 'Xem trước Mobile (390px)'}</button>
      </div>
      <div class="editor-preview-frame ${mobilePreviewDesc ? 'mobile-sim' : ''}" id="liveSanitizedPreview">
        ${renderSafeDocBlocksHtml(editingDraft, true)}
      </div>
    `;
  }

  function renderDrawerBody() {
    const body = document.getElementById('drawerBody');
    if (activeTab === 'specs') {
      body.innerHTML = renderTabSpecs();
      bindTabSpecsEvents();
    } else if (activeTab === 'media') {
      body.innerHTML = renderTabMedia();
      bindTabMediaEvents();
    } else {
      body.innerHTML = renderTabWebDesc();
      bindTabWebDescEvents();
    }
    syncTabButtons();
  }

  function bindTabSpecsEvents() {
    const d = editingDraft;
    const bindVal = (id, fn) => {
      const el = document.getElementById(id);
      if (el) el.oninput = () => { fn(el.value); markDirty(); };
    };
    bindVal('prodName', (v) => { d.name = v; document.getElementById('drawerTitle').textContent = v || 'Sản phẩm mới'; });
    bindVal('prodSku', (v) => { d.sku = v; });
    bindVal('prodBrand', (v) => { d.brand = v; });
    bindVal('prodStock', (v) => { d.stockQty = Number(v); });

    const prodPriceEl = document.getElementById('prodPrice');
    if (prodPriceEl) {
      prodPriceEl.onfocus = () => { prodPriceEl.value = Number.isFinite(Number(d.salePrice)) ? String(Math.round(Number(d.salePrice))) : ''; };
      prodPriceEl.oninput = () => { d.salePrice = parseNumInput(prodPriceEl.value); markDirty(); };
      prodPriceEl.onblur = () => { if (Number.isFinite(d.salePrice)) prodPriceEl.value = fmtNum(d.salePrice); };
    }

    const catEl = document.getElementById('prodCat');
    if (catEl) {
      catEl.onchange = () => {
        const nextCat = catEl.value;
        const prevCat = d.category;
        if (nextCat === prevCat) return;
        const applyCatChange = () => {
          d.category = nextCat;
          d.specs = defaultSpecsForCategory(d.category);
          if (hasVariants(d.category) && (!d.variants || !d.variants.length)) {
            d.variants = [{
              id: 'VAR-' + Date.now(), colorName: 'Đen Nhám', colorHex: '#1E293B',
              sizeLabel: '49-20-145', sku: (d.sku || 'FRM') + '-BLK', stockQty: 5, price: d.salePrice || 1200000,
              media: { front: '', angle45: '', side: '', dims: '' }
            }];
            activeMediaVariantId = d.variants[0].id;
          }
          clearErrors();
          markDirty();
          renderDrawerBody();
        };
        openConfirmDialog({
          title: 'Đổi danh mục sản phẩm?',
          message: `Đổi từ "${CATEGORIES[prevCat]}" sang "${CATEGORIES[nextCat]}" sẽ xóa toàn bộ thông số kỹ thuật hiện tại (kể cả bảng dải độ nếu có). Bạn có chắc chắn muốn đổi?`,
          confirmLabel: 'Đổi danh mục',
          cancelLabel: 'Giữ nguyên',
          danger: true,
          onConfirm: applyCatChange,
          onCancel: () => { catEl.value = prevCat; }
        });
      };
    }

    // Frame / Sunglasses
    const bindSpec = (id, key, num = false, rerender = false) => {
      const el = document.getElementById(id);
      if (!el) return;
      const evt = el.tagName === 'SELECT' ? 'onchange' : 'oninput';
      el[evt] = () => {
        d.specs[key] = num ? Number(el.value) : el.value;
        markDirty();
        if (rerender) renderDrawerBody();
      };
    };
    bindSpec('specShape', 'shape');
    bindSpec('specRimType', 'rimType', false, true);
    bindSpec('specMaterial', 'material');
    bindSpec('specA', 'aMm', true, true);
    bindSpec('specDbl', 'dblMm', true, true);
    bindSpec('specTemple', 'templeMm', true);
    bindSpec('specB', 'bMm', true);
    bindSpec('specEd', 'edMm', true);
    bindSpec('specWeight', 'weightG', true);
    bindSpec('specMaxSph', 'maxSphLimit', true, true);
    bindSpec('specNosePad', 'nosePad');

    const addVarBtn = document.getElementById('addVariantBtn');
    if (addVarBtn) {
      addVarBtn.onclick = () => {
        d.variants.push({
          id: 'VAR-' + Date.now(),
          colorName: 'Màu mới',
          colorHex: '#0F766E',
          sizeLabel: `${d.specs.aMm || 49}-${d.specs.dblMm || 20}-${d.specs.templeMm || 145}`,
          sku: `${d.sku || 'FRM'}-V${d.variants.length + 1}`,
          stockQty: 3,
          price: d.variants[0]?.price || 1500000,
          media: { front: '', angle45: '', side: '', dims: '' }
        });
        markDirty();
        renderDrawerBody();
      };
    }

    document.querySelectorAll('[data-var-idx]').forEach((inp) => {
      const idx = Number(inp.dataset.varIdx);
      const f = inp.dataset.varField;
      if (f === 'price') {
        inp.onfocus = () => {
          const val = d.variants[idx].price;
          inp.value = Number.isFinite(Number(val)) ? String(Math.round(Number(val))) : '';
        };
        inp.oninput = () => {
          d.variants[idx].price = parseNumInput(inp.value);
          markDirty();
        };
        inp.onblur = () => {
          const val = d.variants[idx].price;
          if (Number.isFinite(val)) inp.value = fmtNum(val);
        };
      } else {
        inp.oninput = () => {
          const v = d.variants[idx];
          v[f] = f === 'stockQty' ? Number(inp.value) : inp.value;
          markDirty();
        };
      }
    });
    document.querySelectorAll('[data-del-var]').forEach((btn) => {
      btn.onclick = () => {
        const idx = Number(btn.dataset.delVar);
        const removed = d.variants.splice(idx, 1)[0];
        markDirty();
        renderDrawerBody();
        showToast(`Đã xóa biến thể "${removed.colorName}".`, () => {
          d.variants.splice(idx, 0, removed);
          renderDrawerBody();
        });
      };
    });

    // Lens
    bindSpec('lensDesign', 'lensDesign');
    bindSpec('lensIndex', 'refractiveIndex');
    bindSpec('lensMaterial', 'material');
    bindSpec('lensStockMode', 'stockMode', false, true);
    bindSpec('lensLeadTime', 'leadTimeDays', true);

    document.querySelectorAll('[data-coating]').forEach((cb) => {
      cb.onchange = () => {
        const id = cb.dataset.coating;
        const set = new Set(d.specs.coatings || []);
        if (cb.checked) set.add(id); else set.delete(id);
        d.specs.coatings = [...set];
        cb.closest('.chip-toggle').classList.toggle('active', cb.checked);
        markDirty();
      };
    });
    document.querySelectorAll('[data-surcharge]').forEach((cb) => {
      cb.onchange = () => {
        const id = cb.dataset.surcharge;
        const set = new Set(d.specs.surcharges || []);
        if (cb.checked) set.add(id); else set.delete(id);
        d.specs.surcharges = [...set];
        cb.closest('.chip-toggle').classList.toggle('active', cb.checked);
        markDirty();
      };
    });

    const sortTiersBtn = document.getElementById('sortTiersBtn');
    if (sortTiersBtn) {
      sortTiersBtn.onclick = () => {
        sortPowerTiers(d.specs.powerTiers || []);
        markDirty();
        renderDrawerBody();
        showToast('Đã sắp xếp bảng dải độ theo thứ tự SPH.');
      };
    }

    const addTierBtn = document.getElementById('addTierBtn');
    if (addTierBtn) {
      addTierBtn.onclick = () => {
        d.specs.powerTiers.push({ id: 'T' + Date.now(), sphFrom: -10.0, sphTo: -8.25, cylFrom: -2.0, cylTo: 0.0, stockPairs: 2, price: 1550000 });
        sortPowerTiers(d.specs.powerTiers);
        markDirty();
        renderDrawerBody();
      };
    }
    document.querySelectorAll('[data-tier-idx]').forEach((inp) => {
      const idx = Number(inp.dataset.tierIdx);
      const f = inp.dataset.tierField;
      if (f === 'price') {
        inp.onfocus = () => {
          const val = d.specs.powerTiers[idx].price;
          inp.value = Number.isFinite(Number(val)) ? String(Math.round(Number(val))) : '';
        };
        inp.oninput = () => {
          d.specs.powerTiers[idx].price = parseNumInput(inp.value);
          markDirty();
        };
        inp.onblur = () => {
          const val = d.specs.powerTiers[idx].price;
          if (Number.isFinite(val)) inp.value = fmtNum(val);
          renderDrawerBody();
        };
      } else {
        inp.oninput = () => {
          const t = d.specs.powerTiers[idx];
          t[f] = inp.value === '' ? Number.NaN : Number(inp.value);
          markDirty();
        };
        inp.onchange = () => {
          renderDrawerBody();
        };
      }
    });
    document.querySelectorAll('[data-del-tier]').forEach((btn) => {
      btn.onclick = () => {
        const idx = Number(btn.dataset.delTier);
        const removed = d.specs.powerTiers.splice(idx, 1)[0];
        markDirty();
        renderDrawerBody();
        const label = `${fmtDiopter(removed.sphFrom)} → ${fmtDiopter(removed.sphTo)} D`;
        showToast(`Đã xóa dải độ "${label}".`, () => {
          d.specs.powerTiers.splice(idx, 0, removed);
          renderDrawerBody();
        });
      };
    });

    // Contact lens & Reading glasses & Generic
    bindSpec('clType', 'clType');
    bindSpec('clBc', 'bcMm', true);
    bindSpec('clDia', 'diaMm', true);
    bindSpec('clPower', 'powerRange');
    bindSpec('clWater', 'waterContentPct', true);
    bindSpec('clDkt', 'dkT', true);
    bindSpec('clSchedule', 'wearSchedule');
    bindSpec('clLotNote', 'lotTrackingNote');
    bindSpec('rdPower', 'readPower');
    bindSpec('rdPd', 'standardPdMm', true);
    bindSpec('rdWeight', 'weightG', true);
    bindSpec('genSpec', 'unitSpec');
    bindSpec('genOrigin', 'origin');
  }

  function bindTabMediaEvents() {
    const active = getActiveMediaHolder();

    document.querySelectorAll('[data-media-var]').forEach((btn) => {
      btn.onclick = () => {
        activeMediaVariantId = btn.dataset.mediaVar;
        renderDrawerBody();
      };
    });

    document.querySelectorAll('[data-upload-angle]').forEach((inp) => {
      inp.onchange = () => {
        const file = inp.files && inp.files[0];
        if (!file) return;
        const key = inp.dataset.uploadAngle;
        const prev = active.holder[key] || '';
        const reader = new FileReader();
        reader.onload = () => {
          active.holder[key] = reader.result;
          markDirty();
          renderDrawerBody();
          showToast('Đã thay ảnh mới cho góc này.', () => {
            active.holder[key] = prev;
            renderDrawerBody();
          });
        };
        reader.readAsDataURL(file);
      };
    });

    document.querySelectorAll('[data-sample-angle]').forEach((btn) => {
      btn.onclick = () => {
        const key = btn.dataset.sampleAngle;
        const prev = active.holder[key] || '';
        const shapeKey = editingDraft.category === 'LENS_BLANK' ? 'lens' : (editingDraft.category === 'CONTACT_LENS' ? 'contact' : (editingDraft.specs.shape || 'round'));
        active.holder[key] = makeSampleSvgDataUrl(shapeKey, active.hex, key, `${active.label}`);
        markDirty();
        renderDrawerBody();
        showToast('Đã áp dụng ảnh mẫu.', () => {
          active.holder[key] = prev;
          renderDrawerBody();
        });
      };
    });

    document.querySelectorAll('[data-clear-angle]').forEach((btn) => {
      btn.onclick = () => {
        const key = btn.dataset.clearAngle;
        const prev = active.holder[key] || '';
        active.holder[key] = '';
        markDirty();
        renderDrawerBody();
        showToast('Đã xóa ảnh khỏi góc này.', () => {
          active.holder[key] = prev;
          renderDrawerBody();
        });
      };
    });

    document.querySelectorAll('[data-apply-url]').forEach((btn) => {
      btn.onclick = () => {
        const key = btn.dataset.applyUrl;
        const val = document.getElementById(`urlInput_${key}`).value.trim();
        if (val && !isValidHttpsUrl(val)) {
          showToast('URL ảnh không hợp lệ. Chỉ chấp nhận đường dẫn https:// sạch (không chứa khoảng trắng hoặc ký tự đặc biệt).');
          return;
        }
        const prev = active.holder[key] || '';
        active.holder[key] = val ? new URL(val).href : '';
        markDirty();
        renderDrawerBody();
        showToast('Đã cập nhật URL ảnh.', () => {
          active.holder[key] = prev;
          renderDrawerBody();
        });
      };
    });

    const videoBtn = document.getElementById('applyVideoBtn');
    if (videoBtn) {
      videoBtn.onclick = () => {
        const raw = document.getElementById('videoUrlInput').value.trim();
        if (raw && !isValidHttpsUrl(raw)) {
          showToast('URL video không hợp lệ. Chỉ chấp nhận đường dẫn https:// hợp lệ.');
          return;
        }
        editingDraft.videoUrl = raw ? new URL(raw).href : '';
        markDirty();
        renderDrawerBody();
        showToast('Đã cập nhật đường dẫn Video 360°.');
      };
    }
  }

  function bindTabWebDescEvents() {
    const undoBtn = document.getElementById('docUndoBtn');
    const redoBtn = document.getElementById('docRedoBtn');
    if (undoBtn) {
      undoBtn.onclick = () => {
        if (!docUndoStack.length) return;
        docRedoStack.push(deepClone(editingDraft.docBlocks));
        editingDraft.docBlocks = docUndoStack.pop();
        renderDrawerBody();
      };
    }
    if (redoBtn) {
      redoBtn.onclick = () => {
        if (!docRedoStack.length) return;
        docUndoStack.push(deepClone(editingDraft.docBlocks));
        editingDraft.docBlocks = docRedoStack.pop();
        renderDrawerBody();
      };
    }

    document.querySelectorAll('[data-add-block]').forEach((btn) => {
      btn.onclick = () => {
        pushDocHistory();
        const type = btn.dataset.addBlock;
        const defaults = {
          heading: 'Điểm nổi bật mới',
          paragraph: 'Nhập nội dung mô tả sạch, hỗ trợ **chữ đậm**, *chữ nghiêng* và chỉ số ^0.25D^.',
          bullets: 'Chống trượt khi vận động\nBảo hành vệ sinh siêu âm miễn phí trọn đời',
          spec_table: '',
          optometrist_box: 'Khuyến nghị từ KTV Khúc xạ Minh Quang...'
        };
        editingDraft.docBlocks.push(
          type === 'spec_table'
            ? { type }
            : (type === 'optometrist_box'
              ? { type, text: defaults[type], approved: false, approvedBy: '' }
              : { type, text: defaults[type] })
        );
        markDirty();
        renderDrawerBody();
      };
    });

    document.getElementById('cleanPasteDemoBtn').onclick = () => {
      pushDocHistory();
      const dirtyWordSample = '<p style="font-family:MsoNormal">Trọng lượng siêu nhẹ <script>alert("xss")</script> phù hợp đeo 10 tiếng/ngày.</p>';
      const clean = dirtyWordSample.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, '').trim();
      editingDraft.docBlocks.push({ type: 'paragraph', text: clean });
      markDirty();
      renderDrawerBody();
      showToast('Đã dán sạch văn bản (đã loại bỏ thẻ <script> và định dạng Word thừa).');
    };

    document.querySelectorAll('[data-block-idx]').forEach((ta) => {
      ta.oninput = () => {
        editingDraft.docBlocks[Number(ta.dataset.blockIdx)].text = ta.value;
        markDirty();
        document.getElementById('liveSanitizedPreview').innerHTML = renderSafeDocBlocksHtml(editingDraft, true);
      };
    });

    document.querySelectorAll('[data-opt-approve]').forEach((cb) => {
      cb.onchange = () => {
        const block = editingDraft.docBlocks[Number(cb.dataset.optApprove)];
        block.approved = cb.checked;
        markDirty();
        renderDrawerBody();
      };
    });

    document.querySelectorAll('[data-opt-approver]').forEach((inp) => {
      inp.oninput = () => {
        const block = editingDraft.docBlocks[Number(inp.dataset.optApprover)];
        block.approvedBy = inp.value;
        markDirty();
        document.getElementById('liveSanitizedPreview').innerHTML = renderSafeDocBlocksHtml(editingDraft, true);
      };
    });

    document.querySelectorAll('[data-del-block]').forEach((btn) => {
      btn.onclick = () => {
        pushDocHistory();
        editingDraft.docBlocks.splice(Number(btn.dataset.delBlock), 1);
        markDirty();
        renderDrawerBody();
      };
    });

    document.querySelectorAll('[data-move-up]').forEach((btn) => {
      btn.onclick = () => {
        const idx = Number(btn.dataset.moveUp);
        if (idx <= 0) return;
        pushDocHistory();
        const tmp = editingDraft.docBlocks[idx - 1];
        editingDraft.docBlocks[idx - 1] = editingDraft.docBlocks[idx];
        editingDraft.docBlocks[idx] = tmp;
        markDirty();
        renderDrawerBody();
      };
    });

    document.getElementById('toggleMobileDescBtn').onclick = () => {
      mobilePreviewDesc = !mobilePreviewDesc;
      renderDrawerBody();
    };
  }

  // ==================== WEBSITE PREVIEW MODAL ====================
  function openWebPreview() {
    if (!editingDraft) return;
    previewVariantIdx = 0;
    previewMediaKey = 'front';
    renderWebPreview();
    document.getElementById('previewBackdrop').classList.remove('hidden');
    document.getElementById('previewModal').classList.remove('hidden');
  }

  function closeWebPreview() {
    document.getElementById('previewBackdrop').classList.add('hidden');
    document.getElementById('previewModal').classList.add('hidden');
  }

  function renderWebPreview() {
    const p = editingDraft;
    const hasVar = hasVariants(p.category) && p.variants && p.variants.length > 0;
    const currentVar = hasVar ? (p.variants[previewVariantIdx] || p.variants[0]) : null;
    const mediaHolder = currentVar ? currentVar.media : p.media;
    const safeMediaUrl = previewMediaKey === 'video' ? '' : sanitizeImageUrl(mediaHolder[previewMediaKey]);
    const stageHtml = previewMediaKey === 'video'
      ? toVideoEmbedHtml(p.videoUrl)
      : (safeMediaUrl
        ? `<img src="${esc(safeMediaUrl)}" alt="${esc(p.name)}" />`
        : `<div class="muted-xs">Chưa có ảnh ở góc này</div>`);

    const displaySku = currentVar ? currentVar.sku : p.sku;
    const displayPrice = currentVar ? fmtVnd(currentVar.price) : getDisplayPrice(p);
    const stockBadge = currentVar
      ? (currentVar.stockQty > 0 ? `<span class="badge badge-ok">Còn ${currentVar.stockQty} chiếc</span>` : '<span class="badge badge-err">Tạm hết màu này</span>')
      : (p.category === 'LENS_BLANK' && p.specs.stockMode === 'RX_ORDER' ? `<span class="badge badge-info">Đặt hãng (${p.specs.leadTimeDays} ngày)</span>` : '<span class="badge badge-ok">Sẵn hàng tại cửa hàng</span>');

    document.getElementById('previewBody').innerHTML = `
      <div class="web-preview-grid">
        <div>
          <div class="web-stage">${stageHtml}</div>
          <div class="web-thumb-strip">
            ${ANGLES.map((a) => `<button type="button" class="web-thumb-btn ${previewMediaKey === a.key ? 'active' : ''}" data-prev-media="${a.key}">${esc(a.label.replace(/^\d+\.\s*/, ''))}</button>`).join('')}
            ${p.videoUrl ? `<button type="button" class="web-thumb-btn ${previewMediaKey === 'video' ? 'active' : ''}" data-prev-media="video">Video 360°</button>` : ''}
          </div>
        </div>
        <div>
          <div class="muted-xs">${esc(p.brand)} · <span class="mono">${esc(displaySku)}</span></div>
          <h3 class="web-title">${esc(p.name)}</h3>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div class="web-price" style="margin:0">${esc(displayPrice)}</div>
            ${stockBadge}
          </div>

          ${hasVar ? `
            <div style="margin-bottom:14px">
              <div style="font-size:12.5px;font-weight:700;margin-bottom:6px">Chọn màu sắc: <span style="color:#0F766E">${esc(currentVar.colorName)} (${esc(currentVar.sizeLabel)})</span></div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${p.variants.map((v, i) => `
                  <button type="button" class="variant-pill ${i === previewVariantIdx ? 'active' : ''}" data-prev-var="${i}">
                    <span class="swatch-dot" style="background:${esc(v.colorHex)}"></span>
                    <span>${esc(v.colorName)}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${renderSafeDocBlocksHtml(p)}
        </div>
      </div>
    `;

    document.querySelectorAll('[data-prev-media]').forEach((b) => {
      b.onclick = () => { previewMediaKey = b.dataset.prevMedia; renderWebPreview(); };
    });
    document.querySelectorAll('[data-prev-var]').forEach((b) => {
      b.onclick = () => { previewVariantIdx = Number(b.dataset.prevVar); renderWebPreview(); };
    });
  }

  // ==================== CMD+K QUICK SEARCH ====================
  function openCmdk() {
    document.getElementById('cmdkBackdrop').classList.remove('hidden');
    document.getElementById('cmdkModal').classList.remove('hidden');
    const inp = document.getElementById('cmdkInput');
    inp.value = '';
    renderCmdkResults('');
    setTimeout(() => inp.focus(), 20);
  }
  function closeCmdk() {
    document.getElementById('cmdkBackdrop').classList.add('hidden');
    document.getElementById('cmdkModal').classList.add('hidden');
  }
  function renderCmdkResults(q) {
    const query = q.trim().toLowerCase();
    const hits = products.filter((p) => !query || `${p.name} ${p.sku} ${p.brand}`.toLowerCase().includes(query)).slice(0, 8);
    const wrap = document.getElementById('cmdkResults');
    wrap.innerHTML = hits.length
      ? hits.map((p) => `<button type="button" class="cmdk-item" data-cmdk-id="${esc(p.id)}"><span><strong>${esc(p.name)}</strong> <span class="muted-xs mono">${esc(p.sku)}</span></span><span class="badge badge-neutral">${esc(CATEGORIES[p.category])}</span></button>`).join('')
      : '<div class="muted-xs" style="padding:14px;text-align:center">Không có kết quả khớp.</div>';
    wrap.querySelectorAll('[data-cmdk-id]').forEach((b) => {
      b.onclick = () => { closeCmdk(); openDrawer(b.dataset.cmdkId); };
    });
  }

  // ==================== GLOBAL EVENT BINDING ====================
  document.getElementById('sidebarCollapseBtn').onclick = () => {
    document.getElementById('appLayout').classList.toggle('sidebar-collapsed');
  };

  function closeMobileSidebar() {
    document.getElementById('storeSidebar').classList.remove('mobile-open');
    document.getElementById('sidebarBackdrop').classList.add('hidden');
  }
  document.getElementById('mobileMenuBtn').onclick = () => {
    document.getElementById('storeSidebar').classList.add('mobile-open');
    document.getElementById('sidebarBackdrop').classList.remove('hidden');
  };
  document.getElementById('sidebarBackdrop').onclick = closeMobileSidebar;

  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.onclick = () => {
      closeMobileSidebar();
      if (btn.dataset.nav !== 'catalog') {
        showToast(`Mục "${btn.title}" thuộc phạm vi màn hình khác của hệ thống.`);
      }
    };
  });

  document.getElementById('globalSearchTrigger').onclick = openCmdk;
  document.getElementById('closeCmdkBtn').onclick = closeCmdk;
  document.getElementById('cmdkBackdrop').onclick = closeCmdk;
  document.getElementById('cmdkInput').oninput = (e) => renderCmdkResults(e.target.value);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCmdk();
    } else if (e.key === 'Escape') {
      if (!document.getElementById('confirmModal').classList.contains('hidden')) {
        closeConfirmDialog(false);
        return;
      }
      if (!document.getElementById('cmdkModal').classList.contains('hidden')) {
        closeCmdk();
        return;
      }
      if (!document.getElementById('previewModal').classList.contains('hidden')) {
        closeWebPreview();
        return;
      }
      if (document.getElementById('storeSidebar').classList.contains('mobile-open')) {
        closeMobileSidebar();
        return;
      }
      if (editingDraft) {
        requestCloseDrawer();
      }
    }
  });

  document.getElementById('searchInput').oninput = (e) => { searchQuery = e.target.value; renderTable(); };
  document.getElementById('webFilterSelect').onchange = (e) => { filterWeb = e.target.value; renderTable(); };
  document.getElementById('addProductBtn').onclick = () => openDrawer(null);
  document.getElementById('quickDemoLensBtn').onclick = () => openDrawer('PRD-02');
  document.getElementById('quickDemoContactBtn').onclick = () => openDrawer('PRD-04');
  document.getElementById('quickDemoRimlessBtn').onclick = () => openDrawer('PRD-03');

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.onclick = () => {
      activeTab = btn.dataset.tab;
      renderDrawerBody();
    };
  });

  document.getElementById('publishToggle').onchange = (e) => {
    if (editingDraft) { editingDraft.showOnWeb = e.target.checked; markDirty(); }
  };

  document.getElementById('closeDrawerBtn').onclick = requestCloseDrawer;
  document.getElementById('cancelDrawerBtn').onclick = requestCloseDrawer;
  document.getElementById('drawerBackdrop').onclick = requestCloseDrawer;

  document.getElementById('confirmOkBtn').onclick = () => closeConfirmDialog(true);
  document.getElementById('confirmCancelBtn').onclick = () => closeConfirmDialog(false);
  document.getElementById('confirmBackdrop').onclick = () => closeConfirmDialog(false);

  document.getElementById('openWebPreviewBtn').onclick = openWebPreview;
  document.getElementById('closePreviewBtn').onclick = closeWebPreview;
  document.getElementById('previewBackdrop').onclick = closeWebPreview;

  document.getElementById('saveProductBtn').onclick = () => {
    if (!editingDraft) return;
    const errs = validateDraft(editingDraft);
    fieldErrors = errs;
    const errList = Object.values(errs);
    if (errList.length) {
      const banner = document.getElementById('formErrorBanner');
      banner.innerHTML = `<strong>Chưa thể lưu sản phẩm (${errList.length} lỗi cần sửa):</strong><ul>${errList.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>`;
      banner.classList.remove('hidden');
      activeTab = 'specs';
      renderDrawerBody();
      return;
    }

    if (editingDraft.category === 'LENS_BLANK' && editingDraft.specs.powerTiers) {
      sortPowerTiers(editingDraft.specs.powerTiers);
    }
    if (isNewProduct) {
      products.unshift(deepClone(editingDraft));
    } else {
      const idx = products.findIndex((p) => p.id === editingDraft.id);
      if (idx >= 0) products[idx] = deepClone(editingDraft);
    }
    const savedName = editingDraft.name;
    closeDrawer();
    renderFilterPills();
    renderTable();
    showToast(`Đã lưu sản phẩm "${savedName}" thành công.`);
  };

  // Init
  renderFilterPills();
  renderTable();
})();
