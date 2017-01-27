angular.module("common.services").factory("questionService", ["$http", "appSettings", questionService]);
function questionService($http, appSettings) {

    this.get = function () {
        console.log("here");
        var accessToken = sessionStorage.getItem('accessToken');

        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}

        var response = $http({
            url: appSettings.serverPath + "/api/Questions",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    return {
        get: this.get
    }
}
