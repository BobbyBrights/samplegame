export default function namesController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'names.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.two-d-shapes.types.names');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.signs = RequireImages.get($scope.getImageContext(), questionData.signs);

  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.redo = redo;
  $scope.getAnswer = getAnswer;
  $scope.flag = -1;
  var checkIsEmpty = false,
    count = 0;

  init();


  // Game initialization function
  function init() {
    $scope.images = RequireImages.get($scope.getImageContext(), questionData.images[count]);
    $scope.ButtonLabel = questionData.names;
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    $scope.userInput = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    angular.element('.shapes').removeClass('move-disable');
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    count++;
    if (count === 20) {
      count = 0;
    }
    init();

    return false;
  }

  // For check button click
  function check($event) {
    checkIsEmpty = _.isEmpty($scope.userInput);
    var answer = questionData.answer[count],
      isCorrect = false;

    isCorrect = $scope.userInput === answer;
    if (checkIsEmpty === false) {
      if (isCorrect) {
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
        angular.element('.shapes').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }
    return false;
  }

  function redo($event) {
    $event.preventDefault();
    $scope.userInput = '';
    if ($scope.data.input) {
      $scope.enteredValue = ' ';
    } else {
      $scope.answer = ' ';
    }
    //$scope.answer = ' ';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  function getAnswer(userAnswer) {
    $scope.userInput = userAnswer;
  }
}
