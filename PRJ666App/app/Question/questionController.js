angular.module('nursingApp')
    .controller('questionController', ['$scope', 'questionService', function ($scope, questionService) {
        $scope.message = "Question Controller"
        $scope.questions;
        $scope.status;
        getQuestions();

        function getQuestions() {
            questionService.getQuestions().
                then(function (response) {
                    $scope.questions = response.data;
                }, function (error) {
                    $scope.status = 'Unable to load question data: ' + error.message;
                });
        }
}]);
