
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.add-bugs';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/add-bugs/add-bugs-routes'));

export default moduleName;
