# Spec & Design Handoff: {{FEATURE_TITLE}} (`{{FEATURE_SLUG}}`)

- **Dự án**: `{{PROJECT_SLUG}}`
- **Phiên bản được chốt (Approved Version)**: `{{APPROVED_VERSION}}`
- **Ngày chốt**: `{{PROMOTED_AT}}`
- **Đối tượng sử dụng (Persona)**: `{{PERSONA}}`
- **Lĩnh vực (Domain)**: `{{DOMAIN}}`
- **Lịch sử các phương án đã thử nghiệm (trong kho Mockup)**:
  {{VERSION_HISTORY_LIST}}

---

## 1. Tóm tắt Thiết kế & Lý do Lựa chọn
{{NOTES}}

## 2. Cấu trúc File trong Thư mục này
- `index.html`: Giao diện HTML chuẩn đã được duyệt.
- `styles.css` (nếu tách file): Hệ thống CSS Tokens & Layout.
- `app.js` (nếu tách file): Logic tương tác mẫu trên giao diện.

## 3. Lưu ý Khi Chuyển sang Code Ứng dụng Thực tế (Implementation Notes)
- Giữ nguyên hệ thống Design Tokens (`--bg-*`, `--text-*`, `--border-*`, `--accent-*`) và tỷ lệ kích thước đã duyệt.
- Chuyển các trạng thái tương tác mẫu trong JS sang state thực tế của framework dự án.
