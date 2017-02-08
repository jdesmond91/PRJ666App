angular.module("common.services").factory("semanticService", ["$http", "appSettings", '$q', semanticService]);
function semanticService($http, appSettings, $q) {

    //DANDELION
    this.getSemantic = function (phraseOne, phraseTwo) {
        
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

        //CORTICAL
        /*this.getSemantic = function (json) {
        var def = $q.defer();
        $http({
            method: "POST",
            url: "http://api.cortical.io:80/rest/compare?retina_name=en_associative",
            headers: { 'api-key': '413b7040-ea4b-11e6-8782-2f4eaf4c41b5', 'content-type': 'application/json' },
            data: JSON.stringify(json), //pass json to cortical
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;*/

        // UMBC
        /*var resp = $http({
            url: 'http://swoogle.umbc.edu/StsService/GetStsSim?operation=api&',
            method: "GET",
            params : { phrase1: phraseOne, phrase1: phraseTwo },
        });*/

    };
    return {
        getSemantic: this.getSemantic
    }
}