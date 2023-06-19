<script lang="ts">
  import {
    Avatar,
    modalStore,
    type ModalComponent,
  } from '@skeletonlabs/skeleton';
  import { type Event, nip19 } from 'nostr-tools';
  import ModalImage from './ModalImage.svelte';
  import ModalCopyPubkey from './ModalCopyPubkey.svelte';
  import ModalEventJson from './ModalEventJson.svelte';

  import { noteEvents, profileEvents } from '$lib/store';

  import { extractTextParts } from '$lib/content';

  export let tag: string[] = [];
  let eventId = '';
  let note: Event | undefined;
  let profile: Event | undefined;
  let profileContent: {
    display_name: string;
    picture: string;
    name: string;
    banner: string;
    about: string;
  };

  const imageModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalImage,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };

  const pubkeyModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalCopyPubkey,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };

  const jsonModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalEventJson,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };
  $: if (tag.length > 0) {
    eventId = tag[1];
    note = $noteEvents.find((event) => event.id === eventId);
  }
  $: profile = $profileEvents.find((event) => event.pubkey === note?.pubkey);
  $: if (profile?.content) {
    profileContent = JSON.parse(profile?.content);
  }

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
  function handleClickPubkey(npubHex: string | undefined) {
    console.log($profileEvents);
    const thisProfile: Event | undefined = $profileEvents.find(
      (item) => item.pubkey === npubHex,
    );

    console.log(thisProfile);
    const clickProfileContent =
      thisProfile != undefined ? JSON.parse(thisProfile.content) : null;
    console.log(clickProfileContent);
    const modal = {
      type: 'component' as const,
      //  flyX: x,
      //  flyY: y,
      value: {
        //    position: `x-${clientX} y-${clientY}`,
        hexKey: npubHex,
        pubKey: nip19.npubEncode(npubHex as string),
        profile: clickProfileContent,
      },
      component: pubkeyModalComponent,
    };
    modalStore.trigger(modal);
  }

  function handleClickDate() {
    console.log('click');
    const modal = {
      type: 'component' as const,
      //  flyX: x,
      //  flyY: y,
      title: 'Event Json',
      value: {
        //    position: `x-${clientX} y-${clientY}`,
        note: note,
      },

      component: jsonModalComponent,
    };
    modalStore.trigger(modal);
  }

  $: screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  $: marqueeDuration = 5 + screenWidth / 100 + 's';

  $: document.documentElement.style.setProperty(
    '--marquee-duration',
    marqueeDuration,
  );

  let ptag: string[];
  let ptagnpub: string[];
  //pタグがある場合誰かへのリプ
  $: {
    const p = note?.tags.filter((item) => item[0] === 'p');
    if (p && p.length === 0) {
      ptag = [];
    } else if (p) {
      if (p.length > 1) {
        //pタグが複数の場合ノート本人のパブキーをを外す
        ptagnpub = p
          .filter((item) => item[1] !== note?.pubkey)
          .map((item) => item[1]);
      } else {
        ptagnpub = p.map((item) => item[1]);
      }

      ptag = ptagnpub.map((pubkey) => {
        const pprof = $profileEvents.find((item) => item.pubkey === pubkey);

        return pprof === undefined
          ? `${nip19.npubEncode(pubkey).slice(0, 10)}...${nip19
              .npubEncode(pubkey)
              .slice(-5)}`
          : JSON.parse(pprof.content).name;
      });
    }
  }
</script>

