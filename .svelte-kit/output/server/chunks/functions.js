import { nip19 } from "nostr-tools";
import { createRxNostr, createRxOneshotReq, uniq, verify } from "rx-nostr";
import { w as writable } from "./index2.js";
const bookmarkEvents = writable([]);
const nowProgress = writable(false);
const RelaysforSearch = [
  "wss://relay.nostr.band",
  // 'wss://nostr.wine',
  //'wss://relay.damus.io',
  "wss://nos.lol",
  "wss://relay.nostr.wirednet.jp",
  "wss://relay-jp.nostr.wirednet.jp"
  //'wss://yabu.me',
  //"wss://nostream.localtest.me",
  //"ws://localhost:7000",
];
const ogpStore = writable({});
const naddrStore = writable({});
const contentStore = writable({});
const allView = writable(false);
const pageNprofile = writable("");
const searchRelays = writable([]);
async function fetchFilteredEvents(relays, filters) {
  const rxNostr = createRxNostr();
  rxNostr.setRelays(relays);
  const rxReq = createRxOneshotReq({ filters });
  const observable = rxNostr.use(rxReq).pipe(uniq(), verify());
  const eventMap = /* @__PURE__ */ new Map();
  const observer = {
    next: (packet) => {
      console.log(packet);
      if (filters[0].kinds) {
        if (filters[0].kinds[0] >= 3e4 && filters[0].kinds[0] < 4e4 && packet.event.tags[0][0] === "d") {
          const tagID = packet.event.tags[0][1];
          const existingEvent = eventMap.get(tagID);
          if (!existingEvent || packet.event.created_at > existingEvent.created_at) {
            eventMap.set(tagID, packet.event);
          }
        }
      }
    },
    error: (error) => {
      console.error("Error occurred:", error);
    },
    complete: () => {
      console.log("Subscription completed");
    }
  };
  const subscription = observable.subscribe(observer);
  setTimeout(() => {
    subscription.unsubscribe();
  }, 5 * 1e3);
  await new Promise((resolve) => {
    subscription.add(() => {
      resolve();
    });
  });
  const eventArray = Array.from(eventMap.values());
  console.log(eventArray);
  return eventArray;
}
async function getOgp(url) {
  try {
    const response = await fetch(
      `/api/ogp?url=${encodeURIComponent(url)}`
    ).catch((err) => console.log(err));
    const result = await response?.json().catch((err) => console.log(err));
    return {
      title: result.title || "",
      image: result.open_graph && result.open_graph.images ? result.open_graph.images[0].url : "",
      description: result.open_graph && result.open_graph.description || "",
      favicon: result.favicon || ""
    };
  } catch (error) {
    console.log(error);
    return {
      title: "",
      image: "",
      description: "",
      favicon: ""
    };
  }
}
const uniqueTags = (tags) => {
  return tags.reduce((acc, curr) => {
    const [tag1, tag2, ...tag3] = curr;
    const isDuplicate = acc.some(
      ([existingTag1, existingTag2]) => existingTag1 === tag1 && existingTag2 === tag2
    );
    const isValidTag = tag1 !== "emoji" && tag1 !== "r" && tag1 !== "t" && tag1 !== "q";
    const isMention = tag3[tag3.length - 1] === "mention";
    if (!isDuplicate && isValidTag && !isMention) {
      acc.push([tag1, tag2, ...tag3]);
    }
    return acc;
  }, []);
};
async function getIdByTag(tag) {
  if (tag[0] === "e") {
    return { id: tag[1], tag };
  } else if (tag[0] === "a") {
    const naddr = parseNaddr(tag);
    const res = await getEvent(naddr);
    if (res) {
      return { id: res.id, tag };
    } else {
      return { id: tag[1], tag };
    }
  } else {
    return { id: tag[1], tag };
  }
}
let storeValue;
naddrStore.subscribe((value) => {
  storeValue = value;
});
let searchValue;
searchRelays.subscribe((value) => {
  searchValue = value;
});
async function getEvent(naddr) {
  const addressPointer = nip19.naddrEncode({
    identifier: naddr.identifier,
    pubkey: naddr.pubkey,
    kind: naddr.kind
  });
  console.log(naddrStore);
  if (!(addressPointer in storeValue)) {
    const relays = searchValue && searchValue.length > 0 ? searchValue : RelaysforSearch;
    const filter = [
      {
        authors: [naddr.pubkey],
        "#d": [naddr.identifier],
        kinds: [naddr.kind]
      }
    ];
    const res = await fetchFilteredEvents(relays, filter);
    if (res.length > 0) {
      res.sort((a, b) => b.created_at - a.created_at);
      storeValue[addressPointer] = res[0];
      naddrStore.set(storeValue);
      return res[0];
    }
  } else {
    return storeValue[addressPointer];
  }
}
function parseNaddr(tag) {
  const parts = tag[1].split(":");
  return tag.length >= 2 ? {
    kind: Number(parts[0]),
    pubkey: parts.length > 1 ? parts[1] : "",
    identifier: parts.length > 2 ? parts[2] : "",
    relays: [tag[2]]
  } : {
    kind: Number(parts[0]),
    pubkey: parts.length > 1 ? parts[1] : "",
    identifier: parts.length > 2 ? parts[2] : ""
  };
}
export {
  RelaysforSearch as R,
  allView as a,
  bookmarkEvents as b,
  naddrStore as c,
  contentStore as d,
  getOgp as e,
  fetchFilteredEvents as f,
  getIdByTag as g,
  nowProgress as n,
  ogpStore as o,
  pageNprofile as p,
  searchRelays as s,
  uniqueTags as u
};
