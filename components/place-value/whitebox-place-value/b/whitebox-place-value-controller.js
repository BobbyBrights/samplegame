export default function whiteboxPlaceValueController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'whitebox-place-value.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.place-value.types.whitebox-place-value');

  var questionData = gameData.home.question;

  $scope.questionText = questionData.hint.text;

  $scope.tensText = questionData.tensText.text;
  $scope.onesText = questionData.onesText.text;
  $scope.header = gameData.home.header;
  $scope.flag = true;


  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.whiteBoxBunch = RequireImages.get($scope.getImageContext(), questionData.whiteBoxBunch);
  $scope.whiteBox = RequireImages.get($scope.getImageContext(), questionData.whiteBox);
  $scope.sign = RequireImages.get($scope.getImageContext(), questionData.sign);

  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.redo = redo;
  $scope.inputClick = inputClick;
  $scope.onNumberClick = onNumberClick;

  var value = '',
    inputIndex = null,
    answers = [];

  $scope.inputs = [];

  init();
  function generateRandomNumber(minLimit, maxLimit) {
    return _.random(minLimit, maxLimit);
  }

  $timeout(function () {
    $('input').on('keydown', function (event) {
      var regex = new RegExp('^[0-9]+$'),
        key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });
  });

  // Game initialization function
  function init() {
    inputIndex = null;
    $scope.inputDisabled = false;
    $scope.inputs.length = 0;
    $scope.result = [];

    $scope.groupOfBlocks = _.range(generateRandomNumber(1, 9));
    $scope.result.push($scope.groupOfBlocks.length);
    $scope.whiteBoxs = _.range(generateRandomNumber(1, 9));
    $scope.result.push($scope.whiteBoxs.length);

    angular.element('.action-btn').css({'pointer-events': 'auto'});
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    $('.input-box').each(function (k, o) {
      $(o).val('');
    });
    angular.element('#input-2').css({'visibility': 'hidden'});
    init();
    return false;
  }

  function isCorrect() {
    answers = [];
    $('.input-box').each(function (k, o) {
      var val = $(o).val();
      if (val !== '') {        
        answers.push(parseInt(val));
      }
    });
    return answers.length === 2 ?
      ($scope.result).every(function (element, index) {
        return element === answers[index];
      }) : false;
  }

  function inputClick(index) {
    if ($scope.flag === -1) {
      value = '';
      inputIndex = index;
    }
  }

  function onNumberClick($event, num) {
    if ($scope.flag !== -1) return;
    var clickedInput = angular.element('#input-' + inputIndex);
    value = clickedInput.val();
    if (num === 'backspace') {
      value = value.substring(0, value.length - 1);
    } else {      
      value = value.length <= 1 ? value + '' + num : value;      
    }
    clickedInput.val(value);
    $scope.inputs[inputIndex] = value;
  }

  // For more button click
  function check($event) {
    $event.preventDefault();
    if (isCorrect()) {
      var answer = (10 * answers[0]) + answers[1];
      angular.element('#input-2').val(answer).css({'visibility': 'visible'});
      $scope.flag = 1;
      angular.element('.check-btns').addClass('move-disable');
      angular.element('.action-btn').css({'pointer-events': 'none'});
    } else {
      if (answers.length === 2) {
        $scope.flag = 0;
      }
    }

    $scope.inputDisabled = $scope.flag !== -1;
  }

  function redo($event) {
    $event.preventDefault();
    $scope.inputDisabled = false;
    angular.element('input').val('');
    value = '';
    $scope.inputs.length = 0;
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }
}