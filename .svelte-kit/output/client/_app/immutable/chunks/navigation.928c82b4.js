var Du = Object.defineProperty;
var ju = (e, t, n) =>
  t in e
    ? Du(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var Ue = (e, t, n) => (ju(e, typeof t != 'symbol' ? t + '' : t, n), n);
import { w as $u } from './index.52a5fe5b.js';
import {
  aq as qu,
  ar as ji,
  X as Fn,
  a6 as Mu,
  S as zu,
  i as Vu,
  s as Ku,
  k as Wu,
  as as Un,
  l as Fu,
  m as tn,
  at as Hn,
  h as At,
  n as U,
  p as An,
  a2 as $i,
  b as Ms,
  F as Kr,
  g as Dn,
  v as Zu,
  d as mo,
  f as Gu,
  Z as Ju,
  j as Yu,
  Y as qi,
  C as Xu,
  G as Qu,
  I as el,
  J as tl,
} from './index.e81ade4b.js';
import { j as nl } from './singletons.2b260291.js';
const rl = { message: 'Missing Toast Message', autohide: !0, timeout: 5e3 };
function ol() {
  const e = Math.random();
  return Number(e).toString(32);
}
function Mi(e) {
  if (e.autohide === !0)
    return setTimeout(() => {
      sl.close(e.id);
    }, e.timeout);
}
function il() {
  const { subscribe: e, set: t, update: n } = $u([]);
  return {
    subscribe: e,
    trigger: (r) => {
      const o = ol();
      return (
        n((i) => {
          r && r.callback && r.callback({ id: o, status: 'queued' }),
            r.hideDismiss && (r.autohide = !0);
          const s = { ...rl, ...r, id: o };
          return (s.timeoutId = Mi(s)), i.push(s), i;
        }),
        o
      );
    },
    close: (r) =>
      n((o) => {
        if (o.length > 0) {
          const i = o.findIndex((a) => a.id === r),
            s = o[i];
          s &&
            (s.callback && s.callback({ id: r, status: 'closed' }),
            s.timeoutId && clearTimeout(s.timeoutId),
            o.splice(i, 1));
        }
        return o;
      }),
    freeze: (r) => n((o) => (o.length > 0 && clearTimeout(o[r].timeoutId), o)),
    unfreeze: (r) => n((o) => (o.length > 0 && (o[r].timeoutId = Mi(o[r])), o)),
    clear: () => t([]),
  };
}
const sl = il();
function wm(e) {
  return e < 0.5 ? 4 * e * e * e : 0.5 * Math.pow(2 * e - 2, 3) + 1;
}
function zs(e) {
  const t = e - 1;
  return t * t * t + 1;
}
function al(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
        (n[r[o]] = e[r[o]]);
  return n;
}
function vm(e, { delay: t = 0, duration: n = 400, easing: r = qu } = {}) {
  const o = +getComputedStyle(e).opacity;
  return { delay: t, duration: n, easing: r, css: (i) => `opacity: ${i * o}` };
}
function Em(
  e,
  {
    delay: t = 0,
    duration: n = 400,
    easing: r = zs,
    x: o = 0,
    y: i = 0,
    opacity: s = 0,
  } = {},
) {
  const a = getComputedStyle(e),
    c = +a.opacity,
    u = a.transform === 'none' ? '' : a.transform,
    f = c * (1 - s),
    [l, h] = ji(o),
    [y, p] = ji(i);
  return {
    delay: t,
    duration: n,
    easing: r,
    css: (d, m) => `
			transform: ${u} translate(${(1 - d) * l}${h}, ${(1 - d) * y}${p});
			opacity: ${c - f * m}`,
  };
}
function xm(e) {
  var { fallback: t } = e,
    n = al(e, ['fallback']);
  const r = new Map(),
    o = new Map();
  function i(a, c, u) {
    const {
        delay: f = 0,
        duration: l = (A) => Math.sqrt(A) * 30,
        easing: h = zs,
      } = Fn(Fn({}, n), u),
      y = a.getBoundingClientRect(),
      p = c.getBoundingClientRect(),
      d = y.left - p.left,
      m = y.top - p.top,
      b = y.width / p.width,
      g = y.height / p.height,
      w = Math.sqrt(d * d + m * m),
      E = getComputedStyle(c),
      S = E.transform === 'none' ? '' : E.transform,
      v = +E.opacity;
    return {
      delay: f,
      duration: Mu(l) ? l(w) : l,
      easing: h,
      css: (A, k) => `
				opacity: ${A * v};
				transform-origin: top left;
				transform: ${S} translate(${k * d}px,${k * m}px) scale(${A + (1 - A) * b}, ${
          A + (1 - A) * g
        });
			`,
    };
  }
  function s(a, c, u) {
    return (f, l) => (
      a.set(l.key, f),
      () => {
        if (c.has(l.key)) {
          const h = c.get(l.key);
          return c.delete(l.key), i(h, f, l);
        }
        return a.delete(l.key), t && t(f, l, u);
      }
    );
  }
  return [s(o, r, !1), s(r, o, !0)];
}
function zi(e) {
  let t, n, r;
  const o = e[13].default,
    i = Xu(o, e, e[12], null);
  return {
    c() {
      (t = Un('text')), i && i.c(), this.h();
    },
    l(s) {
      t = Hn(s, 'text', {
        x: !0,
        y: !0,
        'text-anchor': !0,
        'dominant-baseline': !0,
        'font-weight': !0,
        'font-size': !0,
        class: !0,
      });
      var a = tn(t);
      i && i.l(a), a.forEach(At), this.h();
    },
    h() {
      U(t, 'x', '50%'),
        U(t, 'y', '50%'),
        U(t, 'text-anchor', 'middle'),
        U(t, 'dominant-baseline', 'middle'),
        U(t, 'font-weight', 'bold'),
        U(t, 'font-size', e[2]),
        U(t, 'class', (n = 'progress-radial-text ' + e[5]));
    },
    m(s, a) {
      Ms(s, t, a), i && i.m(t, null), (r = !0);
    },
    p(s, a) {
      i &&
        i.p &&
        (!r || a & 4096) &&
        Qu(i, o, s, s[12], r ? tl(o, s[12], a, null) : el(s[12]), null),
        (!r || a & 4) && U(t, 'font-size', s[2]),
        (!r || (a & 32 && n !== (n = 'progress-radial-text ' + s[5]))) &&
          U(t, 'class', n);
    },
    i(s) {
      r || (Dn(i, s), (r = !0));
    },
    o(s) {
      mo(i, s), (r = !1);
    },
    d(s) {
      s && At(t), i && i.d(s);
    },
  };
}
function cl(e) {
  let t,
    n,
    r,
    o,
    i,
    s,
    a = `${e[7]}
			${e[7]}`,
    c,
    u,
    f,
    l,
    h = e[0] != null && e[0] >= 0 && e[10].default && zi(e);
  return {
    c() {
      (t = Wu('figure')),
        (n = Un('svg')),
        (r = Un('circle')),
        (i = Un('circle')),
        h && h.c(),
        this.h();
    },
    l(y) {
      t = Fu(y, 'FIGURE', {
        class: !0,
        'data-testid': !0,
        role: !0,
        'aria-labelledby': !0,
        'aria-valuenow': !0,
        'aria-valuetext': !0,
        'aria-valuemin': !0,
        'aria-valuemax': !0,
      });
      var p = tn(t);
      n = Hn(p, 'svg', { viewBox: !0, class: !0 });
      var d = tn(n);
      (r = Hn(d, 'circle', {
        class: !0,
        'stroke-width': !0,
        r: !0,
        cx: !0,
        cy: !0,
      })),
        tn(r).forEach(At),
        (i = Hn(d, 'circle', {
          class: !0,
          'stroke-width': !0,
          r: !0,
          cx: !0,
          cy: !0,
        })),
        tn(i).forEach(At),
        h && h.l(d),
        d.forEach(At),
        p.forEach(At),
        this.h();
    },
    h() {
      U(r, 'class', (o = 'progress-radial-track ' + Vi + ' ' + e[4])),
        U(r, 'stroke-width', e[1]),
        U(r, 'r', nn / 2),
        U(r, 'cx', '50%'),
        U(r, 'cy', '50%'),
        U(i, 'class', (s = 'progress-radial-meter ' + Ki + ' ' + e[3])),
        U(i, 'stroke-width', e[1]),
        U(i, 'r', nn / 2),
        U(i, 'cx', '50%'),
        U(i, 'cy', '50%'),
        An(i, 'stroke-dasharray', a),
        An(i, 'stroke-dashoffset', e[8]),
        U(n, 'viewBox', '0 0 ' + nn + ' ' + nn),
        U(n, 'class', 'rounded-full'),
        $i(n, 'animate-spin', e[0] === void 0),
        U(t, 'class', (c = 'progress-radial ' + e[9])),
        U(t, 'data-testid', 'progress-radial'),
        U(t, 'role', 'meter'),
        U(t, 'aria-labelledby', e[6]),
        U(t, 'aria-valuenow', (u = e[0] || 0)),
        U(
          t,
          'aria-valuetext',
          (f = e[0] ? `${e[0]}%` : 'Indeterminate Spinner'),
        ),
        U(t, 'aria-valuemin', 0),
        U(t, 'aria-valuemax', 100);
    },
    m(y, p) {
      Ms(y, t, p), Kr(t, n), Kr(n, r), Kr(n, i), h && h.m(n, null), (l = !0);
    },
    p(y, [p]) {
      (!l ||
        (p & 16 && o !== (o = 'progress-radial-track ' + Vi + ' ' + y[4]))) &&
        U(r, 'class', o),
        (!l || p & 2) && U(r, 'stroke-width', y[1]),
        (!l ||
          (p & 8 && s !== (s = 'progress-radial-meter ' + Ki + ' ' + y[3]))) &&
          U(i, 'class', s),
        (!l || p & 2) && U(i, 'stroke-width', y[1]),
        p & 128 &&
          a !==
            (a = `${y[7]}
			${y[7]}`) &&
          An(i, 'stroke-dasharray', a),
        p & 256 && An(i, 'stroke-dashoffset', y[8]),
        y[0] != null && y[0] >= 0 && y[10].default
          ? h
            ? (h.p(y, p), p & 1025 && Dn(h, 1))
            : ((h = zi(y)), h.c(), Dn(h, 1), h.m(n, null))
          : h &&
            (Zu(),
            mo(h, 1, 1, () => {
              h = null;
            }),
            Gu()),
        (!l || p & 1) && $i(n, 'animate-spin', y[0] === void 0),
        (!l || (p & 512 && c !== (c = 'progress-radial ' + y[9]))) &&
          U(t, 'class', c),
        (!l || p & 64) && U(t, 'aria-labelledby', y[6]),
        (!l || (p & 1 && u !== (u = y[0] || 0))) && U(t, 'aria-valuenow', u),
        (!l ||
          (p & 1 && f !== (f = y[0] ? `${y[0]}%` : 'Indeterminate Spinner'))) &&
          U(t, 'aria-valuetext', f);
    },
    i(y) {
      l || (Dn(h), (l = !0));
    },
    o(y) {
      mo(h), (l = !1);
    },
    d(y) {
      y && At(t), h && h.d();
    },
  };
}
const ul = 'progress-radial relative overflow-hidden',
  Vi = 'fill-transparent',
  Ki =
    'fill-transparent transition-[stroke-dashoffset] duration-200 -rotate-90 origin-[50%_50%]',
  nn = 512;
function ll(e, t, n) {
  let r,
    { $$slots: o = {}, $$scope: i } = t;
  const s = Ju(o);
  let { value: a = void 0 } = t,
    { stroke: c = 40 } = t,
    { font: u = 56 } = t,
    { width: f = 'w-36' } = t,
    { meter: l = 'stroke-surface-900 dark:stroke-surface-50' } = t,
    { track: h = 'stroke-surface-500/30' } = t,
    { fill: y = 'fill-token' } = t,
    { labelledby: p = '' } = t;
  const d = nn / 2;
  let m = d,
    b;
  function g(w) {
    n(7, (m = d * 2 * Math.PI)), n(8, (b = m - (w / 100) * m));
  }
  return (
    g(0),
    Yu(() => {
      g(a === void 0 ? 25 : a);
    }),
    (e.$$set = (w) => {
      n(16, (t = Fn(Fn({}, t), qi(w)))),
        'value' in w && n(0, (a = w.value)),
        'stroke' in w && n(1, (c = w.stroke)),
        'font' in w && n(2, (u = w.font)),
        'width' in w && n(11, (f = w.width)),
        'meter' in w && n(3, (l = w.meter)),
        'track' in w && n(4, (h = w.track)),
        'fill' in w && n(5, (y = w.fill)),
        'labelledby' in w && n(6, (p = w.labelledby)),
        '$$scope' in w && n(12, (i = w.$$scope));
    }),
    (e.$$.update = () => {
      n(9, (r = `${ul} ${f} ${t.class ?? ''}`));
    }),
    (t = qi(t)),
    [a, c, u, l, h, y, p, m, b, r, s, f, i, o]
  );
}
class Sm extends zu {
  constructor(t) {
    super(),
      Vu(this, t, ll, cl, Ku, {
        value: 0,
        stroke: 1,
        font: 2,
        width: 11,
        meter: 3,
        track: 4,
        fill: 5,
        labelledby: 6,
      });
  }
}
function Zn(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function Vs(e) {
  if (typeof e != 'boolean') throw new Error(`Expected boolean, not ${e}`);
}
function lt(e, ...t) {
  if (!(e instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(
      `Expected Uint8Array of length ${t}, not of length=${e.length}`,
    );
}
function Ks(e) {
  if (typeof e != 'function' || typeof e.create != 'function')
    throw new Error('Hash should be wrapped by utils.wrapConstructor');
  Zn(e.outputLen), Zn(e.blockLen);
}
function Ws(e, t = !0) {
  if (e.destroyed) throw new Error('Hash instance has been destroyed');
  if (t && e.finished) throw new Error('Hash#digest() has already been called');
}
function Fs(e, t) {
  lt(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(
      `digestInto() expects output buffer of length at least ${n}`,
    );
}
const dt = {
    number: Zn,
    bool: Vs,
    bytes: lt,
    hash: Ks,
    exists: Ws,
    output: Fs,
  },
  fl = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        bool: Vs,
        bytes: lt,
        default: dt,
        exists: Ws,
        hash: Ks,
        number: Zn,
        output: Fs,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  jn =
    typeof globalThis == 'object' && 'crypto' in globalThis
      ? globalThis.crypto
      : void 0,
  dl = Object.freeze(
    Object.defineProperty({ __proto__: null, crypto: jn }, Symbol.toStringTag, {
      value: 'Module',
    }),
  );
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const hl =
    (e) => new Uint8Array(e.buffer, e.byteOffset, e.byteLength),
  pl = (e) =>
    new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)),
  Nt = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength),
  Ie = (e, t) => (e << (32 - t)) | (e >>> t),
  Zs = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Zs) throw new Error('Non little-endian hardware is not supported');
const yl = Array.from({ length: 256 }, (e, t) =>
  t.toString(16).padStart(2, '0'),
);
function we(e) {
  if (!(e instanceof Uint8Array)) throw new Error('Uint8Array expected');
  let t = '';
  for (let n = 0; n < e.length; n++) t += yl[e[n]];
  return t;
}
function bt(e) {
  if (typeof e != 'string')
    throw new TypeError('hexToBytes: expected string, got ' + typeof e);
  if (e.length % 2)
    throw new Error('hexToBytes: received invalid unpadded hex');
  const t = new Uint8Array(e.length / 2);
  for (let n = 0; n < t.length; n++) {
    const r = n * 2,
      o = e.slice(r, r + 2),
      i = Number.parseInt(o, 16);
    if (Number.isNaN(i) || i < 0) throw new Error('Invalid byte sequence');
    t[n] = i;
  }
  return t;
}
const Gs = async () => {};
async function bl(e, t, n) {
  let r = Date.now();
  for (let o = 0; o < e; o++) {
    n(o);
    const i = Date.now() - r;
    (i >= 0 && i < t) || (await Gs(), (r += i));
  }
}
function Fo(e) {
  if (typeof e != 'string')
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function gn(e) {
  if ((typeof e == 'string' && (e = Fo(e)), !(e instanceof Uint8Array)))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
function Ot(...e) {
  if (!e.every((r) => r instanceof Uint8Array))
    throw new Error('Uint8Array list expected');
  if (e.length === 1) return e[0];
  const t = e.reduce((r, o) => r + o.length, 0),
    n = new Uint8Array(t);
  for (let r = 0, o = 0; r < e.length; r++) {
    const i = e[r];
    n.set(i, o), (o += i.length);
  }
  return n;
}
class Zo {
  clone() {
    return this._cloneInto();
  }
}
const ml = (e) =>
  Object.prototype.toString.call(e) === '[object Object]' &&
  e.constructor === Object;
function gl(e, t) {
  if (t !== void 0 && (typeof t != 'object' || !ml(t)))
    throw new TypeError('Options should be object or undefined');
  return Object.assign(e, t);
}
function wt(e) {
  const t = (r) => e().update(gn(r)).digest(),
    n = e();
  return (
    (t.outputLen = n.outputLen),
    (t.blockLen = n.blockLen),
    (t.create = () => e()),
    t
  );
}
function wl(e) {
  const t = (r, o) => e(o).update(gn(r)).digest(),
    n = e({});
  return (
    (t.outputLen = n.outputLen),
    (t.blockLen = n.blockLen),
    (t.create = (r) => e(r)),
    t
  );
}
function hr(e = 32) {
  if (jn && typeof jn.getRandomValues == 'function')
    return jn.getRandomValues(new Uint8Array(e));
  throw new Error('crypto.getRandomValues must be defined');
}
const vl = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Hash: Zo,
      asyncLoop: bl,
      bytesToHex: we,
      checkOpts: gl,
      concatBytes: Ot,
      createView: Nt,
      hexToBytes: bt,
      isLE: Zs,
      nextTick: Gs,
      randomBytes: hr,
      rotr: Ie,
      toBytes: gn,
      u32: pl,
      u8: hl,
      utf8ToBytes: Fo,
      wrapConstructor: wt,
      wrapConstructorWithOpts: wl,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
function El(e, t, n, r) {
  if (typeof e.setBigUint64 == 'function') return e.setBigUint64(t, n, r);
  const o = BigInt(32),
    i = BigInt(4294967295),
    s = Number((n >> o) & i),
    a = Number(n & i),
    c = r ? 4 : 0,
    u = r ? 0 : 4;
  e.setUint32(t + c, s, r), e.setUint32(t + u, a, r);
}
class Go extends Zo {
  constructor(t, n, r, o) {
    super(),
      (this.blockLen = t),
      (this.outputLen = n),
      (this.padOffset = r),
      (this.isLE = o),
      (this.finished = !1),
      (this.length = 0),
      (this.pos = 0),
      (this.destroyed = !1),
      (this.buffer = new Uint8Array(t)),
      (this.view = Nt(this.buffer));
  }
  update(t) {
    dt.exists(this);
    const { view: n, buffer: r, blockLen: o } = this;
    t = gn(t);
    const i = t.length;
    for (let s = 0; s < i; ) {
      const a = Math.min(o - this.pos, i - s);
      if (a === o) {
        const c = Nt(t);
        for (; o <= i - s; s += o) this.process(c, s);
        continue;
      }
      r.set(t.subarray(s, s + a), this.pos),
        (this.pos += a),
        (s += a),
        this.pos === o && (this.process(n, 0), (this.pos = 0));
    }
    return (this.length += t.length), this.roundClean(), this;
  }
  digestInto(t) {
    dt.exists(this), dt.output(t, this), (this.finished = !0);
    const { buffer: n, view: r, blockLen: o, isLE: i } = this;
    let { pos: s } = this;
    (n[s++] = 128),
      this.buffer.subarray(s).fill(0),
      this.padOffset > o - s && (this.process(r, 0), (s = 0));
    for (let l = s; l < o; l++) n[l] = 0;
    El(r, o - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = Nt(t),
      c = this.outputLen;
    if (c % 4) throw new Error('_sha2: outputLen should be aligned to 32bit');
    const u = c / 4,
      f = this.get();
    if (u > f.length) throw new Error('_sha2: outputLen bigger than state');
    for (let l = 0; l < u; l++) a.setUint32(4 * l, f[l], i);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const {
      blockLen: n,
      buffer: r,
      length: o,
      finished: i,
      destroyed: s,
      pos: a,
    } = this;
    return (
      (t.length = o),
      (t.pos = a),
      (t.finished = i),
      (t.destroyed = s),
      o % n && t.buffer.set(r),
      t
    );
  }
}
const xl = (e, t, n) => (e & t) ^ (~e & n),
  Sl = (e, t, n) => (e & t) ^ (e & n) ^ (t & n),
  Al = new Uint32Array([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
  ]),
  et = new Uint32Array([
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
    528734635, 1541459225,
  ]),
  tt = new Uint32Array(64);
class Js extends Go {
  constructor() {
    super(64, 32, 8, !1),
      (this.A = et[0] | 0),
      (this.B = et[1] | 0),
      (this.C = et[2] | 0),
      (this.D = et[3] | 0),
      (this.E = et[4] | 0),
      (this.F = et[5] | 0),
      (this.G = et[6] | 0),
      (this.H = et[7] | 0);
  }
  get() {
    const { A: t, B: n, C: r, D: o, E: i, F: s, G: a, H: c } = this;
    return [t, n, r, o, i, s, a, c];
  }
  set(t, n, r, o, i, s, a, c) {
    (this.A = t | 0),
      (this.B = n | 0),
      (this.C = r | 0),
      (this.D = o | 0),
      (this.E = i | 0),
      (this.F = s | 0),
      (this.G = a | 0),
      (this.H = c | 0);
  }
  process(t, n) {
    for (let l = 0; l < 16; l++, n += 4) tt[l] = t.getUint32(n, !1);
    for (let l = 16; l < 64; l++) {
      const h = tt[l - 15],
        y = tt[l - 2],
        p = Ie(h, 7) ^ Ie(h, 18) ^ (h >>> 3),
        d = Ie(y, 17) ^ Ie(y, 19) ^ (y >>> 10);
      tt[l] = (d + tt[l - 7] + p + tt[l - 16]) | 0;
    }
    let { A: r, B: o, C: i, D: s, E: a, F: c, G: u, H: f } = this;
    for (let l = 0; l < 64; l++) {
      const h = Ie(a, 6) ^ Ie(a, 11) ^ Ie(a, 25),
        y = (f + h + xl(a, c, u) + Al[l] + tt[l]) | 0,
        d = ((Ie(r, 2) ^ Ie(r, 13) ^ Ie(r, 22)) + Sl(r, o, i)) | 0;
      (f = u),
        (u = c),
        (c = a),
        (a = (s + y) | 0),
        (s = i),
        (i = o),
        (o = r),
        (r = (y + d) | 0);
    }
    (r = (r + this.A) | 0),
      (o = (o + this.B) | 0),
      (i = (i + this.C) | 0),
      (s = (s + this.D) | 0),
      (a = (a + this.E) | 0),
      (c = (c + this.F) | 0),
      (u = (u + this.G) | 0),
      (f = (f + this.H) | 0),
      this.set(r, o, i, s, a, c, u, f);
  }
  roundClean() {
    tt.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
class _l extends Js {
  constructor() {
    super(),
      (this.A = -1056596264),
      (this.B = 914150663),
      (this.C = 812702999),
      (this.D = -150054599),
      (this.E = -4191439),
      (this.F = 1750603025),
      (this.G = 1694076839),
      (this.H = -1090891868),
      (this.outputLen = 28);
  }
}
const $e = wt(() => new Js()),
  Tl = wt(() => new _l()),
  kl = Object.freeze(
    Object.defineProperty(
      { __proto__: null, sha224: Tl, sha256: $e },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Ys =
    BigInt(0),
  pr = BigInt(1),
  Ol = BigInt(2),
  yr = (e) => e instanceof Uint8Array,
  Bl = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, '0'));
function Lt(e) {
  if (!yr(e)) throw new Error('Uint8Array expected');
  let t = '';
  for (let n = 0; n < e.length; n++) t += Bl[e[n]];
  return t;
}
function Xs(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Jo(e) {
  if (typeof e != 'string')
    throw new Error('hex string expected, got ' + typeof e);
  return BigInt(e === '' ? '0' : `0x${e}`);
}
function Ut(e) {
  if (typeof e != 'string')
    throw new Error('hex string expected, got ' + typeof e);
  if (e.length % 2)
    throw new Error('hex string is invalid: unpadded ' + e.length);
  const t = new Uint8Array(e.length / 2);
  for (let n = 0; n < t.length; n++) {
    const r = n * 2,
      o = e.slice(r, r + 2),
      i = Number.parseInt(o, 16);
    if (Number.isNaN(i) || i < 0) throw new Error('invalid byte sequence');
    t[n] = i;
  }
  return t;
}
function pe(e) {
  return Jo(Lt(e));
}
function Yo(e) {
  if (!yr(e)) throw new Error('Uint8Array expected');
  return Jo(Lt(Uint8Array.from(e).reverse()));
}
const pt = (e, t) => Ut(e.toString(16).padStart(t * 2, '0')),
  Qs = (e, t) => pt(e, t).reverse(),
  Il = (e) => Ut(Xs(e));
function se(e, t, n) {
  let r;
  if (typeof t == 'string')
    try {
      r = Ut(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (yr(t)) r = Uint8Array.from(t);
  else throw new Error(`${e} must be hex string or Uint8Array`);
  const o = r.length;
  if (typeof n == 'number' && o !== n)
    throw new Error(`${e} expected ${n} bytes, got ${o}`);
  return r;
}
function ve(...e) {
  const t = new Uint8Array(e.reduce((r, o) => r + o.length, 0));
  let n = 0;
  return (
    e.forEach((r) => {
      if (!yr(r)) throw new Error('Uint8Array expected');
      t.set(r, n), (n += r.length);
    }),
    t
  );
}
function Rl(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
function br(e) {
  if (typeof e != 'string')
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function Nl(e) {
  let t;
  for (t = 0; e > Ys; e >>= pr, t += 1);
  return t;
}
const Cl = (e, t) => (e >> BigInt(t)) & pr,
  Pl = (e, t, n) => e | ((n ? pr : Ys) << BigInt(t)),
  Xo = (e) => (Ol << BigInt(e - 1)) - pr,
  Wr = (e) => new Uint8Array(e),
  Wi = (e) => Uint8Array.from(e);
function ea(e, t, n) {
  if (typeof e != 'number' || e < 2)
    throw new Error('hashLen must be a number');
  if (typeof t != 'number' || t < 2)
    throw new Error('qByteLen must be a number');
  if (typeof n != 'function') throw new Error('hmacFn must be a function');
  let r = Wr(e),
    o = Wr(e),
    i = 0;
  const s = () => {
      r.fill(1), o.fill(0), (i = 0);
    },
    a = (...l) => n(o, r, ...l),
    c = (l = Wr()) => {
      (o = a(Wi([0]), l)),
        (r = a()),
        l.length !== 0 && ((o = a(Wi([1]), l)), (r = a()));
    },
    u = () => {
      if (i++ >= 1e3) throw new Error('drbg: tried 1000 values');
      let l = 0;
      const h = [];
      for (; l < t; ) {
        r = a();
        const y = r.slice();
        h.push(y), (l += r.length);
      }
      return ve(...h);
    };
  return (l, h) => {
    s(), c(l);
    let y;
    for (; !(y = h(u())); ) c();
    return s(), y;
  };
}
const Ll = {
  bigint: (e) => typeof e == 'bigint',
  function: (e) => typeof e == 'function',
  boolean: (e) => typeof e == 'boolean',
  string: (e) => typeof e == 'string',
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == 'function' && Number.isSafeInteger(e.outputLen),
};
function zt(e, t, n = {}) {
  const r = (o, i, s) => {
    const a = Ll[i];
    if (typeof a != 'function')
      throw new Error(`Invalid validator "${i}", expected function`);
    const c = e[o];
    if (!(s && c === void 0) && !a(c, e))
      throw new Error(
        `Invalid param ${String(o)}=${c} (${typeof c}), expected ${i}`,
      );
  };
  for (const [o, i] of Object.entries(t)) r(o, i, !1);
  for (const [o, i] of Object.entries(n)) r(o, i, !0);
  return e;
}
const Ul = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      bitGet: Cl,
      bitLen: Nl,
      bitMask: Xo,
      bitSet: Pl,
      bytesToHex: Lt,
      bytesToNumberBE: pe,
      bytesToNumberLE: Yo,
      concatBytes: ve,
      createHmacDrbg: ea,
      ensureBytes: se,
      equalBytes: Rl,
      hexToBytes: Ut,
      hexToNumber: Jo,
      numberToBytesBE: pt,
      numberToBytesLE: Qs,
      numberToHexUnpadded: Xs,
      numberToVarBytesBE: Il,
      utf8ToBytes: br,
      validateObject: zt,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const ne =
    BigInt(0),
  K = BigInt(1),
  _t = BigInt(2),
  Hl = BigInt(3),
  go = BigInt(4),
  Fi = BigInt(5),
  Zi = BigInt(8);
BigInt(9);
BigInt(16);
function X(e, t) {
  const n = e % t;
  return n >= ne ? n : t + n;
}
function Dl(e, t, n) {
  if (n <= ne || t < ne) throw new Error('Expected power/modulo > 0');
  if (n === K) return ne;
  let r = K;
  for (; t > ne; ) t & K && (r = (r * e) % n), (e = (e * e) % n), (t >>= K);
  return r;
}
function Ae(e, t, n) {
  let r = e;
  for (; t-- > ne; ) (r *= r), (r %= n);
  return r;
}
function wo(e, t) {
  if (e === ne || t <= ne)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = X(e, t),
    r = t,
    o = ne,
    i = K;
  for (; n !== ne; ) {
    const a = r / n,
      c = r % n,
      u = o - i * a;
    (r = n), (n = c), (o = i), (i = u);
  }
  if (r !== K) throw new Error('invert: does not exist');
  return X(o, t);
}
function jl(e) {
  const t = (e - K) / _t;
  let n, r, o;
  for (n = e - K, r = 0; n % _t === ne; n /= _t, r++);
  for (o = _t; o < e && Dl(o, t, e) !== e - K; o++);
  if (r === 1) {
    const s = (e + K) / go;
    return function (c, u) {
      const f = c.pow(u, s);
      if (!c.eql(c.sqr(f), u)) throw new Error('Cannot find square root');
      return f;
    };
  }
  const i = (n + K) / _t;
  return function (a, c) {
    if (a.pow(c, t) === a.neg(a.ONE))
      throw new Error('Cannot find square root');
    let u = r,
      f = a.pow(a.mul(a.ONE, o), n),
      l = a.pow(c, i),
      h = a.pow(c, n);
    for (; !a.eql(h, a.ONE); ) {
      if (a.eql(h, a.ZERO)) return a.ZERO;
      let y = 1;
      for (let d = a.sqr(h); y < u && !a.eql(d, a.ONE); y++) d = a.sqr(d);
      const p = a.pow(f, K << BigInt(u - y - 1));
      (f = a.sqr(p)), (l = a.mul(l, p)), (h = a.mul(h, f)), (u = y);
    }
    return l;
  };
}
function $l(e) {
  if (e % go === Hl) {
    const t = (e + K) / go;
    return function (r, o) {
      const i = r.pow(o, t);
      if (!r.eql(r.sqr(i), o)) throw new Error('Cannot find square root');
      return i;
    };
  }
  if (e % Zi === Fi) {
    const t = (e - Fi) / Zi;
    return function (r, o) {
      const i = r.mul(o, _t),
        s = r.pow(i, t),
        a = r.mul(o, s),
        c = r.mul(r.mul(a, _t), s),
        u = r.mul(a, r.sub(c, r.ONE));
      if (!r.eql(r.sqr(u), o)) throw new Error('Cannot find square root');
      return u;
    };
  }
  return jl(e);
}
const ql = [
  'create',
  'isValid',
  'is0',
  'neg',
  'inv',
  'sqrt',
  'sqr',
  'eql',
  'add',
  'sub',
  'mul',
  'pow',
  'div',
  'addN',
  'subN',
  'mulN',
  'sqrN',
];
function ta(e) {
  const t = {
      ORDER: 'bigint',
      MASK: 'bigint',
      BYTES: 'isSafeInteger',
      BITS: 'isSafeInteger',
    },
    n = ql.reduce((r, o) => ((r[o] = 'function'), r), t);
  return zt(e, n);
}
function Ml(e, t, n) {
  if (n < ne) throw new Error('Expected power > 0');
  if (n === ne) return e.ONE;
  if (n === K) return t;
  let r = e.ONE,
    o = t;
  for (; n > ne; ) n & K && (r = e.mul(r, o)), (o = e.sqr(o)), (n >>= K);
  return r;
}
function zl(e, t) {
  const n = new Array(t.length),
    r = t.reduce(
      (i, s, a) => (e.is0(s) ? i : ((n[a] = i), e.mul(i, s))),
      e.ONE,
    ),
    o = e.inv(r);
  return (
    t.reduceRight(
      (i, s, a) => (e.is0(s) ? i : ((n[a] = e.mul(i, n[a])), e.mul(i, s))),
      o,
    ),
    n
  );
}
function Qo(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length,
    r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function Vl(e, t, n = !1, r = {}) {
  if (e <= ne) throw new Error(`Expected Fp ORDER > 0, got ${e}`);
  const { nBitLength: o, nByteLength: i } = Qo(e, t);
  if (i > 2048)
    throw new Error('Field lengths over 2048 bytes are not supported');
  const s = $l(e),
    a = Object.freeze({
      ORDER: e,
      BITS: o,
      BYTES: i,
      MASK: Xo(o),
      ZERO: ne,
      ONE: K,
      create: (c) => X(c, e),
      isValid: (c) => {
        if (typeof c != 'bigint')
          throw new Error(
            `Invalid field element: expected bigint, got ${typeof c}`,
          );
        return ne <= c && c < e;
      },
      is0: (c) => c === ne,
      isOdd: (c) => (c & K) === K,
      neg: (c) => X(-c, e),
      eql: (c, u) => c === u,
      sqr: (c) => X(c * c, e),
      add: (c, u) => X(c + u, e),
      sub: (c, u) => X(c - u, e),
      mul: (c, u) => X(c * u, e),
      pow: (c, u) => Ml(a, c, u),
      div: (c, u) => X(c * wo(u, e), e),
      sqrN: (c) => c * c,
      addN: (c, u) => c + u,
      subN: (c, u) => c - u,
      mulN: (c, u) => c * u,
      inv: (c) => wo(c, e),
      sqrt: r.sqrt || ((c) => s(a, c)),
      invertBatch: (c) => zl(a, c),
      cmov: (c, u, f) => (f ? u : c),
      toBytes: (c) => (n ? Qs(c, i) : pt(c, i)),
      fromBytes: (c) => {
        if (c.length !== i)
          throw new Error(`Fp.fromBytes: expected ${i}, got ${c.length}`);
        return n ? Yo(c) : pe(c);
      },
    });
  return Object.freeze(a);
}
function Kl(e, t, n = !1) {
  e = se('privateHash', e);
  const r = e.length,
    o = Qo(t).nByteLength + 8;
  if (o < 24 || r < o || r > 1024)
    throw new Error(
      `hashToPrivateScalar: expected ${o}-1024 bytes of input, got ${r}`,
    );
  const i = n ? Yo(e) : pe(e);
  return X(i, t - K) + K;
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Wl =
    BigInt(0),
  Fr = BigInt(1);
function Fl(e, t) {
  const n = (o, i) => {
      const s = i.negate();
      return o ? s : i;
    },
    r = (o) => {
      const i = Math.ceil(t / o) + 1,
        s = 2 ** (o - 1);
      return { windows: i, windowSize: s };
    };
  return {
    constTimeNegate: n,
    unsafeLadder(o, i) {
      let s = e.ZERO,
        a = o;
      for (; i > Wl; ) i & Fr && (s = s.add(a)), (a = a.double()), (i >>= Fr);
      return s;
    },
    precomputeWindow(o, i) {
      const { windows: s, windowSize: a } = r(i),
        c = [];
      let u = o,
        f = u;
      for (let l = 0; l < s; l++) {
        (f = u), c.push(f);
        for (let h = 1; h < a; h++) (f = f.add(u)), c.push(f);
        u = f.double();
      }
      return c;
    },
    wNAF(o, i, s) {
      const { windows: a, windowSize: c } = r(o);
      let u = e.ZERO,
        f = e.BASE;
      const l = BigInt(2 ** o - 1),
        h = 2 ** o,
        y = BigInt(o);
      for (let p = 0; p < a; p++) {
        const d = p * c;
        let m = Number(s & l);
        (s >>= y), m > c && ((m -= h), (s += Fr));
        const b = d,
          g = d + Math.abs(m) - 1,
          w = p % 2 !== 0,
          E = m < 0;
        m === 0 ? (f = f.add(n(w, i[b]))) : (u = u.add(n(E, i[g])));
      }
      return { p: u, f };
    },
    wNAFCached(o, i, s, a) {
      const c = o._WINDOW_SIZE || 1;
      let u = i.get(o);
      return (
        u || ((u = this.precomputeWindow(o, c)), c !== 1 && i.set(o, a(u))),
        this.wNAF(c, u, s)
      );
    },
  };
}
function na(e) {
  return (
    ta(e.Fp),
    zt(
      e,
      { n: 'bigint', h: 'bigint', Gx: 'field', Gy: 'field' },
      { nBitLength: 'isSafeInteger', nByteLength: 'isSafeInteger' },
    ),
    Object.freeze({ ...Qo(e.n, e.nBitLength), ...e, p: e.Fp.ORDER })
  );
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function Zl(
  e,
) {
  const t = na(e);
  zt(
    t,
    { a: 'field', b: 'field' },
    {
      allowedPrivateKeyLengths: 'array',
      wrapPrivateKey: 'boolean',
      isTorsionFree: 'function',
      clearCofactor: 'function',
      allowInfinityPoint: 'boolean',
      fromBytes: 'function',
      toBytes: 'function',
    },
  );
  const { endo: n, Fp: r, a: o } = t;
  if (n) {
    if (!r.eql(o, r.ZERO))
      throw new Error(
        'Endomorphism can only be defined for Koblitz curves that have a=0',
      );
    if (
      typeof n != 'object' ||
      typeof n.beta != 'bigint' ||
      typeof n.splitScalar != 'function'
    )
      throw new Error(
        'Expected endomorphism with beta: bigint and splitScalar: function',
      );
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: Gl, hexToBytes: Jl } = Ul,
  Bt = {
    Err: class extends Error {
      constructor(t = '') {
        super(t);
      }
    },
    _parseInt(e) {
      const { Err: t } = Bt;
      if (e.length < 2 || e[0] !== 2)
        throw new t('Invalid signature integer tag');
      const n = e[1],
        r = e.subarray(2, n + 2);
      if (!n || r.length !== n)
        throw new t('Invalid signature integer: wrong length');
      if (r[0] & 128) throw new t('Invalid signature integer: negative');
      if (r[0] === 0 && !(r[1] & 128))
        throw new t('Invalid signature integer: unnecessary leading zero');
      return { d: Gl(r), l: e.subarray(n + 2) };
    },
    toSig(e) {
      const { Err: t } = Bt,
        n = typeof e == 'string' ? Jl(e) : e;
      if (!(n instanceof Uint8Array)) throw new Error('ui8a expected');
      let r = n.length;
      if (r < 2 || n[0] != 48) throw new t('Invalid signature tag');
      if (n[1] !== r - 2) throw new t('Invalid signature: incorrect length');
      const { d: o, l: i } = Bt._parseInt(n.subarray(2)),
        { d: s, l: a } = Bt._parseInt(i);
      if (a.length) throw new t('Invalid signature: left bytes after parsing');
      return { r: o, s };
    },
    hexFromSig(e) {
      const t = (u) => (Number.parseInt(u[0], 16) & 8 ? '00' + u : u),
        n = (u) => {
          const f = u.toString(16);
          return f.length & 1 ? `0${f}` : f;
        },
        r = t(n(e.s)),
        o = t(n(e.r)),
        i = r.length / 2,
        s = o.length / 2,
        a = n(i),
        c = n(s);
      return `30${n(s + i + 4)}02${c}${o}02${a}${r}`;
    },
  },
  Re = BigInt(0),
  F = BigInt(1),
  Ke = BigInt(2),
  Gn = BigInt(3),
  Gi = BigInt(4);
function Yl(e) {
  const t = Zl(e),
    { Fp: n } = t,
    r =
      t.toBytes ||
      ((p, d, m) => {
        const b = d.toAffine();
        return ve(Uint8Array.from([4]), n.toBytes(b.x), n.toBytes(b.y));
      }),
    o =
      t.fromBytes ||
      ((p) => {
        const d = p.subarray(1),
          m = n.fromBytes(d.subarray(0, n.BYTES)),
          b = n.fromBytes(d.subarray(n.BYTES, 2 * n.BYTES));
        return { x: m, y: b };
      });
  function i(p) {
    const { a: d, b: m } = t,
      b = n.sqr(p),
      g = n.mul(b, p);
    return n.add(n.add(g, n.mul(p, d)), m);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error('bad generator point: equation left != right');
  function s(p) {
    return typeof p == 'bigint' && Re < p && p < t.n;
  }
  function a(p) {
    if (!s(p)) throw new Error('Expected valid bigint: 0 < bigint < curve.n');
  }
  function c(p) {
    const {
      allowedPrivateKeyLengths: d,
      nByteLength: m,
      wrapPrivateKey: b,
      n: g,
    } = t;
    if (d && typeof p != 'bigint') {
      if (
        (p instanceof Uint8Array && (p = Lt(p)),
        typeof p != 'string' || !d.includes(p.length))
      )
        throw new Error('Invalid key');
      p = p.padStart(m * 2, '0');
    }
    let w;
    try {
      w = typeof p == 'bigint' ? p : pe(se('private key', p, m));
    } catch {
      throw new Error(
        `private key must be ${m} bytes, hex or bigint, not ${typeof p}`,
      );
    }
    return b && (w = X(w, g)), a(w), w;
  }
  const u = new Map();
  function f(p) {
    if (!(p instanceof l)) throw new Error('ProjectivePoint expected');
  }
  class l {
    constructor(d, m, b) {
      if (
        ((this.px = d),
        (this.py = m),
        (this.pz = b),
        d == null || !n.isValid(d))
      )
        throw new Error('x required');
      if (m == null || !n.isValid(m)) throw new Error('y required');
      if (b == null || !n.isValid(b)) throw new Error('z required');
    }
    static fromAffine(d) {
      const { x: m, y: b } = d || {};
      if (!d || !n.isValid(m) || !n.isValid(b))
        throw new Error('invalid affine point');
      if (d instanceof l) throw new Error('projective point not allowed');
      const g = (w) => n.eql(w, n.ZERO);
      return g(m) && g(b) ? l.ZERO : new l(m, b, n.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(d) {
      const m = n.invertBatch(d.map((b) => b.pz));
      return d.map((b, g) => b.toAffine(m[g])).map(l.fromAffine);
    }
    static fromHex(d) {
      const m = l.fromAffine(o(se('pointHex', d)));
      return m.assertValidity(), m;
    }
    static fromPrivateKey(d) {
      return l.BASE.multiply(c(d));
    }
    _setWindowSize(d) {
      (this._WINDOW_SIZE = d), u.delete(this);
    }
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint) return;
        throw new Error('bad point: ZERO');
      }
      const { x: d, y: m } = this.toAffine();
      if (!n.isValid(d) || !n.isValid(m))
        throw new Error('bad point: x or y not FE');
      const b = n.sqr(m),
        g = i(d);
      if (!n.eql(b, g)) throw new Error('bad point: equation left != right');
      if (!this.isTorsionFree())
        throw new Error('bad point: not in prime-order subgroup');
    }
    hasEvenY() {
      const { y: d } = this.toAffine();
      if (n.isOdd) return !n.isOdd(d);
      throw new Error("Field doesn't support isOdd");
    }
    equals(d) {
      f(d);
      const { px: m, py: b, pz: g } = this,
        { px: w, py: E, pz: S } = d,
        v = n.eql(n.mul(m, S), n.mul(w, g)),
        A = n.eql(n.mul(b, S), n.mul(E, g));
      return v && A;
    }
    negate() {
      return new l(this.px, n.neg(this.py), this.pz);
    }
    double() {
      const { a: d, b: m } = t,
        b = n.mul(m, Gn),
        { px: g, py: w, pz: E } = this;
      let S = n.ZERO,
        v = n.ZERO,
        A = n.ZERO,
        k = n.mul(g, g),
        R = n.mul(w, w),
        I = n.mul(E, E),
        O = n.mul(g, w);
      return (
        (O = n.add(O, O)),
        (A = n.mul(g, E)),
        (A = n.add(A, A)),
        (S = n.mul(d, A)),
        (v = n.mul(b, I)),
        (v = n.add(S, v)),
        (S = n.sub(R, v)),
        (v = n.add(R, v)),
        (v = n.mul(S, v)),
        (S = n.mul(O, S)),
        (A = n.mul(b, A)),
        (I = n.mul(d, I)),
        (O = n.sub(k, I)),
        (O = n.mul(d, O)),
        (O = n.add(O, A)),
        (A = n.add(k, k)),
        (k = n.add(A, k)),
        (k = n.add(k, I)),
        (k = n.mul(k, O)),
        (v = n.add(v, k)),
        (I = n.mul(w, E)),
        (I = n.add(I, I)),
        (k = n.mul(I, O)),
        (S = n.sub(S, k)),
        (A = n.mul(I, R)),
        (A = n.add(A, A)),
        (A = n.add(A, A)),
        new l(S, v, A)
      );
    }
    add(d) {
      f(d);
      const { px: m, py: b, pz: g } = this,
        { px: w, py: E, pz: S } = d;
      let v = n.ZERO,
        A = n.ZERO,
        k = n.ZERO;
      const R = t.a,
        I = n.mul(t.b, Gn);
      let O = n.mul(m, w),
        D = n.mul(b, E),
        j = n.mul(g, S),
        V = n.add(m, b),
        x = n.add(w, E);
      (V = n.mul(V, x)),
        (x = n.add(O, D)),
        (V = n.sub(V, x)),
        (x = n.add(m, g));
      let _ = n.add(w, S);
      return (
        (x = n.mul(x, _)),
        (_ = n.add(O, j)),
        (x = n.sub(x, _)),
        (_ = n.add(b, g)),
        (v = n.add(E, S)),
        (_ = n.mul(_, v)),
        (v = n.add(D, j)),
        (_ = n.sub(_, v)),
        (k = n.mul(R, x)),
        (v = n.mul(I, j)),
        (k = n.add(v, k)),
        (v = n.sub(D, k)),
        (k = n.add(D, k)),
        (A = n.mul(v, k)),
        (D = n.add(O, O)),
        (D = n.add(D, O)),
        (j = n.mul(R, j)),
        (x = n.mul(I, x)),
        (D = n.add(D, j)),
        (j = n.sub(O, j)),
        (j = n.mul(R, j)),
        (x = n.add(x, j)),
        (O = n.mul(D, x)),
        (A = n.add(A, O)),
        (O = n.mul(_, x)),
        (v = n.mul(V, v)),
        (v = n.sub(v, O)),
        (O = n.mul(V, D)),
        (k = n.mul(_, k)),
        (k = n.add(k, O)),
        new l(v, A, k)
      );
    }
    subtract(d) {
      return this.add(d.negate());
    }
    is0() {
      return this.equals(l.ZERO);
    }
    wNAF(d) {
      return y.wNAFCached(this, u, d, (m) => {
        const b = n.invertBatch(m.map((g) => g.pz));
        return m.map((g, w) => g.toAffine(b[w])).map(l.fromAffine);
      });
    }
    multiplyUnsafe(d) {
      const m = l.ZERO;
      if (d === Re) return m;
      if ((a(d), d === F)) return this;
      const { endo: b } = t;
      if (!b) return y.unsafeLadder(this, d);
      let { k1neg: g, k1: w, k2neg: E, k2: S } = b.splitScalar(d),
        v = m,
        A = m,
        k = this;
      for (; w > Re || S > Re; )
        w & F && (v = v.add(k)),
          S & F && (A = A.add(k)),
          (k = k.double()),
          (w >>= F),
          (S >>= F);
      return (
        g && (v = v.negate()),
        E && (A = A.negate()),
        (A = new l(n.mul(A.px, b.beta), A.py, A.pz)),
        v.add(A)
      );
    }
    multiply(d) {
      a(d);
      let m = d,
        b,
        g;
      const { endo: w } = t;
      if (w) {
        const { k1neg: E, k1: S, k2neg: v, k2: A } = w.splitScalar(m);
        let { p: k, f: R } = this.wNAF(S),
          { p: I, f: O } = this.wNAF(A);
        (k = y.constTimeNegate(E, k)),
          (I = y.constTimeNegate(v, I)),
          (I = new l(n.mul(I.px, w.beta), I.py, I.pz)),
          (b = k.add(I)),
          (g = R.add(O));
      } else {
        const { p: E, f: S } = this.wNAF(m);
        (b = E), (g = S);
      }
      return l.normalizeZ([b, g])[0];
    }
    multiplyAndAddUnsafe(d, m, b) {
      const g = l.BASE,
        w = (S, v) =>
          v === Re || v === F || !S.equals(g)
            ? S.multiplyUnsafe(v)
            : S.multiply(v),
        E = w(this, m).add(w(d, b));
      return E.is0() ? void 0 : E;
    }
    toAffine(d) {
      const { px: m, py: b, pz: g } = this,
        w = this.is0();
      d == null && (d = w ? n.ONE : n.inv(g));
      const E = n.mul(m, d),
        S = n.mul(b, d),
        v = n.mul(g, d);
      if (w) return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(v, n.ONE)) throw new Error('invZ was invalid');
      return { x: E, y: S };
    }
    isTorsionFree() {
      const { h: d, isTorsionFree: m } = t;
      if (d === F) return !0;
      if (m) return m(l, this);
      throw new Error(
        'isTorsionFree() has not been declared for the elliptic curve',
      );
    }
    clearCofactor() {
      const { h: d, clearCofactor: m } = t;
      return d === F ? this : m ? m(l, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(d = !0) {
      return this.assertValidity(), r(l, this, d);
    }
    toHex(d = !0) {
      return Lt(this.toRawBytes(d));
    }
  }
  (l.BASE = new l(t.Gx, t.Gy, n.ONE)), (l.ZERO = new l(n.ZERO, n.ONE, n.ZERO));
  const h = t.nBitLength,
    y = Fl(l, t.endo ? Math.ceil(h / 2) : h);
  return {
    CURVE: t,
    ProjectivePoint: l,
    normPrivateKeyToScalar: c,
    weierstrassEquation: i,
    isWithinCurveOrder: s,
  };
}
function Xl(e) {
  const t = na(e);
  return (
    zt(
      t,
      { hash: 'hash', hmac: 'function', randomBytes: 'function' },
      { bits2int: 'function', bits2int_modN: 'function', lowS: 'boolean' },
    ),
    Object.freeze({ lowS: !0, ...t })
  );
}
function Ql(e) {
  const t = Xl(e),
    { Fp: n, n: r } = t,
    o = n.BYTES + 1,
    i = 2 * n.BYTES + 1;
  function s(x) {
    return Re < x && x < n.ORDER;
  }
  function a(x) {
    return X(x, r);
  }
  function c(x) {
    return wo(x, r);
  }
  const {
      ProjectivePoint: u,
      normPrivateKeyToScalar: f,
      weierstrassEquation: l,
      isWithinCurveOrder: h,
    } = Yl({
      ...t,
      toBytes(x, _, B) {
        const N = _.toAffine(),
          C = n.toBytes(N.x),
          L = ve;
        return B
          ? L(Uint8Array.from([_.hasEvenY() ? 2 : 3]), C)
          : L(Uint8Array.from([4]), C, n.toBytes(N.y));
      },
      fromBytes(x) {
        const _ = x.length,
          B = x[0],
          N = x.subarray(1);
        if (_ === o && (B === 2 || B === 3)) {
          const C = pe(N);
          if (!s(C)) throw new Error('Point is not on curve');
          const L = l(C);
          let q = n.sqrt(L);
          const M = (q & F) === F;
          return ((B & 1) === 1) !== M && (q = n.neg(q)), { x: C, y: q };
        } else if (_ === i && B === 4) {
          const C = n.fromBytes(N.subarray(0, n.BYTES)),
            L = n.fromBytes(N.subarray(n.BYTES, 2 * n.BYTES));
          return { x: C, y: L };
        } else
          throw new Error(
            `Point of length ${_} was invalid. Expected ${o} compressed bytes or ${i} uncompressed bytes`,
          );
      },
    }),
    y = (x) => Lt(pt(x, t.nByteLength));
  function p(x) {
    const _ = r >> F;
    return x > _;
  }
  function d(x) {
    return p(x) ? a(-x) : x;
  }
  const m = (x, _, B) => pe(x.slice(_, B));
  class b {
    constructor(_, B, N) {
      (this.r = _), (this.s = B), (this.recovery = N), this.assertValidity();
    }
    static fromCompact(_) {
      const B = t.nByteLength;
      return (
        (_ = se('compactSignature', _, B * 2)),
        new b(m(_, 0, B), m(_, B, 2 * B))
      );
    }
    static fromDER(_) {
      const { r: B, s: N } = Bt.toSig(se('DER', _));
      return new b(B, N);
    }
    assertValidity() {
      if (!h(this.r)) throw new Error('r must be 0 < r < CURVE.n');
      if (!h(this.s)) throw new Error('s must be 0 < s < CURVE.n');
    }
    addRecoveryBit(_) {
      return new b(this.r, this.s, _);
    }
    recoverPublicKey(_) {
      const { r: B, s: N, recovery: C } = this,
        L = A(se('msgHash', _));
      if (C == null || ![0, 1, 2, 3].includes(C))
        throw new Error('recovery id invalid');
      const q = C === 2 || C === 3 ? B + t.n : B;
      if (q >= n.ORDER) throw new Error('recovery id 2 or 3 invalid');
      const M = C & 1 ? '03' : '02',
        Y = u.fromHex(M + y(q)),
        oe = c(q),
        me = a(-L * oe),
        Oe = a(N * oe),
        ue = u.BASE.multiplyAndAddUnsafe(Y, me, Oe);
      if (!ue) throw new Error('point at infinify');
      return ue.assertValidity(), ue;
    }
    hasHighS() {
      return p(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new b(this.r, a(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return Ut(this.toDERHex());
    }
    toDERHex() {
      return Bt.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return Ut(this.toCompactHex());
    }
    toCompactHex() {
      return y(this.r) + y(this.s);
    }
  }
  const g = {
    isValidPrivateKey(x) {
      try {
        return f(x), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: f,
    randomPrivateKey: () => {
      const x = t.randomBytes(n.BYTES + 8),
        _ = Kl(x, r);
      return pt(_, t.nByteLength);
    },
    precompute(x = 8, _ = u.BASE) {
      return _._setWindowSize(x), _.multiply(BigInt(3)), _;
    },
  };
  function w(x, _ = !0) {
    return u.fromPrivateKey(x).toRawBytes(_);
  }
  function E(x) {
    const _ = x instanceof Uint8Array,
      B = typeof x == 'string',
      N = (_ || B) && x.length;
    return _
      ? N === o || N === i
      : B
      ? N === 2 * o || N === 2 * i
      : x instanceof u;
  }
  function S(x, _, B = !0) {
    if (E(x)) throw new Error('first arg must be private key');
    if (!E(_)) throw new Error('second arg must be public key');
    return u.fromHex(_).multiply(f(x)).toRawBytes(B);
  }
  const v =
      t.bits2int ||
      function (x) {
        const _ = pe(x),
          B = x.length * 8 - t.nBitLength;
        return B > 0 ? _ >> BigInt(B) : _;
      },
    A =
      t.bits2int_modN ||
      function (x) {
        return a(v(x));
      },
    k = Xo(t.nBitLength);
  function R(x) {
    if (typeof x != 'bigint') throw new Error('bigint expected');
    if (!(Re <= x && x < k))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return pt(x, t.nByteLength);
  }
  function I(x, _, B = O) {
    if (['recovered', 'canonical'].some((de) => de in B))
      throw new Error('sign() legacy options not supported');
    const { hash: N, randomBytes: C } = t;
    let { lowS: L, prehash: q, extraEntropy: M } = B;
    L == null && (L = !0),
      (x = se('msgHash', x)),
      q && (x = se('prehashed msgHash', N(x)));
    const Y = A(x),
      oe = f(_),
      me = [R(oe), R(Y)];
    if (M != null) {
      const de = M === !0 ? C(n.BYTES) : M;
      me.push(se('extraEntropy', de, n.BYTES));
    }
    const Oe = ve(...me),
      ue = Y;
    function Qe(de) {
      const Se = v(de);
      if (!h(Se)) return;
      const St = c(Se),
        ie = u.BASE.multiply(Se).toAffine(),
        ee = a(ie.x);
      if (ee === Re) return;
      const Be = a(St * a(ue + ee * oe));
      if (Be === Re) return;
      let Jt = (ie.x === ee ? 0 : 2) | Number(ie.y & F),
        Yt = Be;
      return L && p(Be) && ((Yt = d(Be)), (Jt ^= 1)), new b(ee, Yt, Jt);
    }
    return { seed: Oe, k2sig: Qe };
  }
  const O = { lowS: t.lowS, prehash: !1 },
    D = { lowS: t.lowS, prehash: !1 };
  function j(x, _, B = O) {
    const { seed: N, k2sig: C } = I(x, _, B);
    return ea(t.hash.outputLen, t.nByteLength, t.hmac)(N, C);
  }
  u.BASE._setWindowSize(8);
  function V(x, _, B, N = D) {
    var ie;
    const C = x;
    if (((_ = se('msgHash', _)), (B = se('publicKey', B)), 'strict' in N))
      throw new Error('options.strict was renamed to lowS');
    const { lowS: L, prehash: q } = N;
    let M, Y;
    try {
      if (typeof C == 'string' || C instanceof Uint8Array)
        try {
          M = b.fromDER(C);
        } catch (ee) {
          if (!(ee instanceof Bt.Err)) throw ee;
          M = b.fromCompact(C);
        }
      else if (
        typeof C == 'object' &&
        typeof C.r == 'bigint' &&
        typeof C.s == 'bigint'
      ) {
        const { r: ee, s: Be } = C;
        M = new b(ee, Be);
      } else throw new Error('PARSE');
      Y = u.fromHex(B);
    } catch (ee) {
      if (ee.message === 'PARSE')
        throw new Error(
          'signature must be Signature instance, Uint8Array or hex string',
        );
      return !1;
    }
    if (L && M.hasHighS()) return !1;
    q && (_ = t.hash(_));
    const { r: oe, s: me } = M,
      Oe = A(_),
      ue = c(me),
      Qe = a(Oe * ue),
      de = a(oe * ue),
      Se =
        (ie = u.BASE.multiplyAndAddUnsafe(Y, Qe, de)) == null
          ? void 0
          : ie.toAffine();
    return Se ? a(Se.x) === oe : !1;
  }
  return {
    CURVE: t,
    getPublicKey: w,
    getSharedSecret: S,
    sign: j,
    verify: V,
    ProjectivePoint: u,
    Signature: b,
    utils: g,
  };
}
function ef(e, t) {
  const n = e.ORDER;
  let r = Re;
  for (let h = n - F; h % Ke === Re; h /= Ke) r += F;
  const o = r,
    i = (n - F) / Ke ** o,
    s = (i - F) / Ke,
    a = Ke ** o - F,
    c = Ke ** (o - F),
    u = e.pow(t, i),
    f = e.pow(t, (i + F) / Ke);
  let l = (h, y) => {
    let p = u,
      d = e.pow(y, a),
      m = e.sqr(d);
    m = e.mul(m, y);
    let b = e.mul(h, m);
    (b = e.pow(b, s)), (b = e.mul(b, d)), (d = e.mul(b, y)), (m = e.mul(b, h));
    let g = e.mul(m, d);
    b = e.pow(g, c);
    let w = e.eql(b, e.ONE);
    (d = e.mul(m, f)),
      (b = e.mul(g, p)),
      (m = e.cmov(d, m, w)),
      (g = e.cmov(b, g, w));
    for (let E = o; E > F; E--) {
      let S = Ke ** (E - Ke),
        v = e.pow(g, S);
      const A = e.eql(v, e.ONE);
      (d = e.mul(m, p)),
        (p = e.mul(p, p)),
        (v = e.mul(g, p)),
        (m = e.cmov(d, m, A)),
        (g = e.cmov(v, g, A));
    }
    return { isValid: w, value: m };
  };
  if (e.ORDER % Gi === Gn) {
    const h = (e.ORDER - Gn) / Gi,
      y = e.sqrt(e.neg(t));
    l = (p, d) => {
      let m = e.sqr(d);
      const b = e.mul(p, d);
      m = e.mul(m, b);
      let g = e.pow(m, h);
      g = e.mul(g, b);
      const w = e.mul(g, y),
        E = e.mul(e.sqr(g), d),
        S = e.eql(E, p);
      let v = e.cmov(w, g, S);
      return { isValid: S, value: v };
    };
  }
  return l;
}
function tf(e, t) {
  if ((ta(e), !e.isValid(t.A) || !e.isValid(t.B) || !e.isValid(t.Z)))
    throw new Error('mapToCurveSimpleSWU: invalid opts');
  const n = ef(e, t.Z);
  if (!e.isOdd) throw new Error('Fp.isOdd is not implemented!');
  return (r) => {
    let o, i, s, a, c, u, f, l;
    (o = e.sqr(r)),
      (o = e.mul(o, t.Z)),
      (i = e.sqr(o)),
      (i = e.add(i, o)),
      (s = e.add(i, e.ONE)),
      (s = e.mul(s, t.B)),
      (a = e.cmov(t.Z, e.neg(i), !e.eql(i, e.ZERO))),
      (a = e.mul(a, t.A)),
      (i = e.sqr(s)),
      (u = e.sqr(a)),
      (c = e.mul(u, t.A)),
      (i = e.add(i, c)),
      (i = e.mul(i, s)),
      (u = e.mul(u, a)),
      (c = e.mul(u, t.B)),
      (i = e.add(i, c)),
      (f = e.mul(o, s));
    const { isValid: h, value: y } = n(i, u);
    (l = e.mul(o, r)),
      (l = e.mul(l, y)),
      (f = e.cmov(f, s, h)),
      (l = e.cmov(l, y, h));
    const p = e.isOdd(r) === e.isOdd(l);
    return (l = e.cmov(e.neg(l), l, p)), (f = e.div(f, a)), { x: f, y: l };
  };
}
function nf(e) {
  if (e instanceof Uint8Array) return e;
  if (typeof e == 'string') return br(e);
  throw new Error('DST must be Uint8Array or string');
}
const rf = pe;
function at(e, t) {
  if (e < 0 || e >= 1 << (8 * t))
    throw new Error(`bad I2OSP call: value=${e} length=${t}`);
  const n = Array.from({ length: t }).fill(0);
  for (let r = t - 1; r >= 0; r--) (n[r] = e & 255), (e >>>= 8);
  return new Uint8Array(n);
}
function of(e, t) {
  const n = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++) n[r] = e[r] ^ t[r];
  return n;
}
function sn(e) {
  if (!(e instanceof Uint8Array)) throw new Error('Uint8Array expected');
}
function ei(e) {
  if (!Number.isSafeInteger(e)) throw new Error('number expected');
}
function sf(e, t, n, r) {
  sn(e),
    sn(t),
    ei(n),
    t.length > 255 && (t = r(ve(br('H2C-OVERSIZE-DST-'), t)));
  const { outputLen: o, blockLen: i } = r,
    s = Math.ceil(n / o);
  if (s > 255) throw new Error('Invalid xmd length');
  const a = ve(t, at(t.length, 1)),
    c = at(0, i),
    u = at(n, 2),
    f = new Array(s),
    l = r(ve(c, e, u, at(0, 1), a));
  f[0] = r(ve(l, at(1, 1), a));
  for (let y = 1; y <= s; y++) {
    const p = [of(l, f[y - 1]), at(y + 1, 1), a];
    f[y] = r(ve(...p));
  }
  return ve(...f).slice(0, n);
}
function af(e, t, n, r, o) {
  if ((sn(e), sn(t), ei(n), t.length > 255)) {
    const i = Math.ceil((2 * r) / 8);
    t = o
      .create({ dkLen: i })
      .update(br('H2C-OVERSIZE-DST-'))
      .update(t)
      .digest();
  }
  if (n > 65535 || t.length > 255)
    throw new Error('expand_message_xof: invalid lenInBytes');
  return o
    .create({ dkLen: n })
    .update(e)
    .update(at(n, 2))
    .update(t)
    .update(at(t.length, 1))
    .digest();
}
function Ji(e, t, n) {
  zt(n, {
    DST: 'string',
    p: 'bigint',
    m: 'isSafeInteger',
    k: 'isSafeInteger',
    hash: 'hash',
  });
  const { p: r, k: o, m: i, hash: s, expand: a, DST: c } = n;
  sn(e), ei(t);
  const u = nf(c),
    f = r.toString(2).length,
    l = Math.ceil((f + o) / 8),
    h = t * i * l;
  let y;
  if (a === 'xmd') y = sf(e, u, h, s);
  else if (a === 'xof') y = af(e, u, h, o, s);
  else if (a === '_internal_pass') y = e;
  else throw new Error('expand must be "xmd" or "xof"');
  const p = new Array(t);
  for (let d = 0; d < t; d++) {
    const m = new Array(i);
    for (let b = 0; b < i; b++) {
      const g = l * (b + d * i),
        w = y.subarray(g, g + l);
      m[b] = X(rf(w), r);
    }
    p[d] = m;
  }
  return p;
}
function cf(e, t) {
  const n = t.map((r) => Array.from(r).reverse());
  return (r, o) => {
    const [i, s, a, c] = n.map((u) =>
      u.reduce((f, l) => e.add(e.mul(f, r), l)),
    );
    return (r = e.div(i, s)), (o = e.mul(o, e.div(a, c))), { x: r, y: o };
  };
}
function uf(e, t, n) {
  if (typeof t != 'function') throw new Error('mapToCurve() must be defined');
  return {
    hashToCurve(r, o) {
      const i = Ji(r, 2, { ...n, DST: n.DST, ...o }),
        s = e.fromAffine(t(i[0])),
        a = e.fromAffine(t(i[1])),
        c = s.add(a).clearCofactor();
      return c.assertValidity(), c;
    },
    encodeToCurve(r, o) {
      const i = Ji(r, 1, { ...n, DST: n.encodeDST, ...o }),
        s = e.fromAffine(t(i[0])).clearCofactor();
      return s.assertValidity(), s;
    },
  };
}
class ra extends Zo {
  constructor(t, n) {
    super(), (this.finished = !1), (this.destroyed = !1), dt.hash(t);
    const r = gn(n);
    if (((this.iHash = t.create()), typeof this.iHash.update != 'function'))
      throw new TypeError(
        'Expected instance of class which extends utils.Hash',
      );
    (this.blockLen = this.iHash.blockLen),
      (this.outputLen = this.iHash.outputLen);
    const o = this.blockLen,
      i = new Uint8Array(o);
    i.set(r.length > o ? t.create().update(r).digest() : r);
    for (let s = 0; s < i.length; s++) i[s] ^= 54;
    this.iHash.update(i), (this.oHash = t.create());
    for (let s = 0; s < i.length; s++) i[s] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return dt.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    dt.exists(this),
      dt.bytes(t, this.outputLen),
      (this.finished = !0),
      this.iHash.digestInto(t),
      this.oHash.update(t),
      this.oHash.digestInto(t),
      this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const {
      oHash: n,
      iHash: r,
      finished: o,
      destroyed: i,
      blockLen: s,
      outputLen: a,
    } = this;
    return (
      (t = t),
      (t.finished = o),
      (t.destroyed = i),
      (t.blockLen = s),
      (t.outputLen = a),
      (t.oHash = n._cloneInto(t.oHash)),
      (t.iHash = r._cloneInto(t.iHash)),
      t
    );
  }
  destroy() {
    (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
  }
}
const Jn = (e, t, n) => new ra(e, t).update(n).digest();
Jn.create = (e, t) => new ra(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function lf(
  e,
) {
  return { hash: e, hmac: (t, ...n) => Jn(e, t, Ot(...n)), randomBytes: hr };
}
function ff(e, t) {
  const n = (r) => Ql({ ...e, ...lf(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const mr =
    BigInt(
      '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f',
    ),
  Yn = BigInt(
    '0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141',
  ),
  oa = BigInt(1),
  Xn = BigInt(2),
  Yi = (e, t) => (e + t / Xn) / t;
function ia(e) {
  const t = mr,
    n = BigInt(3),
    r = BigInt(6),
    o = BigInt(11),
    i = BigInt(22),
    s = BigInt(23),
    a = BigInt(44),
    c = BigInt(88),
    u = (e * e * e) % t,
    f = (u * u * e) % t,
    l = (Ae(f, n, t) * f) % t,
    h = (Ae(l, n, t) * f) % t,
    y = (Ae(h, Xn, t) * u) % t,
    p = (Ae(y, o, t) * y) % t,
    d = (Ae(p, i, t) * p) % t,
    m = (Ae(d, a, t) * d) % t,
    b = (Ae(m, c, t) * m) % t,
    g = (Ae(b, a, t) * d) % t,
    w = (Ae(g, n, t) * f) % t,
    E = (Ae(w, s, t) * p) % t,
    S = (Ae(E, r, t) * u) % t,
    v = Ae(S, Xn, t);
  if (!mt.eql(mt.sqr(v), e)) throw new Error('Cannot find square root');
  return v;
}
const mt = Vl(mr, void 0, void 0, { sqrt: ia }),
  he = ff(
    {
      a: BigInt(0),
      b: BigInt(7),
      Fp: mt,
      n: Yn,
      Gx: BigInt(
        '55066263022277343669578718895168534326250603453777594175500187360389116729240',
      ),
      Gy: BigInt(
        '32670510020758816978083085130507043184471273380659243275938904335757337482424',
      ),
      h: BigInt(1),
      lowS: !0,
      endo: {
        beta: BigInt(
          '0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
        ),
        splitScalar: (e) => {
          const t = Yn,
            n = BigInt('0x3086d221a7d46bcde86c90e49284eb15'),
            r = -oa * BigInt('0xe4437ed6010e88286f547fa90abfe4c3'),
            o = BigInt('0x114ca50f7a8e2f3f657c1108d9d44cfd8'),
            i = n,
            s = BigInt('0x100000000000000000000000000000000'),
            a = Yi(i * e, t),
            c = Yi(-r * e, t);
          let u = X(e - a * n - c * o, t),
            f = X(-a * r - c * i, t);
          const l = u > s,
            h = f > s;
          if ((l && (u = t - u), h && (f = t - f), u > s || f > s))
            throw new Error('splitScalar: Endomorphism failed, k=' + e);
          return { k1neg: l, k1: u, k2neg: h, k2: f };
        },
      },
    },
    $e,
  ),
  gr = BigInt(0),
  sa = (e) => typeof e == 'bigint' && gr < e && e < mr,
  df = (e) => typeof e == 'bigint' && gr < e && e < Yn,
  Xi = {};
function Qn(e, ...t) {
  let n = Xi[e];
  if (n === void 0) {
    const r = $e(Uint8Array.from(e, (o) => o.charCodeAt(0)));
    (n = ve(r, r)), (Xi[e] = n);
  }
  return $e(ve(n, ...t));
}
const ti = (e) => e.toRawBytes(!0).slice(1),
  vo = (e) => pt(e, 32),
  Zr = (e) => X(e, mr),
  an = (e) => X(e, Yn),
  ni = he.ProjectivePoint,
  hf = (e, t, n) => ni.BASE.multiplyAndAddUnsafe(e, t, n);
function Eo(e) {
  let t = he.utils.normPrivateKeyToScalar(e),
    n = ni.fromPrivateKey(t);
  return { scalar: n.hasEvenY() ? t : an(-t), bytes: ti(n) };
}
function aa(e) {
  if (!sa(e)) throw new Error('bad x: need 0 < x < p');
  const t = Zr(e * e),
    n = Zr(t * e + BigInt(7));
  let r = ia(n);
  r % Xn !== gr && (r = Zr(-r));
  const o = new ni(e, r, oa);
  return o.assertValidity(), o;
}
function ca(...e) {
  return an(pe(Qn('BIP0340/challenge', ...e)));
}
function pf(e) {
  return Eo(e).bytes;
}
function yf(e, t, n = hr(32)) {
  const r = se('message', e),
    { bytes: o, scalar: i } = Eo(t),
    s = se('auxRand', n, 32),
    a = vo(i ^ pe(Qn('BIP0340/aux', s))),
    c = Qn('BIP0340/nonce', a, o, r),
    u = an(pe(c));
  if (u === gr) throw new Error('sign failed: k is zero');
  const { bytes: f, scalar: l } = Eo(u),
    h = ca(f, o, r),
    y = new Uint8Array(64);
  if ((y.set(f, 0), y.set(vo(an(l + h * i)), 32), !ua(y, r, o)))
    throw new Error('sign: Invalid signature produced');
  return y;
}
function ua(e, t, n) {
  const r = se('signature', e, 64),
    o = se('message', t),
    i = se('publicKey', n, 32);
  try {
    const s = aa(pe(i)),
      a = pe(r.subarray(0, 32));
    if (!sa(a)) return !1;
    const c = pe(r.subarray(32, 64));
    if (!df(c)) return !1;
    const u = ca(vo(a), ti(s), o),
      f = hf(s, c, an(-u));
    return !(!f || !f.hasEvenY() || f.toAffine().x !== a);
  } catch {
    return !1;
  }
}
const wn = {
    getPublicKey: pf,
    sign: yf,
    verify: ua,
    utils: {
      randomPrivateKey: he.utils.randomPrivateKey,
      lift_x: aa,
      pointToBytes: ti,
      numberToBytesBE: pt,
      bytesToNumberBE: pe,
      taggedHash: Qn,
      mod: X,
    },
  },
  bf = cf(
    mt,
    [
      [
        '0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7',
        '0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581',
        '0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262',
        '0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c',
      ],
      [
        '0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b',
        '0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14',
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      ],
      [
        '0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c',
        '0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3',
        '0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931',
        '0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84',
      ],
      [
        '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b',
        '0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573',
        '0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f',
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      ],
    ].map((e) => e.map((t) => BigInt(t))),
  ),
  mf = tf(mt, {
    A: BigInt(
      '0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533',
    ),
    B: BigInt('1771'),
    Z: mt.create(BigInt('-11')),
  });
uf(
  he.ProjectivePoint,
  (e) => {
    const { x: t, y: n } = mf(mt.create(e[0]));
    return bf(t, n);
  },
  {
    DST: 'secp256k1_XMD:SHA-256_SSWU_RO_',
    encodeDST: 'secp256k1_XMD:SHA-256_SSWU_NU_',
    p: mt.ORDER,
    m: 1,
    k: 128,
    expand: 'xmd',
    hash: $e,
  },
);
/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function vt(
  e,
) {
  if (!Number.isSafeInteger(e)) throw new Error(`Wrong integer: ${e}`);
}
function Pe(...e) {
  const t = (o, i) => (s) => o(i(s)),
    n = Array.from(e)
      .reverse()
      .reduce((o, i) => (o ? t(o, i.encode) : i.encode), void 0),
    r = e.reduce((o, i) => (o ? t(o, i.decode) : i.decode), void 0);
  return { encode: n, decode: r };
}
function Me(e) {
  return {
    encode: (t) => {
      if (!Array.isArray(t) || (t.length && typeof t[0] != 'number'))
        throw new Error('alphabet.encode input should be an array of numbers');
      return t.map((n) => {
        if ((vt(n), n < 0 || n >= e.length))
          throw new Error(
            `Digit index outside alphabet: ${n} (alphabet: ${e.length})`,
          );
        return e[n];
      });
    },
    decode: (t) => {
      if (!Array.isArray(t) || (t.length && typeof t[0] != 'string'))
        throw new Error('alphabet.decode input should be array of strings');
      return t.map((n) => {
        if (typeof n != 'string')
          throw new Error(`alphabet.decode: not string element=${n}`);
        const r = e.indexOf(n);
        if (r === -1) throw new Error(`Unknown letter: "${n}". Allowed: ${e}`);
        return r;
      });
    },
  };
}
function ze(e = '') {
  if (typeof e != 'string') throw new Error('join separator should be string');
  return {
    encode: (t) => {
      if (!Array.isArray(t) || (t.length && typeof t[0] != 'string'))
        throw new Error('join.encode input should be array of strings');
      for (let n of t)
        if (typeof n != 'string')
          throw new Error(`join.encode: non-string input=${n}`);
      return t.join(e);
    },
    decode: (t) => {
      if (typeof t != 'string')
        throw new Error('join.decode input should be string');
      return t.split(e);
    },
  };
}
function vn(e, t = '=') {
  if ((vt(e), typeof t != 'string'))
    throw new Error('padding chr should be string');
  return {
    encode(n) {
      if (!Array.isArray(n) || (n.length && typeof n[0] != 'string'))
        throw new Error('padding.encode input should be array of strings');
      for (let r of n)
        if (typeof r != 'string')
          throw new Error(`padding.encode: non-string input=${r}`);
      for (; (n.length * e) % 8; ) n.push(t);
      return n;
    },
    decode(n) {
      if (!Array.isArray(n) || (n.length && typeof n[0] != 'string'))
        throw new Error('padding.encode input should be array of strings');
      for (let o of n)
        if (typeof o != 'string')
          throw new Error(`padding.decode: non-string input=${o}`);
      let r = n.length;
      if ((r * e) % 8)
        throw new Error(
          'Invalid padding: string should have whole number of bytes',
        );
      for (; r > 0 && n[r - 1] === t; r--)
        if (!(((r - 1) * e) % 8))
          throw new Error('Invalid padding: string has too much padding');
      return n.slice(0, r);
    },
  };
}
function la(e) {
  if (typeof e != 'function')
    throw new Error('normalize fn should be function');
  return { encode: (t) => t, decode: (t) => e(t) };
}
function Qi(e, t, n) {
  if (t < 2)
    throw new Error(
      `convertRadix: wrong from=${t}, base cannot be less than 2`,
    );
  if (n < 2)
    throw new Error(`convertRadix: wrong to=${n}, base cannot be less than 2`);
  if (!Array.isArray(e)) throw new Error('convertRadix: data should be array');
  if (!e.length) return [];
  let r = 0;
  const o = [],
    i = Array.from(e);
  for (
    i.forEach((s) => {
      if ((vt(s), s < 0 || s >= t)) throw new Error(`Wrong integer: ${s}`);
    });
    ;

  ) {
    let s = 0,
      a = !0;
    for (let c = r; c < i.length; c++) {
      const u = i[c],
        f = t * s + u;
      if (!Number.isSafeInteger(f) || (t * s) / t !== s || f - u !== t * s)
        throw new Error('convertRadix: carry overflow');
      if (
        ((s = f % n),
        (i[c] = Math.floor(f / n)),
        !Number.isSafeInteger(i[c]) || i[c] * n + s !== f)
      )
        throw new Error('convertRadix: carry overflow');
      if (a) i[c] ? (a = !1) : (r = c);
      else continue;
    }
    if ((o.push(s), a)) break;
  }
  for (let s = 0; s < e.length - 1 && e[s] === 0; s++) o.push(0);
  return o.reverse();
}
const fa = (e, t) => (t ? fa(t, e % t) : e),
  er = (e, t) => e + (t - fa(e, t));
function xo(e, t, n, r) {
  if (!Array.isArray(e)) throw new Error('convertRadix2: data should be array');
  if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
  if (n <= 0 || n > 32) throw new Error(`convertRadix2: wrong to=${n}`);
  if (er(t, n) > 32)
    throw new Error(
      `convertRadix2: carry overflow from=${t} to=${n} carryBits=${er(t, n)}`,
    );
  let o = 0,
    i = 0;
  const s = 2 ** n - 1,
    a = [];
  for (const c of e) {
    if ((vt(c), c >= 2 ** t))
      throw new Error(`convertRadix2: invalid data word=${c} from=${t}`);
    if (((o = (o << t) | c), i + t > 32))
      throw new Error(`convertRadix2: carry overflow pos=${i} from=${t}`);
    for (i += t; i >= n; i -= n) a.push(((o >> (i - n)) & s) >>> 0);
    o &= 2 ** i - 1;
  }
  if (((o = (o << (n - i)) & s), !r && i >= t))
    throw new Error('Excess padding');
  if (!r && o) throw new Error(`Non-zero padding: ${o}`);
  return r && i > 0 && a.push(o >>> 0), a;
}
function da(e) {
  return (
    vt(e),
    {
      encode: (t) => {
        if (!(t instanceof Uint8Array))
          throw new Error('radix.encode input should be Uint8Array');
        return Qi(Array.from(t), 2 ** 8, e);
      },
      decode: (t) => {
        if (!Array.isArray(t) || (t.length && typeof t[0] != 'number'))
          throw new Error('radix.decode input should be array of strings');
        return Uint8Array.from(Qi(t, e, 2 ** 8));
      },
    }
  );
}
function Ge(e, t = !1) {
  if ((vt(e), e <= 0 || e > 32))
    throw new Error('radix2: bits should be in (0..32]');
  if (er(8, e) > 32 || er(e, 8) > 32) throw new Error('radix2: carry overflow');
  return {
    encode: (n) => {
      if (!(n instanceof Uint8Array))
        throw new Error('radix2.encode input should be Uint8Array');
      return xo(Array.from(n), 8, e, !t);
    },
    decode: (n) => {
      if (!Array.isArray(n) || (n.length && typeof n[0] != 'number'))
        throw new Error('radix2.decode input should be array of strings');
      return Uint8Array.from(xo(n, e, 8, t));
    },
  };
}
function es(e) {
  if (typeof e != 'function')
    throw new Error('unsafeWrapper fn should be function');
  return function (...t) {
    try {
      return e.apply(null, t);
    } catch {}
  };
}
function ha(e, t) {
  if ((vt(e), typeof t != 'function'))
    throw new Error('checksum fn should be function');
  return {
    encode(n) {
      if (!(n instanceof Uint8Array))
        throw new Error('checksum.encode: input should be Uint8Array');
      const r = t(n).slice(0, e),
        o = new Uint8Array(n.length + e);
      return o.set(n), o.set(r, n.length), o;
    },
    decode(n) {
      if (!(n instanceof Uint8Array))
        throw new Error('checksum.decode: input should be Uint8Array');
      const r = n.slice(0, -e),
        o = t(r).slice(0, e),
        i = n.slice(-e);
      for (let s = 0; s < e; s++)
        if (o[s] !== i[s]) throw new Error('Invalid checksum');
      return r;
    },
  };
}
const gf = {
    alphabet: Me,
    chain: Pe,
    checksum: ha,
    radix: da,
    radix2: Ge,
    join: ze,
    padding: vn,
  },
  pa = Pe(Ge(4), Me('0123456789ABCDEF'), ze('')),
  ya = Pe(Ge(5), Me('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), vn(5), ze('')),
  wf = Pe(Ge(5), Me('0123456789ABCDEFGHIJKLMNOPQRSTUV'), vn(5), ze('')),
  vf = Pe(
    Ge(5),
    Me('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
    ze(''),
    la((e) => e.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1')),
  ),
  Ht = Pe(
    Ge(6),
    Me('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
    vn(6),
    ze(''),
  ),
  ba = Pe(
    Ge(6),
    Me('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
    vn(6),
    ze(''),
  ),
  ri = (e) => Pe(da(58), Me(e), ze('')),
  cn = ri('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'),
  Ef = ri('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'),
  xf = ri('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'),
  ts = [0, 2, 3, 5, 6, 7, 9, 10, 11],
  ma = {
    encode(e) {
      let t = '';
      for (let n = 0; n < e.length; n += 8) {
        const r = e.subarray(n, n + 8);
        t += cn.encode(r).padStart(ts[r.length], '1');
      }
      return t;
    },
    decode(e) {
      let t = [];
      for (let n = 0; n < e.length; n += 11) {
        const r = e.slice(n, n + 11),
          o = ts.indexOf(r.length),
          i = cn.decode(r);
        for (let s = 0; s < i.length - o; s++)
          if (i[s] !== 0) throw new Error('base58xmr: wrong padding');
        t = t.concat(Array.from(i.slice(i.length - o)));
      }
      return Uint8Array.from(t);
    },
  },
  ga = (e) =>
    Pe(
      ha(4, (t) => e(e(t))),
      cn,
    ),
  So = Pe(Me('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), ze('')),
  ns = [996825010, 642813549, 513874426, 1027748829, 705979059];
function Xt(e) {
  const t = e >> 25;
  let n = (e & 33554431) << 5;
  for (let r = 0; r < ns.length; r++) ((t >> r) & 1) === 1 && (n ^= ns[r]);
  return n;
}
function rs(e, t, n = 1) {
  const r = e.length;
  let o = 1;
  for (let i = 0; i < r; i++) {
    const s = e.charCodeAt(i);
    if (s < 33 || s > 126) throw new Error(`Invalid prefix (${e})`);
    o = Xt(o) ^ (s >> 5);
  }
  o = Xt(o);
  for (let i = 0; i < r; i++) o = Xt(o) ^ (e.charCodeAt(i) & 31);
  for (let i of t) o = Xt(o) ^ i;
  for (let i = 0; i < 6; i++) o = Xt(o);
  return (o ^= n), So.encode(xo([o % 2 ** 30], 30, 5, !1));
}
function wa(e) {
  const t = e === 'bech32' ? 1 : 734539939,
    n = Ge(5),
    r = n.decode,
    o = n.encode,
    i = es(r);
  function s(f, l, h = 90) {
    if (typeof f != 'string')
      throw new Error(`bech32.encode prefix should be string, not ${typeof f}`);
    if (!Array.isArray(l) || (l.length && typeof l[0] != 'number'))
      throw new Error(
        `bech32.encode words should be array of numbers, not ${typeof l}`,
      );
    const y = f.length + 7 + l.length;
    if (h !== !1 && y > h)
      throw new TypeError(`Length ${y} exceeds limit ${h}`);
    return (f = f.toLowerCase()), `${f}1${So.encode(l)}${rs(f, l, t)}`;
  }
  function a(f, l = 90) {
    if (typeof f != 'string')
      throw new Error(`bech32.decode input should be string, not ${typeof f}`);
    if (f.length < 8 || (l !== !1 && f.length > l))
      throw new TypeError(
        `Wrong string length: ${f.length} (${f}). Expected (8..${l})`,
      );
    const h = f.toLowerCase();
    if (f !== h && f !== f.toUpperCase())
      throw new Error('String must be lowercase or uppercase');
    f = h;
    const y = f.lastIndexOf('1');
    if (y === 0 || y === -1)
      throw new Error(
        'Letter "1" must be present between prefix and data only',
      );
    const p = f.slice(0, y),
      d = f.slice(y + 1);
    if (d.length < 6)
      throw new Error('Data must be at least 6 characters long');
    const m = So.decode(d).slice(0, -6),
      b = rs(p, m, t);
    if (!d.endsWith(b))
      throw new Error(`Invalid checksum in ${f}: expected "${b}"`);
    return { prefix: p, words: m };
  }
  const c = es(a);
  function u(f) {
    const { prefix: l, words: h } = a(f, !1);
    return { prefix: l, words: h, bytes: r(h) };
  }
  return {
    encode: s,
    decode: a,
    decodeToBytes: u,
    decodeUnsafe: c,
    fromWords: r,
    fromWordsUnsafe: i,
    toWords: o,
  };
}
const be = wa('bech32'),
  Sf = wa('bech32m'),
  va = {
    encode: (e) => new TextDecoder().decode(e),
    decode: (e) => new TextEncoder().encode(e),
  },
  Ea = Pe(
    Ge(4),
    Me('0123456789abcdef'),
    ze(''),
    la((e) => {
      if (typeof e != 'string' || e.length % 2)
        throw new TypeError(
          `hex.decode: expected string, got ${typeof e} with length ${
            e.length
          }`,
        );
      return e.toLowerCase();
    }),
  ),
  un = {
    utf8: va,
    hex: Ea,
    base16: pa,
    base32: ya,
    base64: Ht,
    base64url: ba,
    base58: cn,
    base58xmr: ma,
  },
  xa = `Invalid encoding type. Available types: ${Object.keys(un).join(', ')}`,
  Sa = (e, t) => {
    if (typeof e != 'string' || !un.hasOwnProperty(e)) throw new TypeError(xa);
    if (!(t instanceof Uint8Array))
      throw new TypeError('bytesToString() expects Uint8Array');
    return un[e].encode(t);
  },
  Af = Sa,
  Aa = (e, t) => {
    if (!un.hasOwnProperty(e)) throw new TypeError(xa);
    if (typeof t != 'string')
      throw new TypeError('stringToBytes() expects string');
    return un[e].decode(t);
  },
  _f = Aa,
  Tf = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        assertNumber: vt,
        base16: pa,
        base32: ya,
        base32crockford: vf,
        base32hex: wf,
        base58: cn,
        base58check: ga,
        base58flickr: Ef,
        base58xmr: ma,
        base58xrp: xf,
        base64: Ht,
        base64url: ba,
        bech32: be,
        bech32m: Sf,
        bytes: _f,
        bytesToString: Sa,
        hex: Ea,
        str: Af,
        stringToBytes: Aa,
        utf8: va,
        utils: gf,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
var ht =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {};
function kf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
function Vt(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == 'function') {
    var n = function r() {
      if (this instanceof r) {
        var o = [null];
        o.push.apply(o, arguments);
        var i = Function.bind.apply(t, o);
        return new i();
      }
      return t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, '__esModule', { value: !0 }),
    Object.keys(e).forEach(function (r) {
      var o = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(
        n,
        r,
        o.get
          ? o
          : {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            },
      );
    }),
    n
  );
}
var oi = {};
Object.defineProperty(oi, '__esModule', { value: !0 });
var ii = (oi.wordlist = void 0);
ii = oi.wordlist = `abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split(`
`);
var Ee = {};
const Of = Vt(fl);
var Dt = {},
  le = {};
Object.defineProperty(le, '__esModule', { value: !0 });
le.output = le.exists = le.hash = le.bytes = le.bool = le.number = void 0;
function tr(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
le.number = tr;
function _a(e) {
  if (typeof e != 'boolean') throw new Error(`Expected boolean, not ${e}`);
}
le.bool = _a;
function si(e, ...t) {
  if (!(e instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(
      `Expected Uint8Array of length ${t}, not of length=${e.length}`,
    );
}
le.bytes = si;
function Ta(e) {
  if (typeof e != 'function' || typeof e.create != 'function')
    throw new Error('Hash should be wrapped by utils.wrapConstructor');
  tr(e.outputLen), tr(e.blockLen);
}
le.hash = Ta;
function ka(e, t = !0) {
  if (e.destroyed) throw new Error('Hash instance has been destroyed');
  if (t && e.finished) throw new Error('Hash#digest() has already been called');
}
le.exists = ka;
function Oa(e, t) {
  si(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(
      `digestInto() expects output buffer of length at least ${n}`,
    );
}
le.output = Oa;
const Bf = {
  number: tr,
  bool: _a,
  bytes: si,
  hash: Ta,
  exists: ka,
  output: Oa,
};
le.default = Bf;
var Ba = {},
  ai = {};
const If = Vt(dl);
(function (e) {
  /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ Object.defineProperty(
    e,
    '__esModule',
    { value: !0 },
  ),
    (e.randomBytes =
      e.wrapConstructorWithOpts =
      e.wrapConstructor =
      e.checkOpts =
      e.Hash =
      e.concatBytes =
      e.toBytes =
      e.utf8ToBytes =
      e.asyncLoop =
      e.nextTick =
      e.hexToBytes =
      e.bytesToHex =
      e.isLE =
      e.rotr =
      e.createView =
      e.u32 =
      e.u8 =
        void 0);
  const t = If,
    n = (E) => new Uint8Array(E.buffer, E.byteOffset, E.byteLength);
  e.u8 = n;
  const r = (E) =>
    new Uint32Array(E.buffer, E.byteOffset, Math.floor(E.byteLength / 4));
  e.u32 = r;
  const o = (E) => new DataView(E.buffer, E.byteOffset, E.byteLength);
  e.createView = o;
  const i = (E, S) => (E << (32 - S)) | (E >>> S);
  if (
    ((e.rotr = i),
    (e.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68),
    !e.isLE)
  )
    throw new Error('Non little-endian hardware is not supported');
  const s = Array.from({ length: 256 }, (E, S) =>
    S.toString(16).padStart(2, '0'),
  );
  function a(E) {
    if (!(E instanceof Uint8Array)) throw new Error('Uint8Array expected');
    let S = '';
    for (let v = 0; v < E.length; v++) S += s[E[v]];
    return S;
  }
  e.bytesToHex = a;
  function c(E) {
    if (typeof E != 'string')
      throw new TypeError('hexToBytes: expected string, got ' + typeof E);
    if (E.length % 2)
      throw new Error('hexToBytes: received invalid unpadded hex');
    const S = new Uint8Array(E.length / 2);
    for (let v = 0; v < S.length; v++) {
      const A = v * 2,
        k = E.slice(A, A + 2),
        R = Number.parseInt(k, 16);
      if (Number.isNaN(R) || R < 0) throw new Error('Invalid byte sequence');
      S[v] = R;
    }
    return S;
  }
  e.hexToBytes = c;
  const u = async () => {};
  e.nextTick = u;
  async function f(E, S, v) {
    let A = Date.now();
    for (let k = 0; k < E; k++) {
      v(k);
      const R = Date.now() - A;
      (R >= 0 && R < S) || (await (0, e.nextTick)(), (A += R));
    }
  }
  e.asyncLoop = f;
  function l(E) {
    if (typeof E != 'string')
      throw new TypeError(`utf8ToBytes expected string, got ${typeof E}`);
    return new TextEncoder().encode(E);
  }
  e.utf8ToBytes = l;
  function h(E) {
    if ((typeof E == 'string' && (E = l(E)), !(E instanceof Uint8Array)))
      throw new TypeError(
        `Expected input type is Uint8Array (got ${typeof E})`,
      );
    return E;
  }
  e.toBytes = h;
  function y(...E) {
    if (!E.every((A) => A instanceof Uint8Array))
      throw new Error('Uint8Array list expected');
    if (E.length === 1) return E[0];
    const S = E.reduce((A, k) => A + k.length, 0),
      v = new Uint8Array(S);
    for (let A = 0, k = 0; A < E.length; A++) {
      const R = E[A];
      v.set(R, k), (k += R.length);
    }
    return v;
  }
  e.concatBytes = y;
  class p {
    clone() {
      return this._cloneInto();
    }
  }
  e.Hash = p;
  const d = (E) =>
    Object.prototype.toString.call(E) === '[object Object]' &&
    E.constructor === Object;
  function m(E, S) {
    if (S !== void 0 && (typeof S != 'object' || !d(S)))
      throw new TypeError('Options should be object or undefined');
    return Object.assign(E, S);
  }
  e.checkOpts = m;
  function b(E) {
    const S = (A) => E().update(h(A)).digest(),
      v = E();
    return (
      (S.outputLen = v.outputLen),
      (S.blockLen = v.blockLen),
      (S.create = () => E()),
      S
    );
  }
  e.wrapConstructor = b;
  function g(E) {
    const S = (A, k) => E(k).update(h(A)).digest(),
      v = E({});
    return (
      (S.outputLen = v.outputLen),
      (S.blockLen = v.blockLen),
      (S.create = (A) => E(A)),
      S
    );
  }
  e.wrapConstructorWithOpts = g;
  function w(E = 32) {
    if (t.crypto && typeof t.crypto.getRandomValues == 'function')
      return t.crypto.getRandomValues(new Uint8Array(E));
    throw new Error('crypto.getRandomValues must be defined');
  }
  e.randomBytes = w;
})(ai);
(function (e) {
  Object.defineProperty(e, '__esModule', { value: !0 }), (e.hmac = void 0);
  const t = le,
    n = ai;
  class r extends n.Hash {
    constructor(s, a) {
      super(), (this.finished = !1), (this.destroyed = !1), t.default.hash(s);
      const c = (0, n.toBytes)(a);
      if (((this.iHash = s.create()), typeof this.iHash.update != 'function'))
        throw new TypeError(
          'Expected instance of class which extends utils.Hash',
        );
      (this.blockLen = this.iHash.blockLen),
        (this.outputLen = this.iHash.outputLen);
      const u = this.blockLen,
        f = new Uint8Array(u);
      f.set(c.length > u ? s.create().update(c).digest() : c);
      for (let l = 0; l < f.length; l++) f[l] ^= 54;
      this.iHash.update(f), (this.oHash = s.create());
      for (let l = 0; l < f.length; l++) f[l] ^= 106;
      this.oHash.update(f), f.fill(0);
    }
    update(s) {
      return t.default.exists(this), this.iHash.update(s), this;
    }
    digestInto(s) {
      t.default.exists(this),
        t.default.bytes(s, this.outputLen),
        (this.finished = !0),
        this.iHash.digestInto(s),
        this.oHash.update(s),
        this.oHash.digestInto(s),
        this.destroy();
    }
    digest() {
      const s = new Uint8Array(this.oHash.outputLen);
      return this.digestInto(s), s;
    }
    _cloneInto(s) {
      s || (s = Object.create(Object.getPrototypeOf(this), {}));
      const {
        oHash: a,
        iHash: c,
        finished: u,
        destroyed: f,
        blockLen: l,
        outputLen: h,
      } = this;
      return (
        (s = s),
        (s.finished = u),
        (s.destroyed = f),
        (s.blockLen = l),
        (s.outputLen = h),
        (s.oHash = a._cloneInto(s.oHash)),
        (s.iHash = c._cloneInto(s.iHash)),
        s
      );
    }
    destroy() {
      (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
    }
  }
  const o = (i, s, a) => new r(i, s).update(a).digest();
  (e.hmac = o), (e.hmac.create = (i, s) => new r(i, s));
})(Ba);
Object.defineProperty(Dt, '__esModule', { value: !0 });
Dt.pbkdf2Async = Dt.pbkdf2 = void 0;
const _n = le,
  Rf = Ba,
  Ct = ai;
function Ia(e, t, n, r) {
  _n.default.hash(e);
  const o = (0, Ct.checkOpts)({ dkLen: 32, asyncTick: 10 }, r),
    { c: i, dkLen: s, asyncTick: a } = o;
  if ((_n.default.number(i), _n.default.number(s), _n.default.number(a), i < 1))
    throw new Error('PBKDF2: iterations (c) should be >= 1');
  const c = (0, Ct.toBytes)(t),
    u = (0, Ct.toBytes)(n),
    f = new Uint8Array(s),
    l = Rf.hmac.create(e, c),
    h = l._cloneInto().update(u);
  return { c: i, dkLen: s, asyncTick: a, DK: f, PRF: l, PRFSalt: h };
}
function Ra(e, t, n, r, o) {
  return e.destroy(), t.destroy(), r && r.destroy(), o.fill(0), n;
}
function Nf(e, t, n, r) {
  const { c: o, dkLen: i, DK: s, PRF: a, PRFSalt: c } = Ia(e, t, n, r);
  let u;
  const f = new Uint8Array(4),
    l = (0, Ct.createView)(f),
    h = new Uint8Array(a.outputLen);
  for (let y = 1, p = 0; p < i; y++, p += a.outputLen) {
    const d = s.subarray(p, p + a.outputLen);
    l.setInt32(0, y, !1),
      (u = c._cloneInto(u)).update(f).digestInto(h),
      d.set(h.subarray(0, d.length));
    for (let m = 1; m < o; m++) {
      a._cloneInto(u).update(h).digestInto(h);
      for (let b = 0; b < d.length; b++) d[b] ^= h[b];
    }
  }
  return Ra(a, c, s, u, h);
}
Dt.pbkdf2 = Nf;
async function Cf(e, t, n, r) {
  const {
    c: o,
    dkLen: i,
    asyncTick: s,
    DK: a,
    PRF: c,
    PRFSalt: u,
  } = Ia(e, t, n, r);
  let f;
  const l = new Uint8Array(4),
    h = (0, Ct.createView)(l),
    y = new Uint8Array(c.outputLen);
  for (let p = 1, d = 0; d < i; p++, d += c.outputLen) {
    const m = a.subarray(d, d + c.outputLen);
    h.setInt32(0, p, !1),
      (f = u._cloneInto(f)).update(l).digestInto(y),
      m.set(y.subarray(0, m.length)),
      await (0, Ct.asyncLoop)(o - 1, s, (b) => {
        c._cloneInto(f).update(y).digestInto(y);
        for (let g = 0; g < m.length; g++) m[g] ^= y[g];
      });
  }
  return Ra(c, u, a, f, y);
}
Dt.pbkdf2Async = Cf;
const Pf = Vt(kl),
  Tn = BigInt(2 ** 32 - 1),
  Ao = BigInt(32);
function Na(e, t = !1) {
  return t
    ? { h: Number(e & Tn), l: Number((e >> Ao) & Tn) }
    : { h: Number((e >> Ao) & Tn) | 0, l: Number(e & Tn) | 0 };
}
function Lf(e, t = !1) {
  let n = new Uint32Array(e.length),
    r = new Uint32Array(e.length);
  for (let o = 0; o < e.length; o++) {
    const { h: i, l: s } = Na(e[o], t);
    [n[o], r[o]] = [i, s];
  }
  return [n, r];
}
const Uf = (e, t) => (BigInt(e >>> 0) << Ao) | BigInt(t >>> 0),
  Hf = (e, t, n) => e >>> n,
  Df = (e, t, n) => (e << (32 - n)) | (t >>> n),
  jf = (e, t, n) => (e >>> n) | (t << (32 - n)),
  $f = (e, t, n) => (e << (32 - n)) | (t >>> n),
  qf = (e, t, n) => (e << (64 - n)) | (t >>> (n - 32)),
  Mf = (e, t, n) => (e >>> (n - 32)) | (t << (64 - n)),
  zf = (e, t) => t,
  Vf = (e, t) => e,
  Kf = (e, t, n) => (e << n) | (t >>> (32 - n)),
  Wf = (e, t, n) => (t << n) | (e >>> (32 - n)),
  Ff = (e, t, n) => (t << (n - 32)) | (e >>> (64 - n)),
  Zf = (e, t, n) => (e << (n - 32)) | (t >>> (64 - n));
function Gf(e, t, n, r) {
  const o = (t >>> 0) + (r >>> 0);
  return { h: (e + n + ((o / 2 ** 32) | 0)) | 0, l: o | 0 };
}
const Jf = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0),
  Yf = (e, t, n, r) => (t + n + r + ((e / 2 ** 32) | 0)) | 0,
  Xf = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0),
  Qf = (e, t, n, r, o) => (t + n + r + o + ((e / 2 ** 32) | 0)) | 0,
  ed = (e, t, n, r, o) =>
    (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (o >>> 0),
  td = (e, t, n, r, o, i) => (t + n + r + o + i + ((e / 2 ** 32) | 0)) | 0,
  P = {
    fromBig: Na,
    split: Lf,
    toBig: Uf,
    shrSH: Hf,
    shrSL: Df,
    rotrSH: jf,
    rotrSL: $f,
    rotrBH: qf,
    rotrBL: Mf,
    rotr32H: zf,
    rotr32L: Vf,
    rotlSH: Kf,
    rotlSL: Wf,
    rotlBH: Ff,
    rotlBL: Zf,
    add: Gf,
    add3L: Jf,
    add3H: Yf,
    add4L: Xf,
    add4H: Qf,
    add5H: td,
    add5L: ed,
  },
  [nd, rd] = P.split(
    [
      '0x428a2f98d728ae22',
      '0x7137449123ef65cd',
      '0xb5c0fbcfec4d3b2f',
      '0xe9b5dba58189dbbc',
      '0x3956c25bf348b538',
      '0x59f111f1b605d019',
      '0x923f82a4af194f9b',
      '0xab1c5ed5da6d8118',
      '0xd807aa98a3030242',
      '0x12835b0145706fbe',
      '0x243185be4ee4b28c',
      '0x550c7dc3d5ffb4e2',
      '0x72be5d74f27b896f',
      '0x80deb1fe3b1696b1',
      '0x9bdc06a725c71235',
      '0xc19bf174cf692694',
      '0xe49b69c19ef14ad2',
      '0xefbe4786384f25e3',
      '0x0fc19dc68b8cd5b5',
      '0x240ca1cc77ac9c65',
      '0x2de92c6f592b0275',
      '0x4a7484aa6ea6e483',
      '0x5cb0a9dcbd41fbd4',
      '0x76f988da831153b5',
      '0x983e5152ee66dfab',
      '0xa831c66d2db43210',
      '0xb00327c898fb213f',
      '0xbf597fc7beef0ee4',
      '0xc6e00bf33da88fc2',
      '0xd5a79147930aa725',
      '0x06ca6351e003826f',
      '0x142929670a0e6e70',
      '0x27b70a8546d22ffc',
      '0x2e1b21385c26c926',
      '0x4d2c6dfc5ac42aed',
      '0x53380d139d95b3df',
      '0x650a73548baf63de',
      '0x766a0abb3c77b2a8',
      '0x81c2c92e47edaee6',
      '0x92722c851482353b',
      '0xa2bfe8a14cf10364',
      '0xa81a664bbc423001',
      '0xc24b8b70d0f89791',
      '0xc76c51a30654be30',
      '0xd192e819d6ef5218',
      '0xd69906245565a910',
      '0xf40e35855771202a',
      '0x106aa07032bbd1b8',
      '0x19a4c116b8d2d0c8',
      '0x1e376c085141ab53',
      '0x2748774cdf8eeb99',
      '0x34b0bcb5e19b48a8',
      '0x391c0cb3c5c95a63',
      '0x4ed8aa4ae3418acb',
      '0x5b9cca4f7763e373',
      '0x682e6ff3d6b2b8a3',
      '0x748f82ee5defb2fc',
      '0x78a5636f43172f60',
      '0x84c87814a1f0ab72',
      '0x8cc702081a6439ec',
      '0x90befffa23631e28',
      '0xa4506cebde82bde9',
      '0xbef9a3f7b2c67915',
      '0xc67178f2e372532b',
      '0xca273eceea26619c',
      '0xd186b8c721c0c207',
      '0xeada7dd6cde0eb1e',
      '0xf57d4f7fee6ed178',
      '0x06f067aa72176fba',
      '0x0a637dc5a2c898a6',
      '0x113f9804bef90dae',
      '0x1b710b35131c471b',
      '0x28db77f523047d84',
      '0x32caab7b40c72493',
      '0x3c9ebe0a15c9bebc',
      '0x431d67c49c100d4c',
      '0x4cc5d4becb3e42b6',
      '0x597f299cfc657e2a',
      '0x5fcb6fab3ad6faec',
      '0x6c44198c4a475817',
    ].map((e) => BigInt(e)),
  ),
  nt = new Uint32Array(80),
  rt = new Uint32Array(80);
class En extends Go {
  constructor() {
    super(128, 64, 16, !1),
      (this.Ah = 1779033703),
      (this.Al = -205731576),
      (this.Bh = -1150833019),
      (this.Bl = -2067093701),
      (this.Ch = 1013904242),
      (this.Cl = -23791573),
      (this.Dh = -1521486534),
      (this.Dl = 1595750129),
      (this.Eh = 1359893119),
      (this.El = -1377402159),
      (this.Fh = -1694144372),
      (this.Fl = 725511199),
      (this.Gh = 528734635),
      (this.Gl = -79577749),
      (this.Hh = 1541459225),
      (this.Hl = 327033209);
  }
  get() {
    const {
      Ah: t,
      Al: n,
      Bh: r,
      Bl: o,
      Ch: i,
      Cl: s,
      Dh: a,
      Dl: c,
      Eh: u,
      El: f,
      Fh: l,
      Fl: h,
      Gh: y,
      Gl: p,
      Hh: d,
      Hl: m,
    } = this;
    return [t, n, r, o, i, s, a, c, u, f, l, h, y, p, d, m];
  }
  set(t, n, r, o, i, s, a, c, u, f, l, h, y, p, d, m) {
    (this.Ah = t | 0),
      (this.Al = n | 0),
      (this.Bh = r | 0),
      (this.Bl = o | 0),
      (this.Ch = i | 0),
      (this.Cl = s | 0),
      (this.Dh = a | 0),
      (this.Dl = c | 0),
      (this.Eh = u | 0),
      (this.El = f | 0),
      (this.Fh = l | 0),
      (this.Fl = h | 0),
      (this.Gh = y | 0),
      (this.Gl = p | 0),
      (this.Hh = d | 0),
      (this.Hl = m | 0);
  }
  process(t, n) {
    for (let w = 0; w < 16; w++, n += 4)
      (nt[w] = t.getUint32(n)), (rt[w] = t.getUint32((n += 4)));
    for (let w = 16; w < 80; w++) {
      const E = nt[w - 15] | 0,
        S = rt[w - 15] | 0,
        v = P.rotrSH(E, S, 1) ^ P.rotrSH(E, S, 8) ^ P.shrSH(E, S, 7),
        A = P.rotrSL(E, S, 1) ^ P.rotrSL(E, S, 8) ^ P.shrSL(E, S, 7),
        k = nt[w - 2] | 0,
        R = rt[w - 2] | 0,
        I = P.rotrSH(k, R, 19) ^ P.rotrBH(k, R, 61) ^ P.shrSH(k, R, 6),
        O = P.rotrSL(k, R, 19) ^ P.rotrBL(k, R, 61) ^ P.shrSL(k, R, 6),
        D = P.add4L(A, O, rt[w - 7], rt[w - 16]),
        j = P.add4H(D, v, I, nt[w - 7], nt[w - 16]);
      (nt[w] = j | 0), (rt[w] = D | 0);
    }
    let {
      Ah: r,
      Al: o,
      Bh: i,
      Bl: s,
      Ch: a,
      Cl: c,
      Dh: u,
      Dl: f,
      Eh: l,
      El: h,
      Fh: y,
      Fl: p,
      Gh: d,
      Gl: m,
      Hh: b,
      Hl: g,
    } = this;
    for (let w = 0; w < 80; w++) {
      const E = P.rotrSH(l, h, 14) ^ P.rotrSH(l, h, 18) ^ P.rotrBH(l, h, 41),
        S = P.rotrSL(l, h, 14) ^ P.rotrSL(l, h, 18) ^ P.rotrBL(l, h, 41),
        v = (l & y) ^ (~l & d),
        A = (h & p) ^ (~h & m),
        k = P.add5L(g, S, A, rd[w], rt[w]),
        R = P.add5H(k, b, E, v, nd[w], nt[w]),
        I = k | 0,
        O = P.rotrSH(r, o, 28) ^ P.rotrBH(r, o, 34) ^ P.rotrBH(r, o, 39),
        D = P.rotrSL(r, o, 28) ^ P.rotrBL(r, o, 34) ^ P.rotrBL(r, o, 39),
        j = (r & i) ^ (r & a) ^ (i & a),
        V = (o & s) ^ (o & c) ^ (s & c);
      (b = d | 0),
        (g = m | 0),
        (d = y | 0),
        (m = p | 0),
        (y = l | 0),
        (p = h | 0),
        ({ h: l, l: h } = P.add(u | 0, f | 0, R | 0, I | 0)),
        (u = a | 0),
        (f = c | 0),
        (a = i | 0),
        (c = s | 0),
        (i = r | 0),
        (s = o | 0);
      const x = P.add3L(I, D, V);
      (r = P.add3H(x, R, O, j)), (o = x | 0);
    }
    ({ h: r, l: o } = P.add(this.Ah | 0, this.Al | 0, r | 0, o | 0)),
      ({ h: i, l: s } = P.add(this.Bh | 0, this.Bl | 0, i | 0, s | 0)),
      ({ h: a, l: c } = P.add(this.Ch | 0, this.Cl | 0, a | 0, c | 0)),
      ({ h: u, l: f } = P.add(this.Dh | 0, this.Dl | 0, u | 0, f | 0)),
      ({ h: l, l: h } = P.add(this.Eh | 0, this.El | 0, l | 0, h | 0)),
      ({ h: y, l: p } = P.add(this.Fh | 0, this.Fl | 0, y | 0, p | 0)),
      ({ h: d, l: m } = P.add(this.Gh | 0, this.Gl | 0, d | 0, m | 0)),
      ({ h: b, l: g } = P.add(this.Hh | 0, this.Hl | 0, b | 0, g | 0)),
      this.set(r, o, i, s, a, c, u, f, l, h, y, p, d, m, b, g);
  }
  roundClean() {
    nt.fill(0), rt.fill(0);
  }
  destroy() {
    this.buffer.fill(0),
      this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class od extends En {
  constructor() {
    super(),
      (this.Ah = -1942145080),
      (this.Al = 424955298),
      (this.Bh = 1944164710),
      (this.Bl = -1982016298),
      (this.Ch = 502970286),
      (this.Cl = 855612546),
      (this.Dh = 1738396948),
      (this.Dl = 1479516111),
      (this.Eh = 258812777),
      (this.El = 2077511080),
      (this.Fh = 2011393907),
      (this.Fl = 79989058),
      (this.Gh = 1067287976),
      (this.Gl = 1780299464),
      (this.Hh = 286451373),
      (this.Hl = -1848208735),
      (this.outputLen = 28);
  }
}
class id extends En {
  constructor() {
    super(),
      (this.Ah = 573645204),
      (this.Al = -64227540),
      (this.Bh = -1621794909),
      (this.Bl = -934517566),
      (this.Ch = 596883563),
      (this.Cl = 1867755857),
      (this.Dh = -1774684391),
      (this.Dl = 1497426621),
      (this.Eh = -1775747358),
      (this.El = -1467023389),
      (this.Fh = -1101128155),
      (this.Fl = 1401305490),
      (this.Gh = 721525244),
      (this.Gl = 746961066),
      (this.Hh = 246885852),
      (this.Hl = -2117784414),
      (this.outputLen = 32);
  }
}
class sd extends En {
  constructor() {
    super(),
      (this.Ah = -876896931),
      (this.Al = -1056596264),
      (this.Bh = 1654270250),
      (this.Bl = 914150663),
      (this.Ch = -1856437926),
      (this.Cl = 812702999),
      (this.Dh = 355462360),
      (this.Dl = -150054599),
      (this.Eh = 1731405415),
      (this.El = -4191439),
      (this.Fh = -1900787065),
      (this.Fl = 1750603025),
      (this.Gh = -619958771),
      (this.Gl = 1694076839),
      (this.Hh = 1203062813),
      (this.Hl = -1090891868),
      (this.outputLen = 48);
  }
}
const _o = wt(() => new En()),
  ad = wt(() => new od()),
  cd = wt(() => new id()),
  ud = wt(() => new sd()),
  ld = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        SHA512: En,
        sha384: ud,
        sha512: _o,
        sha512_224: ad,
        sha512_256: cd,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  fd = Vt(ld),
  dd = Vt(vl),
  hd = Vt(Tf);
Object.defineProperty(Ee, '__esModule', { value: !0 });
var Ca =
  (Ee.mnemonicToSeedSync =
  Ee.mnemonicToSeed =
  za =
  Ee.validateMnemonic =
  Ee.entropyToMnemonic =
  Ee.mnemonicToEntropy =
  ja =
  Ee.generateMnemonic =
    void 0);
/*! scure-bip39 - MIT License (c) 2022 Patricio Palladino, Paul Miller (paulmillr.com) */ const Pa =
    Of,
  La = Dt,
  pd = Pf,
  Ua = fd,
  yd = dd,
  kn = hd,
  bd = (e) => e[0] === 'あいこくしん';
function Ha(e) {
  if (typeof e != 'string')
    throw new TypeError(`Invalid mnemonic type: ${typeof e}`);
  return e.normalize('NFKD');
}
function ci(e) {
  const t = Ha(e),
    n = t.split(' ');
  if (![12, 15, 18, 21, 24].includes(n.length))
    throw new Error('Invalid mnemonic');
  return { nfkd: t, words: n };
}
function Da(e) {
  Pa.default.bytes(e, 16, 20, 24, 28, 32);
}
function md(e, t = 128) {
  if ((Pa.default.number(t), t % 32 !== 0 || t > 256))
    throw new TypeError('Invalid entropy');
  return Ma((0, yd.randomBytes)(t / 8), e);
}
var ja = (Ee.generateMnemonic = md);
const gd = (e) => {
  const t = 8 - e.length / 4;
  return new Uint8Array([((0, pd.sha256)(e)[0] >> t) << t]);
};
function $a(e) {
  if (!Array.isArray(e) || e.length !== 2048 || typeof e[0] != 'string')
    throw new Error('Worlist: expected array of 2048 strings');
  return (
    e.forEach((t) => {
      if (typeof t != 'string')
        throw new Error(`Wordlist: non-string element: ${t}`);
    }),
    kn.utils.chain(
      kn.utils.checksum(1, gd),
      kn.utils.radix2(11, !0),
      kn.utils.alphabet(e),
    )
  );
}
function qa(e, t) {
  const { words: n } = ci(e),
    r = $a(t).decode(n);
  return Da(r), r;
}
Ee.mnemonicToEntropy = qa;
function Ma(e, t) {
  return (
    Da(e),
    $a(t)
      .encode(e)
      .join(bd(t) ? '　' : ' ')
  );
}
Ee.entropyToMnemonic = Ma;
function wd(e, t) {
  try {
    qa(e, t);
  } catch {
    return !1;
  }
  return !0;
}
var za = (Ee.validateMnemonic = wd);
const Va = (e) => Ha(`mnemonic${e}`);
function vd(e, t = '') {
  return (0, La.pbkdf2Async)(Ua.sha512, ci(e).nfkd, Va(t), {
    c: 2048,
    dkLen: 64,
  });
}
Ee.mnemonicToSeed = vd;
function Ed(e, t = '') {
  return (0, La.pbkdf2)(Ua.sha512, ci(e).nfkd, Va(t), { c: 2048, dkLen: 64 });
}
Ca = Ee.mnemonicToSeedSync = Ed;
const xd = new Uint8Array([
    7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  ]),
  Ka = Uint8Array.from({ length: 16 }, (e, t) => t),
  Sd = Ka.map((e) => (9 * e + 5) % 16);
let ui = [Ka],
  li = [Sd];
for (let e = 0; e < 4; e++)
  for (let t of [ui, li]) t.push(t[e].map((n) => xd[n]));
const Wa = [
    [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
    [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
    [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
    [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
    [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5],
  ].map((e) => new Uint8Array(e)),
  Ad = ui.map((e, t) => e.map((n) => Wa[t][n])),
  _d = li.map((e, t) => e.map((n) => Wa[t][n])),
  Td = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]),
  kd = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]),
  On = (e, t) => (e << t) | (e >>> (32 - t));
function os(e, t, n, r) {
  return e === 0
    ? t ^ n ^ r
    : e === 1
    ? (t & n) | (~t & r)
    : e === 2
    ? (t | ~n) ^ r
    : e === 3
    ? (t & r) | (n & ~r)
    : t ^ (n | ~r);
}
const Bn = new Uint32Array(16);
class Od extends Go {
  constructor() {
    super(64, 20, 8, !0),
      (this.h0 = 1732584193),
      (this.h1 = -271733879),
      (this.h2 = -1732584194),
      (this.h3 = 271733878),
      (this.h4 = -1009589776);
  }
  get() {
    const { h0: t, h1: n, h2: r, h3: o, h4: i } = this;
    return [t, n, r, o, i];
  }
  set(t, n, r, o, i) {
    (this.h0 = t | 0),
      (this.h1 = n | 0),
      (this.h2 = r | 0),
      (this.h3 = o | 0),
      (this.h4 = i | 0);
  }
  process(t, n) {
    for (let y = 0; y < 16; y++, n += 4) Bn[y] = t.getUint32(n, !0);
    let r = this.h0 | 0,
      o = r,
      i = this.h1 | 0,
      s = i,
      a = this.h2 | 0,
      c = a,
      u = this.h3 | 0,
      f = u,
      l = this.h4 | 0,
      h = l;
    for (let y = 0; y < 5; y++) {
      const p = 4 - y,
        d = Td[y],
        m = kd[y],
        b = ui[y],
        g = li[y],
        w = Ad[y],
        E = _d[y];
      for (let S = 0; S < 16; S++) {
        const v = (On(r + os(y, i, a, u) + Bn[b[S]] + d, w[S]) + l) | 0;
        (r = l), (l = u), (u = On(a, 10) | 0), (a = i), (i = v);
      }
      for (let S = 0; S < 16; S++) {
        const v = (On(o + os(p, s, c, f) + Bn[g[S]] + m, E[S]) + h) | 0;
        (o = h), (h = f), (f = On(c, 10) | 0), (c = s), (s = v);
      }
    }
    this.set(
      (this.h1 + a + f) | 0,
      (this.h2 + u + h) | 0,
      (this.h3 + l + o) | 0,
      (this.h4 + r + s) | 0,
      (this.h0 + i + c) | 0,
    );
  }
  roundClean() {
    Bn.fill(0);
  }
  destroy() {
    (this.destroyed = !0), this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const Bd = wt(() => new Od()),
  In = he.ProjectivePoint,
  Gr = ga($e);
function is(e) {
  return BigInt(`0x${we(e)}`);
}
function Id(e) {
  return bt(e.toString(16).padStart(64, '0'));
}
const Rd = Fo('Bitcoin seed'),
  Jr = { private: 76066276, public: 76067358 },
  Yr = 2147483648,
  Nd = (e) => Bd($e(e)),
  Cd = (e) => Nt(e).getUint32(0, !1),
  Rn = (e) => {
    if (!Number.isSafeInteger(e) || e < 0 || e > 2 ** 32 - 1)
      throw new Error(`Invalid number=${e}. Should be from 0 to 2 ** 32 - 1`);
    const t = new Uint8Array(4);
    return Nt(t).setUint32(0, e, !1), t;
  };
class Tt {
  get fingerprint() {
    if (!this.pubHash) throw new Error('No publicKey set!');
    return Cd(this.pubHash);
  }
  get identifier() {
    return this.pubHash;
  }
  get pubKeyHash() {
    return this.pubHash;
  }
  get privateKey() {
    return this.privKeyBytes || null;
  }
  get publicKey() {
    return this.pubKey || null;
  }
  get privateExtendedKey() {
    const t = this.privateKey;
    if (!t) throw new Error('No private key');
    return Gr.encode(
      this.serialize(this.versions.private, Ot(new Uint8Array([0]), t)),
    );
  }
  get publicExtendedKey() {
    if (!this.pubKey) throw new Error('No public key');
    return Gr.encode(this.serialize(this.versions.public, this.pubKey));
  }
  static fromMasterSeed(t, n = Jr) {
    if ((lt(t), 8 * t.length < 128 || 8 * t.length > 512))
      throw new Error(
        `HDKey: wrong seed length=${t.length}. Should be between 128 and 512 bits; 256 bits is advised)`,
      );
    const r = Jn(_o, Rd, t);
    return new Tt({
      versions: n,
      chainCode: r.slice(32),
      privateKey: r.slice(0, 32),
    });
  }
  static fromExtendedKey(t, n = Jr) {
    const r = Gr.decode(t),
      o = Nt(r),
      i = o.getUint32(0, !1),
      s = {
        versions: n,
        depth: r[4],
        parentFingerprint: o.getUint32(5, !1),
        index: o.getUint32(9, !1),
        chainCode: r.slice(13, 45),
      },
      a = r.slice(45),
      c = a[0] === 0;
    if (i !== n[c ? 'private' : 'public']) throw new Error('Version mismatch');
    return c
      ? new Tt({ ...s, privateKey: a.slice(1) })
      : new Tt({ ...s, publicKey: a });
  }
  static fromJSON(t) {
    return Tt.fromExtendedKey(t.xpriv);
  }
  constructor(t) {
    if (
      ((this.depth = 0),
      (this.index = 0),
      (this.chainCode = null),
      (this.parentFingerprint = 0),
      !t || typeof t != 'object')
    )
      throw new Error('HDKey.constructor must not be called directly');
    if (
      ((this.versions = t.versions || Jr),
      (this.depth = t.depth || 0),
      (this.chainCode = t.chainCode),
      (this.index = t.index || 0),
      (this.parentFingerprint = t.parentFingerprint || 0),
      !this.depth && (this.parentFingerprint || this.index))
    )
      throw new Error(
        'HDKey: zero depth with non-zero index/parent fingerprint',
      );
    if (t.publicKey && t.privateKey)
      throw new Error('HDKey: publicKey and privateKey at same time.');
    if (t.privateKey) {
      if (!he.utils.isValidPrivateKey(t.privateKey))
        throw new Error('Invalid private key');
      (this.privKey =
        typeof t.privateKey == 'bigint' ? t.privateKey : is(t.privateKey)),
        (this.privKeyBytes = Id(this.privKey)),
        (this.pubKey = he.getPublicKey(t.privateKey, !0));
    } else if (t.publicKey)
      this.pubKey = In.fromHex(t.publicKey).toRawBytes(!0);
    else throw new Error('HDKey: no public or private key provided');
    this.pubHash = Nd(this.pubKey);
  }
  derive(t) {
    if (!/^[mM]'?/.test(t)) throw new Error('Path must start with "m" or "M"');
    if (/^[mM]'?$/.test(t)) return this;
    const n = t.replace(/^[mM]'?\//, '').split('/');
    let r = this;
    for (const o of n) {
      const i = /^(\d+)('?)$/.exec(o);
      if (!i || i.length !== 3) throw new Error(`Invalid child index: ${o}`);
      let s = +i[1];
      if (!Number.isSafeInteger(s) || s >= Yr) throw new Error('Invalid index');
      i[2] === "'" && (s += Yr), (r = r.deriveChild(s));
    }
    return r;
  }
  deriveChild(t) {
    if (!this.pubKey || !this.chainCode)
      throw new Error('No publicKey or chainCode set');
    let n = Rn(t);
    if (t >= Yr) {
      const a = this.privateKey;
      if (!a) throw new Error('Could not derive hardened child key');
      n = Ot(new Uint8Array([0]), a, n);
    } else n = Ot(this.pubKey, n);
    const r = Jn(_o, this.chainCode, n),
      o = is(r.slice(0, 32)),
      i = r.slice(32);
    if (!he.utils.isValidPrivateKey(o))
      throw new Error('Tweak bigger than curve order');
    const s = {
      versions: this.versions,
      chainCode: i,
      depth: this.depth + 1,
      parentFingerprint: this.fingerprint,
      index: t,
    };
    try {
      if (this.privateKey) {
        const a = X(this.privKey + o, he.CURVE.n);
        if (!he.utils.isValidPrivateKey(a))
          throw new Error(
            'The tweak was out of range or the resulted private key is invalid',
          );
        s.privateKey = a;
      } else {
        const a = In.fromHex(this.pubKey).add(In.fromPrivateKey(o));
        if (a.equals(In.ZERO))
          throw new Error(
            'The tweak was equal to negative P, which made the result key invalid',
          );
        s.publicKey = a.toRawBytes(!0);
      }
      return new Tt(s);
    } catch {
      return this.deriveChild(t + 1);
    }
  }
  sign(t) {
    if (!this.privateKey) throw new Error('No privateKey set!');
    return lt(t, 32), he.sign(t, this.privKey).toCompactRawBytes();
  }
  verify(t, n) {
    if ((lt(t, 32), lt(n, 64), !this.publicKey))
      throw new Error('No publicKey set!');
    let r;
    try {
      r = he.Signature.fromCompact(n);
    } catch {
      return !1;
    }
    return he.verify(r, t, this.publicKey);
  }
  wipePrivateData() {
    return (
      (this.privKey = void 0),
      this.privKeyBytes &&
        (this.privKeyBytes.fill(0), (this.privKeyBytes = void 0)),
      this
    );
  }
  toJSON() {
    return { xpriv: this.privateExtendedKey, xpub: this.publicExtendedKey };
  }
  serialize(t, n) {
    if (!this.chainCode) throw new Error('No chainCode set');
    return (
      lt(n, 33),
      Ot(
        Rn(t),
        new Uint8Array([this.depth]),
        Rn(this.parentFingerprint),
        Rn(this.index),
        this.chainCode,
        n,
      )
    );
  }
}
var Pd = Object.defineProperty,
  fe = (e, t) => {
    for (var n in t) Pd(e, n, { get: t[n], enumerable: !0 });
  };
function Fa(e) {
  return we(wn.getPublicKey(e));
}
var Ld = {};
fe(Ld, {
  MessageNode: () => Za,
  MessageQueue: () => Ga,
  insertEventIntoAscendingList: () => Hd,
  insertEventIntoDescendingList: () => Ud,
  normalizeURL: () => To,
  utf8Decoder: () => ft,
  utf8Encoder: () => qe,
});
var ft = new TextDecoder('utf-8'),
  qe = new TextEncoder();
function To(e) {
  let t = new URL(e);
  return (
    (t.pathname = t.pathname.replace(/\/+/g, '/')),
    t.pathname.endsWith('/') && (t.pathname = t.pathname.slice(0, -1)),
    ((t.port === '80' && t.protocol === 'ws:') ||
      (t.port === '443' && t.protocol === 'wss:')) &&
      (t.port = ''),
    t.searchParams.sort(),
    (t.hash = ''),
    t.toString()
  );
}
function Ud(e, t) {
  var s;
  let n = 0,
    r = e.length - 1,
    o,
    i = n;
  if (r < 0) i = 0;
  else if (t.created_at < e[r].created_at) i = r + 1;
  else if (t.created_at >= e[n].created_at) i = n;
  else
    for (;;) {
      if (r <= n + 1) {
        i = r;
        break;
      }
      if (((o = Math.floor(n + (r - n) / 2)), e[o].created_at > t.created_at))
        n = o;
      else if (e[o].created_at < t.created_at) r = o;
      else {
        i = o;
        break;
      }
    }
  return ((s = e[i]) == null ? void 0 : s.id) !== t.id
    ? [...e.slice(0, i), t, ...e.slice(i)]
    : e;
}
function Hd(e, t) {
  var s;
  let n = 0,
    r = e.length - 1,
    o,
    i = n;
  if (r < 0) i = 0;
  else if (t.created_at > e[r].created_at) i = r + 1;
  else if (t.created_at <= e[n].created_at) i = n;
  else
    for (;;) {
      if (r <= n + 1) {
        i = r;
        break;
      }
      if (((o = Math.floor(n + (r - n) / 2)), e[o].created_at < t.created_at))
        n = o;
      else if (e[o].created_at > t.created_at) r = o;
      else {
        i = o;
        break;
      }
    }
  return ((s = e[i]) == null ? void 0 : s.id) !== t.id
    ? [...e.slice(0, i), t, ...e.slice(i)]
    : e;
}
var Za = class {
    constructor(e) {
      Ue(this, '_value');
      Ue(this, '_next');
      (this._value = e), (this._next = null);
    }
    get value() {
      return this._value;
    }
    set value(e) {
      this._value = e;
    }
    get next() {
      return this._next;
    }
    set next(e) {
      this._next = e;
    }
  },
  Ga = class {
    constructor() {
      Ue(this, '_first');
      Ue(this, '_last');
      Ue(this, '_size');
      (this._first = null), (this._last = null), (this._size = 0);
    }
    get first() {
      return this._first;
    }
    set first(e) {
      this._first = e;
    }
    get last() {
      return this._last;
    }
    set last(e) {
      this._last = e;
    }
    get size() {
      return this._size;
    }
    set size(e) {
      this._size = e;
    }
    enqueue(e) {
      const t = new Za(e);
      return (
        this._size === 0 || !this._last
          ? ((this._first = t), (this._last = t))
          : ((this._last.next = t), (this._last = t)),
        this._size++,
        !0
      );
    }
    dequeue() {
      if (this._size === 0 || !this._first) return null;
      let e = this._first;
      return (this._first = e.next), (e.next = null), this._size--, e.value;
    }
  };
function Ja(e, t) {
  let n = e;
  return (n.pubkey = Fa(t)), (n.id = wr(n)), (n.sig = $d(n, t)), n;
}
function Dd(e) {
  if (!fi(e))
    throw new Error("can't serialize event with wrong or missing properties");
  return JSON.stringify([0, e.pubkey, e.created_at, e.kind, e.tags, e.content]);
}
function wr(e) {
  let t = $e(qe.encode(Dd(e)));
  return we(t);
}
var jd = (e) => e instanceof Object;
function fi(e) {
  if (
    !jd(e) ||
    typeof e.kind != 'number' ||
    typeof e.content != 'string' ||
    typeof e.created_at != 'number' ||
    typeof e.pubkey != 'string' ||
    !e.pubkey.match(/^[a-f0-9]{64}$/) ||
    !Array.isArray(e.tags)
  )
    return !1;
  for (let t = 0; t < e.tags.length; t++) {
    let n = e.tags[t];
    if (!Array.isArray(n)) return !1;
    for (let r = 0; r < n.length; r++) if (typeof n[r] == 'object') return !1;
  }
  return !0;
}
function di(e) {
  try {
    return wn.verify(e.sig, wr(e), e.pubkey);
  } catch {
    return !1;
  }
}
function $d(e, t) {
  return we(wn.sign(wr(e), t));
}
function qd(e, t) {
  if (
    (e.ids &&
      e.ids.indexOf(t.id) === -1 &&
      !e.ids.some((n) => t.id.startsWith(n))) ||
    (e.kinds && e.kinds.indexOf(t.kind) === -1) ||
    (e.authors &&
      e.authors.indexOf(t.pubkey) === -1 &&
      !e.authors.some((n) => t.pubkey.startsWith(n)))
  )
    return !1;
  for (let n in e)
    if (n[0] === '#') {
      let r = n.slice(1),
        o = e[`#${r}`];
      if (
        o &&
        !t.tags.find(([i, s]) => i === n.slice(1) && o.indexOf(s) !== -1)
      )
        return !1;
    }
  return !(
    (e.since && t.created_at < e.since) ||
    (e.until && t.created_at >= e.until)
  );
}
function Md(e, t) {
  for (let n = 0; n < e.length; n++) if (qd(e[n], t)) return !0;
  return !1;
}
var zd = {};
fe(zd, {
  getHex64: () => vr,
  getInt: () => Ya,
  getSubscriptionId: () => Xa,
  matchEventId: () => Vd,
  matchEventKind: () => Wd,
  matchEventPubkey: () => Kd,
});
function vr(e, t) {
  let n = t.length + 3,
    r = e.indexOf(`"${t}":`) + n,
    o = e.slice(r).indexOf('"') + r + 1;
  return e.slice(o, o + 64);
}
function Ya(e, t) {
  let n = t.length,
    r = e.indexOf(`"${t}":`) + n + 3,
    o = e.slice(r),
    i = Math.min(o.indexOf(','), o.indexOf('}'));
  return parseInt(o.slice(0, i), 10);
}
function Xa(e) {
  let t = e.slice(0, 22).indexOf('"EVENT"');
  if (t === -1) return null;
  let n = e.slice(t + 7 + 1).indexOf('"');
  if (n === -1) return null;
  let r = t + 7 + 1 + n,
    o = e.slice(r + 1, 80).indexOf('"');
  if (o === -1) return null;
  let i = r + 1 + o;
  return e.slice(r + 1, i);
}
function Vd(e, t) {
  return t === vr(e, 'id');
}
function Kd(e, t) {
  return t === vr(e, 'pubkey');
}
function Wd(e, t) {
  return t === Ya(e, 'kind');
}
var ss = () => ({
  connect: [],
  disconnect: [],
  error: [],
  notice: [],
  auth: [],
});
function Fd(e, t = {}) {
  let { listTimeout: n = 3e3, getTimeout: r = 3e3, countTimeout: o = 3e3 } = t;
  var i,
    s = {},
    a = ss(),
    c = {},
    u = {},
    f;
  async function l() {
    return (
      f ||
      ((f = new Promise((b, g) => {
        try {
          i = new WebSocket(e);
        } catch (v) {
          g(v);
        }
        (i.onopen = () => {
          a.connect.forEach((v) => v()), b();
        }),
          (i.onerror = () => {
            (f = void 0), a.error.forEach((v) => v()), g();
          }),
          (i.onclose = async () => {
            (f = void 0), a.disconnect.forEach((v) => v());
          });
        let w = new Ga(),
          E;
        i.onmessage = (v) => {
          w.enqueue(v.data), E || (E = setInterval(S, 0));
        };
        function S() {
          var k, R, I;
          if (w.size === 0) {
            clearInterval(E), (E = null);
            return;
          }
          var v = w.dequeue();
          if (!v) return;
          let A = Xa(v);
          if (A) {
            let O = s[A];
            if (O && O.alreadyHaveEvent && O.alreadyHaveEvent(vr(v, 'id'), e))
              return;
          }
          try {
            let O = JSON.parse(v);
            switch (O[0]) {
              case 'EVENT': {
                let x = O[1],
                  _ = O[2];
                fi(_) &&
                  s[x] &&
                  (s[x].skipVerification || di(_)) &&
                  Md(s[x].filters, _) &&
                  (s[x],
                  (((k = c[x]) == null ? void 0 : k.event) || []).forEach((B) =>
                    B(_),
                  ));
                return;
              }
              case 'COUNT':
                let D = O[1],
                  j = O[2];
                s[D] &&
                  (((R = c[D]) == null ? void 0 : R.count) || []).forEach((x) =>
                    x(j),
                  );
                return;
              case 'EOSE': {
                let x = O[1];
                x in c && (c[x].eose.forEach((_) => _()), (c[x].eose = []));
                return;
              }
              case 'OK': {
                let x = O[1],
                  _ = O[2],
                  B = O[3] || '';
                x in u &&
                  (_
                    ? u[x].ok.forEach((N) => N())
                    : u[x].failed.forEach((N) => N(B)),
                  (u[x].ok = []),
                  (u[x].failed = []));
                return;
              }
              case 'NOTICE':
                let V = O[1];
                a.notice.forEach((x) => x(V));
                return;
              case 'AUTH': {
                let x = O[1];
                (I = a.auth) == null || I.forEach((_) => _(x));
                return;
              }
            }
          } catch {
            return;
          }
        }
      })),
      f)
    );
  }
  function h() {
    return (i == null ? void 0 : i.readyState) === 1;
  }
  async function y() {
    h() || (await l());
  }
  async function p(b) {
    let g = JSON.stringify(b);
    if (!(!h() && (await new Promise((w) => setTimeout(w, 1e3)), !h())))
      try {
        i.send(g);
      } catch (w) {
        console.log(w);
      }
  }
  const d = (
    b,
    {
      verb: g = 'REQ',
      skipVerification: w = !1,
      alreadyHaveEvent: E = null,
      id: S = Math.random().toString().slice(2),
    } = {},
  ) => {
    let v = S;
    return (
      (s[v] = { id: v, filters: b, skipVerification: w, alreadyHaveEvent: E }),
      p([g, v, ...b]),
      {
        sub: (A, k = {}) =>
          d(A || b, {
            skipVerification: k.skipVerification || w,
            alreadyHaveEvent: k.alreadyHaveEvent || E,
            id: v,
          }),
        unsub: () => {
          delete s[v], delete c[v], p(['CLOSE', v]);
        },
        on: (A, k) => {
          (c[v] = c[v] || { event: [], count: [], eose: [] }), c[v][A].push(k);
        },
        off: (A, k) => {
          let R = c[v],
            I = R[A].indexOf(k);
          I >= 0 && R[A].splice(I, 1);
        },
      }
    );
  };
  function m(b, g) {
    if (!b.id) throw new Error(`event ${b} has no id`);
    let w = b.id;
    return (
      p([g, b]),
      {
        on: (E, S) => {
          (u[w] = u[w] || { ok: [], failed: [] }), u[w][E].push(S);
        },
        off: (E, S) => {
          let v = u[w];
          if (!v) return;
          let A = v[E].indexOf(S);
          A >= 0 && v[E].splice(A, 1);
        },
      }
    );
  }
  return {
    url: e,
    sub: d,
    on: (b, g) => {
      a[b].push(g),
        b === 'connect' && (i == null ? void 0 : i.readyState) === 1 && g();
    },
    off: (b, g) => {
      let w = a[b].indexOf(g);
      w !== -1 && a[b].splice(w, 1);
    },
    list: (b, g) =>
      new Promise((w) => {
        let E = d(b, g),
          S = [],
          v = setTimeout(() => {
            E.unsub(), w(S);
          }, n);
        E.on('eose', () => {
          E.unsub(), clearTimeout(v), w(S);
        }),
          E.on('event', (A) => {
            S.push(A);
          });
      }),
    get: (b, g) =>
      new Promise((w) => {
        let E = d([b], g),
          S = setTimeout(() => {
            E.unsub(), w(null);
          }, r);
        E.on('event', (v) => {
          E.unsub(), clearTimeout(S), w(v);
        });
      }),
    count: (b) =>
      new Promise((g) => {
        let w = d(b, { ...d, verb: 'COUNT' }),
          E = setTimeout(() => {
            w.unsub(), g(null);
          }, o);
        w.on('count', (S) => {
          w.unsub(), clearTimeout(E), g(S);
        });
      }),
    publish(b) {
      return m(b, 'EVENT');
    },
    auth(b) {
      return m(b, 'AUTH');
    },
    connect: y,
    close() {
      (a = ss()),
        (c = {}),
        (u = {}),
        i.readyState === WebSocket.OPEN && (i == null || i.close());
    },
    get status() {
      return (i == null ? void 0 : i.readyState) ?? 3;
    },
  };
}
var Zd = class {
    constructor(e = {}) {
      Ue(this, '_conn');
      Ue(this, '_seenOn', {});
      Ue(this, 'eoseSubTimeout');
      Ue(this, 'getTimeout');
      (this._conn = {}),
        (this.eoseSubTimeout = e.eoseSubTimeout || 3400),
        (this.getTimeout = e.getTimeout || 3400);
    }
    close(e) {
      e.forEach((t) => {
        let n = this._conn[To(t)];
        n && n.close();
      });
    }
    async ensureRelay(e) {
      const t = To(e);
      this._conn[t] ||
        (this._conn[t] = Fd(t, {
          getTimeout: this.getTimeout * 0.9,
          listTimeout: this.getTimeout * 0.9,
        }));
      const n = this._conn[t];
      return await n.connect(), n;
    }
    sub(e, t, n) {
      let r = new Set(),
        o = { ...(n || {}) };
      o.alreadyHaveEvent = (h, y) => {
        var d;
        if (
          (d = n == null ? void 0 : n.alreadyHaveEvent) != null &&
          d.call(n, h, y)
        )
          return !0;
        let p = this._seenOn[h] || new Set();
        return p.add(y), (this._seenOn[h] = p), r.has(h);
      };
      let i = [],
        s = new Set(),
        a = new Set(),
        c = e.length,
        u = !1,
        f = setTimeout(() => {
          u = !0;
          for (let h of a.values()) h();
        }, this.eoseSubTimeout);
      e.forEach(async (h) => {
        let y;
        try {
          y = await this.ensureRelay(h);
        } catch {
          d();
          return;
        }
        if (!y) return;
        let p = y.sub(t, o);
        p.on('event', (m) => {
          r.add(m.id);
          for (let b of s.values()) b(m);
        }),
          p.on('eose', () => {
            u || d();
          }),
          i.push(p);
        function d() {
          if ((c--, c === 0)) {
            clearTimeout(f);
            for (let m of a.values()) m();
          }
        }
      });
      let l = {
        sub(h, y) {
          return i.forEach((p) => p.sub(h, y)), l;
        },
        unsub() {
          i.forEach((h) => h.unsub());
        },
        on(h, y) {
          h === 'event' ? s.add(y) : h === 'eose' && a.add(y);
        },
        off(h, y) {
          h === 'event' ? s.delete(y) : h === 'eose' && a.delete(y);
        },
      };
      return l;
    }
    get(e, t, n) {
      return new Promise((r) => {
        let o = this.sub(e, [t], n),
          i = setTimeout(() => {
            o.unsub(), r(null);
          }, this.getTimeout);
        o.on('event', (s) => {
          r(s), clearTimeout(i), o.unsub();
        });
      });
    }
    list(e, t, n) {
      return new Promise((r) => {
        let o = [],
          i = this.sub(e, t, n);
        i.on('event', (s) => {
          o.push(s);
        }),
          i.on('eose', () => {
            i.unsub(), r(o);
          });
      });
    }
    publish(e, t) {
      const n = e.map(async (o) => {
          let i;
          try {
            return (i = await this.ensureRelay(o)), i.publish(t);
          } catch {
            return { on() {}, off() {} };
          }
        }),
        r = new Map();
      return {
        on(o, i) {
          e.forEach(async (s, a) => {
            let c = await n[a],
              u = () => i(s);
            r.set(i, u), c.on(o, u);
          });
        },
        off(o, i) {
          e.forEach(async (s, a) => {
            let c = r.get(i);
            c && (await n[a]).off(o, c);
          });
        },
      };
    }
    seenOn(e) {
      var t, n;
      return Array.from(
        ((n = (t = this._seenOn[e]) == null ? void 0 : t.values) == null
          ? void 0
          : n.call(t)) || [],
      );
    }
  },
  ln = {};
fe(ln, {
  BECH32_REGEX: () => Qa,
  decode: () => Er,
  naddrEncode: () => eh,
  neventEncode: () => Qd,
  noteEncode: () => Yd,
  nprofileEncode: () => Xd,
  npubEncode: () => Jd,
  nrelayEncode: () => th,
  nsecEncode: () => Gd,
});
var Kt = 5e3,
  Qa = /[\x21-\x7E]{1,83}1[023456789acdefghjklmnpqrstuvwxyz]{6,}/;
function Er(e) {
  var o, i, s, a, c, u, f;
  let { prefix: t, words: n } = be.decode(e, Kt),
    r = new Uint8Array(be.fromWords(n));
  switch (t) {
    case 'nprofile': {
      let l = Nn(r);
      if (!((o = l[0]) != null && o[0]))
        throw new Error('missing TLV 0 for nprofile');
      if (l[0][0].length !== 32) throw new Error('TLV 0 should be 32 bytes');
      return {
        type: 'nprofile',
        data: {
          pubkey: we(l[0][0]),
          relays: l[1] ? l[1].map((h) => ft.decode(h)) : [],
        },
      };
    }
    case 'nevent': {
      let l = Nn(r);
      if (!((i = l[0]) != null && i[0]))
        throw new Error('missing TLV 0 for nevent');
      if (l[0][0].length !== 32) throw new Error('TLV 0 should be 32 bytes');
      if (l[2] && l[2][0].length !== 32)
        throw new Error('TLV 2 should be 32 bytes');
      return {
        type: 'nevent',
        data: {
          id: we(l[0][0]),
          relays: l[1] ? l[1].map((h) => ft.decode(h)) : [],
          author: (s = l[2]) != null && s[0] ? we(l[2][0]) : void 0,
        },
      };
    }
    case 'naddr': {
      let l = Nn(r);
      if (!((a = l[0]) != null && a[0]))
        throw new Error('missing TLV 0 for naddr');
      if (!((c = l[2]) != null && c[0]))
        throw new Error('missing TLV 2 for naddr');
      if (l[2][0].length !== 32) throw new Error('TLV 2 should be 32 bytes');
      if (!((u = l[3]) != null && u[0]))
        throw new Error('missing TLV 3 for naddr');
      if (l[3][0].length !== 4) throw new Error('TLV 3 should be 4 bytes');
      return {
        type: 'naddr',
        data: {
          identifier: ft.decode(l[0][0]),
          pubkey: we(l[2][0]),
          kind: parseInt(we(l[3][0]), 16),
          relays: l[1] ? l[1].map((h) => ft.decode(h)) : [],
        },
      };
    }
    case 'nrelay': {
      let l = Nn(r);
      if (!((f = l[0]) != null && f[0]))
        throw new Error('missing TLV 0 for nrelay');
      return { type: 'nrelay', data: ft.decode(l[0][0]) };
    }
    case 'nsec':
    case 'npub':
    case 'note':
      return { type: t, data: we(r) };
    default:
      throw new Error(`unknown prefix ${t}`);
  }
}
function Nn(e) {
  let t = {},
    n = e;
  for (; n.length > 0; ) {
    let r = n[0],
      o = n[1];
    if (!o) throw new Error(`malformed TLV ${r}`);
    let i = n.slice(2, 2 + o);
    if (((n = n.slice(2 + o)), i.length < o))
      throw new Error(`not enough data to read on TLV ${r}`);
    (t[r] = t[r] || []), t[r].push(i);
  }
  return t;
}
function Gd(e) {
  return hi('nsec', e);
}
function Jd(e) {
  return hi('npub', e);
}
function Yd(e) {
  return hi('note', e);
}
function hi(e, t) {
  let n = bt(t),
    r = be.toWords(n);
  return be.encode(e, r, Kt);
}
function Xd(e) {
  let t = xr({
      0: [bt(e.pubkey)],
      1: (e.relays || []).map((r) => qe.encode(r)),
    }),
    n = be.toWords(t);
  return be.encode('nprofile', n, Kt);
}
function Qd(e) {
  let t = xr({
      0: [bt(e.id)],
      1: (e.relays || []).map((r) => qe.encode(r)),
      2: e.author ? [bt(e.author)] : [],
    }),
    n = be.toWords(t);
  return be.encode('nevent', n, Kt);
}
function eh(e) {
  let t = new ArrayBuffer(4);
  new DataView(t).setUint32(0, e.kind, !1);
  let n = xr({
      0: [qe.encode(e.identifier)],
      1: (e.relays || []).map((o) => qe.encode(o)),
      2: [bt(e.pubkey)],
      3: [new Uint8Array(t)],
    }),
    r = be.toWords(n);
  return be.encode('naddr', r, Kt);
}
function th(e) {
  let t = xr({ 0: [qe.encode(e)] }),
    n = be.toWords(t);
  return be.encode('nrelay', n, Kt);
}
function xr(e) {
  let t = [];
  return (
    Object.entries(e).forEach(([n, r]) => {
      r.forEach((o) => {
        let i = new Uint8Array(o.length + 2);
        i.set([parseInt(n)], 0), i.set([o.length], 1), i.set(o, 2), t.push(i);
      });
    }),
    Ot(...t)
  );
}
var nh = {};
fe(nh, { decrypt: () => oh, encrypt: () => rh });
typeof crypto < 'u' &&
  !crypto.subtle &&
  crypto.webcrypto &&
  (crypto.subtle = crypto.webcrypto.subtle);
async function rh(e, t, n) {
  const r = he.getSharedSecret(e, '02' + t),
    o = ec(r);
  let i = Uint8Array.from(hr(16)),
    s = qe.encode(n),
    a = await crypto.subtle.importKey('raw', o, { name: 'AES-CBC' }, !1, [
      'encrypt',
    ]),
    c = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: i }, a, s),
    u = Ht.encode(new Uint8Array(c)),
    f = Ht.encode(new Uint8Array(i.buffer));
  return `${u}?iv=${f}`;
}
async function oh(e, t, n) {
  let [r, o] = n.split('?iv='),
    i = he.getSharedSecret(e, '02' + t),
    s = ec(i),
    a = await crypto.subtle.importKey('raw', s, { name: 'AES-CBC' }, !1, [
      'decrypt',
    ]),
    c = Ht.decode(r),
    u = Ht.decode(o),
    f = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: u }, a, c);
  return ft.decode(f);
}
function ec(e) {
  return e.slice(1, 33);
}
var ih = {};
fe(ih, {
  NIP05_REGEX: () => tc,
  queryProfile: () => ch,
  searchDomain: () => ah,
  useFetchImplementation: () => sh,
});
var tc = /^(?:([\w.+-]+)@)?([\w.-]+)$/,
  Sr;
try {
  Sr = fetch;
} catch {}
function sh(e) {
  Sr = e;
}
async function ah(e, t = '') {
  try {
    return (
      await (await Sr(`https://${e}/.well-known/nostr.json?name=${t}`)).json()
    ).names;
  } catch {
    return {};
  }
}
async function ch(e) {
  const t = e.match(tc);
  if (!t) return null;
  const [n, r = '_', o] = t;
  try {
    const i = await Sr(`https://${o}/.well-known/nostr.json?name=${r}`),
      { names: s, relays: a } = uh(await i.json()),
      c = s[r];
    return c ? { pubkey: c, relays: a == null ? void 0 : a[c] } : null;
  } catch {
    return null;
  }
}
function uh(e) {
  const t = { names: {} };
  for (const [n, r] of Object.entries(e.names))
    typeof n == 'string' && typeof r == 'string' && (t.names[n] = r);
  if (e.relays) {
    t.relays = {};
    for (const [n, r] of Object.entries(e.relays))
      typeof n == 'string' &&
        Array.isArray(r) &&
        (t.relays[n] = r.filter((o) => typeof o == 'string'));
  }
  return t;
}
var lh = {};
fe(lh, {
  generateSeedWords: () => dh,
  privateKeyFromSeedWords: () => fh,
  validateWords: () => hh,
});
function fh(e, t) {
  let r = Tt.fromMasterSeed(Ca(e, t)).derive("m/44'/1237'/0'/0/0").privateKey;
  if (!r) throw new Error('could not derive private key');
  return we(r);
}
function dh() {
  return ja(ii);
}
function hh(e) {
  return za(e, ii);
}
var ph = {};
fe(ph, { parse: () => yh });
function yh(e) {
  const t = { reply: void 0, root: void 0, mentions: [], profiles: [] },
    n = [];
  for (const r of e.tags)
    r[0] === 'e' && r[1] && n.push(r),
      r[0] === 'p' &&
        r[1] &&
        t.profiles.push({ pubkey: r[1], relays: r[2] ? [r[2]] : [] });
  for (let r = 0; r < n.length; r++) {
    const o = n[r],
      [i, s, a, c] = o,
      u = { id: s, relays: a ? [a] : [] },
      f = r === 0,
      l = r === n.length - 1;
    if (c === 'root') {
      t.root = u;
      continue;
    }
    if (c === 'reply') {
      t.reply = u;
      continue;
    }
    if (c === 'mention') {
      t.mentions.push(u);
      continue;
    }
    if (f) {
      t.root = u;
      continue;
    }
    if (l) {
      t.reply = u;
      continue;
    }
    t.mentions.push(u);
  }
  return t;
}
var bh = {};
fe(bh, { getPow: () => mh });
function mh(e) {
  return gh(bt(e));
}
function gh(e) {
  let t, n, r;
  for (n = 0, t = 0; n < e.length && ((r = wh(e[n])), (t += r), r === 8); n++);
  return t;
}
function wh(e) {
  let t = 0;
  if (e === 0) return 8;
  for (; (e >>= 1); ) t++;
  return 7 - t;
}
var vh = {};
fe(vh, {
  finishRepostEvent: () => Eh,
  getRepostedEvent: () => xh,
  getRepostedEventPointer: () => nc,
});
function Eh(e, t, n, r) {
  return Ja(
    {
      kind: 6,
      tags: [...(e.tags ?? []), ['e', t.id, n], ['p', t.pubkey]],
      content: e.content === '' ? '' : JSON.stringify(t),
      created_at: e.created_at,
    },
    r,
  );
}
function nc(e) {
  if (e.kind !== 6) return;
  let t, n;
  for (
    let r = e.tags.length - 1;
    r >= 0 && (t === void 0 || n === void 0);
    r--
  ) {
    const o = e.tags[r];
    o.length >= 2 &&
      (o[0] === 'e' && t === void 0
        ? (t = o)
        : o[0] === 'p' && n === void 0 && (n = o));
  }
  if (t !== void 0)
    return {
      id: t[1],
      relays: [t[2], n == null ? void 0 : n[2]].filter(
        (r) => typeof r == 'string',
      ),
      author: n == null ? void 0 : n[1],
    };
}
function xh(e, { skipVerification: t } = {}) {
  const n = nc(e);
  if (n === void 0 || e.content === '') return;
  let r;
  try {
    r = JSON.parse(e.content);
  } catch {
    return;
  }
  if (r.id === n.id && !(!t && !di(r))) return r;
}
var Sh = {};
fe(Sh, { NOSTR_URI_REGEX: () => Ar, parse: () => _h, test: () => Ah });
var Ar = new RegExp(`nostr:(${Qa.source})`);
function Ah(e) {
  return typeof e == 'string' && new RegExp(`^${Ar.source}$`).test(e);
}
function _h(e) {
  const t = e.match(new RegExp(`^${Ar.source}$`));
  if (!t) throw new Error(`Invalid Nostr URI: ${e}`);
  return { uri: t[0], value: t[1], decoded: Er(t[1]) };
}
var Th = {};
fe(Th, { finishReactionEvent: () => kh, getReactedEventPointer: () => Oh });
function kh(e, t, n) {
  const r = t.tags.filter(
    (o) => o.length >= 2 && (o[0] === 'e' || o[0] === 'p'),
  );
  return Ja(
    {
      ...e,
      kind: 7,
      tags: [...(e.tags ?? []), ...r, ['e', t.id], ['p', t.pubkey]],
      content: e.content ?? '+',
    },
    n,
  );
}
function Oh(e) {
  if (e.kind !== 7) return;
  let t, n;
  for (
    let r = e.tags.length - 1;
    r >= 0 && (t === void 0 || n === void 0);
    r--
  ) {
    const o = e.tags[r];
    o.length >= 2 &&
      (o[0] === 'e' && t === void 0
        ? (t = o)
        : o[0] === 'p' && n === void 0 && (n = o));
  }
  if (!(t === void 0 || n === void 0))
    return {
      id: t[1],
      relays: [t[2], n[2]].filter((r) => r !== void 0),
      author: n[1],
    };
}
var Bh = {};
fe(Bh, { createDelegation: () => Ih, getDelegator: () => Rh });
function Ih(e, t) {
  let n = [];
  (t.kind || -1) >= 0 && n.push(`kind=${t.kind}`),
    t.until && n.push(`created_at<${t.until}`),
    t.since && n.push(`created_at>${t.since}`);
  let r = n.join('&');
  if (r === '')
    throw new Error('refusing to create a delegation without any conditions');
  let o = $e(qe.encode(`nostr:delegation:${t.pubkey}:${r}`)),
    i = we(wn.sign(o, e));
  return { from: Fa(e), to: t.pubkey, cond: r, sig: i };
}
function Rh(e) {
  let t = e.tags.find((a) => a[0] === 'delegation' && a.length >= 4);
  if (!t) return null;
  let n = t[1],
    r = t[2],
    o = t[3],
    i = r.split('&');
  for (let a = 0; a < i.length; a++) {
    let [c, u, f] = i[a].split(/\b/);
    if (!(c === 'kind' && u === '=' && e.kind === parseInt(f))) {
      if (c === 'created_at' && u === '<' && e.created_at < parseInt(f))
        continue;
      if (c === 'created_at' && u === '>' && e.created_at > parseInt(f))
        continue;
      return null;
    }
  }
  let s = $e(qe.encode(`nostr:delegation:${e.pubkey}:${r}`));
  return wn.verify(o, s, n) ? n : null;
}
var Nh = {};
fe(Nh, { matchAll: () => Ch, regex: () => pi, replaceAll: () => Ph });
var pi = () => new RegExp(`\\b${Ar.source}\\b`, 'g');
function* Ch(e) {
  const t = e.matchAll(pi());
  for (const n of t)
    try {
      const [r, o] = n;
      yield {
        uri: r,
        value: o,
        decoded: Er(o),
        start: n.index,
        end: n.index + r.length,
      };
    } catch {}
}
function Ph(e, t) {
  return e.replaceAll(pi(), (n, r) => t({ uri: n, value: r, decoded: Er(r) }));
}
var Lh = {};
fe(Lh, { useFetchImplementation: () => Uh, validateGithub: () => Hh });
var yi;
try {
  yi = fetch;
} catch {}
function Uh(e) {
  yi = e;
}
async function Hh(e, t, n) {
  try {
    return (
      (await (await yi(`https://gist.github.com/${t}/${n}/raw`)).text()) ===
      `Verifying that I control the following Nostr public key: ${e}`
    );
  } catch {
    return !1;
  }
}
var Dh = {};
fe(Dh, { authenticate: () => jh });
var jh = async ({ challenge: e, relay: t, sign: n }) => {
    const r = {
        kind: 22242,
        created_at: Math.floor(Date.now() / 1e3),
        tags: [
          ['relay', t.url],
          ['challenge', e],
        ],
        content: '',
      },
      o = t.auth(await n(r));
    return new Promise((i, s) => {
      o.on('ok', function a() {
        o.off('ok', a), i();
      }),
        o.on('failed', function a(c) {
          o.off('failed', a), s(c);
        });
    });
  },
  $h = {};
fe($h, {
  getZapEndpoint: () => Mh,
  makeZapReceipt: () => Kh,
  makeZapRequest: () => zh,
  useFetchImplementation: () => qh,
  validateZapRequest: () => Vh,
});
var bi;
try {
  bi = fetch;
} catch {}
function qh(e) {
  bi = e;
}
async function Mh(e) {
  try {
    let t = '',
      { lud06: n, lud16: r } = JSON.parse(e.content);
    if (n) {
      let { words: s } = be.decode(n, 1e3),
        a = be.fromWords(s);
      t = ft.decode(a);
    } else if (r) {
      let [s, a] = r.split('@');
      t = `https://${a}/.well-known/lnurlp/${s}`;
    } else return null;
    let i = await (await bi(t)).json();
    if (i.allowsNostr && i.nostrPubkey) return i.callback;
  } catch {}
  return null;
}
function zh({ profile: e, event: t, amount: n, relays: r, comment: o = '' }) {
  if (!n) throw new Error('amount not given');
  if (!e) throw new Error('profile not given');
  let i = {
    kind: 9734,
    created_at: Math.round(Date.now() / 1e3),
    content: o,
    tags: [
      ['p', e],
      ['amount', n.toString()],
      ['relays', ...r],
    ],
  };
  return t && i.tags.push(['e', t]), i;
}
function Vh(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch {
    return 'Invalid zap request JSON.';
  }
  if (!fi(t)) return 'Zap request is not a valid Nostr event.';
  if (!di(t)) return 'Invalid signature on zap request.';
  let n = t.tags.find(([i, s]) => i === 'p' && s);
  if (!n) return "Zap request doesn't have a 'p' tag.";
  if (!n[1].match(/^[a-f0-9]{64}$/))
    return "Zap request 'p' tag is not valid hex.";
  let r = t.tags.find(([i, s]) => i === 'e' && s);
  return r && !r[1].match(/^[a-f0-9]{64}$/)
    ? "Zap request 'e' tag is not valid hex."
    : t.tags.find(([i, s]) => i === 'relays' && s)
    ? null
    : "Zap request doesn't have a 'relays' tag.";
}
function Kh({ zapRequest: e, preimage: t, bolt11: n, paidAt: r }) {
  let i = JSON.parse(e).tags.filter(
      ([a]) => a === 'e' || a === 'p' || a === 'a',
    ),
    s = {
      kind: 9735,
      created_at: Math.round(r.getTime() / 1e3),
      content: '',
      tags: [...i, ['bolt11', n], ['description', e]],
    };
  return t && s.tags.push(['preimage', t]), s;
}
var Wh = Object.defineProperty,
  Fh = (e, t, n) =>
    t in e
      ? Wh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  ct = (e, t, n) => (Fh(e, typeof t != 'symbol' ? t + '' : t, n), n);
const Zh = 'text/plain',
  Gh = 'us-ascii',
  Xr = (e, t) => t.some((n) => (n instanceof RegExp ? n.test(e) : n === e)),
  Jh = new Set(['https:', 'http:', 'file:']),
  Yh = (e) => {
    try {
      const { protocol: t } = new URL(e);
      return t.endsWith(':') && !Jh.has(t);
    } catch {
      return !1;
    }
  },
  Xh = (e, { stripHash: t }) => {
    var n;
    const r = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(e);
    if (!r) throw new Error(`Invalid URL: ${e}`);
    let { type: o, data: i, hash: s } = r.groups;
    const a = o.split(';');
    s = t ? '' : s;
    let c = !1;
    a[a.length - 1] === 'base64' && (a.pop(), (c = !0));
    const u = ((n = a.shift()) == null ? void 0 : n.toLowerCase()) ?? '',
      f = [
        ...a
          .map((l) => {
            let [h, y = ''] = l.split('=').map((p) => p.trim());
            return h === 'charset' && ((y = y.toLowerCase()), y === Gh)
              ? ''
              : `${h}${y ? `=${y}` : ''}`;
          })
          .filter(Boolean),
      ];
    return (
      c && f.push('base64'),
      (f.length > 0 || (u && u !== Zh)) && f.unshift(u),
      `data:${f.join(';')},${c ? i.trim() : i}${s ? `#${s}` : ''}`
    );
  };
function Qh(e, t) {
  if (
    ((t = {
      defaultProtocol: 'http',
      normalizeProtocol: !0,
      forceHttp: !1,
      forceHttps: !1,
      stripAuthentication: !0,
      stripHash: !1,
      stripTextFragment: !0,
      stripWWW: !0,
      removeQueryParameters: [/^utm_\w+/i],
      removeTrailingSlash: !0,
      removeSingleSlash: !0,
      removeDirectoryIndex: !1,
      removeExplicitPort: !1,
      sortQueryParameters: !0,
      ...t,
    }),
    typeof t.defaultProtocol == 'string' &&
      !t.defaultProtocol.endsWith(':') &&
      (t.defaultProtocol = `${t.defaultProtocol}:`),
    (e = e.trim()),
    /^data:/i.test(e))
  )
    return Xh(e, t);
  if (Yh(e)) return e;
  const n = e.startsWith('//');
  (!n && /^\.*\//.test(e)) ||
    (e = e.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, t.defaultProtocol));
  const r = new URL(e);
  if (t.forceHttp && t.forceHttps)
    throw new Error(
      'The `forceHttp` and `forceHttps` options cannot be used together',
    );
  if (
    (t.forceHttp && r.protocol === 'https:' && (r.protocol = 'http:'),
    t.forceHttps && r.protocol === 'http:' && (r.protocol = 'https:'),
    t.stripAuthentication && ((r.username = ''), (r.password = '')),
    t.stripHash
      ? (r.hash = '')
      : t.stripTextFragment && (r.hash = r.hash.replace(/#?:~:text.*?$/i, '')),
    r.pathname)
  ) {
    const i = /\b[a-z][a-z\d+\-.]{1,50}:\/\//g;
    let s = 0,
      a = '';
    for (;;) {
      const u = i.exec(r.pathname);
      if (!u) break;
      const f = u[0],
        l = u.index,
        h = r.pathname.slice(s, l);
      (a += h.replace(/\/{2,}/g, '/')), (a += f), (s = l + f.length);
    }
    const c = r.pathname.slice(s, r.pathname.length);
    (a += c.replace(/\/{2,}/g, '/')), (r.pathname = a);
  }
  if (r.pathname)
    try {
      r.pathname = decodeURI(r.pathname);
    } catch {}
  if (
    (t.removeDirectoryIndex === !0 &&
      (t.removeDirectoryIndex = [/^index\.[a-z]+$/]),
    Array.isArray(t.removeDirectoryIndex) && t.removeDirectoryIndex.length > 0)
  ) {
    let i = r.pathname.split('/');
    const s = i[i.length - 1];
    Xr(s, t.removeDirectoryIndex) &&
      ((i = i.slice(0, -1)), (r.pathname = i.slice(1).join('/') + '/'));
  }
  if (
    (r.hostname &&
      ((r.hostname = r.hostname.replace(/\.$/, '')),
      t.stripWWW &&
        /^www\.(?!www\.)[a-z\-\d]{1,63}\.[a-z.\-\d]{2,63}$/.test(r.hostname) &&
        (r.hostname = r.hostname.replace(/^www\./, ''))),
    Array.isArray(t.removeQueryParameters))
  )
    for (const i of [...r.searchParams.keys()])
      Xr(i, t.removeQueryParameters) && r.searchParams.delete(i);
  if (
    (!Array.isArray(t.keepQueryParameters) &&
      t.removeQueryParameters === !0 &&
      (r.search = ''),
    Array.isArray(t.keepQueryParameters) && t.keepQueryParameters.length > 0)
  )
    for (const i of [...r.searchParams.keys()])
      Xr(i, t.keepQueryParameters) || r.searchParams.delete(i);
  if (t.sortQueryParameters) {
    r.searchParams.sort();
    try {
      r.search = decodeURIComponent(r.search);
    } catch {}
  }
  t.removeTrailingSlash && (r.pathname = r.pathname.replace(/\/$/, '')),
    t.removeExplicitPort && r.port && (r.port = '');
  const o = e;
  return (
    (e = r.toString()),
    !t.removeSingleSlash &&
      r.pathname === '/' &&
      !o.endsWith('/') &&
      r.hash === '' &&
      (e = e.replace(/\/$/, '')),
    (t.removeTrailingSlash || r.pathname === '/') &&
      r.hash === '' &&
      t.removeSingleSlash &&
      (e = e.replace(/\/$/, '')),
    n && !t.normalizeProtocol && (e = e.replace(/^http:\/\//, '//')),
    t.stripProtocol && (e = e.replace(/^(?:https?:)?\/\//, '')),
    e
  );
}
var ko = function (e, t) {
  return (
    (ko =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (n, r) {
          n.__proto__ = r;
        }) ||
      function (n, r) {
        for (var o in r)
          Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o]);
      }),
    ko(e, t)
  );
};
function Le(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError(
      'Class extends value ' + String(t) + ' is not a constructor or null',
    );
  ko(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype =
    t === null ? Object.create(t) : ((n.prototype = t.prototype), new n());
}
var Oo = function () {
  return (
    (Oo =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++) {
          t = arguments[n];
          for (var o in t)
            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        }
        return e;
      }),
    Oo.apply(this, arguments)
  );
};
function ep(e, t, n, r) {
  function o(i) {
    return i instanceof n
      ? i
      : new n(function (s) {
          s(i);
        });
  }
  return new (n || (n = Promise))(function (i, s) {
    function a(f) {
      try {
        u(r.next(f));
      } catch (l) {
        s(l);
      }
    }
    function c(f) {
      try {
        u(r.throw(f));
      } catch (l) {
        s(l);
      }
    }
    function u(f) {
      f.done ? i(f.value) : o(f.value).then(a, c);
    }
    u((r = r.apply(e, t || [])).next());
  });
}
function rc(e, t) {
  var n = {
      label: 0,
      sent: function () {
        if (i[0] & 1) throw i[1];
        return i[1];
      },
      trys: [],
      ops: [],
    },
    r,
    o,
    i,
    s;
  return (
    (s = { next: a(0), throw: a(1), return: a(2) }),
    typeof Symbol == 'function' &&
      (s[Symbol.iterator] = function () {
        return this;
      }),
    s
  );
  function a(u) {
    return function (f) {
      return c([u, f]);
    };
  }
  function c(u) {
    if (r) throw new TypeError('Generator is already executing.');
    for (; s && ((s = 0), u[0] && (n = 0)), n; )
      try {
        if (
          ((r = 1),
          o &&
            (i =
              u[0] & 2
                ? o.return
                : u[0]
                ? o.throw || ((i = o.return) && i.call(o), 0)
                : o.next) &&
            !(i = i.call(o, u[1])).done)
        )
          return i;
        switch (((o = 0), i && (u = [u[0] & 2, i.value]), u[0])) {
          case 0:
          case 1:
            i = u;
            break;
          case 4:
            return n.label++, { value: u[1], done: !1 };
          case 5:
            n.label++, (o = u[1]), (u = [0]);
            continue;
          case 7:
            (u = n.ops.pop()), n.trys.pop();
            continue;
          default:
            if (
              ((i = n.trys),
              !(i = i.length > 0 && i[i.length - 1]) &&
                (u[0] === 6 || u[0] === 2))
            ) {
              n = 0;
              continue;
            }
            if (u[0] === 3 && (!i || (u[1] > i[0] && u[1] < i[3]))) {
              n.label = u[1];
              break;
            }
            if (u[0] === 6 && n.label < i[1]) {
              (n.label = i[1]), (i = u);
              break;
            }
            if (i && n.label < i[2]) {
              (n.label = i[2]), n.ops.push(u);
              break;
            }
            i[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        u = t.call(e, n);
      } catch (f) {
        (u = [6, f]), (o = 0);
      } finally {
        r = i = 0;
      }
    if (u[0] & 5) throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
function jt(e) {
  var t = typeof Symbol == 'function' && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == 'number')
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
  );
}
function fn(e, t) {
  var n = typeof Symbol == 'function' && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e),
    o,
    i = [],
    s;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = r.next()).done; ) i.push(o.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      o && !o.done && (n = r.return) && n.call(r);
    } finally {
      if (s) throw s.error;
    }
  }
  return i;
}
function dn(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
      (i || !(r in t)) &&
        (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
  return e.concat(i || Array.prototype.slice.call(t));
}
function Pt(e) {
  return this instanceof Pt ? ((this.v = e), this) : new Pt(e);
}
function tp(e, t, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError('Symbol.asyncIterator is not defined.');
  var r = n.apply(e, t || []),
    o,
    i = [];
  return (
    (o = {}),
    s('next'),
    s('throw'),
    s('return'),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(h) {
    r[h] &&
      (o[h] = function (y) {
        return new Promise(function (p, d) {
          i.push([h, y, p, d]) > 1 || a(h, y);
        });
      });
  }
  function a(h, y) {
    try {
      c(r[h](y));
    } catch (p) {
      l(i[0][3], p);
    }
  }
  function c(h) {
    h.value instanceof Pt
      ? Promise.resolve(h.value.v).then(u, f)
      : l(i[0][2], h);
  }
  function u(h) {
    a('next', h);
  }
  function f(h) {
    a('throw', h);
  }
  function l(h, y) {
    h(y), i.shift(), i.length && a(i[0][0], i[0][1]);
  }
}
function np(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError('Symbol.asyncIterator is not defined.');
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof jt == 'function' ? jt(e) : e[Symbol.iterator]()),
      (n = {}),
      r('next'),
      r('throw'),
      r('return'),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(i) {
    n[i] =
      e[i] &&
      function (s) {
        return new Promise(function (a, c) {
          (s = e[i](s)), o(a, c, s.done, s.value);
        });
      };
  }
  function o(i, s, a, c) {
    Promise.resolve(c).then(function (u) {
      i({ value: u, done: a });
    }, s);
  }
}
function G(e) {
  return typeof e == 'function';
}
function _r(e) {
  var t = function (r) {
      Error.call(r), (r.stack = new Error().stack);
    },
    n = e(t);
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var Qr = _r(function (e) {
  return function (t) {
    e(this),
      (this.message = t
        ? t.length +
          ` errors occurred during unsubscription:
` +
          t.map(function (n, r) {
            return r + 1 + ') ' + n.toString();
          }).join(`
  `)
        : ''),
      (this.name = 'UnsubscriptionError'),
      (this.errors = t);
  };
});
function nr(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var Wt = (function () {
    function e(t) {
      (this.initialTeardown = t),
        (this.closed = !1),
        (this._parentage = null),
        (this._finalizers = null);
    }
    return (
      (e.prototype.unsubscribe = function () {
        var t, n, r, o, i;
        if (!this.closed) {
          this.closed = !0;
          var s = this._parentage;
          if (s)
            if (((this._parentage = null), Array.isArray(s)))
              try {
                for (var a = jt(s), c = a.next(); !c.done; c = a.next()) {
                  var u = c.value;
                  u.remove(this);
                }
              } catch (d) {
                t = { error: d };
              } finally {
                try {
                  c && !c.done && (n = a.return) && n.call(a);
                } finally {
                  if (t) throw t.error;
                }
              }
            else s.remove(this);
          var f = this.initialTeardown;
          if (G(f))
            try {
              f();
            } catch (d) {
              i = d instanceof Qr ? d.errors : [d];
            }
          var l = this._finalizers;
          if (l) {
            this._finalizers = null;
            try {
              for (var h = jt(l), y = h.next(); !y.done; y = h.next()) {
                var p = y.value;
                try {
                  as(p);
                } catch (d) {
                  (i = i ?? []),
                    d instanceof Qr
                      ? (i = dn(dn([], fn(i)), fn(d.errors)))
                      : i.push(d);
                }
              }
            } catch (d) {
              r = { error: d };
            } finally {
              try {
                y && !y.done && (o = h.return) && o.call(h);
              } finally {
                if (r) throw r.error;
              }
            }
          }
          if (i) throw new Qr(i);
        }
      }),
      (e.prototype.add = function (t) {
        var n;
        if (t && t !== this)
          if (this.closed) as(t);
          else {
            if (t instanceof e) {
              if (t.closed || t._hasParent(this)) return;
              t._addParent(this);
            }
            (this._finalizers =
              (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
          }
      }),
      (e.prototype._hasParent = function (t) {
        var n = this._parentage;
        return n === t || (Array.isArray(n) && n.includes(t));
      }),
      (e.prototype._addParent = function (t) {
        var n = this._parentage;
        this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
      }),
      (e.prototype._removeParent = function (t) {
        var n = this._parentage;
        n === t ? (this._parentage = null) : Array.isArray(n) && nr(n, t);
      }),
      (e.prototype.remove = function (t) {
        var n = this._finalizers;
        n && nr(n, t), t instanceof e && t._removeParent(this);
      }),
      (e.EMPTY = (function () {
        var t = new e();
        return (t.closed = !0), t;
      })()),
      e
    );
  })(),
  oc = Wt.EMPTY;
function ic(e) {
  return (
    e instanceof Wt ||
    (e && 'closed' in e && G(e.remove) && G(e.add) && G(e.unsubscribe))
  );
}
function as(e) {
  G(e) ? e() : e.unsubscribe();
}
var sc = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1,
  },
  rp = {
    setTimeout: function (e, t) {
      for (var n = [], r = 2; r < arguments.length; r++)
        n[r - 2] = arguments[r];
      return setTimeout.apply(void 0, dn([e, t], fn(n)));
    },
    clearTimeout: function (e) {
      return clearTimeout(e);
    },
    delegate: void 0,
  };
function ac(e) {
  rp.setTimeout(function () {
    throw e;
  });
}
function rr() {}
function $n(e) {
  e();
}
var Tr = (function (e) {
    Le(t, e);
    function t(n) {
      var r = e.call(this) || this;
      return (
        (r.isStopped = !1),
        n ? ((r.destination = n), ic(n) && n.add(r)) : (r.destination = ap),
        r
      );
    }
    return (
      (t.create = function (n, r, o) {
        return new Bo(n, r, o);
      }),
      (t.prototype.next = function (n) {
        this.isStopped || this._next(n);
      }),
      (t.prototype.error = function (n) {
        this.isStopped || ((this.isStopped = !0), this._error(n));
      }),
      (t.prototype.complete = function () {
        this.isStopped || ((this.isStopped = !0), this._complete());
      }),
      (t.prototype.unsubscribe = function () {
        this.closed ||
          ((this.isStopped = !0),
          e.prototype.unsubscribe.call(this),
          (this.destination = null));
      }),
      (t.prototype._next = function (n) {
        this.destination.next(n);
      }),
      (t.prototype._error = function (n) {
        try {
          this.destination.error(n);
        } finally {
          this.unsubscribe();
        }
      }),
      (t.prototype._complete = function () {
        try {
          this.destination.complete();
        } finally {
          this.unsubscribe();
        }
      }),
      t
    );
  })(Wt),
  op = Function.prototype.bind;
function eo(e, t) {
  return op.call(e, t);
}
var ip = (function () {
    function e(t) {
      this.partialObserver = t;
    }
    return (
      (e.prototype.next = function (t) {
        var n = this.partialObserver;
        if (n.next)
          try {
            n.next(t);
          } catch (r) {
            Cn(r);
          }
      }),
      (e.prototype.error = function (t) {
        var n = this.partialObserver;
        if (n.error)
          try {
            n.error(t);
          } catch (r) {
            Cn(r);
          }
        else Cn(t);
      }),
      (e.prototype.complete = function () {
        var t = this.partialObserver;
        if (t.complete)
          try {
            t.complete();
          } catch (n) {
            Cn(n);
          }
      }),
      e
    );
  })(),
  Bo = (function (e) {
    Le(t, e);
    function t(n, r, o) {
      var i = e.call(this) || this,
        s;
      if (G(n) || !n)
        s = { next: n ?? void 0, error: r ?? void 0, complete: o ?? void 0 };
      else {
        var a;
        i && sc.useDeprecatedNextContext
          ? ((a = Object.create(n)),
            (a.unsubscribe = function () {
              return i.unsubscribe();
            }),
            (s = {
              next: n.next && eo(n.next, a),
              error: n.error && eo(n.error, a),
              complete: n.complete && eo(n.complete, a),
            }))
          : (s = n);
      }
      return (i.destination = new ip(s)), i;
    }
    return t;
  })(Tr);
function Cn(e) {
  ac(e);
}
function sp(e) {
  throw e;
}
var ap = { closed: !0, next: rr, error: sp, complete: rr },
  mi = (function () {
    return (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
  })();
function Ce(e) {
  return e;
}
function cc() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return uc(e);
}
function uc(e) {
  return e.length === 0
    ? Ce
    : e.length === 1
    ? e[0]
    : function (t) {
        return e.reduce(function (n, r) {
          return r(n);
        }, t);
      };
}
var ce = (function () {
  function e(t) {
    t && (this._subscribe = t);
  }
  return (
    (e.prototype.lift = function (t) {
      var n = new e();
      return (n.source = this), (n.operator = t), n;
    }),
    (e.prototype.subscribe = function (t, n, r) {
      var o = this,
        i = up(t) ? t : new Bo(t, n, r);
      return (
        $n(function () {
          var s = o,
            a = s.operator,
            c = s.source;
          i.add(a ? a.call(i, c) : c ? o._subscribe(i) : o._trySubscribe(i));
        }),
        i
      );
    }),
    (e.prototype._trySubscribe = function (t) {
      try {
        return this._subscribe(t);
      } catch (n) {
        t.error(n);
      }
    }),
    (e.prototype.forEach = function (t, n) {
      var r = this;
      return (
        (n = cs(n)),
        new n(function (o, i) {
          var s = new Bo({
            next: function (a) {
              try {
                t(a);
              } catch (c) {
                i(c), s.unsubscribe();
              }
            },
            error: i,
            complete: o,
          });
          r.subscribe(s);
        })
      );
    }),
    (e.prototype._subscribe = function (t) {
      var n;
      return (n = this.source) === null || n === void 0
        ? void 0
        : n.subscribe(t);
    }),
    (e.prototype[mi] = function () {
      return this;
    }),
    (e.prototype.pipe = function () {
      for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
      return uc(t)(this);
    }),
    (e.prototype.toPromise = function (t) {
      var n = this;
      return (
        (t = cs(t)),
        new t(function (r, o) {
          var i;
          n.subscribe(
            function (s) {
              return (i = s);
            },
            function (s) {
              return o(s);
            },
            function () {
              return r(i);
            },
          );
        })
      );
    }),
    (e.create = function (t) {
      return new e(t);
    }),
    e
  );
})();
function cs(e) {
  var t;
  return (t = e ?? sc.Promise) !== null && t !== void 0 ? t : Promise;
}
function cp(e) {
  return e && G(e.next) && G(e.error) && G(e.complete);
}
function up(e) {
  return (e && e instanceof Tr) || (cp(e) && ic(e));
}
function lp(e) {
  return G(e == null ? void 0 : e.lift);
}
function J(e) {
  return function (t) {
    if (lp(t))
      return t.lift(function (n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError('Unable to lift unknown Observable type');
  };
}
function z(e, t, n, r, o) {
  return new lc(e, t, n, r, o);
}
var lc = (function (e) {
    Le(t, e);
    function t(n, r, o, i, s, a) {
      var c = e.call(this, n) || this;
      return (
        (c.onFinalize = s),
        (c.shouldUnsubscribe = a),
        (c._next = r
          ? function (u) {
              try {
                r(u);
              } catch (f) {
                n.error(f);
              }
            }
          : e.prototype._next),
        (c._error = i
          ? function (u) {
              try {
                i(u);
              } catch (f) {
                n.error(f);
              } finally {
                this.unsubscribe();
              }
            }
          : e.prototype._error),
        (c._complete = o
          ? function () {
              try {
                o();
              } catch (u) {
                n.error(u);
              } finally {
                this.unsubscribe();
              }
            }
          : e.prototype._complete),
        c
      );
    }
    return (
      (t.prototype.unsubscribe = function () {
        var n;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
          var r = this.closed;
          e.prototype.unsubscribe.call(this),
            !r &&
              ((n = this.onFinalize) === null || n === void 0 || n.call(this));
        }
      }),
      t
    );
  })(Tr),
  fp = _r(function (e) {
    return function () {
      e(this),
        (this.name = 'ObjectUnsubscribedError'),
        (this.message = 'object unsubscribed');
    };
  }),
  je = (function (e) {
    Le(t, e);
    function t() {
      var n = e.call(this) || this;
      return (
        (n.closed = !1),
        (n.currentObservers = null),
        (n.observers = []),
        (n.isStopped = !1),
        (n.hasError = !1),
        (n.thrownError = null),
        n
      );
    }
    return (
      (t.prototype.lift = function (n) {
        var r = new Io(this, this);
        return (r.operator = n), r;
      }),
      (t.prototype._throwIfClosed = function () {
        if (this.closed) throw new fp();
      }),
      (t.prototype.next = function (n) {
        var r = this;
        $n(function () {
          var o, i;
          if ((r._throwIfClosed(), !r.isStopped)) {
            r.currentObservers ||
              (r.currentObservers = Array.from(r.observers));
            try {
              for (
                var s = jt(r.currentObservers), a = s.next();
                !a.done;
                a = s.next()
              ) {
                var c = a.value;
                c.next(n);
              }
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                a && !a.done && (i = s.return) && i.call(s);
              } finally {
                if (o) throw o.error;
              }
            }
          }
        });
      }),
      (t.prototype.error = function (n) {
        var r = this;
        $n(function () {
          if ((r._throwIfClosed(), !r.isStopped)) {
            (r.hasError = r.isStopped = !0), (r.thrownError = n);
            for (var o = r.observers; o.length; ) o.shift().error(n);
          }
        });
      }),
      (t.prototype.complete = function () {
        var n = this;
        $n(function () {
          if ((n._throwIfClosed(), !n.isStopped)) {
            n.isStopped = !0;
            for (var r = n.observers; r.length; ) r.shift().complete();
          }
        });
      }),
      (t.prototype.unsubscribe = function () {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }),
      Object.defineProperty(t.prototype, 'observed', {
        get: function () {
          var n;
          return (
            ((n = this.observers) === null || n === void 0
              ? void 0
              : n.length) > 0
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype._trySubscribe = function (n) {
        return this._throwIfClosed(), e.prototype._trySubscribe.call(this, n);
      }),
      (t.prototype._subscribe = function (n) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(n),
          this._innerSubscribe(n)
        );
      }),
      (t.prototype._innerSubscribe = function (n) {
        var r = this,
          o = this,
          i = o.hasError,
          s = o.isStopped,
          a = o.observers;
        return i || s
          ? oc
          : ((this.currentObservers = null),
            a.push(n),
            new Wt(function () {
              (r.currentObservers = null), nr(a, n);
            }));
      }),
      (t.prototype._checkFinalizedStatuses = function (n) {
        var r = this,
          o = r.hasError,
          i = r.thrownError,
          s = r.isStopped;
        o ? n.error(i) : s && n.complete();
      }),
      (t.prototype.asObservable = function () {
        var n = new ce();
        return (n.source = this), n;
      }),
      (t.create = function (n, r) {
        return new Io(n, r);
      }),
      t
    );
  })(ce),
  Io = (function (e) {
    Le(t, e);
    function t(n, r) {
      var o = e.call(this) || this;
      return (o.destination = n), (o.source = r), o;
    }
    return (
      (t.prototype.next = function (n) {
        var r, o;
        (o =
          (r = this.destination) === null || r === void 0 ? void 0 : r.next) ===
          null ||
          o === void 0 ||
          o.call(r, n);
      }),
      (t.prototype.error = function (n) {
        var r, o;
        (o =
          (r = this.destination) === null || r === void 0
            ? void 0
            : r.error) === null ||
          o === void 0 ||
          o.call(r, n);
      }),
      (t.prototype.complete = function () {
        var n, r;
        (r =
          (n = this.destination) === null || n === void 0
            ? void 0
            : n.complete) === null ||
          r === void 0 ||
          r.call(n);
      }),
      (t.prototype._subscribe = function (n) {
        var r, o;
        return (o =
          (r = this.source) === null || r === void 0
            ? void 0
            : r.subscribe(n)) !== null && o !== void 0
          ? o
          : oc;
      }),
      t
    );
  })(je),
  dp = (function (e) {
    Le(t, e);
    function t(n) {
      var r = e.call(this) || this;
      return (r._value = n), r;
    }
    return (
      Object.defineProperty(t.prototype, 'value', {
        get: function () {
          return this.getValue();
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype._subscribe = function (n) {
        var r = e.prototype._subscribe.call(this, n);
        return !r.closed && n.next(this._value), r;
      }),
      (t.prototype.getValue = function () {
        var n = this,
          r = n.hasError,
          o = n.thrownError,
          i = n._value;
        if (r) throw o;
        return this._throwIfClosed(), i;
      }),
      (t.prototype.next = function (n) {
        e.prototype.next.call(this, (this._value = n));
      }),
      t
    );
  })(je),
  gi = {
    now: function () {
      return (gi.delegate || Date).now();
    },
    delegate: void 0,
  },
  qn = (function (e) {
    Le(t, e);
    function t(n, r, o) {
      n === void 0 && (n = 1 / 0),
        r === void 0 && (r = 1 / 0),
        o === void 0 && (o = gi);
      var i = e.call(this) || this;
      return (
        (i._bufferSize = n),
        (i._windowTime = r),
        (i._timestampProvider = o),
        (i._buffer = []),
        (i._infiniteTimeWindow = !0),
        (i._infiniteTimeWindow = r === 1 / 0),
        (i._bufferSize = Math.max(1, n)),
        (i._windowTime = Math.max(1, r)),
        i
      );
    }
    return (
      (t.prototype.next = function (n) {
        var r = this,
          o = r.isStopped,
          i = r._buffer,
          s = r._infiniteTimeWindow,
          a = r._timestampProvider,
          c = r._windowTime;
        o || (i.push(n), !s && i.push(a.now() + c)),
          this._trimBuffer(),
          e.prototype.next.call(this, n);
      }),
      (t.prototype._subscribe = function (n) {
        this._throwIfClosed(), this._trimBuffer();
        for (
          var r = this._innerSubscribe(n),
            o = this,
            i = o._infiniteTimeWindow,
            s = o._buffer,
            a = s.slice(),
            c = 0;
          c < a.length && !n.closed;
          c += i ? 1 : 2
        )
          n.next(a[c]);
        return this._checkFinalizedStatuses(n), r;
      }),
      (t.prototype._trimBuffer = function () {
        var n = this,
          r = n._bufferSize,
          o = n._timestampProvider,
          i = n._buffer,
          s = n._infiniteTimeWindow,
          a = (s ? 1 : 2) * r;
        if ((r < 1 / 0 && a < i.length && i.splice(0, i.length - a), !s)) {
          for (var c = o.now(), u = 0, f = 1; f < i.length && i[f] <= c; f += 2)
            u = f;
          u && i.splice(0, u + 1);
        }
      }),
      t
    );
  })(je),
  hp = (function (e) {
    Le(t, e);
    function t(n, r) {
      return e.call(this) || this;
    }
    return (
      (t.prototype.schedule = function (n, r) {
        return this;
      }),
      t
    );
  })(Wt),
  Ro = {
    setInterval: function (e, t) {
      for (var n = [], r = 2; r < arguments.length; r++)
        n[r - 2] = arguments[r];
      var o = Ro.delegate;
      return o != null && o.setInterval
        ? o.setInterval.apply(o, dn([e, t], fn(n)))
        : setInterval.apply(void 0, dn([e, t], fn(n)));
    },
    clearInterval: function (e) {
      return clearInterval(e);
    },
    delegate: void 0,
  },
  pp = (function (e) {
    Le(t, e);
    function t(n, r) {
      var o = e.call(this, n, r) || this;
      return (o.scheduler = n), (o.work = r), (o.pending = !1), o;
    }
    return (
      (t.prototype.schedule = function (n, r) {
        var o;
        if ((r === void 0 && (r = 0), this.closed)) return this;
        this.state = n;
        var i = this.id,
          s = this.scheduler;
        return (
          i != null && (this.id = this.recycleAsyncId(s, i, r)),
          (this.pending = !0),
          (this.delay = r),
          (this.id =
            (o = this.id) !== null && o !== void 0
              ? o
              : this.requestAsyncId(s, this.id, r)),
          this
        );
      }),
      (t.prototype.requestAsyncId = function (n, r, o) {
        return (
          o === void 0 && (o = 0), Ro.setInterval(n.flush.bind(n, this), o)
        );
      }),
      (t.prototype.recycleAsyncId = function (n, r, o) {
        if (
          (o === void 0 && (o = 0),
          o != null && this.delay === o && this.pending === !1)
        )
          return r;
        r != null && Ro.clearInterval(r);
      }),
      (t.prototype.execute = function (n, r) {
        if (this.closed) return new Error('executing a cancelled action');
        this.pending = !1;
        var o = this._execute(n, r);
        if (o) return o;
        this.pending === !1 &&
          this.id != null &&
          (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
      }),
      (t.prototype._execute = function (n, r) {
        var o = !1,
          i;
        try {
          this.work(n);
        } catch (s) {
          (o = !0), (i = s || new Error('Scheduled action threw falsy error'));
        }
        if (o) return this.unsubscribe(), i;
      }),
      (t.prototype.unsubscribe = function () {
        if (!this.closed) {
          var n = this,
            r = n.id,
            o = n.scheduler,
            i = o.actions;
          (this.work = this.state = this.scheduler = null),
            (this.pending = !1),
            nr(i, this),
            r != null && (this.id = this.recycleAsyncId(o, r, null)),
            (this.delay = null),
            e.prototype.unsubscribe.call(this);
        }
      }),
      t
    );
  })(hp),
  us = (function () {
    function e(t, n) {
      n === void 0 && (n = e.now),
        (this.schedulerActionCtor = t),
        (this.now = n);
    }
    return (
      (e.prototype.schedule = function (t, n, r) {
        return (
          n === void 0 && (n = 0),
          new this.schedulerActionCtor(this, t).schedule(r, n)
        );
      }),
      (e.now = gi.now),
      e
    );
  })(),
  yp = (function (e) {
    Le(t, e);
    function t(n, r) {
      r === void 0 && (r = us.now);
      var o = e.call(this, n, r) || this;
      return (o.actions = []), (o._active = !1), o;
    }
    return (
      (t.prototype.flush = function (n) {
        var r = this.actions;
        if (this._active) {
          r.push(n);
          return;
        }
        var o;
        this._active = !0;
        do if ((o = n.execute(n.state, n.delay))) break;
        while ((n = r.shift()));
        if (((this._active = !1), o)) {
          for (; (n = r.shift()); ) n.unsubscribe();
          throw o;
        }
      }),
      t
    );
  })(us),
  fc = new yp(pp),
  bp = fc,
  or = new ce(function (e) {
    return e.complete();
  });
function dc(e) {
  return e && G(e.schedule);
}
function mp(e) {
  return e[e.length - 1];
}
function hc(e) {
  return dc(mp(e)) ? e.pop() : void 0;
}
var pc = function (e) {
  return e && typeof e.length == 'number' && typeof e != 'function';
};
function yc(e) {
  return G(e == null ? void 0 : e.then);
}
function bc(e) {
  return G(e[mi]);
}
function mc(e) {
  return (
    Symbol.asyncIterator && G(e == null ? void 0 : e[Symbol.asyncIterator])
  );
}
function gc(e) {
  return new TypeError(
    'You provided ' +
      (e !== null && typeof e == 'object'
        ? 'an invalid object'
        : "'" + e + "'") +
      ' where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.',
  );
}
function gp() {
  return typeof Symbol != 'function' || !Symbol.iterator
    ? '@@iterator'
    : Symbol.iterator;
}
var wc = gp();
function vc(e) {
  return G(e == null ? void 0 : e[wc]);
}
function Ec(e) {
  return tp(this, arguments, function () {
    var t, n, r, o;
    return rc(this, function (i) {
      switch (i.label) {
        case 0:
          (t = e.getReader()), (i.label = 1);
        case 1:
          i.trys.push([1, , 9, 10]), (i.label = 2);
        case 2:
          return [4, Pt(t.read())];
        case 3:
          return (
            (n = i.sent()),
            (r = n.value),
            (o = n.done),
            o ? [4, Pt(void 0)] : [3, 5]
          );
        case 4:
          return [2, i.sent()];
        case 5:
          return [4, Pt(r)];
        case 6:
          return [4, i.sent()];
        case 7:
          return i.sent(), [3, 2];
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
function xc(e) {
  return G(e == null ? void 0 : e.getReader);
}
function ke(e) {
  if (e instanceof ce) return e;
  if (e != null) {
    if (bc(e)) return wp(e);
    if (pc(e)) return vp(e);
    if (yc(e)) return Ep(e);
    if (mc(e)) return Sc(e);
    if (vc(e)) return xp(e);
    if (xc(e)) return Sp(e);
  }
  throw gc(e);
}
function wp(e) {
  return new ce(function (t) {
    var n = e[mi]();
    if (G(n.subscribe)) return n.subscribe(t);
    throw new TypeError(
      'Provided object does not correctly implement Symbol.observable',
    );
  });
}
function vp(e) {
  return new ce(function (t) {
    for (var n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function Ep(e) {
  return new ce(function (t) {
    e.then(
      function (n) {
        t.closed || (t.next(n), t.complete());
      },
      function (n) {
        return t.error(n);
      },
    ).then(null, ac);
  });
}
function xp(e) {
  return new ce(function (t) {
    var n, r;
    try {
      for (var o = jt(e), i = o.next(); !i.done; i = o.next()) {
        var s = i.value;
        if ((t.next(s), t.closed)) return;
      }
    } catch (a) {
      n = { error: a };
    } finally {
      try {
        i && !i.done && (r = o.return) && r.call(o);
      } finally {
        if (n) throw n.error;
      }
    }
    t.complete();
  });
}
function Sc(e) {
  return new ce(function (t) {
    Ap(e, t).catch(function (n) {
      return t.error(n);
    });
  });
}
function Sp(e) {
  return Sc(Ec(e));
}
function Ap(e, t) {
  var n, r, o, i;
  return ep(this, void 0, void 0, function () {
    var s, a;
    return rc(this, function (c) {
      switch (c.label) {
        case 0:
          c.trys.push([0, 5, 6, 11]), (n = np(e)), (c.label = 1);
        case 1:
          return [4, n.next()];
        case 2:
          if (((r = c.sent()), !!r.done)) return [3, 4];
          if (((s = r.value), t.next(s), t.closed)) return [2];
          c.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return (a = c.sent()), (o = { error: a }), [3, 11];
        case 6:
          return (
            c.trys.push([6, , 9, 10]),
            r && !r.done && (i = n.return) ? [4, i.call(n)] : [3, 8]
          );
        case 7:
          c.sent(), (c.label = 8);
        case 8:
          return [3, 10];
        case 9:
          if (o) throw o.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return t.complete(), [2];
      }
    });
  });
}
function Fe(e, t, n, r, o) {
  r === void 0 && (r = 0), o === void 0 && (o = !1);
  var i = t.schedule(function () {
    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(i), !o)) return i;
}
function Ac(e, t) {
  return (
    t === void 0 && (t = 0),
    J(function (n, r) {
      n.subscribe(
        z(
          r,
          function (o) {
            return Fe(
              r,
              e,
              function () {
                return r.next(o);
              },
              t,
            );
          },
          function () {
            return Fe(
              r,
              e,
              function () {
                return r.complete();
              },
              t,
            );
          },
          function (o) {
            return Fe(
              r,
              e,
              function () {
                return r.error(o);
              },
              t,
            );
          },
        ),
      );
    })
  );
}
function _c(e, t) {
  return (
    t === void 0 && (t = 0),
    J(function (n, r) {
      r.add(
        e.schedule(function () {
          return n.subscribe(r);
        }, t),
      );
    })
  );
}
function _p(e, t) {
  return ke(e).pipe(_c(t), Ac(t));
}
function Tp(e, t) {
  return ke(e).pipe(_c(t), Ac(t));
}
function kp(e, t) {
  return new ce(function (n) {
    var r = 0;
    return t.schedule(function () {
      r === e.length
        ? n.complete()
        : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function Op(e, t) {
  return new ce(function (n) {
    var r;
    return (
      Fe(n, t, function () {
        (r = e[wc]()),
          Fe(
            n,
            t,
            function () {
              var o, i, s;
              try {
                (o = r.next()), (i = o.value), (s = o.done);
              } catch (a) {
                n.error(a);
                return;
              }
              s ? n.complete() : n.next(i);
            },
            0,
            !0,
          );
      }),
      function () {
        return G(r == null ? void 0 : r.return) && r.return();
      }
    );
  });
}
function Tc(e, t) {
  if (!e) throw new Error('Iterable cannot be null');
  return new ce(function (n) {
    Fe(n, t, function () {
      var r = e[Symbol.asyncIterator]();
      Fe(
        n,
        t,
        function () {
          r.next().then(function (o) {
            o.done ? n.complete() : n.next(o.value);
          });
        },
        0,
        !0,
      );
    });
  });
}
function Bp(e, t) {
  return Tc(Ec(e), t);
}
function Ip(e, t) {
  if (e != null) {
    if (bc(e)) return _p(e, t);
    if (pc(e)) return kp(e, t);
    if (yc(e)) return Tp(e, t);
    if (mc(e)) return Tc(e, t);
    if (vc(e)) return Op(e, t);
    if (xc(e)) return Bp(e, t);
  }
  throw gc(e);
}
function kc(e, t) {
  return t ? Ip(e, t) : ke(e);
}
function ls() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var n = hc(e);
  return kc(e, n);
}
var Oc = _r(function (e) {
  return function () {
    e(this),
      (this.name = 'EmptyError'),
      (this.message = 'no elements in sequence');
  };
});
function Bc(e) {
  return e instanceof Date && !isNaN(e);
}
var Ic = _r(function (e) {
  return function (t) {
    t === void 0 && (t = null),
      e(this),
      (this.message = 'Timeout has occurred'),
      (this.name = 'TimeoutError'),
      (this.info = t);
  };
});
function Rp(e, t) {
  var n = Bc(e) ? { first: e } : typeof e == 'number' ? { each: e } : e,
    r = n.first,
    o = n.each,
    i = n.with,
    s = i === void 0 ? Np : i,
    a = n.scheduler,
    c = a === void 0 ? t ?? fc : a,
    u = n.meta,
    f = u === void 0 ? null : u;
  if (r == null && o == null) throw new TypeError('No timeout provided.');
  return J(function (l, h) {
    var y,
      p,
      d = null,
      m = 0,
      b = function (g) {
        p = Fe(
          h,
          c,
          function () {
            try {
              y.unsubscribe(),
                ke(s({ meta: f, lastValue: d, seen: m })).subscribe(h);
            } catch (w) {
              h.error(w);
            }
          },
          g,
        );
      };
    (y = l.subscribe(
      z(
        h,
        function (g) {
          p == null || p.unsubscribe(), m++, h.next((d = g)), o > 0 && b(o);
        },
        void 0,
        void 0,
        function () {
          (p != null && p.closed) || p == null || p.unsubscribe(), (d = null);
        },
      ),
    )),
      !m && b(r != null ? (typeof r == 'number' ? r : +r - c.now()) : o);
  });
}
function Np(e) {
  throw new Ic(e);
}
function rn(e, t) {
  return J(function (n, r) {
    var o = 0;
    n.subscribe(
      z(r, function (i) {
        r.next(e.call(t, i, o++));
      }),
    );
  });
}
function Cp(e, t, n, r, o, i, s, a) {
  var c = [],
    u = 0,
    f = 0,
    l = !1,
    h = function () {
      l && !c.length && !u && t.complete();
    },
    y = function (d) {
      return u < r ? p(d) : c.push(d);
    },
    p = function (d) {
      i && t.next(d), u++;
      var m = !1;
      ke(n(d, f++)).subscribe(
        z(
          t,
          function (b) {
            o == null || o(b), i ? y(b) : t.next(b);
          },
          function () {
            m = !0;
          },
          void 0,
          function () {
            if (m)
              try {
                u--;
                for (
                  var b = function () {
                    var g = c.shift();
                    s
                      ? Fe(t, s, function () {
                          return p(g);
                        })
                      : p(g);
                  };
                  c.length && u < r;

                )
                  b();
                h();
              } catch (g) {
                t.error(g);
              }
          },
        ),
      );
    };
  return (
    e.subscribe(
      z(t, y, function () {
        (l = !0), h();
      }),
    ),
    function () {
      a == null || a();
    }
  );
}
function ir(e, t, n) {
  return (
    n === void 0 && (n = 1 / 0),
    G(t)
      ? ir(function (r, o) {
          return rn(function (i, s) {
            return t(r, i, o, s);
          })(ke(e(r, o)));
        }, n)
      : (typeof t == 'number' && (n = t),
        J(function (r, o) {
          return Cp(r, o, e, n);
        }))
  );
}
function Rc(e) {
  return e === void 0 && (e = 1 / 0), ir(Ce, e);
}
function Pp() {
  return Rc(1);
}
function Lp() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return Pp()(kc(e, hc(e)));
}
function Up(e, t, n) {
  e === void 0 && (e = 0), n === void 0 && (n = bp);
  var r = -1;
  return (
    t != null && (dc(t) ? (n = t) : (r = t)),
    new ce(function (o) {
      var i = Bc(e) ? +e - n.now() : e;
      i < 0 && (i = 0);
      var s = 0;
      return n.schedule(function () {
        o.closed ||
          (o.next(s++), 0 <= r ? this.schedule(void 0, r) : o.complete());
      }, i);
    })
  );
}
function hn(e, t) {
  return J(function (n, r) {
    var o = 0;
    n.subscribe(
      z(r, function (i) {
        return e.call(t, i, o++) && r.next(i);
      }),
    );
  });
}
function wi(e) {
  return J(function (t, n) {
    var r = null,
      o = !1,
      i;
    (r = t.subscribe(
      z(n, void 0, void 0, function (s) {
        (i = ke(e(s, wi(e)(t)))),
          r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
      }),
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n));
  });
}
function Hp(e, t, n, r, o) {
  return function (i, s) {
    var a = n,
      c = t,
      u = 0;
    i.subscribe(
      z(
        s,
        function (f) {
          var l = u++;
          (c = a ? e(c, f, l) : ((a = !0), f)), r && s.next(c);
        },
        o &&
          function () {
            a && s.next(c), s.complete();
          },
      ),
    );
  };
}
function Dp(e) {
  return J(function (t, n) {
    var r = !1;
    t.subscribe(
      z(
        n,
        function (o) {
          (r = !0), n.next(o);
        },
        function () {
          r || n.next(e), n.complete();
        },
      ),
    );
  });
}
function No(e) {
  return e <= 0
    ? function () {
        return or;
      }
    : J(function (t, n) {
        var r = 0;
        t.subscribe(
          z(n, function (o) {
            ++r <= e && (n.next(o), e <= r && n.complete());
          }),
        );
      });
}
function jp(e, t) {
  return J(function (n, r) {
    var o = new Set();
    n.subscribe(
      z(r, function (i) {
        var s = e ? e(i) : i;
        o.has(s) || (o.add(s), r.next(i));
      }),
    ),
      t &&
        ke(t).subscribe(
          z(
            r,
            function () {
              return o.clear();
            },
            rr,
          ),
        );
  });
}
function $p(e, t) {
  return (
    t === void 0 && (t = Ce),
    (e = e ?? qp),
    J(function (n, r) {
      var o,
        i = !0;
      n.subscribe(
        z(r, function (s) {
          var a = t(s);
          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
        }),
      );
    })
  );
}
function qp(e, t) {
  return e === t;
}
function Mp(e) {
  return (
    e === void 0 && (e = zp),
    J(function (t, n) {
      var r = !1;
      t.subscribe(
        z(
          n,
          function (o) {
            (r = !0), n.next(o);
          },
          function () {
            return r ? n.complete() : n.error(e());
          },
        ),
      );
    })
  );
}
function zp() {
  return new Oc();
}
function to(e) {
  return J(function (t, n) {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function Vp(e, t) {
  var n = arguments.length >= 2;
  return function (r) {
    return r.pipe(
      e
        ? hn(function (o, i) {
            return e(o, i, r);
          })
        : Ce,
      No(1),
      n
        ? Dp(t)
        : Mp(function () {
            return new Oc();
          }),
    );
  };
}
function Kp(e, t, n, r) {
  return J(function (o, i) {
    var s;
    !t || typeof t == 'function'
      ? (s = t)
      : ((n = t.duration), (s = t.element), (r = t.connector));
    var a = new Map(),
      c = function (p) {
        a.forEach(p), p(i);
      },
      u = function (p) {
        return c(function (d) {
          return d.error(p);
        });
      },
      f = 0,
      l = !1,
      h = new lc(
        i,
        function (p) {
          try {
            var d = e(p),
              m = a.get(d);
            if (!m) {
              a.set(d, (m = r ? r() : new je()));
              var b = y(d, m);
              if ((i.next(b), n)) {
                var g = z(
                  m,
                  function () {
                    m.complete(), g == null || g.unsubscribe();
                  },
                  void 0,
                  void 0,
                  function () {
                    return a.delete(d);
                  },
                );
                h.add(ke(n(b)).subscribe(g));
              }
            }
            m.next(s ? s(p) : p);
          } catch (w) {
            u(w);
          }
        },
        function () {
          return c(function (p) {
            return p.complete();
          });
        },
        u,
        function () {
          return a.clear();
        },
        function () {
          return (l = !0), f === 0;
        },
      );
    o.subscribe(h);
    function y(p, d) {
      var m = new ce(function (b) {
        f++;
        var g = d.subscribe(b);
        return function () {
          g.unsubscribe(), --f === 0 && l && h.unsubscribe();
        };
      });
      return (m.key = p), m;
    }
  });
}
function Wp() {
  return J(function (e, t) {
    var n,
      r = !1;
    e.subscribe(
      z(t, function (o) {
        var i = n;
        (n = o), r && t.next([i, o]), (r = !0);
      }),
    );
  });
}
function Fp(e) {
  e === void 0 && (e = 1 / 0);
  var t;
  e && typeof e == 'object' ? (t = e) : (t = { count: e });
  var n = t.count,
    r = n === void 0 ? 1 / 0 : n,
    o = t.delay,
    i = t.resetOnSuccess,
    s = i === void 0 ? !1 : i;
  return r <= 0
    ? Ce
    : J(function (a, c) {
        var u = 0,
          f,
          l = function () {
            var h = !1;
            (f = a.subscribe(
              z(
                c,
                function (y) {
                  s && (u = 0), c.next(y);
                },
                void 0,
                function (y) {
                  if (u++ < r) {
                    var p = function () {
                      f ? (f.unsubscribe(), (f = null), l()) : (h = !0);
                    };
                    if (o != null) {
                      var d = typeof o == 'number' ? Up(o) : ke(o(y, u)),
                        m = z(
                          c,
                          function () {
                            m.unsubscribe(), p();
                          },
                          function () {
                            c.complete();
                          },
                        );
                      d.subscribe(m);
                    } else p();
                  } else c.error(y);
                },
              ),
            )),
              h && (f.unsubscribe(), (f = null), l());
          };
        l();
      });
}
function Zp(e, t) {
  return J(Hp(e, t, arguments.length >= 2, !0));
}
function Gp(e, t) {
  return J(function (n, r) {
    var o = null,
      i = 0,
      s = !1,
      a = function () {
        return s && !o && r.complete();
      };
    n.subscribe(
      z(
        r,
        function (c) {
          o == null || o.unsubscribe();
          var u = 0,
            f = i++;
          ke(e(c, f)).subscribe(
            (o = z(
              r,
              function (l) {
                return r.next(t ? t(c, l, f, u++) : l);
              },
              function () {
                (o = null), a();
              },
            )),
          );
        },
        function () {
          (s = !0), a();
        },
      ),
    );
  });
}
function Jp() {
  return Gp(Ce);
}
function Yp(e) {
  return J(function (t, n) {
    ke(e).subscribe(
      z(
        n,
        function () {
          return n.complete();
        },
        rr,
      ),
    ),
      !n.closed && t.subscribe(n);
  });
}
function Mn(e, t, n) {
  var r = G(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? J(function (o, i) {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        var a = !0;
        o.subscribe(
          z(
            i,
            function (c) {
              var u;
              (u = r.next) === null || u === void 0 || u.call(r, c), i.next(c);
            },
            function () {
              var c;
              (a = !1),
                (c = r.complete) === null || c === void 0 || c.call(r),
                i.complete();
            },
            function (c) {
              var u;
              (a = !1),
                (u = r.error) === null || u === void 0 || u.call(r, c),
                i.error(c);
            },
            function () {
              var c, u;
              a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)),
                (u = r.finalize) === null || u === void 0 || u.call(r);
            },
          ),
        );
      })
    : Ce;
}
var Xp = {
    url: '',
    deserializer: function (e) {
      return JSON.parse(e.data);
    },
    serializer: function (e) {
      return JSON.stringify(e);
    },
  },
  Qp =
    'WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }',
  e0 = (function (e) {
    Le(t, e);
    function t(n, r) {
      var o = e.call(this) || this;
      if (((o._socket = null), n instanceof ce))
        (o.destination = r), (o.source = n);
      else {
        var i = (o._config = Oo({}, Xp));
        if (((o._output = new je()), typeof n == 'string')) i.url = n;
        else for (var s in n) n.hasOwnProperty(s) && (i[s] = n[s]);
        if (!i.WebSocketCtor && WebSocket) i.WebSocketCtor = WebSocket;
        else if (!i.WebSocketCtor)
          throw new Error('no WebSocket constructor can be found');
        o.destination = new qn();
      }
      return o;
    }
    return (
      (t.prototype.lift = function (n) {
        var r = new t(this._config, this.destination);
        return (r.operator = n), (r.source = this), r;
      }),
      (t.prototype._resetState = function () {
        (this._socket = null),
          this.source || (this.destination = new qn()),
          (this._output = new je());
      }),
      (t.prototype.multiplex = function (n, r, o) {
        var i = this;
        return new ce(function (s) {
          try {
            i.next(n());
          } catch (c) {
            s.error(c);
          }
          var a = i.subscribe({
            next: function (c) {
              try {
                o(c) && s.next(c);
              } catch (u) {
                s.error(u);
              }
            },
            error: function (c) {
              return s.error(c);
            },
            complete: function () {
              return s.complete();
            },
          });
          return function () {
            try {
              i.next(r());
            } catch (c) {
              s.error(c);
            }
            a.unsubscribe();
          };
        });
      }),
      (t.prototype._connectSocket = function () {
        var n = this,
          r = this._config,
          o = r.WebSocketCtor,
          i = r.protocol,
          s = r.url,
          a = r.binaryType,
          c = this._output,
          u = null;
        try {
          (u = i ? new o(s, i) : new o(s)),
            (this._socket = u),
            a && (this._socket.binaryType = a);
        } catch (l) {
          c.error(l);
          return;
        }
        var f = new Wt(function () {
          (n._socket = null), u && u.readyState === 1 && u.close();
        });
        (u.onopen = function (l) {
          var h = n._socket;
          if (!h) {
            u.close(), n._resetState();
            return;
          }
          var y = n._config.openObserver;
          y && y.next(l);
          var p = n.destination;
          (n.destination = Tr.create(
            function (d) {
              if (u.readyState === 1)
                try {
                  var m = n._config.serializer;
                  u.send(m(d));
                } catch (b) {
                  n.destination.error(b);
                }
            },
            function (d) {
              var m = n._config.closingObserver;
              m && m.next(void 0),
                d && d.code
                  ? u.close(d.code, d.reason)
                  : c.error(new TypeError(Qp)),
                n._resetState();
            },
            function () {
              var d = n._config.closingObserver;
              d && d.next(void 0), u.close(), n._resetState();
            },
          )),
            p && p instanceof qn && f.add(p.subscribe(n.destination));
        }),
          (u.onerror = function (l) {
            n._resetState(), c.error(l);
          }),
          (u.onclose = function (l) {
            u === n._socket && n._resetState();
            var h = n._config.closeObserver;
            h && h.next(l), l.wasClean ? c.complete() : c.error(l);
          }),
          (u.onmessage = function (l) {
            try {
              var h = n._config.deserializer;
              c.next(h(l));
            } catch (y) {
              c.error(y);
            }
          });
      }),
      (t.prototype._subscribe = function (n) {
        var r = this,
          o = this.source;
        return o
          ? o.subscribe(n)
          : (this._socket || this._connectSocket(),
            this._output.subscribe(n),
            n.add(function () {
              var i = r._socket;
              r._output.observers.length === 0 &&
                (i && (i.readyState === 1 || i.readyState === 0) && i.close(),
                r._resetState());
            }),
            n);
      }),
      (t.prototype.unsubscribe = function () {
        var n = this._socket;
        n && (n.readyState === 1 || n.readyState === 0) && n.close(),
          this._resetState(),
          e.prototype.unsubscribe.call(this);
      }),
      t
    );
  })(Io);
function t0(e) {
  return new e0(e);
}
function Co(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function n0(e) {
  if (typeof e != 'boolean') throw new Error(`Expected boolean, not ${e}`);
}
function Nc(e, ...t) {
  if (!(e instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(
      `Expected Uint8Array of length ${t}, not of length=${e.length}`,
    );
}
function r0(e) {
  if (typeof e != 'function' || typeof e.create != 'function')
    throw new Error('Hash should be wrapped by utils.wrapConstructor');
  Co(e.outputLen), Co(e.blockLen);
}
function o0(e, t = !0) {
  if (e.destroyed) throw new Error('Hash instance has been destroyed');
  if (t && e.finished) throw new Error('Hash#digest() has already been called');
}
function i0(e, t) {
  Nc(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(
      `digestInto() expects output buffer of length at least ${n}`,
    );
}
const It = {
    number: Co,
    bool: n0,
    bytes: Nc,
    hash: r0,
    exists: o0,
    output: i0,
  },
  no =
    typeof globalThis == 'object' && 'crypto' in globalThis
      ? globalThis.crypto
      : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const ro =
    (e) => new DataView(e.buffer, e.byteOffset, e.byteLength),
  He = (e, t) => (e << (32 - t)) | (e >>> t),
  s0 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!s0) throw new Error('Non little-endian hardware is not supported');
const a0 = Array.from({ length: 256 }, (e, t) =>
  t.toString(16).padStart(2, '0'),
);
function kr(e) {
  if (!(e instanceof Uint8Array)) throw new Error('Uint8Array expected');
  let t = '';
  for (let n = 0; n < e.length; n++) t += a0[e[n]];
  return t;
}
function c0(e) {
  if (typeof e != 'string')
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function vi(e) {
  if ((typeof e == 'string' && (e = c0(e)), !(e instanceof Uint8Array)))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
function u0(...e) {
  if (!e.every((r) => r instanceof Uint8Array))
    throw new Error('Uint8Array list expected');
  if (e.length === 1) return e[0];
  const t = e.reduce((r, o) => r + o.length, 0),
    n = new Uint8Array(t);
  for (let r = 0, o = 0; r < e.length; r++) {
    const i = e[r];
    n.set(i, o), (o += i.length);
  }
  return n;
}
class Cc {
  clone() {
    return this._cloneInto();
  }
}
function Pc(e) {
  const t = (r) => e().update(vi(r)).digest(),
    n = e();
  return (
    (t.outputLen = n.outputLen),
    (t.blockLen = n.blockLen),
    (t.create = () => e()),
    t
  );
}
function Lc(e = 32) {
  if (no && typeof no.getRandomValues == 'function')
    return no.getRandomValues(new Uint8Array(e));
  throw new Error('crypto.getRandomValues must be defined');
}
function l0(e, t, n, r) {
  if (typeof e.setBigUint64 == 'function') return e.setBigUint64(t, n, r);
  const o = BigInt(32),
    i = BigInt(4294967295),
    s = Number((n >> o) & i),
    a = Number(n & i),
    c = r ? 4 : 0,
    u = r ? 0 : 4;
  e.setUint32(t + c, s, r), e.setUint32(t + u, a, r);
}
class f0 extends Cc {
  constructor(t, n, r, o) {
    super(),
      (this.blockLen = t),
      (this.outputLen = n),
      (this.padOffset = r),
      (this.isLE = o),
      (this.finished = !1),
      (this.length = 0),
      (this.pos = 0),
      (this.destroyed = !1),
      (this.buffer = new Uint8Array(t)),
      (this.view = ro(this.buffer));
  }
  update(t) {
    It.exists(this);
    const { view: n, buffer: r, blockLen: o } = this;
    t = vi(t);
    const i = t.length;
    for (let s = 0; s < i; ) {
      const a = Math.min(o - this.pos, i - s);
      if (a === o) {
        const c = ro(t);
        for (; o <= i - s; s += o) this.process(c, s);
        continue;
      }
      r.set(t.subarray(s, s + a), this.pos),
        (this.pos += a),
        (s += a),
        this.pos === o && (this.process(n, 0), (this.pos = 0));
    }
    return (this.length += t.length), this.roundClean(), this;
  }
  digestInto(t) {
    It.exists(this), It.output(t, this), (this.finished = !0);
    const { buffer: n, view: r, blockLen: o, isLE: i } = this;
    let { pos: s } = this;
    (n[s++] = 128),
      this.buffer.subarray(s).fill(0),
      this.padOffset > o - s && (this.process(r, 0), (s = 0));
    for (let l = s; l < o; l++) n[l] = 0;
    l0(r, o - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = ro(t),
      c = this.outputLen;
    if (c % 4) throw new Error('_sha2: outputLen should be aligned to 32bit');
    const u = c / 4,
      f = this.get();
    if (u > f.length) throw new Error('_sha2: outputLen bigger than state');
    for (let l = 0; l < u; l++) a.setUint32(4 * l, f[l], i);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const {
      blockLen: n,
      buffer: r,
      length: o,
      finished: i,
      destroyed: s,
      pos: a,
    } = this;
    return (
      (t.length = o),
      (t.pos = a),
      (t.finished = i),
      (t.destroyed = s),
      o % n && t.buffer.set(r),
      t
    );
  }
}
const d0 = (e, t, n) => (e & t) ^ (~e & n),
  h0 = (e, t, n) => (e & t) ^ (e & n) ^ (t & n),
  p0 = new Uint32Array([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
  ]),
  ot = new Uint32Array([
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
    528734635, 1541459225,
  ]),
  it = new Uint32Array(64);
class Uc extends f0 {
  constructor() {
    super(64, 32, 8, !1),
      (this.A = ot[0] | 0),
      (this.B = ot[1] | 0),
      (this.C = ot[2] | 0),
      (this.D = ot[3] | 0),
      (this.E = ot[4] | 0),
      (this.F = ot[5] | 0),
      (this.G = ot[6] | 0),
      (this.H = ot[7] | 0);
  }
  get() {
    const { A: t, B: n, C: r, D: o, E: i, F: s, G: a, H: c } = this;
    return [t, n, r, o, i, s, a, c];
  }
  set(t, n, r, o, i, s, a, c) {
    (this.A = t | 0),
      (this.B = n | 0),
      (this.C = r | 0),
      (this.D = o | 0),
      (this.E = i | 0),
      (this.F = s | 0),
      (this.G = a | 0),
      (this.H = c | 0);
  }
  process(t, n) {
    for (let l = 0; l < 16; l++, n += 4) it[l] = t.getUint32(n, !1);
    for (let l = 16; l < 64; l++) {
      const h = it[l - 15],
        y = it[l - 2],
        p = He(h, 7) ^ He(h, 18) ^ (h >>> 3),
        d = He(y, 17) ^ He(y, 19) ^ (y >>> 10);
      it[l] = (d + it[l - 7] + p + it[l - 16]) | 0;
    }
    let { A: r, B: o, C: i, D: s, E: a, F: c, G: u, H: f } = this;
    for (let l = 0; l < 64; l++) {
      const h = He(a, 6) ^ He(a, 11) ^ He(a, 25),
        y = (f + h + d0(a, c, u) + p0[l] + it[l]) | 0,
        p = ((He(r, 2) ^ He(r, 13) ^ He(r, 22)) + h0(r, o, i)) | 0;
      (f = u),
        (u = c),
        (c = a),
        (a = (s + y) | 0),
        (s = i),
        (i = o),
        (o = r),
        (r = (y + p) | 0);
    }
    (r = (r + this.A) | 0),
      (o = (o + this.B) | 0),
      (i = (i + this.C) | 0),
      (s = (s + this.D) | 0),
      (a = (a + this.E) | 0),
      (c = (c + this.F) | 0),
      (u = (u + this.G) | 0),
      (f = (f + this.H) | 0),
      this.set(r, o, i, s, a, c, u, f);
  }
  roundClean() {
    it.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
class y0 extends Uc {
  constructor() {
    super(),
      (this.A = -1056596264),
      (this.B = 914150663),
      (this.C = 812702999),
      (this.D = -150054599),
      (this.E = -4191439),
      (this.F = 1750603025),
      (this.G = 1694076839),
      (this.H = -1090891868),
      (this.outputLen = 28);
  }
}
const pn = Pc(() => new Uc());
Pc(() => new y0());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Hc =
    BigInt(0),
  Or = BigInt(1),
  b0 = BigInt(2),
  Br = (e) => e instanceof Uint8Array,
  m0 = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, '0'));
function $t(e) {
  if (!Br(e)) throw new Error('Uint8Array expected');
  let t = '';
  for (let n = 0; n < e.length; n++) t += m0[e[n]];
  return t;
}
function Dc(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Ei(e) {
  if (typeof e != 'string')
    throw new Error('hex string expected, got ' + typeof e);
  return BigInt(e === '' ? '0' : `0x${e}`);
}
function qt(e) {
  if (typeof e != 'string')
    throw new Error('hex string expected, got ' + typeof e);
  if (e.length % 2)
    throw new Error('hex string is invalid: unpadded ' + e.length);
  const t = new Uint8Array(e.length / 2);
  for (let n = 0; n < t.length; n++) {
    const r = n * 2,
      o = e.slice(r, r + 2),
      i = Number.parseInt(o, 16);
    if (Number.isNaN(i) || i < 0) throw new Error('invalid byte sequence');
    t[n] = i;
  }
  return t;
}
function ye(e) {
  return Ei($t(e));
}
function xi(e) {
  if (!Br(e)) throw new Error('Uint8Array expected');
  return Ei($t(Uint8Array.from(e).reverse()));
}
const yt = (e, t) => qt(e.toString(16).padStart(t * 2, '0')),
  jc = (e, t) => yt(e, t).reverse(),
  g0 = (e) => qt(Dc(e));
function ae(e, t, n) {
  let r;
  if (typeof t == 'string')
    try {
      r = qt(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Br(t)) r = Uint8Array.from(t);
  else throw new Error(`${e} must be hex string or Uint8Array`);
  const o = r.length;
  if (typeof n == 'number' && o !== n)
    throw new Error(`${e} expected ${n} bytes, got ${o}`);
  return r;
}
function xe(...e) {
  const t = new Uint8Array(e.reduce((r, o) => r + o.length, 0));
  let n = 0;
  return (
    e.forEach((r) => {
      if (!Br(r)) throw new Error('Uint8Array expected');
      t.set(r, n), (n += r.length);
    }),
    t
  );
}
function w0(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
function Ir(e) {
  if (typeof e != 'string')
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function v0(e) {
  let t;
  for (t = 0; e > Hc; e >>= Or, t += 1);
  return t;
}
const E0 = (e, t) => (e >> BigInt(t)) & Or,
  x0 = (e, t, n) => e | ((n ? Or : Hc) << BigInt(t)),
  Si = (e) => (b0 << BigInt(e - 1)) - Or,
  oo = (e) => new Uint8Array(e),
  fs = (e) => Uint8Array.from(e);
function $c(e, t, n) {
  if (typeof e != 'number' || e < 2)
    throw new Error('hashLen must be a number');
  if (typeof t != 'number' || t < 2)
    throw new Error('qByteLen must be a number');
  if (typeof n != 'function') throw new Error('hmacFn must be a function');
  let r = oo(e),
    o = oo(e),
    i = 0;
  const s = () => {
      r.fill(1), o.fill(0), (i = 0);
    },
    a = (...f) => n(o, r, ...f),
    c = (f = oo()) => {
      (o = a(fs([0]), f)),
        (r = a()),
        f.length !== 0 && ((o = a(fs([1]), f)), (r = a()));
    },
    u = () => {
      if (i++ >= 1e3) throw new Error('drbg: tried 1000 values');
      let f = 0;
      const l = [];
      for (; f < t; ) {
        r = a();
        const h = r.slice();
        l.push(h), (f += r.length);
      }
      return xe(...l);
    };
  return (f, l) => {
    s(), c(f);
    let h;
    for (; !(h = l(u())); ) c();
    return s(), h;
  };
}
const S0 = {
  bigint: (e) => typeof e == 'bigint',
  function: (e) => typeof e == 'function',
  boolean: (e) => typeof e == 'boolean',
  string: (e) => typeof e == 'string',
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == 'function' && Number.isSafeInteger(e.outputLen),
};
function Ft(e, t, n = {}) {
  const r = (o, i, s) => {
    const a = S0[i];
    if (typeof a != 'function')
      throw new Error(`Invalid validator "${i}", expected function`);
    const c = e[o];
    if (!(s && c === void 0) && !a(c, e))
      throw new Error(
        `Invalid param ${String(o)}=${c} (${typeof c}), expected ${i}`,
      );
  };
  for (const [o, i] of Object.entries(t)) r(o, i, !1);
  for (const [o, i] of Object.entries(n)) r(o, i, !0);
  return e;
}
const A0 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      bitGet: E0,
      bitLen: v0,
      bitMask: Si,
      bitSet: x0,
      bytesToHex: $t,
      bytesToNumberBE: ye,
      bytesToNumberLE: xi,
      concatBytes: xe,
      createHmacDrbg: $c,
      ensureBytes: ae,
      equalBytes: w0,
      hexToBytes: qt,
      hexToNumber: Ei,
      numberToBytesBE: yt,
      numberToBytesLE: jc,
      numberToHexUnpadded: Dc,
      numberToVarBytesBE: g0,
      utf8ToBytes: Ir,
      validateObject: Ft,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const re =
    BigInt(0),
  W = BigInt(1),
  kt = BigInt(2),
  _0 = BigInt(3),
  Po = BigInt(4),
  ds = BigInt(5),
  hs = BigInt(8);
BigInt(9);
BigInt(16);
function te(e, t) {
  const n = e % t;
  return n >= re ? n : t + n;
}
function T0(e, t, n) {
  if (n <= re || t < re) throw new Error('Expected power/modulo > 0');
  if (n === W) return re;
  let r = W;
  for (; t > re; ) t & W && (r = (r * e) % n), (e = (e * e) % n), (t >>= W);
  return r;
}
function _e(e, t, n) {
  let r = e;
  for (; t-- > re; ) (r *= r), (r %= n);
  return r;
}
function Lo(e, t) {
  if (e === re || t <= re)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = te(e, t),
    r = t,
    o = re,
    i = W;
  for (; n !== re; ) {
    const s = r / n,
      a = r % n,
      c = o - i * s;
    (r = n), (n = a), (o = i), (i = c);
  }
  if (r !== W) throw new Error('invert: does not exist');
  return te(o, t);
}
function k0(e) {
  const t = (e - W) / kt;
  let n, r, o;
  for (n = e - W, r = 0; n % kt === re; n /= kt, r++);
  for (o = kt; o < e && T0(o, t, e) !== e - W; o++);
  if (r === 1) {
    const s = (e + W) / Po;
    return function (a, c) {
      const u = a.pow(c, s);
      if (!a.eql(a.sqr(u), c)) throw new Error('Cannot find square root');
      return u;
    };
  }
  const i = (n + W) / kt;
  return function (s, a) {
    if (s.pow(a, t) === s.neg(s.ONE))
      throw new Error('Cannot find square root');
    let c = r,
      u = s.pow(s.mul(s.ONE, o), n),
      f = s.pow(a, i),
      l = s.pow(a, n);
    for (; !s.eql(l, s.ONE); ) {
      if (s.eql(l, s.ZERO)) return s.ZERO;
      let h = 1;
      for (let p = s.sqr(l); h < c && !s.eql(p, s.ONE); h++) p = s.sqr(p);
      const y = s.pow(u, W << BigInt(c - h - 1));
      (u = s.sqr(y)), (f = s.mul(f, y)), (l = s.mul(l, u)), (c = h);
    }
    return f;
  };
}
function O0(e) {
  if (e % Po === _0) {
    const t = (e + W) / Po;
    return function (n, r) {
      const o = n.pow(r, t);
      if (!n.eql(n.sqr(o), r)) throw new Error('Cannot find square root');
      return o;
    };
  }
  if (e % hs === ds) {
    const t = (e - ds) / hs;
    return function (n, r) {
      const o = n.mul(r, kt),
        i = n.pow(o, t),
        s = n.mul(r, i),
        a = n.mul(n.mul(s, kt), i),
        c = n.mul(s, n.sub(a, n.ONE));
      if (!n.eql(n.sqr(c), r)) throw new Error('Cannot find square root');
      return c;
    };
  }
  return k0(e);
}
const B0 = [
  'create',
  'isValid',
  'is0',
  'neg',
  'inv',
  'sqrt',
  'sqr',
  'eql',
  'add',
  'sub',
  'mul',
  'pow',
  'div',
  'addN',
  'subN',
  'mulN',
  'sqrN',
];
function qc(e) {
  const t = {
      ORDER: 'bigint',
      MASK: 'bigint',
      BYTES: 'isSafeInteger',
      BITS: 'isSafeInteger',
    },
    n = B0.reduce((r, o) => ((r[o] = 'function'), r), t);
  return Ft(e, n);
}
function I0(e, t, n) {
  if (n < re) throw new Error('Expected power > 0');
  if (n === re) return e.ONE;
  if (n === W) return t;
  let r = e.ONE,
    o = t;
  for (; n > re; ) n & W && (r = e.mul(r, o)), (o = e.sqr(o)), (n >>= W);
  return r;
}
function R0(e, t) {
  const n = new Array(t.length),
    r = t.reduce(
      (i, s, a) => (e.is0(s) ? i : ((n[a] = i), e.mul(i, s))),
      e.ONE,
    ),
    o = e.inv(r);
  return (
    t.reduceRight(
      (i, s, a) => (e.is0(s) ? i : ((n[a] = e.mul(i, n[a])), e.mul(i, s))),
      o,
    ),
    n
  );
}
function Ai(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length,
    r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function N0(e, t, n = !1, r = {}) {
  if (e <= re) throw new Error(`Expected Fp ORDER > 0, got ${e}`);
  const { nBitLength: o, nByteLength: i } = Ai(e, t);
  if (i > 2048)
    throw new Error('Field lengths over 2048 bytes are not supported');
  const s = O0(e),
    a = Object.freeze({
      ORDER: e,
      BITS: o,
      BYTES: i,
      MASK: Si(o),
      ZERO: re,
      ONE: W,
      create: (c) => te(c, e),
      isValid: (c) => {
        if (typeof c != 'bigint')
          throw new Error(
            `Invalid field element: expected bigint, got ${typeof c}`,
          );
        return re <= c && c < e;
      },
      is0: (c) => c === re,
      isOdd: (c) => (c & W) === W,
      neg: (c) => te(-c, e),
      eql: (c, u) => c === u,
      sqr: (c) => te(c * c, e),
      add: (c, u) => te(c + u, e),
      sub: (c, u) => te(c - u, e),
      mul: (c, u) => te(c * u, e),
      pow: (c, u) => I0(a, c, u),
      div: (c, u) => te(c * Lo(u, e), e),
      sqrN: (c) => c * c,
      addN: (c, u) => c + u,
      subN: (c, u) => c - u,
      mulN: (c, u) => c * u,
      inv: (c) => Lo(c, e),
      sqrt: r.sqrt || ((c) => s(a, c)),
      invertBatch: (c) => R0(a, c),
      cmov: (c, u, f) => (f ? u : c),
      toBytes: (c) => (n ? jc(c, i) : yt(c, i)),
      fromBytes: (c) => {
        if (c.length !== i)
          throw new Error(`Fp.fromBytes: expected ${i}, got ${c.length}`);
        return n ? xi(c) : ye(c);
      },
    });
  return Object.freeze(a);
}
function C0(e, t, n = !1) {
  e = ae('privateHash', e);
  const r = e.length,
    o = Ai(t).nByteLength + 8;
  if (o < 24 || r < o || r > 1024)
    throw new Error(
      `hashToPrivateScalar: expected ${o}-1024 bytes of input, got ${r}`,
    );
  const i = n ? xi(e) : ye(e);
  return te(i, t - W) + W;
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const P0 =
    BigInt(0),
  io = BigInt(1);
function L0(e, t) {
  const n = (o, i) => {
      const s = i.negate();
      return o ? s : i;
    },
    r = (o) => {
      const i = Math.ceil(t / o) + 1,
        s = 2 ** (o - 1);
      return { windows: i, windowSize: s };
    };
  return {
    constTimeNegate: n,
    unsafeLadder(o, i) {
      let s = e.ZERO,
        a = o;
      for (; i > P0; ) i & io && (s = s.add(a)), (a = a.double()), (i >>= io);
      return s;
    },
    precomputeWindow(o, i) {
      const { windows: s, windowSize: a } = r(i),
        c = [];
      let u = o,
        f = u;
      for (let l = 0; l < s; l++) {
        (f = u), c.push(f);
        for (let h = 1; h < a; h++) (f = f.add(u)), c.push(f);
        u = f.double();
      }
      return c;
    },
    wNAF(o, i, s) {
      const { windows: a, windowSize: c } = r(o);
      let u = e.ZERO,
        f = e.BASE;
      const l = BigInt(2 ** o - 1),
        h = 2 ** o,
        y = BigInt(o);
      for (let p = 0; p < a; p++) {
        const d = p * c;
        let m = Number(s & l);
        (s >>= y), m > c && ((m -= h), (s += io));
        const b = d,
          g = d + Math.abs(m) - 1,
          w = p % 2 !== 0,
          E = m < 0;
        m === 0 ? (f = f.add(n(w, i[b]))) : (u = u.add(n(E, i[g])));
      }
      return { p: u, f };
    },
    wNAFCached(o, i, s, a) {
      const c = o._WINDOW_SIZE || 1;
      let u = i.get(o);
      return (
        u || ((u = this.precomputeWindow(o, c)), c !== 1 && i.set(o, a(u))),
        this.wNAF(c, u, s)
      );
    },
  };
}
function Mc(e) {
  return (
    qc(e.Fp),
    Ft(
      e,
      { n: 'bigint', h: 'bigint', Gx: 'field', Gy: 'field' },
      { nBitLength: 'isSafeInteger', nByteLength: 'isSafeInteger' },
    ),
    Object.freeze({ ...Ai(e.n, e.nBitLength), ...e, p: e.Fp.ORDER })
  );
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function U0(
  e,
) {
  const t = Mc(e);
  Ft(
    t,
    { a: 'field', b: 'field' },
    {
      allowedPrivateKeyLengths: 'array',
      wrapPrivateKey: 'boolean',
      isTorsionFree: 'function',
      clearCofactor: 'function',
      allowInfinityPoint: 'boolean',
      fromBytes: 'function',
      toBytes: 'function',
    },
  );
  const { endo: n, Fp: r, a: o } = t;
  if (n) {
    if (!r.eql(o, r.ZERO))
      throw new Error(
        'Endomorphism can only be defined for Koblitz curves that have a=0',
      );
    if (
      typeof n != 'object' ||
      typeof n.beta != 'bigint' ||
      typeof n.splitScalar != 'function'
    )
      throw new Error(
        'Expected endomorphism with beta: bigint and splitScalar: function',
      );
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: H0, hexToBytes: D0 } = A0,
  Rt = {
    Err: class extends Error {
      constructor(e = '') {
        super(e);
      }
    },
    _parseInt(e) {
      const { Err: t } = Rt;
      if (e.length < 2 || e[0] !== 2)
        throw new t('Invalid signature integer tag');
      const n = e[1],
        r = e.subarray(2, n + 2);
      if (!n || r.length !== n)
        throw new t('Invalid signature integer: wrong length');
      if (r[0] & 128) throw new t('Invalid signature integer: negative');
      if (r[0] === 0 && !(r[1] & 128))
        throw new t('Invalid signature integer: unnecessary leading zero');
      return { d: H0(r), l: e.subarray(n + 2) };
    },
    toSig(e) {
      const { Err: t } = Rt,
        n = typeof e == 'string' ? D0(e) : e;
      if (!(n instanceof Uint8Array)) throw new Error('ui8a expected');
      let r = n.length;
      if (r < 2 || n[0] != 48) throw new t('Invalid signature tag');
      if (n[1] !== r - 2) throw new t('Invalid signature: incorrect length');
      const { d: o, l: i } = Rt._parseInt(n.subarray(2)),
        { d: s, l: a } = Rt._parseInt(i);
      if (a.length) throw new t('Invalid signature: left bytes after parsing');
      return { r: o, s };
    },
    hexFromSig(e) {
      const t = (u) => (Number.parseInt(u[0], 16) & 8 ? '00' + u : u),
        n = (u) => {
          const f = u.toString(16);
          return f.length & 1 ? `0${f}` : f;
        },
        r = t(n(e.s)),
        o = t(n(e.r)),
        i = r.length / 2,
        s = o.length / 2,
        a = n(i),
        c = n(s);
      return `30${n(s + i + 4)}02${c}${o}02${a}${r}`;
    },
  },
  Ne = BigInt(0),
  Z = BigInt(1),
  We = BigInt(2),
  sr = BigInt(3),
  ps = BigInt(4);
function j0(e) {
  const t = U0(e),
    { Fp: n } = t,
    r =
      t.toBytes ||
      ((p, d, m) => {
        const b = d.toAffine();
        return xe(Uint8Array.from([4]), n.toBytes(b.x), n.toBytes(b.y));
      }),
    o =
      t.fromBytes ||
      ((p) => {
        const d = p.subarray(1),
          m = n.fromBytes(d.subarray(0, n.BYTES)),
          b = n.fromBytes(d.subarray(n.BYTES, 2 * n.BYTES));
        return { x: m, y: b };
      });
  function i(p) {
    const { a: d, b: m } = t,
      b = n.sqr(p),
      g = n.mul(b, p);
    return n.add(n.add(g, n.mul(p, d)), m);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error('bad generator point: equation left != right');
  function s(p) {
    return typeof p == 'bigint' && Ne < p && p < t.n;
  }
  function a(p) {
    if (!s(p)) throw new Error('Expected valid bigint: 0 < bigint < curve.n');
  }
  function c(p) {
    const {
      allowedPrivateKeyLengths: d,
      nByteLength: m,
      wrapPrivateKey: b,
      n: g,
    } = t;
    if (d && typeof p != 'bigint') {
      if (
        (p instanceof Uint8Array && (p = $t(p)),
        typeof p != 'string' || !d.includes(p.length))
      )
        throw new Error('Invalid key');
      p = p.padStart(m * 2, '0');
    }
    let w;
    try {
      w = typeof p == 'bigint' ? p : ye(ae('private key', p, m));
    } catch {
      throw new Error(
        `private key must be ${m} bytes, hex or bigint, not ${typeof p}`,
      );
    }
    return b && (w = te(w, g)), a(w), w;
  }
  const u = new Map();
  function f(p) {
    if (!(p instanceof l)) throw new Error('ProjectivePoint expected');
  }
  class l {
    constructor(d, m, b) {
      if (
        ((this.px = d),
        (this.py = m),
        (this.pz = b),
        d == null || !n.isValid(d))
      )
        throw new Error('x required');
      if (m == null || !n.isValid(m)) throw new Error('y required');
      if (b == null || !n.isValid(b)) throw new Error('z required');
    }
    static fromAffine(d) {
      const { x: m, y: b } = d || {};
      if (!d || !n.isValid(m) || !n.isValid(b))
        throw new Error('invalid affine point');
      if (d instanceof l) throw new Error('projective point not allowed');
      const g = (w) => n.eql(w, n.ZERO);
      return g(m) && g(b) ? l.ZERO : new l(m, b, n.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(d) {
      const m = n.invertBatch(d.map((b) => b.pz));
      return d.map((b, g) => b.toAffine(m[g])).map(l.fromAffine);
    }
    static fromHex(d) {
      const m = l.fromAffine(o(ae('pointHex', d)));
      return m.assertValidity(), m;
    }
    static fromPrivateKey(d) {
      return l.BASE.multiply(c(d));
    }
    _setWindowSize(d) {
      (this._WINDOW_SIZE = d), u.delete(this);
    }
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint) return;
        throw new Error('bad point: ZERO');
      }
      const { x: d, y: m } = this.toAffine();
      if (!n.isValid(d) || !n.isValid(m))
        throw new Error('bad point: x or y not FE');
      const b = n.sqr(m),
        g = i(d);
      if (!n.eql(b, g)) throw new Error('bad point: equation left != right');
      if (!this.isTorsionFree())
        throw new Error('bad point: not in prime-order subgroup');
    }
    hasEvenY() {
      const { y: d } = this.toAffine();
      if (n.isOdd) return !n.isOdd(d);
      throw new Error("Field doesn't support isOdd");
    }
    equals(d) {
      f(d);
      const { px: m, py: b, pz: g } = this,
        { px: w, py: E, pz: S } = d,
        v = n.eql(n.mul(m, S), n.mul(w, g)),
        A = n.eql(n.mul(b, S), n.mul(E, g));
      return v && A;
    }
    negate() {
      return new l(this.px, n.neg(this.py), this.pz);
    }
    double() {
      const { a: d, b: m } = t,
        b = n.mul(m, sr),
        { px: g, py: w, pz: E } = this;
      let S = n.ZERO,
        v = n.ZERO,
        A = n.ZERO,
        k = n.mul(g, g),
        R = n.mul(w, w),
        I = n.mul(E, E),
        O = n.mul(g, w);
      return (
        (O = n.add(O, O)),
        (A = n.mul(g, E)),
        (A = n.add(A, A)),
        (S = n.mul(d, A)),
        (v = n.mul(b, I)),
        (v = n.add(S, v)),
        (S = n.sub(R, v)),
        (v = n.add(R, v)),
        (v = n.mul(S, v)),
        (S = n.mul(O, S)),
        (A = n.mul(b, A)),
        (I = n.mul(d, I)),
        (O = n.sub(k, I)),
        (O = n.mul(d, O)),
        (O = n.add(O, A)),
        (A = n.add(k, k)),
        (k = n.add(A, k)),
        (k = n.add(k, I)),
        (k = n.mul(k, O)),
        (v = n.add(v, k)),
        (I = n.mul(w, E)),
        (I = n.add(I, I)),
        (k = n.mul(I, O)),
        (S = n.sub(S, k)),
        (A = n.mul(I, R)),
        (A = n.add(A, A)),
        (A = n.add(A, A)),
        new l(S, v, A)
      );
    }
    add(d) {
      f(d);
      const { px: m, py: b, pz: g } = this,
        { px: w, py: E, pz: S } = d;
      let v = n.ZERO,
        A = n.ZERO,
        k = n.ZERO;
      const R = t.a,
        I = n.mul(t.b, sr);
      let O = n.mul(m, w),
        D = n.mul(b, E),
        j = n.mul(g, S),
        V = n.add(m, b),
        x = n.add(w, E);
      (V = n.mul(V, x)),
        (x = n.add(O, D)),
        (V = n.sub(V, x)),
        (x = n.add(m, g));
      let _ = n.add(w, S);
      return (
        (x = n.mul(x, _)),
        (_ = n.add(O, j)),
        (x = n.sub(x, _)),
        (_ = n.add(b, g)),
        (v = n.add(E, S)),
        (_ = n.mul(_, v)),
        (v = n.add(D, j)),
        (_ = n.sub(_, v)),
        (k = n.mul(R, x)),
        (v = n.mul(I, j)),
        (k = n.add(v, k)),
        (v = n.sub(D, k)),
        (k = n.add(D, k)),
        (A = n.mul(v, k)),
        (D = n.add(O, O)),
        (D = n.add(D, O)),
        (j = n.mul(R, j)),
        (x = n.mul(I, x)),
        (D = n.add(D, j)),
        (j = n.sub(O, j)),
        (j = n.mul(R, j)),
        (x = n.add(x, j)),
        (O = n.mul(D, x)),
        (A = n.add(A, O)),
        (O = n.mul(_, x)),
        (v = n.mul(V, v)),
        (v = n.sub(v, O)),
        (O = n.mul(V, D)),
        (k = n.mul(_, k)),
        (k = n.add(k, O)),
        new l(v, A, k)
      );
    }
    subtract(d) {
      return this.add(d.negate());
    }
    is0() {
      return this.equals(l.ZERO);
    }
    wNAF(d) {
      return y.wNAFCached(this, u, d, (m) => {
        const b = n.invertBatch(m.map((g) => g.pz));
        return m.map((g, w) => g.toAffine(b[w])).map(l.fromAffine);
      });
    }
    multiplyUnsafe(d) {
      const m = l.ZERO;
      if (d === Ne) return m;
      if ((a(d), d === Z)) return this;
      const { endo: b } = t;
      if (!b) return y.unsafeLadder(this, d);
      let { k1neg: g, k1: w, k2neg: E, k2: S } = b.splitScalar(d),
        v = m,
        A = m,
        k = this;
      for (; w > Ne || S > Ne; )
        w & Z && (v = v.add(k)),
          S & Z && (A = A.add(k)),
          (k = k.double()),
          (w >>= Z),
          (S >>= Z);
      return (
        g && (v = v.negate()),
        E && (A = A.negate()),
        (A = new l(n.mul(A.px, b.beta), A.py, A.pz)),
        v.add(A)
      );
    }
    multiply(d) {
      a(d);
      let m = d,
        b,
        g;
      const { endo: w } = t;
      if (w) {
        const { k1neg: E, k1: S, k2neg: v, k2: A } = w.splitScalar(m);
        let { p: k, f: R } = this.wNAF(S),
          { p: I, f: O } = this.wNAF(A);
        (k = y.constTimeNegate(E, k)),
          (I = y.constTimeNegate(v, I)),
          (I = new l(n.mul(I.px, w.beta), I.py, I.pz)),
          (b = k.add(I)),
          (g = R.add(O));
      } else {
        const { p: E, f: S } = this.wNAF(m);
        (b = E), (g = S);
      }
      return l.normalizeZ([b, g])[0];
    }
    multiplyAndAddUnsafe(d, m, b) {
      const g = l.BASE,
        w = (S, v) =>
          v === Ne || v === Z || !S.equals(g)
            ? S.multiplyUnsafe(v)
            : S.multiply(v),
        E = w(this, m).add(w(d, b));
      return E.is0() ? void 0 : E;
    }
    toAffine(d) {
      const { px: m, py: b, pz: g } = this,
        w = this.is0();
      d == null && (d = w ? n.ONE : n.inv(g));
      const E = n.mul(m, d),
        S = n.mul(b, d),
        v = n.mul(g, d);
      if (w) return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(v, n.ONE)) throw new Error('invZ was invalid');
      return { x: E, y: S };
    }
    isTorsionFree() {
      const { h: d, isTorsionFree: m } = t;
      if (d === Z) return !0;
      if (m) return m(l, this);
      throw new Error(
        'isTorsionFree() has not been declared for the elliptic curve',
      );
    }
    clearCofactor() {
      const { h: d, clearCofactor: m } = t;
      return d === Z ? this : m ? m(l, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(d = !0) {
      return this.assertValidity(), r(l, this, d);
    }
    toHex(d = !0) {
      return $t(this.toRawBytes(d));
    }
  }
  (l.BASE = new l(t.Gx, t.Gy, n.ONE)), (l.ZERO = new l(n.ZERO, n.ONE, n.ZERO));
  const h = t.nBitLength,
    y = L0(l, t.endo ? Math.ceil(h / 2) : h);
  return {
    CURVE: t,
    ProjectivePoint: l,
    normPrivateKeyToScalar: c,
    weierstrassEquation: i,
    isWithinCurveOrder: s,
  };
}
function $0(e) {
  const t = Mc(e);
  return (
    Ft(
      t,
      { hash: 'hash', hmac: 'function', randomBytes: 'function' },
      { bits2int: 'function', bits2int_modN: 'function', lowS: 'boolean' },
    ),
    Object.freeze({ lowS: !0, ...t })
  );
}
function q0(e) {
  const t = $0(e),
    { Fp: n, n: r } = t,
    o = n.BYTES + 1,
    i = 2 * n.BYTES + 1;
  function s(x) {
    return Ne < x && x < n.ORDER;
  }
  function a(x) {
    return te(x, r);
  }
  function c(x) {
    return Lo(x, r);
  }
  const {
      ProjectivePoint: u,
      normPrivateKeyToScalar: f,
      weierstrassEquation: l,
      isWithinCurveOrder: h,
    } = j0({
      ...t,
      toBytes(x, _, B) {
        const N = _.toAffine(),
          C = n.toBytes(N.x),
          L = xe;
        return B
          ? L(Uint8Array.from([_.hasEvenY() ? 2 : 3]), C)
          : L(Uint8Array.from([4]), C, n.toBytes(N.y));
      },
      fromBytes(x) {
        const _ = x.length,
          B = x[0],
          N = x.subarray(1);
        if (_ === o && (B === 2 || B === 3)) {
          const C = ye(N);
          if (!s(C)) throw new Error('Point is not on curve');
          const L = l(C);
          let q = n.sqrt(L);
          const M = (q & Z) === Z;
          return ((B & 1) === 1) !== M && (q = n.neg(q)), { x: C, y: q };
        } else if (_ === i && B === 4) {
          const C = n.fromBytes(N.subarray(0, n.BYTES)),
            L = n.fromBytes(N.subarray(n.BYTES, 2 * n.BYTES));
          return { x: C, y: L };
        } else
          throw new Error(
            `Point of length ${_} was invalid. Expected ${o} compressed bytes or ${i} uncompressed bytes`,
          );
      },
    }),
    y = (x) => $t(yt(x, t.nByteLength));
  function p(x) {
    const _ = r >> Z;
    return x > _;
  }
  function d(x) {
    return p(x) ? a(-x) : x;
  }
  const m = (x, _, B) => ye(x.slice(_, B));
  class b {
    constructor(_, B, N) {
      (this.r = _), (this.s = B), (this.recovery = N), this.assertValidity();
    }
    static fromCompact(_) {
      const B = t.nByteLength;
      return (
        (_ = ae('compactSignature', _, B * 2)),
        new b(m(_, 0, B), m(_, B, 2 * B))
      );
    }
    static fromDER(_) {
      const { r: B, s: N } = Rt.toSig(ae('DER', _));
      return new b(B, N);
    }
    assertValidity() {
      if (!h(this.r)) throw new Error('r must be 0 < r < CURVE.n');
      if (!h(this.s)) throw new Error('s must be 0 < s < CURVE.n');
    }
    addRecoveryBit(_) {
      return new b(this.r, this.s, _);
    }
    recoverPublicKey(_) {
      const { r: B, s: N, recovery: C } = this,
        L = A(ae('msgHash', _));
      if (C == null || ![0, 1, 2, 3].includes(C))
        throw new Error('recovery id invalid');
      const q = C === 2 || C === 3 ? B + t.n : B;
      if (q >= n.ORDER) throw new Error('recovery id 2 or 3 invalid');
      const M = C & 1 ? '03' : '02',
        Y = u.fromHex(M + y(q)),
        oe = c(q),
        me = a(-L * oe),
        Oe = a(N * oe),
        ue = u.BASE.multiplyAndAddUnsafe(Y, me, Oe);
      if (!ue) throw new Error('point at infinify');
      return ue.assertValidity(), ue;
    }
    hasHighS() {
      return p(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new b(this.r, a(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return qt(this.toDERHex());
    }
    toDERHex() {
      return Rt.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return qt(this.toCompactHex());
    }
    toCompactHex() {
      return y(this.r) + y(this.s);
    }
  }
  const g = {
    isValidPrivateKey(x) {
      try {
        return f(x), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: f,
    randomPrivateKey: () => {
      const x = t.randomBytes(n.BYTES + 8),
        _ = C0(x, r);
      return yt(_, t.nByteLength);
    },
    precompute(x = 8, _ = u.BASE) {
      return _._setWindowSize(x), _.multiply(BigInt(3)), _;
    },
  };
  function w(x, _ = !0) {
    return u.fromPrivateKey(x).toRawBytes(_);
  }
  function E(x) {
    const _ = x instanceof Uint8Array,
      B = typeof x == 'string',
      N = (_ || B) && x.length;
    return _
      ? N === o || N === i
      : B
      ? N === 2 * o || N === 2 * i
      : x instanceof u;
  }
  function S(x, _, B = !0) {
    if (E(x)) throw new Error('first arg must be private key');
    if (!E(_)) throw new Error('second arg must be public key');
    return u.fromHex(_).multiply(f(x)).toRawBytes(B);
  }
  const v =
      t.bits2int ||
      function (x) {
        const _ = ye(x),
          B = x.length * 8 - t.nBitLength;
        return B > 0 ? _ >> BigInt(B) : _;
      },
    A =
      t.bits2int_modN ||
      function (x) {
        return a(v(x));
      },
    k = Si(t.nBitLength);
  function R(x) {
    if (typeof x != 'bigint') throw new Error('bigint expected');
    if (!(Ne <= x && x < k))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return yt(x, t.nByteLength);
  }
  function I(x, _, B = O) {
    if (['recovered', 'canonical'].some((de) => de in B))
      throw new Error('sign() legacy options not supported');
    const { hash: N, randomBytes: C } = t;
    let { lowS: L, prehash: q, extraEntropy: M } = B;
    L == null && (L = !0),
      (x = ae('msgHash', x)),
      q && (x = ae('prehashed msgHash', N(x)));
    const Y = A(x),
      oe = f(_),
      me = [R(oe), R(Y)];
    if (M != null) {
      const de = M === !0 ? C(n.BYTES) : M;
      me.push(ae('extraEntropy', de, n.BYTES));
    }
    const Oe = xe(...me),
      ue = Y;
    function Qe(de) {
      const Se = v(de);
      if (!h(Se)) return;
      const St = c(Se),
        ie = u.BASE.multiply(Se).toAffine(),
        ee = a(ie.x);
      if (ee === Ne) return;
      const Be = a(St * a(ue + ee * oe));
      if (Be === Ne) return;
      let Jt = (ie.x === ee ? 0 : 2) | Number(ie.y & Z),
        Yt = Be;
      return L && p(Be) && ((Yt = d(Be)), (Jt ^= 1)), new b(ee, Yt, Jt);
    }
    return { seed: Oe, k2sig: Qe };
  }
  const O = { lowS: t.lowS, prehash: !1 },
    D = { lowS: t.lowS, prehash: !1 };
  function j(x, _, B = O) {
    const { seed: N, k2sig: C } = I(x, _, B);
    return $c(t.hash.outputLen, t.nByteLength, t.hmac)(N, C);
  }
  u.BASE._setWindowSize(8);
  function V(x, _, B, N = D) {
    var C;
    const L = x;
    if (((_ = ae('msgHash', _)), (B = ae('publicKey', B)), 'strict' in N))
      throw new Error('options.strict was renamed to lowS');
    const { lowS: q, prehash: M } = N;
    let Y, oe;
    try {
      if (typeof L == 'string' || L instanceof Uint8Array)
        try {
          Y = b.fromDER(L);
        } catch (ie) {
          if (!(ie instanceof Rt.Err)) throw ie;
          Y = b.fromCompact(L);
        }
      else if (
        typeof L == 'object' &&
        typeof L.r == 'bigint' &&
        typeof L.s == 'bigint'
      ) {
        const { r: ie, s: ee } = L;
        Y = new b(ie, ee);
      } else throw new Error('PARSE');
      oe = u.fromHex(B);
    } catch (ie) {
      if (ie.message === 'PARSE')
        throw new Error(
          'signature must be Signature instance, Uint8Array or hex string',
        );
      return !1;
    }
    if (q && Y.hasHighS()) return !1;
    M && (_ = t.hash(_));
    const { r: me, s: Oe } = Y,
      ue = A(_),
      Qe = c(Oe),
      de = a(ue * Qe),
      Se = a(me * Qe),
      St =
        (C = u.BASE.multiplyAndAddUnsafe(oe, de, Se)) == null
          ? void 0
          : C.toAffine();
    return St ? a(St.x) === me : !1;
  }
  return {
    CURVE: t,
    getPublicKey: w,
    getSharedSecret: S,
    sign: j,
    verify: V,
    ProjectivePoint: u,
    Signature: b,
    utils: g,
  };
}
function M0(e, t) {
  const n = e.ORDER;
  let r = Ne;
  for (let h = n - Z; h % We === Ne; h /= We) r += Z;
  const o = r,
    i = (n - Z) / We ** o,
    s = (i - Z) / We,
    a = We ** o - Z,
    c = We ** (o - Z),
    u = e.pow(t, i),
    f = e.pow(t, (i + Z) / We);
  let l = (h, y) => {
    let p = u,
      d = e.pow(y, a),
      m = e.sqr(d);
    m = e.mul(m, y);
    let b = e.mul(h, m);
    (b = e.pow(b, s)), (b = e.mul(b, d)), (d = e.mul(b, y)), (m = e.mul(b, h));
    let g = e.mul(m, d);
    b = e.pow(g, c);
    let w = e.eql(b, e.ONE);
    (d = e.mul(m, f)),
      (b = e.mul(g, p)),
      (m = e.cmov(d, m, w)),
      (g = e.cmov(b, g, w));
    for (let E = o; E > Z; E--) {
      let S = We ** (E - We),
        v = e.pow(g, S);
      const A = e.eql(v, e.ONE);
      (d = e.mul(m, p)),
        (p = e.mul(p, p)),
        (v = e.mul(g, p)),
        (m = e.cmov(d, m, A)),
        (g = e.cmov(v, g, A));
    }
    return { isValid: w, value: m };
  };
  if (e.ORDER % ps === sr) {
    const h = (e.ORDER - sr) / ps,
      y = e.sqrt(e.neg(t));
    l = (p, d) => {
      let m = e.sqr(d);
      const b = e.mul(p, d);
      m = e.mul(m, b);
      let g = e.pow(m, h);
      g = e.mul(g, b);
      const w = e.mul(g, y),
        E = e.mul(e.sqr(g), d),
        S = e.eql(E, p);
      let v = e.cmov(w, g, S);
      return { isValid: S, value: v };
    };
  }
  return l;
}
function z0(e, t) {
  if ((qc(e), !e.isValid(t.A) || !e.isValid(t.B) || !e.isValid(t.Z)))
    throw new Error('mapToCurveSimpleSWU: invalid opts');
  const n = M0(e, t.Z);
  if (!e.isOdd) throw new Error('Fp.isOdd is not implemented!');
  return (r) => {
    let o, i, s, a, c, u, f, l;
    (o = e.sqr(r)),
      (o = e.mul(o, t.Z)),
      (i = e.sqr(o)),
      (i = e.add(i, o)),
      (s = e.add(i, e.ONE)),
      (s = e.mul(s, t.B)),
      (a = e.cmov(t.Z, e.neg(i), !e.eql(i, e.ZERO))),
      (a = e.mul(a, t.A)),
      (i = e.sqr(s)),
      (u = e.sqr(a)),
      (c = e.mul(u, t.A)),
      (i = e.add(i, c)),
      (i = e.mul(i, s)),
      (u = e.mul(u, a)),
      (c = e.mul(u, t.B)),
      (i = e.add(i, c)),
      (f = e.mul(o, s));
    const { isValid: h, value: y } = n(i, u);
    (l = e.mul(o, r)),
      (l = e.mul(l, y)),
      (f = e.cmov(f, s, h)),
      (l = e.cmov(l, y, h));
    const p = e.isOdd(r) === e.isOdd(l);
    return (l = e.cmov(e.neg(l), l, p)), (f = e.div(f, a)), { x: f, y: l };
  };
}
function V0(e) {
  if (e instanceof Uint8Array) return e;
  if (typeof e == 'string') return Ir(e);
  throw new Error('DST must be Uint8Array or string');
}
const K0 = ye;
function ut(e, t) {
  if (e < 0 || e >= 1 << (8 * t))
    throw new Error(`bad I2OSP call: value=${e} length=${t}`);
  const n = Array.from({ length: t }).fill(0);
  for (let r = t - 1; r >= 0; r--) (n[r] = e & 255), (e >>>= 8);
  return new Uint8Array(n);
}
function W0(e, t) {
  const n = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++) n[r] = e[r] ^ t[r];
  return n;
}
function yn(e) {
  if (!(e instanceof Uint8Array)) throw new Error('Uint8Array expected');
}
function _i(e) {
  if (!Number.isSafeInteger(e)) throw new Error('number expected');
}
function F0(e, t, n, r) {
  yn(e),
    yn(t),
    _i(n),
    t.length > 255 && (t = r(xe(Ir('H2C-OVERSIZE-DST-'), t)));
  const { outputLen: o, blockLen: i } = r,
    s = Math.ceil(n / o);
  if (s > 255) throw new Error('Invalid xmd length');
  const a = xe(t, ut(t.length, 1)),
    c = ut(0, i),
    u = ut(n, 2),
    f = new Array(s),
    l = r(xe(c, e, u, ut(0, 1), a));
  f[0] = r(xe(l, ut(1, 1), a));
  for (let h = 1; h <= s; h++) {
    const y = [W0(l, f[h - 1]), ut(h + 1, 1), a];
    f[h] = r(xe(...y));
  }
  return xe(...f).slice(0, n);
}
function Z0(e, t, n, r, o) {
  if ((yn(e), yn(t), _i(n), t.length > 255)) {
    const i = Math.ceil((2 * r) / 8);
    t = o
      .create({ dkLen: i })
      .update(Ir('H2C-OVERSIZE-DST-'))
      .update(t)
      .digest();
  }
  if (n > 65535 || t.length > 255)
    throw new Error('expand_message_xof: invalid lenInBytes');
  return o
    .create({ dkLen: n })
    .update(e)
    .update(ut(n, 2))
    .update(t)
    .update(ut(t.length, 1))
    .digest();
}
function ys(e, t, n) {
  Ft(n, {
    DST: 'string',
    p: 'bigint',
    m: 'isSafeInteger',
    k: 'isSafeInteger',
    hash: 'hash',
  });
  const { p: r, k: o, m: i, hash: s, expand: a, DST: c } = n;
  yn(e), _i(t);
  const u = V0(c),
    f = r.toString(2).length,
    l = Math.ceil((f + o) / 8),
    h = t * i * l;
  let y;
  if (a === 'xmd') y = F0(e, u, h, s);
  else if (a === 'xof') y = Z0(e, u, h, o, s);
  else if (a === '_internal_pass') y = e;
  else throw new Error('expand must be "xmd" or "xof"');
  const p = new Array(t);
  for (let d = 0; d < t; d++) {
    const m = new Array(i);
    for (let b = 0; b < i; b++) {
      const g = l * (b + d * i),
        w = y.subarray(g, g + l);
      m[b] = te(K0(w), r);
    }
    p[d] = m;
  }
  return p;
}
function G0(e, t) {
  const n = t.map((r) => Array.from(r).reverse());
  return (r, o) => {
    const [i, s, a, c] = n.map((u) =>
      u.reduce((f, l) => e.add(e.mul(f, r), l)),
    );
    return (r = e.div(i, s)), (o = e.mul(o, e.div(a, c))), { x: r, y: o };
  };
}
function J0(e, t, n) {
  if (typeof t != 'function') throw new Error('mapToCurve() must be defined');
  return {
    hashToCurve(r, o) {
      const i = ys(r, 2, { ...n, DST: n.DST, ...o }),
        s = e.fromAffine(t(i[0])),
        a = e.fromAffine(t(i[1])),
        c = s.add(a).clearCofactor();
      return c.assertValidity(), c;
    },
    encodeToCurve(r, o) {
      const i = ys(r, 1, { ...n, DST: n.encodeDST, ...o }),
        s = e.fromAffine(t(i[0])).clearCofactor();
      return s.assertValidity(), s;
    },
  };
}
class zc extends Cc {
  constructor(t, n) {
    super(), (this.finished = !1), (this.destroyed = !1), It.hash(t);
    const r = vi(n);
    if (((this.iHash = t.create()), typeof this.iHash.update != 'function'))
      throw new TypeError(
        'Expected instance of class which extends utils.Hash',
      );
    (this.blockLen = this.iHash.blockLen),
      (this.outputLen = this.iHash.outputLen);
    const o = this.blockLen,
      i = new Uint8Array(o);
    i.set(r.length > o ? t.create().update(r).digest() : r);
    for (let s = 0; s < i.length; s++) i[s] ^= 54;
    this.iHash.update(i), (this.oHash = t.create());
    for (let s = 0; s < i.length; s++) i[s] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return It.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    It.exists(this),
      It.bytes(t, this.outputLen),
      (this.finished = !0),
      this.iHash.digestInto(t),
      this.oHash.update(t),
      this.oHash.digestInto(t),
      this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const {
      oHash: n,
      iHash: r,
      finished: o,
      destroyed: i,
      blockLen: s,
      outputLen: a,
    } = this;
    return (
      (t = t),
      (t.finished = o),
      (t.destroyed = i),
      (t.blockLen = s),
      (t.outputLen = a),
      (t.oHash = n._cloneInto(t.oHash)),
      (t.iHash = r._cloneInto(t.iHash)),
      t
    );
  }
  destroy() {
    (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
  }
}
const Vc = (e, t, n) => new zc(e, t).update(n).digest();
Vc.create = (e, t) => new zc(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function Y0(
  e,
) {
  return { hash: e, hmac: (t, ...n) => Vc(e, t, u0(...n)), randomBytes: Lc };
}
function X0(e, t) {
  const n = (r) => q0({ ...e, ...Y0(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Rr =
    BigInt(
      '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f',
    ),
  ar = BigInt(
    '0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141',
  ),
  Kc = BigInt(1),
  cr = BigInt(2),
  bs = (e, t) => (e + t / cr) / t;
function Wc(e) {
  const t = Rr,
    n = BigInt(3),
    r = BigInt(6),
    o = BigInt(11),
    i = BigInt(22),
    s = BigInt(23),
    a = BigInt(44),
    c = BigInt(88),
    u = (e * e * e) % t,
    f = (u * u * e) % t,
    l = (_e(f, n, t) * f) % t,
    h = (_e(l, n, t) * f) % t,
    y = (_e(h, cr, t) * u) % t,
    p = (_e(y, o, t) * y) % t,
    d = (_e(p, i, t) * p) % t,
    m = (_e(d, a, t) * d) % t,
    b = (_e(m, c, t) * m) % t,
    g = (_e(b, a, t) * d) % t,
    w = (_e(g, n, t) * f) % t,
    E = (_e(w, s, t) * p) % t,
    S = (_e(E, r, t) * u) % t,
    v = _e(S, cr, t);
  if (!gt.eql(gt.sqr(v), e)) throw new Error('Cannot find square root');
  return v;
}
const gt = N0(Rr, void 0, void 0, { sqrt: Wc }),
  Nr = X0(
    {
      a: BigInt(0),
      b: BigInt(7),
      Fp: gt,
      n: ar,
      Gx: BigInt(
        '55066263022277343669578718895168534326250603453777594175500187360389116729240',
      ),
      Gy: BigInt(
        '32670510020758816978083085130507043184471273380659243275938904335757337482424',
      ),
      h: BigInt(1),
      lowS: !0,
      endo: {
        beta: BigInt(
          '0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
        ),
        splitScalar: (e) => {
          const t = ar,
            n = BigInt('0x3086d221a7d46bcde86c90e49284eb15'),
            r = -Kc * BigInt('0xe4437ed6010e88286f547fa90abfe4c3'),
            o = BigInt('0x114ca50f7a8e2f3f657c1108d9d44cfd8'),
            i = n,
            s = BigInt('0x100000000000000000000000000000000'),
            a = bs(i * e, t),
            c = bs(-r * e, t);
          let u = te(e - a * n - c * o, t),
            f = te(-a * r - c * i, t);
          const l = u > s,
            h = f > s;
          if ((l && (u = t - u), h && (f = t - f), u > s || f > s))
            throw new Error('splitScalar: Endomorphism failed, k=' + e);
          return { k1neg: l, k1: u, k2neg: h, k2: f };
        },
      },
    },
    pn,
  ),
  Cr = BigInt(0),
  Fc = (e) => typeof e == 'bigint' && Cr < e && e < Rr,
  Q0 = (e) => typeof e == 'bigint' && Cr < e && e < ar,
  ms = {};
function ur(e, ...t) {
  let n = ms[e];
  if (n === void 0) {
    const r = pn(Uint8Array.from(e, (o) => o.charCodeAt(0)));
    (n = xe(r, r)), (ms[e] = n);
  }
  return pn(xe(n, ...t));
}
const Ti = (e) => e.toRawBytes(!0).slice(1),
  Uo = (e) => yt(e, 32),
  so = (e) => te(e, Rr),
  bn = (e) => te(e, ar),
  ki = Nr.ProjectivePoint,
  ey = (e, t, n) => ki.BASE.multiplyAndAddUnsafe(e, t, n);
function Ho(e) {
  let t = Nr.utils.normPrivateKeyToScalar(e),
    n = ki.fromPrivateKey(t);
  return { scalar: n.hasEvenY() ? t : bn(-t), bytes: Ti(n) };
}
function Zc(e) {
  if (!Fc(e)) throw new Error('bad x: need 0 < x < p');
  const t = so(e * e),
    n = so(t * e + BigInt(7));
  let r = Wc(n);
  r % cr !== Cr && (r = so(-r));
  const o = new ki(e, r, Kc);
  return o.assertValidity(), o;
}
function Gc(...e) {
  return bn(ye(ur('BIP0340/challenge', ...e)));
}
function ty(e) {
  return Ho(e).bytes;
}
function ny(e, t, n = Lc(32)) {
  const r = ae('message', e),
    { bytes: o, scalar: i } = Ho(t),
    s = ae('auxRand', n, 32),
    a = Uo(i ^ ye(ur('BIP0340/aux', s))),
    c = ur('BIP0340/nonce', a, o, r),
    u = bn(ye(c));
  if (u === Cr) throw new Error('sign failed: k is zero');
  const { bytes: f, scalar: l } = Ho(u),
    h = Gc(f, o, r),
    y = new Uint8Array(64);
  if ((y.set(f, 0), y.set(Uo(bn(l + h * i)), 32), !Jc(y, r, o)))
    throw new Error('sign: Invalid signature produced');
  return y;
}
function Jc(e, t, n) {
  const r = ae('signature', e, 64),
    o = ae('message', t),
    i = ae('publicKey', n, 32);
  try {
    const s = Zc(ye(i)),
      a = ye(r.subarray(0, 32));
    if (!Fc(a)) return !1;
    const c = ye(r.subarray(32, 64));
    if (!Q0(c)) return !1;
    const u = Gc(Uo(a), Ti(s), o),
      f = ey(s, c, bn(-u));
    return !(!f || !f.hasEvenY() || f.toAffine().x !== a);
  } catch {
    return !1;
  }
}
const Oi = {
    getPublicKey: ty,
    sign: ny,
    verify: Jc,
    utils: {
      randomPrivateKey: Nr.utils.randomPrivateKey,
      lift_x: Zc,
      pointToBytes: Ti,
      numberToBytesBE: yt,
      bytesToNumberBE: ye,
      taggedHash: ur,
      mod: te,
    },
  },
  ry = G0(
    gt,
    [
      [
        '0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7',
        '0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581',
        '0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262',
        '0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c',
      ],
      [
        '0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b',
        '0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14',
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      ],
      [
        '0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c',
        '0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3',
        '0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931',
        '0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84',
      ],
      [
        '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b',
        '0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573',
        '0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f',
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      ],
    ].map((e) => e.map((t) => BigInt(t))),
  ),
  oy = z0(gt, {
    A: BigInt(
      '0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533',
    ),
    B: BigInt('1771'),
    Z: gt.create(BigInt('-11')),
  });
J0(
  Nr.ProjectivePoint,
  (e) => {
    const { x: t, y: n } = oy(gt.create(e[0]));
    return ry(t, n);
  },
  {
    DST: 'secp256k1_XMD:SHA-256_SSWU_RO_',
    encodeDST: 'secp256k1_XMD:SHA-256_SSWU_NU_',
    p: gt.ORDER,
    m: 1,
    k: 128,
    expand: 'xmd',
    hash: pn,
  },
);
/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function Zt(
  e,
) {
  if (!Number.isSafeInteger(e)) throw new Error(`Wrong integer: ${e}`);
}
function Je(...e) {
  const t = (o, i) => (s) => o(i(s)),
    n = Array.from(e)
      .reverse()
      .reduce((o, i) => (o ? t(o, i.encode) : i.encode), void 0),
    r = e.reduce((o, i) => (o ? t(o, i.decode) : i.decode), void 0);
  return { encode: n, decode: r };
}
function Ye(e) {
  return {
    encode: (t) => {
      if (!Array.isArray(t) || (t.length && typeof t[0] != 'number'))
        throw new Error('alphabet.encode input should be an array of numbers');
      return t.map((n) => {
        if ((Zt(n), n < 0 || n >= e.length))
          throw new Error(
            `Digit index outside alphabet: ${n} (alphabet: ${e.length})`,
          );
        return e[n];
      });
    },
    decode: (t) => {
      if (!Array.isArray(t) || (t.length && typeof t[0] != 'string'))
        throw new Error('alphabet.decode input should be array of strings');
      return t.map((n) => {
        if (typeof n != 'string')
          throw new Error(`alphabet.decode: not string element=${n}`);
        const r = e.indexOf(n);
        if (r === -1) throw new Error(`Unknown letter: "${n}". Allowed: ${e}`);
        return r;
      });
    },
  };
}
function Xe(e = '') {
  if (typeof e != 'string') throw new Error('join separator should be string');
  return {
    encode: (t) => {
      if (!Array.isArray(t) || (t.length && typeof t[0] != 'string'))
        throw new Error('join.encode input should be array of strings');
      for (let n of t)
        if (typeof n != 'string')
          throw new Error(`join.encode: non-string input=${n}`);
      return t.join(e);
    },
    decode: (t) => {
      if (typeof t != 'string')
        throw new Error('join.decode input should be string');
      return t.split(e);
    },
  };
}
function Pr(e, t = '=') {
  if ((Zt(e), typeof t != 'string'))
    throw new Error('padding chr should be string');
  return {
    encode(n) {
      if (!Array.isArray(n) || (n.length && typeof n[0] != 'string'))
        throw new Error('padding.encode input should be array of strings');
      for (let r of n)
        if (typeof r != 'string')
          throw new Error(`padding.encode: non-string input=${r}`);
      for (; (n.length * e) % 8; ) n.push(t);
      return n;
    },
    decode(n) {
      if (!Array.isArray(n) || (n.length && typeof n[0] != 'string'))
        throw new Error('padding.encode input should be array of strings');
      for (let o of n)
        if (typeof o != 'string')
          throw new Error(`padding.decode: non-string input=${o}`);
      let r = n.length;
      if ((r * e) % 8)
        throw new Error(
          'Invalid padding: string should have whole number of bytes',
        );
      for (; r > 0 && n[r - 1] === t; r--)
        if (!(((r - 1) * e) % 8))
          throw new Error('Invalid padding: string has too much padding');
      return n.slice(0, r);
    },
  };
}
function Yc(e) {
  if (typeof e != 'function')
    throw new Error('normalize fn should be function');
  return { encode: (t) => t, decode: (t) => e(t) };
}
function gs(e, t, n) {
  if (t < 2)
    throw new Error(
      `convertRadix: wrong from=${t}, base cannot be less than 2`,
    );
  if (n < 2)
    throw new Error(`convertRadix: wrong to=${n}, base cannot be less than 2`);
  if (!Array.isArray(e)) throw new Error('convertRadix: data should be array');
  if (!e.length) return [];
  let r = 0;
  const o = [],
    i = Array.from(e);
  for (
    i.forEach((s) => {
      if ((Zt(s), s < 0 || s >= t)) throw new Error(`Wrong integer: ${s}`);
    });
    ;

  ) {
    let s = 0,
      a = !0;
    for (let c = r; c < i.length; c++) {
      const u = i[c],
        f = t * s + u;
      if (!Number.isSafeInteger(f) || (t * s) / t !== s || f - u !== t * s)
        throw new Error('convertRadix: carry overflow');
      if (
        ((s = f % n),
        (i[c] = Math.floor(f / n)),
        !Number.isSafeInteger(i[c]) || i[c] * n + s !== f)
      )
        throw new Error('convertRadix: carry overflow');
      if (a) i[c] ? (a = !1) : (r = c);
      else continue;
    }
    if ((o.push(s), a)) break;
  }
  for (let s = 0; s < e.length - 1 && e[s] === 0; s++) o.push(0);
  return o.reverse();
}
const Xc = (e, t) => (t ? Xc(t, e % t) : e),
  lr = (e, t) => e + (t - Xc(e, t));
function Do(e, t, n, r) {
  if (!Array.isArray(e)) throw new Error('convertRadix2: data should be array');
  if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
  if (n <= 0 || n > 32) throw new Error(`convertRadix2: wrong to=${n}`);
  if (lr(t, n) > 32)
    throw new Error(
      `convertRadix2: carry overflow from=${t} to=${n} carryBits=${lr(t, n)}`,
    );
  let o = 0,
    i = 0;
  const s = 2 ** n - 1,
    a = [];
  for (const c of e) {
    if ((Zt(c), c >= 2 ** t))
      throw new Error(`convertRadix2: invalid data word=${c} from=${t}`);
    if (((o = (o << t) | c), i + t > 32))
      throw new Error(`convertRadix2: carry overflow pos=${i} from=${t}`);
    for (i += t; i >= n; i -= n) a.push(((o >> (i - n)) & s) >>> 0);
    o &= 2 ** i - 1;
  }
  if (((o = (o << (n - i)) & s), !r && i >= t))
    throw new Error('Excess padding');
  if (!r && o) throw new Error(`Non-zero padding: ${o}`);
  return r && i > 0 && a.push(o >>> 0), a;
}
function iy(e) {
  return (
    Zt(e),
    {
      encode: (t) => {
        if (!(t instanceof Uint8Array))
          throw new Error('radix.encode input should be Uint8Array');
        return gs(Array.from(t), 2 ** 8, e);
      },
      decode: (t) => {
        if (!Array.isArray(t) || (t.length && typeof t[0] != 'number'))
          throw new Error('radix.decode input should be array of strings');
        return Uint8Array.from(gs(t, e, 2 ** 8));
      },
    }
  );
}
function Et(e, t = !1) {
  if ((Zt(e), e <= 0 || e > 32))
    throw new Error('radix2: bits should be in (0..32]');
  if (lr(8, e) > 32 || lr(e, 8) > 32) throw new Error('radix2: carry overflow');
  return {
    encode: (n) => {
      if (!(n instanceof Uint8Array))
        throw new Error('radix2.encode input should be Uint8Array');
      return Do(Array.from(n), 8, e, !t);
    },
    decode: (n) => {
      if (!Array.isArray(n) || (n.length && typeof n[0] != 'number'))
        throw new Error('radix2.decode input should be array of strings');
      return Uint8Array.from(Do(n, e, 8, t));
    },
  };
}
function ws(e) {
  if (typeof e != 'function')
    throw new Error('unsafeWrapper fn should be function');
  return function (...t) {
    try {
      return e.apply(null, t);
    } catch {}
  };
}
const sy = Je(Et(4), Ye('0123456789ABCDEF'), Xe('')),
  ay = Je(Et(5), Ye('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), Pr(5), Xe(''));
Je(Et(5), Ye('0123456789ABCDEFGHIJKLMNOPQRSTUV'), Pr(5), Xe(''));
Je(
  Et(5),
  Ye('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
  Xe(''),
  Yc((e) => e.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1')),
);
const cy = Je(
    Et(6),
    Ye('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
    Pr(6),
    Xe(''),
  ),
  uy = Je(
    Et(6),
    Ye('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
    Pr(6),
    Xe(''),
  ),
  Bi = (e) => Je(iy(58), Ye(e), Xe('')),
  jo = Bi('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
Bi('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ');
Bi('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz');
const vs = [0, 2, 3, 5, 6, 7, 9, 10, 11],
  ly = {
    encode(e) {
      let t = '';
      for (let n = 0; n < e.length; n += 8) {
        const r = e.subarray(n, n + 8);
        t += jo.encode(r).padStart(vs[r.length], '1');
      }
      return t;
    },
    decode(e) {
      let t = [];
      for (let n = 0; n < e.length; n += 11) {
        const r = e.slice(n, n + 11),
          o = vs.indexOf(r.length),
          i = jo.decode(r);
        for (let s = 0; s < i.length - o; s++)
          if (i[s] !== 0) throw new Error('base58xmr: wrong padding');
        t = t.concat(Array.from(i.slice(i.length - o)));
      }
      return Uint8Array.from(t);
    },
  },
  $o = Je(Ye('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), Xe('')),
  Es = [996825010, 642813549, 513874426, 1027748829, 705979059];
function Qt(e) {
  const t = e >> 25;
  let n = (e & 33554431) << 5;
  for (let r = 0; r < Es.length; r++) ((t >> r) & 1) === 1 && (n ^= Es[r]);
  return n;
}
function xs(e, t, n = 1) {
  const r = e.length;
  let o = 1;
  for (let i = 0; i < r; i++) {
    const s = e.charCodeAt(i);
    if (s < 33 || s > 126) throw new Error(`Invalid prefix (${e})`);
    o = Qt(o) ^ (s >> 5);
  }
  o = Qt(o);
  for (let i = 0; i < r; i++) o = Qt(o) ^ (e.charCodeAt(i) & 31);
  for (let i of t) o = Qt(o) ^ i;
  for (let i = 0; i < 6; i++) o = Qt(o);
  return (o ^= n), $o.encode(Do([o % 2 ** 30], 30, 5, !1));
}
function Qc(e) {
  const t = e === 'bech32' ? 1 : 734539939,
    n = Et(5),
    r = n.decode,
    o = n.encode,
    i = ws(r);
  function s(f, l, h = 90) {
    if (typeof f != 'string')
      throw new Error(`bech32.encode prefix should be string, not ${typeof f}`);
    if (!Array.isArray(l) || (l.length && typeof l[0] != 'number'))
      throw new Error(
        `bech32.encode words should be array of numbers, not ${typeof l}`,
      );
    const y = f.length + 7 + l.length;
    if (h !== !1 && y > h)
      throw new TypeError(`Length ${y} exceeds limit ${h}`);
    return (f = f.toLowerCase()), `${f}1${$o.encode(l)}${xs(f, l, t)}`;
  }
  function a(f, l = 90) {
    if (typeof f != 'string')
      throw new Error(`bech32.decode input should be string, not ${typeof f}`);
    if (f.length < 8 || (l !== !1 && f.length > l))
      throw new TypeError(
        `Wrong string length: ${f.length} (${f}). Expected (8..${l})`,
      );
    const h = f.toLowerCase();
    if (f !== h && f !== f.toUpperCase())
      throw new Error('String must be lowercase or uppercase');
    f = h;
    const y = f.lastIndexOf('1');
    if (y === 0 || y === -1)
      throw new Error(
        'Letter "1" must be present between prefix and data only',
      );
    const p = f.slice(0, y),
      d = f.slice(y + 1);
    if (d.length < 6)
      throw new Error('Data must be at least 6 characters long');
    const m = $o.decode(d).slice(0, -6),
      b = xs(p, m, t);
    if (!d.endsWith(b))
      throw new Error(`Invalid checksum in ${f}: expected "${b}"`);
    return { prefix: p, words: m };
  }
  const c = ws(a);
  function u(f) {
    const { prefix: l, words: h } = a(f, !1);
    return { prefix: l, words: h, bytes: r(h) };
  }
  return {
    encode: s,
    decode: a,
    decodeToBytes: u,
    decodeUnsafe: c,
    fromWords: r,
    fromWordsUnsafe: i,
    toWords: o,
  };
}
const Ss = Qc('bech32');
Qc('bech32m');
const fy = {
    encode: (e) => new TextDecoder().decode(e),
    decode: (e) => new TextEncoder().encode(e),
  },
  dy = Je(
    Et(4),
    Ye('0123456789abcdef'),
    Xe(''),
    Yc((e) => {
      if (typeof e != 'string' || e.length % 2)
        throw new TypeError(
          `hex.decode: expected string, got ${typeof e} with length ${
            e.length
          }`,
        );
      return e.toLowerCase();
    }),
  ),
  hy = {
    utf8: fy,
    hex: dy,
    base16: sy,
    base32: ay,
    base64: cy,
    base64url: uy,
    base58: jo,
    base58xmr: ly,
  };
`${Object.keys(hy).join(', ')}`;
function As(e) {
  const { words: t } = Ss.decode(e),
    n = new Uint8Array(Ss.fromWords(t));
  return kr(n);
}
const py = new TextEncoder();
function yy(e) {
  return kr(Oi.getPublicKey(e));
}
function by(e, t) {
  const n = t != null && t.startsWith('nsec1') ? As(t) : t,
    r = e.pubkey
      ? e.pubkey.startsWith('npub1')
        ? As(e.pubkey)
        : e.pubkey
      : yy(n),
    o = {
      ...e,
      tags: e.tags ?? [],
      pubkey: r,
      created_at: e.created_at ?? tu(),
    },
    i = o.id ?? eu(o),
    s = o.sig ?? gy(i, n);
  return { ...o, id: i, sig: s };
}
async function my(e) {
  var t;
  const n = (t = window ?? {}) == null ? void 0 : t.nostr;
  if (!n) throw new Error('NIP-07 interface is not ready.');
  return n.signEvent({
    kind: e.kind,
    tags: e.tags ?? [],
    content: e.content,
    created_at: e.created_at ?? tu(),
  });
}
function eu(e) {
  const t = JSON.stringify([
    0,
    e.pubkey,
    e.created_at,
    e.kind,
    e.tags,
    e.content,
  ]);
  return kr(pn(py.encode(t)));
}
function gy(e, t) {
  return kr(Oi.sign(e, t));
}
function wy(e) {
  try {
    return Oi.verify(e.sig, eu(e), e.pubkey);
  } catch (t) {
    return console.warn('The following error occurred during verify():', t), !1;
  }
}
function tu() {
  return Math.floor(new Date().getTime() / 1e3);
}
function _m(e) {
  return jp(({ event: t }) => t.id, e);
}
function Tm() {
  return cc(
    Zp((e, t) => (e.event.created_at < t.event.created_at ? t : e)),
    $p(
      (e, t) => e === t,
      ({ event: e }) => e.id,
    ),
  );
}
function km() {
  return hn(({ event: e }) => wy(e));
}
function Om(e) {
  return hn(({ event: t }) => t.kind === e);
}
function vy(e) {
  return cc(
    Rp(e),
    wi((t) => {
      if (t instanceof Ic) return or;
      throw t;
    }),
  );
}
function Ey(e) {
  return (t) =>
    Object.fromEntries(
      Object.keys(e).map((n) => [n, (t == null ? void 0 : t[n]) ?? e[n]]),
    );
}
function xy() {
  const e = new je();
  return [
    e.pipe(
      Mn({
        next() {
          e.complete();
        },
      }),
    ),
    () => e.next(1),
  ];
}
var _s;
((e) => {
  ((t) => {
    (t[(t.Metadata = 0)] = 'Metadata'),
      (t[(t.Text = 1)] = 'Text'),
      (t[(t.RecommendRelay = 2)] = 'RecommendRelay'),
      (t[(t.Contacts = 3)] = 'Contacts'),
      (t[(t.EncryptedDirectMessage = 4)] = 'EncryptedDirectMessage'),
      (t[(t.EventDeletion = 5)] = 'EventDeletion'),
      (t[(t.Repost = 6)] = 'Repost'),
      (t[(t.Reaction = 7)] = 'Reaction'),
      (t[(t.BadgeAward = 8)] = 'BadgeAward'),
      (t[(t.ChannelCreation = 40)] = 'ChannelCreation'),
      (t[(t.ChannelMetadata = 41)] = 'ChannelMetadata'),
      (t[(t.ChannelMessage = 42)] = 'ChannelMessage'),
      (t[(t.ChannelHideMessage = 43)] = 'ChannelHideMessage'),
      (t[(t.ChannelMuteUser = 44)] = 'ChannelMuteUser'),
      (t[(t.Blank = 255)] = 'Blank'),
      (t[(t.Report = 1984)] = 'Report'),
      (t[(t.ZapRequest = 9734)] = 'ZapRequest'),
      (t[(t.Zap = 9735)] = 'Zap'),
      (t[(t.RelayList = 10002)] = 'RelayList'),
      (t[(t.Auth = 22242)] = 'Auth'),
      (t[(t.BadgeDefinition = 30008)] = 'BadgeDefinition'),
      (t[(t.ProfileBadge = 30009)] = 'ProfileBadge'),
      (t[(t.Article = 30023)] = 'Article');
  })(e.Kind || (e.Kind = {}));
})(_s || (_s = {}));
class Sy {
  constructor(t) {
    ct(this, 'filters$', new dp(null)),
      ct(this, '_rxReqId'),
      (this._rxReqId = t ?? Ty());
  }
  get rxReqId() {
    return this._rxReqId;
  }
  getReqObservable() {
    return this.filters$.asObservable();
  }
  emit(t) {
    const n = Oy(t);
    n ? this.filters$.next(n) : this.filters$.next(null);
  }
  pipe(...t) {
    const n = this.rxReqId,
      r = this.strategy;
    return {
      ...this,
      get rxReqId() {
        return n;
      },
      get strategy() {
        return r;
      },
      getReqObservable: () => this.getReqObservable().pipe(...t),
    };
  }
}
function Ay(e) {
  return new _y(e);
}
class _y extends Sy {
  constructor(t) {
    super(t == null ? void 0 : t.subId), this.emit(t.filters);
  }
  get strategy() {
    return 'oneshot';
  }
}
function Ty() {
  return `${Math.floor(Math.random() * 1e6)}`;
}
function ky(e) {
  const t = {};
  for (const [n, r] of Object.entries(e)) {
    if ((n === 'since' || n === 'until' || n === 'limit') && (r ?? -1) >= 0) {
      t[n] = r;
      continue;
    }
    if (
      ((n.startsWith('#') && n.length === 2) ||
        n === 'ids' ||
        n === 'kinds' ||
        n === 'authors') &&
      r &&
      r.length > 0
    ) {
      t[n] = r;
      continue;
    }
  }
  return !(!t.since || !t.until || t.since <= t.until) ||
    Object.keys(t).length <= 0
    ? null
    : t;
}
function Oy(e) {
  if (!e) return null;
  const t = e.flatMap((n) => ky(n) ?? []);
  return t.length > 0 ? t : null;
}
function By(e) {
  return new Ny(e);
}
const Iy = Ey({ rxNostrId: void 0, retry: 10, timeout: 1e4 });
let Ry = 0;
class Ny {
  constructor(t) {
    ct(this, 'options'),
      ct(this, 'relays', {}),
      ct(this, 'activeReqs', {}),
      ct(this, 'message$', new je()),
      ct(this, 'error$', new je()),
      ct(this, 'status$', new je());
    const n = Iy(t);
    this.options = { ...n, rxNostrId: n.rxNostrId ?? `rx-nostr${Ry++}` };
  }
  getRelays() {
    return Object.values(this.relays).map(({ url: t, read: n, write: r }) => ({
      url: t,
      read: n,
      write: r,
    }));
  }
  createWebsocket(t) {
    const n = t0(t);
    let r = 'not-started';
    const o = (a) => {
        r !== a && ((r = a), this.status$.next({ from: t, state: r }));
      },
      i = n.pipe(
        Mn({
          subscribe: () => {
            o(r === 'not-started' ? 'starting' : 'reconnecting');
          },
          next: () => {
            o('ongoing');
          },
          complete: () => {
            o('terminated');
          },
        }),
        Fp(this.options.retry),
        wi(
          (a) => (
            this.relays[t].activeSubIds.clear(),
            this.error$.next({ from: t, reason: a }),
            o('error'),
            or
          ),
        ),
      ),
      s = () => {
        i.subscribe((a) => {
          this.message$.next({ from: t, message: a });
        });
      };
    return {
      send: (a) => {
        n.next(a);
      },
      ensure: () => {
        r === 'not-started' && o('not-started'),
          (r === 'not-started' || r === 'error') && s();
      },
      close: () => {
        n.complete();
      },
      reconnect: () => {
        if (r === 'error') s();
        else throw new Error("reconnect() can be called only in 'error' state");
      },
      getState: () => r,
    };
  }
  setRelays(t) {
    const n = this.createWebsocket.bind(this),
      r = c(this.relays, t),
      o = this.getReadableUrls(),
      i = this.getReadableUrls(Object.values(r)),
      s = f(o, i);
    for (const l of s) this.finalizeReq({ url: l });
    const a = f(i, o);
    for (const l of Object.values(this.activeReqs))
      this.ensureReq(l, { relays: a.map((h) => r[h]) });
    this.relays = r;
    for (const l of Object.values(r)) l.websocket.ensure();
    function c(l, h) {
      const y = {};
      for (const p of Array.isArray(h)
        ? h.map(u)
        : Object.entries(h).map(([d, m]) => ({ url: d, ...m }))) {
        const d = p.url,
          m = l[d],
          b = (m == null ? void 0 : m.websocket) ?? n(d),
          g = (m == null ? void 0 : m.activeSubIds) ?? new Set();
        y[p.url] = { ...p, websocket: b, activeSubIds: g };
      }
      return y;
    }
    function u(l) {
      const h = typeof l == 'string' ? { url: l, read: !0, write: !0 } : l;
      return (h.url = Qh(h.url, { normalizeProtocol: !1 })), h;
    }
    function f(l, h) {
      return l.filter((y) => !h.includes(y));
    }
  }
  addRelay(t) {
    this.setRelays([...this.getRelays(), t]);
  }
  removeRelay(t) {
    const n = this.getRelays(),
      r = n.filter((o) => o.url !== t);
    n.length !== r.length && this.setRelays(r);
  }
  hasRelay(t) {
    return this.getRelays().some((n) => n.url === t);
  }
  getAllRelayState() {
    return Object.fromEntries(
      Object.values(this.relays).map((t) => [t.url, this.getRelayState(t.url)]),
    );
  }
  getRelayState(t) {
    var n;
    const r = this.relays[t];
    if (!r) throw new Error('Relay not found');
    return ((n = r.websocket) == null ? void 0 : n.getState()) ?? 'not-started';
  }
  reconnect(t) {
    var n;
    return (n = this.relays[t].websocket) == null ? void 0 : n.reconnect();
  }
  use(t) {
    const n = this.options.timeout,
      r = t.strategy,
      o = this.options.rxNostrId,
      i = t.rxReqId,
      s = this.ensureReq.bind(this),
      a = this.finalizeReq.bind(this),
      c = (b) => {
        const g = b[1];
        this.activeReqs[g] = b;
      },
      u = (b) => {
        delete this.activeReqs[b];
      },
      f = () => this.getReadableUrls().length,
      l = (b) => {
        const g = f(),
          [w, E] = xy();
        return [
          this.message$.pipe(
            p(b),
            d(),
            r === 'oneshot' ? No(g) : Yp(w),
            ir((S) => {
              const v = S.key;
              return y({
                message$: S,
                completeOnEose: r !== 'forward',
                url: v,
                subId: b,
              }).pipe(
                r !== 'forward' ? vy(n) : Ce,
                r !== 'forward'
                  ? to(() => {
                      a({ subId: b, url: v });
                    })
                  : Ce,
              );
            }),
          ),
          E,
        ];
      },
      h = t.getReqObservable().pipe(
        hn((b) => b !== null),
        m(),
        Mn({
          next: (b) => {
            r === 'forward' && c(b), s(b, { overwrite: r === 'forward' });
          },
          finalize: () => {
            r === 'forward' && u(ao({ rxNostrId: o, rxReqId: i }));
          },
        }),
        r === 'oneshot' ? Vp() : Ce,
        rn(([, b]) => l(b)),
      );
    return Lp(ls(null), h).pipe(
      Wp(),
      Mn(([b]) => {
        b !== null && b[1]();
      }),
      rn(([, b]) => b[0]),
      r === 'forward' ? Jp() : Rc(),
      r === 'forward'
        ? to(() => {
            a({ subId: ao({ rxNostrId: o, rxReqId: i }) });
          })
        : Ce,
    );
    function y(b) {
      const { url: g, subId: w, message$: E, completeOnEose: S } = b;
      return new ce((v) => {
        const A = E.subscribe({
          next: ({ message: k }) => {
            const R = k[0];
            R === 'EVENT'
              ? v.next({ from: g, subId: w, event: k[2] })
              : R === 'EOSE' && S && v.complete();
          },
          complete: () => {
            v.complete();
          },
          error: (k) => {
            v.error(k);
          },
        });
        return () => {
          A.unsubscribe();
        };
      });
    }
    function p(b) {
      return hn(
        (g) =>
          (g.message[0] === 'EVENT' || g.message[0] === 'EOSE') &&
          g.message[1] === b,
      );
    }
    function d() {
      return Kp(({ from: b }) => b);
    }
    function m() {
      const b = (g) => ao({ rxNostrId: o, rxReqId: i, index: g });
      switch (r) {
        case 'backward':
          return rn((g, w) => ['REQ', b(w), ...g]);
        case 'forward':
        case 'oneshot':
          return rn((g) => ['REQ', b(), ...g]);
      }
    }
  }
  createAllEventObservable() {
    return this.message$
      .asObservable()
      .pipe(
        ir(({ from: t, message: n }) =>
          n[0] === 'EVENT' ? ls({ from: t, subId: n[1], event: n[2] }) : or,
        ),
      );
  }
  createAllErrorObservable() {
    return this.error$.asObservable();
  }
  createAllMessageObservable() {
    return this.message$.asObservable();
  }
  createConnectionStateObservable() {
    return this.status$.asObservable();
  }
  send(t, n) {
    const r = this.getWritableUrls(),
      o = new qn(r.length);
    let i = null;
    return (
      (n ? Promise.resolve(by(t, n)) : my(t)).then((s) => {
        o.closed ||
          (i = this.createAllMessageObservable().subscribe(
            ({ from: a, message: c }) => {
              c[0] === 'OK' && o.next({ from: a, id: s.id });
            },
          ));
        for (const a of r) this.relays[a].websocket.send(['EVENT', s]);
      }),
      o.pipe(
        No(r.length),
        to(() => {
          o.complete(), o.unsubscribe(), i == null || i.unsubscribe();
        }),
      )
    );
  }
  dispose() {
    this.message$.complete(), this.error$.complete();
    for (const t of Object.values(this.relays)) t.websocket.close();
  }
  ensureReq(t, n) {
    const r = t[1];
    for (const o of (n == null ? void 0 : n.relays) ??
      Object.values(this.relays))
      !o.read ||
        (!(n != null && n.overwrite) && o.activeSubIds.has(r)) ||
        (o.websocket.send(t), o.activeSubIds.add(r));
  }
  finalizeReq(t) {
    const { subId: n, url: r } = t;
    if (n === void 0 && r === void 0) throw new Error();
    const o = r ? [this.relays[r]] : Object.values(this.relays);
    for (const i of o) {
      const s = n ? [n] : Array.from(i.activeSubIds);
      for (const a of s)
        i.activeSubIds.has(a) && i.websocket.send(['CLOSE', a]),
          i.activeSubIds.delete(a);
    }
  }
  getReadableUrls(t) {
    return (t ?? Object.values(this.relays))
      .filter((n) => n.read)
      .map((n) => n.url);
  }
  getWritableUrls(t) {
    return (t ?? Object.values(this.relays))
      .filter((n) => n.write)
      .map((n) => n.url);
  }
}
function ao(e) {
  return `${e.rxNostrId}:${e.rxReqId}:${e.index ?? 0}`;
}
var Ts = 'html',
  ks = 'head',
  Pn = 'body',
  Cy = /<([a-zA-Z]+[0-9]?)/,
  Os = /<head[^]*>/i,
  Bs = /<body[^]*>/i,
  fr = function () {
    throw new Error(
      'This browser does not support `document.implementation.createHTMLDocument`',
    );
  },
  qo = function () {
    throw new Error(
      'This browser does not support `DOMParser.prototype.parseFromString`',
    );
  },
  Is = typeof window == 'object' && window.DOMParser;
if (typeof Is == 'function') {
  var Py = new Is(),
    Ly = 'text/html';
  (qo = function (e, t) {
    return (
      t && (e = '<' + t + '>' + e + '</' + t + '>'), Py.parseFromString(e, Ly)
    );
  }),
    (fr = qo);
}
if (typeof document == 'object' && document.implementation) {
  var Ln = document.implementation.createHTMLDocument();
  fr = function (e, t) {
    if (t) {
      var n = Ln.documentElement.querySelector(t);
      return (n.innerHTML = e), Ln;
    }
    return (Ln.documentElement.innerHTML = e), Ln;
  };
}
var co = typeof document == 'object' ? document.createElement('template') : {},
  Mo;
co.content &&
  (Mo = function (e) {
    return (co.innerHTML = e), co.content.childNodes;
  });
function Uy(e) {
  var t,
    n = e.match(Cy);
  n && n[1] && (t = n[1].toLowerCase());
  var r, o, i;
  switch (t) {
    case Ts:
      return (
        (r = qo(e)),
        Os.test(e) ||
          ((o = r.querySelector(ks)), o && o.parentNode.removeChild(o)),
        Bs.test(e) ||
          ((o = r.querySelector(Pn)), o && o.parentNode.removeChild(o)),
        r.querySelectorAll(Ts)
      );
    case ks:
    case Pn:
      return (
        (r = fr(e)),
        (i = r.querySelectorAll(t)),
        Bs.test(e) && Os.test(e) ? i[0].parentNode.childNodes : i
      );
    default:
      return Mo ? Mo(e) : ((o = fr(e, Pn).querySelector(Pn)), o.childNodes);
  }
}
var Hy = Uy;
const Dy = kf(Hy);
var Ii = {},
  nu = {},
  Ri = {};
(function (e) {
  Object.defineProperty(e, '__esModule', { value: !0 }),
    (e.Doctype =
      e.CDATA =
      e.Tag =
      e.Style =
      e.Script =
      e.Comment =
      e.Directive =
      e.Text =
      e.Root =
      e.isTag =
      e.ElementType =
        void 0);
  var t;
  (function (r) {
    (r.Root = 'root'),
      (r.Text = 'text'),
      (r.Directive = 'directive'),
      (r.Comment = 'comment'),
      (r.Script = 'script'),
      (r.Style = 'style'),
      (r.Tag = 'tag'),
      (r.CDATA = 'cdata'),
      (r.Doctype = 'doctype');
  })((t = e.ElementType || (e.ElementType = {})));
  function n(r) {
    return r.type === t.Tag || r.type === t.Script || r.type === t.Style;
  }
  (e.isTag = n),
    (e.Root = t.Root),
    (e.Text = t.Text),
    (e.Directive = t.Directive),
    (e.Comment = t.Comment),
    (e.Script = t.Script),
    (e.Style = t.Style),
    (e.Tag = t.Tag),
    (e.CDATA = t.CDATA),
    (e.Doctype = t.Doctype);
})(Ri);
var H = {},
  xt =
    (ht && ht.__extends) ||
    (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (r, o) {
                r.__proto__ = o;
              }) ||
            function (r, o) {
              for (var i in o)
                Object.prototype.hasOwnProperty.call(o, i) && (r[i] = o[i]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if (typeof n != 'function' && n !== null)
          throw new TypeError(
            'Class extends value ' +
              String(n) +
              ' is not a constructor or null',
          );
        e(t, n);
        function r() {
          this.constructor = t;
        }
        t.prototype =
          n === null
            ? Object.create(n)
            : ((r.prototype = n.prototype), new r());
      };
    })(),
  on =
    (ht && ht.__assign) ||
    function () {
      return (
        (on =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var o in t)
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            }
            return e;
          }),
        on.apply(this, arguments)
      );
    };
Object.defineProperty(H, '__esModule', { value: !0 });
H.cloneNode =
  H.hasChildren =
  H.isDocument =
  H.isDirective =
  H.isComment =
  H.isText =
  H.isCDATA =
  H.isTag =
  H.Element =
  H.Document =
  H.CDATA =
  H.NodeWithChildren =
  H.ProcessingInstruction =
  H.Comment =
  H.Text =
  H.DataNode =
  H.Node =
    void 0;
var ge = Ri,
  Ni = (function () {
    function e() {
      (this.parent = null),
        (this.prev = null),
        (this.next = null),
        (this.startIndex = null),
        (this.endIndex = null);
    }
    return (
      Object.defineProperty(e.prototype, 'parentNode', {
        get: function () {
          return this.parent;
        },
        set: function (t) {
          this.parent = t;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'previousSibling', {
        get: function () {
          return this.prev;
        },
        set: function (t) {
          this.prev = t;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'nextSibling', {
        get: function () {
          return this.next;
        },
        set: function (t) {
          this.next = t;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.cloneNode = function (t) {
        return t === void 0 && (t = !1), Ci(this, t);
      }),
      e
    );
  })();
H.Node = Ni;
var Lr = (function (e) {
  xt(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return (r.data = n), r;
  }
  return (
    Object.defineProperty(t.prototype, 'nodeValue', {
      get: function () {
        return this.data;
      },
      set: function (n) {
        this.data = n;
      },
      enumerable: !1,
      configurable: !0,
    }),
    t
  );
})(Ni);
H.DataNode = Lr;
var ru = (function (e) {
  xt(t, e);
  function t() {
    var n = (e !== null && e.apply(this, arguments)) || this;
    return (n.type = ge.ElementType.Text), n;
  }
  return (
    Object.defineProperty(t.prototype, 'nodeType', {
      get: function () {
        return 3;
      },
      enumerable: !1,
      configurable: !0,
    }),
    t
  );
})(Lr);
H.Text = ru;
var ou = (function (e) {
  xt(t, e);
  function t() {
    var n = (e !== null && e.apply(this, arguments)) || this;
    return (n.type = ge.ElementType.Comment), n;
  }
  return (
    Object.defineProperty(t.prototype, 'nodeType', {
      get: function () {
        return 8;
      },
      enumerable: !1,
      configurable: !0,
    }),
    t
  );
})(Lr);
H.Comment = ou;
var iu = (function (e) {
  xt(t, e);
  function t(n, r) {
    var o = e.call(this, r) || this;
    return (o.name = n), (o.type = ge.ElementType.Directive), o;
  }
  return (
    Object.defineProperty(t.prototype, 'nodeType', {
      get: function () {
        return 1;
      },
      enumerable: !1,
      configurable: !0,
    }),
    t
  );
})(Lr);
H.ProcessingInstruction = iu;
var Ur = (function (e) {
  xt(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return (r.children = n), r;
  }
  return (
    Object.defineProperty(t.prototype, 'firstChild', {
      get: function () {
        var n;
        return (n = this.children[0]) !== null && n !== void 0 ? n : null;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, 'lastChild', {
      get: function () {
        return this.children.length > 0
          ? this.children[this.children.length - 1]
          : null;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, 'childNodes', {
      get: function () {
        return this.children;
      },
      set: function (n) {
        this.children = n;
      },
      enumerable: !1,
      configurable: !0,
    }),
    t
  );
})(Ni);
H.NodeWithChildren = Ur;
var su = (function (e) {
  xt(t, e);
  function t() {
    var n = (e !== null && e.apply(this, arguments)) || this;
    return (n.type = ge.ElementType.CDATA), n;
  }
  return (
    Object.defineProperty(t.prototype, 'nodeType', {
      get: function () {
        return 4;
      },
      enumerable: !1,
      configurable: !0,
    }),
    t
  );
})(Ur);
H.CDATA = su;
var au = (function (e) {
  xt(t, e);
  function t() {
    var n = (e !== null && e.apply(this, arguments)) || this;
    return (n.type = ge.ElementType.Root), n;
  }
  return (
    Object.defineProperty(t.prototype, 'nodeType', {
      get: function () {
        return 9;
      },
      enumerable: !1,
      configurable: !0,
    }),
    t
  );
})(Ur);
H.Document = au;
var cu = (function (e) {
  xt(t, e);
  function t(n, r, o, i) {
    o === void 0 && (o = []),
      i === void 0 &&
        (i =
          n === 'script'
            ? ge.ElementType.Script
            : n === 'style'
            ? ge.ElementType.Style
            : ge.ElementType.Tag);
    var s = e.call(this, o) || this;
    return (s.name = n), (s.attribs = r), (s.type = i), s;
  }
  return (
    Object.defineProperty(t.prototype, 'nodeType', {
      get: function () {
        return 1;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, 'tagName', {
      get: function () {
        return this.name;
      },
      set: function (n) {
        this.name = n;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, 'attributes', {
      get: function () {
        var n = this;
        return Object.keys(this.attribs).map(function (r) {
          var o, i;
          return {
            name: r,
            value: n.attribs[r],
            namespace:
              (o = n['x-attribsNamespace']) === null || o === void 0
                ? void 0
                : o[r],
            prefix:
              (i = n['x-attribsPrefix']) === null || i === void 0
                ? void 0
                : i[r],
          };
        });
      },
      enumerable: !1,
      configurable: !0,
    }),
    t
  );
})(Ur);
H.Element = cu;
function uu(e) {
  return (0, ge.isTag)(e);
}
H.isTag = uu;
function lu(e) {
  return e.type === ge.ElementType.CDATA;
}
H.isCDATA = lu;
function fu(e) {
  return e.type === ge.ElementType.Text;
}
H.isText = fu;
function du(e) {
  return e.type === ge.ElementType.Comment;
}
H.isComment = du;
function hu(e) {
  return e.type === ge.ElementType.Directive;
}
H.isDirective = hu;
function pu(e) {
  return e.type === ge.ElementType.Root;
}
H.isDocument = pu;
function jy(e) {
  return Object.prototype.hasOwnProperty.call(e, 'children');
}
H.hasChildren = jy;
function Ci(e, t) {
  t === void 0 && (t = !1);
  var n;
  if (fu(e)) n = new ru(e.data);
  else if (du(e)) n = new ou(e.data);
  else if (uu(e)) {
    var r = t ? uo(e.children) : [],
      o = new cu(e.name, on({}, e.attribs), r);
    r.forEach(function (c) {
      return (c.parent = o);
    }),
      e.namespace != null && (o.namespace = e.namespace),
      e['x-attribsNamespace'] &&
        (o['x-attribsNamespace'] = on({}, e['x-attribsNamespace'])),
      e['x-attribsPrefix'] &&
        (o['x-attribsPrefix'] = on({}, e['x-attribsPrefix'])),
      (n = o);
  } else if (lu(e)) {
    var r = t ? uo(e.children) : [],
      i = new su(r);
    r.forEach(function (u) {
      return (u.parent = i);
    }),
      (n = i);
  } else if (pu(e)) {
    var r = t ? uo(e.children) : [],
      s = new au(r);
    r.forEach(function (u) {
      return (u.parent = s);
    }),
      e['x-mode'] && (s['x-mode'] = e['x-mode']),
      (n = s);
  } else if (hu(e)) {
    var a = new iu(e.name, e.data);
    e['x-name'] != null &&
      ((a['x-name'] = e['x-name']),
      (a['x-publicId'] = e['x-publicId']),
      (a['x-systemId'] = e['x-systemId'])),
      (n = a);
  } else throw new Error('Not implemented yet: '.concat(e.type));
  return (
    (n.startIndex = e.startIndex),
    (n.endIndex = e.endIndex),
    e.sourceCodeLocation != null &&
      (n.sourceCodeLocation = e.sourceCodeLocation),
    n
  );
}
H.cloneNode = Ci;
function uo(e) {
  for (
    var t = e.map(function (r) {
        return Ci(r, !0);
      }),
      n = 1;
    n < t.length;
    n++
  )
    (t[n].prev = t[n - 1]), (t[n - 1].next = t[n]);
  return t;
}
(function (e) {
  var t =
      (ht && ht.__createBinding) ||
      (Object.create
        ? function (a, c, u, f) {
            f === void 0 && (f = u);
            var l = Object.getOwnPropertyDescriptor(c, u);
            (!l ||
              ('get' in l ? !c.__esModule : l.writable || l.configurable)) &&
              (l = {
                enumerable: !0,
                get: function () {
                  return c[u];
                },
              }),
              Object.defineProperty(a, f, l);
          }
        : function (a, c, u, f) {
            f === void 0 && (f = u), (a[f] = c[u]);
          }),
    n =
      (ht && ht.__exportStar) ||
      function (a, c) {
        for (var u in a)
          u !== 'default' &&
            !Object.prototype.hasOwnProperty.call(c, u) &&
            t(c, a, u);
      };
  Object.defineProperty(e, '__esModule', { value: !0 }),
    (e.DomHandler = void 0);
  var r = Ri,
    o = H;
  n(H, e);
  var i = { withStartIndices: !1, withEndIndices: !1, xmlMode: !1 },
    s = (function () {
      function a(c, u, f) {
        (this.dom = []),
          (this.root = new o.Document(this.dom)),
          (this.done = !1),
          (this.tagStack = [this.root]),
          (this.lastNode = null),
          (this.parser = null),
          typeof u == 'function' && ((f = u), (u = i)),
          typeof c == 'object' && ((u = c), (c = void 0)),
          (this.callback = c ?? null),
          (this.options = u ?? i),
          (this.elementCB = f ?? null);
      }
      return (
        (a.prototype.onparserinit = function (c) {
          this.parser = c;
        }),
        (a.prototype.onreset = function () {
          (this.dom = []),
            (this.root = new o.Document(this.dom)),
            (this.done = !1),
            (this.tagStack = [this.root]),
            (this.lastNode = null),
            (this.parser = null);
        }),
        (a.prototype.onend = function () {
          this.done ||
            ((this.done = !0), (this.parser = null), this.handleCallback(null));
        }),
        (a.prototype.onerror = function (c) {
          this.handleCallback(c);
        }),
        (a.prototype.onclosetag = function () {
          this.lastNode = null;
          var c = this.tagStack.pop();
          this.options.withEndIndices && (c.endIndex = this.parser.endIndex),
            this.elementCB && this.elementCB(c);
        }),
        (a.prototype.onopentag = function (c, u) {
          var f = this.options.xmlMode ? r.ElementType.Tag : void 0,
            l = new o.Element(c, u, void 0, f);
          this.addNode(l), this.tagStack.push(l);
        }),
        (a.prototype.ontext = function (c) {
          var u = this.lastNode;
          if (u && u.type === r.ElementType.Text)
            (u.data += c),
              this.options.withEndIndices &&
                (u.endIndex = this.parser.endIndex);
          else {
            var f = new o.Text(c);
            this.addNode(f), (this.lastNode = f);
          }
        }),
        (a.prototype.oncomment = function (c) {
          if (this.lastNode && this.lastNode.type === r.ElementType.Comment) {
            this.lastNode.data += c;
            return;
          }
          var u = new o.Comment(c);
          this.addNode(u), (this.lastNode = u);
        }),
        (a.prototype.oncommentend = function () {
          this.lastNode = null;
        }),
        (a.prototype.oncdatastart = function () {
          var c = new o.Text(''),
            u = new o.CDATA([c]);
          this.addNode(u), (c.parent = u), (this.lastNode = c);
        }),
        (a.prototype.oncdataend = function () {
          this.lastNode = null;
        }),
        (a.prototype.onprocessinginstruction = function (c, u) {
          var f = new o.ProcessingInstruction(c, u);
          this.addNode(f);
        }),
        (a.prototype.handleCallback = function (c) {
          if (typeof this.callback == 'function') this.callback(c, this.dom);
          else if (c) throw c;
        }),
        (a.prototype.addNode = function (c) {
          var u = this.tagStack[this.tagStack.length - 1],
            f = u.children[u.children.length - 1];
          this.options.withStartIndices &&
            (c.startIndex = this.parser.startIndex),
            this.options.withEndIndices && (c.endIndex = this.parser.endIndex),
            u.children.push(c),
            f && ((c.prev = f), (f.next = c)),
            (c.parent = u),
            (this.lastNode = null);
        }),
        a
      );
    })();
  (e.DomHandler = s), (e.default = s);
})(nu);
var yu = {};
yu.CASE_SENSITIVE_TAG_NAMES = [
  'animateMotion',
  'animateTransform',
  'clipPath',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'foreignObject',
  'linearGradient',
  'radialGradient',
  'textPath',
];
var Hr = nu,
  $y = yu,
  Rs = $y.CASE_SENSITIVE_TAG_NAMES,
  qy = Hr.Comment,
  My = Hr.Element,
  zy = Hr.ProcessingInstruction,
  Vy = Hr.Text,
  bu = {},
  lo;
for (var fo = 0, Ky = Rs.length; fo < Ky; fo++)
  (lo = Rs[fo]), (bu[lo.toLowerCase()] = lo);
function Wy(e) {
  return bu[e];
}
function mu(e) {
  for (var t = {}, n, r = 0, o = e.length; r < o; r++)
    (n = e[r]), (t[n.name] = n.value);
  return t;
}
function Fy(e) {
  e = e.toLowerCase();
  var t = Wy(e);
  return t || e;
}
function gu(e, t, n) {
  t = t || null;
  for (var r = [], o, i = 0, s = e.length; i < s; i++) {
    var a = e[i],
      c;
    switch (a.nodeType) {
      case 1:
        (o = Fy(a.nodeName)),
          (c = new My(o, mu(a.attributes))),
          (c.children = gu(
            o === 'template' ? a.content.childNodes : a.childNodes,
            c,
          ));
        break;
      case 3:
        c = new Vy(a.nodeValue);
        break;
      case 8:
        c = new qy(a.nodeValue);
        break;
      default:
        continue;
    }
    var u = r[i - 1] || null;
    u && (u.next = c), (c.parent = t), (c.prev = u), (c.next = null), r.push(c);
  }
  return (
    n &&
      ((c = new zy(n.substring(0, n.indexOf(' ')).toLowerCase(), n)),
      (c.next = r[0] || null),
      (c.parent = t),
      r.unshift(c),
      r[1] && (r[1].prev = r[0])),
    r
  );
}
Ii.formatAttributes = mu;
Ii.formatDOM = gu;
var Zy = Ii.formatDOM,
  Gy = /<(![a-zA-Z\s]+)>/;
function Jy(e) {
  if (typeof e != 'string')
    throw new TypeError('First argument must be a string');
  if (e === '') return [];
  var t = e.match(Gy),
    n;
  return t && t[1] && (n = t[1]), Zy(Dy(e), null, n);
}
function wu(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: Yy } = Object.prototype,
  { getPrototypeOf: Pi } = Object,
  Dr = ((e) => (t) => {
    const n = Yy.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Ve = (e) => ((e = e.toLowerCase()), (t) => Dr(t) === e),
  jr = (e) => (t) => typeof t === e,
  { isArray: Gt } = Array,
  mn = jr('undefined');
function Xy(e) {
  return (
    e !== null &&
    !mn(e) &&
    e.constructor !== null &&
    !mn(e.constructor) &&
    Te(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const vu = Ve('ArrayBuffer');
function Qy(e) {
  let t;
  return (
    typeof ArrayBuffer < 'u' && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && vu(e.buffer)),
    t
  );
}
const eb = jr('string'),
  Te = jr('function'),
  Eu = jr('number'),
  $r = (e) => e !== null && typeof e == 'object',
  tb = (e) => e === !0 || e === !1,
  zn = (e) => {
    if (Dr(e) !== 'object') return !1;
    const t = Pi(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  nb = Ve('Date'),
  rb = Ve('File'),
  ob = Ve('Blob'),
  ib = Ve('FileList'),
  sb = (e) => $r(e) && Te(e.pipe),
  ab = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == 'function' && e instanceof FormData) ||
        (Te(e.append) &&
          ((t = Dr(e)) === 'formdata' ||
            (t === 'object' &&
              Te(e.toString) &&
              e.toString() === '[object FormData]'))))
    );
  },
  cb = Ve('URLSearchParams'),
  ub = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
function xn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > 'u') return;
  let r, o;
  if ((typeof e != 'object' && (e = [e]), Gt(e)))
    for (r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e);
  else {
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      s = i.length;
    let a;
    for (r = 0; r < s; r++) (a = i[r]), t.call(null, e[a], a, e);
  }
}
function xu(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    o;
  for (; r-- > 0; ) if (((o = n[r]), t === o.toLowerCase())) return o;
  return null;
}
const Su = (() =>
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : global)(),
  Au = (e) => !mn(e) && e !== Su;
function zo() {
  const { caseless: e } = (Au(this) && this) || {},
    t = {},
    n = (r, o) => {
      const i = (e && xu(t, o)) || o;
      zn(t[i]) && zn(r)
        ? (t[i] = zo(t[i], r))
        : zn(r)
        ? (t[i] = zo({}, r))
        : Gt(r)
        ? (t[i] = r.slice())
        : (t[i] = r);
    };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && xn(arguments[r], n);
  return t;
}
const lb = (e, t, n, { allOwnKeys: r } = {}) => (
    xn(
      t,
      (o, i) => {
        n && Te(o) ? (e[i] = wu(o, n)) : (e[i] = o);
      },
      { allOwnKeys: r },
    ),
    e
  ),
  fb = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  db = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, 'super', { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  hb = (e, t, n, r) => {
    let o, i, s;
    const a = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
        (s = o[i]), (!r || r(s, e, t)) && !a[s] && ((t[s] = e[s]), (a[s] = !0));
      e = n !== !1 && Pi(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  pb = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  yb = (e) => {
    if (!e) return null;
    if (Gt(e)) return e;
    let t = e.length;
    if (!Eu(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  bb = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < 'u' && Pi(Uint8Array)),
  mb = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let o;
    for (; (o = r.next()) && !o.done; ) {
      const i = o.value;
      t.call(e, i[0], i[1]);
    }
  },
  gb = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  wb = Ve('HTMLFormElement'),
  vb = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, o) {
      return r.toUpperCase() + o;
    }),
  Ns = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  Eb = Ve('RegExp'),
  _u = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    xn(n, (o, i) => {
      t(o, i, e) !== !1 && (r[i] = o);
    }),
      Object.defineProperties(e, r);
  },
  xb = (e) => {
    _u(e, (t, n) => {
      if (Te(e) && ['arguments', 'caller', 'callee'].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (Te(r)) {
        if (((t.enumerable = !1), 'writable' in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  Sb = (e, t) => {
    const n = {},
      r = (o) => {
        o.forEach((i) => {
          n[i] = !0;
        });
      };
    return Gt(e) ? r(e) : r(String(e).split(t)), n;
  },
  Ab = () => {},
  _b = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  ho = 'abcdefghijklmnopqrstuvwxyz',
  Cs = '0123456789',
  Tu = { DIGIT: Cs, ALPHA: ho, ALPHA_DIGIT: ho + ho.toUpperCase() + Cs },
  Tb = (e = 16, t = Tu.ALPHA_DIGIT) => {
    let n = '';
    const { length: r } = t;
    for (; e--; ) n += t[(Math.random() * r) | 0];
    return n;
  };
function kb(e) {
  return !!(
    e &&
    Te(e.append) &&
    e[Symbol.toStringTag] === 'FormData' &&
    e[Symbol.iterator]
  );
}
const Ob = (e) => {
    const t = new Array(10),
      n = (r, o) => {
        if ($r(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!('toJSON' in r)) {
            t[o] = r;
            const i = Gt(r) ? [] : {};
            return (
              xn(r, (s, a) => {
                const c = n(s, o + 1);
                !mn(c) && (i[a] = c);
              }),
              (t[o] = void 0),
              i
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  Bb = Ve('AsyncFunction'),
  Ib = (e) => e && ($r(e) || Te(e)) && Te(e.then) && Te(e.catch),
  T = {
    isArray: Gt,
    isArrayBuffer: vu,
    isBuffer: Xy,
    isFormData: ab,
    isArrayBufferView: Qy,
    isString: eb,
    isNumber: Eu,
    isBoolean: tb,
    isObject: $r,
    isPlainObject: zn,
    isUndefined: mn,
    isDate: nb,
    isFile: rb,
    isBlob: ob,
    isRegExp: Eb,
    isFunction: Te,
    isStream: sb,
    isURLSearchParams: cb,
    isTypedArray: bb,
    isFileList: ib,
    forEach: xn,
    merge: zo,
    extend: lb,
    trim: ub,
    stripBOM: fb,
    inherits: db,
    toFlatObject: hb,
    kindOf: Dr,
    kindOfTest: Ve,
    endsWith: pb,
    toArray: yb,
    forEachEntry: mb,
    matchAll: gb,
    isHTMLForm: wb,
    hasOwnProperty: Ns,
    hasOwnProp: Ns,
    reduceDescriptors: _u,
    freezeMethods: xb,
    toObjectSet: Sb,
    toCamelCase: vb,
    noop: Ab,
    toFiniteNumber: _b,
    findKey: xu,
    global: Su,
    isContextDefined: Au,
    ALPHABET: Tu,
    generateString: Tb,
    isSpecCompliantForm: kb,
    toJSONObject: Ob,
    isAsyncFn: Bb,
    isThenable: Ib,
  };
function $(e, t, n, r, o) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = 'AxiosError'),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    o && (this.response = o);
}
T.inherits($, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: T.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const ku = $.prototype,
  Ou = {};
[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL',
].forEach((e) => {
  Ou[e] = { value: e };
});
Object.defineProperties($, Ou);
Object.defineProperty(ku, 'isAxiosError', { value: !0 });
$.from = (e, t, n, r, o, i) => {
  const s = Object.create(ku);
  return (
    T.toFlatObject(
      e,
      s,
      function (c) {
        return c !== Error.prototype;
      },
      (a) => a !== 'isAxiosError',
    ),
    $.call(s, e.message, t, n, r, o),
    (s.cause = e),
    (s.name = e.name),
    i && Object.assign(s, i),
    s
  );
};
const Rb = null;
function Vo(e) {
  return T.isPlainObject(e) || T.isArray(e);
}
function Bu(e) {
  return T.endsWith(e, '[]') ? e.slice(0, -2) : e;
}
function Ps(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (o, i) {
          return (o = Bu(o)), !n && i ? '[' + o + ']' : o;
        })
        .join(n ? '.' : '')
    : t;
}
function Nb(e) {
  return T.isArray(e) && !e.some(Vo);
}
const Cb = T.toFlatObject(T, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function qr(e, t, n) {
  if (!T.isObject(e)) throw new TypeError('target must be an object');
  (t = t || new FormData()),
    (n = T.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (d, m) {
        return !T.isUndefined(m[d]);
      },
    ));
  const r = n.metaTokens,
    o = n.visitor || f,
    i = n.dots,
    s = n.indexes,
    c = (n.Blob || (typeof Blob < 'u' && Blob)) && T.isSpecCompliantForm(t);
  if (!T.isFunction(o)) throw new TypeError('visitor must be a function');
  function u(p) {
    if (p === null) return '';
    if (T.isDate(p)) return p.toISOString();
    if (!c && T.isBlob(p))
      throw new $('Blob is not supported. Use a Buffer instead.');
    return T.isArrayBuffer(p) || T.isTypedArray(p)
      ? c && typeof Blob == 'function'
        ? new Blob([p])
        : Buffer.from(p)
      : p;
  }
  function f(p, d, m) {
    let b = p;
    if (p && !m && typeof p == 'object') {
      if (T.endsWith(d, '{}'))
        (d = r ? d : d.slice(0, -2)), (p = JSON.stringify(p));
      else if (
        (T.isArray(p) && Nb(p)) ||
        ((T.isFileList(p) || T.endsWith(d, '[]')) && (b = T.toArray(p)))
      )
        return (
          (d = Bu(d)),
          b.forEach(function (w, E) {
            !(T.isUndefined(w) || w === null) &&
              t.append(
                s === !0 ? Ps([d], E, i) : s === null ? d : d + '[]',
                u(w),
              );
          }),
          !1
        );
    }
    return Vo(p) ? !0 : (t.append(Ps(m, d, i), u(p)), !1);
  }
  const l = [],
    h = Object.assign(Cb, {
      defaultVisitor: f,
      convertValue: u,
      isVisitable: Vo,
    });
  function y(p, d) {
    if (!T.isUndefined(p)) {
      if (l.indexOf(p) !== -1)
        throw Error('Circular reference detected in ' + d.join('.'));
      l.push(p),
        T.forEach(p, function (b, g) {
          (!(T.isUndefined(b) || b === null) &&
            o.call(t, b, T.isString(g) ? g.trim() : g, d, h)) === !0 &&
            y(b, d ? d.concat(g) : [g]);
        }),
        l.pop();
    }
  }
  if (!T.isObject(e)) throw new TypeError('data must be an object');
  return y(e), t;
}
function Ls(e) {
  const t = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\0',
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function Li(e, t) {
  (this._pairs = []), e && qr(e, this, t);
}
const Iu = Li.prototype;
Iu.append = function (t, n) {
  this._pairs.push([t, n]);
};
Iu.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, Ls);
      }
    : Ls;
  return this._pairs
    .map(function (o) {
      return n(o[0]) + '=' + n(o[1]);
    }, '')
    .join('&');
};
function Pb(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}
function Ru(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || Pb,
    o = n && n.serialize;
  let i;
  if (
    (o
      ? (i = o(t, n))
      : (i = T.isURLSearchParams(t) ? t.toString() : new Li(t, n).toString(r)),
    i)
  ) {
    const s = e.indexOf('#');
    s !== -1 && (e = e.slice(0, s)),
      (e += (e.indexOf('?') === -1 ? '?' : '&') + i);
  }
  return e;
}
class Lb {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    T.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const Us = Lb,
  Nu = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Ub = typeof URLSearchParams < 'u' ? URLSearchParams : Li,
  Hb = typeof FormData < 'u' ? FormData : null,
  Db = typeof Blob < 'u' ? Blob : null,
  jb = (() => {
    let e;
    return typeof navigator < 'u' &&
      ((e = navigator.product) === 'ReactNative' ||
        e === 'NativeScript' ||
        e === 'NS')
      ? !1
      : typeof window < 'u' && typeof document < 'u';
  })(),
  $b = (() =>
    typeof WorkerGlobalScope < 'u' &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == 'function')(),
  De = {
    isBrowser: !0,
    classes: { URLSearchParams: Ub, FormData: Hb, Blob: Db },
    isStandardBrowserEnv: jb,
    isStandardBrowserWebWorkerEnv: $b,
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
  };
function qb(e, t) {
  return qr(
    e,
    new De.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, o, i) {
          return De.isNode && T.isBuffer(n)
            ? (this.append(r, n.toString('base64')), !1)
            : i.defaultVisitor.apply(this, arguments);
        },
      },
      t,
    ),
  );
}
function Mb(e) {
  return T.matchAll(/\w+|\[(\w*)]/g, e).map((t) =>
    t[0] === '[]' ? '' : t[1] || t[0],
  );
}
function zb(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const o = n.length;
  let i;
  for (r = 0; r < o; r++) (i = n[r]), (t[i] = e[i]);
  return t;
}
function Cu(e) {
  function t(n, r, o, i) {
    let s = n[i++];
    const a = Number.isFinite(+s),
      c = i >= n.length;
    return (
      (s = !s && T.isArray(o) ? o.length : s),
      c
        ? (T.hasOwnProp(o, s) ? (o[s] = [o[s], r]) : (o[s] = r), !a)
        : ((!o[s] || !T.isObject(o[s])) && (o[s] = []),
          t(n, r, o[s], i) && T.isArray(o[s]) && (o[s] = zb(o[s])),
          !a)
    );
  }
  if (T.isFormData(e) && T.isFunction(e.entries)) {
    const n = {};
    return (
      T.forEachEntry(e, (r, o) => {
        t(Mb(r), o, n, 0);
      }),
      n
    );
  }
  return null;
}
const Vb = { 'Content-Type': void 0 };
function Kb(e, t, n) {
  if (T.isString(e))
    try {
      return (t || JSON.parse)(e), T.trim(e);
    } catch (r) {
      if (r.name !== 'SyntaxError') throw r;
    }
  return (n || JSON.stringify)(e);
}
const Mr = {
  transitional: Nu,
  adapter: ['xhr', 'http'],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || '',
        o = r.indexOf('application/json') > -1,
        i = T.isObject(t);
      if ((i && T.isHTMLForm(t) && (t = new FormData(t)), T.isFormData(t)))
        return o && o ? JSON.stringify(Cu(t)) : t;
      if (
        T.isArrayBuffer(t) ||
        T.isBuffer(t) ||
        T.isStream(t) ||
        T.isFile(t) ||
        T.isBlob(t)
      )
        return t;
      if (T.isArrayBufferView(t)) return t.buffer;
      if (T.isURLSearchParams(t))
        return (
          n.setContentType(
            'application/x-www-form-urlencoded;charset=utf-8',
            !1,
          ),
          t.toString()
        );
      let a;
      if (i) {
        if (r.indexOf('application/x-www-form-urlencoded') > -1)
          return qb(t, this.formSerializer).toString();
        if ((a = T.isFileList(t)) || r.indexOf('multipart/form-data') > -1) {
          const c = this.env && this.env.FormData;
          return qr(
            a ? { 'files[]': t } : t,
            c && new c(),
            this.formSerializer,
          );
        }
      }
      return i || o ? (n.setContentType('application/json', !1), Kb(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || Mr.transitional,
        r = n && n.forcedJSONParsing,
        o = this.responseType === 'json';
      if (t && T.isString(t) && ((r && !this.responseType) || o)) {
        const s = !(n && n.silentJSONParsing) && o;
        try {
          return JSON.parse(t);
        } catch (a) {
          if (s)
            throw a.name === 'SyntaxError'
              ? $.from(a, $.ERR_BAD_RESPONSE, this, null, this.response)
              : a;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: De.classes.FormData, Blob: De.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: 'application/json, text/plain, */*' } },
};
T.forEach(['delete', 'get', 'head'], function (t) {
  Mr.headers[t] = {};
});
T.forEach(['post', 'put', 'patch'], function (t) {
  Mr.headers[t] = T.merge(Vb);
});
const Ui = Mr,
  Wb = T.toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ]),
  Fb = (e) => {
    const t = {};
    let n, r, o;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (s) {
            (o = s.indexOf(':')),
              (n = s.substring(0, o).trim().toLowerCase()),
              (r = s.substring(o + 1).trim()),
              !(!n || (t[n] && Wb[n])) &&
                (n === 'set-cookie'
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ', ' + r : r));
          }),
      t
    );
  },
  Hs = Symbol('internals');
function en(e) {
  return e && String(e).trim().toLowerCase();
}
function Vn(e) {
  return e === !1 || e == null ? e : T.isArray(e) ? e.map(Vn) : String(e);
}
function Zb(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const Gb = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function po(e, t, n, r, o) {
  if (T.isFunction(r)) return r.call(this, t, n);
  if ((o && (t = n), !!T.isString(t))) {
    if (T.isString(r)) return t.indexOf(r) !== -1;
    if (T.isRegExp(r)) return r.test(t);
  }
}
function Jb(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Yb(e, t) {
  const n = T.toCamelCase(' ' + t);
  ['get', 'set', 'has'].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (o, i, s) {
        return this[r].call(this, t, o, i, s);
      },
      configurable: !0,
    });
  });
}
class zr {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function i(a, c, u) {
      const f = en(c);
      if (!f) throw new Error('header name must be a non-empty string');
      const l = T.findKey(o, f);
      (!l || o[l] === void 0 || u === !0 || (u === void 0 && o[l] !== !1)) &&
        (o[l || c] = Vn(a));
    }
    const s = (a, c) => T.forEach(a, (u, f) => i(u, f, c));
    return (
      T.isPlainObject(t) || t instanceof this.constructor
        ? s(t, n)
        : T.isString(t) && (t = t.trim()) && !Gb(t)
        ? s(Fb(t), n)
        : t != null && i(n, t, r),
      this
    );
  }
  get(t, n) {
    if (((t = en(t)), t)) {
      const r = T.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n) return o;
        if (n === !0) return Zb(o);
        if (T.isFunction(n)) return n.call(this, o, r);
        if (T.isRegExp(n)) return n.exec(o);
        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }
  has(t, n) {
    if (((t = en(t)), t)) {
      const r = T.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || po(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function i(s) {
      if (((s = en(s)), s)) {
        const a = T.findKey(r, s);
        a && (!n || po(r, r[a], a, n)) && (delete r[a], (o = !0));
      }
    }
    return T.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      o = !1;
    for (; r--; ) {
      const i = n[r];
      (!t || po(this, this[i], i, t, !0)) && (delete this[i], (o = !0));
    }
    return o;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      T.forEach(this, (o, i) => {
        const s = T.findKey(r, i);
        if (s) {
          (n[s] = Vn(o)), delete n[i];
          return;
        }
        const a = t ? Jb(i) : String(i).trim();
        a !== i && delete n[i], (n[a] = Vn(o)), (r[a] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      T.forEach(this, (r, o) => {
        r != null && r !== !1 && (n[o] = t && T.isArray(r) ? r.join(', ') : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ': ' + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((o) => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[Hs] = this[Hs] = { accessors: {} }).accessors,
      o = this.prototype;
    function i(s) {
      const a = en(s);
      r[a] || (Yb(o, s), (r[a] = !0));
    }
    return T.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
zr.accessor([
  'Content-Type',
  'Content-Length',
  'Accept',
  'Accept-Encoding',
  'User-Agent',
  'Authorization',
]);
T.freezeMethods(zr.prototype);
T.freezeMethods(zr);
const Ze = zr;
function yo(e, t) {
  const n = this || Ui,
    r = t || n,
    o = Ze.from(r.headers);
  let i = r.data;
  return (
    T.forEach(e, function (a) {
      i = a.call(n, i, o.normalize(), t ? t.status : void 0);
    }),
    o.normalize(),
    i
  );
}
function Pu(e) {
  return !!(e && e.__CANCEL__);
}
function Sn(e, t, n) {
  $.call(this, e ?? 'canceled', $.ERR_CANCELED, t, n),
    (this.name = 'CanceledError');
}
T.inherits(Sn, $, { __CANCEL__: !0 });
function Xb(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new $(
          'Request failed with status code ' + n.status,
          [$.ERR_BAD_REQUEST, $.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n,
        ),
      );
}
const Qb = De.isStandardBrowserEnv
  ? (function () {
      return {
        write: function (n, r, o, i, s, a) {
          const c = [];
          c.push(n + '=' + encodeURIComponent(r)),
            T.isNumber(o) && c.push('expires=' + new Date(o).toGMTString()),
            T.isString(i) && c.push('path=' + i),
            T.isString(s) && c.push('domain=' + s),
            a === !0 && c.push('secure'),
            (document.cookie = c.join('; '));
        },
        read: function (n) {
          const r = document.cookie.match(
            new RegExp('(^|;\\s*)(' + n + ')=([^;]*)'),
          );
          return r ? decodeURIComponent(r[3]) : null;
        },
        remove: function (n) {
          this.write(n, '', Date.now() - 864e5);
        },
      };
    })()
  : (function () {
      return {
        write: function () {},
        read: function () {
          return null;
        },
        remove: function () {},
      };
    })();
function em(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function tm(e, t) {
  return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
}
function Lu(e, t) {
  return e && !em(t) ? tm(e, t) : t;
}
const nm = De.isStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement('a');
      let r;
      function o(i) {
        let s = i;
        return (
          t && (n.setAttribute('href', s), (s = n.href)),
          n.setAttribute('href', s),
          {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, '') : '',
            hash: n.hash ? n.hash.replace(/^#/, '') : '',
            hostname: n.hostname,
            port: n.port,
            pathname:
              n.pathname.charAt(0) === '/' ? n.pathname : '/' + n.pathname,
          }
        );
      }
      return (
        (r = o(window.location.href)),
        function (s) {
          const a = T.isString(s) ? o(s) : s;
          return a.protocol === r.protocol && a.host === r.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function rm(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || '';
}
function om(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let o = 0,
    i = 0,
    s;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (c) {
      const u = Date.now(),
        f = r[i];
      s || (s = u), (n[o] = c), (r[o] = u);
      let l = i,
        h = 0;
      for (; l !== o; ) (h += n[l++]), (l = l % e);
      if (((o = (o + 1) % e), o === i && (i = (i + 1) % e), u - s < t)) return;
      const y = f && u - f;
      return y ? Math.round((h * 1e3) / y) : void 0;
    }
  );
}
function Ds(e, t) {
  let n = 0;
  const r = om(50, 250);
  return (o) => {
    const i = o.loaded,
      s = o.lengthComputable ? o.total : void 0,
      a = i - n,
      c = r(a),
      u = i <= s;
    n = i;
    const f = {
      loaded: i,
      total: s,
      progress: s ? i / s : void 0,
      bytes: a,
      rate: c || void 0,
      estimated: c && s && u ? (s - i) / c : void 0,
      event: o,
    };
    (f[t ? 'download' : 'upload'] = !0), e(f);
  };
}
const im = typeof XMLHttpRequest < 'u',
  sm =
    im &&
    function (e) {
      return new Promise(function (n, r) {
        let o = e.data;
        const i = Ze.from(e.headers).normalize(),
          s = e.responseType;
        let a;
        function c() {
          e.cancelToken && e.cancelToken.unsubscribe(a),
            e.signal && e.signal.removeEventListener('abort', a);
        }
        T.isFormData(o) &&
          (De.isStandardBrowserEnv || De.isStandardBrowserWebWorkerEnv
            ? i.setContentType(!1)
            : i.setContentType('multipart/form-data;', !1));
        let u = new XMLHttpRequest();
        if (e.auth) {
          const y = e.auth.username || '',
            p = e.auth.password
              ? unescape(encodeURIComponent(e.auth.password))
              : '';
          i.set('Authorization', 'Basic ' + btoa(y + ':' + p));
        }
        const f = Lu(e.baseURL, e.url);
        u.open(e.method.toUpperCase(), Ru(f, e.params, e.paramsSerializer), !0),
          (u.timeout = e.timeout);
        function l() {
          if (!u) return;
          const y = Ze.from(
              'getAllResponseHeaders' in u && u.getAllResponseHeaders(),
            ),
            d = {
              data:
                !s || s === 'text' || s === 'json'
                  ? u.responseText
                  : u.response,
              status: u.status,
              statusText: u.statusText,
              headers: y,
              config: e,
              request: u,
            };
          Xb(
            function (b) {
              n(b), c();
            },
            function (b) {
              r(b), c();
            },
            d,
          ),
            (u = null);
        }
        if (
          ('onloadend' in u
            ? (u.onloadend = l)
            : (u.onreadystatechange = function () {
                !u ||
                  u.readyState !== 4 ||
                  (u.status === 0 &&
                    !(u.responseURL && u.responseURL.indexOf('file:') === 0)) ||
                  setTimeout(l);
              }),
          (u.onabort = function () {
            u &&
              (r(new $('Request aborted', $.ECONNABORTED, e, u)), (u = null));
          }),
          (u.onerror = function () {
            r(new $('Network Error', $.ERR_NETWORK, e, u)), (u = null);
          }),
          (u.ontimeout = function () {
            let p = e.timeout
              ? 'timeout of ' + e.timeout + 'ms exceeded'
              : 'timeout exceeded';
            const d = e.transitional || Nu;
            e.timeoutErrorMessage && (p = e.timeoutErrorMessage),
              r(
                new $(
                  p,
                  d.clarifyTimeoutError ? $.ETIMEDOUT : $.ECONNABORTED,
                  e,
                  u,
                ),
              ),
              (u = null);
          }),
          De.isStandardBrowserEnv)
        ) {
          const y =
            (e.withCredentials || nm(f)) &&
            e.xsrfCookieName &&
            Qb.read(e.xsrfCookieName);
          y && i.set(e.xsrfHeaderName, y);
        }
        o === void 0 && i.setContentType(null),
          'setRequestHeader' in u &&
            T.forEach(i.toJSON(), function (p, d) {
              u.setRequestHeader(d, p);
            }),
          T.isUndefined(e.withCredentials) ||
            (u.withCredentials = !!e.withCredentials),
          s && s !== 'json' && (u.responseType = e.responseType),
          typeof e.onDownloadProgress == 'function' &&
            u.addEventListener('progress', Ds(e.onDownloadProgress, !0)),
          typeof e.onUploadProgress == 'function' &&
            u.upload &&
            u.upload.addEventListener('progress', Ds(e.onUploadProgress)),
          (e.cancelToken || e.signal) &&
            ((a = (y) => {
              u &&
                (r(!y || y.type ? new Sn(null, e, u) : y),
                u.abort(),
                (u = null));
            }),
            e.cancelToken && e.cancelToken.subscribe(a),
            e.signal &&
              (e.signal.aborted ? a() : e.signal.addEventListener('abort', a)));
        const h = rm(f);
        if (h && De.protocols.indexOf(h) === -1) {
          r(new $('Unsupported protocol ' + h + ':', $.ERR_BAD_REQUEST, e));
          return;
        }
        u.send(o || null);
      });
    },
  Kn = { http: Rb, xhr: sm };
T.forEach(Kn, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, 'name', { value: t });
    } catch {}
    Object.defineProperty(e, 'adapterName', { value: t });
  }
});
const am = {
  getAdapter: (e) => {
    e = T.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    for (
      let o = 0;
      o < t && ((n = e[o]), !(r = T.isString(n) ? Kn[n.toLowerCase()] : n));
      o++
    );
    if (!r)
      throw r === !1
        ? new $(
            `Adapter ${n} is not supported by the environment`,
            'ERR_NOT_SUPPORT',
          )
        : new Error(
            T.hasOwnProp(Kn, n)
              ? `Adapter '${n}' is not available in the build`
              : `Unknown adapter '${n}'`,
          );
    if (!T.isFunction(r)) throw new TypeError('adapter is not a function');
    return r;
  },
  adapters: Kn,
};
function bo(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Sn(null, e);
}
function js(e) {
  return (
    bo(e),
    (e.headers = Ze.from(e.headers)),
    (e.data = yo.call(e, e.transformRequest)),
    ['post', 'put', 'patch'].indexOf(e.method) !== -1 &&
      e.headers.setContentType('application/x-www-form-urlencoded', !1),
    am
      .getAdapter(e.adapter || Ui.adapter)(e)
      .then(
        function (r) {
          return (
            bo(e),
            (r.data = yo.call(e, e.transformResponse, r)),
            (r.headers = Ze.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            Pu(r) ||
              (bo(e),
              r &&
                r.response &&
                ((r.response.data = yo.call(
                  e,
                  e.transformResponse,
                  r.response,
                )),
                (r.response.headers = Ze.from(r.response.headers)))),
            Promise.reject(r)
          );
        },
      )
  );
}
const $s = (e) => (e instanceof Ze ? e.toJSON() : e);
function Mt(e, t) {
  t = t || {};
  const n = {};
  function r(u, f, l) {
    return T.isPlainObject(u) && T.isPlainObject(f)
      ? T.merge.call({ caseless: l }, u, f)
      : T.isPlainObject(f)
      ? T.merge({}, f)
      : T.isArray(f)
      ? f.slice()
      : f;
  }
  function o(u, f, l) {
    if (T.isUndefined(f)) {
      if (!T.isUndefined(u)) return r(void 0, u, l);
    } else return r(u, f, l);
  }
  function i(u, f) {
    if (!T.isUndefined(f)) return r(void 0, f);
  }
  function s(u, f) {
    if (T.isUndefined(f)) {
      if (!T.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, f);
  }
  function a(u, f, l) {
    if (l in t) return r(u, f);
    if (l in e) return r(void 0, u);
  }
  const c = {
    url: i,
    method: i,
    data: i,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: a,
    headers: (u, f) => o($s(u), $s(f), !0),
  };
  return (
    T.forEach(Object.keys(Object.assign({}, e, t)), function (f) {
      const l = c[f] || o,
        h = l(e[f], t[f], f);
      (T.isUndefined(h) && l !== a) || (n[f] = h);
    }),
    n
  );
}
const Uu = '1.4.0',
  Hi = {};
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
  (e, t) => {
    Hi[e] = function (r) {
      return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
    };
  },
);
const qs = {};
Hi.transitional = function (t, n, r) {
  function o(i, s) {
    return (
      '[Axios v' +
      Uu +
      "] Transitional option '" +
      i +
      "'" +
      s +
      (r ? '. ' + r : '')
    );
  }
  return (i, s, a) => {
    if (t === !1)
      throw new $(
        o(s, ' has been removed' + (n ? ' in ' + n : '')),
        $.ERR_DEPRECATED,
      );
    return (
      n &&
        !qs[s] &&
        ((qs[s] = !0),
        console.warn(
          o(
            s,
            ' has been deprecated since v' +
              n +
              ' and will be removed in the near future',
          ),
        )),
      t ? t(i, s, a) : !0
    );
  };
};
function cm(e, t, n) {
  if (typeof e != 'object')
    throw new $('options must be an object', $.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const i = r[o],
      s = t[i];
    if (s) {
      const a = e[i],
        c = a === void 0 || s(a, i, e);
      if (c !== !0)
        throw new $('option ' + i + ' must be ' + c, $.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new $('Unknown option ' + i, $.ERR_BAD_OPTION);
  }
}
const Ko = { assertOptions: cm, validators: Hi },
  st = Ko.validators;
class dr {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new Us(), response: new Us() });
  }
  request(t, n) {
    typeof t == 'string' ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = Mt(this.defaults, n));
    const { transitional: r, paramsSerializer: o, headers: i } = n;
    r !== void 0 &&
      Ko.assertOptions(
        r,
        {
          silentJSONParsing: st.transitional(st.boolean),
          forcedJSONParsing: st.transitional(st.boolean),
          clarifyTimeoutError: st.transitional(st.boolean),
        },
        !1,
      ),
      o != null &&
        (T.isFunction(o)
          ? (n.paramsSerializer = { serialize: o })
          : Ko.assertOptions(
              o,
              { encode: st.function, serialize: st.function },
              !0,
            )),
      (n.method = (n.method || this.defaults.method || 'get').toLowerCase());
    let s;
    (s = i && T.merge(i.common, i[n.method])),
      s &&
        T.forEach(
          ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
          (p) => {
            delete i[p];
          },
        ),
      (n.headers = Ze.concat(s, i));
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function (d) {
      (typeof d.runWhen == 'function' && d.runWhen(n) === !1) ||
        ((c = c && d.synchronous), a.unshift(d.fulfilled, d.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function (d) {
      u.push(d.fulfilled, d.rejected);
    });
    let f,
      l = 0,
      h;
    if (!c) {
      const p = [js.bind(this), void 0];
      for (
        p.unshift.apply(p, a),
          p.push.apply(p, u),
          h = p.length,
          f = Promise.resolve(n);
        l < h;

      )
        f = f.then(p[l++], p[l++]);
      return f;
    }
    h = a.length;
    let y = n;
    for (l = 0; l < h; ) {
      const p = a[l++],
        d = a[l++];
      try {
        y = p(y);
      } catch (m) {
        d.call(this, m);
        break;
      }
    }
    try {
      f = js.call(this, y);
    } catch (p) {
      return Promise.reject(p);
    }
    for (l = 0, h = u.length; l < h; ) f = f.then(u[l++], u[l++]);
    return f;
  }
  getUri(t) {
    t = Mt(this.defaults, t);
    const n = Lu(t.baseURL, t.url);
    return Ru(n, t.params, t.paramsSerializer);
  }
}
T.forEach(['delete', 'get', 'head', 'options'], function (t) {
  dr.prototype[t] = function (n, r) {
    return this.request(
      Mt(r || {}, { method: t, url: n, data: (r || {}).data }),
    );
  };
});
T.forEach(['post', 'put', 'patch'], function (t) {
  function n(r) {
    return function (i, s, a) {
      return this.request(
        Mt(a || {}, {
          method: t,
          headers: r ? { 'Content-Type': 'multipart/form-data' } : {},
          url: i,
          data: s,
        }),
      );
    };
  }
  (dr.prototype[t] = n()), (dr.prototype[t + 'Form'] = n(!0));
});
const Wn = dr;
class Di {
  constructor(t) {
    if (typeof t != 'function')
      throw new TypeError('executor must be a function.');
    let n;
    this.promise = new Promise(function (i) {
      n = i;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0; ) r._listeners[i](o);
      r._listeners = null;
    }),
      (this.promise.then = (o) => {
        let i;
        const s = new Promise((a) => {
          r.subscribe(a), (i = a);
        }).then(o);
        return (
          (s.cancel = function () {
            r.unsubscribe(i);
          }),
          s
        );
      }),
      t(function (i, s, a) {
        r.reason || ((r.reason = new Sn(i, s, a)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new Di(function (o) {
        t = o;
      }),
      cancel: t,
    };
  }
}
const um = Di;
function lm(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function fm(e) {
  return T.isObject(e) && e.isAxiosError === !0;
}
const Wo = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Wo).forEach(([e, t]) => {
  Wo[t] = e;
});
const dm = Wo;
function Hu(e) {
  const t = new Wn(e),
    n = wu(Wn.prototype.request, t);
  return (
    T.extend(n, Wn.prototype, t, { allOwnKeys: !0 }),
    T.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (o) {
      return Hu(Mt(e, o));
    }),
    n
  );
}
const Q = Hu(Ui);
Q.Axios = Wn;
Q.CanceledError = Sn;
Q.CancelToken = um;
Q.isCancel = Pu;
Q.VERSION = Uu;
Q.toFormData = qr;
Q.AxiosError = $;
Q.Cancel = Q.CanceledError;
Q.all = function (t) {
  return Promise.all(t);
};
Q.spread = lm;
Q.isAxiosError = fm;
Q.mergeConfig = Mt;
Q.AxiosHeaders = Ze;
Q.formToJSON = (e) => Cu(T.isHTMLForm(e) ? new FormData(e) : e);
Q.HttpStatusCode = dm;
Q.default = Q;
const hm = Q;
function Bm(e) {
  let t;
  if (e.startsWith('npub1'))
    try {
      t = ln.decode(e).data.toString();
    } catch {
      throw new Error('error');
    }
  else
    try {
      ln.npubEncode(e), (t = e);
    } catch {
      throw new Error('error');
    }
  return t;
}
async function Im(e, t) {
  const n = By();
  n.setRelays(e);
  const r = Ay({ filters: t }),
    o = n.use(r),
    i = new Map(),
    s = {
      next: (u) => {
        if (
          (console.log(u),
          t[0].kinds &&
            t[0].kinds[0] >= 3e4 &&
            t[0].kinds[0] < 4e4 &&
            u.event.tags[0][0] === 'd')
        ) {
          const f = u.event.tags[0][1],
            l = i.get(f);
          (!l || u.event.created_at > l.created_at) && i.set(f, u.event);
        }
      },
      error: (u) => {
        console.error('Error occurred:', u);
      },
      complete: () => {
        console.log('Subscription completed');
      },
    },
    a = o.subscribe(s);
  setTimeout(() => {
    a.unsubscribe();
  }, 10 * 1e3),
    await new Promise((u) => {
      a.add(() => {
        u();
      });
    });
  const c = Array.from(i.values());
  return console.log(c), c;
}
function Rm(e) {
  if ((console.log('response:', e), e == null || e == !1))
    return { value: '無効なIDかもです', error: !0 };
  const t = pm(e);
  return console.log(t), t;
}
function pm(e) {
  const t = { value: '', error: !1 };
  if (
    (e.startsWith('nostr:') && (e = e.slice(6)),
    e.startsWith('note1') || e.startsWith('nevent'))
  )
    try {
      const n = ln.decode(e);
      n.type == 'note'
        ? (t.value = n.data)
        : n.type == 'nevent' && (t.value = n.data.id);
    } catch (n) {
      (t.error = !0), (t.value = n), console.log('Decoding failed:', n);
    }
  else
    try {
      ln.noteEncode(e), (t.value = e);
    } catch (n) {
      (t.error = !0), (t.value = n);
    }
  return t;
}
async function Nm(e, t, n) {
  const r = n.map((i) => ['e', i]);
  t.tags.push(...r), console.log(r), console.log(t);
  const o = {
    id: '',
    pubkey: t.pubkey,
    created_at: Math.floor(Date.now() / 1e3),
    kind: t.kind,
    tags: t.tags,
    content: t.content,
    sig: '',
  };
  return await Vr(o, e);
}
async function Cm(e, t, n) {
  const r = n.map((a) => ['e', a]);
  let o;
  if (t.content.length > 0)
    try {
      const a = await window.nostr.nip04.decrypt(t.pubkey, t.content),
        c = JSON.parse(a);
      c.push(...r), (o = c);
    } catch {
      return { msg: ['復号化できませんでした'], isSuccess: !1, event: t };
    }
  else o = r;
  console.log(o);
  const i = await window.nostr.nip04.encrypt(t.pubkey, JSON.stringify(o)),
    s = {
      id: '',
      pubkey: t.pubkey,
      created_at: Math.floor(Date.now() / 1e3),
      kind: t.kind,
      tags: t.tags,
      content: i,
      sig: '',
    };
  return await Vr(s, e);
}
async function Vr(e, t) {
  let n = !1;
  const r = [];
  try {
    const o = await window.nostr.signEvent(e);
    o.id = wr(o);
    const s = new Zd().publish(t, o);
    return new Promise((a) => {
      const c = setTimeout(() => {
        a({ isSuccess: n, event: o, msg: r });
      }, 5e3);
      s.on('ok', (u) => {
        (n = !0),
          r.push(`[ok]${u}`),
          r.length == t.length &&
            (clearTimeout(c), a({ isSuccess: n, event: o, msg: r }));
      }),
        s.on('failed', (u) => {
          r.push(`[failed]${u}`),
            r.length == t.length &&
              (clearTimeout(c), a({ isSuccess: n, event: o, msg: r }));
        });
    });
  } catch (o) {
    throw new Error(o);
  }
}
async function Pm(e, t, n) {
  console.log(t.tags);
  const r = t.tags.slice();
  n.sort((i, s) => s - i);
  for (const i of n) r.splice(i, 1);
  console.log(r);
  const o = {
    id: '',
    pubkey: t.pubkey,
    created_at: Math.floor(Date.now() / 1e3),
    kind: t.kind,
    tags: r,
    content: t.content,
    sig: '',
  };
  return await Vr(o, e);
}
async function Lm(e, t, n) {
  n.sort((r, o) => o - r);
  try {
    const r = await window.nostr.nip04.decrypt(t.pubkey, t.content),
      o = JSON.parse(r);
    for (const c of n) o.splice(c, 1);
    const i = o;
    console.log(i);
    const s = await window.nostr.nip04.encrypt(t.pubkey, JSON.stringify(i)),
      a = {
        id: '',
        pubkey: t.pubkey,
        created_at: Math.floor(Date.now() / 1e3),
        kind: t.kind,
        tags: t.tags,
        content: s,
        sig: '',
      };
    return await Vr(a, e);
  } catch {
    return { msg: ['復号化できませんでした'], isSuccess: !1, event: t };
  }
}
async function Um(e) {
  try {
    const n = await hm.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(e)}`,
      ),
      r = Jy(n.data.contents),
      o = t(r, 'og:title'),
      i = o && o.type === 'tag' ? o.attribs.content : '',
      s = t(r, 'og:image'),
      a = s && s.type === 'tag' ? s.attribs.content : '',
      c = t(r, 'og:description'),
      u = c && c.type === 'tag' ? c.attribs.content : '';
    return { title: i, image: a, description: u };
  } catch (n) {
    return console.log(n), { title: '', image: '', description: '' };
  }
  function t(n, r) {
    for (const o of n) {
      if (o.type === 'tag' && o.attribs && o.attribs.property === r) return o;
      const i = t(o.children || [], r);
      if (i) return i;
    }
    return null;
  }
}
const Hm = nl('goto');
export {
  Tm as G,
  Sm as P,
  Cm as a,
  Nm as b,
  Rm as c,
  Bm as d,
  Pm as e,
  Im as f,
  Hm as g,
  Lm as h,
  zs as i,
  xm as j,
  wm as k,
  Em as l,
  vm as m,
  ln as n,
  Ay as o,
  Vr as p,
  km as q,
  Om as r,
  ht as s,
  sl as t,
  _m as u,
  By as v,
  Um as w,
  _s as x,
};
