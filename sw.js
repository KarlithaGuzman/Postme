self.addEventListener('install', (event) => {
    //Nosotros deberiamos agregar al cache nuestros archivos
    console.info('[SW]: Adicionando nuestros archivos al cache...');

    setTimeout(() => {
        console.warn('[SW]: Se instalo correctamente...');
    }, 1000); //1 segundo
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.info('[SW]: Archivos exitosamente guardados...');
    //event.waitUntil(clients.cliam());
});

self.addEventListener('fetch', (event) => {
    console.info('[SW]: Instalando...');
})