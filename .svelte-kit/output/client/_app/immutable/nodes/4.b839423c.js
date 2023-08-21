import {
  S as xe,
  i as et,
  s as tt,
  C as vt,
  k as p,
  l as m,
  m as k,
  h as d,
  n as g,
  b as w,
  G as kt,
  I as Et,
  J as wt,
  g as A,
  d as j,
  W as ht,
  X as st,
  Y as rt,
  a as V,
  c as F,
  F as f,
  N as G,
  v as we,
  f as ye,
  O as je,
  Z as Gl,
  _ as gt,
  $ as Ae,
  w as $e,
  a0 as xl,
  a1 as ll,
  a2 as Bt,
  a3 as eo,
  a4 as ol,
  a5 as to,
  e as le,
  K as pe,
  L as Ge,
  q as T,
  r as N,
  M as It,
  a6 as mt,
  u as re,
  y as me,
  z as ve,
  A as ke,
  B as Ee,
  a7 as Ql,
  a8 as Wl,
  T as it,
  U as ut,
  a9 as lo,
  aa as sl,
  P as ct,
  ab as oo,
  D as so,
  o as no,
  Q as ne,
  ac as ao,
  R as ro,
  V as nl,
} from '../chunks/index.e81ade4b.js';
import { p as io } from '../chunks/stores.775d0d4f.js';
import {
  t as fe,
  n as pt,
  f as Ut,
  c as al,
  a as rl,
  b as il,
  e as ul,
  h as cl,
  p as Ct,
  g as uo,
  P as co,
} from '../chunks/navigation.928c82b4.js';
import {
  m as Ne,
  f as Je,
  M as fo,
  n as _e,
  A as _o,
  T as Yl,
  N as ho,
  R as go,
  a as jt,
  P as bo,
  b as po,
  c as mo,
  d as vo,
  e as Xl,
  C as ko,
} from '../chunks/Content.952014ad.js';
import { p as Eo } from '../chunks/popup.7188fd77.js';
import '../chunks/ProgressBar.svelte_svelte_type_style_lang.0751fc73.js';
import { T as wo } from '../chunks/Toast.4359ca3d.js';
function yo(s) {
  let e, l, t;
  const o = s[9].default,
    a = vt(o, s, s[8], null);
  return {
    c() {
      (e = p('div')), a && a.c(), this.h();
    },
    l(n) {
      e = m(n, 'DIV', {
        class: !0,
        role: !0,
        'aria-labelledby': !0,
        'data-testid': !0,
      });
      var r = k(e);
      a && a.l(r), r.forEach(d), this.h();
    },
    h() {
      g(e, 'class', (l = 'listbox ' + s[1])),
        g(e, 'role', 'listbox'),
        g(e, 'aria-labelledby', s[0]),
        g(e, 'data-testid', 'listbox');
    },
    m(n, r) {
      w(n, e, r), a && a.m(e, null), (t = !0);
    },
    p(n, [r]) {
      a &&
        a.p &&
        (!t || r & 256) &&
        kt(a, o, n, n[8], t ? wt(o, n[8], r, null) : Et(n[8]), null),
        (!t || (r & 2 && l !== (l = 'listbox ' + n[1]))) && g(e, 'class', l),
        (!t || r & 1) && g(e, 'aria-labelledby', n[0]);
    },
    i(n) {
      t || (A(a, n), (t = !0));
    },
    o(n) {
      j(a, n), (t = !1);
    },
    d(n) {
      n && d(e), a && a.d(n);
    },
  };
}
const To = '';
function No(s, e, l) {
  let t,
    { $$slots: o = {}, $$scope: a } = e,
    { multiple: n = !1 } = e,
    { spacing: r = 'space-y-1' } = e,
    { rounded: i = 'rounded-token' } = e,
    { active: u = 'variant-filled' } = e,
    { hover: c = 'hover:variant-soft' } = e,
    { padding: b = 'px-4 py-2' } = e,
    { labelledby: h = '' } = e;
  return (
    ht('multiple', n),
    ht('rounded', i),
    ht('active', u),
    ht('hover', c),
    ht('padding', b),
    (s.$$set = (_) => {
      l(10, (e = st(st({}, e), rt(_)))),
        'multiple' in _ && l(2, (n = _.multiple)),
        'spacing' in _ && l(3, (r = _.spacing)),
        'rounded' in _ && l(4, (i = _.rounded)),
        'active' in _ && l(5, (u = _.active)),
        'hover' in _ && l(6, (c = _.hover)),
        'padding' in _ && l(7, (b = _.padding)),
        'labelledby' in _ && l(0, (h = _.labelledby)),
        '$$scope' in _ && l(8, (a = _.$$scope));
    }),
    (s.$$.update = () => {
      l(1, (t = `${To} ${r} ${i} ${e.class ?? ''}`));
    }),
    (e = rt(e)),
    [h, t, n, r, i, u, c, b, a, o]
  );
}
class Zl extends xe {
  constructor(e) {
    super(),
      et(this, e, No, yo, tt, {
        multiple: 2,
        spacing: 3,
        rounded: 4,
        active: 5,
        hover: 6,
        padding: 7,
        labelledby: 0,
      });
  }
}
const Do = (s) => ({}),
  fl = (s) => ({}),
  Bo = (s) => ({}),
  dl = (s) => ({});
function Co(s) {
  let e,
    l = !1,
    t,
    o,
    a;
  return (
    (t = xl(s[29][0])),
    {
      c() {
        (e = p('input')), this.h();
      },
      l(n) {
        (e = m(n, 'INPUT', { type: !0, name: !0, tabindex: !0 })), this.h();
      },
      h() {
        g(e, 'type', 'radio'),
          g(e, 'name', s[1]),
          (e.__value = s[2]),
          (e.value = e.__value),
          g(e, 'tabindex', '-1'),
          t.p(e);
      },
      m(n, r) {
        w(n, e, r),
          s[27](e),
          (e.checked = e.__value === s[0]),
          o ||
            ((a = [
              G(e, 'change', s[28]),
              G(e, 'click', s[23]),
              G(e, 'change', s[24]),
            ]),
            (o = !0));
      },
      p(n, r) {
        r[0] & 2 && g(e, 'name', n[1]),
          r[0] & 4 && ((e.__value = n[2]), (e.value = e.__value), (l = !0)),
          (l || r[0] & 1) && (e.checked = e.__value === n[0]);
      },
      d(n) {
        n && d(e), s[27](null), t.r(), (o = !1), je(a);
      },
    }
  );
}
function Io(s) {
  let e, l, t;
  return {
    c() {
      (e = p('input')), this.h();
    },
    l(o) {
      (e = m(o, 'INPUT', { type: !0, name: !0, tabindex: !0 })), this.h();
    },
    h() {
      g(e, 'type', 'checkbox'),
        g(e, 'name', s[1]),
        (e.__value = s[2]),
        (e.value = e.__value),
        g(e, 'tabindex', '-1');
    },
    m(o, a) {
      w(o, e, a),
        s[25](e),
        (e.checked = s[4]),
        l ||
          ((t = [
            G(e, 'change', s[26]),
            G(e, 'click', s[21]),
            G(e, 'change', s[22]),
          ]),
          (l = !0));
    },
    p(o, a) {
      a[0] & 2 && g(e, 'name', o[1]),
        a[0] & 4 && ((e.__value = o[2]), (e.value = e.__value)),
        a[0] & 16 && (e.checked = o[4]);
    },
    d(o) {
      o && d(e), s[25](null), (l = !1), je(t);
    },
  };
}
function _l(s) {
  let e, l;
  const t = s[17].lead,
    o = vt(t, s, s[16], dl);
  return {
    c() {
      (e = p('div')), o && o.c(), this.h();
    },
    l(a) {
      e = m(a, 'DIV', { class: !0 });
      var n = k(e);
      o && o.l(n), n.forEach(d), this.h();
    },
    h() {
      g(e, 'class', 'listbox-label-lead');
    },
    m(a, n) {
      w(a, e, n), o && o.m(e, null), (l = !0);
    },
    p(a, n) {
      o &&
        o.p &&
        (!l || n[0] & 65536) &&
        kt(o, t, a, a[16], l ? wt(t, a[16], n, Bo) : Et(a[16]), dl);
    },
    i(a) {
      l || (A(o, a), (l = !0));
    },
    o(a) {
      j(o, a), (l = !1);
    },
    d(a) {
      a && d(e), o && o.d(a);
    },
  };
}
function hl(s) {
  let e, l;
  const t = s[17].trail,
    o = vt(t, s, s[16], fl);
  return {
    c() {
      (e = p('div')), o && o.c(), this.h();
    },
    l(a) {
      e = m(a, 'DIV', { class: !0 });
      var n = k(e);
      o && o.l(n), n.forEach(d), this.h();
    },
    h() {
      g(e, 'class', 'listbox-label-trail');
    },
    m(a, n) {
      w(a, e, n), o && o.m(e, null), (l = !0);
    },
    p(a, n) {
      o &&
        o.p &&
        (!l || n[0] & 65536) &&
        kt(o, t, a, a[16], l ? wt(t, a[16], n, Do) : Et(a[16]), fl);
    },
    i(a) {
      l || (A(o, a), (l = !0));
    },
    o(a) {
      j(o, a), (l = !1);
    },
    d(a) {
      a && d(e), o && o.d(a);
    },
  };
}
function Oo(s) {
  let e, l, t, o, a, n, r, i, u, c, b, h, _;
  function v(I, O) {
    return I[3] ? Io : Co;
  }
  let S = v(s),
    z = S(s),
    R = s[10].lead && _l(s);
  const B = s[17].default,
    y = vt(B, s, s[16], null);
  let C = s[10].trail && hl(s);
  return {
    c() {
      (e = p('label')),
        (l = p('div')),
        (t = p('div')),
        z.c(),
        (o = V()),
        (a = p('div')),
        R && R.c(),
        (n = V()),
        (r = p('div')),
        y && y.c(),
        (i = V()),
        C && C.c(),
        this.h();
    },
    l(I) {
      e = m(I, 'LABEL', {});
      var O = k(e);
      l = m(O, 'DIV', {
        class: !0,
        'data-testid': !0,
        role: !0,
        'aria-selected': !0,
        tabindex: !0,
      });
      var q = k(l);
      t = m(q, 'DIV', { class: !0 });
      var Q = k(t);
      z.l(Q), Q.forEach(d), (o = F(q)), (a = m(q, 'DIV', { class: !0 }));
      var J = k(a);
      R && R.l(J), (n = F(J)), (r = m(J, 'DIV', { class: !0 }));
      var K = k(r);
      y && y.l(K),
        K.forEach(d),
        (i = F(J)),
        C && C.l(J),
        J.forEach(d),
        q.forEach(d),
        O.forEach(d),
        this.h();
    },
    h() {
      g(t, 'class', 'h-0 w-0 overflow-hidden'),
        g(r, 'class', 'listbox-label-content flex-1'),
        g(a, 'class', (u = 'listbox-label ' + s[7])),
        g(l, 'class', (c = 'listbox-item ' + s[8])),
        g(l, 'data-testid', 'listbox-item'),
        g(l, 'role', 'option'),
        g(l, 'aria-selected', s[5]),
        g(l, 'tabindex', '0');
    },
    m(I, O) {
      w(I, e, O),
        f(e, l),
        f(l, t),
        z.m(t, null),
        f(l, o),
        f(l, a),
        R && R.m(a, null),
        f(a, n),
        f(a, r),
        y && y.m(r, null),
        f(a, i),
        C && C.m(a, null),
        (b = !0),
        h ||
          ((_ = [
            G(l, 'keydown', s[9]),
            G(l, 'keydown', s[18]),
            G(l, 'keyup', s[19]),
            G(l, 'keypress', s[20]),
          ]),
          (h = !0));
    },
    p(I, O) {
      S === (S = v(I)) && z
        ? z.p(I, O)
        : (z.d(1), (z = S(I)), z && (z.c(), z.m(t, null))),
        I[10].lead
          ? R
            ? (R.p(I, O), O[0] & 1024 && A(R, 1))
            : ((R = _l(I)), R.c(), A(R, 1), R.m(a, n))
          : R &&
            (we(),
            j(R, 1, 1, () => {
              R = null;
            }),
            ye()),
        y &&
          y.p &&
          (!b || O[0] & 65536) &&
          kt(y, B, I, I[16], b ? wt(B, I[16], O, null) : Et(I[16]), null),
        I[10].trail
          ? C
            ? (C.p(I, O), O[0] & 1024 && A(C, 1))
            : ((C = hl(I)), C.c(), A(C, 1), C.m(a, null))
          : C &&
            (we(),
            j(C, 1, 1, () => {
              C = null;
            }),
            ye()),
        (!b || (O[0] & 128 && u !== (u = 'listbox-label ' + I[7]))) &&
          g(a, 'class', u),
        (!b || (O[0] & 256 && c !== (c = 'listbox-item ' + I[8]))) &&
          g(l, 'class', c),
        (!b || O[0] & 32) && g(l, 'aria-selected', I[5]);
    },
    i(I) {
      b || (A(R), A(y, I), A(C), (b = !0));
    },
    o(I) {
      j(R), j(y, I), j(C), (b = !1);
    },
    d(I) {
      I && d(e), z.d(), R && R.d(), y && y.d(I), C && C.d(), (h = !1), je(_);
    },
  };
}
const Ao = 'cursor-pointer -outline-offset-[3px]',
  So = 'flex items-center space-x-4';
function Mt(s, e) {
  if (s === e) return !0;
  if (!(s instanceof Object) || !(e instanceof Object)) return !1;
  const l = Object.keys(s),
    t = Object.keys(e);
  if (l.length !== t.length) return !1;
  for (const o of l) {
    const a = s[o],
      n = e[o];
    if (!Mt(a, n)) return !1;
  }
  return !0;
}
function Po(s, e, l) {
  let t,
    o,
    a,
    n,
    { $$slots: r = {}, $$scope: i } = e;
  const u = Gl(r);
  let { group: c } = e,
    { name: b } = e,
    { value: h } = e,
    { multiple: _ = gt('multiple') } = e,
    { rounded: v = gt('rounded') } = e,
    { active: S = gt('active') } = e,
    { hover: z = gt('hover') } = e,
    { padding: R = gt('padding') } = e,
    B,
    y;
  function C(P) {
    l(4, (B = P.indexOf(h) >= 0));
  }
  function I(P) {
    const te = c.indexOf(h);
    P ? te < 0 && (c.push(h), l(0, c)) : te >= 0 && (c.splice(te, 1), l(0, c));
  }
  function O(P) {
    ['Enter', 'Space'].includes(P.code) && (P.preventDefault(), y.click());
  }
  const q = [[]];
  function Q(P) {
    Ae.call(this, s, P);
  }
  function J(P) {
    Ae.call(this, s, P);
  }
  function K(P) {
    Ae.call(this, s, P);
  }
  function Z(P) {
    Ae.call(this, s, P);
  }
  function $(P) {
    Ae.call(this, s, P);
  }
  function H(P) {
    Ae.call(this, s, P);
  }
  function he(P) {
    Ae.call(this, s, P);
  }
  function ie(P) {
    $e[P ? 'unshift' : 'push'](() => {
      (y = P), l(6, y);
    });
  }
  function W() {
    (B = this.checked), l(4, B);
  }
  function oe(P) {
    $e[P ? 'unshift' : 'push'](() => {
      (y = P), l(6, y);
    });
  }
  function x() {
    (c = this.__value), l(0, c);
  }
  return (
    (s.$$set = (P) => {
      l(32, (e = st(st({}, e), rt(P)))),
        'group' in P && l(0, (c = P.group)),
        'name' in P && l(1, (b = P.name)),
        'value' in P && l(2, (h = P.value)),
        'multiple' in P && l(3, (_ = P.multiple)),
        'rounded' in P && l(11, (v = P.rounded)),
        'active' in P && l(12, (S = P.active)),
        'hover' in P && l(13, (z = P.hover)),
        'padding' in P && l(14, (R = P.padding)),
        '$$scope' in P && l(16, (i = P.$$scope));
    }),
    (s.$$.update = () => {
      s.$$.dirty[0] & 9 && _ && C(c),
        s.$$.dirty[0] & 24 && _ && I(B),
        s.$$.dirty[0] & 13 &&
          l(5, (t = _ ? c.some((P) => Mt(h, P)) : Mt(c, h))),
        s.$$.dirty[0] & 12320 && l(15, (o = t ? S : z)),
        l(8, (a = `${Ao} ${v} ${R} ${o} ${e.class ?? ''}`));
    }),
    l(7, (n = `${So}`)),
    (e = rt(e)),
    [
      c,
      b,
      h,
      _,
      B,
      t,
      y,
      n,
      a,
      O,
      u,
      v,
      S,
      z,
      R,
      o,
      i,
      r,
      Q,
      J,
      K,
      Z,
      $,
      H,
      he,
      ie,
      W,
      oe,
      x,
      q,
    ]
  );
}
class $l extends xe {
  constructor(e) {
    super(),
      et(
        this,
        e,
        Po,
        Oo,
        tt,
        {
          group: 0,
          name: 1,
          value: 2,
          multiple: 3,
          rounded: 11,
          active: 12,
          hover: 13,
          padding: 14,
        },
        null,
        [-1, -1],
      );
  }
}
function gl(s) {
  let e, l;
  const t = s[22].default,
    o = vt(t, s, s[21], null);
  return {
    c() {
      (e = p('div')), o && o.c(), this.h();
    },
    l(a) {
      e = m(a, 'DIV', { class: !0 });
      var n = k(e);
      o && o.l(n), n.forEach(d), this.h();
    },
    h() {
      g(e, 'class', 'slide-toggle-text ml-3');
    },
    m(a, n) {
      w(a, e, n), o && o.m(e, null), (l = !0);
    },
    p(a, n) {
      o &&
        o.p &&
        (!l || n[0] & 2097152) &&
        kt(o, t, a, a[21], l ? wt(t, a[21], n, null) : Et(a[21]), null);
    },
    i(a) {
      l || (A(o, a), (l = !0));
    },
    o(a) {
      j(o, a), (l = !1);
    },
    d(a) {
      a && d(e), o && o.d(a);
    },
  };
}
function Vo(s) {
  let e,
    l,
    t,
    o,
    a,
    n,
    r,
    i,
    u,
    c,
    b,
    h,
    _,
    v,
    S,
    z = [
      { type: 'checkbox' },
      { class: 'slide-toggle-input hidden' },
      { name: s[1] },
      s[8](),
      { disabled: (o = s[9].disabled) },
    ],
    R = {};
  for (let y = 0; y < z.length; y += 1) R = st(R, z[y]);
  let B = s[10].default && gl(s);
  return {
    c() {
      (e = p('div')),
        (l = p('label')),
        (t = p('input')),
        (a = V()),
        (n = p('div')),
        (r = p('div')),
        (c = V()),
        B && B.c(),
        this.h();
    },
    l(y) {
      e = m(y, 'DIV', {
        id: !0,
        class: !0,
        'data-testid': !0,
        role: !0,
        'aria-label': !0,
        'aria-checked': !0,
        tabindex: !0,
      });
      var C = k(e);
      l = m(C, 'LABEL', { class: !0 });
      var I = k(l);
      (t = m(I, 'INPUT', { type: !0, class: !0, name: !0 })),
        (a = F(I)),
        (n = m(I, 'DIV', { class: !0 }));
      var O = k(n);
      (r = m(O, 'DIV', { class: !0 })),
        k(r).forEach(d),
        O.forEach(d),
        (c = F(I)),
        B && B.l(I),
        I.forEach(d),
        C.forEach(d),
        this.h();
    },
    h() {
      ll(t, R),
        g(r, 'class', (i = 'slide-toggle-thumb ' + s[3])),
        Bt(r, 'cursor-not-allowed', s[9].disabled),
        g(n, 'class', (u = 'slide-toggle-track ' + s[4])),
        Bt(n, 'cursor-not-allowed', s[9].disabled),
        g(l, 'class', (b = 'slide-toggle-label ' + s[5])),
        g(e, 'id', s[2]),
        g(e, 'class', (h = 'slide-toggle ' + s[6])),
        g(e, 'data-testid', 'slide-toggle'),
        g(e, 'role', 'switch'),
        g(e, 'aria-label', s[2]),
        g(e, 'aria-checked', s[0]),
        g(e, 'tabindex', '0');
    },
    m(y, C) {
      w(y, e, C),
        f(e, l),
        f(l, t),
        t.autofocus && t.focus(),
        (t.checked = s[0]),
        f(l, a),
        f(l, n),
        f(n, r),
        f(l, c),
        B && B.m(l, null),
        (_ = !0),
        v ||
          ((S = [
            G(t, 'change', s[31]),
            G(t, 'click', s[23]),
            G(t, 'keydown', s[24]),
            G(t, 'keyup', s[25]),
            G(t, 'keypress', s[26]),
            G(t, 'mouseover', s[27]),
            G(t, 'change', s[28]),
            G(t, 'focus', s[29]),
            G(t, 'blur', s[30]),
            G(e, 'keydown', s[7]),
          ]),
          (v = !0));
    },
    p(y, C) {
      ll(
        t,
        (R = eo(z, [
          { type: 'checkbox' },
          { class: 'slide-toggle-input hidden' },
          (!_ || C[0] & 2) && { name: y[1] },
          y[8](),
          (!_ || (C[0] & 512 && o !== (o = y[9].disabled))) && { disabled: o },
        ])),
      ),
        C[0] & 1 && (t.checked = y[0]),
        (!_ || (C[0] & 8 && i !== (i = 'slide-toggle-thumb ' + y[3]))) &&
          g(r, 'class', i),
        (!_ || C[0] & 520) && Bt(r, 'cursor-not-allowed', y[9].disabled),
        (!_ || (C[0] & 16 && u !== (u = 'slide-toggle-track ' + y[4]))) &&
          g(n, 'class', u),
        (!_ || C[0] & 528) && Bt(n, 'cursor-not-allowed', y[9].disabled),
        y[10].default
          ? B
            ? (B.p(y, C), C[0] & 1024 && A(B, 1))
            : ((B = gl(y)), B.c(), A(B, 1), B.m(l, null))
          : B &&
            (we(),
            j(B, 1, 1, () => {
              B = null;
            }),
            ye()),
        (!_ || (C[0] & 32 && b !== (b = 'slide-toggle-label ' + y[5]))) &&
          g(l, 'class', b),
        (!_ || C[0] & 4) && g(e, 'id', y[2]),
        (!_ || (C[0] & 64 && h !== (h = 'slide-toggle ' + y[6]))) &&
          g(e, 'class', h),
        (!_ || C[0] & 4) && g(e, 'aria-label', y[2]),
        (!_ || C[0] & 1) && g(e, 'aria-checked', y[0]);
    },
    i(y) {
      _ || (A(B), (_ = !0));
    },
    o(y) {
      j(B), (_ = !1);
    },
    d(y) {
      y && d(e), B && B.d(), (v = !1), je(S);
    },
  };
}
const Fo = 'inline-block',
  Lo = 'unstyled flex items-center',
  Uo = 'flex transition-all duration-[200ms] cursor-pointer',
  Mo = 'w-[50%] h-full scale-[0.8] transition-all duration-[200ms] shadow';
