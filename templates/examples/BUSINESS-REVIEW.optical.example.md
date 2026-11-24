# Gói Nghiệp vụ để Review: optic-shop — VÍ DỤ MẪU (nhãn khoa)

> ⚠️ **Đây là ví dụ minh hoạ cách điền**, dựng từ kiến thức chung của ngành — **mọi quy tắc đều `⏳ chưa xác minh`**.
> Khi dùng thật: chép sang `<project>/docs/02-mockups/BUSINESS-REVIEW.md`, để skill `business-review` tra cứu nguồn chính thống,
> rồi nhờ KTV khúc xạ/chuyên gia thật xác nhận trước khi chuyển sang `✅`. Không coi các con số dưới đây là chuẩn.

## 1. Lĩnh vực & Thị trường
- **Ngành**: bán lẻ + dịch vụ nhãn khoa (đo mắt, gọng, tròng, lắp ráp tại lab, bảo hành).
- **Thị trường**: Việt Nam; chuẩn quốc tế tham chiếu: nhóm ISO về quang học nhãn khoa (từ vựng, đo gọng, dung sai tròng).
- **Vai trò vận hành thật**: Nhân viên bán hàng (POS) → KTV Khúc xạ (đo, ra đơn) → KTV Lab (cắt/lắp, QC) → Giao hàng/bảo hành; Chủ cửa hàng xem báo cáo.
- **Màn hình cần Tầng 2**: `02-clinical-exam-rx` (đo mắt & đơn kính), `01-catalog-media-editor` (thông số tròng/gọng), POS chọn tròng, phiếu Lab.
- **Bỏ qua Tầng 2**: đăng nhập, cài đặt thương hiệu/logo.

## 2. Thuật ngữ & Đơn vị chuẩn
| Thuật ngữ chuẩn | VN quen dùng / viết tắt | Đơn vị & định dạng | Ghi chú |
| :--- | :--- | :--- | :--- |
| Sphere | Độ cầu, SPH | Diop (D), bước 0.25, có dấu +/− | Cận (−) / viễn (+) |
| Cylinder | Độ trụ, CYL | D, bước 0.25 | Cần quy ước ghi dấu (− hoặc +) thống nhất toàn hệ thống |
| Axis | Trục, AXIS | độ nguyên 0–180 | Bắt buộc khi CYL ≠ 0; vô nghĩa khi CYL = 0 |
| Addition | Độ cộng thêm, ADD | D, dương | Chỉ cho kính đa tròng/đọc gần |
| Pupillary Distance | Khoảng cách đồng tử, PD | mm; hai mắt hoặc từng mắt | Phân biệt PD xa / PD gần |
| Visual Acuity | Thị lực, VA | định dạng thang (thập phân/Snellen/logMAR) | Chọn một thang và hiển thị nhất quán |
| Mắt phải / trái | OD / OS (hoặc P / T) | — | Không để lẫn thứ tự cột P/T giữa các màn hình |

## 3. Quy tắc Nghiệp vụ (BR-xx)
| ID | Quy tắc | Trạng thái | Nguồn | Xác minh lần cuối |
| :-: | :--- | :---: | :--- | :---: |
| BR-01 | SPH, CYL, ADD chỉ nhận bội số 0.25 D; hiển thị luôn kèm dấu và 2 chữ số thập phân | ⏳ | | |
| BR-02 | AXIS là số nguyên 0–180; bắt buộc nhập khi CYL ≠ 0; khoá/ẩn khi CYL = 0 | ⏳ | | |
| BR-03 | ADD ≥ 0 và chỉ xuất hiện ở đơn có nhìn gần/đa tròng | ⏳ | | |
| BR-04 | PD nằm trong khoảng hợp lý cho người lớn/trẻ em; ngoài khoảng → cảnh báo xác nhận, không chặn cứng | ⏳ | | |
| BR-05 | Giá trị SPH/CYL lớn bất thường → cảnh báo “kiểm tra lại số đo” trước khi lưu đơn | ⏳ | | |
| BR-06 | Đơn kính và tròng chọn phải tương thích (chiết suất/độ dày theo độ, loại tròng đơn/đa/…); độ cao + gọng nhỏ → gợi ý tròng mỏng | ⏳ | | |
| BR-07 | Đơn đo mắt ≠ Đơn kính ≠ Cấu hình tròng (ba khái niệm riêng); sửa đơn cũ phải tạo bản mới, không ghi đè | ⏳ | | |
| BR-08 | Có thời hạn tham khảo của đơn kính (nhắc tái khám) — số tháng do cửa hàng cấu hình | ⏳ | | |
| BR-09 | Giá vốn chỉ OWNER thấy; STAFF không thấy ở bất kỳ màn nào (kể cả tooltip/xuất file) | ⏳ | | |

## 4. Quy trình Thực tế
1. Khách đến / đặt lịch → ghi nhận hồ sơ (Customer 360).
2. KTV Khúc xạ đo: thị lực → đo khúc xạ → ra đơn (OD/OS, PD) → tư vấn.
3. POS chọn gọng + tròng theo đơn → đặt cọc → tạo SalesOrder.
4. Lab nhận phiếu: cắt/lắp → QC (đối chiếu đơn) → hoàn thành → báo khách (Zalo OA).
5. Giao hàng, thu phần còn lại, mở bảo hành; nhắc tái khám.

## 5. Tình huống Nguy hiểm đã biết (pre-mortem seed)
- Nhập nhầm dấu SPH/CYL hoặc đảo cột mắt phải/trái → kính sai độ → khách khó chịu/đau đầu, hoàn tiền.
- AXIS không khớp CYL, hoặc bỏ trống khi có CYL → lab gia công sai.
- Chọn tròng không tương thích độ → đơn không sản xuất được.
- Giá vốn lộ ra màn hình nhân viên → vi phạm quyền.

## 6. Nguồn Tra cứu Ưu tiên *(reviewer tra cứu và điền URL + ngày)*
| Nguồn | Loại | URL | Dùng cho |
| :--- | :--- | :--- | :--- |
| ISO 13666 (từ vựng quang học nhãn khoa) | chuẩn | *(tra cứu)* | Thuật ngữ chuẩn |
| ISO 8624 (hệ đo gọng kính) | chuẩn | *(tra cứu)* | Kích thước gọng (A/B/DBL…) |
| ISO 8980-1 / -2 (tròng thành phẩm, dung sai) | chuẩn | *(tra cứu)* | Dung sai độ, trụ, trục |
| ANSI Z80.1 (đơn kính) | chuẩn | *(tra cứu)* | Dung sai/định dạng đơn |
| Hiệp hội nhãn khoa/khúc xạ uy tín (VN & quốc tế) | hiệp hội | *(tra cứu)* | Quy trình đo, tần suất tái khám |
| Quy định VN về dữ liệu cá nhân, y tế/đo thị lực | pháp lý | *(tra cứu)* | Lưu trữ hồ sơ khách |

## 7. Chuyên gia Xác nhận
- KTV Khúc xạ / bác sĩ nhãn khoa có chứng chỉ của cửa hàng xác nhận BR-01…BR-08 trước khi chuyển ✅.

## 8. Nhật ký Cập nhật
- 2026-11-24 — ví dụ mẫu, chưa xác minh.
