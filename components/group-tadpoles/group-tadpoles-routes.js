/**
 * Created by Game Generator.
 */

require('./index.scss');

import groupTadpolesTemplate from './index.html';
import groupTadpolesController from './group-tadpoles-controller';

export default  function groupTadpolesRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.group-tadpoles', {
      url: '/:category/group-tadpoles',
      views: {
        'menu-page-view': {
          template: groupTadpolesTemplate,
          controller: groupTadpolesController,
          resolve: {
            'preload-group-tadpoles': function (preLoaderService, $stateParams) {
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