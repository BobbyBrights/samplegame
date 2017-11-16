export default function dragTypeController($scope, $state, $stateParams, $timeout, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'drag-type.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.capacity.types.drag-type');

  var questionData   = gameData.home.question;
  var dragGroup      = questionData.dragGroup;
  var dropZoneLeft   = questionData.dropZoneLeft;
  var dropCount      = 0;
  // number of drops created.
  var nbDrop         = questionData.numberOfDrops;
  var animationDelay = questionData.animationDelay;

  $scope.count              = 0;
  $scope.header             = gameData.home.header;
  $scope.questionText       = questionData.hint.text;
  $scope.dragCards          = questionData.dragCards;
  $scope.dropZoneLeft       = dropZoneLeft;
  $scope.groups             = dragGroup[0];
  $scope.fillImage          = questionData.fillImage;
  $scope.container          = questionData.container;
  $scope.coverBox           = questionData.coverBox;
  $scope.coverSize          = questionData.coverSize;
  $scope.coverPosition      = questionData.coverPosition;
  $scope.imageBox           = questionData.imageBox;
  $scope.imagesSize         = questionData.imagesSize;
  $scope.leftImagesPosition = questionData.leftImagesPosition;
  $scope.menu               = _.cloneDeep(gameData.menu);
  $scope.tickImage          = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.fillWaterContainer = RequireImages.get($scope.getImageContext(), questionData.fillWaterContainer);

  //Initialize next button click
  $scope.next        = next;
  // click play and start rain and fill container
  $scope.playButton  = playButton;
  // Droped items count and validate.
  $scope.itemDropped = itemDropped;

  $timeout(function () {
    init();
    // Make it rain
    createRain();
  });

  // Game initialization function
  function init() {
    dropCount           = 0;
    $scope.rainState    = false;
    $scope.dropZoneLeft = dropZoneLeft;
    $('.drag-item').css({'pointer-events': 'auto'});
    angular.element('#tick').css('visibility', 'hidden');    
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    $scope.count  = $scope.count === 3 ? 0 : $scope.count + 1;
    $scope.groups = dragGroup[$scope.count];
    setTimeout(function(){
      $('.drag-btn').removeClass('invisible').addClass('fade-in');
    }, 10)
    return false;
  }

  // function to generate a random number range.
  function randRange(minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
  }

// function to generate drops Animation.
  function createRain() {
    for (var i = 1; i < nbDrop; i++) {
      var dropLeft = randRange(0, 90);
      var dropTop  = randRange(0, 20);
      $('.rain').append('<div id="drop' + i + '" class="rain-drop"' +
        ' style="animation-delay:' + animationDelay + 's;"></div>');
      animationDelay = Math.random();
      $('#drop' + i).css({top: dropTop + '%', left: dropLeft + '%'});
    }
  }

  function itemDropped(dragItem, dropZone) {
    dragItem.dropOnto(dropZone);
    dragItem.css({'pointer-events': 'none'});
    dropCount++;
    if (dropCount === 2) {
      angular.element('#tick').css('visibility', 'visible');
    }
  }

  function playButton() {
    $scope.rainState = $scope.rainState === false ? true : false;
  }
}
