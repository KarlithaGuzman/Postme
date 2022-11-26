/* Declaracion de variables globales */
let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;
let deferredPrompt;

// Funciones
const showPostModal = () => {
  MAIN.style.display = 'none';
  MODAL_POST.style.display = 'block';
  setTimeout(() => {
    MODAL_POST.style.transform = 'translateY(0)';
  }, 1);
  
};
const closePostModal = () => {
  MAIN.style.display = 'block';
  MODAL_POST.style.transform = 'translateY(100vh)';
};

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('------------------------------------');
  console.log('anulando');
  console.log('------------------------------------');
  e.preventDefault();
  deferredPrompt = e;
});

// Cuando se cargue todo nuestro DOM
window.addEventListener('load', async() => {
  MAIN = document.querySelector('#main');
  MODAL_POST = document.querySelector('#modal-post-section');
  BTN_SHOW_POST = document.querySelector('#btn-upload-post');
  BTN_SHOW_POST.addEventListener('click', showPostModal);
  BTN_CANCEL_POST = document.querySelector('#btn-post-cancel');
  BTN_CANCEL_POST.addEventListener('click', closePostModal);

  //await Notification.requestPermission();

  if('serviceWorker' in navigator){
    const response = await navigator.serviceWorker.register('sw.js');
    if(response){
        console.info('Service worker registrado');
        const ready = await navigator.serviceWorker.ready;
        ready.showNotification('Hola curso-pwa', {
          body: 'Este será un mensaje largo',
          vibrate: [200, 100, 200, 100, 200, 100, 200]
        });
    }
  }
  
  //Código video



  window.Message = (option = 'success', container = document.querySelector('#toast-container')) => {
    container.classList.remove('success');
    container.classList.remove('error');
    container.classList.add(option);
    return container;
  };

  window.Loading = (option = 'block') => {
    document.querySelector('#loading').style.display = option;
  };

  //Loading();

  const bannerInstall = document.querySelector('#banner-install');
  bannerInstall.addEventListener('click', async () => {
    if(deferredPrompt) {
      deferredPrompt.prompt();
      const response = await deferredPrompt.userChoice;
      if (response.outcome === 'dismissed') {
        console.error('El usuario cancelo la instalación');
      }
    }
  });

  //IndexedDb

  if('indexedDB' in window) {
    const request = window.indexedDB.open('mi-base-datos', 2);

    //Observar

    request.onupgradeneeded = event => {
      let db = event.target.result;
      db.createObjectStore('cursos', {
        keyPath: 'id'
      });
    };

    //Errores
    request.onerror = (event) => {
      console.log('-------- Esto cuando ocurrira cualquier cosa que no tengamos en consideracion --------------');
      console.log(event);
      console.log('--------------------------------');
    };

    //Success

    request.onsuccess = (event) => {
      //console.log('-------- Success ----------');
      //console.log(event);
      //console.log('--------------------------------');
      //Agregar
      let db = event.target.result;

      const cursosData = [
        {
          id: '1',
          curso: 'Mi primera PWA',
          descripcion:  'Este sera un curso para trabajar offline'
        },
        {
          id: '2',
          curso: 'React Avanzado',
          descripcion:  'Curso de react con puro hooks'
        },
        {
          id: '3',
          curso: 'Vue Avanzado',
          descripcion:  'Curso en el cual veremos un clon de youtube'
        },
      ];

      let cursosTransaccion = db.transaction('cursos', 'readwrite');

      //Ocurre un error en la transaccion
      cursosTransaccion.onerror = event => {
        console.error('[IDB]', event.target.error);      
      };

      //Informa sobre el éxito de la transaccion
      cursosTransaccion.onComplete = event => {
        console.info('[IDB]', event);
      };
      
      let cursosStore = cursosTransaccion.objectStore('cursos');

      for( let curso of cursosData ) {
        cursosStore.add( curso );
      }

      cursosStore.onsuccess = event => {
        console.info('Nuevo curso agregado al IDB');
      };

    };

  }
  
})