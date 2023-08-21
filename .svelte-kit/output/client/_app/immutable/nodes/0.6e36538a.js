import {
  S as At,
  i as Pt,
  s as Dt,
  C as jt,
  a as xt,
  H as qt,
  e as K,
  c as bt,
  D as Ut,
  E as Gt,
  h as U,
  b as at,
  F as Xt,
  G as Yt,
  I as Jt,
  J as Qt,
  g as G,
  d as tt,
  f as Kt,
  o as Zt,
  y as te,
  z as ee,
  A as ne,
  B as oe,
  v as ie,
} from '../chunks/index.e81ade4b.js';
import { s as re } from '../chunks/popup.7188fd77.js';
import '../chunks/ProgressBar.svelte_svelte_type_style_lang.0751fc73.js';
import { _ as se } from '../chunks/preload-helper.41c905a7.js';
function Y(t) {
  return t.split('-')[1];
}
function ht(t) {
  return t === 'y' ? 'height' : 'width';
}
function V(t) {
  return t.split('-')[0];
}
function J(t) {
  return ['top', 'bottom'].includes(V(t)) ? 'x' : 'y';
}
function Rt(t, e, o) {
  let { reference: n, floating: r } = t;
  const i = n.x + n.width / 2 - r.width / 2,
    l = n.y + n.height / 2 - r.height / 2,
    c = J(e),
    a = ht(c),
    s = n[a] / 2 - r[a] / 2,
    f = c === 'x';
  let u;
  switch (V(e)) {
    case 'top':
      u = { x: i, y: n.y - r.height };
      break;
    case 'bottom':
      u = { x: i, y: n.y + n.height };
      break;
    case 'right':
      u = { x: n.x + n.width, y: l };
      break;
    case 'left':
      u = { x: n.x - r.width, y: l };
      break;
    default:
      u = { x: n.x, y: n.y };
  }
  switch (Y(e)) {
    case 'start':
      u[c] -= s * (o && f ? -1 : 1);
      break;
    case 'end':
      u[c] += s * (o && f ? -1 : 1);
  }
  return u;
}
const le = async (t, e, o) => {
  const {
      placement: n = 'bottom',
      strategy: r = 'absolute',
      middleware: i = [],
      platform: l,
    } = o,
    c = i.filter(Boolean),
    a = await (l.isRTL == null ? void 0 : l.isRTL(e));
  let s = await l.getElementRects({ reference: t, floating: e, strategy: r }),
    { x: f, y: u } = Rt(s, n, a),
    g = n,
    m = {},
    p = 0;
  for (let d = 0; d < c.length; d++) {
    const { name: h, fn: y } = c[d],
      {
        x: w,
        y: v,
        data: T,
        reset: b,
      } = await y({
        x: f,
        y: u,
        initialPlacement: n,
        placement: g,
        strategy: r,
        middlewareData: m,
        rects: s,
        platform: l,
        elements: { reference: t, floating: e },
      });
    (f = w ?? f),
      (u = v ?? u),
      (m = { ...m, [h]: { ...m[h], ...T } }),
      b &&
        p <= 50 &&
        (p++,
        typeof b == 'object' &&
          (b.placement && (g = b.placement),
          b.rects &&
            (s =
              b.rects === !0
                ? await l.getElementRects({
                    reference: t,
                    floating: e,
                    strategy: r,
                  })
                : b.rects),
          ({ x: f, y: u } = Rt(s, g, a))),
        (d = -1));
  }
  return { x: f, y: u, placement: g, strategy: r, middlewareData: m };
};
function Q(t, e) {
  return typeof t == 'function' ? t(e) : t;
}
function Ot(t) {
  return typeof t != 'number'
    ? (function (e) {
        return { top: 0, right: 0, bottom: 0, left: 0, ...e };
      })(t)
    : { top: t, right: t, bottom: t, left: t };
}
function et(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height,
  };
}
async function Ct(t, e) {
  var o;
  e === void 0 && (e = {});
  const { x: n, y: r, platform: i, rects: l, elements: c, strategy: a } = t,
    {
      boundary: s = 'clippingAncestors',
      rootBoundary: f = 'viewport',
      elementContext: u = 'floating',
      altBoundary: g = !1,
      padding: m = 0,
    } = Q(e, t),
    p = Ot(m),
    d = c[g ? (u === 'floating' ? 'reference' : 'floating') : u],
    h = et(
      await i.getClippingRect({
        element:
          (o = await (i.isElement == null ? void 0 : i.isElement(d))) == null ||
          o
            ? d
            : d.contextElement ||
              (await (i.getDocumentElement == null
                ? void 0
                : i.getDocumentElement(c.floating))),
        boundary: s,
        rootBoundary: f,
        strategy: a,
      }),
    ),
    y = u === 'floating' ? { ...l.floating, x: n, y: r } : l.reference,
    w = await (i.getOffsetParent == null
      ? void 0
      : i.getOffsetParent(c.floating)),
    v = ((await (i.isElement == null ? void 0 : i.isElement(w))) &&
      (await (i.getScale == null ? void 0 : i.getScale(w)))) || { x: 1, y: 1 },
    T = et(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            rect: y,
            offsetParent: w,
            strategy: a,
          })
        : y,
    );
  return {
    top: (h.top - T.top + p.top) / v.y,
    bottom: (T.bottom - h.bottom + p.bottom) / v.y,
    left: (h.left - T.left + p.left) / v.x,
    right: (T.right - h.right + p.right) / v.x,
  };
}
const ut = Math.min,
  ce = Math.max;
