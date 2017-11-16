export default function dataGraphsController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {

  'ngInject';


  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'fruit';

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.getRandomValues = function (numbersOfImage, index, iconImages) {
    var iconImagesNumbers = [];
    for (var j = 0; j < numbersOfImage; j++) {
      iconImagesNumbers.push(iconImages[index]);
    }
    return iconImagesNumbers;
  };

  $scope.gamePageView = $scope.gameName + '.' + $scope.level;

  /* Game specific logic and common function for all sub types could be added here */

  /*Disable the all special characters, alphabets and space in the input field*/
  $timeout(function () {
    $('input').on('keypress', function (event) {
      var regex = new RegExp('^[0-9]+$');
      var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });
  });

}
