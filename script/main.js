import Controller from "./controller.js";
import {
  initCanvas,
  render
} from "./render.js";
// ----------- main -------------//

// button
//let a = document.getElementById("play").onclick = startGame;

function startGame() {
  game = new Controller();
  /*
  a.innerHTML = "<canvas id=\"tetris\" width=\"300\" height=\"600\"></canvas>\n";
  // predict
  a.innerHTML += "<canvas id=\"predict\" width=\"120\" height=\"120\"></canvas>\n"; 
  // store
  a.innerHTML += "<canvas id=\"store\" width=\"120\" height=\"120\"></canvas>"; 
  */
  let text_store = document.getElementById("text_store");
  let text_next = document.getElementById("text_next");
  text_store.textContent = "Store";
  text_next.textContent = "Next";

  // draw 
  initCanvas();

  // game main
  window.setInterval(game.updateParameter, 500);
  autoDropID = window.setInterval(game.autoDrop, autoDropSpeed);
  window.setInterval(render, 30, game);
}

startGame();