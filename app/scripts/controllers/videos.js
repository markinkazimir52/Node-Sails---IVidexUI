'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
	.controller('VideosCtrl', function (API,$scope, promise,ngProgressLite, $uibModal, $log) {
		
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

		$scope.open = function (size, video) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/newVideoModal.html',
				controller: 'newVideoModalCtrl',
				size: size,
				resolve: {
					video: function() {
						return video;
					}
				}
			});

			modalInstance.result.then(function (video) {
				console.log(video);
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});

		};
	});

	angular.module('iVidexApp').controller('newVideoModalCtrl', function ($scope, $uibModalInstance, API, video) {

		$scope.area = {
			id: ''
		}

		if(video == 'new'){
			$scope.video = {};
			$scope.video.description = '<ul class="ng-scope">' +
											'<li>Lorem ipsum dolor sic amen. Et fauci dolorem sic transit</li>' +
											'<li>Lorem ipsum dolor sic amen. Et fauci dolorem sic transit</li>' +
											'<li>Lorem ipsum dolor sic amen. Et fauci dolorem sic transit</li>' +
										'</ul>';
		}
		else{
			$scope.video = video;

			API.getVideoById($scope.video.id).then(function(res){
				var currVideo = res.data;
				if(currVideo[0].therapyAreas[0].id)
					$scope.area.id = currVideo[0].therapyAreas[0].id;
			})
		}


		API.getAreas().then(function(res){
			$scope.video_categories = res.data;
// console.log($scope.video_categories);			
		})

		$scope.updateVideo = function() {
			
			var data = {
				"title": $scope.video.title,
				"url": $scope.video.url,
				"description": $scope.video.description,
				"therapyAreas": $scope.area.id
			}

			if(!$scope.video.id){
				API.postVideo(data).then(function(res){
					console.log(res);
					$uibModalInstance.close(res.data);
				}, function(reason){})
			}else {
				API.updateVideo(data, $scope.video.id).then(function(res){
					console.log(res);
					$uibModalInstance.close(res.data);
				}, function(reason){})
			}
		}

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});
