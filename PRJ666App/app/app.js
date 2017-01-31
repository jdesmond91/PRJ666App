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
    $routeProvider
    .when("/home", {
        templateUrl: "Partials/home.html",
    })
    .when("/question", {
        templateUrl: 'Partials/question.html',
        controller: "questionController"
    })
    .when("/scenario", {
        templateUrl: 'Partials/scenario.html',
        controller: "scenarioController"
    })
    .when('/login', {
        templateUrl: 'Partials/login.html',
        controller: 'loginController'
    })
    .when('/register', {
        templateUrl: 'Partials/register.html',
        controller: 'loginController'
    })
    .when("/test", {
        templateUrl: "Partials/test.html",
    })
    .otherwise({
        templateUrl: "Partials/home.html"
    });
}]);