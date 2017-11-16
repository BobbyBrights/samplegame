import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.python-patterns';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/python-patterns/python-patterns-routes'));

export default moduleName;
