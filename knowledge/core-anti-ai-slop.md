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
   - Phải nạp Google Fonts có chủ đích và phân cấp rõ: **1 font UI (Sans)** + **con số/mã/thông số** dùng Monospace hoặc `font-variant-numeric: tabular-nums`.
   - **Serif chỉ thêm khi màn hình có nội dung đọc dài / tiêu đề biên tập** (domain 01, 03, trang khách hàng). Công cụ làm việc (domain 02, 04) không bắt buộc Serif; dự án có thể chốt "1 font UI duy nhất" trong DESIGN-CONTEXT.

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
   - Mọi màn hình dành cho người dùng cuối (`consumer-reader`, `executive-manager`) bắt buộc phải hiển thị chuẩn trên cả Desktop (`1440px`), Tablet (`768px`) và iPhone (`390px`): tại `390px` thanh topbar/navbar không vỡ, bảng không tràn ngang trang (cuộn trong khung hoặc chuyển thành danh sách thẻ).
   - Màn hình chuyên dụng Desktop (`creator-builder` như Canvas Editor) phải xử lý gọn gàng trên màn hình MacBook 13"–16" (`1280px`–`1728px`) mà không bị vỡ thanh công cụ.

---

## 3. Quy trình tạo Đa phương án & Không ghi đè (Immutable Iterations)

1. **Lần đầu thiết kế một tính năng**:
   - Khuyến khích tạo 2 phương án có triết lý bố cục khác nhau rõ rệt (ví dụ `v1-minimal` và `v2-dense`, hoặc `v1-floating-toolbar` và `v2-docked-sidebar`) để người dùng dễ so sánh và chọn hướng.
2. **Khi người dùng phản hồi chỉnh sửa**:
   - **Tuyệt đối không ghi đè** lên phiên bản cũ (`v1`).
   - Luôn tạo phiên bản mới (`v2`, `v3`...) để người dùng dùng thanh **Version Switcher** trên trang Preview đối chiếu trực tiếp trước/sau.

---

## 4. Thứ tự Ưu tiên khi Quy tắc Mâu thuẫn

1. **DESIGN-CONTEXT.md của dự án** (bản sắc riêng, quyết định đã chốt qua review) — cao nhất.
2. **Persona** (`knowledge/personas/`) — hành vi người dùng.
3. **Domain** (`knowledge/domains/`) — quy chuẩn loại sản phẩm.
4. **Core** (file này) — mặc định chung. Riêng các mục *Cấm* ở phần 1 chỉ được dự án ghi đè khi DESIGN-CONTEXT nêu rõ lý do (vd: màu thương hiệu).

Trong cùng một tầng: ✅ thắng ⏳; ⛔ luôn bỏ qua. Nếu vẫn mâu thuẫn → hỏi người dùng, rồi ghi kết quả vào DESIGN-CONTEXT dự án.

---

## 5. Nhật ký Tích luỹ Kinh nghiệm
*(Ghi bằng `proto learn` — không sửa tay định dạng dòng. ✅ áp dụng · ⏳ ứng viên (1 dự án, DESIGN-CONTEXT dự án được ghi đè) · ⛔ đã bị thay thế, bỏ qua)*
- **[CORE-001]** ⏳ · 2026-11-18 · nguồn: editor-platform/01-universal-studio@v7-clean-gdocs-studio — Không hiển thị số mục tài liệu đặc tả (5.1, 4.2…) trên giao diện mockup; lưu trong thuộc tính `data-spec-ref` và chỉ hiện nhãn tra cứu khi người review nhấn giữ phím `Alt`.
- **[CORE-002]** ⏳ · 2026-11-18 · nguồn: editor-platform/01-universal-studio@v7-clean-gdocs-studio — Toàn bộ nhãn giao diện dùng một ngôn ngữ thống nhất theo ngôn ngữ của dự án (không trộn nhãn tiếng Anh và tiếng Việt).
- **[CORE-003]** ⏳ · 2026-11-18 · nguồn: editor-platform/01-universal-studio@v7-clean-gdocs-studio — Nút, pill và tab dùng `white-space: nowrap` để nhãn không bao giờ rớt dòng làm biến dạng nút.
- **[CORE-004]** ⏳ · 2026-11-24 · nguồn: optic-shop/02-clinical-exam-rx@v1-clinical-refraction — Khi phase chỉ design phần nội dung, giữ nguyên khung điều hướng đã chốt (tên menu, icon, thứ tự, layout sidebar/topbar/footer) so với bản chốt gần nhất; chỉ được thu gọn danh sách menu, chỉ đổi khi có yêu cầu rõ ràng — vì người duyệt tập trung vào nội dung nên thay đổi nhỏ ở khung dễ bị chấp thuận ngầm và áp vào bản triển khai.
