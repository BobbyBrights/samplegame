require('./index.scss');

module.exports = Spinner;

function Spinner($rootScope, $log, preLoaderImages,GameData,RequireImages) {
  'ngInject';
  let spinnerElem;
  

  return {
    scope: {
      viewName: '='
    },
    template: require('./index.html'),
    restrict: 'E', //only want this as a DOM element
    link: ($scope, $elem) => {
      debugger
      $scope.levelChange = 'a';
      var gameData = GameData.get('spinner');
      var imageContext = require.context('./', true, /.*\.svg$/);
      $scope.images = RequireImages.get(imageContext, gameData.images);


      function show() {
        spinnerElem.find('.preloader.spinner').removeClass('hidden');
        $scope.progress = 0;
      }

      function hide() {
        spinnerElem.find('.preloader.spinner').addClass('hidden');
      }

      spinnerElem = $elem;

      // When the view that this is paired with begins loading,
      // show the spinner
      //$rootScope.$on('$viewContentLoading', (evt, viewConfig) => {
      //  //if (viewConfig === scope.viewName) {
      //  //   $log.warn('SHOW  SPIN for', scope.viewName);
      //    elem.find('.spinner').removeClass('hidden');
      //  //}
      //});
      //
      //// When the view that this is paired with compltes loading,
      //// hide the spinner
      //$rootScope.$on('$viewContentLoaded', (evt, viewConfig) => {
      //  //if (viewConfig === scope.viewName) {
      //  //   $log.warn('HIDE  SPIN for', scope.viewName);
      //    elem.find('.spinner').addClass('hidden');
      //  //}
      //});

      let success = (/*event*/) => {
        hide();
        //console.log('in spinner success ... =>');
      };

      let failure = () => {
        hide();
        //console.log('in spinner error ... =>');
      };

      let notify = (event, img) => {
        $scope.progress = img.percent;
        //console.log('in spinner notify ... =>');
      };
      let levelChange = (even, level)=> {
        $scope.levelChange = level || 'a';
        console.log("$scope.levelChange", $scope.levelChange);
      };
      let successListener, failureListener, notifyListener,levelListener;

      $rootScope.$on('$stateChangeStart', () => {
        $scope.progress = 0;

        setTimeout(() => {
          successListener = $rootScope.$on('preloader:success', success);
          failureListener = $rootScope.$on('preloader:failure', failure);
          notifyListener = $rootScope.$on('preloader:notify', notify);

          //console.log('in spinner in state change start ... =>');

          show();
        }, 100);
        levelListener = $rootScope.$on('levelChange', levelChange);
      });

      $rootScope.$on('$stateChangeSuccess', () => {
        setTimeout(() => {
          hide();
          //console.log('in spinner in state change success ... =>');
          successListener();
          failureListener();
          notifyListener();
        }, 100);
      });
    }
  };
}