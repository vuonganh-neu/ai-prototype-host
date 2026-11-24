---
name: mockup-studio
description: >-
  Hệ thống thiết kế UI/UX Mockup & Prototype chuyên nghiệp theo Ma trận Lĩnh vực (Domain) ×
  Đối tượng sử dụng (Persona), lưu trữ lịch sử phiên bản bất biến tại kho mockup,
  xuất bản tự động lên GitHub Pages để review đa thiết bị, và chỉ chép bản chốt sạch sẽ về thư mục dự án.
---

# Mockup Studio — Quy trình Thiết kế & Quản lý Prototype Tập trung

Hệ thống này là kho mockup dùng chung (đường dẫn ổn định `~/.config/mockup/root`) và đóng vai trò là **Engine thiết kế giao diện chuẩn mực** cho mọi dự án cá nhân.

---

## 1. Nguyên tắc Vận hành Cốt lõi

1. **Làm việc tại Workspace Dự án, Nháp tại Kho Mockup**:
   - Bạn đọc tài liệu đặc tả (`docs/`) trực tiếp tại workspace dự án đang mở (ví dụ: `my-project`).
   - Nếu dự án chưa có file `docs/02-mockups/DESIGN-CONTEXT.md` (hoặc chưa có khối "Thiết kế UI/UX (Mockup)" trong `AGENTS.md`/`CLAUDE.md`), hãy khởi tạo bằng lệnh dưới. Lệnh idempotent: tạo DESIGN-CONTEXT nếu thiếu, chèn/cập nhật khối mockup cho mọi agent, tạo symlink `~/.config/mockup/root`. Domain + persona tự suy từ đặc tả dự án; chỉ hỏi người dùng khi không suy được:
     ```bash
     ~/.config/mockup/root/bin/proto init-project "<đường-dẫn-dự-án>" --domain "<mã-domain>"
     ```
   - **KHÔNG** tạo các bản nháp `v1`, `v2` trực tiếp trong thư mục dự án. Mọi bản nháp phải được tạo trong `<kho-mockup>/prototypes/<project-slug>/<feature-slug>/<version-slug>/`.
2. **Bất biến & Không ghi đè (Immutable Versions)**:
   - Một version **bất biến từ lúc người thật nhìn thấy nó** (`proto seal` — cổng của người). Từ đó mọi chỉnh sửa, kể cả theo phản hồi của người dùng, luôn tạo một phiên bản mới (`v1-minimal`, `v2-dense`, `v3-refined`...) để giữ nguyên các bản cũ phục vụ so sánh trực tiếp trên trình duyệt.
   - **Ngoại lệ duy nhất — hiệu chỉnh trước khi khóa**: khi version còn là *nháp* (chưa gửi người) và đang đi qua review máy (Tầng 1/2), được sửa **tại chỗ** theo finding bằng `proto revise` (rev2, rev3; rev4 chỉ khi người xác nhận). Điều kiện, giới hạn và quy trình đầy đủ: [REVIEW.md §9](REVIEW.md). Ngoài ngoại lệ này, **không bao giờ** sửa đè một version.
3. **Chỉ Bản Chốt mới đưa về Dự án (Clean Handoff)**:
   - Chỉ khi người dùng xác nhận duyệt một phiên bản, mới chạy lệnh `proto promote` để chép bản đó về `<project>/docs/02-mockups/<feature-slug>/`.

4. **Giữ nguyên phần đã chốt ngoài phạm vi phase (Shell Continuity)**:
   - Khung điều hướng (tên menu, icon, thứ tự, layout sidebar/topbar/footer) lấy **y nguyên từ bản chốt/phiên bản gần nhất**; phase chỉ design phần *nội dung bên trong*. Được phép **thu gọn** danh sách menu cho gọn, **không** đổi tên/icon/vị trí nếu người dùng không yêu cầu.
   - Lý do: người duyệt tập trung vào nội dung nên dễ chấp thuận luôn thay đổi nhỏ ở khung; khi triển khai thật, thay đổi đó sẽ bị áp dụng dù không ai chủ ý. Tầng 1 sẽ kiểm điều này.
---

## 2. Quy trình 5 Bước Khi Thiết kế Mockup Mới

