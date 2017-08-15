require('./index.scss');

import countByTemplate from './index.html';
import countByController from './count-by-controller.js';

import countByTwoLevelBTemplate from './count-by-two/b/index.html';
import countByTwoLevelBController from './count-by-two/b/count-by-two-controller.js';

import countByFiveLevelBTemplate from './count-by-five/b/index.html';
import countByFiveLevelBController from './count-by-five/b/count-by-five-controller.js';

import countByTenLevelBTemplate from './count-by-ten/b/index.html';
import countByTenLevelBController from './count-by-ten/b/count-by-ten-controller.js';

export default function countByRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.count-by', {
      url: '/:category/count-by'
    })
    .state('app.home.level.menu.count-by-game', {
      url: '/:category/count-by/:game',
      views: {
        'menu-page-view': {
          template: countByTemplate,
          controller: countByController
        },
        'count-by-two.b@app.home.level.menu.count-by-game': {
          template: countByTwoLevelBTemplate,
          controller: countByTwoLevelBController,
          resolve: {
            'preload-count-by-two-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'count-by-five.b@app.home.level.menu.count-by-game': {
          template: countByFiveLevelBTemplate,
          controller: countByFiveLevelBController,
          resolve: {
            'preload-count-by-five-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'count-by-ten.b@app.home.level.menu.count-by-game': {
          template: countByTenLevelBTemplate,
          controller: countByTenLevelBController,
          resolve: {
            'preload-count-by-ten-b': function (preLoaderService, $stateParams) {
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
