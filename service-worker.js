const CACHE_NAME = 'random-alarm-app-v1';
const urlsToCache = [
  './',
  './index.html', // Your HTML file
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
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
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
        return fetch(event.request);
      })
  );
});