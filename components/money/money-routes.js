/**
 * Created by Game Generator.
 */

require('./index.scss');

import moneyTemplate from './index.html';
import moneyController from './money-controller';

export default  function moneyRoutes($stateProvider) {
  'ngInject';

  //var assets = require('./images/asset.svg');

  $stateProvider
    .state('app.home.level.menu.money', {
      url  : '/:category/money',
      views: {
        "menu-page-view": {
          template  : moneyTemplate,
          controller: moneyController,
          resolve: {
            'preload-money': function (preLoaderService, $stateParams) {
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