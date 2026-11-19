# Lĩnh vực 01: Giáo dục & Đào tạo (Education / EdTech / LMS)

## 1. Triết lý Thiết kế Tổng thể
Ứng dụng giáo dục phải tạo cảm giác **tập trung, khích lệ sự tiến bộ, rõ ràng về lộ trình**, tránh cảm giác nặng nề như phần mềm kế toán nhưng cũng không được lòe loẹt trẻ con (trừ khi làm app cho trẻ tiểu học).

---

## 2. Phân tách Đối tượng Sử dụng (Personas trong Giáo dục)

| Đối tượng | Persona Gốc | Trọng tâm Giao diện (UI/UX Mindset) |
| :--- | :--- | :--- |
| **Học viên (Learner)** | `consumer-reader` | **Tập trung học & Động lực**: Màn hình bài học không xao nhãng (Focus mode), thanh tiến độ lộ trình học trực quan, khu vực ghi chú/hỏi đáp ngay cạnh video/bài đọc, phản hồi tức thì khi làm quiz/bài tập. |
| **Giảng viên / Người soạn bài (Instructor / Author)** | `creator-builder` | **Cấu trúc chương mục & Soạn thảo mượt**: Kéo thả cây giáo trình (Syllabus Tree: Chương → Bài → Học liệu/Quiz), trình soạn thảo блоk (kiểu Notion), xem trước ngay dưới góc nhìn học viên. |
| **Quản trị Đào tạo (LMS / Academic Admin)** | `operator-admin` | **Theo dõi lớp học & Chấm điểm nhanh**: Bảng theo dõi tỷ lệ hoàn thành của học viên, lọc học viên có nguy cơ bỏ cuộc, duyệt bài nộp hàng loạt (SpeedGrader). |

---

## 3. Hệ thống Thị giác Gợi ý (Design Tokens)

- **Bảng màu (Color Palette)**:
  - *Nền (Surface)*: Trắng ấm dịu mắt khi đọc lâu (`#FAF9F5` hoặc `#F8FAFC`), Trắng tinh cho vùng nội dung (`#FFFFFF`).
  - *Màu nhấn chính (Primary Accent)*: Xanh rừng sâu tri thức (`#0F5338` / `#166534`), hoặc Xanh coban học thuật (`#1D4ED8`), kết hợp màu nhấn phụ Cam/Vàng ấm cho chuỗi ngày học (Streak / Tiến độ: `#D97706`).
- **Typography**:
  - *Tiêu đề & Giao diện*: `Plus Jakarta Sans` hoặc `Be Vietnam Pro` (rất thân thiện tiếng Việt, rõ nét).
  - *Nội dung bài đọc dài*: `Source Serif 4`, `Lora` hoặc `Inter` với `line-height: 1.75`.
  - *Code / Công thức / Điểm số*: `JetBrains Mono`.
- **Bo góc (Border Radius)**: Vừa phải, thân thiện (`8px` cho nút/input, `12px` cho thẻ khoá học).

---

## 4. Từ khoá Tìm kiếm Tham chiếu trên Mobbin
- Khi làm màn hình Học viên: `course player`, `lesson view`, `quiz question`, `learning dashboard`, `progress tracker` (Tham khảo: *Brilliant, Coursera, Duolingo, Maven*).
- Khi làm màn hình Giảng viên/Quản trị: `curriculum builder`, `grading interface`, `student roster`.

---

## 5. Nhật ký Tích luỹ Kinh nghiệm (Accumulated Learnings)
*(Ghi bằng `proto learn` — không sửa tay định dạng dòng. ✅ áp dụng · ⏳ ứng viên (1 dự án, DESIGN-CONTEXT dự án được ghi đè) · ⛔ đã bị thay thế, bỏ qua)*
- **[D01-001]** ✅ · 2026-11-18 · nguồn: tri-thức-nền — Luôn hiển thị rõ "Bài tiếp theo" và thời lượng ước tính (`~12 phút`) để giảm tâm lý ngại bắt đầu của học viên.
