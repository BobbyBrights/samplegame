
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.possum-patterns';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/possum-patterns/possum-patterns-routes'));

export default moduleName;
