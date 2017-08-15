export default function moneyController($scope, $stateParams, $timeout, GameData, RequireImages) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'money';
  $scope.flag = true;
  $scope.isDisable = false; // input should disable after check answer.

  var gameData = GameData.getCurrentGame('money');
  $scope.gamePageView = $scope.gameName + '.' + $scope.level;
  $scope.header = gameData.home.header;
  $scope.footer = gameData.home.footer.text;
  $scope.exampleImages = [];

  var i = 0,
    coinsVariation = 15,
    questionData = gameData.home.question,
    value = '',
    imageContext = require.context('./', true, /.*\.svg$/);

  $scope.questionText = questionData.hint.text;
  $scope.rsType = questionData.rsType.text;

  // Require the images

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.images = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.wombatImage = RequireImages.get($scope.getImageContext(), questionData.wombatImage);
  $scope.coins = RequireImages.get($scope.getImageContext(), questionData.coins);
  $scope.coinsImages = RequireImages.get($scope.getImageContext(), questionData.coinsImages);

  $scope.menu = _.cloneDeep(gameData.menu);

  //For more/next button click
  $scope.getScoreboard = getScoreboard;
  $scope.next = next;
  $scope.onNumberClick = onNumberClick;
  $scope.check = check;
  $scope.redo = redo;
  //For number button click

  var cashImages = questionData.coinsImages;

  init();
  $scope.flag = -1;
  var checkIsEmpty = false;

  /*Disable the all special characters, alphabets and space in the input field*/
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

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // For more button click
  function next($event) {
    $event.preventDefault();

    init();
    value = '';
    return false;
  }


  function init() {
    $scope.flag = -1;
    $scope.isDisable = false;
    angular.element('input').val("");
    angular.element('.check-btns').removeClass('move-disable');
    $scope.correctAnswer = cashImages['variation' + i].answer;
    $scope.boxCount = [];
    $scope.position = cashImages['variation' + i].position;
    $scope.enteredValue = '';

    $scope.boxCount = cashImages['variation' + i].images;

    $scope.menu = _.merge({}, $scope.menu);
    if (i <= coinsVariation) {
      i++;
    }
    if (i === coinsVariation) {
      i = 0;
    }
  }

  function redo($event) {
    $event.preventDefault();
    angular.element('.input-box').val('');
    value = '';
    if ($scope.data.input) {
      $scope.enteredValue = '';
    } else {
      $scope.answer = '';
    }
    $scope.flag = -1;
    $scope.isDisable = false;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  function check($event) {
    $event.preventDefault();

    var isCorrect = false;
    if (parseInt(value) === $scope.correctAnswer) {
      isCorrect = true;
      $scope.scoreboard.upBy();
    }

    checkIsEmpty = _.isEmpty(value);
    if (checkIsEmpty === false) {
      $scope.isDisable = true;
      if (isCorrect) {
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }

    return false;
  }

  function onNumberClick($event, num) {
    checkIsEmpty = false;
    if ($scope.flag === -1) {
      if (num === 'backspace') {
        value = value.substring(0, value.length - 1);
      } else {
        value = value.length <= 1 ? value + '' + num : value;
      }
    }

    angular.element('.input-box').val(value);

  }

}