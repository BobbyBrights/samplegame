require('./index.scss');

import pythonPatternsTemplate from './index.html';
import pythonPatternsController from './python-patterns-controller';

export default  function pythonPatternsRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.python-patterns', {
      url  : '/:category/python-patterns',
      views: {
        'menu-page-view': {
          template  : pythonPatternsTemplate,
          controller: pythonPatternsController,
          resolve: {
            'preload-python-patterns': function (preLoaderService, $stateParams) {
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