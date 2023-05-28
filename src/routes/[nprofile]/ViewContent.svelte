<script lang="ts">
    import {
        Modal,
        type ModalSettings,
        modalStore,
        type ModalComponent,
        Toast,
        type ToastSettings,
        toastStore,
    } from "@skeletonlabs/skeleton";
    import Note from "./Note.svelte";
    import Other from "./Other.svelte";
    import {
        bkm,
        bookmarkEvents,
        privateTags,
        relays,
        tabSet,
        tags,
    } from "$lib/store";
    import ModalMenu from "./ModalMenu.svelte";
    import { nip19, type Event, signEvent } from "nostr-tools";
    import { pushEvent } from "$lib/function";

    let modal: ModalSettings;
    let nowPopup = false;
    let index: number = 0;
    let thisTag: string[] = [];
    function onClickMenu(tag: string[], idx: number) {
        nowPopup = true;
        index = idx;
        thisTag = tag;
        console.log(index);

        modal = {
            type: "component",
            backdropClasses:
                "!bg-surface-400 dark:!bg-surface-700  !bg-opacity-40 dark:!bg-opacity-40",
            // Pass the component directly:
            component: modalComponent,
            // Provide arbitrary metadata to your modal instance:
            title: `select menu [tag:${$tags[$tabSet]} index:${index}]`,
            body: nip19.noteEncode(tag[1]),
            value: { noteId: nip19.noteEncode(tag[1]) },
            // Returns the updated response value
            response: (menuItem) => {
                if (menuItem) {
                    switch (menuItem.name) {
                        case "close":
                            break;
                        case "copy":
                            copyNoteId();
                            break;
                        case "open":
                            openOtherApp();
                            break;

                        case "delete":
                            deleteNote();
                            break;
                        case "move":
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
        props: { background: "bg-red-500" },
        // Provide a template literal for the default component slot
        slot: "<p>Skeleton</p>",
    };

    function copyNoteId() {
        //ボタンのほうにimport { clipboard } from '@skeletonlabs/skeleton';ついてるのでToastだけ
        //というのはうそ
        console.log("copy");
       
          
        navigator.clipboard.writeText(nip19.noteEncode(thisTag[1])).then(
					() => {
						// コピーに成功したときの処理
						console.log(`copyed: ${nip19.noteEncode(thisTag[1]).slice(0, 15)}...`);

                        const t: ToastSettings = {
							message: `copyed: ${nip19.noteEncode(thisTag[1]).slice(0, 15)}...`,
							timeout: 3000
						};
						toastStore.trigger(t);
					},
					() => {
						// コピーに失敗したときの処理
						console.log('コピー失敗');
						/**@type {import('@skeletonlabs/skeleton').ToastSettings}*/
						const t:ToastSettings = {
							message: 'failed to copy',
							timeout: 3000,
							background: 'bg-orange-500 text-white width-filled '
						};
						toastStore.trigger(t);
					}
        );
    }
    function openOtherApp() {
        console.log("open");
    }
    async function moveNote(moveTag: string) {
        console.log("move", moveTag);
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
            $bookmarkEvents[moveIdx] = res.event;
        } catch (error) {
            console.log(error);
            return;
        }
        //今のタグから移動させるタグを消したtagsを作って消すのはdeleteNoteと同じなのでこれで終わり
        await deleteNote();
    }

    async function deleteNote() {
        console.log("delete");

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
    }
</script>

<Toast />
{#if $bkm === "pub"}
    {#if $bookmarkEvents.length > 0 && tabSet != null}
        {#each $bookmarkEvents[$tabSet].tags as tag, idx}
            {#if tag[0] !== "d"}
                <div class="card p-4 drop-shadow">
                    <div class="grid grid-cols-[1fr_auto] gap-2">
                        {#if tag[0] === "e"}
                            <Note {tag} />
                        {:else}
                            <Other {tag} />
                        {/if}

                        <button
                            class="btn-icon variant-filled justify-self-end"
                            on:click={() => onClickMenu(tag, idx)}
                        >
                            Menu
                        </button>
                    </div>
                </div>
            {/if}
        {/each}
    {/if}
{:else if $privateTags.length > 0 && tabSet != null && $privateTags[$tabSet].tags.length > 0}
    {#each $privateTags[$tabSet].tags as item, idx}
        {#if item[0] !== "d"}
            <div class="card p-4 drop-shadow">
                <div class="grid grid-cols-[1fr_auto] gap-2">
                    {#if item[0] === "e"}
                        <Note tag={item} />
                    {:else}
                        <Other tag={item} />
                    {/if}

                    <button
                        class="btn-icon variant-filled justify-self-end"
                        on:click={() => onClickMenu(item, idx)}
                    >
                        Menu
                    </button>
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
