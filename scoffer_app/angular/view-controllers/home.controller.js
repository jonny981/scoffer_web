/**
 * Created by Jonny on 16/11/2014.
 */
scofferApp.controller('HomeCtrl', function ($scope, $http, $log, loginService, $state, $location, $anchorScroll, $modal) {

    $scope.isCollapsed = true;

    $scope.$watch(function () {
        return loginService.isLoggedIn();
    }, function () {
        $scope.loggedIn = loginService.isLoggedIn();
    }, false);

    $scope.logOut = function () {
        loginService.logout();
    };

    $scope.loginDetails = {
        email: '',
        password: ''
    };

    $scope.openContactModal = function () {
        var contact = $modal.open({
            templateUrl: 'scoffer_app/partials/modals/modal.contact.html',
            backdrop: 'static'
        });
    };

    $scope.gotoAnchor = function (elementID) {
        var newHash = elementID;
        if ($location.hash() !== newHash) {
            // set the $location.hash to `newHash` and
            // $anchorScroll will automatically scroll to it
            $location.hash(elementID);
        } else {
            // call $anchorScroll() explicitly,
            // since $location.hash hasn't changed
            $anchorScroll();
        }
    };

    $scope.goToAbout = function () {
        $state.go('home');
        $scope.gotoAnchor('learnmore');
    }

    $scope.signin = function () {
        if (true) {
            loginService.login($scope.loginDetails).then(function (response) {
                    $scope.showValidation = true;
                    $log.error(JSON.stringify(response));
                    if (response.data.validUser !== 'undefined') {
                        if (response.data.validDetails === true) {
                            $log.info('INFO - login Successful');
                            $scope.loggedInUser = response.data;
                            $scope.errorType = null;
                            $state.go('youroffers');
                        } else if (response.data.validDetails === false && response.data.validUser === true) {
                            $log.error('ERROR - Invalid login details');
                            $scope.errorType = 'invalid';
                        } else if (response.data.validUser === false) {
                            $log.error('ERROR - Email address not registered');
                            $scope.errorType = 'notregistered';
                        }
                    } else {
                        $log.error('ERROR - Server unreachable');
                        $scope.errorType = 'server';
                    }
                }
            ), function () {
                $log.error('ERROR - Server unreachable');
                $scope.errorType = 'server';
            };
        }
    };
})
;

