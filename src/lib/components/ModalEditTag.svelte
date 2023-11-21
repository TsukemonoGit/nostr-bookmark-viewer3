<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { Kinds, bookmarkEvents } from '$lib/store';

  // Props
  /** Exposes parent props to this component. */
  export let parent: any;
  export let selectedValue: number;

  // Stores
  import {
    Accordion,
    AccordionItem,
    ListBox,
    ListBoxItem,
    TabGroup,
    type ToastSettings,
  } from '@skeletonlabs/skeleton';
  import { modalStore, toastStore } from '$lib/store';

  let selectKind: Kinds = Kinds.kind10003;
  // Form Data
  let res: {
    value: string; //新規タグの名前
    btn: string; //作るか消すか動かすか
    tagIndex: number; //削除するタグのインデックス
    id: string; //10003から移行するときのタグしてい
    kind: Kinds; //どこに動かすか
  } = {
    value: '',
    btn: '',
    tagIndex: 0,
    id: '',
    kind: selectKind,
  };

  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    if (res.tagIndex === undefined) {
      res.tagIndex = 0;
    }
    res.kind = selectKind;
    if ($modalStore[0].response) $modalStore[0].response(res);

    modalStore.close();
  }

  function handleChange() {
    console.log(selectedValue);
    res.tagIndex = selectedValue;
  }

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4';
  const cHeader = 'text-2xl font-bold';
  // const cForm =
  //   'border border-surface-500 p-4 space-y-4 rounded-container-token';
  const nowkind: Kinds = $modalStore[0].value.nowkind;
  function clickAddButton() {
    // Trim the input value to remove leading and trailing spaces
    res.value = res.value.trim();
    console.log(res.value.length);
    //有効なタグ名かチェック
    if (res.value === '') {
      const t = {
        message: 'タグ名を入力してください',
        timeout: 3000,
        background: 'variant-filled-error',
      };

      toastStore.trigger(t);
    } else if (res.value.length > 30) {
      const t = {
        message: 'タグ名が長すぎます',
        timeout: 3000,
        background: 'variant-filled-error',
      };

      toastStore.trigger(t);
    } else if (
      $bookmarkEvents[nowkind].some((item) => item.tags[0][1] === res.value)
    ) {
      const t = {
        message: '同じ名前のタグが既に存在します',
        timeout: 3000,
        background: 'variant-filled-error',
      };

      toastStore.trigger(t);
    } else {
      // 有効なタグ名の処理
      res.btn = 'add';
      onFormSubmit();
    }
  }

  // function clickDeleteButton() {
  //   //ほんとに消すのか出す
  //   const t: ToastSettings = {
  //     message: `Are you sure you delete  tag [${
  //       $bookmarkEvents[res.tagIndex].tags[0][1]
  //     }]?`,
  //     timeout: 10000,
  //     background: 'variant-filled-warning',
  //     action: {
  //       label: 'Delete',

  //       response: async () => {
  //         res.btn = 'delete';
  //         onFormSubmit();
  //       },
  //     },
  //   };

  //   toastStore.trigger(t);
  // }
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <!-- <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header> -->
    <Accordion autocollapse>
      {#if nowkind !== Kinds.kind10003}
        <AccordionItem open>
          <svelte:fragment slot="lead">🗒</svelte:fragment>
          <svelte:fragment slot="summary"
            >{$_('modal.editTag.make')}
          </svelte:fragment>
          <svelte:fragment slot="content">
            <article class="body">
              {$modalStore[0].body ?? '(body missing)'}
            </article>
            <!-- Enable for debugging: -->

            <input
              class="input p-2"
              type="text"
              bind:value={res.value}
              placeholder="bookmark"
            />

            <!-- prettier-ignore -->
            <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={clickAddButton}>Create List</button>
    </footer>
          </svelte:fragment>
        </AccordionItem>
      {/if}
      {#if $modalStore[0].value.event}
        <AccordionItem open={nowkind === Kinds.kind10003}>
          <svelte:fragment slot="lead">🔖</svelte:fragment>
          <svelte:fragment slot="summary"
            >{$_('modal.editTag.moveKind')}
          </svelte:fragment>
          <svelte:fragment slot="content">
            <article class="body">
              {$modalStore[0].value.nowkind === Kinds.kind10003
                ? $_('kind.10003.title')
                : $modalStore[0].value.nowkind === Kinds.kind30003
                ? $_('kind.30003.title')
                : $_('kind.30001.title')} (kind:{$modalStore[0].value.nowkind}) {$modalStore[0]
                .value.event.tags[0][0] === 'd'
                ? ` id:${$modalStore[0].value.event.tags[0][1]}`
                : ''}<br />
              {$_('modal.kindMove.body')}
              <p>
                {@html $_('modal.kindMove.warning')}
              </p>
              {#if $modalStore[0].value.nowkind !== 10003}<p>
                  {@html $_('modal.kindMove.warning1')}
                </p>
              {/if}
            </article>

            <div class="grid grid-cols-[1fr_auto] gap-4">
              <div class="h-full flex flex-col">
                <p class=" font-bold">
                  Select({$_('modal.kindMove.migration')})
                </p>
                <ListBox
                  class="border border-surface-500 p-4 rounded-container-token flex-grow break-keep"
                  spacing="divide-y divide-solid space-y-1"
                >
                  {#each [Kinds.kind10003, Kinds.kind30003, Kinds.kind30001] as kind, index}
                    {#if kind !== $modalStore[0].value.nowkind}
                      <ListBoxItem
                        bind:group={selectKind}
                        name={kind.toString()}
                        value={kind}
                        ><div class="text-xs">kind:{kind}</div>
                        {kind === Kinds.kind10003
                          ? $_('kind.10003.title')
                          : kind === Kinds.kind30003
                          ? $_('kind.30003.title')
                          : $_('kind.30001.title')}</ListBoxItem
                      >
                    {/if}
                  {/each}
                </ListBox>
              </div>

              <!-- <div
                class="my-1 bg-surface-500-400-token border rounded-lg border-surface-500 px-3 py-1 flex flex-col overflow-x-hidden"
              >
                <p class=" text-white">EVENT JSON</p>

                <div
                  class="bg-surface-50-900-token break-words whitespace-pre-wrap max-h-36 max-w-sm overflow-auto"
                >
                  {JSON.stringify($modalStore[0].value.event, undefined, 4)}
                </div>
                <p class="text-right text-white">
                  kind:{$modalStore[0].value.nowkind}
                  {$modalStore[0].value.event.tags[0][0] === 'd'
                    ? `,  identifier:${$modalStore[0].value.event.tags[0][1]}`
                    : ''}
                </p>
              </div> -->
            </div>

            <!--もし10003からほかのリプレイス度イベントのとこに移動させるときはdタグを作成-->
            {#if $modalStore[0].value.nowkind === 10003}
              <label class="label flex-1">
                <span class="font-bold">{$_('modalEditTag.list.ID')}</span>
                <input
                  class="input p-2"
                  type="text"
                  bind:value={res.id}
                  on:input={() =>
                    (res.id = res.id.replace(/[^a-zA-Z0-9-_]/g, ''))}
                  placeholder="bookmark"
                />
              </label>
            {/if}

            <div class="text-sm card p-1">
              <p>kind:{selectKind}</p>
              <div class="ml-2">
                {@html selectKind === Kinds.kind10003
                  ? $_('kind.10003.exp')
                  : selectKind === Kinds.kind30003
                  ? $_('kind.30003.exp')
                  : $_('kind.30001.exp')}
              </div>
            </div>

            <footer class="modal-footer {parent.regionFooter}">
              <!--button-->
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  class="btn variant-filled-secondary"
                  on:click={() => {
                    res.btn = 'kindMove';
                    onFormSubmit();
                  }}>OK</button
                >

                <button
                  type="button"
                  class="btn variant-filled-surface p-2"
                  on:click={parent.onClose}>{parent.buttonTextCancel}</button
                >
              </div>
            </footer>
          </svelte:fragment>
        </AccordionItem>
      {/if}
      {#if $bookmarkEvents[$modalStore[0].value.nowkind].length > 0}
        <AccordionItem>
          <svelte:fragment slot="lead">🗑</svelte:fragment>
          <svelte:fragment slot="summary"
            >{$_('modal.editTag.delete')}
          </svelte:fragment>
          <svelte:fragment slot="content">
            <article class="whitespace-pre-wrap break-words">
              {@html $_('ModalEditTag.delete_body')}
            </article>
            <select
              class="select"
              size="1"
              bind:value={selectedValue}
              on:change={handleChange}
            >
              {#each $bookmarkEvents[nowkind] as tag, index}
                <option value={index}
                  >{tag.tags[0][0] === 'd' ? tag.tags[0][1] : nowkind}</option
                >
              {/each}
            </select>
            <!-- prettier-ignore -->
            <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
           
            <button class="btn variant-filled-warning" on:click={ ()=> {res.btn = 'delete';
       onFormSubmit();}}>Delete List</button>
        </footer>
          </svelte:fragment>
        </AccordionItem>
      {/if}
    </Accordion>
  </div>
{/if}
