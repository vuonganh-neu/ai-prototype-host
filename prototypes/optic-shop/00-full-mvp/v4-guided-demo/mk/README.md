# mk — engine kịch bản đóng gói theo version

Bản sao engine dùng cho riêng version này (đóng gói để `proto promote` chép sang dự án vẫn chạy, và để version bất biến cùng engine của nó).

- `scenario.js` — mở rộng intent, validate kịch bản (dùng chung cho trình duyệt và Playwright).
- `mk.js` — `MK.store` (localStorage có namespace), `MK.onReset`, panel: ▶ tự chạy · ⏭ từng bước · teleport tới bước N,
  âm thanh (♪ nhạc · tiếng click · thuyết minh), ô chọn giọng, từ điển phát âm `voice.json`.
- `kit.css` — giao diện panel, con trỏ giả, chú thích.

URL: `?scenario=<id>&step=<n>&autoplay=1&speed=2&mk=0&music=0&sfx=0&voice=0&voiceName=HoaiMy`
Kịch bản: `scenarios/*.json` + `scenarios/index.json`, macro: `intents.json`, phát âm: `voice.json`.
Mọi phần tử được kịch bản trỏ tới có `data-testid` — đó là hợp đồng với test E2E và code front sau này.
