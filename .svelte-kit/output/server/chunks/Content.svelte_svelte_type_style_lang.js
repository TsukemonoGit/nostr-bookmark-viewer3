import { c as create_ssr_component, e as escape, b as add_attribute, t as add_styles, f as compute_slots, a as subscribe, u as createEventDispatcher, i as spread, k as escape_object, v as validate_component, m as missing_component, d as each } from "./index3.js";
import { w as writable } from "./index2.js";
function modalService() {
  const { subscribe: subscribe2, set, update } = writable([]);
  return {
    subscribe: subscribe2,
    set,
    update,
    /** Append to end of queue. */
    trigger: (modal) => update((mStore) => {
      mStore.push(modal);
      return mStore;
    }),
    /**  Remove first item in queue. */
    close: () => update((mStore) => {
      if (mStore.length > 0)
        mStore.shift();
      return mStore;
    }),
    /** Remove all items from queue. */
    clear: () => set([])
  };
}
const modalStore = modalService();
const cBase$1 = "progress-radial relative overflow-hidden";
const cBaseTrack = "fill-transparent";
const cBaseMeter = "fill-transparent transition-[stroke-dashoffset] duration-200 -rotate-90 origin-[50%_50%]";
const baseSize = 512;
const ProgressRadial = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let $$slots = compute_slots(slots);
  let { value = void 0 } = $$props;
  let { stroke = 40 } = $$props;
  let { font = 56 } = $$props;
  let { width = "w-36" } = $$props;
  let { meter = "stroke-surface-900 dark:stroke-surface-50" } = $$props;
  let { track = "stroke-surface-500/30" } = $$props;
  let { fill = "fill-token" } = $$props;
  let { labelledby = "" } = $$props;
  const radius = baseSize / 2;
  let circumference = radius;
  let dashoffset;
  function setProgress(percent) {
    circumference = radius * 2 * Math.PI;
    dashoffset = circumference - percent / 100 * circumference;
  }
  setProgress(0);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.stroke === void 0 && $$bindings.stroke && stroke !== void 0)
    $$bindings.stroke(stroke);
  if ($$props.font === void 0 && $$bindings.font && font !== void 0)
    $$bindings.font(font);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.meter === void 0 && $$bindings.meter && meter !== void 0)
    $$bindings.meter(meter);
  if ($$props.track === void 0 && $$bindings.track && track !== void 0)
    $$bindings.track(track);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  classesBase = `${cBase$1} ${width} ${$$props.class ?? ""}`;
  return `


<figure class="${"progress-radial " + escape(classesBase, true)}" data-testid="progress-radial" role="meter"${add_attribute("aria-labelledby", labelledby, 0)}${add_attribute("aria-valuenow", value || 0, 0)}${add_attribute("aria-valuetext", value ? `${value}%` : "Indeterminate Spinner", 0)}${add_attribute("aria-valuemin", 0, 0)}${add_attribute("aria-valuemax", 100, 0)}>
	<svg viewBox="${"0 0 " + escape(baseSize, true) + " " + escape(baseSize, true)}" class="${["rounded-full", value === void 0 ? "animate-spin" : ""].join(" ").trim()}"><circle class="${"progress-radial-track " + escape(cBaseTrack, true) + " " + escape(track, true)}"${add_attribute("stroke-width", stroke, 0)}${add_attribute("r", baseSize / 2, 0)} cx="50%" cy="50%"></circle><circle class="${"progress-radial-meter " + escape(cBaseMeter, true) + " " + escape(meter, true)}"${add_attribute("stroke-width", stroke, 0)}${add_attribute("r", baseSize / 2, 0)} cx="50%" cy="50%"${add_styles({
    "stroke-dasharray": `${circumference}
			${circumference}`,
    "stroke-dashoffset": dashoffset
  })}></circle>${value != void 0 && value >= 0 && $$slots.default ? `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-weight="bold"${add_attribute("font-size", font, 0)} class="${"progress-radial-text " + escape(fill, true)}">${slots.default ? slots.default({}) : ``}</text>` : ``}</svg></figure>`;
});
const cBackdrop = "fixed top-0 left-0 right-0 bottom-0";
const cTransitionLayer = "w-full h-full p-4 overflow-y-auto flex justify-center";
const cModal = "block";
const cModalImage = "w-full h-auto";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cPosition;
  let classesBackdrop;
  let classesTransitionLayer;
  let classesModal;
  let parent;
  let $modalStore, $$unsubscribe_modalStore;
  $$unsubscribe_modalStore = subscribe(modalStore, (value) => $modalStore = value);
  createEventDispatcher();
  let { position = "items-center" } = $$props;
  let { components = {} } = $$props;
  let { duration = 150 } = $$props;
  let { flyOpacity = 0 } = $$props;
  let { flyX = 0 } = $$props;
  let { flyY = 100 } = $$props;
  let { background = "bg-surface-100-800-token" } = $$props;
  let { width = "w-modal" } = $$props;
  let { height = "h-auto" } = $$props;
  let { padding = "p-4" } = $$props;
  let { spacing = "space-y-4" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { shadow = "shadow-xl" } = $$props;
  let { zIndex = "z-[999]" } = $$props;
  let { buttonNeutral = "variant-ghost-surface" } = $$props;
  let { buttonPositive = "variant-filled" } = $$props;
  let { buttonTextCancel = "Cancel" } = $$props;
  let { buttonTextConfirm = "Confirm" } = $$props;
  let { buttonTextSubmit = "Submit" } = $$props;
  let { regionBackdrop = "bg-surface-backdrop-token" } = $$props;
  let { regionHeader = "text-2xl font-bold" } = $$props;
  let { regionBody = "max-h-[200px] overflow-hidden" } = $$props;
  let { regionFooter = "flex justify-end space-x-2" } = $$props;
  let promptValue;
  const buttonTextDefaults = {
    buttonTextCancel,
    buttonTextConfirm,
    buttonTextSubmit
  };
  let currentComponent;
  modalStore.subscribe((modals) => {
    if (!modals.length)
      return;
    if (modals[0].type === "prompt")
      promptValue = modals[0].value;
    buttonTextCancel = modals[0].buttonTextCancel || buttonTextDefaults.buttonTextCancel;
    buttonTextConfirm = modals[0].buttonTextConfirm || buttonTextDefaults.buttonTextConfirm;
    buttonTextSubmit = modals[0].buttonTextSubmit || buttonTextDefaults.buttonTextSubmit;
    currentComponent = typeof modals[0].component === "string" ? components[modals[0].component] : modals[0].component;
  });
  function onClose() {
    if ($modalStore[0].response)
      $modalStore[0].response(false);
    modalStore.close();
  }
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.flyOpacity === void 0 && $$bindings.flyOpacity && flyOpacity !== void 0)
    $$bindings.flyOpacity(flyOpacity);
  if ($$props.flyX === void 0 && $$bindings.flyX && flyX !== void 0)
    $$bindings.flyX(flyX);
  if ($$props.flyY === void 0 && $$bindings.flyY && flyY !== void 0)
    $$bindings.flyY(flyY);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  if ($$props.buttonNeutral === void 0 && $$bindings.buttonNeutral && buttonNeutral !== void 0)
    $$bindings.buttonNeutral(buttonNeutral);
  if ($$props.buttonPositive === void 0 && $$bindings.buttonPositive && buttonPositive !== void 0)
    $$bindings.buttonPositive(buttonPositive);
  if ($$props.buttonTextCancel === void 0 && $$bindings.buttonTextCancel && buttonTextCancel !== void 0)
    $$bindings.buttonTextCancel(buttonTextCancel);
  if ($$props.buttonTextConfirm === void 0 && $$bindings.buttonTextConfirm && buttonTextConfirm !== void 0)
    $$bindings.buttonTextConfirm(buttonTextConfirm);
  if ($$props.buttonTextSubmit === void 0 && $$bindings.buttonTextSubmit && buttonTextSubmit !== void 0)
    $$bindings.buttonTextSubmit(buttonTextSubmit);
  if ($$props.regionBackdrop === void 0 && $$bindings.regionBackdrop && regionBackdrop !== void 0)
    $$bindings.regionBackdrop(regionBackdrop);
  if ($$props.regionHeader === void 0 && $$bindings.regionHeader && regionHeader !== void 0)
    $$bindings.regionHeader(regionHeader);
  if ($$props.regionBody === void 0 && $$bindings.regionBody && regionBody !== void 0)
    $$bindings.regionBody(regionBody);
  if ($$props.regionFooter === void 0 && $$bindings.regionFooter && regionFooter !== void 0)
    $$bindings.regionFooter(regionFooter);
  cPosition = $modalStore[0]?.position ?? position;
  classesBackdrop = `${cBackdrop} ${regionBackdrop} ${zIndex} ${$$props.class ?? ""} ${$modalStore[0]?.backdropClasses ?? ""}`;
  classesTransitionLayer = `${cTransitionLayer} ${cPosition ?? ""}`;
  classesModal = `${cModal} ${background} ${width} ${height} ${padding} ${spacing} ${rounded} ${shadow} ${$modalStore[0]?.modalClasses ?? ""}`;
  parent = {
    position,
    // ---
    duration,
    flyOpacity,
    flyX,
    flyY,
    // ---
    background,
    width,
    height,
    padding,
    spacing,
    rounded,
    shadow,
    // ---
    buttonNeutral,
    buttonPositive,
    buttonTextCancel,
    buttonTextConfirm,
    buttonTextSubmit,
    // ---
    regionBackdrop,
    regionHeader,
    regionBody,
    regionFooter,
    // ---
    onClose
  };
  $$unsubscribe_modalStore();
  return `

${$modalStore.length > 0 ? `
		<div class="${"modal-backdrop " + escape(classesBackdrop, true)}" data-testid="modal-backdrop">
			<div class="${"modal-transition " + escape(classesTransitionLayer, true)}">${$modalStore[0].type !== "component" ? `
					<div class="${"modal " + escape(classesModal, true)}" data-testid="modal" role="dialog" aria-modal="true"${add_attribute("aria-label", $modalStore[0].title ?? "", 0)}>
						${$modalStore[0]?.title ? `<header class="${"modal-header " + escape(regionHeader, true)}"><!-- HTML_TAG_START -->${$modalStore[0].title}<!-- HTML_TAG_END --></header>` : ``}
						
						${$modalStore[0]?.body ? `<article class="${"modal-body " + escape(regionBody, true)}"><!-- HTML_TAG_START -->${$modalStore[0].body}<!-- HTML_TAG_END --></article>` : ``}
						
						${$modalStore[0]?.image && typeof $modalStore[0]?.image === "string" ? `<img class="${"modal-image " + escape(cModalImage, true)}"${add_attribute("src", $modalStore[0]?.image, 0)} alt="Modal">` : ``}
						
						${$modalStore[0].type === "alert" ? `
							<footer class="${"modal-footer " + escape(regionFooter, true)}"><button type="button" class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button></footer>` : `${$modalStore[0].type === "confirm" ? `
							<footer class="${"modal-footer " + escape(regionFooter, true)}"><button type="button" class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button>
								<button type="button" class="${"btn " + escape(buttonPositive, true)}">${escape(buttonTextConfirm)}</button></footer>` : `${$modalStore[0].type === "prompt" ? `
							<form class="space-y-4"><input${spread(
    [
      { class: "modal-prompt-input input" },
      { name: "prompt" },
      { type: "text" },
      escape_object($modalStore[0].valueAttr)
    ],
    {}
  )}${add_attribute("value", promptValue, 0)}>
								<footer class="${"modal-footer " + escape(regionFooter, true)}"><button type="button" class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button>
									<button type="submit" class="${"btn " + escape(buttonPositive, true)}">${escape(buttonTextSubmit)}</button></footer></form>` : ``}`}`}</div>` : `
					
					<div class="${"modal contents " + escape($modalStore[0]?.modalClasses ?? "", true)}" data-testid="modal-component" role="dialog" aria-modal="true"${add_attribute("aria-label", $modalStore[0].title ?? "", 0)}>${validate_component(currentComponent?.ref || missing_component, "svelte:component").$$render($$result, Object.assign({}, currentComponent?.props, { parent }), {}, {
    default: () => {
      return `${currentComponent?.slot ? `<!-- HTML_TAG_START -->${currentComponent?.slot}<!-- HTML_TAG_END -->` : ``}`;
    }
  })}</div>`}</div></div>` : ``}`;
});
const bookmarkEvents = writable([]);
const nowProgress = writable(false);
const RelaysforSearch = [
  "wss://relay.nostr.band",
  // 'wss://nostr.wine',
  //'wss://relay.damus.io',
  "wss://nos.lol",
  "wss://relay.nostr.wirednet.jp",
  "wss://relay-jp.nostr.wirednet.jp"
  //'wss://yabu.me',
  //"wss://nostream.localtest.me",
  //"ws://localhost:7000",
];
const ogpStore = writable({});
const naddrStore = writable({});
const contentStore = writable({});
const allView = writable(false);
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
  (page) => {
    return page === settings.offset ? `${active} pointer-events-none` : "";
  };
  {
    onChangeLength();
  }
  classesBase = `${cBase} ${justify} ${$$props.class ?? ""}`;
  classesLabel = `${cLabel}`;
  classesSelect = `${select}`;
  classesControls = `${regionControl} ${controlVariant} ${controlSeparator}`;
  return `<div class="${"paginator " + escape(classesBase, true) + " h-full"}" data-testid="paginator">
  ${settings.amounts.length ? `<label class="${"paginator-label " + escape(classesLabel, true)}"><select class="${"paginator-select " + escape(classesSelect, true)}" ${disabled ? "disabled" : ""} aria-label="Select Amount">${each(settings.amounts, (amount) => {
    return `<option${add_attribute("value", amount, 0)}>${escape(amount)} ${escape(amountText)}</option>`;
  })}</select></label>` : ``}
  
  <div class="${"paginator-controls " + escape(classesControls, true) + " h-full"}">
    ${showFirstLastButtons ? `<button type="button"${add_attribute("class", buttonClasses, 0)} ${disabled || settings.offset === 0 ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextFirst}<!-- HTML_TAG_END --></button>` : ``}
    
    ${showPreviousNextButtons ? `<button type="button"${add_attribute("class", buttonClasses, 0)} ${disabled || settings.offset === 0 ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextPrevious}<!-- HTML_TAG_END --></button>` : ``}
    
    ${showNumerals === false ? `

      <button type="button" class="pointer-events-none !text-sm !p-0"><div class="whitespace-pre-line">${escape(settings.offset * settings.limit + 1)}-${escape(Math.min(settings.offset * settings.limit + settings.limit, settings.size))}

          <div class="opacity-50">of ${escape(settings.size)}</div></div></button>` : `
      ${each(controlPages, (page) => {
    return `<button type="button" class="${escape(buttonClasses, true) + " " + escape(classesButtonActive(page), true)}">${escape(page >= 0 ? page + 1 : "...")}
        </button>`;
  })}`}
    
    ${showPreviousNextButtons ? `<button type="button"${add_attribute("class", buttonClasses, 0)} ${disabled || (settings.offset + 1) * settings.limit >= settings.size ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextNext}<!-- HTML_TAG_END --></button>` : ``}
    
    ${showFirstLastButtons ? `<button type="button"${add_attribute("class", buttonClasses, 0)} ${disabled || (settings.offset + 1) * settings.limit >= settings.size ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextLast}<!-- HTML_TAG_END --></button>` : ``}</div></div>`;
});
const ModalCopyPubkey_svelte_svelte_type_style_lang = "";
const ModalImage_svelte_svelte_type_style_lang = "";
const Content_svelte_svelte_type_style_lang = "";
export {
  Modal as M,
  ProgressRadial as P,
  RelaysforSearch as R,
  allView as a,
  MyPaginator as b,
  naddrStore as c,
  contentStore as d,
  bookmarkEvents as e,
  nowProgress as n,
  ogpStore as o
};
