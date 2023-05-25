import { type Filter, nip19, SimplePool ,type Event} from "nostr-tools";

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
  const pool = new SimplePool();
  const list = pool.list(relays, filter);
  const result = await list.then((event) => {
    return event;
  });
  list.catch((reason) => {
    console.log(reason);
  });
  list.finally(() => {
    console.log("finally");
  });

  const result2 = removeDuplicateTags(result);
  return result2;
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