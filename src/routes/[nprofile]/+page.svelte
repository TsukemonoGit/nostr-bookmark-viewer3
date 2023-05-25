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
    } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import { nip19 } from "nostr-tools";

    let nowProgress = false;
    let pubkey = "";
    let relays: string[] = [];

    let toast: ToastSettings;
    // コンポーネントが最初に DOM にレンダリングされた後に実行されます(?)
    onMount(async () => {
        nowProgress = true;
        //nprofileを展開する
        try {
            const { type, data } = nip19.decode($page.params.nprofile);
            if (type === "nprofile" && data.relays) {
                pubkey = data.pubkey;
                relays = data.relays;
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

    let tabSet: string;
    let tags = [
        "test",
        "tes",
        "test",
        "tes",
        "test",
        "test",
        "test",
        "test",
        "test",
        "test",
    ];
    let isMulti = false;

    function wheelScroll(event) {
        console.log(event);
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

<AppBar
    gridColumns="grid-cols-3"
    slotDefault="place-self-center"
    slotTrail="place-content-end"
    padding="p-0"
>
    <svelte:fragment slot="lead">
        <div class="lead-icon">(icon)</div>
    </svelte:fragment>

    <div class="tabGroup" on:mousewheel={wheelScroll}>
        <TabGroup
            justify="justify"
            active="variant-filled-primary"
            hover="hover:variant-soft-primary"
            class="tabGroupContainer"
            border="border-b border-surface-400-500-token"
            rounded="rounded-tl-container-token rounded-tr-container-token"
        >
            {#each tags as tag, idx}
                <Tab bind:group={tabSet} name={tag} value={idx}>
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

<div class="main">
    {#if relays.length > 0}
        <details>
            <summary>Settings</summary>
            <dl style="margin-left:1em">
                <span class="flex-auto">
                    <dt>pubkey</dt>
                    <dd class="text-wrap">{nip19.npubEncode(pubkey)}</dd>
                </span>
                <span class="flex-auto">
                    <dt>relays</dt>

                    {#each relays as re}
                        <dd class="text-wrap">
                            {re}
                        </dd>
                    {/each}
                </span>
            </dl>
        </details>
    {/if}
    <p>a</p>
    <p>a</p>

    <p>a</p>
    <p>a</p>
    <p>a</p>
    <p>a</p>
    <p>a</p>
    <hr class="!border-dashed" />
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

<style>
    .progress {
        display: block;
        position: fixed;
        bottom: 2em;
        right: 2em;
    }

    dt {
        font-weight: bold;
    }

    .text-wrap {
        word-break: break-word;
        overflow-wrap: break-word;
    }

    .main {
        height: 100vh;
        padding: 0 1em;
        overflow: auto;
    }

    .tabGroup {
        flex: 1;
        max-width: calc(100vw - 7em);

        position: relative;
    }
    .tab-list {
        overflow-x: scroll;
        overflow-x: visible;
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
