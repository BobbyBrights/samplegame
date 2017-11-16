export default function inputTypeController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'input-type.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.division.types.beetal');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.flag = true;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);
  $scope.dragon = RequireImages.get($scope.getImageContext(), questionData.dragon);
  $scope.beetle = RequireImages.get($scope.getImageContext(), questionData.beetle);
  $scope.horizontalLine = RequireImages.get($scope.getImageContext(), questionData.horizontalLine);


  var value = '';

  //For more/next button click
  $scope.next = next;
  $scope.getScoreboard = getScoreboard;
  $scope.check = check;
  $scope.redo = redo;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  init();

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
  // Game initialization function
  function init() {
    var maxLimit = 6,
      minLimit = 1;
    value = '';
    $scope.inputDisabled = false;
    $scope.secondNumber = $scope.generateRandomNumber(maxLimit, minLimit);
    $scope.firstNumber = Math.floor(Math.random() * 6) * $scope.secondNumber + $scope.secondNumber;
    $scope.answer = $scope.firstNumber / $scope.secondNumber;
    $scope.secondNumberRange = _.range(0, $scope.secondNumber, 1);
    $scope.answerRange = _.range(0, $scope.answer, 1);
    angular.element('.action-btn').css({'pointer-events': 'auto'});
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  $scope.onNumberClick = function ($event, num) {
    if (num === 'backspace') {
      value = value.substring(0, value.length - 1);
    } else {
      value = value.length <= 1 ? value + '' + num : value;
    }
    angular.element('#input-1').val(value);
  };
  // For more button click
  function next($event) {
    $event.preventDefault();
    angular.element('#input-1').val('');
    init();

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
        $scope.scoreboard.up();
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }
    return false;
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
}
