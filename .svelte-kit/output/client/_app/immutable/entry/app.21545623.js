import { _ as D } from '../chunks/preload-helper.41c905a7.js';
import {
  S,
  i as j,
  s as z,
  a as B,
  e as p,
  c as C,
  b as w,
  d,
  f as I,
  g as h,
  h as g,
  j as M,
  o as U,
  k as F,
  l as G,
  m as H,
  n as R,
  p as m,
  q as J,
  r as K,
  u as Q,
  v as P,
  w as V,
  x as k,
  y as v,
  z as L,
  A as E,
  B as A,
} from '../chunks/index.e81ade4b.js';
const te = {};
function W(o) {
  let e, n, i;
  var s = o[1][0];
  function c(t) {
    return { props: { data: t[3], form: t[2] } };
  }
  return (
    s && ((e = k(s, c(o))), o[12](e)),
    {
      c() {
        e && v(e.$$.fragment), (n = p());
      },
      l(t) {
        e && L(e.$$.fragment, t), (n = p());
      },
      m(t, r) {
        e && E(e, t, r), w(t, n, r), (i = !0);
      },
      p(t, r) {
        const _ = {};
        if (
          (r & 8 && (_.data = t[3]),
          r & 4 && (_.form = t[2]),
          r & 2 && s !== (s = t[1][0]))
        ) {
          if (e) {
            P();
            const f = e;
            d(f.$$.fragment, 1, 0, () => {
              A(f, 1);
            }),
              I();
          }
          s
            ? ((e = k(s, c(t))),
              t[12](e),
              v(e.$$.fragment),
              h(e.$$.fragment, 1),
              E(e, n.parentNode, n))
            : (e = null);
        } else s && e.$set(_);
      },
      i(t) {
        i || (e && h(e.$$.fragment, t), (i = !0));
      },
      o(t) {
        e && d(e.$$.fragment, t), (i = !1);
      },
      d(t) {
        o[12](null), t && g(n), e && A(e, t);
      },
    }
  );
}
function X(o) {
  let e, n, i;
  var s = o[1][0];
  function c(t) {
    return {
      props: { data: t[3], $$slots: { default: [Y] }, $$scope: { ctx: t } },
    };
  }
  return (
    s && ((e = k(s, c(o))), o[11](e)),
    {
      c() {
        e && v(e.$$.fragment), (n = p());
      },
      l(t) {
        e && L(e.$$.fragment, t), (n = p());
      },
      m(t, r) {
        e && E(e, t, r), w(t, n, r), (i = !0);
      },
      p(t, r) {
        const _ = {};
        if (
          (r & 8 && (_.data = t[3]),
          r & 8215 && (_.$$scope = { dirty: r, ctx: t }),
          r & 2 && s !== (s = t[1][0]))
        ) {
          if (e) {
            P();
            const f = e;
            d(f.$$.fragment, 1, 0, () => {
              A(f, 1);
            }),
              I();
          }
          s
            ? ((e = k(s, c(t))),
              t[11](e),
              v(e.$$.fragment),
              h(e.$$.fragment, 1),
              E(e, n.parentNode, n))
            : (e = null);
        } else s && e.$set(_);
      },
      i(t) {
        i || (e && h(e.$$.fragment, t), (i = !0));
      },
      o(t) {
        e && d(e.$$.fragment, t), (i = !1);
      },
      d(t) {
        o[11](null), t && g(n), e && A(e, t);
      },
    }
  );
}
function Y(o) {
  let e, n, i;
  var s = o[1][1];
  function c(t) {
    return { props: { data: t[4], form: t[2] } };
  }
  return (
    s && ((e = k(s, c(o))), o[10](e)),
    {
      c() {
        e && v(e.$$.fragment), (n = p());
      },
      l(t) {
        e && L(e.$$.fragment, t), (n = p());
      },
      m(t, r) {
        e && E(e, t, r), w(t, n, r), (i = !0);
      },
      p(t, r) {
        const _ = {};
        if (
          (r & 16 && (_.data = t[4]),
          r & 4 && (_.form = t[2]),
          r & 2 && s !== (s = t[1][1]))
        ) {
          if (e) {
            P();
            const f = e;
            d(f.$$.fragment, 1, 0, () => {
              A(f, 1);
            }),
              I();
          }
          s
            ? ((e = k(s, c(t))),
              t[10](e),
              v(e.$$.fragment),
              h(e.$$.fragment, 1),
              E(e, n.parentNode, n))
            : (e = null);
        } else s && e.$set(_);
      },
      i(t) {
        i || (e && h(e.$$.fragment, t), (i = !0));
      },
      o(t) {
        e && d(e.$$.fragment, t), (i = !1);
      },
      d(t) {
        o[10](null), t && g(n), e && A(e, t);
      },
    }
  );
}
function N(o) {
  let e,
    n = o[6] && O(o);
  return {
    c() {
      (e = F('div')), n && n.c(), this.h();
    },
    l(i) {
      e = G(i, 'DIV', {
        id: !0,
        'aria-live': !0,
        'aria-atomic': !0,
        style: !0,
      });
      var s = H(e);
      n && n.l(s), s.forEach(g), this.h();
    },
    h() {
      R(e, 'id', 'svelte-announcer'),
        R(e, 'aria-live', 'assertive'),
        R(e, 'aria-atomic', 'true'),
        m(e, 'position', 'absolute'),
        m(e, 'left', '0'),
        m(e, 'top', '0'),
        m(e, 'clip', 'rect(0 0 0 0)'),
        m(e, 'clip-path', 'inset(50%)'),
        m(e, 'overflow', 'hidden'),
        m(e, 'white-space', 'nowrap'),
        m(e, 'width', '1px'),
        m(e, 'height', '1px');
    },
    m(i, s) {
      w(i, e, s), n && n.m(e, null);
    },
    p(i, s) {
      i[6]
        ? n
          ? n.p(i, s)
          : ((n = O(i)), n.c(), n.m(e, null))
        : n && (n.d(1), (n = null));
    },
    d(i) {
      i && g(e), n && n.d();
    },
  };
}
function O(o) {
  let e;
  return {
    c() {
      e = J(o[7]);
    },
    l(n) {
      e = K(n, o[7]);
    },
    m(n, i) {
      w(n, e, i);
    },
    p(n, i) {
      i & 128 && Q(e, n[7]);
    },
    d(n) {
      n && g(e);
    },
  };
}
function Z(o) {
  let e, n, i, s, c;
  const t = [X, W],
    r = [];
  function _(a, u) {
    return a[1][1] ? 0 : 1;
  }
  (e = _(o)), (n = r[e] = t[e](o));
  let f = o[5] && N(o);
  return {
    c() {
      n.c(), (i = B()), f && f.c(), (s = p());
    },
    l(a) {
      n.l(a), (i = C(a)), f && f.l(a), (s = p());
    },
    m(a, u) {
      r[e].m(a, u), w(a, i, u), f && f.m(a, u), w(a, s, u), (c = !0);
    },
    p(a, [u]) {
      let b = e;
      (e = _(a)),
        e === b
          ? r[e].p(a, u)
          : (P(),
            d(r[b], 1, 1, () => {
              r[b] = null;
            }),
            I(),
            (n = r[e]),
            n ? n.p(a, u) : ((n = r[e] = t[e](a)), n.c()),
            h(n, 1),
            n.m(i.parentNode, i)),
        a[5]
          ? f
            ? f.p(a, u)
            : ((f = N(a)), f.c(), f.m(s.parentNode, s))
          : f && (f.d(1), (f = null));
    },
    i(a) {
      c || (h(n), (c = !0));
    },
    o(a) {
      d(n), (c = !1);
    },
    d(a) {
      r[e].d(a), a && g(i), f && f.d(a), a && g(s);
    },
  };
}
function $(o, e, n) {
  let { stores: i } = e,
    { page: s } = e,
    { constructors: c } = e,
    { components: t = [] } = e,
    { form: r } = e,
    { data_0: _ = null } = e,
    { data_1: f = null } = e;
  M(i.page.notify);
  let a = !1,
    u = !1,
    b = null;
  U(() => {
    const l = i.page.subscribe(() => {
      a && (n(6, (u = !0)), n(7, (b = document.title || 'untitled page')));
    });
    return n(5, (a = !0)), l;
  });
  function T(l) {
    V[l ? 'unshift' : 'push'](() => {
      (t[1] = l), n(0, t);
    });
  }
  function y(l) {
    V[l ? 'unshift' : 'push'](() => {
      (t[0] = l), n(0, t);
    });
  }
  function q(l) {
    V[l ? 'unshift' : 'push'](() => {
      (t[0] = l), n(0, t);
    });
  }
  return (
    (o.$$set = (l) => {
      'stores' in l && n(8, (i = l.stores)),
        'page' in l && n(9, (s = l.page)),
        'constructors' in l && n(1, (c = l.constructors)),
        'components' in l && n(0, (t = l.components)),
        'form' in l && n(2, (r = l.form)),
        'data_0' in l && n(3, (_ = l.data_0)),
        'data_1' in l && n(4, (f = l.data_1));
    }),
    (o.$$.update = () => {
      o.$$.dirty & 768 && i.page.set(s);
    }),
    [t, c, r, _, f, a, u, b, i, s, T, y, q]
  );
}
class ne extends S {
  constructor(e) {
    super(),
      j(this, e, $, Z, z, {
        stores: 8,
        page: 9,
        constructors: 1,
        components: 0,
        form: 2,
        data_0: 3,
        data_1: 4,
      });
  }
}
const ie = [
    () =>
      D(
        () => import('../nodes/0.6e36538a.js'),
        [
          '../nodes/0.6e36538a.js',
          '../chunks/index.e81ade4b.js',
          '../chunks/popup.7188fd77.js',
          '../chunks/index.52a5fe5b.js',
          '../chunks/ProgressBar.svelte_svelte_type_style_lang.0751fc73.js',
          '../assets/ProgressBar.05e4960c.css',
          '../chunks/preload-helper.41c905a7.js',
          '../assets/0.e292cac0.css',
        ],
        import.meta.url,
      ),
    () =>
      D(
        () => import('../nodes/1.57a9797e.js'),
        [
          '../nodes/1.57a9797e.js',
          '../chunks/index.e81ade4b.js',
          '../chunks/stores.775d0d4f.js',
          '../chunks/singletons.2b260291.js',
          '../chunks/index.52a5fe5b.js',
        ],
        import.meta.url,
      ),
    () =>
      D(
        () => import('../nodes/2.e0fee28c.js'),
        [
          '../nodes/2.e0fee28c.js',
          '../chunks/index.e81ade4b.js',
          '../chunks/navigation.928c82b4.js',
          '../chunks/index.52a5fe5b.js',
          '../chunks/singletons.2b260291.js',
          '../chunks/ProgressBar.svelte_svelte_type_style_lang.0751fc73.js',
          '../assets/ProgressBar.05e4960c.css',
          '../chunks/Toast.4359ca3d.js',
        ],
        import.meta.url,
      ),
    () =>
      D(
        () => import('../nodes/3.f39fcdac.js'),
        [
          '../nodes/3.f39fcdac.js',
          '../chunks/index.e81ade4b.js',
          '../chunks/stores.775d0d4f.js',
          '../chunks/singletons.2b260291.js',
          '../chunks/index.52a5fe5b.js',
          '../chunks/navigation.928c82b4.js',
          '../chunks/Content.952014ad.js',
          '../chunks/ProgressBar.svelte_svelte_type_style_lang.0751fc73.js',
          '../assets/ProgressBar.05e4960c.css',
          '../assets/Content.be387959.css',
          '../chunks/popup.7188fd77.js',
          '../assets/3.856ca443.css',
        ],
        import.meta.url,
      ),
    () =>
      D(
        () => import('../nodes/4.b839423c.js'),
        [
          '../nodes/4.b839423c.js',
          '../chunks/index.e81ade4b.js',
          '../chunks/stores.775d0d4f.js',
          '../chunks/singletons.2b260291.js',
          '../chunks/index.52a5fe5b.js',
          '../chunks/navigation.928c82b4.js',
          '../chunks/Content.952014ad.js',
          '../chunks/ProgressBar.svelte_svelte_type_style_lang.0751fc73.js',
          '../assets/ProgressBar.05e4960c.css',
          '../assets/Content.be387959.css',
          '../chunks/popup.7188fd77.js',
          '../chunks/Toast.4359ca3d.js',
          '../assets/4.fbb30415.css',
        ],
        import.meta.url,
      ),
  ],
  se = [],
  re = { '/': [2], '/a/[naddr]': [3], '/p/[nprofile]': [4] },
  oe = {
    handleError: ({ error: o }) => {
      console.error(o);
    },
  };
export {
  re as dictionary,
  oe as hooks,
  te as matchers,
  ie as nodes,
  ne as root,
  se as server_loads,
};
