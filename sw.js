const CACHE_NAME = 'cache-v1';
const CACHE_FILES = [
    'src/images/icons/icon-144x144.png',
    'https://fonst.googleapis/icon?family=Material+Icons',
    'https://code.getmdl.io/1.3.0/material.brown-orange.min.css',
    'https://code.getmdl.io/1.3.0/material.min.js',
    'https://unpqg.com/pwacompat',
    'src/css/app.css',
    'src/js/app.js',
    'index.html'
];

self.addEventListener('install', (event) => {
    //Nosotros deberiamos agregar al cache nuestros archivos
    console.info('[SW]: Adicionando nuestros archivos al cache...');

   const wu = new Promise((resolve, reject) => {
    try{
        setTimeout(() => {
            const adicionandoMisArchivos = '';
            const adicionarVariablesDinamicas = '';
            console.warn('[SW]: Se instalo correctamente...');
            resolve();
        }, 1000); //1 segundo

        self.skipWaiting();
    } catch (error){
        reject(error.message);
    }
   })
   event.waitUntil(wu);

   const guardandoCache = caches.open(CACHE_NAME)
   .then(cache => {
    console.log('---------------------------------');
    console.log(cache);
    console.log('----------------------------------------');
   })
   self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    //La documentacion nos indica eliminar todos los caches atneriores
    console.info('[SW]: Archivos exitosamente guardados...');
    //event.waitUntil(clients.cliam());
});

self.addEventListener('fetch', (event) => {
    console.info('[SW]: Instalando...');
    console.log(event.request.url);
})

self.addEventListener('sync', (event) => {
    console.log('------------------------------------');
    console.log(event);
    console.log('---------------------------------');
});

self.addEventListener('push', (event) => {
    console.error(event);
});