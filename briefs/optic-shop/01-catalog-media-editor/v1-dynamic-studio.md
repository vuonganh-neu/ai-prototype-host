# Next-Version Brief — optic-shop / 01-catalog-media-editor (từ v1-dynamic-studio → version kế tiếp)

> Đầu vào BẮT BUỘC cho lần design tiếp theo. Sinh bởi `proto brief`; người dùng/AI điền cột **Quyết định**.
> ⚠️ File này được commit cùng kho mockup (có thể công khai): chỉ ghi *yêu cầu thiết kế*, **không** chép giá vốn/dữ liệu khách/quy tắc nghiệp vụ độc quyền hay trích dẫn nguồn dài. Chi tiết xem báo cáo ở `.ops/reviews/optic-shop/01-catalog-media-editor/v1-dynamic-studio/` (không commit).
> Quyết định: `Adopt` (làm ở version tới) · `Defer` (để sau, ghi lý do) · `Reject` (không làm, ghi lý do). Không để trống mục BLOCKER/MAJOR.

- **Sinh lúc**: 2026-11-24 · **Nguồn**: core-r1 (CHANGES_REQUESTED), business-r1 (BLOCKER), human.md
- **Mục tiêu version tới** *(1–2 câu: thay đổi lớn nhất cần đạt)*: **Giữ nguyên khung điều hướng của bản chốt (tên menu, icon, layout shell; chỉ được thu gọn danh sách) và chỉ thay phần nội dung bên trong.** v2 của màn Sản phẩm & Media sửa 2 lỗi cấu trúc (biến thể màu/size; tồn kho + giá tròng theo độ), tách kiểu viền khỏi dáng gọng, thêm danh mục kính áp tròng, thay trình soạn thảo có sanitize, thêm xác nhận/hoàn tác khi xoá ảnh và hiển thị lỗi form — chốt cùng v2 của màn Đo mắt trước khi viết phase doc/migration (lô P01D-1).

## 1. Giữ nguyên (đã tốt / đã chốt — không được phá khi sửa)
- **Khung điều hướng** (tên menu, icon, thứ tự, layout shell) lấy nguyên từ bản chốt gần nhất — chỉ đổi khi có yêu cầu rõ ràng ở mục 3.
- **Không tràn ngang** ở 1440/768/390 px.
- Có `lang="vi"`, `<title>`, `viewport`; không màu tím mặc định; không nội dung giả.
- Form thay đổi theo danh mục, có xem trước website và empty-state, toast phản hồi.
- Bảng token CSS trong `:root` đầy đủ.
- Form thích ứng theo danh mục: `renderDynamicSpecsHtml()` + `defaultSpecsForCategory()` đổi bộ trường theo 6 danh mục (hết “chọn tròng kính vẫn hỏi dáng gọng / size 45-39-45”).
- Mỗi góc ảnh có Tải/Thay ảnh · Dùng ảnh mẫu · Xóa · dán URL + Áp dụng, kèm preview tại chỗ.
- Video 360° có `toVideoEmbedHtml()` + modal Xem trước Website (tab “Video 360°” cạnh các góc ảnh).
- Váng phủ dạng chip (không nhồi vào tên sản phẩm) — đúng hướng.
- Bộ 4 slot ảnh (chính diện / 45° / càng ngang / bản vẽ kích thước) là bộ tối thiểu hợp lý.
- Thông số gọng dạng mắt – cầu mũi – càng (49-20-145) + chiều cao tròng B đúng chuẩn quốc tế.

