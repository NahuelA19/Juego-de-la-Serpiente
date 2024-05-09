const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];
let food;
let score = 0;
let direction = 'right';

(function setup() {
    snake[0] = {
        x: Math.floor(Math.random() * (columns - 5) + 1),
        y: Math.floor(Math.random() * (rows - 5) + 1)
    };
    createFood();
    document.addEventListener('keydown', changeDirection);
    setInterval(gameLoop, 150);
})();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
}

function moveSnake() {
    const head = {
        x: snake[0].x,
        y: snake[0].y
    };

    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    snake.unshift(head);
    snake.pop();
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(segment.x * scale, segment.y * scale, scale, scale);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const allowedKeys = [37, 38, 39, 40];

    if (allowedKeys.includes(keyPressed)) {
        switch (keyPressed) {
            case 37: // izquierda
                direction = 'left';
                break;
            case 38: // arriba
                direction = 'up';
                break;
            case 39: // derecha
                direction = 'right';
                break;
            case 40: // abajo
                direction = 'down';
                break;
        }
    }
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * columns),
        y: Math.floor(Math.random() * rows)
    };

    // Asegurarse de que la comida no aparezca dentro de la serpiente
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
            createFood();
            return;
        }
    }
}

function checkCollision() {
    const head = snake[0];

    // Colisión con los bordes
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
        alert(`¡Fin del juego! Tu puntuación: ${score}`);
        location.reload();
    }

    // Colisión con la serpiente
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            alert(`¡Fin del juego! Tu puntuación: ${score}`);
            location.reload();
        }
    }

    // Comer comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        createFood();
        snake.push({});
    }
}