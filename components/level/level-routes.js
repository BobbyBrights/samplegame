import levelTemplate from './index.html';

export default function levelRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level', {

      url        : '/:level',
      template   : levelTemplate,
      controller : function ($scope, setScroll) {
        setScroll.resetIndex();
      }
    });
}