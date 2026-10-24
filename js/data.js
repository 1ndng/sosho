/* =========================================================
 * 網頁上所有「顯示文字」與「圖片路徑」都集中在這個檔案。
 * 直接把 testN 改成你要的內容、把圖片路徑換成你的檔案即可。
 * - 文字中的換行：在字串裡寫 \n，或改用 `反引號` 多行字串。
 * - 圖片：照檔名格式（例如 2_story_20260426.jpg）上傳到 GitHub 就會自動放上網頁，不用寫在這裡；
 *   想加文字（貼文內文、按讚數…）時，再照下面的格式寫一筆，寫了就以這裡為準。詳見 js/automedia.js。
 * - 音樂：檔名 1_music.mp3（2_ / 3_ 同理）上傳後，IG 個人頁的音樂列就能播放。
 * ========================================================= */
window.SITE_DATA = {

  /* ---------- 共用 ---------- */
  notUpdatedText: "尚未更新",   // 點到未開放功能時跳出的文字

  /* ---------- 手機密碼鎖（每次打開網址都要先輸入） ---------- */
  lock: {
    passcode: "0000",
    title: "輸入密碼",
    deleteLabel: "刪除"
  },

  /* ---------- 手機首頁 ---------- */
  home: {
    wallpaper: "images/wallpaper.jpg",
    // 左上角的備忘錄小工具（玩家可以直接打字記資訊；不要的話整段刪掉）
    memo: { label: "備忘錄" },
    // 這些 App 放在桌布下方的 Dock（和 iPhone 一樣最多 4 個、不顯示名稱）
    apps: [
      { id: "forum", label: "ANNMS Talk", icon: "images/icon_forum.png?v=2" },
      { id: "ig",    label: "Instagram", icon: "images/icon_insta.png?v=2" },
      { id: "phone", label: "電話", icon: "images/icon_phone.png?v=2" },
      { id: "kakao", label: "KakaoTalk", icon: "images/icon_kakao.png?v=2" }
    ]
  },

  /* ---------- 匿名論壇 ---------- */
  forum: {
    noticeTitle: "公告",        // 公告框的標題（在文章框上面）

    // 遊戲進度階段：每一階段要達成的條件（全部達成才算）；第 0 階段 = 一開始
    //   left_forum       = 第一次離開論壇後
    //   kakao_lock_seen  = 點進 KakaoTalk 看到要輸入密碼
    //   kakao_unlocked   = 解開 KakaoTalk 密碼
    //   locked_fauiogl94 = 點進小帳主頁、看到「此帳號不公開」（locked_帳號id）
    //   login_fauiogl94  = 登入過小帳（login_帳號id）
    //   其他可用：chat_好友id（打開過那個 Kakao 聊天室）、電話對話段落的 flag
    stages: [
      [],
      ["left_forum", "kakao_lock_seen"],                      // 1 → 提示1
      ["kakao_unlocked", "locked_fauiogl94"],                 // 2 → 提示2
      ["login_fauiogl94"],                                    // 3 → 提示3
      ["left_forum", "kakao_lock_seen", "kakao_unlocked", "locked_fauiogl94",
       "login_fauiogl94", "login_252525252_"]                 // 4 → 感謝遊玩＋故事線整理
    ],

    // 公告：同一篇有好幾個版本，stage = 從第幾階段開始顯示這個版本
    // 換到新版本時，標題和內文一起換，而且會變回未讀（❗）；還沒到第一個版本的階段 = 不顯示這篇
    // 內文用 `反引號` 包起來就可以直接換行
    notices: [
      { id: "main", versions: [
        { stage: 0, title: "[Notice!]", content: `首先感謝你撿起了Shotaro的手機！(？？？)
礙於作者筆力不足寫不出逃亡(下)，故決定以撿手機形式呈現。但比起單純的撿手機其實更像小型解謎遊戲啦哈哈哈，目標是找出李炤熙和將太郎談戀愛的證據！相信你可以的。
我就說到這了，祝福你能順利打探到他們的隱私(。)` },
        { stage: 4, title: "[Thanks!]", content: `哇有人能玩到這嗎......我愛你們。
希望你們有良好的遊玩體驗，也希望故事你們會喜歡！
如果喜歡這款遊戲，可以多多按讚讓我得到一些正反饋><
有任何建議或想法(如果你想投放廣告......。。)也歡迎跟我說！再次感謝，非常感謝。` }
      ] },
      { id: "hint", versions: [
        { stage: 1, title: "[提示]我哪知道密碼啊！", content: `哼哼恭喜你遇到第一個難關，撿到大網紅手機肯定要偷看他的聊天紀錄啦~但要怎麼知道他的鎖定密碼？
請多留意論壇提供的資訊，或許，可以，利用一下通話功能......？
加油呀相信你可以的你可以看到反差系網紅的反差真面目了。` },
        { stage: 2, title: "[提示]那個fauiogl94是誰......？", content: `聰明的你一定有預感到，那個莫名其妙沒有頭貼的帳號裡肯定藏著點什麼。既然如此就登入他！
請多留意Kakao的訊息，並試著傳訊息給朋友們，他們說不定會提供給你一些意想不到的資訊喔。` },
        { stage: 3, title: "[提示]如果你想做點壞事。", content: `其實呢故事到這裡基本上就結束了，熙醬談戀愛的證據已罪證確鑿。但如果呢到現在都還沒滿足你的窺探欲，要不要試著登入李炤熙的帳號呀(嘿嘿)
沒什麼困難的，就跟將太郎手機和他們倆屬羊遊戲的帳號一樣好登入。嗯相信你很快就能登入了。` },
        { stage: 4, title: "故事線整理", content: `提供給對故事時間線有興趣，但玩完後依舊一頭霧水的人觀看！
2021/9/1-2022/1/4：將太郎在韓國留學，認識宋恩奭和鄭成燦。
2025/3/18-2025/3/20：李炤熙逃到日本，機緣下認識了將太郎並陪同前往秘境探店，兩人就此認識，交換了聯絡方式。回韓國後兩人持續訊息聯絡。
2025/5/14-2025/5/27：將太郎前往韓國旅遊兩周，跟李炤熙見面，關係逐漸曖昧。
2025/5/20：將太郎送李炤熙火影忍者周邊，李炤熙對著將太郎喊出了忍術「螺旋丸」。
2025/11/20-2025/11/26：因帶學生比賽，李炤熙前往日本，在離開前的最後一天(11/26)兩人互訴心意。為交往紀念日。期間兩人一起度過了李炤熙(11/21)和將太郎(11/25)的生日。
2025/12/31-2026/1/1：李炤熙快閃日本，美好跨年夜^~^
2026/2/8：兩人開始思考遠距離的可能性，以及思考該如何在生活和愛情間做出取捨、達成平衡。
2026/3/5：交往100日。將太郎搬到韓國定居。
2026/3/8：與李炤熙和他朋友見面，認識了李燦榮。
2026/4/8：將太郎前往舞室，認識朴元彬。
2026/5/19：兩人吵架，將太郎向朴元彬傾訴。
2026/6/14：李燦榮向將太郎透露了一些李炤熙的故事。
2026/7/11：兩人在舞室明顯鬧僵，朴元彬忍不住傳訊息關心。
2026/10/11：三人一起出去玩，李燦榮傳了兩人的合照給將太郎。
2026/10月中下旬：網友在論壇懷疑將太郎談戀愛。
2026/10/22：鄭成燦把論壇文章傳給將太郎，逼問是不是真的。` }
      ] }
    ],
    listTitle: "文章",          // 文章列表框的標題
    backLabel: "返回",          // 文章內頁「返回」
    commentLabel: "留言",       // 「留言」
    opLabel: "樓主",            // 留言者和文章的匿名帳號代碼一樣時，名字旁顯示的標籤
    // 留言格式：{ name: "匿名代碼", text: "內容", image: "images/xxx.jpg" }（image 可省略；影片用 video: "images/xxx.mp4"；回覆別人加 replyTo: "代碼"）

    // 文章：順序 = 列表顯示順序。id 請保持不重複（用於網址 #/forum/id）
    posts: [
      {
        id: "1", title: "Shoちゃん是不是談戀愛了？",
        author: "taromilkteaaaa",          // 匿名帳號代碼
        // 內文用 `反引號` 包起來就可以直接換行
        content: `作為一名從Shoちゃん在日本活躍開始，就一直有在關注他的多年老粉，我嚴肅懷疑Shoちゃん最近談戀愛了。
雖然應該沒有人不認識他（吧），但還是稍微介紹一下。Shoちゃん，也就是Shotaro，是世界第一卡哇伊的探店型網紅。是日本人，所以理所當然在日本生活，當時就因其反差感（畢竟臉那麼萌但outfit總是那麼帥潮人又那麼亞撒西。）吸引了很多粉絲，加上他曾經有在韓國留學的經驗，在很多時候也會尤其照顧我們這群外國粉絲，哎總之特別好，我就斷在這了不然這篇要成安利文了ㅎㅎ
回到正題。我猜是因為Shoちゃん在韓國也有一定的粉絲基數，然後他也很喜歡這裡（我相信是這樣的⋯⋯）今年初他突然宣布搬來韓國定居了。剛開始其實跟在日本時差不多，只是探的店換了個國家而已！但是，但是，你們不覺得他最近發的東西跟之前很不一樣嗎？
首先是懟臉的照片變多了。記得之前Shoちゃん面對他拍時，基本都是走冷都帥男路線，只有自拍才會露出純粹的萌態。但最近連他拍也越來越萌了，讓人不禁懷疑是不是因為掌鏡人。再來，感覺逆生長了。絕對不是在說Shoちゃん不年輕了的意思！30歲是最美好的年齡！但看著他從過去青澀的、總是瞇著眼嘿嘿笑的樣子，到有一陣子突然變得成熟、帥氣且充滿性張力（那時吸引了不少夢粉呢），再到現在好像介於兩者之間，甚至是與早期更相似一點。講成這樣好像跟戀愛沒擦上邊，但我的直覺告訴我一定有什麼關聯⋯⋯！
所以呢，我覺得他是不是在韓國找到了對象呢⋯⋯哎呀光是想想就好羨慕好羨慕好羨慕（如果有此號人物的話><）！大家怎麼看呢。`,
        comments: [
          { name: "sho_pabo", text: "不覺得。taro哥哥一直都是特別敬業的人，是因為做了市場調研了解了多數粉絲偏好，才做了一些轉變吧。什麼都聯想到談戀愛未免也太性緣腦了。哥哥只會跟我談戀愛。" },
          { name: "username000", text: "同意樓上的不要性緣腦(其他的就kkk祝福🙏)，但說實話確實很可疑。尤其奇怪的是，taro算是很注重隱私的網紅了，但最近感覺總是會有其他身影入鏡。是沒有暴露隱私沒錯啦但身體距離近到這種程度⋯⋯我懷疑他被同行友人暗戀了。taro請保護好自己。" },
          { name: "452_.rq", text: "各位，這是我之前幸運看到了Shotaro發布又秒刪除的限時動態。雖然不知道拍攝者是誰，但秒刪實在很欲蓋彌彰。",
            video: "images/forum_1_c3.mp4" },
          // replyTo = 回覆哪個帳號代碼（往右縮排、文字前面自動顯示 @代碼）
          { name: "sho_pabo", replyTo: "452_.rq", text: "拜託這一看就是小孩啊，你會叫你對象あにき？別造謠他跟他來路不明的侄子了好吧不如造謠我跟他。" },
          { name: "452_.rq", replyTo: "sho_pabo", text: "👌🏻" }
        ]
      },
      {
        id: "2", title: "🇯🇵秘境餐廳推薦！",
        author: "f00d1smylife_",          // 匿名帳號代碼
        content: `如題。最近去了一趟日本，意外收穫了很多寶藏餐廳ㅜㅜ💖雖然都不是很靠近都市，但如果大家未來前往日本，想要規劃避開人群的小眾行程，誠摯推薦可以將這些店家放入名單！
第一家是藏在三浦半島小網代森林旁的「茶房 こもれび」。說真的去的路上我差點放棄⋯⋯從三崎口站轉公車之後，還要走一段沒有路燈的小坡道，Google地圖還一度把我帶進樹林裡繞圈ㅠㅠ但推開店門的瞬間一切都值得了！招牌是老闆每天現刷的抹茶，配上抹茶聖代苦甜剛剛好，連平常不太敢吃苦的我都整杯吃光光。店裡還有一隻叫「Ren」的長毛吉娃娃店狗，會乖乖趴在門口迎接客人，摸摸頭還會瞇起眼睛，超級療癒🐶
第二家是靜岡伊豆半島山裡的蕎麥麵老鋪「そば処 山ゆり」。一樣不太好找，要沿著山路繞好多個彎（會暈車的人記得先吃藥⋯⋯）。招牌是手打十割蕎麥配現磨山葵，山葵是店家自己在後山種的，香氣跟市面上的完全不一樣！店裡沒有店狗，但有一隻很高冷的三花貓店長，只願意在你吃完之後才慢慢過來巡視🐱
最後一家是長野木曾宿場町裡的古民家咖啡廳「珈琲と甘味 ひだまり」。從車站出來要爬二十分鐘的石板坡路，但沿路的老街風景本身就是一種享受！招牌是焙茶布丁，連焦糖層都是用焙茶熬的，香到我當場加點了第二個ㅎㅎ 老闆奶奶人超好，還招待了自己醃的野澤菜。
店家資訊我都放在留言區了~如果有人看到這篇文而去探店的話記得回來留言，我會很幸福~`,
        comments: [
          { name: "f00d1smylife_", text: `★店家資訊★
1.茶房 こもれび
電話：046-882-3916
地址：神奈川県三浦市三崎町小網代2718-3
2.そば処 山ゆり
電話：0558-45-0731
地址：静岡県賀茂郡松崎町池代412-1
3.珈琲と甘味 ひだまり
電話：0264-57-2186
地址：長野県木曽郡南木曽町吾妻1876-3` },
          { name: "aburasoba", text: "謝謝樓主推薦，等我去後再回來分享。" },
          { name: "f00d1smylife_", replyTo: "aburasoba", text: "💖💖" }
        ]
      },
      {
        id: "3", title: "💘【戀愛偵測指南】判斷一個人是不是正在談戀愛的7個妙招！第5點90%的人都沒發現😱",
        author: "yolo._520",          // 匿名帳號代碼
        content: `你身邊是不是也有這樣的人？最近總是莫名其妙地傻笑、手機螢幕一亮就秒拿起來、問他週末去哪裡都支支吾吾⋯⋯
先別急著下結論！今天就由小編為大家整理「判斷一個人是不是正在談戀愛」的7個妙招，看完你一定會恍然大悟！👀✨

1️⃣ 突然開始注重外表
戀愛中的人會不自覺地想展現最好的一面。新衣服、新髮型、新香水⋯⋯如果他最近突然變得特別精緻，那很可能是有了想好好表現的對象喔！💄

2️⃣ 手機成為身體的一部分
看到訊息時嘴角上揚、打字時刻意側身、手機永遠螢幕朝下放——這些都是戀愛中的經典徵兆📱

3️⃣ 話變少了，但一開口就藏不住幸福
這點非常關鍵！很多人以為戀愛中的人會到處炫耀，但其實正好相反。正在偷偷幸福的人，往往因為想把這份心情藏起來，反而變得安靜許多🤫但只要一開口，語氣裡就會不自覺地洋溢著幸福感。如果你發現一個人最近變沉默了，偶爾說出的話卻閃閃發光，那他很可能正在談戀愛✨

4️⃣ 行程變得神祕
「週末有事」「那天不行」——行程表突然多了很多空白，問了也不說清楚？戀愛中的人，時間總是優先留給那個人的🗓️

5️⃣ 原本很「裝」的人，突然不裝了（90%的人都沒發現！）
這是最容易被忽略、卻也最準確的一點！當一個人確定自己被愛著，他就會開始接受自己不完美、不體面的樣子😌因為他知道，就算自己沒那麼完美，也依然會被好好喜歡。所以如果你身邊那個總是維持形象、永遠精緻帥氣的人，最近突然開始展露傻氣、可愛，甚至有點狼狽的一面——恭喜你，你可能已經發現了他的祕密💕

6️⃣ 歌單變了
情歌的比例悄悄上升？分享的歌越來越甜？音樂是最誠實的心情紀錄🎧

7️⃣ 整個人散發著「被好好愛著」的氣場
氣色變好、笑容變多、脾氣變溫柔⋯⋯戀愛的力量是藏不住的🌸

💡小編總結：
當然，以上妙招僅供參考，每個人表達愛的方式都不一樣～但如果你身邊的人符合以上3點以上，那他十之八九正在談戀愛啦！🥰
你身邊有符合這些特徵的人嗎？快分享給你的朋友，一起來當戀愛偵探吧！🕵️‍♀️💘

#戀愛 #戀愛徵兆 #心理學 #感情 #必看 #轉發

希望這篇文章對您有幫助！如果需要調整語氣或增加更多戀愛徵兆，請隨時告訴我～😊`,
        commentsDisabled: true,        // 樓主已限制留言（不顯示任何留言）
        comments: []
      }
    ],
    commentsDisabledText: "樓主已限制留言。",

    // 底部廣告（橫條，佔滿寬度，由上往下排）：link 填外部網址；不寫 link 就只顯示、點了沒反應
    // 可以放影片（.mp4，靜音、自動循環播放）
    ads: [
      { image: "images/ad_1.mp4", link: "https://www.asianfanfics.com/story/view/1770006/story-61" },
      { image: "images/ad_2.mp4" }
    ],

    // 最下方淺色文字
    copyright: "@dng",
    restartLabel: "重新開始",                          // 論壇最下面的按鈕：清除所有進度、回到密碼鎖
    restartConfirm: "要清除所有進度、從頭開始嗎？"
  },

  /* ---------- Instagram ---------- */
  instagram: {
    defaultAccount: "shotaroo0",   // 打開 IG 時已經登入的帳號
    username: "fauiogl94",         // ↓ 這一段是小帳 fauiogl94（同時放全部帳號共用的文字設定）
    password: "1126Rasengan",      // 小帳的密碼（紀念日 11/26 ＋ 忍術）：從「新增帳號」輸入對了才登得進去
    private: true,                 // 非公開帳號：沒追蹤的人看不到貼文、限時、名單（按追蹤只會變「已要求」）
    avatar: "images/default_avatar.png",   // 和路人一樣的預設頭貼
    hasStory: false,             // 小帳頭像沒有限時動態
    name: "",                      // 沒有名字 → 顯示帳號 id
    // 貼文數、粉絲數、追蹤數會自動計算（貼文 = posts 的數量；粉絲／追蹤 = following 名單）
    // 想顯示固定數字（例如 "145k"）時，再加上 postsCount / followersCount / followingCount 就會蓋過自動計算
    closeFriendsList: [],          // 小帳沒有摯友
    following: ["shotaroo0"],    // 這個帳號追蹤中的帳號（寫帳號 id）
    postsLabel: "貼文",
    followersLabel: "位粉絲",
    followingLabel: "追蹤中",
    bio: [],                       // 每一項 = 一行；@開頭的字會自動變藍色
    music: { title: "Nostalgic", artist: "No Guindce" },   // 個人頁的音樂列（音檔 audio/3_music.mp3）
    // 小帳預先儲存的貼文：Shotaro 和 소희 同一天（或差一天）發的貼文（"帳號/圖片檔名"）
    saved: ["252525252_/2_post_20251121.jpg", "shotaroo0/1_post_20251120.jpg",
            "shotaroo0/1_post_20250318.jpg", "252525252_/2_post_20250318.jpg"],
    editProfileLabel: "編輯個人檔案",
    shareProfileLabel: "分享個人檔案",
    // 精選動態：image = 圓圈封面，stories = 點進去看到的內容
    highlights: [
      { image: "images/3_story_20251126.jpg", label: "🧡",
        stories: [
          // 11/26 一次補發以前的照片：左下角自己打上原本的日期
          { image: "images/3_story_20251126.jpg", time: "2025年11月26日", note: "2025/5/26" },
          { image: "images/3_story_20251126-2.jpg", time: "2025年11月26日", note: "2025/5/28" },
          { image: "images/3_story_20251126-3.jpg", time: "2025年11月26日", note: "2025/7/15" },
          { image: "images/3_story_20251126-4.jpg", time: "2025年11月26日", note: "2025/7/15" },
          { image: "images/3_story_20251230.jpg", time: "2025年12月30日" },
          { image: "images/3_story_20251231.jpg", time: "2025年12月31日" },
          { image: "images/3_story_20260206.jpg", time: "2月6日" },
          { image: "images/3_story_20260206-2.jpg", time: "2月6日" },
          { image: "images/3_story_20260305.jpg", time: "3月5日" },
          { image: "images/3_story_20260306.jpg", time: "3月6日" },
          { image: "images/3_story_20260323.jpg", time: "3月23日" },
          { image: "images/3_story_20260401.jpg", time: "4月1日" },
          { image: "images/3_story_20260409.jpg", time: "4月9日" },
          { image: "images/3_story_20260410.jpg", time: "4月10日" },
          { image: "images/3_story_20260416.jpg", time: "4月16日" },
          { image: "images/3_story_20260422.jpg", time: "4月22日" },
          { image: "images/3_story_20260601.jpg", time: "6月1日" },
          { image: "images/3_story_20260710.jpg", time: "7月10日" },
          { image: "images/3_story_20260711.jpg", time: "7月11日" },
          { image: "images/3_story_20261011.jpg", time: "10月11日" },
          { image: "images/3_story_20261011-2.jpg", time: "10月11日" }
        ] }
    ],
    // 貼文：images 可放多張（左右滑動）；格子上顯示第一張
    // 小帳的貼文沒有人按讚（沒有 likes / likedBy）
    // 需要時可以加：comments: [{ user: "帳號", text: "留言", time: "1天" }]、tagged: ["被標註的帳號"]
    posts: [
      {
        images: ["images/3_post_20261011.jpg"],
        caption: "test113",
        time: "10月11日"
      },
      {
        images: ["images/3_post_20260827.jpg"],
        caption: "",
        time: "8月27日"
      },
      {
        images: ["images/3_post_20260812.jpg"],
        caption: "test292",
        time: "8月12日"
      },
      {
        images: ["images/3_post_20260705.jpg", "images/3_post_20260705-2.jpg"],
        caption: "test317",
        time: "7月5日"
      },
      {
        images: ["images/3_post_20260605.jpg"],
        caption: "test117",
        time: "6月5日"
      },
      {
        images: ["images/3_post_20260519.jpg"],
        caption: "",
        time: "5月19日"
      },
      {
        images: ["images/3_post_20260427-2.jpg"],
        caption: "test314",
        time: "4月27日"
      },
      {
        images: ["images/3_post_20260427-3.jpg"],
        caption: "",
        time: "4月27日"
      },
      {
        images: ["images/3_post_20260427.jpg"],
        caption: "test311",
        time: "4月27日"
      },
      {
        images: ["images/3_post_20260418.jpg"],
        caption: "test308",
        time: "4月18日"
      },
      {
        images: ["images/3_post_20260410.jpg", "images/3_post_20260410-2.jpg"],
        caption: "test210",
        time: "4月10日"
      }
        ],

    // 這個帳號轉發的貼文（"帳號/貼文編號"，編號從 0 開始）；玩家按的轉發會自動加在前面
    reposts: [],

    // IG 按讚、留言、分享、轉發、收藏時出現的文字（{user}、{n} 會自動換成帳號、數量）
    text: {
      commentsTitle: "留言",
      commentPlaceholder: "為 {user} 新增留言……",
      postButton: "發佈",
      reply: "回覆",
      viewAllComments: "查看全部 {n} 則留言",
      noComments: "還沒有留言",
      justNow: "剛剛",
      shareTitle: "分享",
      sendButton: "傳送",
      sent: "已傳送",
      copyLink: "複製連結",
      linkCopied: "已複製連結",
      reposted: "已轉發到你的個人檔案",
      unreposted: "已取消轉發",
      savedTitle: "已儲存",
      noSaved: "還沒有儲存任何貼文",
      noReposts: "還沒有轉發任何貼文",
      noTagged: "還沒有被標註的相片",
      storyMessageSent: "訊息已傳送",
      editTitle: "編輯個人檔案",
      nameLabel: "名稱",
      bioLabel: "個人簡介",
      cancelLabel: "取消",
      doneLabel: "完成",
      closeFriendsTitle: "摯友",
      noCloseFriends: "還沒有摯友",
      archiveTitle: "典藏",
      archiveStories: "限時動態",
      archivePosts: "貼文",
      noArchive: "沒有典藏的內容",
      privateTitle: "此帳號不公開",
      privateDesc: "追蹤這個帳號即可查看相片和影片。",
      requestedLabel: "已要求"          // 對非公開帳號按追蹤後的按鈕文字
    },

    // 貼文頁、限時動態的固定文字
    postTitle: "貼文",             // 貼文頁上方標題「貼文」
    likedBySuffix: "說讚",         // 「說讚」
    storyMessagePlaceholder: "傳送訊息……",  // 限時動態下方「傳送訊息……」

    // 下方功能列的搜尋頁
    // 不能登入、只會出現在粉絲／追蹤名單裡可以點進去的帳號（格式和 otherAccounts 一樣，不用寫 password）
    searchOnlyAccounts: [],

    // 從搜尋點進別人的頁面時，取代「編輯／分享個人檔案」的兩個按鈕
    followLabel: "追蹤",
    messageLabel: "發訊息",
    followingButtonLabel: "追蹤中",   // 按了追蹤之後按鈕變成的文字

    // 右上角三條線 → 設定頁：已儲存、典藏、帳號隱私設定（公開／不公開開關）、摯友都可以點進去
    settings: {
      title: "設定和動態",
      sections: [
        { title: "功能", items: [
          { icon: "saved",   label: "已儲存" },
          { icon: "archive", label: "典藏" }
        ] },
        { title: "隱私", items: [
          { icon: "lock", label: "帳號隱私設定" },          // 點進去可以切換公開／不公開，右邊會自動顯示目前狀態
          { icon: "star", label: "摯友" }      // 摯友人數會自動計算
        ] }
      ]
    },

    // 點最上方帳號名稱 → 切換帳號清單
    addAccountLabel: "新增帳號",   // 清單最下面「新增帳號」

    // 按「新增帳號」後的登入畫面（只是畫面，輸入的內容不會被送出或儲存）
    login: {
      usernamePlaceholder: "帳號",
      passwordPlaceholder: "密碼",
      loginLabel: "登入",
      errorText: "帳號或密碼錯誤"   // 帳密錯誤時跳出的提示
    },

    // 可以從「新增帳號」登入的其他帳號（輸入對的帳號＋密碼才會登入）
    // 欄位和上面主帳號一樣；沒寫到的欄位會不顯示
    otherAccounts: [
      {
        username: "shotaroo0",           // 登入用的帳號，也是頁面上方顯示的帳號名稱
        password: "0000",
        avatar: "images/1_avatar.jpg",
        hasStory: false,
        name: "Shotaro(쇼타로/ショウタロウ)",
        following: ["252525252_"],
        followersCount: "145k",          // 手動數字（蓋過自動計算）
        followingCount: "651",
        // 粉絲／追蹤中名單：寫帳號 id 的會用那個帳號的資料、可以點進去；
        // { username, name, avatar } 是路人（點不進去；沒寫 avatar 就是灰色預設頭貼）。名單只顯示一頁、不能滑動
        followersList: [
          "fauiogl94",
          "252525252_",
          { username: "seokkkk", name: "송은석", avatar: "images/eunseok.jpg" },
          { username: "sungchan913", name: "🦌", avatar: "images/sungchan.jpg" },
          { username: "bin032", name: "원빈", avatar: "images/wonbin.jpg" },
          { username: "antonnie", name: "Anton", avatar: "images/anton.jpg" }
        ],
        followingList: [
          "252525252_",
          { username: "seokkkk", name: "송은석", avatar: "images/eunseok.jpg" },
          { username: "sungchan913", name: "🦌", avatar: "images/sungchan.jpg" },
          { username: "bin032", name: "원빈", avatar: "images/wonbin.jpg" },
          { username: "antonnie", name: "Anton", avatar: "images/anton.jpg" }
        ],
        // 摯友名單：寫在這裡的帳號才看得到 closeFriends: true 的限時動態
        closeFriendsList: ["seokkkk", "sungchan913", "bin032", "252525252_", "antonnie"],
        // 已儲存：預先放好的已儲存貼文（"帳號/圖片檔名"，寫那則貼文第一張圖的檔名）
        saved: ["252525252_/2_post_20240822.jpg"],
        // 典藏：stories = 過期的限時動態；posts = 下架的貼文（格式和 posts 一樣）
        archive: {
          // 典藏的限時動態（照日期）；closeFriends: true = 摯友限時（綠色標籤）
          stories: [
            { image: "images/1_story2_20250318.jpg", time: "2025年3月18日", closeFriends: true },
            { image: "images/1_story2_20250319.jpg", time: "2025年3月19日", closeFriends: true },
            // 論壇 452_.rq 貼出來的那則「秒刪」限動（叫あにき的那支影片）
            { image: "images/forum_1_c3.mp4", time: "2025年5月24日" },
            { image: "images/1_story2_20251121.jpg", time: "2025年11月21日", closeFriends: true },
            { image: "images/1_story2_20260102.jpg", time: "1月2日", closeFriends: true },   // 和소희聊天室 1/2 的照片同一張
            { image: "images/1_story2_20260128.jpg", time: "1月28日", closeFriends: true },
            { image: "images/1_story2_260426.jpg", time: "4月26日", closeFriends: true },
            { image: "images/1_story2_20260519.jpg", time: "5月19日", closeFriends: true },
            { image: "images/1_story2_20260830.mp4", time: "8月30日", closeFriends: true },
            { image: "images/1_story2_20260926.jpg", time: "9月26日", closeFriends: true }
          ],
          posts: []
        },
        bio: ["🦦/🍦/🕺"],
        music: { title: "Ride", artist: "HYBS" },
        highlights: [
          { image: "images/1_story_20250709.jpg", label: "😚",
            // 依日期排序；story2 是摯友限時（closeFriends: true，只有摯友名單裡的人看得到）
            stories: [
              { image: "images/1_story_20240820.jpg", time: "2024年8月20日" },
              { image: "images/1_story_250520.jpg", time: "2025年5月20日",
                note: "不是今天～ㅎㅎ",        // 左下角 Shotaro 自己的留言
                likedBy: ["252525252_"] },    // 預設按讚的人（只有登入這個帳號看時愛心是紅的）
              { image: "images/1_story_20250526.jpg", time: "2025年5月26日" },
              { image: "images/1_story_20250709.jpg", time: "2025年7月9日" },
              { image: "images/1_story_20251030.jpg", time: "2025年10月30日" },
              { image: "images/1_story_20251122.jpg", time: "2025年11月22日" },
              { image: "images/1_story_20251125.jpg", time: "2025年11月25日" },
              { image: "images/1_story_20260401.jpg", time: "4月1日" },
              { image: "images/1_story_20260410.jpg", time: "4月10日" },
              { image: "images/1_story2_20261007.jpg", time: "10月7日", closeFriends: true }
            ] }
        ],
        posts: [
      {
        images: ["images/1_post_20261003.jpg",],
        likedBy: { avatar: "images/2_avatar.jpg", name: "252525252_" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "working..🙂‍↕️",
        time: "10月3日"
      },
      {
        images: ["images/1_post_260601.jpg", "images/1_post_260601-2.jpg", "images/1_post_260601-3.jpg",],
        likedBy: { avatar: "images/sungchan.jpg", name: "sungchan913" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "送一朵花給你🌼",
        time: "6月1日"
      },
      {
        images: ["images/1_post_20260518.jpg", "images/1_post_20260518-2.jpg", "images/1_post_20260518-3.jpg"],
        likedBy: { avatar: "images/anton.jpg", name: "antonnie" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "每個造型都很喜歡ㅎㅎ~",
        time: "5月18日"
      },
      {
        images: ["images/1_post_20260102.jpg", "images/1_post_20260102-2.jpg", "images/1_post_20260102-3.jpg",],
        likedBy: { avatar: "images/2_avatar.jpg", name: "252525252_" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "Happy New Year🎇",
        time: "1月2日"
      },
      {
        images: ["images/1_post_20251217.jpg", "images/1_post_20251217-2.jpg",],
        likedBy: { avatar: "images/sungchan.jpg", name: "sungchan913" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "",
        time: "2025年12月17日"
      },
      {
        images: ["images/1_post_20251120.jpg", "images/1_post_20251120-2.jpg"],
        likedBy: { avatar: "images/eunseok.jpg", name: "seokkkk" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "",
        time: "2025年11月20日"
      },
      {
        images: ["images/1_post_20250318.jpg"],
        likedBy: { avatar: "images/eunseok.jpg", name: "seokkkk" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "",
        time: "2025年3月18日"
      },
      {
        images: ["images/1_post_20250310.jpg", "images/1_post_20250310-2.jpg", "images/1_post_20250310-3.jpg", "images/1_post_20250310-4.jpg"],
        likedBy: { avatar: "images/2_avatar.jpg", name: "252525252_" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "😎😎",
        time: "2025年3月10日"
      },
      {
        images: ["images/1_post_20240822.jpg", "images/1_post_20240822-2.jpg"],
        likedBy: { avatar: "images/sungchan.jpg", name: "sungchan913" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "📷:お母さん♥︎♥︎",
        time: "2024年8月22日"
      },
      {
        images: ["images/1_post_20240607.jpg", "images/1_post_20240607-2.jpg"],
        likedBy: { avatar: "images/eunseok.jpg", name: "seokkkk" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "In Koreaㅋㅋ",
        time: "2024年6月7日"
      },
      {
        images: ["images/1_post_20240427.jpg", "images/1_post_20240427-2.jpg"],
        likedBy: { avatar: "images/2_avatar.jpg", name: "252525252_" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "",
        time: "2024年4月27日"
      }
        ]
      },
      {
        username: "252525252_",           // 登入用的帳號，也是頁面上方顯示的帳號名稱
        password: "031121",
        private: false,                // 公開帳號：沒追蹤也看得到貼文
        avatar: "images/2_avatar.jpg",
        hasStory: false,
        name: "이소희",
        following: ["shotaroo0"],
        followersCount: "1121",          // 手動數字（蓋過自動計算）
        followingCount: "137",
        // 粉絲／追蹤中名單（小帳沒有追蹤她）；帳號 id 可以點進去，{ username, name, avatar } 是路人點不進去
        followersList: [
          "shotaroo0",
          { username: "seokkkk", name: "송은석", avatar: "images/eunseok.jpg" },
          { username: "sungchan913", name: "🦌", avatar: "images/sungchan.jpg" },
          { username: "bin032", name: "원빈", avatar: "images/wonbin.jpg" },
          { username: "antonnie", name: "Anton", avatar: "images/anton.jpg" }
        ],
        followingList: [
          "shotaroo0",
          { username: "seokkkk", name: "송은석", avatar: "images/eunseok.jpg" },
          { username: "sungchan913", name: "🦌", avatar: "images/sungchan.jpg" },
          { username: "bin032", name: "원빈", avatar: "images/wonbin.jpg" },
          { username: "antonnie", name: "Anton", avatar: "images/anton.jpg" }
        ],
        bio: ["Jimmy Lee", "@brunomars"],
        // 簡介裡 @帳號 點了要開的外部網址（沒寫的話：遊戲裡有的帳號會進去它的頁面，其他顯示「尚未更新」）
        bioLinks: { "@brunomars": "https://www.instagram.com/brunomars/" },
        music: { title: "Kagerou", artist: "ONE OK ROCK" },
        highlights: [
          { image: "images/2_story_20260709.jpg", label: "go",
            // 依日期排序；.mp4 影片會自動播放，播完才換下一則
            stories: [
              { image: "images/2_story_20250301.jpg", time: "2025年3月1日" },
              { image: "images/2_story_20250318.jpg", time: "2025年3月18日" },
              { image: "images/2_story_20250526.jpg", time: "2025年5月26日" },
              { image: "images/2_story_20250526-2.jpg", time: "2025年5月26日" },
              { image: "images/2_story2_20250526-3.jpg", time: "2025年5月26日", closeFriends: true },
              { image: "images/2_story_20250715.jpg", time: "2025年7月15日" },
              { image: "images/2_story_20250722.jpg", time: "2025年7月22日" },
              { image: "images/2_story_20251125.jpg", time: "2025年11月25日" },
              { image: "images/2_story_20260117.jpg", time: "1月17日" },
              { image: "images/2_story_20260209.jpg", time: "2月9日" },
              { image: "images/2_story_20260305.jpg", time: "3月5日" },
              { image: "images/2_story_20260312.jpg", time: "3月12日" },
              { image: "images/2_story_20260312-2.jpg", time: "3月12日" },
              { image: "images/2_story2_20260410.jpg", time: "4月10日", closeFriends: true },
              { image: "images/2_story_20260410.jpg", time: "4月10日" },
              { image: "images/2_story2_20260427.jpg", time: "4月27日", closeFriends: true },
              { image: "images/2_story_20260427.jpg", time: "4月27日" },
              { image: "images/2_story_20260606.mp4", time: "6月6日" },
              { image: "images/2_story_20260709.jpg", time: "7月9日" },
              { image: "images/2_story_20260830.jpg", time: "8月30日" }
            ] }
        ],
        // 摯友名單：寫在這裡的帳號才看得到 closeFriends: true（story2）的限時動態
        closeFriendsList: ["shotaroo0", "seokkkk", "sungchan913", "bin032", "antonnie"],
        // 已儲存：預先放好的已儲存貼文（"帳號/圖片檔名"）
        saved: ["shotaroo0/1_post_20250318.jpg"],
        // 典藏（登入這個帳號後：設定 → 典藏）
        archive: {
          stories: [
            { image: "images/2_savedstory_20251124.jpg", time: "2025年11月24日" },
            { image: "images/2_savedstory_20260305.jpg", time: "3月5日" },
            { image: "images/2_story2_20260604.jpg", time: "6月4日", closeFriends: true }   // 摯友限動，沒放精選
          ],
          posts: [
      {
              images: ["images/2_savedpost_20260924.jpg"],
              likedBy: { avatar: "images/anton.jpg", name: "antonnie" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
              caption: "test283",
              time: "9月24日"
            },
            {
              images: ["images/2_saved_20251204.jpg", "images/2_saved_20251204-2.jpg"],
              likedBy: { avatar: "images/anton.jpg", name: "antonnie" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
              caption: "test289",
              time: "2025年12月4日"
            }
          ]
        },
        posts: [
      {
        images: ["images/2_post_20260222.jpg", "images/2_post_20260222-2.jpg"],
        likedBy: { avatar: "images/anton.jpg", name: "antonnie" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "",
        time: "2月22日"
      },
      {
        images: ["images/2_post_20260103.jpg", "images/2_post_20260103-2.jpg", "images/2_post_20260103-3.jpg"],
        likedBy: { avatar: "images/1_avatar.jpg", name: "shotaroo0" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "假扮學生~~",
        time: "1月3日"
      },
      {
        images: ["images/2_post_20251121.jpg"],
        likedBy: { avatar: "images/anton.jpg", name: "antonnie" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "thank u all",
        time: "2025年11月21日"
      },
      {
        images: ["images/2_post_20250520.jpg"],
        likedBy: { avatar: "images/1_avatar.jpg", name: "shotaroo0" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "ナルト",
        time: "2025年5月20日"
      },
      {
        images: ["images/2_post_20250318.jpg"],
        likedBy: { avatar: "images/1_avatar.jpg", name: "shotaroo0" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "",
        time: "2025年3月18日"
      },
      {
        images: ["images/2_post_20240822.jpg", "images/2_post_20240822-2.jpg"],
        likedBy: { avatar: "images/anton.jpg", name: "antonnie" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "",
        time: "2024年8月22日"
      }
        ]
      }
    ]
  },

  /* ---------- 電話（最近通話） ---------- */
  phone: {                     // 電話：只有數字鍵盤
    // 數字鍵盤可以撥出的號碼（之後再補）：撥這些號碼時，撥號畫面會顯示 name
    // 例：{ number: "0912345678", name: "某某某" }；不在清單裡的號碼一樣能撥，但只會顯示號碼、無人接聽
    dialable: [
      {
        number: "046-882-3916",          // 秘境咖啡廳（神奈川縣三浦市的市話，論壇第 2 篇有寫）；玩家輸入 0468823916 就能撥
        // 沒寫 name → 撥號畫面和通話記錄只顯示號碼（不在聯絡人裡）
        // 接通後的對話：nodes 裡每一段有 lines（逐句字幕）和 choices（選項）
        //   lines：who = "them" 對方 / "me" 玩家；text = 字幕；sub = 字幕下面的小字（例如日文的中文翻譯）
        //   choices：label = 按鈕文字；next = 接到哪一段；hangup: true = 直接掛斷；say: false = 選了不會顯示成玩家說的話
        //   沒有 choices 的段落講完就自動掛斷
        script: {
          start: "greet",
          nodes: {
            greet: {
              lines: [
                { who: "them", text: "お電話ありがとうございます！茶房こもれびでございます～", sub: "您好～這裡是茶房こもれび！" }
              ],
              choices: [
                { label: "不⋯不好意思我打錯了><", say: "す、すみません、間違えました><", sub: "不⋯不好意思我打錯了><", next: "wrong" },
                { label: "（直接掛斷）", hangup: true },
                { label: "我是看到其他人推薦所以打來的！", next: "recommend" }
              ]
            },
            wrong: {
              lines: [
                { who: "them", text: "（待寫）" }
              ]
            },
            recommend: {
              lines: [
                { who: "them", text: "哇謝謝你——或許是看了Shotaro桑的影片嗎？" },
                { who: "me", text: "哈哈其實不是啦⋯⋯看到有人在論壇上討論所以⋯⋯" },
                { who: "them", text: "哎呀真是不好意思！但實在太多人因為Shotaro桑而前來本店，我們真的特別感謝他。" }
              ],
              choices: [
                { label: "想知道更多細節", say: false, next: "detail" }
              ]
            },
            detail: {
              lines: [
                { who: "them", text: "嗯⋯⋯記得是在去年的3月，Shotaro桑和一名同行友人一起過來的。" },
                { who: "them", text: "因為對方不是日本人，所以Shotaro和他是用韓文對話，特別讓人印象深刻。" },
                { who: "them", text: "還有，Shotaro真的特別討動物喜歡，我們店有一隻叫Ren的店狗，他一直黏著他呢(笑)" },
                { who: "them", text: "嗯......總覺得討小動物喜歡的人都是特別善良的人......" },
                { who: "them", text: "還有什麼好奇的嗎？" }
              ],
              choices: [
                { label: "沒有了", next: "bye" }
              ]
            },
            bye: {
              lines: [
                { who: "them", text: "那就期待您未來的光臨囉。ありがとうございました~" }
              ]
            }
          }
        }
      }
    ],
    endedText: "通話結束",
    callingText: "正在撥號⋯",
    noAnswerText: "無人接聽",
    callButtons: ["靜音", "鍵盤", "擴音", "加入通話", "FaceTime", "聯絡人"],
    endLabel: "結束"
  },

  /* ---------- KakaoTalk ---------- */
  kakao: {
    // 나와의 채팅（Shotaro 自己傳給自己的聊天室）：都寫 from: "me"，沒有未讀、不會有人回；也可以放照片 image
    me: {
      name: "Shotaro",
      avatar: "images/1_avatar.jpg",
      messages: [
        { date: "2021年8月31日 星期二" },   // 出發去韓國留學前，把問 AI 的回答存起來
        { from: "me", text: "赴韓留學必備韓語用語整理\n\n一、基本問候\n1. 안녕하세요（您好）\n2. 감사합니다（謝謝）\n3. 죄송합니다（對不起）\n4. 처음 뵙겠습니다. 저는 일본에서 온 유학생입니다.（初次見面，我是從日本來的留學生。）\n\n二、學校生活\n1. 교수님, 질문이 있습니다.（教授，我有問題。）\n2. 다시 한번 말씀해 주시겠어요?（可以請您再說一次嗎？）\n3. 과제 마감이 언제예요?（作業的截止日是什麼時候？）\n\n三、日常生活\n1. 이거 얼마예요?（這個多少錢？）\n2. 카드 돼요?（可以刷卡嗎？）\n3. 화장실이 어디예요?（洗手間在哪裡？）\n4. 교통카드 충전해 주세요.（請幫我儲值交通卡。）\n\n四、行政手續\n1. 외국인등록증을 신청하러 왔습니다.（我來申請外國人登錄證。）\n2. 통장을 만들고 싶어요.（我想開立銀行帳戶。）\n\n五、緊急情況\n1. 도와주세요.（請幫幫我。）\n2. 병원에 가야 해요.（我需要去醫院。）\n\n建議您在出發前熟記上述用語，並搭配實際情境反覆練習。抵達韓國後，積極與當地人交流，將有助於您更快適應留學生活。", time: "下午 11:33" },
        { date: "2022年1月3日 星期一" },   // 寒假回日本前的行李清單
        { from: "me", text: "護照\n外國人登錄證\n機票（電子票證截圖）\n錢包（日幣、韓幣）\n手機、充電器\n行動電源\n筆電、充電線\n耳機\n羽絨外套\n圍巾、手套\n換洗衣物三天份\n盥洗用品\n隱形眼鏡、眼鏡\n常備藥\n給家人的伴手禮（海苔、柚子茶）\n給媽媽的面膜\n宿舍鑰匙交給室友\n關掉宿舍的暖氣", time: "下午 7:20" },
        { date: "2025年11月29日 星期六" },
        { from: "me", text: "test671", time: "test672" },
        { date: "2026年4月8日 星期三" },
        { from: "me", text: "test673", time: "test674" },
        { date: "2026年6月14日 星期日" },
        { from: "me", text: "test675", time: "test676" },
        { date: "2026年7月11日 星期六" },
        { from: "me", text: "test677", time: "test678" }
      ]
    },
    passcode: "0318",              // 進入 KakaoTalk 要輸入的密碼（打完電話才會知道）；留空 "" = 不用密碼
    friends: [
      {
        id: "f1",                       // 不要重複（用於網址）
        name: "소희",                     // 252525252_
        status: "test166",                  // 狀態訊息
        avatar: "images/2_avatar.jpg",
        unread: 1,       // 一開始在聊天列表顯示的未讀數
        messages: [
          // 照片訊息：image 換成圖片路徑（不用寫 text）；me = 手機使用者，them = 對方
          // 通話紀錄：{ from: "me", call: "video"（視訊）或 "voice"（語音）, duration: "通話長度" }
          { date: "2025年3月21日 星期五" },   // 李炤熙回韓國，相遇後第一則（3/18～3/20 在日本認識、一起去秘境探店）
          { from: "me", text: "有平安回到家嗎☺️", time: "上午 1:28" },
          { from: "them", text: "はい 謝謝這幾天的照顧", time: "上午 1:44" },
          { from: "me", text: "以後保持聯繫吧 不准無視我ㅎㅎ", time: "上午 1:47" },
          { from: "them", text: "ㄷㄷ", time: "上午 1:48" },
          { from: "them", text: "晚安~", time: "上午 1:49" },
          { date: "2025年4月19日 星期六" },   // 曖昧初期的閒聊
          { from: "them", text: "好無聊 在幹嘛", time: "下午 8:34" },
          { from: "me", image: "images/1_msg_20250419.jpg", time: "下午 8:48" },
          { from: "me", text: "剛吃飽飯食困中~~ 😴", time: "下午 8:48" },
          { from: "them", expired: true, time: "下午 8:50" },   // 已過期的照片
          { from: "them", text: "正在吃辣炒年糕", time: "下午 8:51" },
          { from: "me", text: "好懷念..🥺", time: "下午 8:56" },
          { from: "them", text: "什麼時候要來韓國玩？", time: "下午 9:03" },
          { from: "me", text: "要去的話會跟你說的，別擔心~", time: "下午 9:04" },
          { date: "2025年5月13日 星期二" },
          { from: "me", text: "sohee呀 如果說到日本 你第一個會想到什麼？", time: "下午 2:02" },
          { from: "them", text: "Naruto.", time: "下午 5:26" },
          { from: "me", text: "🙂‍↕️", time: "下午 5:58" },
          { date: "2025年5月19日 星期一" },   // 將太郎到韓國
          { from: "me", text: "猜猜我在哪~", time: "上午 11:38" },
          { from: "them", text: "你來韓國了？", time: "下午 12:05" },
          { from: "me", text: "沒錯 要見面嗎ㅋㅋ", time: "下午 12:08" },
          { from: "them", text: "要。", time: "下午 12:08" },
          { date: "2025年5月27日 星期二" },   // 將太郎回日本
          { from: "them", text: "到了嗎？", time: "上午 3:39" },
          { from: "me", text: "到啦~要去洗澡了 早點睡吧", time: "上午 3:47" },
          { from: "me", text: "太晚睡小心長不高ㅋㅋㅋ", time: "上午 3:48" },
          { from: "them", text: "...", time: "上午 3:49" },
          { from: "them", image: "images/2_msg_20250527.jpg", time: "上午 3:49" },
          { from: "them", text: "看來你還不懂。", time: "上午 3:50" },
          { date: "2025年5月28日 星期三" },
          { from: "them", call: "video", duration: "1:03:47", time: "下午 11:35" },
          { date: "2025年5月29日 星期四" },
          { from: "me", text: "晚安😴😴", time: "上午 12:40" },
          { date: "2025年6月3日 星期二" },
          { from: "me", image: "images/1_msg_20250603.jpg", time: "上午 7:17" },
          { from: "me", text: "今天行程好早ㅎㅎ", time: "上午 7:19" },
          { from: "me", text: "感覺臉還很腫", time: "上午 7:21" },
          { from: "them", text: "腫在哪？", time: "上午 7:46" },
          { from: "them", image: "images/2_msg_20250603.jpg", time: "上午 7:49" },
          { from: "them", text: "今天有早八課", time: "上午 7:50" },
          { from: "them", text: "準備面對小孩..", time: "上午 7:51" },
          { from: "me", text: "你也還是小孩呀~~ 🫳", time: "上午 8:22" },
          { date: "2025年6月17日 星期二" },
          { from: "them", image: "images/2_msg_20250617.jpg", time: "下午 6:03" },
          { from: "them", text: "如果我去打耳洞", time: "下午 6:04" },
          { from: "them", text: "怎麼樣？", time: "下午 6:05" },
          { from: "me", text: "問過爸媽沒？", time: "下午 6:11" },
          { from: "me", text: "ㅋㅋㅋ", time: "下午 6:12" },
          { from: "me", text: "開玩笑的~我覺得會很帥氣😳", time: "下午 6:18" },
          { from: "them", text: "ㅎㅎ", time: "下午 6:22" },
          { from: "them", text: "其實只要跟我說第二句就好。", time: "下午 6:25" },
          { date: "2025年6月22日 星期日" },
          { from: "them", image: "images/2_msg_20250622.jpg", time: "上午 10:53" },
          { from: "them", text: "被理髮師陷害了。", time: "上午 10:54" },
          { from: "me", text: "我懂你。", time: "上午 10:55" },
          { date: "2025年7月9日 星期三" },
          { from: "me", image: "images/1_msg_20250709.jpg", time: "下午 9:48" },
          { from: "me", text: "終於能吃飯ㅜㅜ", time: "下午 9:50" },
          { from: "them", text: "真是辛苦", time: "下午 9:57" },
          { from: "them", text: "一起吃吧。", time: "下午 9:58" },
          { from: "them", call: "video", duration: "2:45:12", time: "下午 9:59" },
          { date: "2025年7月15日 星期二" },
          { from: "them", text: "在嗎", time: "下午 11:19" },
          { from: "me", text: "응", time: "下午 11:19" },
          { from: "them", call: "video", duration: "5:24:36", time: "下午 11:20" },
          { date: "2025年7月22日 星期二" },
          { from: "me", image: "images/1_msg_20250722.jpg", time: "下午 1:07" },
          { from: "me", text: "健身結束🥳", time: "下午 1:07" },
          { from: "them", call: "video", duration: "0:03:38", time: "下午 1:08" },
          { from: "them", call: "video", duration: "1:43:52", time: "下午 6:02" },
          { date: "2025年8月4日 星期一" },
          { from: "them", image: "images/2_msg_20250804.jpg", time: "上午 10:39" },
          { from: "them", text: "如何", time: "上午 10:43" },
          { from: "me", text: "很帥氣呢~？ㅎㅎ", time: "上午 11:07" },
          { date: "2025年8月9日 星期六" },
          { from: "them", image: "images/2_msg_20250809.jpg", time: "上午 11:48" },
          { from: "them", text: "gmn~~", time: "上午 11:50" },
          { from: "me", text: "☺️☺️", time: "下午 2:27" },
          { from: "me", image: "images/1_msg_20250809.jpg", time: "下午 2:28" },
          { date: "2025年8月21日 星期四" },
          { from: "them", image: "images/2_msg_20250821.jpg", time: "下午 9:09" },
          { from: "them", text: "在練舞室", time: "下午 9:09" },
          { from: "me", text: "？！！原來你會跳舞嗎", time: "下午 9:11" },
          { from: "them", expired: "video", time: "下午 10:19" },
          { from: "them", text: "下次一起跳吧", time: "下午 10:23" },
          { date: "2025年8月29日 星期五" },
          { from: "them", image: "images/2_msg_20250829.jpg", time: "上午 9:28" },
          { from: "them", text: "老師居然也要拍形象照", time: "上午 9:29" },
          { from: "them", text: "等等吃什麼呢", time: "上午 9:31" },
          { from: "me", text: "😳", time: "下午 12:04" },
          { from: "me", expired: true, time: "下午 12:07" },
          { from: "me", text: "我吃這個~😋", time: "下午 12:09" },
          { from: "me", text: "造型很適合你。", time: "下午 12:19" },
          { date: "2025年9月10日 星期三" },
          { from: "me", image: "images/1_msg_20250910.jpg", time: "上午 7:24" },
          { from: "me", text: "今天早上又有行程ㅎㅎ", time: "上午 7:26" },
          { from: "them", text: "good morning", time: "上午 7:48" },
          { from: "them", text: "파이팅", time: "上午 7:49" },
          { date: "2025年9月17日 星期三" },
          { from: "them", image: "images/2_msg_20250917.jpg", time: "下午 11:33" },
          { from: "them", text: "想看到你的臉", time: "下午 11:34" },
          { from: "me", call: "video", duration: "0:24:58", time: "下午 11:36" },
          { date: "2025年9月18日 星期四" },
          { from: "me", text: "其實可以說想我", time: "上午 12:04" },
          { from: "me", text: "ㅋㅋ", time: "上午 12:05" },
          { date: "2025年10月12日 星期日" },
          { from: "me", text: "戴眼鏡很帥氣呢？ㅋㅋ", time: "下午 8:24" },
          { from: "them", text: "你看了動態啊", time: "下午 10:09" },
          { from: "them", text: "我會常戴的", time: "下午 10:10" },
          { date: "2025年11月5日 星期三" },
          { from: "them", text: "眼睛完全睜不開", time: "上午 7:39" },
          { from: "me", call: "video", duration: "0:07:35", time: "上午 7:48" },
          { from: "me", text: "別遲到啦~", time: "上午 7:57" },
          { date: "2025年11月18日 星期二" },
          { from: "them", text: "因為工作", time: "下午 5:30" },
          { from: "them", text: "我後天要去日本", time: "下午 5:30" },
          { from: "me", text: "在哪裡？", time: "下午 5:31" },
          { from: "them", call: "video", duration: "2:38:47", time: "下午 5:32" },
          { from: "them", text: "期待嗎？", time: "下午 9:09" },
          { from: "me", text: "...", time: "下午 9:11" },
          { from: "me", text: "你呢？", time: "下午 9:14" },
          { date: "2025年11月27日 星期四" },   // 11/26 交往後的第一則
          { from: "them", text: "請多指教~", time: "上午 1:34" },
          { from: "me", text: "嗯~請多指教☺️", time: "上午 1:35" },
          { date: "2025年11月28日 星期五" },   // 遠距離開始：幾乎每晚視訊
          { from: "them", text: "到家了。", time: "下午 8:41" },
          { from: "me", text: "辛苦了~今天也很累吧", time: "下午 8:52" },
          { from: "me", text: "要視訊嗎？", time: "下午 8:53" },
          { from: "me", call: "video", duration: "1:52:16", time: "下午 8:53" },
          { date: "2025年11月29日 星期六" },
          { from: "them", expired: true, time: "下午 7:36" },
          { from: "them", text: "學生送的。", time: "下午 7:37" },
          { from: "me", text: "好可愛ㅋㅋ 跟你很像", time: "下午 7:45" },
          { from: "them", text: "?", time: "下午 7:46" },
          { from: "them", call: "video", duration: "3:08:41", time: "下午 7:47" },
          { date: "2025年12月3日 星期三" },
          { from: "me", text: "今天行程好晚才結束ㅜㅜ", time: "下午 10:14" },
          { from: "me", text: "還醒著嗎", time: "下午 10:15" },
          { from: "them", text: "剛洗完澡", time: "下午 10:31" },
          { from: "them", call: "video", duration: "0:47:09", time: "下午 10:32" },
          { date: "2025年12月7日 星期日" },
          { from: "me", expired: true, time: "下午 7:22" },
          { from: "me", text: "下雪了❄️", time: "下午 7:22" },
          { from: "them", text: "首爾還沒", time: "下午 7:40" },
          { from: "them", text: "好羨慕", time: "下午 7:41" },
          { from: "me", call: "video", duration: "4:12:55", time: "下午 7:43" },
          { date: "2025年12月14日 星期日" },
          { from: "them", text: "在幹嘛", time: "下午 9:05" },
          { from: "me", text: "在想你ㅎㅎ", time: "下午 9:06" },
          { from: "them", text: "...", time: "下午 9:06" },
          { from: "them", call: "video", duration: "2:26:30", time: "下午 9:07" },
          { date: "2025年12月27日 星期六" },
          { from: "them", text: "日本現在很冷嗎？", time: "下午 10:07" },
          { from: "me", text: "蠻冷的🥶這幾天都在下雪", time: "下午 10:08" },
          { from: "them", text: "想好要吃什麼了", time: "下午 10:10" },
          { from: "me", text: "☺️", time: "下午 10:11" },
          { date: "2026年1月2日 星期五" },   // 跨年後回韓國（同一張照片也在 Shotaro 典藏的摯友限動）
          { from: "me", image: "images/1_msg_20260102.jpg", time: "下午 11:07" },
          { from: "me", text: "這張怎麼樣ㅋㅋ", time: "下午 11:07" },
          { from: "them", text: "可愛~", time: "下午 11:09" },
          { date: "2026年1月4日 星期日" },
          { from: "them", text: "回來第二天就好想日本。", time: "下午 8:18" },
          { from: "me", text: "想日本還是想我？ㅋㅋ", time: "下午 8:24" },
          { from: "them", text: "都想。", time: "下午 8:25" },
          { from: "them", call: "video", duration: "1:15:48", time: "下午 8:25" },
          { date: "2026年1月9日 星期五" },
          { from: "them", expired: true, time: "下午 10:47" },
          { from: "them", text: "改作業改到現在", time: "下午 10:47" },
          { from: "me", text: "老師辛苦了~🫡", time: "下午 10:49" },
          { from: "me", call: "video", duration: "0:38:20", time: "下午 10:50" },
          { date: "2026年1月18日 星期日" },
          { from: "me", text: "今天有空嗎", time: "下午 7:58" },
          { from: "them", text: "有。", time: "下午 8:03" },
          { from: "them", call: "video", duration: "3:31:07", time: "下午 8:03" },
          { date: "2026年2月8日 星期日" },   // 遠距離：思考遠距離、生活和愛情的取捨
          { from: "me", call: "video", duration: "4:24:47", time: "下午 10:35" },
          { date: "2026年2月9日 星期一" },
          { from: "them", text: "我需要一點時間思考", time: "上午 4:12" },
          { from: "me", text: "我也是", time: "上午 4:19" },
          { date: "2026年2月22日 星期日" },   // 決定搬來韓國
          { from: "me", text: "在幹嘛~", time: "下午 6:24" },
          { from: "them", image: "images/2_msg_20260222.jpg", time: "下午 7:12" },
          { from: "them", call: "video", duration: "0:02:32", time: "下午 7:13" },
          { from: "them", image: "images/2_msg_20260222-2.jpg", time: "下午 7:15" },
          { from: "them", text: "晚安~", time: "下午 7:16" },
          { from: "me", text: "ㅋㅋ現在才幾點呢", time: "下午 7:17" },
          { date: "2026年3月4日 星期三" },
          { from: "me", text: "在嗎", time: "上午 11:03" },
          { from: "them", call: "video", duration: "1:00:32", time: "下午 12:02" },
          { from: "me", text: "真期待~", time: "下午 1:04" },
          { from: "them", text: "謝謝你。", time: "下午 1:05" },
          { from: "me", text: "我也謝謝你😊", time: "下午 1:06" },
          { date: "2026年3月24日 星期二" },
          { from: "them", text: "摸魚中", time: "下午 2:03" },
          { from: "them", image: "images/2_msg_20260324.jpg", time: "下午 2:05" },
          { from: "me", text: "錯過了你的摸魚ㅋㅋ", time: "下午 7:23" },
          { from: "me", call: "video", duration: "0:16:57", time: "下午 7:24" },
          { from: "me", text: "等等見~", time: "下午 7:45" },
          { date: "2026年6月26日 星期五" },
          { from: "them", image: "images/2_msg_20260626.jpg", time: "上午 7:37" },
          { from: "me", text: "ㅋㅋㅋㅋㅋㅋㅋ可愛", time: "上午 9:24" },
          { date: "2026年7月6日 星期一" },
          { from: "them", image: "images/2_msg_20260706.jpg", time: "下午 11:36" },
          { from: "me", recalled: true, time: "下午 11:38" },
          { from: "them", text: "等我。", time: "下午 11:39" },
          { from: "me", text: "😳", time: "下午 11:40" },
          { date: "2026年7月13日 星期一" },
          { from: "me", image: "images/1_msg_20260713.jpg", time: "下午 6:38" },
          { from: "me", text: "這個很好喝😋", time: "下午 6:38" },
          { from: "them", text: "等等去嗎", time: "下午 6:41" },
          { from: "me", text: "엉~", time: "下午 6:42" },
          { date: "2026年10月22日 星期四" },   // 論壇發文後（昨天）；소희傳的，未讀 1
          { from: "them", text: "要公開嗎？", time: "下午 11:30" }
        ],
        // 關鍵字自動回覆：玩家傳的訊息「包含」任一個 keywords 就回 reply（可多句，依序送出）
        replies: [
          { keywords: ["test174"], reply: ["test175", "test176"] }
        ],
        defaultReply: []                  // 沒有符合任何關鍵字時的回覆；空的 = 不回
      },
      {
        id: "f2",                       // 不要重複（用於網址）
        name: "원빈",                     // 來韓國後舞室認識的朋友
        status: "test178",                  // 狀態訊息
        avatar: "images/wonbin.jpg",
        unread: 0,       // 一開始在聊天列表顯示的未讀數
        messages: [
          { date: "2026年4月8日 星期三" },   // 認識時的寒暄（無關主線）
          { from: "me", text: "以後請多指教了😊", time: "下午 10:13" },
          { from: "me", text: "在韓國我還有很多不懂的呢ㅎㅎ再麻煩你和舞團的大家多多幫忙了🥺", time: "下午 10:14" },
          { from: "them", text: "但哥不需要別人幫忙也已經做得很好了。", time: "下午 10:18" },
          { from: "me", text: "謝謝元彬......🥺", time: "下午 10:20" },
          { date: "2026年5月19日 星期二" },   // 將太郎訴說吵架的事，원빈陪伴、給建議
          { from: "them", text: "剛剛沒有說到，但我覺得如果很困擾的話，直接跟他討論比較好吧？他會理解的。", time: "下午 10:56" },
          { from: "me", text: "知道了~謝謝你也這麼關心我的煩惱", time: "下午 11:01" },
          { from: "them", text: "🙄", time: "下午 11:02" },
          { date: "2026年7月11日 星期六" },   // 兩人在舞室明顯鬧僵，원빈忍不住傳訊息詢問、給建議
          { from: "them", text: "又怎麼了？", time: "下午 10:04" },
          { from: "them", text: "哥我說真的，如果你一直把他當小孩的話，換作是我也會生氣的。", time: "下午 10:47" },
          { date: "2026年9月27日 星期日" },   // 討論舞蹈、互相鼓勵（無關主線）
          { from: "me", text: "今天辛苦了~元彬真的跳很好呢，細節的掌握很準確，也很有自己的風格~", time: "下午 10:08" },
          { from: "them", text: "突然是怎麼了", time: "下午 10:11" },
          { from: "them", text: "哥也跳得很好，動作分解的很乾淨、漂亮。", time: "下午 10:18" },
          { from: "me", text: "🥺", time: "下午 10:19", read: true }
        ],
        // 關鍵字自動回覆：玩家傳的訊息「包含」任一個 keywords 就回 reply（可多句，依序送出）
        replies: [
          { keywords: ["test186"], reply: ["test187", "test188"] }
        ],
        defaultReply: []                  // 沒有符合任何關鍵字時的回覆；空的 = 不回
      },
      {
        id: "f3",                       // 不要重複（用於網址）
        name: "Anton",                   // 李炤熙的朋友
        status: "test190",                  // 狀態訊息
        avatar: "images/anton.jpg",
        unread: 0,       // 一開始在聊天列表顯示的未讀數
        messages: [
          { date: "2026年3月8日 星期日" },   // 認識時的寒暄（無關主線）
          { from: "me", text: "很開心認識你😊", time: "下午 4:24" },
          { from: "them", text: "me too. 以後李炤熙欺負我我就來跟哥告狀^^", time: "下午 4:26" },
          { from: "me", text: "我要跟他說你又不叫哥。", time: "下午 4:30" },
          { from: "them", text: "🧟", time: "下午 4:31" },
          { date: "2026年6月14日 星期日" },   // 燦榮透露了一些炤熙的故事
          { from: "them", text: "taro哥", time: "下午 3:02" },
          { from: "them", text: "fu28,;.4", time: "下午 3:17" },
          { from: "me", text: "？怎麼了", time: "下午 3:19" },
          { from: "them", image: "images/at_msg_20260614.jpg", time: "下午 3:20" },   // 小帳 6/14 限動的前兩張
          { from: "them", image: "images/at_msg_20260614-2.jpg", time: "下午 3:26" },
          { from: "them", recalled: true, time: "下午 3:27" },   // 收回了一張照片
          { from: "me", text: "ㅋㅋㅋㅋㅋㅋㅋㅋ儲存了", time: "下午 3:28" },
          { from: "them", text: "李燦榮你完蛋了。", time: "下午 3:29" },
          { date: "2026年10月12日 星期一" },   // 10/11 三人一起出去，燦榮半夜傳兩人的合照給將太郎
          { from: "them", image: "images/at_msg_20261012.jpg", time: "上午 2:58" },
          { from: "them", image: "images/at_msg_20261012-2.jpg", time: "上午 2:58" },
          { from: "me", text: "感謝😊但是不要再熬夜了", time: "上午 9:01", read: true }
        ],
        // 關鍵字自動回覆：玩家傳的訊息「包含」任一個 keywords 就回 reply（可多句，依序送出）
        replies: [
          { keywords: ["test198"], reply: ["test199", "test200"] }
        ],
        defaultReply: []                  // 沒有符合任何關鍵字時的回覆；空的 = 不回
      },
      {
        id: "f4",
        name: "성찬",                     // 留學時認識的朋友
        status: "",
        avatar: "images/sungchan.jpg",
        unread: 0,
        messages: [
          { date: "2021年10月16日 星期六" },   // 認識時的寒暄（無關主線）
          { from: "them", text: "很開心認識哥~", time: "下午 11:11" },
          { from: "me", text: "ㅎㅎ我也很開心認識你~以後經常一起吃飯吧！", time: "下午 11:49" },
          { date: "2025年11月26日 星期三" },   // 追問群組裡的細節
          { from: "them", text: "所以那個朋友到底是誰？", time: "下午 10:24" },
          { date: "2025年11月27日 星期四" },
          { from: "me", text: "什麼ㅎㅎ", time: "上午 1:37", read: true }
        ],
        replies: [],
        defaultReply: []
      },
      {
        id: "f5",
        name: "은석",                     // 留學時認識的朋友
        status: "",
        avatar: "images/eunseok.jpg",
        unread: 0,
        messages: [
          { date: "2021年9月4日 星期六" },   // 認識時的寒暄（無關主線）
          { from: "me", text: "今天一起吃飯聊得很開心~未來請多指教☺️", time: "下午 2:28" },
          { from: "them", text: "請多指教。", time: "下午 5:03" },
          { date: "2021年10月21日 星期四" },   // 無關主線
          { from: "me", text: "經濟學導論1-10章", time: "上午 11:30" },
          { from: "them", text: "OK感謝", time: "上午 11:32" },
          { date: "2026年4月13日 星期一" },   // 問群組的約要不要去（無關主線）
          { from: "them", text: "你去嗎？", time: "下午 7:45" },
          { from: "me", text: "等我確認好近期行程再說", time: "下午 8:11" },
          { from: "them", text: "👍", time: "下午 11:22" },
          { from: "me", text: "👍", time: "下午 11:23", read: true }   // read: true = 對方已讀，不顯示「1」
        ],
        replies: [],
        defaultReply: []
      }
    ],
    // 群組聊天室：members 寫好友 id；訊息的 from 寫好友 id（"f4"、"f5"）或 "me"
    // name 留空 = 自動用成員名字（和 KakaoTalk 一樣）；自己的訊息旁顯示還沒回話的人數
    // replies 的 reply 可以寫 { from: "f5", text: "..." } 指定誰回，只寫字串就是第一位成員回
    groups: [
      {
        id: "g1",
        name: "",
        members: ["f4", "f5"],          // 성찬、은석（留學時認識的朋友）
        unread: 2,
        messages: [
          { date: "2022年1月3日 星期一" },   // 將太郎留學結束回日本前一天，終於創了群組（無關主線）
          { from: "f4", text: "明天幾點的飛機？", time: "下午 10:07" },
          { from: "me", text: "早上九點二十ㅋㅋㅋ你們要來嗎", time: "下午 10:13" },
          { from: "f4", text: "必須得去吧！", time: "下午 10:14" },
          { from: "f5", text: "必須得起床啊......", time: "下午 10:16" },
          { from: "me", text: "謝謝你們🥺", time: "下午 10:17" },
          { from: "me", text: "我可以打電話叫你們起床😊", time: "下午 10:17" },
          { date: "2025年3月18日 星期二" },   // 將太郎分享遇到了有趣的韓國遊客
          // 之後在這裡放照片：{ from: "me", image: "images/檔名.jpg", time: "下午 3:06" },
          { from: "me", text: "遇到了有趣的韓國人~", time: "下午 3:06" },
          { from: "f4", text: "衣服很好看耶哪裡買的", time: "下午 4:59" },
          { from: "f5", text: "氣場非比尋常。", time: "下午 9:08" },
          { from: "me", text: "😊😊", time: "下午 9:11" },
          { date: "2025年8月9日 星期六" },   // 閒聊（無關主線）
          { from: "f4", text: "在嗎", time: "上午 10:23" },
          { from: "f5", text: "起床了", time: "下午 1:56" },
          { from: "f4", text: "沒事了", time: "下午 5:35" },
          { from: "me", text: "抱歉才看到訊息 怎麼了？", time: "下午 8:01" },
          { date: "2025年11月25日 星期二" },   // 祝將太郎生日快樂，將太郎當天沒回
          { from: "f5", text: "taro哥生日快樂", time: "下午 9:08" },
          { from: "f4", text: "有趕上ㅋㅋ生日快樂哥", time: "下午 11:47" },
          { from: "f4", text: "哥居然不在線上？", time: "下午 11:59" },
          { date: "2025年11月26日 星期三" },   // 將太郎回覆，透露跟某人一起過生日、已在一起的線索
          { from: "me", text: "謝謝你們~昨天跟別人待著沒機會看訊息ㅎㅎ", time: "下午 1:12" },
          { from: "f4", text: "你什麼時候有其他這麼好的朋友了？介紹一下", time: "下午 3:14" },
          { from: "me", text: "以後你們會見到的~是韓國人~", time: "下午 3:57" },
          { from: "f5", text: "事情越來越有趣了。", time: "下午 6:22" },
          { from: "f4", text: "到底是誰啊？", time: "下午 10:20" },
          { date: "2026年3月6日 星期五" },   // 將太郎分享昨天搬到韓國
          { from: "me", text: "等等一起吃飯嗎？好久沒一起吃了ㅋㅋ", time: "下午 5:04" },
          { from: "f5", text: "？？", time: "下午 5:06" },
          { from: "f4", text: "？？", time: "下午 5:19" },
          { from: "me", text: "ㅋㅋㅋ 吃之前很常去的那家吧，我已經到了~", time: "下午 5:26" },
          { date: "2026年4月13日 星期一" },   // 성찬約三人吃飯（無關主線）
          { from: "f4", text: "明晚吃飯嗎？老地方？", time: "下午 7:43" },
          { from: "f5", text: "OK", time: "下午 7:44" },
          { from: "me", text: "OK", time: "下午 11:19" },
          { from: "f4", text: "預約好了", time: "下午 11:30" },
          { date: "2026年10月22日 星期四" },   // 昨天：성찬傳論壇文章給將太郎、逼問是不是真的（未讀 2）
          { from: "f4", link: "#/forum/1", time: "下午 11:07" },   // 連結訊息：點了打開論壇第 1 篇
          { from: "f4", text: "這是真的嗎？", time: "下午 11:07" }
        ],
        replies: [],
        defaultReply: []
      }
    ],
    // 介面文字（繁體中文）
    text: {
      lockTitle: "輸入密碼",        // KakaoTalk 密碼畫面
      lockHint: "請輸入密碼。",       // 標題下的小字（可留空）
      lockDelete: "刪除",           // 刪除鍵的說明文字（畫面上顯示圖示）
      chatsTitle: "聊天",
      inputPlaceholder: "輸入訊息",
      ampm: ["上午", "下午"],
      photoLabel: "照片",           // 聊天列表裡最後一則是照片時顯示的字
      recalledText: "已收回訊息",    // 收回的訊息
      expiredText: "照片已過期",     // 過期的照片（expired: true）
      expiredVideoText: "影片已過期", // 過期的影片（expired: "video"）
      meTag: "我"                   // 自己的聊天室名字旁的小標
    }
  }
};
