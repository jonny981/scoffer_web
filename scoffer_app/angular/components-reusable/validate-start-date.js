'use strict';

scofferApp.directive('validateofferstart', function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attr, ngModel) {

      ngModel.$parsers.unshift(function (value) {
        var isNotInThePast = moment(value).isAfter(moment().subtract(1, 'days'));
        var isValidDate = moment(value, ['MM/DD/YYYY'], true).isValid() || moment(value, ['M/D/YYYY'], true).isValid();
        var valid = isNotInThePast && isValidDate;
        ngModel.$setValidity('validateofferstart', valid);
        return valid ? value : undefined;
      });

      ngModel.$formatters.unshift(function (value) {
        var isNotInThePast = moment(value).isAfter(moment().subtract(1, 'days'));
        var isValidDate = moment(value, ['MM/DD/YYYY'], true).isValid() || moment(value, ['M/D/YYYY'], true).isValid();
        var valid = isNotInThePast && isValidDate;
        ngModel.$setValidity('validateofferstart', valid);
        return value;
      });
    }
  };
});
