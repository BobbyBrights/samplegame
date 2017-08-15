export default function fruitController($scope, $state, $stateParams, GameData, RequireImages,$timeout) {
  'ngInject';

  $scope.gamePageView = 'fruit.b';

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

  //For more/next button click
  var click = 0,
    value = '',
    numbersOfImage,
    inputIndex = null;

  $scope.numberOfInputs = _.range(0, 4);
  $scope.inputs = [];
  $scope.count=0;

  $scope.next = next;
  $scope.check = check;
  $scope.onNumberClick = onNumberClick;
  $scope.getScoreboard = getScoreboard;
  $scope.redo = redo;

  init();

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  //Disable special characters and alphabets
  function disableCharacter() {
    $timeout(function () {
      $('input').on('keypress', function (event) {
        var regex = new RegExp('^[]+$');
        var key   = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
      });
    });
  }
  // Game initialization function
  function init() {
    $scope.count=0;
    inputIndex = null;
    $scope.inputs.length = 0;
    displayIcons();
    disableCharacter();
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  function redo($event) {
    $event.preventDefault();
    console.log('redo clicked');
    angular.element('input').val('');
    //value = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
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

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  // For more check click
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
        $scope.count++;
       // alert('Correct');
        $scope.flag = 1;
        if($scope.count===1) {
          $scope.scoreboard.upBy();
        }
      } else {
        //alert('Incorrect');
        $scope.flag = 0;
      }
    }
    return false;
  }

}
