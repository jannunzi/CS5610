var app = angular.module('OnlineApps', ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/applications/list', {
            templateUrl: 'features/applications/list.html',
            controller: 'ApplicationsListCtrl'
        }).
          when('/applications/new', {
              templateUrl: 'features/applications/new.html',
              controller: 'ApplicationsNewCtrl'
          }).
          when('/applications/edit/:id', {
              templateUrl: 'features/applications/edit.html',
              controller: 'ApplicationsEditCtrl'
          });
  }
]);