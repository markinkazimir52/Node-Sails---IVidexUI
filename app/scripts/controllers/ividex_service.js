angular.module('iVidexApp').factory('API',['$http','$rootScope','$q', function ($http,$rootScope,$q) 
	{
		var server="http://52.91.185.218:1337";
		return {
			
			
					
					
					login: function (data)
						{						
							var path="/auth/login";
							return $http.post(server+path,data, {
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
				          		cache: false
				        	});
						} ,
					/* getToken: function ()
						{						
							var path="/user/jwt";
							return $http.get(server+path,data, {
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
				          		cache: false
				        	});
						} ,*/
						
						getUsers: function(){
							var path="/role/patient"
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json",
									"access_token":$rootScope.token
				          				},
								cache:false
							});
						},
						getPatient: function(id){
							var path="/user/"+id+"/active-rx"
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json",
									"access_token":$rootScope.token
				          				},
								cache:false
							});
						},
						getAreas: function(){
							var path="/therapy_area"
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json",
									"access_token":$rootScope.token
				          				},
								cache:false
							});
						},
						getVideos: function(){
							var path="/video"
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json",
									"access_token":$rootScope.token
				          				},
								cache:false
							});
						},
						getTips: function(){
							var path="/tip"
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json",
									"access_token":$rootScope.token
				          				},
								cache:false
							});
						},
						getLinks: function(){
							var path="/link"
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json",
									"access_token":$rootScope.token
				          				},
								cache:false
							});
						}
					    
					

				}
	}]);
	
     	angular.module('iVidexApp').factory('myInterceptor', ['$q','$rootScope', 'ngProgressLite', function($q,$rootScope,ngProgressLite) {  
		    var responseInterceptor = {
		        'responseError': function(rejection) {
				      // do something on error 
				if(rejection.status===401){  
				   alert('Wrong Email Password combination')
				   console.log($rootScope);
				//console.log($q);  
					 ngProgressLite.done();      
					
				} 
			   
			/// Questo è da spostare nella response function
			 if(rejection.status===422){  
					console.log(rejection) 
					//$rootScope.errors=rejection.data.errors;
					ngProgressLite.done();
				     return $q.reject(rejection);
				
				}
				
				
					ngProgressLite.done();
				      console.log(rejection);
				//alert(rejection.data.errors.toString());
				 //return $q.defer();       
				return $q.reject(rejection);
				    }
		    };

		    return responseInterceptor;
		}]);   
	angular.module('iVidexApp').config(['$httpProvider', function($httpProvider) {  
		    $httpProvider.interceptors.push('myInterceptor');
		}]);