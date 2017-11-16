require('./index.scss');

import forwardPatternsTemplate from './index.html';
import forwardPatternsController from './forward-patterns-controller';

export default  function forwardPatternsRoutes($stateProvider) {
  'ngInject';


  $stateProvider
    .state('app.home.level.menu.forward-patterns', {
      url: '/:category/forward-patterns',

      views: {
        'menu-page-view': {
          template: forwardPatternsTemplate,
          controller: forwardPatternsController,
          resolve: {
            'preload-forward-patterns': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        }
      }
    });
}