function dt(t, e, o) {
  return ce(t, ut(e, o));
}
const ae = (t) => ({
    name: 'arrow',
    options: t,
    async fn(e) {
      const {
          x: o,
          y: n,
          placement: r,
          rects: i,
          platform: l,
          elements: c,
        } = e,
        { element: a, padding: s = 0 } = Q(t, e) || {};
      if (a == null) return {};
      const f = Ot(s),
        u = { x: o, y: n },
        g = J(r),
        m = ht(g),
        p = await l.getDimensions(a),
        d = g === 'y',
        h = d ? 'top' : 'left',
        y = d ? 'bottom' : 'right',
        w = d ? 'clientHeight' : 'clientWidth',
        v = i.reference[m] + i.reference[g] - u[g] - i.floating[m],
        T = u[g] - i.reference[g],
        b = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(a));
      let S = b ? b[w] : 0;
      (S && (await (l.isElement == null ? void 0 : l.isElement(b)))) ||
        (S = c.floating[w] || i.floating[m]);
      const A = v / 2 - T / 2,
        O = S / 2 - p[m] / 2 - 1,
        M = ut(f[h], O),
        H = ut(f[y], O),
        x = M,
        _ = S - p[m] - H,
        R = S / 2 - p[m] / 2 + A,
        E = dt(x, R, _),
        L =
          Y(r) != null &&
          R != E &&
          i.reference[m] / 2 - (R < x ? M : H) - p[m] / 2 < 0
            ? R < x
              ? x - R
              : _ - R
            : 0;
      return { [g]: u[g] - L, data: { [g]: E, centerOffset: R - E + L } };
    },
  }),
  fe = ['top', 'right', 'bottom', 'left'];
