<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  onMount(() => {
    if ($page.params.slug.startsWith('note1')) {
      goto(`/n/${$page.params.slug}`);
    } else if ($page.params.slug.startsWith('naddr')) {
      goto(`/a/${$page.params.slug}`);
    } else if ($page.params.slug.startsWith('nprofile')) {
      goto(`/p/${$page.params.slug}`);
    } else if ($page.params.slug.startsWith('npub')) {
      goto(`/p/${$page.params.slug}`);
    }
  });
</script>
