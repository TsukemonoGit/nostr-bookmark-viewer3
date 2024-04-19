<script lang="ts">
  // Your selected Skeleton theme:
  //import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';

  // This contains the bulk of Skeletons required styles:
  //import '@skeletonlabs/skeleton/styles/skeleton.css';

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

  import {
    storePopup,
    Modal,
    Toast,
    initializeStores,
  } from '@skeletonlabs/skeleton';
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  import { onMount } from 'svelte';
  import RegisterSw from '$lib/components/RegisterSW.svelte';
  // @ts-ignore
  import { pwaInfo } from 'virtual:pwa-info';
  import { setInitialClassState } from '@skeletonlabs/skeleton';

  //analytics https://vercel.com/docs/concepts/analytics/quickstart
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
  import { send_pubhex } from '$lib/store';
  inject({ mode: dev ? 'development' : 'production' });
  export let data: import('./$types').LayoutServerData;

  send_pubhex.set(data.send_pubhex);
  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
  let mounted = false;
  //最初に一回だけ実行するやつ
  import { setModalStore } from '$lib/store';
  import { setToastStore } from '$lib/store';
  initializeStores();
  setModalStore();
  setToastStore();
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
