import { writable } from 'svelte/store';
import type{Event}from 'nostr-tools';


export const bookmarkEvents = writable<Event[]>([]);
export const noteEvents = writable<Event[]>([]);
export const profileEvents = writable<Event[]>([]);