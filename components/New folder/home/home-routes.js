import homeTemplate from './index.html';
import homeController from './home-controller.js';

export default function homeRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home', {

      url           : '/home',
      template      : homeTemplate,
      controller    : homeController,
      getStateLayout: function () {
        return 'home';
      },
      params:{
        backDrop: 'home'
      },
      resolve       : {
        'preload-home': function (preLoaderService, $stateParams) {
          'ngInject';

          var state        = _.merge({}, this.self, {params: $stateParams || {}});
          var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

          return preLoaderService.loadImages(state, imageContext);
        }
      }
    });
}