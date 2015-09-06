'use strict';

(function(app) {

	app.config(function(sjSystemProvider){
		sjSystemProvider.registerApp("contacts", {
			icon: "fa fa-phone",
			templateUrl: "app/app-contacts/main.html",
			controller: "ContactsController",
		});
	});

	app.controller("ContactsController", function($scope){

	});

})(angular.module('sj.app-contacts', [
]));


