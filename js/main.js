/* =====================================================================
   main.js  --  THE STARTING LINE.

   This is the smallest file in the project and it runs last. All it
   does is: set up the screen, load the data files, build the first
   level, and start the loop.

   You will almost never need to change this file.
   ===================================================================== */

Draw.setup();

Level.loadData(function () {
  Game.startLevel(CONFIG.START_LEVEL);
  Game.loop();
});

// --- color inversion toggle -------------------------------------------  
var invertBtn = document.getElementById("invertBtn");  
invertBtn.addEventListener("click", function () {  
  Draw.canvas.classList.toggle("inverted");  
});  

// --- space dust inside the invert button -------------------------------  
var dotTimer = null;  
invertBtn.addEventListener("mouseenter", function () {  
  dotTimer = setInterval(function () {  
    var dot = document.createElement("div");  
    dot.className = "dot";  
    dot.style.left = (Math.random() * 100) + "%";   // random x  
    dot.style.animationDuration = (1 + Math.random()) + "s";  // random speed  
    invertBtn.appendChild(dot);  
    setTimeout(function () { dot.remove(); }, 2000);  // clean up old dots  
  }, 150);  // a new dot every 150ms  
});  
  
invertBtn.addEventListener("mouseleave", function () {  
  clearInterval(dotTimer);  // stop spawning when the mouse leaves  
});  
