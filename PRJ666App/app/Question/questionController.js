angular.module("nursingApp").controller("questionController", ["$scope", "questionService", questionController]);

function questionController($scope, questionService) {
    $scope.Questions = [];
    $scope.Message = "";
    $scope.status;

    //makes a call to the question service to retrieve all questions
    $scope.getQuestions = function () {
        console.log("Questions Controller: get questions");

        var questionResult = questionService.getQuestions();

        questionResult.then(function (resp) {
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