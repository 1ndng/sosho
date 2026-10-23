/* 電話：最近通話（#/phone）、聯絡資訊（#/phone/info/名字） */
(function () {
  'use strict';

  var KEY = 'sosho-phone';
  var filter = 'all';        // all | missed
  var dialed = '';           // 數字鍵盤目前輸入的號碼
  var callTimer = null;

  var ICON = {
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M12 10.5v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="7.3" r="1.1" fill="currentColor"/></svg>',
    out: '<svg viewBox="0 0 24 24"><path d="M6.5 3.5c.8-.3 1.6 0 2 .7l1.6 3c.4.7.2 1.6-.4 2.1l-1.4 1.1c.9 2 2.5 3.6 4.5 4.5l1.1-1.4c.5-.6 1.4-.8 2.1-.4l3 1.6c.7.4 1 1.2.7 2l-.7 1.6c-.5 1.1-1.6 1.7-2.8 1.6C9.5 19 4.9 14.5 4.1 7.8 4 6.6 4.6 5.5 5.7 5z" fill="currentColor"/><path d="M14 4h6v6M20 4l-6.5 6.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 16.9l-5.4 2.9 1.1-6.1-4.5-4.3 6.1-.8z" fill="currentColor"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 6.5V12l3.5 2.2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    person: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><circle cx="12" cy="9.5" r="3.4" fill="#fff"/><path d="M5.8 18.6c1.3-2.6 3.5-3.9 6.2-3.9s4.9 1.3 6.2 3.9" fill="#fff"/></svg>',
    keypad: '<svg viewBox="0 0 24 24"><g fill="currentColor"><circle cx="6" cy="4.5" r="2.1"/><circle cx="12" cy="4.5" r="2.1"/><circle cx="18" cy="4.5" r="2.1"/><circle cx="6" cy="10.5" r="2.1"/><circle cx="12" cy="10.5" r="2.1"/><circle cx="18" cy="10.5" r="2.1"/><circle cx="6" cy="16.5" r="2.1"/><circle cx="12" cy="16.5" r="2.1"/><circle cx="18" cy="16.5" r="2.1"/><circle cx="12" cy="22" r="2"/></g></svg>',
    msg: '<svg viewBox="0 0 24 24"><path d="M12 4C7 4 3 7.3 3 11.4c0 2.3 1.3 4.4 3.3 5.7L5.6 20l3.6-1.9c.9.2 1.8.3 2.8.3 5 0 9-3.3 9-7.4S17 4 12 4z" fill="currentColor"/></svg>',
    call: '<svg viewBox="0 0 24 24"><path d="M6.5 3.5c.8-.3 1.6 0 2 .7l1.6 3c.4.7.2 1.6-.4 2.1l-1.4 1.1c.9 2 2.5 3.6 4.5 4.5l1.1-1.4c.5-.6 1.4-.8 2.1-.4l3 1.6c.7.4 1 1.2.7 2l-.7 1.6c-.5 1.1-1.6 1.7-2.8 1.6C9.5 19 4.9 14.5 4.1 7.8 4 6.6 4.6 5.5 5.7 5z" fill="currentColor"/></svg>',
    video: '<svg viewBox="0 0 24 24"><rect x="2.5" y="6" width="13" height="12" rx="3" fill="currentColor"/><path d="M16.5 10.5 21.5 7v10l-5-3.5z" fill="currentColor"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="currentColor"/><path d="m4 7 8 6 8-6" stroke="#fff" stroke-width="1.6" fill="none"/></svg>',
    addContact: '<svg viewBox="0 0 24 24"><circle cx="14" cy="10" r="8" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="14" cy="8.3" r="2.8" fill="currentColor"/><path d="M9.4 15.6c1-1.7 2.7-2.6 4.6-2.6s3.6.9 4.6 2.6" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="6" cy="17" r="4.6" fill="#fff"/><circle cx="6" cy="17" r="4" fill="currentColor"/><path d="M6 15v4M4 17h4" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>',
    del: '<svg viewBox="0 0 34 24"><path d="M10 2h20a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H10L1 12z" fill="#e5e5ea"/><path d="M15 8l8 8M23 8l-8 8" stroke="#000" stroke-width="2.2" stroke-linecap="round"/></svg>',
    end: '<svg viewBox="0 0 24 24"><path d="M3 14.5c4.9-4.4 13.1-4.4 18 0l-1.9 2.4c-.4.5-1.2.6-1.8.3l-2.4-1.4c-.5-.3-.8-.9-.7-1.5l.2-1.4c-2.1-.7-4.7-.7-6.8 0l.2 1.4c.1.6-.2 1.2-.7 1.5l-2.4 1.4c-.6.3-1.4.2-1.8-.3z" fill="currentColor"/></svg>'
  };

  function S() { return window.SOSHO; }
  function P() { return S().data.phone || { calls: [] }; }

  // 玩家撥出的電話（存在瀏覽器裡）放在最前面
  function allCalls() {
    var added = S().load(KEY, { calls: [] }).calls || [];
    return added.concat(P().calls || []);
  }

  function nowLabel() {
    var d = new Date(), h = d.getHours(), m = String(d.getMinutes()).padStart(2, '0');
    return (h < 12 ? '上午 ' : '下午 ') + (h % 12 || 12) + ':' + m;
  }

  function initials(name) { return String(name || '?').trim().charAt(0).toUpperCase(); }

  function renderList() {
    var p = P(), esc = S().esc;
    var calls = allCalls().filter(function (c) { return filter === 'all' || c.missed; });
    // 依 date 分組（保持出現順序）
    var groups = [], byDate = {};
    calls.forEach(function (c) {
      if (!byDate[c.date]) { byDate[c.date] = []; groups.push(c.date); }
      byDate[c.date].push(c);
    });
    S().$('#phone-overlay').innerHTML = '';
    S().$('#phone-scroll').innerHTML =
      '<div class="ph-top">' +
        '<span></span>' +
        '<div class="ph-seg">' +
          '<button data-filter="all"' + (filter === 'all' ? ' class="on"' : '') + '>' + esc(p.filterAll) + '</button>' +
          '<button data-filter="missed"' + (filter === 'missed' ? ' class="on"' : '') + '>' + esc(p.filterMissed) + '</button>' +
        '</div>' +
        '<span class="ph-top-sp"></span>' +
      '</div>' +
      '<h1 class="ph-title">' + esc(p.title) + '</h1>' +
      groups.map(function (d) {
        return '<div class="ph-group">' +
          '<div class="ph-date">' + esc(d) + '</div>' +
          '<div class="ph-rows">' + byDate[d].map(function (c) {
            return '<div class="ph-row">' +
              '<span class="ph-out">' + (c.outgoing ? ICON.out : '') + '</span>' +
              '<button class="ph-main" data-call="' + esc(c.name) + '">' +
                '<span class="ph-name' + (c.missed ? ' missed' : '') + '">' + esc(c.name) +
                  (c.count > 1 ? ' <span class="ph-cnt">(' + c.count + ')</span>' : '') + '</span>' +
                '<span class="ph-type">' + esc(c.type || '') + '</span>' +
              '</button>' +
              '<span class="ph-time">' + esc(c.time || '') + '</span>' +
              '<a class="ph-info" href="#/phone/info/' + encodeURIComponent(c.name) + '">' + ICON.info + '</a>' +
            '</div>';
          }).join('') + '</div>' +
        '</div>';
      }).join('');
    renderTabs(0);
  }

  function renderInfo(name) {
    var p = P(), esc = S().esc;
    var mine = allCalls().filter(function (c) { return c.name === name; });
    var acts = p.detailActions || [];
    var icons = [ICON.msg, ICON.call, ICON.video, ICON.mail];
    S().$('#phone-overlay').innerHTML = '';
    S().$('#phone-scroll').innerHTML =
      '<div class="ph-top"><a class="ph-link ph-back" href="#/phone">' + ICON.back + esc(p.title) + '</a></div>' +
      '<div class="ph-card">' +
        '<div class="ph-avatar">' + esc(initials(name)) + '</div>' +
        '<div class="ph-card-name">' + esc(name) + '</div>' +
        '<div class="ph-acts">' + acts.map(function (a, i) {
          return i === 1
            ? '<button data-call="' + esc(name) + '">' + icons[i] + '<span>' + esc(a) + '</span></button>'
            : '<button data-na>' + icons[i] + '<span>' + esc(a) + '</span></button>';
        }).join('') + '</div>' +
      '</div>' +
      '<div class="ph-hist">' + mine.map(function (c) {
        return '<div class="ph-hist-row">' +
          '<span><b>' + esc(c.date) + '</b> ' + esc(c.time || '') + '</span>' +
          '<span class="' + (c.missed ? 'missed' : '') + '">' + esc(c.type || '') + (c.count > 1 ? ' (' + c.count + ')' : '') + '</span>' +
        '</div>';
      }).join('') + '</div>';
    renderTabs(0);
  }

  // 下方標籤：通話記錄、聯絡人（尚未更新）、數字鍵盤
  function renderTabs(active) {
    var p = P(), esc = S().esc, names = p.tabs || [];
    var icons = [ICON.clock, ICON.person, ICON.keypad];
    var hrefs = ['#/phone', null, '#/phone/keypad'];
    var bar = document.createElement('nav');
    bar.className = 'ph-tabs';
    bar.innerHTML = names.map(function (t, i) {
      var inner = icons[i] + '<span>' + esc(t) + '</span>';
      return hrefs[i]
        ? '<a href="' + hrefs[i] + '"' + (i === active ? ' class="on"' : '') + '>' + inner + '</a>'
        : '<button data-na>' + inner + '</button>';
    }).join('');
    S().$('#phone-overlay').appendChild(bar);
  }

  /* ---- 數字鍵盤 ---- */
  var KEYS = [['1', ''], ['2', 'ABC'], ['3', 'DEF'], ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
              ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'], ['*', ''], ['0', '+'], ['#', '']];

  function renderKeypad() {
    var esc = S().esc;
    S().$('#phone-overlay').innerHTML = '';
    S().$('#phone-scroll').innerHTML =
      '<div class="ph-kp">' +
        '<div class="ph-kp-top"><button class="ph-kp-add" data-na>' + ICON.addContact + '</button></div>' +
        '<div class="ph-kp-num" id="ph-kp-num"></div>' +
        '<div class="ph-kp-keys">' + KEYS.map(function (k) {
          return '<button class="ph-key" data-key="' + esc(k[0]) + '"><b>' + esc(k[0]) + '</b>' +
            (k[1] ? '<small>' + esc(k[1]) + '</small>' : '') + '</button>';
        }).join('') + '</div>' +
        '<div class="ph-kp-bottom">' +
          '<span></span>' +
          '<button class="ph-kp-call" data-dial>' + ICON.call + '</button>' +
          '<button class="ph-kp-del" id="ph-kp-del" data-del>' + ICON.del + '</button>' +
        '</div>' +
      '</div>';
    paintNumber();
    renderTabs(2);
  }
  function paintNumber() {
    var n = document.getElementById('ph-kp-num');
    if (!n) return;
    n.textContent = dialed;
    n.classList.toggle('long', dialed.length > 11);
    document.getElementById('ph-kp-del').style.visibility = dialed ? 'visible' : 'hidden';
  }
  // 撥出的號碼在 dialable 裡 → 顯示對應的名字
  function nameForNumber(num) {
    var hit = (P().dialable || []).filter(function (d) { return String(d.number).replace(/\D/g, '') === num.replace(/\D/g, ''); })[0];
    return hit && hit.name ? hit.name : num;
  }

  // 撥號畫面：3 秒後顯示「無人接聽」，按結束後把這通電話加進最近通話
  function startCall(name) {
    var p = P(), esc = S().esc;
    var btns = p.callButtons || [];
    var ov = document.createElement('div');
    ov.className = 'ph-calling';
    ov.innerHTML =
      '<div class="ph-calling-status" id="ph-status">' + esc(p.callingText) + '</div>' +
      '<div class="ph-calling-name">' + esc(name) + '</div>' +
      '<div class="ph-calling-grid">' + btns.map(function (b) {
        return '<button data-na><span></span>' + esc(b) + '</button>';
      }).join('') + '</div>' +
      '<button class="ph-end" data-end="' + esc(name) + '">' + ICON.end + '</button>' +
      '<div class="ph-end-label">' + esc(p.endLabel) + '</div>';
    S().$('#phone-overlay').appendChild(ov);
    S().setDarkStatus(true);
    clearTimeout(callTimer);
    callTimer = setTimeout(function () {
      var st = document.getElementById('ph-status');
      if (st) st.textContent = p.noAnswerText;
    }, 3000);
  }

  function endCall(name) {
    clearTimeout(callTimer);
    S().setDarkStatus(false);
    var p = P(), st = S().load(KEY, { calls: [] });
    var first = st.calls[0];
    if (first && first.name === name && first.outgoing && first.date === p.todayLabel) {
      first.count = (first.count || 1) + 1;
      first.time = nowLabel();
    } else {
      st.calls.unshift({ date: p.todayLabel, name: name, count: 1, missed: false, outgoing: true, type: '行動電話', time: nowLabel() });
    }
    S().save(KEY, st);
    route(current);
  }

  var current = [];
  function route(parts) {
    current = parts;
    clearTimeout(callTimer);
    if (parts[0] === 'info' && parts[1]) renderInfo(parts[1]);
    else if (parts[0] === 'keypad') renderKeypad();
    else renderList();
    S().$('#phone-scroll').scrollTop = 0;
  }

  document.addEventListener('click', function (e) {
    var app = document.getElementById('app-phone');
    if (!app || !app.contains(e.target)) return;
    var el;
    if ((el = e.target.closest('[data-filter]'))) { filter = el.dataset.filter; renderList(); return; }
    if ((el = e.target.closest('[data-key]'))) { if (dialed.length < 20) dialed += el.dataset.key; paintNumber(); return; }
    if (e.target.closest('[data-del]')) { dialed = dialed.slice(0, -1); paintNumber(); return; }
    if (e.target.closest('[data-dial]')) { if (dialed) startCall(nameForNumber(dialed)); return; }
    if ((el = e.target.closest('[data-end]'))) { endCall(el.dataset.end); return; }
    if ((el = e.target.closest('[data-call]'))) { startCall(el.dataset.call); return; }
    if (e.target.closest('[data-na]')) S().toast();
  });

  (window.SOSHO_APPS = window.SOSHO_APPS || {}).phone = route;
})();
