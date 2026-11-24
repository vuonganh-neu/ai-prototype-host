# Quy trình Review Mockup độc lập (3 tầng + vòng lặp phiên bản)

> Áp dụng cho **mọi dự án** dùng kho mockup. Mô hình review độc lập tách khỏi người làm (như review code độc lập với coding), áp vào thiết kế.
> Hai skill con (mỗi skill tự đọc file này một lần — file này không dẫn ngược lại skill): `ui-ux-review` (Tầng 1), `business-review` (Tầng 2).

## 1. Dòng chảy

```text
 design vN (rev1) ──► publish ──► Tầng 0  proto review-prep  (script, tất định: lint tĩnh + packet)
                              │
                              ▼
                        Tầng 1  ui-ux-review        (AI độc lập — quy tắc chung của kho mockup; chạy SAU MỖI version)
                        Tầng 2  business-review     (AI độc lập — nghiệp vụ/chuẩn ngành của dự án, có tra cứu internet)
                              │
                              │  còn BLOCKER/MAJOR? ──► proto revise: sửa TẠI CHỖ vN (rev2, rev3…) ──► review lại (r2, r3…)   [§9]
                              ▼
              ┌─ CỔNG NGƯỜI: proto seal ─ khóa vN (bất biến). BLOCKER/MAJOR chỉ qua khi người --accept/--assume + lý do
              ▼
        Tầng 3  Người trong dự án review (Hub link) ──► (Chuyên gia, nếu có) ──► ghi phản hồi
              │
              ▼
  proto brief  ──►  briefs/<p>/<f>/<v>.md  (tổng hợp T1 + T2 + T3 + ý tưởng cải tiến, có quyết định Adopt/Defer/Reject)
              │
              ▼
  design v(N+1) đọc next-brief làm ĐẦU VÀO BẮT BUỘC  ──► (lặp) … ──► promote
```

Tầng 1 rẻ, chạy mọi version. Tầng 2 tốn thời gian (tra cứu web), chạy khi version đụng tới màn hình có nghiệp vụ chuyên ngành, hoặc trước khi trình người thật.
Tầng 3 luôn là người cuối — AI không thay được.
**Version có hai trạng thái: Nháp (chưa tới tay người — sửa tại chỗ theo finding, §9) và Đã khóa (bất biến — mọi thay đổi là version mới).**

> Guide demo (skill `guide-demo`) là lớp tùy chọn nằm ngoài thư mục version: **không** là điều kiện của review/seal/promote và không làm version đã khóa thay đổi.

## 2. Luật Độc lập (không thương lượng)
1. **Ngữ cảnh mới tinh**: reviewer chạy trong chat/subagent mới, KHÔNG chia sẻ lịch sử với agent đã vẽ mockup. Khuyến nghị **model khác** với model đã thiết kế.
2. **Chỉ đọc**: reviewer không sửa `prototypes/**`. Chỉ ghi file báo cáo. Nếu runtime chặn ghi file → in nguyên văn báo cáo bắt đầu bằng `VERDICT:` và nêu đường dẫn đích để phiên điều phối lưu y nguyên, không tóm tắt.
3. **Bằng chứng hơn ý kiến**: mọi `[BLOCKER]`/`[MAJOR]` phải có (a) vị trí cụ thể (`file:dòng` hoặc `màn hình › vùng`), (b) quy tắc/chuẩn bị vi phạm (ID `CORE-…`/`PRJ-…`/`D02-…` hoặc nguồn URL), (c) hướng sửa tối thiểu.
4. **Không khen cho có / không bắt lỗi cho có**: sạch thì nêu *đã kiểm những gì*; vi phạm thì `CHANGES_REQUESTED`/`BLOCKER` rõ ràng.
5. **Vòng đánh số, không ghi đè**: `core-r1.md`, `core-r2.md`, … Báo cáo cũ giữ nguyên làm lịch sử.
6. **Review ≠ giải pháp**: tách *quan sát* khỏi *đề xuất*. Mỗi finding mô tả vấn đề (người dùng bị cản ở đâu) trước, rồi mới gợi ý hướng sửa. Ý tưởng cải tiến ghi riêng bằng `[IDEA]`.

## 3. Độ nghiêm trọng & Verdict

