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
    this.rotation = -1.57079633;
    // this.bindKeyHandlers();
  };

  Ship.prototype.bindKeyHandlers = function() {
    key('left', function() {
      console.log('left');
      this.rotation -= 0.25;
      // this.newPointingAt();
    }.bind(this));   

    key('right', function() {
      this.rotation += 0.25;
      // this.newPointingAt();
    }.bind(this));

    key('up', function() {
      this.rotation += 0.25;
      var pointAtDegrees = this.rotation * 180 / Math.PI;
      this.pointingAt[0] = Math.cos(pointAtDegrees);
      this.pointingAt[1] = Math.sin(pointAtDegrees);
    }.bind(this));
  };

  Ship.prototype.newPointingAt = function() {
    var pointAtDegrees = this.rotation * 180 / Math.PI;
    this.pointingAt[0] = Math.cos(pointAtDegrees);
    this.pointingAt[1] = Math.sin(pointAtDegrees);
  };

  Ship.prototype.move = function() {
    return this;
  };

  Ship.prototype.render = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.translate(16, 16);
    ctx.rotate(this.rotation);
    ctx.drawImage(this.shipImg, -16 / 2, -16 / 2);
    ctx.restore();

  };
  
})();
