/**
 * Created by Game Generator.
 */

require('./index.scss');

import onesPatternsTemplate from './index.html';
import onesPatternsController from './ones-patterns-controller';

export default  function onesPatternsRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.ones-patterns', {
      url  : '/:category/ones-patterns',
      views: {
        'menu-page-view': {
          template  : onesPatternsTemplate,
          controller: onesPatternsController,
          resolve: {
            'preload-ones-patterns': function (preLoaderService, $stateParams) {
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