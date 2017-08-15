export default function forwardPatternsController($scope, $interval, $timeout, $stateParams, GameData, RequireImages) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'forward-patterns';

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);


  $scope.getImageContext = function () {
    return imageContext;
  };
  $scope.iconImages = RequireImages.get($scope.getImageContext(), questionData.images);
  $scope.menu = _.cloneDeep(gameData.menu);

  $scope.numberRange = _.range(0, 100);
  $scope.rows = _.range(0, 10);
  $scope.columns = _.take($scope.rows, 10);
  $scope.variation = '1s';
  $scope.currentInput = 0;

  //For more/next button click
  $scope.next = next;
  $scope.chartNumClick = chartNumClick;
  $scope.patterns = patterns;
  $scope.resetAnimate = resetAnimate;
  $scope.next = next;
  $scope.redo = redo;
  $scope.check = check;
  $scope.onNumberClick = onNumberClick;
  $scope.inputClick = inputClick;
  $scope.getScoreboard = getScoreboard;

  var answers = [],
    numbers = [],
    interval,
    pattern = 1,
    totalInputs = 7,
    minValue,
    maxValue,
    randomNumber,
    checkCount = 0,
    empty = 0;

  init();
  // Game initialization function
  function init() {
    $scope.inputDisabled = false;
    angular.element('.action-btn').css({'pointer-events': 'auto'});
    $scope.currentInput = 0;
    getInputSequence(pattern);
    disableCharacter();
    $scope.flag = -1;
    answers = [];
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }


  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  function patterns(id) {
    $scope.variation = id + 's';
    pattern = parseInt(id);
    getInputSequence(pattern);
    angular.element('#lizard').addClass('run');
    interval = $interval(resetAnimate, 1000, 1);
  }

  function getInputSequence(pattern) {
    if (pattern === 10) {
      minValue = 0;
      maxValue = 4;
    } else if (pattern === 5) {
      minValue = 5;
      maxValue = 10;
    } else if (pattern === 2) {
      minValue = 1;
      maxValue = 40;
    } else {
      minValue = 1;
      maxValue = 92;
    }
    randomNumber = parseInt(_.take(_.shuffle(_.range(minValue, maxValue), 1))) * pattern;

    for (var i = 1; i <= totalInputs; i++) {
      numbers[i - 1] = randomNumber + (i * pattern);
    }

    $scope.currentInput = 0;
    $scope.numbers = {
      left: _.take(numbers, 4),
      right: _.takeRight(numbers, 3)
    };
  }

  function resetAnimate() {
    angular.element('#lizard').removeClass('run');
  }

  function chartNumClick(id) {
    angular.element('#' + id).toggleClass('white-bg');
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

  //check if answer is correct
  function isCorrect() {
    for (var i = 0; i < 3; i++) {
      answers[i] = angular.element('#input-' + i).val();
      if (answers[i] === '') {
        empty++;
      }
      if ($scope.numbers.right[i] === parseInt(answers[i])) {
        checkCount++;
      }
    }
    if (checkCount === $scope.numbers.right.length) {
      return true;
    }
  }

  function redo($event) {
    $event.preventDefault();
    $scope.inputDisabled = false;
    angular.element('input').val('');
    angular.element('.row-chart').removeClass('white-bg');
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  //Check button click functionality
  function check($event) {
    $event.preventDefault();
    if (isCorrect()) {
      $scope.flag = 1;
      angular.element('.check-btns').addClass('move-disable');
      angular.element('.action-btn').css({'pointer-events': 'none'});
      $scope.scoreboard.upBy();
      checkCount = 0;
    } else {
      if ((answers.length === 3) && empty === 0) {
        $scope.flag = 0;
      }
    }
    answers = [];
    empty = 0;
  }

  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function onNumberClick($event, num) {
    if ($scope.flag !== -1) return;

    var inputBox = $('#input-' + $scope.currentInput),
      clickedInput = $(inputBox),
      count = _.trim(clickedInput.val() || '');

    if (num === 'backspace') {
      count = count.substring(0, count.length - 1);
    } else {
      count = count.length < 2 ? count + '' + num : count;
    }
    clickedInput.val(count);
  }

  function inputClick(index) {
    $scope.currentInput = index;
  }

}

