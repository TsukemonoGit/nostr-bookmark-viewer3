import { c as create_ssr_component, e as escape, b as add_attribute, f as compute_slots, s as setContext, g as compute_rest_props, h as getContext, i as spread, j as escape_attribute_value, k as escape_object, a as subscribe, v as validate_component, d as each, l as is_promise, n as noop } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
import "rx-nostr";
import { N as NostrApp, T as Text, M as Metadata, C as Content, g as getUserIcon } from "../../../../chunks/Content.js";
import { nip19 } from "nostr-tools";
import "websocket-polyfill";
import { n as nowProgress, b as bookmarkEvents, p as pageNprofile, s as searchRelays, a as allView, R as RelaysforSearch, u as uniqueTags, g as getIdByTag } from "../../../../chunks/functions.js";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { s as shareIcon, o as openAnotherAppIcon, m as moveAnotherListIcon, d as deleteIcon, a as searchIcon, t as tagListIcon, c as addNoteIcon, e as editTagIcon, u as updateListIcon, w as warningOnIcon, b as warningOffIcon, M as Modal, P as ProgressRadial } from "../../../../chunks/Content.svelte_svelte_type_style_lang.js";
import { T as Toast } from "../../../../chunks/Toast.js";
import { M as MyPaginator } from "../../../../chunks/MyPaginator.js";
const cBase$2 = "flex flex-col";
const cRowMain = "grid items-center";
const cRowHeadline = "";
const cSlotLead = "flex-none flex justify-between items-center";
const cSlotDefault = "flex-auto";
const cSlotTrail = "flex-none flex items-center space-x-4";
const AppBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesRowMain;
  let classesRowHeadline;
  let classesSlotLead;
  let classesSlotDefault;
  let classesSlotTrail;
  let $$slots = compute_slots(slots);
  let { background = "bg-surface-100-800-token" } = $$props;
  let { border = "" } = $$props;
  let { padding = "p-4" } = $$props;
  let { shadow = "" } = $$props;
  let { spacing = "space-y-4" } = $$props;
  let { gridColumns = "grid-cols-[auto_1fr_auto]" } = $$props;
  let { gap = "gap-4" } = $$props;
  let { regionRowMain = "" } = $$props;
  let { regionRowHeadline = "" } = $$props;
  let { slotLead = "" } = $$props;
  let { slotDefault = "" } = $$props;
  let { slotTrail = "" } = $$props;
  let { label = "" } = $$props;
  let { labelledby = "" } = $$props;
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.gridColumns === void 0 && $$bindings.gridColumns && gridColumns !== void 0)
    $$bindings.gridColumns(gridColumns);
  if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0)
    $$bindings.gap(gap);
  if ($$props.regionRowMain === void 0 && $$bindings.regionRowMain && regionRowMain !== void 0)
    $$bindings.regionRowMain(regionRowMain);
  if ($$props.regionRowHeadline === void 0 && $$bindings.regionRowHeadline && regionRowHeadline !== void 0)
    $$bindings.regionRowHeadline(regionRowHeadline);
  if ($$props.slotLead === void 0 && $$bindings.slotLead && slotLead !== void 0)
    $$bindings.slotLead(slotLead);
  if ($$props.slotDefault === void 0 && $$bindings.slotDefault && slotDefault !== void 0)
    $$bindings.slotDefault(slotDefault);
  if ($$props.slotTrail === void 0 && $$bindings.slotTrail && slotTrail !== void 0)
    $$bindings.slotTrail(slotTrail);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  classesBase = `${cBase$2} ${background} ${border} ${spacing} ${padding} ${shadow} ${$$props.class ?? ""}`;
  classesRowMain = `${cRowMain} ${gridColumns} ${gap} ${regionRowMain}`;
  classesRowHeadline = `${cRowHeadline} ${regionRowHeadline}`;
  classesSlotLead = `${cSlotLead} ${slotLead}`;
  classesSlotDefault = `${cSlotDefault} ${slotDefault}`;
  classesSlotTrail = `${cSlotTrail} ${slotTrail}`;
  return `<div class="${"app-bar " + escape(classesBase, true)}" data-testid="app-bar" role="toolbar"${add_attribute("aria-label", label, 0)}${add_attribute("aria-labelledby", labelledby, 0)}>
	<div class="${"app-bar-row-main " + escape(classesRowMain, true)}">
		${$$slots.lead ? `<div class="${"app-bar-slot-lead " + escape(classesSlotLead, true)}">${slots.lead ? slots.lead({}) : ``}</div>` : ``}
		
		<div class="${"app-bar-slot-default " + escape(classesSlotDefault, true)}">${slots.default ? slots.default({}) : ``}</div>
		
		${$$slots.trail ? `<div class="${"app-bar-slot-trail " + escape(classesSlotTrail, true)}">${slots.trail ? slots.trail({}) : ``}</div>` : ``}</div>
	
	${$$slots.headline ? `<div class="${"app-bar-row-headline " + escape(classesRowHeadline, true)}">${slots.headline ? slots.headline({}) : ``}</div>` : ``}</div>`;
});
const cBase$1 = "space-y-4";
const cList = "flex overflow-x-auto hide-scrollbar";
const cPanel = "";
const TabGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesList;
  let classesPanel;
  let $$slots = compute_slots(slots);
  let { justify = "justify-start" } = $$props;
  let { border = "border-b border-surface-400-500-token" } = $$props;
  let { active = "border-b-2 border-surface-900-50-token" } = $$props;
  let { hover = "hover:variant-soft" } = $$props;
  let { flex = "flex-none" } = $$props;
  let { padding = "px-4 py-2" } = $$props;
  let { rounded = "rounded-tl-container-token rounded-tr-container-token" } = $$props;
  let { spacing = "space-y-1" } = $$props;
  let { regionList = "" } = $$props;
  let { regionPanel = "" } = $$props;
  let { labelledby = "" } = $$props;
  let { panel = "" } = $$props;
  setContext("active", active);
  setContext("hover", hover);
  setContext("flex", flex);
  setContext("padding", padding);
  setContext("rounded", rounded);
  setContext("spacing", spacing);
  if ($$props.justify === void 0 && $$bindings.justify && justify !== void 0)
    $$bindings.justify(justify);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.flex === void 0 && $$bindings.flex && flex !== void 0)
    $$bindings.flex(flex);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.regionList === void 0 && $$bindings.regionList && regionList !== void 0)
    $$bindings.regionList(regionList);
  if ($$props.regionPanel === void 0 && $$bindings.regionPanel && regionPanel !== void 0)
    $$bindings.regionPanel(regionPanel);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  if ($$props.panel === void 0 && $$bindings.panel && panel !== void 0)
    $$bindings.panel(panel);
  classesBase = `${cBase$1} ${$$props.class ?? ""}`;
  classesList = `${cList} ${justify} ${border} ${regionList}`;
  classesPanel = `${cPanel} ${regionPanel}`;
  return `<div class="${"tab-group " + escape(classesBase, true)}" data-testid="tab-group">
	<div class="${"tab-list " + escape(classesList, true)}" role="tablist"${add_attribute("aria-labelledby", labelledby, 0)}>${slots.default ? slots.default({}) : ``}</div>
	
	${$$slots.panel ? `<div class="${"tab-panel " + escape(classesPanel, true)}" role="tabpanel"${add_attribute("aria-labelledby", panel, 0)} tabindex="0">${slots.panel ? slots.panel({}) : ``}</div>` : ``}</div>`;
});
const cBase = "text-center cursor-pointer transition-colors duration-100";
const cInterface = "";
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let classesActive;
  let classesBase;
  let classesInterface;
  let classesTab;
  let $$restProps = compute_rest_props($$props, [
    "group",
    "name",
    "value",
    "title",
    "controls",
    "regionTab",
    "active",
    "hover",
    "flex",
    "padding",
    "rounded",
    "spacing"
  ]);
  let $$slots = compute_slots(slots);
  let { group } = $$props;
  let { name } = $$props;
  let { value } = $$props;
  let { title = "" } = $$props;
  let { controls = "" } = $$props;
  let { regionTab = "" } = $$props;
  let { active = getContext("active") } = $$props;
  let { hover = getContext("hover") } = $$props;
  let { flex = getContext("flex") } = $$props;
  let { padding = getContext("padding") } = $$props;
  let { rounded = getContext("rounded") } = $$props;
  let { spacing = getContext("spacing") } = $$props;
  let elemInput;
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.controls === void 0 && $$bindings.controls && controls !== void 0)
    $$bindings.controls(controls);
  if ($$props.regionTab === void 0 && $$bindings.regionTab && regionTab !== void 0)
    $$bindings.regionTab(regionTab);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.flex === void 0 && $$bindings.flex && flex !== void 0)
    $$bindings.flex(flex);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  selected = value === group;
  classesActive = selected ? active : hover;
  classesBase = `${cBase} ${flex} ${padding} ${rounded} ${classesActive} ${$$props.class ?? ""}`;
  classesInterface = `${cInterface} ${spacing}`;
  classesTab = `${regionTab}`;
  return `<label${add_attribute("class", classesBase, 0)}${add_attribute("title", title, 0)}>
	<div class="${"tab " + escape(classesTab, true)}" data-testid="tab" role="tab"${add_attribute("aria-controls", controls, 0)}${add_attribute("aria-selected", selected, 0)}${add_attribute("tabindex", selected ? 0 : -1, 0)}>
		<div class="h-0 w-0 overflow-hidden"><input${spread(
    [
      { type: "radio" },
      { name: escape_attribute_value(name) },
      { value: escape_attribute_value(value) },
      escape_object(prunedRestProps()),
      { tabindex: "-1" }
    ],
    {}
  )}${add_attribute("this", elemInput, 0)}${value === group ? add_attribute("checked", true, 1) : ""}></div>
		
		<div class="${"tab-interface " + escape(classesInterface, true)}">${$$slots.lead ? `<div class="tab-lead">${slots.lead ? slots.lead({}) : ``}</div>` : ``}
			<div class="tab-label">${slots.default ? slots.default({}) : ``}</div></div></div></label>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".tabGroup.svelte-1enlxmt.svelte-1enlxmt{flex:1;max-width:calc(min(100vw, 64rem) - 8em);position:relative}.delete-note.svelte-1enlxmt.svelte-1enlxmt{background-color:rgba(107, 255, 181, 0.274)}.btn-group.svelte-1enlxmt button.svelte-1enlxmt{padding-right:0.5rem;padding-left:0.5rem}@media(min-width: 768px){.btn-group.svelte-1enlxmt button.svelte-1enlxmt{margin-left:1rem;margin-right:1rem}}",
  map: null
};
const pagelimit = 50;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let paginatedSource;
  let $nowProgress, $$unsubscribe_nowProgress;
  let $bookmarkEvents, $$unsubscribe_bookmarkEvents;
  let $page, $$unsubscribe_page;
  let $$unsubscribe_pageNprofile;
  let $searchRelays, $$unsubscribe_searchRelays;
  let $allView, $$unsubscribe_allView;
  $$unsubscribe_nowProgress = subscribe(nowProgress, (value) => $nowProgress = value);
  $$unsubscribe_bookmarkEvents = subscribe(bookmarkEvents, (value) => $bookmarkEvents = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_pageNprofile = subscribe(pageNprofile, (value) => value);
  $$unsubscribe_searchRelays = subscribe(searchRelays, (value) => $searchRelays = value);
  $$unsubscribe_allView = subscribe(allView, (value) => $allView = value);
  const { type, data } = nip19.decode($page.params.nprofile);
  const { pubkey, relays, dtype } = type === "nprofile" ? {
    pubkey: data.pubkey,
    relays: data.relays && data.relays.length > 0 ? data.relays : RelaysforSearch,
    dtype: "nprofile"
  } : type === "npub" ? {
    pubkey: data,
    relays: RelaysforSearch,
    dtype: "npub"
  } : { pubkey: "", relays: [], dtype: "error" };
  let isPageOwner;
  let tabSet = 0;
  let bkm = "pub";
  let viewContents;
  let message = "now loading";
  let URLPreview = true;
  let deleteNoteIndexes = [];
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
    paginatedSource = viewContents;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-xcwp0l_START -->${$$result.title = `<title>nostr-bookmark-viewer</title>`, ""}<meta name="description" content="${escape(pubkey, true) + "のブックマーク一覧"}"><meta prefix="og: https://ogp.me/ns#"><meta property="og:title" content="nostr-bookmark-viewer3"><meta property="og:description" content="${"Nostrのブックマークを見たりできるやつ\n【nprofile】\npubkey:" + escape(pubkey, true)}"><meta property="og:image" content="https://nostr-bookmark-viewer3.vercel.app/img2.png"><!-- HEAD_svelte-xcwp0l_END -->`, ""}
