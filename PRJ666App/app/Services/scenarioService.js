angular.module("common.services").factory("scenarioService", ["$http", "appSettings", scenarioService]);
function scenarioService($http, appSettings) {

    this.getScenario = function () {
        var accessToken = sessionStorage.getItem('accessToken');

        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}

        var response = $http({
            url: appSettings.serverPath + "/api/Scenarios",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getScenarioByIdWithAll = function (scenario_id) {

        var response = $http({
            url: appSettings.serverPath + "/api/scenarios/" + scenario_id + "/all",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    return {
        getScenario: this.getScenario,
        getScenarioByIdWithAll: this.getScenarioByIdWithAll
    }
}



/*(function () {
    'use strict';
    angular
        .module("common.services")
        .factory("scenarioService", ["$http", "appSettings",
                                    scenarioService]);
    function scenarioService($http, appSettings) {
        this.get = function () {
            var accessToken = sessionStorage.getItem('accessToken');
            var authHeaders = {};
            if (accessToken) {
                authHeaders.Authorization = 'Bearer ' + accessToken;
            }
            var response = $http({
                url: appSettings.serverPath + " /api/Scenarios",
                method: "GET",
                headers: authHeaders
            });
            return response;
        };
        return {
            get: this.get
        }
    }
})();*/