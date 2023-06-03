interface Window {
  // NIP-07
  nostr: any;
}
declare let window: Window;

import {
  type Event,
  type Filter,
  getEventHash,
  nip19,
  SimplePool,
} from "nostr-tools";

export function decodePublicKeyToHex(pubkey: string): string {
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
      nip19.npubEncode(pubkey);
      res = pubkey;
    } catch (error) {
      throw new Error("error");
    }
  }
  return res;
}

export async function fetchFilteredEvents(
  relays: string[],
  filter: Filter<number>[],
): Promise<Event[]> {
  const chunkSize = 1000;
  if (filter.length > chunkSize) {
    const result = [];
    for (let i = 0; i < filter.length; i += chunkSize) {
      result.push(filter.slice(i, i + chunkSize));
    }
    filter = result[0];
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
    let result2: Event[];
    if (filter[0].kinds && filter[0].kinds[0] === 30001) {
      //同一タグの場合Created_atが新しい方を採用
      result2 = getUniqueEventsByTag(result);
    } else if (filter[0].kinds && filter[0].kinds[0] === 0) {
      //同一pubkeyの場合Created_atが新しい方を採用
      result2 = getUniqueEventsByPubkey(result);
    } else {
      //同一のIDを削除
      result2 = getUniqueEventsById(result);
    }
    return result2;
  } else {
    return [];
  }
}

const getUniqueEventsByTag = (items: Event[]): Event[] => {
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

//
function getUniqueEventsById(events: Event[]): Event[] {
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

const getUniqueEventsByPubkey = (events: Event[]): Event[] => {
  const uniqueEvents: Event[] = [];
  const pubkeySet: Set<string> = new Set();

  for (const event of events) {
    if (!pubkeySet.has(event.pubkey)) {
      uniqueEvents.push(event);
      pubkeySet.add(event.pubkey);
    }
  }

  return uniqueEvents;
};

export async function publishEvent(
  obj: object,
  relays: string[],
): Promise<{ isSuccess: boolean; event: Event; msg: string[] }> {
  let isSuccess = false;
  const msg: string[] = [];

  try {
    const event = await window.nostr.signEvent(obj);
    event.id = getEventHash(event);

    const pool = new SimplePool();
    const pub = pool.publish(relays, event);

    return new Promise((resolve) => {
      const timeoutID = setTimeout(() => {
        resolve({ isSuccess, event, msg });
      }, 5000);

      pub.on("ok", (relay: string) => {
        isSuccess = true;
        msg.push(`[ok]${relay}`);

        if (msg.length == relays.length) {
          clearTimeout(timeoutID);
          resolve({ isSuccess, event, msg });
        }
      });

      pub.on("failed", (relay: string) => {
        msg.push(`[failed]${relay}`);

        if (msg.length == relays.length) {
          clearTimeout(timeoutID);
          resolve({ isSuccess, event, msg });
        }
      });
    });
  } catch (error) {
    //throw new Error("拡張機能が読み込めませんでした");
    throw new Error(error as string);
  }
}

export function validateNoteId(str: string): { value: string; error: boolean } {
  const res = { value: "", error: false };
  //note1はじまりかnevent始まりかだったらデコードしてみる
  if (str.startsWith("note1") || str.startsWith("nevent")) {
    // "note1"で始まる場合の処理
    try {
      const decoded = nip19.decode(str);
      if (decoded.type == "note") {
        res.value = decoded.data;
      } else if (decoded.type == "nevent") {
        res.value = decoded.data.id;
      }

      // デコードに成功した場合の追加処理
    } catch (error) {
      res.error = true;
      console.log("Decoding failed:", error);
      // デコードに失敗した場合の追加処理
    }
  } else {
    // それ以外の場合の処理
    //逆にノートIDに変換できるか確認してみる
    try {
      nip19.noteEncode(str);
      res.value = str;
    } catch {
      res.error = true;
    }
  }
  return res;
}
