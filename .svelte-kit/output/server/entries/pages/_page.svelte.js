import { c as create_ssr_component, v as validate_component, b as add_attribute, d as each, e as escape } from "../../chunks/index2.js";
import "../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { T as Toast } from "../../chunks/Toast.js";
import "nostr-tools";
import "rx-nostr";
import "html-dom-parser";
const Setting = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pubkey;
  let relays = [];
  let relay;
  return `
${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}

<h4 class="h4">はじめに</h4>
<div class="py-2 border-solid border-2 border-surface-500/25 mx-4"><ul class="list px-4"><li><span class="badge bg-primary-500"></span><span>kind:30001に保存されているリストを取得、表示します。</span></li>
    <li><span class="badge bg-primary-500"></span>
      <span>ブックマークを取得する公開鍵を設定し、接続するリレーをリレーリストに追加してください。</span></li></ul></div>

<div class="container my-4"><p class="font-medium">公開鍵(public key)</p>
  <div class="input-group input-group-divider grid-cols-[auto_1fr]"><button class="py-1 btn variant-filled-secondary">use NIP-07 <br>Extension</button>
    <input type="text" class="px-2 text-ellipsis" placeholder="npub1..."${add_attribute("value", pubkey, 0)}></div>
  <div class="text-sm mx-8">※use NIP-07 Extension:
    拡張機能に有効なリレー(write)を設定している場合リレーリストを上書きします
  </div></div>

<div class="container py-4"><p><span class="font-medium mr-1">リレー(relay)</span>
    URLを入力したら<span class="rounded-full variant-filled p-1 m-1">add relay</span>をクリックしてください
  </p>
  <div class="relay input-group input-group-divider grid-cols-[1fr_auto] h-12"><input class="px-2" type="text" placeholder="wss://..." ${""}${add_attribute("value", relay, 0)}>
    <button class="py-1 btn variant-filled">add relay</button></div>
  <ul class="border-solid border-2 border-surface-500/25 mx-8 my-1">リレーリスト
    ${relays.length > 0 ? `${each(relays, (re, index) => {
    return `<li${add_attribute("value", re, 0)} class="pb-1 px-5"><button class="py-1 btn variant-filled-primary rounded-full">delete</button>
          ${escape(re)}
        </li>`;
  })}` : ``}</ul></div>

<button type="button" class="btn variant-filled-secondary rounded-full my-5">Next →</button>

<hr>

<div>Github: <a href="https://github.com/TsukemonoGit/nostr-bookmark-viewer3" target="_blank" rel="noopener noreferrer">TsukemonoGit/nostr-bookmark-viewer3</a> <br>
  Author:
  <a href="https://nostx.shino3.net/npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw" target="_blank" rel="noopener noreferrer">mono(Nostr)</a></div>

${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-e8dcyd_START -->${$$result.title = `<title>nostr-bookmark-viewer</title>`, ""}<meta prefix="og: https://ogp.me/ns#"><meta property="og:title" content="nostr-bookmark-viewer3"><meta property="og:description" content="Nostrのぶっくまーくみたりできるやつ"><meta property="og:image" content="https://nostr-bookmark-viewer3.vercel.app/img2.png"><!-- HEAD_svelte-e8dcyd_END -->`, ""}

<main class="container max-w-5xl p-2"><h1 class="h1 mb-5">nostr-bookmark-viewer3(v4)</h1>

  ${validate_component(Setting, "Setting").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
