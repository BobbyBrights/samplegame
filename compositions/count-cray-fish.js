
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.count-cray-fish';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/count-cray-fish/count-cray-fish-routes'));

export default moduleName;
