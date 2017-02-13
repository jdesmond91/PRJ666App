angular.module("nursingApp").controller("practiceController", ["$scope", "$routeParams", "$http", "$q", "scenarioService", "semanticService", practiceController]);
function practiceController($scope, $routeParams, $http, $q, scenarioService, semanticService) {

    var scenarioId = $routeParams.scenario_id; //retrieve id from scenario selected from dropdown
    $scope.status;
    
    /* variables to hold the scenario, the scenario's section, the questions for each section and 
    the question typed by the student */
    $scope.scenario = [];
    $scope.allSections = [];
    $scope.sectionQuestions = [];
    $scope.studentQuestion = "";

    $scope.sectionStartIndex = 1; //starting index, for now set to 1 until we remove the procedures
    $scope.answer = ""; //the answer we will return to the student
    $scope.possibleQuestions = []; //stores the top 3 results from the initial pass through string similarity
    var questionsAskedCount = 0;

    //$scope.sectionQuestionDesc = [];
    //$scope.continueLoop = true;    

    //console.log("Scenario Id: " + scenarioId);

    //function first retrieves all of the sections associated with a scenario, then retrieves all the questions associated with that section
    //for now, we will retrieve starting at index 1, since procedures have not been removed
    $scope.getScenariosByIdWithAll = function () {
        var scenarioResult = scenarioService.getScenarioByIdWithAll(scenarioId);
        scenarioResult.then(function (response) {
            $scope.scenario = response.data;
            //console.log($scope.scenario);
            $scope.allSections = $scope.scenario.Sections;
            //console.log($scope.allSections);
            $scope.sectionQuestions = $scope.allSections[$scope.sectionStartIndex].Questions;
            console.log($scope.sectionQuestions);
        }, function (error) {
            $scope.status = 'Unable to load question data: ' + error.message;
        });        
    };

    $scope.getScenariosByIdWithAll();    


    //KEYWORD MATCHING ////////////////////////////////////////////////////////////////////////////////////////////////////
    /*$scope.getAnswer = function () {
        console.log("getAnswer");

        for (var x = 0; x < $scope.sectionQuestions.length; x++) {
            var isMatch = "";
            var countMatches = 0;

            for (var y = 0; y < $scope.sectionQuestions[x].Keywords.length; y++) {
                var keyword = $scope.sectionQuestions[x].Keywords[y].Description;

                var regexKeyword = new RegExp("\\b" + keyword + "[a-zA-Z]*\\b", "gi"); // global match

                isMatch = $scope.studentQuestion.match(regexKeyword);

                if (isMatch != null) {
                    countMatches++;
                }
            } // close Inner For

            var percentMatch = $scope.sectionQuestions[x].Keywords.length * 0.8;
            if (Math.floor(countMatches * 0.8) >= Math.floor(percentMatch)) {
                console.log("possible candidates: " + $scope.sectionQuestions[x].Description);
                $scope.answer = $scope.sectionQuestions[x].Answer;
            }
        } // close Outer For
    }; */
    

    /* Once the user inputs their question and presses the Ask button, the following parse function is called.
       The function will first attempt to retrieve the 3 best matches from String Similarity by calling the getSimilarity function.
        If the highest match among those results has a score of 0.3 or less, the API will not be called as the scores are already too low.
        If the API function is called, then we will return the highest scoring result, FOR NOW
    */
    $scope.parse = function () {
        console.log("Entering parse\n");
        
        var similarityArray = getSimilarity();

        $scope.compareAPI = [];

        //if the highest match from string similarity is 0.3 or less, don't bother going to API
        if (similarityArray[0].similar <= 0.3) {
            $scope.answer = "Please try asking another question!";
        } else {
            var max = 0;
            var realAnswer = "";            
            for (var i = 0; i < $scope.possibleQuestions.length; i++) {
                var api = compareAPI($scope.possibleQuestions[i].question, $scope.possibleQuestions[i].answer,
                function (score, question, answer) {
                    $scope.compareAPI = score.average;
                    console.log($scope.compareAPI);
                    console.log(question);
                    console.log(answer);

                    if ($scope.compareAPI >= max) {
                        max = $scope.compareAPI;
                        if (max >= 0.6) {
                            realAnswer = answer;
                            questionsAskedCount++;
                            $scope.answer = realAnswer;  
                        }else {
                        $scope.answer = "Please try asking another question!";
                        }
                    }                    
                                    
                });
            }
        }
        //console.log("questions in section: " + $scope.sectionQuestions.length);
                
        //console.log("questions asked: " + questionsAskedCount);
        //if (questionsAskedCount == $scope.sectionQuestions.length) {
            //$scope.goToNextSection();
        //}
        
    };


    //calls the RxNLP API 
    function compareAPI (possibleQuestion, possibleAnswer, fn) {
        console.log("compare API");
    
        var apiMatch = semanticService.getSemantic($scope.studentQuestion, possibleQuestion)
        apiMatch.then(function (result) {          
            fn(result.data, possibleQuestion, possibleAnswer);
            //console.log(result.data);
        }, function(error){
            $scope.status = 'Unable to load question data: ' + error.message;
        });
      
    }

    //calls String Similarity node package to retrieve the top 3 matched questions
    function getSimilarity () {

        var stringSimilarity = require('string-similarity');
        var similarityArray = [];
      
        //make an array of object to associate each similarity result with its question
        for (var i = 0; i < $scope.sectionQuestions.length; i++) {
            var stringSim = stringSimilarity.compareTwoStrings($scope.studentQuestion, $scope.sectionQuestions[i].Description);
            similarityArray.push({ similar: stringSim, question: $scope.sectionQuestions[i].Description, 
                answer: $scope.sectionQuestions[i].Answer});                
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

    $scope.goToNextSection = function () {
        if (($scope.sectionStartIndex + 1) <= $scope.allSections.length) {
            $scope.sectionStartIndex++;
            $scope.sectionQuestions = $scope.allSections[$scope.sectionStartIndex].Questions;
        }
    };

    // DOM MANIPULATION SECTION ****************************************************************************************//

    $("#question").click(function () {
        this.value = '';
    });

    //TEMPORARY: user presses the previous section button which will update the section index and retrieve the previous set of questions
    $scope.start = function () {
        //if (!$scope.continueLoop) return;
        //loopStep();
        //setTimeout($scope.startLoop, 1000);
        --$scope.sectionStartIndex;
        $scope.sectionQuestions = $scope.allSections[$scope.sectionStartIndex].Questions;
        console.log($scope.sectionStartIndex);
    }


    //function loopStep() {
    //    console.log("test loop");
    //}

} // close Module