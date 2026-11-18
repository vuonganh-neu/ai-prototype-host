# Hệ thống Tri thức Thiết kế (Design Knowledge System)

Hệ thống này giải quyết triệt để vấn đề **"AI thiết kế rập khuôn, na ná nhau"** bằng cách phân tách tư duy UI/UX theo **Ma trận 2 chiều**:
1. **Chiều Lĩnh vực (Domain)**: Bản chất sản phẩm là gì? (Giáo dục, Quản lý, Nội dung/Tin tức, Công cụ Sáng tạo...).
2. **Chiều Đối tượng sử dụng (User Persona / Role)**: Ai đang ngồi trước màn hình này và mục tiêu của họ là gì?

---

## 1. Tại sao phải tách "Lĩnh vực" × "Đối tượng sử dụng"?

Một ứng dụng thực tế không bao giờ chỉ có một kiểu giao diện.
Ví dụ cùng là **Website Tin tức / Blog**:
- **Người đọc (Consumer / Reader)**: Cần trải nghiệm đọc sâu, chữ nghĩa (Typography) giàu cảm xúc, khoảng trắng rộng, không bị làm phiền bởi các nút công cụ phức tạp, ưu tiên Mobile-first.
- **Người đăng bài / Quản trị (Operator / Publisher)**: Cần giao diện CMS tốc độ cao, soạn thảo tập trung, quản lý trạng thái bài viết (Nháp / Chờ duyệt / Đã xuất bản), bộ lọc nhanh, ưu tiên Desktop & phím tắt.

Nếu không tách rõ **Đối tượng sử dụng**, AI sẽ trộn lẫn cả hai, tạo ra một giao diện nửa vời (vừa giống trang landing page màu mè, vừa nhồi nhét bảng biểu sơ sài).

---

## 2. Cấu trúc Ma trận Tri thức

```text
knowledge/
├── README.md                       # Tài liệu kiến trúc hệ thống tri thức (file này)
├── core-anti-ai-slop.md            # Bộ quy tắc cốt lõi chống thiết kế AI mặc định (bắt buộc mọi dự án)
├── personas/                       # CHIỀU 1: 4 Nhóm Đối tượng sử dụng cốt lõi
│   ├── consumer-reader.md          # Độc giả, Học viên, Khách truy cập (Readability, Emotion, Flow)
│   ├── operator-admin.md           # Vận hành, Quản trị, Đăng bài, Nhập liệu (Speed, Density, Batch Action)
│   ├── creator-builder.md          # Thiết kế, Soạn giảng, Biên tập (Canvas-first, Contextual Tools)
│   └── executive-manager.md        # Quản lý, Duyệt, Theo dõi chỉ số (Actionable KPIs, Anomaly, Decision)
└── domains/                        # CHIỀU 2: Các Lĩnh vực dự án (Tích luỹ dần theo thời gian)
    ├── 01-education.md             # Giáo dục (EdTech, LMS, Học trực tuyến)
    ├── 02-management-saas.md       # Ứng dụng Quản lý (ERP, CRM, Tài chính, Vận hành nội bộ)
    ├── 03-editorial-showcase.md    # Trang giới thiệu, Blog, Bài viết chia sẻ, Tin tức
    └── 04-creative-editor.md       # Trình quản lý thiết kế, Studio công cụ sáng tạo (Editor Platform)
```

---

## 3. Cách AI sử dụng Ma trận khi tạo Mockup

Trước khi viết bất kỳ dòng code HTML/CSS nào cho một màn hình:
1. **Xác định Domain** từ `docs/02-mockups/DESIGN-CONTEXT.md` của dự án → Đọc `knowledge/domains/<domain>.md`.
2. **Xác định Persona** của màn hình đang làm (Ví dụ: Màn hình học bài → `consumer-reader`; Màn hình quản lý khoá học → `operator-admin`) → Đọc `knowledge/personas/<persona>.md`.
3. **Áp dụng Luật Chống AI Mặc định** → Đọc `knowledge/core-anti-ai-slop.md`.
4. **Tham chiếu thực tế (Mobbin)** → Tìm kiếm mẫu thật theo từ khoá gợi ý trong file Domain & Persona.

---

## 4. Cơ chế Tích luỹ Tri thức (Continuous Learning)

Sau mỗi dự án hoặc mỗi lần người dùng phản hồi sửa đổi UI/UX:
- Những quy tắc thuộc về **riêng dự án đó** → Ghi vào `<project>/docs/02-mockups/DESIGN-CONTEXT.md`.
- Những bài học có giá trị **tái sử dụng cho cùng lĩnh vực hoặc cùng đối tượng người dùng** → Chạy lệnh `proto learn` (hoặc cập nhật vào `knowledge/domains/*.md` và `knowledge/personas/*.md` tại kho `mockup` này).
- Nhờ vậy, dự án sau thuộc cùng lĩnh vực sẽ thừa hưởng ngay gu thẩm mỹ và quy chuẩn UX đã được tinh chỉnh từ các dự án trước.
