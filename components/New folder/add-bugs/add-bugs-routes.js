/**
 * Created by Game Generator.
 */

require('./index.scss');

import addBugsTemplate from './index.html';
import addBugsController from './add-bugs-controller';

export default  function addBugsRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.add-bugs', {
      url  : '/:category/add-bugs',
      views: {
        'menu-page-view': {
          template  : addBugsTemplate,
          controller: addBugsController,
          resolve: {
            'preload-add-bugs': function (preLoaderService, $stateParams) {
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