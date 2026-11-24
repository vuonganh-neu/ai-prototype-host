# Quy trình Review Mockup độc lập (3 tầng + vòng lặp phiên bản)

> Áp dụng cho **mọi dự án** dùng kho mockup. Mô hình review độc lập tách khỏi người làm (như review code độc lập với coding), áp vào thiết kế.
> Hai skill con (mỗi skill tự đọc file này một lần — file này không dẫn ngược lại skill): `ui-ux-review` (Tầng 1), `business-review` (Tầng 2).

## 1. Dòng chảy

```text
 design vN ──► publish ──► Tầng 0  proto review-prep  (script, tất định: lint tĩnh + packet)
                              │
                              ▼
                        Tầng 1  ui-ux-review        (AI độc lập — quy tắc chung của kho mockup; chạy SAU MỖI version)
                              │
                              ▼
                        Tầng 2  business-review     (AI độc lập — nghiệp vụ/chuẩn ngành của dự án, có tra cứu internet)
                              │   BLOCKER? ──► làm bản sửa vN-fix trước, chưa đưa người thật
                              ▼
                        Tầng 3  Người dùng thật review (Hub link) ──► ghi phản hồi
                              │
                              ▼
              proto brief  ──►  briefs/<p>/<f>/<v>.md  (tổng hợp T1 + T2 + T3 + ý tưởng cải tiến, có quyết định Adopt/Defer/Reject)
                              │
                              ▼
                 design v(N+1) đọc next-brief làm ĐẦU VÀO BẮT BUỘC  ──► (lặp) … ──► promote
```

Tầng 1 rẻ, chạy mọi version. Tầng 2 tốn thời gian (tra cứu web), chạy khi version đụng tới màn hình có nghiệp vụ chuyên ngành, hoặc trước khi trình người thật.
Tầng 3 luôn là người cuối — AI không thay được.

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
| `[BLOCKER]` | Người dùng không hoàn thành được tác vụ chính / sai nghiệp vụ gây hậu quả thật (sai số đo, sai đơn vị, rò quyền) / vi phạm a11y chặn dùng | Verdict `BLOCKER`. Tạo bản sửa trước khi đưa người thật |
| `[MAJOR]` | Hỏng trải nghiệm đáng kể, lệch quy tắc ✅, thiếu trạng thái quan trọng, thuật ngữ/chuẩn sai nhưng không gây hại ngay | `CHANGES_REQUESTED`. Vào next-brief, mặc định **Adopt** |
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
| **Kết quả review + nhận xét** (`packet.md`, `core-rN.md`, `business-rN.md`, `human.md`) | **Kho mockup, `.ops/reviews/<project>/<feature>/<version>/`** (đổi gốc bằng biến `MOCKUP_OPS_DIR`) | ❌ `.gitignore` | Như `.ops/reviews/` của review code độc lập: có thể chứa nghiệp vụ nhạy cảm, không publish lên Pages |
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
- `proto promote` **chặn** khi bản chốt chưa có báo cáo Tầng 1 (và Tầng 2 nếu dự án có `BUSINESS-REVIEW.md`) hoặc còn BLOCKER; bỏ qua có chủ đích bằng `--skip-review` (ghi lý do vào `--notes`).
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
