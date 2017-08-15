
export default function wordsController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'words.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.position.types.words');

  var questionData = gameData.home.question;
  var allImages = gameData.home.caterpillarImages;
  var cntImages = Object.keys(allImages).length;
  $scope.header = gameData.home.header;
  $scope.questionText = questionData.hint.text;
  $scope.questionLable = questionData.label.text;

  // Set image path
   $scope.wordsImages = RequireImages.get($scope.getImageContext(),gameData.wordImages);
   $scope.caterpillarImages = RequireImages.get($scope.getImageContext(),gameData.home.caterpillarImages);
   $scope.caterpillarQuestion = gameData.home.dragItems;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  //$scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);

  $scope.dragItems     = questionData.dragItems;
  $scope.dragPositions = questionData.dragPositions;
  $scope.signs         = RequireImages.get($scope.getImageContext(),questionData.sign);
  $scope.cross         = RequireImages.get($scope.getImageContext(),questionData.cross);


  //For more/next button click
     $scope.next           = next;
     $scope.itemBadlyDropped = itemBadlyDropped;
     $scope.resetDragItems = resetDragItems;


   var maxValue = questionData.maxValue,
       minValue = questionData.minValue,
       dropCount = 0,
       counter  = minValue;

  init();

  // Game initialization function
  function init(){

    $('.drag-item').css({'pointer-events': 'auto'});
    angular.element('#button-drag-0').css({left: '30.6%', top: '112.5%'});
    angular.element('#button-drag-1').css({left: '50.9%', top: '112.5%'});

    $scope.groups   = counter % maxValue === 0 ? [1, 0] : [0, 1];
    console.log('$scope.groups', $scope.groups);
    $scope.boxCount = _.range(counter,counter+1,1);
    counter++;
    if(counter === cntImages) { counter = 0;}

    //resetDragItems();

  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    setTimeout(function(){
      $('.drag-btn').removeClass('invisible').addClass('fade-in');
    }, 10)
    return false;
  }


  function resetDragItems() {

    for (var i = 0; i < $scope.dragItems.length; i++) {
      var dragId        = angular.element('#drag' + i),
        dragPositions = $scope.dragPositions[i].split(','),
        dragLeft      = parseInt(dragPositions[0]),
        dragTop       = parseInt(dragPositions[1]);

      dragId.css({position: 'absolute', left: dragLeft + '%', top: dragTop + '%'});
      dragId.removeClass('move-disable').addClass('move-enable');
      angular.element('#tick').css('visibility', 'hidden');

    }


  }


  $scope.itemDropped = function (dragItem, dropZone) {

    // Droped items count and validate.

    dragItem.dropOnto(dropZone);
    if (dropCount%2 === 1) {

      angular.element('#tick').css('visibility', 'visible');
    }

    dropCount++;
  };
  function itemBadlyDropped(item) {

    item.goHome();
  }



}
