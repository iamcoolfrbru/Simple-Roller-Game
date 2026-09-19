/* =====================================================================
   collide.js  --  DID THE PLAYER TOUCH SOMETHING?

   The player is a BOX for collision, even though it is drawn as a
   circle. Boxes are much easier to check, and nobody can tell.

   Every function here answers one yes-or-no question about a box.
   ===================================================================== */

var Collide = {};

// Which grid squares does this box overlap?
// Returns a list of { col: , row: } objects.
Collide.squaresUnder = function (x, y, width, height) {
  var firstCol = Math.floor(x / CONFIG.TILE);
  var lastCol  = Math.floor((x + width  - 1) / CONFIG.TILE);
  var firstRow = Math.floor(y / CONFIG.TILE);
  var lastRow  = Math.floor((y + height - 1) / CONFIG.TILE);

  var squares = [];
  for (var row = firstRow; row <= lastRow; row++) {
    for (var col = firstCol; col <= lastCol; col++) {
      squares.push({ col: col, row: row });
    }
  }
  return squares;
};

// Is this box inside a solid block?
Collide.hitsSolid = function (x, y, width, height) {
  var squares = Collide.squaresUnder(x, y, width, height);
  for (var i = 0; i < squares.length; i++) {
    if (Level.isSolid(squares[i].col, squares[i].row)) { return true; }
  }
  return false;
};

// Is this box touching a spike?  
// Spikes are drawn as triangles, so we check a smaller box than  
// the tile: narrower on the sides and only the bottom two-thirds,  
// so grazing the air near a spike tip doesn't kill you.  
Collide.hitsSpike = function (x, y, width, height) {  
  var squares = Collide.squaresUnder(x, y, width, height);  
  for (var i = 0; i < squares.length; i++) {  
    var col = squares[i].col;  
    var row = squares[i].row;  
    if (!Level.isSpike(col, row)) { continue; }  
  
    // the "real" spike box, inside its tile  
    var inset = CONFIG.TILE * 0.25;          // shave 25% off each side  
    var sx = col * CONFIG.TILE + inset;  
    var sw = CONFIG.TILE - inset * 2;  
    var sy = row * CONFIG.TILE + CONFIG.TILE * 0.3;  // skip the top third  
    var sh = CONFIG.TILE * 0.7;  
  
    // does the player box overlap the spike box?  
    if (x < sx + sw && x + width > sx && y < sy + sh && y + height > sy) {  
      return true;  
    }  
  }  
  return false;  
};  


// Is this box touching the finish?
Collide.hitsFinish = function (x, y, width, height) {
  var squares = Collide.squaresUnder(x, y, width, height);
  for (var i = 0; i < squares.length; i++) {
    if (Level.isFinish(squares[i].col, squares[i].row)) { return true; }
  }
  return false;
};
