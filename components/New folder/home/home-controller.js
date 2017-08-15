// We can get it from the GameData service as well but GameData is
// heavy so I am importing from json file
import data from '!json!./data.json';


export default function homeController($scope, $stateParams) {
  'ngInject';

  $scope.data   = data;
  $scope.header = data.headings.header;  
  $scope.menu = _.cloneDeep(data.headings.menu);  
}