<script lang="ts">
  import { bookmarkEvents } from '$lib/store';

  // Props
  /** Exposes parent props to this component. */
  export let parent: any;
  export let selectedValue: number;

  // Stores
  import {
    TabGroup,
    modalStore,
    toastStore,
    type ToastSettings,
  } from '@skeletonlabs/skeleton';

  // Form Data
  let res = {
    value: '',
    btn: '',
    tagIndex: 0,
  };

  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    if (res.tagIndex === undefined) {
      res.tagIndex = 0;
    }
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

  function clickAddButton() {
    //有効なタグ名かチェック
    if (res.value === '') {
      const t = {
        message: 'タグ名を入力してください',
        timeout: 3000,
        background: 'variant-filled-error',
      };

      toastStore.trigger(t);
    } else if ($bookmarkEvents.some((item) => item.tags[0][1] === res.value)) {
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

  function clickDeleteButton() {
    //ほんとに消すのか出す
    const t: ToastSettings = {
      message: `Are you sure you delete  tag [${
        $bookmarkEvents[res.tagIndex].tags[0][1]
      }]?`,
      timeout: 10000,
      background: 'variant-filled-warning',
      action: {
        label: 'Delete',

        response: async () => {
          res.btn = 'delete';
          onFormSubmit();
        },
      },
    };

    toastStore.trigger(t);
  }
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
    <article class="body">{$modalStore[0].body ?? '(body missing)'}</article>
    <!-- Enable for debugging: -->

    <input
      class="input p-2"
      type="text"
      bind:value={res.value}
      placeholder="tag name"
    />

    <!-- prettier-ignore -->
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={clickAddButton}>Add Tag</button>
    </footer>
    <article class="whitespace-pre-wrap break-words">
      Select <strong>Delete</strong> Tag
    </article>
    <select
      class="select"
      size="1"
      bind:value={selectedValue}
      on:change={handleChange}
    >
      {#each $bookmarkEvents as tag, index}
        <option value={index}>{tag.tags[0][1]}</option>
      {/each}
    </select>
    <!-- prettier-ignore -->
    <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
           
            <button class="btn variant-filled-warning" on:click={clickDeleteButton}>Delete Tag</button>
        </footer>
  </div>
{/if}
