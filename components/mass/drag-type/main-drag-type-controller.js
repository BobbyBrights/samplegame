export default function dragTypeController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'drag-type.' + $scope.level;

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.mass.types.drag-type');

  var questionData = gameData.home.question,
      nextCount    = -1,
      dropCount    = 0;

  $scope.questionText = questionData.hint.text;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);

  if ($scope.menu.left) {
    $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  }

  $scope.displayImages = RequireImages.get($scope.getImageContext(), questionData.displayImages);
  $scope.header        = gameData.home.header;

  $scope.dragItems             = questionData.dragItems;
  $scope.dragItemLeftPositions = questionData.dragItemLeftPositions;
  $scope.dragItemTopPositions  = questionData.dragItemTopPositions;
  $scope.dropZoneLeftPositions = questionData.dropZoneLeftPositions;
  $scope.dropZoneTopPositions  = questionData.dropZoneTopPositions;
  $scope.signImages            = RequireImages.get($scope.getImageContext(), questionData.signImages);

  var dragGroupValues = questionData.dragGroupValues;

  $scope.itemDropped = itemDropped;
  $scope.next        = next;

  var counter = 0;
  init();

  function changeImages() {
    $scope.imageCount = [];
    $scope.groups     = dragGroupValues[nextCount];

    if (counter < 5) {
      $scope.imageCount.push(counter++);
    } else {
      if (counter === 15) {
        counter = 0;
        $scope.imageCount.push(counter++);
      } else {
        $scope.imageCount.push(counter++, counter++);
      }
    }
  }


  $scope.getScoreboard = getScoreboard;
  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  function itemDropped(dragItem, dropZone) {
    $scope.$apply(function () {
      $scope.scoreboard.up();
    });
    dropCount++;
    if (dropCount === 2) {
      $('.tick').addClass('visible').removeClass('invisible ');
    }
    dragItem.dropOnto(dropZone);
    dragItem.addClass('move-disable');
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

  init();
  // Game initialization function
  function init() {
    $('.tick').addClass('invisible').removeClass('visible ');
    nextCount = (nextCount !== (dragGroupValues.length - 1)) ? (nextCount + 1) : 0;
    changeImages();
    resetDragItems();
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    setTimeout(function(){
      $('.drag-btn').removeClass('invisible').addClass('fade-in');
    }, 10)
    return false;
  }

  if ($scope.level === 'a') {
    $('.scoreboard-container').addClass('display-none');
    $('.scoreboard-container .scoreboard .scoreboard-background').css({'display': 'none'});
  } else {
    $('.scoreboard-container').removeClass('display-none');
  }
}
