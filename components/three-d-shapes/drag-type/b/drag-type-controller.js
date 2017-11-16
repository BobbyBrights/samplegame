
export default function dragTypeController($scope, $state, $stateParams, GameData) {
  'ngInject';

  $scope.gamePageView = 'drag-type.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.three-d-shapes.types.drag-type');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;

  // Set image path

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);

  //For more/next button click
  $scope.next = next;

  init();

  // Game initialization function
  function init(){
  }

  // For more button click
  function next($event) {
    $event.preventDefault();

    init();

    return false;
  }

  /*
  // For more button click
  function reset($event) {
    $event.preventDefault();
    return false;
  }

  // For more button click
  function check($event) {
    $event.preventDefault();
    return false;
  }
  */

  /* Game specific logic and common function for all sub types could be added here */

}
