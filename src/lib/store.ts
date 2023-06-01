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
