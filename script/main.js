// ----------- main -------------//
let game = new Controller(getRandom());
window.setInterval(updateParameter, 100, game);
window.setInterval(autoDrop, 400, game);
window.setInterval(render, 20, game);