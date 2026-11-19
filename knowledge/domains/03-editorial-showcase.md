# Lĩnh vực 03: Trang Giới thiệu, Blog, Bài viết Chia sẻ & Tin tức (Editorial / Content / Showcase)

## 1. Triết lý Thiết kế Tổng thể
Mục tiêu cốt lõi là **nghệ thuật sắp đặt chữ (Editorial Typography), nhịp điệu thị giác có chiều sâu và tôn vinh nội dung**. Một trang bài viết hoặc giới thiệu chất lượng cao phải mang hơi thở của một ấn phẩm tạp chí hiện đại (như *Stripe Press, Monocle, Readwise, Substack*), tuyệt đối tránh bố cục template quảng cáo đại trà của AI.

---

## 2. Phân tách Đối tượng Sử dụng (Personas trong Nội dung / Tin tức)

| Đối tượng | Persona Gốc | Trọng tâm Giao diện (UI/UX Mindset) |
| :--- | :--- | :--- |
| **Độc giả (Reader)** | `consumer-reader` | **Đọc sâu & Khám phá mạch lạc**: Cột bài viết chuẩn `65ch`, phân cấp tiêu đề/trích dẫn (Pull-quote)/chú thích ảnh tinh tế, mục lục thông minh (Sticky TOC), thời gian đọc ước tính, chuyển chế độ Sáng/Giấy ấm/Tối mượt mà trên điện thoại. |
| **Người đăng bài / Biên tập viên (Publisher / CMS Admin)** | `operator-admin` + `creator-builder` | **Soạn thảo không xao nhãng & Quản lý xuất bản nhanh**: Giao diện tách biệt hoàn toàn với trang đọc — gồm danh sách bài viết theo trạng thái (`Nháp`, `Hẹn giờ đăng`, `Đã xuất bản`), bộ kiểm tra SEO/Thumbnail trực quan, và trình viết bài gọn sạch kèm xem trước (Live Preview). |
| **Khách tìm hiểu sản phẩm/cá nhân (Showcase Visitor)** | `consumer-reader` | **Ấn tượng thị giác & Câu chuyện (Storytelling)**: Dùng lưới bất đối xứng (Bento Grid có chủ đích hoặc Editorial Grid), minh hoạ thực tế của sản phẩm thay vì icon vô nghĩa, lời kêu gọi hành động (CTA) rõ ràng và tinh tế. |

---

## 3. Hệ thống Thị giác Gợi ý (Design Tokens)

- **Bảng màu (Color Palette)**:
  - *Nền (Surface)*: Màu giấy in cao cấp (`#FBF9F5` / `#F7F5F0`) hoặc Trắng ngà sắc nét (`#FAFAFA`), chữ chính màu mực đen ấm (`#141413` thay vì `#000000` gắt).
  - *Màu nhấn chính (Primary Accent)*: Đỏ gạch biên tập (`#C2410C` / `#B91C1C`), Xanh mực cổ điển (`#1E3A8A`), hoặc Đen tuyền tối giản.
- **Typography**:
  - *Tiêu đề bài viết / Display*: `Newsreader`, `Instrument Serif`, `Playfair Display` hoặc `Fraunces` (tạo chất báo chí/xuất bản sang trọng).
  - *Thân bài đọc*: `Source Serif 4`, `Literata` (nếu thích phong cách sách) hoặc `Plus Jakarta Sans` / `Inter` (nếu thích phong cách blog công nghệ hiện đại).
  - *Metadata (Ngày đăng, Chuyên mục, Tác giả)*: `JetBrains Mono` viết hoa nhẹ (`uppercase`, `letter-spacing: 0.06em`, `font-size: 12px`).
- **Bo góc & Đường kẻ**: Ưu tiên đường kẻ mảnh `1px solid` như khung báo in truyền thống kết hợp lưới hiện đại; bo góc nhỏ (`4px–8px`).

---

## 4. Từ khoá Tìm kiếm Tham chiếu trên Mobbin
- Khi làm giao diện Độc giả / Showcase: `article detail`, `news feed`, `editorial layout`, `blog post`, `publication home` (Tham khảo: *Substack, Medium, NYTimes, Artifact, Readwise, Vercel*).
- Khi làm giao diện Người đăng bài / Quản trị tin: `cms editor`, `post management`, `publishing workflow` (Tham khảo: *Ghost Admin, Substack Writer, Notion*).

---

## 5. Nhật ký Tích luỹ Kinh nghiệm (Accumulated Learnings)
*(Ghi bằng `proto learn` — không sửa tay định dạng dòng. ✅ áp dụng · ⏳ ứng viên (1 dự án, DESIGN-CONTEXT dự án được ghi đè) · ⛔ đã bị thay thế, bỏ qua)*
- **[D03-001]** ✅ · 2026-11-18 · nguồn: tri-thức-nền — Luôn tách 2 mockup riêng biệt khi thiết kế hệ thống tin tức/blog: (1) Giao diện Độc giả (`reader-view`) và (2) Giao diện Quản trị/Đăng bài (`publisher-cms`), không dùng chung một kiểu khung sidebar cho cả hai.
