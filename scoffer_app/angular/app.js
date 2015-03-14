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
            templateUrl: 'partials/notloggedin.html'
        })
        .state('loggedinlanding', {
            url: "/loggedinlanding",
            templateUrl: "partials/loggedinlanding.html",
            controller: 'LoggedinCtrl'
        })
        .state('about', {
            url: "/about",
            templateUrl: "partials/about.html"
        })
        .state('signup', {
            url: "/signup",
            templateUrl: "partials/signup.html",
            controller: "SignupCtrl"
        })
        .state('upload', {
            url: "/upload",
            templateUrl: 'partials/photo-upload.html',
            controller: 'photoUploadCtrl'
        })
});
