/**
 * Created by Game Generator.
 */

require('./index.scss');

import countCrayFishTemplate from './index.html';
import countCrayFishController from './count-cray-fish-controller';

export default  function countCrayFishRoutes($stateProvider) {
  'ngInject';

  $stateProvider

    .state('app.home.level.menu.count-cray-fish', {
      url  : '/:category/count-cray-fish',
      views: {
        'menu-page-view': {
          template  : countCrayFishTemplate,
          controller: countCrayFishController,
          resolve   : {
            'preload-count-cray-fish': function (preLoaderService, $stateParams) {
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