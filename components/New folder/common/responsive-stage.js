// jshint ignore: start
/**
 * Created by sajid.shaikh on 09-02-2014.
 */
var stage = $('#main-app');

// stageScale is being used in the jquery overlaps library.
window.stageScale = 0;
var stageX        = 0;

window.scalePageNow = function () {
  var minHeight = stage.height();
  var minWidth  = stage.width();
  var winW      = $(window).width();
  var winH      = $(window).height();

  var widthScale  = winW / minWidth;
  var heightScale = winH / minHeight;

  stage.css({
    'transform-origin'        : '0 0',
    '-ms-transform-origin'    : '0 0',
    '-webkit-transform-origin': '0 0',
    '-moz-transform-origin'   : '0 0',
    '-o-transform-origin'     : '0 0'
  });
  if (widthScale < heightScale) {
    rescaleStage(widthScale, winW, minWidth);
  } else {
    rescaleStage(heightScale, winW, minWidth);
  }
};

function rescaleStage(newScale, winW, minWidth) {
  window.stageScale = newScale;

  stage.css({
    'transform'        : 'scale(' + newScale + ') translateZ(0)',
    '-o-transform'     : 'scale(' + newScale + ') translateZ(0)',
    '-ms-transform'    : 'scale(' + newScale + ') translateZ(0)',
    '-webkit-transform': 'scale(' + newScale + ') translateZ(0)',
    '-moz-transform'   : 'scale(' + newScale + ') translateZ(0)'
  });
  stageX = winW / 2 - newScale * minWidth / 2;
  stage.css('left', stageX);
  // console.log('rescaleStage',stageScale);
}

$(window).on('resize', function () {
  // TODO : stop scaling for development
  // scalePageNow();
});

$(document).ready(function () {
  // TODO : stop scaling for development
  // scalePageNow();
});