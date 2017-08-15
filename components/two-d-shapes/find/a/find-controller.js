export default function findController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'find.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.two-d-shapes.types.find');

  var questionData = gameData.home.question,
      count        = 0;

  $scope.questionText = questionData.hint.text;
  $scope.header       = gameData.home.header;

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.shapes            = RequireImages.get($scope.getImageContext(), questionData.shapes);
  $scope.sign              = RequireImages.get($scope.getImageContext(), questionData.sign);
  $scope.shapeNames        = questionData.shapesName[count];
  $scope.checkClass        = {tick: 'invisible', cross: 'invisible'};

  //For next button click
  $scope.next          = next;
  $scope.onShapesClick = onShapesClick;
  $scope.getScoreboard = getScoreboard;

  init();

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // Game initialization function
  function init() {
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    $('.shapes').removeClass('move-disable');
    count === 3 ? count = 0 : count++; // jshint ignore:line
    $scope.shapeNames = questionData.shapesName[count];
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function onShapesClick(ev) {
    var currentTarget = (ev.currentTarget.id),
        shapeId       = currentTarget.split('-');

    if (shapeId[1] === angular.lowercase($scope.shapeNames)) {
      $scope.checkClass = {tick: 'visible', cross: 'invisible'};
      angular.element('#' + currentTarget).addClass('move-disable');
      $scope.scoreboard.upBy();
    } else {
      $scope.checkClass = {tick: 'invisible', cross: 'visible'};
    }
  }
}
