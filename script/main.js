// ----------- main -------------//
const game = new Controller(6);
window.setInterval(updateParameter, 100, game);
window.setInterval(autoDrop, 1000, game);
window.setInterval(render, 20, game);