| Mức | Nghĩa | Tác động |
| :--- | :--- | :--- |
| `[BLOCKER]` | Người dùng không hoàn thành được tác vụ chính / sai nghiệp vụ gây hậu quả thật (sai số đo, sai đơn vị, rò quyền) / vi phạm a11y chặn dùng | Verdict `BLOCKER`. Sửa tại chỗ (§9) trước khi khóa; chỉ qua cổng khi **người** `--accept` kèm lý do |
| `[MAJOR]` | Hỏng trải nghiệm đáng kể, lệch quy tắc ✅, thiếu trạng thái quan trọng, thuật ngữ/chuẩn sai nhưng không gây hại ngay | `CHANGES_REQUESTED`. Sửa tại chỗ hoặc người `--accept`/`--assume` kèm lý do trước khi khóa; còn mở thì vào next-brief, mặc định **Adopt** |
| `[NIT]` | Tinh chỉnh thị giác/copy/nhất quán | `APPROVE_WITH_NOTES`. Vào next-brief, có thể Defer |
| `[IDEA]` | Cải tiến chủ động (không phải lỗi): pattern tốt hơn, tham khảo thực tế, tối ưu luồng | Không ảnh hưởng verdict. Vào next-brief để người quyết |

Map với thang 0–4 của heuristic evaluation (Nielsen): 4 = BLOCKER · 3 = MAJOR · 1–2 = NIT · 0 = không phải vấn đề.

## 4. Định dạng một finding (máy đọc được — `proto brief` gom theo dòng này)

```text
- [MAJOR] C-03 `màn hình › bảng đơn hàng` — Vấn đề: <người dùng bị cản ở đâu / hậu quả>. Căn cứ: <CORE-004 | PRJ-002 | URL>. Hướng sửa: <tối thiểu>.
```
- ID: `C-nn` (Tầng 1), `B-nn` (Tầng 2); **giữ nguyên ID khi vòng sau còn lỗi** để theo dõi (đóng bằng mục "Đã khắc phục ở vòng này").
- Mỗi finding đúng **một dòng** bắt đầu bằng `- [SEVERITY]` — đừng xuống dòng giữa chừng.

## 5. Lưu trữ — ai sở hữu cái gì

| Loại | Nằm ở | Commit? | Lý do |
| :--- | :--- | :---: | :--- |
| **Tri thức chuyên ngành** của dự án (`BUSINESS-REVIEW.md`: thuật ngữ, chuẩn, quy tắc BR-xx, nguồn tra cứu, quy trình thật) | **Repo dự án**: `<project>/docs/02-mockups/BUSINESS-REVIEW.md` | ✅ cùng repo dự án | Dự án sở hữu; kho mockup **không** giữ bản sao |
| **Kết quả review + nhận xét** (`packet.md`, `core-rN.md`, `business-rN.md`, `human.md`, `revs.json`) | **Kho mockup, `.ops/reviews/<project>/<feature>/<version>/`** (đổi gốc bằng biến `MOCKUP_OPS_DIR`) | ❌ `.gitignore` | Như `.ops/reviews/` của review code độc lập: có thể chứa nghiệp vụ nhạy cảm, không publish lên Pages. `revs.json` ghi “báo cáo vòng N review bản revM” |
| **Trạng thái & nhật ký hiệu chỉnh** (`rev`, `sealed`, `revisions`, `accepted` trong `prototypes/<p>/<f>/meta.json`; `REVISIONS.md` cạnh mockup; git tag `<p>/<f>/<v>@revN`) | **Kho mockup** | ✅ | Hub đọc để hiện nhãn; chỉ chứa ID finding, vòng/rev/verdict, lý do cho qua — **không** chứa nội dung finding hay nghiệp vụ độc quyền |
| **Brief cho version kế tiếp** | **Kho mockup, `briefs/<project>/<feature>/<version>.md`** | ✅ | Là đầu vào của lần design tiếp theo nên đi cùng prototype; đã lược dữ liệu nhạy cảm |
| **Mockup chốt** + dữ liệu bảo mật của dự án | `<project>/docs/02-mockups/<feature>/` (qua `proto promote`) | ✅ repo dự án | Dự án chỉ lấy bản final |
| **Mô tả lĩnh vực + dự án tham khảo** | Bảng trong `README.md` kho mockup (1 dòng/dự án) | ✅ | Kho chỉ biết “dự án này thuộc lĩnh vực gì, từng tham khảo dự án nào”; **không sở hữu kiến thức chuyên ngành** |

