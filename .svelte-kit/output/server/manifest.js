export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/icons/icon-128x128.png","assets/icons/icon-144x144.png","assets/icons/icon-152x152.png","assets/icons/icon-192x192.png","assets/icons/icon-384x384.png","assets/icons/icon-48x48.png","assets/icons/icon-512x512.png","assets/icons/icon-72x72.png","assets/icons/icon-96x96.png","favicon.png","img.png","img2.png","pwa_icon-192.png","pwa_icon-512.png","pwa_icon-512_.png","pwa_icon-512_2.png","pwa_icon-512_3.png","pwa_icon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.02d27708.js","app":"_app/immutable/entry/app.dce50479.js","imports":["_app/immutable/entry/start.02d27708.js","_app/immutable/chunks/scheduler.9fee0ef1.js","_app/immutable/chunks/singletons.1765f3c8.js","_app/immutable/chunks/index.4948511f.js","_app/immutable/entry/app.dce50479.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.9fee0ef1.js","_app/immutable/chunks/index.9deb4333.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/ogp",
				pattern: /^\/api\/ogp\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/ogp/_server.ts.js'))
			},
			{
				id: "/a/[naddr]",
				pattern: /^\/a\/([^/]+?)\/?$/,
				params: [{"name":"naddr","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/p/[nprofile]",
				pattern: /^\/p\/([^/]+?)\/?$/,
				params: [{"name":"nprofile","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
