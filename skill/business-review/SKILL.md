---
name: business-review
description: >-
  Tầng 2 — review nghiệp vụ/chuẩn ngành độc lập cho một phiên bản mockup: kiểm thuật ngữ, đơn vị, khoảng giá trị,
  quy trình thực tế và an toàn của lĩnh vực (ví dụ nhãn khoa: đơn kính SPH/CYL/AXIS/ADD/PD, tròng kính, quản lý kho),
  có tra cứu internet từ nguồn chính thống. Đọc "gói nghiệp vụ" docs/02-mockups/BUSINESS-REVIEW.md của dự án.
  Dùng khi user nói "review nghiệp vụ", "kiểm chuẩn ngành", "business review", sau ui-ux-review hoặc trước khi trình người dùng thật.
---

# business-review — Tầng 2: Review nghiệp vụ & chuẩn ngành độc lập

Đọc trước: [REVIEW.md](../REVIEW.md). Tầng này **khác Tầng 1**: quy tắc không nằm trong kho mockup mà trong **gói nghiệp vụ của từng dự án**, và bạn phải **tra cứu nguồn ngoài** để kiểm, không dựa trí nhớ.

## 0. Điều kiện chạy
- Phiên mới, không dính lịch sử người vẽ; chỉ đọc `prototypes/**` và repo dự án; chỉ ghi `business-rN.md` vào `.ops/reviews/…` (không commit). **Không sửa** `BUSINESS-REVIEW.md` — chỉ đề xuất trong báo cáo, người dùng duyệt rồi ghi.
- Dự án chưa có `BUSINESS-REVIEW.md` → dừng, báo người dùng: tạo từ [mẫu](../../templates/BUSINESS-REVIEW.template.md) (hoặc `proto init-project` đã tạo sẵn khung) và điền ít nhất mục 1–3.

## 1. Chuẩn bị
```bash
~/.config/mockup/root/bin/proto review-prep <project> <feature> <version> --tier business
```
Đọc `packet.md`, rồi `<project>/docs/02-mockups/BUSINESS-REVIEW.md` (tri thức chuyên ngành **thuộc repo dự án**), rồi tài liệu đặc tả nó trỏ tới (`docs/`, hợp đồng dữ liệu, phase brief). Không chép nội dung các file này vào kho mockup.

## 2. Quy trình
1. **Lập danh sách khẳng định nghiệp vụ** mà màn hình đang thể hiện: thuật ngữ, trường dữ liệu + đơn vị + khoảng/bước giá trị, công thức, luồng nghiệp vụ, trạng thái, quyền, cảnh báo an toàn. Lấy từ HTML + dữ liệu mẫu trong `app.js/data.js` + ghi chú version.
2. **Đối chiếu với gói nghiệp vụ** (mục chuẩn đã chốt, checklist). Mỗi khẳng định → `ĐÚNG` / `SAI` / `THIẾU` / `KHÔNG RÕ`.
3. **Tra cứu internet cho phần gói chưa phủ hoặc đã quá hạn xác minh** (`Xác minh lần cuối` > 6 tháng, hoặc chưa có nguồn):
   - Ưu tiên nguồn theo thứ tự: tiêu chuẩn/quy định (ISO, TCVN, bộ ngành, luật) > hiệp hội chuyên môn / tổ chức y tế > tài liệu nhà sản xuất/phần mềm ngành lớn > bài chuyên gia. Tránh blog SEO, diễn đàn không kiểm chứng.
   - Mỗi kết luận quan trọng cần **≥ 1 nguồn chính thống** (≥ 2 nếu liên quan sức khoẻ/tài chính/pháp lý). Ghi URL + ngày truy cập + trích ngắn bằng lời của bạn (không chép nguyên văn dài).
   - Gắn nhãn độ tin cậy: `[VERIFIED]` (nguồn chính thống khớp) · `[PARTIAL]` (nguồn gián tiếp/không đầy đủ) · `[UNVERIFIED]` (không tìm được nguồn — **không** được dùng làm cơ sở cho BLOCKER).
   - Chuẩn khác nhau theo quốc gia → nêu thị trường áp dụng (mặc định Việt Nam, nêu rõ nếu dùng chuẩn quốc tế thay thế).
4. **Pre-mortem**: “Nếu màn này gây sai sót thật ngoài đời, sai ở đâu và hậu quả gì?” (nhập sai số đo, nhầm đơn vị, bán nhầm hàng, lộ giá vốn…). Đây là nguồn chính của BLOCKER nghiệp vụ.
5. **Chấm 6 trục** (PASS/WARN/FAIL):

