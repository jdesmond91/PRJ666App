angular.module("nursingApp").controller("practiceController", ["$scope", "$routeParams", "$http", "$q", "scenarioService", "semanticService", practiceController]);
function practiceController($scope, $routeParams, $http, $q, scenarioService, semanticService) {
    $scope.Scenarios = [];
    var scenarioId = $routeParams.scenario_id;
    $scope.status;
    $scope.scenario = [];
    $scope.allSections = [];
    $scope.QuestionsSection2 = [];
    $scope.studentQuestion = "";
    $scope.answer = "";
    $scope.possibleQuestions = [];
    $scope.QuestionsSection2Desc = [];
    $scope.lastTry = [];
    $scope.continueLoop = true;
    $scope.sectionStartIndex = 1;

    //console.log("Scenario Id: " + scenarioId);

    $scope.getScenariosByIdWithAll = function () {
        var scenarioResult2 = scenarioService.getScenarioByIdWithAll(scenarioId);
        scenarioResult2.then(function (response) {
            $scope.scenario = response.data;
            //console.log($scope.scenario);
            $scope.allSections = $scope.scenario.Sections;
            //console.log($scope.allSections);
            $scope.QuestionsSection2 = $scope.allSections[$scope.sectionStartIndex].Questions;
        }, function (error) {
            $scope.status = 'Unable to load question data: ' + error.message;
        });        
    };

    $scope.getScenariosByIdWithAll();    


    //KEYWORD MATCHING ////////////////////////////////////////////////////////////////////////////////////////////////////
    /*$scope.getAnswer = function () {
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
    }; */
    

    $scope.parse = function () {
        console.log("Entering parse\n");

        var similarityArray = getSimilarity();

        $scope.compareAPI = [];

        if (similarityArray[0].similar >= 0.8) {
            $scope.answer = similarityArray[0].answer;
        }
       //else {
            var max = 0;
            var realAnswer = "";            
            for (var i = 0; i < $scope.possibleQuestions.length; i++) {
                var api = compareAPI($scope.possibleQuestions[i].question, $scope.possibleQuestions[i].answer, function (score, question, answer) {                    
                    $scope.compareAPI = score.average;
                    console.log($scope.compareAPI);
                    console.log(question);
                    console.log(answer);

                    if ($scope.compareAPI >= max) {
                        max = $scope.compareAPI;
                        realAnswer = answer;
                    }
                    $scope.answer = realAnswer;
                  
                });
            }
        //}
    };


    function compareAPI (possibleQuestion, possibleAnswer, fn) {
        console.log("compare API");
    
        var apiMatch = semanticService.getSemantic($scope.studentQuestion, possibleQuestion)
        apiMatch.then(function (result) {          
            fn(result.data, possibleQuestion, possibleAnswer);
            console.log(result.data);
        }, function(error){
            $scope.status = 'Unable to load question data: ' + error.message;
        });
      
    }

    function getSimilarity () {

        var stringSimilarity = require('string-similarity');
        var similarityArray = [];
      
        //make an array of object to associate each similarity result with its question
        for (var i = 0; i < $scope.QuestionsSection2.length; i++) {
            var stringSim = stringSimilarity.compareTwoStrings($scope.studentQuestion, $scope.QuestionsSection2[i].Description);
            similarityArray.push({ similar: stringSim, question: $scope.QuestionsSection2[i].Description, 
                answer: $scope.QuestionsSection2[i].Answer});                
        }

        //sort the array based on similarity result to get the 3 largest
        similarityArray.sort(function (a, b) {
            return b.similar - a.similar;
        });

        $scope.possibleQuestions = [];

        //push 3 possible questions
        $scope.possibleQuestions.push(similarityArray[0]);
        $scope.possibleQuestions.push(similarityArray[1]);
        $scope.possibleQuestions.push(similarityArray[2]);

        console.log("similarity array\n");
        console.log(similarityArray);

        return similarityArray;
    }

    $scope.start = function () {
        //if (!$scope.continueLoop) return;
        //loopStep();
        //setTimeout($scope.startLoop, 1000);
        --$scope.sectionStartIndex;
        $scope.QuestionsSection2 = $scope.allSections[$scope.sectionStartIndex].Questions;
        console.log($scope.sectionStartIndex);
    }

    $scope.stop = function () {
        ++$scope.sectionStartIndex;
        $scope.QuestionsSection2 = $scope.allSections[$scope.sectionStartIndex].Questions;
        console.log($scope.sectionStartIndex);
    }


    function loopStep() {
        console.log("test loop");
    }
     
    // DOM MANIPULATION SECTION ****************************************************************************************//

    $("#question").click(function () {
        this.value = '';
        $scope.answer = "";
    });

} // close Module