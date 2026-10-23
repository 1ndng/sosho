# sosho — 模擬手機網頁

直接用瀏覽器開啟 `index.html` 即可（不需要安裝任何東西）。

## 檔案結構
- `index.html` — 頁面骨架
- `js/data.js` — **所有顯示文字（test1 ~ test71）與圖片路徑都在這裡改**
- `js/app.js` — 互動邏輯（換頁、上滑回首頁、「尚未更新」提示）
- `css/style.css` — 樣式
- `images/` — 暫用的佔位圖，換成自己的圖後把 `data.js` 裡的路徑改掉即可

## 頁面與網址
| 網址 | 畫面 |
| --- | --- |
| `index.html` | 預設進入論壇 |
| `#/forum` | 論壇文章列表 |
| `#/forum/3` | 論壇第 3 篇文章（數字 = data.js 裡文章的 id） |
| `#/ig` | Instagram 個人頁 |
| `#/home` | 手機首頁 |

## 操作
- 在畫面最下方的橫條往上滑（手機用手指，電腦用滑鼠拖曳）→ 回到手機首頁
- 論壇廣告：`data.js` 的 `ads[].link` 填外部網址就會另開分頁；留空則顯示「尚未更新」
- 新增文章：複製 `posts` 裡的一整個 `{ ... }` 區塊，改一個新的 id 即可

## 用 GitHub Pages 發布
1. 到 GitHub 的 repo → **Settings** → 左側 **Pages**
2. Source 選 **Deploy from a branch**，Branch 選 **master**、資料夾選 **/(root)**，按 Save
3. 等 1～2 分鐘，網址會是 `https://1ndng.github.io/sosho/`
4. 之後每次把修改 push 到 master，網站就會自動更新

## IG 切換帳號／登入畫面
- 點 IG 最上方的帳號名稱 → 從下方滑出帳號清單（目前帳號 + 新增帳號）
- 按新增帳號 → `#/ig/login` 登入畫面；這只是裝飾畫面，輸入的內容不會被送出或儲存，按登入只會顯示「尚未更新」

## IG 多帳號登入
- `data.js` 的 `instagram.otherAccounts` 裡每一項是一個可登入的帳號（`username` = 帳號、`password` = 密碼）
- 帳密對了會切換到那個帳號，並出現在帳號清單裡；錯了會跳出 `login.errorText`
- 登入過的帳號和目前帳號會記在玩家瀏覽器裡；想重置可清除網站資料
- 注意：帳密寫在 data.js 裡，懂得看原始碼的人看得到（遊戲用途沒問題，但別放真正的密碼）
