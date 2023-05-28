<script lang="ts">
    import { noteEvents, profileEvents } from "$lib/store";
    import { Avatar } from "@skeletonlabs/skeleton";
    import { type Event, nip19 } from "nostr-tools";

    export let tag: string[] = [];
    let eventId: string = "";
    let note: Event | undefined;
    let profile: Event | undefined;
    let content: { display_name: any; picture: any ; username:string};

    $: if (tag.length > 0) {
        eventId = tag[1];
        note = $noteEvents.find((event) => event.id === eventId);
    }
    $: profile = $profileEvents.find((event) => event.pubkey === note?.pubkey);
    $: if (profile?.content) {
        content = JSON.parse(profile?.content);
    }
</script>

{#if tag.length > 0}
    <section class=" w-full text-left">
        {#if !note}
            <div class=" break-all">
                failed to get event ID:{nip19.noteEncode(tag[1])}
            </div>
        {:else if !profile}
            <div class="grid grid-rows-[auto-auto-auto] gap-2 break-all">
                <div>{nip19.npubEncode(note.pubkey)}</div>
                <div class=" break-all whitespace-pre-wrap">{note.content}</div>
                <div>{new Date(note.created_at * 1000).toLocaleString()}</div>
            </div>
        {:else}
        <div class="w-full grid grid-cols-[auto_1fr] gap-1">
                <div>
                    <Avatar
                        src={content.picture}
                        width="w-16"
                        rounded="rounded-full"
                    />
                </div>
                <div class="grid grid-rows-[auto-auto-auto] gap-2 break-all w-full " >
                    <div class="w-full grid grid-cols-[auto_auto_1fr] gap-1">
                    <div class="font-bold">{content.display_name}</div>
                    <div>@{content.username}</div>
                    <div class="place-self-end ">
                        {new Date(note.created_at * 1000).toLocaleString()}
                    </div>
                    </div>
                    <div class=" break-all whitespace-pre-wrap">
                        {note.content}
                    </div>
                   
                </div>
            </div>
        {/if}
    </section>
{/if}
