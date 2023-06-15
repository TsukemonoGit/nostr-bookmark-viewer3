<script lang="ts" context="module">
  interface Window {
    // NIP-07
    nostr: any;
  }
  declare var window: Window;
</script>

<script lang="ts">
  import {
    ProgressRadial,
    toastStore,
    type ToastSettings,
    Toast,
    AppBar,
    TabGroup,
    Tab,
    SlideToggle,
    Modal,
    modalStore,
    type ModalComponent,
    type ModalSettings,
    type PopupSettings,
    popup,
  } from '@skeletonlabs/skeleton';
  import { afterUpdate, onMount } from 'svelte';
  import { page } from '$app/stores';

  import { nip19, type Event } from 'nostr-tools';
  import {
    validateNoteId,
    fetchFilteredEvents,
    publishEvent,
  } from '$lib/function';
  import {
    bookmarkEvents,
    noteEvents,
    profileEvents,
    tabSet,
    tags,
    pubkey,
    relays,
    nowProgress,
    bkm,
    privateBookmarks,
    privateTags,
    plainPrivateText,
    isMulti,
    checkedTags,
    RelaysforSearch,
  } from '../../lib/store.js';
  import ViewContent from './ViewContent.svelte';
  import ModalAddNote from './ModalAddNote.svelte';
  import ModalMove from './ModalMove.svelte';
  import ModalEditTag from './ModalEditTag.svelte';

  let scrollobject: HTMLDivElement;
  let modal: ModalSettings;
  let toast: ToastSettings;
  //let bookmarkEvents: any[] = [];

  // //イベント内容検索用リレーたち
  // const RelaysforSearch = [
  //   'wss://relay.nostr.band',
  //   'wss://nostr.wine',
  //   'wss://relay.damus.io',
  //   'wss://yabu.me',
  //   'wss://relay.nostrich.land',
  //   //"wss://nostream.localtest.me",
  //   //"ws://localhost:7000",
  // ];

  const modalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalAddNote,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: '<p>Skeleton</p>',
  };
  const moveModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalMove,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: '<p>Skeleton</p>',
  };

  const editTagModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalEditTag,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: '<p>Skeleton</p>',
  };

  modalStore.set([]);
  $: $tags = $bookmarkEvents.map((event) => event.tags[0][1]);
  $: $checkedTags = $checkedTags;
  $: $bookmarkEvents = $bookmarkEvents;
  $: $noteEvents = $noteEvents;
  $: $profileEvents = $profileEvents;

  // コンポーネントが最初に DOM にレンダリングされた後に実行されます(?)
  onMount(async () => {
    $nowProgress = true;
    //nprofileを展開する
    try {
      const { type, data } = nip19.decode($page.params.nprofile);
      if (type === 'nprofile' && data.relays) {
        $pubkey = data.pubkey;
        $relays = data.relays;
        $tabSet = 0;
        $bkm = 'pub';
        //イベントを取りに行く。
        const bFilter = [{ kinds: [30001], authors: [$pubkey] }];
        $bookmarkEvents = await fetchFilteredEvents($relays, bFilter);
        console.log($bookmarkEvents);

        // プライベートブクマチェック
        $privateBookmarks = $bookmarkEvents.map((event) => event.content);
        console.log($privateBookmarks);

        await hukugouPrivate();

        // noteIdfilter作る
        let filteredNoteIds = noteIdFilter($bookmarkEvents);
        console.log(filteredNoteIds);

        //-------------------------------------------
        // idFilterにプラベの分のIDも追加する
        const extractedIds = $privateTags
          .flatMap((item) => {
            if (item.tags.length > 0) {
              return item.tags.map((i) => i[1]);
            } else {
              return [];
            }
          })
          .filter((id) => id !== undefined);
        console.log(extractedIds);

        const mergedArray = [...filteredNoteIds, ...extractedIds];
        filteredNoteIds = Array.from(new Set(mergedArray));
        console.log(filteredNoteIds);
        //--------------------------------------------------------------------

        const nFilter = [{ kinds: [1], ids: filteredNoteIds }];
        //eventを取りに行く
        $noteEvents = await fetchFilteredEvents(RelaysforSearch, nFilter);
        console.log($noteEvents);

        //authorsfilter つくる
        let filteredAuthors = authorsFilter($noteEvents);
        console.log(filteredAuthors);

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

  function noteIdFilter(bookmarkEvents: Event[]): string[] {
    const idSet: Set<string> = new Set();

    bookmarkEvents.forEach((event) => {
      event.tags.forEach((tag) => {
        if (tag[0] === 'e') {
          idSet.add(tag[1]);
        }
      });
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

  //タグの切り替えを検知（複数選択のときしかいらないたぶん）
  function onClickTab(index: number): void {
    $checkedTags = [];
    $tabSet = index;
    console.log($tabSet);
    $bkm = 'pub';

    //タグ変わったらスクロールトップに
    scrollobject.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }

  afterUpdate(() => {
    // リセット後に再描画をトリガーする
    $checkedTags = $checkedTags;
    $bookmarkEvents = $bookmarkEvents;
    $noteEvents = $noteEvents;
    $profileEvents = $profileEvents;
  });

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

  function onClickAddNote() {
    modal = {
      type: 'component',
      backdropClasses:
        '!bg-surface-400 dark:!bg-surface-700  !bg-opacity-20 dark:!bg-opacity-20',
      // Pass the component directly:
      component: modalComponent,
      // Provide arbitrary metadata to your modal instance:
      title: `Add Note to ${$tags[$tabSet]}`,
      body: 'Enter an ID starting with "note" , "nevent" or "nostr:".\n他のツールで操作を行った場合はリストを更新↻してから書き込み操作してください',
      //value: { noteId: nip19.noteEncode(tag[1]) },
      // Returns the updated response value
      response: (res) => {
        let check;
        if (res) {
          switch (res.btn) {
            case 'pub':
              check = checkInput(res.value);
              if (!check.error) addNote(check.value);
              break;
            case 'prv':
              check = checkInput(res.value);
              if (!check.error) addPrivateNote(check.value);
              break;
          }
        }
      },
    };
    modalStore.trigger(modal);
  }

  function checkInput(r: string | boolean): { value: string; error: boolean } {
    console.log('response:', r);
    if (r == null || r == false) {
      toast = {
        message: 'noteIdを確認してください',
        timeout: 5000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);

      return { value: '', error: true };
    }
    //rが適切なNoteIDなのかどうかのチェック
    //適切であればHexのNoteIdを返してほしい
    const noteId = validateNoteId(r as string);
    console.log(noteId);
    if (noteId.error) {
      toast = {
        message: '無効なnoteIdかもです',
        timeout: 5000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(toast);
    }
    return noteId;
  }

  async function addNote(noteHex: string | boolean) {
    {
      //表示中のぶくまのたぐずにこのIDを追加してイベント投げる
      const thisTag = ['e', noteHex];
      const addTags = [...$bookmarkEvents[$tabSet].tags, ...[thisTag]];
      console.log(addTags);

      // 送信用のイベントを作成する
      const moveEvent = {
        content: $bookmarkEvents[$tabSet].content,
        kind: $bookmarkEvents[$tabSet].kind,
        pubkey: $bookmarkEvents[$tabSet].pubkey,
        created_at: Math.floor(Date.now() / 1000),
        tags: addTags,
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
        $bookmarkEvents[$tabSet] = res.event;

        const exists = $noteEvents.some((event) => event.id === noteHex);
        console.log(exists);
        if (!exists) {
          //ノートの内容が取得されていなかったら取りに行く
          const nFilter = [{ kinds: [1], ids: [noteHex as string] }];

          //eventを取りに行く
          const thisNote = await fetchFilteredEvents(RelaysforSearch, nFilter);
          console.log(thisNote);
          if (thisNote.length > 0) {
            $noteEvents.push(thisNote[0]);

            //もしノートが取れたらパブキーも確認する
            const exists = $profileEvents.some(
              (event) => event.pubkey === thisNote[0].pubkey,
            );
            if (!exists) {
              //なかったらプロファイル取りに行く
              const pFilter = [{ kinds: [0], authors: [thisNote[0].pubkey] }];
              //eventを取りに行く
              const thisProfile = await fetchFilteredEvents(
                RelaysforSearch,
                pFilter,
              );
              console.log(thisNote);
              if (thisProfile.length > 0) {
                $profileEvents.push(thisProfile[0]);
                // ローカルストレージに保存
                localStorage.setItem(
                  'profiles',
                  JSON.stringify($profileEvents),
                );
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }
    $noteEvents = $noteEvents;
    $profileEvents = $profileEvents;
  }

  async function addPrivateNote(noteHex: string) {
    //表示中のぶくまのこんてんとのふくごうかしたはいれつに
    //この配列を追加して復号化してコンテントに詰める

    const thisTag = ['e', noteHex];
    //  プライベートブクマの複合が終わってなかったらまず複合する作業
    if ($plainPrivateText[$tabSet] === false) {
      await hukugouPrivate();
    }
    //それでも許可してもらえなかったら...
    if ($plainPrivateText[$tabSet] === false) {
      return;
    }

    console.log(thisTag);
    console.log($plainPrivateText[$tabSet]);
    $privateTags[$tabSet].tags = $privateTags[$tabSet].tags.filter(
      (tag) => tag.length > 0,
    );
    console.log($privateTags[$tabSet].tags.length);
    let tmpTags = $privateTags[$tabSet].tags;
    if (tmpTags.length > 0) {
      tmpTags.push(thisTag);
    } else {
      tmpTags = [thisTag];
    }
    console.log(tmpTags);

    const thisContent = JSON.stringify(tmpTags);
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
      $privateTags[$tabSet].tags = tmpTags;
      $bookmarkEvents[$tabSet] = res.event;
      $privateBookmarks[$tabSet] = res.event.content;
      $plainPrivateText[$tabSet] = thisContent;

      const exists = $noteEvents.some((event) => event.id === noteHex);
      console.log(exists);
      if (!exists) {
        //ノートの内容が取得されていなかったら取りに行く
        const nFilter = [{ kinds: [1], ids: [noteHex as string] }];

        //eventを取りに行く
        const thisNote = await fetchFilteredEvents(RelaysforSearch, nFilter);
        console.log(thisNote);
        if (thisNote.length > 0) {
          $noteEvents.push(thisNote[0]);

          //もしノートが取れたらパブキーも確認する
          const exists = $profileEvents.some(
            (event) => event.pubkey === thisNote[0].pubkey,
          );
          if (!exists) {
            //なかったらプロファイル取りに行く
            const pFilter = [{ kinds: [0], authors: [thisNote[0].pubkey] }];
            //eventを取りに行く
            const thisProfile = await fetchFilteredEvents(
              RelaysforSearch,
              pFilter,
            );
            console.log(thisNote);
            if (thisProfile.length > 0) {
              $profileEvents.push(thisProfile[0]);

              // ローカルストレージに保存
              localStorage.setItem('profiles', JSON.stringify($profileEvents));
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    $noteEvents = $noteEvents;
    $profileEvents = $profileEvents;
  }

  async function hukugouPrivate() {
    await Promise.all(
      $bookmarkEvents.map(async (_, i) => {
        if ($privateTags[i] === undefined) $privateTags[i] = { tags: [] };
        const content = $privateBookmarks[i];
        if (content.length > 0 && typeof $plainPrivateText[i] !== 'string') {
          try {
            $plainPrivateText[i] = await window.nostr.nip04.decrypt(
              $pubkey,
              content,
            );
            $privateTags[i].tags = JSON.parse($plainPrivateText[i] as string);
            console.log($plainPrivateText[i]);
          } catch {
            console.log('暗号化/復元ができません');
            const t = {
              message:
                'プライベートブックマークの暗号化/復元ができませんでした',
              timeout: 5000,
              background: 'variant-filled-error',
            };
            toastStore.trigger(t);
            //ここはぷらべに何かがあるのに複合失敗したところ。
            $plainPrivateText[i] = false;
          }
        } else if (
          content.length === 0 &&
          typeof $plainPrivateText[i] !== 'string'
        ) {
          //ここはプラベコンテントがカラ
          $plainPrivateText[i] = '';
        }
      }),
    );

    console.log($plainPrivateText);
    console.log($privateTags);
  }

  function onClickMoveNotes() {
    console.log('onclickmoveNotes');
    if ($checkedTags && $checkedTags.length <= 0) {
      const t = {
        message: '何も選択されていないかも',
        timeout: 5000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(t);
      return;
    } else {
      modal = {
        type: 'component',
        backdropClasses:
          '!bg-surface-400 dark:!bg-surface-700  !bg-opacity-20 dark:!bg-opacity-20',
        // Pass the component directly:
        component: moveModalComponent,
        // Provide arbitrary metadata to your modal instance:
        title: `Move notes`,
        body: `Move from ${$tags[$tabSet]} to`,
        //value: { noteId: nip19.noteEncode(tag[1]) },
        // Returns the updated response value
        response: (res) => {
          console.log(res);
          if (res) {
            switch (res.bkmk) {
              case 'pub':
                moveToPubNotes(res.tag);
                break;
              case 'pvt':
                moveToPrvNotes(res.tag);
                break;
            }
          }
        },
      };
      modalStore.trigger(modal);
    }
  }

  function onClickDeleteNotes() {
    console.log('onclickdeletenotes');
    if ($checkedTags && $checkedTags.length <= 0) {
      const t = {
        message: '何も選択されていないかも',
        timeout: 5000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(t);
      return;
    } else {
      let thisTags;
      if ($bkm === 'pub') {
        thisTags = $checkedTags.map(
          (index) => $bookmarkEvents[$tabSet].tags[index][1],
        );
      } else {
        thisTags = $checkedTags.map(
          (index) => $privateTags[$tabSet].tags[index][1],
        );
      }
      console.log(thisTags);

      const viewTags = thisTags.map(
        (tag) => `${nip19.noteEncode(tag).slice(0, 25)}...`,
      );
      const joinedString = viewTags.join('<br>');

      const t: ToastSettings = {
        message: `【Delete notes】<br>${joinedString}`,
        action: {
          label: 'Delete',
          response: deleteNotes,
        },
        autohide: false,
      };
      toastStore.trigger(t);
    }
  }

  async function deleteNotes() {
    //消すのは今表示してるとこからだから$bkmのまま使える
    if ($bkm === 'pub') {
      // 今のタグから削除するタグを除いた新しいtagsを作る
      const thisTags = $bookmarkEvents[$tabSet].tags.filter(
        (_, index) => !$checkedTags.includes(index),
      );
      console.log(thisTags);
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
      console.log(`${$bkm}プライベートタグの複数削除`);
      // 今のタグから削除するタグを除いた新しいtagsを作る
      console.log($privateTags[$tabSet].tags);
      const thisTags = $privateTags[$tabSet].tags.filter(
        (_, index) => !$checkedTags.includes(index),
      );

      console.log(thisTags);
      const thisContent = JSON.stringify(thisTags);
      console.log(thisContent);
      const angouka = await window.nostr.nip04.encrypt($pubkey, thisContent);
      console.log(angouka);

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
        $privateTags[$tabSet].tags = thisTags;
        $bookmarkEvents[$tabSet] = res.event;
        $privateBookmarks[$tabSet] = res.event.content;
        $plainPrivateText[$tabSet] = thisContent;
      } catch (error) {
        console.log(error);
      }
    }
    $isMulti = false;
  }

  async function moveToPubNotes(toTag: string) {
    console.log(`${$tags[$tabSet]}からPublic ${toTag}へ${$checkedTags}`);
    //まず移動先に$checkedTagsを追加する
    //今のタグから移動するイベントタグリストを作る
    const thisTags = $checkedTags.map((index) => {
      if ($bkm === 'pub') {
        return $bookmarkEvents[$tabSet].tags[index];
      } else {
        return $privateTags[$tabSet].tags[index];
      }
    });

    console.log(thisTags);
    const tagIndex = $tags.indexOf(toTag);
    //移動先のタグの末尾に追加したそう不要タグずを作る（成功するまで上書きしない）
    const eventTags = [...$bookmarkEvents[tagIndex].tags, ...thisTags];
    console.log(eventTags);

    //eventつくる
    // 送信用のイベントを作成する
    const moveEvent = {
      content: $bookmarkEvents[tagIndex].content,
      kind: $bookmarkEvents[tagIndex].kind,
      pubkey: $bookmarkEvents[tagIndex].pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: eventTags,
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
      $bookmarkEvents[tagIndex].tags = res.event.tags;
      $bookmarkEvents[tagIndex] = res.event;

      //移動先に追加が成功したら、今のタグから移し多分削除する
      await deleteNotes();
    } catch (error) {
      console.log(error);
    }
    $isMulti = false;
  }
  async function moveToPrvNotes(toTag: string) {
    console.log(`${$tags[$tabSet]}からPrivate ${toTag}へ${$checkedTags}`);
    //プライベートブクマに移動させる。

    //まず移動先に$checkedTagsを追加する
    //今のタグから移動するイベントタグリストを作る
    const thisTags = $checkedTags.map((index) => {
      if ($bkm === 'pub') {
        return $bookmarkEvents[$tabSet].tags[index];
      } else {
        return $privateTags[$tabSet].tags[index];
      }
    });

    console.log(thisTags);
    const tagIndex = $tags.indexOf(toTag);
    //移動先のタグの末尾に追加したそう不要タグずを作る（
    const eventTags = [...$privateTags[tagIndex].tags, ...thisTags];
    console.log(eventTags);
    //Jsonにして暗号化する。
    const thisContent = JSON.stringify(eventTags);
    const angouka = await window.nostr.nip04.encrypt($pubkey, thisContent);

    // 送信用のイベントを作成する
    const moveEvent = {
      content: angouka,
      kind: $bookmarkEvents[tagIndex].kind,
      pubkey: $bookmarkEvents[tagIndex].pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: $bookmarkEvents[tagIndex].tags,
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
      $privateTags[tagIndex].tags = eventTags;
      $bookmarkEvents[tagIndex] = res.event;
      $privateBookmarks[tagIndex] = res.event.content;
      $plainPrivateText[tagIndex] = thisContent;

      //移動先に追加が成功したら、今のタグから移し多分削除する
      await deleteNotes();
    } catch (Error) {
      console.log(Error);
    }
    $isMulti = false;
  }

  function onClickEditTags() {
    modal = {
      type: 'component',
      backdropClasses:
        '!bg-surface-400 dark:!bg-surface-700  !bg-opacity-20 dark:!bg-opacity-20',
      // Pass the component directly:
      component: editTagModalComponent,
      // Provide arbitrary metadata to your modal instance:
      title: `Edit tag`,
      body: 'New Tag Name',
      value: { selectedValue: $tags[0] },
      // Returns the updated response value
      response: (res) => {
        if (res) {
          switch (res.btn) {
            case 'add':
              addTag(res.value);

              break;
            case 'delete':
              deleteTag(res.tag);
              break;
          }
        }
      },
    };
    modalStore.trigger(modal);
  }
  async function addTag(tag: string) {
    console.log(`${tag}がすでにあるかチェック`);
    if ($tags.includes(tag)) {
      const t = {
        message: '同じ名前のタグがすでにあるかも',
        timeout: 5000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(t);
      return;
    }
    //たぐついかしてくイベント
    const thisEvent = {
      content: '',
      kind: 30001,
      pubkey: $pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: [['d', tag]],
    };
    try {
      // publishEvent関数を非同期に呼び出し、結果を待つ
      const res = await publishEvent(thisEvent, $relays);

      if (!res.isSuccess) {
        const t = {
          message: '失敗したかも',
          timeout: 5000,
          background: 'variant-filled-error',
        };
        toastStore.trigger(t);
        return;
      }
      // 成功したら$bookmarkEventsを更新する
      $bookmarkEvents.push(res.event); //= [...$bookmarkEvents, res.event];
      $tags.push(res.event.tags[0][1]); //= [...$tags, res.event.tags[0][1]];
      $tags = $tags;
      $privateBookmarks.push('');
      $plainPrivateText.push('');
      $privateTags.push({ tags: [] });
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTag(tag: string) {
    console.log(tag);

    const t: ToastSettings = {
      message: `Delete tag:${tag}`,
      action: {
        label: 'Delete',
        response: () => deleteTagEvent(tag),
      },
      autohide: false,
    };
    toastStore.trigger(t);
  }

  async function deleteTagEvent(tag: string) {
    console.log('delete');
    //タグの中身消してイベント上書きしてから削除イベント送る？

    //https://github.com/nostr-protocol/nips/blob/master/09.md
    const thisEvent = {
      content: '',
      kind: 5,
      pubkey: $pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: [['e', $bookmarkEvents[$tags.indexOf(tag)].id]],
    };
    console.log(thisEvent);
    try {
      // publishEvent関数を非同期に呼び出し、結果を待つ
      const res = await publishEvent(thisEvent, $relays);

      if (!res.isSuccess) {
        const t = {
          message: '失敗したかも',
          timeout: 5000,
          background: 'variant-filled-error',
        };
        toastStore.trigger(t);
        return;
      }
      if ($tabSet === $tags.indexOf(tag)) {
        $tabSet = 0;
      }
      // 成功したら$bookmarkEventsを更新する
      $bookmarkEvents.splice($tags.indexOf(tag), 1); //= [...$bookmarkEvents, res.event];
      $privateBookmarks.splice($tags.indexOf(tag), 1);
      $plainPrivateText.splice($tags.indexOf(tag), 1);
      $privateTags.splice($tags.indexOf(tag), 1);
      $tags.splice($tags.indexOf(tag), 1); //= [...$tags, res.event.tags[0][1]];
      $tags = $tags;
    } catch (error) {
      console.log(error);
    }
  }

  const popupFeatured: PopupSettings = {
    // Represents the type of event that opens/closed the popup
    event: 'click',
    // Matches the data-popup value on your popup element
    target: 'popupFeatured',
    // Defines which side of your trigger the popup will appear
    placement: 'bottom',
  };

  //-----こうしん-------
  async function onClickReload() {
    $nowProgress = true;
    console.log('click');
    // イベントを取りに行く。
    const bFilter = [{ kinds: [30001], authors: [$pubkey] }];
    $bookmarkEvents = await fetchFilteredEvents($relays, bFilter);
    console.log($bookmarkEvents);

    // 持っていないノートリスト
    // ID変わってなくても取得できていないデータを取りに行く
    let noteIDList: string[] = [];
    $bookmarkEvents.map((item) =>
      item.tags.map((tag, index) => {
        if (index !== 0) {
          if (tag[0] === 'e') {
            //インデックス0はタグなので
            const note = $noteEvents.find((note) => note.id === tag[1]);
            if (!note) {
              noteIDList.push(tag[1]);
            }
          }
        }
      }),
    );

    // プライベートブクマチェック
    $privateBookmarks = $bookmarkEvents.map((event) => event.content);
    console.log($privateBookmarks);

    await hukugouPrivate();

    // idFilterにプラベの分のIDも追加する
    $privateTags.flatMap((item) => {
      if (item.tags.length > 0) {
        item.tags.map((tag) => {
          //インデックス0はタグなので
          const note = $noteEvents.find((note) => note.id === tag[1]);
          if (!note) {
            noteIDList.push(tag[1]);
          }
        });
      }
    });

    //--------------------------------------------------------------------

    const nFilter = [{ kinds: [1], ids: noteIDList }];
    //eventを取りに行く
    const notes = await fetchFilteredEvents(RelaysforSearch, nFilter);
    console.log(notes);
    $noteEvents = [...$noteEvents, ...notes];
    //console.log($noteEvents);

    //console.log(noteIDList);
    //のーととる
    $bookmarkEvents = $bookmarkEvents;
    $noteEvents = $noteEvents;
    $tabSet = 0;
    $nowProgress = false;
  }
  const popupHover: PopupSettings = {
    event: 'hover',
    target: 'popupHover',
    placement: 'top',
  };
</script>

<div class="card p-4 w-72 shadow-xl z-20 break-all" data-popup="popupFeatured">
  <div>
    <p>【pubkey】</p>
    <p>{nip19.npubEncode($pubkey)}</p>

    <p class="mt-2">【relays】</p>

    <ul class="list-disc">
      {#each $relays as relay}
        <li class="ml-4">{relay}</li>
      {/each}
    </ul>
  </div>
  <div class="arrow bg-surface-100-800-token" />
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

      <div class="tabGroup" on:wheel={wheelScroll}>
        <TabGroup
          padding="py-3 px-4"
          justify="justify"
          active="variant-filled-secondary"
          hover="hover:variant-soft-secondary"
          class="tabGroupContainer"
          border="border-b border-surface-400-500-token"
          rounded="rounded-tl-container-token rounded-tr-container-token"
        >
          {#if $tags.length > 0}
            {#each $tags as tag, idx}
              <Tab
                on:change={() => {
                  $isMulti = false;
                  onClickTab(idx);
                }}
                bind:group={$tabSet}
                name={tag}
                value={idx}
              >
                {tag}
              </Tab>
            {/each}
          {/if}
        </TabGroup>
      </div>

      <svelte:fragment slot="trail">
        <div class=" px-2 text-center justify-center">
          <div>mode</div>
          <div class="sliderContainer">
            <SlideToggle
              name="slider-small"
              bind:checked={$isMulti}
              on:change={() => {
                console.log($isMulti);
                $checkedTags = [];
              }}
              size="sm"
            />
          </div>
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
          console.log($bkm);
          $checkedTags = [];
        }}
        bind:group={$bkm}
        name="pub"
        value="pub"
      >
        public
      </Tab>

      <Tab
        on:change={async () => {
          if ($plainPrivateText[$tabSet] === false) {
            await hukugouPrivate();
          }
          console.log($bkm);
          $checkedTags = [];
        }}
        bind:group={$bkm}
        name="pvt"
        value="pvt"
      >
        private
      </Tab>
    </TabGroup>
  </div>
</div>

<div class="overflow-auto h-full" bind:this={scrollobject}>
  <div class=" max-w-screen-lg mx-auto px-1 mt-24 mb-16">
    <ViewContent />
  </div>
</div>

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
    {#if !$isMulti}
      <button
        type="button"
        class="btn variant-filled-surface font-bold mx-1"
        on:click={onClickAddNote}
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

    <!--こうしん-->
    <button
      type="button"
      class="btn-icon variant-filled-surface mx-1"
      on:click={onClickReload}
      use:popup={popupHover}>↻</button
    >
  </div>
{/if}
<Modal />
<div class="card p-2 variant-filled-secondary" data-popup="popupHover">
  <p>リストを更新</p>
  <div class="arrow variant-filled-secondary" />
</div>

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

  .sliderContainer {
    margin: -0.2em 0;
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
