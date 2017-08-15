export default function possumPatternsController($scope, $stateParams, GameData, RequireImages) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'possum-patterns';

  var questionData = gameData.home.question;
  $scope.hintText = questionData.hint.text;
  $scope.headerText = questionData.questionText.text;
  $scope.header = gameData.home.header;

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);
  $scope.getImageContext = function () {
    return imageContext;
  };

  var maxValue = questionData.maxValue,
    minValue = questionData.minValue;

  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.signImage = RequireImages.get(imageContext, questionData.tick);
  $scope.possum = RequireImages.get(imageContext, questionData.possum);


  //For next button click
  $scope.next = next;
  $scope.isDropZone = isDropZone;
  $scope.itemBadlyDropped = itemBadlyDropped;
  $scope.itemDropped = itemDropped;
  $scope.getScoreboard = getScoreboard;
  $scope.circles = questionData.circles;
  $scope.stars = questionData.stars;

  init();

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // Game initialization function
  function init() {
    var randomNumber = Math.floor((Math.random() * maxValue) + minValue),
      numberRange = _.range(randomNumber, randomNumber + 6, 1);

    $scope.numbers = numberRange;
    $scope.dragNumbers = [numberRange[5], numberRange[3], numberRange[4]];
    angular.element('#tick').removeClass('visible').addClass('invisible');
    $('.drop-zone').removeClass('occupied');

    var dragElems = $('.drag-star');
    dragElems.css({'display':'block','margin-top':'-0.5%'});
  }

  // For more button click
  function next($event) {
    $event.preventDefault();

    init();
    return false;
  }

  function isDropZone(num) {
    return num > 2;
  }

  //for drop functionality
  function itemDropped(dragItem, dropZone) {

    var answer = parseInt($(dropZone).get(0).getAttribute('data-number'));
    var colorIndex = parseInt($(dragItem).get(0).getAttribute('data-color'));
    var mathValue = parseInt(_.trim($(dragItem).text()));

    if (answer !== mathValue) {
      dragItem.goHome();
      $(dragItem).css({'position': 'initial'});
      return;
    }

    dragItem.dropOnto(dropZone);
    $scope.$apply(function () {
      $scope.scoreboard.upBy();
    });

    dropZone
      .removeClass(_.join($scope.stars, ' '))
      .addClass('occupied ' + $scope.stars[colorIndex]);

    dragItem.css({
      display: 'none',
      position: 'absolute'
    });

    var occupied = $('.drop-zone.occupied').size();

    //show tick
    if (occupied === 3) {
      angular.element('#tick').removeClass('invisible').addClass('visible');
    }
  }

  function itemBadlyDropped(item) {
    item.goHome();
    $(item).css({'position': 'initial'});
  }
}
