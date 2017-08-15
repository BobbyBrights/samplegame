
export default function oneKgController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'one-kg.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.mass.types.one-kg');

  var questionData = gameData.home.question,
    nextCount    = -1,
    dropCount    = 0;

  $scope.questionText = questionData.hint.text;
  $scope.header       = gameData.home.header;

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.displayImages         = RequireImages.get($scope.getImageContext(), questionData.displayImages);
  $scope.dragItems             = questionData.dragItems;
  $scope.dragItemLeftPositions = questionData.dragItemLeftPositions;
  $scope.dragItemTopPositions  = questionData.dragItemTopPositions;
  $scope.dropZoneLeftPositions = questionData.dropZoneLeftPositions;
  $scope.signImages            = RequireImages.get($scope.getImageContext(), questionData.signImages);

  var dragGroupValues = questionData.dragGroupValues,
    positionOfDropArea = questionData.positionOfDropArea,
    counter         = 0;

  $scope.itemDropped = itemDropped;
  $scope.next        = next;

  //For next button click
  $scope.next = next;

  init();

  // Game initialization function
  function init() {
    $('.tick').addClass('invisible').removeClass('visible ');
    nextCount = (nextCount !== (dragGroupValues.length - 1)) ? (nextCount + 1) : 0;

    if(positionOfDropArea[nextCount] === 'right'){
      $scope.positionOfDropArea = '61.7';
    }else{
      $scope.positionOfDropArea = '19.5';
    }

    changeImages();
    resetDragItems();
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    setTimeout(function () {
      $('.drag-btn').removeClass('invisible').addClass('fade-in');
    }, 10);
    return false;
  }

  function changeImages() {
    $scope.imageCount = [];
    $scope.groups     = dragGroupValues[nextCount];
    //console.log('$scope.groups ', $scope.groups );

    if (counter === 10) {
      counter = 0;
    }
    $scope.imageCount.push(counter++);
  }

  $scope.getScoreboard = getScoreboard;
  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  /* Reset the drag items when next button clicked*/
  function resetDragItems() {
    dropCount = 0;
    for (var i = 0; i < $scope.dragItems.length; i++) {
      var dragItemsId = angular.element('#drag' + i);

      if (i < $scope.dragItemTopPositions.length) {
        var initLeft = $scope.dragItemLeftPositions[i],
          initTop  = $scope.dragItemTopPositions[i];
        dragItemsId.css({left: initLeft + '%', top: initTop + '%'});
        dragItemsId.removeClass('move-disable');
      }
    }
  }

  function itemDropped(dragItem, dropZone) {
    $scope.$apply(function () {
      $scope.scoreboard.up();
    });

    $('.tick').addClass('visible').removeClass('invisible ');

    dragItem.dropOnto(dropZone);
    dragItem.addClass('move-disable');
  }

}
