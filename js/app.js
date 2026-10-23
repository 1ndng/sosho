(function () {
  'use strict';

  var D = window.SITE_DATA;
  var $ = function (sel, el) { return (el || document).querySelector(sel); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // 文字換行 \n → <br>
  function multiline(s) { return esc(s).replace(/\n/g, '<br>'); }

  /* ---------------- 狀態列時間 ---------------- */
  function tick() {
    var d = new Date();
    $('#sb-time').textContent = d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  tick();
  setInterval(tick, 15000);

  /* ---------------- 提示框 ---------------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg || D.notUpdatedText;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1600);
  }

  /* ---------------- 首頁 ---------------- */
  function renderHome() {
    var h = D.home;
    var home = $('#home');
    home.style.backgroundImage = 'url("' + h.wallpaper + '")';
    // 桌布下方的 Dock（和 iPhone 一樣不顯示名稱）
    home.innerHTML =
      '<div class="home-dock">' +
      h.apps.map(function (a) {
        return '<a class="app-icon" href="#/' + esc(a.id) + '" aria-label="' + esc(a.label) + '">' +
          '<img src="' + esc(a.icon) + '" alt=""></a>';
      }).join('') +
      '</div>';
  }

  /* ---------------- 論壇 ---------------- */
  // 已讀文章（存在瀏覽器裡，下次打開仍記得）
  var READ_KEY = 'sosho-read-posts';
  var readPosts = {};
  try { readPosts = JSON.parse(localStorage.getItem(READ_KEY)) || {}; } catch (e) {}
  function markRead(id) {
    readPosts[id] = 1;
    try { localStorage.setItem(READ_KEY, JSON.stringify(readPosts)); } catch (e) {}
  }

  function forumFooter() {
    var f = D.forum;
    return '<footer class="f-footer">' + esc(f.copyright) + '</footer>';
  }

  function renderForumList() {
    var f = D.forum;
    var list = (f.posts || []).map(function (p) {
      // 未讀 ❗️、已讀 ❕
      return '<li><a href="#/forum/' + encodeURIComponent(p.id) + '">' +
        '<span class="mark">' + (readPosts[p.id] ? '❕' : '❗️') + '</span>' +
        '<span class="p-title">' + esc(p.title) + '</span></a></li>';
    }).join('');

    var ads = (f.ads || []).map(function (a, i) {
      return '<a class="ad" href="' + (a.link ? esc(a.link) : '#') + '" data-ad="' + i + '"' +
        (a.link ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<img src="' + esc(a.image) + '" alt=""></a>';
    }).join('');

    $('#forum-scroll').innerHTML =
      '<div class="f-body">' +
        '<main class="f-main"><div class="f-box">' +
          '<div class="f-box-title">' + esc(f.listTitle) + '</div>' +
          '<ul class="f-list">' + list + '</ul>' +
        '</div></main>' +
        '<aside class="f-ads">' + ads +
        '</aside>' +
      '</div>' + forumFooter();
  }

  function renderPost(id) {
    var f = D.forum;
    var p = f.posts.filter(function (x) { return String(x.id) === String(id); })[0];
    if (!p) { renderForumList(); return; }
    markRead(p.id);

    var cs = p.comments || [];
    var comments = cs.map(function (c) {
      return '<div class="pd-comment"><b>' + esc(c.name) + '</b><span class="pd-colon">:</span>' +
        '<span class="pd-ctext">' + multiline(c.text) + '</span></div>';
    }).join('');

    $('#forum-scroll').innerHTML =
      '<div class="pd">' +
        '<div class="pd-top">' +
        '<a class="pd-back" href="#/forum">‹ ' + esc(f.backLabel) + '</a>' +
        '<div class="pd-head">' + esc(p.title) + '</div>' +
        '<div class="pd-author">' + esc(p.author) + '</div>' +
        '<div class="pd-content">' + multiline(p.content) + '</div>' +
        '</div>' +
        '<div class="pd-sep"></div>' +
        '<div class="pd-cbar">' + esc(f.commentLabel) + ' (' + cs.length + ')</div>' +
        comments +
      '</div>' + forumFooter();
  }

  // 廣告沒有連結時 → 顯示尚未更新
  $('#forum-scroll').addEventListener('click', function (e) {
    var ad = e.target.closest('.ad');
    if (ad && !(D.forum.ads || [])[ad.dataset.ad].link) { e.preventDefault(); toast(); }
  });

  /* ---------------- Instagram ---------------- */
  var ICON = {
    plus: '<svg viewBox="0 0 24 24"><path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>',
    chevron: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#3b6ef5"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M3 5h18M3 12h18M3 19h18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    play: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M10 8l6 4-6 4z" fill="currentColor"/></svg>',
    grid: '<svg viewBox="0 0 24 24"><g fill="currentColor"><rect x="2" y="2" width="5.5" height="5.5" rx="1.3"/><rect x="9.25" y="2" width="5.5" height="5.5" rx="1.3"/><rect x="16.5" y="2" width="5.5" height="5.5" rx="1.3"/><rect x="2" y="9.25" width="5.5" height="5.5" rx="1.3"/><rect x="9.25" y="9.25" width="5.5" height="5.5" rx="1.3"/><rect x="16.5" y="9.25" width="5.5" height="5.5" rx="1.3"/><rect x="2" y="16.5" width="5.5" height="5.5" rx="1.3"/><rect x="9.25" y="16.5" width="5.5" height="5.5" rx="1.3"/><rect x="16.5" y="16.5" width="5.5" height="5.5" rx="1.3"/></g></svg>',
    repost: '<svg viewBox="0 0 24 24"><path d="M19 9.5V8a3 3 0 0 0-3-3H5m0 0 3-3M5 5l3 3M5 14.5V16a3 3 0 0 0 3 3h11m0 0-3-3m3 3-3 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20.5s-8-4.9-8-11A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8 2.9c0 6.1-8 11-8 11z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>',
    comment: '<svg viewBox="0 0 24 24"><path d="M20.5 12a8.5 8.5 0 1 1-3.9-7.1A8.5 8.5 0 0 1 20.5 12l.9 6.6-5.2-1.6" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>',
    send: '<svg viewBox="0 0 24 24"><path d="M21.5 3 2.5 9.5l7.2 3.1L13 21.5zM9.7 12.6 21.5 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>',
    bookmark: '<svg viewBox="0 0 24 24"><path d="M5.5 3h13v18L12 14.8 5.5 21z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>',
    saved: '<svg viewBox="0 0 24 24"><path d="M5.5 3h13v18L12 14.8 5.5 21z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>',
    archive: '<svg viewBox="0 0 24 24"><path d="M3.5 5.5v4h4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 9.5A9 9 0 1 1 3 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    star: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="m12 6.8 1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="currentColor"/></svg>',
    right: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    more: '<svg viewBox="0 0 24 24"><path d="M3 8h18M3 16h12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="7" stroke="currentColor" stroke-width="2.2" fill="none"/><path d="m16 16 5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    home: '<svg viewBox="0 0 24 24"><path d="M3.5 10.5 12 3l8.5 7.5V21h-5.5v-6h-6v6H3.5z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>',
    add: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 7.5v9M7.5 12h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    reels: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 8.5h18M8.5 3l3 5.5M14 3l3 5.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M10 11.5v6l5-3z" fill="currentColor"/></svg>',
    addUser: '<svg viewBox="0 0 24 24"><circle cx="14" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6.5 21c.6-4 3.6-6.3 7.5-6.3s6.9 2.3 7.5 6.3M5 6v6M2 9h6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    heartFill: '<svg viewBox="0 0 24 24"><path d="M12 20.5s-8-4.9-8-11A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8 2.9c0 6.1-8 11-8 11z" fill="currentColor"/></svg>',
    bookmarkFill: '<svg viewBox="0 0 24 24"><path d="M5.5 3h13v18L12 14.8 5.5 21z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    plusCircle: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 7.5v9M7.5 12h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4L12 5.6M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    dots: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="19" cy="12" r="1.8" fill="currentColor"/></svg>',
    tagged: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6.5 20.5c1-3 3-4.3 5.5-4.3s4.5 1.3 5.5 4.3" stroke="currentColor" stroke-width="2" fill="none"/></svg>'
  };

  function bioLine(s) {
    return esc(s).replace(/(@[\w.]+)/g, '<span class="ig-mention" data-na>$1</span>');
  }

  /* ---- 帳號：主帳號 + 用帳密登入的其他帳號（登入狀態存在瀏覽器裡） ---- */
  var ACC_KEY = 'sosho-ig-accounts';
  var accState = { current: null, loggedIn: [] };
  try { accState = JSON.parse(localStorage.getItem(ACC_KEY)) || accState; } catch (e) {}
  function saveAcc() {
    try { localStorage.setItem(ACC_KEY, JSON.stringify(accState)); } catch (e) {}
  }
  function otherAccounts() { return D.instagram.otherAccounts || []; }
  function findAccount(username) {
    if (!username || username === D.instagram.username) return D.instagram;
    return otherAccounts().filter(function (a) { return a.username === username; })[0] || null;
  }
  // 目前帳號；data.js 改過帳號名稱導致找不到時，回到主帳號
  function currentAccount() { return findAccount(accState.current) || D.instagram; }
  // 帳號清單：主帳號 + 已登入過的帳號
  function listedAccounts() {
    return [D.instagram].concat(accState.loggedIn.map(findAccount).filter(function (a) {
      return a && a !== D.instagram;
    }));
  }

  // 看過的限時動態、追蹤狀態（存在瀏覽器裡）
  var STORE_KEY = 'sosho-ig-state';
  // likes / saves / reposts / commentLikes / storyLikes 的 key 都是「目前帳號|對象」，換帳號各自分開
  var store = { seen: {}, follows: {}, likes: {}, saves: {}, reposts: {}, comments: {}, commentLikes: {}, storyLikes: {} };
  try {
    var saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved) Object.keys(store).forEach(function (k) { if (saved[k]) store[k] = saved[k]; });
  } catch (e) {}
  function saveStore() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {}
  }
  // 追蹤是「目前登入的帳號」追蹤「對方」，換帳號登入就各自分開
  function followKey(g) { return currentAccount().username + '>' + g.username; }

  // a 有沒有追蹤 b：玩家按過追蹤／取消就以那個為準，否則看 data.js 的 following 名單
  function isFollowing(a, b) {
    var k = a.username + '>' + b.username;
    if (k in store.follows) return !!store.follows[k];
    return (a.following || []).indexOf(b.username) >= 0;
  }
  function followingOf(g) {
    return allProfiles().filter(function (b) { return b !== g && isFollowing(g, b); });
  }
  function followersOf(g) {
    return allProfiles().filter(function (a) { return a !== g && isFollowing(a, g); });
  }
  // 有手動填數字就用手動的，沒有就自動計算
  function counts(g) {
    return {
      posts: g.postsCount != null ? g.postsCount : (g.posts || []).length,
      followers: g.followersCount != null ? g.followersCount : followersOf(g).length,
      following: g.followingCount != null ? g.followingCount : followingOf(g).length
    };
  }

  // 搜尋得到的所有帳號：主帳號 + 可登入帳號 + 只能被搜尋的帳號
  function allProfiles() {
    return [D.instagram].concat(otherAccounts(), D.instagram.searchOnlyAccounts || []);
  }
  function profileByName(name) {
    return allProfiles().filter(function (a) { return a.username === name; })[0] || null;
  }

  // g = 要顯示的帳號；base = 這個帳號頁面的網址（自己 #/ig，別人 #/ig/u/帳號）
  function renderIG(g, base) {
    var L = D.instagram;          // 共用文字（按鈕、標籤）
    g = g || currentAccount();
    base = base || '#/ig';
    var visitor = base !== '#/ig';   // true = 從搜尋點進去看別人的頁面
    var ring = g.hasStory ? ' has-story' + (store.seen[g.username] ? ' seen' : '') : '';
    var followed = visitor && isFollowing(currentAccount(), g);
    var c = counts(g);
    // 欄位被刪掉或註解掉時也不會整頁空白
    var bio = g.bio || [], highlights = g.highlights || [], posts = g.posts || [];
    var na = ' data-na';   // 標記：點擊後跳出「尚未更新」

    $('#ig-scroll').innerHTML =
      (visitor
        ? '<div class="ig-top">' +
            '<a class="ig-ico" href="#/ig/search">' + ICON.back + '</a>' +
            '<span class="ig-user">' + esc(g.username) + '</span>' +
            '<span class="ig-top-r"><button class="ig-ico"' + na + '>' + ICON.more + '</button></span>' +
          '</div>'
        : '<div class="ig-top">' +
            '<span></span>' +
            '<button class="ig-user" data-sheet>' + esc(g.username) + ICON.chevron + '</button>' +
            '<span class="ig-top-r">' +
              '<a class="ig-ico" href="#/ig/settings">' + ICON.menu + '</a>' +
            '</span>' +
          '</div>') +

      '<div class="ig-profile">' +
        // 有限時動態 → 點頭像進入；沒有 → 尚未更新。看過的限時動態外框變淺灰色
        (g.story && g.story.length
          ? '<a class="ig-avatar' + ring + '" href="' + base + '/story/me">'
          : '<button class="ig-avatar' + ring + '"' + na + '>') +
          '<img src="' + esc(g.avatar) + '" alt="">' +
        (g.story && g.story.length ? '</a>' : '</button>') +
        '<div class="ig-right">' +
          '<div class="ig-name">' + esc(g.name) + '</div>' +
          '<div class="ig-stats">' +
            '<div><b>' + esc(c.posts) + '</b>' + esc(L.postsLabel) + '</div>' +
            '<a href="' + base + '/follows/followers"><b>' + esc(c.followers) + '</b>' + esc(L.followersLabel) + '</a>' +
            '<a href="' + base + '/follows/following"><b>' + esc(c.following) + '</b>' + esc(L.followingLabel) + '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +

      (bio.length ? '<div class="ig-bio">' + bio.map(function (l) { return '<div>' + bioLine(l) + '</div>'; }).join('') + '</div>' : '') +

      (g.music && g.music.title ?
        '<button class="ig-music"' + na + '>' + ICON.play +
          '<b>' + esc(g.music.title) + '</b><span> · ' + esc(g.music.artist) + '</span></button>' : '') +

      (visitor
        ? '<div class="ig-btns ig-btns-visit">' +
            (followed
              ? '<button class="ig-following" data-follow>' + esc(L.followingButtonLabel) + ICON.chevron + '</button>'
              : '<button class="ig-follow" data-follow>' + esc(L.followLabel) + '</button>') +
            '<button' + na + '>' + esc(L.messageLabel) + '</button>' +
            '<button class="ig-btn-sq"' + na + '>' + ICON.addUser + '</button>' +
          '</div>'
        : '<div class="ig-btns">' +
            '<button>' + esc(L.editProfileLabel) + '</button>' +
            '<button>' + esc(L.shareProfileLabel) + '</button>' +
          '</div>') +

      (highlights.length ? '<div class="ig-hl">' + highlights.map(function (h, i) {
        return '<a class="ig-hl-item" href="' + base + '/story/' + i + '"><span class="ig-hl-img"><img src="' + esc(h.image) + '" alt=""></span>' +
          '<span class="ig-hl-label">' + esc(h.label) + '</span></a>';
      }).join('') + '</div>' : '') +

      // 貼文／轉發／被標註 三個分頁，在同一頁切換
      '<div class="ig-tabs">' +
        '<button data-ptab="grid" class="active">' + ICON.grid + '</button>' +
        '<button data-ptab="reposts">' + ICON.repost + '</button>' +
        '<button data-ptab="tagged">' + ICON.tagged + '</button>' +
      '</div>' +
      '<div data-pane="grid">' + gridHTML(posts.map(function (_, i) { return { owner: g, idx: i }; }), '') + '</div>' +
      '<div data-pane="reposts" hidden>' + gridHTML(repostsOf(g), T().noReposts) + '</div>' +
      '<div data-pane="tagged" hidden>' + gridHTML(taggedOf(g), T().noTagged) + '</div>';

    if (visitor) { $('#ig-overlay').innerHTML = ''; return; }

    // 切換帳號清單（從下方滑出）
    $('#ig-overlay').innerHTML =
      '<div class="ig-sheet-wrap" id="ig-sheet">' +
        '<div class="ig-sheet-bg" data-close-sheet></div>' +
        '<div class="ig-sheet">' +
          '<div class="ig-sheet-handle" data-close-sheet></div>' +
          '<div class="ig-acc-list">' +
            listedAccounts().map(function (a) {
              return '<button class="ig-acc" data-switch="' + esc(a.username) + '">' +
                '<img src="' + esc(a.avatar) + '" alt="">' +
                '<span class="ig-acc-name">' + esc(a.username) + '</span>' +
                (a === g ? '<span class="ig-acc-check">' + ICON.check + '</span>' : '') +
              '</button>';
            }).join('') +
            '<a class="ig-acc" href="#/ig/login">' +
              '<span class="ig-acc-plus">' + ICON.plus + '</span>' +
              '<span class="ig-acc-name">' + esc(L.addAccountLabel) + '</span>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // 貼文可以只寫圖片路徑（字串），或寫成 { images: [...], caption, comments, tagged, ... }
  function postObj(p) {
    if (typeof p === 'string') return { images: [p], comments: [], tagged: [] };
    p = p || {};
    return {
      images: p.images && p.images.length ? p.images : [''],
      likes: p.likes, likedBy: p.likedBy, caption: p.caption, time: p.time,
      comments: p.comments || [], tagged: p.tagged || []
    };
  }

  // IG 互動用的固定文字（data.js 的 instagram.text，沒寫就用預設）
  var T_DEFAULT = {
    commentsTitle: '留言', commentPlaceholder: '為 {user} 新增留言……', postButton: '發佈', reply: '回覆',
    viewAllComments: '查看全部 {n} 則留言', noComments: '還沒有留言', justNow: '剛剛',
    shareTitle: '分享', sendButton: '傳送', sent: '已傳送', copyLink: '複製連結', linkCopied: '已複製連結',
    addToStory: '新增到限時動態', reposted: '已轉發到你的個人檔案', unreposted: '已取消轉發',
    savedTitle: '已儲存', noSaved: '還沒有儲存任何貼文', noReposts: '還沒有轉發任何貼文', noTagged: '還沒有被標註的相片',
    storyMessageSent: '訊息已傳送'
  };
  function T() {
    var t = D.instagram.text || {}, out = {};
    Object.keys(T_DEFAULT).forEach(function (k) { out[k] = t[k] != null ? t[k] : T_DEFAULT[k]; });
    return out;
  }
  function fill(str, vars) {
    return String(str).replace(/\{(\w+)\}/g, function (_, k) { return vars[k] != null ? vars[k] : ''; });
  }

  function postKey(owner, idx) { return owner.username + '/' + idx; }
  function actKey(k) { return currentAccount().username + '|' + k; }
  function postHref(owner, idx) {
    return owner === currentAccount() ? '#/ig/post/' + idx : '#/ig/u/' + encodeURIComponent(owner.username) + '/post/' + idx;
  }
  function refFromKey(k) {
    var cut = k.lastIndexOf('/'), owner = profileByName(k.slice(0, cut)), idx = +k.slice(cut + 1);
    return owner && (owner.posts || [])[idx] != null ? { owner: owner, idx: idx } : null;
  }
  function gridHTML(refs, emptyText) {
    if (!refs.length) return emptyText ? '<div class="ig-empty">' + esc(emptyText) + '</div>' : '';
    return '<div class="ig-grid">' + refs.map(function (r) {
      var po = postObj(r.owner.posts[r.idx]);
      return '<a href="' + postHref(r.owner, r.idx) + '"><img src="' + esc(po.images[0]) + '" alt="">' +
        (po.images.length > 1 ? '<span class="ig-multi"></span>' : '') + '</a>';
    }).join('') + '</div>';
  }
  // 轉發：data.js 的 reposts（"帳號/貼文編號"）＋玩家按的轉發（新的在前）
  function repostsOf(g) {
    var mine = Object.keys(store.reposts).filter(function (k) {
      return store.reposts[k] && k.indexOf(g.username + '|') === 0;
    }).sort(function (x, y) { return store.reposts[y] - store.reposts[x]; }).map(function (k) { return k.slice(g.username.length + 1); });
    var seen = {};
    return mine.concat(g.reposts || []).filter(function (k) { return !seen[k] && (seen[k] = 1); }).map(refFromKey).filter(Boolean);
  }
  // 被標註：任何帳號的貼文裡 tagged 有這個帳號
  function taggedOf(g) {
    var out = [];
    allProfiles().forEach(function (o) {
      (o.posts || []).forEach(function (p, i) {
        if (postObj(p).tagged.indexOf(g.username) >= 0) out.push({ owner: o, idx: i });
      });
    });
    return out;
  }
  function savedOf() {
    var me = currentAccount().username + '|';
    return Object.keys(store.saves).filter(function (k) { return store.saves[k] && k.indexOf(me) === 0; })
      .sort(function (x, y) { return store.saves[y] - store.saves[x]; })
      .map(function (k) { return refFromKey(k.slice(me.length)); }).filter(Boolean);
  }

  function backBtn(href) {
    return '<a class="ig-round-back" href="' + (href || '#/ig') + '">' + ICON.back + '</a>';
  }
  // 返回上一頁（從轉發、已儲存點進貼文時回到原本的地方）
  function historyBackBtn(fallback) {
    return '<a class="ig-round-back" href="' + fallback + '" data-back>' + ICON.back + '</a>';
  }

  // 設定和動態（右上角三條線）；「已儲存」會進入已儲存的貼文
  function renderIGSettings() {
    var st = D.instagram.settings || { sections: [] };
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-pagehead">' + backBtn() + '<div class="ig-pagehead-t"><b>' + esc(st.title) + '</b></div></div>' +
      st.sections.map(function (sec) {
        return '<section class="ig-set-sec">' +
          '<div class="ig-set-title">' + esc(sec.title) + '</div>' +
          (sec.items || []).map(function (it) {
            var inner =
              '<span class="ig-set-ico">' + (ICON[it.icon] || '') + '</span>' +
              '<span class="ig-set-label">' + esc(it.label) + '</span>' +
              (it.value != null ? '<span class="ig-set-val">' + esc(it.value) + '</span>' : '') +
              '<span class="ig-set-arrow">' + ICON.right + '</span>';
            return it.icon === 'saved'
              ? '<a class="ig-set-row" href="#/ig/saved">' + inner + '</a>'
              : '<button class="ig-set-row" data-na>' + inner + '</button>';
          }).join('') +
        '</section>';
      }).join('');
  }

  function renderIGSaved() {
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-pagehead">' + backBtn('#/ig/settings') + '<div class="ig-pagehead-t"><b>' + esc(T().savedTitle) + '</b></div></div>' +
      gridHTML(savedOf(), T().noSaved);
  }

  /* ---- 貼文頁 ---- */
  var curPost = null;   // { owner, idx, p, key }

  function likeCount(base, liked) {
    if (base == null || base === '') return liked ? '1' : '';
    var n = String(base).replace(/,/g, '');
    if (/^\d+$/.test(n)) return (+n + (liked ? 1 : 0)).toLocaleString('en-US');
    return String(base);   // 像 "1.2萬" 這種文字就照原樣顯示
  }
  function allComments(cp) {
    var added = store.comments[cp.key] || [];
    return cp.p.comments.concat(added.map(function (c) { return { user: c.user, text: c.text, time: T().justNow, mine: true }; }));
  }
  function avatarOf(user, fallback) {
    var a = profileByName(user);
    return a ? a.avatar : (fallback || '');
  }

  function postActionsHTML() {
    var cp = curPost, L = D.instagram, t = T();
    var liked = !!store.likes[actKey(cp.key)], saved = !!store.saves[actKey(cp.key)], reposted = !!store.reposts[actKey(cp.key)];
    var nC = allComments(cp).length, likes = likeCount(cp.p.likes, liked);
    return '<div class="ig-actions">' +
        '<button data-act="like" class="' + (liked ? 'on-like' : '') + '">' + (liked ? ICON.heartFill : ICON.heart) + '</button>' +
        (likes ? '<span class="ig-count">' + esc(likes) + '</span>' : '') +
        '<button data-act="comments">' + ICON.comment + '</button>' +
        (nC ? '<span class="ig-count">' + nC + '</span>' : '') +
        '<button data-act="repost" class="' + (reposted ? 'on-repost' : '') + '">' + ICON.repost + '</button>' +
        '<button data-act="share">' + ICON.send + '</button>' +
        '<button data-act="save" class="ig-act-save">' + (saved ? ICON.bookmarkFill : ICON.bookmark) + '</button>' +
      '</div>' +
      (cp.p.likedBy && cp.p.likedBy.name ?
        '<div class="ig-likedby"><img src="' + esc(cp.p.likedBy.avatar || avatarOf(cp.p.likedBy.name)) + '" alt=""><b>' + esc(cp.p.likedBy.name) + '</b>' + esc(L.likedBySuffix) + '</div>' : '') +
      (cp.p.caption ? '<div class="ig-caption"><b>' + esc(cp.owner.username) + '</b> ' + multiline(cp.p.caption) + '</div>' : '') +
      (nC ? '<button class="ig-viewall" data-act="comments">' + esc(fill(t.viewAllComments, { n: nC })) + '</button>' : '') +
      (cp.p.time ? '<div class="ig-time">' + esc(cp.p.time) + '</div>' : '');
  }
  function refreshPostActions() {
    var box = $('#ig-post-actions');
    if (box && curPost) box.innerHTML = postActionsHTML();
  }

  function renderIGPost(idx, g, base) {
    var L = D.instagram;
    g = g || currentAccount(); base = base || '#/ig';
    var raw = (g.posts || [])[idx];
    if (raw == null) { location.replace(base); return; }
    var p = postObj(raw), n = p.images.length;
    curPost = { owner: g, idx: idx, p: p, key: postKey(g, idx) };
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-pagehead">' + historyBackBtn(base) +
        '<div class="ig-pagehead-t"><b>' + esc(L.postTitle) + '</b><small>' + esc(g.username) + '</small></div></div>' +
      '<div class="ig-post-user">' +
        '<a class="ig-post-user-link" href="' + (g === currentAccount() ? '#/ig' : '#/ig/u/' + encodeURIComponent(g.username)) + '">' +
          '<img src="' + esc(g.avatar) + '" alt=""><b>' + esc(g.username) + '</b></a>' +
        '<button class="ig-ico" data-na>' + ICON.more + '</button>' +
      '</div>' +
      '<div class="ig-car-wrap">' +
        '<div class="ig-car" id="ig-car">' + p.images.map(function (src) {
          return '<img src="' + esc(src) + '" alt="">';
        }).join('') + '</div>' +
        (n > 1 ? '<span class="ig-car-count" id="ig-car-count">1/' + n + '</span>' : '') +
        '<span class="ig-bigheart" id="ig-bigheart">' + ICON.heartFill + '</span>' +
      '</div>' +
      (n > 1 ? '<div class="ig-dots" id="ig-dots">' + p.images.map(function (_, i) {
        return '<i' + (i ? '' : ' class="on"') + '></i>';
      }).join('') + '</div>' : '<div class="ig-dots"></div>') +
      '<div id="ig-post-actions">' + postActionsHTML() + '</div>';

    var car = $('#ig-car');
    if (n > 1) car.addEventListener('scroll', function () {
      var i = Math.round(car.scrollLeft / car.clientWidth);
      $('#ig-car-count').textContent = (i + 1) + '/' + n;
      document.querySelectorAll('#ig-dots i').forEach(function (d, k) { d.classList.toggle('on', k === i); });
    });
    // 圖片點兩下 → 按讚（只會按讚，不會取消）
    var lastTap = 0;
    car.addEventListener('click', function () {
      var now = Date.now();
      if (now - lastTap < 320) {
        store.likes[actKey(curPost.key)] = 1; saveStore(); refreshPostActions();
        var h = $('#ig-bigheart'); h.classList.remove('pop'); void h.offsetWidth; h.classList.add('pop');
        lastTap = 0;
      } else lastTap = now;
    });
  }

  function slideUp() {
    var el = $('#ig-sheet');
    void el.offsetWidth;
    el.classList.add('show');
  }

  /* ---- 留言 ---- */
  function commentsListHTML() {
    var list = allComments(curPost), t = T();
    if (!list.length) return '<div class="ig-empty">' + esc(t.noComments) + '</div>';
    return list.map(function (c, i) {
      var ck = actKey(curPost.key + '#' + i), liked = !!store.commentLikes[ck];
      var href = profileByName(c.user) ? (profileByName(c.user) === currentAccount() ? '#/ig' : '#/ig/u/' + encodeURIComponent(c.user)) : null;
      var av = '<img src="' + esc(avatarOf(c.user, c.avatar)) + '" alt="">';
      return '<div class="ig-cmt">' +
        (href ? '<a href="' + href + '">' + av + '</a>' : av) +
        '<div class="ig-cmt-body">' +
          '<div class="ig-cmt-head"><b>' + esc(c.user) + '</b><span>' + esc(c.time || '') + '</span></div>' +
          '<div class="ig-cmt-text">' + multiline(c.text) + '</div>' +
          '<button class="ig-cmt-reply" data-reply="' + esc(c.user) + '">' + esc(t.reply) + '</button>' +
        '</div>' +
        '<button class="ig-cmt-like' + (liked ? ' on-like' : '') + '" data-clike="' + i + '">' + (liked ? ICON.heartFill : ICON.heart) + '</button>' +
      '</div>';
    }).join('');
  }
  function openComments() {
    var t = T(), me = currentAccount();
    $('#ig-overlay').innerHTML =
      '<div class="ig-sheet-wrap" id="ig-sheet">' +
        '<div class="ig-sheet-bg" data-close-sheet></div>' +
        '<div class="ig-sheet ig-sheet-tall">' +
          '<div class="ig-sheet-handle" data-close-sheet></div>' +
          '<div class="ig-sheet-title">' + esc(t.commentsTitle) + '</div>' +
          '<div class="ig-cmt-list" id="ig-cmt-list">' + commentsListHTML() + '</div>' +
          '<form class="ig-cmt-form" id="ig-cmt-form" autocomplete="off">' +
            '<img src="' + esc(me.avatar) + '" alt="">' +
            '<input name="c" placeholder="' + esc(fill(t.commentPlaceholder, { user: curPost.owner.username })) + '" autocomplete="off">' +
            '<button type="submit" disabled>' + esc(t.postButton) + '</button>' +
          '</form>' +
        '</div>' +
      '</div>';
    slideUp();
    var f = $('#ig-cmt-form');
    f.c.addEventListener('input', function () { f.querySelector('button').disabled = !f.c.value.trim(); });
  }

  /* ---- 分享 ---- */
  function openShare() {
    var t = T(), me = currentAccount();
    // 追蹤中的帳號排前面
    var people = followingOf(me).concat(allProfiles().filter(function (a) {
      return a !== me && !isFollowing(me, a);
    }));
    $('#ig-overlay').innerHTML =
      '<div class="ig-sheet-wrap" id="ig-sheet">' +
        '<div class="ig-sheet-bg" data-close-sheet></div>' +
        '<div class="ig-sheet">' +
          '<div class="ig-sheet-handle" data-close-sheet></div>' +
          '<div class="ig-sheet-title">' + esc(t.shareTitle) + '</div>' +
          '<div class="ig-share-grid">' + people.map(function (a) {
            return '<button class="ig-share-p" data-pick="' + esc(a.username) + '">' +
              '<span class="ig-share-av"><img src="' + esc(a.avatar) + '" alt=""><i>' + ICON.check + '</i></span>' +
              '<span>' + esc(a.username) + '</span></button>';
          }).join('') + '</div>' +
          '<div class="ig-share-acts">' +
            '<button data-na><span>' + ICON.plusCircle + '</span>' + esc(t.addToStory) + '</button>' +
            '<button data-copylink><span>' + ICON.link + '</span>' + esc(t.copyLink) + '</button>' +
          '</div>' +
          '<button class="ig-share-send" id="ig-share-send" hidden>' + esc(t.sendButton) + '</button>' +
        '</div>' +
      '</div>';
    slideUp();
  }

  // 限時動態 / 精選動態（which = "me" 或精選的編號）
  var storyTimer = null;
  function stopStory() {
    clearTimeout(storyTimer);
    $('#phone').classList.remove('dark-status');
  }
  function renderIGStory(which, g, base) {
    var L = D.instagram, items;
    g = g || currentAccount(); base = base || '#/ig';
    if (which === 'me') items = g.story || [];
    else {
      var h = (g.highlights || [])[which];
      items = h ? (h.stories && h.stories.length ? h.stories : [{ image: h.image }]) : [];
    }
    if (!items.length) { location.replace(base); return; }
    if (which === 'me') { store.seen[g.username] = 1; saveStore(); }
    renderIG(g, base);   // 背後保留個人頁，關掉時直接回到這裡
    $('#phone').classList.add('dark-status');
    var i = 0;
    $('#ig-overlay').innerHTML =
      '<div class="ig-story">' +
        '<div class="ig-story-bars">' + items.map(function () { return '<i><b></b></i>'; }).join('') + '</div>' +
        '<div class="ig-story-head">' +
          '<img src="' + esc(g.avatar) + '" alt="">' +
          '<b>' + esc(g.username) + '</b><span class="ig-story-time"></span>' +
          '<button class="ig-ico" data-na>' + ICON.more + '</button>' +
          '<a class="ig-ico" href="' + base + '">' + ICON.close + '</a>' +
        '</div>' +
        '<div class="ig-story-img"><img alt=""></div>' +
        '<div class="ig-story-tap"><span data-prev></span><span data-next></span></div>' +
        '<form class="ig-story-foot" id="ig-story-form" autocomplete="off">' +
          '<input class="ig-story-msg" name="m" placeholder="' + esc(L.storyMessagePlaceholder) + '" autocomplete="off">' +
          '<button type="button" class="ig-ico" id="ig-story-like">' + ICON.heart + '</button>' +
          '<button type="submit" class="ig-ico">' + ICON.send + '</button>' +
        '</form>' +
      '</div>';

    var bars = document.querySelectorAll('.ig-story-bars i');
    var startedAt = 0, remaining = 5000;
    function likeKey() { return actKey(g.username + '/story/' + which + '/' + i); }
    function paintLike() {
      var on = !!store.storyLikes[likeKey()], btn = $('#ig-story-like');
      btn.innerHTML = on ? ICON.heartFill : ICON.heart;
      btn.classList.toggle('on-like', on);
    }
    function pause() {
      clearTimeout(storyTimer);
      remaining = Math.max(300, remaining - (Date.now() - startedAt));
      bars[i].firstChild.style.animationPlayState = 'paused';
    }
    function resume() {
      if (!document.body.contains(form)) return;   // 已經離開限時動態
      startedAt = Date.now();
      bars[i].firstChild.style.animationPlayState = 'running';
      clearTimeout(storyTimer);
      storyTimer = setTimeout(function () { show(i + 1); }, remaining);
    }
    function show(k) {
      if (k < 0) k = 0;
      if (k >= items.length) { location.hash = base; return; }
      i = k;
      $('.ig-story-img img').src = items[i].image;
      $('.ig-story-time').textContent = items[i].time || '';
      bars.forEach(function (b, j) {
        b.className = j < i ? 'done' : '';
        b.firstChild.style.animation = 'none';
      });
      void bars[i].offsetWidth;                 // 重新開始進度條動畫
      bars[i].firstChild.style.animation = '';
      bars[i].className = 'run';
      remaining = 5000; startedAt = Date.now();
      clearTimeout(storyTimer);
      storyTimer = setTimeout(function () { show(i + 1); }, 5000);
      paintLike();
    }
    // 輸入訊息時暫停；送出後顯示「訊息已傳送」
    var form = $('#ig-story-form');
    form.m.addEventListener('focus', pause);
    form.m.addEventListener('blur', resume);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.m.value.trim()) return;
      form.m.value = '';
      form.m.blur();
      toast(T().storyMessageSent);
    });
    $('#ig-story-like').onclick = function () {
      var k = likeKey();
      if (store.storyLikes[k]) delete store.storyLikes[k]; else store.storyLikes[k] = 1;
      saveStore(); paintLike();
    };
    $('.ig-story-tap').onclick = function (e) {
      if (e.target.hasAttribute('data-prev')) show(i - 1); else show(i + 1);
    };
    show(0);
  }

  // 粉絲／追蹤中名單（tab = "followers" 或 "following"）
  function renderIGFollows(tab, g, base) {
    var L = D.instagram;
    g = g || currentAccount(); base = base || '#/ig';
    var c = counts(g);
    var list = tab === 'followers' ? followersOf(g) : followingOf(g);
    var me = currentAccount();
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-pagehead">' + backBtn(base) +
        '<div class="ig-pagehead-t"><b>' + esc(g.username) + '</b></div>' +
        '<button class="ig-round-r" data-na>' + ICON.addUser + '</button>' +
      '</div>' +
      '<div class="ig-ftabs">' +
        '<a href="' + base + '/follows/followers"' + (tab === 'followers' ? ' class="on"' : '') + '>' + esc(c.followers) + ' ' + esc(L.followersLabel) + '</a>' +
        '<a href="' + base + '/follows/following"' + (tab === 'following' ? ' class="on"' : '') + '>' + esc(c.following) + ' ' + esc(L.followingLabel) + '</a>' +
      '</div>' +
      list.map(function (a) {
        var href = a === me ? '#/ig' : '#/ig/u/' + encodeURIComponent(a.username);
        return '<div class="ig-frow">' +
          '<a class="ig-frow-main" href="' + href + '"><img src="' + esc(a.avatar) + '" alt="">' +
            '<span><b>' + esc(a.username) + '</b><small>' + esc(a.name) + '</small></span></a>' +
          '<button class="ig-frow-btn" data-na>' + esc(L.messageLabel) + '</button>' +
          '<button class="ig-ico" data-na>' + ICON.dots + '</button>' +
        '</div>';
      }).join('');
  }

  // 搜尋頁：上方搜尋框；沒輸入時顯示探索格子，輸入後列出符合的帳號
  var searchQuery = '';
  function searchMatches(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    var prefix = D.instagram.searchMode === 'prefix';
    return allProfiles().filter(function (a) {
      var u = String(a.username).toLowerCase();
      return prefix ? u.indexOf(q) === 0 : u === q;
    });
  }
  function renderSearchResults() {
    var L = D.instagram, box = $('#ig-search-body');
    if (!box) return;
    if (!searchQuery.trim()) {
      box.innerHTML = '<div class="ig-explore">' + (L.explore || []).map(function (src) {
        return '<button data-na><img src="' + esc(src) + '" alt=""></button>';
      }).join('') + '</div>';
      return;
    }
    var found = searchMatches(searchQuery);
    box.innerHTML = found.length
      ? found.map(function (a) {
          var href = a === currentAccount() ? '#/ig' : '#/ig/u/' + encodeURIComponent(a.username);
          return '<a class="ig-result" href="' + href + '">' +
            '<img src="' + esc(a.avatar) + '" alt="">' +
            '<span><b>' + esc(a.username) + '</b><small>' + esc(a.name) + '</small></span></a>';
        }).join('')
      : '<div class="ig-noresult">' + esc(L.noResultText) + '</div>';
  }
  function renderIGSearch() {
    var L = D.instagram;
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-searchbar">' +
        '<label class="ig-search-input">' + ICON.search +
          '<input type="search" id="ig-search-q" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="' + esc(L.searchPlaceholder) + '">' +
        '</label>' +
        '<button class="ig-ico" data-na>' + ICON.send + '</button>' +
      '</div>' +
      '<div id="ig-search-body"></div>';
    var input = $('#ig-search-q');
    input.value = searchQuery;
    input.addEventListener('input', function () { searchQuery = input.value; renderSearchResults(); });
    renderSearchResults();
  }

  // 下方功能列（主頁、搜尋、新增、Reels、個人頁）
  function renderTabbar(active) {
    var g = currentAccount();
    $('#ig-tabbar').innerHTML =
      '<button data-na>' + ICON.home + '</button>' +
      '<a href="#/ig/search"' + (active === 'search' ? ' class="on"' : '') + '>' + ICON.search + '</a>' +
      '<button data-na>' + ICON.add + '</button>' +
      '<button data-na>' + ICON.reels + '</button>' +
      '<a href="#/ig"' + (active === 'profile' ? ' class="on"' : '') + '><img src="' + esc(g.avatar) + '" alt=""></a>';
  }

  // 登入畫面：只在網頁內比對 data.js 裡的帳密，不會把輸入送到任何地方
  function renderIGLogin() {
    var l = D.instagram.login;
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-login">' +
        '<div class="ig-login-top">' +
          '<a class="ig-login-back" href="#/ig">' + ICON.back + '</a>' +
          (l.logo ? '<img class="ig-login-logo" src="' + esc(l.logo) + '" alt="">' : '') +
        '</div>' +
        '<form class="ig-login-form" autocomplete="off">' +
          '<input type="text" name="u" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="' + esc(l.usernamePlaceholder) + '" autocomplete="off">' +
          '<input type="password" name="p" placeholder="' + esc(l.passwordPlaceholder) + '" autocomplete="off">' +
          '<button type="submit" class="ig-login-btn">' + esc(l.loginLabel) + '</button>' +
          '<button type="button" class="ig-login-forgot" data-na>' + esc(l.forgotLabel) + '</button>' +
        '</form>' +
      '</div>';
  }

  $('#app-ig').addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-back]'))) {
      e.preventDefault();
      if (history.length > 1) history.back(); else location.hash = el.getAttribute('href');
      return;
    }
    if ((el = e.target.closest('[data-ptab]'))) {
      var tab = el.dataset.ptab;
      document.querySelectorAll('.ig-tabs [data-ptab]').forEach(function (b) { b.classList.toggle('active', b === el); });
      document.querySelectorAll('#ig-scroll [data-pane]').forEach(function (p) { p.hidden = p.dataset.pane !== tab; });
      return;
    }
    if ((el = e.target.closest('[data-act]')) && curPost) {
      var act = el.dataset.act, k = actKey(curPost.key);
      if (act === 'like') { if (store.likes[k]) delete store.likes[k]; else store.likes[k] = 1; }
      else if (act === 'save') { if (store.saves[k]) delete store.saves[k]; else store.saves[k] = Date.now(); }
      else if (act === 'repost') {
        if (store.reposts[k]) { delete store.reposts[k]; toast(T().unreposted); }
        else { store.reposts[k] = Date.now(); toast(T().reposted); }
      }
      else if (act === 'comments') { openComments(); return; }
      else if (act === 'share') { openShare(); return; }
      saveStore(); refreshPostActions();
      return;
    }
    if ((el = e.target.closest('[data-clike]'))) {
      var ck = actKey(curPost.key + '#' + el.dataset.clike);
      if (store.commentLikes[ck]) delete store.commentLikes[ck]; else store.commentLikes[ck] = 1;
      saveStore(); $('#ig-cmt-list').innerHTML = commentsListHTML();
      return;
    }
    if ((el = e.target.closest('[data-reply]'))) {
      var inp = $('#ig-cmt-form').c;
      inp.value = '@' + el.dataset.reply + ' '; inp.focus();
      inp.dispatchEvent(new Event('input'));
      return;
    }
    if ((el = e.target.closest('[data-pick]'))) {
      el.classList.toggle('picked');
      $('#ig-share-send').hidden = !document.querySelector('.ig-share-p.picked');
      return;
    }
    if (e.target.closest('#ig-share-send')) {
      $('#ig-sheet').classList.remove('show'); toast(T().sent); return;
    }
    if (e.target.closest('[data-copylink]')) {
      $('#ig-sheet').classList.remove('show'); toast(T().linkCopied); return;
    }
    if (e.target.closest('[data-follow]')) {
      var who = profileByName(decodeURIComponent(location.hash.split('/')[3] || ''));
      if (who) {
        store.follows[followKey(who)] = isFollowing(currentAccount(), who) ? 0 : 1;
        saveStore();
        var top = $('#ig-scroll').scrollTop;
        renderIG(who, '#/ig/u/' + encodeURIComponent(who.username));
        $('#ig-scroll').scrollTop = top;
      }
      return;
    }
    var sw = e.target.closest('[data-switch]');
    if (sw) {
      accState.current = sw.dataset.switch;
      saveAcc();
      renderIG();
      renderTabbar('profile');
      $('#ig-scroll').scrollTop = 0;
    }
    else if (e.target.closest('[data-sheet]')) $('#ig-sheet').classList.add('show');
    else if (e.target.closest('[data-close-sheet]')) $('#ig-sheet').classList.remove('show');
    else if (e.target.closest('[data-na]')) toast();
  });
  $('#ig-overlay').addEventListener('submit', function (e) {
    if (e.target.id !== 'ig-cmt-form') return;
    e.preventDefault();
    var text = e.target.c.value.trim();
    if (!text || !curPost) return;
    (store.comments[curPost.key] = store.comments[curPost.key] || []).push({ user: currentAccount().username, text: text });
    saveStore();
    e.target.c.value = '';
    e.target.querySelector('button').disabled = true;
    var list = $('#ig-cmt-list');
    list.innerHTML = commentsListHTML();
    list.scrollTop = list.scrollHeight;
    refreshPostActions();
  });
  $('#ig-scroll').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target;
    var u = form.u.value.trim(), pw = form.p.value;
    var acc = otherAccounts().filter(function (a) {
      return a.username === u && String(a.password) === pw;
    })[0];
    if (!acc) {
      form.p.value = '';
      toast(D.instagram.login.errorText || '帳號或密碼錯誤');
      return;
    }
    if (accState.loggedIn.indexOf(acc.username) < 0) accState.loggedIn.push(acc.username);
    accState.current = acc.username;
    saveAcc();
    form.reset();
    $('#toast').classList.remove('show');
    location.hash = '#/ig';
  });

  /* ---------------- 路由（網址 #/home、#/forum、#/forum/文章id、#/ig） ---------------- */
  var currentApp = null;

  function openApp(name) {
    var el = $('#app-' + name);
    if (currentApp === name) return el;
    document.querySelectorAll('.app.open').forEach(function (a) { a.classList.remove('open'); });
    el.style.transform = '';
    el.classList.add('open');
    currentApp = name;
    $('#phone').classList.remove('on-home');
    return el;
  }

  function showHome() {
    document.querySelectorAll('.app.open').forEach(function (a) {
      a.classList.remove('open');
      a.style.transform = '';
    });
    currentApp = null;
    $('#phone').classList.add('on-home');
  }

  function route() {
    try { doRoute(); } catch (err) {
      console.error(err);
      toast('data.js 有欄位填錯：' + err.message);
    }
  }
  // 其他 App（js/apps/*.js）用 window.SOSHO_APPS 註冊：網址 #/名稱/... → 呼叫它的函式
  var APPS = window.SOSHO_APPS || {};

  function doRoute() {
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    stopStory();
    if (APPS[parts[0]]) {
      openApp(parts[0]);
      APPS[parts[0]](parts.slice(1).map(decodeURIComponent));
    } else if (parts[0] === 'forum') {
      openApp('forum');
      if (parts[1]) renderPost(decodeURIComponent(parts[1])); else renderForumList();
      $('#forum-scroll').scrollTop = 0;
    } else if (parts[0] === 'ig') {
      openApp('ig');
      stopStory();
      var tabs = null;
      if (parts[1] === 'u') {
        // 別人的頁面：#/ig/u/帳號[/post/編號 | /story/編號]
        var who = profileByName(decodeURIComponent(parts[2] || ''));
        if (!who) { location.replace('#/ig/search'); return; }
        if (who === currentAccount()) { location.replace('#/ig' + (parts[3] ? '/' + parts.slice(3).join('/') : '')); return; }
        var base = '#/ig/u/' + encodeURIComponent(who.username);
        if (parts[3] === 'post') renderIGPost(+parts[4], who, base);
        else if (parts[3] === 'follows') renderIGFollows(parts[4], who, base);
        else if (parts[3] === 'story') renderIGStory(parts[4] === 'me' ? 'me' : +parts[4], who, base);
        else { renderIG(who, base); tabs = 'visit'; }
      }
      else if (parts[1] === 'search') { renderIGSearch(); tabs = 'search'; }
      else if (parts[1] === 'login') renderIGLogin();
      else if (parts[1] === 'settings') renderIGSettings();
      else if (parts[1] === 'saved') renderIGSaved();
      else if (parts[1] === 'post') renderIGPost(+parts[2]);
      else if (parts[1] === 'follows') renderIGFollows(parts[2]);
      else if (parts[1] === 'story') renderIGStory(parts[2] === 'me' ? 'me' : +parts[2]);
      else { renderIG(); tabs = 'profile'; }
      $('#app-ig').classList.toggle('with-tabs', !!tabs);
      if (tabs) renderTabbar(tabs);
      $('#ig-scroll').scrollTop = 0;
    } else {
      showHome();
    }
  }

  /* ---------------- 上滑回首頁 ---------------- */
  (function swipeHome() {
    var zone = $('#home-gesture');
    var startY = null, dy = 0, appEl = null;

    zone.addEventListener('pointerdown', function (e) {
      if (!currentApp) return;
      startY = e.clientY; dy = 0;
      appEl = $('#app-' + currentApp);
      appEl.classList.add('dragging');
      zone.setPointerCapture(e.pointerId);
    });
    zone.addEventListener('pointermove', function (e) {
      if (startY === null) return;
      dy = Math.min(0, e.clientY - startY);
      var s = Math.max(0.6, 1 + dy / 900);
      appEl.style.transform = 'translateY(' + dy * 0.6 + 'px) scale(' + s + ')';
      appEl.style.borderRadius = Math.min(40, -dy / 3) + 'px';
    });
    function end() {
      if (startY === null) return;
      appEl.classList.remove('dragging');
      appEl.style.borderRadius = '';
      if (dy < -60) {
        location.hash = '#/home';
      } else {
        appEl.style.transform = '';
      }
      startY = null; appEl = null;
    }
    zone.addEventListener('pointerup', end);
    zone.addEventListener('pointercancel', end);
  })();

  /* ---------------- 啟動 ---------------- */
  // 給 js/apps/*.js 用的共用工具
  window.SOSHO = {
    data: D, $: $, esc: esc, multiline: multiline, toast: toast,
    setDarkStatus: function (on) { $('#phone').classList.toggle('dark-status', !!on); },
    load: function (key, def) {
      try { var v = JSON.parse(localStorage.getItem(key)); return v == null ? def : v; } catch (e) { return def; }
    },
    save: function (key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
    }
  };

  renderHome();
  if (!location.hash) history.replaceState(null, '', '#/forum');  // 一進網頁先開論壇
  window.addEventListener('hashchange', route);
  route();
})();
