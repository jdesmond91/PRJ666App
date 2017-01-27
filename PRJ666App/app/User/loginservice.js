angular.module("common.services").factory("loginservice", ["$http", "appSettings", loginservice]);
    function loginservice($http, appSettings) {

        this.register = function (userInfo) {
            console.log("login service");
            console.log(userInfo);
            var resp = $http({
                url: appSettings.serverPath + "/api/account/register",
                method: "POST",
                data: userInfo,
            });
            return resp;
        };

        this.login = function (userLogin) {
            console.log(userLogin);
            var resp = $http({
                url: appSettings.serverPath + "/TOKEN",
                method: "POST",
                data: $.param({ grant_type: 'password', username: userLogin.userName, password: userLogin.password }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            return resp;
        };
        return {
            register: this.register,
            login: this.login
        }
    }

/*(function () {
    'use strict';
    angular
        .module("common.services")
        .factory("loginservice", ["$http", "appSettings",
                                    loginservice]);
    function loginservice($http, appSettings) {

        this.register = function (userInfo) {
            console.log("login service");
            console.log(userInfo);
            var resp = $http({
                url: appSettings.serverPath + "/api/account/register",
                method: "POST",
                data: userInfo,
            });
            return resp;
        };

        this.login = function (userLogin) {
            var resp = $http({
                url: appSettings.serverPath + "/TOKEN",
                method: "POST",
                data: $.param({ grant_type: 'password', username: userLogin.userName, password: userLogin.password }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            return resp;
        };
        return {
            register: this.register,
            login: this.login
        }
    }
})();*/