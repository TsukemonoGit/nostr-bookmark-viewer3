<script lang="ts">
  import {
    ProgressRadial,
    toastStore,
    type ToastSettings,
    Toast,
    AppBar,
    TabGroup,
    Tab,
    Modal,
    modalStore,
    type PopupSettings,
    popup,
  } from '@skeletonlabs/skeleton';
  import { afterUpdate, onMount, tick } from 'svelte';
  import { page } from '$app/stores';

  import { nip19, type Event } from 'nostr-tools';
  import { fetchFilteredEvents } from '$lib/function';
  import {
    bookmarkEvents,
    noteEvents,
    profileEvents,
    nowProgress,
    checkedTags,
    RelaysforSearch,
  } from '../../lib/store.js';
  import NaddrViewContent from '../component/NaddrViewContent.svelte';
  import { goto } from '$app/navigation';

  let toast: ToastSettings;
  //let bookmarkEvents: any[] = [];

  modalStore.set([]);

  let tagName: string;
  let thisPubkey: string;
  let thisRelays: string[];
  let bookmarkEvent: Event[] | undefined;
  let thisNoteEvent: Event[];
  // コンポーネントが最初に DOM にレンダリングされた後に実行されます(?)
  onMount(async () => {
    $nowProgress = true;
    //nprofileを展開する
    try {
      const { type, data } = nip19.decode($page.params.naddr);
      console.log(data);
      if (type === 'naddr' && data.relays) {
        thisPubkey = data.pubkey;
        thisRelays = data.relays;
        //$tabSet = 0;
        tagName = data.identifier;

        //イベントを取りに行く。
        const bFilter = [
          { kinds: [30001], authors: [thisPubkey], '#d': [tagName] },
        ];

        bookmarkEvent = await fetchFilteredEvents(thisRelays, bFilter);
        console.log(bookmarkEvents);

        // noteIdfilter作る
        let filteredNoteIds = noteIdFilter(bookmarkEvent[0]);
        console.log(filteredNoteIds);

        //--------------------------------------------------------------------

        const nFilter = [{ kinds: [1], ids: filteredNoteIds }];
        //eventを取りに行く
        thisNoteEvent = await fetchFilteredEvents(RelaysforSearch, nFilter);

        $noteEvents = [...$noteEvents, ...thisNoteEvent];

        //authorsfilter つくる
        let filteredAuthors = authorsFilter(thisNoteEvent);
        //     console.log(filteredAuthors);

        // ローカルストレージをチェックする
        const localProfile = localStorage.getItem('profiles');
        let localProfiles: Event[] = [];
        if (localProfile) {
          // localProfileに存在する分削除する
          localProfiles = JSON.parse(localProfile);

          // filteredAuthorsからlocalProfilesに存在する作者を削除する
          const updatedAuthors = filteredAuthors.filter((author) => {
            return !localProfiles.some((profile) => profile.pubkey === author);
          });

          console.log(updatedAuthors);
          // 削除された作者が含まれないことを確認するためにコンソール出力

          filteredAuthors = updatedAuthors;
        }

        const pFilter = [{ kinds: [0], authors: filteredAuthors }];

        //eventを取りに行く
        $profileEvents = await fetchFilteredEvents(RelaysforSearch, pFilter);
        console.log($profileEvents);

        // 合体した配列を作成
        $profileEvents = [...localProfiles, ...$profileEvents];
        console.log(profileEvents);
        // ローカルストレージに合体した配列を保存
        localStorage.setItem('profiles', JSON.stringify($profileEvents));
      } else {
        throw new Error('Failed to expand nprofile');
      }
    } catch (error: any) {
      console.log(error);

      toast = {
        message: error.message,
        timeout: 5000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);

      $nowProgress = false;
      return;
    }

    $nowProgress = false;
  });

  function noteIdFilter(bookmarkEvents: Event): string[] {
    const idSet: Set<string> = new Set();

    bookmarkEvents.tags.forEach((tag) => {
      if (tag[0] === 'e') {
        idSet.add(tag[1]);
      }
    });

    return Array.from(idSet);
  }

  //重複なしのpubkeyリストを作る
  function authorsFilter(noteEvents: Event[]): string[] {
    const authors: Set<string> = new Set();
    noteEvents.forEach((event) => {
      authors.add(event.pubkey);
    });
    return Array.from(authors);
  }

  afterUpdate(async () => {
    // リセット後に再描画をトリガーする
    $checkedTags = $checkedTags;
    $bookmarkEvents = $bookmarkEvents;
    $noteEvents = $noteEvents;
    $profileEvents = $profileEvents;
    await tick();
  });

  //-----こうしん-------

  async function onClickReload() {
    $nowProgress = true;
    console.log('click');

    //イベントを取りに行く。
    const bFilter = [
      { kinds: [30001], authors: [thisPubkey], '#d': [tagName] },
    ];

    thisNoteEvent = await fetchFilteredEvents(RelaysforSearch, bFilter);

    // 持っていないノートリスト
    // ID変わってなくても取得できていないデータを取りに行く
    let noteIDList: string[] = [];
    thisNoteEvent[0].tags.map((tag, index) => {
      if (index !== 0) {
        if (tag[0] === 'e') {
          //インデックス0はタグなので
          const note = thisNoteEvent.find((note) => note.id === tag[1]);
          if (!note) {
            noteIDList.push(tag[1]);
          }
        }
      }
    });

    //--------------------------------------------------------------------

    const nFilter = [{ kinds: [1], ids: noteIDList }];
    //eventを取りに行く
    const notes = await fetchFilteredEvents(RelaysforSearch, nFilter);
    console.log(notes);
    thisNoteEvent = [...thisNoteEvent, ...notes];
    //console.log($noteEvents);

    //console.log(noteIDList);
    //のーととる
    bookmarkEvent = bookmarkEvent;
    thisNoteEvent = thisNoteEvent;

    $nowProgress = false;
  }

  const popupFeatured: PopupSettings = {
    // Represents the type of event that opens/closed the popup
    event: 'click',
    // Matches the data-popup value on your popup element
    target: 'popupFeatured',
    // Defines which side of your trigger the popup will appear
    placement: 'bottom',
  };
