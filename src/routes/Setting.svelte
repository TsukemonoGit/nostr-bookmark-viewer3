<script lang="ts" context="module">
  interface Window {
    // NIP-07
    nostr: any;
  }
  declare var window: Window;
</script>

<script lang="ts">
  import { _ } from 'svelte-i18n';

  // const $_ = unwrapFunctionStore(_);

  import { page } from '$app/stores';
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

  import { getPublicKey, nip19 } from 'nostr-tools';

  let pubkey: string = '';
  let relays: string[] = [];
  let relay: string;

  let nowProgress = false;
  let toast: ToastSettings;
  //--------------------------------------------
  let searchRelays: string[] = [];
  //let URLPreview: boolean;
  //let loadEvent: boolean;
  let sRelay: string;
  let wRelay: string;
  let writeRelays: string[] = [];

  let loadSetting: number = 0;
  let icon: boolean;
  // コンポーネントが最初に DOM にレンダリングされた後に実行されます(?)
  onMount(async () => {
    //-------------------------検索用リレーの設定
    const configJson = localStorage.getItem('config');
    if (configJson) {
      const config = JSON.parse(configJson);
      searchRelays = config.searchRelays;
      loadSetting = config.loadSetting ? config.loadSetting : 0;
      icon = config.icon ? config.icon : false;
      //URLPreview = config.URLPreview;
      //loadEvent = config.loadEvent;
      writeRelays = config.writeRelays ? config.writeRelays : [];
    } else {
      searchRelays = RelaysforSearch;
      loadSetting = 0;
      //URLPreview = true;
      //loadEvent = true;
    }
    // local strageに nsec が保存されていたら展開する
    const nsec = localStorage.getItem('nsec');
    if (nsec) {
      try {
        seckey = nip19.nsecEncode(nsec);
      } catch (error) {
        console.log('encodeerror');
      }
    }
    // local strageに nprofile が保存されていたら展開する
    const nprofile = localStorage.getItem('nprofile');
    if (nprofile) {
      try {
        const { type, data } = nip19.decode(nprofile);
        console.log(type);
        console.log(data);
        if (type === 'nprofile' && data.relays) {
          pubkey = nip19.npubEncode(data.pubkey);
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
      console.log(`hexpey:${pubkey}`);
      pubkey = nip19.npubEncode(pubkey);
    } catch (error) {
      console.log(error);
      toast = {
        message: $_('settings.toast.failPubkey'),
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
    if (pubkey.length === 0) {
      toast = {
        message: $_('settings.toast.errorPubkey'),
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);

      nowProgress = false;
      return;
    }
    let savePubkey;
    try {
      savePubkey = decodePublicKeyToHex(pubkey);
    } catch (error) {
      toast = {
        message: $_('settings.toast.errorPubkey'),
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);

      nowProgress = false;
      return;
    }

    // //relaysチェック
    // if (relays.length < 1) {
    //   toast = {
    //     message: $_('settings.toast.errorRelay'),
    //     timeout: 3000,
    //     background: 'variant-filled-error',
    //   };
    //   toastStore.trigger(toast);

    //   nowProgress = false;
    //   return;
    // }

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
        message: $_('settings.toast.errorEncode'),
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
          //: URLPreview,
          //loadEvent: loadEvent,
          loadSetting: loadSetting,
          writeRelays: writeRelays,
          icon: icon,
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
  let seckey: string;
  let seckeyinput;
  let secretOpen: boolean = false;
  let inputType = 'password';
  function onClickSaveSec() {
    try {
      const hexsec = nip19.decode(seckey);
      if (hexsec.type === 'nsec') {
        localStorage.setItem('nsec', hexsec.data);
        toast = {
          message: $_('settings.toast.nsec.save'),
          timeout: 3000,
        };
        toastStore.trigger(toast);
        if (pubkey === '') {
          pubkey = nip19.npubEncode(getPublicKey(hexsec.data));
        }
      } else {
        toast = {
          message: $_('settings.toast.nsec.failed'),
          timeout: 3000,
          background: 'variant-filled-error',
        };
        toastStore.trigger(toast);
      }
    } catch (error) {
      toast = {
        message: $_('settings.toast.nsec.failed'),
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);
    }
  }
  function onClickDeleteSec() {
    seckey = '';
    if (localStorage.getItem('nsec')) {
      localStorage.removeItem('nsec');
      toast = {
        message: $_('settings.toast.nsec.delete'),
        timeout: 3000,
      };
      toastStore.trigger(toast);
    }
  }

  function loadSettingChange(event: Event) {
    const target = event.target as HTMLInputElement;

    loadSetting = Number(target.value);
    console.log(loadSetting);
  }
</script>

<!---------------------------------------------------------------------->
<Toast />

<h4 class="h4">{$_('settings.page_title')}</h4>
<div class="py-2 border-solid border-2 border-surface-500/25 mx-4">
  <ul class="list px-4">
    <li>
      <span class="badge bg-primary-500" /><span>{$_('settings.intro.1')}</span>
    </li>
    <li>
      <span class="badge bg-primary-500" />
      <span>{$_('settings.intro.2')} </span>
    </li>
    <li>
      <span class="badge bg-primary-500" />
      <span>{$_('settings.intro.3')} </span>
    </li>
  </ul>
</div>

<div class="container my-4">
  <button
    class="py-1 btn variant-filled-primary"
    on:click={() => {
      secretOpen = !secretOpen;
    }}>{$_('settings.main.nsec.button')}</button
  ><span class="ml-1 break-keep">{$_('settings.main.nsec.text')}</span>
  {#if secretOpen}
    <div class="card">
      <ul class="mx-3">
        <li>{$_('settings.main.nsec.set.list1')}</li>
        <li>
          {$_('settings.main.nsec.set.list2')}
          <a
            class="anchor"
            target="_blank"
            rel="noopener noreferrer"
            href="https://chrome.google.com/webstore/detail/nos2x/kpgefcfmnafjgpblomihpgmejjdanjjp"
            >nos2x</a
          >{$_('settings.main.nsec.set.list3')}
        </li>
        <li>
          <a
            class="anchor"
            target="_blank"
            rel="noopener noreferrer"
            href={$_('settings.main.nsec.set.link')}
            >{$_('settings.main.nsec.set.linkName')}</a
          >
        </li>
        <li>{$_('settings.main.nsec.set.list4')}</li>
      </ul>
      <div
        class="my-2 input-group input-group-divider grid-cols-[1fr_auto_auto_auto] gap-1"
      >
        {#if inputType === 'password'}
          <input
            type="password"
            class="px-2 text-ellipsis"
            bind:value={seckey}
            placeholder="nsec..."
            bind:this={seckeyinput}
          />
        {:else}
          <input
            type="text"
            class="px-2 text-ellipsis"
            bind:value={seckey}
            placeholder="nsec..."
            bind:this={seckeyinput}
          />
        {/if}
        <button
          class="btn variant-ghost-surface m-0 p-0"
          on:click={() => {
            inputType = inputType == 'password' ? 'text' : 'password';
          }}
          >{inputType == 'password'
            ? $_('settings.main.nsec.set.buttonView')
            : $_('settings.main.nsec.set.buttonHide')}
        </button>
        <button
          class="py-1 btn variant-filled-secondary"
          on:click={onClickSaveSec}
        >
          {$_('settings.main.nsec.set.buttonSave')}
        </button>
        <button
          class="py-1 btn variant-filled-secondary"
          on:click={onClickDeleteSec}
          >{$_('settings.main.nsec.set.buttonDelete')}</button
        >
      </div>
    </div>
  {/if}
</div>
<div class="container py-4">
  <p class="font-medium my-1">{$_('settings.main.pubkey.pubkey')}</p>
  <div class="input-group input-group-divider grid-cols-[auto_1fr]">
    <button
      class="py-1 btn variant-filled-secondary break-all whitespace-pre"
      on:click={onClickNip07}>{$_('settings.main.pubkey.button')}</button
    >
    <input
      type="text"
      class="px-2 text-ellipsis"
      bind:value={pubkey}
      placeholder="npub1..."
      bind:this={pubkeyinput}
    />
  </div>
  <div class="text-sm ml-8">
    {$_('settings.main.pubkey.text')}
  </div>
</div>

<div class="container py-4">
  <p class="my-1">
    <span class="font-medium"> {$_('settings.main.relay.relay')}</span>
    <span class="text-sm ml-5 whitespace-nowrap"
      >{$_('settings.main.relay.text1')}<span
        class="rounded variant-filled p-1 m-1"
        >{$_('settings.main.relay.text2')}</span
      >{$_('settings.main.relay.text3')}</span
    >
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
      }}>{$_('settings.main.relay.button')}</button
    >
  </div>
  <ul class="border-solid border-2 border-surface-500/25 mx-8 my-1">
    {$_('settings.main.relay.text4')}
    {#if relays.length > 0}
      {#each relays as re, index}
        <li value={re} class="pb-1 px-5">
          <div class="grid grid-cols-[auto_1fr] items-center">
            <button
              class="py-1 px-2 btn variant-filled-primary rounded-full"
              on:click={() => {
                relays.splice(index, 1);
                relays = relays;
              }}
            >
              {$_('settings.main.relay.button2')}</button
            >
            <div class="break-all">{re}</div>
          </div>
        </li>
      {/each}
    {/if}
  </ul>

  <div class="mt-4 mx-8">
    {$_('settings.main.relay.text5')}
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
        on:click={() => getRelayList(relays)}
        >{$_('settings.main.relay.button3')}</button
      >
    </div>
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
      {#if viewSetting}{$_('settings.main.detail.open')}{:else}{$_(
          'settings.main.detail.close',
        )}{/if}
    </button>
  </div>

  {#if viewSetting}
    <div class="card m-4 p-4">
      <div class=" mx-2 px-2">{$_('settings.main.detail.text')}</div>
      <ul>
        <li class="mt-5">
          <span class="badge bg-primary-500 mr-3" /><span class="font-medium"
            >{$_('settings.main.detail.text2')}</span
          >
          <div class="ml-7 mt-1">
            <button
              type="button"
              class="btn variant-filled-surface mb-3 mt-1"
              on:click={() => {
                console.log(RelaysforSearch);
                searchRelays = [...RelaysforSearch];
              }}>{$_('settings.main.detail.button')}</button
            >
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
                }}>{$_('settings.main.detail.button2')}</button
              >
            </div>
            <ul class="border-solid border-2 border-surface-500/25 mx-5 my-1">
              {$_('settings.main.detail.text3')}
              {#if searchRelays.length > 0}
                {#each searchRelays as re, index}
                  <li value={re} class="pb-1 px-3 break-all">
                    <div class="grid grid-cols-[auto_1fr] items-center">
                      <button
                        class="py-1 px-1 btn variant-filled-primary rounded-full"
                        on:click={() => {
                          searchRelays.splice(index, 1);
                          searchRelays = searchRelays;
                        }}>{$_('settings.main.detail.button3')}</button
                      >
                      <div class="break-all">{re}</div>
                    </div>
                  </li>
                {/each}
              {/if}
            </ul>
          </div>
        </li>
        <li class="mt-7">
          <span class="badge bg-primary-500 mr-3" /><span class="font-medium"
            >{$_('settings.main.detail.text4')}</span
          >
          <div class="ml-5 mt-1">
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input
                  class="radio"
                  type="radio"
                  checked={loadSetting === 0 ? true : false}
                  name="radio-direct"
                  value="0"
                  on:change={(event) => loadSettingChange(event)}
                />
                <p>{$_('settings.main.detail.radio_1')}</p>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  class="radio"
                  type="radio"
                  checked={loadSetting === 1 ? true : false}
                  name="radio-direct"
                  value="1"
                  on:change={(event) => loadSettingChange(event)}
                />
                <p>{$_('settings.main.detail.radio_2')}</p>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  class="radio"
                  type="radio"
                  checked={loadSetting === 2 ? true : false}
                  name="radio-direct"
                  value="2"
                  on:change={(event) => loadSettingChange(event)}
                />
                <p>{$_('settings.main.detail.radio_3')}</p>
              </label>
              <!--checkbox-->
              <label class="flex items-center space-x-2">
                <input class="checkbox" type="checkbox" bind:checked={icon} />
                <p>{$_('settings.main.detail.icon')}</p>
              </label>
            </div>
          </div>
        </li>

        <li class="mt-7">
          <span class="badge bg-primary-500 mr-3" /><span class="font-medium"
            >{$_('settings.main.detail.text8')}</span
          >
          <p>{$_('settings.main.detail.text9')}</p>
          <div class="ml-5 mt-1">
            <button
              type="button"
              class="btn variant-filled-surface mb-3 mt-1"
              on:click={() => {
                writeRelays = [];
              }}>{$_('settings.main.detail.button4')}</button
            >
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
                }}>{$_('settings.main.detail.button5')}</button
              >
            </div>
            <ul class="border-solid border-2 border-surface-500/25 mx-5 my-1">
              {$_('settings.main.detail.text10')}
              {#if writeRelays.length > 0}
                {#each writeRelays as re, index}
                  <li value={re} class="pb-1 px-3 break-all">
                    <div class="grid grid-cols-[auto_1fr] items-center">
                      <button
                        class="py-1 px-1 btn variant-filled-primary rounded-full"
                        on:click={() => {
                          writeRelays.splice(index, 1);
                          writeRelays = writeRelays;
                        }}>{$_('settings.main.detail.button6')}</button
                      >
                      <div class="break-all">{re}</div>
                    </div>
                  </li>
                {/each}
              {/if}
            </ul>
            <div class="mt-4">{$_('settings.main.detail.text11')}</div>

            <button
              class="py-1 btn variant-filled"
              on:click={() => getRelayList(writeRelays)}
              >{$_('settings.main.detail.button7')}</button
            >

            <button
              class="py-1 btn variant-filled"
              on:click={getRelayListExtension}
              >{$_('settings.main.detail.button8')}</button
            >
          </div>
        </li>
        <li class="mt-7">
          <span class="badge bg-primary-500 mr-3" /><span class="font-medium"
            >{$_('settings.main.detail.text12')}</span
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

<hr class="mt-5" />

<footer
  class="mt-2 pt-3 pb-2 card-footer variant-glass-primary break-keep text-sm"
>
  <div class="flex justify-center">
    <ul class="list-none">
      <li class="mx-1 inline whitespace-nowrap">
        <a
          href="https://github.com/TsukemonoGit/nostr-bookmark-viewer3"
          target="_blank"
          rel="noopener noreferrer"
          class="underline"
        >
          Github</a
        >
      </li>
      <li class="mx-1 inline whitespace-nowrap">
        <a
          href="https://nostr.com/npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw"
          target="_blank"
          rel="noopener noreferrer"
          class="underline">mono(Nostr)</a
        >
      </li>

      <li class="mx-2 inline whitespace-nowrap">
        <button
          class="btn variant-ghost-primary h-6 px-2 rounded-full"
          data-npub="npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw"
          data-note-id="note1w2896we9rcrearfq5dtexv0hpd7mr5l053vhd8tn5ertgdjnzensdhaynh"
          data-relays="wss://yabu.me.io,wss://nos.lol,wss://relay-jp.nostr.wirednet.jp,wss://relay.nostr.band"
          >zap⚡️
        </button>
        <script src="https://cdn.jsdelivr.net/npm/nostr-zap@0.21.0"></script>
      </li>
      <li class="mx-2 inline whitespace-nowrap">-</li>
      <li class="mx-1 inline whitespace-nowrap">
        <a
          href="https://welcome.nostr-jp.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline">Nostr</a
        >
      </li>
      <!-- <li class="mx-2 inline whitespace-nowrap">
        <a
          href="https://dupstr.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline">(Note Duplicater)</a
        >
      </li> -->

      <li class="mx-1 inline whitespace-nowrap">
        <a
          href="https://github.com/nostr-protocol/nips/blob/master/05.md"
          target="_blank"
          rel="noopener noreferrer"
          class="underline">NIP-05</a
        >
      </li>
      <li class="mx-1 inline whitespace-nowrap">
        <a
          href="https://github.com/nostr-protocol/nips/blob/master/07.md"
          target="_blank"
          rel="noopener noreferrer"
          class="underline">NIP-07</a
        >
      </li>
      <li class="mx-1 inline whitespace-nowrap">
        <a
          href="https://github.com/nostr-protocol/nips/blob/master/51.md"
          target="_blank"
          rel="noopener noreferrer"
          class="underline">NIP-51</a
        >
      </li>
    </ul>
  </div>
</footer>

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
