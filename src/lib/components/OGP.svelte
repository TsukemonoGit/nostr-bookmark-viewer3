<script lang="ts">
  export let ogp: {
    title: string;
    image: string;
    description: string;
    favicon: string;
    siteTitle: string;
  };
  export let url: string;

  const urlUrl = new URL(url);
  const type =
    urlUrl.hostname === 'www.youtube.com' ||
    urlUrl.hostname === 'm.youtube.com' ||
    urlUrl.hostname === 'youtu.be'
      ? 'youtube'
      : 'other';

  const pathname = () => {
    if (urlUrl.hostname === 'youtu.be') {
      return urlUrl.pathname.substring(1);
    } else if (
      urlUrl.hostname === 'www.youtube.com' ||
      urlUrl.hostname === 'm.youtube.com'
    ) {
      if (urlUrl.pathname.startsWith('/shorts/')) {
        return urlUrl.pathname.replace('/shorts/', '');
      } else {
        return getParam('v', url);
      }
    }
  };

  function getParam(name: string, url: string): string | null {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  const maxHeight = type !== 'youtube' ? 'max-h-[6rem]' : 'max-h-[9rem]';
  const lineClamp = type !== 'youtube' ? 'line-clamp-4' : 'line-clamp-6';
</script>

<div
  class="drop-shadow-md rounded-2xl m-0 p-1 border-2 border-primary-500 hover:drop-shadow-xl z-20 break-all bg-primary-200"
>
  <a class="" href={url} target="_blank">
    <div class="grid grid-cols-[auto_1fr] gap-0.5">
      <div class="overflow-hidden relative rounded-xl {maxHeight}">
        {#if type === 'youtube'}
          <iframe
            width="256"
            height="144"
            src={`https://www.youtube.com/embed/${pathname()}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        {:else if ogp.image}
          <img
            class="object-contain w-full max-h-[6rem]"
            src={ogp.image}
            alt=""
          />
        {/if}
        <!-- <div
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
        </div> -->
      </div>
      <div
        class="p-0.5 border border-1 grid grid-rows-[auto_auto_1fr] z-10 {type !==
        'youtube'
          ? 'min-w-[12em]'
          : ''}"
      >
        <div class="flex">
          {#if ogp.favicon !== ''}
            <img class="object-contain w-4 pr-0.5" src={ogp.favicon} alt="" />
          {/if}
          <div class="text-xs text-purple-900/50">{urlUrl.hostname}</div>
        </div>
        <div
          class="line-clamp-2 text-sm font-bold text-primary-800 underline decoration-primary-600 -mt-1"
        >
          {ogp.title}
        </div>
        <div class="{lineClamp} text-xs text-primary-500">
          {ogp.description}
        </div>
      </div>
    </div>
  </a>
</div>
