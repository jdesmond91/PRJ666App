angular
        .module('nursingApp')
        .service('questionService', ["$http", function ($http) {
            var urlBase = '/api/questions';
            this.getQuestions = function () {
                return $http.get(urlBase);
            };
        }]);