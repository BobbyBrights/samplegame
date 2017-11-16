export default function blockController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'block.b';
  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.count-to.types.block');

  var questionData = gameData.home.question,
    correctAnswer,
    userAttempt;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set image path
  $scope.randomBlockImages = RequireImages.get($scope.getImageContext(), questionData.randomBlocks);
  $scope.sign = RequireImages.get($scope.getImageContext(), questionData.sign);
  $scope.images = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.checkClass = {tick: 'invisible', cross: 'invisible'};

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  //For next button click
  $scope.next = next;
  $scope.redo = redo;
  $scope.check = check;

  //Function to check visibility of tick
  $scope.onNumberClick = onNumberClick;
  $scope.getScoreboard = getScoreboard;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  init();

  // Game initialization function
  function init() {
    $scope.buttons = _.range(0, 11);
    $scope.randomBlocks = _.range(0, $scope.randomNumber());
    correctAnswer = $scope.randomBlocks.length;
    angular.element('.action-btn').css({'pointer-events': 'auto'});
    angular.element('.check-btns').css({'pointer-events': 'none'});
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    $scope.flag = -1;
    return false;
  }

  function redo($event) {
    $event.preventDefault();
    $scope.flag = -1;
    userAttempt = undefined;
    angular.element('.check-btns').css({'pointer-events': 'auto','cursor':'pointer'});
    return false;
  }

  function check($event) {
    $event.preventDefault();
    if (userAttempt) {
      if (userAttempt === $scope.randomAnswerNumber) {
        $scope.flag = 1;
        $scope.scoreboard.upBy();
      } else {
        $scope.flag = 0;
      }
      angular.element('.check-btns').css({'pointer-events': 'none'});
    }
    return false;
  }

  //Function to check visibility of tick
  function onNumberClick($event, getNum) {
    $event.preventDefault();
    userAttempt = parseInt(getNum);
    angular.element('.check-btns').css({'pointer-events': 'auto','cursor':'pointer'});
    return false;
  }
}
