export default function commutativePropertyController($scope, $stateParams, GameData, $timeout) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'commutative-property';

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.getImageContext = function () {
    return imageContext;
  };

  var maxNum = 19,
    minNum = 1,
    value = '';

  $scope.counter = 0;
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.labels = questionData.labels;
  $scope.labelText = questionData.labelText;
  $scope.textBoxPosition = questionData.positions[ $scope.counter];
  $scope.plusPosition = questionData.plus[ $scope.counter];
  $scope.equalsPosition = questionData.equals;
  $scope.answerPosition = questionData.answers[$scope.counter];
  $scope.inputPosition = questionData.inputs[ $scope.counter];
  $scope.soPosition = questionData.so[$scope.counter];
  $scope.values = [];
  $scope.flag = -1;

  //For more/next button click
  $scope.next = next;
  $scope.redo = redo;
  $scope.check = check;
  $scope.onNumberClick = onNumberClick;
  $scope.moreClick = moreClick;
  $scope.getScoreboard = getScoreboard;

  function randomNumber(maxNum, minNum) {
    return Math.floor((Math.random() * maxNum) + minNum);
  }

  init();

  // Game initialization function
  function init() {
    angular.element('#input-1').val('');
    $scope.inputDisabled = false;
    angular.element('.action-btn').css({'pointer-events': 'auto'});
    $scope.currentInput = 0;
    disableCharacter();
    $scope.flag = -1;
    value='';
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    $scope.firstNumber = randomNumber(maxNum, minNum);
    var num = maxNum - $scope.firstNumber;
    $scope.secondNumber = randomNumber(num, minNum);
    $scope.answer = $scope.firstNumber + $scope.secondNumber;
    $scope.values[0] = $scope.firstNumber;
    $scope.values[1] = $scope.secondNumber;
    $scope.values[2] = $scope.secondNumber;
    $scope.values[3] = $scope.firstNumber;
  }

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function disableCharacter() {
    $timeout(function () {
      $('input').on('keydown', function (event) {
        var regex = new RegExp('^[]+$');
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
      });
    });
  }

  function onNumberClick($event, num) {
    if ($scope.flag === -1) {
      if (num === 'backspace') {
        value = value.substring(0, value.length - 1);
      } else {
        value = value.length <= 1 ? value + '' + num : value;
      }
    }
    angular.element('#input-1').val(value);
  }

  function redo($event) {
    $event.preventDefault();
    $scope.inputDisabled = false;
    angular.element('#input-1').val('');
    value = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  // For check button click
  function check($event) {
    $event.preventDefault();
    var inputVal = angular.element('#input-1').val();
    if (inputVal) {
      $scope.inputDisabled = true;
      inputVal = parseInt(inputVal);
      if (inputVal === $scope.answer) {
        $scope.flag = 1;
        $scope.scoreboard.upBy();
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }
    return false;
  }

  function moreClick() {
    $scope.counter++;
    if ($scope.counter === 2) {
      $scope.counter = 0;
      $scope.scoreboard.reset();
    }

    $scope.textBoxPosition = questionData.positions[$scope.counter];
    $scope.plusPosition = questionData.plus[$scope.counter];
    $scope.answerPosition = questionData.answers[$scope.counter];
    $scope.inputPosition = questionData.inputs[$scope.counter];
    $scope.soPosition = questionData.so[$scope.counter];
    init();
  }

}

