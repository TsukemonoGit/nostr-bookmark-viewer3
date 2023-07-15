<script lang="ts">
  import { extractTextParts, type TextPart } from '$lib/content';
  import { modalStore, type ModalComponent } from '@skeletonlabs/skeleton';
  import ModalImage from './ModalImage.svelte';
  import { nip19 } from 'nostr-tools';

  import { Metadata, Nostr, NostrApp, Text } from 'nosvelte';
  import ModalCopyPubkey from './ModalCopyPubkey.svelte';
  import { fetchFilteredEvents, getOgp } from '$lib/functions';
  import OGP from './OGP.svelte';
  import { ogpStore, RelaysforSearch } from '$lib/store';

  import ModalEventJson from './ModalEventJson.svelte';
  import Content from './Content.svelte';
  import { identity } from 'svelte/internal';

  export let encodedId: string;

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

  async function getEvent(
    data:
      | string
      | nip19.AddressPointer
      | nip19.ProfilePointer
      | nip19.EventPointer,
  ) {
    const addressPointer = data as nip19.AddressPointer;

    const relays =
      addressPointer.relays && addressPointer.relays.length > 0
        ? addressPointer.relays
        : RelaysforSearch;
    const filter = [
      {
        authors: [addressPointer.pubkey],
        '#d': [addressPointer.identifier],
        kinds: [addressPointer.kind],
      },
    ];
    const res = await fetchFilteredEvents(relays, filter);
    return res[0];
  }
</script>

