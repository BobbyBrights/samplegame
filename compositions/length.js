
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.length';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/length/length-routes'));

export default moduleName;
