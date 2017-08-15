require('./index.scss');

import fivesPatternsTemplate from './index.html';
import fivesPatternsController from './fives-patterns-controller';

export default  function fivesPatternsRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.fives-patterns', {
      url: '/:category/fives-patterns',
      views: {
        'menu-page-view': {
          template: fivesPatternsTemplate,
          controller: fivesPatternsController,
          resolve: {
            'preload-fives-patterns-b': function (preLoaderService, $stateParams) {
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