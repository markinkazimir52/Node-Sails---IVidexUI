'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('VideosCtrl', function ($scope, promise,ngProgressLite) {
	  $scope.videos=promise.data;
	  ngProgressLite.done();
  });
