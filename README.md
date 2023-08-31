# nostr-bookmark-viewer3

https://nostr-bookmark-viewer3.vercel.app/

第三弾
SvelteKit と Skeleton と Tailwindcss と Nostr と Nosvelte と rx-nostr の勉強

## 機能

[Nostr](https://github.com/nostr-protocol/nostr)の[NIP-51](https://github.com/nostr-protocol/nips/blob/master/51.md)に定められた、kind:30001（Categorized Bookmarks）を取得、表示する。

（kind:30001を全部取得するのでたまにeタグ以外のものが入ってるものも取得されたりする）

- ページについて
  - /p/nprofile で、あるユーザーのブクマ取得リレーを指定したブクマ一覧　（本人のブクマ（ログイン時）の場合編集可能）
  - /p/npub でるユーザーのリレー固定（取得できないこともある）のブクマ一覧  （閲覧のみ）
  - /a/naddr でるユーザーのブクマのうちの一つのタグのブクマ ）（共有用　閲覧のみ）
  - /t/(hashtag) でハッシュタグのついたノートの一部を表示　（閲覧のみ）


- public privateどちらのブックマークも閲覧・編集ができる

- 大体のクライアントでデフォのブックマークのdタグはbookmarkだけど
  それ以外のオリジナルのタグも生やせる

- 通信量軽減のための設定もある  

- タグ単位でリンクを共有する機能がある

- ブクマされてるノートを引用ポストすることもできる

- ダークモードもある

- ノートが保存されているタグから別のタグにノートを移動させることができる

- 複数ノートをまとめて移動削除することもできる
  

- postNoteは

  kind1用リレーが設定してたらそのリレーにポスト

  設定されてなくてNIP-07のpreferred relaysのwriteが設定されてたらそこにポスト

  設定されてなかったら、ブクマ取得に使用したリレーにポストします

- create and add noteも

  kind1用リレーが設定されていたらkind1のノートはそのリレーにポストして、
　
  addNoteはブクマ用リレー（kind30001）の設定と同じリレーにポストする

- ログイン状態のときに、noteがnot foundのときに、ノートがどのリレーに存在するか検索して、複製することができる(読み込み直したら反映される)
  （ログインしていないときは検索だけできる（複製ボタン表示されない））

## 使用ライブラリ

- [Nostr](https://github.com/nostr-protocol/nostr)

- [nostr-tools](https://github.com/nbd-wtf/nostr-tools)

- [nosvelte](https://github.com/akiomik/nosvelte)

- [SvelteKit](https://kit.svelte.jp/) ([github](https://github.com/sveltejs/kit))

- [Skeleton](https://www.skeleton.dev/) ([github](https://github.com/skeletonlabs/skeleton))

- [tailwindcss](https://tailwindcss.com/) ([github](https://github.com/tailwindlabs/tailwindcss))

- [ESLint](https://eslint.org/) ([github](https://github.com/eslint/eslint))

- [pretter](https://prettier.io/) ([github](https://github.com/prettier/prettier))

- [sanitize-html](https://github.com/apostrophecms/sanitize-html)

- [Zero-config PWA Plugin for SvelteKit](https://github.com/vite-pwa/sveltekit)
  など
