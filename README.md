# AI Prototype Preview Hub (`mockup`)

Kho lưu trữ tập trung, quản lý lịch sử phiên bản bất biến (`v1`, `v2`, `v3`...) và xuất bản tự động lên **GitHub Pages** cho mọi dự án cá nhân, kết hợp **Ma trận Tri thức Thiết kế (Domain × Persona)**.

---

## 1. Cấu trúc Thư mục

```text
mockup/
├── index.html                      # Trang chủ Gallery (lọc theo dự án, domain, persona)
├── viewer.html                     # Khung Review & So sánh phiên bản (A|B split, responsive)
├── prototypes.json                 # Manifest tự động sinh bởi ./bin/proto build
├── bin/
│   └── proto                       # CLI quản lý: new, build, publish, promote, init-project, learn
├── skill/
│   ├── SKILL.md                    # Tài liệu quy trình chính (được trỏ tới từ Global Skill)
│   ├── REVIEW.md                   # Quy trình review độc lập 3 tầng
│   ├── ui-ux-review/SKILL.md       # Tầng 1: review UI/UX theo quy tắc chung (chạy mọi version)
│   └── business-review/SKILL.md    # Tầng 2: review nghiệp vụ/chuẩn ngành (tra cứu internet)
├── knowledge/                      # Ma trận Tri thức Thiết kế tích luỹ theo thời gian
│   ├── README.md
│   ├── core-anti-ai-slop.md        # Bộ luật chống thiết kế rập khuôn của AI
│   ├── personas/                   # 4 nhóm đối tượng người dùng cốt lõi
│   │   ├── consumer-reader.md
│   │   ├── operator-admin.md
│   │   ├── creator-builder.md
│   │   └── executive-manager.md
│   └── domains/                    # 4 lĩnh vực ưu tiên hiện tại
│       ├── 01-education.md
│       ├── 02-management-saas.md
│       ├── 03-editorial-showcase.md
│       └── 04-creative-editor.md
├── templates/                      # Template sinh tự động
│   ├── DESIGN-CONTEXT.template.md · SPEC-NOTES.template.md
│   ├── BUSINESS-REVIEW.template.md # gói nghiệp vụ — chép vào REPO DỰ ÁN
│   └── REVIEW-CORE.template.md · REVIEW-BUSINESS.template.md · NEXT-BRIEF.template.md
├── briefs/<project>/<feature>/<version>.md   # brief cho version kế tiếp (commit, đã lược dữ liệu nhạy cảm)
├── .ops/reviews/<project>/<feature>/<version>/  # kết quả review — KHÔNG commit (.gitignore)
└── prototypes/                     # Nơi chứa toàn bộ các phiên bản prototype theo dự án
    └── <project-slug>/
        └── <feature-slug>/
            ├── meta.json
            ├── v1-floating/
            └── v2-docked/
```

---

## Dự án đã dùng kho mockup
> Kho này **không sở hữu kiến thức chuyên ngành**: chỉ ghi dự án thuộc lĩnh vực gì và từng tham khảo dự án nào. Kiến thức nghiệp vụ nằm ở repo của từng dự án (`docs/02-mockups/BUSINESS-REVIEW.md`).
> Ghi bằng `proto init-project <path> --field "<lĩnh vực>" --ref <dự-án-trước>`.

<!-- projects:begin -->
| Dự án | Lĩnh vực | Tham khảo từ dự án trước |
| :--- | :--- | :--- |
| `optic-shop` | bán lẻ & dịch vụ nhãn khoa (đo khúc xạ, lab lắp kính, bảo hành) | — |
<!-- projects:end -->

## Hub: hai góc nhìn
- **Tổng quan dự án** `?project=<slug>`: bảng mọi màn hình — bản chốt hiện hành, bản mới nhất, phase, trạng thái (chờ review / đã chốt).
- **Cục bộ theo phase** `?project=<slug>&phase=<Pxx>`: chỉ màn hình thiết kế cho phase đó; bản chốt hiện hành hiện mờ để đối chiếu. Viewer giữ bộ lọc phase, mặc định so sánh với bản chốt.

