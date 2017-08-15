export default function dragTypeController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'month.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.time.types.month');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  /* $scope.help =  gameData.help;*/

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.monthImages = RequireImages.get($scope.getImageContext(), gameData.home.images);

  $scope.day = questionData.daysName;
  $scope.monthNames = questionData.monthNames;
  $scope.gradiantColors = questionData.gradiantColors;
  $scope.dragItems = questionData.dragItems;
  $scope.dropZones = questionData.dropZones;
  $scope.checkClass = {tick: 'invisible'};

  // validate drop zones
  $scope.itemDropped = itemDropped;
  $scope.getScoreboard = getScoreboard;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  var dropCount = 0,
    weekDaysLength = 12;

  function itemDropped(dragItem, dropZone) {
    dropCount = dropCount + 1;
    dragItem.dropOnto(dropZone);
    $scope.$apply(function () {
      $scope.scoreboard.up();
    });
    dragItem.css({'pointer-events': 'none'});
    if (dropCount === weekDaysLength) {
      $('#tick').addClass('visible').removeClass('invisible');
      dropCount = 0;
    }
  }

}