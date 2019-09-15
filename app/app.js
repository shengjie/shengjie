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

		sjSystemProvider.registerFile("My LinkedIn", {
			description: "My LinkedIn",
			url: "https://www.linkedin.com/in/shengjieyu/",
			type: "url",
			icon: "fa fa-linkedin"
		});

		sjSystemProvider.registerFile("My CV", {
			description: "My CV",
			url: "cv.xml",
			type: "url",
			icon: "fa fa-file-o"
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
				width: 600,
				height: 600
			});
		});
	});

})(angular.module('sj', [
	'sj.system',
	'sj.app-landing',
	'sj.app-projects',
	'sj.app-gists',
	'sj.app-blogs'
]));



// Declare app level module which depends on views, and components
