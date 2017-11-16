
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.addition';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/addition/addition-routes'));

export default moduleName;
