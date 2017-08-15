export default function countToController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.isGamePage = $state.current.isGamePage;
  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || '';

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.gamePageView = $scope.gameName + '.' + $scope.level;
  var gameData;
  if ($scope.gameName === '') {
    gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
      $stateParams.category + '.games.count-to');
    $scope.buttonImages = RequireImages.get($scope.getImageContext(), gameData.home.buttonImages);
    $scope.header = gameData.home.header;
    $scope.hint = gameData.home.hint.text;
  }
  else {
    gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
      $stateParams.category + '.games.count-to.types.' + $stateParams.game);
    angular.element('#workArea').hide();
  }

  //Game Datao
  var maxLimit = gameData.home.question.maxValue,
    minLimit = gameData.home.question.minLimit || 1,
    buttons = gameData.home.question.count,
    result;

  $scope.jarCapText = gameData.home.jarCapText;
  $scope.jarBottomText = gameData.home.jarBottomText;

  $scope.randomAnswerNumber = 0;
  $scope.buttons = _.range(0, buttons);

  if ($state.current.isGamePage) {
    var currentLoad = $stateParams.game;
    $scope.gamePageView = $stateParams.game + '.' + $scope.level;
    maxLimit = gameData.home.question.maxValue;
    $scope.randomAnswerNumber = 0;
    $scope.currentScreen = currentLoad;
    buttons = gameData.home.question.count;
    $scope.buttons = _.range(0, buttons);
  }

  $scope.randomNumber = function () {
    $scope.randomAnswerNumber = generateRandomNumber();
    result =
      [$scope.randomAnswerNumber - 1, $scope.randomAnswerNumber, $scope.randomAnswerNumber + 1];
    $scope.randomNumbers = _.shuffle(result);
    return $scope.randomAnswerNumber;
  };

  //Function for to generate random number
  function generateRandomNumber() {
    return Math.floor((Math.random() * (maxLimit)) + minLimit);
  }
}