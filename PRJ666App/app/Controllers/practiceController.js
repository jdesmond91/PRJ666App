angular.module("nursingApp").controller("practiceController", ["$scope", "$routeParams", "$http", "scenarioService", "semanticService", practiceController]);
function practiceController($scope, $routeParams, $http, scenarioService, semanticService) {
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

    $scope.compareAPI = function () {
        console.log("compare API");
        //DANDELION
        var compare = semanticService.getSemantic("Cameron wins the Oscar", "All nominees for the Academy Awards");
        compare.then(function (response) {          
            console.log(response.data);
            var similarity = response.data.similarity;
            console.log("similar in: " + similarity);
        }, function (error) {
            $scope.Message = "Error!! " + error.status;
            $scope.status = 'Unable to load question data: ' + error.message;
        });

        //create json for comparison
        var textCompare =
            [
                {
                    "term": "Pablo Picasso"
                },
                {
                    "text": "Gustav Klimt was born in Baumgarten, near Vienna in Austria-Hungary, the second of seven children"
                }
            ];

        //pass json to semanticService
        /*var compare = semanticService.getSemantic(textCompare);
        compare.then(function (response) {
            console.log(response.data);
            var similarity = response.data.weightedScoring;
            console.log("similar in: " + similarity);
        }, function (error) {
            $scope.Message = "Error!! " + error.status;
            $scope.status = 'Unable to load question data: ' + error.message;
        });*/
    };
  


    // DOM MANIPULATION SECTION ****************************************************************************************//

    $("#question").click(function () {
        this.value = '';
        $scope.answer = "";
    });

} // close Module