

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.2ebf59c2.js","_app/immutable/chunks/scheduler.9fee0ef1.js","_app/immutable/chunks/index.9deb4333.js","_app/immutable/chunks/stores.7cf4f1e7.js","_app/immutable/chunks/singletons.1765f3c8.js","_app/immutable/chunks/index.4948511f.js"];
export const stylesheets = [];
export const fonts = [];
