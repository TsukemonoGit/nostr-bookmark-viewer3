import { writable } from 'svelte/store';
import type { Nostr } from 'nosvelte';

export const bookmarkEvents = writable<Nostr.Event<number>[]>([]);
export const nowProgress = writable<boolean>(false);
export const RelaysforSearch = [
  'wss://relay.nostr.band',
  'wss://nostr.wine',
  //'wss://relay.damus.io',
  'wss://yabu.me',
  'wss://universe.nostrich.land',
  //"wss://nostream.localtest.me",
  //"ws://localhost:7000",
];
