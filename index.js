const snake = document.getElementById('snake');
const snakes = snake.getElementsByTagName('div');
const food = document.getElementById('food');
const scoreSpan = document.getElementById('score');
const levelSpan = document.getElementById('level');

let score = 0;
let level = 1;

function changeFood() {
    const x = Math.floor(Math.random() * 30) * 10;
    const y = Math.floor(Math.random() * 30) * 10;

    food.style.left = x + "px";
    food.style.top = y + "px";
}

let dir;
let keyActive = true;
const keyArr = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];

const reObj = {
    "ArrowUp": "ArrowDown",
    "ArrowDown": "ArrowUp",
    "ArrowLeft": "ArrowRight",
    "ArrowRight": "ArrowLeft"
}

document.addEventListener("keydown", (event) => {
    if (keyActive && keyArr.includes(event.key)) {
        if (snakes.length < 2 || reObj[dir] !== event.key) {
            dir = event.key;
            keyActive = false;
        }
    }
});

setTimeout(function move() {

    const head = snakes[0];
    let x = head.offsetLeft;
    let y = head.offsetTop;

    switch (dir) {
        case "ArrowUp":
            y -= 10;
            break;
        case "ArrowLeft":
            x -= 10;
            break;
        case "ArrowDown":
            y += 10;
            break;
        case "ArrowRight":
            x += 10;
            break;
    }

    //食物碰撞检测
    if (head.offsetTop === food.offsetTop && head.offsetLeft === food.offsetLeft) {
        changeFood();
        snake.insertAdjacentHTML("beforeend", "<div></div>");
        score += 10;
        scoreSpan.textContent = score;

        if (score % 40 === 0 && level < 15) {
            level++;
            levelSpan.textContent = level;
        }
    }

    /*
        判断游戏是否结束
            1.撞墙
            2.撞自己
    */
    //撞墙
    if (x < 0 || x > 290 || y < 0 || y > 290) {
        alert("游戏结束!");
        return;
    }
    //撞自己
    for (let i = 0; i < snakes.length - 1; i++) {
        if (snakes[i].offsetLeft === x && snakes[i].offsetTop === y) {
            alert("您因身体碰撞死亡！");
            return;
        }
    }

    const tail = snakes[snakes.length - 1];
    tail.style.left = x + "px";
    tail.style.top = y + "px";
    snake.insertAdjacentElement("afterbegin", tail);

    keyActive = true;

    setTimeout(move, 320 - level * 20);
}, 300);