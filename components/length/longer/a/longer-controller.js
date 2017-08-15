export default function longerController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'longer.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.length.types.longer');

  var questionData      = gameData.home.question,
      dropZonePositions = questionData.dropZonePositions;

  $scope.questionText = questionData.hint.text;
  $scope.dragItems    = questionData.dragItems;
  $scope.header       = gameData.home.header;
  $scope.baseline     = questionData.baseline;

  // Set image path
  $scope.images       = RequireImages.get($scope.getImageContext(), gameData.home.images.middle);
  $scope.longerImages = RequireImages.get($scope.getImageContext(), questionData.longerImages);
  $scope.signImages   = RequireImages.get($scope.getImageContext(), questionData.signImages);

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  //For more/next button click
  $scope.next = next;


  // Game initialization function
  var groupCounter = 0,
      counter      = 0,
      min          = 0,
      max          = 2;

  init();

  function init() {
    $scope.animal = [];

    $scope.groups            = groupCounter % max === 0 ? [1, 0] : [0, 1];
    $scope.dropZonePositions = dropZonePositions[groupCounter];

    angular.element('#tick-0,#tick-1').css('visibility', 'hidden');

    angular.element('#button-drag-0').css({left: '30.6%', top: '112.5%'});
    angular.element('#button-drag-1').css({left: '50.9%', top: '112.5%'});

    groupCounter = ++groupCounter > 4 ? 0 : groupCounter;
    for (min = 0; min < max; min++) {
      $scope.animal.push(counter);
      counter = ++counter > 9 ? 0 : counter;
    }
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    angular.element('.drag-btn').removeClass('move-disable');
    init();
    return false;
  }

  $scope.itemDropped = function (dragItem, dropZone) {

    dragItem.addClass('move-disable');
    dragItem.dropOnto(dropZone);

    if (dragItem.id === 'button-drag-0') {
      angular.element('#tick-' + $scope.groups[0]).css('visibility', 'visible');
    }
    if (dragItem.id === 'button-drag-1') {
      angular.element('#tick-' + $scope.groups[1]).css('visibility', 'visible');
    }
  };
}
