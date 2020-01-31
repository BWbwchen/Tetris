document.addEventListener('keydown', keyboardDown);
document.addEventListener('keyup', keyboardUp);

function keyboardDown(e) {
  //keystatus = keystatus.fill(false);
  switch (e.key) {
    case 'w':
    case 'ArrowUp':
      keystatus[2] = true;
      break;
    case 'a':
    case 'ArrowLeft':
      keystatus[1] = true;
      break;
    case 's':
    case 'ArrowDown':
      keystatus[3] = true;
      break;
    case 'd':
    case 'ArrowRight':
      keystatus[0] = true;
      break;
    case ' ':
      keystatus[4] = true;
      break;
    case 'c':
      keystatus[5] = true;
    default:
      break;
  }
  game.updateParameter();
}

function keyboardUp(e) {
  keystatus = keystatus.fill(false);
}