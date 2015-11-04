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

var loadProtocols = ['$rootScope','$cookies','$q','$timeout','$state','$stateParams','API','ngProgressLite',function($rootScope,$cookies,$q, $timeout,$state,$stateParams,API,ngProgressLite) {
	ngProgressLite.start();
        	
   var defer = $q.defer();           

	API.getProtocols().then(function(protocols){
			if(protocols.status=200){
				$rootScope.Protocols=protocols.data;
				
				defer.resolve({data:$rootScope.Protocols}); 
			}else{console.log(res)}
	
		},
		function(reason){
			console.log(reason);
			//$scope.loading=false;
			return defer.promise;  
		});
		
	 return defer.promise;  	
}];

var loadTips = ['$rootScope','$cookies','$q','$timeout','$state','$stateParams','API','ngProgressLite',function($rootScope,$cookies,$q, $timeout,$state,$stateParams,API,ngProgressLite) {
	ngProgressLite.start();
        	
   var defer = $q.defer();           

	API.getTips().then(function(tips){
			if(tips.status=200){
				$rootScope.tips=tips.data;
				
				defer.resolve({data:$rootScope.tips}); 
			}else{console.log(res)}
	
		},
		function(reason){
			console.log(reason);
			//$scope.loading=false;
			return defer.promise;  
		});
		
	 return defer.promise;  	
}];
var loadLinks = ['$rootScope','$cookies','$q','$timeout','$state','$stateParams','API','ngProgressLite',function($rootScope,$cookies,$q, $timeout,$state,$stateParams,API,ngProgressLite) {
	ngProgressLite.start();
        	
   var defer = $q.defer();           

	API.getLinks().then(function(links){
			if(links.status=200){
				$rootScope.links=links.data;
				
				defer.resolve({data:$rootScope.links}); 
			}else{console.log(res)}
	
		},
		function(reason){
			console.log(reason);
			//$scope.loading=false;
			return defer.promise;  
		});
		
	 return defer.promise;  	
}];
var loadVideos = ['$rootScope','$cookies','$q','$timeout','$state','$stateParams','API','ngProgressLite',function($rootScope,$cookies,$q, $timeout,$state,$stateParams,API,ngProgressLite) {
	ngProgressLite.start();
        	
   var defer = $q.defer();           

	API.getVideos().then(function(videos){
			if(videos.status=200){
				$rootScope.videos=videos.data;
				
				defer.resolve({data:$rootScope.videos}); 
			}else{console.log(res)}
	
		},
		function(reason){
			console.log(reason);
			//$scope.loading=false;
			return defer.promise;  
		});
		
	 return defer.promise;  	
}];