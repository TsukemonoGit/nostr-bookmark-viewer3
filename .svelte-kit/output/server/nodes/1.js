

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.14a4597a.js","_app/immutable/chunks/index.e81ade4b.js","_app/immutable/chunks/stores.8e8b0047.js","_app/immutable/chunks/singletons.af8d7285.js","_app/immutable/chunks/index.52a5fe5b.js"];
export const stylesheets = [];
export const fonts = [];
