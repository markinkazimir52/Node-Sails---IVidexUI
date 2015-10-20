angular.module('iVidexApp').controller('LoginCtrl', ['$rootScope','$scope','API','$location',function ($rootScope,$scope,API,$location) {
	$scope.loading=false;
	  $scope.user="alexis@gmail.com";
	  $scope.pass="12345678";
	$scope.login= function(user,pass){
  	  
		$scope.loading=true;
		data={
    		"email": user,
    		"password": pass
			};

		API.login(data).then(
			function(res){
				if(res.status==200)
					{
						console.log(res);
						$rootScope.User=res.data;
						
						API.getToken().then(function(res){
							$rootScope.token=res.data['token'];
						}, function(reason){console.log(reason)});
						
						API.getUsers().then(function(users){
								if(users.status=200){
									$rootScope.Users=users.data.users;
								$location.url('main/');
								}else{console.log(res)}
						
							},
							function(reason){
								console.log(reason);
								$scope.loading=false;
							});
						
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
				alert("generic error at login.js line 23");
				$scope.loading=false;
			}
			console.log(reason)
		});
	}
	
   
  }]);