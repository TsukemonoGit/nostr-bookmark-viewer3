<script lang="ts" context="module">
  interface Window {
    [x: string]: any;
    // NIP-07
    nostr: any;
  }
  declare var window: Window;
</script>

<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { page } from '$app/stores';
  import { Metadata, NostrApp, Text, Nostr, UniqueEventList } from 'nosvelte';
  import {
    createRxForwardReq,
    createRxOneshotReq,
    createRxBackwardReq,
  } from 'rx-nostr';

  import 'websocket-polyfill';
  import MyPaginator from '$lib/components/MyPaginator.svelte';
  import { uniqueTags } from '$lib/functions';
  import {
    Modal,
    type ModalComponent,
    ProgressRadial,
  } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import { modalStore, toastStore } from '$lib/store';
  import { RelaysforSearch, allView, nowProgress } from '$lib/store';
  import ModalCopyPubkey from '$lib/components/ModalCopyPubkey.svelte';
  import ModalEventJson from '$lib/components/ModalEventJson.svelte';

  import Content from '$lib/components/Content.svelte';
  import { onMount } from 'svelte';
  import { nip19 } from 'nostr-tools';

  let filters: Nostr.Filter[];

  let searchRelays: string[];
  let URLPreview: boolean = true;
  let loadEvent: boolean = true;
  let writeRelays: string[];
  let loadSetting: number;
  let iconView: boolean;
  let isSmph: boolean;
  onMount(() => {
    isSmph = navigator.userAgent.match(/iPhone|Android.+Mobile/) ? true : false;
    const configJson = localStorage.getItem('config');
    searchRelays = [...RelaysforSearch];
    if (configJson) {
      const config = JSON.parse(configJson);
      searchRelays = config.searchRelays;
      // URLPreview = config.URLPreview;
      // loadEvent = config.loadEvent;

      writeRelays = config.writeRelays;
      if (searchRelays && searchRelays.length == 0) {
        loadEvent = false;
      }

      loadSetting = config.loadSetting ? Number(config.loadSetting) : 0;
      switch (loadSetting) {
        case 0:
          URLPreview = true;
          break;
        case 1:
          //端末の設定からプレビューを表示するか決める
          const type = navigator.connection.type;
          if (type === 'wifi') {
            //'cellular'=モバイル通信
            URLPreview = true;
          } else {
            URLPreview = false;
          }
          console.log(type);
          break;
        case 2:
          URLPreview = false;
          break;
      }
      const icon = config.icon ? config.icon : false;

      if (icon) {
        iconView = URLPreview;
      } else {
        iconView = true;
      }
    }
  });
  //const req = createRxForwardReq();

  const req = createRxForwardReq();

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
</script>

<svelte:head>
  <title>nostr-bookmark-viewer</title>
  <meta
    name="description"
    content="ぶくまびうあのハッシュタグ{$page.params.hashtag}検索"
  />
  <meta prefix="og: https://ogp.me/ns#" />
  <meta property="og:title" content="nostr-bookmark-viewer3" />
  <meta
    property="og:description"
    content="Nostrのブックマークを見たりできるやつ
ハッシュタグ{$page.params.hashtag}"
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
  <div class="arrow bg-surface-100-800-token" />
</div>

