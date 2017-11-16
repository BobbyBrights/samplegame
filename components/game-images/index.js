/**
 * Created by Pratik on 07-10-2016.
 */
import template from './index.html';

export default {
  bindings  : {
    images: '<'
  },
  template  : template,
  controller: gameImagesController
};


function gameImagesController($scope) {
  'ngInject';

  $scope.images = this.images.path ? [this.images] : this.images;


  setStyles();
  var me = this;

  this.$onChanges = function(){
    $scope.images = me.images.path ? [me.images] : me.images;
    setStyles();
  };

  // Merge all style properties
  function setStyles() {

    _.forEach($scope.images, function (image, key) {
      image.styles = _.merge({
        'width' : image.width,
        'height': image.height,
        'top'   : image.top,

        'left'  : image.left,
        'z-index':image.zIndex
      }, image.styles);

      _.forEach(image.styles, function (v, k) {
        if (_.isUndefined(v)) {
          delete image.styles[k];
        }
      });

      $scope.images[key] = image;
    });
  }
}