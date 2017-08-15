export default function inOrderController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'in-order.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.number-ordering.types.in-order');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  var checkCount = 0;
  // Set image path
  // $scope.afterImages = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.images = RequireImages.get($scope.getImageContext(), gameData.home.images);
  // Set menu icons
  $scope.header = gameData.home.header;
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  // $scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);

  $scope.chartHelp = questionData.chartHelp;


  $scope.next = next;
  $scope.check = check;
  $scope.inputClick = inputClick;
  $scope.redo = redo;

  $scope.rows = _.range(0, 10);
  $scope.columns = _.take($scope.rows, 10);
  var maxValue = questionData.maxValue,
    minValue = questionData.minValue,
    value = '';
  var answercheck;
  $scope.getScoreboard = getScoreboard;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  //For more/next button click
  $scope.next = next;
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

  init();
  function randomGenrater(max, min) {
    return parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  // Game initialization function
  function init() {
    $scope.flag = -1;
    value = '';
    $scope.inputDisabled = false;
    $scope.digits = [];
    var randomNumber = Math.floor((Math.random() * maxValue) + minValue);
    $scope.digits.push(randomNumber);
    $scope.number = (( parseInt(randomNumber / 100)) * 100);
    $scope.digits.push(randomGenrater(randomNumber, randomNumber - 30));
    $scope.digits.push(randomGenrater(randomNumber, randomNumber - 30));
    $scope.rows = _.range($scope.number, $scope.number + 10);
    $scope.columns = _.take($scope.rows, 10);
    answercheck = $scope.digits;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    disableCharacter();
  }

  // For more button click
  function next($event) {

    $event.preventDefault();
    for (var i = 0; i < 3; i++) {
      angular.element("#input-" + i).val('');
    }
    init();
    return false;
  }

  $scope.onNumberClick = function ($event, num) {

    if ($scope.flag === -1) {
      if (num === 'backspace') {
        value = value.substring(0, value.length - 1);
      } else {
        value = value.length <= 2 ? value + '' + num : value;
      }
    }
    angular.element('#input-'+$scope.currentInput).val(value);

  };

  function inputClick(index) {
    value='';
    $scope.currentInput = index;
  }

  function check($event) {
    $event.preventDefault();

    var js = answercheck.slice().sort(function (a, b) {
      return a - b
    });

    checkCount = 0;
    for (var i = 0; i < 3; i++) {
      var answer = angular.element("#input-" + i).val();
      if (answer === "") {
        return;
      } else {
        if (parseInt(answer) === js[i]) {
          checkCount++;
        }
      }
    }
    if (checkCount === 3) {
      $scope.flag = 1;
      angular.element('.check-btns').addClass('move-disable');
      $scope.inputDisabled = true;
      $scope.scoreboard.upBy();
    } else {
      $scope.flag = 0;
    }
    return false;
  }

  function redo($event) {
    $event.preventDefault();
    for (var i = 0; i < 3; i++) {
      if (checkCount === 0) {
        angular.element("#input-" + i).val('');
        $scope.inputDisabled = false;
      }
    }

    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }


  // For chart button active
  $scope.activeButton = function (id) {
    angular.element('#' + id).toggleClass('on-focus');
  };
}
