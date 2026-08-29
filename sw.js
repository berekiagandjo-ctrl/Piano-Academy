/* =====================================================
   PIANO ACADEMY — SERVICE WORKER
   Version SaaS
===================================================== */

const CACHE_NAME = "piano-academy-v2";


/* =====================================================
   FICHIERS PRINCIPAUX À METTRE EN CACHE
===================================================== */

const FILES = [

    "./",
    "./index.html",

    "./manifest.json",

    "./icon-512.png",

    "./inscription.html",
    "./connexion.html",

    "./dashboard.html",

    "./cours.html",
    "./progression.html",

    "./accords.html",
    "./harmonie.html",
    "./coordination.html",
    "./technique.html",

    "./paramètres.html"

];


/* =====================================================
   INSTALLATION
===================================================== */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(FILES);

                })

        );

        /*
           Active immédiatement la nouvelle version
           du Service Worker.
        */

        self.skipWaiting();

    }
);


/* =====================================================
   ACTIVATION
===================================================== */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
                .keys()
                .then(keys => {

                    return Promise.all(

                        keys.map(key => {

                            /*
                               Supprime tous les anciens caches
                               de Piano Academy.
                            */

                            if(
                                key !== CACHE_NAME
                            ){

                                return caches.delete(key);

                            }

                        })

                    );

                })

        );

        /*
           Prend immédiatement le contrôle
           des pages ouvertes.
        */

        self.clients.claim();

    }
);


/* =====================================================
   REQUÊTES
===================================================== */

self.addEventListener(
    "fetch",
    event => {

        /*
           On ne gère que les requêtes GET.
        */

        if(
            event.request.method !== "GET"
        ){

            return;

        }


        event.respondWith(

            caches
                .match(event.request)
                .then(cachedResponse => {

                    /*
                       Si le fichier existe dans le cache,
                       on l'utilise.
                    */

                    if(
                        cachedResponse
                    ){

                        return cachedResponse;

                    }


                    /*
                       Sinon, on récupère le fichier
                       sur le réseau.
                    */

                    return fetch(event.request)
                        .then(networkResponse => {

                            /*
                               Retourne directement
                               la réponse réseau.
                            */

                            return networkResponse;

                        });

                })

        );

    }
);


/* =====================================================
   MESSAGE — FORCER LA MISE À JOUR
===================================================== */

self.addEventListener(
    "message",
    event => {

        if(
            event.data &&
            event.data.type === "SKIP_WAITING"
        ){

            self.skipWaiting();

        }

    }
);