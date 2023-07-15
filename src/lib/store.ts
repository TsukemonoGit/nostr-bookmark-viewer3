import { writable } from 'svelte/store';
import type { Nostr } from 'nosvelte';

export const bookmarkEvents = writable<Nostr.Event<number>[]>([]);
export const nowProgress = writable<boolean>(false);
export const RelaysforSearch = [
  'wss://relay.nostr.band',
  'wss://nostr.wine',
  //'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://yabu.me',
  'wss://universe.nostrich.land',
  //"wss://nostream.localtest.me",
  //"ws://localhost:7000",
];
interface OgpList {
  [url: string]: {
    title: string;
    image: string;
    description: string;
    favicon: string;
  };
}

interface NaddrStore {
  [naddr: string]: Nostr.Event<number>;
}
export const ogpStore = writable<OgpList>({});
export const naddrStore = writable<NaddrStore>({});
