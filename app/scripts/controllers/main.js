'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('MainCtrl', function ($rootScope,$scope) {
	  $rootScope.Users=$scope.Users;
	  $scope.selected = [];
	  $scope.show=function(data){
		  console.log(data);
	  }
$scope.formatLabel = function(model) {
    for (var i=0; i< $scope.Users.length; i++) {
      if (model === $scope.Users[i].email) {
        return $scope.Users[i].firstName + " "+$scope.Users[i].lastName ;
      }
    }
  }
  });
