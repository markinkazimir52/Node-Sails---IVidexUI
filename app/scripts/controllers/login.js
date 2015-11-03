angular.module('iVidexApp').controller('LoginCtrl', ['$rootScope','$scope', '$state' , 'API','$location','ngProgressLite',function ($rootScope,$scope,$state,API,$location,ngProgressLite) {
	$scope.loading=false;
	  $scope.user="peter@philipphysicaltherapy.com";
	  $scope.pass="iVidex2015";
	$scope.login= function(user,pass){
		ngProgressLite.start();
		$scope.loading=true;
		var formData={
    		"email": user,
    		"password": pass
			};

		API.login(formData).then(
			function(res){
				if(res.status==200)
					{
						console.log(res);
						$rootScope.User=res.data;
						$state.go('main');
						/* API.getToken().then(function(res){
							$rootScope.token=res.data['token'];
						}, function(reason){console.log(reason)});
							
						API.getUsers().then(function(users){
								if(users.status=200){
									$rootScope.Users=users.data.users;
								$state.go('main');
								}else{console.log(res)}
						
							},
							function(reason){
								console.log(reason);
								$scope.loading=false;
							});
							
							 */
						

						
							}
						
				else {
					//console.log(res);
					$scope.loading=false;
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
		});
	}
	
   
  }]);