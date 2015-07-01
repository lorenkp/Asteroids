(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(canvas) {
    this.velocityVector = this.initialVelocity();
    this.position = this.initialPosition();
    this.collisionBoundariesX = [0, 0]; 
    this.collisionBoundariesY = [0, 0]; 
    this.canvas = canvas;
  };

  Asteroid.prototype.initialPosition = function() {
    var positionArray = [];
    positionArray.push(Math.round(Math.random() * 1024));
    positionArray.push(Math.round(Math.random() * 768));
    return positionArray;
  };

  Asteroid.prototype.render = function() {
    var ctx = this.canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(this.position[0],
      this.position[1], 40, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
  };

  Asteroid.prototype.initialVelocity = function() {
    var velocityArray = [];

    for (var i = 0; i < 2; i++) {
      var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      velocityArray.push(plusOrMinus * Math.random());
    }

    return velocityArray;
  };

  Asteroid.prototype.move = function() {
    this.position[0] += this.velocityVector[0];
    this.position[1] += this.velocityVector[1];

    if (this.position[1] > 810) {
      this.position[1] = -40 ;
    } else if (this.position[1] < -42) {
      this.position[1] = 765;
    }

    if (this.position[0] > 1070) {
      this.position[0] = -45 ;
    } else if (this.position[0] < -46) {
      this.position[0] = 1069 ;
    }

    this.collisionBoundariesX

    return this;
  };
})();
