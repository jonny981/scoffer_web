/**
 * Created by Jonny on 04/12/2014.
 */

scofferApp.controller('LoggedinCtrl', ['$scope', '$rootScope', '$location', '$upload', '$log',
  function($scope, $rootScope, $location, $upload, $log) {

    //var loggedin = true;
    //
    //$scope.$emit('updateParentCtrl',loggedin);

    $scope.offerDetails = {
      title: '',
      businessName: '',
      details: '',
      startDate: new Date(),
      endDate: new Date()
    };

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.datePickerStart = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.openedEnd = false;
      $scope.openedStart = true;
    };

    $scope.datePickerEnd = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.openedStart = false;
      $scope.openedEnd = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];


    $scope.$watch('files', function() {
      $scope.uploadedURL = null;
      if (!$scope.files) return;

      $scope.files.forEach(function(file){
        $scope.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
          data: {upload_preset: $.cloudinary.config().upload_preset, tags: 'myphotoalbum', context:'photo=' + $scope.title},
          file: file
        }).progress(function (e) {
          file.progress = Math.round((e.loaded * 100.0) / e.total);
          file.status = "Uploading... " + file.progress + "%";
          if(!$scope.$$phase) {
            $scope.$apply();
          }
        }).success(function (data, status, headers, config) {
          $rootScope.photos = $rootScope.photos || [];
          data.context = {custom: {photo: $scope.title}};
          file.result = data;
          $rootScope.photos.push(data);
          if(!$scope.$$phase) {
            $scope.$apply();
          }
          $scope.uploadedURL = data.url;
          $log.error(JSON.stringify(data, null, 4));
        }).error(function (data) {
          $log.error(JSON.stringify(data, null, 4));
        });
      });
    });

    /* Modify the look and fill of the dropzone when files are being dragged over it */
    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
        for (var i = 0 ; i < items.length; i++) {
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
