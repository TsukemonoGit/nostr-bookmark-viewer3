import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape, b as add_attribute, d as each } from "../../chunks/index3.js";
import { $ as $format } from "../../chunks/runtime.esm.js";
import "../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { T as Toast } from "../../chunks/Toast.js";
import "../../chunks/functions.js";
import "nostr-tools";
const Setting = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe($format, (value) => $_ = value);
  let pubkey = "";
  let relays = [];
  let relay;
  let nip05 = "";
  let nip05input;
  let pubkeyinput;
  $$unsubscribe__();
  return `
${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}

<h4 class="h4">${escape($_("settings.page_title"))}</h4>
<div class="py-2 border-solid border-2 border-surface-500/25 mx-4"><ul class="list px-4"><li><span class="badge bg-primary-500"></span><span>${escape($_("settings.intro.1"))}</span></li>
    <li><span class="badge bg-primary-500"></span>
      <span>${escape($_("settings.intro.2"))}</span></li>
    <li><span class="badge bg-primary-500"></span>
      <span>${escape($_("settings.intro.3"))}</span></li></ul></div>

<div class="container my-4"><button class="py-1 btn variant-filled-primary">${escape($_("settings.main.nsec.button"))}</button><span class="ml-1 break-keep">${escape($_("settings.main.nsec.text"))}</span>
  ${``}</div>
<div class="container py-4"><p class="font-medium my-1">${escape($_("settings.main.pubkey.pubkey"))}</p>
  <div class="input-group input-group-divider grid-cols-[auto_1fr]"><button class="py-1 btn variant-filled-secondary break-all whitespace-pre">${escape($_("settings.main.pubkey.button"))}</button>
    <input type="text" class="px-2 text-ellipsis" placeholder="npub1..."${add_attribute("value", pubkey, 0)}${add_attribute("this", pubkeyinput, 0)}></div>
  <div class="text-sm ml-8">${escape($_("settings.main.pubkey.text"))}</div></div>

<div class="container py-4"><p class="my-1"><span class="font-medium">${escape($_("settings.main.relay.relay"))}</span>
    <span class="text-sm ml-5 whitespace-nowrap">${escape($_("settings.main.relay.text1"))}<span class="rounded variant-filled p-1 m-1">${escape($_("settings.main.relay.text2"))}</span>${escape($_("settings.main.relay.text3"))}</span></p>

  <div class="relay input-group input-group-divider grid-cols-[1fr_auto] h-12"><input class="px-2" type="text" placeholder="wss://..." ${""}${add_attribute("value", relay, 0)}>
    <button class="py-1 btn variant-filled">${escape($_("settings.main.relay.button"))}</button></div>
  <ul class="border-solid border-2 border-surface-500/25 mx-8 my-1">${escape($_("settings.main.relay.text4"))}
    ${relays.length > 0 ? `${each(relays, (re, index) => {
    return `<li${add_attribute("value", re, 0)} class="pb-1 px-5"><div class="grid grid-cols-[auto_1fr] items-center"><button class="py-1 px-2 btn variant-filled-primary rounded-full">${escape($_("settings.main.relay.button2"))}</button>
            <div class="break-all">${escape(re)}</div></div>
        </li>`;
  })}` : ``}</ul>

  <div class="mt-4 mx-8">${escape($_("settings.main.relay.text5"))}
    <div class="relay input-group input-group-divider grid-cols-[1fr_auto]"><input class="px-2" type="text" placeholder="example.com" ${""}${add_attribute("value", nip05, 0)}${add_attribute("this", nip05input, 0)}>
      <button class="py-1 btn variant-filled">${escape($_("settings.main.relay.button3"))}</button></div></div></div>

<div class="container py-4"><div class="font-medium"><button>${`${escape($_("settings.main.detail.close"))}`}</button></div>

  ${``}</div>


<button type="button" class="btn variant-filled-secondary rounded-full my-5">Next →</button>

<hr class="mt-5">

<footer class="mt-2 pt-3 pb-2 card-footer variant-glass-primary break-keep text-sm"><div class="flex justify-center"><ul class="list-none"><li class="mx-1 inline whitespace-nowrap"><a href="https://github.com/TsukemonoGit/nostr-bookmark-viewer3" target="_blank" rel="noopener noreferrer" class="underline">Github</a></li>
      <li class="mx-1 inline whitespace-nowrap"><a href="https://nostr.com/npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw" target="_blank" rel="noopener noreferrer" class="underline">mono(Nostr)</a></li>

      <li class="mx-2 inline whitespace-nowrap"><button class="btn variant-ghost-primary h-6 px-2 rounded-full" data-npub="npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw" data-note-id="note1w2896we9rcrearfq5dtexv0hpd7mr5l053vhd8tn5ertgdjnzensdhaynh" data-relays="wss://yabu.me.io,wss://nos.lol,wss://relay-jp.nostr.wirednet.jp,wss://relay.nostr.band">zap⚡️
        </button>
        <script src="https://cdn.jsdelivr.net/npm/nostr-zap@0.21.0"><\/script></li>
      <li class="mx-2 inline whitespace-nowrap">-</li>
      <li class="mx-1 inline whitespace-nowrap"><a href="https://welcome.nostr-jp.org/" target="_blank" rel="noopener noreferrer" class="underline">Nostr</a></li>
      

      <li class="mx-1 inline whitespace-nowrap"><a href="https://github.com/nostr-protocol/nips/blob/master/05.md" target="_blank" rel="noopener noreferrer" class="underline">NIP-05</a></li>
      <li class="mx-1 inline whitespace-nowrap"><a href="https://github.com/nostr-protocol/nips/blob/master/07.md" target="_blank" rel="noopener noreferrer" class="underline">NIP-07</a></li>
      <li class="mx-1 inline whitespace-nowrap"><a href="https://github.com/nostr-protocol/nips/blob/master/51.md" target="_blank" rel="noopener noreferrer" class="underline">NIP-51</a></li></ul></div></footer>

${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe($format, (value) => $_ = value);
  $$unsubscribe__();
  return `${$$result.head += `<!-- HEAD_svelte-1crd95j_START -->${$$result.title = `<title>nostr-bookmark-viewer</title>`, ""}<meta name="description" content="user setting"><meta prefix="og: https://ogp.me/ns#"><meta property="og:title" content="nostr-bookmark-viewer3"><meta property="og:description"${add_attribute("content", $_("settings.description"), 0)}><meta property="og:image" content="https://nostr-bookmark-viewer3.vercel.app/img2.png"><!-- HEAD_svelte-1crd95j_END -->`, ""}

<main class="container max-w-5xl p-2"><h1 class="h1 mb-5">nostr-bookmark-viewer3(v4)</h1>

  ${validate_component(Setting, "Setting").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
