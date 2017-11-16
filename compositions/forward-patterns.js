
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.forward-patterns';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/forward-patterns/forward-patterns-routes'));

export default moduleName;
