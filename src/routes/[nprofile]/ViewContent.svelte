<script lang="ts">
    import {
        Modal,
        type ModalSettings,
        modalStore,
        type ModalComponent,
    } from "@skeletonlabs/skeleton";
    import Note from "./Note.svelte";
    import Other from "./Other.svelte";
    import { bookmarkEvents, tabSet } from "$lib/store";
    import ModalMenu from "./ModalMenu.svelte";
    import { nip19 } from "nostr-tools";

    let modal: ModalSettings;
    let nowPopup = false;
    let index: number = 0;

    function onClickMenu(tag: string[], idx: number) {
        nowPopup = true;
        index = idx;
        console.log(index);

        modal = {
          
            type: "component",
            // Pass the component directly:
            component: modalComponent,
            // Provide arbitrary metadata to your modal instance:
            title: `select menu ${index}`,
            body: nip19.noteEncode(tag[1]),

            // Returns the updated response value
            response: (menuItem: string) => {
                switch (menuItem) {
                    case "copy":
                        copyNoteId();
                        break;
                    case "open":
                        openOtherApp();
                        break;
                    case "move":
                        moveNote();
                        break;
                    case "delete":
                        deleteNote();
                        break;
                    default:
                        console.log(menuItem);
                        break;
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
        console.log("copy");
    }
    function openOtherApp() {
        console.log("open");
    }
    function moveNote() {
        console.log("move");
    }
    function deleteNote() {
        console.log("delete");
    }
</script>

{#if $bookmarkEvents.length > 0 && tabSet != null}
    {#each $bookmarkEvents[$tabSet].tags as tag, idx}
        {#if tag[0] !== "d"}
            <div class="card p-4 drop-shadow">
                <div class="grid grid-cols-[auto_1fr]">
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

<Modal  zIndex='z-10'/>

<style>
    .card {
        margin-top: 5px;
    }
</style>
