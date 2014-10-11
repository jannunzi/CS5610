app.controller("ApplicationsNewCtrl",
    ["$scope", "$http", "ApplicationsService", "$routeParams",
        function ($scope, $http, ApplicationsService, $routeParams) {
            $scope.create = function () {
                ApplicationsService.create($scope.application, function () {
                    window.history.go(-1);
                });
            }
        }]);

app.controller("ApplicationsEditCtrl",
    ["$scope", "$http", "ApplicationsService", "$routeParams",
        function ($scope, $http, ApplicationsService, $routeParams) {
        //    var appId = $routeParams["id"];
            var appId = $routeParams.id;
            console.log(appId);

            ApplicationsService.selectOne(appId, function (response) {
                $scope.application = response;
                console.log($scope.application);
            });

            $scope.update = function () {
                ApplicationsService.update($scope.application._id,
                    $scope.application, function () {
                    window.history.go(-1);
                });
            };

            $scope.remove = function (id) {
                ApplicationsService.remove(id, function () {
                    window.history.go(-1);
                });
            };



        }]);

app.controller("ApplicationsListCtrl", ["$scope", "$http", "ApplicationsService", function ($scope, $http, ApplicationsService) {

    //$scope.create = function () {
    //    ApplicationsService.create($scope.serviceClient, $scope.all)
    //}

    $scope.renderServiceClients = function (response) {
        $scope.serviceClients = response;
    };

    //$scope.remove = function (id) {
    //    ApplicationsService.remove(id, $scope.all);
    //};

    //$scope.update = function () {
    //    ApplicationsService.update($scope.serviceClient._id, $scope.serviceClient, $scope.all);
    //};

    //$scope.select = function (id) {
    //    ApplicationsService.selectOne(id, function (response) {
    //        $scope.serviceClient = response;
    //    });
    //};

    $scope.all = function () {
        ApplicationsService.selectAll($scope.renderServiceClients);
    }

    $scope.all();
}]);
