/* 電話：只有數字鍵盤（#/phone） */
(function () {
  'use strict';

  var dialed = '';           // 數字鍵盤目前輸入的號碼
  var callTimer = null;

  var ICON = {
    call: '<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
    del: '<svg viewBox="0 0 34 24"><path d="M10 2h20a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H10L1 12z" fill="#e5e5ea"/><path d="M15 8l8 8M23 8l-8 8" stroke="#000" stroke-width="2.2" stroke-linecap="round"/></svg>',
    // 結束通話：同一個話筒轉 135 度（和 iPhone 一樣）
    end: '<svg viewBox="0 0 24 24" style="transform:rotate(135deg)"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>'
  };

  function S() { return window.SOSHO; }
  function P() { return S().data.phone || {}; }

  /* ---- 數字鍵盤 ---- */
  var KEYS = [['1', ''], ['2', 'ABC'], ['3', 'DEF'], ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
              ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'], ['*', ''], ['0', '+'], ['#', '']];

  function renderKeypad() {
    var esc = S().esc;
    S().$('#phone-overlay').innerHTML = '';
    S().$('#phone-scroll').innerHTML =
      '<div class="ph-kp">' +
        '<div class="ph-kp-top"></div>' +
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
  }
  function paintNumber() {
    var n = document.getElementById('ph-kp-num');
    if (!n) return;
    n.textContent = dialed;
    n.classList.toggle('long', dialed.length > 11);
    document.getElementById('ph-kp-del').style.visibility = dialed ? 'visible' : 'hidden';
  }
  // 撥出的號碼在 dialable 裡 → 顯示對應的名字
  function dialEntry(num) {
    return (P().dialable || []).filter(function (d) { return String(d.number).replace(/\D/g, '') === num.replace(/\D/g, ''); })[0] || null;
  }
  // 顯示的名字：有寫 name 用 name，不然顯示號碼（和 iPhone 一樣，不在聯絡人裡就顯示號碼）
  function labelForNumber(num) {
    var hit = dialEntry(num);
    return hit && hit.name ? hit.name : (hit ? hit.number : num);
  }

  // 撥號畫面：一般號碼 3 秒後顯示「無人接聽」；有 script 的號碼會接通、跑字幕對話
  function startCall(name, entry) {
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
      '<div class="ph-captions" id="ph-captions"></div>' +
      '<div class="ph-choices" id="ph-choices"></div>' +
      '<button class="ph-end" data-end>' + ICON.end + '</button>' +
      '<div class="ph-end-label">' + esc(p.endLabel) + '</div>';
    S().$('#phone-overlay').appendChild(ov);
    S().setDarkStatus(true);
    clearTimeout(callTimer);
    if (entry && entry.script) {
      callTimer = setTimeout(function () { connect(ov, name, entry.script); }, entry.ringMs || 2200);
    } else {
      callTimer = setTimeout(function () {
        var st = document.getElementById('ph-status');
        if (st) st.textContent = p.noAnswerText;
      }, 3000);
    }
  }

  /* ---- 接通後的字幕對話 ---- */
  var talk = null;   // { script, node, line, timer, clock, secs }
  function fmtSecs(n) { return String(Math.floor(n / 60)).padStart(2, '0') + ':' + String(n % 60).padStart(2, '0'); }

  function connect(ov, name, script) {
    ov.classList.add('connected');
    stopTalk();
    talk = { script: script, name: name, secs: 0 };
    var st = document.getElementById('ph-status');
    st.textContent = fmtSecs(0);
    talk.clock = setInterval(function () { talk.secs++; st.textContent = fmtSecs(talk.secs); }, 1000);
    goNode(script.start || 'start');
  }
  function stopTalk() {
    if (!talk) return;
    clearInterval(talk.clock); clearTimeout(talk.timer);
    talk = null;
  }
  function goNode(id) {
    if (!talk) return;
    var node = (talk.script.nodes || {})[id];
    if (!node) { hangUp(); return; }
    talk.node = node; talk.line = 0;
    if (node.flag) S().setFlag(node.flag);   // 走到這段 → 記錄進度（解鎖公告用）
    S().$('#ph-choices').innerHTML = '';
    nextLine();
  }
  // 一句一句顯示；點字幕可以跳到下一句
  function nextLine() {
    if (!talk) return;
    clearTimeout(talk.timer);
    var node = talk.node, lines = node.lines || [];
    if (talk.line >= lines.length) { afterLines(); return; }
    var l = lines[talk.line++], esc = S().esc;
    var box = S().$('#ph-captions');
    var el = document.createElement('div');
    el.className = 'ph-cap ' + (l.who === 'me' ? 'me' : 'them');
    el.innerHTML = '<div class="ph-cap-text">' + esc(l.text) + '</div>' + (l.sub ? '<div class="ph-cap-sub">' + esc(l.sub) + '</div>' : '');
    box.appendChild(el);
    box.scrollTop = box.scrollHeight;
    var len = String(l.text || '').length + String(l.sub || '').length * .5;
    talk.timer = setTimeout(nextLine, l.ms || Math.min(4500, 1200 + len * 60));
  }
  function afterLines() {
    var node = talk.node, esc = S().esc;
    if (node.choices && node.choices.length) {
      S().$('#ph-choices').innerHTML = node.choices.map(function (c, i) {
        return '<button class="ph-choice" data-choice="' + i + '">' + esc(c.label) + (c.sub && c.sub !== c.label ? '<small>' + esc(c.sub) + '</small>' : '') + '</button>';
      }).join('');
      var box = S().$('#ph-captions');
      box.scrollTop = box.scrollHeight;   // 選項出現後字幕區變矮，捲到最後一句
      return;
    }
    // 沒有選項 = 對話結束，稍等一下自動掛斷
    talk.timer = setTimeout(hangUp, 1600);
  }
  function choose(i) {
    if (!talk) return;
    var c = (talk.node.choices || [])[i];
    if (!c) return;
    S().$('#ph-choices').innerHTML = '';
    if (c.hangup) { hangUp(); return; }
    // 玩家選的那句如果要說出口，就先顯示成「我」的字幕
    if (c.say !== false && !c.hangup) {
      var box = S().$('#ph-captions'), el = document.createElement('div');
      el.className = 'ph-cap me';
      el.innerHTML = '<div class="ph-cap-text">' + S().esc(c.say || c.label) + '</div>' + (c.sub ? '<div class="ph-cap-sub">' + S().esc(c.sub) + '</div>' : '');
      box.appendChild(el); box.scrollTop = box.scrollHeight;
    }
    talk.timer = setTimeout(function () { goNode(c.next); }, 900);
  }
  function hangUp() {
    var name = talk ? talk.name : '';
    stopTalk();
    var st = document.getElementById('ph-status');
    if (st) st.textContent = P().endedText || '通話結束';
    setTimeout(endCall, 900);
  }

  function endCall() {
    clearTimeout(callTimer);
    stopTalk();
    S().setDarkStatus(false);
    route(current);
  }

  var current = [];
  function route(parts) {
    current = parts;
    clearTimeout(callTimer);
    stopTalk();
    renderKeypad();
    S().$('#phone-scroll').scrollTop = 0;
  }

  document.addEventListener('click', function (e) {
    var app = document.getElementById('app-phone');
    if (!app || !app.contains(e.target)) return;
    var el;
    if ((el = e.target.closest('[data-key]'))) { if (dialed.length < 20) dialed += el.dataset.key; paintNumber(); return; }
    if (e.target.closest('[data-del]')) { dialed = dialed.slice(0, -1); paintNumber(); return; }
    if (e.target.closest('[data-dial]')) { if (dialed) startCall(labelForNumber(dialed), dialEntry(dialed)); return; }
    if ((el = e.target.closest('[data-choice]'))) { choose(+el.dataset.choice); return; }
    if (e.target.closest('.ph-cap') && talk && !(talk.node.choices && talk.line >= (talk.node.lines || []).length)) { nextLine(); return; }
    if (e.target.closest('[data-end]')) { endCall(); return; }
    if (e.target.closest('[data-na]')) S().toast();
  });

  (window.SOSHO_APPS = window.SOSHO_APPS || {}).phone = route;
})();
