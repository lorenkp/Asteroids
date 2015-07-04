(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameStart = Asteroids.GameStart = function(canvas) {
    this.canvas = canvas;
    this.keyDownHandler();
    this.game = new Asteroids.Game(canvas, this);
  };

  GameStart.prototype.keyDownHandler = function() {

  };

  GameStart.prototype.welcome = function() {
      var ctx = this.canvas.getContext('2d');
      ctx.font = '32px vector_battleregular';
      ctx.fillStyle = 'white';
      ctx.fillText("PUSH SPACE BAR", 500 , 300);
  };
})();
