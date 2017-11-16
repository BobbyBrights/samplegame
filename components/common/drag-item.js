// jshint ignore: start
/**
 * Generic objects for handling elements being dragged.
 *
 */
function dragItem($compile, $rootScope, dragAndDrop) {

  var currentID = 0; // Used to generate a unique ID for dragItems that don't specify their own

  return {
    restrict: 'AE',
    replace : true,
    //    template: '<div class="draggable"></div>',
    template: null,

    link: function ($scope, $element, $attrs) {
      var fixed                = angular.isDefined($attrs.fixed);
      var defaultClickHandlers = angular.isDefined($attrs.defaultClickHandlers);
      var dragElement          = $($element);

      $element.dragItem = dragElement;

      dragElement.attributes = $attrs;

      dragElement.domElement   = $element[0];
      dragElement.group        = $attrs.group;
      dragElement.hoverClass   = $attrs.hoverClass;
      dragElement.noHoverClass = $attrs.noHoverClass;
      dragElement.activeClass  = $attrs.activeClass;

      dragElement.id = $attrs.id;

      dragElement.domElement.setAttribute('id', dragElement.id);


      // Show the 'pointer' cursor when the user hovers over a dragItem
      dragElement.hover(function () {
        dragElement.css('cursor', 'pointer');
      });

      // A couple of properties used for cloning

      dragElement.cloneable = angular.isDefined($attrs.cloneable);
      dragElement.isClone   = false;
      dragElement.template  = dragElement.html();

      dragElement.zone = null;
      dragElement.domElement.setAttribute('zone', 'UNDROPPED');

      // Add `draggable` class to every drag item to allow it to be dragged.
      // By default we disable drag behaviour on all elements in the view to disable the bounce effect.
      // dragElement.addClass('draggable');
      // dragElement.domElement.setAttribute('draggable', 'true');
      // dragElement.domElement.setAttribute('ondragstart', 'false');
      dragElement.clonedItem = null;

      if (dragElement.cloneable) {
        // Mark this as the current base element for cloning
        // and make sure it's at the top of the Z stack.

        //dragElement.css('border', 'solid 1px blue');
        dragElement.css('zIndex', 99);
      }

      dragElement.dropOnto = function (dropZone) {
        dragAndDrop.placeItem(dragElement, dropZone);
      };

      dragElement.goToFirstEmptyDropZone = goToFirstEmptyDropZone;

      function goToFirstEmptyDropZone(group) {
        var requiredGroup = dragElement.group;

        if (angular.isDefined(group))
          requiredGroup = group;

        var newZone = dragAndDrop.firstEmptyDropZone(requiredGroup);

        if (newZone === null)
          dragElement.goHome();
        else
          dragAndDrop.placeItem(dragElement, newZone);
      }

      if (fixed || defaultClickHandlers) {
        // Since this item can't be dragged, the only thing we can do with
        // it is click.  Define some default handlers, which the games's
        // controller can override if it wants to.

        if (!angular.isDefined($scope.undroppedItemClicked)) {
          $scope.undroppedItemClicked = function undroppedItemClicked(item) {
            if (item.cloneable)
              item = createNewBaseElement(item);

            item.goToFirstEmptyDropZone();
          };
        }

        if (!angular.isDefined($scope.droppedItemClicked)) {
          $scope.droppedItemClicked = function droppedItemClicked(item) {
            if (item.cloneable)
              $(item.domElement).remove();
            else
              item.goHome();
          };
        }
      }

      // The position where the mousedown happened

      var originalPointerX;
      var originalPointerY;

      // The position of the element when the mousedown happened

      var originalTop;
      var originalLeft;

      var moveEvents  = ['touchmove', 'mousemove'];
      var downEvents  = ['touchstart', 'mousedown'];
      var upEvents    = ['touchend', 'touchcancel', 'mouseup'];
      var enterEvents = ['touchstart', 'mouseenter'];
      var leaveEvents = ['touchend', 'mouseleave'];

      var nextCloneId = 0;

      $scope.$on('INIT_VIEW', addEventHandlers(dragElement, $scope));

      function addEventHandlers(element) {
        element.on(downEvents.join(' '), downHandler);

        /* if (MOBILE) {
         element.on(downEvents.join(' '), enterHandler);
         element.on(upEvents.join(' '), leaveHandler);
         } else {*/
        element.on(enterEvents.join(' '), enterHandler);
        element.on(leaveEvents.join(' '), leaveHandler);
        // }

        function downHandler(event) {
          event.preventDefault();
          event.stopPropagation();

          element.wasMoved = false;

          /* clearAnswer(element);*/
          rememberPosition();

          if (element.zone != null) {
            element.zone.occupant = null;
            if (typeof element.zone.domElement === 'undefined')
              element.zone[0].setAttribute('occupant', 'NONE');
            else
              element.zone.domElement.setAttribute('occupant', 'NONE');
          }

          // Remember where the cursor was when the mousedown happened

          var pointer = pointerPosition(event);

          originalPointerX = pointer.x;
          originalPointerY = pointer.y;

          if (element.cloneable) {
            var parent = element.parent()[0];
            var left   = parseInt(parent.style.left) + parseInt($(element).css('left'));
            var top    = parseInt(parent.style.top) + parseInt($(element).css('top'));

            // Move the element to the stage, in case it was
            // inside an enclosing parent <div> or whatever.

            element.remove();

            var stage = $('#Stage');

            stage.append($(element));

            // Set the left/top to the corresponding stage coordinates

            element.css({left: left, top: top});
          }

          // Remember where the element as when the mousedown happened

          var offset = element.offset();

          originalLeft = offset.left;
          originalTop  = offset.top;

          // Apply transform to fix rendering artifacts on mouse move.
          // The transform property needs to be additive to any existing value
          var existing = $element.css('-webkit-transform');
          $element.css('-webkit-transform', existing + ' translateZ(0)');
          $element.css('z-index', 1000);

          $(document).on(moveEvents.join(' '), moveHandler);

          element.upHandler = function () {
            // The upHandler() method needs access to the scope, to pass
            // it to itemDropped().
            upHandler(element, $scope);
          };

          $(document).on(upEvents.join(' '), element.upHandler);
        }

        function enterHandler() {
          if (dragElement.hoverClass)
            element.addClass(dragElement.hoverClass);

          if (dragElement.noHoverClass)
            element.removeClass(dragElement.noHoverClass);
        }

        function leaveHandler() {
          if (dragElement.noHoverClass)
            element.addClass(dragElement.noHoverClass);

          if (dragElement.hoverClass)
            element.removeClass(dragElement.hoverClass);
        }

        function moveHandler(event) {
          if (fixed)
            return;

          if (element.cloneable && !element.isClone) {
            // This item is currently the base for cloning.
            //
            // We want to create a clone from it and make that the
            // new base element.  The steps are ...
            //
            // 1. Creating a new base element from it
            // 2. Marking this element as a clone
            // 3. Pushing it to the top of the Z stack
            // 4. Giving it a red border

            createNewBaseElement(element);

            element.isClone = true;
            element.id      = 'clone ' + (++nextCloneId);

            //console.log('dragItem.moveHandler() -   created clone; old base is now ' + element.id);

            //  element.css('border', 'solid 1px red');
          }

          element.css('zIndex', 99);

          element.wasMoved = true; // TODO Maybe we want to do this only once it's been moved some distance

          // Calculate how far the mouse is from the mousedown position

          var pointer = pointerPosition(event);

          var deltaX = (pointer.x - originalPointerX);
          var deltaY = (pointer.y - originalPointerY);

          // Place the element the same distance from its original
          // position as the mouse has moved (in each direction)

          var newLeft = originalLeft + deltaX;
          var newTop  = originalTop + deltaY;

          // console.log('    setting newLeft to ' + newLeft + ' and newTop to ' + newTop);

          element.offset({'left': newLeft, 'top': newTop});
        }

        function upHandler(element, scope) {
          // Use z-index of 1 for cases where it shares an index with a bg element.
          element.css('zIndex', 1);

          $(document).off(upEvents.join(' '), element.upHandler);
          $(document).off(moveEvents.join(' '), moveHandler);

          if (element.wasMoved) {
            //console.log('dragItem.upHandler() - element', element.id, 'has been dragged');

            element.wasMoved = false;

            itemDropped(element, scope);
          }
          else {
            //console.log('dragItem.upHandler()-element', element.id, 'was not dragged; assuming a click');

            if (element.zone)
              droppedItemClicked(element);
            else
              undroppedItemClicked(element);
          }
        }


        function undroppedItemClicked(element) {
          var handler = $scope.undroppedItemClicked;
          if (handler) {
            if (typeof handler == 'function')
              handler(element);
            else
              console.log('dragItem.undroppedItemClicked() - ' +
                'the "undroppedItemClicked" property is not a function!');
          }
        }

        function droppedItemClicked(element) {
          var handler = $scope.droppedItemClicked;

          if (handler) {
            if (typeof handler == 'function')
              handler(element);
            else
              console.log('dragItem.droppedItemClicked() - ' +
                'the "droppedItemClicked" property is not a function!');
          }
        }

      }

      function createNewBaseElement(element) {
        var baseElement = element.clone(false);

        // The clone becomes the new base item

        baseElement.css('zIndex', 1);
        baseElement.css('border', 'solid 1px blue');

        baseElement.cloneable = true;
        baseElement.isClone   = false;
        baseElement.id        = 'base';

        addEventHandlers(baseElement);

        $(baseElement).appendTo($(element.parent()));

        baseElement.goToFirstEmptyDropZone = element.goToFirstEmptyDropZone;

        return baseElement;
      }

      // Determine the correct pageX/Y position for touch or mouse events.

      var TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];

      var MOUSE_EVENTS = ['mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout',
        'mouseenter', 'mouseleave'];

      function pointerPosition(event) {
        var type  = event.type;
        var point = {x: 0, y: 0};
        if (_.includes(TOUCH_EVENTS, type)) {

          var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

          point.x = touch.pageX;
          point.y = touch.pageY;

        } else if (_.includes(MOUSE_EVENTS, type)) {

          point.x = event.pageX;
          point.y = event.pageY;

        } else
          console.log('pointerPosition() - Whoops!  I did not expect a "' + event.type + '" event.');

        return point;
      }

      function rememberPosition() {
        if (!angular.isDefined(dragElement.rememberPosition)) {
          // If the item is dropped somewhere where there are no acceptable
          // dropZones, we want it to return to wherever it was when the
          // drag started.

          var top = dragElement.get(0).style.top;
          var left = dragElement.get(0).style.left;
          var home = {left: left, top: top};

          dragElement.goHome = function () {
            dragElement.zone = null;
            dragElement.domElement.setAttribute('zone', 'UNDROPPED');

            dragElement.css(home);
          };
        }

        // If the item is dropped somewhere where there are no acceptable
        // dropZones, we want it to return to wherever it was when the

        var dragPosition = {left: dragElement.css('left'), top: dragElement.css('top')};

        dragElement.goToDragPosition = function () {

          dragElement.css(dragPosition);

          // It's possible that the original position was on a drop
          // zone.  If so, we want the item dropped back on it.

          var dropZone = dragAndDrop.matchingDropZone(dragElement);

          if (dropZone) {
            // Drop this dragItem on the dropZone

            dragAndDrop.drop(dragElement, dropZone, $scope);
            /*
             updateAnswer(dragElement, dropZone);*/
          }
        };
      }

      function itemDropped(element, scope) {
        // broadcast event in case of this object being dropped, to be handled by drop targets

        if (element == null)
          console.log('dragItem.itemDropped() - element is null!');

        var dropZone = dragAndDrop.matchingDropZone(element);

        element.css('zIndex', 1);

        if (dropZone) {

          if (element.isClone) {

            if (dropZone.occupied()) {
              // Presumably, the current occupant is a clone. Before
              // we continue, we need to remove it from the DOM and
              // mark the drop zone as empty.

              //console.log('Removing current occupant of dropZone ' + dropZone.id +
              //            ' - ' + dropZone.occupant.id);

              $(dropZone.occupant).remove();

              dropZone.occupant = null;
              dropZone.domElement.setAttribute('occupant', 'NONE');
            }
          }

          if (scope.itemDropped) {

            // Execute the games's callback.  It's their responsibility
            // to do things like handling any previous occupant of the
            // dropZone and updating the answer.

            scope.itemDropped(element, dropZone);
          }
          else {

            // Drop this dragItem on the dropZone and update any
            // answer that is associated with the dragItem and/or
            // dropZone.

            dragAndDrop.drop(element, dropZone, scope);
          }

        } else {
          badlyDropped(element);
        }
      }

      function badlyDropped(element) {
        var handler = $scope.itemBadlyDropped;

        if (handler) {
          if (typeof handler == 'function')
            handler(element);
          else
            console.log('dragItem.badlyDropped() - the "itemBadlyDropped" element is not a function!');
        }
        else {
          if (element.isClone) {
            //console.log('Removing ' + element.id + ' from DOM');

            $(element).remove();
          }
          else {
            if (element.goHome)
              element.goHome();
          }
        }
      }

      /*   function updateAnswer(element, dropZone) {
       dragAndDrop.updateAnswer(element, dropZone);
       }*/

      var groupIDView;

      createGroupIDView();


      function showBorder(status) {
        if (status) {
          $element.append(groupIDView);
        } else {
          groupIDView.remove();
        }
      }

      function createGroupIDView() {
        var html  = '';
        var style = 'style="position: absolute; left: 7px; top: 1px; background-color: black; ' +
          'color: yellow; font-size: 6px;"';

        html = addSpan(html, 'G', $attrs.group);

        groupIDView = $compile(html)($scope);

        function addSpan(html, prefix, id) {
          if (id) {
            if (html.length > 0)
              html += ' ';

            html += '<span ' + style + '>' + prefix + ':' + id + '</span>';
          }

          return html;
        }
      }

      // By default, if an item is dropped somewhere where there are no acceptable drop
      // zones, it will return to the position it was given in the dragItem directive.
      //
      // If it has a "remember-position" attribute then, instead of returning to its
      // original position, it will go to the place it was when the drag started.
      //
      // If it has a "dont-go-home" attribute then it will always remain where it was
      // dropped, even if there is no dropZone there.

      if (angular.isDefined($attrs.rememberPosition))
        dragElement.rememberPosition = true;
      else if (angular.isUndefined($attrs.dontGoHome)) {
        var home = {left: $element.css('left'), top: $element.css('top')};

        dragElement.goHome = function () {
          if (dragElement.zone != null) {

            if (typeof dragElement.zone.domElement === 'undefined')
              dragElement.zone[0].setAttribute('occupant', 'NONE');
            else
              dragElement.zone.domElement.setAttribute('occupant', 'NONE');

            dragElement.zone.occupant = null;

            dragElement.domElement.setAttribute('zone', 'UNDROPPED');
            dragElement.zone = null;
          }

          dragElement.css(home);
        };
      }

      dragAndDrop.registerDragItem(dragElement);

      /*  component.annunciator($scope, $element, $attrs, 'tick');
       component.annunciator($scope, $element, $attrs, 'cross');*/
    }


  };

  /* function clearAnswer(element) {
   if (element.answer) {
   games.userAnswers[element.answer] = null;
   }
   else {
   var zone = element.zone;

   if (zone && zone.answer)
   games.userAnswers[zone.answer] = null;
   }
   }
   */
  function parseValue(text) {
    var value;

    if (text.match(/^\d+$/)) {
      value = text;
    } else {
      // Presumably, this is a reference to games data

      value = activity.resolve(text);
    }

    //console.log('InteractiveElement.parseValue() - text = "' + text + '" resolvees to "' + value + '"');

    return value;
  }
}
module.exports = /*@ngInject*/ dragItem;