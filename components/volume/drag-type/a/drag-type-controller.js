export default function dragTypeController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'drag-type.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.volume.types.drag-type');

  var questionData    = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.baseline     = questionData.baseline;
  // Set menu icons
  $scope.menu          = _.cloneDeep(gameData.menu);
  $scope.header        = gameData.home.header;
  $scope.dragItems     = questionData.dragItems;
  $scope.dragPositions = questionData.dragPositions;
  $scope.boxImage      = RequireImages.get($scope.getImageContext(), questionData.boxImages);
  $scope.signs         = RequireImages.get($scope.getImageContext(), questionData.sign);


  //For next button click
  $scope.next           = next;
  $scope.itemDropped    = itemDropped;
  $scope.resetDragItems = resetDragItems;

  var maxValue = questionData.maxValue,
      minValue = questionData.minValue,
      counter  = minValue;

  init();

  // Game initialization function
  function init() {
    $scope.groups   = counter % maxValue === 0 ? [1, 0] : [0, 1];
    $scope.boxCount = _.range(minValue, maxValue + minValue);

    minValue = minValue + maxValue;
    counter++;

    if (minValue === maxValue * 10) {
      minValue = questionData.minValue;
      counter  = minValue;
    }

    resetDragItems();
  }

  function resetDragItems() {
    for (var i = 0; i < $scope.dragItems.length; i++) {
      var dragId        = angular.element('#drag' + i),
          dragPositions = $scope.dragPositions[i].split(','),
          dragLeft      = parseInt(dragPositions[0]),
          dragTop       = parseInt(dragPositions[1]);

      dragId.css({position: 'absolute', left: dragLeft + '%', top: dragTop + '%'});
      dragId.removeClass('move-disable').addClass('move-enable');
      angular.element('.tick').css('visibility', 'hidden');
    }
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

  function itemDropped(dragItem, dropZone) {
    dragItem.addClass('move-disable');
    dragItem.dropOnto(dropZone);
    angular.element('#tick-' + dropZone.group).css('visibility', 'visible');
  }
}
