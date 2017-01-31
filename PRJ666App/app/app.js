angular.module("nursingApp", ['ngRoute', 'common.services'])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
            $routeProvider
    .when("/home", {
        templateUrl: "Partials/home.html",
    })    
    .when('/login', {
        templateUrl: 'Partials/login.html',
        controller: 'loginController'
    })
    .when('/register', {
        templateUrl: 'Partials/register.html',
        controller: 'loginController'
    })
    .when('/practice/:scenario_id', {
        controller: 'scenarioController',
        templateUrl: 'Partials/practice.html'
    })
    .when("/question", {
        templateUrl: 'Partials/question.html',
        controller: "questionController"
    })
    .when("/scenario", {
        templateUrl: 'Partials/scenario.html',
        controller: "scenarioController"
    })
    .when("/test", {
        templateUrl: "Partials/test.html",
    })
    .otherwise({
        templateUrl: "Partials/home.html"
    });
 }]);
