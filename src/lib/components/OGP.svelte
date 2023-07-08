<script lang="ts">
  export let ogp: { title: string; image: string; description: string };
  export let url: string;
</script>

<div
  class="card m-0 p-2 w-52 bg-primary-400 hover:bg-primary-500 z-20 break-all"
>
  <a class="" href={url} target="_blank">
    <div class="grid grid-rowx-[auto_1fr] h-24 w-48">
      <div class="overflow-hidden h-[fit-content]">
        <div class="relative h-24 w-48">
          <div class="absolute inset-0 overflow-hidden">
            <img class="object-cover w-full h-full" src={ogp.image} alt="" />
          </div>
        </div>
      </div>
      <div class="border border-1 grid grid-rows-[auto_1fr] z-10 bg-white/50">
        <div class="text-sm font-bold">
          {ogp.title}
        </div>
        <div class="text-xs">
          {#if ogp.description.length < 40}
            {ogp.description}
          {:else}
            {ogp.description.slice(0, 35)}...
          {/if}
        </div>
      </div>
    </div>
  </a>
</div>
