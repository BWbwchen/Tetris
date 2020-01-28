document.addEventListener('keydown', keyboardDown);
document.addEventListener('keyup', keyboardUp);
function keyboardDown(e) {
  keystatus = keystatus.fill(false);
  switch (e.key) {
    case 'w':
    case 'ArrowUp':
      keystatus[2] = true;
      console.log(e.key);
      break;
    case 'a':
    case 'ArrowLeft':
      keystatus[1] = true;
      console.log(e.key);
      break;
    case 's':
    case 'ArrowDown':
      keystatus[3] = true;
      console.log(e.key);
      break;
    case 'd':
    case 'ArrowRight':
      keystatus[0] = true;
      console.log(e.key);
      break;
    default:
      break;
  }
}
function keyboardUp(e) {
  keystatus = keystatus.fill(false);
  console.log(e.key + ' up');
}
