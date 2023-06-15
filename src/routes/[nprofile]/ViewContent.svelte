<script lang="ts" context="module">
  interface Window {
    [x: string]: any;
    // NIP-07
    nostr: any;
  }
  declare var window: Window;
</script>

<script lang="ts">
  import {
    Modal,
    type ModalSettings,
    modalStore,
    type ModalComponent,
    Toast,
    type ToastSettings,
    toastStore,
  } from '@skeletonlabs/skeleton';
  import Note from './Note.svelte';
  import Other from './Other.svelte';
  import {
    bkm,
    bookmarkEvents,
    isMulti,
    privateTags,
    relays,
    tabSet,
    tags,
    checkedTags,
    pubkey,
    privateBookmarks,
    plainPrivateText,
  } from '$lib/store';
  import ModalMenu from './ModalMenu.svelte';
  import { nip19 } from 'nostr-tools';
  import { publishEvent } from '$lib/function';

  let modal: ModalSettings;

  let index = 0;
  let thisTag: string[] = [];

  function onClickMenu(tag: string[], idx: number) {
    index = idx;
    thisTag = tag;
    console.log(index);

    modal = {
      type: 'component',
      backdropClasses:
        '!bg-surface-400 dark:!bg-surface-700  !bg-opacity-20 dark:!bg-opacity-20',
      // Pass the component directly:
      component: modalComponent,
      // Provide arbitrary metadata to your modal instance:
      title: `select menu [tag:${$tags[$tabSet]} index:${index}]`,
      body: `${nip19.noteEncode(
        tag[1],
      )}  \n他のツールで操作を行った場合はリストを更新↻してから削除、移動を行ってください`,
      value: { noteId: nip19.noteEncode(tag[1]) },
      // Returns the updated response value
      response: (menuItem) => {
        if (menuItem) {
          switch (menuItem.name) {
            case 'close':
              break;
            case 'copyNote':
            case 'copyHex':
              copyNoteId(menuItem.name);
              break;
            case 'open':
              openOtherApp();
              break;

            case 'delete':
              deleteNote();
              break;
            case 'move':
              if (menuItem.value) {
                moveNote(menuItem.value);
              }
              break;
            default:
              break;
          }
        }
      },
    };

    modalStore.trigger(modal);
  }

  const modalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalMenu,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: '<p>Skeleton</p>',
  };

  function copyNoteId(str: string) {
    //ボタンのほうにimport { clipboard } from '@skeletonlabs/skeleton';ついてるのでToastだけ
    //というのはうそ
    console.log(thisTag[1]);
    const text = str === 'copyNote' ? nip19.noteEncode(thisTag[1]) : thisTag[1];

    navigator.clipboard.writeText(text).then(
      () => {
        // コピーに成功したときの処理
        console.log(`copied: ${text.slice(0, 15)}...`);

        const t: ToastSettings = {
          message: `copied: ${text.slice(0, 15)}...`,
          timeout: 3000,
        };
        toastStore.trigger(t);
      },
      () => {
        // コピーに失敗したときの処理
        console.log('コピー失敗');
        /**@type {import('@skeletonlabs/skeleton').ToastSettings}*/
        const t: ToastSettings = {
          message: 'failed to copy',
          timeout: 3000,
          background: 'bg-orange-500 text-white width-filled ',
        };
        toastStore.trigger(t);
      },
    );
  }
  function openOtherApp() {
    console.log('open');
    const noteid = nip19.noteEncode(thisTag[1]);
    window.open('https://nostrapp.link/#' + noteid, '_blank');
    //nostr.com: https://nostr.com/
    //nostx: https://nostx.shino3.net/
    //App Manager: https://nostrapp.link/#
  }
  async function moveNote(moveTag: string) {
    console.log('move', moveTag);
    //移動先のタグに移動させるタグを追加したtagsを作る
    let moveIdx = $tags.indexOf(moveTag);
    const moveTags = [...$bookmarkEvents[moveIdx].tags, ...[thisTag]];
    console.log(moveTags);

    // 送信用のイベントを作成する
    const moveEvent = {
      content: $bookmarkEvents[moveIdx].content,
      kind: $bookmarkEvents[moveIdx].kind,
      pubkey: $bookmarkEvents[moveIdx].pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: moveTags,
    };
    try {
      // publishEvent関数を非同期に呼び出し、結果を待つ
      const res = await publishEvent(moveEvent, $relays);

      const t = {
        message: res.msg.join('\n'),
        timeout: 5000,
      };
      toastStore.trigger(t);
      // 成功したら$bookmarkEventsを更新する
      if (!res.isSuccess) {
        const t = {
          message: '失敗したかも',
          timeout: 5000,
          background: 'variant-filled-error',
        };
        toastStore.trigger(t);
        return;
      }
      //移動先にプッシュが成功したらーーーーーーーーーーーーーーー
      $bookmarkEvents[moveIdx] = res.event;
    } catch (error) {
      console.log(error);
      return;
    }
    //今のタグから移動させるタグを消したtagsを作って消すのはdeleteNoteと同じなのでこれで終わり
    await deleteNote();
  }

  async function deleteNote() {
    console.log('delete');
    if ($bkm === 'pub') {
      // 今のタグから削除するタグを除いた新しいtagsを作る
      let thisTags = $bookmarkEvents[$tabSet].tags;
      thisTags.splice(index, 1);

      // 送信用のイベントを作成する
      const newEvent = {
        content: $bookmarkEvents[$tabSet].content,
        kind: $bookmarkEvents[$tabSet].kind,
        pubkey: $bookmarkEvents[$tabSet].pubkey,
        created_at: Math.floor(Date.now() / 1000),
        tags: thisTags,
      };

      // publishEvent関数を非同期に呼び出し、結果を待つ
      const res = await publishEvent(newEvent, $relays);

      const t = {
        message: res.msg.join('\n'),
        timeout: 5000,
      };
      toastStore.trigger(t);
      // 成功したら$bookmarkEventsを更新する
      if (res.isSuccess) {
        $bookmarkEvents[$tabSet] = res.event;
      }
    } else {
      // 今のタグから削除するタグを除いた新しいtagsを作る
      let thisTags = $privateTags[$tabSet].tags;
      thisTags.splice(index, 1);
      const thisContent = JSON.stringify(thisTags);
      const angouka = await window.nostr.nip04.encrypt($pubkey, thisContent);

      // 送信用のイベントを作成する
      const moveEvent = {
        content: angouka,
        kind: $bookmarkEvents[$tabSet].kind,
        pubkey: $bookmarkEvents[$tabSet].pubkey,
        created_at: Math.floor(Date.now() / 1000),
        tags: $bookmarkEvents[$tabSet].tags,
      };
      try {
        // publishEvent関数を非同期に呼び出し、結果を待つ
        const res = await publishEvent(moveEvent, $relays);

        const t = {
          message: res.msg.join('\n'),
          timeout: 5000,
        };
        toastStore.trigger(t);
        // 成功したら$bookmarkEventsを更新する
        if (!res.isSuccess) {
          const t = {
            message: '失敗したかも',
            timeout: 5000,
            background: 'variant-filled-error',
          };
          toastStore.trigger(t);
          return;
        }
        //プッシュが成功したらーーーーーーーーーーーーーーー
        $bookmarkEvents[$tabSet] = res.event;
        $privateBookmarks[$tabSet] = res.event.content;
        $plainPrivateText[$tabSet] = thisContent;
      } catch (error) {
        console.log(error);
      }
    }
  }

  function onChangeCheckList(idx: number) {
    if ($checkedTags.includes(idx)) {
      $checkedTags.splice($checkedTags.indexOf(idx), 1);
    } else {
      $checkedTags.push(idx);
    }

    console.log(idx);
    console.log($checkedTags);
  }
