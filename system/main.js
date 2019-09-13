(function (app) {

  function sjApplication(name, config) {
    this.title = config.title || name;
    this.icon = config.icon;
    this.templateUrl = config.templateUrl;
    this.controller = config.controller;
  }

  function sjFile(name, options) {
    this.name = name;
    this.url = options.url;
    this.icon = options.icon || "fa fa-file-text-o";
    this.type = options.type;
  }

  function sjFolder(name, options) {
    this.name = name;
  }

  function sjSystem(apps, folders, files, launcher) {

    this.getApplications = function () {
      return apps;
    };

    this.getFiles = function () {
      return files;
    };

    this.launch = function (name, options) {
      launcher.launch(apps[name], options);
    };

    this.openFolder = function (name) {

    };

    this.openFile = function (name, options) {
      console.debug("openFile", name);
      launcher.launch(files[name], options);
    };
  };


  app.service("sjAppLauncher", function ($compile, $rootScope, $rootElement) {
    var id = 0;

    this.launch = function (app, config) {
      var html = "<sj-window app='app' config='config' app-id='" + id + "'></sj-window>";
      var $scope = $rootScope.$new();
      $scope.app = app;
      $scope.config = config;
      var compiled = $compile(html)($scope);
      $rootElement.append(compiled);
      id += 1;
      return compiled;
    };
  });

  app.directive("sjWindow", function ($http, $compile, $controller, sjSystem) {

    function windowInit(scope, element, attr) {
      var sjWindow = element.find('.sj-window');
      var contentEl = element.find(".sj-window-content");
      var id = parseInt(attr.appId);
      var g = id % 10;
      //console.debug("windowInit",scope.app, element);
      scope.moving = false;
      scope.x = g * 20;
      scope.y = g * 20;
      scope.height = sjSystem.desktopHeight * .9;
      scope.width = sjSystem.desktopWidth * .5;
      scope.z = 1;
      scope.icon = scope.app.icon;

      if (scope.config)
      for (var s in scope.config) {
        scope[s] = scope.config[s];
      }

      scope.close = function () {
        sjWindow.addClass("sj-window-closing");
      };

      sjWindow.addClass("sj-window-opening");
      sjWindow.on("animationend", function () {
        if (sjWindow.hasClass('sj-window-closing')) {
          element.remove();
        }
      });

      scope.showLoading = function () {
        contentEl.addClass("loading");
      };

      scope.hideLoading = function () {
        contentEl.removeClass("loading");
      };

      scope.loadHtml = function (html) {
        if (html.substr(0, 1) != "<") {
          html = "<div>" + html + "</div>";
        }
        //console.debug("loadHtml",html);
        var compiled = $compile(html);
        var $scope = scope.$new();

        if (scope.app.controller) {
          var controller = $controller(scope.app.controller, {
            "$scope": $scope,
            "sjWindowScope": scope
          });
        }

        contentEl.empty();
        contentEl.append(compiled($scope));
      };
    }

    function windowResizeable(scope, element) {
      var sjWindowBody = element.find(".sj-window-body");
      var body = angular.element("html");

      var html = '<div class="sj-window-resizer"></div>';
      var $el = angular.element(html).appendTo(sjWindowBody);
      scope.dragging = false;

      $el.on('mousedown', function (e) {
        scope.dragging = true;
        scope.draggingX = -e.offsetX;
        scope.draggingY = -e.offsetY - 34;
      });

      body.on("mousemove", function (e) {
        if (scope.dragging) {
          scope.$apply(function () {
            scope.width = e.clientX + scope.draggingX - scope.x;
            scope.height = e.clientY + scope.draggingY - scope.y;
          });
        }
      });

      body.on("mouseup", function () {
        scope.dragging = false;
      });
    }


    function windowDraggable(scope, element) {
      var sjWindowTitle = element.find(".sj-window-title");
      var body = angular.element("html");

      body.on("mousemove", function (e) {
        if (scope.moving) {
          scope.$apply(function () {
            scope.x = e.clientX + scope.movingX;
            scope.y = e.clientY + scope.movingY;
          });
        }
      });

      sjWindowTitle.on('mousedown', function (e) {
        scope.moving = true;
        scope.movingX = -e.offsetX;
        scope.movingY = -e.offsetY;
      });

      body.on('mouseup', function () {
        scope.moving = false;
      });
    }

    return {
      restrict: "E",
      required: [
        "app"
      ],
      scope: { app: '=', config: "=" },
      templateUrl: "system/sjWindow.html",
      link: function (scope, element, attr) {
        if (!scope.app) {
          console.error("directive sjWindow requires scoped app attribute !", scope, element, attr);
          return;
        };
        windowInit(scope, element, attr);
        windowDraggable(scope, element);
        windowResizeable(scope, element)

        scope.title = scope.app.title || scope.app.name;
        if (scope.app.templateUrl) {
          scope.showLoading();
          $http.get(scope.app.templateUrl).success(function (html) {
            scope.hideLoading();
            scope.loadHtml(html);
          });
        }

        if (scope.app instanceof sjFile) {
          if (scope.app.type == "url") {
            scope.loadHtml("<iframe src='" + scope.app.url + "' height='100%' width='100%'></iframe>");
            return;
          }

          if (scope.app.url) {
            //open file
            scope.showLoading();
            $http.get(scope.app.url).success(function (html) {
              if (scope.app.type == "markdown") {
                html = '<div class="markdown">' + markdown.toHTML(html) + "</div>";
              }
              scope.hideLoading();
              scope.loadHtml(html);
            });
          }
        }

      }
    };
  });

  app.directive('sjDesktop', function () {
    return {
      restrict: 'E',
      templateUrl: "system/sjDesktop.html",
      controller: "sjDesktopController"
    };
  });

  app.directive("sjFile", function () {
    return {
      restrict: 'E',
      scope: { file: "=" },
      templateUrl: "system/sjFile.html",
      controller: function ($scope, sjSystem) {
        $scope.open = function () {
          sjSystem.openFile($scope.file.name);
        };
      }
    };
  });


  app.controller("sjDesktopController", function ($scope, $element, sjSystem) {
    $scope.files = sjSystem.getFiles();
    var child = $element.children(".desktop");
    sjSystem.desktopHeight = child.height() - 70;
    sjSystem.desktopWidth = child.width();

    $scope.$broadcast("sjDesktopStart");
  });

  app.directive("sjFolder", function () {
    return {
      restrict: 'E',
      scope: {},
      link: function () {

      }
    };
  });

  app.directive("markdown", function () {
    return {
      restrict: "E",
      link: function (scope, element, attr) {
        var compiled = markdown.toHTML(element.html());
        element.html(compiled);
      }
    };
  });

  app.provider("sjSystem", function () {
    var apps = {};
    var folders = {};
    var files = {};

    return {
      registerApp: function (name, option) {
        apps[name] = new sjApplication(name, option);
      },
      registerFolder: function (name, option) {
        folders[name] = new sjFolder(name, option);
      },
      registerFile: function (name, option) {
        files[name] = new sjFile(name, option);
      },
      $get: function (sjAppLauncher) {
        return new sjSystem(apps, folders, files, sjAppLauncher);
      }
    };
  });

  app.directive("sjTaskbar", function () {
    return {
      restrict: "E",
      templateUrl: "system/sjTaskbar.html",
      controller: function ($scope, sjSystem) {
        $scope.apps = sjSystem.getApplications();

        $scope.open = function (name) {
          sjSystem.launch(name);
        };
      }
    };

  });

  app.directive("sjWindow", function () {
    return {
      restrict: "E",
      link: function () {

      },
      controller: function () {

      }
    };
  });

})(angular.module('sj.system', []));
