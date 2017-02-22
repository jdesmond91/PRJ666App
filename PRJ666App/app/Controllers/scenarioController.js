angular.module("nursingApp").controller("scenarioController", ["$scope", "$routeParams", "scenarioService", scenarioController]);
function scenarioController($scope, $routeParams, scenarioService) {
    $scope.Scenarios = [];
    $scope.Message = "";
    $scope.status;
    $scope.scenarioName = '';
    $scope.scenarioDescription = "";
    $scope.scenarioGoals = "";

    $scope.sectionName = "";
    $scope.process = "";
    $scope.processHint = "";
    $scope.processOutput = "";
    $scope.question = "";
    $scope.answer = "";
    $scope.hint = "";
    $scope.questions = [];
    $scope.processes = [];
    $scope.scenarioId = 0;
    $scope.sectionId = 0;
    $scope.questionId = 0;
    $scope.processKeywords = [];
    $scope.questionKeywords = [];

    $scope.disableInput = {
        disableScenario: true,
        disableSection: true,
        showSaveButton: false,
        showNextButton: false
    };

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

    $scope.addScenario = function () {
        $scope.disableInput.disableScenario = false;
    }

    $scope.addSection = function () {
        $scope.disableInput.disableSection = false;
    }

    $scope.addQuestion = function () {

        $scope.questions.push({
            SectionId: $scope.sectionName,
            ScenarioId: $scope.scenarioName,
            Description: $scope.question,
            Answer: $scope.answer,
            Hint: $scope.hint,
            keywords: $scope.questionKeywords
        });             

        console.log($scope.questions);
        $scope.disableInput.showSaveButton = true;
        clearFields();
    }

    $scope.getKeywords = function () {
        var question = $scope.question;
        var containsQuestionMark = $scope.question.indexOf('?');
        if (containsQuestionMark > -1) {
            question = question.slice(0, containsQuestionMark);
        }

        $scope.questionKeywords = question.split(' ');

        console.log($scope.questionKeywords);
    };

    $scope.addKeywords = function () {
        $scope.questionKeywords.push(" ");
    }

    $scope.removeKeywords = function (index) {
        $scope.questionKeywords.splice(index, 1);
        console.log($scope.questionKeywords);
    }

    function clearFields() {
        $scope.question = "";
        $scope.answer = "";
        $scope.hint = "";
        $scope.questionKeywords = [];
    }

    $scope.addProcess = function () {

        $scope.processes.push({
            SectionId: $scope.sectionName,
            ScenarioId: $scope.scenarioName,
            Description: $scope.process,
            Hint: $scope.processHint,
            Output: $scope.processOutput,
            keywords: $scope.processKeywords
        });

        $scope.disableInput.showSaveButton = true;
        console.log($scope.processes);
        clearProcessFields();
    }

    $scope.getQuestion = function () {
        console.log($scope.questions);
    }  

    $scope.getProcessKeywords = function () {
        var process = $scope.process;
        var containsQuestionMark = $scope.process.indexOf('?');
        if (containsQuestionMark > -1) {
            process = process.slice(0, containsQuestionMark);
        }

        $scope.processKeywords = process.split(' ');

        console.log($scope.processKeywords);
    };

    $scope.addProcessKeywords = function () {
        $scope.processKeywords.push(" ");
    }

    $scope.removeProcessKeywords = function (index) {
        $scope.processKeywords.splice(index, 1);
        console.log($scope.processKeywords);
    }

    function clearProcessFields() {
        $scope.process = "";
        $scope.processHint = "";
        $scope.processOutput = "";
        $scope.processKeywords = [];
    }

    $scope.saveSection = function () {

        if ($scope.scenarioId == 0) {
            saveScenario();
        }
        else {
            var section = {
                Name: $scope.sectionName,
                ScenarioId: $scope.scenarioId
            };

            var sectionAddResult = scenarioService.addSection(section);
            sectionAddResult.then(function (result) {
                console.log("Saving the section");
                console.log(result);
                $scope.sectionId = result.data.Id;
                return result.data.Id;
            })
            .then(function (newSectionId) {
                //saving question
                if ($scope.questions.length != 0) {
                    for (let i = 0; i < $scope.questions.length; i++) {
                        var question = {
                            Description: $scope.questions[i].Description,
                            Answer: $scope.questions[i].Answer,
                            Hint: $scope.questions[i].Hint,
                            ScenarioId: $scope.scenarioId,
                            SectionId: newSectionId
                        };
                        var questionAddResult = scenarioService.addQuestion(question);
                        questionAddResult.then(function (result) {
                            $scope.questionId = result.data.Id;
                            if ($scope.questions[i].keywords.length != 0) {
                                for (var j = 0; j < $scope.questions[i].keywords.length; j++) {
                                    var keyword = {
                                        Description: $scope.questions[i].keywords[j],
                                        QuestionId: $scope.questionId
                                    };
                                    var questionKeywordAddResult = scenarioService.addKeyword(keyword);
                                    questionKeywordAddResult.then(function (result) {
                                        console.log("save keyword");
                                    }, function (error) {
                                        $scope.status = 'Unable to save keyword: ' + error.message;
                                    });
                                }
                            }
                        }, function (error) {
                            $scope.status = 'Unable to save question: ' + error.message;
                        });
                    }
                } // close IF question length != 0
                if ($scope.processes.length != 0) {
                    for (let i = 0; i < $scope.processes.length; i++) {
                        var process = {
                            Description: $scope.processes[i].Description,                          
                            Hint: $scope.processes[i].Hint,
                            Output: $scope.processOutput,
                            ScenarioId: $scope.scenarioId,
                            SectionId: newSectionId
                        };
                        var processAddResult = scenarioService.addProcess(process);
                        processAddResult.then(function (result) {
                            $scope.processId = result.data.Id;
                            if ($scope.processes[i].keywords.length != 0) {
                                for (var j = 0; j < $scope.processes[i].keywords.length; j++) {
                                    var keyword = {
                                        Description: $scope.processes[i].keywords[j],
                                        ProcessId: $scope.processId
                                    };
                                    var processKeywordAddResult = scenarioService.addKeyword(keyword);
                                    processKeywordAddResult.then(function (result) {
                                        console.log("save keyword");
                                    }, function (error) {
                                        $scope.status = 'Unable to save keyword: ' + error.message;
                                    });
                                }
                            }
                        }, function (error) {
                            $scope.status = 'Unable to save question: ' + error.message;
                        });
                    }
                } // close IF process length != 0

            }, function (error) {
                $scope.status = 'Unable to save section: ' + error.message;
            });
            return sectionAddResult;
        } // close Else
        $scope.disableInput.showSaveButton = true;
    }

    function saveScenario() {
        var scenario = {
            Name: $scope.scenarioName,
            Description: $scope.scenarioDescription,
            Goals: $scope.scenarioGoals
        };

        var scenarioAddResult = scenarioService.addScenario(scenario);
        scenarioAddResult.then(function (result) {
            console.log("Saving the scenario");
            console.log(result);
            $scope.scenarioId = result.data.Id;
            return result.data.Id
        }).then(function (newScenarioId) {
            var section = {
                Name: $scope.sectionName,
                ScenarioId: newScenarioId
            };
            var sectionAddResult = scenarioService.addSection(section);
            sectionAddResult.then(function (result) {
                console.log("Saving the section");
                console.log(result);
                $scope.sectionId = result.data.Id;
                return result.data.Id;
            })
            .then(function (newSectionId) {
                //saving question
                if ($scope.questions.length != 0) {
                    for (let i = 0; i < $scope.questions.length; i++) {
                        var question = {
                            Description: $scope.questions[i].Description,
                            Answer: $scope.questions[i].Answer,
                            Hint: $scope.questions[i].Hint,
                            ScenarioId: $scope.scenarioId,
                            SectionId: newSectionId
                        };
                        var questionAddResult = scenarioService.addQuestion(question);
                        questionAddResult.then(function (result) {
                            $scope.questionId = result.data.Id;
                            if ($scope.questions[i].keywords.length != 0) {
                                for (var j = 0; j < $scope.questions[i].keywords.length; j++) {
                                    var keyword = {
                                        Description: $scope.questions[i].keywords[j],
                                        QuestionId: $scope.questionId
                                    };
                                    var questionKeywordAddResult = scenarioService.addKeyword(keyword);
                                    questionKeywordAddResult.then(function (result) {
                                        console.log("save keyword");
                                    }, function (error) {
                                        $scope.status = 'Unable to save keyword: ' + error.message;
                                    });
                                }
                            }
                            }, function (error) {
                                $scope.status = 'Unable to save question: ' + error.message;
                            });
                        }                      
                } // close IF question length != 0
                if ($scope.processes.length != 0) {
                    for (let i = 0; i < $scope.processes.length; i++) {
                        var process = {
                            Description: $scope.processes[i].Description,
                            Hint: $scope.processes[i].Hint,
                            Output: $scope.processOutput,
                            ScenarioId: $scope.scenarioId,
                            SectionId: newSectionId
                        };
                        var processAddResult = scenarioService.addProcess(process);
                        processAddResult.then(function (result) {
                            $scope.processId = result.data.Id;
                            if ($scope.processes[i].keywords.length != 0) {
                                for (var j = 0; j < $scope.processes[i].keywords.length; j++) {
                                    var keyword = {
                                        Description: $scope.processes[i].keywords[j],
                                        ProcessId: $scope.processId
                                    };
                                    var processKeywordAddResult = scenarioService.addKeyword(keyword);
                                    processKeywordAddResult.then(function (result) {
                                        console.log("save keyword");
                                    }, function (error) {
                                        $scope.status = 'Unable to save keyword: ' + error.message;
                                    });
                                }
                            }
                        }, function (error) {
                            $scope.status = 'Unable to save question: ' + error.message;
                        });
                    }
                } // close IF process length != 0

            })
        }, function (error) {
            $scope.status = 'Unable to save scenario: ' + error.message;
        });

        $scope.disableInput.showSaveButton = true;
        return scenarioAddResult;
    } // close saveScenario
    
}
