const CACHE_NAME = 'cafe-horizonte-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './cozinha.html',
    './manifest.json',
    './img/logo.png',
    './img/logopwa.png',
    './img/banner512.png',
    './img/banner.png',
    './img/whatsapp.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});
