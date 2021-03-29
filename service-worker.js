const CACHE_NAME = "dowolny-string";
// List of files which are store in cache.
let filesToCache = [
  "/",
  "styles.css",
  "images/icon.png",
  "images/icon2.png",
  "connection-state.js",
  "main.js",
  "index.html",
];
self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(filesToCache);
      })
      .catch(function (err) {
        // Snooze errors...
        // console.error(err);
      })
  );
});
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function (error) {
      console.log(
        "[Service Worker] Network request Failed. Serving content from cache: " +
          error
      );
      //Check to see if you have it in the cache
      //Return response
      //If not in the cache, then return error page
      return caches
        .open(
          "sw-precache-v3-sw-precache-webpack-plugin-https://silent-things.surge.sh"
        )
        .then(function (cache) {
          return cache.match(event.request).then(function (matching) {
            var report =
              !matching || matching.status == 404
                ? Promise.reject("no-match")
                : matching;
            return report;
          });
        });
    })
  );
});
