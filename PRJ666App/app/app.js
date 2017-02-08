angular.module("nursingApp", ['ngRoute', 'common.services'])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $locationProvider.hashPrefix('');
                $routeProvider
                .when('/home', {
                    controller: 'loginController',
                    templateUrl: 'app/Index.html'
                })
                .when('/login', {
                     controller: 'loginController',
                     templateUrl: 'app/Partials/login.html'
                 })
                .when('/register', {
                     controller: 'logincontroller',
                    templateUrl: 'app/Partials/register.html'
                })
                .when('/question', {
                     controller: 'questionController',
                     templateUrl: 'app/Partials/question.html'
                })
                .when('/scenario', {
                     controller: 'scenarioController',
                     templateUrl: 'app/Partials/scenario.html'
                })
                .when('/practice/:scenario_id', {
                     controller: 'practiceController',
                     templateUrl: 'app/Partials/practice.html'
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