

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.dac063b9.js","_app/immutable/chunks/index.2325ee3b.js","_app/immutable/chunks/navigation.b09c0480.js","_app/immutable/chunks/index.5c2dc23e.js","_app/immutable/chunks/singletons.3353a5f0.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.7cb4d88a.js","_app/immutable/chunks/Toast.29847fe0.js"];
export const stylesheets = ["_app/immutable/assets/ProgressBar.05e4960c.css"];
export const fonts = [];
