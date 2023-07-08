

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.57a9797e.js","_app/immutable/chunks/index.e81ade4b.js","_app/immutable/chunks/stores.775d0d4f.js","_app/immutable/chunks/singletons.2b260291.js","_app/immutable/chunks/index.52a5fe5b.js"];
export const stylesheets = [];
export const fonts = [];
