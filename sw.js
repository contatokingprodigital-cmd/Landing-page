
// Service Worker Temporariamente Desativado para Debug de Estabilidade Mobile
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', (event) => {
  // Pass-through: apenas busca na rede
  return fetch(event.request);
});