## 2. Việc cần làm — từ review AI (Tầng 1 + Tầng 2)
| ID | Mức | Nguồn | Nội dung | Quyết định | Lý do (nếu Defer/Reject) |
| :-: | :-: | :-: | :--- | :-: | :--- |
| C-01 | MAJOR | T1 | `Khung › tên menu, nhóm, thương hiệu phụ, footer` — Vấn đề: shell drift — 4/5 tên menu khác bản chốt (“POS bán hàng”→“Bán hàng (POS)”, “Đo mắt & Toa kính”→“Phòng Đo mắt”, “Sản phẩm (Web & Ảnh)”→“Sản phẩm & Media Web”, “Kho hàng & Giao dịch”→“Kho hàng & Tồn kho”), nhóm “Bán hàng & Nghiệp vụ / Danh mục & Kho” thay nhóm gốc, brand-sub và footer đổi. Căn cứ: CORE-004. Hướng sửa: dùng lại đúng tên/nhóm/brand/footer của baseline, chỉ thu gọn danh sách. | Adopt | Ưu tiên cao: yêu cầu trực tiếp của người dùng (giữ nguyên khung điều hướng) |
| C-02 | MAJOR | T1 | `Khung › icon menu` — Vấn đề: shell drift — “Sản phẩm” đang dùng icon hộp vốn là của “Kho hàng”, “Kho hàng”/“POS” đổi sang icon khác, “Tổng quan” từ ngôi nhà thành lưới; khi triển khai sẽ gây nhầm lẫn với các màn hình chưa thiết kế. Căn cứ: CORE-004. Hướng sửa: dùng lại đúng icon của baseline cho từng mục. | Adopt | Ưu tiên cao: yêu cầu trực tiếp của người dùng (giữ nguyên khung điều hướng) |
| C-03 | MAJOR | T1 | `Khung › điều khiển shell` — Vấn đề: mất nút thu gọn sidebar, ô tìm nhanh ⌘K và nút menu mobile của baseline. Căn cứ: CORE-004. Hướng sửa: giữ nguyên các điều khiển shell. | Adopt | Ưu tiên cao: yêu cầu trực tiếp của người dùng (giữ nguyên khung điều hướng) |
| C-04 | MAJOR | T1 | `Toàn trang › ≤ 820 px` — Vấn đề: sidebar ẩn mà không có nút mở menu, không chuyển được màn hình trên tablet/mobile. Căn cứ: core §2.5, Nielsen #3. Hướng sửa: nút menu mở drawer như baseline. | Adopt | Làm cùng v2 |
| C-05 | MAJOR | T1 | `Sản phẩm › ô nhập` — Vấn đề: 17/19 ô `input/select/textarea` không có label/aria-label. Căn cứ: WCAG 1.3.1, 4.1.2. Hướng sửa: gắn `<label for>`/`aria-label`. | Adopt | Làm cùng v2 |
| C-06 | MAJOR | T1 | `Sản phẩm › xoá ảnh/media` — Vấn đề: không thấy bước xác nhận hoặc hoàn tác cho hành động xoá/thay ảnh, một cú bấm nhầm mất ảnh [tĩnh — grep không có confirm/undo; cần bấm kiểm]. Căn cứ: Nielsen #5/#9, state matrix. Hướng sửa: xác nhận nhẹ hoặc toast “Hoàn tác”. | Adopt | Làm cùng v2 |
| C-07 | MAJOR | T1 | `Sản phẩm › form` — Vấn đề: không thấy trạng thái lỗi/validation (trường bắt buộc, giá âm, SKU trùng) [tĩnh — 0 chỗ xử lý lỗi]. Căn cứ: state matrix, Nielsen #9. Hướng sửa: hiển thị lỗi tại ô và tóm tắt khi bấm Lưu. | Adopt | Làm cùng v2 |
| C-08 | MAJOR | T1 | `Toàn trang › focus bàn phím` — Vấn đề: chỉ có một khai báo `:focus`, lint báo tắt outline mà không có `:focus-visible`. Căn cứ: WCAG 2.4.7 [tĩnh]. Hướng sửa: thêm `:focus-visible` rõ ràng. | Adopt | Làm cùng v2 |
| C-09 | NIT | T1 | `Toàn trang › cỡ chữ` — Vấn đề: 55 phần tử chữ < 12 px. Căn cứ: lint T0. Hướng sửa: tối thiểu 12 px. | Adopt | Làm cùng v2 |
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
- [2026-11-24] Khung điều hướng giữ nguyên bản gần nhất (tên menu, icon, layout) — phase này chỉ design phần nội dung bên trong. Danh sách menu có thể gọn nhưng không đổi icon/tên trừ khi có yêu cầu; nếu chọn version chốt mà icon/tên đã đổi thì khi triển khai rất có thể áp dụng thay đổi đó dù người duyệt không chủ ý (họ tập trung vào nội dung).

## 4. Ý tưởng cải tiến (xếp theo tác động/công sức)
| ID | Ý tưởng | Tác động | Công sức | Quyết định |
| :-: | :--- | :-: | :-: | :-: |
| C-10 | `Sản phẩm › lưu` — Lợi ích cho nhân viên nhập liệu: thanh hành động dính ở đáy và báo “chưa lưu” vì form + media dài. Tham chiếu: trình soạn sản phẩm của các hệ thống bán hàng. | Vừa | Thấp | ⬜ |
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
