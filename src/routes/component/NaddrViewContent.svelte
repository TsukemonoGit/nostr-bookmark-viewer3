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
  export let bookmark: Event;

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

{#if bookmark}
  {#each bookmark.tags as tag, idx}
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

<style>
  .card {
    margin-top: 5px;
  }
</style>
