interface Window {
  // NIP-07
  nostr: any;
}
declare let window: Window;

import {
  getEventHash,
  nip19,
  SimplePool,
  Kind,
  getPublicKey,
  nip04,
  getSignature,
  type UnsignedEvent,
} from 'nostr-tools';
import {
  createRxNostr,
  createRxOneshotReq,
  Nostr,
  uniq,
  verify,
} from 'rx-nostr';

import type { Observer } from 'rxjs';
// import parser from 'html-dom-parser';
// import axios from 'axios';

export function decodePublicKeyToHex(pubkey: string): string {
  let res: string;
  if (pubkey.startsWith('npub1')) {
    try {
      res = nip19.decode(pubkey).data.toString();
    } catch (error) {
      throw new Error('error');
    }
  } else {
    //hexのただしそうか確認の方法わからんち
    //とりあえずencodeできるかでチェックしてみる
    try {
      nip19.npubEncode(pubkey);
      res = pubkey;
    } catch (error) {
      throw new Error('error');
    }
  }
  return res;
}

export async function fetchFilteredEvents(
  relays: string[],
  filters: Nostr.Filter[],
): Promise<Nostr.Event[]> {
  const rxNostr = createRxNostr();
  rxNostr.setRelays(relays);

  const rxReq = createRxOneshotReq({ filters });

  // データの購読
  const observable = rxNostr.use(rxReq).pipe(uniq(), verify());

  const eventMap = new Map<string, any>(); // タグIDをキーとするイベントのマップ

  // オブザーバーオブジェクトの作成
  const observer: Observer<any> = {
    next: (packet) => {
      console.log(packet);
      if (filters[0].kinds) {
        if (
          filters[0].kinds[0] >= 30000 &&
          filters[0].kinds[0] < 40000 &&
          packet.event.tags[0][0] === 'd'
        ) {
          const tagID = packet.event.tags[0][1];
          const existingEvent = eventMap.get(tagID);
          if (
            !existingEvent ||
            packet.event.created_at > existingEvent.created_at
          ) {
            eventMap.set(tagID, packet.event);
          }
        }
      }
    },
    error: (error) => {
      console.error('Error occurred:', error);
    },
    complete: () => {
      console.log('Subscription completed');
    },
  };

  // 購読開始
  const subscription = observable.subscribe(observer);

  // 5秒後に購読を停止
  setTimeout(() => {
    subscription.unsubscribe();
  }, 5 * 1000);

  // Observable の完了を待つ
  await new Promise<void>((resolve) => {
    subscription.add(() => {
      resolve();
    });
  });

  const eventArray: Nostr.Event[] = Array.from(eventMap.values());
  console.log(eventArray);
  return eventArray;
}

export async function checkInput(r: string | boolean): Promise<{
  value: string | string[];
  error: boolean;
}> {
  console.log('response:', r);
  if (r == null || r == false) {
    return { value: '無効なIDかもです', error: true };
  }
  //rが適切なNoteIDなのかどうかのチェック
  //適切であればHexのNoteIdを返してほしい
  const noteId = await validateNoteId(r as string);
  console.log(noteId);

  return noteId;
}

async function validateNoteId(
  str: string,
): Promise<{ value: string[] | string; error: boolean }> {
  const res: { value: string[] | string; error: boolean } = {
    value: '',
    error: false,
  };

  // nostr:で始まる場合、その部分をカット
  if (str.startsWith('nostr:')) {
    str = str.slice(6);
  }
  //note1はじまりかnevent始まりかだったらデコードしてみる
  if (str.startsWith('note1') || str.startsWith('nevent')) {
    // "note1"で始まる場合の処理
    try {
      const decoded = nip19.decode(str);
      if (decoded.type == 'note') {
        res.value = ['e', decoded.data];
      } else if (decoded.type == 'nevent') {
        res.value = ['e', decoded.data.id];
      }

      // デコードに成功した場合の追加処理
    } catch (error) {
      res.error = true;
      res.value = error as string;
      console.log('Decoding failed:', error);
      // デコードに失敗した場合の追加処理
    }
  } else if (str.startsWith('naddr')) {
    try {
      const decoded = nip19.decode(str);
      if (decoded.type == 'naddr') {
        res.value = [
          'a',
          `${decoded.data.kind}:${decoded.data.pubkey}:${decoded.data.identifier}`,
        ];
        return res;
      } else {
        res.error = true;
        return res;
      }
    } catch (error) {
      res.error = true;
      res.value = error as string;
      return res;
    }
  } else {
    // それ以外の場合の処理
    //逆にノートIDに変換できるか確認してみる
    if (/^[0-9a-fA-F]+$/.test(str)) {
      try {
        nip19.noteEncode(str);
        res.value = str;
      } catch (error) {
        res.error = true;
        res.value = error as string;
      }
    } else {
      res.error = true;
      res.value = '無効なIDです';
    }
  }
  console.log(res);
  return res;
}