</script>

<Toast />
{#if $bkm === 'pub'}
  {#if $bookmarkEvents.length > 0 && tabSet != null}
    {#each $bookmarkEvents[$tabSet].tags as tag, idx}
      {#if tag[0] !== 'd'}
        <div class="card p-2 drop-shadow">
          <div class="grid grid-cols-[1fr_auto] gap-1">
            {#if tag[0] === 'e'}
              <Note {tag} />
            {:else}
              <Other {tag} />
            {/if}

            {#if $isMulti}
              <input
                class="checkbox scale-150"
                type="checkbox"
                value={idx}
                on:change={() => onChangeCheckList(idx)}
                checked={$checkedTags.includes(idx)}
              />
            {:else}
              <button
                class="btn-icon variant-filled justify-self-end"
                on:click={() => onClickMenu(tag, idx)}
              >
                Menu
              </button>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
  {/if}
{:else if $privateTags.length > 0 && tabSet != null && $privateTags[$tabSet].tags.length > 0}
  {#each $privateTags[$tabSet].tags as item, idx}
    {#if item[0] !== 'd'}
      <div class="card p-4 drop-shadow">
        <div class="grid grid-cols-[1fr_auto] gap-2">
          {#if item[0] === 'e'}
            <Note tag={item} />
          {:else}
            <Other tag={item} />
          {/if}

          {#if $isMulti}
            <input
              class="checkbox scale-150"
              type="checkbox"
              checked={$checkedTags.includes(idx)}
              on:change={() => onChangeCheckList(idx)}
            />
          {:else}
            <button
              class="btn-icon variant-filled justify-self-end"
              on:click={() => onClickMenu(item, idx)}
            >
              Menu
            </button>
          {/if}
        </div>
      </div>
    {/if}
  {/each}
{/if}

<Modal zIndex="z-10" />

<style>
  .card {
    margin-top: 5px;
  }
</style>
