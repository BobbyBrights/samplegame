export default function frogController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'frog.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.count-to.types.frog');

  var questionData         = gameData.home.question,
    randomNumber,
    numberCardValue,
    userAttempt;

  $scope.questionText      = questionData.hint.text;
  $scope.header            = gameData.home.header;

  // Set image path
  $scope.frogRight         = RequireImages.get($scope.getImageContext(), questionData.frogRight);
  $scope.frogLeft          = RequireImages.get($scope.getImageContext(), questionData.frogLeft);
  $scope.jarIcon           = RequireImages.get($scope.getImageContext(), gameData.home.images);

  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  //For next button click
  $scope.next              = next;
  $scope.check             = check;
  $scope.redo              = redo;
  $scope.onNumberClick     = onNumberClick;
  $scope.getScoreboard     = getScoreboard;

  function getScoreboard(scoreboard) {
    $scope.scoreboard      = scoreboard;
  }

  init();

  // Game initialization function
  function init() {
    randomNumber           = $scope.randomNumber();
    $scope.frogs           = _.range(0, randomNumber);
    $scope.randomCounters  = randomNumber;
    var randomArray        = _.remove(_.shuffle(_.range(1, 51)), function (n) {
      return n !== randomNumber;
    });
    numberCardValue        = _.take(randomArray, 2);
    numberCardValue.push(randomNumber);
    $scope.menu.bottom.numPad.noOfButtons = _.shuffle(numberCardValue);
    $scope.menu            = _.merge({}, $scope.menu);
    $scope.flag            = -1;
    angular.element('.action-btn').css({'pointer-events': 'auto'});
    angular.element('.check-btns').css({'pointer-events': 'none'});
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
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
    if (userAttempt){
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