export default function tablesController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'tables.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.multiplication.types.tables');

  var questionData    = gameData.home.question,
      value           = '',
      inputIndex      = null,
      emptyString     = _.toString(null);
  $scope.questionText = questionData.hint.text;
  $scope.header       = gameData.home.header;
  $scope.text         = questionData.table.text;
  $scope.inputs       = [];


  // Set image path
  // $scope.commutativeImages = RequireImages.get($scope.getImageContext(), gameData.home.images);

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  //For more/next button click
  $scope.next          = next;
  $scope.check         = check;
  $scope.redo          = redo;
  $scope.reset         = reset;
  $scope.inputClick    = inputClick;
  $scope.onNumberClick = onNumberClick;
  $scope.getScoreboard = getScoreboard;
  $scope.go            = go;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // Game initialization function
  function init() {
    var value      = emptyString,
        inputIndex = null;
    $scope.flag    = -1;
    angular.element('#input1').val(' ');
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    $scope.inputs.length = 0;
    $scope.firstNumber   = '';
    clearInputs();
  }

  init();

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function go() {
    $scope.answers     = [];
    var val            = angular.element('#go').val();
    $scope.firstNumber = val;
    for (var i = 0; i < 12; i++) {
      $scope.answers[i] = val * (i + 1);
    }
  }

  function clearInputs() {
    $scope.inputs.length = 0;
    value                = emptyString;
    inputIndex           = 0;
  }

  // For reset button click
  function reset($event) {
    $event.preventDefault();

    init();
    angular.element('#input-1').val('');
    return false;
  }

  function redo($event) {
    $event.preventDefault();
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    angular.element('.input-box').val('');
    value       = '';
    $scope.flag = -1;

    return false;
  }

  function check($event) {
    $event.preventDefault();
    var inputsValues = $scope.inputs, counter = 0;
    if (inputsValues.length == 13) {
      $scope.answers.forEach(function (key, value) {
        if (key == inputsValues[value + 1]) {
          counter++;
        }
      });
      if (counter == 12) {
        $scope.flag = 1;
        $scope.scoreboard.upBy();
        angular.element('.check-btns').addClass('move-disable');
      }
      else {
        $scope.flag = 0;
      }

    }
    return false;
  }


  function inputClick(index) {
    $scope.inputDisabled = false;
    value                = emptyString;
    inputIndex           = index;
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
    angular.element('#input-' + inputIndex).val(value);
    $scope.inputs[inputIndex] = value;
  }


  /* Game specific logic and common function for all sub types could be added here */

}
