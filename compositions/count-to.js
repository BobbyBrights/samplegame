import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.count-to';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/count-to/count-to-routes'));

export default moduleName;