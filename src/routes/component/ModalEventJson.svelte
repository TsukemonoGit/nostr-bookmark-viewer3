<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton';
  export let parent: any;
  // Base Classes
  const cBase = 'card p-4  shadow-xl space-y-4 break-all';
  const cHeader = 'text-2xl font-bold';
  //$modalStore[0]?.value.hexKey
</script>

<!-- @component This example creates a simple form modal. -->
{#if $modalStore[0]}
  <div class="modal-example-form {cBase} bg-surface-200-700-token">
    <header class={cHeader}>
      {$modalStore[0].title ?? '(title missing)'}
    </header>

    <div
      class="bg-surface-50-900-token break-words whitespace-pre-wrap max-h-60 overflow-auto"
    >
      {JSON.stringify($modalStore[0].value.note, undefined, 4)}
    </div>
    <footer class="modal-footer {parent.regionFooter}">
      <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
        >{parent.buttonTextCancel}</button
      >
    </footer>
  </div>
{/if}
