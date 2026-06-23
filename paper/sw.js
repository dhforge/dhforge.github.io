const PAPER_CACHE = "printable-paper-lab-v3";
const PAPER_ASSETS = [
  "/paper/",
  "/paper/index.html",
  "/paper/styles.css",
  "/paper/app.js",
  "/paper/manifest.webmanifest",
  "/favicon.svg",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/analytics.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(PAPER_CACHE).then((cache) => cache.addAll(PAPER_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith("printable-paper-lab-") && key !== PAPER_CACHE).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const destination = event.request.destination;
  const networkFirst = event.request.mode === "navigate" || ["document", "script", "style"].includes(destination);
  if (networkFirst) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(PAPER_CACHE).then((cache) => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("/paper/")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const clone = response.clone();
      caches.open(PAPER_CACHE).then((cache) => cache.put(event.request, clone));
      return response;
    }).catch(() => caches.match("/paper/")))
  );
});