function jo(s, e, l) {
  let t, o, a, n, r, i, u, c;
  const b = [
    'name',
    'checked',
    'size',
    'background',
    'active',
    'border',
    'rounded',
    'label',
  ];
  let h = ol(e, b),
    { $$slots: _ = {}, $$scope: v } = e;
  const S = Gl(_),
    z = to();
  let { name: R } = e,
    { checked: B = !1 } = e,
    { size: y = 'md' } = e,
    { background: C = 'bg-surface-400 dark:bg-surface-700' } = e,
    { active: I = 'bg-surface-900 dark:bg-surface-300' } = e,
    { border: O = '' } = e,
    { rounded: q = 'rounded-full' } = e,
    { label: Q = '' } = e,
    J;
  switch (y) {
    case 'sm':
      J = 'w-12 h-6';
      break;
    case 'lg':
      J = 'w-20 h-10';
      break;
    default:
      J = 'w-16 h-8';
  }
  function K(M) {
    ['Enter', 'Space'].includes(M.code) &&
      (M.preventDefault(), z('keyup', M), M.target.firstChild.click());
  }
  function Z() {
    return delete h.class, h;
  }
  function $(M) {
    Ae.call(this, s, M);
  }
  function H(M) {
    Ae.call(this, s, M);
  }
  function he(M) {
    Ae.call(this, s, M);
  }
  function ie(M) {
    Ae.call(this, s, M);
  }
  function W(M) {
    Ae.call(this, s, M);
  }
  function oe(M) {
    Ae.call(this, s, M);
  }
  function x(M) {
    Ae.call(this, s, M);
  }
  function P(M) {
    Ae.call(this, s, M);
  }
  function te() {
    (B = this.checked), l(0, B);
  }
  return (
    (s.$$set = (M) => {
      l(9, (e = st(st({}, e), rt(M)))),
        l(33, (h = ol(e, b))),
        'name' in M && l(1, (R = M.name)),
        'checked' in M && l(0, (B = M.checked)),
        'size' in M && l(11, (y = M.size)),
        'background' in M && l(12, (C = M.background)),
        'active' in M && l(13, (I = M.active)),
        'border' in M && l(14, (O = M.border)),
        'rounded' in M && l(15, (q = M.rounded)),
        'label' in M && l(2, (Q = M.label)),
        '$$scope' in M && l(21, (v = M.$$scope));
    }),
    (s.$$.update = () => {
      s.$$.dirty[0] & 12289 && l(19, (t = B ? I : `${C} cursor-pointer`)),
        s.$$.dirty[0] & 1 && l(18, (o = B ? 'bg-white/75' : 'bg-white')),
        s.$$.dirty[0] & 1 && l(17, (a = B ? 'translate-x-full' : '')),
        l(
          20,
          (n =
            e.disabled === !0
              ? 'opacity-50'
              : 'hover:brightness-[105%] dark:hover:brightness-110 cursor-pointer'),
        ),
        l(6, (r = `${Fo} ${q} ${n} ${e.class ?? ''}`)),
        s.$$.dirty[0] & 638976 && l(4, (u = `${Uo} ${O} ${q} ${J} ${t}`)),
        s.$$.dirty[0] & 425984 && l(3, (c = `${Mo} ${q} ${o} ${a}`));
    }),
    l(5, (i = `${Lo}`)),
    (e = rt(e)),
    [
      B,
      R,
      Q,
      c,
      u,
      i,
      r,
      K,
      Z,
      e,
      S,
      y,
      C,
      I,
      O,
      q,
      J,
      a,
      o,
      t,
      n,
      v,
      _,
      $,
      H,
      he,
      ie,
      W,
      oe,
      x,
      P,
      te,
    ]
  );
}
class Ro extends xe {
  constructor(e) {
    super(),
      et(
        this,
        e,
        jo,
        Vo,
        tt,
        {
          name: 1,
          checked: 0,
          size: 11,
          background: 12,
          active: 13,
          border: 14,
          rounded: 15,
          label: 2,
        },
        null,
        [-1, -1],
      );
  }
}
function bl(s) {
  let e,
    l,
    t = (s[2][0].title ?? '(title missing)') + '',
    o,
    a,
    n,
    r = (s[2][0].body ?? '(body missing)') + '',
    i,
    u,
    c,
    b,
    h,
    _,
    v = s[0].buttonTextCancel + '',
    S,
    z,
    R,
    B,
    y,
    C,
    I,
    O,
    q,
    Q,
    J,
    K;
  return {
    c() {
      (e = p('div')),
        (l = p('header')),
        (o = T(t)),
        (a = V()),
        (n = p('article')),
        (i = T(r)),
        (u = V()),
        (c = p('input')),
        (b = V()),
        (h = p('footer')),
        (_ = p('button')),
        (S = T(v)),
        (R = V()),
        (B = p('button')),
        (y = T('Add Private')),
        (I = V()),
        (O = p('button')),
        (q = T('Add Public')),
        this.h();
    },
    l(Z) {
      e = m(Z, 'DIV', { class: !0 });
      var $ = k(e);
      l = m($, 'HEADER', { class: !0 });
      var H = k(l);
      (o = N(H, t)),
        H.forEach(d),
        (a = F($)),
        (n = m($, 'ARTICLE', { class: !0 }));
      var he = k(n);
      (i = N(he, r)),
        he.forEach(d),
        (u = F($)),
        (c = m($, 'INPUT', { class: !0, type: !0, placeholder: !0 })),
        (b = F($)),
        (h = m($, 'FOOTER', { class: !0 }));
      var ie = k(h);
      _ = m(ie, 'BUTTON', { class: !0 });
      var W = k(_);
      (S = N(W, v)),
        W.forEach(d),
        (R = F(ie)),
        (B = m(ie, 'BUTTON', { class: !0 }));
      var oe = k(B);
      (y = N(oe, 'Add Private')),
        oe.forEach(d),
        (I = F(ie)),
        (O = m(ie, 'BUTTON', { class: !0 }));
      var x = k(O);
      (q = N(x, 'Add Public')),
        x.forEach(d),
        ie.forEach(d),
        $.forEach(d),
        this.h();
    },
    h() {
      g(l, 'class', Jo),
        g(n, 'class', 'body'),
        g(c, 'class', 'input p-2'),
        g(c, 'type', 'text'),
        g(c, 'placeholder', 'note...'),
        g(_, 'class', (z = 'btn ' + s[0].buttonNeutral)),
        g(
          B,
          'class',
          (C = 'btn variant-filled-warning ' + s[0].buttonPositive),
        ),
        g(O, 'class', (Q = 'btn ' + s[0].buttonPositive)),
        g(h, 'class', 'rid grid-cols-3 gap-2 flex justify-end '),
        g(e, 'class', 'modal-example-form ' + zo);
    },
    m(Z, $) {
      w(Z, e, $),
        f(e, l),
        f(l, o),
        f(e, a),
        f(e, n),
        f(n, i),
        f(e, u),
        f(e, c),
        It(c, s[1].value),
        f(e, b),
        f(e, h),
        f(h, _),
        f(_, S),
        f(h, R),
        f(h, B),
        f(B, y),
        f(h, I),
        f(h, O),
        f(O, q),
        J ||
          ((K = [
            G(c, 'input', s[4]),
            G(_, 'click', function () {
              mt(s[0].onClose) && s[0].onClose.apply(this, arguments);
            }),
            G(B, 'click', s[5]),
            G(O, 'click', s[6]),
          ]),
          (J = !0));
    },
    p(Z, $) {
      (s = Z),
        $ & 4 &&
          t !== (t = (s[2][0].title ?? '(title missing)') + '') &&
          re(o, t),
        $ & 4 &&
          r !== (r = (s[2][0].body ?? '(body missing)') + '') &&
          re(i, r),
        $ & 2 && c.value !== s[1].value && It(c, s[1].value),
        $ & 1 && v !== (v = s[0].buttonTextCancel + '') && re(S, v),
        $ & 1 && z !== (z = 'btn ' + s[0].buttonNeutral) && g(_, 'class', z),
        $ & 1 &&
          C !== (C = 'btn variant-filled-warning ' + s[0].buttonPositive) &&
          g(B, 'class', C),
        $ & 1 && Q !== (Q = 'btn ' + s[0].buttonPositive) && g(O, 'class', Q);
    },
    d(Z) {
      Z && d(e), (J = !1), je(K);
    },
  };
}
function qo(s) {
  let e,
    l = s[2][0] && bl(s);
  return {
    c() {
      l && l.c(), (e = le());
    },
    l(t) {
      l && l.l(t), (e = le());
    },
    m(t, o) {
      l && l.m(t, o), w(t, e, o);
    },
    p(t, [o]) {
      t[2][0]
        ? l
          ? l.p(t, o)
          : ((l = bl(t)), l.c(), l.m(e.parentNode, e))
        : l && (l.d(1), (l = null));
    },
    i: pe,
    o: pe,
    d(t) {
      l && l.d(t), t && d(e);
    },
  };
}
const zo = 'card p-4 w-modal shadow-xl space-y-4',
  Jo = 'text-2xl font-bold';
function Ko(s, e, l) {
  let t;
  Ge(s, Ne, (c) => l(2, (t = c)));
  let { parent: o } = e;
  const a = { value: '', btn: 'pub' };
  function n() {
    t[0].response && t[0].response(a), Ne.close();
  }
  function r() {
    (a.value = this.value), l(1, a);
  }
  const i = () => {
      l(1, (a.btn = 'prv'), a), n();
    },
    u = () => {
      l(1, (a.btn = 'pub'), a), n();
    };
  return (
    (s.$$set = (c) => {
      'parent' in c && l(0, (o = c.parent));
    }),
    [o, a, t, n, r, i, u]
  );
}
class Ho extends xe {
  constructor(e) {
    super(), et(this, e, Ko, qo, tt, { parent: 0 });
  }
}
function pl(s, e, l) {
  const t = s.slice();
  return (t[11] = e[l]), (t[13] = l), t;
}
function ml(s) {
  let e,
    l,
    t = (s[3][0].title ?? '(title missing)') + '',
    o,
    a,
    n,
    r = (s[3][0].body ?? '(body missing)') + '',
    i,
    u,
    c,
    b,
    h,
    _,
    v = s[0].buttonTextCancel + '',
    S,
    z,
    R,
    B,
    y,
    C,
    I,
    O;
  c = new Zl({
    props: {
      class:
        'border border-surface-500 p-4 rounded-container-token max-h-56 overflow-auto',
      $$slots: { default: [Qo] },
      $$scope: { ctx: s },
    },
  });
  let q = (s[2] !== s[3][0].value.tag || s[3][0].value.bkm !== 'pvt') && kl(s),
    Q = (s[2] !== s[3][0].value.tag || s[3][0].value.bkm !== 'pub') && El(s);
  return {
    c() {
      (e = p('div')),
        (l = p('header')),
        (o = T(t)),
        (a = V()),
        (n = p('article')),
        (i = T(r)),
        (u = V()),
        me(c.$$.fragment),
        (b = V()),
        (h = p('footer')),
        (_ = p('button')),
        (S = T(v)),
        (R = V()),
        q && q.c(),
        (B = V()),
        Q && Q.c(),
        this.h();
    },
    l(J) {
      e = m(J, 'DIV', { class: !0 });
      var K = k(e);
      l = m(K, 'HEADER', { class: !0 });
      var Z = k(l);
      (o = N(Z, t)), Z.forEach(d), (a = F(K)), (n = m(K, 'ARTICLE', {}));
      var $ = k(n);
      (i = N($, r)),
        $.forEach(d),
        (u = F(K)),
        ve(c.$$.fragment, K),
        (b = F(K)),
        (h = m(K, 'FOOTER', { class: !0 }));
      var H = k(h);
      _ = m(H, 'BUTTON', { class: !0 });
      var he = k(_);
      (S = N(he, v)),
        he.forEach(d),
        (R = F(H)),
        q && q.l(H),
        (B = F(H)),
        Q && Q.l(H),
        H.forEach(d),
        K.forEach(d),
        this.h();
    },
    h() {
      g(l, 'class', Xo),
        g(_, 'class', (z = 'btn ' + s[0].buttonNeutral)),
        g(h, 'class', (y = 'modal-footer ' + s[0].regionFooter)),
        g(e, 'class', 'modal-example-form ' + Yo);
    },
    m(J, K) {
      w(J, e, K),
        f(e, l),
        f(l, o),
        f(e, a),
        f(e, n),
        f(n, i),
        f(e, u),
        ke(c, e, null),
        f(e, b),
        f(e, h),
        f(h, _),
        f(_, S),
        f(h, R),
        q && q.m(h, null),
        f(h, B),
        Q && Q.m(h, null),
        (C = !0),
        I ||
          ((O = G(_, 'click', function () {
            mt(s[0].onClose) && s[0].onClose.apply(this, arguments);
          })),
          (I = !0));
    },
    p(J, K) {
      (s = J),
        (!C || K & 8) &&
          t !== (t = (s[3][0].title ?? '(title missing)') + '') &&
          re(o, t),
        (!C || K & 8) &&
          r !== (r = (s[3][0].body ?? '(body missing)') + '') &&
          re(i, r);
      const Z = {};
      K & 16404 && (Z.$$scope = { dirty: K, ctx: s }),
        c.$set(Z),
        (!C || K & 1) && v !== (v = s[0].buttonTextCancel + '') && re(S, v),
        (!C || (K & 1 && z !== (z = 'btn ' + s[0].buttonNeutral))) &&
          g(_, 'class', z),
        s[2] !== s[3][0].value.tag || s[3][0].value.bkm !== 'pvt'
          ? q
            ? q.p(s, K)
            : ((q = kl(s)), q.c(), q.m(h, B))
          : q && (q.d(1), (q = null)),
        s[2] !== s[3][0].value.tag || s[3][0].value.bkm !== 'pub'
          ? Q
            ? Q.p(s, K)
            : ((Q = El(s)), Q.c(), Q.m(h, null))
          : Q && (Q.d(1), (Q = null)),
        (!C || (K & 1 && y !== (y = 'modal-footer ' + s[0].regionFooter))) &&
          g(h, 'class', y);
    },
    i(J) {
      C || (A(c.$$.fragment, J), (C = !0));
    },
    o(J) {
      j(c.$$.fragment, J), (C = !1);
    },
    d(J) {
      J && d(e), Ee(c), q && q.d(), Q && Q.d(), (I = !1), O();
    },
  };
}
function Go(s) {
  let e = s[11].tags[0][1] + '',
    l;
  return {
    c() {
      l = T(e);
    },
    l(t) {
      l = N(t, e);
    },
    m(t, o) {
      w(t, l, o);
    },
    p(t, o) {
      o & 16 && e !== (e = t[11].tags[0][1] + '') && re(l, e);
    },
    d(t) {
      t && d(l);
    },
  };
}
function vl(s, e) {
  let l, t, o, a;
  function n(u) {
    e[7](u);
  }
  function r() {
    return e[8](e[11]);
  }
  let i = {
    name: e[11].tags[0][1],
    value: e[13],
    $$slots: { default: [Go] },
    $$scope: { ctx: e },
  };
  return (
    e[2] !== void 0 && (i.group = e[2]),
    (t = new $l({ props: i })),
    $e.push(() => it(t, 'group', n)),
    t.$on('change', r),
    {
      key: s,
      first: null,
      c() {
        (l = le()), me(t.$$.fragment), this.h();
      },
      l(u) {
        (l = le()), ve(t.$$.fragment, u), this.h();
      },
      h() {
        this.first = l;
      },
      m(u, c) {
        w(u, l, c), ke(t, u, c), (a = !0);
      },
      p(u, c) {
        e = u;
        const b = {};
        c & 16 && (b.name = e[11].tags[0][1]),
          c & 16 && (b.value = e[13]),
          c & 16400 && (b.$$scope = { dirty: c, ctx: e }),
          !o && c & 4 && ((o = !0), (b.group = e[2]), ut(() => (o = !1))),
          t.$set(b);
      },
      i(u) {
        a || (A(t.$$.fragment, u), (a = !0));
      },
      o(u) {
        j(t.$$.fragment, u), (a = !1);
      },
      d(u) {
        u && d(l), Ee(t, u);
      },
    }
  );
}
function Qo(s) {
  let e = [],
    l = new Map(),
    t,
    o,
    a = s[4];
  const n = (r) => r[11].tags[0][1];
  for (let r = 0; r < a.length; r += 1) {
    let i = pl(s, a, r),
      u = n(i);
    l.set(u, (e[r] = vl(u, i)));
  }
  return {
    c() {
      for (let r = 0; r < e.length; r += 1) e[r].c();
      t = le();
    },
    l(r) {
      for (let i = 0; i < e.length; i += 1) e[i].l(r);
      t = le();
    },
    m(r, i) {
      for (let u = 0; u < e.length; u += 1) e[u] && e[u].m(r, i);
      w(r, t, i), (o = !0);
    },
    p(r, i) {
      i & 84 &&
        ((a = r[4]),
        we(),
        (e = Ql(e, i, n, 1, r, a, l, t.parentNode, Wl, vl, t, pl)),
        ye());
    },
    i(r) {
      if (!o) {
        for (let i = 0; i < a.length; i += 1) A(e[i]);
        o = !0;
      }
    },
    o(r) {
      for (let i = 0; i < e.length; i += 1) j(e[i]);
      o = !1;
    },
    d(r) {
      for (let i = 0; i < e.length; i += 1) e[i].d(r);
      r && d(t);
    },
  };
}
function kl(s) {
  let e, l, t, o;
  return {
    c() {
      (e = p('button')), (l = T('Private')), this.h();
    },
    l(a) {
      e = m(a, 'BUTTON', { class: !0 });
      var n = k(e);
      (l = N(n, 'Private')), n.forEach(d), this.h();
    },
    h() {
      g(e, 'class', 'btn variant-filled-warning');
    },
    m(a, n) {
      w(a, e, n), f(e, l), t || ((o = G(e, 'click', s[9])), (t = !0));
    },
    p: pe,
    d(a) {
      a && d(e), (t = !1), o();
    },
  };
}
function El(s) {
  let e, l, t, o;
  return {
    c() {
      (e = p('button')), (l = T('Public')), this.h();
    },
    l(a) {
      e = m(a, 'BUTTON', { class: !0 });
      var n = k(e);
      (l = N(n, 'Public')), n.forEach(d), this.h();
    },
    h() {
      g(e, 'class', 'btn variant-filled-primary');
    },
    m(a, n) {
      w(a, e, n), f(e, l), t || ((o = G(e, 'click', s[10])), (t = !0));
    },
    p: pe,
    d(a) {
      a && d(e), (t = !1), o();
    },
  };
}
function Wo(s) {
  let e,
    l,
    t = s[3][0] && ml(s);
  return {
    c() {
      t && t.c(), (e = le());
    },
    l(o) {
      t && t.l(o), (e = le());
    },
    m(o, a) {
      t && t.m(o, a), w(o, e, a), (l = !0);
    },
    p(o, [a]) {
      o[3][0]
        ? t
          ? (t.p(o, a), a & 8 && A(t, 1))
          : ((t = ml(o)), t.c(), A(t, 1), t.m(e.parentNode, e))
        : t &&
          (we(),
          j(t, 1, 1, () => {
            t = null;
          }),
          ye());
    },
    i(o) {
      l || (A(t), (l = !0));
    },
    o(o) {
      j(t), (l = !1);
    },
    d(o) {
      t && t.d(o), o && d(e);
    },
  };
}
const Yo = 'card p-4 w-modal shadow-xl space-y-4 break-all',
  Xo = 'text-2xl font-bold';
