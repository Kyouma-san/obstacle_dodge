

score = 0
cross = true;
let highScoreVal
let width = screen.width;




document.onkeydown = function (e) {
    console.log("key code:", e.key)
    if (e.key == "ArrowUp") {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700)
    } else if (e.key == "ArrowRight") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (width > 800) {
            dino.style.left = (dinoX + 100 < width - 100 ? dinoX + 100 : width - 100) + "px";
        } else {
            dino.style.left = (dinoX + 30 < width - 30 ? dinoX + 30 : width - 30) + "px";
        }

    } else if (e.key == "ArrowLeft") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (width > 800) {
            dino.style.left = (dinoX - 100 > 0 ? dinoX - 100 : 0) + "px";
        } else {
            dino.style.left = (dinoX - 30 > 0 ? dinoX - 30 : 0) + "px";
        }

    }

}


setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    retry = document.querySelector('.retry');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    let highScore = localStorage.getItem("dinoHighScore");
    if (highScore === null) {
        highScoreVal = 0;
        localStorage.setItem("dinoHighScore", JSON.stringify(highScoreVal))
    } else {
        highScoreVal = JSON.parse(highScore)
        highBox.innerHTML = "High Score: " + highScore
    }


    //collision with obstacle for desktop
    
     if(width <= 800 && offsetX < 70 && offsetY < 51){
         gameOver.innerHTML = "Game Over!!!"
         
        gameOver.style.visibility = 'visible';
        
        obstacle.classList.remove('obstacleAni');
        retry.style.visibility = 'visible';
       

        
    } else if (width > 800 && offsetX < 95 && offsetY < 52) {
        
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
        document.onclick = function () {
            location.reload()
        }

        document.onkeydown = function (e) {
            if (e.key == "Enter") {
                location.reload()
            }
        }

    } else if (offsetX < 95 && cross) {
        score += 1;



        hid = window.getComputedStyle(gameOver, null).getPropertyValue('visibility');
        console.log(hid)
        console.log(typeof(hid))
        if(hid == 'hidden'){
            updateScore(score)
        updateHighScore(score)
        }

        
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        //increasing animation duration with increasing score
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            if (width < 500) {
                newDur = aniDur - 0.05;
                obstacle.style.animationDuration = (newDur > 1.6 ? newDur : 1.6) + 's';
            } else {
                newDur = aniDur - 0.1;
                obstacle.style.animationDuration = (newDur > 2.5 ? newDur : 2.5) + 's';
            }


        }, 300);


    }




}, 50);

function updateScore(score) {
    
    scoreCount.innerHTML = "Score: " + score;
}

function updateHighScore(score) {
    //Changing the highscore
    if (score > highScoreVal) {
        highScoreVal = score;
        localStorage.setItem("dinoHighScore", JSON.stringify(highScoreVal))
        highBox.innerHTML = "High Score: " + highScoreVal
    }
}


//Adding support for touch response

function swipedetect(el, callback) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 60, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) { }

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}


window.addEventListener('load', function () {
    var el = document.getElementById('gameContainer')


    swipedetect(el, function (swipedir) {
        if (swipedir != 'none') {

            if (swipedir == "up") {
                dino = document.querySelector('.dino');
                dino.classList.add('animateDino');
                setTimeout(() => {
                    dino.classList.remove('animateDino')
                }, 700)
            } else if (swipedir == "right") {
                dino = document.querySelector('.dino');
                dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
                if (width > 800) {
                    dino.style.left = (dinoX + 100 < width - 100 ? dinoX + 100 : width - 100) + "px";
                } else {
                    dino.style.left = (dinoX + 30 < width - 30 ? dinoX + 30 : width - 30) + "px";
                };
            } else if (swipedir == "left") {
                dino = document.querySelector('.dino');
                dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
                if (width > 800) {
                    dino.style.left = (dinoX - 100 > 0 ? dinoX - 100 : 0) + "px";
                } else {
                    dino.style.left = (dinoX - 30 > 0 ? dinoX - 30 : 0) + "px";
                }
            }
        }
    })
}, false)

function reload(){
    location.reload();
}