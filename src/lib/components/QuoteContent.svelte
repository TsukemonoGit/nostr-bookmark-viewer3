<script lang="ts">
  import { extractTextParts, type TextPart } from '$lib/content';
  import { modalStore, type ModalComponent } from '@skeletonlabs/skeleton';
  import ModalImage from './ModalImage.svelte';
  import { nip19 } from 'nostr-tools';

  import { Metadata, Nostr, NostrApp, Text } from 'nosvelte';
  import ModalCopyPubkey from './ModalCopyPubkey.svelte';
  import { getOgp } from '$lib/functions';
  import OGP from './OGP.svelte';
  import { ogpStore } from '$lib/store';

  import ModalEventJson from './ModalEventJson.svelte';
  import Content from './Content.svelte';

  export let endocedId: string;

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

  //-------------------------------イベントJSON表示
  const jsonModalComponent: ModalComponent = {
    // Pass a reference to your custom component
    ref: ModalEventJson,
    // Add the component properties as key/value pairs
    props: { background: 'bg-red-500' },
    // Provide a template literal for the default component slot
    slot: `<p>Skeleton</p>`,
  };

  function handleClickDate(text: Nostr.Event<number>) {
    console.log('click');
    const modal = {
      type: 'component' as const,
      //  flyX: x,
      //  flyY: y,
      title: 'Event Json',
      value: {
        //    position: `x-${clientX} y-${clientY}`,
        note: text,
      },

      component: jsonModalComponent,
    };
    modalStore.trigger(modal);
  }
</script>

{#if nip19.decode(endocedId).type === 'note' || nip19.decode(endocedId).type === 'nevent'}
  <div class="card border border-surface-400 px-3 py-2 mt-1">
    <div class="w-full grid grid-rows-[auto_auto] gap-0 h-fix">
      <Text
        queryKey={[
          nip19.decode(endocedId).type === 'note'
            ? nip19.decode(endocedId).data
            : nip19.decode(endocedId).data.id,
        ]}
        id={nip19.decode(endocedId).type === 'note'
          ? nip19.decode(endocedId).data
          : nip19.decode(endocedId).data.id}
        let:text
      >
        <div slot="loading">
          <p class="break-all">
            Loading note... ({endocedId})
          </p>
        </div>
        <div slot="error">
          <p class="break-all">
            Failed to get note ({endocedId})
          </p>
        </div>

        <div slot="nodata">
          <p class="break-all">
            Note not found ({endocedId})
          </p>
        </div>

        <Metadata
          queryKey={['metadata', text.pubkey]}
          pubkey={text.pubkey}
          let:metadata
        >
          <div slot="loading">
            <div class=" break-all">
              Loading profile... ({text.pubkey})
            </div>

            <div class="max-h-40 overflow-auto break-all whitespace-pre-wrap">
              <button
                class="text-sm underline decoration-secondary-500"
                on:click={() => {
                  handleClickDate(text);
                }}>{new Date(text.created_at * 1000).toLocaleString()}</button
              >
              <Content text={text.content} tag={text.tags} />
            </div>
          </div>
          <div slot="error">
            <div class=" break-all">
              Failed to get profile ({text.pubkey})
              <button
                class="text-sm underline decoration-secondary-500"
                on:click={() => {
                  handleClickDate(text);
                }}>{new Date(text.created_at * 1000).toLocaleString()}</button
              >
            </div>
            <div class="max-h-40 overflow-auto break-all whitespace-pre-wrap">
              <Content text={text.content} tag={text.tags} />
            </div>
          </div>
          <div slot="nodata">
            <div class=" break-all">
              Profile not found ({text.pubkey})
            </div>
            <div class="max-h-40 overflow-auto break-all whitespace-pre-wrap">
              <Content text={text.content} tag={text.tags} />
            </div>
          </div>
          <div class="w-full grid grid-cols-[auto_auto_1fr_auto] gap-1 h-fix">
            <div>
              {#if JSON.parse(metadata.content).picture}
                <img
                  class="h-5 object-contain justify-center"
                  src={JSON.parse(metadata.content).picture}
                  alt="avatar"
                />
              {/if}
            </div>

            <div class="wi truncate justify-items-end">
              {JSON.parse(metadata.content).display_name}
            </div>
            <div class="truncate wid min-w-[2em] justify-items-end">
              <button
                class="text-emerald-800/60 text-sm"
                on:click={() => {
                  handleClickPubkey(metadata, text.pubkey);
                }}>@<u>{JSON.parse(metadata.content).name}</u></button
              >
            </div>
            <div class="min-w-max">
              <button
                class="text-sm underline decoration-secondary-500"
                on:click={() => {
                  handleClickDate(text);
                }}>{new Date(text.created_at * 1000).toLocaleString()}</button
              >
            </div>
          </div>
          <div class="max-h-40 overflow-auto break-all whitespace-pre-wrap">
            <Content text={text.content} tag={text.tags} />
          </div>
        </Metadata>
      </Text>
    </div>
  </div>
{:else if nip19.decode(endocedId).type === 'npub'}
  <Metadata
    queryKey={['metadata', nip19.decode(endocedId).data]}
    pubkey={nip19.decode(endocedId).data}
    let:metadata
  >
    <button
      class="inline-flex text-sm text-black/80"
      on:click={() => {
        handleClickPubkey(metadata, nip19.decode(endocedId).data);
      }}
    >
      @<u>{JSON.parse(metadata.content).name}</u>
    </button>
  </Metadata>
{:else if nip19.decode(endocedId).type === 'nprofile'}
  <Metadata
    queryKey={['metadata', nip19.decode(endocedId).data.pubkey]}
    pubkey={nip19.decode(endocedId).data.pubkey}
    let:metadata
  >
    <button
      class="inline-flex text-sm text-black/80"
      on:click={() => {
        handleClickPubkey(metadata, nip19.decode(endocedId).data.pubkey);
      }}
    >
      @<u>{JSON.parse(metadata.content).name}</u>
    </button>
  </Metadata>
{:else if nip19.decode(endocedId).type === 'naddr'}
  <span class="text-black/80">
    {endocedId.slice(0, 20)}...
  </span>
{/if}
