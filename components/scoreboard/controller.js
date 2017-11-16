export default function scoreBoardController() {
  'ngInject';

  this.params = this.params || {};

  var ctrl = this;
  var scoreId = new Date().getTime() + '-' + Math.round(Math.random() * (100000 - 1)) + 1;
  ctrl.incrementBy = this.params && this.params.incrementBy || 1;
  ctrl.score = 0;
  ctrl.getId = getId;
  ctrl.up = up;
  ctrl.upBy = upBy;
  ctrl.down = down;
  ctrl.downBy = downBy;
  ctrl.reset = reset;
  ctrl.getScore = getScore;

  function up() {
    ctrl.upBy(ctrl.incrementBy);
  }

  function upBy(incrementBy) {
    ctrl.score = ctrl.score + (incrementBy || ctrl.incrementBy);
  }

  function down() {
    ctrl.downBy(ctrl.incrementBy);
  }

  function downBy(incrementBy) {
    ctrl.score = ctrl.score - (incrementBy || ctrl.incrementBy);
    ctrl.score = (ctrl.score >= 0) ? ctrl.score : 0;
  }

  function reset() {
    ctrl.score = 0;
  }

  function getScore() {
    return ctrl.score;
  }

  var scoreboardComponent = {
    up: ctrl.up,
    upBy: ctrl.upBy,
    down: ctrl.down,
    downBy: ctrl.downBy,
    reset: ctrl.reset,
    getScore: ctrl.getScore
  };

  ctrl.bindScoreboard({scoreboard: scoreboardComponent});

  function getId() {
    return scoreId;
  }
}