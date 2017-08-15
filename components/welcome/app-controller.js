
export default function appController($scope, $rootScope, $state, $stateParams) {
  'ngInject';

  $rootScope.getLayout = getLayout;
  $rootScope.getLevel  = getLevel;
  $rootScope.getBackDrop  = getBackDrop;
  $rootScope.getAspectRatio  = getAspectRatio();

  /**
   * This method help us to get the greatest common divisor
   * so with this method we can get aspect ratio
   */
  function gcd(a, b) {
    return (b === 0) ? a : gcd(b, a % b);
  }

  var w = screen.width;
  var h = screen.height;
  var r = gcd(w, h);

  $scope.aspectRatio = w / r + '-' + h / r;


  //console.log('aspectRatio ->>', $scope.aspectRatio);

  /**
   * This method will help us to get the application layout as per the application state.
   * @param  {[type]} options [description]
   * @return {[type]} string        [description]
   *
   * @default state will be `app`
   */
  function getLayout(options) { /* jshint unused:vars */
    console.log('getLayout');
    var stateLayout = null; //$state.current.getStateLayout && $state.current.getStateLayout();

    var layoutName = 'app';

    if (stateLayout) {
      layoutName = stateLayout;
    } else {

      var stateName = $state.current.name;

      while (stateName.indexOf('.') > 0) {
        var stateConf = $state.get(stateName);
        layoutName    = stateConf.getStateLayout && stateConf.getStateLayout();

        if (layoutName) {
          break;
        } else {
          stateName  = stateName.replace(/\.(?:.(?!\.))+$/gi, '');
          layoutName = stateName;
        }
      }
    }

    return $state.current.name.replace(/\./gi, '-') + '-layout ' + layoutName + '-layout';
  }

  function getAspectRatio() {
    var width = $(window).innerWidth();
    var height = $(window).height();
    var ratio = width / height;
    return ( Math.abs( ratio - 4 / 3 ) < Math.abs( ratio - 16 / 9 ) ) ? '4-3' : '16-9';
  }

  function getBackDrop() {
    return $state.params && $state.params.backDrop+'-'+$rootScope.getAspectRatio;
  }

  function getLevel() {
    return $state.params && $state.params.level;
  }
}
