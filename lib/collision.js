(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Collision = Asteroids.Collision = function(game) {
    this.game = game;
    this.canvas = game.canvas;
    this.asteroids = game.asteroids;
    this.bullets = game.ship.bullets;
    this.ship = game.ship;
    this.shipNotSpawning = true;
  };

  Collision.prototype.asteroidCollision = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = 0; j < this.bullets.length; j++) {
        if (this.euclidean(this.asteroids[i].position,
            this.bullets[j].position) < this.asteroids[i].size / 3 + 5) {
          this.game.assignPoints(this.asteroids[i]);
          var type = this.asteroids[i].type - 1;
          var position = this.asteroids[i].position;
          this.asteroids.splice(i, 1);
          this.bullets.splice(j, 1);
          this.makeBrokenAsteroid(type, position);
          break;
        }
      }
    }
  };

  Collision.prototype.makeBrokenAsteroid = function(type, position) {
    if (type > 0) {
      for (var i = 0; i < 2; i++) {
        this.asteroids.push(new Asteroids.Asteroid({
          canvas: this.canvas,
          type: type,
          velMult: 5 - type,
          position: position.slice(0)
        }));
      }
    }  
  };

  Collision.prototype.euclidean = function(x, y) {
    var xX = Math.pow(x[0] - y[0], 2);
    var yY = Math.pow(x[1] - y[1], 2);
    return Math.sqrt(xX + yY);
  };

  Collision.prototype.removeCollided = function() {
    this.asteroidCollision();
    if (this.ship.reseting !== true) {
      this.shipCollision();
    }
  };

  Collision.prototype.shipCollision = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.euclidean(this.asteroids[i].position, this.ship.position) < this.asteroids[i].size / 3 + 16) {
        this.ship.reseting = true;    
        setTimeout(function() {
          this.ship.resetShip();
          this.ship.reseting = false; 
        }.bind(this), 2000);
        this.game.lives -= 1;        
      }
    }
  };
})();
