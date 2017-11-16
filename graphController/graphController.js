app.controller('graphController', function ($rootScope, $scope, $q, $http, PatientService, $location, REST_URL, $stateParams, $state, DashboardService) {
    $scope.patientId = $stateParams.patientId;
    $scope.optionsVisibility = false;
    $scope.option_text = "More Options";
    var displayName = [];
    var displayDashboard = [];
    var graphdata ={
        Date : []
    };

    $scope.roles = [];
    $scope.user = {
         roles: ['Systolic']
    };
    $scope.series = [];
    $scope.data = [];
    
    $scope.getOpdGraphDetails = function () {
         var deferred = $q.defer();
        PatientService.getOpdGraphDetails(REST_URL, $scope.patientId)
        .then(function (result) { 
             deferred.resolve(result);        	
            $scope.totalDisplay = result.data.display_data;           
            for(var j=0; j<$scope.totalDisplay.length; j++){
                $scope.totalDisplay[j].display_name = $scope.totalDisplay[j].display_name.replace(/\/ /g, '_');
                graphdata[$scope.totalDisplay[j].display_name] = [];
            }
            
            angular.forEach(result.data.display_data, function(value, key){
                var i = 0;
                value.display_name = value.display_name.replace(/\/ /g, '_');
                displayName.push(value.display_name);
                $scope.roles.push(value.display_name);
                if(value.display_on_dashboard === '1'){               
                    displayDashboard.push(value.display_name);                
                    $scope.user = {
                         roles: displayDashboard
                    };
                    $scope.series.push(value.display_name)
                }
                i++
            });
            angular.forEach(result.data.graph_data, function (val) {            		
            		graphdata.Date.push(val.OPDDate);
            })

            angular.forEach(displayName, function (value, key) {            	
            	angular.forEach(result.data.graph_data, function (value2, key2) {            		
            		graphdata[value].push(value2[value]);            		
            	})                 
        	});
        })
	};

    $scope.checkFirst = function() {
         $scope.user.roles.splice(0, $scope.user.roles.length); 
    };

    $scope.optionValue = function(e){        
        var currIndex = $scope.series.indexOf(e.target.id);
        var orignalIndex = displayName.indexOf(e.target.id);
            if($scope.series.indexOf(e.target.id) != -1){
                $scope.series.splice(currIndex, 1);
                $scope.data.splice(currIndex, 1)                    
                if(e.target.id == "Systolic"){
                    $scope.series.splice(currIndex, 1);
                    $scope.data.splice(currIndex, 1)
                    $scope.user.roles.splice(currIndex , 1);
                }
                if(e.target.id == "Diastolic"){
                    $scope.series.splice(currIndex - 1, 1);
                    $scope.data.splice(currIndex - 1, 1)
                    $scope.user.roles.splice(currIndex - 1 , 1);
                }
            }else{            	
                $scope.data.push(graphdata[e.target.id])
                $scope.series.splice($scope.series.length, 0, e.target.id);
                if(e.target.id == "Systolic"){
                    $scope.data.push(graphdata['Diastolic'])
                    $scope.series.splice($scope.series.length, 0, 'Diastolic');
                    $scope.user.roles.splice($scope.series.length, 0, 'Diastolic');
                }
                if(e.target.id == "Diastolic"){
                    $scope.data.push(graphdata['Systolic'])
                    $scope.series.splice($scope.series.length - 1, 0, 'Systolic');
                    $scope.user.roles.splice($scope.series.length - 1 , 0, 'Systolic');
                }
            }
    }
    $scope.getOpdGraphDetails();

    $scope.labels = graphdata.Date;
    setTimeout(function() {
        for(var k=0; k<displayDashboard.length; k++){            
            $scope.data.push(graphdata[displayDashboard[k]]);
        } 
    }, 500);
    $scope.options = {
        scaleShowVerticalLines: false,
        scaleShowLabels: true,
        scaleLineWidth: 1,
        scaleLineColor: "rgba(0,0,0,0.3)",
        scaleShowHorizontalLines: false,
        scaleGridLineWidth: 0,
        scaleShowGridLines: false,                
        pointDotRadius: 5,
        pointHitDetectionRadius: 10,
        backgroundColor:"rgb(255,255,255,0)",  
        datasetFill : false,              
        fill: false,
        legend: {
            position: 'bottom', 
            borderColor: "rgba(75,192,192,0)",              
            display: true
        },
        scales: {
             xAxes: [{
                  gridLines: {
                       display: false
                  }
               }],
             yAxes: [{
                  gridLines: {
                       display:false
                  }
               }]
             },
        elements: {
            line: {
                    fill: false
            }
        }     
        };
      
    //Chart.defaults.global.elements.line.fill = false;
    
    $scope.onHover = function (points) {
        if (points.length > 0) {
            console.log('Point', points[0].value);
        } else {
            console.log('No point');
        }
    }; 
   
    
    $scope.showOption = function(){
        $scope.optionsVisibility = !$scope.optionsVisibility;
        $scope.option_text = (!$scope.optionsVisibility) ? "More Options":"Hide Options";
        //$scope.graphVisibility = false;
        //$scope.data = []
        //$scope.series = [];
        //$scope.user.roles = [];
    }  
 

});
