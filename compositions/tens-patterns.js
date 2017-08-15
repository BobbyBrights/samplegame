
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.tens-patterns';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/tens-patterns/tens-patterns-routes'));

export default moduleName;
