const cacheName = 'restaurants-v1';

var cacheFiles = [
    '/css/styles.css',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    'index.html',
    'restaurant.html'
];

// Service Worker installation event
self.addEventListener('install', (e) => {
    console.log('Service Worker Installed');
    e.waitUntil(caches.open(cacheName).then((cache) => {
        return cache.addAll(cacheFiles);
    }));
});

//Activate Service Worker
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((cache) => {
            if (cache !== cacheName) {
                console.log('Service Worker: previous cache cleared');
                return caches.delete(cache);
            }
        }));
    }));
});

//On offline, fetch
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});

