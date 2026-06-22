const STUDY_CACHE = "study-lab-v5";
const STUDY_ASSETS = [
  "/study/",
  "/study/index.html",
  "/study/styles.css",
  "/study/word-bank.js",
  "/study/app.js",
  "/study/manifest.webmanifest",
  "/favicon.svg",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/analytics.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(STUDY_CACHE).then((cache) => cache.addAll(STUDY_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith("study-lab-") && key !== STUDY_CACHE).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const clone = response.clone();
      caches.open(STUDY_CACHE).then((cache) => cache.put(event.request, clone));
      return response;
    }).catch(() => caches.match("/study/")))
  );
});
