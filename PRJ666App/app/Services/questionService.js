angular.module("common.services").factory("questionService", ["$http", "appSettings", questionService]);
function questionService($http, appSettings) {

    //this function makes a call to the questions api, to retrieve all questions and return the response
    this.getQuestions = function () {
        console.log("Questions Service: get questions");
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
        getQuestions: this.getQuestions
    }
}