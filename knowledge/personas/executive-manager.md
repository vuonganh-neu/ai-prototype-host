# Persona 4: Executive / Manager / Approver (Người Quản lý, Phê duyệt, Theo dõi Chỉ số)

## 1. Bản chất & Tâm lý sử dụng
- **Mục tiêu chính**: Nắm bắt toàn cảnh sức khoẻ hệ thống/dự án trong 10 giây, phát hiện điểm bất thường (cần xử lý/phê duyệt) và ra quyết định nhanh trên cả máy tính lẫn điện thoại.
- **Tâm thế**: Không có thời gian đọc bảng dữ liệu thô hàng nghìn dòng; cần **con số có ngữ cảnh so sánh** (tăng/giảm bao nhiêu % so với kỳ trước, mục nào đang trễ hạn, yêu cầu nào đang chờ mình duyệt).
- **Thiết bị ưu tiên**: **Desktop & Mobile (iPhone)** (thường xuyên mở điện thoại kiểm tra báo cáo hoặc bấm Duyệt/Từ chối).

## 2. Nguyên tắc UI/UX Bắt buộc
1. **Con số Luôn đi kèm Ngữ cảnh (Contextual Metrics)**:
   - Không bao giờ chỉ hiện một con số trơ trọi `1,420`. Phải kèm theo:
     - So sánh kỳ trước (`+12.4% vs tháng trước`).
     - Biểu đồ xu hướng thu nhỏ (Sparkline SVG) hoặc thanh tiến độ hoàn thành mục tiêu (`84% chỉ tiêu Q4`).
2. **Ưu tiên Hành động Chờ xử lý (Action-Oriented Inbox / Queue)**:
   - Ngay đầu trang Dashboard phải có khu vực **"Cần bạn xử lý / Phê duyệt" (Needs Attention / Pending Approvals)** để người quản lý giải quyết ngay trong 1 cú click.
3. **Trực quan hoá Dữ liệu Tinh gọn (High-Signal Charts)**:
   - Tránh biểu đồ tròn (Pie chart) quá nhiều lát cắt hoặc biểu đồ 3D rối mắt.
   - Ưu tiên biểu đồ cột ngang (Horizontal Bar), biểu đồ đường/miền (Area Trend) sạch sẽ, có chú thích trực tiếp và bộ lọc thời gian (`Hôm nay`, `7 ngày`, `Tháng này`, `Quý này`).

## 3. Mẫu tham chiếu thực tế (Mobbin / Web)
- **Analytics & Management**: Stripe Dashboard, Mercury Bank, Ramp, PostHog, Plausible Analytics, Linear Insights.

---

## 4. Nhật ký Tích luỹ Kinh nghiệm
*(Ghi bằng `proto learn` — không sửa tay định dạng dòng. ✅ áp dụng · ⏳ ứng viên (1 dự án, DESIGN-CONTEXT dự án được ghi đè) · ⛔ đã bị thay thế, bỏ qua)*
*(Chỉ ghi ở đây bài học đúng với persona này **bất kể domain**. Bài học gắn với một loại sản phẩm → ghi vào domain; gắn với một dự án → DESIGN-CONTEXT dự án.)*
