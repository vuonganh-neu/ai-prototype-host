# Next-Version Brief — optic-shop / 01-catalog-media-editor (từ v1-dynamic-studio → version kế tiếp)

> Đầu vào BẮT BUỘC cho lần design tiếp theo. Sinh bởi `proto brief`; người dùng/AI điền cột **Quyết định**.
> ⚠️ File này được commit cùng kho mockup (có thể công khai): chỉ ghi *yêu cầu thiết kế*, **không** chép giá vốn/dữ liệu khách/quy tắc nghiệp vụ độc quyền hay trích dẫn nguồn dài. Chi tiết xem báo cáo ở `.ops/reviews/optic-shop/01-catalog-media-editor/v1-dynamic-studio/` (không commit).
> Quyết định: `Adopt` (làm ở version tới) · `Defer` (để sau, ghi lý do) · `Reject` (không làm, ghi lý do). Không để trống mục BLOCKER/MAJOR.

- **Sinh lúc**: 2026-11-24 · **Nguồn**: business-r1 (BLOCKER), human.md
- **Mục tiêu version tới** *(1–2 câu: thay đổi lớn nhất cần đạt)*: v2 của màn Sản phẩm & Media sửa 2 lỗi cấu trúc (biến thể màu/size; tồn kho + giá tròng theo độ), tách kiểu viền khỏi dáng gọng, thêm danh mục kính áp tròng và thay trình soạn thảo có sanitize — chốt cùng v2 của màn Đo mắt trước khi viết phase doc/migration (lô P01D-1).

## 1. Giữ nguyên (đã tốt / đã chốt — không được phá khi sửa)
- Form thích ứng theo danh mục: `renderDynamicSpecsHtml()` + `defaultSpecsForCategory()` đổi bộ trường theo 6 danh mục (hết “chọn tròng kính vẫn hỏi dáng gọng / size 45-39-45”).
- Mỗi góc ảnh có Tải/Thay ảnh · Dùng ảnh mẫu · Xóa · dán URL + Áp dụng, kèm preview tại chỗ.
- Video 360° có `toVideoEmbedHtml()` + modal Xem trước Website (tab “Video 360°” cạnh các góc ảnh).
- Váng phủ dạng chip (không nhồi vào tên sản phẩm) — đúng hướng.
- Bộ 4 slot ảnh (chính diện / 45° / càng ngang / bản vẽ kích thước) là bộ tối thiểu hợp lý.
- Thông số gọng dạng mắt – cầu mũi – càng (49-20-145) + chiều cao tròng B đúng chuẩn quốc tế.

