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
  import SettingsIcon from '@material-design-icons/svg/round/settings.svg?raw';
  import Delete from '@material-design-icons/svg/round/delete.svg?raw';
  import { _ } from 'svelte-i18n';
  import { page } from '$app/stores';
  import { Metadata, NostrApp, Text, Nostr } from 'nosvelte';
  import { Kind, nip04, nip19 } from 'nostr-tools';
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
    isOneDimensionalArray,
    getBookmarkEvents,
  } from '$lib/functions';
  import {
    AppBar,
    Modal,
    SlideToggle,
    Tab,
    TabGroup,
    Toast,
    popup,
    type PopupSettings,
    type ToastSettings,
    type ModalSettings,
    type ModalComponent,
    ProgressRadial,
    type PaginationSettings,
    LightSwitch,
  } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { identifiersList, modalStore, toastStore } from '$lib/store';
  import {
    Kinds,
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
  import ModalKindMove from '$lib/components/ModalKindMove.svelte';
  import {
    searchIcon,
    tagListIcon,
    addNoteIcon,
    editTagIcon,
    updateListIcon,
  } from '$lib/myicons';

  import Share from '$lib/components/Button/Share.svelte';
  import Open from '$lib/components/Button/Open.svelte';
  import Move from '$lib/components/Button/Move.svelte';
  import DeleteBtn from '$lib/components/Button/Delete.svelte';
  import ModalDelete from '$lib/components/ModalDelete.svelte';
  import MyTabGroup from '$lib/components/MyTabGroup.svelte';
  import Ogp from '$lib/components/OGP.svelte';
  import UpdateIcon from '@material-design-icons/svg/round/update.svg?raw';

  import ListTitle from '$lib/components/ListTitle.svelte';

  let isSmph: boolean;
  let nowkind: Kinds = Kinds.kind10003;

  // const popupHover = (target: string, place: Placement): PopupSettings => {
  //   return {
  //     event: 'hover',
  //     target: target,
  //     placement: place,
  //   };
  // };
  // $: console.log(checkedIndexList);

  const { type, data } = nip19.decode($page.params.nprofile);
  // console.log($page.url);

  // console.log($page.url.searchParams);
  //  console.log($page.url.search);
  // const kind = $setKind ? $setKind : 30001;
  //const kind = [10003,30001,30003];

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

  const filters: Record<Kinds, { authors: string[]; kinds: Kinds[] }[]> = {
    [Kinds.kind10003]: [
      {
        authors: [pubkey],
        kinds: [Kinds.kind10003],
      },
    ],
    [Kinds.kind30001]: [
      {
        authors: [pubkey],
        kinds: [Kinds.kind30001],
      },
    ],
    [Kinds.kind30003]: [
      {
        authors: [pubkey],
        kinds: [Kinds.kind30003],
      },
    ],
  };

  let isPageOwner: boolean;
  let isMulti: boolean = false;
  let tabSet: number = 0;
  let bkm: string = 'pub';
  let viewContents: string[][];
  let message: string = 'now loading';
  let loadSetting: number;
  let URLPreview: boolean = true;
  let loadEvent: boolean = true;
  let writeRelays: string[];
  let iconView: boolean;
  $: if (
    $bookmarkEvents &&
    $bookmarkEvents[nowkind] &&
    $bookmarkEvents[nowkind][tabSet] &&
    $bookmarkEvents[nowkind][tabSet].tags
  ) {
    viewContents = $bookmarkEvents[nowkind][tabSet].tags;
  } else {
    viewContents = [];
  }
  //$: console.log(paginatedSource);
  $: if (viewContents && viewContents.length === 0) {
    paginatedSource = [];
  }
  $: console.log($identifiersList);

  onMount(async () => {
    $nowProgress = true;
    // const searchParams = new URLSearchParams($page.url.search);
    // if (searchParams.has('kind')) {
    //   const kindValue = searchParams.get('kind');
    //   if (kindValue !== null) {
    //     const parsedKind = parseInt(kindValue); // 文字列を数値に変換
    //     // if (!isNaN(parsedKind) && parsedKind >= 10000 && kind < 40000) {
    //     kind = parsedKind; // 数値が正しくパースされた場合に kind 変数に設定
    //     filters_30001[0].kinds = [kind];
    //     //}
    //   }
    // }

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
    isSmph = navigator.userAgent.match(/iPhone|Android.+Mobile/) ? true : false;
    message = 'now loading';
    if (dtype === 'nprofile') {
      try {
        isPageOwner = (await getPub()) === pubkey;
      } catch (error) {
        console.log('ログインチェック失敗');
      }
    }
    // if (isPageOwner) {
    //Nostrの仕様変更によりブックマークリストを移動させますを出す。（書き込みイベントが発生するので）
    //おｋだったらいかをやる
    //await kindMigrate(pubkey, relays);
    //}
    //---------------------------------------------------------------

    //前回開いたnprofileと違うときにブクマ取得する
    // if (get(pageNprofile) !== $page.url ) {
    if (pubkey !== '' || relays.length > 0) {
      //   try {
      //     $bookmarkEvents[Kinds.kind30001] = await fetchFilteredEvents(
      //       relays,
      //       filters[Kinds.kind30001],
      //     );
      //   } catch (error) {
      //     //
      //     //  console.log('ブクマ何もないかも');
      //     message = $_('nprofile.message');
      //   }

      const res = await getBookmarkEvents(relays, pubkey); //関数の方で$bookmarkEventsにセットするとこまでしちゃった

      console.log($bookmarkEvents[Kinds.kind30001]);
      console.log(res);
      if (
        res[Kinds.kind10003].length === 0 &&
        res[Kinds.kind30001].length === 0 &&
        res[Kinds.kind30003].length === 0
      ) {
        console.log('ブクマ何もないかも');
        message = $_('nprofile.message');
        $nowProgress = false;
        return;
      }
      message = $_('nprofile.message');
      viewContents = $bookmarkEvents[Kinds.kind10003][tabSet]?.tags;
      $nowProgress = false;
      //   try {
      //     $bookmarkEvents[Kinds.kind30003] = await fetchFilteredEvents(
      //       relays,
      //     filters[Kinds.kind30003],
      //     );
      //   } catch (error) {
      //     //
      //     //  console.log('ブクマ何もないかも');
      //     message = $_('nprofile.message');
      //   }
      //   console.log($bookmarkEvents[Kinds.kind30003]);
      //   try {
      //     $bookmarkEvents[Kinds.kind10003] = await fetchFilteredEvents(
      //       relays,
      //       filters[Kinds.kind10003],
      //     );
      //     console.log($bookmarkEvents[Kinds.kind10003]);
      //   } catch (error) {
      //     //
      //     //  console.log('ブクマ何もないかも');
      //     message = $_('nprofile.message');
      //   }
      //   if ($bookmarkEvents[Kinds.kind10003].length > 0) {
      //     viewContents = $bookmarkEvents[Kinds.kind10003][tabSet].tags;
      //   } else {
      //     viewContents = [];
      //   }

      //   $nowProgress = false;
      // } else {
      //   $nowProgress = false;
      //   const t = {
      //     message: 'error',
      //     timeout: 3000,
      //     background: 'bg-orange-500 text-white width-filled ',
      //   };
      //   toastStore.trigger(t);
      //   // console.log('error');
      // }
      // $pageNprofile = $page.url;
      // // } else {
      // //   //前回開いたnprofileと同じnprofileのとき
      // //   viewContents = $bookmarkEvents[tabSet].tags;
      // //   $nowProgress = false;
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

  function wheelScroll(event: {
    clientX: number;
    clientY: number;
    preventDefault: () => void;
    deltaY: any;
  }): void {
    console.log('wheel');
    console.log(event);
    // マウスの位置にある要素を取得
    const elementMouseIsOver = document.elementFromPoint(
      event.clientX,
      event.clientY,
    );
    console.log(elementMouseIsOver);
    //const elements = document.querySelector('.tab-list');

    // elementMouseIsOver がスクロール可能な要素であるか確認
    if (elementMouseIsOver && elementMouseIsOver instanceof HTMLElement) {
      elementMouseIsOver //.scrollLeft += event.deltaY;
        .scrollBy({
          top: 0,
          left: event.deltaY, // 横にスクロールする量
          behavior: 'smooth', // スクロールアニメーションを有効にする場合
        });
    }
    // ホイールイベントのデフォルトの動作をキャンセル
    event.preventDefault();
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

  const addNoteTitle = (kind: Kinds, tabSet: number) =>
    kind !== Kinds.kind10003
      ? $identifiersList[nowkind][tabSet].identifier ||
        `kind:${$bookmarkEvents[nowkind][tabSet].kind}`
      : `kind:${Kinds.kind10003}`;

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
    console.log(tag);
    console.log($bookmarkEvents[nowkind][tag]);
    if ($bookmarkEvents[nowkind].length === 0 && nowkind !== Kinds.kind10003) {
      const t = {
        message: $_('nprofile.toast.nobookmark'),
        timeout: 2000,
        background: 'bg-orange-500 text-white width-filled ',
      };
      toastStore.trigger(t);
      return;
    }
    const modal: ModalSettings = {
      type: 'component',
      // backdropClasses:
      //   '!bg-surface-400 dark:!bg-surface-700  !bg-opacity-20 dark:!bg-opacity-40',
      // // Pass the component directly:
      component: addModalComponent,
      // Provide arbitrary metadata to your modal instance:
      //title: `${$bookmarkEvents[tabSet].tags[0][1]}`,
      title: addNoteTitle(nowkind, tabSet),
      body: $_('nprofile.modal.addNote_body'),
      //value: { noteId: nip19.noteEncode(tag[1]) },
      // Returns the updated response value
      response: async (res) => {
        let check;

        if (res) {
          $nowProgress = true;
          let noteID = res.value;

          //^-----------------------------------------------------------------------kind1
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
                  $nowProgress = false;
                  return;
                } else if (Array.isArray(check.value)) {
                  await updateBkmTag(tag); //最新の状態に更新
                  const result = await addNotes(
                    relays,
                    $bookmarkEvents[nowkind][tag] ?? {
                      id: '',
                      sig: '',
                      pubkey: pubkey,
                      content: '',
                      tags: [],
                      created_at: '',
                      kind: nowkind,
                    },
                    [check.value],
                  );
                  //   console.log(result);
                  if (result.isSuccess) {
                    $bookmarkEvents[nowkind][tag] = result.event;
                    viewContents = $bookmarkEvents[nowkind][tag].tags;
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
                    $nowProgress = false;
                    return;
                  }
                }
              } else {
                //タグから追加
                try {
                  const tagArray = JSON.parse(res.tagvalue);

                  if (!isOneDimensionalArray(tagArray)) {
                    throw new Error();
                  }
                  if (tagArray[0] === 'd') {
                    throw new Error(`dタグは追加できません`);
                  }
                  // const isIncludedIn = arraysByKind[nowkind].includes(
                  //   tagArray[0],
                  // );
                  //入れれるタグ制限しようかと思ったけどexpected tag itemsだからそれ以外のタグをブクマに含めたらだめ！というわけではないかも
                  //https://github.com/nostr-protocol/nips/blob/master/51.md

                  await updateBkmTag(tag); //最新の状態に更新
                  const result = await addNotes(
                    relays,
                    $bookmarkEvents[nowkind][tag],
                    [tagArray],
                  );
                  //   console.log(result);
                  if (result.isSuccess) {
                    $bookmarkEvents[nowkind][tag] = result.event;
                    viewContents = $bookmarkEvents[nowkind][tag].tags;
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
                    $nowProgress = false;
                    return;
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

                if (check.error && typeof check.value === 'string') {
                  const t = {
                    message: check.value,
                    timeout: 3000,
                    background: 'bg-orange-500 text-white width-filled ',
                  };

                  toastStore.trigger(t);
                  $nowProgress = false;
                  return;
                } else if (Array.isArray(check.value)) {
                  await updateBkmTag(tag); //最新の状態に更新
                  const result = await addPrivateNotes(
                    relays,
                    $bookmarkEvents[nowkind][tag],
                    [check.value as string[]],
                    pubkey,
                  );
                  // console.log(result);
                  if (result.isSuccess) {
                    $bookmarkEvents[nowkind][tag] = result.event;
                    viewContents = $bookmarkEvents[nowkind][tag].tags;
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
                    $nowProgress = false;
                    return;
                  }
                }
              } else {
                //タグから追加のとこ
                try {
                  const tagArray = JSON.parse(res.tagvalue);
                  if (!isOneDimensionalArray(tagArray)) {
                    throw new Error();
                  }
                  await updateBkmTag(tag); //最新の状態に更新
                  const result = await addPrivateNotes(
                    relays,
                    $bookmarkEvents[nowkind][tag],
                    [tagArray],
                    pubkey,
                  );
                  // console.log(result);
                  if (result.isSuccess) {
                    $bookmarkEvents[nowkind][tag] = result.event;
                    viewContents = $bookmarkEvents[nowkind][tag].tags;
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
                    $nowProgress = false;
                    return;
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
    const kind = nowkind;
    const tagIndex = tabSet;
    const event = $bookmarkEvents[kind][tagIndex];
    const modal: ModalSettings = {
      type: 'component',

      // Pass the component directly:
      component: editTagModalComponent,
      // Provide arbitrary metadata to your modal instance:
      title: `${$_('nprofile.modal.editTags.title')}[${kind}]`,
      body: '',
      value: {
        selectedValue: 0,
        nowkind: kind,
        event: event,
      },
      // Returns the updated response value
      response: async (res: {
        create: {
          id: string;
          title?: string;
          image?: string;
          description?: string;
        }; //新規タグの名前
        edit: { title?: string; image?: string; description?: string }; //タグの情報の修正
        btn: string; // add, edit, delete kindMove 作るか消すか動かすか編集するか
        tagIndex: number; //削除するタグのインデックス

        id: string; //10003から移行するときのタグしてい
        kind: Kinds; //どこに動かすか
      }) => {
        if (res) {
          switch (res.btn) {
            case 'add':
              addTag(res.create);

              break;
            case 'delete':
              //
              const modal: ModalSettings = {
                type: 'component',
                component: deleteModalComponent,
                title: $_('nprofile.modal.deleteTag.title'),
                body: `${$_('nprofile.modal.deleteTag.body')}`,
                value: {
                  tag:
                    $identifiersList[kind][res.tagIndex].identifier ??
                    $bookmarkEvents[kind][res.tagIndex].kind,
                },
                response: async (res2) => {
                  //console.log(res);
                  if (res2) {
                    await deleteTag(
                      $bookmarkEvents[kind][res.tagIndex],
                      res.tagIndex,
                    );
                  }
                },
              };
              modalStore.trigger(modal);

              break;
            case 'kindMove':
              $nowProgress = true;
              console.log(res);
              await kindMove(
                event,
                { kind: kind, tagIndex: tagIndex },
                { kind: res.kind, id: res.id },
              );
              $nowProgress = false;
              break;

            case 'edit':
              //console.log(res.edit);

              const data = res.edit as {
                title: string;
                image: string;
                description: string;
              };
              $nowProgress = true;
              await updateListInfo(data);
              $nowProgress = false;

              break;
          }
        }
      },
    };
    modalStore.trigger(modal);
  }

  async function updateListInfo(data: {
    title: string;
    image: string;
    description: string;
  }) {
    console.log(data);

    const listNumber = tabSet;
    const kind = nowkind;
    const eventTag = $bookmarkEvents[kind][listNumber].tags;

    let titleIndex = eventTag.findIndex((item) => item[0] === 'title');
    if (titleIndex !== -1) {
      // すでに "title" タグが存在する場合、値を更新
      eventTag[titleIndex][1] = data.title;
    } else {
      // "title" タグが存在しない場合、配列の二番目（dタグの後ろ）に挿入
      eventTag.splice(1, 0, ['title', data.title]);
      titleIndex = 1;
    }

    let imageIndex = eventTag.findIndex((item) => item[0] === 'image');
    if (imageIndex !== -1) {
      // すでに "title" タグが存在する場合、値を更新
      eventTag[imageIndex][1] = data.image;
    } else {
      // "image" タグが存在しない場合、titleのうしろに挿入
      imageIndex = titleIndex + 1;
      eventTag.splice(imageIndex, 0, ['image', data.image]);
    }

    const descriptionIndex = eventTag.findIndex(
      (item) => item[0] === 'description',
    );
    if (descriptionIndex !== -1) {
      // すでに "title" タグが存在する場合、値を更新
      eventTag[descriptionIndex][1] = data.description;
    } else {
      // "title" タグが存在しない場合、配列の二番目（dタグの後ろ）に挿入
      eventTag.splice(imageIndex + 1, 0, ['description', data.description]);
    }
    console.log(eventTag);
    const event: Nostr.Event = {
      id: '',
      kind: $bookmarkEvents[kind][listNumber].kind,
      pubkey: pubkey,
      content: $bookmarkEvents[kind][listNumber].content,
      tags: eventTag,
      created_at: Math.floor(Date.now() / 1000),
      sig: '',
    };
    const result = await publishEvent(event, relays);
    console.log(result);
    if (result.isSuccess && $bookmarkEvents && result.event) {
      $bookmarkEvents[kind][listNumber] = result.event;
      //viewContents = $bookmarkEvents[kind][listNumber].tags;
      const t = {
        message: 'Add note<br>' + result.msg.join('<br>'),
        timeout: 3000,
      };

      toastStore.trigger(t);
    } else {
      const t = {
        message: $_('toast.failed_publish'),
        timeout: 3000,
        background: 'bg-orange-500 text-white width-filled ',
      };

      toastStore.trigger(t);
    }
  }

  async function kindMove(
    event: Nostr.Event,
    from: { kind: Kinds; tagIndex: number }, //さくじょにつかう
    data: { kind: Kinds; id: string },
  ) {
    let tags: string[][] = [];
    // "d"で始まる要素を排除するフィルタリング関数
    const filterTags = (tag: string[]): boolean => tag[0] !== 'd';
    //dタグ削除したやつ
    const filteredTags: string[][] = event.tags.filter(filterTags);
    console.log(event);
    console.log(data);

    //移動元が10003のとき
    if (event.kind === 10003) {
      if (data.id === '') {
        console.error('input id error');
        return;
      }

      tags = [['d', data.id], ...filteredTags];
    } else if (data.kind === 10003) {
      //移動先が10003のとき
      tags = filteredTags;
    } else {
      tags = event.tags;
    }
    const newEvent: Nostr.Event = {
      id: '',
      sig: '',
      kind: data.kind,
      tags: tags,
      pubkey: event.pubkey,
      created_at: Math.floor(Date.now() / 1000),
      content: event.content,
    };
    try {
      $nowProgress = true;
      // publishEvent関数を非同期に呼び出し、結果を待つ
      const res = await publishEvent(newEvent, relays);

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

      // 成功したら$bookmarkEventsを更新する//すでにおなじDタグのものが存在する場合はそのデータに上書きする

      if (data.kind === 10003) {
        $bookmarkEvents[data.kind][0] = res.event;
      } else {
        const existingIndex = $bookmarkEvents[data.kind].findIndex(
          (item) => item.tags[0][1] === res.event.tags[0][1],
        );

        if (existingIndex !== -1) {
          // すでに同じDタグのデータが存在する場合は上書き
          $bookmarkEvents[data.kind][existingIndex] = res.event;
        } else {
          // 存在しない場合は新しいデータを追加
          $bookmarkEvents[data.kind].push(res.event);
        }
      }
      const t = {
        message: $_('nprofile.toast.add_tag') + res.msg.join('<br>'),
        timeout: 5000,
      };
      toastStore.trigger(t);
      //もとのイベントを消す
      await deleteTag(event, from.tagIndex);
      if ($bookmarkEvents[nowkind].length === 0) {
        message = 'no data';
      }
    } catch (error) {
      const t = {
        message: $_('nprofile.toast.failed'),
        timeout: 5000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(t);
    }
    $nowProgress = false;
  }

  async function addTag(data: {
    id: string;
    title?: string;
    image?: string;
    description?: string;
  }) {
    //tagName: string) {
    let tags = [['d', data.id]];
    if (data.title && data.title.trim() !== '') {
      tags.push(['title', data.title]);
    }
    if (data.image && data.image.trim() !== '') {
      tags.push(['image', data.image]);
    }
    if (data.description && data.description.trim() !== '') {
      tags.push(['description', data.description]);
    }
    const event: Nostr.Event = {
      id: '',
      content: '',
      kind: nowkind,
      pubkey: pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: tags,
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
      $bookmarkEvents[nowkind].push(res.event);
      const t = {
        message: $_('nprofile.toast.add_tag') + res.msg.join('<br>'),
        timeout: 5000,
      };
      toastStore.trigger(t);
    } catch (error) {
      const t = {
        message: $_('nprofile.toast.failed'),
        timeout: 5000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(t);
    }
    $nowProgress = false;
  }

  //タグの削除はからの配列で上書き
  async function deleteTag(event: Nostr.Event, tagIndex: number) {
    const dtag = event.tags.find((tag) => tag[0] === 'd');
    console.log(dtag);
    const newEvent: Nostr.Event = {
      id: '',
      content: '',
      kind: event.kind,
      pubkey: pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: dtag ? [dtag] : [],
      sig: '',
    };

    try {
      $nowProgress = true;
      // publishEvent関数を非同期に呼び出し、結果を待つ
      const res = await publishEvent(newEvent, relays);

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
      const kind = event.kind as Kinds;
      $bookmarkEvents[kind][tagIndex] = res.event;
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

    // console.log(_bkm);
    // console.log(tagIndex);
    // console.log(viewContents[noteIndex[0]]);
    // console.log($bookmarkEvents[tabSet].tags[0][1]);
    // console.log(noteIndex);
    // console.log($bookmarkEvents[tabSet].tags[noteIndex[0]][1]);
    //どこに移動させるのか画面を出す。
    const modal: ModalSettings = {
      type: 'component',
      component: moveModalComponent,
      title: $_('nprofile.modal.moveNote.title'),
      body: `${$_('nprofile.modal.moveNote.body_from')} kind:${
        $bookmarkEvents[nowkind][tabSet].kind
      } ${
        $identifiersList[nowkind][tabSet].identifier
          ? `[${$identifiersList[nowkind][tabSet].identifier}]`
          : ''
      } ${$_('nprofile.modal.moveNote.body_to')}`,

      value: {
        bkm: _bkm,
        tag: tagIndex,
        kind: nowkind,
      },
      response: (res) => {
        //console.log(res);
        if (res) {
          $nowProgress = true;
          moveNote(
            noteIndex,
            { kind: nowkind, tag: tagIndex, bkm: _bkm },
            { kind: res.kind, tag: res.tag, bkm: res.bkm },
          );
        }
      },
    };
    modalStore.trigger(modal);
    deleteNoteIndexes = []; // 削除されたノートのインデックスを設定
  }
  async function moveNote(
    noteIndexes: number[],
    from: { kind: Kinds; tag: number; bkm: string },
    to: { kind: Kinds; tag: number; bkm: string },
  ) {
    $nowProgress = true;
    await updateBkmTag(from.tag); //最新の状態に更新
    await updateBkmTag(to.tag); //最新の状態に更新

    const noteIds = noteIndexes.map((index) => viewContents[index]); //プライベートでもパブリックでもどっちでも
    //移動先にAddNote

    const res =
      to.bkm === 'pub'
        ? await addNotes(relays, $bookmarkEvents[to.kind][to.tag], noteIds)
        : await addPrivateNotes(
            relays,
            $bookmarkEvents[to.kind][to.tag],
            noteIds,
            pubkey,
          );
    //  console.log(res);

    toastStore.clear();

    if (!res.isSuccess) {
      //しっぱいしましたかく。
      const t: ToastSettings = {
        message: `${$_('nprofile.modal.failed1')} ${
          $bookmarkEvents[to.kind][to.tag].tags[0][1]
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
      $bookmarkEvents[to.kind][to.tag] = res.event;

      //移動元のノートを削除する

      const res2 =
        from.bkm === 'pub'
          ? await deleteNotes(
              relays,
              $bookmarkEvents[from.kind][from.tag],
              noteIndexes,
            )
          : await deletePrivateNotes(
              relays,
              $bookmarkEvents[from.kind][from.tag],
              noteIndexes,
              pubkey,
            );
      //  console.log(res2);
      if (!res.isSuccess) {
        //失敗しましたかく
        const t = {
          message: `${$_('nprofile.toast.delete_failed1')} ${
            $bookmarkEvents[from.kind][from.tag].tags[0][1]
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
        $bookmarkEvents[from.kind][from.tag] = res2.event;
        // 表示を更新する
        if (from.bkm === 'pub') {
          viewContents = $bookmarkEvents[from.kind][from.tag].tags;
        } else {
          try {
            const content = await nip04De(
              pubkey,
              $bookmarkEvents[from.kind][from.tag].content,
            );

            viewContents = JSON.parse(content);
          } catch (error) {
            viewContents = [[$bookmarkEvents[from.kind][from.tag].content]];
          }
        }
      }
    }

    if (Array.isArray(viewContents) && Array.isArray(viewContents[0])) {
      paginatedSource = viewContents.slice(
        pages.page * pages.limit, // start
        pages.page * pages.limit + pages.limit, // end
      );
    } else {
      paginatedSource = viewContents;
    }

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
  function onClickDelete(
    tagIndex: number,
    noteIndex: number,
    _bkm: string,
    event: Nostr.Event<number> | {},
  ) {
    deleteNoteIndexes = [noteIndex]; // 削除されたノートのインデックスを設定
    // console.log(_bkm);
    // console.log(tagIndex);
    // console.log($bookmarkEvents[tabSet].tags[0][1]);
    // console.log(noteIndex);
    // console.log($bookmarkEvents[tabSet].tags[noteIndex][1]);
    //ほんとに消すのか出す
    const modal: ModalSettings = {
      type: 'component',
      component: deleteModalComponent,
      title: $_('nprofile.modal.deleteNote.title'),
      body: `${$_('nprofile.modal.deleteNote.body')}`,
      value: {
        event: [event],
      },
      response: async (res) => {
        //console.log(res);
        if (res) {
          await deleteNote(tagIndex, [noteIndex], bkm);
          deleteNoteIndexes = [];
        } else {
          deleteNoteIndexes = [];
        }
      },
    };
    modalStore.trigger(modal);
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
        ? await deleteNotes(
            relays,
            $bookmarkEvents[nowkind][tagIndex],
            noteIndex,
          )
        : await deletePrivateNotes(
            relays,
            $bookmarkEvents[nowkind][tagIndex],
            noteIndex,
            pubkey,
          );

    // console.log(res);
    if (res.isSuccess) {
      $bookmarkEvents[nowkind][tagIndex] = res.event;

      // 表示を更新する
      if (_bkm === 'pub') {
        viewContents = $bookmarkEvents[nowkind][tagIndex].tags;
      } else {
        try {
          const content = await nip04De(
            pubkey,
            $bookmarkEvents[nowkind][tagIndex].content,
          );

          viewContents = JSON.parse(content);
        } catch (error) {
          viewContents = [[$bookmarkEvents[nowkind][tagIndex].content]];
        }
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
      pages.page * pages.limit, // start
      pages.page * pages.limit + pages.limit, // end
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
    if ($bookmarkEvents[nowkind].length === 0) {
      return;
    }
    const t0: ToastSettings = {
      message: $_('nprofile.toast.update_message'),
      autohide: false,
      background: 'bg-fuchsia-800 text-white width-filled ',
    };

    toastStore.trigger(t0);

    const filters = $identifiersList[nowkind][tagIndex].identifier
      ? [
          {
            authors: [pubkey],
            kinds: [nowkind],
            '#d': [$identifiersList[nowkind][tagIndex].identifier ?? ''],
          },
        ]
      : [
          {
            authors: [pubkey],
            kinds: [nowkind],
          },
        ];
    // console.log(filters);
    try {
      const res = await fetchFilteredEvents(relays, filters);
      //  console.log(res);
      if (res[0].created_at > $bookmarkEvents[nowkind][tagIndex].created_at) {
        $bookmarkEvents[nowkind][tagIndex] = res[0];
      }
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
  interface CheckedList {
    index: number;
    event: Nostr.Event<number> | {};
  }
  let checkedIndexList: CheckedList[] = [];
  function onClickMoveNotes() {
    if (checkedIndexList.length === 0) {
      return;
    }
    //どこに移動させるのか画面を出す。

    const modal: ModalSettings = {
      type: 'component',
      component: moveModalComponent,
      title: $_('nprofile.modal.moveNote.title'),
      body: `${$_('nprofile.modal.moveNote.body_from')} kind:${
        $bookmarkEvents[nowkind][tabSet].kind
      } ${
        $identifiersList[nowkind][tabSet].identifier
          ? `[${$identifiersList[nowkind][tabSet].identifier}]`
          : ''
      } ${$_('nprofile.modal.moveNote.body_to')}`,
      value: {
        kind: $bookmarkEvents[nowkind][tabSet].kind,
        bkm: bkm,
        tag: tabSet,
      },
      response: async (res) => {
        // console.log(res);
        if (res) {
          await moveNote(
            checkedIndexList.map((item) => item.index),
            { kind: nowkind, tag: tabSet, bkm: bkm },
            { kind: res.kind, tag: res.tag, bkm: res.bkm },
          );
          // deleteNoteIndexes = []; // 削除されたノートのインデックスを設定
          // checkedIndexList = [];
          // isMulti = false;
        }
      },
    };
    modalStore.trigger(modal);
  }

  //---------------------------------
  //---------------------------------------------delete?modal
  const deleteModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalDelete,
    // Add the component properties as key/value pairs
    //props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: '<p>Skeleton</p>',
  };

  function onClickDeleteNotes() {
    if (checkedIndexList.length === 0) {
      return;
    }
    // console.log(checkedIndexList);
    //ほんとに消すのか出す
    //削除するeventたち
    const deleteEvents = checkedIndexList.map((item) => item.event);
    const modal: ModalSettings = {
      type: 'component',
      component: deleteModalComponent,
      title: $_('nprofile.modal.deleteNote.title'),
      body: `${$_('nprofile.modal.deleteNote.body')}`,
      value: {
        event: deleteEvents,
      },
      response: async (res) => {
        //console.log(res);
        if (res) {
          await deleteNote(
            tabSet,
            checkedIndexList.map((item) => item.index),
            bkm,
          );
          checkedIndexList = [];
          deleteNoteIndexes = [];
        }
      },
    };
    modalStore.trigger(modal);
  }

  //--------------j\共有ボタン
  function onClickKyouyuu() {
    const address: nip19.AddressPointer = {
      identifier: $identifiersList[nowkind][tabSet].identifier ?? '',
      pubkey: pubkey,
      kind: nowkind,
      relays: relays,
    };
    const naddr = nip19.naddrEncode(address);
    // console.log(naddr);
    // console.log(window.location.origin);
    const naddrURL = window.location.origin + '/a/' + naddr;
    // console.log(naddrURL);

    //  console.log('post');
    const tags = [
      [
        'a',
        `${nowkind}:${pubkey}:${
          $bookmarkEvents[nowkind][tabSet].tags.length > 0
            ? $bookmarkEvents[nowkind][tabSet].tags[0][1]
            : ''
        }`,
      ],
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
        //  console.log(res);
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

  function onChangeCheckList(idx: number, event: Nostr.Event<number> | {}) {
    if (checkedIndexList.map((item) => item.index).includes(idx)) {
      checkedIndexList.splice(
        checkedIndexList.map((item) => item.index).indexOf(idx),
        1,
      );
    } else {
      checkedIndexList.push({ index: idx, event: event });
    }
    //背景色変えるやつ
    deleteNoteIndexes = checkedIndexList.map((item) => item.index);

    // console.log(idx);
    //  console.log(checkedIndexList);
  }

  //----------------------------------
  async function onClickUpdate() {
    if (pubkey !== '' || relays.length > 0) {
      $nowProgress = true;
      try {
        $bookmarkEvents[nowkind] = await fetchFilteredEvents(
          relays,
          filters[nowkind],
        );

        if ($bookmarkEvents[nowkind].length > 0) {
          // bookmarkをbookmark[i].tags[0][1]の値で降順に並べ替える
          $bookmarkEvents[nowkind].sort((a, b) => {
            const tagID_A = a.tags[0][1];
            const tagID_B = b.tags[0][1];
            return tagID_A.localeCompare(tagID_B);
          });
          //     console.log($bookmarkEvents);
          viewContents = $bookmarkEvents[nowkind][tabSet].tags;
        }
      } catch (error) {
        //    console.log('ブクマ何もないかも');
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
      // value: {
      //   tagList: $bookmarkEvents[nowkind].map((item) => item.tags[0][1]),
      // },
      response: (res) => {
        //   console.log(res);
        if (res && res.index !== -1) {
          nowkind = res.kind;
          tabSet = res.index;
          viewContents = $bookmarkEvents[nowkind][tabSet].tags;

          const elements = document.querySelector('.tab-list');

          if (elements) {
            // const scrollPercentage =
            (Math.max(tabSet, 2) - 2) / ($bookmarkEvents[nowkind].length - 3);
            //scrollWidth の値は、水平スクロールバーを使用せずにすべてのコンテンツをビューポート内に合わせるために要素が必要とする最小幅に等しくなります
            //  console.log(elements.clientWidth); //要素の横幅
            // console.log(elements.scrollWidth); //スクロール含め？た横幅
            const haba = elements.scrollWidth / $bookmarkEvents[nowkind].length; //画面に入るタブ数

            const scrollPosition = Math.round(
              Math.min(
                Math.max(tabSet * haba - (1 / 2) * elements.clientWidth, 0),
                elements.scrollWidth,
              ), //scrollPercentage * elements.scrollWidth,
            );

            elements.scrollTo({
              top: 0,
              left: scrollPosition,
              behavior: 'auto',
            });
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
    //  console.log('quote');
    if ($bookmarkEvents[nowkind].length === 0) {
      return;
    }
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
    //  console.log('search');

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
        //  console.log(res);
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
    //offset: 0,
    page: 0,
    limit: pagelimit,
    size: viewContents && viewContents.length > 0 ? viewContents.length : 1,
    amounts: [pagelimit],
  };
  $: paginatedSource =
    viewContents &&
    Array.isArray(viewContents) &&
    Array.isArray(viewContents[0])
      ? viewContents.slice(
          pages.page * pages.limit, // start
          pages.page * pages.limit + pages.limit, // end
        )
      : viewContents;

  function onPageChange(e: CustomEvent): void {
    checkedIndexList = [];
    deleteNoteIndexes = [];
    isMulti = false;
    // console.log(typeof e.detail);
    // console.log('event:page', e.detail);

    // console.log( Math.floor(viewContents.length / pages.limit));
    pages.page = Object.is(e.detail, -0)
      ? Math.floor(viewContents.length / pages.limit)
      : e.detail;

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
  const kindmoveModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalKindMove,
  };
  function onClickTagButton(
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
  ) {
    const modal: ModalSettings = {
      type: 'component',
      component: kindmoveModalComponent,

      value: {
        event: $bookmarkEvents[nowkind][tabSet],
      },
      response: async (res) => {
        console.log(res);
        if (res) {
        }
      },
    };
    modalStore.trigger(modal);
  }
</script>

<svelte:head>
  <title>nostr-bookmark-viewer</title>
  <meta
    name="description"
    content="nostr kind:{nowkind}
pubkey:{nip19.npubEncode(pubkey)}"
  />

  <meta prefix="og: https://ogp.me/ns#" />
  <meta property="og:title" content="nostr-bookmark-viewer3" />
  <meta
    property="og:description"
    content="kind:{nowkind}
pubkey:{nip19.npubEncode(pubkey)}"
  />
  <meta
    property="og:image"
    content="https://nostr-bookmark-viewer3.vercel.app/img2.png"
  />
</svelte:head>
<Modal />
<Toast zIndex="z-[999999]" />

{#if !isSmph}
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
{/if}
<div
  class="card border border-purple-800 p-4 w-[26rem] h-[42rem] shadow-xl z-20 break-all max-h-[80%] max-w-[90%] overflow-auto"
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
  <hr class="py-1" />
  <ul class="list-disc">
    <li class="ml-4 my-1">
      <div class="flex items-center justify-between">
        <!-- 修正: flexクラスにitems-centerを追加 -->
        <span class="pr-2">{'Light Switch'}</span>
        <LightSwitch class="flex" />
      </div>
    </li>

    {#if !$nowProgress}
      <li class="ml-4 my-1">
        <!-- こんてんとわーにんぐ全部表示OR非表示 -->

        <div class="flex items-center justify-between">
          <!-- 修正: flexクラスにitems-centerを追加 -->
          <span class="pr-2">{$_('nprofile.html.warning')}</span>
          <SlideToggle name="slider-label" size="sm" bind:checked={$allView}>
            <span class="text-sm">{$allView ? 'ON' : 'OFF'}</span>
          </SlideToggle>
        </div>
      </li>
    {/if}
    <li class="ml-4 justify-stretch my-1">
      <div class="flex items-center justify-between">
        <!-- 修正: flexクラスにitems-centerを追加 -->
        {$_('nprofile.html.preview')}
        <SlideToggle name="slider-label" size="sm" bind:checked={URLPreview}>
          <span class="text-sm">{URLPreview ? 'ON' : 'OFF'}</span>
        </SlideToggle>
      </div>
    </li>
    <li class="ml-4 justify-stretch my-1">
      <div class="flex items-center justify-between">
        <!-- 修正: flexクラスにitems-centerを追加 -->
        {$_('nprofile.html.loadIcon')}
        <SlideToggle name="slider-label" size="sm" bind:checked={iconView}>
          <span class="text-sm">{iconView ? 'ON' : 'OFF'}</span>
        </SlideToggle>
      </div>
    </li>
    <li class="ml-4 justify-stretch my-1">
      <div class="flex items-center justify-between">
        <!-- 修正: flexクラスにitems-centerを追加 -->
        {$_('nprofile.html.loadnote')}
        <SlideToggle name="slider-label" size="sm" bind:checked={loadEvent}>
          <span class="text-sm">{loadEvent ? 'ON' : 'OFF'}</span>
        </SlideToggle>
      </div>
    </li>
  </ul>

  <hr class="!border-t-2 my-2" />
  <div class="text-sm grid grid-cols-[0.5fr_0.5fr]">
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div
        class="btn p-0 mt-0.5 h-6 w-6 rounded fill-primary-100 variant-filled-primary"
      >
        {@html Chat}
      </div>
      {$_('nprofile.html.share')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div
        class="btn p-0 mt-0.5 h-6 w-6 rounded fill-primary-100 variant-filled-primary"
      >
        {@html OpenInBrowser}
      </div>
      {$_('nprofile.html.openapp')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div
        class="btn p-0 mt-0.5 h-6 w-6 rounded fill-primary-100 variant-filled-primary"
      >
        {@html ArrowCircleRight}
      </div>
      {$_('nprofile.html.move')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div
        class="btn p-0 mt-0.5 h-6 w-6 rounded fill-warning-300 variant-filled-primary"
      >
        {@html Delete}
      </div>
      {$_('nprofile.html.delete')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div class="btn variant-filled-primary rounded-full mt-0.5 p-0 h-6 w-6">
        {@html searchIcon}
      </div>

      {$_('nprofile.html.search')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div class="btn variant-filled-primary p-0 mt-0.5 h-6 w-6">
        {@html tagListIcon}
      </div>
      {$_('nprofile.html.list')}
    </div>

    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div class="btn variant-filled-primary p-0 mt-0.5 h-6 w-6">
        {@html addNoteIcon}
      </div>
      {$_('nprofile.html.add')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div class="btn variant-filled-primary p-0 mt-0.5 h-6 w-6">
        {@html editTagIcon}
      </div>
      {$_('nprofile.html.edit')}
    </div>

    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div class="btn variant-filled-primary p-0 mt-0.5 h-6 w-6 fill-white">
        {@html UpdateIcon}
      </div>
      {$_('nprofile.html.update')}
    </div>
    <!-- <div class="grid grid-cols-[auto_1fr] gap-1">
        <span class="btn variant-filled-primary p-0 mt-0.5 h-5 w-6"
          >{@html warningOnIcon}</span
        >
        {$_('nprofile.html.warning')}
      </div> -->

    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class="btn variant-filled-primary rounded-full p-0 h-5">mode</span>
      {$_('nprofile.html.mode')}
    </div>
  </div>
  <hr class="!border-t-2 my-1" />
  <div>
    <p>{$_('nprofile.html.info')}</p>
    <ul class="list-disc">
      <li class="ml-4">
        {$_('nprofile.html.kind')}:
        {nowkind}
      </li>

      <li class="ml-4">
        {$_('nprofile.html.type')}
        {dtype}
        {dtype === 'npub' ? '(readonly)' : ''}
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

  <div class="arrow bg-surface-100-800-token" />
</div>

<main class="m-auto max-w-6xl px-1 mt-[6rem] mb-12 overflow-x-hidden">
  {#if !$bookmarkEvents || ($bookmarkEvents[nowkind] && $bookmarkEvents[nowkind].length === 0)}
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
        padding="p-0 "
        background="bg-surface-300-600-token "
        gap="gap-0"
      >
        <svelte:fragment slot="lead">
          <div
            class="m-0 lead-icon z-20 bg-surface-100 rounded-full md:w-[32px] md:m-2 w-0"
          >
            <img
              src="https://nostr-bookmark-viewer3.vercel.app/favicon.png"
              alt="bkmstr"
            />
          </div>
        </svelte:fragment>
        {#if !$nowProgress}
          <TabGroup
            padding=" px-2 md:px-4"
            justify="justify"
            active="variant-filled-primary"
            hover="hover:variant-soft-primary"
            border="border-b border-surface-400-500-token"
            rounded="rounded-tl-container-token rounded-tr-container-token"
          >
            <Tab
              on:change={() => {
                isMulti = false;
                tabSet = 0;
                if (
                  $bookmarkEvents &&
                  $bookmarkEvents[nowkind] &&
                  $bookmarkEvents[nowkind][tabSet] &&
                  $bookmarkEvents[nowkind][tabSet].tags
                ) {
                  viewContents = $bookmarkEvents[nowkind][tabSet].tags;
                }
                bkm = 'pub';
                onClickTab(0);
              }}
              bind:group={nowkind}
              name={Kinds.kind10003.toString()}
              value={Kinds.kind10003}
            >
              <div class="text-xs">kind:{Kinds.kind10003}</div>
              {$_('kind.10003.title')}
            </Tab>

            <Tab
              on:change={() => {
                isMulti = false;
                tabSet = 0;
                if (
                  $bookmarkEvents &&
                  $bookmarkEvents[nowkind] &&
                  $bookmarkEvents[nowkind][tabSet] &&
                  $bookmarkEvents[nowkind][tabSet].tags
                ) {
                  viewContents = $bookmarkEvents[nowkind][tabSet].tags;
                }
                bkm = 'pub';
                onClickTab(0);
              }}
              bind:group={nowkind}
              name={Kinds.kind30003.toString()}
              value={Kinds.kind30003}
            >
              <div class="text-xs">kind:{Kinds.kind30003}</div>
              {$_('kind.30003.title')}
            </Tab>

            <Tab
              on:change={() => {
                isMulti = false;
                tabSet = 0;
                if (
                  $bookmarkEvents &&
                  $bookmarkEvents[nowkind] &&
                  $bookmarkEvents[nowkind][tabSet] &&
                  $bookmarkEvents[nowkind][tabSet].tags
                ) {
                  viewContents = $bookmarkEvents[nowkind][tabSet].tags;
                }
                bkm = 'pub';
                onClickTab(0);
              }}
              bind:group={nowkind}
              name={Kinds.kind30001.toString()}
              value={Kinds.kind30001}
            >
              <div class="text-xs">kind:{Kinds.kind30001}</div>
              {$_('kind.30001.title')}
            </Tab>
          </TabGroup>
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

      {#if $bookmarkEvents && $bookmarkEvents[nowkind] && $bookmarkEvents[nowkind].length > 0}
        <div class="grid grid-cols-[auto_1fr] overflow-x-hidden drop-shadow">
          <MyTabGroup
            active="variant-filled-primary"
            hover="hover:variant-soft-primary"
            rounded=""
            border=""
            padding="px-2 py-3"
            class="overflow-x-auto bg-surface-100-800-token  break-keep "
            >{#if nowkind !== Kinds.kind10003}
              {#each $bookmarkEvents[nowkind] as reaction, index}
                {#if !$nowProgress}
                  <Tab
                    on:change={() => {
                      isMulti = false;

                      if (
                        $bookmarkEvents &&
                        $bookmarkEvents[nowkind] &&
                        $bookmarkEvents[nowkind][tabSet] &&
                        $bookmarkEvents[nowkind][tabSet].tags
                      ) {
                        viewContents = $bookmarkEvents[nowkind][tabSet].tags;
                      }
                      bkm = 'pub';
                      onClickTab(index);
                    }}
                    bind:group={tabSet}
                    name={reaction.tags[0]
                      ? reaction.tags.find((tag) => tag[0] === 'd')?.[1] ||
                        `kind:${nowkind}`
                      : `kind:${nowkind}`}
                    value={index}
                  >
                    {reaction.tags[0]
                      ? reaction.tags.find((tag) => tag[0] === 'd')?.[1] ||
                        `kind:${nowkind}`
                      : `kind:${nowkind}`}
                  </Tab>
                {/if}
              {/each}
            {/if}
          </MyTabGroup>
          <!------------------------------------------------------プライベートブクマとパブリックブクマ-->
          <div class="flex justify-end bg-surface-100-800-token">
            <TabGroup
              active="variant-filled-secondary"
              hover="hover:variant-soft-secondary"
              rounded="rounded-full"
              border=""
              class="border-double border-l-4 pl-1 border-surface-300"
              padding="py-3 px-2"
            >
              {#if !$nowProgress}
                <Tab
                  on:change={() => {
                    // console.log(bkm);
                    //  checkedTags = [];
                    checkedIndexList = [];
                    deleteNoteIndexes = [];
                    isMulti = false;
                    if (
                      $bookmarkEvents &&
                      $bookmarkEvents[nowkind] &&
                      $bookmarkEvents[nowkind][tabSet] &&
                      $bookmarkEvents[nowkind][tabSet].tags
                    ) {
                      viewContents = $bookmarkEvents[nowkind][tabSet].tags;
                    }
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
                      if ($bookmarkEvents[nowkind][tabSet].content.length > 0) {
                        try {
                          const content = await nip04De(
                            pubkey,
                            $bookmarkEvents[nowkind][tabSet].content,
                          );
                          viewContents = JSON.parse(content);
                        } catch (error) {
                          viewContents = [
                            [$bookmarkEvents[nowkind][tabSet].content],
                          ];
                          const t = {
                            message: $_('nprofile.toast.failed_hukugou'),
                            timeout: 3000,
                            background:
                              'bg-orange-500 text-white width-filled ',
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
            <!-- {#if !$nowProgress}
              <button
                on:click={onClickTagButton}
                class="btn fill-surface-500 border-solid variant-ringed-surface drop-shadow"
                >{@html ArrowCircleRight}</button
              >
            {/if} -->
          </div>
        </div>
      {/if}
    </div>
  </div>
  {#if $bookmarkEvents[nowkind].length > 0 && pages.page === 0}
    <ListTitle
      sorce={$identifiersList[nowkind][tabSet]}
      created_at={$bookmarkEvents[nowkind][tabSet]?.created_at}
      {iconView}
      length={viewContents.length}
      {onClickUpdate}
      {onClickKyouyuu}
      kind={$bookmarkEvents[nowkind][tabSet]?.kind}
      {isPageOwner}
    />
  {/if}
  {#if loadEvent}
    <NostrApp relays={$searchRelays}>
      {#if paginatedSource}
        {#if Array.isArray(paginatedSource)}
          {#each paginatedSource as id, index}
            {#if id[0] !== 'd' && id[0] !== 'title' && id[0] !== 'image' && id[0] !== 'description'}<!--&& id[0] !== 'summary'-->
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
                            {#if text.kind === 31990}
                              <Ogp
                                ogp={{
                                  title: JSON.parse(text.content).name,
                                  image: JSON.parse(text.content).banner,
                                  description: JSON.parse(text.content).about,
                                  favicon: JSON.parse(text.content).picture,
                                }}
                                url={JSON.parse(text.content).website}
                              />
                            {:else}
                              <Content
                                text={text.content}
                                tag={text.tags}
                                id={text.id}
                                view={$allView}
                                {URLPreview}
                                {isPageOwner}
                                {iconView}
                              />
                            {/if}
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
                            {#if text.kind === 31990}
                              <Ogp
                                ogp={{
                                  title: JSON.parse(text.content).name,
                                  image: JSON.parse(text.content).banner,
                                  description: JSON.parse(text.content).about,
                                  favicon: JSON.parse(text.content).picture,
                                }}
                                url={JSON.parse(text.content).website}
                              />
                            {:else}
                              <Content
                                text={text.content}
                                tag={text.tags}
                                id={text.id}
                                view={$allView}
                                {URLPreview}
                                {isPageOwner}
                                {iconView}
                              />
                            {/if}
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
                            {#if text.kind === 31990}
                              <Ogp
                                ogp={{
                                  title: JSON.parse(text.content).name,
                                  image: JSON.parse(text.content).banner,
                                  description: JSON.parse(text.content).about,
                                  favicon: JSON.parse(text.content).picture,
                                }}
                                url={JSON.parse(text.content).website}
                              />
                            {:else}
                              <Content
                                text={text.content}
                                tag={text.tags}
                                id={text.id}
                                view={$allView}
                                {URLPreview}
                                {isPageOwner}
                                {iconView}
                              />
                            {/if}
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
                                    {/if}
                                  </u></button
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
                              {#if text.kind === 31990}
                                <Ogp
                                  ogp={{
                                    title: JSON.parse(text.content).name,
                                    image: JSON.parse(text.content).banner,
                                    description: JSON.parse(text.content).about,
                                    favicon: JSON.parse(text.content).picture,
                                  }}
                                  url={JSON.parse(text.content).website}
                                />
                              {:else}
                                <Content
                                  text={text.content}
                                  tag={text.tags}
                                  id={text.id}
                                  view={$allView}
                                  {URLPreview}
                                  {isPageOwner}
                                  {iconView}
                                />
                              {/if}
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
                      {#if id[0] === 'e' || id[0] === 'a'}
                        <Text queryKey={[hexId.id]} id={hexId.id} let:text>
                          <input
                            slot="error"
                            class="m-2 checkbox scale-125"
                            type="checkbox"
                            checked={checkedIndexList
                              .map((item) => item.index)
                              .includes(pages.page * pages.limit + index)}
                            on:change={() => {
                              onChangeCheckList(
                                pages.page * pages.limit + index,
                                { content: JSON.stringify(id) },
                              );
                            }}
                          />
                          <input
                            slot="loading"
                            class="m-2 checkbox scale-125"
                            type="checkbox"
                            checked={checkedIndexList
                              .map((item) => item.index)
                              .includes(pages.page * pages.limit + index)}
                            on:change={() => {
                              onChangeCheckList(
                                pages.page * pages.limit + index,
                                { content: JSON.stringify(id) },
                              );
                            }}
                          />
                          <input
                            class="m-2 checkbox scale-125"
                            type="checkbox"
                            checked={checkedIndexList
                              .map((item) => item.index)
                              .includes(pages.page * pages.limit + index)}
                            on:change={() => {
                              onChangeCheckList(
                                pages.page * pages.limit + index,
                                text,
                              );
                            }}
                          />
                        </Text>
                      {:else}
                        <input
                          class="m-2 checkbox scale-125"
                          type="checkbox"
                          checked={checkedIndexList
                            .map((item) => item.index)
                            .includes(pages.page * pages.limit + index)}
                          on:change={() => {
                            onChangeCheckList(
                              pages.page * pages.limit + index,
                              { content: JSON.stringify(id) },
                            );
                          }}
                        />
                      {/if}
                    {:else}
                      {#if id[0] === 'e' || id[0] === 'a'}
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
                      {#if isPageOwner}
                        <!---別のタグに移動-->
                        <button
                          class="btn p-0 mt-1 justify-self-end w-6 {isPageOwner
                            ? 'ml-1 '
                            : ''} variant-filled-primary"
                          on:click={() => {
                            if (!$nowProgress) {
                              onClickMove(
                                tabSet,
                                [pages.page * pages.limit + index],
                                bkm,
                              );
                            }
                          }}
                        >
                          <Move {isSmph} />
                        </button>

                        <!---削除-->
                        {#if id[0] === 'e' || id[0] === 'a'}
                          <Text queryKey={[hexId.id]} id={hexId.id} let:text>
                            <button
                              slot="loading"
                              class="btn p-0 mt-1 justify-self-end w-6 {isPageOwner
                                ? 'ml-1 '
                                : ''} rounded variant-filled-primary"
                              on:click={() => {
                                if (!$nowProgress) {
                                  onClickDelete(
                                    tabSet,
                                    pages.page * pages.limit + index,
                                    bkm,
                                    { content: JSON.stringify(id) },
                                  );
                                }
                              }}
                            >
                              <DeleteBtn {isSmph} />
                            </button>

                            <button
                              slot="error"
                              class="btn p-0 mt-1 justify-self-end w-6 {isPageOwner
                                ? 'ml-1 '
                                : ''} rounded variant-filled-primary"
                              on:click={() => {
                                if (!$nowProgress) {
                                  onClickDelete(
                                    tabSet,
                                    pages.page * pages.limit + index,
                                    bkm,
                                    { content: JSON.stringify(id) },
                                  );
                                }
                              }}
                            >
                              <DeleteBtn {isSmph} />
                            </button>

                            <button
                              class="btn p-0 mt-1 justify-self-end w-6 {isPageOwner
                                ? 'ml-1 '
                                : ''} rounded variant-filled-primary"
                              on:click={() => {
                                if (!$nowProgress) {
                                  onClickDelete(
                                    tabSet,
                                    pages.page * pages.limit + index,
                                    bkm,
                                    text,
                                  );
                                }
                              }}
                            >
                              <DeleteBtn {isSmph} />
                            </button>
                          </Text>
                        {:else}
                          <button
                            class="btn p-0 mt-1 justify-self-end w-6 {isPageOwner
                              ? 'ml-1 '
                              : ''} rounded variant-filled-primary"
                            on:click={() => {
                              if (!$nowProgress) {
                                onClickDelete(
                                  tabSet,
                                  pages.page * pages.limit + index,
                                  bkm,
                                  { content: JSON.stringify(id) },
                                );
                              }
                            }}
                          >
                            <DeleteBtn {isSmph} />
                          </button>
                        {/if}
                      {/if}
                    {/if}
                  </div>
                {/await}
              </div>
            {/if}
          {/each}
        {:else}
          {paginatedSource}
        {/if}
      {/if}
    </NostrApp>
  {:else if paginatedSource}
    <!--------------------------->
    {#if Array.isArray(paginatedSource)}
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
    {:else}
      {paginatedSource}
    {/if}
  {:else}
    <div />
  {/if}
</main>

<div class="fixed bottom-0 z-10 w-screen variant-filled-primary">
  <div class="mx-auto max-w-lg overflow-hidden justify-center flex">
    <div
      class="flex btn-group py-0.5 w-full variant-filled-primary justify-evenly rounded-none"
    >
      {#if !$nowProgress}
        <button on:click={onClickMenu}>{@html tagListIcon}</button>
        {#if isPageOwner}
          {#if !isMulti}
            <!-- のーとをついか -->
            <button class="mx-0" on:click={() => onClickAddNote(tabSet)}>
              {@html addNoteIcon}
            </button>
            <!-- たぶをへんしゅう -->
            {#if $bookmarkEvents[nowkind][tabSet] && $bookmarkEvents[nowkind][tabSet].tags.length > 0}
              <button class="mx-0" on:click={onClickEditTags}>
                {@html editTagIcon}
              </button>
            {/if}
          {:else}
            <!-- のーとたちをいどう -->
            <button class="mx-0" on:click={onClickMoveNotes}>
              <span class="rounded fill-primary-100 variant-filled-primary">
                {@html ArrowCircleRight}
              </span>
            </button>
            <!-- のーとたちをさくじょ -->
            <button class="mx-0" on:click={onClickDeleteNotes}>
              <span class="rounded fill-warning-300 variant-filled-primary">
                {@html Delete}
              </span>
            </button>
          {/if}
        {/if}
        <!-----共有------listtitleに移動------->
        <!-- {#if $bookmarkEvents[nowkind].length > 0 && nowkind !== Kinds.kind10003}10003:84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5:でデコードできない謎-----------------------------わかるまで消す-->
        <!-- <button class="mx-0" on:click={onClickKyouyuu}>
          <span class="fill-white">{@html Chat}</span>
      </button> -->

        <!-- りすとのこうしん------listtitleに移動-->
        <!-- <button class="mx-0" on:click={onClickUpdate}>
          {@html updateListIcon}
      </button> 
      {/if}-->
        <!-- ぱじねーたー -->
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
        <!-- せってい -->
        <button class="mx-0" use:popup={popupFeatured}>
          <span class="rounded variant-filled-primary fill-current">
            {@html SettingsIcon}
          </span>
        </button>
      {/if}
    </div>
  </div>
</div>
<!-- ------------------------------------footer-     -->

<div class="container max-w-6xl mx-auto z-10">
  {#if $nowProgress}
    <div class="fixed bottom-2 right-2">
      <ProgressRadial
        ...
        stroke={60}
        meter="stroke-primary-500"
        track="stroke-primary-500/30"
        width="w-24"
      />
    </div>
  {/if}
</div>

<style>
  .delete-note {
    background-color: rgba(107, 255, 181, 0.274);
  }
  .btn-group button {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }

  /* mdサイズ（768px以上）のスタイルを指定
  @media (min-width: 768px) {
    .btn-group button {
      /* 中サイズの場合にだけ適用されるスタイル 
      margin-left: 1.5rem;
      margin-right: 1.5rem;
    }
  } */
</style>
