
export default function metresController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'metres.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.length.types.metres');

  var questionData = gameData.home.question,
    value = '';
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.questionLabel = questionData.questionLabel[0].text;
  console.log('$scope.questionLabel',$scope.questionLabel);
  $scope.correctAnswer  = questionData.correctAnswer;
  var checkIsEmpty = false;

  // Set image path
  // $scope.metresImages = RequireImages.get($scope.getImageContext(), gameData.home.images);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.dragImage             = RequireImages.get($scope.getImageContext(), questionData.dragImage.scale);
  $scope.display            = RequireImages.get($scope.getImageContext(), questionData.display);
  $scope.metresImages            = RequireImages.get($scope.getImageContext(), questionData.metresImages);


  //For more/next button click
  $scope.next = next;
  $scope.check    = check;
  $scope.redo     = redo;
  $scope.getScoreboard = getScoreboard;
  var counter = -1,
    count = 0;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  $scope.flag = -1;
  /*Disable the all special characters, alphabets and space in the input field*/
  $timeout(function () {
    $('input').on('keydown', function (event) {
      var regex = new RegExp('^[]+$');
      var key   = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });
  });

  init();

  // Game initialization function
  function init(){
    $scope.metres = [];
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    value    = '';
    angular.element('.drag-scale').css({left: '15%', top: '58%'});
    counter = ++counter > 7 ? 0 :counter;
    $scope.metres.push(counter);
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    angular.element('#input-1').val('');
    count++;
    if(count === 4){
      $scope.questionLabel= questionData.questionLabel[1].text;
    } else {
      if (count === 8){
        count= 0;
        $scope.questionLabel= questionData.questionLabel[0].text;
      }
    }
    init();
    return false;
  }


  $scope.onNumberClick = function ($event, num) {
    if($scope.flag === -1){
      if(num === 'backspace'){
        value = value.substring(0, value.length - 1);
      }else{
        value = value.length <= 1 ? value + '' + num : value;
      }
    }

    angular.element('#input-1').val(value);
  };

  function redo($event) {
    $event.preventDefault();
    $scope.inputDisabled = false;
    angular.element('#input-1').val('');
    value = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  // For more button click
  function check($event) {
    $event.preventDefault();
    var inputVal = angular.element('#input-1').val();
    checkIsEmpty = _.isEmpty($scope.shapeNames);
    if (checkIsEmpty === false) {
      if (parseInt(inputVal) === $scope.correctAnswer[counter]) {
        $scope.scoreboard.upBy();
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }
    return false;
  }

  $scope.itemBadlyDropped = function (item) {
    if (item.id !== 'pin') {
      item.goHome();
    }
  };
}
