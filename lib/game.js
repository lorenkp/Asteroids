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
    this.left = false;
    this.right = false;
    this.up = false;
    this.space = false;
  };

  Game.prototype.start = function() {
    // this.keyDownHandler();
    this.hideLives = true;
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

  // var listener = new window.keypress.Listener();

  Game.prototype.keyDownHandler = function() {
    listener.register_combo({
      'keys': 'left',
      'on_keydown': function() {
        this.left = true;
      }.bind(this),
      'on_keyup': function() {
        this.left = false;
      }.bind(this)
    });

    listener.register_combo({
      'keys': 'right',
      'on_keydown': function() {
        this.right = true;
      }.bind(this),
      'on_keyup': function() {
        this.right = false;
      }.bind(this)
    });

    listener.register_combo({
      'keys': 'up',
      'on_keydown': function() {
        this.up = true;
      }.bind(this),
      'on_keyup': function() {
        this.up = false;
      }.bind(this)
    });

    listener.register_combo({
      'prevent_repeat': true,
      'keys': 'space',
      'on_keydown': function() {
        this.space = true;
      }.bind(this),
      'on_keyup': function() {
        this.space = false;
      }.bind(this)
    });
  };

  Game.prototype.makeAsteroids = function() {
    if (this.asteroids.length === 0 && this.requestAsteroids) {
      this.requestAsteroids = false;
      for (var i = 0; i < 4 + this.round * 2; i++) {
        this.asteroids.push(new Asteroids.Asteroid({
          canvas: this.canvas,
          type: 3,
        }));
      }
      this.requestAsteroids = true;
      this.round += 1;
    }
  };

  Game.prototype.checkKeys = function() {
    // if (this.left === true) {
    //   this.ship.rotateLeft();
    // }

    // if (this.right === true) {
    //   this.ship.rotateRight();
    // }

    // if (this.up === true) {
    //   this.ship.thrust();
    // }

    // if (this.space === true) {
    //   this.ship.fireBullet();
    //   this.space = false;
    // }

    if (keydown.left) {
      this.ship.rotateLeft();
    }

    if (keydown.left) {
      this.ship.rotateRight();
    }

    if (keydown.up) {
      this.ship.thrust();
    }

    if (keydown.space) {
      this.ship.fireBullet();
    }

  };

  Game.prototype.refresh = function() {
    this.drawBackground();
    this.makeAsteroids();
    this.checkKeys();

    if (this.gameStart.flash === true) {
      this.gameStart.welcome();
    }

    if (this.lives === 0) {
      this.gameStart.gameOver();
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

    if (this.hideLives === false) {
      this.showLives();
    }

    window.requestAnimationFrame(this.refresh.bind(this));
    this.showPoints();
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
