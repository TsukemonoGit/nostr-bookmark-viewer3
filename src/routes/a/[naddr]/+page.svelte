<script lang="ts" context="module">
  interface Window {
    [x: string]: any;
    // NIP-07
    nostr: any;
  }
  declare var window: Window;
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { Metadata, NostrApp, Text, Nostr } from 'nosvelte';
  import { nip19 } from 'nostr-tools';
  import 'websocket-polyfill';
  import { fetchFilteredEvents, publishEvent } from '$lib/functions';
  import {
    AppBar,
    Modal,
    SlideToggle,
    Tab,
    TabGroup,
    Toast,
    popup,
    toastStore,
    type PopupSettings,
    type ToastSettings,
    Avatar,
    modalStore,
    type ModalSettings,
    type ModalComponent,
    ProgressRadial,
  } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { RelaysforSearch, nowProgress } from '$lib/store';
  import ModalCopyPubkey from '$lib/components/ModalCopyPubkey.svelte';
  import ModalEventJson from '$lib/components/ModalEventJson.svelte';
  import PostNote from '$lib/components/PostNote.svelte';
  import Content from '$lib/components/Content.svelte';
  let ogpImageURL = '';
  const { type, data } = nip19.decode($page.params.naddr);
  let message: string;
  let error = false;
  const { pubkey, relays, identifier, kind } =
    type === 'naddr' && data.relays
      ? {
          pubkey: data.pubkey,
          relays: data.relays.length > 0 ? data.relays : RelaysforSearch,
          identifier: data.identifier,
          kind: data.kind,
        }
      : { pubkey: '', relays: [], identifier: '', kind: 30001 };
  console.log(pubkey, relays, identifier, kind);
  if (kind !== 30001) {
    message = 'ブクマのnaddrじゃないかも';
    console.log('ブクマのnaddrじゃないかも');
  }
  const filters_30001 = [
    {
      authors: [pubkey],
      kinds: [kind],
      '#d': [identifier],
    },
  ];

  let bookmarkEvent: Nostr.Event[];

  let tabSet: number = 0;
  let bkm: string = 'pub';
  let viewContents: string[][];

  onMount(async () => {
    $nowProgress = true;

    if (pubkey !== '' || relays.length > 0) {
      bookmarkEvent = await fetchFilteredEvents(relays, filters_30001);
      console.log(bookmarkEvent);
      if (bookmarkEvent.length === 0) {
        error = true;
        message = 'ブクマなんもないかも';
        console.log('ブクマなんもないかも');
        $nowProgress = false;
        return;
      }
      viewContents = bookmarkEvent[0].tags;
      $nowProgress = false;
    }
  });

  const popupFeatured: PopupSettings = {
    // Represents the type of event that opens/closed the popup
    event: 'click',
    // Matches the data-popup value on your popup element
    target: 'popupFeatured',
    // Defines which side of your trigger the popup will appear
    placement: 'bottom',
  };

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

  //-------------------------------イベントJSON表示
  const jsonModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalEventJson,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };

  function handleClickDate(text: Nostr.Event<number>) {
    console.log('click');
    const modal = {
      type: 'component' as const,
      //  flyX: x,
      //  flyY: y,
      title: 'Event Json',
      value: {
        //    position: `x-${clientX} y-${clientY}`,
        note: text,
      },

      component: jsonModalComponent,
    };
    modalStore.trigger(modal);
  }

  //-----------------------------------------------
  const postNoteModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: PostNote,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };
  function onClickQuote(id: string[]) {
    console.log('quote');
    const tags = [id];
    const modal: ModalSettings = {
      type: 'component',
      component: postNoteModalComponent,
      title: 'postNote',
      body: `NIP-07のpreferred relaysのwriteに設定されているリレーにポストします。`,
      value: {
        content: `\r\nnostr:${nip19.noteEncode(id[1])}\r\n`,
        tags: tags,
      },
      response: async (res) => {
        console.log(res);
        if (res) {
          $nowProgress = true;
          const event: Nostr.Event = {
            id: '',
            pubkey: await window.nostr.getPublicKey(),
            created_at: Math.floor(Date.now() / 1000),
            kind: 1,
            tags: tags,
            content: res.content,
            sig: '',
          };
          const writeRelay = await window.nostr.getRelays();
          const writeTrueRelays = Object.keys(writeRelay).filter(
            (relayUrl) => writeRelay[relayUrl].write === true,
          );
          const response = await publishEvent(event, writeTrueRelays);
          if (response) {
            const t = {
              message: response.msg.join('<br>'),
              timeout: 3000,
            };

            toastStore.trigger(t);
          } else {
            const t = {
              message: 'failed to publish',
              timeout: 3000,
              background: 'bg-orange-500 text-white width-filled ',
            };
          }

          $nowProgress = false;
        }
      },
    };
    modalStore.trigger(modal);
  }
