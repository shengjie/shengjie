(function(app) {

	function sjApplication(name, config) {
		this.title = config.title || name;
		this.icon = config.icon;
		this.templateUrl = config.templateUrl;
		this.controller = config.controller;
	}

	function sjFile(name, url, config) {
		this.name = name;
		this.url = url;
		this.icon = config.icon;
	}

	function sjSystem(apps, files, launcher) {
		var launched;

		this.getApplications = function() {
			return apps;
		};

		this.getFiles = function() {
			return files;
		};

		this.launch = function(name) {
			launched += 1;
			launcher.launch(apps[name], launched);
		}
	}

	app.service("sjAppLauncher", function($compile, $rootScope, $rootElement) {
		this.launch = function(app, id) {
			var html = "<sj-window app='app'></sj-window>";
			var $scope = $rootScope.$new();
			$scope.app = app;
			var compiled = $compile(html)($scope);
			$rootElement.append(compiled);
			return compiled;
		}
	});

	app.directive("sjWindow", function($http, $compile, $controller) {
		return {
			restrict: "E",
			scope: {app:'='},
			templateUrl: "app/system/sjWindow.html",
			link: function(scope, element, attr) {
				var sjWindow = element.find('.sj-window');
				var sjWindowTitle = sjWindow.find(".sj-window-title");
				var body = angular.element("html");
				var g =scope.$id%10;
				console.debug(g);
				scope.moving = false;
				scope.x = g*20;
				scope.y = g*20;
				scope.cx = -10;
				scope.cy = -10;
				scope.height = 300;
				scope.width = 400;
				scope.z = 1;
				scope.icon = scope.app.icon;
				scope.close = function() {
					sjWindow.addClass("sj-window-closing");
				}

				sjWindow.addClass("sj-window-opening");

				sjWindow.on("animationend", function() {
					if(sjWindow.hasClass('sj-window-closing')) {
						element.remove();
					}
				});

				body.on("mousemove", function(e) {
					if(scope.moving) {
						scope.$apply(function() {
							scope.x = e.clientX + scope.cx;
							scope.y = e.clientY + scope.cy;
						})
					}
				});

				sjWindowTitle.on('mousedown', function(e) {
					scope.moving = true;
					scope.$apply(function() {
						scope.cx = -e.offsetX;
						scope.cy = -e.offsetY;
					});
				});

				body.on('mouseup', function() {
					scope.moving = false;
				});

				var contentEl = element.find(".sj-window-content");
				contentEl.addClass("loading");
				scope.title = scope.app.title;
				if(scope.app.templateUrl) {	
					$http.get(scope.app.templateUrl).success(function(html) {
						contentEl.empty();
						contentEl.removeClass("loading");
						var compiled = $compile(html);
						var $scope = scope.$new();
						var controller = $controller(scope.app.controller,{
							"$scope": $scope,
							"sjWindowScope": scope,
						});
						contentEl.append(compiled($scope ));
					});
				}
			}
		}
	})


	app.directive("markdown", function() {
		return {
			restrict: "E",
			link: function(scope, element, attr) {
				var compiled = markdown.toHTML(element.html());
				element.html(compiled);
			}
		}
	});
	
	app.provider("sjSystem", function() {
		var apps = {};
		var files = [];

		return {
			register: function(name, option) {
				apps[name] = new sjApplication(name,option);
			},
			$get: function(sjAppLauncher) {
				return new sjSystem(apps, files, sjAppLauncher);
			}
		};
	});


	app.directive("sjWindow", function() {
		return {
			restrict: "E",
			link: function() {

			},
			controller: function() {

			}
		}
	})

})(angular.module('sj.system', []));	