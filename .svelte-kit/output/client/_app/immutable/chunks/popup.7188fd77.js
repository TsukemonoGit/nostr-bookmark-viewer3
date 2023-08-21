import { w as K } from './index.52a5fe5b.js';
import { ap as P } from './index.e81ade4b.js';
const X = K(void 0);
function G(n, e) {
  const {
      computePosition: E,
      autoUpdate: j,
      offset: h,
      shift: y,
      flip: b,
      arrow: L,
      size: $,
      autoPlacement: k,
      hide: x,
      inline: U,
    } = P(X),
    r = { open: !1, autoUpdateCleanup: () => {} },
    m =
      ':is(a[href], button, input, textarea, select, details, [tabindex]):not([tabindex="-1"])';
  let c;
  const u = 'https://www.skeleton.dev/utilities/popups';
  let t, f;
  function S() {
    (t =
      document.querySelector(`[data-popup="${e.target}"]`) ??
      document.createElement('div')),
      (f = t.querySelector('.arrow') ?? document.createElement('div'));
  }
  S();
  function p() {
    var i, s, w, F, D, C, q, I;
    if (!t)
      throw new Error(
        `The data-popup="${e.target}" element was not found. ${u}`,
      );
    if (!E)
      throw new Error(
        `Floating UI 'computePosition' not found for data-popup="${e.target}". ${u}`,
      );
    if (!h)
      throw new Error(
        `Floating UI 'offset' not found for data-popup="${e.target}". ${u}`,
      );
    if (!y)
      throw new Error(
        `Floating UI 'shift' not found for data-popup="${e.target}". ${u}`,
      );
    if (!b)
      throw new Error(
        `Floating UI 'flip' not found for data-popup="${e.target}". ${u}`,
      );
    if (!L)
      throw new Error(
        `Floating UI 'arrow' not found for data-popup="${e.target}". ${u}`,
      );
    const o = [];
    $ && o.push($((i = e.middleware) == null ? void 0 : i.size)),
      k && o.push(k((s = e.middleware) == null ? void 0 : s.autoPlacement)),
      x && o.push(x((w = e.middleware) == null ? void 0 : w.hide)),
      U && o.push(U((F = e.middleware) == null ? void 0 : F.inline)),
      E(n, t, {
        placement: e.placement ?? 'bottom',
        middleware: [
          h(((D = e.middleware) == null ? void 0 : D.offset) ?? 8),
          y(((C = e.middleware) == null ? void 0 : C.shift) ?? { padding: 8 }),
          b((q = e.middleware) == null ? void 0 : q.flip),
          L(
            ((I = e.middleware) == null ? void 0 : I.arrow) ?? {
              element: f || null,
            },
          ),
          ...o,
        ],
      }).then(({ x: z, y: M, placement: O, middlewareData: W }) => {
        if ((Object.assign(t.style, { left: `${z}px`, top: `${M}px` }), f)) {
          const { x: T, y: Q } = W.arrow,
            _ = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[
              O.split('-')[0]
            ];
          Object.assign(f.style, {
            left: T != null ? `${T}px` : '',
            top: Q != null ? `${Q}px` : '',
            right: '',
            bottom: '',
            [_]: '-4px',
          });
        }
      });
  }
  function l() {
    t &&
      ((r.open = !0),
      e.state && e.state({ state: r.open }),
      p(),
      (t.style.display = 'block'),
      (t.style.opacity = '1'),
      (t.style.pointerEvents = 'auto'),
      (r.autoUpdateCleanup = j(n, t, p)),
      (c = Array.from(t == null ? void 0 : t.querySelectorAll(m))));
  }
  function a(o) {
    if (!t) return;
    const i =
      parseFloat(
        window.getComputedStyle(t).transitionDuration.replace('s', ''),
      ) * 1e3;
    setTimeout(() => {
      (r.open = !1),
        e.state && e.state({ state: r.open }),
        (t.style.opacity = '0'),
        (t.style.pointerEvents = 'none'),
        r.autoUpdateCleanup && r.autoUpdateCleanup(),
        o && o();
    }, i);
  }
  function d() {
    r.open === !1 ? l() : a();
  }
  function v(o) {
    if (r.open === !1 || n.contains(o.target)) return;
    if (t && t.contains(o.target) === !1) {
      a();
      return;
    }
    const i = e.closeQuery === void 0 ? 'a[href], button' : e.closeQuery,
      s = t == null ? void 0 : t.querySelectorAll(i);
    s == null ||
      s.forEach((w) => {
        w.contains(o.target) && a();
      });
  }
  const A = (o) => {
    if (r.open === !1) return;
    const i = o.key;
    if (i === 'Escape') {
      o.preventDefault(), n.focus(), a();
      return;
    }
    (c = Array.from(t == null ? void 0 : t.querySelectorAll(m))),
      r.open &&
        document.activeElement === n &&
        (i === 'ArrowDown' || i === 'Tab') &&
        m.length > 0 &&
        c.length > 0 &&
        (o.preventDefault(), c[0].focus());
  };
  switch (e.event) {
    case 'click':
      n.addEventListener('click', d, !0),
        window.addEventListener('click', v, !0);
      break;
    case 'hover':
      n.addEventListener('mouseover', l, !0),
        n.addEventListener('mouseleave', () => a(), !0);
      break;
    case 'focus-blur':
      n.addEventListener('focus', d, !0),
        n.addEventListener('blur', () => a(), !0);
      break;
    case 'focus-click':
      n.addEventListener('focus', l, !0),
        window.addEventListener('click', v, !0);
      break;
    default:
      throw new Error(`Event value of '${e.event}' is not supported. ${u}`);
  }
  return (
    window.addEventListener('keydown', A, !0),
    p(),
    {
      update(o) {
        a(() => {
          (e = o), p(), S();
        });
      },
      destroy() {
        n.removeEventListener('click', d, !0),
          n.removeEventListener('mouseover', l, !0),
          n.removeEventListener('mouseleave', () => a(), !0),
          n.removeEventListener('focus', d, !0),
          n.removeEventListener('focus', l, !0),
          n.removeEventListener('blur', () => a(), !0),
          window.removeEventListener('click', v, !0),
          window.removeEventListener('keydown', A, !0);
      },
    }
  );
}
export { G as p, X as s };
