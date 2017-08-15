export default function anglesLevelBController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'angles.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.two-d-shapes.types.angles');

  var questionData = gameData.home.question,
    angleTexts = questionData.angleText;
  $scope.questionText = questionData.hint.text;
  $scope.subHint = questionData.subHint.text;
  $scope.header = gameData.home.header;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.images = RequireImages.get($scope.getImageContext(), questionData.images);
  $scope.angles = RequireImages.get($scope.getImageContext(), questionData.angles);
  $scope.button = RequireImages.get($scope.getImageContext(), questionData.images.button);


  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.resetButton = resetButton;

  var interval, isSmall, rotateValue = 5;
  angular.element('#rotate').addClass('vHidden');

  $scope.onMouseDown = function ($event) {
    $scope.onMouseDownResult = performRotate($event, "Mouse down");
    $scope.press = true;
    interval = setInterval(performRotate, 100);
  };
  $scope.mouseup = function ($event) {
    $scope.press = false;
    clearInterval(interval);
  };


  init();

  // Game initialization function
  function init() {

  }

  // For more button click
  function next($event) {
    $event.preventDefault();

    init();
    return false;
  }

  function check() {
    $event.preventDefault();
    return false;
  }

  function performRotate() {
    if ($scope.press) {
      if (rotateValue < 180) {
        var deg = 'rotate(' + rotateValue + 'deg)';
        rotateValue++;
        angular.element('#rotate').css({
          '-webkit-transform': deg,
          '-moz-transform': deg,
          '-ms-transform': deg,
          '-o-transform': deg,
          'transform': deg,
          'transform-origin': 'bottom'
        });
        $timeout(function () {
          if (rotateValue < 91) {
            $scope.angleText = angleTexts[0];
          }
          if (rotateValue === 91) {
            $scope.angleText = angleTexts[1];
          }
          if (rotateValue > 91) {
            $scope.angleText = angleTexts[2];
          }
        }, 0);

      }
    }
  }

  function resetButton() {
    $scope.angleText = '';
    angular.element('#rotate').css({
      'transform': 'rotate(0deg)',
      'transform-origin': 'bottom'
    }).addClass('vHidden').removeClass('vVisible');
    rotateValue = 5;
  }
}