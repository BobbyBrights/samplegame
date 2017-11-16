/**
 * Created by Game Generator.
 */

require('./index.scss');

import tensPatternsTemplate from './index.html';
import tensPatternsController from './tens-patterns-controller';

export default  function tensPatternsRoutes($stateProvider) {
  'ngInject';


  $stateProvider
    .state('app.home.level.menu.tens-patterns', {
      url: '/:category/tens-patterns',

      views: {
        'menu-page-view': {
          template: tensPatternsTemplate,
          controller: tensPatternsController,
          resolve: {
            'preload-tens-patterns-b': function (preLoaderService, $stateParams) {
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