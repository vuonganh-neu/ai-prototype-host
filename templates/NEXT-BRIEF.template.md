# Next-Version Brief — {{PROJECT}} / {{FEATURE}} (từ {{VERSION}} → version kế tiếp)

> Đầu vào BẮT BUỘC cho lần design tiếp theo. Sinh bởi `proto brief`; người dùng/AI điền cột **Quyết định**.
> ⚠️ File này được commit cùng kho mockup (có thể công khai): chỉ ghi *yêu cầu thiết kế*, **không** chép giá vốn/dữ liệu khách/quy tắc nghiệp vụ độc quyền hay trích dẫn nguồn dài. Chi tiết xem báo cáo ở `.ops/reviews/{{PROJECT}}/{{FEATURE}}/{{VERSION}}/` (không commit).
> Quyết định: `Adopt` (làm ở version tới) · `Defer` (để sau, ghi lý do) · `Reject` (không làm, ghi lý do). Không để trống mục BLOCKER/MAJOR.

- **Sinh lúc**: {{DATE}} · **Nguồn**: {{SOURCES}}
- **Mục tiêu version tới** *(1–2 câu: thay đổi lớn nhất cần đạt)*: <điền>

## 1. Giữ nguyên (đã tốt / đã chốt — không được phá khi sửa)
- <điền từ "Đã kiểm & sạch" của các báo cáo + điều người dùng khen>

## 2. Việc cần làm — từ review AI (Tầng 1 + Tầng 2)
| ID | Mức | Nguồn | Nội dung | Quyết định | Lý do (nếu Defer/Reject) |
| :-: | :-: | :-: | :--- | :-: | :--- |
{{FINDINGS_TABLE}}

## 3. Phản hồi người dùng thật (Tầng 3)
{{HUMAN_ITEMS}}

## 4. Ý tưởng cải tiến (xếp theo tác động/công sức)
| ID | Ý tưởng | Tác động | Công sức | Quyết định |
| :-: | :--- | :-: | :-: | :-: |
{{IDEAS_TABLE}}

## 5. Câu hỏi còn mở / cần chuyên gia
- <từ mục "Câu hỏi cho chuyên gia thật">

## 6. Bài học đáng ghi (`proto learn`)
- [ ] <lỗi lặp ≥ 2 lần → đề xuất quy tắc, nêu phạm vi project/domain/persona/core>

## 7. Lệnh khởi tạo version tới
```bash
~/.config/mockup/root/bin/proto new {{PROJECT}} {{FEATURE}} <vN+1-slug> --phase {{PHASE}} --notes "<tóm tắt từ mục tiêu ở trên>"
```
