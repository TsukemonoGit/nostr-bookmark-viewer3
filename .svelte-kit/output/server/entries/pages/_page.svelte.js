import { c as create_ssr_component, s as setContext, e as escape, b as add_attribute, g as getContext, d as createEventDispatcher, f as compute_slots, v as validate_component, h as each } from "../../chunks/ssr.js";
import "../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { T as Toast } from "../../chunks/Toast.js";
import "nostr-tools";
import "rx-nostr";
const TreeView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let { width = "w-full" } = $$props;
  let { spacing = "space-y-1" } = $$props;
  let { padding = "py-4 px-4" } = $$props;
  let { indent = "ml-4" } = $$props;
  let { hover = "hover:variant-soft" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { caretOpen = "rotate-180" } = $$props;
  let { caretClosed = "" } = $$props;
  let { hyphenOpacity = "opacity-10" } = $$props;
  let { regionSummary = "" } = $$props;
  let { regionSymbol = "" } = $$props;
  let { regionChildren = "" } = $$props;
  let { labelledby = "" } = $$props;
  setContext("padding", padding);
  setContext("indent", indent);
  setContext("hover", hover);
  setContext("rounded", rounded);
  setContext("caretOpen", caretOpen);
  setContext("caretClosed", caretClosed);
  setContext("hyphenOpacity", hyphenOpacity);
  setContext("regionSummary", regionSummary);
  setContext("regionSymbol", regionSymbol);
  setContext("regionChildren", regionChildren);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.indent === void 0 && $$bindings.indent && indent !== void 0)
    $$bindings.indent(indent);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.caretOpen === void 0 && $$bindings.caretOpen && caretOpen !== void 0)
    $$bindings.caretOpen(caretOpen);
  if ($$props.caretClosed === void 0 && $$bindings.caretClosed && caretClosed !== void 0)
    $$bindings.caretClosed(caretClosed);
  if ($$props.hyphenOpacity === void 0 && $$bindings.hyphenOpacity && hyphenOpacity !== void 0)
    $$bindings.hyphenOpacity(hyphenOpacity);
  if ($$props.regionSummary === void 0 && $$bindings.regionSummary && regionSummary !== void 0)
    $$bindings.regionSummary(regionSummary);
  if ($$props.regionSymbol === void 0 && $$bindings.regionSymbol && regionSymbol !== void 0)
    $$bindings.regionSymbol(regionSymbol);
  if ($$props.regionChildren === void 0 && $$bindings.regionChildren && regionChildren !== void 0)
    $$bindings.regionChildren(regionChildren);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  classesBase = `${width} ${spacing} ${$$props.class ?? ""}`;
  return `<div class="${"tree " + escape(classesBase, true)}" data-testid="tree" role="tree" aria-multiselectable="true"${add_attribute("aria-label", labelledby, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const cBase = "";
const cSummary = "list-none flex items-center cursor-pointer";
const cSymbol = "fill-current w-3 text-center transition-transform duration-[200ms]";
const cChildren = "";
const TreeViewItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesCaretState;
  let classesBase;
  let classesSummary;
  let classesSymbol;
  let classesCaret;
  let classesHyphen;
  let classesChildren;
  let $$slots = compute_slots(slots);
  let { open = false } = $$props;
  let { spacing = "space-x-4" } = $$props;
  let { padding = getContext("padding") } = $$props;
  let { indent = getContext("indent") } = $$props;
  let { hover = getContext("hover") } = $$props;
  let { rounded = getContext("rounded") } = $$props;
  let { caretOpen = getContext("caretOpen") } = $$props;
  let { caretClosed = getContext("caretClosed") } = $$props;
  let { hyphenOpacity = getContext("hyphenOpacity") } = $$props;
  let { regionSummary = "" } = $$props;
  let { regionSymbol = getContext("regionSymbol") } = $$props;
  let { regionChildren = getContext("regionChildren") } = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.indent === void 0 && $$bindings.indent && indent !== void 0)
    $$bindings.indent(indent);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.caretOpen === void 0 && $$bindings.caretOpen && caretOpen !== void 0)
    $$bindings.caretOpen(caretOpen);
  if ($$props.caretClosed === void 0 && $$bindings.caretClosed && caretClosed !== void 0)
    $$bindings.caretClosed(caretClosed);
  if ($$props.hyphenOpacity === void 0 && $$bindings.hyphenOpacity && hyphenOpacity !== void 0)
    $$bindings.hyphenOpacity(hyphenOpacity);
  if ($$props.regionSummary === void 0 && $$bindings.regionSummary && regionSummary !== void 0)
    $$bindings.regionSummary(regionSummary);
  if ($$props.regionSymbol === void 0 && $$bindings.regionSymbol && regionSymbol !== void 0)
    $$bindings.regionSymbol(regionSymbol);
  if ($$props.regionChildren === void 0 && $$bindings.regionChildren && regionChildren !== void 0)
    $$bindings.regionChildren(regionChildren);
  {
    dispatch("toggle", { open });
  }
  classesCaretState = open ? caretOpen : caretClosed;
  classesBase = `${cBase} ${$$props.class ?? ""}`;
  classesSummary = `${cSummary} ${spacing} ${rounded} ${padding} ${hover} ${regionSummary}`;
  classesCaret = `${classesCaretState}`;
  classesSymbol = `${cSymbol} ${classesCaret} ${regionSymbol}`;
  classesHyphen = `${hyphenOpacity}`;
  classesChildren = `${cChildren} ${indent} ${regionChildren}`;
  return `<details class="${"tree-item " + escape(classesBase, true)}" data-testid="tree-item"${add_attribute("open", open, 1)}><summary class="${"tree-item-summary " + escape(classesSummary, true)}" role="treeitem" aria-selected="false"${add_attribute("aria-expanded", $$slots.children ? open : void 0, 0)}> <div class="${"tree-summary-symbol " + escape(classesSymbol, true)}">${$$slots.children ? ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="${"w-3 " + escape(classesHyphen, true)}"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path></svg>`}</div>  ${$$slots.lead ? `<div class="tree-item-lead">${slots.lead ? slots.lead({}) : ``}</div>` : ``}  <div class="tree-item-content">${slots.default ? slots.default({}) : ``}</div></summary> <div class="${"tree-item-children " + escape(classesChildren, true)}" role="group">${slots.children ? slots.children({}) : ``}</div></details>`;
});
const Setting = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pubkey;
  let relays = [];
  let relay;
  let searchRelays = [];
  let URLPreview;
  let loadEvent;
  return ` ${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})} <h4 class="h4" data-svelte-h="svelte-16c0o95">ぶくまびうあ</h4> <div class="py-2 border-solid border-2 border-surface-500/25 mx-4" data-svelte-h="svelte-9m4l72"><ul class="list px-4"><li><span class="badge bg-primary-500"></span><span>kind:30001に保存されているリストを取得、表示します。</span></li> <li><span class="badge bg-primary-500"></span> <span>ブックマークを取得する公開鍵を設定し、接続するリレーをリレーリストに追加してください。</span></li></ul></div> <div class="container my-4"><p class="font-medium" data-svelte-h="svelte-wysn2h">公開鍵(public key)</p> <div class="input-group input-group-divider grid-cols-[auto_1fr]"><button class="py-1 btn variant-filled-secondary" data-svelte-h="svelte-1hz24r2">use NIP-07 <br>Extension</button> <input type="text" class="px-2 text-ellipsis" placeholder="npub1..."${add_attribute("value", pubkey, 0)}></div> <div class="text-sm mx-8" data-svelte-h="svelte-zqdljx">※use NIP-07 Extension:
    拡張機能に有効なリレー(write)を設定している場合リレーリストを上書きします</div></div> <div class="container py-4"><p data-svelte-h="svelte-1yajjfg"><span class="font-medium mr-1">リレー(relay)</span>
    URLを入力したら<span class="rounded-full variant-filled p-1 m-1">add relay</span>をクリックしてください</p> <div class="relay input-group input-group-divider grid-cols-[1fr_auto] h-12"><input class="px-2" type="text" placeholder="wss://..." ${""}${add_attribute("value", relay, 0)}> <button class="py-1 btn variant-filled" data-svelte-h="svelte-1b0yryc">add relay</button></div> <ul class="border-solid border-2 border-surface-500/25 mx-8 my-1">リレーリスト
    ${relays.length > 0 ? `${each(relays, (re, index) => {
    return `<li${add_attribute("value", re, 0)} class="pb-1 px-5"><button class="py-1 btn variant-filled-primary rounded-full" data-svelte-h="svelte-tnp5qv">delete</button> ${escape(re)} </li>`;
  })}` : ``}</ul></div> ${validate_component(TreeView, "TreeView").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(TreeViewItem, "TreeViewItem").$$render($$result, {}, {}, {
        children: () => {
          return `<p data-svelte-h="svelte-1rj39i3">nextボタンをおしたときに設定が保存されます</p> <p data-svelte-h="svelte-ritfjv">とりあえずnprofileの方だけに適応</p> <p data-svelte-h="svelte-1r6vtq6">(naddrのほうはデフォルトのまま)</p> ${validate_component(TreeViewItem, "TreeViewItem").$$render($$result, {}, {}, {
            children: () => {
              return `<button type="button" class="btn variant-filled-surface mb-3 mt-1" data-svelte-h="svelte-3g2kz0">デフォルトに戻す</button> <div class="relay input-group input-group-divider grid-cols-[1fr_auto] h-12"><input class="px-2" type="text" placeholder="wss://..." ${""}${add_attribute("value", relay, 0)}> <button class="py-1 btn variant-filled" data-svelte-h="svelte-c6azqe">add relay</button></div> <ul class="border-solid border-2 border-surface-500/25 mx-8 my-1">リレーリスト
            ${searchRelays.length > 0 ? `${each(searchRelays, (re, index) => {
                return `<li${add_attribute("value", re, 0)} class="pb-1 px-5"><button class="py-1 btn variant-filled-primary rounded-full" data-svelte-h="svelte-10fmxvy">delete</button> ${escape(re)} </li>`;
              })}` : ``}</ul>  `;
            },
            default: () => {
              return `検索用リレー`;
            }
          })} ${validate_component(TreeViewItem, "TreeViewItem").$$render($$result, {}, {}, {
            children: () => {
              return `<button type="button" class="btn variant-filled-surface mb-3 mt-1" data-svelte-h="svelte-rtolm0">デフォルトに戻す</button> <label class="flex items-center space-x-2"><input class="checkbox" type="checkbox"${add_attribute("checked", URLPreview, 1)}> <p data-svelte-h="svelte-1lztin3">自動的に画像を読み込む、URLプレビューを表示する</p></label> <label class="flex items-center space-x-2"><input class="checkbox" type="checkbox"${add_attribute("checked", loadEvent, 1)}> <p data-svelte-h="svelte-1qoym74">イベントの内容を自動で読み込む</p></label> `;
            },
            default: () => {
              return `軽量用設定`;
            }
          })} `;
        },
        default: () => {
          return `詳細設定`;
        }
      })}`;
    }
  })} <button type="button" class="btn variant-filled-secondary rounded-full my-5" data-svelte-h="svelte-1wo8dyr">Next →</button> <hr> <div data-svelte-h="svelte-7ydtvi">Github: <a href="https://github.com/TsukemonoGit/nostr-bookmark-viewer3" target="_blank" rel="noopener noreferrer">TsukemonoGit/nostr-bookmark-viewer3</a> <br>
  Author:
  <a href="https://nostx.shino3.net/npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw" target="_blank" rel="noopener noreferrer">mono(Nostr)</a></div> ${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1ive41a_START -->${$$result.title = `<title>nostr-bookmark-viewer</title>`, ""}<meta name="description" content="user setting"><meta prefix="og: https://ogp.me/ns#"><meta property="og:title" content="nostr-bookmark-viewer3"><meta property="og:description" content="Nostrのブックマークをみたりできるやつ"><meta property="og:image" content="https://nostr-bookmark-viewer3.vercel.app/img2.png"><!-- HEAD_svelte-1ive41a_END -->`, ""} <main class="container max-w-5xl p-2"><h1 class="h1 mb-5" data-svelte-h="svelte-1wndn91">nostr-bookmark-viewer3(v4)</h1> ${validate_component(Setting, "Setting").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
