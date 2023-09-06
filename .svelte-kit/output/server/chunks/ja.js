const settings = {
  description: "Nostrのブックマークをみたりできるやつ",
  page_title: "ぶくまびうあ",
  toast: {
    failPubkey: "公開鍵の取得に失敗しました",
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
const ja = {
  settings
};
export {
  ja as default,
  settings
};
