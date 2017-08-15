/**
 * Created by Game Generator.
 */

require('./index.scss');

import shapesTemplate from './index.html';
import shapesController from './shapes-controller';

export default  function shapesRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.shapes', {
      url  : '/:category/shapes',
      views: {
        'menu-page-view': {
          template  : shapesTemplate,
          controller: shapesController,
          resolve: {
            'preload-shapes': function (preLoaderService, $stateParams) {
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
