(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(canvas) {
    this.hide = false;
    this.invulnerable = false;
    this.canFire = true;
    this.canvas = canvas;
    this.velocity = [0, 0];
    this.position = [512, 384];
    this.pointingAt = [0, -1];
    this.rotation = 90 * Math.PI / 180;
    this.bullets = [];
    this.shipImg = new Image();
    this.shipImg.src = 'vendor/ship.png';
  };

  Ship.prototype.fireBullet = function() {
    if (this.canFire) {
      this.bullets.push(new Asteroids.Bullet(this.position,
        this.pointingAt, this.canvas, this.velocity));
    }
  };

  Ship.prototype.move = function() {
    for (var i = 0; i < 2; i++) {
      this.position[i] += this.velocity[i];
    }

    if (this.position[1] < -28 && this.velocity[1] < 0) {
      this.position[1] = 770;
    } else if (this.position[1] > 770 && this.velocity[1] > 0) {
      this.position[1] = -28;
    }

    if (this.position[0] < -28 && this.velocity[0] < 0) {
      this.position[0] = 1026;
    } else if (this.position[0] > 1026 && this.velocity[0] > 0) {
      this.position[0] = -28;
    }

    return this;
  };

  Ship.prototype.moveBullets = function() {
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
    }

    return this;
  };

  Ship.prototype.newPointingAt = function() {
    this.pointingAt[1] = Math.sin(this.rotation) * -1;
    this.pointingAt[0] = Math.cos(this.rotation);
  };

  Ship.prototype.render = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate(this.rotation * -1);
    ctx.drawImage(this.shipImg, -16, -16, 44, 32);
    ctx.restore();
  };

  Ship.prototype.rotateLeft = function() {
    this.rotation += 7 * Math.PI / 180;

    if (this.rotation > 360 * Math.PI / 180) {
      this.rotation -= 360 * Math.PI / 180;
    }

    this.newPointingAt();
  };

  Ship.prototype.rotateRight = function() {
    this.rotation -= 7 * Math.PI / 180;
    if (this.rotation < 0) {
      this.rotation += 360 * Math.PI / 180;
    }

    this.newPointingAt();
  };

  Ship.prototype.renderBullets = function() {
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].render();
    }

    return this;
  };

  Ship.prototype.resetShip = function() {
    this.invulnerable = true;
    var resetting = setInterval(function() {
      if (this.hide === false) {
        this.hide = true;
      } else {
        this.hide = false;
      }
    }.bind(this), 200);

    setTimeout(function() {
      clearInterval(resetting);
      this.invulnerable = false;
      this.hide = false;
    }.bind(this), 2000);

    this.position = [512, 384];
    this.pointingAt = [0, -1];
    this.rotation = 90 * Math.PI / 180;
    this.velocity = [0, 0];
  };

  Ship.prototype.showLives = function(posX, posY) {
    var ctx = this.canvas.getContext('2d');
    ctx.drawImage(this.shipImgLife, posX, posY);
  };

  var sndThrust = new Howl({
    urls: ['audio/thrust.wav'],
    loop: true
  });


  Ship.prototype.thrust = function() {

    for (var i = 0; i < 2; i++) {
      this.velocity[i] += this.pointingAt[i] * 0.12;
      if (Math.abs(this.velocity[i]) > 6.5) {
        if (this.velocity[i] > 1) {
          this.velocity[i] = 6.5;
        } else {
          this.velocity[i] = -6.5;
        }
      }
    }
  };
})();
