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
  import MyPaginator from '$lib/components/MyPaginator.svelte';
  import {
    fetchFilteredEvents,
    publishEvent,
    uniqueTags,
  } from '$lib/functions';
  import { getUserIcon } from '$lib/cache';
  import {
    AppBar,
    Modal,
    Tab,
    TabGroup,
    popup,
    toastStore,
    type PopupSettings,
    modalStore,
    type ModalSettings,
    type ModalComponent,
    ProgressRadial,
    type PaginationSettings,
    Paginator,
  } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { RelaysforSearch, allView, nowProgress } from '$lib/store';
  import ModalCopyPubkey from '$lib/components/ModalCopyPubkey.svelte';
  import ModalEventJson from '$lib/components/ModalEventJson.svelte';
  import PostNote from '$lib/components/PostNote.svelte';
  import Content from '$lib/components/Content.svelte';

  const { type, data } = nip19.decode($page.params.naddr);
  let message: string;
  let error = false;
  const { pubkey, relays, identifier, kind } =
    type === 'naddr' && data.relays
      ? {
          pubkey: data.pubkey,
          relays:
            data.relays.length > 3
              ? data.relays
              : [...data.relays, ...RelaysforSearch],
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

  let writeRelays: string[];
  onMount(async () => {
    $nowProgress = true;
    const configJson = localStorage.getItem('config');
    // searchRelays = [...RelaysforSearch];
    if (configJson) {
      const config = JSON.parse(configJson);
      searchRelays = config.searchRelays;
      URLPreview = config.URLPreview;
      loadEvent = config.loadEvent;
      writeRelays = config.writeRelays;
      if (searchRelays.length == 0) {
        loadEvent = false;
      }
    }
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

  function onClickQuote(id: string[], pubkey: string) {
    console.log('quote');
    const tags = [[...id, '', 'mention']];
    const modal: ModalSettings = {
      type: 'component',
      component: postNoteModalComponent,
      title: 'postNote',
      body: `NIP-07のpreferred relaysのwriteに設定されているリレーにポストします。\n設定されてなかったら、ブクマ取得に使用したリレーにポストします`,
      value: {
        content: `\r\nnostr:${nip19.noteEncode(id[1])}\r\n`,
        tags: tags,
        pubkey: pubkey,
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
            tags: res.tags,
            content: res.content,
            sig: '',
          };
          let writeTrueRelays: string[];
          if (writeRelays.length > 0) {
            writeTrueRelays = writeRelays;
          } else {
            const writeRelay = await window.nostr.getRelays();
            writeTrueRelays = Object.keys(writeRelay).filter(
              (relayUrl) => writeRelay[relayUrl].write === true,
            );
            writeTrueRelays =
              writeTrueRelays.length > 0 ? writeTrueRelays : relays;
          }
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

  // PaginatorSettings
  const pagelimit = 50;
  let pages: PaginationSettings;
  $: pages = {
    offset: 0,
    limit: pagelimit,
    size: viewContents && viewContents.length > 0 ? viewContents.length : 1,
    amounts: [pagelimit],
  };

  $: paginatedSource = viewContents
    ? viewContents.slice(
        pages.offset * pages.limit, // start
        pages.offset * pages.limit + pages.limit, // end
      )
    : viewContents;

  function onPageChange(e: CustomEvent): void {
    console.log(typeof e.detail);
    console.log('event:page', e.detail);
    pages.offset = e.detail;
    if (Object.is(e.detail, -0)) {
      //最後のページへ
      pages.offset = Math.floor(viewContents.length / pages.limit);
    } else {
      pages.offset = e.detail;
    }
    paginatedSource = viewContents.slice(
      pages.offset * pages.limit, // start
      pages.offset * pages.limit + pages.limit, // end
    );
    // スクロール位置を一番上に移動する
    // スクロール位置を一番上に設定

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }
</script>

<svelte:head>
  <title>nostr-bookmark-viewer</title>
  <meta name="description" content="{pubkey}のタグ{identifier}のブックマーク" />
  <meta prefix="og: https://ogp.me/ns#" />
  <meta property="og:title" content="nostr-bookmark-viewer3" />
  <meta
    property="og:description"
    content="Nostrのブックマークを見たりできるやつ
【naddr】
id:{identifier},
pubkey:{pubkey}"
  />
  <meta
    property="og:image"
    content="https://nostr-bookmark-viewer3.vercel.app/img2.png"
  />
</svelte:head>
<Modal />

<div
  class="card border border-purple-800 p-4 w-[22rem] shadow-xl z-20 break-all max-h-[80%] overflow-auto"
  data-popup="popupFeatured"
>
  <button
    type="button"
    class="btn variant-filled-secondary py-1 my-2"
    on:click={() => goto(window.location.origin)}>Go back to Setup</button
  >
  <hr class="!border-t-2 my-1" />
  <div>
    <p>【設定情報】</p>
    <ul class="list-disc">
      <li class="ml-4">プレビュー表示: {URLPreview ? 'ON' : 'OFF'}</li>
      <li class="ml-4">ノート読み込み: {loadEvent ? 'ON' : 'OFF'}</li>
    </ul>
    <hr class="!border-t-2 my-1" />

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
        <span class="btn variant-filled-primary p-0 w-5"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg></span
        > Nostrで共有する
      </li>
      <li class="ml-4">
        <span class="btn variant-filled-primary p-0 w-5"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="16" width="18" height="4" rx="2" ry="2" />
            <line x1="12" y1="5" x2="12" y2="15" />
            <line x1="8" y1="10" x2="12" y2="5" />
            <line x1="16" y1="10" x2="12" y2="5" />
          </svg></span
        > 外部アプリで開く
      </li>

      <li class="ml-4">
        <span class="btn variant-filled-primary p-0 w-5"
          ><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L3.5 20.5H20.5L12 2Z" fill="#FDD835" />
            <path
              d="M12 15V17"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="12" cy="11" r="1.5" fill="black" />
          </svg></span
        > 全content-warning表示切り替え
      </li>
    </ul>
  </div>

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
              <button
                class="btn-icon variant-filled-surface"
                use:popup={popupFeatured}>📝</button
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
          class="bg-surface-50/80 dark:bg-surface-800/80 　w-full drop-shadow"
        >
          <Tab bind:group={bkm} name="pub" value="pub">public</Tab>
        </TabGroup>
      </div>
    </div>

    <NostrApp relays={searchRelays}>
      {#if paginatedSource}
        {#each paginatedSource as id, index}
          {#if id[0] !== 'd'}
            <div
              class="card drop-shadow px-1 py-2 my-1 grid grid-cols-[1fr_auto] gap-1"
            >
              {#if id[0] === 'e'}
                <Text queryKey={[id[1]]} id={id[1]} let:text>
                  <div slot="loading">
                    <div class="text-sm break-all overflow-hidden">
                      Loading note... ({id[1]})
                    </div>
                  </div>
                  <div slot="error">
                    <div class="text-sm break-all overflow-hidden">
                      Failed to get note ({id[1]})
                    </div>
                  </div>

                  <div slot="nodata">
                    <div class="text-sm break-all overflow-hidden">
                      Note not found ({id[1]})
                    </div>
                  </div>

                  <Metadata
                    queryKey={['metadata', text.pubkey]}
                    pubkey={text.pubkey}
                    let:metadata
                  >
                    <div slot="loading">
                      <div class="text-sm break-all overflow-hidden">
                        Loading profile... ({text.pubkey})
                      </div>
                      <button
                        class="text-sm underline decoration-secondary-500"
                        on:click={() => {
                          handleClickDate(text);
                        }}
                        >{new Date(
                          text.created_at * 1000,
                        ).toLocaleString()}</button
                      >
                      <div
                        class="parent-container break-all whitespace-pre-wrap"
                      >
                        <Content
                          text={text.content}
                          tag={text.tags}
                          id={text.id}
                          view={$allView}
                          {URLPreview}
                        />
                      </div>
                    </div>
                    <div slot="error">
                      <div class="text-sm break-all overflow-hidden">
                        Failed to get profile ({text.pubkey})
                      </div>
                      <button
                        class="text-sm underline decoration-secondary-500"
                        on:click={() => {
                          handleClickDate(text);
                        }}
                        >{new Date(
                          text.created_at * 1000,
                        ).toLocaleString()}</button
                      >
                      <div
                        class="parent-container break-all whitespace-pre-wrap"
                      >
                        <Content
                          text={text.content}
                          tag={text.tags}
                          id={text.id}
                          view={$allView}
                          {URLPreview}
                        />
                      </div>
                    </div>
                    <div slot="nodata">
                      <div class="text-sm break-all overflow-hidden">
                        Profile not found ({text.pubkey})
                      </div>
                      <button
                        class="text-sm underline decoration-secondary-500"
                        on:click={() => {
                          handleClickDate(text);
                        }}
                        >{new Date(
                          text.created_at * 1000,
                        ).toLocaleString()}</button
                      >
                      <div
                        class="parent-container break-all whitespace-pre-wrap"
                      >
                        <Content
                          text={text.content}
                          tag={text.tags}
                          id={text.id}
                          view={$allView}
                          {URLPreview}
                        />
                      </div>
                    </div>
                    <div class="grid grid-cols-[auto_1fr] gap-1">
                      <div
                        class="w-12 h-12 rounded-full flex justify-center overflow-hidden bg-surface-500/25 mt-1"
                      >
                        {#if JSON.parse(metadata.content).picture}
                          {#await getUserIcon(JSON.parse(metadata.content).picture, $page.url.origin) then imageUrl}
                            <img
                              class="w-12 object-contain justify-center"
                              src={imageUrl}
                              alt="avatar"
                            />
                          {/await}
                        {/if}
                      </div>
                      <div
                        class="grid grid-rows-[auto_auto_auto] gap-0 break-all w-full"
                      >
                        <div
                          class="w-full grid grid-cols-[auto_1fr_auto] gap-1 h-fix"
                        >
                          <div class="font-bold wi truncate justify-items-end">
                            {JSON.parse(metadata.content).display_name}
                          </div>
                          <div
                            class="truncate wid min-w-[2em] justify-items-end"
                          >
                            <button
                              class="text-emerald-800 dark:text-blue-500 text-sm"
                              on:click={() => {
                                handleClickPubkey(metadata, text.pubkey);
                              }}
                              >@<u>{JSON.parse(metadata.content).name}</u
                              ></button
                            >
                          </div>
                          <div class="min-w-max">
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
                        {#if uniqueTags(text.tags).length > 0}
                          <div
                            class="max-h-[6em] overflow-auto whitespace-nowrap border-s-4 border-s-rose-800/25 dark:border-s-rose-100/25"
                          >
                            {#each uniqueTags(text.tags) as tag}
                              {#if tag[0] === 'p'}
                                <Metadata
                                  queryKey={['metadata', tag[1]]}
                                  pubkey={tag[1]}
                                  let:metadata
                                >
                                  <div slot="loading">
                                    <div
                                      class="-mt- px-2 opacity-60 text-sm overflow-hidden"
                                    >
                                      to[p] {tag[1]}
                                    </div>
                                  </div>
                                  <div slot="error">
                                    <div
                                      class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden"
                                    >
                                      to[p] {tag[1]}
                                    </div>
                                  </div>

                                  <div slot="nodata">
                                    <div
                                      class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden"
                                    >
                                      to[p] {tag[1]}
                                    </div>
                                  </div>
                                  <div
                                    class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden"
                                  >
                                    to[p] <button
                                      class="text-emerald-800 dark:text-blue-400 overflow-hidden text-ellipsis"
                                      on:click={() => {
                                        handleClickPubkey(metadata, tag[1]);
                                      }}
                                      >@<u
                                        >{JSON.parse(metadata.content).name}</u
                                      ></button
                                    >
                                  </div>
                                </Metadata>
                              {:else if tag[0] === 'e' || tag[0] === 'q'}
                                <Text queryKey={[tag[1]]} id={tag[1]} let:text>
                                  <div slot="loading">
                                    <div
                                      class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden"
                                    >
                                      [{tag[0]}] {tag[1]}
                                    </div>
                                  </div>
                                  <div slot="error">
                                    <div
                                      class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden"
                                    >
                                      [{tag[0]}] {tag[1]}
                                    </div>
                                  </div>

                                  <div slot="nodata">
                                    <div
                                      class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden"
                                    >
                                      [{tag[0]}] {tag[1]}
                                    </div>
                                  </div>

                                  <div
                                    class="-mt-0.5 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                                  >
                                    [{tag[0]}]
                                    <button
                                      class="text-emerald-800 dark:text-blue-400 whitespace-nowrap overflow-hidden text-ellipsis"
                                      on:click={() => {
                                        handleClickDate(text);
                                      }}
                                    >
                                      {#if text.tags.some((tag) => tag[0] === 'content-warning') && $allView == false}
                                        {'<content-warning>'}
                                      {:else}
                                        {text.content}
                                      {/if}</button
                                    >
                                  </div>
                                </Text>
                              {:else}
                                <div
                                  class="-mt-0.5 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                                >
                                  [{tag[0]}]
                                  {tag[1]}
                                </div>
                              {/if}
                            {/each}
                          </div>
                        {/if}
                        <div
                          class="parent-container break-all whitespace-pre-wrap"
                        >
                          <Content
                            text={text.content}
                            tag={text.tags}
                            id={text.id}
                            view={$allView}
                            {URLPreview}
                          />
                        </div>
                      </div>
                    </div>
                  </Metadata>
                </Text>
              {:else}
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
              {/if}

              <!-------------------------------各アイテム右側のメニュー欄-->
              {#if id[0] === 'e'}
                <div class="flex flex-col flex-wrap h-16">
                  {#if !$nowProgress}
                    <!---のすたーできょうゆう-->
                    <Text queryKey={[id[1]]} id={id[1]} let:text>
                      <button
                        slot="loading"
                        class="btn p-0 mt-1 variant-filled-primary justify-self-end w-5"
                        on:click={() => onClickQuote(id, '')}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                      </button>

                      <button
                        slot="error"
                        class="btn p-0 mt-1 variant-filled-primary justify-self-end w-5"
                        on:click={() => onClickQuote(id, '')}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                      </button>

                      <button
                        slot="nodata"
                        class="btn p-0 mt-1 variant-filled-primary justify-self-end w-5"
                        on:click={() => onClickQuote(id, '')}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                      </button>

                      <button
                        class="btn p-0 mt-1 variant-filled-primary justify-self-end w-5"
                        on:click={() => onClickQuote(id, text.pubkey)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                      </button>
                    </Text>
                    <!---別アプリで開く-->
                    <button
                      class="btn p-0 mt-1 variant-filled-primary justify-self-end w-5"
                      on:click={() => {
                        window.open(
                          'https://nostr.com/' + nip19.noteEncode(id[1]),
                          '_blank',
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <rect
                          x="3"
                          y="16"
                          width="18"
                          height="4"
                          rx="2"
                          ry="2"
                        />
                        <line x1="12" y1="5" x2="12" y2="15" />
                        <line x1="8" y1="10" x2="12" y2="5" />
                        <line x1="16" y1="10" x2="12" y2="5" />
                      </svg>
                    </button>
                  {/if}
                </div>
              {/if}
            </div>
          {/if}
        {/each}
      {/if}
    </NostrApp>
  {/if}
</main>

<div class=" fixed bottom-0 z-10 w-screen">
  <div
    class="btn-group py-0.5 variant-filled-primary w-screen justify-center rounded-none"
  >
    <MyPaginator
      settings={pages}
      on:page={onPageChange}
      select="hidden"
      justify="justify-center"
      showFirstLastButtons={true}
      active="variant-filled-primary"
      controlVariant="variant-filled-primary"
      buttonClasses="!my-0 !py-0 !px-3 place-items-center fill-current"
    />
    <!--こんてんとわーにんぐ全部表示OR非表示-->
    <button
      type="button"
      class="btn variant-filled-primary"
      on:click={() => {
        $allView = $allView ? false : true;
      }}
    >
      {#if $allView}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="11" fill="#42B983" />
          <path
            d="M6 18L18 6"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      {:else}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L3.5 20.5H20.5L12 2Z" fill="#FDD835" />
          <path
            d="M12 15V17"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="11" r="1.5" fill="black" />
        </svg>
      {/if}
    </button>
  </div>
</div>
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
