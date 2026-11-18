# Lĩnh vực 04: Trình Quản lý Thiết kế & Studio Sáng tạo (Creative Studio / Editor Platform)

## 1. Triết lý Thiết kế Tổng thể
Các công cụ thiết kế và quản lý tài nguyên sáng tạo (như dự án `editor-platform`) phải đạt chuẩn **Precision Pro-Tool (Công cụ chuyên nghiệp độ chính xác cao)**:
- Khung giao diện (UI Chrome) phải **trung tính, gọn, sắc nét từng pixel** để nhường toàn bộ sự chú ý cho tác phẩm trên Canvas hoặc Thumbnail thiết kế.
- Thao tác nhanh, phản hồi tức thì, hỗ trợ tư duy phím tắt và công cụ ngữ cảnh (Contextual Controls).

---

## 2. Phân tách Đối tượng Sử dụng (Personas trong Editor Platform)

| Đối tượng | Persona Gốc | Trọng tâm Giao diện (UI/UX Mindset) |
| :--- | :--- | :--- |
| **Người Sáng tạo trên Canvas (Canvas Creator / Designer)** | `creator-builder` | **Canvas-First & Micro-precision**: Vùng vẽ trung tâm rộng tối đa; thanh công cụ chính gọn gàng; bảng Layers/Pages bên trái và bảng Inspector thuộc tính (`X, Y, W, H, Fill, Stroke, Typography`) bên phải có mật độ cao, ô nhập số nhỏ gọn (`26px–28px`), thanh công cụ ngữ cảnh nổi lên đúng lúc chọn đối tượng. |
| **Người Quản lý Dự án & Tài nguyên (Workspace & Asset Manager)** | `operator-admin` | **Duyệt trực quan & Tổ chức thông minh**: Giao diện Quản lý File/Template/Component Library có lưới Thumbnail tỷ lệ chuẩn, xem trước nhanh khi rê chuột (Hover Scrub/Preview), lọc theo thẻ/kích thước/trạng thái, quản lý phiên bản và lịch sử chỉnh sửa. |
| **Người Xem / Duyệt Thiết kế (Reviewer / Stakeholder / Client)** | `consumer-reader` + `executive-manager` | **Xem mượt & Phản hồi tại chỗ (Pin Comments)**: Chế độ chỉ xem (View-only / Presentation mode) ẩn toàn bộ các bảng thông số kỹ thuật phức tạp, chỉ giữ nút Zoom, chuyển trang/phiên bản, ghim bình luận trực tiếp lên vị trí thiết kế và nút Phê duyệt. |

---

## 3. Hệ thống Thị giác Gợi ý (Design Tokens)

- **Bảng màu (Color Palette)**:
  - *Dark Studio Mode (Ưu tiên cho Canvas Editor)*:
    - Canvas backdrop: `#0E0E11` (có lưới chấm mờ hoặc kẻ ô tuỳ chọn)
    - Panel surface: `#18181B` / `#1E1E22`
    - Input / Control surface: `#27272A`
    - Hairline border: `1px solid #2E2E34`
  - *Light Precision Mode (Ưu tiên cho Asset Hub / Document Editor)*:
    - Canvas backdrop: `#F1F2F4`
    - Panel surface: `#FFFFFF`
    - Control surface: `#F4F4F5`
    - Hairline border: `1px solid #E4E4E7`
  - *Màu nhấn tương tác (Selection & Accent)*: Xanh Figma/Studio sắc nét (`#0D99FF` hoặc `#2563EB`) cho khung chọn (Bounding Box) và trạng thái Active; Tím Component (`#9747FF`) chỉ dùng riêng cho Master Component/Instance.
- **Typography**:
  - *Giao diện Panel & Toolbar*: `Inter` (`11px–12px` cho nhãn và ô thông số trong Inspector, `13px` cho danh sách file).
  - *Thông số toạ độ, kích thước, mã màu HEX*: `JetBrains Mono` (`11px–12px`, `tabular-nums`).
- **Bo góc (Border Radius)**: Nhỏ và chính xác (`4px–5px` cho ô input/nút trong Inspector, `8px` cho thanh Floating Toolbar và Menu nổi).

---

## 4. Từ khoá Tìm kiếm Tham chiếu trên Mobbin
- Khi làm màn hình Canvas Editor: `canvas editor`, `design tool inspector`, `layer panel`, `floating toolbar`, `color picker popover` (Tham khảo: *Figma, Framer, Webflow, Spline, Canva, Tldraw*).
- Khi làm màn hình Quản lý Thiết kế / Workspace: `file browser grid`, `template gallery`, `asset library`, `version history`.

---

## 5. Nhật ký Tích luỹ Kinh nghiệm (Accumulated Learnings)
*(Khu vực này được cập nhật tự động qua lệnh `proto learn --domain 04-creative-editor` sau mỗi dự án)*
- Trong bảng Inspector bên phải, không đặt nhãn (Label) nằm trên ô Input gây tốn chiều dọc; hãy dùng nhãn ký hiệu ngắn nằm ngang hoặc bên trong ô (`X 120`, `Y 45`, `W 320`, `H 180`) chia lưới 2 cột hoặc 4 cột gọn gàng.
- Luôn thiết kế trạng thái có ít nhất 1 đối tượng đang được chọn trên Canvas (kèm khung viền xanh và 8 điểm kéo góc) để người review đánh giá được ngay tương tác thật giữa Canvas và bảng Inspector.
- **[2026-11-18]** Không hiển thị số mục tài liệu đặc tả (như 5.1, 5.2, 4.2, 1., 2.) trực tiếp trên giao diện người dùng; lưu trong thuộc tính data-spec-ref và chỉ hiển thị nhãn tra cứu khi người dùng nhấn giữ phím Alt.
- **[2026-11-18]** Nút thu gọn/mở rộng ngăn công cụ (Drawer Toggle Ear) phải đặt bên ngoài thẻ <aside> của ngăn đó để khi ngăn thu gọn (hidden), nút bấm mở lại vẫn hiển thị cố định tại mép màn hình.
- **[2026-11-18]** Đồng nhất 100% ngôn ngữ Tiếng Việt và dùng 1 phông chữ giao diện duy nhất (Inter với tabular-nums), kết hợp white-space: nowrap cho mọi nút để không bao giờ bị rớt dòng biến dạng nút (như 'Trang 1', '+ Trang').
- **[2026-11-18]** Tận dụng thanh công cụ viên thuốc (Google Docs Pill Toolbar) kết hợp thanh trạng thái chân trang cố định (Microsoft Word Docked Footer) để gom điều hướng trang, đơn vị đo và thanh trượt thu phóng, tránh tạo nhiều thanh nổi chồng chéo.
