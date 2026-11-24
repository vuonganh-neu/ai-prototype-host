---
name: mockup-fix
description: >-
  Vai FIXER — sửa mockup TẠI CHỖ theo finding của review (hiệu chỉnh revN) khi version còn là bản nháp, chưa khóa.
  Dùng khi người nói "chạy fix r1", "sửa theo review", "fix v2 theo báo cáo", "hiệu chỉnh mockup", hoặc đưa một fix packet.
  Chỉ sửa đúng các finding trong packet rồi DỪNG; không tự review, không khóa, không tạo version mới.
---

# mockup-fix — Vai Fixer (agent nào cũng đảm nhận được)

Đọc trước (chỉ khi cần chi tiết): [REVIEW.md](../REVIEW.md) §9. File này là phần riêng của vai Fixer.
**Mọi trạng thái nằm trong file, không nằm trong cuộc trò chuyện** — nên Antigravity, Cursor, Claude… đổi vai cho nhau được: chỉ cần fix packet.

## 0. Điều kiện chạy
- Phiên **mới**, nhận việc từ một **fix packet** (đường dẫn do người đưa, hoặc do `proto revise` in ra). Không có packet → dừng, nhờ người chạy `proto revise` (hoặc `proto next <p> <f> <v>` để xem bước kế).
- Bạn **không** phải reviewer của vòng review kế tiếp. Người sẽ giao review cho phiên khác (nên là agent/model khác bạn).
- Người ra lệnh mỗi bước (“chạy fix r1”). **Không tự nối** sang bước khác.

## 1. Việc làm (theo đúng thứ tự)
1. Nếu người chưa chạy `proto revise`: chạy
   ```bash
   ~/.config/mockup/root/bin/proto revise <project> <feature> <version> --fixes <ID,…> --agent <tên-bạn> [--scope ui|logic|both]
   ```
   Lệnh chụp snapshot revN, nâng lên revN+1, tạo **fix packet** và in prompt. Chưa có `--fixes` thì lấy từ người; **không tự chọn thêm finding**.
   Bị chặn (đã khóa / vượt rev3 / chưa có báo cáo) → **dừng và báo người**; **không** tự thêm `--confirm-extra` — cờ đó chỉ dùng sau khi người xác nhận trong chat.
2. Đọc **fix packet** (đường dẫn trong prompt): danh sách finding cần sửa, mục “Giữ nguyên”, ranh giới.
3. Sửa mockup **chỉ trong thư mục version** (`<kho-mockup>/prototypes/<project>/<feature>/<version>/`), **chỉ theo các finding đã khai**, đường dẫn tương đối `./`, tối thiểu thay đổi cần thiết (hướng sửa nằm trong finding; không viết lại thiết kế).
4. Gặp điều không sửa được trong phạm vi → **không tự quyết**, đánh dấu bỏ kèm lý do ở bước 5:
   - cần đổi shell / bố cục / luồng / cấu trúc dữ liệu → “cần version mới”;
   - cần chuyên gia mà chưa có đáp án (finding nghiệp vụ) → “chờ chuyên gia” (người sẽ `--assume` khi khóa; **không bịa số liệu/quy tắc**).
5. Khai kết quả (bắt buộc — đây là thứ phiên kế tiếp và người đọc):
   ```bash
   ~/.config/mockup/root/bin/proto fixed <project> <feature> <version> --done ID,ID [--skip ID --why "lý do"] --agent <tên-bạn>
   ```
   Chỉ khai ID nằm trong danh sách `--fixes`; ID ngoài danh sách bị từ chối (= ngoài phạm vi hiệu chỉnh).
6. **DỪNG.** Báo người: finding đã sửa / bỏ (vì sao) / file đã đổi / bạn đã tự kiểm gì (mở trang, thử nhập giá trị…). Gợi ý bước kế: `proto next <p> <f> <v>`.

## 2. Không làm
- Không chạy `review-prep`/viết báo cáo review, không `proto seal`, không `proto new`, không `proto publish`, không commit.
- Không sửa `prototypes/**` của version khác, không sửa `BUSINESS-REVIEW.md` hay file dự án (gói nghiệp vụ chỉ đề xuất qua reviewer, người duyệt mới ghi).
- Không thêm tính năng/ý tưởng ngoài finding (ý tưởng → để vào brief của version sau).
- Không chép số liệu nhạy cảm hay nội dung nghiệp vụ độc quyền vào `REVISIONS.md`, `--note`, `--why` (các file đó được publish).
