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
  function forumHeader() {
    var f = D.forum;
    return '<header class="f-header">' +
      '<a class="f-logo" href="#/forum"><img src="' + esc(f.logo) + '" alt=""></a>' +
      '<div class="f-title">' + esc(f.siteTitle) + '</div>' +
      '</header>';
  }

  function forumFooter() {
    var f = D.forum;
    return '<footer class="f-footer">' +
      '<div class="f-footer-links">' + f.footerLinks.map(esc).join('<i>|</i>') + '</div>' +
      '<div class="f-copy">' + esc(f.copyright) + '</div>' +
      '</footer>';
  }

  function renderForumList() {
    var f = D.forum;
    var list = f.posts.map(function (p) {
      return '<li><a href="#/forum/' + encodeURIComponent(p.id) + '">' +
        '<span class="heart">♥</span>' +
        '<span class="p-date">' + esc(p.date) + '</span>' +
        '<span class="p-title">' + esc(p.title) +
        (p.comments.length ? ' <em>[' + p.comments.length + ']</em>' : '') +
        '</span></a></li>';
    }).join('');

    var ads = f.ads.map(function (a, i) {
      return '<a class="ad" href="' + (a.link ? esc(a.link) : '#') + '" data-ad="' + i + '"' +
        (a.link ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<img src="' + esc(a.image) + '" alt=""></a>';
    }).join('');

    $('#forum-scroll').innerHTML = forumHeader() +
      '<div class="f-body">' +
        '<main class="f-main"><div class="f-box">' +
          '<div class="f-box-title">' + esc(f.listTitle) + '</div>' +
          '<ul class="f-list">' + list + '</ul>' +
        '</div></main>' +
        '<aside class="f-ads">' +
          '<div class="f-ads-title">' + esc(f.adTitle) + '</div>' + ads +
        '</aside>' +
      '</div>' + forumFooter();
  }

  function renderPost(id) {
    var f = D.forum;
    var p = f.posts.filter(function (x) { return String(x.id) === String(id); })[0];
    if (!p) { renderForumList(); return; }

    var photos = (p.photos || []).map(function (src) {
      return '<img class="pd-photo" src="' + esc(src) + '" alt="">';
    }).join('');

    var comments = p.comments.map(function (c) {
      return '<div class="pd-comment"><b>' + esc(c.name) + '</b><span class="pd-colon">:</span>' +
        '<span class="pd-ctext">' + multiline(c.text) + '</span></div>';
    }).join('');

    $('#forum-scroll').innerHTML = forumHeader() +
      '<div class="pd">' +
        '<a class="pd-back" href="#/forum">‹ ' + esc(f.backLabel) + '</a>' +
        '<div class="pd-head"><span class="p-date">' + esc(p.date) + '</span> ' + esc(p.title) + '</div>' +
        '<div class="pd-main">' +
          '<div class="pd-avatar"><img src="' + esc(p.avatar) + '" alt=""></div>' +
          '<div class="pd-text">' +
            (p.mood ? '<div class="pd-mood"><img src="' + esc(p.mood) + '" alt=""></div>' : '') +
            '<div class="pd-content">' + multiline(p.content) + '</div>' +
          '</div>' +
        '</div>' +
        photos +
        '<div class="pd-sep"></div>' +
        '<div class="pd-cbar">' +
          '<span>' + esc(f.commentLabel) + ' (' + p.comments.length + ')' +
            (p.comments.length ? ' <i class="pd-new">' + esc(f.newBadge) + '</i>' : '') + '</span>' +
          '<span>' + esc(f.writeCommentLabel) + '</span>' +
        '</div>' +
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
    threads: '<svg viewBox="0 0 24 24"><path d="M16.5 11.2c-.6-2.6-2.4-3.8-4.7-3.8-2.6 0-4.1 1.8-4.1 1.8M15.9 11.5c-2.6-.4-6 0-6 2.5 0 2.7 5.4 3.1 6-1 .5-3.5-.4-6-1-7M19.5 9C18.4 4.9 15.8 3 12 3 7 3 4 6.6 4 12s3 9 8 9c4.1 0 7.4-2.4 7.4-5.6 0-2.4-1.6-3.6-3.5-4.1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
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
        '<span class="ig-ico">' + ICON.plus + '</span>' +
        '<span class="ig-user"><u>' + esc(g.username) + '</u>' + ICON.chevron + '</span>' +
        '<span class="ig-top-r">' +
          '<button class="ig-ico"' + na + '>' + ICON.threads + '</button>' +
          '<button class="ig-ico"' + na + '>' + ICON.menu + '</button>' +
        '</span>' +
      '</div>' +

      '<div class="ig-profile">' +
        '<button class="ig-avatar' + (g.hasStory ? ' has-story' : '') + '"' + na + '>' +
          '<img src="' + esc(g.avatar) + '" alt="">' +
          '<span class="ig-add">+</span>' +
        '</button>' +
        (g.note ? '<div class="ig-note">' + esc(g.note) + '</div>' : '') +
        '<div class="ig-right">' +
          '<div class="ig-name">' + esc(g.name) + ' <span>' + esc(g.nameSuffix) + '</span></div>' +
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
  }

  $('#ig-scroll').addEventListener('click', function (e) {
    if (e.target.closest('[data-na]')) toast();
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
  renderIG();
  if (!location.hash) history.replaceState(null, '', '#/forum');  // 一進網頁先開論壇
  window.addEventListener('hashchange', route);
  route();
})();
