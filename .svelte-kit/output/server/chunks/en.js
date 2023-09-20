const settings = {
  description: "Nostr bookmark viewer",
  page_title: "bkmstr",
  toast: {
    failPubkey: "failed to get pubkey",
    errorPubkey: "Please check pubkey",
    errorRelay: "Please add relay",
    errorEncode: "failed to encode to nprofile",
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
        list2: " recommend installing the nip07 extension 【chrome Extension: ",
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
const nprofile = {
  message: "<p>Bookmark not found<br/>If this is your first time, try creating a new list<br/>If you don't see your data, review your relay settings. <svg class='m-0 p-0' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' > <rect x='3' y='3' width='18' height='18' rx='2' ry='2' /> <line x1='12' y1='6' x2='12' y2='12' /> <line x1='8' y1='6' x2='8' y2='12' /> <line x1='16' y1='6' x2='16' y2='12' /> <line x1='3' y1='16' x2='21' y2='16' /> </svg>If you are logged in, you can add lists from this symbol below. </p>",
  toast: {
    login: "Logged in",
    failed_login: "Login Failure",
    failed_publish: "failed to publish",
    failed: "Failed",
    add_tag: "Add list<br>",
    delete_tag: "Delete list<br>",
    add_note: "Add note<br>",
    delete_failed1: "failed to delete from [",
    delete_failed2: "]",
    delete_note: "Delete note<br>",
    delete_message: "Are you sure you delete this note?",
    delete_notes_message1: "Are you sure you delete these",
    delete_notes_message2: "notes?",
    update_message: "Updating to the latest status...",
    update_failed: "Failed to load the latest list",
    failed_hukugou: "Could not decrypt."
  },
  modal: {
    addNote_body: "Enter an ID starting with 'note' , 'nevent' , 'nostr:' or 'naddr'.",
    editTags: {
      title: "Edit list",
      body: "new List Name"
    },
    moveNote: {
      title: "Move note",
      body_from: "Move from [",
      body_to: "] to",
      failed1: "failed to add to [",
      failed2: "]"
    },
    postNote: {
      title: "postNote"
    },
    tagList: {
      title: "List of bookmarked lists"
    },
    search: {
      title: "Search"
    }
  },
  html: {
    info: "【Setting information】",
    kind: "kind",
    type: "page type: ",
    preview: "Preview display: ",
    loadnote: "Note reading: ",
    search_relays: "【Relay for note search】",
    share: "Share on Nostr",
    openapp: "Open on nostr.com",
    move: "Move to other listings",
    "delete": "Remove from list",
    search: "search",
    list: "List of bookmarked lists",
    add: "Add Notes",
    edit: "Edit Lists",
    update: "Update List",
    warning: "All content-warning display switching",
    mode: "Switching between multiple selections",
    button: "Go back to Setup"
  }
};
const PostNote = {
  copied: "Copied to clipboard",
  failed_copy: "failed to copy to clipboard",
  popup_copy: "Copy the contents of Content to the clipboard",
  p_tag: "Include the p tag of the quoted source"
};
const ModalAddNote = {
  add_note: "add note",
  add_note_to1: "Add Note to [",
  add_note_to2: "]",
  create: "CreateNote & AddNote",
  create_to1: "Create and Add Note to [",
  create_to2: "]",
  create_body: "enter kind:1's content",
  add_note_tag: "(for tag)",
  example: "example"
};
const ModalEditTag = {
  delete_body: "Select <strong>Delete</strong> List"
};
const hashtag = {
  back: "←back"
};
const en = {
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
  en as default,
  hashtag,
  nprofile,
  settings
};
