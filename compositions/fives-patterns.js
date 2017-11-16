
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.fives-patterns';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/fives-patterns/fives-patterns-routes'));

export default moduleName;
