import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component, d as each } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import "rx-nostr";
import { nip19 } from "nostr-tools";
import "websocket-polyfill";
import "html-dom-parser";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { n as nowProgress, R as RelaysforSearch, M as Modal, P as ProgressRadial } from "../../../../chunks/ModalImage.svelte_svelte_type_style_lang.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".tabGroup.svelte-pws32x{flex:1;max-width:calc(100vw - 8em);position:relative}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $nowProgress, $$unsubscribe_nowProgress;
  let $page, $$unsubscribe_page;
  $$unsubscribe_nowProgress = subscribe(nowProgress, (value) => $nowProgress = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const { type, data } = nip19.decode($page.params.naddr);
  const { pubkey, relays, identifier, kind } = type === "naddr" && data.relays ? {
    pubkey: data.pubkey,
    relays: data.relays.length > 0 ? data.relays : RelaysforSearch,
    identifier: data.identifier,
    kind: data.kind
  } : {
    pubkey: "",
    relays: [],
    identifier: "",
    kind: 30001
  };
  console.log(pubkey, relays, identifier, kind);
  if (kind !== 30001) {
    console.log("ブクマのnaddrじゃないかも");
  }
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-hcwecr_START --><meta prefix="og: https://ogp.me/ns#"><meta property="og:title" content="nostr-bookmark-viewer3"><meta property="og:description" content="${"naddr:id:" + escape(identifier, true) + ",pubkey:" + escape(pubkey, true)}"><meta property="og:image" content="https://nostr-bookmark-viewer3.vercel.app/img2.png"><!-- HEAD_svelte-hcwecr_END -->`, ""}
${validate_component(Modal, "Modal").$$render($$result, {}, {}, {})}

<div class="card p-4 w-72 shadow-xl z-20 break-all" data-popup="popupFeatured"><div><p>【pubkey】</p>
    <p>${escape(nip19.npubEncode(pubkey))}</p>

    <p class="mt-2">【relays】</p>

    <ul class="list-disc">${each(relays, (relay) => {
      return `<li class="ml-4">${escape(relay)}</li>`;
    })}</ul></div>
  <hr class="!border-t-2 my-1">
  <div class="text-sm"><ul class="list-disc"><li class="ml-4"><span class="btn variant-filled p-0 w-5">🐥</span> Nostrで共有する
      </li>
      <li class="ml-4"><span class="btn variant-filled p-0 w-5">🔗</span> 外部アプリで開く
      </li></ul></div>
  <hr class="!border-t-2 my-1">
  <button type="button" class="btn variant-filled py-1">Go back to Setup</button>
  <div class="arrow bg-surface-100-800-token"></div></div>

<main class="container max-w-5xl px-1 mt-24 mb-12">${`now loading`}</main>



<div class="container max-w-5xl mx-auto z-10">${$nowProgress ? `<div class="fixed bottom-2 right-2">${validate_component(ProgressRadial, "ProgressRadial").$$render(
      $$result,
      {
        "...": true,
        stroke: 100,
        meter: "stroke-primary-500",
        track: "stroke-primary-500/30",
        width: "w-24"
      },
      {},
      {}
    )}</div>` : ``}
</div>`;
  } while (!$$settled);
  $$unsubscribe_nowProgress();
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