fe.reduce((t, e) => t.concat(e, e + '-start', e + '-end'), []);
const ue = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function nt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => ue[e]);
}
function de(t, e, o) {
  o === void 0 && (o = !1);
  const n = Y(t),
    r = J(t),
    i = ht(r);
  let l =
    r === 'x'
      ? n === (o ? 'end' : 'start')
        ? 'right'
        : 'left'
      : n === 'start'
      ? 'bottom'
      : 'top';
  return (
    e.reference[i] > e.floating[i] && (l = nt(l)), { main: l, cross: nt(l) }
  );
}
const me = { start: 'end', end: 'start' };
function ft(t) {
  return t.replace(/start|end/g, (e) => me[e]);
}
const pe = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'flip',
        options: t,
        async fn(e) {
          var o;
          const {
              placement: n,
              middlewareData: r,
              rects: i,
              initialPlacement: l,
              platform: c,
              elements: a,
            } = e,
            {
              mainAxis: s = !0,
              crossAxis: f = !0,
              fallbackPlacements: u,
              fallbackStrategy: g = 'bestFit',
              fallbackAxisSideDirection: m = 'none',
              flipAlignment: p = !0,
              ...d
            } = Q(t, e),
            h = V(n),
            y = V(l) === l,
            w = await (c.isRTL == null ? void 0 : c.isRTL(a.floating)),
            v =
              u ||
              (y || !p
                ? [nt(l)]
                : (function (x) {
                    const _ = nt(x);
                    return [ft(x), _, ft(_)];
                  })(l));
          u ||
            m === 'none' ||
            v.push(
              ...(function (x, _, R, E) {
                const L = Y(x);
                let $ = (function (C, ct, Nt) {
                  const wt = ['left', 'right'],
                    vt = ['right', 'left'],
                    zt = ['top', 'bottom'],
                    It = ['bottom', 'top'];
                  switch (C) {
                    case 'top':
                    case 'bottom':
                      return Nt ? (ct ? vt : wt) : ct ? wt : vt;
                    case 'left':
                    case 'right':
                      return ct ? zt : It;
                    default:
                      return [];
                  }
                })(V(x), R === 'start', E);
                return (
                  L &&
                    (($ = $.map((C) => C + '-' + L)),
                    _ && ($ = $.concat($.map(ft)))),
                  $
                );
              })(l, p, m, w),
            );
          const T = [l, ...v],
            b = await Ct(e, d),
            S = [];
          let A = ((o = r.flip) == null ? void 0 : o.overflows) || [];
          if ((s && S.push(b[h]), f)) {
            const { main: x, cross: _ } = de(n, i, w);
            S.push(b[x], b[_]);
          }
          if (
            ((A = [...A, { placement: n, overflows: S }]),
            !S.every((x) => x <= 0))
          ) {
            var O, M;
            const x = (((O = r.flip) == null ? void 0 : O.index) || 0) + 1,
              _ = T[x];
            if (_)
              return {
                data: { index: x, overflows: A },
                reset: { placement: _ },
              };
            let R =
              (M = A.filter((E) => E.overflows[0] <= 0).sort(
                (E, L) => E.overflows[1] - L.overflows[1],
              )[0]) == null
                ? void 0
                : M.placement;
            if (!R)
              switch (g) {
                case 'bestFit': {
                  var H;
                  const E =
                    (H = A.map((L) => [
                      L.placement,
                      L.overflows
                        .filter(($) => $ > 0)
                        .reduce(($, C) => $ + C, 0),
                    ]).sort((L, $) => L[1] - $[1])[0]) == null
                      ? void 0
                      : H[0];
                  E && (R = E);
                  break;
                }
                case 'initialPlacement':
                  R = l;
              }
            if (n !== R) return { reset: { placement: R } };
          }
          return {};
        },
      }
    );
  },
  he = function (t) {
    return (
      t === void 0 && (t = 0),
      {
        name: 'offset',
        options: t,
        async fn(e) {
          const { x: o, y: n } = e,
            r = await (async function (i, l) {
              const { placement: c, platform: a, elements: s } = i,
                f = await (a.isRTL == null ? void 0 : a.isRTL(s.floating)),
                u = V(c),
                g = Y(c),
                m = J(c) === 'x',
                p = ['left', 'top'].includes(u) ? -1 : 1,
                d = f && m ? -1 : 1,
                h = Q(l, i);
              let {
                mainAxis: y,
                crossAxis: w,
                alignmentAxis: v,
              } = typeof h == 'number'
                ? { mainAxis: h, crossAxis: 0, alignmentAxis: null }
                : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...h };
              return (
                g && typeof v == 'number' && (w = g === 'end' ? -1 * v : v),
                m ? { x: w * d, y: y * p } : { x: y * p, y: w * d }
              );
            })(e, t);
          return { x: o + r.x, y: n + r.y, data: r };
        },
      }
    );
  };
