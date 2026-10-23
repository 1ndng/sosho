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
    home.innerHTML =
      '<div class="home-grid">' +
      h.apps.map(function (a) {
        return '<a class="app-icon" href="#/' + esc(a.id) + '">' +
          '<img src="' + esc(a.icon) + '" alt="">' +
          '<span>' + esc(a.label) + '</span></a>';
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
  var store = { seen: {}, follows: {} };
  try { var saved = JSON.parse(localStorage.getItem(STORE_KEY)); if (saved) { store.seen = saved.seen || {}; store.follows = saved.follows || {}; } } catch (e) {}
  function saveStore() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {}
  }
  // 追蹤是「目前登入的帳號」追蹤「對方」，換帳號登入就各自分開
  function followKey(g) { return currentAccount().username + '>' + g.username; }

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
    var followed = visitor && store.follows[followKey(g)];
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
            '<div><b>' + esc(g.postsCount) + '</b>' + esc(L.postsLabel) + '</div>' +
            '<button' + na + '><b>' + esc(g.followersCount) + '</b>' + esc(L.followersLabel) + '</button>' +
            '<button' + na + '><b>' + esc(g.followingCount) + '</b>' + esc(L.followingLabel) + '</button>' +
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

      '<div class="ig-tabs">' +
        '<button class="active">' + ICON.grid + '</button>' +
        '<button' + na + '>' + ICON.repost + '</button>' +
        '<button' + na + '>' + ICON.tagged + '</button>' +
      '</div>' +

      '<div class="ig-grid">' + posts.map(function (p, i) {
        var po = postObj(p);
        return '<a href="' + base + '/post/' + i + '"><img src="' + esc(po.images[0]) + '" alt="">' +
          (po.images.length > 1 ? '<span class="ig-multi"></span>' : '') + '</a>';
      }).join('') + '</div>';

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

  // 貼文可以只寫圖片路徑（字串），或寫成 { images: [...], caption, ... }
  function postObj(p) {
    if (typeof p === 'string') return { images: [p] };
    p = p || {};
    return { images: p.images && p.images.length ? p.images : [''], likes: p.likes, likedBy: p.likedBy, caption: p.caption, time: p.time };
  }

  function backBtn(href) {
    return '<a class="ig-round-back" href="' + (href || '#/ig') + '">' + ICON.back + '</a>';
  }

  // 設定和動態（右上角三條線）
  function renderIGSettings() {
    var st = D.instagram.settings || { sections: [] };
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-pagehead">' + backBtn() + '<div class="ig-pagehead-t"><b>' + esc(st.title) + '</b></div></div>' +
      st.sections.map(function (sec) {
        return '<section class="ig-set-sec">' +
          '<div class="ig-set-title">' + esc(sec.title) + '</div>' +
          (sec.items || []).map(function (it) {
            return '<button class="ig-set-row" data-na>' +
              '<span class="ig-set-ico">' + (ICON[it.icon] || '') + '</span>' +
              '<span class="ig-set-label">' + esc(it.label) + '</span>' +
              (it.value != null ? '<span class="ig-set-val">' + esc(it.value) + '</span>' : '') +
              '<span class="ig-set-arrow">' + ICON.right + '</span>' +
            '</button>';
          }).join('') +
        '</section>';
      }).join('');
  }

  // 點進貼文
  function renderIGPost(idx, g, base) {
    var L = D.instagram;
    g = g || currentAccount(); base = base || '#/ig';
    var raw = (g.posts || [])[idx];
    if (raw == null) { location.replace(base); return; }
    var p = postObj(raw), n = p.images.length;
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-pagehead">' + backBtn(base) +
        '<div class="ig-pagehead-t"><b>' + esc(L.postTitle) + '</b><small>' + esc(g.username) + '</small></div></div>' +
      '<div class="ig-post-user">' +
        '<img src="' + esc(g.avatar) + '" alt=""><b>' + esc(g.username) + '</b>' +
        '<button class="ig-ico" data-na>' + ICON.more + '</button>' +
      '</div>' +
      '<div class="ig-car-wrap">' +
        '<div class="ig-car" id="ig-car">' + p.images.map(function (src) {
          return '<img src="' + esc(src) + '" alt="">';
        }).join('') + '</div>' +
        (n > 1 ? '<span class="ig-car-count" id="ig-car-count">1/' + n + '</span>' : '') +
      '</div>' +
      (n > 1 ? '<div class="ig-dots" id="ig-dots">' + p.images.map(function (_, i) {
        return '<i' + (i ? '' : ' class="on"') + '></i>';
      }).join('') + '</div>' : '<div class="ig-dots"></div>') +
      '<div class="ig-actions">' +
        '<button data-na>' + ICON.heart + '</button>' +
        (p.likes ? '<span class="ig-likes">' + esc(p.likes) + '</span>' : '') +
        '<button data-na>' + ICON.comment + '</button>' +
        '<button data-na>' + ICON.send + '</button>' +
        '<button class="ig-act-save" data-na>' + ICON.bookmark + '</button>' +
      '</div>' +
      (p.likedBy && p.likedBy.name ?
        '<div class="ig-likedby"><img src="' + esc(p.likedBy.avatar) + '" alt=""><b>' + esc(p.likedBy.name) + '</b>' + esc(L.likedBySuffix) + '</div>' : '') +
      (p.caption ? '<div class="ig-caption"><b>' + esc(g.username) + '</b> ' + multiline(p.caption) + '</div>' : '') +
      (p.time ? '<div class="ig-time">' + esc(p.time) + '</div>' : '');

    var car = $('#ig-car');
    if (n > 1) car.addEventListener('scroll', function () {
      var i = Math.round(car.scrollLeft / car.clientWidth);
      $('#ig-car-count').textContent = (i + 1) + '/' + n;
      document.querySelectorAll('#ig-dots i').forEach(function (d, k) { d.classList.toggle('on', k === i); });
    });
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
        '<div class="ig-story-foot">' +
          '<button class="ig-story-msg" data-na>' + esc(L.storyMessagePlaceholder) + '</button>' +
          '<button class="ig-ico" data-na>' + ICON.heart + '</button>' +
          '<button class="ig-ico" data-na>' + ICON.send + '</button>' +
        '</div>' +
      '</div>';

    var bars = document.querySelectorAll('.ig-story-bars i');
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
      clearTimeout(storyTimer);
      storyTimer = setTimeout(function () { show(i + 1); }, 5000);
    }
    $('.ig-story-tap').onclick = function (e) {
      if (e.target.hasAttribute('data-prev')) show(i - 1); else show(i + 1);
    };
    show(0);
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
    if (e.target.closest('[data-follow]')) {
      var who = profileByName(decodeURIComponent(location.hash.split('/')[3] || ''));
      if (who) {
        var k = followKey(who);
        if (store.follows[k]) delete store.follows[k]; else store.follows[k] = 1;
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
  function doRoute() {
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    if (parts[0] === 'forum') {
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
        else if (parts[3] === 'story') renderIGStory(parts[4] === 'me' ? 'me' : +parts[4], who, base);
        else { renderIG(who, base); tabs = 'visit'; }
      }
      else if (parts[1] === 'search') { renderIGSearch(); tabs = 'search'; }
      else if (parts[1] === 'login') renderIGLogin();
      else if (parts[1] === 'settings') renderIGSettings();
      else if (parts[1] === 'post') renderIGPost(+parts[2]);
      else if (parts[1] === 'story') renderIGStory(parts[2] === 'me' ? 'me' : +parts[2]);
      else { renderIG(); tabs = 'profile'; }
      $('#app-ig').classList.toggle('with-tabs', !!tabs);
      if (tabs) renderTabbar(tabs);
      $('#ig-scroll').scrollTop = 0;
    } else {
      stopStory();
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
  renderHome();
  if (!location.hash) history.replaceState(null, '', '#/forum');  // 一進網頁先開論壇
  window.addEventListener('hashchange', route);
  route();
})();
