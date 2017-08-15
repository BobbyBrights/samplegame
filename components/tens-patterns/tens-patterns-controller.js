export default function tensPatternsController($scope, $timeout, $stateParams, GameData, RequireImages) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'tens-patterns';

  var questionData = gameData.home.question;
  $scope.header    = gameData.home[0];
  $scope.questionText = questionData.hint.text;
  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.images = RequireImages.get(imageContext, gameData.home.images);

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.menu = _.cloneDeep(gameData.menu);

  //$scope.menu.right.icon = RequireImages.get(imageContext, gameData.menu.right.icon);
  $scope.numberLine = RequireImages.get(imageContext, questionData.lineImages.numberLine);
  $scope.dottedLine = RequireImages.get(imageContext, questionData.lineImages.dottedLine);
  $scope.sign = RequireImages.get(imageContext, questionData.sign);

  $scope.hintLabel = questionData.hintLabel;
  $scope.disability = questionData.disability;

  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.hide = hide;
  $scope.Clear = Clear;
  $scope.changePattern = changePattern;

  var pattern = 10,
    minValue = 0,
    maxValue = 4,
    totalInputs = 7,
    randomNumber,
    numbers = [],
    label = questionData.label;

  $scope.userInputs = [];
  $scope.counter = 0;
  $scope.label = label[1];
  $scope.numberOfInputs = _.range(0, 7);
  $scope.text = 'Clear';
  $scope.showLine = false;
  $scope.getSketchPad = getSketchPad;
  $scope.onNumberClick = onNumberClick;
  $scope.inputClick    = inputClick;
  $scope.buttons       = _.range(0, 10);
  $scope.getScoreboard = getScoreboard;

  $timeout(function () {
    $('input').on('keypress', function (event) {
      var regex = new RegExp('^[0-9]+$'),
        key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });
  });

  init();

  // Game initialization function
  function init() {
    getInputSequence();
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    angular.element('.input-item').removeClass('move-disable');
    $scope.header = gameData.home.header[$scope.counter];
/*    if ($scope.counter === 1) {
      angular.element('.page-title').addClass('title-two');
    }
    else if ($scope.counter === 2) {
      angular.element('.page-title').addClass('title-three').removeClass('title-two');
    }
    else {
      angular.element('.page-title').removeClass('title-three');
    }*/
  }

  function getInputSequence() {
    randomNumber = parseInt(_.take(_.shuffle(_.range(minValue, maxValue)), 1)) * pattern;
    for (var i = 1; i <= totalInputs; i++) {
      numbers[i - 1] = randomNumber + (i * pattern);
    }
    if ($scope.counter === 1) {
      numbers.reverse();
    }
    for (var j = 1; j <= totalInputs; j++) {
      $scope.userInputs[j - 1] = $scope.disability[$scope.counter][j - 1] ? numbers[j - 1] : '';
    }

    $scope.currentInput = 0;
    $scope.numbers      = {
      left : _.take(numbers, 4),
      right: _.takeRight(numbers, 3)
    };
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  //check if answer is correct
  function isCorrect() {

    $('.tens-patterns-page .input').each(function (k, o) {
      var val = $(o).val();
      if (val !== '') {
        answers.push(parseInt(val));
      }
    });
    return (answers.length === 3) ?
      ($scope.numbers.right).every(function (element, index) {
        return element === answers[index];
      }) : false;
  }

  function check($event) {
    $event.preventDefault();
    /*var checkCount = 0,
      answer,
      wrong = 0;
    for (var i = 0; i < totalInputs; i++) {
      if ($scope.userInputs[i] === '') {
        wrong++;
      }
      answer = parseInt($scope.userInputs[i]);
      if (numbers[i] === answer) {
        checkCount++;
      }
    }

    if (checkCount === totalInputs) {
      $scope.checkClass = {tick: 'visible', cross: 'invisible'};
      angular.element('.input-item').addClass('move-disable');
    }
    else {
      if (wrong !== 3) {
        $scope.checkClass = {tick: 'invisible', cross: 'visible'};
      } else {
        $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
      }
    }
    return false;*/
    if (isCorrect()) {
      $scope.checkClass = {tick: 'visible', cross: 'invisible'};
      $scope.scoreboard.upBy();
    } else {
      if (answers.length === 3) {
        $scope.checkClass = {tick: 'invisible', cross: 'visible'};
        //$scope.flag = 0;
      }
    }
    answers = [];
  }

  /*Functionality for change pattern of Number display */
  function changePattern($event) {
    $event.preventDefault();
    init();
    $scope.counter++;
    if ($scope.counter === 3) {
      $scope.counter = 0;
    }

  }

  function hide($event) {
    $event.preventDefault();
    $scope.showLine = ($scope.showLine === false) ? true : false;
    $scope.label = ($scope.showLine === false) ? label[1] : label[0];
    return false;
  }

  function getSketchPad(sketchPad) {
    $scope.sketchPad = sketchPad;
  }

  // link the new button with newCanvas() function
  function Clear() {
    if ($scope.sketchPad) {
      $scope.sketchPad.clear();
    }
  }

  function onNumberClick($event, num) {
    var inputBox = $('#input-' + $scope.currentInput);
    var count = _.trim($(inputBox).val() || '');
    if (count.length < 2) {
      count = count + '' + num;
    }
    $(inputBox).val(count);
  }

  function inputClick(index) {
    $scope.currentInput = index;
  }

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }
}
