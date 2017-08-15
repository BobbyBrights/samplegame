
export default function clickTypeController($scope, $stateParams, GameData, RequireImages, svgObject, $compile) {
  'ngInject';

  $scope.gamePageView = 'click-type.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.three-d-shapes.types.click-type');

  var questionData  = gameData.home.question,
      attributeData = questionData.attributeData;

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.header            = gameData.home.header;

  //For next button click
  $scope.next = next;


  var count = 0;

  function init() {
    $('.shape-holder').empty();
    $scope.screens = attributeData.screens[count];

    var assets = require('./images/asset' + (count++) + '.xml');

    svgObject.initSVG(assets).then(function () {

      var svgContainer = ' <div svg-directive class="shape-container" svg-size="482.3,198.69" nodename="shapes"></div>';
      var svgElement   = $compile(svgContainer)($scope);
      $('.shape-holder').append(svgElement);

    }).then(function () {

      $('#shape1').bind('click', function () {
        $('#shape1').css({visibility: 'hidden'});
        $('#shape7').css({visibility: 'visible'});
      });

      $('#shape7').bind('click', function () {
        $('#shape7').css({visibility: 'hidden'});
        $('#shape1').css({visibility: 'visible'});
      });

    });
  }

  init();

  // For next button click
  function next($event) {
    $event.preventDefault();
    if (count === 10) {
      count = 0;
    }
    init();
    return false;
  }
}
