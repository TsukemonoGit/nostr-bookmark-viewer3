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
    import { each } from "svelte/internal";

    let nowProgress = false;
    let pubkey = "";
    let relays: string[] = [];

    let tags = [
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
    ];
    let isMulti = false;

    let tabSet: number;
    let toast: ToastSettings;
    let bookmarkEvents: any[] = [];
    let booklist: any[] = [];
    //イベント内容検索用リレーたち
    const RelaysforSeach = [
        //"wss://relay.nostr.band",
        //"wss://nostr.wine",
        //"wss://relay.damus.io",
        //"wss://yabu.me",
        "wss://nostream.localtest.me",
        "ws://localhost:7000",
    ];

    $: tags = bookmarkEvents.map((event) => event.tags[0][1]);

    $: if (bookmarkEvents.length > 0) {
        if (bookmarkEvents[tabSet].tags[0][0] !== "d") {
            booklist = [];
        } else {
            const index = bookmarkEvents[tabSet].tags[0][1];

            booklist = bookmarkEvents[tabSet].tags
                .filter((tag: string[]) => tag[0] === "e")
                .map((tag: string[]) => tag[1]);
        }
    }
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
                bookmarkEvents = await getEvent(relays, filter);
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
<div class="main h-full grid grid-rows-[auto_1fr] gap-1">
    <AppBar
        gridColumns="grid-cols-3"
        slotDefault="place-self-center"
        slotTrail="place-content-end"
        padding="p-0"
    >
        <svelte:fragment slot="lead">
            <div class="lead-icon">(icon)</div>
        </svelte:fragment>

        <div class="tabGroup" on:wheel={wheelScroll}>
            <TabGroup
                justify="justify"
                active="variant-filled-primary"
                hover="hover:variant-soft-primary"
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

    {#if bookmarkEvents.length > 0}
        <div class="overflow-y-auto">
            {#each booklist as book, idx}
                <div>{book}</div>
            {/each}
        </div>
    {/if}

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
</div>
<hr class="!border-dashed" />

<style>
    .main {
        max-width: 1000px;
        margin: 0 auto;
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
        flex: none;
        width: fit-content;
        font-size: small;
        text-align: center;
    }

    .sliderContainer {
        margin: -0.4em 0;
    }

    .lead-icon {
        flex: none;
        width: fit-content;
    }
</style>
