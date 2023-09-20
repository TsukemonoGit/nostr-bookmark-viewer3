import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.702ae622.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.2ebf8e47.js","_app/immutable/chunks/index.6b4ebe8d.js","_app/immutable/chunks/index.1fa16860.js","_app/immutable/chunks/popup.28cfbfc0.js"];
export const stylesheets = ["_app/immutable/assets/0.459169bc.css","_app/immutable/assets/ProgressBar.05e4960c.css"];
export const fonts = [];
