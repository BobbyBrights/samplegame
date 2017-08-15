export default function twoDiceController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'two-dice.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.addition.types.two-dice');

  var questionData = gameData.home.question;
  $scope.header = gameData.home.header;
  $scope.questionText = questionData.hint.text;
  $scope.plusSignText = questionData.sign.plusText;
  $scope.equalSignText = questionData.sign.equalText;
  $scope.flag = true;

  // Set image path
  $scope.Images = RequireImages.get($scope.getImageContext(), gameData.home.images);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.circleImages = RequireImages.get($scope.getImageContext(), questionData.circleImages);

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
    $scope.count = 0;
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    $scope.firstNumber = $scope.generateRandomNumber(6, 0);
    $scope.secondNumber = $scope.generateRandomNumber(6, 0);
    $scope.answer = eval($scope.firstNumber + $scope.secondNumber);
    $scope.leftCircle = RequireImages.get($scope.getImageContext(), questionData.circleImages[$scope.firstNumber]);
    $scope.rightCircle = RequireImages.get($scope.getImageContext(), questionData.circleImages[$scope.secondNumber]);
    disableCharacter();
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    angular.element('#input-1').val('');
    value = '';
    return false;
  }

  // For more button click
  function check($event) {
    $event.preventDefault();
    var result = parseInt($('#input-1').val());
    checkIsEmpty = _.isEmpty(value);

    if (checkIsEmpty === false) {
      $scope.inputDisabled = true;
      if (result === $scope.answer) {
        $scope.count++;
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
        if ($scope.count === 1) {
          $scope.scoreboard.up();
        }
      } else {
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
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }
}
