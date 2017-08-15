/**
 * A small plugin to test the boundary between the source and target elements
 *
 * @author Amitesh Kumar
 * @date 13 Dec, 2016
 *
 * @usage
 * $('.box1').isInside('.box2')
 * $('.box1').isColliding('.box2')
 * $('.box1').isContaining('.box2')
 * $('.box1').union('.box2')
 * $('.box1').intersect('.box2')
 *
 */

/**
 * Method to test all functions
 */
function rectBoundaryTest() { // jshint ignore:line
  var resultBox = $('#result');
  var box1      = $('.box1');

  resultBox.append('<div>' + 'is inside => ' + box1
      .isInside('.box2') + '</div>');
  resultBox.append('<div>' + 'is isColliding => ' + box1
      .isColliding('.box2') + '</div>');
  resultBox.append('<div>' + 'is isContaining => ' + box1
      .isContaining('.box2') + '</div>');
  resultBox.append('<div>' + 'is union => ' + JSON.stringify(box1
      .union('.box2'), null, true) + '</div>');
  resultBox.append('<div>' + 'is intersect => ' + JSON.stringify(box1
      .intersect('.box2'), null, true) + '</div>');
}

(function ($) {
  /**
   * Check if the source element is inside the target/another
   * @param another
   * @returns {boolean}
   */
  $.fn.isInside = function (another) {
    var isInside = false;

    this.each(function () {
      var source = getDimention($(this));
      var target = getDimention($(another));

      var sourceRect = new Rect(source.top, source.left, source.width, source.height);
      var targetRect = new Rect(target.top, target.left, target.width, target.height);

      sourceRect.is = new RectBoundryDetector(sourceRect);

      isInside = sourceRect.is.inside(targetRect);
    });

    return isInside;
  };

  /**
   * Check if the source element is colliding the target/another
   * @param another
   * @returns {boolean}
   */
  $.fn.isColliding = function (another) {
    var isColliding = false;
    this.each(function () {
      var source = getDimention($(this));
      var target = getDimention($(another));

      var sourceRect = new Rect(source.top, source.left, source.width, source.height);
      var targetRect = new Rect(target.top, target.left, target.width, target.height);

      sourceRect.is = new RectBoundryDetector(sourceRect);

      isColliding = sourceRect.is.colliding(targetRect);
    });

    return isColliding;
  };

  /**
   * Check if the source element is containing the target/another
   * @param another
   * @returns {boolean}
   */
  $.fn.isContaining = function (another) {
    var isContaining = false;

    this.each(function () {
      var source = getDimention($(this));
      var target = getDimention($(another));

      var sourceRect = new Rect(source.top, source.left, source.width, source.height);
      var targetRect = new Rect(target.top, target.left, target.width, target.height);

      sourceRect.is = new RectBoundryDetector(sourceRect);

      isContaining = sourceRect.is.containing(targetRect);
    });

    return isContaining;
  };

  /**
   * Get the rectangle dimention for union section for source element and target/another
   * @param another
   * @returns {{}}
   */
  $.fn.union = function (another) {
    var union = {};

    this.each(function () {
      var source = getDimention($(this));
      var target = getDimention($(another));

      var sourceRect = new Rect(source.top, source.left, source.width, source.height);
      var targetRect = new Rect(target.top, target.left, target.width, target.height);

      union = sourceRect.union(targetRect);
    });

    return union;
  };

  /**
   * Get the rectangle dimention for intersect section for source element and target/another
   * @param another
   * @returns {{}}
   */
  $.fn.intersect = function (another) {
    var intersect = {};

    this.each(function () {
      var source = getDimention($(this));
      var target = getDimention($(another));

      var sourceRect = new Rect(source.top, source.left, source.width, source.height);
      var targetRect = new Rect(target.top, target.left, target.width, target.height);

      intersect = sourceRect.intersect(targetRect);
    });

    return intersect;
  };

  function Rect(top, left, width, height) {
    this.top    = top || 0;
    this.left   = left || 0;
    this.width  = width || 0;
    this.height = height || 0;
    this.right  = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  Rect.prototype = {
    set: function (top, left, width, height) {
      this.top    = top || this.top;
      this.left   = left || this.left;
      this.width  = width || this.width;
      this.height = height || this.height;
      this.right  = this.left + this.width;
      this.bottom = this.top + this.height;
    },

    union: function (toUnion) {
      var union    = new Rect();
      union.left   = Math.min(this.left, toUnion.left);
      union.top    = Math.min(this.top, toUnion.top);
      union.width  = Math.max(this.left + this.width, toUnion.left + toUnion.width) - union.left;
      union.height = Math.max(this.top + this.height, toUnion.top + toUnion.height) - union.top;
      return union;
    },

    intersect: function (rect) {
      var rectI    = new Rect();
      rectI.left   = Math.max(this.left, rect.left);
      rectI.top    = Math.max(this.top, rect.top);
      rectI.right  = Math.min(this.right, rect.right);
      rectI.bottom = Math.min(this.bottom, rect.bottom);
      return rectI;
    }
  };


  function RectBoundryDetector(rect) {
    this.top    = rect.top;
    this.left   = rect.left;
    this.width  = rect.width;
    this.height = rect.height;
    this.right  = rect.right;
    this.bottom = rect.bottom;
  }

  RectBoundryDetector.prototype = {
    colliding: function (other) {
      return !(
        this.top > other.bottom ||
        this.right < other.left ||
        this.bottom < other.top ||
        this.left > other.right
      );
    },

    containing: function (other) {
      return (
        this.left <= other.left &&
        other.left < this.width &&
        this.top <= other.top &&
        other.top < this.height
      );
    },

    inside: function (other) {
      return (
        ((other.top <= this.top) && (this.top <= other.bottom)) &&
        ((other.top <= this.bottom) && (this.bottom <= other.bottom)) &&
        ((other.left <= this.left) && (this.left <= other.right)) &&
        ((other.left <= this.right) && (this.right <= other.right))
      );
    }
  };

  function getDimention(elem) {
    var o = $(elem);
    return {
      top   : o.position().top,
      left  : o.position().left,
      width : o.width(),
      height: o.height()
    };
  }
})(jQuery);