  export default function positionController($scope, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'drag-type.a';
  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.position.types.drag-type');

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'drag-type';

  // Require the images
  //var imageContext = require.context('./', true, /.*\.svg$/);
  //console.log('gameData==>', gameData.home.question.frogImages)

  /*$scope.getImageContext = function () {
    return imageContext;
  };
*/
  $scope.images = RequireImages.get($scope.getImageContext(), gameData.home.images);

  $scope.menu   = _.cloneDeep(gameData.menu);
  $scope.header = gameData.home.header;

  /*** Game specific logic   */

  var counter      = 0,
      dropCount    = 0,
      questionData = gameData.home.question;

  $scope.questionText  = questionData.hint.text;
  $scope.questionLabel = questionData.questionLabel.text;
  $scope.imagePosition = questionData.imagePosition;
  $scope.frogImages    = RequireImages.get($scope.getImageContext(), questionData.frogImages);
  $scope.tick          = RequireImages.get($scope.getImageContext(), questionData.tick);

  var text = questionData.buttonLabels;

  $scope.next        = next;
  $scope.itemDropped = drop;

  var minValue = questionData.minValue,
      maxValue = questionData.maxValue;

  init();

  // Game initialization function
  function init() {

    $scope.imageCount = _.range(minValue, maxValue + minValue);
    angular.element('.image-box').css({width: '42%'});

    if (minValue === 8) {
      $scope.imageCount = _.range(minValue, minValue + 1);
      minValue          = minValue - 1;
      angular.element('.image-box').css({width: '54%'});
    }

    dropCount = 0;
    minValue  = minValue + maxValue;

    if (minValue === 13) {
      minValue = questionData.minValue;
    }

    $scope.text = text[counter];
    angular.element('#drag0').css({left: '30.6%', top: '112.4%'});
    angular.element('#drag1').css({left: '50.9%', top: '112.4%'});
    angular.element('.drag').removeClass('move-disable');
    angular.element('#tick').addClass('invisible');

    counter++;

    if (counter > 6) {
      counter = 0;
    }
    // $timeout(function () {      
    //   $('.drag-btn').removeClass('fade-out').addClass('fade-in')   
    // }, 1000);
  }

  function drop(dragItem, dropZone) {
    dragItem.dropOnto(dropZone);
    dragItem.addClass('move-disable');
    dragItem.dropOnto(dropZone);
    dropCount++;

    if (dropCount === 2) {
      angular.element('#tick').removeClass('invisible');
      dropCount = 0;
    }
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }
}