> `.ops/` của kho mockup theo bố cục `.ops/` chuẩn dùng chung (chỉ `README.md` được commit; `runs/`, `index.jsonl`, `dashboard/` còn để dự phòng) — xem `.ops/README.md`.

```text
mockup/
├── .ops/reviews/<project>/<feature>/<version>/   # KHÔNG commit
│   ├── packet.md  core-r1.md …  business-r1.md …  human.md
└── briefs/<project>/<feature>/<version>.md        # commit — input version kế tiếp
<project>/docs/02-mockups/BUSINESS-REVIEW.md       # tri thức chuyên ngành, thuộc dự án
```

**Quy tắc lược dữ liệu cho brief** (vì repo mockup có thể công khai trên Pages): brief chỉ nêu *yêu cầu thiết kế* (“ô ADD cần giới hạn khoảng + cảnh báo ngoài khoảng”), không chép số liệu bảo mật (giá vốn, dữ liệu khách), không chép nguyên văn quy tắc nghiệp vụ độc quyền hay trích dẫn dài từ nguồn. Chi tiết nằm ở báo cáo trong `.ops/`. Mỗi finding Tầng 2 vì vậy có thêm đoạn `Brief:` — câu đã lược dùng để đưa vào brief.

**Khi dự án khác cùng lĩnh vực**: kho mockup không chép kiến thức. `proto init-project … --field "<lĩnh vực>" --ref <dự-án-trước>` chỉ ghi tên dự án tham khảo vào bảng README; kiến thức thật vẫn ở repo dự án trước (chủ dự án quyết định chia sẻ gì sang `BUSINESS-REVIEW.md` của dự án mới).

## 6. Cổng (gate)
- `proto promote` **chặn** khi bản chốt: chưa có báo cáo Tầng 1 (và Tầng 2 nếu dự án có `BUSINESS-REVIEW.md`); báo cáo đã lỗi thời so với bản hiện tại (đã `revise` sau lần review cuối); còn BLOCKER/MAJOR chưa sửa hoặc chưa được người cho qua; hoặc version chưa qua cổng người (`proto seal`) — version cũ trước khi có quy trình rev được miễn điều kiện cuối. Bỏ qua có chủ đích bằng `--skip-review` (ghi lý do vào `--notes`). Các giả định chờ chuyên gia được chép sang `SPEC-NOTES.md` dưới dạng “chốt tạm”.
- `proto seal` **chặn** khi thiếu báo cáo, báo cáo lỗi thời, hoặc còn BLOCKER/MAJOR mà người chưa `--accept`/`--assume` kèm `--reason`. Thiếu/lỗi thời review không cho qua bằng cờ nào.
- `proto revise` **chặn** khi version đã khóa, chưa có báo cáo review, không có `--fixes`, hoặc vượt rev (§9.2).
- `proto new` cảnh báo khi version trước đã review mà chưa có brief, và in đường dẫn brief để đọc trước khi design.
- Tầng 2 có thể **bỏ qua** cho màn hình không có nghiệp vụ chuyên ngành (ví dụ trang đăng nhập) — ghi `business: N/A — <lý do>` đầu `packet.md`.

## 7. Học từ thực hành của designer chuyên nghiệp (đã nhúng vào rubric)
| Thực hành | Áp dụng ở đâu |
| :--- | :--- |
| **Heuristic evaluation** (10 nguyên tắc Nielsen, thang mức 0–4) | Tầng 1, trục 1–3; thang severity ở trên |
| **Cognitive walkthrough** theo persona: mỗi bước hỏi *người dùng có biết cần làm gì? thấy điều khiển? hiểu phản hồi?* | Tầng 1, bắt buộc đi hết 2–3 tác vụ chính của persona trước khi chấm |
| **Design critique** có cấu trúc: bối cảnh → quan sát → câu hỏi → (sau cùng) gợi ý; tách *vấn đề* khỏi *giải pháp* | Luật 6; ý tưởng tách `[IDEA]` |
| **State matrix**: rỗng / đang tải / một phần / lỗi / thành công / quá tải dữ liệu | Tầng 1, trục 3 |
| **Content-first, dữ liệu thật**: chống lorem/“Item 1”, kiểm độ dài tên Việt có dấu, số lớn | Tầng 0 lint + Tầng 1 trục 5 |
| **Design QA vs spec**: đối chiếu token, khoảng cách, thành phần với DESIGN-CONTEXT | Tầng 1, trục 2 |
| **Accessibility audit** WCAG 2.2 AA (tương phản, focus, target ≥ 24px—mobile ≥ 44px, thứ tự tab, reduced-motion) | Tầng 0 lint + Tầng 1 trục 4 |
| **Domain expert review / SME**: chuyên gia ngành duyệt thuật ngữ, quy trình, giới hạn an toàn | Tầng 2 (AI tra cứu nguồn chính thống; kết luận y khoa/pháp lý vẫn do người có chuyên môn xác nhận) |
| **Pre-mortem**: “nếu màn này gây sai sót thật thì sai ở đâu?” | Tầng 2, trục 5 |
| **Decision log**: ghi Adopt/Defer/Reject kèm lý do, không để feedback “bốc hơi” | brief |
| **Preserve list**: nêu rõ điều đã tốt/đã chốt, không được phá khi sửa | brief, mục “Giữ nguyên” |

