
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.group-tadpoles';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/group-tadpoles/group-tadpoles-routes'));

export default moduleName;