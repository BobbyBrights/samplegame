
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.subtract-skinks';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/subtract-skinks/subtract-skinks-routes'));

export default moduleName;
