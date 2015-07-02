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

  Collision.prototype.asteroidCollision = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = 0; j < this.bullets.length; j++) {
        if (this.euclidean(this.asteroids[i].position, this.bullets[j].position) < 40) {
          this.bullets.splice(j, 1);
          this.asteroids.splice(i, 1);
          break;
        }
      }
    }
  };

  Collision.prototype.euclidean = function(asteroidsPos, shipPos) {
    var x = Math.pow(asteroidsPos[0] - shipPos[0], 2);
    var y = Math.pow(asteroidsPos[1] - shipPos[1], 2);
    return Math.sqrt(x + y);
  };

  Collision.prototype.removeCollided = function() {
    this.shipCollision();
    this.asteroidCollision();
  };

  // Collision.prototype.resetShip = function() {
  //   var cleared = true;
  //   while (cleared) {
  //     for (var i = 0; i < this.asteroids.length; i++) {
  //       if (this.euclidean(this.asteroids[i].position, [512, 384]) < 90) {
  //         continue;
  //       }
  //     }

  //     cleared = false;
  //   }
  // };

  Collision.prototype.shipCollision = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.euclidean(this.asteroids[i].position, this.ship.position) < 40 + 16) {
        // this.resetShip();

        this.ship.position = [512, 384];
        this.ship.velocity = [0, 0];
        this.game.timesDied += 1;        
      }
    }
  };

})();
