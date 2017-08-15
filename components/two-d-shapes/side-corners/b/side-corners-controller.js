export default function sideCornersController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'side-corners.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.two-d-shapes.types.side-corners');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.redo = redo;
  $scope.onNumberClick = onNumberClick;
  $scope.getScoreboard = getScoreboard;
  $scope.inputClick = inputClick;

  var count = 0,
    value = 0;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  init();
  $scope.flag = -1;

  // Game initialization function
  function init() {
    $scope.images = RequireImages.get($scope.getImageContext(), questionData.images[count]);
    angular.element('#inputs1, #inputs2 ').val('');
    $scope.flag = -1;
    angular.element('#inputs1, #inputs2 ').removeClass('move-disable');
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    value = '';
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    count++;
    if (count === 12) {
      count = 0;
    }
    init();
    return false;
  }

  function check() {
    var inputs = angular.element('input');
    var inputValues = [];
    for (let value of inputs) {
      if ($(value).val() == '')  return false;
      inputValues.push($(value).val());
    }
    var answer = questionData.shapeSidesCorners[count];
    if (answer === inputValues[0] && answer === inputValues[1]) {
      $scope.flag = 1;
      angular.element('#inputs1, #inputs2 ').addClass('move-disable');
      $scope.scoreboard.upBy();
    } else {
      angular.element('#inputs1, #inputs2 ').addClass('move-disable');
      $scope.flag = 0;
    }
    return false;
  }

  function redo($event) {
    $event.preventDefault();
    angular.element('#inputs1, #inputs2 ').val('');
    angular.element('#inputs1, #inputs2 ').removeClass('move-disable');
    value = '';
    if ($scope.data.input) {
      $scope.enteredValue = ' ';
    } else {
      $scope.answer = ' ';
    }
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  var inputElement;

  function onNumberClick($event, num) {
    if ($scope.flag === -1) {
      if (num === 'backspace') {
        value = value.substring(0, value.length - 1);
      } else {
        value = value.length <= 1 ? value + '' + num : value;
      }
    }
    inputElement.val(value);
  }

  function inputClick(index) {
    value = '';
    inputElement = $('#inputs' + index);
  }

  $timeout(function () {
    angular.element('#inputs1, #inputs2 ').on('keydown', function (event) {
      var regex = new RegExp('^[]+$');
      var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });
  });
}