function ge(t) {
  return t === 'x' ? 'y' : 'x';
}
const ye = function (t) {
  return (
    t === void 0 && (t = {}),
    {
      name: 'shift',
      options: t,
      async fn(e) {
        const { x: o, y: n, placement: r } = e,
          {
            mainAxis: i = !0,
            crossAxis: l = !1,
            limiter: c = {
              fn: (h) => {
                let { x: y, y: w } = h;
                return { x: y, y: w };
              },
            },
            ...a
          } = Q(t, e),
          s = { x: o, y: n },
          f = await Ct(e, a),
          u = J(V(r)),
          g = ge(u);
        let m = s[u],
          p = s[g];
        if (i) {
          const h = u === 'y' ? 'bottom' : 'right';
          m = dt(m + f[u === 'y' ? 'top' : 'left'], m, m - f[h]);
        }
        if (l) {
          const h = g === 'y' ? 'bottom' : 'right';
          p = dt(p + f[g === 'y' ? 'top' : 'left'], p, p - f[h]);
        }
        const d = c.fn({ ...e, [u]: m, [g]: p });
        return { ...d, data: { x: d.x - o, y: d.y - n } };
      },
    }
  );
};
function k(t) {
  var e;
  return ((e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function P(t) {
  return k(t).getComputedStyle(t);
}
function Wt(t) {
  return t instanceof k(t).Node;
}
function B(t) {
  return Wt(t) ? (t.nodeName || '').toLowerCase() : '#document';
}
function D(t) {
  return t instanceof k(t).HTMLElement;
}
function W(t) {
  return t instanceof k(t).Element;
}
function _t(t) {
  return (
    typeof ShadowRoot < 'u' &&
    (t instanceof k(t).ShadowRoot || t instanceof ShadowRoot)
  );
}
function X(t) {
  const { overflow: e, overflowX: o, overflowY: n, display: r } = P(t);
  return (
    /auto|scroll|overlay|hidden|clip/.test(e + n + o) &&
    !['inline', 'contents'].includes(r)
  );
}
function we(t) {
  return ['table', 'td', 'th'].includes(B(t));
}
function mt(t) {
  const e = gt(),
    o = P(t);
  return (
    o.transform !== 'none' ||
    o.perspective !== 'none' ||
    (!!o.containerType && o.containerType !== 'normal') ||
    (!e && !!o.backdropFilter && o.backdropFilter !== 'none') ||
    (!e && !!o.filter && o.filter !== 'none') ||
    ['transform', 'perspective', 'filter'].some((n) =>
      (o.willChange || '').includes(n),
    ) ||
    ['paint', 'layout', 'strict', 'content'].some((n) =>
      (o.contain || '').includes(n),
    )
  );
}
function gt() {
  return (
    !(typeof CSS > 'u' || !CSS.supports) &&
    CSS.supports('-webkit-backdrop-filter', 'none')
  );
}
function st(t) {
  return ['html', 'body', '#document'].includes(B(t));
}
const pt = Math.min,
  I = Math.max,
  ot = Math.round,
  Z = Math.floor,
  N = (t) => ({ x: t, y: t });
function Ft(t) {
  const e = P(t);
  let o = parseFloat(e.width) || 0,
    n = parseFloat(e.height) || 0;
  const r = D(t),
    i = r ? t.offsetWidth : o,
    l = r ? t.offsetHeight : n,
    c = ot(o) !== i || ot(n) !== l;
  return c && ((o = i), (n = l)), { width: o, height: n, $: c };
}
function yt(t) {
  return W(t) ? t : t.contextElement;
}
function j(t) {
  const e = yt(t);
  if (!D(e)) return N(1);
  const o = e.getBoundingClientRect(),
    { width: n, height: r, $: i } = Ft(e);
  let l = (i ? ot(o.width) : o.width) / n,
    c = (i ? ot(o.height) : o.height) / r;
  return (
    (l && Number.isFinite(l)) || (l = 1),
    (c && Number.isFinite(c)) || (c = 1),
    { x: l, y: c }
  );
}
const Et = N(0);
function Mt(t, e, o) {
  var n, r;
  if ((e === void 0 && (e = !0), !gt())) return Et;
  const i = t ? k(t) : window;
  return !o || (e && o !== i)
    ? Et
    : {
        x: ((n = i.visualViewport) == null ? void 0 : n.offsetLeft) || 0,
        y: ((r = i.visualViewport) == null ? void 0 : r.offsetTop) || 0,
      };
}
function z(t, e, o, n) {
  e === void 0 && (e = !1), o === void 0 && (o = !1);
  const r = t.getBoundingClientRect(),
    i = yt(t);
  let l = N(1);
  e && (n ? W(n) && (l = j(n)) : (l = j(t)));
  const c = Mt(i, o, n);
  let a = (r.left + c.x) / l.x,
    s = (r.top + c.y) / l.y,
    f = r.width / l.x,
    u = r.height / l.y;
  if (i) {
    const g = k(i),
      m = n && W(n) ? k(n) : n;
    let p = g.frameElement;
    for (; p && n && m !== g; ) {
      const d = j(p),
        h = p.getBoundingClientRect(),
        y = getComputedStyle(p),
        w = h.left + (p.clientLeft + parseFloat(y.paddingLeft)) * d.x,
        v = h.top + (p.clientTop + parseFloat(y.paddingTop)) * d.y;
      (a *= d.x),
        (s *= d.y),
        (f *= d.x),
        (u *= d.y),
        (a += w),
        (s += v),
        (p = k(p).frameElement);
    }
  }
  return et({ width: f, height: u, x: a, y: s });
}
function F(t) {
  return ((Wt(t) ? t.ownerDocument : t.document) || window.document)
    .documentElement;
}
function lt(t) {
  return W(t)
    ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
    : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
}
function Ht(t) {
  return z(F(t)).left + lt(t).scrollLeft;
}
function q(t) {
  if (B(t) === 'html') return t;
  const e = t.assignedSlot || t.parentNode || (_t(t) && t.host) || F(t);
  return _t(e) ? e.host : e;
}
function Bt(t) {
  const e = q(t);
  return st(e)
    ? t.ownerDocument
      ? t.ownerDocument.body
      : t.body
    : D(e) && X(e)
    ? e
    : Bt(e);
}
function it(t, e) {
  var o;
  e === void 0 && (e = []);
  const n = Bt(t),
    r = n === ((o = t.ownerDocument) == null ? void 0 : o.body),
    i = k(n);
  return r
    ? e.concat(i, i.visualViewport || [], X(n) ? n : [])
    : e.concat(n, it(n));
}
function Lt(t, e, o) {
  let n;
  if (e === 'viewport')
    n = (function (r, i) {
      const l = k(r),
        c = F(r),
        a = l.visualViewport;
      let s = c.clientWidth,
        f = c.clientHeight,
        u = 0,
        g = 0;
      if (a) {
        (s = a.width), (f = a.height);
        const m = gt();
        (!m || (m && i === 'fixed')) && ((u = a.offsetLeft), (g = a.offsetTop));
      }
      return { width: s, height: f, x: u, y: g };
    })(t, o);
  else if (e === 'document')
    n = (function (r) {
      const i = F(r),
        l = lt(r),
        c = r.ownerDocument.body,
        a = I(i.scrollWidth, i.clientWidth, c.scrollWidth, c.clientWidth),
        s = I(i.scrollHeight, i.clientHeight, c.scrollHeight, c.clientHeight);
      let f = -l.scrollLeft + Ht(r);
      const u = -l.scrollTop;
      return (
        P(c).direction === 'rtl' && (f += I(i.clientWidth, c.clientWidth) - a),
        { width: a, height: s, x: f, y: u }
      );
    })(F(t));
  else if (W(e))
    n = (function (r, i) {
      const l = z(r, !0, i === 'fixed'),
        c = l.top + r.clientTop,
        a = l.left + r.clientLeft,
        s = D(r) ? j(r) : N(1);
      return {
        width: r.clientWidth * s.x,
        height: r.clientHeight * s.y,
        x: a * s.x,
        y: c * s.y,
      };
    })(e, o);
  else {
    const r = Mt(t);
    n = { ...e, x: e.x - r.x, y: e.y - r.y };
  }
  return et(n);
}
function Vt(t, e) {
  const o = q(t);
  return (
    !(o === e || !W(o) || st(o)) && (P(o).position === 'fixed' || Vt(o, e))
  );
}
function $t(t, e) {
  return D(t) && P(t).position !== 'fixed' ? (e ? e(t) : t.offsetParent) : null;
}
function Tt(t, e) {
  const o = k(t);
  if (!D(t)) return o;
  let n = $t(t, e);
  for (; n && we(n) && P(n).position === 'static'; ) n = $t(n, e);
  return n &&
    (B(n) === 'html' ||
      (B(n) === 'body' && P(n).position === 'static' && !mt(n)))
    ? o
    : n ||
        (function (r) {
          let i = q(r);
          for (; D(i) && !st(i); ) {
            if (mt(i)) return i;
            i = q(i);
          }
          return null;
        })(t) ||
        o;
}
function ve(t, e, o) {
  const n = D(e),
    r = F(e),
    i = o === 'fixed',
    l = z(t, !0, i, e);
  let c = { scrollLeft: 0, scrollTop: 0 };
  const a = N(0);
  if (n || (!n && !i))
    if (((B(e) !== 'body' || X(r)) && (c = lt(e)), D(e))) {
      const s = z(e, !0, i, e);
      (a.x = s.x + e.clientLeft), (a.y = s.y + e.clientTop);
    } else r && (a.x = Ht(r));
  return {
    x: l.left + c.scrollLeft - a.x,
    y: l.top + c.scrollTop - a.y,
    width: l.width,
    height: l.height,
  };
}
const xe = {
  getClippingRect: function (t) {
    let { element: e, boundary: o, rootBoundary: n, strategy: r } = t;
    const i =
        o === 'clippingAncestors'
          ? (function (s, f) {
              const u = f.get(s);
              if (u) return u;
              let g = it(s).filter((h) => W(h) && B(h) !== 'body'),
                m = null;
              const p = P(s).position === 'fixed';
              let d = p ? q(s) : s;
              for (; W(d) && !st(d); ) {
                const h = P(d),
                  y = mt(d);
                y || h.position !== 'fixed' || (m = null),
                  (
                    p
                      ? !y && !m
                      : (!y &&
                          h.position === 'static' &&
                          m &&
                          ['absolute', 'fixed'].includes(m.position)) ||
                        (X(d) && !y && Vt(s, d))
                  )
                    ? (g = g.filter((w) => w !== d))
                    : (m = h),
                  (d = q(d));
              }
              return f.set(s, g), g;
            })(e, this._c)
          : [].concat(o),
      l = [...i, n],
      c = l[0],
      a = l.reduce(
        (s, f) => {
          const u = Lt(e, f, r);
          return (
            (s.top = I(u.top, s.top)),
            (s.right = pt(u.right, s.right)),
            (s.bottom = pt(u.bottom, s.bottom)),
            (s.left = I(u.left, s.left)),
            s
          );
        },
        Lt(e, c, r),
      );
    return {
      width: a.right - a.left,
      height: a.bottom - a.top,
      x: a.left,
      y: a.top,
    };
  },
  convertOffsetParentRelativeRectToViewportRelativeRect: function (t) {
    let { rect: e, offsetParent: o, strategy: n } = t;
    const r = D(o),
      i = F(o);
    if (o === i) return e;
    let l = { scrollLeft: 0, scrollTop: 0 },
      c = N(1);
    const a = N(0);
    if (
      (r || (!r && n !== 'fixed')) &&
      ((B(o) !== 'body' || X(i)) && (l = lt(o)), D(o))
    ) {
      const s = z(o);
      (c = j(o)), (a.x = s.x + o.clientLeft), (a.y = s.y + o.clientTop);
    }
    return {
      width: e.width * c.x,
      height: e.height * c.y,
      x: e.x * c.x - l.scrollLeft * c.x + a.x,
      y: e.y * c.y - l.scrollTop * c.y + a.y,
    };
  },
  isElement: W,
  getDimensions: function (t) {
    return Ft(t);
  },
  getOffsetParent: Tt,
  getDocumentElement: F,
  getScale: j,
  async getElementRects(t) {
    let { reference: e, floating: o, strategy: n } = t;
    const r = this.getOffsetParent || Tt,
      i = this.getDimensions;
    return {
      reference: ve(e, await r(o), n),
      floating: { x: 0, y: 0, ...(await i(o)) },
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => P(t).direction === 'rtl',
};
function be(t, e, o, n) {
  n === void 0 && (n = {});
  const {
      ancestorScroll: r = !0,
      ancestorResize: i = !0,
      elementResize: l = typeof ResizeObserver == 'function',
      layoutShift: c = typeof IntersectionObserver == 'function',
      animationFrame: a = !1,
    } = n,
    s = yt(t),
    f = r || i ? [...(s ? it(s) : []), ...it(e)] : [];
  f.forEach((h) => {
    r && h.addEventListener('scroll', o, { passive: !0 }),
      i && h.addEventListener('resize', o);
  });
  const u =
    s && c
      ? (function (h, y) {
          let w,
            v = null;
          const T = F(h);
          function b() {
            clearTimeout(w), v && v.disconnect(), (v = null);
          }
          return (
            (function S(A, O) {
              A === void 0 && (A = !1), O === void 0 && (O = 1), b();
              const {
                left: M,
                top: H,
                width: x,
                height: _,
              } = h.getBoundingClientRect();
              if ((A || y(), !x || !_)) return;
              const R = {
                rootMargin:
                  -Z(H) +
                  'px ' +
                  -Z(T.clientWidth - (M + x)) +
                  'px ' +
                  -Z(T.clientHeight - (H + _)) +
                  'px ' +
                  -Z(M) +
                  'px',
                threshold: I(0, pt(1, O)) || 1,
              };
              let E = !0;
              function L($) {
                const C = $[0].intersectionRatio;
                if (C !== O) {
                  if (!E) return S();
                  C
                    ? S(!1, C)
                    : (w = setTimeout(() => {
                        S(!1, 1e-7);
                      }, 100));
                }
                E = !1;
              }
              try {
                v = new IntersectionObserver(L, {
                  ...R,
                  root: T.ownerDocument,
                });
              } catch {
                v = new IntersectionObserver(L, R);
              }
              v.observe(h);
            })(!0),
            b
          );
        })(s, o)
      : null;
  let g,
    m = -1,
    p = null;
  l &&
    ((p = new ResizeObserver((h) => {
      let [y] = h;
      y &&
        y.target === s &&
        p &&
        (p.unobserve(e),
        cancelAnimationFrame(m),
        (m = requestAnimationFrame(() => {
          p && p.observe(e);
        }))),
        o();
    })),
    s && !a && p.observe(s),
    p.observe(e));
  let d = a ? z(t) : null;
  return (
    a &&
      (function h() {
        const y = z(t);
        !d ||
          (y.x === d.x &&
            y.y === d.y &&
            y.width === d.width &&
            y.height === d.height) ||
          o(),
          (d = y),
          (g = requestAnimationFrame(h));
      })(),
    o(),
    () => {
      f.forEach((h) => {
        r && h.removeEventListener('scroll', o),
          i && h.removeEventListener('resize', o);
      }),
        u && u(),
        p && p.disconnect(),
        (p = null),
        a && cancelAnimationFrame(g);
    }
  );
}
const Re = (t, e, o) => {
  const n = new Map(),
    r = { platform: xe, ...o },
    i = { ...r.platform, _c: n };
  return le(t, e, { ...r, platform: i });
};
function _e(t = {}) {
  const {
    immediate: e = !1,
    onNeedRefresh: o,
    onOfflineReady: n,
    onRegistered: r,
    onRegisteredSW: i,
    onRegisterError: l,
  } = t;
  let c, a, s;
  const f = async (g = !0) => {
    await a, await (s == null ? void 0 : s());
  };
  async function u() {
    if ('serviceWorker' in navigator) {
      const { Workbox: g } = await se(
        () => import('../chunks/workbox-window.prod.es5.a7b12eab.js'),
        [],
        import.meta.url,
      );
      (c = new g('./sw.js', { scope: './', type: 'classic' })),
        (s = async () => {
          await (c == null ? void 0 : c.messageSkipWaiting());
        });
      {
        let m = !1;
        const p = () => {
          (m = !0),
            c == null ||
              c.addEventListener('controlling', (d) => {
                d.isUpdate && window.location.reload();
              }),
            o == null || o();
        };
        c.addEventListener('installed', (d) => {
          typeof d.isUpdate > 'u'
            ? typeof d.isExternal < 'u'
              ? d.isExternal
                ? p()
                : !m && (n == null || n())
              : d.isExternal
              ? window.location.reload()
              : !m && (n == null || n())
            : d.isUpdate || n == null || n();
        }),
          c.addEventListener('waiting', p),
          c.addEventListener('externalwaiting', p);
      }
      c.register({ immediate: e })
        .then((m) => {
          i ? i('./sw.js', m) : r == null || r(m);
        })
        .catch((m) => {
          l == null || l(m);
        });
    }
  }
  return (a = u()), f;
}
function Ee(t) {
  return _e({ immediate: !0 }), [];
}
class Le extends At {
  constructor(e) {
    super(), Pt(this, e, Ee, null, Dt, {});
  }
}
const rt = {
  pwaInDevEnvironment: !1,
  webManifest: {
    href: './manifest.webmanifest',
    useCredentials: !0,
    linkTag:
      '<link rel="manifest" href="./manifest.webmanifest" crossorigin="use-credentials">',
  },
};
var $e = '@vercel/analytics',
  Te = '1.0.1',
  Se = () => {
    window.va ||
      (window.va = function (...e) {
        (window.vaq = window.vaq || []).push(e);
      });
  };
function ke() {
  return typeof window < 'u';
}
function Ae() {
  try {
    const t = 'production';
  } catch {}
  return 'production';
}
function Pe(t = 'auto') {
  if (t === 'auto') {
    window.vam = Ae();
    return;
  }
  window.vam = t;
}
function De() {
  return window.vam || 'production';
}
function St() {
  return De() === 'development';
}
function Oe(t = { debug: !0 }) {
  var e;
  if (!ke()) return;
  Pe(t.mode),
    Se(),
    t.beforeSend &&
      ((e = window.va) == null || e.call(window, 'beforeSend', t.beforeSend));
  const o = St()
    ? 'https://va.vercel-scripts.com/v1/script.debug.js'
    : '/_vercel/insights/script.js';
  if (document.head.querySelector(`script[src*="${o}"]`)) return;
  const n = document.createElement('script');
  (n.src = o),
    (n.defer = !0),
    n.setAttribute('data-sdkn', $e),
    n.setAttribute('data-sdkv', Te),
    St() && t.debug === !1 && n.setAttribute('data-debug', 'false'),
    document.head.appendChild(n);
}
function kt(t) {
  let e, o;
  return (
    (e = new Le({})),
    {
      c() {
        te(e.$$.fragment);
      },
      l(n) {
        ee(e.$$.fragment, n);
      },
      m(n, r) {
        ne(e, n, r), (o = !0);
      },
      i(n) {
        o || (G(e.$$.fragment, n), (o = !0));
      },
      o(n) {
        tt(e.$$.fragment, n), (o = !1);
      },
      d(n) {
        oe(e, n);
      },
    }
  );
}
function Ce(t) {
  let e, o, n, r, i, l;
  const c = t[3].default,
    a = jt(c, t, t[2], null);
  let s = t[0] && rt && kt();
  return {
    c() {
      a && a.c(),
        (e = xt()),
        (o = new qt(!1)),
        (n = K()),
        (r = xt()),
        s && s.c(),
        (i = K()),
        this.h();
    },
    l(f) {
      a && a.l(f), (e = bt(f));
      const u = Ut('svelte-13srx9e', document.head);
      (o = Gt(u, !1)),
        (n = K()),
        u.forEach(U),
        (r = bt(f)),
        s && s.l(f),
        (i = K()),
        this.h();
    },
    h() {
      o.a = n;
    },
    m(f, u) {
      a && a.m(f, u),
        at(f, e, u),
        o.m(t[1], document.head),
        Xt(document.head, n),
        at(f, r, u),
        s && s.m(f, u),
        at(f, i, u),
        (l = !0);
    },
    p(f, [u]) {
      a &&
        a.p &&
        (!l || u & 4) &&
        Yt(a, c, f, f[2], l ? Qt(c, f[2], u, null) : Jt(f[2]), null),
        (!l || u & 2) && o.p(f[1]),
        f[0] && rt
          ? s
            ? u & 1 && G(s, 1)
            : ((s = kt()), s.c(), G(s, 1), s.m(i.parentNode, i))
          : s &&
            (ie(),
            tt(s, 1, 1, () => {
              s = null;
            }),
            Kt());
    },
    i(f) {
      l || (G(a, f), G(s), (l = !0));
    },
    o(f) {
      tt(a, f), tt(s), (l = !1);
    },
    d(f) {
      a && a.d(f),
        f && U(e),
        U(n),
        f && o.d(),
        f && U(r),
        s && s.d(f),
        f && U(i);
    },
  };
}
function We(t, e, o) {
  let n,
    { $$slots: r = {}, $$scope: i } = e;
  re.set({
    computePosition: Re,
    autoUpdate: be,
    offset: he,
    shift: ye,
    flip: pe,
    arrow: ae,
  }),
    Oe({ mode: 'production' });
  let l = !1;
  return (
    Zt(() => {
      o(0, (l = !0));
    }),
    (t.$$set = (c) => {
      '$$scope' in c && o(2, (i = c.$$scope));
    }),
    o(1, (n = rt ? rt.webManifest.linkTag : '')),
    [l, n, i, r]
  );
}
class Ve extends At {
  constructor(e) {
    super(), Pt(this, e, We, Ce, Dt, {});
  }
}
export { Ve as component };