export async function addNotes(
  relays: string[],
  event: Nostr.Event<number>,
  tags: string[][],
): Promise<{ isSuccess: boolean; event: Nostr.Event; msg: string[] }> {
  event.tags.push(...tags);
  console.log(tags);
  console.log(event);
  const writeEvent: Nostr.Event = {
    id: '',
    pubkey: event.pubkey,
    created_at: Math.floor(Date.now() / 1000),
    kind: event.kind,
    tags: event.tags,
    content: event.content,
    sig: '',
  };
  return await publishEvent(writeEvent, relays);
}

export async function addPrivateNotes(
  relays: string[],
  event: Nostr.Event<number>,
  tags: string[][],
): Promise<{ isSuccess: boolean; event: Nostr.Event; msg: string[] }> {
  let tagList;

  if (event.content.length > 0) {
    try {
      const privateContent = await nip04De(event.pubkey, event.content);
      const parsedContent = JSON.parse(privateContent);
      parsedContent.push(...tags); // 修正: `parsedContent`ではなく`newTags`を追加する
      tagList = parsedContent;
    } catch (error) {
      return {
        msg: ['復号化できませんでした'],
        isSuccess: false,
        event: event,
      };
    }
  } else {
    tagList = tags;
  }

  console.log(tagList);

  const encryptedContent = await nip04De(event.pubkey, JSON.stringify(tagList));

  const writeEvent: Nostr.Event<any> = {
    id: '',
    pubkey: event.pubkey,
    created_at: Math.floor(Date.now() / 1000),
    kind: event.kind,
    tags: event.tags,
    content: encryptedContent,
    sig: '',
  };

  return await publishEvent(writeEvent, relays);
}

