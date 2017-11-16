export default function matchController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'match.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.two-d-shapes.types.match');

  var questionData = gameData.home.question;

  $scope.questionText = questionData.hint.text;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.header = gameData.home.header;
  $scope.questionText = questionData.hint.text;
  $scope.dragShapes = RequireImages.get($scope.getImageContext(), questionData.dragImages);
  $scope.dropZoneShapes = RequireImages.get($scope.getImageContext(), questionData.shapes);

  /* drag and drop positions*/
  var counter = 0;

  $scope.itemDropped = itemDropped;

  function itemDropped(dragItem) {
    dragItem.addClass('move-disable');

    var id = $(dragItem).attr('id'),
      left = questionData.positions[id].split(',')[0],
      top = questionData.positions[id].split(',')[1];

    $(dragItem).css({'left': left + '%', 'top': top + '%'});

    counter = counter < 4 ? ++counter : 0;
  }
}
