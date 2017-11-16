
export default function frogController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'frog.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.more-count.types.frog');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set image path
  $scope.frogImages = RequireImages.get($scope.getImageContext(), questionData.frogImages);
  $scope.sign = RequireImages.get($scope.getImageContext(), questionData.sign);
  $scope.images = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.checkClass = {tick: 'invisible', cross: 'invisible'};

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  var currentFrog = questionData.frogValue,
      numberCardValue = questionData.numberCardValue,
      currentNumberCard;

  //For next button click
  $scope.next = next;

  //Function to check visibility of tick
  $scope.checkClick = checkClick;

  var counter = 0;
  init();

  // Game initialization function
  function init() {
    $scope.frogs = _.range(0, currentFrog[counter]);
    $scope.frogValue = currentFrog[counter];
    currentNumberCard = numberCardValue[counter];
    counter = (counter === 9) ? 0 : (counter + 1);
    $scope.itemWidth = '100%';
    $scope.itemLeft = '-4%';
    $scope.menu.bottom.numPad.noOfButtons = currentNumberCard;
    $scope.menu = _.merge({}, $scope.menu);
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    angular.element('.action-btn').css({'pointer-events': 'auto'});
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function checkClick($event, getNum) {
    if (parseInt(getNum) === $scope.frogValue) {
      $scope.checkClass = {tick: 'visible', cross: 'invisible'};
      angular.element('.action-btn').css({'pointer-events': 'none'});
    } else {
      $scope.checkClass = {tick: 'invisible', cross: 'visible'};
    }
  }
}
