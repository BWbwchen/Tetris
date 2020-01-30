// ----------- main -------------//
let game = new Controller(getRandom());
window.setInterval(updateParameter, 500, game);
window.setInterval(autoDrop, 800, game);
window.setInterval(render, 30, game);