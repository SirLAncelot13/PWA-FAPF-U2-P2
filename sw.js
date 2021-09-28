//console.log("SW hola mundo")

self.addEventListener('install', (event) => {
    console.log("SW: Instalado")
});

self.addEventListener('activate', (event) => {
    console.log("SW: Activate");
});

self.addEventListener('fetch', (event) => {
    console.log("SW: UwU")    
});