---
name: ui-ux-review
description: >-
  Tầng 1 — review UI/UX độc lập cho một phiên bản mockup, dựa trên quy tắc chung của kho mockup
  (core-anti-ai-slop, persona, domain, DESIGN-CONTEXT dự án) + heuristic Nielsen + WCAG 2.2 AA.
  Chạy sau MỖI version, trong phiên mới không dính lịch sử người đã vẽ. Dùng khi user nói "review mockup",
  "review UI/UX version vN", "chấm bản thiết kế", "auto review design", hoặc sau khi vừa publish một version.
---

# ui-ux-review — Tầng 1: Review UI/UX độc lập (chạy mọi version)

Đọc trước: [REVIEW.md](../REVIEW.md) (luật độc lập, severity, định dạng finding, lưu trữ). File này chỉ nói phần riêng của Tầng 1.

## 0. Điều kiện chạy
- **Phiên mới, không dính lịch sử vẽ mockup** (ưu tiên model khác). Nếu bạn vừa tạo version này trong cùng phiên → dừng, nhờ người dùng mở phiên mới hoặc spawn subagent.
- **Chỉ đọc** `prototypes/**`; chỉ ghi `core-rN.md`.

## 1. Chuẩn bị (1 lệnh)
```bash
~/.config/mockup/root/bin/proto review-prep <project> <feature> <version> --tier core
```
Lệnh in đường dẫn `packet.md` trong `.ops/reviews/<project>/<feature>/<version>/` (lint tĩnh Tầng 0 + ngữ cảnh + danh sách file tri thức phải đọc + số vòng kế tiếp). Đọc `packet.md` trước, rồi **chỉ** đọc các file nó liệt kê.

## 2. Thứ tự đọc tri thức (ưu tiên khi mâu thuẫn)
`DESIGN-CONTEXT.md` của dự án (PRJ-*) > `knowledge/personas/<persona>.md` > `knowledge/domains/<domain>.md` > `knowledge/core-anti-ai-slop.md`.
Bỏ qua quy tắc ⛔; ⏳ áp dụng mềm (chỉ gắn `[NIT]`/`[IDEA]`, không gắn BLOCKER/MAJOR trừ khi vi phạm làm hỏng tác vụ).
Nếu có brief bản trước `briefs/<project>/<feature>/<version-trước>.md`: kiểm **từng mục đã Adopt** xem version này đã làm chưa → chưa làm = `[MAJOR]` (ghi ID cũ).

## 3. Cách chấm — làm theo đúng thứ tự
1. **Render thật**, không chỉ đọc code: mở bằng trình duyệt (Playwright/Browser pane/Chrome) ở **1440 · 768 · 390 px**; bấm thử mọi tab/lọc/modal/chuyển trạng thái có trong mockup. Chụp màn hình làm bằng chứng nếu có thể (lưu cạnh báo cáo, `evidence/`).
2. **Shell Continuity (kiểm bắt buộc, làm trước walkthrough)**: mở baseline ở mục “Baseline khung điều hướng” của `packet.md` cạnh version đang review. So từng mục: **tên menu · icon · thứ tự · layout shell (sidebar/topbar/footer)**. Chỉ phase nội dung được đổi; thu gọn danh sách menu là chấp nhận được, **đổi tên/icon/vị trí mà brief hoặc người dùng không yêu cầu** = `[MAJOR]` (ghi rõ “shell drift”, nêu cặp trước → sau). Lý do: người duyệt tập trung nội dung nên dễ chấp thuận ngầm thay đổi nhỏ ở khung, và khi triển khai thật thay đổi đó bị áp dụng. Không có baseline → ghi rõ trong báo cáo, không bỏ qua.
3. **Cognitive walkthrough**: liệt kê 2–3 tác vụ chính của persona (từ DESIGN-CONTEXT / phase brief). Với mỗi bước: người dùng có biết cần làm gì? thấy điều khiển? hiểu phản hồi? Ghi chỗ kẹt.
4. **Chấm 6 trục** (mỗi trục PASS / WARN / FAIL, kèm “đã kiểm gì”):

