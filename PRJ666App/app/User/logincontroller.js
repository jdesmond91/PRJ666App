angular.module("appmodule").controller("logincontroller", ["$scope", "loginservice", "userProfile", logincontroller]);

function logincontroller($scope, loginservice, userProfile) {
    $scope.responseData = "";
    $scope.userName = "";
    $scope.userEmail = "";
    $scope.userPassword = "";
    $scope.userFirstName = "";
    $scope.userLastName = "";
    $scope.accessToken = "";
    $scope.refreshToken = "";
    $scope.isLoggedIn = false;

    $scope.registerUser = function () {
        $scope.responseData = "";
        var userInfo = {
            Email: $scope.userEmail,
            Password: $scope.userPassword,
            ConfirmPassword: $scope.userPassword,
            GivenName: $scope.userFirstName,
            Surname: $scope.userLastName
        };
        console.log(userInfo.Email + " " + userInfo.Password + " " + userInfo.GivenName + " " + userInfo.Surname);
        var registerResult = loginservice.register(userInfo);
        registerResult.then(function (data) {
            $scope.responseData = "User Registration Successfull";
            $scope.userPassword = "";
            console.log(data);
        }, function (response) {
            $scope.responseData = response.statusText + "\r\n";
            if (response.data.exceptionMessage) {
                $scope.responseData += response.data.exceptionMessage;
            }
            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    $scope.responseData += response.data.modelState[key] + "\r\n";
                }
            }
        });
    };

    $scope.login = function () {
        $scope.dataLoading = true;
        var userLogin = {
            grant_type: 'password',
            userName: $scope.userEmail,
            password: $scope.userPassword
        };
        $scope.responseData = "";
        var loginResult = loginservice.login(userLogin);

        loginResult.then(function (resp) {
            console.log(resp);
            $scope.userName = resp.data.userName;
            userProfile.setProfile(resp.data.userName, resp.data.access_token, resp.data.refresh_token);
            $scope.isLoggedIn = true;
        }, function (response) {
            $scope.responseData = response.statusText + " : \r\n";
            if (response.data.error) {
                $scope.responseData += response.data.error_description;
            }
        });
    };

    $scope.logout = function () {
        sessionStorage.removeItem('accessToken');
        $scope.userName = "";
        console.log("i am logout");
    };
}


/*(function () {
    'use strict';
    angular
        .module("appmodule")
        .controller("logincontroller",
                     ["$scope", "loginservice", "userProfile",
                        logincontroller]);

    function logincontroller($scope, loginservice, userProfile) {
        this.responseData = "";
        this.userName = "";
        this.userEmail = "";
        this.userPassword = "";
        this.userFirstName = "";
        this.userLastName = "";
        this.accessToken = "";
        this.refreshToken = "";

        this.registerUser = function () {
            this.responseData = "";
            var userInfo = {
                Email: this.userEmail,
                Password: this.userPassword,
                ConfirmPassword: this.userPassword,
                GivenName: this.userFirstName,
                Surname: this.userLastName
            };
            console.log(userInfo.Email + " " + userInfo.Password + " " + userInfo.GivenName + " " + userInfo.Surname);
            var registerResult = loginservice.register(userInfo);
            registerResult.then(function (data) {
                this.responseData = "User Registration Successfull";
                this.userPassword = "";
                console.log(data);
            }, function (response) {
                this.responseData = response.statusText + "\r\n";
                if (response.data.exceptionMessage) {
                    this.responseData += response.data.exceptionMessage;
                }
                if (response.data.modelState) {
                    for (var key in response.data.modelState) {
                        this.responseData += response.data.modelState[key] + "\r\n";
                    }
                }
            });
        };

        this.login = function () {
            var userLogin = {
                grant_type: 'password',
                userName: this.userEmail,
                password: this.userPassword
            };
            this.responseData = "";
            var loginResult = loginservice.login(userLogin);

            loginResult.then(function (resp) {
                console.log(resp);
                //this.userName = resp.data.userName;
                userProfile.setProfile(resp.data.userName, resp.data.access_token, resp.data.refresh_token);
            }, function (response) {
                this.responseData = response.statusText + " : \r\n";
                if (response.data.error) {
                    this.responseData += response.data.error_description;
                }
            });
        };

        this.logout = function () {
            sessionStorage.removeItem('accessToken');
        };
    }
})();*/