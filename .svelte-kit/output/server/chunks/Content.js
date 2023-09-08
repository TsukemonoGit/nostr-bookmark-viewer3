import { s as setContext, h as getContext, c as create_ssr_component, r as onDestroy, a as subscribe, n as noop, v as validate_component, b as add_attribute, e as escape, d as each, l as is_promise, t as set_store_value } from "./index3.js";
import { notifyManager, parseQueryArgs, QueryObserver, QueryClient } from "@tanstack/query-core";
import { createRxOneshotReq, filterKind, verify, latest, uniq, Nostr, createRxNostr } from "rx-nostr";
import { filter, scan, pipe, map, from, startWith } from "rxjs";
import "./ProgressBar.svelte_svelte_type_style_lang.js";
import { a as searchIcon } from "./Content.svelte_svelte_type_style_lang.js";
import { nip19 } from "nostr-tools";
import { w as writable, r as readable, d as derived } from "./index2.js";
import { c as naddrStore, a as allView, u as uniqueTags, R as RelaysforSearch, f as fetchFilteredEvents, d as contentStore, o as ogpStore, e as getOgp } from "./functions.js";
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */
const app = writable();
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */
function filterId(id) {
  return filter((packet) => packet.event.id === id);
}
function filterPubkey(pubkey) {
  return filter((packet) => packet.event.pubkey === pubkey);
}
function scanArray() {
  return scan((acc, a) => [...acc, a], []);
}
function collectGroupBy(f) {
  return pipe(scanArray(), map((xs) => {
    const dict = /* @__PURE__ */ new Map();
    xs.forEach((x) => {
      const key = f(x);
      const value = dict.get(key);
      if (value) {
        dict.set(key, [...value, x]);
      } else {
        dict.set(key, [x]);
      }
    });
    return dict;
  }));
}
function scanLatestEach(f) {
  return pipe(collectGroupBy(f), map((dict) => Array.from(dict.entries()).map(([, value]) => value.slice(-1)[0])));
}
const _contextKey = "$$_queryClient";
const getQueryClientContext = () => {
  const client = getContext(_contextKey);
  if (!client) {
    throw new Error("No QueryClient was found in Svelte context. Did you forget to wrap your component with QueryClientProvider?");
  }
  return client;
};
const setQueryClientContext = (client) => {
  setContext(_contextKey, client);
};
function useQueryClient() {
  const queryClient = getQueryClientContext();
  return queryClient;
}
function createBaseQuery(options, Observer) {
  const queryClient = useQueryClient();
  const defaultedOptions = queryClient.defaultQueryOptions(options);
  defaultedOptions._optimisticResults = "optimistic";
  let observer = new Observer(queryClient, defaultedOptions);
  if (defaultedOptions.onError) {
    defaultedOptions.onError = notifyManager.batchCalls(defaultedOptions.onError);
  }
  if (defaultedOptions.onSuccess) {
    defaultedOptions.onSuccess = notifyManager.batchCalls(defaultedOptions.onSuccess);
  }
  if (defaultedOptions.onSettled) {
    defaultedOptions.onSettled = notifyManager.batchCalls(defaultedOptions.onSettled);
  }
  readable(observer).subscribe(($observer) => {
    observer = $observer;
    observer.setOptions(defaultedOptions, { listeners: false });
  });
  const result = readable(observer.getCurrentResult(), (set) => {
    return observer.subscribe(notifyManager.batchCalls(set));
  });
  const { subscribe: subscribe2 } = derived(result, ($result) => {
    $result = observer.getOptimisticResult(defaultedOptions);
    return !defaultedOptions.notifyOnChangeProps ? observer.trackResult($result) : $result;
  });
  return { subscribe: subscribe2 };
}
function createQuery(arg1, arg2, arg3) {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  const result = createBaseQuery(parsedOptions, QueryObserver);
  return result;
}
const QueryClientProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { client = new QueryClient() } = $$props;
  setQueryClientContext(client);
  onDestroy(() => {
    client.unmount();
  });
  if ($$props.client === void 0 && $$bindings.client && client !== void 0)
    $$bindings.client(client);
  return `${slots.default ? slots.default({}) : ``}`;
});
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */
function useReq({ rxNostr, queryKey, filters, operator, req, initData }) {
  const queryClient = useQueryClient();
  if (rxNostr.getRelays().length === 0) {
    queryClient.setQueryData(queryKey, initData);
    return {
      data: readable(initData),
      status: readable("success"),
      error: readable()
    };
  }
  let _req;
  if (req) {
    req.emit(filters);
    _req = req;
  } else {
    _req = createRxOneshotReq({ filters });
  }
  const status = writable("loading");
  const error = writable(void 0);
  const obs = rxNostr.use(_req).pipe(operator);
  const query = createQuery(queryKey, () => {
    return new Promise((resolve, reject) => {
      let fullfilled = false;
      obs.subscribe({
        next: (v) => {
          if (fullfilled) {
            queryClient.setQueryData(queryKey, v);
          } else {
            resolve(v);
            fullfilled = true;
          }
        },
        complete: () => status.set("success"),
        error: (e) => {
          console.error(e);
          status.set("error");
          error.set(e);
          if (!fullfilled) {
            reject(e);
            fullfilled = true;
          }
        }
      });
    });
  });
  return {
    data: derived(query, ($query) => $query.data, initData),
    status: derived([query, status], ([$query, $status]) => {
      if ($query.isSuccess) {
        return "success";
      } else if ($query.isError) {
        return "error";
      } else {
        return $status;
      }
    }),
    error: derived([query, error], ([$query, $error]) => {
      if ($query.isError) {
        return $query.error;
      } else {
        return $error;
      }
    })
  };
}
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */
function useConnections({ rxNostr, relays }) {
  if (relays.length === 0) {
    return from([[]]);
  }
  const init = relays.map((relay) => {
    const from2 = typeof relay === "string" ? relay : relay.url;
    const state = rxNostr.hasRelay(from2) ? rxNostr.getRelayState(from2) : "not-started";
    return { from: from2, state };
  });
  return rxNostr.createConnectionStateObservable().pipe(startWith(...init), scanLatestEach(({ from: from2 }) => from2));
}
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */
function useReplaceableEvent(rxNostr, queryKey, pubkey, kind, req) {
  const filters = [{ kinds: [kind], authors: [pubkey], limit: 1 }];
  const operator = pipe(filterKind(kind), filterPubkey(pubkey), verify(), latest());
  return useReq({ rxNostr, queryKey, filters, operator, req });
}
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */
function useEvent(rxNostr, queryKey, id, req) {
  const filters = [{ ids: [id], limit: 1 }];
  const operator = pipe(filterId(id), uniq(), verify());
  return useReq({ rxNostr, queryKey, filters, operator, req });
}
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */
function useMetadata(rxNostr, queryKey, pubkey, req) {
  return useReplaceableEvent(rxNostr, queryKey, pubkey, Nostr.Kind.Metadata, req);
}
const Metadata = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let result;
  let data;
  let status;
  let error;
  let $app, $$unsubscribe_app;
  let $error, $$unsubscribe_error = noop, $$subscribe_error = () => ($$unsubscribe_error(), $$unsubscribe_error = subscribe(error, ($$value) => $error = $$value), error);
  let $data, $$unsubscribe_data = noop, $$subscribe_data = () => ($$unsubscribe_data(), $$unsubscribe_data = subscribe(data, ($$value) => $data = $$value), data);
  let $status, $$unsubscribe_status = noop, $$subscribe_status = () => ($$unsubscribe_status(), $$unsubscribe_status = subscribe(status, ($$value) => $status = $$value), status);
  $$unsubscribe_app = subscribe(app, (value) => $app = value);
  let { queryKey } = $$props;
  let { pubkey } = $$props;
  let { req = void 0 } = $$props;
  if ($$props.queryKey === void 0 && $$bindings.queryKey && queryKey !== void 0)
    $$bindings.queryKey(queryKey);
  if ($$props.pubkey === void 0 && $$bindings.pubkey && pubkey !== void 0)
    $$bindings.pubkey(pubkey);
  if ($$props.req === void 0 && $$bindings.req && req !== void 0)
    $$bindings.req(req);
  result = useMetadata($app.rxNostr, queryKey, pubkey, req);
  $$subscribe_data(data = result.data);
  $$subscribe_status(status = result.status);
  $$subscribe_error(error = result.error);
  $$unsubscribe_app();
  $$unsubscribe_error();
  $$unsubscribe_data();
  $$unsubscribe_status();
  return `${$error ? `${slots.error ? slots.error({
    error: $error,
    metadata: $data?.event,
    status: $status
  }) : ``}` : `${$data ? `${slots.default ? slots.default({ metadata: $data?.event, status: $status }) : ``}` : `${$status === "loading" ? `${slots.loading ? slots.loading({ metadata: $data?.event, status: $status }) : ``}` : `${slots.nodata ? slots.nodata({ metadata: $data?.event, status: $status }) : ``}`}`}`}`;
});
const NostrApp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let connections;
  let mergedQueryClientConfig;
  let queryClient;
  let $connections, $$unsubscribe_connections = noop, $$subscribe_connections = () => ($$unsubscribe_connections(), $$unsubscribe_connections = subscribe(connections, ($$value) => $connections = $$value), connections);
  let { queryClientConfig = {} } = $$props;
  let { relays = [] } = $$props;
  const rxNostr = createRxNostr();
  const defaultQueryClientConfig = {
    defaultOptions: {
      queries: {
        staleTime: 1e3 * 60,
        refetchInterval: Infinity
      }
    }
  };
  onDestroy(() => {
    rxNostr.dispose();
  });
  if ($$props.queryClientConfig === void 0 && $$bindings.queryClientConfig && queryClientConfig !== void 0)
    $$bindings.queryClientConfig(queryClientConfig);
  if ($$props.relays === void 0 && $$bindings.relays && relays !== void 0)
    $$bindings.relays(relays);
  $$subscribe_connections(connections = useConnections({ rxNostr, relays }));
  mergedQueryClientConfig = {
    ...defaultQueryClientConfig,
    ...queryClientConfig
  };
  queryClient = new QueryClient(mergedQueryClientConfig);
  {
    {
      rxNostr.setRelays(relays);
      app.set({ rxNostr });
    }
  }
  $$unsubscribe_connections();
  return `${validate_component(QueryClientProvider, "QueryClientProvider").$$render($$result, { client: queryClient }, {}, {
    default: () => {
      return `${slots.default ? slots.default({ connections: $connections }) : ``}`;
    }
  })}`;
});
const Text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let result;
  let data;
  let status;
  let error;
  let $app, $$unsubscribe_app;
  let $error, $$unsubscribe_error = noop, $$subscribe_error = () => ($$unsubscribe_error(), $$unsubscribe_error = subscribe(error, ($$value) => $error = $$value), error);
  let $data, $$unsubscribe_data = noop, $$subscribe_data = () => ($$unsubscribe_data(), $$unsubscribe_data = subscribe(data, ($$value) => $data = $$value), data);
  let $status, $$unsubscribe_status = noop, $$subscribe_status = () => ($$unsubscribe_status(), $$unsubscribe_status = subscribe(status, ($$value) => $status = $$value), status);
  $$unsubscribe_app = subscribe(app, (value) => $app = value);
  let { queryKey } = $$props;
  let { id } = $$props;
  let { req = void 0 } = $$props;
  if ($$props.queryKey === void 0 && $$bindings.queryKey && queryKey !== void 0)
    $$bindings.queryKey(queryKey);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.req === void 0 && $$bindings.req && req !== void 0)
    $$bindings.req(req);
  result = useEvent($app.rxNostr, queryKey, id, req);
  $$subscribe_data(data = result.data);
  $$subscribe_status(status = result.status);
  $$subscribe_error(error = result.error);
  $$unsubscribe_app();
  $$unsubscribe_error();
  $$unsubscribe_data();
  $$unsubscribe_status();
  return `${$error ? `${slots.error ? slots.error({
    error: $error,
    text: $data?.event,
    status: $status
  }) : ``}` : `${$data ? `${slots.default ? slots.default({ text: $data?.event, status: $status }) : ``}` : `${$status === "loading" ? `${slots.loading ? slots.loading({ text: $data?.event, status: $status }) : ``}` : `${slots.nodata ? slots.nodata({ text: $data?.event, status: $status }) : ``}`}`}`}`;
});
async function getUserIcon(url, path) {
  const urlParts = new URL(url);
  const imagePath = urlParts.origin + urlParts.pathname;
  const imageName = generateCacheName(imagePath);
  const cache = await caches.open("user-icon-cache-v1");
  const response = await cache.match(`${path}/usericon/${imageName}`);
  if (response) {
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } else {
    try {
      const fetchResponse = await fetch(imagePath);
      if (fetchResponse.ok) {
        cache.put(`${path}/usericon/${imageName}`, fetchResponse.clone());
        const blob = await fetchResponse.blob();
        return URL.createObjectURL(blob);
      } else {
        return imagePath;
      }
    } catch (error) {
      return imagePath;
    }
  }
}
function generateCacheName(url) {
  const hash = generateHash(url);
  const extension = getFileExtension(url);
  return `image-${hash}.${extension}`;
}
function generateHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}
function getFileExtension(url) {
  const segments = url.split(".");
  return segments[segments.length - 1];
}
const emojiRegex = /(:[^:\s]+:)/;
const urlRegex = /(https?:\/\/+[^\s"'<`\]\)]+[^\s"'<`:\].\)]+)/;
const imageRegex = /\.(?:jpg|jpeg|png|gif|webp)$/i;
const nostrRegex2 = /(nostr:[A-Za-z0-9]+)/;
const numberRegex = /(#\[\d+\])/i;
const hashtagRegex = /(\B#[^\s#.?:/。、　()（）]+)/gi;
async function extractTextParts(text, tags) {
  const emoji = tags.filter((item) => item[0] === "emoji");
  const hashTag = tags.filter((item) => item[0] === "t");
  hashTag.sort((a, b) => b[1].length - a[1].length);
  hashTag.map((tag) => tag[1]).join("|");
  let regexPatterns = [];
  if (emoji.length > 0) {
    regexPatterns.push(emojiRegex.source);
  }
  if (hashTag.length > 0) {
    regexPatterns.push(hashtagRegex.source);
  }
  regexPatterns.push(nostrRegex2.source);
  regexPatterns.push(urlRegex.source);
  regexPatterns.push(imageRegex.source);
  regexPatterns.push(numberRegex.source);
  const regex = new RegExp(regexPatterns.join("|"), "g");
  const words = text.split(regex);
  const parts = [];
  for (let word of words) {
    if (word !== void 0) {
      if (word.match(nostrRegex2)) {
        const index2 = word.indexOf("nostr:");
        const textContent = word.slice(0, index2);
        const nostrContent = word.slice(index2);
        parts.push({
          content: textContent,
          type: "text"
          /* Text */
        });
        parts.push({
          content: nostrContent,
          type: "nostr",
          url: nostrContent.slice(6)
        });
      } else if (emoji.length > 0 && word.match(emojiRegex)) {
        const url = emoji.find((item) => `:${item[1]}:` === word)?.[2];
        if (url) {
          parts.push({
            content: word,
            type: "emoji",
            url
          });
        } else {
          parts.push({
            content: word,
            type: "text"
            /* Text */
          });
        }
      } else if (isValidUrl(word)) {
        if (word.match(urlRegex)) {
          if (word.match(imageRegex)) {
            parts.push({
              content: word,
              type: "image"
              /* Image */
            });
          } else {
            parts.push({
              content: word,
              type: "url"
              /* URL */
            });
          }
        } else {
          parts.push({
            content: word,
            type: "url"
            /* URL */
          });
        }
      } else if (word.match(numberRegex)) {
        if (parseInt(word.slice(2, -1)) < tags.length) {
          parts.push({
            content: word,
            type: "quote",
            number: parseInt(word.slice(2, -1))
          });
        } else {
          parts.push({
            content: word,
            type: "text"
            /* Text */
          });
        }
      } else if (hashTag.length > 0 && word.match(hashtagRegex)) {
        const tag = hashTag.find(
          (item) => new RegExp(`${item[1]}`, "i").test(word)
        );
        if (tag) {
          parts.push({
            content: word,
            type: "hashtag"
            /* Hashtag */
          });
        } else {
          parts.push({
            content: word,
            type: "text"
            /* Text */
          });
        }
      } else {
        parts.push({
          content: word,
          type: "text"
          /* Text */
        });
      }
    }
  }
  return parts;
}
function isValidUrl(string) {
  const urlRegex2 = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  try {
    new URL(string);
    return urlRegex2.test(string);
  } catch (err) {
    return false;
  }
}
const OGP = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ogp } = $$props;
  let { url } = $$props;
  if ($$props.ogp === void 0 && $$bindings.ogp && ogp !== void 0)
    $$bindings.ogp(ogp);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  return `<div class="drop-shadow-md rounded-2xl m-0 p-1 border-2 border-primary-500 hover:drop-shadow-xl z-20 break-all bg-primary-200 dark:bg-primary-700 dark:hover:border-primary-400"><a class=""${add_attribute("href", url, 0)} target="_blank"><div class="grid grid-rows-[auto_1fr]"><div class="grid grid-cols-[auto_1fr] gap-0.5"><div class="overflow-hidden relative rounded-xl max-h-[6rem]">${ogp.image ? `<img class="object-contain object-contain max-h-[6rem]"${add_attribute("src", ogp.image, 0)} alt="">` : ``}</div>
        <div class="p-0.5 grid grid-rows-[auto_1fr] z-10 min-w-[12em]"><div class="line-clamp-2 text-sm font-bold text-primary-800 underline decoration-primary-600 dark:text-primary-300">${escape(ogp.title)}</div>
          <div class="line-clamp-4 text-xs text-primary-500 dark:text-primary-400">${escape(ogp.description)}</div></div></div>

      <div class="flex flex-row-reverse ... -my-1">${ogp.favicon !== "" ? `<img class="object-contain w-5 pl-0.5 pr-0.5"${add_attribute("src", ogp.favicon, 0)} alt="">` : ``}
        <div class="text-xs text-purple-900/50 dark:text-purple-50/50">${escape(new URL(url).hostname)}</div></div></div></a></div>`;
});
const QuoteContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $naddrStore, $$unsubscribe_naddrStore;
  let $allView, $$unsubscribe_allView;
  $$unsubscribe_naddrStore = subscribe(naddrStore, (value) => $naddrStore = value);
  $$unsubscribe_allView = subscribe(allView, (value) => $allView = value);
  let { encodedId } = $$props;
  let { URLPreview } = $$props;
  let { isPageOwner } = $$props;
  async function getEvent(naddr) {
    const addressPointer = nip19.decode(naddr).data;
    console.log($naddrStore);
    if (!(naddr in $naddrStore)) {
      const relays = addressPointer.relays && addressPointer.relays.length > 0 ? addressPointer.relays : RelaysforSearch;
      const filter2 = [
        {
          authors: [addressPointer.pubkey],
          "#d": [addressPointer.identifier],
          kinds: [addressPointer.kind]
        }
      ];
      const res = await fetchFilteredEvents(relays, filter2);
      if (res.length > 0) {
        res.sort((a, b) => b.created_at - a.created_at);
        set_store_value(naddrStore, $naddrStore[naddr] = res[0], $naddrStore);
      }
      return res[0];
    }
    return $naddrStore[naddr];
  }
  const noteId = (encodedId2) => {
    return nip19.decode(encodedId2).type === "note" ? nip19.decode(encodedId2).data : nip19.decode(encodedId2).data.id;
  };
  if ($$props.encodedId === void 0 && $$bindings.encodedId && encodedId !== void 0)
    $$bindings.encodedId(encodedId);
  if ($$props.URLPreview === void 0 && $$bindings.URLPreview && URLPreview !== void 0)
    $$bindings.URLPreview(URLPreview);
  if ($$props.isPageOwner === void 0 && $$bindings.isPageOwner && isPageOwner !== void 0)
    $$bindings.isPageOwner(isPageOwner);
  $$unsubscribe_naddrStore();
  $$unsubscribe_allView();
  return `${nip19.decode(encodedId).type === "note" || nip19.decode(encodedId).type === "nevent" ? `<div class="card border border-surface-400 px-3 py-2 mt-1"><div class="w-full grid grid-rows-[auto_auto] gap-0 h-fix">${validate_component(Text, "Text").$$render(
    $$result,
    {
      queryKey: [noteId(encodedId)],
      id: noteId(encodedId)
    },
    {},
    {
      nodata: ({ text }) => {
        return `<div slot="nodata"><div class="grid grid-cols-[auto_1fr] gap-1 flex"><div class="flex justify-center items-center h-auto"><button class="btn m-0 p-1 variant-filled-primary rounded-full"><!-- HTML_TAG_START -->${searchIcon}<!-- HTML_TAG_END --></button></div>
            <div class="text-sm break-all overflow-hidden">Note not found (${escape(noteId(encodedId))})
            </div></div></div>`;
      },
      error: ({ text }) => {
        return `<div slot="error"><div class="grid grid-cols-[auto_1fr] gap-1 flex"><div class="flex justify-center items-center h-auto"><button class="btn m-0 p-1 variant-filled-primary rounded-full"><!-- HTML_TAG_START -->${searchIcon}<!-- HTML_TAG_END --></button></div>
            <div class="text-sm break-all overflow-hidden">Failed to get note (${escape(noteId(encodedId))})
            </div></div></div>`;
      },
      loading: ({ text }) => {
        return `<div slot="loading"><div class="grid grid-cols-[auto_1fr] gap-1 flex"><div class="flex justify-center items-center h-auto"><button class="btn m-0 p-1 variant-filled-primary rounded-full"><!-- HTML_TAG_START -->${searchIcon}<!-- HTML_TAG_END --></button></div>
            <div class="text-sm break-all overflow-hidden">Loading note... (${escape(noteId(encodedId))})
            </div></div></div>`;
      },
      default: ({ text }) => {
        return `${validate_component(Metadata, "Metadata").$$render(
          $$result,
          {
            queryKey: ["metadata", text.pubkey],
            pubkey: text.pubkey
          },
          {},
          {
            nodata: ({ metadata }) => {
              return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(text.pubkey)}</div>
            <div class="max-h-[20em] overflow-auto break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
                $$result,
                {
                  text: text.content,
                  tag: text.tags,
                  id: text.id,
                  view: $allView,
                  URLPreview,
                  isPageOwner
                },
                {},
                {}
              )}</div></div>`;
            },
            error: ({ metadata }) => {
              return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(text.pubkey)}
              <button class="text-xs underline decoration-secondary-500">${escape(new Date(text.created_at * 1e3).toLocaleString())}</button></div>
            <div class="max-h-[20em] overflow-auto break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
                $$result,
                {
                  text: text.content,
                  tag: text.tags,
                  id: text.id,
                  view: $allView,
                  URLPreview,
                  isPageOwner
                },
                {},
                {}
              )}</div></div>`;
            },
            loading: ({ metadata }) => {
              return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm verflow-hidden">${escape(text.pubkey)}</div>

            <div class="max-h-[20em] overflow-auto break-all whitespace-pre-wrap"><button class="text-xs underline decoration-secondary-500">${escape(new Date(text.created_at * 1e3).toLocaleString())}</button>
              ${validate_component(Content, "Content").$$render(
                $$result,
                {
                  text: text.content,
                  tag: text.tags,
                  id: text.id,
                  view: $allView,
                  URLPreview,
                  isPageOwner
                },
                {},
                {}
              )}</div></div>`;
            },
            default: ({ metadata }) => {
              return `<div class="w-full grid grid-cols-[auto_auto_1fr_auto] gap-1 h-fix"><div>${JSON.parse(metadata.content).picture ? `<img class="h-5 object-contain justify-center"${add_attribute("src", JSON.parse(metadata.content).picture, 0)} alt="avatar">` : ``}</div>

            <div class="wi truncate justify-items-end">${escape(JSON.parse(metadata.content).display_name)}</div>
            <div class="truncate wid min-w-[2em] justify-items-end"><button class="text-emerald-800/60 dark:text-blue-500/60 text-xs">@<u>${escape(JSON.parse(metadata.content).name)}</u></button></div>
            <div class="min-w-max"><button class="text-xs underline decoration-secondary-500">${escape(new Date(text.created_at * 1e3).toLocaleString())}</button></div></div>
          ${text.tags && uniqueTags(text.tags).length > 0 ? `<div class="max-h-[4em] overflow-auto whitespace-nowrap border-s-4 border-s-rose-800/25 dark:border-s-rose-100/25">${each(uniqueTags(text.tags), (tag) => {
                return `${tag[0] === "p" ? `${validate_component(Metadata, "Metadata").$$render(
                  $$result,
                  {
                    queryKey: ["metadata", tag[1]],
                    pubkey: tag[1]
                  },
                  {},
                  {
                    nodata: ({ metadata: metadata2 }) => {
                      return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] ${escape(tag[1])}</div>
                    </div>`;
                    },
                    error: ({ metadata: metadata2 }) => {
                      return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] ${escape(tag[1])}</div>
                    </div>`;
                    },
                    loading: ({ metadata: metadata2 }) => {
                      return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] ${escape(tag[1])}</div>
                    </div>`;
                    },
                    default: ({ metadata: metadata2 }) => {
                      return `<div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] <button class="text-emerald-800 dark:text-blue-400 overflow-hidden text-ellipsis">@<u>${escape(JSON.parse(metadata2.content).name)}</u></button></div>
                  `;
                    }
                  }
                )}` : `${tag[0] === "e" || tag[0] === "q" ? `${validate_component(Text, "Text").$$render($$result, { queryKey: [tag[1]], id: tag[1] }, {}, {
                  nodata: ({ text: text2 }) => {
                    return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}] ${escape(tag[1])}</div>
                    </div>`;
                  },
                  error: ({ text: text2 }) => {
                    return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}] ${escape(tag[1])}</div>
                    </div>`;
                  },
                  loading: ({ text: text2 }) => {
                    return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}] ${escape(tag[1])}</div>
                    </div>`;
                  },
                  default: ({ text: text2 }) => {
                    return `<div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}]
                      <button class="text-emerald-800 dark:text-blue-400 overflow-hidden text-ellipsis">${text2.tags.some((tag2) => tag2[0] === "content-warning") && $allView == false ? `
                          ${escape("<content-warning>")}
                        ` : `
                          ${escape(text2.content)}
                        `}</button></div>
                  `;
                  }
                })}` : `<div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}]
                    ${escape(tag[1])}
                  </div>`}`}`;
              })}</div>` : ``}
          <div class="max-h-[20em] overflow-auto break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
                $$result,
                {
                  text: text.content,
                  tag: text.tags,
                  id: text.id,
                  view: $allView,
                  URLPreview,
                  isPageOwner
                },
                {},
                {}
              )}</div>`;
            }
          }
        )}`;
      }
    }
  )}</div></div>` : `${nip19.decode(encodedId).type === "npub" ? `${validate_component(Metadata, "Metadata").$$render(
    $$result,
    {
      queryKey: ["metadata", nip19.decode(encodedId).data],
      pubkey: nip19.decode(encodedId).data
    },
    {},
    {
      nodata: ({ metadata }) => {
        return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(nip19.decode(encodedId).data)}</div></div>`;
      },
      error: ({ metadata }) => {
        return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(nip19.decode(encodedId).data)}</div></div>`;
      },
      loading: ({ metadata }) => {
        return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(nip19.decode(encodedId).data)}</div></div>`;
      },
      default: ({ metadata }) => {
        return `<button class="inline-flex text-sm text-black/80 dark:text-white/80">@<u>${escape(JSON.parse(metadata.content).name)}</u></button>`;
      }
    }
  )}` : `${nip19.decode(encodedId).type === "nprofile" ? `${validate_component(Metadata, "Metadata").$$render(
    $$result,
    {
      queryKey: ["metadata", nip19.decode(encodedId).data.pubkey],
      pubkey: nip19.decode(encodedId).data.pubkey
    },
    {},
    {
      nodata: ({ metadata }) => {
        return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden">${escape(nip19.decode(encodedId).data.pubkey)}</div></div>`;
      },
      error: ({ metadata }) => {
        return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden">${escape(nip19.decode(encodedId).data.pubkey)}</div></div>`;
      },
      loading: ({ metadata }) => {
        return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden">${escape(nip19.decode(encodedId).data.pubkey)}</div></div>`;
      },
      default: ({ metadata }) => {
        return `<button class="inline-flex text-xs text-black/80 dark:text-white/80">@<u>${escape(JSON.parse(metadata.content).name)}</u></button>`;
      }
    }
  )}` : `${nip19.decode(encodedId).type === "naddr" ? `<div class="card border border-surface-400 px-3 py-2">${validate_component(Metadata, "Metadata").$$render(
    $$result,
    {
      queryKey: ["metadata", nip19.decode(encodedId).data.pubkey],
      pubkey: nip19.decode(encodedId).data.pubkey
    },
    {},
    {
      nodata: ({ metadata }) => {
        return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(nip19.decode(encodedId).data.pubkey)}</div></div>`;
      },
      error: ({ metadata }) => {
        return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(nip19.decode(encodedId).data.pubkey)}</div></div>`;
      },
      loading: ({ metadata }) => {
        return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(nip19.decode(encodedId).data.pubkey)}</div></div>`;
      },
      default: ({ metadata }) => {
        return `<button class="inline-flex text-xs text-black/80 dark:text-white/80">@<u>${escape(JSON.parse(metadata.content).name)}</u></button>`;
      }
    }
  )}

    ${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
      <div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(encodedId)}</div>
    `;
    }
    return function(text) {
      return `
      ${text ? `<button class="-mt-0.5 ml-2 text-xs underline decoration-secondary-500">${escape(new Date(text.created_at * 1e3).toLocaleString())}</button>

        <div class="w-full grid grid-rows-[auto_auto] gap-0 h-fix">${text.tags.length > 0 ? `<div class="max-h-[4em] overflow-auto whitespace-nowrap border-s-4 border-s-rose-800/25">${each(text.tags, (tag) => {
        return `${tag[0] === "p" ? `${validate_component(Metadata, "Metadata").$$render(
          $$result,
          {
            queryKey: ["metadata", tag[1]],
            pubkey: tag[1]
          },
          {},
          {
            default: ({ metadata }) => {
              return `<div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to <button class="text-emerald-800 dark:text-blue-400 overflow-hidden text-ellipsis">@<u>${escape(JSON.parse(metadata.content).name)}</u></button></div>
                  `;
            }
          }
        )}` : `${tag[0] === "e" || tag[0] === "q" ? `${validate_component(Text, "Text").$$render($$result, { queryKey: [tag[1]], id: tag[1] }, {}, {
          default: ({ text: text2 }) => {
            return `<div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[e] <button class="text-emerald-800 dark:text-blue-400 overflow-hidden text-ellipsis">${escape(text2.content)}</button></div>
                  `;
          }
        })}` : `${tag[0] !== "emoji" && tag[0] !== "r" && tag[0] !== "t" ? `<div class="-mt-0.5 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden">[${escape(tag[0])}]
                    ${escape(tag[1])}
                  </div>` : ``}`}`}`;
      })}</div>` : ``}
          <div class="max-h-[20em] overflow-auto break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
        $$result,
        {
          text: text.content,
          tag: text.tags,
          id: text.id,
          view: $allView,
          URLPreview,
          isPageOwner
        },
        {},
        {}
      )}</div></div>` : ``}
    `;
    }(__value);
  }(getEvent(encodedId))}</div>` : ``}`}`}`}`;
});
const QuoteContent2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $allView, $$unsubscribe_allView;
  $$unsubscribe_allView = subscribe(allView, (value) => $allView = value);
  let { id } = $$props;
  let { URLPreview } = $$props;
  let { isPageOwner } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.URLPreview === void 0 && $$bindings.URLPreview && URLPreview !== void 0)
    $$bindings.URLPreview(URLPreview);
  if ($$props.isPageOwner === void 0 && $$bindings.isPageOwner && isPageOwner !== void 0)
    $$bindings.isPageOwner(isPageOwner);
  $$unsubscribe_allView();
  return `<div class="card border border-surface-400 px-3 py-2 mt-1"><div class="w-full grid grid-rows-[auto_auto] gap-0 h-fix">${validate_component(Text, "Text").$$render($$result, { queryKey: [id], id }, {}, {
    nodata: ({ text }) => {
      return `<div slot="nodata"><div class="grid grid-cols-[auto_1fr] gap-1 flex"><div class="flex justify-center items-center h-auto"><button class="btn m-0 p-1 variant-filled-primary rounded-full"><!-- HTML_TAG_START -->${searchIcon}<!-- HTML_TAG_END --></button></div>
          <div class="text-sm break-all overflow-hidden">Loading note... (${escape(id)})
          </div></div></div>`;
    },
    error: ({ text }) => {
      return `<div slot="error"><div class="grid grid-cols-[auto_1fr] gap-1 flex"><div class="flex justify-center items-center h-auto"><button class="btn m-0 p-1 variant-filled-primary rounded-full"><!-- HTML_TAG_START -->${searchIcon}<!-- HTML_TAG_END --></button></div>
          <div class="text-sm break-all overflow-hidden">Loading note... (${escape(id)})
          </div></div></div>`;
    },
    loading: ({ text }) => {
      return `<div slot="loading"><div class="grid grid-cols-[auto_1fr] gap-1 flex"><div class="flex justify-center items-center h-auto"><button class="btn m-0 p-1 variant-filled-primary rounded-full"><!-- HTML_TAG_START -->${searchIcon}<!-- HTML_TAG_END --></button></div>
          <div class="text-sm break-all overflow-hidden">Loading note... (${escape(id)})
          </div></div></div>`;
    },
    default: ({ text }) => {
      return `${validate_component(Metadata, "Metadata").$$render(
        $$result,
        {
          queryKey: ["metadata", text.pubkey],
          pubkey: text.pubkey
        },
        {},
        {
          nodata: ({ metadata }) => {
            return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(text.pubkey)}</div>
          <div class="max-h-40 overflow-auto break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
              $$result,
              {
                text: text.content,
                tag: text.tags,
                id: text.id,
                view: $allView,
                URLPreview,
                isPageOwner
              },
              {},
              {}
            )}</div></div>`;
          },
          error: ({ metadata }) => {
            return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(text.pubkey)}
            <button class="text-xs underline decoration-secondary-500">${escape(new Date(text.created_at * 1e3).toLocaleString())}</button></div>
          <div class="max-h-40 overflow-auto break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
              $$result,
              {
                text: text.content,
                tag: text.tags,
                id: text.id,
                view: $allView,
                URLPreview,
                isPageOwner
              },
              {},
              {}
            )}</div></div>`;
          },
          loading: ({ metadata }) => {
            return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm verflow-hidden">${escape(text.pubkey)}</div>

          <div class="max-h-40 overflow-auto break-all whitespace-pre-wrap"><button class="text-xs underline decoration-secondary-500">${escape(new Date(text.created_at * 1e3).toLocaleString())}</button>
            ${validate_component(Content, "Content").$$render(
              $$result,
              {
                text: text.content,
                tag: text.tags,
                id: text.id,
                view: $allView,
                URLPreview,
                isPageOwner
              },
              {},
              {}
            )}</div></div>`;
          },
          default: ({ metadata }) => {
            return `<div class="w-full grid grid-cols-[auto_auto_1fr_auto] gap-1 h-fix"><div>${JSON.parse(metadata.content).picture ? `<img class="h-5 object-contain justify-center"${add_attribute("src", JSON.parse(metadata.content).picture, 0)} alt="avatar">` : ``}</div>

          <div class="wi truncate justify-items-end">${escape(JSON.parse(metadata.content).display_name)}</div>
          <div class="truncate wid min-w-[2em] justify-items-end"><button class="text-emerald-800/60 dark:text-blue-500/60 text-xs">@<u>${escape(JSON.parse(metadata.content).name)}</u></button></div>
          <div class="min-w-max"><button class="text-xs underline decoration-secondary-500">${escape(new Date(text.created_at * 1e3).toLocaleString())}</button></div></div>
        ${text.tags && uniqueTags(text.tags).length > 0 ? `<div class="max-h-[4em] overflow-auto whitespace-nowrap border-s-4 border-s-rose-800/25 dark:border-s-rose-100/25">${each(uniqueTags(text.tags), (tag) => {
              return `${tag[0] === "p" ? `${validate_component(Metadata, "Metadata").$$render(
                $$result,
                {
                  queryKey: ["metadata", tag[1]],
                  pubkey: tag[1]
                },
                {},
                {
                  nodata: ({ metadata: metadata2 }) => {
                    return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] ${escape(tag[1])}</div>
                  </div>`;
                  },
                  error: ({ metadata: metadata2 }) => {
                    return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] ${escape(tag[1])}</div>
                  </div>`;
                  },
                  loading: ({ metadata: metadata2 }) => {
                    return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] ${escape(tag[1])}</div>
                  </div>`;
                  },
                  default: ({ metadata: metadata2 }) => {
                    return `<div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] <button class="text-emerald-800 dark:text-blue-400 overflow-hidden text-ellipsis">@<u>${escape(JSON.parse(metadata2.content).name)}</u></button></div>
                `;
                  }
                }
              )}` : `${tag[0] === "e" || tag[0] === "q" ? `${validate_component(Text, "Text").$$render($$result, { queryKey: [tag[1]], id: tag[1] }, {}, {
                nodata: ({ text: text2 }) => {
                  return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[e] ${escape(tag[1])}</div>
                  </div>`;
                },
                error: ({ text: text2 }) => {
                  return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[e] ${escape(tag[1])}</div>
                  </div>`;
                },
                loading: ({ text: text2 }) => {
                  return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[e] ${escape(tag[1])}</div>
                  </div>`;
                },
                default: ({ text: text2 }) => {
                  return `<div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[e] <button class="text-emerald-800 dark:text-blue-400 overflow-hidden text-ellipsis">${text2.tags.some((tag2) => tag2[0] === "content-warning") && $allView == false ? `${escape("<content-warning>")}
                      ` : `${escape(text2.content)}
                      `}</button></div>
                `;
                }
              })}` : `<div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}]
                  ${escape(tag[1])}
                </div>`}`}`;
            })}</div>` : ``}
        <div class="max-h-[20em] overflow-auto break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
              $$result,
              {
                text: text.content,
                tag: text.tags,
                id: text.id,
                view: $allView,
                URLPreview,
                isPageOwner
              },
              {},
              {}
            )}</div>`;
          }
        }
      )}`;
    }
  })}</div></div>`;
});
const css = {
  code: ".example.svelte-zj6vf6{--tw-text-opacity:1;color:rgb(var(--color-primary-400) / var(--tw-text-opacity))\n}",
  map: null
};
function getParam(name, url) {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $contentStore, $$unsubscribe_contentStore;
  let $ogpStore, $$unsubscribe_ogpStore;
  $$unsubscribe_contentStore = subscribe(contentStore, (value) => $contentStore = value);
  $$unsubscribe_ogpStore = subscribe(ogpStore, (value) => $ogpStore = value);
  let { id } = $$props;
  let { text } = $$props;
  let { tag } = $$props;
  let { URLPreview } = $$props;
  let { isPageOwner } = $$props;
  function decodeCheck(str) {
    try {
      nip19.decode(str);
      return true;
    } catch (error) {
      return false;
    }
  }
  async function loadOgp(url) {
    if (!$ogpStore[url] || $ogpStore[url].title === "") {
      try {
        const ogp = await getOgp(url);
        ogpStore.update((store) => {
          return { ...store, [url]: ogp };
        });
      } catch (error) {
        console.log(error);
        set_store_value(ogpStore, $ogpStore[url].title = "", $ogpStore);
        set_store_value(ogpStore, $ogpStore[url].image = "", $ogpStore);
        set_store_value(ogpStore, $ogpStore[url].description = "", $ogpStore);
        set_store_value(ogpStore, $ogpStore[url].favicon = "", $ogpStore);
      }
    }
  }
  const pathname = (urlstr) => {
    const url = new URL(urlstr);
    if (url.hostname === "youtu.be") {
      return url.pathname.substring(1);
    } else if (url.hostname === "www.youtube.com" || url.hostname === "m.youtube.com") {
      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.replace("/shorts/", "");
      } else {
        return getParam("v", urlstr);
      }
    }
  };
  async function getTextParts(text2, tag2) {
    if (id in $contentStore) {
      return $contentStore[id];
    } else {
      const content = await extractTextParts(text2, tag2);
      set_store_value(contentStore, $contentStore[id] = content, $contentStore);
      return content;
    }
  }
  let { view = false } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.URLPreview === void 0 && $$bindings.URLPreview && URLPreview !== void 0)
    $$bindings.URLPreview(URLPreview);
  if ($$props.isPageOwner === void 0 && $$bindings.isPageOwner && isPageOwner !== void 0)
    $$bindings.isPageOwner(isPageOwner);
  if ($$props.view === void 0 && $$bindings.view && view !== void 0)
    $$bindings.view(view);
  $$result.css.add(css);
  $$unsubscribe_contentStore();
  $$unsubscribe_ogpStore();
  return `${tag.some((tag2) => tag2[0] === "content-warning") && view == false ? `<button type="button" class="btn variant-filled-warning m-0">content-warning<br>
    ${escape(tag[tag.findIndex((tag2) => tag2[0] === "content-warning")][1])}</button>` : `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
    ${escape(text)}
  `;
    }
    return function(viewContent) {
      return `
    <div class="parent-container break-all whitespace-pre-wrap">${each(viewContent, (item, index) => {
        return `${item.content.length > 0 ? `
          ${item.type === "emoji" ? `<span class="w-[fit-content] inline-flex flex align-bottom">
              <img class="max-h-[1.5em] object-contain"${add_attribute("src", item.url, 0)} alt="">
            </span>` : `${item.type === "url" ? `${URLPreview ? `${new URL(item.content).hostname.endsWith("twitter.com") ? `<div class="max-h-[24rem] max-w-[36rem] overflow-auto"><blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a class="anchor example svelte-zj6vf6"${add_attribute("href", item.content, 0)}>${escape(item.content)}</a>
                    </p></blockquote>

                  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\/script>

                  
                </div>` : `${new URL(item.content).hostname === "www.youtube.com" || new URL(item.content).hostname === "m.youtube.com" || new URL(item.content).hostname === "youtu.be" ? `<iframe class="rounded" width="320" height="180"${add_attribute("src", `https://www.youtube.com/embed/${pathname(item.content)}`, 0)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` : `${item.content?.endsWith(".mp4") ? `<video controls class="max-h-[20em]"><source${add_attribute("src", item.content, 0)} type="video/mp4"><track kind="captions" src="" label="English" default>
                  Your browser does not support the video tag.
                </video>` : `${function(__value2) {
          if (is_promise(__value2)) {
            __value2.then(null, noop);
            return `
                  <span class="break-all whitespace-pre-wrap">
                    <a class="anchor example svelte-zj6vf6"${add_attribute("href", item.content, 0)} target="_blank">${item.content.length > 80 ? `${escape(item.content.slice(0, 75))}...` : `${escape(item.content)}`}
                    </a></span>
                `;
          }
          return function(ogp) {
            return `
                  ${$ogpStore[item.content].title !== "" ? `${validate_component(OGP, "OGP").$$render(
              $$result,
              {
                ogp: $ogpStore[item.content],
                url: item.content
              },
              {},
              {}
            )}` : `<span class="break-all whitespace-pre-wrap">
                      <a class="anchor example svelte-zj6vf6"${add_attribute("href", item.content, 0)} target="_blank">${item.content.length > 80 ? `${escape(item.content.slice(0, 75))}...` : `${escape(item.content)}`}</a>
                    </span>`}
                `;
          }();
        }(loadOgp(item.content))}`}`}`}` : `<span class="break-all whitespace-pre-wrap"><a class="anchor example svelte-zj6vf6"${add_attribute("href", item.content, 0)} target="_blank">${item.content.length > 80 ? `${escape(item.content.slice(0, 75))}...` : `${escape(item.content)}`}</a>
              </span>`}` : `${item.type === "image" ? `${URLPreview ? `
              <span class="w-[fit-content] inline-flex flex align-bottom">
                <img class="max-h-[10em] object-contain"${add_attribute("src", item.content, 0)} alt="" loading="lazy">
              </span>` : `<span class="break-all whitespace-pre-wrap"><a class="anchor example svelte-zj6vf6"${add_attribute("href", item.content, 0)} target="_blank">${item.content.length > 80 ? `${escape(item.content.slice(0, 75))}...` : `${escape(item.content)}`}</a>
              </span>`}` : `${item.type === "nostr" && item.url ? `${decodeCheck(item.url) ? `${validate_component(QuoteContent, "QuoteContent").$$render(
          $$result,
          {
            encodedId: item.url,
            URLPreview,
            isPageOwner
          },
          {},
          {}
        )}` : `<span>${escape(item.content)}</span>`}` : `${item.type === "quote" && item.number !== void 0 ? `
            ${tag[item.number][0] === "p" ? `${validate_component(Metadata, "Metadata").$$render(
          $$result,
          {
            queryKey: ["metadata", tag[item.number][1]],
            pubkey: tag[item.number][1]
          },
          {},
          {
            nodata: ({ metadata }) => {
              return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(tag[item.number][1])}</div>
                </div>`;
            },
            error: ({ metadata }) => {
              return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(tag[item.number][1])}</div>
                </div>`;
            },
            loading: ({ metadata }) => {
              return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">${escape(tag[item.number][1])}</div>
                </div>`;
            },
            default: ({ metadata }) => {
              return `<button class="flex inline-flex text-sm text-black/80 dark:text-white/80">@<u>${escape(JSON.parse(metadata.content).name)}</u></button>
              `;
            }
          }
        )}` : `${tag[item.number][0] === "e" || tag[item.number][0] === "q" ? `
              ${validate_component(QuoteContent2, "QuoteContent2").$$render(
          $$result,
          {
            id: tag[item.number][1],
            URLPreview,
            isPageOwner
          },
          {},
          {}
        )}` : `${tag[item.number][0] === "t" ? `<button class="anchor">#${escape(tag[item.number][1])}</button>` : `${escape(tag[item.number][1])}`}`}`}` : `${item.type === "hashtag" ? `<span class="break-all whitespace-pre-wrap"><button class="anchor">${escape(item.content)}</button>
              
            </span>` : `${item.content.length > 0 ? `<span>${escape(item.content)}</span>` : ``}`}`}`}`}`}`}` : ``}`;
      })}</div>
  `;
    }(__value);
  }(getTextParts(text, tag))}`}`;
});
export {
  Content as C,
  Metadata as M,
  NostrApp as N,
  Text as T,
  app as a,
  getUserIcon as g,
  scanArray as s,
  useReq as u
};
