const settings = {
  description: "Nostrのブックマークをみたりできるやつ",
  page_title: "ぶくまびうあ",
  toast: {
    failPubkey: "公開鍵の取得に失敗しました",
    errorPubkey: "公開鍵の入力を確認してください",
    errorRelay: "リレーを追加してください",
    errorEncode: "nprofileエンコードに失敗しました",
    nsec: {
      save: "保存しました",
      failed: "秘密鍵を確認してください",
      "delete": "削除しました"
    }
  },
  intro: {
    "1": "Nostrのkind:30001(NIP-51)を取得、表示します。",
    "2": "公開鍵を入力し、接続するリレーをリレーリストに追加してください。",
    "3": " 各アイコンの説明は一覧ページ左上の 📝 マークをクリックすると表示されます"
  },
  main: {
    nsec: {
      button: "秘密鍵を設定する",
      text: "※nip07拡張機能がない人向け",
      set: {
        list1: "閲覧のみの場合は秘密鍵は不要です！",
        list2: " nip07拡張機能の導入をおすすめします 【chrome拡張: ",
        list3: "】",
        link: "https://scrapbox.io/nostr/nos2x%E3%81%AE%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%E3%81%A8%E4%BD%BF%E3%81%84%E6%96%B9",
        linkName: "nos2xのセットアップと使い方",
        list4: "秘密鍵が不要になったら削除しておくことをおすすめします",
        buttonView: "表示",
        buttonHide: "非表示",
        buttonSave: "保存",
        buttonDelete: "削除"
      }
    },
    pubkey: {
      pubkey: "🔑公開鍵(public key)",
      button: "NIP-07拡張機能\nから読み込む",
      text: "※拡張機能に有効なリレー(write)を設定している場合リレーリストを上書きします"
    },
    relay: {
      relay: "🌐リレー(relay)",
      text1: "※URLを入力したら",
      text2: "追加",
      text3: "をクリックしてください",
      button: "追加",
      text4: "リレーリスト",
      button2: "削除",
      text5: "（オプション）NIP-05からリレーリストに追加",
      button3: "追加"
    },
    detail: {
      open: "🔧詳細設定▲",
      close: "🔧詳細設定▼",
      text: "nextボタンをおしたときに設定が保存されます",
      text2: "検索用リレー",
      button: " デフォルトに戻す",
      button2: "追加",
      text3: "リレーリスト",
      button3: "削除",
      text4: "軽量用設定",
      text5: "デフォルトに戻す",
      text6: "自動的に画像を読み込む、URLプレビューを表示する",
      text7: "イベントの内容を読み込む (検索用リレー数0と同じ)",
      text8: "kind:1投稿用リレー",
      text9: "（設定されていない場合、NIP07のリレーまたはブクマ取得に設定しているリレーにポストします）",
      button4: "削除",
      button5: "追加",
      text10: "リレーリスト",
      button6: "削除",
      text11: "（オプション）",
      button7: "NIP05から取得",
      button8: "NIP07から取得",
      text12: "画面モード"
    }
  }
};
const nprofile = {
  message: "<p>ブクマ何もないかも<br/>初めての場合は新しいリストを作成してみてね<br/>データが見当たらない場合はリレーの設定を見直してみてね <svg class='m-0 p-0' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' > <rect x='3' y='3' width='18' height='18' rx='2' ry='2' /> <line x1='12' y1='6' x2='12' y2='12' /> <line x1='8' y1='6' x2='8' y2='12' /> <line x1='16' y1='6' x2='16' y2='12' /> <line x1='3' y1='16' x2='21' y2='16' /> </svg>ログインしている場合は下のこのマークからタグが追加できるよ </p>",
  toast: {
    login: "ログインしました",
    failed_login: "ログイン失敗",
    failed_publish: "書き込みに失敗しました",
    failed: "失敗したかも",
    add_tag: "作成<br>",
    delete_tag: "削除<br>",
    add_note: "ノートの追加<br>",
    delete_failed1: "リスト[",
    delete_failed2: "]からの削除に失敗しました",
    delete_note: "ノートを削除<br>",
    delete_message: "本当に削除しますか?",
    delete_notes_message1: "本当に選択中の",
    delete_notes_message2: "つのノートを削除しますか",
    update_message: "最新の状態に更新中...",
    update_failed: "最新リストの読み込みに失敗しました",
    failed_hukugou: "復号できませんでした"
  },
  modal: {
    addNote_body: "'note' , 'nevent' , 'nostr:' or 'naddr'のいずれかから始まるIDを入力してください.",
    editTags: {
      title: "リストの編集",
      body: "新しいリストの名前を入力してください"
    },
    moveNote: {
      title: "ノートの移動",
      body_from: "[",
      body_to: "]からの移動先を選択してください",
      failed1: "[",
      failed2: "]への追加に失敗しました"
    },
    postNote: {
      title: "引用ポスト"
    },
    tagList: {
      title: "リスト一覧"
    },
    search: {
      title: "検索"
    }
  },
  html: {
    info: "【設定情報】",
    kind: "kind",
    type: "タイプ: ",
    preview: "プレビュー表示: ",
    loadnote: "ノート読み込み: ",
    search_relays: "【ノート検索用リレー】",
    share: "Nostrで共有する",
    openapp: "nostr.comで開く",
    move: "他のリストに移動",
    "delete": "リストから削除",
    search: "探す",
    list: "リスト一覧",
    add: "ノートの追加",
    edit: "リストの編集",
    update: "全リストの更新",
    warning: "全content-warning表示切り替え",
    mode: "複数選択との切り替え",
    button: "設定ページに戻る"
  }
};
const PostNote = {
  copied: "クリップボードにコピーしました",
  failed_copy: "コピーに失敗しました",
  popup_copy: "Contentの中身をクリップボードにコピー",
  p_tag: "引用元のpタグを含める"
};
const ModalAddNote = {
  add_note: "ブックマークに追加",
  add_note_to1: "[",
  add_note_to2: "]にノートを追加",
  create: "ノートを作成して追加",
  create_to1: "ノートを作成して、[",
  create_to2: "]に追加",
  create_body: "ポストする内容を入力してください（kind:1ノートのcontent）",
  add_note_tag: "(タグから追加)",
  example: "例"
};
const ModalEditTag = {
  delete_body: "<strong>削除</strong>するリストを選んでください"
};
const hashtag = {
  back: "←戻る"
};
const ja = {
  settings,
  nprofile,
  PostNote,
  ModalAddNote,
  ModalEditTag,
  hashtag
};
export {
  ModalAddNote,
  ModalEditTag,
  PostNote,
  ja as default,
  hashtag,
  nprofile,
  settings
};
