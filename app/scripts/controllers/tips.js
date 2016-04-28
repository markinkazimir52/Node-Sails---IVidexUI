'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('TipsCtrl', function (API,$scope, promise,ngProgressLite) {
	  ngProgressLite.done();
	  $scope.tips=promise.data;
	  //retrieve id of tipType with name "active" and active tip's $index
	 $scope.setActiveTipIndex=function()
	  {
		  $scope.tips.forEach(function(tip,tipIndex,tipArray){
			  if(tip.tipTypes.length>0){
				  tip.tipTypes.forEach(function(tipType,ttIndex,ttArray){
					  if(tipType['name']=='active'){
						  $scope.activeTipIndex=tipIndex;
						  $scope.activeTipType={
						  	"name":tipType['name'],
							  "id":tipType['id']
						  }
					  }
				  });
		  	
			  }
		  });
	  }
	  $scope.setActiveTipIndex();
	  
	  $scope.addTip = function(){
		  ngProgressLite.start();
		  var data={
			  "title": "Tip's title",
			  "body": "Tip's body"
		  }
		  API.postTip(data).then(function(res){
			  
			  $scope.tips.push(res.data);
			  ngProgressLite.done();
		  },function(reason){console.log(reason)})
		  
	  }
	  
	  $scope.deleteTip=function(tip,index){
		  
		  ngProgressLite.start();
	  	
		  API.deleteTip(tip.id).then(function(res){
			  $scope.tips.splice(index,1);
			  ngProgressLite.done();
		  },function(reason){});
	  }
	  
      $scope.onKeyDownResult = "";
      $scope.onKeyUpResult = "";
      $scope.onKeyPressResult = "";

      // Utility functions

      

      // Event handlers
      $scope.onKeyDown = function ($event) {
		  $rootScope.pressed= $event.keyCode;
		  $scope.pressed = $event.keyCode;
      };
	  
	  
	  $scope.expand = function(index){
		   if($scope.tips[index]['open']){
		  	$scope.tips[index]['open']=!$scope.tips[index]['open']
		  } else {
		  	 $scope.tips[index]['open']=true;
		  }
	  }
	  $scope.setActiveTip=function(tip,index){
		  ngProgressLite.start();
		  var data={
			  "tips":[
			         {"id":tip['id']}
			         ]
		  }
		  API.postToTiptype($scope.activeTipType['id'],data).then(function(res){
			  var newTip=res.data.tips[0];
			  delete res.data.tips;
			  newTip.tipTypes=[];
			  newTip.tipTypes.push(res.data);
			 
			  $scope.tips[index]=newTip;
			  $scope.tips[$scope.activeTipIndex].tipTypes.splice(0,1);
			  $scope.setActiveTipIndex();
			  ngProgressLite.done();
			  
			  
			  
		  },function(reason){console.log(reason)});
	  }
	  $scope.saveTip=function(tip,changed,index){
		  ngProgressLite.start();
		  var data={
			  'title':tip.title,
			  'body':tip.body
		  }
		  API.postToTip(tip.id, data).then(function(res){
		  	
			  $scope.tips[index]=res.data;
			  ngProgressLite.done();
			
		  },function(reason){console.log(reason)});
	  }
  });
