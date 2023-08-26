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
    LightSwitch,
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
  let wRelay: string;
  let writeRelays: string[] = [];

  // コンポーネントが最初に DOM にレンダリングされた後に実行されます(?)
  onMount(async () => {
    //-------------------------検索用リレーの設定
    const configJson = localStorage.getItem('config');
    if (configJson) {
      const config = JSON.parse(configJson);
      searchRelays = config.searchRelays;
      URLPreview = config.URLPreview;
      loadEvent = config.loadEvent;
      writeRelays = config.writeRelays ? config.writeRelays : [];
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

    //localStrageにnip05保存されてたら展開
    const domain = localStorage.getItem('domain');
    if (domain) {
      nip05 = domain;
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
      const tmpWriteRelays = await window.nostr.getRelays();
      const tmpRelays = Object.keys(tmpWriteRelays).filter(
        (relayUrl) => tmpWriteRelays[relayUrl].write === true,
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
      nowProgress = false;
    }
  }

  async function addRelayList(str: string, list: string[]) {
    if (nowProgress) return;
    if (!str) {
      return;
    }
    nowProgress = true;
    str = str.trim();
    //有効なアドレス化チェック
    //すでに存在しているかチェック
    if (list.includes(str)) {
      toast = {
        message: 'already exists',
        timeout: 3000,
        background: 'variant-filled',
      };
      toastStore.trigger(toast);
    } else {
      try {
        const res = await checkExistUrl(str);
        if (res) {
          list.push(str);
          refreshList();
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

    nowProgress = false;
  }

  function refreshList() {
    relays = relays;
    searchRelays = searchRelays;
    writeRelays = writeRelays;
    console.log(writeRelays);
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

  function saveSearchRelayList() {
    if (searchRelays) {
      try {
        const config = {
          searchRelays: searchRelays,
          URLPreview: URLPreview,
          loadEvent: loadEvent,
          writeRelays: writeRelays,
        };
        const save = JSON.stringify(config);
        localStorage.setItem('config', save);
      } catch (error) {
        console.log(error);
      }
    }
  }

  let viewSetting: boolean = false;
  let nip05: string = '';
  let nip05input: HTMLInputElement;
  let pubkeyinput: HTMLInputElement;

  async function getRelayList(list: string[]) {
    console.log('test');
    if (nowProgress) return;

    if (!nip05 || nip05.length === 0) {
      nip05input.focus();

      toast = {
        message: 'enter nip05 address',
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);
      return;
    } else if (!pubkey || pubkey.length === 0) {
      pubkeyinput.focus();
      toast = {
        message: 'enter public key',
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);
      return;
    }

    nowProgress = true;
    nip05 = nip05.trim();
    console.log(nowProgress);
    try {
      const hexkey = decodePublicKeyToHex(pubkey);

      const res = await fetch(`https://${nip05}/.well-known/nostr.json`);
      const json = await res.json();

      console.log(json);

      const tmpRelays = json.relays[hexkey];

      // 重複チェックと有効かチェックを Promise.all でまとめて非同期実行
      const promises = tmpRelays.map(async (item: string) => {
        console.log(item);
        if (!list.includes(item)) {
          const isValid = await checkExistUrl(item);
          if (isValid) {
            list.push(item);
          }
        }
      });

      await Promise.all(promises); // すべての非同期処理が終わるまで待つ

      localStorage.setItem('domain', nip05);
    } catch (error) {
      toast = {
        message: error,
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);
    } finally {
      nowProgress = false;
      refreshList();
    }
  }

  async function getRelayListExtension() {
    try {
      nowProgress = true;
      const tmpWriteRelays = await window.nostr.getRelays();
      const tmpRelays = Object.keys(tmpWriteRelays).filter(
        (relayUrl) => tmpWriteRelays[relayUrl].write === true,
      );

      for (const item of tmpRelays) {
        console.log(item);
        // 重複チェック
        if (!writeRelays.includes(item)) {
          // 有効かチェック
          const res = await checkExistUrl(item);
          if (res) {
            writeRelays.push(item);
          }
        }
      }

      nowProgress = false;
    } catch (error) {
      console.log(error);
      toast = {
        message: error,
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);
      nowProgress = false;
    }
    writeRelays = writeRelays;
  }
</script>

<!---------------------------------------------------------------------->
<Toast />

<h4 class="h4">ぶくまびうあ</h4>
<div class="py-2 border-solid border-2 border-surface-500/25 mx-4">
  <ul class="list px-4">
    <li>
      <span class="badge bg-primary-500" /><span
        >kind:30001に保存されているリスト(NIP-51)を取得、表示します。</span
      >
    </li>
    <li>
      <span class="badge bg-primary-500" />
      <span>
        ブックマークを取得する公開鍵を設定し、接続するリレーをリレーリストに追加してください。</span
      >
    </li>
    <li>
      <span class="badge bg-primary-500" />
      <span>
        各アイコンの説明は一覧ページ左上の 📝 マークをクリックすると表示されます</span
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
      bind:this={pubkeyinput}
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
    <button
      class="py-1 btn variant-filled"
      on:click={() => {
        console.log(relays);
        addRelayList(relay, relays);
        relay = '';
      }}>add relay</button
    >
  </div>
  <ul class="border-solid border-2 border-surface-500/25 mx-8 my-1">
    リレーリスト
    {#if relays.length > 0}
      {#each relays as re, index}
        <li value={re} class="pb-1 px-5">
          <div class="grid grid-cols-[auto_1fr] items-center">
            <button
              class="py-1 px-2 btn variant-filled-primary rounded-full"
              on:click={() => {
                relays.splice(index, 1);
                relays = relays;
              }}>delete</button
            >
            <div class="break-all">{re}</div>
          </div>
        </li>
      {/each}
    {/if}
  </ul>

  <div class="mt-4">（オプション）NIP-05からリレーリストに追加</div>
  <div class="relay input-group input-group-divider grid-cols-[1fr_auto]">
    <input
      class="px-2"
      type="text"
      bind:value={nip05}
      placeholder="example.com"
      disabled={nowProgress}
      bind:this={nip05input}
    />
    <button
      class="py-1 btn variant-filled"
      on:click={() => getRelayList(relays)}>get relays</button
    >
  </div>
</div>

<!----------------------------詳細設定-------------------------->
<div class="container py-4">
  <div class="font-medium">
    <button
      on:click={() => {
        viewSetting = !viewSetting;
      }}
    >
      {#if viewSetting}▲詳細設定{:else}▼詳細設定{/if}
    </button>
  </div>

  {#if viewSetting}
    <div class="card m-4 p-4">
      <div class="underline decoration-dotted mx-2 px-2">
        <p>nextボタンをおしたときに設定が保存されます</p>
        <p>とりあえずnprofileの方だけに適応</p>
        <p>(naddrのほうはデフォルトのまま)</p>
      </div>
      <ul>
        <li class="mt-5">
          <span class="badge bg-primary-500 mr-3" /><span class="font-medium"
            >検索用リレー</span
          >
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
              <button
                class="py-1 btn variant-filled"
                on:click={() => {
                  addRelayList(sRelay, searchRelays);
                  sRelay = '';
                }}>add relay</button
              >
            </div>
            <ul class="border-solid border-2 border-surface-500/25 mx-5 my-1">
              リレーリスト
              {#if searchRelays.length > 0}
                {#each searchRelays as re, index}
                  <li value={re} class="pb-1 px-3 break-all">
                    <div class="grid grid-cols-[auto_1fr] items-center">
                      <button
                        class="py-1 px-1 btn variant-filled-primary rounded-full"
                        on:click={() => {
                          searchRelays.splice(index, 1);
                          searchRelays = searchRelays;
                        }}>delete</button
                      >
                      <div class="break-all">{re}</div>
                    </div>
                  </li>
                {/each}
              {/if}
            </ul>
          </div>
        </li>
        <li class="mt-5">
          <span class="badge bg-primary-500 mr-3" /><span class="font-medium"
            >軽量用設定</span
          >
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
              <input
                class="checkbox"
                type="checkbox"
                bind:checked={URLPreview}
              />
              <p>自動的に画像を読み込む、URLプレビューを表示する</p>
            </label>
            <label class="flex items-center space-x-2">
              <input
                class="checkbox"
                type="checkbox"
                bind:checked={loadEvent}
              />
              <p>イベントの内容を読み込む (検索用リレー数0と同じ)</p>
            </label>
          </div>
        </li>

        <li class="mt-5">
          <span class="badge bg-primary-500 mr-3" /><span class="font-medium"
            >kind:1投稿用リレー</span
          >
          <p>
            （設定されていない場合、NIP07のリレーまたはブクマ取得に設定しているリレーにポストします）
          </p>
          <div class="ml-5 mt-1">
            <button
              type="button"
              class="btn variant-filled-surface mb-3 mt-1"
              on:click={() => {
                writeRelays = [];
              }}
            >
              削除
            </button>
            <div
              class="relay input-group input-group-divider grid-cols-[1fr_auto] h-12"
            >
              <input
                class="px-2"
                type="text"
                bind:value={wRelay}
                placeholder="wss://..."
                disabled={nowProgress}
              />
              <button
                class="py-1 btn variant-filled"
                on:click={() => {
                  addRelayList(wRelay, writeRelays);
                  wRelay = '';
                }}>add relay</button
              >
            </div>
            <ul class="border-solid border-2 border-surface-500/25 mx-5 my-1">
              リレーリスト
              {#if writeRelays.length > 0}
                {#each writeRelays as re, index}
                  <li value={re} class="pb-1 px-3 break-all">
                    <div class="grid grid-cols-[auto_1fr] items-center">
                      <button
                        class="py-1 px-1 btn variant-filled-primary rounded-full"
                        on:click={() => {
                          writeRelays.splice(index, 1);
                          writeRelays = writeRelays;
                        }}>delete</button
                      >
                      <div class="break-all">{re}</div>
                    </div>
                  </li>
                {/each}
              {/if}
            </ul>
            <div class="mt-4">（オプション）</div>

            <button
              class="py-1 btn variant-filled"
              on:click={() => getRelayList(writeRelays)}>NIP05から取得</button
            >

            <button
              class="py-1 btn variant-filled"
              on:click={getRelayListExtension}>NIP07から取得</button
            >
          </div>
        </li>
        <li class="mt-5">
          <span class="badge bg-primary-500 mr-3" /><span class="font-medium"
            >画面モード(仮)</span
          >
          <div class="ml-5 mt-1">
            <LightSwitch />
          </div>
        </li>
      </ul>
    </div>
  {/if}
</div>
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
    rel="noopener noreferrer"
    class="underline">TsukemonoGit/nostr-bookmark-viewer3</a
  > <br />
  Author:
  <a
    href="https://nostr.com/npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw"
    target="_blank"
    rel="noopener noreferrer"
    class="underline">mono(Nostr)</a
  >
  <br />
  <hr class="my-3" />
  [参考]
  <ul class="mx-3">
    <li>
      NIP-05:<a
        href="https://github.com/nostr-protocol/nips/blob/master/05.md"
        target="_blank"
        rel="noopener noreferrer"
        class="underline"
        >https://github.com/nostr-protocol/nips/blob/master/05.md</a
      >
    </li>
    <li>
      NIP-07:<a
        href="https://github.com/nostr-protocol/nips/blob/master/07.md"
        target="_blank"
        rel="noopener noreferrer"
        class="underline"
        >https://github.com/nostr-protocol/nips/blob/master/07.md</a
      >
    </li>
    <li>
      NIP-51:<a
        href="https://github.com/nostr-protocol/nips/blob/master/51.md"
        target="_blank"
        rel="noopener noreferrer"
        class="underline"
        >https://github.com/nostr-protocol/nips/blob/master/51.md</a
      >
    </li>
  </ul>
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
