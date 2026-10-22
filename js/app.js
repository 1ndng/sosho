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
    var list = f.posts.map(function (p) {
      // 未讀 ❗️、已讀 ❕
      return '<li><a href="#/forum/' + encodeURIComponent(p.id) + '">' +
        '<span class="mark">' + (readPosts[p.id] ? '❕' : '❗️') + '</span>' +
        '<span class="p-title">' + esc(p.title) + '</span></a></li>';
    }).join('');

    var ads = f.ads.map(function (a, i) {
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

    var comments = p.comments.map(function (c) {
      return '<div class="pd-comment"><b>' + esc(c.name) + '</b><span class="pd-colon">:</span>' +
        '<span class="pd-ctext">' + multiline(c.text) + '</span></div>';
    }).join('');

    $('#forum-scroll').innerHTML =
      '<div class="pd">' +
        '<a class="pd-back" href="#/forum">‹ ' + esc(f.backLabel) + '</a>' +
        '<div class="pd-head"><span class="p-date">' + esc(p.date) + '</span> ' + esc(p.title) + '</div>' +
        '<div class="pd-author">' + esc(p.author) + '</div>' +
        '<div class="pd-content">' + multiline(p.content) + '</div>' +
        '<div class="pd-sep"></div>' +
        '<div class="pd-cbar">' + esc(f.commentLabel) + ' (' + p.comments.length + ')</div>' +
        comments +
      '</div>' + forumFooter();
  }

  // 廣告沒有連結時 → 顯示尚未更新
  $('#forum-scroll').addEventListener('click', function (e) {
    var ad = e.target.closest('.ad');
    if (ad && !D.forum.ads[ad.dataset.ad].link) { e.preventDefault(); toast(); }
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
    tagged: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6.5 20.5c1-3 3-4.3 5.5-4.3s4.5 1.3 5.5 4.3" stroke="currentColor" stroke-width="2" fill="none"/></svg>'
  };

  function bioLine(s) {
    return esc(s).replace(/(@[\w.]+)/g, '<span class="ig-mention" data-na>$1</span>');
  }

  function renderIG() {
    var g = D.instagram;
    var na = ' data-na';   // 標記：點擊後跳出「尚未更新」

    $('#ig-scroll').innerHTML =
      '<div class="ig-top">' +
        '<span></span>' +
        '<button class="ig-user" data-sheet>' + esc(g.username) + ICON.chevron + '</button>' +
        '<span class="ig-top-r">' +
          '<button class="ig-ico"' + na + '>' + ICON.menu + '</button>' +
        '</span>' +
      '</div>' +

      '<div class="ig-profile">' +
        '<button class="ig-avatar' + (g.hasStory ? ' has-story' : '') + '"' + na + '>' +
          '<img src="' + esc(g.avatar) + '" alt="">' +
        '</button>' +
        '<div class="ig-right">' +
          '<div class="ig-name">' + esc(g.name) + '</div>' +
          '<div class="ig-stats">' +
            '<div><b>' + esc(g.postsCount) + '</b>' + esc(g.postsLabel) + '</div>' +
            '<button' + na + '><b>' + esc(g.followersCount) + '</b>' + esc(g.followersLabel) + '</button>' +
            '<button' + na + '><b>' + esc(g.followingCount) + '</b>' + esc(g.followingLabel) + '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="ig-bio">' + g.bio.map(function (l) { return '<div>' + bioLine(l) + '</div>'; }).join('') + '</div>' +

      (g.music && g.music.title ?
        '<button class="ig-music"' + na + '>' + ICON.play +
          '<b>' + esc(g.music.title) + '</b><span> · ' + esc(g.music.artist) + '</span></button>' : '') +

      '<div class="ig-btns">' +
        '<button>' + esc(g.editProfileLabel) + '</button>' +
        '<button>' + esc(g.shareProfileLabel) + '</button>' +
      '</div>' +

      '<div class="ig-hl">' + g.highlights.map(function (h) {
        return '<button class="ig-hl-item"' + na + '><span class="ig-hl-img"><img src="' + esc(h.image) + '" alt=""></span>' +
          '<span class="ig-hl-label">' + esc(h.label) + '</span></button>';
      }).join('') + '</div>' +

      '<div class="ig-tabs">' +
        '<button class="active">' + ICON.grid + '</button>' +
        '<button' + na + '>' + ICON.repost + '</button>' +
        '<button' + na + '>' + ICON.tagged + '</button>' +
      '</div>' +

      '<div class="ig-grid">' + g.posts.map(function (src) {
        return '<button' + na + '><img src="' + esc(src) + '" alt=""></button>';
      }).join('') + '</div>';

    // 切換帳號清單（從下方滑出）
    $('#ig-overlay').innerHTML =
      '<div class="ig-sheet-wrap" id="ig-sheet">' +
        '<div class="ig-sheet-bg" data-close-sheet></div>' +
        '<div class="ig-sheet">' +
          '<div class="ig-sheet-handle" data-close-sheet></div>' +
          '<div class="ig-acc-list">' +
            '<button class="ig-acc" data-close-sheet>' +
              '<img src="' + esc(g.avatar) + '" alt="">' +
              '<span class="ig-acc-name">' + esc(g.username) + '</span>' +
              '<span class="ig-acc-check">' + ICON.check + '</span>' +
            '</button>' +
            '<a class="ig-acc" href="#/ig/login">' +
              '<span class="ig-acc-plus">' + ICON.plus + '</span>' +
              '<span class="ig-acc-name">' + esc(g.addAccountLabel) + '</span>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // 登入畫面：純裝飾，表單不會送出、不會儲存任何輸入
  function renderIGLogin() {
    var l = D.instagram.login;
    $('#ig-overlay').innerHTML = '';
    $('#ig-scroll').innerHTML =
      '<div class="ig-login">' +
        '<div class="ig-login-top">' +
          '<a class="ig-login-back" href="#/ig">' + ICON.back + '</a>' +
          '<img class="ig-login-logo" src="' + esc(l.logo) + '" alt="">' +
        '</div>' +
        '<form class="ig-login-form" autocomplete="off">' +
          '<input type="text" placeholder="' + esc(l.usernamePlaceholder) + '" autocomplete="off">' +
          '<input type="password" placeholder="' + esc(l.passwordPlaceholder) + '" autocomplete="off">' +
          '<button type="submit" class="ig-login-btn">' + esc(l.loginLabel) + '</button>' +
          '<button type="button" class="ig-login-forgot" data-na>' + esc(l.forgotLabel) + '</button>' +
        '</form>' +
      '</div>';
  }

  $('#app-ig').addEventListener('click', function (e) {
    if (e.target.closest('[data-sheet]')) $('#ig-sheet').classList.add('show');
    else if (e.target.closest('[data-close-sheet]')) $('#ig-sheet').classList.remove('show');
    else if (e.target.closest('[data-na]')) toast();
  });
  $('#ig-scroll').addEventListener('submit', function (e) {
    e.preventDefault();
    e.target.reset();
    toast();
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
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    if (parts[0] === 'forum') {
      openApp('forum');
      if (parts[1]) renderPost(decodeURIComponent(parts[1])); else renderForumList();
      $('#forum-scroll').scrollTop = 0;
    } else if (parts[0] === 'ig') {
      openApp('ig');
      if (parts[1] === 'login') renderIGLogin(); else renderIG();
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
  renderHome();
  if (!location.hash) history.replaceState(null, '', '#/forum');  // 一進網頁先開論壇
  window.addEventListener('hashchange', route);
  route();
})();