function Zo(s, e, l) {
  let t, o;
  Ge(s, Ne, (v) => l(3, (t = v))), Ge(s, Je, (v) => l(4, (o = v)));
  let { parent: a } = e,
    n = { tag: 0, bkm: '' },
    r = 0;
  function i() {
    l(1, (n.tag = r), n),
      t[0].response && t[0].response(n),
      console.log(n),
      Ne.close();
  }
  function u(v) {
    console.log(v), console.log(r);
  }
  function c(v) {
    (r = v), l(2, r);
  }
  const b = (v) => u(v.tags[0][1]),
    h = () => {
      l(1, (n.bkm = 'pvt'), n), i();
    },
    _ = () => {
      l(1, (n.bkm = 'pub'), n), i();
    };
  return (
    (s.$$set = (v) => {
      'parent' in v && l(0, (a = v.parent));
    }),
    [a, n, r, t, o, i, u, c, b, h, _]
  );
}
class $o extends xe {
  constructor(e) {
    super(), et(this, e, Zo, Wo, tt, { parent: 0 });
  }
}
function wl(s, e, l) {
  const t = s.slice();
  return (t[11] = e[l]), (t[13] = l), t;
}
function yl(s) {
  let e,
    l,
    t = (s[4][0].title ?? '(title missing)') + '',
    o,
    a,
    n,
    r = (s[4][0].body ?? '(body missing)') + '',
    i,
    u,
    c,
    b,
    h,
    _,
    v = s[1].buttonTextCancel + '',
    S,
    z,
    R,
    B,
    y,
    C,
    I,
    O,
    q,
    Q,
    J,
    K,
    Z,
    $,
    H,
    he,
    ie,
    W,
    oe = s[1].buttonTextCancel + '',
    x,
    P,
    te,
    M,
    De,
    Be,
    Ce,
    Fe,
    Ie = s[3],
    ae = [];
  for (let ue = 0; ue < Ie.length; ue += 1) ae[ue] = Tl(wl(s, Ie, ue));
  return {
    c() {
      (e = p('div')),
        (l = p('header')),
        (o = T(t)),
        (a = V()),
        (n = p('article')),
        (i = T(r)),
        (u = V()),
        (c = p('input')),
        (b = V()),
        (h = p('footer')),
        (_ = p('button')),
        (S = T(v)),
        (R = V()),
        (B = p('button')),
        (y = T('Add Tag')),
        (O = V()),
        (q = p('article')),
        (Q = T('Select ')),
        (J = p('strong')),
        (K = T('Delete')),
        (Z = T(' Tag')),
        ($ = V()),
        (H = p('select'));
      for (let ue = 0; ue < ae.length; ue += 1) ae[ue].c();
      (he = V()),
        (ie = p('footer')),
        (W = p('button')),
        (x = T(oe)),
        (te = V()),
        (M = p('button')),
        (De = T('Delete Tag')),
        this.h();
    },
    l(ue) {
      e = m(ue, 'DIV', { class: !0 });
      var ee = k(e);
      l = m(ee, 'HEADER', { class: !0 });
      var ce = k(l);
      (o = N(ce, t)),
        ce.forEach(d),
        (a = F(ee)),
        (n = m(ee, 'ARTICLE', { class: !0 }));
      var Re = k(n);
      (i = N(Re, r)),
        Re.forEach(d),
        (u = F(ee)),
        (c = m(ee, 'INPUT', { class: !0, type: !0, placeholder: !0 })),
        (b = F(ee)),
        (h = m(ee, 'FOOTER', { class: !0 }));
      var Se = k(h);
      _ = m(Se, 'BUTTON', { class: !0 });
      var qe = k(_);
      (S = N(qe, v)),
        qe.forEach(d),
        (R = F(Se)),
        (B = m(Se, 'BUTTON', { class: !0 }));
      var Qe = k(B);
      (y = N(Qe, 'Add Tag')),
        Qe.forEach(d),
        Se.forEach(d),
        (O = F(ee)),
        (q = m(ee, 'ARTICLE', { class: !0 }));
      var Ke = k(q);
      (Q = N(Ke, 'Select ')), (J = m(Ke, 'STRONG', {}));
      var We = k(J);
      (K = N(We, 'Delete')),
        We.forEach(d),
        (Z = N(Ke, ' Tag')),
        Ke.forEach(d),
        ($ = F(ee)),
        (H = m(ee, 'SELECT', { class: !0, size: !0 }));
      var Le = k(H);
      for (let Ye = 0; Ye < ae.length; Ye += 1) ae[Ye].l(Le);
      Le.forEach(d), (he = F(ee)), (ie = m(ee, 'FOOTER', { class: !0 }));
      var Ve = k(ie);
      W = m(Ve, 'BUTTON', { class: !0 });
      var lt = k(W);
      (x = N(lt, oe)),
        lt.forEach(d),
        (te = F(Ve)),
        (M = m(Ve, 'BUTTON', { class: !0 }));
      var ot = k(M);
      (De = N(ot, 'Delete Tag')),
        ot.forEach(d),
        Ve.forEach(d),
        ee.forEach(d),
        this.h();
    },
    h() {
      g(l, 'class', ts),
        g(n, 'class', 'body'),
        g(c, 'class', 'input p-2'),
        g(c, 'type', 'text'),
        g(c, 'placeholder', 'tag name'),
        g(_, 'class', (z = 'btn ' + s[1].buttonNeutral)),
        g(B, 'class', (C = 'btn ' + s[1].buttonPositive)),
        g(h, 'class', (I = 'modal-footer ' + s[1].regionFooter)),
        g(q, 'class', 'whitespace-pre-wrap break-words'),
        g(H, 'class', 'select'),
        g(H, 'size', '1'),
        s[0] === void 0 && lo(() => s[9].call(H)),
        g(W, 'class', (P = 'btn ' + s[1].buttonNeutral)),
        g(M, 'class', 'btn variant-filled-warning'),
        g(ie, 'class', (Be = 'modal-footer ' + s[1].regionFooter)),
        g(e, 'class', 'modal-example-form ' + es);
    },
    m(ue, ee) {
      w(ue, e, ee),
        f(e, l),
        f(l, o),
        f(e, a),
        f(e, n),
        f(n, i),
        f(e, u),
        f(e, c),
        It(c, s[2].value),
        f(e, b),
        f(e, h),
        f(h, _),
        f(_, S),
        f(h, R),
        f(h, B),
        f(B, y),
        f(e, O),
        f(e, q),
        f(q, Q),
        f(q, J),
        f(J, K),
        f(q, Z),
        f(e, $),
        f(e, H);
      for (let ce = 0; ce < ae.length; ce += 1) ae[ce] && ae[ce].m(H, null);
      sl(H, s[0], !0),
        f(e, he),
        f(e, ie),
        f(ie, W),
        f(W, x),
        f(ie, te),
        f(ie, M),
        f(M, De),
        Ce ||
          ((Fe = [
            G(c, 'input', s[8]),
            G(_, 'click', function () {
              mt(s[1].onClose) && s[1].onClose.apply(this, arguments);
            }),
            G(B, 'click', s[6]),
            G(H, 'change', s[9]),
            G(H, 'change', s[5]),
            G(W, 'click', function () {
              mt(s[1].onClose) && s[1].onClose.apply(this, arguments);
            }),
            G(M, 'click', s[7]),
          ]),
          (Ce = !0));
    },
    p(ue, ee) {
      if (
        ((s = ue),
        ee & 16 &&
          t !== (t = (s[4][0].title ?? '(title missing)') + '') &&
          re(o, t),
        ee & 16 &&
          r !== (r = (s[4][0].body ?? '(body missing)') + '') &&
          re(i, r),
        ee & 4 && c.value !== s[2].value && It(c, s[2].value),
        ee & 2 && v !== (v = s[1].buttonTextCancel + '') && re(S, v),
        ee & 2 && z !== (z = 'btn ' + s[1].buttonNeutral) && g(_, 'class', z),
        ee & 2 && C !== (C = 'btn ' + s[1].buttonPositive) && g(B, 'class', C),
        ee & 2 &&
          I !== (I = 'modal-footer ' + s[1].regionFooter) &&
          g(h, 'class', I),
        ee & 8)
      ) {
        Ie = s[3];
        let ce;
        for (ce = 0; ce < Ie.length; ce += 1) {
          const Re = wl(s, Ie, ce);
          ae[ce]
            ? ae[ce].p(Re, ee)
            : ((ae[ce] = Tl(Re)), ae[ce].c(), ae[ce].m(H, null));
        }
        for (; ce < ae.length; ce += 1) ae[ce].d(1);
        ae.length = Ie.length;
      }
      ee & 1 && sl(H, s[0]),
        ee & 2 && oe !== (oe = s[1].buttonTextCancel + '') && re(x, oe),
        ee & 2 && P !== (P = 'btn ' + s[1].buttonNeutral) && g(W, 'class', P),
        ee & 2 &&
          Be !== (Be = 'modal-footer ' + s[1].regionFooter) &&
          g(ie, 'class', Be);
    },
    d(ue) {
      ue && d(e), ct(ae, ue), (Ce = !1), je(Fe);
    },
  };
}
function Tl(s) {
  let e,
    l = s[11].tags[0][1] + '',
    t;
  return {
    c() {
      (e = p('option')), (t = T(l)), this.h();
    },
    l(o) {
      e = m(o, 'OPTION', {});
      var a = k(e);
      (t = N(a, l)), a.forEach(d), this.h();
    },
    h() {
      (e.__value = s[13]), (e.value = e.__value);
    },
    m(o, a) {
      w(o, e, a), f(e, t);
    },
    p(o, a) {
      a & 8 && l !== (l = o[11].tags[0][1] + '') && re(t, l);
    },
    d(o) {
      o && d(e);
    },
  };
}
function xo(s) {
  let e,
    l = s[4][0] && yl(s);
  return {
    c() {
      l && l.c(), (e = le());
    },
    l(t) {
      l && l.l(t), (e = le());
    },
    m(t, o) {
      l && l.m(t, o), w(t, e, o);
    },
    p(t, [o]) {
      t[4][0]
        ? l
          ? l.p(t, o)
          : ((l = yl(t)), l.c(), l.m(e.parentNode, e))
        : l && (l.d(1), (l = null));
    },
    i: pe,
    o: pe,
    d(t) {
      l && l.d(t), t && d(e);
    },
  };
}
const es = 'card p-4 w-modal shadow-xl space-y-4',
  ts = 'text-2xl font-bold';