## 8. Vòng học (biến review thành tri thức)
- Lỗi lặp lại ≥ 2 version hoặc ≥ 2 dự án → đề xuất `proto learn` (project mặc định; domain/persona/core theo quy tắc ≥ 2 dự án).
- Quy tắc nghiệp vụ tra cứu được (đã có nguồn URL) → người dùng duyệt rồi ghi vào `BUSINESS-REVIEW.md` **của dự án** (repo dự án), kèm ngày tra cứu để biết khi nào cần xác minh lại. Không ghi vào kho mockup.
- `proto learn` ở kho mockup chỉ nhận bài học **UI/UX tổng quát**; bài học nghiệp vụ chuyên ngành → `BUSINESS-REVIEW.md` của dự án.

## 9. Hiệu chỉnh tại chỗ trước khi khóa (revN) — bổ sung cho luật “không ghi đè”

> **Mục đích của luật Immutable Versions** (`SKILL.md` §1.2, `core-anti-ai-slop.md` §3) là để người so sánh trước/sau bằng Version Switcher. Vì vậy luật khóa **từ lúc người nhìn thấy bản đó**. Trước thời điểm ấy, version là *bản nháp đang đi qua cổng review máy*: được sửa tại chỗ — nhưng chỉ theo cách dưới đây, có dấu vết, có giới hạn. Đây là ngoại lệ DUY NHẤT của luật không ghi đè.

### 9.1 Thuật ngữ (cố định — không dùng lẫn)
| Thuật ngữ | Nghĩa |
| :--- | :--- |
| **Vòng review `rN`** | Báo cáo `core-rN.md` / `business-rN.md` (mỗi tầng đánh số riêng — như §2.5) |
| **Bản hiệu chỉnh `revN`** | Trạng thái của version tại một thời điểm. Vừa vẽ xong = `rev1`; mỗi lần `proto revise` = `rev` kế tiếp. Mỗi rev có git tag `<p>/<f>/<v>@revN` |
| **Nháp** | Version chưa `proto seal`. Sửa tại chỗ được (theo §9.2) |
| **Đã khóa** | Version đã `proto seal`. Bất biến: chỉ tạo version mới |

Mỗi báo cáo ghi `Revision: revN` ở dòng thứ hai (sau `VERDICT:`); `review-prep` ghi cặp “vòng ↔ rev” vào `revs.json` để máy biết báo cáo nào đã lỗi thời sau một lần `revise`.

### 9.2 Điều kiện sửa tại chỗ — mọi điều kiện đều phải đúng
1. Version **chưa khóa**.
2. Đã có ít nhất một báo cáo review; **mỗi thay đổi gắn một finding ID** (`C-03`, `B-07`). Thay đổi không có ID → version mới.
3. Thay đổi **không đụng** khung điều hướng/shell (`SKILL.md` §1.4), bố cục hoặc luồng chính, mô hình dữ liệu/cấu trúc của màn hình, token đã chốt trong DESIGN-CONTEXT. Đụng một trong các thứ này → version mới kèm brief.
4. Số rev: **tối đa rev3 khi chạy tự động**. Lên **rev4 chỉ khi NGƯỜI xác nhận trong chat** (agent chạy `proto revise … --confirm-extra "<lý do>"` *sau khi* có câu xác nhận; không tự thêm cờ). Trần cứng là rev4 — qua đó vấn đề là cấu trúc, tạo version mới kèm brief.

