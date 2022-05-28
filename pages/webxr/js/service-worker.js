const STATIC_DATA = [
    // HTML Pages
    'index.html',
    // JavaScipt
    'js/webxr.js',
    'js/webxr.three.js',
    // Assets
    'assets/models/hall_empty.glb',
];

const cacheName ='cache_v1';

self.addEventListener('install', e => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(STATIC_DATA)
            .then(()=> self.skipWaiting());
        })
    );
});

self.addEventListener('activate', e => {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
            return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                    console.log('[Service Worker] Caching new resource: '+e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
