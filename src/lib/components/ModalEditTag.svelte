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
    create: {
      id: string;
      title?: string;
      image?: string;
      description?: string;
    }; //新規タグの名前
    edit: { title?: string; image?: string; description?: string }; //タグの情報の修正
    btn: string; // add, edit, delete kindMove 作るか消すか動かすか編集するか
    tagIndex: number; //削除するタグのインデックス

    id: string; //10003から移行するときのタグしてい
    kind: Kinds; //どこに動かすか
  } = {
    create: { id: '' },
    edit: {},
    btn: '',
    tagIndex: 0,
    id: '',
    kind: selectKind,
  };
  let showModal = $modalStore[0].value?.nowkind as Kinds;

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
    res.create.id = res.create.id.trim();
    console.log(res.create.id.length);
    //有効なタグ名かチェック
    if (res.create.id === '') {
      const t = {
        message: 'タグ名を入力してください',
        timeout: 3000,
        background: 'variant-filled-error',
      };

      toastStore.trigger(t);
    } else if (res.create.id.length > 30) {
      const t = {
        message: 'タグ名が長すぎます',
        timeout: 3000,
        background: 'variant-filled-error',
      };

      toastStore.trigger(t);
    } else if (
      $bookmarkEvents[nowkind].some((item) => item.tags[0][1] === res.create.id)
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
  if ($modalStore[0]?.value?.event?.tags?.length > 0) {
    // 初期化
    res.edit = {
      title: '',
      image: '',
      description: '',
    };

    const tmpt = $modalStore[0].value.event.tags.find(
      (item: string[]) => item[0] === 'title',
    );
    if (tmpt) {
      res.edit.title = tmpt[1];
    }

    const tmpi = $modalStore[0].value.event.tags.find(
      (item: string[]) => item[0] === 'image',
    );
    if (tmpi) {
      res.edit.image = tmpi[1];
    }

    const tmpd = $modalStore[0].value.event.tags.find(
      (item: string[]) => item[0] === 'description',
    );
    if (tmpd) {
      res.edit.description = tmpd[1];
    }
  }

  function clickEditButton() {
    res.btn = 'edit';
    onFormSubmit();
  }
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

            <label class="label">
              <span>{$_('modalEditTag.list.ID')}</span>
              <input
                class="input p-2"
                type="text"
                bind:value={res.create.id}
                on:input={() =>
                  (res.create.id = res.create.id.replace(
                    /[^a-zA-Z0-9-_]/g,
                    '',
                  ))}
                placeholder={'bookmark'}
              />
            </label>

            <div class="mt-4">{$_('modalEditTag.list.title')}</div>

            <div class=" card p-4">
              <label class="label">
                <span>title</span>
                <input
                  class="input p-2"
                  type="text"
                  bind:value={res.create.title}
                  placeholder="Books"
                />
              </label>

              <label class="label">
                <span>image</span>
                <input
                  class="input p-2"
                  type="text"
                  bind:value={res.create.image}
                  placeholder="https://example.com/image.webp"
                />
              </label>

              <label class="label">
                <span>description</span>
                <textarea
                  class="textarea"
                  rows="3"
                  bind:value={res.create.description}
                  placeholder="Recommended Books Collection"
                />
              </label>
            </div>

            <footer class="modal-footer {parent.regionFooter}">
              <button
                class="btn {parent.buttonNeutral}"
                on:click={parent.onClose}>{parent.buttonTextCancel}</button
              >
              <button
                class="btn {parent.buttonPositive}"
                on:click={clickAddButton}>Create List</button
              >
            </footer>
          </svelte:fragment>
        </AccordionItem>
      {/if}

      <!--修正の方-->
      {#if nowkind !== Kinds.kind10003 && $modalStore[0].value.event && $modalStore[0].value.event.tags.length > 0}
        <AccordionItem>
          <svelte:fragment slot="lead">📝</svelte:fragment>
          <svelte:fragment slot="summary"
            >{$_('modal.editTag.edit.title')}
          </svelte:fragment>
          <svelte:fragment slot="content">
            <div class="p-1">
              <!-- <article class="body">
              {$_('modal.editTag.edit.body')}
            </article> -->
              <!-- Enable for debugging: -->

              <div>
                kind:{$modalStore[0].value.event?.kind}, {$modalStore[0].value
                  .event.tags[0][0] === 'd'
                  ? ` ID:${$modalStore[0].value.event.tags[0][1]}`
                  : ''}
              </div>

              <div class=" card p-4">
                <label class="label">
                  <span>title</span>
                  <input
                    class="input p-2"
                    type="text"
                    bind:value={res.edit.title}
                  />
                </label>

                <label class="label">
                  <span>image</span>
                  <input
                    class="input p-2"
                    type="text"
                    bind:value={res.edit.image}
                  />
                </label>

                <label class="label">
                  <span>description</span>
                  <textarea
                    class="textarea"
                    rows="3"
                    bind:value={res.edit.description}
                  />
                </label>
              </div>

              <footer class="modal-footer {parent.regionFooter}">
                <button
                  class="btn {parent.buttonNeutral}"
                  on:click={parent.onClose}>{parent.buttonTextCancel}</button
                >
                <button
                  class="btn {parent.buttonPositive}"
                  on:click={clickEditButton}>Update</button
                >
              </footer>
            </div>
          </svelte:fragment>
        </AccordionItem>
      {/if}
      {#if $modalStore[0].value.event && $modalStore[0].value.event.tags.length > 0}
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
                .value.event.tags.length > 0 &&
              $modalStore[0].value.event.tags[0][0] === 'd'
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
      {#if $bookmarkEvents[showModal].length > 0}
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
                  >{tag.tags.length > 0 && tag.tags[0][0] === 'd'
                    ? tag.tags[0][1]
                    : `kind:${nowkind}`}</option
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
