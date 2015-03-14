/**
 * Created by Jonny on 16/11/2014.
 */
scofferApp.controller('HomeCtrl', function ($scope) {

  $scope.loggedin = {
    toggle: false
  }

  //$scope.$on('updateParentCtrl', function (event, loggedin){
  //  $scope.loggedin.toggle = loggedin;
  //})

  $scope.testme = function(){
    console.log($scope.loggedin.toggle);
  }

  $scope.myInterval = 5000;
  $scope.isCollapsed = true;

  var slides = $scope.slides = [];
  slides.push({image: 'resources/carousel1.png'});
  slides.push({image: 'resources/carousel2.png'})

});

