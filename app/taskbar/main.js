(function(app){


	app.directive("sjTaskbar", function(){
		return {
			restrict: "E",
			templateUrl: "app/taskbar/sjTaskbar.html",
			controller: function($scope, sjSystem) {
				$scope.apps = sjSystem.getApplications();/*{
					"home": {
						"label": "Home",
						"icon": "fa fa-home"
					},

					"projects": {
						"label": "Projects",
						"icon": "fa fa-folder"
					},

					"blogs": {
						"label": "Blogs",
						"icon": "fa fa-internet-explorer"
					},

					"contacts":{
						"label": "Contacts",
						"icon": "fa fa-phone"
					}
				};*/

				$scope.open = function(name) {
					sjSystem.launch(name);
				}
			}
		}

	});


})(angular.module("sj.taskbar",["sj.system"]))