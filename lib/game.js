(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function(canvas, gameStart) {
    this.gameStart = gameStart;
    this.canvas = canvas;
    this.requestAsteroids = true;
    this.asteroids = [];
    this.round = 0;
  };

  Game.prototype.start = function() {
    this.gameOverText = false;
    this.keyDownHandler();
    this.points = 0;
    this.round = 0;
    this.lives = 3;
    this.ship = new Asteroids.Ship(this.canvas);
    this.asteroids = [];
    this.collision = new Asteroids.Collision(this);
    this.requestAsteroids = true;
    this.refresh();
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

  Game.prototype.drawBorder = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.rect(0, 0, 1024, 768);
    ctx.lineWidth = '3';
    ctx.strokeStyle = 'white';
    ctx.stroke();
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

  Game.prototype.makeAsteroids = function(num) {
    var number = num || 4 + this.round * 2;
    if (this.asteroids.length === 0 && this.requestAsteroids) {
      if (this.ship) {
        this.ship.resetShip();
      }
      this.requestAsteroids = false;
      for (var i = 0; i < number; i++) {
        this.asteroids.push(new Asteroids.Asteroid({
          canvas: this.canvas,
          type: 3,
        }));
      }
      this.requestAsteroids = true;
      this.round += 1;

    }
  };

  var requestId;

  Game.prototype.refresh = function() {
    if (this.gameOverText !== true) {
      kd.tick();
    }
    this.drawBackground();
    this.drawBorder();
    this.makeAsteroids();

    if (this.gameStart.flash === true) {
      this.gameStart.welcome();
    }



    this.collision.removeCollided();
    this.makeAsteroids();
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move().render();
    }

    this.ship.moveBullets().renderBullets();

    if (this.ship.hide !== true) {
      this.ship.move().render();
    }

    requestId = window.requestAnimationFrame(this.refresh.bind(this));
    this.showPoints();
    this.showLives();
    this.checkGameOver();
  };

  Game.prototype.checkGameOver = function() {
    if (this.lives === 0 && this.gameOverText === false) {
      this.gameStart.endGame();
      this.gameStart.gameOverText();
      this.gameOverText = true;
    }
  };

  Game.prototype.remove = function() {
    window.cancelAnimationFrame(requestId);
  };

  Game.prototype.showLives = function() {
    var lives = this.lives;
    for (var i = 0; i < lives; i++) {
      var ctx = this.canvas.getContext('2d');
      ctx.font = '32px vector_battleregular';
      ctx.fillStyle = 'white';
      ctx.fillText(String.fromCharCode("0xC5"), 150 - i * 15, 75);
    }
  };

  Game.prototype.showPoints = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.font = '32px vector_battleregular';
    ctx.fillStyle = 'white';
    ctx.fillText(this.points, 150, 45);
  };
})();
