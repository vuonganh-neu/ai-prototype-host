# Next-Version Brief — optic-shop / 02-clinical-exam-rx (từ v1-clinical-refraction → version kế tiếp)

> Đầu vào BẮT BUỘC cho lần design tiếp theo. Sinh bởi `proto brief`; người dùng/AI điền cột **Quyết định**.
> ⚠️ File này được commit cùng kho mockup (có thể công khai): chỉ ghi *yêu cầu thiết kế*, **không** chép giá vốn/dữ liệu khách/quy tắc nghiệp vụ độc quyền hay trích dẫn nguồn dài. Chi tiết xem báo cáo ở `.ops/reviews/optic-shop/02-clinical-exam-rx/v1-clinical-refraction/` (không commit).
> Quyết định: `Adopt` (làm ở version tới) · `Defer` (để sau, ghi lý do) · `Reject` (không làm, ghi lý do). Không để trống mục BLOCKER/MAJOR.

- **Sinh lúc**: 2026-11-24 · **Nguồn**: business-r1 (BLOCKER), human.md
- **Mục tiêu version tới** *(1–2 câu: thay đổi lớn nhất cần đạt)*: v2 của màn Đo mắt & Toa kính đạt “phiếu khám khúc xạ” an toàn cho demo cửa hàng: chuyển dạng trụ, tách nhìn xa/nhìn gần, SE + phân loại, thang thị lực đầy đủ, vòng đời toa bất biến, người ký + disclaimer + cờ chuyển tuyến, thông số lắp đa tròng — rồi mới viết phase doc/migration (lô P01D-1).

## 1. Giữ nguyên (đã tốt / đã chốt — không được phá khi sửa)
- Bước nhảy 0.25 D cho SPH/CYL/ADD và hỗ trợ cả dương (viễn) lẫn âm (cận); `roundQuarter()` + stepper ±0.25.
- Trục AXIS 1°–180°, chỉ mở khi có CYL, xoá khi CYL = 0 (đúng chuẩn TABO).
- PRISM + BASE 4 hướng đáy BI/BO/BU/BD.
- VA không kính / có kính từng mắt (UCVA/BCVA) tách 2 cột.
- PD từng mắt (mono) ↔ PD tổng (bino) + PD nhìn gần.
- Tách máy đo khách quan (autoref) ↔ toa chủ quan, có nút “chép sang”.
- Nguồn toa `IN_STORE` ↔ `EXTERNAL_RX` + tên bệnh viện + ảnh toa gốc.
- 5 nhóm mục đích dùng kính; gợi ý chiết suất theo |SPH| tối đa.
- Biểu đồ diễn tiến theo thời gian (đúng `PRJ-002`; chỉ cần đổi đại lượng vẽ sang SE).
- Dữ liệu mẫu nhất quán về mặt lâm sàng (trục 180 hợp lệ, ADD +1.75 ở tuổi 54 hợp lý).

