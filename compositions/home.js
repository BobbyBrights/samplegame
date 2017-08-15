
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.home';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/welcome/welcome-routes'))
  .config(require('../components/home/home-routes'))

  .config(require('../components/level/level-routes'))
  .config(require('../components/menu/menu-routes'));

export default moduleName;
