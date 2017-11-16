
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.backward-patterns';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/backward-patterns/backward-patterns-routes'));

export default moduleName;
