

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.2ac21ef6.js","_app/immutable/chunks/scheduler.9fee0ef1.js","_app/immutable/chunks/index.9deb4333.js","_app/immutable/chunks/navigation.8a69eadb.js","_app/immutable/chunks/index.4948511f.js","_app/immutable/chunks/singletons.1765f3c8.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.28e18f2f.js","_app/immutable/chunks/Toast.64409788.js"];
export const stylesheets = ["_app/immutable/assets/ProgressBar.05e4960c.css"];
export const fonts = [];
