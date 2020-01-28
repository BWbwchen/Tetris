class Controller {
  constructor(randomPiece) {
    this.x = 2;
    this.y = 0;
    this.rotate = 0;
    this.item = randomPiece;
    this.isEnd = false;
  }

  End() {
    return this.isEnd;
  }
}

function updateParameter(game) {
  const [RIGHT, LEFT, ROTATE, DOWN, DOWNBUTTOM, STORE] = keystatus;
  game.x += ((RIGHT &&
                doesPieceFit(game.x+1, game.y, game.rotate, game.item)) ?
                1:0) -
               ((LEFT &&
                doesPieceFit(game.x-1, game.y, game.rotate, game.item)) ?
                1:0);
  game.y += (DOWN &&
                doesPieceFit(game.x, game.y+1, game.rotate, game.item)) ?
                1:0;
  game.rotate += (ROTATE &&
                    doesPieceFit(game.x, game.y, game.rotate+1, game.item)) ?
                    1:0;
}

function doesPieceFit(x, y, rotate, item) {
  for (let dx = 0; dx < 4; ++dx) {
    for (let dy = 0; dy < 4; ++dy) {
      const [rotateX, rotateY] = rotateIndex(dx, dy, rotate);
      // in the range of map
      if (0 <= x+dx && x+dx<WIDTH && 0 <= y+dy && y+dy < HEIGHT) {
        if (piece[item][rotateY][rotateX] === 1 && map[y+dy][x+dx] === true) {
          return false;
        }
      } else if (piece[item][rotateY][rotateX] === 1) {
        return false;
      }
    }
  }
  return true;
}

function rotateIndex(dx, dy, rotate) {
  if (rotate%4 === 0) return [dx, dy];
  else if (rotate%4 === 1) return [dy, 3-dx];
  else if (rotate%4 === 2) return [3-dx, 3-dy];
  else if (rotate%4 === 3) return [3-dy, dx];
}

function autoDrop (game) {
  game.y += doesPieceFit(game.x, game.y+1, game.rotate, game.item) ? 1:0; 
}