<script lang="ts" context="module">
  interface Window {
    [x: string]: any;
    // NIP-07
    nostr: any;
  }
  declare var window: Window;
</script>

<script lang="ts">
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
  } from '$lib/functions';
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
    Avatar,
    modalStore,
    type ModalSettings,
    type ModalComponent,
    ProgressRadial,
  } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { RelaysforSearch, bookmarkEvents, nowProgress } from '$lib/store';
  import ModalCopyPubkey from '$lib/components/ModalCopyPubkey.svelte';
  import ModalEventJson from '$lib/components/ModalEventJson.svelte';
  import ModalAddNote from '$lib/components/ModalAddNote.svelte';
  import ModalMove from '$lib/components/ModalMove.svelte';
  import ModalEditTag from '$lib/components/ModalEditTag.svelte';
  import Content from '$lib/components/Content.svelte';
  import ModalTagList from '$lib/components/ModalTagList.svelte';
  import PostNote from '$lib/components/PostNote.svelte';

  const { type, data } = nip19.decode($page.params.nprofile);

  const { pubkey, relays } =
    type === 'nprofile' && data.relays
      ? { pubkey: data.pubkey, relays: data.relays }
      : { pubkey: '', relays: [] };

  const filters_30001 = [
    {
      authors: [pubkey],
      kinds: [30001],
    },
  ];

  let isPageOwner: boolean;
  let isMulti: boolean = false;
  let tabSet: number = 0;
  let bkm: string = 'pub';
  let viewContents: string[][];
  let message: string = 'now loading';

  onMount(async () => {
    $nowProgress = true;
    message = 'now loading';
    try {
      isPageOwner = (await window.nostr.getPublicKey()) === pubkey;
    } catch (error) {
      console.log('ログインチェック失敗');
    }
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
        message = 'ブクマ何もないかも';
      }
      $nowProgress = false;
    } else {
      console.log('error');
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
      const viewerPublicKey = await window.nostr.getPublicKey();

      isPageOwner = viewerPublicKey === pubkey;
      if (isPageOwner) {
        t = {
          message: 'Login',
          timeout: 3000,
        };
      } else {
        t = {
          message: 'you are not the owner',
          timeout: 3000,
          background: 'bg-orange-500 text-white width-filled ',
        };
      }
    } catch (error) {
      t = {
        message: 'failed to Login',
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
      backdropClasses:
        '!bg-surface-400 dark:!bg-surface-700  !bg-opacity-20 dark:!bg-opacity-20',
      // Pass the component directly:
      component: addModalComponent,
      // Provide arbitrary metadata to your modal instance:
      title: `Add Note to ${$bookmarkEvents[tabSet].tags[0][1]}`,
      body: 'Enter an ID starting with "note" , "nevent" or "nostr:".',
      //value: { noteId: nip19.noteEncode(tag[1]) },
      // Returns the updated response value
      response: async (res) => {
        let check;
        if (res) {
          switch (res.btn) {
            case 'pub':
              check = checkInput(res.value);
              if (check.error) {
                const t = {
                  message: check.value,
                  timeout: 3000,
                  background: 'bg-orange-500 text-white width-filled ',
                };

                toastStore.trigger(t);
              } else {
                $nowProgress = true;
                await updateBkmTag(tag); //最新の状態に更新
                const res = await addNotes(relays, $bookmarkEvents[tag], [
                  check.value,
                ]);
                console.log(res);
                if (res.isSuccess) {
                  $bookmarkEvents[tag] = res.event;
                  viewContents = $bookmarkEvents[tag].tags;
                  const t = {
                    message: 'Add note<br>' + res.msg.join('<br>'),
                    timeout: 3000,
                  };

                  toastStore.trigger(t);
                } else {
                  const t = {
                    message: 'failed to publish',
                    timeout: 3000,
                    background: 'bg-orange-500 text-white width-filled ',
                  };

                  toastStore.trigger(t);
                }
                $nowProgress = false;
              }
              break;
            case 'prv':
              check = checkInput(res.value);
              if (check.error) {
                const t = {
                  message: check.value,
                  timeout: 3000,
                  background: 'bg-orange-500 text-white width-filled ',
                };

                toastStore.trigger(t);
              } else {
                $nowProgress = true;
                const res = await addPrivateNotes(
                  relays,
                  $bookmarkEvents[tag],
                  [check.value],
                );
                console.log(res);
                if (res.isSuccess) {
                  $bookmarkEvents[tag] = res.event;
                  viewContents = $bookmarkEvents[tag].tags;
                  const t = {
                    message: 'Add note<br>' + res.msg.join('<br>'),
                    timeout: 3000,
                  };

                  toastStore.trigger(t);
                } else {
                  const t = {
                    message: 'failed to publish',
                    timeout: 3000,
                    background: 'bg-orange-500 text-white width-filled ',
                  };

                  toastStore.trigger(t);
                }
                $nowProgress = false;
              }
              break;
          }
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
      title: `Edit tag`,
      body: 'New Tag Name',
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
      kind: 30001,
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
          message: '失敗したかも',
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
        message: 'Add tag<br>' + res.msg.join('<br>'),
        timeout: 5000,
      };
      toastStore.trigger(t);
    } catch (error) {
      console.log(error);
      const t = {
        message: '失敗したかも',
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
          message: '失敗したかも',
          timeout: 5000,
          background: 'variant-filled-error',
        };
        toastStore.trigger(t);
        $nowProgress = false;
        return;
      }

      const t = {
        message: 'Delete tag<br>' + res.msg.join('<br>'),
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
        message: '失敗したかも',
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
      title: 'Move note',
      body: `Move from ${$bookmarkEvents[tagIndex].tags[0][1]} to`,
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
    await updateBkmTag(from.tag); //最新の状態に更新
    await updateBkmTag(to.tag); //最新の状態に更新

    const noteIds = noteIndexes.map((index) => viewContents[index][1]); //プライベートでもパブリックでもどっちでも
    //移動先にAddNote

    const res =
      to.bkm === 'pub'
        ? await addNotes(relays, $bookmarkEvents[to.tag], noteIds)
        : await addPrivateNotes(relays, $bookmarkEvents[to.tag], noteIds);
    console.log(res);

    toastStore.clear();

    if (!res.isSuccess) {
      //しっぱいしましたかく。
      const t: ToastSettings = {
        max: 10,
        message: `failed to add to ${$bookmarkEvents[to.tag].tags[0][1]}`,
        timeout: 3000,
        background: 'bg-orange-500 text-white width-filled ',
      };

      toastStore.trigger(t);
      return;
    } else {
      const t2: ToastSettings = {
        max: 10,
        message: 'Add note<br>' + res.msg.join('<br>'),
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
            );
      console.log(res2);
      if (!res.isSuccess) {
        //失敗しましたかく
        const t = {
          message: `failed to delete to ${
            $bookmarkEvents[from.tag].tags[0][1]
          }`,
          max: 10,
          timeout: 3000,
          background: 'bg-orange-500 text-white width-filled ',
        };

        toastStore.trigger(t);
      } else {
        const t = {
          max: 10,
          message: 'Delete note<br>' + res2.msg.join('<br>'),
          timeout: 5000,
        };

        toastStore.trigger(t);
        $bookmarkEvents[from.tag] = res2.event;
        // 表示を更新する
        if (from.bkm === 'pub') {
          viewContents = $bookmarkEvents[from.tag].tags;
        } else {
          const content = await window.nostr.nip04.decrypt(
            pubkey,
            $bookmarkEvents[from.tag].content,
          );
          viewContents = JSON.parse(content);
        }
      }
    }
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
      message: 'Are you sure you delete this note?',
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
          );

    console.log(res);
    if (res.isSuccess) {
      $bookmarkEvents[tagIndex] = res.event;

      // 表示を更新する
      if (_bkm === 'pub') {
        viewContents = $bookmarkEvents[tagIndex].tags;
      } else {
        const content = await window.nostr.nip04.decrypt(
          pubkey,
          $bookmarkEvents[tagIndex].content,
        );
        viewContents = JSON.parse(content);
      }

      const t = {
        message: 'Delete note<br>' + res.msg.join('<br>'),
        timeout: 3000,
      };

      toastStore.trigger(t);
    } else {
      const t = {
        message: 'failed to publish',
        timeout: 3000,
        background: 'bg-orange-500 text-white width-filled ',
      };

      toastStore.trigger(t);
    }
    $nowProgress = false;
  }

  //タグインデックスからそのイベントだけ更新してほしい
  async function updateBkmTag(tagIndex: number) {
    const t0: ToastSettings = {
      max: 10,
      message: `最新の状態に更新中...`,
      autohide: false,
      background: 'bg-fuchsia-800 text-white width-filled ',
    };

    toastStore.trigger(t0);

    const filters = [
      {
        authors: [pubkey],
        kinds: [30001],
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
        message: '最新リストの読み込みに失敗しました',
        timeout: 3000,
        background: 'bg-orange-500 text-white width-filled ',
      };

      toastStore.trigger(t);
    }
  }

  //----------------------------------------------------------------------複数選択
  let checkedIndexList: number[] = [];
  function onClickMoveNotes() {
    //どこに移動させるのか画面を出す。
    const modal: ModalSettings = {
      type: 'component',
      component: moveModalComponent,
      title: 'Move note',
      body: `Move from ${$bookmarkEvents[tabSet].tags[0][1]} to`,
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
          deleteNoteIndexes = []; // 削除されたノートのインデックスを設定
          checkedIndexList = [];
          isMulti = false;
        }
      },
    };
    modalStore.trigger(modal);
  }

  function onClickDeleteNotes() {
    console.log(checkedIndexList);
    //ほんとに消すのか出す
    const t: ToastSettings = {
      message: `Are you sure you delete these [${checkedIndexList.length}] notes?`,
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
    const tags = ['a', `30001:${pubkey}:${$bookmarkEvents[tabSet].tags[0][1]}`];
    const address: nip19.AddressPointer = {
      identifier: $bookmarkEvents[tabSet].tags[0][1],
      pubkey: pubkey,
      kind: 30001,
      relays: relays,
    };
    const naddr = nip19.naddrEncode(address);
    console.log(naddr);
    console.log(window.location.origin);
    const naddrURL = window.location.origin + '/a/' + naddr;
    console.log(naddrURL);

    console.log('post');

    const modal: ModalSettings = {
      type: 'component',
      component: postNoteModalComponent,
      title: 'postNote',
      body: `NIP-07のpreferred relaysのwriteに設定されているリレーにポストします。`,
      value: {
        content: `\r\n${naddrURL}\r\n`,
        tags: [tags],
      },
      response: async (res) => {
        console.log(res);
        if (res) {
          $nowProgress = true;
          const event: Nostr.Event = {
            id: '',
            pubkey: await window.nostr.getPublicKey(),
            created_at: Math.floor(Date.now() / 1000),
            kind: 1,
            tags: [tags],
            content: res.content,
            sig: '',
          };
          const writeRelay = await window.nostr.getRelays();
          const writeTrueRelays = Object.keys(writeRelay).filter(
            (relayUrl) => writeRelay[relayUrl].write === true,
          );
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
        message = 'ブクマ何もないかも';
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
      title: 'tagList',
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
  function onClickQuote(id: string[]) {
    console.log('quote');
    const tags = [id];
    const modal: ModalSettings = {
      type: 'component',
      component: postNoteModalComponent,
      title: 'postNote',
      body: `NIP-07のpreferred relaysのwriteに設定されているリレーにポストします。`,
      value: {
        content: `\r\nnostr:${nip19.noteEncode(id[1])}\r\n`,
        tags: tags,
      },
      response: async (res) => {
        console.log(res);
        if (res) {
          $nowProgress = true;
          const event: Nostr.Event = {
            id: '',
            pubkey: await window.nostr.getPublicKey(),
            created_at: Math.floor(Date.now() / 1000),
            kind: 1,
            tags: tags,
            content: res.content,
            sig: '',
          };
          const writeRelay = await window.nostr.getRelays();
          const writeTrueRelays = Object.keys(writeRelay).filter(
            (relayUrl) => writeRelay[relayUrl].write === true,
          );

          const response = await publishEvent(event, writeTrueRelays);
          if (response) {
            const t = {
              message: response.msg.join('<br>'),
              timeout: 3000,
            };

            toastStore.trigger(t);
          } else {
            const t = {
              message: 'failed to publish',
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
</script>

<svelte:head>
  <meta prefix="og: https://ogp.me/ns#" />
  <meta property="og:title" content="nostr-bookmark-viewer3" />
  <meta
    property="og:description"
    content="【nprofile】
pubkey:{pubkey}"
  />
  <meta
    property="og:image"
    content="https://nostr-bookmark-viewer3.vercel.app/img2.png"
  />
</svelte:head>
<Modal />
<Toast zIndex="z-[999999]" />

<div class="card p-4 w-72 shadow-xl z-20 break-all" data-popup="popupFeatured">
  <div>
    <p>【pubkey】</p>
    <p>{nip19.npubEncode(pubkey)}</p>

    <p class="mt-2">【relays】</p>

    <ul class="list-disc">
      {#each relays as relay}
        <li class="ml-4">{relay}</li>
      {/each}
    </ul>
  </div>
  <hr class="!border-t-2 my-1" />
  <div class="text-sm">
    <ul class="list-disc">
      <li class="ml-4">
        <span class="btn variant-filled p-0 w-5">🐥</span> Nostrで共有する
      </li>
      <li class="ml-4">
        <span class="btn variant-filled p-0 w-5">🔗</span> 外部アプリで開く
      </li>
      <li class="ml-4">
        <span class="btn variant-filled p-0 w-5">→</span> 他のリストに移動
      </li>
      <li class="ml-4">
        <span class="btn variant-filled p-0 w-5">🗑</span> リストから削除
      </li>
      <li class="ml-4">
        <span class="btn variant-filled-primary p-0 w-5 rounded-full">↻</span> リストの更新）
      </li>

      <li class="ml-4">
        <span class="btn variant-filled-primary p-0 rounded-full">mode</span> 複数選択との切り替え）
      </li>
    </ul>
  </div>
  <hr class="!border-t-2 my-1" />
  <button
    type="button"
    class="btn variant-filled py-1"
    on:click={() => goto(window.location.origin)}>Go back to Setup</button
  >
  <div class="arrow bg-surface-100-800-token" />
</div>

<main class="container max-w-5xl px-1 mt-24 mb-12">
  {#if !$bookmarkEvents || $bookmarkEvents.length === 0}
    {message}
  {:else}
    <div class="w-full fixed top-0 left-1/2 transform -translate-x-1/2 z-10">
      <div class="max-w-screen-lg m-auto z-10">
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
              <button class="btn-icon variant-filled" use:popup={popupFeatured}
                >📝</button
              ><!--<LightSwitch />-->
            </div>
          </svelte:fragment>

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

          <svelte:fragment slot="trail">
            <div class=" pr-2 text-center justify-center">
              {#if !isPageOwner}
                <button
                  type="button"
                  class="btn-icon variant-filled"
                  on:click={onClickLogin}>Login</button
                >
              {:else}
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
            </div>
          </svelte:fragment>
        </AppBar>

        <!--プライベートブクマとパブリックブクマ-->
        <TabGroup
          justify="justify-center"
          flex="flex-1"
          rounded=""
          class="bg-surface-50/80 w-full drop-shadow"
        >
          <Tab
            on:change={() => {
              console.log(bkm);
              //  checkedTags = [];
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
                if ($bookmarkEvents[tabSet].content.length > 0) {
                  try {
                    const content = await window.nostr.nip04.decrypt(
                      pubkey,
                      $bookmarkEvents[tabSet].content,
                    );
                    viewContents = JSON.parse(content);
                  } catch (error) {
                    const t = {
                      message: '復号化できませんでした',
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
        </TabGroup>
      </div>
    </div>

    <NostrApp relays={RelaysforSearch}>
      {#if viewContents}
        {#each viewContents as id, index}
          {#if id[0] === 'e'}
            <div
              class="card drop-shadow px-1 py-2 my-1 grid grid-cols-[1fr_auto] gap-1 {deleteNoteIndexes.includes(
                index,
              )
                ? 'delete-note'
                : ''}"
            >
              <Text queryKey={[id[1]]} id={id[1]} let:text>
                <div slot="loading">
                  <div class="text-sm break-all overflow-hidden">
                    Loading note... ({id[1]})
                  </div>
                </div>
                <div slot="error">
                  <div class="text-sm break-all overflow-hidden">
                    Failed to get note ({id[1]})
                  </div>
                </div>

                <div slot="nodata">
                  <div class="text-sm break-all overflow-hidden">
                    Note not found ({id[1]})
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
                    <div class="parent-container break-all whitespace-pre-wrap">
                      <Content text={text.content} tag={text.tags} />
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
                    <div class="parent-container break-all whitespace-pre-wrap">
                      <Content text={text.content} tag={text.tags} />
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
                    <div class="parent-container break-all whitespace-pre-wrap">
                      <Content text={text.content} tag={text.tags} />
                    </div>
                  </div>
                  <div class="grid grid-cols-[auto_1fr] gap-1">
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
                    <div
                      class="grid grid-rows-[auto_auto_auto] gap-0 break-all w-full"
                    >
                      <div
                        class="w-full grid grid-cols-[auto_1fr_auto] gap-1 h-fix"
                      >
                        <div class="font-bold wi truncate justify-items-end">
                          {JSON.parse(metadata.content).display_name}
                        </div>
                        <div class="truncate wid min-w-[2em] justify-items-end">
                          <button
                            class="text-emerald-800 text-sm"
                            on:click={() => {
                              handleClickPubkey(metadata, text.pubkey);
                            }}
                            >@<u>{JSON.parse(metadata.content).name}</u></button
                          >
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
                      {#if text.tags.length > 0}
                        {#each text.tags as tag}
                          {#if tag[0] === 'p'}
                            <Metadata
                              queryKey={['metadata', tag[1]]}
                              pubkey={tag[1]}
                              let:metadata
                            >
                              <div slot="loading">
                                <div
                                  class="-mt-1 px-2 opacity-60 text-sm overflow-hidden"
                                >
                                  to[p] {tag[1]}
                                </div>
                              </div>
                              <div slot="error">
                                <div
                                  class="-mt-1 px-2 opacity-60 text-sm overflow-hidden"
                                >
                                  to[p] {tag[1]}
                                </div>
                              </div>

                              <div slot="nodata">
                                <div
                                  class="-mt-1 px-2 opacity-60 text-sm overflow-hidden"
                                >
                                  to[p] {tag[1]}
                                </div>
                              </div>
                              <div
                                class="-mt-1 px-2 opacity-60 text-sm overflow-hidden"
                              >
                                to[p] <button
                                  class="text-emerald-800 overflow-hidden text-ellipsis"
                                  on:click={() => {
                                    handleClickPubkey(metadata, tag[1]);
                                  }}
                                  >@<u>{JSON.parse(metadata.content).name}</u
                                  ></button
                                >
                              </div>
                            </Metadata>
                          {:else if tag[0] === 'e'}
                            <Text queryKey={[tag[1]]} id={tag[1]} let:text>
                              <div slot="loading">
                                <div
                                  class="-mt-1 px-2 opacity-60 text-sm overflow-hidden"
                                >
                                  to[e] {tag[1]}
                                </div>
                              </div>
                              <div slot="error">
                                <div
                                  class="-mt-1 px-2 opacity-60 text-sm overflow-hidden"
                                >
                                  to[e] {tag[1]}
                                </div>
                              </div>

                              <div slot="nodata">
                                <div
                                  class="-mt-1 px-2 opacity-60 text-sm overflow-hidden"
                                >
                                  to[e] {tag[1]}
                                </div>
                              </div>

                              <div
                                class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                              >
                                to[e] <button
                                  class="text-emerald-800 whitespace-nowrap overflow-hidden text-ellipsis"
                                  on:click={() => {
                                    handleClickDate(text);
                                  }}>{text.content}</button
                                >
                              </div>
                            </Text>
                          {:else if tag[0] !== 'emoji' && tag[0] !== 'r' && tag[0] !== 't'}
                            <div
                              class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                            >
                              [{tag[0]}]
                              {tag[1]}
                            </div>
                          {/if}
                        {/each}
                      {/if}
                      <div
                        class="parent-container break-all whitespace-pre-wrap"
                      >
                        <Content text={text.content} tag={text.tags} />
                      </div>
                    </div>
                  </div>
                </Metadata>
              </Text>
              <div
                class="flex flex-col flex-wrap h-16 {isPageOwner ? 'w-12' : ''}"
              >
                {#if isMulti}
                  <input
                    class="m-2 checkbox scale-125"
                    type="checkbox"
                    checked={checkedIndexList.includes(index)}
                    on:change={() => onChangeCheckList(index)}
                  />
                {:else}
                  <button
                    class="btn p-0 mt-1 variant-filled justify-self-end w-5"
                    on:click={() => onClickQuote(id)}
                  >
                    🐥
                  </button>
                  <button
                    class="btn p-0 mt-1 variant-filled justify-self-end w-5"
                    on:click={() => {
                      window.open(
                        'https://nostr.com/' + nip19.noteEncode(id[1]),
                        '_blank',
                      );
                    }}
                  >
                    🔗
                  </button>

                  {#if isPageOwner}
                    <button
                      class="btn p-0 mt-1 variant-filled justify-self-end w-5 {isPageOwner
                        ? 'ml-1 '
                        : ''}"
                      on:click={() => {
                        if (!$nowProgress) {
                          onClickMove(tabSet, [index], bkm);
                        }
                      }}
                    >
                      →
                    </button>
                    <button
                      class="btn p-0 mt-1 variant-filled justify-self-end w-5 {isPageOwner
                        ? 'ml-1 '
                        : ''}"
                      on:click={() => {
                        if (!$nowProgress) {
                          onClickDelete(tabSet, index, bkm);
                        }
                      }}
                    >
                      🗑
                    </button>
                  {/if}
                {/if}
              </div>
            </div>
          {:else if id[0] !== 'd'}
            <div
              class="card drop-shadow-md p-2 my-1 grid grid-cols-[1fr_auto] gap-1"
            >
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
            </div>
          {/if}
        {/each}
      {/if}
    </NostrApp>
  {/if}
</main>

<!-- ------------------------------------footer-     -->

<div class="container max-w-5xl mx-auto z-10">
  {#if !$nowProgress}
    <div class=" fixed bottom-2">
      {#if isPageOwner}
        <button
          type="button"
          class="btn-icon variant-filled-surface font-bold mx-1"
          on:click={onClickMenu}
        >
          🍔</button
        >

        {#if !isMulti}
          <button
            type="button"
            class="btn variant-filled-surface font-bold mx-1"
            on:click={() => onClickAddNote(tabSet)}
          >
            add note</button
          >
          <button
            type="button"
            class="btn variant-filled-surface font-bold mx-1"
            on:click={onClickEditTags}
          >
            edit tag</button
          >
        {:else}
          <button
            type="button"
            class="btn variant-filled-surface font-bold mx-1"
            on:click={onClickMoveNotes}
          >
            move notes</button
          >
          <button
            type="button"
            class="btn variant-filled-surface font-bold mx-1 text-amber-200"
            on:click={onClickDeleteNotes}
          >
            delete notes</button
          >
        {/if}
      {/if}

      <!--コピーnaddrURL-->
      <button
        type="button"
        class="btn-icon variant-filled-surface mx-1"
        on:click={onClickKyouyuu}>共有</button
      >
      <!-----共有----->
      <button
        type="button"
        class="btn-icon variant-filled-surface mx-1"
        on:click={onClickUpdate}>↻</button
      >
    </div>
  {:else}
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
</style>
