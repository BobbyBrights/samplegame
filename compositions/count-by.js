import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.count-by';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/count-by/count-by-routes'));

export default moduleName;
