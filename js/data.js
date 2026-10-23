/* =========================================================
 * 網頁上所有「顯示文字」與「圖片路徑」都集中在這個檔案。
 * 直接把 testN 改成你要的內容、把圖片路徑換成你的檔案即可。
 * - 文字中的換行：在字串裡寫 \n，或改用 `反引號` 多行字串。
 * - 圖片：放進 images/ 資料夾，再把下面的路徑改成新檔名。
 * ========================================================= */
window.SITE_DATA = {

  /* ---------- 共用 ---------- */
  notUpdatedText: "尚未更新",   // 點到未開放功能時跳出的文字

  /* ---------- 手機首頁 ---------- */
  home: {
    wallpaper: "images/wallpaper.jpg",
    // 這些 App 放在桌布下方的 Dock（和 iPhone 一樣最多 4 個、不顯示名稱）
    apps: [
      { id: "forum", label: "ANNMS Talk", icon: "images/icon_forum.png" },
      { id: "ig",    label: "Instagram", icon: "images/icon_insta.png" },
      { id: "phone", label: "電話", icon: "images/icon_phone.png" },
      { id: "kakao", label: "KakaoTalk", icon: "images/icon_kakao.png" }
    ]
  },

  /* ---------- 匿名論壇 ---------- */
  forum: {
    listTitle: "文章",          // 文章列表框的標題
    backLabel: "返回",          // 文章內頁「返回」
    commentLabel: "留言",       // 「留言」

    // 文章：順序 = 列表顯示順序。id 請保持不重複（用於網址 #/forum/id）
    posts: [
      {
        id: "1", title: "求推薦裝潢好看食物又好吃的咖啡廳啊啊啊",
        author: "f00d1smylife_",          // 匿名帳號代碼
        content: "如題。",
        comments: [
          { name: "test13", text: "test14" },
          { name: "test15", text: "test16" }
        ]
      },
      {
        id: "2", title: "test18",
        author: "test78",          // 匿名帳號代碼
        content: "test19",
        comments: [
          { name: "test20", text: "test21" }
        ]
      },
      {
        id: "3", title: "test23",
        author: "test79",          // 匿名帳號代碼
        content: "test24",
        comments: [
          { name: "test25", text: "test26" },
          { name: "test27", text: "test28" },
          { name: "test29", text: "test30" }
        ]
      },
      {
        id: "4", title: "test32",
        author: "test80",          // 匿名帳號代碼
        content: "test33",
        comments: []
      },
      {
        id: "5", title: "test35",
        author: "test81",          // 匿名帳號代碼
        content: "test36",
        comments: [
          { name: "test37", text: "test38" }
        ]
      },
      {
        id: "6", title: "test40",
        author: "test82",          // 匿名帳號代碼
        content: "test41",
        comments: [
          { name: "test42", text: "test43" },
          { name: "test44", text: "test45" }
        ]
      }
    ],

    // 右側廣告：link 填外部網址；留空 "" 則點擊時顯示「尚未更新」
    ads: [
      { image: "images/ad_1.png", link: "" },
      { image: "images/ad_2.png", link: "" },
      { image: "images/ad_3.png", link: "" },
      { image: "images/ad_4.png", link: "" }
    ],

    // 最下方淺色文字
    copyright: "@dng"
  },

  /* ---------- Instagram ---------- */
  instagram: {
    username: "fauiogl94",
    avatar: "images/ig_avatar.png",
    hasStory: true,              // true = 頭像外圈顯示限時動態框
    // 點頭像看到的限時動態（可放多張，會自動輪播）
    story: [
      { image: "images/ig_story_1.png", time: "test101" },
      { image: "images/ig_story_2.png", time: "test102" }
    ],
    name: "fauiogl94",
    // 貼文數、粉絲數、追蹤數會自動計算（貼文 = posts 的數量；粉絲／追蹤 = following 名單）
    // 想顯示固定數字（例如 "145k"）時，再加上 postsCount / followersCount / followingCount 就會蓋過自動計算
    following: ["shotaroo0"],    // 這個帳號追蹤中的帳號（寫帳號 id）
    postsLabel: "貼文",
    followersLabel: "位粉絲",
    followingLabel: "追蹤中",
    bio: ["test62", "test63"],     // 每一項 = 一行；@開頭的字會自動變藍色
    music: { title: "Nostalgic", artist: "No Guindce" },
    editProfileLabel: "編輯個人檔案",
    shareProfileLabel: "分享個人檔案",
    // 精選動態：image = 圓圈封面，stories = 點進去看到的內容
    highlights: [
      { image: "images/3_story_20261010.jpg", label: "mood",
        stories: [
          { image: "images/3_story_20261010.jpg", time: "10月10日" },
          { image: "images/3_story_20261011.jpg", time: "10月11日" },
          { image: "images/3_story_20261021.jpg", time: "10月21日" },
          { image: "images/3_story_20261022.jpg", time: "10月22日" }
        ] }
    ],
    // 貼文：images 可放多張（左右滑動）；格子上顯示第一張
    // 需要時可以加：comments: [{ user: "帳號", text: "留言", time: "1天" }]、tagged: ["被標註的帳號"]
    posts: [
      {
        images: ["images/3_post1.jpg"],
        likes: "test111",
        likedBy: { avatar: "images/ig_liker.png", name: "test112" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test113",
        time: "test114"
      },
      {
        images: ["images/3_post2.jpg"],
        likes: "test115",
        likedBy: { avatar: "images/ig_liker.png", name: "test116" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/3_post3.jpg", "images/3_post3-2.jpg"],
        likes: "test208",
        likedBy: { avatar: "images/ig_liker.png", name: "test209" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test210",
        time: "test211"
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
      addToStory: "新增到限時動態",
      reposted: "已轉發到你的個人檔案",
      unreposted: "已取消轉發",
      savedTitle: "已儲存",
      noSaved: "還沒有儲存任何貼文",
      noReposts: "還沒有轉發任何貼文",
      noTagged: "還沒有被標註的相片",
      storyMessageSent: "訊息已傳送"
    },

    // 貼文頁、限時動態的固定文字
    postTitle: "test119",             // 貼文頁上方標題「貼文」
    likedBySuffix: "test120",         // 「說讚」
    storyMessagePlaceholder: "test121",  // 限時動態下方「傳送訊息……」

    // 下方功能列的搜尋頁
    searchPlaceholder: "搜尋",
    noResultText: "查無資訊",        // 搜尋不到帳號時顯示
    searchMode: "prefix",            // "exact" = 要打完整帳號才搜得到；"prefix" = 打開頭幾個字就會出現
    explore: [                      // 搜尋頁還沒輸入時顯示的探索格子（點了顯示「尚未更新」）
      "images/explore_1.png",
      "images/explore_2.png",
      "images/explore_3.png",
      "images/explore_4.png",
      "images/explore_5.png",
      "images/explore_6.png",
      "images/explore_7.png",
      "images/explore_8.png",
      "images/explore_9.png",
      "images/explore_10.png",
      "images/explore_11.png",
      "images/explore_12.png"
    ],
    // 只能被搜尋到、不能登入的帳號（格式和 otherAccounts 一樣，不用寫 password）
    searchOnlyAccounts: [],

    // 從搜尋點進別人的頁面時，取代「編輯／分享個人檔案」的兩個按鈕
    followLabel: "追蹤",
    messageLabel: "發訊息",
    followingButtonLabel: "追蹤中",   // 按了追蹤之後按鈕變成的文字

    // 右上角三條線 → 設定頁（目前每一項點了都顯示「尚未更新」）
    settings: {
      title: "test122",
      sections: [
        { title: "功能", items: [
          { icon: "saved",   label: "已儲存" },
          { icon: "archive", label: "典藏" }
        ] },
        { title: "隱私", items: [
          { icon: "lock", label: "帳號隱私設定", value: "不公開" },
          { icon: "star", label: "摯友", value: "0" }
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
      forgotLabel: "忘記密碼",
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
        name: "Shotaro",
        following: [],
        bio: ["test87"],
        music: { title: "test88", artist: "keshi" },
        highlights: [
          { image: "images/1_story_20261007.jpg", label: "test90",
            stories: [
              { image: "images/1_story_20261007.jpg", time: "10月7日" },
              { image: "images/1_story_20261012.jpg", time: "10月12日" }
            ] }
        ],
        posts: [
      {
        images: ["images/1_post1.jpg", "images/1_post1-2.jpg", "images/1_post1-3.jpg",],
        likes: "test115",
        likedBy: { avatar: "images/ig_liker.png", name: "test116" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/1_post2.jpg",],
        likes: "test115",
        likedBy: { avatar: "images/ig_liker.png", name: "test116" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/1_post3.jpg", "images/1_post3-2.jpg",],
        likes: "test115",
        likedBy: { avatar: "images/ig_liker.png", name: "test116" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/1_post4.jpg", "images/1_post4-2.jpg", "images/1_post4-3.jpg",],
        likes: "test115",
        likedBy: { avatar: "images/ig_liker.png", name: "test116" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/1_post5.jpg", "images/1_post5-2.jpg", "images/1_post5-3.jpg", "images/1_post5-4.jpg"],
        likes: "test115",
        likedBy: { avatar: "images/ig_liker.png", name: "test116" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/1_post6.jpg", "images/1_post6-2.jpg"],
        likes: "test212",
        likedBy: { avatar: "images/ig_liker.png", name: "test213" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test214",
        time: "test215"
      }
        ]
      },
      {
        username: "252525252",           // 登入用的帳號，也是頁面上方顯示的帳號名稱
        password: "031121",
        avatar: "images/2_avatar.jpg",
        hasStory: false,
        name: "SOHEE",
        following: [],
        bio: ["test96"],
        music: { title: "test97", artist: "test98" },
        highlights: [
          { image: "images/2_story_20260709.jpg", label: "test99",
            // 依日期排序；.MP4 影片會自動播放，播完才換下一則
            stories: [
              { image: "images/2_story_20250722.jpg", time: "2025年7月22日" },
              { image: "images/2_story_20260117.jpg", time: "1月17日" },
              { image: "images/2_story_20260606.mp4", time: "6月6日" },
              { image: "images/2_story_20260609.jpg", time: "6月9日" },
              { image: "images/2_story_20260609-2.jpg", time: "6月9日" },
              { image: "images/2_story_20260709.jpg", time: "7月9日" },
              { image: "images/2_story_20261001.jpg", time: "10月1日" },
              { image: "images/2_story_20261004.jpg", time: "10月4日" }
            ] }
        ],
        posts: [
      {
        images: ["images/2_post1.jpg", "images/2_post1-2.jpg"],
        likes: "test201",
        likedBy: { avatar: "images/ig_liker.png", name: "test202" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test203",
        time: "test204"
      },
      {
        images: ["images/2_post2.jpg", "images/2_post2-2.jpg", "images/2_post2-3.jpg"],
        likes: "test205",
        likedBy: { avatar: "images/ig_liker.png", name: "test206" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test207",
        time: "7月7日"
      }
        ]
      }
    ]
  },

  /* ---------- 電話（最近通話） ---------- */
  phone: {
    title: "最近通話",
    editLabel: "編輯",
    filterAll: "全部",
    filterMissed: "未接來電",
    todayLabel: "今天",          // 玩家撥出的電話會加在這個日期底下
    tabs: ["個人收藏", "最近通話", "聯絡人", "鍵盤"],
    callingText: "正在撥號⋯",
    noAnswerText: "無人接聽",
    callButtons: ["靜音", "鍵盤", "擴音", "加入通話", "FaceTime", "聯絡人"],
    endLabel: "結束",
    detailActions: ["訊息", "撥打", "視訊", "郵件"],
    // 通話紀錄：同一個 date 會排在一起（順序照這裡）
    // missed: true = 未接（紅字）；outgoing: true = 撥出（名字前有小圖示）；count = 通話次數
    calls: [
      { date: "今天", name: "test140", count: 3, missed: true, outgoing: false, type: "行動電話", time: "test144" },
      { date: "今天", name: "test141", count: 1, missed: false, outgoing: true, type: "行動電話", time: "test145" },
      { date: "今天", name: "test142", count: 2, missed: false, outgoing: false, type: "行動電話", time: "test146" },
      { date: "昨天", name: "test143", count: 1, missed: true, outgoing: false, type: "行動電話", time: "test147" },
      { date: "昨天", name: "test140", count: 1, missed: false, outgoing: true, type: "行動電話", time: "test148" },
      { date: "星期一", name: "test141", count: 1, missed: false, outgoing: false, type: "行動電話", time: "test149" },
      { date: "星期一", name: "test142", count: 2, missed: true, outgoing: false, type: "行動電話", time: "test150" }
    ]
  },

  /* ---------- KakaoTalk ---------- */
  kakao: {
    me: {                         // 手機使用者 = shotaroo0
      name: "Shotaro",
      status: "test164",
      avatar: "images/1_avatar.jpg",
      background: "images/kakao_me_bg.png"   // 點自己的資料時的全螢幕背景
    },
    friends: [
      {
        id: "f1",                       // 不要重複（用於網址）
        name: "SOHEE",                    // 252525252
        status: "test166",                  // 狀態訊息
        avatar: "images/2_avatar.jpg",
        unread: 2,       // 一開始在聊天列表顯示的未讀數
        messages: [
          { date: "test167" },
          { from: "them", text: "test168", time: "test169" },
          { from: "me", text: "test170", time: "test171" },
          { from: "them", text: "test172", time: "test173" },
          // 照片訊息：image 換成圖片路徑（不用寫 text）；me = 手機使用者，them = 對方
          { date: "2025년 6월 19일 목요일" },
          { from: "me", image: "images/1_msg_20250619.jpg", time: "test216" },
          { date: "2026년 7월 12일 일요일" },
          { from: "me", image: "images/1_msg_20260712.jpg", time: "test217" },
          { date: "2026년 8월 26일 수요일" },
          { from: "me", image: "images/1_msg_20260826.jpg", time: "test218" },
          { date: "2026년 9월 30일 수요일" },
          { from: "them", image: "images/2_msg_20260930.jpg", time: "test219" },
          { from: "them", image: "images/2_msg_20260930-2.jpg", time: "test220" },
          { from: "them", image: "images/2_msg_20260930-3.jpg", time: "test221" },
          { date: "2026년 10월 3일 토요일" },
          { from: "them", image: "images/2_msg_20261003.jpg", time: "test222" },
          { date: "2026년 10월 4일 일요일" },
          { from: "them", image: "images/2_msg_20261004.jpg", time: "test223" },
          { from: "me", image: "images/1_msg.jpg", time: "test224" }   // 1_msg.jpg 檔名沒有日期，先放最後
        ],
        // 關鍵字自動回覆：玩家傳的訊息「包含」任一個 keywords 就回 reply（可多句，依序送出）
        replies: [
          { keywords: ["test174"], reply: ["test175", "test176"] }
        ],
        defaultReply: []                  // 沒有符合任何關鍵字時的回覆；空的 = 不回
      },
      {
        id: "f2",                       // 不要重複（用於網址）
        name: "test177",
        status: "test178",                  // 狀態訊息
        avatar: "images/kakao_f2.png",
        unread: 0,       // 一開始在聊天列表顯示的未讀數
        messages: [
          { date: "test179" },
          { from: "them", text: "test180", time: "test181" },
          { from: "me", text: "test182", time: "test183" },
          { from: "them", text: "test184", time: "test185" }
        ],
        // 關鍵字自動回覆：玩家傳的訊息「包含」任一個 keywords 就回 reply（可多句，依序送出）
        replies: [
          { keywords: ["test186"], reply: ["test187", "test188"] }
        ],
        defaultReply: []                  // 沒有符合任何關鍵字時的回覆；空的 = 不回
      },
      {
        id: "f3",                       // 不要重複（用於網址）
        name: "test189",
        status: "test190",                  // 狀態訊息
        avatar: "images/kakao_f3.png",
        unread: 0,       // 一開始在聊天列表顯示的未讀數
        messages: [
          { date: "test191" },
          { from: "them", text: "test192", time: "test193" },
          { from: "me", text: "test194", time: "test195" },
          { from: "them", text: "test196", time: "test197" }
        ],
        // 關鍵字自動回覆：玩家傳的訊息「包含」任一個 keywords 就回 reply（可多句，依序送出）
        replies: [
          { keywords: ["test198"], reply: ["test199", "test200"] }
        ],
        defaultReply: []                  // 沒有符合任何關鍵字時的回覆；空的 = 不回
      }
    ],
    // 介面文字（韓文版 KakaoTalk）
    text: {
      friendsTitle: "친구",
      chatsTitle: "채팅",
      friendsCount: "친구 {n}",
      tabs: ["친구", "채팅", "오픈채팅", "쇼핑", "더보기"],
      inputPlaceholder: "메시지 입력",
      profileActions: ["나와의 채팅", "프로필 편집", "카카오스토리"],
      ampm: ["오전", "오후"],
      photoLabel: "사진"            // 聊天列表裡最後一則是照片時顯示的字
    }
  }
};
