---
name: guide-demo
description: >-
  Thêm "guide demo" TÙY CHỌN cho một version mockup: bản hướng dẫn thao tác có ▶ tự chạy, từng bước Tiếp/Lùi, thuyết minh giọng,
  chế độ đơn giản cho người dùng cuối (người lớn tuổi, có chuyên môn nhưng ít dùng phần mềm quản lý). Dùng khi người nói
  "làm guide demo", "hướng dẫn thao tác cho người dùng", "demo có thuyết minh", "đào tạo/nghiệm thu với người dùng thật".
  KHÔNG phải bước bắt buộc của quy trình mockup; không đụng cổng review/seal/promote.
---

# guide-demo — Guide demo cho một version mockup (tùy chọn)

Đây là file quy trình duy nhất; skill mỏng ở máy/dự án chỉ trỏ vào đây. Vòng đời version (nháp → khóa) xem REVIEW.md §9 trong cùng thư mục `skill/` — chỉ tra khi cần, không bắt buộc đọc.

## 0. Bản chất — đọc kỹ trước khi làm

- **Mục đích**: tài liệu tham khảo giúp người dùng cuối dễ tiếp cận một luồng. **Không phải hợp đồng**: code thật và test **không bị ép** theo guide; UI/UX khi code được phép đổi. Vì thế tên phần tử trong guide (`targets.json`) chỉ là selector **nội bộ của guide**, không phải `data-testid` để E2E bám theo (khác với mẫu cũ dạng nhúng `mk/`, nơi ghi “giữ nguyên data-testid”) — **không** chép lời đó vào SPEC-NOTES/phase doc.
- **Tùy chọn**: không là điều kiện của `review-prep`, `seal`, `promote`. Không thấy yêu cầu rõ → không tự làm.
- **Gợi ý kích hoạt** (để việc tùy chọn không bị quên; chỉ *gợi ý* người, không tự chạy): sắp đào tạo/nghiệm thu với người dùng thật, hoặc chuyên gia cần xem luồng chạy mà không có người cầm chuột.

## 1. Quyết định chiến lược (đã chốt)

| Vấn đề | Quyết định | Lý do |
| :--- | :--- | :--- |
| Sửa version đã khóa hay thêm ngoài? | **Additive, nằm NGOÀI thư mục version**: `prototypes/<p>/<f>/guide/<version>/` — trang *sidecar* nhúng version trong `<iframe>` và điều khiển qua DOM. **Không sửa file nào của version.** | Giữ bất biến (REVIEW.md §9), không làm lệch lint/review, không phải tạo version bản sao. Tránh kiểu “version dẫn xuất” (copy cả app + chèn engine) vì sinh bản nhân đôi phải qua lại cổng review. |
| Chạy sau `promote`? | **Có** — `proto promote` tự chép `guide/<version>/` thành `<project>/docs/02-mockups/<f>/guide/` và đổi đường dẫn mockup thành `../index.html`. Mở qua http (không `file://`). | Không bắt buộc, không chặn; chỉ in cảnh báo nếu guide lỗi thời. |
| Cần subcommand `proto` mới? | **Một lệnh gọn `proto guide init\|stamp\|check`** (phần tất định: dựng khung, băm giao diện, soát lỗi thời) + skill/tài liệu cho phần còn lại. Không thêm cổng, không lệnh nào bắt buộc. | Băm + soát bằng tay dễ sai; viết kịch bản là việc của agent theo skill này. |
| Nguồn luồng | **Test case / tài liệu phase của dự án → guide** (một chiều). Đầu vào là *danh sách luồng chính*; mỗi kịch bản ghi `"source": "<mã test case>"`. Không có danh sách → **dừng, hỏi**, không bịa luồng. | Guide không được định nghĩa nghiệp vụ. |
| Người xem là người dùng cuối | Engine có **chế độ đơn giản** (mặc định): nút Lùi/Tiếp lớn, chữ to, chậm 0.7×, không tự phát tiếng, ẩn teleport/nhạc/chọn giọng. Chế độ kỹ thuật (đầy đủ) bật bằng nút ở góc hoặc `?mode=full`. | Đối tượng ít kinh nghiệm phần mềm. |
| Chống lỗi thời | Mỗi guide đóng dấu **version · rev · ngày · băm giao diện** (`guide.json` → `stamp`), hiển thị trên trang. `proto guide check` so băm + soát phần tử còn trong mã; `promote` cảnh báo. **Không chặn** tiến độ. | Gợi ý, không phải cổng. |
| Lời thuyết minh nghiệp vụ | Soát theo **gói nghiệp vụ `docs/02-mockups/BUSINESS-REVIEW.md`** của dự án (nếu có) — chỉ lời nói, không chạy lại review mockup. Xem §4. | Tránh nói sai thuật ngữ/đơn vị/quy trình của lĩnh vực. |

## 2. Đầu vào cần có
1. `<project> <feature> <version>` — **nên là version đã khóa** (hoặc ít nhất đã qua review); dựng trên bản nháp còn `revise` sẽ lệch nhanh (`check` sẽ báo).
2. **Danh sách luồng chính** (từ test case/phase doc): với mỗi luồng — mã nguồn, người dùng nào làm, mở đầu ở đâu, kết thúc thế nào, vài biến thể lỗi đáng minh hoạ. Nên ≤ 3–5 kịch bản; mỗi kịch bản ≤ ~12 bước có lời.
3. Dự án có `BUSINESS-REVIEW.md` thì đọc phần thuật ngữ/quy tắc liên quan đến luồng.

