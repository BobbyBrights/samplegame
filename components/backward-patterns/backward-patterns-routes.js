/**
 * Created by Game Generator.
 */

require('./index.scss');

import backwardPatternsTemplate from './index.html';
import backwardPatternsController from './backward-patterns-controller';

export default  function backwardPatternsRoutes($stateProvider) {
  'ngInject';

  //var assets = require('./images/asset.svg');

  $stateProvider
    .state('app.home.level.menu.backward-patterns', {
      url  : '/:category/backward-patterns',

      views: {
        'menu-page-view': {
          template  : backwardPatternsTemplate,
          controller: backwardPatternsController,
          resolve: {
            'preload-backward-patterns': function (preLoaderService, $stateParams) {
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