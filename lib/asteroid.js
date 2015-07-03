(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    this.velMult = options.velMult || 1;
    this.velocityVector = this.initialVelocity();
    this.position = options.position || this.initialPosition();
    this.canvas = options.canvas;
    this.size = options.size;
    this.radius = this.size * 13;
    console.log(this.velocityVector);
    console.log(this.position);
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
      this.position[1], this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
  };

  Asteroid.prototype.initialVelocity = function() {
    var velocityArray = [];

    for (var i = 0; i < 2; i++) {
      var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      velocityArray.push(plusOrMinus * Math.random() * 1.5);
    }

    if (this.velMult > 1) {
      for (var i = 0; i < 2; i++) {
        velocityArray[i] *= this.velMult;
      }
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

    return this;
  };

  Asteroid.prototype.newTrajectory = function(bulletVector, angle) {
    var oldAsteroidTraj = this.initialVelocity();
    var newAsteroidTraj = [(oldAsteroidTraj[0] + bulletVector[0]) * Math.cos(angle),
      (oldAsteroidTraj[1] + bulletVector[1]) * Math.sin(angle)];
    return newAsteroidTraj;
  };
})();
