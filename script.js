document.onkeydown = function(e){
    console.log("key code:", e.key)
    if(e.key == "ArrowUp" ){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        },700)
    }
}


setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
}, 100);