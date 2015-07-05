(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameStart = Asteroids.GameStart = function(canvas) {
    this.canvas = canvas;
    this.keyDownHandler();
    this.game = new Asteroids.Game(canvas, this);
    this.game.ship.hide = true;
    this.flash = true;
    this.flashWelcome();
  };

  GameStart.prototype.flashWelcome = function() {
    flashing = setInterval(function() {
      console.log('flash');
      if (this.flash === true) {
        this.flash = false;
      } else {
        this.flash = true;
      }
    }.bind(this), 1000);
  };

  GameStart.prototype.gameOver = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.font = '32px vector_battleregular';
    ctx.fillStyle = 'white';
    ctx.fillText("GAME OVER", 410, 200);
    this.game.hideLives = true;
    this.game.ship.hide = true;
    this.lives = 3;
    this.flashWelcome();
  };

  GameStart.prototype.keyDownHandler = function() {
    kd.SPACE.press(function() {
      clearInterval(flashing);
      this.flash = false;
      this.startGame();

    }.bind(this));
  };

  GameStart.prototype.startGame = function() {
    kd.SPACE.unbindPress();
    this.game.hideLives = false;
    this.game.ship.hide = false;
    this.game.lives = 3;
    this.game.bindGameSpace();
  };

  GameStart.prototype.welcome = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.font = '32px vector_battleregular';
    ctx.fillStyle = 'white';
    ctx.fillText("PUSH SPACE BAR", 337, 200);
  };
})();
