---
name: mockup-studio
description: >-
  Quy trình chuẩn thiết kế UI/UX Mockup & Prototype cho mọi dự án theo Ma trận Lĩnh vực (Domain) ×
  Đối tượng sử dụng (Persona). Kích hoạt skill này bất cứ khi nào người dùng yêu cầu thiết kế giao diện,
  tạo mockup, prototype, wireframe, redesign màn hình, hoặc quản lý/publish/chốt phiên bản thiết kế.
---

# Mockup Studio (Thin Global Entrypoint)

Skill này là điểm vào toàn cục (Global Entrypoint) áp dụng cho **tất cả các dự án**. Toàn bộ quy trình chi tiết, CLI tự động hoá và Ma trận Tri thức Thiết kế (Domain × Persona) được quản lý tập trung tại kho `/Users/vuonganhvu/Desktop/workspace/mockup`.

## BẮT BUỘC Thực hiện Trước Khi Thiết kế

1. **Đọc Quy trình Chi tiết (Master Skill)**:
   - Đọc ngay file [SKILL.md](file:///Users/vuonganhvu/Desktop/workspace/mockup/skill/SKILL.md) để nắm quy trình 5 bước, cách dùng CLI `/Users/vuonganhvu/Desktop/workspace/mockup/bin/proto`, nguyên tắc **Không ghi đè phiên bản (`v1`, `v2`, `v3`)** và quy trình **Chỉ chép bản chốt về dự án (`proto promote`)**.
2. **Đọc Luật Chống Thiết kế AI Mặc định**:
   - Đọc [core-anti-ai-slop.md](file:///Users/vuonganhvu/Desktop/workspace/mockup/knowledge/core-anti-ai-slop.md).
3. **Đọc Ma trận Lĩnh vực (Domain) × Đối tượng sử dụng (Persona) phù hợp với màn hình**:
   - Tổng quan ma trận: [knowledge/README.md](file:///Users/vuonganhvu/Desktop/workspace/mockup/knowledge/README.md)
   - **Theo Đối tượng sử dụng (`knowledge/personas/`)**:
     - Độc giả / Học viên / Người dùng cuối: [consumer-reader.md](file:///Users/vuonganhvu/Desktop/workspace/mockup/knowledge/personas/consumer-reader.md)
     - Quản trị / Người đăng bài / Vận hành: [operator-admin.md](file:///Users/vuonganhvu/Desktop/workspace/mockup/knowledge/personas/operator-admin.md)
     - Người sáng tạo / Thiết kế trên Studio: [creator-builder.md](file:///Users/vuonganhvu/Desktop/workspace/mockup/knowledge/personas/creator-builder.md)
     - Quản lý / Phê duyệt / Xem chỉ số: [executive-manager.md](file:///Users/vuonganhvu/Desktop/workspace/mockup/knowledge/personas/executive-manager.md)
   - **Theo Lĩnh vực (`knowledge/domains/`)**:
     - Giáo dục (EdTech / LMS): [01-education.md](file:///Users/vuonganhvu/Desktop/workspace/mockup/knowledge/domains/01-education.md)
     - Ứng dụng Quản lý / SaaS / Tài chính: [02-management-saas.md](file:///Users/vuonganhvu/Desktop/workspace/mockup/knowledge/domains/02-management-saas.md)
     - Trang giới thiệu / Blog / Tin tức: [03-editorial-showcase.md](file:///Users/vuonganhvu/Desktop/workspace/mockup/knowledge/domains/03-editorial-showcase.md)
     - Trình quản lý thiết kế (Editor Platform): [04-creative-editor.md](file:///Users/vuonganhvu/Desktop/workspace/mockup/knowledge/domains/04-creative-editor.md)
