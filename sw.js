/**
 * 服务工作线程
 * 处理离线缓存和资源管理
 */

const CACHE_NAME = 'bazi-analyzer-v1';
const CACHE_FILES = [
    '/',
    '/index.html',
    '/js/core/service.js',
    '/js/core/calculator.js',
    '/js/core/analyzer.js',
    '/js/core/i18n.js',
    '/js/core/storage.js',
    '/js/data/config.js',
    '/js/data/wuxing.js',
    '/js/data/ganzhi.js',
    '/js/data/lunar.js',
    '/js/data/translations.js'
];

// 安装服务工作线程
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});

// 激活服务工作线程
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// 处理资源请求
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // 如果在缓存中找到响应，则返回缓存的响应
                if (response) {
                    return response;
                }

                // 否则发送网络请求
                return fetch(event.request).then(
                    (response) => {
                        // 检查是否收到有效的响应
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // 克隆响应
                        const responseToCache = response.clone();

                        // 将响应添加到缓存
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
}); 