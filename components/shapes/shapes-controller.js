export default function shapesController($scope, $stateParams, GameData, RequireImages) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'shapes';

  var questionData = gameData.home.question;
  $scope.header = gameData.home.header;
  $scope.questionLabel = questionData.questionLabel.text;
  $scope.questionText = questionData.hint.text;

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.images = RequireImages.get(imageContext, gameData.home.images);
  $scope.signImage = RequireImages.get(imageContext, questionData.signImage);
  $scope.randomImages = RequireImages.get(imageContext, questionData.randomImages);
  $scope.dropImage = RequireImages.get(imageContext, questionData.dropImage);
  $scope.menu = _.cloneDeep(gameData.menu);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.getScoreboard = getScoreboard;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  //For next button click
  $scope.next = next;

  var max = 3,
    min = 0,
    count = 0;

  $scope.count = _.range(0, 3);
  $scope.checkClass = {tick: 'invisible'};
  $scope.dragLeft = ['45%', '35%', '55.5%'];

  init();

  // Game initialization function
  function init() {
    angular.element('#tick').addClass('invisible').removeClass('visible');
    angular.element('.drag-items').removeClass('move-disable');

    count = 0;
    $scope.count = _.range(min, min + max);
    $scope.result = _.shuffle($scope.count);
    $scope.drop = _.cloneDeep($scope.result);

    $scope.drop.sort();

    for (var i = 0; i < 3; i++) {
      angular.element('#drag' + i).css({left: $scope.dragLeft[i], top: '65%'});
    }

    min = min + max;

    if (min === 9) {
      min = 0;
    }
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  $scope.itemDropped = function (dragItem, dropZone) {
    dragItem.addClass('move-disable');
    dragItem.dropOnto(dropZone);

    $(dragItem).css({'position': 'absolute', top: dropZone.css('top'), left: dropZone.css('left')});

    $scope.$apply(function () {
      $scope.scoreboard.up();
    });

    if (count === 2) {
      angular.element('#tick').addClass('visible').removeClass('invisible');
    }

    count++;
  };
}
