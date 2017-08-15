export default function oddAndEvensController($scope, $stateParams, GameData, RequireImages) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'odds-and-evens';

  var questionData         = gameData.home.question,
      numberRange          = questionData.numberRange;
  $scope.questionText      = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.dropZonePositions = questionData.dropZonePosition;

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.images     = RequireImages.get(imageContext, gameData.home.images);
  $scope.cardImages = RequireImages.get(imageContext, questionData.cardImages);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.menu   = _.cloneDeep(gameData.menu);
  $scope.footer = gameData.home.footer.text;

  //For more/next button click
  $scope.reset       = reset;
  $scope.itemDropped = itemDropped;

  init();

  // Game initialization function
  function init() {

    $scope.cardNumber    = _.range(0, 21).reverse();
    $scope.oddEvenNumber = _.range(numberRange.minLimit, numberRange.maxLimit, numberRange.differ)
      .concat(_.range(numberRange.differ, numberRange.maxLimit + 2, numberRange.differ));

    angular.element('.drag-item').removeClass('move-disable');
  }

  // For more button click
  function reset($event) {
    $event.preventDefault();
    angular.element('.drag-item').css({left: '46.2%', top: '58%', zIndex: 0});
    init();
    return false;
  }

  /**
   * Game specific logic
   */
  function itemDropped(dragItem, dropZone) {
    dragItem.addClass('move-disable');
    dragItem.dropOnto(dropZone);
  }
}