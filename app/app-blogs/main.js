'use strict';

(function(app) {

	app.config(function(sjSystemProvider){
		sjSystemProvider.register("blogs", {
			title: "Blogs",
			icon: "fa fa-internet-explorer",
			templateUrl: "app/app-blogs/main.html",
			controller: "BlogsController"
		});
	});
	
	app.controller("BlogsController", function($scope){

	});

})(angular.module('sj.app-blogs', [
	'sj.system'
]));


