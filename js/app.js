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

  /* ---------------- 上一頁（自己記錄瀏覽紀錄，避免「上一頁」繞回限時動態） ---------------- */
  var navStack = [];
  var replacing = false;
  function trackNav() {
    var h = location.hash;
    if (replacing) { navStack[navStack.length - 1] = h; replacing = false; return; }
    if (navStack.length > 1 && navStack[navStack.length - 2] === h) navStack.pop();   // 按了上一頁
    else if (navStack[navStack.length - 1] !== h) navStack.push(h);
  }
  // 取代目前這一頁（不會多一筆「上一頁」）
  function replaceHash(h) {
    if (location.hash === h) return;
    replacing = true;
    location.replace(h);
  }
  // 回上一頁；沒有上一頁就到 fallback
  function goBack(fallback) {
    if (navStack.length > 1) history.back();
    else replaceHash(fallback || '#/forum');
  }
  function prevHash() { return navStack[navStack.length - 2]; }

  /* ---------------- 進度（結局解鎖用） ---------------- */
  var PROGRESS_KEY = 'sosho-progress';
  function progress() { try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch (e) { return {}; } }
  function markFlag(f) {
    if (!f) return;
    var pr = progress(); pr[f] = 1;
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(pr)); } catch (e) {}
  }
  // data.js 的 ending.require 全部完成 = 解鎖結局
  function endingUnlocked() {
    var req = (D.ending && D.ending.require) || [], pr = progress();
    return req.every(function (f) { return pr[f]; });
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
      if (a.ending) {
        var open = endingUnlocked();
        return '<a class="ad' + (open ? '' : ' ad-locked') + '" href="' + (open ? '#/ending' : '#') + '" data-ad="' + i + '">' +
          '<img src="' + esc(a.image) + '" alt="">' +
          (open ? '' : '<span class="ad-lock">' + esc((D.ending && D.ending.lockedLabel) || '待解鎖') + '</span>') + '</a>';
      }
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
    // 留言者 = 文章作者 → 名字旁顯示「原PO」；留言可以附圖片
    var comments = cs.map(function (c) {
      var op = c.name === p.author ? '<i class="pd-op">' + esc(f.opLabel || '原PO') + '</i>' : '';
      return '<div class="pd-comment"><b>' + esc(c.name) + op + '</b><span class="pd-colon">:</span>' +
        '<span class="pd-ctext">' + (c.text ? multiline(c.text) : '') + '</span>' +
        (c.image ? '<img class="pd-cimg" src="' + esc(c.image) + '" alt="" data-fimg>' : '') +
        '</div>';
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
        (p.commentsDisabled
          ? '<div class="pd-cbar pd-closed">' + esc(f.commentsDisabledText || '原PO已限制留言。') + '</div>'
          : '<div class="pd-cbar">' + esc(f.commentLabel) + ' (' + cs.length + ')</div>') +
        comments +
      '</div>' + forumFooter();
  }

  // 廣告沒有連結時 → 顯示尚未更新
  $('#forum-scroll').addEventListener('click', function (e) {
    var im = e.target.closest('[data-fimg]');
    if (im) {
      // 點留言圖片 → 全螢幕，點一下關閉
      var v = document.createElement('div');
      v.className = 'pd-viewer';
      v.innerHTML = '<img src="' + esc(im.getAttribute('src')) + '" alt="">';
      v.onclick = function () { v.remove(); };
      $('#app-forum').appendChild(v);
      return;
    }
    var ad = e.target.closest('.ad');
    var adData = ad && (D.forum.ads || [])[ad.dataset.ad];
    if (adData && adData.ending) {
      if (!endingUnlocked()) { e.preventDefault(); toast((D.ending && D.ending.lockedText) || '待解鎖'); }
    } else if (adData && !adData.link) { e.preventDefault(); toast(); }
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
    starFill: '<svg viewBox="0 0 24 24"><path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" fill="currentColor"/></svg>',
    star: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="m12 6.8 1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="currentColor"/></svg>',
    right: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    more: '<svg viewBox="0 0 24 24"><path d="M3 8h18M3 16h12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="7" stroke="currentColor" stroke-width="2.2" fill="none"/><path d="m16 16 5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    home: '<svg viewBox="0 0 24 24"><path d="M3.5 10.5 12 3l8.5 7.5V21h-5.5v-6h-6v6H3.5z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>',
    add: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 7.5v9M7.5 12h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    reels: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 8.5h18M8.5 3l3 5.5M14 3l3 5.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M10 11.5v6l5-3z" fill="currentColor"/></svg>',
    addUser: '<svg viewBox="0 0 24 24"><circle cx="14" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6.5 21c.6-4 3.6-6.3 7.5-6.3s6.9 2.3 7.5 6.3M5 6v6M2 9h6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    soundOn: '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>',
    soundOff: '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9.5l5 5M20.5 9.5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    heartFill: '<svg viewBox="0 0 24 24"><path d="M12 20.5s-8-4.9-8-11A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8 2.9c0 6.1-8 11-8 11z" fill="currentColor"/></svg>',
    bookmarkFill: '<svg viewBox="0 0 24 24"><path d="M5.5 3h13v18L12 14.8 5.5 21z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    plusCircle: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 7.5v9M7.5 12h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4L12 5.6M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    dots: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="19" cy="12" r="1.8" fill="currentColor"/></svg>',
    tagged: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6.5 20.5c1-3 3-4.3 5.5-4.3s4.5 1.3 5.5 4.3" stroke="currentColor" stroke-width="2" fill="none"/></svg>'
  };

  // 簡介裡的 @帳號：bioLinks 有寫 → 開外部網址；遊戲裡有這個帳號 → 進它的頁面；其他 → 尚未更新
  function bioLine(s, g) {
    var links = (g && g.bioLinks) || {};
    return esc(s).replace(/(@[\w.]+)/g, function (m) {
      if (links[m]) return '<a class="ig-mention" href="' + esc(links[m]) + '" target="_blank" rel="noopener">' + m + '</a>';
      var acc = profileByName(m.slice(1));
      if (acc) return '<a class="ig-mention" href="' + (acc === currentAccount() ? '#/ig' : '#/ig/u/' + encodeURIComponent(acc.username)) + '">' + m + '</a>';
      return '<span class="ig-mention" data-na>' + m + '</span>';
    });
  }

  /* ---- 帳號：主帳號 + 用帳密登入的其他帳號（登入狀態存在瀏覽器裡） ---- */
  var ACC_KEY = 'sosho-ig-accounts-v2';   // 換了預設帳號，用新的 key 讓舊的登入狀態重來
  var accState = { current: null, loggedIn: [] };
  try { accState = JSON.parse(localStorage.getItem(ACC_KEY)) || accState; } catch (e) {}
  function saveAcc() {
    try { localStorage.setItem(ACC_KEY, JSON.stringify(accState)); } catch (e) {}
  }
  function otherAccounts() { return D.instagram.otherAccounts || []; }
  function findAccount(username) {
    if (!username) return null;
    if (username === D.instagram.username) return D.instagram;
    return otherAccounts().filter(function (a) { return a.username === username; })[0] || null;
  }
  // 打開 IG 時已經登入的帳號（data.js 的 defaultAccount）
  function startAccount() { return findAccount(D.instagram.defaultAccount) || D.instagram; }
  // 目前帳號；data.js 改過帳號名稱導致找不到時，回到預設帳號
  function currentAccount() { return findAccount(accState.current) || startAccount(); }
  // 帳號清單：預設帳號 + 已登入過的帳號
  function listedAccounts() {
    var first = startAccount();
    return [first].concat(accState.loggedIn.map(findAccount).filter(function (a) {
      return a && a !== first;
    }));
  }
  // 可以用帳密登入的帳號：有寫 password、而且不是預設帳號
  function loginAccounts() {
    return [D.instagram].concat(otherAccounts()).filter(function (a) {
      return a.password != null && a !== startAccount();
    });
  }

  // 看過的限時動態、追蹤狀態（存在瀏覽器裡）
  var STORE_KEY = 'sosho-ig-state';
  // likes / saves / reposts / commentLikes / storyLikes 的 key 都是「目前帳號|對象」，換帳號各自分開
  var store = { seen: {}, follows: {}, likes: {}, saves: {}, reposts: {}, comments: {}, commentLikes: {}, storyLikes: {}, searchHistory: [], profileEdits: {} };
  try {
    var saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved) Object.keys(store).forEach(function (k) { if (saved[k]) store[k] = saved[k]; });
  } catch (e) {}
  function saveStore() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {}
  }
  // 追蹤是「目前登入的帳號」追蹤「對方」，換帳號登入就各自分開
  function followKey(g) { return currentAccount().username + '>' + g.username; }

  // 非公開帳號：沒追蹤就看不到內容（自己看自己不受影響）
  function isLocked(g) {
    var me = currentAccount();
    return !!g.private && g !== me && !isFollowing(me, g);
  }
  function isRequested(g) { return store.follows[followKey(g)] === 'req'; }

  // a 有沒有追蹤 b：玩家按過追蹤／取消就以那個為準，否則看 data.js 的 following 名單
  function isFollowing(a, b) {
    var k = a.username + '>' + b.username;
    if (k in store.follows) return store.follows[k] === 1 || store.follows[k] === true;   // 'req' = 已要求，還不算追蹤
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
      followers: g.followersCount != null ? g.followersCount : g.followersList ? g.followersList.length : followersOf(g).length,
      following: g.followingCount != null ? g.followingCount : g.followingList ? g.followingList.length : followingOf(g).length
    };
  }

  // 搜尋得到的所有帳號：主帳號 + 可登入帳號 + 只能被搜尋的帳號
  function allProfiles() {
    return [D.instagram].concat(otherAccounts(), D.instagram.searchOnlyAccounts || []);
  }
  function profileByName(name) {
    return allProfiles().filter(function (a) { return a.username === name; })[0] || null;
  }

  // 摯友限時動態：只有自己或在 closeFriendsList 裡的帳號看得到
  function canSee(owner, item) {
    if (!item || !item.closeFriends) return true;
    var me = currentAccount();
    return me === owner || (owner.closeFriendsList || []).indexOf(me.username) >= 0;
  }
  function visibleStory(g) { return (g.story || []).filter(function (it) { return canSee(g, it); }); }
  function visibleHighlight(g, h) {
    var items = h.stories && h.stories.length ? h.stories : [{ image: h.image }];
    return items.filter(function (it) { return canSee(g, it); });
  }

  // g = 要顯示的帳號；base = 這個帳號頁面的網址（自己 #/ig，別人 #/ig/u/帳號）
  function renderIG(g, base) {
    var L = D.instagram;          // 共用文字（按鈕、標籤）
    g = g || currentAccount();
    base = base || '#/ig';
    var visitor = base !== '#/ig';   // true = 從搜尋點進去看別人的頁面
    var locked = visitor && isLocked(g);
    var vis = locked ? [] : visibleStory(g);   // 非公開又沒追蹤：看不到限時動態
    var showRing = vis.length > 0 || (g.hasStory && !g.story);
    var cf = vis.some(function (it) { return it.closeFriends; });
    if (locked) showRing = false;
    var ring = showRing ? ' has-story' + (cf ? ' cf' : '') + (store.seen[g.username] ? ' seen' : '') : '';
    var followed = visitor && isFollowing(currentAccount(), g);
    var c = counts(g);
    // 欄位被刪掉或註解掉時也不會整頁空白
    var bio = g.bio || [], posts = g.posts || [];
    // 精選裡的內容全部看不到（都是摯友限時、又不是摯友）就不顯示這個精選
    var highlights = (g.highlights || []).map(function (h, i) { return { h: h, i: i }; })
      .filter(function (x) { return visibleHighlight(g, x.h).length; });
    var na = ' data-na';   // 標記：點擊後跳出「尚未更新」

    $('#ig-scroll').innerHTML =
      (visitor
        ? '<div class="ig-top">' +
            '<a class="ig-ico" href="#/ig/search" data-back>' + ICON.back + '</a>' +
            '<span class="ig-user">' + esc(g.username) + '</span>' +
            '<span class="ig-top-r"><button class="ig-ico"' + na + '>' + ICON.more + '</button></span>' +
          '</div>'
        : '<div class="ig-top">' +
            '<a class="ig-ico" href="#/ig/search">' + ICON.search + '</a>' +
            '<button class="ig-user" data-sheet>' + esc(g.username) + ICON.chevron + '</button>' +
            '<span class="ig-top-r">' +
              '<a class="ig-ico" href="#/ig/settings">' + ICON.menu + '</a>' +
            '</span>' +
          '</div>') +

      '<div class="ig-profile">' +
        // 有限時動態 → 點頭像進入；沒有 → 尚未更新。看過的限時動態外框變淺灰色
        (vis.length
          ? '<a class="ig-avatar' + ring + '" href="' + base + '/story/me">'
          : '<button class="ig-avatar' + ring + '" type="button">') +
          '<img src="' + esc(g.avatar) + '" alt="">' +
        (vis.length ? '</a>' : '</button>') +
        '<div class="ig-right">' +
          '<div class="ig-name">' + esc(g.name || g.username) + '</div>' +
          '<div class="ig-stats">' +
            '<div><b>' + esc(c.posts) + '</b>' + esc(L.postsLabel) + '</div>' +
            (locked
              ? '<div><b>' + esc(c.followers) + '</b>' + esc(L.followersLabel) + '</div>' +
                '<div><b>' + esc(c.following) + '</b>' + esc(L.followingLabel) + '</div>'
              : '<a href="' + base + '/follows/followers"><b>' + esc(c.followers) + '</b>' + esc(L.followersLabel) + '</a>' +
                '<a href="' + base + '/follows/following"><b>' + esc(c.following) + '</b>' + esc(L.followingLabel) + '</a>') +
          '</div>' +
        '</div>' +
      '</div>' +

      (bio.length ? '<div class="ig-bio">' + bio.map(function (l) { return '<div>' + bioLine(l, g) + '</div>'; }).join('') + '</div>' : '') +

      (g.music && g.music.title ?
        '<button class="ig-music"' + na + '>' + ICON.play +
          '<b>' + esc(g.music.title) + '</b><span> · ' + esc(g.music.artist) + '</span></button>' : '') +

      (visitor
        ? '<div class="ig-btns ig-btns-visit">' +
            (followed
              ? '<button class="ig-following" data-follow>' + esc(L.followingButtonLabel) + ICON.chevron + '</button>'
              : isRequested(g)
                ? '<button class="ig-following" data-follow>' + esc(T().requestedLabel) + '</button>'
                : '<button class="ig-follow" data-follow>' + esc(L.followLabel) + '</button>') +
          '</div>'
        : '<div class="ig-btns">' +
            '<a class="ig-btn-a" href="#/ig/edit">' + esc(L.editProfileLabel) + '</a>' +
            '<button data-share-profile>' + esc(L.shareProfileLabel) + '</button>' +
          '</div>') +

      (locked
        ? '<div class="ig-private">' +
            '<span class="ig-private-ico">' + ICON.lock + '</span>' +
            '<b>' + esc(T().privateTitle) + '</b>' +
            '<small>' + esc(T().privateDesc) + '</small>' +
          '</div>'
        : '') +

      (locked ? '' : (highlights.length ? '<div class="ig-hl">' + highlights.map(function (x) {
        var h = x.h, i = x.i;
        return '<a class="ig-hl-item" href="' + base + '/story/' + i + '"><span class="ig-hl-img"><img src="' + esc(h.image) + '" alt=""></span>' +
          '<span class="ig-hl-label">' + esc(h.label) + '</span></a>';
      }).join('') + '</div>' : '') +

      // 貼文／轉發／被標註 三個分頁，在同一頁切換
      '<div class="ig-tabs">' +
        '<button data-ptab="grid" class="active">' + ICON.grid + '</button>' +

      '</div>' +
      '<div data-pane="grid">' + gridHTML(posts.map(function (_, i) { return { owner: g, idx: i }; }), '') + '</div>' +
      '<div data-pane="reposts" hidden>' + gridHTML(repostsOf(g), T().noReposts) + '</div>' +
      '<div data-pane="tagged" hidden>' + gridHTML(taggedOf(g), T().noTagged) + '</div>');

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
    storyMessageSent: '訊息已傳送', recentTitle: '最近',
    editTitle: '編輯個人檔案', nameLabel: '名稱', bioLabel: '個人簡介', cancelLabel: '取消', doneLabel: '完成',
    closeFriendsTitle: '摯友', closeFriendsBadge: '摯友', noCloseFriends: '還沒有摯友',
    privateTitle: '此帳號不公開', privateDesc: '追蹤這個帳號即可查看相片和影片。', requestedLabel: '已要求',
    soundOn: '開啟聲音', soundOff: '關閉聲音',
    archiveTitle: '典藏', archiveStories: '限時動態', archivePosts: '貼文', noArchive: '沒有典藏的內容'
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
  // 已儲存：玩家按的收藏（新的在前）＋ data.js 的 saved
  function savedOf() {
    var acc = currentAccount(), me = acc.username + '|', seen = {};
    var mine = Object.keys(store.saves).filter(function (k) { return store.saves[k] && k.indexOf(me) === 0; })
      .sort(function (x, y) { return store.saves[y] - store.saves[x]; })
      .map(function (k) { return k.slice(me.length); });
    return mine.concat(acc.saved || []).filter(function (k) { return !seen[k] && (seen[k] = 1); })
      .map(refFromKey).filter(Boolean);
  }

  function backBtn(href) {
    return '<a class="ig-round-back" href="' + (href || '#/ig') + '" data-back>' + ICON.back + '</a>';
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
              (it.icon === 'star'
                ? '<span class="ig-set-val">' + (currentAccount().closeFriendsList || []).length + '</span>'
                : it.value != null ? '<span class="ig-set-val">' + esc(it.value) + '</span>' : '') +
              '<span class="ig-set-arrow">' + ICON.right + '</span>';
            var links = { saved: '#/ig/saved', archive: '#/ig/archive', star: '#/ig/closefriends' };
            return links[it.icon]
              ? '<a class="ig-set-row" href="' + links[it.icon] + '">' + inner + '</a>'
              : '<button class="ig-set-row" data-na>' + inner + '</button>';
          }).join('') +
        '</section>';
      }).join('');
  }

  // 典藏：限時動態（過期）／貼文（下架）兩個分頁
  var archiveTab = 'stories';
  function renderIGArchive() {
    var t = T(), ar = currentAccount().archive || {}, st = ar.stories || [], ps = ar.posts || [];
    var body = archiveTab === 'stories'
      ? (st.length ? '<div class="ig-grid ig-arch-grid">' + st.map(function (it, i) {
          var isVideo = /\.(mp4|mov|webm)$/i.test(it.image || '');
          return '<a href="#/ig/story/archive-' + i + '">' +
            (isVideo ? '<video src="' + esc(it.image) + '" muted playsinline preload="metadata"></video>' : '<img src="' + esc(it.image) + '" alt="">') +
            (it.time ? '<span class="ig-arch-date">' + esc(it.time) + '</span>' : '') + '</a>';
        }).join('') + '</div>' : '<div class="ig-empty">' + esc(t.noArchive) + '</div>')
      : (ps.length ? '<div class="ig-grid">' + ps.map(function (p, i) {
          var po = postObj(p);
          return '<a href="#/ig/archive/post/' + i + '"><img src="' + esc(po.images[0]) + '" alt="">' +
            (po.images.length > 1 ? '<span class="ig-multi"></span>' : '') + '</a>';
        }).join('') + '</div>' : '<div class="ig-empty">' + esc(t.noArchive) + '</div>');
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-pagehead">' + backBtn('#/ig/settings') + '<div class="ig-pagehead-t"><b>' + esc(t.archiveTitle) + '</b></div></div>' +
      '<div class="ig-ftabs">' +
        '<a href="#/ig/archive" data-atab="stories"' + (archiveTab === 'stories' ? ' class="on"' : '') + '>' + esc(t.archiveStories) + '</a>' +
        '<a href="#/ig/archive" data-atab="posts"' + (archiveTab === 'posts' ? ' class="on"' : '') + '>' + esc(t.archivePosts) + '</a>' +
      '</div>' + body;
  }

  // 摯友名單（設定 → 摯友）
  function renderIGCloseFriends() {
    var t = T(), me = currentAccount();
    var list = (me.closeFriendsList || []).map(function (u) {
      var f = fillerInfo(u) || {};
      return profileByName(u) || { username: u, name: f.name || '', avatar: f.avatar || DEFAULT_AVATAR, filler: true };
    });
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-pagehead">' + backBtn('#/ig/settings') + '<div class="ig-pagehead-t"><b>' + esc(t.closeFriendsTitle) + '</b></div></div>' +
      (list.length ? list.map(function (a) {
        return personRow(a, '<span class="ig-cf-star">' + ICON.starFill + '</span>');
      }).join('') : '<div class="ig-empty">' + esc(t.noCloseFriends) + '</div>');
  }

  // 名單裡的一列：真的帳號可以點進去；路人（filler）點不進去
  var DEFAULT_AVATAR = 'images/default_avatar.png';
  // 路人的資料：從所有帳號的粉絲／追蹤名單裡找同一個 username 的 { name, avatar }
  function fillerInfo(username) {
    var hit = null;
    allProfiles().forEach(function (a) {
      (a.followersList || []).concat(a.followingList || []).forEach(function (x) {
        if (!hit && x && typeof x === 'object' && x.username === username) hit = x;
      });
    });
    return hit;
  }
  function personRow(a, right) {
    var me = currentAccount();
    var inner = '<img src="' + esc(a.avatar || DEFAULT_AVATAR) + '" alt="">' +
      '<span><b>' + esc(a.username) + '</b>' + (a.name ? '<small>' + esc(a.name) + '</small>' : '') + '</span>';
    var main = a.filler
      ? '<div class="ig-frow-main">' + inner + '</div>'
      : '<a class="ig-frow-main" href="' + (a === me ? '#/ig' : '#/ig/u/' + encodeURIComponent(a.username)) + '">' + inner + '</a>';
    return '<div class="ig-frow">' + main + right + '</div>';
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


        '<button data-act="save" class="ig-act-save">' + (saved ? ICON.bookmarkFill : ICON.bookmark) + '</button>' +
      '</div>' +
      (cp.p.likedBy && cp.p.likedBy.name ?
        '<div class="ig-likedby"><img src="' + esc(cp.p.likedBy.avatar || avatarOf(cp.p.likedBy.name)) + '" alt=""><b>' + esc(cp.p.likedBy.name) + '</b>' + esc(L.likedBySuffix) + '</div>' : '') +
      (cp.p.caption ? '<div class="ig-caption"><b>' + esc(cp.owner.username) + '</b> ' + multiline(cp.p.caption) + '</div>' : '') +

      (cp.p.time ? '<div class="ig-time">' + esc(cp.p.time) + '</div>' : '');
  }
  function refreshPostActions() {
    var box = $('#ig-post-actions');
    if (box && curPost) box.innerHTML = postActionsHTML();
  }

  // src = 'archive' 時顯示典藏裡的貼文
  function renderIGPost(idx, g, base, src) {
    var L = D.instagram;
    g = g || currentAccount(); base = base || '#/ig';
    var raw = src === 'archive' ? ((g.archive || {}).posts || [])[idx] : (g.posts || [])[idx];
    if (raw == null) { replaceHash(base); return; }
    var p = postObj(raw), n = p.images.length;
    curPost = { owner: g, idx: idx, p: p, key: src === 'archive' ? g.username + '/archive' + idx : postKey(g, idx) };
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
    // 和 IG 一樣：整篇貼文的框照第一張照片的比例（最高 3:4、最寬 1.91:1），其他張填滿同一個框
    var firstImg = car.querySelector('img');
    function fitRatio() {
      if (!firstImg.naturalWidth) return;
      var r = Math.min(1.91, Math.max(0.75, firstImg.naturalWidth / firstImg.naturalHeight));
      car.style.setProperty('--ar', r);
    }
    if (firstImg.complete) fitRatio(); else firstImg.addEventListener('load', fitRatio);
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
  var storyMuted = true;   // 限時動態影片預設靜音（和 IG 一樣），按聲音鍵開啟
  function stopStory() {
    clearTimeout(storyTimer);
    $('#phone').classList.remove('dark-status');
  }
  function renderIGStory(which, g, base) {
    var L = D.instagram, items;
    g = g || currentAccount(); base = base || '#/ig';
    var startAt = 0, fromArchive = /^archive-/.test(String(which));
    if (which === 'me') items = visibleStory(g);
    else if (fromArchive) {
      // 典藏的限時動態：從點的那一則開始播
      items = ((g.archive || {}).stories || []);
      startAt = Math.min(items.length - 1, +String(which).slice(8) || 0);
      base = '#/ig/archive';
    } else {
      var h = (g.highlights || [])[which];
      items = h ? visibleHighlight(g, h) : [];
    }
    // 精選動態上方顯示精選的封面和名稱；限時動態／典藏顯示帳號
    var headImg = h ? h.image : g.avatar, headName = h ? h.label : g.username;
    if (!items.length) { replaceHash(base); return; }
    if (which === 'me') { store.seen[g.username] = 1; saveStore(); }
    if (fromArchive) renderIGArchive(); else renderIG(g, base);   // 背後保留原本的頁面，關掉時直接回到這裡
    $('#phone').classList.add('dark-status');
    var i = 0;
    $('#ig-overlay').innerHTML =
      '<div class="ig-story">' +
        '<div class="ig-story-bars">' + items.map(function () { return '<i><b></b></i>'; }).join('') + '</div>' +
        '<div class="ig-story-head">' +
          '<img src="' + esc(headImg) + '" alt="">' +
          '<b>' + esc(headName) + '</b><span class="ig-story-cf" id="ig-story-cf">' + ICON.starFill + esc(T().closeFriendsBadge) + '</span>' +
          '<span class="ig-story-time"></span>' +
          '<button class="ig-ico ig-story-sound" id="ig-story-sound" type="button" aria-label="sound"></button>' +
          '<button class="ig-ico" data-na>' + ICON.more + '</button>' +
          '<button class="ig-ico" type="button" data-story-close>' + ICON.close + '</button>' +
        '</div>' +
        '<div class="ig-story-img" id="ig-story-media"></div>' +
        '<div class="ig-story-tap"><span data-prev></span><span data-next></span></div>' +
        '<form class="ig-story-foot" id="ig-story-form" autocomplete="off">' +
          '<input class="ig-story-msg" name="m" placeholder="' + esc(L.storyMessagePlaceholder) + '" autocomplete="off">' +
          '<button type="button" class="ig-ico" id="ig-story-like">' + ICON.heart + '</button>' +
        '</form>' +
      '</div>';

    // 關閉：如果是從原本那頁點進來的，就回上一頁（不會留下一筆「上一頁 = 限時動態」）
    function closeStory() {
      clearTimeout(storyTimer);
      if (prevHash() === base) history.back(); else replaceHash(base);
    }
    $('[data-story-close]').onclick = closeStory;
    var bars = document.querySelectorAll('.ig-story-bars i');
    var startedAt = 0, remaining = 5000;
    function likeKey() { return actKey(g.username + '/story/' + which + '/' + i); }
    function paintLike() {
      var on = !!store.storyLikes[likeKey()], btn = $('#ig-story-like');
      btn.innerHTML = on ? ICON.heartFill : ICON.heart;
      btn.classList.toggle('on-like', on);
    }
    function video() { return document.querySelector('#ig-story-media video'); }
    // 聲音按鈕：只有影片時出現；按一下開／關聲音（整段限時動態期間都記得）
    function paintSound(show) {
      var b = $('#ig-story-sound');
      b.style.display = show ? '' : 'none';
      b.innerHTML = storyMuted ? ICON.soundOff : ICON.soundOn;
    }
    $('#ig-story-sound').onclick = function () {
      storyMuted = !storyMuted;
      var v = video();
      if (v) { v.muted = storyMuted; v.play().catch(function () {}); }
      paintSound(!!v);
    };
    function pause() {
      clearTimeout(storyTimer);
      remaining = Math.max(300, remaining - (Date.now() - startedAt));
      bars[i].firstChild.style.animationPlayState = 'paused';
      if (video()) video().pause();
    }
    function resume() {
      if (!document.body.contains(form)) return;   // 已經離開限時動態
      startedAt = Date.now();
      bars[i].firstChild.style.animationPlayState = 'running';
      if (video()) video().play().catch(function () {});
      clearTimeout(storyTimer);
      storyTimer = setTimeout(function () { show(i + 1); }, remaining);
    }
    function show(k) {
      if (k < 0) k = 0;
      if (k >= items.length) { closeStory(); return; }
      i = k;
      // 影片（.mp4 / .mov / .webm）播完才換下一則；圖片 5 秒
      var src = items[i].image || '', isVideo = /\.(mp4|mov|webm)$/i.test(src);
      $('#ig-story-media').innerHTML = isVideo
        ? '<video src="' + esc(src) + '"' + (storyMuted ? ' muted' : '') + ' playsinline autoplay preload="auto"></video>'
        : '<img src="' + esc(src) + '" alt="">';
      paintSound(isVideo);
      $('.ig-story-time').textContent = items[i].time || '';
      $('#ig-story-cf').style.display = items[i].closeFriends ? '' : 'none';
      markFlag(items[i].flag);   // 限時動態寫了 flag → 看到時記錄進度
      bars.forEach(function (b, j) {
        b.className = j < i ? 'done' : '';
        b.firstChild.style.animation = 'none';
      });
      void bars[i].offsetWidth;                 // 重新開始進度條動畫
      bars[i].firstChild.style.animation = '';
      bars[i].className = 'run';
      var dur = 5000;
      remaining = dur; startedAt = Date.now();
      bars[i].firstChild.style.animationDuration = '';
      clearTimeout(storyTimer);
      storyTimer = setTimeout(function () { show(i + 1); }, dur);
      if (isVideo) {
        var v = video(), shown = i;
        clearTimeout(storyTimer);                // 等影片長度出來再計時
        bars[i].firstChild.style.animationPlayState = 'paused';
        v.addEventListener('loadedmetadata', function () {
          if (shown !== i) return;
          dur = (isFinite(v.duration) && v.duration > 0 ? v.duration : 15) * 1000;
          remaining = dur; startedAt = Date.now();
          bars[i].firstChild.style.animationDuration = dur + 'ms';
          bars[i].firstChild.style.animationPlayState = 'running';
          storyTimer = setTimeout(function () { show(i + 1); }, dur);
        });
        // 播不出來（格式不支援）就當作圖片，5 秒後換下一則
        v.addEventListener('error', function () {
          if (shown !== i) return;
          remaining = 5000; startedAt = Date.now();
          bars[i].firstChild.style.animationPlayState = 'running';
          storyTimer = setTimeout(function () { show(i + 1); }, 5000);
        });
        v.play().catch(function () {
          // 瀏覽器不允許有聲自動播放時，改成靜音播放
          if (!v.muted) { v.muted = true; storyMuted = true; paintSound(true); v.play().catch(function () {}); }
        });
      }
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
    // 往下滑關閉；只是點一下才換上一則／下一則
    var storyEl = $('.ig-story'), dragY = null, dragDy = 0, dragged = false;
    storyEl.addEventListener('pointerdown', function (e) {
      if (e.target.closest('form, .ig-story-head')) return;
      dragY = e.clientY; dragDy = 0; dragged = false;
    });
    storyEl.addEventListener('pointermove', function (e) {
      if (dragY === null) return;
      dragDy = Math.max(0, e.clientY - dragY);
      if (dragDy > 8 && !dragged) { dragged = true; pause(); storyEl.style.transition = 'none'; }
      if (dragged) {
        storyEl.style.transform = 'translateY(' + dragDy + 'px) scale(' + Math.max(.85, 1 - dragDy / 2000) + ')';
        storyEl.style.borderRadius = Math.min(24, dragDy / 4) + 'px';
      }
    });
    function dragEnd() {
      if (dragY === null) return;
      dragY = null;
      if (!dragged) return;
      storyEl.style.transition = '';
      if (dragDy > 110) {
        storyEl.style.transform = 'translateY(100%)';
        setTimeout(closeStory, 180);
      } else {
        storyEl.style.transform = ''; storyEl.style.borderRadius = '';
        resume();
      }
    }
    storyEl.addEventListener('pointerup', dragEnd);
    storyEl.addEventListener('pointercancel', dragEnd);
    $('.ig-story-tap').onclick = function (e) {
      if (dragged) return;
      if (e.target.hasAttribute('data-prev')) show(i - 1); else show(i + 1);
    };
    show(startAt);
  }

  // 粉絲／追蹤中名單（tab = "followers" 或 "following"）
  function renderIGFollows(tab, g, base) {
    var L = D.instagram;
    g = g || currentAccount(); base = base || '#/ig';
    var c = counts(g);
    // data.js 有 followersList / followingList 就照它顯示（帳號 id → 真的帳號；{ username, name } → 路人）
    var manual = tab === 'followers' ? g.followersList : g.followingList;
    var list = manual
      ? manual.map(function (x) {
          if (typeof x === 'string') {
            var f = fillerInfo(x) || {};
            return profileByName(x) || { username: x, name: f.name, avatar: f.avatar, filler: true };
          }
          return { username: x.username, name: x.name, avatar: x.avatar, filler: true };
        })
      : (tab === 'followers' ? followersOf(g) : followingOf(g));
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-pagehead">' + backBtn(base) +
        '<div class="ig-pagehead-t"><b>' + esc(g.username) + '</b></div>' +

      '</div>' +
      '<div class="ig-ftabs">' +
        '<a href="' + base + '/follows/followers"' + (tab === 'followers' ? ' class="on"' : '') + '>' + esc(c.followers) + ' ' + esc(L.followersLabel) + '</a>' +
        '<a href="' + base + '/follows/following"' + (tab === 'following' ? ' class="on"' : '') + '>' + esc(c.following) + ' ' + esc(L.followingLabel) + '</a>' +
      '</div>' +
      list.map(function (a) {
        return personRow(a,

          '<button class="ig-ico" data-na>' + ICON.dots + '</button>');
      }).join('');
  }

  // 搜尋頁：上方返回鍵＋搜尋框；沒輸入時列出搜尋紀錄（沒有就空白），輸入後列出符合的帳號
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
  // 搜尋紀錄：從搜尋結果點進去過的帳號（新的在前，存在瀏覽器裡）
  function searchHistory() {
    return (store.searchHistory || []).map(profileByName).filter(Boolean);
  }
  function addHistory(username) {
    var h = (store.searchHistory || []).filter(function (u) { return u !== username; });
    h.unshift(username);
    store.searchHistory = h.slice(0, 20);
    saveStore();
  }
  function resultRow(a, removable) {
    var href = a === currentAccount() ? '#/ig' : '#/ig/u/' + encodeURIComponent(a.username);
    return '<div class="ig-result-row">' +
      '<a class="ig-result" href="' + href + '" data-hist="' + esc(a.username) + '">' +
        '<img src="' + esc(a.avatar) + '" alt="">' +
        '<span><b>' + esc(a.username) + '</b><small>' + esc(a.name || '') + '</small></span></a>' +
      (removable ? '<button class="ig-hist-x" data-hist-x="' + esc(a.username) + '">' + ICON.close + '</button>' : '') +
    '</div>';
  }
  function renderSearchResults() {
    var L = D.instagram, box = $('#ig-search-body');
    if (!box) return;
    if (!searchQuery.trim()) {
      var hist = searchHistory();
      box.innerHTML = hist.length
        ? '<div class="ig-hist-title">' + esc(T().recentTitle) + '</div>' + hist.map(function (a) { return resultRow(a, true); }).join('')
        : '';
      return;
    }
    var found = searchMatches(searchQuery);
    box.innerHTML = found.length
      ? found.map(function (a) { return resultRow(a, false); }).join('')
      : '<div class="ig-noresult">' + esc(L.noResultText) + '</div>';
  }
  function renderIGSearch() {
    var L = D.instagram;
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-searchbar">' +
        '<a class="ig-ico" href="#/ig">' + ICON.back + '</a>' +
        '<label class="ig-search-input">' + ICON.search +
          '<input type="search" id="ig-search-q" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="' + esc(L.searchPlaceholder) + '">' +
        '</label>' +
      '</div>' +
      '<div id="ig-search-body"></div>';
    var input = $('#ig-search-q');
    input.value = searchQuery;
    input.addEventListener('input', function () { searchQuery = input.value; renderSearchResults(); });
    renderSearchResults();
  }

  // 編輯個人檔案：改名字和簡介（存在瀏覽器裡，重新開始會清掉）
  function applyEdits() {
    Object.keys(store.profileEdits || {}).forEach(function (u) {
      var a = profileByName(u), ed = store.profileEdits[u];
      if (!a) return;
      if (!a._orig) a._orig = { name: a.name, bio: a.bio };
      if (ed.name != null) a.name = ed.name;
      if (ed.bio) a.bio = ed.bio;
    });
  }
  function renderIGEdit() {
    var g = currentAccount(), t = T();
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<form class="ig-edit" id="ig-edit" autocomplete="off">' +
        '<div class="ig-edit-head">' +
          '<a href="#/ig">' + esc(t.cancelLabel) + '</a>' +
          '<b>' + esc(t.editTitle) + '</b>' +
          '<button type="submit">' + esc(t.doneLabel) + '</button>' +
        '</div>' +
        '<div class="ig-edit-av"><img src="' + esc(g.avatar) + '" alt=""></div>' +
        '<label class="ig-edit-row"><span>' + esc(t.nameLabel) + '</span><input name="nm" value="' + esc(g.name || '') + '" placeholder="' + esc(g.username) + '"></label>' +
        '<label class="ig-edit-row"><span>' + esc(t.bioLabel) + '</span><textarea name="bio" rows="4">' + esc((g.bio || []).join('\n')) + '</textarea></label>' +
      '</form>';
    $('#ig-edit').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target;
      store.profileEdits = store.profileEdits || {};
      store.profileEdits[g.username] = {
        name: f.nm.value.trim(),
        bio: f.bio.value.split('\n').map(function (l) { return l.trim(); }).filter(Boolean)
      };
      saveStore(); applyEdits();
      goBack('#/ig');
    });
  }

  // 分享個人檔案：複製目前網頁的連結
  function copyLink() {
    var url = location.href;
    function done() { toast(T().linkCopied); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, fallback);
    } else fallback();
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      ta.remove(); done();
    }
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
    if (e.target.closest('[data-share-profile]')) { copyLink(); return; }
    if ((el = e.target.closest('[data-hist-x]'))) {
      store.searchHistory = (store.searchHistory || []).filter(function (u) { return u !== el.dataset.histX; });
      saveStore(); renderSearchResults();
      return;
    }
    if ((el = e.target.closest('[data-hist]'))) addHistory(el.dataset.hist);   // 點進去的帳號記到搜尋紀錄（照常換頁）
    if ((el = e.target.closest('[data-back]'))) {
      e.preventDefault();
      goBack(el.getAttribute('href'));
      return;
    }
    if ((el = e.target.closest('[data-atab]'))) {
      e.preventDefault();
      archiveTab = el.dataset.atab; renderIGArchive();
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
        var fk = followKey(who);
        // 只能追蹤、不能取消（避免把非公開帳號退追後再也看不到）
        if (isFollowing(currentAccount(), who) || store.follows[fk] === 'req') return;
        store.follows[fk] = who.private ? 'req' : 1;   // 非公開帳號只會變「已要求」
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
    if (!e.target.classList.contains('ig-login-form')) return;   // 只處理登入表單
    e.preventDefault();
    var form = e.target;
    var u = form.u.value.trim(), pw = form.p.value;
    var acc = loginAccounts().filter(function (a) {
      return a.username === u && String(a.password) === pw;
    })[0];
    if (!acc) {
      form.p.value = '';
      toast(D.instagram.login.errorText || '帳號或密碼錯誤');
      return;
    }
    if (accState.loggedIn.indexOf(acc.username) < 0) accState.loggedIn.push(acc.username);
    markFlag('login_' + acc.username);   // 進度：登入過這個帳號
    accState.current = acc.username;
    saveAcc();
    form.reset();
    $('#toast').classList.remove('show');
    replaceHash('#/ig');
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
    if (parts[0] === 'ending') {
      if (!endingUnlocked()) { replaceHash('#/forum'); return; }
      openApp('ending');
      renderEnding();
    } else if (APPS[parts[0]]) {
      openApp(parts[0]);
      APPS[parts[0]](parts.slice(1).map(decodeURIComponent));
    } else if (parts[0] === 'forum') {
      openApp('forum');
      if (parts[1]) renderPost(decodeURIComponent(parts[1])); else renderForumList();
      $('#forum-scroll').scrollTop = 0;
    } else if (parts[0] === 'ig') {
      openApp('ig');
      stopStory();
      if (parts[1] === 'u') {
        // 別人的頁面：#/ig/u/帳號[/post/編號 | /story/編號]
        var who = profileByName(decodeURIComponent(parts[2] || ''));
        if (!who) { replaceHash('#/ig/search'); return; }
        if (who === currentAccount()) { replaceHash('#/ig' + (parts[3] ? '/' + parts.slice(3).join('/') : '')); return; }
        var base = '#/ig/u/' + encodeURIComponent(who.username);
        if (parts[3] && isLocked(who)) { replaceHash(base); return; }   // 非公開又沒追蹤：不能看貼文、限時、名單
        if (parts[3] === 'post') renderIGPost(+parts[4], who, base);
        else if (parts[3] === 'follows') renderIGFollows(parts[4], who, base);
        else if (parts[3] === 'story') renderIGStory(parts[4] === 'me' ? 'me' : +parts[4], who, base);
        else renderIG(who, base);
      }
      else if (parts[1] === 'search') renderIGSearch();
      else if (parts[1] === 'login') renderIGLogin();
      else if (parts[1] === 'edit') renderIGEdit();
      else if (parts[1] === 'settings') renderIGSettings();
      else if (parts[1] === 'saved') renderIGSaved();
      else if (parts[1] === 'archive' && parts[2] === 'post') renderIGPost(+parts[3], null, '#/ig/archive', 'archive');
      else if (parts[1] === 'archive') renderIGArchive();
      else if (parts[1] === 'closefriends') renderIGCloseFriends();
      else if (parts[1] === 'post') renderIGPost(+parts[2]);
      else if (parts[1] === 'follows') renderIGFollows(parts[2]);
      else if (parts[1] === 'story') renderIGStory(parts[2] === 'me' || /^archive-/.test(parts[2]) ? parts[2] : +parts[2]);
      else renderIG();
      // 粉絲／追蹤中名單只顯示一頁，不能滑動
      $('#app-ig').classList.remove('ig-noscroll');
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
    data: D, $: $, esc: esc, multiline: multiline, toast: toast, markFlag: markFlag, goBack: goBack, replaceHash: replaceHash,
    setDarkStatus: function (on) { $('#phone').classList.toggle('dark-status', !!on); },
    load: function (key, def) {
      try { var v = JSON.parse(localStorage.getItem(key)); return v == null ? def : v; } catch (e) { return def; }
    },
    save: function (key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
    }
  };

  /* ---------------- 感謝／劇情解說頁 ---------------- */
  function renderEnding() {
    var E = D.ending || {};
    $('#ending-scroll').innerHTML =
      '<div class="end">' +
        '<a class="end-back" href="#/forum">‹ ' + esc(E.backLabel || '返回') + '</a>' +
        (E.image ? '<img class="end-img" src="' + esc(E.image) + '" alt="">' : '') +
        '<h1>' + esc(E.title) + '</h1>' +
        (E.body || []).map(function (para) {
          return typeof para === 'string'
            ? '<p>' + multiline(para) + '</p>'
            : (para.image ? '<img class="end-img" src="' + esc(para.image) + '" alt="">' : '') + (para.heading ? '<h2>' + esc(para.heading) + '</h2>' : '') + (para.text ? '<p>' + multiline(para.text) + '</p>' : '');
        }).join('') +
        ((E.links || []).length ? '<div class="end-links">' + E.links.map(function (l) {
          return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a>';
        }).join('') + '</div>' : '') +
        '<button class="end-replay" id="end-replay">' + esc(E.replayLabel || '重新開始') + '</button>' +
      '</div>';
    $('#end-replay').onclick = function () {
      if (!confirm(E.replayConfirm || '要清除所有進度、從頭開始嗎？')) return;
      try {
        Object.keys(localStorage).forEach(function (k) { if (k.indexOf('sosho-') === 0) localStorage.removeItem(k); });
      } catch (e) {}
      location.href = location.pathname;   // 重新整理 → 回到手機密碼鎖
    };
  }

  /* ---------------- 手機密碼鎖 ---------------- */
  function renderLock() {
    var L = D.lock || {}, code = String(L.passcode || ''), typed = '';
    if (!code) return;   // 沒設密碼就不鎖
    var keys = [['1', ''], ['2', 'A B C'], ['3', 'D E F'], ['4', 'G H I'], ['5', 'J K L'], ['6', 'M N O'],
                ['7', 'P Q R S'], ['8', 'T U V'], ['9', 'W X Y Z'], ['', ''], ['0', ''], ['del', '']];
    var lock = $('#lock');
    lock.style.backgroundImage = 'url("' + (D.home && D.home.wallpaper) + '")';
    lock.innerHTML =
      '<div class="lock-shade"></div>' +
      '<div class="lock-inner">' +
        '<svg class="lock-ico" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2.5" fill="currentColor"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2" fill="none"/></svg>' +
        '<div class="lock-title">' + esc(L.title) + '</div>' +
        '<div class="lock-dots" id="lock-dots">' + code.split('').map(function () { return '<i></i>'; }).join('') + '</div>' +
        '<div class="lock-keys">' + keys.map(function (k) {
          if (k[0] === '') return '<span></span>';
          if (k[0] === 'del') return '<button class="lock-del" data-lock-del>' + esc(L.deleteLabel) + '</button>';
          return '<button class="lock-key" data-lock="' + k[0] + '"><b>' + k[0] + '</b>' + (k[1] ? '<small>' + k[1] + '</small>' : '') + '</button>';
        }).join('') + '</div>' +
      '</div>';
    $('#phone').classList.add('locked');
    function paint() {
      lock.querySelectorAll('.lock-dots i').forEach(function (d, i) { d.classList.toggle('on', i < typed.length); });
    }
    lock.addEventListener('click', function (e) {
      var k = e.target.closest('[data-lock]');
      if (k && typed.length < code.length) {
        typed += k.dataset.lock; paint();
        if (typed.length === code.length) {
          if (typed === code) {
            // 解鎖：往上滑走
            setTimeout(function () {
              lock.classList.add('unlocked');
              $('#phone').classList.remove('locked');
              setTimeout(function () { lock.remove(); }, 450);
            }, 120);
          } else {
            var dots = $('#lock-dots');
            dots.classList.remove('shake'); void dots.offsetWidth; dots.classList.add('shake');
            setTimeout(function () { typed = ''; paint(); }, 450);
          }
        }
      } else if (e.target.closest('[data-lock-del]')) {
        typed = typed.slice(0, -1); paint();
      }
    });
  }

  applyEdits();
  renderLock();
  renderHome();
  if (!location.hash) history.replaceState(null, '', '#/forum');  // 一進網頁先開論壇
  navStack.push(location.hash);
  window.addEventListener('hashchange', function () { trackNav(); route(); });
  route();
})();
