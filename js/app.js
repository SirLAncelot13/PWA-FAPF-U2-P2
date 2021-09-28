let principal = $("#principal");
let news = $("#news");

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