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
第一家是藏在三浦半島小網代森林旁的「茶房 こもれび」。說真的去的路上我差點放棄⋯⋯從三崎口站轉公車之後，還要走一段沒有路燈的小坡道，Google地圖還一度把我帶進樹林裡繞圈ㅠㅠ但推開店門的瞬間一切都值得了！招牌是老闆每天現刷的抹茶，配上抹茶聖代苦甜剛剛好，連平常不太敢吃苦的我都整杯吃光光。店裡還有一隻叫「もなか」的柴犬店狗，會乖乖趴在門口迎接客人，摸摸頭還會瞇起眼睛，超級療癒🐶
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
        id: "3", title: "判斷一個人是不是在戀愛的妙招。",
        author: "yolo._520",          // 匿名帳號代碼
        content: "尚未更新",
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
    editProfileLabel: "編輯個人檔案",
    shareProfileLabel: "分享個人檔案",
    // 精選動態：image = 圓圈封面，stories = 點進去看到的內容
    highlights: [
      { image: "images/3_story_20250904.jpg", label: "🧡",
        stories: [
          { image: "images/3_story_20250904.jpg", time: "2025年9月4日" },
          { image: "images/3_story_20251130.jpg", time: "2025年11月30日" },
          { image: "images/3_story_20251207.jpg", time: "2025年12月7日" },
          { image: "images/3_story_20251207-2.jpg", time: "2025年12月7日" },
          { image: "images/3_story_20260127.jpg", time: "1月27日" },
          { image: "images/3_story_20260128.jpg", time: "1月28日" },
          { image: "images/3_story_20260129.jpg", time: "1月29日" },
          { image: "images/3_story_20260202.jpg", time: "2月2日" },
          { image: "images/3_story_20260206.jpg", time: "2月6日" },
          { image: "images/3_story_20260206-2.jpg", time: "2月6日" },
          { image: "images/3_story_20260218.jpg", time: "2月18日" },
          { image: "images/3_story_20260225.jpg", time: "2月25日" },
          { image: "images/3_story_20260301.jpg", time: "3月1日" },
          { image: "images/3_story_20260323.jpg", time: "3月23日" },
          { image: "images/3_story_20260604.jpg", time: "6月4日" },
          { image: "images/3_story_20260711.jpg", time: "7月11日" },
          { image: "images/3_story_20260712.jpg", time: "7月12日" },
          { image: "images/3_story_20260920.jpg", time: "9月20日" },
          { image: "images/3_story_20261010.jpg", time: "10月10日" },
          { image: "images/3_story_20261011.jpg", time: "10月11日" },
          { image: "images/3_story_20261021.jpg", time: "10月21日" },
          { image: "images/3_story_20261022.jpg", time: "10月22日" }
        ] }
    ],
    // 貼文：images 可放多張（左右滑動）；格子上顯示第一張
    // 小帳的貼文沒有人按讚（沒有 likes / likedBy）
    // 需要時可以加：comments: [{ user: "帳號", text: "留言", time: "1天" }]、tagged: ["被標註的帳號"]
    posts: [
      {
        images: ["images/3_post1.jpg"],
        caption: "test113",
        time: "test114"
      },
      {
        images: ["images/3_post2.jpg"],
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/3_post3.jpg", "images/3_post3-2.jpg"],
        caption: "test210",
        time: "test211"
      },
      {
        images: ["images/3_post_20260705.jpg", "images/3_post_20260705-2.jpg"],
        caption: "test317",
        time: "7月5日"
      },
      {
        images: ["images/3_post_20260604.jpg"],
        caption: "test314",
        time: "6月4日"
      },
      {
        images: ["images/3_post_20260427.jpg"],
        caption: "test311",
        time: "4月27日"
      },
      {
        images: ["images/3_post_20260406.jpg"],
        caption: "test308",
        time: "4月6日"
      },
      {
        images: ["images/3_post_20260120.jpg"],
        caption: "test292",
        time: "1月20日"
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
      recentTitle: "最近",              // 搜尋頁「搜尋紀錄」的標題
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
    searchPlaceholder: "搜尋",
    noResultText: "查無資訊",        // 搜尋不到帳號時顯示
    searchMode: "prefix",            // "exact" = 要打完整帳號才搜得到；"prefix" = 打開頭幾個字就會出現
    // 只能被搜尋到、不能登入的帳號（格式和 otherAccounts 一樣，不用寫 password）
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
        // 已儲存：預先放好的已儲存貼文（"帳號/貼文編號"，編號從 0 開始）
        saved: [],
        // 典藏：stories = 過期的限時動態；posts = 下架的貼文（格式和 posts 一樣）
        archive: { stories: [], posts: [] },
        bio: ["🦦/🍦/🕺"],
        music: { title: "Ride", artist: "HYBS" },
        highlights: [
          { image: "images/1_story_20250709.jpg", label: "😚",
            // 依日期排序；story2 是摯友限時（closeFriends: true，只有摯友名單裡的人看得到）
            stories: [
              { image: "images/1_story_20250709.jpg", time: "2025年7月9日" },
              { image: "images/1_story_20250904.jpg", time: "2025年9月4日" },
              { image: "images/1_story_20251030.jpg", time: "2025年10月30日" },
              { image: "images/1_story2_20251121.jpg", time: "2025年11月21日", closeFriends: true },
              { image: "images/1_story_20251206.jpg", time: "2025年12月6日" },
              { image: "images/1_story_20260123.jpg", time: "1月23日" },
              { image: "images/1_story2_20260128.jpg", time: "1月28日", closeFriends: true },
              { image: "images/1_story_20260202.jpg", time: "2月2日" },
              { image: "images/1_story_20260227.jpg", time: "2月27日" },
              { image: "images/1_story_20260401.jpg", time: "4月1日" },
              { image: "images/1_story2_260426.jpg", time: "4月26日", closeFriends: true },
              { image: "images/1_story2_20260524.mp4", time: "5月24日", closeFriends: true },
              { image: "images/1_story_20260602.jpg", time: "6月2日" },
              { image: "images/1_story_20261007.jpg", time: "10月7日" },
              { image: "images/1_story_20261012.jpg", time: "10月12日" }
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
        images: ["images/1_post_20260924.jpg"],
        likedBy: { avatar: "images/eunseok.jpg", name: "seokkkk" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "",
        time: "9月24日"
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
        images: ["images/1_post_20250310.jpg", "images/1_post_20250310-2.jpg", "images/1_post_20250310-3.jpg", "images/1_post_20250310-4.jpg"],
        likedBy: { avatar: "images/wonbin.jpg", name: "bin032" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
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
        likedBy: { avatar: "images/wonbin.jpg", name: "bin032" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
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
        private: true,                 // 非公開帳號
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
              { image: "images/2_story_20250722.jpg", time: "2025年7月22日" },
              { image: "images/2_story_20250904.jpg", time: "2025年9月4日" },
              { image: "images/2_story_20251121.jpg", time: "2025年11月21日" },
              { image: "images/2_story_20251207.jpg", time: "2025年12月7日" },
              { image: "images/2_story_20260117.jpg", time: "1月17日" },
              { image: "images/2_story_20260128.jpg", time: "1月28日" },
              { image: "images/2_story2_20260202.jpg", time: "2月2日", closeFriends: true },
              { image: "images/2_story_20260202.jpg", time: "2月2日" },
              { image: "images/2_story_20260209.jpg", time: "2月9日" },
              { image: "images/2_story_20260219.jpg", time: "2月19日" },
              { image: "images/2_story_20260219-2.jpg", time: "2月19日" },
              { image: "images/2_story_20260225.jpg", time: "2月25日" },
              { image: "images/2_story2_20260427.jpg", time: "4月27日", closeFriends: true },
              { image: "images/2_story_20260427.jpg", time: "4月27日" },
              { image: "images/2_story_20260506.mp4", time: "5月6日" },
              { image: "images/2_story_20260524.jpg", time: "5月24日" },
              { image: "images/2_story_20260606.mp4", time: "6月6日" },
              { image: "images/2_story_20260609.jpg", time: "6月9日" },
              { image: "images/2_story_20260609-2.jpg", time: "6月9日" },
              { image: "images/2_story_20260709.jpg", time: "7月9日" },
              { image: "images/2_story_20261001.jpg", time: "10月1日" },
              { image: "images/2_story_20261004.jpg", time: "10月4日" }
            ] }
        ],
        // 摯友名單：寫在這裡的帳號才看得到 closeFriends: true（story2）的限時動態
        closeFriendsList: ["shotaroo0", "seokkkk", "sungchan913", "bin032", "antonnie"],
        // 典藏（登入這個帳號後：設定 → 典藏）
        archive: {
          stories: [
            { image: "images/2_savedstory_20260125.jpg", time: "1月25日" },
            { image: "images/2_savedstory_20260602.jpg", time: "6月2日" }
          ],
          posts: [
      {
              images: ["images/2_savedpost_20260924.jpg"],
              likedBy: { avatar: "images/anton.jpg", name: "antonnie" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
              caption: "test283",
              time: "9月24日"
            },
            {
              images: ["images/2_savedpost_20251210.jpg"],
              likedBy: { avatar: "images/eunseok.jpg", name: "seokkkk" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
              caption: "test286",
              time: "2025年12月10日"
            },
            {
              images: ["images/2_saved_20251204.jpg", "images/2_saved_20251204-2.jpg"],
              likedBy: { avatar: "images/sungchan.jpg", name: "sungchan913" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
              caption: "test289",
              time: "2025年12月4日"
            }
          ]
        },
        posts: [
      {
        images: ["images/2_post_20260924.jpg"],
        likedBy: { avatar: "images/1_avatar.jpg", name: "shotaroo0" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "",
        time: "9月24日"
      },
      {
        images: ["images/2_post_20260222.jpg", "images/2_post_20260222-2.jpg"],
        likedBy: { avatar: "images/anton.jpg", name: "antonnie" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "",
        time: "2月22日"
      },
      {
        images: ["images/2_post_20260103.jpg", "images/2_post_20260103-2.jpg", "images/2_post_20260103-3.jpg"],
        likedBy: { avatar: "images/eunseok.jpg", name: "seokkkk" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "假扮學生~~",
        time: "1月3日"
      },
      {
        images: ["images/2_post_20251121.jpg"],
        likedBy: { avatar: "images/eunseok.jpg", name: "seokkkk" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "thank u all",
        time: "2025年11月21日"
      },
      {
        images: ["images/2_post_20250520.jpg"],
        likedBy: { avatar: "images/sungchan.jpg", name: "sungchan913" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "ナルト",
        time: "2025年5月20日"
      },
      {
        images: ["images/2_post_20240822.jpg", "images/2_post_20240822-2.jpg"],
        likedBy: { avatar: "images/wonbin.jpg", name: "bin032" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
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
                { who: "me", text: "哈哈其實不是啦⋯⋯看到有人在論壇上討論所以⋯⋯但原來taro桑有推薦過嗎！" },
                { who: "them", text: "哎呀真是不好意思！但實在太多人因為Shotaro桑而前來本店，我們真的特別感謝他。" }
              ],
              choices: [
                { label: "想知道更多細節", say: false, next: "detail" }
              ]
            },
            detail: {
              lines: [
                { who: "them", text: "嗯⋯⋯記得是在去年的（）月上旬，Shotaro桑和一位不是日本人的朋友一起過來的，（劇情，尚未想好）" },
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
          { date: "2025年3月20日 星期四" },   // 李炤熙回韓國，相遇後第一則（3/18～3/20 在日本認識、一起去秘境探店）
          { from: "them", text: "test168", time: "test169" },
          { from: "me", text: "test170", time: "test171" },
          { from: "them", text: "test172", time: "test173" },
          { date: "2025年4月19日 星期六" },   // 曖昧初期的閒聊
          { from: "them", text: "test482", time: "test483" },
          { from: "me", text: "test484", time: "test485" },
          { date: "2025年5月13日 星期二" },   // 將太郎明天到韓國（5/14～5/27 韓國旅遊）
          { from: "me", text: "test486", time: "test487" },
          { from: "them", text: "test488", time: "test489" },
          { date: "2025年5月20日 星期二" },   // 送火影周邊、李炤熙喊「螺旋丸」（之後放照片、影片證據）
          { from: "me", text: "test490", time: "test491" },
          { from: "them", text: "test492", time: "test493" },
          { date: "2025年5月27日 星期二" },   // 將太郎回日本
          { from: "them", text: "test494", time: "test495" },
          { from: "me", text: "test496", time: "test497" },
          { date: "2025年6月19日 星期四" },
          { from: "me", image: "images/1_msg_20250619.jpg", time: "test216" },
          { date: "2025年7月9日 星期三" },
          { from: "me", image: "images/1_msg_20250709.jpg", time: "test293" },
          { date: "2025年10月18日 星期六" },
          { from: "me", image: "images/1_msg_20251018.jpg", time: "test294" },
          { date: "2025年11月7日 星期五" },
          { from: "them", image: "images/2_msg_20251107.jpg", time: "test295" },
          { date: "2025年11月19日 星期三" },   // 李炤熙明天帶學生去日本比賽（11/20～11/26）
          { from: "them", text: "test498", time: "test499" },
          { from: "me", text: "test500", time: "test501" },
          { date: "2025年11月21日 星期五" },   // 李炤熙生日（在日本）
          { from: "me", text: "test502", time: "test503" },
          { from: "them", text: "test504", time: "test505" },
          { date: "2025年11月26日 星期三" },   // 互訴心意、交往紀念日（建議用「오늘부터 1일」）
          { from: "them", text: "test506", time: "test507" },
          { from: "me", text: "test508", time: "test509" },
          { from: "them", text: "test510", time: "test511" },
          { date: "2025年12月4日 星期四" },
          { from: "them", image: "images/2_msg_20251204.jpg", time: "test296" },
          { date: "2025年12月12日 星期五" },
          { from: "them", image: "images/2_msg_20251212.jpg", time: "test297" },
          { date: "2025年12月14日 星期日" },   // 遠距離：視訊通話 1
          { from: "me", call: "video", duration: "test512", time: "test513" },   // 視訊通話紀錄（duration 寫通話長度，例如 "1:02:33"）
          { from: "me", text: "test514", time: "test515" },
          { date: "2025年12月18日 星期四" },
          { from: "me", image: "images/1_msg_20251218.jpg", time: "test298" },
          { date: "2025年12月30日 星期二" },   // 明天快閃日本跨年
          { from: "them", text: "test516", time: "test517" },
          { from: "me", text: "test518", time: "test519" },
          { date: "2026年1月2日 星期五" },   // 跨年後回韓國
          { from: "them", text: "test520", time: "test521" },
          { from: "me", text: "test522", time: "test523" },
          { date: "2026年1月16日 星期五" },
          { from: "me", image: "images/1_msg_20260116.jpg", time: "test299" },
          { date: "2026年1月18日 星期日" },   // 遠距離：視訊通話 2
          { from: "me", call: "video", duration: "test524", time: "test525" },   // 視訊通話紀錄（duration 寫通話長度，例如 "1:02:33"）
          { from: "them", text: "test526", time: "test527" },
          { date: "2026年2月6日 星期五" },
          { from: "me", image: "images/1_msg_20260206.jpg", time: "test318" },
          { date: "2026年2月8日 星期日" },   // 遠距離：視訊通話 3，思考遠距離、生活和愛情的取捨
          { from: "me", call: "video", duration: "test528", time: "test529" },   // 視訊通話紀錄（duration 寫通話長度，例如 "1:02:33"）
          { from: "me", text: "test530", time: "test531" },
          { from: "them", text: "test532", time: "test533" },
          { date: "2026年2月9日 星期一" },
          { from: "them", image: "images/2_msg_20260209.jpg", time: "test319" },
          { date: "2026年2月22日 星期日" },   // 遠距離：視訊通話 4，決定搬來韓國
          { from: "me", call: "video", duration: "test534", time: "test535" },   // 視訊通話紀錄（duration 寫通話長度，例如 "1:02:33"）
          { from: "me", text: "test536", time: "test537" },
          { date: "2026年2月27日 星期五" },
          { from: "them", image: "images/2_msg_20260227.jpg", time: "test320" },
          { date: "2026年3月5日 星期四" },   // 交往 100 日、將太郎搬到韓國
          { from: "them", text: "test538", time: "test539" },
          { from: "me", text: "test540", time: "test541" },
          { date: "2026年4月11日 星期六" },
          { from: "me", image: "images/1_msg_20260411.jpg", time: "test321" },
          { date: "2026年5月19日 星期二" },   // 吵架
          { from: "me", text: "test542", time: "test543" },
          { from: "them", text: "test544", time: "test545" },
          { date: "2026年6月26日 星期五" },
          { from: "them", image: "images/2_msg_20260626.jpg", time: "test322" },
          { date: "2026年7月11日 星期六" },   // 舞室鬧僵之後
          { from: "me", text: "test546", time: "test547" },
          { date: "2026年7月12日 星期日" },
          { from: "me", image: "images/1_msg_20260712.jpg", time: "test217" },
          { date: "2026年8月26日 星期三" },
          { from: "me", image: "images/1_msg_20260826.jpg", time: "test218" },
          { date: "2026年9月30日 星期三" },
          { from: "them", image: "images/2_msg_20260930.jpg", time: "test219" },
          { from: "them", image: "images/2_msg_20260930-2.jpg", time: "test220" },
          { from: "them", image: "images/2_msg_20260930-3.jpg", time: "test221" },
          { date: "2026年10月3日 星期六" },
          { from: "them", image: "images/2_msg_20261003.jpg", time: "test222" },
          { date: "2026年10月4日 星期日" },
          { from: "them", image: "images/2_msg_20261004.jpg", time: "test223" },
          { date: "2026年10月10日 星期六" },
          { from: "me", image: "images/1_msg_20261010.jpg", time: "test224" },
          { date: "2026年10月22日 星期四" },   // 論壇發文後；最後一則是소희傳的（未讀 1）
          { from: "me", text: "test383", time: "test384" },
          { from: "them", text: "test385", time: "test386" }
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
          { from: "them", text: "test180", time: "test181" },
          { from: "me", text: "test182", time: "test183" },
          { from: "them", text: "test184", time: "test185" },
          { date: "2026年5月19日 星期二" },   // 將太郎訴說吵架的事，원빈陪伴、給建議
          { from: "me", text: "test548", time: "test549" },
          { from: "them", text: "test550", time: "test551" },
          { from: "me", text: "test552", time: "test553" },
          { from: "them", text: "test554", time: "test555" },
          { date: "2026年7月11日 星期六" },   // 兩人在舞室明顯鬧僵，원빈忍不住傳訊息詢問、給建議
          { from: "them", text: "test556", time: "test557" },
          { from: "me", text: "test558", time: "test559" },
          { from: "them", text: "test560", time: "test561" },
          { date: "2026年9月27日 星期日" },   // 討論舞蹈、互相鼓勵（無關主線）
          { from: "them", text: "test562", time: "test563" },
          { from: "me", text: "test564", time: "test565" }
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
          { from: "them", text: "test192", time: "test193" },
          { from: "me", text: "test194", time: "test195" },
          { from: "them", text: "test196", time: "test197" },
          { date: "2026年6月14日 星期日" },   // 燦榮透露了一些炤熙的故事
          { from: "them", text: "test566", time: "test567" },
          { from: "me", text: "test568", time: "test569" },
          { date: "2026年10月11日 星期日" },   // 三人一起出去，燦榮傳兩人的合照給將太郎
          { from: "them", image: "images/at_msg_20261011.jpg", time: "test570" },
          { from: "them", image: "images/at_msg_20261011-2.jpg", time: "test570" },
          { from: "them", text: "test571", time: "test570" },
          { from: "me", text: "test572", time: "test573" }
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
          { from: "them", text: "test574", time: "test575" },
          { from: "me", text: "test576", time: "test577" },
          { date: "2025年11月26日 星期三" },   // 追問群組裡的細節
          { from: "them", text: "test578", time: "test579" },
          { from: "me", text: "test580", time: "test581" },
          { from: "them", text: "test582", time: "test583" }
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
          { from: "them", text: "test584", time: "test585" },
          { from: "me", text: "test586", time: "test587" },
          { date: "2026年4月13日 星期一" },   // 問群組的約要不要去（無關主線）
          { from: "them", text: "test588", time: "test589" },
          { from: "me", text: "test590", time: "test591" }
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
          { date: "2022年1月3日 星期一" },   // 留學結束回日本前一天，終於創了群組（無關主線）
          { from: "f4", text: "test263", time: "test264" },
          { from: "f5", text: "test265", time: "test266" },
          { from: "me", text: "test267", time: "test268" },
          { date: "2025年3月18日 星期二" },   // 將太郎分享遇到了有趣的韓國遊客
          { from: "me", text: "test592", time: "test593" },
          { from: "f4", text: "test594", time: "test595" },
          { from: "f5", text: "test596", time: "test597" },
          { date: "2025年8月9日 星期六" },   // 閒聊（無關主線）
          { from: "f5", text: "test598", time: "test599" },
          { from: "me", text: "test600", time: "test601" },
          { from: "f4", text: "test602", time: "test603" },
          { date: "2025年11月20日 星期四" },   // 將太郎分享與李炤熙再次相遇
          { from: "me", text: "test604", time: "test605" },
          { from: "f4", text: "test606", time: "test607" },
          { from: "f5", text: "test608", time: "test609" },
          { date: "2025年11月25日 星期二" },   // 祝將太郎生日快樂（將太郎當天沒回）
          { from: "f4", text: "test610", time: "test611" },
          { from: "f5", text: "test612", time: "test613" },
          { date: "2025年11月26日 星期三" },   // 將太郎回覆，透露跟某人一起過生日、已在一起的線索
          { from: "me", text: "test614", time: "test615" },
          { from: "f5", text: "test616", time: "test617" },
          { from: "f4", text: "test618", time: "test619" },
          { from: "me", text: "test620", time: "test621" },
          { date: "2026年3月6日 星期五" },   // 將太郎分享昨天搬到韓國
          { from: "me", text: "test622", time: "test623" },
          { from: "f4", text: "test624", time: "test625" },
          { from: "f5", text: "test626", time: "test627" },
          { date: "2026年4月13日 星期一" },   // 성찬約三人吃飯（無關主線）
          { from: "f4", text: "test628", time: "test629" },
          { from: "f5", text: "test630", time: "test631" },
          { from: "me", text: "test632", time: "test633" },
          { date: "2026年10月22日 星期四" },   // 昨天：성찬傳論壇文章給將太郎、逼問是不是真的（未讀 2）
          { from: "f4", text: "test634", time: "test635" },
          { from: "f4", text: "test636", time: "test637" }
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
      photoLabel: "照片"            // 聊天列表裡最後一則是照片時顯示的字
    }
  }
};
