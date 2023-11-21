import { writable } from 'svelte/store';
import type { Nostr } from 'nosvelte';
import type { TextPart } from './content';
import {
  getModalStore,
  getToastStore,
  type ModalStore,
  type ToastStore,
} from '@skeletonlabs/skeleton';

// Enums
export enum Kinds {
  kind10003 = 10003,
  kind30001 = 30001,
  kind30003 = 30003,
}

// arrow tag
//入れれるタグ制限しようかと思ったけどexpected tag itemsだからそれ以外のタグをブクマに含めたらだめ！というわけではないかも
//https://github.com/nostr-protocol/nips/blob/master/51.md

export const arraysByKind: Record<Kinds, string[]> = {
  [Kinds.kind10003]: ['e', 'a', 't', 'r'],
  [Kinds.kind30001]: [
    'd',
    'title',
    'image',
    'summary',
    'e',
    'a',
    't',
    'r',
    'description',
  ],
  [Kinds.kind30003]: [
    'd',
    'title',
    'image',
    'summary',
    'e',
    'a',
    't',
    'r',
    'description',
  ],
};
// Type for Event
type Event<T> = Nostr.Event<T>;

// Writable type
type WritableBookmarkEvents = Record<Kinds, Event<number>[]>;
// Initial data
const initialBookmarkEvents: WritableBookmarkEvents = {
  [Kinds.kind10003]: [],
  [Kinds.kind30001]: [],
  [Kinds.kind30003]: [],
};

// Writable store
export const bookmarkEvents = writable<WritableBookmarkEvents>(
  initialBookmarkEvents,
);

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
export const pageNprofile = writable<URL>();
//export const previousPage = writable<string>();
export const searchRelays = writable<string[]>([]);

export let modalStore: ModalStore;
export let toastStore: ToastStore;

export function setModalStore() {
  modalStore = getModalStore();
}

export function setToastStore() {
  toastStore = getToastStore();
}
