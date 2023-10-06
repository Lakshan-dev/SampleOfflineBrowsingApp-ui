const installEvent = () => {
    self.addEventListener('install', () => {
        console.log('service worker installed');
    });
};
installEvent();

const activeEvent = () => {
  self.addEventListener('active', () => {
     console.log('service worker activated');
  });
};
activeEvent();

const cacheName = 'v1';

const cacheClone = async(e) => {
    const res = await fetch(e.request);
    const resClone = res.clone();

    const cache = await caches.open(cacheName);
    await cache.put(e.request, resClone);

    return res;
};

const fetchEvent = () => {
  self.addEventListener('fetch', (e) => {
      if (e.request.method === 'GET'){
          e.respondWith(
              cacheClone(e)
                  .catch(()=>caches.match(e.request))
                  .then(res=>res)
          );
      }
  });
};

fetchEvent();