<script>
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';

  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/skeleton.css';

  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from '@floating-ui/dom';
  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import '../app.postcss';

  import { storePopup } from '@skeletonlabs/skeleton';
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  import { onMount } from 'svelte';
  import RegisterSw from '$lib/components/RegisterSW.svelte';
  import { pwaInfo } from 'virtual:pwa-info';
  import { setInitialClassState } from '@skeletonlabs/skeleton';

  //analytics https://vercel.com/docs/concepts/analytics/quickstart
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
  {@html `<script>(${setInitialClassState.toString()})();</script>`}
</svelte:head>
{#if mounted && pwaInfo}
  <RegisterSw />
{/if}
