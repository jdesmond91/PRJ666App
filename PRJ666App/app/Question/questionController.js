angular.module("nursingApp").controller("questionController", ["$scope", "questionService", questionController]);

function questionController($scope, questionService) {
    $scope.Questions = [];
    $scope.Message = "";
    $scope.status;

    $scope.getQuestions = function () {
        console.log("get questions");

        var scenarioResult = questionService.get();

        scenarioResult.then(function (resp) {
            console.log(resp);
            $scope.Questions = resp.data;
            $scope.Message = "Call Successfull";
        }, function (error) {
            $scope.Message = "Error!! " + error.status;
            $scope.status = 'Unable to load question data: ' + error.message;
        });
    };

    $scope.getQuestions();
}