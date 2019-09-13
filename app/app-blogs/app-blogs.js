(function (app) {
    app.config(function (sjSystemProvider) {
        sjSystemProvider.registerApp("blogs", {
            icon: "fa fa-rss",
            title: "My Blogs",
            templateUrl: "app/app-blogs/app-blogs.html",
            controller: "BlogsController"
        });
    });

    app.controller("BlogsController", function ($scope, $http) {
      $scope.blogs = [];
    });
})(angular.module("sj.app-blogs", ["sj.system"]));
