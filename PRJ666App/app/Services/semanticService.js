angular.module("common.services").factory("semanticService", ["$http", "appSettings", '$q', "$timeout", semanticService]);
function semanticService($http, appSettings, $q, $timeout) {

    //DANDELION
    /*this.getSemantic = function (phraseOne, phraseTwo) {       
        var def = $q.defer();
        $http({
            method: "GET",
            url: "https://api.dandelion.eu/datatxt/sim/v1/",
            params: { text1: phraseOne, text2: phraseTwo, token: 'a7f1053a048c437d874b13a100a1330f' },
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };*/

        //CORTICAL
    this.getSemantic = function (studentQuestion, possibleQuestion) {
        var textCompare =
            [
                {
                    "text": possibleQuestion
                },
                {
                    "text": studentQuestion
                }
            ];
        var def = $q.defer();
        $http({
            method: "POST",
            url: "http://api.cortical.io:80/rest/compare?retina_name=en_associative",
            headers: { 'api-key': '413b7040-ea4b-11e6-8782-2f4eaf4c41b5', 'content-type': 'application/json' },
            data: JSON.stringify(textCompare), //pass json to cortical
            timeout: $timeout(function () {}, 3000)
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;      
    };
    return {
        getSemantic: this.getSemantic
    }
}