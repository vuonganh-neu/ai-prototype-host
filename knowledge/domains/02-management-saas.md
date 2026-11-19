# Lĩnh vực 02: Ứng dụng Quản lý, Vận hành & Tài chính (Management / Operations / SaaS / ERP / CRM)

## 1. Triết lý Thiết kế Tổng thể
Ứng dụng quản lý đòi hỏi **độ tin cậy cao, trật tự thị giác sắc bén, mật độ dữ liệu hợp lý và thao tác cực nhanh**. Tránh hoàn toàn các khoảng trắng lãng phí kiểu trang giới thiệu sản phẩm; người dùng mở ứng dụng ra là để giải quyết công việc.

---

## 2. Phân tách Đối tượng Sử dụng (Personas trong Quản lý)

| Đối tượng | Persona Gốc | Trọng tâm Giao diện (UI/UX Mindset) |
| :--- | :--- | :--- |
| **Nhân viên Tác nghiệp (Daily Operator / Staff)** | `operator-admin` | **Tốc độ nhập liệu & Xử lý danh sách**: Bảng dữ liệu có bộ lọc nhanh theo trạng thái, tìm kiếm tức thì, chỉnh sửa nhanh trên dòng hoặc qua Side Drawer mà không mất vị trí cuộn, hỗ trợ phím tắt và thao tác hàng loạt. |
| **Cấp Quản lý / Phê duyệt (Manager / Approver / Finance)** | `executive-manager` | **Nắm bắt ngoại lệ & Phê duyệt 1 chạm**: Hộp thư "Chờ duyệt" nổi bật, chỉ số KPI có so sánh tăng/giảm và cảnh báo vượt ngưỡng, xem chi tiết chứng từ/yêu cầu và bấm Duyệt/Từ chối ngay trên cả Mac lẫn iPhone. |
| **Quản trị Hệ thống (System / Workspace Admin)** | `operator-admin` | **Cấu hình an toàn & Minh bạch**: Phân quyền theo vai trò (RBAC matrix), nhật ký hoạt động (Audit Log), cài đặt quy trình duyệt rõ ràng. |

---

## 3. Hệ thống Thị giác Gợi ý (Design Tokens)

- **Bảng màu (Color Palette)**:
  - *Nền (Surface)*: Xám đá phiến cực sáng (`#F8FAFC` / `#F4F4F5`) làm nền khung, Trắng (`#FFFFFF`) cho vùng bảng dữ liệu chính, đường viền mảnh `1px solid #E4E4E7`.
  - *Màu nhấn chính (Primary Accent)*: Đen than chì sắc sảo (`#18181B`) kết hợp một màu nhấn điều hướng chuẩn xác như Xanh đại dương đậm (`#0284C7` / `#0F172A`) hoặc Xanh ngọc lục bảo (`#059669` cho ứng dụng Tài chính).
- **Typography**:
  - *Giao diện & Bảng biểu*: `Inter` hoặc `Plus Jakarta Sans` (bắt buộc bật `font-feature-settings: "cv02", "cv03", "cv04", "cv11"` và `font-variant-numeric: tabular-nums` cho mọi cột số liệu/tiền tệ/ngày tháng).
  - *Mã đơn / ID / Số tiền*: `JetBrains Mono` hoặc `Geist Mono`.
- **Bo góc (Border Radius)**: Gọn và nghiêm túc (`6px` cho nút/input/badge, `8px` cho khung bảng/panel).

---

## 4. Từ khoá Tìm kiếm Tham chiếu trên Mobbin
- `data table filter`, `invoice detail drawer`, `approval workflow`, `crm pipeline`, `financial dashboard`, `audit log` (Tham khảo: *Linear, Stripe, Mercury, Ramp, Attio, Rippling*).

---

## 5. Nhật ký Tích luỹ Kinh nghiệm (Accumulated Learnings)
*(Khu vực này được cập nhật tự động qua lệnh `proto learn --domain 02-management-saas` sau mỗi dự án)*
- Mọi con số tiền tệ, số lượng, phần trăm trong bảng bắt buộc căn phải (`text-align: right`) và thẳng hàng chữ số (`tabular-nums`).
- Không dùng Modal nhỏ giữa màn hình cho các biểu mẫu quá 5 trường; hãy dùng **Slide-over Drawer bên phải** để vừa nhìn được danh sách bên trái vừa đối chiếu.
- **[2026-11-19]** Mọi màn hình quản lý mặc định phải có đủ CRUD (Thêm/Xem/Sửa/Xóa), ô Tìm kiếm (Search), Bộ lọc (Filter) và Phân trang (Pagination) + Global Quick Search (Cmd+K). Với màn hình POS/Catalog nhiều sản phẩm, bắt buộc hỗ trợ chuyển đổi Card Grid (có ảnh để tư vấn) và Compact List/Barcode Mode (khi danh mục hàng trăm/nghìn mã).
- **[2026-11-19]** Thiết kế thẩm mỹ mềm mại, hiện đại (Sidebar xanh đậm/tối sắc nét với SVG icon đồng bộ, nền xám ấm nhẹ, thẻ KPI có thanh nhấn viền trái, bo góc 10px, font Be Vietnam Pro/Inter), tránh dùng ký tự Unicode khô cứng. Khi hệ thống có nhiều vai trò chuyên môn (Owner, POS, KTV Khúc xạ, KTV Lab), phải áp dụng Role-specific UX: mỗi vai có màn hình & ngữ cảnh tác nghiệp riêng (VD: KTV Khúc xạ phải thấy ngay lịch sử đo mắt trước đó + biểu đồ độ cận song song khi đo mới).
