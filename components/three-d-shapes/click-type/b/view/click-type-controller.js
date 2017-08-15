
export default function clickTypeController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'view.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.three-d-shapes.types.view');

  var questionData = gameData.home.question,
    hintQuestionText = questionData.hintQuestionText,
    imageNames = [];

 // $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.footer = gameData.home.footer.text;
  $scope.hintQuestionText = hintQuestionText[0],

  // Set image path
  $scope.viewImages = RequireImages.get($scope.getImageContext(), gameData.home.images); // jshint ignore:line
  $scope.buttonImages = RequireImages.get($scope.getImageContext(), questionData.questionImages);
  $scope.sign         = RequireImages.get($scope.getImageContext(), questionData.sign);
  $scope.checkClass = {tick: 'invisible', cross: 'invisible'};

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  //For more/next button click
  $scope.next = next;

  var count = 0;
  init();

  // Game initialization function
  function init(){
    $scope.image = [];
    $scope.image[0] = $scope.viewImages[count];
    imageNames = $scope.viewImages[count].name;
  }

  //For shapes click
  $scope.onShapeClick = function($event){
    $scope.shapeName = $event.target.id;

    if($scope.shapeName === imageNames){
      $scope.checkClass = {tick: 'visible', cross: 'invisible'};
    }else {
      $scope.checkClass = {tick: 'invisible', cross: 'visible'};
    }
  };

  // For more button click
  function next($event) {
    $event.preventDefault();
    count === 8 ? count = 0 : count++;  // jshint ignore:line
    $scope.hintQuestionText = hintQuestionText[count];
    init();
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    return false;
  }
}
