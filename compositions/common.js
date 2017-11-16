
import gameDataService from '../components/common/game-data-service';
import requireImagesService from '../components/common/require-images-service';
import preLoaderImages from '../components/common/pre-loader-images';
import rangeFilter from '../components/common/range-filter';
import preLoaderService from '../components/common/preloader-service';

var moduleName = 'app.common';

angular.module('app.common', ['ngOrderObjectBy'])
  .service('GetDataSource', require('../components/common/get-data-source.js'))
  .service('GameData', gameDataService)
  .service('RequireImages', requireImagesService)
  .service('setScroll', require('../components/common/set-scroll.js'))
  .service('svgObject', require('../components/common/svg-object.js'))
  .service('GameUtils', require('../components/common/utils.js'))
  .service('dragAndDrop', require('../components/common/drag-and-drop.js'))
  //.service( 'loader', require( '../components/common/loader-service.js') )
  .service('preLoaderService', preLoaderService)
  .factory('preLoaderImages', preLoaderImages)
  .directive('dropZone', require('../components/common/drop-zone.js'))
  .directive('dragItem', require('../components/common/drag-item.js'))
  .directive('position', require('../components/common/position.js'))
  .directive('size', require('../components/common/size.js'))
  .directive('svgDirective', require('../components/common/svg-directive.js'))
  .directive('rotateBy', require('../components/common/rotate-directive.js'))
  .directive('flipBy', require('../components/common/flip-directive'))
  .directive('addBrowserType', require('../components/common/add-browser-type-directive.js'))
  .directive('textBox', require('../components/input/index.js'))
  .directive('spinner', require('../components/spinner/index.js'))
  .filter('range', rangeFilter);

export default moduleName;
