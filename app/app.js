'use strict';

(function(app) {
	app.config(function(sjSystemProvider) {
		sjSystemProvider.registerFile("README.md", {
			description: "readme",
			url: "README.md",
			type: "markdown"
		});

        sjSystemProvider.registerFile("wpf-multithread-downloader.md", {
            description: "test",
            url: "docs/wpf-multithread-downloader.md",
            type: "markdown"
        });
       
	});
	
	app.run(function($rootScope, $rootElement, sjSystem) {
		
		$rootElement.on('click', "a", function(e) {
            var href = angular.element(this).attr('href');
            if(!href) return;
			var parts = href.split("://");
			if(parts[0]=="app") {
				sjSystem.launch(parts[1]);
                e.preventDefault();
			}
            else if(parts[0]=="file") {
                sjSystem.openFile(parts[1]);
                e.preventDefault();
            }
		});
				
		$rootScope.$on("sjDesktopStart", function(e) {			
			sjSystem.openFile("README.md", {
				x: 10,
				y: 10,
				width: sjSystem.desktopWidth * .5,
				height: sjSystem.desktopHeight *.9
			});
		});
	});

})(angular.module('sj', [
	'sj.system',
  	'sj.app-landing',
  	'sj.app-projects',
	'sj.app-blogs',
	'sj.app-contacts',
    'sj.app-gists'
]));



// Declare app level module which depends on views, and components
