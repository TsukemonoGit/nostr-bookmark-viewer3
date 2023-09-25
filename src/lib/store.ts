import { writable } from 'svelte/store';
import type { Nostr } from 'nosvelte';
import type { TextPart } from './content';

export const bookmarkEvents = writable<Nostr.Event<number>[]>([]);
export const nowProgress = writable<boolean>(false);
export const RelaysforSearch = [
  'wss://relay.nostr.band',
  // 'wss://nostr.wine',
  //'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.nostr.wirednet.jp',
  'wss://relayable.org',
  //'wss://relay-jp.nostr.wirednet.jp',
  //'wss://yabu.me',

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

export interface NaddrStore {
  [naddr: string]: Nostr.Event<number>;
}
interface ContentStore {
  [id: string]: TextPart[];
}
export const ogpStore = writable<OgpList>({});
export const naddrStore = writable<NaddrStore>({});
export const contentStore = writable<ContentStore>({});
export const allView = writable<boolean>(false);
export const pageNprofile = writable<string>('');
//export const previousPage = writable<string>();
export const searchRelays = writable<string[]>([]);
