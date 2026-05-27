// Service Worker — BinOrder
// 策略：HTML network-first，靜態資源 stale-while-revalidate
// 絕對不快取 Firestore / Auth / QR Code API 請求

const CACHE = 'binorder-v6';

const PRECACHE = [
  '/',
  '/index.html',
  '/admin.html',
  '/qrcode.html',
  '/styles.css',
  '/app.js',
  '/firebase-config.js',
  '/app-config.js',
  '/store-config.js',
  '/store-loader.js',
  '/db-helpers.js',
  '/menu-data.js',
  '/pwa.js',
  '/manifest.webmanifest',
  '/admin.webmanifest',
  '/logo.jpg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/binorder-192.png',
  '/icons/binorder-512.png',
];

// 這些 URL pattern 完全不走 SW，讓瀏覽器直接處理
const BYPASS = [
  /firestore\.googleapis\.com/,
  /identitytoolkit\.googleapis\.com/,
  /securetoken\.googleapis\.com/,
  /firebase\.googleapis\.com/,
  /firebaseio\.com/,
  /api\.qrserver\.com/,
];

// ── Install：預快取核心靜態檔 ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// ── Activate：清除舊版 cache ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ──
self.addEventListener('fetch', event => {
  const req = event.request;

  // 只處理 GET
  if (req.method !== 'GET') return;

  // Bypass：Firestore / Auth / 動態 API 直接放行，不接管
  if (BYPASS.some(p => p.test(req.url))) return;

  const url = new URL(req.url);
  const isHTML = req.mode === 'navigate' ||
                 url.pathname === '/' ||
                 url.pathname.endsWith('.html');

  if (isHTML) {
    // Network-first：盡量拿最新 HTML，離線時才用快取
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) {
            caches.open(CACHE).then(c => c.put(req, res.clone()));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
  } else {
    // Stale-while-revalidate：立刻回傳快取，背景更新
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(req).then(cached => {
          const network = fetch(req).then(res => {
            if (res.ok) cache.put(req, res.clone());
            return res;
          }).catch(() => cached);
          return cached || network;
        })
      )
    );
  }
});