### Bước 1: Đọc Ngữ cảnh Dự án & Phân loại Ma trận (Domain × Persona)
0. **Nếu màn hình đã có version trước**: đọc brief `briefs/<project>/<feature>/<version-trước>.md` (kết quả review AI + phản hồi người dùng + ý tưởng) — là đầu vào bắt buộc; mục đã **Adopt** phải được làm, mục “Giữ nguyên” không được phá.
1. Đọc tài liệu đặc tả của dự án và file `<project>/docs/02-mockups/DESIGN-CONTEXT.md`.
2. Xác định rõ màn hình đang thiết kế thuộc **Lĩnh vực (Domain)** nào và phục vụ **Đối tượng sử dụng (Persona)** nào (Lưu ý: Cùng 1 dự án nhưng màn hình cho Người đọc và màn hình cho Quản trị viên phải dùng 2 Persona khác nhau!):
   - **Luật bắt buộc chung**: Đọc [core-anti-ai-slop.md](../knowledge/core-anti-ai-slop.md)
   - **Chiều Đối tượng sử dụng (Personas)**:
     - Độc giả / Học viên / Khách truy cập: [consumer-reader.md](../knowledge/personas/consumer-reader.md)
     - Quản trị / Người đăng bài / Nhân viên vận hành: [operator-admin.md](../knowledge/personas/operator-admin.md)
     - Người sáng tạo / Thiết kế trên Studio/Canvas: [creator-builder.md](../knowledge/personas/creator-builder.md)
     - Cấp quản lý / Phê duyệt / Xem báo cáo: [executive-manager.md](../knowledge/personas/executive-manager.md)
   - **Chiều Lĩnh vực (Domains)**:
     - Giáo dục (EdTech / LMS): [01-education.md](../knowledge/domains/01-education.md)
     - Ứng dụng Quản lý / SaaS / Tài chính: [02-management-saas.md](../knowledge/domains/02-management-saas.md)
     - Trang giới thiệu / Blog / Chia sẻ / Tin tức: [03-editorial-showcase.md](../knowledge/domains/03-editorial-showcase.md)
     - Trình quản lý thiết kế / Studio (Editor): [04-creative-editor.md](../knowledge/domains/04-creative-editor.md)

### Bước 2: Tham khảo Thực tế (Mobbin / Real-world Reference)
- Nếu có công cụ Mobbin MCP, hãy đọc skill `search` của Mobbin và tìm kiếm 2–3 màn hình thực tế theo từ khoá gợi ý trong file Domain/Persona trước khi lên bố cục.

### Bước 3: Khởi tạo Phiên bản trong Kho Mockup
- Chạy CLI `proto new` để tạo khung phiên bản mới (không bao giờ ghi đè phiên bản cũ):
  ```bash
  ~/.config/mockup/root/bin/proto new \
    "<project-slug>" "<feature-slug>" "<version-slug>" \
    --title "<Tên màn hình>" \
    --domain "<domain-id>" \
    --persona "<persona-id>" \
    --notes "<Tóm tắt hướng tiếp cận của phiên bản này>" \
    --phase "<Pxx>"            # phase mà UI này là đầu vào thiết kế (khớp docs/03-phases của dự án)
    # --stage mvp              # chỉ cho prototype tổng thể giai đoạn MVP
  ```
- **Màn hình là đơn vị sống lâu, phase là thời điểm**: phase sau tinh chỉnh màn hình cũ → tạo phiên bản mới của **cùng** `<feature-slug>` với `--phase` mới, không tạo màn hình mới. Bản nền MVP (nhiều màn hình trong 1 prototype) dùng `--stage mvp`; phase chi tiết design theo từng màn hình.
- Phiên bản cũ chưa gắn phase: `proto set-phase <project> <feature> <version…> --phase <Pxx>`.
- Ở vòng đầu tiên của một tính năng quan trọng, khuyến khích tạo 2 phương án có cá tính rõ rệt (ví dụ `v1-floating` và `v2-docked`) hoặc tách theo đối tượng sử dụng (`01-reader-home/v1` và `02-publisher-cms/v1`).

### Bước 4: Xây dựng Giao diện HTML/CSS/JS Tương tác Cao & Publish
- Viết code vào `<kho-mockup>/prototypes/<project>/<feature>/<version>/index.html` (cùng `styles.css`, `app.js` với **đường dẫn tương đối `./`**).
- Sau khi hoàn thiện, xuất bản lên GitHub Pages bằng 1 lệnh:
  ```bash
  ~/.config/mockup/root/bin/proto publish -m "feat(<project>): add <feature> <version>"
  ```
- Gửi cho người dùng:
  0. **Link Hub theo phase** `<hub>/?project=<project>&phase=<Pxx>` (người review chỉ thấy màn hình của phase đang design) — `proto status --project <project> --phase <Pxx>` in sẵn link. Tổng quan cả dự án: `<hub>/?project=<project>`.
  1. **Link Xem & So sánh các phiên bản (Comparison Viewer URL)**
  2. **Link Trực tiếp (Raw URL)**
  3. Điểm khác biệt chính giữa các phương án để người dùng đánh giá nhanh.

