

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.e4812141.js","_app/immutable/chunks/index.1fa16860.js","_app/immutable/chunks/stores.a22b943f.js","_app/immutable/chunks/singletons.754aa4bc.js","_app/immutable/chunks/index.6b4ebe8d.js"];
export const stylesheets = [];
export const fonts = [];
