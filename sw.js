
// Service Worker - 缓存优化
const CACHE_NAME='mystic-prediction-v1';
const urlsToCache=[
    '/',
    '/index_mystic.html',
    '/pages/bazi/chart.html',
    '/pages/tarot/daily.html',
    '/pages/palmistry/palm-reading.html',
    '/pages/astrology/horoscope.html',
    '/pages/numerology/life-path.html',
    '/pages/fengshui/home.html',
    '/assets/optimized.css',
    '/assets/optimized.js'
];

self.addEventListener('install',event=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=>cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch',event=>{
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            if(response){
                return response;
            }
            return fetch(event.request);
        })
    );
});
