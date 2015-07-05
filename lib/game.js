(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function(canvas, gameStart) {
    this.gameStart = gameStart;
    this.points = 0;
    this.round = 0;
    this.lives = 3;
    this.ship = new Asteroids.Ship(canvas);
    this.canvas = canvas;
    this.drawBackground();
    this.asteroids = [];
    this.collision = new Asteroids.Collision(this);
    this.keyDownHandler();
    this.seconds = new Date().getSeconds();
    this.requestAsteroids = true;
    window.requestAnimationFrame(this.refresh.bind(this));
  };

  Game.prototype.assignPoints = function(asteroid) {
    if (asteroid.size === 3) {
      this.points += 20;
    } else if (asteroid.size === 2) {
      this.points += 50;
    } else {
      this.points += 100;
    }
  };

  Game.prototype.drawBackground = function() {
    this.canvas.width = 2048;
    this.canvas.height = 1536;
    this.canvas.style.width = "1024px";
    this.canvas.style.height = "768px";
    var ctx = this.canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.fillRect(0, 0, 1024, 768);
  };

  Game.prototype.keyDownHandler = function() {
    kd.LEFT.down(function() {
      this.ship.rotateLeft();
    }.bind(this));

    kd.RIGHT.down(function() {
      this.ship.rotateRight();
    }.bind(this));

    kd.UP.down(function() {
      this.ship.thrust();
    }.bind(this));

    kd.SPACE.press(function() {
      this.ship.fireBullet();
    }.bind(this));
  };

  Game.prototype.refresh = function() {
    kd.tick();
    this.gameStart.welcome();
    this.drawBackground();
    this.makeAsteroids();
    this.collision.removeCollided();
    this.makeAsteroids();
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move().render();
    }

    this.ship.moveBullets().renderBullets();
    this.ship.move().render();
    this.showLives();
    window.requestAnimationFrame(this.refresh.bind(this));
    this.showPoints();
  };

  Game.prototype.makeAsteroids = function() {
    if (this.asteroids.length === 0 && this.requestAsteroids) {
      this.requestAsteroids = false;
      setTimeout(function() {
        for (var i = 0; i < 4 + this.round * 2; i++) {
          this.asteroids.push(new Asteroids.Asteroid({
          canvas: this.canvas,
          type: 3,
          }));
        }
        this.requestAsteroids = true;
      }.bind(this), 3000);  
      this.round += 1;
    }
  };

  Game.prototype.showLives = function() {
    var lives = this.lives;
    for (var i = 0; i < lives; i++) {
      var ctx = this.canvas.getContext('2d');
      ctx.font = '32px vector_battleregular';
      ctx.fillStyle = 'white';
      ctx.fillText(String.fromCharCode("0xC5"), 150 - i * 15, 75);
    }

    // if (this.seconds % 2 === 1) {
    //   var ctx = this.canvas.getContext('2d');
    //   ctx.font = '32px vector_battleregular';
    //   ctx.fillStyle = 'white';
    //   ctx.fillText("PUSH SPACE BAR", 500, 300);
    // }
  };

  Game.prototype.showPoints = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.font = '32px vector_battleregular';
    ctx.fillStyle = 'white';
    ctx.fillText(this.points, 150, 45);
  };

  Game.prototype.startGame = function() {
  };

})();
