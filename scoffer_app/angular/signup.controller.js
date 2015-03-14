/**
 * Created by Jonny on 06/12/2014.
 */
'use strict';

scofferApp.controller('SignupCtrl', function ($log, $scope, $http, $state) {

  //google maps API key
  var API_KEY = 'AIzaSyBrx-563H44msVhK06AdL3CTgNHxSHJHPw';

  $scope.errorType = 'none';
  $scope.showValidation = false;
  $scope.hstep = 1;
  $scope.mstep = 15;
  $scope.ismeridian = false;

  $scope.types = [
    'Cafe',
    'Restaurant',
    'Bar',
    'Nightclub'
  ];

  $scope.signup = {
    companyName: "",
    companyEmail: "",
    password: "",
    townCity: "",
    country: "",
    postcode: "",
    latitude: "",
    longitude: "",
    description: "",
    type: "",
    openingTime: moment("09:00", "HH:mm"),
    closingTime: moment("17:00", "HH:mm"),
    websiteURL: "",
    phoneNum: ""
  };

  $scope.$watch('signup.openingTime', function() {
    var test = $scope.signup.openingTime;
    $log.error(moment(test).format('HH:mm'));
  });

  var statusCodes = {
    ok: "OK",
    zero: "ZERO_RESULTS",
    overLimit: "OVER_QUERY_LIMIT",
    reqDenied: "REQUEST_DENIED",
    reqInvalid: "INVALID_REQUEST",
    unknown: "UNKNOWN_ERROR"
  };

  $scope.clearError = function () {
    $scope.errorType = 'none';
  }

  //submit signup details to database
  $scope.submitSignup = function () {
    $log.info("INFO - Submitted signup form");
    $scope.showValidation = true;
    //check that all data has been entered
    if ($scope.signupForm.$valid) {
      $log.info("INFO - Form was valid - processing data");
      //use google maps geolocation to get latitude and longitude from address provided
      var streetNameQS = "+" + $scope.signup.streetName.split(" ").join("+");
      var townCityQS = ",+" + $scope.signup.townCity.split(" ").join("+");
      var countryQS = ",+" + $scope.signup.country.split(" ").join("+");
      var geoQueryString = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        $scope.signup.streetNum + streetNameQS + townCityQS + countryQS + "&key=" + API_KEY;

      $http.get(geoQueryString)
        .success(function (response) {
          $scope.signup.latitude = response.results[0].geometry.location.lat;
          $scope.signup.longitude = response.results[0].geometry.location.lng;
          console.log("latitude:" + $scope.signup.latitude);
          console.log("longitude:" + $scope.signup.longitude);
          console.log('Geolocation = ' + JSON.stringify(response, null, '\t'));

          //if google maps query returns 'ok' status then
          if ($scope.returnedStatus === statusCodes.ok) {
            $scope.signup.openingTime = moment($scope.signup.openingTime).format('HH:mm')
            $scope.signup.closingTime = moment($scope.signup.closingTime).format('HH:mm')
            $http.post('http://localhost:80/scripts/signup.php', JSON.stringify($scope.signup))
              .success(function (data, status, statusText, headers, config) {
                $log.info('INFO - returned HTTP status code: ' + status);
                if (data === 'success') {
                  $log.info('INFO - signup query status:' + data);
                  $state.go('notloggedin')
                } else {
                  $log.error('ERROR - The server was successfully contacted but there was an error posting data to the ' +
                  'database, data provided may be incomplete or in an incorrect format')
                }
              })
              .error(function () {
                $log.error('ERROR - An error occurred from the server, it may be offline or currently unreachable due to maintenance');
                $scope.errorType = 'servererror'
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
          } else {
            if (response.status === statusCodes.zero) {
              $scope.errorType = 'zeroresults';
            } else {
              $scope.errorType = 'googlemaps';
            }
          }
        })
        .error(function () {
          $scope.errorType = 'googlemaps';
          $log.error("ERROR - There was a problem retrieving location information from google maps");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    } else {
      $scope.errorType = 'missingdata';
      $log.error('ERROR - Missing data entry fields')
    }
  }

  $scope.update = function () {
    var d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    $scope.mytime = d;
  };

  $scope.clear = function () {
    $scope.mytime = null;
  };
});
