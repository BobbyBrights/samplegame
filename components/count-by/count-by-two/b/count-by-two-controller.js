export default function countByTwoController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'count-by-two.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.count-by.types.count-by-two');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  var maxCountLimit = questionData.maxValue,
    minCountLimit = questionData.minValue;

  // Set image path
  $scope.buttonImages = RequireImages.get($scope.getImageContext(), {'frog-image': questionData.frogImage});

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.plus = plus;
  $scope.minus = minus;

  init();

  // Game initialization function
  function init() {
    $scope.frogCount = 1;
  }

  /*function for plus */
  function plus($event) {
    $event.preventDefault();
    if ($scope.frogCount === maxCountLimit) {
      return false;
    }
    $scope.frogCount++;
    return false;
  }

  /*function for minus */
  function minus($event) {
    $event.preventDefault();
    if ($scope.frogCount === minCountLimit) {
      return false;
    }
    $scope.frogCount--;
    return false;
  }
}