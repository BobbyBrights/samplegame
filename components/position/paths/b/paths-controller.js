
export default function pathsController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'paths.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.position.types.paths');

  var questionData = gameData.home.question,
      pathValues = gameData.home.pathValues,
      messages = gameData.home.message,
      messageIdValues = gameData.home.messageIdValues;



  $scope.hint = questionData.hint.text;
  $scope.start = questionData.start.text;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.direction = gameData.home.directions;
  $scope.directionNumber = gameData.home.directionNumber;
  $scope.directionMessage = gameData.home.directionMessage;
  $scope.counter = -1;





  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  //$scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);
  // Set image path
  $scope.images =  RequireImages.get($scope.getImageContext(), gameData.home.pathImages);

  //For more/next button click
  $scope.next = next;
  init();

  // Game initialization function
  function init(){


    $scope.gridBox =_.range(0, 100);
    $scope.messageBox = _.range(0,($scope.directionMessage).length);

    $scope.counter++;
    $scope.counter = ($scope.counter === 2) ? 0 : $scope.counter;
    changeImages();
  }

  // For more button click
  function next($event) {
    $event.preventDefault();

    init();


    return false;
  }

  $scope.pathClick = function(pIndex)
  {

    if (pathValues[$scope.counter].indexOf(pIndex) >= 0)
    {
      $('#' + pIndex).css({'background-color': '#DEE89F'});
      messageIdValues[$scope.counter].forEach(function (key, value) {
        if (key === pIndex) {
          $scope.message = messages[value];
        }
      });
    } else {
      $('#'+pIndex).css({'background-color': '#AFB494'});
    }

  };

  function changeImages()
  {



    if($scope.counter===0)
    {

      for(var container=0;container<100;container++){

        $('#' +container).css({'background-color': '#8D9468',' border-color':'#60673B'});
        $( '#'+container).addClass('circle-container-two circle-border');
      }

      $('#grid-bottom5,#grid-bottom10,#grid-bottom8,#grid-bottom6').css({'display': 'inline'});
      $('#grid-bottom9,#grid-bottom7,#grid-bottom4,#grid-bottom3').css({'display': 'none'});

      $( '#grid-middle').addClass('counter-container');
      $( '#grid-middle').removeClass('counter-container-two');

      $( '#grid-top').addClass('tree-top');
      $( '#grid-top').removeClass('tree-top-two');

      $( '#grid-bottom1').addClass('tree-bottom');
      $( '#grid-bottom1').removeClass('tree-bottom-two');

      $( '#grid-bottom-start').addClass('path-start');
      $( '#grid-bottom-start').removeClass('path-start-two');

      $( '#grid-bottom-direction').addClass('path-text');
      $( '#grid-bottom-direction').removeClass('path-text-two');



    }
    if($scope.counter===1)
    {
      for(var containertwo=0;containertwo<100;containertwo++){

        $('#' +containertwo).css({'background-color': '#8D9468',' border-color':'#60673B'});
        $( '#'+containertwo).addClass('circle-container-two circle-border');
      }

      $('#grid-bottom5,#grid-bottom10,#grid-bottom8,#grid-bottom6').css({'display': 'none'});
      $('#grid-bottom9,#grid-bottom7,#grid-bottom4,#grid-bottom3').css({'display': 'inline'});

      $( '#grid-middle').removeClass('counter-container');
      $( '#grid-middle').addClass('counter-container-two');

      $( '#grid-top').addClass('tree-top-two');
      $( '#grid-top').removeClass('tree-top');


      $( '#grid-bottom1').addClass('tree-bottom-two');
      $( '#grid-bottom1').removeClass('tree-bottom');

      $( '#grid-bottom-start').addClass('path-start-two');
      $( '#grid-bottom-start').removeClass('path-start');

      $( '#grid-bottom-direction').addClass('path-text-two');
      $( '#grid-bottom-direction').removeClass('path-text');
    }


  }



}
