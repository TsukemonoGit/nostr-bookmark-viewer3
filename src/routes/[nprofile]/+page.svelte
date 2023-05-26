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
    } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import { nip19 } from "nostr-tools";
    import { getEvent } from "$lib/function";
   
    import Note from "./Note.svelte";
    import Other from "./Other.svelte";
	import { bookmarkEvents } from '../../lib/store.js';
    let nowProgress = false;
    let pubkey = "";
    let relays: string[] = [];

    let tags = [
        "a",
        "a",
        "a",
        "a",

    ];
    let isMulti = false;

    let tabSet: number;
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

    $: tags = $bookmarkEvents.map((event) => event.tags[0][1]);

    // コンポーネントが最初に DOM にレンダリングされた後に実行されます(?)
    onMount(async () => {
        nowProgress = true;
        //nprofileを展開する
        try {
            const { type, data } = nip19.decode($page.params.nprofile);
            if (type === "nprofile" && data.relays) {
                pubkey = data.pubkey;
                relays = data.relays;
                tabSet = 0;
                //イペントを取りに行く。
                const filter = [{ kinds: [30001], authors: [pubkey] }];
                $bookmarkEvents = await getEvent(relays, filter);
                console.log(bookmarkEvents);
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

            nowProgress = false;
            return;
        }
    });

    //タグの切り替えを検知（複数選択のときしかいらないたぶん）
    function onClickTab(index: number) {
        tabSet = index;
        console.log(tabSet);
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

</script>

<Toast />
<div class="h-full grid grid-rows-[auto_1fr] gap-1 w-full">
<div class=" w-full header">
    <AppBar
        gridColumns="grid grid-cols-[auto_1fr_auto] gap-1"
        slotDefault="place-self-center"
        slotTrail="place-content-end"
        padding="p-0"
        background='bg-surface-300-600-token drop-shadow-lg'
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
                {#each tags as tag, idx}
                    <Tab
                        on:change={() => {
                            onClickTab(idx);
                        }}
                        bind:group={tabSet}
                        name={tag}
                        value={idx}
                    >
                        {tag}
                    </Tab>
                {/each}
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
    {#if $bookmarkEvents.length > 0 && tabSet!=null}
        <div class="overflow-y-auto border-x-4">
            <div class="notearea outline-2">
            {#each $bookmarkEvents[tabSet].tags as book, idx}

            <!--https://github.com/nostr-protocol/nips#standardized-tags-->
            {#if book[0]==="e"}
                <Note tag = {book} />
            {:else if book[0]!=="d"}        
                <Other tag = {book}/>
            {/if}
                <!-- <div>[tag]{book[0]}, [eventid]:{book[1]}</div> -->
            {/each}
        </div>
        </div>
    {/if}
</div>
    {#if nowProgress}
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

<style>
   .header{
    margin:auto;
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
       
        font-size: small;
        text-align: center;
    }

    .sliderContainer {
        margin: -0.4em 0;
    }
   
.notearea{
    max-width: 1000px;
    margin:auto;
    border-left-width: 4px;
border-right-width: 4px;
}
   
</style>
