app.factory('ApplicationSvc', function ($http) {
    var getAllApplications = function (callback) {
        $http.get("/applications").success(callback);
    };

    var getApplicationForId = function (id) {

    };

    var createApplication = function (application, callback) {
        $http.post("/applications", application)
        .success(callback);
    };

    var updateApplication = function (id, application) {

    };

    var remove = function (id, callback) {
        $http.delete("/applications/" + id)
        .success(callback);
    };

    return {
        getAllApplications: getAllApplications,
        getApplicationForId: getApplicationForId,
        createApplication: createApplication,
        updateApplication: updateApplication,
        remove: remove
    };
});