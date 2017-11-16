
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.commutative-property';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/commutative-property/commutative-property-routes'));

export default moduleName;
