# Persona 1: Consumer / Reader / Learner (Độc giả, Học viên, Người dùng cuối)

## 1. Bản chất & Tâm lý sử dụng
- **Mục tiêu chính**: Tiếp thu nội dung (đọc tin, đọc blog, xem bài giảng), khám phá thông tin hoặc hoàn thành một luồng tác vụ đơn giản, mượt mà.
- **Tâm thế**: Muốn sự thoải mái thị giác, rõ ràng, truyền cảm hứng; dễ rời bỏ nếu giao diện rối rắm, chữ khó đọc hoặc quá nhiều nút công cụ kỹ thuật.
- **Thiết bị ưu tiên**: Đa nền tảng — tỷ lệ dùng **Mobile (iPhone) và Tablet (iPad)** rất cao, ngang ngửa hoặc hơn Desktop.

## 2. Nguyên tắc UI/UX Bắt buộc
1. **Content-First & Typography-Driven**:
   - Độ rộng dòng đọc (Line length / Measure) lý tưởng: `60ch–72ch` (khoảng `640px–740px` cho cột nội dung chính). Không bao giờ để văn bản trải dài toàn màn hình `1440px`.
   - Chiều cao dòng (Line-height) cho nội dung dài: `1.65–1.8`.
   - Phân cấp tiêu đề giàu nhịp điệu (kết hợp Serif thanh lịch hoặc Sans-serif có cá tính cho tiêu đề, và font dễ đọc cho thân bài).
2. **Giảm thiểu Nhiễu Thị giác (Zero Chrome Clutter)**:
   - Thanh điều hướng (Header/Navbar) mỏng, tự ẩn khi cuộn xuống và hiện lại khi cuộn lên, hoặc gom gọn.
   - Không đặt các bảng điều khiển dạng kỹ thuật, nút bấm rườm rà cạnh vùng đọc chính.
3. **Nhịp điệu Khoảng trắng (Generous Whitespace)**:
   - Khoảng cách giữa các phần (`section padding`) rộng rãi (`48px–96px` trên Desktop, `32px–48px` trên Mobile).
   - Ảnh minh hoạ có tỷ lệ khung hình chuẩn (`16:9`, `4:3`, `3:2`), bo góc tinh tế hoặc vuông sắc nét tuỳ phong cách xuất bản.
4. **Tương tác Mềm mại trên Cảm ứng (Touch-friendly)**:
   - Mọi vùng bấm (nút, thẻ bài viết, mục lục) trên Mobile phải cao tối thiểu `44px`.
   - Thanh tiến độ đọc / học, mục lục nhảy nhanh (Sticky Table of Contents) nhẹ nhàng ở lề phải trên Desktop và chuyển thành Bottom Sheet trên Mobile.

## 3. Mẫu tham chiếu thực tế (Mobbin / Web)
- **Đọc bài & Xuất bản**: Substack, Medium, Readwise Reader, NYTimes, Stripe Press, Vercel Blog.
- **Học tập (Learner)**: Brilliant.org, Duolingo, MasterClass, Coursera (màn hình bài học), Notion Learning.
