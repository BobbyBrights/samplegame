/**
 * Created by Game Generator.
 */

require('./index.scss');

import possumPatternsTemplate from './index.html';
import possumPatternsController from './possum-patterns-controller';

export default  function possumPatternsRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.possum-patterns', {
      url: '/:category/possum-patterns',
      views: {
        'menu-page-view': {
          template: possumPatternsTemplate,
          controller: possumPatternsController,
          resolve   : {
            'preload-possum-patterns': function (preLoaderService, $stateParams) {
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