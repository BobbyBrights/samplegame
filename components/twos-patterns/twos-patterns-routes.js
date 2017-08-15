/**
 * Created by Game Generator.
 */

require('./index.scss');

import twosPatternsTemplate from './index.html';
import twosPatternsController from './twos-patterns-controller';

export default  function twosPatternsRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.twos-patterns', {
      url  : '/:category/twos-patterns',
      views: {
        'menu-page-view': {
          template  : twosPatternsTemplate,
          controller: twosPatternsController,
          resolve: {
            'preload-twos-patterns-b': function (preLoaderService, $stateParams) {
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