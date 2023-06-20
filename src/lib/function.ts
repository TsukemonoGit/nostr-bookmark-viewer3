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
import { createRxNostr, createRxOneshotReq, Nostr } from "rx-nostr";
import type { Observer } from "rxjs";

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
  filters: Nostr.Filter[],
): Promise<Nostr.Event[]> {
  const chunkSize = 500;
  let chunkFilters: Nostr.Filter[][] = [];

  if (filters[0].ids && filters[0].ids.length > chunkSize) {
    const { ids, kinds } = filters[0];
    for (let i = 0; i < ids.length; i += chunkSize) {
      const chunkFilter: Nostr.Filter[] = [
        {
          ids: ids.slice(i, i + chunkSize),
          kinds,
        },
      ];
      chunkFilters.push(chunkFilter);
    }
  } else {
    chunkFilters = [filters];
  }

  let resultEvents: Nostr.Event[] = [];

  for (const chunkFilter of chunkFilters) {
    const rxNostr = createRxNostr();
    rxNostr.switchRelays(relays);

    const rxReq = createRxOneshotReq({ filters: chunkFilter });

    // データの購読
    const observable = rxNostr.use(rxReq);

    const eventMap = new Map<string, Nostr.Event>(); // タグIDをキーとするイベントのマップ

    // オブザーバーオブジェクトの作成
    const observer: Observer<any> = {
      next: (packet) => {
        if (
          chunkFilter[0].kinds &&
          chunkFilter[0].kinds[0] === 30001 &&
          packet.event.tags[0][0] === "d"
        ) {
          const tagID = packet.event.tags[0][1];
          const existingEvent = eventMap.get(tagID);
          if (
            !existingEvent ||
            packet.event.created_at > existingEvent.created_at
          ) {
            eventMap.set(tagID, packet.event);
          }
        } else {
          const tagID = packet.event.id;
          const existingEvent = eventMap.get(tagID);
          if (
            !existingEvent ||
            packet.event.created_at > existingEvent.created_at
          ) {
            eventMap.set(tagID, packet.event);
          }
        }
      },
      error: (error) => {
        console.error("Error occurred:", error);
      },
      complete: () => {
        console.log("Subscription completed");
      },
    };

    // 購読開始
    const subscription = observable.subscribe(observer);

    // 10秒後に購読を停止
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);

    // Observable の完了を待つ
    await new Promise<void>((resolve) => {
      subscription.add(() => {
        resolve();
      });
    });

    const events = Array.from(eventMap.values());
    console.log(events);
    resultEvents.push(...events);

    // 次の反復までの待機時間を変更する場合はここにコードを追加
  }

  return resultEvents;
}
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

  // nostr:で始まる場合、その部分をカット
  if (str.startsWith("nostr:")) {
    str = str.slice(6);
  }
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
