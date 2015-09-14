'use strict';
//Twitter loading
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

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

        sjSystemProvider.registerFile("[J2EE] Safe driving", {
            description: "[J2EE] Banchelor graduation project « Agence SafeDriving »",
            url: "http://shengjieinsight.com/blog/projects/j2ee-banchelor-graduation-project-agence-safe-driving",
            type: "url"
        });
       
	});
	
	app.run(function($rootScope, $rootElement, sjSystem) {

		$rootElement.append('<div id="twitter-widget"><a class="twitter-timeline" href="https://twitter.com/ShengjieYu" data-widget-id="643347041092022272">Tweets de @ShengjieYu</a></div>');

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
