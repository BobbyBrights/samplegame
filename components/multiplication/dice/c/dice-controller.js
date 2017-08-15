
export default function diceController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'dice.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.multiplication.types.dice');

  var questionData = gameData.home.question,
    value = '',
    inputIndex           = null,
    emptyString   = _.toString(null);
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set image path
  $scope.diceImages = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.container = RequireImages.get($scope.getImageContext(), gameData.home.container);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.inputClick    = inputClick;
  $scope.onNumberClick = onNumberClick;
  $scope.getScoreboard = getScoreboard;


  function generateRandomNumber(minLimit, maxLimit) {

    return _.random(minLimit, maxLimit);
  }

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }
  // Game initialization function
  function init() {
    var minLimit = 1,
      maxLimit = 6,
      value = emptyString,
      inputIndex           = null;
    $scope.flag = -1;
    $scope.firstInput = '';
    $scope.secondInput = '';
    $scope.thirdInput = '';
    $scope.firstNumber = generateRandomNumber(minLimit, maxLimit);
    $scope.secondNumber = generateRandomNumber(minLimit, maxLimit);
    $scope.total = $scope.firstNumber * $scope.secondNumber;
    $scope.diceImage = $scope.diceImages[$scope.firstNumber];
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
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    console.log('redo clicked');
    angular.element('.input-box').val('');
    value = '';
    $scope.flag = -1;

    return false;
  }

  function check($event) {
    $event.preventDefault();
    var inputsValues =$scope.inputs;
    console.log(inputsValues,$scope.firstNumber ,$scope.secondNumber,$scope.total);
    if (parseInt( inputsValues) === $scope.total){
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
    $scope.inputDisabled=false;
    value      = emptyString;
    inputIndex = index;
    console.log(inputIndex);
  }

  function onNumberClick($event, num) {
    if($scope.flag !== -1) return;

    if(num === 'backspace'){
      value = value.substring(0, value.length - 1);
    }
    else if(value.length <= 1 && $scope.flag === -1) {
      value = value + emptyString + num;
    }
    else {
      value = value;
    }
    console.log(value, angular.element('#input'));
    angular.element('#input').val(value);
    $scope.inputs = value;
  }

  /* Game specific logic and common function for all sub types could be added here */

}
