/**
 * NOTE:
 * For sub game type, make the following chnages
 * In menu/data.json, 1) add sub-game type as 'frog', 2) add '-game' suffix to 'path' value
 */
export default function chanceProbabilityController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.category   = $stateParams.category;
  $scope.gameName   = $stateParams.game || 'bag';

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.gamePageView = $scope.gameName + '.' + $scope.level;

  $scope.getScoreboard = getScoreboard;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }
  /* Game specific logic and common function for all sub types could be added here */
}
