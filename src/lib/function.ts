import { nip19 } from "nostr-tools";

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
      res=pubkey;
    } catch (error) {
      throw new Error("error");
    }
  }
  return res;
}
