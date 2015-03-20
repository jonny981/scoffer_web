scofferApp.directive('repost', ['$location', '$log', '$state', 'offerService', '$modal', 'loginService',
    function ($location, $log, $state, offerService, $modal, loginService) {

        function Link(scope, element) {

            var modalCtrl = function ($scope, $modalInstance) {
                var currentUser = loginService.getCurrentUser();
                $log.error(JSON.stringify(currentUser, null, 4));

                $scope.offerDetails = {
                    title: scope.offer.OfferTitle,
                    details: scope.offer.FurtherInfo,
                    startDate: new Date(),
                    endDate: new Date(),
                    companyID: currentUser.CompanyID,
                    imageURL: scope.offer.ImageURL
                };

                $scope.postOffer = function () {
                    $log.error($scope.postOfferForm);
                    $scope.offerDetails.startDate = moment($scope.offerDetails.startDate).format('YYYY-MM-DD');
                    $scope.offerDetails.endDate = moment($scope.offerDetails.endDate).format('YYYY-MM-DD');
                    offerService.postOffer($scope.offerDetails).then(function (success) {
                        $log.info(JSON.stringify(success, null, 4));
                        if (success.data) {
                            $log.info('INFO - Offer ' + $scope.offerDetails.title + ' added successfully');
                            scope.actionStatus = 'success';
                            $modalInstance.close(success.data);
                        } else {
                            $log.error('ERROR - Offer could not be added');
                            scope.actionStatus = 'error';
                        }
                    }, function (error) {
                        $log.info(JSON.stringify(error, null, 4));
                        $log.error('ERROR - Server error - cannot add the offer');
                        scope.actionStatus = 'error';
                    })
                };

                $scope.today = function () {
                    $scope.dt = new Date();
                };
                $scope.today();

                $scope.clear = function () {
                    $scope.dt = null;
                };

                $scope.maxDuration = moment($scope.offerDetails.startDate).add(7, 'day');
                $scope.toggleMin = function () {
                    $scope.minDate = $scope.minDate ? null : moment();
                };
                $scope.toggleMin();

                $scope.datePickerStart = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.openedEnd = false;
                    $scope.openedStart = true;
                };

                $scope.datePickerEnd = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.openedStart = false;
                    $scope.openedEnd = true;
                };

                $scope.dateOptions = {
                    formatYear: 'yyyy',
                    startingDay: 1
                };

                $scope.format = 'dd-MM-yyyy';
            };

            element.bind('click', function () {

                var repost = $modal.open({
                    templateUrl: 'scoffer_app/partials/modals/modal.repost.html',
                    backdrop: 'static',
                    windowClass: 'repost-modal',
                    controller: modalCtrl
                });

                repost.result.then(function () {
                    $log.info('INFO - successful re post');
                    $state.reload();
                }, function () {
                    $log.info('INFO - cancelled re post');
                });
            });
        }

        return {
            restrict: 'A',
            scope: {
                offer: '=',
                actionStatus: '='
            },
            link: Link
        };
    }]);
