'use strict';

/**
 * @ngdoc overview
 * @name iVidexApp
 * @description
 * # iVidexApp
 *
 * Main module of the application.
 */

angular
  .module('iVidexApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
	  'ui.bootstrap',
	  'ui.bootstrap.popover',
	  'ui.bootstrap.typeahead',
	  'ui.bootstrap.dropdown',
	  'ui.bootstrap.modal',
	  'ngProgressLite'
  ]).run(
    [        '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications.For example,
      // <li ui-sref-active="active }"> will set the <li> // to active whenever
      // 'contacts.list' or one of its decendents is active.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }]).config(
		    [          '$stateProvider', '$urlRouterProvider',
		      function ($stateProvider,   $urlRouterProvider) {

		        /////////////////////////////
		        // Redirects and Otherwise //
		        /////////////////////////////

		        // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
				$urlRouterProvider

		          // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
		          // Here we are just setting up some convenience urls.
		          

		          // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
		          .otherwise('/login');


		        //////////////////////////
		        // State Configurations //
		        //////////////////////////

		        // Use $stateProvider to configure your states.
		        $stateProvider 
				.state('login', {

		            // With abstract set to true, that means this state can not be explicitly activated.
		            // It can only be implicitly activated by activating one of it's children.
		            abstract: false,

		            // This abstract state will prepend '/contacts' onto the urls of all its children.
		            url: '/login',

		            // Example of loading a template from a file. This is also a top level state,
		            // so this template file will be loaded and then inserted into the ui-view
		            // within index.html.
		            templateUrl: 'views/login.html',

		            // Use `resolve` to resolve any asynchronous controller dependencies
		            // *before* the controller is instantiated. In this case, since contacts
		            // returns a promise, the controller will wait until contacts.all() is
		            // resolved before instantiation. Non-promise return values are considered
		            // to be resolved immediately.
		            

		            // You can pair a controller to your template. There *must* be a template to pair with.
		            controller: 'LoginCtrl'
		          })
				.state('main', {

		            // With abstract set to true, that means this state can not be explicitly activated.
		            // It can only be implicitly activated by activating one of it's children.
		            abstract: false,

		            // This abstract state will prepend '/contacts' onto the urls of all its children.
		            url: '/main',

		            // Example of loading a template from a file. This is also a top level state,
		            // so this template file will be loaded and then inserted into the ui-view
		            // within index.html.
		            templateUrl: 'views/main.html',

		            // Use `resolve` to resolve any asynchronous controller dependencies
		            // *before* the controller is instantiated. In this case, since contacts
		            // returns a promise, the controller will wait until contacts.all() is
		            // resolved before instantiation. Non-promise return values are considered
		            // to be resolved immediately.
		            resolve:{
		            	promise:loadPatients
		            },

		            // You can pair a controller to your template. There *must* be a template to pair with.
		            controller: 'MainCtrl'
		          })
  				.state('patient', {

  		            // With abstract set to true, that means this state can not be explicitly activated.
  		            // It can only be implicitly activated by activating one of it's children.
  		            abstract: false,
					

  		            // This abstract state will prepend '/contacts' onto the urls of all its children.
  		            url: '/patient/:id',

  		            // Example of loading a template from a file. This is also a top level state,
  		            // so this template file will be loaded and then inserted into the ui-view
  		            // within index.html.
  		            templateUrl: 'views/patient.html',

  		            // Use `resolve` to resolve any asynchronous controller dependencies
  		            // *before* the controller is instantiated. In this case, since contacts
  		            // returns a promise, the controller will wait until contacts.all() is
  		            // resolved before instantiation. Non-promise return values are considered
  		            // to be resolved immediately.
		            

  		            // You can pair a controller to your template. There *must* be a template to pair with.
  		            controller: 'PatientCtrl'
  		          })
				
				;

	 }]).config(['ngProgressLiteProvider', function (ngProgressLiteProvider) {
			ngProgressLiteProvider.settings.ease = 'ease-out';
		}]);
  /*
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
	  
      .when('/protocols', {
        templateUrl: 'views/protocols.html',
        controller: 'ProtocolsCtrl'
      })
	  
	  .when('/patient/:id', {
        templateUrl: 'views/patient.html',
        controller: 'PatientCtrl'
      })
	  
      .when('/videos', {
        templateUrl: 'views/videos.html',
        controller: 'VideosCtrl'
      })
	  
      .when('/tips', {
        templateUrl: 'views/tips.html',
        controller: 'TipsCtrl'
      })
	  
      .when('/links', {
        templateUrl: 'views/links.html',
        controller: 'LinksCtrl'
      })
      
      .otherwise({
        redirectTo: '/'
      });
  });
  */
  
