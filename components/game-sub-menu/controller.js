/**
 * Created by Pratik on 22-09-2016.
 */

export default function subMenuComponent($stateParams, $scope) {
  'ngInject';
  $scope.stateParam = JSON.stringify($stateParams).replace(/"/g,'');
}