export const index = 2;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import('../entries/pages/_page.svelte.js'))
    .default);
export const imports = [
  '_app/immutable/nodes/2.e0fee28c.js',
  '_app/immutable/chunks/index.e81ade4b.js',
  '_app/immutable/chunks/navigation.928c82b4.js',
  '_app/immutable/chunks/index.52a5fe5b.js',
  '_app/immutable/chunks/singletons.2b260291.js',
  '_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.0751fc73.js',
  '_app/immutable/chunks/Toast.4359ca3d.js',
];
export const stylesheets = ['_app/immutable/assets/ProgressBar.05e4960c.css'];
export const fonts = [];
