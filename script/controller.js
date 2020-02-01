class Controller {
  constructor() {
    this.newPiece();
    console.log(this);
  }
  newPiece = () => {
    this.x = 2;
    this.y = 0;
    this.rotate = 0;
    this.item = getRandom();
  }
  renew = () => {
    this.newPiece();
    for (let i = 0; i < HEIGHT; ++i) {
      for (let j = 0; j < WIDTH; ++j) {
        map[i][j] = false;
        colorMap[i][j] = -1;
      }
    }
    storeItem = -1;
    storeBefore = false;
    levelClear = 0;
    level = 0;
    clearAtOnce = 0;
    score = 0;
  }
  updateParameter = () => {
    const [RIGHT, LEFT, ROTATE, DOWN, DOWNBUTTOM, STORE] = keystatus;
    if (STORE) {
      if (!storeBefore || storeItem === -1) {
        storeBefore = true;
        if (storeItem === -1) {
          storeItem = this.item;
          this.newPiece(getRandom());
        } else {
          let temp = this.item;
          this.newPiece(storeItem);
          storeItem = temp
        }
      }
      return;
    }
    if (DOWNBUTTOM) {
      checkDownButton(this);
      return;
    }
    this.x += ((RIGHT &&
          doesPieceFit(this.x + 1, this.y, this.rotate, this.item)) ?
        1 : 0) -
      ((LEFT &&
          doesPieceFit(this.x - 1, this.y, this.rotate, this.item)) ?
        1 : 0);
    this.y += (DOWN &&
        doesPieceFit(this.x, this.y + 1, this.rotate, this.item)) ?
      1 : 0;
    this.rotate += (ROTATE &&
        doesPieceFit(this.x, this.y, this.rotate + 1, this.item)) ?
      1 : 0;
  }

  autoDrop = () => {
    if (doesPieceFit(this.x, this.y + 1, this.rotate, this.item) === false) {
      // push into map
      makeMap(this);
      // clear line
      clearLine();
      // generate new piece
      this.newPiece();
      if (doesPieceFit(this.x, this.y, this.rotate, this.item) === false) {
        this.renew(getRandom());
      }
      adjustAutoDropSpeed(this, level);
      storeBefore = false;
    } else {
      this.y++;
    }
  }
}

function checkDownButton(game) {
  let count = 0;
  for (let i = 1; i < HEIGHT; ++i) {
    if (doesPieceFit(game.x, game.y + i, game.rotate, game.item)) {
      count = i;
    }
  }
  game.y += count;
}

export function doesPieceFit(x, y, rotate, item) {
  // TODO : increase the speed of judge 
  for (let dx = 0; dx < 4; ++dx) {
    for (let dy = 0; dy < 4; ++dy) {
      const [rotateX, rotateY] = rotateIndex(dx, dy, rotate);
      // in the range of map
      if (0 <= x + dx && x + dx < WIDTH && 0 <= y + dy && y + dy < HEIGHT) {
        if (piece[item][rotateY][rotateX] === 1 && map[y + dy][x + dx] === true) {
          return false;
        }
      } else if (piece[item][rotateY][rotateX] === 1) {
        return false;
      }
    }
  }
  return true;
}

export function rotateIndex(dx, dy, rotate) {
  if (rotate % 4 === 0) return [dx, dy];
  else if (rotate % 4 === 1) return [dy, 3 - dx];
  else if (rotate % 4 === 2) return [3 - dx, 3 - dy];
  else if (rotate % 4 === 3) return [3 - dy, dx];
  else return [dx, dy];
}

function makeMap(game) {
  for (let row = 0; row < HEIGHT; ++row) {
    for (let col = 0; col < WIDTH; ++col) {
      if (game.y <= row && row <= game.y + 3 && game.x <= col && col <= game.x + 3) {
        const [rotateX, rotateY] = rotateIndex(col - game.x, row - game.y, game.rotate);
        if (piece[game.item][rotateY][rotateX] === 1) {
          map[row][col] = true;
          colorMap[row][col] = game.item;
        }
      }
    }
  }
}

function adjustAutoDropSpeed(game, speed) {
  window.clearInterval(autoDropID);
  autoDropID = window.setInterval(game.autoDrop, autoDropSpeed - speed * hard);
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
  clearAtOnce = fullLine.length;
  levelClear += fullLine.length;
  if (levelClear >= 10) {
    level++;
    adjustAutoDropSpeed(level);
    levelClear -= 10;
  }

  // clear line
  for (let i = 0; i < fullLine.length; ++i) {
    for (let j = fullLine[i]; j > 0; --j) {
      for (let col = 0; col < WIDTH; ++col) {
        map[j][col] = map[j - 1][col];
        colorMap[j][col] = colorMap[j - 1][col];
      }
    }
  }
}

function getRandom() {
  let temp = predict;
  predict = Math.floor(Math.random() * Math.floor(7));
  return temp;
}

export default Controller;