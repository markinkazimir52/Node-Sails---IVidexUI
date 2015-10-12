'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('MenuCtrl', function ($scope) {
	  $scope.dynamicPopover = {
	      content: 'Hello, World!',
	      templateUrl: 'myPopoverTemplate.html',
	      title: 'Title'
	    };
  });
