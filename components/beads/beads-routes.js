/**
 * Created by Game Generator.
 */

require('./index.scss');

import beadsTemplate from './index.html';
import beadsController from './beads-controller';

export default  function beadsRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.beads', {
      url: '/:category/beads',
      views: {
        'menu-page-view': {
          template: beadsTemplate,
          controller: beadsController,
          resolve: {
            'preload-beads': function (preLoaderService, $stateParams) {
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
