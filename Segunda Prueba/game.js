const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Configuración del juego
const gridSize = 20;
const tileCount = 20;
const canvasWidth = gridSize * tileCount;
const canvasHeight = gridSize * tileCount;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const snake = [
    { x: 10, y: 10 }
];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;

// Dibuja la cuadrícula del juego
function drawGrid() {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.strokeStyle = '#3a3a3a';
    for (let x = 0; x < tileCount; x++) {
        for (let y = 0; y < tileCount; y++) {
            ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
        }
    }
}

// Dibuja la serpiente
function drawSnake() {
    ctx.fillStyle = '#00ff00';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// Dibuja la comida
function drawFood() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Dibuja la puntuación
function drawScore() {
    ctx.font = '20px Roboto';
    ctx.fillStyle = '#fff';
    ctx.fillText(`Score: ${score}`, 10, canvasHeight - 10);
}

// Mueve la serpiente
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Colisión con las paredes
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return gameOver();
    }

    // Colisión con la serpiente
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return gameOver();
        }
    }

    // Comida
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        score++;
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

// Game Over
function gameOver() {
    clearInterval(game);
    alert(`Game Over! Your score: ${score}`);
    snake.length = 0;
    score = 0;
    dx = 0;
    dy = 0;
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    game = setInterval(gameLoop, 100);
}

// Bucle principal del juego
function gameLoop() {
    drawGrid();
    drawSnake();
    drawFood();
    drawScore();
    moveSnake();
}

// Iniciar el juego
document.addEventListener('keydown', changeDirection);
let game = setInterval(gameLoop, 100);