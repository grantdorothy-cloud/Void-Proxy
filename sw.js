// Void Proxy — Scramjet Service Worker
// Intercepts all requests under /scram/service/ and proxies them.

importScripts("/scram/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const sw = new ScramjetServiceWorker();

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (event) => {
  if (sw.route(event)) {
    event.respondWith(
      (async () => {
        await sw.loadConfig();
        return sw.fetch(event);
      })()
    );
  }
});