function ls(s, e, l) {
  let t, o;
  Ge(s, Je, (v) => l(3, (t = v))), Ge(s, Ne, (v) => l(4, (o = v)));
  let { parent: a } = e,
    { selectedValue: n } = e,
    r = { value: '', btn: '', tagIndex: 0 };
  function i() {
    r.tagIndex === void 0 && l(2, (r.tagIndex = 0), r),
      o[0].response && o[0].response(r),
      Ne.close();
  }
  function u() {
    console.log(n), l(2, (r.tagIndex = n), r);
  }
  function c() {
    if (r.value === '') {
      const v = {
        message: 'タグ名を入力してください',
        timeout: 3e3,
        background: 'variant-filled-error',
      };
      fe.trigger(v);
    } else if (t.some((v) => v.tags[0][1] === r.value)) {
      const v = {
        message: '同じ名前のタグが既に存在します',
        timeout: 3e3,
        background: 'variant-filled-error',
      };
      fe.trigger(v);
    } else l(2, (r.btn = 'add'), r), i();
  }
  function b() {
    const v = {
      message: `Are you sure you delete  tag [${t[r.tagIndex].tags[0][1]}]?`,
      timeout: 1e4,
      background: 'variant-filled-warning',
      action: {
        label: 'Delete',
        response: async () => {
          l(2, (r.btn = 'delete'), r), i();
        },
      },
    };
    fe.trigger(v);
  }
  function h() {
    (r.value = this.value), l(2, r);
  }
  function _() {
    (n = oo(this)), l(0, n);
  }
  return (
    (s.$$set = (v) => {
      'parent' in v && l(1, (a = v.parent)),
        'selectedValue' in v && l(0, (n = v.selectedValue));
    }),
    [n, a, r, t, o, u, c, b, h, _]
  );
}
class os extends xe {
  constructor(e) {
    super(), et(this, e, ls, xo, tt, { parent: 1, selectedValue: 0 });
  }
}
function Nl(s, e, l) {
  const t = s.slice();
  return (t[7] = e[l]), (t[9] = l), t;
}
function Dl(s) {
  let e,
    l,
    t = (s[2][0].title ?? '(title missing)') + '',
    o,
    a,
    n,
    r = (s[2][0].body ?? '(body missing)') + '',
    i,
    u,
    c,
    b,
    h,
    _,
    v = s[0].buttonTextCancel + '',
    S,
    z,
    R,
    B,
    y,
    C;
  return (
    (c = new Zl({
      props: {
        class:
          'border border-surface-500 p-4 rounded-container-token max-h-80 overflow-y-auto',
        $$slots: { default: [ns] },
        $$scope: { ctx: s },
      },
    })),
    {
      c() {
        (e = p('div')),
          (l = p('header')),
          (o = T(t)),
          (a = V()),
          (n = p('article')),
          (i = T(r)),
          (u = V()),
          me(c.$$.fragment),
          (b = V()),
          (h = p('footer')),
          (_ = p('button')),
          (S = T(v)),
          this.h();
      },
      l(I) {
        e = m(I, 'DIV', { class: !0 });
        var O = k(e);
        l = m(O, 'HEADER', { class: !0 });
        var q = k(l);
        (o = N(q, t)), q.forEach(d), (a = F(O)), (n = m(O, 'ARTICLE', {}));
        var Q = k(n);
        (i = N(Q, r)),
          Q.forEach(d),
          (u = F(O)),
          ve(c.$$.fragment, O),
          (b = F(O)),
          (h = m(O, 'FOOTER', { class: !0 }));
        var J = k(h);
        _ = m(J, 'BUTTON', { class: !0 });
        var K = k(_);
        (S = N(K, v)), K.forEach(d), J.forEach(d), O.forEach(d), this.h();
      },
      h() {
        g(l, 'class', is),
          g(_, 'class', (z = 'btn ' + s[0].buttonNeutral)),
          g(h, 'class', (R = 'modal-footer ' + s[0].regionFooter)),
          g(e, 'class', 'modal-example-form ' + rs);
      },
      m(I, O) {
        w(I, e, O),
          f(e, l),
          f(l, o),
          f(e, a),
          f(e, n),
          f(n, i),
          f(e, u),
          ke(c, e, null),
          f(e, b),
          f(e, h),
          f(h, _),
          f(_, S),
          (B = !0),
          y ||
            ((C = G(_, 'click', function () {
              mt(s[0].onClose) && s[0].onClose.apply(this, arguments);
            })),
            (y = !0));
      },
      p(I, O) {
        (s = I),
          (!B || O & 4) &&
            t !== (t = (s[2][0].title ?? '(title missing)') + '') &&
            re(o, t),
          (!B || O & 4) &&
            r !== (r = (s[2][0].body ?? '(body missing)') + '') &&
            re(i, r);
        const q = {};
        O & 1030 && (q.$$scope = { dirty: O, ctx: s }),
          c.$set(q),
          (!B || O & 1) && v !== (v = s[0].buttonTextCancel + '') && re(S, v),
          (!B || (O & 1 && z !== (z = 'btn ' + s[0].buttonNeutral))) &&
            g(_, 'class', z),
          (!B || (O & 1 && R !== (R = 'modal-footer ' + s[0].regionFooter))) &&
            g(h, 'class', R);
      },
      i(I) {
        B || (A(c.$$.fragment, I), (B = !0));
      },
      o(I) {
        j(c.$$.fragment, I), (B = !1);
      },
      d(I) {
        I && d(e), Ee(c), (y = !1), C();
      },
    }
  );
}
function ss(s) {
  let e = s[7] + '',
    l;
  return {
    c() {
      l = T(e);
    },
    l(t) {
      l = N(t, e);
    },
    m(t, o) {
      w(t, l, o);
    },
    p(t, o) {
      o & 4 && e !== (e = t[7] + '') && re(l, e);
    },
    d(t) {
      t && d(l);
    },
  };
}
function Bl(s) {
  let e, l, t;
  function o(r) {
    s[4](r);
  }
  function a() {
    return s[5](s[9]);
  }
  let n = {
    name: s[7],
    value: s[9],
    class: 'truncate',
    $$slots: { default: [ss] },
    $$scope: { ctx: s },
  };
  return (
    s[1] !== void 0 && (n.group = s[1]),
    (e = new $l({ props: n })),
    $e.push(() => it(e, 'group', o)),
    e.$on('change', a),
    {
      c() {
        me(e.$$.fragment);
      },
      l(r) {
        ve(e.$$.fragment, r);
      },
      m(r, i) {
        ke(e, r, i), (t = !0);
      },
      p(r, i) {
        s = r;
        const u = {};
        i & 4 && (u.name = s[7]),
          i & 1028 && (u.$$scope = { dirty: i, ctx: s }),
          !l && i & 2 && ((l = !0), (u.group = s[1]), ut(() => (l = !1))),
          e.$set(u);
      },
      i(r) {
        t || (A(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        j(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        Ee(e, r);
      },
    }
  );
}
function ns(s) {
  let e,
    l,
    t = s[2][0].value.tagList,
    o = [];
  for (let n = 0; n < t.length; n += 1) o[n] = Bl(Nl(s, t, n));
  const a = (n) =>
    j(o[n], 1, 1, () => {
      o[n] = null;
    });
  return {
    c() {
      for (let n = 0; n < o.length; n += 1) o[n].c();
      e = le();
    },
    l(n) {
      for (let r = 0; r < o.length; r += 1) o[r].l(n);
      e = le();
    },
    m(n, r) {
      for (let i = 0; i < o.length; i += 1) o[i] && o[i].m(n, r);
      w(n, e, r), (l = !0);
    },
    p(n, r) {
      if (r & 14) {
        t = n[2][0].value.tagList;
        let i;
        for (i = 0; i < t.length; i += 1) {
          const u = Nl(n, t, i);
          o[i]
            ? (o[i].p(u, r), A(o[i], 1))
            : ((o[i] = Bl(u)), o[i].c(), A(o[i], 1), o[i].m(e.parentNode, e));
        }
        for (we(), i = t.length; i < o.length; i += 1) a(i);
        ye();
      }
    },
    i(n) {
      if (!l) {
        for (let r = 0; r < t.length; r += 1) A(o[r]);
        l = !0;
      }
    },
    o(n) {
      o = o.filter(Boolean);
      for (let r = 0; r < o.length; r += 1) j(o[r]);
      l = !1;
    },
    d(n) {
      ct(o, n), n && d(e);
    },
  };
}
function as(s) {
  let e,
    l,
    t = s[2][0] && Dl(s);
  return {
    c() {
      t && t.c(), (e = le());
    },
    l(o) {
      t && t.l(o), (e = le());
    },
    m(o, a) {
      t && t.m(o, a), w(o, e, a), (l = !0);
    },
    p(o, [a]) {
      o[2][0]
        ? t
          ? (t.p(o, a), a & 4 && A(t, 1))
          : ((t = Dl(o)), t.c(), A(t, 1), t.m(e.parentNode, e))
        : t &&
          (we(),
          j(t, 1, 1, () => {
            t = null;
          }),
          ye());
    },
    i(o) {
      l || (A(t), (l = !0));
    },
    o(o) {
      j(t), (l = !1);
    },
    d(o) {
      t && t.d(o), o && d(e);
    },
  };
}
const rs = 'card p-4 w-modal shadow-xl space-y-4 break-all',
  is = 'text-2xl font-bold';
function us(s, e, l) {
  let t;
  Ge(s, Ne, (c) => l(2, (t = c)));
  let { parent: o } = e,
    a = { index: -1 },
    n;
  function r(c) {
    (a.index = c),
      t[0].response && t[0].response(a),
      console.log(a),
      Ne.close();
  }
  function i(c) {
    (n = c), l(1, n);
  }
  const u = (c) => r(c);
  return (
    (s.$$set = (c) => {
      'parent' in c && l(0, (o = c.parent));
    }),
    [o, n, t, r, i, u]
  );
}
class cs extends xe {
  constructor(e) {
    super(), et(this, e, us, as, tt, { parent: 0 });
  }
}
const { document: bt } = ao;
function Cl(s, e, l) {
  const t = s.slice();
  return (t[62] = e[l]), (t[64] = l), t;
}
function Il(s, e, l) {
  const t = s.slice();
  return (t[70] = e[l]), t;
}
function Ol(s, e, l) {
  const t = s.slice();
  return (t[67] = e[l]), t;
}
function Al(s, e, l) {
  const t = s.slice();
  return (t[73] = e[l]), (t[64] = l), t;
}
function Sl(s, e, l) {
  const t = s.slice();
  return (t[75] = e[l]), t;
}
function Pl(s) {
  let e,
    l = s[75] + '',
    t;
  return {
    c() {
      (e = p('li')), (t = T(l)), this.h();
    },
    l(o) {
      e = m(o, 'LI', { class: !0 });
      var a = k(e);
      (t = N(a, l)), a.forEach(d), this.h();
    },
    h() {
      g(e, 'class', 'ml-4');
    },
    m(o, a) {
      w(o, e, a), f(e, t);
    },
    p: pe,
    d(o) {
      o && d(e);
    },
  };
}
function fs(s) {
  let e, l, t, o, a, n, r, i;
  return (
    (t = new _o({
      props: {
        gridColumns: 'grid grid-cols-[auto_1fr_auto]',
        slotDefault: 'place-self-center',
        slotTrail: 'place-self-end',
        padding: 'p-0',
        background: 'bg-surface-300-600-token ',
        gap: 'gap-0',
        $$slots: { trail: [vs], lead: [bs], default: [gs] },
        $$scope: { ctx: s },
      },
    })),
    (a = new Yl({
      props: {
        justify: 'justify-center',
        flex: 'flex-1',
        rounded: '',
        class: 'bg-surface-50/80 w-full drop-shadow',
        $$slots: { default: [ws] },
        $$scope: { ctx: s },
      },
    })),
    (r = new ho({
      props: { relays: go, $$slots: { default: [Ls] }, $$scope: { ctx: s } },
    })),
    {
      c() {
        (e = p('div')),
          (l = p('div')),
          me(t.$$.fragment),
          (o = V()),
          me(a.$$.fragment),
          (n = V()),
          me(r.$$.fragment),
          this.h();
      },
      l(u) {
        e = m(u, 'DIV', { class: !0 });
        var c = k(e);
        l = m(c, 'DIV', { class: !0 });
        var b = k(l);
        ve(t.$$.fragment, b),
          (o = F(b)),
          ve(a.$$.fragment, b),
          b.forEach(d),
          c.forEach(d),
          (n = F(u)),
          ve(r.$$.fragment, u),
          this.h();
      },
      h() {
        g(l, 'class', 'max-w-screen-lg m-auto z-10'),
          g(
            e,
            'class',
            'w-full fixed top-0 left-1/2 transform -translate-x-1/2 z-10',
          );
      },
      m(u, c) {
        w(u, e, c),
          f(e, l),
          ke(t, l, null),
          f(l, o),
          ke(a, l, null),
          w(u, n, c),
          ke(r, u, c),
          (i = !0);
      },
      p(u, c) {
        const b = {};
        (c[0] & 991) | (c[2] & 65536) && (b.$$scope = { dirty: c, ctx: u }),
          t.$set(b);
        const h = {};
        (c[0] & 541) | (c[2] & 65536) && (h.$$scope = { dirty: c, ctx: u }),
          a.$set(h);
        const _ = {};
        (c[0] & 479) | (c[2] & 65536) && (_.$$scope = { dirty: c, ctx: u }),
          r.$set(_);
      },
      i(u) {
        i ||
          (A(t.$$.fragment, u),
          A(a.$$.fragment, u),
          A(r.$$.fragment, u),
          (i = !0));
      },
      o(u) {
        j(t.$$.fragment, u), j(a.$$.fragment, u), j(r.$$.fragment, u), (i = !1);
      },
      d(u) {
        u && d(e), Ee(t), Ee(a), u && d(n), Ee(r, u);
      },
    }
  );
}
function ds(s) {
  let e;
  return {
    c() {
      e = T(s[5]);
    },
    l(l) {
      e = N(l, s[5]);
    },
    m(l, t) {
      w(l, e, t);
    },
    p(l, t) {
      t[0] & 32 && re(e, l[5]);
    },
    i: pe,
    o: pe,
    d(l) {
      l && d(e);
    },
  };
}
function Vl(s) {
  let e, l, t;
  function o(r) {
    s[31](r);
  }
  function a() {
    return s[32](s[64]);
  }
  let n = {
    name: s[73].tags[0][1],
    value: s[64],
    $$slots: { default: [_s] },
    $$scope: { ctx: s },
  };
  return (
    s[2] !== void 0 && (n.group = s[2]),
    (e = new jt({ props: n })),
    $e.push(() => it(e, 'group', o)),
    e.$on('change', a),
    {
      c() {
        me(e.$$.fragment);
      },
      l(r) {
        ve(e.$$.fragment, r);
      },
      m(r, i) {
        ke(e, r, i), (t = !0);
      },
      p(r, i) {
        s = r;
        const u = {};
        i[0] & 512 && (u.name = s[73].tags[0][1]),
          i[0] & 512 && (u.value = s[64]),
          (i[0] & 512) | (i[2] & 65536) && (u.$$scope = { dirty: i, ctx: s }),
          !l && i[0] & 4 && ((l = !0), (u.group = s[2]), ut(() => (l = !1))),
          e.$set(u);
      },
      i(r) {
        t || (A(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        j(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        Ee(e, r);
      },
    }
  );
}
function _s(s) {
  let e = s[73].tags[0][1] + '',
    l,
    t;
  return {
    c() {
      (l = T(e)), (t = V());
    },
    l(o) {
      (l = N(o, e)), (t = F(o));
    },
    m(o, a) {
      w(o, l, a), w(o, t, a);
    },
    p(o, a) {
      a[0] & 512 && e !== (e = o[73].tags[0][1] + '') && re(l, e);
    },
    d(o) {
      o && d(l), o && d(t);
    },
  };
}
function Fl(s, e) {
  let l,
    t,
    o,
    a = !e[8] && Vl(e);
  return {
    key: s,
    first: null,
    c() {
      (l = le()), a && a.c(), (t = le()), this.h();
    },
    l(n) {
      (l = le()), a && a.l(n), (t = le()), this.h();
    },
    h() {
      this.first = l;
    },
    m(n, r) {
      w(n, l, r), a && a.m(n, r), w(n, t, r), (o = !0);
    },
    p(n, r) {
      (e = n),
        e[8]
          ? a &&
            (we(),
            j(a, 1, 1, () => {
              a = null;
            }),
            ye())
          : a
          ? (a.p(e, r), r[0] & 256 && A(a, 1))
          : ((a = Vl(e)), a.c(), A(a, 1), a.m(t.parentNode, t));
    },
    i(n) {
      o || (A(a), (o = !0));
    },
    o(n) {
      j(a), (o = !1);
    },
    d(n) {
      n && d(l), a && a.d(n), n && d(t);
    },
  };
}
function hs(s) {
  let e = [],
    l = new Map(),
    t,
    o,
    a = s[9];
  const n = (r) => r[73].tags[0][1];
  for (let r = 0; r < a.length; r += 1) {
    let i = Al(s, a, r),
      u = n(i);
    l.set(u, (e[r] = Fl(u, i)));
  }
  return {
    c() {
      for (let r = 0; r < e.length; r += 1) e[r].c();
      t = le();
    },
    l(r) {
      for (let i = 0; i < e.length; i += 1) e[i].l(r);
      t = le();
    },
    m(r, i) {
      for (let u = 0; u < e.length; u += 1) e[u] && e[u].m(r, i);
      w(r, t, i), (o = !0);
    },
    p(r, i) {
      i[0] & 8389406 &&
        ((a = r[9]),
        we(),
        (e = Ql(e, i, n, 1, r, a, l, t.parentNode, Wl, Fl, t, Al)),
        ye());
    },
    i(r) {
      if (!o) {
        for (let i = 0; i < a.length; i += 1) A(e[i]);
        o = !0;
      }
    },
    o(r) {
      for (let i = 0; i < e.length; i += 1) j(e[i]);
      o = !1;
    },
    d(r) {
      for (let i = 0; i < e.length; i += 1) e[i].d(r);
      r && d(t);
    },
  };
}
function gs(s) {
  let e, l, t, o, a;
  return (
    (l = new Yl({
      props: {
        padding: 'py-3 px-4',
        justify: 'justify',
        active: 'variant-filled-secondary',
        hover: 'hover:variant-soft-secondary',
        border: 'border-b border-surface-400-500-token',
        rounded: 'rounded-tl-container-token rounded-tr-container-token',
        $$slots: { default: [hs] },
        $$scope: { ctx: s },
      },
    })),
    {
      c() {
        (e = p('div')), me(l.$$.fragment), this.h();
      },
      l(n) {
        e = m(n, 'DIV', { class: !0 });
        var r = k(e);
        ve(l.$$.fragment, r), r.forEach(d), this.h();
      },
      h() {
        g(e, 'class', 'tabGroup svelte-cq9msn');
      },
      m(n, r) {
        w(n, e, r),
          ke(l, e, null),
          (t = !0),
          o || ((a = G(e, 'wheel', zs)), (o = !0));
      },
      p(n, r) {
        const i = {};
        (r[0] & 798) | (r[2] & 65536) && (i.$$scope = { dirty: r, ctx: n }),
          l.$set(i);
      },
      i(n) {
        t || (A(l.$$.fragment, n), (t = !0));
      },
      o(n) {
        j(l.$$.fragment, n), (t = !1);
      },
      d(n) {
        n && d(e), Ee(l), (o = !1), a();
      },
    }
  );
}
function bs(s) {
  let e, l, t, o, a;
  return {
    c() {
      (e = p('div')), (l = p('button')), (t = T('📝')), this.h();
    },
    l(n) {
      e = m(n, 'DIV', { class: !0 });
      var r = k(e);
      l = m(r, 'BUTTON', { class: !0 });
      var i = k(l);
      (t = N(i, '📝')), i.forEach(d), r.forEach(d), this.h();
    },
    h() {
      g(l, 'class', 'btn-icon variant-filled'),
        g(e, 'class', 'lead-icon pl-2 z-20');
    },
    m(n, r) {
      w(n, e, r),
        f(e, l),
        f(l, t),
        o || ((a = ro(Eo.call(null, l, s[12]))), (o = !0));
    },
    p: pe,
    d(n) {
      n && d(e), (o = !1), a();
    },
  };
}
function ps(s) {
  let e, l, t, o, a, n, r;
  function i(c) {
    s[29](c);
  }
  let u = { name: 'slider-small', size: 'sm' };
  return (
    s[1] !== void 0 && (u.checked = s[1]),
    (a = new Ro({ props: u })),
    $e.push(() => it(a, 'checked', i)),
    a.$on('change', s[30]),
    {
      c() {
        (e = p('div')),
          (l = T('mode')),
          (t = V()),
          (o = p('div')),
          me(a.$$.fragment),
          this.h();
      },
      l(c) {
        e = m(c, 'DIV', {});
        var b = k(e);
        (l = N(b, 'mode')),
          b.forEach(d),
          (t = F(c)),
          (o = m(c, 'DIV', { class: !0 }));
        var h = k(o);
        ve(a.$$.fragment, h), h.forEach(d), this.h();
      },
      h() {
        g(o, 'class', 'sliderContainer');
      },
      m(c, b) {
        w(c, e, b), f(e, l), w(c, t, b), w(c, o, b), ke(a, o, null), (r = !0);
      },
      p(c, b) {
        const h = {};
        !n && b[0] & 2 && ((n = !0), (h.checked = c[1]), ut(() => (n = !1))),
          a.$set(h);
      },
      i(c) {
        r || (A(a.$$.fragment, c), (r = !0));
      },
      o(c) {
        j(a.$$.fragment, c), (r = !1);
      },
      d(c) {
        c && d(e), c && d(t), c && d(o), Ee(a);
      },
    }
  );
}
function ms(s) {
  let e, l, t, o;
  return {
    c() {
      (e = p('button')), (l = T('Login')), this.h();
    },
    l(a) {
      e = m(a, 'BUTTON', { type: !0, class: !0 });
      var n = k(e);
      (l = N(n, 'Login')), n.forEach(d), this.h();
    },
    h() {
      g(e, 'type', 'button'), g(e, 'class', 'btn-icon variant-filled');
    },
    m(a, n) {
      w(a, e, n), f(e, l), t || ((o = G(e, 'click', s[13])), (t = !0));
    },
    p: pe,
    i: pe,
    o: pe,
    d(a) {
      a && d(e), (t = !1), o();
    },
  };
}
function vs(s) {
  let e, l, t, o;
  const a = [ms, ps],
    n = [];
  function r(i, u) {
    return i[0] ? 1 : 0;
  }
  return (
    (l = r(s)),
    (t = n[l] = a[l](s)),
    {
      c() {
        (e = p('div')), t.c(), this.h();
      },
      l(i) {
        e = m(i, 'DIV', { class: !0 });
        var u = k(e);
        t.l(u), u.forEach(d), this.h();
      },
      h() {
        g(e, 'class', 'pr-2 text-center justify-center');
      },
      m(i, u) {
        w(i, e, u), n[l].m(e, null), (o = !0);
      },
      p(i, u) {
        let c = l;
        (l = r(i)),
          l === c
            ? n[l].p(i, u)
            : (we(),
              j(n[c], 1, 1, () => {
                n[c] = null;
              }),
              ye(),
              (t = n[l]),
              t ? t.p(i, u) : ((t = n[l] = a[l](i)), t.c()),
              A(t, 1),
              t.m(e, null));
      },
      i(i) {
        o || (A(t), (o = !0));
      },
      o(i) {
        j(t), (o = !1);
      },
      d(i) {
        i && d(e), n[l].d();
      },
    }
  );
}
function ks(s) {
  let e;
  return {
    c() {
      e = T('public');
    },
    l(l) {
      e = N(l, 'public');
    },
    m(l, t) {
      w(l, e, t);
    },
    d(l) {
      l && d(e);
    },
  };
}
function Ll(s) {
  let e, l, t;
  function o(n) {
    s[35](n);
  }
  let a = {
    name: 'pvt',
    value: 'pvt',
    $$slots: { default: [Es] },
    $$scope: { ctx: s },
  };
  return (
    s[3] !== void 0 && (a.group = s[3]),
    (e = new jt({ props: a })),
    $e.push(() => it(e, 'group', o)),
    e.$on('change', s[36]),
    {
      c() {
        me(e.$$.fragment);
      },
      l(n) {
        ve(e.$$.fragment, n);
      },
      m(n, r) {
        ke(e, n, r), (t = !0);
      },
      p(n, r) {
        const i = {};
        r[2] & 65536 && (i.$$scope = { dirty: r, ctx: n }),
          !l && r[0] & 8 && ((l = !0), (i.group = n[3]), ut(() => (l = !1))),
          e.$set(i);
      },
      i(n) {
        t || (A(e.$$.fragment, n), (t = !0));
      },
      o(n) {
        j(e.$$.fragment, n), (t = !1);
      },
      d(n) {
        Ee(e, n);
      },
    }
  );
}
function Es(s) {
  let e;
  return {
    c() {
      e = T('private');
    },
    l(l) {
      e = N(l, 'private');
    },
    m(l, t) {
      w(l, e, t);
    },
    d(l) {
      l && d(e);
    },
  };
}
function ws(s) {
  let e, l, t, o, a;
  function n(u) {
    s[33](u);
  }
  let r = {
    name: 'pub',
    value: 'pub',
    $$slots: { default: [ks] },
    $$scope: { ctx: s },
  };
  s[3] !== void 0 && (r.group = s[3]),
    (e = new jt({ props: r })),
    $e.push(() => it(e, 'group', n)),
    e.$on('change', s[34]);
  let i = s[0] && Ll(s);
  return {
    c() {
      me(e.$$.fragment), (t = V()), i && i.c(), (o = le());
    },
    l(u) {
      ve(e.$$.fragment, u), (t = F(u)), i && i.l(u), (o = le());
    },
    m(u, c) {
      ke(e, u, c), w(u, t, c), i && i.m(u, c), w(u, o, c), (a = !0);
    },
    p(u, c) {
      const b = {};
      c[2] & 65536 && (b.$$scope = { dirty: c, ctx: u }),
        !l && c[0] & 8 && ((l = !0), (b.group = u[3]), ut(() => (l = !1))),
        e.$set(b),
        u[0]
          ? i
            ? (i.p(u, c), c[0] & 1 && A(i, 1))
            : ((i = Ll(u)), i.c(), A(i, 1), i.m(o.parentNode, o))
          : i &&
            (we(),
            j(i, 1, 1, () => {
              i = null;
            }),
            ye());
    },
    i(u) {
      a || (A(e.$$.fragment, u), A(i), (a = !0));
    },
    o(u) {
      j(e.$$.fragment, u), j(i), (a = !1);
    },
    d(u) {
      Ee(e, u), u && d(t), i && i.d(u), u && d(o);
    },
  };
}
function Ul(s) {
  let e,
    l,
    t = s[4],
    o = [];
  for (let n = 0; n < t.length; n += 1) o[n] = Kl(Cl(s, t, n));
  const a = (n) =>
    j(o[n], 1, 1, () => {
      o[n] = null;
    });
  return {
    c() {
      for (let n = 0; n < o.length; n += 1) o[n].c();
      e = le();
    },
    l(n) {
      for (let r = 0; r < o.length; r += 1) o[r].l(n);
      e = le();
    },
    m(n, r) {
      for (let i = 0; i < o.length; i += 1) o[i] && o[i].m(n, r);
      w(n, e, r), (l = !0);
    },
    p(n, r) {
      if ((r[0] & 151831007) | (r[2] & 24)) {
        t = n[4];
        let i;
        for (i = 0; i < t.length; i += 1) {
          const u = Cl(n, t, i);
          o[i]
            ? (o[i].p(u, r), A(o[i], 1))
            : ((o[i] = Kl(u)), o[i].c(), A(o[i], 1), o[i].m(e.parentNode, e));
        }
        for (we(), i = t.length; i < o.length; i += 1) a(i);
        ye();
      }
    },
    i(n) {
      if (!l) {
        for (let r = 0; r < t.length; r += 1) A(o[r]);
        l = !0;
      }
    },
    o(n) {
      o = o.filter(Boolean);
      for (let r = 0; r < o.length; r += 1) j(o[r]);
      l = !1;
    },
    d(n) {
      ct(o, n), n && d(e);
    },
  };
}
function ys(s) {
  let e,
    l,
    t,
    o = s[62][0] + '',
    a,
    n,
    r,
    i,
    u = s[62].slice(1),
    c = [];
  for (let b = 0; b < u.length; b += 1) c[b] = Ml(Il(s, u, b));
  return {
    c() {
      (e = p('div')),
        (l = p('div')),
        (t = p('div')),
        (a = T(o)),
        (n = V()),
        (r = p('div'));
      for (let b = 0; b < c.length; b += 1) c[b].c();
      (i = V()), this.h();
    },
    l(b) {
      e = m(b, 'DIV', { class: !0 });
      var h = k(e);
      l = m(h, 'DIV', { class: !0 });
      var _ = k(l);
      t = m(_, 'DIV', { class: !0 });
      var v = k(t);
      (a = N(v, o)), v.forEach(d), (n = F(_)), (r = m(_, 'DIV', { class: !0 }));
      var S = k(r);
      for (let z = 0; z < c.length; z += 1) c[z].l(S);
      S.forEach(d), _.forEach(d), (i = F(h)), h.forEach(d), this.h();
    },
    h() {
      g(t, 'class', 'font-bold'),
        g(r, 'class', 'flex'),
        g(l, 'class', 'grid grid-rows-[auto_auto] gap-0'),
        g(
          e,
          'class',
          'card drop-shadow-md p-2 my-1 grid grid-cols-[1fr_auto] gap-1',
        );
    },
    m(b, h) {
      w(b, e, h), f(e, l), f(l, t), f(t, a), f(l, n), f(l, r);
      for (let _ = 0; _ < c.length; _ += 1) c[_] && c[_].m(r, null);
      f(e, i);
    },
    p(b, h) {
      if ((h[0] & 16 && o !== (o = b[62][0] + '') && re(a, o), h[0] & 16)) {
        u = b[62].slice(1);
        let _;
        for (_ = 0; _ < u.length; _ += 1) {
          const v = Il(b, u, _);
          c[_] ? c[_].p(v, h) : ((c[_] = Ml(v)), c[_].c(), c[_].m(r, null));
        }
        for (; _ < c.length; _ += 1) c[_].d(1);
        c.length = u.length;
      }
    },
    i: pe,
    o: pe,
    d(b) {
      b && d(e), ct(c, b);
    },
  };
}
function Ts(s) {
  let e, l, t, o, a, n, r, i;
  l = new vo({
    props: {
      queryKey: [s[62][1]],
      id: s[62][1],
      $$slots: {
        nodata: [
          Ps,
          ({ text: h }) => ({ 65: h }),
          ({ text: h }) => [0, 0, h ? 8 : 0],
        ],
        error: [
          Ss,
          ({ text: h }) => ({ 65: h }),
          ({ text: h }) => [0, 0, h ? 8 : 0],
        ],
        loading: [
          As,
          ({ text: h }) => ({ 65: h }),
          ({ text: h }) => [0, 0, h ? 8 : 0],
        ],
        default: [
          Os,
          ({ text: h }) => ({ 65: h }),
          ({ text: h }) => [0, 0, h ? 8 : 0],
        ],
      },
      $$scope: { ctx: s },
    },
  });
  function u(h, _) {
    return h[1] ? Fs : Vs;
  }
  let c = u(s),
    b = c(s);
  return {
    c() {
      (e = p('div')),
        me(l.$$.fragment),
        (t = V()),
        (o = p('div')),
        b.c(),
        (n = V()),
        this.h();
    },
    l(h) {
      e = m(h, 'DIV', { class: !0 });
      var _ = k(e);
      ve(l.$$.fragment, _), (t = F(_)), (o = m(_, 'DIV', { class: !0 }));
      var v = k(o);
      b.l(v), v.forEach(d), (n = F(_)), _.forEach(d), this.h();
    },
    h() {
      g(
        o,
        'class',
        (a = 'flex flex-col flex-wrap h-16 ' + (s[0] ? 'w-12' : '')),
      ),
        g(
          e,
          'class',
          (r =
            'card drop-shadow px-1 py-2 my-1 grid grid-cols-[1fr_auto] gap-1 ' +
            (s[6].includes(s[64]) ? 'delete-note' : '') +
            ' svelte-cq9msn'),
        );
    },
    m(h, _) {
      w(h, e, _),
        ke(l, e, null),
        f(e, t),
        f(e, o),
        b.m(o, null),
        f(e, n),
        (i = !0);
    },
    p(h, _) {
      const v = {};
      _[0] & 16 && (v.queryKey = [h[62][1]]),
        _[0] & 16 && (v.id = h[62][1]),
        (_[0] & 16) | (_[2] & 65544) && (v.$$scope = { dirty: _, ctx: h }),
        l.$set(v),
        c === (c = u(h)) && b
          ? b.p(h, _)
          : (b.d(1), (b = c(h)), b && (b.c(), b.m(o, null))),
        (!i ||
          (_[0] & 1 &&
            a !==
              (a = 'flex flex-col flex-wrap h-16 ' + (h[0] ? 'w-12' : '')))) &&
          g(o, 'class', a),
        (!i ||
          (_[0] & 64 &&
            r !==
              (r =
                'card drop-shadow px-1 py-2 my-1 grid grid-cols-[1fr_auto] gap-1 ' +
                (h[6].includes(h[64]) ? 'delete-note' : '') +
                ' svelte-cq9msn'))) &&
          g(e, 'class', r);
    },
    i(h) {
      i || (A(l.$$.fragment, h), (i = !0));
    },
    o(h) {
      j(l.$$.fragment, h), (i = !1);
    },
    d(h) {
      h && d(e), Ee(l), b.d();
    },
  };
}
function Ml(s) {
  let e,
    l = s[70] + '',
    t,
    o;
  return {
    c() {
      (e = p('div')), (t = T(l)), (o = V()), this.h();
    },
    l(a) {
      e = m(a, 'DIV', { class: !0 });
      var n = k(e);
      (t = N(n, l)), (o = F(n)), n.forEach(d), this.h();
    },
    h() {
      g(e, 'class', 'flex flex-wrap px-1 mx-1 break-all');
    },
    m(a, n) {
      w(a, e, n), f(e, t), f(e, o);
    },
    p(a, n) {
      n[0] & 16 && l !== (l = a[70] + '') && re(t, l);
    },
    d(a) {
      a && d(e);
    },
  };
}
function jl(s) {
  let e, l;
  return {
    c() {
      (e = p('img')), this.h();
    },
    l(t) {
      (e = m(t, 'IMG', { class: !0, src: !0, alt: !0 })), this.h();
    },
    h() {
      g(e, 'class', 'w-12 object-contain justify-center'),
        nl(e.src, (l = JSON.parse(s[66].content).picture)) || g(e, 'src', l),
        g(e, 'alt', 'avatar');
    },
    m(t, o) {
      w(t, e, o);
    },
    p(t, o) {
      o[2] & 16 &&
        !nl(e.src, (l = JSON.parse(t[66].content).picture)) &&
        g(e, 'src', l);
    },
    d(t) {
      t && d(e);
    },
  };
}
function Rl(s) {
  let e,
    l,
    t = s[65].tags,
    o = [];
  for (let n = 0; n < t.length; n += 1) o[n] = zl(Ol(s, t, n));
  const a = (n) =>
    j(o[n], 1, 1, () => {
      o[n] = null;
    });
  return {
    c() {
      for (let n = 0; n < o.length; n += 1) o[n].c();
      e = le();
    },
    l(n) {
      for (let r = 0; r < o.length; r += 1) o[r].l(n);
      e = le();
    },
    m(n, r) {
      for (let i = 0; i < o.length; i += 1) o[i] && o[i].m(n, r);
      w(n, e, r), (l = !0);
    },
    p(n, r) {
      if ((r[0] & 16384) | (r[2] & 24)) {
        t = n[65].tags;
        let i;
        for (i = 0; i < t.length; i += 1) {
          const u = Ol(n, t, i);
          o[i]
            ? (o[i].p(u, r), A(o[i], 1))
            : ((o[i] = zl(u)), o[i].c(), A(o[i], 1), o[i].m(e.parentNode, e));
        }
        for (we(), i = t.length; i < o.length; i += 1) a(i);
        ye();
      }
    },
    i(n) {
      if (!l) {
        for (let r = 0; r < t.length; r += 1) A(o[r]);
        l = !0;
      }
    },
    o(n) {
      o = o.filter(Boolean);
      for (let r = 0; r < o.length; r += 1) j(o[r]);
      l = !1;
    },
    d(n) {
      ct(o, n), n && d(e);
    },
  };
}
function ql(s) {
  let e, l;
  return (
    (e = new Xl({
      props: {
        queryKey: ['metadata', s[67][1]],
        pubkey: s[67][1],
        $$slots: {
          default: [
            Ns,
            ({ metadata: t }) => ({ 66: t }),
            ({ metadata: t }) => [0, 0, t ? 16 : 0],
          ],
        },
        $$scope: { ctx: s },
      },
    })),
    {
      c() {
        me(e.$$.fragment);
      },
      l(t) {
        ve(e.$$.fragment, t);
      },
      m(t, o) {
        ke(e, t, o), (l = !0);
      },
      p(t, o) {
        const a = {};
        o[2] & 8 && (a.queryKey = ['metadata', t[67][1]]),
          o[2] & 8 && (a.pubkey = t[67][1]),
          o[2] & 65560 && (a.$$scope = { dirty: o, ctx: t }),
          e.$set(a);
      },
      i(t) {
        l || (A(e.$$.fragment, t), (l = !0));
      },
      o(t) {
        j(e.$$.fragment, t), (l = !1);
      },
      d(t) {
        Ee(e, t);
      },
    }
  );
}
function Ns(s) {
  let e,
    l,
    t,
    o,
    a,
    n = JSON.parse(s[66].content).name + '',
    r,
    i,
    u,
    c;
  function b() {
    return s[39](s[66], s[67]);
  }
  return {
    c() {
      (e = p('div')),
        (l = T('to ')),
        (t = p('button')),
        (o = T('@')),
        (a = p('u')),
        (r = T(n)),
        (i = V()),
        this.h();
    },
    l(h) {
      e = m(h, 'DIV', { class: !0 });
      var _ = k(e);
      (l = N(_, 'to ')), (t = m(_, 'BUTTON', { class: !0 }));
      var v = k(t);
      (o = N(v, '@')), (a = m(v, 'U', {}));
      var S = k(a);
      (r = N(S, n)),
        S.forEach(d),
        v.forEach(d),
        _.forEach(d),
        (i = F(h)),
        this.h();
    },
    h() {
      g(
        t,
        'class',
        'text-emerald-800 whitespace-nowrap overflow-hidden text-ellipsis',
      ),
        g(
          e,
          'class',
          '-mt-1 px-2 opacity-50 text-sm whitespace-nowrap overflow-hidden',
        );
    },
    m(h, _) {
      w(h, e, _),
        f(e, l),
        f(e, t),
        f(t, o),
        f(t, a),
        f(a, r),
        w(h, i, _),
        u || ((c = G(t, 'click', b)), (u = !0));
    },
    p(h, _) {
      (s = h),
        _[2] & 16 &&
          n !== (n = JSON.parse(s[66].content).name + '') &&
          re(r, n);
    },
    d(h) {
      h && d(e), h && d(i), (u = !1), c();
    },
  };
}
function zl(s) {
  let e,
    l,
    t = s[67][0] === 'p' && ql(s);
  return {
    c() {
      t && t.c(), (e = le());
    },
    l(o) {
      t && t.l(o), (e = le());
    },
    m(o, a) {
      t && t.m(o, a), w(o, e, a), (l = !0);
    },
    p(o, a) {
      o[67][0] === 'p'
        ? t
          ? (t.p(o, a), a[2] & 8 && A(t, 1))
          : ((t = ql(o)), t.c(), A(t, 1), t.m(e.parentNode, e))
        : t &&
          (we(),
          j(t, 1, 1, () => {
            t = null;
          }),
          ye());
    },
    i(o) {
      l || (A(t), (l = !0));
    },
    o(o) {
      j(t), (l = !1);
    },
    d(o) {
      t && t.d(o), o && d(e);
    },
  };
}
function Ds(s) {
  let e,
    l,
    t = JSON.parse(s[66].content).picture,
    o,
    a,
    n,
    r,
    i = JSON.parse(s[66].content).display_name + '',
    u,
    c,
    b,
    h,
    _,
    v,
    S = JSON.parse(s[66].content).name + '',
    z,
    R,
    B,
    y,
    C = new Date(s[65].created_at * 1e3).toLocaleString() + '',
    I,
    O,
    q,
    Q,
    J,
    K,
    Z,
    $,
    H = t && jl(s);
  function he() {
    return s[37](s[66], s[65]);
  }
  function ie() {
    return s[38](s[65]);
  }
  let W = s[65].tags.length > 0 && Rl(s);
  return (
    (J = new ko({ props: { text: s[65].content, tag: s[65].tags } })),
    {
      c() {
        (e = p('div')),
          (l = p('div')),
          H && H.c(),
          (o = V()),
          (a = p('div')),
          (n = p('div')),
          (r = p('div')),
          (u = T(i)),
          (c = V()),
          (b = p('div')),
          (h = p('button')),
          (_ = T('@')),
          (v = p('u')),
          (z = T(S)),
          (R = V()),
          (B = p('div')),
          (y = p('button')),
          (I = T(C)),
          (O = V()),
          W && W.c(),
          (q = V()),
          (Q = p('div')),
          me(J.$$.fragment),
          this.h();
      },
      l(oe) {
        e = m(oe, 'DIV', { class: !0 });
        var x = k(e);
        l = m(x, 'DIV', { class: !0 });
        var P = k(l);
        H && H.l(P), P.forEach(d), (o = F(x)), (a = m(x, 'DIV', { class: !0 }));
        var te = k(a);
        n = m(te, 'DIV', { class: !0 });
        var M = k(n);
        r = m(M, 'DIV', { class: !0 });
        var De = k(r);
        (u = N(De, i)),
          De.forEach(d),
          (c = F(M)),
          (b = m(M, 'DIV', { class: !0 }));
        var Be = k(b);
        h = m(Be, 'BUTTON', { class: !0 });
        var Ce = k(h);
        (_ = N(Ce, '@')), (v = m(Ce, 'U', {}));
        var Fe = k(v);
        (z = N(Fe, S)),
          Fe.forEach(d),
          Ce.forEach(d),
          Be.forEach(d),
          (R = F(M)),
          (B = m(M, 'DIV', { class: !0 }));
        var Ie = k(B);
        y = m(Ie, 'BUTTON', { class: !0 });
        var ae = k(y);
        (I = N(ae, C)),
          ae.forEach(d),
          Ie.forEach(d),
          M.forEach(d),
          (O = F(te)),
          W && W.l(te),
          (q = F(te)),
          (Q = m(te, 'DIV', { class: !0 }));
        var ue = k(Q);
        ve(J.$$.fragment, ue),
          ue.forEach(d),
          te.forEach(d),
          x.forEach(d),
          this.h();
      },
      h() {
        g(
          l,
          'class',
          'w-12 h-12 rounded-full flex justify-center overflow-hidden bg-surface-500/25 mt-1',
        ),
          g(r, 'class', 'font-bold wi truncate justify-items-end'),
          g(h, 'class', 'text-emerald-800 text-sm'),
          g(b, 'class', 'truncate wid min-w-[2em] justify-items-end'),
          g(y, 'class', 'text-sm underline decoration-emerald-500'),
          g(B, 'class', 'min-w-max'),
          g(n, 'class', 'w-full grid grid-cols-[auto_1fr_auto] gap-1 h-fix'),
          g(Q, 'class', 'parent-container break-all whitespace-pre-wrap'),
          g(
            a,
            'class',
            'grid grid-rows-[auto_auto_auto] gap-0 break-all w-full',
          ),
          g(e, 'class', 'grid grid-cols-[auto_1fr] gap-1');
      },
      m(oe, x) {
        w(oe, e, x),
          f(e, l),
          H && H.m(l, null),
          f(e, o),
          f(e, a),
          f(a, n),
          f(n, r),
          f(r, u),
          f(n, c),
          f(n, b),
          f(b, h),
          f(h, _),
          f(h, v),
          f(v, z),
          f(n, R),
          f(n, B),
          f(B, y),
          f(y, I),
          f(a, O),
          W && W.m(a, null),
          f(a, q),
          f(a, Q),
          ke(J, Q, null),
          (K = !0),
          Z || (($ = [G(h, 'click', he), G(y, 'click', ie)]), (Z = !0));
      },
      p(oe, x) {
        (s = oe),
          x[2] & 16 && (t = JSON.parse(s[66].content).picture),
          t
            ? H
              ? H.p(s, x)
              : ((H = jl(s)), H.c(), H.m(l, null))
            : H && (H.d(1), (H = null)),
          (!K || x[2] & 16) &&
            i !== (i = JSON.parse(s[66].content).display_name + '') &&
            re(u, i),
          (!K || x[2] & 16) &&
            S !== (S = JSON.parse(s[66].content).name + '') &&
            re(z, S),
          (!K || x[2] & 8) &&
            C !==
              (C = new Date(s[65].created_at * 1e3).toLocaleString() + '') &&
            re(I, C),
          s[65].tags.length > 0
            ? W
              ? (W.p(s, x), x[2] & 8 && A(W, 1))
              : ((W = Rl(s)), W.c(), A(W, 1), W.m(a, q))
            : W &&
              (we(),
              j(W, 1, 1, () => {
                W = null;
              }),
              ye());
        const P = {};
        x[2] & 8 && (P.text = s[65].content),
          x[2] & 8 && (P.tag = s[65].tags),
          J.$set(P);
      },
      i(oe) {
        K || (A(W), A(J.$$.fragment, oe), (K = !0));
      },
      o(oe) {
        j(W), j(J.$$.fragment, oe), (K = !1);
      },
      d(oe) {
        oe && d(e), H && H.d(), W && W.d(), Ee(J), (Z = !1), je($);
      },
    }
  );
}
function Bs(s) {
  let e,
    l,
    t,
    o = s[62][1] + '',
    a,
    n;
  return {
    c() {
      (e = p('div')),
        (l = p('p')),
        (t = T('Loading note... (')),
        (a = T(o)),
        (n = T(')')),
        this.h();
    },
    l(r) {
      e = m(r, 'DIV', { slot: !0 });
      var i = k(e);
      l = m(i, 'P', { class: !0 });
      var u = k(l);
      (t = N(u, 'Loading note... (')),
        (a = N(u, o)),
        (n = N(u, ')')),
        u.forEach(d),
        i.forEach(d),
        this.h();
    },
    h() {
      g(l, 'class', 'break-all'), g(e, 'slot', 'loading');
    },
    m(r, i) {
      w(r, e, i), f(e, l), f(l, t), f(l, a), f(l, n);
    },
    p(r, i) {
      i[0] & 16 && o !== (o = r[62][1] + '') && re(a, o);
    },
    d(r) {
      r && d(e);
    },
  };
}
function Cs(s) {
  let e,
    l,
    t,
    o = s[62][1] + '',
    a,
    n;
  return {
    c() {
      (e = p('div')),
        (l = p('p')),
        (t = T('Failed to get note (')),
        (a = T(o)),
        (n = T(')')),
        this.h();
    },
    l(r) {
      e = m(r, 'DIV', { slot: !0 });
      var i = k(e);
      l = m(i, 'P', { class: !0 });
      var u = k(l);
      (t = N(u, 'Failed to get note (')),
        (a = N(u, o)),
        (n = N(u, ')')),
        u.forEach(d),
        i.forEach(d),
        this.h();
    },
    h() {
      g(l, 'class', 'break-all'), g(e, 'slot', 'error');
    },
    m(r, i) {
      w(r, e, i), f(e, l), f(l, t), f(l, a), f(l, n);
    },
    p(r, i) {
      i[0] & 16 && o !== (o = r[62][1] + '') && re(a, o);
    },
    d(r) {
      r && d(e);
    },
  };
}
function Is(s) {
  let e,
    l,
    t,
    o = s[62][1] + '',
    a,
    n;
  return {
    c() {
      (e = p('div')),
        (l = p('p')),
        (t = T('Note not found (')),
        (a = T(o)),
        (n = T(')')),
        this.h();
    },
    l(r) {
      e = m(r, 'DIV', { slot: !0 });
      var i = k(e);
      l = m(i, 'P', { class: !0 });
      var u = k(l);
      (t = N(u, 'Note not found (')),
        (a = N(u, o)),
        (n = N(u, ')')),
        u.forEach(d),
        i.forEach(d),
        this.h();
    },
    h() {
      g(l, 'class', 'break-all'), g(e, 'slot', 'nodata');
    },
    m(r, i) {
      w(r, e, i), f(e, l), f(l, t), f(l, a), f(l, n);
    },
    p(r, i) {
      i[0] & 16 && o !== (o = r[62][1] + '') && re(a, o);
    },
    d(r) {
      r && d(e);
    },
  };
}
function Os(s) {
  let e, l;
  return (
    (e = new Xl({
      props: {
        queryKey: ['metadata', s[65].pubkey],
        pubkey: s[65].pubkey,
        $$slots: {
          nodata: [
            Is,
            ({ metadata: t }) => ({ 66: t }),
            ({ metadata: t }) => [0, 0, t ? 16 : 0],
          ],
          error: [
            Cs,
            ({ metadata: t }) => ({ 66: t }),
            ({ metadata: t }) => [0, 0, t ? 16 : 0],
          ],
          loading: [
            Bs,
            ({ metadata: t }) => ({ 66: t }),
            ({ metadata: t }) => [0, 0, t ? 16 : 0],
          ],
          default: [
            Ds,
            ({ metadata: t }) => ({ 66: t }),
            ({ metadata: t }) => [0, 0, t ? 16 : 0],
          ],
        },
        $$scope: { ctx: s },
      },
    })),
    {
      c() {
        me(e.$$.fragment);
      },
      l(t) {
        ve(e.$$.fragment, t);
      },
      m(t, o) {
        ke(e, t, o), (l = !0);
      },
      p(t, o) {
        const a = {};
        o[2] & 8 && (a.queryKey = ['metadata', t[65].pubkey]),
          o[2] & 8 && (a.pubkey = t[65].pubkey),
          (o[0] & 16) | (o[2] & 65560) && (a.$$scope = { dirty: o, ctx: t }),
          e.$set(a);
      },
      i(t) {
        l || (A(e.$$.fragment, t), (l = !0));
      },
      o(t) {
        j(e.$$.fragment, t), (l = !1);
      },
      d(t) {
        Ee(e, t);
      },
    }
  );
}
function As(s) {
  let e,
    l,
    t,
    o = s[62][1] + '',
    a,
    n;
  return {
    c() {
      (e = p('div')),
        (l = p('p')),
        (t = T('Loading note... (')),
        (a = T(o)),
        (n = T(')')),
        this.h();
    },
    l(r) {
      e = m(r, 'DIV', { slot: !0 });
      var i = k(e);
      l = m(i, 'P', { class: !0 });
      var u = k(l);
      (t = N(u, 'Loading note... (')),
        (a = N(u, o)),
        (n = N(u, ')')),
        u.forEach(d),
        i.forEach(d),
        this.h();
    },
    h() {
      g(l, 'class', 'break-all'), g(e, 'slot', 'loading');
    },
    m(r, i) {
      w(r, e, i), f(e, l), f(l, t), f(l, a), f(l, n);
    },
    p(r, i) {
      i[0] & 16 && o !== (o = r[62][1] + '') && re(a, o);
    },
    d(r) {
      r && d(e);
    },
  };
}
function Ss(s) {
  let e,
    l,
    t,
    o = s[62][1] + '',
    a,
    n;
  return {
    c() {
      (e = p('div')),
        (l = p('p')),
        (t = T('Failed to get note (')),
        (a = T(o)),
        (n = T(')')),
        this.h();
    },
    l(r) {
      e = m(r, 'DIV', { slot: !0 });
      var i = k(e);
      l = m(i, 'P', { class: !0 });
      var u = k(l);
      (t = N(u, 'Failed to get note (')),
        (a = N(u, o)),
        (n = N(u, ')')),
        u.forEach(d),
        i.forEach(d),
        this.h();
    },
    h() {
      g(l, 'class', 'break-all'), g(e, 'slot', 'error');
    },
    m(r, i) {
      w(r, e, i), f(e, l), f(l, t), f(l, a), f(l, n);
    },
    p(r, i) {
      i[0] & 16 && o !== (o = r[62][1] + '') && re(a, o);
    },
    d(r) {
      r && d(e);
    },
  };
}
function Ps(s) {
  let e,
    l,
    t,
    o = s[62][1] + '',
    a,
    n;
  return {
    c() {
      (e = p('div')),
        (l = p('p')),
        (t = T('Note not found (')),
        (a = T(o)),
        (n = T(')')),
        this.h();
    },
    l(r) {
      e = m(r, 'DIV', { slot: !0 });
      var i = k(e);
      l = m(i, 'P', { class: !0 });
      var u = k(l);
      (t = N(u, 'Note not found (')),
        (a = N(u, o)),
        (n = N(u, ')')),
        u.forEach(d),
        i.forEach(d),
        this.h();
    },
    h() {
      g(l, 'class', 'break-all'), g(e, 'slot', 'nodata');
    },
    m(r, i) {
      w(r, e, i), f(e, l), f(l, t), f(l, a), f(l, n);
    },
    p(r, i) {
      i[0] & 16 && o !== (o = r[62][1] + '') && re(a, o);
    },
    d(r) {
      r && d(e);
    },
  };
}
function Vs(s) {
  let e, l, t, o, a, n, r, i, u;
  function c() {
    return s[41](s[62]);
  }
  function b() {
    return s[42](s[62]);
  }
  let h = s[0] && Jl(s);
  return {
    c() {
      (e = p('button')),
        (l = T('🐥')),
        (t = V()),
        (o = p('button')),
        (a = T('🔗')),
        (n = V()),
        h && h.c(),
        (r = le()),
        this.h();
    },
    l(_) {
      e = m(_, 'BUTTON', { class: !0 });
      var v = k(e);
      (l = N(v, '🐥')),
        v.forEach(d),
        (t = F(_)),
        (o = m(_, 'BUTTON', { class: !0 }));
      var S = k(o);
      (a = N(S, '🔗')),
        S.forEach(d),
        (n = F(_)),
        h && h.l(_),
        (r = le()),
        this.h();
    },
    h() {
      g(e, 'class', 'btn p-0 mt-1 variant-filled justify-self-end w-5'),
        g(o, 'class', 'btn p-0 mt-1 variant-filled justify-self-end w-5');
    },
    m(_, v) {
      w(_, e, v),
        f(e, l),
        w(_, t, v),
        w(_, o, v),
        f(o, a),
        w(_, n, v),
        h && h.m(_, v),
        w(_, r, v),
        i || ((u = [G(e, 'click', c), G(o, 'click', b)]), (i = !0));
    },
    p(_, v) {
      (s = _),
        s[0]
          ? h
            ? h.p(s, v)
            : ((h = Jl(s)), h.c(), h.m(r.parentNode, r))
          : h && (h.d(1), (h = null));
    },
    d(_) {
      _ && d(e),
        _ && d(t),
        _ && d(o),
        _ && d(n),
        h && h.d(_),
        _ && d(r),
        (i = !1),
        je(u);
    },
  };
}
function Fs(s) {
  let e, l, t, o;
  function a() {
    return s[40](s[64]);
  }
  return {
    c() {
      (e = p('input')), this.h();
    },
    l(n) {
      (e = m(n, 'INPUT', { class: !0, type: !0 })), this.h();
    },
    h() {
      g(e, 'class', 'm-2 checkbox scale-125'),
        g(e, 'type', 'checkbox'),
        (e.checked = l = s[7].includes(s[64]));
    },
    m(n, r) {
      w(n, e, r), t || ((o = G(e, 'change', a)), (t = !0));
    },
    p(n, r) {
      (s = n),
        r[0] & 128 && l !== (l = s[7].includes(s[64])) && (e.checked = l);
    },
    d(n) {
      n && d(e), (t = !1), o();
    },
  };
}
function Jl(s) {
  let e, l, t, o, a, n, r, i, u;
  function c() {
    return s[43](s[64]);
  }
  function b() {
    return s[44](s[64]);
  }
  return {
    c() {
      (e = p('button')),
        (l = T('→')),
        (o = V()),
        (a = p('button')),
        (n = T('🗑')),
        this.h();
    },
    l(h) {
      e = m(h, 'BUTTON', { class: !0 });
      var _ = k(e);
      (l = N(_, '→')),
        _.forEach(d),
        (o = F(h)),
        (a = m(h, 'BUTTON', { class: !0 }));
      var v = k(a);
      (n = N(v, '🗑')), v.forEach(d), this.h();
    },
    h() {
      g(
        e,
        'class',
        (t =
          'btn p-0 mt-1 variant-filled justify-self-end w-5 ' +
          (s[0] ? 'ml-1 ' : '')),
      ),
        g(
          a,
          'class',
          (r =
            'btn p-0 mt-1 variant-filled justify-self-end w-5 ' +
            (s[0] ? 'ml-1 ' : '')),
        );
    },
    m(h, _) {
      w(h, e, _),
        f(e, l),
        w(h, o, _),
        w(h, a, _),
        f(a, n),
        i || ((u = [G(e, 'click', c), G(a, 'click', b)]), (i = !0));
    },
    p(h, _) {
      (s = h),
        _[0] & 1 &&
          t !==
            (t =
              'btn p-0 mt-1 variant-filled justify-self-end w-5 ' +
              (s[0] ? 'ml-1 ' : '')) &&
          g(e, 'class', t),
        _[0] & 1 &&
          r !==
            (r =
              'btn p-0 mt-1 variant-filled justify-self-end w-5 ' +
              (s[0] ? 'ml-1 ' : '')) &&
          g(a, 'class', r);
    },
    d(h) {
      h && d(e), h && d(o), h && d(a), (i = !1), je(u);
    },
  };
}
function Kl(s) {
  let e, l, t, o;
  const a = [Ts, ys],
    n = [];
  function r(i, u) {
    return i[62][0] === 'e' ? 0 : i[62][0] !== 'd' ? 1 : -1;
  }
  return (
    ~(e = r(s)) && (l = n[e] = a[e](s)),
    {
      c() {
        l && l.c(), (t = le());
      },
      l(i) {
        l && l.l(i), (t = le());
      },
      m(i, u) {
        ~e && n[e].m(i, u), w(i, t, u), (o = !0);
      },
      p(i, u) {
        let c = e;
        (e = r(i)),
          e === c
            ? ~e && n[e].p(i, u)
            : (l &&
                (we(),
                j(n[c], 1, 1, () => {
                  n[c] = null;
                }),
                ye()),
              ~e
                ? ((l = n[e]),
                  l ? l.p(i, u) : ((l = n[e] = a[e](i)), l.c()),
                  A(l, 1),
                  l.m(t.parentNode, t))
                : (l = null));
      },
      i(i) {
        o || (A(l), (o = !0));
      },
      o(i) {
        j(l), (o = !1);
      },
      d(i) {
        ~e && n[e].d(i), i && d(t);
      },
    }
  );
}
function Ls(s) {
  let e,
    l,
    t = s[4] && Ul(s);
  return {
    c() {
      t && t.c(), (e = le());
    },
    l(o) {
      t && t.l(o), (e = le());
    },
    m(o, a) {
      t && t.m(o, a), w(o, e, a), (l = !0);
    },
    p(o, a) {
      o[4]
        ? t
          ? (t.p(o, a), a[0] & 16 && A(t, 1))
          : ((t = Ul(o)), t.c(), A(t, 1), t.m(e.parentNode, e))
        : t &&
          (we(),
          j(t, 1, 1, () => {
            t = null;
          }),
          ye());
    },
    i(o) {
      l || (A(t), (l = !0));
    },
    o(o) {
      j(t), (l = !1);
    },
    d(o) {
      t && t.d(o), o && d(e);
    },
  };
}
function Us(s) {
  let e, l, t;
  return (
    (l = new co({
      props: {
        '...': !0,
        stroke: 100,
        meter: 'stroke-primary-500',
        track: 'stroke-primary-500/30',
        width: 'w-24',
      },
    })),
    {
      c() {
        (e = p('div')), me(l.$$.fragment), this.h();
      },
      l(o) {
        e = m(o, 'DIV', { class: !0 });
        var a = k(e);
        ve(l.$$.fragment, a), a.forEach(d), this.h();
      },
      h() {
        g(e, 'class', 'fixed bottom-2 right-2');
      },
      m(o, a) {
        w(o, e, a), ke(l, e, null), (t = !0);
      },
      p: pe,
      i(o) {
        t || (A(l.$$.fragment, o), (t = !0));
      },
      o(o) {
        j(l.$$.fragment, o), (t = !1);
      },
      d(o) {
        o && d(e), Ee(l);
      },
    }
  );
}
function Ms(s) {
  let e,
    l,
    t,
    o,
    a,
    n,
    r,
    i,
    u,
    c = s[0] && Hl(s);
  return {
    c() {
      (e = p('div')),
        c && c.c(),
        (l = V()),
        (t = p('button')),
        (o = T('共有')),
        (a = V()),
        (n = p('button')),
        (r = T('↻')),
        this.h();
    },
    l(b) {
      e = m(b, 'DIV', { class: !0 });
      var h = k(e);
      c && c.l(h), (l = F(h)), (t = m(h, 'BUTTON', { type: !0, class: !0 }));
      var _ = k(t);
      (o = N(_, '共有')),
        _.forEach(d),
        (a = F(h)),
        (n = m(h, 'BUTTON', { type: !0, class: !0 }));
      var v = k(n);
      (r = N(v, '↻')), v.forEach(d), h.forEach(d), this.h();
    },
    h() {
      g(t, 'type', 'button'),
        g(t, 'class', 'btn-icon variant-filled-surface mx-1'),
        g(n, 'type', 'button'),
        g(n, 'class', 'btn-icon variant-filled-surface mx-1'),
        g(e, 'class', 'fixed bottom-2');
    },
    m(b, h) {
      w(b, e, h),
        c && c.m(e, null),
        f(e, l),
        f(e, t),
        f(t, o),
        f(e, a),
        f(e, n),
        f(n, r),
        i || ((u = [G(t, 'click', s[22]), G(n, 'click', s[25])]), (i = !0));
    },
    p(b, h) {
      b[0]
        ? c
          ? c.p(b, h)
          : ((c = Hl(b)), c.c(), c.m(e, l))
        : c && (c.d(1), (c = null));
    },
    i: pe,
    o: pe,
    d(b) {
      b && d(e), c && c.d(), (i = !1), je(u);
    },
  };
}
function Hl(s) {
  let e, l, t, o, a, n;
  function r(c, b) {
    return c[1] ? js : Rs;
  }
  let i = r(s),
    u = i(s);
  return {
    c() {
      (e = p('button')), (l = T('🍔')), (t = V()), u.c(), (o = le()), this.h();
    },
    l(c) {
      e = m(c, 'BUTTON', { type: !0, class: !0 });
      var b = k(e);
      (l = N(b, '🍔')), b.forEach(d), (t = F(c)), u.l(c), (o = le()), this.h();
    },
    h() {
      g(e, 'type', 'button'),
        g(e, 'class', 'btn-icon variant-filled-surface font-bold mx-1');
    },
    m(c, b) {
      w(c, e, b),
        f(e, l),
        w(c, t, b),
        u.m(c, b),
        w(c, o, b),
        a || ((n = G(e, 'click', s[26])), (a = !0));
    },
    p(c, b) {
      i === (i = r(c)) && u
        ? u.p(c, b)
        : (u.d(1), (u = i(c)), u && (u.c(), u.m(o.parentNode, o)));
    },
    d(c) {
      c && d(e), c && d(t), u.d(c), c && d(o), (a = !1), n();
    },
  };
}
function js(s) {
  let e, l, t, o, a, n, r;
  return {
    c() {
      (e = p('button')),
        (l = T('move notes')),
        (t = V()),
        (o = p('button')),
        (a = T('delete notes')),
        this.h();
    },
    l(i) {
      e = m(i, 'BUTTON', { type: !0, class: !0 });
      var u = k(e);
      (l = N(u, 'move notes')),
        u.forEach(d),
        (t = F(i)),
        (o = m(i, 'BUTTON', { type: !0, class: !0 }));
      var c = k(o);
      (a = N(c, 'delete notes')), c.forEach(d), this.h();
    },
    h() {
      g(e, 'type', 'button'),
        g(e, 'class', 'btn variant-filled-surface font-bold mx-1'),
        g(o, 'type', 'button'),
        g(
          o,
          'class',
          'btn variant-filled-surface font-bold mx-1 text-amber-200',
        );
    },
    m(i, u) {
      w(i, e, u),
        f(e, l),
        w(i, t, u),
        w(i, o, u),
        f(o, a),
        n || ((r = [G(e, 'click', s[20]), G(o, 'click', s[21])]), (n = !0));
    },
    p: pe,
    d(i) {
      i && d(e), i && d(t), i && d(o), (n = !1), je(r);
    },
  };
}
function Rs(s) {
  let e, l, t, o, a, n, r;
  return {
    c() {
      (e = p('button')),
        (l = T('add note')),
        (t = V()),
        (o = p('button')),
        (a = T('edit tag')),
        this.h();
    },
    l(i) {
      e = m(i, 'BUTTON', { type: !0, class: !0 });
      var u = k(e);
      (l = N(u, 'add note')),
        u.forEach(d),
        (t = F(i)),
        (o = m(i, 'BUTTON', { type: !0, class: !0 }));
      var c = k(o);
      (a = N(c, 'edit tag')), c.forEach(d), this.h();
    },
    h() {
      g(e, 'type', 'button'),
        g(e, 'class', 'btn variant-filled-surface font-bold mx-1'),
        g(o, 'type', 'button'),
        g(o, 'class', 'btn variant-filled-surface font-bold mx-1');
    },
    m(i, u) {
      w(i, e, u),
        f(e, l),
        w(i, t, u),
        w(i, o, u),
        f(o, a),
        n || ((r = [G(e, 'click', s[45]), G(o, 'click', s[17])]), (n = !0));
    },
    p: pe,
    d(i) {
      i && d(e), i && d(t), i && d(o), (n = !1), je(r);
    },
  };
}
function qs(s) {
  let e,
    l,
    t,
    o,
    a,
    n,
    r,
    i,
    u,
    c,
    b,
    h,
    _,
    v,
    S,
    z = pt.npubEncode(s[10]) + '',
    R,
    B,
    y,
    C,
    I,
    O,
    q,
    Q,
    J,
    K,
    Z,
    $,
    H,
    he,
    ie,
    W,
    oe,
    x,
    P,
    te,
    M,
    De,
    Be,
    Ce,
    Fe,
    Ie,
    ae,
    ue,
    ee,
    ce,
    Re,
    Se,
    qe,
    Qe,
    Ke,
    We,
    Le,
    Ve,
    lt,
    ot,
    Ye,
    ft,
    yt,
    He,
    Tt,
    Nt,
    nt,
    dt,
    E,
    D,
    L,
    X,
    Y,
    se,
    be,
    Pe,
    ze,
    Dt;
  (n = new fo({})), (i = new wo({ props: { zIndex: 'z-[999999]' } }));
  let at = s[11],
    Te = [];
  for (let U = 0; U < at.length; U += 1) Te[U] = Pl(Sl(s, at, U));
  const Rt = [ds, fs],
    Xe = [];
  function qt(U, de) {
    return !U[9] || U[9].length === 0 ? 0 : 1;
  }
  (D = qt(s)), (L = Xe[D] = Rt[D](s));
  const zt = [Ms, Us],
    Ze = [];
  function Jt(U, de) {
    return U[8] ? 1 : 0;
  }
  return (
    (se = Jt(s)),
    (be = Ze[se] = zt[se](s)),
    {
      c() {
        (e = p('meta')),
          (l = p('meta')),
          (t = p('meta')),
          (o = p('meta')),
          (a = V()),
          me(n.$$.fragment),
          (r = V()),
          me(i.$$.fragment),
          (u = V()),
          (c = p('div')),
          (b = p('div')),
          (h = p('p')),
          (_ = T('【pubkey】')),
          (v = V()),
          (S = p('p')),
          (R = T(z)),
          (B = V()),
          (y = p('p')),
          (C = T('【relays】')),
          (I = V()),
          (O = p('ul'));
        for (let U = 0; U < Te.length; U += 1) Te[U].c();
        (q = V()),
          (Q = p('hr')),
          (J = V()),
          (K = p('div')),
          (Z = p('ul')),
          ($ = p('li')),
          (H = p('span')),
          (he = T('🐥')),
          (ie = T(' Nostrで共有する')),
          (W = V()),
          (oe = p('li')),
          (x = p('span')),
          (P = T('🔗')),
          (te = T(' 外部アプリで開く')),
          (M = V()),
          (De = p('li')),
          (Be = p('span')),
          (Ce = T('→')),
          (Fe = T(' 他のリストに移動')),
          (Ie = V()),
          (ae = p('li')),
          (ue = p('span')),
          (ee = T('🗑')),
          (ce = T(' リストから削除')),
          (Re = V()),
          (Se = p('li')),
          (qe = p('span')),
          (Qe = T('↻')),
          (Ke = T(' リストの更新）')),
          (We = V()),
          (Le = p('li')),
          (Ve = p('span')),
          (lt = T('mode')),
          (ot = T(' 複数選択との切り替え）')),
          (Ye = V()),
          (ft = p('hr')),
          (yt = V()),
          (He = p('button')),
          (Tt = T('Go back to Setup')),
          (Nt = V()),
          (nt = p('div')),
          (dt = V()),
          (E = p('main')),
          L.c(),
          (X = V()),
          (Y = p('div')),
          be.c(),
          this.h();
      },
      l(U) {
        const de = so('svelte-wjxbk9', bt.head);
        (e = m(de, 'META', { prefix: !0 })),
          (l = m(de, 'META', { property: !0, content: !0 })),
          (t = m(de, 'META', { property: !0, content: !0 })),
          (o = m(de, 'META', { property: !0, content: !0 })),
          de.forEach(d),
          (a = F(U)),
          ve(n.$$.fragment, U),
          (r = F(U)),
          ve(i.$$.fragment, U),
          (u = F(U)),
          (c = m(U, 'DIV', { class: !0, 'data-popup': !0 }));
        var ge = k(c);
        b = m(ge, 'DIV', {});
        var Ue = k(b);
        h = m(Ue, 'P', {});
        var Oe = k(h);
        (_ = N(Oe, '【pubkey】')),
          Oe.forEach(d),
          (v = F(Ue)),
          (S = m(Ue, 'P', {}));
        var _t = k(S);
        (R = N(_t, z)),
          _t.forEach(d),
          (B = F(Ue)),
          (y = m(Ue, 'P', { class: !0 }));
        var Kt = k(y);
        (C = N(Kt, '【relays】')),
          Kt.forEach(d),
          (I = F(Ue)),
          (O = m(Ue, 'UL', { class: !0 }));
        var Ht = k(O);
        for (let Lt = 0; Lt < Te.length; Lt += 1) Te[Lt].l(Ht);
        Ht.forEach(d),
          Ue.forEach(d),
          (q = F(ge)),
          (Q = m(ge, 'HR', { class: !0 })),
          (J = F(ge)),
          (K = m(ge, 'DIV', { class: !0 }));
        var Gt = k(K);
        Z = m(Gt, 'UL', { class: !0 });
        var Me = k(Z);
        $ = m(Me, 'LI', { class: !0 });
        var Ot = k($);
        H = m(Ot, 'SPAN', { class: !0 });
        var Qt = k(H);
        (he = N(Qt, '🐥')),
          Qt.forEach(d),
          (ie = N(Ot, ' Nostrで共有する')),
          Ot.forEach(d),
          (W = F(Me)),
          (oe = m(Me, 'LI', { class: !0 }));
        var At = k(oe);
        x = m(At, 'SPAN', { class: !0 });
        var Wt = k(x);
        (P = N(Wt, '🔗')),
          Wt.forEach(d),
          (te = N(At, ' 外部アプリで開く')),
          At.forEach(d),
          (M = F(Me)),
          (De = m(Me, 'LI', { class: !0 }));
        var St = k(De);
        Be = m(St, 'SPAN', { class: !0 });
        var Yt = k(Be);
        (Ce = N(Yt, '→')),
          Yt.forEach(d),
          (Fe = N(St, ' 他のリストに移動')),
          St.forEach(d),
          (Ie = F(Me)),
          (ae = m(Me, 'LI', { class: !0 }));
        var Pt = k(ae);
        ue = m(Pt, 'SPAN', { class: !0 });
        var Xt = k(ue);
        (ee = N(Xt, '🗑')),
          Xt.forEach(d),
          (ce = N(Pt, ' リストから削除')),
          Pt.forEach(d),
          (Re = F(Me)),
          (Se = m(Me, 'LI', { class: !0 }));
        var Vt = k(Se);
        qe = m(Vt, 'SPAN', { class: !0 });
        var Zt = k(qe);
        (Qe = N(Zt, '↻')),
          Zt.forEach(d),
          (Ke = N(Vt, ' リストの更新）')),
          Vt.forEach(d),
          (We = F(Me)),
          (Le = m(Me, 'LI', { class: !0 }));
        var Ft = k(Le);
        Ve = m(Ft, 'SPAN', { class: !0 });
        var $t = k(Ve);
        (lt = N($t, 'mode')),
          $t.forEach(d),
          (ot = N(Ft, ' 複数選択との切り替え）')),
          Ft.forEach(d),
          Me.forEach(d),
          Gt.forEach(d),
          (Ye = F(ge)),
          (ft = m(ge, 'HR', { class: !0 })),
          (yt = F(ge)),
          (He = m(ge, 'BUTTON', { type: !0, class: !0 }));
        var xt = k(He);
        (Tt = N(xt, 'Go back to Setup')),
          xt.forEach(d),
          (Nt = F(ge)),
          (nt = m(ge, 'DIV', { class: !0 })),
          k(nt).forEach(d),
          ge.forEach(d),
          (dt = F(U)),
          (E = m(U, 'MAIN', { class: !0 }));
        var el = k(E);
        L.l(el), el.forEach(d), (X = F(U)), (Y = m(U, 'DIV', { class: !0 }));
        var tl = k(Y);
        be.l(tl), tl.forEach(d), this.h();
      },
      h() {
        g(e, 'prefix', 'og: https://ogp.me/ns#'),
          g(l, 'property', 'og:title'),
          g(l, 'content', 'nostr-bookmark-viewer3'),
          g(t, 'property', 'og:description'),
          g(t, 'content', 'nprofile:pubkey:' + s[10]),
          g(o, 'property', 'og:image'),
          g(o, 'content', 'https://nostr-bookmark-viewer3.vercel.app/img2.png'),
          g(y, 'class', 'mt-2'),
          g(O, 'class', 'list-disc'),
          g(Q, 'class', '!border-t-2 my-1'),
          g(H, 'class', 'btn variant-filled p-0 w-5'),
          g($, 'class', 'ml-4'),
          g(x, 'class', 'btn variant-filled p-0 w-5'),
          g(oe, 'class', 'ml-4'),
          g(Be, 'class', 'btn variant-filled p-0 w-5'),
          g(De, 'class', 'ml-4'),
          g(ue, 'class', 'btn variant-filled p-0 w-5'),
          g(ae, 'class', 'ml-4'),
          g(qe, 'class', 'btn variant-filled-primary p-0 w-5 rounded-full'),
          g(Se, 'class', 'ml-4'),
          g(Ve, 'class', 'btn variant-filled-primary p-0 rounded-full'),
          g(Le, 'class', 'ml-4'),
          g(Z, 'class', 'list-disc'),
          g(K, 'class', 'text-sm'),
          g(ft, 'class', '!border-t-2 my-1'),
          g(He, 'type', 'button'),
          g(He, 'class', 'btn variant-filled py-1'),
          g(nt, 'class', 'arrow bg-surface-100-800-token'),
          g(c, 'class', 'card p-4 w-72 shadow-xl z-20 break-all'),
          g(c, 'data-popup', 'popupFeatured'),
          g(E, 'class', 'container max-w-5xl px-1 mt-24 mb-12'),
          g(Y, 'class', 'container max-w-5xl mx-auto z-10');
      },
      m(U, de) {
        f(bt.head, e),
          f(bt.head, l),
          f(bt.head, t),
          f(bt.head, o),
          w(U, a, de),
          ke(n, U, de),
          w(U, r, de),
          ke(i, U, de),
          w(U, u, de),
          w(U, c, de),
          f(c, b),
          f(b, h),
          f(h, _),
          f(b, v),
          f(b, S),
          f(S, R),
          f(b, B),
          f(b, y),
          f(y, C),
          f(b, I),
          f(b, O);
        for (let ge = 0; ge < Te.length; ge += 1) Te[ge] && Te[ge].m(O, null);
        f(c, q),
          f(c, Q),
          f(c, J),
          f(c, K),
          f(K, Z),
          f(Z, $),
          f($, H),
          f(H, he),
          f($, ie),
          f(Z, W),
          f(Z, oe),
          f(oe, x),
          f(x, P),
          f(oe, te),
          f(Z, M),
          f(Z, De),
          f(De, Be),
          f(Be, Ce),
          f(De, Fe),
          f(Z, Ie),
          f(Z, ae),
          f(ae, ue),
          f(ue, ee),
          f(ae, ce),
          f(Z, Re),
          f(Z, Se),
          f(Se, qe),
          f(qe, Qe),
          f(Se, Ke),
          f(Z, We),
          f(Z, Le),
          f(Le, Ve),
          f(Ve, lt),
          f(Le, ot),
          f(c, Ye),
          f(c, ft),
          f(c, yt),
          f(c, He),
          f(He, Tt),
          f(c, Nt),
          f(c, nt),
          w(U, dt, de),
          w(U, E, de),
          Xe[D].m(E, null),
          w(U, X, de),
          w(U, Y, de),
          Ze[se].m(Y, null),
          (Pe = !0),
          ze || ((Dt = G(He, 'click', s[28])), (ze = !0));
      },
      p(U, de) {
        if (de[0] & 2048) {
          at = U[11];
          let Oe;
          for (Oe = 0; Oe < at.length; Oe += 1) {
            const _t = Sl(U, at, Oe);
            Te[Oe]
              ? Te[Oe].p(_t, de)
              : ((Te[Oe] = Pl(_t)), Te[Oe].c(), Te[Oe].m(O, null));
          }
          for (; Oe < Te.length; Oe += 1) Te[Oe].d(1);
          Te.length = at.length;
        }
        let ge = D;
        (D = qt(U)),
          D === ge
            ? Xe[D].p(U, de)
            : (we(),
              j(Xe[ge], 1, 1, () => {
                Xe[ge] = null;
              }),
              ye(),
              (L = Xe[D]),
              L ? L.p(U, de) : ((L = Xe[D] = Rt[D](U)), L.c()),
              A(L, 1),
              L.m(E, null));
        let Ue = se;
        (se = Jt(U)),
          se === Ue
            ? Ze[se].p(U, de)
            : (we(),
              j(Ze[Ue], 1, 1, () => {
                Ze[Ue] = null;
              }),
              ye(),
              (be = Ze[se]),
              be ? be.p(U, de) : ((be = Ze[se] = zt[se](U)), be.c()),
              A(be, 1),
              be.m(Y, null));
      },
      i(U) {
        Pe ||
          (A(n.$$.fragment, U), A(i.$$.fragment, U), A(L), A(be), (Pe = !0));
      },
      o(U) {
        j(n.$$.fragment, U), j(i.$$.fragment, U), j(L), j(be), (Pe = !1);
      },
      d(U) {
        d(e),
          d(l),
          d(t),
          d(o),
          U && d(a),
          Ee(n, U),
          U && d(r),
          Ee(i, U),
          U && d(u),
          U && d(c),
          ct(Te, U),
          U && d(dt),
          U && d(E),
          Xe[D].d(),
          U && d(X),
          U && d(Y),
          Ze[se].d(),
          (ze = !1),
          Dt();
      },
    }
  );
}
function zs(s) {
  const e = document.querySelector('.tab-list');
  s.preventDefault(),
    e && e.scrollBy({ top: 0, left: s.deltaY, behavior: 'smooth' });
}
function Js(s, e, l) {
  let t, o, a;
  Ge(s, _e, (E) => l(8, (t = E))),
    Ge(s, Je, (E) => l(9, (o = E))),
    Ge(s, io, (E) => l(46, (a = E)));
  const { type: n, data: r } = pt.decode(a.params.nprofile),
    { pubkey: i, relays: u } =
      n === 'nprofile' && r.relays
        ? { pubkey: r.pubkey, relays: r.relays }
        : { pubkey: '', relays: [] },
    c = [{ authors: [i], kinds: [30001] }];
  let b,
    h = !1,
    _ = 0,
    v = 'pub',
    S,
    z = 'now loading';
  no(async () => {
    ne(_e, (t = !0), t), l(5, (z = 'now loading'));
    try {
      l(0, (b = (await window.nostr.getPublicKey()) === i));
    } catch {
      console.log('ログインチェック失敗');
    }
    i !== '' || u.length > 0
      ? (ne(Je, (o = await Ut(u, c)), o),
        o.length > 0
          ? (o.sort((E, D) => {
              const L = E.tags[0][1],
                X = D.tags[0][1];
              return L.localeCompare(X);
            }),
            console.log(o),
            l(4, (S = o[_].tags)))
          : (console.log('ブクマ何もないかも'),
            l(5, (z = 'ブクマ何もないかも'))),
        ne(_e, (t = !1), t))
      : console.log('error');
  });
  const R = { event: 'click', target: 'popupFeatured', placement: 'bottom' };
  async function B() {
    let E;
    try {
      const D = await window.nostr.getPublicKey();
      l(0, (b = D === i)),
        b
          ? (E = { message: 'Login', timeout: 3e3 })
          : (E = {
              message: 'you are not the owner',
              timeout: 3e3,
              background: 'bg-orange-500 text-white width-filled ',
            });
    } catch {
      E = {
        message: 'failed to Login',
        timeout: 3e3,
        background: 'bg-orange-500 text-white width-filled ',
      };
    }
    fe.trigger(E);
  }
  const y = {
    ref: po,
    props: { background: 'bg-red-500' },
    slot: '<p>Skeleton</p>',
  };
  function C(E, D) {
    console.log(E);
    const L = {
      type: 'component',
      value: { metadata: E, pubkey: D },
      component: y,
    };
    Ne.trigger(L);
  }
  const I = {
    ref: mo,
    props: { background: 'bg-red-500' },
    slot: '<p>Skeleton</p>',
  };
  function O(E) {
    console.log('click');
    const D = {
      type: 'component',
      title: 'Event Json',
      value: { note: E },
      component: I,
    };
    Ne.trigger(D);
  }
  const q = {
    ref: Ho,
    props: { background: 'bg-red-500' },
    slot: '<p>Skeleton</p>',
  };
  async function Q(E) {
    const D = {
      type: 'component',
      backdropClasses:
        '!bg-surface-400 dark:!bg-surface-700  !bg-opacity-20 dark:!bg-opacity-20',
      component: q,
      title: `Add Note to ${o[_].tags[0][1]}`,
      body: 'Enter an ID starting with "note" , "nevent" or "nostr:".',
      response: async (L) => {
        let X;
        if (L)
          switch (L.btn) {
            case 'pub':
              if (((X = al(L.value)), X.error)) {
                const Y = {
                  message: X.value,
                  timeout: 3e3,
                  background: 'bg-orange-500 text-white width-filled ',
                };
                fe.trigger(Y);
              } else {
                ne(_e, (t = !0), t), await P(E);
                const Y = await il(u, o[E], [X.value]);
                if ((console.log(Y), Y.isSuccess)) {
                  ne(Je, (o[E] = Y.event), o), l(4, (S = o[E].tags));
                  const se = { message: Y.msg.join('<br>'), timeout: 3e3 };
                  fe.trigger(se);
                } else {
                  const se = {
                    message: 'failed to publish',
                    timeout: 3e3,
                    background: 'bg-orange-500 text-white width-filled ',
                  };
                  fe.trigger(se);
                }
                ne(_e, (t = !1), t);
              }
              break;
            case 'prv':
              if (((X = al(L.value)), X.error)) {
                const Y = {
                  message: X.value,
                  timeout: 3e3,
                  background: 'bg-orange-500 text-white width-filled ',
                };
                fe.trigger(Y);
              } else {
                ne(_e, (t = !0), t);
                const Y = await rl(u, o[E], [X.value]);
                if ((console.log(Y), Y.isSuccess)) {
                  ne(Je, (o[E] = Y.event), o), l(4, (S = o[E].tags));
                  const se = { message: Y.msg.join('<br>'), timeout: 3e3 };
                  fe.trigger(se);
                } else {
                  const se = {
                    message: 'failed to publish',
                    timeout: 3e3,
                    background: 'bg-orange-500 text-white width-filled ',
                  };
                  fe.trigger(se);
                }
                ne(_e, (t = !1), t);
              }
              break;
          }
      },
    };
    Ne.trigger(D);
  }
  const J = {
    ref: os,
    props: { background: 'bg-red-500' },
    slot: '<p>Skeleton</p>',
  };
  function K() {
    const E = {
      type: 'component',
      component: J,
      title: 'Edit tag',
      body: 'New Tag Name',
      value: { selectedValue: 0 },
      response: (D) => {
        if (D)
          switch (D.btn) {
            case 'add':
              Z(D.value);
              break;
            case 'delete':
              $(D.tagIndex);
              break;
          }
      },
    };
    Ne.trigger(E);
  }
  async function Z(E) {
    console.log(E);
    const D = {
      id: '',
      content: '',
      kind: 30001,
      pubkey: i,
      created_at: Math.floor(Date.now() / 1e3),
      tags: [['d', E]],
      sig: '',
    };
    try {
      ne(_e, (t = !0), t);
      const L = await Ct(D, u);
      if (!L.isSuccess) {
        const Y = {
          message: '失敗したかも',
          timeout: 5e3,
          background: 'variant-filled-error',
        };
        fe.trigger(Y), ne(_e, (t = !1), t);
        return;
      }
      o.push(L.event);
      const X = { message: L.msg.join('<br>'), timeout: 5e3 };
      fe.trigger(X);
    } catch (L) {
      console.log(L);
      const X = {
        message: '失敗したかも',
        timeout: 5e3,
        background: 'variant-filled-error',
      };
      fe.trigger(X);
    }
    ne(_e, (t = !1), t);
  }
  async function $(E) {
    console.log(E), await P(E), console.log(o[E].tags[0][1]);
    const D = {
      id: '',
      content: '',
      kind: 5,
      pubkey: i,
      created_at: Math.floor(Date.now() / 1e3),
      tags: [['e', o[E].id]],
      sig: '',
    };
    try {
      ne(_e, (t = !0), t);
      const L = await Ct(D, u);
      if (!L.isSuccess) {
        const Y = {
          message: '失敗したかも',
          timeout: 5e3,
          background: 'variant-filled-error',
        };
        fe.trigger(Y), ne(_e, (t = !1), t);
        return;
      }
      const X = { message: L.msg.join('<br>'), timeout: 5e3 };
      fe.trigger(X), o.splice(E, 1), l(2, (_ = 0)), l(4, (S = o[_].tags));
    } catch (L) {
      console.log(L);
      const X = {
        message: '失敗したかも',
        timeout: 5e3,
        background: 'variant-filled-error',
      };
      fe.trigger(X);
    }
    ne(_e, (t = !1), t);
  }
  const H = {
    ref: $o,
    props: { background: 'bg-red-500' },
    slot: '<p>Skeleton</p>',
  };
  function he(E, D, L) {
    l(6, (W = D)),
      console.log(L),
      console.log(E),
      console.log(S[D[0]]),
      console.log(o[_].tags[0][1]),
      console.log(D),
      console.log(o[_].tags[D[0]][1]);
    const X = {
      type: 'component',
      component: H,
      title: 'Move note',
      body: `Move from ${o[E].tags[0][1]} to`,
      value: { bkm: L, tag: E },
      response: (Y) => {
        console.log(Y),
          Y && ie(D, { tag: E, bkm: L }, { tag: Y.tag, bkm: Y.bkm });
      },
    };
    Ne.trigger(X), l(6, (W = []));
  }
  async function ie(E, D, L) {
    await P(D.tag), await P(L.tag), ne(_e, (t = !0), t);
    const X = E.map((se) => S[se][1]),
      Y = L.bkm === 'pub' ? await il(u, o[L.tag], X) : await rl(u, o[L.tag], X);
    if ((console.log(Y), Y.isSuccess)) {
      const se = { message: Y.msg.join('<br>'), timeout: 3e3 };
      fe.trigger(se), ne(Je, (o[L.tag] = Y.event), o);
      const be =
        D.bkm === 'pub' ? await ul(u, o[D.tag], E) : await cl(u, o[D.tag], E);
      if ((console.log(be), Y.isSuccess)) {
        const Pe = { message: be.msg.join('<br>'), timeout: 3e3 };
        if ((fe.trigger(Pe), ne(Je, (o[D.tag] = be.event), o), D.bkm === 'pub'))
          l(4, (S = o[D.tag].tags));
        else {
          const ze = await window.nostr.nip04.decrypt(i, o[D.tag].content);
          l(4, (S = JSON.parse(ze)));
        }
      } else {
        const Pe = {
          message: `failed to delete to ${o[D.tag].tags[0][1]}`,
          timeout: 3e3,
          background: 'bg-orange-500 text-white width-filled ',
        };
        fe.trigger(Pe);
      }
    } else {
      const se = {
        message: `failed to add to ${o[L.tag].tags[0][1]}`,
        timeout: 3e3,
        background: 'bg-orange-500 text-white width-filled ',
      };
      fe.trigger(se);
      return;
    }
    ne(_e, (t = !1), t);
  }
  let W = [];
  function oe(E, D, L) {
    l(6, (W = [D])),
      console.log(L),
      console.log(E),
      console.log(o[_].tags[0][1]),
      console.log(D),
      console.log(o[_].tags[D][1]);
    const X = {
      message: 'Are you sure you delete this note?',
      timeout: 1e4,
      action: { label: 'Delete', response: async () => x(E, [D], L) },
      callback: (Y) => {
        console.log(Y.id),
          Y.status === 'queued' && console.log('Toast was queued!'),
          Y.status === 'closed' && l(6, (W = []));
      },
      background: 'variant-filled-warning',
    };
    fe.trigger(X);
  }
  async function x(E, D, L) {
    ne(_e, (t = !0), t), await P(E);
    const X = L === 'pub' ? await ul(u, o[E], D) : await cl(u, o[E], D);
    if ((console.log(X), X.isSuccess)) {
      if ((ne(Je, (o[E] = X.event), o), L === 'pub')) l(4, (S = o[E].tags));
      else {
        const se = await window.nostr.nip04.decrypt(i, o[E].content);
        l(4, (S = JSON.parse(se)));
      }
      const Y = { message: X.msg.join('<br>'), timeout: 3e3 };
      fe.trigger(Y);
    } else {
      const Y = {
        message: 'failed to publish',
        timeout: 3e3,
        background: 'bg-orange-500 text-white width-filled ',
      };
      fe.trigger(Y);
    }
    ne(_e, (t = !1), t);
  }
  async function P(E) {
    const D = [{ authors: [i], kinds: [30001], '#d': [o[E].tags[0][1]] }];
    console.log(D);
    try {
      const L = await Ut(u, D);
      console.log(L), ne(Je, (o[E] = L[0]), o);
    } catch {
      const X = {
        message: '最新リストの読み込みに失敗しました',
        timeout: 3e3,
        background: 'bg-orange-500 text-white width-filled ',
      };
      fe.trigger(X);
    }
  }
  let te = [];
  function M() {
    const E = {
      type: 'component',
      component: H,
      title: 'Move note',
      body: `Move from ${o[_].tags[0][1]} to`,
      value: { bkm: v, tag: _ },
      response: async (D) => {
        console.log(D),
          D &&
            (await ie(te, { tag: _, bkm: v }, { tag: D.tag, bkm: D.bkm }),
            l(6, (W = [])),
            l(7, (te = [])),
            l(1, (h = !1)));
      },
    };
    Ne.trigger(E);
  }
  function De() {
    console.log(te);
    const E = {
      message: `Are you sure you delete these [${te.length}] notes?`,
      timeout: 1e4,
      action: {
        label: 'Delete',
        response: async () => {
          await x(_, te, v), l(7, (te = [])), l(6, (W = []));
        },
      },
      background: 'variant-filled-warning',
    };
    fe.trigger(E);
  }
  function Be() {
    const E = ['a', `30001:${i}:${o[_].tags[0][1]}`],
      D = { identifier: o[_].tags[0][1], pubkey: i, kind: 30001, relays: u },
      L = pt.naddrEncode(D);
    console.log(L), console.log(window.location.origin);
    const X = window.location.origin + '/a/' + L;
    console.log(X), console.log('post');
    const Y = {
      type: 'component',
      component: ee,
      title: 'postNote',
      body: 'NIP-07のpreferred relaysのwriteに設定されているリレーにポストします。',
      value: {
        content: `\r
${X}\r
`,
        tags: [E],
      },
      response: async (se) => {
        if ((console.log(se), se)) {
          ne(_e, (t = !0), t);
          const be = {
              id: '',
              pubkey: await window.nostr.getPublicKey(),
              created_at: Math.floor(Date.now() / 1e3),
              kind: 1,
              tags: [E],
              content: se.content,
              sig: '',
            },
            Pe = await window.nostr.getRelays(),
            ze = Object.keys(Pe).filter((Dt) => Pe[Dt].write === !0);
          await Ct(be, ze), ne(_e, (t = !1), t);
        }
      },
    };
    Ne.trigger(Y);
  }
  function Ce(E) {
    l(7, (te = [])),
      l(6, (W = [])),
      l(3, (v = 'pub')),
      window.scrollTo({ top: 0, behavior: 'auto' });
  }
  function Fe(E) {
    te.includes(E) ? te.splice(te.indexOf(E), 1) : te.push(E),
      l(6, (W = te)),
      console.log(E),
      console.log(te);
  }
  async function Ie() {
    i !== '' || u.length > 0
      ? (ne(_e, (t = !0), t),
        ne(Je, (o = await Ut(u, c)), o),
        o.length > 0
          ? (o.sort((E, D) => {
              const L = E.tags[0][1],
                X = D.tags[0][1];
              return L.localeCompare(X);
            }),
            console.log(o),
            l(4, (S = o[_].tags)))
          : (console.log('ブクマ何もないかも'),
            l(5, (z = 'ブクマ何もないかも'))),
        ne(_e, (t = !1), t))
      : console.log('error'),
      ne(_e, (t = !1), t);
  }
  const ae = {
    ref: cs,
    props: { background: 'bg-red-500' },
    slot: '<p>Skeleton</p>',
  };
  function ue() {
    const E = {
      type: 'component',
      component: ae,
      title: 'tagList',
      body: '',
      value: { tagList: o.map((D) => D.tags[0][1]) },
      response: (D) => {
        if ((console.log(D), D && D.index !== -1)) {
          if (D.index !== _) {
            l(2, (_ = D.index)), l(4, (S = o[_].tags));
            const L = document.querySelector('.tab-list');
            if (L) {
              const X = (_ / o.length) * 80,
                Y = Math.round((X / 100) * L.scrollWidth);
              L.scrollTo({ top: 0, left: Y, behavior: 'auto' });
            }
          }
          Ce(D.index);
        }
      },
    };
    Ne.trigger(E);
  }
  const ee = {
    ref: bo,
    props: { background: 'bg-red-500' },
    slot: '<p>Skeleton</p>',
  };
  function ce(E) {
    console.log('quote');
    const D = [E],
      L = {
        type: 'component',
        component: ee,
        title: 'postNote',
        body: 'NIP-07のpreferred relaysのwriteに設定されているリレーにポストします。',
        value: {
          content: `\r
nostr:${pt.noteEncode(E[1])}\r
`,
          tags: D,
        },
        response: async (X) => {
          if ((console.log(X), X)) {
            ne(_e, (t = !0), t);
            const Y = {
                id: '',
                pubkey: await window.nostr.getPublicKey(),
                created_at: Math.floor(Date.now() / 1e3),
                kind: 1,
                tags: D,
                content: X.content,
                sig: '',
              },
              se = await window.nostr.getRelays(),
              be = Object.keys(se).filter((ze) => se[ze].write === !0),
              Pe = await Ct(Y, be);
            if (Pe) {
              const ze = { message: Pe.msg.join('<br>'), timeout: 3e3 };
              fe.trigger(ze);
            }
            ne(_e, (t = !1), t);
          }
        },
      };
    Ne.trigger(L);
  }
  const Re = () => uo(window.location.origin);
  function Se(E) {
    (h = E), l(1, h);
  }
  const qe = () => {
    l(7, (te = [])), l(6, (W = []));
  };
  function Qe(E) {
    (_ = E), l(2, _);
  }
  const Ke = (E) => {
    l(1, (h = !1)), l(4, (S = o[_].tags)), l(3, (v = 'pub')), Ce();
  };
  function We(E) {
    (v = E), l(3, v);
  }
  const Le = () => {
    console.log(v), l(4, (S = o[_].tags));
  };
  function Ve(E) {
    (v = E), l(3, v);
  }
  return [
    b,
    h,
    _,
    v,
    S,
    z,
    W,
    te,
    t,
    o,
    i,
    u,
    R,
    B,
    C,
    O,
    Q,
    K,
    he,
    oe,
    M,
    De,
    Be,
    Ce,
    Fe,
    Ie,
    ue,
    ce,
    Re,
    Se,
    qe,
    Qe,
    Ke,
    We,
    Le,
    Ve,
    async () => {
      if (o[_].content.length > 0)
        try {
          const E = await window.nostr.nip04.decrypt(i, o[_].content);
          l(4, (S = JSON.parse(E)));
        } catch {
          const D = {
            message: '復号化できませんでした',
            timeout: 3e3,
            background: 'bg-orange-500 text-white width-filled ',
          };
          fe.trigger(D);
        }
      else l(4, (S = []));
    },
    (E, D) => {
      C(E, D.pubkey);
    },
    (E) => {
      O(E);
    },
    (E, D) => {
      C(E, D[1]);
    },
    (E) => Fe(E),
    (E) => ce(E),
    (E) => {
      window.open('https://nostr.com/' + pt.noteEncode(E[1]), '_blank');
    },
    (E) => {
      t || he(_, [E], v);
    },
    (E) => {
      t || oe(_, E, v);
    },
    () => Q(_),
  ];
}
class Zs extends xe {
  constructor(e) {
    super(), et(this, e, Js, qs, tt, {}, null, [-1, -1, -1]);
  }
}
export { Zs as component };
