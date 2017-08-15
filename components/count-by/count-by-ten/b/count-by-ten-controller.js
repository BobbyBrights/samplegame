export default function countByTenController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'count-by-ten.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.count-by.types.count-by-ten');

  var questionData = gameData.home.question,
    maxCountLimit = questionData.maxValue,
    minCountLimit = questionData.minValue;

  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set image path
  $scope.buttonImages = RequireImages.get($scope.getImageContext(), {'bird-image': questionData.birdImage});

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.plus = plus;
  $scope.minus = minus;

  init();

  // Game initialization function
  function init() {
    $scope.birdCount = 1;
  }

  /* function for plus button*/
  function plus($event) {
    $event.preventDefault();
    if ($scope.birdCount === maxCountLimit) {
      return false;
    }
    $scope.birdCount++;
    return false;
  }

  /* function for minus button */
  function minus($event) {
    $event.preventDefault();
    if ($scope.birdCount === minCountLimit) {
      return false;
    }
    $scope.birdCount--;
    return false;
  }
}