${validate_component(Modal, "Modal").$$render($$result, {}, {}, {})}
${validate_component(Toast, "Toast").$$render($$result, { zIndex: "z-[999999]" }, {}, {})}

<div class="card border border-purple-800 p-4 w-[22rem] shadow-xl z-20 break-all max-h-[80%] overflow-auto" data-popup="popupFeatured">${!$nowProgress ? `<button type="button" class="btn variant-filled-secondary py-1 my-2">Go back to Setup</button>` : ``}
  <hr class="!border-t-2 my-1">
  <div><p>【設定情報】</p>
    <ul class="list-disc"><li class="ml-4">タイプ: ${escape(dtype)}
        ${escape(dtype === "npub" ? "(readonly)" : "")}</li>
      <li class="ml-4">プレビュー表示: ${escape("ON")}</li>
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
  <div class="text-sm grid grid-cols-[0.5fr_0.5fr]"><div class="grid grid-cols-[auto_1fr] gap-1"><span class="btn variant-filled-primary p-0 my-0.5 h-5 w-5"><!-- HTML_TAG_START -->${shareIcon}<!-- HTML_TAG_END --></span> Nostrで共有する
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1"><span class="btn variant-filled-primary p-0 my-0.5 h-5 w-5"><!-- HTML_TAG_START -->${openAnotherAppIcon}<!-- HTML_TAG_END --></span> nostr.comで開く
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1"><span class="btn variant-filled-primary p-0 my-0.5 h-5 w-5"><!-- HTML_TAG_START -->${moveAnotherListIcon}<!-- HTML_TAG_END --></span> 他のリストに移動
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1"><span class="btn variant-filled-primary p-0 my-0.5 h-5 w-5"><!-- HTML_TAG_START -->${deleteIcon}<!-- HTML_TAG_END --></span> リストから削除
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1"><span class="btn variant-filled-primary rounded-full p-0 w-5"><!-- HTML_TAG_START -->${searchIcon}<!-- HTML_TAG_END --></span> さがす
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1"><span class="btn variant-filled-primary p-0 my-0.5 h-5 w-5"><!-- HTML_TAG_START -->${tagListIcon}<!-- HTML_TAG_END --></span> タグの一覧
    </div>

    <div class="grid grid-cols-[auto_1fr] gap-1"><span class="btn variant-filled-primary p-0 my-0.5 h-5 w-5"><!-- HTML_TAG_START -->${addNoteIcon}<!-- HTML_TAG_END --></span> ノートの追加
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1"><span class="btn variant-filled-primary p-0 my-0.5 h-5 w-5"><!-- HTML_TAG_START -->${editTagIcon}<!-- HTML_TAG_END --></span> タグの編集
    </div>

    <div class="grid grid-cols-[auto_1fr] gap-1"><span class="btn variant-filled-primary p-0 my-0.5 h-5 w-5"><!-- HTML_TAG_START -->${updateListIcon}<!-- HTML_TAG_END --></span> リストの更新
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1"><span class="btn variant-filled-primary p-0 my-0.5 h-5 w-5"><!-- HTML_TAG_START -->${warningOnIcon}<!-- HTML_TAG_END --></span> 全content-warning表示切り替え
    </div>

    <div class="grid grid-cols-[auto_1fr] gap-1"><span class="btn variant-filled-primary rounded-full p-0 h-5">mode</span> 複数選択との切り替え
    </div></div>

  <div class="arrow bg-surface-100-800-token"></div></div>

