export default function countCrayFishController($scope, $stateParams, GameData, RequireImages) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'count-cray-fish';

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);
  var questionData = gameData.home.question;

  $scope.header       = gameData.home.header;
  $scope.buttonImages = RequireImages.get(imageContext, {'cray-fish-image': questionData.crayFishImage});

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.questionText = questionData.hint.text;
  $scope.menu         = _.cloneDeep(gameData.menu);
  console.log(_.cloneDeep(gameData.menu));
  init();

  // Game initialization function
  function init() {
    $scope.fishCount = 1;
  }

  /**
   * Game specific logic
   */

  var maxCountLimit = questionData.maxValue,
      minCountLimit = questionData.minValue;

  $scope.plus  = plus;
  $scope.minus = minus;


  function plus($event) {
    $event.preventDefault();
    if ($scope.fishCount === maxCountLimit) {
      return false;

    }
    $scope.fishCount++;
    return false;
  }

  function minus($event) {
    $event.preventDefault();
    if ($scope.fishCount === minCountLimit) {
      return false;
    }

    $scope.fishCount--;
    return false;
  }

}