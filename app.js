document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gamecanvas");
    const ctx = canvas.getContext("2d");
  
    // Mobile control buttons
    const upBtn = document.getElementById("up");
    const downBtn = document.getElementById("down");
    const leftBtn = document.getElementById("left");
    const rightBtn = document.getElementById("right");
    const restartBtn = document.getElementById("restart");
  
    if (!canvas || !ctx) {
      console.error("Canvas not found!");
      return;
    }
  
    let box, snake, direction, food, gameOver, score;
  
    function isMobile() {
      return window.innerWidth < 600;
    }
  
    function resizeCanvas() {
      if (isMobile()) {
        canvas.width = window.innerWidth * 0.9;
        canvas.height = window.innerHeight * 0.7;
      } else {
        canvas.width = 400;
        canvas.height = 400;
      }
      box = Math.floor(canvas.width / 20);
      initGame();
    }
  
    function initGame() {
      snake = [{ x: 10 * box, y: 10 * box }];
      direction = "RIGHT";
      gameOver = false;
      score = 0;  // Reset score when game starts
      placeFood();
    }
  
    function placeFood() {
      food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
      };
    }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw score
      ctx.fillStyle = "orange";
      ctx.font = "20px Arial";
      ctx.fillText("Score: " + score, 10, 25);
  
      // Draw food
      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, box, box);
  
      // Draw snake
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "orange";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(segment.x, segment.y, box, box);
      });
  
      if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        ctx.fillText("Game Over!..Mzee😁😁", canvas.width / 4, canvas.height / 2);
        restartBtn.style.display = "block"; // Show restart button
      }
    }
  
    function update() {
      if (gameOver) return;
  
      let head = { ...snake[0] };
  
      if (direction === "UP") head.y -= box;
      if (direction === "DOWN") head.y += box;
      if (direction === "LEFT") head.x -= box;
      if (direction === "RIGHT") head.x += box;
  
      // Check collision with wall
      if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
        return;
      }
  
      // Check collision with itself
      if (snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        return;
      }
  
      snake.unshift(head);
  
      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        score++; // Increase score
        placeFood();
      } else {
        snake.pop(); // Remove last segment unless food is eaten
      }
    }
  
    function gameLoop() {
      update();
      draw();
      setTimeout(gameLoop, 300);
    }
  
    // Handle keyboard input
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
      if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    });
  
    // Handle button input
    upBtn.addEventListener("click", () => { if (direction !== "DOWN") direction = "UP"; });
    downBtn.addEventListener("click", () => { if (direction !== "UP") direction = "DOWN"; });
    leftBtn.addEventListener("click", () => { if (direction !== "RIGHT") direction = "LEFT"; });
    rightBtn.addEventListener("click", () => { if (direction !== "LEFT") direction = "RIGHT"; });
    // Restart game
  restartBtn.addEventListener("click", () => {
    initGame();
  });
  
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    gameLoop();
  });
  