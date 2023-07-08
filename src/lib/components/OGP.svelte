<script lang="ts">
  export let ogp: { title: string; image: string; description: string };
  export let url: string;
</script>

<div
  class="shadow-lg card m-0 p-0.5 w-100 bg-primary-400 hover:bg-primary-300 z-20 break-all"
>
  <a class="" href={url} target="_blank">
    <div class="grid grid-cols-[auto_1fr] gap-0.5">
      <div class="overflow-hidden h-24">
        <img class="object-contain w-full h-full" src={ogp.image} alt="" />
      </div>
      <div
        class="p-1 border border-1 grid grid-rows-[auto_1fr] z-10 bg-primary-200"
      >
        <div class="text-sm font-bold text-primary-700">
          {ogp.title}
        </div>
        <div class="text-xs text-primary-500">
          {#if ogp.description.length <= 100}
            {ogp.description}
          {:else}
            {ogp.description.slice(0, 100)}...
          {/if}
        </div>
      </div>
    </div>
  </a>
</div>

<style>
  img {
    place-items: center; /* 真ん中揃えにする */
  }
</style>
