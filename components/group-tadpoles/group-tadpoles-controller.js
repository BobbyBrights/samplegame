export default function groupTadpolesController($scope, $stateParams, GameData, RequireImages) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'group-tadpoles';
  $scope.flag = true;

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.menu = _.cloneDeep(gameData.menu);

  /* Game specific logic */
  var counter = 0,
    variations = questionData.variations,
    value;

  $scope.circleImages = RequireImages.get(imageContext, questionData.images.circle);
  $scope.tadpoleImage = RequireImages.get(imageContext, questionData.images.tadpole);
  $scope.frogImage = RequireImages.get(imageContext, questionData.images.frog);
  $scope.sign = RequireImages.get(imageContext, questionData.sign);

  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.onNumberClick = onNumberClick;
  $scope.redo = redo;

  init();
  $scope.flag = -1;
  var checkIsEmpty = false;


  // Game initialization function
  function init() {
    $scope.data = variations['type' + counter++];
    $scope.answer = ' ';
    value = '';
    $scope.enteredValue = ' ';
    $scope.buttons = _.range(1, $scope.data.buttons + 1);
    $scope.noOfGroups = _.size($scope.data.circles);
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    angular.element('.action-btn').css({'pointer-events': 'auto'});

    $scope.menu.bottom.numPad.noOfButtons = ($scope.data.input === true) ? 10 : 5;
    $scope.menu = _.merge({}, $scope.menu);

    if ($scope.data.input) {
      $scope.answer = $scope.data.circles.circle1.tadpoles;

    }
    if (counter > 19) {
      counter = 0;
    }
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    value = '';
    return false;
  }

  function redo($event) {
    $event.preventDefault();
    console.log('redo clicked');
    angular.element('.input-box').val('');
    value = '';
    if ($scope.data.input) {
      $scope.enteredValue = ' ';
    } else {
      $scope.answer = ' ';
    }
    //$scope.answer = ' ';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  function check($event) {
    $event.preventDefault();
    var totalTadpoles,
      isCorrect = false;

    checkIsEmpty = _.isEmpty(value);

    totalTadpoles = ($scope.data.input === true) ?
    $scope.noOfGroups * $scope.data.circles.circle1.tadpoles : $scope.data.circles.circle1.tadpoles;
    isCorrect = totalTadpoles === parseInt(value);
    console.log(">>>",totalTadpoles)

    if (checkIsEmpty === false) {
      if (isCorrect) {
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }

    return false;
  }

  function onNumberClick($event, num) {
    checkIsEmpty = false;
    if (value.length < 1) {
      value = value + '' + num;
    } else {
      value = value;
    }

    if ($scope.data.input) {
      $scope.enteredValue = value;
    } else {
      $scope.answer = value;
    }
  }

}

