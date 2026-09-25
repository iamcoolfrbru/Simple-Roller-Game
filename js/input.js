/* =====================================================================
   input.js  --  READING THE KEYBOARD.

   Nothing in here decides what happens. It only records which keys are
   being held down right now. js/player.js is what reads these values
   and decides to move.
   ===================================================================== */

var Input = {
  left: false,
  right: false,
  jump: false,
  restart: false,
  shift: false
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

// One place that decides which key means what.
// WANT TO ADD A KEY? Add a line here.
function setKey(key, isDown) {
  if (key === "ArrowLeft"  || key === "a" || key === "A") { Input.left  = isDown; }
  if (key === "ArrowRight" || key === "d" || key === "D") { Input.right = isDown; }
  if (key === "ArrowUp"    || key === " " || key === "w" || key === "W") { Input.jump = isDown; }
  if (key === "r" || key === "R") { Input.restart = isDown; }
  if (key === "Shift") { Input.shift = isDown; }  
}

// --- gamepad support ---------------------------------------------------  
// Reads the first connected controller every frame and maps its  
// inputs onto the same Input flags the keyboard uses.  
Input.pollGamepad = function () {  
  var pads = navigator.getGamepads ? navigator.getGamepads() : [];  
  var pad = null;  
  
  // find the first controller that is actually connected  
  for (var i = 0; i < pads.length; i++) {  
    if (pads[i] && pads[i].connected) { pad = pads[i]; break; }  
  }  
  if (!pad) { return; }  
  
  // left stick horizontal: dead zone of 0.3 so tiny drift doesn't move you  
  var stickX = pad.axes[0];  
  if (stickX < -0.3) { Input.left = true; } else { Input.left = false; }  
  if (stickX > 0.3)  { Input.right = true; } else { Input.right = false; }  
  
  // jump: A (button 0) or X (button 2)  
  Input.jump = pad.buttons[0].pressed || pad.buttons[2].pressed;  
  
  // restart: options/menu button (button 9)  
  Input.restart = pad.buttons[9].pressed;  
};  
