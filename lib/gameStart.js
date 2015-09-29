(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameStart = Asteroids.GameStart = function(canvas) {
    this.playedOnce = false;
    this.canvas = canvas;
    this.start();
    $('#game-over').toggle();

  };

  GameStart.prototype.start = function() {
    this.keyHandler();

    this.game = new Asteroids.Game(this.canvas, this);
    if (!this.playedOnce) {
      this.welcomeLoop();
    }
  };

  GameStart.prototype.endGame = function() {
    this.playedOnce = true;
    setTimeout(function() {
      $('#start').toggle();
      this.start();
    }.bind(this), 3000);
  };

  var listener = new window.keypress.Listener();

  GameStart.prototype.keyHandler = function() {
    listener.simple_combo('enter', function() {
      if (this.playedOnce) {
        this.game.remove();
      }
      window.cancelAnimationFrame(requestId);
      this.removeTitles();
      this.game.start();
      $('#game-over').hide();
      listener.reset();
    }.bind(this));
  };

  GameStart.prototype.removeTitles = function() {
    $('#title').hide();
    $('#start').hide();
  };

  GameStart.prototype.gameOver = function() {
    this.start();
    $('#game-over').show();
  };

  GameStart.prototype.gameOverText = function() {
    $('#game-over').toggle();
  };

  GameStart.prototype.title = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.font = '32px vector_battleregular';
    ctx.fillStyle = 'white';
    ctx.fillText("ASTEROIDS", 337, 200);
  };

  var requestId;

  GameStart.prototype.welcomeLoop = function() {
    requestId = window.requestAnimationFrame(this.welcomeLoop.bind(this));
    this.game.drawBackground();
    this.game.drawBorder();
    this.game.makeAsteroids(12);
    for (var i = 0; i < this.game.asteroids.length; i++) {
      this.game.asteroids[i].move().render();
    }
  };
})();
