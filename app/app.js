'use strict';

(function(app) {
	app.config(function(sjSystemProvider) {
		sjSystemProvider.registerFile("README.md", {
			description: "readme",
			url: "README.md",
			type: "markdown"
		});		
	});
	
	app.run(function($rootScope, $rootElement, sjSystem) {
		
		$rootElement.on('click', "a", function(e) {
			var parts = this.href.split("://");
			if(parts[0]=="app") {
				sjSystem.launch(parts[1]);
			}			
		});
		
		
		$rootScope.$on("sjDesktopStart", function(e) {			
			sjSystem.openFile("README.md", {
				x: 10,
				y: 10,
				width: sjSystem.desktopWidth * .5,
				height: sjSystem.desktopHeight - 120
			});
		});
	});

})(angular.module('sj', [
	'sj.system',
  	'sj.app-landing',
  	'sj.app-projects',
	'sj.app-blogs',
	'sj.app-contacts'
]));



// Declare app level module which depends on views, and components
