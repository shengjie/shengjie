'use strict';

(function(app) {

	app.config(function(sjSystemProvider){
		sjSystemProvider.register("projects", {
			icon: "fa fa-tasks",
			templateUrl: "app/app-projects/main.html",
			controller: "ProjectsController"
		});
	});

	app.controller("ProjectsController", function($scope){

	});

})(angular.module('sj.app-projects', [
]));

