<script lang="ts">
  import Setting from './Setting.svelte';
</script>

<svelte:head>
  <title>nostr-bookmark-viewer</title>
  <meta name="description" content="user setting" />
  <meta prefix="og: https://ogp.me/ns#" />
  <meta property="og:title" content="nostr-bookmark-viewer3" />
  <meta
    property="og:description"
    content="Nostrのぶっくまーくみたりできるやつ"
  />
  <meta
    property="og:image"
    content="https://nostr-bookmark-viewer3.vercel.app/img2.png"
  />
</svelte:head>

<main class="container max-w-5xl p-2">
  <h1 class="h1 mb-5">nostr-bookmark-viewer3(v4)</h1>

  <Setting />
</main>
