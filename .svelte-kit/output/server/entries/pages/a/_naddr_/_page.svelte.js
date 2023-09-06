import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component, d as each } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
import "rx-nostr";
import { nip19 } from "nostr-tools";
import "websocket-polyfill";
import { M as MyPaginator } from "../../../../chunks/MyPaginator.js";
import { n as nowProgress, s as searchRelays, a as allView, R as RelaysforSearch } from "../../../../chunks/functions.js";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { s as shareIcon, o as openAnotherAppIcon, a as searchIcon, w as warningOnIcon, b as warningOffIcon, M as Modal, P as ProgressRadial } from "../../../../chunks/Content.svelte_svelte_type_style_lang.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".tabGroup.svelte-pws32x{flex:1;max-width:calc(100vw - 8em);position:relative}",
  map: null
};
const pagelimit = 50;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $nowProgress, $$unsubscribe_nowProgress;
  let $searchRelays, $$unsubscribe_searchRelays;
  let $page, $$unsubscribe_page;
  let $allView, $$unsubscribe_allView;
  $$unsubscribe_nowProgress = subscribe(nowProgress, (value) => $nowProgress = value);
  $$unsubscribe_searchRelays = subscribe(searchRelays, (value) => $searchRelays = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_allView = subscribe(allView, (value) => $allView = value);
  const { type, data } = nip19.decode($page.params.naddr);
  const { pubkey, relays, identifier, kind } = type === "naddr" && data.relays ? {
    pubkey: data.pubkey,
    relays: data.relays.length > 3 ? data.relays : [...data.relays, ...RelaysforSearch],
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
  let pages;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    pages = {
      offset: 0,
      limit: pagelimit,
      size: 1,
      amounts: [pagelimit]
    };
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-k2do6u_START -->${$$result.title = `<title>nostr-bookmark-viewer</title>`, ""}<meta name="description" content="${escape(pubkey, true) + "のタグ" + escape(identifier, true) + "のブックマーク"}"><meta prefix="og: https://ogp.me/ns#"><meta property="og:title" content="nostr-bookmark-viewer3"><meta property="og:description" content="${"Nostrのブックマークを見たりできるやつ\n【naddr】\nid:" + escape(identifier, true) + ",\npubkey:" + escape(pubkey, true)}"><meta property="og:image" content="https://nostr-bookmark-viewer3.vercel.app/img2.png"><!-- HEAD_svelte-k2do6u_END -->`, ""}
${validate_component(Modal, "Modal").$$render($$result, {}, {}, {})}

<div class="card border border-purple-800 p-4 w-[22rem] shadow-xl z-20 break-all max-h-[80%] overflow-auto" data-popup="popupFeatured"><button type="button" class="btn variant-filled-secondary py-1 my-2">Go back to Setup</button>
  <hr class="!border-t-2 my-1">
  <div><p>【設定情報】</p>
    <ul class="list-disc"><li class="ml-4">プレビュー表示: ${escape("ON")}</li>
      <li class="ml-4">ノート読み込み: ${escape("ON")}</li></ul>
    <hr class="!border-t-2 my-1">

    <p>【pubkey】</p>
    <p>${escape(nip19.npubEncode(pubkey))}</p>

    <p class="mt-2">【relays】</p>

    <ul class="list-disc">${each(relays, (relay) => {
      return `<li class="ml-4">${escape(relay)}</li>`;
    })}</ul>
    <p class="mt-2">【ノート検索用relays】</p>

    <ul class="list-disc">${each($searchRelays, (relay) => {
      return `<li class="ml-4">${escape(relay)}</li>`;
    })}</ul></div>
  <hr class="!border-t-2 my-1">
  <div class="text-sm"><ul class="list-disc"><li class="ml-4"><span class="btn variant-filled-primary p-0 w-5"><!-- HTML_TAG_START -->${shareIcon}<!-- HTML_TAG_END --></span> Nostrで共有する
      </li>
      <li class="ml-4"><span class="btn variant-filled-primary p-0 w-5"><!-- HTML_TAG_START -->${openAnotherAppIcon}<!-- HTML_TAG_END --></span> nostr.comで開く
      </li>
      <li class="ml-4"><span class="btn variant-filled-primary rounded-full p-0 w-5"><!-- HTML_TAG_START -->${searchIcon}<!-- HTML_TAG_END --></span> さがす
      </li>
      <li class="ml-4"><span class="btn variant-filled-primary p-0 w-5"><!-- HTML_TAG_START -->${warningOnIcon}<!-- HTML_TAG_END --></span> 全content-warning表示切り替え
      </li></ul></div>

  <div class="arrow bg-surface-100-800-token"></div></div>

<main class="container max-w-5xl px-1 mt-24 mb-12">${`now loading`}</main>

<div class="fixed bottom-0 z-10 w-screen"><div class="btn-group py-0.5 variant-filled-primary w-screen justify-center rounded-none">${validate_component(MyPaginator, "MyPaginator").$$render(
      $$result,
      {
        settings: pages,
        select: "hidden",
        justify: "justify-center",
        showFirstLastButtons: true,
        active: "variant-filled-primary",
        controlVariant: "variant-filled-primary",
        buttonClasses: "!my-0 !py-0 !px-3 place-items-center fill-current"
      },
      {},
      {}
    )}
    
    <button type="button" class="btn variant-filled-primary">${$allView ? `<!-- HTML_TAG_START -->${warningOffIcon}<!-- HTML_TAG_END -->` : `<!-- HTML_TAG_START -->${warningOnIcon}<!-- HTML_TAG_END -->`}</button></div></div>


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
  $$unsubscribe_searchRelays();
  $$unsubscribe_page();
  $$unsubscribe_allView();
  return $$rendered;
});
export {
  Page as default
};
