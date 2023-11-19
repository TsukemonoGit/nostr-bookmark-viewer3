<script lang="ts">
  import { bookmarkEvents } from '$lib/store';
  import { modalStore, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

  // Props
  /** Exposes parent props to this component. */
  export let parent: any;
  // Local
  let res = { tag: 0, bkm: '' };

  let selectTag = 0;
  //$: moveList = $tags.filter((item) => item !== $tags[$tabSet]);
  // Handle Form Submission
  function onFormSubmit(): void {
    res.tag = selectTag;
    if ($modalStore[0].response) {
      $modalStore[0].response(res);
    }
    console.log(res);
    modalStore.close();
  }

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4 break-all';
  const cHeader = 'text-2xl font-bold';

  function onChange(list: string) {
    console.log(list);
    console.log(selectTag);
  }
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <header class={cHeader}>
      {$modalStore[0].title ?? '(title missing)'}
    </header>
    <article>{$modalStore[0].body ?? '(body missing)'}</article>

    <ListBox
      class="border border-surface-500 p-4 rounded-container-token max-h-56 overflow-auto"
    >
      {#each $bookmarkEvents as list, index (list.tags[0][1])}
        <ListBoxItem
          bind:group={selectTag}
          name={list.tags[0][1]}
          value={index}
          on:change={() => onChange(list.tags[0][1])}
          >{list.tags[0][1]}</ListBoxItem
        >
      {/each}
    </ListBox>

    <footer class="modal-footer {parent.regionFooter}">
      <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
        >{parent.buttonTextCancel}</button
      >
      {#if selectTag !== $modalStore[0].value.tag || $modalStore[0].value.bkm !== 'pvt'}
        <button
          class="btn variant-filled-warning"
          on:click={() => {
            res.bkm = 'pvt';
            onFormSubmit();
          }}>Private</button
        >
      {/if}
      {#if selectTag !== $modalStore[0].value.tag || $modalStore[0].value.bkm !== 'pub'}
        <button
          class="btn variant-filled-primary"
          on:click={() => {
            res.bkm = 'pub';
            onFormSubmit();
          }}>Public</button
        >
      {/if}
    </footer>
  </div>
{/if}
