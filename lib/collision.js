(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Collision = Asteroids.Collision = function(game) {
    this.game = game;
    this.asteroids = game.asteroids;
    this.bullets = game.ship.bullets;
    this.ship = game.ship;
  };

  Collision.prototype.removeCollided = function() {
    this.shipDetect();
  };

  Collision.prototype.shipDetect = function() {

  };
})();
