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
*(Ghi bằng `proto learn` — không sửa tay định dạng dòng. ✅ áp dụng · ⏳ ứng viên (1 dự án, DESIGN-CONTEXT dự án được ghi đè) · ⛔ đã bị thay thế, bỏ qua)*
- **[D02-001]** ✅ · 2026-11-18 · nguồn: tri-thức-nền — Mọi con số tiền tệ, số lượng, phần trăm trong bảng bắt buộc căn phải (`text-align: right`) và thẳng hàng chữ số (`tabular-nums`).
- **[D02-002]** ✅ · 2026-11-18 · nguồn: tri-thức-nền — Không dùng Modal nhỏ giữa màn hình cho các biểu mẫu quá 5 trường; hãy dùng **Slide-over Drawer bên phải** để vừa nhìn được danh sách bên trái vừa đối chiếu.
- **[D02-003]** ⏳ · 2026-11-19 · nguồn: optic-shop/00-full-mvp@v2-optical-suite — Màn hình danh sách nghiệp vụ mặc định có đủ Thêm/Xem/Sửa/Xóa, ô Tìm kiếm, Bộ lọc, Phân trang; ứng dụng có nhiều phân hệ thêm Tìm kiếm toàn cục (`⌘K`).
- **[D02-004]** ⏳ · 2026-11-19 · nguồn: optic-shop/00-full-mvp@v2-optical-suite — Danh mục sản phẩm lớn (hàng trăm mã trở lên) cần chuyển đổi được giữa Lưới thẻ có ảnh (để tư vấn) và Danh sách gọn / chế độ quét mã vạch (để thao tác nhanh).
- **[D02-005]** ⏳ · 2026-11-19 · nguồn: optic-shop/00-full-mvp@v2-optical-suite — Khi hệ thống có nhiều vai trò chuyên môn, mỗi vai có màn hình làm việc riêng chứa đúng dữ liệu ngữ cảnh vai đó cần khi tác nghiệp (ví dụ lịch sử của chính khách hàng/hồ sơ đang xử lý đặt cạnh form nhập mới), thay vì một màn hình chung cho mọi vai.
- **[D02-006]** ⏳ · 2026-11-19 · nguồn: optic-shop/00-full-mvp@v2-optical-suite — Dùng bộ icon SVG đồng bộ (Lucide hoặc tương đương) cho điều hướng và hành động; không dùng ký tự Unicode/emoji làm icon.
