const statusNode=document.getElementById('offlineStatus');
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1')){
 navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(()=>navigator.serviceWorker.ready).then(()=>{statusNode.textContent='Pripravené na offline používanie. Na iPhone: Zdieľať → Pridať na plochu.';}).catch(()=>{statusNode.textContent='Offline uloženie sa nepodarilo. Pripoj sa na internet a znova otvor appku.';});
}else{statusNode.textContent='Offline inštalácia funguje po otvorení cez HTTPS, napríklad cez GitHub Pages.';}
