let principal = $("#principal");
let news = $("#news");
let url = window.location.href
let swDirect = "/PWA-FAPF-U2-P2/sw.js"

if(navigator.serviceWorker){
    console.log("Muy bien");
    if(url.includes('localhost')){
        swDirect = "/sw.js"
    }
    navigator.serviceWorker.register(swDirect)  
}else{    
    console.log("Nada bien")
}

$(".btn-seguir").on("click", function(e){
    e.preventDefault();
    console.log("Btn-seguir pulsado")
    principal.fadeOut(function(){
        news.slideDown(1000)
    })
});

$(".btn-return").on("click", function(){
    news.fadeOut(function(){
        principal.slideDown(1000)
    })
})