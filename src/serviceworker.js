
var CACHE_NAME = "nostr-bookamrk-viewer3";

var urlsToCache = [
    "/",
];

// install
self.addEventListener("install", function (event) {
    // @ts-ignore
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});
// activate
self.addEventListener("activate", function (event) {
    var cacheWhitelist = [CACHE_NAME];
    // @ts-ignore
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
// fetch
self.addEventListener("fetch", function (event) {
    // @ts-ignore
    event.respondWith(
        // @ts-ignore
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }

            // @ts-ignore
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(function (response) {
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }

                var responseToCache = response.clone();

                caches.open(CACHE_NAME).then(function (cache) {
                    // @ts-ignore
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});
