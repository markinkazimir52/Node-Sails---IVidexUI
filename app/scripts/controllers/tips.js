'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('TipsCtrl', function ($scope, promise,ngProgressLite) {
	  ngProgressLite.done();
	  $scope.tips=promise.data;
	  $scope.expand = function(index){
		   if($scope.tips[index]['open']){
		  	$scope.tips[index]['open']=!$scope.tips[index]['open']
		  } else {
		  	 $scope.tips[index]['open']=true;
		  }
			  
		 
	  }
  });
