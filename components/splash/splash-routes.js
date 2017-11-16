import splashTemplate from '../splash/index.html';
import splashController  from '../splash/splash-controller.js';

export default function appRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.splash', {
      url       : '/:level/splash',
      template  : splashTemplate,
      controller: splashController
    });
}