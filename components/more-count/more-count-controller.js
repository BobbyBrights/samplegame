export default function moreCountController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.isGamePage = $state.current.isGamePage;
  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || '';


  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);
  var gameData;

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.gamePageView = $scope.gameName + '.' + $scope.level;

  if ($scope.gameName === '') {
    gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
      $stateParams.category + '.games.more-count');
    $scope.buttonImages = RequireImages.get($scope.getImageContext(), gameData.home.buttonImages);
    $scope.header = gameData.home.header;
    $scope.hint = gameData.home.hint.text;
  } else {
    gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
      $stateParams.category + '.games.more-count.types.' + $scope.gameName);
    angular.element('#workArea').hide();
  }

  var maxLimit = gameData.home.question.maxValue,
    minLimit = gameData.home.question.minLimit || 1,
    buttons = gameData.home.question.count;

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

    var result =
      [$scope.randomAnswerNumber - 1, $scope.randomAnswerNumber, $scope.randomAnswerNumber + 1];
    $scope.randomNumbers = _.shuffle(result);
    return $scope.randomAnswerNumber;
  };


  //Function for to generate random number
  function generateRandomNumber() {
    return Math.floor((Math.random() * (maxLimit)) + minLimit);
  }
}
