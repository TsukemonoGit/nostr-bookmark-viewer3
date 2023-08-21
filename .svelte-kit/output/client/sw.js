if (!self.define) {
  let e,
    s = {};
  const l = (l, i) => (
    (l = new URL(l + '.js', i).href),
    s[l] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = l), (e.onload = s), document.head.appendChild(e);
        } else (e = l), importScripts(l), s();
      }).then(() => {
        let e = s[l];
        if (!e) throw new Error(`Module ${l} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const u =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[u]) return;
    let r = {};
    const a = (e) => l(e, u),
      o = { module: { uri: u }, exports: r, require: a };
    s[u] = Promise.all(i.map((e) => o[e] || a(e))).then((e) => (n(...e), r));
  };
}
define(['./workbox-27b29e6f'], function (e) {
  'use strict';
  self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: '_app/immutable/assets/0.e292cac0.css', revision: null },
        { url: '_app/immutable/assets/3.856ca443.css', revision: null },
        { url: '_app/immutable/assets/4.fbb30415.css', revision: null },
        { url: '_app/immutable/assets/Content.be387959.css', revision: null },
        {
          url: '_app/immutable/assets/ProgressBar.05e4960c.css',
          revision: null,
        },
        { url: '_app/immutable/chunks/Content.952014ad.js', revision: null },
        { url: '_app/immutable/chunks/index.52a5fe5b.js', revision: null },
        { url: '_app/immutable/chunks/index.e81ade4b.js', revision: null },
        { url: '_app/immutable/chunks/navigation.928c82b4.js', revision: null },
        { url: '_app/immutable/chunks/popup.7188fd77.js', revision: null },
        {
          url: '_app/immutable/chunks/preload-helper.41c905a7.js',
          revision: null,
        },
        {
          url: '_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.0751fc73.js',
          revision: null,
        },
        { url: '_app/immutable/chunks/singletons.2b260291.js', revision: null },
        { url: '_app/immutable/chunks/stores.775d0d4f.js', revision: null },
        { url: '_app/immutable/chunks/Toast.4359ca3d.js', revision: null },
        {
          url: '_app/immutable/chunks/workbox-window.prod.es5.a7b12eab.js',
          revision: null,
        },
        { url: '_app/immutable/entry/app.21545623.js', revision: null },
        { url: '_app/immutable/entry/start.8cf57300.js', revision: null },
        { url: '_app/immutable/nodes/0.6e36538a.js', revision: null },
        { url: '_app/immutable/nodes/1.57a9797e.js', revision: null },
        { url: '_app/immutable/nodes/2.e0fee28c.js', revision: null },
        { url: '_app/immutable/nodes/3.f39fcdac.js', revision: null },
        { url: '_app/immutable/nodes/4.b839423c.js', revision: null },
        { url: 'favicon.png', revision: '9a094e8b1a4d339a8716aebb6485f12f' },
        { url: 'icon.png', revision: 'b8e9e6847662cb76632a3f6e0701cc1e' },
        { url: 'icon3.png', revision: 'ac02339c2cde1d7a7dd0a6835059226e' },
        { url: 'img.png', revision: '60f42b000bac47c0a98b1a1929824bbe' },
        { url: 'img2.png', revision: '52df952cac42e8a27b0702275068a3f0' },
        {
          url: 'manifest.webmanifest',
          revision: '67ec1820cc941e20f45874b24e03e333',
        },
      ],
      {},
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('/')));
});
