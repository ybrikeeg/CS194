'use strict';

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial']);

cs142App.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/users', {
      templateUrl: 'components/user-list/user-listTemplate.html',
      controller: 'UserListController'
    }).
    when('/users/:userId', {
      templateUrl: 'components/user-detail/user-detailTemplate.html',
      controller: 'UserDetailController'
    }).
    when('/photosOfUser/:userId', {
      templateUrl: 'components/user-photos/user-photosTemplate.html',
      controller: 'UserPhotosController'
    }).
    otherwise({
      redirectTo: '/users'
    });
  }
]);


cs142App.controller('MainController', ['$scope', '$location',
  function($scope, $location) {
    $scope.main = {};

    //store any shared variables between controllers
    $scope.shared = {};
    //store the logged in user
    $scope.shared.currentUser = window.noozModels.loggedInUserModel();

    /*
     * FetchModel - Fetch a model from the web server.
     *   url - string - The URL to issue the GET request.
     *   doneCallback - function - called with argument (model) when the
     *                  the GET request is done. The argument model is the object
     *                  containing the model. model is undefined in the error case.
     */
    $scope.FetchModel = function(url, doneCallback) {
      console.log("Fetch model: " + url);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if (this.readyState === 4){
          doneCallback(this.responseText);
        }
      };
      xhr.open("GET", url);
      xhr.send();
    };

    $scope.main.callBack = function(model){
      var parsedJson = JSON.parse(model);
      console.log(parsedJson.version);
      $scope.$apply(function(){
        $scope.main.versionNumber = 'v' + parsedJson.version;
      });
    };

    $scope.FetchModel("http://localhost:3000/test/info", $scope.main.callBack);
  }
]);
