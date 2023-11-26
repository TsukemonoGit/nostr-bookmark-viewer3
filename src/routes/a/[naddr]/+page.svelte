<script lang="ts" context="module">
  interface Window {
    [x: string]: any;
    // NIP-07
    nostr: any;
  }
  declare var window: Window;
</script>

<script lang="ts">
  import HomeIcon from '@material-design-icons/svg/round/home.svg?raw';
  import SettingsIcon from '@material-design-icons/svg/round/settings.svg?raw';
  import { _ } from 'svelte-i18n';
  import { page } from '$app/stores';
  import { Metadata, NostrApp, Text, Nostr } from 'nosvelte';
  import { nip19 } from 'nostr-tools';
  import 'websocket-polyfill';
  import MyPaginator from '$lib/components/MyPaginator.svelte';
  import {
    fetchFilteredEvents,
    publishEvent,
    uniqueTags,
    getIdByTag,
    getPub,
    parseNaddr,
  } from '$lib/functions';

  import {
    AppBar,
    Modal,
    Tab,
    TabGroup,
    popup,
    type PopupSettings,
    type ModalSettings,
    type ModalComponent,
    ProgressRadial,
    type PaginationSettings,
    Paginator,
  } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import { modalStore, toastStore } from '$lib/store';
  import { onMount } from 'svelte';
  import {
    RelaysforSearch,
    allView,
    nowProgress,
    searchRelays,
  } from '$lib/store';
  import ModalCopyPubkey from '$lib/components/ModalCopyPubkey.svelte';
  import ModalEventJson from '$lib/components/ModalEventJson.svelte';
  import PostNote from '$lib/components/PostNote.svelte';
  import Content from '$lib/components/Content.svelte';
  import Search from '$lib/components/Search.svelte';
  import { searchIcon, warningOnIcon, warningOffIcon } from '$lib/myicons';
  import Share from '$lib/components/Button/Share.svelte';
  import Open from '$lib/components/Button/Open.svelte';
  import ListTitle from '$lib/components/ListTitle.svelte';
  import SettingView from '$lib/components/SettingView.svelte';
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
  console.log(identifier);
  if (kind !== 30001) {
    message = 'ブクマのnaddrじゃないかも';
    //  console.log('ブクマのnaddrじゃないかも');
  }
  const filters_30001 =
    identifier.trim() !== ''
      ? [
          {
            authors: [pubkey],
            kinds: [kind],
            '#d': [identifier],
          },
        ]
      : [
          {
            authors: [pubkey],
            kinds: [kind],
          },
        ];

  let bookmarkEvent: Nostr.Event[];
  let identifiersList: {
    identifier?: string;
    title?: string;
    image?: string;
    description?: string;
  };
  let tabSet: number = 0;
  let bkm: string = 'pub';
  let viewContents: string[][];

  let URLPreview: boolean = true;
  let loadEvent: boolean = true;
  let writeRelays: string[];
  let loadSetting: number;
  let iconView: boolean;
  let isSmph: boolean;

  $: if (bookmarkEvent && bookmarkEvent.length > 0) {
    const tag = bookmarkEvent[0].tags.find((tag) => tag[0] === 'd');
    const title = bookmarkEvent[0].tags.find((tag) => tag[0] === 'title');
    const image = bookmarkEvent[0].tags.find((tag) => tag[0] === 'image');
    const description = bookmarkEvent[0].tags.find(
      (tag) => tag[0] === 'description',
    );
    identifiersList = {
      identifier: tag ? tag[1] : undefined,
      title: title ? title[1] : undefined,
      image: image ? image[1] : undefined,
      description: description ? description[1] : undefined,
    };
  }

  onMount(async () => {
    $nowProgress = true;
    const configJson = localStorage.getItem('config');
    // searchRelays = [...RelaysforSearch];
    if (configJson) {
      const configJson = localStorage.getItem('config');
      $searchRelays = [...RelaysforSearch];
      if (configJson) {
        const config = JSON.parse(configJson);
        $searchRelays = config.searchRelays;
        // URLPreview = config.URLPreview;
        // loadEvent = config.loadEvent;

        writeRelays = config.writeRelays;
        if ($searchRelays && $searchRelays.length == 0) {
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
              //モバイル通信cellular
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
    }
    isSmph = navigator.userAgent.match(/iPhone|Android.+Mobile/) ? true : false;
    console.log(isSmph);
    if (pubkey !== '' || relays.length > 0) {
      try {
        bookmarkEvent = await fetchFilteredEvents(relays, filters_30001);
        console.log(bookmarkEvent);
      } catch (error) {
        // console.log(bookmarkEvent);
        // if (bookmarkEvent.length === 0) {
        error = true;
        message = 'ブクマなんもないかも';
        //    console.log('ブクマなんもないかも');
        $nowProgress = false;
        return;
        //}
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
    placement: 'top',
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
    // console.log(metadata);

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
    //  console.log('quote');

    const tags = id[0] === 'a' ? [id] : [[...id, '', 'mention']];
    const modal: ModalSettings = {
      type: 'component',
      component: postNoteModalComponent,
      title: $_('nprofile.modal.postNote.title'),
      body: ``,
      value: {
        content: `\r\nnostr:${
          id[0] === 'a'
            ? nip19.naddrEncode(parseNaddr(id))
            : nip19.noteEncode(id[1])
        }\r\n`,
        tags: tags,
        pubkey: pubkey,
      },
      response: async (res) => {
        // console.log(res);
        if (res) {
          $nowProgress = true;
          const event: Nostr.Event = {
            id: '',
            pubkey: await getPub(),
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
          if (response.isSuccess) {
            const t = {
              message: response.msg.join('<br>'),
              timeout: 3000,
            };

            toastStore.trigger(t);
          } else {
            const t = {
              message: $_('nprofile.toast.failed_publish'),
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
    page: 0,
    limit: pagelimit,
    size: viewContents && viewContents.length > 0 ? viewContents.length : 1,
    amounts: [pagelimit],
  };

  $: paginatedSource = viewContents
    ? viewContents.slice(
        pages.page * pages.limit, // start
        pages.page * pages.limit + pages.limit, // end
      )
    : viewContents;

  function onPageChange(e: CustomEvent): void {
    // console.log(typeof e.detail);
    //console.log('event:page', e.detail);
    pages.page = e.detail;
    if (Object.is(e.detail, -0)) {
      //最後のページへ
      pages.page = Math.floor(viewContents.length / pages.limit);
    } else {
      pages.page = e.detail;
    }
    paginatedSource = viewContents.slice(
      pages.page * pages.limit, // start
      pages.page * pages.limit + pages.limit, // end
    );
    // スクロール位置を一番上に移動する
    // スクロール位置を一番上に設定

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }

  //-----------------------------------------------
  const searchModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: Search,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };
  function onClickSearch(filter: {}) {
    const modal: ModalSettings = {
      type: 'component',
      component: searchModalComponent,
      title: 'Search',
      body: ``,
      value: {
        filter: filter,
        isPageOwner: false,
      },
      response: async (res) => {
        //  console.log(res);
        if (res) {
        }
      },
    };
    modalStore.trigger(modal);
  }

  const desplayName = (metadata: Nostr.Event<number>) => {
    try {
      const content = JSON.parse(metadata.content);
      return `${content.display_name ?? ''}@${content.name}`;
    } catch (error) {
      return nip19.npubEncode(metadata.pubkey);
    }
  };
</script>

<svelte:head>
  <title>nostr-bookmark-viewer</title>
  <meta
    name="description"
    content="nostr kind:{kind}
pubkey:{nip19.npubEncode(pubkey)}
id:{identifier}"
  />
  <meta prefix="og: https://ogp.me/ns#" />
  <meta property="og:title" content="nostr-bookmark-viewer3" />
  <meta
    property="og:description"
    content="kind:{kind}
pubkey:{nip19.npubEncode(pubkey)}
id:{identifier}"
  />
  <meta
    property="og:image"
    content="https://nostr-bookmark-viewer3.vercel.app/img2.png"
  />
</svelte:head>
<Modal />

<div class="card p-1 variant-ghost-secondary z-20" data-popup="popupShare">
  <p>{$_('nprofile.html.share')}</p>
  <div class="arrow variant-filled-secondary z-20" />
</div>
<div class="card p-1 variant-ghost-secondary z-20" data-popup="popupOpen">
  <p>{$_('nprofile.html.openapp')}</p>
  <div class="arrow variant-filled-secondary z-20" />
</div>
<div class="card p-1 variant-ghost-secondary z-20" data-popup="popupMove">
  <p>{$_('nprofile.html.move')}</p>
  <div class="arrow variant-filled-secondary z-20" />
</div>
<div class="card p-1 variant-ghost-secondary z-20" data-popup="popupDelete">
  <p>{$_('nprofile.html.delete')}</p>
  <div class="arrow variant-filled-secondary z-20" />
</div>

<main class="m-auto max-w-6xl px-1 mt-12 mb-12 overflow-x-hidden">
  {#if !bookmarkEvent}
    now loading
  {:else if error}
    {message}
  {:else}
    <div class="w-full fixed top-0 left-1/2 transform -translate-x-1/2 z-10">
      <div class=" max-w-6xl m-auto z-10 drop-shadow">
        <AppBar
          gridColumns="grid grid-cols-[auto_1fr_auto]"
          slotDefault="place-self-center"
          slotTrail="place-self-end"
          padding="py-1"
          background="bg-surface-300-600-token "
          gap="gap-0"
        >
          <svelte:fragment slot="lead">
            <div
              class=" lead-icon z-20 bg-surface-100 rounded-full w-[32px] md:m-2"
            >
              <img
                src="https://nostr-bookmark-viewer3.vercel.app/favicon.png"
                alt="bkmstr"
              />
            </div>
          </svelte:fragment>

          <div class="grid grid-rows-[auto_auto] justify-items-center">
            <div class="h6 text-center overflow-x-hidden w-full truncate">
              <NostrApp relays={$searchRelays}>
                <Metadata
                  queryKey={['metadata', bookmarkEvent[0].pubkey]}
                  pubkey={bookmarkEvent[0].pubkey}
                  let:metadata
                >
                  {desplayName(metadata)}
                </Metadata>
              </NostrApp>
            </div>

            <div class="h6 text-center w-fit flex">
              ID:{bookmarkEvent[0].tags[0][1]}
              kind:{bookmarkEvent[0].kind}
            </div>
          </div>
        </AppBar>
      </div>
    </div>
    {#if bookmarkEvent[0] && pages.page === 0}
      <ListTitle
        sorce={identifiersList}
        {iconView}
        event={bookmarkEvent[0]}
        length={viewContents.length}
        isPageOwner={false}
      />
    {/if}
    <NostrApp relays={$searchRelays}>
      {#if paginatedSource}
        {#each paginatedSource as id, index}
          {#if id[0] !== 'd' && id[0] !== 'title' && id[0] !== 'image' && id[0] !== 'description'}<!--&& id[0] !== 'summary'-->
            <div
              class="card drop-shadow px-1 py-2 my-1 grid grid-cols-[1fr_auto] gap-1"
            >
              {#await getIdByTag(id)}
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
              {:then hexId}
                {#if (hexId.tag[0] === 'e' || hexId.tag[0] === 'a') && Object.keys(hexId.filter).length > 0}
                  <Text queryKey={[hexId.id]} id={hexId.id} let:text>
                    <div slot="loading">
                      <div class="grid grid-cols-[auto_1fr] gap-1 flex">
                        <div class="flex justify-center items-center h-auto">
                          <button
                            class="btn m-0 p-1 variant-filled-primary rounded-full"
                            on:click={() => {
                              onClickSearch(hexId.filter);
                              // window.open(
                              //   'https://koteitan.github.io/nostr-post-checker/?eid=' +
                              //     nip19.noteEncode(id[1]),
                              //   '_blank',
                              // );
                            }}>{@html searchIcon}</button
                          >
                        </div>
                        <div
                          class="text-sm break-all overflow-hidden break-all whitespace-pre-wrap"
                        >
                          Loading note... ({hexId.tag[1]})
                        </div>
                      </div>
                    </div>
                    <div slot="error">
                      <div class="grid grid-cols-[auto_1fr] gap-1 flex">
                        <div class="flex justify-center items-center h-auto">
                          <button
                            class="btn m-0 p-1 variant-filled-primary rounded-full"
                            on:click={() => {
                              onClickSearch(hexId.filter);
                              // window.open(
                              //   'https://koteitan.github.io/nostr-post-checker/?eid=' +
                              //     nip19.noteEncode(id[1]),
                              //   '_blank',
                              // );
                            }}>{@html searchIcon}</button
                          >
                        </div>
                        <div
                          class="text-sm break-all overflow-hidden break-all whitespace-pre-wrap"
                        >
                          Failed to get note ({hexId.tag[1]})
                        </div>
                      </div>
                    </div>

                    <div slot="nodata">
                      <div class="grid grid-cols-[auto_1fr] gap-1 flex">
                        <div class="flex justify-center items-center h-auto">
                          <button
                            class="btn m-0 p-1 variant-filled-primary rounded-full"
                            on:click={() => {
                              onClickSearch(hexId.filter);
                              // window.open(
                              //   'https://koteitan.github.io/nostr-post-checker/?eid=' +
                              //     nip19.noteEncode(id[1]),
                              //   '_blank',
                              // );
                            }}>{@html searchIcon}</button
                          >
                        </div>
                        <div
                          class="text-sm break-all overflow-hidden break-all whitespace-pre-wrap"
                        >
                          Note not found ({hexId.tag[1]})
                        </div>
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
                        <div class="parent-container">
                          <Content
                            text={text.content}
                            tag={text.tags}
                            id={text.id}
                            view={$allView}
                            {URLPreview}
                            isPageOwner={false}
                            {iconView}
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
                        <div class="parent-container">
                          <Content
                            text={text.content}
                            tag={text.tags}
                            id={text.id}
                            view={$allView}
                            {URLPreview}
                            isPageOwner={false}
                            {iconView}
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
                        <div class="parent-container">
                          <Content
                            text={text.content}
                            tag={text.tags}
                            id={text.id}
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
                        <div
                          class="grid grid-rows-[auto_1fr] gap-0.5 w-full break-words"
                        >
                          <div
                            class="w-full grid grid-cols-[auto_1fr_auto] gap-1 h-fix"
                          >
                            <div class="truncate wid justify-items-end">
                              <button
                                class="text-emerald-800 dark:text-blue-500"
                                on:click={() => {
                                  handleClickPubkey(metadata, text.pubkey);
                                }}
                                ><u
                                  >{#if JSON.parse(metadata.content).name !== ''}{JSON.parse(
                                      metadata.content,
                                    ).name}
                                  {:else}
                                    {nip19
                                      .npubEncode(text.pubkey)
                                      .slice(0, 12)}:{nip19
                                      .npubEncode(text.pubkey)
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
                                              .npubEncode(text.pubkey)
                                              .slice(0, 12)}:{nip19
                                              .npubEncode(text.pubkey)
                                              .slice(-4)}
                                          {/if}</u
                                        ></button
                                      >
                                    </div>
                                  </Metadata>
                                {:else if tag[0] === 'e' || tag[0] === 'q'}
                                  <Text
                                    queryKey={[tag[1]]}
                                    id={tag[1]}
                                    let:text
                                  >
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
                              text={text.content}
                              tag={text.tags}
                              id={text.id}
                              view={$allView}
                              {URLPreview}
                              isPageOwner={false}
                              {iconView}
                            />
                          </div>
                        </div>
                      </div>
                    </Metadata>
                  </Text>
                {:else}
                  <div class="grid grid-rows-[auto_auto] gap-0">
                    <div class="font-bold">{hexId.tag[0]}</div>
                    <div class="flex">
                      {#each hexId.tag.slice(1) as item}
                        <div class="flex flex-wrap px-1 mx-1 break-all">
                          {item}
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

                <!-------------------------------各アイテム右側のメニュー欄-->
                {#if id[0] === 'e' || id[0] === 'a'}
                  <div class="flex flex-col flex-wrap h-16">
                    {#if !$nowProgress}
                      <!---のすたーできょうゆう-->
                      <Text queryKey={[hexId.id]} id={hexId.id} let:text>
                        <button
                          slot="loading"
                          class="btn p-0 mt-1 justify-self-end w-6 rounded variant-filled-primary"
                          on:click={() => onClickQuote(id, '')}
                        >
                          <Share {isSmph} />
                        </button>

                        <button
                          slot="error"
                          class="btn p-0 mt-1 justify-self-end w-6 rounded variant-filled-primary"
                          on:click={() => onClickQuote(id, '')}
                        >
                          <Share {isSmph} />
                        </button>

                        <button
                          slot="nodata"
                          class="btn p-0 mt-1 justify-self-end w-6 rounded variant-filled-primary"
                          on:click={() => onClickQuote(id, '')}
                        >
                          <Share {isSmph} />
                        </button>

                        <button
                          class="btn p-0 mt-1 justify-self-end w-6 rounded variant-filled-primary"
                          on:click={() => onClickQuote(id, text.pubkey)}
                        >
                          <Share {isSmph} />
                        </button>
                      </Text>
                      <!---別アプリで開く-->
                      <button
                        class="btn p-0 mt-1 justify-self-end w-6 rounded variant-filled-primary"
                        on:click={() => {
                          window.open(
                            `https://nostr.com/${
                              id[0] === 'a'
                                ? nip19.naddrEncode(parseNaddr(id))
                                : nip19.noteEncode(id[1])
                            }`,
                            '_blank',
                          );
                        }}
                      >
                        <Open {isSmph} />
                      </button>
                    {/if}
                  </div>
                {/if}
              {/await}
            </div>
          {/if}
        {/each}
      {/if}
    </NostrApp>
  {/if}
</main>

<div class=" fixed bottom-0 z-10 w-full">
  <div class="mx-auto max-w-6xl variant-filled-primary">
    <div class="mx-auto max-w-2xl grid grid-cols-[1fr_auto]">
      <div class="flex justify-around">
        <button
          class="btn px-3 variant-filled-primary fill-current"
          on:click={() => {
            goto('/');
          }}
        >
          {@html HomeIcon}
        </button>

        <!-- せってい -->
        <button
          class="btn px-3 variant-filled-primary fill-current"
          use:popup={popupFeatured}
        >
          {@html SettingsIcon}
        </button>

        <!--popup-->
        <div data-popup="popupFeatured" class="z-20">
          <SettingView
            bind:URLPreview
            bind:iconView
            bind:loadEvent
            {pubkey}
            {relays}
            loadEventChange={false}
            editable={false}
          />
        </div>
        <!---->
      </div>

      <MyPaginator
        settings={pages}
        on:page={onPageChange}
        select="hidden"
        justify="justify-center"
        showFirstLastButtons={true}
        active="variant-filled-primary"
        controlVariant="variant-filled-primary"
        buttonClasses="!my-0 !py-0 !px-1  md:!px-6 place-items-center fill-current"
      />
    </div>
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
  .btn-group button {
    padding-right: 1rem;
    padding-left: 1rem;
  }
</style>