## 2. Việc cần làm — từ review AI (Tầng 1 + Tầng 2)
| ID | Mức | Nguồn | Nội dung | Quyết định | Lý do (nếu Defer/Reject) |
| :-: | :-: | :-: | :--- | :-: | :--- |
| B-01 | BLOCKER | T2 | Form toa cần quy ước dấu trụ, nút chuyển dạng và hiển thị song song hai dạng ngay tại bước tiếp nhận toa ngoài. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 |
| B-02 | BLOCKER | T2 | Toa cần hai khối nhìn xa/nhìn gần tách biệt kèm độ gần tự tính; hỗ trợ mốc trung gian cho kính văn phòng. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 |
| B-03 | BLOCKER | T2 | Phiếu đo cần người ký thuộc nhân sự có chứng chỉ, cờ khuyến nghị chuyển tuyến và dòng disclaimer không phải chẩn đoán trên bản in. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 |
| B-04 | MAJOR | T2 | Hiển thị SE, phân loại mức độ và cảnh báo lệch khúc xạ hai mắt; biểu đồ diễn tiến vẽ theo SE. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 |
| B-05 | MAJOR | T2 | Bổ sung nhóm dữ liệu khám (máy đo, kính đang đeo, test hai mắt, mắt chủ đạo, tiền sử) và buộc số đo biện minh cho lăng kính. *(chi tiết: .ops/reviews/…/business-r1.md)* | Defer | Lô P01D-2; riêng ràng buộc số đo biện minh cho lăng kính làm ngay ở P01D-1 |
| B-06 | MAJOR | T2 | Thang thị lực đầy đủ gồm các mức dưới 1/10, pinhole, hai mắt và lưu kèm thang đo. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 |
| B-07 | MAJOR | T2 | Thêm thông số lắp đa tròng và kiểm tra chéo với kích thước gọng đã chọn. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 |
| B-08 | MAJOR | T2 | Toa có vòng đời (hiệu lực, trạng thái, khoá sau khi cắt kính, bản in) và sửa đổi tạo phiên bản mới kèm lý do. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 |
| B-09 | MAJOR | T2 | Mockup cần được chốt trước rồi mới mở ADR sửa hợp đồng; v2 phải phản ánh đầy đủ các trường toa mới. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1: v2 phản ánh đủ trường mới trước khi mở ADR/V2 |
| B-10 | MAJOR | T2 | Lớp dữ liệu khám cần có chỗ lưu ở hợp đồng; làm cùng đợt với toa. *(chi tiết: .ops/reviews/…/business-r1.md)* | Defer | Lô P01D-2 (autoref/keratometry/IOP); gộp cùng ADR với B-09 |
| B-11 | NIT | T2 | Ghi nhận nhu cầu theo dõi cận thị trẻ em; hoãn đến khi chủ cửa hàng quyết định mở mảng. *(chi tiết: .ops/reviews/…/business-r1.md)* | Defer | Lô P01D-3: hoãn đến khi chủ cửa hàng quyết định mở mảng kiểm soát cận thị |
| B-12 | NIT | T2 | Bước tăng đầu tiên của ô ADD cần hợp lý và hiển thị dấu. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Sửa nhỏ, làm cùng v2 |
| B-13 | NIT | T2 | Gợi ý chiết suất cần xét thêm trụ và kích thước gọng, kèm lưu ý đánh đổi độ tán sắc. *(chi tiết: .ops/reviews/…/business-r1.md)* | Defer | Báo cáo gốc chưa xếp lô; xem xét ở v3 (sau khi có thông số gọng) |

## 3. Phản hồi người dùng thật (Tầng 3)
- [2026-11-23] Máy đo khúc xạ cho được cả viễn, loạn, trục, cầu — phiếu đo phải phản ánh đủ.
- [2026-11-23] Cần có phần “phân loại, đặc điểm” (mức độ cận/viễn/loạn…) trên màn hình đo mắt.

## 4. Ý tưởng cải tiến (xếp theo tác động/công sức)
| ID | Ý tưởng | Tác động | Công sức | Quyết định |
| :-: | :--- | :-: | :-: | :-: |
| B-14 | Liên thông màn Đo mắt và Sản phẩm để gợi ý gọng theo PD và giới hạn độ. *(chi tiết: .ops/reviews/…/business-r1.md)* | Cao | Vừa | Defer (P01D-2) |

## 5. Câu hỏi còn mở / cần chuyên gia
- Phạm vi cửa hàng được phép thực hiện theo NĐ 96/2023/NĐ-CP Điều 57 — có được ghi nhãn áp, keratometry, cover test không, hay chỉ nhập từ máy/toa ngoài? (đối chiếu văn bản gốc, không dùng nguồn thứ cấp)
- Ngưỡng cờ chuyển tuyến (BCVA < 7/10, chênh 2 mắt, triệu chứng) do KTV/bác sĩ của cửa hàng chốt.
- Pantoscopic 7–12°, wrap mặc định ~5°, hiệu lực toa 12–24 tháng (người lớn)/6–12 tháng (trẻ em), ngưỡng anisometropia — các nguồn khác nhau; KTV khúc xạ chốt số dùng cho cửa hàng.
- Quy ước ghi dấu trụ mặc định của cửa hàng/lab (MINUS hay PLUS) và cách lab nhận toa trụ dương.
- Cửa hàng có làm kiểm soát cận thị trẻ em (B-11) không?

## 6. Bài học đáng ghi (`proto learn`)
- [ ] <lỗi lặp ≥ 2 lần → đề xuất quy tắc, nêu phạm vi project/domain/persona/core>

## 7. Lệnh khởi tạo version tới
```bash
~/.config/mockup/root/bin/proto new optic-shop 02-clinical-exam-rx <vN+1-slug> --phase P01D --notes "<tóm tắt từ mục tiêu ở trên>"
```
