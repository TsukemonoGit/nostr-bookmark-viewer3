import {
  S as mt,
  i as vt,
  s as gt,
  k as p,
  a as S,
  y as te,
  q as E,
  D as bt,
  l as _,
  h as f,
  c as T,
  z as le,
  m,
  r as w,
  n as d,
  F as c,
  b as D,
  A as ae,
  N as ye,
  d as V,
  f as pe,
  g as I,
  B as re,
  P as Ae,
  L as We,
  o as $t,
  Q as Ie,
  K as de,
  v as _e,
  u as Y,
  R as kt,
  w as Et,
  T as wt,
  U as yt,
  e as oe,
  O as ft,
  V as Xe,
} from '../chunks/index.e81ade4b.js';
import { p as Dt } from '../chunks/stores.775d0d4f.js';
import {
  n as Te,
  f as It,
  P as Nt,
  p as Vt,
  t as St,
  g as Tt,
} from '../chunks/navigation.928c82b4.js';
import {
  M as At,
  R as dt,
  n as we,
  m as Me,
  A as Pt,
  T as pt,
  N as Bt,
  a as _t,
  P as Ot,
  b as Ct,
  c as Mt,
  d as Ft,
  e as ht,
  C as jt,
} from '../chunks/Content.952014ad.js';
import { p as Jt } from '../chunks/popup.7188fd77.js';
import '../chunks/ProgressBar.svelte_svelte_type_style_lang.0751fc73.js';
function Ye(i, t, l) {
  const e = i.slice();
  return (e[28] = t[l]), (e[30] = l), e;
}
function Ze(i, t, l) {
  const e = i.slice();
  return (e[36] = t[l]), e;
}
function xe(i, t, l) {
  const e = i.slice();
  return (e[33] = t[l]), e;
}
function et(i, t, l) {
  const e = i.slice();
  return (e[39] = t[l]), e;
}
function tt(i) {
  let t,
    l = i[39] + '',
    e;
  return {
    c() {
      (t = p('li')), (e = E(l)), this.h();
    },
    l(a) {
      t = _(a, 'LI', { class: !0 });
      var s = m(t);
      (e = w(s, l)), s.forEach(f), this.h();
    },
    h() {
      d(t, 'class', 'ml-4');
    },
    m(a, s) {
      D(a, t, s), c(t, e);
    },
    p: de,
    d(a) {
      a && f(t);
    },
  };
}
function Lt(i) {
  let t, l, e, a, s, r, n, o;
  return (
    (e = new Pt({
      props: {
        gridColumns: 'grid grid-cols-[auto_1fr_auto]',
        slotDefault: 'place-self-center',
        slotTrail: 'place-self-end',
        padding: 'p-0',
        background: 'bg-surface-300-600-token ',
        gap: 'gap-0',
        $$slots: { trail: [Ht], lead: [Gt], default: [zt] },
        $$scope: { ctx: i },
      },
    })),
    (s = new pt({
      props: {
        justify: 'justify-center',
        flex: 'flex-1',
        rounded: '',
        class: 'bg-surface-50/80 w-full drop-shadow',
        $$slots: { default: [Wt] },
        $$scope: { ctx: i },
      },
    })),
    (n = new Bt({
      props: { relays: dt, $$slots: { default: [nl] }, $$scope: { ctx: i } },
    })),
    {
      c() {
        (t = p('div')),
          (l = p('div')),
          te(e.$$.fragment),
          (a = S()),
          te(s.$$.fragment),
          (r = S()),
          te(n.$$.fragment),
          this.h();
      },
      l(u) {
        t = _(u, 'DIV', { class: !0 });
        var h = m(t);
        l = _(h, 'DIV', { class: !0 });
        var g = m(l);
        le(e.$$.fragment, g),
          (a = T(g)),
          le(s.$$.fragment, g),
          g.forEach(f),
          h.forEach(f),
          (r = T(u)),
          le(n.$$.fragment, u),
          this.h();
      },
      h() {
        d(l, 'class', 'max-w-screen-lg m-auto z-10'),
          d(
            t,
            'class',
            'w-full fixed top-0 left-1/2 transform -translate-x-1/2 z-10',
          );
      },
      m(u, h) {
        D(u, t, h),
          c(t, l),
          ae(e, l, null),
          c(l, a),
          ae(s, l, null),
          D(u, r, h),
          ae(n, u, h),
          (o = !0);
      },
      p(u, h) {
        const g = {};
        (h[0] & 36) | (h[1] & 2048) && (g.$$scope = { dirty: h, ctx: u }),
          e.$set(g);
        const $ = {};
        (h[0] & 8) | (h[1] & 2048) && ($.$$scope = { dirty: h, ctx: u }),
          s.$set($);
        const b = {};
        (h[0] & 16) | (h[1] & 2048) && (b.$$scope = { dirty: h, ctx: u }),
          n.$set(b);
      },
      i(u) {
        o ||
          (I(e.$$.fragment, u),
          I(s.$$.fragment, u),
          I(n.$$.fragment, u),
          (o = !0));
      },
      o(u) {
        V(e.$$.fragment, u), V(s.$$.fragment, u), V(n.$$.fragment, u), (o = !1);
      },
      d(u) {
        u && f(t), re(e), re(s), u && f(r), re(n, u);
      },
    }
  );
}
function Ut(i) {
  let t;
  return {
    c() {
      t = E(i[0]);
    },
    l(l) {
      t = w(l, i[0]);
    },
    m(l, e) {
      D(l, t, e);
    },
    p(l, e) {
      e[0] & 1 && Y(t, l[0]);
    },
    i: de,
    o: de,
    d(l) {
      l && f(t);
    },
  };
}
function qt(i) {
  let t;
  return {
    c() {
      t = E('now loading');
    },
    l(l) {
      t = w(l, 'now loading');
    },
    m(l, e) {
      D(l, t, e);
    },
    p: de,
    i: de,
    o: de,
    d(l) {
      l && f(t);
    },
  };
}
function lt(i) {
  let t, l;
  return (
    (t = new _t({
      props: {
        group: cl,
        name: i[2][0].tags[0][1],
        value: 0,
        $$slots: { default: [Rt] },
        $$scope: { ctx: i },
      },
    })),
    {
      c() {
        te(t.$$.fragment);
      },
      l(e) {
        le(t.$$.fragment, e);
      },
      m(e, a) {
        ae(t, e, a), (l = !0);
      },
      p(e, a) {
        const s = {};
        a[0] & 4 && (s.name = e[2][0].tags[0][1]),
          (a[0] & 4) | (a[1] & 2048) && (s.$$scope = { dirty: a, ctx: e }),
          t.$set(s);
      },
      i(e) {
        l || (I(t.$$.fragment, e), (l = !0));
      },
      o(e) {
        V(t.$$.fragment, e), (l = !1);
      },
      d(e) {
        re(t, e);
      },
    }
  );
}
function Rt(i) {
  let t = i[2][0].tags[0][1] + '',
    l;
  return {
    c() {
      l = E(t);
    },
    l(e) {
      l = w(e, t);
    },
    m(e, a) {
      D(e, l, a);
    },
    p(e, a) {
      a[0] & 4 && t !== (t = e[2][0].tags[0][1] + '') && Y(l, t);
    },
    d(e) {
      e && f(l);
    },
  };
}
function Kt(i) {
  let t,
    l,
    e = !i[5] && lt(i);
  return {
    c() {
      e && e.c(), (t = oe());
    },
    l(a) {
      e && e.l(a), (t = oe());
    },
    m(a, s) {
      e && e.m(a, s), D(a, t, s), (l = !0);
    },
    p(a, s) {
      a[5]
        ? e &&
          (_e(),
          V(e, 1, 1, () => {
            e = null;
          }),
          pe())
        : e
        ? (e.p(a, s), s[0] & 32 && I(e, 1))
        : ((e = lt(a)), e.c(), I(e, 1), e.m(t.parentNode, t));
    },
    i(a) {
      l || (I(e), (l = !0));
    },
    o(a) {
      V(e), (l = !1);
    },
    d(a) {
      e && e.d(a), a && f(t);
    },
  };
}
function zt(i) {
  let t, l, e;
  return (
    (l = new pt({
      props: {
        padding: 'py-3 px-4',
        justify: 'justify',
        active: 'variant-filled-secondary',
        hover: 'hover:variant-soft-secondary',
        border: 'border-b border-surface-400-500-token',
        rounded: 'rounded-tl-container-token rounded-tr-container-token',
        $$slots: { default: [Kt] },
        $$scope: { ctx: i },
      },
    })),
    {
      c() {
        (t = p('div')), te(l.$$.fragment), this.h();
      },
      l(a) {
        t = _(a, 'DIV', { class: !0 });
        var s = m(t);
        le(l.$$.fragment, s), s.forEach(f), this.h();
      },
      h() {
        d(t, 'class', 'tabGroup svelte-pws32x');
      },
      m(a, s) {
        D(a, t, s), ae(l, t, null), (e = !0);
      },
      p(a, s) {
        const r = {};
        (s[0] & 36) | (s[1] & 2048) && (r.$$scope = { dirty: s, ctx: a }),
          l.$set(r);
      },
      i(a) {
        e || (I(l.$$.fragment, a), (e = !0));
      },
      o(a) {
        V(l.$$.fragment, a), (e = !1);
      },
      d(a) {
        a && f(t), re(l);
      },
    }
  );
}
function Gt(i) {
  let t, l, e, a, s;
  return {
    c() {
      (t = p('div')), (l = p('button')), (e = E('📝')), this.h();
    },
    l(r) {
      t = _(r, 'DIV', { class: !0 });
      var n = m(t);
      l = _(n, 'BUTTON', { class: !0 });
      var o = m(l);
      (e = w(o, '📝')), o.forEach(f), n.forEach(f), this.h();
    },
    h() {
      d(l, 'class', 'btn-icon variant-filled'),
        d(t, 'class', 'lead-icon pl-2 z-20');
    },
    m(r, n) {
      D(r, t, n),
        c(t, l),
        c(l, e),
        a || ((s = kt(Jt.call(null, l, i[9]))), (a = !0));
    },
    p: de,
    d(r) {
      r && f(t), (a = !1), s();
    },
  };
}
function Ht(i) {
  let t;
  return {
    c() {
      (t = p('div')), this.h();
    },
    l(l) {
      (t = _(l, 'DIV', { class: !0 })), m(t).forEach(f), this.h();
    },
    h() {
      d(t, 'class', 'pr-2 text-center justify-center');
    },
    m(l, e) {
      D(l, t, e);
    },
    p: de,
    d(l) {
      l && f(t);
    },
  };
}
function Qt(i) {
  let t;
  return {
    c() {
      t = E('public');
    },
    l(l) {
      t = w(l, 'public');
    },
    m(l, e) {
      D(l, t, e);
    },
    d(l) {
      l && f(t);
    },
  };
}
function Wt(i) {
  let t, l, e;
  function a(r) {
    i[14](r);
  }
  let s = {
    name: 'pub',
    value: 'pub',
    $$slots: { default: [Qt] },
    $$scope: { ctx: i },
  };
  return (
    i[3] !== void 0 && (s.group = i[3]),
    (t = new _t({ props: s })),
    Et.push(() => wt(t, 'group', a)),
    {
      c() {
        te(t.$$.fragment);
      },
      l(r) {
        le(t.$$.fragment, r);
      },
      m(r, n) {
        ae(t, r, n), (e = !0);
      },
      p(r, n) {
        const o = {};
        n[1] & 2048 && (o.$$scope = { dirty: n, ctx: r }),
          !l && n[0] & 8 && ((l = !0), (o.group = r[3]), yt(() => (l = !1))),
          t.$set(o);
      },
      i(r) {
        e || (I(t.$$.fragment, r), (e = !0));
      },
      o(r) {
        V(t.$$.fragment, r), (e = !1);
      },
      d(r) {
        re(t, r);
      },
    }
  );
}
function at(i) {
  let t,
    l,
    e = i[4],
    a = [];
  for (let r = 0; r < e.length; r += 1) a[r] = ct(Ye(i, e, r));
  const s = (r) =>
    V(a[r], 1, 1, () => {
      a[r] = null;
    });
  return {
    c() {
      for (let r = 0; r < a.length; r += 1) a[r].c();
      t = oe();
    },
    l(r) {
      for (let n = 0; n < a.length; n += 1) a[n].l(r);
      t = oe();
    },
    m(r, n) {
      for (let o = 0; o < a.length; o += 1) a[o] && a[o].m(r, n);
      D(r, t, n), (l = !0);
    },
    p(r, n) {
      if ((n[0] & 7184) | (n[1] & 3)) {
        e = r[4];
        let o;
        for (o = 0; o < e.length; o += 1) {
          const u = Ye(r, e, o);
          a[o]
            ? (a[o].p(u, n), I(a[o], 1))
            : ((a[o] = ct(u)), a[o].c(), I(a[o], 1), a[o].m(t.parentNode, t));
        }
        for (_e(), o = e.length; o < a.length; o += 1) s(o);
        pe();
      }
    },
    i(r) {
      if (!l) {
        for (let n = 0; n < e.length; n += 1) I(a[n]);
        l = !0;
      }
    },
    o(r) {
      a = a.filter(Boolean);
      for (let n = 0; n < a.length; n += 1) V(a[n]);
      l = !1;
    },
    d(r) {
      Ae(a, r), r && f(t);
    },
  };
}
function Xt(i) {
  let t,
    l,
    e,
    a = i[28][0] + '',
    s,
    r,
    n,
    o,
    u = i[28].slice(1),
    h = [];
  for (let g = 0; g < u.length; g += 1) h[g] = rt(Ze(i, u, g));
  return {
    c() {
      (t = p('div')),
        (l = p('div')),
        (e = p('div')),
        (s = E(a)),
        (r = S()),
        (n = p('div'));
      for (let g = 0; g < h.length; g += 1) h[g].c();
      (o = S()), this.h();
    },
    l(g) {
      t = _(g, 'DIV', { class: !0 });
      var $ = m(t);
      l = _($, 'DIV', { class: !0 });
      var b = m(l);
      e = _(b, 'DIV', { class: !0 });
      var A = m(e);
      (s = w(A, a)), A.forEach(f), (r = T(b)), (n = _(b, 'DIV', { class: !0 }));
      var C = m(n);
      for (let k = 0; k < h.length; k += 1) h[k].l(C);
      C.forEach(f), b.forEach(f), (o = T($)), $.forEach(f), this.h();
    },
    h() {
      d(e, 'class', 'font-bold'),
        d(n, 'class', 'flex'),
        d(l, 'class', 'grid grid-rows-[auto_auto] gap-0'),
        d(
          t,
          'class',
          'card drop-shadow-md p-2 my-1 grid grid-cols-[1fr_auto] gap-1',
        );
    },
    m(g, $) {
      D(g, t, $), c(t, l), c(l, e), c(e, s), c(l, r), c(l, n);
      for (let b = 0; b < h.length; b += 1) h[b] && h[b].m(n, null);
      c(t, o);
    },
    p(g, $) {
      if (($[0] & 16 && a !== (a = g[28][0] + '') && Y(s, a), $[0] & 16)) {
        u = g[28].slice(1);
        let b;
        for (b = 0; b < u.length; b += 1) {
          const A = Ze(g, u, b);
          h[b] ? h[b].p(A, $) : ((h[b] = rt(A)), h[b].c(), h[b].m(n, null));
        }
        for (; b < h.length; b += 1) h[b].d(1);
        h.length = u.length;
      }
    },
    i: de,
    o: de,
    d(g) {
      g && f(t), Ae(h, g);
    },
  };
}
function Yt(i) {
  let t, l, e, a, s, r, n, o, u, h, g, $, b;
  l = new Ft({
    props: {
      queryKey: [i[28][1]],
      id: i[28][1],
      $$slots: {
        nodata: [
          sl,
          ({ text: k }) => ({ 31: k }),
          ({ text: k }) => [0, k ? 1 : 0],
        ],
        error: [
          ol,
          ({ text: k }) => ({ 31: k }),
          ({ text: k }) => [0, k ? 1 : 0],
        ],
        loading: [
          rl,
          ({ text: k }) => ({ 31: k }),
          ({ text: k }) => [0, k ? 1 : 0],
        ],
        default: [
          al,
          ({ text: k }) => ({ 31: k }),
          ({ text: k }) => [0, k ? 1 : 0],
        ],
      },
      $$scope: { ctx: i },
    },
  });
  function A() {
    return i[18](i[28]);
  }
  function C() {
    return i[19](i[28]);
  }
  return {
    c() {
      (t = p('div')),
        te(l.$$.fragment),
        (e = S()),
        (a = p('div')),
        (s = p('button')),
        (r = E('🐥')),
        (n = S()),
        (o = p('button')),
        (u = E('🔗')),
        (h = S()),
        this.h();
    },
    l(k) {
      t = _(k, 'DIV', { class: !0 });
      var P = m(t);
      le(l.$$.fragment, P), (e = T(P)), (a = _(P, 'DIV', { class: !0 }));
      var O = m(a);
      s = _(O, 'BUTTON', { class: !0 });
      var R = m(s);
      (r = w(R, '🐥')),
        R.forEach(f),
        (n = T(O)),
        (o = _(O, 'BUTTON', { class: !0 }));
      var K = m(o);
      (u = w(K, '🔗')),
        K.forEach(f),
        O.forEach(f),
        (h = T(P)),
        P.forEach(f),
        this.h();
    },
    h() {
      d(s, 'class', 'btn p-0 mt-1 variant-filled justify-self-end'),
        d(o, 'class', 'btn p-0 mt-1 variant-filled justify-self-end'),
        d(a, 'class', 'flex flex-col'),
        d(
          t,
          'class',
          'card drop-shadow px-1 py-2 my-1 grid grid-cols-[1fr_auto] gap-1',
        );
    },
    m(k, P) {
      D(k, t, P),
        ae(l, t, null),
        c(t, e),
        c(t, a),
        c(a, s),
        c(s, r),
        c(a, n),
        c(a, o),
        c(o, u),
        c(t, h),
        (g = !0),
        $ || ((b = [ye(s, 'click', A), ye(o, 'click', C)]), ($ = !0));
    },
    p(k, P) {
      i = k;
      const O = {};
      P[0] & 16 && (O.queryKey = [i[28][1]]),
        P[0] & 16 && (O.id = i[28][1]),
        (P[0] & 16) | (P[1] & 2049) && (O.$$scope = { dirty: P, ctx: i }),
        l.$set(O);
    },
    i(k) {
      g || (I(l.$$.fragment, k), (g = !0));
    },
    o(k) {
      V(l.$$.fragment, k), (g = !1);
    },
    d(k) {
      k && f(t), re(l), ($ = !1), ft(b);
    },
  };
}
function rt(i) {
  let t,
    l = i[36] + '',
    e,
    a;
  return {
    c() {
      (t = p('div')), (e = E(l)), (a = S()), this.h();
    },
    l(s) {
      t = _(s, 'DIV', { class: !0 });
      var r = m(t);
      (e = w(r, l)), (a = T(r)), r.forEach(f), this.h();
    },
    h() {
      d(t, 'class', 'flex flex-wrap px-1 mx-1 break-all');
    },
    m(s, r) {
      D(s, t, r), c(t, e), c(t, a);
    },
    p(s, r) {
      r[0] & 16 && l !== (l = s[36] + '') && Y(e, l);
    },
    d(s) {
      s && f(t);
    },
  };
}
function ot(i) {
  let t, l;
  return {
    c() {
      (t = p('img')), this.h();
    },
    l(e) {
      (t = _(e, 'IMG', { class: !0, src: !0, alt: !0 })), this.h();
    },
    h() {
      d(t, 'class', 'w-12 object-contain justify-center'),
        Xe(t.src, (l = JSON.parse(i[32].content).picture)) || d(t, 'src', l),
        d(t, 'alt', 'avatar');
    },
    m(e, a) {
      D(e, t, a);
    },
    p(e, a) {
      a[1] & 2 &&
        !Xe(t.src, (l = JSON.parse(e[32].content).picture)) &&
        d(t, 'src', l);
    },
    d(e) {
      e && f(t);
    },
  };
}
function st(i) {
  let t,
    l,
    e = i[31].tags,
    a = [];
  for (let r = 0; r < e.length; r += 1) a[r] = it(xe(i, e, r));
  const s = (r) =>
    V(a[r], 1, 1, () => {
      a[r] = null;
    });
  return {
    c() {
      for (let r = 0; r < a.length; r += 1) a[r].c();
      t = oe();
    },
    l(r) {
      for (let n = 0; n < a.length; n += 1) a[n].l(r);
      t = oe();
    },
    m(r, n) {
      for (let o = 0; o < a.length; o += 1) a[o] && a[o].m(r, n);
      D(r, t, n), (l = !0);
    },
    p(r, n) {
      if ((n[0] & 1024) | (n[1] & 3)) {
        e = r[31].tags;
        let o;
        for (o = 0; o < e.length; o += 1) {
          const u = xe(r, e, o);
          a[o]
            ? (a[o].p(u, n), I(a[o], 1))
            : ((a[o] = it(u)), a[o].c(), I(a[o], 1), a[o].m(t.parentNode, t));
        }
        for (_e(), o = e.length; o < a.length; o += 1) s(o);
        pe();
      }
    },
    i(r) {
      if (!l) {
        for (let n = 0; n < e.length; n += 1) I(a[n]);
        l = !0;
      }
    },
    o(r) {
      a = a.filter(Boolean);
      for (let n = 0; n < a.length; n += 1) V(a[n]);
      l = !1;
    },
    d(r) {
      Ae(a, r), r && f(t);
    },
  };
}
function nt(i) {
  let t, l;
  return (
    (t = new ht({
      props: {
        queryKey: ['metadata', i[33][1]],
        pubkey: i[33][1],
        $$slots: {
          default: [
            Zt,
            ({ metadata: e }) => ({ 32: e }),
            ({ metadata: e }) => [0, e ? 2 : 0],
          ],
        },
        $$scope: { ctx: i },
      },
    })),
    {
      c() {
        te(t.$$.fragment);
      },
      l(e) {
        le(t.$$.fragment, e);
      },
      m(e, a) {
        ae(t, e, a), (l = !0);
      },
      p(e, a) {
        const s = {};
        a[1] & 1 && (s.queryKey = ['metadata', e[33][1]]),
          a[1] & 1 && (s.pubkey = e[33][1]),
          a[1] & 2051 && (s.$$scope = { dirty: a, ctx: e }),
          t.$set(s);
      },
      i(e) {
        l || (I(t.$$.fragment, e), (l = !0));
      },
      o(e) {
        V(t.$$.fragment, e), (l = !1);
      },
      d(e) {
        re(t, e);
      },
    }
  );
}
function Zt(i) {
  let t,
    l,
    e,
    a,
    s,
    r = JSON.parse(i[32].content).name + '',
    n,
    o,
    u,
    h;
  function g() {
    return i[17](i[32], i[33]);
  }
  return {
    c() {
      (t = p('div')),
        (l = E('to ')),
        (e = p('button')),
        (a = E('@')),
        (s = p('u')),
        (n = E(r)),
        (o = S()),
        this.h();
    },
    l($) {
      t = _($, 'DIV', { class: !0 });
      var b = m(t);
      (l = w(b, 'to ')), (e = _(b, 'BUTTON', { class: !0 }));
      var A = m(e);
      (a = w(A, '@')), (s = _(A, 'U', {}));
      var C = m(s);
      (n = w(C, r)),
        C.forEach(f),
        A.forEach(f),
        b.forEach(f),
        (o = T($)),
        this.h();
    },
    h() {
      d(
        e,
        'class',
        'text-emerald-800 whitespace-nowrap overflow-hidden text-ellipsis',
      ),
        d(
          t,
          'class',
          '-mt-1 px-2 opacity-50 text-sm whitespace-nowrap overflow-hidden',
        );
    },
    m($, b) {
      D($, t, b),
        c(t, l),
        c(t, e),
        c(e, a),
        c(e, s),
        c(s, n),
        D($, o, b),
        u || ((h = ye(e, 'click', g)), (u = !0));
    },
    p($, b) {
      (i = $),
        b[1] & 2 && r !== (r = JSON.parse(i[32].content).name + '') && Y(n, r);
    },
    d($) {
      $ && f(t), $ && f(o), (u = !1), h();
    },
  };
}
function it(i) {
  let t,
    l,
    e = i[33][0] === 'p' && nt(i);
  return {
    c() {
      e && e.c(), (t = oe());
    },
    l(a) {
      e && e.l(a), (t = oe());
    },
    m(a, s) {
      e && e.m(a, s), D(a, t, s), (l = !0);
    },
    p(a, s) {
      a[33][0] === 'p'
        ? e
          ? (e.p(a, s), s[1] & 1 && I(e, 1))
          : ((e = nt(a)), e.c(), I(e, 1), e.m(t.parentNode, t))
        : e &&
          (_e(),
          V(e, 1, 1, () => {
            e = null;
          }),
          pe());
    },
    i(a) {
      l || (I(e), (l = !0));
    },
    o(a) {
      V(e), (l = !1);
    },
    d(a) {
      e && e.d(a), a && f(t);
    },
  };
}
function xt(i) {
  let t,
    l,
    e = JSON.parse(i[32].content).picture,
    a,
    s,
    r,
    n,
    o = JSON.parse(i[32].content).display_name + '',
    u,
    h,
    g,
    $,
    b,
    A,
    C = JSON.parse(i[32].content).name + '',
    k,
    P,
    O,
    R,
    K = new Date(i[31].created_at * 1e3).toLocaleString() + '',
    se,
    ue,
    ne,
    H,
    L,
    G,
    ie,
    ge,
    M = e && ot(i);
  function ke() {
    return i[15](i[32], i[31]);
  }
  function N() {
    return i[16](i[31]);
  }
  let y = i[31].tags.length > 0 && st(i);
  return (
    (L = new jt({ props: { text: i[31].content, tag: i[31].tags } })),
    {
      c() {
        (t = p('div')),
          (l = p('div')),
          M && M.c(),
          (a = S()),
          (s = p('div')),
          (r = p('div')),
          (n = p('div')),
          (u = E(o)),
          (h = S()),
          (g = p('div')),
          ($ = p('button')),
          (b = E('@')),
          (A = p('u')),
          (k = E(C)),
          (P = S()),
          (O = p('div')),
          (R = p('button')),
          (se = E(K)),
          (ue = S()),
          y && y.c(),
          (ne = S()),
          (H = p('div')),
          te(L.$$.fragment),
          this.h();
      },
      l(U) {
        t = _(U, 'DIV', { class: !0 });
        var B = m(t);
        l = _(B, 'DIV', { class: !0 });
        var Z = m(l);
        M && M.l(Z), Z.forEach(f), (a = T(B)), (s = _(B, 'DIV', { class: !0 }));
        var W = m(s);
        r = _(W, 'DIV', { class: !0 });
        var x = m(r);
        n = _(x, 'DIV', { class: !0 });
        var X = m(n);
        (u = w(X, o)),
          X.forEach(f),
          (h = T(x)),
          (g = _(x, 'DIV', { class: !0 }));
        var fe = m(g);
        $ = _(fe, 'BUTTON', { class: !0 });
        var be = m($);
        (b = w(be, '@')), (A = _(be, 'U', {}));
        var he = m(A);
        (k = w(he, C)),
          he.forEach(f),
          be.forEach(f),
          fe.forEach(f),
          (P = T(x)),
          (O = _(x, 'DIV', { class: !0 }));
        var $e = m(O);
        R = _($e, 'BUTTON', { class: !0 });
        var ce = m(R);
        (se = w(ce, K)),
          ce.forEach(f),
          $e.forEach(f),
          x.forEach(f),
          (ue = T(W)),
          y && y.l(W),
          (ne = T(W)),
          (H = _(W, 'DIV', { class: !0 }));
        var Q = m(H);
        le(L.$$.fragment, Q),
          Q.forEach(f),
          W.forEach(f),
          B.forEach(f),
          this.h();
      },
      h() {
        d(
          l,
          'class',
          'w-12 h-12 rounded-full flex justify-center overflow-hidden bg-surface-500/25 mt-1',
        ),
          d(n, 'class', 'font-bold wi truncate'),
          d($, 'class', 'text-emerald-800 text-sm'),
          d(g, 'class', 'truncate wid min-w-[2em]'),
          d(R, 'class', 'text-sm underline decoration-emerald-500'),
          d(O, 'class', 'place-self-end min-w-max'),
          d(r, 'class', 'w-full grid grid-cols-[auto_1fr_auto] gap-1'),
          d(H, 'class', 'parent-container break-all whitespace-pre-wrap'),
          d(
            s,
            'class',
            'grid grid-rows-[auto_auto_auto] gap-0 break-all w-full',
          ),
          d(t, 'class', 'grid grid-cols-[auto_1fr] gap-1');
      },
      m(U, B) {
        D(U, t, B),
          c(t, l),
          M && M.m(l, null),
          c(t, a),
          c(t, s),
          c(s, r),
          c(r, n),
          c(n, u),
          c(r, h),
          c(r, g),
          c(g, $),
          c($, b),
          c($, A),
          c(A, k),
          c(r, P),
          c(r, O),
          c(O, R),
          c(R, se),
          c(s, ue),
          y && y.m(s, null),
          c(s, ne),
          c(s, H),
          ae(L, H, null),
          (G = !0),
          ie || ((ge = [ye($, 'click', ke), ye(R, 'click', N)]), (ie = !0));
      },
      p(U, B) {
        (i = U),
          B[1] & 2 && (e = JSON.parse(i[32].content).picture),
          e
            ? M
              ? M.p(i, B)
              : ((M = ot(i)), M.c(), M.m(l, null))
            : M && (M.d(1), (M = null)),
          (!G || B[1] & 2) &&
            o !== (o = JSON.parse(i[32].content).display_name + '') &&
            Y(u, o),
          (!G || B[1] & 2) &&
            C !== (C = JSON.parse(i[32].content).name + '') &&
            Y(k, C),
          (!G || B[1] & 1) &&
            K !==
              (K = new Date(i[31].created_at * 1e3).toLocaleString() + '') &&
            Y(se, K),
          i[31].tags.length > 0
            ? y
              ? (y.p(i, B), B[1] & 1 && I(y, 1))
              : ((y = st(i)), y.c(), I(y, 1), y.m(s, ne))
            : y &&
              (_e(),
              V(y, 1, 1, () => {
                y = null;
              }),
              pe());
        const Z = {};
        B[1] & 1 && (Z.text = i[31].content),
          B[1] & 1 && (Z.tag = i[31].tags),
          L.$set(Z);
      },
      i(U) {
        G || (I(y), I(L.$$.fragment, U), (G = !0));
      },
      o(U) {
        V(y), V(L.$$.fragment, U), (G = !1);
      },
      d(U) {
        U && f(t), M && M.d(), y && y.d(), re(L), (ie = !1), ft(ge);
      },
    }
  );
}
function el(i) {
  let t,
    l,
    e,
    a = i[28][1] + '',
    s,
    r;
  return {
    c() {
      (t = p('div')),
        (l = p('p')),
        (e = E('Loading note... (')),
        (s = E(a)),
        (r = E(')')),
        this.h();
    },
    l(n) {
      t = _(n, 'DIV', { slot: !0 });
      var o = m(t);
      l = _(o, 'P', { class: !0 });
      var u = m(l);
      (e = w(u, 'Loading note... (')),
        (s = w(u, a)),
        (r = w(u, ')')),
        u.forEach(f),
        o.forEach(f),
        this.h();
    },
    h() {
      d(l, 'class', 'break-all'), d(t, 'slot', 'loading');
    },
    m(n, o) {
      D(n, t, o), c(t, l), c(l, e), c(l, s), c(l, r);
    },
    p(n, o) {
      o[0] & 16 && a !== (a = n[28][1] + '') && Y(s, a);
    },
    d(n) {
      n && f(t);
    },
  };
}
function tl(i) {
  let t,
    l,
    e,
    a = i[28][1] + '',
    s,
    r;
  return {
    c() {
      (t = p('div')),
        (l = p('p')),
        (e = E('Failed to get note (')),
        (s = E(a)),
        (r = E(')')),
        this.h();
    },
    l(n) {
      t = _(n, 'DIV', { slot: !0 });
      var o = m(t);
      l = _(o, 'P', { class: !0 });
      var u = m(l);
      (e = w(u, 'Failed to get note (')),
        (s = w(u, a)),
        (r = w(u, ')')),
        u.forEach(f),
        o.forEach(f),
        this.h();
    },
    h() {
      d(l, 'class', 'break-all'), d(t, 'slot', 'error');
    },
    m(n, o) {
      D(n, t, o), c(t, l), c(l, e), c(l, s), c(l, r);
    },
    p(n, o) {
      o[0] & 16 && a !== (a = n[28][1] + '') && Y(s, a);
    },
    d(n) {
      n && f(t);
    },
  };
}
function ll(i) {
  let t,
    l,
    e,
    a = i[28][1] + '',
    s,
    r;
  return {
    c() {
      (t = p('div')),
        (l = p('p')),
        (e = E('Note not found (')),
        (s = E(a)),
        (r = E(')')),
        this.h();
    },
    l(n) {
      t = _(n, 'DIV', { slot: !0 });
      var o = m(t);
      l = _(o, 'P', { class: !0 });
      var u = m(l);
      (e = w(u, 'Note not found (')),
        (s = w(u, a)),
        (r = w(u, ')')),
        u.forEach(f),
        o.forEach(f),
        this.h();
    },
    h() {
      d(l, 'class', 'break-all'), d(t, 'slot', 'nodata');
    },
    m(n, o) {
      D(n, t, o), c(t, l), c(l, e), c(l, s), c(l, r);
    },
    p(n, o) {
      o[0] & 16 && a !== (a = n[28][1] + '') && Y(s, a);
    },
    d(n) {
      n && f(t);
    },
  };
}
function al(i) {
  let t, l;
  return (
    (t = new ht({
      props: {
        queryKey: ['metadata', i[31].pubkey],
        pubkey: i[31].pubkey,
        $$slots: {
          nodata: [
            ll,
            ({ metadata: e }) => ({ 32: e }),
            ({ metadata: e }) => [0, e ? 2 : 0],
          ],
          error: [
            tl,
            ({ metadata: e }) => ({ 32: e }),
            ({ metadata: e }) => [0, e ? 2 : 0],
          ],
          loading: [
            el,
            ({ metadata: e }) => ({ 32: e }),
            ({ metadata: e }) => [0, e ? 2 : 0],
          ],
          default: [
            xt,
            ({ metadata: e }) => ({ 32: e }),
            ({ metadata: e }) => [0, e ? 2 : 0],
          ],
        },
        $$scope: { ctx: i },
      },
    })),
    {
      c() {
        te(t.$$.fragment);
      },
      l(e) {
        le(t.$$.fragment, e);
      },
      m(e, a) {
        ae(t, e, a), (l = !0);
      },
      p(e, a) {
        const s = {};
        a[1] & 1 && (s.queryKey = ['metadata', e[31].pubkey]),
          a[1] & 1 && (s.pubkey = e[31].pubkey),
          (a[0] & 16) | (a[1] & 2051) && (s.$$scope = { dirty: a, ctx: e }),
          t.$set(s);
      },
      i(e) {
        l || (I(t.$$.fragment, e), (l = !0));
      },
      o(e) {
        V(t.$$.fragment, e), (l = !1);
      },
      d(e) {
        re(t, e);
      },
    }
  );
}
function rl(i) {
  let t,
    l,
    e,
    a = i[28][1] + '',
    s,
    r;
  return {
    c() {
      (t = p('div')),
        (l = p('p')),
        (e = E('Loading note... (')),
        (s = E(a)),
        (r = E(')')),
        this.h();
    },
    l(n) {
      t = _(n, 'DIV', { slot: !0 });
      var o = m(t);
      l = _(o, 'P', { class: !0 });
      var u = m(l);
      (e = w(u, 'Loading note... (')),
        (s = w(u, a)),
        (r = w(u, ')')),
        u.forEach(f),
        o.forEach(f),
        this.h();
    },
    h() {
      d(l, 'class', 'break-all'), d(t, 'slot', 'loading');
    },
    m(n, o) {
      D(n, t, o), c(t, l), c(l, e), c(l, s), c(l, r);
    },
    p(n, o) {
      o[0] & 16 && a !== (a = n[28][1] + '') && Y(s, a);
    },
    d(n) {
      n && f(t);
    },
  };
}
function ol(i) {
  let t,
    l,
    e,
    a = i[28][1] + '',
    s,
    r;
  return {
    c() {
      (t = p('div')),
        (l = p('p')),
        (e = E('Failed to get note (')),
        (s = E(a)),
        (r = E(')')),
        this.h();
    },
    l(n) {
      t = _(n, 'DIV', { slot: !0 });
      var o = m(t);
      l = _(o, 'P', { class: !0 });
      var u = m(l);
      (e = w(u, 'Failed to get note (')),
        (s = w(u, a)),
        (r = w(u, ')')),
        u.forEach(f),
        o.forEach(f),
        this.h();
    },
    h() {
      d(l, 'class', 'break-all'), d(t, 'slot', 'error');
    },
    m(n, o) {
      D(n, t, o), c(t, l), c(l, e), c(l, s), c(l, r);
    },
    p(n, o) {
      o[0] & 16 && a !== (a = n[28][1] + '') && Y(s, a);
    },
    d(n) {
      n && f(t);
    },
  };
}
function sl(i) {
  let t,
    l,
    e,
    a = i[28][1] + '',
    s,
    r;
  return {
    c() {
      (t = p('div')),
        (l = p('p')),
        (e = E('Note not found (')),
        (s = E(a)),
        (r = E(')')),
        this.h();
    },
    l(n) {
      t = _(n, 'DIV', { slot: !0 });
      var o = m(t);
      l = _(o, 'P', { class: !0 });
      var u = m(l);
      (e = w(u, 'Note not found (')),
        (s = w(u, a)),
        (r = w(u, ')')),
        u.forEach(f),
        o.forEach(f),
        this.h();
    },
    h() {
      d(l, 'class', 'break-all'), d(t, 'slot', 'nodata');
    },
    m(n, o) {
      D(n, t, o), c(t, l), c(l, e), c(l, s), c(l, r);
    },
    p(n, o) {
      o[0] & 16 && a !== (a = n[28][1] + '') && Y(s, a);
    },
    d(n) {
      n && f(t);
    },
  };
}
function ct(i) {
  let t, l, e, a;
  const s = [Yt, Xt],
    r = [];
  function n(o, u) {
    return o[28][0] === 'e' ? 0 : o[28][0] !== 'd' ? 1 : -1;
  }
  return (
    ~(t = n(i)) && (l = r[t] = s[t](i)),
    {
      c() {
        l && l.c(), (e = oe());
      },
      l(o) {
        l && l.l(o), (e = oe());
      },
      m(o, u) {
        ~t && r[t].m(o, u), D(o, e, u), (a = !0);
      },
      p(o, u) {
        let h = t;
        (t = n(o)),
          t === h
            ? ~t && r[t].p(o, u)
            : (l &&
                (_e(),
                V(r[h], 1, 1, () => {
                  r[h] = null;
                }),
                pe()),
              ~t
                ? ((l = r[t]),
                  l ? l.p(o, u) : ((l = r[t] = s[t](o)), l.c()),
                  I(l, 1),
                  l.m(e.parentNode, e))
                : (l = null));
      },
      i(o) {
        a || (I(l), (a = !0));
      },
      o(o) {
        V(l), (a = !1);
      },
      d(o) {
        ~t && r[t].d(o), o && f(e);
      },
    }
  );
}
function nl(i) {
  let t,
    l,
    e = i[4] && at(i);
  return {
    c() {
      e && e.c(), (t = oe());
    },
    l(a) {
      e && e.l(a), (t = oe());
    },
    m(a, s) {
      e && e.m(a, s), D(a, t, s), (l = !0);
    },
    p(a, s) {
      a[4]
        ? e
          ? (e.p(a, s), s[0] & 16 && I(e, 1))
          : ((e = at(a)), e.c(), I(e, 1), e.m(t.parentNode, t))
        : e &&
          (_e(),
          V(e, 1, 1, () => {
            e = null;
          }),
          pe());
    },
    i(a) {
      l || (I(e), (l = !0));
    },
    o(a) {
      V(e), (l = !1);
    },
    d(a) {
      e && e.d(a), a && f(t);
    },
  };
}
function ut(i) {
  let t, l, e;
  return (
    (l = new Nt({
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
        (t = p('div')), te(l.$$.fragment), this.h();
      },
      l(a) {
        t = _(a, 'DIV', { class: !0 });
        var s = m(t);
        le(l.$$.fragment, s), s.forEach(f), this.h();
      },
      h() {
        d(t, 'class', 'fixed bottom-2 right-2');
      },
      m(a, s) {
        D(a, t, s), ae(l, t, null), (e = !0);
      },
      i(a) {
        e || (I(l.$$.fragment, a), (e = !0));
      },
      o(a) {
        V(l.$$.fragment, a), (e = !1);
      },
      d(a) {
        a && f(t), re(l);
      },
    }
  );
}
function il(i) {
  let t,
    l,
    e,
    a,
    s,
    r,
    n,
    o,
    u,
    h,
    g,
    $,
    b,
    A = Te.npubEncode(i[6]) + '',
    C,
    k,
    P,
    O,
    R,
    K,
    se,
    ue,
    ne,
    H,
    L,
    G,
    ie,
    ge,
    M,
    ke,
    N,
    y,
    U,
    B,
    Z,
    W,
    x,
    X,
    fe,
    be,
    he,
    $e,
    ce,
    Q,
    ee,
    Ne,
    me,
    Ve,
    Pe,
    Fe;
  r = new At({});
  let Ee = i[7],
    z = [];
  for (let v = 0; v < Ee.length; v += 1) z[v] = tt(et(i, Ee, v));
  const je = [qt, Ut, Lt],
    ve = [];
  function Je(v, F) {
    return v[2] ? (v[1] ? 1 : 2) : 0;
  }
  (Q = Je(i)), (ee = ve[Q] = je[Q](i));
  let q = i[5] && ut();
  return {
    c() {
      (t = p('meta')),
        (l = p('meta')),
        (e = p('meta')),
        (a = p('meta')),
        (s = S()),
        te(r.$$.fragment),
        (n = S()),
        (o = p('div')),
        (u = p('div')),
        (h = p('p')),
        (g = E('【pubkey】')),
        ($ = S()),
        (b = p('p')),
        (C = E(A)),
        (k = S()),
        (P = p('p')),
        (O = E('【relays】')),
        (R = S()),
        (K = p('ul'));
      for (let v = 0; v < z.length; v += 1) z[v].c();
      (se = S()),
        (ue = p('hr')),
        (ne = S()),
        (H = p('div')),
        (L = p('ul')),
        (G = p('li')),
        (ie = p('span')),
        (ge = E('🐥')),
        (M = E(' Nostrで共有する')),
        (ke = S()),
        (N = p('li')),
        (y = p('span')),
        (U = E('🔗')),
        (B = E(' 外部アプリで開く')),
        (Z = S()),
        (W = p('hr')),
        (x = S()),
        (X = p('button')),
        (fe = E('Go back to Setup')),
        (be = S()),
        (he = p('div')),
        ($e = S()),
        (ce = p('main')),
        ee.c(),
        (Ne = S()),
        (me = p('div')),
        q && q.c(),
        this.h();
    },
    l(v) {
      const F = bt('svelte-hcwecr', document.head);
      (t = _(F, 'META', { prefix: !0 })),
        (l = _(F, 'META', { property: !0, content: !0 })),
        (e = _(F, 'META', { property: !0, content: !0 })),
        (a = _(F, 'META', { property: !0, content: !0 })),
        F.forEach(f),
        (s = T(v)),
        le(r.$$.fragment, v),
        (n = T(v)),
        (o = _(v, 'DIV', { class: !0, 'data-popup': !0 }));
      var j = m(o);
      u = _(j, 'DIV', {});
      var J = m(u);
      h = _(J, 'P', {});
      var De = m(h);
      (g = w(De, '【pubkey】')), De.forEach(f), ($ = T(J)), (b = _(J, 'P', {}));
      var Le = m(b);
      (C = w(Le, A)), Le.forEach(f), (k = T(J)), (P = _(J, 'P', { class: !0 }));
      var Ue = m(P);
      (O = w(Ue, '【relays】')),
        Ue.forEach(f),
        (R = T(J)),
        (K = _(J, 'UL', { class: !0 }));
      var qe = m(K);
      for (let Ce = 0; Ce < z.length; Ce += 1) z[Ce].l(qe);
      qe.forEach(f),
        J.forEach(f),
        (se = T(j)),
        (ue = _(j, 'HR', { class: !0 })),
        (ne = T(j)),
        (H = _(j, 'DIV', { class: !0 }));
      var Re = m(H);
      L = _(Re, 'UL', { class: !0 });
      var Se = m(L);
      G = _(Se, 'LI', { class: !0 });
      var Be = m(G);
      ie = _(Be, 'SPAN', { class: !0 });
      var Ke = m(ie);
      (ge = w(Ke, '🐥')),
        Ke.forEach(f),
        (M = w(Be, ' Nostrで共有する')),
        Be.forEach(f),
        (ke = T(Se)),
        (N = _(Se, 'LI', { class: !0 }));
      var Oe = m(N);
      y = _(Oe, 'SPAN', { class: !0 });
      var ze = m(y);
      (U = w(ze, '🔗')),
        ze.forEach(f),
        (B = w(Oe, ' 外部アプリで開く')),
        Oe.forEach(f),
        Se.forEach(f),
        Re.forEach(f),
        (Z = T(j)),
        (W = _(j, 'HR', { class: !0 })),
        (x = T(j)),
        (X = _(j, 'BUTTON', { type: !0, class: !0 }));
      var Ge = m(X);
      (fe = w(Ge, 'Go back to Setup')),
        Ge.forEach(f),
        (be = T(j)),
        (he = _(j, 'DIV', { class: !0 })),
        m(he).forEach(f),
        j.forEach(f),
        ($e = T(v)),
        (ce = _(v, 'MAIN', { class: !0 }));
      var He = m(ce);
      ee.l(He), He.forEach(f), (Ne = T(v)), (me = _(v, 'DIV', { class: !0 }));
      var Qe = m(me);
      q && q.l(Qe), Qe.forEach(f), this.h();
    },
    h() {
      d(t, 'prefix', 'og: https://ogp.me/ns#'),
        d(l, 'property', 'og:title'),
        d(l, 'content', 'nostr-bookmark-viewer3'),
        d(e, 'property', 'og:description'),
        d(e, 'content', 'naddr:id:' + i[8] + ',pubkey:' + i[6]),
        d(a, 'property', 'og:image'),
        d(a, 'content', 'https://nostr-bookmark-viewer3.vercel.app/img2.png'),
        d(P, 'class', 'mt-2'),
        d(K, 'class', 'list-disc'),
        d(ue, 'class', '!border-t-2 my-1'),
        d(ie, 'class', 'btn variant-filled p-0 w-5'),
        d(G, 'class', 'ml-4'),
        d(y, 'class', 'btn variant-filled p-0 w-5'),
        d(N, 'class', 'ml-4'),
        d(L, 'class', 'list-disc'),
        d(H, 'class', 'text-sm'),
        d(W, 'class', '!border-t-2 my-1'),
        d(X, 'type', 'button'),
        d(X, 'class', 'btn variant-filled py-1'),
        d(he, 'class', 'arrow bg-surface-100-800-token'),
        d(o, 'class', 'card p-4 w-72 shadow-xl z-20 break-all'),
        d(o, 'data-popup', 'popupFeatured'),
        d(ce, 'class', 'container max-w-5xl px-1 mt-24 mb-12'),
        d(me, 'class', 'container max-w-5xl mx-auto z-10');
    },
    m(v, F) {
      c(document.head, t),
        c(document.head, l),
        c(document.head, e),
        c(document.head, a),
        D(v, s, F),
        ae(r, v, F),
        D(v, n, F),
        D(v, o, F),
        c(o, u),
        c(u, h),
        c(h, g),
        c(u, $),
        c(u, b),
        c(b, C),
        c(u, k),
        c(u, P),
        c(P, O),
        c(u, R),
        c(u, K);
      for (let j = 0; j < z.length; j += 1) z[j] && z[j].m(K, null);
      c(o, se),
        c(o, ue),
        c(o, ne),
        c(o, H),
        c(H, L),
        c(L, G),
        c(G, ie),
        c(ie, ge),
        c(G, M),
        c(L, ke),
        c(L, N),
        c(N, y),
        c(y, U),
        c(N, B),
        c(o, Z),
        c(o, W),
        c(o, x),
        c(o, X),
        c(X, fe),
        c(o, be),
        c(o, he),
        D(v, $e, F),
        D(v, ce, F),
        ve[Q].m(ce, null),
        D(v, Ne, F),
        D(v, me, F),
        q && q.m(me, null),
        (Ve = !0),
        Pe || ((Fe = ye(X, 'click', i[13])), (Pe = !0));
    },
    p(v, F) {
      if (F[0] & 128) {
        Ee = v[7];
        let J;
        for (J = 0; J < Ee.length; J += 1) {
          const De = et(v, Ee, J);
          z[J] ? z[J].p(De, F) : ((z[J] = tt(De)), z[J].c(), z[J].m(K, null));
        }
        for (; J < z.length; J += 1) z[J].d(1);
        z.length = Ee.length;
      }
      let j = Q;
      (Q = Je(v)),
        Q === j
          ? ve[Q].p(v, F)
          : (_e(),
            V(ve[j], 1, 1, () => {
              ve[j] = null;
            }),
            pe(),
            (ee = ve[Q]),
            ee ? ee.p(v, F) : ((ee = ve[Q] = je[Q](v)), ee.c()),
            I(ee, 1),
            ee.m(ce, null)),
        v[5]
          ? q
            ? F[0] & 32 && I(q, 1)
            : ((q = ut()), q.c(), I(q, 1), q.m(me, null))
          : q &&
            (_e(),
            V(q, 1, 1, () => {
              q = null;
            }),
            pe());
    },
    i(v) {
      Ve || (I(r.$$.fragment, v), I(ee), I(q), (Ve = !0));
    },
    o(v) {
      V(r.$$.fragment, v), V(ee), V(q), (Ve = !1);
    },
    d(v) {
      f(t),
        f(l),
        f(e),
        f(a),
        v && f(s),
        re(r, v),
        v && f(n),
        v && f(o),
        Ae(z, v),
        v && f($e),
        v && f(ce),
        ve[Q].d(),
        v && f(Ne),
        v && f(me),
        q && q.d(),
        (Pe = !1),
        Fe();
    },
  };
}
let cl = 0;
function ul(i, t, l) {
  let e, a;
  We(i, we, (N) => l(5, (e = N))), We(i, Dt, (N) => l(20, (a = N)));
  const { type: s, data: r } = Te.decode(a.params.naddr);
  let n,
    o = !1;
  const {
    pubkey: u,
    relays: h,
    identifier: g,
    kind: $,
  } = s === 'naddr' && r.relays
    ? {
        pubkey: r.pubkey,
        relays: r.relays.length > 0 ? r.relays : dt,
        identifier: r.identifier,
        kind: r.kind,
      }
    : { pubkey: '', relays: [], identifier: '', kind: 30001 };
  console.log(u, h, g, $),
    $ !== 30001 &&
      ((n = 'ブクマのnaddrじゃないかも'),
      console.log('ブクマのnaddrじゃないかも'));
  const b = [{ authors: [u], kinds: [$], '#d': [g] }];
  let A,
    C = 'pub',
    k;
  $t(async () => {
    if ((Ie(we, (e = !0), e), u !== '' || h.length > 0)) {
      if ((l(2, (A = await It(h, b))), console.log(A), A.length === 0)) {
        l(1, (o = !0)),
          l(0, (n = 'ブクマなんもないかも')),
          console.log('ブクマなんもないかも'),
          Ie(we, (e = !1), e);
        return;
      }
      l(4, (k = A[0].tags)), Ie(we, (e = !1), e);
    }
  });
  const P = { event: 'click', target: 'popupFeatured', placement: 'bottom' },
    O = {
      ref: Ct,
      props: { background: 'bg-red-500' },
      slot: '<p>Skeleton</p>',
    };
  function R(N, y) {
    console.log(N);
    const U = {
      type: 'component',
      value: { metadata: N, pubkey: y },
      component: O,
    };
    Me.trigger(U);
  }
  const K = {
    ref: Mt,
    props: { background: 'bg-red-500' },
    slot: '<p>Skeleton</p>',
  };
  function se(N) {
    console.log('click');
    const y = {
      type: 'component',
      title: 'Event Json',
      value: { note: N },
      component: K,
    };
    Me.trigger(y);
  }
  const ue = {
    ref: Ot,
    props: { background: 'bg-red-500' },
    slot: '<p>Skeleton</p>',
  };
  function ne(N) {
    console.log('quote');
    const y = [N],
      U = {
        type: 'component',
        component: ue,
        title: 'postNote',
        body: 'NIP-07のpreferred relaysのwriteに設定されているリレーにポストします。',
        value: {
          content: `\r
nostr:${Te.noteEncode(N[1])}\r
`,
          tags: y,
        },
        response: async (B) => {
          if ((console.log(B), B)) {
            Ie(we, (e = !0), e);
            const Z = {
                id: '',
                pubkey: await window.nostr.getPublicKey(),
                created_at: Math.floor(Date.now() / 1e3),
                kind: 1,
                tags: y,
                content: B.content,
                sig: '',
              },
              W = await window.nostr.getRelays(),
              x = Object.keys(W).filter((fe) => W[fe].write === !0),
              X = await Vt(Z, x);
            if (X) {
              const fe = { message: X.msg.join('<br>'), timeout: 3e3 };
              St.trigger(fe);
            }
            Ie(we, (e = !1), e);
          }
        },
      };
    Me.trigger(U);
  }
  const H = () => Tt(window.location.origin);
  function L(N) {
    (C = N), l(3, C);
  }
  return [
    n,
    o,
    A,
    C,
    k,
    e,
    u,
    h,
    g,
    P,
    R,
    se,
    ne,
    H,
    L,
    (N, y) => {
      R(N, y.pubkey);
    },
    (N) => {
      se(N);
    },
    (N, y) => {
      R(N, y[1]);
    },
    (N) => ne(N),
    (N) => {
      window.open('https://nostr.com/' + Te.noteEncode(N[1]), '_blank');
    },
  ];
}
class vl extends mt {
  constructor(t) {
    super(), vt(this, t, ul, il, gt, {}, null, [-1, -1]);
  }
}
export { vl as component };
