export default function dragTypeController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'week.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.time.types.week');

  var questionData    = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header       = gameData.home.header;
  /* $scope.help =  gameData.help;*/

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.weekImages = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.day        = questionData.daysName;
  $scope.dragTop    = questionData.dragTop;
  $scope.dropTop    = questionData.dropTop;
  $scope.checkClass = {tick: 'invisible'};

  // validate drop zones
  $scope.itemDropped = itemDropped;

  var dropCount      = 0,
    weekDaysLength = 7;

  function itemDropped(dragItem, dropZone) {
    dropCount = dropCount + 1;
    dragItem.dropOnto(dropZone);
    dragItem.css({'pointer-events': 'none'});
    if (dropCount === weekDaysLength) {
      $('#tick').addClass('visible').removeClass('invisible');
      dropCount = 0;
    }
  }
}