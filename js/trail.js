/* =====================================================================  
   trail.js  --  A FADING STREAK BEHIND THE PLAYER.  
  
   Every few frames we drop a dot where the player is. Old dots fade  
   and vanish, so the player leaves a glowing trail as they roll.  
   ===================================================================== */  
  
var Trail = {  
  dots: []       // each dot: { x, y, life } — life counts down to zero  
};  
  
Trail.reset = function () {  
  Trail.dots = [];  
};  
  
Trail.update = function () {  
  // drop a dot every 4 frames while playing  
  if (Game.mode === "playing" && Game.frameCount % 4 === 0) {  
    Trail.dots.push({  
      x: Player.x + CONFIG.PLAYER_SIZE / 2,  
      y: Player.y + CONFIG.PLAYER_SIZE / 2,  
      life: CONFIG.TRAIL_LIFE  
    });  
  }  
  
  // fade every dot; remove the dead ones  
  for (var i = Trail.dots.length - 1; i >= 0; i--) {  
    Trail.dots[i].life = Trail.dots[i].life - 1;  
    if (Trail.dots[i].life <= 0) {  
      Trail.dots.splice(i, 1);  
    }  
  }  
};  
  
Trail.draw = function () {  
  var ctx = Draw.ctx;  
  for (var i = 0; i < Trail.dots.length; i++) {  
    var dot = Trail.dots[i];  
    // fade from bright to invisible as life runs out  
    var fade = dot.life / CONFIG.TRAIL_LIFE;  
    ctx.globalAlpha = fade * 0.6;  
    ctx.fillStyle = "hsl(" + Game.bgHue + ", 100%, 60%)";  
    ctx.beginPath();  
    ctx.arc(dot.x, dot.y, CONFIG.PLAYER_RADIUS * fade, 0, Math.PI * 2);  
    ctx.fill();  
  }  
  ctx.globalAlpha = 1;  // always reset, or everything else draws faded too  
};  
