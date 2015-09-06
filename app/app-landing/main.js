'use strict';

(function(app) {

	app.config(function(sjSystemProvider){
		sjSystemProvider.registerApp("landing", {
			icon: "fa fa-home",
			templateUrl: "app/app-landing/main.html",
			controller: "LandingController"
		});
	});

	app.controller("LandingController", function($scope){

	});

})(angular.module('sj.app-landing', [
]));


