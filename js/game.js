/* =====================================================================
   game.js  --  THE RULES AND THE LOOP.

   The game is always in exactly ONE mode: "playing", "dead", or "won".
   Which mode it is in decides what happens each frame.

   The loop runs about 60 times a second, forever. Every time it runs it
   does the same two things: UPDATE (change the numbers) and DRAW (show
   the numbers).
   ===================================================================== */

var Game = {
  mode: "playing",   // "playing", "dead", or "won"
  levelNumber: 0,
  jumpWasDown: false,
  bgHue: CONFIG.BG_START_HUE,
  frameCount: 0
};

Game.startLevel = function (levelNumber) {
  Game.levelNumber = levelNumber;
  Level.build(levelNumber);
  Player.reset();
  Game.mode = "playing";
  Game.showMessage("");
};

Game.showMessage = function (text) {
  document.getElementById("message").textContent = text;
};

// --- ONE FRAME --------------------------------------------------------
Game.update = function () {

  Game.frameCount = Game.frameCount + 1;  

  // R always restarts, no matter what mode we are in.
    if (Input.restart) {  
    if (Input.shift) {  
      Game.startLevel(0);  
    } else {  
      Game.startLevel(Game.levelNumber);  
    }  
    return;  
  }  

  
  var jumpJustPressed = Input.jump && !Game.jumpWasDown;  
  Game.jumpWasDown = Input.jump;  
  
  // --- pick a fresh random neon color on every ground jump -----------  
  if (jumpJustPressed && Player.onGround) {  
    Game.bgHue = Math.floor(Math.random() * 360);  
  }  
  
  if (Game.mode === "won" && jumpJustPressed) {  
    var nextLevel = Game.levelNumber + 1;  
    if (nextLevel < Level.levels.length) {  
      Game.startLevel(nextLevel);  
    } else {  
      Game.showMessage("You beat every level! Press R to restart.");  
    }  
  }  


  // If we are not playing, nothing moves. We just wait for R.
  if (Game.mode !== "playing") { return; }

  Player.update();

  if (Player.isDead()) {
    Game.mode = "dead";
    Game.showMessage("You hit something. Press R to try again.");
    return;
  }

  if (Player.hasWon()) {
    Game.mode = "won";
    Game.showMessage("Level complete! Press space to continue.");
    return;
  }
};

// --- THE LOOP ITSELF --------------------------------------------------
Game.loop = function () {
  Game.update();
  Draw.updateCamera();
  Draw.everything();
  window.requestAnimationFrame(Game.loop);
};
