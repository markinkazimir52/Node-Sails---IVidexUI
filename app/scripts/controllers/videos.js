'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('VideosCtrl', function (API,$scope, promise,ngProgressLite) {
	  //$scope.videos=promise.data;
	  $scope.areas=promise.data;
	  $scope.videos=[];
	  $scope.areas.forEach(function(area,index,array){
		  area.videos.forEach(function(video,videoIndex,array){
			  $scope.videos.push(video);
		  });
	  });
	  
	  ngProgressLite.done();
	  $scope.saveVideo=function(video,changed,index){
		   ngProgressLite.start();
		  var data={
			  "description":video['description']
		  }
		  API.updateVideo(video['id'],data).then(function(res){
			   
			  changed=false;
			  $scope.videos[index]=res.data;
			  ngProgressLite.done();
		  },function(reason){console.log(reason)});
	  }
  });
