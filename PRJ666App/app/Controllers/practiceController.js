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

    //console.log("Scenario Id: " + scenarioId);

    $scope.getScenariosByIdWithAll = function () {
        var scenarioResult2 = scenarioService.getScenarioByIdWithAll(scenarioId);
        scenarioResult2.then(function (response) {
            $scope.scenario = response.data;
            //console.log($scope.scenario);
            $scope.allSections = $scope.scenario.Sections;
           // console.log($scope.allSections);
            $scope.QuestionsSection2 = $scope.allSections[1].Questions;
            //console.log($scope.QuestionsSection2);
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

    
    /*function compareAPI(possibleQuestion, possibleAnswer, fn) {
        console.log("compare API");
        //DANDELION
        /*var compare = semanticService.getSemantic("Cameron wins the Oscar", "All nominees for the Academy Awards");
        compare.then(function (response) {          
            console.log(response.data);
            var similarity = response.data.similarity;
            console.log("similar in: " + similarity);
        }, function (error) {
            $scope.Message = "Error!! " + error.status;
            $scope.status = 'Unable to load question data: ' + error.message;
        });

        var promises = [];
    
        var apiMatch = semanticService.getSemantic($scope.studentQuestion, possibleQuestion)
            apiMatch.then(function (result) {          
                fn(result.data, possibleQuestion, possibleAnswer);           
        }, function(error){
            $scope.status = 'Unable to load question data: ' + error.message;
        });
        //}
    } */

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

     


        /*function Question(question, tests) {
            this.question = question;
            this.tests = tests;
        }

        var questions = [];

        var test1 = [
        'What provoked this pain?',
        'What started this pain?',
        'When did your pain start',
        'What caused this pain'
        ];

        var test2 = [
        'Did the pain start quickly or slowly',
        'Did your pain begin suddenly or gradually',
        'Did the pain begin quickly or slowly',
        'Did your pain begin immediately or gradually'
        ];

        var test3 = [
        'what worsens the pain',
        'what makes it more painful'
        ];

        var test4 = [
        'what does your pain feel like'
        ];

        var test5 = [
        'Where on your back is the pain'
        ];

        var test6 = [
        'How would you rate your on a scale of 1 to 10 with 10 being the highest',
        'How would you rate your on a scale of 1 to 10 with 1 being the lowest'
        ];

        var test7 = [
        'what treatments to you take for the pain?',
        'what do you take to relieve the back pain',
        'how do you treat your back pain'
        ];

        var test8 = [
        'what do you think caused this pain?'
        ];

        var test9 = [
        'How long have you had arthritis for'
        ];

        var test10 = [
        'Do you know where your arthritis is'
        ];

        var test11 = [
        'what do you take to relieve your arthritis'
        ];

        var test12 = [
        'can I check your vital signs',
        'may I check your vital signs'
        ];

        var test13 = [
        'Do you have any other concerns',
        'Are you concerned about anything else',
        'are your concerned with anything'
        ];

        var test14 = [
       'Is it ok if I perform a respiratory assessment on you?',
       'May I perform a respiratory assessment on you?'
        ];

        var test15 = [
        'Do you cough up anything when you cough?',
        'Does anything comes out when you cough?'
        ];

        var test16 = [
        'What is the colour of it?',
        'What is its color?'
        ];

        var test17 = [
        'what causes you to cough?',
        'what causes your cough?',
        'what makes you cough?'
        ];

        var test18 = [
        'Do you ever experience shortness of breath?',
        'Do you ever get shortness of breath?',
        'Do you find it difficult to breath?'
        ];

        var test19 = [
        'Is there any pain in your chest when you cough?',
        'Do you experience any chest pain when you cough?'
        ];

        var test20 = [
        'Where is the pain located?',
        'Where do you feel the pain'
        ];

        var test21 = [
        'Do you have trouble breathing?',
        'Is it hard to breathe?',
        'Is it difficult to breathe?',
        'Do you have a hard time breathing?',
        'Do you find it difficult to breath?'
        ];

        var test22 = [
        'Are you allergic to anything',
        'Is there any allergy you have?'
        ];

        var test23 = [
        'Do you currently smoke?'
        ];

        var test24 = [
        'Have you smoked before?',
        'Have you smoked in the past?'
        ];

        var test25 = [
        'Does anyone living with you smoke?',
        'Are there any smokers in your home?',
        'Does anyone in your house smoke?',
        'Does anyone smoke in your home?',
        'Does anyone smoke in your house?'
        ];

        var test26 = [
       'What is your job?',
       'what is your occupation?',
       'what do you currently do?',
       'what work do you currently do?'
        ];

        var test27 = [
        'Did anyone smoke at work?',
        'Does anyone smoke at work?'
        ];

        var test28 = [
        'Are there any medications you are taking?',
        'Do you take any medicine?'
        ];

        var test29 = [
        'Have you travelled recently?',
        'Recently have you travelled?',
        'have you recently travelled?'
        ];

        var test30 = [
        'Do you currently have asthma?'
        ];

        var test31 = [
        'Have you experience asthma in the past?',
        'Have you had asthma as a kid?',
        'Have you had asthma when you were younger?'
        ];

        var test32 = [
        'Have you been close to anyone with pneumonia?'
        ];

        var test33 = [
        'Do you have any lung diseases?'
        ];

        var test34 = [
        'Have you ever had tuberculosis?',
        'Have you ever been exposed to tuberculosis?'
        ];

        var test35 = [
        'Have you had fatigue lately?',
        'Have you had fatigue recently?',
        'Have you experienced fatigue lately',
        'Have you experienced fatigue recently?'
        ];

        var test36 = [
       'Have you had any weight changes recently?',
       'Have you lost or gained weight recently?'
        ];

        var test37 = [
       'Do you sweat at night?'
        ];
        var test38 = [
       'Has there been swelling in your legs recently?',
       'Has there been swelling in your legs lately?',
       'Has your legs beens swollen?'
        ];

        var test39 = [
       'Have you ever suffered any injuries to your lungs or chest?'
        ];


        var question1 = 'When did this pain start?';
        var question2 = 'Did the pain start suddenly or gradually?';
        var question3 = 'What makes the pain worse?';
        var question4 = 'Can you describe the pain?';
        var question5 = 'Where in your back is your pain located?';
        var question6 = 'How would you rate the pain out of 10 if 0 means no pain and 10 is the worst pain you’ve ever had?';
        var question7 = 'What do you take to help treat the back pain?';
        var question8 = 'What is your understanding of this pain?';
        var question9 = 'How long have you had arthritis?';
        var question10 = 'Where is the arthritis located?';
        var question11 = 'What do you take to treat arthritis?';
        var question12 = 'is it ok if I take your vital signs?';
        var question13 = 'Is there anything else that you are concerned about';

        var question14 = 'I would like to perform a respiratory assessment on you, is that ok?';
        var question15 = 'When you cough, do you cough up anything?';
        var question16 = 'What colour is it?';
        var question17 = 'What causes the cough?';
        var question18 = 'Do you ever get short of breath?';
        var question19 = 'Do you have any chest pain when you cough?';
        var question20 = 'Where is the pain?';
        var question21 = 'Do you have difficulty breathing?';
        var question22 = 'Do you have any allergies?';
        var question23 = 'Do you smoke?';
        var question24 = 'Have you ever smoked?';
        var question25 = 'Does anyone in your home smoke?';
        var question26 = 'What kind of work do you do?';
        var question27 = 'Were you exposed to cigarette smoke at work?';
        var question28 = 'Do you take any medications?';
        var question29 = 'Have you travelled anywhere recently?';
        var question30 = 'Do you have asthma?';
        var question31 = 'Did you ever have asthma as a child?';
        var question32 = 'Have you been exposed to anyone with pneumonia?';
        var question33 = 'Do you have any lung diseases such as cancer, emphysema, bronchitis, cystic fibrosis?';
        var question34 = 'Have you ever had or been exposed to tuberculosis?';
        var question35 = 'Have you had any recent changes in fatigue?';
        var question36 = 'Have you had any recent changes in weight?';
        var question37 = 'Have you had any night sweats?';
        var question38 = 'Have you had any swelling in your legs recently?';
        var question39 = 'Have you ever had any injuries to your lungs or chest?';


         questions.push(new Question(question1, test1));
         questions.push(new Question(question2, test2));
         questions.push(new Question(question3, test3));
         questions.push(new Question(question4, test4));
         questions.push(new Question(question5, test5));
         questions.push(new Question(question6, test6));
         questions.push(new Question(question7, test7));
         questions.push(new Question(question8, test8));
         questions.push(new Question(question9, test9));
         questions.push(new Question(question10, test10));
         questions.push(new Question(question11, test11));
         questions.push(new Question(question12, test12));
         questions.push(new Question(question13, test13));

         questions.push(new Question(question14, test14));
         questions.push(new Question(question15, test15));
         questions.push(new Question(question16, test16));
         questions.push(new Question(question17, test17));
         questions.push(new Question(question18, test18));
         questions.push(new Question(question19, test19));
         questions.push(new Question(question20, test20));
         questions.push(new Question(question21, test21));
         questions.push(new Question(question22, test22));
         questions.push(new Question(question23, test23));
         questions.push(new Question(question24, test24));
         questions.push(new Question(question25, test25));
         questions.push(new Question(question26, test26));
         questions.push(new Question(question27, test27));
         questions.push(new Question(question28, test28));
         questions.push(new Question(question29, test29));
         questions.push(new Question(question30, test30));
         questions.push(new Question(question31, test31));
         questions.push(new Question(question32, test32));
         questions.push(new Question(question33, test33));
         questions.push(new Question(question34, test34));
         questions.push(new Question(question35, test35));
         questions.push(new Question(question36, test36));
         questions.push(new Question(question37, test37));
         questions.push(new Question(question38, test38));
         questions.push(new Question(question39, test39));
 
         for (var i = 0; i < questions.length; i++) {
             console.log("Question: " + questions[i].question);
             for (var j = 0; j < questions[i].tests.length; j++) {
                 //console.log("Test " + j + ": " + questions[i].tests[j]);              
 
                 //string similarity
                 stringSim = stringSimilarity.compareTwoStrings(questions[i].question, questions[i].tests[j]);
                 console.log(stringSim);
             }
             console.log("\n")
         }

        for (var i = 0; i < $scope.QuestionsSection2.length; i++) {
            $scope.QuestionsSection2Desc.push($scope.QuestionsSection2[i].Description);
        }

        var bestMatch = stringSimilarity.findBestMatch('what treatments to you take for the pain?',
            $scope.QuestionsSection2Desc);
        console.log(bestMatch);

        var bestMatch2 = stringSimilarity.findBestMatch('what do you take to relieve the back pain',
            $scope.QuestionsSection2Desc);
        console.log(bestMatch2);

        var bestMatch3 = stringSimilarity.findBestMatch('how do you treat your back pain?',
            $scope.QuestionsSection2Desc);
        console.log(bestMatch3);

        var bestMatch4 = stringSimilarity.findBestMatch('Did your pain begin immediately or gradually',
            $scope.QuestionsSection2Desc);
        console.log(bestMatch4);
    };*/
  


    // DOM MANIPULATION SECTION ****************************************************************************************//

    $("#question").click(function () {
        this.value = '';
        $scope.answer = "";
    });

} // close Module