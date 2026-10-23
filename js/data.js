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
    apps: [
      { id: "forum", label: "ANNMS Talk", icon: "images/icon_forum.png" },
      { id: "ig",    label: "Instagram", icon: "images/icon_insta.png" }
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
      { image: "images/ig_highlight_1.png", label: "mood",
        stories: [
          { image: "images/ig_hl1_story_1.png", time: "test103" },
          { image: "images/ig_hl1_story_2.png", time: "test104" }
        ] },
      { image: "images/ig_highlight_2.png", label: "🕺",
        stories: [
          { image: "images/ig_hl2_story_1.png", time: "test105" },
          { image: "images/ig_hl2_story_2.png", time: "test106" }
        ] },
      { image: "images/ig_highlight_3.png", label: "ㅇㄱ",
        stories: [
          { image: "images/ig_hl3_story_1.png", time: "test107" },
          { image: "images/ig_hl3_story_2.png", time: "test108" }
        ] },
      { image: "images/ig_highlight_4.png", label: "しゅう",
        stories: [
          { image: "images/ig_hl4_story_1.png", time: "test109" },
          { image: "images/ig_hl4_story_2.png", time: "test110" }
        ] }
    ],
    // 貼文：images 可放多張（左右滑動）；格子上顯示第一張
    posts: [
      {
        images: ["images/ig_post_1.png", "images/ig_post_1_2.png", "images/ig_post_1_3.png"],
        likes: "test111",
        likedBy: { avatar: "images/ig_liker.png", name: "test112" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test113",
        time: "test114"
      },
      {
        images: ["images/ig_post_2.png"],
        likes: "test115",
        likedBy: { avatar: "images/ig_liker.png", name: "test116" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      }
    ],

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
        avatar: "images/1-0.jpg",
        hasStory: false,
        name: "Shotaro",
        following: [],
        bio: ["test87"],
        music: { title: "test88", artist: "keshi" },
        highlights: [
          { image: "images/ig2_highlight_1.png", label: "test90" },
          { image: "images/ig2_highlight_2.png", label: "test91" }
        ],
        posts: [
      {
        images: ["images/2-0.jpg", "images/2-1.jpg", "images/2-2.jpg",],
        likes: "test115",
        likedBy: { avatar: "images/ig_liker.png", name: "test116" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      },
      {
        images: ["images/1-1.jpg",],
        likes: "test115",
        likedBy: { avatar: "images/ig_liker.png", name: "test116" },   // 「xxx 說讚」；不要的話整行刪掉
        caption: "test117",
        time: "test118"
      }
        ]
      },
      {
        username: "252525252",           // 登入用的帳號，也是頁面上方顯示的帳號名稱
        password: "031121",
        avatar: "images/1-00.jpg",
        hasStory: false,
        name: "SOHEE",
        following: [],
        bio: ["test96"],
        music: { title: "test97", artist: "test98" },
        highlights: [
          { image: "images/ig3_highlight_1.png", label: "test99" },
          { image: "images/ig3_highlight_2.png", label: "test100" }
        ],
        posts: [
          "images/ig3_post_1.png", "images/ig3_post_2.png", "images/ig3_post_3.png"
        ]
      }
    ]
  }
};
