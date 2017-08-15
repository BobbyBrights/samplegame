export default function beadsController($scope, $stateParams, GameData, RequireImages) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'beads';

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.questionLabel = questionData.questionLabel.text;
  $scope.header = gameData.home.header;

  // static positions for beads
  $scope.beadsPosition = [67,77.5,87.7];
  $scope.checkClass = {tick: 'invisible'};
  var dragItemPosition = ['34%', '45%', '56%'];

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.images = RequireImages.get(imageContext, gameData.home.images);
  $scope.circleImages = RequireImages.get(imageContext, questionData.circleImages);
  $scope.chainImages = RequireImages.get(imageContext, questionData.chainImages);
  $scope.sign = RequireImages.get(imageContext, questionData.sign.tick);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.menu = _.cloneDeep(gameData.menu);

  //For more/next button click
  $scope.next = next;
  $scope.itemDropped = itemDropped;
  $scope.onClickMore = onClickMore;
  $scope.getScoreboard = getScoreboard;

  init();

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  var max, min, maxLimit, minLimit, count;

  // Game initialization function
  function init() {
    max = 3;
    min = 0;
    maxLimit = 1;
    minLimit = 0;
    onClickMore();
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    onClickMore();
    return false;
  }

  //call when you drop ur image
  function itemDropped(dragItem, dropZone) {

    dragItem.dropOnto(dropZone);
    $scope.$apply(function () {
      $scope.scoreboard.up();
    });

    var index = $(dragItem).attr('group');
    dragItem.css({'left': $scope.beadsPosition[index] + '%'}).addClass('move-disable');

    if (count === 2) {
      angular.element('#tick').addClass('visible').removeClass('invisible');
    }
    count++;
  }

  //more beads click function
  function onClickMore() {
    count = 0;
    angular.element('#tick').addClass('invisible').removeClass('visible');
    $scope.dragPosition = _.shuffle(dragItemPosition);

    for (var i = 0; i < 3; i++) {
      angular.element('#drag-zone' + i).css({'left': $scope.dragPosition[i], 'top': '61%'});
      angular.element('#drag-zone' + i)
        .removeClass('move-disable')
        .addClass('move-enable').removeAttr('occupant').attr('zone', 'UNDROPPED');
    }

    min = min + max;
    minLimit = minLimit + maxLimit;

    if (min === 15 && minLimit === 5) {
      min = 0;
      minLimit = 0;
    }
    $scope.imageCount = _.range(min, min + max);
    $scope.chainCount = _.range(minLimit, minLimit + maxLimit);
  }
}

