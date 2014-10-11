app.controller("ApplicationCtrl", function ($scope, ApplicationSvc) {
    console.log(ApplicationSvc);
    $scope.message = "Hello World";
    $scope.create = function () {
        ApplicationSvc.createApplication($scope.application, function () {
            $scope.all();    
        });
    };

    $scope.remove = function (id) {
        ApplicationSvc.remove(id, function (results) {
            $scope.all();
        })
    };

    $scope.all = function () {
        ApplicationSvc.getAllApplications(function (apps) {
            $scope.applications = apps;
        });
    };

    $scope.all();
});
