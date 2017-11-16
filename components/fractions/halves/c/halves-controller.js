export default function halvesController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'halves.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.fractions.types.halves');

  var questionData = gameData.home.question;
  //$scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set image path
  // $scope.halvesImages = RequireImages.get($scope.getImageContext(), gameData.home.images);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
 // $scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);

  $scope.firstGame = RequireImages.get($scope.getImageContext(), questionData.image.firstGame);
  $scope.sign = RequireImages.get($scope.getImageContext(), questionData.image.sign);
  $scope.icons = RequireImages.get($scope.getImageContext(), questionData.icon);
  $scope.halve = RequireImages.get($scope.getImageContext(), questionData.icon.gameIcon);
  $scope.wingImages = RequireImages.get($scope.getImageContext(), questionData.image.wings);

  var subGameTwo = RequireImages.get($scope.getImageContext(), questionData.image.secondGame),
    subGameThree = RequireImages.get($scope.getImageContext(), questionData.image.thirdGame),
    subGameFour = RequireImages.get($scope.getImageContext(), questionData.image.fourthGame);


  //For more/next button click
  $scope.next = next;
  $scope.redo = redo;
  $scope.check = check;
  $scope.moreClick = moreClick;
  $scope.validateAnswer = validateAnswer;
  $scope.onNumberClick = onNumberClick;
  $scope.inputClick = inputClick;
  $scope.wingClick = wingClick;

  $scope.counter = 0;
  $scope.questionText = questionData.hint;
  $scope.subTitle = questionData.subTitle.text;
  $scope.currentInput = 0;
  $scope.flag = -1;
  $scope.inputDisabled = false;
  $scope.getScoreboard = getScoreboard;

  var nextImage = 0,
    value = '';

  // Game initialization function
  function init() {
    angular.element('#tick,#cross').addClass('invisible');
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    angular.element('#input-0').val('');
    disableCharacter();
    $scope.inputDisabled = false;
    $scope.userAnswer = '';
    $scope.flag = -1;
    $scope.counter++;
    $scope.scoreboard.reset();
    value = '';
    nextImage = 0;
    if ($scope.counter === 4) {
      $scope.counter = 0;
      butterfly();
    }
    if ($scope.counter === 1) {
      updateView(nextImage);
    }

    if ($scope.counter === 2) {
      updateViewOne(nextImage);
    }

    if ($scope.counter === 3) {
      updateViewTwo(nextImage);
    }
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  //halves first game
  function butterfly() {
    var targetElement;
    $timeout(function () {
      angular.element('#butterfly').bind('click', function ($event) {
        var parentElement = angular.element(angular.element($event.target).parent()).parent().attr('id'),
          element = angular.element($event.target).parent();
        if (angular.element(targetElement).parent().attr('id') === parentElement) {
          angular.element('#' + parentElement + '-black').toggleClass('invisible');
        } else {
          angular.element('#' + parentElement + '-black').toggleClass('invisible');
        }
        targetElement = element;
      });
    });
  }

  // halves second game
  function updateView() {
    angular.element('#tick,#cross').addClass('invisible');
    var halveSecondSubtype = questionData.halveSecondSubtype[nextImage];
    $scope.leftImage = subGameTwo[halveSecondSubtype[0]];
    $scope.rightImage = subGameTwo[halveSecondSubtype[1]];
  }

  function moreClick() {
    angular.element('#input-0').val('');
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    value='';
    $scope.flag = -1;
    disableCharacter();
    $scope.inputDisabled = false;
    nextImage++;
    if (nextImage === 13 && $scope.counter === 1) {
      nextImage = 0;
    }
    if ($scope.counter === 1) {
      updateView(nextImage);
    }
    if (nextImage === 15 && $scope.counter === 2) {
      nextImage = 0;
    }
    if (nextImage === 15 && $scope.counter === 3) {
      nextImage = 0;
    }
    if ($scope.counter === 2) {
      updateViewOne(nextImage);
    }
    if ($scope.counter === 3) {
      updateViewTwo(nextImage);
    }
  }

  // halves third game
  function updateViewOne(nextImage) {
    angular.element('#tick,#cross').addClass('invisible');
    var halveThirdSubtype = questionData.halveThirdSubtype[nextImage];
    $scope.leftImage = subGameThree[halveThirdSubtype[0]];
    $scope.rightImage = subGameThree[halveThirdSubtype[1]];
  }

  // halves fourth game
  function updateViewTwo(nextImage) {
    angular.element('#tick,#cross').addClass('invisible');
    var halveFourthSubtype = questionData.halveFourthSubtype[nextImage];
    $scope.leftImage = subGameFour[halveFourthSubtype[0]];
    $scope.thirdSubtypeText = questionData.halveThirdSubtypeText[nextImage];
  }

  function validateAnswer(value) {
    angular.element('#tick,#cross').addClass('invisible');
    var answerValues = questionData.answers[$scope.counter],
      answers = answerValues[nextImage];
    if (answers === value) {
      $scope.scoreboard.upBy();
      angular.element('#tick').removeClass('invisible').addClass('visible');
    }
    else {
      angular.element('#cross').removeClass('invisible').addClass('visible');
    }
  }

  function inputClick(index) {
    $scope.currentInput = index;
  }

  function onNumberClick($event, num) {
    if ($scope.flag === -1) {
      if (num === 'backspace') {
        value = value.substring(0, value.length - 1);
      } else {
        value = value.length <= 1 ? value + '' + num : value;
      }
    }
    angular.element('#input-0').val(value);
  }

   function wingClick(id) {
    if(id == 1 ) {
      angular.element('#2').addClass('invisible');
      angular.element('#1').toggleClass('invisible');
    }
    if(id == 3 ){
      angular.element('#4').addClass('invisible');
      angular.element('#3').toggleClass('invisible');
    }
    if(id == 4 ){
      angular.element('#3').addClass('invisible');
      angular.element('#4').toggleClass('invisible');
    }
    if(id == 2 ) {
      angular.element('#1').addClass('invisible');
      angular.element('#2').toggleClass('invisible');
    }
    if(id == 5 || id == 6 ) {
      angular.element('#' + id).toggleClass('invisible');
    }
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
      if (inputVal === $scope.thirdSubtypeText/2) {
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

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

}
