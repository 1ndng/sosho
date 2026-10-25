# sosho — 撿到 Shotaro 的手機

模擬手機畫面的小型解謎網頁遊戲。玩家撿到 Shotaro 的手機，在論壇、Instagram、電話、KakaoTalk 之間找線索，拼出他和소희談戀愛的證據。

- 遊玩網址：<https://1ndng.github.io/sosho/>
- 手機直接開就是滿版；電腦上會顯示成一支手機。

> ⚠️ 這份說明不寫解謎答案，但 `js/data.js` 裡什麼都看得到（包含密碼），不想被劇透就別打開。

---

## 檔案結構

| 檔案 | 用途 |
| --- | --- |
| `index.html` | 頁面骨架、載入所有程式 |
| `js/data.js` | **所有內容都在這裡**：論壇文章與留言、公告、IG 帳號／貼文／限動、電話對話、Kakao 聊天、首頁小工具 |
| `js/app.js` | 主要程式：密碼鎖、首頁、論壇、Instagram、換頁、上滑回首頁、進度判斷 |
| `js/apps/phone.js` | 電話（撥號鍵盤＋通話中的對話） |
| `js/apps/kakao.js` | KakaoTalk（密碼畫面、聊天列表、聊天室） |
| `js/automedia.js` | 依照檔名自動把圖片／影片／音樂放進遊戲（見下方「檔名規則」） |
| `js/media.js` | `images/`、`audio/` 的檔案清單（**自動產生，不用手改**） |
| `js/lang.js` | 繁體／简体切換 |
| `js/vendor/opencc-t2cn.js` | 繁轉簡用的開源字典（opencc-js，MIT） |
| `css/style.css` | 手機外框、首頁、論壇、Instagram 的樣式 |
| `css/apps.css` | 電話、KakaoTalk 的樣式 |
| `images/` | 所有照片、影片（影片封面 `xxx_poster.jpg` 會自動產生） |
| `audio/` | IG 個人頁的音樂（`1_music.mp3` 等） |
| `tools/build_media.py` | 壓縮圖片影片、產生影片封面、更新 `js/media.js` |
| `.github/workflows/media.yml` | 每次 push 後自動執行 `build_media.py` |
| `.nojekyll` | 讓 GitHub Pages 原樣發布檔案 |

---

## 怎麼改內容

全部在 `js/data.js`，每一段上面都有中文註解。常用的：

- **論壇**：`forum.posts`（文章、留言；留言可附 `image` 或 `video`、用 `replyTo` 回覆別人）、`forum.notices`（公告，依進度換版本）
- **Instagram**：`instagram`（小帳 fauiogl94）與 `instagram.otherAccounts`（shotaroo0、252525252_）
  - 貼文：`posts`；典藏：`archive.posts` / `archive.stories`；精選：`highlights`
  - 限動可以加：
    - `closeFriends: true` 摯友限動
    - `note: "文字"`、`noteBy: "帳號"` 左下角留言泡泡（不寫 noteBy = 帳號主人自己）
    - `notes: [{ text, by }, …]` 多則留言：泡泡輪流顯示，點開看全部
    - `likedBy: ["帳號"]` 用那個帳號看時愛心預設是紅的
    - `pos: "20% 50%"` 照片裁切位置
  - 貼文的 `likedBy` 同理：用那個帳號看時愛心是紅的；典藏貼文不顯示按讚
  - `saved`：預先儲存的貼文（`"帳號/圖片檔名"`）
- **電話**：`phone.dialable`（可撥的號碼＋通話劇本 `script`：字幕、選項、分支；不在清單裡的號碼會無人接聽）
- **KakaoTalk**：`kakao.friends`、`kakao.groups`、`kakao.me`（自己的聊天室）
  - 日期分隔線：`{ date: "2026年3月5日" }`
  - 訊息種類：文字 `text`、照片 `image`、影片 `video`、視訊／語音 `call: "video"`（`duration` 通話長度）、收回 `recalled: true`、過期照片 `expired: true`、過期影片 `expired: "video"`、連結 `link: "#/forum/1"`
  - 時間格式：`"下午 9:32"`；`read: true` = 對方已讀