</script>

<Modal />
<div class="card p-4 w-72 shadow-xl z-20 break-all" data-popup="popupFeatured">
  {#if thisPubkey && thisRelays}
    <div>
      <p>【pubkey】</p>

      <p>{nip19.npubEncode(thisPubkey)}</p>

      <p class="mt-2">【relays】</p>

      <ul class="list-disc">
        {#each thisRelays as relay}
          <li class="ml-4">{relay}</li>
        {/each}
      </ul>
    </div>
    <hr class="!border-t-2 my-1" />
    <div class="text-sm">
      （下の ↻ボタン でリストを更新）<br />
    </div>
    <hr class="!border-t-2 my-1" />
    <button
      type="button"
      class="btn variant-filled py-1"
      on:click={() => goto(window.location.origin)}>Go back to Setup</button
    >
    <div class="arrow bg-surface-100-800-token" />
  {/if}
</div>

<Toast />

<div class="w-full fixed top-0 left-1/2 transform -translate-x-1/2 z-10">
  <div class="max-w-screen-lg m-auto z-10">
    <AppBar
      gridColumns="grid grid-cols-[auto_1fr_auto]"
      slotDefault="place-self-center"
      slotTrail="place-content-end"
      padding="p-0"
      background="bg-surface-300-600-token "
      gap="gap-0"
    >
      <svelte:fragment slot="lead">
        <div class="lead-icon px-2">
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
          class="tabGroupContainer"
          border="border-b border-surface-400-500-token"
          rounded="rounded-tl-container-token rounded-tr-container-token"
        >
          <Tab bind:group={tagName} name={tagName} value={tagName}>
            {tagName}
          </Tab>
        </TabGroup>
      </div>

      <svelte:fragment slot="trail">
        <div class="lead-icon px-2">
          <button
            class="btn-icon variant-filled"
            on:click={() => goto(window.location.origin)}>TOP</button
          ><!--<LightSwitch />-->
        </div>
      </svelte:fragment>
    </AppBar>
  </div>
</div>
{#if bookmarkEvent}
  <div class="overflow-auto h-full">
    <div class=" max-w-screen-lg mx-auto px-1 mt-16 mb-16">
      <NaddrViewContent bind:bookmark={bookmarkEvent[0]} />
    </div>
  </div>
{/if}
{#if $nowProgress}
  <div class="progress">
    <ProgressRadial
      ...
      stroke={100}
      meter="stroke-primary-500"
      track="stroke-primary-500/30"
      width="w-24"
    />
  </div>
{/if}

<!-- <hr class="!border-dashed" /> -->

{#if !$nowProgress}
  <div class="footer">
    <!--こうしん-->
    <button
      type="button"
      id="hoverButton"
      class="btn-icon variant-filled-surface mx-1"
      on:click={onClickReload}>↻</button
    >
  </div>
{/if}

<style>
  .progress {
    display: block;
    position: fixed;
    bottom: 2em;
    right: 2em;
  }

  .tabGroup {
    flex: 1;
    max-width: calc(100vw - 7em);

    position: relative;
  }

  .footer {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
    bottom: 0.5em;
    left: 0;
    right: 0;
    padding: 0 1em;
  }
</style>
