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
        //angular.forEach($scope.QuestionsSection2, function (question) {
            //console.log(question.Answer);
        // });
        var countMatches = 0;
        for (var z = 0; z < $scope.QuestionsSection2[1].Keywords.length; z++) {           
            var keyword = $scope.QuestionsSection2[1].Keywords[z].Description;
            var r = new RegExp("\\b" + keyword + "\\b", "gi"); // global match
            console.log(keyword);
            var isMatch = $scope.studentQuestion.match(r);
            console.log("match " + isMatch);
            if (isMatch != "") {
                countMatches++;
            }
        }
        console.log("matches: " + countMatches + " keywords length: " + $scope.QuestionsSection2[1].Keywords.length);
        if (countMatches == $scope.QuestionsSection2[1].Keywords.length) {
            $scope.answer = $scope.QuestionsSection2[1].Answer;
        }

        
    };

    /*for (var i = 0; i < $scope.QuestionsSection2; i++) {
        for (var j = 0; j < $scope.QuestionsSection2[i].Keywords; j++) {
            var r = new RegExp($scope.QuestionsSection2[i].Keywords[j], "gi"); // global match
            var isMatch = $scope.studentQuestion.match(r);
        }
    }*/

}
