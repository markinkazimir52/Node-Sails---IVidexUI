'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('typeCtrl', function (API,$location,$rootScope,$scope,$state) {
	  
	  $scope.getPatient=function(userObj){
		  var id=userObj['id'];
		  $rootScope.currentPatient=userObj
		  API.getPatient(id).then(function(res){
			  
			  $rootScope.currentPatient.prescriptions=res.data;
			  $state.go('patient',{id:id});
		  }, function(reason){console.log(reason)});
		  
	  }
	  

  });
