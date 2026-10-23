/* KakaoTalk：친구（#/kakao）、채팅 列表（#/kakao/chats）、我的資料（#/kakao/me）、聊天室（#/kakao/chat/好友id） */
(function () {
  'use strict';

  var KEY = 'sosho-kakao';    // { msgs: { 好友id: [玩家傳的訊息＋自動回覆] }, unread: { 好友id: 數字 } }
  var openChatId = null;      // 目前開著的聊天室

  var ICON = {
    search: '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.9" fill="none"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    addFriend: '<svg viewBox="0 0 24 24"><circle cx="10" cy="8" r="4" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M3 20c.7-3.7 3.4-5.8 7-5.8 1.6 0 3 .4 4.2 1.2M18 13v7M14.5 16.5h7" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>',
    music: '<svg viewBox="0 0 24 24"><path d="M9 18V5.5l11-2v12" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="2.5" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="17.5" cy="15.5" r="2.5" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    chatAdd: '<svg viewBox="0 0 24 24"><path d="M12 4C7 4 3 7.1 3 11c0 2.4 1.5 4.5 3.8 5.8L6 20l3.8-2.2c.7.1 1.4.2 2.2.2 5 0 9-3.1 9-7s-4-7-9-7z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M12 8v6M9 11h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    tabFriends: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.2" fill="currentColor"/><path d="M4 20.5c.8-4.3 4-6.5 8-6.5s7.2 2.2 8 6.5z" fill="currentColor"/></svg>',
    tabChats: '<svg viewBox="0 0 24 24"><path d="M12 3.5C6.8 3.5 2.5 6.9 2.5 11c0 2.6 1.7 4.9 4.3 6.3L5.9 21l4.2-2.6c.6.1 1.2.1 1.9.1 5.2 0 9.5-3.4 9.5-7.5S17.2 3.5 12 3.5z" fill="currentColor"/></svg>',
    tabOpen: '<svg viewBox="0 0 24 24"><path d="M12 3.5C6.8 3.5 2.5 6.9 2.5 11c0 2.6 1.7 4.9 4.3 6.3L5.9 21l4.2-2.6c.6.1 1.2.1 1.9.1 5.2 0 9.5-3.4 9.5-7.5S17.2 3.5 12 3.5z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="8" cy="11" r="1.2" fill="currentColor"/><circle cx="12" cy="11" r="1.2" fill="currentColor"/><circle cx="16" cy="11" r="1.2" fill="currentColor"/></svg>',
    tabShop: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12.5H6z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>',
    tabMore: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.9" fill="currentColor"/><circle cx="12" cy="12" r="1.9" fill="currentColor"/><circle cx="19" cy="12" r="1.9" fill="currentColor"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M4 6.5h16M4 12h16M4 17.5h16" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M5.5 5.5l13 13M18.5 5.5l-13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    emoji: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="9" cy="10" r="1.2" fill="currentColor"/><circle cx="15" cy="10" r="1.2" fill="currentColor"/><path d="M8.3 14c.9 1.5 2.2 2.3 3.7 2.3s2.8-.8 3.7-2.3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>',
    send: '<svg viewBox="0 0 24 24"><path d="M12 19V6M6.5 11.5 12 6l5.5 5.5" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    selfChat: '<svg viewBox="0 0 24 24"><path d="M12 4C7 4 3 7.1 3 11c0 2.4 1.5 4.5 3.8 5.8L6 20l3.8-2.2c.7.1 1.4.2 2.2.2 5 0 9-3.1 9-7s-4-7-9-7z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/></svg>',
    edit: '<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/></svg>',
    story: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M10 8.5v7l5.5-3.5z" fill="currentColor"/></svg>'
  };

  function S() { return window.SOSHO; }
  function K() { return S().data.kakao || { me: {}, friends: [], text: {} }; }
  function TX() { return K().text || {}; }
  function esc(s) { return S().esc(s); }
  function state() {
    var st = S().load(KEY, null) || {};
    st.msgs = st.msgs || {}; st.unread = st.unread || {};
    return st;
  }
  function friend(id) { return (K().friends || []).filter(function (f) { return String(f.id) === String(id); })[0]; }
  function messagesOf(f) { return (f.messages || []).concat(state().msgs[f.id] || []); }
  function unreadOf(f) {
    var st = state();
    return st.unread[f.id] != null ? st.unread[f.id] : (f.unread || 0);
  }
  function nowTime() {
    var d = new Date(), h = d.getHours(), ap = TX().ampm || ['오전', '오후'];
    return ap[h < 12 ? 0 : 1] + ' ' + (h % 12 || 12) + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function tabbar(active) {
    var names = TX().tabs || [];
    // 下方只留 친구、채팅 兩個
    var icons = [ICON.tabFriends, ICON.tabChats];
    var hrefs = ['#/kakao', '#/kakao/chats'];
    var totalUnread = (K().friends || []).reduce(function (n, f) { return n + unreadOf(f); }, 0);
    return '<nav class="kk-tabs">' + icons.map(function (ic, i) {
      var label = '<span>' + esc(names[i] || '') + '</span>';
      var badge = i === 1 && totalUnread ? '<i class="kk-badge">' + totalUnread + '</i>' : '';
      return '<a href="' + hrefs[i] + '"' + (active === i ? ' class="on"' : '') + '>' + ic + badge + label + '</a>';
    }).join('') + '</nav>';
  }

  function renderFriends() {
    var k = K(), me = k.me || {}, list = k.friends || [], t = TX();
    S().$('#kakao-scroll').innerHTML =
      '<div class="kk-head"><h1>' + esc(t.friendsTitle) + '</h1>' +
        '<span class="kk-head-icons"><button data-na>' + ICON.addFriend + '</button></span></div>' +
      '<a class="kk-me" href="#/kakao/me">' +
        '<img src="' + esc(me.avatar) + '" alt="">' +
        '<span><b>' + esc(me.name) + '</b><small>' + esc(me.status) + '</small></span>' +
      '</a>' +
      '<div class="kk-sec">' + esc(String(t.friendsCount || '').replace('{n}', list.length)) + '</div>' +
      list.map(function (f) {
        return '<a class="kk-friend" href="#/kakao/chat/' + encodeURIComponent(f.id) + '">' +
          '<img src="' + esc(f.avatar) + '" alt="">' +
          '<span><b>' + esc(f.name) + '</b>' + (f.status ? '<small>' + esc(f.status) + '</small>' : '') + '</span>' +
        '</a>';
      }).join('');
    S().$('#kakao-overlay').innerHTML = tabbar(0);
  }

  function renderChats() {
    var list = (K().friends || []).filter(function (f) { return messagesOf(f).some(function (m) { return m.text || m.image; }); });
    S().$('#kakao-scroll').innerHTML =
      '<div class="kk-head"><h1>' + esc(TX().chatsTitle) + '</h1>' +
        '<span class="kk-head-icons"><button data-na>' + ICON.addFriend + '</button></span></div>' +
      list.map(function (f) {
        var msgs = messagesOf(f).filter(function (m) { return m.text || m.image; }), last = msgs[msgs.length - 1], n = unreadOf(f);
        return '<a class="kk-chatrow" href="#/kakao/chat/' + encodeURIComponent(f.id) + '">' +
          '<img src="' + esc(f.avatar) + '" alt="">' +
          '<span class="kk-chatrow-mid"><b>' + esc(f.name) + '</b><small>' + esc(last.text || TX().photoLabel || '사진') + '</small></span>' +
          '<span class="kk-chatrow-r"><small>' + esc(last.time || '') + '</small>' + (n ? '<i class="kk-badge">' + n + '</i>' : '') + '</span>' +
        '</a>';
      }).join('');
    S().$('#kakao-overlay').innerHTML = tabbar(1);
  }

  // 我的資料：全螢幕
  function renderMe() {
    var me = K().me || {}, acts = TX().profileActions || [];
    var icons = [ICON.selfChat, ICON.edit, ICON.story];
    renderFriends();
    S().setDarkStatus(true);
    S().$('#kakao-overlay').innerHTML =
      '<div class="kk-profile" style="background-image:url(\'' + esc(me.background) + '\')">' +
        '<div class="kk-profile-shade"></div>' +
        '<a class="kk-profile-close" href="#/kakao">' + ICON.close + '</a>' +
        '<div class="kk-profile-info">' +
          '<img src="' + esc(me.avatar) + '" alt="">' +
          '<b>' + esc(me.name) + '</b>' +
          '<small>' + esc(me.status) + '</small>' +
        '</div>' +
        '<div class="kk-profile-acts">' + acts.map(function (a, i) {
          return '<button data-na>' + icons[i] + '<span>' + esc(a) + '</span></button>';
        }).join('') + '</div>' +
      '</div>';
  }

  /* ---- 聊天室 ---- */
  // 訊息內容：文字泡泡或照片
  function contentHTML(m, first) {
    if (m.image) return '<button class="kk-photo" data-photo="' + esc(m.image) + '"><img src="' + esc(m.image) + '" alt="" loading="lazy"></button>';
    return '<div class="kk-bubble' + (first ? ' tail' : '') + '">' + S().multiline(m.text) + '</div>';
  }

  function bubblesHTML(f) {
    var msgs = messagesOf(f), out = '';
    msgs.forEach(function (m, i) {
      if (m.date) { out += '<div class="kk-date"><span>' + esc(m.date) + '</span></div>'; return; }
      var prev = msgs[i - 1], next = msgs[i + 1];
      var first = !prev || prev.date || prev.from !== m.from;
      // 同一個人、同一分鐘的連續訊息，只有最後一則顯示時間
      var showTime = !next || next.date || next.from !== m.from || next.time !== m.time;
      if (m.from === 'me') {
        // 對方還沒回 → 顯示未讀「1」
        var unread = m.read !== true && !msgs.slice(i + 1).some(function (x) { return x.from === 'them'; });
        out += '<div class="kk-msg me">' +
          '<span class="kk-meta">' + (unread ? '<i>1</i>' : '') + (showTime ? '<small>' + esc(m.time || '') + '</small>' : '') + '</span>' +
          contentHTML(m, first) +
        '</div>';
      } else {
        out += '<div class="kk-msg them' + (first ? ' first' : '') + '">' +
          (first ? '<img class="kk-av" src="' + esc(f.avatar) + '" alt="">' : '<span class="kk-av"></span>') +
          '<div class="kk-them-col">' +
            (first ? '<div class="kk-name">' + esc(f.name) + '</div>' : '') +
            '<div class="kk-row">' + contentHTML(m, first) +
            (showTime ? '<small class="kk-meta">' + esc(m.time || '') + '</small>' : '') + '</div>' +
          '</div>' +
        '</div>';
      }
    });
    return out;
  }

  function paintChat() {
    var f = friend(openChatId), box = document.getElementById('kk-msgs');
    if (!f || !box) return;
    box.innerHTML = bubblesHTML(f);
    box.scrollTop = box.scrollHeight;
  }

  function renderChat(id) {
    var f = friend(id);
    if (!f) { location.replace('#/kakao'); return; }
    openChatId = f.id;
    var st = state(); st.unread[f.id] = 0; S().save(KEY, st);
    renderFriends();
    S().$('#kakao-overlay').innerHTML =
      '<div class="kk-chat">' +
        '<div class="kk-chat-head">' +
          '<a href="#/kakao" data-kback>' + ICON.back + '</a>' +
          '<b>' + esc(f.name) + '</b>' +
          '<span><button data-na>' + ICON.search + '</button><button data-na>' + ICON.menu + '</button></span>' +
        '</div>' +
        '<div class="kk-msgs" id="kk-msgs"></div>' +
        '<form class="kk-input" id="kk-form" autocomplete="off">' +
          '<button type="button" class="kk-plus" data-na>' + ICON.plus + '</button>' +
          '<label class="kk-field"><input name="m" placeholder="' + esc(TX().inputPlaceholder) + '" autocomplete="off">' +
            '<button type="button" data-na>' + ICON.emoji + '</button></label>' +
          '<button type="submit" class="kk-send" disabled>' + ICON.send + '</button>' +
        '</form>' +
      '</div>';
    paintChat();
    var form = S().$('#kk-form');
    form.m.addEventListener('input', function () { form.querySelector('.kk-send').disabled = !form.m.value.trim(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = form.m.value.trim();
      if (!text) return;
      push(f.id, { from: 'me', text: text, time: nowTime() });
      form.m.value = '';
      form.querySelector('.kk-send').disabled = true;
      paintChat();
      scheduleReply(f, text);
    });
  }

  function push(id, msg) {
    var st = state();
    (st.msgs[id] = st.msgs[id] || []).push(msg);
    S().save(KEY, st);
  }

  // 關鍵字自動回覆：訊息包含任一個 keyword → 依序送出 reply
  function scheduleReply(f, text) {
    var lower = text.toLowerCase(), lines = null;
    (f.replies || []).some(function (r) {
      var hit = (r.keywords || []).some(function (k) { return k && lower.indexOf(String(k).toLowerCase()) >= 0; });
      if (hit) lines = [].concat(r.reply || []);
      return hit;
    });
    if (!lines) lines = [].concat(f.defaultReply || []);
    lines.forEach(function (line, i) {
      setTimeout(function () {
        push(f.id, { from: 'them', text: line, time: nowTime() });
        if (openChatId === f.id && location.hash.indexOf('#/kakao/chat/') === 0) paintChat();
        else {
          var st = state(); st.unread[f.id] = unreadOf(f) + 1; S().save(KEY, st);
          if (location.hash.indexOf('#/kakao') === 0) route(current);
        }
      }, 1500 + i * 900);
    });
  }

  var current = [];
  function route(parts) {
    current = parts;
    openChatId = null;
    if (parts[0] === 'chat' && parts[1]) renderChat(parts[1]);
    else if (parts[0] === 'me') renderMe();
    else if (parts[0] === 'chats') renderChats();
    else renderFriends();
  }

  document.addEventListener('click', function (e) {
    var app = document.getElementById('app-kakao');
    if (!app || !app.contains(e.target)) return;
    var back = e.target.closest('[data-kback]');
    if (back) {
      // 聊天室的返回：回到上一頁（好友或聊天列表）
      e.preventDefault();
      if (history.length > 1) history.back(); else location.hash = '#/kakao';
      return;
    }
    var ph = e.target.closest('[data-photo]');
    if (ph) {
      // 點照片 → 全螢幕檢視，點一下關閉
      var v = document.createElement('div');
      v.className = 'kk-viewer';
      v.innerHTML = '<img src="' + esc(ph.dataset.photo) + '" alt="">';
      v.onclick = function () { v.remove(); S().setDarkStatus(false); };
      S().$('#kakao-overlay').appendChild(v);
      S().setDarkStatus(true);
      return;
    }
    if (e.target.closest('[data-na]')) S().toast();
  });

  (window.SOSHO_APPS = window.SOSHO_APPS || {}).kakao = route;
})();
