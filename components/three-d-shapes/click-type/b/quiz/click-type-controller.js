export default function clickTypeController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'quiz.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
      $stateParams.category + '.games.three-d-shapes.types.quiz'),
    count = 0,
    shapeNames,
    questionData = gameData.home.question,
    headingShapeText = questionData.headingShapeText,
    checkIsEmpty = false;


  $scope.header = gameData.home.header;
  $scope.questionText = questionData.hint.text;
  $scope.footer = gameData.home.footer.text;
  $scope.correctAnswer = questionData.correctAnswer;


  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.buttonImages = RequireImages.get($scope.getImageContext(), questionData.questionImages);

  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.redo = redo;

  init();


  // Game initialization function
  function init() {
    (count === 9) ? count = 0 : count++; // jshint ignore:line
    $scope.headingShapeText = headingShapeText[count];
    $scope.shapeNames = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  // For shapes click
  $scope.onShapesClick = function ($event) {
    if($scope.flag === -1){
      $scope.shapeNames = $event.target.id;
      shapeNames = $scope.shapeNames;
    }
  };

  // For redo button click
  function redo($event) {
    $event.preventDefault();
    $scope.shapeNames = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  // For check button click
  function check($event) {
    $event.preventDefault();
    checkIsEmpty = _.isEmpty($scope.shapeNames);
    if (checkIsEmpty === false){
      if ($scope.shapeNames === $scope.correctAnswer[count]) {
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }
    return false;
  }
}

