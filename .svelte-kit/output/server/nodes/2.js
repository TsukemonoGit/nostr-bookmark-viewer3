

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.d0c0a4ec.js","_app/immutable/chunks/index.1fa16860.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.2ebf8e47.js","_app/immutable/chunks/index.6b4ebe8d.js","_app/immutable/chunks/singletons.dd2caadf.js","_app/immutable/chunks/navigation.bd521855.js","_app/immutable/chunks/Toast.0b3b0eaa.js"];
export const stylesheets = ["_app/immutable/assets/ProgressBar.05e4960c.css"];
export const fonts = [];
