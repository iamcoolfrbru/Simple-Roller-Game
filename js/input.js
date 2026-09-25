/* =====================================================================
   input.js  --  READING THE KEYBOARD.

   Nothing in here decides what happens. It only records which keys are
   being held down right now. js/player.js is what reads these values
   and decides to move.
   ===================================================================== */

var Input = {  
  keyLeft: false,  
  keyRight: false,  
  keyJump: false,  
  keyRestart: false,  
  shift: false,  
  select: null,  
  left: false,  
  right: false,  
  jump: false,  
  restart: false  
};  

// Called whenever a key goes DOWN.
window.addEventListener("keydown", function (event) {
  setKey(event.key, true);
  // stop the arrow keys and space from scrolling the page
  if (["ArrowLeft", "ArrowRight", "ArrowUp", " "].indexOf(event.key) >= 0) {
    event.preventDefault();
  }
});

// Called whenever a key comes back UP.
window.addEventListener("keyup", function (event) {
  setKey(event.key, false);
});

function setKey(key, isDown) {  
  if (key === "ArrowLeft"  || key === "a" || key === "A") { Input.keyLeft  = isDown; }  
  if (key === "ArrowRight" || key === "d" || key === "D") { Input.keyRight = isDown; }  
  if (key === "ArrowUp"    || key === " " || key === "w" || key === "W") { Input.keyJump = isDown; }  
  if (key === "r" || key === "R") { Input.keyRestart = isDown; }  
  if (key === "Shift") { Input.shift = isDown; }  
}  

Input.pollGamepad = function () {  
  // start from what the keyboard says  
  var left   = Input.keyLeft;  
  var right  = Input.keyRight;  
  var jump   = Input.keyJump;  
  var restart = Input.keyRestart;  
  
  var pads = navigator.getGamepads ? navigator.getGamepads() : [];  
  var pad = null;  
  for (var i = 0; i < pads.length; i++) {  
    if (pads[i] && pads[i].connected) { pad = pads[i]; break; }  
  }  
  
  // if a controller is connected, OR its inputs in  
  if (pad) {  
    var stickX = pad.axes[0];  
    if (stickX < -0.3) { left = true; }  
    if (stickX > 0.3)  { right = true; }  
    jump = jump || pad.buttons[0].pressed || pad.buttons[2].pressed;  
    restart = restart || pad.buttons[9].pressed;  
  }  
  
  // the merged result is what the game reads  
  Input.left = left;  
  Input.right = right;  
  Input.jump = jump;  
  Input.restart = restart;  
};  
