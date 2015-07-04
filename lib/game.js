(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function(canvas) {
    this.points = 00;
    this.lives = 3;
    this.ship = new Asteroids.Ship(canvas);
    this.canvas = canvas;
    this.drawBackground();
    this.asteroids = [];
    this.makeAsteroids();
    this.collision = new Asteroids.Collision(this);
    this.keyDownHandler();
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
    ctx.scale(2,2);
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
    this.drawBackground();
    this.collision.removeCollided();
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
    for (var i = 0; i < 4; i++) {
      this.asteroids.push(new Asteroids.Asteroid({
        canvas: this.canvas,
        size: 3,
      }));
    }
  };

  Game.prototype.showLives = function() {
    var lives = this.lives;
    for (var i = 0; i < lives; i++) {
      this.ship.showLives(150 - i * 35, 75);
    }
  };

  Game.prototype.showPoints = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.font = '32px vector_battleregular';
    ctx.fillStyle = 'white';
    ctx.fillText(this.points, 100, 50);
  };

  Game.prototype.startGame = function() {
  };

})();
