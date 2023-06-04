<script lang="ts">
  import { tabSet, tags } from '$lib/store';
  import { ListBox, ListBoxItem, modalStore } from '@skeletonlabs/skeleton';
  import { nip19 } from 'nostr-tools';

  // Props
  /** Exposes parent props to this component. */
  export let parent: any;
  // Local
  let menuItem: { name: string; value?: string } = { name: 'copy' };
  let isMoveListOpen = false;
  let isClickedDelete = false;
  let selectTag: string;
  $: moveList = $tags.filter((item) => item !== $tags[$tabSet]);
  // Handle Form Submission
  function onFormSubmit(): void {
    isMoveListOpen = false;
    if ($modalStore[0].response) {
      $modalStore[0].response(menuItem);
    }
    console.log(menuItem);
    modalStore.close();
  }

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4 break-all';
  const cHeader = 'text-2xl font-bold';

  function onMoveClick() {
    isMoveListOpen = !isMoveListOpen;
    isClickedDelete = false;

    //  console.log(menuItem);
  }
  function onDeleteClick() {
    isClickedDelete = !isClickedDelete;
    isMoveListOpen = false;
  }

  function onClickMoveTag(li: string) {
    //console.log(li)
    menuItem = { name: 'move', value: li };
    onFormSubmit();
  }
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <header class={cHeader}>
      {$modalStore[0].title ?? '(title missing)'}
    </header>
    <article class="break-words whitespace-pre-wrap">
      {$modalStore[0].body ?? '(body missing)'}
    </article>
    <div class="btn-group-vertical variant-filled w-full flex justify-center">
      <button
        on:click={() => {
          menuItem = {
            name: 'copyNote',
          };
          onFormSubmit();
        }}><strong>copy noteID</strong>&nbsp; to clipboard</button
      >
      <button
        on:click={() => {
          menuItem = {
            name: 'copyHex',
          };
          onFormSubmit();
        }}><strong>copy hexID</strong>&nbsp; to clipboard</button
      >
      <button
        on:click={() => {
          menuItem = { name: 'open' };
          onFormSubmit();
        }}><strong>open </strong> &nbsp; on nostr.com</button
      >
      <button
        on:click={() => {
          menuItem = { name: 'move' };
          onMoveClick();
        }}><strong>move </strong> &nbsp; to another tag</button
      >

      {#if isMoveListOpen}
        <ListBox
          padding="px-10 py-2"
          class="bg-surface-50-900-token h-24 overflow-auto  text-black"
        >
          {#each moveList as li}
            <ListBoxItem
              bind:group={selectTag}
              name={li}
              value={li}
              on:click={() => onClickMoveTag(li)}
            >
              {li}
            </ListBoxItem>
          {/each}
        </ListBox>
      {/if}
      <button
        on:click={() => {
          menuItem = { name: 'delete' };
          onDeleteClick();
        }}
        ><strong>delete </strong> &nbsp; from <u>{$tags[$tabSet]}</u> &nbsp; tag</button
      >

      {#if isClickedDelete}
        <option
          class="text-black dark:text-white btn variant-filled-warning"
          value="delete"
          on:click={onFormSubmit}
        >
          Are you sure you want to delete this note?</option
        >
      {/if}
      <button on:click={parent.onClose}>{parent.buttonTextCancel}</button>
    </div>
  </div>
{/if}
