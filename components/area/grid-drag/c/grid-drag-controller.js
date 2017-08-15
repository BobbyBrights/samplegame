
export default function gridDragController($scope, $state, $stateParams, GameData, RequireImages,$timeout) {
  'ngInject';

  $scope.gamePageView = 'grid-drag.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.area.types.grid-drag');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.stampHint = questionData.stampHint.text;
  $scope.header = gameData.home.header;

  // Set image path
  $scope.stampImages = RequireImages.get($scope.getImageContext(), questionData.stampImages);
  $scope.gridImage = RequireImages.get($scope.getImageContext(), questionData.gridImage);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  var inputValues = questionData.inputValues,
    minLimit = 0,
    value = '',
    zIndex1;

  //For next button click
  $scope.next = next;

  //For check button click
  $scope.check = check;
  $scope.redo = redo;
  $scope.reset = reset;
  $scope.getScoreboard = getScoreboard;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

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
    angular.element('#grid').css({left: '61%', top: '3.3%'});
    angular.element('input').val('');
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    $scope.imageCount = [];
    $scope.imageCount.push(minLimit);
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  // For reset button click
  function reset() {
    $scope.scoreboard.reset();
    return false;
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    minLimit = minLimit + 1;

    if (minLimit === 6) {
      minLimit = 0;
      if (minLimit === 0) {
        reset();
      }
    }

    init();
    return false;
  }

  $scope.itemDropped = function (dragItem) {
    if ($(dragItem).isInside('.table-container')) {
      angular.element('#grid').css({'z-index': zIndex1 + 2});
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
        $scope.scoreboard.up();
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }
    return false;
  }

}