| Trục | Kiểm gì |
| :--- | :--- |
| **1. Đúng thuật ngữ & đơn vị** | Tên gọi chuẩn ngành (và tên người dùng VN quen dùng); đơn vị (D, mm, độ…); ký hiệu; viết tắt nhất quán với `docs/` |
| **2. Đúng dữ liệu & ràng buộc** | Khoảng/bước/dấu giá trị hợp lệ, trường bắt buộc, công thức tính, quan hệ giữa các trường; dữ liệu mẫu có thực tế không (không có giá trị bất khả) |
| **3. Đúng quy trình thực tế** | Thứ tự bước, vai trò làm gì, điểm bàn giao giữa các vai, trạng thái và chuyển trạng thái; so với cách cửa hàng/đơn vị vận hành thật |
| **4. Chuẩn, quy định & an toàn** | Tiêu chuẩn ngành, quy định pháp lý/bảo mật dữ liệu cá nhân, ngưỡng cảnh báo an toàn, nội dung không được hứa hẹn quá (y tế/tài chính) |
| **5. Hậu quả sai sót (pre-mortem)** | Khả năng nhập nhầm, thiếu xác nhận ở bước nguy hiểm, thiếu cảnh báo giá trị bất thường, thiếu dấu vết kiểm toán |
| **6. Phủ nghiệp vụ** | Màn hình có đủ tác vụ/dữ liệu mà người làm nghề cần không? Thiếu gì so với phần mềm ngành thực tế? |

6. **Severity**: `[BLOCKER]` = sai nghiệp vụ gây hậu quả thật hoặc vi phạm quy định bắt buộc — **phải có nguồn `[VERIFIED]`**. Thiếu nguồn → tối đa `[MAJOR]` ghi “cần chuyên gia xác nhận”.
7. **`[IDEA]` nghiệp vụ**: chức năng/cảnh báo phần mềm ngành làm tốt (có nguồn/ảnh tham chiếu), ghi tác động với người vận hành.
8. **Câu hỏi cho chuyên gia thật**: liệt kê tối đa 5 điểm AI không thể kết luận (đặc biệt y khoa/pháp lý) để chủ dự án hỏi người có chuyên môn (KTV khúc xạ, kế toán…). Đây là mục bắt buộc, có thể rỗng nhưng phải ghi “không có”.

## 3. Đầu ra
Ghi `.ops/reviews/<project>/<feature>/<version>/business-r<N>.md` theo [mẫu](../../templates/REVIEW-BUSINESS.template.md). Dòng đầu `VERDICT:`, dòng thứ hai `Revision: revN` (lấy từ packet). Finding một dòng, thêm nhãn nguồn: 

```text
- [MAJOR] B-02 `Khám mắt › ô ADD` — Vấn đề: cho nhập ADD âm. Căn cứ: BR-03 + https://… [VERIFIED 2026-11-24]. Hướng sửa: giới hạn khoảng, bước 0.25, cảnh báo ngoài khoảng. Brief: Ô ADD cần ràng buộc khoảng giá trị và cảnh báo khi vượt.
```

**Mỗi finding kết thúc bằng `Brief: …`** — một câu *yêu cầu thiết kế* đã lược số liệu bảo mật/quy tắc độc quyền/trích nguồn, vì chỉ câu này được đưa vào brief (commit cùng kho mockup, có thể công khai). Phần chi tiết ở lại báo cáo `.ops/`.

Cuối báo cáo có mục **“Đề xuất cập nhật BUSINESS-REVIEW.md”** (quy tắc mới đã xác minh, kèm nguồn) — người dùng duyệt rồi mới ghi vào gói.

**Mục cần chuyên gia mà chưa có chuyên gia** (MVP): vẫn ghi finding như thường, nhưng thêm phần **“Mặc định đề xuất”** — giá trị/quy tắc khuyến nghị tốt nhất hiện có (nghiêng về phía an toàn), mức rủi ro (giao diện / dữ liệu / **an toàn**) và chi phí refactor ước tính nếu giả định sai. Đây là đầu vào cho `proto seal --assume` và Sổ giả định của dự án (REVIEW.md §9.5). Không tự ghi vào gói.

**Vòng review lại (packet ghi rev ≥ 2)**: làm theo REVIEW.md §9 — kiểm phần thay đổi + hồi quy, giữ nguyên ID finding còn lỗi, finding đã sửa ghi ở mục “Đã khắc phục ở vòng này”.

## 4. Không làm
- Không đưa lời khuyên y tế/pháp lý/tài chính cá nhân; chỉ đánh giá *mockup có nhất quán với chuẩn công bố hay không*.
- Không bịa nguồn, không dùng `[UNVERIFIED]` làm căn cứ chặn.
- Không đưa dữ liệu khách hàng thật hay thông tin bảo mật của dự án vào truy vấn tìm kiếm; chỉ tra cứu khái niệm/chuẩn chung.
- Không chép tri thức chuyên ngành từ repo dự án sang nơi khác ngoài báo cáo `.ops/`.
