export default function dragTypeController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'drag-type.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.capacity.types.drag-type');

  var questionData     = gameData.home.question;
  $scope.questionText  = questionData.hint.text;
  $scope.header        = gameData.home.header;
  $scope.dragItems     = questionData.dragItems;
  $scope.dragPositions = questionData.dragPositions;
  //$scope.baseline     = questionData.baseline;

  // Set image path
  $scope.Images            = RequireImages.get($scope.getImageContext(), gameData.home.images);
  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.containerImages   = RequireImages.get($scope.getImageContext(), questionData.containerImages);
  $scope.signs             = RequireImages.get($scope.getImageContext(), questionData.sign);

  //For more/next button click
  $scope.next        = next;
  $scope.itemDropped = itemDropped;

  var maxValue  = questionData.maxValue,
    minValue  = questionData.minValue,
    counter   = minValue,
    dropCount = 0;
  $scope.getScoreboard      = getScoreboard;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }


  init();

  // Game initialization function
  function init() {
    dropCount             = 0;
    $scope.dragPositions  = questionData.dragPositions;
    $scope.groups         = counter % maxValue === 0 ? [0, 1] : [1, 0];
    $scope.containerCount = _.range(minValue, maxValue + minValue);

    minValue = minValue + maxValue;
    counter++;

    if (minValue === maxValue * 10) {
      minValue = questionData.minValue;
      counter  = minValue;
    }

    angular.element('.tick').css('visibility', 'hidden');
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function itemDropped(dragItem, dropZone) {
    dragItem.addClass('move-disable');
    dragItem.dropOnto(dropZone);
    dropCount++;
    if (dropCount === 2) {
      $scope.$apply(function () {
        $scope.scoreboard.up();
      });
      angular.element('#tick').css('visibility', 'visible');
      dropCount = 0;
    }
  }
}