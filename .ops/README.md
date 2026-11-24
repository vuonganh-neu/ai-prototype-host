# Operations & Telemetry Hub của kho mockup (`.ops/`)

Cấu trúc **giống `.ops/` của optic-shop** để các dự án sau dùng chung một kiểu tổ chức. Chỉ file này được commit; mọi thứ còn lại bị `.gitignore` chặn (có thể chứa nghiệp vụ nhạy cảm, log, dữ liệu máy).

> Trạng thái: **chưa đóng gói**. Dashboard hiển thị và danh sách file nào sẽ đưa lên git chưa chốt — các mục đánh dấu *(dự phòng)* chỉ là chỗ giữ chỗ, CLI chưa ghi vào đó.

## 1. Bố cục
```text
.ops/
├── README.md                          # (commit) file này
├── reviews/<project>/<feature>/<version>/   # ĐANG DÙNG — kết quả review độc lập 3 tầng
│   ├── packet.md                      #   Tầng 0: lint tĩnh + ngữ cảnh + prompt reviewer (proto review-prep)
│   ├── core-r1.md, core-r2.md …       #   Tầng 1: ui-ux-review (đánh số vòng, không ghi đè)
│   ├── business-r1.md …               #   Tầng 2: business-review
│   └── human.md                       #   Tầng 3: phản hồi người dùng thật
├── runs/<YYYY-MM-DD>/<run-id>/        # (dự phòng) log mỗi lần chạy: meta.json, raw.log, events.jsonl
├── index.jsonl                        # (dự phòng) sổ cái append-only của mọi run
├── incidents/                         # (dự phòng) báo cáo sự cố
└── dashboard/                         # (dự phòng) dashboard hiển thị — chưa chốt
```
Đổi gốc `.ops/` bằng biến môi trường `MOCKUP_OPS_DIR` (mặc định: thư mục này).

## 2. Cái gì ở đâu (không nhầm với `.ops/`)
| Loại | Nơi lưu | Commit? |
| :--- | :--- | :---: |
| Kết quả review + nhận xét | `.ops/reviews/…` (thư mục này) | ❌ |
| Brief cho version kế tiếp (đã lược dữ liệu nhạy cảm) | `briefs/<project>/<feature>/<version>.md` | ✅ |
| Tri thức chuyên ngành của dự án (`BUSINESS-REVIEW.md`) | **repo dự án**: `docs/02-mockups/` | ✅ (ở repo dự án) |
| Mockup chốt | repo dự án, qua `proto promote` | ✅ (ở repo dự án) |

Quy trình đầy đủ: [`skill/REVIEW.md`](../skill/REVIEW.md).
