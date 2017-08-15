// jshint ignore: start
function dragAndDrop($timeout) {
  var restrictDroppingByGroup = true; // Can dragItems only be dropped on dropZones with the same group?

  var dragItems = [];
  var dropZones = [];
  var dropAreas = [];

  function registerDropZone(dropZone) {
    dropZones.push(dropZone);
  }

  function registerDragItem(dragItem) {
    dragItems.push(dragItem);
  }

  function registerDropArea(dropArea) {
    dropAreas.push(dropArea);
  }

  function matchingDropZone(dragItem) {
    // We assume the drop zones are sufficiently separated
    // that we really only care about the first one we find
    // which overlaps the dragItem.

    var collisions = [];

    for (var i = 0; i < dropZones.length; i++) {
      var dropZone = dropZones[i];

      // If the drag item has a "group" attribute then we only want it to
      // be dropped on zones with the same group.

      if (angular.isDefined(dragItem.group) && dragItem.group !== dropZone.group) {
        if (restrictDroppingByGroup) {
          continue;
        }
      }

      if (dropZone.collidesWith(dragItem)) {
        collisions.push(dropZone);
      }
    }

    function attributes(element) { // jshint ignore:line
      return ((element !== null && element.id !== null) || 'UNKNOWN') + ' {top: ' + element.css('top') +
        ', left: ' + element.css('left') +
        ', width: ' + element.css('width') +
        ', height: ' + dragItem.css('height') + '}';
    }

    var dragItemCentre   = centre(dragItem);
    var closestCollision = null;

    if (collisions.length > 0) {
      var closestDropZone = null;
      var closestMeasure  = -1;

      for (var d = 0; d < collisions.length; d++) {
        var dropZoneCollide = collisions[d];
        var dropZoneCentre  = centre(dropZoneCollide);
        var measure         = distanceMeasure(dragItemCentre, dropZoneCentre);

        if (closestMeasure < 0 || measure < closestMeasure) {
          closestMeasure  = measure;
          closestDropZone = dropZoneCollide;
        }
      }

      closestCollision = closestDropZone;
    }

    //if (closestCollision !== null)
    //    console.log('dragAndDrop.matchingDropZone() - closest dropZone is ' + closestCollision.id);

    return closestCollision;
  }

  function drop(dragItem, dropZone, scope) {
    if (angular.isDefined(scope.itemDropped)) {
      var itemDropped = scope.itemDropped;

      if (typeof itemDropped === 'function')
        itemDropped(dragItem, dropZone);
      else
        console.log('dragAndDrop.drop() - the "itemDropped" property of $scope is not a function!');

    } else {
      // If there is already an item sitting in this location,
      // we want to replace it.  So, move the current item to
      // the first empty drop zone (that matches its group, if
      // it has one).

      displaceCurrentItem(dragItem, dropZone);

      placeItem(dragItem, dropZone);
    }
  }

  function displaceCurrentItem(droppedItem, dropZone) {
    for (var i = 0; i < dragItems.length; i++) {
      var dragItem = dragItems[i];

      if (dragItem === droppedItem)
        continue;

      if (dropZone.collidesWith(dragItem)) {
        var newZone = firstEmptyDropZone(dragItem.group);

        if (newZone === null) {
          dragItem.goHome();
        }
        else
          placeItem(dragItem, newZone);
      }
    }
  }

  function firstEmptyDropZone(group) {
    for (var i = 0; i < dropZones.length; i++) {
      var dropZone = dropZones[i];

      if (group && dropZone.group !== group)
        continue;

      var empty = true;

      for (var j = 0; j < dragItems.length; j++) {
        if (dropZone.collidesWith(dragItems[j])) {
          empty = false;
          break;
        }
      }

      if (empty)
        return dropZone;
    }

    return null;
  }

  function placeItem(dragItem, dropZone) {
    // We want to centre the dropped item in the drop zone.
    //
    // The way to do that is to set the "top" of the item to be the
    // same as the drop zone, plus half the difference between their
    // heights and the "left" of the dropped item needs to be the left
    // of the drop zone plus half the difference between their widths.

    var dropZoneTop  = parseInt($(dropZone).css('top'));
    var dropZoneLeft = parseInt($(dropZone).css('left'));

    var dropMarginTop   = parseInt($(dropZone).css('margin-top'));
    var dropMarginLeft  = parseInt($(dropZone).css('margin-left'));

    var top = dropZone.get(0).style.top;
    var left = dropZone.get(0).style.left;
    var css = {
      top   : top,
      left  : left,
      zIndex: parseInt($(dropZone).css('z-index')) + 1000
    };

    dragItem.css(css);

    dragItem.zone     = dropZone;
    dropZone.occupant = dragItem;

    var dragItemDomElement = dragItem.domElement;

    if (typeof dragItemDomElement === 'undefined') {
      // The drag-item is an attribute directive (`drag-item`)
      // Set any attributes directly
      dragItem[0].setAttribute('zone', dropZone.id);
      dragItem[0].setAttribute('occupant', dragItem.id);

    } else {
      // The drag-item is an element directive (<drag-item>)
      // Set any attributes via the domElement
      dragItemDomElement.setAttribute('zone', dropZone.id);
      dragItemDomElement.setAttribute('occupant', dragItem.id);
    }

  }

  function distanceMeasure(point1, point2) {
    // NOTE: We return the square of the distance, to avoid wasting
    //       CPU cycles on taking the square-root.

    var xDelta = (point1.x - point2.x);
    var yDelta = (point1.y - point2.y);

    return (xDelta * xDelta + yDelta * yDelta);
  }

  function centre(item) {
    var top    = parseInt($(item).css('top'));
    var left   = parseInt($(item).css('left'));
    var width  = parseInt($(item).css('width'));
    var height = parseInt($(item).css('height'));

    return {x: left + width / 2, y: top + height / 2};
  }

  function allDragItems() {
    return dragItems;
  }

  function dragItemsWithGroup(group) {
    return _.filter(dragItems, function (dragItem) {
      return dragItem.group == group;
    });
  }

  function droppedItems() {
    return _.filter(dragItems, function (dragItem) {
      return dragItem.zone !== null;
    });
  }

  function droppedItemsWithGroup(group) {
    return _.filter(dragItems, function (dragItem) {
      return dragItem.group === group && dragItem.zone !== null;
    });
  }

  function undroppedItems() {
    return _.filter(dragItems, function (dragItem) {
      // We updated the value of `zone` attribute of un-dropped items to be `UNDROPPED` to support automation
      // TODO: Do we need both the checks?
      return dragItem.zone === null || dragItem.zone === 'UNDROPPED';
    });
  }

  function undroppedItemsWithGroup(group) {
    return _.filter(dragItems, function (dragItem) {
      return dragItem.group == group && dragItem.zone === null;
    });
  }

  function allDropZones() {
    return dropZones;
  }

  function dropZonesWithGroup(group) {
    return _.filter(dropZones, function (dropZone) {
      return dropZone.group === group;
    });
  }

  function occupiedDropZones() {
    return _.filter(dropZones, function (dropZone) {
      return dropZone.occupied();
    });
  }

  function occupiedDropZonesWithGroup(group) {
    var matching = dropZonesWithGroup(group);

    return _.filter(matching, function (dropZone) {
      return dropZone.occupied();
    });
  }

  function disableGroupRestrictions() {
    restrictDroppingByGroup = false;
  }

  function enableGroupRestrictions() {
    restrictDroppingByGroup = true;
  }

  return {
    // Methods for use by drag-item and drop-zone

    registerDragItem: registerDragItem,
    registerDropZone: registerDropZone,
    registerDropArea: registerDropArea,

    matchingDropZone: matchingDropZone,
    placeItem       : placeItem,
    drop            : drop,

    // Methods for use by games controllers

    firstEmptyDropZone: firstEmptyDropZone,

    allDragItems      : allDragItems,
    dragItemsWithGroup: dragItemsWithGroup,

    droppedItems         : droppedItems,
    droppedItemsWithGroup: droppedItemsWithGroup,

    undroppedItems         : undroppedItems,
    undroppedItemsWithGroup: undroppedItemsWithGroup,

    allDropZones      : allDropZones,
    dropZonesWithGroup: dropZonesWithGroup,

    occupiedDropZones         : occupiedDropZones,
    occupiedDropZonesWithGroup: occupiedDropZonesWithGroup,

    disableGroupRestrictions: disableGroupRestrictions,
    enableGroupRestrictions : enableGroupRestrictions

    /* updateAnswer:               updateAnswer*/
  };
}
module.exports = /*@ngInject*/ dragAndDrop;