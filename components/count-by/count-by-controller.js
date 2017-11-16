/**
 * NOTE:
 * For sub game type, make the following chnages
 * In menu/data.json, 1) add sub-game type as 'frog', 2) add '-game' suffix to 'path' value
 */
export default function countByController($scope, $state, $stateParams) {
  'ngInject';

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'count-by-two';

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.gamePageView = $scope.gameName + '.' + $scope.level;
}
