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
angular.module('iVidexApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });