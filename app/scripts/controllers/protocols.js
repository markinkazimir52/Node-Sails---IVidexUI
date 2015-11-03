'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('ProtocolsCtrl', function ($log,API,$rootScope,$scope, $uibModal) {
	  $scope.currentPatient=$rootScope.currentPatient;
	  //$scope.areas= ['area1', 'area2', 'area3'];
	
	 
	 $scope.open = function (size) {
		
	
		  API.getAreas().then(function(res){
			   var a=res.data;
		      var modalInstance = $uibModal.open({
		        animation: true,
		        templateUrl: 'views/myModalContent.html',
		        controller: 'ModalInstanceCtrl',
		        size: size,
		        resolve: {
		          areas: function () {
					  
				  
					  return a;	
		          }       
		        }
		      });

		      modalInstance.result.then(function (selectedItem) {
		        $scope.selected = selectedItem;
		      }, function () {
		        $log.info('Modal dismissed at: ' + new Date());
		      });
		  
		});
	};
	    
		
  });
  angular.module('iVidexApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, areas) {
	  console.log("areas");
	  $scope.items=areas;
       $scope.selected = {
        item: areas[0]
      };
		  

      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });