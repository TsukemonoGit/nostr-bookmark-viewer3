<script>
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-crimson.css';

  // This contains the bulk of Skeletons required styles:
  // NOTE: this will be renamed skeleton.css in the v2.x release.
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import '../app.postcss';
  import RegisterSw from '$lib/RegisterSW.svelte';
  import { pwaInfo } from 'virtual:pwa-info';
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

<slot />

<svelte:head>
  {@html webManifest}
</svelte:head>
{#if mounted && pwaInfo}
  <RegisterSw />
{/if}
