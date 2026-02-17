// Scramjet Service Worker
// This file is registered by index.html and intercepts all fetch events
// under the /scram/service/ prefix, routing them through the proxy.

importScripts('/scram/scramjet.all.js');

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const sw = new ScramjetServiceWorker();

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (sw.route(event)) {
    event.respondWith(
      (async () => {
        await sw.loadConfig();
        return sw.fetch(event);
      })()
    );
  }
  // All other requests pass through normally
});
