
export default function metreController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'metre'+ $scope.level;

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.length.types.metre');

  var questionData    = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.checkClass   = {tick: 'invisible'};
  $scope.header = gameData.home.header;
  var count           = 0;

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.dropZone          = RequireImages.get($scope.getImageContext(), questionData.dropImages);
  $scope.dragItem          = RequireImages.get($scope.getImageContext(), questionData.dragImages);
  $scope.sign              = RequireImages.get($scope.getImageContext(), questionData.sign);
  $scope.image             = RequireImages.get($scope.getImageContext(), questionData.image);
  $scope.display            = RequireImages.get($scope.getImageContext(), questionData.display);
  $scope.chair            = RequireImages.get($scope.getImageContext(), questionData.chair);

  $scope.getScoreboard = getScoreboard;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  $scope.itemDropped = function(dragItem, dropZone) {
    dragItem.addClass('move-disable');
    dragItem.dropOnto(dropZone);
    var id   = $(dragItem).attr('id'),
      left = questionData.positions[id].split(',')[0],
      top  = questionData.positions[id].split(',')[1];
    $(dragItem).css({'left': left + '%', 'top': top + '%'});
    if($scope.level === 'c') {
      $scope.$apply(function () {
        $scope.scoreboard.up();
      });
    }

    $timeout(function () {
      count ++;
    }, 0);

    if (count === 7) {
      $scope.checkClass = {tick: 'visible'};
    }
  };
}
