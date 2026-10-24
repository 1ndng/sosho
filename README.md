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

## IG 設定頁、貼文頁、限時動態
- 右上角三條線 → `#/ig/settings`，內容在 `instagram.settings`
- 點格子裡的貼文 → `#/ig/post/編號`；貼文寫成 `{ images: [...], likes, likedBy, caption, time }`，也可以只寫一個圖片路徑字串
- 點頭像（有 `story` 時）→ `#/ig/story/me`；點精選動態 → `#/ig/story/編號`，內容在每個精選的 `stories`
- 限時動態每張 5 秒自動換下一張，點左邊 1/3 上一張、點右邊下一張，看完自動回個人頁

## IG 搜尋
- 自己的個人頁左上角是搜尋鍵（下方功能列已移除）
- 搜尋頁：左邊返回鍵＋搜尋框；沒輸入時列出搜尋紀錄（從搜尋結果點進去過的帳號，可按 ✕ 刪掉），沒有紀錄就空白
- `searchMode`："exact" 要打完整 id；"prefix" 打開頭幾個字就會出現
- 搜得到的帳號 = 主帳號 + `otherAccounts` + `searchOnlyAccounts`

## IG 貼文數／粉絲／追蹤自動計算
- 貼文數 = `posts` 的數量；粉絲、追蹤中 = 依各帳號的 `following` 名單（加上玩家按的追蹤／取消）自動算
- 想顯示固定數字（例如 "145k"）就在帳號裡加 `postsCount` / `followersCount` / `followingCount`，會蓋過自動計算
- 點粉絲或追蹤中 → `#/ig/follows/followers`、`#/ig/follows/following`（別人的是 `#/ig/u/帳號/follows/...`）

## IG 互動
- 貼文：愛心（也可以點兩下圖片）、留言（玩家可新增，會記住）、轉發（出現在個人頁轉發分頁）、分享（選帳號傳送／複製連結）、收藏（設定 → 已儲存）
- 讚數：`likes` 填數字會自動 +1；填文字（像 "1.2萬"）就照原樣顯示
- 貼文的 `comments`、`tagged`，帳號的 `reposts`，以及 `instagram.text` 的提示文字都在 data.js
- 限時動態：愛心可按、可輸入訊息送出（輸入時會暫停）

## 電話（#/phone）
- 只有數字鍵盤（沒有通話記錄、底部分頁）；撥 `phone.dialable` 裡有 `script` 的號碼會接通、跑字幕對話，其他號碼 3 秒後「無人接聽」
- 對話段落寫 `flag: "名稱"` → 走到那段就記錄進度（解鎖論壇公告用）

## KakaoTalk（#/kakao）
- 訊息可以是連結：`{ from: "f4", link: "#/forum/1" }`（自動帶出論壇文章標題，點了打開那篇）
- 只有最後一天的自己訊息會顯示未讀數，更早的都當作已讀
- 訊息可以是通話紀錄：`{ from: "me", call: "video"（或 "voice"）, duration: "1:02:33" }`
- 進入前要輸入 `kakao.passcode`（目前 0318，打完電話才會知道）；解開一次就記住，「重新開始」會清掉
- 只有聊天列表（介面全部是繁體中文，日期線格式「2026年10月22日 星期四」）：`kakao.friends` 的私聊＋`kakao.groups` 的群組，照名字字首排序；沒有好友頁、底部分頁
- 聊天室：`messages` 裡 `{ date }` 是日期分隔，`from: "me"` 黃色靠右，`from: "them"` 白色靠左
- 自己的訊息在對方還沒回之前會顯示未讀「1」
- `replies`：玩家訊息包含 `keywords` 任一個字 → 對方依序回 `reply`；都沒符合時用 `defaultReply`（空的就不回）
- 玩家傳的訊息、自動回覆、未讀數都會記在瀏覽器裡

## 列表排序
- IG（粉絲／追蹤中、摯友、搜尋結果、搜尋紀錄、切換帳號）照帳號 id 字首排序；Kakao 聊天列表：有未讀的排最上面，其他照最後一則訊息的時間（新的在前）

## 圖檔命名
- 開頭數字＝帳號：`1_` shotaroo0（手機使用者）、`2_` 252525252、`3_` fauiogl94（shotaroo0 的小帳）
- `X_avatar.jpg` 大頭貼；`X_post編號[-第幾張].jpg` 貼文（編號＝個人頁顯示順序）
- `X_story_年月日[-n].jpg` 限時動態；`X_msg_年月日[-n].jpg` KakaoTalk 照片訊息
- 沒標年份的一律當作 2026 年

## IG 預設帳號
- `instagram.defaultAccount`：打開 IG 時已登入的帳號（目前是 shotaroo0）
- 其他帳號有寫 `password` 才能從「新增帳號」登入；小帳 fauiogl94 的密碼在 `instagram.password`
- 限時動態：往下滑可以關閉

