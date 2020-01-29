const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
function drawBlock(i, j) {
  ctx.clearRect(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE);
  ctx.fillStyle = 'white';
  ctx.fillRect(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = 'gray';
  ctx.strokeRect(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE);
}
function drawEmpty(i, j) {
  ctx.clearRect(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = 'gray';
  ctx.strokeRect(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE);
}
function drawShadow(i, j) {
  ctx.clearRect(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE);
  ctx.fillStyle = 'gray';
  ctx.fillRect(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = 'white';
  ctx.strokeRect(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE);
}

function render(gameboard) {
  // main draw
  for (let i = 0; i < HEIGHT; ++i) {
    for (let j = 0; j < WIDTH; ++j) {
      if (map[i][j] === true) {
        drawBlock(i, j);
      } 
      // draw piece
      else if (gameboard.x <= j && j <= gameboard.x+3 &&
               gameboard.y <= i && i <= gameboard.y+3 ) {
        const [rotateX, rotateY] =
              rotateIndex(j-gameboard.x, i-gameboard.y, gameboard.rotate);

        if (piece[gameboard.item][rotateY][rotateX] === 1) {
          drawBlock(i, j);
        } else {
          drawEmpty(i, j);
        }
      } else {
        drawEmpty(i, j);
      }
    }
  }

  // draw shadow
  let shadowy = gameboard.y;
  for (let i = 1; i < HEIGHT; ++i) {
    if (doesPieceFit(gameboard.x, shadowy+i, gameboard.rotate, gameboard.item) === false) {
      shadowy += i - 1;
      break;
    } 
  }
  for (let i = shadowy; i < shadowy+4; ++i) {
    for (let j = gameboard.x; j < gameboard.x+4; ++j) {
      const [rotateX, rotateY] =
            rotateIndex(j-gameboard.x, i-shadowy, gameboard.rotate);
      if (i-gameboard.y >= 4) {
        if (piece[gameboard.item][rotateY][rotateX] === 1) drawShadow(i, j);
        continue;
      }
      const [rotateOriginX, rotateOriginY] =
            rotateIndex(j-gameboard.x, i-gameboard.y, gameboard.rotate);
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
