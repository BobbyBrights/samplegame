export default function pythonPatternsController($scope, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'python-patterns';
  $scope.flag = true;

  var questionData    = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header       = gameData.home.header;

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.images = RequireImages.get(imageContext, questionData.images);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.menu = _.cloneDeep(gameData.menu);

  $scope.sign          = RequireImages.get(imageContext, questionData.sign);
  $scope.questionHead  = questionData.questionText.text;
  $scope.next          = next;
  $scope.check         = check;
  $scope.onNumberClick = onNumberClick;
  $scope.inputClick    = inputClick;
  $scope.buttons       = _.range(0, 10);
  $scope.getScoreboard = getScoreboard;
  $scope.redo = redo;

  var answers = [];

  init();
  
  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  //Disable special characters and alphabets
  function disableCharacter() {
    $timeout(function () {
      $('input').on('keydown', function (event) {
        var regex = new RegExp('^[]+$');
        var key   = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
      });
    });
  }

  function init() {
    var min       = 1,
        max       = 15,
        noOfCount = 7,
        nextStart = _.random(min, max),
        numbers   = _.range(nextStart, nextStart + noOfCount);

    $scope.inputDisabled = false;

    angular.element('.action-btn').css({'pointer-events': 'auto'});
    $scope.currentInput = 0;
    $scope.numbers      = {
      left : _.take(numbers, 4),
      right: _.takeRight(numbers, 3)
    };
    disableCharacter();
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  //check if answer is correct
  function isCorrect() {

    $('.python-patterns-page .input').each(function (k, o) {
      var val = $(o).val();
      if (val !== '') {
        answers.push(parseInt(val));
      }
    });
    if(answers.length === 3) {
      $scope.inputDisabled = true;
    }
    return (answers.length === 3) ?
      ($scope.numbers.right).every(function (element, index) {
        return element === answers[index];
      }) : false;
  }

  function redo($event) {
    $event.preventDefault();
    $scope.inputDisabled = false;
    angular.element('input').val('');
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  //Check button click functionality
  function check($event) {
    $event.preventDefault();
    if (isCorrect()) {
      $scope.flag = 1;
      angular.element('.check-btns').addClass('move-disable');      
      angular.element('.action-btn').css({'pointer-events': 'none'});
      $scope.scoreboard.upBy();
    } else {
      if (answers.length === 3) {
        $scope.flag = 0;
      }
    }
    answers = [];
  }

  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function onNumberClick($event, num) {
    if($scope.flag !== -1) return;

    var inputBox = $('#input-' + $scope.currentInput),
        clickedInput = $(inputBox),
        count = _.trim(clickedInput.val() || '');

    if (num === 'backspace') {
      count = count.substring(0, count.length - 1);
    } else {
      count = count.length < 2 ? count + '' + num : count;
    }
    clickedInput.val(count);
  }

  function inputClick(index) {
    $scope.currentInput = index;
  }
}
