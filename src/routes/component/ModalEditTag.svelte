<script lang="ts">
  // Props
  /** Exposes parent props to this component. */
  export let parent: any;
  export let selectedValue: string;

  // Stores
  import { modalStore } from '@skeletonlabs/skeleton';
  import { tags } from '$lib/store';
  // Form Data
  let res = {
    value: '',
    btn: '',
    tag: $tags[0],
  };

  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    if ($modalStore[0].response) $modalStore[0].response(res);

    modalStore.close();
  }

  function handleChange() {
    console.log(selectedValue);
    res.tag = selectedValue;
  }

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4';
  const cHeader = 'text-2xl font-bold';
  // const cForm =
  //   'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
    <article class="body">{$modalStore[0].body ?? '(body missing)'}</article>
    <!-- Enable for debugging: -->

    <input
      class="input p-2"
      type="text"
      bind:value={res.value}
      placeholder="tag name"
    />

    <!-- prettier-ignore -->
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={()=>{res.btn='add';onFormSubmit()}}>Add Tag</button>
    </footer>
    <article class="whitespace-pre-wrap break-words">
      Select <strong>Delete</strong> Tag
    </article>
    <select
      class="select"
      size="1"
      bind:value={selectedValue}
      on:change={handleChange}
    >
      {#each $tags as tag}
        <option value={tag}>{tag}</option>
      {/each}
    </select>
    <!-- prettier-ignore -->
    <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
           
            <button class="btn variant-filled-warning" on:click={()=>{res.btn='delete' ;onFormSubmit()}}>Delete Tag</button>
        </footer>
  </div>
{/if}
