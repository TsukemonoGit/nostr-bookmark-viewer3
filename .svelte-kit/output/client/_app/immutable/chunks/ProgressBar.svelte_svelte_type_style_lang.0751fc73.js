import { w as S } from './index.52a5fe5b.js';
import { ap as _ } from './index.e81ade4b.js';
const c = {};
function m(e) {
  return e === 'local' ? localStorage : sessionStorage;
}
function g(e, w, t) {
  const o = (t == null ? void 0 : t.serializer) ?? JSON,
    u = (t == null ? void 0 : t.storage) ?? 'local';
  function f(a, n) {
    m(u).setItem(a, o.stringify(n));
  }
  if (!c[e]) {
    const a = S(w, (r) => {
        const s = m(u).getItem(e);
        s && r(o.parse(s));
        {
          const d = (l) => {
            l.key === e && r(l.newValue ? o.parse(l.newValue) : null);
          };
          return (
            window.addEventListener('storage', d),
            () => window.removeEventListener('storage', d)
          );
        }
      }),
      { subscribe: n, set: i } = a;
    c[e] = {
      set(r) {
        f(e, r), i(r);
      },
      update(r) {
        const s = r(_(a));
        f(e, s), i(s);
      },
      subscribe: n,
    };
  }
  return c[e];
}
g('modeOsPrefers', !1);
g('modeUserPrefers', void 0);
g('modeCurrent', !1);
