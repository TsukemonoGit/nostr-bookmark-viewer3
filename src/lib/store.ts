import { writable } from "svelte/store";
import type { Event } from "nostr-tools";

export const bookmarkEvents = writable<Event[]>([]);
export const privateBookmarks = writable<string[]>([]);
export const privateTags = writable<{ tags: string[][] }[]>([]);
export const plainPrivateText = writable<(string | boolean)[]>([]);

export const noteEvents = writable<Event[]>([]);
export const profileEvents = writable<Event[]>([]);

export const tabSet = writable(0);
export const tags = writable<string[]>([]);
export const pubkey = writable("");
export const relays = writable<string[]>([]);

export const nowProgress = writable(false);
export const bkm = writable("");

export const isMulti = writable(false);
export const checkedTags = writable<number[]>([]);

//イベント内容検索用リレーたち
export const RelaysforSearch = [
  "wss://relay.nostr.band",
  "wss://nostr.wine",
  "wss://relay.damus.io",
  "wss://yabu.me",
  "wss://universe.nostrich.land",
  //"wss://nos.lol",
  //"wss://nostream.localtest.me",
  //"ws://localhost:7000",
];
export const isPageOwner = writable(false);