## 3. Quy trình
1. **Dựng khung** (không ghi đè nếu đã có):
   ```bash
   ~/.config/mockup/root/bin/proto guide init <project> <feature> <version> --title "Hướng dẫn: <tên luồng>"
   ```
   Tạo `prototypes/<p>/<f>/guide/<version>/` từ `templates/guide-kit/` (engine + `guide.json` + `targets.json` + `intents.json` + `voice.json` + `NOTES.md` + `scenarios/`) và đóng dấu lần đầu.
2. **Khai phần tử** trong `targets.json`: tên logic (không dấu cách, vd `phieu.luu`) → selector CSS trong version (`#id` hoặc `[data-testid="…"]` nếu có sẵn). Chọn selector theo **vai trò** ổn định (id/nhãn), tránh `nth-child` mong manh. Mockup có lưu trạng thái bằng `localStorage` → liệt kê **tiền tố khoá** vào `guide.json` → `resetStorage` (để ↺ về trạng thái đầu; không bao giờ xoá toàn bộ — origin dùng chung với mọi mockup).
   Cần phần tử mà version không cho chọn ổn định → **không sửa version**; dùng bước `say` giải thích thay thế, ghi vào `NOTES.md`, báo người (nếu nhất thiết cần thì người quyết tạo version mới).
3. **Viết kịch bản** `scenarios/<id>.json` + `scenarios/index.json` (danh sách tên file). Hành động: `reset`, `say` (chỉ nói, không thao tác), `click`, `type`, `select`, `expectVisible`, `expectHidden`, `expectText`, `wait`; macro dùng chung trong `intents.json` (`{"use": "<tên>", "args": {…}, "say": "…"}`). Mẫu: `scenarios/_example.json`. Quy tắc lời ở §4.
4. **Từ điển phát âm** `voice.json`: viết tắt, thuật ngữ chuyên ngành, tên riêng đọc theo cách người nghe quen. Chỉ đổi lời đọc, chữ trên màn hình giữ nguyên.
5. **Soát nghiệp vụ** lời thuyết minh theo §4; ghi kết quả vào `NOTES.md` (điều đã đối chiếu, điều chờ chuyên gia).
6. **Chạy thử trên trình duyệt** qua http (vd `python3 -m http.server` ở gốc kho → `…/prototypes/<p>/<f>/guide/<version>/`): chạy cả hai chế độ, từng kịch bản đến hết, thử Lùi/Tiếp và teleport. Rồi:
   ```bash
   ~/.config/mockup/root/bin/proto guide check <project> <feature> <version>   # soát; không chặn
   ~/.config/mockup/root/bin/proto guide stamp <project> <feature> <version>   # đóng dấu lại sau khi đã chạy thử xong
   ```
7. **Đưa lên**: nội dung guide nằm trong `prototypes/` → `proto publish -m "feat(<project>): guide demo <feature> <version>"` (đi thẳng `main` như mọi nội dung prototype). Gửi người: URL `…/prototypes/<p>/<f>/guide/<version>/index.html` (có thêm `?mode=full` cho người cần teleport/thuyết minh đầy đủ).

## 4. Viết lời cho người dùng cuối
- Mỗi bước có lời: một câu ngắn, thể mệnh lệnh hoặc mô tả điều đang thấy, dùng **từ của người làm nghề** (chính từ trên màn hình), không từ kỹ thuật (“click”, “selector”, “testid”, “modal”).
- Bước kỹ thuật (`expect…`, `reset`) **không có `say`** → không hiện, không đọc.
- Một cụm macro có câu nghiệp vụ chung (`say` ở bước `use`) thì chỉ đọc câu đó một lần.
- Chỗ cần giải thích *vì sao* (quy tắc nghiệp vụ) dùng bước `say` riêng, một câu.
- **Soát theo `BUSINESS-REVIEW.md`**: thuật ngữ, đơn vị, khoảng giá trị, thứ tự quy trình khớp gói nghiệp vụ. Không có trong gói → không khẳng định; dùng từ trung tính hoặc lược câu, ghi “chờ chuyên gia” trong `NOTES.md`. Không chép số liệu bảo mật/độc quyền vào lời hay `NOTES.md` (repo mockup có thể công khai trên Pages).

## 5. Không làm
- Không sửa bất kỳ file nào trong thư mục version; không tạo version mới chỉ để chứa guide.
- Không đưa guide vào cổng review/seal/promote; không viết “guide là tiêu chí nghiệm thu/E2E”.
- Không bịa luồng ngoài danh sách đầu vào; không tự chạy `proto publish`/PR dự án khi người chưa yêu cầu.

## 6. Hướng sau (chỉ ghi chú, chưa làm)
- Chế độ **“tự làm theo”**: người dùng tự thao tác trên mockup, guide chỉ đánh dấu ô cần bấm và kiểm đã làm đúng chưa (bước `expect…` làm điều kiện qua).
- Xuất kịch bản thành tài liệu in/PDF từng bước; ghép thu hình + giọng thật.
- Khi ≥ 2 dự án đã dùng: cân nhắc cho `promote` đưa guide vào danh mục tài liệu dự án và `review-status` hiện nhãn guide.

## 7. Dùng ở dự án
Dự án muốn gọi skill này từ repo của mình: dùng skill mỏng mẫu `templates/guide-demo.project-adapter.md` (một file trỏ về đây, thêm đường dẫn test case/BUSINESS-REVIEW của dự án).
