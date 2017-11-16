export default function fractionsController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';
  console.log('fractionsController');
  $scope.category   = $stateParams.category;
  $scope.gameName   = $stateParams.game || '';

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.gamePageView = $scope.gameName + '.' + $scope.level;  

  /* Game specific logic and common function for all sub types could be added here */
}
