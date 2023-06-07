<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton';
  export let parent: any;
  // Base Classes
  const cBase = 'card p-4  shadow-xl space-y-4 break-all';
</script>

<!-- @component This example creates a simple form modal. -->
{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <img src={$modalStore[0]?.image} alt="" />

    <footer class="modal-footer {parent.regionFooter}">
      <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
        >{parent.buttonTextCancel}</button
      >
    </footer>
  </div>
{/if}

<style>
  img {
    max-height: 80vh;
    max-width: 80vw;
  }
</style>
