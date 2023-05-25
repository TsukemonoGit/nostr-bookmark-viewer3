<script lang="ts">
    import {
        ProgressRadial,
        toastStore,
        type ToastSettings,
        Toast,
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
</script>



<Toast />
{#if relays.length > 0}
   <details>
            <summary>Settings</summary>
            <dl style="margin-left:1em">
               <span class="flex-auto">
                    <dt>pubkey</dt>
                    <dd  class="text-wrap">{nip19.npubEncode(pubkey)}</dd>
                </span>
                <span class="flex-auto">
                    <dt>relays</dt>

                    {#each relays as re}
                        <dd  class="text-wrap">
                            {re}
                        </dd>
                    {/each}
                </span>
            </dl>
    </details>
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

<style>
    .progress {
        display: block;
        position: fixed;
        bottom: 2em;
        right: 2em;
    }
    dt{
        font-weight: bold;
    }
    .text-wrap {
        word-break: break-word;
        overflow-wrap: break-word;
    }
</style>
