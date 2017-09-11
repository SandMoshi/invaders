const gameCode = (function(){

    const canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height= 600;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // console.log(ctx);
    var keydown = {};
    var keypressed = false;
    var playerBullets = [];
    var enemies = [];
    var S = score({});
    var scores = [];
    var leaderboard;
    var showL;
    const FPS = 30;

  function refresh(a){
    if (a != "stop"){
      var mytimer = window.setInterval(function() {
          update();
          draw();
      }, 1000/FPS);
    }
    else if (a == "stop"){
      console.log("stop!");
      window.clearInterval(6); //6 is what mytimer is
    }
  }

  function update(){
    if(keydown.right){
      player.x += 5;
    }
    if(keydown.left){
      player.x -= 5;
    }
    if(keydown.space && !keypressed){
      player.shoot();
      keypressed = true;
    }
    //prevent player from travelling off-screen
    player.x = Math.max(0, Math.min(player.x,canvas.width - player.width));

    playerBullets.forEach(function(bullet){
      bullet.update();
    });
    //only show active bullets
    playerBullets = playerBullets.filter(function(bullet){
      return bullet.active;
    });
    //enemies
    enemies.forEach(function(enemy){
      enemy.update();
    });
    enemies = enemies.filter(function(enemey){
      return enemey.active;
    });
    if(Math.random() < 0.1){
      enemies.push(Enemy());
    };
    //check if anything has collided
    handleCollisions();
  };

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    player.draw();
    //draw the active bullets
    playerBullets.forEach(function(bullet){
      bullet.draw();
    });
    //enemies
    enemies.forEach(function(enemy){
      enemy.draw();
    });
    S.draw();
  };

  const player = {
    color: "#00A",
    x: 220,
    y: canvas.height * 0.9,
    width: 32,
    height: 32,
    draw: function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  //listen for keyboard presses
  window.addEventListener('keydown', function(e){
    // console.log(e.keyCode);
    if (e.keyCode === 39){
      //right arrow
      keydown.right = true;
    }
    if (e.keyCode === 37){
      //right arrow
      keydown.left = true;
    }
    if (e.keyCode === 32){
      //space bar
        keydown.space = true;
    }
  });
  //listen for keyboard depress
  window.addEventListener('keyup', function(e){
    keypressed = false;
    //clear the corresponding key
    if (e.keyCode === 39){
      //right arrow
      keydown.right = false;
    }
    if (e.keyCode === 37){
      //right arrow
      keydown.left = false;
    }
    if (e.keyCode === 32){
      //space bar
      keydown.space = false;
    }
  });

  function Bullet(I){
    //stores the bullet instances
    I.active = true;
    //initialize the bullet properties
    I.xVelocity = 0;
    I.yVelocity = -I.speed;
    I.width = 3;
    I.height = 10;
    I.color = "red";
    //checks if bullet is inbound
    I.inBounds = function(){
      return I.x >= 0 && I.x <= canvas.width &&
        I.y >= 0 && I.y <= canvas.height;
    };
    //draws the bullet to the canvas when called
    I.draw = function(){
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    //updates the position of the bullet when called
    I.update = function(){
      I.x += I.xVelocity;
      I.y += I.yVelocity;
      //bullet stays active if inbounds
      I.active = I.active && I.inBounds();
    };
    //console.log(I);
    return I;
  };

  player.shoot = function(){
    //console.log("pew");
    var bulletPosition = this.midpoint();
    bulletPosition.y = bulletPosition.y - player.height/2;
    //add bullet to the array
    playerBullets.push(Bullet({
      speed: 5,             //speed the bullet will move
      x: bulletPosition.x,  //starting position of bullet
      y: bulletPosition.y,  //starting position of bullet
    }));
  };

  player.midpoint = function(){
    //finds the midpoint of the player (starting position of bullet)
    return{
      x: this.x + this.width/2,
      y: this.y + this.height/2,
    };
  };

  player.explode = function(){
    console.log("game over!");
    //add explosion graphic here
    //show the score
    // scores[0] = S;
    // scores[0].show();
  };

  function Enemy(I){
    I = I || {};

    I.active = true;
    I.age = Math.floor(Math.random() * 128);
    I.color = "#A2B";

    I.x = canvas.width / 4 + Math.random() * canvas.width/2;
    I.y = 0;
    I.xVelocity = 0;
    I.yVelocity = 2;

    I.width = 32;
    I.height = 32;

    I.inBounds = function(){
      return I.x >= 0 && I.x <= canvas.width && I.y >= 0 && I.y <= canvas.height;
    };

    I.draw = function(){
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    I.update = function(){
      I.x += I.xVelocity;
      I.y += I.yVelocity;

      I.xVelocity = 3 * Math.sin(I.age * Math.PI/64);
      I.age++;
      I.active = I.active && I.inBounds();
    };

    I.explode = function(){
      this.active = false;
      //add explosion graphic here
    };
    return I;
  };

  //collision detection
  function collides(a,b){
    //returns true if object a and b are overlapping
    return a.x < b.x + b.width && //is a to the left of b's right edge?
           a.x + a.width > b.x && //is a to the right of b's left edge?
           a.y < b.y + b.height && //is a above b's bottom edge?
           a.y + a.height > b.y //is a below b's top edge?
           //if all the above are true, the items overlap and hence have
           //collided so the function will return true
  };

  function handleCollisions(){
    playerBullets.forEach((bullet) => {
      enemies.forEach((enemy) =>{
        //for each bullet check if it has collided with the enemy
        if(collides(bullet, enemy)){
          //if true
          enemy.explode();
          bullet.active = false;
          S.addkill();
        };
      });
    });
    enemies.forEach((enemy) => {
      if(collides(enemy, player)){
        enemy.explode();
        player.explode();
      };
    });
  };

  function score(S){
    //always show the score normally
    S.active = true;
    //initialize the score
    S.score = 0;

    S.addkill = function(){
      S.score += 10;
    };

    S.show = function(){
      S.active = true;
    };

    S.hide = function(){
      S.active = false;
    }

    S.draw =  function(){
      var str = "Your score: " + S.score.toString();
      ctx.font = '24px sans-serif';
      var x = canvas.width - ctx.measureText(str).width - 20;
      var y = canvas.height*0.05 ;
      ctx.fillText(str,x,y);
    };
    return S;
  };

  function newGame(){
  };

  return{
    refresh: refresh,
  }
});
export default gameCode;
//-----------------------
export function showLeaderboard(){
  console.log("showLeaderboard ran");
  //this refers to component
 const leaderboardDIV = document.querySelector("div.leaderboard");
 leaderboardDIV.classList.remove("hidden");
 leaderboardDIV.style.top = "0";
};

export function EscMessage(){
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");
  var str = "Press Esc to exit";
  ctx.font = '18px sans-serif';
  var x = 20;
  var y = canvas.height*0.95 ;
  ctx.fillStyle = "yellow";
  var count = 0; //used for flashing effect
  var esctimer = window.setInterval(function() {
      ++count
      if(count % 2 == 0){
        ctx.fillStyle = "yellow";
        ctx.fillText(str,x,y);
      }
      else{
        ctx.clearRect(20,y-20,ctx.measureText(str).width+20,y);
        ctx.fillStyle = "black";
        ctx.fillRect(20,y-20,ctx.measureText(str).width+20,y);;
      }
   }, 1000);
}
//-----------------------