<main class="m-auto max-w-6xl px-1 mb-12 overflow-x-hidden">
  <NostrApp relays={searchRelays}>
    <UniqueEventList
      queryKey={['hashtag-list', 'unique-hashtag-list', $page.params.hashtag]}
      filters={[
        {
          '#t': [$page.params.hashtag],
          limit: 40,
        },
      ]}
      {req}
      let:events={hashtags}
    >
      <div slot="loading">
        <div class="text-sm break-all overflow-hidden">Loading note...</div>
      </div>
      <div slot="error" let:error>
        <div class="text-sm break-all overflow-hidden">
          {error}
        </div>
      </div>

      <div slot="nodata">
        <div class="text-sm break-all overflow-hidden">Note not found</div>
      </div>
      {#each hashtags as hashtag (hashtag.id)}
        {#if hashtag.kind !== 3 && hashtag.kind !== 6}
          <div
            class="card drop-shadow px-1 py-2 my-1 grid grid-cols-[1fr_auto] gap-1"
          >
            <Metadata
              queryKey={['metadata', hashtag.pubkey]}
              pubkey={hashtag.pubkey}
              let:metadata
            >
              <div slot="loading">
                <div class="text-sm break-all overflow-hidden">
                  Loading profile... ({hashtag.pubkey})
                </div>

                <button
                  class="text-sm underline decoration-secondary-500"
                  on:click={() => {
                    handleClickDate(hashtag);
                  }}
                  >{new Date(
                    hashtag.created_at * 1000,
                  ).toLocaleString()}</button
                >
                <div class="parent-container break-all whitespace-pre-wrap">
                  <Content
                    text={hashtag.content}
                    tag={hashtag.tags}
                    id={hashtag.id}
                    view={$allView}
                    {URLPreview}
                    isPageOwner={false}
                    {iconView}
                  />
                </div>
              </div>
              <div slot="error">
                <div class="text-sm break-all overflow-hidden">
                  Failed to get profile ({hashtag.pubkey})
                </div>
                <button
                  class="text-sm underline decoration-secondary-500"
                  on:click={() => {
                    handleClickDate(hashtag);
                  }}
                  >{new Date(
                    hashtag.created_at * 1000,
                  ).toLocaleString()}</button
                >
                <div class="parent-container break-all whitespace-pre-wrap">
                  <Content
                    text={hashtag.content}
                    tag={hashtag.tags}
                    id={hashtag.id}
                    view={$allView}
                    {URLPreview}
                    isPageOwner={false}
                    {iconView}
                  />
                </div>
              </div>
              <div slot="nodata">
                <div class="text-sm break-all overflow-hidden">
                  Profile not found ({hashtag.pubkey})
                </div>
                <button
                  class="text-sm underline decoration-secondary-500"
                  on:click={() => {
                    handleClickDate(hashtag);
                  }}
                  >{new Date(
                    hashtag.created_at * 1000,
                  ).toLocaleString()}</button
                >
                <div class="parent-container break-all whitespace-pre-wrap">
                  <Content
                    text={hashtag.content}
                    tag={hashtag.tags}
                    id={hashtag.id}
                    view={$allView}
                    {URLPreview}
                    isPageOwner={false}
                    {iconView}
                  />
                </div>
              </div>
              <div class="grid grid-cols-[auto_1fr] gap-1">
                {#if iconView}
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
                {:else}
                  <div />
                {/if}
                <div class="grid grid-rows-[auto_1fr] gap-0.5 w-full">
                  <div
                    class="w-full grid grid-cols-[auto_1fr_auto] gap-1 h-fix"
                  >
                    <div class="truncate wid justify-items-end">
                      <button
                        class="text-emerald-800 dark:text-blue-500 text-sm"
                        on:click={() => {
                          handleClickPubkey(metadata, hashtag.pubkey);
                        }}
                        ><u
                          >{#if JSON.parse(metadata.content).name !== ''}{JSON.parse(
                              metadata.content,
                            ).name}
                          {:else}
                            {nip19
                              .npubEncode(hashtag.pubkey)
                              .slice(0, 12)}:{nip19
                              .npubEncode(hashtag.pubkey)
                              .slice(-4)}
                          {/if}</u
                        ></button
                      >
                    </div>
                    <div
                      class="text-left self-end text-sm h-fix wi truncate justify-items-end"
                    >
                      {#if JSON.parse(metadata.content).display_name}
                        {JSON.parse(metadata.content).display_name}
                      {/if}
                    </div>
                    <div class="min-w-max">
                      <button
                        class="text-sm underline decoration-secondary-500"
                        on:click={() => {
                          handleClickDate(hashtag);
                        }}
                        >{new Date(
                          hashtag.created_at * 1000,
                        ).toLocaleString()}</button
                      >
                    </div>
                  </div>
                  {#if uniqueTags(hashtag.tags).length > 0}
                    <div
                      class="max-h-[6em] overflow-auto whitespace-nowrap border-s-4 border-s-rose-800/25 dark:border-s-rose-100/25"
                    >
                      {#each uniqueTags(hashtag.tags) as tag}
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
                                {tag[tag.length - 1] === 'mention'
                                  ? 'mention'
                                  : 'to'}[p] {tag[1]}
                              </div>
                            </div>
                            <div slot="error">
                              <div
                                class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden"
                              >
                                {tag[tag.length - 1] === 'mention'
                                  ? 'mention'
                                  : 'to'}[p] {tag[1]}
                              </div>
                            </div>

                            <div slot="nodata">
                              <div
                                class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden"
                              >
                                {tag[tag.length - 1] === 'mention'
                                  ? 'mention'
                                  : 'to'}[p] {tag[1]}
                              </div>
                            </div>
                            <div
                              class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden"
                            >
                              {tag[tag.length - 1] === 'mention'
                                ? 'mention'
                                : 'to'}[p]
                              <button
                                class="text-emerald-800 dark:text-blue-400 overflow-hidden text-ellipsis"
                                on:click={() => {
                                  handleClickPubkey(metadata, tag[1]);
                                }}
                                ><u
                                  >{#if JSON.parse(metadata.content).name !== ''}{JSON.parse(
                                      metadata.content,
                                    ).name}
                                  {:else}
                                    {nip19
                                      .npubEncode(tag[1])
                                      .slice(0, 12)}:{nip19
                                      .npubEncode(tag[1])
                                      .slice(-4)}
                                  {/if}</u
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
                  <div class="parent-container">
                    <Content
                      text={hashtag.content}
                      tag={hashtag.tags}
                      id={hashtag.id}
                      view={$allView}
                      {URLPreview}
                      isPageOwner={false}
                      {iconView}
                    />
                  </div>
                </div>
              </div>
            </Metadata>
          </div>
        {/if}
      {/each}
    </UniqueEventList>
  </NostrApp>
</main>

<div class=" fixed bottom-0 z-10 w-screen">
  <div
    class="btn-group py-0.5 variant-filled-primary w-screen justify-center rounded-none"
  >
    <button
      type="button"
      class="btn variant-filled-primary"
      on:click={() => {
        history.back();
      }}>{$_('hashtag.back')}</button
    >
    <!-- <MyPaginator
      settings={pages}
      on:page={onPageChange}
      select="hidden"
      justify="justify-center"
      showFirstLastButtons={true}
      active="variant-filled-primary"
      controlVariant="variant-filled-primary"
      buttonClasses="!my-0 !py-0 !px-3 place-items-center fill-current"
    /> -->
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
