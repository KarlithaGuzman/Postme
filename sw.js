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