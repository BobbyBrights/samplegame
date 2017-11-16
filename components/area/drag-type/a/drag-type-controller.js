export default function dragTypeController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'drag-type.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.area.types.drag-type');

  var questionData = gameData.home.question;
  $scope.header    = gameData.home.header;
  $scope.hintText  = questionData.hint.text;

  //For to draw table
  $scope.rows    = _.range(1, 17);
  $scope.columns = _.take($scope.rows, 8);

  $scope.menu = _.cloneDeep(gameData.menu);

  var smallStampSize = questionData.leftSmallStampSize,
      maxLimit       = 2,
      minLimit       = 0,
      dropCount      = 0,
      counter        = minLimit,
      zIndex1,
      zIndex2;

  $scope.stampImages = RequireImages.get($scope.getImageContext(), questionData.stampImages);
  $scope.tickImage   = RequireImages.get($scope.getImageContext(), questionData.tick);

  //For next button click
  $scope.next = next;

  init();

  // Game initialization function
  function init() {
    dropCount     = 0;
    $scope.groups = ( counter === 4 || counter === 5) ? [1, 0] : [0, 1];

    angular.element('#drag0').css({left: '30.6%', top: '112.5%'});
    angular.element('#drag1').css({left: '50.9%', top: '112.5%'});

    $scope.imageCount = _.range(minLimit, maxLimit + minLimit);

    $scope.leftSmallStamp  = $scope.imageCount[0];
    $scope.rightSmallStamp = $scope.imageCount[1];

    $scope.leftSmallStampSize  = smallStampSize[counter][0];
    $scope.rightSmallStampSize = smallStampSize[counter][1];

    minLimit = minLimit + maxLimit;
    counter++;

    if (minLimit === maxLimit * 10) {
      minLimit = 0;
      counter  = minLimit;
    }
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    angular.element('.drag-btn').removeClass('move-disable');
    angular.element('.tick').css('visibility', 'hidden');
    init();
    return false;
  }

  $scope.itemDropped = function (dragItem, dropZone) {
    if (dragItem.id !== 'image-0' && dragItem.id !== 'image-1') {
      dropCount = dropCount + 1;
      dragItem.dropOnto(dropZone);
      dragItem.addClass('move-disable');

      if (dropCount === 2) {
        angular.element('.tick').css('visibility', 'visible');
      }
    }

    if (dragItem.id === 'image-0' || dragItem.id === 'image-1') {

      if ($(dragItem).isInside('.table-container')) {
        zIndex1 = parseInt(angular.element('#image-1').css('z-index'));
        zIndex2 = parseInt(angular.element('#image-0').css('z-index'));

        angular.element('#image-0').css({'z-index': zIndex1 + 2});
        angular.element('#image-1').css({'z-index': zIndex2 + 2});

      } else {
        dragItem.goHome();
      }
    }
  };

  $scope.itemBadlyDropped = function (item) {
    item.goHome();
  };
}