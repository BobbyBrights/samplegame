export default function chanceController($scope, $state, $stateParams, GameData, RequireImages, $interval) {
  'ngInject';

  $scope.gamePageView = 'chance.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.chance-probability.types.chance');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.counter = 0;
  var dropCount = 0,
    fly = 0,
    frogFly = 0,
    interval,
    frogInterval,
    groups = questionData.group,
    leftImages = RequireImages.get($scope.getImageContext(), questionData.leftImages),
    rightImages = RequireImages.get($scope.getImageContext(), questionData.rightImages);

  $scope.buttonText = questionData.buttonText;
  $scope.groups = groups[$scope.counter];
  $scope.leftImages = leftImages[$scope.counter];
  $scope.rightImages = rightImages[$scope.counter];
  $scope.playButton = RequireImages.get($scope.getImageContext(), questionData.playButton);
  $scope.otherImages = RequireImages.get($scope.getImageContext(), questionData.otherImages);
  $scope.tickImage = RequireImages.get($scope.getImageContext(), questionData.tick);
  $scope.leftPositions = questionData.leftPositions;
  $scope.topPositions = questionData.topPositions;

  //For more/next button click
  $scope.next = next;
  $scope.itemDropped = itemDropped;
  $scope.playClick = playClick;

  // Game initialization function
  function init() {
    $scope.counter++;
    angular.element('#tick').addClass('invisible');

    if ($scope.counter === 9) {
      $scope.counter = 0;
      $scope.scoreboard.reset();
    }
    resetAnimation();
    $scope.groups = groups[$scope.counter];
    $scope.leftImages = leftImages[$scope.counter];
    $scope.rightImages = rightImages[$scope.counter];
    angular.element('#rightImg').removeClass('invisible');
    angular.element('#leftImg').removeClass('invisible');

    for (var i = 0; i < 2; i++) {
      angular.element('#drag-' + i)
        .removeClass('move-disable')
        .addClass('move-enable')
        .css({left: (30.5 + (i * 20.5)) + '%', top: '112.5%'});
    }
  }

  function itemDropped(dragItem, dropZone) {
    dragItem.dropOnto(dropZone);
    dragItem.removeClass('move-enable').addClass('move-disable');
    dropCount++;

    $scope.$apply(function () {
      $scope.scoreboard.upBy();
    });

    if (dropCount === 2) {
      angular.element('#tick').removeClass('invisible');
      dropCount = 0;
    }
  }

  var kangarooPlayClick = 0;

  function kangarooHop() {
    kangarooPlayClick++;
    var kangaroo = angular.element('#kangarooHop');
    if (kangarooPlayClick === 1) {
      angular.element('#rightImg').addClass('invisible');
      kangaroo.addClass('kangarooHop');
      kangaroo.removeClass('invisible');
    } else {
      kangaroo.removeClass('kangarooHop').addClass('invisible');
      angular.element('#rightImg').removeClass('invisible');
      kangarooPlayClick = 0;
    }
  }

  function kangarooHopFlip() {
    kangarooPlayClick++;
    var kangaroo = angular.element('#kangarooHopFlip');
    if (kangarooPlayClick === 1) {
      angular.element('#leftImg').addClass('invisible');
      kangaroo.addClass('kangarooHopFlip flip');
      kangaroo.removeClass('invisible');

    } else {
      kangaroo.removeClass('kangarooHopFlip').addClass('invisible');
      angular.element('#leftImg').removeClass('invisible');
      kangarooPlayClick = 0;
    }
  }

  var click2 = 0, click1 = 0, name;

  function playClick(id) {
    if ($scope.counter === 6) {
      if (id === 'right') {
        kangarooHop();
      } else {
        kangarooHopFlip();
      }
    }
    else if ($scope.counter === 1) {
      if (id === 'left') {
        name = 'cassowary';
        animate('cassowary', click1);
      } else {
        name = 'lizard';
        animate('lizard', click2);
      }
    }
    else if ($scope.counter === 3) {
      if (id === 'right') {
        if (fly === 0) {
          butterfly();
        } else {
          $interval.cancel(interval);
          butterfly();
          fly = 0;
        }
      } else {
        if (frogFly === 0) {
          frog();
        } else {
          $interval.cancel(interval);
          frog();
          frogFly = 0;
        }
      }
    }
  }

  var cnt = 0, intId;

  function animate(name, click) {
    cnt = 0;
    if (click === 0) {
      intId = $interval(function () {
        if (cnt === 10) {//
          cnt = 0;
          $interval.cancel(intId);
        }
        else {
          cnt++;
          angular.element('#' + name).css({'top': '-=3.5%'});
        }
      }, 70, 10);
      click++;

    } else {
      angular.element('#' + name).css({'top': '36%'});
      click = 0;
    }
    if (name === 'cassowary') {
      click1 = click;
    } else {
      click2 = click;
    }
  }

  function butterfly() {
    angular.element('#butterfly').addClass('invisible');
    angular.element('#butterfly-fly').toggleClass('invisible butterfly-b');
    interval = $interval(callAtInterval, 2500, 1);
    fly++;
  }

  function callAtInterval() {
    angular.element('#butterfly').removeClass('invisible');
    angular.element('#butterfly-fly').toggleClass('invisible butterfly-b');
  }

  function frog() {
    angular.element('#frogImg').addClass('invisible');
    angular.element('#frog').toggleClass('invisible frog');
    frogInterval = $interval(AtInterval, 2500, 1);
    frogFly++;
  }

  function AtInterval() {
    angular.element('#frogImg').removeClass('invisible');
    angular.element('#frog').toggleClass('invisible frog');
  }

  function resetAnimation() {
    if ($scope.counter === 4) {
      if (fly > 0) {
        angular.element('#butterfly').removeClass('invisible');
        $interval.cancel(interval);
      }
      if (frogFly > 0) {
        angular.element('#frogImg').removeClass('invisible');
        $interval.cancel(frogInterval);
      }
    }
  }

  // For more button click
  function next($event) {
    $event.preventDefault();

    init();

    return false;
  }
}
