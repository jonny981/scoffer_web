'use strict';

scofferApp.filter('formatdate', [function () {
  return function (date) {
    return moment(date).format('DD/MM/YYYY');
  };
}]);
