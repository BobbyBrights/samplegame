export default function inputTypeController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'calendar.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.time.types.calendar');

  var questionData = gameData.home.question;

  $scope.header              = gameData.home.header;
  $scope.questionText        = questionData.timeQuestion.text;
  $scope.hintText            = questionData.hint.text;
  $scope.calenderHeadingHint = questionData.headingHint.text;
  $scope.exampleQuestionHint = questionData.exampleQuestion.text;
  $scope.exampleBottomText   = questionData.exampleBottomText.text;
  $scope.inputDisabled       = false;

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.checkClass        = {tick: 'invisible', cross: 'invisible'};

  $scope.calendarImages = RequireImages.get($scope.getImageContext(), gameData.home.images);

  $scope.buttonLabels         = questionData.names;
  $scope.count                = 0;
  $scope.pinkCirclePositions  = questionData.pinkCirclePositions;
  $scope.greenCirclePositions = questionData.greenCirclePositions;

  var answer      = questionData.answer,
      result      = questionData.result,
      counter     = 0,
      counter1    = 0,
      emptyString = _.toString(null),
      value       = emptyString,
      inputIndex  = null,
      inputValue,
      inputResult;


  //For next button click
  $scope.next          = next;
  $scope.getAnswer     = getAnswer;
  $scope.check         = check;
  $scope.redo          = redo;
  $scope.inputClick    = inputClick;
  $scope.onNumberClick = onNumberClick;

  init();

  // Game initialization function
  function init() {
    value      = emptyString;
    $scope.flag        = -1;
    $scope.pinkCircle  = _.range(counter, counter + 1);
    $scope.greenCircle = _.range(counter1, counter1 + 1);

    counter = counter + 1;

    if (counter > 7) {
      counter1 = counter1 + 1;
    }
    $scope.count++;

    if ($scope.count === 16) {
      $scope.count       = 0;
      counter            = 0;
      counter1           = 0;
      $scope.greenCircle = [0];
      $scope.pinkCircle  = [0];
    }

    angular.element('input').val('');
    angular.element('#input').text('');
    angular.element('.check-btns,.days-button').removeClass('move-disable').addClass('move-enable');
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function getAnswer(userAnswer) {
    inputValue = userAnswer;
    angular.element('#input').text(userAnswer);
  }

  function redo($event) {
    $event.preventDefault();
    value      = emptyString;
    angular.element('input').val('');
    angular.element('#input').text('');
    $scope.inputDisabled = false;
    $scope.flag          = -1;
    angular.element('.check-btns,.days-button').removeClass('move-disable').addClass('move-enable');

    return false;
  }

  function answerCheck(inputValue, array, count) {
    if (inputValue === array[count - 1]) {
      $scope.inputDisabled = true;
      $scope.flag          = 1;

    } else {
      $scope.flag = 0;
    }
    angular.element('.check-btns,.days-button').addClass('move-disable').removeClass('move-enable');
  }

  // For check button click
  function check() {
    inputResult = angular.element('#input-0').val();
    if ($scope.count < 7) {
      answerCheck(inputValue, answer, counter);
    } else {
      counter = 0;
      answerCheck(inputResult, result, counter1);
    }
  }


  function inputClick(index) {
    value      = emptyString;
    inputIndex = index;
  }

  function onNumberClick($event, num) {
    if (num === 'backspace') {
      value = value.substring(0, value.length - 1);
    } else if (value.length <= 3) {
      value = value + emptyString + num;
    }
    else {
      value = value;
    }

    angular.element('input').val(value);
  }
}