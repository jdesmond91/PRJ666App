angular.module("nursingApp").controller("scenarioController", ["$scope", "$routeParams", "scenarioService", scenarioController]);
function scenarioController($scope, $routeParams, scenarioService) {
    $scope.Scenarios = [];
    var scenarioId = $routeParams.scenario_id;
    $scope.Message = "";
    $scope.status;
    
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

    $scope.getScenarios();

}
