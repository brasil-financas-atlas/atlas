// Service Worker para Brasil Finanças Atlas (BFA)
const CACHE_NAME = 'bfa-cache-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './src/assets/favicon.svg',
  './src/styles/globals.css',
  './src/styles/typography.css',
  './src/styles/components.css',
  './src/styles/animations.css',
  './src/styles/themes.css',
  './src/styles/admin.css',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&display=swap',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
  'https://cdn.jsdelivr.net/npm/react@18/umd/react.development.js',
  'https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.development.js',
  'https://cdn.jsdelivr.net/npm/@babel/standalone@7/babel.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js',
  'https://cdn.jsdelivr.net/npm/marked@13/marked.min.js',
  'https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Alguns assets externos falharam no pre-cache inicial:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Supabase ou requests dinâmicos de backend: apenas rede
  if (request.url.includes('supabase.co')) {
    return;
  }

  // Stale-While-Revalidate para o app shell e assets estáticos
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Se a rede falhar e for navegação HTML, retorna index em cache
        if (request.mode === 'navigate') {
          return caches.match('./index.html') || cachedResponse;
        }
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
