import {
  a6 as ce,
  S as fe,
  i as ue,
  s as de,
  e as G,
  b as q,
  g as N,
  v as te,
  d as F,
  f as se,
  h as k,
  L as he,
  X as J,
  Y as Q,
  k as M,
  l as A,
  m as E,
  n as b,
  F as V,
  a7 as me,
  a as U,
  c as W,
  N as B,
  ad as be,
  ae as _e,
  af as ke,
  a9 as ge,
  ag as ye,
  ah as ve,
  O as De,
  ai as Te,
  q as Ie,
  r as je,
  u as Le,
  K as Me,
} from './index.e81ade4b.js';
import { i as Ae, t as C, j as Ee, k as Se } from './navigation.928c82b4.js';
function ze(n, { from: e, to: s }, t = {}) {
  const i = getComputedStyle(n),
    o = i.transform === 'none' ? '' : i.transform,
    [l, r] = i.transformOrigin.split(' ').map(parseFloat),
    m = e.left + (e.width * l) / s.width - (s.left + l),
    _ = e.top + (e.height * r) / s.height - (s.top + r),
    {
      delay: c = 0,
      duration: f = (h) => Math.sqrt(h) * 120,
      easing: u = Ae,
    } = t;
  return {
    delay: c,
    duration: ce(f) ? f(Math.sqrt(m * m + _ * _)) : f,
    easing: u,
    css: (h, g) => {
      const L = g * m,
        d = g * _,
        S = h + (g * e.width) / s.width,
        z = h + (g * e.height) / s.height;
      return `transform: ${o} translate(${L}px, ${d}px) scale(${S}, ${z});`;
    },
  };
}
function Z(n, e, s) {
  const t = n.slice();
  return (t[32] = e[s]), (t[34] = s), t;
}
function w(n) {
  let e,
    s,
    t = [],
    i = new Map(),
    o,
    l,
    r,
    m = n[6];
  const _ = (c) => c[32];
  for (let c = 0; c < m.length; c += 1) {
    let f = Z(n, m, c),
      u = _(f);
    i.set(u, (t[c] = ee(u, f)));
  }
  return {
    c() {
      (e = M('div')), (s = M('div'));
      for (let c = 0; c < t.length; c += 1) t[c].c();
      this.h();
    },
    l(c) {
      e = A(c, 'DIV', { class: !0, 'data-testid': !0 });
      var f = E(e);
      s = A(f, 'DIV', { class: !0 });
      var u = E(s);
      for (let h = 0; h < t.length; h += 1) t[h].l(u);
      u.forEach(k), f.forEach(k), this.h();
    },
    h() {
      b(s, 'class', (o = 'snackbar ' + n[8])),
        b(e, 'class', (l = 'snackbar-wrapper ' + n[9])),
        b(e, 'data-testid', 'snackbar-wrapper');
    },
    m(c, f) {
      q(c, e, f), V(e, s);
      for (let u = 0; u < t.length; u += 1) t[u] && t[u].m(s, null);
      r = !0;
    },
    p(c, f) {
      if (f[0] & 7390) {
        (m = c[6]), te();
        for (let u = 0; u < t.length; u += 1) t[u].r();
        t = me(t, f, _, 1, c, m, i, s, Te, ee, null, Z);
        for (let u = 0; u < t.length; u += 1) t[u].a();
        se();
      }
      (!r || (f[0] & 256 && o !== (o = 'snackbar ' + c[8]))) &&
        b(s, 'class', o),
        (!r || (f[0] & 512 && l !== (l = 'snackbar-wrapper ' + c[9]))) &&
          b(e, 'class', l);
    },
    i(c) {
      if (!r) {
        for (let f = 0; f < m.length; f += 1) N(t[f]);
        r = !0;
      }
    },
    o(c) {
      for (let f = 0; f < t.length; f += 1) F(t[f]);
      r = !1;
    },
    d(c) {
      c && k(e);
      for (let f = 0; f < t.length; f += 1) t[f].d();
    },
  };
}
function p(n) {
  let e,
    s,
    t = n[32].action && x(n),
    i = !n[32].hideDismiss && $(n);
  return {
    c() {
      (e = M('div')), t && t.c(), (s = U()), i && i.c(), this.h();
    },
    l(o) {
      e = A(o, 'DIV', { class: !0 });
      var l = E(e);
      t && t.l(l), (s = W(l)), i && i.l(l), l.forEach(k), this.h();
    },
    h() {
      b(e, 'class', 'toast-actions ' + He);
    },
    m(o, l) {
      q(o, e, l), t && t.m(e, null), V(e, s), i && i.m(e, null);
    },
    p(o, l) {
      o[32].action
        ? t
          ? t.p(o, l)
          : ((t = x(o)), t.c(), t.m(e, s))
        : t && (t.d(1), (t = null)),
        o[32].hideDismiss
          ? i && (i.d(1), (i = null))
          : i
          ? i.p(o, l)
          : ((i = $(o)), i.c(), i.m(e, null));
    },
    d(o) {
      o && k(e), t && t.d(), i && i.d();
    },
  };
}
function x(n) {
  let e,
    s = n[32].action.label + '',
    t,
    i;
  function o() {
    return n[26](n[34]);
  }
  return {
    c() {
      (e = M('button')), this.h();
    },
    l(l) {
      e = A(l, 'BUTTON', { class: !0 });
      var r = E(e);
      r.forEach(k), this.h();
    },
    h() {
      b(e, 'class', n[2]);
    },
    m(l, r) {
      q(l, e, r), (e.innerHTML = s), t || ((i = B(e, 'click', o)), (t = !0));
    },
    p(l, r) {
      (n = l),
        r[0] & 64 && s !== (s = n[32].action.label + '') && (e.innerHTML = s),
        r[0] & 4 && b(e, 'class', n[2]);
    },
    d(l) {
      l && k(e), (t = !1), i();
    },
  };
}
function $(n) {
  let e, s, t, i;
  function o() {
    return n[27](n[32]);
  }
  return {
    c() {
      (e = M('button')), (s = Ie(n[4])), this.h();
    },
    l(l) {
      e = A(l, 'BUTTON', { class: !0 });
      var r = E(e);
      (s = je(r, n[4])), r.forEach(k), this.h();
    },
    h() {
      b(e, 'class', n[3]);
    },
    m(l, r) {
      q(l, e, r), V(e, s), t || ((i = B(e, 'click', o)), (t = !0));
    },
    p(l, r) {
      (n = l), r[0] & 16 && Le(s, n[4]), r[0] & 8 && b(e, 'class', n[3]);
    },
    d(l) {
      l && k(e), (t = !1), i();
    },
  };
}
function ee(n, e) {
  let s,
    t,
    i,
    o = e[32].message + '',
    l,
    r,
    m,
    _,
    c,
    f,
    u = Me,
    h,
    g,
    L,
    d = (e[32].action || !e[32].hideDismiss) && p(e);
  function S() {
    return e[28](e[34]);
  }
  function z() {
    return e[29](e[34]);
  }
  return {
    key: n,
    first: null,
    c() {
      (s = M('div')),
        (t = M('div')),
        (i = M('div')),
        (l = U()),
        d && d.c(),
        (m = U()),
        this.h();
    },
    l(y) {
      s = A(y, 'DIV', {});
      var v = E(s);
      t = A(v, 'DIV', {
        class: !0,
        role: !0,
        'aria-live': !0,
        'data-testid': !0,
      });
      var O = E(t);
      i = A(O, 'DIV', { class: !0 });
      var D = E(i);
      D.forEach(k),
        (l = W(O)),
        d && d.l(O),
        O.forEach(k),
        (m = W(v)),
        v.forEach(k),
        this.h();
    },
    h() {
      b(i, 'class', 'text-base'),
        b(
          t,
          'class',
          (r =
            'toast ' +
            e[7] +
            ' ' +
            (e[32].background ?? e[1]) +
            ' ' +
            (e[32].classes ?? '')),
        ),
        b(t, 'role', 'alert'),
        b(t, 'aria-live', 'polite'),
        b(t, 'data-testid', 'toast'),
        (this.first = s);
    },
    m(y, v) {
      q(y, s, v),
        V(s, t),
        V(t, i),
        (i.innerHTML = o),
        V(t, l),
        d && d.m(t, null),
        V(s, m),
        (h = !0),
        g || ((L = [B(s, 'mouseenter', S), B(s, 'mouseleave', z)]), (g = !0));
    },
    p(y, v) {
      (e = y),
        (!h || v[0] & 64) &&
          o !== (o = e[32].message + '') &&
          (i.innerHTML = o),
        e[32].action || !e[32].hideDismiss
          ? d
            ? d.p(e, v)
            : ((d = p(e)), d.c(), d.m(t, null))
          : d && (d.d(1), (d = null)),
        (!h ||
          (v[0] & 194 &&
            r !==
              (r =
                'toast ' +
                e[7] +
                ' ' +
                (e[32].background ?? e[1]) +
                ' ' +
                (e[32].classes ?? '')))) &&
          b(t, 'class', r);
    },
    r() {
      f = s.getBoundingClientRect();
    },
    f() {
      be(s), u(), _e(s, f);
    },
    a() {
      u(), (u = ke(s, f, ze, { duration: e[0] }));
    },
    i(y) {
      h ||
        (ge(() => {
          h &&
            (c && c.end(1), (_ = ye(s, e[14], { key: e[32].id })), _.start());
        }),
        (h = !0));
    },
    o(y) {
      _ && _.invalidate(), (c = ve(s, e[13], { key: e[32].id })), (h = !1);
    },
    d(y) {
      y && k(s), d && d.d(), y && c && c.end(), (g = !1), De(L);
    },
  };
}
function Oe(n) {
  let e,
    s,
    t = n[5].length && w(n);
  return {
    c() {
      t && t.c(), (e = G());
    },
    l(i) {
      t && t.l(i), (e = G());
    },
    m(i, o) {
      t && t.m(i, o), q(i, e, o), (s = !0);
    },
    p(i, o) {
      i[5].length
        ? t
          ? (t.p(i, o), o[0] & 32 && N(t, 1))
          : ((t = w(i)), t.c(), N(t, 1), t.m(e.parentNode, e))
        : t &&
          (te(),
          F(t, 1, 1, () => {
            t = null;
          }),
          se());
    },
    i(i) {
      s || (N(t), (s = !0));
    },
    o(i) {
      F(t), (s = !1);
    },
    d(i) {
      t && t.d(i), i && k(e);
    },
  };
}
const Ve = 'flex fixed top-0 left-0 right-0 bottom-0 pointer-events-none',
  qe = 'flex flex-col gap-y-2',
  Ce = 'flex justify-between items-center pointer-events-auto',
  He = 'flex items-center space-x-2';
