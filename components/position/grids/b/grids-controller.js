
export default function gridsController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'grids.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.position.types.grids');

  var questionData = gameData.home.question;
  $scope.pathValues = gameData.home.pathValues;
  $scope.header = gameData.home.header;
  $scope.questionText = questionData.hint.text;



  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  //$scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);
  $scope.gridFirstbug= RequireImages.get($scope.getImageContext(),gameData.home.gridOneBug);
  $scope.grid = RequireImages.get($scope.getImageContext(),gameData.home.gridImage);
  $scope.gridSecondbug = RequireImages.get($scope.getImageContext(),gameData.home.gridTwoBug);
  $scope.dummyDivPositionsOne =gameData.home.dummyDivPositionsOne;
  $scope.dummyDivPositionsTwo =gameData.home.dummyDivPositionsTwo;

  //For more/next button click
  $scope.next = next;
  $scope.counter = 0;

  var count = 0,
    minLimit = 0,
    counter1 = 0,
    bugCnt =0,
    dragimagePositiontwo,
    dragimagePosition,
    dragImageData = gameData.home.dragImageData,
    plainGridImageData = gameData.home.plainGridImageData;


  $scope.counter =0;



  $scope.screens = dragImageData.screens[$scope.counter];
  $scope.hintText = dragImageData.hintText;
  $scope.hintAt = dragImageData.hintAt;
  $scope.direction = gameData.home.question.hint.text;

  $scope.screens1 = plainGridImageData.screens[$scope.counter];


  $scope.imageCount = [];
  $scope.imageCount1 = [];


  var dragImagePositions = gameData.home.dragImagePositions,
    plainGridImagePositions = gameData.home.dragImagePositionsTwo;


  init();

  function initialPosition() {


    if (minLimit === 7)
    {

      $scope.counter = minLimit;
    }
    if (minLimit > 7 && minLimit < 16)
    {

      angular.element('#hintId-second').css({display:'block'});
      angular.element('#hintId-first').css({display:'none'});
      angular.element('#hintId-first-put').css({display:'none'});
      angular.element('#hintId-first-at').css({display:'none'});
      angular.element('.direction').css({top:'31%'});

      $scope.imageCount1.push(counter1);
      $scope.screens1 = dragImageData.screens[bugCnt];
      bugCnt = bugCnt+1;
      minLimit = minLimit + 1;
    }
    else
    {

      $scope.imageCount.push(count);
      $scope.screens = plainGridImageData.screens[minLimit];

      minLimit = minLimit + 1;
    }
    $scope.counter++;


  } //function end



  // Game initialization function
  function init(){

    initialPosition();

    $scope.group = ($scope.counter < 8) ? [7,22,10,19,20,14,15] : [31,32,33,34,35,36,37];
    $scope.groupsecond = ($scope.counter < 8) ? [31,32,33,34,35,36,37] : [31,32,33,34,35,36,37];

    if (minLimit === 16) {
      console.log('Clear22222266666666');
      angular.element('#hintId-second').css({display:'none'});
      angular.element('#hintId-first').css({display:'block'});
      angular.element('#hintId-first-put').css({display:'block'});
      angular.element('#hintId-first-at').css({display:'block'});
      angular.element('.direction').css({top:'14%'});
      $scope.imageCount1 = [];
      $scope.imageCount = [0];
      minLimit = 1;
      count = 0;
      counter1 = 0;
      bugCnt =0;
      $scope.counter = 0;
    } else
      {


      if (minLimit > 1 && minLimit <= 8)
      {



        dragimagePosition = dragImagePositions[count].split(',');
         angular.element('#bug-image' + count).css({
          left: parseInt(dragimagePosition[0])+'%',
          top: parseInt(dragimagePosition[1])+'%', marginTop: '0%'
        });
        count++;

      }
      if(minLimit===9)
      {
        console.log('Clear');
        $scope.imageCount = 0;
        $scope.imageCount1 = [0];
        count = 0;
      }
        if (minLimit > 9 && minLimit < 18)
      {

        console.log('counter----'+counter1);
        dragimagePositiontwo = plainGridImagePositions[counter1].split(',');
        angular.element('#bug-image-two' + counter1).css({
          left: parseInt(dragimagePositiontwo[0])+'%',
          top: parseInt(dragimagePositiontwo[1])+'%', marginTop: '0%'

        });
        counter1++;
        console.log( counter1);
      }
    }

  }



// For more button click
function next($event) {
  $event.preventDefault();

  init();

  return false;
}


  $scope.itemDropped = function (dragItem, dropzone) {


    dragItem.dropOnto(dropzone);

  };



}
