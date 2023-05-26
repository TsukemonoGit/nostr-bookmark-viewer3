import { type Event, type Filter, nip19, SimplePool } from "nostr-tools";

export function pubToHex(pubkey: string) {
  let res: string;
  if (pubkey.startsWith("npub1")) {
    try {
      res = nip19.decode(pubkey).data.toString();
    } catch (error) {
      throw new Error("error");
    }
  } else {
    //hexのただしそうか確認の方法わからんち
    //とりあえずencodeできるかでチェックしてみる
    try {
      const test = nip19.npubEncode(pubkey);
      res = pubkey;
    } catch (error) {
      throw new Error("error");
    }
  }
  return res;
}

export async function getEvent(relays: string[], filter: Filter<number>[]) {
  const chunkSize = 1000;
  if (filter.length > chunkSize) {
    const result = [];
    for (let i = 0; i < filter.length; i += chunkSize) {
      result.push(filter.slice(i, i + chunkSize));
    }
    filter=result[0];
  }

  const pool = new SimplePool();
  const list = pool.list(relays, filter);
  const result = await list.then((event) => {
    console.log(event);
    return event;
  });
  list.catch((reason) => {
    console.log(reason);
  });
  list.finally(() => {
    console.log("finally");
  });
  if (result != null && result.length > 0) {
    let result2;
    if( filter[0].kinds && filter[0].kinds[0]===30001){
        result2 = removeDuplicateTags(result);
    } else{
        result2 = removeDuplicateEvents(result);
    }
    return result2;
  } else {
    return [];
  }
}

const removeDuplicateTags = (items: Event[]): Event[] => {

  const tagMap: Map<string, Event> = new Map();

  for (const item of items) {
    const tag = item.tags[0][1];
    if (tagMap.has(tag)) {
      const existingItem = tagMap.get(tag) as Event;
      if (item.created_at > existingItem.created_at) {
        tagMap.set(tag, item);
      }
    } else {
      tagMap.set(tag, item);
    }
  }

  return Array.from(tagMap.values());
};




function removeDuplicateEvents(events: Event[]): Event[] {
    const uniqueEvents: Event[] = [];
    const idSet: Set<string> = new Set();
  
    for (const event of events) {
      if (!idSet.has(event.id)) {
        uniqueEvents.push(event);
        idSet.add(event.id);
      }
    }
  
    return uniqueEvents;
  }