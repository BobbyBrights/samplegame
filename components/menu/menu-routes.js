import menuTemplate from '../menu/index.html';
import menuListTemplate from '../menu/list.html';
import menuController from '../menu/menu-controller.js';

export default function menuRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu', {

      url  : '/menu',
      views: {
        ''                                  : {
          template  : menuTemplate,
          controller: menuController
        },
        'menu-page-view@app.home.level.menu': {

          template  : menuListTemplate,
          controller: menuController,
          resolve   : {
            'preload-menu': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./images/', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        }
      }
    });
}