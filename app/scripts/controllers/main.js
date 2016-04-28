'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('MainCtrl', function (API,$location,$rootScope,$scope, ngProgressLite,promise,$state,$uibModal) {
	  ngProgressLite.done();
	 // $rootScope.Users=$scope.Users;
	 $scope.Users=promise.data
	  $scope.selected = [];
	 
	 
	  $scope.getPatient=function(userObj){
		  var id=userObj['id'];
		  $rootScope.currentPatient=userObj;
		   $state.go('patient',{id:id});
	   }
	   
	   
 	 $scope.open = function (size) {
		
	  API.getRoles().then(function(res){
		  var r = res.data;
 		      var modalInstance = $uibModal.open({
 		        animation: true,
 		        templateUrl: 'views/newUserModal.html',
 		        controller: 'ModalNewUserCtrl',
 		        size: size,
  		        resolve: {
  		          roles: function () {
  					  return r;	
  		          }       
  		        }
 		      });

 		      modalInstance.result.then(function (userObj) {
				  
				  
				  $scope.getPatient(userObj);
				  
				  
 		        
 		      }, function () {
 		        console.log('Modal dismissed at: ' + new Date());
 		      });
			  
			});
 		
 	};
	  
$scope.formatLabel = function(model) {
    for (var i=0; i< $scope.Users.length; i++) {
      if (model === $scope.Users[i].email) {
        return $scope.Users[i].firstName + " "+$scope.Users[i].lastName ;
      }
    }
  }
  });
  angular.module('iVidexApp').controller('ModalNewUserCtrl', function ($state,$rootScope,$scope, $modalInstance, roles,API) {
	  
		 $scope.roles=roles;  
		 console.log(roles);
      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };
	  $scope.isEmpty = function(value){
		  console.log(value);
		  if(value=="<br>" || value=="")
			  {	return false	}
		  else
			  {	return true }
		  
		
	  }
	  $scope.newPatient=function(){
		  
				  //get patient role id
				  var role_id;
				  angular.forEach(roles, function(role, key) {
			  
					  console.log(role.name);
					  if (role.name=="patient")
						  { role_id=role.id;}
				  });
		  
				  var data={
		   		   	"firstName":$scope.first,
		    		  "lastName":$scope.last,
    
		    		  "email": $scope.email,
		    		  "password":"iVidex2015",
					  "role":role_id
				  }
				  console.log(data);
		
		
				  API.newPatient(data).then(function(res){
		
					
					  if (res.status==200){
				  		//POST new prescription with res.data.auth.id as user id
						  var data={
						    "client":res.data.auth.id,
						    "surgeryDate":new Date(),
						    "injury":"Injury",
						    "text":"Indications for patient"
						  }
						  
						  API.newPrescription(data).then(function(a){
						  	
							$modalInstance.close(res.data.auth);
							
						  },function(reason){
						if(reason.status!=""){
							alert("server said: "+reason.status+" -- "+reason.statusText);
							$scope.loading=false;
						}
						else{
							alert("generic error at login.js line 49");
							$scope.loading=false;
						}
						console.log(reason)
					});
						  
						  
				 
						  
			  	
					  }
				  },
					function(reason){
						if(reason.status!=""){
							alert("server said: "+reason.status+" -- "+reason.statusText);
							$scope.loading=false;
						}
						else{
							alert("generic error at login.js line 49");
							$scope.loading=false;
						}
						console.log(reason)
					})

	  }
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });