export function gameCode(){
  const canvas = document.getElementById('canvas');
  canvas.width = 800;
  canvas.height= 600;
  const ctx = canvas.getContext("2d");
    // console.log(ctx);
  var textX = 50;
  var textY = 50;
  var keydown = {};
  var playerBullets = [];
  var enemies = [];
  const FPS = 30;
  setInterval(() => {
      update();
      draw();
  }, 1000/FPS);

  function update(){
    textX ++;
    textY ++;
    if(keydown.right){
      player.x += 5;
    }
    if(keydown.left){
      player.x -= 5;
    }
    if(keydown.space){
      player.shoot();
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
  };

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.draw();
    ctx.fillStyle = "#000";
    ctx.fillText("Hellow World!",textX,textY);
    //draw the active bullets
    playerBullets.forEach(function(bullet){
      bullet.draw();
    });
    //enemies
    enemies.forEach(function(enemy){
      enemy.draw();
    });
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
    console.log(I);
    return I;
  };

  player.shoot = function(){
    console.log("pew");
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
    return I;
  };
};
