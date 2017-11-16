// jshint ignore: start
/**
 * Directive to handle drop targets, can be used generically for all drag and drop kind of activities
 */


function dropZone($compile, $rootScope, dragAndDrop) {
  return {
    restrict: 'AE',
    replace : true,
    link    : function ($scope, $element, $attrs) {
      var element        = $($element[0]);
      element.group      = $attrs.group;
      element.domElement = $element[0];

      element.id = $attrs.id;

      element.domElement.setAttribute('id', element.id);

      element.occupant = null;


      element.domElement.setAttribute('occupant', 'NONE');

      var groupIDView;

      createGroupIDView();


      if (angular.isDefined($attrs.showBorder)) {
        showBorder(true);
      }

      // Add a border, and the dropZone's group number
      function showBorder(status) {
        if (status) {
          $element.append(groupIDView);
        } else {
          groupIDView.remove();
        }
      }

      function createGroupIDView() {
        var html  = '';
        var style = 'style="position: absolute; left: 7px; top: 1px; background-color: black; color: yellow; font-size: 6px;"';

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

      element.occupied     = function () {
        return element.occupant != null;
      };
      element.collidesWith = function (dropped) {
        // console.log('dropped',dropped, $(element).overlaps(dropped));
        // console.log('overlaps =>', $(element).overlaps(dropped).length)
        return $(element).overlaps(dropped).length > 0;
      };

      dragAndDrop.registerDropZone(element);
    }
  };
}
module.exports = /*@ngInject*/ dropZone;