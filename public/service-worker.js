const assets = []; //we can use array and cache our assets
const cacheName = 'v1';


//install service worker
const installEvent = () => {
    self.addEventListener('install', (e) => {
        console.log('service worker installed');
        //in here: can cache all the styles and assets.
        // e.waitUntil(
        //     caches.open(cacheName).then(cache=>{
        //         console.log('caching sell assets');
        //         cache.addAll(assets);
        //     })
        // )
    });
};

installEvent();

//activate service worker
const activeEvent = () => {
  self.addEventListener('activate', (e) => {
     // console.log('service worker activated');

      //after modify the service worker then remove previous caches.
      e.waitUntil(
          caches.keys().then(keys=>{
              // console.log(keys)
              //remove other caches stored in browser which are not equal to cacheName
              return Promise.all(keys
                  .filter(key => key !== cacheName)
                  .map(key=> caches.delete(key))
              )
          })
      );
  });
};

activeEvent();



const cacheClone = async(e) => {
    const res = await fetch(e.request);
    const resClone = res.clone();

    const cache = await caches.open(cacheName);
    await cache.put(e.request, resClone);

    return res;
};

const fetchEvent = () => {
  self.addEventListener('fetch', (e) => {
      //cache only get method requests
      if (e.request.method === 'GET'){
          e.respondWith(
              cacheClone(e)
                  .catch(()=>caches.match(e.request))
                  .then(res=>res)
          );
      }
      //or can use this way to cache all fetch requests
      // e.respondWith(
      //     caches.match(e.request).then(cacheRes => {
      //       return cacheRes || fetch(e.request);
      //     })
      // );
  });
};

fetchEvent();