## Tích hợp agent
| Agent | Cách thấy mockup |
| :--- | :--- |
| Claude Code | Plugin `dev-playbook`: skill `dev-playbook:design` + hook đầu phiên in trạng thái design (`proto status --brief`) |
| Cursor | Khối mockup trong `AGENTS.md` + rule `ui-from-mockup.mdc` (adapter cursor của dev-playbook) — chỉ thực thi theo bản chốt |
| Antigravity | `proto install-skill` (THIN-SKILL) + khối mockup trong `AGENTS.md` |

## Review độc lập 3 tầng (xem [skill/REVIEW.md](skill/REVIEW.md))
```bash
./bin/proto review-prep optic-shop 02-clinical-exam-rx v1-clinical-refraction   # Tầng 0: lint + packet + prompt
# → mở phiên MỚI chạy skill ui-ux-review (Tầng 1), rồi business-review (Tầng 2); kết quả ở .ops/
./bin/proto review-status --project optic-shop                                    # xem tiến độ T0–T3
./bin/proto brief optic-shop 02-clinical-exam-rx v1-clinical-refraction --human "Nút lưu khó thấy"   # → briefs/…
./bin/proto promote … [--skip-review]                                             # chặn nếu chưa review / còn BLOCKER
```

## 2. Các Lệnh CLI Thường Dùng (`./bin/proto`)

1. **Khởi tạo / nối dự án với kho mockup** (idempotent — tạo DESIGN-CONTEXT nếu thiếu, chèn khối "Thiết kế UI/UX" vào `AGENTS.md` + `CLAUDE.md`, symlink `~/.config/mockup/root`):
   ```bash
   ./bin/proto init-project <đường-dẫn-dự-án> --domain 04-creative-editor
   ```
2. **Tạo một phiên bản prototype mới (chặn ghi đè bản cũ)**:
   ```bash
   ./bin/proto new editor-platform 01-canvas-toolbar v1-floating \
     --title "Thanh công cụ Canvas & Inspector" \
     --domain 04-creative-editor \
     --persona creator-builder \
     --notes "Phương án 1: Thanh công cụ nổi ở cạnh dưới + Inspector gọn 260px"
   ```
   - Thêm `--phase P03` (phase mà UI này là đầu vào), `--stage mvp` cho prototype tổng thể giai đoạn MVP.
   - Gắn bù phase cho bản cũ: `./bin/proto set-phase <project> <feature> <version…> --phase P03`.
   - Trạng thái design: `./bin/proto status --project editor-platform [--phase P05] [--brief]`.
3. **Đẩy lên GitHub Pages để xem trên Mac / iPhone / iPad**:
   ```bash
   ./bin/proto publish -m "feat(editor-platform): add 01-canvas-toolbar v1 & v2"
   ```
4. **Chốt phiên bản ưng ý và chép sạch sẽ về thư mục dự án**:
   ```bash
   ./bin/proto promote editor-platform 01-canvas-toolbar v2-docked \
     --to <đường-dẫn-dự-án> \
     --notes "Chốt bản v2 vì tối ưu diện tích dọc trên màn hình MacBook 14 inch"
   ```
5. **Tích luỹ bài học UI/UX mới** — mỗi bài học ghi vào **đúng MỘT nơi**, mặc định là dự án:
   ```bash
   # Quy tắc riêng dự án (mặc định) → <project>/docs/02-mockups/DESIGN-CONTEXT.md
   ./bin/proto learn --project optic-shop --rule "Thẻ KPI có thanh nhấn viền trái"

   # Quy tắc chung cho loại sản phẩm → knowledge/domains/*.md
   # (1 dự án trong --source → ⏳ ứng viên; ≥ 2 dự án → ✅ áp dụng)
   ./bin/proto learn --scope domain --domain 04-creative-editor \
     --source editor-platform/01-universal-studio@v7 \
     --rule "Nhãn toạ độ X/Y/W/H đặt bên trong ô input thay vì phía trên"

   # Dự án thứ 2 xác nhận ứng viên → ✅
   ./bin/proto confirm-rule D04-003 --source video-studio-mvp

   # Bài học mới thay thế quy tắc cũ
   ./bin/proto learn --scope core --source a --source b --supersedes CORE-002 --rule "..."

   # Kiểm tra trùng lặp, ID, định dạng cũ, quy tắc nhắc tên dự án nằm sai chỗ
   ./bin/proto lint-knowledge
   ```
