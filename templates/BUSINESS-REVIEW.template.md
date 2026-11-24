# Gói Nghiệp vụ để Review: {{PROJECT_NAME}}

> Đọc bởi skill `business-review` (Tầng 2). Đây là "bộ nhớ chuyên ngành" của dự án: chuẩn ngành, giới hạn giá trị, quy trình thật, nguồn tra cứu.
> Ghi **sự thật có nguồn**; quy tắc nào chưa xác minh thì để trạng thái `⏳ chưa xác minh` — reviewer sẽ tra cứu và đề xuất cập nhật.
> Khác `DESIGN-CONTEXT.md`: file kia nói về *giao diện*, file này nói về *nghiệp vụ & chuẩn ngành*.
> **Chú giải trạng thái:** `✅` có nguồn và các nguồn không mâu thuẫn (hoặc là định nghĩa/toán học) · `🔶` nguồn khác nhau / chỉ có nguồn thứ cấp / là thông lệ — cần chuyên gia xác nhận trước khi làm căn cứ BLOCKER · `⏳` chưa có nguồn.

## 1. Lĩnh vực & Thị trường
- **Ngành**: <ví dụ: bán lẻ & dịch vụ nhãn khoa>
- **Thị trường/quy định áp dụng**: Việt Nam <+ chuẩn quốc tế tham chiếu nào>
- **Vai trò vận hành thật** (ai làm gì, bàn giao thế nào): <…>
- **Màn hình có nghiệp vụ chuyên ngành** (cần Tầng 2): <danh sách feature slug>
- **Màn hình bỏ qua Tầng 2**: <đăng nhập, cài đặt giao diện…>

## 2. Thuật ngữ & Đơn vị chuẩn
| Thuật ngữ chuẩn | Cách người dùng VN gọi / viết tắt | Đơn vị & định dạng | Ghi chú |
| :--- | :--- | :--- | :--- |

## 3. Quy tắc Nghiệp vụ (BR-xx)
*(Mỗi dòng một quy tắc. `✅ đã xác minh` cần nguồn + ngày; `⏳ chưa xác minh` để reviewer tra cứu.)*
| ID | Quy tắc | Trạng thái | Nguồn | Xác minh lần cuối |
| :-: | :--- | :---: | :--- | :---: |
| BR-01 | <ví dụ: …> | ⏳ | | |

## 4. Quy trình Thực tế (để so luồng mockup)
1. <bước 1 — vai trò — đầu ra>

## 5. Tình huống Nguy hiểm đã biết (pre-mortem seed)
- <sai sót từng xảy ra / dễ xảy ra → hậu quả>

## 6. Nguồn Tra cứu Ưu tiên
| Nguồn | Loại | URL | Dùng cho |
| :--- | :--- | :--- | :--- |

## 7. Chuyên gia Xác nhận (người thật)
- <vai trò/người có thể xác nhận các điểm AI không kết luận được>

## 8. Sổ giả định (chờ chuyên gia / người dùng cuối xác nhận)
> Dành cho MVP chưa có chuyên gia: mục cần chuyên gia được chọn **mặc định theo khuyến nghị tốt nhất hiện có** (nghiêng về phía an toàn) để đi tiếp (`proto seal --assume`). Chỉ người duyệt mới ghi vào đây; reviewer chỉ đề xuất. Quy trình: `skill/REVIEW.md` §9.5.
> **Mức rủi ro**: `giao diện` · `dữ liệu` · `an toàn` (giả định mức an toàn nên có người có chuyên môn xem qua trước khi thử nghiệm với khách thật).
> **Refactor nếu sai**: `nhỏ` (đổi hằng số/copy) · `vừa` (đổi luồng/validate) · `lớn` (đổi mô hình dữ liệu).

| ID | Giả định (mặc định đã chọn) | Nguồn / độ tin cậy | Mức rủi ro | Refactor nếu sai | Ai xác nhận | Trạng thái |
| :-: | :--- | :--- | :---: | :---: | :--- | :---: |

*(Trạng thái: `⏳ chờ xác nhận` · `✅ đã xác nhận` · `🔁 sai — đã/đang sửa`. Sau thử nghiệm có ý kiến chuyên gia → cập nhật dòng này + quy tắc BR-xx tương ứng ở mục 3.)*

## 9. Nhật ký Cập nhật
- {{DATE}} — khởi tạo từ `proto init-project`.
