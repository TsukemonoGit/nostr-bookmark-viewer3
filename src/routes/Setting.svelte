<script lang="ts" context="module">
  interface Window {
    // NIP-07
    nostr: any;
  }
  declare var window: Window;
</script>

<script lang="ts">
  import { RelaysforSearch } from '$lib/store';
  import { onMount } from 'svelte';
  import {
    ProgressRadial,
    Toast,
    toastStore,
    // TreeView,
    // TreeViewItem,
  } from '@skeletonlabs/skeleton';
  import type { ToastSettings } from '@skeletonlabs/skeleton';
  import { decodePublicKeyToHex } from '../lib/functions';
  import { goto } from '$app/navigation';

  import { nip19 } from 'nostr-tools';

  let pubkey: string;
  let relays: string[] = [];
  let relay: string;

  let nowProgress = false;
  let toast: ToastSettings;
  //--------------------------------------------
  let searchRelays: string[] = [];
  let URLPreview: boolean;
  let loadEvent: boolean;
  let sRelay: string;
  // コンポーネントが最初に DOM にレンダリングされた後に実行されます(?)
  onMount(async () => {
    //-------------------------検索用リレーの設定
    const configJson = localStorage.getItem('config');
    if (configJson) {
      const config = JSON.parse(configJson);
      searchRelays = config.searchRelays;
      URLPreview = config.URLPreview;
      loadEvent = config.loadEvent;
    } else {
      searchRelays = RelaysforSearch;
      URLPreview = true;
      loadEvent = true;
    }

    // local strageに nprofile が保存されていたら展開する
    const nprofile = localStorage.getItem('nprofile');
    if (nprofile) {
      try {
        const { type, data } = nip19.decode(nprofile);
        console.log(type);
        console.log(data);
        if (type === 'nprofile' && data.relays) {
          pubkey = data.pubkey;
          relays = data.relays;
        }
      } catch (error) {
        console.log('nprofileのデコードに失敗しました');
      }
    }
  });

  async function onClickNip07() {
    try {
      pubkey = await window.nostr.getPublicKey();
    } catch (error) {
      console.log(error);
      toast = {
        message: 'failed to get pubkey',
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);
      return;
    }

    try {
      nowProgress = true;
      const writeRelays = await window.nostr.getRelays();
      const tmpRelays = Object.keys(writeRelays).filter(
        (relayUrl) => writeRelays[relayUrl].write === true,
      );

      const tmp: string[] = [];

      for (const item of tmpRelays) {
        console.log(item);
        // 重複チェック
        if (!tmp.includes(item)) {
          // 有効かチェック
          const res = await checkExistUrl(item);
          if (res) {
            tmp.push(item);
          }
        }
      }

      if (tmp.length > 0) {
        relays = tmp;
      }

      nowProgress = false;
    } catch (error) {
      console.log(error);
      toast = {
        message: 'failed to get relays',
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);
    }
  }

  async function addRelayList() {
    if (nowProgress) return;

    nowProgress = true;
    relay = relay.trim();
    //有効なアドレス化チェック
    //すでに存在しているかチェック
    if (relays.includes(relay)) {
      toast = {
        message: 'already exists',
        timeout: 3000,
        background: 'variant-filled',
      };
      toastStore.trigger(toast);
    } else {
      try {
        const res = await checkExistUrl(relay);
        if (res) {
          relays.push(relay);
          relays = relays;
        } else {
          nowProgress = false;
          throw new Error();
        }
      } catch (error) {
        toast = {
          message: 'Please check relay URL',
          timeout: 3000,
          background: 'variant-filled-error',
        };
        toastStore.trigger(toast);
      }
    }
    relay = '';

    nowProgress = false;
  }

  function clickRelay(index: number) {
    relays.splice(index, 1);
    relays = relays;
  }

  async function onClickNext() {
    nowProgress = true;
    saveSearchRelayList();
    //pubkeyチェック
    let savePubkey;
    try {
      savePubkey = decodePublicKeyToHex(pubkey);
    } catch (error) {
      toast = {
        message: 'Please check pubkey',
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);

      nowProgress = false;
      return;
    }

    //relaysチェック
    if (relays.length < 1) {
      toast = {
        message: 'Please add relay',
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);

      nowProgress = false;
      return;
    }

    //nprofileを作って次のページへ
    const profile = {
      pubkey: savePubkey,
      relays: relays,
    };
    try {
      const nprofile = nip19.nprofileEncode(profile);
      //ローカルストレージに保存
      localStorage.setItem('nprofile', nprofile);

      nowProgress = false;
      //次へ
      await goto('/p/' + nprofile);
    } catch (error) {
      toast = {
        message: 'nprofileエンコードに失敗しました',
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);

      nowProgress = false;
      return;
    }
  }

  //---------------------------------------------
  async function checkExistUrl(_relay: string) {
    let protocol, urlstr, url;
    if (_relay.startsWith('ws://')) {
      // inputValueがws://から始まる場合
      protocol = 'ws';
      urlstr = _relay.slice(5); // ws://の部分を削除した残りの文字列を取得する
      url = new URL('http://' + urlstr);
    } else if (_relay.startsWith('wss://')) {
      // inputValueがwss://から始まる場合
      protocol = 'wss';
      urlstr = _relay.slice(6); // wss://の部分を削除した残りの文字列を取得する
      url = new URL('https://' + urlstr);
    } else {
      console.log('test');
      return false;
      //throw new Error('error');
    }

    //そのURLのリレーが存在するか確認  NIP11

    let header = new Headers();
    header.set('Accept', 'application/nostr+json');
    try {
      let response = await fetch(url, { headers: header });
      console.log(response);
      console.log(response.status);
      try {
        console.log(await response.json());
      } catch {}
      if (response.ok) {
        return true;
      } else {
        return false;
      }
      //.then(response=> console.log(response.json()))
    } catch (error) {
      console.log(error);
      return false;
      //throw new Error('error');
    }
  }

  //-----------------------------------------------------

  async function addSearchRelayList() {
    if (nowProgress) return;

    nowProgress = true;
    sRelay = sRelay.trim();
    //有効なアドレス化チェック
    //すでに存在しているかチェック
    if (searchRelays.includes(sRelay)) {
      toast = {
        message: 'already exists',
        timeout: 3000,
        background: 'variant-filled',
      };
      toastStore.trigger(toast);
    } else {
      try {
        const res = await checkExistUrl(sRelay);
        if (res) {
          searchRelays.push(sRelay);
          searchRelays = searchRelays;
        } else {
          nowProgress = false;
          throw new Error();
        }
      } catch (error) {
        toast = {
          message: 'Please check relay URL',
          timeout: 3000,
          background: 'variant-filled-error',
        };
        toastStore.trigger(toast);
      }
    }
    sRelay = '';

    nowProgress = false;
  }
  function deleteSearchRelay(index: number) {
    searchRelays.splice(index, 1);
    searchRelays = searchRelays;
  }
  function saveSearchRelayList() {
    if (searchRelays) {
      try {
        const config = {
          searchRelays: searchRelays,
          URLPreview: URLPreview,
          loadEvent: loadEvent,
        };
        const save = JSON.stringify(config);
        localStorage.setItem('config', save);
      } catch (error) {
        console.log(error);
      }
    }
  }

  let viewSetting: boolean = false;
