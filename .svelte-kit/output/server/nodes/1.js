

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.90a19daa.js","_app/immutable/chunks/index.2325ee3b.js","_app/immutable/chunks/stores.d82b56e1.js","_app/immutable/chunks/singletons.3353a5f0.js","_app/immutable/chunks/index.5c2dc23e.js"];
export const stylesheets = [];
export const fonts = [];
