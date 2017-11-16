export default function multiSquareDragController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'multi-square-drag.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.area.types.multi-square-drag');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.stampHint = questionData.stampHint.text;
  $scope.squareHint = questionData.squareHint.text;
  $scope.header = gameData.home.header;

  // Set image path
  $scope.stampImages = RequireImages.get($scope.getImageContext(), questionData.stampImages);
  $scope.sign = RequireImages.get($scope.getImageContext(), questionData.signs);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  var inputValues = questionData.inputValues,
    zIndex1,
    counter = 0,
    value = '',
    minLimit = 0;

  $scope.Colors = questionData.colors;
  $scope.firstCubeColors = _.take(_.shuffle(_.range(0, 14)), 7);
  $scope.secondCubeColors = _.take(_.shuffle(_.range(0, 14)), 7);
  $scope.thiredCubeColors = _.take(_.shuffle(_.range(0, 14)), 7);

  //For next button click
  $scope.next = next;

  //For check button click
  $scope.check = check;
  $scope.redo = redo;

  init();
  $scope.flag = -1;
  /*Disable the all special characters, alphabets and space in the input field*/
  $timeout(function () {
    $('input').on('keydown', function (event) {
      var regex = new RegExp('^[]+$');
      var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });
  });

  // Game initialization function
  function init() {
    $scope.flag = -1;
    $scope.inputDisabled = false;
    value = '';
    angular.element('.square-one').css({left: '63%', top: '20%'});
    angular.element('.square-two').css({left: '70%', top: '20%'});
    angular.element('.square-three').css({left: '77%', top: '20%'});
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    angular.element('input').val('');
    $scope.imageCount = [];
    $scope.imageCount.push(minLimit);
    minLimit = minLimit + 1;
    counter++;
    if (minLimit === 6) {
      minLimit = 0;
      counter = minLimit;
    }
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  $scope.itemDropped = function (dragItem) {
    if ($(dragItem).isInside('.table-container')) {
      angular.element('.square').css({'z-index': zIndex1 + 2});
    } else {
      dragItem.goHome();
    }
  };

  $scope.itemBadlyDropped = function (item) {
    item.goHome();
  };

  $scope.onNumberClick = function ($event, num) {
    if ($scope.flag === -1) {
      if (num === 'backspace') {
        value = value.substring(0, value.length - 1);
      } else {
        value = value.length <= 1 ? value + '' + num : value;
      }
    }
    angular.element('#input-1').val(value);
  };

  function redo($event) {
    $event.preventDefault();
    $scope.inputDisabled = false;
    angular.element('#input-1').val('');
    value = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  // For check button click
  function check($event) {
    $event.preventDefault();
    var inputVal = angular.element('#input-1').val();
    if (inputVal) {
      $scope.inputDisabled = true;
      if (parseInt(inputVal) === inputValues[$scope.imageCount]) {
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }
    return false;
  }

}