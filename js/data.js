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
    wallpaper: "images/wallpaper.png",
    apps: [
      { id: "forum", label: "test1", icon: "images/icon_forum.png" },
      { id: "ig",    label: "test2", icon: "images/icon_insta.png" }
    ]
  },

  /* ---------- 匿名論壇 ---------- */
  forum: {
    logo: "images/forum_logo.png",
    siteTitle: "test3",
    listTitle: "test4",          // 文章列表框的標題
    adTitle: "test5",            // 廣告欄標題
    backLabel: "test6",          // 文章內頁「返回」
    commentLabel: "test7",       // 「留言」
    writeCommentLabel: "test8",  // 「寫留言」（目前不可點）
    newBadge: "test9",           // 留言數旁的 NEW 小標

    // 文章：順序 = 列表顯示順序。id 請保持不重複（用於網址 #/forum/id）
    posts: [
      {
        id: "1", date: "test10", title: "test11",
        avatar: "images/avatar_1.png", mood: "images/mood.png",
        content: "test12",
        photos: [],              // 內文下方要附的圖，例如 ["images/post_photo_1.png"]
        comments: [
          { name: "test13", text: "test14" },
          { name: "test15", text: "test16" }
        ]
      },
      {
        id: "2", date: "test17", title: "test18",
        avatar: "images/avatar_2.png", mood: "images/mood.png",
        content: "test19",
        photos: ["images/post_photo_2.png"],
        comments: [
          { name: "test20", text: "test21" }
        ]
      },
      {
        id: "3", date: "test22", title: "test23",
        avatar: "images/avatar_3.png", mood: "images/mood.png",
        content: "test24",
        photos: [],
        comments: [
          { name: "test25", text: "test26" },
          { name: "test27", text: "test28" },
          { name: "test29", text: "test30" }
        ]
      },
      {
        id: "4", date: "test31", title: "test32",
        avatar: "images/avatar_4.png", mood: "images/mood.png",
        content: "test33",
        photos: [],
        comments: []
      },
      {
        id: "5", date: "test34", title: "test35",
        avatar: "images/avatar_5.png", mood: "images/mood.png",
        content: "test36",
        photos: [],
        comments: [
          { name: "test37", text: "test38" }
        ]
      },
      {
        id: "6", date: "test39", title: "test40",
        avatar: "images/avatar_6.png", mood: "images/mood.png",
        content: "test41",
        photos: [],
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
    footerLinks: ["test46", "test47", "test48", "test49", "test50"],
    copyright: "test51"
  },

  /* ---------- Instagram ---------- */
  instagram: {
    username: "test52",
    note: "test53",               // 頭像上方的便利貼泡泡
    avatar: "images/ig_avatar.png",
    hasStory: true,              // true = 頭像外圈顯示限時動態框
    name: "test54",
    nameSuffix: "test55",         // 名字後面的灰色小字
    postsCount: "test56",
    followersCount: "test57",
    followingCount: "test58",
    postsLabel: "test59",
    followersLabel: "test60",
    followingLabel: "test61",
    bio: ["test62", "test63"],     // 每一項 = 一行；@開頭的字會自動變藍色
    music: { title: "test64", artist: "test65" },
    editProfileLabel: "test66",
    shareProfileLabel: "test67",
    highlights: [
      { image: "images/ig_highlight_1.png", label: "test68" },
      { image: "images/ig_highlight_2.png", label: "test69" },
      { image: "images/ig_highlight_3.png", label: "test70" },
      { image: "images/ig_highlight_4.png", label: "test71" }
    ],
    posts: [
      "images/ig_post_1.png", "images/ig_post_2.png", "images/ig_post_3.png",
      "images/ig_post_4.png", "images/ig_post_5.png", "images/ig_post_6.png",
      "images/ig_post_7.png", "images/ig_post_8.png", "images/ig_post_9.png"
    ]
  }
};
