app.controller('MainCtrl', ['$scope', '$rootScope', function ($scope , $rootScope) {
        $scope.scaleColor = ['green','#018000','#61b000','#c0e000','#fff500','#ffdb00',
        '#ffc200','#ffa900','#ff7900','#ff4200', '#ff0800'];  
        $scope.changeHoverRegion = function (region) {
            $scope.hoverRegion = region;
        };
        $scope.setClass = 0;
        var textArr = ['Front Side', 'Back Side', 'Head', 'Left Side', 'Right Side']
        $scope.btns = ['Front', 'Back', 'Head', 'Left', 'Right']
        $scope.scaleSet = function(n){
            $scope.setClass = n;
        }        
        $scope.sideFlag = {
            side : 0
        }
        $scope.sideText = "Full Body";
        $scope.btnText = "Back";  
        $scope.showbody = false;
        $scope.frontview = true;
        $scope.headChange = function(event){
            $scope.showbody = true;
            $scope.frontview = false;
            $scope.sideFlag = {
                side : event.target.id
            }
            if(event.target.id <5){
                $scope.sideText = textArr[event.target.id];
            }else if(event.target.id == 'back'){
                $scope.showbody = false;
                $scope.frontview = true;
                $scope.sideText = "Full Body";
            }
            else{
                $scope.sideText = textArr[event.target.id - 6];
            }
        }     
        $scope.sideChange = function(){
            if(!$scope.sideFlag){
                $scope.btnText = "Front";  
            }
            else{
                $scope.btnText = "Back";                
                $scope.setClass = 3;                
            }
        }
    }]);