import {
  S as _t,
  i as bt,
  s as vt,
  y as Je,
  a as g,
  k as u,
  q as y,
  e as ke,
  z as Qe,
  c as E,
  l as c,
  m,
  r as k,
  h as s,
  n as i,
  A as Xe,
  b as w,
  F as t,
  M as ye,
  N as le,
  g as se,
  v as yt,
  d as ne,
  f as kt,
  B as Ye,
  O as gt,
  o as Et,
  P as wt,
  u as Nt,
  D as Pt,
  K as It,
} from '../chunks/index.e81ade4b.js';
import {
  n as ct,
  P as Tt,
  t as Q,
  d as At,
  g as xt,
} from '../chunks/navigation.928c82b4.js';
import '../chunks/ProgressBar.svelte_svelte_type_style_lang.0751fc73.js';
import { T as Rt } from '../chunks/Toast.4359ca3d.js';
function ft(d, a, r) {
  const o = d.slice();
  return (o[12] = a[r]), (o[14] = r), o;
}
function pt(d) {
  let a,
    r = d[1],
    o = [];
  for (let l = 0; l < r.length; l += 1) o[l] = dt(ft(d, r, l));
  return {
    c() {
      for (let l = 0; l < o.length; l += 1) o[l].c();
      a = ke();
    },
    l(l) {
      for (let f = 0; f < o.length; f += 1) o[f].l(l);
      a = ke();
    },
    m(l, f) {
      for (let n = 0; n < o.length; n += 1) o[n] && o[n].m(l, f);
      w(l, a, f);
    },
    p(l, f) {
      if (f & 66) {
        r = l[1];
        let n;
        for (n = 0; n < r.length; n += 1) {
          const p = ft(l, r, n);
          o[n]
            ? o[n].p(p, f)
            : ((o[n] = dt(p)), o[n].c(), o[n].m(a.parentNode, a));
        }
        for (; n < o.length; n += 1) o[n].d(1);
        o.length = r.length;
      }
    },
    d(l) {
      wt(o, l), l && s(a);
    },
  };
}
function dt(d) {
  let a,
    r,
    o,
    l,
    f = d[12] + '',
    n,
    p,
    T,
    x,
    N;
  function S() {
    return d[10](d[14]);
  }
  return {
    c() {
      (a = u('li')),
        (r = u('button')),
        (o = y('delete')),
        (l = g()),
        (n = y(f)),
        (p = g()),
        this.h();
    },
    l(b) {
      a = c(b, 'LI', { class: !0 });
      var h = m(a);
      r = c(h, 'BUTTON', { class: !0 });
      var R = m(r);
      (o = k(R, 'delete')),
        R.forEach(s),
        (l = E(h)),
        (n = k(h, f)),
        (p = E(h)),
        h.forEach(s),
        this.h();
    },
    h() {
      i(r, 'class', 'py-1 btn variant-filled-primary rounded-full'),
        (a.value = T = d[12]),
        i(a, 'class', 'pb-1 px-5');
    },
    m(b, h) {
      w(b, a, h),
        t(a, r),
        t(r, o),
        t(a, l),
        t(a, n),
        t(a, p),
        x || ((N = le(r, 'click', S)), (x = !0));
    },
    p(b, h) {
      (d = b),
        h & 2 && f !== (f = d[12] + '') && Nt(n, f),
        h & 2 && T !== (T = d[12]) && (a.value = T);
    },
    d(b) {
      b && s(a), (x = !1), N();
    },
  };
}
function mt(d) {
  let a, r, o;
  return (
    (r = new Tt({
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
        (a = u('div')), Je(r.$$.fragment), this.h();
      },
      l(l) {
        a = c(l, 'DIV', { class: !0 });
        var f = m(a);
        Qe(r.$$.fragment, f), f.forEach(s), this.h();
      },
      h() {
        i(a, 'class', 'block fixed bottom-2 right-2');
      },
      m(l, f) {
        w(l, a, f), Xe(r, a, null), (o = !0);
      },
      i(l) {
        o || (se(r.$$.fragment, l), (o = !0));
      },
      o(l) {
        ne(r.$$.fragment, l), (o = !1);
      },
      d(l) {
        l && s(a), Ye(r);
      },
    }
  );
}
function Ut(d) {
  let a,
    r,
    o,
    l,
    f,
    n,
    p,
    T,
    x,
    N,
    S,
    b,
    h,
    R,
    v,
    U,
    I,
    D,
    B,
    X,
    ge,
    Ee,
    j,
    F,
    we,
    Ne,
    Pe,
    Ie,
    M,
    Te,
    Y,
    Ae,
    ie,
    C,
    G,
    Z,
    xe,
    Re,
    $,
    Ue,
    Se,
    Be,
    H,
    L,
    Le,
    W,
    De,
    Ce,
    q,
    Ve,
    ue,
    O,
    Me,
    ce,
    fe,
    pe,
    V,
    Fe,
    z,
    Oe,
    je,
    Ge,
    He,
    K,
    qe,
    de,
    ee,
    oe,
    ze,
    Ze;
  a = new Rt({});
  let A = d[1].length > 0 && pt(d),
    P = d[3] && mt();
  return {
    c() {
      Je(a.$$.fragment),
        (r = g()),
        (o = u('h4')),
        (l = y('はじめに')),
        (f = g()),
        (n = u('div')),
        (p = u('ul')),
        (T = u('li')),
        (x = u('span')),
        (N = u('span')),
        (S = y('kind:30001に保存されているリストを取得、表示します。')),
        (b = g()),
        (h = u('li')),
        (R = u('span')),
        (v = g()),
        (U = u('span')),
        (I = y(
          'ブックマークを取得する公開鍵を設定し、接続するリレーをリレーリストに追加してください。',
        )),
        (D = g()),
        (B = u('div')),
        (X = u('p')),
        (ge = y('公開鍵(public key)')),
        (Ee = g()),
        (j = u('div')),
        (F = u('button')),
        (we = y('use NIP-07 ')),
        (Ne = u('br')),
        (Pe = y('Extension')),
        (Ie = g()),
        (M = u('input')),
        (Te = g()),
        (Y = u('div')),
        (Ae = y(`※use NIP-07 Extension:
    拡張機能に有効なリレー(write)を設定している場合リレーリストを上書きします`)),
        (ie = g()),
        (C = u('div')),
        (G = u('p')),
        (Z = u('span')),
        (xe = y('リレー(relay)')),
        (Re = y(`
    URLを入力したら`)),
        ($ = u('span')),
        (Ue = y('add relay')),
        (Se = y('をクリックしてください')),
        (Be = g()),
        (H = u('div')),
        (L = u('input')),
        (Le = g()),
        (W = u('button')),
        (De = y('add relay')),
        (Ce = g()),
        (q = u('ul')),
        (Ve = y(`リレーリスト
    `)),
        A && A.c(),
        (ue = g()),
        (O = u('button')),
        (Me = y('Next →')),
        (ce = g()),
        (fe = u('hr')),
        (pe = g()),
        (V = u('div')),
        (Fe = y('Github: ')),
        (z = u('a')),
        (Oe = y('TsukemonoGit/nostr-bookmark-viewer3')),
        (je = g()),
        (Ge = u('br')),
        (He = y(`
  Author:
  `)),
        (K = u('a')),
        (qe = y('mono(Nostr)')),
        (de = g()),
        P && P.c(),
        (ee = ke()),
        this.h();
    },
    l(e) {
      Qe(a.$$.fragment, e), (r = E(e)), (o = c(e, 'H4', { class: !0 }));
      var _ = m(o);
      (l = k(_, 'はじめに')),
        _.forEach(s),
        (f = E(e)),
        (n = c(e, 'DIV', { class: !0 }));
      var $e = m(n);
      p = c($e, 'UL', { class: !0 });
      var me = m(p);
      T = c(me, 'LI', {});
      var Ke = m(T);
      (x = c(Ke, 'SPAN', { class: !0 })),
        m(x).forEach(s),
        (N = c(Ke, 'SPAN', {}));
      var et = m(N);
      (S = k(et, 'kind:30001に保存されているリストを取得、表示します。')),
        et.forEach(s),
        Ke.forEach(s),
        (b = E(me)),
        (h = c(me, 'LI', {}));
      var he = m(h);
      (R = c(he, 'SPAN', { class: !0 })),
        m(R).forEach(s),
        (v = E(he)),
        (U = c(he, 'SPAN', {}));
      var tt = m(U);
      (I = k(
        tt,
        'ブックマークを取得する公開鍵を設定し、接続するリレーをリレーリストに追加してください。',
      )),
        tt.forEach(s),
        he.forEach(s),
        me.forEach(s),
        $e.forEach(s),
        (D = E(e)),
        (B = c(e, 'DIV', { class: !0 }));
      var te = m(B);
      X = c(te, 'P', { class: !0 });
      var rt = m(X);
      (ge = k(rt, '公開鍵(public key)')),
        rt.forEach(s),
        (Ee = E(te)),
        (j = c(te, 'DIV', { class: !0 }));
      var _e = m(j);
      F = c(_e, 'BUTTON', { class: !0 });
      var be = m(F);
      (we = k(be, 'use NIP-07 ')),
        (Ne = c(be, 'BR', {})),
        (Pe = k(be, 'Extension')),
        be.forEach(s),
        (Ie = E(_e)),
        (M = c(_e, 'INPUT', { type: !0, class: !0, placeholder: !0 })),
        _e.forEach(s),
        (Te = E(te)),
        (Y = c(te, 'DIV', { class: !0 }));
      var lt = m(Y);
      (Ae = k(
        lt,
        `※use NIP-07 Extension:
    拡張機能に有効なリレー(write)を設定している場合リレーリストを上書きします`,
      )),
        lt.forEach(s),
        te.forEach(s),
        (ie = E(e)),
        (C = c(e, 'DIV', { class: !0 }));
      var re = m(C);
      G = c(re, 'P', {});
      var ae = m(G);
      Z = c(ae, 'SPAN', { class: !0 });
      var st = m(Z);
      (xe = k(st, 'リレー(relay)')),
        st.forEach(s),
        (Re = k(
          ae,
          `
    URLを入力したら`,
        )),
        ($ = c(ae, 'SPAN', { class: !0 }));
      var ot = m($);
      (Ue = k(ot, 'add relay')),
        ot.forEach(s),
        (Se = k(ae, 'をクリックしてください')),
        ae.forEach(s),
        (Be = E(re)),
        (H = c(re, 'DIV', { class: !0 }));
      var ve = m(H);
      (L = c(ve, 'INPUT', { class: !0, type: !0, placeholder: !0 })),
        (Le = E(ve)),
        (W = c(ve, 'BUTTON', { class: !0 }));
      var at = m(W);
      (De = k(at, 'add relay')),
        at.forEach(s),
        ve.forEach(s),
        (Ce = E(re)),
        (q = c(re, 'UL', { class: !0 }));
      var We = m(q);
      (Ve = k(
        We,
        `リレーリスト
    `,
      )),
        A && A.l(We),
        We.forEach(s),
        re.forEach(s),
        (ue = E(e)),
        (O = c(e, 'BUTTON', { type: !0, class: !0 }));
      var nt = m(O);
      (Me = k(nt, 'Next →')),
        nt.forEach(s),
        (ce = E(e)),
        (fe = c(e, 'HR', {})),
        (pe = E(e)),
        (V = c(e, 'DIV', {}));
      var J = m(V);
      (Fe = k(J, 'Github: ')),
        (z = c(J, 'A', { href: !0, target: !0, rel: !0 }));
      var it = m(z);
      (Oe = k(it, 'TsukemonoGit/nostr-bookmark-viewer3')),
        it.forEach(s),
        (je = E(J)),
        (Ge = c(J, 'BR', {})),
        (He = k(
          J,
          `
  Author:
  `,
        )),
        (K = c(J, 'A', { href: !0, target: !0, rel: !0 }));
      var ut = m(K);
      (qe = k(ut, 'mono(Nostr)')),
        ut.forEach(s),
        J.forEach(s),
        (de = E(e)),
        P && P.l(e),
        (ee = ke()),
        this.h();
    },
    h() {
      i(o, 'class', 'h4'),
        i(x, 'class', 'badge bg-primary-500'),
        i(R, 'class', 'badge bg-primary-500'),
        i(p, 'class', 'list px-4'),
        i(n, 'class', 'py-2 border-solid border-2 border-surface-500/25 mx-4'),
        i(X, 'class', 'font-medium'),
        i(F, 'class', 'py-1 btn variant-filled-secondary'),
        i(M, 'type', 'text'),
        i(M, 'class', 'px-2 text-ellipsis'),
        i(M, 'placeholder', 'npub1...'),
        i(j, 'class', 'input-group input-group-divider grid-cols-[auto_1fr]'),
        i(Y, 'class', 'text-sm mx-8'),
        i(B, 'class', 'container my-4'),
        i(Z, 'class', 'font-medium mr-1'),
        i($, 'class', 'rounded-full variant-filled p-1 m-1'),
        i(L, 'class', 'px-2'),
        i(L, 'type', 'text'),
        i(L, 'placeholder', 'wss://...'),
        (L.disabled = d[3]),
        i(W, 'class', 'py-1 btn variant-filled'),
        i(
          H,
          'class',
          'relay input-group input-group-divider grid-cols-[1fr_auto] h-12',
        ),
        i(q, 'class', 'border-solid border-2 border-surface-500/25 mx-8 my-1'),
        i(C, 'class', 'container py-4'),
        i(O, 'type', 'button'),
        i(O, 'class', 'btn variant-filled-secondary rounded-full my-5'),
        i(z, 'href', 'https://github.com/TsukemonoGit/nostr-bookmark-viewer3'),
        i(z, 'target', '_blank'),
        i(z, 'rel', 'noopener noreferrer'),
        i(
          K,
          'href',
          'https://nostx.shino3.net/npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw',
        ),
        i(K, 'target', '_blank'),
        i(K, 'rel', 'noopener noreferrer');
    },
    m(e, _) {
      Xe(a, e, _),
        w(e, r, _),
        w(e, o, _),
        t(o, l),
        w(e, f, _),
        w(e, n, _),
        t(n, p),
        t(p, T),
        t(T, x),
        t(T, N),
        t(N, S),
        t(p, b),
        t(p, h),
        t(h, R),
        t(h, v),
        t(h, U),
        t(U, I),
        w(e, D, _),
        w(e, B, _),
        t(B, X),
        t(X, ge),
        t(B, Ee),
        t(B, j),
        t(j, F),
        t(F, we),
        t(F, Ne),
        t(F, Pe),
        t(j, Ie),
        t(j, M),
        ye(M, d[0]),
        t(B, Te),
        t(B, Y),
        t(Y, Ae),
        w(e, ie, _),
        w(e, C, _),
        t(C, G),
        t(G, Z),
        t(Z, xe),
        t(G, Re),
        t(G, $),
        t($, Ue),
        t(G, Se),
        t(C, Be),
        t(C, H),
        t(H, L),
        ye(L, d[2]),
        t(H, Le),
        t(H, W),
        t(W, De),
        t(C, Ce),
        t(C, q),
        t(q, Ve),
        A && A.m(q, null),
        w(e, ue, _),
        w(e, O, _),
        t(O, Me),
        w(e, ce, _),
        w(e, fe, _),
        w(e, pe, _),
        w(e, V, _),
        t(V, Fe),
        t(V, z),
        t(z, Oe),
        t(V, je),
        t(V, Ge),
        t(V, He),
        t(V, K),
        t(K, qe),
        w(e, de, _),
        P && P.m(e, _),
        w(e, ee, _),
        (oe = !0),
        ze ||
          ((Ze = [
            le(F, 'click', d[4]),
            le(M, 'input', d[8]),
            le(L, 'input', d[9]),
            le(W, 'click', d[5]),
            le(O, 'click', d[7]),
          ]),
          (ze = !0));
    },
    p(e, [_]) {
      _ & 1 && M.value !== e[0] && ye(M, e[0]),
        (!oe || _ & 8) && (L.disabled = e[3]),
        _ & 4 && L.value !== e[2] && ye(L, e[2]),
        e[1].length > 0
          ? A
            ? A.p(e, _)
            : ((A = pt(e)), A.c(), A.m(q, null))
          : A && (A.d(1), (A = null)),
        e[3]
          ? P
            ? _ & 8 && se(P, 1)
            : ((P = mt()), P.c(), se(P, 1), P.m(ee.parentNode, ee))
          : P &&
            (yt(),
            ne(P, 1, 1, () => {
              P = null;
            }),
            kt());
    },
    i(e) {
      oe || (se(a.$$.fragment, e), se(P), (oe = !0));
    },
    o(e) {
      ne(a.$$.fragment, e), ne(P), (oe = !1);
    },
    d(e) {
      Ye(a, e),
        e && s(r),
        e && s(o),
        e && s(f),
        e && s(n),
        e && s(D),
        e && s(B),
        e && s(ie),
        e && s(C),
        A && A.d(),
        e && s(ue),
        e && s(O),
        e && s(ce),
        e && s(fe),
        e && s(pe),
        e && s(V),
        e && s(de),
        P && P.d(e),
        e && s(ee),
        (ze = !1),
        gt(Ze);
    },
  };
}
async function ht(d) {
  let a, r;
  if (d.startsWith('ws://')) (a = d.slice(5)), (r = new URL('http://' + a));
  else if (d.startsWith('wss://'))
    (a = d.slice(6)), (r = new URL('https://' + a));
  else return !1;
  let o = new Headers();
  o.set('Accept', 'application/nostr+json');
  try {
    let l = await fetch(r, { headers: o });
    return console.log(l.status), console.log(await l.json()), !!l.ok;
  } catch {
    return !1;
  }
}
function St(d, a, r) {
  let o,
    l = [],
    f,
    n = !1,
    p;
  Et(async () => {
    const v = localStorage.getItem('nprofile');
    if (v)
      try {
        const { type: U, data: I } = ct.decode(v);
        console.log(U),
          console.log(I),
          U === 'nprofile' &&
            I.relays &&
            (r(0, (o = I.pubkey)), r(1, (l = I.relays)));
      } catch {
        console.log('nprofileのデコードに失敗しました');
      }
  });
  async function T() {
    try {
      r(0, (o = await window.nostr.getPublicKey()));
    } catch (v) {
      console.log(v),
        (p = {
          message: 'failed to get pubkey',
          timeout: 3e3,
          background: 'variant-filled-error',
        }),
        Q.trigger(p);
      return;
    }
    try {
      r(3, (n = !0));
      const v = await window.nostr.getRelays(),
        U = Object.keys(v).filter((D) => v[D].write === !0),
        I = [];
      for (const D of U)
        console.log(D), I.includes(D) || ((await ht(D)) && I.push(D));
      I.length > 0 && r(1, (l = I)), r(3, (n = !1));
    } catch (v) {
      console.log(v),
        (p = {
          message: 'failed to get relays',
          timeout: 3e3,
          background: 'variant-filled-error',
        }),
        Q.trigger(p);
    }
  }
  async function x() {
    if (!n) {
      if ((r(3, (n = !0)), l.includes(f)))
        (p = {
          message: 'already exists',
          timeout: 3e3,
          background: 'variant-filled',
        }),
          Q.trigger(p);
      else
        try {
          if (await ht(f)) l.push(f), r(1, l);
          else throw (r(3, (n = !1)), new Error());
        } catch {
          (p = {
            message: 'Please check relay URL',
            timeout: 3e3,
            background: 'variant-filled-error',
          }),
            Q.trigger(p);
        }
      r(2, (f = '')), r(3, (n = !1));
    }
  }
  function N(v) {
    l.splice(v, 1), r(1, l);
  }
  async function S() {
    r(3, (n = !0));
    let v;
    try {
      v = At(o);
    } catch {
      (p = {
        message: 'Please check pubkey',
        timeout: 3e3,
        background: 'variant-filled-error',
      }),
        Q.trigger(p),
        r(3, (n = !1));
      return;
    }
    if (l.length < 1) {
      (p = {
        message: 'Please add relay',
        timeout: 3e3,
        background: 'variant-filled-error',
      }),
        Q.trigger(p),
        r(3, (n = !1));
      return;
    }
    const U = { pubkey: v, relays: l };
    try {
      const I = ct.nprofileEncode(U);
      localStorage.setItem('nprofile', I), r(3, (n = !1)), await xt('/p/' + I);
    } catch {
      (p = {
        message: 'nprofileエンコードに失敗しました',
        timeout: 3e3,
        background: 'variant-filled-error',
      }),
        Q.trigger(p),
        r(3, (n = !1));
      return;
    }
  }
  function b() {
    (o = this.value), r(0, o);
  }
  function h() {
    (f = this.value), r(2, f);
  }
  return [o, l, f, n, T, x, N, S, b, h, (v) => N(v)];
}
class Bt extends _t {
  constructor(a) {
    super(), bt(this, a, St, Ut, vt, {});
  }
}
function Lt(d) {
  let a, r, o, l, f, n, p, T, x, N, S;
  return (
    (N = new Bt({})),
    {
      c() {
        (a = u('meta')),
          (r = u('meta')),
          (o = u('meta')),
          (l = u('meta')),
          (f = g()),
          (n = u('main')),
          (p = u('h1')),
          (T = y('nostr-bookmark-viewer3(v4)')),
          (x = g()),
          Je(N.$$.fragment),
          this.h();
      },
      l(b) {
        const h = Pt('svelte-e8dcyd', document.head);
        (a = c(h, 'META', { prefix: !0 })),
          (r = c(h, 'META', { property: !0, content: !0 })),
          (o = c(h, 'META', { property: !0, content: !0 })),
          (l = c(h, 'META', { property: !0, content: !0 })),
          h.forEach(s),
          (f = E(b)),
          (n = c(b, 'MAIN', { class: !0 }));
        var R = m(n);
        p = c(R, 'H1', { class: !0 });
        var v = m(p);
        (T = k(v, 'nostr-bookmark-viewer3(v4)')),
          v.forEach(s),
          (x = E(R)),
          Qe(N.$$.fragment, R),
          R.forEach(s),
          this.h();
      },
      h() {
        (document.title = 'nostr-bookmark-viewer'),
          i(a, 'prefix', 'og: https://ogp.me/ns#'),
          i(r, 'property', 'og:title'),
          i(r, 'content', 'nostr-bookmark-viewer3'),
          i(o, 'property', 'og:description'),
          i(o, 'content', 'Nostrのぶっくまーくみたりできるやつ'),
          i(l, 'property', 'og:image'),
          i(l, 'content', 'https://nostr-bookmark-viewer3.vercel.app/img2.png'),
          i(p, 'class', 'h1 mb-5'),
          i(n, 'class', 'container max-w-5xl p-2');
      },
      m(b, h) {
        t(document.head, a),
          t(document.head, r),
          t(document.head, o),
          t(document.head, l),
          w(b, f, h),
          w(b, n, h),
          t(n, p),
          t(p, T),
          t(n, x),
          Xe(N, n, null),
          (S = !0);
      },
      p: It,
      i(b) {
        S || (se(N.$$.fragment, b), (S = !0));
      },
      o(b) {
        ne(N.$$.fragment, b), (S = !1);
      },
      d(b) {
        s(a), s(r), s(o), s(l), b && s(f), b && s(n), Ye(N);
      },
    }
  );
}
class Ft extends _t {
  constructor(a) {
    super(), bt(this, a, null, Lt, vt, {});
  }
}
export { Ft as component };
