
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.ones-patterns';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/ones-patterns/ones-patterns-routes'));

export default moduleName;