<main class="container max-w-5xl px-1 mt-24 mb-20">${!$bookmarkEvents || $bookmarkEvents.length === 0 ? `<div class="break-all whitespace-pre-wrap"><!-- HTML_TAG_START -->${message}<!-- HTML_TAG_END --></div>` : ``}
  <div class="w-full fixed top-0 left-1/2 transform -translate-x-1/2 z-10"><div class="max-w-screen-lg m-auto z-10">${validate_component(AppBar, "AppBar").$$render(
      $$result,
      {
        gridColumns: "grid grid-cols-[auto_1fr_auto]",
        slotDefault: "place-self-center",
        slotTrail: "place-self-end",
        padding: "p-0",
        background: "bg-surface-300-600-token ",
        gap: "gap-0"
      },
      {},
      {
        trail: () => {
          return `<div class="pr-2 text-center justify-center">${dtype === "nprofile" ? `${`<button type="button" class="btn-icon variant-filled-surface">Login</button>`}` : `<div class="flex variant-filled-surface rounded-full px-2 text-sm">read<br>only
              </div>`}</div>
        `;
        },
        lead: () => {
          return `<div class="lead-icon pl-2 z-20"><button class="btn-icon variant-filled-surface">📝</button></div>
        `;
        },
        default: () => {
          return `${$bookmarkEvents && $bookmarkEvents.length > 0 ? `<div class="tabGroup svelte-1enlxmt">${validate_component(TabGroup, "TabGroup").$$render(
            $$result,
            {
              padding: "py-3 px-4",
              justify: "justify",
              active: "variant-filled-secondary",
              hover: "hover:variant-soft-secondary",
              border: "border-b border-surface-400-500-token",
              rounded: "rounded-tl-container-token rounded-tr-container-token"
            },
            {},
            {
              default: () => {
                return `${each($bookmarkEvents, (reaction, index) => {
                  return `${!$nowProgress ? `${validate_component(Tab, "Tab").$$render(
                    $$result,
                    {
                      name: reaction.tags[0][1],
                      value: index,
                      group: tabSet
                    },
                    {
                      group: ($$value) => {
                        tabSet = $$value;
                        $$settled = false;
                      }
                    },
                    {
                      default: () => {
                        return `${escape(reaction.tags[0][1])}
                  `;
                      }
                    }
                  )}` : ``}`;
                })}`;
              }
            }
          )}</div>` : ``}`;
        }
      }
    )}

      ${$bookmarkEvents && $bookmarkEvents.length > 0 ? `
        ${validate_component(TabGroup, "TabGroup").$$render(
      $$result,
      {
        justify: "justify-center",
        flex: "flex-1",
        rounded: "",
        class: "bg-surface-50/80 dark:bg-surface-800/80 w-full drop-shadow"
      },
      {},
      {
        default: () => {
          return `${!$nowProgress ? `${validate_component(Tab, "Tab").$$render(
            $$result,
            { name: "pub", value: "pub", group: bkm },
            {
              group: ($$value) => {
                bkm = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `public
            `;
              }
            }
          )}
            ${``}` : ``}`;
        }
      }
    )}` : ``}</div></div>
  ${`${validate_component(NostrApp, "NostrApp").$$render($$result, { relays: $searchRelays }, {}, {
      default: () => {
        return `${paginatedSource ? `${each(paginatedSource, (id, index) => {
          return `${id[0] !== "d" ? `<div class="${"card drop-shadow px-1 py-2 my-1.5 grid grid-cols-[1fr_auto] gap-1 " + escape(deleteNoteIndexes.includes(index) ? "delete-note" : "", true) + " svelte-1enlxmt"}">${function(__value) {
            if (is_promise(__value)) {
              __value.then(null, noop);
              return `
                <div class="grid grid-rows-[auto_auto] gap-0"><div class="font-bold">${escape(id[0])}</div>
                  <div class="flex">${each(id.slice(1), (item) => {
                return `<div class="flex flex-wrap px-1 mx-1 break-all">${escape(item)}
                      </div>`;
              })}
                  </div></div>
              `;
            }
            return function(hexId) {
              return `
                ${hexId.tag[0] === "e" || hexId.tag[0] === "a" ? `${validate_component(Text, "Text").$$render($$result, { queryKey: [hexId.id], id: hexId.id }, {}, {
                nodata: ({ text }) => {
                  return `<div slot="nodata"><div class="grid grid-cols-[auto_1fr] gap-1 flex"><div class="flex justify-center items-center h-auto"><button class="btn m-0 p-1 variant-filled-primary rounded-full"><!-- HTML_TAG_START -->${searchIcon}<!-- HTML_TAG_END --></button></div>
                        <div class="text-sm break-all overflow-hidden">Note not found (${escape(hexId.id)})
                        </div></div>
                    </div>`;
                },
                error: ({ text }) => {
                  return `<div slot="error"><div class="grid grid-cols-[auto_1fr] gap-1 flex"><div class="flex justify-center items-center h-auto"><button class="btn m-0 p-1 variant-filled-primary rounded-full"><!-- HTML_TAG_START -->${searchIcon}<!-- HTML_TAG_END --></button></div>
                        <div class="text-sm break-all overflow-hidden">Failed to get note (${escape(hexId.id)})
                        </div></div>
                    </div>`;
                },
                loading: ({ text }) => {
                  return `<div slot="loading"><div class="grid grid-cols-[auto_1fr] gap-1 flex"><div class="flex justify-center items-center h-auto"><button class="btn m-0 p-1 variant-filled-primary rounded-full"><!-- HTML_TAG_START -->${searchIcon}<!-- HTML_TAG_END --></button></div>
                        <div class="text-sm break-all overflow-hidden">Loading note... (${escape(hexId.id)})
                        </div></div>
                    </div>`;
                },
                default: ({ text }) => {
                  return `${validate_component(Metadata, "Metadata").$$render(
                    $$result,
                    {
                      queryKey: ["metadata", text.pubkey],
                      pubkey: text.pubkey
                    },
                    {},
                    {
                      nodata: ({ metadata }) => {
                        return `<div slot="nodata"><div class="text-sm break-all overflow-hidden">Profile not found (${escape(text.pubkey)})
                        </div>
                        <button class="text-sm underline decoration-secondary-500">${escape(new Date(text.created_at * 1e3).toLocaleString())}</button>
                        <div class="parent-container break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
                          $$result,
                          {
                            text: text.content,
                            tag: text.tags,
                            id: text.id,
                            view: $allView,
                            URLPreview,
                            isPageOwner
                          },
                          {},
                          {}
                        )}</div>
                      </div>`;
                      },
                      error: ({ metadata }) => {
                        return `<div slot="error"><div class="text-sm break-all overflow-hidden">Failed to get profile (${escape(text.pubkey)})
                        </div>
                        <button class="text-sm underline decoration-secondary-500">${escape(new Date(text.created_at * 1e3).toLocaleString())}</button>
                        <div class="parent-container break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
                          $$result,
                          {
                            text: text.content,
                            tag: text.tags,
                            id: text.id,
                            view: $allView,
                            URLPreview,
                            isPageOwner
                          },
                          {},
                          {}
                        )}</div>
                      </div>`;
                      },
                      loading: ({ metadata }) => {
                        return `<div slot="loading"><div class="text-sm break-all overflow-hidden">Loading profile... (${escape(text.pubkey)})
                        </div>
                        <button class="text-sm underline decoration-secondary-500">${escape(new Date(text.created_at * 1e3).toLocaleString())}</button>
                        <div class="parent-container break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
                          $$result,
                          {
                            text: text.content,
                            tag: text.tags,
                            id: text.id,
                            view: $allView,
                            URLPreview,
                            isPageOwner
                          },
                          {},
                          {}
                        )}</div>
                      </div>`;
                      },
                      default: ({ metadata }) => {
                        return `<div class="grid grid-cols-[auto_1fr] gap-1"><div class="w-12 h-12 rounded-full flex justify-center overflow-hidden bg-surface-500/25 mt-1">${JSON.parse(metadata.content).picture ? `${function(__value2) {
                          if (is_promise(__value2)) {
                            __value2.then(null, noop);
                            return `
                              <div class="flex justify-center items-center text-sm">loading
                              </div>
                            `;
                          }
                          return function(imageUrl) {
                            return `
                              <img class="w-12 object-contain justify-center"${add_attribute("src", imageUrl, 0)} alt="avatar">
                            `;
                          }(__value2);
                        }(getUserIcon(JSON.parse(metadata.content).picture, $page.url.origin))}` : ``}</div>
                        <div class="grid grid-rows-[auto_auto_auto] gap-0 break-all w-full"><div class="w-full grid grid-cols-[auto_1fr_auto] gap-1 h-fix"><div class="font-bold wi truncate justify-items-end">${escape(JSON.parse(metadata.content).display_name)}</div>
                            <div class="truncate wid min-w-[2em] justify-items-end"><button class="text-emerald-800 dark:text-blue-500 text-sm">@<u>${escape(JSON.parse(metadata.content).name)}</u></button></div>
                            <div class="min-w-max"><button class="text-sm underline decoration-secondary-500">${escape(new Date(text.created_at * 1e3).toLocaleString())}</button>
                            </div></div>
                          ${uniqueTags(text.tags).length > 0 ? `<div class="max-h-[6em] overflow-auto whitespace-nowrap border-s-4 border-s-rose-800/25 dark:border-s-rose-100/25">${each(uniqueTags(text.tags), (tag) => {
                          return `${tag[0] === "p" ? `${validate_component(Metadata, "Metadata").$$render(
                            $$result,
                            {
                              queryKey: ["metadata", tag[1]],
                              pubkey: tag[1]
                            },
                            {},
                            {
                              nodata: ({ metadata: metadata2 }) => {
                                return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] ${escape(tag[1])}</div>
                                    </div>`;
                              },
                              error: ({ metadata: metadata2 }) => {
                                return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] ${escape(tag[1])}</div>
                                    </div>`;
                              },
                              loading: ({ metadata: metadata2 }) => {
                                return `<div slot="loading"><div class="-mt- px-2 opacity-60 text-sm overflow-hidden">to[p] ${escape(tag[1])}</div>
                                    </div>`;
                              },
                              default: ({ metadata: metadata2 }) => {
                                return `<div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] <button class="text-emerald-800 dark:text-blue-400 overflow-hidden text-ellipsis">@<u>${escape(JSON.parse(metadata2.content).name)}</u></button></div>
                                  `;
                              }
                            }
                          )}` : `${tag[0] === "e" || tag[0] === "q" ? `${validate_component(Text, "Text").$$render($$result, { queryKey: [tag[1]], id: tag[1] }, {}, {
                            nodata: ({ text: text2 }) => {
                              return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}] ${escape(tag[1])}</div>
                                    </div>`;
                            },
                            error: ({ text: text2 }) => {
                              return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}] ${escape(tag[1])}</div>
                                    </div>`;
                            },
                            loading: ({ text: text2 }) => {
                              return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}] ${escape(tag[1])}</div>
                                    </div>`;
                            },
                            default: ({ text: text2 }) => {
                              return `<div class="-mt-0.5 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden">[${escape(tag[0])}]
                                      <button class="text-emerald-800 dark:text-blue-400 whitespace-nowrap overflow-hidden text-ellipsis">${text2.tags.some((tag2) => tag2[0] === "content-warning") && $allView == false ? `${escape("<content-warning>")}
                                        ` : `${escape(text2.content)}
                                        `}</button></div>
                                  `;
                            }
                          })}` : `<div class="-mt-0.5 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden">[${escape(tag[0])}]
                                    ${escape(tag[1])}
                                  </div>`}`}`;
                        })}
                            </div>` : ``}
                          <div class="parent-container break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
                          $$result,
                          {
                            text: text.content,
                            tag: text.tags,
                            id: text.id,
                            view: $allView,
                            URLPreview,
                            isPageOwner
                          },
                          {},
                          {}
                        )}</div>
                        </div></div>
                    `;
                      }
                    }
                  )}
                  `;
                }
              })}` : `<div class="grid grid-rows-[auto_auto] gap-0"><div class="font-bold">${escape(id[0])}</div>
                    <div class="flex">${each(id.slice(1), (item) => {
                return `<div class="flex flex-wrap px-1 mx-1 break-all">${escape(item)}
                        </div>`;
              })}</div>
                  </div>`}

                

                <div class="${"flex flex-col flex-wrap h-16 " + escape("", true)}">${`${id[0] === "e" || id[0] === "a" ? `
                      ${validate_component(Text, "Text").$$render($$result, { queryKey: [hexId.id], id: hexId.id }, {}, {
                nodata: ({ text }) => {
                  return `<button slot="nodata" class="btn p-0 mt-1 variant-filled-primary justify-self-end w-5"><!-- HTML_TAG_START -->${shareIcon}<!-- HTML_TAG_END -->
                        </button>`;
                },
                error: ({ text }) => {
                  return `<button slot="error" class="btn p-0 mt-1 variant-filled-primary justify-self-end w-5"><!-- HTML_TAG_START -->${shareIcon}<!-- HTML_TAG_END -->
                        </button>`;
                },
                loading: ({ text }) => {
                  return `<button slot="loading" class="btn p-0 mt-1 variant-filled-primary justify-self-end w-5"><!-- HTML_TAG_START -->${shareIcon}<!-- HTML_TAG_END -->
                        </button>`;
                },
                default: ({ text }) => {
                  return `<button class="btn p-0 mt-1 variant-filled-primary justify-self-end w-5"><!-- HTML_TAG_START -->${shareIcon}<!-- HTML_TAG_END --></button>
                      `;
                }
              })}

                      
                      <button class="btn p-0 mt-1 variant-filled-primary justify-self-end w-5"><!-- HTML_TAG_START -->${openAnotherAppIcon}<!-- HTML_TAG_END -->
                      </button>` : ``}
                    ${``}`}</div>
              `;
            }(__value);
          }(getIdByTag(id))}
            </div>` : ``}`;
        })}` : ``}`;
      }
    })}`}</main>

<div class="fixed bottom-0 z-10 w-screen"><div class="btn-group py-0.5 variant-filled-primary w-screen justify-center rounded-none svelte-1enlxmt">${!$nowProgress ? `${``}
      

      <button class="mx-0 svelte-1enlxmt"><!-- HTML_TAG_START -->${shareIcon}<!-- HTML_TAG_END --></button>
      
      <button class="mx-0 svelte-1enlxmt"><!-- HTML_TAG_START -->${updateListIcon}<!-- HTML_TAG_END --></button>
      
      <div class="ml-2">${validate_component(MyPaginator, "MyPaginator").$$render(
      $$result,
      {
        settings: pages,
        select: "hidden",
        justify: "justify-between",
        showFirstLastButtons: true,
        active: "variant-filled-primary",
        controlVariant: "variant-filled-primary",
        buttonClasses: "!my-0 !py-0 !px-2.5 place-items-center fill-current"
      },
      {},
      {}
    )}</div>

      
      <button type="button" class="btn variant-filled-primary svelte-1enlxmt">${$allView ? `<!-- HTML_TAG_START -->${warningOffIcon}<!-- HTML_TAG_END -->` : `<!-- HTML_TAG_START -->${warningOnIcon}<!-- HTML_TAG_END -->`}</button>` : ``}</div></div>


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
  $$unsubscribe_bookmarkEvents();
  $$unsubscribe_page();
  $$unsubscribe_pageNprofile();
  $$unsubscribe_searchRelays();
  $$unsubscribe_allView();
  return $$rendered;
});
export {
  Page as default
};
