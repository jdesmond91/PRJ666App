angular
        .module('nursingApp')
        .service('questionService', ["$http", function ($http) {
            var urlBase = 'http://localhost:1556/api/questions';
            this.getQuestions = function () {
                return $http.get(urlBase);
            };
        }]);