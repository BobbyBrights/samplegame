export default function countByFiveController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'count-by-five.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.count-by.types.count-by-five');

  var questionData = gameData.home.question,
    maxCountLimit = questionData.maxValue,
    minCountLimit = questionData.minValue;

  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set image path
  $scope.buttonImages = RequireImages.get($scope.getImageContext(), {'butterfly-image': questionData.butterflyImage});

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.plus = plus;
  $scope.minus = minus;

  init();

  // Game initialization function
  function init() {
    $scope.butterflyCount = 1;
  }

  /*Function for plus button */
  function plus($event) {
    $event.preventDefault();
    if ($scope.butterflyCount === maxCountLimit) {
      return false;
    }
    $scope.butterflyCount++;
    return false;
  }

  /*Function for minus */
  function minus($event) {
    $event.preventDefault();
    if ($scope.butterflyCount === minCountLimit) {
      return false;
    }
    $scope.butterflyCount--;
    return false;
  }
}
