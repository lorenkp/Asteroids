(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameStart = Asteroids.GameStart = function(canvas) {
    this.game = new Asteroids.Game(canvas);
    this.keyDownHandler();
    this.welcome();
  };

  GameStart.prototype.keyDownHandler = function() {

  };

  GameStart.prototype.welcome = function() {

  };
})();
