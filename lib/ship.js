(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(canvas) {
    this.canvas = canvas;
    this.velocity = [0, 0];
    this.position = [512, 384];
    this.pointingAt = [0, -1];
    this.shipImg = new Image();
    this.shipImg.src = 'vendor/ship.png';
    this.rotation = 90 * Math.PI / 180;
    this.bindKeyHandlers();
  };

  Ship.prototype.bindKeyHandlers = function() {
    key('left', function() {
      this.rotation += 20 * Math.PI / 180;

      if (this.rotation > 360 * Math.PI / 180) {
        this.rotation -= 360 * Math.PI / 180;
      }

      console.log('radians: ' + this.rotation);

      this.newPointingAt();
      return false;
    }.bind(this));   

    key('right', function() {

      this.rotation -= 20 * Math.PI / 180;
      
      if (this.rotation < 0) {
        this.rotation += 360 * Math.PI / 180;
      }
     
      // console.log('radians: ' + this.rotation);

      this.newPointingAt();
      return false;

    }.bind(this));

    key('up', function() {
      for (var i = 0; i < 2; i++) {
        this.velocity[i] += this.pointingAt[i];
      }

      return false;
    }.bind(this));
  };

  Ship.prototype.newPointingAt = function() {
    this.pointingAt[1] = Math.sin(this.rotation) * -1;
    this.pointingAt[0] = Math.cos(this.rotation);
    console.log(this.pointingAt);

  };

  Ship.prototype.move = function() {
    return this;
  };

  Ship.prototype.render = function() {
    for (var i = 0; i < 2; i++) {
      this.position[i] += this.velocity[i];
    }

    var ctx = this.canvas.getContext('2d');
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.translate(16, 16);
    ctx.rotate(this.rotation * -1);
    ctx.drawImage(this.shipImg, -16, -16);
    ctx.restore();

  };
  
})();
