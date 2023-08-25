<script lang="ts">
  // Props
  /** Exposes parent props to this component. */
  export let parent: any;

  // Stores
  import { Accordion, AccordionItem, modalStore } from '@skeletonlabs/skeleton';

  // Form Data
  const res = {
    value: '',
    btn: 'pub',
    create: false,
  };

  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    if ($modalStore[0].response) $modalStore[0].response(res);
    modalStore.close();
  }

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4';
  const cHeader = 'text-2xl font-bold';
  //const cForm =
  //  'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <Accordion autocollapse>
      <AccordionItem open>
        <svelte:fragment slot="summary">AddNote</svelte:fragment>
        <svelte:fragment slot="content">
          <header class={cHeader}>
            Add Note to {$modalStore[0].title ?? '(title missing)'}
          </header>
          <article class="body">
            {$modalStore[0].body ?? '(body missing)'}
          </article>
          <!-- Enable for debugging: -->

          <input
            class="input p-2"
            type="text"
            bind:value={res.value}
            placeholder="note..."
          />

          <!-- prettier-ignore -->
          <footer class=" rid grid-cols-3 gap-2 flex  justify-end ">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn variant-filled-warning {parent.buttonPositive}" on:click={()=>{res.btn='prv';onFormSubmit()}}>Add Private</button>
        <button class="btn {parent.buttonPositive}" on:click={()=>{res.btn='pub';onFormSubmit()}}>Add Public</button>
    </footer>
        </svelte:fragment>
      </AccordionItem>

      <AccordionItem>
        <svelte:fragment slot="summary">CreateNote & AddNote</svelte:fragment>
        <svelte:fragment slot="content">
          <header class={cHeader}>
            Create and Add Note to {$modalStore[0].title ?? '(title missing)'}
          </header>
          <article class="body">enter kind:1's content</article>
          <!-- Enable for debugging: -->

          <textarea
            class="input p-2"
            bind:value={res.value}
            placeholder="memo..."
          />

          <!-- prettier-ignore -->
          <footer class=" rid grid-cols-3 gap-2 flex  justify-end ">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn variant-filled-warning {parent.buttonPositive}" on:click={()=>{res.btn='prv';res.create=true; onFormSubmit()}}>Add Private</button>
        <button class="btn {parent.buttonPositive}" on:click={()=>{res.btn='pub';res.create=true;onFormSubmit()}}>Add Public</button>
    </footer>
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
  </div>
{/if}
