export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","icon.png","icon3.png","img.png","img2.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.8cf57300.js","app":"_app/immutable/entry/app.21545623.js","imports":["_app/immutable/entry/start.8cf57300.js","_app/immutable/chunks/index.e81ade4b.js","_app/immutable/chunks/singletons.2b260291.js","_app/immutable/chunks/index.52a5fe5b.js","_app/immutable/entry/app.21545623.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.e81ade4b.js"],"stylesheets":[],"fonts":[]},
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
