
export default function dragTypeController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'word.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.time.types.word');


  $scope.count             = 0;
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  var questionData    = gameData.home.question,
    dragCards       = questionData.dragCards,
    weatherTexts    = questionData.weatherTexts,
    rangeLimit      = questionData.rangeLimit,
    minLimit        = questionData.minLimit,
    maxLimit        = rangeLimit[$scope.count],
    sunrisePosition = questionData.sunrisePosition,
    sunsetPosition  = questionData.sunsetPosition;

  $scope.header     = gameData.home.header;
  $scope.images     = RequireImages.get($scope.getImageContext(), questionData.images);
  $scope.wordImages = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.question   = questionData;
  $scope.positions  = {left: 17, top: 40};
  $scope.rainState  = false;
  $scope.dragCards  = dragCards[$scope.count];

  //For next button click
  $scope.next             = next;
  $scope.sunAnimation     = sunAnimation;
  $scope.itemDropped      = itemDropped;
  $scope.itemBadlyDropped = itemBadlyDropped;

  init();

  // Game initialization function
  var dropZoneCount = 0;

  function init() {
    $('.weather-text').text('');
    $('#tick,#cross').css('visibility', 'hidden');
    $scope.imagesCount = _.range(minLimit, maxLimit);
    $scope.rainState   = false;
    $scope.hintText    = questionData.hint[$scope.count];
    $scope.dragCards   = dragCards[$scope.count];    
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    dropZoneCount = 0;
    if ($scope.count === 3) {
      $scope.count = 0;
      minLimit     = questionData.minLimit;
      maxLimit     = rangeLimit[$scope.count];
    } else {
      $scope.count++;
      minLimit = maxLimit;
      maxLimit = maxLimit + rangeLimit[$scope.count];
    }
    init();
    return false;
  }


  function sunAnimation(id) {
    var duration    = questionData.duration,
      element     = angular.element('#' + id),
      textElement = angular.element('#text' + id);
    if (id === 'sun0') {
      moveSun(element, sunrisePosition[0], sunrisePosition[1], duration, weatherTexts[0], 1,
        textElement, 'move-enable', 'move-disable');
    } else if (id === 'sun1') {
      moveSun(element, sunsetPosition[0], sunsetPosition[1], duration, weatherTexts[1], 0.3,
        textElement, 'move-enable', 'move-disable');
    } else if (id === 'cloud') {
      $scope.rainState = ($scope.rainState === false) ? true : false;
      angular.element('#cloud-text').text(weatherTexts[2]);
    }
  }

  //sun animation
  function moveSun(currentId, left, top, duration, textName, opacity, textElement, removePointer, addPointer) {
    currentId.animate({
      opacity: opacity,
      left: left,
      top: top
    }, duration, function () {
      textElement.text(textName);
      currentId.removeClass(removePointer).addClass(addPointer);
    });
  }

  // function to generate a random number range.
  function randRange(minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
  }

  // number of drops created.
  var nbDrop         = questionData.numberOfDrops,
    animationDelay = questionData.animationDelay;

  // function to generate drops Animation.
  function createRain() {
    for (var i = 1; i < nbDrop; i++) {
      var dropLeft = randRange(0, 90),
        dropTop  = randRange(0, 30);
      $('.rain').append('<div id="drop' + i + '" class="rain-drop" ' +
        'style="animation-delay:' + animationDelay + 's;"></div>');
      animationDelay = Math.random();
      $('#drop' + i).css({top: dropTop + '%', left: dropLeft + '%'});
    }
  }

  setTimeout(function () {
    init();
    // Make it rain
    createRain();
  });

  function itemDropped(dragItem, dropZone) {
    dropZoneCount++;
    dragItem.dropOnto(dropZone);
    dragItem.css({'pointer-events': 'none'});
    if (dropZoneCount === 2) {
      $('#cross').css('visibility', 'hidden');
      $('#tick').css('visibility', 'visible');
      dropZoneCount = 0;
    }
  }

  function itemBadlyDropped(dragItem) {
    dragItem.goHome();
  }

}