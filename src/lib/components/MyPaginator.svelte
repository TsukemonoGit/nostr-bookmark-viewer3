<script>
  import { createEventDispatcher } from 'svelte';
  import { leftAngles, leftArrow, rightAngles, rightArrow } from './icons';

  const dispatch = createEventDispatcher();
  /**
   * @type import('@skeletonlabs/skeleton').PaginationSettings
   */
  export let settings = {
    page: 0,
    limit: 5,
    size: 0,
    amounts: [1, 2, 5, 10],
  };
  export let disabled = false;
  export let showPreviousNextButtons = true;
  export let showFirstLastButtons = false;
  export let showNumerals = false;
  export let maxNumerals = 1;
  export let justify = 'justify-between';
  export let select = 'select min-w-[150px]';
  export let amountText = 'Items';
  export let regionControl = 'btn-group';
  export let controlVariant = 'variant-filled';
  export let controlSeparator = '';
  export let active = 'variant-filled-primary';
  export let buttonClasses = '!px-4 !py-1.5 fill-current';
  export let buttonTextPrevious = leftArrow;
  export let buttonTextNext = rightArrow;
  export let buttonTextFirst = leftAngles;
  export let buttonTextLast = rightAngles;
  const cBase = 'flex flex-col  items-center ';
  const cLabel = '';
  $: lastPage = Math.ceil(settings.size / settings.limit - 1);
  let controlPages = getNumerals();
  function onChangeLength() {
    settings.page = 0;
    dispatch('amount', settings.limit);
    lastPage = Math.ceil(settings.size / settings.limit - 1);
    controlPages = getNumerals();
  }
  /**
   * @param {number} page
   */
  function gotoPage(page) {
    if (page < 0) return;
    settings.page = page;
    dispatch('page', settings.page);
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
    const isWithinLeftSection = settings.page < maxNumerals + 2;
    const isWithinRightSection = settings.page > lastPage - (maxNumerals + 2);
    if (lastPage <= maxNumerals * 2 + 1) return getFullNumerals();
    pages.push(0);
    if (!isWithinLeftSection) pages.push(-1);
    if (isWithinLeftSection || isWithinRightSection) {
      const sectionStart = isWithinLeftSection
        ? 1
        : lastPage - (maxNumerals + 2);
      const sectionEnd = isWithinRightSection ? lastPage - 1 : maxNumerals + 2;
      for (let i = sectionStart; i <= sectionEnd; i++) {
        pages.push(i);
      }
    } else {
      for (
        let i = settings.page - maxNumerals;
        i <= settings.page + maxNumerals;
        i++
      ) {
        pages.push(i);
      }
    }
    if (!isWithinRightSection) pages.push(-1);
    pages.push(lastPage);
    return pages;
  }
  $: classesButtonActive = (/** @type {number} */ page) => {
    return page === settings.page ? `${active} pointer-events-none` : '';
  };
  $: maxNumerals, onChangeLength();
  $: classesBase = `${cBase} ${justify} ${$$props.class ?? ''}`;
  $: classesLabel = `${cLabel}`;
  $: classesSelect = `${select}`;
  $: classesControls = `${regionControl} ${controlVariant} ${controlSeparator}`;
</script>

<div class="paginator {classesBase}  h-full" data-testid="paginator">
  <!-- Select Amount -->
  {#if settings.amounts.length}
    <label class="paginator-label {classesLabel}">
      <select
        bind:value={settings.limit}
        on:change={onChangeLength}
        class="paginator-select {classesSelect}"
        {disabled}
        aria-label="Select Amount"
      >
        {#each settings.amounts as amount}<option value={amount}
            >{amount} {amountText}</option
          >{/each}
      </select>
    </label>
  {/if}
  <!-- Controls -->
  <div class="paginator-controls {classesControls} h-full">
    <!-- Button: First -->
    {#if showFirstLastButtons}
      <button
        type="button"
        class={buttonClasses}
        on:click={() => {
          gotoPage(0);
        }}
        disabled={disabled || settings.page === 0}
      >
        {@html buttonTextFirst}
      </button>
    {/if}
    <!-- Button: Back -->
    {#if showPreviousNextButtons}
      <button
        type="button"
        class={buttonClasses}
        on:click={() => {
          gotoPage(settings.page - 1);
        }}
        disabled={disabled || settings.page === 0}
      >
        {@html buttonTextPrevious}
      </button>
    {/if}
    <!-- Center -->
    {#if showNumerals === false}
      <!-- Details -->

      <button type="button" class="pointer-events-none !text-sm !p-0">
        <div class="whitespace-pre-line px-0.5">
          {settings.page + 1}

          <div class="opacity-50 border-t-2">{lastPage + 1}</div>
        </div>
      </button>
    {:else}
      <!-- Numeric Row -->
      {#each controlPages as page}
        <button
          type="button"
          class="{buttonClasses} {classesButtonActive(page)}"
          on:click={() => gotoPage(page)}
        >
          {page >= 0 ? page + 1 : '...'}
        </button>
      {/each}
    {/if}
    <!-- Button: Next -->
    {#if showPreviousNextButtons}
      <button
        type="button"
        class={buttonClasses}
        on:click={() => {
          gotoPage(settings.page + 1);
        }}
        disabled={disabled ||
          (settings.page + 1) * settings.limit >= settings.size}
      >
        {@html buttonTextNext}
      </button>
    {/if}
    <!-- Button: last -->
    {#if showFirstLastButtons}
      <button
        type="button"
        class={buttonClasses}
        on:click={() => {
          gotoPage(lastPage);
        }}
        disabled={disabled ||
          (settings.page + 1) * settings.limit >= settings.size}
      >
        {@html buttonTextLast}
      </button>
    {/if}
  </div>
</div>
