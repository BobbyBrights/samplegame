
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.money';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/money/money-routes'));

export default moduleName;
