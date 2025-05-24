const CACHE_NAME = 'random-alarm-app-v1';
const urlsToCache = [
  './', // Caches the root URL
  './index.html',
  './manifest.json',
  './service-worker.js',
  'https://cdn.tailwindcss.com', // Tailwind CSS CDN
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js', // Tone.js CDN
  // Add your icon files here if you create them:
  // './icon-192x192.png',
  // './icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: Cache installation failed:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request); // Fallback to network if not in cache
      })
      .catch(error => {
        console.error('Service Worker: Fetch failed:', error);
        // Optionally, return an offline page here
        // return caches.match('/offline.html');
      })
  );
});

// Optional: Activate event to clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});