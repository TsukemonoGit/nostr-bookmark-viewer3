<script lang="ts" context="module">
  interface Window {
    [x: string]: any;
    // NIP-07
    nostr: any;
  }
  declare var window: Window;
</script>

<script lang="ts">
  import OpenInBrowser from '@material-design-icons/svg/round/open_in_browser.svg?raw';
  import Chat from '@material-design-icons/svg/round/chat.svg?raw';
  import ArrowCircleRight from '@material-design-icons/svg/round/arrow_circle_right.svg?raw';
  import Delete from '@material-design-icons/svg/round/delete.svg?raw';
  import { _ } from 'svelte-i18n';
  import { page } from '$app/stores';
  import { Metadata, NostrApp, Text, Nostr } from 'nosvelte';
  import { nip04, nip19 } from 'nostr-tools';
  import 'websocket-polyfill';
  import {
    checkInput,
    fetchFilteredEvents,
    addNotes,
    addPrivateNotes,
    publishEvent,
    deleteNotes,
    deletePrivateNotes,
    uniqueTags,
    getPub,
    nip04De,
    getIdByTag,
    parseNaddr,
  } from '$lib/functions';
  import { getUserIcon } from '$lib/cache';
  import {
    AppBar,
    Modal,
    SlideToggle,
    Tab,
    TabGroup,
    Toast,
    popup,
    toastStore,
    type PopupSettings,
    type ToastSettings,
    modalStore,
    type ModalSettings,
    type ModalComponent,
    ProgressRadial,
    type PaginationSettings,
  } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import {
    RelaysforSearch,
    allView,
    bookmarkEvents,
    nowProgress,
    pageNprofile,
    searchRelays,
  } from '$lib/store';
  import ModalCopyPubkey from '$lib/components/ModalCopyPubkey.svelte';
  import ModalEventJson from '$lib/components/ModalEventJson.svelte';
  import ModalAddNote from '$lib/components/ModalAddNote.svelte';
  import ModalMove from '$lib/components/ModalMove.svelte';
  import ModalEditTag from '$lib/components/ModalEditTag.svelte';
  import Content from '$lib/components/Content.svelte';
  import ModalTagList from '$lib/components/ModalTagList.svelte';
  import PostNote from '$lib/components/PostNote.svelte';
  import MyPaginator from '$lib/components/MyPaginator.svelte';
  import Search from '$lib/components/Search.svelte';
  import {
    searchIcon,
    shareIcon,
    openAnotherAppIcon,
    deleteIcon,
    moveAnotherListIcon,
    tagListIcon,
    addNoteIcon,
    editTagIcon,
    updateListIcon,
    warningOnIcon,
    warningOffIcon,
  } from '$lib/myicons';
  import { get } from 'svelte/store';

  const { type, data } = nip19.decode($page.params.nprofile);
  console.log($page.url);

  console.log($page.url.searchParams);
  console.log($page.url.search);
  // const kind = $setKind ? $setKind : 30001;
  let kind = 30001;
  const { pubkey, relays, dtype } =
    type === 'nprofile'
      ? {
          pubkey: data.pubkey,
          relays:
            data.relays && data.relays.length > 0
              ? data.relays
              : RelaysforSearch,
          dtype: 'nprofile',
        }
      : type === 'npub'
      ? { pubkey: data, relays: RelaysforSearch, dtype: 'npub' }
      : { pubkey: '', relays: [], dtype: 'error' };

  const filters_30001 = [
    {
      authors: [pubkey],
      kinds: [kind],
    },
  ];

  let isPageOwner: boolean;
  let isMulti: boolean = false;
  let tabSet: number = 0;
  let bkm: string = 'pub';
  let viewContents: string[][];
  let message: string = 'now loading';

  let URLPreview: boolean = true;
  let loadEvent: boolean = true;
  let writeRelays: string[];
  onMount(async () => {
    $nowProgress = true;
    const searchParams = new URLSearchParams($page.url.search);
    if (searchParams.has('kind')) {
      const kindValue = searchParams.get('kind');
      if (kindValue !== null) {
        const parsedKind = parseInt(kindValue); // 文字列を数値に変換
        if (!isNaN(parsedKind) && parsedKind >= 10000 && kind < 40000) {
          kind = parsedKind; // 数値が正しくパースされた場合に kind 変数に設定
          filters_30001[0].kinds = [kind];
        }
      }
    }

    const configJson = localStorage.getItem('config');
    $searchRelays = [...RelaysforSearch];
    if (configJson) {
      const config = JSON.parse(configJson);
      $searchRelays = config.searchRelays;
      URLPreview = config.URLPreview;
      loadEvent = config.loadEvent;
      writeRelays = config.writeRelays;
      if ($searchRelays && $searchRelays.length == 0) {
        loadEvent = false;
      }
    }

    message = 'now loading';
    if (dtype === 'nprofile') {
      try {
        isPageOwner = (await getPub()) === pubkey;
      } catch (error) {
        console.log('ログインチェック失敗');
      }
    }
    //前回開いたnprofileと違うときにブクマ取得する
    if (get(pageNprofile) !== $page.url.href || $bookmarkEvents.length === 0) {
      if (pubkey !== '' || relays.length > 0) {
        $bookmarkEvents = await fetchFilteredEvents(relays, filters_30001);
        if ($bookmarkEvents.length > 0) {
          // bookmarkをbookmark[i].tags[0][1]の値で降順に並べ替える
          $bookmarkEvents.sort((a, b) => {
            const tagID_A = a.tags[0][1];
            const tagID_B = b.tags[0][1];
            return tagID_A.localeCompare(tagID_B);
          });
          console.log($bookmarkEvents);
          viewContents = $bookmarkEvents[tabSet].tags;
        } else {
          console.log('ブクマ何もないかも');
          message = $_('nprofile.message');
        }
        $nowProgress = false;
      } else {
        $nowProgress = false;
        const t = {
          message: 'error',
          timeout: 3000,
          background: 'bg-orange-500 text-white width-filled ',
        };
        toastStore.trigger(t);
        console.log('error');
      }
      $pageNprofile = $page.url.href;
    } else {
      //前回開いたnprofileと同じnprofileのとき
      viewContents = $bookmarkEvents[tabSet].tags;
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

  function wheelScroll(event: {
    preventDefault: () => void;
    deltaY: any;
  }): void {
    //console.log(event);
    const elements = document.querySelector('.tab-list');
    event.preventDefault();
    if (elements) {
      elements //.scrollLeft += event.deltaY;
        .scrollBy({
          top: 0,
          left: event.deltaY, // 横にスクロールする量
          behavior: 'smooth', // スクロールアニメーションを有効にする場合
        });
    }
  }

  async function onClickLogin() {
    let t: ToastSettings;
    try {
      const viewerPublicKey = await getPub();

      isPageOwner = viewerPublicKey === pubkey;
      if (isPageOwner) {
        t = {
          message: $_('nprofile.toast.login'),
          timeout: 3000,
        };
      } else {
        t = {
          message: $_('nprofile.toast.failed_login'),
          timeout: 3000,
          background: 'bg-orange-500 text-white width-filled ',
        };
      }
    } catch (error) {
      t = {
        message: $_('nprofile.toast.failed_login'),
        timeout: 3000,
        background: 'bg-orange-500 text-white width-filled ',
      };
    }
    toastStore.trigger(t);
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

  //--------------------------------------Add note
  const addModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalAddNote,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: '<p>Skeleton</p>',
  };

  //クリックしたときのタグの情報を渡す
  async function onClickAddNote(tag: number) {
    const modal: ModalSettings = {
      type: 'component',
      // backdropClasses:
      //   '!bg-surface-400 dark:!bg-surface-700  !bg-opacity-20 dark:!bg-opacity-40',
      // // Pass the component directly:
      component: addModalComponent,
      // Provide arbitrary metadata to your modal instance:
      title: `${$bookmarkEvents[tabSet].tags[0][1]}`,
      body: $_('nprofile.modal.addNote_body'),
      //value: { noteId: nip19.noteEncode(tag[1]) },
      // Returns the updated response value
      response: async (res) => {
        let check;

        if (res) {
          $nowProgress = true;
          let noteID = res.value;
          if (res.create) {
            const event: Nostr.Event<any> = {
              id: '',
              pubkey: await getPub(),
              created_at: Math.floor(Date.now() / 1000),
              kind: 1,
              tags: [],
              content: res.value,
              sig: '',
            };
            let writeTrueRelays: string[];
            if (writeRelays.length > 0) {
              writeTrueRelays = writeRelays;
            } else {
              try {
                const writeRelay: {
                  [url: string]: { write: boolean; read: boolean };
                } = await window.nostr.getRelays();
                writeTrueRelays = Object.keys(writeRelay).filter(
                  (relayUrl) =>
                    writeRelay[relayUrl as keyof typeof writeRelay].write ===
                    true,
                );
                writeTrueRelays =
                  writeTrueRelays.length > 0 ? writeTrueRelays : relays;
              } catch (error) {
                writeTrueRelays = relays;
              }
            }

            const response = await publishEvent(event, writeTrueRelays);
            if (response.isSuccess) {
              const t = {
                message: response.msg.join('<br>'),
                timeout: 3000,
              };

              toastStore.trigger(t);

              noteID = response.event.id;
            } else {
              const t = {
                message: 'failed to publish',
                timeout: 3000,
                background: 'bg-orange-500 text-white width-filled ',
              };
            }
          }

          //---------------------------------addnote
          switch (res.btn) {
            case 'pub':
              if (res.type === 'id') {
                check = await checkInput(noteID);

                if (check.error && typeof check.value === 'string') {
                  const t = {
                    message: check.value,
                    timeout: 3000,
                    background: 'bg-orange-500 text-white width-filled ',
                  };

                  toastStore.trigger(t);
                } else if (Array.isArray(check.value)) {
                  await updateBkmTag(tag); //最新の状態に更新
                  const result = await addNotes(relays, $bookmarkEvents[tag], [
                    check.value,
                  ]);
                  console.log(result);
                  if (result.isSuccess) {
                    $bookmarkEvents[tag] = result.event;
                    viewContents = $bookmarkEvents[tag].tags;
                    const t = {
                      message: 'Add note<br>' + result.msg.join('<br>'),
                      timeout: 3000,
                    };

                    toastStore.trigger(t);
                  } else {
                    const t = {
                      message: $_('nprofile.toast.failed_publish'),
                      timeout: 3000,
                      background: 'bg-orange-500 text-white width-filled ',
                    };

                    toastStore.trigger(t);
                  }
                }
              } else {
                try {
                  const tagArray = JSON.parse(res.tagvalue);
                  await updateBkmTag(tag); //最新の状態に更新
                  const result = await addNotes(relays, $bookmarkEvents[tag], [
                    tagArray,
                  ]);
                  console.log(result);
                  if (result.isSuccess) {
                    $bookmarkEvents[tag] = result.event;
                    viewContents = $bookmarkEvents[tag].tags;
                    const t = {
                      message: 'Add note<br>' + result.msg.join('<br>'),
                      timeout: 3000,
                    };

                    toastStore.trigger(t);
                  } else {
                    const t = {
                      message: $_('nprofile.toast.failed_publish'),
                      timeout: 3000,
                      background: 'bg-orange-500 text-white width-filled ',
                    };

                    toastStore.trigger(t);
                  }
                } catch (error) {
                  const t = {
                    message: $_('nprofile.toast.failed_publish'),
                    timeout: 3000,
                    background: 'bg-orange-500 text-white width-filled ',
                  };

                  toastStore.trigger(t);
                }
              }

              break;
            case 'prv':
              if (res.type === 'id') {
                check = await checkInput(noteID);
                console.log('test');
                if (check.error && typeof check.value === 'string') {
                  const t = {
                    message: check.value,
                    timeout: 3000,
                    background: 'bg-orange-500 text-white width-filled ',
                  };

                  toastStore.trigger(t);
                } else if (Array.isArray(check.value)) {
                  console.log('test');
                  await updateBkmTag(tag); //最新の状態に更新
                  const result = await addPrivateNotes(
                    relays,
                    $bookmarkEvents[tag],
                    [check.value as string[]],
                    pubkey,
                  );
                  console.log(result);
                  if (result.isSuccess) {
                    $bookmarkEvents[tag] = result.event;
                    viewContents = $bookmarkEvents[tag].tags;
                    const t = {
                      message: 'Add note<br>' + result.msg.join('<br>'),
                      timeout: 3000,
                    };

                    toastStore.trigger(t);
                  } else {
                    const t = {
                      message: $_('nprofile.toast.failed_publish'),
                      timeout: 3000,
                      background: 'bg-orange-500 text-white width-filled ',
                    };

                    toastStore.trigger(t);
                  }
                }
              } else {
                try {
                  const tagArray = JSON.parse(res.tagvalue);
                  await updateBkmTag(tag); //最新の状態に更新
                  const result = await addPrivateNotes(
                    relays,
                    $bookmarkEvents[tag],
                    [tagArray],
                    pubkey,
                  );
                  console.log(result);
                  if (result.isSuccess) {
                    $bookmarkEvents[tag] = result.event;
                    viewContents = $bookmarkEvents[tag].tags;
                    const t = {
                      message: 'Add note<br>' + result.msg.join('<br>'),
                      timeout: 3000,
                    };

                    toastStore.trigger(t);
                  } else {
                    const t = {
                      message: $_('nprofile.toast.failed_publish'),
                      timeout: 3000,
                      background: 'bg-orange-500 text-white width-filled ',
                    };

                    toastStore.trigger(t);
                  }
                } catch (error) {
                  const t = {
                    message: $_('nprofile.toast.failed_publish'),
                    timeout: 3000,
                    background: 'bg-orange-500 text-white width-filled ',
                  };

                  toastStore.trigger(t);
                }
              }
              break;
          }

          $nowProgress = false;
        }
      },
    };

    modalStore.trigger(modal);
  }
  //-------------------------------------------------------edit tag
  const editTagModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalEditTag,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: '<p>Skeleton</p>',
  };

  function onClickEditTags() {
    const modal: ModalSettings = {
      type: 'component',

      // Pass the component directly:
      component: editTagModalComponent,
      // Provide arbitrary metadata to your modal instance:
      title: $_('nprofile.modal.editTags.title'),
      body: $_('nprofile.modal.editTags.body'),
      value: { selectedValue: 0 },
      // Returns the updated response value
      response: (res) => {
        if (res) {
          switch (res.btn) {
            case 'add':
              addTag(res.value);

              break;
            case 'delete':
              deleteTag(res.tagIndex);
              break;
          }
        }
      },
    };
    modalStore.trigger(modal);
  }

  async function addTag(tagName: string) {
    console.log(tagName);

    const event: Nostr.Event = {
      id: '',
      content: '',
      kind: kind,
      pubkey: pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: [['d', tagName]],
      sig: '',
    };
    try {
      $nowProgress = true;
      // publishEvent関数を非同期に呼び出し、結果を待つ
      const res = await publishEvent(event, relays);

      if (!res.isSuccess) {
        const t = {
          message: $_('nprofile.toast.failed'),
          timeout: 5000,
          background: 'variant-filled-error',
        };
        toastStore.trigger(t);
        $nowProgress = false;
        return;
      }

      // 成功したら$bookmarkEventsを更新する
      $bookmarkEvents.push(res.event);
      const t = {
        message: $_('nprofile.toast.add_tag') + res.msg.join('<br>'),
        timeout: 5000,
      };
      toastStore.trigger(t);
    } catch (error) {
      console.log(error);
      const t = {
        message: $_('nprofile.toast.failed'),
        timeout: 5000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(t);
    }
    $nowProgress = false;
  }

  async function deleteTag(tagIndex: number) {
    console.log(tagIndex);

    await updateBkmTag(tagIndex); //最新の状態に更新

    console.log($bookmarkEvents[tagIndex].tags[0][1]);

    const event: Nostr.Event = {
      id: '',
      content: '',
      kind: 5,
      pubkey: pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: [['e', $bookmarkEvents[tagIndex].id]],
      sig: '',
    };
    try {
      $nowProgress = true;
      // publishEvent関数を非同期に呼び出し、結果を待つ
      const res = await publishEvent(event, relays);

      if (!res.isSuccess) {
        const t = {
          message: $_('nprofile.toast.failed'),
          timeout: 5000,
          background: 'variant-filled-error',
        };
        toastStore.trigger(t);
        $nowProgress = false;
        return;
      }

      const t = {
        message: $_('nprofile.toast.delete_tag') + res.msg.join('<br>'),
        timeout: 5000,
      };
      toastStore.trigger(t);
      // 成功したら$bookmarkEventsを更新する
      $bookmarkEvents.splice(tagIndex, 1);
      tabSet = 0;
      viewContents = $bookmarkEvents[tabSet].tags;
    } catch (error) {
      console.log(error);
      const t = {
        message: $_('nprofile.toast.failed'),
        timeout: 5000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(t);
    }
    $nowProgress = false;
  }

  //---------------------------------------------move
  const moveModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalMove,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: '<p>Skeleton</p>',
  };

  function onClickMove(tagIndex: number, noteIndex: number[], _bkm: string) {
    deleteNoteIndexes = noteIndex; // 削除されたノートのインデックスを設定

    console.log(_bkm);
    console.log(tagIndex);
    console.log(viewContents[noteIndex[0]]);
    console.log($bookmarkEvents[tabSet].tags[0][1]);
    console.log(noteIndex);
    console.log($bookmarkEvents[tabSet].tags[noteIndex[0]][1]);
    //どこに移動させるのか画面を出す。
    const modal: ModalSettings = {
      type: 'component',
      component: moveModalComponent,
      title: $_('nprofile.modal.moveNote.title'),
      body: `${$_('nprofile.modal.moveNote.body_from')} ${
        $bookmarkEvents[tagIndex].tags[0][1]
      } ${$_('nprofile.modal.moveNote.body_to')}`,
      value: {
        bkm: _bkm,
        tag: tagIndex,
      },
      response: (res) => {
        console.log(res);
        if (res) {
          $nowProgress = true;
          moveNote(
            noteIndex,
            { tag: tagIndex, bkm: _bkm },
            { tag: res.tag, bkm: res.bkm },
          );
        }
      },
    };
    modalStore.trigger(modal);
    deleteNoteIndexes = []; // 削除されたノートのインデックスを設定
  }
  async function moveNote(
    noteIndexes: number[],
    from: { tag: number; bkm: string },
    to: { tag: number; bkm: string },
  ) {
    $nowProgress = true;
    await updateBkmTag(from.tag); //最新の状態に更新
    await updateBkmTag(to.tag); //最新の状態に更新

    const noteIds = noteIndexes.map((index) => viewContents[index]); //プライベートでもパブリックでもどっちでも
    //移動先にAddNote

    const res =
      to.bkm === 'pub'
        ? await addNotes(relays, $bookmarkEvents[to.tag], noteIds)
        : await addPrivateNotes(
            relays,
            $bookmarkEvents[to.tag],
            noteIds,
            pubkey,
          );
    console.log(res);

    toastStore.clear();

    if (!res.isSuccess) {
      //しっぱいしましたかく。
      const t: ToastSettings = {
        message: `${$_('nprofile.modal.failed1')} ${
          $bookmarkEvents[to.tag].tags[0][1]
        } ${$_('nprofile.modal.failed2')}`,
        timeout: 3000,
        background: 'bg-orange-500 text-white width-filled ',
      };

      toastStore.trigger(t);
      return;
    } else {
      const t2: ToastSettings = {
        message: $_('nprofile.toast.add_note') + res.msg.join('<br>'),
        timeout: 5000,
      };

      toastStore.trigger(t2);
      $bookmarkEvents[to.tag] = res.event;

      //移動元のノートを削除する

      const res2 =
        from.bkm === 'pub'
          ? await deleteNotes(relays, $bookmarkEvents[from.tag], noteIndexes)
          : await deletePrivateNotes(
              relays,
              $bookmarkEvents[from.tag],
              noteIndexes,
              pubkey,
            );
      console.log(res2);
      if (!res.isSuccess) {
        //失敗しましたかく
        const t = {
          message: `${$_('nprofile.toast.delete_failed1')} ${
            $bookmarkEvents[from.tag].tags[0][1]
          } ${$_('nprofile.toast.delete_failed2')}`,
          max: 10,
          timeout: 3000,
          background: 'bg-orange-500 text-white width-filled ',
        };

        toastStore.trigger(t);
      } else {
        const t = {
          max: 10,
          message: $_('nprofile.toast.delete_note') + res2.msg.join('<br>'),
          timeout: 5000,
        };

        toastStore.trigger(t);
        $bookmarkEvents[from.tag] = res2.event;
        // 表示を更新する
        if (from.bkm === 'pub') {
          viewContents = $bookmarkEvents[from.tag].tags;
        } else {
          const content = await nip04De(
            pubkey,
            $bookmarkEvents[from.tag].content,
          );
          viewContents = JSON.parse(content);
        }
      }
    }
    paginatedSource = viewContents.slice(
      pages.offset * pages.limit, // start
      pages.offset * pages.limit + pages.limit, // end
    );
    deleteNoteIndexes = []; // 削除されたノートのインデックスを設定
    checkedIndexList = [];
    //タグ変わったらスクロールトップに
    window.scrollTo({
      top: 0,
      behavior: 'auto', // スムーズにスクロールする場合
    });
    isMulti = false;
    $nowProgress = false;
  }

  //-----------------------------------------delete
  //消すノートの背景色変える
  let deleteNoteIndexes: number[] = []; // 初期値は無効なインデックスである-1
  function onClickDelete(tagIndex: number, noteIndex: number, _bkm: string) {
    deleteNoteIndexes = [noteIndex]; // 削除されたノートのインデックスを設定
    console.log(_bkm);
    console.log(tagIndex);
    console.log($bookmarkEvents[tabSet].tags[0][1]);
    console.log(noteIndex);
    console.log($bookmarkEvents[tabSet].tags[noteIndex][1]);
    //ほんとに消すのか出す
    const t: ToastSettings = {
      message: $_('nprofile.toast.delete_message'),
      timeout: 10000,
      action: {
        label: 'Delete',

        response: async () => deleteNote(tagIndex, [noteIndex], _bkm),
      },
      callback: (response) => {
        console.log(response.id);
        if (response.status === 'queued') console.log('Toast was queued!');
        if (response.status === 'closed') {
          //トーストが消えたタイミングで背景色を戻す
          deleteNoteIndexes = [];
        }
      },
      background: 'variant-filled-warning',
    };
    toastStore.trigger(t);
  }

  async function deleteNote(
    tagIndex: number,
    noteIndex: number[],
    _bkm: string,
  ) {
    $nowProgress = true;

    await updateBkmTag(tagIndex); //削除する前に最新の状態に更新

    const res =
      _bkm === 'pub'
        ? await deleteNotes(relays, $bookmarkEvents[tagIndex], noteIndex)
        : await deletePrivateNotes(
            relays,
            $bookmarkEvents[tagIndex],
            noteIndex,
            pubkey,
          );

    console.log(res);
    if (res.isSuccess) {
      $bookmarkEvents[tagIndex] = res.event;

      // 表示を更新する
      if (_bkm === 'pub') {
        viewContents = $bookmarkEvents[tagIndex].tags;
      } else {
        const content = await nip04De(
          pubkey,
          $bookmarkEvents[tagIndex].content,
        );
        viewContents = JSON.parse(content);
      }

      const t = {
        message: $_('nprofile.toast.delete_note') + res.msg.join('<br>'),
        timeout: 5000,
      };

      toastStore.trigger(t);
    } else {
      const t = {
        message: $_('nprofile.toast.failed_publish'),
        timeout: 3000,
        background: 'bg-orange-500 text-white width-filled ',
      };

      toastStore.trigger(t);
    }
    paginatedSource = viewContents.slice(
      pages.offset * pages.limit, // start
      pages.offset * pages.limit + pages.limit, // end
    );
    deleteNoteIndexes = []; // 削除されたノートのインデックスを設定
    checkedIndexList = [];
    //タグ変わったらスクロールトップに
    window.scrollTo({
      top: 0,
      behavior: 'auto', // スムーズにスクロールする場合
    });
    isMulti = false;
    $nowProgress = false;
  }

  //タグインデックスからそのイベントだけ更新してほしい
  async function updateBkmTag(tagIndex: number) {
    const t0: ToastSettings = {
      message: $_('nprofile.toast.update_message'),
      autohide: false,
      background: 'bg-fuchsia-800 text-white width-filled ',
    };

    toastStore.trigger(t0);

    const filters = [
      {
        authors: [pubkey],
        kinds: [kind],
        '#d': [$bookmarkEvents[tagIndex].tags[0][1]],
      },
    ];
    console.log(filters);
    try {
      const res = await fetchFilteredEvents(relays, filters);
      console.log(res);
      $bookmarkEvents[tagIndex] = res[0];
      //更新終わり
      toastStore.clear();
    } catch (error) {
      //更新終わり
      toastStore.clear();
      const t = {
        message: $_('nprofile.toast.update_failed'),
        timeout: 3000,
        background: 'bg-orange-500 text-white width-filled ',
      };

      toastStore.trigger(t);
    }
  }

  //----------------------------------------------------------------------複数選択
  let checkedIndexList: number[] = [];
  function onClickMoveNotes() {
    if (checkedIndexList.length === 0) {
      return;
    }
    //どこに移動させるのか画面を出す。

    const modal: ModalSettings = {
      type: 'component',
      component: moveModalComponent,
      title: $_('nprofile.modal.moveNote.title'),
      body: `${$_('nprofile.modal.moveNote.body_from')} ${
        $bookmarkEvents[tabSet].tags[0][1]
      } ${$_('nprofile.modal.moveNote.body_to')}`,
      value: {
        bkm: bkm,
        tag: tabSet,
      },
      response: async (res) => {
        console.log(res);
        if (res) {
          await moveNote(
            checkedIndexList,
            { tag: tabSet, bkm: bkm },
            { tag: res.tag, bkm: res.bkm },
          );
          // deleteNoteIndexes = []; // 削除されたノートのインデックスを設定
          // checkedIndexList = [];
          // isMulti = false;
        }
      },
    };
    modalStore.trigger(modal);
  }

  function onClickDeleteNotes() {
    if (checkedIndexList.length === 0) {
      return;
    }
    console.log(checkedIndexList);
    //ほんとに消すのか出す
    const t: ToastSettings = {
      message: `${$_('nprofile.toast.delete_notes_message1')} [${
        checkedIndexList.length
      }] ${$_('nprofile.toast.delete_notes_message2')}`,
      timeout: 10000,
      action: {
        label: 'Delete',

        response: async () => {
          await deleteNote(tabSet, checkedIndexList, bkm);
          checkedIndexList = [];
          deleteNoteIndexes = [];
        },
      },

      background: 'variant-filled-warning',
    };
    toastStore.trigger(t);
  }

  //--------------j\共有ボタン
  function onClickKyouyuu() {
    const address: nip19.AddressPointer = {
      identifier: $bookmarkEvents[tabSet].tags[0][1],
      pubkey: pubkey,
      kind: kind,
      relays: relays,
    };
    const naddr = nip19.naddrEncode(address);
    console.log(naddr);
    console.log(window.location.origin);
    const naddrURL = window.location.origin + '/a/' + naddr;
    console.log(naddrURL);

    console.log('post');
    const tags = [
      ['a', `${kind}:${pubkey}:${$bookmarkEvents[tabSet].tags[0][1]}`],
      ['r', naddrURL],
    ];
    const modal: ModalSettings = {
      type: 'component',
      component: postNoteModalComponent,
      title: $_('nprofile.modal.postNote.title'),
      body: ``,
      value: {
        content: `\r\n${naddrURL}\r\n`,
        tags: tags,
      },
      response: async (res) => {
        console.log(res);
        if (res) {
          $nowProgress = true;
          const event: Nostr.Event = {
            id: '',
            pubkey: await getPub(),
            created_at: Math.floor(Date.now() / 1000),
            kind: 1,
            tags: tags,
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
          await publishEvent(event, writeTrueRelays);
          $nowProgress = false;
        }
      },
    };
    modalStore.trigger(modal);
  }
  //タグの切り替えを検知（複数選択のときしかいらないたぶん）
  function onClickTab(index: number): void {
    checkedIndexList = [];
    deleteNoteIndexes = [];
    bkm = 'pub';

    //タグ変わったらスクロールトップに
    window.scrollTo({
      top: 0,
      behavior: 'auto', // スムーズにスクロールする場合
    });
  }

  function onChangeCheckList(idx: number) {
    if (checkedIndexList.includes(idx)) {
      checkedIndexList.splice(checkedIndexList.indexOf(idx), 1);
    } else {
      checkedIndexList.push(idx);
    }
    //背景色変えるやつ
    deleteNoteIndexes = checkedIndexList;

    console.log(idx);
    console.log(checkedIndexList);
  }

  //----------------------------------
  async function onClickUpdate() {
    if (pubkey !== '' || relays.length > 0) {
      $nowProgress = true;
      $bookmarkEvents = await fetchFilteredEvents(relays, filters_30001);
      if ($bookmarkEvents.length > 0) {
        // bookmarkをbookmark[i].tags[0][1]の値で降順に並べ替える
        $bookmarkEvents.sort((a, b) => {
          const tagID_A = a.tags[0][1];
          const tagID_B = b.tags[0][1];
          return tagID_A.localeCompare(tagID_B);
        });
        console.log($bookmarkEvents);
        viewContents = $bookmarkEvents[tabSet].tags;
      } else {
        console.log('ブクマ何もないかも');
        message = $_('nprofile.message');
      }
      $nowProgress = false;
    } else {
      console.log('error');
    }
    $nowProgress = false;
  }

  //-----------------------------------------------
  const tagListModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalTagList,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };

  function onClickMenu() {
    const modal: ModalSettings = {
      type: 'component',
      component: tagListModalComponent,
      title: $_('nprofile.modal.tagList.title'),
      body: ``,
      value: {
        tagList: $bookmarkEvents.map((item) => item.tags[0][1]),
      },
      response: (res) => {
        console.log(res);
        if (res && res.index !== -1) {
          if (res.index !== tabSet) {
            tabSet = res.index;
            viewContents = $bookmarkEvents[tabSet].tags;

            const elements = document.querySelector('.tab-list');

            if (elements) {
              const scrollPercentage = (tabSet / $bookmarkEvents.length) * 80;
              const scrollPosition = Math.round(
                (scrollPercentage / 100) * elements.scrollWidth,
              );

              elements.scrollTo({
                top: 0,
                left: scrollPosition,
                behavior: 'auto',
              });
            }
          }
          // タグが変わったらスクロールトップに
          onClickTab(res.index);
        }
      },
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
        console.log(res);
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
    console.log('search');

    const modal: ModalSettings = {
      type: 'component',
      component: searchModalComponent,
      title: $_('nprofile.modal.search.title'),
      body: ``,
      value: {
        filter: filter,
        isPageOwner: isPageOwner,
      },
      response: async (res) => {
        console.log(res);
        if (res) {
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
    checkedIndexList = [];
    deleteNoteIndexes = [];
    isMulti = false;
    console.log(typeof e.detail);
    console.log('event:page', e.detail);

    // console.log( Math.floor(viewContents.length / pages.limit));
    pages.offset = Object.is(e.detail, -0)
      ? Math.floor(viewContents.length / pages.limit)
      : e.detail;

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
  <meta
    name="description"
    content="kind:{kind}
pubkey:{nip19.npubEncode(pubkey)}"
  />

  <meta prefix="og: https://ogp.me/ns#" />
  <meta property="og:title" content="nostr-bookmark-viewer3" />
  <meta
    property="og:description"
    content="kind:{kind}
pubkey:{nip19.npubEncode(pubkey)}"
  />
  <meta
    property="og:image"
    content="https://nostr-bookmark-viewer3.vercel.app/img2.png"
  />
</svelte:head>
<Modal />
<Toast zIndex="z-[999999]" />

<div
  class="card border border-purple-800 p-4 w-[22rem] shadow-xl z-20 break-all max-h-[80%] overflow-auto"
  data-popup="popupFeatured"
>
  {#if !$nowProgress}
    <button
      type="button"
      class="btn variant-filled-secondary py-1 my-2"
      on:click={() => goto(window.location.origin)}
      >{$_('nprofile.html.button')}</button
    >
  {/if}
  <hr class="!border-t-2 my-1" />
  <div>
    <p>{$_('nprofile.html.info')}</p>
    <ul class="list-disc">
      <li class="ml-4">
        {$_('nprofile.html.kind')}:
        {kind}
      </li>

      <li class="ml-4">
        {$_('nprofile.html.type')}
        {dtype}
        {dtype === 'npub' ? '(readonly)' : ''}
      </li>
      <li class="ml-4">
        {$_('nprofile.html.preview')}
        {URLPreview ? 'ON' : 'OFF'}
      </li>
      <li class="ml-4">
        {$_('nprofile.html.loadnote')}
        {loadEvent ? 'ON' : 'OFF'}
      </li>
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
    <p class="mt-2">{$_('nprofile.html.search_relays')}</p>

    <ul class="list-disc">
      {#each $searchRelays as relay}
        <li class="ml-4">{relay}</li>
      {/each}
    </ul>
  </div>
  <hr class="!border-t-2 my-1" />
  <div class="text-sm grid grid-cols-[0.5fr_0.5fr]">
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class=" rounded fill-primary-100 variant-filled-primary"
        >{@html Chat}</span
      >
      {$_('nprofile.html.share')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class=" rounded fill-primary-100 variant-filled-primary"
        >{@html OpenInBrowser}</span
      >
      {$_('nprofile.html.openapp')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class=" rounded fill-primary-100 variant-filled-primary"
        >{@html ArrowCircleRight}</span
      >
      {$_('nprofile.html.move')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class=" rounded fill-warning-300 variant-filled-primary"
        >{@html Delete}</span
      >
      {$_('nprofile.html.delete')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class="btn variant-filled-primary rounded-full p-0 w-6">
        {@html searchIcon}</span
      >
      {$_('nprofile.html.search')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class="btn variant-filled-primary p-0 my-0.5 h-5 w-6"
        >{@html tagListIcon}</span
      >
      {$_('nprofile.html.list')}
    </div>

    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class="btn variant-filled-primary p-0 my-0.5 h-5 w-6"
        >{@html addNoteIcon}</span
      >
      {$_('nprofile.html.add')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class="btn variant-filled-primary p-0 my-0.5 h-5 w-6"
        >{@html editTagIcon}</span
      >
      {$_('nprofile.html.edit')}
    </div>

    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class="btn variant-filled-primary p-0 my-0.5 h-5 w-6"
        >{@html updateListIcon}</span
      >
      {$_('nprofile.html.update')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class="btn variant-filled-primary p-0 my-0.5 h-5 w-6"
        >{@html warningOnIcon}</span
      >
      {$_('nprofile.html.warning')}
    </div>

    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class="btn variant-filled-primary rounded-full p-0 h-5">mode</span>
      {$_('nprofile.html.mode')}
    </div>
  </div>

  <div class="arrow bg-surface-100-800-token" />
</div>

<main class="m-auto max-w-6xl px-1 mt-24 mb-12">
  {#if !$bookmarkEvents || $bookmarkEvents.length === 0}
    <div class="break-all whitespace-pre-wrap">
      {@html message}
    </div>
  {/if}
  <div class="w-full fixed top-0 left-1/2 transform -translate-x-1/2 z-10">
    <div class=" max-w-6xl m-auto z-10">
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
        {#if $bookmarkEvents && $bookmarkEvents.length > 0}
          <div class="tabGroup" on:wheel={wheelScroll}>
            <TabGroup
              padding="py-3 px-4"
              justify="justify"
              active="variant-filled-secondary"
              hover="hover:variant-soft-secondary"
              border="border-b border-surface-400-500-token"
              rounded="rounded-tl-container-token rounded-tr-container-token"
            >
              {#each $bookmarkEvents as reaction, index (reaction.tags[0][1])}
                {#if !$nowProgress}
                  <Tab
                    on:change={() => {
                      isMulti = false;
                      viewContents = $bookmarkEvents[tabSet].tags;
                      bkm = 'pub';
                      onClickTab(index);
                    }}
                    bind:group={tabSet}
                    name={reaction.tags[0][1]}
                    value={index}
                  >
                    {reaction.tags[0][1]}
                  </Tab>
                {/if}
              {/each}
            </TabGroup>
          </div>
        {/if}
        <svelte:fragment slot="trail">
          <div class=" pr-2 text-center justify-center">
            {#if dtype === 'nprofile'}
              {#if !isPageOwner}
                <button
                  type="button"
                  class="btn-icon variant-filled-surface"
                  on:click={onClickLogin}>Login</button
                >
              {:else if !$nowProgress}
                <div>mode</div>
                <div class="sliderContainer">
                  <SlideToggle
                    name="slider-small"
                    bind:checked={isMulti}
                    on:change={() => {
                      //  console.log($isMulti);
                      checkedIndexList = [];
                      deleteNoteIndexes = [];
                    }}
                    size="sm"
                  />
                </div>
              {/if}
            {:else}
              <div
                class="flex variant-filled-surface rounded-full px-2 text-sm"
              >
                read<br />only
              </div>
            {/if}
          </div>
        </svelte:fragment>
      </AppBar>

      {#if $bookmarkEvents && $bookmarkEvents.length > 0}
        <!--プライベートブクマとパブリックブクマ-->
        <TabGroup
          justify="justify-center"
          flex="flex-1"
          rounded=""
          class="bg-surface-50/80 dark:bg-surface-800/80 w-full drop-shadow"
        >
          {#if !$nowProgress}
            <Tab
              on:change={() => {
                console.log(bkm);
                //  checkedTags = [];
                checkedIndexList = [];
                deleteNoteIndexes = [];
                isMulti = false;
                viewContents = $bookmarkEvents[tabSet].tags;
              }}
              bind:group={bkm}
              name="pub"
              value="pub"
            >
              public
            </Tab>
            {#if isPageOwner}
              <Tab
                on:change={async () => {
                  checkedIndexList = [];
                  deleteNoteIndexes = [];
                  isMulti = false;
                  if ($bookmarkEvents[tabSet].content.length > 0) {
                    try {
                      const content = await nip04De(
                        pubkey,
                        $bookmarkEvents[tabSet].content,
                      );
                      viewContents = JSON.parse(content);
                    } catch (error) {
                      const t = {
                        message: $_('nprofile.toast.failed_hukugou'),
                        timeout: 3000,
                        background: 'bg-orange-500 text-white width-filled ',
                      };
                      toastStore.trigger(t);
                    }
                  } else {
                    viewContents = [];
                  }
                }}
                bind:group={bkm}
                name="pvt"
                value="pvt"
              >
                private
              </Tab>
            {/if}
          {/if}
        </TabGroup>
      {/if}
    </div>
  </div>
  {#if loadEvent}
    <NostrApp relays={$searchRelays}>
      {#if paginatedSource}
        {#each paginatedSource as id, index}
          {#if id[0] !== 'd'}
            <div
              class="card drop-shadow px-1 py-2 my-1.5 grid grid-cols-[1fr_auto] gap-1 {deleteNoteIndexes.includes(
                index,
              )
                ? 'delete-note'
                : ''}"
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
                            }}>{@html searchIcon}</button
                          >
                        </div>
                        <div class="text-sm break-all overflow-hidden">
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
                            }}>{@html searchIcon}</button
                          >
                        </div>
                        <div class="text-sm break-all overflow-hidden">
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
                            }}>{@html searchIcon}</button
                          >
                        </div>
                        <div class="text-sm break-all overflow-hidden">
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
                        <div
                          class="parent-container break-all whitespace-pre-wrap"
                        >
                          <Content
                            text={text.content}
                            tag={text.tags}
                            id={text.id}
                            view={$allView}
                            {URLPreview}
                            {isPageOwner}
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
                            {isPageOwner}
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
                            {isPageOwner}
                          />
                        </div>
                      </div>
                      <div class="grid grid-cols-[auto_1fr] gap-1">
                        <div
                          class="w-12 h-12 rounded-full flex justify-center overflow-hidden bg-surface-500/25 mt-1"
                        >
                          {#if JSON.parse(metadata.content).picture}
                            {#await getUserIcon(JSON.parse(metadata.content).picture, $page.url.origin)}
                              <div
                                class="flex justify-center items-center text-sm"
                              >
                                loading
                              </div>
                            {:then imageUrl}
                              <img
                                class="w-12 object-contain justify-center"
                                src={imageUrl}
                                alt="avatar"
                              />
                            {/await}
                          {/if}
                        </div>
                        <div class="grid grid-rows-[auto_1fr] gap-0.5 w-full">
                          <div
                            class="w-full grid grid-cols-[auto_1fr_auto] gap-1 h-fix"
                          >
                            <div class="truncate wid justify-items-end">
                              <button
                                class="text-emerald-800 dark:text-blue-500"
                                on:click={() => {
                                  handleClickPubkey(metadata, text.pubkey);
                                }}
                                ><u>{JSON.parse(metadata.content).name}</u
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
                                          >{JSON.parse(metadata.content)
                                            .name}</u
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
                              {isPageOwner}
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

                <div
                  class="flex flex-col flex-wrap h-16 {isPageOwner
                    ? 'w-14'
                    : ''}"
                >
                  {#if isMulti && !$nowProgress}
                    <input
                      class="m-2 checkbox scale-125"
                      type="checkbox"
                      checked={checkedIndexList.includes(
                        pages.offset * pages.limit + index,
                      )}
                      on:change={() => {
                        onChangeCheckList(pages.offset * pages.limit + index);
                      }}
                    />
                  {:else}
                    {#if id[0] === 'e' || id[0] === 'a'}
                      <!---のすたーできょうゆう-->
                      <Text queryKey={[hexId.id]} id={hexId.id} let:text>
                        <button
                          slot="loading"
                          class="btn p-0 mt-1 justify-self-end w-6"
                          on:click={() => onClickQuote(id, '')}
                        >
                          <span
                            class=" rounded fill-primary-100 variant-filled-primary"
                            >{@html Chat}</span
                          >
                        </button>

                        <button
                          slot="error"
                          class="btn p-0 mt-1 justify-self-end w-6"
                          on:click={() => onClickQuote(id, '')}
                        >
                          <span
                            class=" rounded fill-primary-100 variant-filled-primary"
                            >{@html Chat}</span
                          >
                        </button>

                        <button
                          slot="nodata"
                          class="btn p-0 mt-1 justify-self-end w-6"
                          on:click={() => onClickQuote(id, '')}
                        >
                          <span
                            class=" rounded fill-primary-100 variant-filled-primary"
                            >{@html Chat}</span
                          >
                        </button>

                        <button
                          class="btn p-0 mt-1 justify-self-end w-6"
                          on:click={() => onClickQuote(id, text.pubkey)}
                        >
                          <span
                            class=" rounded fill-primary-100 variant-filled-primary"
                            >{@html Chat}</span
                          >
                        </button>
                      </Text>

                      <!---別アプリで開く-->
                      <button
                        class="btn p-0 mt-1 justify-self-end w-6"
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
                        <span
                          class=" rounded fill-primary-100 variant-filled-primary"
                          >{@html OpenInBrowser}</span
                        >
                      </button>
                    {/if}
                    {#if isPageOwner}
                      <!---別のタグに移動-->
                      <button
                        class="btn p-0 mt-1 justify-self-end w-6 {isPageOwner
                          ? 'ml-1 '
                          : ''}"
                        on:click={() => {
                          if (!$nowProgress) {
                            onClickMove(
                              tabSet,
                              [pages.offset * pages.limit + index],
                              bkm,
                            );
                          }
                        }}
                      >
                        <span
                          class=" rounded fill-primary-100 variant-filled-primary"
                          >{@html ArrowCircleRight}</span
                        >
                      </button>
                      <!---削除-->
                      <button
                        class="btn p-0 mt-1 justify-self-end w-6 {isPageOwner
                          ? 'ml-1 '
                          : ''}"
                        on:click={() => {
                          if (!$nowProgress) {
                            onClickDelete(
                              tabSet,
                              pages.offset * pages.limit + index,
                              bkm,
                            );
                          }
                        }}
                      >
                        <span
                          class=" rounded fill-warning-300 variant-filled-primary"
                          >{@html Delete}</span
                        >
                      </button>
                    {/if}
                  {/if}
                </div>
              {/await}
            </div>
          {/if}
        {/each}
      {/if}
    </NostrApp>
  {:else if paginatedSource}
    <!--------------------------->

    {#each paginatedSource as id, index}
      {#if id[0] === 'e'}
        <div
          class="card drop-shadow px-1 py-2 my-1.5 grid grid-cols-[1fr_auto_auto] gap-1"
        >
          {nip19.noteEncode(id[1])}

          <!---のすたーできょうゆう-->
          <!-- <div class="flex flex-col flex-wrap h-16"> -->
          <button
            class="btn p-0 mt-1 justify-self-end w-6"
            on:click={() => onClickQuote(id, '')}
          >
            <span class=" rounded fill-primary-100 variant-filled-primary"
              >{@html Chat}</span
            >
          </button>

          <!---別アプリで開く-->
          <button
            class="btn p-0 mt-1 justify-self-end w-6"
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
            <span class=" rounded fill-primary-100 variant-filled-primary"
              >{@html OpenInBrowser}</span
            >
            <!--{@html openAnotherAppIcon}-->
          </button>
        </div>
        <!-- </div> -->
      {/if}
    {/each}
  {/if}
</main>

<div class=" fixed bottom-0 z-10 w-screen">
  <div
    class="btn-group py-0.5 variant-filled-primary w-screen justify-center rounded-none"
  >
    {#if !$nowProgress}
      {#if isPageOwner}
        <button on:click={onClickMenu}>{@html tagListIcon}</button>

        {#if !isMulti}
          <!--のーとをついか-->
          <button class="mx-0" on:click={() => onClickAddNote(tabSet)}>
            {@html addNoteIcon}</button
          >
          <!--たぶをへんしゅう-->
          <button class="mx-0" on:click={onClickEditTags}
            >{@html editTagIcon}</button
          >
        {:else}
          <!--のーとたちをいどう-->
          <button class="mx-0" on:click={onClickMoveNotes}
            ><span class="rounded fill-primary-100 variant-filled-primary"
              >{@html ArrowCircleRight}</span
            ></button
          >
          <!--のーとたちをさくじょ-->
          <button class="mx-0" on:click={onClickDeleteNotes}>
            <span class=" rounded fill-warning-300 variant-filled-primary"
              >{@html Delete}</span
            ></button
          >
        {/if}
      {/if}
      <!-----共有----->

      <button class="mx-0" on:click={onClickKyouyuu}
        ><span class="fill-white">{@html Chat}</span></button
      >
      <!--りすとのこうしん-->
      <button class="mx-0" on:click={onClickUpdate}
        >{@html updateListIcon}</button
      >
      <!--ぱじねーたー-->
      <div class="ml-2">
        <MyPaginator
          settings={pages}
          on:page={onPageChange}
          select="hidden"
          justify="justify-between"
          showFirstLastButtons={true}
          active="variant-filled-primary"
          controlVariant="variant-filled-primary"
          buttonClasses="!my-0 !py-0 !px-2.5 place-items-center fill-current"
        />
      </div>

      <!--こんてんとわーにんぐ全部表示OR非表示-->
      <button
        type="button"
        class="btn variant-filled-primary"
        on:click={() => {
          $allView = $allView ? false : true;
        }}
      >
        {#if $allView}
          {@html warningOffIcon}
        {:else}
          {@html warningOnIcon}
        {/if}
      </button>
    {/if}
  </div>
</div>
<!-- ------------------------------------footer-     -->

<div class="container max-w-6xl mx-auto z-10">
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
    max-width: calc(min(100vw, 64rem) - 8em);

    position: relative;
  }
  .delete-note {
    background-color: rgba(107, 255, 181, 0.274);
  }
  .btn-group button {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }

  /* mdサイズ（768px以上）のスタイルを指定 */
  @media (min-width: 768px) {
    .btn-group button {
      /* 中サイズの場合にだけ適用されるスタイル */
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
</style>
