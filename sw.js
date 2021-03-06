//console.log("SW hola mundo")
const CACHE_STATIC_NAME = 'static-Cache'
const CACHE_DYNAMIC_NAME = 'dynamic-Cache'
const CACHE_INMUTABLE_NAME = 'inmutable-Cache'

function cleanCache(cacheName, sizeItems) {
    caches.open(cacheName)
        .then(cache => {
            cache.keys().then(keys => {
                console.log(keys)
                if (keys.length >= sizeItems) {
                    cache.delete(keys[0]).then(() => {
                        cleanCache(cacheName, sizeItems)
                    })
                }
            })
        })
}

self.addEventListener('install', (event) => {
    console.log("SW: Instalado")

    const promesaCache = caches.open(CACHE_STATIC_NAME).then((cache) => {
        return cache.addAll([
            '/PWA-FAPF-U2-P2/',
            '/PWA-FAPF-U2-P2/index.html',
            '/PWA-FAPF-U2-P2/js/app.js',
            '/PWA-FAPF-U2-P2/manifest.json'
        ])
    })

    const promInmutable = caches.open(CACHE_INMUTABLE_NAME).then(cacheInmu => {
        return cacheInmu.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js'
        ])
    })

    event.waitUntil(Promise.all([promesaCache, promInmutable]))
});

self.addEventListener('activate', (event) => {
    console.log("SW: Activate");
});

self.addEventListener('fetch', (event) => {
    console.log("SW: UwU")    
    const respuesta = caches.match(event.request)
        .then(resp => {
            if (resp) {
                return resp;
            }
            console.log("No esta en cache", event.request.url)
            return fetch(event.request)
                .then(respNet => {
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then((cache) => {
                            console.log(cache)
                            cache.put(event.request, respNet).then(() => {
                                cleanCache(CACHE_DYNAMIC_NAME, 10)
                            })
                        })
                    return respNet.clone();
                });
        })
    event.respondWith(respuesta)
});