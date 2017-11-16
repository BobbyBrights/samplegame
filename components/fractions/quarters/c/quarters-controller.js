export default function quartersController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'quarters.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.fractions.types.quarters');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set image path
  // $scope.quartersImages = RequireImages.get($scope.getImageContext(), gameData.home.images);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  // $scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);

  // $scope.nextButterfly = RequireImages.get($scope.getImageContext(), questionData.image.nextButterfly);
  $scope.subGameFirst = RequireImages.get($scope.getImageContext(), questionData.image.firstGame);
  $scope.sign = RequireImages.get($scope.getImageContext(), questionData.image.sign);
  $scope.icons = RequireImages.get($scope.getImageContext(), questionData.icon);

  var subGameTwo = RequireImages.get($scope.getImageContext(), questionData.image.secondGame),
    subGameThree = RequireImages.get($scope.getImageContext(), questionData.image.thirdGame);

  //For more/next button click
  $scope.next = next;
  $scope.redo = redo;
  $scope.check = check;
  $scope.moreClick = moreClick;
  $scope.validateAnswer = validateAnswer;
  $scope.squareClick = squareClick;
  $scope.circleClick = circleClick;
  $scope.onNumberClick = onNumberClick;
  $scope.inputClick = inputClick;
  $scope.getScoreboard = getScoreboard;

  $scope.counter = 0;
  $scope.flag = -1;
  $scope.inputDisabled = false;
  $scope.questionText = questionData.hint;
  $scope.subTitle = questionData.subTitle.text;

  var nextImage = 0,
    value = '';

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // Game initialization function
  function init() {
    angular.element('#tick,#cross').addClass('invisible');
    $scope.counter++;
    $scope.inputDisabled = false;
    $scope.flag = -1;
    $scope.scoreboard.reset();
    nextImage = 0;
    if ($scope.counter === 3) {
      $scope.counter = 0;
    }
    if ($scope.counter === 1) {
      updateView(nextImage);
    }

    if ($scope.counter === 2) {
      updateViewOne(nextImage);
    }
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function updateView(nextImage) {
    angular.element('#tick,#cross').addClass('invisible');
    var quarterSecondSubtype = questionData.quarterSecondSubtype[nextImage];
    $scope.leftImage = subGameTwo[quarterSecondSubtype[0]];
    $scope.rightImage = subGameTwo[quarterSecondSubtype[1]];
  }

  function moreClick() {
    nextImage++;
    value = '';
    angular.element('#input-0').val('');
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    $scope.inputDisabled = false;
    $scope.flag = -1;
    if (nextImage === 14 && $scope.counter === 1) {
      nextImage = 0;
    }
    if ($scope.counter === 1) {
      updateView(nextImage);
    }
    if (nextImage === 15 && $scope.counter === 2) {
      nextImage = 0;
    }
    if ($scope.counter === 2) {
      updateViewOne(nextImage);
    }

  }

  // quarters third game
  function updateViewOne() {
    angular.element('#tick,#cross').addClass('invisible');
    var quarterThirdSubtype = questionData.quarterThirdSubtype[nextImage];
    $scope.leftImage = subGameThree[quarterThirdSubtype[0]];
    $scope.rightImage = subGameThree[quarterThirdSubtype[1]];
    $scope.thirdSubtypeText = questionData.quarterThirdSubtypeText[nextImage];
  }

  function validateAnswer(value) {
    angular.element('#tick,#cross').addClass('invisible');
    var answerValues = questionData.answers[$scope.counter],
      answers = answerValues[nextImage];
    if (answers === value) {
      angular.element('#tick').removeClass('invisible').addClass('visible');
    }
    else {
      angular.element('#cross').removeClass('invisible').addClass('visible');
    }
  }

  function squareClick(input) {
    switch (input) {
      case 1 :
        angular.element('#red-butterfly2 ,#red-butterfly3,#red-butterfly4').addClass('invisible');
        angular.element('#red-butterfly1').toggleClass('invisible');
        break;
      case 2:
        angular.element('#red-butterfly1 ,#red-butterfly3,#red-butterfly4').addClass('invisible');
        angular.element('#red-butterfly2').toggleClass('invisible');
        break;
      case 3:
        angular.element('#red-butterfly1 ,#red-butterfly2,#red-butterfly4').addClass('invisible');
        angular.element('#red-butterfly3').toggleClass('invisible');
        break;
      case 4:
        angular.element('#red-butterfly1 ,#red-butterfly2, #red-butterfly3').addClass('invisible');
        angular.element('#red-butterfly4').toggleClass('invisible');
        break;
      default:
        break;
    }
  }

  function circleClick(input) {
    switch (input) {
      case 1 :
        angular.element('#blackWhiteButterfly2, #blackWhiteButterfly3, #blackWhiteButterfly4').addClass('invisible');
        angular.element('#blackWhiteButterfly1').toggleClass('invisible');
        break;
      case 2:
        angular.element('#blackWhiteButterfly1, #blackWhiteButterfly3, #blackWhiteButterfly4').addClass('invisible');
        angular.element('#blackWhiteButterfly2').toggleClass('invisible');
        break;
      case 3:
        angular.element('#blackWhiteButterfly1, #blackWhiteButterfly2, #blackWhiteButterfly4').addClass('invisible');
        angular.element('#blackWhiteButterfly3').toggleClass('invisible');
        break;
      case 4:
        angular.element('#blackWhiteButterfly1, #blackWhiteButterfly2, #blackWhiteButterfly3').addClass('invisible');
        angular.element('#blackWhiteButterfly4').toggleClass('invisible');
        break;
      default:
        break;
    }
  }

  function inputClick(index) {
    $scope.currentInput = index;
  }

  function onNumberClick($event, num) {
    var inputBox = $('#input-' + $scope.currentInput);
    var count = _.trim($(inputBox).val() || '');
    if (count.length < 2) {
      count = count + '' + num;
    }
    $(inputBox).val(count);
  }

  function redo($event) {
    $event.preventDefault();
    $scope.inputDisabled = false;
    angular.element('#input-0').val('');
    value = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  // For check button click
  function check($event) {
    $event.preventDefault();
    var inputVal = angular.element('#input-0').val();
    if (inputVal) {
      $scope.inputDisabled = true;
      inputVal = parseInt(inputVal);
      if (inputVal === $scope.thirdSubtypeText / 4) {
        $scope.flag = 1;
        $scope.scoreboard.upBy();
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }
    return false;
  }

  function disableCharacter() {
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
  }
}
