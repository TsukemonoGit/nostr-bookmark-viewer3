<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { Kinds } from '$lib/store';
  import {
    modalStore,
    toastStore,
    type ToastSettings,
    ListBox,
    ListBoxItem,
  } from '@skeletonlabs/skeleton';
  import { nip19 } from 'nostr-tools';

  export let parent: any;
  let selectKind: Kinds = Kinds.kind10003;

  // Base Classes
  const cBase = 'card p-4  shadow-xl space-y-4 break-all';
  const cHeader = 'text-2xl font-bold';
  let res: { id: string; kind: Kinds } = { id: '', kind: selectKind };
  //$modalStore[0]?.value.hexKey
  function onFormSubmit(): void {
    if ($modalStore[0].response) $modalStore[0].response(res);
    modalStore.close();
  }
</script>

<!-- @component This example creates a simple form modal. -->
{#if $modalStore[0]}
  <div class="modal-example-form {cBase} bg-surface-200-700-token">
    <header class={cHeader}>
      {$_('modal.kindMove.title')}
    </header>
    <article class="body">
      【kind:{$modalStore[0].value.event.kind}】{$modalStore[0].value.event
        .tags[0][0] === 'd'
        ? ` 【identifier:${$modalStore[0].value.event.tags[0][1]}】`
        : ''}{$_('modal.kindMove.body')}
      <p>
        {@html $_('modal.kindMove.warning')}
      </p>
      {#if $modalStore[0].value.event.kind !== 10003}<p>
          {@html $_('modal.kindMove.warning1')}
        </p>
      {/if}
    </article>

    <div class="grid grid-cols-[auto_1fr] gap-4">
      <div class="h-full flex flex-col">
        <p class=" font-bold">Select({$_('modal.kindMove.migration')})</p>
        <ListBox
          class="border border-surface-500 p-4 rounded-container-token flex-grow overflow-auto"
        >
          {#each [Kinds.kind10003, Kinds.kind30003, Kinds.kind30001] as kind, index}
            {#if kind !== $modalStore[0].value.event.kind}
              <ListBoxItem
                bind:group={selectKind}
                name={kind.toString()}
                value={kind}>{kind}</ListBoxItem
              >
            {/if}
          {/each}
        </ListBox>
      </div>

      <div
        class="my-1 bg-surface-500-400-token border rounded-lg border-surface-500 px-3 py-1 flex flex-col"
      >
        <p class=" text-white">EVENT JSON</p>

        <div
          class="bg-surface-50-900-token break-words whitespace-pre-wrap max-h-36 max-w-sm overflow-auto"
        >
          {JSON.stringify($modalStore[0].value.event, undefined, 4)}
        </div>
        <p class="text-right text-white">
          kind:{$modalStore[0].value.event.kind}
          {$modalStore[0].value.event.tags[0][0] === 'd'
            ? `,  identifier:${$modalStore[0].value.event.tags[0][1]}`
            : ''}
        </p>
      </div>
    </div>

    <!--もし10003からほかのリプレイス度イベントのとこに移動させるときはdタグを作成-->
    {#if $modalStore[0].value.event.kind === 10003}
      <label class="label flex-1">
        <span class="font-bold">{$_('modalEditTag.list.ID')}</span>
        <input
          class="input p-2"
          type="text"
          bind:value={res.id}
          on:input={() => (res.id = res.id.replace(/[^a-zA-Z0-9-_]/g, ''))}
          placeholder="bookmark"
        />
      </label>
    {/if}

    <footer class="modal-footer {parent.regionFooter}">
      <!--button-->
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="btn variant-filled-secondary"
          on:click={() => onFormSubmit}>SAVE</button
        >

        <button
          type="button"
          class="btn variant-filled-surface p-2"
          on:click={parent.onClose}>{parent.buttonTextCancel}</button
        >
      </div>
    </footer>
  </div>
{/if}
