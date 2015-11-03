'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.Promises
 * @description
 * # Promises
 * Promises of the ui.router module
 */
var emptyPromise = ['$rootScope','$cookies','$q','$timeout','$state','$stateParams','API','ngProgressLite',function($rootScope,$cookies,$q, $timeout,$state,$stateParams,API,ngProgressLite) {
var defer = $q.defer();
}];

var loadPatients = ['$rootScope','$cookies','$q','$timeout','$state','$stateParams','API','ngProgressLite',function($rootScope,$cookies,$q, $timeout,$state,$stateParams,API,ngProgressLite) {
	ngProgressLite.start();
        	
   var defer = $q.defer();           
			

   	//ngProgressLite.start();
	    
	API.getUsers().then(function(users){
			if(users.status=200){
				$rootScope.Users=users.data.users;
			defer.resolve({data:$rootScope.Users}); 
			}else{console.log(res)}
	
		},
		function(reason){
			console.log(reason);
			//$scope.loading=false;
			return defer.promise;  
		});
		
	 return defer.promise;  	
		
		
		
	
		
	    
	 
   	
}];