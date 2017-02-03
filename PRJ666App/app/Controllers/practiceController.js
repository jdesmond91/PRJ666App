angular.module("nursingApp").controller("practiceController", ["$scope", "$routeParams", "scenarioService", practiceController]);
function practiceController($scope, $routeParams, scenarioService) {
    $scope.Scenarios = [];
    var scenarioId = $routeParams.scenario_id;
    $scope.Message = "";
    $scope.status;
    $scope.scenario = [];
    $scope.allSections = [];
    $scope.QuestionsSection2 = [];
    $scope.studentQuestion = "";
    $scope.answer = "";
    $scope.possibleQuestions = [];

    console.log("Scenario Id: " + scenarioId);

    $scope.getScenariosByIdWithAll = function () {

        var scenarioResult2 = scenarioService.getScenarioByIdWithAll(scenarioId);
        scenarioResult2.then(function (resp) {
            $scope.scenario = resp.data;
            console.log($scope.allScenarios);
            $scope.allSections = $scope.scenario.Sections;
            console.log($scope.allSections);
            $scope.QuestionsSection2 = $scope.allSections[1].Questions;
            console.log($scope.QuestionsSection2);
            $scope.Message = "Call Successfull";
        }, function (error) {
            $scope.Message = "Error!! " + error.status;
            $scope.status = 'Unable to load question data: ' + error.message;
        });
    };

    $scope.getScenariosByIdWithAll();

    $scope.getAnswer = function () {
        console.log("getAnswer");
       
        for (var x = 0; x < $scope.QuestionsSection2.length; x++) {           
            var isMatch = "";
            var countMatches = 0;

            for (var y = 0; y < $scope.QuestionsSection2[x].Keywords.length; y++) {
                var keyword = $scope.QuestionsSection2[x].Keywords[y].Description;

                var regexKeyword = new RegExp("\\b" + keyword + "[a-zA-Z]*\\b", "gi"); // global match

                isMatch = $scope.studentQuestion.match(regexKeyword);

                if (isMatch != null) {
                    countMatches++;
                }
            } // close Inner For

            var percentMatch = $scope.QuestionsSection2[x].Keywords.length * 0.8;
            if (Math.floor(countMatches * 0.8) >= Math.floor(percentMatch)) {
                console.log("possible candidates: " + $scope.QuestionsSection2[x].Description);
                $scope.answer = $scope.QuestionsSection2[x].Answer;
            }           
        } // close Outer For
        
        
    };

    $("#question").click(function () {       
        this.value = '';
        $scope.answer = "";
    });

}
