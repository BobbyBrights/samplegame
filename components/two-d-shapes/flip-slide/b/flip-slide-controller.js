export default function flipSlideController($scope, $state, $stateParams, GameData, RequireImages, $interval) {
  'ngInject';

  $scope.gamePageView = 'flip-slide.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.two-d-shapes.types.flip-slide');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.subHint = questionData.subHint.text;
  $scope.header = gameData.home.header;
  $scope.questionLabel = questionData.label;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.image = RequireImages.get($scope.getImageContext(), questionData.images);
  $scope.buttons = RequireImages.get($scope.getImageContext(), questionData.buttons);
  $scope.lizard = RequireImages.get($scope.getImageContext(), questionData.lizard);
  $scope.shadow = RequireImages.get($scope.getImageContext(), questionData.shadow);


  $scope.flipFunction = flipFunction;
  $scope.resetButton = resetButton;
  var promise, flip = 1, rotateValue = 0;
  init();

  // Game initialization function
  function init() {
  }

  $scope.stop = function () {
    $interval.cancel(promise);
  };

  $scope.$on('$destroy', function () {
    $scope.stop();
  });

  angular.element('#flip').click(function () {
    flipFunction();
  });

  $scope.click = function () {
    var id = this.img.id;
    angular.element('#' + id).mousedown(function () {
      $scope.press = true;
      if (id == 'right') {
        $scope.stop();
        promise = $interval(right, 100);
      } else if (id == 'left') {
        $scope.stop();
        promise = $interval(left, 100);
      } else if (id == 'up') {
        $scope.stop();
        promise = $interval(up, 100);
      } else if (id == 'down') {
        $scope.stop();
        promise = $interval(down, 100);
      } else if (id == 'upward') {
        $scope.stop();
        promise = $interval(upward, 100);
      } else if (id == 'downward') {
        $scope.stop();
        promise = $interval(downward, 100);
      }
    }).mouseup(function () {
      $scope.stop();
      $scope.press = false;
    });
  };

  function right() {
    var lizard = angular.element('#lizard'),
      left = parseInt(lizard.css('left'));
    if (left > 0) {
      left -= 5;
      lizard.css({left: parseInt(left)});
    }
  }

  function left() {
    var lizard = angular.element('#lizard'),
      left = parseInt(lizard.css('left'));
    if (left < 380) {
      left += 5;
      lizard.css({left: parseInt(left)});
    }
  }

  function up() {
    var lizard = angular.element('#lizard'),
      top = parseInt(lizard.css('top'));
    if (top > 0) {
      top -= 5;
      lizard.css({top: parseInt(top)});
    }
  }

  function down() {
    var lizard = angular.element('#lizard'),
      top = parseInt(lizard.css('top'));
    if (top < 285) {
      top += 5;
      lizard.css({top: parseInt(top)});
    }
  }

  function flipFunction() {
    flip = flip == 1 ? -1 : 1;
    angular.element('#lizard').css({
      '-webkit-transform': 'rotate(' + rotateValue + 'deg) scaleX(' + flip + ') ',
      '-moz-transform': 'rotate(' + rotateValue + 'deg) scaleX(' + flip + ')',
      '-ms-transform': 'rotate(' + rotateValue + 'deg) scaleX(' + flip + ')',
      '-o-transform': 'rotate(' + rotateValue + 'deg) scaleX(' + flip + ')',
      'transform': 'rotate(' + rotateValue + 'deg) scaleX(' + flip + ')',
      'transform-origin': 'right top 0px'
    });
  }

  function rotate(deg) {
    angular.element('#lizard').css({
      '-webkit-transform': 'rotate(' + deg + 'deg) scaleX(' + flip + ') ',
      '-moz-transform': 'rotate(' + deg + 'deg) scaleX(' + flip + ')',
      '-ms-transform': 'rotate(' + deg + 'deg) scaleX(' + flip + ')',
      '-o-transform': 'rotate(' + deg + 'deg) scaleX(' + flip + ')',
      'transform': 'rotate(' + deg + 'deg) scaleX(' + flip + ')',
      'transform-origin': 'right top 0px'
    });
  }

  function upward() {
    if ($scope.press) {
      if (rotateValue < 361) {
        rotate(rotateValue);
        rotateValue--;
      } else {
        rotateValue = 0;
      }
    }
  }

  function downward() {
    if ($scope.press) {
      if (rotateValue > -361) {
        rotate(rotateValue);
        rotateValue++;
      } else {
        rotateValue = 0;
      }
    }
  }

  function resetButton() {
    angular.element('#lizard').css({
      '-webkit-transform': 'none',
      '-moz-transform': 'none',
      '-ms-transform': 'none',
      '-o-transform': 'none',
      'transform': 'none',
      'left': '0.5%',
      'top': '60%',
    });
  }
}