
import _ from 'lodash';

import welcomeTemplate from './index.html';
import appController from './app-controller.js';

export default function appRoutes($stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.when('/', '/welcome');
  $urlRouterProvider.otherwise('/welcome');

  $stateProvider
    .state('app', {
      abstract  : true,
      url       : '',
      template  : '<ui-view></ui-view>',

      controller: appController
    })
    .state('app.welcome', {
        url     : '/welcome',
        template: welcomeTemplate,
        params:{
          backDrop: 'welcome'
        },
        resolve: {
          'preload-welcome': function (preLoaderService, $stateParams) {
            'ngInject';

            var state        = _.merge({}, this.self, {params: $stateParams || {}});
            var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);
            return preLoaderService.loadImages(state, imageContext);
          }
        }
      }
    )
  ;
}