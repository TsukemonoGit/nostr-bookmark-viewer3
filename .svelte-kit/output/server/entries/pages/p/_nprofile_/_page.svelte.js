import { c as create_ssr_component, e as escape, b as add_attribute, f as compute_slots, s as setContext, g as compute_rest_props, h as getContext, i as spread, j as escape_attribute_value, k as escape_object, o as onDestroy, v as validate_component, a as subscribe, n as noop, d as each } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { createRxNostr } from "rx-nostr";
import { QueryClient } from "@tanstack/query-core";
import { w as writable } from "../../../../chunks/index.js";
import { pipe, map, scan, from, startWith } from "rxjs";
import { nip19 } from "nostr-tools";
import "websocket-polyfill";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { n as nowProgress, b as bookmarkEvents, R as RelaysforSearch, M as Modal, P as ProgressRadial } from "../../../../chunks/ModalImage.svelte_svelte_type_style_lang.js";
import { T as Toast } from "../../../../chunks/Toast.js";
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
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */
const app = writable();
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */
function scanArray() {
  return scan((acc, a) => [...acc, a], []);
}
function collectGroupBy(f) {
  return pipe(scanArray(), map((xs) => {
    const dict = /* @__PURE__ */ new Map();
    xs.forEach((x) => {
      const key = f(x);
      const value = dict.get(key);
      if (value) {
        dict.set(key, [...value, x]);
      } else {
        dict.set(key, [x]);
      }
    });
    return dict;
  }));
}
function scanLatestEach(f) {
  return pipe(collectGroupBy(f), map((dict) => Array.from(dict.entries()).map(([, value]) => value.slice(-1)[0])));
}
const _contextKey = "$$_queryClient";
const setQueryClientContext = (client) => {
  setContext(_contextKey, client);
};
const QueryClientProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { client = new QueryClient() } = $$props;
  setQueryClientContext(client);
  onDestroy(() => {
    client.unmount();
  });
  if ($$props.client === void 0 && $$bindings.client && client !== void 0)
    $$bindings.client(client);
  return `${slots.default ? slots.default({}) : ``}`;
});
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */
function useConnections({ rxNostr, relays }) {
  if (relays.length === 0) {
    return from([[]]);
  }
  const init = relays.map((relay) => {
    const from2 = typeof relay === "string" ? relay : relay.url;
    const state = rxNostr.hasRelay(from2) ? rxNostr.getRelayState(from2) : "not-started";
    return { from: from2, state };
  });
  return rxNostr.createConnectionStateObservable().pipe(startWith(...init), scanLatestEach(({ from: from2 }) => from2));
}
const NostrApp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let connections;
  let mergedQueryClientConfig;
  let queryClient;
  let $connections, $$unsubscribe_connections = noop, $$subscribe_connections = () => ($$unsubscribe_connections(), $$unsubscribe_connections = subscribe(connections, ($$value) => $connections = $$value), connections);
  let { queryClientConfig = {} } = $$props;
  let { relays = [] } = $$props;
  const rxNostr = createRxNostr();
  const defaultQueryClientConfig = {
    defaultOptions: {
      queries: {
        staleTime: 1e3 * 60,
        refetchInterval: Infinity
      }
    }
  };
  onDestroy(() => {
    rxNostr.dispose();
  });
  if ($$props.queryClientConfig === void 0 && $$bindings.queryClientConfig && queryClientConfig !== void 0)
    $$bindings.queryClientConfig(queryClientConfig);
  if ($$props.relays === void 0 && $$bindings.relays && relays !== void 0)
    $$bindings.relays(relays);
  $$subscribe_connections(connections = useConnections({ rxNostr, relays }));
  mergedQueryClientConfig = {
    ...defaultQueryClientConfig,
    ...queryClientConfig
  };
  queryClient = new QueryClient(mergedQueryClientConfig);
  {
    {
      rxNostr.setRelays(relays);
      app.set({ rxNostr });
    }
  }
  $$unsubscribe_connections();
  return `${validate_component(QueryClientProvider, "QueryClientProvider").$$render($$result, { client: queryClient }, {}, {
    default: () => {
      return `${slots.default ? slots.default({ connections: $connections }) : ``}`;
    }
  })}`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".tabGroup.svelte-cq9msn{flex:1;max-width:calc(min(100vw, 64rem) - 8em);position:relative}.delete-note.svelte-cq9msn{background-color:yellow}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $nowProgress, $$unsubscribe_nowProgress;
  let $bookmarkEvents, $$unsubscribe_bookmarkEvents;
  let $page, $$unsubscribe_page;
  $$unsubscribe_nowProgress = subscribe(nowProgress, (value) => $nowProgress = value);
  $$unsubscribe_bookmarkEvents = subscribe(bookmarkEvents, (value) => $bookmarkEvents = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const { type, data } = nip19.decode($page.params.nprofile);
  const { pubkey, relays } = type === "nprofile" && data.relays ? { pubkey: data.pubkey, relays: data.relays } : { pubkey: "", relays: [] };
  let tabSet = 0;
  let bkm = "pub";
  let message = "now loading";
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-kwvnh9_START --><meta prefix="og: https://ogp.me/ns#"><meta property="og:title" content="nostr-bookmark-viewer3"><meta property="og:description" content="${"nprofile:pubkey:" + escape(pubkey, true)}"><meta property="og:image" content="https://nostr-bookmark-viewer3.vercel.app/img.png"><!-- HEAD_svelte-kwvnh9_END -->`, ""}
${validate_component(Modal, "Modal").$$render($$result, {}, {}, {})}
${validate_component(Toast, "Toast").$$render($$result, { zIndex: "z-[999999]" }, {}, {})}

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
      </li>
      <li class="ml-4"><span class="btn variant-filled p-0 w-5">→</span> 他のリストに移動
      </li>
      <li class="ml-4"><span class="btn variant-filled p-0 w-5">🗑</span> リストから削除
      </li>
      <li class="ml-4"><span class="btn variant-filled-primary p-0 w-5 rounded-full">↻</span> リストの更新）
      </li>

      <li class="ml-4"><span class="btn variant-filled-primary p-0 rounded-full">mode</span> 複数選択との切り替え）
      </li></ul></div>
  <hr class="!border-t-2 my-1">
  <button type="button" class="btn variant-filled py-1">Go back to Setup</button>
  <div class="arrow bg-surface-100-800-token"></div></div>

<main class="container max-w-5xl px-1 mt-24 mb-12">${!$bookmarkEvents || $bookmarkEvents.length === 0 ? `${escape(message)}` : `<div class="w-full fixed top-0 left-1/2 transform -translate-x-1/2 z-10"><div class="max-w-screen-lg m-auto z-10">${validate_component(AppBar, "AppBar").$$render(
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
          return `<div class="pr-2 text-center justify-center">${`<button type="button" class="btn-icon variant-filled">Login</button>`}</div>
          `;
        },
        lead: () => {
          return `<div class="lead-icon pl-2 z-20"><button class="btn-icon variant-filled">📝</button></div>
          `;
        },
        default: () => {
          return `<div class="tabGroup svelte-cq9msn">${validate_component(TabGroup, "TabGroup").$$render(
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
          )}</div>`;
        }
      }
    )}

        
        ${validate_component(TabGroup, "TabGroup").$$render(
      $$result,
      {
        justify: "justify-center",
        flex: "flex-1",
        rounded: "",
        class: "bg-surface-50/80 w-full drop-shadow"
      },
      {},
      {
        default: () => {
          return `${validate_component(Tab, "Tab").$$render(
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
          ${``}`;
        }
      }
    )}</div></div>

    ${validate_component(NostrApp, "NostrApp").$$render($$result, { relays: RelaysforSearch }, {}, {
      default: () => {
        return `${``}`;
      }
    })}`}</main>



<div class="container max-w-5xl mx-auto z-10">${!$nowProgress ? `<div class="fixed bottom-2">${``}

      
      <button type="button" class="btn-icon variant-filled-surface mx-1">共有</button>
      
      <button type="button" class="btn-icon variant-filled-surface mx-1">↻</button></div>` : `<div class="fixed bottom-2 right-2">${validate_component(ProgressRadial, "ProgressRadial").$$render(
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
    )}</div>`}
</div>`;
  } while (!$$settled);
  $$unsubscribe_nowProgress();
  $$unsubscribe_bookmarkEvents();
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
