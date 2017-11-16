export default function balanceController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'balance.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.addition.types.balance');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.flag = true;
  // Set image path
  $scope.balanceImages = RequireImages.get($scope.getImageContext(), gameData.home.images);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.circleImages = RequireImages.get($scope.getImageContext(), questionData.circleImages);
  $scope.signImages = RequireImages.get($scope.getImageContext(), questionData.signImages);

  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.redo = redo;
  $scope.getScoreboard = getScoreboard;

  init();
  var checkIsEmpty = false;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  //Disable special characters and alphabets
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

  var value = '';
  $scope.onNumberClick = function ($event, num) {
    if ($scope.flag === -1) {
      if (num === 'backspace') {
        value = value.substring(0, value.length - 1);
      } else {
        value = value.length <= 1 ? value + '' + num : value;
      }
    }
    angular.element('#input-1').val(value);
  };

  // Game initialization function
  function init() {
    $scope.inputDisabled = false;
    $scope.Scorecount = 0;
    $scope.rows = _.range(0, 2);
    $scope.columns = _.range(0, 10);
    $('#balance-box').addClass('balance-content');
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    $scope.firstNumber = $scope.generateRandomNumber(20, 1);
    $scope.secondNumber = $scope.generateRandomNumber(20, 1);
    while ($scope.secondNumber > $scope.firstNumber) {
      $scope.secondNumber = $scope.generateRandomNumber(20, 1);
    }
    $scope.numbers = [$scope.firstNumber, $scope.secondNumber];
    $scope.firstCount = _.range(0, $scope.secondNumber);
    $scope.numberDiffrence = $scope.firstNumber - $scope.secondNumber;
    $scope.secondCount = _.range(0, $scope.numberDiffrence);
    $scope.finalCount = _.concat($scope.firstCount, $scope.secondCount);

    $scope.flag = -1;
    angular.element('.balance-check').removeClass('move-disable').addClass('move-enable');
    disableCharacter();
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    angular.element('#input-1').val('');
    value = '';
    $('#balance-box').addClass('balance-content').removeClass('wrong-balance');
    return false;
  }

  // For more button click
  function check($event) {
    $event.preventDefault();
    var inputValue = parseInt($('#input-1').val());
    $scope.answer = eval(inputValue + $scope.secondNumber);
    checkIsEmpty = _.isEmpty(value);

    if (checkIsEmpty === false) {
      $scope.inputDisabled = true;
      if ($scope.firstNumber === $scope.answer) {
        $scope.Scorecount++;
        $('#balance-box').removeClass('wrong-balance').removeClass('balance-content').addClass('correct-balance');
        $scope.flag = 1;
        angular.element('.balance-check').addClass('move-disable');
        if ($scope.Scorecount === 1) {
          $scope.scoreboard.up();
        }
      }

      else if ($scope.firstNumber > $scope.answer) {
        $('#balance-box').removeClass('wrong-balance').removeClass('correct-balance').addClass('balance-content');
        $scope.flag = 0;
      }
      else {
        $('#balance-box').removeClass('correct-balance').removeClass('balance-content').addClass('wrong-balance');
        $scope.flag = 0;
      }
    }
  }

  function redo($event) {
    $event.preventDefault();
    $scope.inputDisabled = false;
    angular.element('#input-1').val('');
    value = '';
    $scope.flag = -1;
    $('#balance-box').removeClass('wrong-balance').removeClass('correct-balance').addClass('balance-content');
    angular.element('.balance-check').removeClass('move-disable').addClass('move-enable');
    return false;
  }
}