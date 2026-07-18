// Service worker do Arkad — cache do "app shell" para uso offline e instalação como PWA.
var CACHE_NAME = "arkad-cache-v1";
var APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/android-chrome-192x192.png",
  "./assets/android-chrome-512x512.png",
  "./assets/maskable-icon-512x512.png",
  "./assets/apple-touch-icon.png",
  "./assets/favicon-32x32.png",
  "./assets/favicon-16x16.png",
  "./favicon.ico"
];

self.addEventListener("install", function(event){
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(APP_SHELL);
    })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_NAME; })
            .map(function(k){ return caches.delete(k); })
      );
    }).then(function(){ return self.clients.claim(); })
  );
});

// Estratégia: cache-first para o app shell, com atualização em segundo plano (stale-while-revalidate).
self.addEventListener("fetch", function(event){
  if(event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(function(cached){
      var network = fetch(event.request).then(function(response){
        if(response && response.status === 200){
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function(cache){ cache.put(event.request, copy); });
        }
        return response;
      }).catch(function(){ return cached; });
      return cached || network;
    })
  );
});
