<script lang="ts">
  export let ogp: { title: string; image: string; description: string };
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
      return urlUrl.pathname;
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
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
</script>

<div
  class="drop-shadow-md card m-0 p-0.5 bg-primary-500 hover:drop-shadow-xl z-20 break-all"
>
  <a class="" href={url} target="_blank">
    <div class="grid grid-cols-[auto_1fr] gap-0.5">
      <div class="overflow-hidden max-h-[6rem] relative">
        {#if type === 'youtube'}
          <iframe
            width="160"
            height="90"
            src="https://www.youtube.com/embed/{pathname}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        {:else}
          <img
            class="object-contain w-full max-h-[6rem]"
            src={ogp.image}
            alt=""
          />
        {/if}
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
          class="line-clamp-2 overflow-y-hidden text-sm font-bold text-primary-800 underline decoration-primary-600"
        >
          {ogp.title}
        </div>
        <div class="text-xs text-primary-500 line-clamp-4 overflow-y-hidden">
          {ogp.description}
        </div>
      </div>
    </div>
  </a>
</div>
