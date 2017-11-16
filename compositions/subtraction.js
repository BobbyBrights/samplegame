/**
 * Created by M053 on 17-10-2016.
 */
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.subtraction';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/subtraction/subtraction-routes'));

export default moduleName;
