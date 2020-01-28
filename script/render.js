const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
function render(gameboard) {
  for (let i = 0; i < HEIGHT; ++i) {
    for (let j = 0; j < WIDTH; ++j) {
      ctx.clearRect(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE);
      if (map[i][j] === true) {
        ctx.fillRect(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE);
      } else if (gameboard.x <= j && j <= gameboard.x+3 &&
                     gameboard.y <= i && i <= gameboard.y+3 ) {
        // draw piece
        const [rotateX, rotateY] =
            rotateIndex(j-gameboard.x, i-gameboard.y, gameboard.rotate);
        if (piece[gameboard.item][rotateY][rotateX] === 1) {
          ctx.fillRect(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }
  }
}
