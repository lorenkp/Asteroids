(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function(canvas) {
    this.canvas = canvas;
    this.drawBackground();
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.makeAsteroids();
    window.requestAnimationFrame(this.refresh.bind(this));
  };

  Game.prototype.drawBackground = function() {
    this.canvas.width = 1024;
    this.canvas.height = 768;
    var ctx = this.canvas.getContext('2d');
    ctx.fillRect(0, 0, 1024, 768);
  };

  Game.prototype.refresh = function() {
    this.drawBackground();   
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move().render();
    }
    window.requestAnimationFrame(this.refresh.bind(thisn));
  };

  Game.prototype.makeAsteroids = function() {
    for (var i = 0; i < 10; i++) {
      this.asteroids.push(new Asteroids.Asteroid(this.canvas));
    }
  };

  Game.prototype.startGame = function() {
  };

})();
