<script lang="ts">
  import Setting from './Setting.svelte';
  import { _ } from 'svelte-i18n';
</script>

<svelte:head>
  <title>nostr-bookmark-viewer</title>
  <meta name="description" content="user setting" />
  <meta prefix="og: https://ogp.me/ns#" />
  <meta property="og:title" content="nostr-bookmark-viewer" />
  <meta property="og:description" content={$_('settings.description')} />
  <meta
    property="og:image"
    content="https://nostr-bookmark-viewer3.vercel.app/img2.png"
  />
</svelte:head>

<main class="container max-w-5xl p-2">
  <h1 class="h1 mb-5">nostr-bookmark-viewer</h1>

  <Setting />
</main>
