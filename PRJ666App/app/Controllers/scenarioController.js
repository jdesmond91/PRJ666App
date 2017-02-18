angular.module("nursingApp").controller("scenarioController", ["$scope", "$routeParams", "scenarioService", scenarioController]);
function scenarioController($scope, $routeParams, scenarioService) {
    $scope.Scenarios = [];
    var scenarioId = $routeParams.scenario_id;
    $scope.Message = "";
    $scope.status;
    $scope.sectionName = "";
    $scope.questions = [];
    var scenarios = [];

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
        $scope.questions.push({});
    }

    $scope.getQuestion = function () {
        console.log($scope.questions);
    }

    $scope.addSection = function () {
        var onlyQuestions = [];
        var onlyAnswers = [];
        var onlyHints = [];

        for (var i = 0; i < $scope.questions.length; i++) {         
            onlyQuestions.push($scope.questions[i][i].question);    
            onlyAnswers.push($scope.questions[i][i].answer); 
            onlyHints.push($scope.questions[i][i].hint); 
        }
        scenarios.push({
            section: $scope.sectionName,
            questions: onlyQuestions,
            answers: onlyAnswers,
            hints: onlyHints           
        })
        console.log(scenarios);

        clearFields();
    }

    function clearFields() {
        $scope.sectionName = "";
        $scope.questions = [];
    }
        
}
