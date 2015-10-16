'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('PatientCtrl', function ($scope, $uibModal) {
	  
	  $scope.areas= ['item1', 'item2', 'item3'];
	  $scope.items = ['item1', 'item2', 'item3'];
	  $scope.open = function (size) {

	      var modalInstance = $uibModal.open({
	        animation: true,
	        templateUrl: 'myModalContent.html',
	        controller: 'ModalInstanceCtrl',
	        size: size,
	        resolve: {
	          items: function () {
	            return $scope.items;
	          },
			  areas: function(){
				  return $scope.areas;
			  }
	        }
	      });

	      modalInstance.result.then(function (selectedItem) {
	        $scope.selected = selectedItem;
	      }, function () {
	        $log.info('Modal dismissed at: ' + new Date());
	      });
	    };
	    
		
  });
  angular.module('iVidexApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, areas) {

     $scope.areas = areas;
  
      $scope.items = items;
      $scope.selected = {
        area: $scope.areas[0]
      };

      $scope.ok = function () {
        $modalInstance.close($scope.selected.area);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });