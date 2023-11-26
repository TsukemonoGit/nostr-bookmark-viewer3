<script lang="ts">
  import { _ } from 'svelte-i18n';
  import listIcon from '@material-design-icons/svg/round/format_list_numbered_rtl.svg?raw';
  import UpdateIcon from '@material-design-icons/svg/round/update.svg?raw';
  import Chat from '@material-design-icons/svg/round/chat.svg?raw';
  import DownloadIcon from '@material-design-icons/svg/round/download_for_offline.svg?raw';
  import type { Nostr } from 'nosvelte';
  import { identifiersList } from '$lib/store';

  export let sorce: {
    identifier?: string;
    title?: string;
    image?: string;
    description?: string;
  };
  //export let created_at: number;
  export let iconView: boolean;
  export let length: number;
  export let onClickUpdate: any = undefined;
  export let onClickKyouyuu: any = undefined;
  //export let kind: number;
  export let isPageOwner: boolean;
  export let event: Nostr.Event;
  console.log(sorce);

  // 長さに応じてテキストの色を設定
  $: lenColor =
    length < 1000
      ? 'text-surface-900-50-token'
      : length < 1500
      ? 'text-amber-500'
      : 'text-rose-500 dark:text-rose-400';

  const downloadJson = () => {
    const jsonStr = JSON.stringify(event, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const dtag = event.tags.find((item) => item[0] === 'd');
    const fileName = dtag
      ? `bkmstr_kind${event.kind}_${dtag[1]}_${event.created_at}`
      : `bkmstr_kind${event.kind}_${event.created_at}.json`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
</script>

<div class="card drop-shadow px-4 py-4 my-1.5">
  <div class="grid grid-cols-[1fr_auto] gap-1">
    <div class="grid grid-rows-[auto_1fr]">
      {#if sorce?.title}
        <div
          class="h3 font-bold decoration-2 decoration-secondary-600 break-all whitespace-pre-wrap pt-1"
        >
          {sorce.title}
        </div>
      {/if}
      {#if sorce?.description}
        <div class="h6 break-all my-2 whitespace-pre-wrap">
          {sorce.description}
        </div>
      {/if}
    </div>
    <div class="flex justify-end">
      <!-- 修正 -->
      {#if iconView && sorce?.image && sorce.image !== ''}
        <img
          class="pt-1 object-contain max-h-20 md:max-h-28"
          src={sorce.image}
          alt={sorce.title}
        />
      {/if}
    </div>
  </div>
  <div class="flex justify-between pt-1">
    <div class="flex">
      {#if isPageOwner}
        <button
          class="mr-1 place-self-center p-0.5 h-fit flex variant-filled-primary fill-primary-100 rounded-full hover:brightness-[1.15] active:scale-[95%] active:brightness-90"
          on:click={onClickUpdate}>{@html UpdateIcon}</button
        >
      {/if}
      {#if event}
        <div class="flex text-sm place-self-center">
          {$_('created_at')}: {new Date(event.created_at * 1000).toLocaleString(
            [],
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            },
          )}
        </div>
      {/if}
    </div>

    <div class="flex">
      <span class="dark:fill-white mx-2 place-self-center"
        >{@html listIcon}</span
      ><span class="{lenColor} place-self-center">{length}</span>
      {#if event && event.kind >= 30000 && event.kind < 40000}
        <button
          class="p-1 ml-1 flex h-fit variant-filled-primary fill-primary-100 rounded hover:brightness-[1.15] active:scale-[95%] active:brightness-90 fill-white"
          on:click={onClickKyouyuu}>{@html Chat}</button
        >
      {/if}
      <button
        class="p-1 ml-1 flex h-fit variant-filled-primary fill-primary-100 rounded hover:brightness-[1.15] active:scale-[95%] active:brightness-90 fill-white"
        on:click={downloadJson}>{@html DownloadIcon}</button
      >
    </div>
  </div>
</div>