- **首頁**：`home`（桌布、Dock 的 App、備忘錄、時鐘小工具的固定日期）

改完 push 到 `master`，1～2 分鐘後網站就會更新。

---

## 檔名規則（上傳就自動放進遊戲）

照這個格式取名、上傳到 `images/`（音樂放 `audio/`），不用改 `data.js` 就會出現在對的地方：

```
{帳號}_{種類}_{日期}[-第幾張].副檔名
```

- **帳號**：`1` = shotaroo0、`2` = 252525252_、`3` = fauiogl94
- **種類**：`story`（限動，放進精選）、`story2`（摯友限動）、`post`（貼文）、`savedstory` / `savedpost` / `saved`（典藏）、`msg`（Kakao 照片：`1` = Shotaro 傳、`2` = 소희傳）、`music`（個人頁音樂，不用日期）
- **日期**：`20260426` 或 `260426`；同一天多張用 `-2`、`-3`…
- **Kakao 其他好友傳的照片**：`at_msg_日期`（Anton）、`wb_`（원빈）、`sc_`（성찬）、`es_`（은석）

`data.js` 裡已經寫過的檔案不會重複放；想加文字、留言或調整順序，就在 `data.js` 寫一筆，以 `data.js` 為準。

### 自動整理（GitHub Action）
每次 push 後 `.github/workflows/media.yml` 會：
1. 把放錯資料夾的圖片／影片搬進 `images/`、音樂搬進 `audio/`
2. 壓縮：照片最長邊 1440px（HEIC／PNG 等轉成 JPG）、影片轉成手機可播的 720p MP4
3. 幫每支影片產生封面 `xxx_poster.jpg`
4. 更新 `js/media.js`

（電腦上也可以手動跑：`python3 tools/build_media.py`）

---

## 遊戲進度

`forum.stages` 決定公告／提示什麼時候出現，條件是遊戲中記錄的「旗標」：

| 旗標 | 什麼時候記錄 |
| --- | --- |
| `left_forum` | 第一次離開論壇 |
| `kakao_lock_seen` | 看到 KakaoTalk 的密碼畫面 |
| `kakao_unlocked` | 解開 KakaoTalk |
| `locked_帳號` | 看到那個 IG 帳號「此帳號不公開」 |
| `login_帳號` | 登入過那個 IG 帳號 |
| `chat_好友id` | 打開過那個 Kakao 聊天室 |

公告換到新版本時會重新顯示未讀 ❗。全部完成後出現「[Thanks!]」與「故事線整理」。

---

## 其他功能

- **重新開始**：論壇最下面，清除所有進度、登入、聊天、備忘錄，回到手機密碼鎖
- **繁體／简体**：論壇最下面「简体中文／繁體中文」，選擇會記在瀏覽器裡（重新開始不會清掉）
- **上滑回首頁**：在 App 裡從畫面最下方往上滑（電腦可用滑鼠拖底部橫條）；加到 iPhone 主畫面時也能用
- 進度、追蹤、按讚、典藏等都存在玩家自己的瀏覽器（localStorage），換裝置或清除網站資料就會重來

---

## 網址（hash）

| 網址 | 畫面 |
| --- | --- |
| `#/home` | 手機首頁（解鎖後預設） |
| `#/forum`、`#/forum/1` | 論壇列表、第 1 篇文章 |
| `#/forum/notice/main` | 公告 |
| `#/ig`、`#/ig/u/帳號` | 自己的 IG、別人的 IG |
| `#/ig/settings`、`#/ig/archive`、`#/ig/saved` | 設定、典藏、已儲存 |
| `#/phone` | 電話 |
| `#/kakao`、`#/kakao/chat/f1`、`#/kakao/chat/me`、`#/kakao/chat/g1` | 聊天列表、聊天室 |

---

## 發布（GitHub Pages）

Repo → **Settings** → **Pages** → Source 選 **Deploy from a branch**、Branch 選 **master**、資料夾 **/(root)**。網址：<https://1ndng.github.io/sosho/>（記得最後的 `/sosho/`）。
