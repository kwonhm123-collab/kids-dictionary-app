const CACHE_NAME = "kids-dictionary-v56";
const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./vocab-bank.js",
  "./top1000-supplement.js",
  "./top2000-supplement.js",
  "./top2200-supplement.js",
  "./ministry3000-supplement.js",
  "./verified-bank-supplement.js",
  "./verified-meaning-overrides.js",
  "./manual-meaning-overrides.js",
  "./manual-extra-overrides.js",
  "./manual-middle-school-additions.js",
  "./manual-excluded-words.js",
  "./manifest.json",
  "./icon.svg",
];

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(APP_FILES);
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    if (request.method === "GET" && response.ok && new URL(request.url).origin === self.location.origin) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (request.method === "GET" && response.ok && new URL(request.url).origin === self.location.origin) {
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheAppShell());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const destination = event.request.destination;
  const shouldPreferFreshCopy =
    event.request.mode === "navigate" ||
    destination === "document" ||
    destination === "script" ||
    destination === "style" ||
    destination === "manifest";

  if (!isSameOrigin) {
    return;
  }

  event.respondWith(shouldPreferFreshCopy ? networkFirst(event.request) : cacheFirst(event.request));
});
