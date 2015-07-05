(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(position, direction, canvas, velocity) {
    var snd = new Audio('audio/fire.wav');
    snd.play();
    this.position = position.slice(0);
    this.direction = direction.slice(0);
    this.bulletLength = [0, 0];
    this.canvas = canvas;
    var myVelocity = velocity.slice(0);
    this.velX = Math.abs(myVelocity[0]) + 15;
    this.velY = Math.abs(myVelocity[1]) + 15;
  };

  Bullet.prototype.move = function() {
    this.position[0] += this.direction[0] * this.velX;
    this.position[1] += this.direction[1] * this.velY;
    this.bulletLength = [this.position[0] + this.direction[0] * 3,
      this.position[1] + this.direction[1] * 3];
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
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';
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
