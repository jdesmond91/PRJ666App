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


(function () {
    "use strict";
    var app = angular.module("appmodule",
                                ["common.services"]);
}());