/**
 * Created by M053 on 26-12-2016.
 * maintaining to menu page view
 */
export default function setScroll() {
  'ngInject';
  var accessToken,
      tabIndex;
  this.setIndex = function (index) {
    accessToken = index;
  };

  this.resetIndex = function () {
    accessToken = 0;
  };

  this.getIndex = function () {
    return accessToken;
  };

  this.setTabIndex = function (_tabIndex) {
    tabIndex = _tabIndex;
  };

  this.getTabIndex = function () {
    return tabIndex;
  };
}