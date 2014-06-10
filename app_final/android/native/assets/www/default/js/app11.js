
/* JavaScript content from js/app11.js in folder common */
var app = angular.module("app_final", ['ionic', 'PhoneGap']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	    .state('tab', {
	        url: "/tab",
	        abstract: true,
	        templateUrl: "templates/tab.html"
	    }) ;

    $urlRouterProvider.otherwise("tab");
});






