angular.module("nursingApp").controller("scenarioController", ["$scope", "$routeParams", "scenarioService", scenarioController]);
function scenarioController($scope, $routeParams, scenarioService) {
    $scope.Scenarios = [];
    var scenarioId = $routeParams.scenario_id;
    $scope.Message = "";
    $scope.status;
    $scope.allScenarios = [];
    $scope.allSections = [];
    $scope.QuestionsSection2 = [];
    
    console.log("Scenario Id: " + scenarioId);

    $scope.getScenarios = function() {
        console.log("get scnearios");
        var scenarioResult = scenarioService.getScenario();
        scenarioResult.then(function (resp) {
            $scope.Scenarios = resp.data;
            $scope.Message = "Call Successfull";
        }, function (error) {
            $scope.Message = "Error!! " + error.status;
            $scope.status = 'Unable to load question data: ' + error.message;
        });
    };

    //$scope.getScenarios();

    $scope.getScenariosByIdWithAll = function () {

        var scenarioResult2 = scenarioService.getScenarioByIdWithAll(scenarioId);
        scenarioResult2.then(function (resp) {
            $scope.allScenarios = resp.data;
            console.log($scope.allScenarios);
            $scope.allSections = $scope.allScenarios.Sections;
            console.log($scope.allSections);
            $scope.QuestionsSection2 = $scope.allSections[1].Questions;
            console.log($scope.QuestionsSection2);
            $scope.Message = "Call Successfull";
        }, function (error) {
            $scope.Message = "Error!! " + error.status;
            $scope.status = 'Unable to load question data: ' + error.message;
        });
    };

    $scope.allSections = $scope.allScenarios.Sections;

    angular.forEach($scope.allScenarios, function (item) {
        console.log(item);
    })

    

    $scope.getScenariosByIdWithAll();
}


/*(function () {
    'use strict';
    angular
        .module("nursingApp")
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
}());*/