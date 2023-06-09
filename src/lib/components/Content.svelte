<script lang="ts">
  import { extractTextParts, type TextPart } from '$lib/content';
  import { modalStore, type ModalComponent } from '@skeletonlabs/skeleton';
  import ModalImage from './ModalImage.svelte';
  import { nip19 } from 'nostr-tools';

  import { Metadata, Nostr, NostrApp, Text } from 'nosvelte';
  import ModalCopyPubkey from './ModalCopyPubkey.svelte';
  import { getOgp } from '$lib/functions';
  import OGP from './OGP.svelte';
  import { ogpStore } from '$lib/store';
  import QuoteContent from './QuoteContent.svelte';
  import ModalEventJson from './ModalEventJson.svelte';

  export let text: string;
  export let tag: string[][];

  const imageModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalImage,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };

  function handleClickImage(str: string | undefined) {
    if (typeof str === 'string') {
      const modal = {
        type: 'component' as const,
        image: str,
        component: imageModalComponent,
      };
      modalStore.trigger(modal);
    }
  }

  //-------------------------------プロフィール表示
  const pubkeyModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalCopyPubkey,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };

  function handleClickPubkey(metadata: Nostr.Event<number>, pubkey: string) {
    console.log(metadata);

    const modal = {
      type: 'component' as const,
      //  flyX: x,
      //  flyY: y,
      value: {
        //    position: `x-${clientX} y-${clientY}`,

        metadata: metadata,
        pubkey: pubkey,
      },
      component: pubkeyModalComponent,
    };
    modalStore.trigger(modal);
  }

  //でこーどできるかちぇっく
  function decodeCheck(str: string): boolean {
    try {
      nip19.decode(str);
      return true;
    } catch (error) {
      return false;
    }
  }

  // URLが存在する場合はストアの値を使用し、ない場合はOGP情報を取得してストアを更新する
  async function loadOgp(url: string) {
    if (!$ogpStore[url] || $ogpStore[url].title === '') {
      try {
        const ogp = await getOgp(url); // OGP情報を取得
        ogpStore.update((store) => {
          // 取得したOGP情報をストアに追加
          return {
            ...store,
            [url]: ogp,
          };
        });
      } catch (error) {
        console.log(error);
        $ogpStore[url].title = '';
        $ogpStore[url].image = '';
        $ogpStore[url].description = '';
        $ogpStore[url].favicon = '';
      }
    }
  }

  const pathname = (urlstr: string) => {
    const url = new URL(urlstr);

    if (url.hostname === 'youtu.be') {
      return url.pathname.substring(1);
    } else if (
      url.hostname === 'www.youtube.com' ||
      url.hostname === 'm.youtube.com'
    ) {
      if (url.pathname.startsWith('/shorts/')) {
        return url.pathname.replace('/shorts/', '');
      } else {
        return getParam('v', urlstr);
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
</script>

{#await extractTextParts(text, tag)}
  {text}
{:then viewContent}
  <div class="parent-container break-all whitespace-pre-wrap">
    {#each viewContent as item, index}
      {#if item.type === 'newline'}
        <br />
      {:else if item.type === 'space'}
        &nbsp;
      {:else if item.type === 'emoji'}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="{item.marquee} w-[fit-content] break-all whitespace-pre-wrap inline-flex flex align-bottom"
        >
          {#if item.beforeSpace}{Array(item.beforeSpace)
              .fill('\u00A0')
              .join('')}{/if}
          <img
            class="max-h-[1.5em] inline object-contain align-bottom"
            src={item.url}
            alt=""
            on:click={() => handleClickImage(item.url)}
          />
        </div>
      {:else if item.type === 'url'}
        {#if new URL(item.content).hostname.endsWith('twitter.com')}
          <div class="max-h-[20rem] max-w-[36rem] overflow-auto">
            <blockquote class="twitter-tweet">
              <p lang="ja" dir="ltr">
                <a class="anchor" href={item.content}>{item.content}</a>
              </p>
            </blockquote>

            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charset="utf-8"
            ></script>

            <!-- 
            <iframe
              title="twitter"
              frameborder="0"
              width="100%"
              height="100%"
              src="https://twitframe.com/show?url={item.content}"
            /> -->
          </div>
        {:else if new URL(item.content).hostname === 'www.youtube.com' || new URL(item.content).hostname === 'm.youtube.com' || new URL(item.content).hostname === 'youtu.be'}
          <iframe
            class="rounded"
            width="320"
            height="180"
            src={`https://www.youtube.com/embed/${pathname(item.content)}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        {:else}
          {#await loadOgp(item.content)}
            <div
              class="{item.marquee} w-[fit-content] break-all whitespace-pre-wrap inline-flex flex"
            >
              {#if item.beforeSpace}{Array(item.beforeSpace)
                  .fill('\u00A0')
                  .join('')}{/if}
              <a class="anchor" href={item.content} target="_blank">
                {#if item.content.length > 80}
                  {item.content.slice(0, 75)}...
                {:else}
                  {item.content}
                {/if}
              </a>
            </div>
          {:then ogp}
            {#if $ogpStore[item.content].title !== ''}
              <OGP ogp={$ogpStore[item.content]} url={item.content} />
            {:else}
              <div
                class="{item.marquee} w-[fit-content] break-all whitespace-pre-wrap inline-flex flex"
              >
                {#if item.beforeSpace}{Array(item.beforeSpace)
                    .fill('\u00A0')
                    .join('')}{/if}
                <a class="anchor flex" href={item.content} target="_blank">
                  {#if item.content.length > 80}
                    {item.content.slice(0, 75)}...
                  {:else}
                    {item.content}
                  {/if}
                </a>
              </div>
            {/if}
          {/await}
        {/if}
      {:else if item.type === 'image'}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class=" {item.marquee} w-[fit-content] inline-flex">
          {#if item.beforeSpace}{Array(item.beforeSpace)
              .fill('\u00A0')
              .join('')}{/if}
          <img
            class="max-h-[10em] object-contain"
            src={item.content}
            alt=""
            on:click={() => handleClickImage(item.content)}
          />
        </div>
      {:else if item.type === 'nostr' && item.url}
        {#if decodeCheck(item.url)}
          <QuoteContent endocedId={item.url} />
        {:else}
          <span class="text-black/80"> {item.content}</span>
        {/if}
      {:else if item.content.length > 0}
        <div
          class="{item.marquee}
                          break-all
                          whitespace-pre-wrap w-[fix-content
                          ] inline-flex"
        >
          {#if item.beforeSpace}{Array(item.beforeSpace)
              .fill('\u00A0')
              .join('')}{/if}
          {item.content}
        </div>
      {/if}
    {/each}
  </div>
{/await}
