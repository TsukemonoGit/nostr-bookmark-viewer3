<script lang="ts">
  import { Kinds, bookmarkEvents, identifiersList } from '$lib/store';
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { modalStore, toastStore } from '$lib/store';
  import { _ } from 'svelte-i18n';
  // Props
  /** Exposes parent props to this component. */
  export let parent: any;
  // Local
  let res = { index: -1, kind: Kinds.kind10003 };
  let selectKind = Kinds.kind10003;
  let selectTag: number;
  //$: moveList = $tags.filter((item) => item !== $tags[$tabSet]);
  // Handle Form Submission
  function onFormSubmit(index: number): void {
    res.index = index;
    res.kind = selectKind;
    if ($modalStore[0].response) {
      $modalStore[0].response(res);
    }
    console.log(res);
    modalStore.close();
  }

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4 break-all';
  const cHeader = 'text-2xl font-bold';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <header class={cHeader}>
      {$modalStore[0].title ?? '(title missing)'}
    </header>
    <article>{$modalStore[0].body ?? '(body missing)'}</article>
    <div class="grid grid-cols-[auto_1fr]">
      <ListBox
        class="border border-surface-500 p-4 rounded-container-token flex-grow overflow-auto"
        spacing="divide-y divide-solid space-y-1"
      >
        {#each [Kinds.kind10003, Kinds.kind30003, Kinds.kind30001] as kind, index}
          <ListBoxItem
            bind:group={selectKind}
            name={kind.toString()}
            value={kind}
            ><div class="text-xs">kind:{kind}</div>
            {kind === Kinds.kind10003
              ? $_('kind.10003.title')
              : kind === Kinds.kind30003
              ? $_('kind.30003.title')
              : $_('kind.30001.title')}</ListBoxItem
          >
        {/each}
      </ListBox>
      <ListBox
        spacing="divide-y divide-solid space-y-1"
        class="border border-surface-500 p-4 rounded-container-token max-h-56 overflow-auto"
      >
        {#if $bookmarkEvents[selectKind].length > 0}
          {#each $bookmarkEvents[selectKind] as list, index}
            <ListBoxItem
              bind:group={selectTag}
              name={$identifiersList[selectKind][index].identifier ??
                selectKind.toString()}
              value={index}
              on:change={() => onFormSubmit(index)}
              >{#if $identifiersList[selectKind][index].title}
                <div class="text-xs">
                  {$identifiersList[selectKind][index].identifier ??
                    selectKind.toString()}
                </div>
                {$identifiersList[selectKind][index].title}
              {:else}
                {$identifiersList[selectKind][index].identifier ??
                  selectKind.toString()}
              {/if}</ListBoxItem
            >
          {/each}
        {/if}</ListBox
      >
    </div>
    <div class="text-sm card p-1">
      <p>kind:{selectKind}</p>
      <div class="ml-2">
        {@html selectKind === Kinds.kind10003
          ? $_('kind.10003.exp')
          : selectKind === Kinds.kind30003
          ? $_('kind.30003.exp')
          : $_('kind.30001.exp')}
      </div>
    </div>
    <div />
    <footer class="modal-footer {parent.regionFooter}">
      <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
        >{parent.buttonTextCancel}</button
      >
    </footer>
  </div>
{/if}
