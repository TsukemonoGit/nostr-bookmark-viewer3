<script lang="ts" context="module">
  interface Window {
    // NIP-07
    nostr: any;
  }
  declare var window: Window;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { ProgressRadial, Toast, toastStore } from '@skeletonlabs/skeleton';
  import type { ToastSettings } from '@skeletonlabs/skeleton';
  import { decodePublicKeyToHex } from '../lib/function';
  import { goto } from '$app/navigation';

  import { nip19 } from 'nostr-tools';

  let pubkey: string;
  let relays: string[] = [];
  let relay: string;

  let nowProgress = false;
  let toast: ToastSettings;
  //--------------------------------------------

  // コンポーネントが最初に DOM にレンダリングされた後に実行されます(?)
  onMount(async () => {
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
    }
    let tmpRelays; //無効なアドレス入ってる可能性ありっぽいからチェックしてから入れる
    try {
      tmpRelays = await window.nostr.getRelays();
      console.log(tmpRelays);
    } catch (error) {
      console.log(error);
      toast = {
        message: 'failed to get pubkey',
        timeout: 3000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);
    }
    console.log(Object.keys(tmpRelays).length);
    if (Object.keys(tmpRelays).length !== 0) {
      let tmp = [];
      //有効なリレーがあったらrelaysに上書き
      for (const item in tmpRelays) {
        console.log(item);
        const res = await checkExistUrl(item);
        if (res) {
          tmp.push(item);
        }
      }
      if (tmp.length > 0) {
        relays = tmp;
      }
    }
  }

  async function addRelayList() {
    if (nowProgress) return;

    nowProgress = true;

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
      await goto(nprofile);
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
      return false;
      //throw new Error('error');
    }

    //そのURLのリレーが存在するか確認  NIP11

    let header = new Headers();
    header.set('Accept', 'application/nostr+json');
    try {
      let response = await fetch(url, { headers: header });
      console.log(response.status);
      console.log(await response.json());
      if (response.ok) {
        return true;
      } else {
        return false;
      }
      //.then(response=> console.log(response.json()))
    } catch {
      return false;
      //throw new Error('error');
    }
  }
</script>

<!---------------------------------------------------------------------->
<Toast />

<h4 class="h4">はじめに</h4>
<p class="hazimeni">
  ブックマークを取得する公開鍵を設定し、接続するリレーをリレーリストに追加してください。<br
  />
  リレーが複数の場合、取得したリストの中の最新を表示してるはず...<br />
  <br />

  なんもわからん人間が作ってるのでご利用は自己責任でお願いします。
</p>

<div class="content">
  <p style="font-weight:bold">公開鍵(public key)</p>
  <div
    class="input-group input-group-divider grid-cols-[auto_1fr] rounded-full"
  >
    <button
      class="py-1 btn variant-filled-secondary rounded-full"
      on:click={onClickNip07}>use NIP-07 <br />Extension</button
    >
    <input
      type="text"
      class=" textarea input1"
      bind:value={pubkey}
      placeholder="npub1..."
    />
  </div>
  ※use NIP-07 Extension: 拡張機能に有効なリレーを設定している場合リレーリストを上書きします
</div>

<div class="content">
  <p>
    <span style="font-weight:bold">リレー(relay)</span>
    URLを入力したら<u>add relay</u>をクリックしてください
  </p>
  <div class="relay input-group input-group-divider grid-cols-[1fr_auto]">
    <input
      class="input1"
      type="text"
      bind:value={relay}
      placeholder="wss://..."
      disabled={nowProgress}
    />
    <button class="py-1 btn variant-filled rounded-full" on:click={addRelayList}
      >add relay</button
    >
  </div>
  <ul id="list">
    リレーリスト
    {#if relays.length > 0}
      {#each relays as re, index}
        <div class="list">
          <li value={re}>
            <button
              class="py-1 btn2 btn variant-filled-primary rounded-full"
              on:click={() => clickRelay(index)}>delete</button
            >
            {re}
          </li>
        </div>
      {/each}
    {/if}
  </ul>
</div>

<button
  type="button"
  id="btn1"
  class="btn variant-filled-secondary rounded-full"
  on:click={onClickNext}>Next →</button
>

<hr />

<div id="footer">
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

<style>
  .hazimeni {
    border: solid 1px rgb(172, 172, 172);
    padding: 5px;
  }

  .content {
    margin: 2em 0em;
  }
  #btn1 {
    border-radius: 50em;
    margin-bottom: 2em;
    font-weight: bold;
    padding: 1em 1.5em;
  }
  .textarea {
    border-radius: 0%;
    text-overflow: ellipsis;
  }
  .input1 {
    padding: 0 1em;
  }
  .relay {
    height: 3em;
  }
  #list {
    margin: 1em;
    padding: 0.5em;
    border: solid 1px rgb(88, 88, 88);
  }
  li {
    margin: 0.5em;
  }
  .progress {
    display: block;
    position: fixed;
    bottom: 2em;
    right: 2em;
  }
  #footer {
    padding-left: 30px;
  }
</style>
