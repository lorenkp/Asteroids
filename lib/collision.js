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

  Collision.prototype.euclidean = function(asteroidsPos, shipPos) {
    var x = Math.pow(asteroidsPos[0] - shipPos[0] - 16, 2);
    var y = Math.pow(asteroidsPos[1] - shipPos[1] - 16, 2);
    return Math.sqrt(x + y);
  };

  Collision.prototype.removeCollided = function() {
    this.shipDetect();
  };

  Collision.prototype.shipDetect = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.euclidean(this.asteroids[i].position, this.ship.position) < 40 + 16) {
        this.asteroids.splice(i, 1);
      }
    }
  };

})();
