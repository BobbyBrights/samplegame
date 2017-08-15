export default function clickTypeController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'names.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.three-d-shapes.types.names');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.correctAnswer = questionData.correctAnswer;
  $scope.buttons = questionData.buttons;

  // Set image path
  $scope.questionImageNames = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.buttons = questionData.buttons;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.sign         = RequireImages.get($scope.getImageContext(), questionData.sign);
  $scope.checkClass = {tick: 'invisible', cross: 'invisible'};

  //For more/next button click
  $scope.next = next;

  var count = 0,
    buttonNames,
    correctAnswer = $scope.correctAnswer[0];
  init();

  // Game initialization function
  function init() {
    count = 0;
  }

  //For names click
  $scope.onButtonClick = function($event) {
    $scope.buttonNames = $event.target.id;
    buttonNames = $scope.buttonNames;
    if(buttonNames === correctAnswer){
      $scope.checkClass = {tick: 'visible', cross: 'invisible'};
    }else {
      $scope.checkClass = {tick: 'invisible', cross: 'visible'};
    }
  };

  // For more button click
  function next($event) {
    $event.preventDefault();
    count === 18 ? count = 0 : count++;
    $scope.questionImageNames[0] = $scope.questionImageNames[count];
    correctAnswer = $scope.correctAnswer[count];
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    return false;
  }
}