## 粉絲名單、摯友、已儲存、典藏
- `followersCount` / `followingCount`：手動數字；`followersList` / `followingList`：名單（帳號 id 可點進去，`{ username, name }` 是灰色預設頭貼的路人、點不進去），只顯示一頁
- 限時動態加 `closeFriends: true` = 摯友限時；只有帳號 `closeFriendsList` 裡的帳號看得到（綠框＋摯友標籤）
- 帳號的 `saved`（"帳號/貼文編號"）＝已儲存；`archive.stories` / `archive.posts` ＝典藏（設定 → 典藏）

## 論壇公告與遊戲進度
- `forum.stages`：每個進度階段要達成的條件（第 0 階段 = 一開始）
  1. 離開過論壇＋看過 KakaoTalk 密碼畫面 → 提示 1
  2. 解開 KakaoTalk＋看過小帳「此帳號不公開」的頁面 → 提示 2
  3. 登入小帳 → 提示 3
  4. 以上全部＋登入소희帳號 → 公告變「感謝遊玩」、提示變「故事線整理」
- `forum.notices`：每篇公告有好幾個版本（`versions`），依階段顯示；換版本時標題、內文一起換，並變回未讀 ❗
- 條件名稱：`left_forum`、`kakao_lock_seen`、`kakao_unlocked`、`locked_帳號id`、`login_帳號id`、`chat_好友id`、電話對話段落的 `flag`

## 論壇留言
- 留言可加 `image`；留言者和文章 `author` 一樣時自動顯示「樓主」


## 手機密碼鎖
- 每次打開網址都要先輸入 `lock.passcode`（目前 0000），解鎖後進入論壇；密碼留空就不鎖

## 電話接通對話（字幕＋選項）
- `phone.dialable` 裡有 `script` 的號碼會接通：逐句顯示字幕，講完出現選項；點字幕可以跳下一句
- 秘境咖啡廳：0267-48-3615（玩家在鍵盤輸入 0267483615）

## KakaoTalk 好友
- 李炤熙（f1）、朴元彬（f2）、李燦榮（f3）、鄭成燦（f4）、宋恩奭（f5）

## KakaoTalk 群組聊天室
- `kakao.groups`：members 寫好友 id，訊息 from 寫好友 id 或 "me"；自己的訊息旁顯示還沒回話的人數
- 目前有鄭成燦、宋恩奭的群組（g1）

## 圖檔命名（新增）
- `X_story2_日期` 摯友限時；`X_saved...` 典藏（`savedpost` 貼文、`savedstory` 限時）

## 非公開帳號、限時動態聲音
- 帳號加 `private: true`：沒追蹤的人只看得到頭貼、名字、數字、簡介，看不到貼文／限時／名單；按追蹤會變「已要求」（不會真的解鎖）
- 目前 252525252（李炤熙）和 fauiogl94（小帳）是非公開，shotaroo0 是公開
- 限時動態播影片時右上角有聲音鍵，預設靜音

- 李炤熙的 IG 帳號 id 改成 `252525252_`（登入也用這個）

## IG 行為調整
- 追蹤：只能追蹤、不能取消（非公開帳號會停在「已要求」）
- 編輯個人檔案（`#/ig/edit`）可以改名稱和簡介（存在瀏覽器裡）；分享個人檔案會複製目前網頁連結
- 已移除：轉發、分享（小飛機）、標註、發訊息、名單頁的加好友按鈕
- 從別人頁面按返回 = 回到上一頁

## 自動放圖（不用再改 data.js）

照檔名格式把檔案上傳到 GitHub（放哪個資料夾都可以），約 1～2 分鐘後網頁就會自動出現：

- 格式：`{帳號}_{種類}_{日期}[-第幾張].副檔名`，帳號 1 = shotaroo0、2 = 252525252_、3 = fauiogl94
- 種類：`story` 限時、`story2` 摯友限時、`post` 貼文、`savedstory`／`savedpost` 典藏、`msg` Kakao 照片（1 自己傳、2 소희傳）
- Kakao 其他好友傳的照片：`at_msg_日期.jpg` = Anton、`wb_` = 원빈、`sc_` = 성찬、`es_` = 은석
- 日期：`20260426` 或 `260426`；同一天多張加 `-2`、`-3`
- 音樂：`1_music.mp3`（.mp3／.m4a／.wav），放進 `audio/`，IG 個人頁的音樂列點了就會播放
- GitHub Action（`.github/workflows/media.yml`）會自動搬到 `images/`／`audio/`、壓縮（照片 1440px、影片短邊 720px、長邊 1440px、HEIC／MOV 自動轉檔），並更新 `js/media.js`
- 自動放上的貼文沒有內文；要加文字就照原本格式在 `data.js` 寫一筆，寫了就以 data.js 為準