### Bước 4b: Review độc lập — TRƯỚC khi người dùng thật xem
Reviewer là **phiên khác** (không phải phiên vừa vẽ), nên đừng tự review ở đây.
1. Chạy `~/.config/mockup/root/bin/proto review-prep <project> <feature> <version>` → lint tĩnh + `packet.md` + prompt có sẵn để dán vào phiên reviewer mới (Tầng 1 `ui-ux-review`, Tầng 2 `business-review` nếu dự án có `BUSINESS-REVIEW.md`).
2. Còn BLOCKER/MAJOR → **hiệu chỉnh tại chỗ** (version chưa khóa): `proto revise <project> <feature> <version> --fixes <ID,…>` → sửa đúng các finding đó → review lại ở phiên reviewer mới (r2, r3…). Chỉ sửa theo finding; đụng shell/bố cục/luồng/cấu trúc dữ liệu → version mới. Tối đa rev3 tự động, rev4 khi người xác nhận. **Giai đoạn thủ công: mỗi bước do người ra lệnh, không tự nối sang bước kế** (REVIEW.md §9.6). Vai Fixer có skill riêng `mockup-fix`; Designer/Reviewer/Fixer là *vai*, agent nào (Antigravity, Cursor, Claude…) cũng đảm nhận được và đổi cho nhau theo REVIEW.md §9.7. Xem bước kế: `proto next <project> <feature> <version>`.
3. Sạch BLOCKER/MAJOR (hoặc người cho qua có chủ đích) → người chạy `proto seal <project> <feature> <version> --by <tên> [--accept|--assume ID --reason "…"]` → mới gửi link Hub cho người trong dự án / chuyên gia.
4. Sau phản hồi: `proto brief <project> <feature> <version> [--human "…"]` → brief cho version kế tiếp (Bước 1, mục 0); version đã khóa muốn đổi thì tạo `proto new`.
- Kết quả review ở `.ops/` (không commit); tri thức chuyên ngành thuộc repo dự án; brief ở `briefs/`. Cần tra cứu quy trình chi tiết mới đọc `REVIEW.md`.

### Bước 5: Chốt Phương án (Promote) & Tích luỹ Tri thức (Learn)
1. **Khi người dùng duyệt bản chốt** (`promote` chặn nếu chưa qua review Tầng 1/2 hoặc còn BLOCKER; bỏ qua có chủ đích bằng `--skip-review` + lý do trong `--notes`):
   ```bash
   ~/.config/mockup/root/bin/proto promote \
     "<project-slug>" "<feature-slug>" "<version-slug>" \
     --to "<đường-dẫn-tuyệt-đối-tới-dự-án>" \
     --notes "<Ghi chú lý do chọn và lưu ý khi code thật>"
   ```
   Lệnh này sẽ đánh dấu `approved` trên Hub và chép bản sạch sẽ vào `<project>/docs/02-mockups/<feature-slug>/`.
2. **Khi rút ra bài học UI/UX mới từ phản hồi của người dùng** — chọn **đúng MỘT phạm vi** (chỉ bài học UI/UX *tổng quát*; kiến thức nghiệp vụ chuyên ngành → `BUSINESS-REVIEW.md` của dự án, không vào kho này):
   | Bài học đúng cho… | Phạm vi | Lệnh |
   | :--- | :--- | :--- |
   | Chỉ dự án này (màu, font, bo góc, luồng nghiệp vụ riêng, tên vai trò riêng) | `project` (**mặc định**) | `proto learn --project <slug> --rule "..."` |
   | Mọi sản phẩm cùng loại (vd mọi app quản lý) | `domain` | `proto learn --scope domain --domain <id> --source <dự-án>[/feature@ver] --rule "..."` |
   | Một kiểu người dùng, bất kể loại sản phẩm | `persona` | `proto learn --scope persona --persona <id> --source ... --rule "..."` |
   | Mọi mockup (quy chuẩn kỹ thuật / review) | `core` | `proto learn --scope core --source ... --rule "..."` |

   Quy tắc bắt buộc:
   - **Phân vân → chọn `project`.** Không đưa tên dự án, mã màu, font hay tên vai trò riêng vào domain/persona/core.
   - Viết quy tắc ở dạng **tổng quát hoá** khi ghi lên tầng chung (bỏ ví dụ riêng của dự án).
   - Tầng chung chỉ thành ✅ khi có **≥ 2 dự án** trong nguồn; ít hơn là ⏳ ứng viên. Khi dự án khác xác nhận: `proto confirm-rule <ID> --source <dự-án>`.
   - Bài học mới mâu thuẫn quy tắc cũ → dùng `--supersedes <ID-cũ>` thay vì để hai quy tắc đá nhau.
   - Chạy `proto lint-knowledge` sau khi ghi; lint phải sạch lỗi.
3. **Thứ tự ưu tiên khi đọc tri thức**: DESIGN-CONTEXT dự án > persona > domain > core (xem mục 4 của `core-anti-ai-slop.md`). Bỏ qua quy tắc ⛔; ⏳ áp dụng mềm.

### Bước 6 (TÙY CHỌN, không thuộc cổng): Guide demo cho người dùng cuối
Khi cần đào tạo/nghiệm thu với người dùng thật, hoặc chuyên gia cần xem luồng chạy: dựng bản hướng dẫn thao tác (▶ tự chạy, Tiếp/Lùi, thuyết minh, chế độ đơn giản) **bên ngoài thư mục version** — không sửa version đã khóa, không ép code/test theo guide. Chỉ làm khi người yêu cầu; quy trình ở [guide-demo/SKILL.md](guide-demo/SKILL.md).
