<script lang="ts">
    import {
        ListBox,
        ListBoxItem,
        Modal,
        popup,
        type ModalSettings,
        type PopupSettings,
        modalStore,
        type ModalComponent,
    } from "@skeletonlabs/skeleton";
    import Note from "./Note.svelte";
    import Other from "./Other.svelte";
    import { bookmarkEvents, tabSet } from "$lib/store";
    import ModalMenu from "./ModalMenu.svelte";

   let modal: ModalSettings;
    let nowPopup = false;
    let index:number=0;



    function onClickMenu(idx:number) {
        nowPopup=true;
      index=idx;
      console.log(index);
      modal = {
	type: 'component',
	// Pass the component directly:
	component: modalComponent,
    // Provide arbitrary metadata to your modal instance:
    title:index.toString(),
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
                            on:click={()=>onClickMenu(idx)}
                        >
                            Menu
                        </button>
                    </div>
                </div>
            {/if}
        {/each}
    {/if}



    <Modal/>


<style>
    .card {
        margin-top: 5px;
    }
</style>
