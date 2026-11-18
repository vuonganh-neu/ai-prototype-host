# Persona 2: Operator / Publisher / Admin (Nhân viên Vận hành, Người đăng bài, Quản trị viên)

## 1. Bản chất & Tâm lý sử dụng
- **Mục tiêu chính**: Xử lý công việc lặp lại hàng ngày với **tốc độ cao nhất và ít sai sót nhất** (đăng bài, duyệt nội dung, tra cứu hồ sơ, xử lý đơn/yêu cầu, phân quyền, nhập liệu).
- **Tâm thế**: Dùng ứng dụng nhiều giờ mỗi ngày; ghét các hiệu ứng màu mè làm chậm thao tác, ghét việc phải cuộn trang quá nhiều hoặc bấm 4–5 cú click chỉ để sửa 1 trường dữ liệu.
- **Thiết bị ưu tiên**: **Desktop / Laptop màn hình rộng** (ưu tiên số 1), có hỗ trợ Tablet/Mobile để duyệt nhanh khi di chuyển.

## 2. Nguyên tắc UI/UX Bắt buộc
1. **Mật độ Thông tin Cao nhưng Có Trật tự (High-Density, High-Clarity)**:
   - Ưu tiên **Data Table sắc nét** hoặc **Split-View (Danh sách bên trái + Chi tiết/Drawer bên phải)** thay vì dùng lưới Card to chiếm diện tích.
   - Chiều cao dòng trong bảng vừa phải (`36px–44px`), căn lề chuẩn xác: Chữ căn trái, Trạng thái (Badge) căn trái/giữa, Con số & Tiền tệ **bắt buộc căn phải** và dùng `font-variant-numeric: tabular-nums` (hoặc font Monospace).
2. **Tối ưu Tốc độ & Thao tác Hàng loạt (Speed & Batch Workflows)**:
   - Luôn có thanh **Tìm kiếm nhanh + Bộ lọc trạng thái dạng Pill/Tab** (ví dụ: `Tất cả (128)`, `Chờ duyệt (14)`, `Bản nháp (5)`, `Đã xuất bản (109)`) ngay đầu bảng.
   - Hỗ trợ chọn nhiều dòng (Checkbox) kèm thanh **Bulk Action Bar** nổi lên khi có mục được chọn.
   - Hiển thị gợi ý phím tắt (`⌘K`, `N`, `E`, `Esc`) trên các nút hành động chính.
3. **Chỉnh sửa tại chỗ & Xem trước Tức thì (Inline Edit & Slide-over Drawer)**:
   - Tránh chuyển trang toàn màn hình nếu có thể mở **Side Drawer (500px–680px)** để xem nhanh và duyệt/sửa ngay trong ngữ cảnh danh sách.
4. **Trạng thái Rõ ràng (Semantic Status Badges)**:
   - Dùng hệ màu ngữ nghĩa dịu mắt nhưng phân biệt tức thì:
     - Thành công / Đã xuất bản: Xanh lá trầm (`#15803d` trên nền `#dcfce7`)
     - Chờ duyệt / Cảnh báo: Vàng hổ phách (`#b45309` trên nền `#fef3c7`)
     - Lỗi / Từ chối: Đỏ trầm (`#b91c1c` trên nền `#fee2e2`)
     - Nháp / Lưu trữ: Xám trung tính (`#52525b` trên nền `#f4f4f5`)

## 3. Mẫu tham chiếu thực tế (Mobbin / Web)
- **Quản trị & Vận hành**: Linear, Stripe Dashboard, Retool, Attio CRM, Cal.com, Ghost CMS Admin, Payload CMS.
