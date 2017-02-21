angular.module("nursingApp").controller("headerController", ["$scope", "scenarioService", headerController]);
function headerController($scope, scenarioService) {
    $scope.Scenarios = [];
    $scope.Message = "";
    $scope.status;

    var scenarioResult = scenarioService.getScenario();
    scenarioResult.then(function (response) {
        $scope.Scenarios = response.data;
        $scope.Message = "Call Successfull";
    }, function (error) {
        $scope.Message = "Error!! " + error.status;
        $scope.status = 'Unable to load question data: ' + error.message;
    });
}