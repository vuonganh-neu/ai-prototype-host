# AI Prototype Preview Hub (`mockup`)

Kho lưu trữ tập trung, quản lý lịch sử phiên bản bất biến (`v1`, `v2`, `v3`...) và xuất bản tự động lên **GitHub Pages** cho mọi dự án cá nhân, kết hợp **Ma trận Tri thức Thiết kế (Domain × Persona)**.

---

## 1. Cấu trúc Thư mục

```text
/Users/vuonganhvu/Desktop/workspace/mockup/
├── index.html                      # Trang chủ Gallery (lọc theo dự án, domain, persona)
├── viewer.html                     # Khung Review & So sánh phiên bản (A|B split, responsive)
├── prototypes.json                 # Manifest tự động sinh bởi ./bin/proto build
├── bin/
│   └── proto                       # CLI quản lý: new, build, publish, promote, init-project, learn
├── skill/
│   └── SKILL.md                    # Tài liệu quy trình chính (được trỏ tới từ Global Skill)
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
├── templates/                      # Template sinh tự động cho thư mục dự án
│   ├── DESIGN-CONTEXT.template.md
│   └── SPEC-NOTES.template.md
└── prototypes/                     # Nơi chứa toàn bộ các phiên bản prototype theo dự án
    └── <project-slug>/
        └── <feature-slug>/
            ├── meta.json
            ├── v1-floating/
            └── v2-docked/
```

---

## 2. Các Lệnh CLI Thường Dùng (`./bin/proto`)

1. **Khởi tạo cấu hình thiết kế cho một dự án mới**:
   ```bash
   ./bin/proto init-project /Users/vuonganhvu/Desktop/workspace/editor-platform --domain 04-creative-editor
   ```
2. **Tạo một phiên bản prototype mới (chặn ghi đè bản cũ)**:
   ```bash
   ./bin/proto new editor-platform 01-canvas-toolbar v1-floating \
     --title "Thanh công cụ Canvas & Inspector" \
     --domain 04-creative-editor \
     --persona creator-builder \
     --notes "Phương án 1: Thanh công cụ nổi ở cạnh dưới + Inspector gọn 260px"
   ```
3. **Đẩy lên GitHub Pages để xem trên Mac / iPhone / iPad**:
   ```bash
   ./bin/proto publish -m "feat(editor-platform): add 01-canvas-toolbar v1 & v2"
   ```
4. **Chốt phiên bản ưng ý và chép sạch sẽ về thư mục dự án**:
   ```bash
   ./bin/proto promote editor-platform 01-canvas-toolbar v2-docked \
     --to /Users/vuonganhvu/Desktop/workspace/editor-platform \
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
