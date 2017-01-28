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

        return {
            getScenario: this.getScenario
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