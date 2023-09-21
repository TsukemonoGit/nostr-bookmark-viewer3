# nostr-bookmark-viewer3

https://nostr-bookmark-viewer3.vercel.app/

第三弾
SvelteKit と Skeleton と Tailwindcss と Nostr と Nosvelte と rx-nostr の勉強

## 機能

[Nostr](https://github.com/nostr-protocol/nostr)の[NIP-51](https://github.com/nostr-protocol/nips/blob/master/51.md)に定められた、kind:30001（Categorized Bookmarks）を取得、表示する。

（kind:30001 を全部取得するのでたまに e タグ以外のものが入ってるものも取得されたりする）

- ページについて

  - /p/nprofile で、あるユーザーのブクマ取得リレーを指定したブクマ一覧　（本人のブクマ（ログイン時）の場合編集可能）
  - /p/npub でるユーザーのリレー固定（取得できないこともある）のブクマ一覧 （閲覧のみ）
  - /a/naddr でるユーザーのブクマのうちの一つのタグのブクマ ）（共有用　閲覧のみ）
  - /t/(hashtag) でハッシュタグのついたノートの一部を表示　（閲覧のみ）

- public private どちらのブックマークも閲覧・編集ができる

- 大体のクライアントでデフォのブックマークの d タグは bookmark だけど
  それ以外のオリジナルのタグも生やせる

- 通信量軽減のための設定もある

- タグ単位でリンクを共有する機能がある

- ブクマされてるノートを引用ポストすることもできる

- ダークモードもある

- ノートが保存されているタグから別のタグにノートを移動させることができる

- 複数ノートをまとめて移動削除することもできる

- postNote は

  kind1 用リレーが設定してたらそのリレーにポスト

  設定されてなくて NIP-07 の preferred relays の write が設定されてたらそこにポスト

  設定されてなかったら、ブクマ取得に使用したリレーにポストします

- create and add note も

  kind1 用リレーが設定されていたら kind1 のノートはそのリレーにポストして、

  addNote はブクマ用リレー（kind30001）の設定と同じリレーにポストする

- ログイン状態のときに、note が not found のときに、ノートがどのリレーに存在するか検索して、複製することができる(読み込み直したら反映される)
  （ログインしていないときは検索だけできる（複製ボタン表示されない））

- nip07 の拡張機能による署名、nsec による署名ができる

- AddNote で naddr も追加できるようになった（a タグ）

- i18n 対応 (日本語も英語も下手なのでだれかー)

- nprofile の URL の最後に?kind=30030 とか?kind=10030 つけたらその kind の中身見えるし編集できるかも(とりあえず 10000<=kind<40000)

- ["e","~~~"]みたいな tag ごとブクマに入れられるようにした

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

- [nostr-zap](https://github.com/SamSamskies/nostr-zap)
