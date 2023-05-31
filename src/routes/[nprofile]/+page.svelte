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
        FileButton,
        Modal,
        modalStore,
        type ModalComponent,
        type ModalSettings,
        filter,
        LightSwitch,
    } from "@skeletonlabs/skeleton";
    import { afterUpdate, onMount } from "svelte";
    import { page } from "$app/stores";

    import { nip19, type Event, nip04 } from "nostr-tools";
    import { checkNoteId, getEvent, pushEvent } from "$lib/function";
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
    } from "../../lib/store.js";
    import ViewContent from "./ViewContent.svelte";
    import ModalAddNote from "./ModalAddNote.svelte";
    import ModalMove from "./ModalMove.svelte";

    let modal: ModalSettings;
    let toast: ToastSettings;
    //let bookmarkEvents: any[] = [];

    //イベント内容検索用リレーたち
    const RelaysforSeach = [
        //"wss://relay.nostr.band",
        //"wss://nostr.wine",
        //"wss://relay.damus.io",
        //"wss://yabu.me",
        "wss://nostream.localtest.me",
        "ws://localhost:7000",
    ];

    const modalComponent: ModalComponent = {
        // Pass a reference to your custom component
        ref: ModalAddNote,
        // Add the component properties as key/value pairs
        props: { background: "bg-red-500" },
        // Provide a template literal for the default component slot
        slot: "<p>Skeleton</p>",
    };
    const moveModalComponent: ModalComponent = {
        // Pass a reference to your custom component
        ref: ModalMove,
        // Add the component properties as key/value pairs
        props: { background: "bg-red-500" },
        // Provide a template literal for the default component slot
        slot: "<p>Skeleton</p>",
    };

    modalStore.set([]);
    $: $tags = $bookmarkEvents.map((event) => event.tags[0][1]);

    // コンポーネントが最初に DOM にレンダリングされた後に実行されます(?)
    onMount(async () => {
        $nowProgress = true;
        //nprofileを展開する
        try {
            const { type, data } = nip19.decode($page.params.nprofile);
            if (type === "nprofile" && data.relays) {
                $pubkey = data.pubkey;
                $relays = data.relays;
                $tabSet = 0;
                $bkm = "pub";
                //イペントを取りに行く。
                const bFilter = [{ kinds: [30001], authors: [$pubkey] }];
                $bookmarkEvents = await getEvent($relays, bFilter);
                console.log(bookmarkEvents);

                // プライベートブクマチェック
                $privateBookmarks = $bookmarkEvents.map(
                    (event) => event.content
                );
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
                $noteEvents = await getEvent(RelaysforSeach, nFilter);
                console.log($noteEvents);

                //authorsfilter つくる
                let filteredAuthors = authorsFilter($noteEvents);
                console.log(filteredAuthors);

                // ローカルストレージをチェックする
                const localProfile = localStorage.getItem("profiles");
                let localProfiles: Event[] = [];
                if (localProfile) {
                    // localProfileに存在する分削除する
                    localProfiles = JSON.parse(localProfile);

                    // filteredAuthorsからlocalProfilesに存在する作者を削除する
                    const updatedAuthors = filteredAuthors.filter((author) => {
                        return !localProfiles.some(
                            (profile) => profile.pubkey === author
                        );
                    });

                    console.log(updatedAuthors);
                    // 削除された作者が含まれないことを確認するためにコンソール出力

                    filteredAuthors = updatedAuthors;
                }

                const pFilter = [{ kinds: [0], authors: filteredAuthors }];

                //eventを取りに行く
                $profileEvents = await getEvent(RelaysforSeach, pFilter);
                console.log($profileEvents);

                // 合体した配列を作成
                $profileEvents = [...localProfiles, ...$profileEvents];
                console.log(profileEvents);
                // ローカルストレージに合体した配列を保存
                localStorage.setItem(
                    "profiles",
                    JSON.stringify($profileEvents)
                );
            } else {
                throw new Error("Failed to expand nprofile");
            }
        } catch (error: any) {
            console.log(error);

            toast = {
                message: error.message,
                timeout: 5000,
                background: "variant-filled-error",
            };
            toastStore.trigger(toast);

            $nowProgress = false;
            return;
        }
        $nowProgress = false;
    });

    function noteIdFilter(bookmarkEvents: Event[]) {
        const idSet: Set<string> = new Set();

        bookmarkEvents.forEach((event) => {
            event.tags.forEach((tag) => {
                if (tag[0] === "e") {
                    idSet.add(tag[1]);
                }
            });
        });

        return Array.from(idSet);
    }

    //重複なしのpubkeyリストを作る
    function authorsFilter(noteEvents: Event[]) {
        const authors: Set<string> = new Set();
        noteEvents.forEach((event) => {
            authors.add(event.pubkey);
        });
        return Array.from(authors);
    }

    //タグの切り替えを検知（複数選択のときしかいらないたぶん）
    function onClickTab(index: number) {
        $checkedTags = [];
        $tabSet = index;
        console.log($tabSet);
        $bkm = "pub";
    }
    afterUpdate(() => {
        // リセット後に再描画をトリガーする
        $checkedTags = $checkedTags;
    });
    function wheelScroll(event: { preventDefault: () => void; deltaY: any }) {
        //console.log(event);
        const elements = document.querySelector(".tab-list");
        event.preventDefault();
        if (elements) {
            elements //.scrollLeft += event.deltaY;
                .scrollBy({
                    top: 0,
                    left: event.deltaY, // 横にスクロールする量
                    behavior: "smooth", // スクロールアニメーションを有効にする場合
                });
        }
    }

    function onClickAddNote() {
        modal = {
            type: "component",
            backdropClasses:
                "!bg-surface-400 dark:!bg-surface-700  !bg-opacity-40 dark:!bg-opacity-40",
            // Pass the component directly:
            component: modalComponent,
            // Provide arbitrary metadata to your modal instance:
            title: `Add Note to ${$tags[$tabSet]}`,
            body: 'Enter an ID starting with "note" or "nevent".\n他のツールで操作を行った場合はリロードしてから書き込み操作してください…',
            //value: { noteId: nip19.noteEncode(tag[1]) },
            // Returns the updated response value
            response: (res) => {
                let check;
                if (res) {
                    switch (res.btn) {
                        case "pub":
                            check = checkInput(res.value);
                            if (!check.error) addNote(check.value);
                            break;
                        case "prv":
                            check = checkInput(res.value);
                            if (!check.error) addPrivateNote(check.value);
                            break;
                    }
                }
            },
        };
        modalStore.trigger(modal);
    }

    function checkInput(r: string | boolean) {
        console.log("response:", r);
        if (r == null || r == false) {
            toast = {
                message: "noteIdを確認してください",
                timeout: 5000,
                background: "variant-filled-error",
            };
            toastStore.trigger(toast);

            return { value: "", error: true };
        }
        //rが適切なNoteIDなのかどうかのチェック
        //適切であればHexのNoteIdを返してほしい
        const noteId = checkNoteId(r as string);
        console.log(noteId);
        if (noteId.error) {
            toast = {
                message: "無効なnoteIdかもです",
                timeout: 5000,
                background: "variant-filled-error",
            };
            toastStore.trigger(toast);
        }
        return noteId;
    }

    async function addNote(noteHex: string | boolean) {
        {
            //表示中のぶくまのたぐずにこのIDを追加してイベント投げる
            const thisTag = ["e", noteHex];
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
                // pushEvent関数を非同期に呼び出し、結果を待つ
                const res = await pushEvent(moveEvent, $relays);

                const t = {
                    message: res.msg.join("\n"),
                    timeout: 5000,
                };
                toastStore.trigger(t);
                // 成功したら$bookmarkEventsを更新する
                if (!res.isSuccess) {
                    const t = {
                        message: "失敗したかも",
                        timeout: 5000,
                        background: "variant-filled-error",
                    };
                    toastStore.trigger(t);
                    return;
                }
                //移動先にプッシュが成功したらーーーーーーーーーーーーーーー
                $bookmarkEvents[$tabSet] = res.event;

                const exists = $noteEvents.some(
                    (event) => event.id === noteHex
                );
                if (!exists) {
                    //ノートの内容が取得されていなかったら取りに行く
                    const nFilter = [{ kinds: [1], ids: [noteHex as string] }];

                    //eventを取りに行く
                    const thisNote = await getEvent(RelaysforSeach, nFilter);
                    console.log(thisNote);
                    if (thisNote.length > 0) {
                        $noteEvents.push(thisNote[0]);

                        //もしノートが取れたらパブキーも確認する
                        const exists = $profileEvents.some(
                            (event) => event.pubkey === thisNote[0].pubkey
                        );
                        if (!exists) {
                            //なかったらプロファイル取りに行く
                            const pFilter = [
                                { kinds: [0], authors: [thisNote[0].pubkey] },
                            ];
                            //eventを取りに行く
                            const thisProfile = await getEvent(
                                RelaysforSeach,
                                nFilter
                            );
                            console.log(thisNote);
                            if (thisProfile.length > 0) {
                                $profileEvents.push(thisProfile[0]);
                                // ローカルストレージに保存
                                localStorage.setItem(
                                    "profiles",
                                    JSON.stringify($profileEvents)
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
    }

    async function addPrivateNote(noteHex: string) {
        //表示中のぶくまのこんてんとのふくごうかしたはいれつに
        //この配列を追加して復号化してコンテントに詰める

        const thisTag = ["e", noteHex];
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
            (tag) => tag.length > 0
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
            // pushEvent関数を非同期に呼び出し、結果を待つ
            const res = await pushEvent(moveEvent, $relays);

            const t = {
                message: res.msg.join("\n"),
                timeout: 5000,
            };
            toastStore.trigger(t);
            // 成功したら$bookmarkEventsを更新する
            if (!res.isSuccess) {
                const t = {
                    message: "失敗したかも",
                    timeout: 5000,
                    background: "variant-filled-error",
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
            if (!exists) {
                //ノートの内容が取得されていなかったら取りに行く
                const nFilter = [{ kinds: [1], ids: [noteHex as string] }];

                //eventを取りに行く
                const thisNote = await getEvent(RelaysforSeach, nFilter);
                console.log(thisNote);
                if (thisNote.length > 0) {
                    $noteEvents.push(thisNote[0]);

                    //もしノートが取れたらパブキーも確認する
                    const exists = $profileEvents.some(
                        (event) => event.pubkey === thisNote[0].pubkey
                    );
                    if (!exists) {
                        //なかったらプロファイル取りに行く
                        const pFilter = [
                            { kinds: [0], authors: [thisNote[0].pubkey] },
                        ];
                        //eventを取りに行く
                        const thisProfile = await getEvent(
                            RelaysforSeach,
                            nFilter
                        );
                        console.log(thisNote);
                        if (thisProfile.length > 0) {
                            $profileEvents.push(thisProfile[0]);
                            // ローカルストレージに保存
                            localStorage.setItem(
                                "profiles",
                                JSON.stringify($profileEvents)
                            );
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
        $noteEvents = $noteEvents;
    }

    async function hukugouPrivate() {
        for (let i = 0; i < $bookmarkEvents.length; i++) {
            if ($privateTags[i] === undefined) $privateTags[i] = { tags: [] };
            const content = $privateBookmarks[i];
            if (
                content.length > 0 &&
                typeof $plainPrivateText[i] !== "string"
            ) {
                try {
                    $plainPrivateText[i] = await window.nostr.nip04.decrypt(
                        $pubkey,
                        content
                    );

                    $privateTags[i].tags = JSON.parse(
                        $plainPrivateText[i] as string
                    );
                    console.log($plainPrivateText[i]);
                } catch {
                    console.log("暗号化/復元ができません");
                    const t = {
                        message:
                            "プライベートブックマークの暗号化/復元ができませんでした",
                        timeout: 5000,
                        background: "variant-filled-error",
                    };
                    toastStore.trigger(t);
                    //ここはぷらべに何かがあるのに複合失敗したところ。
                    $plainPrivateText[i] = false;
                }
            } else if (
                content.length === 0 &&
                typeof $plainPrivateText[i] !== "string"
            ) {
                //ここはプラベコンテントがカラ
                $plainPrivateText[i] = "";
            }
        }

        console.log($plainPrivateText);
        // $privateTags = $plainPrivateText.map((item) => {
        //     if (typeof item === "string" && item.length > 0) {
        //         const items = JSON.parse(item);
        //         return { tags: items };
        //     } else {
        //         return { tags: [] };
        //     }
        // });

        console.log($privateTags);
    }

    function onClickMoveNotes() {
        console.log("onclickmoveNotes");
        if ($checkedTags && $checkedTags.length <= 0) {
            const t = {
                message: "何も選択されていないかも",
                timeout: 5000,
                background: "variant-filled-error",
            };
            toastStore.trigger(t);
            return;
        } else {
            modal = {
                type: "component",
                backdropClasses:
                    "!bg-surface-400 dark:!bg-surface-700  !bg-opacity-40 dark:!bg-opacity-40",
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
                            case "pub":
                                moveToPubNotes(res.tag);
                                break;
                            case "pvt":
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
        console.log("onclickdeletenotes");
        if ($checkedTags && $checkedTags.length <= 0) {
            const t = {
                message: "何も選択されていないかも",
                timeout: 5000,
                background: "variant-filled-error",
            };
            toastStore.trigger(t);
            return;
        } else {
            let thisTags;
            if ($bkm === "pub") {
                thisTags = $checkedTags.map(
                    (index) => $bookmarkEvents[$tabSet].tags[index][1]
                );
            } else {
                thisTags = $checkedTags.map(
                    (index) => $privateTags[$tabSet].tags[index][1]
                );
            }
            console.log(thisTags);

            const viewTags = thisTags.map(
                (tag) => `${nip19.noteEncode(tag).slice(0, 25)}...`
            );
            const joinedString = viewTags.join("<br>");

            const t: ToastSettings = {
                message: `【Delete notes】<br>${joinedString}`,
                action: {
                    label: "Delete",
                    response: deleteNotes,
                },
                autohide: false,
            };
            toastStore.trigger(t);
        }
    }

    async function deleteNotes() {
        //消すのは今表示してるとこからだから$bkmのまま使える
        if ($bkm === "pub") {
            // 今のタグから削除するタグを除いた新しいtagsを作る
            const thisTags = $bookmarkEvents[$tabSet].tags.filter((_, index) => !$checkedTags.includes(index));
            console.log(thisTags);
            // 送信用のイベントを作成する
            const newEvent = {
                content: $bookmarkEvents[$tabSet].content,
                kind: $bookmarkEvents[$tabSet].kind,
                pubkey: $bookmarkEvents[$tabSet].pubkey,
                created_at: Math.floor(Date.now() / 1000),
                tags: thisTags,
            };

            // pushEvent関数を非同期に呼び出し、結果を待つ
            const res = await pushEvent(newEvent, $relays);

            const t = {
                message: res.msg.join("\n"),
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
           console.log( $privateTags[$tabSet].tags);
            const thisTags = $privateTags[$tabSet].tags.filter(
                (_, index) => !$checkedTags.includes(index)
            );
           
            console.log(thisTags);
            const thisContent = JSON.stringify(thisTags);
            console.log(thisContent);
            const angouka = await window.nostr.nip04.encrypt(
                $pubkey,
                thisContent
            );
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
                // pushEvent関数を非同期に呼び出し、結果を待つ
                const res = await pushEvent(moveEvent, $relays);

                const t = {
                    message: res.msg.join("\n"),
                    timeout: 5000,
                };
                toastStore.trigger(t);
                // 成功したら$bookmarkEventsを更新する
                if (!res.isSuccess) {
                    const t = {
                        message: "失敗したかも",
                        timeout: 5000,
                        background: "variant-filled-error",
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
        $isMulti=false;
    }

    async function moveToPubNotes(toTag: string) {
        console.log(`${$tags[$tabSet]}からPublic ${toTag}へ${$checkedTags}`);
        //まず移動先に$checkedTagsを追加する
        //今のタグから移動するイベントタグリストを作る
        let thisTags;
        if ($bkm === "pub") {
            thisTags = $checkedTags.map((index) => {
                return $bookmarkEvents[$tabSet].tags[index];
            });
        } else {
            thisTags = $checkedTags.map((index) => {
                return $privateTags[$tabSet].tags[index];
            });
        }
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
            // pushEvent関数を非同期に呼び出し、結果を待つ
            const res = await pushEvent(moveEvent, $relays);

            const t = {
                message: res.msg.join("\n"),
                timeout: 5000,
            };
            toastStore.trigger(t);
            // 成功したら$bookmarkEventsを更新する
            if (!res.isSuccess) {
                const t = {
                    message: "失敗したかも",
                    timeout: 5000,
                    background: "variant-filled-error",
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
        $isMulti=false;
    }
    async function moveToPrvNotes(toTag: string) {
        console.log(`${$tags[$tabSet]}からPrivate ${toTag}へ${$checkedTags}`);
        //プライベートブクマに移動させる。
     
        //まず移動先に$checkedTagsを追加する
        //今のタグから移動するイベントタグリストを作る
        let thisTags;
        if ($bkm === "pub") {
            thisTags = $checkedTags.map((index) => {
                return $bookmarkEvents[$tabSet].tags[index];
            });
        } else {
            thisTags = $checkedTags.map((index) => {
                return $privateTags[$tabSet].tags[index];
            });
        }
        console.log(thisTags);
        const tagIndex = $tags.indexOf(toTag);
        //移動先のタグの末尾に追加したそう不要タグずを作る（
        const eventTags = [...$privateTags[tagIndex].tags, ...thisTags];
        console.log(eventTags);
        //Jsonにして暗号化する。
        const thisContent=JSON.stringify(eventTags)
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
            // pushEvent関数を非同期に呼び出し、結果を待つ
            const res = await pushEvent(moveEvent, $relays);

            const t = {
                message: res.msg.join("\n"),
                timeout: 5000,
            };
            toastStore.trigger(t);
            // 成功したら$bookmarkEventsを更新する
            if (!res.isSuccess) {
                const t = {
                    message: "失敗したかも",
                    timeout: 5000,
                    background: "variant-filled-error",
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
        }catch(Error){
            console.log(Error);
        }
    $isMulti=false;
    }
</script>

<Toast />
<div class="h-full grid grid-rows-[auto_1fr] gap-1 w-full">
    <div class=" w-full header">
        <AppBar
            gridColumns="grid grid-cols-[auto_1fr_auto] gap-1"
            slotDefault="place-self-center"
            slotTrail="place-content-end"
            padding="p-0"
            background="bg-surface-300-600-token "
        >
            <svelte:fragment slot="lead">
                <div class="lead-icon"><LightSwitch /></div>
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
                <div class="mode justify-center">
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
            class="bg-surface-100-800-token w-full drop-shadow"
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

    <div class="overflow-y-auto">
        <div class="notearea outline-2">
            <!-- {#each $bookmarkEvents[$tabSet].tags as book, idx}-->
            <!--https://github.com/nostr-protocol/nips#standardized-tags-->
            <ViewContent />

            <!-- <div>[tag]{book[0]}, [eventid]:{book[1]}</div> -->
            <!--  {/each}-->
        </div>
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

<hr class="!border-dashed" />

{#if !$nowProgress}
    <div class="footer">
        {#if !$isMulti}
            <button
                type="button"
                class="btn variant-soft-primary hover:variant-filled-primary"
                on:click={onClickAddNote}
            >
                add note</button
            >
        {:else}
            <button
                type="button"
                class="btn variant-soft-secondary hover:variant-filled-secondary"
                on:click={onClickMoveNotes}
            >
                move notes</button
            >
            <button
                type="button"
                class="btn variant-soft-warning hover:variant-filled-warning"
                on:click={onClickDeleteNotes}
            >
                delete note</button
            >
        {/if}
    </div>
{/if}
<Modal />

<style>
    .header {
        margin: auto;
        max-width: 1000px;
    }
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

    .mode {
        margin-right: 0.5em;
        text-align: center;
    }

    .sliderContainer {
        margin: -0.2em 0;
    }

    .notearea {
        max-width: 1000px;
        margin: auto;
        border-left-width: 4px;
        border-right-width: 4px;
    }
    .footer {
        display: block;
        position: fixed;
        bottom: 1em;
        left: 1em;
    }
</style>