## 2. Việc cần làm — từ review AI (Tầng 1 + Tầng 2)
| ID | Mức | Nguồn | Nội dung | Quyết định | Lý do (nếu Defer/Reject) |
| :-: | :-: | :-: | :--- | :-: | :--- |
| B-01 | MAJOR | T2 | Tròng kính cần bộ thuộc tính đầy đủ (tán sắc, kích thước phôi, dải độ, đổi màu/phân cực/AR/UV, bảo hành) thay vì chỉ chip váng phủ. *(chi tiết: .ops/reviews/…/business-r1.md)* | Defer | Lô P01D-2 (thuộc tính tròng mở rộng) |
| B-02 | BLOCKER | T2 | Tròng kính cần quản tồn kho và giá theo dải độ (hoặc đặt hãng theo đơn) cùng phụ phí gia công, không phải một SKU đơn. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 (nhãn BLOCKER giữ theo tài liệu gốc — chờ chủ dự án quyết định hạ MAJOR) |
| B-03 | BLOCKER | T2 | Sản phẩm cần biến thể màu/size, mỗi biến thể có tồn kho và ảnh riêng; website có bộ chọn màu. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 (nhãn BLOCKER giữ theo tài liệu gốc — chờ chủ dự án quyết định hạ MAJOR) |
| B-04 | MAJOR | T2 | Tách kiểu viền khỏi dáng gọng thành hai trường độc lập và ràng buộc giới hạn độ với gọng không viền. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 |
| B-05 | MAJOR | T2 | Gọng cần thông số kỹ thuật đầy đủ (ED, DBL, trọng lượng, đệm mũi, giới hạn độ) và khoảng PD phù hợp để gợi ý theo số đo khách. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 cho ED/DBL/trọng lượng (cần để kiểm tra chéo với toa); phần còn lại P01D-2 |
| B-06 | MAJOR | T2 | Thêm danh mục kính áp tròng với thuộc tính riêng và quản theo lô/hạn dùng nếu cửa hàng bán; bổ sung kính đọc sách sẵn độ. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 cho danh mục; quản lý theo lô + hạn dùng hoãn P01D-3 nếu chưa bán lens |
| B-07 | MAJOR | T2 | Media cần gallery quản lý được (thứ tự, crop), alt text, slot ảnh người mẫu/VTO/spin 360, thông tin video và cờ bản quyền. *(chi tiết: .ops/reviews/…/business-r1.md)* | Defer | Lô P01D-2 — nhưng slot ảnh VTO là điều kiện bắt buộc trước P02B (`PRJ-004`) |
| B-08 | NIT | T2 | Bổ sung SEO và thương mại (slug, meta, giá khuyến mãi, combo gọng+tròng, trạng thái hàng) trước khi vào phase website. *(chi tiết: .ops/reviews/…/business-r1.md)* | Defer | Lô P01D-2 / vào P02 |
| B-09 | MAJOR | T2 | Thay trình soạn thảo bằng giải pháp có schema giới hạn và sanitize khi lưu; bảng thông số và hộp khuyến nghị là khối tái sử dụng. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 |
| B-10 | MAJOR | T2 | Hợp đồng dữ liệu sản phẩm/media/cấu hình tròng phải mở rộng; chốt mockup v2 trước rồi mới viết migration. *(chi tiết: .ops/reviews/…/business-r1.md)* | Adopt | Lô P01D-1 (ADR + V2) |

## 3. Phản hồi người dùng thật (Tầng 3)
- [2026-11-23] Không thấy mình thay đổi hình ảnh upload lên như thế nào. *(v1 đã xử lý theo báo cáo gốc)*
- [2026-11-23] Link video chèn thêm thì hiển thị như nào trên website. *(v1 đã xử lý)*
- [2026-11-23] Danh mục gọng kính mà vẫn chọn được dáng tròng; chọn vật tư vẫn hỏi size 45-39-45. *(v1 đã xử lý)*
- [2026-11-23] Tròng kính chưa chi tiết các đặc điểm phân loại (tráng cứng, ánh sáng xanh, đổi màu). *(v1 xử lý một phần)*
- [2026-11-23] Rich Text Editor sơ sài (yêu cầu review nhẹ).

## 4. Ý tưởng cải tiến (xếp theo tác động/công sức)
| ID | Ý tưởng | Tác động | Công sức | Quyết định |
| :-: | :--- | :-: | :-: | :-: |
| B-11 | Cân nhắc combo gọng + tròng với giá khởi điểm ở POS và website. *(chi tiết: .ops/reviews/…/business-r1.md)* | Vừa | Vừa | Defer (P01D-2) |

## 5. Câu hỏi còn mở / cần chuyên gia
- Cửa hàng có bán kính áp tròng và giữ tồn tròng theo độ không, hay đặt hãng theo đơn? (quyết định B-02, B-06)
- “Asian fit”/đệm mũi cao và giới hạn độ lắp cho gọng không viền — số cụ thể do KTV/lab của cửa hàng xác nhận.
- Chủ cửa hàng có chấp nhận hạ B-02/B-03 xuống MAJOR (lỗi mô hình dữ liệu) không?

## 6. Bài học đáng ghi (`proto learn`)
- [ ] <lỗi lặp ≥ 2 lần → đề xuất quy tắc, nêu phạm vi project/domain/persona/core>

## 7. Lệnh khởi tạo version tới
```bash
~/.config/mockup/root/bin/proto new optic-shop 01-catalog-media-editor <vN+1-slug> --phase P01D --notes "<tóm tắt từ mục tiêu ở trên>"
```
