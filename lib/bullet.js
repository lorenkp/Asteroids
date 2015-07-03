(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(position, direction, canvas, velocity) {
    // debugger
    this.position = position.slice(0);
    this.direction = direction.slice(0);
    this.bulletLength = [0, 0];
    this.canvas = canvas;
    var myVelocity = velocity.slice(0);
    this.velX = Math.abs(myVelocity[0]) + 4;
    this.velY = Math.abs(myVelocity[1]) + 4;
  };

  Bullet.prototype.move = function() {
    this.position[0] += this.direction[0] * this.velX;
    this.position[1] += this.direction[1] * this.velY;
    this.bulletLength = [this.position[0] + this.direction[0] * 5,
      this.position[1] + this.direction[1] * 5];
    return this;
  };

  Bullet.prototype.velocityVector = function() {
    return [this.direction[0] * this.velX, this.direction[1] * this.velY];
  };

  Bullet.prototype.render = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(this.position[0], this.position[1]);
    ctx.lineTo(this.bulletLength[0], this.bulletLength[1]);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'red';
    ctx.stroke();

    // var ctx = this.canvas.getContext('2d');
    // ctx.beginPath();
    // ctx.arc(this.position[0],
    //   this.position[1], 40, 0, 2 * Math.PI);
    // ctx.fillStyle = 'white';
    // ctx.fill();
    // ctx.stroke();
  };
})();