{#if nip19.decode(encodedId).type === 'note' || nip19.decode(encodedId).type === 'nevent'}
  <div class="card border border-surface-400 px-3 py-2 mt-1">
    <div class="w-full grid grid-rows-[auto_auto] gap-0 h-fix">
      <Text
        queryKey={[
          nip19.decode(encodedId).type === 'note'
            ? nip19.decode(encodedId).data
            : nip19.decode(encodedId).data.id,
        ]}
        id={nip19.decode(encodedId).type === 'note'
          ? nip19.decode(encodedId).data
          : nip19.decode(encodedId).data.id}
        let:text
      >
        <div slot="loading">
          <div
            class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
          >
            note {encodedId}
          </div>
        </div>
        <div slot="error">
          <div
            class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
          >
            note {encodedId}
          </div>
        </div>

        <div slot="nodata">
          <div
            class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
          >
            note {encodedId}
          </div>
        </div>
        <Metadata
          queryKey={['metadata', text.pubkey]}
          pubkey={text.pubkey}
          let:metadata
        >
          <div slot="loading">
            <div
              class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
            >
              Loading profile... ({text.pubkey})
            </div>

            <div class="max-h-40 overflow-auto break-all whitespace-pre-wrap">
              <button
                class="text-xs underline decoration-secondary-500"
                on:click={() => {
                  handleClickDate(text);
                }}>{new Date(text.created_at * 1000).toLocaleString()}</button
              >
              <Content text={text.content} tag={text.tags} />
            </div>
          </div>
          <div slot="error">
            <div
              class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
            >
              Failed to get profile ({text.pubkey})
              <button
                class="text-xs underline decoration-secondary-500"
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
            <div
              class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
            >
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
                class="text-emerald-800/60 text-xs"
                on:click={() => {
                  handleClickPubkey(metadata, text.pubkey);
                }}>@<u>{JSON.parse(metadata.content).name}</u></button
              >
            </div>
            <div class="min-w-max">
              <button
                class="text-xs underline decoration-secondary-500"
                on:click={() => {
                  handleClickDate(text);
                }}>{new Date(text.created_at * 1000).toLocaleString()}</button
              >
            </div>
          </div>
          {#if text.tags.length > 0}
            {#each text.tags as tag}
              {#if tag[0] === 'p'}
                <Metadata
                  queryKey={['metadata', tag[1]]}
                  pubkey={tag[1]}
                  let:metadata
                >
                  <div slot="loading">
                    <div
                      class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                    >
                      Loading note... ({tag[1]})
                    </div>
                  </div>
                  <div slot="error">
                    <div
                      class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                    >
                      Failed to get note ({tag[1]})
                    </div>
                  </div>

                  <div slot="nodata">
                    <div
                      class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                    >
                      Note not found ({tag[1]})
                    </div>
                  </div>
                  <div
                    class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                  >
                    to[p] <button
                      class="text-emerald-800 whitespace-nowrap overflow-hidden text-ellipsis"
                      on:click={() => {
                        handleClickPubkey(metadata, tag[1]);
                      }}>@<u>{JSON.parse(metadata.content).name}</u></button
                    >
                  </div>
                </Metadata>
              {:else if tag[0] === 'e'}
                <Text queryKey={[tag[1]]} id={tag[1]} let:text>
                  <div slot="loading">
                    <div
                      class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                    >
                      Loading note... ({tag[1]})
                    </div>
                  </div>
                  <div slot="error">
                    <div
                      class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                    >
                      Failed to get note ({tag[1]})
                    </div>
                  </div>

                  <div slot="nodata">
                    <div
                      class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                    >
                      Note not found ({tag[1]})
                    </div>
                  </div>

                  <div
                    class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                  >
                    to[e] <button
                      class="text-emerald-800 whitespace-nowrap overflow-hidden text-ellipsis"
                      on:click={() => {
                        handleClickDate(text);
                      }}>{text.content}</button
                    >
                  </div>
                </Text>
              {:else if tag[0] !== 'emoji' && tag[0] !== 'r' && tag[0] !== 't'}
                <div
                  class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                >
                  [{tag[0]}]
                  {tag[1]}
                </div>
              {/if}
            {/each}
          {/if}
          <div class="max-h-40 overflow-auto break-all whitespace-pre-wrap">
            <Content text={text.content} tag={text.tags} />
          </div>
        </Metadata>
      </Text>
    </div>
  </div>
{:else if nip19.decode(encodedId).type === 'npub'}
  <Metadata
    queryKey={['metadata', nip19.decode(encodedId).data]}
    pubkey={nip19.decode(encodedId).data}
    let:metadata
  >
    <div slot="loading">
      <div
        class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
      >
        {nip19.decode(encodedId).data}
      </div>
    </div>
    <div slot="error">
      <div
        class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
      >
        {nip19.decode(encodedId).data}
      </div>
    </div>

    <div slot="nodata">
      <div
        class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
      >
        {nip19.decode(encodedId).data}
      </div>
    </div>

    <button
      class="inline-flex text-xs text-black/80"
      on:click={() => {
        handleClickPubkey(metadata, nip19.decode(encodedId).data);
      }}
    >
      @<u>{JSON.parse(metadata.content).name}</u>
    </button>
  </Metadata>
{:else if nip19.decode(encodedId).type === 'nprofile'}
  <Metadata
    queryKey={['metadata', nip19.decode(encodedId).data.pubkey]}
    pubkey={nip19.decode(encodedId).data.pubkey}
    let:metadata
  >
    <div slot="loading">
      <div
        class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
      >
        {nip19.decode(encodedId).data.pubkey}
      </div>
    </div>
    <div slot="error">
      <div
        class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
      >
        {nip19.decode(encodedId).data.pubkey}
      </div>
    </div>

    <div slot="nodata">
      <div
        class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
      >
        {nip19.decode(encodedId).data.pubkey}
      </div>
    </div>
    <button
      class="inline-flex text-xs text-black/80"
      on:click={() => {
        handleClickPubkey(metadata, nip19.decode(encodedId).data.pubkey);
      }}
    >
      @<u>{JSON.parse(metadata.content).name}</u>
    </button>
  </Metadata>
{:else if nip19.decode(encodedId).type === 'naddr'}
  <Metadata
    queryKey={['metadata', nip19.decode(encodedId).data.pubkey]}
    pubkey={nip19.decode(encodedId).data.pubkey}
    let:metadata
  >
    <div slot="loading">
      <div
        class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
      >
        {nip19.decode(encodedId).data.pubkey}
      </div>
    </div>
    <div slot="error">
      <div
        class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
      >
        {nip19.decode(encodedId).data.pubkey}
      </div>
    </div>

    <div slot="nodata">
      <div
        class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
      >
        {nip19.decode(encodedId).data.pubkey}
      </div>
    </div>

    <button
      class="inline-flex text-xs text-black/80"
      on:click={() => {
        handleClickPubkey(metadata, nip19.decode(encodedId).data.pubkey);
      }}
    >
      @<u>{JSON.parse(metadata.content).name}</u>
    </button>
  </Metadata>

  {#await getEvent(nip19.decode(encodedId).data)}
    <div
      class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
    >
      {encodedId}
    </div>
  {:then text}
    {#if text}
      <div class="card border border-surface-400 px-3 py-2 mt-1">
        <div class="w-full grid grid-rows-[auto_auto] gap-0 h-fix">
          {#if text.tags.length > 0}
            {#each text.tags as tag}
              {#if tag[0] === 'p'}
                <Metadata
                  queryKey={['metadata', tag[1]]}
                  pubkey={tag[1]}
                  let:metadata
                >
                  <div
                    class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                  >
                    to <button
                      class="text-emerald-800 whitespace-nowrap overflow-hidden text-ellipsis"
                      on:click={() => {
                        handleClickPubkey(metadata, tag[1]);
                      }}>@<u>{JSON.parse(metadata.content).name}</u></button
                    >
                  </div>
                </Metadata>
              {:else if tag[0] === 'e'}
                <Text queryKey={[tag[1]]} id={tag[1]} let:text>
                  <div
                    class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                  >
                    to[e] <button
                      class="text-emerald-800 whitespace-nowrap overflow-hidden text-ellipsis"
                      on:click={() => {
                        handleClickDate(text);
                      }}>{text.content}</button
                    >
                  </div>
                </Text>
              {:else if tag[0] !== 'emoji' && tag[0] !== 'r' && tag[0] !== 't'}
                <div
                  class="-mt-1 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden"
                >
                  [{tag[0]}]
                  {tag[1]}
                </div>
              {/if}
            {/each}
          {/if}
          <div class="max-h-40 overflow-auto break-all whitespace-pre-wrap">
            <Content text={text.content} tag={text.tags} />
          </div>
        </div>
      </div>
    {/if}
  {/await}

  <!-- <span class="text-black/80">
    {encodedId.slice(0, 20)}...
  </span> -->
{/if}
