import { c as create_ssr_component, a as subscribe, n as noop, e as escape, v as validate_component, d as each, l as is_promise, b as add_attribute } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
import { uniq, verify, createRxForwardReq } from "rx-nostr";
import { s as scanArray, u as useReq, a as app, N as NostrApp, M as Metadata, C as Content, g as getUserIcon, T as Text } from "../../../../chunks/Content.js";
import { pipe } from "rxjs";
import "websocket-polyfill";
import { a as allView, n as nowProgress, u as uniqueTags } from "../../../../chunks/functions.js";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { M as Modal, P as ProgressRadial } from "../../../../chunks/Content.svelte_svelte_type_style_lang.js";
import "nostr-tools";
/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */
function useUniqueEventList(rxNostr, queryKey, filters, req) {
  const operator = pipe(uniq(), verify(), scanArray());
  return useReq({ rxNostr, queryKey, filters, operator, req });
}
const UniqueEventList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { filters } = $$props;
  let { req = void 0 } = $$props;
  if ($$props.queryKey === void 0 && $$bindings.queryKey && queryKey !== void 0)
    $$bindings.queryKey(queryKey);
  if ($$props.filters === void 0 && $$bindings.filters && filters !== void 0)
    $$bindings.filters(filters);
  if ($$props.req === void 0 && $$bindings.req && req !== void 0)
    $$bindings.req(req);
  result = useUniqueEventList($app.rxNostr, queryKey, filters, req);
  $$subscribe_data(data = result.data);
  $$subscribe_status(status = result.status);
  $$subscribe_error(error = result.error);
  $$unsubscribe_app();
  $$unsubscribe_error();
  $$unsubscribe_data();
  $$unsubscribe_status();
  return `${$error ? `${slots.error ? slots.error({
    error: $error,
    events: $data?.map(({ event }) => event),
    status: $status
  }) : ``}` : `${$data?.length > 0 ? `${slots.default ? slots.default({
    events: $data?.map(({ event }) => event),
    status: $status
  }) : ``}` : `${$status === "loading" ? `${slots.loading ? slots.loading({
    events: $data?.map(({ event }) => event),
    status: $status
  }) : ``}` : `${slots.nodata ? slots.nodata({
    events: $data?.map(({ event }) => event),
    status: $status
  }) : ``}`}`}`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $allView, $$unsubscribe_allView;
  let $nowProgress, $$unsubscribe_nowProgress;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_allView = subscribe(allView, (value) => $allView = value);
  $$unsubscribe_nowProgress = subscribe(nowProgress, (value) => $nowProgress = value);
  let searchRelays;
  let URLPreview = true;
  const req = createRxForwardReq();
  $$unsubscribe_page();
  $$unsubscribe_allView();
  $$unsubscribe_nowProgress();
  return `${$$result.head += `<!-- HEAD_svelte-193nhrj_START -->${$$result.title = `<title>nostr-bookmark-viewer</title>`, ""}<meta name="description" content="${"ぶくまびうあのハッシュタグ" + escape($page.params.hashtag, true) + "検索"}"><meta prefix="og: https://ogp.me/ns#"><meta property="og:title" content="nostr-bookmark-viewer3"><meta property="og:description" content="${"Nostrのブックマークを見たりできるやつ\nハッシュタグ" + escape($page.params.hashtag, true)}"><meta property="og:image" content="https://nostr-bookmark-viewer3.vercel.app/img2.png"><!-- HEAD_svelte-193nhrj_END -->`, ""}
${validate_component(Modal, "Modal").$$render($$result, {}, {}, {})}

<div class="card border border-purple-800 p-4 w-[22rem] shadow-xl z-20 break-all max-h-[80%] overflow-auto" data-popup="popupFeatured"><div class="arrow bg-surface-100-800-token"></div></div>

