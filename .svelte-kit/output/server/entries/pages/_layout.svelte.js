import { c as create_ssr_component } from '../../chunks/index2.js';
import {
  computePosition,
  autoUpdate,
  offset,
  shift,
  flip,
  arrow,
} from '@floating-ui/dom';
import { w as writable } from '../../chunks/index.js';
import '../../chunks/ProgressBar.svelte_svelte_type_style_lang.js';
import { inject } from '@vercel/analytics';
const themeGoldNouveau = '';
const skeleton = '';
const app = '';
const storePopup = writable(void 0);
const pwaInfo = {
  pwaInDevEnvironment: false,
  webManifest: {
    href: '/manifest.webmanifest',
    useCredentials: true,
    linkTag:
      '<link rel="manifest" href="/manifest.webmanifest" crossorigin="use-credentials">',
  },
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let webManifest;
  storePopup.set({
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  });
  inject({ mode: 'production' });
  webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
  return `${slots.default ? slots.default({}) : ``}

${
  (($$result.head += `<!-- HEAD_svelte-13srx9e_START --><!-- HTML_TAG_START -->${webManifest}<!-- HTML_TAG_END --><!-- HEAD_svelte-13srx9e_END -->`),
  '')
}
${``}`;
});
export { Layout as default };
