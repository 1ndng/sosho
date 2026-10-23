/* 相簿：圖庫（#/photos）、單張檢視（#/photos/編號，可左右滑） */
(function () {
  'use strict';

  var KEY = 'sosho-photos';   // { fav: { 編號: 1 } }

  var ICON = {
    back: '<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 10.5H6.5a1.5 1.5 0 0 0-1.5 1.5v7.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V12a1.5 1.5 0 0 0-1.5-1.5H16" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20.5s-8-4.9-8-11A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8 2.9c0 6.1-8 11-8 11z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/></svg>',
    heartFill: '<svg viewBox="0 0 24 24"><path d="M12 20.5s-8-4.9-8-11A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8 2.9c0 6.1-8 11-8 11z" fill="currentColor"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 10.5v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="7.3" r="1.1" fill="currentColor"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 6.5h16M9.5 6.5V4.5h5v2M6.5 6.5l1 13.5h9l1-13.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function S() { return window.SOSHO; }
  function P() { return S().data.photos || { items: [] }; }

  function renderGrid() {
    var p = P(), esc = S().esc, items = p.items || [];
    S().$('#photos-scroll').innerHTML =
      '<div class="pt-head"><h1>' + esc(p.title) + '</h1><span>' + esc(String(p.countText || '').replace('{n}', items.length)) + '</span></div>' +
      '<div class="pt-grid">' + items.map(function (it, i) {
        return '<a href="#/photos/' + i + '"><img src="' + esc(it.image) + '" alt="" loading="lazy"></a>';
      }).join('') + '</div>';
    // 和 iPhone 一樣，打開時停在最新（最下面）
    var sc = S().$('#photos-scroll');
    requestAnimationFrame(function () { sc.scrollTop = sc.scrollHeight; });
  }

  function renderViewer(idx) {
    var p = P(), esc = S().esc, items = p.items || [];
    if (!items[idx]) { location.replace('#/photos'); return; }
    var fav = S().load(KEY, { fav: {} }).fav || {};
    S().$('#photos-overlay').innerHTML =
      '<div class="pt-view">' +
        '<div class="pt-view-top">' +
          '<a class="pt-back" href="#/photos">' + ICON.back + '</a>' +
          '<div class="pt-date" id="pt-date">' + esc(items[idx].date || '') + '</div>' +
          '<span class="pt-top-sp"></span>' +
        '</div>' +
        '<div class="pt-strip" id="pt-strip">' + items.map(function (it) {
          return '<div class="pt-slide"><img src="' + esc(it.image) + '" alt=""></div>';
        }).join('') + '</div>' +
        '<div class="pt-bar">' +
          '<button data-na>' + ICON.share + '</button>' +
          '<button id="pt-fav"></button>' +
          '<button data-na>' + ICON.info + '</button>' +
          '<button data-na>' + ICON.trash + '</button>' +
        '</div>' +
      '</div>';
    var strip = S().$('#pt-strip'), cur = idx;
    function paint() {
      S().$('#pt-date').textContent = items[cur].date || '';
      var b = S().$('#pt-fav');
      b.innerHTML = fav[cur] ? ICON.heartFill : ICON.heart;
      b.classList.toggle('on', !!fav[cur]);
    }
    requestAnimationFrame(function () { strip.scrollLeft = idx * strip.clientWidth; });
    strip.addEventListener('scroll', function () {
      var i = Math.round(strip.scrollLeft / strip.clientWidth);
      if (i !== cur && items[i]) { cur = i; history.replaceState(null, '', '#/photos/' + i); paint(); }
    });
    S().$('#pt-fav').onclick = function () {
      if (fav[cur]) delete fav[cur]; else fav[cur] = 1;
      S().save(KEY, { fav: fav });
      paint();
    };
    paint();
  }

  var gridDone = false;
  function route(parts) {
    // 圖庫只畫一次，從單張返回時停在原本捲到的位置
    if (!gridDone) { renderGrid(); gridDone = true; }
    if (parts[0] !== undefined && parts[0] !== '') renderViewer(+parts[0]);
    else S().$('#photos-overlay').innerHTML = '';
  }

  document.addEventListener('click', function (e) {
    var app = document.getElementById('app-photos');
    if (app && app.contains(e.target) && e.target.closest('[data-na]')) S().toast();
  });

  (window.SOSHO_APPS = window.SOSHO_APPS || {}).photos = route;
})();
