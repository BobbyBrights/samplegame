/**
 * Created by Game Generator.
 */

require('./index.scss');

import shareCicadasTemplate from './index.html';
import shareCicadasController from './share-cicadas-controller';

export default  function shareCicadasRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.share-cicadas', {
      url: '/:category/share-cicadas',
      views: {
        'menu-page-view': {
          template: shareCicadasTemplate,
          controller: shareCicadasController,
          resolve: {
            'preload-share-cicadas': function (preLoaderService, $stateParams) {
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