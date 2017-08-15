export default function shareCicadasController($scope, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'share-cicadas';

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.treeImage = RequireImages.get(imageContext, gameData.home.question.treeImage);
  $scope.cicadasImage = RequireImages.get(imageContext, gameData.home.question.cicadasImage);
  $scope.dropZones = questionData.dropZones;

  $scope.getImageContext = function () {
    return imageContext;
  };

  $scope.menu = _.cloneDeep(gameData.menu);

  console.log('$scope.menu',$scope.menu);
  //For next button click
  $scope.next = next;
  $scope.itemDropped = itemDropped;
  $scope.itemBadlyDropped = itemBadlyDropped;

  var counter = 0,
    data = {};

  formData();

  init();

  /**
   * Create the all different patterns for the cicadas games
   */
  function formData() {
    var minTypes = 2,
      maxTypes = 4,
      count = 0;

    for (var i = minTypes; i <= maxTypes; i++) {

      var typeTimes = Math.floor(10 / i);

      for (var j = 1; j <= typeTimes; j++) {
        data['type' + count++] = {
          trees: i,
          cicadas: i * j,
          dropZone: (i * j) / i
        };
      }
    }
  }

  function init() {
    $scope.data = data['type' + counter++];

    $('.tree .drop-area.occupied')
      .removeClass('occupied');

    $('.cicadas-box .cicadas.dropped')
      .css({'position': 'initial', 'top': 0, 'left': 0})
      .removeClass('dropped');
    angular.element('.cicadas').removeClass('move-disable');
    showHeading();

    if (counter > 9) {
      counter = 0;
    }
  }

  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function itemDropped(dragItem, dropZone) {

    var emptyZone = $('.drop-area', dropZone).not('.occupied').first();
    if (emptyZone.size() === 0) {
      $(dragItem).css({'position': 'initial'});
      dragItem.goHome();
      return;
    }

    dragItem.dropOnto(dropZone);
    dragItem.addClass('move-disable');
    var dzPos = $(emptyZone).position();
    var treePos = $(dropZone).position();
    var top = treePos.top + dzPos.top,
      left = treePos.left + dzPos.left;

    $(emptyZone).addClass('occupied');

    dragItem
      .addClass('dropped')
      .css({
        top: top,
        left: left,
        position: 'absolute'
      });

    showHeading();
  }

  function itemBadlyDropped(item) {
    item.goHome();
  }

  function showHeading() {
    var hd = 'Share ' + $scope.data.cicadas + ' between ' + $scope.data.trees+ '.';

    var filled = $('.cicadas-box .cicadas.dropped').size();

    if (filled === $scope.data.cicadas) {
      hd = $scope.data.cicadas + ' shared between ' + $scope.data.trees + 
           ' = ' + $scope.data.dropZone;
    }

    $timeout(function () {
      $scope.heading = hd;
    });
  }
}
