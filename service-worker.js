const CACHE_NAME = "dowolny-string";
// List of files which are store in cache.
let filesToCache = ["/", "styles.css", "images/icon.png","images/icon2.png", "main.js"];
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
self.addEventListener("fetch", function (evt) {
  // Snooze logs...
  // console.log(event.request.url);
  evt.respondWith(
    // Firstly, send request..
    fetch(evt.request).catch(function () {
      // When request failed, return file from cache...
      return caches.match(evt.request);
    })
  );
});

function isSuccessful(response) {
  return response &&
    response.status === 200 &&
    response.type === 'basic';
}

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function (response) {
//         if (response) {
//           return response; // Cache hit
//         }

//         return fetch(event.request.clone())
//           .then(function (response) {
//             if (!isSuccessful(response)) {
//               return response;
//             }

//             caches.open(CACHE_NAME)
//               .then(function (cache) {
//                 cache.put(event.request, response.clone());
//               });

//             return response;
//           }
//         );
//       })
//     );
// });


const SHARED_DATA_ENDPOINT = '/token';


self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  const {
    request,
    request: {
      url,
      method,
    },
  } = event;
  if  (url.match(SHARED_DATA_ENDPOINT)) {
    if (method === 'POST') {
      request.json().then(body => {
        caches.open(SHARED_DATA_ENDPOINT).then(function(cache) {
          cache.put(SHARED_DATA_ENDPOINT, new Response(JSON.stringify(body)));
        });
      }); 
      return new Response('{}');
    } else {
      event.respondWith(
        caches.open(SHARED_DATA_ENDPOINT).then(function(cache) {
          return cache.match(SHARED_DATA_ENDPOINT).then(function (response) {
            return response || new Response('{}');;
          }) || new Response('{}');
        })
      );
    }
  } else {
    return event;
  }
});

fetch(SHARED_DATA_ENDPOINT, { method: "POST", body: JSON.stringify({ token: 'sampletoken' })}).then(() => {
  console.log(storageObject.action, storageObject.place, storageObject.date)
});

fetch(SHARED_DATA_ENDPOINT).then(response => response.json()).then(data => {
console.log('Got', data, 'from cache');
});