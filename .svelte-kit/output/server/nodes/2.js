

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.49b62224.js","_app/immutable/chunks/index.1fa16860.js","_app/immutable/chunks/runtime.esm.c6070bb8.js","_app/immutable/chunks/index.6b4ebe8d.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.baaee050.js","_app/immutable/chunks/singletons.754aa4bc.js","_app/immutable/chunks/navigation.b66b9f2c.js","_app/immutable/chunks/Toast.16eb076d.js"];
export const stylesheets = ["_app/immutable/assets/ProgressBar.05e4960c.css"];
export const fonts = [];
