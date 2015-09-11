'use strict';

(function(app) {

	app.config(function(sjSystemProvider){
		sjSystemProvider.registerApp("projects", {
			icon: "fa fa-flag",
			templateUrl: "app/app-projects/main.html",
			controller: "ProjectsController"
		});
	});

	app.controller("ProjectsController", function($scope, $http, sjWindowScope){
		sjWindowScope.height = 480;
		sjWindowScope.width = 640;
		$scope.repos = [];
		$http.get("https://api.github.com/users/shengjie/repos")
			.success(function(repos) {
				$scope.repos = repos;
			})
	});

})(angular.module('sj.app-projects', [
]));

