/**
 * Dynamically create and remove the loader
 *
 * @author Kiran Shinde
 *
 * @usage
 *
 */

export default function loaderService() {
  'ngInject';
  var loader = '<div class="loader-background">'+
               '<div class="loader" ng-show="loader"></div>'+
               '<button type="button" id="loader-button">On/Off</button>'+
               '</div>';

  this.onLoader = function () {
    $('body').append(loader);
  };

  this.offLoader = function () {
    $('body').find('.loader-background').remove();
  };

}