/**
 * Created by Jonny on 16/11/2014.
 */
var scofferApp = angular.module('scofferApp',
    [
        'ui.bootstrap',
        'ui.router',
        'ngAnimate',
        'cloudinary',
        'angularFileUpload',
        'ngResource'
    ]);

scofferApp.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /notloggedin
    $urlRouterProvider.otherwise("/notloggedin");
    //
    // Now set up the states
    $stateProvider
        .state('notloggedin', {
            url: '/notloggedin',
            templateUrl: 'scoffer_app/partials/notloggedin.html'
        })
        .state('loggedinlanding', {
            url: "/loggedinlanding",
            templateUrl: "scoffer_app/partials/loggedinlanding.html",
            controller: 'LoggedinCtrl'
        })
        .state('about', {
            url: "/about",
            templateUrl: "scoffer_app/partials/about.html"
        })
        .state('signup', {
            url: "/signup",
            templateUrl: "scoffer_app/partials/signup.html",
            controller: "SignupCtrl"
        })
        .state('redirect', {
            url: '/redirect',
            controller: 'redirectCtrl'
        })
});

scofferApp.run(['$rootScope', '$state', 'loginService', '$log',
    function ($rootScope, $state, loginService, $log) {
        //$log.info('Logged In = ' + loggedIn);

        //$rootScope.$on('$stateChangeStart', function (event) {
        //    if (!loggedIn) {
        //        $log.error('ERROR - This page requires authentication');
        //        event.preventDefault();
        //        $state.go('signup');
        //    }
        //});
    }
]);

scofferApp.controller('redirectCtrl', function ($state, $log) {
    $log.error('ERROR - Redirecting...');
    //$state.go('notloggedin');
});
