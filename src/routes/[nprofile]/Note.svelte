<script lang="ts">
  //import sanitizeHtml from 'sanitize-html';
  import { noteEvents, profileEvents } from '$lib/store';
  import {
    Avatar,
    modalStore,
    type ModalComponent,
  } from '@skeletonlabs/skeleton';
  import { type Event, nip19 } from 'nostr-tools';
  import ModalImage from './ModalImage.svelte';
  import ModalCopyPubkey from './ModalCopyPubkey.svelte';
  import ModalEventJson from './ModalEventJson.svelte';

  import { extractTextParts, type TextPart } from '$lib/content';

  export let tag: string[] = [];
  let eventId = '';
  let note: Event | undefined;
  let profile: Event | undefined;
  let profileContent: { display_name: any; picture: any; name: string };

  const imageModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalImage,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: '<p>Skeleton</p>',
  };

  const pubkeyModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalCopyPubkey,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: '<p>Skeleton</p>',
  };

  const jsonModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalEventJson,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: '<p>Skeleton</p>',
  };
  $: if (tag.length > 0) {
    eventId = tag[1];
    note = $noteEvents.find((event) => event.id === eventId);
  }
  $: profile = $profileEvents.find((event) => event.pubkey === note?.pubkey);
  $: if (profile?.content) {
    profileContent = JSON.parse(profile?.content);
  }

  // function handleClick(event: { target: any }) {
  //   const clickedElement = event.target;
  //   if (clickedElement.tagName === 'IMG') {
  //     // 画像がクリックされた場合の処理
  //     const imageUrl = clickedElement.getAttribute('src');
  //     const modal = {
  //       type: 'component' as const,
  //       image: imageUrl,
  //       component: modalComponent,
  //     };
  //     modalStore.trigger(modal);

  //     console.log('Image clicked!');
  //     console.log('Image URL:', imageUrl);
  //     // ここに独自の処理を追加します
  //   } else if (clickedElement.tagName === 'A') {
  //     // リンクがクリックされた場合の処理
  //     console.log('Link clicked!');
  //     // ここに独自の処理を追加します
  //   } else {
  //     // その他の要素がクリックされた場合の処理
  //     console.log('Element clicked!');
  //     // ここに独自の処理を追加します
  //   }
  // }
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
  function handleClickPubkey() {
    const modal = {
      backdropClasses:
        '!bg-surface-400 dark:!bg-surface-700  !bg-opacity-10 dark:!bg-opacity-10',

      type: 'component' as const,
      //  flyX: x,
      //  flyY: y,
      value: {
        //    position: `x-${clientX} y-${clientY}`,
        hexKey: note?.pubkey,
        pubKey: nip19.npubEncode(note?.pubkey as string),
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
              handleClickPubkey();
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
        <div class="grid grid-rows-[auto-auto-auto] gap-2 break-all w-full">
          <div class="w-full grid grid-cols-[auto_1fr_auto] gap-1">
            <div class="font-bold wi truncate ...">
              {profileContent.display_name}
            </div>
            <div class="truncate ... wid">
              <button
                class="text-emerald-800 text-sm"
                on:click={() => {
                  handleClickPubkey();
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

          <div class="break-all whitespace-pre-wrap">
            {#await extractTextParts(note?.content, note?.tags) then viewContent}
              {#if typeof viewContent === 'object' && Array.isArray(viewContent)}
                {#if viewContent}
                  {#each viewContent as item, index}
                    {#if item.type === 'emoji'}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <img
                        class="emoji"
                        src={item.url}
                        alt=""
                        on:click={() => handleClickImage(item.url)}
                      />
                    {:else if item.type === 'url'}
                      <a class="anchor" href={item.content} target="_blank"
                        >{item.content}</a
                      >
                    {:else if item.type === 'image'}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <img
                        class="image"
                        src={item.content}
                        alt=""
                        on:click={() => handleClickImage(item.content)}
                      />
                    {:else}
                      {item.content}
                    {/if}
                  {/each}
                {/if}
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
    display: inline;
  }
  .image {
    max-height: 10em;
  }
</style>
