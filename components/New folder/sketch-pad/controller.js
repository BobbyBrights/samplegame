/**
 * Created by Pratik on 12-10-2016.
 */

export default function sketchPadController($scope, $timeout) {
  'ngInject';

  var ctrl = this;
  var canvas, context;

  ctrl.canvasId = getId();

  this.params = this.params || {};

  ctrl.onColorChange = onColorChange;
  ctrl.clearCanvas   = clearCanvas;
  ctrl.colors        = [
    '#009900',
    '#b96a01',
    '#00ff00',
    '#00cc00',
    '#ff0000',
    '#0000ff',
    '#ff6600',
    '#0066ff',
    '#ff9900',
    '#6699ff',
    '#000000',
    '#9900cc',
    '#666666',
    '#cc33ff',
    '#999999',
    '#ff66ff'
  ];

  function init() {
    $('body').append('<canvas class="sketch-pad-canvas" id="' + ctrl.canvasId + '" ></canvas>');

    canvas  = $('#' + ctrl.canvasId);
    context = canvas[0].getContext('2d');

    context.lineWidth = 3;

    setColor();

    canvas
      .on('pointerdown', start)
      .on('pointermove', move)
      .on('pointerup', stop)
      .on('pointerleave', stop);

    setCanvasPosition();
    $(window).resize(setCanvasPosition);

  }

  function onColorChange($event) {
    $('.sketch-pad-container .color-palette .color').removeClass('selected');
    $($event.currentTarget).addClass('selected');

    setColor();
  }

  function setColor() {
    var color = $('.sketch-pad-container .color-palette .color.selected').css('background-color') || ctrl.colors[0];

    context.strokeStyle = color;
  }

  function setCanvasPosition() {
    var baseElem = $('#canvas-base-' + ctrl.canvasId);
    var offset   = baseElem.offset();

    if (baseElem && offset && offset.top) {
      var width  = baseElem.width();
      var height = baseElem.height();

      canvas.css({position: 'absolute', top: offset.top, left: offset.left})
        .attr('width', width)
        .attr('height', height);

      setColor();
    }
  }

  $timeout(init, 1000);

  this.$onChange = function () {
  };

  this.$onDestroy = function () {
    $('#' + ctrl.canvasId).remove();
  };

  var paint = false;

  var start = function (e) {
    paint = true;
    context.beginPath();

    var x = e.offsetX === undefined ? e.layerX : e.offsetX;
    var y = e.offsetY === undefined ? e.layerY : e.offsetY;

    context.moveTo(x, y);
    e.preventDefault();
  };

  var move = function (e) {
    if (paint) {
      var x = e.offsetX === undefined ? e.layerX : e.offsetX;
      var y = e.offsetY === undefined ? e.layerY : e.offsetY;

      context.lineTo(x, y);
      context.stroke();
    }
    e.preventDefault();
  };

  var stop = function (e) {
    paint = false;
    e.preventDefault();
  };

  function clearCanvas(preserveTransform) {
    if (!context) {
      return;
    }
    preserveTransform = preserveTransform === false ? false : true;

    if (preserveTransform) {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    if (preserveTransform) {
      context.restore();
    }
  }

  var sketchPadComponent = {
    canvasId: ctrl.canvasId,
    clear   : ctrl.clearCanvas
  };

  ctrl.bindSketchPad({sketchPad: sketchPadComponent});

  function getId() {
    return 'canvas-' + new Date().getTime() + '-' + Math.round(Math.random() * (100000 - 1)) + 1;
  }
}