| Trục | Kiểm gì |
| :--- | :--- |
| **1. Tác vụ & Cấu trúc thông tin** | Đi hết tác vụ chính ít bước nhất? Điều hướng/nhãn dễ đoán? Thông tin quan trọng nằm vùng thấy ngay? Phù hợp persona (mật độ, tốc độ, phím tắt cho operator; đọc sâu cho reader; actionable KPI cho executive)? |
| **2. Thị giác & Nhất quán (Design QA)** | Khung điều hướng khớp baseline (bước 2). Token `:root` đủ và được dùng (không hard-code lặp)? Phân cấp chữ/khoảng cách/bo góc nhất quán? Khớp bản sắc DESIGN-CONTEXT? Không dính “dấu vân tay AI” (tím mặc định, card lồng card, bóng dày, 3 hộp icon tròn)? |
| **3. Trạng thái & Phản hồi** | State matrix: rỗng · đang tải · một phần · lỗi · thành công · quá nhiều dữ liệu · đang chọn · vô hiệu. Hover/focus/active có không? Hành động phá huỷ có xác nhận/hoàn tác? Phản hồi sau thao tác rõ? |
| **4. Truy cập & Đa thiết bị** | Tương phản chữ ≥ 4.5:1 (lớn ≥ 3:1), focus nhìn thấy, tab order hợp lý, không chỉ dựa vào màu, target ≥ 24px (mobile ≥ 44px), 390px không tràn ngang, `prefers-reduced-motion`, không khoá zoom. |
| **5. Nội dung thật & Chống rập khuôn** | Dữ liệu sát thực tế, tiếng Việt có dấu, tên dài/ngắn/lỗi, số lẻ, ngày giờ đúng định dạng VN? Không lorem/“Item 1”/số tròn đẹp giả? Đúng thuật ngữ từ `docs/`? |
| **6. Tuân thủ tri thức** | Liệt kê ID quy tắc đã kiểm (PRJ/persona/domain/core). Mỗi vi phạm trích ID. Quy tắc nào dự án ghi đè → ghi rõ đã áp theo thứ tự ưu tiên. |

5. **Chấm severity** theo REVIEW.md §3. Không đánh BLOCKER nếu không có người dùng bị chặn tác vụ thật hoặc lỗi a11y chặn dùng.
6. **Ý tưởng cải tiến** (`[IDEA]`, tối đa 5, xếp theo tác động/công sức): pattern đã được chứng minh ở sản phẩm thật cùng loại (tham chiếu Mobbin/ứng dụng thực nếu có công cụ), tối ưu luồng, giảm số bước. Mỗi ý tưởng nêu *vì sao có lợi cho persona*, không chỉ “đẹp hơn”.
7. **Ghi “Đã kiểm & sạch”**: những gì đã soát mà không có vấn đề (tránh rubber-stamp, giúp vòng sau không soát lại).

## 4. Đầu ra
Ghi `.ops/reviews/<project>/<feature>/<version>/core-r<N>.md` (kho mockup, không commit) theo [mẫu](../../templates/REVIEW-CORE.template.md). **Dòng đầu tiên là `VERDICT:`, dòng thứ hai là `Revision: revN`** (lấy từ packet). Finding đúng định dạng một dòng của REVIEW.md §4.

**Vòng review lại (packet ghi rev ≥ 2)**: đây là bản hiệu chỉnh tại chỗ theo finding vòng trước (REVIEW.md §9). Kiểm phần thay đổi (lệnh `git diff` trong packet) + hồi quy mục “Giữ nguyên”; **giữ nguyên ID** finding còn lỗi; finding đã sửa đưa vào mục “Đã khắc phục ở vòng này”; không đòi thay đổi ngoài phạm vi đã khai trong `REVISIONS.md`, trừ khi lỗi mới do chính lần sửa gây ra. Phát hiện thay đổi **không gắn finding nào** (đụng shell/bố cục/luồng) → ghi `[MAJOR]` “thay đổi ngoài phạm vi hiệu chỉnh — nên là version mới”.

Kết thúc: báo ngắn cho người dùng — verdict, số BLOCKER/MAJOR/NIT/IDEA, 3 finding đáng chú ý nhất, và bước tiếp theo (`business-review` nếu dự án có `BUSINESS-REVIEW.md`; hoặc sửa BLOCKER trước).

## 5. Không làm
- Không sửa mockup, không “tiện tay fix”. Không viết lại thiết kế thay designer.
- Không bịa quy tắc: finding phải trỏ vào quy tắc đã ghi hoặc nguyên tắc công khai (Nielsen, WCAG) — có thể nêu tên nguyên tắc.
- Không đưa tên dự án/mã màu/vai trò riêng vào đề xuất `proto learn` cho tầng domain/persona/core.
