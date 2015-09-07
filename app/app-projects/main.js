'use strict';

(function(app) {

	app.config(function(sjSystemProvider){
		sjSystemProvider.registerApp("projects", {
			icon: "fa fa-flag",
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
                icon: "fa fa-file-text-o",
                url: "file://wpf-multithread-downloader.md"
			}
		];
	});

})(angular.module('sj.app-projects', [
]));

