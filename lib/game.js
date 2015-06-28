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

  };

  Game.prototype.drawBackground = function() {
    this.canvas.width = 1024;
    this.canvas.height = 768;
    var ctx = this.canvas.getContext('2d');
    ctx.fillRect(0, 0, 1024, 768);
  };

  Game.prototype.makeAsteroids = function() {
    for (var i = 0; i < 10; i++) {
      this.asteroids.push(Asteroids.Asteroid);
    }
  };

  Game.prototype.startGame = function() {
  };

})();
