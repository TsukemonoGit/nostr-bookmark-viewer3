<script lang="ts">
    import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
    import Note from "./Note.svelte";
    import Other from "./Other.svelte";

    export let tag: string[];
    export let tabSet: number;
    export let idx: number;

    const popupFeatured: PopupSettings = {
        // Represents the type of event that opens/closed the popup
        event: "click",
        // Matches the data-popup value on your popup element
        target: "popupFeatured",
        // Defines which side of your trigger the popup will appear
        placement: "bottom",
    };

    function onClickMenu() {
        console.log(tabSet, idx);
    }
</script>

{#if tag[0] !== "d"}
    <div class="card p-4 drop-shadow">
        <div class="grid grid-cols-[auto_1fr]">
            {#if tag[0] === "e"}
                <Note {tag} />
            {:else}
                <Other {tag} />
            {/if}
            <button
                type="button"
                class="btn-icon variant-filled justify-self-end"
                on:click={onClickMenu} use:popup={popupFeatured} >Menu</button
            >
        </div>
    </div>
{/if}
<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
    <div><p>Demo Content</p></div>
    <div class="arrow bg-surface-100-800-token" />
</div>

<style>
    .card {
        margin-top: 5px;
    }
</style>
