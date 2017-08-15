
export default function counterController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'counter.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.more-count.types.counter');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  var rowRange = questionData.rowRange,
    chartText = questionData.chartText.text,
    flag = false,
    visibility,
    chart,
    numberCardValue = [],
    randomNumber;

  // Set image path
  $scope.circleImages = RequireImages.get($scope.getImageContext(), questionData.circles);
  $scope.showHideButton = RequireImages.get($scope.getImageContext(), questionData.showHideButton);
  $scope.sign = RequireImages.get($scope.getImageContext(), questionData.sign);
  $scope.images = RequireImages.get($scope.getImageContext(), gameData.home.images);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.ranger = _.range(1, 101);
  $scope.chartText = chartText.hide;
  $scope.colors = questionData.colors;
  $scope.shadowColors = questionData.shadowColors;
  $scope.checkClass = {tick: 'invisible', cross: 'invisible'};

  //For next button click
  $scope.next = next;

  //Function to check visibility of tick
  $scope.checkClick = checkClick;

  //Function for show-hide button
  $scope.showHideTable = showHideTable;

  $scope.getCircleCount = getCircleCount;

  init();

  // Game initialization function
  function init() {
    numberCardValue = [];
    $scope.counters = _.range(0, rowRange);
    randomNumber = $scope.randomNumber();
    $scope.randomCounters = randomNumber;
    numberCardValue.push(getRandomCardValue(randomNumber - 20, randomNumber));
    console.log(getRandomCardValue(randomNumber - 20, randomNumber));
    numberCardValue.push(getRandomCardValue(randomNumber, randomNumber + 20));
    console.log(getRandomCardValue(randomNumber, randomNumber + 20));
    numberCardValue.push(randomNumber);
    $scope.menu.bottom.numPad.noOfButtons = _.shuffle(numberCardValue);
    $scope.menu = _.merge({}, $scope.menu);
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    angular.element('.action-btn').css({'pointer-events': 'auto'});
  }

  function getCircleCount(i) {
    return Math.floor(i / rowRange);
  }

  function getRandomCardValue(min, max) {

    min = min < 0 ? 1 : (min && max) > 98 ? 80 : min;
    max = max > 100 ? 100 : (min && max) == 1 ? 20 : max;

    var randomArray = _.remove(_.shuffle(_.range(min, max)), function (n) {
      return n !== randomNumber;
    });
    console.log(randomArray);
    return _.take(randomArray, 1)[0];
  }

  //Function for show and hide button
  function showHideTable($event) {
    $('.circle-container').toggleClass('circle-border');
    $event && $event.preventDefault(); // jshint ignore:line
    flag = !flag;

    if (flag) {
      visibility = 'invisible';
      chart = chartText.show;
    } else {
      visibility = 'visible';
      chart = chartText.hide;
    }
    $scope.checkVisibility = visibility;
    $scope.chartText = chart;
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function checkClick($event, getNum) {
    if (parseInt(getNum) === $scope.randomCounters) {
      $scope.checkClass = {tick: 'visible', cross: 'invisible'};
      angular.element('.action-btn').css({'pointer-events': 'none'});
    } else {
      $scope.checkClass = {tick: 'invisible', cross: 'visible'};
    }
  }
}
