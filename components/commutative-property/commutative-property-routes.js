require('./index.scss');

import commutativePropertiesTemplate from './index.html';
import commutativePropertiesController from './commutative-property-controller.js';

export default  function commutativePropertyRoutes($stateProvider) {
  'ngInject';


  $stateProvider
    .state('app.home.level.menu.commutative-property', {
      url  : '/:category/commutative-property',

      views: {
        'menu-page-view': {
          template  : commutativePropertiesTemplate,
          controller: commutativePropertiesController
        }
      }
    });
}