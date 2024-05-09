const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Configuración del juego
const gridSize = 20;
const tileCount = canvas.width / gridSize;
const snake = [
    { x: 10, y: 10 }
];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;

// Dibuja la cuadrícula del juego
function drawGrid() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#999';
    for (let x = 0; x < tileCount; x++) {
        for (let y = 0; y < tileCount; y++) {
            ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
        }
    }
}

// Dibuja la serpiente
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// Dibuja la comida
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Mueve la serpiente
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Colisión con las paredes
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return clearInterval(game);
    }

    // Colisión con la serpiente
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return clearInterval(game);
        }
    }

    // Comida
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } else {
        snake.unshift(head);
        snake.pop();
    }
}

// Cambiar la dirección de la serpiente
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

// Bucle principal del juego
function gameLoop() {
    drawGrid();
    drawSnake();
    drawFood();
    moveSnake();
}

// Iniciar el juego
document.addEventListener('keydown', changeDirection);
let game = setInterval(gameLoop, 100);