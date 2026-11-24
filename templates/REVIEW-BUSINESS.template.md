VERDICT: APPROVE_WITH_NOTES | CHANGES_REQUESTED | BLOCKER
Revision: rev{{REV}}

# Review Nghiệp vụ (Tầng 2) — {{PROJECT}} / {{FEATURE}} / {{VERSION}} · vòng r{{ROUND}}

- **Ngày**: {{DATE}} · **Reviewer**: <model/phiên độc lập> · **Thị trường áp dụng**: Việt Nam (nêu rõ nếu dùng chuẩn quốc tế)
- **Đã đọc**: BUSINESS-REVIEW.md · phase brief · hợp đồng dữ liệu · packet.md · next-brief bản trước (nếu có)

## Tóm tắt
- 2–4 gạch đầu dòng.

## Khẳng định nghiệp vụ đã đối chiếu
| # | Khẳng định trong mockup | Kết luận | Căn cứ (quy tắc gói / URL, ngày truy cập) | Độ tin cậy |
| :-: | :--- | :---: | :--- | :---: |
| 1 | <ví dụ: ô ADD cho nhập -3.00> | SAI | BR-03; https://… (2026-11-24) | VERIFIED / PARTIAL / UNVERIFIED |

## Pre-mortem
- Nếu màn này gây sai sót thật: <kịch bản> → <hậu quả> → <chốt chặn còn thiếu>

## Bảng chấm 6 trục
| Trục | Kết quả | Ghi chú |
| :--- | :---: | :--- |
| 1. Đúng thuật ngữ & đơn vị | PASS / WARN / FAIL | |
| 2. Đúng dữ liệu & ràng buộc | PASS / WARN / FAIL | |
| 3. Đúng quy trình thực tế | PASS / WARN / FAIL | |
| 4. Chuẩn, quy định & an toàn | PASS / WARN / FAIL | |
| 5. Hậu quả sai sót (pre-mortem) | PASS / WARN / FAIL | |
| 6. Phủ nghiệp vụ | PASS / WARN / FAIL | |

## Findings
<!-- Mỗi finding đúng MỘT dòng; BLOCKER bắt buộc có nguồn VERIFIED; kết thúc bằng `Brief:` (câu đã lược dữ liệu nhạy cảm — chỉ câu này vào brief commit được). File này nằm ở .ops/, không commit. -->
- [BLOCKER] B-01 `màn hình › vùng` — Vấn đề: … Căn cứ: BR-xx + URL [VERIFIED yyyy-mm-dd]. Hướng sửa: … Brief: <1 câu yêu cầu thiết kế, đã lược dữ liệu nhạy cảm>
- [MAJOR] B-02 `…` — … [PARTIAL] Brief: …
- [IDEA] B-03 `…` — Lợi ích cho người vận hành: … Tham chiếu: … Brief: …

## Đã kiểm & sạch
- <những gì đã đối chiếu và đúng — vòng sau không cần soát lại; brief dùng làm mục "Giữ nguyên">

## Nguồn đã tra cứu
| Nguồn | Loại (chuẩn/hiệp hội/nhà SX/khác) | URL | Ngày truy cập | Dùng cho finding |
| :--- | :--- | :--- | :--- | :--- |

## Câu hỏi cho chuyên gia thật (AI không thể kết luận)
1. <điểm cần người có chuyên môn xác nhận> — hoặc “không có”.

## Đề xuất cập nhật BUSINESS-REVIEW.md của dự án (chờ người dùng duyệt — reviewer không tự sửa)
- BR-xx mới: <quy tắc> — nguồn: <URL> — xác minh: <ngày>

## Điểm người dùng thật nên soi (Tầng 3)
1. …
