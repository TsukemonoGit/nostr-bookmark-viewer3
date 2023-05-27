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
    } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import { nip19, type Event } from "nostr-tools";
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
    } from "../../lib/store.js";
    import ViewContent from "./ViewContent.svelte";
    import ModalAddNote from "./ModalAddNote.svelte";

    let isMulti = false;
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
                //イペントを取りに行く。
                const bFilter = [{ kinds: [30001], authors: [$pubkey] }];
                $bookmarkEvents = await getEvent($relays, bFilter);
                console.log(bookmarkEvents);

                //noteIdfilter作る
                const filteredNoteIds = noteIdFilter($bookmarkEvents);
                console.log(filteredNoteIds);
                const nFilter = [{ kinds: [1], ids: filteredNoteIds }];
                //eventを取りに行く
                $noteEvents = await getEvent(RelaysforSeach, nFilter);
                console.log($noteEvents);

                //authorsfilter つくる
                let filteredAuthors = authorsFilter($noteEvents);
                console.log(filteredAuthors);

                // ローカルストレージをチェックする
                const localProfile = localStorage.getItem("profiles");
                let localProfiles: Event[]=[]; 
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

                    filteredAuthors=updatedAuthors;
                }
                
                const pFilter = [{ kinds: [0], authors: filteredAuthors }];
                
                //eventを取りに行く
                $profileEvents = await getEvent(RelaysforSeach, pFilter);
                console.log($profileEvents);

                    // 合体した配列を作成
                    $profileEvents = [
                        ...localProfiles,
                        ...$profileEvents,
                    ];
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
        $tabSet = index;
        console.log($tabSet);
    }
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
            type: "prompt",
            // Data
            title: `Add Note to ${$tags[$tabSet]}`,
            body: 'Enter an ID starting with "note" or "nevent".',
            // Populates the input value and attributes
            value: "",
            valueAttr: {
                type: "text",
                minlength: 3,
                maxlength: 64,
                required: true,
                autocomplete: "off", // 履歴を表示しないようにする
                class: "p-1 w-full rounded-full ",
            },

            // Returns the updated response value
            response: (r: string) => addNote(r),
        };
        modalStore.trigger(modal);
    }
    async function addNote(r: string | boolean) {
        console.log("response:", r);
        if (r == null || r == false) {
            return;
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
        } else {
            //表示中のぶくまのたぐずにこのIDを追加してイベント投げる
            const thisTag = ["e", noteId.value];
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
            } catch (error) {
                console.log(error);
                return;
            }
        }
    }
</script>

<Toast />
<div class="h-full grid grid-rows-[auto_1fr] gap-1 w-full">
    <div class=" w-full header">
        <AppBar
            gridColumns="grid grid-cols-[auto_1fr_auto] gap-1"
            slotDefault="place-self-center"
            slotTrail="place-content-end"
            padding="p-0.5"
            background="bg-surface-300-600-token drop-shadow-lg"
        >
            <svelte:fragment slot="lead">
                <div class="lead-icon">(icon)</div>
            </svelte:fragment>

            <div class="tabGroup" on:wheel={wheelScroll}>
                <TabGroup
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
                <div class="mode">
                    <div>mode</div>
                    <div class="sliderContainer">
                        <SlideToggle
                            name="slider-small"
                            bind:checked={isMulti}
                            size="sm"
                        />
                    </div>
                </div>
            </svelte:fragment>
        </AppBar>
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
        <button
            type="button"
            class="btn variant-soft-primary hover:variant-filled-primary"
            on:click={onClickAddNote}
        >
            add note</button
        >
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