{#if tag.length > 0}
  <section class="w-full text-left">
    {#if !note}
      <div class="break-all">
        failed to get event ID:{nip19.noteEncode(tag[1])}
      </div>
    {:else if !profile}
      <div class="grid grid-rows-[auto-auto-auto] gap-2 break-all">
        <div>
          <button
            class="underline decoration-1"
            on:click={() => {
              handleClickPubkey(note?.pubkey);
            }}>{nip19.npubEncode(note?.pubkey)}</button
          >
        </div>
        <div class="break-all whitespace-pre-wrap">{note?.content}</div>
        <div>{new Date(note?.created_at * 1000).toLocaleString()}</div>
      </div>
    {:else}
      <div class="w-full grid grid-cols-[auto_1fr] gap-1">
        <div>
          <Avatar
            src={profileContent.picture}
            width="w-12"
            rounded="rounded-full"
          />
        </div>
        <div class="grid grid-rows-[auto_auto_auto] gap-0 break-all w-full">
          <div class="w-full grid grid-cols-[auto_1fr_auto] gap-1">
            <div class="font-bold wi truncate ...">
              {profileContent.display_name}
            </div>
            <div class="truncate ... wid">
              <button
                class="text-emerald-800 text-sm"
                on:click={() => {
                  handleClickPubkey(note?.pubkey);
                }}>@<u>{profileContent.name}</u></button
              >
            </div>
            <div class="place-self-end min-w-max">
              <button
                class="text-sm underline decoration-emerald-500"
                on:click={() => {
                  handleClickDate();
                }}>{new Date(note?.created_at * 1000).toLocaleString()}</button
              >
            </div>
          </div>
          {#if ptag}
            {#each ptag as p, index}
              <div
                class=" pl-2 opacity-50 text-sm whitespace-nowrap overflow-hidden"
              >
                To
                <button
                  class="text-emerald-800 whitespace-nowrap overflow-hidden text-ellipsis"
                  on:click={() => {
                    handleClickPubkey(ptagnpub[index]);
                  }}>@<u>{p}</u></button
                >
              </div>
            {/each}
          {/if}
          <div class="mt-2 break-all whitespace-pre-wrap">
            {#await extractTextParts(note?.content, note?.tags)}
              <div>note?.content</div>
            {:then viewContent}
              {#if typeof viewContent === 'object' && Array.isArray(viewContent)}
                <div class="parent-container break-all whitespace-pre-wrap">
                  {#each viewContent as item, index}
                    {#if item.type === 'newline'}
                      <br />
                    {:else if item.type === 'emoji'}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <div
                        class="{item.marquee} w-[fit-content] break-all whitespace-pre-wrap inline-flex flex align-bottom"
                      >
                        {#if item.beforeSpace}{Array(item.beforeSpace)
                            .fill('\u00A0')
                            .join('')}{/if}
                        <img
                          class="emoji inline object-contain align-bottom"
                          src={item.url}
                          alt=""
                          on:click={() => handleClickImage(item.url)}
                        />
                      </div>
                    {:else if item.type === 'url'}
                      <div
                        class="{item.marquee} w-[fit-content] break-all whitespace-pre-wrap inline-flex flex"
                      >
                        {#if item.beforeSpace}{Array(item.beforeSpace)
                            .fill('\u00A0')
                            .join('')}{/if}
                        <a class="anchor" href={item.content} target="_blank"
                          >{item.content}</a
                        >
                      </div>
                    {:else if item.type === 'image'}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <div class=" {item.marquee} w-[fit-content] inline-flex">
                        {#if item.beforeSpace}{Array(item.beforeSpace)
                            .fill('\u00A0')
                            .join('')}{/if}
                        <img
                          class="image object-contain"
                          src={item.content}
                          alt=""
                          on:click={() => handleClickImage(item.content)}
                        />
                      </div>
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
              {/if}
            {/await}
          </div>
        </div>
      </div>
    {/if}
  </section>
{/if}

<style>
  .wid {
    min-width: 4em;
  }
  .emoji {
    max-height: 1.5em;
  }
  .image {
    max-height: 10em;
  }
  .parent-container {
    overflow: hidden; /* スクロールバーが出ないように */
    position: relative; /* マーキーの内容部分の位置の基準になるように */
    min-height: 2em;
  }

  .marquee {
    position: absolute;
    /**アニメーションの開始位置を揃える*/
    right: 0;
    white-space: nowrap;
    animation-name: marquee;
    animation-timing-function: linear;
    animation-duration: var(--marquee-duration);
    animation-iteration-count: infinite;
    display: inline-block; /* マーキー要素をインラインブロックとして表示 */
  }
  /** マーキーアニメーション */
  @keyframes marquee {
    from {
      /*transform: translate(100%);*/
      transform: translate(100%);
    }
    100%,
    to {
      /*transform: translate(-100%); /* 画面左端まで移動する */
      transform: translateX(-90vw);
    }
  }
  :root {
    --marquee-duration: var(--default-marquee-duration);
  }

  @media screen {
    :root {
      --marquee-duration: var(--mobile-marquee-duration);
    }
  }
</style>
