<script lang="ts">
    import { onMount } from "svelte";
    import { nip19 } from "nostr-tools";
    import { Toast } from "@skeletonlabs/skeleton";
    import type { ToastSettings } from "@skeletonlabs/skeleton";

    let pubkey: string;
    let relays: string[] = [];
    let relay: string;

    let toast: ToastSettings;
    // コンポーネントが最初に DOM にレンダリングされた後に実行されます(?)
    onMount(async () => {
        // local strageに nprofile が保存されていたら展開する
        const nprofile = localStorage.getItem("nprofile");
        if (nprofile) {
            try {
                const address = nip19.decode(nprofile);
                if (
                    typeof address.data === "object" &&
                    "pubkey" in address.data &&
                    "relays" in address.data &&
                    address.data.relays
                ) {
                    pubkey = address.data.pubkey;
                    relays = address.data.relays;
                }
            } catch (error) {
                console.log("nprofileのデコードに失敗しました");
            }
        }
    });
</script>

<!---------------------------------------------------------------------->
<div class="main">
    <p class="hazimeni">
        ブックマークを取得する公開鍵を設定し、接続するリレーをリレーリストに追加してください。<br
        />
        リレーが複数の場合、取得したリストの中の最新を表示してるはず...<br />
        <br />

        なんもわからん人間が作ってるのでご利用は自己責任でお願いします。
    </p>

    <div class="content">
        <p>公開鍵(public key)</p>
        <div class="input-group input-group-divider grid-cols-[auto_1fr] ">
            <button
                class="py-1 btn variant-filled-secondary rounded-full"
                on:click={onClickNip07}
                >use NIP-07 <br />Extension</button
            >
            <input
                class="input input1"
                type="text"
                bind:value={pubkey}
                placeholder="npub1..."
            />
        </div>
    </div>

    <div class="content">
        <p class="relay">リレー(relay)</p>
        <div class="input-group input-group-divider grid-cols-[1fr_auto]">
            <input
                class="input1"
                type="text"
                bind:value={relay}
                placeholder="wss://..."
            />
            <button
                class="py-1 btn variant-filled rounded-full"
                on:click={addRelayList}>add relay</button
            >
           
        </div>
        <ul id="list">
            リレーリスト
            {#if relays.length > 0}
                {#each relays as re, index}
                    <div class="list">
                        <li value={re}>
                            <button
                                class="py-0 btn2 btn variant-filled-primary rounded-full"
                                on:click={() => clickRelay({ index })}
                                >delete</button
                            >
                            {re}
                        </li>
                    </div>
                {/each}
            {/if}
        </ul>
    </div>

    <button
        type="button"
        id="btn1"
        class="btn variant-filled-secondary rounded-full"
        on:click={onClickNext}>Next →</button
    >
</div>
<hr />

<div id="footer">
    Github: <a
        href="https://github.com/TsukemonoGit/nostr-bookmark-viewer3"
        target="_blank"
        rel="noopener noreferrer">TsukemonoGit/nostr-bookmark-viewer2</a
    > <br />
    Author:
    <a
        href="https://nostx.shino3.net/npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw"
        target="_blank"
        rel="noopener noreferrer">mono(Nostr)</a
    >
</div>

<style>
    .main {
        margin: 1em;
        margin-top: 3em;
    }

    .content {
        margin: 1em 0em 1em 0em;
    }
    #btn1 {
        border-radius: 50em;
        margin-bottom: 2em;
        margin-top: 2em;
    }
    .input{
        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-all;
    }
    .input1 {
        margin-left: 0.5em;
        padding: 0 0.5em;
    }
    #list {
        margin-top: 1em;
        margin-left: 1em;
        margin-right: 1em;
        border: solid 1px rgb(88, 88, 88);
    }
</style>
