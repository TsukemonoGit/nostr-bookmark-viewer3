<script lang="ts">
  import { _ } from 'svelte-i18n';
  // Props
  /** Exposes parent props to this component. */
  export let parent: any;
  import { modalStore, toastStore } from '$lib/store';
  // Stores
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
  import {
    checkInput,
    isOneDimensionalArray,
    publishEvent,
  } from '$lib/functions';
  import type { Nostr } from 'nosvelte';

  // Form Data
  const res: { btn: string; tag: string[] } = {
    btn: 'pub',

    tag: [],
  };

  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    if ($modalStore[0].response) $modalStore[0].response(res);
    modalStore.close();
  }

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4';
  const cHeader = 'text-2xl font-bold';
  //const cForm =
  //  'border border-surface-500 p-4 space-y-4 rounded-container-token';
  let noteinput: string;

  async function checkValue() {
    const check = await checkInput(noteinput);
    if (check.error && typeof check.value === 'string') {
      const t = {
        message: check.value,
        timeout: 3000,
        background: 'bg-orange-500 text-white width-filled ',
      };

      toastStore.trigger(t);
      //		$nowProgress = false;
      return;
    } else {
      res.tag = check.value as string[];
      onFormSubmit();
    }
  }

  let tagvalue: string = '';

  function checkTagInput() {
    try {
      const tagArray = JSON.parse(tagvalue);
      if (!isOneDimensionalArray(tagArray)) {
        throw new Error();
      }

      //validtagかちぇっく
      if (
        $modalStore[0].value.kind ||
        !tagArray ||
        !['a', 'e', 'r', 't'].includes(tagArray[0])
      ) {
        throw new Error();
      }
      res.tag = tagArray;
      //タグが大丈夫そうだったら
      onFormSubmit();
    } catch (error) {
      const t = {
        message: $_('toast.invalidtag'),
        timeout: 3000,
        background: 'bg-orange-500 text-white width-filled ',
      };

      toastStore.trigger(t);
      return;
    }
  }

  let content: string = '';
  async function onClickCreate() {
    //contentのなかみをkind1に書き込みしてたぐにして返す
    const event: Nostr.Event<any> = {
      id: '',
      pubkey: $modalStore[0].value.pubkey,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [],
      content: content,
      sig: '',
    };
    console.log($modalStore[0].value.relays);
    if ($modalStore[0].value.relays.length > 0) {
      const response = await publishEvent(event, $modalStore[0].value.relays);
      if (response.isSuccess) {
        const t = {
          message: response.msg.join('<br>'),
          timeout: 3000,
        };

        toastStore.trigger(t);

        if (response.event) {
          res.tag = ['e', response.event.id]; //追加するノートIDがこれ
          onFormSubmit();
        } else {
          const t = {
            message: 'failed to publish',
            timeout: 3000,
            background: 'bg-orange-500 text-white width-filled ',
          };
          toastStore.trigger(t);
          //		$nowProgress = false;
          return;
        }
      }
    }
  }
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <Accordion autocollapse>
      <AccordionItem open>
        <svelte:fragment slot="lead">🗒</svelte:fragment>
        <svelte:fragment slot="summary"
          >{$_('ModalAddNote.add_note')}</svelte:fragment
        >
        <svelte:fragment slot="content">
          <div class="card p-4">
            <header class={cHeader}>
              🗒 {$_('ModalAddNote.add_note_to1')}{$modalStore[0].title ??
                '(title missing)'}{$_('ModalAddNote.add_note_to2')}
            </header>
            <article class="body">
              {$modalStore[0].body ?? '(body missing)'}
            </article>
            <!-- Enable for debugging: -->

            <input
              class="input p-2 m-2"
              type="text"
              bind:value={noteinput}
              placeholder="note..."
            />

            <!-- prettier-ignore -->
            <footer class=" rid grid-cols-3 gap-2 flex  justify-end mt-2">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn variant-filled-warning {parent.buttonPositive}" on:click={()=>{res.btn='prv';checkValue();}}>Add Private</button>
        <button class="btn {parent.buttonPositive}" on:click={()=>{ res.btn='pub'; checkValue();}}>Add Public</button>
    </footer>
          </div>
        </svelte:fragment>
      </AccordionItem>

      <AccordionItem>
        <svelte:fragment slot="lead">🗒</svelte:fragment>
        <svelte:fragment slot="summary"
          >{$_('ModalAddNote.add_note')}
          {$_('ModalAddNote.add_note_tag')}</svelte:fragment
        >
        <svelte:fragment slot="content">
          <div class="card p-4">
            <header class={cHeader}>
              🗒 {$_('ModalAddNote.add_note_to1')}{$modalStore[0].title ??
                '(title missing)'}{$_('ModalAddNote.add_note_to2')}
              {$_('ModalAddNote.add_note_tag')}
            </header>
            <article class="body break-all">
              {$_('ModalAddNote.example')}[ "a",
              "30030:84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5:mono"
              ]<br />
              Valid tag: a , e , t , r
              <!-- <span class="text-warning-500"
                >{$_('ModalAddNote.caution')}
              </span> -->
            </article>
            <!-- Enable for debugging: -->

            <input
              class="input p-2 m-2"
              type="text"
              bind:value={tagvalue}
              placeholder="[”e”,”1234”]"
            />

            <footer class=" rid grid-cols-3 gap-2 flex justify-end mt-2">
              <button
                class="btn {parent.buttonNeutral}"
                on:click={parent.onClose}>{parent.buttonTextCancel}</button
              >
              <button
                class="btn variant-filled-warning {parent.buttonPositive}"
                on:click={() => {
                  res.btn = 'prv';
                  checkTagInput();
                }}>Add Private</button
              >
              <button
                class="btn {parent.buttonPositive}"
                on:click={() => {
                  res.btn = 'pub';
                  checkTagInput();
                }}>Add Public</button
              >
            </footer>
          </div>
        </svelte:fragment>
      </AccordionItem>

      <AccordionItem>
        <svelte:fragment slot="lead">🖊</svelte:fragment>
        <svelte:fragment slot="summary"
          >{$_('ModalAddNote.create')}
        </svelte:fragment>
        <svelte:fragment slot="content">
          <div class="card p-4">
            <header class={cHeader}>
              🖊 {$_('ModalAddNote.create_to1')}{$modalStore[0].title ??
                '(title missing)'}{$_('ModalAddNote.create_to2')}
            </header>
            <article class="body">{$_('ModalAddNote.create_body')}</article>
            <!-- Enable for debugging: -->

            <textarea
              class="textarea p-2 m-2"
              rows="4"
              bind:value={content}
              placeholder="memo..."
            />

            <footer class=" rid grid-cols-3 gap-2 flex justify-end mt-2">
              <button
                class="btn {parent.buttonNeutral}"
                on:click={parent.onClose}>{parent.buttonTextCancel}</button
              >
              <button
                class="btn variant-filled-warning {parent.buttonPositive}"
                on:click={() => {
                  if (content == '') {
                    return;
                  }
                  res.btn = 'prv';
                  onClickCreate();
                }}>Add Private</button
              >
              <button
                class="btn {parent.buttonPositive}"
                on:click={() => {
                  if (content == '') {
                    return;
                  }
                  res.btn = 'pub';
                  onClickCreate();
                }}>Add Public</button
              >
            </footer>
          </div>
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
  </div>
{/if}
