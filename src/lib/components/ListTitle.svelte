<script lang="ts">
  import { _ } from 'svelte-i18n';
  import listIcon from '@material-design-icons/svg/round/format_list_numbered_rtl.svg?raw';
  import UpdateIcon from '@material-design-icons/svg/round/update.svg?raw';
  import Chat from '@material-design-icons/svg/round/chat.svg?raw';

  export let sorce: {
    identifier?: string;
    title?: string;
    image?: string;
    description?: string;
  };
  export let created_at: number;
  export let iconView: boolean;
  export let length: number;
  export let onClickUpdate: any = undefined;
  export let onClickKyouyuu: any = undefined;
  export let kind: number;
  export let isPageOwner: boolean;
  console.log(sorce);

  // 長さに応じてテキストの色を設定
  $: lenColor =
    length < 1000
      ? 'text-surface-900-50-token'
      : length < 1500
      ? 'text-amber-500'
      : 'text-rose-500 dark:text-rose-400';
</script>

<div class="card drop-shadow px-4 py-2 my-1.5">
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
          class="mr-1 h-fit flex variant-filled-primary fill-primary-100 rounded-full hover:brightness-[1.15] active:scale-[95%] active:brightness-90"
          on:click={onClickUpdate}>{@html UpdateIcon}</button
        >
      {/if}
      <div class="flex text-sm place-self-center">
        {$_('created_at')}: {new Date(created_at * 1000).toLocaleString([], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>

    <div class="flex">
      <span class="dark:fill-white mx-2">{@html listIcon}</span><span
        class={lenColor}>{length}</span
      >
      {#if kind >= 30000 && kind < 40000}
        <button
          class="ml-1 flex h-fit variant-filled-primary fill-primary-100 rounded hover:brightness-[1.15] active:scale-[95%] active:brightness-90"
          on:click={onClickKyouyuu}
          ><span class="fill-white">{@html Chat}</span></button
        >
      {/if}
    </div>
  </div>
</div>