| Tình huống | Làm gì |
| :--- | :--- |
| Lỗi cơ học/logic rõ đúng sai (khoảng giá trị, đơn vị, validate, escape, copy sai, thiếu trạng thái) | `proto revise` (nháp) |
| Quy tắc cần chuyên gia mà chưa có chuyên gia | Không sửa vội: chọn mặc định theo khuyến nghị, `--assume` khi khóa (§9.5) |
| Đổi cấu trúc / luồng / shell | Version mới + brief |
| Version đã khóa mà phát hiện lỗi | Version mới + brief (`proto brief` đã gom finding) |

### 9.3 Một vòng hiệu chỉnh
```bash
# (1) Sau khi review rN xong và người quyết định "chạy fix":
proto revise <p> <f> <v> --fixes B-01,C-03 [--scope ui|logic|both] [--note "…"]
#   → chụp snapshot revN hiện tại (git tag, commit cục bộ — không push), nâng meta lên revN+1, ghi REVISIONS.md
# (2) Sửa mockup ĐÚNG các finding đã khai — không thêm việc ngoài danh sách. Xong thì DỪNG, báo người.
# (3) Chỉ khi người ra lệnh "chạy review r(N+1)":
proto review-prep <p> <f> <v> [--tier core|business]   # phiên reviewer MỚI (luật độc lập §2)
```
- `--scope` cho biết tầng nào phải review lại: `ui` → Tầng 1 · `logic` → Tầng 2 · `both` (mặc định). Máy dùng nó để đánh dấu báo cáo lỗi thời.
- Reviewer ở vòng sau **chỉ đọc**, làm theo skill như cũ, thêm: kiểm **phần thay đổi** (lệnh `git diff <tag>` có trong packet) + hồi quy mục “Giữ nguyên”; giữ nguyên ID finding còn lỗi; finding đã sửa ghi ở mục “Đã khắc phục ở vòng này”. **Người sửa ≠ reviewer.**

### 9.4 Cổng người — `proto seal`
- Chạy bởi **người** (hoặc agent *khi và chỉ khi* người ra lệnh trong chat, kèm tên ở `--by`). Máy không bao giờ tự khóa.
- Điều kiện máy: có báo cáo Tầng 1 (+ Tầng 2 nếu dự án có gói nghiệp vụ), không lỗi thời so với rev hiện tại. **Không có cờ nào bỏ qua điều này.**
- BLOCKER/MAJOR còn mở **không qua được** trừ khi người nêu từng ID và lý do:
  - `--accept ID,…` — chấp nhận có chủ đích (biết rủi ro, đi tiếp).
  - `--assume ID,…` — cần chuyên gia nhưng chưa có; chọn mặc định theo khuyến nghị để đi tiếp (§9.5).
  - cả hai bắt buộc `--reason "…"`. Lý do được ghi vào `meta.json` + `REVISIONS.md` (có thể công khai → không ghi dữ liệu nhạy cảm).
- Sau khi khóa, người gửi link cho người trong dự án (rồi chuyên gia nếu có; chuyên gia trong đội dự án đóng vai người review). Không hợp → `proto brief` + `proto new` (version mới).

### 9.5 Sổ giả định (khi chưa có chuyên gia / người dùng cuối — thường gặp ở MVP)
- Mục “cần chuyên gia xác nhận” → **chọn mặc định theo khuyến nghị tốt nhất hiện có**, nghiêng về phía an toàn khi có lựa chọn, rồi đi tiếp bằng `--assume`.
- Mỗi giả định ghi trong `BUSINESS-REVIEW.md` của dự án (mục “Sổ giả định”, người duyệt mới ghi — reviewer chỉ đề xuất): giả định gì · nguồn/độ tin cậy · **mức rủi ro** (giao diện / dữ liệu / **an toàn**) · **chi phí refactor nếu sai** (nhỏ: đổi hằng số · lớn: đổi mô hình dữ liệu) · người sẽ xác nhận.
- `promote` chép các giả định còn mở sang `SPEC-NOTES.md` dưới dạng **chốt tạm** để phase doc/code thật biết chỗ nào có thể phải đổi. Sau thử nghiệm có ý kiến chuyên gia → cập nhật ngược sổ + `BUSINESS-REVIEW.md`; sai thì mở phase sửa (chấp nhận refactor).
- Giả định mức **an toàn** (cảnh báo chuyển tuyến, chặn ký toa…): người nên có chuyên môn xem qua trước khi thử nghiệm với khách thật.

