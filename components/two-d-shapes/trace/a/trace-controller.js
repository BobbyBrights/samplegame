export default function traceController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'trace.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.two-d-shapes.types.trace');

  var questionData = gameData.home.question;

  $scope.questionText     = questionData.hint.text;
  $scope.chooseShapeLabel = questionData.chooseShapeLabel;

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.header          = gameData.home.header;
  $scope.traceImages     = RequireImages.get($scope.getImageContext(), questionData.images);
  $scope.traceBlueImages = RequireImages.get($scope.getImageContext(), questionData.blueImages);
  $scope.shapes          = RequireImages.get($scope.getImageContext(), questionData.shapes);

  $scope.sketchPadParams = {width: '8%', height: '80%'};

  $scope.shapeClick   = shapeClick;
  $scope.drawShapes   = drawShapes;
  $scope.getSketchPad = getSketchPad;
  $scope.clearClick   = clearClick;

  var previousId = 'square';
  var currentId;

  $scope.displayShapeName = 'square';

  //sketch pad display shapes on click
  function shapeClick($event) {
    $scope.clearClick();

    $('#' + previousId).removeClass('invisible');
    $('#blue-' + previousId).addClass('invisible');
    $('#shape' + previousId).css('visibility', 'hidden');
    currentId = $event.target.id;
    $scope.displayShapeName = currentId;
    var shapeId = currentId;
    $('#shape' + shapeId).css('visibility', 'visible');
    $('#' + $scope.displayShapeName).addClass('invisible');
    $('#blue-' + $scope.displayShapeName).removeClass('invisible');
    previousId = shapeId;
  }

  function drawShapes() {
    $scope.clearClick();
    $('#shape' + angular.lowercase($scope.displayShapeName)).css('visibility', 'hidden');
    $scope.displayShapeName = 'my shapes';
  }

  function getSketchPad(sketchPad) {
    $scope.sketchPad = sketchPad;
  }

  // link the new button with newCanvas() function
  function clearClick() {
    if ($scope.sketchPad) {
      $scope.sketchPad.clear();
    }
  }

  $timeout(function showCircle() {
    $('#Circle').trigger('click');
  }, 1300);
}
