angular.module('iVidexApp').factory('API',['$http','$rootScope','$q', function ($http,$rootScope,$q) 
	{
		// var server="http://54.89.89.127:1337";  // dev.ividex
		// var server="http://52.91.185.218:1337";  // ividex
		var server="http://localhost:1337";  // localhost
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
						
						deleteAuth: function(id){
							var path="/auth/"+id;
							return $http.delete(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						deleteUser: function(id){
							var path="/user/"+id;
							return $http.delete(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						getRoles: function(){
							var path="/role";
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								cache:false
							});
						},
						getUsers: function(){
							var path="/role/patient";
							return $http.get(server+path,{
				          		headers: {
									
				            		"Content-Type": "application/json"
				          				},
								cache:false
							});
						},
						newPatient: function(data){
							var path="/Auth/register"
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						newPrescription: function(data){
							var path="/prescription";
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						updateEx: function(id,data){
							var path="/exercise/"+id;
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						deleteEx: function(id){
							var path="/exercise/"+id;
							return $http.delete(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						postExToPrescription: function(data){
							var path="/exercise";
							
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						postExercise: function(data){
							var path="/exercise";
							
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						savePrescription: function(id,data){
							var path="/prescription/"+id;
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						deletePrescription: function(id){
							var path="/prescription/"+id;
							return $http.delete(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						getPatient: function(id){
							var path="/user/"+id+"/active-rx"
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
										
								cache:false
							});
						},
						getPatientInfo: function(id){
							var path="/user/"+id;
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								cache:false
							});
						},
						getAreas: function(){
							var path="/therapy_area";
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								cache:false
							});
						},
						getVideos: function(){
							var path="/video";
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								cache:false
							});
						},
						updateVideo: function(id,data){
							var path="/video/"+id;
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						postVideo: function(data){
							var path="/video";
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						updateVideo: function(data, id){
							var path="/video/"+id;
							return $http.put(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						getTips: function(){
							//data.access_token=$rootScope.token;
							var path="/tip";
							return $http.get(server+path,{
				          		headers: {
									
									
				            		"Content-Type": "application/json"
				          				},
								cache:false
							});
						},
						postTip: function(data){
							var path="/tip";
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						postToTip: function(id,data){
							var path="/tip/"+id;
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						postToTiptype: function(id,data){
							var path="/tiptype/"+id;
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						deleteTip: function(id){
							var path="/tip/"+id;
							return $http.delete(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						getLinks: function(){
							var path="/link";
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								cache:false
							});
						},
						postLink: function(data){
							var path="/link";
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						deleteLink: function(id){
							var path="/link/"+id;
							return $http.delete(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						getProtocols: function(){
							var path="/protocol"
							return $http.get(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								cache:false
							});
						},
						postProtocol: function(data){
							var path="/protocol";
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						postToProtocol: function(id,data){
							var path="/protocol/"+id;
							return $http.post(server+path,data,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
						deleteProtocol: function(id){
							var path="/protocol/"+id;
							return $http.delete(server+path,{
				          		headers: {
				            		"Content-Type": "application/json"
				          				},
								
								cache:false
							});
						},
					    getVideoById: function(id){
					    	var path="/video/"+id;

							return $http.get(server+path, {
				          		headers: {
				            		"Content-Type": "application/json"
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
   			 if(rejection.status===403){  
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