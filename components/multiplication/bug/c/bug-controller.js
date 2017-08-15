export default function bugController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'bug.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.multiplication.types.bug');

  var questionData    = gameData.home.question,
      value           = '',
      inputIndex      = null,
      emptyString     = _.toString(null);
  $scope.questionText = questionData.hint.text;
  $scope.header       = gameData.home.header;
  // Set image path
  $scope.firstInput   = '';
  $scope.secondInput  = '';
  $scope.thirdInput   = '';
  // Set image path
  $scope.bugImage     = RequireImages.get($scope.getImageContext(), gameData.home.question.bugImage);

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.inputs            = [];

  //For more/next button click
  $scope.next          = next;
  $scope.check         = check;
  $scope.inputClick    = inputClick;
  $scope.onNumberClick = onNumberClick;
  $scope.getScoreboard = getScoreboard;

  var containerSize = questionData.bugContainerSize,
      bugMarginLeft = questionData.bugMargin;


  function generateRandomNumber(minLimit, maxLimit) {

    return _.random(minLimit, maxLimit);
  }

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // Game initialization function

  function init() {
    var minLimit   = 1,
        maxLimit   = 6,
        value      = emptyString,
        inputIndex = null;
    angular.element('.input-box').val('');
    $scope.inputs.length    = 0;
    $scope.flag             = -1;
    $scope.firstInput       = '';
    $scope.secondInput      = '';
    $scope.thirdInput       = '';
    $scope.firstNumber      = generateRandomNumber(minLimit + minLimit, maxLimit);
    $scope.secondNumber     = generateRandomNumber(minLimit, maxLimit);
    $scope.bugContainerSize = containerSize[$scope.firstNumber - minLimit];
    $scope.bugMargin        = bugMarginLeft[$scope.firstNumber - minLimit];
    $scope.total            = $scope.firstNumber * $scope.secondNumber;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  init();
  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function redo($event) {
    $event.preventDefault();
    console.log('redo clicked');
    angular.element('.input-box').val('');
    value                = '';
    $scope.flag          = -1;
    $scope.inputs.length = 0;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  function check($event) {
    $event.preventDefault();
    var inputsValues = _.compact($scope.inputs);
    console.log(inputsValues, $scope.firstNumber, $scope.secondNumber, $scope.total);
    if (parseInt(inputsValues[1]) === $scope.firstNumber && parseInt(inputsValues[2]) === $scope.total
      && parseInt(inputsValues[0]) === $scope.secondNumber) {
      $scope.flag = 1;
      $scope.scoreboard.upBy();
      angular.element('.check-btns').addClass('move-disable');
    }
    else {
      $scope.flag = 0;
    }
    return false;
  }

  function inputClick(index) {
    $scope.inputDisabled = false;
    value                = emptyString;
    inputIndex           = index;
    console.log(inputIndex);
  }

  function onNumberClick($event, num) {
    if ($scope.flag !== -1) return;

    if (num === 'backspace') {
      value = value.substring(0, value.length - 1);
    }
    else if (value.length <= 1 && $scope.flag === -1) {
      value = value + emptyString + num;
    }
    else {
      value = value;
    }
    console.log(value, inputIndex, angular.element('#input-' + inputIndex), '#input-' + inputIndex);
    angular.element('#input-' + inputIndex).val(value);
    $scope.inputs[inputIndex] = value;
  }

  /* Game specific logic and common function for all sub types could be added here */

}
