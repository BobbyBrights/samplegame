
export default function dragTypeController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'sorting.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.three-d-shapes.types.sorting');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;

  $scope.header = gameData.home.header;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  var minLimit = 0, min = 0, maxLimit = 8, max = 2, clickCount = 0;

  $scope.images = RequireImages.get($scope.getImageContext(), questionData.images);

  //For next button click
  $scope.next = next;
  $scope.itemDropped = itemDropped;

  init();

  // Game initialization function
  function init() {
    $scope.boxCount = _.range(minLimit, maxLimit + minLimit);
    $scope.imgCount = _.range(minLimit, maxLimit + minLimit);
    $scope.dropcount = _.range(min, max + min);
    minLimit = minLimit + maxLimit;
    min = min + max;
    $scope.shapes = questionData.shapes[clickCount];
    clickCount++;
    if (clickCount > 2) {
      clickCount = 0;
      minLimit = 0;
      min = 0;
    }
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function itemDropped(dragItem) {
   // dragItem.addClass('move-disable');
    var id = angular.element(dragItem).attr('id'),
      left = questionData.positions[id].split(',')[0],
      top = questionData.positions[id].split(',')[1];
    angular.element(dragItem).css({'left': left + '%', 'top': top + '%'});
  }
}
