/*angular.module("appmodule").controller("scenarioController",["$scope", "scenarioService", scenarioController]);
function scenarioController($scope, scenarioService) {
    $scope.Scenarios = [];
    $scope.Message = "";
    //getScenarios();

    $scope.getScenarios = function() {
        console.log("get scnearios");
        var scenarioResult = scenarioService.get();
        scenarioResult.then(function (resp) {
            $scope.Scenarios = resp.data;
            $scope.Message = "Call Successfull";
        }, function (err) {
            $scope.Message = "Error!! " + err.status;
        });
    };
}*/


(function () {
    'use strict';
    angular
        .module("appmodule")
        .controller("scenarioController",
                    ["$scope", "scenarioService",
                             scenarioController]);

    function scenarioController($scope, scenarioService) {
        this.Scenarios = [];
        this.Message = "";
        GetScenarios();

        function GetScenarios() {
            var scenarioResult = scenarioService.get();
            scenarioResult.then(function (resp) {
                this.Scenarios = resp.data;
                this.Message = "Call Successfull";
            }, function (err) {
                this.Message = "Error!! " + err.status;
            });
        };
    }
}());