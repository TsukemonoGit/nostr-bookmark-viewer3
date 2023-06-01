<script lang="ts">
	import Setting from './Setting.svelte';
</script>

<svelte:head>
	<title>nostr-bookmark-viewer</title>
</svelte:head>

<main class="overflow-y-auto">
	<h1 class="h1">nostr-bookmark-viewer3</h1>
	<div class="main overflow-y-auto">
	<Setting />
</div>
</main>

<style>
    .h1{
    margin: 0 0px 20px 0px;
    }
	main{
		max-height: 100vh;
	}
	.main {
        max-width: 700px;
		
        margin: 0 auto;
    }
</style>