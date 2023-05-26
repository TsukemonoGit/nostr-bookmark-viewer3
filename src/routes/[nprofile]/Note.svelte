<script lang="ts">
    import { noteEvents } from "$lib/store";
    import { type Event, nip19 } from "nostr-tools";

    export let tag: string[] = [];
    let eventId: string = "";
    let note: Event | undefined;
    $: if (tag.length > 0) {
        eventId = tag[1];
        note = $noteEvents.find((event) => event.id === eventId);
    }
</script>

{#if tag.length > 0}
    <section class=" w-full text-left">
        {#if !note}
            <div class=" break-all">
                failed to get event ID:{nip19.noteEncode(tag[1])}
            </div>
        {:else}
            <div class="grid grid-rows-[auto-auto-auto] gap-2 break-all">
                <div>{note.pubkey}</div>
                <div class=" break-all whitespace-pre-wrap">{note.content}</div>
                <div>{new Date(note.created_at * 1000).toLocaleString()}</div>
            </div>
        {/if}
    </section>
{/if}
