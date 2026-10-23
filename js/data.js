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
    memo: { label: "備忘錄", placeholder: "輕點以記下線索⋯" },
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
    // 公告：unlock 寫解鎖條件（進度旗標名稱），達成後才會出現；不寫 unlock = 一開始就有
    //   left_forum      = 第一次離開論壇後再回來
    //   kakao_unlocked  = 解開 KakaoTalk 密碼
    //   login_fauiogl94 = 登入過小帳（login_帳號id）
    //   chat_f1         = 打開過和소희的聊天室（chat_好友id，群組是 chat_g1）
    //   也可以在電話對話的段落寫 flag: "名稱"，走到那段就算達成
    // 公告內頁只有標題、內文（可加 author、image），沒有留言
    notices: [
      { id: "guide", title: "遊玩說明", content: "test479" },
      { id: "hint1", title: "test480", content: "test481", unlock: "left_forum" }
    ],
    listTitle: "文章",          // 文章列表框的標題
    backLabel: "返回",          // 文章內頁「返回」
    commentLabel: "留言",       // 「留言」
    opLabel: "樓主",            // 留言者和文章的匿名帳號代碼一樣時，名字旁顯示的標籤
    // 留言格式：{ name: "匿名代碼", text: "內容", image: "images/xxx.jpg" }（image 可省略）

    // 文章：順序 = 列表顯示順序。id 請保持不重複（用於網址 #/forum/id）
    posts: [
      {
        id: "1", title: "Shotaro是不是談戀愛了？",
        author: "taromilkteaaaa",          // 匿名帳號代碼
        content: "尚未更新",
        comments: [
          { name: "sho_pabo", text: "尚未更新" },
          { name: "dngrumm", text: "尚未更新" },
          { name: "452_.rq", text: "尚未更新" }
        ]
      },
      {
        id: "2", title: "秘境餐廳推薦！",
        author: "f00d1smylife_",          // 匿名帳號代碼
        content: "尚未更新",
        comments: [
          { name: "f00d1smylife_", text: "★店家資訊★\n電話：046-882-3916\n地址：神奈川県三浦市三崎町小網代2718-3" },
          { name: "aburasoba", text: "謝謝推薦。" }
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
              { image: "images/1_story_20251206.jpg", time: "2025年12月6日" },
              { image: "images/1_story_20251219.jpg", time: "2025年12月19日" },
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
        images: ["images/1_post1.jpg", "images/1_post1-2.jpg", "images/1_post1-3.jpg",],
        likedBy: { avatar: "images/sungchan.jpg", name: "sungchan913" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/1_post2.jpg",],
        likedBy: { avatar: "images/2_avatar.jpg", name: "252525252_" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/1_post3.jpg", "images/1_post3-2.jpg",],
        likedBy: { avatar: "images/sungchan.jpg", name: "sungchan913" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/1_post4.jpg", "images/1_post4-2.jpg", "images/1_post4-3.jpg",],
        likedBy: { avatar: "images/2_avatar.jpg", name: "252525252_" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/1_post5.jpg", "images/1_post5-2.jpg", "images/1_post5-3.jpg", "images/1_post5-4.jpg"],
        likedBy: { avatar: "images/wonbin.jpg", name: "bin032" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/1_post6.jpg", "images/1_post6-2.jpg"],
        likedBy: { avatar: "images/sungchan.jpg", name: "sungchan913" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test214",
        time: "test215"
      },
      {
        images: ["images/1_post_20260122.jpg", "images/1_post_20260122-2.jpg", "images/1_post_20260122-3.jpg"],
        likedBy: { avatar: "images/anton.jpg", name: "antonnie" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test302",
        time: "1月22日"
      },
      {
        images: ["images/1_post_20251212.jpg", "images/1_post_20251212-2.jpg"],
        likedBy: { avatar: "images/2_avatar.jpg", name: "252525252_" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test271",
        time: "2025年12月12日"
      },
      {
        images: ["images/1_post_20251128.jpg", "images/1_post_20251128-2.jpg"],
        likedBy: { avatar: "images/wonbin.jpg", name: "bin032" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test274",
        time: "2025年11月28日"
      },
      {
        images: ["images/1_post_20250915.jpg", "images/1_post_20250915-2.jpg"],
        likedBy: { avatar: "images/eunseok.jpg", name: "seokkkk" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test277",
        time: "2025年9月15日"
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
        images: ["images/2_post1.jpg", "images/2_post1-2.jpg"],
        likedBy: { avatar: "images/anton.jpg", name: "antonnie" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test203",
        time: "test204"
      },
      {
        images: ["images/2_post2.jpg", "images/2_post2-2.jpg", "images/2_post2-3.jpg"],
        likedBy: { avatar: "images/eunseok.jpg", name: "seokkkk" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test207",
        time: "7月7日"
      },
      {
        images: ["images/2_post_20260129.jpg"],
        likedBy: { avatar: "images/sungchan.jpg", name: "sungchan913" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test305",
        time: "1月29日"
      },
      {
        images: ["images/2_post_20251219.jpg"],
        likedBy: { avatar: "images/eunseok.jpg", name: "seokkkk" },   // 「xxx 說讚」（隨機放有追蹤的帳號）；不要的話整行刪掉
        caption: "test280",
        time: "2025年12月19日"
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
                { who: "them", text: "お電話ありがとうございます！（待取名）カフェでございます～", sub: "您好～這裡是（待取名）咖啡廳！" }
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
          { date: "2025年3月9日 星期日" },   // 相遇後第一則（2025/3/8 在日本相遇）
          { from: "them", text: "test168", time: "test169" },
          { from: "me", text: "test170", time: "test171" },
          { from: "them", text: "test172", time: "test173" },
          { date: "2025年4月20日 星期日" },
          { from: "them", text: "test347", time: "test348" },
          { from: "me", text: "test349", time: "test350" },
          { date: "2025年6月19日 星期四" },
          { from: "me", image: "images/1_msg_20250619.jpg", time: "test216" },
          { date: "2025年7月9日 星期三" },
          { from: "me", image: "images/1_msg_20250709.jpg", time: "test293" },
          { date: "2025年10月18日 星期六" },
          { from: "me", image: "images/1_msg_20251018.jpg", time: "test294" },
          { date: "2025年11月7日 星期五" },
          { from: "them", image: "images/2_msg_20251107.jpg", time: "test295" },
          { date: "2025年11月21日 星期五" },   // 소희 生日
          { from: "me", text: "test351", time: "test352" },
          { from: "them", text: "test353", time: "test354" },
          { date: "2025年11月25日 星期二" },   // Sho 生日
          { from: "them", text: "test355", time: "test356" },
          { from: "me", text: "test357", time: "test358" },
          { date: "2025年11月26日 星期三" },   // 告白、在一起（紀念日）
          { from: "me", text: "test359", time: "test360" },
          { from: "them", text: "test361", time: "test362" },
          { date: "2025年12月4日 星期四" },
          { from: "them", image: "images/2_msg_20251204.jpg", time: "test296" },
          { date: "2025年12月12日 星期五" },
          { from: "them", image: "images/2_msg_20251212.jpg", time: "test297" },
          { date: "2025年12月18日 星期四" },
          { from: "me", image: "images/1_msg_20251218.jpg", time: "test298" },
          { date: "2025年12月25日 星期四" },
          { from: "them", text: "test363", time: "test364" },
          { from: "me", text: "test365", time: "test366" },
          { date: "2026年1月1日 星期四" },
          { from: "me", text: "test367", time: "test368" },
          { from: "them", text: "test369", time: "test370" },
          { date: "2026年1月16日 星期五" },
          { from: "me", image: "images/1_msg_20260116.jpg", time: "test299" },
          { date: "2026年2月1日 星期日" },   // 搬到韓國前一天
          { from: "them", text: "test371", time: "test372" },
          { from: "me", text: "test373", time: "test374" },
          { date: "2026年2月6日 星期五" },
          { from: "me", image: "images/1_msg_20260206.jpg", time: "test318" },
          { date: "2026年2月9日 星期一" },
          { from: "them", image: "images/2_msg_20260209.jpg", time: "test319" },
          { date: "2026年2月27日 星期五" },
          { from: "them", image: "images/2_msg_20260227.jpg", time: "test320" },
          { date: "2026年3月5日 星期四" },   // 在一起 100 天
          { from: "them", text: "test375", time: "test376" },
          { from: "me", text: "test377", time: "test378" },
          { date: "2026年4月11日 星期六" },
          { from: "me", image: "images/1_msg_20260411.jpg", time: "test321" },
          { date: "2026年4月25日 星期六" },
          { from: "me", text: "test379", time: "test380" },
          { from: "them", text: "test381", time: "test382" },
          { date: "2026年6月26日 星期五" },
          { from: "them", image: "images/2_msg_20260626.jpg", time: "test322" },
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
          { date: "2026年4月8日 星期三" },   // 無關主線
          { from: "them", text: "test180", time: "test181" },
          { from: "me", text: "test182", time: "test183" },
          { from: "them", text: "test184", time: "test185" },
          { date: "2026年5月19日 星期二" },
          { from: "them", text: "test397", time: "test398" },
          { from: "me", text: "test399", time: "test400" },
          { date: "2026年7月11日 星期六" },
          { from: "me", text: "test401", time: "test402" },
          { from: "them", text: "test403", time: "test404" },
          { date: "2026年9月27日 星期日" },   // 無關主線
          { from: "them", text: "test405", time: "test406" },
          { from: "me", text: "test407", time: "test408" }
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
          { date: "2026年3月2日 星期一" },   // 無關主線
          { from: "them", text: "test192", time: "test193" },
          { from: "me", text: "test194", time: "test195" },
          { from: "them", text: "test196", time: "test197" },
          { date: "2026年6月14日 星期日" },
          { from: "them", text: "test409", time: "test410" },
          { from: "me", text: "test411", time: "test412" },
          { date: "2026年10月11日 星期日" },
          { from: "them", text: "test413", time: "test414" },
          { from: "me", text: "test415", time: "test416" }
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
          { date: "2021年11月25日 星期四" },   // Sho 生日，無關主線
          { from: "them", text: "test417", time: "test418" },
          { from: "me", text: "test419", time: "test420" },
          { date: "2025年11月26日 星期三" },
          { from: "me", text: "test421", time: "test422" },
          { from: "them", text: "test423", time: "test424" }
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
          { date: "2021年11月25日 星期四" },   // Sho 生日，無關主線
          { from: "them", text: "test425", time: "test426" },
          { from: "me", text: "test427", time: "test428" },
          { date: "2026年4月13日 星期一" },   // 無關主線
          { from: "them", text: "test429", time: "test430" },
          { from: "me", text: "test431", time: "test432" }
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
          { date: "2022年1月3日 星期一" },   // 無關主線
          { from: "f4", text: "test263", time: "test264" },
          { from: "f5", text: "test265", time: "test266" },
          { from: "me", text: "test267", time: "test268" },
          { date: "2025年3月18日 星期二" },
          { from: "me", text: "test433", time: "test434" },
          { from: "f4", text: "test435", time: "test436" },
          { from: "f5", text: "test437", time: "test438" },
          { date: "2025年8月9日 星期六" },
          { from: "f5", text: "test439", time: "test440" },
          { from: "me", text: "test441", time: "test442" },
          { from: "f4", text: "test443", time: "test444" },
          { date: "2025年11月20日 星期四" },
          { from: "me", text: "test445", time: "test446" },
          { from: "f4", text: "test447", time: "test448" },
          { from: "f5", text: "test449", time: "test450" },
          { date: "2025年11月25日 星期二" },   // Sho 生日
          { from: "f4", text: "test451", time: "test452" },
          { from: "f5", text: "test453", time: "test454" },
          { from: "me", text: "test455", time: "test456" },
          { date: "2025年11月26日 星期三" },
          { from: "f5", text: "test457", time: "test458" },
          { from: "f4", text: "test459", time: "test460" },
          { from: "me", text: "test461", time: "test462" },
          { date: "2026年2月20日 星期五" },
          { from: "f4", text: "test463", time: "test464" },
          { from: "me", text: "test465", time: "test466" },
          { from: "f5", text: "test467", time: "test468" },
          { date: "2026年4月13日 星期一" },   // 無關主線
          { from: "f5", text: "test469", time: "test470" },
          { from: "f4", text: "test471", time: "test472" },
          { from: "me", text: "test473", time: "test474" },
          { date: "2026年10月22日 星期四" },   // 昨天：最後兩則未讀（未讀 2）
          { from: "f4", text: "test475", time: "test476" },
          { from: "f5", text: "test477", time: "test478" }
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
