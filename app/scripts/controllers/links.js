'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('LinksCtrl', function ($scope,promise,ngProgressLite,API,$uibModal) {
	  
	  
	  ngProgressLite.done();
	  
	  
	  $scope.links=promise.data;
	  
	  
	  $scope.deleteLink=function(id,index){
		  
		   ngProgressLite.start();
		   
		  API.deleteLink(id).then(function(res){
			  $scope.links.splice(index,1);
			  ngProgressLite.done();
		  },function(reason){console.log(reason)});
	  	
	  }
	  
	  
  	 $scope.open = function (size) {
 	  
  		      var modalInstance = $uibModal.open({
  		        animation: true,
  		        templateUrl: 'views/newLinkModal.html',
  		        controller: 'newLinkModalCtrl',
  		        size: size,
   		        resolve: {
   		          promise: function () {
					  var r={};
   					  return r;	
   		          }       
   		        }
			});

  		      modalInstance.result.then(function (link) {
 				  $scope.links.push(link);
  		      }, function () {});
			  
 	}
  	
	  
  });
  angular.module('iVidexApp').controller('newLinkModalCtrl', function ($scope, $modalInstance, promise,API) {
	  $scope.promise=promise;
	  $scope.newLink=function(){
	  	
		  var data={
			  "title":$scope.title,
	    	  "url":$scope.url
		  }
		  API.postLink(data).then(function(res){
		  	
			$modalInstance.close(res.data);
		  },function(reason){console.log(reason)});
	  }
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      }
	  
	  
	
  });