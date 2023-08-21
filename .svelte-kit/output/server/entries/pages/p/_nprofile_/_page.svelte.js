import { c as create_ssr_component, e as escape, b as add_attribute, f as compute_slots, s as setContext, i as compute_rest_props, g as getContext, j as spread, k as escape_attribute_value, l as escape_object, d as createEventDispatcher, h as each, a as subscribe, v as validate_component } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import "rx-nostr";
import { nip19 } from "nostr-tools";
import "websocket-polyfill";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { n as nowProgress, b as bookmarkEvents, a as allView, M as Modal, P as ProgressRadial } from "../../../../chunks/ModalImage.svelte_svelte_type_style_lang.js";
import { T as Toast } from "../../../../chunks/Toast.js";
const cBase$3 = "flex flex-col";
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
  classesBase = `${cBase$3} ${background} ${border} ${spacing} ${padding} ${shadow} ${$$props.class ?? ""}`;
  classesRowMain = `${cRowMain} ${gridColumns} ${gap} ${regionRowMain}`;
  classesRowHeadline = `${cRowHeadline} ${regionRowHeadline}`;
  classesSlotLead = `${cSlotLead} ${slotLead}`;
  classesSlotDefault = `${cSlotDefault} ${slotDefault}`;
  classesSlotTrail = `${cSlotTrail} ${slotTrail}`;
  return `<div class="${"app-bar " + escape(classesBase, true)}" data-testid="app-bar" role="toolbar"${add_attribute("aria-label", label, 0)}${add_attribute("aria-labelledby", labelledby, 0)}> <div class="${"app-bar-row-main " + escape(classesRowMain, true)}"> ${$$slots.lead ? `<div class="${"app-bar-slot-lead " + escape(classesSlotLead, true)}">${slots.lead ? slots.lead({}) : ``}</div>` : ``}  <div class="${"app-bar-slot-default " + escape(classesSlotDefault, true)}">${slots.default ? slots.default({}) : ``}</div>  ${$$slots.trail ? `<div class="${"app-bar-slot-trail " + escape(classesSlotTrail, true)}">${slots.trail ? slots.trail({}) : ``}</div>` : ``}</div>  ${$$slots.headline ? `<div class="${"app-bar-row-headline " + escape(classesRowHeadline, true)}">${slots.headline ? slots.headline({}) : ``}</div>` : ``}</div>`;
});
const cBase$2 = "space-y-4";
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
  classesBase = `${cBase$2} ${$$props.class ?? ""}`;
  classesList = `${cList} ${justify} ${border} ${regionList}`;
  classesPanel = `${cPanel} ${regionPanel}`;
  return `  <div class="${"tab-group " + escape(classesBase, true)}" data-testid="tab-group"> <div class="${"tab-list " + escape(classesList, true)}" role="tablist"${add_attribute("aria-labelledby", labelledby, 0)}>${slots.default ? slots.default({}) : ``}</div>  ${$$slots.panel ? `<div class="${"tab-panel " + escape(classesPanel, true)}" role="tabpanel"${add_attribute("aria-labelledby", panel, 0)} tabindex="0">${slots.panel ? slots.panel({}) : ``}</div>` : ``}</div>`;
});
const cBase$1 = "text-center cursor-pointer transition-colors duration-100";
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
  classesBase = `${cBase$1} ${flex} ${padding} ${rounded} ${classesActive} ${$$props.class ?? ""}`;
  classesInterface = `${cInterface} ${spacing}`;
  classesTab = `${regionTab}`;
  return `<label${add_attribute("class", classesBase, 0)}${add_attribute("title", title, 0)}> <div class="${"tab " + escape(classesTab, true)}" data-testid="tab" role="tab"${add_attribute("aria-controls", controls, 0)}${add_attribute("aria-selected", selected, 0)}${add_attribute("tabindex", selected ? 0 : -1, 0)}> <div class="h-0 w-0 overflow-hidden"><input${spread(
    [
      { type: "radio" },
      { name: escape_attribute_value(name) },
      { value: escape_attribute_value(value) },
      escape_object(prunedRestProps()),
      { tabindex: "-1" }
    ],
    {}
  )}${add_attribute("this", elemInput, 0)}${value === group ? add_attribute("checked", true, 1) : ""}></div>  <div class="${"tab-interface " + escape(classesInterface, true)}">${$$slots.lead ? `<div class="tab-lead">${slots.lead ? slots.lead({}) : ``}</div>` : ``} <div class="tab-label">${slots.default ? slots.default({}) : ``}</div></div></div></label>`;
});
const leftArrow = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>`;
const rightArrow = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>`;
const leftAngles = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>`;
const rightAngles = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>`;
const cBase = "flex flex-col  items-center ";
const cLabel = "w-full md:w-auto";
const MyPaginator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lastPage;
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
  let controlPages = getNumerals();
  function onChangeLength() {
    settings.offset = 0;
    dispatch("amount", settings.limit);
    lastPage = Math.ceil(settings.size / settings.limit - 1);
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
  lastPage = Math.ceil(settings.size / settings.limit - 1);
  classesButtonActive = /** @type {number} */
  (page2) => {
    return page2 === settings.offset ? `${active} pointer-events-none` : "";
  };
  {
    onChangeLength();
  }
  classesBase = `${cBase} ${justify} ${$$props.class ?? ""}`;
  classesLabel = `${cLabel}`;
  classesSelect = `${select}`;
  classesControls = `${regionControl} ${controlVariant} ${controlSeparator}`;
  return `<div class="${"paginator " + escape(classesBase, true) + " h-full"}" data-testid="paginator"> ${settings.amounts.length ? `<label class="${"paginator-label " + escape(classesLabel, true)}"><select class="${"paginator-select " + escape(classesSelect, true)}" ${disabled ? "disabled" : ""} aria-label="Select Amount">${each(settings.amounts, (amount) => {
    return `<option${add_attribute("value", amount, 0)}>${escape(amount)} ${escape(amountText)}</option>`;
  })}</select></label>` : ``}  <div class="${"paginator-controls " + escape(classesControls, true) + " h-full"}"> ${showFirstLastButtons ? `<button type="button"${add_attribute("class", buttonClasses, 0)} ${disabled || settings.offset === 0 ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextFirst}<!-- HTML_TAG_END --></button>` : ``}  ${showPreviousNextButtons ? `<button type="button"${add_attribute("class", buttonClasses, 0)} ${disabled || settings.offset === 0 ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextPrevious}<!-- HTML_TAG_END --></button>` : ``}  ${showNumerals === false ? ` <button type="button" class="pointer-events-none !text-sm !p-0"><div class="whitespace-pre-line">${escape(settings.offset * settings.limit + 1)}-${escape(Math.min(settings.offset * settings.limit + settings.limit, settings.size))} <div class="opacity-50">of ${escape(settings.size)}</div></div></button>` : ` ${each(controlPages, (page2) => {
    return `<button type="button" class="${escape(buttonClasses, true) + " " + escape(classesButtonActive(page2), true)}">${escape(page2 >= 0 ? page2 + 1 : "...")} </button>`;
  })}`}  ${showPreviousNextButtons ? `<button type="button"${add_attribute("class", buttonClasses, 0)} ${disabled || (settings.offset + 1) * settings.limit >= settings.size ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextNext}<!-- HTML_TAG_END --></button>` : ``}  ${showFirstLastButtons ? `<button type="button"${add_attribute("class", buttonClasses, 0)} ${disabled || (settings.offset + 1) * settings.limit >= settings.size ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextLast}<!-- HTML_TAG_END --></button>` : ``}</div></div>`;
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
  let $allView, $$unsubscribe_allView;
  $$unsubscribe_nowProgress = subscribe(nowProgress, (value) => $nowProgress = value);
  $$unsubscribe_bookmarkEvents = subscribe(bookmarkEvents, (value) => $bookmarkEvents = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_allView = subscribe(allView, (value) => $allView = value);
  const { type, data } = nip19.decode($page.params.nprofile);
  const { pubkey, relays } = type === "nprofile" && data.relays ? { pubkey: data.pubkey, relays: data.relays } : { pubkey: "", relays: [] };
  let tabSet = 0;
  let bkm = "pub";
  let viewContents;
  let message = "now loading";
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
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-xcwp0l_START -->${$$result.title = `<title>nostr-bookmark-viewer</title>`, ""}<meta name="description" content="${escape(pubkey, true) + "のブックマーク一覧"}"><meta prefix="og: https://ogp.me/ns#"><meta property="og:title" content="nostr-bookmark-viewer3"><meta property="og:description" content="${"Nostrのブックマークを見たりできるやつ\n【nprofile】\npubkey:" + escape(pubkey, true)}"><meta property="og:image" content="https://nostr-bookmark-viewer3.vercel.app/img2.png"><!-- HEAD_svelte-xcwp0l_END -->`, ""} ${validate_component(Modal, "Modal").$$render($$result, {}, {}, {})} ${validate_component(Toast, "Toast").$$render($$result, { zIndex: "z-[999999]" }, {}, {})} <div class="card p-4 w-72 shadow-xl z-20 break-all" data-popup="popupFeatured"><div><p data-svelte-h="svelte-1k5mmuf">【pubkey】</p> <p>${escape(nip19.npubEncode(pubkey))}</p> <p class="mt-2" data-svelte-h="svelte-15xi696">【relays】</p> <ul class="list-disc">${each(relays, (relay) => {
      return `<li class="ml-4">${escape(relay)}</li>`;
    })}</ul></div> <hr class="!border-t-2 my-1"> <div class="text-sm" data-svelte-h="svelte-1dbd1o9"><ul class="list-disc"><li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></span> Nostrで共有する</li> <li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="16" width="18" height="4" rx="2" ry="2"></rect><line x1="12" y1="5" x2="12" y2="15"></line><line x1="8" y1="10" x2="12" y2="5"></line><line x1="16" y1="10" x2="12" y2="5"></line></svg></span> 外部アプリで開く</li> <li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-45)"><path d="M9 5l7 7-7 7"></path><path d="M5 12h14"></path></svg></span> 他のリストに移動</li> <li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span> リストから削除</li> <li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></span> タグの一覧</li> <li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"></path></svg></span> ノートの追加</li> <li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="6" x2="12" y2="12"></line><line x1="8" y1="6" x2="8" y2="12"></line><line x1="16" y1="6" x2="16" y2="12"></line><line x1="3" y1="16" x2="21" y2="16"></line></svg></span> タグの編集</li> <li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M1 12h4M20 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg></span> リストの更新</li> <li class="ml-4"><span class="btn variant-filled p-0 w-5"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3.5 20.5H20.5L12 2Z" fill="#FDD835"></path><path d="M12 15V17" stroke="black" stroke-width="2" stroke-linecap="round"></path><circle cx="12" cy="11" r="1.5" fill="black"></circle></svg></span> 全content-warning表示切り替え</li> <li class="ml-4"><span class="btn variant-filled-primary p-0 rounded-full">mode</span> 複数選択との切り替え</li></ul></div> <hr class="!border-t-2 my-1"> <button type="button" class="btn variant-filled py-1" data-svelte-h="svelte-ktmjal">Go back to Setup</button> <div class="arrow bg-surface-100-800-token"></div></div> <main class="container max-w-5xl px-1 mt-24 mb-20">${!$bookmarkEvents || $bookmarkEvents.length === 0 ? `${escape(message)}` : `<div class="w-full fixed top-0 left-1/2 transform -translate-x-1/2 z-10"><div class="max-w-screen-lg m-auto z-10">${validate_component(AppBar, "AppBar").$$render(
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
          return `<div class="pr-2 text-center justify-center">${`<button type="button" class="btn-icon variant-filled" data-svelte-h="svelte-1um6b1t">Login</button>`}</div> `;
        },
        lead: () => {
          return `<div class="lead-icon pl-2 z-20"><button class="btn-icon variant-filled" data-svelte-h="svelte-1h5lwy3">📝</button></div> `;
        },
        default: () => {
          return `<div class="tabGroup svelte-1enlxmt">${validate_component(TabGroup, "TabGroup").$$render(
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
                        return `${escape(reaction.tags[0][1])} `;
                      }
                    }
                  )}` : ``}`;
                })}`;
              }
            }
          )}</div>`;
        }
      }
    )}  ${validate_component(TabGroup, "TabGroup").$$render(
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
                return `public`;
              }
            }
          )} ${``}` : ``}`;
        }
      }
    )}</div></div> ${`${paginatedSource ? ` ${each(paginatedSource, (id, index) => {
      return `${id[0] === "e" ? `<div class="card drop-shadow px-1 py-2 my-1.5 grid grid-cols-[1fr_auto_auto] gap-1">${escape(nip19.noteEncode(id[1]))}   <button class="btn p-0 mt-1 variant-filled justify-self-end w-5" data-svelte-h="svelte-wxk1z6"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></button>  <button class="btn p-0 mt-1 variant-filled justify-self-end w-5" data-svelte-h="svelte-1lruzdc"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="16" width="18" height="4" rx="2" ry="2"></rect><line x1="12" y1="5" x2="12" y2="15"></line><line x1="8" y1="10" x2="12" y2="5"></line><line x1="16" y1="10" x2="12" y2="5"></line></svg> </button></div> ` : ``}`;
    })}` : ``}`}`}</main> <div class="fixed bottom-0 z-10 w-screen"><div class="btn-group py-0.5 variant-filled w-screen justify-center rounded-none svelte-1enlxmt">${!$nowProgress ? `${``}  <button class="mx-0 svelte-1enlxmt" data-svelte-h="svelte-1rnn5f"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></button>  <button class="mx-0 svelte-1enlxmt" data-svelte-h="svelte-1qdp0x8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M1 12h4M20 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg></button>  <div class="ml-2">${validate_component(MyPaginator, "MyPaginator").$$render(
      $$result,
      {
        settings: pages,
        select: "hidden",
        justify: "justify-between",
        showFirstLastButtons: true,
        buttonClasses: " !my-0 !py-0 !px-2.5 place-items-center fill-current"
      },
      {},
      {}
    )}</div>  <button type="button" class="btn variant-filled svelte-1enlxmt">${$allView ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" fill="#42B983"></circle><path d="M6 18L18 6" stroke="white" stroke-width="2" stroke-linecap="round"></path></svg>` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3.5 20.5H20.5L12 2Z" fill="#FDD835"></path><path d="M12 15V17" stroke="black" stroke-width="2" stroke-linecap="round"></path><circle cx="12" cy="11" r="1.5" fill="black"></circle></svg>`}</button>` : ``}</div></div>  <div class="container max-w-5xl mx-auto z-10">${$nowProgress ? `<div class="fixed bottom-2 right-2">${validate_component(ProgressRadial, "ProgressRadial").$$render(
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
  $$unsubscribe_bookmarkEvents();
  $$unsubscribe_page();
  $$unsubscribe_allView();
  return $$rendered;
});
export {
  Page as default
};
