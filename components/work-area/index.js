require('./index.scss');

import template from './index.html';

export default {
	restrict: 'E',
    scope: {
        panel: '<img class="right-panel" src="../../assets/images/right-panel.svg"/>'
    },
  bindings  : {
    menu : '<',
    next : '<',
    plus : '<',
    minus: '<',
    header: '<',
    help: '<',
    onnumberclick : '<',
    getscoreboard: '<'
  },
  transclude: true,
  template  : template,
  controller : work
};

function work($scope, $state, $timeout) {
  'ngInject';

  $scope.menu = this.menu;

  var path = '';
  var slideCounter = 0;

  function stateGo() {
    if(path == 'app.home'){
      $state.go(path,{'backDrop':'home'});
    }else {
      $state.go(path);
    }
  }

  function workAreaPanelAnimation(_element, slideInClass, slideOutClass){
    slideCounter++;

    if(_element.hasClass(slideOutClass)){
        _element.removeClass(slideOutClass).addClass(slideInClass)
            .bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (e) { // jshint ignore:line
             console.log('animation end===>',slideCounter);
              if(slideCounter == 3){
                stateGo()
                slideCounter = 0;
                 $('.menu-button').css({pointerEvents: 'auto'});
              }

             _element.unbind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd');
           });
    }else 
        if(slideCounter == 3){
          stateGo()
            slideCounter = 0;
              $('.menu-button').css({pointerEvents: 'auto'});
        }
      }


  $scope.$watch('$viewContentLoaded', function()
        {
            setTimeout(function () {      
              $('.drag-btn').removeClass('fade-out').addClass('fade-in')   
            }, 1000);
        });
  $scope.stateChange = function(_path){

    console.log('animation end',slideCounter);
    path = _path;
    var drags = $('.drag-btn');

    $('.menu-button').css({pointerEvents: 'none'});
   
    if(drags.hasClass('move-disable')){
      drags.removeClass('fade-in');
    }else{
      drags.removeClass('fade-in invisible').addClass('fade-out');
    }
      
    workAreaPanelAnimation($('.left-panel-menu'), 'lclose','open');    
    workAreaPanelAnimation($('.bottom-panel-menu'), 'bclose', 'open');
    workAreaPanelAnimation($('.right-panel-menu'), 'rclose','open');
  }
}
