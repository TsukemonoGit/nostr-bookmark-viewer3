<script lang="ts">
  import { _ } from 'svelte-i18n';
  export let sorce: {
    identifier?: string;
    title?: string;
    image?: string;
    description?: string;
  };
  export let created_at: number;
  export let iconView: boolean;

  console.log(sorce);
</script>

<div class="card drop-shadow px-4 py-2 my-1.5 grid grid-cols-[1fr_auto] gap-1">
  <div class="grid grid-rows-[auto_1fr]">
    {#if sorce?.title}
      <div
        class="h3 font-bold decoration-2 decoration-secondary-600 break-all whitespace-pre-wrap"
      >
        {sorce.title}
      </div>
    {/if}
    {#if sorce?.description}
      <div class="h6 break-all my-1 whitespace-pre-wrap">
        {sorce.description}
      </div>
    {/if}
    <div class=" text-sm">
      {$_('created_at')}: {new Date(created_at * 1000).toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })}
    </div>
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
