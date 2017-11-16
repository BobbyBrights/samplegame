app.directive('svgMap', ['$compile', '$rootScope', function ($compile, $rootScope) {
    return {
        restrict: 'A',
        templateUrl: function(element, attrs) {
                console.log('set class',attrs.svgno);
                return "./js/human/img/asset"+ attrs.svgno + ".svg";
        },
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.human');
            classNo = attrs.val;
            $rootScope.temp = attrs.setClass;
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                regionElement.attr("dummy-data", "dummyData");
                regionElement.attr("hover-region", "hoverRegion");
                regionElement.attr("class-no", "classNo");
                regionElement.attr("set-class", "setClass");
                $compile(regionElement)(scope);
            })
        }    
    }

}]);
app.directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'AE',
        scope: {
            dummyData: "=",
            hoverRegion: "=",
            classNo: "=",
            setClass: "="
        },
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            scope.regionClick = function () {                
                alert(scope.elementId);
            };
            //console.log(scope.setClass);
            scope.regionMouseOver = function () {
                scope.hoverRegion = scope.elementId;
                element[0].parentNode.appendChild(element[0]);
                scope.myclass = scope.hoverRegion==scope.elementId ? 'score'+scope.setClass : '';
                console.log(scope.setClass)
            };
            element.attr("ng-click", "regionClick()");
            //element.attr("ng-attr-fill", "{{dummyData[elementId].value | map_colour}}");
            element.attr("ng-click", "regionMouseOver()");
            element.attr("ng-class", "myclass")
            element.removeAttr("region");
            $compile(element)(scope);
        }
    }
}]);