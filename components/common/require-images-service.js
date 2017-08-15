/**
 * A utility method to retrieve the all images from require context
 *
 * @author Amitesh Kumar
 *

 * @usage
 *
 */

import _ from 'lodash';

export default function RequireImagesService() {
  'ngInject';

  /**
   * Method to get the image path from require context in webpack compiled file system
   * @param  {[type]} context [description]
   * @param  {[type]} photos  [description]
   * @return {[type]}         [description]
   */
  var imageContext = require.context('../../assets/', true, /.*\.(svg|jpg)$/);

  this.get = function (context, photos) {
    var images = {};
    photos = photos || {};

    if (_.isObject(photos) && !_.isUndefined(photos.path)) {
      var clonedImage = _.cloneDeep(photos);
      if (clonedImage.path) {
        clonedImage.path = context('./' + clonedImage.path);
      }
      return clonedImage;
    } else {
      _.forEach(photos, function (img, key) {
        var clonedImage = _.cloneDeep(img);
        if (clonedImage.path) {
          try {
            clonedImage.path = context('./' + clonedImage.path);
          }
          catch (e) {
            clonedImage.path = imageContext('./' + clonedImage.path);
          }

        }

        images[key] = clonedImage;
      });
      return images;
    }
  };
}