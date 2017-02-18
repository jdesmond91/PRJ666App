angular.module("nursingApp").controller("scenarioController", ["$scope", "$routeParams", "scenarioService", scenarioController]);
function scenarioController($scope, $routeParams, scenarioService) {
    $scope.Scenarios = [];
    var scenarioId = $routeParams.scenario_id;
    $scope.Message = "";
    $scope.status;
    $scope.sectionName = "";
    $scope.question = "";
    $scope.answer = "";
    $scope.hint = "";
    $scope.scenarios = [];

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

    $scope.addQuestion = function () {

        $scope.scenarios.push({
            section: $scope.sectionName,
            questions: $scope.question,
            answers: $scope.answer,
            hints: $scope.hint,
            keywords: $scope.questionArray
        });
               
        //$scope.scenarios.section = $scope.sectionName;
        //$scope.scenarios.questions.push({ question: $scope.question, keywords: $scope.questionArray});
        //$scope.scenarios.answers.push($scope.answer);
        //$scope.scenarios.hints.push($scope.hint);

        console.log($scope.scenarios);
        clearFields();
    }

    $scope.getQuestion = function () {
        console.log($scope.questions);
    }

    $scope.getKeywords = function () {
        var question = $scope.question;
        var containsQuestionMark = $scope.question.indexOf('?');
        if(containsQuestionMark > -1){
            question = question.slice(0, containsQuestionMark);          
        }
        
        $scope.questionArray = question.split(' ');

        console.log($scope.questionArray);
    };

    $scope.addKeywords = function () {
        $scope.questionArray.push(" ");
    }

    $scope.removeKeywords = function (index) {
        $scope.questionArray.splice(index, 1);
        console.log($scope.questionArray);
    }

    function clearFields() {
        $scope.question = "";
        $scope.answer = "";
        $scope.hint = "";
        $scope.questionArray = [];
    }
        
}
