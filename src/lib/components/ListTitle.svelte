<script lang="ts">
  import type { Nostr } from 'nosvelte';

  export let sorce: Nostr.Event;
  export let iconView: boolean;
  let title: string = '';
  let image: string = '';
  let description: string = '';
  console.log(sorce);

  $: if (sorce) {
    const tmptitle = sorce.tags.find((item) => item[0] === 'title');
    if (tmptitle) {
      title = tmptitle[1];
    } else {
      title = '';
    }

    const tmpimage = sorce.tags.find((item) => item[0] === 'image');
    if (tmpimage) {
      image = tmpimage[1];
    } else {
      image = '';
    }

    const tmpdesc = sorce.tags.find(
      (item) => item[0] === 'description' || item[0] === 'summary',
    );
    if (tmpdesc) {
      description = tmpdesc[1];
    } else {
      description = '';
    }
  }
</script>

{#if title !== '' || image !== '' || description !== ''}
  <div
    class="card drop-shadow px-4 py-2 my-1.5 grid grid-cols-[auto_1fr] gap-1"
  >
    <div class="grid grid-rows-[auto_auto]">
      <div class="h4 underline decoration-2 decoration-secondary-600">
        {title}
      </div>
      <div class="h6 break-all whitespace-pre-wrap">{description}</div>
    </div>
    <div class="flex justify-end">
      <!-- 修正 -->
      {#if iconView && image !== ''}
        <img class="max-w-20 max-h-20 object-contain" src={image} alt={title} />
      {/if}
    </div>
  </div>
{/if}
