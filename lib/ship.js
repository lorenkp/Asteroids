(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(canvas) {
    this.canvas = canvas;
    this.position = [512, 384];
    this.pointingAt = [0, -1];
    this.shipImg = new Image();
    this.shipImg.src = 'vendor/ship.png';
  };

  Ship.prototype.move = function() {
    return this;
  };

  Ship.prototype.render = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.translate(16, 16);
    ctx.rotate(0.50);
    ctx.drawImage(this.shipImg, -16 / 2, -16 / 2);
    ctx.restore();

  };
  
})();
