import {
  S as Ce,
  i as qe,
  s as Se,
  C as fe,
  k as w,
  a as B,
  l as C,
  m as q,
  c as Q,
  h as m,
  n as y,
  b as T,
  F as g,
  g as D,
  v as ve,
  d as U,
  f as ye,
  G as he,
  I as de,
  J as _e,
  Z as jr,
  X as Me,
  Y as Ke,
  N as G,
  O as Ne,
  W as Xe,
  $ as Te,
  a0 as Ko,
  a1 as Yt,
  a3 as Dr,
  a4 as Zr,
  _ as Ze,
  w as Vo,
  e as J,
  L as et,
  a5 as Go,
  K,
  R as zo,
  a9 as Cr,
  aj as rt,
  x as xr,
  y as De,
  z as He,
  A as Fe,
  ak as Jo,
  B as Le,
  V as ce,
  q as L,
  r as N,
  M as Xt,
  u as V,
  H as Wo,
  E as Yo,
  o as Xo,
  al as Yi,
  am as $e,
  a6 as or,
  an as Zt,
  ao as Xi,
  P as Zo,
  p as Zi,
} from './index.e81ade4b.js';
import {
  l as xt,
  m as $r,
  o as xo,
  G as $o,
  q as xi,
  r as es,
  u as ts,
  x as rs,
  v as ns,
  s as A,
  n as $,
  t as $t,
  w as en,
} from './navigation.928c82b4.js';
import { w as it, r as Dt, d as Jt } from './index.52a5fe5b.js';
import './ProgressBar.svelte_svelte_type_style_lang.0751fc73.js';
function is() {
  const { subscribe: n, set: e, update: t } = it([]);
  return {
    subscribe: n,
    set: e,
    update: t,
    trigger: (r) => t((i) => (i.push(r), i)),
    close: () => t((r) => (r.length > 0 && r.shift(), r)),
    clear: () => e([]),
  };
}
const Pe = is();
function os(n, e) {
  const t =
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
  let r, i;
  function s(c) {
    c.shiftKey && c.code === 'Tab' && (c.preventDefault(), i.focus());
  }
  function o(c) {
    !c.shiftKey && c.code === 'Tab' && (c.preventDefault(), r.focus());
  }
  const l = (c) => {
    if (e === !1) return;
    const f = Array.from(n.querySelectorAll(t));
    f.length &&
      ((r = f[0]),
      (i = f[f.length - 1]),
      c || r.focus(),
      r.addEventListener('keydown', s),
      i.addEventListener('keydown', o));
  };
  l(!1);
  function a() {
    r && r.removeEventListener('keydown', s),
      i && i.removeEventListener('keydown', o);
  }
  const u = (c, f) => (c.length && (a(), l(!0)), f),
    h = new MutationObserver(u);
  return (
    h.observe(n, { childList: !0, subtree: !0 }),
    {
      update(c) {
        (e = c), c ? l(!1) : a();
      },
      destroy() {
        a(), h.disconnect();
      },
    }
  );
}
const ss = (n) => ({}),
  tn = (n) => ({}),
  as = (n) => ({}),
  rn = (n) => ({}),
  ls = (n) => ({}),
  nn = (n) => ({});
function on(n) {
  let e, t, r;
  const i = n[22].lead,
    s = fe(i, n, n[21], nn);
  return {
    c() {
      (e = w('div')), s && s.c(), this.h();
    },
    l(o) {
      e = C(o, 'DIV', { class: !0 });
      var l = q(e);
      s && s.l(l), l.forEach(m), this.h();
    },
    h() {
      y(e, 'class', (t = 'app-bar-slot-lead ' + n[4]));
    },
    m(o, l) {
      T(o, e, l), s && s.m(e, null), (r = !0);
    },
    p(o, l) {
      s &&
        s.p &&
        (!r || l & 2097152) &&
        he(s, i, o, o[21], r ? _e(i, o[21], l, ls) : de(o[21]), nn),
        (!r || (l & 16 && t !== (t = 'app-bar-slot-lead ' + o[4]))) &&
          y(e, 'class', t);
    },
    i(o) {
      r || (D(s, o), (r = !0));
    },
    o(o) {
      U(s, o), (r = !1);
    },
    d(o) {
      o && m(e), s && s.d(o);
    },
  };
}
function sn(n) {
  let e, t, r;
  const i = n[22].trail,
    s = fe(i, n, n[21], rn);
  return {
    c() {
      (e = w('div')), s && s.c(), this.h();
    },
    l(o) {
      e = C(o, 'DIV', { class: !0 });
      var l = q(e);
      s && s.l(l), l.forEach(m), this.h();
    },
    h() {
      y(e, 'class', (t = 'app-bar-slot-trail ' + n[2]));
    },
    m(o, l) {
      T(o, e, l), s && s.m(e, null), (r = !0);
    },
    p(o, l) {
      s &&
        s.p &&
        (!r || l & 2097152) &&
        he(s, i, o, o[21], r ? _e(i, o[21], l, as) : de(o[21]), rn),
        (!r || (l & 4 && t !== (t = 'app-bar-slot-trail ' + o[2]))) &&
          y(e, 'class', t);
    },
    i(o) {
      r || (D(s, o), (r = !0));
    },
    o(o) {
      U(s, o), (r = !1);
    },
    d(o) {
      o && m(e), s && s.d(o);
    },
  };
}
function an(n) {
  let e, t, r;
  const i = n[22].headline,
    s = fe(i, n, n[21], tn);
  return {
    c() {
      (e = w('div')), s && s.c(), this.h();
    },
    l(o) {
      e = C(o, 'DIV', { class: !0 });
      var l = q(e);
      s && s.l(l), l.forEach(m), this.h();
    },
    h() {
      y(e, 'class', (t = 'app-bar-row-headline ' + n[5]));
    },
    m(o, l) {
      T(o, e, l), s && s.m(e, null), (r = !0);
    },
    p(o, l) {
      s &&
        s.p &&
        (!r || l & 2097152) &&
        he(s, i, o, o[21], r ? _e(i, o[21], l, ss) : de(o[21]), tn),
        (!r || (l & 32 && t !== (t = 'app-bar-row-headline ' + o[5]))) &&
          y(e, 'class', t);
    },
    i(o) {
      r || (D(s, o), (r = !0));
    },
    o(o) {
      U(s, o), (r = !1);
    },
    d(o) {
      o && m(e), s && s.d(o);
    },
  };
}
function us(n) {
  let e,
    t,
    r,
    i,
    s,
    o,
    l,
    a,
    u,
    h,
    c = n[8].lead && on(n);
  const f = n[22].default,
    d = fe(f, n, n[21], null);
  let _ = n[8].trail && sn(n),
    p = n[8].headline && an(n);
  return {
    c() {
      (e = w('div')),
        (t = w('div')),
        c && c.c(),
        (r = B()),
        (i = w('div')),
        d && d.c(),
        (o = B()),
        _ && _.c(),
        (a = B()),
        p && p.c(),
        this.h();
    },
    l(v) {
      e = C(v, 'DIV', {
        class: !0,
        'data-testid': !0,
        role: !0,
        'aria-label': !0,
        'aria-labelledby': !0,
      });
      var b = q(e);
      t = C(b, 'DIV', { class: !0 });
      var E = q(t);
      c && c.l(E), (r = Q(E)), (i = C(E, 'DIV', { class: !0 }));
      var k = q(i);
      d && d.l(k),
        k.forEach(m),
        (o = Q(E)),
        _ && _.l(E),
        E.forEach(m),
        (a = Q(b)),
        p && p.l(b),
        b.forEach(m),
        this.h();
    },
    h() {
      y(i, 'class', (s = 'app-bar-slot-default ' + n[3])),
        y(t, 'class', (l = 'app-bar-row-main ' + n[6])),
        y(e, 'class', (u = 'app-bar ' + n[7])),
        y(e, 'data-testid', 'app-bar'),
        y(e, 'role', 'toolbar'),
        y(e, 'aria-label', n[0]),
        y(e, 'aria-labelledby', n[1]);
    },
    m(v, b) {
      T(v, e, b),
        g(e, t),
        c && c.m(t, null),
        g(t, r),
        g(t, i),
        d && d.m(i, null),
        g(t, o),
        _ && _.m(t, null),
        g(e, a),
        p && p.m(e, null),
        (h = !0);
    },
    p(v, [b]) {
      v[8].lead
        ? c
          ? (c.p(v, b), b & 256 && D(c, 1))
          : ((c = on(v)), c.c(), D(c, 1), c.m(t, r))
        : c &&
          (ve(),
          U(c, 1, 1, () => {
            c = null;
          }),
          ye()),
        d &&
          d.p &&
          (!h || b & 2097152) &&
          he(d, f, v, v[21], h ? _e(f, v[21], b, null) : de(v[21]), null),
        (!h || (b & 8 && s !== (s = 'app-bar-slot-default ' + v[3]))) &&
          y(i, 'class', s),
        v[8].trail
          ? _
            ? (_.p(v, b), b & 256 && D(_, 1))
            : ((_ = sn(v)), _.c(), D(_, 1), _.m(t, null))
          : _ &&
            (ve(),
            U(_, 1, 1, () => {
              _ = null;
            }),
            ye()),
        (!h || (b & 64 && l !== (l = 'app-bar-row-main ' + v[6]))) &&
          y(t, 'class', l),
        v[8].headline
          ? p
            ? (p.p(v, b), b & 256 && D(p, 1))
            : ((p = an(v)), p.c(), D(p, 1), p.m(e, null))
          : p &&
            (ve(),
            U(p, 1, 1, () => {
              p = null;
            }),
            ye()),
        (!h || (b & 128 && u !== (u = 'app-bar ' + v[7]))) && y(e, 'class', u),
        (!h || b & 1) && y(e, 'aria-label', v[0]),
        (!h || b & 2) && y(e, 'aria-labelledby', v[1]);
    },
    i(v) {
      h || (D(c), D(d, v), D(_), D(p), (h = !0));
    },
    o(v) {
      U(c), U(d, v), U(_), U(p), (h = !1);
    },
    d(v) {
      v && m(e), c && c.d(), d && d.d(v), _ && _.d(), p && p.d();
    },
  };
}
const cs = 'flex flex-col',
  fs = 'grid items-center',
  hs = '',
  ds = 'flex-none flex justify-between items-center',
  _s = 'flex-auto',
  ps = 'flex-none flex items-center space-x-4';
function vs(n, e, t) {
  let r,
    i,
    s,
    o,
    l,
    a,
    { $$slots: u = {}, $$scope: h } = e;
  const c = jr(u);
  let { background: f = 'bg-surface-100-800-token' } = e,
    { border: d = '' } = e,
    { padding: _ = 'p-4' } = e,
    { shadow: p = '' } = e,
    { spacing: v = 'space-y-4' } = e,
    { gridColumns: b = 'grid-cols-[auto_1fr_auto]' } = e,
    { gap: E = 'gap-4' } = e,
    { regionRowMain: k = '' } = e,
    { regionRowHeadline: O = '' } = e,
    { slotLead: I = '' } = e,
    { slotDefault: S = '' } = e,
    { slotTrail: j = '' } = e,
    { label: M = '' } = e,
    { labelledby: P = '' } = e;
  return (
    (n.$$set = (F) => {
      t(23, (e = Me(Me({}, e), Ke(F)))),
        'background' in F && t(9, (f = F.background)),
        'border' in F && t(10, (d = F.border)),
        'padding' in F && t(11, (_ = F.padding)),
        'shadow' in F && t(12, (p = F.shadow)),
        'spacing' in F && t(13, (v = F.spacing)),
        'gridColumns' in F && t(14, (b = F.gridColumns)),
        'gap' in F && t(15, (E = F.gap)),
        'regionRowMain' in F && t(16, (k = F.regionRowMain)),
        'regionRowHeadline' in F && t(17, (O = F.regionRowHeadline)),
        'slotLead' in F && t(18, (I = F.slotLead)),
        'slotDefault' in F && t(19, (S = F.slotDefault)),
        'slotTrail' in F && t(20, (j = F.slotTrail)),
        'label' in F && t(0, (M = F.label)),
        'labelledby' in F && t(1, (P = F.labelledby)),
        '$$scope' in F && t(21, (h = F.$$scope));
    }),
    (n.$$.update = () => {
      t(7, (r = `${cs} ${f} ${d} ${v} ${_} ${p} ${e.class ?? ''}`)),
        n.$$.dirty & 114688 && t(6, (i = `${fs} ${b} ${E} ${k}`)),
        n.$$.dirty & 131072 && t(5, (s = `${hs} ${O}`)),
        n.$$.dirty & 262144 && t(4, (o = `${ds} ${I}`)),
        n.$$.dirty & 524288 && t(3, (l = `${_s} ${S}`)),
        n.$$.dirty & 1048576 && t(2, (a = `${ps} ${j}`));
    }),
    (e = Ke(e)),
    [M, P, a, l, o, s, i, r, c, f, d, _, p, v, b, E, k, O, I, S, j, h, u]
  );
}
class Ec extends Ce {
  constructor(e) {
    super(),
      qe(this, e, vs, us, Se, {
        background: 9,
        border: 10,
        padding: 11,
        shadow: 12,
        spacing: 13,
        gridColumns: 14,
        gap: 15,
        regionRowMain: 16,
        regionRowHeadline: 17,
        slotLead: 18,
        slotDefault: 19,
        slotTrail: 20,
        label: 0,
        labelledby: 1,
      });
  }
}
const ys = (n) => ({}),
  ln = (n) => ({});
function un(n) {
  let e, t, r;
  const i = n[17].panel,
    s = fe(i, n, n[16], ln);
  return {
    c() {
      (e = w('div')), s && s.c(), this.h();
    },
    l(o) {
      e = C(o, 'DIV', {
        class: !0,
        role: !0,
        'aria-labelledby': !0,
        tabindex: !0,
      });
      var l = q(e);
      s && s.l(l), l.forEach(m), this.h();
    },
    h() {
      y(e, 'class', (t = 'tab-panel ' + n[2])),
        y(e, 'role', 'tabpanel'),
        y(e, 'aria-labelledby', n[1]),
        y(e, 'tabindex', '0');
    },
    m(o, l) {
      T(o, e, l), s && s.m(e, null), (r = !0);
    },
    p(o, l) {
      s &&
        s.p &&
        (!r || l & 65536) &&
        he(s, i, o, o[16], r ? _e(i, o[16], l, ys) : de(o[16]), ln),
        (!r || (l & 4 && t !== (t = 'tab-panel ' + o[2]))) && y(e, 'class', t),
        (!r || l & 2) && y(e, 'aria-labelledby', o[1]);
    },
    i(o) {
      r || (D(s, o), (r = !0));
    },
    o(o) {
      U(s, o), (r = !1);
    },
    d(o) {
      o && m(e), s && s.d(o);
    },
  };
}
function bs(n) {
  let e, t, r, i, s, o, l, a;
  const u = n[17].default,
    h = fe(u, n, n[16], null);
  let c = n[5].panel && un(n);
  return {
    c() {
      (e = w('div')),
        (t = w('div')),
        h && h.c(),
        (i = B()),
        c && c.c(),
        this.h();
    },
    l(f) {
      e = C(f, 'DIV', { class: !0, 'data-testid': !0 });
      var d = q(e);
      t = C(d, 'DIV', { class: !0, role: !0, 'aria-labelledby': !0 });
      var _ = q(t);
      h && h.l(_),
        _.forEach(m),
        (i = Q(d)),
        c && c.l(d),
        d.forEach(m),
        this.h();
    },
    h() {
      y(t, 'class', (r = 'tab-list ' + n[3])),
        y(t, 'role', 'tablist'),
        y(t, 'aria-labelledby', n[0]),
        y(e, 'class', (s = 'tab-group ' + n[4])),
        y(e, 'data-testid', 'tab-group');
    },
    m(f, d) {
      T(f, e, d),
        g(e, t),
        h && h.m(t, null),
        g(e, i),
        c && c.m(e, null),
        (o = !0),
        l ||
          ((a = [
            G(e, 'click', n[18]),
            G(e, 'keypress', n[19]),
            G(e, 'keydown', n[20]),
            G(e, 'keyup', n[21]),
          ]),
          (l = !0));
    },
    p(f, [d]) {
      h &&
        h.p &&
        (!o || d & 65536) &&
        he(h, u, f, f[16], o ? _e(u, f[16], d, null) : de(f[16]), null),
        (!o || (d & 8 && r !== (r = 'tab-list ' + f[3]))) && y(t, 'class', r),
        (!o || d & 1) && y(t, 'aria-labelledby', f[0]),
        f[5].panel
          ? c
            ? (c.p(f, d), d & 32 && D(c, 1))
            : ((c = un(f)), c.c(), D(c, 1), c.m(e, null))
          : c &&
            (ve(),
            U(c, 1, 1, () => {
              c = null;
            }),
            ye()),
        (!o || (d & 16 && s !== (s = 'tab-group ' + f[4]))) && y(e, 'class', s);
    },
    i(f) {
      o || (D(h, f), D(c), (o = !0));
    },
    o(f) {
      U(h, f), U(c), (o = !1);
    },
    d(f) {
      f && m(e), h && h.d(f), c && c.d(), (l = !1), Ne(a);
    },
  };
}
const ms = 'space-y-4',
  gs = 'flex overflow-x-auto hide-scrollbar',
  ks = '';
function Os(n, e, t) {
  let r,
    i,
    s,
    { $$slots: o = {}, $$scope: l } = e;
  const a = jr(o);
  let { justify: u = 'justify-start' } = e,
    { border: h = 'border-b border-surface-400-500-token' } = e,
    { active: c = 'border-b-2 border-surface-900-50-token' } = e,
    { hover: f = 'hover:variant-soft' } = e,
    { flex: d = 'flex-none' } = e,
    { padding: _ = 'px-4 py-2' } = e,
    { rounded: p = 'rounded-tl-container-token rounded-tr-container-token' } =
      e,
    { spacing: v = 'space-y-1' } = e,
    { regionList: b = '' } = e,
    { regionPanel: E = '' } = e,
    { labelledby: k = '' } = e,
    { panel: O = '' } = e;
  Xe('active', c),
    Xe('hover', f),
    Xe('flex', d),
    Xe('padding', _),
    Xe('rounded', p),
    Xe('spacing', v);
  function I(P) {
    Te.call(this, n, P);
  }
  function S(P) {
    Te.call(this, n, P);
  }
  function j(P) {
    Te.call(this, n, P);
  }
  function M(P) {
    Te.call(this, n, P);
  }
  return (
    (n.$$set = (P) => {
      t(22, (e = Me(Me({}, e), Ke(P)))),
        'justify' in P && t(6, (u = P.justify)),
        'border' in P && t(7, (h = P.border)),
        'active' in P && t(8, (c = P.active)),
        'hover' in P && t(9, (f = P.hover)),
        'flex' in P && t(10, (d = P.flex)),
        'padding' in P && t(11, (_ = P.padding)),
        'rounded' in P && t(12, (p = P.rounded)),
        'spacing' in P && t(13, (v = P.spacing)),
        'regionList' in P && t(14, (b = P.regionList)),
        'regionPanel' in P && t(15, (E = P.regionPanel)),
        'labelledby' in P && t(0, (k = P.labelledby)),
        'panel' in P && t(1, (O = P.panel)),
        '$$scope' in P && t(16, (l = P.$$scope));
    }),
    (n.$$.update = () => {
      t(4, (r = `${ms} ${e.class ?? ''}`)),
        n.$$.dirty & 16576 && t(3, (i = `${gs} ${u} ${h} ${b}`)),
        n.$$.dirty & 32768 && t(2, (s = `${ks} ${E}`));
    }),
    (e = Ke(e)),
    [k, O, s, i, r, a, u, h, c, f, d, _, p, v, b, E, l, o, I, S, j, M]
  );
}
class Sc extends Ce {
  constructor(e) {
    super(),
      qe(this, e, Os, bs, Se, {
        justify: 6,
        border: 7,
        active: 8,
        hover: 9,
        flex: 10,
        padding: 11,
        rounded: 12,
        spacing: 13,
        regionList: 14,
        regionPanel: 15,
        labelledby: 0,
        panel: 1,
      });
  }
}
const Es = (n) => ({}),
  cn = (n) => ({});
function fn(n) {
  let e, t;
  const r = n[22].lead,
    i = fe(r, n, n[21], cn);
  return {
    c() {
      (e = w('div')), i && i.c(), this.h();
    },
    l(s) {
      e = C(s, 'DIV', { class: !0 });
      var o = q(e);
      i && i.l(o), o.forEach(m), this.h();
    },
    h() {
      y(e, 'class', 'tab-lead');
    },
    m(s, o) {
      T(s, e, o), i && i.m(e, null), (t = !0);
    },
    p(s, o) {
      i &&
        i.p &&
        (!t || o[0] & 2097152) &&
        he(i, r, s, s[21], t ? _e(r, s[21], o, Es) : de(s[21]), cn);
    },
    i(s) {
      t || (D(i, s), (t = !0));
    },
    o(s) {
      U(i, s), (t = !1);
    },
    d(s) {
      s && m(e), i && i.d(s);
    },
  };
}
function Ss(n) {
  let e,
    t,
    r,
    i,
    s,
    o,
    l,
    a,
    u,
    h,
    c,
    f,
    d,
    _,
    p,
    v = [
      { type: 'radio' },
      { name: n[1] },
      { __value: n[2] },
      n[11](),
      { tabindex: '-1' },
    ],
    b = {};
  for (let I = 0; I < v.length; I += 1) b = Me(b, v[I]);
  let E = n[12].lead && fn(n);
  const k = n[22].default,
    O = fe(k, n, n[21], null);
  return (
    (d = Ko(n[30][0])),
    {
      c() {
        (e = w('label')),
          (t = w('div')),
          (r = w('div')),
          (i = w('input')),
          (s = B()),
          (o = w('div')),
          E && E.c(),
          (l = B()),
          (a = w('div')),
          O && O.c(),
          this.h();
      },
      l(I) {
        e = C(I, 'LABEL', { class: !0, title: !0 });
        var S = q(e);
        t = C(S, 'DIV', {
          class: !0,
          'data-testid': !0,
          role: !0,
          'aria-controls': !0,
          'aria-selected': !0,
          tabindex: !0,
        });
        var j = q(t);
        r = C(j, 'DIV', { class: !0 });
        var M = q(r);
        (i = C(M, 'INPUT', { type: !0, name: !0, tabindex: !0 })),
          M.forEach(m),
          (s = Q(j)),
          (o = C(j, 'DIV', { class: !0 }));
        var P = q(o);
        E && E.l(P), (l = Q(P)), (a = C(P, 'DIV', { class: !0 }));
        var F = q(a);
        O && O.l(F),
          F.forEach(m),
          P.forEach(m),
          j.forEach(m),
          S.forEach(m),
          this.h();
      },
      h() {
        Yt(i, b),
          y(r, 'class', 'h-0 w-0 overflow-hidden'),
          y(a, 'class', 'tab-label'),
          y(o, 'class', (u = 'tab-interface ' + n[8])),
          y(t, 'class', (h = 'tab ' + n[7])),
          y(t, 'data-testid', 'tab'),
          y(t, 'role', 'tab'),
          y(t, 'aria-controls', n[4]),
          y(t, 'aria-selected', n[5]),
          y(t, 'tabindex', (c = n[5] ? 0 : -1)),
          y(e, 'class', n[9]),
          y(e, 'title', n[3]),
          d.p(i);
      },
      m(I, S) {
        T(I, e, S),
          g(e, t),
          g(t, r),
          g(r, i),
          i.autofocus && i.focus(),
          n[28](i),
          (i.checked = i.__value === n[0]),
          g(t, s),
          g(t, o),
          E && E.m(o, null),
          g(o, l),
          g(o, a),
          O && O.m(a, null),
          (f = !0),
          _ ||
            ((p = [
              G(i, 'change', n[29]),
              G(i, 'click', n[26]),
              G(i, 'change', n[27]),
              G(t, 'keydown', n[10]),
              G(t, 'keydown', n[23]),
              G(t, 'keyup', n[24]),
              G(t, 'keypress', n[25]),
            ]),
            (_ = !0));
      },
      p(I, S) {
        Yt(
          i,
          (b = Dr(v, [
            { type: 'radio' },
            (!f || S[0] & 2) && { name: I[1] },
            (!f || S[0] & 4) && { __value: I[2] },
            I[11](),
            { tabindex: '-1' },
          ])),
        ),
          S[0] & 1 && (i.checked = i.__value === I[0]),
          I[12].lead
            ? E
              ? (E.p(I, S), S[0] & 4096 && D(E, 1))
              : ((E = fn(I)), E.c(), D(E, 1), E.m(o, l))
            : E &&
              (ve(),
              U(E, 1, 1, () => {
                E = null;
              }),
              ye()),
          O &&
            O.p &&
            (!f || S[0] & 2097152) &&
            he(O, k, I, I[21], f ? _e(k, I[21], S, null) : de(I[21]), null),
          (!f || (S[0] & 256 && u !== (u = 'tab-interface ' + I[8]))) &&
            y(o, 'class', u),
          (!f || (S[0] & 128 && h !== (h = 'tab ' + I[7]))) && y(t, 'class', h),
          (!f || S[0] & 16) && y(t, 'aria-controls', I[4]),
          (!f || S[0] & 32) && y(t, 'aria-selected', I[5]),
          (!f || (S[0] & 32 && c !== (c = I[5] ? 0 : -1))) &&
            y(t, 'tabindex', c),
          (!f || S[0] & 512) && y(e, 'class', I[9]),
          (!f || S[0] & 8) && y(e, 'title', I[3]);
      },
      i(I) {
        f || (D(E), D(O, I), (f = !0));
      },
      o(I) {
        U(E), U(O, I), (f = !1);
      },
      d(I) {
        I && m(e), n[28](null), E && E.d(), O && O.d(I), d.r(), (_ = !1), Ne(p);
      },
    }
  );
}
const ws = 'text-center cursor-pointer transition-colors duration-100',
  Cs = '';
function qs(n, e, t) {
  let r, i, s, o, l;
  const a = [
    'group',
    'name',
    'value',
    'title',
    'controls',
    'regionTab',
    'active',
    'hover',
    'flex',
    'padding',
    'rounded',
    'spacing',
  ];
  let u = Zr(e, a),
    { $$slots: h = {}, $$scope: c } = e;
  const f = jr(h);
  let { group: d } = e,
    { name: _ } = e,
    { value: p } = e,
    { title: v = '' } = e,
    { controls: b = '' } = e,
    { regionTab: E = '' } = e,
    { active: k = Ze('active') } = e,
    { hover: O = Ze('hover') } = e,
    { flex: I = Ze('flex') } = e,
    { padding: S = Ze('padding') } = e,
    { rounded: j = Ze('rounded') } = e,
    { spacing: M = Ze('spacing') } = e,
    P;
  function F(H) {
    if (['Enter', 'Space'].includes(H.code)) H.preventDefault(), P.click();
    else if (H.code === 'ArrowRight') {
      const ge = P.closest('.tab-list');
      if (!ge) return;
      const ee = Array.from(ge.querySelectorAll('.tab')),
        Z = P.closest('.tab');
      if (!Z) return;
      const se = ee.indexOf(Z),
        ke = se + 1 >= ee.length ? 0 : se + 1,
        te = ee[ke],
        we = te == null ? void 0 : te.querySelector('input');
      te && we && (we.click(), te.focus());
    } else if (H.code === 'ArrowLeft') {
      const ge = P.closest('.tab-list');
      if (!ge) return;
      const ee = Array.from(ge.querySelectorAll('.tab')),
        Z = P.closest('.tab');
      if (!Z) return;
      const se = ee.indexOf(Z),
        ke = se - 1 < 0 ? ee.length - 1 : se - 1,
        te = ee[ke],
        we = te == null ? void 0 : te.querySelector('input');
      te && we && (we.click(), te.focus());
    }
  }
  function z() {
    return delete u.class, u;
  }
  const X = [[]];
  function W(H) {
    Te.call(this, n, H);
  }
  function le(H) {
    Te.call(this, n, H);
  }
  function pe(H) {
    Te.call(this, n, H);
  }
  function re(H) {
    Te.call(this, n, H);
  }
  function be(H) {
    Te.call(this, n, H);
  }
  function me(H) {
    Vo[H ? 'unshift' : 'push'](() => {
      (P = H), t(6, P);
    });
  }
  function ue() {
    (d = this.__value), t(0, d);
  }
  return (
    (n.$$set = (H) => {
      t(32, (e = Me(Me({}, e), Ke(H)))),
        t(31, (u = Zr(e, a))),
        'group' in H && t(0, (d = H.group)),
        'name' in H && t(1, (_ = H.name)),
        'value' in H && t(2, (p = H.value)),
        'title' in H && t(3, (v = H.title)),
        'controls' in H && t(4, (b = H.controls)),
        'regionTab' in H && t(13, (E = H.regionTab)),
        'active' in H && t(14, (k = H.active)),
        'hover' in H && t(15, (O = H.hover)),
        'flex' in H && t(16, (I = H.flex)),
        'padding' in H && t(17, (S = H.padding)),
        'rounded' in H && t(18, (j = H.rounded)),
        'spacing' in H && t(19, (M = H.spacing)),
        '$$scope' in H && t(21, (c = H.$$scope));
    }),
    (n.$$.update = () => {
      n.$$.dirty[0] & 5 && t(5, (r = p === d)),
        n.$$.dirty[0] & 49184 && t(20, (i = r ? k : O)),
        t(9, (s = `${ws} ${I} ${S} ${j} ${i} ${e.class ?? ''}`)),
        n.$$.dirty[0] & 524288 && t(8, (o = `${Cs} ${M}`)),
        n.$$.dirty[0] & 8192 && t(7, (l = `${E}`));
    }),
    (e = Ke(e)),
    [
      d,
      _,
      p,
      v,
      b,
      r,
      P,
      l,
      o,
      s,
      F,
      z,
      f,
      E,
      k,
      O,
      I,
      S,
      j,
      M,
      i,
      c,
      h,
      W,
      le,
      pe,
      re,
      be,
      me,
      ue,
      X,
    ]
  );
}
class wc extends Ce {
  constructor(e) {
    super(),
      qe(
        this,
        e,
        qs,
        Ss,
        Se,
        {
          group: 0,
          name: 1,
          value: 2,
          title: 3,
          controls: 4,
          regionTab: 13,
          active: 14,
          hover: 15,
          flex: 16,
          padding: 17,
          rounded: 18,
          spacing: 19,
        },
        null,
        [-1, -1],
      );
  }
}
function hn(n) {
  let e = n[12],
    t,
    r,
    i = yn(n);
  return {
    c() {
      i.c(), (t = J());
    },
    l(s) {
      i.l(s), (t = J());
    },
    m(s, o) {
      i.m(s, o), T(s, t, o), (r = !0);
    },
    p(s, o) {
      o[0] & 4096 && Se(e, (e = s[12]))
        ? (ve(),
          U(i, 1, 1, K),
          ye(),
          (i = yn(s)),
          i.c(),
          D(i, 1),
          i.m(t.parentNode, t))
        : i.p(s, o);
    },
    i(s) {
      r || (D(i), (r = !0));
    },
    o(s) {
      U(i), (r = !1);
    },
    d(s) {
      s && m(t), i.d(s);
    },
  };
}
function Is(n) {
  var u, h;
  let e, t, r, i, s;
  const o = [(u = n[14]) == null ? void 0 : u.props, { parent: n[15] }];
  var l = (h = n[14]) == null ? void 0 : h.ref;
  function a(c) {
    let f = { $$slots: { default: [Rs] }, $$scope: { ctx: c } };
    for (let d = 0; d < o.length; d += 1) f = Me(f, o[d]);
    return { props: f };
  }
  return (
    l && (t = xr(l, a(n))),
    {
      c() {
        (e = w('div')), t && De(t.$$.fragment), this.h();
      },
      l(c) {
        e = C(c, 'DIV', {
          class: !0,
          'data-testid': !0,
          role: !0,
          'aria-modal': !0,
          'aria-label': !0,
        });
        var f = q(e);
        t && He(t.$$.fragment, f), f.forEach(m), this.h();
      },
      h() {
        var c;
        y(
          e,
          'class',
          (r =
            'modal contents ' +
            (((c = n[12][0]) == null ? void 0 : c.modalClasses) ?? '')),
        ),
          y(e, 'data-testid', 'modal-component'),
          y(e, 'role', 'dialog'),
          y(e, 'aria-modal', 'true'),
          y(e, 'aria-label', (i = n[12][0].title ?? ''));
      },
      m(c, f) {
        T(c, e, f), t && Fe(t, e, null), (s = !0);
      },
      p(c, f) {
        var _, p, v;
        const d =
          f[0] & 49152
            ? Dr(o, [
                f[0] & 16384 && Jo((_ = c[14]) == null ? void 0 : _.props),
                f[0] & 32768 && { parent: c[15] },
              ])
            : {};
        if (
          ((f[0] & 16384) | (f[1] & 8192) && (d.$$scope = { dirty: f, ctx: c }),
          f[0] & 16384 && l !== (l = (p = c[14]) == null ? void 0 : p.ref))
        ) {
          if (t) {
            ve();
            const b = t;
            U(b.$$.fragment, 1, 0, () => {
              Le(b, 1);
            }),
              ye();
          }
          l
            ? ((t = xr(l, a(c))),
              De(t.$$.fragment),
              D(t.$$.fragment, 1),
              Fe(t, e, null))
            : (t = null);
        } else l && t.$set(d);
        (!s ||
          (f[0] & 4096 &&
            r !==
              (r =
                'modal contents ' +
                (((v = c[12][0]) == null ? void 0 : v.modalClasses) ?? '')))) &&
          y(e, 'class', r),
          (!s || (f[0] & 4096 && i !== (i = c[12][0].title ?? ''))) &&
            y(e, 'aria-label', i);
      },
      i(c) {
        s || (t && D(t.$$.fragment, c), (s = !0));
      },
      o(c) {
        t && U(t.$$.fragment, c), (s = !1);
      },
      d(c) {
        c && m(e), t && Le(t);
      },
    }
  );
}
function Ps(n) {
  var p, v, b, E;
  let e,
    t,
    r,
    i,
    s,
    o,
    l,
    a,
    u = ((p = n[12][0]) == null ? void 0 : p.title) && _n(n),
    h = ((v = n[12][0]) == null ? void 0 : v.body) && pn(n),
    c =
      ((b = n[12][0]) == null ? void 0 : b.image) &&
      typeof ((E = n[12][0]) == null ? void 0 : E.image) == 'string' &&
      vn(n);
  function f(k, O) {
    if (k[12][0].type === 'alert') return Ms;
    if (k[12][0].type === 'confirm') return Ts;
    if (k[12][0].type === 'prompt') return As;
  }
  let d = f(n),
    _ = d && d(n);
  return {
    c() {
      (e = w('div')),
        u && u.c(),
        (t = B()),
        h && h.c(),
        (r = B()),
        c && c.c(),
        (i = B()),
        _ && _.c(),
        this.h();
    },
    l(k) {
      e = C(k, 'DIV', {
        class: !0,
        'data-testid': !0,
        role: !0,
        'aria-modal': !0,
        'aria-label': !0,
      });
      var O = q(e);
      u && u.l(O),
        (t = Q(O)),
        h && h.l(O),
        (r = Q(O)),
        c && c.l(O),
        (i = Q(O)),
        _ && _.l(O),
        O.forEach(m),
        this.h();
    },
    h() {
      y(e, 'class', (s = 'modal ' + n[16])),
        y(e, 'data-testid', 'modal'),
        y(e, 'role', 'dialog'),
        y(e, 'aria-modal', 'true'),
        y(e, 'aria-label', (o = n[12][0].title ?? ''));
    },
    m(k, O) {
      T(k, e, O),
        u && u.m(e, null),
        g(e, t),
        h && h.m(e, null),
        g(e, r),
        c && c.m(e, null),
        g(e, i),
        _ && _.m(e, null),
        (a = !0);
    },
    p(k, O) {
      var I, S, j, M;
      (n = k),
        (I = n[12][0]) != null && I.title
          ? u
            ? u.p(n, O)
            : ((u = _n(n)), u.c(), u.m(e, t))
          : u && (u.d(1), (u = null)),
        (S = n[12][0]) != null && S.body
          ? h
            ? h.p(n, O)
            : ((h = pn(n)), h.c(), h.m(e, r))
          : h && (h.d(1), (h = null)),
        (j = n[12][0]) != null &&
        j.image &&
        typeof ((M = n[12][0]) == null ? void 0 : M.image) == 'string'
          ? c
            ? c.p(n, O)
            : ((c = vn(n)), c.c(), c.m(e, i))
          : c && (c.d(1), (c = null)),
        d === (d = f(n)) && _
          ? _.p(n, O)
          : (_ && _.d(1), (_ = d && d(n)), _ && (_.c(), _.m(e, null))),
        (!a || (O[0] & 65536 && s !== (s = 'modal ' + n[16]))) &&
          y(e, 'class', s),
        (!a || (O[0] & 4096 && o !== (o = n[12][0].title ?? ''))) &&
          y(e, 'aria-label', o);
    },
    i(k) {
      a ||
        (Cr(() => {
          a &&
            (l || (l = rt(e, xt, { duration: n[3], opacity: 0, y: 100 }, !0)),
            l.run(1));
        }),
        (a = !0));
    },
    o(k) {
      l || (l = rt(e, xt, { duration: n[3], opacity: 0, y: 100 }, !1)),
        l.run(0),
        (a = !1);
    },
    d(k) {
      k && m(e),
        u && u.d(),
        h && h.d(),
        c && c.d(),
        _ && _.d(),
        k && l && l.end();
    },
  };
}
function dn(n) {
  var i;
  let e,
    t = ((i = n[14]) == null ? void 0 : i.slot) + '',
    r;
  return {
    c() {
      (e = new Wo(!1)), (r = J()), this.h();
    },
    l(s) {
      (e = Yo(s, !1)), (r = J()), this.h();
    },
    h() {
      e.a = r;
    },
    m(s, o) {
      e.m(t, s, o), T(s, r, o);
    },
    p(s, o) {
      var l;
      o[0] & 16384 &&
        t !== (t = ((l = s[14]) == null ? void 0 : l.slot) + '') &&
        e.p(t);
    },
    d(s) {
      s && m(r), s && e.d();
    },
  };
}
function Rs(n) {
  var r;
  let e,
    t = ((r = n[14]) == null ? void 0 : r.slot) && dn(n);
  return {
    c() {
      t && t.c(), (e = J());
    },
    l(i) {
      t && t.l(i), (e = J());
    },
    m(i, s) {
      t && t.m(i, s), T(i, e, s);
    },
    p(i, s) {
      var o;
      (o = i[14]) != null && o.slot
        ? t
          ? t.p(i, s)
          : ((t = dn(i)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    d(i) {
      t && t.d(i), i && m(e);
    },
  };
}
function _n(n) {
  let e,
    t = n[12][0].title + '',
    r;
  return {
    c() {
      (e = w('header')), this.h();
    },
    l(i) {
      e = C(i, 'HEADER', { class: !0 });
      var s = q(e);
      s.forEach(m), this.h();
    },
    h() {
      y(e, 'class', (r = 'modal-header ' + n[9]));
    },
    m(i, s) {
      T(i, e, s), (e.innerHTML = t);
    },
    p(i, s) {
      s[0] & 4096 && t !== (t = i[12][0].title + '') && (e.innerHTML = t),
        s[0] & 512 && r !== (r = 'modal-header ' + i[9]) && y(e, 'class', r);
    },
    d(i) {
      i && m(e);
    },
  };
}
function pn(n) {
  let e,
    t = n[12][0].body + '',
    r;
  return {
    c() {
      (e = w('article')), this.h();
    },
    l(i) {
      e = C(i, 'ARTICLE', { class: !0 });
      var s = q(e);
      s.forEach(m), this.h();
    },
    h() {
      y(e, 'class', (r = 'modal-body ' + n[10]));
    },
    m(i, s) {
      T(i, e, s), (e.innerHTML = t);
    },
    p(i, s) {
      s[0] & 4096 && t !== (t = i[12][0].body + '') && (e.innerHTML = t),
        s[0] & 1024 && r !== (r = 'modal-body ' + i[10]) && y(e, 'class', r);
    },
    d(i) {
      i && m(e);
    },
  };
}
function vn(n) {
  let e, t;
  return {
    c() {
      (e = w('img')), this.h();
    },
    l(r) {
      (e = C(r, 'IMG', { class: !0, src: !0, alt: !0 })), this.h();
    },
    h() {
      var r;
      y(e, 'class', 'modal-image ' + Ns),
        ce(e.src, (t = (r = n[12][0]) == null ? void 0 : r.image)) ||
          y(e, 'src', t),
        y(e, 'alt', 'Modal');
    },
    m(r, i) {
      T(r, e, i);
    },
    p(r, i) {
      var s;
      i[0] & 4096 &&
        !ce(e.src, (t = (s = r[12][0]) == null ? void 0 : s.image)) &&
        y(e, 'src', t);
    },
    d(r) {
      r && m(e);
    },
  };
}
function As(n) {
  let e,
    t,
    r,
    i,
    s,
    o,
    l,
    a,
    u,
    h,
    c,
    f,
    d,
    _,
    p = [
      { class: 'modal-prompt-input input' },
      { name: 'prompt' },
      { type: 'text' },
      n[12][0].valueAttr,
    ],
    v = {};
  for (let b = 0; b < p.length; b += 1) v = Me(v, p[b]);
  return {
    c() {
      (e = w('form')),
        (t = w('input')),
        (r = B()),
        (i = w('footer')),
        (s = w('button')),
        (o = L(n[0])),
        (a = B()),
        (u = w('button')),
        (h = L(n[2])),
        this.h();
    },
    l(b) {
      e = C(b, 'FORM', { class: !0 });
      var E = q(e);
      (t = C(E, 'INPUT', { class: !0, name: !0, type: !0 })),
        (r = Q(E)),
        (i = C(E, 'FOOTER', { class: !0 }));
      var k = q(i);
      s = C(k, 'BUTTON', { type: !0, class: !0 });
      var O = q(s);
      (o = N(O, n[0])),
        O.forEach(m),
        (a = Q(k)),
        (u = C(k, 'BUTTON', { type: !0, class: !0 }));
      var I = q(u);
      (h = N(I, n[2])), I.forEach(m), k.forEach(m), E.forEach(m), this.h();
    },
    h() {
      Yt(t, v),
        y(s, 'type', 'button'),
        y(s, 'class', (l = 'btn ' + n[7])),
        y(u, 'type', 'submit'),
        y(u, 'class', (c = 'btn ' + n[8])),
        y(i, 'class', (f = 'modal-footer ' + n[11])),
        y(e, 'class', 'space-y-4');
    },
    m(b, E) {
      T(b, e, E),
        g(e, t),
        t.autofocus && t.focus(),
        Xt(t, n[13]),
        g(e, r),
        g(e, i),
        g(i, s),
        g(s, o),
        g(i, a),
        g(i, u),
        g(u, h),
        d ||
          ((_ = [
            G(t, 'input', n[39]),
            G(s, 'click', n[21]),
            G(e, 'submit', n[23]),
          ]),
          (d = !0));
    },
    p(b, E) {
      Yt(
        t,
        (v = Dr(p, [
          { class: 'modal-prompt-input input' },
          { name: 'prompt' },
          { type: 'text' },
          E[0] & 4096 && b[12][0].valueAttr,
        ])),
      ),
        E[0] & 8192 && t.value !== b[13] && Xt(t, b[13]),
        E[0] & 1 && V(o, b[0]),
        E[0] & 128 && l !== (l = 'btn ' + b[7]) && y(s, 'class', l),
        E[0] & 4 && V(h, b[2]),
        E[0] & 256 && c !== (c = 'btn ' + b[8]) && y(u, 'class', c),
        E[0] & 2048 && f !== (f = 'modal-footer ' + b[11]) && y(i, 'class', f);
    },
    d(b) {
      b && m(e), (d = !1), Ne(_);
    },
  };
}
function Ts(n) {
  let e, t, r, i, s, o, l, a, u, h, c;
  return {
    c() {
      (e = w('footer')),
        (t = w('button')),
        (r = L(n[0])),
        (s = B()),
        (o = w('button')),
        (l = L(n[1])),
        this.h();
    },
    l(f) {
      e = C(f, 'FOOTER', { class: !0 });
      var d = q(e);
      t = C(d, 'BUTTON', { type: !0, class: !0 });
      var _ = q(t);
      (r = N(_, n[0])),
        _.forEach(m),
        (s = Q(d)),
        (o = C(d, 'BUTTON', { type: !0, class: !0 }));
      var p = q(o);
      (l = N(p, n[1])), p.forEach(m), d.forEach(m), this.h();
    },
    h() {
      y(t, 'type', 'button'),
        y(t, 'class', (i = 'btn ' + n[7])),
        y(o, 'type', 'button'),
        y(o, 'class', (a = 'btn ' + n[8])),
        y(e, 'class', (u = 'modal-footer ' + n[11]));
    },
    m(f, d) {
      T(f, e, d),
        g(e, t),
        g(t, r),
        g(e, s),
        g(e, o),
        g(o, l),
        h || ((c = [G(t, 'click', n[21]), G(o, 'click', n[22])]), (h = !0));
    },
    p(f, d) {
      d[0] & 1 && V(r, f[0]),
        d[0] & 128 && i !== (i = 'btn ' + f[7]) && y(t, 'class', i),
        d[0] & 2 && V(l, f[1]),
        d[0] & 256 && a !== (a = 'btn ' + f[8]) && y(o, 'class', a),
        d[0] & 2048 && u !== (u = 'modal-footer ' + f[11]) && y(e, 'class', u);
    },
    d(f) {
      f && m(e), (h = !1), Ne(c);
    },
  };
}
function Ms(n) {
  let e, t, r, i, s, o, l;
  return {
    c() {
      (e = w('footer')), (t = w('button')), (r = L(n[0])), this.h();
    },
    l(a) {
      e = C(a, 'FOOTER', { class: !0 });
      var u = q(e);
      t = C(u, 'BUTTON', { type: !0, class: !0 });
      var h = q(t);
      (r = N(h, n[0])), h.forEach(m), u.forEach(m), this.h();
    },
    h() {
      y(t, 'type', 'button'),
        y(t, 'class', (i = 'btn ' + n[7])),
        y(e, 'class', (s = 'modal-footer ' + n[11]));
    },
    m(a, u) {
      T(a, e, u), g(e, t), g(t, r), o || ((l = G(t, 'click', n[21])), (o = !0));
    },
    p(a, u) {
      u[0] & 1 && V(r, a[0]),
        u[0] & 128 && i !== (i = 'btn ' + a[7]) && y(t, 'class', i),
        u[0] & 2048 && s !== (s = 'modal-footer ' + a[11]) && y(e, 'class', s);
    },
    d(a) {
      a && m(e), (o = !1), l();
    },
  };
}
function yn(n) {
  let e, t, r, i, s, o, l, a, u, h, c;
  const f = [Ps, Is],
    d = [];
  function _(p, v) {
    return p[12][0].type !== 'component' ? 0 : 1;
  }
  return (
    (r = _(n)),
    (i = d[r] = f[r](n)),
    {
      c() {
        (e = w('div')), (t = w('div')), i.c(), this.h();
      },
      l(p) {
        e = C(p, 'DIV', { class: !0, 'data-testid': !0 });
        var v = q(e);
        t = C(v, 'DIV', { class: !0 });
        var b = q(t);
        i.l(b), b.forEach(m), v.forEach(m), this.h();
      },
      h() {
        y(t, 'class', (s = 'modal-transition ' + n[17])),
          y(e, 'class', (l = 'modal-backdrop ' + n[18])),
          y(e, 'data-testid', 'modal-backdrop');
      },
      m(p, v) {
        T(p, e, v),
          g(e, t),
          d[r].m(t, null),
          (u = !0),
          h ||
            ((c = [
              G(e, 'mousedown', n[19]),
              G(e, 'mouseup', n[20]),
              G(e, 'touchstart', n[37]),
              G(e, 'touchend', n[38]),
              zo(os.call(null, e, !0)),
            ]),
            (h = !0));
      },
      p(p, v) {
        n = p;
        let b = r;
        (r = _(n)),
          r === b
            ? d[r].p(n, v)
            : (ve(),
              U(d[b], 1, 1, () => {
                d[b] = null;
              }),
              ye(),
              (i = d[r]),
              i ? i.p(n, v) : ((i = d[r] = f[r](n)), i.c()),
              D(i, 1),
              i.m(t, null)),
          (!u || (v[0] & 131072 && s !== (s = 'modal-transition ' + n[17]))) &&
            y(t, 'class', s),
          (!u || (v[0] & 262144 && l !== (l = 'modal-backdrop ' + n[18]))) &&
            y(e, 'class', l);
      },
      i(p) {
        u ||
          (D(i),
          Cr(() => {
            u &&
              (o ||
                (o = rt(
                  t,
                  xt,
                  { duration: n[3], opacity: n[4], x: n[5], y: n[6] },
                  !0,
                )),
              o.run(1));
          }),
          Cr(() => {
            u && (a || (a = rt(e, $r, { duration: n[3] }, !0)), a.run(1));
          }),
          (u = !0));
      },
      o(p) {
        U(i),
          o ||
            (o = rt(
              t,
              xt,
              { duration: n[3], opacity: n[4], x: n[5], y: n[6] },
              !1,
            )),
          o.run(0),
          a || (a = rt(e, $r, { duration: n[3] }, !1)),
          a.run(0),
          (u = !1);
      },
      d(p) {
        p && m(e),
          d[r].d(),
          p && o && o.end(),
          p && a && a.end(),
          (h = !1),
          Ne(c);
      },
    }
  );
}
function js(n) {
  let e,
    t,
    r,
    i,
    s = n[12].length > 0 && hn(n);
  return {
    c() {
      s && s.c(), (e = J());
    },
    l(o) {
      s && s.l(o), (e = J());
    },
    m(o, l) {
      s && s.m(o, l),
        T(o, e, l),
        (t = !0),
        r || ((i = G(window, 'keydown', n[24])), (r = !0));
    },
    p(o, l) {
      o[12].length > 0
        ? s
          ? (s.p(o, l), l[0] & 4096 && D(s, 1))
          : ((s = hn(o)), s.c(), D(s, 1), s.m(e.parentNode, e))
        : s &&
          (ve(),
          U(s, 1, 1, () => {
            s = null;
          }),
          ye());
    },
    i(o) {
      t || (D(s), (t = !0));
    },
    o(o) {
      U(s), (t = !1);
    },
    d(o) {
      s && s.d(o), o && m(e), (r = !1), i();
    },
  };
}
const Ds = 'fixed top-0 left-0 right-0 bottom-0',
  Fs = 'w-full h-full p-4 overflow-y-auto flex justify-center',
  Ls = 'block',
  Ns = 'w-full h-auto';
function Hs(n, e, t) {
  let r, i, s, o, l, a;
  et(n, Pe, (R) => t(12, (a = R)));
  const u = Go();
  let { position: h = 'items-center' } = e,
    { components: c = {} } = e,
    { duration: f = 150 } = e,
    { flyOpacity: d = 0 } = e,
    { flyX: _ = 0 } = e,
    { flyY: p = 100 } = e,
    { background: v = 'bg-surface-100-800-token' } = e,
    { width: b = 'w-modal' } = e,
    { height: E = 'h-auto' } = e,
    { padding: k = 'p-4' } = e,
    { spacing: O = 'space-y-4' } = e,
    { rounded: I = 'rounded-container-token' } = e,
    { shadow: S = 'shadow-xl' } = e,
    { zIndex: j = 'z-[999]' } = e,
    { buttonNeutral: M = 'variant-ghost-surface' } = e,
    { buttonPositive: P = 'variant-filled' } = e,
    { buttonTextCancel: F = 'Cancel' } = e,
    { buttonTextConfirm: z = 'Confirm' } = e,
    { buttonTextSubmit: X = 'Submit' } = e,
    { regionBackdrop: W = 'bg-surface-backdrop-token' } = e,
    { regionHeader: le = 'text-2xl font-bold' } = e,
    { regionBody: pe = 'max-h-[200px] overflow-hidden' } = e,
    { regionFooter: re = 'flex justify-end space-x-2' } = e,
    be;
  const me = { buttonTextCancel: F, buttonTextConfirm: z, buttonTextSubmit: X };
  let ue,
    H = !1;
  Pe.subscribe((R) => {
    R.length &&
      (R[0].type === 'prompt' && t(13, (be = R[0].value)),
      t(0, (F = R[0].buttonTextCancel || me.buttonTextCancel)),
      t(1, (z = R[0].buttonTextConfirm || me.buttonTextConfirm)),
      t(2, (X = R[0].buttonTextSubmit || me.buttonTextSubmit)),
      t(
        14,
        (ue =
          typeof R[0].component == 'string'
            ? c[R[0].component]
            : R[0].component),
      ));
  });
  function ge(R) {
    if (!(R.target instanceof Element)) return;
    const ne = R.target.classList;
    (ne.contains('modal-backdrop') || ne.contains('modal-transition')) &&
      (H = !0);
  }
  function ee(R) {
    if (!(R.target instanceof Element)) return;
    const ne = R.target.classList;
    (ne.contains('modal-backdrop') || ne.contains('modal-transition')) &&
      H &&
      (a[0].response && a[0].response(void 0), Pe.close(), u('backdrop', R)),
      (H = !1);
  }
  function Z() {
    a[0].response && a[0].response(!1), Pe.close();
  }
  function se() {
    a[0].response && a[0].response(!0), Pe.close();
  }
  function ke(R) {
    R.preventDefault(), a[0].response && a[0].response(be), Pe.close();
  }
  function te(R) {
    a.length && R.code === 'Escape' && Z();
  }
  function we(R) {
    Te.call(this, n, R);
  }
  function x(R) {
    Te.call(this, n, R);
  }
  function Ie() {
    (be = this.value), t(13, be);
  }
  return (
    (n.$$set = (R) => {
      t(43, (e = Me(Me({}, e), Ke(R)))),
        'position' in R && t(25, (h = R.position)),
        'components' in R && t(26, (c = R.components)),
        'duration' in R && t(3, (f = R.duration)),
        'flyOpacity' in R && t(4, (d = R.flyOpacity)),
        'flyX' in R && t(5, (_ = R.flyX)),
        'flyY' in R && t(6, (p = R.flyY)),
        'background' in R && t(27, (v = R.background)),
        'width' in R && t(28, (b = R.width)),
        'height' in R && t(29, (E = R.height)),
        'padding' in R && t(30, (k = R.padding)),
        'spacing' in R && t(31, (O = R.spacing)),
        'rounded' in R && t(32, (I = R.rounded)),
        'shadow' in R && t(33, (S = R.shadow)),
        'zIndex' in R && t(34, (j = R.zIndex)),
        'buttonNeutral' in R && t(7, (M = R.buttonNeutral)),
        'buttonPositive' in R && t(8, (P = R.buttonPositive)),
        'buttonTextCancel' in R && t(0, (F = R.buttonTextCancel)),
        'buttonTextConfirm' in R && t(1, (z = R.buttonTextConfirm)),
        'buttonTextSubmit' in R && t(2, (X = R.buttonTextSubmit)),
        'regionBackdrop' in R && t(35, (W = R.regionBackdrop)),
        'regionHeader' in R && t(9, (le = R.regionHeader)),
        'regionBody' in R && t(10, (pe = R.regionBody)),
        'regionFooter' in R && t(11, (re = R.regionFooter));
    }),
    (n.$$.update = () => {
      var R, ne, Ae;
      n.$$.dirty[0] & 33558528 &&
        t(36, (r = ((R = a[0]) == null ? void 0 : R.position) ?? h)),
        t(
          18,
          (i = `${Ds} ${W} ${j} ${e.class ?? ''} ${
            ((ne = a[0]) == null ? void 0 : ne.backdropClasses) ?? ''
          }`),
        ),
        n.$$.dirty[1] & 32 && t(17, (s = `${Fs} ${r ?? ''}`)),
        (n.$$.dirty[0] & 2013270016) | (n.$$.dirty[1] & 7) &&
          t(
            16,
            (o = `${Ls} ${v} ${b} ${E} ${k} ${O} ${I} ${S} ${
              ((Ae = a[0]) == null ? void 0 : Ae.modalClasses) ?? ''
            }`),
          ),
        (n.$$.dirty[0] & 2046824447) | (n.$$.dirty[1] & 23) &&
          t(
            15,
            (l = {
              position: h,
              duration: f,
              flyOpacity: d,
              flyX: _,
              flyY: p,
              background: v,
              width: b,
              height: E,
              padding: k,
              spacing: O,
              rounded: I,
              shadow: S,
              buttonNeutral: M,
              buttonPositive: P,
              buttonTextCancel: F,
              buttonTextConfirm: z,
              buttonTextSubmit: X,
              regionBackdrop: W,
              regionHeader: le,
              regionBody: pe,
              regionFooter: re,
              onClose: Z,
            }),
          );
    }),
    (e = Ke(e)),
    [
      F,
      z,
      X,
      f,
      d,
      _,
      p,
      M,
      P,
      le,
      pe,
      re,
      a,
      be,
      ue,
      l,
      o,
      s,
      i,
      ge,
      ee,
      Z,
      se,
      ke,
      te,
      h,
      c,
      v,
      b,
      E,
      k,
      O,
      I,
      S,
      j,
      W,
      r,
      we,
      x,
      Ie,
    ]
  );
}
class Cc extends Ce {
  constructor(e) {
    super(),
      qe(
        this,
        e,
        Hs,
        js,
        Se,
        {
          position: 25,
          components: 26,
          duration: 3,
          flyOpacity: 4,
          flyX: 5,
          flyY: 6,
          background: 27,
          width: 28,
          height: 29,
          padding: 30,
          spacing: 31,
          rounded: 32,
          shadow: 33,
          zIndex: 34,
          buttonNeutral: 7,
          buttonPositive: 8,
          buttonTextCancel: 0,
          buttonTextConfirm: 1,
          buttonTextSubmit: 2,
          regionBackdrop: 35,
          regionHeader: 9,
          regionBody: 10,
          regionFooter: 11,
        },
        null,
        [-1, -1],
      );
  }
}
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */ const Fr = it();
var qr = function (n, e) {
  return (
    (qr =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (t, r) {
          t.__proto__ = r;
        }) ||
      function (t, r) {
        for (var i in r)
          Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
      }),
    qr(n, e)
  );
};
function Lr(n, e) {
  if (typeof e != 'function' && e !== null)
    throw new TypeError(
      'Class extends value ' + String(e) + ' is not a constructor or null',
    );
  qr(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype =
    e === null ? Object.create(e) : ((t.prototype = e.prototype), new t());
}
function Us(n, e, t, r) {
  function i(s) {
    return s instanceof t
      ? s
      : new t(function (o) {
          o(s);
        });
  }
  return new (t || (t = Promise))(function (s, o) {
    function l(h) {
      try {
        u(r.next(h));
      } catch (c) {
        o(c);
      }
    }
    function a(h) {
      try {
        u(r.throw(h));
      } catch (c) {
        o(c);
      }
    }
    function u(h) {
      h.done ? s(h.value) : i(h.value).then(l, a);
    }
    u((r = r.apply(n, e || [])).next());
  });
}
function $i(n, e) {
  var t = {
      label: 0,
      sent: function () {
        if (s[0] & 1) throw s[1];
        return s[1];
      },
      trys: [],
      ops: [],
    },
    r,
    i,
    s,
    o;
  return (
    (o = { next: l(0), throw: l(1), return: l(2) }),
    typeof Symbol == 'function' &&
      (o[Symbol.iterator] = function () {
        return this;
      }),
    o
  );
  function l(u) {
    return function (h) {
      return a([u, h]);
    };
  }
  function a(u) {
    if (r) throw new TypeError('Generator is already executing.');
    for (; o && ((o = 0), u[0] && (t = 0)), t; )
      try {
        if (
          ((r = 1),
          i &&
            (s =
              u[0] & 2
                ? i.return
                : u[0]
                ? i.throw || ((s = i.return) && s.call(i), 0)
                : i.next) &&
            !(s = s.call(i, u[1])).done)
        )
          return s;
        switch (((i = 0), s && (u = [u[0] & 2, s.value]), u[0])) {
          case 0:
          case 1:
            s = u;
            break;
          case 4:
            return t.label++, { value: u[1], done: !1 };
          case 5:
            t.label++, (i = u[1]), (u = [0]);
            continue;
          case 7:
            (u = t.ops.pop()), t.trys.pop();
            continue;
          default:
            if (
              ((s = t.trys),
              !(s = s.length > 0 && s[s.length - 1]) &&
                (u[0] === 6 || u[0] === 2))
            ) {
              t = 0;
              continue;
            }
            if (u[0] === 3 && (!s || (u[1] > s[0] && u[1] < s[3]))) {
              t.label = u[1];
              break;
            }
            if (u[0] === 6 && t.label < s[1]) {
              (t.label = s[1]), (s = u);
              break;
            }
            if (s && t.label < s[2]) {
              (t.label = s[2]), t.ops.push(u);
              break;
            }
            s[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        u = e.call(n, t);
      } catch (h) {
        (u = [6, h]), (i = 0);
      } finally {
        r = s = 0;
      }
    if (u[0] & 5) throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
function Ft(n) {
  var e = typeof Symbol == 'function' && Symbol.iterator,
    t = e && n[e],
    r = 0;
  if (t) return t.call(n);
  if (n && typeof n.length == 'number')
    return {
      next: function () {
        return (
          n && r >= n.length && (n = void 0), { value: n && n[r++], done: !n }
        );
      },
    };
  throw new TypeError(
    e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
  );
}
function er(n, e) {
  var t = typeof Symbol == 'function' && n[Symbol.iterator];
  if (!t) return n;
  var r = t.call(n),
    i,
    s = [],
    o;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = r.next()).done; ) s.push(i.value);
  } catch (l) {
    o = { error: l };
  } finally {
    try {
      i && !i.done && (t = r.return) && t.call(r);
    } finally {
      if (o) throw o.error;
    }
  }
  return s;
}
function tr(n, e, t) {
  if (t || arguments.length === 2)
    for (var r = 0, i = e.length, s; r < i; r++)
      (s || !(r in e)) &&
        (s || (s = Array.prototype.slice.call(e, 0, r)), (s[r] = e[r]));
  return n.concat(s || Array.prototype.slice.call(e));
}
function nt(n) {
  return this instanceof nt ? ((this.v = n), this) : new nt(n);
}
function Bs(n, e, t) {
  if (!Symbol.asyncIterator)
    throw new TypeError('Symbol.asyncIterator is not defined.');
  var r = t.apply(n, e || []),
    i,
    s = [];
  return (
    (i = {}),
    o('next'),
    o('throw'),
    o('return'),
    (i[Symbol.asyncIterator] = function () {
      return this;
    }),
    i
  );
  function o(f) {
    r[f] &&
      (i[f] = function (d) {
        return new Promise(function (_, p) {
          s.push([f, d, _, p]) > 1 || l(f, d);
        });
      });
  }
  function l(f, d) {
    try {
      a(r[f](d));
    } catch (_) {
      c(s[0][3], _);
    }
  }
  function a(f) {
    f.value instanceof nt
      ? Promise.resolve(f.value.v).then(u, h)
      : c(s[0][2], f);
  }
  function u(f) {
    l('next', f);
  }
  function h(f) {
    l('throw', f);
  }
  function c(f, d) {
    f(d), s.shift(), s.length && l(s[0][0], s[0][1]);
  }
}
function Qs(n) {
  if (!Symbol.asyncIterator)
    throw new TypeError('Symbol.asyncIterator is not defined.');
  var e = n[Symbol.asyncIterator],
    t;
  return e
    ? e.call(n)
    : ((n = typeof Ft == 'function' ? Ft(n) : n[Symbol.iterator]()),
      (t = {}),
      r('next'),
      r('throw'),
      r('return'),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t);
  function r(s) {
    t[s] =
      n[s] &&
      function (o) {
        return new Promise(function (l, a) {
          (o = n[s](o)), i(l, a, o.done, o.value);
        });
      };
  }
  function i(s, o, l, a) {
    Promise.resolve(a).then(function (u) {
      s({ value: u, done: l });
    }, o);
  }
}
function ae(n) {
  return typeof n == 'function';
}
function Ks(n) {
  var e = function (r) {
      Error.call(r), (r.stack = new Error().stack);
    },
    t = n(e);
  return (
    (t.prototype = Object.create(Error.prototype)),
    (t.prototype.constructor = t),
    t
  );
}
var hr = Ks(function (n) {
  return function (t) {
    n(this),
      (this.message = t
        ? t.length +
          ` errors occurred during unsubscription:
` +
          t.map(function (r, i) {
            return i + 1 + ') ' + r.toString();
          }).join(`
  `)
        : ''),
      (this.name = 'UnsubscriptionError'),
      (this.errors = t);
  };
});
function bn(n, e) {
  if (n) {
    var t = n.indexOf(e);
    0 <= t && n.splice(t, 1);
  }
}
var Nr = (function () {
  function n(e) {
    (this.initialTeardown = e),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  return (
    (n.prototype.unsubscribe = function () {
      var e, t, r, i, s;
      if (!this.closed) {
        this.closed = !0;
        var o = this._parentage;
        if (o)
          if (((this._parentage = null), Array.isArray(o)))
            try {
              for (var l = Ft(o), a = l.next(); !a.done; a = l.next()) {
                var u = a.value;
                u.remove(this);
              }
            } catch (p) {
              e = { error: p };
            } finally {
              try {
                a && !a.done && (t = l.return) && t.call(l);
              } finally {
                if (e) throw e.error;
              }
            }
          else o.remove(this);
        var h = this.initialTeardown;
        if (ae(h))
          try {
            h();
          } catch (p) {
            s = p instanceof hr ? p.errors : [p];
          }
        var c = this._finalizers;
        if (c) {
          this._finalizers = null;
          try {
            for (var f = Ft(c), d = f.next(); !d.done; d = f.next()) {
              var _ = d.value;
              try {
                mn(_);
              } catch (p) {
                (s = s ?? []),
                  p instanceof hr
                    ? (s = tr(tr([], er(s)), er(p.errors)))
                    : s.push(p);
              }
            }
          } catch (p) {
            r = { error: p };
          } finally {
            try {
              d && !d.done && (i = f.return) && i.call(f);
            } finally {
              if (r) throw r.error;
            }
          }
        }
        if (s) throw new hr(s);
      }
    }),
    (n.prototype.add = function (e) {
      var t;
      if (e && e !== this)
        if (this.closed) mn(e);
        else {
          if (e instanceof n) {
            if (e.closed || e._hasParent(this)) return;
            e._addParent(this);
          }
          (this._finalizers =
            (t = this._finalizers) !== null && t !== void 0 ? t : []).push(e);
        }
    }),
    (n.prototype._hasParent = function (e) {
      var t = this._parentage;
      return t === e || (Array.isArray(t) && t.includes(e));
    }),
    (n.prototype._addParent = function (e) {
      var t = this._parentage;
      this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
    }),
    (n.prototype._removeParent = function (e) {
      var t = this._parentage;
      t === e ? (this._parentage = null) : Array.isArray(t) && bn(t, e);
    }),
    (n.prototype.remove = function (e) {
      var t = this._finalizers;
      t && bn(t, e), e instanceof n && e._removeParent(this);
    }),
    (n.EMPTY = (function () {
      var e = new n();
      return (e.closed = !0), e;
    })()),
    n
  );
})();
Nr.EMPTY;
function eo(n) {
  return (
    n instanceof Nr ||
    (n && 'closed' in n && ae(n.remove) && ae(n.add) && ae(n.unsubscribe))
  );
}
function mn(n) {
  ae(n) ? n() : n.unsubscribe();
}
var to = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1,
  },
  Ir = {
    setTimeout: function (n, e) {
      for (var t = [], r = 2; r < arguments.length; r++)
        t[r - 2] = arguments[r];
      var i = Ir.delegate;
      return i != null && i.setTimeout
        ? i.setTimeout.apply(i, tr([n, e], er(t)))
        : setTimeout.apply(void 0, tr([n, e], er(t)));
    },
    clearTimeout: function (n) {
      var e = Ir.delegate;
      return ((e == null ? void 0 : e.clearTimeout) || clearTimeout)(n);
    },
    delegate: void 0,
  };
function ro(n) {
  Ir.setTimeout(function () {
    throw n;
  });
}
function gn() {}
function Vs(n) {
  n();
}
var Hr = (function (n) {
    Lr(e, n);
    function e(t) {
      var r = n.call(this) || this;
      return (
        (r.isStopped = !1),
        t ? ((r.destination = t), eo(t) && t.add(r)) : (r.destination = Ws),
        r
      );
    }
    return (
      (e.create = function (t, r, i) {
        return new Pr(t, r, i);
      }),
      (e.prototype.next = function (t) {
        this.isStopped || this._next(t);
      }),
      (e.prototype.error = function (t) {
        this.isStopped || ((this.isStopped = !0), this._error(t));
      }),
      (e.prototype.complete = function () {
        this.isStopped || ((this.isStopped = !0), this._complete());
      }),
      (e.prototype.unsubscribe = function () {
        this.closed ||
          ((this.isStopped = !0),
          n.prototype.unsubscribe.call(this),
          (this.destination = null));
      }),
      (e.prototype._next = function (t) {
        this.destination.next(t);
      }),
      (e.prototype._error = function (t) {
        try {
          this.destination.error(t);
        } finally {
          this.unsubscribe();
        }
      }),
      (e.prototype._complete = function () {
        try {
          this.destination.complete();
        } finally {
          this.unsubscribe();
        }
      }),
      e
    );
  })(Nr),
  Gs = Function.prototype.bind;
function dr(n, e) {
  return Gs.call(n, e);
}
var zs = (function () {
    function n(e) {
      this.partialObserver = e;
    }
    return (
      (n.prototype.next = function (e) {
        var t = this.partialObserver;
        if (t.next)
          try {
            t.next(e);
          } catch (r) {
            Bt(r);
          }
      }),
      (n.prototype.error = function (e) {
        var t = this.partialObserver;
        if (t.error)
          try {
            t.error(e);
          } catch (r) {
            Bt(r);
          }
        else Bt(e);
      }),
      (n.prototype.complete = function () {
        var e = this.partialObserver;
        if (e.complete)
          try {
            e.complete();
          } catch (t) {
            Bt(t);
          }
      }),
      n
    );
  })(),
  Pr = (function (n) {
    Lr(e, n);
    function e(t, r, i) {
      var s = n.call(this) || this,
        o;
      if (ae(t) || !t)
        o = { next: t ?? void 0, error: r ?? void 0, complete: i ?? void 0 };
      else {
        var l;
        s && to.useDeprecatedNextContext
          ? ((l = Object.create(t)),
            (l.unsubscribe = function () {
              return s.unsubscribe();
            }),
            (o = {
              next: t.next && dr(t.next, l),
              error: t.error && dr(t.error, l),
              complete: t.complete && dr(t.complete, l),
            }))
          : (o = t);
      }
      return (s.destination = new zs(o)), s;
    }
    return e;
  })(Hr);
function Bt(n) {
  ro(n);
}
function Js(n) {
  throw n;
}
var Ws = { closed: !0, next: gn, error: Js, complete: gn },
  Ur = (function () {
    return (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
  })();
function no(n) {
  return n;
}
function sr() {
  for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
  return io(n);
}
function io(n) {
  return n.length === 0
    ? no
    : n.length === 1
    ? n[0]
    : function (t) {
        return n.reduce(function (r, i) {
          return i(r);
        }, t);
      };
}
var Ue = (function () {
  function n(e) {
    e && (this._subscribe = e);
  }
  return (
    (n.prototype.lift = function (e) {
      var t = new n();
      return (t.source = this), (t.operator = e), t;
    }),
    (n.prototype.subscribe = function (e, t, r) {
      var i = this,
        s = Xs(e) ? e : new Pr(e, t, r);
      return (
        Vs(function () {
          var o = i,
            l = o.operator,
            a = o.source;
          s.add(l ? l.call(s, a) : a ? i._subscribe(s) : i._trySubscribe(s));
        }),
        s
      );
    }),
    (n.prototype._trySubscribe = function (e) {
      try {
        return this._subscribe(e);
      } catch (t) {
        e.error(t);
      }
    }),
    (n.prototype.forEach = function (e, t) {
      var r = this;
      return (
        (t = kn(t)),
        new t(function (i, s) {
          var o = new Pr({
            next: function (l) {
              try {
                e(l);
              } catch (a) {
                s(a), o.unsubscribe();
              }
            },
            error: s,
            complete: i,
          });
          r.subscribe(o);
        })
      );
    }),
    (n.prototype._subscribe = function (e) {
      var t;
      return (t = this.source) === null || t === void 0
        ? void 0
        : t.subscribe(e);
    }),
    (n.prototype[Ur] = function () {
      return this;
    }),
    (n.prototype.pipe = function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      return io(e)(this);
    }),
    (n.prototype.toPromise = function (e) {
      var t = this;
      return (
        (e = kn(e)),
        new e(function (r, i) {
          var s;
          t.subscribe(
            function (o) {
              return (s = o);
            },
            function (o) {
              return i(o);
            },
            function () {
              return r(s);
            },
          );
        })
      );
    }),
    (n.create = function (e) {
      return new n(e);
    }),
    n
  );
})();
function kn(n) {
  var e;
  return (e = n ?? to.Promise) !== null && e !== void 0 ? e : Promise;
}
function Ys(n) {
  return n && ae(n.next) && ae(n.error) && ae(n.complete);
}
function Xs(n) {
  return (n && n instanceof Hr) || (Ys(n) && eo(n));
}
function Zs(n) {
  return ae(n == null ? void 0 : n.lift);
}
function tt(n) {
  return function (e) {
    if (Zs(e))
      return e.lift(function (t) {
        try {
          return n(t, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError('Unable to lift unknown Observable type');
  };
}
function ot(n, e, t, r, i) {
  return new xs(n, e, t, r, i);
}
var xs = (function (n) {
  Lr(e, n);
  function e(t, r, i, s, o, l) {
    var a = n.call(this, t) || this;
    return (
      (a.onFinalize = o),
      (a.shouldUnsubscribe = l),
      (a._next = r
        ? function (u) {
            try {
              r(u);
            } catch (h) {
              t.error(h);
            }
          }
        : n.prototype._next),
      (a._error = s
        ? function (u) {
            try {
              s(u);
            } catch (h) {
              t.error(h);
            } finally {
              this.unsubscribe();
            }
          }
        : n.prototype._error),
      (a._complete = i
        ? function () {
            try {
              i();
            } catch (u) {
              t.error(u);
            } finally {
              this.unsubscribe();
            }
          }
        : n.prototype._complete),
      a
    );
  }
  return (
    (e.prototype.unsubscribe = function () {
      var t;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var r = this.closed;
        n.prototype.unsubscribe.call(this),
          !r &&
            ((t = this.onFinalize) === null || t === void 0 || t.call(this));
      }
    }),
    e
  );
})(Hr);
function $s(n) {
  return n && ae(n.schedule);
}
function ea(n) {
  return n[n.length - 1];
}
function oo(n) {
  return $s(ea(n)) ? n.pop() : void 0;
}
var so = function (n) {
  return n && typeof n.length == 'number' && typeof n != 'function';
};
function ao(n) {
  return ae(n == null ? void 0 : n.then);
}
function lo(n) {
  return ae(n[Ur]);
}
function uo(n) {
  return (
    Symbol.asyncIterator && ae(n == null ? void 0 : n[Symbol.asyncIterator])
  );
}
function co(n) {
  return new TypeError(
    'You provided ' +
      (n !== null && typeof n == 'object'
        ? 'an invalid object'
        : "'" + n + "'") +
      ' where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.',
  );
}
function ta() {
  return typeof Symbol != 'function' || !Symbol.iterator
    ? '@@iterator'
    : Symbol.iterator;
}
var fo = ta();
function ho(n) {
  return ae(n == null ? void 0 : n[fo]);
}
function _o(n) {
  return Bs(this, arguments, function () {
    var t, r, i, s;
    return $i(this, function (o) {
      switch (o.label) {
        case 0:
          (t = n.getReader()), (o.label = 1);
        case 1:
          o.trys.push([1, , 9, 10]), (o.label = 2);
        case 2:
          return [4, nt(t.read())];
        case 3:
          return (
            (r = o.sent()),
            (i = r.value),
            (s = r.done),
            s ? [4, nt(void 0)] : [3, 5]
          );
        case 4:
          return [2, o.sent()];
        case 5:
          return [4, nt(i)];
        case 6:
          return [4, o.sent()];
        case 7:
          return o.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return t.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function po(n) {
  return ae(n == null ? void 0 : n.getReader);
}
function Nt(n) {
  if (n instanceof Ue) return n;
  if (n != null) {
    if (lo(n)) return ra(n);
    if (so(n)) return na(n);
    if (ao(n)) return ia(n);
    if (uo(n)) return vo(n);
    if (ho(n)) return oa(n);
    if (po(n)) return sa(n);
  }
  throw co(n);
}
function ra(n) {
  return new Ue(function (e) {
    var t = n[Ur]();
    if (ae(t.subscribe)) return t.subscribe(e);
    throw new TypeError(
      'Provided object does not correctly implement Symbol.observable',
    );
  });
}
function na(n) {
  return new Ue(function (e) {
    for (var t = 0; t < n.length && !e.closed; t++) e.next(n[t]);
    e.complete();
  });
}
function ia(n) {
  return new Ue(function (e) {
    n.then(
      function (t) {
        e.closed || (e.next(t), e.complete());
      },
      function (t) {
        return e.error(t);
      },
    ).then(null, ro);
  });
}
function oa(n) {
  return new Ue(function (e) {
    var t, r;
    try {
      for (var i = Ft(n), s = i.next(); !s.done; s = i.next()) {
        var o = s.value;
        if ((e.next(o), e.closed)) return;
      }
    } catch (l) {
      t = { error: l };
    } finally {
      try {
        s && !s.done && (r = i.return) && r.call(i);
      } finally {
        if (t) throw t.error;
      }
    }
    e.complete();
  });
}
function vo(n) {
  return new Ue(function (e) {
    aa(n, e).catch(function (t) {
      return e.error(t);
    });
  });
}
function sa(n) {
  return vo(_o(n));
}
function aa(n, e) {
  var t, r, i, s;
  return Us(this, void 0, void 0, function () {
    var o, l;
    return $i(this, function (a) {
      switch (a.label) {
        case 0:
          a.trys.push([0, 5, 6, 11]), (t = Qs(n)), (a.label = 1);
        case 1:
          return [4, t.next()];
        case 2:
          if (((r = a.sent()), !!r.done)) return [3, 4];
          if (((o = r.value), e.next(o), e.closed)) return [2];
          a.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return (l = a.sent()), (i = { error: l }), [3, 11];
        case 6:
          return (
            a.trys.push([6, , 9, 10]),
            r && !r.done && (s = t.return) ? [4, s.call(t)] : [3, 8]
          );
        case 7:
          a.sent(), (a.label = 8);
        case 8:
          return [3, 10];
        case 9:
          if (i) throw i.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return e.complete(), [2];
      }
    });
  });
}
function Qe(n, e, t, r, i) {
  r === void 0 && (r = 0), i === void 0 && (i = !1);
  var s = e.schedule(function () {
    t(), i ? n.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((n.add(s), !i)) return s;
}
function yo(n, e) {
  return (
    e === void 0 && (e = 0),
    tt(function (t, r) {
      t.subscribe(
        ot(
          r,
          function (i) {
            return Qe(
              r,
              n,
              function () {
                return r.next(i);
              },
              e,
            );
          },
          function () {
            return Qe(
              r,
              n,
              function () {
                return r.complete();
              },
              e,
            );
          },
          function (i) {
            return Qe(
              r,
              n,
              function () {
                return r.error(i);
              },
              e,
            );
          },
        ),
      );
    })
  );
}
function bo(n, e) {
  return (
    e === void 0 && (e = 0),
    tt(function (t, r) {
      r.add(
        n.schedule(function () {
          return t.subscribe(r);
        }, e),
      );
    })
  );
}
function la(n, e) {
  return Nt(n).pipe(bo(e), yo(e));
}
function ua(n, e) {
  return Nt(n).pipe(bo(e), yo(e));
}
function ca(n, e) {
  return new Ue(function (t) {
    var r = 0;
    return e.schedule(function () {
      r === n.length
        ? t.complete()
        : (t.next(n[r++]), t.closed || this.schedule());
    });
  });
}
function fa(n, e) {
  return new Ue(function (t) {
    var r;
    return (
      Qe(t, e, function () {
        (r = n[fo]()),
          Qe(
            t,
            e,
            function () {
              var i, s, o;
              try {
                (i = r.next()), (s = i.value), (o = i.done);
              } catch (l) {
                t.error(l);
                return;
              }
              o ? t.complete() : t.next(s);
            },
            0,
            !0,
          );
      }),
      function () {
        return ae(r == null ? void 0 : r.return) && r.return();
      }
    );
  });
}
function mo(n, e) {
  if (!n) throw new Error('Iterable cannot be null');
  return new Ue(function (t) {
    Qe(t, e, function () {
      var r = n[Symbol.asyncIterator]();
      Qe(
        t,
        e,
        function () {
          r.next().then(function (i) {
            i.done ? t.complete() : t.next(i.value);
          });
        },
        0,
        !0,
      );
    });
  });
}
function ha(n, e) {
  return mo(_o(n), e);
}
function da(n, e) {
  if (n != null) {
    if (lo(n)) return la(n, e);
    if (so(n)) return ca(n, e);
    if (ao(n)) return ua(n, e);
    if (uo(n)) return mo(n, e);
    if (ho(n)) return fa(n, e);
    if (po(n)) return ha(n, e);
  }
  throw co(n);
}
function go(n, e) {
  return e ? da(n, e) : Nt(n);
}
function Br(n, e) {
  return tt(function (t, r) {
    var i = 0;
    t.subscribe(
      ot(r, function (s) {
        r.next(n.call(e, s, i++));
      }),
    );
  });
}
function _a(n, e, t, r, i, s, o, l) {
  var a = [],
    u = 0,
    h = 0,
    c = !1,
    f = function () {
      c && !a.length && !u && e.complete();
    },
    d = function (p) {
      return u < r ? _(p) : a.push(p);
    },
    _ = function (p) {
      s && e.next(p), u++;
      var v = !1;
      Nt(t(p, h++)).subscribe(
        ot(
          e,
          function (b) {
            i == null || i(b), s ? d(b) : e.next(b);
          },
          function () {
            v = !0;
          },
          void 0,
          function () {
            if (v)
              try {
                u--;
                for (
                  var b = function () {
                    var E = a.shift();
                    o
                      ? Qe(e, o, function () {
                          return _(E);
                        })
                      : _(E);
                  };
                  a.length && u < r;

                )
                  b();
                f();
              } catch (E) {
                e.error(E);
              }
          },
        ),
      );
    };
  return (
    n.subscribe(
      ot(e, d, function () {
        (c = !0), f();
      }),
    ),
    function () {
      l == null || l();
    }
  );
}
function ko(n, e, t) {
  return (
    t === void 0 && (t = 1 / 0),
    ae(e)
      ? ko(function (r, i) {
          return Br(function (s, o) {
            return e(r, s, i, o);
          })(Nt(n(r, i)));
        }, t)
      : (typeof e == 'number' && (t = e),
        tt(function (r, i) {
          return _a(r, i, n, t);
        }))
  );
}
function pa(n) {
  return n === void 0 && (n = 1 / 0), ko(no, n);
}
function va() {
  return pa(1);
}
function On() {
  for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
  return va()(go(n, oo(n)));
}
function Oo(n, e) {
  return tt(function (t, r) {
    var i = 0;
    t.subscribe(
      ot(r, function (s) {
        return n.call(e, s, i++) && r.next(s);
      }),
    );
  });
}
function ya(n, e, t, r, i) {
  return function (s, o) {
    var l = t,
      a = e,
      u = 0;
    s.subscribe(
      ot(
        o,
        function (h) {
          var c = u++;
          (a = l ? n(a, h, c) : ((l = !0), h)), r && o.next(a);
        },
        i &&
          function () {
            l && o.next(a), o.complete();
          },
      ),
    );
  };
}
function ba(n, e) {
  return tt(ya(n, e, arguments.length >= 2, !0));
}
function ma() {
  for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
  var t = oo(n);
  return tt(function (r, i) {
    (t ? On(n, r, t) : On(n, r)).subscribe(i);
  });
}
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */ function ga(n) {
  return Oo((e) => e.event.id === n);
}
function ka(n) {
  return Oo((e) => e.event.pubkey === n);
}
function Oa() {
  return ba((n, e) => [...n, e], []);
}
function Ea(n) {
  return sr(
    Oa(),
    Br((e) => {
      const t = new Map();
      return (
        e.forEach((r) => {
          const i = n(r),
            s = t.get(i);
          s ? t.set(i, [...s, r]) : t.set(i, [r]);
        }),
        t
      );
    }),
  );
}
function Sa(n) {
  return sr(
    Ea(n),
    Br((e) => Array.from(e.entries()).map(([, t]) => t.slice(-1)[0])),
  );
}
class Ht {
  constructor() {
    (this.listeners = new Set()), (this.subscribe = this.subscribe.bind(this));
  }
  subscribe(e) {
    const t = { listener: e };
    return (
      this.listeners.add(t),
      this.onSubscribe(),
      () => {
        this.listeners.delete(t), this.onUnsubscribe();
      }
    );
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {}
  onUnsubscribe() {}
}
const Lt = typeof window > 'u' || 'Deno' in window;
function Re() {}
function wa(n, e) {
  return typeof n == 'function' ? n(e) : n;
}
function Rr(n) {
  return typeof n == 'number' && n >= 0 && n !== 1 / 0;
}
function Eo(n, e) {
  return Math.max(n + (e || 0) - Date.now(), 0);
}
function jt(n, e, t) {
  return ar(n)
    ? typeof e == 'function'
      ? { ...t, queryKey: n, queryFn: e }
      : { ...e, queryKey: n }
    : n;
}
function Be(n, e, t) {
  return ar(n) ? [{ ...e, queryKey: n }, t] : [n || {}, e];
}
function En(n, e) {
  const {
    type: t = 'all',
    exact: r,
    fetchStatus: i,
    predicate: s,
    queryKey: o,
    stale: l,
  } = n;
  if (ar(o)) {
    if (r) {
      if (e.queryHash !== Qr(o, e.options)) return !1;
    } else if (!rr(e.queryKey, o)) return !1;
  }
  if (t !== 'all') {
    const a = e.isActive();
    if ((t === 'active' && !a) || (t === 'inactive' && a)) return !1;
  }
  return !(
    (typeof l == 'boolean' && e.isStale() !== l) ||
    (typeof i < 'u' && i !== e.state.fetchStatus) ||
    (s && !s(e))
  );
}
function Sn(n, e) {
  const { exact: t, fetching: r, predicate: i, mutationKey: s } = n;
  if (ar(s)) {
    if (!e.options.mutationKey) return !1;
    if (t) {
      if (xe(e.options.mutationKey) !== xe(s)) return !1;
    } else if (!rr(e.options.mutationKey, s)) return !1;
  }
  return !(
    (typeof r == 'boolean' && (e.state.status === 'loading') !== r) ||
    (i && !i(e))
  );
}
function Qr(n, e) {
  return ((e == null ? void 0 : e.queryKeyHashFn) || xe)(n);
}
function xe(n) {
  return JSON.stringify(n, (e, t) =>
    Ar(t)
      ? Object.keys(t)
          .sort()
          .reduce((r, i) => ((r[i] = t[i]), r), {})
      : t,
  );
}
function rr(n, e) {
  return So(n, e);
}
function So(n, e) {
  return n === e
    ? !0
    : typeof n != typeof e
    ? !1
    : n && e && typeof n == 'object' && typeof e == 'object'
    ? !Object.keys(e).some((t) => !So(n[t], e[t]))
    : !1;
}
function wo(n, e) {
  if (n === e) return n;
  const t = Cn(n) && Cn(e);
  if (t || (Ar(n) && Ar(e))) {
    const r = t ? n.length : Object.keys(n).length,
      i = t ? e : Object.keys(e),
      s = i.length,
      o = t ? [] : {};
    let l = 0;
    for (let a = 0; a < s; a++) {
      const u = t ? a : i[a];
      (o[u] = wo(n[u], e[u])), o[u] === n[u] && l++;
    }
    return r === s && l === r ? n : o;
  }
  return e;
}
function wn(n, e) {
  if ((n && !e) || (e && !n)) return !1;
  for (const t in n) if (n[t] !== e[t]) return !1;
  return !0;
}
function Cn(n) {
  return Array.isArray(n) && n.length === Object.keys(n).length;
}
function Ar(n) {
  if (!qn(n)) return !1;
  const e = n.constructor;
  if (typeof e > 'u') return !0;
  const t = e.prototype;
  return !(!qn(t) || !t.hasOwnProperty('isPrototypeOf'));
}
function qn(n) {
  return Object.prototype.toString.call(n) === '[object Object]';
}
function ar(n) {
  return Array.isArray(n);
}
function Co(n) {
  return new Promise((e) => {
    setTimeout(e, n);
  });
}
function In(n) {
  Co(0).then(n);
}
function Ca() {
  if (typeof AbortController == 'function') return new AbortController();
}
function Tr(n, e, t) {
  return t.isDataEqual != null && t.isDataEqual(n, e)
    ? n
    : typeof t.structuralSharing == 'function'
    ? t.structuralSharing(n, e)
    : t.structuralSharing !== !1
    ? wo(n, e)
    : e;
}
class qa extends Ht {
  constructor() {
    super(),
      (this.setup = (e) => {
        if (!Lt && window.addEventListener) {
          const t = () => e();
          return (
            window.addEventListener('visibilitychange', t, !1),
            window.addEventListener('focus', t, !1),
            () => {
              window.removeEventListener('visibilitychange', t),
                window.removeEventListener('focus', t);
            }
          );
        }
      });
  }
  onSubscribe() {
    this.cleanup || this.setEventListener(this.setup);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var e;
      (e = this.cleanup) == null || e.call(this), (this.cleanup = void 0);
    }
  }
  setEventListener(e) {
    var t;
    (this.setup = e),
      (t = this.cleanup) == null || t.call(this),
      (this.cleanup = e((r) => {
        typeof r == 'boolean' ? this.setFocused(r) : this.onFocus();
      }));
  }
  setFocused(e) {
    (this.focused = e), e && this.onFocus();
  }
  onFocus() {
    this.listeners.forEach(({ listener: e }) => {
      e();
    });
  }
  isFocused() {
    return typeof this.focused == 'boolean'
      ? this.focused
      : typeof document > 'u'
      ? !0
      : [void 0, 'visible', 'prerender'].includes(document.visibilityState);
  }
}
const nr = new qa(),
  Pn = ['online', 'offline'];
class Ia extends Ht {
  constructor() {
    super(),
      (this.setup = (e) => {
        if (!Lt && window.addEventListener) {
          const t = () => e();
          return (
            Pn.forEach((r) => {
              window.addEventListener(r, t, !1);
            }),
            () => {
              Pn.forEach((r) => {
                window.removeEventListener(r, t);
              });
            }
          );
        }
      });
  }
  onSubscribe() {
    this.cleanup || this.setEventListener(this.setup);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var e;
      (e = this.cleanup) == null || e.call(this), (this.cleanup = void 0);
    }
  }
  setEventListener(e) {
    var t;
    (this.setup = e),
      (t = this.cleanup) == null || t.call(this),
      (this.cleanup = e((r) => {
        typeof r == 'boolean' ? this.setOnline(r) : this.onOnline();
      }));
  }
  setOnline(e) {
    (this.online = e), e && this.onOnline();
  }
  onOnline() {
    this.listeners.forEach(({ listener: e }) => {
      e();
    });
  }
  isOnline() {
    return typeof this.online == 'boolean'
      ? this.online
      : typeof navigator > 'u' || typeof navigator.onLine > 'u'
      ? !0
      : navigator.onLine;
  }
}
const ir = new Ia();
function Pa(n) {
  return Math.min(1e3 * 2 ** n, 3e4);
}
function lr(n) {
  return (n ?? 'online') === 'online' ? ir.isOnline() : !0;
}
class qo {
  constructor(e) {
    (this.revert = e == null ? void 0 : e.revert),
      (this.silent = e == null ? void 0 : e.silent);
  }
}
function Wt(n) {
  return n instanceof qo;
}
function Io(n) {
  let e = !1,
    t = 0,
    r = !1,
    i,
    s,
    o;
  const l = new Promise((v, b) => {
      (s = v), (o = b);
    }),
    a = (v) => {
      r || (d(new qo(v)), n.abort == null || n.abort());
    },
    u = () => {
      e = !0;
    },
    h = () => {
      e = !1;
    },
    c = () => !nr.isFocused() || (n.networkMode !== 'always' && !ir.isOnline()),
    f = (v) => {
      r ||
        ((r = !0),
        n.onSuccess == null || n.onSuccess(v),
        i == null || i(),
        s(v));
    },
    d = (v) => {
      r ||
        ((r = !0), n.onError == null || n.onError(v), i == null || i(), o(v));
    },
    _ = () =>
      new Promise((v) => {
        (i = (b) => {
          const E = r || !c();
          return E && v(b), E;
        }),
          n.onPause == null || n.onPause();
      }).then(() => {
        (i = void 0), r || n.onContinue == null || n.onContinue();
      }),
    p = () => {
      if (r) return;
      let v;
      try {
        v = n.fn();
      } catch (b) {
        v = Promise.reject(b);
      }
      Promise.resolve(v)
        .then(f)
        .catch((b) => {
          var E, k;
          if (r) return;
          const O = (E = n.retry) != null ? E : 3,
            I = (k = n.retryDelay) != null ? k : Pa,
            S = typeof I == 'function' ? I(t, b) : I,
            j =
              O === !0 ||
              (typeof O == 'number' && t < O) ||
              (typeof O == 'function' && O(t, b));
          if (e || !j) {
            d(b);
            return;
          }
          t++,
            n.onFail == null || n.onFail(t, b),
            Co(S)
              .then(() => {
                if (c()) return _();
              })
              .then(() => {
                e ? d(b) : p();
              });
        });
    };
  return (
    lr(n.networkMode) ? p() : _().then(p),
    {
      promise: l,
      cancel: a,
      continue: () => ((i == null ? void 0 : i()) ? l : Promise.resolve()),
      cancelRetry: u,
      continueRetry: h,
    }
  );
}
const Kr = console;
function Ra() {
  let n = [],
    e = 0,
    t = (h) => {
      h();
    },
    r = (h) => {
      h();
    };
  const i = (h) => {
      let c;
      e++;
      try {
        c = h();
      } finally {
        e--, e || l();
      }
      return c;
    },
    s = (h) => {
      e
        ? n.push(h)
        : In(() => {
            t(h);
          });
    },
    o =
      (h) =>
      (...c) => {
        s(() => {
          h(...c);
        });
      },
    l = () => {
      const h = n;
      (n = []),
        h.length &&
          In(() => {
            r(() => {
              h.forEach((c) => {
                t(c);
              });
            });
          });
    };
  return {
    batch: i,
    batchCalls: o,
    schedule: s,
    setNotifyFunction: (h) => {
      t = h;
    },
    setBatchNotifyFunction: (h) => {
      r = h;
    },
  };
}
const oe = Ra();
class Po {
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(),
      Rr(this.cacheTime) &&
        (this.gcTimeout = setTimeout(() => {
          this.optionalRemove();
        }, this.cacheTime));
  }
  updateCacheTime(e) {
    this.cacheTime = Math.max(
      this.cacheTime || 0,
      e ?? (Lt ? 1 / 0 : 5 * 60 * 1e3),
    );
  }
  clearGcTimeout() {
    this.gcTimeout && (clearTimeout(this.gcTimeout), (this.gcTimeout = void 0));
  }
}
class Aa extends Po {
  constructor(e) {
    super(),
      (this.abortSignalConsumed = !1),
      (this.defaultOptions = e.defaultOptions),
      this.setOptions(e.options),
      (this.observers = []),
      (this.cache = e.cache),
      (this.logger = e.logger || Kr),
      (this.queryKey = e.queryKey),
      (this.queryHash = e.queryHash),
      (this.initialState = e.state || Ta(this.options)),
      (this.state = this.initialState),
      this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  setOptions(e) {
    (this.options = { ...this.defaultOptions, ...e }),
      this.updateCacheTime(this.options.cacheTime);
  }
  optionalRemove() {
    !this.observers.length &&
      this.state.fetchStatus === 'idle' &&
      this.cache.remove(this);
  }
  setData(e, t) {
    const r = Tr(this.state.data, e, this.options);
    return (
      this.dispatch({
        data: r,
        type: 'success',
        dataUpdatedAt: t == null ? void 0 : t.updatedAt,
        manual: t == null ? void 0 : t.manual,
      }),
      r
    );
  }
  setState(e, t) {
    this.dispatch({ type: 'setState', state: e, setStateOptions: t });
  }
  cancel(e) {
    var t;
    const r = this.promise;
    return (
      (t = this.retryer) == null || t.cancel(e),
      r ? r.then(Re).catch(Re) : Promise.resolve()
    );
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(this.initialState);
  }
  isActive() {
    return this.observers.some((e) => e.options.enabled !== !1);
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }
  isStale() {
    return (
      this.state.isInvalidated ||
      !this.state.dataUpdatedAt ||
      this.observers.some((e) => e.getCurrentResult().isStale)
    );
  }
  isStaleByTime(e = 0) {
    return (
      this.state.isInvalidated ||
      !this.state.dataUpdatedAt ||
      !Eo(this.state.dataUpdatedAt, e)
    );
  }
  onFocus() {
    var e;
    const t = this.observers.find((r) => r.shouldFetchOnWindowFocus());
    t && t.refetch({ cancelRefetch: !1 }),
      (e = this.retryer) == null || e.continue();
  }
  onOnline() {
    var e;
    const t = this.observers.find((r) => r.shouldFetchOnReconnect());
    t && t.refetch({ cancelRefetch: !1 }),
      (e = this.retryer) == null || e.continue();
  }
  addObserver(e) {
    this.observers.includes(e) ||
      (this.observers.push(e),
      this.clearGcTimeout(),
      this.cache.notify({ type: 'observerAdded', query: this, observer: e }));
  }
  removeObserver(e) {
    this.observers.includes(e) &&
      ((this.observers = this.observers.filter((t) => t !== e)),
      this.observers.length ||
        (this.retryer &&
          (this.abortSignalConsumed
            ? this.retryer.cancel({ revert: !0 })
            : this.retryer.cancelRetry()),
        this.scheduleGc()),
      this.cache.notify({ type: 'observerRemoved', query: this, observer: e }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || this.dispatch({ type: 'invalidate' });
  }
  fetch(e, t) {
    var r, i;
    if (this.state.fetchStatus !== 'idle') {
      if (this.state.dataUpdatedAt && t != null && t.cancelRefetch)
        this.cancel({ silent: !0 });
      else if (this.promise) {
        var s;
        return (s = this.retryer) == null || s.continueRetry(), this.promise;
      }
    }
    if ((e && this.setOptions(e), !this.options.queryFn)) {
      const d = this.observers.find((_) => _.options.queryFn);
      d && this.setOptions(d.options);
    }
    Array.isArray(this.options.queryKey);
    const o = Ca(),
      l = { queryKey: this.queryKey, pageParam: void 0, meta: this.meta },
      a = (d) => {
        Object.defineProperty(d, 'signal', {
          enumerable: !0,
          get: () => {
            if (o) return (this.abortSignalConsumed = !0), o.signal;
          },
        });
      };
    a(l);
    const u = () =>
        this.options.queryFn
          ? ((this.abortSignalConsumed = !1), this.options.queryFn(l))
          : Promise.reject(
              "Missing queryFn for queryKey '" + this.options.queryHash + "'",
            ),
      h = {
        fetchOptions: t,
        options: this.options,
        queryKey: this.queryKey,
        state: this.state,
        fetchFn: u,
      };
    if (
      (a(h),
      (r = this.options.behavior) == null || r.onFetch(h),
      (this.revertState = this.state),
      this.state.fetchStatus === 'idle' ||
        this.state.fetchMeta !==
          ((i = h.fetchOptions) == null ? void 0 : i.meta))
    ) {
      var c;
      this.dispatch({
        type: 'fetch',
        meta: (c = h.fetchOptions) == null ? void 0 : c.meta,
      });
    }
    const f = (d) => {
      if (
        ((Wt(d) && d.silent) || this.dispatch({ type: 'error', error: d }),
        !Wt(d))
      ) {
        var _, p, v, b;
        (_ = (p = this.cache.config).onError) == null || _.call(p, d, this),
          (v = (b = this.cache.config).onSettled) == null ||
            v.call(b, this.state.data, d, this);
      }
      this.isFetchingOptimistic || this.scheduleGc(),
        (this.isFetchingOptimistic = !1);
    };
    return (
      (this.retryer = Io({
        fn: h.fetchFn,
        abort: o == null ? void 0 : o.abort.bind(o),
        onSuccess: (d) => {
          var _, p, v, b;
          if (typeof d > 'u') {
            f(new Error(this.queryHash + ' data is undefined'));
            return;
          }
          this.setData(d),
            (_ = (p = this.cache.config).onSuccess) == null ||
              _.call(p, d, this),
            (v = (b = this.cache.config).onSettled) == null ||
              v.call(b, d, this.state.error, this),
            this.isFetchingOptimistic || this.scheduleGc(),
            (this.isFetchingOptimistic = !1);
        },
        onError: f,
        onFail: (d, _) => {
          this.dispatch({ type: 'failed', failureCount: d, error: _ });
        },
        onPause: () => {
          this.dispatch({ type: 'pause' });
        },
        onContinue: () => {
          this.dispatch({ type: 'continue' });
        },
        retry: h.options.retry,
        retryDelay: h.options.retryDelay,
        networkMode: h.options.networkMode,
      })),
      (this.promise = this.retryer.promise),
      this.promise
    );
  }
  dispatch(e) {
    const t = (r) => {
      var i, s;
      switch (e.type) {
        case 'failed':
          return {
            ...r,
            fetchFailureCount: e.failureCount,
            fetchFailureReason: e.error,
          };
        case 'pause':
          return { ...r, fetchStatus: 'paused' };
        case 'continue':
          return { ...r, fetchStatus: 'fetching' };
        case 'fetch':
          return {
            ...r,
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchMeta: (i = e.meta) != null ? i : null,
            fetchStatus: lr(this.options.networkMode) ? 'fetching' : 'paused',
            ...(!r.dataUpdatedAt && { error: null, status: 'loading' }),
          };
        case 'success':
          return {
            ...r,
            data: e.data,
            dataUpdateCount: r.dataUpdateCount + 1,
            dataUpdatedAt: (s = e.dataUpdatedAt) != null ? s : Date.now(),
            error: null,
            isInvalidated: !1,
            status: 'success',
            ...(!e.manual && {
              fetchStatus: 'idle',
              fetchFailureCount: 0,
              fetchFailureReason: null,
            }),
          };
        case 'error':
          const o = e.error;
          return Wt(o) && o.revert && this.revertState
            ? { ...this.revertState }
            : {
                ...r,
                error: o,
                errorUpdateCount: r.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: r.fetchFailureCount + 1,
                fetchFailureReason: o,
                fetchStatus: 'idle',
                status: 'error',
              };
        case 'invalidate':
          return { ...r, isInvalidated: !0 };
        case 'setState':
          return { ...r, ...e.state };
      }
    };
    (this.state = t(this.state)),
      oe.batch(() => {
        this.observers.forEach((r) => {
          r.onQueryUpdate(e);
        }),
          this.cache.notify({ query: this, type: 'updated', action: e });
      });
  }
}
function Ta(n) {
  const e =
      typeof n.initialData == 'function' ? n.initialData() : n.initialData,
    t = typeof e < 'u',
    r = t
      ? typeof n.initialDataUpdatedAt == 'function'
        ? n.initialDataUpdatedAt()
        : n.initialDataUpdatedAt
      : 0;
  return {
    data: e,
    dataUpdateCount: 0,
    dataUpdatedAt: t ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: t ? 'success' : 'loading',
    fetchStatus: 'idle',
  };
}
class Ma extends Ht {
  constructor(e) {
    super(),
      (this.config = e || {}),
      (this.queries = []),
      (this.queriesMap = {});
  }
  build(e, t, r) {
    var i;
    const s = t.queryKey,
      o = (i = t.queryHash) != null ? i : Qr(s, t);
    let l = this.get(o);
    return (
      l ||
        ((l = new Aa({
          cache: this,
          logger: e.getLogger(),
          queryKey: s,
          queryHash: o,
          options: e.defaultQueryOptions(t),
          state: r,
          defaultOptions: e.getQueryDefaults(s),
        })),
        this.add(l)),
      l
    );
  }
  add(e) {
    this.queriesMap[e.queryHash] ||
      ((this.queriesMap[e.queryHash] = e),
      this.queries.push(e),
      this.notify({ type: 'added', query: e }));
  }
  remove(e) {
    const t = this.queriesMap[e.queryHash];
    t &&
      (e.destroy(),
      (this.queries = this.queries.filter((r) => r !== e)),
      t === e && delete this.queriesMap[e.queryHash],
      this.notify({ type: 'removed', query: e }));
  }
  clear() {
    oe.batch(() => {
      this.queries.forEach((e) => {
        this.remove(e);
      });
    });
  }
  get(e) {
    return this.queriesMap[e];
  }
  getAll() {
    return this.queries;
  }
  find(e, t) {
    const [r] = Be(e, t);
    return (
      typeof r.exact > 'u' && (r.exact = !0), this.queries.find((i) => En(r, i))
    );
  }
  findAll(e, t) {
    const [r] = Be(e, t);
    return Object.keys(r).length > 0
      ? this.queries.filter((i) => En(r, i))
      : this.queries;
  }
  notify(e) {
    oe.batch(() => {
      this.listeners.forEach(({ listener: t }) => {
        t(e);
      });
    });
  }
  onFocus() {
    oe.batch(() => {
      this.queries.forEach((e) => {
        e.onFocus();
      });
    });
  }
  onOnline() {
    oe.batch(() => {
      this.queries.forEach((e) => {
        e.onOnline();
      });
    });
  }
}
class ja extends Po {
  constructor(e) {
    super(),
      (this.defaultOptions = e.defaultOptions),
      (this.mutationId = e.mutationId),
      (this.mutationCache = e.mutationCache),
      (this.logger = e.logger || Kr),
      (this.observers = []),
      (this.state = e.state || Da()),
      this.setOptions(e.options),
      this.scheduleGc();
  }
  setOptions(e) {
    (this.options = { ...this.defaultOptions, ...e }),
      this.updateCacheTime(this.options.cacheTime);
  }
  get meta() {
    return this.options.meta;
  }
  setState(e) {
    this.dispatch({ type: 'setState', state: e });
  }
  addObserver(e) {
    this.observers.includes(e) ||
      (this.observers.push(e),
      this.clearGcTimeout(),
      this.mutationCache.notify({
        type: 'observerAdded',
        mutation: this,
        observer: e,
      }));
  }
  removeObserver(e) {
    (this.observers = this.observers.filter((t) => t !== e)),
      this.scheduleGc(),
      this.mutationCache.notify({
        type: 'observerRemoved',
        mutation: this,
        observer: e,
      });
  }
  optionalRemove() {
    this.observers.length ||
      (this.state.status === 'loading'
        ? this.scheduleGc()
        : this.mutationCache.remove(this));
  }
  continue() {
    var e, t;
    return (e = (t = this.retryer) == null ? void 0 : t.continue()) != null
      ? e
      : this.execute();
  }
  async execute() {
    const e = () => {
        var j;
        return (
          (this.retryer = Io({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(this.state.variables)
                : Promise.reject('No mutationFn found'),
            onFail: (M, P) => {
              this.dispatch({ type: 'failed', failureCount: M, error: P });
            },
            onPause: () => {
              this.dispatch({ type: 'pause' });
            },
            onContinue: () => {
              this.dispatch({ type: 'continue' });
            },
            retry: (j = this.options.retry) != null ? j : 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
          })),
          this.retryer.promise
        );
      },
      t = this.state.status === 'loading';
    try {
      var r, i, s, o, l, a, u, h;
      if (!t) {
        var c, f, d, _;
        this.dispatch({ type: 'loading', variables: this.options.variables }),
          await ((c = (f = this.mutationCache.config).onMutate) == null
            ? void 0
            : c.call(f, this.state.variables, this));
        const M = await ((d = (_ = this.options).onMutate) == null
          ? void 0
          : d.call(_, this.state.variables));
        M !== this.state.context &&
          this.dispatch({
            type: 'loading',
            context: M,
            variables: this.state.variables,
          });
      }
      const j = await e();
      return (
        await ((r = (i = this.mutationCache.config).onSuccess) == null
          ? void 0
          : r.call(i, j, this.state.variables, this.state.context, this)),
        await ((s = (o = this.options).onSuccess) == null
          ? void 0
          : s.call(o, j, this.state.variables, this.state.context)),
        await ((l = (a = this.mutationCache.config).onSettled) == null
          ? void 0
          : l.call(a, j, null, this.state.variables, this.state.context, this)),
        await ((u = (h = this.options).onSettled) == null
          ? void 0
          : u.call(h, j, null, this.state.variables, this.state.context)),
        this.dispatch({ type: 'success', data: j }),
        j
      );
    } catch (j) {
      try {
        var p, v, b, E, k, O, I, S;
        throw (
          (await ((p = (v = this.mutationCache.config).onError) == null
            ? void 0
            : p.call(v, j, this.state.variables, this.state.context, this)),
          await ((b = (E = this.options).onError) == null
            ? void 0
            : b.call(E, j, this.state.variables, this.state.context)),
          await ((k = (O = this.mutationCache.config).onSettled) == null
            ? void 0
            : k.call(
                O,
                void 0,
                j,
                this.state.variables,
                this.state.context,
                this,
              )),
          await ((I = (S = this.options).onSettled) == null
            ? void 0
            : I.call(S, void 0, j, this.state.variables, this.state.context)),
          j)
        );
      } finally {
        this.dispatch({ type: 'error', error: j });
      }
    }
  }
  dispatch(e) {
    const t = (r) => {
      switch (e.type) {
        case 'failed':
          return { ...r, failureCount: e.failureCount, failureReason: e.error };
        case 'pause':
          return { ...r, isPaused: !0 };
        case 'continue':
          return { ...r, isPaused: !1 };
        case 'loading':
          return {
            ...r,
            context: e.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: !lr(this.options.networkMode),
            status: 'loading',
            variables: e.variables,
          };
        case 'success':
          return {
            ...r,
            data: e.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: 'success',
            isPaused: !1,
          };
        case 'error':
          return {
            ...r,
            data: void 0,
            error: e.error,
            failureCount: r.failureCount + 1,
            failureReason: e.error,
            isPaused: !1,
            status: 'error',
          };
        case 'setState':
          return { ...r, ...e.state };
      }
    };
    (this.state = t(this.state)),
      oe.batch(() => {
        this.observers.forEach((r) => {
          r.onMutationUpdate(e);
        }),
          this.mutationCache.notify({
            mutation: this,
            type: 'updated',
            action: e,
          });
      });
  }
}
function Da() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: 'idle',
    variables: void 0,
  };
}
class Fa extends Ht {
  constructor(e) {
    super(),
      (this.config = e || {}),
      (this.mutations = []),
      (this.mutationId = 0);
  }
  build(e, t, r) {
    const i = new ja({
      mutationCache: this,
      logger: e.getLogger(),
      mutationId: ++this.mutationId,
      options: e.defaultMutationOptions(t),
      state: r,
      defaultOptions: t.mutationKey
        ? e.getMutationDefaults(t.mutationKey)
        : void 0,
    });
    return this.add(i), i;
  }
  add(e) {
    this.mutations.push(e), this.notify({ type: 'added', mutation: e });
  }
  remove(e) {
    (this.mutations = this.mutations.filter((t) => t !== e)),
      this.notify({ type: 'removed', mutation: e });
  }
  clear() {
    oe.batch(() => {
      this.mutations.forEach((e) => {
        this.remove(e);
      });
    });
  }
  getAll() {
    return this.mutations;
  }
  find(e) {
    return (
      typeof e.exact > 'u' && (e.exact = !0),
      this.mutations.find((t) => Sn(e, t))
    );
  }
  findAll(e) {
    return this.mutations.filter((t) => Sn(e, t));
  }
  notify(e) {
    oe.batch(() => {
      this.listeners.forEach(({ listener: t }) => {
        t(e);
      });
    });
  }
  resumePausedMutations() {
    var e;
    return (
      (this.resuming = ((e = this.resuming) != null ? e : Promise.resolve())
        .then(() => {
          const t = this.mutations.filter((r) => r.state.isPaused);
          return oe.batch(() =>
            t.reduce(
              (r, i) => r.then(() => i.continue().catch(Re)),
              Promise.resolve(),
            ),
          );
        })
        .then(() => {
          this.resuming = void 0;
        })),
      this.resuming
    );
  }
}
function La() {
  return {
    onFetch: (n) => {
      n.fetchFn = () => {
        var e, t, r, i, s, o;
        const l =
            (e = n.fetchOptions) == null || (t = e.meta) == null
              ? void 0
              : t.refetchPage,
          a =
            (r = n.fetchOptions) == null || (i = r.meta) == null
              ? void 0
              : i.fetchMore,
          u = a == null ? void 0 : a.pageParam,
          h = (a == null ? void 0 : a.direction) === 'forward',
          c = (a == null ? void 0 : a.direction) === 'backward',
          f = ((s = n.state.data) == null ? void 0 : s.pages) || [],
          d = ((o = n.state.data) == null ? void 0 : o.pageParams) || [];
        let _ = d,
          p = !1;
        const v = (S) => {
            Object.defineProperty(S, 'signal', {
              enumerable: !0,
              get: () => {
                var j;
                if ((j = n.signal) != null && j.aborted) p = !0;
                else {
                  var M;
                  (M = n.signal) == null ||
                    M.addEventListener('abort', () => {
                      p = !0;
                    });
                }
                return n.signal;
              },
            });
          },
          b =
            n.options.queryFn ||
            (() =>
              Promise.reject(
                "Missing queryFn for queryKey '" + n.options.queryHash + "'",
              )),
          E = (S, j, M, P) => (
            (_ = P ? [j, ..._] : [..._, j]), P ? [M, ...S] : [...S, M]
          ),
          k = (S, j, M, P) => {
            if (p) return Promise.reject('Cancelled');
            if (typeof M > 'u' && !j && S.length) return Promise.resolve(S);
            const F = {
              queryKey: n.queryKey,
              pageParam: M,
              meta: n.options.meta,
            };
            v(F);
            const z = b(F);
            return Promise.resolve(z).then((W) => E(S, M, W, P));
          };
        let O;
        if (!f.length) O = k([]);
        else if (h) {
          const S = typeof u < 'u',
            j = S ? u : Rn(n.options, f);
          O = k(f, S, j);
        } else if (c) {
          const S = typeof u < 'u',
            j = S ? u : Na(n.options, f);
          O = k(f, S, j, !0);
        } else {
          _ = [];
          const S = typeof n.options.getNextPageParam > 'u';
          O = (l && f[0] ? l(f[0], 0, f) : !0)
            ? k([], S, d[0])
            : Promise.resolve(E([], d[0], f[0]));
          for (let M = 1; M < f.length; M++)
            O = O.then((P) => {
              if (l && f[M] ? l(f[M], M, f) : !0) {
                const z = S ? d[M] : Rn(n.options, P);
                return k(P, S, z);
              }
              return Promise.resolve(E(P, d[M], f[M]));
            });
        }
        return O.then((S) => ({ pages: S, pageParams: _ }));
      };
    },
  };
}
function Rn(n, e) {
  return n.getNextPageParam == null
    ? void 0
    : n.getNextPageParam(e[e.length - 1], e);
}
function Na(n, e) {
  return n.getPreviousPageParam == null
    ? void 0
    : n.getPreviousPageParam(e[0], e);
}
class Ro {
  constructor(e = {}) {
    (this.queryCache = e.queryCache || new Ma()),
      (this.mutationCache = e.mutationCache || new Fa()),
      (this.logger = e.logger || Kr),
      (this.defaultOptions = e.defaultOptions || {}),
      (this.queryDefaults = []),
      (this.mutationDefaults = []),
      (this.mountCount = 0);
  }
  mount() {
    this.mountCount++,
      this.mountCount === 1 &&
        ((this.unsubscribeFocus = nr.subscribe(() => {
          nr.isFocused() &&
            (this.resumePausedMutations(), this.queryCache.onFocus());
        })),
        (this.unsubscribeOnline = ir.subscribe(() => {
          ir.isOnline() &&
            (this.resumePausedMutations(), this.queryCache.onOnline());
        })));
  }
  unmount() {
    var e, t;
    this.mountCount--,
      this.mountCount === 0 &&
        ((e = this.unsubscribeFocus) == null || e.call(this),
        (this.unsubscribeFocus = void 0),
        (t = this.unsubscribeOnline) == null || t.call(this),
        (this.unsubscribeOnline = void 0));
  }
  isFetching(e, t) {
    const [r] = Be(e, t);
    return (r.fetchStatus = 'fetching'), this.queryCache.findAll(r).length;
  }
  isMutating(e) {
    return this.mutationCache.findAll({ ...e, fetching: !0 }).length;
  }
  getQueryData(e, t) {
    var r;
    return (r = this.queryCache.find(e, t)) == null ? void 0 : r.state.data;
  }
  ensureQueryData(e, t, r) {
    const i = jt(e, t, r),
      s = this.getQueryData(i.queryKey);
    return s ? Promise.resolve(s) : this.fetchQuery(i);
  }
  getQueriesData(e) {
    return this.getQueryCache()
      .findAll(e)
      .map(({ queryKey: t, state: r }) => {
        const i = r.data;
        return [t, i];
      });
  }
  setQueryData(e, t, r) {
    const i = this.queryCache.find(e),
      s = i == null ? void 0 : i.state.data,
      o = wa(t, s);
    if (typeof o > 'u') return;
    const l = jt(e),
      a = this.defaultQueryOptions(l);
    return this.queryCache.build(this, a).setData(o, { ...r, manual: !0 });
  }
  setQueriesData(e, t, r) {
    return oe.batch(() =>
      this.getQueryCache()
        .findAll(e)
        .map(({ queryKey: i }) => [i, this.setQueryData(i, t, r)]),
    );
  }
  getQueryState(e, t) {
    var r;
    return (r = this.queryCache.find(e, t)) == null ? void 0 : r.state;
  }
  removeQueries(e, t) {
    const [r] = Be(e, t),
      i = this.queryCache;
    oe.batch(() => {
      i.findAll(r).forEach((s) => {
        i.remove(s);
      });
    });
  }
  resetQueries(e, t, r) {
    const [i, s] = Be(e, t, r),
      o = this.queryCache,
      l = { type: 'active', ...i };
    return oe.batch(
      () => (
        o.findAll(i).forEach((a) => {
          a.reset();
        }),
        this.refetchQueries(l, s)
      ),
    );
  }
  cancelQueries(e, t, r) {
    const [i, s = {}] = Be(e, t, r);
    typeof s.revert > 'u' && (s.revert = !0);
    const o = oe.batch(() =>
      this.queryCache.findAll(i).map((l) => l.cancel(s)),
    );
    return Promise.all(o).then(Re).catch(Re);
  }
  invalidateQueries(e, t, r) {
    const [i, s] = Be(e, t, r);
    return oe.batch(() => {
      var o, l;
      if (
        (this.queryCache.findAll(i).forEach((u) => {
          u.invalidate();
        }),
        i.refetchType === 'none')
      )
        return Promise.resolve();
      const a = {
        ...i,
        type:
          (o = (l = i.refetchType) != null ? l : i.type) != null ? o : 'active',
      };
      return this.refetchQueries(a, s);
    });
  }
  refetchQueries(e, t, r) {
    const [i, s] = Be(e, t, r),
      o = oe.batch(() =>
        this.queryCache
          .findAll(i)
          .filter((a) => !a.isDisabled())
          .map((a) => {
            var u;
            return a.fetch(void 0, {
              ...s,
              cancelRefetch:
                (u = s == null ? void 0 : s.cancelRefetch) != null ? u : !0,
              meta: { refetchPage: i.refetchPage },
            });
          }),
      );
    let l = Promise.all(o).then(Re);
    return (s != null && s.throwOnError) || (l = l.catch(Re)), l;
  }
  fetchQuery(e, t, r) {
    const i = jt(e, t, r),
      s = this.defaultQueryOptions(i);
    typeof s.retry > 'u' && (s.retry = !1);
    const o = this.queryCache.build(this, s);
    return o.isStaleByTime(s.staleTime)
      ? o.fetch(s)
      : Promise.resolve(o.state.data);
  }
  prefetchQuery(e, t, r) {
    return this.fetchQuery(e, t, r).then(Re).catch(Re);
  }
  fetchInfiniteQuery(e, t, r) {
    const i = jt(e, t, r);
    return (i.behavior = La()), this.fetchQuery(i);
  }
  prefetchInfiniteQuery(e, t, r) {
    return this.fetchInfiniteQuery(e, t, r).then(Re).catch(Re);
  }
  resumePausedMutations() {
    return this.mutationCache.resumePausedMutations();
  }
  getQueryCache() {
    return this.queryCache;
  }
  getMutationCache() {
    return this.mutationCache;
  }
  getLogger() {
    return this.logger;
  }
  getDefaultOptions() {
    return this.defaultOptions;
  }
  setDefaultOptions(e) {
    this.defaultOptions = e;
  }
  setQueryDefaults(e, t) {
    const r = this.queryDefaults.find((i) => xe(e) === xe(i.queryKey));
    r
      ? (r.defaultOptions = t)
      : this.queryDefaults.push({ queryKey: e, defaultOptions: t });
  }
  getQueryDefaults(e) {
    if (!e) return;
    const t = this.queryDefaults.find((r) => rr(e, r.queryKey));
    return t == null ? void 0 : t.defaultOptions;
  }
  setMutationDefaults(e, t) {
    const r = this.mutationDefaults.find((i) => xe(e) === xe(i.mutationKey));
    r
      ? (r.defaultOptions = t)
      : this.mutationDefaults.push({ mutationKey: e, defaultOptions: t });
  }
  getMutationDefaults(e) {
    if (!e) return;
    const t = this.mutationDefaults.find((r) => rr(e, r.mutationKey));
    return t == null ? void 0 : t.defaultOptions;
  }
  defaultQueryOptions(e) {
    if (e != null && e._defaulted) return e;
    const t = {
      ...this.defaultOptions.queries,
      ...this.getQueryDefaults(e == null ? void 0 : e.queryKey),
      ...e,
      _defaulted: !0,
    };
    return (
      !t.queryHash && t.queryKey && (t.queryHash = Qr(t.queryKey, t)),
      typeof t.refetchOnReconnect > 'u' &&
        (t.refetchOnReconnect = t.networkMode !== 'always'),
      typeof t.useErrorBoundary > 'u' && (t.useErrorBoundary = !!t.suspense),
      t
    );
  }
  defaultMutationOptions(e) {
    return e != null && e._defaulted
      ? e
      : {
          ...this.defaultOptions.mutations,
          ...this.getMutationDefaults(e == null ? void 0 : e.mutationKey),
          ...e,
          _defaulted: !0,
        };
  }
  clear() {
    this.queryCache.clear(), this.mutationCache.clear();
  }
}
class Ha extends Ht {
  constructor(e, t) {
    super(),
      (this.client = e),
      (this.options = t),
      (this.trackedProps = new Set()),
      (this.selectError = null),
      this.bindMethods(),
      this.setOptions(t);
  }
  bindMethods() {
    (this.remove = this.remove.bind(this)),
      (this.refetch = this.refetch.bind(this));
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.currentQuery.addObserver(this),
      An(this.currentQuery, this.options) && this.executeFetch(),
      this.updateTimers());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Mr(this.currentQuery, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return Mr(
      this.currentQuery,
      this.options,
      this.options.refetchOnWindowFocus,
    );
  }
  destroy() {
    (this.listeners = new Set()),
      this.clearStaleTimeout(),
      this.clearRefetchInterval(),
      this.currentQuery.removeObserver(this);
  }
  setOptions(e, t) {
    const r = this.options,
      i = this.currentQuery;
    if (
      ((this.options = this.client.defaultQueryOptions(e)),
      wn(r, this.options) ||
        this.client
          .getQueryCache()
          .notify({
            type: 'observerOptionsUpdated',
            query: this.currentQuery,
            observer: this,
          }),
      typeof this.options.enabled < 'u' &&
        typeof this.options.enabled != 'boolean')
    )
      throw new Error('Expected enabled to be a boolean');
    this.options.queryKey || (this.options.queryKey = r.queryKey),
      this.updateQuery();
    const s = this.hasListeners();
    s && Tn(this.currentQuery, i, this.options, r) && this.executeFetch(),
      this.updateResult(t),
      s &&
        (this.currentQuery !== i ||
          this.options.enabled !== r.enabled ||
          this.options.staleTime !== r.staleTime) &&
        this.updateStaleTimeout();
    const o = this.computeRefetchInterval();
    s &&
      (this.currentQuery !== i ||
        this.options.enabled !== r.enabled ||
        o !== this.currentRefetchInterval) &&
      this.updateRefetchInterval(o);
  }
  getOptimisticResult(e) {
    const t = this.client.getQueryCache().build(this.client, e);
    return this.createResult(t, e);
  }
  getCurrentResult() {
    return this.currentResult;
  }
  trackResult(e) {
    const t = {};
    return (
      Object.keys(e).forEach((r) => {
        Object.defineProperty(t, r, {
          configurable: !1,
          enumerable: !0,
          get: () => (this.trackedProps.add(r), e[r]),
        });
      }),
      t
    );
  }
  getCurrentQuery() {
    return this.currentQuery;
  }
  remove() {
    this.client.getQueryCache().remove(this.currentQuery);
  }
  refetch({ refetchPage: e, ...t } = {}) {
    return this.fetch({ ...t, meta: { refetchPage: e } });
  }
  fetchOptimistic(e) {
    const t = this.client.defaultQueryOptions(e),
      r = this.client.getQueryCache().build(this.client, t);
    return (
      (r.isFetchingOptimistic = !0),
      r.fetch().then(() => this.createResult(r, t))
    );
  }
  fetch(e) {
    var t;
    return this.executeFetch({
      ...e,
      cancelRefetch: (t = e.cancelRefetch) != null ? t : !0,
    }).then(() => (this.updateResult(), this.currentResult));
  }
  executeFetch(e) {
    this.updateQuery();
    let t = this.currentQuery.fetch(this.options, e);
    return (e != null && e.throwOnError) || (t = t.catch(Re)), t;
  }
  updateStaleTimeout() {
    if (
      (this.clearStaleTimeout(),
      Lt || this.currentResult.isStale || !Rr(this.options.staleTime))
    )
      return;
    const t = Eo(this.currentResult.dataUpdatedAt, this.options.staleTime) + 1;
    this.staleTimeoutId = setTimeout(() => {
      this.currentResult.isStale || this.updateResult();
    }, t);
  }
  computeRefetchInterval() {
    var e;
    return typeof this.options.refetchInterval == 'function'
      ? this.options.refetchInterval(this.currentResult.data, this.currentQuery)
      : (e = this.options.refetchInterval) != null
      ? e
      : !1;
  }
  updateRefetchInterval(e) {
    this.clearRefetchInterval(),
      (this.currentRefetchInterval = e),
      !(
        Lt ||
        this.options.enabled === !1 ||
        !Rr(this.currentRefetchInterval) ||
        this.currentRefetchInterval === 0
      ) &&
        (this.refetchIntervalId = setInterval(() => {
          (this.options.refetchIntervalInBackground || nr.isFocused()) &&
            this.executeFetch();
        }, this.currentRefetchInterval));
  }
  updateTimers() {
    this.updateStaleTimeout(),
      this.updateRefetchInterval(this.computeRefetchInterval());
  }
  clearStaleTimeout() {
    this.staleTimeoutId &&
      (clearTimeout(this.staleTimeoutId), (this.staleTimeoutId = void 0));
  }
  clearRefetchInterval() {
    this.refetchIntervalId &&
      (clearInterval(this.refetchIntervalId),
      (this.refetchIntervalId = void 0));
  }
  createResult(e, t) {
    const r = this.currentQuery,
      i = this.options,
      s = this.currentResult,
      o = this.currentResultState,
      l = this.currentResultOptions,
      a = e !== r,
      u = a ? e.state : this.currentQueryInitialState,
      h = a ? this.currentResult : this.previousQueryResult,
      { state: c } = e;
    let {
        dataUpdatedAt: f,
        error: d,
        errorUpdatedAt: _,
        fetchStatus: p,
        status: v,
      } = c,
      b = !1,
      E = !1,
      k;
    if (t._optimisticResults) {
      const M = this.hasListeners(),
        P = !M && An(e, t),
        F = M && Tn(e, r, t, i);
      (P || F) &&
        ((p = lr(e.options.networkMode) ? 'fetching' : 'paused'),
        f || (v = 'loading')),
        t._optimisticResults === 'isRestoring' && (p = 'idle');
    }
    if (
      t.keepPreviousData &&
      !c.dataUpdatedAt &&
      h != null &&
      h.isSuccess &&
      v !== 'error'
    )
      (k = h.data), (f = h.dataUpdatedAt), (v = h.status), (b = !0);
    else if (t.select && typeof c.data < 'u')
      if (
        s &&
        c.data === (o == null ? void 0 : o.data) &&
        t.select === this.selectFn
      )
        k = this.selectResult;
      else
        try {
          (this.selectFn = t.select),
            (k = t.select(c.data)),
            (k = Tr(s == null ? void 0 : s.data, k, t)),
            (this.selectResult = k),
            (this.selectError = null);
        } catch (M) {
          this.selectError = M;
        }
    else k = c.data;
    if (typeof t.placeholderData < 'u' && typeof k > 'u' && v === 'loading') {
      let M;
      if (
        s != null &&
        s.isPlaceholderData &&
        t.placeholderData === (l == null ? void 0 : l.placeholderData)
      )
        M = s.data;
      else if (
        ((M =
          typeof t.placeholderData == 'function'
            ? t.placeholderData()
            : t.placeholderData),
        t.select && typeof M < 'u')
      )
        try {
          (M = t.select(M)), (this.selectError = null);
        } catch (P) {
          this.selectError = P;
        }
      typeof M < 'u' &&
        ((v = 'success'),
        (k = Tr(s == null ? void 0 : s.data, M, t)),
        (E = !0));
    }
    this.selectError &&
      ((d = this.selectError),
      (k = this.selectResult),
      (_ = Date.now()),
      (v = 'error'));
    const O = p === 'fetching',
      I = v === 'loading',
      S = v === 'error';
    return {
      status: v,
      fetchStatus: p,
      isLoading: I,
      isSuccess: v === 'success',
      isError: S,
      isInitialLoading: I && O,
      data: k,
      dataUpdatedAt: f,
      error: d,
      errorUpdatedAt: _,
      failureCount: c.fetchFailureCount,
      failureReason: c.fetchFailureReason,
      errorUpdateCount: c.errorUpdateCount,
      isFetched: c.dataUpdateCount > 0 || c.errorUpdateCount > 0,
      isFetchedAfterMount:
        c.dataUpdateCount > u.dataUpdateCount ||
        c.errorUpdateCount > u.errorUpdateCount,
      isFetching: O,
      isRefetching: O && !I,
      isLoadingError: S && c.dataUpdatedAt === 0,
      isPaused: p === 'paused',
      isPlaceholderData: E,
      isPreviousData: b,
      isRefetchError: S && c.dataUpdatedAt !== 0,
      isStale: Vr(e, t),
      refetch: this.refetch,
      remove: this.remove,
    };
  }
  updateResult(e) {
    const t = this.currentResult,
      r = this.createResult(this.currentQuery, this.options);
    if (
      ((this.currentResultState = this.currentQuery.state),
      (this.currentResultOptions = this.options),
      wn(r, t))
    )
      return;
    this.currentResult = r;
    const i = { cache: !0 },
      s = () => {
        if (!t) return !0;
        const { notifyOnChangeProps: o } = this.options;
        if (o === 'all' || (!o && !this.trackedProps.size)) return !0;
        const l = new Set(o ?? this.trackedProps);
        return (
          this.options.useErrorBoundary && l.add('error'),
          Object.keys(this.currentResult).some((a) => {
            const u = a;
            return this.currentResult[u] !== t[u] && l.has(u);
          })
        );
      };
    (e == null ? void 0 : e.listeners) !== !1 && s() && (i.listeners = !0),
      this.notify({ ...i, ...e });
  }
  updateQuery() {
    const e = this.client.getQueryCache().build(this.client, this.options);
    if (e === this.currentQuery) return;
    const t = this.currentQuery;
    (this.currentQuery = e),
      (this.currentQueryInitialState = e.state),
      (this.previousQueryResult = this.currentResult),
      this.hasListeners() &&
        (t == null || t.removeObserver(this), e.addObserver(this));
  }
  onQueryUpdate(e) {
    const t = {};
    e.type === 'success'
      ? (t.onSuccess = !e.manual)
      : e.type === 'error' && !Wt(e.error) && (t.onError = !0),
      this.updateResult(t),
      this.hasListeners() && this.updateTimers();
  }
  notify(e) {
    oe.batch(() => {
      if (e.onSuccess) {
        var t, r, i, s;
        (t = (r = this.options).onSuccess) == null ||
          t.call(r, this.currentResult.data),
          (i = (s = this.options).onSettled) == null ||
            i.call(s, this.currentResult.data, null);
      } else if (e.onError) {
        var o, l, a, u;
        (o = (l = this.options).onError) == null ||
          o.call(l, this.currentResult.error),
          (a = (u = this.options).onSettled) == null ||
            a.call(u, void 0, this.currentResult.error);
      }
      e.listeners &&
        this.listeners.forEach(({ listener: h }) => {
          h(this.currentResult);
        }),
        e.cache &&
          this.client
            .getQueryCache()
            .notify({
              query: this.currentQuery,
              type: 'observerResultsUpdated',
            });
    });
  }
}
function Ua(n, e) {
  return (
    e.enabled !== !1 &&
    !n.state.dataUpdatedAt &&
    !(n.state.status === 'error' && e.retryOnMount === !1)
  );
}
function An(n, e) {
  return Ua(n, e) || (n.state.dataUpdatedAt > 0 && Mr(n, e, e.refetchOnMount));
}
function Mr(n, e, t) {
  if (e.enabled !== !1) {
    const r = typeof t == 'function' ? t(n) : t;
    return r === 'always' || (r !== !1 && Vr(n, e));
  }
  return !1;
}
function Tn(n, e, t, r) {
  return (
    t.enabled !== !1 &&
    (n !== e || r.enabled === !1) &&
    (!t.suspense || n.state.status !== 'error') &&
    Vr(n, t)
  );
}
function Vr(n, e) {
  return n.isStaleByTime(e.staleTime);
}
const Ao = '$$_queryClient',
  Ba = () => {
    const n = Ze(Ao);
    if (!n)
      throw new Error(
        'No QueryClient was found in Svelte context. Did you forget to wrap your component with QueryClientProvider?',
      );
    return n;
  },
  Qa = (n) => {
    Xe(Ao, n);
  };
function To() {
  return Ba();
}
function Ka(n, e) {
  const t = To(),
    r = t.defaultQueryOptions(n);
  r._optimisticResults = 'optimistic';
  let i = new e(t, r);
  r.onError && (r.onError = oe.batchCalls(r.onError)),
    r.onSuccess && (r.onSuccess = oe.batchCalls(r.onSuccess)),
    r.onSettled && (r.onSettled = oe.batchCalls(r.onSettled)),
    Dt(i).subscribe((l) => {
      (i = l), i.setOptions(r, { listeners: !1 });
    });
  const s = Dt(i.getCurrentResult(), (l) => i.subscribe(oe.batchCalls(l))),
    { subscribe: o } = Jt(
      s,
      (l) => (
        (l = i.getOptimisticResult(r)),
        r.notifyOnChangeProps ? l : i.trackResult(l)
      ),
    );
  return { subscribe: o };
}
function Va(n, e, t) {
  const r = jt(n, e, t);
  return Ka(r, Ha);
}
function Ga(n) {
  let e;
  const t = n[2].default,
    r = fe(t, n, n[1], null);
  return {
    c() {
      r && r.c();
    },
    l(i) {
      r && r.l(i);
    },
    m(i, s) {
      r && r.m(i, s), (e = !0);
    },
    p(i, [s]) {
      r &&
        r.p &&
        (!e || s & 2) &&
        he(r, t, i, i[1], e ? _e(t, i[1], s, null) : de(i[1]), null);
    },
    i(i) {
      e || (D(r, i), (e = !0));
    },
    o(i) {
      U(r, i), (e = !1);
    },
    d(i) {
      r && r.d(i);
    },
  };
}
function za(n, e, t) {
  let { $$slots: r = {}, $$scope: i } = e,
    { client: s = new Ro() } = e;
  return (
    Xo(() => {
      s.mount();
    }),
    Qa(s),
    Yi(() => {
      s.unmount();
    }),
    (n.$$set = (o) => {
      'client' in o && t(0, (s = o.client)),
        '$$scope' in o && t(1, (i = o.$$scope));
    }),
    [s, i, r]
  );
}
class Ja extends Ce {
  constructor(e) {
    super(), qe(this, e, za, Ga, Se, { client: 0 });
  }
}
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */ function Mo({
  rxNostr: n,
  queryKey: e,
  filters: t,
  operator: r,
  req: i,
  initData: s,
}) {
  const o = To();
  if (n.getRelays().length === 0)
    return (
      o.setQueryData(e, s), { data: Dt(s), status: Dt('success'), error: Dt() }
    );
  let l;
  i ? (i.emit(t), (l = i)) : (l = xo({ filters: t }));
  const a = it('loading'),
    u = it(void 0),
    h = n.use(l).pipe(r),
    c = Va(
      e,
      () =>
        new Promise((f, d) => {
          let _ = !1;
          h.subscribe({
            next: (p) => {
              _ ? o.setQueryData(e, p) : (f(p), (_ = !0));
            },
            complete: () => a.set('success'),
            error: (p) => {
              console.error(p), a.set('error'), u.set(p), _ || (d(p), (_ = !0));
            },
          });
        }),
    );
  return {
    data: Jt(c, (f) => f.data, s),
    status: Jt([c, a], ([f, d]) =>
      f.isSuccess ? 'success' : f.isError ? 'error' : d,
    ),
    error: Jt([c, u], ([f, d]) => (f.isError ? f.error : d)),
  };
}
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */ function Wa({ rxNostr: n, relays: e }) {
  if (e.length === 0) return go([[]]);
  const t = e.map((r) => {
    const i = typeof r == 'string' ? r : r.url,
      s = n.hasRelay(i) ? n.getRelayState(i) : 'not-started';
    return { from: i, state: s };
  });
  return n.createConnectionStateObservable().pipe(
    ma(...t),
    Sa(({ from: r }) => r),
  );
}
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */ function Ya(n, e, t, r, i) {
  const s = [{ kinds: [r], authors: [t], limit: 1 }],
    o = sr(es(r), ka(t), xi(), $o());
  return Mo({ rxNostr: n, queryKey: e, filters: s, operator: o, req: i });
}
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */ function Xa(n, e, t, r) {
  const i = [{ ids: [t], limit: 1 }],
    s = sr(ga(t), ts(), xi());
  return Mo({ rxNostr: n, queryKey: e, filters: i, operator: s, req: r });
}
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */ function Za(n, e, t, r) {
  return Ya(n, e, t, rs.Kind.Metadata, r);
}
const xa = (n) => ({ metadata: n & 16, status: n & 32 }),
  Mn = (n) => {
    var e;
    return { metadata: (e = n[4]) == null ? void 0 : e.event, status: n[5] };
  },
  $a = (n) => ({ metadata: n & 16, status: n & 32 }),
  jn = (n) => {
    var e;
    return { metadata: (e = n[4]) == null ? void 0 : e.event, status: n[5] };
  },
  el = (n) => ({ metadata: n & 16, status: n & 32 }),
  Dn = (n) => {
    var e;
    return { metadata: (e = n[4]) == null ? void 0 : e.event, status: n[5] };
  },
  tl = (n) => ({ error: n & 8, metadata: n & 16, status: n & 32 }),
  Fn = (n) => {
    var e;
    return {
      error: n[3],
      metadata: (e = n[4]) == null ? void 0 : e.event,
      status: n[5],
    };
  };
function rl(n) {
  let e;
  const t = n[12].nodata,
    r = fe(t, n, n[11], Mn);
  return {
    c() {
      r && r.c();
    },
    l(i) {
      r && r.l(i);
    },
    m(i, s) {
      r && r.m(i, s), (e = !0);
    },
    p(i, s) {
      r &&
        r.p &&
        (!e || s & 2096) &&
        he(r, t, i, i[11], e ? _e(t, i[11], s, xa) : de(i[11]), Mn);
    },
    i(i) {
      e || (D(r, i), (e = !0));
    },
    o(i) {
      U(r, i), (e = !1);
    },
    d(i) {
      r && r.d(i);
    },
  };
}
function nl(n) {
  let e;
  const t = n[12].loading,
    r = fe(t, n, n[11], jn);
  return {
    c() {
      r && r.c();
    },
    l(i) {
      r && r.l(i);
    },
    m(i, s) {
      r && r.m(i, s), (e = !0);
    },
    p(i, s) {
      r &&
        r.p &&
        (!e || s & 2096) &&
        he(r, t, i, i[11], e ? _e(t, i[11], s, $a) : de(i[11]), jn);
    },
    i(i) {
      e || (D(r, i), (e = !0));
    },
    o(i) {
      U(r, i), (e = !1);
    },
    d(i) {
      r && r.d(i);
    },
  };
}
function il(n) {
  let e;
  const t = n[12].default,
    r = fe(t, n, n[11], Dn);
  return {
    c() {
      r && r.c();
    },
    l(i) {
      r && r.l(i);
    },
    m(i, s) {
      r && r.m(i, s), (e = !0);
    },
    p(i, s) {
      r &&
        r.p &&
        (!e || s & 2096) &&
        he(r, t, i, i[11], e ? _e(t, i[11], s, el) : de(i[11]), Dn);
    },
    i(i) {
      e || (D(r, i), (e = !0));
    },
    o(i) {
      U(r, i), (e = !1);
    },
    d(i) {
      r && r.d(i);
    },
  };
}
function ol(n) {
  let e;
  const t = n[12].error,
    r = fe(t, n, n[11], Fn);
  return {
    c() {
      r && r.c();
    },
    l(i) {
      r && r.l(i);
    },
    m(i, s) {
      r && r.m(i, s), (e = !0);
    },
    p(i, s) {
      r &&
        r.p &&
        (!e || s & 2104) &&
        he(r, t, i, i[11], e ? _e(t, i[11], s, tl) : de(i[11]), Fn);
    },
    i(i) {
      e || (D(r, i), (e = !0));
    },
    o(i) {
      U(r, i), (e = !1);
    },
    d(i) {
      r && r.d(i);
    },
  };
}
function sl(n) {
  let e, t, r, i;
  const s = [ol, il, nl, rl],
    o = [];
  function l(a, u) {
    return a[3] ? 0 : a[4] ? 1 : a[5] === 'loading' ? 2 : 3;
  }
  return (
    (e = l(n)),
    (t = o[e] = s[e](n)),
    {
      c() {
        t.c(), (r = J());
      },
      l(a) {
        t.l(a), (r = J());
      },
      m(a, u) {
        o[e].m(a, u), T(a, r, u), (i = !0);
      },
      p(a, [u]) {
        let h = e;
        (e = l(a)),
          e === h
            ? o[e].p(a, u)
            : (ve(),
              U(o[h], 1, 1, () => {
                o[h] = null;
              }),
              ye(),
              (t = o[e]),
              t ? t.p(a, u) : ((t = o[e] = s[e](a)), t.c()),
              D(t, 1),
              t.m(r.parentNode, r));
      },
      i(a) {
        i || (D(t), (i = !0));
      },
      o(a) {
        U(t), (i = !1);
      },
      d(a) {
        o[e].d(a), a && m(r);
      },
    }
  );
}
function al(n, e, t) {
  let r,
    i,
    s,
    o,
    l,
    a,
    u = K,
    h = () => (u(), (u = $e(o, (S) => t(3, (a = S)))), o),
    c,
    f = K,
    d = () => (f(), (f = $e(i, (S) => t(4, (c = S)))), i),
    _,
    p = K,
    v = () => (p(), (p = $e(s, (S) => t(5, (_ = S)))), s);
  et(n, Fr, (S) => t(10, (l = S))),
    n.$$.on_destroy.push(() => u()),
    n.$$.on_destroy.push(() => f()),
    n.$$.on_destroy.push(() => p());
  let { $$slots: b = {}, $$scope: E } = e,
    { queryKey: k } = e,
    { pubkey: O } = e,
    { req: I = void 0 } = e;
  return (
    (n.$$set = (S) => {
      'queryKey' in S && t(6, (k = S.queryKey)),
        'pubkey' in S && t(7, (O = S.pubkey)),
        'req' in S && t(8, (I = S.req)),
        '$$scope' in S && t(11, (E = S.$$scope));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 1472 && t(9, (r = Za(l.rxNostr, k, O, I))),
        n.$$.dirty & 512 && d(t(2, (i = r.data))),
        n.$$.dirty & 512 && v(t(1, (s = r.status))),
        n.$$.dirty & 512 && h(t(0, (o = r.error)));
    }),
    [o, s, i, a, c, _, k, O, I, r, l, E, b]
  );
}
class ur extends Ce {
  constructor(e) {
    super(), qe(this, e, al, sl, Se, { queryKey: 6, pubkey: 7, req: 8 });
  }
}
const ll = (n) => ({ connections: n & 4 }),
  Ln = (n) => ({ connections: n[2] });
function ul(n) {
  let e;
  const t = n[6].default,
    r = fe(t, n, n[7], Ln);
  return {
    c() {
      r && r.c();
    },
    l(i) {
      r && r.l(i);
    },
    m(i, s) {
      r && r.m(i, s), (e = !0);
    },
    p(i, s) {
      r &&
        r.p &&
        (!e || s & 132) &&
        he(r, t, i, i[7], e ? _e(t, i[7], s, ll) : de(i[7]), Ln);
    },
    i(i) {
      e || (D(r, i), (e = !0));
    },
    o(i) {
      U(r, i), (e = !1);
    },
    d(i) {
      r && r.d(i);
    },
  };
}
function cl(n) {
  let e, t;
  return (
    (e = new Ja({
      props: { client: n[0], $$slots: { default: [ul] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        De(e.$$.fragment);
      },
      l(r) {
        He(e.$$.fragment, r);
      },
      m(r, i) {
        Fe(e, r, i), (t = !0);
      },
      p(r, [i]) {
        const s = {};
        i & 1 && (s.client = r[0]),
          i & 132 && (s.$$scope = { dirty: i, ctx: r }),
          e.$set(s);
      },
      i(r) {
        t || (D(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        U(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        Le(e, r);
      },
    }
  );
}
function fl(n, e, t) {
  let r,
    i,
    s,
    o,
    l = K,
    a = () => (l(), (l = $e(r, (p) => t(2, (o = p)))), r);
  n.$$.on_destroy.push(() => l());
  let { $$slots: u = {}, $$scope: h } = e,
    { queryClientConfig: c = {} } = e,
    { relays: f = [] } = e;
  const d = ns(),
    _ = {
      defaultOptions: {
        queries: { staleTime: 1e3 * 60, refetchInterval: 1 / 0 },
      },
    };
  return (
    Yi(() => {
      d.dispose();
    }),
    (n.$$set = (p) => {
      'queryClientConfig' in p && t(3, (c = p.queryClientConfig)),
        'relays' in p && t(4, (f = p.relays)),
        '$$scope' in p && t(7, (h = p.$$scope));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 16 && a(t(1, (r = Wa({ rxNostr: d, relays: f })))),
        n.$$.dirty & 8 && t(5, (i = { ..._, ...c })),
        n.$$.dirty & 32 && t(0, (s = new Ro(i))),
        n.$$.dirty & 16 && (d.setRelays(f), Fr.set({ rxNostr: d }));
    }),
    [s, r, o, c, f, i, u, h]
  );
}
class qc extends Ce {
  constructor(e) {
    super(), qe(this, e, fl, cl, Se, { queryClientConfig: 3, relays: 4 });
  }
}
const hl = (n) => ({ text: n & 16, status: n & 32 }),
  Nn = (n) => {
    var e;
    return { text: (e = n[4]) == null ? void 0 : e.event, status: n[5] };
  },
  dl = (n) => ({ text: n & 16, status: n & 32 }),
  Hn = (n) => {
    var e;
    return { text: (e = n[4]) == null ? void 0 : e.event, status: n[5] };
  },
  _l = (n) => ({ text: n & 16, status: n & 32 }),
  Un = (n) => {
    var e;
    return { text: (e = n[4]) == null ? void 0 : e.event, status: n[5] };
  },
  pl = (n) => ({ error: n & 8, text: n & 16, status: n & 32 }),
  Bn = (n) => {
    var e;
    return {
      error: n[3],
      text: (e = n[4]) == null ? void 0 : e.event,
      status: n[5],
    };
  };
function vl(n) {
  let e;
  const t = n[12].nodata,
    r = fe(t, n, n[11], Nn);
  return {
    c() {
      r && r.c();
    },
    l(i) {
      r && r.l(i);
    },
    m(i, s) {
      r && r.m(i, s), (e = !0);
    },
    p(i, s) {
      r &&
        r.p &&
        (!e || s & 2096) &&
        he(r, t, i, i[11], e ? _e(t, i[11], s, hl) : de(i[11]), Nn);
    },
    i(i) {
      e || (D(r, i), (e = !0));
    },
    o(i) {
      U(r, i), (e = !1);
    },
    d(i) {
      r && r.d(i);
    },
  };
}
function yl(n) {
  let e;
  const t = n[12].loading,
    r = fe(t, n, n[11], Hn);
  return {
    c() {
      r && r.c();
    },
    l(i) {
      r && r.l(i);
    },
    m(i, s) {
      r && r.m(i, s), (e = !0);
    },
    p(i, s) {
      r &&
        r.p &&
        (!e || s & 2096) &&
        he(r, t, i, i[11], e ? _e(t, i[11], s, dl) : de(i[11]), Hn);
    },
    i(i) {
      e || (D(r, i), (e = !0));
    },
    o(i) {
      U(r, i), (e = !1);
    },
    d(i) {
      r && r.d(i);
    },
  };
}
function bl(n) {
  let e;
  const t = n[12].default,
    r = fe(t, n, n[11], Un);
  return {
    c() {
      r && r.c();
    },
    l(i) {
      r && r.l(i);
    },
    m(i, s) {
      r && r.m(i, s), (e = !0);
    },
    p(i, s) {
      r &&
        r.p &&
        (!e || s & 2096) &&
        he(r, t, i, i[11], e ? _e(t, i[11], s, _l) : de(i[11]), Un);
    },
    i(i) {
      e || (D(r, i), (e = !0));
    },
    o(i) {
      U(r, i), (e = !1);
    },
    d(i) {
      r && r.d(i);
    },
  };
}
function ml(n) {
  let e;
  const t = n[12].error,
    r = fe(t, n, n[11], Bn);
  return {
    c() {
      r && r.c();
    },
    l(i) {
      r && r.l(i);
    },
    m(i, s) {
      r && r.m(i, s), (e = !0);
    },
    p(i, s) {
      r &&
        r.p &&
        (!e || s & 2104) &&
        he(r, t, i, i[11], e ? _e(t, i[11], s, pl) : de(i[11]), Bn);
    },
    i(i) {
      e || (D(r, i), (e = !0));
    },
    o(i) {
      U(r, i), (e = !1);
    },
    d(i) {
      r && r.d(i);
    },
  };
}
function gl(n) {
  let e, t, r, i;
  const s = [ml, bl, yl, vl],
    o = [];
  function l(a, u) {
    return a[3] ? 0 : a[4] ? 1 : a[5] === 'loading' ? 2 : 3;
  }
  return (
    (e = l(n)),
    (t = o[e] = s[e](n)),
    {
      c() {
        t.c(), (r = J());
      },
      l(a) {
        t.l(a), (r = J());
      },
      m(a, u) {
        o[e].m(a, u), T(a, r, u), (i = !0);
      },
      p(a, [u]) {
        let h = e;
        (e = l(a)),
          e === h
            ? o[e].p(a, u)
            : (ve(),
              U(o[h], 1, 1, () => {
                o[h] = null;
              }),
              ye(),
              (t = o[e]),
              t ? t.p(a, u) : ((t = o[e] = s[e](a)), t.c()),
              D(t, 1),
              t.m(r.parentNode, r));
      },
      i(a) {
        i || (D(t), (i = !0));
      },
      o(a) {
        U(t), (i = !1);
      },
      d(a) {
        o[e].d(a), a && m(r);
      },
    }
  );
}
function kl(n, e, t) {
  let r,
    i,
    s,
    o,
    l,
    a,
    u = K,
    h = () => (u(), (u = $e(o, (S) => t(3, (a = S)))), o),
    c,
    f = K,
    d = () => (f(), (f = $e(i, (S) => t(4, (c = S)))), i),
    _,
    p = K,
    v = () => (p(), (p = $e(s, (S) => t(5, (_ = S)))), s);
  et(n, Fr, (S) => t(10, (l = S))),
    n.$$.on_destroy.push(() => u()),
    n.$$.on_destroy.push(() => f()),
    n.$$.on_destroy.push(() => p());
  let { $$slots: b = {}, $$scope: E } = e,
    { queryKey: k } = e,
    { id: O } = e,
    { req: I = void 0 } = e;
  return (
    (n.$$set = (S) => {
      'queryKey' in S && t(6, (k = S.queryKey)),
        'id' in S && t(7, (O = S.id)),
        'req' in S && t(8, (I = S.req)),
        '$$scope' in S && t(11, (E = S.$$scope));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 1472 && t(9, (r = Xa(l.rxNostr, k, O, I))),
        n.$$.dirty & 512 && d(t(2, (i = r.data))),
        n.$$.dirty & 512 && v(t(1, (s = r.status))),
        n.$$.dirty & 512 && h(t(0, (o = r.error)));
    }),
    [o, s, i, a, c, _, k, O, I, r, l, E, b]
  );
}
class jo extends Ce {
  constructor(e) {
    super(), qe(this, e, kl, gl, Se, { queryKey: 6, id: 7, req: 8 });
  }
}
var Ut = {};
Object.defineProperty(Ut, '__esModule', { value: !0 });
Ut.is_node = void 0;
var _r = null;
function Ol() {
  return (
    _r === null &&
      (_r =
        typeof A == 'object' &&
        typeof A.process == 'object' &&
        typeof A.process.versions == 'object' &&
        typeof A.process.versions.node < 'u'),
    _r
  );
}
Ut.is_node = Ol;
var pr = {},
  vr,
  Qn;
function El() {
  if (Qn) return vr;
  Qn = 1;
  var n = function () {
    if (typeof self == 'object' && self) return self;
    if (typeof window == 'object' && window) return window;
    throw new Error('Unable to resolve global `this`');
  };
  return (
    (vr = (function () {
      if (this) return this;
      if (typeof globalThis == 'object' && globalThis) return globalThis;
      try {
        Object.defineProperty(Object.prototype, '__global__', {
          get: function () {
            return this;
          },
          configurable: !0,
        });
      } catch {
        return n();
      }
      try {
        return __global__ || n();
      } finally {
        delete Object.prototype.__global__;
      }
    })()),
    vr
  );
}
const Sl = 'websocket',
  wl =
    'Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.',
  Cl = [
    'websocket',
    'websockets',
    'socket',
    'networking',
    'comet',
    'push',
    'RFC-6455',
    'realtime',
    'server',
    'client',
  ],
  ql =
    'Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)',
  Il = ['Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)'],
  Pl = '1.0.34',
  Rl = {
    type: 'git',
    url: 'https://github.com/theturtle32/WebSocket-Node.git',
  },
  Al = 'https://github.com/theturtle32/WebSocket-Node',
  Tl = { node: '>=4.0.0' },
  Ml = {
    bufferutil: '^4.0.1',
    debug: '^2.2.0',
    'es5-ext': '^0.10.50',
    'typedarray-to-buffer': '^3.1.5',
    'utf-8-validate': '^5.0.2',
    yaeti: '^0.0.6',
  },
  jl = {
    'buffer-equal': '^1.0.0',
    gulp: '^4.0.2',
    'gulp-jshint': '^2.0.4',
    'jshint-stylish': '^2.2.1',
    jshint: '^2.0.0',
    tape: '^4.9.1',
  },
  Dl = { verbose: !1 },
  Fl = { test: 'tape test/unit/*.js', gulp: 'gulp' },
  Ll = 'index',
  Nl = { lib: './lib' },
  Hl = 'lib/browser.js',
  Ul = 'Apache-2.0',
  Bl = {
    name: Sl,
    description: wl,
    keywords: Cl,
    author: ql,
    contributors: Il,
    version: Pl,
    repository: Rl,
    homepage: Al,
    engines: Tl,
    dependencies: Ml,
    devDependencies: jl,
    config: Dl,
    scripts: Fl,
    main: Ll,
    directories: Nl,
    browser: Hl,
    license: Ul,
  };
var yr, Kn;
function Ql() {
  return Kn || ((Kn = 1), (yr = Bl.version)), yr;
}
var br, Vn;
function Kl() {
  if (Vn) return br;
  Vn = 1;
  var n;
  if (typeof globalThis == 'object') n = globalThis;
  else
    try {
      n = El();
    } catch {
    } finally {
      if ((!n && typeof window < 'u' && (n = window), !n))
        throw new Error('Could not determine global this');
    }
  var e = n.WebSocket || n.MozWebSocket,
    t = Ql();
  function r(i, s) {
    var o;
    return s ? (o = new e(i, s)) : (o = new e(i)), o;
  }
  return (
    e &&
      ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function (i) {
        Object.defineProperty(r, i, {
          get: function () {
            return e[i];
          },
        });
      }),
    (br = { w3cwebsocket: e ? r : null, version: t }),
    br
  );
}
var Qt = {},
  mr = {},
  ht = {},
  dt = {},
  _t = {},
  pt = {},
  Gn;
function Vl() {
  if (Gn) return pt;
  (Gn = 1),
    Object.defineProperty(pt, '__esModule', { value: !0 }),
    (pt.ForOfAdaptor = void 0);
  var n = (function () {
    function e(t, r) {
      (this.it_ = t), (this.last_ = r);
    }
    return (
      (e.prototype.next = function () {
        if (this.it_.equals(this.last_)) return { done: !0, value: void 0 };
        var t = this.it_;
        return (this.it_ = this.it_.next()), { done: !1, value: t.value };
      }),
      (e.prototype[Symbol.iterator] = function () {
        return this;
      }),
      e
    );
  })();
  return (pt.ForOfAdaptor = n), pt;
}
var zn;
function Gr() {
  if (zn) return _t;
  zn = 1;
  var n =
    (A && A.__values) ||
    function (r) {
      var i = typeof Symbol == 'function' && Symbol.iterator,
        s = i && r[i],
        o = 0;
      if (s) return s.call(r);
      if (r && typeof r.length == 'number')
        return {
          next: function () {
            return (
              r && o >= r.length && (r = void 0),
              { value: r && r[o++], done: !r }
            );
          },
        };
      throw new TypeError(
        i ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
      );
    };
  Object.defineProperty(_t, '__esModule', { value: !0 }),
    (_t.Container = void 0);
  var e = Vl(),
    t = (function () {
      function r() {}
      return (
        (r.prototype.empty = function () {
          return this.size() === 0;
        }),
        (r.prototype.rbegin = function () {
          return this.end().reverse();
        }),
        (r.prototype.rend = function () {
          return this.begin().reverse();
        }),
        (r.prototype[Symbol.iterator] = function () {
          return new e.ForOfAdaptor(this.begin(), this.end());
        }),
        (r.prototype.toJSON = function () {
          var i,
            s,
            o = [];
          try {
            for (var l = n(this), a = l.next(); !a.done; a = l.next()) {
              var u = a.value;
              o.push(u);
            }
          } catch (h) {
            i = { error: h };
          } finally {
            try {
              a && !a.done && (s = l.return) && s.call(l);
            } finally {
              if (i) throw i.error;
            }
          }
          return o;
        }),
        r
      );
    })();
  return (_t.Container = t), _t;
}
var vt = {},
  Jn;
function zr() {
  if (Jn) return vt;
  Jn = 1;
  var n =
    (A && A.__read) ||
    function (t, r) {
      var i = typeof Symbol == 'function' && t[Symbol.iterator];
      if (!i) return t;
      var s = i.call(t),
        o,
        l = [],
        a;
      try {
        for (; (r === void 0 || r-- > 0) && !(o = s.next()).done; )
          l.push(o.value);
      } catch (u) {
        a = { error: u };
      } finally {
        try {
          o && !o.done && (i = s.return) && i.call(s);
        } finally {
          if (a) throw a.error;
        }
      }
      return l;
    };
  Object.defineProperty(vt, '__esModule', { value: !0 }),
    (vt.NativeArrayIterator = void 0);
  var e = (function () {
    function t(r, i) {
      (this.data_ = r), (this.index_ = i);
    }
    return (
      (t.prototype.index = function () {
        return this.index_;
      }),
      Object.defineProperty(t.prototype, 'value', {
        get: function () {
          return this.data_[this.index_];
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.prev = function () {
        return --this.index_, this;
      }),
      (t.prototype.next = function () {
        return ++this.index_, this;
      }),
      (t.prototype.advance = function (r) {
        return (this.index_ += r), this;
      }),
      (t.prototype.equals = function (r) {
        return this.data_ === r.data_ && this.index_ === r.index_;
      }),
      (t.prototype.swap = function (r) {
        var i, s;
        (i = n([r.data_, this.data_], 2)),
          (this.data_ = i[0]),
          (r.data_ = i[1]),
          (s = n([r.index_, this.index_], 2)),
          (this.index_ = s[0]),
          (r.index_ = s[1]);
      }),
      t
    );
  })();
  return (vt.NativeArrayIterator = e), vt;
}
var Wn;
function Gl() {
  if (Wn) return dt;
  Wn = 1;
  var n =
    (A && A.__extends) ||
    (function () {
      var i = function (s, o) {
        return (
          (i =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (l, a) {
                l.__proto__ = a;
              }) ||
            function (l, a) {
              for (var u in a)
                Object.prototype.hasOwnProperty.call(a, u) && (l[u] = a[u]);
            }),
          i(s, o)
        );
      };
      return function (s, o) {
        if (typeof o != 'function' && o !== null)
          throw new TypeError(
            'Class extends value ' +
              String(o) +
              ' is not a constructor or null',
          );
        i(s, o);
        function l() {
          this.constructor = s;
        }
        s.prototype =
          o === null
            ? Object.create(o)
            : ((l.prototype = o.prototype), new l());
      };
    })();
  Object.defineProperty(dt, '__esModule', { value: !0 }),
    (dt.SetContainer = void 0);
  var e = Gr(),
    t = zr(),
    r = (function (i) {
      n(s, i);
      function s(o) {
        var l = i.call(this) || this;
        return (l.data_ = o(l)), l;
      }
      return (
        (s.prototype.assign = function (o, l) {
          this.clear(), this.insert(o, l);
        }),
        (s.prototype.clear = function () {
          this.data_.clear();
        }),
        (s.prototype.begin = function () {
          return this.data_.begin();
        }),
        (s.prototype.end = function () {
          return this.data_.end();
        }),
        (s.prototype.has = function (o) {
          return !this.find(o).equals(this.end());
        }),
        (s.prototype.size = function () {
          return this.data_.size();
        }),
        (s.prototype.push = function () {
          for (var o = [], l = 0; l < arguments.length; l++)
            o[l] = arguments[l];
          if (o.length === 0) return this.size();
          var a = new t.NativeArrayIterator(o, 0),
            u = new t.NativeArrayIterator(o, o.length);
          return this._Insert_by_range(a, u), this.size();
        }),
        (s.prototype.insert = function () {
          for (var o = [], l = 0; l < arguments.length; l++)
            o[l] = arguments[l];
          return o.length === 1
            ? this._Insert_by_key(o[0])
            : o[0].next instanceof Function && o[1].next instanceof Function
            ? this._Insert_by_range(o[0], o[1])
            : this._Insert_by_hint(o[0], o[1]);
        }),
        (s.prototype.erase = function () {
          for (var o = [], l = 0; l < arguments.length; l++)
            o[l] = arguments[l];
          return o.length === 1 &&
            !(o[0] instanceof this.end().constructor && o[0].source() === this)
            ? this._Erase_by_val(o[0])
            : o.length === 1
            ? this._Erase_by_range(o[0])
            : this._Erase_by_range(o[0], o[1]);
        }),
        (s.prototype._Erase_by_range = function (o, l) {
          l === void 0 && (l = o.next());
          var a = this.data_.erase(o, l);
          return this._Handle_erase(o, l), a;
        }),
        s
      );
    })(e.Container);
  return (dt.SetContainer = r), dt;
}
var gr = {},
  yt = {},
  bt = {},
  mt = {},
  Yn;
function zl() {
  if (Yn) return mt;
  Yn = 1;
  var n =
    (A && A.__extends) ||
    (function () {
      var t = function (r, i) {
        return (
          (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (s, o) {
                s.__proto__ = o;
              }) ||
            function (s, o) {
              for (var l in o)
                Object.prototype.hasOwnProperty.call(o, l) && (s[l] = o[l]);
            }),
          t(r, i)
        );
      };
      return function (r, i) {
        if (typeof i != 'function' && i !== null)
          throw new TypeError(
            'Class extends value ' +
              String(i) +
              ' is not a constructor or null',
          );
        t(r, i);
        function s() {
          this.constructor = r;
        }
        r.prototype =
          i === null
            ? Object.create(i)
            : ((s.prototype = i.prototype), new s());
      };
    })();
  Object.defineProperty(mt, '__esModule', { value: !0 }),
    (mt.Exception = void 0);
  var e = (function (t) {
    n(r, t);
    function r(i) {
      var s = this.constructor,
        o = t.call(this, i) || this,
        l = s.prototype;
      return (
        Object.setPrototypeOf ? Object.setPrototypeOf(o, l) : (o.__proto__ = l),
        o
      );
    }
    return (
      Object.defineProperty(r.prototype, 'name', {
        get: function () {
          return this.constructor.name;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (r.prototype.what = function () {
        return this.message;
      }),
      (r.prototype.toJSON = function () {
        return { name: this.name, message: this.message, stack: this.stack };
      }),
      r
    );
  })(Error);
  return (mt.Exception = e), mt;
}
var Xn;
function Do() {
  if (Xn) return bt;
  Xn = 1;
  var n =
    (A && A.__extends) ||
    (function () {
      var r = function (i, s) {
        return (
          (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (o, l) {
                o.__proto__ = l;
              }) ||
            function (o, l) {
              for (var a in l)
                Object.prototype.hasOwnProperty.call(l, a) && (o[a] = l[a]);
            }),
          r(i, s)
        );
      };
      return function (i, s) {
        if (typeof s != 'function' && s !== null)
          throw new TypeError(
            'Class extends value ' +
              String(s) +
              ' is not a constructor or null',
          );
        r(i, s);
        function o() {
          this.constructor = i;
        }
        i.prototype =
          s === null
            ? Object.create(s)
            : ((o.prototype = s.prototype), new o());
      };
    })();
  Object.defineProperty(bt, '__esModule', { value: !0 }),
    (bt.LogicError = void 0);
  var e = zl(),
    t = (function (r) {
      n(i, r);
      function i(s) {
        return r.call(this, s) || this;
      }
      return i;
    })(e.Exception);
  return (bt.LogicError = t), bt;
}
var Zn;
function Fo() {
  if (Zn) return yt;
  Zn = 1;
  var n =
    (A && A.__extends) ||
    (function () {
      var r = function (i, s) {
        return (
          (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (o, l) {
                o.__proto__ = l;
              }) ||
            function (o, l) {
              for (var a in l)
                Object.prototype.hasOwnProperty.call(l, a) && (o[a] = l[a]);
            }),
          r(i, s)
        );
      };
      return function (i, s) {
        if (typeof s != 'function' && s !== null)
          throw new TypeError(
            'Class extends value ' +
              String(s) +
              ' is not a constructor or null',
          );
        r(i, s);
        function o() {
          this.constructor = i;
        }
        i.prototype =
          s === null
            ? Object.create(s)
            : ((o.prototype = s.prototype), new o());
      };
    })();
  Object.defineProperty(yt, '__esModule', { value: !0 }),
    (yt.InvalidArgument = void 0);
  var e = Do(),
    t = (function (r) {
      n(i, r);
      function i(s) {
        return r.call(this, s) || this;
      }
      return i;
    })(e.LogicError);
  return (yt.InvalidArgument = t), yt;
}
var gt = {},
  xn;
function Jl() {
  if (xn) return gt;
  xn = 1;
  var n =
    (A && A.__extends) ||
    (function () {
      var r = function (i, s) {
        return (
          (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (o, l) {
                o.__proto__ = l;
              }) ||
            function (o, l) {
              for (var a in l)
                Object.prototype.hasOwnProperty.call(l, a) && (o[a] = l[a]);
            }),
          r(i, s)
        );
      };
      return function (i, s) {
        if (typeof s != 'function' && s !== null)
          throw new TypeError(
            'Class extends value ' +
              String(s) +
              ' is not a constructor or null',
          );
        r(i, s);
        function o() {
          this.constructor = i;
        }
        i.prototype =
          s === null
            ? Object.create(s)
            : ((o.prototype = s.prototype), new o());
      };
    })();
  Object.defineProperty(gt, '__esModule', { value: !0 }),
    (gt.OutOfRange = void 0);
  var e = Do(),
    t = (function (r) {
      n(i, r);
      function i(s) {
        return r.call(this, s) || this;
      }
      return i;
    })(e.LogicError);
  return (gt.OutOfRange = t), gt;
}
var $n;
function cr() {
  return (
    $n ||
      (($n = 1),
      (function (n) {
        Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.ErrorGenerator = void 0);
        var e = Fo(),
          t = Jl();
        (function (r) {
          function i(d) {
            if (typeof d == 'string') return d;
            var _ = d.constructor.name;
            return (
              d.constructor.__MODULE &&
                (_ = ''.concat(d.constructor.__MODULE, '.').concat(_)),
              'std.'.concat(_)
            );
          }
          r.get_class_name = i;
          function s(d, _) {
            return new t.OutOfRange(
              'Error on '
                .concat(i(d), '.')
                .concat(_, "(): it's empty container."),
            );
          }
          r.empty = s;
          function o(d, _, p) {
            return new t.OutOfRange(
              'Error on '
                .concat(i(d), '.')
                .concat(_, '(): parametric index is negative -> (index = ')
                .concat(p, ').'),
            );
          }
          r.negative_index = o;
          function l(d, _, p, v) {
            return new t.OutOfRange(
              'Error on '
                .concat(i(d), '.')
                .concat(
                  _,
                  '(): parametric index is equal or greater than size -> (index = ',
                )
                .concat(p, ', size: ')
                .concat(v, ').'),
            );
          }
          r.excessive_index = l;
          function a(d, _) {
            return new e.InvalidArgument(
              'Error on '
                .concat(i(d), '.')
                .concat(
                  _,
                  "(): parametric iterator is not this container's own.",
                ),
            );
          }
          r.not_my_iterator = a;
          function u(d, _) {
            return new e.InvalidArgument(
              'Error on '
                .concat(i(d), '.')
                .concat(
                  _,
                  '(): parametric iterator, it already has been erased.',
                ),
            );
          }
          r.erased_iterator = u;
          function h(d, _, p) {
            return new t.OutOfRange(
              'Error on '
                .concat(i(d), '.')
                .concat(
                  _,
                  '(): parametric iterator is directing negative position -> (index = ',
                )
                .concat(p, ').'),
            );
          }
          r.negative_iterator = h;
          function c(d, _) {
            _ === void 0 && (_ = 'end');
            var p = i(d);
            return new t.OutOfRange(
              'Error on '
                .concat(p, '.Iterator.value: cannot access to the ')
                .concat(p, '.')
                .concat(_, '().value.'),
            );
          }
          r.iterator_end_value = c;
          function f(d, _, p) {
            throw new t.OutOfRange(
              'Error on '
                .concat(i(d), '.')
                .concat(_, '(): unable to find the matched key -> ')
                .concat(p),
            );
          }
          r.key_nout_found = f;
        })(n.ErrorGenerator || (n.ErrorGenerator = {}));
      })(gr)),
    gr
  );
}
var ei;
function Wl() {
  if (ei) return ht;
  ei = 1;
  var n =
      (A && A.__extends) ||
      (function () {
        var o = function (l, a) {
          return (
            (o =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (u, h) {
                  u.__proto__ = h;
                }) ||
              function (u, h) {
                for (var c in h)
                  Object.prototype.hasOwnProperty.call(h, c) && (u[c] = h[c]);
              }),
            o(l, a)
          );
        };
        return function (l, a) {
          if (typeof a != 'function' && a !== null)
            throw new TypeError(
              'Class extends value ' +
                String(a) +
                ' is not a constructor or null',
            );
          o(l, a);
          function u() {
            this.constructor = l;
          }
          l.prototype =
            a === null
              ? Object.create(a)
              : ((u.prototype = a.prototype), new u());
        };
      })(),
    e =
      (A && A.__read) ||
      function (o, l) {
        var a = typeof Symbol == 'function' && o[Symbol.iterator];
        if (!a) return o;
        var u = a.call(o),
          h,
          c = [],
          f;
        try {
          for (; (l === void 0 || l-- > 0) && !(h = u.next()).done; )
            c.push(h.value);
        } catch (d) {
          f = { error: d };
        } finally {
          try {
            h && !h.done && (a = u.return) && a.call(u);
          } finally {
            if (f) throw f.error;
          }
        }
        return c;
      },
    t =
      (A && A.__spreadArray) ||
      function (o, l, a) {
        if (a || arguments.length === 2)
          for (var u = 0, h = l.length, c; u < h; u++)
            (c || !(u in l)) &&
              (c || (c = Array.prototype.slice.call(l, 0, u)), (c[u] = l[u]));
        return o.concat(c || Array.prototype.slice.call(l));
      };
  Object.defineProperty(ht, '__esModule', { value: !0 }),
    (ht.UniqueSet = void 0);
  var r = Gl(),
    i = cr(),
    s = (function (o) {
      n(l, o);
      function l() {
        return (o !== null && o.apply(this, arguments)) || this;
      }
      return (
        (l.prototype.count = function (a) {
          return this.find(a).equals(this.end()) ? 0 : 1;
        }),
        (l.prototype.insert = function () {
          for (var a = [], u = 0; u < arguments.length; u++)
            a[u] = arguments[u];
          return o.prototype.insert.apply(this, t([], e(a), !1));
        }),
        (l.prototype._Insert_by_range = function (a, u) {
          for (; !a.equals(u); a = a.next()) this._Insert_by_key(a.value);
        }),
        (l.prototype.extract = function (a) {
          return a instanceof this.end().constructor
            ? this._Extract_by_iterator(a)
            : this._Extract_by_val(a);
        }),
        (l.prototype._Extract_by_val = function (a) {
          var u = this.find(a);
          if (u.equals(this.end()) === !0)
            throw i.ErrorGenerator.key_nout_found(this, 'extract', a);
          return this._Erase_by_range(u), a;
        }),
        (l.prototype._Extract_by_iterator = function (a) {
          return a.equals(this.end()) === !0 || this.has(a.value) === !1
            ? this.end()
            : (this._Erase_by_range(a), a);
        }),
        (l.prototype._Erase_by_val = function (a) {
          var u = this.find(a);
          return u.equals(this.end()) === !0 ? 0 : (this._Erase_by_range(u), 1);
        }),
        (l.prototype.merge = function (a) {
          for (var u = a.begin(); !u.equals(a.end()); )
            this.has(u.value) === !1
              ? (this.insert(u.value), (u = a.erase(u)))
              : (u = u.next());
        }),
        l
      );
    })(r.SetContainer);
  return (ht.UniqueSet = s), ht;
}
var kr = {},
  Or = {},
  ti;
function Yl() {
  return (
    ti ||
      ((ti = 1),
      (function (n) {
        var e =
            (A && A.__read) ||
            function (r, i) {
              var s = typeof Symbol == 'function' && r[Symbol.iterator];
              if (!s) return r;
              var o = s.call(r),
                l,
                a = [],
                u;
              try {
                for (; (i === void 0 || i-- > 0) && !(l = o.next()).done; )
                  a.push(l.value);
              } catch (h) {
                u = { error: h };
              } finally {
                try {
                  l && !l.done && (s = o.return) && s.call(o);
                } finally {
                  if (u) throw u.error;
                }
              }
              return a;
            },
          t =
            (A && A.__spreadArray) ||
            function (r, i, s) {
              if (s || arguments.length === 2)
                for (var o = 0, l = i.length, a; o < l; o++)
                  (a || !(o in i)) &&
                    (a || (a = Array.prototype.slice.call(i, 0, o)),
                    (a[o] = i[o]));
              return r.concat(a || Array.prototype.slice.call(i));
            };
        Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.IAssociativeContainer = void 0),
          (function (r) {
            function i(s) {
              for (var o = [], l = 1; l < arguments.length; l++)
                o[l - 1] = arguments[l];
              var a, u;
              return (
                o.length >= 1 && o[0] instanceof Array
                  ? ((a = function () {
                      var h = o[0];
                      s.push.apply(s, t([], e(h), !1));
                    }),
                    (u = o.slice(1)))
                  : o.length >= 2 &&
                    o[0].next instanceof Function &&
                    o[1].next instanceof Function
                  ? ((a = function () {
                      var h = o[0],
                        c = o[1];
                      s.assign(h, c);
                    }),
                    (u = o.slice(2)))
                  : ((a = null), (u = o)),
                { ramda: a, tail: u }
              );
            }
            r.construct = i;
          })(n.IAssociativeContainer || (n.IAssociativeContainer = {}));
      })(Or)),
    Or
  );
}
var kt = {},
  Ot = {},
  Et = {},
  ri;
function Xl() {
  if (ri) return Et;
  (ri = 1),
    Object.defineProperty(Et, '__esModule', { value: !0 }),
    (Et._Get_root = void 0);
  var n = Ut;
  function e() {
    return (
      t === null &&
        ((t = (0, n.is_node)() ? A : self),
        t.__s_iUID === void 0 && (t.__s_iUID = 0)),
      t
    );
  }
  Et._Get_root = e;
  var t = null;
  return Et;
}
var ni;
function Lo() {
  if (ni) return Ot;
  (ni = 1),
    Object.defineProperty(Ot, '__esModule', { value: !0 }),
    (Ot.get_uid = void 0);
  var n = Xl();
  function e(t) {
    if (t instanceof Object) {
      if (t.hasOwnProperty('__get_m_iUID') === !1) {
        var r = ++(0, n._Get_root)().__s_iUID;
        Object.defineProperty(t, '__get_m_iUID', {
          value: function () {
            return r;
          },
        });
      }
      return t.__get_m_iUID();
    } else return t === void 0 ? -1 : 0;
  }
  return (Ot.get_uid = e), Ot;
}
var ii;
function Jr() {
  if (ii) return kt;
  ii = 1;
  var n =
    (A && A.__values) ||
    function (a) {
      var u = typeof Symbol == 'function' && Symbol.iterator,
        h = u && a[u],
        c = 0;
      if (h) return h.call(a);
      if (a && typeof a.length == 'number')
        return {
          next: function () {
            return (
              a && c >= a.length && (a = void 0),
              { value: a && a[c++], done: !a }
            );
          },
        };
      throw new TypeError(
        u ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
      );
    };
  Object.defineProperty(kt, '__esModule', { value: !0 }), (kt.hash = void 0);
  var e = Lo();
  function t() {
    for (var a, u, h = [], c = 0; c < arguments.length; c++)
      h[c] = arguments[c];
    var f = o;
    try {
      for (var d = n(h), _ = d.next(); !_.done; _ = d.next()) {
        var p = _.value;
        p = p && p.valueOf();
        var v = typeof p;
        if (v === 'boolean') f = r(p, f);
        else if (v === 'number' || v === 'bigint') f = i(p, f);
        else if (v === 'string') f = s(p, f);
        else if (p instanceof Object && p.hashCode instanceof Function) {
          var b = p.hashCode();
          if (h.length === 1) return b;
          (f = f ^ b), (f *= l);
        } else f = i((0, e.get_uid)(p), f);
      }
    } catch (E) {
      a = { error: E };
    } finally {
      try {
        _ && !_.done && (u = d.return) && u.call(d);
      } finally {
        if (a) throw a.error;
      }
    }
    return Math.abs(f);
  }
  kt.hash = t;
  function r(a, u) {
    return (u ^= a ? 1 : 0), (u *= l), u;
  }
  function i(a, u) {
    return s(a.toString(), u);
  }
  function s(a, u) {
    for (var h = 0; h < a.length; ++h) (u ^= a.charCodeAt(h)), (u *= l);
    return Math.abs(u);
  }
  var o = 2166136261,
    l = 16777619;
  return kt;
}
var Oe = {},
  oi;
function Wr() {
  if (oi) return Oe;
  (oi = 1),
    Object.defineProperty(Oe, '__esModule', { value: !0 }),
    (Oe.greater_equal =
      Oe.greater =
      Oe.less_equal =
      Oe.less =
      Oe.not_equal_to =
      Oe.equal_to =
        void 0);
  var n = Lo();
  function e(l, a) {
    return (
      (l = l && l.valueOf()),
      (a = a && a.valueOf()),
      l instanceof Object && l.equals instanceof Function
        ? l.equals(a)
        : l === a
    );
  }
  Oe.equal_to = e;
  function t(l, a) {
    return !e(l, a);
  }
  Oe.not_equal_to = t;
  function r(l, a) {
    return (
      (l = l.valueOf()),
      (a = a.valueOf()),
      l instanceof Object
        ? l.less instanceof Function
          ? l.less(a)
          : (0, n.get_uid)(l) < (0, n.get_uid)(a)
        : l < a
    );
  }
  Oe.less = r;
  function i(l, a) {
    return r(l, a) || e(l, a);
  }
  Oe.less_equal = i;
  function s(l, a) {
    return !i(l, a);
  }
  Oe.greater = s;
  function o(l, a) {
    return !r(l, a);
  }
  return (Oe.greater_equal = o), Oe;
}
var si;
function No() {
  return (
    si ||
      ((si = 1),
      (function (n) {
        var e =
            (A && A.__read) ||
            function (o, l) {
              var a = typeof Symbol == 'function' && o[Symbol.iterator];
              if (!a) return o;
              var u = a.call(o),
                h,
                c = [],
                f;
              try {
                for (; (l === void 0 || l-- > 0) && !(h = u.next()).done; )
                  c.push(h.value);
              } catch (d) {
                f = { error: d };
              } finally {
                try {
                  h && !h.done && (a = u.return) && a.call(u);
                } finally {
                  if (f) throw f.error;
                }
              }
              return c;
            },
          t =
            (A && A.__spreadArray) ||
            function (o, l, a) {
              if (a || arguments.length === 2)
                for (var u = 0, h = l.length, c; u < h; u++)
                  (c || !(u in l)) &&
                    (c || (c = Array.prototype.slice.call(l, 0, u)),
                    (c[u] = l[u]));
              return o.concat(c || Array.prototype.slice.call(l));
            };
        Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.IHashContainer = void 0);
        var r = Yl(),
          i = Jr(),
          s = Wr();
        (function (o) {
          function l(a, u, h) {
            for (var c = [], f = 3; f < arguments.length; f++)
              c[f - 3] = arguments[f];
            var d = null,
              _ = i.hash,
              p = s.equal_to;
            if (c.length === 1 && c[0] instanceof u) {
              var v = c[0];
              (_ = v.hash_function()),
                (p = v.key_eq()),
                (d = function () {
                  var E = v.begin(),
                    k = v.end();
                  a.assign(E, k);
                });
            } else {
              var b = r.IAssociativeContainer.construct.apply(
                r.IAssociativeContainer,
                t([a], e(c), !1),
              );
              (d = b.ramda),
                b.tail.length >= 1 && (_ = b.tail[0]),
                b.tail.length >= 2 && (p = b.tail[1]);
            }
            h(_, p), d !== null && d();
          }
          o.construct = l;
        })(n.IHashContainer || (n.IHashContainer = {}));
      })(kr)),
    kr
  );
}
var Er = {},
  St = {},
  wt = {},
  ai;
function Yr() {
  if (ai) return wt;
  (ai = 1),
    Object.defineProperty(wt, '__esModule', { value: !0 }),
    (wt.ListIterator = void 0);
  var n = cr(),
    e = (function () {
      function t(r, i, s) {
        (this.prev_ = r), (this.next_ = i), (this.value_ = s);
      }
      return (
        (t._Set_prev = function (r, i) {
          r.prev_ = i;
        }),
        (t._Set_next = function (r, i) {
          r.next_ = i;
        }),
        (t.prototype.prev = function () {
          return this.prev_;
        }),
        (t.prototype.next = function () {
          return this.next_;
        }),
        Object.defineProperty(t.prototype, 'value', {
          get: function () {
            return this._Try_value(), this.value_;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype._Try_value = function () {
          if (this.value_ === void 0 && this.equals(this.source().end()) === !0)
            throw n.ErrorGenerator.iterator_end_value(this.source());
        }),
        (t.prototype.equals = function (r) {
          return this === r;
        }),
        t
      );
    })();
  return (wt.ListIterator = e), wt;
}
var Ct = {},
  li;
function Zl() {
  if (li) return Ct;
  (li = 1),
    Object.defineProperty(Ct, '__esModule', { value: !0 }),
    (Ct.Repeater = void 0);
  var n = (function () {
    function e(t, r) {
      (this.index_ = t), (this.value_ = r);
    }
    return (
      (e.prototype.index = function () {
        return this.index_;
      }),
      Object.defineProperty(e.prototype, 'value', {
        get: function () {
          return this.value_;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.next = function () {
        return ++this.index_, this;
      }),
      (e.prototype.equals = function (t) {
        return this.index_ === t.index_;
      }),
      e
    );
  })();
  return (Ct.Repeater = n), Ct;
}
var Ee = {},
  ui;
function xl() {
  if (ui) return Ee;
  (ui = 1),
    Object.defineProperty(Ee, '__esModule', { value: !0 }),
    (Ee.next =
      Ee.prev =
      Ee.advance =
      Ee.distance =
      Ee.size =
      Ee.empty =
        void 0);
  var n = Fo();
  function e(a) {
    return a instanceof Array ? a.length !== 0 : a.empty();
  }
  Ee.empty = e;
  function t(a) {
    return a instanceof Array ? a.length : a.size();
  }
  Ee.size = t;
  function r(a, u) {
    if (a.index instanceof Function) return i(a, u);
    for (var h = 0; !a.equals(u); a = a.next()) ++h;
    return h;
  }
  Ee.distance = r;
  function i(a, u) {
    var h = a.index(),
      c = u.index();
    return a.base instanceof Function ? h - c : c - h;
  }
  function s(a, u) {
    if (u === 0) return a;
    if (a.advance instanceof Function) return a.advance(u);
    var h;
    if (u < 0) {
      if (!(a.prev instanceof Function))
        throw new n.InvalidArgument(
          'Error on std.advance(): parametric iterator is not a bi-directional iterator, thus advancing to negative direction is not possible.',
        );
      (h = function (c) {
        return c.prev();
      }),
        (u = -u);
    } else
      h = function (c) {
        return c.next();
      };
    for (; u-- > 0; ) a = h(a);
    return a;
  }
  Ee.advance = s;
  function o(a, u) {
    return u === void 0 && (u = 1), u === 1 ? a.prev() : s(a, -u);
  }
  Ee.prev = o;
  function l(a, u) {
    return u === void 0 && (u = 1), u === 1 ? a.next() : s(a, u);
  }
  return (Ee.next = l), Ee;
}
var ci;
function Ho() {
  if (ci) return St;
  ci = 1;
  var n =
      (A && A.__extends) ||
      (function () {
        var u = function (h, c) {
          return (
            (u =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (f, d) {
                  f.__proto__ = d;
                }) ||
              function (f, d) {
                for (var _ in d)
                  Object.prototype.hasOwnProperty.call(d, _) && (f[_] = d[_]);
              }),
            u(h, c)
          );
        };
        return function (h, c) {
          if (typeof c != 'function' && c !== null)
            throw new TypeError(
              'Class extends value ' +
                String(c) +
                ' is not a constructor or null',
            );
          u(h, c);
          function f() {
            this.constructor = h;
          }
          h.prototype =
            c === null
              ? Object.create(c)
              : ((f.prototype = c.prototype), new f());
        };
      })(),
    e =
      (A && A.__read) ||
      function (u, h) {
        var c = typeof Symbol == 'function' && u[Symbol.iterator];
        if (!c) return u;
        var f = c.call(u),
          d,
          _ = [],
          p;
        try {
          for (; (h === void 0 || h-- > 0) && !(d = f.next()).done; )
            _.push(d.value);
        } catch (v) {
          p = { error: v };
        } finally {
          try {
            d && !d.done && (c = f.return) && c.call(f);
          } finally {
            if (p) throw p.error;
          }
        }
        return _;
      };
  Object.defineProperty(St, '__esModule', { value: !0 }),
    (St.ListContainer = void 0);
  var t = Gr(),
    r = Yr(),
    i = Zl(),
    s = zr(),
    o = xl(),
    l = cr(),
    a = (function (u) {
      n(h, u);
      function h() {
        var c = u.call(this) || this;
        return (c.end_ = c._Create_iterator(null, null)), c.clear(), c;
      }
      return (
        (h.prototype.assign = function (c, f) {
          this.clear(), this.insert(this.end(), c, f);
        }),
        (h.prototype.clear = function () {
          r.ListIterator._Set_prev(this.end_, this.end_),
            r.ListIterator._Set_next(this.end_, this.end_),
            (this.begin_ = this.end_),
            (this.size_ = 0);
        }),
        (h.prototype.resize = function (c) {
          var f = c - this.size();
          f > 0
            ? this.insert(this.end(), f, void 0)
            : f < 0 && this.erase((0, o.advance)(this.end(), -f), this.end());
        }),
        (h.prototype.begin = function () {
          return this.begin_;
        }),
        (h.prototype.end = function () {
          return this.end_;
        }),
        (h.prototype.size = function () {
          return this.size_;
        }),
        (h.prototype.push_front = function (c) {
          this.insert(this.begin_, c);
        }),
        (h.prototype.push_back = function (c) {
          this.insert(this.end_, c);
        }),
        (h.prototype.pop_front = function () {
          if (this.empty() === !0)
            throw l.ErrorGenerator.empty(
              this.end_.source().constructor.name,
              'pop_front',
            );
          this.erase(this.begin_);
        }),
        (h.prototype.pop_back = function () {
          if (this.empty() === !0)
            throw l.ErrorGenerator.empty(
              this.end_.source().constructor.name,
              'pop_back',
            );
          this.erase(this.end_.prev());
        }),
        (h.prototype.push = function () {
          for (var c = [], f = 0; f < arguments.length; f++)
            c[f] = arguments[f];
          if (c.length === 0) return this.size();
          var d = new s.NativeArrayIterator(c, 0),
            _ = new s.NativeArrayIterator(c, c.length);
          return this._Insert_by_range(this.end(), d, _), this.size();
        }),
        (h.prototype.insert = function (c) {
          for (var f = [], d = 1; d < arguments.length; d++)
            f[d - 1] = arguments[d];
          if (c.source() !== this.end_.source())
            throw l.ErrorGenerator.not_my_iterator(
              this.end_.source(),
              'insert',
            );
          if (c.erased_ === !0)
            throw l.ErrorGenerator.erased_iterator(
              this.end_.source(),
              'insert',
            );
          return f.length === 1
            ? this._Insert_by_repeating_val(c, 1, f[0])
            : f.length === 2 && typeof f[0] == 'number'
            ? this._Insert_by_repeating_val(c, f[0], f[1])
            : this._Insert_by_range(c, f[0], f[1]);
        }),
        (h.prototype._Insert_by_repeating_val = function (c, f, d) {
          var _ = new i.Repeater(0, d),
            p = new i.Repeater(f);
          return this._Insert_by_range(c, _, p);
        }),
        (h.prototype._Insert_by_range = function (c, f, d) {
          for (
            var _ = c.prev(), p = null, v = 0, b = f;
            b.equals(d) === !1;
            b = b.next()
          ) {
            var E = this._Create_iterator(_, null, b.value);
            v === 0 && (p = E), r.ListIterator._Set_next(_, E), (_ = E), ++v;
          }
          return (
            c.equals(this.begin()) === !0 && (this.begin_ = p),
            r.ListIterator._Set_next(_, c),
            r.ListIterator._Set_prev(c, _),
            (this.size_ += v),
            p
          );
        }),
        (h.prototype.erase = function (c, f) {
          return f === void 0 && (f = c.next()), this._Erase_by_range(c, f);
        }),
        (h.prototype._Erase_by_range = function (c, f) {
          if (c.source() !== this.end_.source())
            throw l.ErrorGenerator.not_my_iterator(
              this.end_.source(),
              'insert',
            );
          if (c.erased_ === !0)
            throw l.ErrorGenerator.erased_iterator(
              this.end_.source(),
              'insert',
            );
          if (c.equals(this.end_)) return this.end_;
          var d = c.prev();
          r.ListIterator._Set_next(d, f), r.ListIterator._Set_prev(f, d);
          for (var _ = c; !_.equals(f); _ = _.next())
            (_.erased_ = !0), --this.size_;
          return c.equals(this.begin_) && (this.begin_ = f), f;
        }),
        (h.prototype.swap = function (c) {
          var f, d, _;
          (f = e([c.begin_, this.begin_], 2)),
            (this.begin_ = f[0]),
            (c.begin_ = f[1]),
            (d = e([c.end_, this.end_], 2)),
            (this.end_ = d[0]),
            (c.end_ = d[1]),
            (_ = e([c.size_, this.size_], 2)),
            (this.size_ = _[0]),
            (c.size_ = _[1]);
        }),
        h
      );
    })(t.Container);
  return (St.ListContainer = a), St;
}
var qt = {},
  fi;
function Uo() {
  if (fi) return qt;
  (fi = 1),
    Object.defineProperty(qt, '__esModule', { value: !0 }),
    (qt.ReverseIterator = void 0);
  var n = (function () {
    function e(t) {
      this.base_ = t.prev();
    }
    return (
      (e.prototype.source = function () {
        return this.base_.source();
      }),
      (e.prototype.base = function () {
        return this.base_.next();
      }),
      Object.defineProperty(e.prototype, 'value', {
        get: function () {
          return this.base_.value;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.prev = function () {
        return this._Create_neighbor(this.base().next());
      }),
      (e.prototype.next = function () {
        return this._Create_neighbor(this.base_);
      }),
      (e.prototype.equals = function (t) {
        return this.base_.equals(t.base_);
      }),
      e
    );
  })();
  return (qt.ReverseIterator = n), qt;
}
var hi;
function $l() {
  return (
    hi ||
      ((hi = 1),
      (function (n) {
        var e =
            (A && A.__extends) ||
            (function () {
              var l = function (a, u) {
                return (
                  (l =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (h, c) {
                        h.__proto__ = c;
                      }) ||
                    function (h, c) {
                      for (var f in c)
                        Object.prototype.hasOwnProperty.call(c, f) &&
                          (h[f] = c[f]);
                    }),
                  l(a, u)
                );
              };
              return function (a, u) {
                if (typeof u != 'function' && u !== null)
                  throw new TypeError(
                    'Class extends value ' +
                      String(u) +
                      ' is not a constructor or null',
                  );
                l(a, u);
                function h() {
                  this.constructor = a;
                }
                a.prototype =
                  u === null
                    ? Object.create(u)
                    : ((h.prototype = u.prototype), new h());
              };
            })(),
          t =
            (A && A.__read) ||
            function (l, a) {
              var u = typeof Symbol == 'function' && l[Symbol.iterator];
              if (!u) return l;
              var h = u.call(l),
                c,
                f = [],
                d;
              try {
                for (; (a === void 0 || a-- > 0) && !(c = h.next()).done; )
                  f.push(c.value);
              } catch (_) {
                d = { error: _ };
              } finally {
                try {
                  c && !c.done && (u = h.return) && u.call(h);
                } finally {
                  if (d) throw d.error;
                }
              }
              return f;
            };
        Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.SetElementList = void 0);
        var r = Ho(),
          i = Yr(),
          s = Uo(),
          o = (function (l) {
            e(a, l);
            function a(u) {
              var h = l.call(this) || this;
              return (h.associative_ = u), h;
            }
            return (
              (a.prototype._Create_iterator = function (u, h, c) {
                return a.Iterator.create(this, u, h, c);
              }),
              (a._Swap_associative = function (u, h) {
                var c;
                (c = t([h.associative_, u.associative_], 2)),
                  (u.associative_ = c[0]),
                  (h.associative_ = c[1]);
              }),
              (a.prototype.associative = function () {
                return this.associative_;
              }),
              a
            );
          })(r.ListContainer);
        (n.SetElementList = o),
          (function (l) {
            var a = (function (h) {
              e(c, h);
              function c(f, d, _, p) {
                var v = h.call(this, d, _, p) || this;
                return (v.source_ = f), v;
              }
              return (
                (c.create = function (f, d, _, p) {
                  return new c(f, d, _, p);
                }),
                (c.prototype.reverse = function () {
                  return new u(this);
                }),
                (c.prototype.source = function () {
                  return this.source_.associative();
                }),
                c
              );
            })(i.ListIterator);
            l.Iterator = a;
            var u = (function (h) {
              e(c, h);
              function c() {
                return (h !== null && h.apply(this, arguments)) || this;
              }
              return (
                (c.prototype._Create_neighbor = function (f) {
                  return new c(f);
                }),
                c
              );
            })(s.ReverseIterator);
            l.ReverseIterator = u;
          })((o = n.SetElementList || (n.SetElementList = {}))),
          (n.SetElementList = o);
      })(Er)),
    Er
  );
}
var It = {},
  Pt = {},
  di;
function Bo() {
  if (di) return Pt;
  di = 1;
  var n =
    (A && A.__values) ||
    function (i) {
      var s = typeof Symbol == 'function' && Symbol.iterator,
        o = s && i[s],
        l = 0;
      if (o) return o.call(i);
      if (i && typeof i.length == 'number')
        return {
          next: function () {
            return (
              i && l >= i.length && (i = void 0),
              { value: i && i[l++], done: !i }
            );
          },
        };
      throw new TypeError(
        s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
      );
    };
  Object.defineProperty(Pt, '__esModule', { value: !0 }),
    (Pt.HashBuckets = void 0);
  var e = (function () {
    function i(s, o) {
      (this.fetcher_ = s),
        (this.hasher_ = o),
        (this.max_load_factor_ = r),
        (this.data_ = []),
        (this.size_ = 0),
        this.initialize();
    }
    return (
      (i.prototype.clear = function () {
        (this.data_ = []), (this.size_ = 0), this.initialize();
      }),
      (i.prototype.rehash = function (s) {
        var o, l, a, u;
        s = Math.max(s, t);
        for (var h = [], c = 0; c < s; ++c) h.push([]);
        try {
          for (var f = n(this.data_), d = f.next(); !d.done; d = f.next()) {
            var _ = d.value;
            try {
              for (
                var p = ((a = void 0), n(_)), v = p.next();
                !v.done;
                v = p.next()
              ) {
                var b = v.value,
                  E = this.hasher_(this.fetcher_(b)) % h.length;
                h[E].push(b);
              }
            } catch (k) {
              a = { error: k };
            } finally {
              try {
                v && !v.done && (u = p.return) && u.call(p);
              } finally {
                if (a) throw a.error;
              }
            }
          }
        } catch (k) {
          o = { error: k };
        } finally {
          try {
            d && !d.done && (l = f.return) && l.call(f);
          } finally {
            if (o) throw o.error;
          }
        }
        this.data_ = h;
      }),
      (i.prototype.reserve = function (s) {
        s > this.capacity() &&
          ((s = Math.floor(s / this.max_load_factor_)), this.rehash(s));
      }),
      (i.prototype.initialize = function () {
        for (var s = 0; s < t; ++s) this.data_.push([]);
      }),
      (i.prototype.length = function () {
        return this.data_.length;
      }),
      (i.prototype.capacity = function () {
        return this.data_.length * this.max_load_factor_;
      }),
      (i.prototype.at = function (s) {
        return this.data_[s];
      }),
      (i.prototype.load_factor = function () {
        return this.size_ / this.length();
      }),
      (i.prototype.max_load_factor = function (s) {
        if ((s === void 0 && (s = null), s === null))
          return this.max_load_factor_;
        this.max_load_factor_ = s;
      }),
      (i.prototype.hash_function = function () {
        return this.hasher_;
      }),
      (i.prototype.index = function (s) {
        return this.hasher_(this.fetcher_(s)) % this.length();
      }),
      (i.prototype.insert = function (s) {
        var o = this.capacity();
        ++this.size_ > o && this.reserve(o * 2);
        var l = this.index(s);
        this.data_[l].push(s);
      }),
      (i.prototype.erase = function (s) {
        for (var o = this.index(s), l = this.data_[o], a = 0; a < l.length; ++a)
          if (l[a] === s) {
            l.splice(a, 1), --this.size_;
            break;
          }
      }),
      i
    );
  })();
  Pt.HashBuckets = e;
  var t = 10,
    r = 1;
  return Pt;
}
var _i;
function eu() {
  if (_i) return It;
  _i = 1;
  var n =
      (A && A.__extends) ||
      (function () {
        var o = function (l, a) {
          return (
            (o =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (u, h) {
                  u.__proto__ = h;
                }) ||
              function (u, h) {
                for (var c in h)
                  Object.prototype.hasOwnProperty.call(h, c) && (u[c] = h[c]);
              }),
            o(l, a)
          );
        };
        return function (l, a) {
          if (typeof a != 'function' && a !== null)
            throw new TypeError(
              'Class extends value ' +
                String(a) +
                ' is not a constructor or null',
            );
          o(l, a);
          function u() {
            this.constructor = l;
          }
          l.prototype =
            a === null
              ? Object.create(a)
              : ((u.prototype = a.prototype), new u());
        };
      })(),
    e =
      (A && A.__read) ||
      function (o, l) {
        var a = typeof Symbol == 'function' && o[Symbol.iterator];
        if (!a) return o;
        var u = a.call(o),
          h,
          c = [],
          f;
        try {
          for (; (l === void 0 || l-- > 0) && !(h = u.next()).done; )
            c.push(h.value);
        } catch (d) {
          f = { error: d };
        } finally {
          try {
            h && !h.done && (a = u.return) && a.call(u);
          } finally {
            if (f) throw f.error;
          }
        }
        return c;
      },
    t =
      (A && A.__values) ||
      function (o) {
        var l = typeof Symbol == 'function' && Symbol.iterator,
          a = l && o[l],
          u = 0;
        if (a) return a.call(o);
        if (o && typeof o.length == 'number')
          return {
            next: function () {
              return (
                o && u >= o.length && (o = void 0),
                { value: o && o[u++], done: !o }
              );
            },
          };
        throw new TypeError(
          l ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
        );
      };
  Object.defineProperty(It, '__esModule', { value: !0 }),
    (It.SetHashBuckets = void 0);
  var r = Bo(),
    i = (function (o) {
      n(l, o);
      function l(a, u, h) {
        var c = o.call(this, s, u) || this;
        return (c.source_ = a), (c.key_eq_ = h), c;
      }
      return (
        (l._Swap_source = function (a, u) {
          var h;
          (h = e([u.source_, a.source_], 2)),
            (a.source_ = h[0]),
            (u.source_ = h[1]);
        }),
        (l.prototype.key_eq = function () {
          return this.key_eq_;
        }),
        (l.prototype.find = function (a) {
          var u,
            h,
            c = this.hash_function()(a) % this.length(),
            f = this.at(c);
          try {
            for (var d = t(f), _ = d.next(); !_.done; _ = d.next()) {
              var p = _.value;
              if (this.key_eq_(p.value, a)) return p;
            }
          } catch (v) {
            u = { error: v };
          } finally {
            try {
              _ && !_.done && (h = d.return) && h.call(d);
            } finally {
              if (u) throw u.error;
            }
          }
          return this.source_.end();
        }),
        l
      );
    })(r.HashBuckets);
  It.SetHashBuckets = i;
  function s(o) {
    return o.value;
  }
  return It;
}
var Ye = {},
  pi;
function Qo() {
  if (pi) return Ye;
  (pi = 1),
    Object.defineProperty(Ye, '__esModule', { value: !0 }),
    (Ye.make_pair = Ye.Pair = void 0);
  var n = Jr(),
    e = Wr(),
    t = (function () {
      function i(s, o) {
        (this.first = s), (this.second = o);
      }
      return (
        (i.prototype.equals = function (s) {
          return (
            (0, e.equal_to)(this.first, s.first) &&
            (0, e.equal_to)(this.second, s.second)
          );
        }),
        (i.prototype.less = function (s) {
          return (0, e.equal_to)(this.first, s.first) === !1
            ? (0, e.less)(this.first, s.first)
            : (0, e.less)(this.second, s.second);
        }),
        (i.prototype.hashCode = function () {
          return (0, n.hash)(this.first, this.second);
        }),
        i
      );
    })();
  Ye.Pair = t;
  function r(i, s) {
    return new t(i, s);
  }
  return (Ye.make_pair = r), Ye;
}
var vi;
function tu() {
  return (
    vi ||
      ((vi = 1),
      (function (n) {
        var e =
            (A && A.__extends) ||
            (function () {
              var h = function (c, f) {
                return (
                  (h =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (d, _) {
                        d.__proto__ = _;
                      }) ||
                    function (d, _) {
                      for (var p in _)
                        Object.prototype.hasOwnProperty.call(_, p) &&
                          (d[p] = _[p]);
                    }),
                  h(c, f)
                );
              };
              return function (c, f) {
                if (typeof f != 'function' && f !== null)
                  throw new TypeError(
                    'Class extends value ' +
                      String(f) +
                      ' is not a constructor or null',
                  );
                h(c, f);
                function d() {
                  this.constructor = c;
                }
                c.prototype =
                  f === null
                    ? Object.create(f)
                    : ((d.prototype = f.prototype), new d());
              };
            })(),
          t =
            (A && A.__read) ||
            function (h, c) {
              var f = typeof Symbol == 'function' && h[Symbol.iterator];
              if (!f) return h;
              var d = f.call(h),
                _,
                p = [],
                v;
              try {
                for (; (c === void 0 || c-- > 0) && !(_ = d.next()).done; )
                  p.push(_.value);
              } catch (b) {
                v = { error: b };
              } finally {
                try {
                  _ && !_.done && (f = d.return) && f.call(d);
                } finally {
                  if (v) throw v.error;
                }
              }
              return p;
            },
          r =
            (A && A.__spreadArray) ||
            function (h, c, f) {
              if (f || arguments.length === 2)
                for (var d = 0, _ = c.length, p; d < _; d++)
                  (p || !(d in c)) &&
                    (p || (p = Array.prototype.slice.call(c, 0, d)),
                    (p[d] = c[d]));
              return h.concat(p || Array.prototype.slice.call(c));
            };
        Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.HashSet = void 0);
        var i = Wl(),
          s = No(),
          o = $l(),
          l = eu(),
          a = Qo(),
          u = (function (h) {
            e(c, h);
            function c() {
              for (var f = [], d = 0; d < arguments.length; d++)
                f[d] = arguments[d];
              var _ =
                h.call(this, function (p) {
                  return new o.SetElementList(p);
                }) || this;
              return (
                s.IHashContainer.construct.apply(
                  s.IHashContainer,
                  r(
                    [
                      _,
                      c,
                      function (p, v) {
                        _.buckets_ = new l.SetHashBuckets(_, p, v);
                      },
                    ],
                    t(f),
                    !1,
                  ),
                ),
                _
              );
            }
            return (
              (c.prototype.clear = function () {
                this.buckets_.clear(), h.prototype.clear.call(this);
              }),
              (c.prototype.swap = function (f) {
                var d, _;
                (d = t([f.data_, this.data_], 2)),
                  (this.data_ = d[0]),
                  (f.data_ = d[1]),
                  o.SetElementList._Swap_associative(this.data_, f.data_),
                  l.SetHashBuckets._Swap_source(this.buckets_, f.buckets_),
                  (_ = t([f.buckets_, this.buckets_], 2)),
                  (this.buckets_ = _[0]),
                  (f.buckets_ = _[1]);
              }),
              (c.prototype.find = function (f) {
                return this.buckets_.find(f);
              }),
              (c.prototype.begin = function (f) {
                return (
                  f === void 0 && (f = null),
                  f === null
                    ? h.prototype.begin.call(this)
                    : this.buckets_.at(f)[0]
                );
              }),
              (c.prototype.end = function (f) {
                if ((f === void 0 && (f = null), f === null))
                  return h.prototype.end.call(this);
                var d = this.buckets_.at(f);
                return d[d.length - 1].next();
              }),
              (c.prototype.rbegin = function (f) {
                return f === void 0 && (f = null), this.end(f).reverse();
              }),
              (c.prototype.rend = function (f) {
                return f === void 0 && (f = null), this.begin(f).reverse();
              }),
              (c.prototype.bucket_count = function () {
                return this.buckets_.length();
              }),
              (c.prototype.bucket_size = function (f) {
                return this.buckets_.at(f).length;
              }),
              (c.prototype.load_factor = function () {
                return this.buckets_.load_factor();
              }),
              (c.prototype.hash_function = function () {
                return this.buckets_.hash_function();
              }),
              (c.prototype.key_eq = function () {
                return this.buckets_.key_eq();
              }),
              (c.prototype.bucket = function (f) {
                return this.hash_function()(f) % this.buckets_.length();
              }),
              (c.prototype.max_load_factor = function (f) {
                return (
                  f === void 0 && (f = null), this.buckets_.max_load_factor(f)
                );
              }),
              (c.prototype.reserve = function (f) {
                this.buckets_.reserve(f);
              }),
              (c.prototype.rehash = function (f) {
                this.buckets_.rehash(f);
              }),
              (c.prototype._Insert_by_key = function (f) {
                var d = this.find(f);
                return d.equals(this.end()) === !1
                  ? new a.Pair(d, !1)
                  : (this.data_.push(f),
                    (d = d.prev()),
                    this._Handle_insert(d, d.next()),
                    new a.Pair(d, !0));
              }),
              (c.prototype._Insert_by_hint = function (f, d) {
                var _ = this.find(d);
                return (
                  _.equals(this.end()) === !0 &&
                    ((_ = this.data_.insert(f, d)),
                    this._Handle_insert(_, _.next())),
                  _
                );
              }),
              (c.prototype._Handle_insert = function (f, d) {
                for (; !f.equals(d); f = f.next()) this.buckets_.insert(f);
              }),
              (c.prototype._Handle_erase = function (f, d) {
                for (; !f.equals(d); f = f.next()) this.buckets_.erase(f);
              }),
              c
            );
          })(i.UniqueSet);
        (n.HashSet = u),
          (function (h) {
            (h.Iterator = o.SetElementList.Iterator),
              (h.ReverseIterator = o.SetElementList.ReverseIterator);
          })((u = n.HashSet || (n.HashSet = {}))),
          (n.HashSet = u);
      })(mr)),
    mr
  );
}
var Sr = {},
  Rt = {},
  At = {},
  yi;
function ru() {
  if (yi) return At;
  yi = 1;
  var n =
    (A && A.__extends) ||
    (function () {
      var i = function (s, o) {
        return (
          (i =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (l, a) {
                l.__proto__ = a;
              }) ||
            function (l, a) {
              for (var u in a)
                Object.prototype.hasOwnProperty.call(a, u) && (l[u] = a[u]);
            }),
          i(s, o)
        );
      };
      return function (s, o) {
        if (typeof o != 'function' && o !== null)
          throw new TypeError(
            'Class extends value ' +
              String(o) +
              ' is not a constructor or null',
          );
        i(s, o);
        function l() {
          this.constructor = s;
        }
        s.prototype =
          o === null
            ? Object.create(o)
            : ((l.prototype = o.prototype), new l());
      };
    })();
  Object.defineProperty(At, '__esModule', { value: !0 }),
    (At.MapContainer = void 0);
  var e = Gr(),
    t = zr(),
    r = (function (i) {
      n(s, i);
      function s(o) {
        var l = i.call(this) || this;
        return (l.data_ = o(l)), l;
      }
      return (
        (s.prototype.assign = function (o, l) {
          this.clear(), this.insert(o, l);
        }),
        (s.prototype.clear = function () {
          this.data_.clear();
        }),
        (s.prototype.begin = function () {
          return this.data_.begin();
        }),
        (s.prototype.end = function () {
          return this.data_.end();
        }),
        (s.prototype.has = function (o) {
          return !this.find(o).equals(this.end());
        }),
        (s.prototype.size = function () {
          return this.data_.size();
        }),
        (s.prototype.push = function () {
          for (var o = [], l = 0; l < arguments.length; l++)
            o[l] = arguments[l];
          var a = new t.NativeArrayIterator(o, 0),
            u = new t.NativeArrayIterator(o, o.length);
          return this.insert(a, u), this.size();
        }),
        (s.prototype.insert = function () {
          for (var o = [], l = 0; l < arguments.length; l++)
            o[l] = arguments[l];
          return o.length === 1
            ? this.emplace(o[0].first, o[0].second)
            : o[0].next instanceof Function && o[1].next instanceof Function
            ? this._Insert_by_range(o[0], o[1])
            : this.emplace_hint(o[0], o[1].first, o[1].second);
        }),
        (s.prototype.erase = function () {
          for (var o = [], l = 0; l < arguments.length; l++)
            o[l] = arguments[l];
          return o.length === 1 &&
            (!(o[0] instanceof this.end().constructor) ||
              o[0].source() !== this)
            ? this._Erase_by_key(o[0])
            : o.length === 1
            ? this._Erase_by_range(o[0])
            : this._Erase_by_range(o[0], o[1]);
        }),
        (s.prototype._Erase_by_range = function (o, l) {
          l === void 0 && (l = o.next());
          var a = this.data_.erase(o, l);
          return this._Handle_erase(o, l), a;
        }),
        s
      );
    })(e.Container);
  return (At.MapContainer = r), At;
}
var bi;
function nu() {
  if (bi) return Rt;
  bi = 1;
  var n =
      (A && A.__extends) ||
      (function () {
        var o = function (l, a) {
          return (
            (o =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (u, h) {
                  u.__proto__ = h;
                }) ||
              function (u, h) {
                for (var c in h)
                  Object.prototype.hasOwnProperty.call(h, c) && (u[c] = h[c]);
              }),
            o(l, a)
          );
        };
        return function (l, a) {
          if (typeof a != 'function' && a !== null)
            throw new TypeError(
              'Class extends value ' +
                String(a) +
                ' is not a constructor or null',
            );
          o(l, a);
          function u() {
            this.constructor = l;
          }
          l.prototype =
            a === null
              ? Object.create(a)
              : ((u.prototype = a.prototype), new u());
        };
      })(),
    e =
      (A && A.__read) ||
      function (o, l) {
        var a = typeof Symbol == 'function' && o[Symbol.iterator];
        if (!a) return o;
        var u = a.call(o),
          h,
          c = [],
          f;
        try {
          for (; (l === void 0 || l-- > 0) && !(h = u.next()).done; )
            c.push(h.value);
        } catch (d) {
          f = { error: d };
        } finally {
          try {
            h && !h.done && (a = u.return) && a.call(u);
          } finally {
            if (f) throw f.error;
          }
        }
        return c;
      },
    t =
      (A && A.__spreadArray) ||
      function (o, l, a) {
        if (a || arguments.length === 2)
          for (var u = 0, h = l.length, c; u < h; u++)
            (c || !(u in l)) &&
              (c || (c = Array.prototype.slice.call(l, 0, u)), (c[u] = l[u]));
        return o.concat(c || Array.prototype.slice.call(l));
      };
  Object.defineProperty(Rt, '__esModule', { value: !0 }),
    (Rt.UniqueMap = void 0);
  var r = ru(),
    i = cr(),
    s = (function (o) {
      n(l, o);
      function l() {
        return (o !== null && o.apply(this, arguments)) || this;
      }
      return (
        (l.prototype.count = function (a) {
          return this.find(a).equals(this.end()) ? 0 : 1;
        }),
        (l.prototype.get = function (a) {
          var u = this.find(a);
          if (u.equals(this.end()) === !0)
            throw i.ErrorGenerator.key_nout_found(this, 'get', a);
          return u.second;
        }),
        (l.prototype.take = function (a, u) {
          var h = this.find(a);
          return h.equals(this.end())
            ? this.emplace(a, u()).first.second
            : h.second;
        }),
        (l.prototype.set = function (a, u) {
          this.insert_or_assign(a, u);
        }),
        (l.prototype.insert = function () {
          for (var a = [], u = 0; u < arguments.length; u++)
            a[u] = arguments[u];
          return o.prototype.insert.apply(this, t([], e(a), !1));
        }),
        (l.prototype._Insert_by_range = function (a, u) {
          for (var h = a; !h.equals(u); h = h.next())
            this.emplace(h.value.first, h.value.second);
        }),
        (l.prototype.insert_or_assign = function () {
          for (var a = [], u = 0; u < arguments.length; u++)
            a[u] = arguments[u];
          if (a.length === 2)
            return this._Insert_or_assign_with_key_value(a[0], a[1]);
          if (a.length === 3)
            return this._Insert_or_assign_with_hint(a[0], a[1], a[2]);
        }),
        (l.prototype._Insert_or_assign_with_key_value = function (a, u) {
          var h = this.emplace(a, u);
          return h.second === !1 && (h.first.second = u), h;
        }),
        (l.prototype._Insert_or_assign_with_hint = function (a, u, h) {
          var c = this.emplace_hint(a, u, h);
          return c.second !== h && (c.second = h), c;
        }),
        (l.prototype.extract = function (a) {
          return a instanceof this.end().constructor
            ? this._Extract_by_iterator(a)
            : this._Extract_by_key(a);
        }),
        (l.prototype._Extract_by_key = function (a) {
          var u = this.find(a);
          if (u.equals(this.end()) === !0)
            throw i.ErrorGenerator.key_nout_found(this, 'extract', a);
          var h = u.value;
          return this._Erase_by_range(u), h;
        }),
        (l.prototype._Extract_by_iterator = function (a) {
          return a.equals(this.end()) === !0
            ? this.end()
            : (this._Erase_by_range(a), a);
        }),
        (l.prototype._Erase_by_key = function (a) {
          var u = this.find(a);
          return u.equals(this.end()) === !0 ? 0 : (this._Erase_by_range(u), 1);
        }),
        (l.prototype.merge = function (a) {
          for (var u = a.begin(); !u.equals(a.end()); )
            this.has(u.first) === !1
              ? (this.insert(u.value), (u = a.erase(u)))
              : (u = u.next());
        }),
        l
      );
    })(r.MapContainer);
  return (Rt.UniqueMap = s), Rt;
}
var wr = {},
  mi;
function iu() {
  return (
    mi ||
      ((mi = 1),
      (function (n) {
        var e =
            (A && A.__extends) ||
            (function () {
              var l = function (a, u) {
                return (
                  (l =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (h, c) {
                        h.__proto__ = c;
                      }) ||
                    function (h, c) {
                      for (var f in c)
                        Object.prototype.hasOwnProperty.call(c, f) &&
                          (h[f] = c[f]);
                    }),
                  l(a, u)
                );
              };
              return function (a, u) {
                if (typeof u != 'function' && u !== null)
                  throw new TypeError(
                    'Class extends value ' +
                      String(u) +
                      ' is not a constructor or null',
                  );
                l(a, u);
                function h() {
                  this.constructor = a;
                }
                a.prototype =
                  u === null
                    ? Object.create(u)
                    : ((h.prototype = u.prototype), new h());
              };
            })(),
          t =
            (A && A.__read) ||
            function (l, a) {
              var u = typeof Symbol == 'function' && l[Symbol.iterator];
              if (!u) return l;
              var h = u.call(l),
                c,
                f = [],
                d;
              try {
                for (; (a === void 0 || a-- > 0) && !(c = h.next()).done; )
                  f.push(c.value);
              } catch (_) {
                d = { error: _ };
              } finally {
                try {
                  c && !c.done && (u = h.return) && u.call(h);
                } finally {
                  if (d) throw d.error;
                }
              }
              return f;
            };
        Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.MapElementList = void 0);
        var r = Ho(),
          i = Yr(),
          s = Uo(),
          o = (function (l) {
            e(a, l);
            function a(u) {
              var h = l.call(this) || this;
              return (h.associative_ = u), h;
            }
            return (
              (a.prototype._Create_iterator = function (u, h, c) {
                return a.Iterator.create(this, u, h, c);
              }),
              (a._Swap_associative = function (u, h) {
                var c;
                (c = t([h.associative_, u.associative_], 2)),
                  (u.associative_ = c[0]),
                  (h.associative_ = c[1]);
              }),
              (a.prototype.associative = function () {
                return this.associative_;
              }),
              a
            );
          })(r.ListContainer);
        (n.MapElementList = o),
          (function (l) {
            var a = (function (h) {
              e(c, h);
              function c(f, d, _, p) {
                var v = h.call(this, d, _, p) || this;
                return (v.list_ = f), v;
              }
              return (
                (c.create = function (f, d, _, p) {
                  return new c(f, d, _, p);
                }),
                (c.prototype.reverse = function () {
                  return new u(this);
                }),
                (c.prototype.source = function () {
                  return this.list_.associative();
                }),
                Object.defineProperty(c.prototype, 'first', {
                  get: function () {
                    return this.value.first;
                  },
                  enumerable: !1,
                  configurable: !0,
                }),
                Object.defineProperty(c.prototype, 'second', {
                  get: function () {
                    return this.value.second;
                  },
                  set: function (f) {
                    this.value.second = f;
                  },
                  enumerable: !1,
                  configurable: !0,
                }),
                c
              );
            })(i.ListIterator);
            l.Iterator = a;
            var u = (function (h) {
              e(c, h);
              function c() {
                return (h !== null && h.apply(this, arguments)) || this;
              }
              return (
                (c.prototype._Create_neighbor = function (f) {
                  return new c(f);
                }),
                Object.defineProperty(c.prototype, 'first', {
                  get: function () {
                    return this.base_.first;
                  },
                  enumerable: !1,
                  configurable: !0,
                }),
                Object.defineProperty(c.prototype, 'second', {
                  get: function () {
                    return this.base_.second;
                  },
                  set: function (f) {
                    this.base_.second = f;
                  },
                  enumerable: !1,
                  configurable: !0,
                }),
                c
              );
            })(s.ReverseIterator);
            l.ReverseIterator = u;
          })((o = n.MapElementList || (n.MapElementList = {}))),
          (n.MapElementList = o);
      })(wr)),
    wr
  );
}
var Tt = {},
  gi;
function ou() {
  if (gi) return Tt;
  gi = 1;
  var n =
      (A && A.__extends) ||
      (function () {
        var o = function (l, a) {
          return (
            (o =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (u, h) {
                  u.__proto__ = h;
                }) ||
              function (u, h) {
                for (var c in h)
                  Object.prototype.hasOwnProperty.call(h, c) && (u[c] = h[c]);
              }),
            o(l, a)
          );
        };
        return function (l, a) {
          if (typeof a != 'function' && a !== null)
            throw new TypeError(
              'Class extends value ' +
                String(a) +
                ' is not a constructor or null',
            );
          o(l, a);
          function u() {
            this.constructor = l;
          }
          l.prototype =
            a === null
              ? Object.create(a)
              : ((u.prototype = a.prototype), new u());
        };
      })(),
    e =
      (A && A.__read) ||
      function (o, l) {
        var a = typeof Symbol == 'function' && o[Symbol.iterator];
        if (!a) return o;
        var u = a.call(o),
          h,
          c = [],
          f;
        try {
          for (; (l === void 0 || l-- > 0) && !(h = u.next()).done; )
            c.push(h.value);
        } catch (d) {
          f = { error: d };
        } finally {
          try {
            h && !h.done && (a = u.return) && a.call(u);
          } finally {
            if (f) throw f.error;
          }
        }
        return c;
      },
    t =
      (A && A.__values) ||
      function (o) {
        var l = typeof Symbol == 'function' && Symbol.iterator,
          a = l && o[l],
          u = 0;
        if (a) return a.call(o);
        if (o && typeof o.length == 'number')
          return {
            next: function () {
              return (
                o && u >= o.length && (o = void 0),
                { value: o && o[u++], done: !o }
              );
            },
          };
        throw new TypeError(
          l ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
        );
      };
  Object.defineProperty(Tt, '__esModule', { value: !0 }),
    (Tt.MapHashBuckets = void 0);
  var r = Bo(),
    i = (function (o) {
      n(l, o);
      function l(a, u, h) {
        var c = o.call(this, s, u) || this;
        return (c.source_ = a), (c.key_eq_ = h), c;
      }
      return (
        (l._Swap_source = function (a, u) {
          var h;
          (h = e([u.source_, a.source_], 2)),
            (a.source_ = h[0]),
            (u.source_ = h[1]);
        }),
        (l.prototype.key_eq = function () {
          return this.key_eq_;
        }),
        (l.prototype.find = function (a) {
          var u,
            h,
            c = this.hash_function()(a) % this.length(),
            f = this.at(c);
          try {
            for (var d = t(f), _ = d.next(); !_.done; _ = d.next()) {
              var p = _.value;
              if (this.key_eq_(p.first, a)) return p;
            }
          } catch (v) {
            u = { error: v };
          } finally {
            try {
              _ && !_.done && (h = d.return) && h.call(d);
            } finally {
              if (u) throw u.error;
            }
          }
          return this.source_.end();
        }),
        l
      );
    })(r.HashBuckets);
  Tt.MapHashBuckets = i;
  function s(o) {
    return o.first;
  }
  return Tt;
}
var Mt = {},
  ki;
function su() {
  if (ki) return Mt;
  (ki = 1),
    Object.defineProperty(Mt, '__esModule', { value: !0 }),
    (Mt.Entry = void 0);
  var n = Jr(),
    e = Wr(),
    t = (function () {
      function r(i, s) {
        (this.first = i), (this.second = s);
      }
      return (
        (r.prototype.equals = function (i) {
          return (0, e.equal_to)(this.first, i.first);
        }),
        (r.prototype.less = function (i) {
          return (0, e.less)(this.first, i.first);
        }),
        (r.prototype.hashCode = function () {
          return (0, n.hash)(this.first);
        }),
        r
      );
    })();
  return (Mt.Entry = t), Mt;
}
var Oi;
function au() {
  return (
    Oi ||
      ((Oi = 1),
      (function (n) {
        var e =
            (A && A.__extends) ||
            (function () {
              var c = function (f, d) {
                return (
                  (c =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (_, p) {
                        _.__proto__ = p;
                      }) ||
                    function (_, p) {
                      for (var v in p)
                        Object.prototype.hasOwnProperty.call(p, v) &&
                          (_[v] = p[v]);
                    }),
                  c(f, d)
                );
              };
              return function (f, d) {
                if (typeof d != 'function' && d !== null)
                  throw new TypeError(
                    'Class extends value ' +
                      String(d) +
                      ' is not a constructor or null',
                  );
                c(f, d);
                function _() {
                  this.constructor = f;
                }
                f.prototype =
                  d === null
                    ? Object.create(d)
                    : ((_.prototype = d.prototype), new _());
              };
            })(),
          t =
            (A && A.__read) ||
            function (c, f) {
              var d = typeof Symbol == 'function' && c[Symbol.iterator];
              if (!d) return c;
              var _ = d.call(c),
                p,
                v = [],
                b;
              try {
                for (; (f === void 0 || f-- > 0) && !(p = _.next()).done; )
                  v.push(p.value);
              } catch (E) {
                b = { error: E };
              } finally {
                try {
                  p && !p.done && (d = _.return) && d.call(_);
                } finally {
                  if (b) throw b.error;
                }
              }
              return v;
            },
          r =
            (A && A.__spreadArray) ||
            function (c, f, d) {
              if (d || arguments.length === 2)
                for (var _ = 0, p = f.length, v; _ < p; _++)
                  (v || !(_ in f)) &&
                    (v || (v = Array.prototype.slice.call(f, 0, _)),
                    (v[_] = f[_]));
              return c.concat(v || Array.prototype.slice.call(f));
            };
        Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.HashMap = void 0);
        var i = nu(),
          s = No(),
          o = iu(),
          l = ou(),
          a = su(),
          u = Qo(),
          h = (function (c) {
            e(f, c);
            function f() {
              for (var d = [], _ = 0; _ < arguments.length; _++)
                d[_] = arguments[_];
              var p =
                c.call(this, function (v) {
                  return new o.MapElementList(v);
                }) || this;
              return (
                s.IHashContainer.construct.apply(
                  s.IHashContainer,
                  r(
                    [
                      p,
                      f,
                      function (v, b) {
                        p.buckets_ = new l.MapHashBuckets(p, v, b);
                      },
                    ],
                    t(d),
                    !1,
                  ),
                ),
                p
              );
            }
            return (
              (f.prototype.clear = function () {
                this.buckets_.clear(), c.prototype.clear.call(this);
              }),
              (f.prototype.swap = function (d) {
                var _, p;
                (_ = t([d.data_, this.data_], 2)),
                  (this.data_ = _[0]),
                  (d.data_ = _[1]),
                  o.MapElementList._Swap_associative(this.data_, d.data_),
                  l.MapHashBuckets._Swap_source(this.buckets_, d.buckets_),
                  (p = t([d.buckets_, this.buckets_], 2)),
                  (this.buckets_ = p[0]),
                  (d.buckets_ = p[1]);
              }),
              (f.prototype.find = function (d) {
                return this.buckets_.find(d);
              }),
              (f.prototype.begin = function (d) {
                return (
                  d === void 0 && (d = null),
                  d === null
                    ? c.prototype.begin.call(this)
                    : this.buckets_.at(d)[0]
                );
              }),
              (f.prototype.end = function (d) {
                if ((d === void 0 && (d = null), d === null))
                  return c.prototype.end.call(this);
                var _ = this.buckets_.at(d);
                return _[_.length - 1].next();
              }),
              (f.prototype.rbegin = function (d) {
                return d === void 0 && (d = null), this.end(d).reverse();
              }),
              (f.prototype.rend = function (d) {
                return d === void 0 && (d = null), this.begin(d).reverse();
              }),
              (f.prototype.bucket_count = function () {
                return this.buckets_.length();
              }),
              (f.prototype.bucket_size = function (d) {
                return this.buckets_.at(d).length;
              }),
              (f.prototype.load_factor = function () {
                return this.buckets_.load_factor();
              }),
              (f.prototype.hash_function = function () {
                return this.buckets_.hash_function();
              }),
              (f.prototype.key_eq = function () {
                return this.buckets_.key_eq();
              }),
              (f.prototype.bucket = function (d) {
                return this.hash_function()(d) % this.buckets_.length();
              }),
              (f.prototype.max_load_factor = function (d) {
                return (
                  d === void 0 && (d = null), this.buckets_.max_load_factor(d)
                );
              }),
              (f.prototype.reserve = function (d) {
                this.buckets_.reserve(d);
              }),
              (f.prototype.rehash = function (d) {
                this.buckets_.rehash(d);
              }),
              (f.prototype.emplace = function (d, _) {
                var p = this.find(d);
                return p.equals(this.end()) === !1
                  ? new u.Pair(p, !1)
                  : (this.data_.push(new a.Entry(d, _)),
                    (p = p.prev()),
                    this._Handle_insert(p, p.next()),
                    new u.Pair(p, !0));
              }),
              (f.prototype.emplace_hint = function (d, _, p) {
                var v = this.find(_);
                return (
                  v.equals(this.end()) === !0 &&
                    ((v = this.data_.insert(d, new a.Entry(_, p))),
                    this._Handle_insert(v, v.next())),
                  v
                );
              }),
              (f.prototype._Handle_insert = function (d, _) {
                for (; !d.equals(_); d = d.next()) this.buckets_.insert(d);
              }),
              (f.prototype._Handle_erase = function (d, _) {
                for (; !d.equals(_); d = d.next()) this.buckets_.erase(d);
              }),
              f
            );
          })(i.UniqueMap);
        (n.HashMap = h),
          (function (c) {
            (c.Iterator = o.MapElementList.Iterator),
              (c.ReverseIterator = o.MapElementList.ReverseIterator);
          })((h = n.HashMap || (n.HashMap = {}))),
          (n.HashMap = h);
      })(Sr)),
    Sr
  );
}
var Ei;
function lu() {
  if (Ei) return Qt;
  Ei = 1;
  var n =
    (A && A.__values) ||
    function (i) {
      var s = typeof Symbol == 'function' && i[Symbol.iterator],
        o = 0;
      return s
        ? s.call(i)
        : {
            next: function () {
              return (
                i && o >= i.length && (i = void 0),
                { value: i && i[o++], done: !i }
              );
            },
          };
    };
  Object.defineProperty(Qt, '__esModule', { value: !0 });
  var e = tu(),
    t = au(),
    r = (function () {
      function i() {
        (this.listeners_ = new t.HashMap()), (this.created_at_ = new Date());
      }
      return (
        (i.prototype.dispatchEvent = function (s) {
          var o,
            l,
            a = this.listeners_.find(s.type);
          if (!a.equals(this.listeners_.end())) {
            (s.target = this),
              (s.timeStamp = new Date().getTime() - this.created_at_.getTime());
            try {
              for (var u = n(a.second), h = u.next(); !h.done; h = u.next()) {
                var c = h.value;
                c(s);
              }
            } catch (f) {
              o = { error: f };
            } finally {
              try {
                h && !h.done && (l = u.return) && l.call(u);
              } finally {
                if (o) throw o.error;
              }
            }
          }
        }),
        (i.prototype.addEventListener = function (s, o) {
          var l = this.listeners_.find(s);
          l.equals(this.listeners_.end()) &&
            (l = this.listeners_.emplace(s, new e.HashSet()).first),
            l.second.insert(o);
        }),
        (i.prototype.removeEventListener = function (s, o) {
          var l = this.listeners_.find(s);
          l.equals(this.listeners_.end()) ||
            (l.second.erase(o), l.second.empty() && this.listeners_.erase(l));
        }),
        i
      );
    })();
  return (Qt.EventTarget = r), Qt;
}
var Kt = {},
  Si;
function fr() {
  if (Si) return Kt;
  (Si = 1), Object.defineProperty(Kt, '__esModule', { value: !0 });
  var n = (function () {
    function e(t, r) {
      (this.type = t), r && Object.assign(this, r);
    }
    return e;
  })();
  return (Kt.Event = n), Kt;
}
var Vt = {},
  wi;
function uu() {
  if (wi) return Vt;
  wi = 1;
  var n =
    (A && A.__extends) ||
    (function () {
      var r = function (i, s) {
        return (
          (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (o, l) {
                o.__proto__ = l;
              }) ||
            function (o, l) {
              for (var a in l) l.hasOwnProperty(a) && (o[a] = l[a]);
            }),
          r(i, s)
        );
      };
      return function (i, s) {
        r(i, s);
        function o() {
          this.constructor = i;
        }
        i.prototype =
          s === null
            ? Object.create(s)
            : ((o.prototype = s.prototype), new o());
      };
    })();
  Object.defineProperty(Vt, '__esModule', { value: !0 });
  var e = fr(),
    t = (function (r) {
      n(i, r);
      function i(s, o) {
        return r.call(this, s, o) || this;
      }
      return i;
    })(e.Event);
  return (Vt.CloseEvent = t), Vt;
}
var Gt = {},
  Ci;
function cu() {
  if (Ci) return Gt;
  Ci = 1;
  var n =
    (A && A.__extends) ||
    (function () {
      var r = function (i, s) {
        return (
          (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (o, l) {
                o.__proto__ = l;
              }) ||
            function (o, l) {
              for (var a in l) l.hasOwnProperty(a) && (o[a] = l[a]);
            }),
          r(i, s)
        );
      };
      return function (i, s) {
        r(i, s);
        function o() {
          this.constructor = i;
        }
        i.prototype =
          s === null
            ? Object.create(s)
            : ((o.prototype = s.prototype), new o());
      };
    })();
  Object.defineProperty(Gt, '__esModule', { value: !0 });
  var e = fr(),
    t = (function (r) {
      n(i, r);
      function i(s, o) {
        return r.call(this, s, o) || this;
      }
      return i;
    })(e.Event);
  return (Gt.MessageEvent = t), Gt;
}
var zt = {},
  qi;
function fu() {
  if (qi) return zt;
  qi = 1;
  var n =
    (A && A.__extends) ||
    (function () {
      var r = function (i, s) {
        return (
          (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (o, l) {
                o.__proto__ = l;
              }) ||
            function (o, l) {
              for (var a in l) l.hasOwnProperty(a) && (o[a] = l[a]);
            }),
          r(i, s)
        );
      };
      return function (i, s) {
        r(i, s);
        function o() {
          this.constructor = i;
        }
        i.prototype =
          s === null
            ? Object.create(s)
            : ((o.prototype = s.prototype), new o());
      };
    })();
  Object.defineProperty(zt, '__esModule', { value: !0 });
  var e = fr(),
    t = (function (r) {
      n(i, r);
      function i(s, o) {
        return r.call(this, s, o) || this;
      }
      return i;
    })(e.Event);
  return (zt.ErrorEvent = t), zt;
}
var Ii;
function hu() {
  return (
    Ii ||
      ((Ii = 1),
      (function (n) {
        var e =
            (A && A.__extends) ||
            (function () {
              var c = function (f, d) {
                return (
                  (c =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (_, p) {
                        _.__proto__ = p;
                      }) ||
                    function (_, p) {
                      for (var v in p) p.hasOwnProperty(v) && (_[v] = p[v]);
                    }),
                  c(f, d)
                );
              };
              return function (f, d) {
                c(f, d);
                function _() {
                  this.constructor = f;
                }
                f.prototype =
                  d === null
                    ? Object.create(d)
                    : ((_.prototype = d.prototype), new _());
              };
            })(),
          t =
            (A && A.__assign) ||
            function () {
              return (
                (t =
                  Object.assign ||
                  function (c) {
                    for (var f, d = 1, _ = arguments.length; d < _; d++) {
                      f = arguments[d];
                      for (var p in f)
                        Object.prototype.hasOwnProperty.call(f, p) &&
                          (c[p] = f[p]);
                    }
                    return c;
                  }),
                t.apply(this, arguments)
              );
            };
        Object.defineProperty(n, '__esModule', { value: !0 });
        var r = Kl(),
          i = lu(),
          s = fr(),
          o = uu(),
          l = cu(),
          a = fu(),
          u = (function (c) {
            e(f, c);
            function f(d, _) {
              var p = c.call(this) || this;
              return (
                (p.on_ = {}),
                (p.state_ = f.CONNECTING),
                (p.client_ = new r.client()),
                p.client_.on('connect', p._Handle_connect.bind(p)),
                p.client_.on('connectFailed', p._Handle_error.bind(p)),
                typeof _ == 'string' && (_ = [_]),
                p.client_.connect(d, _),
                p
              );
            }
            return (
              (f.prototype.close = function (d, _) {
                (this.state_ = f.CLOSING),
                  d === void 0
                    ? this.connection_.sendCloseFrame()
                    : this.connection_.sendCloseFrame(d, _, !0);
              }),
              (f.prototype.send = function (d) {
                if (typeof d.valueOf() == 'string') this.connection_.sendUTF(d);
                else {
                  var _ = void 0;
                  d instanceof Buffer
                    ? (_ = d)
                    : d instanceof Blob
                    ? (_ = new Buffer(d, 'blob'))
                    : d.buffer
                    ? (_ = new Buffer(d.buffer))
                    : (_ = new Buffer(d)),
                    this.connection_.sendBytes(_);
                }
              }),
              Object.defineProperty(f.prototype, 'url', {
                get: function () {
                  return this.client_.url.href;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(f.prototype, 'protocol', {
                get: function () {
                  return this.client_.protocols
                    ? this.client_.protocols[0]
                    : '';
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(f.prototype, 'extensions', {
                get: function () {
                  return this.connection_ && this.connection_.extensions
                    ? this.connection_.extensions[0].name
                    : '';
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(f.prototype, 'readyState', {
                get: function () {
                  return this.state_;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(f.prototype, 'bufferedAmount', {
                get: function () {
                  return this.connection_.bytesWaitingToFlush;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(f.prototype, 'binaryType', {
                get: function () {
                  return 'arraybuffer';
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(f.prototype, 'onopen', {
                get: function () {
                  return this.on_.open;
                },
                set: function (d) {
                  this._Set_on('open', d);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(f.prototype, 'onclose', {
                get: function () {
                  return this.on_.close;
                },
                set: function (d) {
                  this._Set_on('close', d);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(f.prototype, 'onmessage', {
                get: function () {
                  return this.on_.message;
                },
                set: function (d) {
                  this._Set_on('message', d);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(f.prototype, 'onerror', {
                get: function () {
                  return this.on_.error;
                },
                set: function (d) {
                  this._Set_on('error', d);
                },
                enumerable: !0,
                configurable: !0,
              }),
              (f.prototype._Set_on = function (d, _) {
                this.on_[d] && this.removeEventListener(d, this.on_[d]),
                  this.addEventListener(d, _),
                  (this.on_[d] = _);
              }),
              (f.prototype._Handle_connect = function (d) {
                (this.connection_ = d),
                  (this.state_ = f.OPEN),
                  this.connection_.on(
                    'message',
                    this._Handle_message.bind(this),
                  ),
                  this.connection_.on('error', this._Handle_error.bind(this)),
                  this.connection_.on('close', this._Handle_close.bind(this));
                var _ = new s.Event('open', h);
                this.dispatchEvent(_);
              }),
              (f.prototype._Handle_close = function (d, _) {
                var p = new o.CloseEvent(
                  'close',
                  t({}, h, { code: d, reason: _ }),
                );
                (this.state_ = f.CLOSED), this.dispatchEvent(p);
              }),
              (f.prototype._Handle_message = function (d) {
                var _ = new l.MessageEvent(
                  'message',
                  t({}, h, { data: d.binaryData ? d.binaryData : d.utf8Data }),
                );
                this.dispatchEvent(_);
              }),
              (f.prototype._Handle_error = function (d) {
                var _ = new a.ErrorEvent(
                  'error',
                  t({}, h, { error: d, message: d.message }),
                );
                this.state_ === f.CONNECTING && (this.state_ = f.CLOSED),
                  this.dispatchEvent(_);
              }),
              f
            );
          })(i.EventTarget);
        (n.WebSocket = u),
          (function (c) {
            (c.CONNECTING = 0), (c.OPEN = 1), (c.CLOSING = 2), (c.CLOSED = 3);
          })((u = n.WebSocket || (n.WebSocket = {}))),
          (n.WebSocket = u);
        var h = { bubbles: !1, cancelable: !1 };
      })(pr)),
    pr
  );
}
var du = Ut;
du.is_node() && (A.WebSocket = hu().WebSocket);
const Ic = it([]),
  Pc = it(!1),
  Rc = [
    'wss://relay.nostr.band',
    'wss://nostr.wine',
    'wss://yabu.me',
    'wss://universe.nostrich.land',
  ];
function Pi(n) {
  let e,
    t,
    r,
    i,
    s = JSON.parse(n[1][0].value.metadata.content).picture,
    o,
    l,
    a,
    u,
    h,
    c,
    f,
    d,
    _,
    p,
    v = JSON.parse(n[1][0].value.metadata.content).about + '',
    b,
    E,
    k,
    O,
    I,
    S,
    j,
    M = JSON.stringify(n[1][0].value.metadata, void 0, 4) + '',
    P,
    F,
    z,
    X,
    W,
    le,
    pe,
    re,
    be,
    me,
    ue,
    H,
    ge,
    ee,
    Z,
    se = n[0].buttonTextCancel + '',
    ke,
    te,
    we,
    x = s && Ri(n);
  return {
    c() {
      (e = w('div')),
        (t = w('div')),
        (r = w('div')),
        (i = w('div')),
        x && x.c(),
        (o = B()),
        (l = w('div')),
        (a = w('img')),
        (h = B()),
        (c = w('div')),
        (f = w('div')),
        (d = L('about')),
        (_ = B()),
        (p = w('div')),
        (b = L(v)),
        (E = B()),
        (k = w('div')),
        (O = w('div')),
        (I = L('profileJSON')),
        (S = B()),
        (j = w('div')),
        (P = L(M)),
        (F = B()),
        (z = w('div')),
        (X = w('div')),
        (W = w('button')),
        (le = L('copy pubKey')),
        (pe = B()),
        (re = w('button')),
        (be = L('copy hexKey')),
        (me = B()),
        (ue = w('div')),
        (H = w('button')),
        (ge = L('Open in external app')),
        (ee = B()),
        (Z = w('button')),
        (ke = L(se)),
        this.h();
    },
    l(Ie) {
      e = C(Ie, 'DIV', { class: !0 });
      var R = q(e);
      t = C(R, 'DIV', { class: !0 });
      var ne = q(t);
      r = C(ne, 'DIV', { class: !0 });
      var Ae = q(r);
      i = C(Ae, 'DIV', { class: !0 });
      var st = q(i);
      x && x.l(st), st.forEach(m), (o = Q(Ae)), (l = C(Ae, 'DIV', {}));
      var je = q(l);
      (a = C(je, 'IMG', { class: !0, src: !0, alt: !0 })),
        je.forEach(m),
        Ae.forEach(m),
        (h = Q(ne)),
        (c = C(ne, 'DIV', { class: !0 }));
      var Y = q(c);
      f = C(Y, 'DIV', { class: !0 });
      var at = q(f);
      (d = N(at, 'about')),
        at.forEach(m),
        (_ = Q(Y)),
        (p = C(Y, 'DIV', { class: !0 }));
      var lt = q(p);
      (b = N(lt, v)),
        lt.forEach(m),
        Y.forEach(m),
        (E = Q(ne)),
        (k = C(ne, 'DIV', { class: !0 }));
      var Ve = q(k);
      O = C(Ve, 'DIV', { class: !0 });
      var ie = q(O);
      (I = N(ie, 'profileJSON')),
        ie.forEach(m),
        (S = Q(Ve)),
        (j = C(Ve, 'DIV', { class: !0 }));
      var ut = q(j);
      (P = N(ut, M)),
        ut.forEach(m),
        Ve.forEach(m),
        ne.forEach(m),
        (F = Q(R)),
        (z = C(R, 'DIV', { class: !0 }));
      var Ge = q(z);
      X = C(Ge, 'DIV', { class: !0 });
      var ze = q(X);
      W = C(ze, 'BUTTON', { type: !0, class: !0 });
      var ct = q(W);
      (le = N(ct, 'copy pubKey')),
        ct.forEach(m),
        (pe = Q(ze)),
        (re = C(ze, 'BUTTON', { type: !0, class: !0 }));
      var Je = q(re);
      (be = N(Je, 'copy hexKey')),
        Je.forEach(m),
        ze.forEach(m),
        (me = Q(Ge)),
        (ue = C(Ge, 'DIV', { class: !0 }));
      var We = q(ue);
      H = C(We, 'BUTTON', { type: !0, class: !0 });
      var ft = q(H);
      (ge = N(ft, 'Open in external app')),
        ft.forEach(m),
        (ee = Q(We)),
        (Z = C(We, 'BUTTON', { type: !0, class: !0 }));
      var Xr = q(Z);
      (ke = N(Xr, se)),
        Xr.forEach(m),
        We.forEach(m),
        Ge.forEach(m),
        R.forEach(m),
        this.h();
    },
    h() {
      y(
        i,
        'class',
        'w-16 h-16 rounded-lg flex justify-center overflow-hidden bg-surface-500/25',
      ),
        y(a, 'class', ''),
        ce(a.src, (u = JSON.parse(n[1][0].value.metadata.content).banner)) ||
          y(a, 'src', u),
        y(a, 'alt', ''),
        y(r, 'class', 'grid grid-cols-[auto_1fr] gap-2 max-w-md'),
        y(f, 'class', 'font-bold'),
        y(
          p,
          'class',
          'break-all whitespace-pre-wrap text-sm max-h-32 overflow-auto',
        ),
        y(
          c,
          'class',
          'rounded-sm border-4 border-dotted border-surface-300 p-1',
        ),
        y(O, 'class', 'font-bold'),
        y(
          j,
          'class',
          'break-all whitespace-pre-wrap text-sm max-h-24 overflow-auto',
        ),
        y(
          k,
          'class',
          'rounded-sm border-4 border-dotted border-surface-300 p-1',
        ),
        y(t, 'class', 'grid grid-row-[auto_auto_auto] gap-1 max-w-md'),
        y(W, 'type', 'button'),
        y(W, 'class', 'btn variant-filled-secondary p-1'),
        y(re, 'type', 'button'),
        y(re, 'class', 'btn variant-filled-secondary p-1'),
        y(X, 'class', 'grid grid-row-[auto_auto] gap-2'),
        y(H, 'type', 'button'),
        y(H, 'class', 'btn variant-filled-surface p-2'),
        y(Z, 'type', 'button'),
        y(Z, 'class', 'btn variant-filled-surface p-2'),
        y(ue, 'class', 'grid grid-row-[auto_auto] gap-2'),
        y(z, 'class', 'grid grid-cols-[auto_auto] gap-2'),
        y(e, 'class', 'modal-example-form ' + pu + ' svelte-1wtdwek');
    },
    m(Ie, R) {
      T(Ie, e, R),
        g(e, t),
        g(t, r),
        g(r, i),
        x && x.m(i, null),
        g(r, o),
        g(r, l),
        g(l, a),
        g(t, h),
        g(t, c),
        g(c, f),
        g(f, d),
        g(c, _),
        g(c, p),
        g(p, b),
        g(t, E),
        g(t, k),
        g(k, O),
        g(O, I),
        g(k, S),
        g(k, j),
        g(j, P),
        g(e, F),
        g(e, z),
        g(z, X),
        g(X, W),
        g(W, le),
        g(X, pe),
        g(X, re),
        g(re, be),
        g(z, me),
        g(z, ue),
        g(ue, H),
        g(H, ge),
        g(ue, ee),
        g(ue, Z),
        g(Z, ke),
        te ||
          ((we = [
            G(W, 'click', n[3]),
            G(re, 'click', n[4]),
            G(H, 'click', n[5]),
            G(Z, 'click', function () {
              or(n[0].onClose) && n[0].onClose.apply(this, arguments);
            }),
          ]),
          (te = !0));
    },
    p(Ie, R) {
      (n = Ie),
        R & 2 && (s = JSON.parse(n[1][0].value.metadata.content).picture),
        s
          ? x
            ? x.p(n, R)
            : ((x = Ri(n)), x.c(), x.m(i, null))
          : x && (x.d(1), (x = null)),
        R & 2 &&
          !ce(a.src, (u = JSON.parse(n[1][0].value.metadata.content).banner)) &&
          y(a, 'src', u),
        R & 2 &&
          v !== (v = JSON.parse(n[1][0].value.metadata.content).about + '') &&
          V(b, v),
        R & 2 &&
          M !== (M = JSON.stringify(n[1][0].value.metadata, void 0, 4) + '') &&
          V(P, M),
        R & 1 && se !== (se = n[0].buttonTextCancel + '') && V(ke, se);
    },
    d(Ie) {
      Ie && m(e), x && x.d(), (te = !1), Ne(we);
    },
  };
}
function Ri(n) {
  let e, t;
  return {
    c() {
      (e = w('img')), this.h();
    },
    l(r) {
      (e = C(r, 'IMG', { class: !0, src: !0, alt: !0 })), this.h();
    },
    h() {
      y(e, 'class', 'w-16 object-contain justify-center'),
        ce(e.src, (t = JSON.parse(n[1][0].value.metadata.content).picture)) ||
          y(e, 'src', t),
        y(e, 'alt', 'avatar');
    },
    m(r, i) {
      T(r, e, i);
    },
    p(r, i) {
      i & 2 &&
        !ce(e.src, (t = JSON.parse(r[1][0].value.metadata.content).picture)) &&
        y(e, 'src', t);
    },
    d(r) {
      r && m(e);
    },
  };
}
function _u(n) {
  let e,
    t = n[1][0] && Pi(n);
  return {
    c() {
      t && t.c(), (e = J());
    },
    l(r) {
      t && t.l(r), (e = J());
    },
    m(r, i) {
      t && t.m(r, i), T(r, e, i);
    },
    p(r, [i]) {
      r[1][0]
        ? t
          ? t.p(r, i)
          : ((t = Pi(r)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    i: K,
    o: K,
    d(r) {
      t && t.d(r), r && m(e);
    },
  };
}
const pu = 'card p-4  shadow-xl space-y-4 break-all';
function vu(n, e, t) {
  let r;
  et(n, Pe, (u) => t(1, (r = u)));
  let { parent: i } = e;
  function s(u) {
    var c, f;
    const h =
      u === 'npub'
        ? $.npubEncode((c = r[0]) == null ? void 0 : c.value.pubkey)
        : (f = r[0]) == null
        ? void 0
        : f.value.pubkey;
    navigator.clipboard.writeText(h).then(
      () => {
        console.log(`copied: ${h.slice(0, 15)}...`);
        const d = { message: `copied: ${h.slice(0, 15)}...`, timeout: 3e3 };
        $t.trigger(d);
      },
      () => {
        console.log('コピー失敗');
        const d = {
          message: 'failed to copy',
          timeout: 3e3,
          background: 'bg-orange-500 text-white width-filled ',
        };
        $t.trigger(d);
      },
    ),
      i.onClose();
  }
  const o = () => s('npub'),
    l = () => s('hex'),
    a = () => {
      var u;
      window.open(
        'https://nostr.com/' +
          $.npubEncode((u = r[0]) == null ? void 0 : u.value.pubkey),
        '_blank',
      ),
        i.onClose();
    };
  return (
    (n.$$set = (u) => {
      'parent' in u && t(0, (i = u.parent));
    }),
    [i, r, s, o, l, a]
  );
}
class yu extends Ce {
  constructor(e) {
    super(), qe(this, e, vu, _u, Se, { parent: 0 });
  }
}
function Ai(n) {
  let e,
    t,
    r = (n[1][0].title ?? '(title missing)') + '',
    i,
    s,
    o,
    l = JSON.stringify(n[1][0].value.note, void 0, 4) + '',
    a,
    u,
    h,
    c,
    f,
    d,
    _,
    p,
    v,
    b,
    E,
    k = n[0].buttonTextCancel + '',
    O,
    I,
    S,
    j;
  return {
    c() {
      (e = w('div')),
        (t = w('header')),
        (i = L(r)),
        (s = B()),
        (o = w('div')),
        (a = L(l)),
        (u = B()),
        (h = w('footer')),
        (c = w('div')),
        (f = w('button')),
        (d = L('copy noteID')),
        (_ = B()),
        (p = w('button')),
        (v = L('copy hexID')),
        (b = B()),
        (E = w('button')),
        (O = L(k)),
        this.h();
    },
    l(M) {
      e = C(M, 'DIV', { class: !0 });
      var P = q(e);
      t = C(P, 'HEADER', { class: !0 });
      var F = q(t);
      (i = N(F, r)), F.forEach(m), (s = Q(P)), (o = C(P, 'DIV', { class: !0 }));
      var z = q(o);
      (a = N(z, l)),
        z.forEach(m),
        (u = Q(P)),
        (h = C(P, 'FOOTER', { class: !0 }));
      var X = q(h);
      c = C(X, 'DIV', { class: !0 });
      var W = q(c);
      f = C(W, 'BUTTON', { type: !0, class: !0 });
      var le = q(f);
      (d = N(le, 'copy noteID')),
        le.forEach(m),
        (_ = Q(W)),
        (p = C(W, 'BUTTON', { type: !0, class: !0 }));
      var pe = q(p);
      (v = N(pe, 'copy hexID')),
        pe.forEach(m),
        (b = Q(W)),
        (E = C(W, 'BUTTON', { type: !0, class: !0 }));
      var re = q(E);
      (O = N(re, k)),
        re.forEach(m),
        W.forEach(m),
        X.forEach(m),
        P.forEach(m),
        this.h();
    },
    h() {
      y(t, 'class', gu),
        y(
          o,
          'class',
          'bg-surface-50-900-token break-words whitespace-pre-wrap max-h-60 overflow-auto',
        ),
        y(f, 'type', 'button'),
        y(f, 'class', 'btn variant-filled-secondary p-1'),
        y(p, 'type', 'button'),
        y(p, 'class', 'btn variant-filled-secondary p-1'),
        y(E, 'type', 'button'),
        y(E, 'class', 'btn variant-filled-surface p-2'),
        y(c, 'class', 'flex flex-wrap gap-2'),
        y(h, 'class', (I = 'modal-footer ' + n[0].regionFooter)),
        y(e, 'class', 'modal-example-form ' + mu + ' bg-surface-200-700-token');
    },
    m(M, P) {
      T(M, e, P),
        g(e, t),
        g(t, i),
        g(e, s),
        g(e, o),
        g(o, a),
        g(e, u),
        g(e, h),
        g(h, c),
        g(c, f),
        g(f, d),
        g(c, _),
        g(c, p),
        g(p, v),
        g(c, b),
        g(c, E),
        g(E, O),
        S ||
          ((j = [
            G(f, 'click', n[3]),
            G(p, 'click', n[4]),
            G(E, 'click', function () {
              or(n[0].onClose) && n[0].onClose.apply(this, arguments);
            }),
          ]),
          (S = !0));
    },
    p(M, P) {
      (n = M),
        P & 2 &&
          r !== (r = (n[1][0].title ?? '(title missing)') + '') &&
          V(i, r),
        P & 2 &&
          l !== (l = JSON.stringify(n[1][0].value.note, void 0, 4) + '') &&
          V(a, l),
        P & 1 && k !== (k = n[0].buttonTextCancel + '') && V(O, k),
        P & 1 &&
          I !== (I = 'modal-footer ' + n[0].regionFooter) &&
          y(h, 'class', I);
    },
    d(M) {
      M && m(e), (S = !1), Ne(j);
    },
  };
}
function bu(n) {
  let e,
    t = n[1][0] && Ai(n);
  return {
    c() {
      t && t.c(), (e = J());
    },
    l(r) {
      t && t.l(r), (e = J());
    },
    m(r, i) {
      t && t.m(r, i), T(r, e, i);
    },
    p(r, [i]) {
      r[1][0]
        ? t
          ? t.p(r, i)
          : ((t = Ai(r)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    i: K,
    o: K,
    d(r) {
      t && t.d(r), r && m(e);
    },
  };
}
const mu = 'card p-4  shadow-xl space-y-4 break-all',
  gu = 'text-2xl font-bold';
function ku(n, e, t) {
  let r;
  et(n, Pe, (a) => t(1, (r = a)));
  let { parent: i } = e;
  function s(a) {
    var h, c;
    const u =
      a === 'note'
        ? $.noteEncode((h = r[0]) == null ? void 0 : h.value.note.id)
        : (c = r[0]) == null
        ? void 0
        : c.value.note.id;
    navigator.clipboard.writeText(u).then(
      () => {
        console.log(`copied: ${u.slice(0, 15)}...`);
        const f = { message: `copied: ${u.slice(0, 15)}...`, timeout: 3e3 };
        $t.trigger(f);
      },
      () => {
        console.log('コピー失敗');
        const f = {
          message: 'failed to copy',
          timeout: 3e3,
          background: 'bg-orange-500 text-white width-filled ',
        };
        $t.trigger(f);
      },
    ),
      i.onClose();
  }
  const o = () => s('note'),
    l = () => s('hex');
  return (
    (n.$$set = (a) => {
      'parent' in a && t(0, (i = a.parent));
    }),
    [i, r, s, o, l]
  );
}
class Ac extends Ce {
  constructor(e) {
    super(), qe(this, e, ku, bu, Se, { parent: 0 });
  }
}
function Ti(n) {
  let e,
    t,
    r = (n[3][0].title ?? '(title missing)') + '',
    i,
    s,
    o,
    l = (n[3][0].body ?? '(body missing)') + '',
    a,
    u,
    h,
    c,
    f,
    d,
    _,
    p,
    v,
    b = n[2].kind + '',
    E,
    k,
    O,
    I,
    S,
    j,
    M,
    P,
    F = n[2].content + '',
    z,
    X,
    W,
    le,
    pe,
    re,
    be,
    me = n[2].tags + '',
    ue,
    H,
    ge,
    ee,
    Z,
    se = n[0].buttonTextCancel + '',
    ke,
    te,
    we,
    x,
    Ie,
    R,
    ne,
    Ae,
    st;
  return {
    c() {
      (e = w('div')),
        (t = w('header')),
        (i = L(r)),
        (s = B()),
        (o = w('article')),
        (a = L(l)),
        (u = B()),
        (h = w('label')),
        (c = w('textarea')),
        (f = B()),
        (d = w('div')),
        (_ = w('b')),
        (p = L('kind:')),
        (v = B()),
        (E = L(b)),
        (k = w('br')),
        (O = B()),
        (I = w('b')),
        (S = L('content:')),
        (j = w('br')),
        (M = B()),
        (P = w('span')),
        (z = L(F)),
        (X = w('br')),
        (W = B()),
        (le = w('b')),
        (pe = L('tags:')),
        (re = w('br')),
        (be = L(`
      [`)),
        (ue = L(me)),
        (H = L(']')),
        (ge = B()),
        (ee = w('footer')),
        (Z = w('button')),
        (ke = L(se)),
        (we = B()),
        (x = w('button')),
        (Ie = L('Post Note')),
        this.h();
    },
    l(je) {
      e = C(je, 'DIV', { class: !0 });
      var Y = q(e);
      t = C(Y, 'HEADER', { class: !0 });
      var at = q(t);
      (i = N(at, r)),
        at.forEach(m),
        (s = Q(Y)),
        (o = C(Y, 'ARTICLE', { class: !0 }));
      var lt = q(o);
      (a = N(lt, l)),
        lt.forEach(m),
        (u = Q(Y)),
        (h = C(Y, 'LABEL', { class: !0 }));
      var Ve = q(h);
      (c = C(Ve, 'TEXTAREA', { class: !0, rows: !0, placeholder: !0 })),
        q(c).forEach(m),
        Ve.forEach(m),
        (f = Q(Y)),
        (d = C(Y, 'DIV', { class: !0 }));
      var ie = q(d);
      _ = C(ie, 'B', {});
      var ut = q(_);
      (p = N(ut, 'kind:')),
        ut.forEach(m),
        (v = Q(ie)),
        (E = N(ie, b)),
        (k = C(ie, 'BR', {})),
        (O = Q(ie)),
        (I = C(ie, 'B', {}));
      var Ge = q(I);
      (S = N(Ge, 'content:')),
        Ge.forEach(m),
        (j = C(ie, 'BR', {})),
        (M = Q(ie)),
        (P = C(ie, 'SPAN', { class: !0 }));
      var ze = q(P);
      (z = N(ze, F)),
        ze.forEach(m),
        (X = C(ie, 'BR', {})),
        (W = Q(ie)),
        (le = C(ie, 'B', {}));
      var ct = q(le);
      (pe = N(ct, 'tags:')),
        ct.forEach(m),
        (re = C(ie, 'BR', {})),
        (be = N(
          ie,
          `
      [`,
        )),
        (ue = N(ie, me)),
        (H = N(ie, ']')),
        ie.forEach(m),
        (ge = Q(Y)),
        (ee = C(Y, 'FOOTER', { class: !0 }));
      var Je = q(ee);
      Z = C(Je, 'BUTTON', { class: !0 });
      var We = q(Z);
      (ke = N(We, se)),
        We.forEach(m),
        (we = Q(Je)),
        (x = C(Je, 'BUTTON', { class: !0 }));
      var ft = q(x);
      (Ie = N(ft, 'Post Note')),
        ft.forEach(m),
        Je.forEach(m),
        Y.forEach(m),
        this.h();
    },
    h() {
      y(t, 'class', Su),
        y(o, 'class', 'body'),
        y(c, 'class', 'textarea'),
        y(c, 'rows', '5'),
        y(
          c,
          'placeholder',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        ),
        y(h, 'class', 'label break-all whitespace-pre-wrap'),
        y(P, 'class', 'whitespace-pre-wrap'),
        y(d, 'class', 'break-all text-sm'),
        y(Z, 'class', (te = 'btn ' + n[0].buttonNeutral)),
        y(x, 'class', (R = 'btn ' + n[0].buttonPositive)),
        y(ee, 'class', (ne = 'modal-footer ' + n[0].regionFooter)),
        y(e, 'class', 'modal-example-form ' + Eu);
    },
    m(je, Y) {
      T(je, e, Y),
        g(e, t),
        g(t, i),
        g(e, s),
        g(e, o),
        g(o, a),
        g(e, u),
        g(e, h),
        g(h, c),
        Xt(c, n[1].content),
        g(e, f),
        g(e, d),
        g(d, _),
        g(_, p),
        g(d, v),
        g(d, E),
        g(d, k),
        g(d, O),
        g(d, I),
        g(I, S),
        g(d, j),
        g(d, M),
        g(d, P),
        g(P, z),
        g(d, X),
        g(d, W),
        g(d, le),
        g(le, pe),
        g(d, re),
        g(d, be),
        g(d, ue),
        g(d, H),
        g(e, ge),
        g(e, ee),
        g(ee, Z),
        g(Z, ke),
        g(ee, we),
        g(ee, x),
        g(x, Ie),
        Ae ||
          ((st = [
            G(c, 'input', n[5]),
            G(Z, 'click', function () {
              or(n[0].onClose) && n[0].onClose.apply(this, arguments);
            }),
            G(x, 'click', n[4]),
          ]),
          (Ae = !0));
    },
    p(je, Y) {
      (n = je),
        Y & 8 &&
          r !== (r = (n[3][0].title ?? '(title missing)') + '') &&
          V(i, r),
        Y & 8 && l !== (l = (n[3][0].body ?? '(body missing)') + '') && V(a, l),
        Y & 2 && Xt(c, n[1].content),
        Y & 4 && b !== (b = n[2].kind + '') && V(E, b),
        Y & 4 && F !== (F = n[2].content + '') && V(z, F),
        Y & 4 && me !== (me = n[2].tags + '') && V(ue, me),
        Y & 1 && se !== (se = n[0].buttonTextCancel + '') && V(ke, se),
        Y & 1 && te !== (te = 'btn ' + n[0].buttonNeutral) && y(Z, 'class', te),
        Y & 1 && R !== (R = 'btn ' + n[0].buttonPositive) && y(x, 'class', R),
        Y & 1 &&
          ne !== (ne = 'modal-footer ' + n[0].regionFooter) &&
          y(ee, 'class', ne);
    },
    d(je) {
      je && m(e), (Ae = !1), Ne(st);
    },
  };
}
function Ou(n) {
  let e,
    t = n[3][0] && Ti(n);
  return {
    c() {
      t && t.c(), (e = J());
    },
    l(r) {
      t && t.l(r), (e = J());
    },
    m(r, i) {
      t && t.m(r, i), T(r, e, i);
    },
    p(r, [i]) {
      r[3][0]
        ? t
          ? t.p(r, i)
          : ((t = Ti(r)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    i: K,
    o: K,
    d(r) {
      t && t.d(r), r && m(e);
    },
  };
}
const Eu = 'card p-4 w-modal shadow-xl space-y-4',
  Su = 'text-2xl font-bold';
function wu(n, e, t) {
  let r;
  et(n, Pe, (u) => t(3, (r = u)));
  let { parent: i } = e,
    s = { kind: 1, tags: r[0].value.tags, content: r[0].value.content },
    o = { content: r[0].value.content };
  function l() {
    o.content === void 0 && t(1, (o.content = ''), o),
      r[0].response && r[0].response(o),
      Pe.close();
  }
  function a() {
    (o.content = this.value), t(1, o);
  }
  return (
    (n.$$set = (u) => {
      'parent' in u && t(0, (i = u.parent));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 2 && t(2, (s.content = o.content), s);
    }),
    [i, o, s, r, l, a]
  );
}
class Tc extends Ce {
  constructor(e) {
    super(), qe(this, e, wu, Ou, Se, { parent: 0 });
  }
}
const Mi = /(:[^:\s]+:)/,
  ji = /(https?:\/\/[^\s"'<`]+)/,
  Di = /\.(?:jpg|jpeg|png|gif|webp)$/i,
  Cu = /(<marquee\b[^>]*>)/i,
  qu = /(<\/marquee>)/i,
  Fi = /(\r\n|\n|\r)/,
  Li = /(\\s+)/,
  Iu = /(nostr:[A-Za-z0-9]+(?= |　))/,
  Pu = /(nostr:[A-Za-z0-9])/;
async function Ni(n, e) {
  var l;
  const t = e.filter((a) => a[0] === 'emoji');
  let r = [];
  t.length > 0 && r.push(Mi.source),
    r.push(qu.source),
    r.push(Iu.source),
    r.push(ji.source),
    r.push(Di.source),
    r.push(Cu.source),
    r.push(Li.source),
    r.push(Fi.source);
  const i = new RegExp(r.join('|'), 'g'),
    s = n.split(i || ' '),
    o = [];
  for (let a of s)
    if (a !== void 0)
      if (a.match(Pu)) {
        const u = a.indexOf('nostr:'),
          h = a.slice(0, u),
          c = a.slice(u);
        o.push({ content: h, type: 'text', marquee: '' }),
          o.push({ content: c, type: 'nostr', url: c.slice(6), marquee: '' });
      } else if (t.length > 0 && a.match(Mi)) {
        const u =
          (l = t.find((h) => `:${h[1]}:` === a)) == null ? void 0 : l[2];
        u
          ? o.push({ content: a, type: 'emoji', url: u, marquee: '' })
          : o.push({ content: a, type: 'text', marquee: '' });
      } else
        a.match(ji)
          ? a.match(Di)
            ? o.push({ content: a, type: 'image', marquee: '' })
            : o.push({ content: a, type: 'url', marquee: '' })
          : a.match(Fi)
          ? o.push({ content: '', type: 'newline', marquee: '' })
          : a.match(Li)
          ? o.push({ content: '', type: 'space', marquee: '' })
          : o.push({ content: a, type: 'text', marquee: '' });
  return console.log(o), o;
}
function Hi(n) {
  let e,
    t,
    r,
    i,
    s,
    o,
    l = n[0].buttonTextCancel + '',
    a,
    u,
    h,
    c,
    f;
  return {
    c() {
      (e = w('div')),
        (t = w('img')),
        (i = B()),
        (s = w('footer')),
        (o = w('button')),
        (a = L(l)),
        this.h();
    },
    l(d) {
      e = C(d, 'DIV', { class: !0 });
      var _ = q(e);
      (t = C(_, 'IMG', { src: !0, alt: !0, class: !0 })),
        (i = Q(_)),
        (s = C(_, 'FOOTER', { class: !0 }));
      var p = q(s);
      o = C(p, 'BUTTON', { class: !0 });
      var v = q(o);
      (a = N(v, l)), v.forEach(m), p.forEach(m), _.forEach(m), this.h();
    },
    h() {
      var d;
      ce(t.src, (r = (d = n[1][0]) == null ? void 0 : d.image)) ||
        y(t, 'src', r),
        y(t, 'alt', ''),
        y(t, 'class', 'svelte-1scgpoe'),
        y(o, 'class', (u = 'btn ' + n[0].buttonNeutral)),
        y(s, 'class', (h = 'modal-footer ' + n[0].regionFooter)),
        y(e, 'class', 'modal-example-form ' + Au);
    },
    m(d, _) {
      T(d, e, _),
        g(e, t),
        g(e, i),
        g(e, s),
        g(s, o),
        g(o, a),
        c ||
          ((f = [
            G(t, 'click', n[2]),
            G(o, 'click', function () {
              or(n[0].onClose) && n[0].onClose.apply(this, arguments);
            }),
          ]),
          (c = !0));
    },
    p(d, _) {
      var p;
      (n = d),
        _ & 2 &&
          !ce(t.src, (r = (p = n[1][0]) == null ? void 0 : p.image)) &&
          y(t, 'src', r),
        _ & 1 && l !== (l = n[0].buttonTextCancel + '') && V(a, l),
        _ & 1 && u !== (u = 'btn ' + n[0].buttonNeutral) && y(o, 'class', u),
        _ & 1 &&
          h !== (h = 'modal-footer ' + n[0].regionFooter) &&
          y(s, 'class', h);
    },
    d(d) {
      d && m(e), (c = !1), Ne(f);
    },
  };
}
function Ru(n) {
  let e,
    t = n[1][0] && Hi(n);
  return {
    c() {
      t && t.c(), (e = J());
    },
    l(r) {
      t && t.l(r), (e = J());
    },
    m(r, i) {
      t && t.m(r, i), T(r, e, i);
    },
    p(r, [i]) {
      r[1][0]
        ? t
          ? t.p(r, i)
          : ((t = Hi(r)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    i: K,
    o: K,
    d(r) {
      t && t.d(r), r && m(e);
    },
  };
}
const Au = 'card p-4  shadow-xl space-y-4 break-all';
function Tu(n, e, t) {
  let r;
  et(n, Pe, (o) => t(1, (r = o)));
  let { parent: i } = e;
  function s() {
    var o;
    window.open((o = r[0]) == null ? void 0 : o.image, '_blank');
  }
  return (
    (n.$$set = (o) => {
      'parent' in o && t(0, (i = o.parent));
    }),
    [i, r, s]
  );
}
class Mu extends Ce {
  constructor(e) {
    super(), qe(this, e, Tu, Ru, Se, { parent: 0 });
  }
}
function ju(n) {
  let e = n[0].description.slice(0, 35) + '',
    t,
    r;
  return {
    c() {
      (t = L(e)), (r = L('...'));
    },
    l(i) {
      (t = N(i, e)), (r = N(i, '...'));
    },
    m(i, s) {
      T(i, t, s), T(i, r, s);
    },
    p(i, s) {
      s & 1 && e !== (e = i[0].description.slice(0, 35) + '') && V(t, e);
    },
    d(i) {
      i && m(t), i && m(r);
    },
  };
}
function Du(n) {
  let e = n[0].description + '',
    t;
  return {
    c() {
      t = L(e);
    },
    l(r) {
      t = N(r, e);
    },
    m(r, i) {
      T(r, t, i);
    },
    p(r, i) {
      i & 1 && e !== (e = r[0].description + '') && V(t, e);
    },
    d(r) {
      r && m(t);
    },
  };
}
function Fu(n) {
  let e,
    t,
    r,
    i,
    s,
    o,
    l,
    a,
    u,
    h,
    c,
    f = n[0].title + '',
    d,
    _,
    p;
  function v(k, O) {
    return k[0].description.length < 40 ? Du : ju;
  }
  let b = v(n),
    E = b(n);
  return {
    c() {
      (e = w('div')),
        (t = w('a')),
        (r = w('div')),
        (i = w('div')),
        (s = w('div')),
        (o = w('div')),
        (l = w('img')),
        (u = B()),
        (h = w('div')),
        (c = w('div')),
        (d = L(f)),
        (_ = B()),
        (p = w('div')),
        E.c(),
        this.h();
    },
    l(k) {
      e = C(k, 'DIV', { class: !0 });
      var O = q(e);
      t = C(O, 'A', { class: !0, href: !0, target: !0 });
      var I = q(t);
      r = C(I, 'DIV', { class: !0 });
      var S = q(r);
      i = C(S, 'DIV', { class: !0 });
      var j = q(i);
      s = C(j, 'DIV', { class: !0 });
      var M = q(s);
      o = C(M, 'DIV', { class: !0 });
      var P = q(o);
      (l = C(P, 'IMG', { class: !0, src: !0, alt: !0 })),
        P.forEach(m),
        M.forEach(m),
        j.forEach(m),
        (u = Q(S)),
        (h = C(S, 'DIV', { class: !0 }));
      var F = q(h);
      c = C(F, 'DIV', { class: !0 });
      var z = q(c);
      (d = N(z, f)), z.forEach(m), (_ = Q(F)), (p = C(F, 'DIV', { class: !0 }));
      var X = q(p);
      E.l(X),
        X.forEach(m),
        F.forEach(m),
        S.forEach(m),
        I.forEach(m),
        O.forEach(m),
        this.h();
    },
    h() {
      y(l, 'class', 'object-cover w-full h-full'),
        ce(l.src, (a = n[0].image)) || y(l, 'src', a),
        y(l, 'alt', ''),
        y(o, 'class', 'absolute inset-0 overflow-hidden'),
        y(s, 'class', 'relative h-24 w-48'),
        y(i, 'class', 'overflow-hidden h-[fit-content]'),
        y(c, 'class', 'text-sm font-bold'),
        y(p, 'class', 'text-xs'),
        y(
          h,
          'class',
          'border border-1 grid grid-rows-[auto_1fr] z-10 bg-white/50',
        ),
        y(r, 'class', 'grid grid-rowx-[auto_1fr] h-24 w-48'),
        y(t, 'class', ''),
        y(t, 'href', n[1]),
        y(t, 'target', '_blank'),
        y(
          e,
          'class',
          'card m-0 p-2 w-52 bg-primary-400 hover:bg-primary-500 z-20 break-all',
        );
    },
    m(k, O) {
      T(k, e, O),
        g(e, t),
        g(t, r),
        g(r, i),
        g(i, s),
        g(s, o),
        g(o, l),
        g(r, u),
        g(r, h),
        g(h, c),
        g(c, d),
        g(h, _),
        g(h, p),
        E.m(p, null);
    },
    p(k, [O]) {
      O & 1 && !ce(l.src, (a = k[0].image)) && y(l, 'src', a),
        O & 1 && f !== (f = k[0].title + '') && V(d, f),
        b === (b = v(k)) && E
          ? E.p(k, O)
          : (E.d(1), (E = b(k)), E && (E.c(), E.m(p, null))),
        O & 2 && y(t, 'href', k[1]);
    },
    i: K,
    o: K,
    d(k) {
      k && m(e), E.d();
    },
  };
}
function Lu(n, e, t) {
  let { ogp: r } = e,
    { url: i } = e;
  return (
    (n.$$set = (s) => {
      'ogp' in s && t(0, (r = s.ogp)), 'url' in s && t(1, (i = s.url));
    }),
    [r, i]
  );
}
class Nu extends Ce {
  constructor(e) {
    super(), qe(this, e, Lu, Fu, Se, { ogp: 0, url: 1 });
  }
}
function Ui(n, e, t) {
  const r = n.slice();
  return (r[14] = e[t]), (r[16] = t), r;
}
function Hu(n) {
  return { c: K, l: K, m: K, p: K, i: K, o: K, d: K };
}
function Uu(n) {
  let e,
    t,
    r = n[13],
    i = [];
  for (let o = 0; o < r.length; o += 1) i[o] = Wi(Ui(n, r, o));
  const s = (o) =>
    U(i[o], 1, 1, () => {
      i[o] = null;
    });
  return {
    c() {
      e = w('div');
      for (let o = 0; o < i.length; o += 1) i[o].c();
      this.h();
    },
    l(o) {
      e = C(o, 'DIV', { class: !0 });
      var l = q(e);
      for (let a = 0; a < i.length; a += 1) i[a].l(l);
      l.forEach(m), this.h();
    },
    h() {
      y(e, 'class', 'parent-container break-all whitespace-pre-wrap');
    },
    m(o, l) {
      T(o, e, l);
      for (let a = 0; a < i.length; a += 1) i[a] && i[a].m(e, null);
      t = !0;
    },
    p(o, l) {
      if (l & 262175) {
        r = o[13];
        let a;
        for (a = 0; a < r.length; a += 1) {
          const u = Ui(o, r, a);
          i[a]
            ? (i[a].p(u, l), D(i[a], 1))
            : ((i[a] = Wi(u)), i[a].c(), D(i[a], 1), i[a].m(e, null));
        }
        for (ve(), a = r.length; a < i.length; a += 1) s(a);
        ye();
      }
    },
    i(o) {
      if (!t) {
        for (let l = 0; l < r.length; l += 1) D(i[l]);
        t = !0;
      }
    },
    o(o) {
      i = i.filter(Boolean);
      for (let l = 0; l < i.length; l += 1) U(i[l]);
      t = !1;
    },
    d(o) {
      o && m(e), Zo(i, o);
    },
  };
}
function Bu(n) {
  let e,
    t,
    r = n[14].content + '',
    i,
    s,
    o,
    l = n[14].beforeSpace && Bi(n);
  return {
    c() {
      (e = w('div')), l && l.c(), (t = B()), (i = L(r)), (s = B()), this.h();
    },
    l(a) {
      e = C(a, 'DIV', { class: !0 });
      var u = q(e);
      l && l.l(u),
        (t = Q(u)),
        (i = N(u, r)),
        (s = Q(u)),
        u.forEach(m),
        this.h();
    },
    h() {
      y(
        e,
        'class',
        (o =
          n[14].marquee +
          ' break-all whitespace-pre-wrap w-[fix-content ] inline-flex'),
      );
    },
    m(a, u) {
      T(a, e, u), l && l.m(e, null), g(e, t), g(e, i), g(e, s);
    },
    p(a, u) {
      a[14].beforeSpace
        ? l
          ? l.p(a, u)
          : ((l = Bi(a)), l.c(), l.m(e, t))
        : l && (l.d(1), (l = null)),
        u & 3 && r !== (r = a[14].content + '') && V(i, r),
        u & 3 &&
          o !==
            (o =
              a[14].marquee +
              ' break-all whitespace-pre-wrap w-[fix-content ] inline-flex') &&
          y(e, 'class', o);
    },
    i: K,
    o: K,
    d(a) {
      a && m(e), l && l.d();
    },
  };
}
function Qu(n) {
  let e, t, r, i, s;
  const o = [Yu, Wu],
    l = [];
  function a(u, h) {
    return h & 3 && (e = null), e == null && (e = !!u[4](u[14].url)), e ? 0 : 1;
  }
  return (
    (t = a(n, -1)),
    (r = l[t] = o[t](n)),
    {
      c() {
        r.c(), (i = J());
      },
      l(u) {
        r.l(u), (i = J());
      },
      m(u, h) {
        l[t].m(u, h), T(u, i, h), (s = !0);
      },
      p(u, h) {
        let c = t;
        (t = a(u, h)),
          t === c
            ? l[t].p(u, h)
            : (ve(),
              U(l[c], 1, 1, () => {
                l[c] = null;
              }),
              ye(),
              (r = l[t]),
              r ? r.p(u, h) : ((r = l[t] = o[t](u)), r.c()),
              D(r, 1),
              r.m(i.parentNode, i));
      },
      i(u) {
        s || (D(r), (s = !0));
      },
      o(u) {
        U(r), (s = !1);
      },
      d(u) {
        l[t].d(u), u && m(i);
      },
    }
  );
}
function Ku(n) {
  let e,
    t,
    r,
    i,
    s,
    o,
    l,
    a,
    u = n[14].beforeSpace && Vi(n);
  function h() {
    return n[6](n[14]);
  }
  return {
    c() {
      (e = w('div')),
        u && u.c(),
        (t = B()),
        (r = w('img')),
        (s = B()),
        this.h();
    },
    l(c) {
      e = C(c, 'DIV', { class: !0 });
      var f = q(e);
      u && u.l(f),
        (t = Q(f)),
        (r = C(f, 'IMG', { class: !0, src: !0, alt: !0 })),
        (s = Q(f)),
        f.forEach(m),
        this.h();
    },
    h() {
      y(r, 'class', 'max-h-[10em] object-contain'),
        ce(r.src, (i = n[14].content)) || y(r, 'src', i),
        y(r, 'alt', ''),
        y(
          e,
          'class',
          (o = '' + n[14].marquee + ' w-[fit-content] inline-flex'),
        );
    },
    m(c, f) {
      T(c, e, f),
        u && u.m(e, null),
        g(e, t),
        g(e, r),
        g(e, s),
        l || ((a = G(r, 'click', h)), (l = !0));
    },
    p(c, f) {
      (n = c),
        n[14].beforeSpace
          ? u
            ? u.p(n, f)
            : ((u = Vi(n)), u.c(), u.m(e, t))
          : u && (u.d(1), (u = null)),
        f & 3 && !ce(r.src, (i = n[14].content)) && y(r, 'src', i),
        f & 3 &&
          o !== (o = '' + n[14].marquee + ' w-[fit-content] inline-flex') &&
          y(e, 'class', o);
    },
    i: K,
    o: K,
    d(c) {
      c && m(e), u && u.d(), (l = !1), a();
    },
  };
}
function Vu(n) {
  let e,
    t,
    r,
    i = {
      ctx: n,
      current: null,
      token: null,
      hasCatch: !1,
      pending: dc,
      then: lc,
      catch: ac,
      value: 17,
      blocks: [, , ,],
    };
  return (
    Zt((t = en(n[14].content)), i),
    {
      c() {
        (e = J()), i.block.c();
      },
      l(s) {
        (e = J()), i.block.l(s);
      },
      m(s, o) {
        T(s, e, o),
          i.block.m(s, (i.anchor = o)),
          (i.mount = () => e.parentNode),
          (i.anchor = e),
          (r = !0);
      },
      p(s, o) {
        (n = s),
          (i.ctx = n),
          (o & 3 && t !== (t = en(n[14].content)) && Zt(t, i)) || Xi(i, n, o);
      },
      i(s) {
        r || (D(i.block), (r = !0));
      },
      o(s) {
        for (let o = 0; o < 3; o += 1) {
          const l = i.blocks[o];
          U(l);
        }
        r = !1;
      },
      d(s) {
        s && m(e), i.block.d(s), (i.token = null), (i = null);
      },
    }
  );
}
function Gu(n) {
  let e,
    t,
    r,
    i,
    s,
    o,
    l,
    a,
    u = n[14].beforeSpace && Ji(n);
  function h() {
    return n[5](n[14]);
  }
  return {
    c() {
      (e = w('div')),
        u && u.c(),
        (t = B()),
        (r = w('img')),
        (s = B()),
        this.h();
    },
    l(c) {
      e = C(c, 'DIV', { class: !0 });
      var f = q(e);
      u && u.l(f),
        (t = Q(f)),
        (r = C(f, 'IMG', { class: !0, src: !0, alt: !0 })),
        (s = Q(f)),
        f.forEach(m),
        this.h();
    },
    h() {
      y(r, 'class', 'max-h-[1.5em] inline object-contain align-bottom'),
        ce(r.src, (i = n[14].url)) || y(r, 'src', i),
        y(r, 'alt', ''),
        y(
          e,
          'class',
          (o =
            n[14].marquee +
            ' w-[fit-content] break-all whitespace-pre-wrap inline-flex flex align-bottom'),
        );
    },
    m(c, f) {
      T(c, e, f),
        u && u.m(e, null),
        g(e, t),
        g(e, r),
        g(e, s),
        l || ((a = G(r, 'click', h)), (l = !0));
    },
    p(c, f) {
      (n = c),
        n[14].beforeSpace
          ? u
            ? u.p(n, f)
            : ((u = Ji(n)), u.c(), u.m(e, t))
          : u && (u.d(1), (u = null)),
        f & 3 && !ce(r.src, (i = n[14].url)) && y(r, 'src', i),
        f & 3 &&
          o !==
            (o =
              n[14].marquee +
              ' w-[fit-content] break-all whitespace-pre-wrap inline-flex flex align-bottom') &&
          y(e, 'class', o);
    },
    i: K,
    o: K,
    d(c) {
      c && m(e), u && u.d(), (l = !1), a();
    },
  };
}
function zu(n) {
  let e;
  return {
    c() {
      e = L(' ');
    },
    l(t) {
      e = N(t, ' ');
    },
    m(t, r) {
      T(t, e, r);
    },
    p: K,
    i: K,
    o: K,
    d(t) {
      t && m(e);
    },
  };
}
function Ju(n) {
  let e;
  return {
    c() {
      e = w('br');
    },
    l(t) {
      e = C(t, 'BR', {});
    },
    m(t, r) {
      T(t, e, r);
    },
    p: K,
    i: K,
    o: K,
    d(t) {
      t && m(e);
    },
  };
}
function Bi(n) {
  let e = Array(n[14].beforeSpace).fill(' ').join('') + '',
    t;
  return {
    c() {
      t = L(e);
    },
    l(r) {
      t = N(r, e);
    },
    m(r, i) {
      T(r, t, i);
    },
    p(r, i) {
      i & 3 &&
        e !== (e = Array(r[14].beforeSpace).fill(' ').join('') + '') &&
        V(t, e);
    },
    d(r) {
      r && m(t);
    },
  };
}
function Wu(n) {
  let e,
    t = n[14].content + '',
    r;
  return {
    c() {
      (e = w('span')), (r = L(t)), this.h();
    },
    l(i) {
      e = C(i, 'SPAN', { class: !0 });
      var s = q(e);
      (r = N(s, t)), s.forEach(m), this.h();
    },
    h() {
      y(e, 'class', 'text-black/80');
    },
    m(i, s) {
      T(i, e, s), g(e, r);
    },
    p(i, s) {
      s & 3 && t !== (t = i[14].content + '') && V(r, t);
    },
    i: K,
    o: K,
    d(i) {
      i && m(e);
    },
  };
}
function Yu(n) {
  let e, t, r, i, s, o, l, a, u;
  const h = [ec, $u, xu, Zu, Xu],
    c = [];
  function f(d, _) {
    return (
      _ & 3 && (e = null),
      _ & 3 && (t = null),
      _ & 3 && (r = null),
      _ & 3 && (i = null),
      _ & 3 && (s = null),
      e == null && (e = $.decode(d[14].url).type === 'note'),
      e
        ? 0
        : (t == null && (t = $.decode(d[14].url).type === 'nevent'),
          t
            ? 1
            : (r == null && (r = $.decode(d[14].url).type === 'npub'),
              r
                ? 2
                : (i == null && (i = $.decode(d[14].url).type === 'nprofile'),
                  i
                    ? 3
                    : (s == null && (s = $.decode(d[14].url).type === 'naddr'),
                      s ? 4 : -1))))
    );
  }
  return (
    ~(o = f(n, -1)) && (l = c[o] = h[o](n)),
    {
      c() {
        l && l.c(), (a = J());
      },
      l(d) {
        l && l.l(d), (a = J());
      },
      m(d, _) {
        ~o && c[o].m(d, _), T(d, a, _), (u = !0);
      },
      p(d, _) {
        let p = o;
        (o = f(d, _)),
          o === p
            ? ~o && c[o].p(d, _)
            : (l &&
                (ve(),
                U(c[p], 1, 1, () => {
                  c[p] = null;
                }),
                ye()),
              ~o
                ? ((l = c[o]),
                  l ? l.p(d, _) : ((l = c[o] = h[o](d)), l.c()),
                  D(l, 1),
                  l.m(a.parentNode, a))
                : (l = null));
      },
      i(d) {
        u || (D(l), (u = !0));
      },
      o(d) {
        U(l), (u = !1);
      },
      d(d) {
        ~o && c[o].d(d), d && m(a);
      },
    }
  );
}
function Xu(n) {
  let e,
    t = n[14].url.slice(0, 20) + '',
    r,
    i;
  return {
    c() {
      (e = w('span')),
        (r = L(t)),
        (i = L(`...
            `)),
        this.h();
    },
    l(s) {
      e = C(s, 'SPAN', { class: !0 });
      var o = q(e);
      (r = N(o, t)),
        (i = N(
          o,
          `...
            `,
        )),
        o.forEach(m),
        this.h();
    },
    h() {
      y(e, 'class', 'text-black/80');
    },
    m(s, o) {
      T(s, e, o), g(e, r), g(e, i);
    },
    p(s, o) {
      o & 3 && t !== (t = s[14].url.slice(0, 20) + '') && V(r, t);
    },
    i: K,
    o: K,
    d(s) {
      s && m(e);
    },
  };
}
function Zu(n) {
  let e, t;
  return (
    (e = new ur({
      props: {
        queryKey: ['metadata', $.decode(n[14].url).data.pubkey],
        pubkey: $.decode(n[14].url).data.pubkey,
        $$slots: {
          default: [
            tc,
            ({ metadata: r }) => ({ 18: r }),
            ({ metadata: r }) => (r ? 262144 : 0),
          ],
        },
        $$scope: { ctx: n },
      },
    })),
    {
      c() {
        De(e.$$.fragment);
      },
      l(r) {
        He(e.$$.fragment, r);
      },
      m(r, i) {
        Fe(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 3 && (s.queryKey = ['metadata', $.decode(r[14].url).data.pubkey]),
          i & 3 && (s.pubkey = $.decode(r[14].url).data.pubkey),
          i & 786435 && (s.$$scope = { dirty: i, ctx: r }),
          e.$set(s);
      },
      i(r) {
        t || (D(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        U(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        Le(e, r);
      },
    }
  );
}
function xu(n) {
  let e, t;
  return (
    (e = new ur({
      props: {
        queryKey: ['metadata', $.decode(n[14].url).data],
        pubkey: $.decode(n[14].url).data,
        $$slots: {
          default: [
            rc,
            ({ metadata: r }) => ({ 18: r }),
            ({ metadata: r }) => (r ? 262144 : 0),
          ],
        },
        $$scope: { ctx: n },
      },
    })),
    {
      c() {
        De(e.$$.fragment);
      },
      l(r) {
        He(e.$$.fragment, r);
      },
      m(r, i) {
        Fe(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 3 && (s.queryKey = ['metadata', $.decode(r[14].url).data]),
          i & 3 && (s.pubkey = $.decode(r[14].url).data),
          i & 786435 && (s.$$scope = { dirty: i, ctx: r }),
          e.$set(s);
      },
      i(r) {
        t || (D(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        U(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        Le(e, r);
      },
    }
  );
}
function $u(n) {
  let e, t, r, i, s;
  return (
    (r = new jo({
      props: {
        queryKey: [$.decode(n[14].url).data.id],
        id: $.decode(n[14].url).data.id,
        $$slots: {
          default: [
            ic,
            ({ text: o }) => ({ 1: o }),
            ({ text: o }) => (o ? 2 : 0),
          ],
        },
        $$scope: { ctx: n },
      },
    })),
    {
      c() {
        (e = w('div')), (t = w('div')), De(r.$$.fragment), (i = B()), this.h();
      },
      l(o) {
        e = C(o, 'DIV', { class: !0 });
        var l = q(e);
        t = C(l, 'DIV', { class: !0, style: !0 });
        var a = q(t);
        He(r.$$.fragment, a), a.forEach(m), (i = Q(l)), l.forEach(m), this.h();
      },
      h() {
        y(t, 'class', 'grid grid-cols-[auto_1fr] gap-1'),
          Zi(t, 'margin-bottom', '-25px'),
          y(e, 'class', 'card border border-surface-400 bg-surface-200/50 p-2');
      },
      m(o, l) {
        T(o, e, l), g(e, t), Fe(r, t, null), g(e, i), (s = !0);
      },
      p(o, l) {
        const a = {};
        l & 3 && (a.queryKey = [$.decode(o[14].url).data.id]),
          l & 3 && (a.id = $.decode(o[14].url).data.id),
          l & 524290 && (a.$$scope = { dirty: l, ctx: o }),
          r.$set(a);
      },
      i(o) {
        s || (D(r.$$.fragment, o), (s = !0));
      },
      o(o) {
        U(r.$$.fragment, o), (s = !1);
      },
      d(o) {
        o && m(e), Le(r);
      },
    }
  );
}
function ec(n) {
  let e, t, r, i, s;
  return (
    (r = new jo({
      props: {
        queryKey: [$.decode(n[14].url).data],
        id: $.decode(n[14].url).data,
        $$slots: {
          default: [
            sc,
            ({ text: o }) => ({ 1: o }),
            ({ text: o }) => (o ? 2 : 0),
          ],
        },
        $$scope: { ctx: n },
      },
    })),
    {
      c() {
        (e = w('div')), (t = w('div')), De(r.$$.fragment), (i = B()), this.h();
      },
      l(o) {
        e = C(o, 'DIV', { class: !0 });
        var l = q(e);
        t = C(l, 'DIV', { class: !0, style: !0 });
        var a = q(t);
        He(r.$$.fragment, a), a.forEach(m), (i = Q(l)), l.forEach(m), this.h();
      },
      h() {
        y(t, 'class', 'grid grid-cols-[auto_1fr] gap-1'),
          Zi(t, 'margin-bottom', '-25px'),
          y(
            e,
            'class',
            'card border border-surface-400 bg-surface-200/50 p-2 my-1',
          );
      },
      m(o, l) {
        T(o, e, l), g(e, t), Fe(r, t, null), g(e, i), (s = !0);
      },
      p(o, l) {
        const a = {};
        l & 3 && (a.queryKey = [$.decode(o[14].url).data]),
          l & 3 && (a.id = $.decode(o[14].url).data),
          l & 524290 && (a.$$scope = { dirty: l, ctx: o }),
          r.$set(a);
      },
      i(o) {
        s || (D(r.$$.fragment, o), (s = !0));
      },
      o(o) {
        U(r.$$.fragment, o), (s = !1);
      },
      d(o) {
        o && m(e), Le(r);
      },
    }
  );
}
function tc(n) {
  let e,
    t,
    r,
    i = JSON.parse(n[18].content).name + '',
    s,
    o,
    l,
    a;
  function u() {
    return n[10](n[18], n[14]);
  }
  return {
    c() {
      (e = w('button')),
        (t = L('@')),
        (r = w('u')),
        (s = L(i)),
        (o = B()),
        this.h();
    },
    l(h) {
      e = C(h, 'BUTTON', { class: !0 });
      var c = q(e);
      (t = N(c, '@')), (r = C(c, 'U', {}));
      var f = q(r);
      (s = N(f, i)), f.forEach(m), c.forEach(m), (o = Q(h)), this.h();
    },
    h() {
      y(e, 'class', 'inline-flex text-sm text-black/80');
    },
    m(h, c) {
      T(h, e, c),
        g(e, t),
        g(e, r),
        g(r, s),
        T(h, o, c),
        l || ((a = G(e, 'click', u)), (l = !0));
    },
    p(h, c) {
      (n = h),
        c & 262144 &&
          i !== (i = JSON.parse(n[18].content).name + '') &&
          V(s, i);
    },
    d(h) {
      h && m(e), h && m(o), (l = !1), a();
    },
  };
}
function rc(n) {
  let e,
    t,
    r,
    i = JSON.parse(n[18].content).name + '',
    s,
    o,
    l,
    a;
  function u() {
    return n[9](n[18], n[14]);
  }
  return {
    c() {
      (e = w('button')),
        (t = L('@')),
        (r = w('u')),
        (s = L(i)),
        (o = B()),
        this.h();
    },
    l(h) {
      e = C(h, 'BUTTON', { class: !0 });
      var c = q(e);
      (t = N(c, '@')), (r = C(c, 'U', {}));
      var f = q(r);
      (s = N(f, i)), f.forEach(m), c.forEach(m), (o = Q(h)), this.h();
    },
    h() {
      y(e, 'class', 'inline-flex text-sm text-black/80');
    },
    m(h, c) {
      T(h, e, c),
        g(e, t),
        g(e, r),
        g(r, s),
        T(h, o, c),
        l || ((a = G(e, 'click', u)), (l = !0));
    },
    p(h, c) {
      (n = h),
        c & 262144 &&
          i !== (i = JSON.parse(n[18].content).name + '') &&
          V(s, i);
    },
    d(h) {
      h && m(e), h && m(o), (l = !1), a();
    },
  };
}
function Qi(n) {
  let e, t;
  return {
    c() {
      (e = w('img')), this.h();
    },
    l(r) {
      (e = C(r, 'IMG', { class: !0, src: !0, alt: !0 })), this.h();
    },
    h() {
      y(e, 'class', 'w-8 object-contain justify-center'),
        ce(e.src, (t = JSON.parse(n[18].content).picture)) || y(e, 'src', t),
        y(e, 'alt', 'avatar');
    },
    m(r, i) {
      T(r, e, i);
    },
    p(r, i) {
      i & 262144 &&
        !ce(e.src, (t = JSON.parse(r[18].content).picture)) &&
        y(e, 'src', t);
    },
    d(r) {
      r && m(e);
    },
  };
}
function nc(n) {
  let e = JSON.parse(n[18].content).picture,
    t,
    r,
    i = JSON.parse(n[18].content).display_name + '',
    s,
    o,
    l,
    a,
    u = JSON.parse(n[18].content).name + '',
    h,
    c,
    f,
    d = n[1].content + '',
    _,
    p,
    v,
    b = e && Qi(n);
  function E() {
    return n[8](n[18], n[1]);
  }
  return {
    c() {
      b && b.c(),
        (t = B()),
        (r = w('div')),
        (s = L(i)),
        (o = B()),
        (l = w('button')),
        (a = L('@')),
        (h = L(u)),
        (c = B()),
        (f = w('div')),
        (_ = L(d)),
        this.h();
    },
    l(k) {
      b && b.l(k), (t = Q(k)), (r = C(k, 'DIV', {}));
      var O = q(r);
      (s = N(O, i)), (o = Q(O)), (l = C(O, 'BUTTON', { class: !0 }));
      var I = q(l);
      (a = N(I, '@')),
        (h = N(I, u)),
        I.forEach(m),
        (c = Q(O)),
        (f = C(O, 'DIV', { class: !0 }));
      var S = q(f);
      (_ = N(S, d)), S.forEach(m), O.forEach(m), this.h();
    },
    h() {
      y(l, 'class', 'text-sm text-blue-600/50'),
        y(f, 'class', 'max-h-48 overflow-auto');
    },
    m(k, O) {
      b && b.m(k, O),
        T(k, t, O),
        T(k, r, O),
        g(r, s),
        g(r, o),
        g(r, l),
        g(l, a),
        g(l, h),
        g(r, c),
        g(r, f),
        g(f, _),
        p || ((v = G(l, 'click', E)), (p = !0));
    },
    p(k, O) {
      (n = k),
        O & 262144 && (e = JSON.parse(n[18].content).picture),
        e
          ? b
            ? b.p(n, O)
            : ((b = Qi(n)), b.c(), b.m(t.parentNode, t))
          : b && (b.d(1), (b = null)),
        O & 262144 &&
          i !== (i = JSON.parse(n[18].content).display_name + '') &&
          V(s, i),
        O & 262144 &&
          u !== (u = JSON.parse(n[18].content).name + '') &&
          V(h, u),
        O & 2 && d !== (d = n[1].content + '') && V(_, d);
    },
    d(k) {
      b && b.d(k), k && m(t), k && m(r), (p = !1), v();
    },
  };
}
function ic(n) {
  let e, t;
  return (
    (e = new ur({
      props: {
        queryKey: ['metadata', n[1].pubkey],
        pubkey: n[1].pubkey,
        $$slots: {
          default: [
            nc,
            ({ metadata: r }) => ({ 18: r }),
            ({ metadata: r }) => (r ? 262144 : 0),
          ],
        },
        $$scope: { ctx: n },
      },
    })),
    {
      c() {
        De(e.$$.fragment);
      },
      l(r) {
        He(e.$$.fragment, r);
      },
      m(r, i) {
        Fe(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 2 && (s.queryKey = ['metadata', r[1].pubkey]),
          i & 2 && (s.pubkey = r[1].pubkey),
          i & 786434 && (s.$$scope = { dirty: i, ctx: r }),
          e.$set(s);
      },
      i(r) {
        t || (D(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        U(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        Le(e, r);
      },
    }
  );
}
function Ki(n) {
  let e, t;
  return {
    c() {
      (e = w('img')), this.h();
    },
    l(r) {
      (e = C(r, 'IMG', { class: !0, src: !0, alt: !0 })), this.h();
    },
    h() {
      y(e, 'class', 'w-8 object-contain justify-center'),
        ce(e.src, (t = JSON.parse(n[18].content).picture)) || y(e, 'src', t),
        y(e, 'alt', 'avatar');
    },
    m(r, i) {
      T(r, e, i);
    },
    p(r, i) {
      i & 262144 &&
        !ce(e.src, (t = JSON.parse(r[18].content).picture)) &&
        y(e, 'src', t);
    },
    d(r) {
      r && m(e);
    },
  };
}
function oc(n) {
  let e = JSON.parse(n[18].content).picture,
    t,
    r,
    i = JSON.parse(n[18].content).display_name + '',
    s,
    o,
    l,
    a,
    u = JSON.parse(n[18].content).name + '',
    h,
    c,
    f,
    d = n[1].content + '',
    _,
    p,
    v,
    b = e && Ki(n);
  function E() {
    return n[7](n[18], n[1]);
  }
  return {
    c() {
      b && b.c(),
        (t = B()),
        (r = w('div')),
        (s = L(i)),
        (o = B()),
        (l = w('button')),
        (a = L('@')),
        (h = L(u)),
        (c = B()),
        (f = w('div')),
        (_ = L(d)),
        this.h();
    },
    l(k) {
      b && b.l(k), (t = Q(k)), (r = C(k, 'DIV', {}));
      var O = q(r);
      (s = N(O, i)), (o = Q(O)), (l = C(O, 'BUTTON', { class: !0 }));
      var I = q(l);
      (a = N(I, '@')),
        (h = N(I, u)),
        I.forEach(m),
        (c = Q(O)),
        (f = C(O, 'DIV', { class: !0 }));
      var S = q(f);
      (_ = N(S, d)), S.forEach(m), O.forEach(m), this.h();
    },
    h() {
      y(l, 'class', 'text-sm text-blue-600/50'),
        y(f, 'class', 'max-h-48 overflow-auto');
    },
    m(k, O) {
      b && b.m(k, O),
        T(k, t, O),
        T(k, r, O),
        g(r, s),
        g(r, o),
        g(r, l),
        g(l, a),
        g(l, h),
        g(r, c),
        g(r, f),
        g(f, _),
        p || ((v = G(l, 'click', E)), (p = !0));
    },
    p(k, O) {
      (n = k),
        O & 262144 && (e = JSON.parse(n[18].content).picture),
        e
          ? b
            ? b.p(n, O)
            : ((b = Ki(n)), b.c(), b.m(t.parentNode, t))
          : b && (b.d(1), (b = null)),
        O & 262144 &&
          i !== (i = JSON.parse(n[18].content).display_name + '') &&
          V(s, i),
        O & 262144 &&
          u !== (u = JSON.parse(n[18].content).name + '') &&
          V(h, u),
        O & 2 && d !== (d = n[1].content + '') && V(_, d);
    },
    d(k) {
      b && b.d(k), k && m(t), k && m(r), (p = !1), v();
    },
  };
}
function sc(n) {
  let e, t;
  return (
    (e = new ur({
      props: {
        queryKey: ['metadata', n[1].pubkey],
        pubkey: n[1].pubkey,
        $$slots: {
          default: [
            oc,
            ({ metadata: r }) => ({ 18: r }),
            ({ metadata: r }) => (r ? 262144 : 0),
          ],
        },
        $$scope: { ctx: n },
      },
    })),
    {
      c() {
        De(e.$$.fragment);
      },
      l(r) {
        He(e.$$.fragment, r);
      },
      m(r, i) {
        Fe(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 2 && (s.queryKey = ['metadata', r[1].pubkey]),
          i & 2 && (s.pubkey = r[1].pubkey),
          i & 786434 && (s.$$scope = { dirty: i, ctx: r }),
          e.$set(s);
      },
      i(r) {
        t || (D(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        U(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        Le(e, r);
      },
    }
  );
}
function Vi(n) {
  let e = Array(n[14].beforeSpace).fill(' ').join('') + '',
    t;
  return {
    c() {
      t = L(e);
    },
    l(r) {
      t = N(r, e);
    },
    m(r, i) {
      T(r, t, i);
    },
    p(r, i) {
      i & 3 &&
        e !== (e = Array(r[14].beforeSpace).fill(' ').join('') + '') &&
        V(t, e);
    },
    d(r) {
      r && m(t);
    },
  };
}
function ac(n) {
  return { c: K, l: K, m: K, p: K, i: K, o: K, d: K };
}
function lc(n) {
  let e, t, r, i;
  const s = [cc, uc],
    o = [];
  function l(a, u) {
    return a[17].title !== '' ? 0 : 1;
  }
  return (
    (e = l(n)),
    (t = o[e] = s[e](n)),
    {
      c() {
        t.c(), (r = B());
      },
      l(a) {
        t.l(a), (r = Q(a));
      },
      m(a, u) {
        o[e].m(a, u), T(a, r, u), (i = !0);
      },
      p(a, u) {
        let h = e;
        (e = l(a)),
          e === h
            ? o[e].p(a, u)
            : (ve(),
              U(o[h], 1, 1, () => {
                o[h] = null;
              }),
              ye(),
              (t = o[e]),
              t ? t.p(a, u) : ((t = o[e] = s[e](a)), t.c()),
              D(t, 1),
              t.m(r.parentNode, r));
      },
      i(a) {
        i || (D(t), (i = !0));
      },
      o(a) {
        U(t), (i = !1);
      },
      d(a) {
        o[e].d(a), a && m(r);
      },
    }
  );
}
function uc(n) {
  let e,
    t,
    r,
    i,
    s,
    o = n[14].beforeSpace && Gi(n);
  function l(h, c) {
    return h[14].content.length > 80 ? hc : fc;
  }
  let a = l(n),
    u = a(n);
  return {
    c() {
      (e = w('div')), o && o.c(), (t = B()), (r = w('a')), u.c(), this.h();
    },
    l(h) {
      e = C(h, 'DIV', { class: !0 });
      var c = q(e);
      o && o.l(c),
        (t = Q(c)),
        (r = C(c, 'A', { class: !0, href: !0, target: !0 }));
      var f = q(r);
      u.l(f), f.forEach(m), c.forEach(m), this.h();
    },
    h() {
      y(r, 'class', 'anchor flex'),
        y(r, 'href', (i = n[14].content)),
        y(r, 'target', '_blank'),
        y(
          e,
          'class',
          (s =
            n[14].marquee +
            ' w-[fit-content] break-all whitespace-pre-wrap inline-flex flex'),
        );
    },
    m(h, c) {
      T(h, e, c), o && o.m(e, null), g(e, t), g(e, r), u.m(r, null);
    },
    p(h, c) {
      h[14].beforeSpace
        ? o
          ? o.p(h, c)
          : ((o = Gi(h)), o.c(), o.m(e, t))
        : o && (o.d(1), (o = null)),
        a === (a = l(h)) && u
          ? u.p(h, c)
          : (u.d(1), (u = a(h)), u && (u.c(), u.m(r, null))),
        c & 3 && i !== (i = h[14].content) && y(r, 'href', i),
        c & 3 &&
          s !==
            (s =
              h[14].marquee +
              ' w-[fit-content] break-all whitespace-pre-wrap inline-flex flex') &&
          y(e, 'class', s);
    },
    i: K,
    o: K,
    d(h) {
      h && m(e), o && o.d(), u.d();
    },
  };
}
function cc(n) {
  let e, t;
  return (
    (e = new Nu({ props: { ogp: n[17], url: n[14].content } })),
    {
      c() {
        De(e.$$.fragment);
      },
      l(r) {
        He(e.$$.fragment, r);
      },
      m(r, i) {
        Fe(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 3 && (s.ogp = r[17]), i & 3 && (s.url = r[14].content), e.$set(s);
      },
      i(r) {
        t || (D(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        U(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        Le(e, r);
      },
    }
  );
}
function Gi(n) {
  let e = Array(n[14].beforeSpace).fill(' ').join('') + '',
    t;
  return {
    c() {
      t = L(e);
    },
    l(r) {
      t = N(r, e);
    },
    m(r, i) {
      T(r, t, i);
    },
    p(r, i) {
      i & 3 &&
        e !== (e = Array(r[14].beforeSpace).fill(' ').join('') + '') &&
        V(t, e);
    },
    d(r) {
      r && m(t);
    },
  };
}
function fc(n) {
  let e = n[14].content + '',
    t;
  return {
    c() {
      t = L(e);
    },
    l(r) {
      t = N(r, e);
    },
    m(r, i) {
      T(r, t, i);
    },
    p(r, i) {
      i & 3 && e !== (e = r[14].content + '') && V(t, e);
    },
    d(r) {
      r && m(t);
    },
  };
}
function hc(n) {
  let e = n[14].content.slice(0, 75) + '',
    t,
    r;
  return {
    c() {
      (t = L(e)), (r = L('...'));
    },
    l(i) {
      (t = N(i, e)), (r = N(i, '...'));
    },
    m(i, s) {
      T(i, t, s), T(i, r, s);
    },
    p(i, s) {
      s & 3 && e !== (e = i[14].content.slice(0, 75) + '') && V(t, e);
    },
    d(i) {
      i && m(t), i && m(r);
    },
  };
}
function dc(n) {
  let e,
    t,
    r,
    i,
    s,
    o,
    l = n[14].beforeSpace && zi(n);
  function a(c, f) {
    return c[14].content.length > 80 ? pc : _c;
  }
  let u = a(n),
    h = u(n);
  return {
    c() {
      (e = w('div')),
        l && l.c(),
        (t = B()),
        (r = w('a')),
        h.c(),
        (o = B()),
        this.h();
    },
    l(c) {
      e = C(c, 'DIV', { class: !0 });
      var f = q(e);
      l && l.l(f),
        (t = Q(f)),
        (r = C(f, 'A', { class: !0, href: !0, target: !0 }));
      var d = q(r);
      h.l(d), d.forEach(m), f.forEach(m), (o = Q(c)), this.h();
    },
    h() {
      y(r, 'class', 'anchor'),
        y(r, 'href', (i = n[14].content)),
        y(r, 'target', '_blank'),
        y(
          e,
          'class',
          (s =
            n[14].marquee +
            ' w-[fit-content] break-all whitespace-pre-wrap inline-flex flex'),
        );
    },
    m(c, f) {
      T(c, e, f), l && l.m(e, null), g(e, t), g(e, r), h.m(r, null), T(c, o, f);
    },
    p(c, f) {
      c[14].beforeSpace
        ? l
          ? l.p(c, f)
          : ((l = zi(c)), l.c(), l.m(e, t))
        : l && (l.d(1), (l = null)),
        u === (u = a(c)) && h
          ? h.p(c, f)
          : (h.d(1), (h = u(c)), h && (h.c(), h.m(r, null))),
        f & 3 && i !== (i = c[14].content) && y(r, 'href', i),
        f & 3 &&
          s !==
            (s =
              c[14].marquee +
              ' w-[fit-content] break-all whitespace-pre-wrap inline-flex flex') &&
          y(e, 'class', s);
    },
    i: K,
    o: K,
    d(c) {
      c && m(e), l && l.d(), h.d(), c && m(o);
    },
  };
}
function zi(n) {
  let e = Array(n[14].beforeSpace).fill(' ').join('') + '',
    t;
  return {
    c() {
      t = L(e);
    },
    l(r) {
      t = N(r, e);
    },
    m(r, i) {
      T(r, t, i);
    },
    p(r, i) {
      i & 3 &&
        e !== (e = Array(r[14].beforeSpace).fill(' ').join('') + '') &&
        V(t, e);
    },
    d(r) {
      r && m(t);
    },
  };
}
function _c(n) {
  let e = n[14].content + '',
    t;
  return {
    c() {
      t = L(e);
    },
    l(r) {
      t = N(r, e);
    },
    m(r, i) {
      T(r, t, i);
    },
    p(r, i) {
      i & 3 && e !== (e = r[14].content + '') && V(t, e);
    },
    d(r) {
      r && m(t);
    },
  };
}
function pc(n) {
  let e = n[14].content.slice(0, 75) + '',
    t,
    r;
  return {
    c() {
      (t = L(e)), (r = L('...'));
    },
    l(i) {
      (t = N(i, e)), (r = N(i, '...'));
    },
    m(i, s) {
      T(i, t, s), T(i, r, s);
    },
    p(i, s) {
      s & 3 && e !== (e = i[14].content.slice(0, 75) + '') && V(t, e);
    },
    d(i) {
      i && m(t), i && m(r);
    },
  };
}
function Ji(n) {
  let e = Array(n[14].beforeSpace).fill(' ').join('') + '',
    t;
  return {
    c() {
      t = L(e);
    },
    l(r) {
      t = N(r, e);
    },
    m(r, i) {
      T(r, t, i);
    },
    p(r, i) {
      i & 3 &&
        e !== (e = Array(r[14].beforeSpace).fill(' ').join('') + '') &&
        V(t, e);
    },
    d(r) {
      r && m(t);
    },
  };
}
function Wi(n) {
  let e, t, r, i;
  const s = [Ju, zu, Gu, Vu, Ku, Qu, Bu],
    o = [];
  function l(a, u) {
    return a[14].type === 'newline'
      ? 0
      : a[14].type === 'space'
      ? 1
      : a[14].type === 'emoji'
      ? 2
      : a[14].type === 'url'
      ? 3
      : a[14].type === 'image'
      ? 4
      : a[14].type === 'nostr' && a[14].url
      ? 5
      : a[14].content.length > 0
      ? 6
      : -1;
  }
  return (
    ~(e = l(n)) && (t = o[e] = s[e](n)),
    {
      c() {
        t && t.c(), (r = J());
      },
      l(a) {
        t && t.l(a), (r = J());
      },
      m(a, u) {
        ~e && o[e].m(a, u), T(a, r, u), (i = !0);
      },
      p(a, u) {
        let h = e;
        (e = l(a)),
          e === h
            ? ~e && o[e].p(a, u)
            : (t &&
                (ve(),
                U(o[h], 1, 1, () => {
                  o[h] = null;
                }),
                ye()),
              ~e
                ? ((t = o[e]),
                  t ? t.p(a, u) : ((t = o[e] = s[e](a)), t.c()),
                  D(t, 1),
                  t.m(r.parentNode, r))
                : (t = null));
      },
      i(a) {
        i || (D(t), (i = !0));
      },
      o(a) {
        U(t), (i = !1);
      },
      d(a) {
        ~e && o[e].d(a), a && m(r);
      },
    }
  );
}
function vc(n) {
  let e;
  return {
    c() {
      e = L(n[1]);
    },
    l(t) {
      e = N(t, n[1]);
    },
    m(t, r) {
      T(t, e, r);
    },
    p(t, r) {
      r & 2 && V(e, t[1]);
    },
    i: K,
    o: K,
    d(t) {
      t && m(e);
    },
  };
}
function yc(n) {
  let e,
    t,
    r,
    i = {
      ctx: n,
      current: null,
      token: null,
      hasCatch: !1,
      pending: vc,
      then: Uu,
      catch: Hu,
      value: 13,
      blocks: [, , ,],
    };
  return (
    Zt((t = Ni(n[1], n[0])), i),
    {
      c() {
        (e = J()), i.block.c();
      },
      l(s) {
        (e = J()), i.block.l(s);
      },
      m(s, o) {
        T(s, e, o),
          i.block.m(s, (i.anchor = o)),
          (i.mount = () => e.parentNode),
          (i.anchor = e),
          (r = !0);
      },
      p(s, [o]) {
        (n = s),
          (i.ctx = n),
          (o & 3 && t !== (t = Ni(n[1], n[0])) && Zt(t, i)) || Xi(i, n, o);
      },
      i(s) {
        r || (D(i.block), (r = !0));
      },
      o(s) {
        for (let o = 0; o < 3; o += 1) {
          const l = i.blocks[o];
          U(l);
        }
        r = !1;
      },
      d(s) {
        s && m(e), i.block.d(s), (i.token = null), (i = null);
      },
    }
  );
}
function bc(n, e, t) {
  let { text: r } = e,
    { tag: i } = e;
  const s = {
    ref: Mu,
    props: { background: 'bg-red-500' },
    slot: '<p>Skeleton</p>',
  };
  function o(v) {
    if (typeof v == 'string') {
      const b = { type: 'component', image: v, component: s };
      Pe.trigger(b);
    }
  }
  const l = {
    ref: yu,
    props: { background: 'bg-red-500' },
    slot: '<p>Skeleton</p>',
  };
  function a(v, b) {
    console.log(v);
    const E = {
      type: 'component',
      value: { metadata: v, pubkey: b },
      component: l,
    };
    Pe.trigger(E);
  }
  function u(v) {
    try {
      return $.decode(v), !0;
    } catch {
      return !1;
    }
  }
  const h = (v) => o(v.url),
    c = (v) => o(v.content),
    f = (v, b) => {
      a(v, b.pubkey);
    },
    d = (v, b) => {
      a(v, b.pubkey);
    },
    _ = (v, b) => {
      a(v, $.decode(b.url).data);
    },
    p = (v, b) => {
      a(v, $.decode(b.url).data.pubkey);
    };
  return (
    (n.$$set = (v) => {
      'text' in v && t(1, (r = v.text)), 'tag' in v && t(0, (i = v.tag));
    }),
    [i, r, o, a, u, h, c, f, d, _, p]
  );
}
class Mc extends Ce {
  constructor(e) {
    super(), qe(this, e, bc, yc, Se, { text: 1, tag: 0 });
  }
}
export {
  Ec as A,
  Mc as C,
  Cc as M,
  qc as N,
  Tc as P,
  Rc as R,
  Sc as T,
  wc as a,
  yu as b,
  Ac as c,
  jo as d,
  ur as e,
  Ic as f,
  Pe as m,
  Pc as n,
};
