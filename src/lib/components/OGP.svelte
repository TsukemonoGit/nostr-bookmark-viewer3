<script lang="ts">
  export let ogp: {
    title: string;
    image: string;
    description: string;
    favicon: string;
  };
  export let url: string;
</script>

<div
  class="drop-shadow-md rounded-2xl m-0 p-1 border-2 border-primary-500 hover:drop-shadow-xl z-20 break-all bg-primary-200 dark:bg-primary-700 dark:hover:border-primary-400"
>
  <a class="" href={url} target="_blank">
    <div class="grid grid-rows-[auto_1fr]">
      <div class="grid grid-cols-[auto_1fr] gap-0.5">
        <div class="overflow-hidden relative rounded-xl max-h-[6rem]">
          {#if ogp.image}
            <img
              class="object-contain object-contain max-h-[6rem]"
              src={ogp.image}
              alt=""
            />
          {/if}
        </div>
        <div class="p-0.5 grid grid-rows-[auto_1fr] z-10 min-w-[12em]">
          <div
            class="line-clamp-2 text-sm font-bold text-primary-800 underline decoration-primary-600 dark:text-primary-300"
          >
            {ogp.title}
          </div>
          <div
            class="line-clamp-4 text-xs text-primary-500 dark:text-primary-400"
          >
            {ogp.description}
          </div>
        </div>
      </div>

      <div class="flex flex-row-reverse ... -my-1">
        {#if ogp.favicon !== ''}
          <img
            class="object-contain w-5 pl-0.5 pr-0.5"
            src={ogp.favicon}
            alt=""
          />
        {/if}
        <div class="text-xs text-purple-900/50 dark:text-purple-50/50">
          {new URL(url).hostname}
        </div>
      </div>
    </div>
  </a>
</div>