</script>

<svelte:head>
  <meta prefix="og: https://ogp.me/ns#" />
  <meta property="og:title" content="nostr-bookmark-viewer3" />
  <meta
    property="og:description"
    content="【naddr】
id:{identifier},
pubkey:{pubkey}"
  />
  <meta
    property="og:image"
    content="https://nostr-bookmark-viewer3.vercel.app/img2.png"
  />
</svelte:head>
<Modal />

<div class="card p-4 w-72 shadow-xl z-20 break-all" data-popup="popupFeatured">
  <div>
    <p>【pubkey】</p>
    <p>{nip19.npubEncode(pubkey)}</p>

    <p class="mt-2">【relays】</p>

    <ul class="list-disc">
      {#each relays as relay}
        <li class="ml-4">{relay}</li>
      {/each}
    </ul>
  </div>
  <hr class="!border-t-2 my-1" />
  <div class="text-sm">
    <ul class="list-disc">
      <li class="ml-4">
        <span class="btn variant-filled p-0 w-5">🐥</span> Nostrで共有する
      </li>
      <li class="ml-4">
        <span class="btn variant-filled p-0 w-5">🔗</span> 外部アプリで開く
      </li>
    </ul>
  </div>
  <hr class="!border-t-2 my-1" />
  <button
    type="button"
    class="btn variant-filled py-1"
    on:click={() => goto(window.location.origin)}>Go back to Setup</button
  >
  <div class="arrow bg-surface-100-800-token" />
</div>

<main class="container max-w-5xl px-1 mt-24 mb-12">
  {#if !bookmarkEvent}
    now loading
  {:else if error}
    {message}
  {:else}
    <div class="w-full fixed top-0 left-1/2 transform -translate-x-1/2 z-10">
      <div class="max-w-screen-lg m-auto z-10">
        <AppBar
          gridColumns="grid grid-cols-[auto_1fr_auto]"
          slotDefault="place-self-center"
          slotTrail="place-self-end"
          padding="p-0"
          background="bg-surface-300-600-token "
          gap="gap-0"
        >
          <svelte:fragment slot="lead">
            <div class="lead-icon pl-2 z-20">
              <button class="btn-icon variant-filled" use:popup={popupFeatured}
                >📝</button
              ><!--<LightSwitch />-->
            </div>
          </svelte:fragment>

          <div class="tabGroup">
            <TabGroup
              padding="py-3 px-4"
              justify="justify"
              active="variant-filled-secondary"
              hover="hover:variant-soft-secondary"
              border="border-b border-surface-400-500-token"
              rounded="rounded-tl-container-token rounded-tr-container-token"
            >
              {#if !$nowProgress}
                <Tab
                  group={tabSet}
                  name={bookmarkEvent[0].tags[0][1]}
                  value={0}
                >
                  {bookmarkEvent[0].tags[0][1]}
                </Tab>
              {/if}
            </TabGroup>
          </div>

          <svelte:fragment slot="trail">
            <div class=" pr-2 text-center justify-center" />
          </svelte:fragment>
        </AppBar>

        <!--プライベートブクマとパブリックブクマ-->
        <TabGroup
          justify="justify-center"
          flex="flex-1"
          rounded=""
          class="bg-surface-50/80 w-full drop-shadow"
        >
          <Tab bind:group={bkm} name="pub" value="pub">public</Tab>
        </TabGroup>
      </div>
    </div>

    <NostrApp relays={RelaysforSearch}>
      {#if viewContents}
        {#each viewContents as id, index}
          {#if id[0] === 'e'}
            <div
              class="card drop-shadow px-1 py-2 my-1 grid grid-cols-[1fr_auto] gap-1"
            >
              <Text queryKey={[id[1]]} id={id[1]} let:text>
                <div slot="loading">
                  <p class="break-all">Loading note... ({id[1]})</p>
                </div>
                <div slot="error">
                  <p class="break-all">Failed to get note ({id[1]})</p>
                </div>

                <div slot="nodata">
                  <p class="break-all">Note not found ({id[1]})</p>
                </div>

                <Metadata
                  queryKey={['metadata', text.pubkey]}
                  pubkey={text.pubkey}
                  let:metadata
                >
                  <div slot="loading">
                    <div class=" break-all">
                      Loading profile... ({text.pubkey})
                    </div>
                    <div class="parent-container break-all whitespace-pre-wrap">
                      <Content text={text.content} tag={text.tags} />
                    </div>
                  </div>
                  <div slot="error">
                    <div class=" break-all">
                      Failed to get profile ({text.pubkey})
                    </div>
                    <div class="parent-container break-all whitespace-pre-wrap">
                      <Content text={text.content} tag={text.tags} />
                    </div>
                  </div>
                  <div slot="nodata">
                    <div class=" break-all">
                      Profile not found ({text.pubkey})
                    </div>
                    <div class="parent-container break-all whitespace-pre-wrap">
                      <Content text={text.content} tag={text.tags} />
                    </div>
                  </div>

                  <div class="grid grid-cols-[auto_1fr] gap-1">
                    <div
                      class="w-12 h-12 rounded-full flex justify-center overflow-hidden bg-surface-500/25 mt-1"
                    >
                      {#if JSON.parse(metadata.content).picture}
                        <img
                          class="w-12 object-contain justify-center"
                          src={JSON.parse(metadata.content).picture}
                          alt="avatar"
                        />
                      {/if}
                    </div>
                    <div
                      class="grid grid-rows-[auto_auto_auto] gap-0 break-all w-full"
                    >
                      <div class="w-full grid grid-cols-[auto_1fr_auto] gap-1">
                        <div class="font-bold wi truncate">
                          {JSON.parse(metadata.content).display_name}
                        </div>
                        <div class="truncate wid min-w-[2em]">
                          <button
                            class="text-secondary-800 text-sm"
                            on:click={() => {
                              handleClickPubkey(metadata, text.pubkey);
                            }}
                            >@<u>{JSON.parse(metadata.content).name}</u></button
                          >
                        </div>
                        <div class="place-self-end min-w-max">
                          <button
                            class="text-sm underline decoration-secondary-500"
                            on:click={() => {
                              handleClickDate(text);
                            }}
                            >{new Date(
                              text.created_at * 1000,
                            ).toLocaleString()}</button
                          >
                        </div>
                      </div>
                      {#if text.tags.length > 0}
                        {#each text.tags as tag}
                          {#if tag[0] === 'p'}
                            <Metadata
                              queryKey={['metadata', tag[1]]}
                              pubkey={tag[1]}
                              let:metadata
                            >
                              <div
                                class="-mt-1 px-2 opacity-50 text-sm whitespace-nowrap overflow-hidden"
                              >
                                to <button
                                  class="text-secondary-800 whitespace-nowrap overflow-hidden text-ellipsis"
                                  on:click={() => {
                                    handleClickPubkey(metadata, tag[1]);
                                  }}
                                  >@<u>{JSON.parse(metadata.content).name}</u
                                  ></button
                                >
                              </div>
                            </Metadata>
                          {/if}
                        {/each}
                      {/if}
                      <div
                        class="parent-container break-all whitespace-pre-wrap"
                      >
                        <Content text={text.content} tag={text.tags} />
                      </div>
                    </div>
                  </div>
                </Metadata>
              </Text>
              <div class="flex flex-col">
                <button
                  class="btn p-0 mt-1 variant-filled justify-self-end"
                  on:click={() => onClickQuote(id)}
                >
                  🐥
                </button>

                <button
                  class="btn p-0 mt-1 variant-filled justify-self-end"
                  on:click={() => {
                    window.open(
                      'https://nostr.com/' + nip19.noteEncode(id[1]),
                      '_blank',
                    );
                  }}
                >
                  🔗
                </button>
              </div>
            </div>
          {:else if id[0] !== 'd'}
            <div
              class="card drop-shadow-md p-2 my-1 grid grid-cols-[1fr_auto] gap-1"
            >
              <div class="grid grid-rows-[auto_auto] gap-0">
                <div class="font-bold">{id[0]}</div>
                <div class="flex">
                  {#each id.slice(1) as item}
                    <div class="flex flex-wrap px-1 mx-1 break-all">
                      {item}
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        {/each}
      {/if}
    </NostrApp>
  {/if}
</main>

<!-- ------------------------------------footer-     -->

<div class="container max-w-5xl mx-auto z-10">
  {#if $nowProgress}
    <div class="fixed bottom-2 right-2">
      <ProgressRadial
        ...
        stroke={100}
        meter="stroke-primary-500"
        track="stroke-primary-500/30"
        width="w-24"
      />
    </div>
  {/if}
</div>

<style>
  .tabGroup {
    flex: 1;
    max-width: calc(100vw - 8em);

    position: relative;
  }
</style>
