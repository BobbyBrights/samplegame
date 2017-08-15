export default function butterflyController($scope, $state, $stateParams, GameData, RequireImages, $timeout, $interval) {
  'ngInject';

  $scope.gamePageView = 'butterfly.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.subtraction.types.butterfly');

  var questionData = gameData.home.question;
  $scope.header = gameData.home.header;
  $scope.questionText = questionData.hint.text;
  $scope.questionHintText = questionData.subhint.text;
  $scope.questionSubminus = questionData.minus.text;
  $scope.questionSubequal = questionData.equal.text;
  $scope.flag = true;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);
  $scope.leftPositions = RequireImages.get($scope.getImageContext(), questionData.leftPositions);

  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.getScoreboard = getScoreboard;
  $scope.onNumberClick = onNumberClick;
  $scope.inputClick = inputClick;
  $scope.butterfly = butterfly;
  $scope.redo = redo;

  init();
  $scope.flag = -1;
  var fly = 0, interval,
    checkIsEmpty = false,
    value = '';

  //for diasable chars
  function disableCharacter() {
    $timeout(function () {
      $('input').on('keypress', function (event) {
        var regex = new RegExp('^[]+$');
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
      });
    });
  }

  //For score
  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // Game initialization function
  function init() {
    $scope.Scorecount = 0;
    $scope.firstNumber = $scope.generateRandomNumber(10, 1);
    $scope.secondNumber = $scope.generateRandomNumber(10, 1);

    while ($scope.secondNumber > $scope.firstNumber) {
      $scope.firstNumber = $scope.generateRandomNumber(10, 1);
    }
    $scope.count = [];
    $scope.count = _.range(0, $scope.firstNumber);
   // $scope.numbers = [$scope.firstNumber, $scope.secondNumber];
    $scope.answer = eval($scope.firstNumber - $scope.secondNumber);
    $('#input-value').val('');

    angular.element('.action-btn').css({'pointer-events': 'auto'});
    angular.element('.check-button').removeClass('move-disable').addClass('move-enable');
    disableCharacter();
    resetButterfly();
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  //redo function
  function redo($event) {
    $event.preventDefault();
    angular.element('#input-value').val('');
    value = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();

    $('#input-value').val('');

    value = '';

    return false;

  }

  function check($event) {
    $event.preventDefault();
    checkIsEmpty = _.isEmpty(value);
    var result = parseInt($('#input-value').val());
    if (checkIsEmpty === false) {
      if (result === $scope.answer) {
        $scope.Scorecount++;
        $scope.flag = 1;
        if ($scope.Scorecount === 1) {
          $scope.scoreboard.up();
        }
      } else {
        $scope.flag = 0;
      }
    }
  }


  function onNumberClick($event, num) {
    if (value.length <= 1) {
      value = value + '' + num;
    }
    else {
      value = value;
    }
    angular.element('#input-value').val(value);
  }

  function inputClick(index) {
    $scope.currentInput = index;
  }

  var className, flyId;

  function butterfly($event, num) {
    $interval.cancel(interval);
    className = 'butterfly-fly-' + num;
    flyId = num;
    angular.element('#butterfly-' + num).addClass('invisible butterfly');
    angular.element('#butterfly-anim-' + num).removeClass('invisible ').addClass(className);
    interval = $interval(callAtInterval, 2500, 1);
    fly++;
  }

  function resetButterfly() {
    for (var i = 0; i < 5; i++) {
      var resetClass = 'butterfly-fly-' + i;
      angular.element('#butterfly-' + i).addClass('butterfly').removeClass('invisible');
      angular.element('#butterfly-anim-' + i).addClass('invisible ').removeClass(resetClass);
      angular.element('#flyleft-' + i).addClass('invisible');
    }
  }

  function callAtInterval() {
    angular.element('#butterfly-anim-' + flyId).addClass('invisible').removeClass(className);
    angular.element('#flyleft-' + flyId).removeClass('invisible');
  }

}
