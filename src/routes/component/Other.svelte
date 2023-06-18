<script lang="ts">
  export let tag: string[] = [];
</script>

{#if tag.length > 0}
  <div class="grid grid-rows-[auto_auto] gap-0">
    <div class="font-bold">{tag[0]}</div>
    <div class="flex">
      {#each tag.slice(1) as t}
        <div class="flex flex-wrap px-1 mx-1 break-all">
          {t}
        </div>
      {/each}
    </div>
  </div>
{/if}
