let canvas;
let ctx;
let canvas_store;
let ctx_store;
let scoreSystem = document.getElementById("scoring");
let levelSystem = document.getElementById("level");

function drawBlock(i, j, color) {
  ctx.clearRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
  ctx.fillStyle = color;
  ctx.fillRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
}

function drawEmpty(i, j) {
  ctx.clearRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = 'gray';
  ctx.strokeRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
}

function drawShadow(i, j) {
  ctx.clearRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
  ctx.fillStyle = 'gray';
  ctx.fillRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = 'white';
  ctx.strokeRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
}

function drawMainGame(gameboard) {
  // main draw
  for (let i = 0; i < HEIGHT; ++i) {
    for (let j = 0; j < WIDTH; ++j) {
      if (map[i][j] === true) {
        drawBlock(i, j, color[colorMap[i][j]]);
      }
      // draw piece
      else if (gameboard.x <= j && j <= gameboard.x + 3 &&
        gameboard.y <= i && i <= gameboard.y + 3) {
        const [rotateX, rotateY] =
        rotateIndex(j - gameboard.x, i - gameboard.y, gameboard.rotate);

        if (piece[gameboard.item][rotateY][rotateX] === 1) {
          drawBlock(i, j, color[game.item]);
        } else {
          drawEmpty(i, j);
        }
      } else {
        drawEmpty(i, j);
      }
    }
  }
}

function drawMainShadow(gameboard) {
  // draw shadow
  let shadowy = gameboard.y;
  for (let i = 1; i < HEIGHT; ++i) {
    if (doesPieceFit(gameboard.x, shadowy + i, gameboard.rotate, gameboard.item) === false) {
      shadowy += i - 1;
      break;
    }
  }
  for (let i = shadowy; i < shadowy + 4; ++i) {
    for (let j = gameboard.x; j < gameboard.x + 4; ++j) {
      const [rotateX, rotateY] =
      rotateIndex(j - gameboard.x, i - shadowy, gameboard.rotate);
      if (i - gameboard.y >= 4) {
        if (piece[gameboard.item][rotateY][rotateX] === 1) drawShadow(i, j);
        continue;
      }
      const [rotateOriginX, rotateOriginY] =
      rotateIndex(j - gameboard.x, i - gameboard.y, gameboard.rotate);
      if (piece[gameboard.item][rotateY][rotateX] === 1) {
        if (piece[gameboard.item][rotateOriginY][rotateOriginX] === 1) {
          // do nothing
        } else {
          drawShadow(i, j);
        }
      }
    }
  }
}

function drawPredictBlock(gameboard) {
  // draw predict block
  for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 4; ++j) {
      if (piece[predict][i][j] === 1) {
        // draw block
        ctx_store.clearRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
        ctx_store.fillStyle = color[predict];
        ctx_store.fillRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
        ctx_store.strokeStyle = 'black';
        ctx_store.strokeRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
      } else {
        // draw empty
        ctx_store.clearRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
        ctx_store.strokeStyle = 'gray';
        ctx_store.strokeRect(BLOCK_SIZE * j, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

function drawGameInfo() {
  let temp;
  if (clearAtOnce === 1) score += 40*(level+1);
  else if (clearAtOnce === 2) score += 100*(level+1);
  else if (clearAtOnce === 3) score += 300*(level+1);
  else if (clearAtOnce === 4) score += 1200*(level+1);

  clearAtOnce = 0;

  scoreSystem.textContent = "Score : " + score;
  levelSystem.textContent = "Level : " + level;
}

function render(gameboard) {
  drawMainGame(gameboard);
  drawMainShadow(gameboard);
  drawPredictBlock(gameboard);
  drawGameInfo();
}