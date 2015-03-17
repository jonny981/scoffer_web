'use strict';
scofferApp.factory('loginService', ['$state', '$http', '$log', '$window', '$timeout', '$q',
    function ($state, $http, $log, $window, $timeout, $q) {
        return {
            login: function (loginDetails) {
                $log.error('INFO - Submitting login details: ' + JSON.stringify(loginDetails));

                var deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(); // this aborts the request!
                }, 20000);

                return $http.post('http://localhost:8080/scripts/sign_in.php', JSON.stringify(loginDetails), {timeout: deferred.promise})
                    .success(function (data, status) {
                        if (data.validDetails === true) {
                            $window.sessionStorage.loggedInUser = JSON.stringify(data.details);
                            $window.sessionStorage.loginState = true;
                        }
                        return data;
                    })
                    .error(function () {
                        return null;
                    });
            },
            getCurrentUser: function () {
                var user = $window.sessionStorage.loggedInUser;
                var parsedUser = JSON.parse(user);
                return parsedUser;
            },
            isLoggedIn: function () {
                var loggedin = $window.sessionStorage.loginState;
                if (loggedin) {
                    return loggedin;
                } else {
                    return false;
                }
            },
            logout: function () {
                $window.sessionStorage.loggedInUser = null;
                $window.sessionStorage.loginState = false;
                $window.sessionStorage.clear();
                $state.go('notloggedin');
            }
        }
    }]);