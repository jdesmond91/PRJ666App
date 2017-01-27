/// <reference path="Common/common.services.js" />
/// <reference path="Question/Question.html" />
/*angular.module("appmodule", ["common.services"]);*/
    

/*.config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            controller: 'logincontroller',
            templateUrl: 'index'          
        })

        .when('/register', {
            controller: 'logincontroller',
            templateUrl: 'User/register',
        })

        .otherwise({ redirectTo: '/home' });
    $locationProvider.html5Mode(true);
}*/


var nursingApp = angular.module("nursingApp", ['ngRoute', 'common.services']);

nursingApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.
    when("/Question", {
        templateUrl: 'Question.html',
        controller: "questionController"
    })
}])
