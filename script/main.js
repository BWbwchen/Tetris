// ----------- main -------------//
let game = new Controller(getRandom());

let a = document.getElementById("play");
document.addEventListener('click', startGame);

function startGame() {
  a.innerHTML = "<canvas id=\"tetris\" width=\"300\" height=\"600\"></canvas>\n<canvas id=\"store\" width=\"120\" height=\"120\"></canvas>";
  // draw 
  canvas = document.getElementById('tetris');
  ctx = canvas.getContext('2d');
  canvas_store = document.getElementById('store');
  ctx_store = canvas_store.getContext('2d');
  // game main
  window.setInterval(updateParameter, 500, game);
  window.setInterval(autoDrop, 800, game);
  window.setInterval(render, 30, game);
}