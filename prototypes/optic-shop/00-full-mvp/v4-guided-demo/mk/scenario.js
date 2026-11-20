/*
 * MKScenario — logic dùng chung cho trình chạy trong trình duyệt (mk.js) và adapter Playwright (tools/e2e).
 * Một nguồn duy nhất cho: danh sách hành động hợp lệ, mở rộng intent (macro), validate kịch bản.
 *
 * Kịch bản = dữ liệu thuần (JSON), mô tả ở mức ý định người dùng, trỏ phần tử bằng data-testid.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MKScenario = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Hành động nguyên thủy. needs = các field bắt buộc.
  const ACTIONS = {
    reset: [],
    click: ['target'],
    type: ['target', 'value'],
    select: ['target', 'value'],
    expectVisible: ['target'],
    expectHidden: ['target'],
    expectText: ['target', 'contains'],
    wait: ['ms'],
  };

  const STRING_FIELDS = ['target', 'value', 'contains', 'say', 'speak']; // speak: lời đọc khác chữ hiển thị (tuỳ chọn)

  function subst(v, args) {
    if (typeof v !== 'string') return v;
    return v.replace(/\$\{(\w+)\}/g, function (_, k) {
      if (!(k in args)) throw new Error('Thiếu tham số intent: ' + k);
      return String(args[k]);
    });
  }

  function withArgs(step, args) {
    const out = Object.assign({}, step);
    STRING_FIELDS.forEach(function (f) { if (f in out) out[f] = subst(out[f], args); });
    if (out.args) {
      const a = {};
      Object.keys(out.args).forEach(function (k) { a[k] = subst(out.args[k], args); });
      out.args = a;
    }
    return out;
  }

  // Mở rộng {use:"login", args:{...}} thành các bước nguyên thủy. Cho phép intent lồng nhau (tối đa 5 tầng).
  function expand(steps, intents, depth) {
    depth = depth || 0;
    if (depth > 5) throw new Error('Intent lồng quá sâu');
    const out = [];
    steps.forEach(function (s) {
      if (s.use) {
        const it = intents && intents[s.use];
        if (!it) throw new Error('Intent không tồn tại: ' + s.use);
        const args = s.args || {};
        (it.params || []).forEach(function (p) {
          if (!(p in args) && !(it.defaults && p in it.defaults)) throw new Error('Intent "' + s.use + '" thiếu tham số: ' + p);
        });
        const merged = Object.assign({}, it.defaults || {}, args);
        const inner = expand(it.steps.map(function (x) { return withArgs(x, merged); }), intents, depth + 1);
        // say của bước "use" = mô tả cả cụm (intentSay), không ghi đè caption riêng của từng bước con
        inner.forEach(function (x) {
          const y = Object.assign({}, x, { intent: s.use });
          if (s.say) y.intentSay = s.say;
          if (s.speak) y.intentSpeak = s.speak;
          out.push(y);
        });
      } else {
        out.push(s);
      }
    });
    return out;
  }

  function validate(scenario, intents) {
    const errs = [];
    if (!scenario || !Array.isArray(scenario.steps)) return ['Thiếu mảng "steps"'];
    if (!scenario.id) errs.push('Thiếu "id"');
    if (!scenario.title) errs.push('Thiếu "title"');
    let steps;
    try { steps = expand(scenario.steps, intents || {}); } catch (e) { return errs.concat(e.message); }
    steps.forEach(function (s, i) {
      const need = ACTIONS[s.do];
      if (!need) { errs.push('Bước ' + (i + 1) + ': hành động không hợp lệ "' + s.do + '"'); return; }
      need.forEach(function (f) { if (!(f in s)) errs.push('Bước ' + (i + 1) + ' (' + s.do + '): thiếu "' + f + '"'); });
    });
    return errs;
  }

  function describe(s) {
    const tag = s.intent ? '[' + s.intent + '] ' : '';
    if (s.say) return tag + s.say;
    return tag + s.do + (s.target ? ' ' + s.target : '') + (s.value != null ? ' = ' + s.value : '') + (s.contains ? ' ∋ ' + s.contains : '');
  }

  return { ACTIONS: ACTIONS, expand: expand, validate: validate, describe: describe };
});
