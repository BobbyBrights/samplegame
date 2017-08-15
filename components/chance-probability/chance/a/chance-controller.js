export default function chanceController($scope, $state, $stateParams, GameData, RequireImages, $interval, $timeout) {
  'ngInject';

  $scope.gamePageView = 'chance.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.chance-probability.types.chance');

  var questionData = gameData.home.question;

  $scope.questionText = questionData.hint.text;
  $scope.questionData = questionData;
  $scope.header = gameData.home.header;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.images = RequireImages.get($scope.getImageContext(), questionData.images);
  $scope.tickImage = RequireImages.get($scope.getImageContext(), questionData.tick);

  var groups = questionData.group;

  $scope.labels = questionData.labels;
  $scope.headerText = questionData.headerText.text;

  $scope.type = 0;
  $scope.groups = groups[$scope.type];
  $scope.rainOn = false;

  $scope.next = next;
  $scope.play = play;

  var sunrise = 0,
    jump = 0,
    fly = 0,
    dropCount = 0,
    interval,
    dragPositions = questionData.dragPositions;

  $scope.leftPosition = dragPositions;
  $scope.dropLeft = questionData.dropLeft;
  $scope.topPosition = [106, 106, 119];

  // Game initialization function  
  function init() {
    $scope.type++;
    resetAnimate($scope.type);

    if ($scope.type === 3) {
      $scope.type = 0;
      $scope.scoreboard.reset();
    }

    dropCount = 0;
    $scope.groups = groups[$scope.type];

  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function play($index) {
    inForest($index);
  }

  function resetAnimate(type) {
    angular.element('#tick').addClass('invisible');
    for (var i = 0; i < dragPositions.length; i++) {

      angular.element('#drag-' + i)
        .removeClass('move-disable')
        .addClass('move-enable')
        .css({
          left: dragPositions[i] + '%',
          top: $scope.topPosition[i] + '%'
        });
    }
    $scope.rainOn = false;
    sunDown(type);
    kangarooReset();
    angular.element('#tree-2').removeClass('flip');
  }

  $scope.itemDropped = function (dragItem, dropZone) {

    dragItem.dropOnto(dropZone);
    dragItem.removeClass('move-enable').addClass('move-disable');
    dropCount++;

    $scope.$apply(function () {
      $scope.scoreboard.upBy();
    });

    if (dropCount === 3) {
      angular.element('#tick').removeClass('invisible');
      dropCount = 0;
    }
  };

  function sunDown(type) {
    sunrise = 0;
    if (type === 2) {
      angular.element('#sun-two').removeClass('sun-new').css({left: '40%', top: '41%'});
    } else {
      angular.element('#sun').removeClass('sun').css({left: '17%', top: '40%'});
    }
  }

  function sunRise() {
    sunrise++;
    if ($scope.type === 2) {
      angular.element('#sun-two').addClass('sun-new').css({left: '54%', top: '18%'});
    } else {
      angular.element('#sun').addClass('sun').css({left: '30%', top: '18%'});
    }
  }

  function butterfly() {
    angular.element('#butterfly').toggleClass('invisible butterfly');
    angular.element('#butterfly-fly').toggleClass('invisible butterfly-fly');
    interval = $interval(callAtInterval, 2500, 1);
    fly++;
  }

  function callAtInterval() {
    angular.element('#butterfly').toggleClass('invisible butterfly');
    angular.element('#butterfly-fly').toggleClass('invisible butterfly-fly');
  }

  function kangarooHop(type) {
    jump++;
    angular.element('#kangaroo').addClass('invisible');
    if (type === 1) {
      angular.element('#kangaroo-hop').addClass('flip');
    }
    angular.element('#kangaroo-hop').addClass('kangaroo-hop').css({left: '53%', top: '41%'});
  }

  function kangarooReset() {
    jump = 0;
    angular.element('#kangaroo').removeClass('invisible');
    angular.element('#kangaroo-hop').removeClass('kangaroo-hop');
  }

  function rainDrops() {
    $scope.rainOn = !$scope.rainOn;
  }

  var result;

  function inForest(id) {
    switch (id) {
      case 0:
        if ($scope.type <= 1) {
          checkSunrise(sunrise);
        } else {
          if (fly === 0) {
            butterfly();
          } else {
            $interval.cancel(interval);
            butterfly();
            fly = 0;
          }
        }
        break;

      case 1:
        result = $scope.type <= 1 ? checkKangarooJump(jump) : checkSunrise(sunrise);
        break;

      case 2:

        result = $scope.type === 0 ? angular.element('#tree-2').toggleClass('flip') : rainDrops();
        break;

      default:
    }
  }

  function checkSunrise(sunrise) {
    result = sunrise === 0 ? sunRise() : sunDown($scope.type);
  }

  function checkKangarooJump(jump) {

    result = jump === 0 ? kangarooHop($scope.type) : kangarooReset();
  }
}