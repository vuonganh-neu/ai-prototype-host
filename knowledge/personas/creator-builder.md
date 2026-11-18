# Persona 3: Creator / Builder / Designer (Người Thiết kế, Soạn giảng, Sáng tạo trên Studio)

## 1. Bản chất & Tâm lý sử dụng
- **Mục tiêu chính**: Tạo ra sản phẩm trên một vùng làm việc trực quan (Canvas thiết kế, Trình dựng trang, Trình biên tập tài liệu/bài giảng tương tác, Trình chỉnh sửa media).
- **Tâm thế**: Cần **không gian sáng tạo tối đa (Canvas-first)**, các công cụ phải xuất hiện đúng lúc cần (Contextual) và lùi về sau khi không dùng, độ chính xác từng pixel.
- **Thiết bị ưu tiên**: **Desktop / MacBook / iPad Pro**.

## 2. Nguyên tắc UI/UX Bắt buộc
1. **Canvas-First & Neutral Chrome (Vùng sáng tạo là trung tâm)**:
   - Giao diện khung bao quanh (Toolbar, Layers Panel, Inspector Panel) phải dùng **tông màu trung tính tuyệt đối** (Dark Charcoal `#141416`–`#1e1e22` hoặc Cool Alabaster `#f4f4f6`) để không làm lệch cảm nhận màu sắc của tác phẩm trên Canvas.
   - Đường phân cách giữa các panel là đường kẻ mảnh `1px solid` sắc nét, bo góc nhỏ (`4px–6px` cho nút/input trong panel, `8px–10px` cho thanh công cụ nổi).
2. **Kiến trúc 3 Vùng Chuẩn Studio + Contextual Floating Bar**:
   - **Left Panel (`220px–260px`)**: Cây cấu trúc (Layers / Pages / Outline / Assets), có thể đóng/mở nhanh.
   - **Center Viewport (`flex: 1`)**: Vùng Canvas vô tận hoặc khung Artboard có điều khiển Zoom (`50%`, `100%`, `Fit`), Pan, Grid/Snap.
   - **Right Inspector (`260px–300px`)**: Các thuộc tính của đối tượng đang chọn (Alignment, Dimensions `X/Y/W/H`, Typography, Fill, Stroke, Effects), chia theo nhóm có đường kẻ ngang mảnh.
   - **Contextual Toolbar**: Thanh công cụ nhỏ nổi ngay gần đối tượng đang chọn hoặc neo gọn ở cạnh trên/dưới.
3. **Micro-controls Chuẩn xác**:
   - Các ô nhập thông số (`W`, `H`, `X`, `Y`, `Opacity`, `Radius`) dùng chiều cao gọn (`26px–28px`), nhãn chữ cái mờ nằm ngay bên trong ô (`X  120`, `Y  48`), dùng font Monospace hoặc Tabular Sans.
   - Trạng thái Đang chọn (Selected node) trên Canvas phải có khung viền Bounding Box (`1.5px solid accent`) kèm 8 điểm neo (Resize handles) rõ ràng.

## 3. Mẫu tham chiếu thực tế (Mobbin / Web)
- **Creative & Design Tools**: Figma, Framer, Webflow, Spline, Canva Studio, Tldraw, Linear (tư duy phím tắt & độ sắc nét).

- **[2026-11-18]** Không hiển thị số mục tài liệu đặc tả (như 5.1, 5.2, 4.2, 1., 2.) trực tiếp trên giao diện người dùng; lưu trong thuộc tính data-spec-ref và chỉ hiển thị nhãn tra cứu khi người dùng nhấn giữ phím Alt.

- **[2026-11-18]** Nút thu gọn/mở rộng ngăn công cụ (Drawer Toggle Ear) phải đặt bên ngoài thẻ <aside> của ngăn đó để khi ngăn thu gọn (hidden), nút bấm mở lại vẫn hiển thị cố định tại mép màn hình.

- **[2026-11-18]** Đồng nhất 100% ngôn ngữ Tiếng Việt và dùng 1 phông chữ giao diện duy nhất (Inter với tabular-nums), kết hợp white-space: nowrap cho mọi nút để không bao giờ bị rớt dòng biến dạng nút (như 'Trang 1', '+ Trang').

- **[2026-11-18]** Tận dụng thanh công cụ viên thuốc (Google Docs Pill Toolbar) kết hợp thanh trạng thái chân trang cố định (Microsoft Word Docked Footer) để gom điều hướng trang, đơn vị đo và thanh trượt thu phóng, tránh tạo nhiều thanh nổi chồng chéo.
