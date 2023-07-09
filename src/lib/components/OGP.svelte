<script lang="ts">
  export let ogp: { title: string; image: string; description: string };
  export let url: string;
</script>

<div
  class="drop-shadow-md card m-0 p-0.5 bg-primary-500 hover:drop-shadow-xl z-20 break-all"
>
  <a class="" href={url} target="_blank">
    <div class="grid grid-cols-[auto_1fr] gap-0.5">
      <div class="overflow-hidden max-h-[6rem] relative">
        <img
          class="object-contain w-full max-h-[6rem]"
          src={ogp.image}
          alt=""
        />
        <div
          class="absolute top-0 left-0 flex items-center justify-center p-1 bg-white rounded-full shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-4 w-4 text-primary-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
      </div>
      <div
        class="p-1 border border-1 grid grid-rows-[auto_1fr] z-10 bg-primary-200 min-w-[12em]"
      >
        <div
          class="text-sm font-bold text-primary-800 underline decoration-primary-600"
        >
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
