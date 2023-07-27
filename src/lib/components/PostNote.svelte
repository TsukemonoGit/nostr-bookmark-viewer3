<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton';

  export let parent: any;
  let checked: boolean;
  let contents = {
    //id:'',
    pubkey: $modalStore[0].value.pubkey ? $modalStore[0].value.pubkey : '',
    //created_at:,
    kind: 1,
    tags: $modalStore[0].value.tags,
    content: $modalStore[0].value.content,
    //sig:''
  };
  $: contents.content = res.content;

  let res = {
    content: $modalStore[0].value.content,
    tags: $modalStore[0].value.tags,
  };

  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    if (res.content === undefined) {
      res.content = '';
    }
    res.content = res.content.trim();
    if (checked) {
      res.tags = [['p', contents.pubkey, '', 'mention'], ...contents.tags];
    }
    if ($modalStore[0].response) $modalStore[0].response(res);

    modalStore.close();
  }

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4';
  const cHeader = 'text-2xl font-bold';
  // const cForm =
  //   'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
    <article class="body">{$modalStore[0].body ?? '(body missing)'}</article>
    <!-- Enable for debugging: -->

    <label class="label break-all whitespace-pre-wrap">
      <textarea
        class="textarea"
        rows="5"
        placeholder=""
        bind:value={res.content}
      />
      {#if contents.pubkey !== ''}
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" bind:checked />
          <p>引用元のpタグを含める</p>
        </label>
      {/if}

      <div class="break-all text-sm">
        <b>kind:</b>
        {contents.kind}<br />
        <b>content:</b><br />
        <span class="whitespace-pre-wrap"> {contents.content}</span><br />
        <b>tags:</b><br />
        {#if checked}
          [p,{contents.pubkey},,mention],<br />
        {/if}[{contents.tags}]
      </div>
      <!-- prettier-ignore -->
      <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
          <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Post Note</button>
        </footer>
    </label>
  </div>
{/if}
