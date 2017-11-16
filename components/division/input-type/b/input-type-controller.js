export default function inputTypeController($scope, $state, $stateParams, GameData, RequireImages,$timeout) {
  'ngInject';

  $scope.gamePageView = 'input-type.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.division.types.input-type');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.flag = true;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.flower = RequireImages.get($scope.getImageContext(), questionData.flower);
  $scope.butterfly = RequireImages.get($scope.getImageContext(), questionData.butterfly);

  //For check/next/clear button click
  $scope.next = next;
  $scope.check = check;
  $scope.Clear = Clear;
  $scope.redo = redo;
  $scope.getSketchPad = getSketchPad;
  $scope.onNumberClick = onNumberClick;
  $scope.inputClick    = inputClick;

  init();

  function disableCharacter() {
    $timeout(function () {
      $('input').on('keydown', function (event) {
        var regex = new RegExp('^[]+$');
        var key   = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
      });
    });
  }

  // Game initialization function
  function init() {
    var maxLimit = 3,
      minLimit = 2;
    $scope.secondNumber = $scope.generateRandomNumber(maxLimit, minLimit);
    $scope.firstNumber = Math.floor(Math.random() * 5) * $scope.secondNumber + $scope.secondNumber;
    $scope.flowers = _.range(0, $scope.secondNumber, 1);
    $scope.butterflies = _.range(0, $scope.firstNumber, 1);
    $scope.numberLine = $scope.firstNumber + ' ' + '÷' + ' ' + $scope.secondNumber + ' ' + '=';
    $scope.result = ($scope.firstNumber / $scope.secondNumber);
    $scope.answer = [$scope.firstNumber, $scope.secondNumber, $scope.result];
    $scope.inputPositions = questionData.inputPositions;
    angular.element('.action-btn').css({'pointer-events': 'auto'});
    $scope.currentInput = 0;
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    disableCharacter();
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    $('.input-box').each(function (k, o) {
      $(o).val('');
    });
    Clear();
    init();
    return false;
  }

  // For check button click
  function check($event) {
    var checkCount = 0,
      answerValue = 0;
    for (var i = 0; i < 3; i++) {
      var answer = angular.element('#input-' + i).val();

      if (answer == '') {
        answerValue++;
      }

      if ($scope.answer[i] == answer) {
        checkCount++;
      }
    }
    if (answerValue == 0) {
      if (checkCount == 3) {
        $scope.correctAnswer = $scope.result;
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
        angular.element('.action-btn').css({'pointer-events': 'none'});
      } else {
        $scope.flag = 0;
      }
      return false;
    }
  }

  function redo($event) {
    $event.preventDefault();
    angular.element('input').val('');
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  function getSketchPad(sketchPad) {
    $scope.sketchPad = sketchPad;
  }

  function Clear() {
    if ($scope.sketchPad) {
      $scope.sketchPad.clear();
    }
  }

  function onNumberClick($event, num) {
    var inputBox = $('#input-' + $scope.currentInput);
    var count = _.trim($(inputBox).val() || '');

    if (num === 'backspace') {
      count = count.substring(0, count.length - 1);
    } else if (count.length < 2) {
      count = count + '' + num;
    }
    $(inputBox).val(count);
  }

  function inputClick(index) {
    $scope.currentInput = index;
  }
}