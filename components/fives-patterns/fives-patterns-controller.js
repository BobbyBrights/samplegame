export default function fivesPatternsController($scope, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'fives-patterns';

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);
  var questionData = gameData.home.question;

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.questionText = questionData.hint.text;
  $scope.footerText = questionData.footer.text;

  $scope.images = RequireImages.get(imageContext, gameData.home.images);
  $scope.menu = _.cloneDeep(gameData.menu);


  var maxValue = questionData.maxValue,
    minValue = questionData.minValue,
    numberLimit = questionData.numberLimit,
    randomNumber,
    numberRange,
    count = 0,
    label = questionData.label,
    showBtnCount = 0,
    numberSequence;

  $scope.disability = questionData.disability;
  $scope.header = gameData.home.header[count];
  $scope.label = label[1];
  $scope.showLine = false;

  //For next,check,redo,hide button click
  $scope.next = next;
  $scope.check = check;
  $scope.redo = redo;
  $scope.hide = hide;

  $scope.getSketchPad = getSketchPad;
  $scope.clearClick = clearClick;
  $scope.getScoreboard = getScoreboard;
  $scope.inputClick = inputClick;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // Game initialization function
  function init() {
    clearValue();
    $scope.counter = count;
    randomNumber = (Math.floor((Math.random() * maxValue) + minValue)) * 5;
    numberSequence = _.range(randomNumber, randomNumber + 35, 5);
    numberRange = count === 1 ? numberSequence.reverse() : numberSequence;
    $scope.numbers = numberRange;
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    disableCharacter();
  }

  //Disable special characters and alphabets
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

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function inputClick(index) {
    $scope.currentInput = index;
  }

  $scope.onNumberClick = function ($event, num) {
    var inputBox = $('#input-' + $scope.currentInput),
      clickedInput = inputBox,
      count = _.trim(clickedInput.val() || '');

    if (num === 'backspace') {
      count = count.substring(0, count.length - 1);
    } else {
      count = count.length < 2 ? count + '' + num : count;
    }
    clickedInput.val(count);
  };


  // For check button click
  function check($event) {
    $event.preventDefault();
    var checkCount = 0;
    for (var i = 0; i < numberLimit; i++) {
      var answer = angular.element("#input-" + i).val();
      if ($scope.numbers[i] == answer) {
        checkCount++;
      }
    }
    if (checkCount == numberLimit) {
      $scope.flag = 1;
      angular.element('.check-btns').addClass('move-disable');
      $scope.scoreboard.upBy();
    } else {
      $scope.flag = 0;
    }
    return false;
  }

  // For Redo button click
  function redo($event) {
    $event.preventDefault();
    clearValue();
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  // For more button click
  $scope.more = function () {
    count++;
    $scope.scoreboard.reset();
    if (count === 3) {
      count = 0;
      $scope.counter = 0;
    }
    $scope.header = gameData.home.header[count];
    init();
  };

  // getSketchPad function
  function getSketchPad(sketchPad) {
    $scope.sketchPad = sketchPad;
  }

  // link the new button with newCanvas() function
  function clearClick() {
    if ($scope.sketchPad) {
      $scope.sketchPad.clear();
    }
  }

  // For clear values
  function clearValue() {
    for (var i = 0; i < 7; i++) {
      if ($scope.disability[count][i] == false) {
        angular.element("#input-" + i).val('');
      }
    }
  }

  // For hide button click
  function hide($event) {
    $event.preventDefault();
    showBtnCount++;
    $scope.showLine = ($scope.showLine === false);
    $scope.label = ($scope.showLine === false) ? label[1] : label[0];
    if (showBtnCount === 1) {
      angular.element('.scale-one').hide();
      angular.element('.scale-two').show();
    } else {
      showBtnCount = 0;
      angular.element('.scale-one').show();
      angular.element('.scale-two').hide();
    }
    return false;
  }
}
