// ----------- main -------------//
let game = new Controller(getRandom());

let a = document.getElementById("play");
document.addEventListener('click', startGame);

function startGame() {
  a.innerHTML = "<canvas id=\"tetris\" width=\"300\" height=\"600\"></canvas>\n";
  // predict
  a.innerHTML += "<canvas id=\"predict\" width=\"120\" height=\"120\"></canvas>\n"; 
  // store
  a.innerHTML += "<canvas id=\"store\" width=\"120\" height=\"120\"></canvas>"; 
  let text_store = document.getElementById("text_store");
  let text_next = document.getElementById("text_next");
  text_store.textContent = "Store";
  text_next.textContent = "Next";
  // draw 
  initCanvas();
  // game main
  window.setInterval(updateParameter, 500, game);
  autoDropID = window.setInterval(autoDrop, autoDropSpeed, game);
  window.setInterval(render, 30, game);
}