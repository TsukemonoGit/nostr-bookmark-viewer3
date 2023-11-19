import type { Nostr } from 'nosvelte';
import { fetchFilteredEvents } from './functions';

export async function kindMigrate() {
  let event30003: Nostr.Event[] = [];
  let event30001: Nostr.Event[] = [];
  const migkind = 30003;
  const relays: string[] = [];
  const filter30001 = { authors: [''], kinds: [30001] };
  const filter30003 = { authors: [''], kinds: [30003] };
  try {
    const res = await fetchFilteredEvents(relays, [filter30003]);
    if (res.length > 0) {
      event30003 = res;
    }
  } catch (error) {
    console.log('30003 not found');
  }

  //ここでevent30003に中身があったら移行完了してることとする？
  if (event30003.length > 0) {
    console.log(event30003);
    return;
  }

  try {
    const res = await fetchFilteredEvents(relays, [filter30001]);
    if (res.length > 0) {
      event30001 = res;
    }
  } catch (error) {
    console.log('30001 not found');
  }
  //ここでevent30001に中身があったらなんもすることない？
  if (event30001.length === 0) {
    console.log('kind:30001見つかんなかった');
    return;
  }

  //ここは30003のなかみがからで30001に中身があるところ
  //30001のそれぞれをチェックして
  //tagにd title image summary e a t r 　description以外のタグがあるもの以外をmigkindにかきこむ
  let new30003: Nostr.Event[] = [];
  for (const event of event30001) {
    // 30001のそれぞれのタグをチェック
    const allowedTags = [
      'd',
      'title',
      'image',
      'summary',
      'e',
      'a',
      't',
      'r',
      'description',
    ];
    const invalidTags = event.tags.filter(
      (tag) => !allowedTags.includes(tag[0]),
    );

    // これらのタグ以外が含まれていた場合はNG
    if (invalidTags.length > 0) {
      console.log(`Invalid tags found in event ${event.id}: ${invalidTags}`);
      // 何か処理
    } else {
      // 何も問題がない場合の処理
      const tmp = event;
      tmp.kind = 30003; //kindを書き換える
      tmp.created_at = Math.floor(Date.now() / 1000);
      new30003.push(event);
      console.log(`Event ${event.id} passed validation`);
      // 何か処理
    }
  }

  console.log(new30003.length);
  if (new30003.length > 0) {
    //かきこむ
  }
}
