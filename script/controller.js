let end = false;
class Controller {
  constructor(randomPiece) {
    this.x = 2;
    this.y = 0;
    this.rotate = 0;
    this.item = randomPiece;
  }
  newPiece(randomPiece) {
    this.x = 2;
    this.y = 0;
    this.rotate = 0;
    this.item = randomPiece;
  }
  renew(randomPiece) {
    this.newPiece(randomPiece);
    for (let i = 0; i < HEIGHT; ++i) {
      for (let j = 0; j < WIDTH; ++j) {
        map[i][j] = false;
      }
    }
  }
}

function checkDownButton(game) {
  let count = 0;
  for (let i = 1; i < HEIGHT; ++i) {
    if (doesPieceFit(game.x, game.y+i, game.rotate, game.item)) {
      count++;
    }
  }
  game.y += count;
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
  if (DOWNBUTTOM) checkDownButton(game);
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

function makeMap (game) {
  for (let row = 0; row < HEIGHT; ++row) {
    for (let col = 0; col < WIDTH; ++col) {
      if (game.y <= row && row <= game.y+3 && game.x <= col && col <= game.x+3) {
        const [rotateX, rotateY] = rotateIndex(col-game.x, row-game.y, game.rotate);
        if (piece[game.item][rotateY][rotateX] === 1) map[row][col] = true;
      }
    }
  }
}

function clearLine() {
  let fullLine = [];
  // record full line 
  for (let row = 0; row < HEIGHT; ++row) {
    var full = true;
    for (let col = 0; col < WIDTH; ++col) {
      if (map[row][col] !== true) {
        full = false;
        break;
      }
    }
    if (full) fullLine.push(row);
  }

  // clear line
  for (let i = 0; i < fullLine.length; ++i) {
    for (let j = fullLine[i]; j > 0; --j) {
      for (let col = 0; col < WIDTH; ++col) {
        map[j][col] = map[j-1][col];
      }
    }
  }
}
function getRandom() {
  return Math.floor(Math.random() * Math.floor(7));
}

function autoDrop (game) {
  if (doesPieceFit(game.x, game.y+1, game.rotate, game.item) === false) {
    // push into map
    makeMap(game);
    // clear line
    clearLine();
    // generate new piece
    game.newPiece(getRandom());
    if (doesPieceFit(game.x, game.y, game.rotate, game.item) === false) {
      game.renew(getRandom());
    } 
  } else {
    game.y++;
  } 
}