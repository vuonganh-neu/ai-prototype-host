# Bộ Quy tắc Cốt lõi: Chống Thiết kế AI Mặc định (Anti-AI-Slop Rules)

Mọi prototype sinh ra trong hệ thống này **BẮT BUỘC** tuân thủ các nguyên tắc dưới đây để loại bỏ dấu hiệu "giao diện do AI tạo đại trà".

---

## 1. Những "Dấu vân tay AI" BỊ CẤM (Banned Patterns)

1. **Cấm bảng màu Indigo/Purple/Violet mặc định** (`#6366f1`, `#8b5cf6`, `linear-gradient(135deg, #667eea, #764ba2)`):
   - Trừ khi thương hiệu dự án yêu cầu rõ ràng, tuyệt đối không dùng tím/xanh tím mặc định của Tailwind.
   - Hãy dùng các cặp màu có chủ đích theo từng lĩnh vực (xem chi tiết trong `knowledge/domains/`).
2. **Cấm lạm dụng Card lồng trong Card (Nested Cards) & Đổ bóng mờ dày đặc**:
   - Không bọc mọi phần tử vào một hộp bo góc `16px` kèm `box-shadow: 0 10px 25px rgba(0,0,0,0.1)`.
   - Phân tách vùng thông tin bằng **khoảng trắng (whitespace)**, **đường kẻ mảnh `1px solid`** độ tương phản thấp (`hairline border`), hoặc sự chênh lệch rất nhẹ về màu nền (`surface-0`, `surface-1`, `surface-2`).
3. **Cấm nội dung giả sáo rỗng (Fake Placeholder Copy)**:
   - Không bao giờ dùng `"Lorem ipsum"`, `"John Doe"`, `"Jane Smith"`, `"Card Title 1"`, `"1,234"`, `"$99,999"`.
   - Phải lấy đúng thuật ngữ từ tài liệu dự án (`docs/`) và tạo dữ liệu tiếng Việt (hoặc ngôn ngữ của dự án) sống động, có độ dài ngắn khác nhau như thực tế (có tên dài, tên ngắn, trạng thái lỗi, số lẻ).
4. **Cấm bố cục "3 hộp tính năng kèm icon tròn ở giữa" cho ứng dụng phần mềm**:
   - Đừng biến màn hình làm việc (Workspace/App) thành trang quảng cáo (Marketing Landing Page). Màn hình làm việc phải đi thẳng vào dữ liệu và công cụ thao tác.
5. **Cấm dùng duy nhất font hệ thống nhàm chán mà không phân cấp**:
   - Phải nạp Google Fonts phù hợp với Domain (kết hợp rõ giữa Sans-serif cho UI, Serif cho bài đọc/tiêu đề biên tập, và Monospace cho con số/mã/thông số kỹ thuật).

---

## 2. Quy chuẩn Kỹ thuật cho Prototype Tĩnh (HTML/CSS/JS)

1. **Đường dẫn tương đối 100% (Relative Paths)**:
   - Vì chạy trên GitHub Pages ở đường dẫn con `/prototypes/<project>/<feature>/<version>/`, mọi liên kết CSS, JS, ảnh phải dùng `./styles.css`, `./app.js` (không dùng `/styles.css` ở gốc).
2. **CSS Variables (Design Tokens) ở đầu file**:
   - Luôn khai báo rõ bảng token trong `:root`:
     - `--bg-canvas`, `--bg-surface`, `--bg-elevated`, `--bg-subtle`
     - `--text-primary`, `--text-secondary`, `--text-muted`
     - `--border-subtle`, `--border-strong`
     - `--accent-primary`, `--accent-subtle`
     - `--font-sans`, `--font-display`, `--font-mono`
     - `--radius-sm`, `--radius-md`, `--radius-lg`
3. **Khả năng Tương tác Thật (Interactive Fidelity)**:
   - Mockup không phải là một bức ảnh tĩnh bằng HTML.
   - Các tab, bộ lọc, modal, drawer, menu ngữ cảnh, nút chuyển chế độ xem (Grid/List, Dark/Light nếu có), hoặc thanh công cụ phải bấm và phản hồi được bằng Vanilla JS nhẹ.
4. **Đa trạng thái (State Switcher nội bộ khi cần)**:
   - Một màn hình tốt nên cho phép người review bấm thử các trạng thái quan trọng: *Đầy đủ dữ liệu (Populated)*, *Trống (Empty state)*, *Đang chọn phần tử (Selected/Active)*, hoặc *Lỗi/Cảnh báo*.
5. **Đa thiết bị (Responsive)**:
   - Mọi màn hình dành cho người dùng cuối (`consumer-reader`, `executive-manager`) bắt buộc phải hiển thị chuẩn trên cả Desktop (`1440px`), Tablet (`768px`) và iPhone (`390px`).
   - Màn hình chuyên dụng Desktop (`creator-builder` như Canvas Editor) phải xử lý gọn gàng trên màn hình MacBook 13"–16" (`1280px`–`1728px`) mà không bị vỡ thanh công cụ.

---

## 3. Quy trình tạo Đa phương án & Không ghi đè (Immutable Iterations)

1. **Lần đầu thiết kế một tính năng**:
   - Khuyến khích tạo 2 phương án có triết lý bố cục khác nhau rõ rệt (ví dụ `v1-minimal` và `v2-dense`, hoặc `v1-floating-toolbar` và `v2-docked-sidebar`) để người dùng dễ so sánh và chọn hướng.
2. **Khi người dùng phản hồi chỉnh sửa**:
   - **Tuyệt đối không ghi đè** lên phiên bản cũ (`v1`).
   - Luôn tạo phiên bản mới (`v2`, `v3`...) để người dùng dùng thanh **Version Switcher** trên trang Preview đối chiếu trực tiếp trước/sau.