<main class="container max-w-5xl px-1 mb-12">${validate_component(NostrApp, "NostrApp").$$render($$result, { relays: searchRelays }, {}, {
    default: () => {
      return `${validate_component(UniqueEventList, "UniqueEventList").$$render(
        $$result,
        {
          queryKey: ["hashtag-list", "unique-hashtag-list", $page.params.hashtag],
          filters: [{ "#t": [$page.params.hashtag], limit: 40 }],
          req
        },
        {},
        {
          nodata: ({ events: hashtags }) => {
            return `<div slot="nodata"><div class="text-sm break-all overflow-hidden">Note not found</div></div>`;
          },
          error: ({ error, events: hashtags }) => {
            return `<div slot="error"><div class="text-sm break-all overflow-hidden">${escape(error)}</div></div>`;
          },
          loading: ({ events: hashtags }) => {
            return `<div slot="loading"><div class="text-sm break-all overflow-hidden">Loading note...</div></div>`;
          },
          default: ({ events: hashtags }) => {
            return `${each(hashtags, (hashtag) => {
              return `${hashtag.kind !== 3 && hashtag.kind !== 6 ? `<div class="card drop-shadow px-1 py-2 my-1 grid grid-cols-[1fr_auto] gap-1">${validate_component(Metadata, "Metadata").$$render(
                $$result,
                {
                  queryKey: ["metadata", hashtag.pubkey],
                  pubkey: hashtag.pubkey
                },
                {},
                {
                  nodata: ({ metadata }) => {
                    return `<div slot="nodata"><div class="text-sm break-all overflow-hidden">Profile not found (${escape(hashtag.pubkey)})
                </div>
                <button class="text-sm underline decoration-secondary-500">${escape(new Date(hashtag.created_at * 1e3).toLocaleString())}</button>
                <div class="parent-container break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
                      $$result,
                      {
                        text: hashtag.content,
                        tag: hashtag.tags,
                        id: hashtag.id,
                        view: $allView,
                        URLPreview,
                        isPageOwner: false
                      },
                      {},
                      {}
                    )}</div>
              </div>`;
                  },
                  error: ({ metadata }) => {
                    return `<div slot="error"><div class="text-sm break-all overflow-hidden">Failed to get profile (${escape(hashtag.pubkey)})
                </div>
                <button class="text-sm underline decoration-secondary-500">${escape(new Date(hashtag.created_at * 1e3).toLocaleString())}</button>
                <div class="parent-container break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
                      $$result,
                      {
                        text: hashtag.content,
                        tag: hashtag.tags,
                        id: hashtag.id,
                        view: $allView,
                        URLPreview,
                        isPageOwner: false
                      },
                      {},
                      {}
                    )}</div>
              </div>`;
                  },
                  loading: ({ metadata }) => {
                    return `<div slot="loading"><div class="text-sm break-all overflow-hidden">Loading profile... (${escape(hashtag.pubkey)})
                </div>

                <button class="text-sm underline decoration-secondary-500">${escape(new Date(hashtag.created_at * 1e3).toLocaleString())}</button>
                <div class="parent-container break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
                      $$result,
                      {
                        text: hashtag.content,
                        tag: hashtag.tags,
                        id: hashtag.id,
                        view: $allView,
                        URLPreview,
                        isPageOwner: false
                      },
                      {},
                      {}
                    )}</div>
              </div>`;
                  },
                  default: ({ metadata }) => {
                    return `<div class="grid grid-cols-[auto_1fr] gap-1"><div class="w-12 h-12 rounded-full flex justify-center overflow-hidden bg-surface-500/25 mt-1">${JSON.parse(metadata.content).picture ? `${function(__value) {
                      if (is_promise(__value)) {
                        __value.then(null, noop);
                        return `
                      <div class="flex justify-center items-center text-sm">loading
                      </div>
                    `;
                      }
                      return function(imageUrl) {
                        return `
                      <img class="w-12 object-contain justify-center"${add_attribute("src", imageUrl, 0)} alt="avatar">
                    `;
                      }(__value);
                    }(getUserIcon(JSON.parse(metadata.content).picture, $page.url.origin))}` : ``}</div>
                <div class="grid grid-rows-[auto_auto_auto] gap-0 break-all w-full"><div class="w-full grid grid-cols-[auto_1fr_auto] gap-1 h-fix"><div class="font-bold wi truncate justify-items-end">${escape(JSON.parse(metadata.content).display_name)}</div>
                    <div class="truncate wid min-w-[2em] justify-items-end"><button class="text-emerald-800 dark:text-blue-500 text-sm">@<u>${escape(JSON.parse(metadata.content).name)}</u></button></div>
                    <div class="min-w-max"><button class="text-sm underline decoration-secondary-500">${escape(new Date(hashtag.created_at * 1e3).toLocaleString())}</button>
                    </div></div>
                  ${uniqueTags(hashtag.tags).length > 0 ? `<div class="max-h-[6em] overflow-auto whitespace-nowrap border-s-4 border-s-rose-800/25 dark:border-s-rose-100/25">${each(uniqueTags(hashtag.tags), (tag) => {
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
                            return `<div slot="loading"><div class="-mt- px-2 opacity-60 text-sm overflow-hidden">to[p] ${escape(tag[1])}</div>
                            </div>`;
                          },
                          default: ({ metadata: metadata2 }) => {
                            return `<div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">to[p] <button class="text-emerald-800 dark:text-blue-400 overflow-hidden text-ellipsis">@<u>${escape(JSON.parse(metadata2.content).name)}</u></button></div>
                          `;
                          }
                        }
                      )}` : `${tag[0] === "e" || tag[0] === "q" ? `${validate_component(Text, "Text").$$render($$result, { queryKey: [tag[1]], id: tag[1] }, {}, {
                        nodata: ({ text }) => {
                          return `<div slot="nodata"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}] ${escape(tag[1])}</div>
                            </div>`;
                        },
                        error: ({ text }) => {
                          return `<div slot="error"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}] ${escape(tag[1])}</div>
                            </div>`;
                        },
                        loading: ({ text }) => {
                          return `<div slot="loading"><div class="-mt-0.5 px-2 opacity-60 text-sm overflow-hidden">[${escape(tag[0])}] ${escape(tag[1])}</div>
                            </div>`;
                        },
                        default: ({ text }) => {
                          return `<div class="-mt-0.5 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden">[${escape(tag[0])}]
                              <button class="text-emerald-800 dark:text-blue-400 whitespace-nowrap overflow-hidden text-ellipsis">${text.tags.some((tag2) => tag2[0] === "content-warning") && $allView == false ? `${escape("<content-warning>")}
                                ` : `${escape(text.content)}
                                `}</button></div>
                          `;
                        }
                      })}` : `<div class="-mt-0.5 px-2 opacity-60 text-sm whitespace-nowrap overflow-hidden">[${escape(tag[0])}]
                            ${escape(tag[1])}
                          </div>`}`}`;
                    })}
                    </div>` : ``}
                  <div class="parent-container break-all whitespace-pre-wrap">${validate_component(Content, "Content").$$render(
                      $$result,
                      {
                        text: hashtag.content,
                        tag: hashtag.tags,
                        id: hashtag.id,
                        view: $allView,
                        URLPreview,
                        isPageOwner: false
                      },
                      {},
                      {}
                    )}</div>
                </div></div>
            `;
                  }
                }
              )}
          </div>` : ``}`;
            })}`;
          }
        }
      )}`;
    }
  })}</main>

<div class="fixed bottom-0 z-10 w-screen"><div class="btn-group py-0.5 variant-filled-primary w-screen justify-center rounded-none"><button type="button" class="btn variant-filled-primary">←戻る</button>
    
    
    <button type="button" class="btn variant-filled-primary">${$allView ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" fill="#42B983"></circle><path d="M6 18L18 6" stroke="white" stroke-width="2" stroke-linecap="round"></path></svg>` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3.5 20.5H20.5L12 2Z" fill="#FDD835"></path><path d="M12 15V17" stroke="black" stroke-width="2" stroke-linecap="round"></path><circle cx="12" cy="11" r="1.5" fill="black"></circle></svg>`}</button></div></div>


<div class="container max-w-5xl mx-auto z-10">${$nowProgress ? `<div class="fixed bottom-2 right-2">${validate_component(ProgressRadial, "ProgressRadial").$$render(
    $$result,
    {
      "...": true,
      stroke: 100,
      meter: "stroke-primary-500",
      track: "stroke-primary-500/30",
      width: "w-24"
    },
    {},
    {}
  )}</div>` : ``}</div>`;
});
export {
  Page as default
};
