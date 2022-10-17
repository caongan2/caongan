let canvas = document.getElementById("myCanvas");
let c = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");
let img4 = document.getElementById("img4");
let paddle =
    {
        a: 270,
        b: 650,
        w: 120,
        h: 20
    }

let y = 630
let x = 330
let speedY = 3
let speedX = 3
let score = 0
let level = 1
let lives = 3


let status = 0
let btn_start = {
    a: 20,
    b: 140,
    w: 40,
    h: 25
}

let btn_stop = {
    a: 80,
    b: 140,
    w: 40,
    h: 25
}

let btn_reset = {
    a: 140,
    b: 140,
    w: 50,
    h: 25
}
let brickColumCout = 9
let brickRowcout = 6
let brickWidth = 50
let brickHeight = 10
let brickPadding = 10
let brickSetTop = 20
let brickSetLeft = 240

let bricks = []
for (let i = 0; i < brickColumCout; i++) {
    bricks[i] = []
    for (let j = 0; j < brickRowcout; j++) {
        bricks[i][j] = {x: 0, y: 0, status: 1}
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill()
    ctx.closePath()

    if (x > 780 || x < 220) {
        speedX = -speedX
    }
    x += speedX;
    if (y < 0) {
        speedY = -speedY
    }
    if (y > 700) {
        status = 0
        x = paddle.a
        y = paddle.b
        lives--
        speedY = -speedY
        speedX = -speedX
        animatetion()
        if (lives === 0) {
            alert("Gêm Âu Vờ!!!")
            document.location.reload()
            clearInterval(interval)
        }

    }
    y -= speedY
    if (paddle.a + paddle.w > 800) {
        paddle.a = 650
    }
    if (x > paddle.a && x <= paddle.a + paddle.w && y >= 680 - paddle.h) {
        speedY = -speedY
    }
}


function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.a, paddle.b, paddle.w, paddle.h)
    ctx.fill()
    ctx.fillStyle = "#3fc41c"
    ctx.closePath()
}

function drawStraightLine() {
    ctx.beginPath()
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 680);
    ctx.lineWidth = 10
    ctx.fillStyle = "#3fc41c"
    ctx.stroke();
    ctx.closePath()
}

function drawBrick() {
    for (let i = 0; i < brickColumCout; i++) {
        for (let j = 0; j < brickRowcout; j++) {
            if (bricks[i][j].status === 1) {
                brickX = (i * (brickWidth + brickPadding) + brickSetLeft)
                brickY = (j * (brickHeight + brickPadding) + brickSetTop)
                bricks[i][j].x = brickX
                bricks[i][j].y = brickY
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#3fc41c";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function collisionBrick() {
    for (let i = 0; i < brickColumCout; i++) {
        for (let j = 0; j < brickRowcout; j++) {
            let b = bricks[i][j]
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    speedY = -speedY
                    score++
                    bricks[i][j] = 0
                    if (score == brickColumCout * brickRowcout) {
                        alert("Diu Guyn")
                        document.location.reload()
                        clearInterval(interval)
                    }
                    //if (y == 680-paddle.h && x > paddle.a && x <= paddle.a + paddle.w){
                    if (score >= 0 && score <= 15) {
                        img1.style.display = 'inline-block'
                        img2.style.display = 'none'
                        img3.style.display = 'none'
                        img4.style.display = 'none'
                    } else if (score > 15 && score <= 30) {
                        level = 2
                        speedX = 5
                        speedY = 5
                        img1.style.display = 'none'
                        img2.style.display = 'inline-block'
                        img3.style.display = 'none'
                        img4.style.display = 'none'

                    } else if (score > 30 && score <= 45) {
                        level = 3
                        speedX = 6
                        speedY = 6
                        img1.style.display = 'none'
                        img2.style.display = 'none'
                        img3.style.display = 'inline-block'
                        img4.style.display = 'none'

                    } else if (score > 45 && score <= 54) {
                        level = 4
                        speedX = 7
                        speedY = 7
                        img1.style.display = 'none'
                        img2.style.display = 'none'
                        img3.style.display = 'none'
                        img4.style.display = 'inline-block'
                    }
                    //}
                }
            }
        }
    }
}


function drawScore() {
    let c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 30, 50);
}

function drawLevel() {
    let c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Level: " + level, 30, 80);
}

function drawLives() {
    let c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Lives: " + lives, 30, 110);
}


function animatetion() {

    ctx.clearRect(0, 0, 800, 700)
    drawBall()
    drawPaddle()
    drawStraightLine()
    drawScore()
    drawLevel()
    drawLives()
    drawBrick()
    Playbutton()
    pausebutton()
    collisionBrick()
    resetButton()
    let loop = false
    if (status === 0) {
        cancelAnimationFrame(loop);
        x = 330
        y = 630
        // draw()
    } else {
        loop = requestAnimationFrame(animatetion)
    }

}

function isInside(pos, rect) {
    return pos.x > rect.a && pos.x < rect.a + rect.w && pos.y < rect.b + rect.h && pos.y > rect.b
}

function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function Playbutton() {
    /*
        audio.play();
    */
    let c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(btn_start.a, btn_start.b, btn_start.w, btn_start.h);
    ctx.fillStyle = '#1c4087';
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#35bb3c';
    ctx.stroke();
    ctx.closePath();
    ctx.font = '18px Kremlin Pro Web';
    ctx.fillStyle = '#268636';
    ctx.fillText('Start', btn_start.a + 2, btn_start.b + 17);
}

function pausebutton() {
    let c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(btn_stop.a, btn_stop.b, btn_stop.w, btn_stop.h);
    ctx.fillStyle = 'rgba(222,195,16,0)';
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#1db620';
    ctx.stroke();
    ctx.closePath();
    ctx.font = '18px Kremlin Pro Web';
    ctx.fillStyle = '#55d012';
    ctx.fillText('Stop', btn_stop.a + 2, btn_stop.b + 17);
}

function resetButton() {
    let c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(btn_reset.a, btn_reset.b, btn_reset.w, btn_reset.h);
    ctx.fillStyle = 'rgba(222,195,16,0)';
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#1db620';
    ctx.stroke();
    ctx.closePath();
    ctx.font = '18px Kremlin Pro Web';
    ctx.fillStyle = '#55d012';
    ctx.fillText('Reset', btn_reset.a + 2, btn_reset.b + 17);
}


animatetion()

canvas.addEventListener('click', function (evt) {
    let mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos, btn_start)) {
        status = 1
        animatetion()
    } else if (isInside(mousePos, btn_stop)) {
        status = 0
    } else if (isInside(mousePos, btn_reset)) {
        document.location.reload()
    }


}, false);

window.addEventListener("mousemove", function (e) {
    paddle.a = e.clientX + 200
})

