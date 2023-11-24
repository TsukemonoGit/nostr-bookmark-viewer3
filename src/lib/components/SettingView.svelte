<script lang="ts">
  import OpenInBrowser from '@material-design-icons/svg/round/open_in_browser.svg?raw';
  import Chat from '@material-design-icons/svg/round/chat.svg?raw';
  import ArrowCircleRight from '@material-design-icons/svg/round/arrow_circle_right.svg?raw';
  import SettingsIcon from '@material-design-icons/svg/round/settings.svg?raw';
  import Delete from '@material-design-icons/svg/round/delete.svg?raw';
  import { _ } from 'svelte-i18n';
  import { page } from '$app/stores';
  import { Metadata, NostrApp, Text, Nostr } from 'nosvelte';
  import { Kind, nip04, nip19 } from 'nostr-tools';
  import 'websocket-polyfill';

  import {
    AppBar,
    Modal,
    SlideToggle,
    LightSwitch,
  } from '@skeletonlabs/skeleton';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { identifiersList, modalStore, toastStore } from '$lib/store';
  import {
    Kinds,
    RelaysforSearch,
    allView,
    bookmarkEvents,
    nowProgress,
    pageNprofile,
    searchRelays,
  } from '$lib/store';

  import {
    searchIcon,
    tagListIcon,
    addNoteIcon,
    editTagIcon,
    updateListIcon,
  } from '$lib/myicons';

  import UpdateIcon from '@material-design-icons/svg/round/update.svg?raw';

  export let URLPreview: boolean;
  export let iconView: boolean;
  export let loadEvent: boolean;
  export let pubkey: string;
  export let relays: string[];
  export let loadEventChange = true;
</script>

<div
  class="card border border-purple-800 p-4 w-[26rem] h-[42rem] shadow-xl z-20 break-all max-h-[80%] max-w-[90%] overflow-auto"
  data-popup="popupFeatured"
>
  {#if !$nowProgress}
    <button
      type="button"
      class="btn variant-filled-secondary py-1 my-2"
      on:click={() => goto(window.location.origin)}
      >{$_('nprofile.html.button')}</button
    >
  {/if}
  <hr class="py-1" />
  <ul class="list-disc">
    <li class="ml-4 my-1">
      <div class="flex items-center justify-between">
        <!-- 修正: flexクラスにitems-centerを追加 -->
        <span class="pr-2">{'Light Switch'}</span>
        <LightSwitch class="flex" />
      </div>
    </li>

    {#if !$nowProgress}
      <li class="ml-4 my-1">
        <!-- こんてんとわーにんぐ全部表示OR非表示 -->

        <div class="flex items-center justify-between">
          <!-- 修正: flexクラスにitems-centerを追加 -->
          <span class="pr-2">{$_('nprofile.html.warning')}</span>
          <SlideToggle name="slider-label" size="sm" bind:checked={$allView}>
            <span class="text-sm">{$allView ? 'ON' : 'OFF'}</span>
          </SlideToggle>
        </div>
      </li>
    {/if}
    <li class="ml-4 justify-stretch my-1">
      <div class="flex items-center justify-between">
        <!-- 修正: flexクラスにitems-centerを追加 -->
        {$_('nprofile.html.preview')}
        <SlideToggle name="slider-label" size="sm" bind:checked={URLPreview}>
          <span class="text-sm">{URLPreview ? 'ON' : 'OFF'}</span>
        </SlideToggle>
      </div>
    </li>
    <li class="ml-4 justify-stretch my-1">
      <div class="flex items-center justify-between">
        <!-- 修正: flexクラスにitems-centerを追加 -->
        {$_('nprofile.html.loadIcon')}
        <SlideToggle name="slider-label" size="sm" bind:checked={iconView}>
          <span class="text-sm">{iconView ? 'ON' : 'OFF'}</span>
        </SlideToggle>
      </div>
    </li>
    {#if loadEventChange}
      <li class="ml-4 justify-stretch my-1">
        <div class="flex items-center justify-between">
          <!-- 修正: flexクラスにitems-centerを追加 -->
          {$_('nprofile.html.loadnote')}
          <SlideToggle name="slider-label" size="sm" bind:checked={loadEvent}>
            <span class="text-sm">{loadEvent ? 'ON' : 'OFF'}</span>
          </SlideToggle>
        </div>
      </li>
    {/if}
  </ul>

  <hr class="!border-t-2 my-2" />
  <div class="text-sm grid grid-cols-[0.5fr_0.5fr]">
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div
        class="btn p-0 mt-0.5 h-6 w-6 rounded fill-primary-100 variant-filled-primary"
      >
        {@html Chat}
      </div>
      {$_('nprofile.html.share')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div
        class="btn p-0 mt-0.5 h-6 w-6 rounded fill-primary-100 variant-filled-primary"
      >
        {@html OpenInBrowser}
      </div>
      {$_('nprofile.html.openapp')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div
        class="btn p-0 mt-0.5 h-6 w-6 rounded fill-primary-100 variant-filled-primary"
      >
        {@html ArrowCircleRight}
      </div>
      {$_('nprofile.html.move')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div
        class="btn p-0 mt-0.5 h-6 w-6 rounded fill-warning-300 variant-filled-primary"
      >
        {@html Delete}
      </div>
      {$_('nprofile.html.delete')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div class="btn variant-filled-primary rounded-full mt-0.5 p-0 h-6 w-6">
        {@html searchIcon}
      </div>

      {$_('nprofile.html.search')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div class="btn variant-filled-primary p-0 mt-0.5 h-6 w-6">
        {@html tagListIcon}
      </div>
      {$_('nprofile.html.list')}
    </div>

    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div class="btn variant-filled-primary p-0 mt-0.5 h-6 w-6">
        {@html addNoteIcon}
      </div>
      {$_('nprofile.html.add')}
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div class="btn variant-filled-primary p-0 mt-0.5 h-6 w-6">
        {@html editTagIcon}
      </div>
      {$_('nprofile.html.edit')}
    </div>

    <div class="grid grid-cols-[auto_1fr] gap-1">
      <div class="btn variant-filled-primary p-0 mt-0.5 h-6 w-6 fill-white">
        {@html UpdateIcon}
      </div>
      {$_('nprofile.html.update')}
    </div>
    <!-- <div class="grid grid-cols-[auto_1fr] gap-1">
        <span class="btn variant-filled-primary p-0 mt-0.5 h-5 w-6"
          >{@html warningOnIcon}</span
        >
        {$_('nprofile.html.warning')}
      </div> -->

    <div class="grid grid-cols-[auto_1fr] gap-1">
      <span class="btn variant-filled-primary rounded-full p-0 h-5">mode</span>
      {$_('nprofile.html.mode')}
    </div>
  </div>

  <div>
    <hr class="!border-t-2 my-1" />
    <p>【pubkey】</p>
    <p>{nip19.npubEncode(pubkey)}</p>

    <p class="mt-2">【relays】</p>

    <ul class="list-disc">
      {#each relays as relay}
        <li class="ml-4">{relay}</li>
      {/each}
    </ul>
    <p class="mt-2">{$_('nprofile.html.search_relays')}</p>

    <ul class="list-disc">
      {#each $searchRelays as relay}
        <li class="ml-4">{relay}</li>
      {/each}
    </ul>
  </div>

  <div class="arrow bg-surface-100-800-token" />
</div>
