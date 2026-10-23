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
    name: "fauiogl94",
    postsCount: "2",
    followersCount: "0",
    followingCount: "1",
    postsLabel: "貼文數",
    followersLabel: "粉絲數",
    followingLabel: "追蹤數",
    bio: ["test62", "test63"],     // 每一項 = 一行；@開頭的字會自動變藍色
    music: { title: "Nostalgic", artist: "No Guindce" },
    editProfileLabel: "編輯個人檔案",
    shareProfileLabel: "分享個人檔案",
    highlights: [
      { image: "images/ig_highlight_1.png", label: "mood" },
      { image: "images/ig_highlight_2.png", label: "🕺" },
      { image: "images/ig_highlight_3.png", label: "ㅇㄱ" },
      { image: "images/ig_highlight_4.png", label: "しゅう" }
    ],
    posts: [
      "images/ig_post_1.png", "images/ig_post_2.png"
    ],

    // 點最上方帳號名稱 → 切換帳號清單
    addAccountLabel: "新增帳號",   // 清單最下面「新增帳號」

    // 按「新增帳號」後的登入畫面（只是畫面，輸入的內容不會被送出或儲存）
    login: {
      logo: "images/login_logo.png",
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
        avatar: "images/ig2_avatar.png",
        hasStory: false,
        name: "test83",
        postsCount: "test84",
        followersCount: "test85",
        followingCount: "test86",
        bio: ["test87"],
        music: { title: "test88", artist: "test89" },
        highlights: [
          { image: "images/ig2_highlight_1.png", label: "test90" },
          { image: "images/ig2_highlight_2.png", label: "test91" }
        ],
        posts: [
          "images/ig2_post_1.png", "images/ig2_post_2.png", "images/ig2_post_3.png"
        ]
      },
      {
        username: "252525252",           // 登入用的帳號，也是頁面上方顯示的帳號名稱
        password: "031121",
        avatar: "images/ig3_avatar.png",
        hasStory: false,
        name: "test92",
        postsCount: "test93",
        followersCount: "test94",
        followingCount: "test95",
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
