'use strict';
scofferApp.factory('offerService', ['$state', '$http', '$log', '$window', '$timeout', '$q',
    function ($state, $http, $log, $window, $timeout, $q) {
        return {
            getCurrentUserOffers: function (currentUser) {
                $log.error('INFO - Retreiving current users offers: ' + JSON.stringify(currentUser, null, 4));

                var deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve();
                }, 20000);

                var details = {
                    CompanyID: currentUser.CompanyID
                };

                return $http.post('http://localhost:8080/scripts/get_offers_for_company.php', JSON.stringify(details), {timeout: deferred.promise})
                    .success(function (data) {
                        $window.sessionStorage.userOffers = JSON.stringify(data);
                        return data;
                    })
                    .error(function () {
                        return null;
                    });
            },
            getCachedOffers: function () {
                var offers = $window.sessionStorage.userOffers;
                if (offers) {
                    var parsedOfferList = JSON.parse(offers);
                    return offers;
                }
            },
            deleteOffer: function (offer) {
                $log.error('INFO - Deleting offer: ' + JSON.stringify(offer, null, 4));

                var deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve();
                }, 20000);

                return $http.post('http://localhost:8080/scripts/delete_offer.php', JSON.stringify(offer), {timeout: deferred.promise});
            }
        }
    }]);
