import { c as create_ssr_component, d as createEventDispatcher, e as escape, h as each, b as add_attribute, a as subscribe, v as validate_component } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import "rx-nostr";
import { nip19 } from "nostr-tools";
import "websocket-polyfill";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { n as nowProgress, a as allView, R as RelaysforSearch, M as Modal, P as ProgressRadial } from "../../../../chunks/ModalImage.svelte_svelte_type_style_lang.js";
const leftArrow = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>`;
const rightArrow = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>`;
const leftAngles = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>`;
const rightAngles = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>`;
const cBase = "flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4";
const cLabel = "w-full md:w-auto";
const Paginator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesButtonActive;
  let classesBase;
  let classesLabel;
  let classesSelect;
  let classesControls;
  const dispatch = createEventDispatcher();
  let { settings = {
    offset: 0,
    limit: 5,
    size: 0,
    amounts: [1, 2, 5, 10]
  } } = $$props;
  let { disabled = false } = $$props;
  let { showPreviousNextButtons = true } = $$props;
  let { showFirstLastButtons = false } = $$props;
  let { showNumerals = false } = $$props;
  let { maxNumerals = 1 } = $$props;
  let { justify = "justify-between" } = $$props;
  let { select = "select min-w-[150px]" } = $$props;
  let { amountText = "Items" } = $$props;
  let { regionControl = "btn-group" } = $$props;
  let { controlVariant = "variant-filled" } = $$props;
  let { controlSeparator = "" } = $$props;
  let { active = "variant-filled-primary" } = $$props;
  let { buttonClasses = "!px-3 !py-1.5 fill-current" } = $$props;
  let { buttonTextPrevious = leftArrow } = $$props;
  let { buttonTextNext = rightArrow } = $$props;
  let { buttonTextFirst = leftAngles } = $$props;
  let { buttonTextLast = rightAngles } = $$props;
  let { separatorText = "of" } = $$props;
  let { labelFirst = "First page" } = $$props;
  let { labelPrevious = "Previous page" } = $$props;
  let { labelNext = "Next page" } = $$props;
  let { labelLast = "Last page" } = $$props;
  let lastPage = Math.max(0, Math.ceil(settings.size / settings.limit - 1));
  let controlPages = getNumerals();
  function onChangeLength() {
    settings.offset = 0;
    dispatch("amount", settings.limit);
    lastPage = Math.max(0, Math.ceil(settings.size / settings.limit - 1));
    controlPages = getNumerals();
  }
  function getFullNumerals() {
    const pages = [];
    for (let index = 0; index <= lastPage; index++) {
      pages.push(index);
    }
    return pages;
  }
  function getNumerals() {
    const pages = [];
    const isWithinLeftSection = settings.offset < maxNumerals + 2;
    const isWithinRightSection = settings.offset > lastPage - (maxNumerals + 2);
    if (lastPage <= maxNumerals * 2 + 1)
      return getFullNumerals();
    pages.push(0);
    if (!isWithinLeftSection)
      pages.push(-1);
    if (isWithinLeftSection || isWithinRightSection) {
      const sectionStart = isWithinLeftSection ? 1 : lastPage - (maxNumerals + 2);
      const sectionEnd = isWithinRightSection ? lastPage - 1 : maxNumerals + 2;
      for (let i = sectionStart; i <= sectionEnd; i++) {
        pages.push(i);
      }
    } else {
      for (let i = settings.offset - maxNumerals; i <= settings.offset + maxNumerals; i++) {
        pages.push(i);
      }
    }
    if (!isWithinRightSection)
      pages.push(-1);
    pages.push(lastPage);
    return pages;
  }
  function updateSize(size) {
    lastPage = Math.max(0, Math.ceil(size / settings.limit - 1));
    controlPages = getNumerals();
  }
  if ($$props.settings === void 0 && $$bindings.settings && settings !== void 0)
    $$bindings.settings(settings);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.showPreviousNextButtons === void 0 && $$bindings.showPreviousNextButtons && showPreviousNextButtons !== void 0)
    $$bindings.showPreviousNextButtons(showPreviousNextButtons);
  if ($$props.showFirstLastButtons === void 0 && $$bindings.showFirstLastButtons && showFirstLastButtons !== void 0)
    $$bindings.showFirstLastButtons(showFirstLastButtons);
  if ($$props.showNumerals === void 0 && $$bindings.showNumerals && showNumerals !== void 0)
    $$bindings.showNumerals(showNumerals);
  if ($$props.maxNumerals === void 0 && $$bindings.maxNumerals && maxNumerals !== void 0)
    $$bindings.maxNumerals(maxNumerals);
  if ($$props.justify === void 0 && $$bindings.justify && justify !== void 0)
    $$bindings.justify(justify);
  if ($$props.select === void 0 && $$bindings.select && select !== void 0)
    $$bindings.select(select);
  if ($$props.amountText === void 0 && $$bindings.amountText && amountText !== void 0)
    $$bindings.amountText(amountText);
  if ($$props.regionControl === void 0 && $$bindings.regionControl && regionControl !== void 0)
    $$bindings.regionControl(regionControl);
  if ($$props.controlVariant === void 0 && $$bindings.controlVariant && controlVariant !== void 0)
    $$bindings.controlVariant(controlVariant);
  if ($$props.controlSeparator === void 0 && $$bindings.controlSeparator && controlSeparator !== void 0)
    $$bindings.controlSeparator(controlSeparator);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.buttonClasses === void 0 && $$bindings.buttonClasses && buttonClasses !== void 0)
    $$bindings.buttonClasses(buttonClasses);
  if ($$props.buttonTextPrevious === void 0 && $$bindings.buttonTextPrevious && buttonTextPrevious !== void 0)
    $$bindings.buttonTextPrevious(buttonTextPrevious);
  if ($$props.buttonTextNext === void 0 && $$bindings.buttonTextNext && buttonTextNext !== void 0)
    $$bindings.buttonTextNext(buttonTextNext);
  if ($$props.buttonTextFirst === void 0 && $$bindings.buttonTextFirst && buttonTextFirst !== void 0)
    $$bindings.buttonTextFirst(buttonTextFirst);
  if ($$props.buttonTextLast === void 0 && $$bindings.buttonTextLast && buttonTextLast !== void 0)
    $$bindings.buttonTextLast(buttonTextLast);
  if ($$props.separatorText === void 0 && $$bindings.separatorText && separatorText !== void 0)
    $$bindings.separatorText(separatorText);
  if ($$props.labelFirst === void 0 && $$bindings.labelFirst && labelFirst !== void 0)
    $$bindings.labelFirst(labelFirst);
  if ($$props.labelPrevious === void 0 && $$bindings.labelPrevious && labelPrevious !== void 0)
    $$bindings.labelPrevious(labelPrevious);
  if ($$props.labelNext === void 0 && $$bindings.labelNext && labelNext !== void 0)
    $$bindings.labelNext(labelNext);
  if ($$props.labelLast === void 0 && $$bindings.labelLast && labelLast !== void 0)
    $$bindings.labelLast(labelLast);
  classesButtonActive = (page2) => {
    return page2 === settings.offset ? `${active} pointer-events-none` : "";
  };
  {
    onChangeLength();
  }
  {
    updateSize(settings.size);
  }
  classesBase = `${cBase} ${justify} ${$$props.class ?? ""}`;
  classesLabel = `${cLabel}`;
  classesSelect = `${select}`;
  classesControls = `${regionControl} ${controlVariant} ${controlSeparator}`;
  return `<div class="${"paginator " + escape(classesBase, true)}" data-testid="paginator"> ${settings.amounts.length ? `<label class="${"paginator-label " + escape(classesLabel, true)}"><select class="${"paginator-select " + escape(classesSelect, true)}" ${disabled ? "disabled" : ""} aria-label="Select Amount">${each(settings.amounts, (amount) => {
    return `<option${add_attribute("value", amount, 0)}>${escape(amount)} ${escape(amountText)}</option>`;
  })}</select></label>` : ``}  <div class="${"paginator-controls " + escape(classesControls, true)}"> ${showFirstLastButtons ? `<button type="button"${add_attribute("aria-label", labelFirst, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || settings.offset === 0 ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextFirst}<!-- HTML_TAG_END --></button>` : ``}  ${showPreviousNextButtons ? `<button type="button"${add_attribute("aria-label", labelPrevious, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || settings.offset === 0 ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextPrevious}<!-- HTML_TAG_END --></button>` : ``}  ${showNumerals === false ? ` <button type="button" class="${escape(buttonClasses, true) + " pointer-events-none !text-sm"}">${escape(settings.offset * settings.limit + 1)}-${escape(Math.min(settings.offset * settings.limit + settings.limit, settings.size))} <span class="opacity-50">${escape(separatorText)} ${escape(settings.size)}</span></button>` : ` ${each(controlPages, (page2) => {
    return `<button type="button" class="${escape(buttonClasses, true) + " " + escape(classesButtonActive(page2), true)}">${escape(page2 >= 0 ? page2 + 1 : "...")} </button>`;
  })}`}  ${showPreviousNextButtons ? `<button type="button"${add_attribute("aria-label", labelNext, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || (settings.offset + 1) * settings.limit >= settings.size ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextNext}<!-- HTML_TAG_END --></button>` : ``}  ${showFirstLastButtons ? `<button type="button"${add_attribute("aria-label", labelLast, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || (settings.offset + 1) * settings.limit >= settings.size ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextLast}<!-- HTML_TAG_END --></button>` : ``}</div></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".tabGroup.svelte-pws32x{flex:1;max-width:calc(100vw - 8em);position:relative}",
  map: null
};
const pagelimit = 50;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $nowProgress, $$unsubscribe_nowProgress;
  let $page, $$unsubscribe_page;
  let $allView, $$unsubscribe_allView;
  $$unsubscribe_nowProgress = subscribe(nowProgress, (value) => $nowProgress = value);
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
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-k2do6u_START -->${$$result.title = `<title>nostr-bookmark-viewer</title>`, ""}<meta name="description" content="${escape(pubkey, true) + "のタグ" + escape(identifier, true) + "のブックマーク"}"><meta prefix="og: https://ogp.me/ns#"><meta property="og:title" content="nostr-bookmark-viewer3"><meta property="og:description" content="${"Nostrのブックマークを見たりできるやつ\n【naddr】\nid:" + escape(identifier, true) + ",\npubkey:" + escape(pubkey, true)}"><meta property="og:image" content="https://nostr-bookmark-viewer3.vercel.app/img2.png"><!-- HEAD_svelte-k2do6u_END -->`, ""} ${validate_component(Modal, "Modal").$$render($$result, {}, {}, {})} <div class="card p-4 w-72 shadow-xl z-20 break-all" data-popup="popupFeatured"><div><p data-svelte-h="svelte-1k5mmuf">【pubkey】</p> <p>${escape(nip19.npubEncode(pubkey))}</p> <p class="mt-2" data-svelte-h="svelte-15xi696">【relays】</p> <ul class="list-disc">${each(relays, (relay) => {
      return `<li class="ml-4">${escape(relay)}</li>`;
    })}</ul></div> <hr class="!border-t-2 my-1"> <div class="text-sm" data-svelte-h="svelte-bn0qjs"><ul class="list-disc"><li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></span> Nostrで共有する</li> <li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="16" width="18" height="4" rx="2" ry="2"></rect><line x1="12" y1="5" x2="12" y2="15"></line><line x1="8" y1="10" x2="12" y2="5"></line><line x1="16" y1="10" x2="12" y2="5"></line></svg></span> 外部アプリで開く</li> <li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3.5 20.5H20.5L12 2Z" fill="#FDD835"></path><path d="M12 15V17" stroke="black" stroke-width="2" stroke-linecap="round"></path><circle cx="12" cy="11" r="1.5" fill="black"></circle></svg></span> 全content-warning表示切り替え</li></ul></div> <hr class="!border-t-2 my-1"> <button type="button" class="btn variant-filled py-1" data-svelte-h="svelte-ktmjal">Go back to Setup</button> <div class="arrow bg-surface-100-800-token"></div></div> <main class="container max-w-5xl px-1 mt-24 mb-12">${`now loading`}</main> <div class="fixed bottom-0 z-10 w-screen"><div class="btn-group py-0.5 variant-filled w-screen justify-center rounded-none">${validate_component(Paginator, "Paginator").$$render(
      $$result,
      {
        settings: pages,
        select: "hidden",
        justify: "justify-center",
        showFirstLastButtons: true
      },
      {},
      {}
    )}  <button type="button" class="btn variant-filled">${$allView ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" fill="#42B983"></circle><path d="M6 18L18 6" stroke="white" stroke-width="2" stroke-linecap="round"></path></svg>` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3.5 20.5H20.5L12 2Z" fill="#FDD835"></path><path d="M12 15V17" stroke="black" stroke-width="2" stroke-linecap="round"></path><circle cx="12" cy="11" r="1.5" fill="black"></circle></svg>`}</button></div></div>  <div class="container max-w-5xl mx-auto z-10">${$nowProgress ? `<div class="fixed bottom-2 right-2">${validate_component(ProgressRadial, "ProgressRadial").$$render(
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
    )}</div>` : ``} </div>`;
  } while (!$$settled);
  $$unsubscribe_nowProgress();
  $$unsubscribe_page();
  $$unsubscribe_allView();
  return $$rendered;
});
export {
  Page as default
};
