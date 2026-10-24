/* =========================================================
 * 自動放圖：js/media.js 是 GitHub 自動產生的檔案清單，
 * 這裡依「檔名」把 data.js 還沒寫到的圖片／影片／音樂自動放進網頁。
 *
 * 檔名格式：{帳號}_{種類}_{日期}[-第幾張].副檔名
 *   帳號：1 = shotaroo0、2 = 252525252_、3 = fauiogl94
 *   種類：story（限時）、story2（摯友限時）、post（貼文）、
 *         savedstory／savedpost／saved（典藏）、msg（Kakao 照片，1 = 自己傳、2 = 소희傳）、
 *         music（IG 個人頁的音樂，放在 audio/ 資料夾，不用日期）
 *   日期：20260426 或 260426（同一天多張用 -2、-3…）
 * Kakao 其他好友傳來的照片：{好友代號}_msg_{日期}.jpg
 *   at = Anton、wb = 원빈、sc = 성찬、es = 은석（例如 at_msg_20260826.jpg = Anton 傳給 Shotaro）
 * data.js 裡已經寫過的檔案不會重複加；想改文字就照平常在 data.js 寫一筆，寫了就以 data.js 為準。
 * ========================================================= */
(function () {
  'use strict';
  var D = window.SITE_DATA, files = window.SITE_MEDIA || [];
  if (!D || !files.length) return;

  var ACC = { 1: 'shotaroo0', 2: '252525252_', 3: 'fauiogl94' };
  var KAKAO = { at: 'f3', wb: 'f2', sc: 'f4', es: 'f5' };   // Kakao 好友代號 → data.js 的好友 id
  var RE = /^([1-3]|at|wb|sc|es)_(story2|story|savedstory|savedpost|saved|post|msg|music)(?:_(\d{8}|\d{6}))?(?:-(\d+))?\.(jpg|jpeg|png|gif|webp|mp4|mp3|m4a)$/i;
  var used = JSON.stringify(D);
  var thisYear = 2026;   // 沒寫年份時（例如「4月26日」）視為 2026 年

  function account(n) {
    var ig = D.instagram, u = ACC[n];
    if (!ig) return null;
    if (ig.username === u) return ig;
    return (ig.otherAccounts || []).concat(ig.searchOnlyAccounts || []).filter(function (a) { return a.username === u; })[0] || null;
  }
  function ymd(s) { return s.length === 6 ? '20' + s : s; }
  function timeLabel(d) {
    var y = +d.slice(0, 4), m = +d.slice(4, 6), day = +d.slice(6, 8);
    return (y === thisYear ? '' : y + '年') + m + '月' + day + '日';
  }
  // 從檔名找出日期（data.js 手寫的那筆也用這個排序）
  function dateOf(path) {
    var m = /_(\d{8}|\d{6})(?:-\d+)?\.\w+$/.exec(path || '');
    return m ? ymd(m[1]) : null;
  }
  function firstImage(it) { return it.image || (it.images || [])[0]; }
  // 依日期插進清單：newestFirst = 貼文（新的在前）；限時、聊天是舊的在前
  function insertByDate(list, item, date, newestFirst) {
    for (var i = 0; i < list.length; i++) {
      var d = dateOf(firstImage(list[i]));
      if (d && (newestFirst ? d < date : d > date)) { list.splice(i, 0, item); return; }
    }
    list.push(item);
  }

  // 整理檔案：同一則貼文（-2、-3）合在一起
  var groups = {}, order = [];
  files.forEach(function (path) {
    var name = path.split('/').pop(), m = RE.exec(name);
    if (!m || used.indexOf('"' + path + '"') !== -1) return;
    var key = m[1] + '_' + m[2] + '_' + (m[3] || '');
    if (m[2] === 'story' || m[2] === 'story2' || m[2] === 'savedstory' || m[2] === 'msg') key += '-' + (m[4] || '1');
    if (!groups[key]) { groups[key] = { acc: m[1], type: m[2].toLowerCase(), date: m[3] ? ymd(m[3]) : null, files: [] }; order.push(key); }
    groups[key].files.push({ path: path, n: +(m[4] || 1) });
  });
  // 同一天的照片照 -2、-3 的順序放（檔案清單裡 xxx-2.jpg 會排在 xxx.jpg 前面）
  order.sort(function (x, y) {
    var gx = groups[x], gy = groups[y];
    return (gx.date || '').localeCompare(gy.date || '') || gx.files[0].n - gy.files[0].n;
  });

  order.forEach(function (key) {
    var g = groups[key], a = account(g.acc);
    var paths = g.files.sort(function (x, y) { return x.n - y.n; }).map(function (f) { return f.path; });

    if (g.type === 'music') {
      if (a) { a.music = a.music || { title: '', artist: '' }; if (!a.music.file) a.music.file = paths[0]; }
      return;
    }
    if (!g.date) return;   // 其他種類一定要有日期才知道放哪裡
    var time = timeLabel(g.date);

    if (g.type === 'msg') {
      var fid = KAKAO[g.acc.toLowerCase()];
      if (fid) {   // 其他好友傳來的照片
        var fr = D.kakao && (D.kakao.friends || []).filter(function (x) { return x.id === fid; })[0];
        if (fr) insertMsg(fr.messages = fr.messages || [], { from: 'them', image: paths[0], time: '' }, g.date);
        return;
      }
      var f1 = D.kakao && (D.kakao.friends || [])[0];
      if (!f1 || (g.acc !== '1' && g.acc !== '2')) return;   // Kakao 只有 Shotaro 和 소희 的聊天
      var msgs = f1.messages = f1.messages || [];
      var msg = { from: g.acc === '1' ? 'me' : 'them', image: paths[0], time: '' };
      insertMsg(msgs, msg, g.date);
      return;
    }
    if (!a) return;

    if (g.type === 'story' || g.type === 'story2') {
      var it = { image: paths[0], time: time };
      if (g.type === 'story2') it.closeFriends = true;
      var hl = (a.highlights || [])[0];
      insertByDate(hl ? (hl.stories = hl.stories || []) : (a.story = a.story || []), it, g.date, false);
    } else if (g.type === 'savedstory') {
      a.archive = a.archive || {};
      insertByDate(a.archive.stories = a.archive.stories || [], { image: paths[0], time: time }, g.date, false);
    } else if (g.type === 'post') {
      insertByDate(a.posts = a.posts || [], { images: paths, caption: '', time: time }, g.date, true);
    } else {   // saved、savedpost
      a.archive = a.archive || {};
      insertByDate(a.archive.posts = a.archive.posts || [], { images: paths, caption: '', time: time }, g.date, true);
    }
  });

  // Kakao：放進同一天的日期分隔線底下；那天還沒有就新增一條「2026年4月26日」
  function korDate(d) {
    var y = +d.slice(0, 4), m = +d.slice(4, 6), day = +d.slice(6, 8);
    return y + '年' + m + '月' + day + '日';
  }
  function parseKor(s) {
    var m = /(\d{4})\s*[年년]\s*(\d+)\s*[月월]\s*(\d+)\s*[日일]/.exec(s || '');
    return m ? m[1] + ('0' + m[2]).slice(-2) + ('0' + m[3]).slice(-2) : null;
  }
  function insertMsg(msgs, msg, date) {
    for (var i = 0; i < msgs.length; i++) {
      var d = msgs[i].date && parseKor(msgs[i].date);
      if (!d) continue;
      if (d === date) {   // 同一天：放在這天最後面
        var j = i + 1;
        while (j < msgs.length && !msgs[j].date) j++;
        msgs.splice(j, 0, msg);
        return;
      }
      if (d > date) { msgs.splice(i, 0, { date: korDate(date) }, msg); return; }
    }
    msgs.push({ date: korDate(date) }, msg);
  }
})();
