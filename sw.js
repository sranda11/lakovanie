const PREFIX='lakovanie-'+self.registration.scope;
const CACHE=PREFIX+'v5';
const FILES=['./','./index.html','./app.js','./install.js','./manifest.webmanifest','./logo.png','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const cached=await cache.match(req,{ignoreSearch:true});
  if(cached)return cached;
  if(req.mode==='navigate'){const home=await cache.match(new URL('./index.html',self.registration.scope).href);if(home)return home;}
  return fetch(req);
 }));
});
