export default function fruitController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'fruit.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.data-graphs.types.fruit');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.questionLabel = questionData.label;
  $scope.header = gameData.home.header;
  $scope.flag = true;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.imageNames = questionData.imageNames;
  $scope.iconImages = RequireImages.get($scope.getImageContext(), questionData.fruitImages);
  $scope.grid = RequireImages.get($scope.getImageContext(), questionData.gridImage);
  $scope.sign       = RequireImages.get($scope.getImageContext(), questionData.sign);

  var click = 0,
    value = '',
    numbersOfImage,
    inputIndex = null;

  $scope.numberOfInputs = _.range(0, 4);
  $scope.inputs = [];

  //For check/next/onNumber button click
  $scope.next = next;
  $scope.check = check;
  $scope.onNumberClick = onNumberClick;
  $scope.redo = redo;

  init();

  // Game initialization function
  function init() {
    $scope.inputDisabled=false;
    angular.element('.action-btn').css({'pointer-events': 'auto'});
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    inputIndex = null;
    $scope.inputs.length = 0;
    displayIcons();
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  $scope.inputClick = function (index) {
    value = '';
    click = 0;
    inputIndex = index;
  };

  function onNumberClick($event, num) {
    if (value.length <= 1) {
      value = value + num;
    }
    else {
      value = value;
    }
    angular.element('#input' + inputIndex).val(value);
    $scope.inputs[inputIndex] = value;
    click++;
  }

  function displayIcons() {
    numbersOfImage = _.take(_.shuffle(_.range(1, 11)), 4);
    $scope.iconImagesNumbers = [];
    for (var i = 0; i < numbersOfImage.length; i++) {
      $scope.iconImagesNumbers.push($scope.getRandomValues(numbersOfImage[i], i, $scope.iconImages));
    }
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function redo($event) {
    $event.preventDefault();
    console.log('redo clicked');
    angular.element('input').val('');
    value = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }


  // For check click
  function check($event) {
    $event.preventDefault();

    var answer = 0;
    if ($scope.inputs.length === 4) {
      for (var i in $scope.inputs) {
        if (parseInt($scope.inputs[i]) === numbersOfImage[i]) {
          answer++;
        }
      }

      if (answer === numbersOfImage.length) {
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
        angular.element('.action-btn').css({'pointer-events': 'none'});
        $scope.inputDisabled=true;
      } else {
        $scope.flag = 0;
      }
    }
    return false;
  }
  /* Game specific logic and common function for all sub types could be added here */
}