function Ne(n, e, s) {
  let t, i, o, l, r;
  he(n, C, (a) => s(5, (r = a)));
  let { position: m = 'b' } = e,
    { max: _ = 3 } = e,
    { duration: c = 250 } = e,
    { background: f = 'variant-filled-secondary' } = e,
    { width: u = 'max-w-[640px]' } = e,
    { color: h = '' } = e,
    { padding: g = 'p-4' } = e,
    { spacing: L = 'space-x-4' } = e,
    { rounded: d = 'rounded-container-token' } = e,
    { shadow: S = 'shadow-lg' } = e,
    { zIndex: z = 'z-[888]' } = e,
    { buttonAction: y = 'btn variant-filled' } = e,
    { buttonDismiss: v = 'btn-icon btn-icon-sm variant-filled' } = e,
    { buttonDismissLabel: O = '✕' } = e,
    D,
    I,
    j = { x: 0, y: 0 };
  switch (m) {
    case 't':
      (D = 'justify-center items-start'),
        (I = 'items-center'),
        (j = { x: 0, y: -100 });
      break;
    case 'b':
      (D = 'justify-center items-end'),
        (I = 'items-center'),
        (j = { x: 0, y: 100 });
      break;
    case 'l':
      (D = 'justify-start items-center'),
        (I = 'items-start'),
        (j = { x: -100, y: 0 });
      break;
    case 'r':
      (D = 'justify-end items-center'),
        (I = 'items-end'),
        (j = { x: 100, y: 0 });
      break;
    case 'tl':
      (D = 'justify-start items-start'),
        (I = 'items-start'),
        (j = { x: -100, y: 0 });
      break;
    case 'tr':
      (D = 'justify-end items-start'),
        (I = 'items-end'),
        (j = { x: 100, y: 0 });
      break;
    case 'bl':
      (D = 'justify-start items-end'),
        (I = 'items-start'),
        (j = { x: -100, y: 0 });
      break;
    case 'br':
      (D = 'justify-end items-end'), (I = 'items-end'), (j = { x: 100, y: 0 });
      break;
  }
  function K(a) {
    var T, H;
    (H = (T = r[a]) == null ? void 0 : T.action) == null || H.response(),
      C.close(r[a].id);
  }
  function P(a) {
    var T;
    (T = r[a]) != null &&
      T.hoverable &&
      (C.freeze(a), s(8, (i += ' scale-[105%]')));
  }
  function R(a) {
    var T;
    (T = r[a]) != null &&
      T.hoverable &&
      (C.unfreeze(a), s(8, (i = i.replace(' scale-[105%]', ''))));
  }
  const [ie, ae] = Ee({
      duration: (a) => Math.sqrt(a * c),
      fallback(a) {
        const T = getComputedStyle(a),
          H = T.transform === 'none' ? '' : T.transform;
        return {
          duration: c,
          easing: Se,
          css: (X, Y) => `
					transform: ${H} scale(${X}) translate(${Y * j.x}%, ${Y * j.y}%);
					opacity: ${X}
				`,
        };
      },
    }),
    ne = (a) => K(a),
    le = (a) => C.close(a.id),
    oe = (a) => P(a),
    re = (a) => R(a);
  return (
    (n.$$set = (a) => {
      s(31, (e = J(J({}, e), Q(a)))),
        'position' in a && s(15, (m = a.position)),
        'max' in a && s(16, (_ = a.max)),
        'duration' in a && s(0, (c = a.duration)),
        'background' in a && s(1, (f = a.background)),
        'width' in a && s(17, (u = a.width)),
        'color' in a && s(18, (h = a.color)),
        'padding' in a && s(19, (g = a.padding)),
        'spacing' in a && s(20, (L = a.spacing)),
        'rounded' in a && s(21, (d = a.rounded)),
        'shadow' in a && s(22, (S = a.shadow)),
        'zIndex' in a && s(23, (z = a.zIndex)),
        'buttonAction' in a && s(2, (y = a.buttonAction)),
        'buttonDismiss' in a && s(3, (v = a.buttonDismiss)),
        'buttonDismissLabel' in a && s(4, (O = a.buttonDismissLabel));
    }),
    (n.$$.update = () => {
      s(9, (t = `${Ve} ${D} ${z} ${e.class || ''}`)),
        n.$$.dirty[0] & 34078720 && s(8, (i = `${qe} ${I} ${g}`)),
        n.$$.dirty[0] & 8257536 &&
          s(7, (o = `${Ce} ${u} ${h} ${g} ${L} ${d} ${S}`)),
        n.$$.dirty[0] & 65568 && s(6, (l = Array.from(r).slice(0, _)));
    }),
    (e = Q(e)),
    [
      c,
      f,
      y,
      v,
      O,
      r,
      l,
      o,
      i,
      t,
      K,
      P,
      R,
      ie,
      ae,
      m,
      _,
      u,
      h,
      g,
      L,
      d,
      S,
      z,
      D,
      I,
      ne,
      le,
      oe,
      re,
    ]
  );
}
class Ue extends fe {
  constructor(e) {
    super(),
      ue(
        this,
        e,
        Ne,
        Oe,
        de,
        {
          position: 15,
          max: 16,
          duration: 0,
          background: 1,
          width: 17,
          color: 18,
          padding: 19,
          spacing: 20,
          rounded: 21,
          shadow: 22,
          zIndex: 23,
          buttonAction: 2,
          buttonDismiss: 3,
          buttonDismissLabel: 4,
        },
        null,
        [-1, -1],
      );
  }
}
export { Ue as T };
