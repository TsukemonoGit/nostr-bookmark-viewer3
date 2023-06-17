<script lang="ts">
  export let tag: string[] = [];
</script>

{#if tag.length > 0}
  <div class="flex">
    {#each tag as t}
      <div class="flex flex-wrap p-1 m-1 break-all">
        {t}
      </div>
    {/each}
  </div>
{/if}