### 9.6 Giai đoạn thủ công (hiện tại — chưa có runner điều phối)
- **Mỗi lệnh của người = đúng một bước.** “Chạy fix r1” → chỉ `proto revise` + sửa + báo. “Chạy review r2” → chỉ `review-prep` + reviewer. Agent **không tự nối** sang bước kế (không tự chạy review sau khi sửa; không tự sửa tiếp sau khi review không pass; không tự `seal`).
- Sau mỗi bước, agent báo: đã làm gì, finding nào đóng/còn mở, đề xuất bước tiếp theo — rồi chờ người.
- Khi có runner tự động hóa vòng này, phải giữ nguyên: trần rev, cổng `seal` do người, nhật ký `REVISIONS.md`.

### 9.7 Phân vai & đổi agent giữa các bước (Antigravity / Cursor / Claude… dùng thay nhau)
Quy trình viết theo **vai**, không theo agent. Trạng thái nằm trong file (meta, `REVISIONS.md`, packet, báo cáo), không nằm trong chat — nên người giao bước nào cho agent nào cũng được, miễn đúng luật dưới đây.

| Vai | Việc | Đầu vào (đường dẫn do lệnh in ra) | Đầu ra | Skill mỏng |
| :--- | :--- | :--- | :--- | :--- |
| **Designer** | Vẽ version mới (hoặc v(N+1) từ brief) | brief bản trước, DESIGN-CONTEXT | `prototypes/<p>/<f>/<v>/` | `mockup-studio` |
| **Reviewer T1 / T2** | Review độc lập (§2) | `packet.md` | `core-rN.md` / `business-rN.md` | `ui-ux-review` / `business-review` |
| **Fixer** | Sửa tại chỗ theo finding (§9.3) | `fix-packet.md` | mockup đã sửa + `proto fixed` khai kết quả | `mockup-fix` |
| **Người (cổng)** | Quyết định bước kế, `seal`, `--accept/--assume`, `--confirm-extra` | `proto next` | khóa / lệnh giao việc | — |

**Luật chuyển giao (không thương lượng):**
1. **Một vai — một phiên mới — một bước.** Mỗi lần giao việc mở phiên mới, dán prompt do CLI in ra (`proto revise` in prompt Fixer; `packet.md` chứa prompt Reviewer). Agent không tự nối sang vai khác.
2. **Reviewer ≠ Fixer của rev đó** và nên khác agent/model (vd Antigravity sửa → Claude review, hoặc Cursor sửa → Antigravity review). Truyền `--agent <tên>` cho `revise`/`fixed`/`review-prep` để máy cảnh báo khi trùng. Reviewer vẫn chỉ đọc.
3. **Chỉ người** dùng `seal`, `--accept`, `--assume`, `--confirm-extra`. Agent chạy các cờ này *chỉ khi người vừa ra lệnh trong chat*.
4. **Đổi agent giữa chừng không mất ngữ cảnh** vì mọi thứ cần biết nằm ở: `proto next <p> <f> <v>` (đang ở đâu, bước kế), `fix-packet.md`/`packet.md` (việc cụ thể), `REVISIONS.md` (đã sửa gì, bỏ gì, ai sửa).
5. Mỗi agent chỉ cần **skill/rule mỏng trỏ về một file**: Claude Code (`~/.claude/skills/`) và Antigravity (`~/.gemini/antigravity/skills/`) qua `proto install-skill --claude`; Cursor/Codex và mọi agent đọc `AGENTS.md` qua khối `mockup` do `proto init-project` chèn vào dự án. Chi tiết luôn ở kho mockup (`~/.config/mockup/root/skill/…`), không chép vào skill mỏng — sửa quy trình một nơi, mọi agent theo.

Việc cần bàn giao nhanh cho agent khác — người chạy một dòng rồi dán prompt in ra:
```bash
~/.config/mockup/root/bin/proto next <project> <feature> <version> [--project-path <worktree>]
```

### 9.8 Hub
Mỗi version hiện nhãn: `Chưa review · rev1` · `Nháp rev2 · T1 r2 cần sửa · T2 r1 ổn` (thêm `· cần review lại` nếu đã sửa sau review) · `🔒 Đã khóa · rev2`. Nhãn được làm mới khi chạy `proto build`/`publish` (và tự động sau `review-prep`, `revise`, `seal`) — báo cáo review nằm ở `.ops/` nên Hub chỉ nhận bản tóm tắt vòng/rev/verdict/số lượng.
