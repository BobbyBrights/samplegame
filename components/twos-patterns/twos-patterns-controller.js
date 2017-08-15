export default function twosPatternsController($scope, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'twos-patterns';
  $scope.flag = true;

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header[0];

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.images = RequireImages.get(imageContext, gameData.home.images);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.menu = _.cloneDeep(gameData.menu);

  var maxValue = questionData.maxValue,
    minValue = questionData.minValue,
    numberLimit = questionData.numberLimit,
    numberPattern = questionData.numberPattern,
    randomNumber,
    numberRange,
    count = 0,
    value = '';

  $scope.disability = questionData.disability;
  $scope.chartHelp = questionData.chartHelp;
  $scope.pattern = questionData.pattern;
  $scope.rows = _.range(0, 10);
  $scope.columns = _.take($scope.rows, 10);

  //For check,next,reset,redo button click
  $scope.next = next;
  $scope.check = check;
  $scope.reset = reset;
  $scope.redo = redo;
  $scope.getScoreboard = getScoreboard;
  $scope.inputClick = inputClick;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // Game initialization function
  function init() {
    value = '';
    $scope.counter = count;
    randomNumber = Math.floor((Math.random() * maxValue) + minValue);
    numberRange = count === 1 ? _.range(randomNumber +
      14, randomNumber, -2) : _.range(randomNumber, randomNumber + 14, 2);
    $scope.numbers = numberRange;
    $scope.numberPattern = $scope.numbers[0] % 2 == 0 ? numberPattern[0] : numberPattern[1];
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    angular.element('.reset-button').addClass('move-enable');
    disableCharacter();
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

  init();

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  $scope.onNumberClick = function ($event, num) {

    var inputBox = $('#input-' + $scope.currentInput),
      clickedInput = $(inputBox),
      count = _.trim(clickedInput.val() || '');

    if (num === 'backspace') {
      count = count.substring(0, count.length - 1);
    } else {
      count = count.length < 2 ? count + '' + num : count;
    }
    clickedInput.val(count);
  };

  function inputClick(index) {
    $scope.currentInput = index;
  }

  // For check button click
  function check($event) {
    $event.preventDefault();
    var checkCount = 0,
      answerValue = 0;
    for (var i = 0; i < numberLimit; i++) {
      var answer = angular.element("#input-" + i).val();
      if (answer == '') {
        answerValue++;
      }
      if ($scope.numbers[i] == answer) {
        checkCount++;
      }
    }
    if (answerValue == 0) {
      if (checkCount == numberLimit) {
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
        angular.element('.reset-button').addClass('move-disable');
        $scope.scoreboard.upBy();
      } else {
        $scope.flag = 0;
      }
    }

    return false;
  }

  // For clear values
  function clearValue() {
    for (var i = 0; i < numberLimit; i++) {
      if ($scope.disability[count][i] == false) {
        angular.element("#input-" + i).val('');
      }
    }
  }

  // For Redo button click
  function redo($event) {
    $event.preventDefault();
    clearValue();
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  // For reset button click
  function reset() {
    $scope.flag = -1;
    clearValue();
    angular.element('.row-chart').removeClass('on-focus');
    return false;
  }

  // For more button click
  $scope.more = function () {
    angular.element('.row-chart').removeClass('on-focus');
    count++;
    $scope.scoreboard.reset();
    init();
    if (count === 3) {
      count = 0;
      $scope.counter = 0;
    }
    $scope.header = gameData.home.header[count];
  };

  // For chart button active
  $scope.activeButton = function (id) {
    angular.element('#' + id).toggleClass('on-focus');
  };
}