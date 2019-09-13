(function (app) {
    app.config(function (sjSystemProvider) {
        sjSystemProvider.registerApp("mygists", {
            icon: "fa fa-github",
            templateUrl: "app/app-gists/app-gists.html",
            controller: "GistsController"
        });
    });

    app.controller("GistsController", function ($scope, $http) {
        $http.get("https://api.github.com/users/shengjie/gists", { "cache": true })
            .success(function (json) {
                console.log(json);
                $scope.gists = json;
            })
            .error(function (error) {
                console.error(error);
                $scope.error = error;
            });
    });
})(angular.module("sj.app-gists", ["sj.system"]));
