require('./index.scss');

import oddandevensTemplate from './index.html';
import oddandevensController from './odd-and-evens-controller.js';

export default  function oddAndEvensRoutes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.home.level.menu.odd-and-evens', {
      url  : '/:category/odd-and-evens',
      views: {
        'menu-page-view': {
          template  : oddandevensTemplate,
          controller: oddandevensController,
          resolve: {
            'preload-odd-and-evens-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        }
      }
    })
  ;
}