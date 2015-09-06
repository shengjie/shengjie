'use strict';

(function(app) {

	app.config(function(sjSystemProvider){
		sjSystemProvider.registerApp("projects", {
			icon: "fa fa-tasks",
			templateUrl: "app/app-projects/main.html",
			controller: "ProjectsController"
		});
	});

	app.controller("ProjectsController", function($scope, sjWindowScope){
		sjWindowScope.height = 480;
		sjWindowScope.width = 640;
		$scope.files = [
			{
				name: "WPF Multi-thread downloader",
			}
		];
	});

})(angular.module('sj.app-projects', [
]));

