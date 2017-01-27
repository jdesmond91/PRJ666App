angular.module("nursingApp", ['ngRoute', 'common.services'])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $routeProvider
                .when('/home', {
                    controller: 'logincontroller',
                    templateUrl: 'app/Index.html'
                })
                .when('/register', {
                     controller: 'logincontroller',
                    templateUrl: 'app/User/Register.html'
                })
                .when('/questions', {
                     controller: 'questionController',
                     templateUrl: 'app/Question/Question.html'
                })
                .when('/scenarios', {
                     controller: 'scenarioController',
                     templateUrl: 'app/Scenario/Scenario.html'
                 })
                .otherwise({ redirectTo: '/home' });
            }]);
    

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


/*(function () {
    "use strict";
    var app = angular.module("nursingApp",
                                ["common.services"]);
}());*/