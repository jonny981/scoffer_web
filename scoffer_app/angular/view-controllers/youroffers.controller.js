scofferApp.controller('YourOffersCtrl', function ($scope, $http, $log, loginService, offerService, $modal, $anchorScroll, $state) {

    $scope.actionStatus = 'none';
    $scope.currentUser = loginService.getCurrentUser();

    $scope.clearAction = function () {
        $scope.actionStatus = 'none';
    };

    offerService.getCurrentUserOffers($scope.currentUser).then(function (success) {
            $log.info('INFO (YourOffersCtrl) - Successfully retrieved user offers');
            $scope.userOffers = success.data.offers;
            $log.info(JSON.stringify($scope.userOffers, null, 4));
        },
        function (error) {
            $log.info('INFO (YourOffersCtrl) - Error retrieving user offers');
        })

    $scope.confirmRemoval = function (offer) {
        var remove = $modal.open({
            templateUrl: 'scoffer_app/partials/modals/modal.confirmremove.html',
            backdrop: 'static',
            windowClass: 'confirm-removal',
            scope: $scope
        });
        remove.result.then(function (yes) {
            offerService.deleteOffer(offer).then(function (success) {
                $log.info(JSON.stringify(success, null, 4));
                if (success.data) {
                    $log.info('INFO - Offer ' + offer.OfferTitle + 'deleted');
                    removeLocalOffer(offer);
                    $scope.actionStatus = 'success';
                } else {
                    $log.error('ERROR - Offer could not be deleted');
                    $scope.actionStatus = 'error';
                }
            }, function (error) {
                $log.error('ERROR - Server error - cannot delete offer');
                $scope.actionStatus = 'success';
            }).finally(function () {
                $anchorScroll();
            })
        }, function (no) {
            //if no is selected do nothing
        });
    }

    function removeLocalOffer(offer) {
        for (var i = 0; i < $scope.userOffers.length; i++) {
            if ($scope.userOffers[i].OfferID === offer.OfferID) {
                $scope.userOffers.splice(i, 1);
                break;
            }
        }
    }

})