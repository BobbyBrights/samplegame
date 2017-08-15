export default function subtractSkinksController($scope, $stateParams,GameData, RequireImages, $timeout) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'subtract-skinks';
  $scope.flag = true;

  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/),
      questionData = gameData.home.question,
      value        = '';

  $scope.getImageContext = function () {
    return imageContext;
  };

  /**
   * Game specific logic
   */

  $scope.questionText = questionData.hint.text;
  $scope.questionsBox   = questionData.questionsBox.text;
  $scope.middleHintText = questionData.middleHint.text;
  $scope.header         = gameData.home.header;
  $scope.images         = RequireImages.get(imageContext, gameData.home.images);
  $scope.question       = RequireImages.get(imageContext, questionData);
  $scope.menu           = _.cloneDeep(gameData.menu);
  $scope.lizardcount    = 10;

  //For check/reset button click
  $scope.reset = reset;
  $scope.check = check;
  $scope.redo = redo;

  

  init();
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

  // For updateLizard lizard click
  $scope.lizardCounter = function (index) {
    if ($scope.goneLizard <= $scope.lizardcount) {
      angular.element('#' + index).find('img').addClass('gone-lizard');
      $scope.goneLizard++;
    }
  };

  // Game initialization function
  function init() {
    $scope.inputDisabled = false;
    value                = '';
    $scope.goneLizard    = '0';
    $scope.lizardClasses = RequireImages.get(imageContext, gameData.home.images.lizard);
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  // For reset button click
  function reset($event) {
    $event.preventDefault();
    init();
    angular.element('game-images').find('img').removeClass('gone-lizard');
    angular.element('#input-1').val('');
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
  // For check button click
  function check($event) {
    $event.preventDefault(); 
    var inputVal = angular.element('#input-1').val();
    if (inputVal) {
      $scope.inputDisabled = true;
      inputVal = parseInt(inputVal);
      if (inputVal === ($scope.lizardcount - $scope.goneLizard)) {
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0; 
      }      
    }    
    return false;
  }
}
