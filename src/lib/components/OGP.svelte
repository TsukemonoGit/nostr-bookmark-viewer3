<script lang="ts">
  export let ogp: { title: string; image: string; description: string };
  export let url: string;
</script>

<div
  class="card m-0 p-1 w-100 bg-primary-400 hover:bg-primary-500 z-20 break-all"
>
  <a class="" href={url} target="_blank">
    <div class="grid grid-cols-[auto_1fr]">
      <div class="overflow-hidden h-24">
        <img class="object-contain w-full h-full" src={ogp.image} alt="" />
      </div>
      <div
        class="p-1 border border-1 grid grid-rows-[auto_1fr] z-10 bg-white/75"
      >
        <div class="text-sm font-bold">
          {ogp.title}
        </div>
        <div class="text-xs">
          {ogp.description}
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
