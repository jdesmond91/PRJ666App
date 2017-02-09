angular.module("nursingApp").controller("loginController", ["$scope", '$location', "loginService", "userProfile", loginController]);

function loginController($scope, $location, loginService, userProfile) {
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
        $location.path('/register');       
    };

    $scope.login = function () {
        console.log($scope.userEmail + " " + $scope.userPassword);
        $scope.dataLoading = true;
        var userLogin = {
            grant_type: 'password',
            userName: $scope.userEmail,
            password: $scope.userPassword
        };
        $scope.responseData = "";
        var loginResult = loginService.login(userLogin);

        loginResult.then(function (resp) {
            console.log(resp);
            $scope.userName = resp.data.userName;
            userProfile.setProfile(resp.data.userName, resp.data.access_token, resp.data.refresh_token);
            $scope.isLoggedIn = true;
            $location.path('/question');
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

    $scope.getScenarios = function () {
        $location.path('/scenario');
    }

    $scope.getQuestions = function () {
        $location.path('/question');
    }
}
