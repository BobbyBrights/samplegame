
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.number-ordering';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/number-ordering/number-ordering-routes'));

export default moduleName;
