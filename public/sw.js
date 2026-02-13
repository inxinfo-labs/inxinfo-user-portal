// Minimal service worker so the site can be installed as a PWA (Add to Home Screen).
// Caches the app shell on install; network-first for API and navigation.
const CACHE_NAME = 'inxinfo-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
  )));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== location.origin || event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
