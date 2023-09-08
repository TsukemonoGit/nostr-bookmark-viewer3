const settings = {
  description: "Nostr bookmark viewer",
  page_title: "ぶくまびうあ",
  toast: {
    failPubkey: "failed to get pubkey",
    nsec: {
      save: "saved",
      failed: "Check your private key",
      "delete": "deleted"
    }
  },
  intro: {
    "1": "Get and display Nostr's kind:30001 (NIP-51).",
    "2": "Enter the public key and add the relay to be connected to the relay list.",
    "3": "Click on the 📝 symbol in the upper left corner of the list page to see the explanation of each icon."
  },
  main: {
    nsec: {
      button: "Set private key",
      text: "※For those without nip07 extension",
      set: {
        list1: "No private key is required for browsing only!",
        list2: " recommend installing the nip07 extension 【chrome xtension: ",
        list3: "】",
        link: "https://scrapbox.io/nostr/nos2x%E3%81%AE%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%E3%81%A8%E4%BD%BF%E3%81%84%E6%96%B9",
        linkName: "nos2xのセットアップと使い方",
        list4: "recommended to Delete the private key when it is no longer needed",
        buttonView: "show",
        buttonHide: "hide",
        buttonSave: "save",
        buttonDelete: "delete"
      }
    },
    pubkey: {
      pubkey: "🔑 public key",
      button: "use NIP-07\nExtension",
      text: "※use NIP-07 Extension: Overwrites the relay list if the extension has a valid relay(write)"
    },
    relay: {
      relay: "🌐 relay",
      text1: "※After entering the URL, click",
      text2: "add relay",
      text3: " ",
      button: "add relay",
      text4: "relay list",
      button2: "delete",
      text5: "（Option）Add to relay list from NIP-05.",
      button3: "get relays"
    },
    detail: {
      open: "🔧 Detailed settings▲",
      close: "🔧 Detailed settings▼",
      text: "the setting is saved when the next button is pressed",
      text2: "Relay for search",
      button: "reset to default",
      button2: "add relay",
      text3: "relay list",
      button3: "delete",
      text4: "Settings to Improved Performance",
      text5: "reset to default",
      text6: "Automatically load images and display URL previews",
      text7: "Read content of event (same as relay number 0 for search)",
      text8: "Relay for kind:1 submission",
      text9: "(If not set, it will post to the NIP:07 relay or the relay you have set up for retrieving bookmarks)",
      button4: "delete",
      button5: "add relay",
      text10: "relay list",
      button6: "delete",
      text11: "(Option)",
      button7: "Obtained using NIP05",
      button8: "Obtained using NIP07",
      text12: "Screen mode"
    }
  }
};
const en = {
  settings
};
export {
  en as default,
  settings
};