export async function publishEvent(
  obj: Event,
  relays: string[],
): Promise<{ isSuccess: boolean; event: Nostr.Event; msg: string[] }> {
  let isSuccess = false;
  const msg: string[] = [];

  try {
    const event = await signEv(obj); //window.nostr.signEvent(obj);
    event.id = getEventHash(event);

    const pool = new SimplePool();
    const pub = pool.publish(relays, event);

    return new Promise((resolve) => {
      const timeoutID = setTimeout(() => {
        resolve({ isSuccess, event, msg });
      }, 5000);

      pub.on('ok', (relay: string) => {
        isSuccess = true;
        msg.push(`[ok]${relay}`);

        if (msg.length == relays.length) {
          clearTimeout(timeoutID);
          resolve({ isSuccess, event, msg });
        }
      });

      pub.on('failed', (relay: string) => {
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

export async function deleteNotes(
  relays: string[],
  _event: Nostr.Event,
  idList: number[],
) {
  console.log(_event.tags);
  const tags = _event.tags.slice();

  idList.sort((a, b) => b - a); // idListを降順に並び替える

  for (const index of idList) {
    tags.splice(index, 1); // インデックスに対応するノートを削除する
  }

  console.log(tags);
  const writeEvent: Nostr.Event = {
    id: '',
    pubkey: _event.pubkey,
    created_at: Math.floor(Date.now() / 1000),
    kind: _event.kind,
    tags: tags,
    content: _event.content,
    sig: '',
  };

  return await publishEvent(writeEvent, relays);
}

export async function deletePrivateNotes(
  relays: string[],
  _event: Nostr.Event,
  idList: number[],
) {
  idList.sort((a, b) => b - a); // idListを降順に並び替える

  try {
    const privateContent = await nip04De(_event.pubkey, _event.content);
    const parsedContent = JSON.parse(privateContent);
    //parsedContentからさくじょ
    for (const index of idList) {
      parsedContent.splice(index, 1); // インデックスに対応するノートを削除する
    }

    const tagList = parsedContent;
    console.log(tagList);

    const encryptedContent = await nip04De(
      _event.pubkey,
      JSON.stringify(tagList),
    );

    const writeEvent: Nostr.Event<any> = {
      id: '',
      pubkey: _event.pubkey,
      created_at: Math.floor(Date.now() / 1000),
      kind: _event.kind,
      tags: _event.tags,
      content: encryptedContent,
      sig: '',
    };
    return await publishEvent(writeEvent, relays);
  } catch (error) {
    return {
      msg: ['復号化できませんでした'],
      isSuccess: false,
      event: _event,
    };
  }
}

// サーバーサイドでのOGP情報取得は不要なので、クライアントサイド用の関数を追加する
interface Ogp {
  title: string;
  image: string;
  description: string;
  favicon: string;
}
import type { Metadata } from 'unfurl.js/dist/types';

export async function getOgp(url: string): Promise<Ogp> {
  try {
    const response = await fetch(
      `/api/ogp?url=${encodeURIComponent(url)}`,
    ).catch((err) => console.log(err));
    const result = (await response
      ?.json()
      .catch((err) => console.log(err))) as Metadata;

    // APIエンドポイントから取得したOGP情報を返す
    return {
      title: result.title || '',
      image:
        result.open_graph && result.open_graph.images
          ? result.open_graph.images[0].url
          : '',
      description: (result.open_graph && result.open_graph.description) || '',
      favicon: result.favicon || '',
    };
  } catch (error) {
    console.log(error);
    return {
      title: '',
      image: '',
      description: '',
      favicon: '',
    };
  }
}

export const uniqueTags = (tags: any[]): string[][] => {
  return tags.reduce((acc: any[][], curr: [any, any]) => {
    const [tag1, tag2, ...tag3] = curr;
    const isDuplicate = acc.some(
      ([existingTag1, existingTag2]) =>
        existingTag1 === tag1 && existingTag2 === tag2,
    );
    const isValidTag =
      tag1 !== 'emoji' && tag1 !== 'r' && tag1 !== 't' && tag1 !== 'q';

    // 追加: 最後の要素が"mention"でない場合にのみ追加する
    //(mentionは引用でこんてんとのなかにnostr:~~ではいってるはずということから)

    const isMention = tag3[tag3.length - 1] === 'mention';

    if (!isDuplicate && isValidTag && !isMention) {
      acc.push([tag1, tag2, ...tag3]);
    }
    return acc;
  }, []);
};

//--------------------------------------------------nip07かnsecかでやるやつ
export async function getPub(): Promise<string> {
  const sec = localStorage.getItem('nsec');
  if (sec) {
    try {
      return getPublicKey(sec);
    } catch (error) {
      try {
        return await window.nostr.getPublicKey();
      } catch (error) {
        return '';
      }
    }
  } else {
    try {
      return await window.nostr.getPublicKey();
    } catch (error) {
      return '';
    }
  }
}

export async function nip04De(
  pubkey: string,
  message: string,
): Promise<string> {
  const sec = localStorage.getItem('nsec');
  if (sec) {
    try {
      return await nip04.decrypt(sec, getPublicKey(sec), message);
    } catch (error) {
      try {
        return await window.nostr.nip04.decrypt(pubkey, message);
      } catch (error) {
        throw error;
      }
    }
  } else {
    try {
      return await window.nostr.nip04.decrypt(pubkey, message);
    } catch (error) {
      throw error;
    }
  }
}

interface Event {
  sig: string;
  kind: number;
  pubkey: string;
  tags: string[][];
  content: string;
  created_at: number;
  id: string;
}

async function signEv(obj: Event): Promise<Event> {
  const sec = localStorage.getItem('nsec');
  if (sec) {
    try {
      obj.sig = getSignature(obj, sec);
      return obj;
    } catch (error) {
      try {
        return await window.nostr.signEvent(obj);
      } catch (error) {
        throw error;
      }
    }
  } else {
    try {
      return await window.nostr.signEvent(obj);
    } catch (error) {
      throw error;
    }
  }
}
