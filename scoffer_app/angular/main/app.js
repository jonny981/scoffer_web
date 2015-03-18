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
            templateUrl: 'scoffer_app/partials/home.html'
        })
        .state('loggedinlanding', {
            url: "/loggedinlanding",
            templateUrl: "scoffer_app/partials/postoffer.html",
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
        $rootScope.$on('$stateChangeStart', function (event) {
            window.scrollTo(0, 0);
        });
    }
]);

scofferApp.controller('redirectCtrl', function ($state, $log) {
    $log.error('ERROR - Redirecting...');
    //$state.go('notloggedin');
});
