scofferApp.controller('PostOfferCtrl', ['$scope', '$rootScope', '$location', '$upload', '$log',
    'loginService', '$state', 'offerService', '$anchorScroll', '$timeout',
    function ($scope, $rootScope, $location, $upload, $log, loginService, $state, offerService, $anchorScroll, $timeout) {

        if (!loginService.isLoggedIn()) {
            $state.go('notloggedin');
        } else {
            $scope.currentUser = loginService.getCurrentUser();
            $log.error(JSON.stringify($scope.currentUser, null, 4));
        }

        $scope.showValidation = false;
        $scope.actionStatus = 'none';

        $scope.offerDetails = {
            title: '',
            details: '',
            startDate: new Date(),
            endDate: new Date(),
            companyID: $scope.currentUser.CompanyID,
            imageURL: 'none'
        };

        $scope.postOffer = function () {
            $scope.showValidation = true;
            $log.error($scope.postOfferForm);
            if ($scope.postOfferForm.$valid) {
                $scope.offerDetails.startDate = moment($scope.offerDetails.startDate).format('YYYY-MM-DD');
                $scope.offerDetails.endDate = moment($scope.offerDetails.endDate).format('YYYY-MM-DD');
                offerService.postOffer($scope.offerDetails).then(function (success) {
                    $log.info(JSON.stringify(success, null, 4));
                    if (success.data) {
                        $log.info('INFO - Offer ' + $scope.offerDetails.title + ' added successfully');
                        $scope.actionStatus = 'success';
                        $scope.addSuccess = true;
                        $anchorScroll();
                    } else {
                        $log.error('ERROR - Offer could not be added');
                        $scope.actionStatus = 'error';
                        $anchorScroll();
                    }
                }, function (error) {
                    $log.info(JSON.stringify(error, null, 4));
                    $log.error('ERROR - Server error - cannot add the offer');
                    $scope.actionStatus = 'error';
                }).finally(function () {
                    $anchorScroll();
                });
            } else {
                $scope.actionStatus = 'missingdata';
                $log.error('ERROR - Form invalid');
                $anchorScroll();
            }
        };

        $scope.reload = function () {
            $state.reload();
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

        $scope.$watch('files', function () {
            $scope.uploadedURL = null;
            if (!$scope.files) return;

            $scope.files.forEach(function (file) {
                $scope.upload = $upload.upload({
                    url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
                    data: {
                        upload_preset: $.cloudinary.config().upload_preset,
                        tags: 'myphotoalbum',
                        context: 'photo=' + $scope.title
                    },
                    file: file
                }).progress(function (e) {
                    file.progress = Math.round((e.loaded * 100.0) / e.total);
                    file.status = "Uploading... " + file.progress + "%";
                    //if (!$scope.$$phase) {
                    //    $scope.$apply();
                    //}
                }).success(function (data) {
                    data.context = {custom: {photo: $scope.title}};
                    file.result = data;
                    //if (!$scope.$$phase) {
                    //    $scope.$apply();
                    //}
                    $scope.uploadedURL = data.url;
                    $scope.offerDetails.imageURL = data.url;
                    $log.error(JSON.stringify(data, null, 4));
                }).error(function (data) {
                    $log.error(JSON.stringify(data, null, 4));
                });
            });
        });

        /* Modify the look and fill of the dropzone when files are being dragged over it */
        $scope.dragOverClass = function ($event) {
            var items = $event.dataTransfer.items;
            var hasFile = false;
            if (items != null) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].kind == 'file') {
                        hasFile = true;
                        break;
                    }
                }
            } else {
                hasFile = true;
            }
            return hasFile ? "dragover" : "dragover-err";
        };
    }]);
