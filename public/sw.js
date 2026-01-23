self.addEventListener("install", event => {
  // console.log('Service Worker: Installed');
  event.waitUntil(self.skipWaiting());
});

// 2. 서비스 워커 활성화
self.addEventListener("activate", event => {
  // console.log('Service Worker: Activated');
  event.waitUntil(self.clients.claim());
});