</script>

<!---------------------------------------------------------------------->
<Toast />

<h4 class="h4">ぶくまびうあ</h4>
<div class="py-2 border-solid border-2 border-surface-500/25 mx-4">
  <ul class="list px-4">
    <li>
      <span class="badge bg-primary-500" /><span
        >kind:30001に保存されているリストを取得、表示します。</span
      >
    </li>
    <li>
      <span class="badge bg-primary-500" />
      <span>
        ブックマークを取得する公開鍵を設定し、接続するリレーをリレーリストに追加してください。</span
      >
    </li>
  </ul>
</div>

<div class="container my-4">
  <p class="font-medium">公開鍵(public key)</p>
  <div class="input-group input-group-divider grid-cols-[auto_1fr]">
    <button class="py-1 btn variant-filled-secondary" on:click={onClickNip07}
      >use NIP-07 <br />Extension</button
    >
    <input
      type="text"
      class="px-2 text-ellipsis"
      bind:value={pubkey}
      placeholder="npub1..."
    />
  </div>
  <div class="text-sm mx-8">
    ※use NIP-07 Extension:
    拡張機能に有効なリレー(write)を設定している場合リレーリストを上書きします
  </div>
</div>

<div class="container py-4">
  <p>
    <span class="font-medium mr-1">リレー(relay)</span>
    URLを入力したら<span class="rounded-full variant-filled p-1 m-1"
      >add relay</span
    >をクリックしてください
  </p>
  <div class="relay input-group input-group-divider grid-cols-[1fr_auto] h-12">
    <input
      class="px-2"
      type="text"
      bind:value={relay}
      placeholder="wss://..."
      disabled={nowProgress}
    />
    <button class="py-1 btn variant-filled" on:click={addRelayList}
      >add relay</button
    >
  </div>
  <ul class="border-solid border-2 border-surface-500/25 mx-8 my-1">
    リレーリスト
    {#if relays.length > 0}
      {#each relays as re, index}
        <li value={re} class="pb-1 px-5">
          <button
            class="py-1 btn variant-filled-primary rounded-full"
            on:click={() => clickRelay(index)}>delete</button
          >
          {re}
        </li>
      {/each}
    {/if}
  </ul>
</div>

<div class="mt-2 mb-1">
  <button
    on:click={() => {
      viewSetting = !viewSetting;
    }}
  >
    {#if viewSetting}▲詳細設定{:else}▼詳細設定{/if}
  </button>
</div>

{#if viewSetting}
  <div class="card m-1 p-1">
    <p>nextボタンをおしたときに設定が保存されます</p>
    <p>とりあえずnprofileの方だけに適応</p>
    <p>(naddrのほうはデフォルトのまま)</p>
  </div>
  <ul>
    <li class="mt-3">
      <span class="badge bg-primary-500 mr-3" />検索用リレー
      <div class="ml-5 mt-1">
        <button
          type="button"
          class="btn variant-filled-surface mb-3 mt-1"
          on:click={() => {
            console.log(RelaysforSearch);
            searchRelays = [...RelaysforSearch];
          }}
        >
          デフォルトに戻す
        </button>
        <div
          class="relay input-group input-group-divider grid-cols-[1fr_auto] h-12"
        >
          <input
            class="px-2"
            type="text"
            bind:value={sRelay}
            placeholder="wss://..."
            disabled={nowProgress}
          />
          <button class="py-1 btn variant-filled" on:click={addSearchRelayList}
            >add relay</button
          >
        </div>
        <ul class="border-solid border-2 border-surface-500/25 mx-8 my-1">
          リレーリスト
          {#if searchRelays.length > 0}
            {#each searchRelays as re, index}
              <li value={re} class="pb-1 px-5">
                <button
                  class="py-1 btn variant-filled-primary rounded-full"
                  on:click={() => deleteSearchRelay(index)}>delete</button
                >
                {re}
              </li>
            {/each}
          {/if}
        </ul>
      </div>
    </li>
    <li class="mt-3">
      <span class="badge bg-primary-500 mr-3" />軽量用設定
      <div class="ml-5 mt-1">
        <button
          type="button"
          class="btn variant-filled-surface mb-3 mt-1"
          on:click={() => {
            URLPreview = true;
            loadEvent = true;
          }}
        >
          デフォルトに戻す
        </button>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" bind:checked={URLPreview} />
          <p>自動的に画像を読み込む、URLプレビューを表示する</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" bind:checked={loadEvent} />
          <p>イベントの内容を読み込む</p>
        </label>
      </div>
    </li>
  </ul>
{/if}
<!-- 
  Skeleton2.0でしかつかえなかったかも
<TreeView>
  <TreeViewItem>
    詳細設定
    <svelte:fragment slot="children">
      <p>nextボタンをおしたときに設定が保存されます</p>
      <p>とりあえずnprofileの方だけに適応</p>
      <p>(naddrのほうはデフォルトのまま)</p>
      <TreeViewItem>
        検索用リレー
        <svelte:fragment slot="children">
          <button
            type="button"
            class="btn variant-filled-surface mb-3 mt-1"
            on:click={() => {
              searchRelays = RelaysforSearch;
            }}
          >
            デフォルトに戻す
          </button>
          <div
            class="relay input-group input-group-divider grid-cols-[1fr_auto] h-12"
          >
            <input
              class="px-2"
              type="text"
              bind:value={sRelay}
              placeholder="wss://..."
              disabled={nowProgress}
            />
            <button
              class="py-1 btn variant-filled"
              on:click={addSearchRelayList}>add relay</button
            >
          </div>
          <ul class="border-solid border-2 border-surface-500/25 mx-8 my-1">
            リレーリスト
            {#if searchRelays.length > 0}
              {#each searchRelays as re, index}
                <li value={re} class="pb-1 px-5">
                  <button
                    class="py-1 btn variant-filled-primary rounded-full"
                    on:click={() => deleteSearchRelay(index)}>delete</button
                  >
                  {re}
                </li>
              {/each}
            {/if}
          </ul>
       
        </svelte:fragment>
      </TreeViewItem>
      <TreeViewItem>
        軽量用設定
        <svelte:fragment slot="children">
          <button
            type="button"
            class="btn variant-filled-surface mb-3 mt-1"
            on:click={() => {
              URLPreview = true;
              loadEvent = true;
            }}
          >
            デフォルトに戻す
          </button>
          <label class="flex items-center space-x-2">
            <input class="checkbox" type="checkbox" bind:checked={URLPreview} />
            <p>自動的に画像を読み込む、URLプレビューを表示する</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="checkbox" type="checkbox" bind:checked={loadEvent} />
            <p>イベントの内容を自動で読み込む</p>
          </label>
        </svelte:fragment>
      </TreeViewItem>
    </svelte:fragment>
  </TreeViewItem>
</TreeView> -->

<button
  type="button"
  class="btn variant-filled-secondary rounded-full my-5"
  on:click={onClickNext}>Next →</button
>

<hr />

<div>
  Github: <a
    href="https://github.com/TsukemonoGit/nostr-bookmark-viewer3"
    target="_blank"
    rel="noopener noreferrer">TsukemonoGit/nostr-bookmark-viewer3</a
  > <br />
  Author:
  <a
    href="https://nostx.shino3.net/npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw"
    target="_blank"
    rel="noopener noreferrer">mono(Nostr)</a
  >
</div>

{#if nowProgress}
  <div class="block fixed bottom-2 right-2">
    <ProgressRadial
      ...
      stroke={100}
      meter="stroke-primary-500"
      track="stroke-primary-500/30"
      width="w-24"
    />
  </div>
{/if}
