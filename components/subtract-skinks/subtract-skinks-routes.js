require('./index.scss');

import subtractSkinksTemplate from './index.html';
import subtractSkinksController from './subtract-skinks-controller';

export default  function subtractSkinksRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.subtract-skinks', {
      url: '/:category/subtract-skinks',
      views: {
        'menu-page-view': {
          template: subtractSkinksTemplate,
          controller: subtractSkinksController,
          resolve: {
            'preload-subtract-skinks': function (preLoaderService, $stateParams) {
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