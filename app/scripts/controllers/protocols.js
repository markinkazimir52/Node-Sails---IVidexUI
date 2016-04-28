'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('ProtocolsCtrl', function ($log,API,$rootScope,$scope, $uibModal,ngProgressLite) {
	  $scope.protocols=$rootScope.Protocols;
	  //$scope.areas= ['area1', 'area2', 'area3'];
	  $scope.save = function(protocol,index){
		  ngProgressLite.start();
		  var data={
			  "name":protocol['name']
		  }
		  API.postToProtocol(protocol.id,data).then(function(res){
			  $scope.protocols[index]=res.data;
			  ngProgressLite.done()
		  },function(reason){console.log(reason);ngProgressLite.done()});
	  }
  	 $scope.openNew = function (size) {
		
 	  API.getRoles().then(function(res){
 		  var r = res.data;
  		      var modalInstance = $uibModal.open({
  		        animation: true,
  		        templateUrl: 'views/newProtoModal.html',
  		        controller: 'newProtoModalCtrl',
  		        size: size,
   		        resolve: {
   		          promise: function () {
   					  return r;	
   		          }       
   		        }
  		      });

  		      modalInstance.result.then(function (protoObj) {
				  
				  
 				  $scope.protocols.push(protoObj);
				  
				  
 		        
  		      }, function () {
  		        console.log('Modal dismissed at: ' + new Date());
  		      });
			  
 			});
 		
  	};
	
	  $scope.updateHolds=function(holds,exId){
		  ngProgressLite.start();
		  var data={
		  	"holds": holds,
		  }
		  API.updateEx(exId,data).then(function(res){
		  	ngProgressLite.done();
		  },function(reason){ngProgressLite.done();});
	  }
	  $scope.updateReps=function(reps,exId){
		  ngProgressLite.start();
		  var data={
		  	"reps": reps,
		  }
		  API.updateEx(exId,data).then(function(res){
		  	ngProgressLite.done();
		  },function(reason){ngProgressLite.done();});
	  }
	  $scope.updateWeeks=function(weeks,exId){
		  ngProgressLite.start();
		  var data={
		  	"weeks": weeks,
		  }
		  API.updateEx(exId,data).then(function(res){
		  	ngProgressLite.done();
		  },function(reason){ngProgressLite.done();});
	  }
  	$scope.removeEx=function(id){
  		ngProgressLite.start();
		
  		API.deleteEx(id).then(function(res){
  		ngProgressLite.done();
  		},function(reason){
  		Alert('API.deleteEx() failed');
  		$state.go('protocols');
		
  		})
  	}
	
	$scope.deleteProtocol=function(id,index){
		ngProgressLite.start();
		API.deleteProtocol(id).then(function(res){
			
			$scope.protocols.splice(index,1);
			ngProgressLite.done();
		},function(reason){console.log(reason)});
	}
	  ngProgressLite.done();
	 $scope.open = function (size,protocol) {
		
	
		  API.getAreas().then(function(res){
			   var a=res.data;
		      var modalInstance = $uibModal.open({
		        animation: true,
		        templateUrl: 'views/protocolModalContent.html',
		        controller: 'protocolModalInstanceCtrl',
		        size: size,
		        resolve: {
		          areas: function () {
					  
				  a.protocol=protocol;
					  return a;	
		          }       
		        }
		      });

		      modalInstance.result.then(function (selectedItem) {
		        $scope.selected = selectedItem;
		      }, function () {
		        $log.info('Modal dismissed at: ' + new Date());
		      });
		  
		});
	};
	    
		
  });  
  angular.module('iVidexApp').controller('newProtoModalCtrl', function ($scope, $modalInstance, promise,API) {
	  $scope.newProtocol=function(){
		  var protocol={
			  "name":$scope.name
		  }
		  console.log(protocol);
		  API.postProtocol(protocol).then(function(res){
		  $modalInstance.close(res.data);	
			
			
	  		},function(reason){});
	  }
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  	
  });
  angular.module('iVidexApp').controller('protocolModalInstanceCtrl', function ($scope, $modalInstance, areas,API) {
	  console.log("areas");
	  $scope.items=areas;
       $scope.selected = {
        item: areas[0]
      };
		  
	  $scope.add=function(video){
		  
		  
		  if(typeof $scope.items.protocol.exercises === 'undefined')
		  {
			  
			  $scope.items.protocol.exercises=[];
		  }
		  
		  var data={"holds":3,
			"reps":10,
			"weeks":2,
			"weight":0,

			"assigned_exercise":video.id,
			"assigned_protocol":$scope.items.protocol['id']}
			
		 
		  API.postExercise(data).then(function(res){
			  data=res.data;
			  //data.id = last res.data.exercises['LAST_ITEM'].id
			  
			  
			  data.name=video.title;
			  //var exBup=$scope.items.protocol['exercises']
			  
			  $scope.items.protocol['exercises'].push(data);
			
		  },function(reason){})
	  }
      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });