export default function afterController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'after.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.number-ordering.types.after');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  var checkCount = 0;
  // Set image path
  // $scope.afterImages = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.images = RequireImages.get($scope.getImageContext(), gameData.home.images);
  // Set menu icons
  $scope.header        = gameData.home.header;
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  // $scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);

  $scope.chartHelp = questionData.chartHelp;


  $scope.next = next;
  $scope.check = check;
  $scope.inputClick = inputClick;
  $scope.redo = redo;

  $scope.rows = _.range(0, 10);
  $scope.columns = _.take($scope.rows, 10);
  var maxValue = questionData.maxValue,
    minValue = questionData.minValue,
    value = '';

  $scope.getScoreboard = getScoreboard;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  //For more/next button click
  $scope.next = next;
  function disableCharacter() {
    $timeout(function () {
      $('input').on('keypress', function (event) {
        var regex = new RegExp('^[]+$');
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
      });
    });
  }

  init();

  // Game initialization function
  function init() {
    $scope.flag = -1;
    value = '';
    $scope.inputDisabled = false;
    $scope.randomNumber = Math.floor((Math.random() * maxValue) + minValue);
    $scope.number = (( parseInt($scope.randomNumber / 100)) * 100);
    console.log("$scope.number", $scope.number);
    $scope.rows = _.range($scope.number, $scope.number + 10);
    $scope.columns = _.take($scope.rows, 10);
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    disableCharacter();
  }

  // For more button click
  function next($event) {

    $event.preventDefault();
    angular.element("#input-0").val('');
    init();


    return false;
  }

  $scope.onNumberClick = function ($event, num) {

    if ($scope.flag === -1) {
      if (num === 'backspace') {
        value = value.substring(0, value.length - 1);
      } else {
        value = value.length <= 2 ? value + '' + num : value;
      }
    }
    angular.element('#input-'+$scope.currentInput).val(value);
    /**/
  /*  var inputBox = $('#input-' + $scope.currentInput);
    var count = _.trim($(inputBox).val() || '');
    if (count.length < 3) {
      count = count + '' + num;
    }
    $(inputBox).val(count);*/
  };

  function inputClick(index) {
    $scope.currentInput = index;
  }


  function check($event) {
    $event.preventDefault();
    checkCount = 0;
      var answer = angular.element("#input-0" ).val();
      console.log("answer", answer);
    $scope.inputDisabled = true;
      if (answer === "") {
        return;
      } else {
        if (($scope.randomNumber + 1) === parseInt(answer)) {
          checkCount++;
        }
      }

    if (checkCount === 1) {
      $scope.flag = 1;
      angular.element('.check-btns').addClass('move-disable');
      $scope.scoreboard.upBy();
    } else {
      $scope.flag = 0;
    }
    return false;
  }

  function redo($event) {
    $event.preventDefault();
    value = '';
    if (checkCount === 0) {
      angular.element("#input-0").val('');
      $scope.inputDisabled = false;
    }

    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  /*
   // For more button click
   function reset($event) {
   $event.preventDefault();
   return false;
   }

   // For more button click
   function check($event) {
   $event.preventDefault();
   return false;
   }
   */

  /* Game specific logic and common function for all sub types could be added here */
  // For chart button active
  $scope.activeButton = function (id) {
    angular.element('#' + id).toggleClass('on-focus');
  };
}
