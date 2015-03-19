
var scofferApp = angular.module('scofferApp',
    [
        'ui.bootstrap',
        'ui.router',
        'ngAnimate',
        'cloudinary',
        'angularFileUpload',
        'ngResource'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /notloggedin
        $urlRouterProvider.otherwise("/home");
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'scoffer_app/partials/home.html'
            })
            .state('youroffers', {
                url: "/youroffers",
                templateUrl: "scoffer_app/partials/youroffers.html",
                controller: 'YourOffersCtrl'
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "scoffer_app/partials/signup.html",
                controller: "SignupCtrl"
            })
            .state('postoffer', {
                url: '/postoffer',
                templateUrl: "scoffer_app/partials/postoffer.html",
                controller: 'PostOfferCtrl'
            })
    })
    .run(['$rootScope', '$state', 'loginService', '$log',
        function ($rootScope, $state, loginService, $log) {
            $rootScope.$on('$stateChangeStart', function (event) {
                window.scrollTo(0, 0);
            });
        }
    ]);
