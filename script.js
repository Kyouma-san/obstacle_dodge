//fix going out of screen issue
//cap the animation duration

score = 0
cross = true;
let highScoreVal




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
        dino.style.left = dinoX + 100 + "px";
    } else if (e.key == "ArrowLeft") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 100 + "px";
    }

}


setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

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


    //collision with obstacle
    if (offsetX < 95 && offsetY < 52) {
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




        updateScore(score)
        updateHighScore(score) 
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        //increasing animation duration with increasing score
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = (newDur > 2.5 ? newDur : 2.5) + 's';
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


