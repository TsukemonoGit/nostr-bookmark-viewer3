<script lang="ts">
  import { extractTextParts, type TextPart } from '$lib/content';
  import { modalStore, type ModalComponent } from '@skeletonlabs/skeleton';
  import ModalImage from './ModalImage.svelte';
  import { nip19 } from 'nostr-tools';
  import { RelaysforSearch } from '$lib/store';
  import { Metadata, Nostr, NostrApp, Text } from 'nosvelte';
  import ModalCopyPubkey from './ModalCopyPubkey.svelte';

  export let text: string;
  export let tag: string[][];

  const imageModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalImage,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };

  function handleClickImage(str: string | undefined) {
    if (typeof str === 'string') {
      const modal = {
        type: 'component' as const,
        image: str,
        component: imageModalComponent,
      };
      modalStore.trigger(modal);
    }
  }

  //-------------------------------プロフィール表示
  const pubkeyModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalCopyPubkey,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };

  function handleClickPubkey(metadata: Nostr.Event<number>, pubkey: string) {
    console.log(metadata);

    const modal = {
      type: 'component' as const,
      //  flyX: x,
      //  flyY: y,
      value: {
        //    position: `x-${clientX} y-${clientY}`,

        metadata: metadata,
        pubkey: pubkey,
      },
      component: pubkeyModalComponent,
    };
    modalStore.trigger(modal);
  }

  //でこーどできるかちぇっく
  function decodeCheck(str: string): boolean {
    try {
      nip19.decode(str);
      return true;
    } catch (error) {
      return false;
    }
  }
</script>

{#await extractTextParts(text, tag)}
  {text}
{:then viewContent}
  <div class="parent-container break-all whitespace-pre-wrap">
    {#each viewContent as item, index}
      {#if item.type === 'newline'}
        <br />
      {:else if item.type === 'space'}
        &nbsp;
      {:else if item.type === 'emoji'}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="{item.marquee} w-[fit-content] break-all whitespace-pre-wrap inline-flex flex align-bottom"
        >
          {#if item.beforeSpace}{Array(item.beforeSpace)
              .fill('\u00A0')
              .join('')}{/if}
          <img
            class="max-h-[1.5em] inline object-contain align-bottom"
            src={item.url}
            alt=""
            on:click={() => handleClickImage(item.url)}
          />
        </div>
      {:else if item.type === 'url'}
        <div
          class="{item.marquee} w-[fit-content] break-all whitespace-pre-wrap inline-flex flex"
        >
          {#if item.beforeSpace}{Array(item.beforeSpace)
              .fill('\u00A0')
              .join('')}{/if}
          <a class="anchor" href={item.content} target="_blank">
            {#if item.content.length > 80}
              {item.content.slice(0, 75)}...
            {:else}
              {item.content}
            {/if}
          </a>
        </div>
      {:else if item.type === 'image'}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class=" {item.marquee} w-[fit-content] inline-flex">
          {#if item.beforeSpace}{Array(item.beforeSpace)
              .fill('\u00A0')
              .join('')}{/if}
          <img
            class="max-h-[10em] object-contain"
            src={item.content}
            alt=""
            on:click={() => handleClickImage(item.content)}
          />
        </div>
      {:else if item.type === 'nostr' && item.url}
        {#if decodeCheck(item.url)}
          {#if nip19.decode(item.url).type === 'note'}
            <div
              class="card border border-surface-400 bg-surface-200/50 p-2 my-1"
            >
              <div
                class="grid grid-cols-[auto_1fr] gap-1"
                style="margin-bottom:-25px"
              >
                <Text
                  queryKey={[nip19.decode(item.url).data]}
                  id={nip19.decode(item.url).data}
                  let:text
                >
                  <Metadata
                    queryKey={['metadata', text.pubkey]}
                    pubkey={text.pubkey}
                    let:metadata
                  >
                    {#if JSON.parse(metadata.content).picture}
                      <img
                        class="w-8 object-contain justify-center"
                        src={JSON.parse(metadata.content).picture}
                        alt="avatar"
                      />
                    {/if}
                    <div>
                      {JSON.parse(metadata.content).display_name}
                      <button
                        class="text-sm text-blue-600/50"
                        on:click={() => {
                          handleClickPubkey(metadata, text.pubkey);
                        }}
                        >@{JSON.parse(metadata.content).name}
                      </button>

                      <div class="max-h-48 overflow-auto">{text.content}</div>
                    </div>
                  </Metadata>
                </Text>
              </div>
            </div>
          {:else if nip19.decode(item.url).type === 'nevent'}
            <div class="card border border-surface-400 bg-surface-200/50 p-2">
              <div
                class="grid grid-cols-[auto_1fr] gap-1"
                style="margin-bottom:-25px"
              >
                <Text
                  queryKey={[nip19.decode(item.url).data.id]}
                  id={nip19.decode(item.url).data.id}
                  let:text
                >
                  <Metadata
                    queryKey={['metadata', text.pubkey]}
                    pubkey={text.pubkey}
                    let:metadata
                  >
                    {#if JSON.parse(metadata.content).picture}
                      <img
                        class="w-8 object-contain justify-center"
                        src={JSON.parse(metadata.content).picture}
                        alt="avatar"
                      />
                    {/if}
                    <div>
                      {JSON.parse(metadata.content).display_name}
                      <button
                        class="text-sm text-blue-600/50"
                        on:click={() => {
                          handleClickPubkey(metadata, text.pubkey);
                        }}
                        >@{JSON.parse(metadata.content).name}
                      </button>

                      <div class="max-h-48 overflow-auto">{text.content}</div>
                    </div>
                  </Metadata>
                </Text>
              </div>
            </div>
          {:else if nip19.decode(item.url).type === 'npub'}
            <Metadata
              queryKey={['metadata', nip19.decode(item.url).data]}
              pubkey={nip19.decode(item.url).data}
              let:metadata
            >
              <button
                class="inline-flex text-sm text-black/80"
                on:click={() => {
                  handleClickPubkey(metadata, nip19.decode(item.url).data);
                }}
              >
                @<u>{JSON.parse(metadata.content).name}</u>
              </button>
            </Metadata>
          {:else if nip19.decode(item.url).type === 'nprofile'}
            <Metadata
              queryKey={['metadata', nip19.decode(item.url).data.pubkey]}
              pubkey={nip19.decode(item.url).data.pubkey}
              let:metadata
            >
              <button
                class="inline-flex text-sm text-black/80"
                on:click={() => {
                  handleClickPubkey(
                    metadata,
                    nip19.decode(item.url).data.pubkey,
                  );
                }}
              >
                @<u>{JSON.parse(metadata.content).name}</u>
              </button>
            </Metadata>
          {:else if nip19.decode(item.url).type === 'naddr'}
            <span class="text-black/80">
              {item.url.slice(0, 20)}...
            </span>
          {/if}
        {:else}
          <span class="text-black/80"> {item.content}</span>
        {/if}
      {:else if item.content.length > 0}
        <div
          class="{item.marquee}
                          break-all
                          whitespace-pre-wrap w-[fix-content
                          ] inline-flex"
        >
          {#if item.beforeSpace}{Array(item.beforeSpace)
              .fill('\u00A0')
              .join('')}{/if}
          {item.content}
        </div>
      {/if}
    {/each}
  </div>
{/await}